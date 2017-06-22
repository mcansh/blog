import React from 'react';
import PropTypes from 'prop-types';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';

const Document = ({ children }) => (
  <div>
    <Meta />
    <Navigation />
    { children }
    {/* <script src="/static/js/main.js" /> */}
  </div>
);

Document.propTypes = {
  children: PropTypes.node.isRequired
};

export default Document;
