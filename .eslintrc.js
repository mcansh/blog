module.exports = {
  extends: [
    '@mcansh/eslint-config/typescript',
    'plugin:@next/eslint-plugin-next/recommended',
  ],
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
          '__tests__/**/*',
          '.eslintrc.js',
          '@types/jest-dom.d.ts',
          'jest.setup.js',
          'next.config.js',
          'postcss.config.js',
          'prettier.config.js',
          'scripts/**/*',
          'stylelint.config.js',
          'tailwind.config.js',
        ],
      },
    ],
  },
};
