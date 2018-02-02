import polka from 'polka';
import { createServer } from 'spdy';
import { readFileSync } from 'fs';

import { parse } from 'url';
import next from 'next';
import { join } from 'path';

import atom from './lib/atom';
import jsonfeed from './lib/jsonfeed';
import manifest from './lib/manifest';

const options = {
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt'),
};

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const { handler } = polka()
    .get('/service-worker.js', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    })
    .get('/manifest.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(manifest());
    })
    .get('/feed.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(jsonfeed());
    })
    .get('/atom', (req, res) => {
      res.setHeader('Content-Type', 'text/xml');
      res.end(atom());
    })
    .get('*', (req, res) => handle(req, res));

  createServer(options, handler).listen(3000, err => {
    if (err) throw new Error(err);
    console.log(`> Ready on http://localhost:${PORT}`); // eslint-disable-line no-console
  });
});
