/* eslint-disable global-require */
const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : require('next-server/constants');

const config = {
  pageExtensions: ['jsx', 'js', 'mdx'],
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
};

module.exports = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const withMDX = require('@zeit/next-mdx')({
    extension: /\.mdx?$/,
  });
  const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

  return withMDX(withBundleAnalyzer(config));
};
