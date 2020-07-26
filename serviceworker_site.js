const cacheName = "v2";

// Install
self.addEventListener("install", () => {
  console.log("Service Worker: Installed");
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, clone);
        });
        return res;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});
