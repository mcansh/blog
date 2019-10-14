import React from 'react';
import { subMonths } from 'date-fns';

import { render } from '~/utils/render-with-intl';
import DateHeading from '~/components/header/date';

it('shows x time ago if < 4 months ago', () => {
  const { container } = render(
    <DateHeading date={subMonths(new Date(), 2).toISOString()} />
  );

  expect(container).toHaveTextContent('Posted 2 months ago');
});

it('shows date when >= 4 months ago', () => {
  const { container } = render(<DateHeading date="2017-01-09" />);

  expect(container).toHaveTextContent('Posted January 9, 2017');
});
