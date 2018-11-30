const kleur = require('kleur');
const rss = require('./build-rss');
const jsonfeed = require('./build-jsonfeed');
const manifest = require('./build-manifest');
const sitemap = require('./build-sitemap');

const main = async () => {
  try {
    await rss();
    console.log(kleur.green('▲ Saved atom.xml to static folder'));
  } catch (error) {
    console.log(kleur.bgRed('▲ Failed to generate atom.xml'), error);
  }
  try {
    await jsonfeed();
    console.log(kleur.green('▲ Saved feed.jon to static folder'));
  } catch (error) {
    console.log(kleur.bgRed('▲ Failed to generate feed.jon'), error);
  }
  try {
    await manifest();
    console.log(kleur.green('▲ Saved manifest.json to static folder'));
  } catch (error) {
    console.log(kleur.bgRed('▲ Failed to generate manifest.json'), error);
  }
  try {
    await sitemap();
    console.log(kleur.green('▲ Saved sitemap.xml to static folder'));
  } catch (error) {
    console.log(kleur.bgRed('▲ Failed to generate sitemap.xml'), error);
  }
};

main();
