module.exports = api => {
  api.cache(true);
  const presets = ['next/babel'];
  const plugins = [
    'styled-components',
    'root-import',
    ['inline-react-svg', { svgo: false }],
    'macros',
  ];

  return { presets, plugins };
};
