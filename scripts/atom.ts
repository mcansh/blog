import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { description } from '../package.json';

import { postFilePaths, POSTS_PATH } from '~/utils/mdx';
import { getDeploymentURL } from '~/utils/get-deployment-url';

const OUT_DIR = path.join(process.cwd(), 'public');

const generateAtom = async () => {
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

  const [latest] = sortedPosts;

  const deployment = getDeploymentURL();
  const atomFeed = getDeploymentURL('/atom');

  const atom = `<feed xmlns="http://www.w3.org/2005/Atom">
    <title>Logan McAnsh (@loganmcansh)</title>
    <subtitle>${description}</subtitle>
    <link href="${atomFeed}" rel="self"/>
    <link href="${deployment}"/>
    <updated>${latest.data.date}</updated>
    <id>${deployment}</id>
    <author>
      <name>Logan McAnsh</name>
      <email>logan@mcan.sh</email>
    </author>
    ${posts
      .map(
        post => `
      <entry>
        <id>${post.filePath}</id>
        <title>${post.data.title}</title>
        <link href="${deployment}/${post.filePath}"/>
        <updated>${post.data.lastEdited}</updated>
        <published>${post.data.date}</published>
      </entry>
    `
      )
      .join('')}
  </feed>`;

  return fs.writeFile(path.join(OUT_DIR, 'atom.xml'), atom);
};

generateAtom();
