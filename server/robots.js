const send = require('@polka/send-type')
const { stripIndents } = require('common-tags')
const { homepage } = require('../package.json')

const robots = (req, res) => {
  const txt = stripIndents`
    User-Agent: *
    Sitemap: ${homepage}/sitemap.xml
  `;

  send(res, 200, txt, { 'Content-Type': 'text/plain' });
};

module.exports = robots;
