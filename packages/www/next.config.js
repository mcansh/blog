/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : require('next-server/constants');
/* eslint-enable import/no-unresolved, import/no-extraneous-dependencies */

module.exports = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  // eslint-disable-next-line global-require
  const withMDX = require('@zeit/next-mdx')({
    extension: /\.mdx?$/,
  });

  return withMDX({ pageExtensions: ['js', 'mdx'] });
};
