import React from 'react';
import PropTypes from 'prop-types';
import Document from './Document';

const Page = ({ children }) => <Document>{children}</Document>;

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
