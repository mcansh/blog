import { promises as fs } from 'fs';
import path from 'path';

import { NextApiHandler } from 'next';
import sharp from 'sharp';

import { getParams } from '~/utils/params';

const denylist = ['heic', 'heif'];

const handler: NextApiHandler = async (req, res) => {
  const supportsWebP = req.headers.accept?.includes('image/webp');
  const {
    h: height,
    w: width,
    fm: explicitlyRequestedFormat,
    q: quality,
  } = getParams(req.query);

  const filename = (req.query.name as string[]).join('/');
  const format = explicitlyRequestedFormat
    ? explicitlyRequestedFormat
    : supportsWebP
    ? 'webp'
    : (filename as string).split('.')[1];

  if (denylist.includes(format)) {
    return res
      .status(400)
      .end(`requested format ${format} is not supported at this time`);
  }

  const image = await fs.readFile(path.join(process.cwd(), 'public', filename));

  const imageBuffer = Buffer.from(image);

  const defaultOptions = {
    quality: quality ? Number(quality) : undefined,
  };
  const defaultResizeOptions = {
    height: height ? Number(height) : undefined,
    width: width ? Number(width) : undefined,
  };

  const sharped = sharp(imageBuffer)
    .toFormat(format, defaultOptions)
    .resize(defaultResizeOptions);

  const result = await sharped.toBuffer();

  res.setHeader('Content-Type', `image/${format}`);
  res.setHeader('Content-Length', result.byteLength);
  return res.status(200).send(result);
};

export default handler;
