import React from 'react';
import PropTypes from 'prop-types';

const H1 = ({ children }) => <h1>{children}</h1>;

const H2 = ({ children }) => <h2>{children}</h2>;

const H3 = ({ children }) => <h3>{children}</h3>;

const H4 = ({ children }) => <h4>{children}</h4>;

const props = {
  children: PropTypes.node.isRequired,
};

H1.propTypes = props;
H2.propTypes = props;
H3.propTypes = props;
H4.propTypes = props;

export { H1, H2, H3, H4 };
