const CACHE_NAME = 'mcansh-blog-1';
const urlsToCache = [
  '/',
  '/static/manifest.json',
  '/staitc/images/logo/*',
  '/static/images/*',
];

self.addEventListener('install', (event) => {
  const preLoaded = caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
    // eslint-disable-next-line no-console
    .then(console.log(`${CACHE_NAME} installed`));
  event.waitUntil(preLoaded);
});

self.addEventListener('fetch', (event) => {
  const response = caches.match(event.request)
    .then(match => match || fetch(event.request));
  event.respondWith(response);
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map((cacheName) => {
        // eslint-disable-next-line no-console
        console.log(`Deleting ${cacheName}`);
        return caches.delete(cacheName);
      }),
    )),
  );
});
