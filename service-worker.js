const CACHE_NAME = 'card-games-cache-v2';
const urlsToCache = [
    '/ghidiembai/',
    '/ghidiembai/index.html',
    '/ghidiembai/favicon.ico',
    '/ghidiembai/manifest.json',
    '/ghidiembai/firebase-config.js',
    '/ghidiembai/assets/index.js',
    '/ghidiembai/assets/index.css',
    '/ghidiembai/assets/game-service.js'
];

// Cài đặt service worker và cache các file tĩnh
self.addEventListener('install', event => {
    console.log('[Service Worker] Install');
    // Kích hoạt ngay thay vì chờ đến khi không còn client cũ
    self.skipWaiting().then(r => console.log('[Service Worker] Installed'));

    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => {
            console.log('[Service Worker] Caching resources');
            return cache.addAll(urlsToCache);
        }).catch(err => {
            console.error('[Service Worker] Cache add failed:', err);
        })
    );
});

// Kích hoạt: xóa các cache cũ và chiếm quyền điều khiển
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        Promise.all([
            // Chiếm quyền điều khiển ngay lập tức
            self.clients.claim(),
            // Xóa các cache cũ
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

// Thay đổi chiến lược: Cache First, fallback to Network
self.addEventListener('fetch', event => {
    // Bỏ qua các yêu cầu không phải HTTP/HTTPS
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Open cache and store the response
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // If offline and requesting a page, show fallback content
                if (event.request.mode === 'navigate') {
                    return caches.match('/ghidiembai/');
                }
            })
    );
});