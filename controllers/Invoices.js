const { request, response } = require('express');
const Invoice = require('../models/Invoice');
const { padLeft } = require('../helper/padLeft');

const getNextNumberInvoice = async (req = request, res = response) => {
  try {
    const invoice = await Invoice.find({}, { lastInvoice: 1 });
    let { lastInvoice } = invoice[0];
    const curDate = new Date();

    const nextNumberInvoice = `${curDate.getFullYear().toString().slice(-2)}${padLeft(curDate.getMonth(), 2)}-${padLeft(
      lastInvoice + 1,
      3
    )}`;

    await Invoice.updateOne({}, { $inc: { lastInvoice: 1 } });

    res.json({
      ok: true,
      msg: 'last Invoice',
      result: nextNumberInvoice,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const createInvoices = async (req = request, res = response) => {
  const newSales = new Invoice(req.body);

  try {
    const savedSales = await newSales.save();
    res.json({
      ok: true,
      msg: 'Sales created',
      result: savedSales,
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
  createInvoices,
  getNextNumberInvoice,
};
