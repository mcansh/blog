const send = require('@polka/send-type')
const { stripIndent } = require('common-tags')
const posts = require('../posts.json')
const { description, homepage } = require('../package.json')
const formatDate = require('./dates')
const { name, email } = require('../utils/authorInfo')

const jsonfeed = (req, res) => {
  const imagePath = `${homepage}/static/images/posts`;
  const favicon = `${homepage}/static/images/logo/logo.png`;

  const jsonPosts = posts.map(post => ({
    id: `${homepage}/${post.id}`,
    url: `${homepage}/${post.id}`,
    title: `${post.title}`,
    date_published: `${formatDate(post.date)}`,
    image: `${imagePath}/${post.image.imageUrl}`,
  }));

  const json = stripIndent`
    {
      "version": "https://jsonfeed.org/version/1",
      "title": "${name}",
      "description": "${description}",
      "home_page_url": "${homepage}",
      "feed_url": "${homepage}/feed.json",
      "favicon": "${favicon}",
      "author": {
        "name": "${name}",
        "email": "${email}"
      },
      "items": ${JSON.stringify(jsonPosts, null, 2)}
    }
  `;

  send(res, 200, json);
};

module.exports = jsonfeed;
