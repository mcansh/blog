import send from '@polka/send-type';
import { stripIndent } from 'common-tags';
import posts from '../posts.json';
import { description, homepage } from '../package.json';
import formatDate from './dates';
import { name, email } from '../utils/authorInfo';

const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
const [latest] = sortedPosts;

const atom = (req, res) => {
  const xml = stripIndent`
    <?xml version="1.0" encoding="utf-8"?>
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

  return send(res, 200, xml, { 'Content-Type': 'text/xml' });
};

export default atom;
