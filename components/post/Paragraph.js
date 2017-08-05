import React from 'react';
import PropTypes from 'prop-types';

const P = props => (
  <p>
    {props.children}
    <style jsx>{`
      p {
        margin: 10px 0;
        line-height: 1.5;
        font-size: 1.2em
      }
    `}</style>
  </p>
);

P.propTypes = {
  children: PropTypes.node.isRequired,
};

export default P;
