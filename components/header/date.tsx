import React from 'react';
import IntlRelativeFormat from 'intl-relativeformat';
import styled from 'styled-components';
import { differenceInMonths } from 'date-fns';
import { formatPostDate } from '~/utils/dates';

const formatRelative = new IntlRelativeFormat('en');

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
  return (
    <H2 title={formatPostDate(date)}>
      Posted{' '}
      {monthDiff > 4
        ? formatPostDate(date)
        : formatRelative.format(new Date(date))}
    </H2>
  );
};

export default DateHeading;
