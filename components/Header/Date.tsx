import React from 'react';
import { FormattedRelative } from 'react-intl';
import styled from 'styled-components';
import { differenceInMonths } from 'date-fns';
import { formatter } from '~/utils/dates';

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
  const monthDiff = differenceInMonths(Date.now(), date);
  return (
    <H2 title={formatter.format(date)}>
      Posted{' '}
      {monthDiff > 4 ? (
        formatter.format(date)
      ) : (
        <FormattedRelative value={date} />
      )}
    </H2>
  );
};

export default DateHeading;
