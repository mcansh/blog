import React from 'react';
import IntlRelativeTimeFormat, {
  FormattableUnit,
} from '@formatjs/intl-relativetimeformat';
import styled from 'styled-components';
import {
  parseISO,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
} from 'date-fns';
import { formatPostDate } from '~/utils/dates';

if (!Intl.PluralRules) {
  require('intl-pluralrules');
}

const formatRelative = new IntlRelativeTimeFormat('en', { numeric: 'auto' });

const H2 = styled.h2`
  font-size: 2.5rem;
  @media screen and (min-width: 450px) {
    font-size: 3rem;
  }
`;

interface Props {
  date: string;
}

const DateHeading = ({ date }: Props) => {
  const now = Date.now();
  const formatted = formatPostDate(date);
  const parsed = parseISO(date);

  let unit = 'day';
  let value = differenceInDays(now, parsed);

  if (value >= 7) {
    unit = 'week';
    value = differenceInWeeks(now, parsed);
  }

  if (value >= 4) {
    unit = 'month';
    value = differenceInMonths(now, parsed);
  }

  if (value >= 4) {
    return <H2 title={formatted}>Posted {formatted}</H2>;
  }

  return (
    <H2 title={formatted}>
      Posted {formatRelative.format(-value, unit as FormattableUnit)}
    </H2>
  );
};

export default DateHeading;
