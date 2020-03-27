const fs = require('fs');
const path = require('path');

const { description, homepage } = require('../package.json');
const posts = require('../src/data/posts.json');

const OUT_DIR = path.join(process.cwd(), 'public');

const getCloudinaryURL = (image, settings = []) => {
  const base = 'https://res.cloudinary.com/dof0zryca/image/upload';
  const id = 'v1581285181/blog';
  const settingsString = ['f_auto', ...settings].join(',');

  return `${base}/${settingsString}/${id}/${image}`;
};

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
    date_published: post.publishedAt,
  })),
};

const jsonFeed = () => {
  fs.writeFileSync(
    path.join(OUT_DIR, 'feed.json'),
    JSON.stringify(feed, null, 2)
  );
};

jsonFeed();
