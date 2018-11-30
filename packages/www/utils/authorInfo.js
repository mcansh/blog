const somebody = require('somebody');
const { author } = require('../package.json');

const { name, email, url: homepage } = somebody.parse(author);

module.exports = { name, email, homepage };
