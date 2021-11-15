const objectMax = (array, key) => {
  const targetValues = array.map((obj) => obj[key]);
  const maxValue = Math.max(...targetValues);
  const maxValueIndex = targetValues.indexOf(maxValue);
  return array[maxValueIndex];
};

const objectMin = (array, key) => {
  const targetValues = array.map((obj) => obj[key]);
  const minValue = Math.min(...targetValues);
  const minValueIndex = targetValues.indexOf(minValue);
  return array[minValueIndex];
};

const keyExists = (array, value) => {
  let result = false;
  array.map((obj) => {
    if (Object.values(obj).includes(value)) result = true;
  });
  return result;
};

module.exports = {
  objectMax,
  objectMin,
  keyExists,
};
