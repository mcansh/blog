const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: 'all',
  experimental: 'all',
  purge: ['./{components,pages}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extends: {
      fontFamily: {
        sans: ['SF Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
