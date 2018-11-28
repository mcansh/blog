const send = require('@polka/send-type');

module.exports = (req, res) => {
  send(res, 200, 'wowowowow');
};
