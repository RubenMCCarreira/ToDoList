const compare = (prop) => (a, b) => {
  if (a[prop] < b[prop]) {
    return -1;
  }
  if (a[prop] > b[prop]) {
    return 1;
  }
  return 0;
};

module.exports = { compare };
