const { posts } = require('../posts');

function generateRFCDate(date) {
  const originalDate = new Date(date);
  return originalDate.toISOString().substr(0, 10);
}


module.exports = () => `
{
  "version": "https://jsonfeed.org/version/1",
  "title": "Logan McAnsh",
  "description": "Learn.co wanted me to have a blog.",
  "home_page_url": "https://mcansh.blog",
  "feed_url": "https://mcansh.blog/feed.json",
  "favicon": "https://mcansh.blog/static/images/favicon.png",
  "author": {
    "name": "Logan McAnsh",
    "email": "logan@mcan.sh"
  },
  "items": [
    ${posts.map(({ image, date, title, slug }) => (`
      {
        "id": "https://mcansh.blog/${slug}",
        "url": "https://mcansh.blog/${slug}",
        "title": "${title}",
        "date_published": "${generateRFCDate(date)}",
        "image": "https://mcansh.blog/static/images/${image}"
      }
    `)).join(',')}
  ]
}
`;
