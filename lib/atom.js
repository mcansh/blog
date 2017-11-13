const { posts } = require('../posts');
const { description, author } = require('../package.json');
const format = require('date-fns/format');

const [newestPost] = posts;

module.exports = () => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${author.name}</title>
    <subtitle>${description}</subtitle>
    <link href="${author.url}/atom" rel="self"/>
    <link href="${author.url}"/>
    <updated>${format(new Date(newestPost.date), 'YYYY-MM-DD')}</updated>
    <id>${author.url}</id>
    <author>
      <name>${author.name}</name>
      <email>${author.email}</email>
    </author>
    ${posts
      .map(
        ({ date, title, id }) => `
      <entry>
        <id>${id}</id>
        <title>${title}</title>
        <link href="${author.url}/${id}"/>
        <updated>${format(new Date(date), 'YYYY-MM-DD')}</updated>
      </entry>
    `,
      )
      .join('')}
  </feed>
`;
