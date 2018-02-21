import polka from 'polka';
import { parse } from 'url';
import next from 'next';
import { join } from 'path';

import atom from './lib/atom';
import jsonfeed from './lib/jsonfeed';
import manifest from './lib/manifest';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = polka();

  server.get('/sw.js', (req, res) => {
    app.serveStatic(req, res, join(root, `./static/workbox/${req.url}`));
  });

  server.get('/static/workbox/:file', (req, res) => {
    app.serveStatic(req, res, join(root, `.${req.url}`));
  });

  server.get('/manifest.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(manifest());
  });

  server.get('/atom', (req, res) => {
    res.setHeader('Content-Type', 'text/xml');
    res.end(atom());
  });

  server.get('/feed.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(jsonfeed());
  });

  server.get('*', (req, res) => handle(req, res));

  server
    .listen(PORT)
    .then(() => console.log(`> Ready on http://localhost:${PORT}`)); // eslint-disable-line no-console
});
