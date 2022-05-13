const filesToCache = [
          'style.css',
          'index.html',
          'manifest.json',
          'duck.png',
          'achievement.png',
          'duck.mp3',
          'duckwalking.gif',
          'goldenegg.png',
          'store.png'
        ];

const staticCacheName = 'sampe-v13';

self.addEventListener('install', async event => {
  self.skipWaiting();

  const precache = async()=>{
    const cache = await caches.open(staticCacheName);
    return cache.addAll(filesToCache);
  }
 
  event.waitUntil(precache());
});

self.addEventListener('activate', event => {

  const clearCaches = async ()=>{
    const keys = await caches.keys();
    const oldKeys = keys.filter(key => key !== staticCacheName);
    const promises = oldKeys.map(key=>caches.delete(key));
    return Promise.all(promises);
  }

  event.waitUntil(clearCaches());

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
