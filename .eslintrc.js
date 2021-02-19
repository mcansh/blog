module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  parserOptions: {
    project: ['./app/tsconfig.json'],
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.tsx', '.mdx'] },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.eslintrc.js',
          '**/__tests__/**/*',
          'jest.setup.js',
          'postcss.config.js',
          'prettier.config.js',
          'tailwind.config.js',
        ],
      },
    ],
  },
};
