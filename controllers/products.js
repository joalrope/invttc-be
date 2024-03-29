const { request, response } = require('express');
const Product = require('../models/Product');
//const { objectMin } = require('../helper/object-with-max-value');
// const {Roles} = require('../helper/roles');

/**
 * MongoDB Database model structure
 * {
 *      "id": "5f9c3df4b77fe909bd6feb61",
 *      "code": "P551712",
 *      "category": "FILTER",
 *      "title": "FUEL-FILTER",
 *      "info": [
 *          {
 *              "trademark": "DONALDSON",
 *              "loc_qty": [
 *                  {
 *                      "location": "RACK-04-D3",
 *                      "qty": 38
 *                  }
 *              ],
 *              "costPrice": 7.036005,
 *              "salePrice": 22
 *          }
 *      ],
 *      "replacement": ["CAT: 1R0121", "OTHER: 1935274"],
 *      "measurement": "2 1/2\"",
 *      "status": "USADO"
 *  }
 */

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Path: "/"
 * Method: GET
 * Controller that gets the data for all inventory products.
 */
const getProducts = async (req = request, res = response) => {
  const { page, size } = req.params;
  const curPage = Number(page);
  const curSize = Number(size);
  try {
    const len = await Product.count({});
    const result = await Product.find(
      {},
      { id: 1, key: 1, code: 1, title: 1, details: 1, replacement: 1 }
    )
      .sort('code')
      .limit(curSize)
      .skip((curPage - 1) * curSize);

    res.status(200).json({
      ok: true,
      msg: 'Get products',
      result: { len, result },
    });
  } catch (error) {
    msgError(req, error);
  }
};

/**
 *
 * @param {data} req.body
 * The information about the new product comes on body of request
 * and must have the structure of the model.
 *
 * Path: "/"
 * Method: POST
 * Controller to create a new product whose code does not exist,
 * if the code exists but not the trademark then adds the new info in that code,
 * if the trademark exists, a new loc_qty is added.
 */
const createProduct = async (req = request, res = response) => {
  const newProduct = new Product(req.body);
  const { code, details } = req.body;
  const { trademark, stock } = details[0];
  const { location } = stock[0];
  let savedProduct;

  try {
    const productDB = await Product.findOne({ code });

    if (productDB) {
      const trademarksAvailable = await Product.find({ code }).distinct(
        'details.trademark'
      );

      if (trademarksAvailable.includes(trademark)) {
        savedProduct = await Product.updateOne(
          { code },
          {
            $push: {
              'details.$[det].stock': stock,
            },
          },
          {
            arrayFilters: [{ 'det.trademark': trademark }],
          }
        );

        res.status(201).json({
          ok: true,
          msg: `Created the new location ${location} of the product with code: ${code}`,
          result: savedProduct,
        });
      } else {
        savedProduct = await Product.updateOne(
          { code },
          {
            $push: {
              details: details,
            },
          }
        );

        res.status(201).json({
          ok: true,
          msg: `The product's ${trademark} trademark was created in the code: ${code}`,
          result: savedProduct,
        });
      }
    } else {
      savedProduct = await newProduct.save();

      res.status(201).json({
        ok: true,
        msg: 'Product created',
        result: savedProduct,
      });
    }
  } catch (error) {
    msgError(res, error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Path: "/:id"
 * Method: GET
 * controller that updates all or part of the information of a spare part.
 */
const updateProduct = async (req = request, res = response) => {
  try {
    const curProduct = await Product.findById(req.params.id);

    if (!curProduct) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${req.params.id}`,
      });
    }

    const newData = {
      ...req.body,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      newData,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: 'Updated product',
      result: updatedProduct,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const updateQtyProduct = async (req = request, res = response) => {
  try {
    const { code, trademark, location, qty } = req.body;
    const curProduct = await Product.findOne({
      code,
      'details.trademark': trademark,
    });

    if (!curProduct) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with code: ${code}`,
      });
    }

    const updatedQty = await Product.updateOne(
      { code },
      { $inc: { 'details.$[det].stock.$[loc].qty': qty } },
      {
        arrayFilters: [
          { 'det.trademark': trademark },
          { 'loc.location': location },
        ],
      }
    );

    res.status(201).json({
      ok: true,
      msg: 'Updated product quantity',
      result: updatedQty,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const curProduct = await Product.findById(id);

    if (!curProduct) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${id}`,
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(201).json({
      // '/123456'
      ok: true,
      msg: 'product removed',
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const curProduct = await Product.findById(id);

    if (!curProduct) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${id}`,
      });
    }

    res.status(200).json({
      // '/123456'
      ok: true,
      msg: 'Product got by id',
      result: curProduct,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getProductByCode = async (req = request, res = response) => {
  const code = req.params.code.toUpperCase();

  try {
    const curProduct = await Product.find({ code });

    if (curProduct.length < 1) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with id: ${code}`,
        result: {},
      });
    }

    if (curProduct[0] === 'undefined') curProduct[0] = {};

    res.status(201).json({
      // '/123456'
      ok: true,
      msg: 'Product got by code',
      result: curProduct[0],
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getProductsByCodeRegex = async (req = request, res = response) => {
  const code = req.params.code.toUpperCase();

  try {
    const curProduct = await Product.find(
      { code: { $regex: `^${code}` }, 'details.stock.qty': { $gt: 0 } },
      { _id: 1, code: 1, title: 1 }
    ).sort({ code: 1 });

    if (!curProduct) {
      return res.status(404).json({
        ok: false,
        msg: `There is no product with code: ${code}`,
      });
    }

    res.status(200).json({
      ok: true,
      msg: 'Product got by code regex',
      result: curProduct,
    });
  } catch (error) {
    msgError(res, error);
  }
};

const getProductsStock = async (req = request, res = response) => {
  const { code, trademark } = req.params;

  try {
    let stock;
    let details;
    let ok;
    let msg;

    stock = await Product.find(
      {
        code,
        'details.trademark': trademark,
      },
      { details: 1 }
    ).then(([product]) => {
      if (product) {
        ({ details } = product);
        const [detail] = details.filter((item) => item.trademark === trademark);
        ok = true;
        msg = 'Product location got by code';
        return detail.stock;
      }
      ok = false;
      msg = `There is not product with code ${code}`;
      stock = [];
    });

    res.status(201).json({
      ok: ok,
      msg: msg,
      result: stock,
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
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getProductsByCodeRegex,
  getProductByCode,
  getProductsStock,
  updateProduct,
  updateQtyProduct,
  msgError,
};
