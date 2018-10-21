// @flow

import mime from 'mime/lite';
import path from 'path';

type returnObject = {
  url: string,
  type?: string,
};

const webp = (image: string): returnObject => {
  const { name } = path.parse(image);

  const type = mime.getType(image);

  if (type == null) {
    throw new Error(`Image: ${image}, doesn't have a mimetype`);
  }

  const url = `${name}.webp`;

  return { url, type };
};

export default webp;
