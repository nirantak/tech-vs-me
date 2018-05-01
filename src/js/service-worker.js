// Service Worker

var CACHE_NAME = "offline-v30";
var OFFLINE_URL = "/offline.html";

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

self.addEventListener("install", function(e) {
	console.log("[SW] Installing...");
	e.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				console.log("[SW] Caching app...");
				return cache.addAll(CACHE_FILES);
			})
			.then(self.skipWaiting())
	);
});

self.addEventListener("activate", function(e) {
	console.log("[SW] Activating...");
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(
				keyList.map(function(key) {
					if (key !== CACHE_NAME) {
						console.log("[SW] Removing old cache... ", key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	return self.clients.claim();
});

self.addEventListener("fetch", function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return (
				response ||
				fetch(e.request).catch(function(error) {
					console.log(
						"[SW] Failed to fetch ",
						e.request,
						"; returning offline page instead. ",
						error
					);
					return caches.match(OFFLINE_URL);
				})
			);
		})
	);
});
