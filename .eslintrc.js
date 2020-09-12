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
