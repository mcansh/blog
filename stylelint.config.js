module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-prettier/recommended'],
  rules: {
    'prettier/prettier': true,
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
    'selector-max-type': [0, { ignoreTypes: '/^((?!^i-amp-).)*$/' }],
    'selector-class-pattern': '^((?!^-amp-).)*$',
  },
};
