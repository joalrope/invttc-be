const padLeft = (value, length) => {
  return value.toString().length < length ? padLeft('0' + value, length) : value;
};

module.exports = {
  padLeft,
};
