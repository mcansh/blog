const tinydate = require('tinydate')

const formatDate = date => {
  const inputDate = new Date(date);
  const stamp = tinydate('{YYYY}-{MM}-{DD}');
  return stamp(inputDate);
};

module.exports = formatDate;
