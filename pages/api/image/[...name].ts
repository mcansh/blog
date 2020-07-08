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

const handler: NextApiHandler = async (req, res) => {
  const supportsWebP = req.headers.accept?.includes('image/webp');
  const {
    h: height,
    w: width,
    fm: explicitlyRequestedFormat,
    q: quality,
  } = getParams(req.query);

  const filename = (req.query.name as string[]).join('/');
  const format =
    explicitlyRequestedFormat ?? supportsWebP
      ? 'webp'
      : (filename as string).split('.')[1];

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

  const sharped: sharp.Sharp =
    format === 'webp'
      ? sharp(imageBuffer).webp(defaultOptions).resize(defaultResizeOptions)
      : /jpe?g/.test(format)
      ? sharp(imageBuffer).jpeg(defaultOptions).resize(defaultResizeOptions)
      : format === 'tiff'
      ? sharp(imageBuffer).tiff(defaultOptions).resize(defaultResizeOptions)
      : sharp(imageBuffer).png(defaultOptions).resize(defaultResizeOptions);

  const result = await sharped.toFormat(format.toString()).toBuffer();

  res.setHeader('Content-Type', `image/${format}`);
  res.setHeader('Content-Length', result.byteLength);
  return res.status(200).send(result);
};

export default handler;
