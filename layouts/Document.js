import React from 'react';
import PropTypes from 'prop-types';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Document = ({ children }) => (
  <div>
    <Meta />
    <Navigation />
    <div>
      { children }
    </div>
    <style jsx>{`
      div {
        margin-bottom: 4em;
        background: #F7F7F7;
      }
    `}</style>
    <Footer />
    <script src="/static/js/main.js" />
  </div>
);

Document.propTypes = {
  children: PropTypes.node.isRequired
};

export default Document;
