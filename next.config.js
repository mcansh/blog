const withSourceMaps = require('@zeit/next-source-maps')();
const withMDX = require('@next/mdx')();
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { version, repository } = require('./package.json');

const nextConfig = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  experimental: {
    jsconfigPaths: true,
    modern: true,
    plugins: true,
  },
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'StaleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|svg|css|woff|woff2)/,
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },

  env: {
    TWITTER: 'loganmcansh',
    INSTAGRAM: 'loganmcansh',
    GITHUB: 'mcansh',
    EMAIL: 'logan+blog@mcan.sh',
    SENTRY_DSN: 'https://07a54d3b59bb4bf5ad1c6ddf050d51c1@sentry.io/197817',
    SENTRY_RELEASE: `blog@${version}`,
    ANALYTICS: 'UA-87731356-4',
    GITHUB_URL: `https://github.com/${repository}`,
    VERSION: version,
    FATHOM_SITE_ID: 'ROTOLYJX',
    FATHOM_SUBDOMAIN: 'https://tz8sxj4sit.mcansh.blog',
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    if (isServer) {
      require('./scripts/atom');
      require('./scripts/jsonfeed');
      require('./scripts/manifest');
      require('./scripts/sitemap');
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                { removeViewBox: false },
                { removeDimensions: true },
                {
                  prefixIds: {
                    delim: '_',
                    prefixIds: true,
                    prefixClassNames: false,
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(
  withSourceMaps(withMDX(withOffline(nextConfig)))
);
