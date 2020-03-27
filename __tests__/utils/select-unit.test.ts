import {
  subMinutes,
  subSeconds,
  subHours,
  subDays,
  subWeeks,
  subMonths,
} from 'date-fns';
import cases from 'jest-in-case';

import { selectUnit } from '~/utils/select-unit';
import { range } from '~/utils/range';

const now = new Date();

const secondsAndMinutes = range(1, 59);
const hours = range(1, 23);
const days = range(1, 6);
const weeksAndMonths = range(1, 3);

cases(
  'return the correct value and unit',
  opts => {
    expect(selectUnit(now, opts.date)).toEqual(opts.result);
  },
  [
    ...secondsAndMinutes.map(m => ({
      name: `${m} seconds ago`,
      date: subSeconds(now, m),
      result: {
        value: m * -1,
        unit: 'second',
      },
    })),
    ...secondsAndMinutes.map(m => ({
      name: `${m} minutes ago`,
      date: subMinutes(now, m),
      result: {
        value: m * -1,
        unit: 'minute',
      },
    })),
    ...hours.map(m => ({
      name: `${m} hours ago`,
      date: subHours(now, m),
      result: {
        value: m * -1,
        unit: 'hour',
      },
    })),
    ...days.map(m => ({
      name: `${m} days ago`,
      date: subDays(now, m),
      result: {
        value: m * -1,
        unit: 'day',
      },
    })),
    ...weeksAndMonths.map(m => ({
      name: `${m} weeks ago`,
      date: subWeeks(now, m),
      result: {
        value: m * -1,
        unit: 'week',
      },
    })),
    ...weeksAndMonths.map(m => ({
      name: `${m} months ago`,
      date: subMonths(now, m),
      result: {
        value: m * -1,
        unit: 'month',
      },
    })),
  ]
);
