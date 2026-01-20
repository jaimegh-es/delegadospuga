// Script para limpiar el caché del service worker y forzar actualización
if ('serviceWorker' in navigator) {
    // Desregistrar todos los service workers
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister();
            console.log('Service Worker desregistrado');
        }
    });

    // Limpiar todos los cachés
    if ('caches' in window) {
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    console.log('Eliminando caché:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(function () {
            console.log('Todos los cachés eliminados');
            // Recargar la página después de limpiar
            window.location.reload(true);
        });
    }
}
