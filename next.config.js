const withSourceMaps = require('@zeit/next-source-maps');
const withMDX = require('@next/mdx')();
const withOffline = require('next-offline');
const generateStaticFiles = require('./scripts/build');
const { version, repository } = require('./package.json');

generateStaticFiles();

const nextConfig = {
  target: 'serverless',
  experimental: {
    autoExport: true,
  },
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'StaleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|svg|css|woff|woff2)/,
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },

  env: {
    TWITTER: 'loganmcansh',
    INSTAGRAM: 'loganmcansh',
    GITHUB: 'mcansh',
    EMAIL: 'logan@mcan.sh',
    SENTRY: 'https://07a54d3b59bb4bf5ad1c6ddf050d51c1@sentry.io/197817',
    ANALYTICS: 'UA-87731356-4',
    GITHUB_URL: `https://github.com/${repository}`,
    VERSION: version,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
      config.resolve.alias['react-spring/renderprops.cjs'] =
        'react-spring/renderprops';
    }

    return config;
  },
};

module.exports = withSourceMaps(withMDX(withOffline(nextConfig)));
