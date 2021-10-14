const { request, response } = require('express');
const Trademark = require('../models/Trademark');
const { msgError } = require('./products');

const createTrademark = async (req = request, res = response) => {
  const { code, title } = req.body;

  try {
    let trademark = await Trademark.findOne({ code });

    if (trademark) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe una marca: ${title}`,
        result: [],
      });
    } else {
      trademark = new Trademark(req.body);
      await trademark.save();
      return res.status(201).json({
        ok: true,
        msg: 'Trademark created',
        result: trademark,
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

const getTrademarks = async (req = request, res = response) => {
  try {
    const trademarks = await Trademark.find();

    res.status(200).json({
      ok: true,
      msg: 'Get trademarks',
      result: trademarks,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getTrademarksTitle = async (req = request, res = response) => {
  try {
    const trademars = await Trademark.find({}, { _id: 0, title: 1 });

    const titles = trademars.map(({ title }) => {
      return title;
    });

    res.status(200).json({
      ok: true,
      msg: 'Get trademarks',
      result: titles,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getTrademarkFactorByCode = async (req = request, res = response) => {
  const code = req.params.code;

  try {
    const [curTrademark] = await Trademark.find({ code });
    const { factor } = curTrademark;

    res.status(201).json({
      // '/123456'
      ok: true,
      msg: 'Factor geted by code',
      result: factor,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const updateTrademark = async (req = request, res = response) => {
  const newTrademark = req.body;
  const id = req.params.id;

  try {
    const curTrademark = await Trademark.findById(id);

    if (!curTrademark) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${id}`,
      });
    }

    const newData = {
      ...newTrademark,
    };

    const updatedTrademark = await Trademark.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      // '/123456'
      ok: true,
      msg: 'Updated product',
      result: updatedTrademark,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const deleteTrademark = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const curTrademark = await Trademark.findById(id);

    if (!curTrademark) {
      return res.status(404).json({
        ok: false,
        msg: `There is not trademark with id: ${id}`,
      });
    }

    await Trademark.findByIdAndDelete(id);

    res.status(201).json({
      // '/123456'
      ok: true,
      msg: 'trademark removed',
    });
  } catch (error) {
    msgError(res, error);
  }
};

module.exports = {
  createTrademark,
  getTrademarks,
  getTrademarksTitle,
  updateTrademark,
  deleteTrademark,
  getTrademarkFactorByCode,
};
