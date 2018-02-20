import posts from '../posts.json';
import { description, homepage } from '../package.json';
import FormattedDate from './FormattedDate';
import { name, email } from './authorInfo';

const imagePath = `${homepage}/static/images/posts`;
const favicon = `${homepage}/static/images/favicon.png`;

const jsonfeed = () => `
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
  "items": [
    ${posts
      .map(
        ({ image: { imageUrl }, date, title, id }) => `
      {
        "id": "${homepage}/${id}",
        "url": "${homepage}/${id}",
        "title": "${title}",
        "date_published": "${FormattedDate(date)}",
        "image": "${imagePath}/${imageUrl}"
      }
    `
      )
      .join(',')}
  ]
}
`;

export default jsonfeed;
