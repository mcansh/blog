const fs = require('fs');
const path = require('path');
const posts = require('../get-blog-posts');
const { description, homepage } = require('../../package.json');

const OUT_DIR = path.join(process.cwd(), 'public');

const [latest] = posts;

const atom = `<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Logan McAnsh (@loganmcansh)</title>
  <subtitle>${description}</subtitle>
  <link href="${homepage}/atom" rel="self"/>
  <link href="${homepage}"/>
  <updated>${new Date(latest.date).toISOString()}</updated>
  <id>${homepage}</id>
  <author>
    <name>Logan McAnsh</name>
    <email>logan@mcan.sh</email>
  </author>
  ${posts
    .map(
      ({ date, title, url }) => `
    <entry>
      <id>${url.slice(1)}</id>
      <title>${title}</title>
      <link href="${homepage}${url}"/>
      <updated>${new Date(date).toISOString()}</updated>
    </entry>
  `
    )
    .join('')}
</feed>`;

module.exports = () => {
  fs.writeFileSync(path.join(OUT_DIR, 'atom.xml'), atom);
};
