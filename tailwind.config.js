const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./app/{components,routes}/**/*.{js,ts,tsx,md,mdx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
