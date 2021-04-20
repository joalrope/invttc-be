const moment = require('moment');

const isDate = (value) => {
  if (!value) {
    return false;
  }

  if (moment(value, true).isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isDate,
};
