const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
require('dotenv').config({ path: 'variables.env' });

module.exports = {
  webpack: (config, { dev }) => {
    const oldEntry = config.entry;
    config.entry = () => {
      oldEntry().then(entry => {
        entry['main.js'].push(path.resolve('./utils/offline'));
        return entry;
      });
    }
    /* Enable only in Production */
    if (!dev) {
      // Service Worker
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          cacheId: 'mcansh.blog',
          filename: 'sw.js',
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          staticFileGlobs: [
            'static/**/*' // Precache all static files by default
          ],
          runtimeCaching: [
            // Example with different handlers
            {
              handler: 'fastest',
              urlPattern: /[.](png|jpg|css)/
            },
            {
              handler: 'networkFirst',
              urlPattern: /^http.*/ //cache all files
            }
          ]
        })
      );
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.GITHUB': JSON.stringify(process.env.GITHUB),
        'process.env.TWITTER': JSON.stringify(process.env.TWITTER),
        'process.env.PORT': JSON.stringify(process.env.PORT)
      })
    );
    config.module.rules.push(
      {
        test: /\.(css|sass)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.sass$/,
        use: [
          'babel-loader', 'raw-loader', 'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    );
    return config;
  }
};
