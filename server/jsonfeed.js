import send from '@polka/send-type';
import { stripIndent } from 'common-tags';
import posts from '../posts.json';
import { description, homepage } from '../package.json';
import { YYYYMMDD } from '../utils/Dates';
import { name, email } from '../utils/authorInfo';
import { cacheTimes } from './caching';

const jsonfeed = (req, res) => {
  const imagePath = `${homepage}/static/images/posts`;
  const favicon = `${homepage}/static/images/logo/logo.png`;

  const jsonPosts = posts.map(post => ({
    id: `${homepage}/${post.id}`,
    url: `${homepage}/${post.id}`,
    title: `${post.title}`,
    date_published: `${YYYYMMDD(post.date)}`,
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

  send(res, 200, json, {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=${cacheTimes.week}, must-revalidate`,
  });
};

export default jsonfeed;
