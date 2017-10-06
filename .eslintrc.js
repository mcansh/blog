module.exports = {
  extends: 'airbnb',
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'max-len': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'class-methods-use-this': 0,
    'react/jsx-curly-brace-presence': 0,
    'jsx-a11y/anchor-is-valid': 0,
  },
};
