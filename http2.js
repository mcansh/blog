import express from 'express';
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
  const server = express();

  server.get('/service-worker.js', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const filePath = join(__dirname, '.next', pathname);
    app.serveStatic(req, res, filePath);
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

  createServer(options, server).listen(3000, err => {
    if (err) throw new Error(err);
    console.log(`> Ready on http://localhost:${PORT}`); // eslint-disable-line no-console
  });
});
