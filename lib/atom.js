import posts from '../posts.json';
import { description } from '../package.json';
import FormattedDate from './FormattedDate';

const [newestPost] = posts;

const atom = () =>
  `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>Logan McAnsh</title>
      <subtitle>${description}</subtitle>
      <link href="https://mcansh.blog/atom" rel="self"/>
      <link href="https://mcansh.blog"/>
      <updated>${FormattedDate(newestPost.date)}</updated>
      <id>https://mcansh.blog</id>
      <author>
        <name>Logan McAnsh</name>
        <email>logan@mcan.sh</email>
      </author>
      ${posts
        .map(
          ({ date, title, id }) => `
            <entry>
              <id>${id}</id>
              <title>${title}</title>
              <link href="https://mcansh.blog/${id}"/>
              <updated>${FormattedDate(date)}</updated>
            </entry>
          `
        )
        .join('')}
    </feed>
  `;

export default atom;
