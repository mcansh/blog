// Native
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

// Packages
const prettier = require('prettier');
const { description, homepage } = require('../package.json');
const formatDate = require('../utils/dates');
const posts = require('../posts.json');
const { cloudinary } = require('../config');

const { name, email } = require('../utils/authorInfo');

const writeFile = promisify(fs.writeFile);

const jsonfeed = async () => {
  const favicon = `${homepage}/static/images/logo/logo.png`;

  const jsonPosts = posts.map(post => ({
    id: `${homepage}/${post.id}`,
    url: `${homepage}/${post.id}`,
    title: `${post.title}`,
    date_published: `${formatDate(post.date)}`,
    image: `${cloudinary}/${post.image.imageUrl}`,
  }));

  const json = `
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

  const prettyJSON = prettier.format(json, { parser: 'json' });

  const path = join(__dirname, '..', 'static/feed.json');

  await writeFile(path, prettyJSON);
};

module.exports = jsonfeed;
