const C="controle-tickets-v7",F=["./","index.html","manifest.json","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>null)))));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!="GET"||u.origin!=location.origin)return;
 const nav=r.mode=="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
 if(nav){e.respondWith(Promise.race([fetch(r,{cache:"no-cache"}),new Promise((_,x)=>setTimeout(()=>x(new Error("t")),5000))]).then(n=>{if(n&&n.ok){const a=n.clone(),b=n.clone();caches.open(C).then(c=>{c.put(r,a);c.put("index.html",b)})}return n}).catch(()=>caches.match(r,{ignoreSearch:true}).then(c=>c||caches.match("index.html"))));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(n=>{if(n&&n.ok){const k=n.clone();caches.open(C).then(x=>x.put(r,k))}return n}).catch(()=>caches.match("index.html"))))});
