module.exports = api => {
  api.cache(true);
  const presets = ['next/babel'];
  const plugins = ['styled-components', 'macros', 'preval'];

  return { presets, plugins };
};
