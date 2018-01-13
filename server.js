import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { join } from 'path';
import IntlPolyfill from 'intl';

import atom from './lib/atom';
import jsonfeed from './lib/jsonfeed';
import manifest from './lib/manifest';

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else if (pathname === '/manifest.json') {
      res.setHeader('Content-Type', 'application/json');
      res.end(manifest());
    } else if (pathname === '/atom') {
      res.setHeader('Content-Type', 'text/xml');
      res.end(atom());
    } else if (pathname === '/feed.json') {
      res.setHeader('Content-Type', 'application/json');
      res.end(jsonfeed());
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`); // eslint-disable-line no-console
  });
});
