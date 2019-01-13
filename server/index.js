const polka = require('polka');
const nextjs = require('next');
const { join } = require('path');
const IntlPolyfill = require('intl');
const favicon = require('serve-favicon');
const configureIntl = require('./intl');

// routes
const atom = require('./atom');
const jsonfeed = require('./jsonfeed');
const manifest = require('./manifest');
const sitemap = require('./sitemap');
const robots = require('./robots');
const serviceWorker = require('./serviceWorker');

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

  const addAppToRequest = (req, res, next) => {
    req.app = app;
    next();
  };

  const iconPath = join(
    __dirname,
    '..',
    'static',
    'images',
    'logo',
    'logo.ico'
  );

  server.use(favicon(iconPath));
  server.use(addAppToRequest);

  /* serving _next static content using next.js handler */
  server.get('/_next/*', handle);

  /* serving static folder content using next.js handler */
  server.get('/static/*', handle);

  server.get('/service-worker.js', serviceWorker);

  server.get('/manifest.json', manifest);

  server.get('/robots.txt', robots);

  server.get('/atom', atom);

  server.get('/feed.json', jsonfeed);

  server.get('/sitemap.xml', sitemap);

  server.get('*', configureIntl, renderAndCache);

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
