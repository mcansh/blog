import { name, version } from '../package.json';

const CACHE_NAME = `${name}-${version}`;
const urlsToCache = ['/'];

self.addEventListener('install', (event) => {
  const preLoaded = caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache));
  event.waitUntil(preLoaded);
});

self.addEventListener('fetch', (event) => {
  const response = caches.match(event.request)
    .then(match => match || fetch(event.request));
  event.respondWith(response);
});
