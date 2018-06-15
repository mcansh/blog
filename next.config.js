const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const sourceMaps = require('@zeit/next-source-maps');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withPlugins(
  [
    [optimizedImages],
    [sourceMaps],
    [withOffline],
    [
      withBundleAnalyzer,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE
        ),
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
      },
    ],
  ],
  {
    webpack: config => {
      config.node = { fs: 'empty' };
      return config;
    },
  }
);
