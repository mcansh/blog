const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

require('dotenv').config({ path: 'variables.env' });

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.GITHUB': JSON.stringify(process.env.GITHUB),
        'process.env.TWITTER': JSON.stringify(process.env.TWITTER),
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
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
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
