// @flow
import React from 'react';
import { injectIntl, FormattedRelative } from 'react-intl';
import type { $npm$ReactIntl$IntlShape } from 'react-intl';
import styled from 'styled-components';
import { MMMMDDYYYY } from '../../config';

const H2 = styled.h2`
  font-size: 3rem;
`;

type Props = {
  date: number,
  intl: $npm$ReactIntl$IntlShape,
};

const DateHeading = ({ date, intl: { formatDate } }: Props) => (
  <H2 title={formatDate(date, MMMMDDYYYY)}>
    Posted <FormattedRelative value={date} />
  </H2>
);

export default injectIntl(DateHeading);
