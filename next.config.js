const NextWorkboxWebpackPlugin = require('next-workbox-webpack-plugin');

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
    config.node = { fs: 'empty' };
    return config;
  },
};
