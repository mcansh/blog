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
  ],
  rules: {
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
        ],
      },
    ],
  },
};
