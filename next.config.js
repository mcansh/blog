const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const nanoid = require('nanoid');

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
      // next.js uses nanoid internally for generating buildId
      return nanoid();
    },
    webpack: (config, { dev }) => {
      config.node = { fs: 'empty' };

      if (!dev) {
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
      }

      return config;
    },
  }
);
