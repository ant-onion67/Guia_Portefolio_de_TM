const cacheName = 'multimedia-portfolio-v1';
// Lista de recursos fundamentais a guardar na cache local do dispositivo
const assets = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// Evento de Instalação: Guarda todos os componentes principais da App
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('PWA: A guardar ficheiros na cache estática');
      return cache.addAll(assets);
    }).then(() => self.skipWaiting())
  );
});

// Evento de Ativação: Limpa caches antigas se houver atualizações do código
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('PWA: A remover cache antiga:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Estratégia Cache First (Procura na cache, senão vai à internet)
// Perfeito para garantir funcionamento offline imediato
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request).catch(() => {
        console.log('Recurso não encontrado em cache nem via rede');
      });
    })
  );
});