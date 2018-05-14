const withPlugins = require('next-compose-plugins');
const NextWorkboxWebpackPlugin = require('next-workbox-webpack-plugin');
const optimizedImages = require('next-optimized-images');
const sourceMaps = require('@zeit/next-source-maps');

module.exports = withPlugins([[optimizedImages], [sourceMaps]], {
  webpack: (config, { isServer, dev, buildId, config: { distDir } }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxWebpackPlugin({
          distDir,
          buildId,
        })
      );
    }
    config.node = { fs: 'empty' };
    return config;
  },
});
