/* eslint-env jest */
import React from 'react';
import { subMonths } from 'date-fns';
import { render } from '~/utils/render-with-intl';
import DateHeading from '~/components/header/date';

it('shows x time ago if < 4 months ago', () => {
  const { container } = render(
    <DateHeading date={subMonths(new Date(), 4).getTime()} />
  );

  expect(container).toHaveTextContent('Posted 4 months ago');
});

it('shows date when > 4 months ago', () => {
  const { container } = render(<DateHeading date={1484006400000} />);

  expect(container).toHaveTextContent('Posted January 9, 2017');
});
