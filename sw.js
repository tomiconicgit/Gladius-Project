// A new cache name to signal a major update.
// This name should be changed every time you make a significant
// change to your core files (HTML, CSS, JS).
const CACHE_NAME = 'gladius-v1.4.0';

// List of files to cache when the service worker is installed.
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/manifest.js',
    '/manifest.json',
    '/images/logo.png',
    // Add paths to any new image icons you have created.
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png',
    // You can also cache any other essential assets here, like a specific font file.
    'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap'
];

// The 'install' event is fired when the service worker is installed.
self.addEventListener('install', (event) => {
    // We wait until the cache is opened and all files are added to it.
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache and added all static assets.');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Failed to cache all assets:', error);
            })
    );
});

// The 'fetch' event is fired for every network request.
self.addEventListener('fetch', (event) => {
    // We respond with a cached version of the resource if it's available.
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // If a cached response is found, return it.
                if (response) {
                    return response;
                }
                // Otherwise, fetch the resource from the network.
                return fetch(event.request);
            })
    );
});

// The 'activate' event is fired when the service worker is ready to control clients.
self.addEventListener('activate', (event) => {
    // We remove old caches to ensure the new version is used.
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
