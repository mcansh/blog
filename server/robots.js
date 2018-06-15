import { homepage } from '../package.json';

const robots = ['User-Agent: *', `Sitemap: ${homepage}/sitemap.xml`].join('\n');

export default robots;
