import { homepage } from '../package.json';

const robots = () =>
  `User-Agent: *
Sitemap: ${homepage}/sitemap.xml
`;

export default robots;
