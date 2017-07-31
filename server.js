const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const next = require('next');

const atom = require('./lib/atom');
const jsonfeed = require('./lib/jsonfeed');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname } = parse(req.url);

      if (/^\/atom\/?$/.test(pathname)) {
        res.setHeader('Content-Type', 'text/xml');
        res.end(atom());
        return;
      }

      if (/^\/feed.json\/?$/.test(pathname)) {
        res.setHeader('Content-Type', 'application/json');
        res.end(jsonfeed());
        return;
      }

      if (req.url === '/sw.js') {
        res.setHeader('Content-Type', 'application/javascript');
        app.serveStatic(req, res, path.resolve('./.next/sw.js'));
      }

      handle(req, res);
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
