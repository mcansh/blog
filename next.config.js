const withSourceMaps = require('@zeit/next-source-maps')();
const withMDX = require('@next/mdx')();
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const generateStaticFiles = require('./data');
const { version, repository } = require('./package.json');

generateStaticFiles();

const nextConfig = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  experimental: {
    deferScripts: true,
    granularChunks: true,
    modern: true,
  },
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
    EMAIL: 'logan+website@mcan.sh',
    SENTRY: 'https://07a54d3b59bb4bf5ad1c6ddf050d51c1@sentry.io/197817',
    ANALYTICS: 'UA-87731356-4',
    GITHUB_URL: `https://github.com/${repository}`,
    VERSION: version,
  },

  webpack: (config, { isServer, buildId, webpack }) => {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
        'process.env.SENTRY_RELEASE': JSON.stringify(
          `blog@${version}_${buildId}`
        ),
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(
  withSourceMaps(withMDX(withOffline(nextConfig)))
);
