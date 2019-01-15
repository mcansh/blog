module.exports = {
  extends: ['plugin:jest/recommended', 'mcansh'],
  plugins: ['jest'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    'no-underscore-dangle': ['error', { allow: ['__NEXT_DATA__'] }],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-return-assign': ['error', 'except-parens'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*.js',
          'jest.setup.js',
          'jest.config.js',
          'scripts/create-post.js',
          'utils/renderWithIntl.js',
          'scripts/compress.js',
        ],
      },
    ],
  },
};
