module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    'styled-components',
    'polished',
    'inline-dotenv',
    'react-intl',
    ['inline-react-svg', { svgo: false }],
    'root-import',
  ],
};
