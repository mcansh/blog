import React from 'react';
import '@formatjs/intl-relativetimeformat/polyfill';
import styled from 'styled-components';
import { parseISO } from 'date-fns';
import { selectUnit } from '@formatjs/intl-utils';
import '@formatjs/intl-relativetimeformat/polyfill-locales';
import { formatPostDate } from '~/utils/dates';

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules');
}

const H2 = styled.h2`
  font-size: 2.5rem;
  @media screen and (min-width: 450px) {
    font-size: 3rem;
  }
`;

interface Props {
  date: string;
}

const DateHeading: React.FC<Props> = ({ date }) => {
  const now = Date.now();
  const formatted = formatPostDate(date);
  const parsed = parseISO(date);
  const { unit, value } = selectUnit(parsed, now);

  const formatRelative = new (Intl as any).RelativeTimeFormat('en', {
    numeric: 'auto',
  });

  if ((unit === 'month' && value <= -4) || ['quarter', 'year'].includes(unit)) {
    return <H2 title={formatted}>Posted {formatted}</H2>;
  }

  return <H2 title={formatted}>Posted {formatRelative.format(value, unit)}</H2>;
};

export default DateHeading;
