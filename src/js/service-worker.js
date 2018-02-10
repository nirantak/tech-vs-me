// Service Worker

var cacheName = 'tech-versus-me-v3';

var OFFLINE_URL = '/offline.html';

var filesToCache = [
	'/',
	'/index.html',
	'/404.html',
	'/offline.html',
	'/privacy.html',
	'/favicon.ico',
	'/about/',
	'/about/index.html',
	'/all/',
	'/all/index.html',
	'/categories/',
	'/categories/index.html',
	'/assets/css/styles.css',
	'/assets/css/noscript.min.css',
	'/assets/js/scripts.js',
	'/images/404.png',
	'/images/offline.png',
	'/images/bg.jpg',
	'/images/overlay.png',
	'/images/tech-versus-me.png',
	'/images/cup-mug-desk-office.jpg',
	'/images/pexels-photo-267350.jpeg',
	'/images/pexels-photo-325153.jpeg',
	'/assets/css/font-awesome.min.css',
	'/assets/fonts/fontawesome-webfont.eot',
	'/assets/fonts/fontawesome-webfont.svg',
	'/assets/fonts/fontawesome-webfont.ttf',
	'/assets/fonts/fontawesome-webfont.woff',
	'/assets/fonts/fontawesome-webfont.woff2',
	'/assets/fonts/FontAwesome.otf',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
	'https://fonts.googleapis.com/css?family=Merriweather:300,700,300italic,700italic|Source+Sans+Pro:900'
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
	console.log('[ServiceWorker] Fetch', e.request.url);
	e.respondWith(
		caches.match(e.request).then(function (response) {
			return response || fetch(e.request);
		})
	);
});

self.addEventListener('fetch', function (e) {
	// request.mode = navigate isn't supported in all browsers
	// so include a check for Accept: text/html header.
	if (e.request.mode === 'navigate' || (e.request.method === 'GET' && e.request.headers.get('accept').includes('text/html'))) {
		e.respondWith(
			fetch(e.request.url).catch(function (error) {
				// Return the offline page
				return caches.match(OFFLINE_URL);
			})
		);
	}
	else {
		// Respond with everything else if we can
		console.log('[ServiceWorker] Fetch', e.request.url);
		e.respondWith(caches.match(e.request)
			.then(function (response) {
				return response || fetch(e.request);
			})
		);
	}
});
