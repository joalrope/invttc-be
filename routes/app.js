const router = require('express').Router();
var path = require('path');

router.get(
  ['/', '/home', '/equipment', '/contact', 'about', '/login', '/register'],
  function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
    next();
  }
);
module.exports = router;
