import send from '@polka/send-type';
import { stripIndents } from 'common-tags';
import { homepage } from '../package.json';

const robots = (req, res) => {
  const txt = stripIndents`
    User-Agent: *
    Sitemap: ${homepage}/sitemap.xml
  `;

  send(res, 200, txt, { 'Content-Type': 'text/plain' });
};

export default robots;
