module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    'styled-components',
    'root-import',
    'react-intl',
    ['inline-react-svg', { svgo: false }],
  ],
};
