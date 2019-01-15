const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const withSize = require('next-size');
const withTypescript = require('@zeit/next-typescript');

module.exports = withPlugins(
  [
    withSize,
    withSourceMaps,
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
    [withTypescript],
  ],
  {
    target: 'serverless',
    webpack: config => {
      config.node = { fs: 'empty' };

      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'service-worker.js',
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          staticFileGlobs: ['static/**/*'],
          forceDelete: true,
          runtimeCaching: [
            {
              handler: 'fastest',
              urlPattern: /[.](webp|png|jpg|svg|css)/,
            },
            {
              handler: 'networkFirst',
              urlPattern: /^http.*/,
            },
          ],
        })
      );

      return config;
    },
  }
);
