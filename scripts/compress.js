/* eslint-disable import/no-extraneous-dependencies */
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const sharp = require('sharp');
// const { lookup } = require('mime-types');
const { readdirSync } = require('fs');
/* eslint-enable import/no-extraneous-dependencies */

const imageDir = 'static/images/posts';
readdirSync(imageDir).forEach(file => {
  const fullFile = `${imageDir}/${file}`;
  // const fileType = lookup(fullFile);
  const fileExtension = /[^.]+$/.exec(file);
  const fileName = file.replace(`.${fileExtension}`, '');
  // const reg = /image\/jpeg|image\/png/;
  // if (reg.test(fileType)) {
  sharp(fullFile)
    .resize(150)
    .toFile(`${imageDir}/thumb/${fileName}.${fileExtension}`, error => {
      if (error) {
        console.log(error);
      } else {
        console.log(`${file} converted successfully`);
      }
    });
  // }
});

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
