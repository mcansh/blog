const {
  processors,
  ...config
} = require('@mcansh/eslint-config/stylelint.config');

module.exports = {
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        moduleName: 'styled-components',
        importName: 'default',
        strict: false,
        ignoreFiles: [],
        parserPlugins: [
          'jsx',
          'objectRestSpread',
          ['decorators', { decoratorsBeforeExport: true }],
          'classProperties',
          'exportExtensions',
          'asyncGenerators',
          'functionBind',
          'functionSent',
          'dynamicImport',
          'optionalCatchBinding',
          'optionalChaining',
          'nullishCoalescingOperator',
        ],
      },
    ],
  ],
  ...config,
  rules: {
    ...config.rules,
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
    'selector-max-type': [0, { ignoreTypes: '/^((?!^i-amp-).)*$/' }],
    'selector-class-pattern': '^((?!^-amp-).)*$',
  },
};
