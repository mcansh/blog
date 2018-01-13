import posts from '../posts.json';
import { description } from '../package.json';
import FormattedDate from './FormattedDate';

const jsonfeed = () => `
{
  "version": "https://jsonfeed.org/version/1",
  "title": "Logan McAnsh",
  "description": "${description}",
  "home_page_url": "https://mcansh.blog",
  "feed_url": "https://mcansh.blog/feed.json",
  "favicon": "https://mcansh.blog/static/images/favicon.png",
  "author": {
    "name": "Logan McAnsh",
    "email": "logan@mcan.sh"
  },
  "items": [
    ${posts
      .map(
        ({ image: { imageUrl }, date, title, id }) => `
      {
        "id": "https://mcansh.blog/${id}",
        "url": "https://mcansh.blog/${id}",
        "title": "${title}",
        "date_published": "${FormattedDate(date)}",
        "image": "https://mcansh.blog/static/images/${imageUrl}"
      }
    `
      )
      .join(',')}
  ]
}
`;

export default jsonfeed;
