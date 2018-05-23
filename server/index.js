import polka from 'polka';
import { parse } from 'url';
import next from 'next';
import { join, basename } from 'path';
import IntlPolyfill from 'intl';
import glob from 'glob';
import accepts from 'accepts';
import { readFileSync } from 'fs';
import favicon from 'serve-favicon';
import renderAndCache from './caching';
import posts from '../posts.json';

import atom from './atom';
import jsonfeed from './jsonfeed';
import manifest from './manifest';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

process.on('unhandledRejection', error => {
  throw error;
});

const languages = glob.sync('../lang/*.json').map(f => basename(f, '.json'));

const parseLocale = locale => {
  const lang = Array.isArray(locale) ? locale[0] : locale;
  if (languages.includes(lang.split('-')[0])) return lang.split('-')[0];
  return 'en';
};

const localeDataCache = new Map();
const getLocaleDataScript = locale => {
  if (!localeDataCache.has(locale)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${locale}`);
    const localeDataScript = readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(locale, localeDataScript);
  }
  return localeDataCache.get(locale);
};

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

// eslint-disable-next-line import/no-dynamic-require, global-require
const getMessages = locale => require(`../lang/${locale}.json`);

app.prepare().then(() => {
  const server = polka();

  server.use(
    favicon(join(__dirname, '..', 'static', 'images', 'logo', 'logo.ico'))
  );

  server.get('/service-worker.js', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    const filePath = join(__dirname, '..', '.next', pathname);

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

  posts.forEach(post => {
    server.get(`/${post.id}`, (req, res) => {
      renderAndCache({
        app,
        req,
        res,
        pagePath: `/${post.id}`,
        queryParams: req.params,
      });
    });
  });

  server.get('/', (req, res) => {
    renderAndCache({ app, req, res, pagePath: '/', queryParams: req.params });
  });

  server.get('*', (req, res) => {
    const accept = accepts(req);
    const locale = accept.language(dev ? ['en'] : languages);
    const lang = parseLocale(locale);

    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(lang);
    req.messages = dev ? {} : getMessages(lang);

    handle(req, res);
  });

  server
    .listen(PORT)
    .then(() => console.log(`> Ready on http://localhost:${PORT}`)); // eslint-disable-line no-console
});
