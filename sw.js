// 네트워크 우선, 실패 시 캐시 (오프라인에서도 열림)
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||e.request.url.includes('firebaseio.com'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open('hr').then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));
});
