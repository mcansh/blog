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
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
          Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
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
