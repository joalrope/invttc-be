const { request, response } = require('express');
const Customer = require('../models/Customer');
const { msgError } = require('./products');

const createCustomer = async (req = request, res = response) => {
  const { code, name } = req.body;

  try {
    let customer = await Customer.findOne({ code });

    if (customer) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe el cliente: ${name}`,
        result: [],
      });
    } else {
      customer = new Customer(req.body);
      await customer.save();
      return res.status(201).json({
        ok: true,
        msg: 'Customer created',
        result: customer,
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

const getCustomers = async (req = request, res = response) => {
  try {
    const customers = await Customer.find();

    if (customers) {
      res.status(200).json({
        ok: true,
        msg: 'Get customers',
        result: customers,
      });
    }
  } catch (error) {
    msgError(req, error);
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

    res.status(200).json({
      ok: true,
      msg: 'Customer got by id',
      result: foundCustomer,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getCustomerByCode = async (req = request, res = response) => {
  const code = req.params.code.toUpperCase();

  try {
    const curCustomer = await Customer.find({ code });

    if (curCustomer.length < 1) {
      return res.status(404).json({
        ok: false,
        msg: `There is no customer with id: ${code}`,
        result: {},
      });
    }

    if (curCustomer[0] === 'undefined') curCustomer[0] = {};

    res.status(201).json({
      // '/123456'
      ok: true,
      msg: 'Customer got by code',
      result: curCustomer[0],
    });
  } catch (error) {
    msgError(res, error);
  }
};
const getCustomersByCodeRegex = async (req = request, res = response) => {
  const code = req.params.code.toUpperCase();

  try {
    let foundCustomers = await Customer.find(
      { code: { $regex: `^${code}` } },
      { _id: 1, code: 1, name: 1 }
    ).limit(10);

    if (foundCustomers.length === 0) {
      foundCustomers = await Customer.find(
        { name: { $regex: new RegExp(code, 'i') } },
        { _id: 1, code: 1, name: 1 }
      ).limit(10);
    }

    if (foundCustomers.length === 0) {
      foundCustomers = [];
    }

    res.status(200).json({
      ok: true,
      msg: 'Customer got by code',
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
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      newData,
      { new: true }
    );

    res.status(200).json({
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
        msg: `No èxiste un Cliente con los datos suministrados`,
      });
    }

    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({
      ok: true,
      msg: `El cliente ${foundCustomer.name} ha sido eliminado con éxito`,
      result: foundCustomer.name,
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
  getCustomersByCodeRegex,
  updateCustomer,
  deleteCustomer,
};
