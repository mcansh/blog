import { promises as fs } from 'fs';
import path from 'path';

import { description } from '../package.json';

import { getDeploymentURL } from '~/utils/get-deployment-url';
import { getPosts } from '~/lib/get-post';

const OUT_DIR = path.join(process.cwd(), 'public');

const generateAtom = async () => {
  const posts = await getPosts();

  const [latest] = posts;

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
