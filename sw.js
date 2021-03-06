const STATIC_CHACHES_NAME = 'static-v10';
const DYNAMIC_CHACHES_NAME = 'dynamic';


//  event เมื่อ ติดตั้ง service worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Service Worker ...', event);
    // add cache api
    event.waitUntil(
        caches.open(STATIC_CHACHES_NAME)
            .then((cache) => {
                console.log('[Service Worker] Pre caching App Shell');
                cache.addAll([
                    '/',
                    '/index.html',
                    '/offline.html'
                ]);
            })
    );
    
});

// event เมื่อ ยืนยันการติดตั้ง service worker

self.addEventListener('activate', (event) => {
    // console.log('[Service Worker] Activating Service Worker ...', event);
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key => {
                    if (key !== STATIC_CHACHES_NAME && key !== DYNAMIC_CHACHES_NAME) {
                        console.log('[Serice worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                })))
            })
    );
    return self.clients.claim();
});

// event เมื่อมีการโหลด asset ต่างๆ เช่น css js image file

// base caches

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if(response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then((res) => {
                            // open dynamic caches
                            return caches.open(DYNAMIC_CHACHES_NAME)
                                .then((cache) => {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            return caches.open(STATIC_CHACHES_NAME)
                            .then((cache) => {
                                return cache.match('/offline.html')
                            })
                        });
                }
            })
    );
});
