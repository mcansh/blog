import polka from 'polka';
import nextjs from 'next';
import { join } from 'path';
import IntlPolyfill from 'intl';
import favicon from 'serve-favicon';
import configureIntl from './intl';

// routes
import atom from './atom';
import jsonfeed from './jsonfeed';
import manifest from './manifest';
import sitemap from './sitemap';
import robots from './robots';
import serviceWorker from './serviceWorker';

const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const PORT = process.env.PORT || 3000;
const handle = app.getRequestHandler();

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

process.on('unhandledRejection', error => {
  throw error;
});

app.prepare().then(() => {
  const server = polka();

  server.use(
    favicon(join(__dirname, '..', 'static', 'images', 'logo', 'logo.ico'))
  );

  server.get('/service-worker.js', serviceWorker);

  server.get('/manifest.json', manifest);

  server.get('/robots.txt', robots);

  server.get('/atom', atom);

  server.get('/feed.json', jsonfeed);

  server.get('/sitemap.xml', sitemap);

  server.get('*', configureIntl, handle);

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
