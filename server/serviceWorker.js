const send = require('@polka/send-type')
const { createReadStream } = require('fs')
const { parse } = require('url')
const { join } = require('path')

const serviceWorker = async (req, res) => {
  const { pathname } = parse(req.url, true);
  const filePath = join(__dirname, '..', '.next', pathname);
  const file = await createReadStream(filePath);
  send(res, 200, file, { 'Content-Type': 'application/javascript' });
};

module.exports = serviceWorker;
