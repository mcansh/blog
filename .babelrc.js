module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
          },
        },
      },
    ],
  ],
  plugins: [
    ['polished'],
    ['inline-dotenv'],
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
    'react-intl',
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
