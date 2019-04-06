module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-config-amp',
  ],
  rules: {
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
    'media-feature-name-no-unknown': [
      true,
      { ignoreMediaFeatureNames: ['prefers-color-scheme'] },
    ],
  },
};
