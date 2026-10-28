// Conciliation V7 – fonctionnement hors ligne (aucune donnée patient n'est mise en cache)
var C='concil-v7-2026-10-28';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./']).catch(function(){})}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){var u=new URL(r.url);u.hash='';u.search='';
  e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(u.pathname,cp)});return res}).catch(function(){return caches.match(u.pathname).then(function(m){return m||caches.match('./')})}));return}
 if(/cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(r.url)){
  e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)});return res})}))}});
