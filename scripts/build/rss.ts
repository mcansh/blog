// Native
import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

// Packages
import posts from '../../posts';
import { description, homepage } from '../../package.json';
import iso8601 from '../../utils/dates';
import { name, email } from '../../utils/authorInfo';

const writeFile = promisify(fs.writeFile);

const sortedPosts = posts.sort((a, b) => b.date - a.date);
const [latest] = sortedPosts;

const atom = async () => {
  const xml = `
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${name}</title>
      <subtitle>${description}</subtitle>
      <link href="${homepage}/atom" rel="self"/>
      <link href="${homepage}"/>
      <updated>${iso8601(latest.date)}</updated>
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
          <updated>${iso8601(date)}</updated>
        </entry>
      `
        )
        .join('')}
    </feed>
  `;

  const path = join(__dirname, '..', '..', 'static', 'atom.xml');
  await writeFile(path, `<?xml version="1.0" encoding="utf-8"?>\n${xml}`);
};

export default atom;
