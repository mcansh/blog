import React from 'react';
import { subWeeks, subDays, subMonths, subMinutes } from 'date-fns';
import cases from 'jest-in-case';

import { render } from '~/test-utils';
import DateHeading from '~/components/header/date';
import { range } from '~/utils/range';

const now = new Date();
const days = range(7, 13);
const months = range(2, 4);
const minutes = range(2, 59);

const dayDates = days.map(d => subDays(now, d));
const monthDates = months.map(m => subMonths(now, m));
const minuteDates = minutes.map(m => subMinutes(now, m));

cases(
  'shows "x minutes ago" when less than 60',
  opts => {
    const { container } = render(
      <DateHeading date={opts.date.toISOString()} />
    );

    expect(container).toHaveTextContent(opts.result);
  },
  {
    ...minuteDates.reduce(
      (acc, cur, index) => ({
        ...acc,
        [`${index} months ago`]: {
          date: cur,
          result: `Posted ${minutes[index]} minutes ago`,
        },
      }),
      {}
    ),
  }
);

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
