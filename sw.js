var cacheName = 'digital-clock-v3';
var filesToCache = [
  '/8-segment-clock/',
  '/8-segment-clock/index.html',
  '/8-segment-clock/clock.css',
  '/8-segment-clock/clock.png',
  '/8-segment-clock/src/clock.js',
  '/8-segment-clock/src/config.js',
  '/8-segment-clock/src/field.js',
  '/8-segment-clock/src/dots.js',
  '/8-segment-clock/src/display-element.js',
  '/8-segment-clock/src/timer.js',
  '/8-segment-clock/src/pomodoro.js',
  '/8-segment-clock/src/pip.js',
  '/8-segment-clock/src/jscolor.min.js',
  '/8-segment-clock/fonts/material-symbols.css',
  '/8-segment-clock/fonts/material-symbols-outlined.woff2'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Drop caches of previous versions, so the new files get served */
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.filter(function(name) {
        return name !== cacheName;
      }).map(function(name) {
        return caches.delete(name);
      }));
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