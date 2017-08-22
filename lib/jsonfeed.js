const { posts } = require('../posts');
const { description, author } = require('../package.json');

function generateRFCDate(date) {
  const originalDate = new Date(date);
  return originalDate.toISOString().substr(0, 10);
}


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
    ${posts.map(({ image, date, title, slug }) => (`
      {
        "id": "${author.url}/${slug}",
        "url": "${author.url}/${slug}",
        "title": "${title}",
        "date_published": "${generateRFCDate(date)}",
        "image": "${author.url}/static/images/${image}"
      }
    `)).join(',')}
  ]
}
`;
