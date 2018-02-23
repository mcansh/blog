import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';

const Date = ({ date, intl: { formatDate } }) => (
  <h2
    title={formatDate(date, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}
  >
    Posted <FormattedRelative value={date} />
    <style jsx>{`
      h2 {
        font-size: 3rem;
      }
    `}</style>
  </h2>
);

Date.propTypes = {
  date: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Date);
