import React from 'react';
import 'intl-pluralrules';
import '@formatjs/intl-relativetimeformat/polyfill';
import styled from 'styled-components';
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
} from 'date-fns';
import { formatPostDate } from '~/utils/dates';

const formatRelative = new (Intl as any).RelativeTimeFormat('en', {
  numeric: 'auto',
});

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
  const now = Date.now();
  const formatted = formatPostDate(date);

  let unit = 'day';
  let value = differenceInDays(now, date);

  if (value >= 7) {
    unit = 'week';
    value = differenceInWeeks(now, date);
  }

  if (value >= 4) {
    unit = 'month';
    value = differenceInMonths(now, date);
  }

  if (value >= 4) {
    return <H2 title={formatted}>Posted {formatted}</H2>;
  }

  return (
    <H2 title={formatted}>Posted {formatRelative.format(-value, unit)}</H2>
  );
};

export default DateHeading;
