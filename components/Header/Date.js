import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import { expanded } from '../../utils/Dates';

const Date = ({ date }) => (
  <h2 title={expanded(date)}>
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
};

export default Date;
