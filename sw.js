// 네트워크 우선(브라우저 HTTP 캐시도 건너뜀), 실패 시 캐시 (오프라인에서도 열림)
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||/firebaseio\.com|translate\.googleapis\.com|mymemory/.test(e.request.url))return;
  const same=new URL(e.request.url).origin===self.location.origin;
  e.respondWith(fetch(e.request,same?{cache:'no-cache'}:undefined).then(r=>{const c=r.clone();caches.open('hr').then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));
});
