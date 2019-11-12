const manifest = require('./manifest');
const sitemap = require('./sitemap');
const jsonFeed = require('./jsonfeed');
const atom = require('./atom');

module.exports = async () => {
  await manifest();
  await sitemap();
  await jsonFeed();
  await atom();
};
