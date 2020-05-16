const urlToCache = [
  "/memorygame",
  "/memorygame/index.html",
  "/audio/*",
  "/js/app.js",
  "/images/*,'/css/stylesheet.css",
];
const staticCache = "memory-game-v1";

self.addEventListener("install", (e) => {
  console.log(e);
});

self.addEventListener("activated", (event) => {
  event.waitUtil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return cacheName !== staticCache;
        })
      );
    })
  );
});

//install service worker
self.addEventListener("install", function (event) {
  console.log("Worker: install event in progress.");
  //waiting until promise is complete
  event.waitUtil(
    //opens the cache and adds the cache data to the service worker
    caches.open(staticCache).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlToCache);
    })
  );
});

//fecth service worker
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      //cache and return respond
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        /**
         * ensuring if the response is valid, checking status code
         */
        if (!response || response.status != 200 || response.type !== "basic") {
          return response;
        }
        //It is important to clone the cache so that we have two streams for consumption
        const responseToCache = response.clone();

        caches.open(staticCache).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

//activate service worker
self.addEventListener("activate", (event) => {
  event.waitUtil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheObj) => {
          return cacheObj!=staticCache;
        })
      );
    })
  );
});
