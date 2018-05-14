import { lookup } from 'mime-types';

const webp = image => {
  const imageRegex = /png|jpg/;
  const url = image.replace(imageRegex, 'webp');
  const type = lookup(image);

  return { url, type };
};

export default webp;
