/* eslint-disable @typescript-eslint/no-var-requires */
const selectUnit = (from: Date, to: Date) => {
  let unit: Intl.Unit = 'second';
  const { differenceInSeconds } = require('date-fns');
  let value = differenceInSeconds(from, to);

  if (value >= 60) {
    unit = 'minute';
    const { differenceInMinutes } = require('date-fns');
    value = differenceInMinutes(from, to);
  }

  if (value >= 60) {
    unit = 'hour';
    const { differenceInHours } = require('date-fns');
    value = differenceInHours(from, to);
  }

  if (value >= 24) {
    unit = 'day';
    const { differenceInDays } = require('date-fns');
    value = differenceInDays(from, to);
  }

  if (value >= 7) {
    unit = 'week';
    const { differenceInWeeks } = require('date-fns');
    value = differenceInWeeks(from, to);
  }

  if (value >= 4) {
    unit = 'month';
    const { differenceInCalendarMonths } = require('date-fns');
    value = differenceInCalendarMonths(from, to);
  }

  return { unit, value: -value };
};

export { selectUnit };
