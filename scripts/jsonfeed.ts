import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { description, homepage } from '~/package.json';
import { getImageUrl } from '~/utils/get-image-url';
import { postFilePaths, POSTS_PATH } from '~/utils/mdx';

const OUT_DIR = path.join(process.cwd(), 'public');

const jsonFeed = async () => {
  const posts = await Promise.all(
    postFilePaths.map(async filePath => {
      const source = await fs.readFile(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data,
        filePath: filePath.replace(/\.mdx?$/, ''),
      };
    })
  );

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

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
    items: sortedPosts.map(post => ({
      id: `${homepage}${post.filePath}`,
      url: `${homepage}${post.filePath}`,
      title: post.data.title,
      content_text: `${post.data.title}. See ${homepage}${post.data.path}!`,
      summary: post.data.title,
      image: getImageUrl(post.data.image.imageUrl),
      date_published: post.data.date,
    })),
  };

  return fs.writeFile(
    path.join(OUT_DIR, 'feed.json'),
    JSON.stringify(feed, null, 2)
  );
};

jsonFeed();
