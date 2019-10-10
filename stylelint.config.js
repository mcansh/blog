module.exports = {
  ...require('eslint-config-mcansh/stylelint.config'),
  rules: {
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
    'selector-max-type': [0, { ignoreTypes: '/^((?!^i-amp-).)*$/' }],
    'selector-class-pattern': '^((?!^-amp-).)*$',
  },
};
