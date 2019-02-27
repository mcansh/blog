import React from 'react';
import { FormattedRelative } from 'react-intl';
import styled from 'styled-components';
import { differenceInMonths } from 'date-fns';
import { formatPostDate } from '~/utils/dates.ts';

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
    <H2 title={formatPostDate(date)}>
      Posted{' '}
      {monthDiff > 4 ? (
        formatPostDate(date)
      ) : (
        <FormattedRelative value={date} />
      )}
    </H2>
  );
};

export default DateHeading;
