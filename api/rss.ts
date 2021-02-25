import type { NowApiHandler } from '@vercel/node';

import { getFeed } from './_feed';

const handler: NowApiHandler = async (_req, res) => {
  const feed = await getFeed();

  res.setHeader('Content-Type', 'application/xml');
  return res.send(feed.rss2());
};

export default handler;
