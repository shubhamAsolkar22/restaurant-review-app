// self.addEventListener('fetch',function(event){
//     console.log("Hello world");
// });
let currentCacheName = 'restaurants-v1';

let urlsToCache = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];


self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(currentCacheName).then(function(cache) {
			return cache.addAll(urlsToCache);
        })
    );
});


/* Activation and deletion of older versions */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurants-') &&
                        cacheName != currentCacheName;
                }).map(function(cacheName) {
                    //delete older version of cache
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

/**going offline */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});