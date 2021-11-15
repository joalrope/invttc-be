const { request, response } = require('express');
const Billing = require('../models/Billing');
const { padLeft } = require('../helper/padLeft');

const getBillingInfo = async (req = request, res = response) => {
  try {
    const billing = await Billing.find({}, { lastBilling: 1 });

    if (billing[0]) {
      let { lastBilling } = billing[0];
      const curDate = new Date();

      const controlNumber = `${curDate
        .getFullYear()
        .toString()
        .slice(-2)}${padLeft(curDate.getMonth() + 1, 2)}-${padLeft(
        lastBilling + 1,
        4
      )}`;

      const [result] = await Billing.find(
        { 'taxes.title': 'IVA' },
        { taxes: 1, _id: 0 }
      );
      const { taxes } = result;
      const { rate } = taxes[0];

      res.status(201).json({
        ok: true,
        msg: 'Current billing',
        result: { controlNumber, ivaTax: rate },
      });
    }
  } catch (error) {
    msgError(req, error);
  }
};

const updateBillingInfo = async (req = request, res = response) => {
  try {
    await Billing.updateOne({}, { $inc: { lastBilling: 1 } });

    const billing = await Billing.find({}, { lastBilling: 1 });

    const { lastBilling } = billing[0];

    res.status(201).json({
      ok: true,
      msg: 'next Billing',
      result: lastBilling,
    });
  } catch (error) {
    msgError(req, error);
  }
};

const createBilling = async (req = request, res = response) => {
  const newBilling = new Billing(req.body);

  try {
    const savedBilling = await newBilling.save();
    res.status(201).json({
      ok: true,
      msg: 'Billing created',
      result: savedBilling,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const msgError = (res, err) => {
  console.log(err);
  res.status(500).json({
    ok: false,
    msg: 'Please, talk to the administrator',
  });
};

module.exports = {
  createBilling,
  getBillingInfo,
  updateBillingInfo,
};
