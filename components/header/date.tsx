import React from 'react';
import '@formatjs/intl-relativetimeformat/polyfill';
import styled from 'styled-components';
import { differenceInMonths, differenceInDays } from 'date-fns';
import { formatPostDate } from '~/utils/dates';

// @ts-ignore
const formatRelative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const H2 = styled.h2`
  font-size: 2.5rem;
  @media screen and (min-width: 450px) {
    font-size: 3rem;
  }
`;

interface Props {
  date: number;
}

const DateHeading = ({ date }: Props) => {
  /* istanbul ignore next */
  const monthDiff = differenceInMonths(Date.now(), date);
  const formatted = formatPostDate(date);

  if (monthDiff > 4) {
    return <H2 title={formatted}>Posted {formatted}</H2>;
  }

  if (monthDiff >= 1) {
    return (
      <H2 title={formatted}>
        Posted {formatRelative.format(-monthDiff, 'month')}
      </H2>
    );
  }

  const dayDiff = differenceInDays(date, Date.now());

  if (dayDiff >= 7) {
    return (
      <H2 title={formatted}>Posted {formatRelative.format(dayDiff, 'week')}</H2>
    );
  }

  return (
    <H2 title={formatted}>Posted {formatRelative.format(dayDiff, 'day')}</H2>
  );
};

export default DateHeading;
