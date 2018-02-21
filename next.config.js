const webpack = require('webpack');
const NextWorkboxWebpackPlugin = require('@pwa/next-workbox-webpack-plugin');

module.exports = {
  webpack: (config, { isServer, dev, buildId, config: { distDir } }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxWebpackPlugin({
          distDir,
          buildId,
        })
      );
    }
    if (!dev) {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }
    return config;
  },
};
