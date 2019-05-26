module.exports = {
  extends: ['mcansh/typescript', 'plugin:mdx/recommended'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  overrides: {
    files: ['*.js', '.*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  plugins: ['clean-styled-components'],
  rules: {
    'clean-styled-components/single-component-per-file': 'error',
    'no-underscore-dangle': ['error', { allow: ['__NEXT_DATA__'] }],
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
