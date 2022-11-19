var cacheName = 'digital-clock';
var filesToCache = [
  '/8-segment-clock/',
  '/8-segment-clock/index.html',
  '/8-segment-clock/clock.css',
  '/8-segment-clock/clock.png',
  '/8-segment-clock/src/clock.js',
  '/8-segment-clock/src/config.js',
  '/8-segment-clock/src/field.js',
  '/8-segment-clock/src/dots.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});