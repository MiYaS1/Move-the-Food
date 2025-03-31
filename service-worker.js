const cacheName = 'food-move-game-cache-v1';
const filesToCache = [
  'index.html',
  'Build/miyashiro2v15.loader.js', // ファイル名に合わせて修正
  'Build/miyashiro2v15.wasm.code.unityweb', // ファイル名に合わせて修正
  'Build/miyashiro2v15.wasm.data.unityweb', // ファイル名に合わせて修正
  'TemplateData/style.css',
  'TemplateData/UnityProgress.js',
  'TemplateData/favicon.ico',
  'manifest.json',
  'icon_192x192.png', // アイコン画像もキャッシュに追加
  'icon_512x512.png'  // アイコン画像もキャッシュに追加
  // 他のアセットファイル (画像、音声など) もここに追加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Caching all: app shell and content');
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});