// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');

const env = {
  'process.env.VERSION': version,
  'process.env.NODE_ENV': process.env.NODE_ENV,
  'process.env.ANALYTICS': process.env.ANALYTICS,
};

module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    'styled-components',
    'inline-dotenv',
    'react-intl',
    ['inline-react-svg', { svgo: false }],
    'root-import',
    ['transform-define', env],
  ],
};
