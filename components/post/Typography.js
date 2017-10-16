import React from 'react';
import PropTypes from 'prop-types';

const H1 = props => (
  <h1>
    {props.children}
    <style jsx>{`
      h1 {
        margin: 10px 0;
        line-height: 1.5;
        font-size: 1.2em;
      }
    `}</style>
  </h1>
);

const H2 = props => (
  <h2>
    {props.children}
    <style jsx>{`
      h2 {
        margin: 10px 0;
        line-height: 1.5;
        font-size: 1.2em;
      }
    `}</style>
  </h2>
);

const P = props => (
  <p>
    {props.children}
    <style jsx>{`
      p {
        margin: 10px 0;
        line-height: 1.5;
        font-size: 1.2em;
      }
    `}</style>
  </p>
);

H1.propTypes = {
  children: PropTypes.node.isRequired,
};

H2.propTypes = {
  children: PropTypes.node.isRequired,
};

P.propTypes = {
  children: PropTypes.node.isRequired,
};

export { H1, H2, P };
