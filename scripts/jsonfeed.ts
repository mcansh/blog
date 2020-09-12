import { promises as fs } from 'fs';
import path from 'path';

import { description } from '~/package.json';
import { getImageUrl } from '~/utils/get-image-url';
import { getDeploymentURL } from '~/utils/get-deployment-url';
import { getPosts, renderPostToString } from '~/lib/get-post';

const OUT_DIR = path.join(process.cwd(), 'public');

const jsonFeed = async () => {
  const posts = await getPosts();

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
  const feedUrl = getDeploymentURL('/feed.json');
  const logo = getDeploymentURL('/static/images/logo/logo.png');
  const favicon = getDeploymentURL('/favicon.ico');
  const avatar = getDeploymentURL('/static/images/headshot.jpeg');

  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: 'Logan McAnsh (@loganmcansh)',
    description,
    home_page_url: deployment,
    feed_url: feedUrl,
    icon: logo,
    favicon,
    author: {
      name: 'Logan McAnsh (@loganmcansh)',
      url: 'https://mcan.sh',
      avatar,
    },
    items: postsWithMDX.map(post => {
      const postUrl = getDeploymentURL(post.filePath);
      return {
        id: post.filePath,
        url: postUrl,
        title: post.data.title,
        content_text: post.content,
        content_html: post.source.renderedOutput,
        summary: post.data.title,
        image: getImageUrl(post.data.image.imageUrl),
        date_published: post.data.date,
        date_modified: post.data.lastEdited,
      };
    }),
  };

  return fs.writeFile(
    path.join(OUT_DIR, 'feed.json'),
    JSON.stringify(feed, null, 2)
  );
};

jsonFeed();
