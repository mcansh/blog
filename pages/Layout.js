import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Normalize from '../components/css/Normalize';
import BodyStyles from '../components/css/BodyStyles';

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Logan McAnsh</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="mask-icon" href="/static/images/website_icon.svg" color="#E53A40" />
      <link rel="shortcut icon" href="/static/images/favicon.png" />
      <Normalize />
      <BodyStyles />
    </Head>
    {children}
    <script src="/static/js/main.js" />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
