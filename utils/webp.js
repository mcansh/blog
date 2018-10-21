// @flow

import mime from 'mime/lite';
import { parse } from 'path';

const webp = (image: string): { url: string, type: string } => {
  const { name } = parse(image);

  const type = mime.getType(image);

  const url = `${name}.webp`;

  return { url, type };
};

export default webp;
