module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.tsx', '.mdx'] },
    ],
    'react/prop-types': 'off',
    'no-underscore-dangle': ['error', { allow: ['__NEXT_DATA__'] }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'test-utils/index.tsx',
          'scripts/**/*',
          'types/jest-dom.d.ts',
          'next.config.js',
          '.eslintrc.js',
          'prettier.config.js',
          'stylelint.config.js',
          'jest.setup.js',
        ],
      },
    ],
  },
};
