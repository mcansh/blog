import send from '@polka/send-type';
import { stripIndents } from 'common-tags';
import { homepage } from '../package.json';
import { cacheTimes } from './caching';

const robots = (req, res) => {
  const txt = stripIndents`
    User-Agent: *
    Sitemap: ${homepage}/sitemap.xml
  `;

  send(res, 200, txt, {
    'Content-Type': 'text/plain',
    'Cache-Control': `max-age=${cacheTimes.week}, must-revalidate`,
  });
};

export default robots;
