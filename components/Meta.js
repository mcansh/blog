import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import NProgress from 'nprogress';
import Router from 'next/router';

import colors from '../theme';
import { description } from '../package.json';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Meta = ({ title, image }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="mask-icon" href="/static/images/logo/logo.svg" color={colors.primary} />
      <meta name="theme-color" content={colors.primary} />
      <link rel="manifest" href="/static/manifest.json" />
      <link type="text/plain" rel="author" href="/static/humans.txt" />
      {/* Icons and stuff */}
      <link rel="shortcut icon" href="/static/images/favicon.png" />
      <link rel="shortcut icon" href="/static/images/logo/logo.ico" />
      <link rel="apple-touch-icon-precomposed" sizes="228x228" href="/static/images/logo/logo-228.png" />
      <link rel="apple-touch-icon-precomposed" sizes="195x195" href="/static/images/logo/logo-195.png" />
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/images/logo/logo-152.png" />
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/images/logo/logo-144.png" />
      <link rel="apple-touch-icon-precomposed" sizes="128x128" href="/static/images/logo/logo-128.png" />
      <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/images/logo/logo-120.png" />
      <link rel="apple-touch-icon-precomposed" sizes="96x96" href="/static/images/logo/logo-96.png" />
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/images/logo/logo-72.png" />
      <link rel="apple-touch-icon-precomposed" href="/static/images/logo/logo-57.png" />
      <link rel="apple-touch-icon-precomposed" href="/static/images/logo/logo-32.png" sizes="32x32" />
      {/* FEEEEEEEDS */}
      <link rel="alternate" href="/atom" type="application/atom+xml" title="RSS Feed" />
      <link rel="alternate" href="/feed.json" type="application/json" title="JSON Feed" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={process.env.TWITTER} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 400;
        background: ${colors.background};
        margin: 0;
      }

      ::selection {
        background: ${colors.primary};
        color: white;
      }

      a {
        color: ${colors.primary};
        text-decoration-skip: ink;
        transition: 300ms all ease-in-out;
      }

      a:hover {
        color: ${colors.secondary};
      }

      a::selection {
        color: white;
      }

      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background-image: ${colors.gradient};
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }

      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #ff9300, 0 0 5px #ff9300;
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}</style>
  </div>
);

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Meta;
