const { posts } = require('../posts');
const { description, author } = require('../package.json');
const format = require('date-fns/format');

module.exports = () => `
{
  "version": "https://jsonfeed.org/version/1",
  "title": "${author.name}",
  "description": "${description}",
  "home_page_url": "${author.url}",
  "feed_url": "${author.url}/feed.json",
  "favicon": "${author.url}/static/images/favicon.png",
  "author": {
    "name": "${author.name}",
    "email": "${author.email}"
  },
  "items": [
    ${posts
      .map(
        ({ image, date, title, id }) => `
      {
        "id": "${author.url}/${id}",
        "url": "${author.url}/${id}",
        "title": "${title}",
        "date_published": "${format(new Date(date), 'YYYY-MM-DD')}",
        "image": "${author.url}/static/images/${image}"
      }
    `,
      )
      .join(',')}
  ]
}
`;
