const { request, response } = require('express');
const Transaction = require('../models/Transaction');
const { padLeft } = require('../helper/padLeft');

const getNextNumberTransaction = async (req = request, res = response) => {
  try {
    const transaction = await Transaction.find({}, { lastTransaction: 1 });

    if (transaction[0]) {
      let { lastTransaction } = transaction[0];
      const curDate = new Date();

      const nextNumberTransaction = `${curDate.getFullYear().toString().slice(-2)}${padLeft(
        curDate.getMonth() + 1,
        2
      )}-${padLeft(lastTransaction + 1, 4)}`;

      const [result] = await Transaction.find({ 'taxes.title': 'IVA' }, { taxes: 1, _id: 0 });
      const { taxes } = result;
      const { rate } = taxes[0];

      res.json({
        ok: true,
        msg: 'last Transaction',
        result: { nextNumberTransaction, ivaTax: rate },
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

const updateNumberTransaction = async (req = request, res = response) => {
  try {
    await Transaction.updateOne({}, { $inc: { lastTransaction: 1 } });

    const transaction = await Transaction.find({}, { lastTransaction: 1 });

    const { lastTransaction } = transaction[0];

    res.json({
      ok: true,
      msg: 'next Transaction',
      result: lastTransaction,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const createTransaction = async (req = request, res = response) => {
  const newTransaction = new Transaction(req.body);

  try {
    const savedTransaction = await newTransaction.save();
    res.json({
      ok: true,
      msg: 'Transaction created',
      result: savedTransaction,
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
  createTransaction,
  getNextNumberTransaction,
  updateNumberTransaction,
};
