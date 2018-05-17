const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const sourceMaps = require('@zeit/next-source-maps');
const withOffline = require('next-offline');

module.exports = withPlugins([[optimizedImages], [sourceMaps], [withOffline]], {
  webpack: config => {
    config.node = { fs: 'empty' };
    return config;
  },
});
