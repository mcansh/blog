import tinydate from 'tinydate';

const formatDate = date => {
  const inputDate = new Date(date);
  const stamp = tinydate('{YYYY}-{MM}-{DD}');
  return stamp(inputDate);
};

export default formatDate;
