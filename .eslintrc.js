module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.tsx', '.mdx'] },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          'test-utils/index.tsx',
          'scripts/**/*',
          '@types/jest-dom.d.ts',
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
