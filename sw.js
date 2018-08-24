self.addEventListener('install', (event) => {
 event.waitUntil(
   caches.open('restaurant').then((cache) => {
     return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/data/restaurants.json',
       '/img/',
     ]).then(() => {
      console.log('Caching complete...');
     }).catch((error) => {
      console.log('Ooops ', error);
     })
   })
 );
});

self.addEventListener('activate', (event) => {
  console.log('Activating service worker...');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('restaurant').then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
