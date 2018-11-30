// Native
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

// Packages
const { createSitemap } = require('sitemap');
const { homepage } = require('../package.json');

const posts = require('../posts.json');

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

  const path = join(__dirname, '..', 'static/sitemap.xml');

  await writeFile(path, xml);
};

module.exports = sitemap;
