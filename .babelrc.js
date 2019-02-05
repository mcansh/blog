// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version, repository } = require('./package.json');

const env = {
  'process.env.VERSION': version,
  'process.env.GITHUB_URL': `https://github.com/${repository}`,
  'process.env.NODE_ENV': process.env.NODE_ENV,
  'process.env.ANALYTICS': process.env.ANALYTICS,
};

module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    'styled-components',
    'root-import',
    'react-intl',
    ['transform-define', env],
    ['inline-react-svg', { svgo: false }],
  ],
};
