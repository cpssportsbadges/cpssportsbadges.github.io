let CACHE_NAME = 'vanilla-es6';
let urlsToCache = [
	'index.html',
	'icon.png',
	'icons/icon192.png',
	'icons/icon512.png',
	'learn.json',
	'manifest.webmanifest',
	'dist/bundle.js',
	'node_modules/todomvc-common/base.js',
	'node_modules/todomvc-common/base.css',
	'node_modules/todomvc-app-css/index.css'
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

