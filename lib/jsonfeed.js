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
  "home_page_url": "https://blog.loganmcansh.com/",
  "feed_url": "https://blog.loganmcansh.com/feed.json",
  "favicon": "http://localhost:3000/static/images/favicon.png",
  "author": {
    "name": "Logan McAnsh",
    "email": "logan@mcan.sh"
  },
  "items": [
    ${posts.map(({ image, date, title, link }) => (`
      {
        "id": "https://blog.loganmcansh.com/${link}",
        "url": "https://blog.loganmcansh.com/${link}",
        "title": "${title}",
        "date_published": "${generateRFCDate(date)}",
        "image": "https://blog.loganmcansh.com/static/images/${image}"
      }
    `)).join(',')}
  ]
}
`;
