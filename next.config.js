const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = withPlugins(
  [
    [withSourceMaps],
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
    generateBuildId: async () => {
      if (process.env.SIZE_LIMIT != null) return 'blog';
      // next.js uses nanoid internally for generating the buildId
      const nanoid = require('nanoid'); // eslint-disable-line global-require
      return nanoid();
    },
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
              urlPattern: /[.](webp|png|jpg)/,
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
