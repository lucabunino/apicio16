import{b as q}from"./language.7EGUj-pd.js";const x=/_key\s*==\s*['"](.*)['"]/;function J(e){return typeof e=="string"?x.test(e.trim()):typeof e=="object"&&"_key"in e}function I(e){if(!Array.isArray(e))throw new Error("Path is not an array");return e.reduce((t,r,n)=>{const i=typeof r;if(i==="number")return`${t}[${r}]`;if(i==="string")return`${t}${n===0?"":"."}${r}`;if(J(r)&&r._key)return`${t}[_key=="${r._key}"]`;if(Array.isArray(r)){const[s,a]=r;return`${t}[${s}:${a}]`}throw new Error(`Unsupported path segment \`${JSON.stringify(r)}\``)},"")}const j={"\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","'":"\\'","\\":"\\\\"},P={"\\f":"\f","\\n":`
`,"\\r":"\r","\\t":"	","\\'":"'","\\\\":"\\"};function v(e){return`$${e.map(t=>typeof t=="string"?`['${t.replace(/[\f\n\r\t'\\]/g,r=>j[r])}']`:typeof t=="number"?`[${t}]`:t._key!==""?`[?(@._key=='${t._key.replace(/['\\]/g,r=>j[r])}')]`:`[${t._index}]`).join("")}`}function U(e){const t=[],r=/\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g;let n;for(;(n=r.exec(e))!==null;){if(n[1]!==void 0){const i=n[1].replace(/\\(\\|f|n|r|t|')/g,s=>P[s]);t.push(i);continue}if(n[2]!==void 0){t.push(parseInt(n[2],10));continue}if(n[3]!==void 0){const i=n[3].replace(/\\(\\')/g,s=>P[s]);t.push({_key:i,_index:-1});continue}}return t}function T(e){return e.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._key!=="")return{_key:t._key};if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function V(e){return e.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function G(e,t){if(!(t!=null&&t.mappings))return;const r=v(V(e));if(t.mappings[r]!==void 0)return{mapping:t.mappings[r],matchedPath:r,pathSuffix:""};const n=Object.entries(t.mappings).filter(([d])=>r.startsWith(d)).sort(([d],[u])=>u.length-d.length);if(n.length==0)return;const[i,s]=n[0],a=r.substring(i.length);return{mapping:s,matchedPath:i,pathSuffix:a}}function K(e){return e!==null&&Array.isArray(e)}function A(e){return typeof e=="object"&&e!==null}function b(e,t,r=[]){return K(e)?e.map((n,i)=>{if(A(n)){const s=n._key;if(typeof s=="string")return b(n,t,r.concat({_key:s,_index:i}))}return b(n,t,r.concat(i))}):A(e)?Object.fromEntries(Object.entries(e).map(([n,i])=>[n,b(i,t,r.concat(n))])):t(e,r)}function z(e,t,r){return b(e,(n,i)=>{if(typeof n!="string")return n;const s=G(i,t);if(!s)return n;const{mapping:a,matchedPath:d}=s;if(a.type!=="value"||a.source.type!=="documentValue")return n;const u=t.documents[a.source.document],f=t.paths[a.source.path],h=U(d),y=U(f).concat(i.slice(h.length));return r({sourcePath:y,sourceDocument:u,resultPath:i,value:n})})}const E="drafts.";function B(e){return e.startsWith(E)?e.slice(E.length):e}function H(e){const{baseUrl:t,workspace:r="default",tool:n="default",id:i,type:s,path:a,projectId:d,dataset:u}=e;if(!t)throw new Error("baseUrl is required");if(!a)throw new Error("path is required");if(!i)throw new Error("id is required");if(t!=="/"&&t.endsWith("/"))throw new Error("baseUrl must not end with a slash");const f=r==="default"?void 0:r,h=n==="default"?void 0:n,y=B(i),_=Array.isArray(a)?I(T(a)):a,o=new URLSearchParams({baseUrl:t,id:y,type:s,path:_});f&&o.set("workspace",f),h&&o.set("tool",h),d&&o.set("projectId",d),u&&o.set("dataset",u),i.startsWith(E)&&o.set("isDraft","");const k=[t==="/"?"":t];f&&k.push(f);const p=["mode=presentation",`id=${y}`,`type=${s}`,`path=${encodeURIComponent(_)}`];return h&&p.push(`tool=${h}`),k.push("intent","edit",`${p.join(";")}?${o}`),k.join("/")}function X(e){let t=typeof e=="string"?e:e.baseUrl;return t!=="/"&&(t=t.replace(/\/$/,"")),typeof e=="string"?{baseUrl:t}:{...e,baseUrl:t}}const m=({sourcePath:e,value:t})=>{if(Q(t)||Y(t))return!1;const r=e.at(-1);return!(e.at(-2)==="slug"&&r==="current"||typeof r=="string"&&r.startsWith("_")||typeof r=="number"&&e.at(-2)==="marks"||r==="href"&&typeof e.at(-2)=="number"&&e.at(-3)==="markDefs"||r==="style"||r==="listItem"||e.some(n=>n==="meta"||n==="metadata"||n==="openGraph"||n==="seo")||typeof r=="string"&&F.has(r))},F=new Set(["color","colour","currency","email","format","gid","hex","href","hsl","hsla","icon","id","index","key","language","layout","link","linkAction","locale","lqip","page","path","ref","rgb","rgba","route","secret","slug","status","tag","template","theme","type","unit","url","username","variant","website"]);function Q(e){return/^\d{4}-\d{2}-\d{2}/.test(e)?!!Date.parse(e):!1}function Y(e){try{new URL(e,e.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}const w=20;function Z(e,t,r){var n,i,s,a,d,u,f,h,y;const{filter:_,logger:o,enabled:k}=r;if(!k){const l="config.enabled must be true, don't call this function otherwise";throw(n=o==null?void 0:o.error)==null||n.call(o,`[@sanity/client]: ${l}`,{result:e,resultSourceMap:t,config:r}),new TypeError(l)}if(!t)return(i=o==null?void 0:o.error)==null||i.call(o,"[@sanity/client]: Missing Content Source Map from response body",{result:e,resultSourceMap:t,config:r}),e;if(!r.studioUrl){const l="config.studioUrl must be defined";throw(s=o==null?void 0:o.error)==null||s.call(o,`[@sanity/client]: ${l}`,{result:e,resultSourceMap:t,config:r}),new TypeError(l)}const p={encoded:[],skipped:[]},C=z(e,t,({sourcePath:l,sourceDocument:g,resultPath:$,value:c})=>{if((typeof _=="function"?_({sourcePath:l,resultPath:$,filterDefault:m,sourceDocument:g,value:c}):m({sourcePath:l,resultPath:$,filterDefault:m,sourceDocument:g,value:c}))===!1)return o&&p.skipped.push({path:R(l),value:`${c.slice(0,w)}${c.length>w?"...":""}`,length:c.length}),c;o&&p.encoded.push({path:R(l),value:`${c.slice(0,w)}${c.length>w?"...":""}`,length:c.length});const{baseUrl:S,workspace:O,tool:W}=X(typeof r.studioUrl=="function"?r.studioUrl(g):r.studioUrl);if(!S)return c;const{_id:D,_type:L,_projectId:N,_dataset:M}=g;return q(c,{origin:"sanity.io",href:H({baseUrl:S,workspace:O,tool:W,id:D,type:L,path:l,...!r.omitCrossDatasetReferenceData&&{dataset:M,projectId:N}})},!1)});if(o){const l=p.skipped.length,g=p.encoded.length;if((l||g)&&((a=(o==null?void 0:o.groupCollapsed)||o.log)==null||a("[@sanity/client]: Encoding source map into result"),(d=o.log)==null||d.call(o,`[@sanity/client]: Paths encoded: ${p.encoded.length}, skipped: ${p.skipped.length}`)),p.encoded.length>0&&((u=o==null?void 0:o.log)==null||u.call(o,"[@sanity/client]: Table of encoded paths"),(f=(o==null?void 0:o.table)||o.log)==null||f(p.encoded)),p.skipped.length>0){const $=new Set;for(const{path:c}of p.skipped)$.add(c.replace(x,"0").replace(/\[\d+\]/g,"[]"));(h=o==null?void 0:o.log)==null||h.call(o,"[@sanity/client]: List of skipped paths",[...$.values()])}(l||g)&&((y=o==null?void 0:o.groupEnd)==null||y.call(o))}return C}function R(e){return I(T(e))}var et=Object.freeze({__proto__:null,stegaEncodeSourceMap:Z});export{et as a,z as e,Z as s};
