// Define cache names and assets to cache statically
const staticCacheName = 'custom-static-v1';
const dynamicCacheName = 'custom-dynamic-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/images/logo.png',
  // Add more files to cache as needed
];


self.addEventListener('message', event => {
  // Check if the message is to get localStorage data
  if (event.data.action === 'getLocalStorage') {
    const localStorageData = event.data.data;
    console.log('Data from localStorage:', localStorageData);
    // Now you can process the localStorage data as needed
  }
});




self.addEventListener('sync', function (event) {
  if (event.tag === 'chats-fetch') {
    event.waitUntil(fetchChats());
  }
});

function fetchChats() {
  fetch('https://firebasestorage.googleapis.com/v0/b/trabacar-36366.appspot.com/o/chats%2FlastChats.json?alt=media&token=179ef39e-90ac-43b3-8ba0-f6d7d34aeb43')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      console.log('Request successful', data);
      // Process the fetched data here
    })
    .catch(function(error) {
      console.error('Request failed', error);
    });
}





self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ...', event);
  event.respondWith(fetch(event.request));
});


// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request).then(fetchResponse => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(event.request.url, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});

// Background sync event
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync-task') {
    event.waitUntil(syncData());
  }
});

// Function to perform background sync
function syncData() {
  // Implement your background sync logic here
  // This function will be called when the browser has a stable connection

  // Dummy background task (simulated)
  setInterval(() => {
    console.log('Background task executed');
    // You can perform any background task here
  }, 5000); // Runs every 5 seconds
}
