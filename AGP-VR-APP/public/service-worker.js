const CACHE_NAME = 'qi-cache-cemento-v23';
const toCache = [
    '/',
    '/index.html',
    '/estructura.json',
    '/js/pwa.js',
    '/js/gps.js',
    '/js/menu.js',
    '/js/status.js',
    '/js/sb-admin-2.js',
    '/js/sb-admin-2.min.js',
    '/css/sb-admin-2.min.css',
    '/js/pouchdb-7.2.1.js',
    '/js/pouchdb.min.js',
    '/vendor/fontawesome-free/css/all.min.css',
    '/vendor/jquery/jquery.min.js',
    '/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/vendor/jquery-easing/jquery.easing.min.js',
    '/js/funciones-pouchdb.js',
    '/vendor/fontawesome-free/webfonts/fa-solid-900.woff'

];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            cache
                .addAll
                // levels 11–20
                (toCache);
            return cache
                .addAll
                // core assets and levels 1–10
                (toCache);
        }),
    );
});


/*self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Servicio Worker] Obteniendo recurso: ' + e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    console.log('[Servicio Worker] Almacena el nuevo recurso: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});*/
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return (
                    response ||
                    fetch(event.request).then(function(response) {
                        console.log("REQ:" + event.request)
                        cache.put(event.request, response.clone());
                        return response;
                    })
                );
            });
        }),
    );
});


self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});