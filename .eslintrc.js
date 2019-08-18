const { configs } = require('eslint-plugin-mdx');

module.exports = {
  extends: ['mcansh/typescript', 'plugin:mdx/recommended'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.js', '.*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'spaced-comment': ['error', 'always', { markers: ['/ <reference'] }],
      },
    },
    {
      files: ['*.mdx'],
      ...configs.overrides,
      rules: {
        ...configs.overrides.rules,
        'react/prop-types': 'off',
      },
    },
  ],
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.tsx', '.mdx'] },
    ],
    'no-underscore-dangle': ['error', { allow: ['__NEXT_DATA__'] }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'jest.config.js',
          'utils/render-with-intl.tsx',
          'scripts/**/*',
          'next.config.js',
          'types/jest-dom.d.ts',
          '.eslintrc.js',
        ],
      },
    ],
  },
};
