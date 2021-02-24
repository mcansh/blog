module.exports = {
  plugins: [
    require('postcss-nested'),
    require('autoprefixer'),
    require('tailwindcss'),
    process.env.NODE_ENV === 'production' ? require('cssnano') : false,
  ].filter(Boolean),
};
