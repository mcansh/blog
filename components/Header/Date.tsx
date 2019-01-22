import React from 'react';
import { FormattedRelative } from 'react-intl';
import styled from 'styled-components';
import { formatter } from '../../utils/dates';

const H2 = styled.h2`
  font-size: 3rem;
`;

interface Props {
  date: number;
}

const DateHeading = ({ date }: Props) => (
  <H2 title={formatter.format(date)}>
    Posted <FormattedRelative value={date} />
  </H2>
);

export default DateHeading;
