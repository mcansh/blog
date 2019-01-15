module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: ['styled-components', 'polished', 'inline-dotenv', 'react-intl'],
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
