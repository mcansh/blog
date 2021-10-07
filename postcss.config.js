module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-100vh-fix'),
    process.env.NODE_ENV === 'production' ? require('cssnano') : false,
  ].filter(Boolean),
};
