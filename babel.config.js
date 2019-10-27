module.exports = api => {
  api.cache(true);
  const presets = ['next/babel'];
  const plugins = [
    'styled-components',
    'root-import',
    ['inline-react-svg', { svgo: false }],
    'macros',
    'preval',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ];

  return { presets, plugins };
};
