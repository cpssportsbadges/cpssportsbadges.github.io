let CACHE_NAME = 'glitch-e-sketch';
let urlsToCache = [
	'index.html',
	'icon/icon144.png',
	'icons/icon192.png',
	'icons/icon512.png',
	'manifest.webmanifest',
	'styles.css',
	'controls.js'
];

self.addEventListener('install', function(event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			}) 
	);
});


// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  event.respondWith(
    // ensure we check the *right* cache to match against
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(res => {
        return res || fetch(event.request)
      });
    })
  );
});