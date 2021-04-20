const { request, response } = require('express');
const Customer = require('../models/Customer');
const msgError = require('./products');

const createCustomer = async (req = request, res = response) => {
  const newCustomer = new Customer(req.body);
  const { code, name } = newCustomer;
  try {
    const foundCustomer = await Customer.findOne({ code });
    if (foundCustomer) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe el cliente: ${name}`,
      });
    } else {
      const savedCustomer = await newCustomer.save();
      res.json({
        ok: true,
        msg: 'Customer created',
        result: savedCustomer,
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

const getCustomers = async (req = request, res = response) => {
  try {
    const customers = await Customer.find();
    res.json({
      ok: true,
      msg: 'Get customers',
      result: customers,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getCustomerById = async (req = request, res = response) => {
  try {
    const foundCustomer = await Customer.findById(req.params.id);
    if (!foundCustomer) {
      return res.status(404).json({
        ok: false,
        msg: `There is no customer with id: ${req.params.id}`,
      });
    }

    res.json({
      ok: true,
      msg: 'Customer geted by id',
      result: foundCustomer,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getCustomerByCode = async (req = request, res = response) => {
  const code = req.params.code;
  try {
    const foundCustomers = await Customer.find({ code: { $regex: `^${code}` } }, { _id: 1, code: 1, name: 1 }).limit(
      10
    );
    if (!foundCustomers) {
      return res.status(404).json({
        ok: false,
        msg: `There is no customer with code: ${code}`,
      });
    }

    res.json({
      ok: true,
      msg: 'Customer geted by code',
      result: foundCustomers,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const updateCustomer = async (req = request, res = response) => {
  try {
    const foundCustomer = await Customer.findById(req.params.id);
    if (!foundCustomer) {
      return res.status(404).json({
        ok: false,
        msg: `There is no customer with id: ${req.params.id}`,
      });
    }

    const newData = { ...req.body };
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, newData, { new: true });

    res.json({
      ok: true,
      msg: 'Updated customer',
      result: updatedCustomer,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const deleteCustomer = async (req = request, res = response) => {
  try {
    const foundCustomer = await Customer.findById(req.params.id);
    if (!foundCustomer) {
      return res.status(404).json({
        ok: false,
        msg: `There is no customer with id: ${req.params.id}`,
      });
    }

    await Customer.findByIdAndDelete(req.params.id);
    res.json({
      ok: true,
      msg: `customer ${foundCustomer.name} removed`,
    });
  } catch (error) {
    msgError(res, error);
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByCode,
  updateCustomer,
  deleteCustomer,
};
