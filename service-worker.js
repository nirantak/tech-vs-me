var CACHE_NAME="offline-v22",OFFLINE_URL="/offline.html",CACHE_FILES=["/","/index.html","/index.html?utm_source=pwa","/404.html","/offline.html","/favicon.ico","/search.json","/about/","/all/","/categories/","/services/heroku-vs-pythonanywhere/","/hardware/iphone-x-vs-pixel-2-xl/","/hardware/apple-airpods-vs-google-pixel-buds/","/assets/css/styles.css","/assets/css/noscript.min.css","/assets/js/scripts.js","/images/404.png","/images/offline.png","/images/bg.jpg","/images/overlay.png","/images/cb-close.png","/images/pexels-photo-325153.jpeg","/assets/css/font-awesome.min.css","/assets/fonts/fontawesome-webfont.eot","/assets/fonts/fontawesome-webfont.eot?v=4.7.0","/assets/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0","/assets/fonts/fontawesome-webfont.svg","/assets/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular","/assets/fonts/fontawesome-webfont.ttf","/assets/fonts/fontawesome-webfont.ttf?v=4.7.0","/assets/fonts/fontawesome-webfont.woff","/assets/fonts/fontawesome-webfont.woff?v=4.7.0","/assets/fonts/fontawesome-webfont.woff2","/assets/fonts/fontawesome-webfont.woff2?v=4.7.0","/assets/fonts/FontAwesome.otf","https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js","https://fonts.googleapis.com/css?family=Merriweather:300,700,300italic,700italic|Source+Sans+Pro:900"];self.addEventListener("install",function(e){console.log("[SW] Installing..."),e.waitUntil(caches.open(CACHE_NAME).then(function(e){return console.log("[SW] Caching app..."),e.addAll(CACHE_FILES)}))}),self.addEventListener("activate",function(e){return console.log("[SW] Activating..."),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(e!==CACHE_NAME)return console.log("[SW] Removing old cache... ",e),caches.delete(e)}))})),self.clients.claim()}),self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(s){return s||fetch(e.request).catch(function(s){return console.log("[SW] Failed to fetch ",e.request,"; returning offline page instead. ",s),caches.match(OFFLINE_URL)})}))}),self.addEventListener("message",function(e){if("skipWaiting"===e.data)return self.skipWaiting()});