import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Meta = props => (
  <div>
    <Head>
      <title>{props.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="mask-icon" href="/static/images/logo/website_icon.svg" color="#E53A40" />
      <meta name="theme-color" content="#E53A40" />
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
      <meta name="twitter:site" content="@logansmcansh" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content="Learn.co wanted me to have a blog" />
      <meta name="twitter:image" content={props.image} />
    </Head>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 400;
        background: #F7F7F7;
        margin: 0;
      }

      ::selection {
        background: #130CB7;
        color: white;
      }

      a {
        color: #130CB7;
        text-decoration-skip: ink;
        transition: 300ms all ease-in-out;
      }
      a:hover {
        color: #52E5E7;
      }
      a::selection {
        color: white;
      }
    `}</style>
  </div>
);

Meta.defaultProps = {
  image: 'https://avatars1.githubusercontent.com/u/11698668?v=3&amp;s=460',
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Meta;
