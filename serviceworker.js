const cacheName = "v1";

const cacheAssets = ["index.html", "/CSS/style.css", "/imgs/city1.jpg", "/imgs/city2.jpg", "/imgs/city3.jpg"];

// Install
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
