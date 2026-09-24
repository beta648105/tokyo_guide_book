/**
 * 도쿄 가이드북 서비스 워커
 * - HTML/CSS/JS: 네트워크 우선 (수정하면 바로 반영되도록)
 * - 이미지/아이콘: 캐시 우선 (빠르고 데이터 절약)
 * 내용을 크게 바꿨을 땐 CACHE 버전을 올린다.
 */

const CACHE = "tokyo-guide-v14";

const PRECACHE = [
  "./",
  "index.html",
  "shibuya.html",
  "akihabara.html",
  "styles.css",
  "app.js",
  "common.js",
  "area.js",
  "manifest.webmanifest",
  "images/tokyo.png",
  "images/shibuya.png",
  "images/akihabara.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isAsset = /\.(png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(url.pathname);

  // 이미지·폰트는 캐시 우선
  if (isAsset) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok && sameOrigin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }))
    );
    return;
  }

  // 나머지는 네트워크 우선, 실패하면 캐시
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && sameOrigin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("index.html")))
  );
});
