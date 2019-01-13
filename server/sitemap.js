const send = require('@polka/send-type')
const { createSitemap } = require('sitemap')
const { homepage } = require('../package.json')
const posts = require('../posts.json')

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

const sitemap = async (req, res) => {
  try {
    const xml = generateSiteMap.toXML();
    send(res, 200, xml, { 'Content-Type': 'application/xml' });
  } catch (error) {
    send(res, 500);
  }
};

module.exports = sitemap;
