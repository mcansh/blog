/* eslint-disable import/no-extraneous-dependencies */
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

// compress and convert post images to webp
imagemin(['static/images/posts/*.{jpg,png}'], 'static/images/posts', {
  plugins: [imageminWebp(), imageminMozjpeg(), imageminPngquant()],
}).then(files =>
  files.forEach(file => console.log(`${file.path} converted successfully`))
);

// logos dont need to be webp
imagemin(['static/images/logo/*.{jpg,png}'], 'static/images/logo', {
  plugins: [imageminMozjpeg(), imageminPngquant()],
}).then(files =>
  files.forEach(file => console.log(`${file.path} converted successfully`))
);
