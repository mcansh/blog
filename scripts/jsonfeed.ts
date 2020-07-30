import fs from 'fs';
import path from 'path';

import pkgJSON from '~/package.json';
import { posts } from '~/posts';
import { getImageUrl } from '~/utils/get-image-url';

const OUT_DIR = path.join(process.cwd(), 'public');

const feed = {
  version: 'https://jsonfeed.org/version/1',
  title: 'Logan McAnsh (@loganmcansh)',
  description: pkgJSON.description,
  home_page_url: pkgJSON.homepage,
  feed_url: `${pkgJSON.homepage}/feed.json`,
  icon: `${pkgJSON.homepage}/static/images/logo/logo.png`,
  favicon: `${pkgJSON.homepage}/static/images/logo/logo.png`,
  author: {
    name: 'Logan McAnsh (@loganmcansh)',
    url: 'https://mcan.sh',
    avatar: `${pkgJSON.homepage}/static/images/headshot.jpeg`,
  },
  items: posts.map(post => ({
    id: `${pkgJSON.homepage}${post.path}`,
    url: `${pkgJSON.homepage}${post.path}`,
    title: post.title,
    content_text: `${post.title}. See ${pkgJSON.homepage}${post.path}!`,
    summary: post.title,
    image: getImageUrl(post.image.imageUrl),
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
