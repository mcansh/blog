module.exports = api => {
  api.cache(true);
  const presets = ['next/babel'];
  const plugins = [
    'styled-components',
    ['inline-react-svg', { svgo: false }],
    'macros',
    'preval',
  ];

  return { presets, plugins };
};
