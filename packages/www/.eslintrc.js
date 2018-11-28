module.exports = {
  extends: ['mcansh'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/scripts/*.js', '**/utils/authorInfo.js'] },
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
