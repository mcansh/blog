import LRUCache from 'lru-cache';

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

const getCacheKey = req => `${req.url}`;

const renderAndCache = async ({ app, req, res, pagePath, queryParams }) => {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.end(ssrCache.get(key));
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
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.end(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
};

export default renderAndCache;
