import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';

import { description } from '~/package.json';
import { getImageUrl } from '~/utils/get-image-url';
import { postFilePaths, POSTS_PATH } from '~/utils/mdx';
import { components } from '~/components/layouts/post';
import { Props } from '~/pages/[slug]';
import { Post } from '~/components/post-card';
import { getDeploymentURL } from '~/utils/get-deployment-url';

const OUT_DIR = path.join(process.cwd(), 'public');

interface PostData {
  content: string;
  filePath: string;
  source: Props['source'];
  data: Post;
}

const jsonFeed = async () => {
  const posts: PostData[] = await Promise.all(
    postFilePaths.map(async filePath => {
      const source = await fs.readFile(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);
      const mdxSource = (await renderToString(content, {
        components,
        scope: data,
      })) as Props['source'];

      return {
        content,
        filePath: filePath.replace(/\.mdx?$/, ''),
        source: mdxSource,
        data: data as Post,
      };
    })
  );

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
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
    items: sortedPosts.map(post => {
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
