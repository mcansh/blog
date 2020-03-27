/* eslint-disable @typescript-eslint/no-var-requires */
const selectUnit = (from: Date, to: Date) => {
  let unit: Intl.Unit = 'second';
  const { differenceInSeconds } = require('date-fns');
  let value = differenceInSeconds(from, to);

  if (value >= 60 && unit === 'second') {
    unit = 'minute';
    const { differenceInMinutes } = require('date-fns');
    value = differenceInMinutes(from, to);
  }

  if (value >= 60 && unit === 'minute') {
    unit = 'hour';
    const { differenceInHours } = require('date-fns');
    value = differenceInHours(from, to);
  }

  if (value >= 24 && unit === 'hour') {
    unit = 'day';
    const { differenceInDays } = require('date-fns');
    value = differenceInDays(from, to);
  }

  if (value >= 7 && unit === 'day') {
    unit = 'week';
    const { differenceInWeeks } = require('date-fns');
    value = differenceInWeeks(from, to);
  }

  if (value >= 4 && unit === 'week') {
    unit = 'month';
    const { differenceInMonths } = require('date-fns');
    value = differenceInMonths(from, to);
  }

  return { unit, value: -value };
};

export { selectUnit };
