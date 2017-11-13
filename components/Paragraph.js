import React from 'react';
import PropTypes from 'prop-types';

const P = ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        font-size: 1.6rem;
        line-height: 1.5;
        margin: 1rem 0;
      }
    `}</style>
  </p>
);

P.propTypes = {
  children: PropTypes.node.isRequired,
};

export default P;
