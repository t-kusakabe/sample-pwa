var CACHE_NAME = 'cache-v1';

var urlToCache = [
  '/',
  'manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlToCache);
      })
  );
});

self.addEventListener('active', function(event) {
  event.waitUntil(
    caches.keys().then(function(cache) {
      cache.map(function(name) {
        if (CACHE_NAME !== name) {
          cache.delete(name);
        }
      })
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        return res;
      }

      return fetch(event.request);
    })
  );
});
