import{k,l as C}from"./index.qdqEzHHq.js";import{r as W}from"./scheduler.CKgFKp5N.js";import{c as z}from"./language.7EGUj-pd.js";function j(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function q(e,l){e.d(1),l.delete(e.key)}function B(e,l){C(e,1,1,()=>{l.delete(e.key)})}function D(e,l,_,w,$,s,h,m,y,c,i,v){let a=e.length,r=s.length,o=a;const f={};for(;o--;)f[e[o].key]=o;const u=[],n=new Map,b=new Map,F=[];for(o=r;o--;){const t=v($,s,o),d=_(t);let p=h.get(d);p?w&&F.push(()=>p.p(t,l)):(p=c(d,t),p.c()),n.set(d,u[o]=p),d in f&&b.set(d,Math.abs(o-f[d]))}const M=new Set,S=new Set;function x(t){k(t,1),t.m(m,i),h.set(t.key,t),i=t.first,r--}for(;a&&r;){const t=u[r-1],d=e[a-1],p=t.key,g=d.key;t===d?(i=t.first,a--,r--):n.has(g)?!h.has(p)||M.has(p)?x(t):S.has(g)?a--:b.get(p)>b.get(g)?(S.add(p),x(t)):(M.add(g),a--):(y(d,h),a--)}for(;a--;){const t=e[a];n.has(t.key)||y(t,h)}for(;r;)x(u[r-1]);return W(F),u}function E(e,{delay:l=0,duration:_=400,easing:w=z,axis:$="y"}={}){const s=getComputedStyle(e),h=+s.opacity,m=$==="y"?"height":"width",y=parseFloat(s[m]),c=$==="y"?["top","bottom"]:["left","right"],i=c.map(n=>`${n[0].toUpperCase()}${n.slice(1)}`),v=parseFloat(s[`padding${i[0]}`]),a=parseFloat(s[`padding${i[1]}`]),r=parseFloat(s[`margin${i[0]}`]),o=parseFloat(s[`margin${i[1]}`]),f=parseFloat(s[`border${i[0]}Width`]),u=parseFloat(s[`border${i[1]}Width`]);return{delay:l,duration:_,easing:w,css:n=>`overflow: hidden;opacity: ${Math.min(n*20,1)*h};${m}: ${n*y}px;padding-${c[0]}: ${n*v}px;padding-${c[1]}: ${n*a}px;margin-${c[0]}: ${n*r}px;margin-${c[1]}: ${n*o}px;border-${c[0]}-width: ${n*f}px;border-${c[1]}-width: ${n*u}px;`}}export{q as d,j as e,B as o,E as s,D as u};