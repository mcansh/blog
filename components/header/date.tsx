import React from 'react';
import styled from 'styled-components';
import {
  parseISO,
  differenceInMonths,
  formatDistanceToNowStrict,
} from 'date-fns';

import { formatPostDate } from '~/utils/dates';

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
  const monthDiff = differenceInMonths(now, parsed);

  if (monthDiff > 4) {
    return <H2 title={formatted}>Posted {formatted}</H2>;
  }

  const formattedDistance = formatDistanceToNowStrict(parsed, {
    addSuffix: true,
  });

  return <H2 title={formatted}>Posted {formattedDistance}</H2>;
};

export default DateHeading;
