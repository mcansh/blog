import { promises as fs } from 'fs';
import path from 'path';

import { Feed } from 'feed';

import { getPosts, renderPostToString } from '~/lib/get-post';
import { getDeploymentURL } from '~/utils/get-deployment-url';
import { getImageUrl } from '~/utils/get-image-url';
import pkgJSON from '~/package.json';

const OUT_DIR = path.join(process.cwd(), 'public');

async function generateFeeds() {
  const posts = await getPosts();
  const [latest] = posts;

  const postsWithMDX = await Promise.all(
    posts.map(async post => {
      const mdxSource = await renderPostToString(post.content, post.data);
      return {
        content: post.content,
        data: post.data,
        source: mdxSource,
        filePath: post.filePath,
      };
    })
  );

  const deployment = getDeploymentURL();
  const image = getDeploymentURL('/static/images/logo/logo.png');
  const favicon = getDeploymentURL('/favicon.ico');

  const feed = new Feed({
    title: 'Logan McAnsh (@loganmcansh)',
    description: pkgJSON.description,
    id: deployment,
    link: deployment,
    language: 'en',
    image,
    favicon,
    copyright: `All rights reserved ${new Date().getFullYear()}, Logan McAnsh`,
    updated: new Date(latest.data.lastEdited),
    feedLinks: {
      rss: `${deployment}/rss`,
      json: `${deployment}/feed`,
      atom: `${deployment}/atom`,
    },
    author: {
      name: 'Logan McAnsh',
      email: 'logan@mcan.sh',
      link: 'https://mcan.sh',
    },
  });

  postsWithMDX.forEach(post => {
    feed.addItem({
      title: post.data.title,
      id: post.filePath,
      link: `${deployment}/${post.filePath}`,
      description: post.data.title,
      content: post.source.renderedOutput,
      date: new Date(post.data.lastEdited),
      published: new Date(post.data.date),
      image: getImageUrl(post.data.image.imageUrl, { w: 1200 }),
    });
  });

  const promises = [
    fs.writeFile(path.join(OUT_DIR, 'rss.xml'), feed.rss2()),
    fs.writeFile(path.join(OUT_DIR, 'atom.xml'), feed.atom1()),
    fs.writeFile(path.join(OUT_DIR, 'feed.json'), feed.json1()),
  ];

  return Promise.all(promises);
}

generateFeeds();
