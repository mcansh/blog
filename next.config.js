const withSourceMaps = require('@zeit/next-source-maps')();
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withSVG = require('@mcansh/next-svgr')();

const pkgJSON = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    modern: true,
    plugins: true,
  },
  headers: () => [
    {
      source: '/manifest.webmanifest',
      headers: [
        { key: 'content-type', value: 'application/manifest+json' },
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
      source: '/feed.json',
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
      source: '/rss',
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
      source: '/feed',
      destination: '/feed.json',
    },
    {
      source: '/rss',
      destination: '/rss.xml',
    },
    {
      source: '/atom',
      destination: '/atom.xml',
    },
    {
      source: '/sitemap',
      destination: '/sitemap.xml',
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
      destination: 'https://github.com/mcansh/blog/releases',
      permanent: isProd,
    },
  ],
  env: {
    SENTRY_RELEASE: `blog@${pkgJSON.version}`,
    GITHUB_URL: `https://github.com/${pkgJSON.repository}`,
    VERSION: pkgJSON.version,
    VERCEL_URL: `http${isProd ? 's' : ''}://${process.env.VERCEL_URL}`,
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
  withSourceMaps(withOffline(withSVG(nextConfig)))
);
