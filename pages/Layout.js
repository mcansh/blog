import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Normalize from '../components/css/Normalize';
import BodyStyles from '../components/css/BodyStyles';

const Document = ({ children }) => (
  <div>
    <Head>
      <title>Logan McAnsh</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="mask-icon" href="/static/images/website_icon.svg" color="#FC6C2B" />
      <link rel="shortcut icon" href="/static/images/favicon.png" />
      <Normalize />
      <BodyStyles />
    </Head>
    {children}
  </div>
);

Document.propTypes = {
  children: PropTypes.node.isRequired
};

export default Document;
