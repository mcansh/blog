const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const sourceMaps = require('@zeit/next-source-maps');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withMDX = require('@zeit/next-mdx')();

if (process.env.NODE_ENV !== 'production') {
  require('now-env'); // eslint-disable-line global-require, import/no-extraneous-dependencies
}

module.exports = withPlugins(
  [
    [sourceMaps],
    [withOffline],
    [
      withMDX,
      {
        pageExtensions: ['js', 'jsx', 'mdx'],
      },
    ],
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
      // config.node = { fs: 'empty' };
      config.plugins.push(
        new webpack.EnvironmentPlugin([
          'TWITTER',
          'GITHUB',
          'INSTAGRAM',
          'EMAIL',
          'SENTRY',
          'ANALYTICS',
          'GITHUB_TOKEN',
        ])
      );
      console.log(config.plugins);
      return config;
    },
  }
);
