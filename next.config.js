const withSourceMaps = require('@zeit/next-source-maps')();
const withMdxEnhanced = require('next-mdx-enhanced');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withSVG = require('@mcansh/next-svgr')();

const { version, repository } = require('./package.json');

const withMDX = withMdxEnhanced({
  layoutPath: 'components/layouts/post',
  defaultLayout: true,
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
    modern: true,
    plugins: true,
    headers: () => [
      {
        source: '/manifest.webmanifest',
        headers: [
          { key: 'content-type', value: 'application/manifest+json' },
          { key: 'cache-control', value: 'public, s-max-age=43200, immutable' },
        ],
      },
      {
        source: '/feed.json',
        headers: [
          { key: 'cache-control', value: 'public, s-max-age=43200, immutable' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'cache-control', value: 'public, s-max-age=43200, immutable' },
        ],
      },
      {
        source: '/atom',
        headers: [
          { key: 'cache-control', value: 'public, s-max-age=43200, immutable' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'cache-control', value: 'max-age=0' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ],
    rewrites: () => [
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
      {
        source: '/atom',
        destination: '/atom.xml',
      },
      {
        source: '/.well-known/brave-rewards-verification.txt',
        destination: '/brave-rewards-verification.txt',
      },
      {
        source: '/manifest.webmanifest',
        destination: '/manifest.webmanifest',
      },
      {
        source: '/manifest.json',
        destination: '/manifest.webmanifest',
      },
    ],
    redirects: () => [
      {
        source: '/changelog',
        statusCode: 301,
        destination: 'https://github.com/mcansh/blog/releases',
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

    return config;
  },
};

module.exports = withBundleAnalyzer(
  withSourceMaps(withMDX(withOffline(withSVG(nextConfig))))
);
