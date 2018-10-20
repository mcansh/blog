module.exports = {
  presets: ['next/babel', '@babel/flow'],
  plugins: ['polished', 'inline-dotenv', 'styled-components', 'react-intl'],
  env: {
    test: {
      presets: [
        [
          'next/babel',
          {
            'preset-env': {
              modules: 'commonjs',
            },
          },
        ],
      ],
    },
  },
};
