import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import styled from 'styled-components';
import { MMMMDDYYYY } from '../../config';

const H2 = styled.h2`
  font-size: 3rem;
`;

const DateHeading = ({ date, intl: { formatDate } }) => (
  <H2 title={formatDate(date, MMMMDDYYYY)}>
    Posted <FormattedRelative value={date} />
  </H2>
);

DateHeading.propTypes = {
  date: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(DateHeading);
