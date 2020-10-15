import { promises as fs } from 'fs';
import path from 'path';
import { createHash } from 'crypto';

import { NextApiHandler } from 'next';
import sharp from 'sharp';
import { fromBuffer } from 'file-type';

import { getParams } from '~/utils/params';

const md5 = (str: string | Buffer) =>
  createHash('md5').update(str).digest('hex');

const denylist = ['heic', 'heif'];

async function getFileTypeWithFallback(fileBuffer: Buffer, fallback: string) {
  const result = await fromBuffer(fileBuffer);
  return result ?? { ext: fallback, mime: `image/${fallback}` };
}

const handler: NextApiHandler = async (req, res) => {
  const supportsWEBP = req.headers.accept?.includes('image/webp');

  const {
    h: height,
    w: width,
    fm: explicitlyRequestedFormat,
    q: quality,
  } = getParams(req.query);

  const filename = (req.query.name as string[]).join('/');
  const image = await fs.readFile(path.join(process.cwd(), 'public', filename));

  const format = explicitlyRequestedFormat
    ? {
        mime: `image/${explicitlyRequestedFormat}`,
        ext: explicitlyRequestedFormat,
      }
    : supportsWEBP
    ? { ext: 'webp', mime: `image/webp` }
    : await getFileTypeWithFallback(image, (filename as string).split('.')[1]);

  if (denylist.includes(format.ext)) {
    return res
      .status(400)
      .end(
        `requested format "${format.ext}" is not supported by sharp at this time`
      );
  }

  const defaultOptions = {
    quality: quality ? Number(quality) : undefined,
  };
  const defaultResizeOptions = {
    height: height ? Number(height) : undefined,
    width: width ? Number(width) : undefined,
  };

  const sharped = sharp(image)
    .toFormat(format.ext, defaultOptions)
    .resize(defaultResizeOptions);

  const result = await sharped.toBuffer();

  const etag = md5(result);

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }

  res.setHeader('etag', etag);
  res.setHeader('Content-Type', format.mime);
  res.setHeader('Content-Length', result.byteLength);
  res.setHeader(
    'Cache-Control',
    'max-age=604800, s-maxage=10, stale-while-revalidate'
  );
  return res.status(200).end(result, 'binary');
};

export default handler;
