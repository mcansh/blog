module.exports = {
  extends: ['mcansh'],
  plugins: ['jest', 'flowtype'],
  env: {
    jest: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/scripts/*.js',
          '**/utils/authorInfo.js',
          '**/__tests__/**/*.js',
          '**/next.config.js'
        ],
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
