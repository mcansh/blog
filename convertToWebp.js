const webp = require('webp-converter'); // eslint-disable-line import/no-extraneous-dependencies
const readChunk = require('read-chunk'); // eslint-disable-line import/no-extraneous-dependencies
const fileType = require('file-type'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');

const imagesFolder = './static/images/posts';

fs.readdirSync(imagesFolder).forEach(file => {
  const stats = fs.lstatSync(`${imagesFolder}/${file}`);
  const isDirectory = stats.isDirectory();
  if (!isDirectory) {
    const buffer = readChunk.sync(`${imagesFolder}/${file}`, 0, 4100);
    const type = fileType(buffer);
    if (type && /image\/(?!webp)/.test(type.mime)) {
      const fileNoExtension = file.replace(type.ext, '');
      webp.cwebp(
        `${imagesFolder}/${file}`,
        `${imagesFolder}/${fileNoExtension}webp`,
        '-q 80',
        status => {
          console.log(status); // eslint-disable-line no-console
        }
      );
    }
  }
});
