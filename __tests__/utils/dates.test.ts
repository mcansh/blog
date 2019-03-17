import cases from 'jest-in-case';
import { iso8601, formatPostDate } from '~/utils/dates';

cases(
  'returns an iso8601 date string',
  opts => {
    expect(iso8601(opts.input)).toBe(opts.output);
  },
  [
    {
      name: 'string',
      input: '2018-10-22T00:00:00',
      output: '2018-10-22',
    },
    {
      name: 'number',
      input: 1540180993028,
      output: '2018-10-22',
    },
    {
      name: 'date',
      input: new Date('2018-10-22T00:00:00'),
      output: '2018-10-22',
    },
  ]
);

cases(
  'returns the formatted date',
  opts => {
    expect(formatPostDate(opts.input)).toBe(opts.output);
  },
  [
    {
      name: 'string',
      input: '2019-01-15T00:00:00',
      output: 'January 15, 2019',
    },
    { name: 'number', input: 1547528400000, output: 'January 15, 2019' },
    {
      name: 'date',
      input: new Date('2019-01-15T00:00:00'),
      output: 'January 15, 2019',
    },
  ]
);
