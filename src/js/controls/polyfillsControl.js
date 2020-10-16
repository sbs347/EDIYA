import { fetchDataText } from '../utils/fetchData';
import createAndAppendScript from '../utils/createAndAppendScript';

// fetch 폴리필
// https://github.com/developit/unfetch
if (!window.fetch) {
  createAndAppendScript(
    'polyfill-unfetch',
    'self.fetch||(self.fetch=function(e,n){return n=n||{},new Promise(function(t,s){var r=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(r.status/100|0),statusText:r.statusText,status:r.status,url:r.responseURL,text:function(){return Promise.resolve(r.responseText)},json:function(){return Promise.resolve(r.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([r.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var c in r.open(n.method||"get",e,!0),r.onload=function(){r.getAllResponseHeaders().replace(/^(.*?):[^S\n]*([sS]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},r.onerror=s,r.withCredentials="include"==n.credentials,n.headers)r.setRequestHeader(c,n.headers[c]);r.send(n.body||null)})});'
  );
}

/* -------------------------------------------------------------------------- */

// focus-visible 폴리필
// https://developer.mozilla.org/en-US/docs/Web/API/CSS
// https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports
if (!CSS || !CSS.supports('selector(:focus-visible)')) {
  fetchDataText('https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js', (text) =>
    createAndAppendScript('polyfill-focus-visible', text)
  );
}
