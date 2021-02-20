module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  parserOptions: {
    project: ['./app/tsconfig.json'],
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/__tests__/**/*',
          '.eslintrc.js',
          'jest.setup.js',
          'postcss.config.js',
          'prettier.config.js',
          'tailwind.config.js',
        ],
      },
    ],
  },
};
