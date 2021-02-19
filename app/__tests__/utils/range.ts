import cases from 'jest-in-case';

import { range } from '../../utils/range';

cases(
  'get a range of numbers',
  opts => expect(range(opts.start, opts.end)).toEqual(opts.result),
  [
    {
      start: 1,
      end: 3,
      result: [1, 2, 3],
    },
    {
      start: 5,
      end: 7,
      result: [5, 6, 7],
    },
  ]
);

it('throw a RangeError if start is greater than end', () => {
  expect(() => range(1, 0)).toThrow();
});
