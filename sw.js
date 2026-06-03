// Este evento corre quando a App é "instalada" no telemóvel
self.addEventListener('install', (e) => {
 console.log('Service Worker: Instalado');
});
// Este evento permite que a App funcione mesmo com picos de falta de rede
self.addEventListener('fetch', (e) => {
 // Para este projeto base, apenas deixamos o tráfego passar
 e.respondWith(fetch(e.request));
});