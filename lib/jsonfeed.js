import posts from '../posts.json';
import { description, homepage } from '../package.json';
import FormattedDate from './FormattedDate';
import { name, email } from './authorInfo';

const jsonfeed = () => `
{
  "version": "https://jsonfeed.org/version/1",
  "title": "${name}",
  "description": "${description}",
  "home_page_url": "${homepage}",
  "feed_url": "${homepage}/feed.json",
  "favicon": "${homepage}/static/images/favicon.png",
  "author": {
    "name": "${name}",
    "email": "${email}"
  },
  "items": [
    ${posts
      .map(
        ({ image: { imageUrl }, date, title, id }) => `
      {
        "id": "${homepage}/${id}",
        "url": "${homepage}/${id}",
        "title": "${title}",
        "date_published": "${FormattedDate(date)}",
        "image": "${homepage}/static/images/${imageUrl}"
      }
    `
      )
      .join(',')}
  ]
}
`;

export default jsonfeed;
