const path = require('path');

const withSourceMaps = require('@zeit/next-source-maps')();
const mdxPrism = require('mdx-prism');
const withMdxEnhanced = require('next-mdx-enhanced');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { version, repository } = require('./package.json');

const withMDX = withMdxEnhanced({
  layoutPath: 'components/layouts/post',
  defaultLayout: true,
  rehypePlugins: [mdxPrism],
  extendFrontMatter: {
    process: (_mdxContent, frontMatter) => ({
      // eslint-disable-next-line no-underscore-dangle
      path: `/${frontMatter.__resourcePath.split('.mdx')[0]}`,
    }),
  },
});

const nextConfig = {
  // third party
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

  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  experimental: {
    // jsconfigPaths: true,
    modern: true,
    plugins: true,
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
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['~'] = path.resolve('./');

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    if (isServer) {
      // we're in build mode so enable shared caching for the GitHub API
      process.env.USE_CACHE = 'true';

      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // These scripts can import components from the app and use ES modules
        entries['./scripts/build-files.js'] = './scripts/build-files.ts';

        return entries;
      };
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
