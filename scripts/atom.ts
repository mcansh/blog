import fs from 'fs';
import path from 'path';

import pkgJSON from '../package.json';

import { posts } from '~/posts';

const OUT_DIR = path.join(process.cwd(), 'public');

const [latest] = posts;

const atom = `<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Logan McAnsh (@loganmcansh)</title>
  <subtitle>${pkgJSON.description}</subtitle>
  <link href="${pkgJSON.homepage}/atom" rel="self"/>
  <link href="${pkgJSON.homepage}"/>
  <updated>${latest.date}</updated>
  <id>${pkgJSON.homepage}</id>
  <author>
    <name>Logan McAnsh</name>
    <email>logan@mcan.sh</email>
  </author>
  ${posts
    .map(
      post => `
    <entry>
      <id>${post.path.slice(1)}</id>
      <title>${post.title}</title>
      <link href="${pkgJSON.homepage}${post.path}"/>
      <updated>${post.date}</updated>
    </entry>
  `
    )
    .join('')}
</feed>`;

const generateAtom = () => {
  fs.writeFileSync(path.join(OUT_DIR, 'atom.xml'), atom);
};

generateAtom();
