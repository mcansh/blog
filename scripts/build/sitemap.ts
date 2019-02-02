// Native
import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

// Packages
import { createSitemap } from 'sitemap';
import { homepage } from '../../package.json';
import * as posts from '../../posts';

const writeFile = promisify(fs.writeFile);

const generateSiteMap = createSitemap({
  hostname: homepage,
  cacheTime: 600000, // 600 sec - cache purge period
});

generateSiteMap.add({
  url: '/',
  changefreq: 'daily',
  priority: 1,
});

generateSiteMap.add({
  url: '/changelog',
  changefreq: 'daily',
  priority: 0.3,
});

posts.forEach(post =>
  generateSiteMap.add({
    url: `/${post.id}`,
    changefreq: 'daily',
    priority: 0.9,
  })
);

const sitemap = async () => {
  const xml = generateSiteMap.toXML();

  const path = join(__dirname, '..', '..', 'static/sitemap.xml');

  await writeFile(path, xml);
};

export default sitemap;
