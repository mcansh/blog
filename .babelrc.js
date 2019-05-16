module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    'styled-components',
    'root-import',
    ['inline-react-svg', { svgo: false }],
  ],
};
