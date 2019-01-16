const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const withOffline = require('next-offline');
const withSize = require('next-size');
const withTypescript = require('@zeit/next-typescript');

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
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
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'staleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|svg|css)/,
      },
      {
        handler: 'networkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },
  target: 'serverless',
  webpack: config => {
    config.node = { fs: 'empty' };
    return config;
  },
};

module.exports = withSize(
  withMDX(withBundleAnalyzer(withOffline(withTypescript(nextConfig))))
);
