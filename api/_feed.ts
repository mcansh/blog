import { parseISO } from 'date-fns';
import { Feed } from 'feed';

import { getPosts } from '../app/lib/get-posts';

async function getFeed() {
  const posts = await getPosts();
  const latestPost = posts[0];

  const feed = new Feed({
    title: 'Logan McAnsh',
    id: 'https://mcansh.blog',
    link: 'https://mcansh.blog',
    language: 'en',
    favicon: 'https://mcansh.blog/favicon.ico',
    copyright: `${new Date().getFullYear()} Logan McAnsh`,
    updated: parseISO(
      latestPost.frontmatter.lastEdited ?? latestPost.frontmatter.date
    ),
    author: {
      email: 'logan@mcan.sh',
      link: 'https://mcan.sh',
      name: 'Logan McAnsh',
    },
    feedLinks: {
      json: 'https://mcansh.blog/feed.json',
      atom: 'https://mcansh.blog/atom',
      rss: 'https://mcansh.blog/rss',
    },
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.frontmatter.title,
      date: parseISO(post.frontmatter.lastEdited ?? post.frontmatter.date),
      link: `https://mcansh.blog/blog/${post.name}`,
      id: post.name,
      published: parseISO(post.frontmatter.date),
      image: `https://mcansh.blog${post.frontmatter.image.imageUrl}`,
    });
  });

  return feed;
}

export { getFeed };
