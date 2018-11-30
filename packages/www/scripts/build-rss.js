// Native
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

// Packages
const prettier = require('prettier');
const posts = require('../posts.json');
const { description, homepage } = require('../package.json');
const formatDate = require('../utils/dates');
const { name, email } = require('../utils/authorInfo');

const writeFile = promisify(fs.writeFile);

const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
const [latest] = sortedPosts;

const atom = async () => {
  const xml = `
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${name}</title>
      <subtitle>${description}</subtitle>
      <link href="${homepage}/atom" rel="self"/>
      <link href="${homepage}"/>
      <updated>${formatDate(latest.date)}</updated>
      <id>${homepage}</id>
      <author>
        <name>${name}</name>
        <email>${email}</email>
      </author>
      ${posts
        .map(
          ({ date, title, id }) => `
        <entry>
          <id>${id}</id>
          <title>${title}</title>
          <link href="${homepage}/${id}"/>
          <updated>${formatDate(date)}</updated>
        </entry>
      `
        )
        .join('')}
    </feed>
  `;

  const prettyJS = prettier.format(xml, { parser: 'babylon' });

  const path = join(__dirname, '..', 'static', 'atom.xml');
  await writeFile(path, `<?xml version="1.0" encoding="utf-8"?>\n${prettyJS}`);
};

module.exports = atom;
