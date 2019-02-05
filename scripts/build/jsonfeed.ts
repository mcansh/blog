// Native
import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

// Packages
import * as prettier from 'prettier';
import { description, homepage } from '../../package.json';
import iso8601 from '../../utils/dates';
import posts from '../../posts';
import getCloudinaryURL from '../../utils/getCloudinaryURL';
import { name, email } from '../../utils/authorInfo';

const writeFile = promisify(fs.writeFile);

const jsonfeed = async () => {
  const favicon = `${homepage}/static/images/logo/logo.png`;

  const jsonPosts = posts.map(post => ({
    id: `${post.url}`,
    url: `${homepage}${post.url}`,
    title: `${post.title}`,
    date_published: `${iso8601(post.date)}`,
    image: getCloudinaryURL(post.image.imageUrl),
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

  const path = join(__dirname, '..', '..', 'static/feed.json');

  await writeFile(path, prettyJSON);
};

export default jsonfeed;
