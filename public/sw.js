// Service worker mínimo: siempre de la red; sin conexión, la última página guardada.
// shortcut: solo guarda la página (no el clima ni los assets), basta para instalar y abrir offline
const CACHE = "clima-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put("/", copy));
        return res;
      })
      .catch(() => caches.match("/")),
  );
});
