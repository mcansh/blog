const webp = require('webp-converter'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');
const path = require('path');

const imagesFolder = './static/images/posts';

fs.readdirSync(imagesFolder).forEach(file => {
  const extension = path.extname(file);
  const fileNoExtension = file.replace(extension, '');
  webp.cwebp(
    `${imagesFolder}/${file}`,
    `${imagesFolder}/webp/${fileNoExtension}.webp`,
    '-q 80',
    status => {
      console.log(status); // eslint-disable-line no-console
    },
  );
});
