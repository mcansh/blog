import mime from 'mime/lite';
import path from 'path';

const webp = (image: string): { url: string; type: string | null } => {
  const { name } = path.parse(image);

  const type = mime.getType(image);

  if (type == null) {
    throw new Error(`Image: ${image}, doesn't have a mimetype`);
  }

  const url = `${name}.webp`;

  return { url, type };
};

export default webp;
