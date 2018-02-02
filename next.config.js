const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { name } = require('./package.json');

module.exports = {
  webpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin());
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          cacheId: name,
          minify: true,
          verbose: true,
          staticFileGlobs: [
            'static/**/*', // Precache all static files by default
          ],
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/,
            },
          ],
        })
      );
    }
    return config;
  },
};
