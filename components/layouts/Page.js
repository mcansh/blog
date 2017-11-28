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
        min-height: calc(100vh - 500px);
        padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
        padding: 0 constant(safe-area-inset-right) 0
          constant(safe-area-inset-left);
      }
    `}</style>
  </Document>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
