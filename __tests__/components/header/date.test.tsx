import React from 'react';
import { subWeeks, subDays, subMonths } from 'date-fns';
import cases from 'jest-in-case';

import { render } from '~/test-utils';
import DateHeading from '~/components/header/date';

function range(start: number, end: number) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx);
}

const now = new Date();
const days = range(7, 13);
const months = range(2, 4);

const dayDates = days.map(d => subDays(now, d));
const monthDates = months.map(m => subMonths(now, m));

cases(
  'shows "x months ago" when less than 4',
  opts => {
    const { container } = render(
      <DateHeading date={opts.date.toISOString()} />
    );

    expect(container).toHaveTextContent(opts.result);
  },
  {
    '1 month': { date: subMonths(now, 1), result: 'Posted last month' },
    ...monthDates.reduce(
      (acc, cur, index) => ({
        ...acc,
        [`${index} months ago`]: {
          date: cur,
          result: `Posted ${months[index]} months ago`,
        },
      }),
      {}
    ),
  }
);

cases(
  'shows "last week"',
  opts => {
    const { container } = render(
      <DateHeading date={opts.date.toISOString()} />
    );

    expect(container).toHaveTextContent('Posted last week');
  },
  {
    '1 week': { date: subWeeks(new Date(), 1) },
    ...dayDates.reduce(
      (acc, cur, index) => ({
        ...acc,
        [`${days[index]} days ago`]: { date: cur },
      }),
      []
    ),
  }
);

it('shows date when > 4 months ago', () => {
  const { container } = render(<DateHeading date="2017-01-09" />);

  expect(container).toHaveTextContent('Posted January 9, 2017');
});
