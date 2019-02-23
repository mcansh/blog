module.exports = {
  extends: ['mcansh/typescript', 'plugin:mdx/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-underscore-dangle': ['error', { allow: ['__NEXT_DATA__'] }],
    'multiline-comment-style': ['error', 'starred-block'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'jest.setup.js',
          'jest.config.js',
          'utils/render-with-intl.tsx',
          'scripts/**/*',
          'next.config.js',
        ],
      },
    ],
  },
};
