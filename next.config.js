/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require('@zeit/next-mdx')();
const withOffline = require('next-offline');
const withTypescript = require('@zeit/next-typescript');
const generateStaticFiles = require('./scripts/build');

generateStaticFiles();

const nextConfig = {
  target: 'serverless',
  experimental: {
    amp: true,
  },
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'staleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|svg|css)/,
      },
      {
        handler: 'networkFirst',
        urlPattern: /^https?.*/,
      },
    ],
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

module.exports = withMDX(withOffline(withTypescript(nextConfig)));
