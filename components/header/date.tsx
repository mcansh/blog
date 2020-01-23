import React from 'react';
import '@formatjs/intl-relativetimeformat/polyfill';
import styled from 'styled-components';
import { parseISO } from 'date-fns';
import '@formatjs/intl-relativetimeformat/polyfill-locales';

import { formatPostDate } from '~/utils/dates';
import { selectUnit } from '~/utils/select-unit';

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
  const now = new Date();
  const formatted = formatPostDate(date);
  const parsed = parseISO(date);
  const { unit, value } = selectUnit(now, parsed);

  const formatRelative = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });

  if (unit === 'month' && value <= -4) {
    return <H2 title={formatted}>Posted {formatted}</H2>;
  }

  return <H2 title={formatted}>Posted {formatRelative.format(value, unit)}</H2>;
};

export default DateHeading;
