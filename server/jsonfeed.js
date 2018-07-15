import posts from '../posts.json';
import { description, homepage } from '../package.json';
import { YYYYMMDD } from '../utils/Dates';
import { name, email } from '../utils/authorInfo';

const imagePath = `${homepage}/static/images/posts`;
const favicon = `${homepage}/static/images/logo/logo.png`;

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
        "date_published": "${YYYYMMDD(date)}",
        "image": "${imagePath}/${imageUrl}"
      }
    `
      )
      .join(',')}
  ]
}
`;

export default jsonfeed;
