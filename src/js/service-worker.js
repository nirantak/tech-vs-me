// Service Worker

var CACHE_NAME = 'offline-v16';
var OFFLINE_URL = '/offline.html';

var CACHE_FILES = [
	"/",
	"/index.html",
	"/index.html?utm_source=pwa",
	"/404.html",
	"/offline.html",
	"/favicon.ico",
	"/search.json",
	"/about/",
	"/all/",
	"/categories/",
	"/services/heroku-vs-pythonanywhere/",
	"/hardware/iphone-x-vs-pixel-2-xl/",
	"/hardware/apple-airpods-vs-google-pixel-buds/",
	"/assets/css/styles.css",
	"/assets/css/noscript.min.css",
	"/assets/js/scripts.js",
	"/images/404.png",
	"/images/offline.png",
	"/images/bg.jpg",
	"/images/overlay.png",
	"/images/cb-close.png",
	"/images/pexels-photo-325153.jpeg",
	"/assets/css/font-awesome.min.css",
	"/assets/fonts/fontawesome-webfont.eot",
	"/assets/fonts/fontawesome-webfont.eot?v=4.7.0",
	"/assets/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0",
	"/assets/fonts/fontawesome-webfont.svg",
	"/assets/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular",
	"/assets/fonts/fontawesome-webfont.ttf",
	"/assets/fonts/fontawesome-webfont.ttf?v=4.7.0",
	"/assets/fonts/fontawesome-webfont.woff",
	"/assets/fonts/fontawesome-webfont.woff?v=4.7.0",
	"/assets/fonts/fontawesome-webfont.woff2",
	"/assets/fonts/fontawesome-webfont.woff2?v=4.7.0",
	"/assets/fonts/FontAwesome.otf",
	"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
	"https://fonts.googleapis.com/css?family=Merriweather:300,700,300italic,700italic|Source+Sans+Pro:900"
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(CACHE_FILES);
		})
	);
});

self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_NAME) {
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
			return response || fetch(e.request).catch(function (error) {
				console.log('Fetch failed; returning offline page instead.', error);
				return caches.match(OFFLINE_URL);
			});
		})
	);
});

self.addEventListener("message", function(event) {
	if (event.data === "skipWaiting") {
		return self.skipWaiting();
	}
});
