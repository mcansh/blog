import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import Document from './Document';

const Page = ({ children }) => (
  <Document>
    <Navigation />
    {children}
  </Document>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
