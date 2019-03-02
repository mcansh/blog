/* eslint-disable @typescript-eslint/no-var-requires */
const manifest = require('./manifest');
const sitemap = require('./sitemap');
const jsonfeed = require('./jsonfeed');
const atom = require('./atom');

module.exports = async () => {
  manifest();
  sitemap();
  jsonfeed();
  atom();
};
