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
    test: {
      presets: [
        [
          'next/babel',
          {
            'preset-env': {
              modules: 'commonjs',
            },
          },
        ],
      ],
    },
  },
};
