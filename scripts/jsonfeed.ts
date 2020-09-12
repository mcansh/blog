import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { description } from '~/package.json';
import { getImageUrl } from '~/utils/get-image-url';
import { postFilePaths, POSTS_PATH } from '~/utils/mdx';
import { Post } from '~/components/post-card';

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
      } as { content: string; data: Post; filePath: string };
    })
  );

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: 'Logan McAnsh (@loganmcansh)',
    description,
    home_page_url: process.env.VERCEL_URL,
    feed_url: `${process.env.VERCEL_URL}/feed.json`,
    icon: `${process.env.VERCEL_URL}/static/images/logo/logo.png`,
    favicon: `${process.env.VERCEL_URL}/static/images/logo/logo.png`,
    author: {
      name: 'Logan McAnsh (@loganmcansh)',
      url: 'https://mcan.sh',
      avatar: `${process.env.VERCEL_URL}/static/images/headshot.jpeg`,
    },
    items: sortedPosts.map(post => ({
      id: post.filePath,
      url: `${process.env.VERCEL_URL}/${post.filePath}`,
      title: post.data.title,
      content_text: `${post.data.title}. See ${process.env.VERCEL_URL}/${post.data.filePath}!`,
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
