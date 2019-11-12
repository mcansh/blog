const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const { description, homepage } = require('../package.json');

const posts = require('./get-posts');

const writeFile = promisify(fs.writeFile);

const OUT_DIR = path.join(process.cwd(), 'public');

const [latest] = posts;

const atom = `<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Logan McAnsh (@loganmcansh)</title>
  <subtitle>${description}</subtitle>
  <link href="${homepage}/atom" rel="self"/>
  <link href="${homepage}"/>
  <updated>${latest.date}</updated>
  <id>${homepage}</id>
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
      <link href="${homepage}${post.path}"/>
      <updated>${post.date}</updated>
    </entry>
  `
    )
    .join('')}
</feed>`;

module.exports = async () => {
  await writeFile(path.join(OUT_DIR, 'atom.xml'), atom);
};
