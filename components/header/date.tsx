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

  if (monthDiff > 4) {
    return <H2 title={formatPostDate(date)}>Posted {formatPostDate(date)}</H2>;
  }

  const dayDiff = differenceInDays(date, Date.now());

  return (
    <H2 title={formatPostDate(date)}>
      Posted {formatRelative.format(dayDiff, 'day')}
    </H2>
  );
};

export default DateHeading;
