const mime = require('mime/lite');

const webp = image => {
  const imageRegex = /png|jpg/;
  const url = image.replace(imageRegex, 'webp');
  const type = mime.getType(image);

  return { url, type };
};

export default webp;
