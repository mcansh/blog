const posts = require('../posts');
const { description } = require('../package.json');
const format = require('date-fns/format');

module.exports = () => `
{
  "version": "https://jsonfeed.org/version/1",
  "title": "Logan McAnsh",
  "description": "${description}",
  "home_page_url": "https://mcansh.blog",
  "feed_url": "https://mcansh.blog/feed.json",
  "favicon": "https://mcansh.blog/static/images/favicon.png",
  "author": {
    "name": "Logan McAnsh",
    "email": "logan@mcan.sh"
  },
  "items": [
    ${posts
      .map(
        ({ image, date, title, id }) => `
      {
        "id": "https://mcansh.blog/${id}",
        "url": "https://mcansh.blog/${id}",
        "title": "${title}",
        "date_published": "${format(new Date(date), 'YYYY-MM-DD')}",
        "image": "https://mcansh.blog/static/images/${image}"
      }
    `,
      )
      .join(',')}
  ]
}
`;
