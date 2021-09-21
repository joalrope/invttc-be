const express = require('express');
const parseJwt = require('../helper/parseJwt');

const app = express();

const permits = (req, res, next) => {
  console.log('permits');
  app.get('*', async (req, res, next) => {
    const token = req.header('x-token');
    let role;

    if (token) role = parseJwt(token);

    if (!role === 'basic') {
      next();
    }
    next();
  });

  next();
};

module.exports = {
  permits,
};
