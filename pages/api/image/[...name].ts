import { ParsedUrlQuery } from 'querystring';

import { NextApiHandler } from 'next';
import sharp from 'sharp';
import { getBaseURL } from '@mcansh/next-now-base-url';

function getParam<T = string>(param: T | T[] | undefined) {
  return Array.isArray(param) ? param[0] : param;
}

function getParams(
  params: ParsedUrlQuery
): { [key: string]: string | undefined } {
  return Object.entries(params).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: getParam(value) }),
    {}
  );
}

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

  const base = getBaseURL(req);

  const image = await fetch(`${base}/${filename}`).then(d => d.blob());

  const imageAsArrayBuffer = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageAsArrayBuffer);

  const defaultOptions = {
    quality: quality ? Number(quality) : undefined,
  };
  const defaultResizeOptions = {
    height: height ? Number(height) : undefined,
    width: width ? Number(width) : undefined,
  };

  const sharped: sharp.Sharp = sharp(imageBuffer)
    .toFormat(format, defaultOptions)
    .resize(defaultResizeOptions);

  const result = await sharped.toFormat(format.toString()).toBuffer();

  res.setHeader('Content-Type', `image/${format}`);
  res.setHeader('Content-Length', result.byteLength);
  return res.status(200).send(result);
};

export default handler;
