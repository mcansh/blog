/* eslint-disable import/no-extraneous-dependencies */
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
/* eslint-enable import/no-extraneous-dependencies */

// compress and convert post images to webp
imagemin(['static/images/posts/*.{jpg,png}'], 'static/images/posts', {
  plugins: [imageminWebp(), imageminMozjpeg(), imageminPngquant()],
}).then(files => console.log(files));

// logos dont need to be webp
imagemin(['static/images/logo/*.{jpg,png}'], 'static/images/logo', {
  plugins: [imageminMozjpeg(), imageminPngquant()],
}).then(files => console.log(files));
