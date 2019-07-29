module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  rules: {
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
    'selector-max-type': [0, { ignoreTypes: '/^((?!^i-amp-).)*$/' }],
    'selector-class-pattern': '^((?!^-amp-).)*$',
  },
};
