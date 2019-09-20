module.exports = api => {
  api.cache(true);
  const presets = ['next/babel', '@zeit/next-typescript/babel'];
  const plugins = [
    'styled-components',
    'root-import',
    ['inline-react-svg', { svgo: false }],
    'macros',
  ];

  const env = {
    test: {
      plugins: ['transform-dynamic-import'],
    },
  };

  return { presets, plugins, env };
};
