const { posts } = require('../posts');
const { description, author } = require('../package.json');
const generateRFCDate = require('./generateDate');

const [newestPost] = posts;

module.exports = () => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${author.name}</title>
    <subtitle>${description}</subtitle>
    <link href="${author.url}/atom" rel="self"/>
    <link href="${author.url}"/>
    <updated>${generateRFCDate(newestPost.date)}</updated>
    <id>${author.url}</id>
    <author>
      <name>${author.name}</name>
      <email>${author.email}</email>
    </author>
    ${posts
    .map(
      ({ date, title, slug }) => `
      <entry>
        <id>${slug}</id>
        <title>${title}</title>
        <link href="${author.url}/${slug}"/>
        <updated>${generateRFCDate(date)}</updated>
      </entry>
    `,
    )
    .join('')}
  </feed>
`;
