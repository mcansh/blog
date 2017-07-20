module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'max-len': 0,
    'jsx-a11y/href-no-hash': 0,
  },
};
