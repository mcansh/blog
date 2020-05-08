import fs from 'fs';
import path from 'path';

import { description, homepage } from '~/package.json';
import { posts } from '~/posts';
import getCloudinaryURL from '~/utils/get-cloudinary-url';

const OUT_DIR = path.join(process.cwd(), 'public');

const feed = {
  version: 'https://jsonfeed.org/version/1',
  title: 'Logan McAnsh (@loganmcansh)',
  description,
  home_page_url: homepage,
  feed_url: `${homepage}/feed.json`,
  icon: `${homepage}/static/images/logo/logo.png`,
  favicon: `${homepage}/static/images/logo/logo.png`,
  author: {
    name: 'Logan McAnsh (@loganmcansh)',
    url: 'https://mcan.sh',
    avatar: `${homepage}/static/images/headshot.jpeg`,
  },
  items: posts.map(post => ({
    id: `${homepage}${post.path}`,
    url: `${homepage}${post.path}`,
    title: post.title,
    content_text: `${post.title}. See ${homepage}${post.path}!`,
    summary: post.title,
    image: getCloudinaryURL(post.image.imageUrl),
    date_published: post.date,
  })),
};

const jsonFeed = () => {
  fs.writeFileSync(
    path.join(OUT_DIR, 'feed.json'),
    JSON.stringify(feed, null, 2)
  );
};

jsonFeed();
