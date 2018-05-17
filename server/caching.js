const Cache = require('tmp-cache');

const cache = new Cache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1 hour
});

const getCacheKey = req => `${req.url}`;

const renderAndCache = async ({ app, req, res, pagePath, queryParams }) => {
  if (process.env.NODE_ENV !== 'development') {
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (cache.has(key)) {
      res.setHeader('x-cache', 'HIT');
      res.end(cache.get(key));
      return;
    }

    try {
      // If not let's render the page into HTML
      const html = await app.renderToHTML(req, res, pagePath, queryParams);

      // Something is wrong with the request, let's skip the cache
      if (res.statusCode !== 200) {
        res.end(html);
        return;
      }

      // Let's cache this page
      cache.set(key, html);

      res.setHeader('x-cache', 'MISS');
      res.end(html);
    } catch (err) {
      app.renderError(err, req, res, pagePath, queryParams);
    }
  } else {
    app.render(req, res, pagePath, queryParams);
  }
};

export default renderAndCache;
