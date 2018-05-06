import polka from 'polka';
import { parse } from 'url';
import next from 'next';
import { join, basename } from 'path';
import IntlPolyfill from 'intl';
import glob from 'glob';
import accepts from 'accepts';
import { readFileSync } from 'fs';
import favicon from 'serve-favicon';

import atom from './lib/atom';
import jsonfeed from './lib/jsonfeed';
import manifest from './lib/manifest';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

const languages = glob.sync('./lang/*.json').map(f => basename(f, '.json'));

const localeDataCache = new Map();
const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

// eslint-disable-next-line import/no-dynamic-require, global-require
const getMessages = locale => require(`./lang/${locale}.json`);

app.prepare().then(() => {
  const server = polka();

  server.use(favicon(join(__dirname, 'static', 'images', 'logo', 'logo.ico')));

  server.get('/sw.js', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const filePath = join(__dirname, 'static', 'workbox', pathname);

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

  server.get('*', (req, res) => {
    const accept = accepts(req);
    const locale = accept.language(dev ? ['en'] : languages);
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    req.messages = dev ? {} : getMessages(locale);

    handle(req, res);
  });

  server
    .listen(PORT)
    .then(() => console.log(`> Ready on http://localhost:${PORT}`)); // eslint-disable-line no-console
});
