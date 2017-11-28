import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import Document from './Document';

const Page = ({ children }) => (
  <Document>
    <Navigation />
    {children}
    <style jsx global>{`
      ._markdown_ {
        margin: 3rem auto 0 auto;
        max-width: 900px;
        width: 95%;
      }
    `}</style>
  </Document>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
