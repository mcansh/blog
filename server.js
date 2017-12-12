import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { join } from 'path';

import atom from './lib/atom';
import jsonfeed from './lib/jsonfeed';
import humans from './lib/humans';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (/^\/service-worker.js\/?$/.test(pathname)) {
        const filePath = join(__dirname, '.next', pathname);
        app.serveStatic(req, res, filePath);
      } else if (/^\/atom\/?$/.test(pathname)) {
        res.setHeader('Content-Type', 'text/xml');
        res.end(atom());
      } else if (/^\/feed.json\/?$/.test(pathname)) {
        res.setHeader('Content-Type', 'application/json');
        res.end(jsonfeed());
      } else if (/^\/humans.txt\/?$/.test(pathname)) {
        res.setHeader('Content-Type', 'text/plain');
        res.end(humans());
      } else {
        // handle(req, res);
        handle(req, res, parsedUrl);
      }
    })
      .listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`); // eslint-disable-line no-console
      });
  });
