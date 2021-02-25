const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./app/{components,routes}/**/*.{js,ts,tsx,md,mdx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            code: null,
            pre: null,
            'pre code': null,
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
