import LRUCache from 'tmp-cache';

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max:
    100 *
    1024 *
    1024 /* cache size will be 100 MB using `return n.length` as length() function */,
  length(n) {
    return n.length;
  },
  maxAge: 1000 * 60 * 60 * 24 * 30,
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.path}`;
}

async function renderAndCache(req, res) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    // console.log(`serving from cache ${key}`);
    res.setHeader('x-cache', 'HIT');
    res.end(ssrCache.get(key));
    return;
  }

  try {
    // console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await req.app.renderToHTML(req, res, req.path, req.query);

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
    req.app.renderError(err, req, res, req.path, req.query);
  }
}

export default renderAndCache;
