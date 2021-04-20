const express = require('express');
const app = express();

app.post('*', async (req, res, next) => {
  const role = req.header('x-role');
  console.log(role);
  if (!role === 'basic') {
    console.log('POST happen', role);
    next();
  }
  next();
});
