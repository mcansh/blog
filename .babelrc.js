module.exports = {
  presets: ['next/babel', '@babel/flow'],
  plugins: [
    'styled-components',
    'polished',
    'inline-dotenv',
    'react-intl',
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    production: {
      presets: ['next/babel'],
      plugins: [
        [
          'react-intl',
          {
            messagesDir: 'lang/.messages/',
          },
        ],
      ],
    },
  },
};
