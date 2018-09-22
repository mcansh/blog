import polka from 'polka';
import { parse } from 'url';
import nextjs from 'next';
import Sentry from '@sentry/node';
import send from '@polka/send-type';
import { join } from 'path';
import IntlPolyfill from 'intl';
import accepts from 'accepts';
import favicon from 'serve-favicon';
import renderAndCache from './caching';
import posts from '../posts.json';
import { version } from '../package.json';
import { languages, getLocaleDataScript, getMessages } from './intl';

import atom from './atom';
import jsonfeed from './jsonfeed';
import manifest from './manifest';
import sitemap from './sitemap';
import robots from './robots';

const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

process.on('unhandledRejection', error => {
  throw error;
});

const configureIntl = (req, res, next) => {
  const accept = accepts(req);
  const locale = accept.language(languages) || 'en';
  req.locale = locale;
  req.localeDataScript = getLocaleDataScript(locale);
  req.messages = dev ? {} : getMessages(locale);
  res.setHeader('X-App-Version', version);
  next();
};

app.prepare().then(() => {
  const server = polka();

  server.use(Sentry.Handlers.errorHandler());

  server.use((err, req, res, next) => {
    /*
    * The error id is attached to `res.sentry` to be returned
    * and optionally displayed to the user for support.
    */
    send(res, 500, res.sentry);
    next();
  });

  server.use(
    favicon(join(__dirname, '..', 'static', 'images', 'logo', 'logo.ico'))
  );

  server.get('/service-worker.js', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    const filePath = join(__dirname, '..', '.next', pathname);

    app.serveStatic(req, res, filePath);
  });

  server.get('/manifest.json', manifest);

  server.get('/robots.txt', robots);

  server.get('/atom', atom);

  server.get('/feed.json', jsonfeed);

  server.get('/sitemap.xml', sitemap);

  posts.forEach(post => {
    const slug = `/${post.id}`;
    server.get(slug, (req, res) => {
      renderAndCache({
        app,
        req,
        res,
        pagePath: slug,
        queryParams: req.params,
      });
    });
  });

  server.get('/', (req, res) => {
    renderAndCache({ app, req, res, pagePath: '/', queryParams: req.params });
  });

  server.get('*', configureIntl, handle);

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
