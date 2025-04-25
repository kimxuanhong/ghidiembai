(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function po(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const se={},wn=[],ft=()=>{},df=()=>!1,Oi=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),_o=t=>t.startsWith("onUpdate:"),xe=Object.assign,go=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},pf=Object.prototype.hasOwnProperty,J=(t,e)=>pf.call(t,e),U=Array.isArray,Sn=t=>Di(t)==="[object Map]",sc=t=>Di(t)==="[object Set]",W=t=>typeof t=="function",pe=t=>typeof t=="string",Gt=t=>typeof t=="symbol",ce=t=>t!==null&&typeof t=="object",ic=t=>(ce(t)||W(t))&&W(t.then)&&W(t.catch),rc=Object.prototype.toString,Di=t=>rc.call(t),_f=t=>Di(t).slice(8,-1),oc=t=>Di(t)==="[object Object]",mo=t=>pe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,ns=po(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ki=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},gf=/-(\w)/g,qe=ki(t=>t.replace(gf,(e,n)=>n?n.toUpperCase():"")),mf=/\B([A-Z])/g,Kt=ki(t=>t.replace(mf,"-$1").toLowerCase()),Mi=ki(t=>t.charAt(0).toUpperCase()+t.slice(1)),or=ki(t=>t?`on${Mi(t)}`:""),Lt=(t,e)=>!Object.is(t,e),Zs=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},lc=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Pr=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ml;const Li=()=>ml||(ml=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function yo(t){if(U(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],i=pe(s)?Cf(s):yo(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(pe(t)||ce(t))return t}const yf=/;(?![^(]*\))/g,vf=/:([^]+)/,Ef=/\/\*[^]*?\*\//g;function Cf(t){const e={};return t.replace(Ef,"").split(yf).forEach(n=>{if(n){const s=n.split(vf);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Fi(t){let e="";if(pe(t))e=t;else if(U(t))for(let n=0;n<t.length;n++){const s=Fi(t[n]);s&&(e+=s+" ")}else if(ce(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const bf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",wf=po(bf);function ac(t){return!!t||t===""}const cc=t=>!!(t&&t.__v_isRef===!0),gs=t=>pe(t)?t:t==null?"":U(t)||ce(t)&&(t.toString===rc||!W(t.toString))?cc(t)?gs(t.value):JSON.stringify(t,uc,2):String(t),uc=(t,e)=>cc(e)?uc(t,e.value):Sn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,i],r)=>(n[lr(s,r)+" =>"]=i,n),{})}:sc(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>lr(n))}:Gt(e)?lr(e):ce(e)&&!U(e)&&!oc(e)?String(e):e,lr=(t,e="")=>{var n;return Gt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let He;class Sf{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=He,!e&&He&&(this.index=(He.scopes||(He.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=He;try{return He=this,e()}finally{He=n}}}on(){He=this}off(){He=this.parent}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function If(){return He}let re;const ar=new WeakSet;class hc{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,He&&He.active&&He.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ar.has(this)&&(ar.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||dc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,yl(this),pc(this);const e=re,n=Ze;re=this,Ze=!0;try{return this.fn()}finally{_c(this),re=e,Ze=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Co(e);this.deps=this.depsTail=void 0,yl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ar.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Or(this)&&this.run()}get dirty(){return Or(this)}}let fc=0,ss,is;function dc(t,e=!1){if(t.flags|=8,e){t.next=is,is=t;return}t.next=ss,ss=t}function vo(){fc++}function Eo(){if(--fc>0)return;if(is){let e=is;for(is=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;ss;){let e=ss;for(ss=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function pc(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function _c(t){let e,n=t.depsTail,s=n;for(;s;){const i=s.prevDep;s.version===-1?(s===n&&(n=i),Co(s),Tf(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}t.deps=e,t.depsTail=n}function Or(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(gc(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function gc(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===ms))return;t.globalVersion=ms;const e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&t.deps&&!Or(t)){t.flags&=-3;return}const n=re,s=Ze;re=t,Ze=!0;try{pc(t);const i=t.fn(t._value);(e.version===0||Lt(i,t._value))&&(t._value=i,e.version++)}catch(i){throw e.version++,i}finally{re=n,Ze=s,_c(t),t.flags&=-3}}function Co(t,e=!1){const{dep:n,prevSub:s,nextSub:i}=t;if(s&&(s.nextSub=i,t.prevSub=void 0),i&&(i.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)Co(r,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Tf(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Ze=!0;const mc=[];function zt(){mc.push(Ze),Ze=!1}function qt(){const t=mc.pop();Ze=t===void 0?!0:t}function yl(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=re;re=void 0;try{e()}finally{re=n}}}let ms=0;class Rf{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class bo{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!re||!Ze||re===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==re)n=this.activeLink=new Rf(re,this),re.deps?(n.prevDep=re.depsTail,re.depsTail.nextDep=n,re.depsTail=n):re.deps=re.depsTail=n,yc(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=re.depsTail,n.nextDep=void 0,re.depsTail.nextDep=n,re.depsTail=n,re.deps===n&&(re.deps=s)}return n}trigger(e){this.version++,ms++,this.notify(e)}notify(e){vo();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Eo()}}}function yc(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)yc(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Dr=new WeakMap,rn=Symbol(""),kr=Symbol(""),ys=Symbol("");function Se(t,e,n){if(Ze&&re){let s=Dr.get(t);s||Dr.set(t,s=new Map);let i=s.get(n);i||(s.set(n,i=new bo),i.map=s,i.key=n),i.track()}}function Et(t,e,n,s,i,r){const o=Dr.get(t);if(!o){ms++;return}const l=a=>{a&&a.trigger()};if(vo(),e==="clear")o.forEach(l);else{const a=U(t),c=a&&mo(n);if(a&&n==="length"){const u=Number(s);o.forEach((h,f)=>{(f==="length"||f===ys||!Gt(f)&&f>=u)&&l(h)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),c&&l(o.get(ys)),e){case"add":a?c&&l(o.get("length")):(l(o.get(rn)),Sn(t)&&l(o.get(kr)));break;case"delete":a||(l(o.get(rn)),Sn(t)&&l(o.get(kr)));break;case"set":Sn(t)&&l(o.get(rn));break}}Eo()}function mn(t){const e=Q(t);return e===t?e:(Se(e,"iterate",ys),ze(t)?e:e.map(Ie))}function Bi(t){return Se(t=Q(t),"iterate",ys),t}const xf={__proto__:null,[Symbol.iterator](){return cr(this,Symbol.iterator,Ie)},concat(...t){return mn(this).concat(...t.map(e=>U(e)?mn(e):e))},entries(){return cr(this,"entries",t=>(t[1]=Ie(t[1]),t))},every(t,e){return mt(this,"every",t,e,void 0,arguments)},filter(t,e){return mt(this,"filter",t,e,n=>n.map(Ie),arguments)},find(t,e){return mt(this,"find",t,e,Ie,arguments)},findIndex(t,e){return mt(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return mt(this,"findLast",t,e,Ie,arguments)},findLastIndex(t,e){return mt(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return mt(this,"forEach",t,e,void 0,arguments)},includes(...t){return ur(this,"includes",t)},indexOf(...t){return ur(this,"indexOf",t)},join(t){return mn(this).join(t)},lastIndexOf(...t){return ur(this,"lastIndexOf",t)},map(t,e){return mt(this,"map",t,e,void 0,arguments)},pop(){return qn(this,"pop")},push(...t){return qn(this,"push",t)},reduce(t,...e){return vl(this,"reduce",t,e)},reduceRight(t,...e){return vl(this,"reduceRight",t,e)},shift(){return qn(this,"shift")},some(t,e){return mt(this,"some",t,e,void 0,arguments)},splice(...t){return qn(this,"splice",t)},toReversed(){return mn(this).toReversed()},toSorted(t){return mn(this).toSorted(t)},toSpliced(...t){return mn(this).toSpliced(...t)},unshift(...t){return qn(this,"unshift",t)},values(){return cr(this,"values",Ie)}};function cr(t,e,n){const s=Bi(t),i=s[e]();return s!==t&&!ze(t)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.value&&(r.value=n(r.value)),r}),i}const Af=Array.prototype;function mt(t,e,n,s,i,r){const o=Bi(t),l=o!==t&&!ze(t),a=o[e];if(a!==Af[e]){const h=a.apply(t,r);return l?Ie(h):h}let c=n;o!==t&&(l?c=function(h,f){return n.call(this,Ie(h),f,t)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,t)}));const u=a.call(o,c,s);return l&&i?i(u):u}function vl(t,e,n,s){const i=Bi(t);let r=n;return i!==t&&(ze(t)?n.length>3&&(r=function(o,l,a){return n.call(this,o,l,a,t)}):r=function(o,l,a){return n.call(this,o,Ie(l),a,t)}),i[e](r,...s)}function ur(t,e,n){const s=Q(t);Se(s,"iterate",ys);const i=s[e](...n);return(i===-1||i===!1)&&Io(n[0])?(n[0]=Q(n[0]),s[e](...n)):i}function qn(t,e,n=[]){zt(),vo();const s=Q(t)[e].apply(t,n);return Eo(),qt(),s}const Nf=po("__proto__,__v_isRef,__isVue"),vc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Gt));function Pf(t){Gt(t)||(t=String(t));const e=Q(this);return Se(e,"has",t),e.hasOwnProperty(t)}class Ec{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(i?r?Uf:Sc:r?wc:bc).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=U(e);if(!i){let a;if(o&&(a=xf[n]))return a;if(n==="hasOwnProperty")return Pf}const l=Reflect.get(e,n,Re(e)?e:s);return(Gt(n)?vc.has(n):Nf(n))||(i||Se(e,"get",n),r)?l:Re(l)?o&&mo(n)?l:l.value:ce(l)?i?Tc(l):Ls(l):l}}class Cc extends Ec{constructor(e=!1){super(!1,e)}set(e,n,s,i){let r=e[n];if(!this._isShallow){const a=on(r);if(!ze(s)&&!on(s)&&(r=Q(r),s=Q(s)),!U(e)&&Re(r)&&!Re(s))return a?!1:(r.value=s,!0)}const o=U(e)&&mo(n)?Number(n)<e.length:J(e,n),l=Reflect.set(e,n,s,Re(e)?e:i);return e===Q(i)&&(o?Lt(s,r)&&Et(e,"set",n,s):Et(e,"add",n,s)),l}deleteProperty(e,n){const s=J(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&s&&Et(e,"delete",n,void 0),i}has(e,n){const s=Reflect.has(e,n);return(!Gt(n)||!vc.has(n))&&Se(e,"has",n),s}ownKeys(e){return Se(e,"iterate",U(e)?"length":rn),Reflect.ownKeys(e)}}class Of extends Ec{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Df=new Cc,kf=new Of,Mf=new Cc(!0);const Mr=t=>t,qs=t=>Reflect.getPrototypeOf(t);function Lf(t,e,n){return function(...s){const i=this.__v_raw,r=Q(i),o=Sn(r),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=i[t](...s),u=n?Mr:e?Lr:Ie;return!e&&Se(r,"iterate",a?kr:rn),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:l?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Ys(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Ff(t,e){const n={get(i){const r=this.__v_raw,o=Q(r),l=Q(i);t||(Lt(i,l)&&Se(o,"get",i),Se(o,"get",l));const{has:a}=qs(o),c=e?Mr:t?Lr:Ie;if(a.call(o,i))return c(r.get(i));if(a.call(o,l))return c(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!t&&Se(Q(i),"iterate",rn),Reflect.get(i,"size",i)},has(i){const r=this.__v_raw,o=Q(r),l=Q(i);return t||(Lt(i,l)&&Se(o,"has",i),Se(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,a=Q(l),c=e?Mr:t?Lr:Ie;return!t&&Se(a,"iterate",rn),l.forEach((u,h)=>i.call(r,c(u),c(h),o))}};return xe(n,t?{add:Ys("add"),set:Ys("set"),delete:Ys("delete"),clear:Ys("clear")}:{add(i){!e&&!ze(i)&&!on(i)&&(i=Q(i));const r=Q(this);return qs(r).has.call(r,i)||(r.add(i),Et(r,"add",i,i)),this},set(i,r){!e&&!ze(r)&&!on(r)&&(r=Q(r));const o=Q(this),{has:l,get:a}=qs(o);let c=l.call(o,i);c||(i=Q(i),c=l.call(o,i));const u=a.call(o,i);return o.set(i,r),c?Lt(r,u)&&Et(o,"set",i,r):Et(o,"add",i,r),this},delete(i){const r=Q(this),{has:o,get:l}=qs(r);let a=o.call(r,i);a||(i=Q(i),a=o.call(r,i)),l&&l.call(r,i);const c=r.delete(i);return a&&Et(r,"delete",i,void 0),c},clear(){const i=Q(this),r=i.size!==0,o=i.clear();return r&&Et(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=Lf(i,t,e)}),n}function wo(t,e){const n=Ff(t,e);return(s,i,r)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?s:Reflect.get(J(n,i)&&i in s?n:s,i,r)}const Bf={get:wo(!1,!1)},Hf={get:wo(!1,!0)},$f={get:wo(!0,!1)};const bc=new WeakMap,wc=new WeakMap,Sc=new WeakMap,Uf=new WeakMap;function Wf(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Vf(t){return t.__v_skip||!Object.isExtensible(t)?0:Wf(_f(t))}function Ls(t){return on(t)?t:So(t,!1,Df,Bf,bc)}function Ic(t){return So(t,!1,Mf,Hf,wc)}function Tc(t){return So(t,!0,kf,$f,Sc)}function So(t,e,n,s,i){if(!ce(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=i.get(t);if(r)return r;const o=Vf(t);if(o===0)return t;const l=new Proxy(t,o===2?s:n);return i.set(t,l),l}function In(t){return on(t)?In(t.__v_raw):!!(t&&t.__v_isReactive)}function on(t){return!!(t&&t.__v_isReadonly)}function ze(t){return!!(t&&t.__v_isShallow)}function Io(t){return t?!!t.__v_raw:!1}function Q(t){const e=t&&t.__v_raw;return e?Q(e):t}function jf(t){return!J(t,"__v_skip")&&Object.isExtensible(t)&&lc(t,"__v_skip",!0),t}const Ie=t=>ce(t)?Ls(t):t,Lr=t=>ce(t)?Tc(t):t;function Re(t){return t?t.__v_isRef===!0:!1}function Tn(t){return Rc(t,!1)}function Gf(t){return Rc(t,!0)}function Rc(t,e){return Re(t)?t:new Kf(t,e)}class Kf{constructor(e,n){this.dep=new bo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Q(e),this._value=n?e:Ie(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||ze(e)||on(e);e=s?e:Q(e),Lt(e,n)&&(this._rawValue=e,this._value=s?e:Ie(e),this.dep.trigger())}}function Rn(t){return Re(t)?t.value:t}const zf={get:(t,e,n)=>e==="__v_raw"?t:Rn(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Re(i)&&!Re(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};function xc(t){return In(t)?t:new Proxy(t,zf)}class qf{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new bo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ms-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&re!==this)return dc(this,!0),!0}get value(){const e=this.dep.track();return gc(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Yf(t,e,n=!1){let s,i;return W(t)?s=t:(s=t.get,i=t.set),new qf(s,i,n)}const Qs={},oi=new WeakMap;let en;function Qf(t,e=!1,n=en){if(n){let s=oi.get(n);s||oi.set(n,s=[]),s.push(t)}}function Jf(t,e,n=se){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:a}=n,c=O=>i?O:ze(O)||i===!1||i===0?Ct(O,1):Ct(O);let u,h,f,_,m=!1,w=!1;if(Re(t)?(h=()=>t.value,m=ze(t)):In(t)?(h=()=>c(t),m=!0):U(t)?(w=!0,m=t.some(O=>In(O)||ze(O)),h=()=>t.map(O=>{if(Re(O))return O.value;if(In(O))return c(O);if(W(O))return a?a(O,2):O()})):W(t)?e?h=a?()=>a(t,2):t:h=()=>{if(f){zt();try{f()}finally{qt()}}const O=en;en=u;try{return a?a(t,3,[_]):t(_)}finally{en=O}}:h=ft,e&&i){const O=h,te=i===!0?1/0:i;h=()=>Ct(O(),te)}const D=If(),k=()=>{u.stop(),D&&D.active&&go(D.effects,u)};if(r&&e){const O=e;e=(...te)=>{O(...te),k()}}let P=w?new Array(t.length).fill(Qs):Qs;const L=O=>{if(!(!(u.flags&1)||!u.dirty&&!O))if(e){const te=u.run();if(i||m||(w?te.some((Ee,ue)=>Lt(Ee,P[ue])):Lt(te,P))){f&&f();const Ee=en;en=u;try{const ue=[te,P===Qs?void 0:w&&P[0]===Qs?[]:P,_];a?a(e,3,ue):e(...ue),P=te}finally{en=Ee}}}else u.run()};return l&&l(L),u=new hc(h),u.scheduler=o?()=>o(L,!1):L,_=O=>Qf(O,!1,u),f=u.onStop=()=>{const O=oi.get(u);if(O){if(a)a(O,4);else for(const te of O)te();oi.delete(u)}},e?s?L(!0):P=u.run():o?o(L.bind(null,!0),!0):u.run(),k.pause=u.pause.bind(u),k.resume=u.resume.bind(u),k.stop=k,k}function Ct(t,e=1/0,n){if(e<=0||!ce(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,Re(t))Ct(t.value,e,n);else if(U(t))for(let s=0;s<t.length;s++)Ct(t[s],e,n);else if(sc(t)||Sn(t))t.forEach(s=>{Ct(s,e,n)});else if(oc(t)){for(const s in t)Ct(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&Ct(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Fs(t,e,n,s){try{return s?t(...s):t()}catch(i){Hi(i,e,n)}}function pt(t,e,n,s){if(W(t)){const i=Fs(t,e,n,s);return i&&ic(i)&&i.catch(r=>{Hi(r,e,n)}),i}if(U(t)){const i=[];for(let r=0;r<t.length;r++)i.push(pt(t[r],e,n,s));return i}}function Hi(t,e,n,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||se;if(e){let l=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const u=l.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,a,c)===!1)return}l=l.parent}if(r){zt(),Fs(r,null,10,[t,a,c]),qt();return}}Xf(t,n,i,s,o)}function Xf(t,e,n,s=!0,i=!1){if(i)throw t;console.error(t)}const Ne=[];let ut=-1;const xn=[];let Ot=null,vn=0;const Ac=Promise.resolve();let li=null;function Nc(t){const e=li||Ac;return t?e.then(this?t.bind(this):t):e}function Zf(t){let e=ut+1,n=Ne.length;for(;e<n;){const s=e+n>>>1,i=Ne[s],r=vs(i);r<t||r===t&&i.flags&2?e=s+1:n=s}return e}function To(t){if(!(t.flags&1)){const e=vs(t),n=Ne[Ne.length-1];!n||!(t.flags&2)&&e>=vs(n)?Ne.push(t):Ne.splice(Zf(e),0,t),t.flags|=1,Pc()}}function Pc(){li||(li=Ac.then(Dc))}function ed(t){U(t)?xn.push(...t):Ot&&t.id===-1?Ot.splice(vn+1,0,t):t.flags&1||(xn.push(t),t.flags|=1),Pc()}function El(t,e,n=ut+1){for(;n<Ne.length;n++){const s=Ne[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;Ne.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Oc(t){if(xn.length){const e=[...new Set(xn)].sort((n,s)=>vs(n)-vs(s));if(xn.length=0,Ot){Ot.push(...e);return}for(Ot=e,vn=0;vn<Ot.length;vn++){const n=Ot[vn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Ot=null,vn=0}}const vs=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Dc(t){try{for(ut=0;ut<Ne.length;ut++){const e=Ne[ut];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Fs(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ut<Ne.length;ut++){const e=Ne[ut];e&&(e.flags&=-2)}ut=-1,Ne.length=0,Oc(),li=null,(Ne.length||xn.length)&&Dc()}}let We=null,kc=null;function ai(t){const e=We;return We=t,kc=t&&t.type.__scopeId||null,e}function td(t,e=We,n){if(!e||t._n)return t;const s=(...i)=>{s._d&&Nl(-1);const r=ai(e);let o;try{o=t(...i)}finally{ai(r),s._d&&Nl(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function Fr(t,e){if(We===null)return t;const n=Vi(We),s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,a=se]=e[i];r&&(W(r)&&(r={mounted:r,updated:r}),r.deep&&Ct(o),s.push({dir:r,instance:n,value:o,oldValue:void 0,arg:l,modifiers:a}))}return t}function Xt(t,e,n,s){const i=t.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(zt(),pt(a,n,8,[t.el,l,t,e]),qt())}}const nd=Symbol("_vte"),sd=t=>t.__isTeleport;function Ro(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Ro(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function Mc(t,e){return W(t)?xe({name:t.name},e,{setup:t}):t}function Lc(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function ci(t,e,n,s,i=!1){if(U(t)){t.forEach((m,w)=>ci(m,e&&(U(e)?e[w]:e),n,s,i));return}if(rs(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&ci(t,e,n,s.component.subTree);return}const r=s.shapeFlag&4?Vi(s.component):s.el,o=i?null:r,{i:l,r:a}=t,c=e&&e.r,u=l.refs===se?l.refs={}:l.refs,h=l.setupState,f=Q(h),_=h===se?()=>!1:m=>J(f,m);if(c!=null&&c!==a&&(pe(c)?(u[c]=null,_(c)&&(h[c]=null)):Re(c)&&(c.value=null)),W(a))Fs(a,l,12,[o,u]);else{const m=pe(a),w=Re(a);if(m||w){const D=()=>{if(t.f){const k=m?_(a)?h[a]:u[a]:a.value;i?U(k)&&go(k,r):U(k)?k.includes(r)||k.push(r):m?(u[a]=[r],_(a)&&(h[a]=u[a])):(a.value=[r],t.k&&(u[t.k]=a.value))}else m?(u[a]=o,_(a)&&(h[a]=o)):w&&(a.value=o,t.k&&(u[t.k]=o))};o?(D.id=-1,Be(D,n)):D()}}}Li().requestIdleCallback;Li().cancelIdleCallback;const rs=t=>!!t.type.__asyncLoader,Fc=t=>t.type.__isKeepAlive;function id(t,e){Bc(t,"a",e)}function rd(t,e){Bc(t,"da",e)}function Bc(t,e,n=Te){const s=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if($i(e,s,n),n){let i=n.parent;for(;i&&i.parent;)Fc(i.parent.vnode)&&od(s,e,n,i),i=i.parent}}function od(t,e,n,s){const i=$i(e,t,s,!0);xo(()=>{go(s[e],i)},n)}function $i(t,e,n=Te,s=!1){if(n){const i=n[t]||(n[t]=[]),r=e.__weh||(e.__weh=(...o)=>{zt();const l=Bs(n),a=pt(e,n,t,o);return l(),qt(),a});return s?i.unshift(r):i.push(r),r}}const Tt=t=>(e,n=Te)=>{(!Cs||t==="sp")&&$i(t,(...s)=>e(...s),n)},ld=Tt("bm"),Hc=Tt("m"),ad=Tt("bu"),cd=Tt("u"),ud=Tt("bum"),xo=Tt("um"),hd=Tt("sp"),fd=Tt("rtg"),dd=Tt("rtc");function pd(t,e=Te){$i("ec",t,e)}const _d="components";function gd(t,e){return yd(_d,t,!0,e)||t}const md=Symbol.for("v-ndc");function yd(t,e,n=!0,s=!1){const i=We||Te;if(i){const r=i.type;{const l=op(r,!1);if(l&&(l===e||l===qe(e)||l===Mi(qe(e))))return r}const o=Cl(i[t]||r[t],e)||Cl(i.appContext[t],e);return!o&&s?r:o}}function Cl(t,e){return t&&(t[e]||t[qe(e)]||t[Mi(qe(e))])}function $c(t,e,n,s){let i;const r=n,o=U(t);if(o||pe(t)){const l=o&&In(t);let a=!1;l&&(a=!ze(t),t=Bi(t)),i=new Array(t.length);for(let c=0,u=t.length;c<u;c++)i[c]=e(a?Ie(t[c]):t[c],c,void 0,r)}else if(typeof t=="number"){i=new Array(t);for(let l=0;l<t;l++)i[l]=e(l+1,l,void 0,r)}else if(ce(t))if(t[Symbol.iterator])i=Array.from(t,(l,a)=>e(l,a,void 0,r));else{const l=Object.keys(t);i=new Array(l.length);for(let a=0,c=l.length;a<c;a++){const u=l[a];i[a]=e(t[u],u,a,r)}}else i=[];return i}const Br=t=>t?au(t)?Vi(t):Br(t.parent):null,os=xe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Br(t.parent),$root:t=>Br(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Wc(t),$forceUpdate:t=>t.f||(t.f=()=>{To(t.update)}),$nextTick:t=>t.n||(t.n=Nc.bind(t.proxy)),$watch:t=>Hd.bind(t)}),hr=(t,e)=>t!==se&&!t.__isScriptSetup&&J(t,e),vd={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=t;let c;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return s[e];case 2:return i[e];case 4:return n[e];case 3:return r[e]}else{if(hr(s,e))return o[e]=1,s[e];if(i!==se&&J(i,e))return o[e]=2,i[e];if((c=t.propsOptions[0])&&J(c,e))return o[e]=3,r[e];if(n!==se&&J(n,e))return o[e]=4,n[e];Hr&&(o[e]=0)}}const u=os[e];let h,f;if(u)return e==="$attrs"&&Se(t.attrs,"get",""),u(t);if((h=l.__cssModules)&&(h=h[e]))return h;if(n!==se&&J(n,e))return o[e]=4,n[e];if(f=a.config.globalProperties,J(f,e))return f[e]},set({_:t},e,n){const{data:s,setupState:i,ctx:r}=t;return hr(i,e)?(i[e]=n,!0):s!==se&&J(s,e)?(s[e]=n,!0):J(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(r[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:i,propsOptions:r}},o){let l;return!!n[o]||t!==se&&J(t,o)||hr(e,o)||(l=r[0])&&J(l,o)||J(s,o)||J(os,o)||J(i.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:J(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function bl(t){return U(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Hr=!0;function Ed(t){const e=Wc(t),n=t.proxy,s=t.ctx;Hr=!1,e.beforeCreate&&wl(e.beforeCreate,t,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:_,updated:m,activated:w,deactivated:D,beforeDestroy:k,beforeUnmount:P,destroyed:L,unmounted:O,render:te,renderTracked:Ee,renderTriggered:ue,errorCaptured:nt,serverPrefetch:xt,expose:st,inheritAttrs:At,components:Jt,directives:it,filters:Kn}=e;if(c&&Cd(c,s,null),o)for(const Z in o){const q=o[Z];W(q)&&(s[Z]=q.bind(n))}if(i){const Z=i.call(n,n);ce(Z)&&(t.data=Ls(Z))}if(Hr=!0,r)for(const Z in r){const q=r[Z],gt=W(q)?q.bind(n,n):W(q.get)?q.get.bind(n,n):ft,Nt=!W(q)&&W(q.set)?q.set.bind(n):ft,rt=Ue({get:gt,set:Nt});Object.defineProperty(s,Z,{enumerable:!0,configurable:!0,get:()=>rt.value,set:De=>rt.value=De})}if(l)for(const Z in l)Uc(l[Z],s,n,Z);if(a){const Z=W(a)?a.call(n):a;Reflect.ownKeys(Z).forEach(q=>{ei(q,Z[q])})}u&&wl(u,t,"c");function me(Z,q){U(q)?q.forEach(gt=>Z(gt.bind(n))):q&&Z(q.bind(n))}if(me(ld,h),me(Hc,f),me(ad,_),me(cd,m),me(id,w),me(rd,D),me(pd,nt),me(dd,Ee),me(fd,ue),me(ud,P),me(xo,O),me(hd,xt),U(st))if(st.length){const Z=t.exposed||(t.exposed={});st.forEach(q=>{Object.defineProperty(Z,q,{get:()=>n[q],set:gt=>n[q]=gt})})}else t.exposed||(t.exposed={});te&&t.render===ft&&(t.render=te),At!=null&&(t.inheritAttrs=At),Jt&&(t.components=Jt),it&&(t.directives=it),xt&&Lc(t)}function Cd(t,e,n=ft){U(t)&&(t=$r(t));for(const s in t){const i=t[s];let r;ce(i)?"default"in i?r=dt(i.from||s,i.default,!0):r=dt(i.from||s):r=dt(i),Re(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function wl(t,e,n){pt(U(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Uc(t,e,n,s){let i=s.includes(".")?nu(n,s):()=>n[s];if(pe(t)){const r=e[t];W(r)&&ls(i,r)}else if(W(t))ls(i,t.bind(n));else if(ce(t))if(U(t))t.forEach(r=>Uc(r,e,n,s));else{const r=W(t.handler)?t.handler.bind(n):e[t.handler];W(r)&&ls(i,r,t)}}function Wc(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=t.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!n&&!s?a=e:(a={},i.length&&i.forEach(c=>ui(a,c,o,!0)),ui(a,e,o)),ce(e)&&r.set(e,a),a}function ui(t,e,n,s=!1){const{mixins:i,extends:r}=e;r&&ui(t,r,n,!0),i&&i.forEach(o=>ui(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=bd[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const bd={data:Sl,props:Il,emits:Il,methods:ts,computed:ts,beforeCreate:Ae,created:Ae,beforeMount:Ae,mounted:Ae,beforeUpdate:Ae,updated:Ae,beforeDestroy:Ae,beforeUnmount:Ae,destroyed:Ae,unmounted:Ae,activated:Ae,deactivated:Ae,errorCaptured:Ae,serverPrefetch:Ae,components:ts,directives:ts,watch:Sd,provide:Sl,inject:wd};function Sl(t,e){return e?t?function(){return xe(W(t)?t.call(this,this):t,W(e)?e.call(this,this):e)}:e:t}function wd(t,e){return ts($r(t),$r(e))}function $r(t){if(U(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Ae(t,e){return t?[...new Set([].concat(t,e))]:e}function ts(t,e){return t?xe(Object.create(null),t,e):e}function Il(t,e){return t?U(t)&&U(e)?[...new Set([...t,...e])]:xe(Object.create(null),bl(t),bl(e??{})):e}function Sd(t,e){if(!t)return e;if(!e)return t;const n=xe(Object.create(null),t);for(const s in e)n[s]=Ae(t[s],e[s]);return n}function Vc(){return{app:null,config:{isNativeTag:df,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Id=0;function Td(t,e){return function(s,i=null){W(s)||(s=xe({},s)),i!=null&&!ce(i)&&(i=null);const r=Vc(),o=new WeakSet,l=[];let a=!1;const c=r.app={_uid:Id++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:ap,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&W(u.install)?(o.add(u),u.install(c,...h)):W(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!a){const _=c._ceVNode||be(s,i);return _.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),t(_,u,f),a=!0,c._container=u,u.__vue_app__=c,Vi(_.component)}},onUnmount(u){l.push(u)},unmount(){a&&(pt(l,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=An;An=c;try{return u()}finally{An=h}}};return c}}let An=null;function ei(t,e){if(Te){let n=Te.provides;const s=Te.parent&&Te.parent.provides;s===n&&(n=Te.provides=Object.create(s)),n[t]=e}}function dt(t,e,n=!1){const s=Te||We;if(s||An){const i=An?An._context.provides:s?s.parent==null?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return n&&W(e)?e.call(s&&s.proxy):e}}const jc={},Gc=()=>Object.create(jc),Kc=t=>Object.getPrototypeOf(t)===jc;function Rd(t,e,n,s=!1){const i={},r=Gc();t.propsDefaults=Object.create(null),zc(t,e,i,r);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=s?i:Ic(i):t.type.props?t.props=i:t.props=r,t.attrs=r}function xd(t,e,n,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=t,l=Q(i),[a]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Ui(t.emitsOptions,f))continue;const _=e[f];if(a)if(J(r,f))_!==r[f]&&(r[f]=_,c=!0);else{const m=qe(f);i[m]=Ur(a,l,m,_,t,!1)}else _!==r[f]&&(r[f]=_,c=!0)}}}else{zc(t,e,i,r)&&(c=!0);let u;for(const h in l)(!e||!J(e,h)&&((u=Kt(h))===h||!J(e,u)))&&(a?n&&(n[h]!==void 0||n[u]!==void 0)&&(i[h]=Ur(a,l,h,void 0,t,!0)):delete i[h]);if(r!==l)for(const h in r)(!e||!J(e,h))&&(delete r[h],c=!0)}c&&Et(t.attrs,"set","")}function zc(t,e,n,s){const[i,r]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(ns(a))continue;const c=e[a];let u;i&&J(i,u=qe(a))?!r||!r.includes(u)?n[u]=c:(l||(l={}))[u]=c:Ui(t.emitsOptions,a)||(!(a in s)||c!==s[a])&&(s[a]=c,o=!0)}if(r){const a=Q(n),c=l||se;for(let u=0;u<r.length;u++){const h=r[u];n[h]=Ur(i,a,h,c[h],t,!J(c,h))}}return o}function Ur(t,e,n,s,i,r){const o=t[n];if(o!=null){const l=J(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&W(a)){const{propsDefaults:c}=i;if(n in c)s=c[n];else{const u=Bs(i);s=c[n]=a.call(null,e),u()}}else s=a;i.ce&&i.ce._setProp(n,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===Kt(n))&&(s=!0))}return s}const Ad=new WeakMap;function qc(t,e,n=!1){const s=n?Ad:e.propsCache,i=s.get(t);if(i)return i;const r=t.props,o={},l=[];let a=!1;if(!W(t)){const u=h=>{a=!0;const[f,_]=qc(h,e,!0);xe(o,f),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!r&&!a)return ce(t)&&s.set(t,wn),wn;if(U(r))for(let u=0;u<r.length;u++){const h=qe(r[u]);Tl(h)&&(o[h]=se)}else if(r)for(const u in r){const h=qe(u);if(Tl(h)){const f=r[u],_=o[h]=U(f)||W(f)?{type:f}:xe({},f),m=_.type;let w=!1,D=!0;if(U(m))for(let k=0;k<m.length;++k){const P=m[k],L=W(P)&&P.name;if(L==="Boolean"){w=!0;break}else L==="String"&&(D=!1)}else w=W(m)&&m.name==="Boolean";_[0]=w,_[1]=D,(w||J(_,"default"))&&l.push(h)}}const c=[o,l];return ce(t)&&s.set(t,c),c}function Tl(t){return t[0]!=="$"&&!ns(t)}const Yc=t=>t[0]==="_"||t==="$stable",Ao=t=>U(t)?t.map(ht):[ht(t)],Nd=(t,e,n)=>{if(e._n)return e;const s=td((...i)=>Ao(e(...i)),n);return s._c=!1,s},Qc=(t,e,n)=>{const s=t._ctx;for(const i in t){if(Yc(i))continue;const r=t[i];if(W(r))e[i]=Nd(i,r,s);else if(r!=null){const o=Ao(r);e[i]=()=>o}}},Jc=(t,e)=>{const n=Ao(e);t.slots.default=()=>n},Xc=(t,e,n)=>{for(const s in e)(n||s!=="_")&&(t[s]=e[s])},Pd=(t,e,n)=>{const s=t.slots=Gc();if(t.vnode.shapeFlag&32){const i=e._;i?(Xc(s,e,n),n&&lc(s,"_",i,!0)):Qc(e,s)}else e&&Jc(t,e)},Od=(t,e,n)=>{const{vnode:s,slots:i}=t;let r=!0,o=se;if(s.shapeFlag&32){const l=e._;l?n&&l===1?r=!1:Xc(i,e,n):(r=!e.$stable,Qc(e,i)),o=e}else e&&(Jc(t,e),o={default:1});if(r)for(const l in i)!Yc(l)&&o[l]==null&&delete i[l]},Be=Kd;function Dd(t){return kd(t)}function kd(t,e){const n=Li();n.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:_=ft,insertStaticContent:m}=t,w=(d,p,g,y=null,C=null,E=null,R=void 0,T=null,I=!!p.dynamicChildren)=>{if(d===p)return;d&&!Yn(d,p)&&(y=v(d),De(d,C,E,!0),d=null),p.patchFlag===-2&&(I=!1,p.dynamicChildren=null);const{type:b,ref:B,shapeFlag:A}=p;switch(b){case Wi:D(d,p,g,y);break;case ln:k(d,p,g,y);break;case dr:d==null&&P(p,g,y,R);break;case Qe:Jt(d,p,g,y,C,E,R,T,I);break;default:A&1?te(d,p,g,y,C,E,R,T,I):A&6?it(d,p,g,y,C,E,R,T,I):(A&64||A&128)&&b.process(d,p,g,y,C,E,R,T,I,M)}B!=null&&C&&ci(B,d&&d.ref,E,p||d,!p)},D=(d,p,g,y)=>{if(d==null)s(p.el=l(p.children),g,y);else{const C=p.el=d.el;p.children!==d.children&&c(C,p.children)}},k=(d,p,g,y)=>{d==null?s(p.el=a(p.children||""),g,y):p.el=d.el},P=(d,p,g,y)=>{[d.el,d.anchor]=m(d.children,p,g,y,d.el,d.anchor)},L=({el:d,anchor:p},g,y)=>{let C;for(;d&&d!==p;)C=f(d),s(d,g,y),d=C;s(p,g,y)},O=({el:d,anchor:p})=>{let g;for(;d&&d!==p;)g=f(d),i(d),d=g;i(p)},te=(d,p,g,y,C,E,R,T,I)=>{p.type==="svg"?R="svg":p.type==="math"&&(R="mathml"),d==null?Ee(p,g,y,C,E,R,T,I):xt(d,p,C,E,R,T,I)},Ee=(d,p,g,y,C,E,R,T)=>{let I,b;const{props:B,shapeFlag:A,transition:F,dirs:$}=d;if(I=d.el=o(d.type,E,B&&B.is,B),A&8?u(I,d.children):A&16&&nt(d.children,I,null,y,C,fr(d,E),R,T),$&&Xt(d,null,y,"created"),ue(I,d,d.scopeId,R,y),B){for(const ie in B)ie!=="value"&&!ns(ie)&&r(I,ie,null,B[ie],E,y);"value"in B&&r(I,"value",null,B.value,E),(b=B.onVnodeBeforeMount)&&ct(b,y,d)}$&&Xt(d,null,y,"beforeMount");const K=Md(C,F);K&&F.beforeEnter(I),s(I,p,g),((b=B&&B.onVnodeMounted)||K||$)&&Be(()=>{b&&ct(b,y,d),K&&F.enter(I),$&&Xt(d,null,y,"mounted")},C)},ue=(d,p,g,y,C)=>{if(g&&_(d,g),y)for(let E=0;E<y.length;E++)_(d,y[E]);if(C){let E=C.subTree;if(p===E||iu(E.type)&&(E.ssContent===p||E.ssFallback===p)){const R=C.vnode;ue(d,R,R.scopeId,R.slotScopeIds,C.parent)}}},nt=(d,p,g,y,C,E,R,T,I=0)=>{for(let b=I;b<d.length;b++){const B=d[b]=T?Dt(d[b]):ht(d[b]);w(null,B,p,g,y,C,E,R,T)}},xt=(d,p,g,y,C,E,R)=>{const T=p.el=d.el;let{patchFlag:I,dynamicChildren:b,dirs:B}=p;I|=d.patchFlag&16;const A=d.props||se,F=p.props||se;let $;if(g&&Zt(g,!1),($=F.onVnodeBeforeUpdate)&&ct($,g,p,d),B&&Xt(p,d,g,"beforeUpdate"),g&&Zt(g,!0),(A.innerHTML&&F.innerHTML==null||A.textContent&&F.textContent==null)&&u(T,""),b?st(d.dynamicChildren,b,T,g,y,fr(p,C),E):R||q(d,p,T,null,g,y,fr(p,C),E,!1),I>0){if(I&16)At(T,A,F,g,C);else if(I&2&&A.class!==F.class&&r(T,"class",null,F.class,C),I&4&&r(T,"style",A.style,F.style,C),I&8){const K=p.dynamicProps;for(let ie=0;ie<K.length;ie++){const X=K[ie],Le=A[X],ke=F[X];(ke!==Le||X==="value")&&r(T,X,Le,ke,C,g)}}I&1&&d.children!==p.children&&u(T,p.children)}else!R&&b==null&&At(T,A,F,g,C);(($=F.onVnodeUpdated)||B)&&Be(()=>{$&&ct($,g,p,d),B&&Xt(p,d,g,"updated")},y)},st=(d,p,g,y,C,E,R)=>{for(let T=0;T<p.length;T++){const I=d[T],b=p[T],B=I.el&&(I.type===Qe||!Yn(I,b)||I.shapeFlag&70)?h(I.el):g;w(I,b,B,null,y,C,E,R,!0)}},At=(d,p,g,y,C)=>{if(p!==g){if(p!==se)for(const E in p)!ns(E)&&!(E in g)&&r(d,E,p[E],null,C,y);for(const E in g){if(ns(E))continue;const R=g[E],T=p[E];R!==T&&E!=="value"&&r(d,E,T,R,C,y)}"value"in g&&r(d,"value",p.value,g.value,C)}},Jt=(d,p,g,y,C,E,R,T,I)=>{const b=p.el=d?d.el:l(""),B=p.anchor=d?d.anchor:l("");let{patchFlag:A,dynamicChildren:F,slotScopeIds:$}=p;$&&(T=T?T.concat($):$),d==null?(s(b,g,y),s(B,g,y),nt(p.children||[],g,B,C,E,R,T,I)):A>0&&A&64&&F&&d.dynamicChildren?(st(d.dynamicChildren,F,g,C,E,R,T),(p.key!=null||C&&p===C.subTree)&&Zc(d,p,!0)):q(d,p,g,B,C,E,R,T,I)},it=(d,p,g,y,C,E,R,T,I)=>{p.slotScopeIds=T,d==null?p.shapeFlag&512?C.ctx.activate(p,g,y,R,I):Kn(p,g,y,C,E,R,I):pn(d,p,I)},Kn=(d,p,g,y,C,E,R)=>{const T=d.component=tp(d,y,C);if(Fc(d)&&(T.ctx.renderer=M),np(T,!1,R),T.asyncDep){if(C&&C.registerDep(T,me,R),!d.el){const I=T.subTree=be(ln);k(null,I,p,g)}}else me(T,d,p,g,C,E,R)},pn=(d,p,g)=>{const y=p.component=d.component;if(jd(d,p,g))if(y.asyncDep&&!y.asyncResolved){Z(y,p,g);return}else y.next=p,y.update();else p.el=d.el,y.vnode=p},me=(d,p,g,y,C,E,R)=>{const T=()=>{if(d.isMounted){let{next:A,bu:F,u:$,parent:K,vnode:ie}=d;{const lt=eu(d);if(lt){A&&(A.el=ie.el,Z(d,A,R)),lt.asyncDep.then(()=>{d.isUnmounted||T()});return}}let X=A,Le;Zt(d,!1),A?(A.el=ie.el,Z(d,A,R)):A=ie,F&&Zs(F),(Le=A.props&&A.props.onVnodeBeforeUpdate)&&ct(Le,K,A,ie),Zt(d,!0);const ke=xl(d),ot=d.subTree;d.subTree=ke,w(ot,ke,h(ot.el),v(ot),d,C,E),A.el=ke.el,X===null&&Gd(d,ke.el),$&&Be($,C),(Le=A.props&&A.props.onVnodeUpdated)&&Be(()=>ct(Le,K,A,ie),C)}else{let A;const{el:F,props:$}=p,{bm:K,m:ie,parent:X,root:Le,type:ke}=d,ot=rs(p);Zt(d,!1),K&&Zs(K),!ot&&(A=$&&$.onVnodeBeforeMount)&&ct(A,X,p),Zt(d,!0);{Le.ce&&Le.ce._injectChildStyle(ke);const lt=d.subTree=xl(d);w(null,lt,g,y,d,C,E),p.el=lt.el}if(ie&&Be(ie,C),!ot&&(A=$&&$.onVnodeMounted)){const lt=p;Be(()=>ct(A,X,lt),C)}(p.shapeFlag&256||X&&rs(X.vnode)&&X.vnode.shapeFlag&256)&&d.a&&Be(d.a,C),d.isMounted=!0,p=g=y=null}};d.scope.on();const I=d.effect=new hc(T);d.scope.off();const b=d.update=I.run.bind(I),B=d.job=I.runIfDirty.bind(I);B.i=d,B.id=d.uid,I.scheduler=()=>To(B),Zt(d,!0),b()},Z=(d,p,g)=>{p.component=d;const y=d.vnode.props;d.vnode=p,d.next=null,xd(d,p.props,y,g),Od(d,p.children,g),zt(),El(d),qt()},q=(d,p,g,y,C,E,R,T,I=!1)=>{const b=d&&d.children,B=d?d.shapeFlag:0,A=p.children,{patchFlag:F,shapeFlag:$}=p;if(F>0){if(F&128){Nt(b,A,g,y,C,E,R,T,I);return}else if(F&256){gt(b,A,g,y,C,E,R,T,I);return}}$&8?(B&16&&je(b,C,E),A!==b&&u(g,A)):B&16?$&16?Nt(b,A,g,y,C,E,R,T,I):je(b,C,E,!0):(B&8&&u(g,""),$&16&&nt(A,g,y,C,E,R,T,I))},gt=(d,p,g,y,C,E,R,T,I)=>{d=d||wn,p=p||wn;const b=d.length,B=p.length,A=Math.min(b,B);let F;for(F=0;F<A;F++){const $=p[F]=I?Dt(p[F]):ht(p[F]);w(d[F],$,g,null,C,E,R,T,I)}b>B?je(d,C,E,!0,!1,A):nt(p,g,y,C,E,R,T,I,A)},Nt=(d,p,g,y,C,E,R,T,I)=>{let b=0;const B=p.length;let A=d.length-1,F=B-1;for(;b<=A&&b<=F;){const $=d[b],K=p[b]=I?Dt(p[b]):ht(p[b]);if(Yn($,K))w($,K,g,null,C,E,R,T,I);else break;b++}for(;b<=A&&b<=F;){const $=d[A],K=p[F]=I?Dt(p[F]):ht(p[F]);if(Yn($,K))w($,K,g,null,C,E,R,T,I);else break;A--,F--}if(b>A){if(b<=F){const $=F+1,K=$<B?p[$].el:y;for(;b<=F;)w(null,p[b]=I?Dt(p[b]):ht(p[b]),g,K,C,E,R,T,I),b++}}else if(b>F)for(;b<=A;)De(d[b],C,E,!0),b++;else{const $=b,K=b,ie=new Map;for(b=K;b<=F;b++){const Fe=p[b]=I?Dt(p[b]):ht(p[b]);Fe.key!=null&&ie.set(Fe.key,b)}let X,Le=0;const ke=F-K+1;let ot=!1,lt=0;const zn=new Array(ke);for(b=0;b<ke;b++)zn[b]=0;for(b=$;b<=A;b++){const Fe=d[b];if(Le>=ke){De(Fe,C,E,!0);continue}let at;if(Fe.key!=null)at=ie.get(Fe.key);else for(X=K;X<=F;X++)if(zn[X-K]===0&&Yn(Fe,p[X])){at=X;break}at===void 0?De(Fe,C,E,!0):(zn[at-K]=b+1,at>=lt?lt=at:ot=!0,w(Fe,p[at],g,null,C,E,R,T,I),Le++)}const _l=ot?Ld(zn):wn;for(X=_l.length-1,b=ke-1;b>=0;b--){const Fe=K+b,at=p[Fe],gl=Fe+1<B?p[Fe+1].el:y;zn[b]===0?w(null,at,g,gl,C,E,R,T,I):ot&&(X<0||b!==_l[X]?rt(at,g,gl,2):X--)}}},rt=(d,p,g,y,C=null)=>{const{el:E,type:R,transition:T,children:I,shapeFlag:b}=d;if(b&6){rt(d.component.subTree,p,g,y);return}if(b&128){d.suspense.move(p,g,y);return}if(b&64){R.move(d,p,g,M);return}if(R===Qe){s(E,p,g);for(let A=0;A<I.length;A++)rt(I[A],p,g,y);s(d.anchor,p,g);return}if(R===dr){L(d,p,g);return}if(y!==2&&b&1&&T)if(y===0)T.beforeEnter(E),s(E,p,g),Be(()=>T.enter(E),C);else{const{leave:A,delayLeave:F,afterLeave:$}=T,K=()=>s(E,p,g),ie=()=>{A(E,()=>{K(),$&&$()})};F?F(E,K,ie):ie()}else s(E,p,g)},De=(d,p,g,y=!1,C=!1)=>{const{type:E,props:R,ref:T,children:I,dynamicChildren:b,shapeFlag:B,patchFlag:A,dirs:F,cacheIndex:$}=d;if(A===-2&&(C=!1),T!=null&&ci(T,null,g,d,!0),$!=null&&(p.renderCache[$]=void 0),B&256){p.ctx.deactivate(d);return}const K=B&1&&F,ie=!rs(d);let X;if(ie&&(X=R&&R.onVnodeBeforeUnmount)&&ct(X,p,d),B&6)zs(d.component,g,y);else{if(B&128){d.suspense.unmount(g,y);return}K&&Xt(d,null,p,"beforeUnmount"),B&64?d.type.remove(d,p,g,M,y):b&&!b.hasOnce&&(E!==Qe||A>0&&A&64)?je(b,p,g,!1,!0):(E===Qe&&A&384||!C&&B&16)&&je(I,p,g),y&&_n(d)}(ie&&(X=R&&R.onVnodeUnmounted)||K)&&Be(()=>{X&&ct(X,p,d),K&&Xt(d,null,p,"unmounted")},g)},_n=d=>{const{type:p,el:g,anchor:y,transition:C}=d;if(p===Qe){gn(g,y);return}if(p===dr){O(d);return}const E=()=>{i(g),C&&!C.persisted&&C.afterLeave&&C.afterLeave()};if(d.shapeFlag&1&&C&&!C.persisted){const{leave:R,delayLeave:T}=C,I=()=>R(g,E);T?T(d.el,E,I):I()}else E()},gn=(d,p)=>{let g;for(;d!==p;)g=f(d),i(d),d=g;i(p)},zs=(d,p,g)=>{const{bum:y,scope:C,job:E,subTree:R,um:T,m:I,a:b}=d;Rl(I),Rl(b),y&&Zs(y),C.stop(),E&&(E.flags|=8,De(R,d,p,g)),T&&Be(T,p),Be(()=>{d.isUnmounted=!0},p),p&&p.pendingBranch&&!p.isUnmounted&&d.asyncDep&&!d.asyncResolved&&d.suspenseId===p.pendingId&&(p.deps--,p.deps===0&&p.resolve())},je=(d,p,g,y=!1,C=!1,E=0)=>{for(let R=E;R<d.length;R++)De(d[R],p,g,y,C)},v=d=>{if(d.shapeFlag&6)return v(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const p=f(d.anchor||d.el),g=p&&p[nd];return g?f(g):p};let N=!1;const x=(d,p,g)=>{d==null?p._vnode&&De(p._vnode,null,null,!0):w(p._vnode||null,d,p,null,null,null,g),p._vnode=d,N||(N=!0,El(),Oc(),N=!1)},M={p:w,um:De,m:rt,r:_n,mt:Kn,mc:nt,pc:q,pbc:st,n:v,o:t};return{render:x,hydrate:void 0,createApp:Td(x)}}function fr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Zt({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Md(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Zc(t,e,n=!1){const s=t.children,i=e.children;if(U(s)&&U(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=Dt(i[r]),l.el=o.el),!n&&l.patchFlag!==-2&&Zc(o,l)),l.type===Wi&&(l.el=o.el)}}function Ld(t){const e=t.slice(),n=[0];let s,i,r,o,l;const a=t.length;for(s=0;s<a;s++){const c=t[s];if(c!==0){if(i=n[n.length-1],t[i]<c){e[s]=i,n.push(s);continue}for(r=0,o=n.length-1;r<o;)l=r+o>>1,t[n[l]]<c?r=l+1:o=l;c<t[n[r]]&&(r>0&&(e[s]=n[r-1]),n[r]=s)}}for(r=n.length,o=n[r-1];r-- >0;)n[r]=o,o=e[o];return n}function eu(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:eu(e)}function Rl(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Fd=Symbol.for("v-scx"),Bd=()=>dt(Fd);function ls(t,e,n){return tu(t,e,n)}function tu(t,e,n=se){const{immediate:s,deep:i,flush:r,once:o}=n,l=xe({},n),a=e&&s||!e&&r!=="post";let c;if(Cs){if(r==="sync"){const _=Bd();c=_.__watcherHandles||(_.__watcherHandles=[])}else if(!a){const _=()=>{};return _.stop=ft,_.resume=ft,_.pause=ft,_}}const u=Te;l.call=(_,m,w)=>pt(_,u,m,w);let h=!1;r==="post"?l.scheduler=_=>{Be(_,u&&u.suspense)}:r!=="sync"&&(h=!0,l.scheduler=(_,m)=>{m?_():To(_)}),l.augmentJob=_=>{e&&(_.flags|=4),h&&(_.flags|=2,u&&(_.id=u.uid,_.i=u))};const f=Jf(t,e,l);return Cs&&(c?c.push(f):a&&f()),f}function Hd(t,e,n){const s=this.proxy,i=pe(t)?t.includes(".")?nu(s,t):()=>s[t]:t.bind(s,s);let r;W(e)?r=e:(r=e.handler,n=e);const o=Bs(this),l=tu(i,r.bind(s),n);return o(),l}function nu(t,e){const n=e.split(".");return()=>{let s=t;for(let i=0;i<n.length&&s;i++)s=s[n[i]];return s}}const $d=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${qe(e)}Modifiers`]||t[`${Kt(e)}Modifiers`];function Ud(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||se;let i=n;const r=e.startsWith("update:"),o=r&&$d(s,e.slice(7));o&&(o.trim&&(i=n.map(u=>pe(u)?u.trim():u)),o.number&&(i=n.map(Pr)));let l,a=s[l=or(e)]||s[l=or(qe(e))];!a&&r&&(a=s[l=or(Kt(e))]),a&&pt(a,t,6,i);const c=s[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,pt(c,t,6,i)}}function su(t,e,n=!1){const s=e.emitsCache,i=s.get(t);if(i!==void 0)return i;const r=t.emits;let o={},l=!1;if(!W(t)){const a=c=>{const u=su(c,e,!0);u&&(l=!0,xe(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!r&&!l?(ce(t)&&s.set(t,null),null):(U(r)?r.forEach(a=>o[a]=null):xe(o,r),ce(t)&&s.set(t,o),o)}function Ui(t,e){return!t||!Oi(e)?!1:(e=e.slice(2).replace(/Once$/,""),J(t,e[0].toLowerCase()+e.slice(1))||J(t,Kt(e))||J(t,e))}function xl(t){const{type:e,vnode:n,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:a,render:c,renderCache:u,props:h,data:f,setupState:_,ctx:m,inheritAttrs:w}=t,D=ai(t);let k,P;try{if(n.shapeFlag&4){const O=i||s,te=O;k=ht(c.call(te,O,u,h,_,f,m)),P=l}else{const O=e;k=ht(O.length>1?O(h,{attrs:l,slots:o,emit:a}):O(h,null)),P=e.props?l:Wd(l)}}catch(O){as.length=0,Hi(O,t,1),k=be(ln)}let L=k;if(P&&w!==!1){const O=Object.keys(P),{shapeFlag:te}=L;O.length&&te&7&&(r&&O.some(_o)&&(P=Vd(P,r)),L=Dn(L,P,!1,!0))}return n.dirs&&(L=Dn(L,null,!1,!0),L.dirs=L.dirs?L.dirs.concat(n.dirs):n.dirs),n.transition&&Ro(L,n.transition),k=L,ai(D),k}const Wd=t=>{let e;for(const n in t)(n==="class"||n==="style"||Oi(n))&&((e||(e={}))[n]=t[n]);return e},Vd=(t,e)=>{const n={};for(const s in t)(!_o(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function jd(t,e,n){const{props:s,children:i,component:r}=t,{props:o,children:l,patchFlag:a}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return s?Al(s,o,c):!!o;if(a&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==s[f]&&!Ui(c,f))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Al(s,o,c):!0:!!o;return!1}function Al(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(e[r]!==t[r]&&!Ui(n,r))return!0}return!1}function Gd({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const iu=t=>t.__isSuspense;function Kd(t,e){e&&e.pendingBranch?U(t)?e.effects.push(...t):e.effects.push(t):ed(t)}const Qe=Symbol.for("v-fgt"),Wi=Symbol.for("v-txt"),ln=Symbol.for("v-cmt"),dr=Symbol.for("v-stc"),as=[];let Ve=null;function $e(t=!1){as.push(Ve=t?null:[])}function zd(){as.pop(),Ve=as[as.length-1]||null}let Es=1;function Nl(t,e=!1){Es+=t,t<0&&Ve&&e&&(Ve.hasOnce=!0)}function ru(t){return t.dynamicChildren=Es>0?Ve||wn:null,zd(),Es>0&&Ve&&Ve.push(t),t}function Ge(t,e,n,s,i,r){return ru(de(t,e,n,s,i,r,!0))}function qd(t,e,n,s,i){return ru(be(t,e,n,s,i,!0))}function hi(t){return t?t.__v_isVNode===!0:!1}function Yn(t,e){return t.type===e.type&&t.key===e.key}const ou=({key:t})=>t??null,ti=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?pe(t)||Re(t)||W(t)?{i:We,r:t,k:e,f:!!n}:t:null);function de(t,e=null,n=null,s=0,i=null,r=t===Qe?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&ou(e),ref:e&&ti(e),scopeId:kc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:We};return l?(No(a,n),r&128&&t.normalize(a)):n&&(a.shapeFlag|=pe(n)?8:16),Es>0&&!o&&Ve&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&Ve.push(a),a}const be=Yd;function Yd(t,e=null,n=null,s=0,i=null,r=!1){if((!t||t===md)&&(t=ln),hi(t)){const l=Dn(t,e,!0);return n&&No(l,n),Es>0&&!r&&Ve&&(l.shapeFlag&6?Ve[Ve.indexOf(t)]=l:Ve.push(l)),l.patchFlag=-2,l}if(lp(t)&&(t=t.__vccOpts),e){e=Qd(e);let{class:l,style:a}=e;l&&!pe(l)&&(e.class=Fi(l)),ce(a)&&(Io(a)&&!U(a)&&(a=xe({},a)),e.style=yo(a))}const o=pe(t)?1:iu(t)?128:sd(t)?64:ce(t)?4:W(t)?2:0;return de(t,e,n,s,i,o,r,!0)}function Qd(t){return t?Io(t)||Kc(t)?xe({},t):t:null}function Dn(t,e,n=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:a}=t,c=e?Xd(i||{},e):i,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&ou(c),ref:e&&e.ref?n&&r?U(r)?r.concat(ti(e)):[r,ti(e)]:ti(e):r,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Qe?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Dn(t.ssContent),ssFallback:t.ssFallback&&Dn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&s&&Ro(u,a.clone(u)),u}function Jd(t=" ",e=0){return be(Wi,null,t,e)}function lu(t="",e=!1){return e?($e(),qd(ln,null,t)):be(ln,null,t)}function ht(t){return t==null||typeof t=="boolean"?be(ln):U(t)?be(Qe,null,t.slice()):hi(t)?Dt(t):be(Wi,null,String(t))}function Dt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Dn(t)}function No(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(U(e))n=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),No(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!Kc(e)?e._ctx=We:i===3&&We&&(We.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else W(e)?(e={default:e,_ctx:We},n=32):(e=String(e),s&64?(n=16,e=[Jd(e)]):n=8);t.children=e,t.shapeFlag|=n}function Xd(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=Fi([e.class,s.class]));else if(i==="style")e.style=yo([e.style,s.style]);else if(Oi(i)){const r=e[i],o=s[i];o&&r!==o&&!(U(r)&&r.includes(o))&&(e[i]=r?[].concat(r,o):o)}else i!==""&&(e[i]=s[i])}return e}function ct(t,e,n,s=null){pt(t,e,7,[n,s])}const Zd=Vc();let ep=0;function tp(t,e,n){const s=t.type,i=(e?e.appContext:t.appContext)||Zd,r={uid:ep++,vnode:t,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Sf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:qc(s,i),emitsOptions:su(s,i),emit:null,emitted:null,propsDefaults:se,inheritAttrs:s.inheritAttrs,ctx:se,data:se,props:se,attrs:se,slots:se,refs:se,setupState:se,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Ud.bind(null,r),t.ce&&t.ce(r),r}let Te=null,fi,Wr;{const t=Li(),e=(n,s)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};fi=e("__VUE_INSTANCE_SETTERS__",n=>Te=n),Wr=e("__VUE_SSR_SETTERS__",n=>Cs=n)}const Bs=t=>{const e=Te;return fi(t),t.scope.on(),()=>{t.scope.off(),fi(e)}},Pl=()=>{Te&&Te.scope.off(),fi(null)};function au(t){return t.vnode.shapeFlag&4}let Cs=!1;function np(t,e=!1,n=!1){e&&Wr(e);const{props:s,children:i}=t.vnode,r=au(t);Rd(t,s,r,e),Pd(t,i,n);const o=r?sp(t,e):void 0;return e&&Wr(!1),o}function sp(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,vd);const{setup:s}=n;if(s){zt();const i=t.setupContext=s.length>1?rp(t):null,r=Bs(t),o=Fs(s,t,0,[t.props,i]),l=ic(o);if(qt(),r(),(l||t.sp)&&!rs(t)&&Lc(t),l){if(o.then(Pl,Pl),e)return o.then(a=>{Ol(t,a)}).catch(a=>{Hi(a,t,0)});t.asyncDep=o}else Ol(t,o)}else cu(t)}function Ol(t,e,n){W(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ce(e)&&(t.setupState=xc(e)),cu(t)}function cu(t,e,n){const s=t.type;t.render||(t.render=s.render||ft);{const i=Bs(t);zt();try{Ed(t)}finally{qt(),i()}}}const ip={get(t,e){return Se(t,"get",""),t[e]}};function rp(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,ip),slots:t.slots,emit:t.emit,expose:e}}function Vi(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(xc(jf(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in os)return os[n](t)},has(e,n){return n in e||n in os}})):t.proxy}function op(t,e=!0){return W(t)?t.displayName||t.name:t.name||e&&t.__name}function lp(t){return W(t)&&"__vccOpts"in t}const Ue=(t,e)=>Yf(t,e,Cs);function uu(t,e,n){const s=arguments.length;return s===2?ce(e)&&!U(e)?hi(e)?be(t,null,[e]):be(t,e):be(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&hi(n)&&(n=[n]),be(t,e,n))}const ap="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Vr;const Dl=typeof window<"u"&&window.trustedTypes;if(Dl)try{Vr=Dl.createPolicy("vue",{createHTML:t=>t})}catch{}const hu=Vr?t=>Vr.createHTML(t):t=>t,cp="http://www.w3.org/2000/svg",up="http://www.w3.org/1998/Math/MathML",vt=typeof document<"u"?document:null,kl=vt&&vt.createElement("template"),hp={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const i=e==="svg"?vt.createElementNS(cp,t):e==="mathml"?vt.createElementNS(up,t):n?vt.createElement(t,{is:n}):vt.createElement(t);return t==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:t=>vt.createTextNode(t),createComment:t=>vt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>vt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,i,r){const o=n?n.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===r||!(i=i.nextSibling)););else{kl.innerHTML=hu(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const l=kl.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},fp=Symbol("_vtc");function dp(t,e,n){const s=t[fp];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Ml=Symbol("_vod"),pp=Symbol("_vsh"),_p=Symbol(""),gp=/(^|;)\s*display\s*:/;function mp(t,e,n){const s=t.style,i=pe(n);let r=!1;if(n&&!i){if(e)if(pe(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&ni(s,l,"")}else for(const o in e)n[o]==null&&ni(s,o,"");for(const o in n)o==="display"&&(r=!0),ni(s,o,n[o])}else if(i){if(e!==n){const o=s[_p];o&&(n+=";"+o),s.cssText=n,r=gp.test(n)}}else e&&t.removeAttribute("style");Ml in t&&(t[Ml]=r?s.display:"",t[pp]&&(s.display="none"))}const Ll=/\s*!important$/;function ni(t,e,n){if(U(n))n.forEach(s=>ni(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=yp(t,e);Ll.test(n)?t.setProperty(Kt(s),n.replace(Ll,""),"important"):t[s]=n}}const Fl=["Webkit","Moz","ms"],pr={};function yp(t,e){const n=pr[e];if(n)return n;let s=qe(e);if(s!=="filter"&&s in t)return pr[e]=s;s=Mi(s);for(let i=0;i<Fl.length;i++){const r=Fl[i]+s;if(r in t)return pr[e]=r}return e}const Bl="http://www.w3.org/1999/xlink";function Hl(t,e,n,s,i,r=wf(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Bl,e.slice(6,e.length)):t.setAttributeNS(Bl,e,n):n==null||r&&!ac(n)?t.removeAttribute(e):t.setAttribute(e,r?"":Gt(n)?String(n):n)}function $l(t,e,n,s,i){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?hu(n):n);return}const r=t.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(l!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=ac(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(i||e)}function En(t,e,n,s){t.addEventListener(e,n,s)}function vp(t,e,n,s){t.removeEventListener(e,n,s)}const Ul=Symbol("_vei");function Ep(t,e,n,s,i=null){const r=t[Ul]||(t[Ul]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=Cp(e);if(s){const c=r[e]=Sp(s,i);En(t,l,c,a)}else o&&(vp(t,l,o,a),r[e]=void 0)}}const Wl=/(?:Once|Passive|Capture)$/;function Cp(t){let e;if(Wl.test(t)){e={};let s;for(;s=t.match(Wl);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Kt(t.slice(2)),e]}let _r=0;const bp=Promise.resolve(),wp=()=>_r||(bp.then(()=>_r=0),_r=Date.now());function Sp(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;pt(Ip(s,n.value),e,5,[s])};return n.value=t,n.attached=wp(),n}function Ip(t,e){if(U(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>i=>!i._stopped&&s&&s(i))}else return e}const Vl=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Tp=(t,e,n,s,i,r)=>{const o=i==="svg";e==="class"?dp(t,s,o):e==="style"?mp(t,n,s):Oi(e)?_o(e)||Ep(t,e,n,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Rp(t,e,s,o))?($l(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Hl(t,e,s,o,r,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!pe(s))?$l(t,qe(e),s,r,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Hl(t,e,s,o))};function Rp(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Vl(e)&&W(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Vl(e)&&pe(n)?!1:e in t}const jl=t=>{const e=t.props["onUpdate:modelValue"]||!1;return U(e)?n=>Zs(e,n):e};function xp(t){t.target.composing=!0}function Gl(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const gr=Symbol("_assign"),jr={created(t,{modifiers:{lazy:e,trim:n,number:s}},i){t[gr]=jl(i);const r=s||i.props&&i.props.type==="number";En(t,e?"change":"input",o=>{if(o.target.composing)return;let l=t.value;n&&(l=l.trim()),r&&(l=Pr(l)),t[gr](l)}),n&&En(t,"change",()=>{t.value=t.value.trim()}),e||(En(t,"compositionstart",xp),En(t,"compositionend",Gl),En(t,"change",Gl))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:i,number:r}},o){if(t[gr]=jl(o),t.composing)return;const l=(r||t.type==="number")&&!/^0\d/.test(t.value)?Pr(t.value):t.value,a=e??"";l!==a&&(document.activeElement===t&&t.type!=="range"&&(s&&e===n||i&&t.value.trim()===a)||(t.value=a))}},Ap={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Np=(t,e)=>{const n=t._withKeys||(t._withKeys={}),s=e.join(".");return n[s]||(n[s]=i=>{if(!("key"in i))return;const r=Kt(i.key);if(e.some(o=>o===r||Ap[o]===r))return t(i)})},Pp=xe({patchProp:Tp},hp);let Kl;function Op(){return Kl||(Kl=Dd(Pp))}const Dp=(...t)=>{const e=Op().createApp(...t),{mount:n}=e;return e.mount=s=>{const i=Mp(s);if(!i)return;const r=e._component;!W(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,kp(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function kp(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Mp(t){return pe(t)?document.querySelector(t):t}const Lp=(t,e)=>{const n=t.__vccOpts||t;for(const[s,i]of e)n[s]=i;return n},Fp={},Bp={class:"app"};function Hp(t,e){const n=gd("router-view");return $e(),Ge("div",Bp,[be(n)])}const $p=Lp(Fp,[["render",Hp]]),Up="modulepreload",Wp=function(t){return"/ghidiembai/"+t},zl={},Vp=function(e,n,s){let i=Promise.resolve();if(n&&n.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),a=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=o(n.map(c=>{if(c=Wp(c),c in zl)return;zl[c]=!0;const u=c.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Up,u||(f.as="script"),f.crossOrigin="",f.href=c,a&&f.setAttribute("nonce",a),document.head.appendChild(f),u)return new Promise((_,m)=>{f.addEventListener("load",_),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const Cn=typeof document<"u";function fu(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function jp(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&fu(t.default)}const Y=Object.assign;function mr(t,e){const n={};for(const s in e){const i=e[s];n[s]=tt(i)?i.map(t):t(i)}return n}const cs=()=>{},tt=Array.isArray,du=/#/g,Gp=/&/g,Kp=/\//g,zp=/=/g,qp=/\?/g,pu=/\+/g,Yp=/%5B/g,Qp=/%5D/g,_u=/%5E/g,Jp=/%60/g,gu=/%7B/g,Xp=/%7C/g,mu=/%7D/g,Zp=/%20/g;function Po(t){return encodeURI(""+t).replace(Xp,"|").replace(Yp,"[").replace(Qp,"]")}function e_(t){return Po(t).replace(gu,"{").replace(mu,"}").replace(_u,"^")}function Gr(t){return Po(t).replace(pu,"%2B").replace(Zp,"+").replace(du,"%23").replace(Gp,"%26").replace(Jp,"`").replace(gu,"{").replace(mu,"}").replace(_u,"^")}function t_(t){return Gr(t).replace(zp,"%3D")}function n_(t){return Po(t).replace(du,"%23").replace(qp,"%3F")}function s_(t){return t==null?"":n_(t).replace(Kp,"%2F")}function bs(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const i_=/\/$/,r_=t=>t.replace(i_,"");function yr(t,e,n="/"){let s,i={},r="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return l<a&&l>=0&&(a=-1),a>-1&&(s=e.slice(0,a),r=e.slice(a+1,l>-1?l:e.length),i=t(r)),l>-1&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=c_(s??e,n),{fullPath:s+(r&&"?")+r+o,path:s,query:i,hash:bs(o)}}function o_(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ql(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function l_(t,e,n){const s=e.matched.length-1,i=n.matched.length-1;return s>-1&&s===i&&kn(e.matched[s],n.matched[i])&&yu(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function kn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function yu(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!a_(t[n],e[n]))return!1;return!0}function a_(t,e){return tt(t)?Yl(t,e):tt(e)?Yl(e,t):t===e}function Yl(t,e){return tt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function c_(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=n.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return n.slice(0,r).join("/")+"/"+s.slice(o).join("/")}const Pt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var ws;(function(t){t.pop="pop",t.push="push"})(ws||(ws={}));var us;(function(t){t.back="back",t.forward="forward",t.unknown=""})(us||(us={}));function u_(t){if(!t)if(Cn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),r_(t)}const h_=/^[^#]+#/;function f_(t,e){return t.replace(h_,"#")+e}function d_(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const ji=()=>({left:window.scrollX,top:window.scrollY});function p_(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;e=d_(i,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Ql(t,e){return(history.state?history.state.position-e:-1)+t}const Kr=new Map;function __(t,e){Kr.set(t,e)}function g_(t){const e=Kr.get(t);return Kr.delete(t),e}let m_=()=>location.protocol+"//"+location.host;function vu(t,e){const{pathname:n,search:s,hash:i}=e,r=t.indexOf("#");if(r>-1){let l=i.includes(t.slice(r))?t.slice(r).length:1,a=i.slice(l);return a[0]!=="/"&&(a="/"+a),ql(a,"")}return ql(n,t)+s+i}function y_(t,e,n,s){let i=[],r=[],o=null;const l=({state:f})=>{const _=vu(t,location),m=n.value,w=e.value;let D=0;if(f){if(n.value=_,e.value=f,o&&o===m){o=null;return}D=w?f.position-w.position:0}else s(_);i.forEach(k=>{k(n.value,m,{delta:D,type:ws.pop,direction:D?D>0?us.forward:us.back:us.unknown})})};function a(){o=n.value}function c(f){i.push(f);const _=()=>{const m=i.indexOf(f);m>-1&&i.splice(m,1)};return r.push(_),_}function u(){const{history:f}=window;f.state&&f.replaceState(Y({},f.state,{scroll:ji()}),"")}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:c,destroy:h}}function Jl(t,e,n,s=!1,i=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:i?ji():null}}function v_(t){const{history:e,location:n}=window,s={value:vu(t,n)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(a,c,u){const h=t.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+a:m_()+t+a;try{e[u?"replaceState":"pushState"](c,"",f),i.value=c}catch(_){console.error(_),n[u?"replace":"assign"](f)}}function o(a,c){const u=Y({},e.state,Jl(i.value.back,a,i.value.forward,!0),c,{position:i.value.position});r(a,u,!0),s.value=a}function l(a,c){const u=Y({},i.value,e.state,{forward:a,scroll:ji()});r(u.current,u,!0);const h=Y({},Jl(s.value,a,null),{position:u.position+1},c);r(a,h,!1),s.value=a}return{location:s,state:i,push:l,replace:o}}function E_(t){t=u_(t);const e=v_(t),n=y_(t,e.state,e.location,e.replace);function s(r,o=!0){o||n.pauseListeners(),history.go(r)}const i=Y({location:"",base:t,go:s,createHref:f_.bind(null,t)},e,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function C_(t){return typeof t=="string"||t&&typeof t=="object"}function Eu(t){return typeof t=="string"||typeof t=="symbol"}const Cu=Symbol("");var Xl;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Xl||(Xl={}));function Mn(t,e){return Y(new Error,{type:t,[Cu]:!0},e)}function yt(t,e){return t instanceof Error&&Cu in t&&(e==null||!!(t.type&e))}const Zl="[^/]+?",b_={sensitive:!1,strict:!1,start:!0,end:!0},w_=/[.+*?^${}()[\]/\\]/g;function S_(t,e){const n=Y({},b_,e),s=[];let i=n.start?"^":"";const r=[];for(const c of t){const u=c.length?[]:[90];n.strict&&!c.length&&(i+="/");for(let h=0;h<c.length;h++){const f=c[h];let _=40+(n.sensitive?.25:0);if(f.type===0)h||(i+="/"),i+=f.value.replace(w_,"\\$&"),_+=40;else if(f.type===1){const{value:m,repeatable:w,optional:D,regexp:k}=f;r.push({name:m,repeatable:w,optional:D});const P=k||Zl;if(P!==Zl){_+=10;try{new RegExp(`(${P})`)}catch(O){throw new Error(`Invalid custom RegExp for param "${m}" (${P}): `+O.message)}}let L=w?`((?:${P})(?:/(?:${P}))*)`:`(${P})`;h||(L=D&&c.length<2?`(?:/${L})`:"/"+L),D&&(L+="?"),i+=L,_+=20,D&&(_+=-8),w&&(_+=-20),P===".*"&&(_+=-50)}u.push(_)}s.push(u)}if(n.strict&&n.end){const c=s.length-1;s[c][s[c].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function l(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const _=u[f]||"",m=r[f-1];h[m.name]=_&&m.repeatable?_.split("/"):_}return h}function a(c){let u="",h=!1;for(const f of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const _ of f)if(_.type===0)u+=_.value;else if(_.type===1){const{value:m,repeatable:w,optional:D}=_,k=m in c?c[m]:"";if(tt(k)&&!w)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const P=tt(k)?k.join("/"):k;if(!P)if(D)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${m}"`);u+=P}}return u||"/"}return{re:o,score:s,keys:r,parse:l,stringify:a}}function I_(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function bu(t,e){let n=0;const s=t.score,i=e.score;for(;n<s.length&&n<i.length;){const r=I_(s[n],i[n]);if(r)return r;n++}if(Math.abs(i.length-s.length)===1){if(ea(s))return 1;if(ea(i))return-1}return i.length-s.length}function ea(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const T_={type:0,value:""},R_=/[a-zA-Z0-9_]/;function x_(t){if(!t)return[[]];if(t==="/")return[[T_]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${c}": ${_}`)}let n=0,s=n;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,a,c="",u="";function h(){c&&(n===0?r.push({type:0,value:c}):n===1||n===2||n===3?(r.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:c,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=a}for(;l<t.length;){if(a=t[l++],a==="\\"&&n!==2){s=n,n=4;continue}switch(n){case 0:a==="/"?(c&&h(),o()):a===":"?(h(),n=1):f();break;case 4:f(),n=s;break;case 1:a==="("?n=2:R_.test(a)?f():(h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),i}function A_(t,e,n){const s=S_(x_(t.path),n),i=Y(s,{record:t,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function N_(t,e){const n=[],s=new Map;e=ia({strict:!1,end:!0,sensitive:!1},e);function i(h){return s.get(h)}function r(h,f,_){const m=!_,w=na(h);w.aliasOf=_&&_.record;const D=ia(e,h),k=[w];if("alias"in h){const O=typeof h.alias=="string"?[h.alias]:h.alias;for(const te of O)k.push(na(Y({},w,{components:_?_.record.components:w.components,path:te,aliasOf:_?_.record:w})))}let P,L;for(const O of k){const{path:te}=O;if(f&&te[0]!=="/"){const Ee=f.record.path,ue=Ee[Ee.length-1]==="/"?"":"/";O.path=f.record.path+(te&&ue+te)}if(P=A_(O,f,D),_?_.alias.push(P):(L=L||P,L!==P&&L.alias.push(P),m&&h.name&&!sa(P)&&o(h.name)),wu(P)&&a(P),w.children){const Ee=w.children;for(let ue=0;ue<Ee.length;ue++)r(Ee[ue],P,_&&_.children[ue])}_=_||P}return L?()=>{o(L)}:cs}function o(h){if(Eu(h)){const f=s.get(h);f&&(s.delete(h),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(h);f>-1&&(n.splice(f,1),h.record.name&&s.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function l(){return n}function a(h){const f=D_(h,n);n.splice(f,0,h),h.record.name&&!sa(h)&&s.set(h.record.name,h)}function c(h,f){let _,m={},w,D;if("name"in h&&h.name){if(_=s.get(h.name),!_)throw Mn(1,{location:h});D=_.record.name,m=Y(ta(f.params,_.keys.filter(L=>!L.optional).concat(_.parent?_.parent.keys.filter(L=>L.optional):[]).map(L=>L.name)),h.params&&ta(h.params,_.keys.map(L=>L.name))),w=_.stringify(m)}else if(h.path!=null)w=h.path,_=n.find(L=>L.re.test(w)),_&&(m=_.parse(w),D=_.record.name);else{if(_=f.name?s.get(f.name):n.find(L=>L.re.test(f.path)),!_)throw Mn(1,{location:h,currentLocation:f});D=_.record.name,m=Y({},f.params,h.params),w=_.stringify(m)}const k=[];let P=_;for(;P;)k.unshift(P.record),P=P.parent;return{name:D,path:w,params:m,matched:k,meta:O_(k)}}t.forEach(h=>r(h));function u(){n.length=0,s.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:l,getRecordMatcher:i}}function ta(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function na(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:P_(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function P_(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function sa(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function O_(t){return t.reduce((e,n)=>Y(e,n.meta),{})}function ia(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}function D_(t,e){let n=0,s=e.length;for(;n!==s;){const r=n+s>>1;bu(t,e[r])<0?s=r:n=r+1}const i=k_(t);return i&&(s=e.lastIndexOf(i,s-1)),s}function k_(t){let e=t;for(;e=e.parent;)if(wu(e)&&bu(t,e)===0)return e}function wu({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function M_(t){const e={};if(t===""||t==="?")return e;const s=(t[0]==="?"?t.slice(1):t).split("&");for(let i=0;i<s.length;++i){const r=s[i].replace(pu," "),o=r.indexOf("="),l=bs(o<0?r:r.slice(0,o)),a=o<0?null:bs(r.slice(o+1));if(l in e){let c=e[l];tt(c)||(c=e[l]=[c]),c.push(a)}else e[l]=a}return e}function ra(t){let e="";for(let n in t){const s=t[n];if(n=t_(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(tt(s)?s.map(r=>r&&Gr(r)):[s&&Gr(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function L_(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=tt(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const F_=Symbol(""),oa=Symbol(""),Gi=Symbol(""),Su=Symbol(""),zr=Symbol("");function Qn(){let t=[];function e(s){return t.push(s),()=>{const i=t.indexOf(s);i>-1&&t.splice(i,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function kt(t,e,n,s,i,r=o=>o()){const o=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((l,a)=>{const c=f=>{f===!1?a(Mn(4,{from:n,to:e})):f instanceof Error?a(f):C_(f)?a(Mn(2,{from:e,to:f})):(o&&s.enterCallbacks[i]===o&&typeof f=="function"&&o.push(f),l())},u=r(()=>t.call(s&&s.instances[i],e,n,c));let h=Promise.resolve(u);t.length<3&&(h=h.then(c)),h.catch(f=>a(f))})}function vr(t,e,n,s,i=r=>r()){const r=[];for(const o of t)for(const l in o.components){let a=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(fu(a)){const u=(a.__vccOpts||a)[e];u&&r.push(kt(u,n,s,o,l,i))}else{let c=a();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const h=jp(u)?u.default:u;o.mods[l]=u,o.components[l]=h;const _=(h.__vccOpts||h)[e];return _&&kt(_,n,s,o,l,i)()}))}}return r}function la(t){const e=dt(Gi),n=dt(Su),s=Ue(()=>{const a=Rn(t.to);return e.resolve(a)}),i=Ue(()=>{const{matched:a}=s.value,{length:c}=a,u=a[c-1],h=n.matched;if(!u||!h.length)return-1;const f=h.findIndex(kn.bind(null,u));if(f>-1)return f;const _=aa(a[c-2]);return c>1&&aa(u)===_&&h[h.length-1].path!==_?h.findIndex(kn.bind(null,a[c-2])):f}),r=Ue(()=>i.value>-1&&W_(n.params,s.value.params)),o=Ue(()=>i.value>-1&&i.value===n.matched.length-1&&yu(n.params,s.value.params));function l(a={}){if(U_(a)){const c=e[Rn(t.replace)?"replace":"push"](Rn(t.to)).catch(cs);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:s,href:Ue(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}function B_(t){return t.length===1?t[0]:t}const H_=Mc({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:la,setup(t,{slots:e}){const n=Ls(la(t)),{options:s}=dt(Gi),i=Ue(()=>({[ca(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[ca(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const r=e.default&&B_(e.default(n));return t.custom?r:uu("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}}),$_=H_;function U_(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function W_(t,e){for(const n in e){const s=e[n],i=t[n];if(typeof s=="string"){if(s!==i)return!1}else if(!tt(i)||i.length!==s.length||s.some((r,o)=>r!==i[o]))return!1}return!0}function aa(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const ca=(t,e,n)=>t??e??n,V_=Mc({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=dt(zr),i=Ue(()=>t.route||s.value),r=dt(oa,0),o=Ue(()=>{let c=Rn(r);const{matched:u}=i.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),l=Ue(()=>i.value.matched[o.value]);ei(oa,Ue(()=>o.value+1)),ei(F_,l),ei(zr,i);const a=Tn();return ls(()=>[a.value,l.value,t.name],([c,u,h],[f,_,m])=>{u&&(u.instances[h]=c,_&&_!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=_.leaveGuards),u.updateGuards.size||(u.updateGuards=_.updateGuards))),c&&u&&(!_||!kn(u,_)||!f)&&(u.enterCallbacks[h]||[]).forEach(w=>w(c))},{flush:"post"}),()=>{const c=i.value,u=t.name,h=l.value,f=h&&h.components[u];if(!f)return ua(n.default,{Component:f,route:c});const _=h.props[u],m=_?_===!0?c.params:typeof _=="function"?_(c):_:null,D=uu(f,Y({},m,e,{onVnodeUnmounted:k=>{k.component.isUnmounted&&(h.instances[u]=null)},ref:a}));return ua(n.default,{Component:D,route:c})||D}}});function ua(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const j_=V_;function G_(t){const e=N_(t.routes,t),n=t.parseQuery||M_,s=t.stringifyQuery||ra,i=t.history,r=Qn(),o=Qn(),l=Qn(),a=Gf(Pt);let c=Pt;Cn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=mr.bind(null,v=>""+v),h=mr.bind(null,s_),f=mr.bind(null,bs);function _(v,N){let x,M;return Eu(v)?(x=e.getRecordMatcher(v),M=N):M=v,e.addRoute(M,x)}function m(v){const N=e.getRecordMatcher(v);N&&e.removeRoute(N)}function w(){return e.getRoutes().map(v=>v.record)}function D(v){return!!e.getRecordMatcher(v)}function k(v,N){if(N=Y({},N||a.value),typeof v=="string"){const g=yr(n,v,N.path),y=e.resolve({path:g.path},N),C=i.createHref(g.fullPath);return Y(g,y,{params:f(y.params),hash:bs(g.hash),redirectedFrom:void 0,href:C})}let x;if(v.path!=null)x=Y({},v,{path:yr(n,v.path,N.path).path});else{const g=Y({},v.params);for(const y in g)g[y]==null&&delete g[y];x=Y({},v,{params:h(g)}),N.params=h(N.params)}const M=e.resolve(x,N),ne=v.hash||"";M.params=u(f(M.params));const d=o_(s,Y({},v,{hash:e_(ne),path:M.path})),p=i.createHref(d);return Y({fullPath:d,hash:ne,query:s===ra?L_(v.query):v.query||{}},M,{redirectedFrom:void 0,href:p})}function P(v){return typeof v=="string"?yr(n,v,a.value.path):Y({},v)}function L(v,N){if(c!==v)return Mn(8,{from:N,to:v})}function O(v){return ue(v)}function te(v){return O(Y(P(v),{replace:!0}))}function Ee(v){const N=v.matched[v.matched.length-1];if(N&&N.redirect){const{redirect:x}=N;let M=typeof x=="function"?x(v):x;return typeof M=="string"&&(M=M.includes("?")||M.includes("#")?M=P(M):{path:M},M.params={}),Y({query:v.query,hash:v.hash,params:M.path!=null?{}:v.params},M)}}function ue(v,N){const x=c=k(v),M=a.value,ne=v.state,d=v.force,p=v.replace===!0,g=Ee(x);if(g)return ue(Y(P(g),{state:typeof g=="object"?Y({},ne,g.state):ne,force:d,replace:p}),N||x);const y=x;y.redirectedFrom=N;let C;return!d&&l_(s,M,x)&&(C=Mn(16,{to:y,from:M}),rt(M,M,!0,!1)),(C?Promise.resolve(C):st(y,M)).catch(E=>yt(E)?yt(E,2)?E:Nt(E):q(E,y,M)).then(E=>{if(E){if(yt(E,2))return ue(Y({replace:p},P(E.to),{state:typeof E.to=="object"?Y({},ne,E.to.state):ne,force:d}),N||y)}else E=Jt(y,M,!0,p,ne);return At(y,M,E),E})}function nt(v,N){const x=L(v,N);return x?Promise.reject(x):Promise.resolve()}function xt(v){const N=gn.values().next().value;return N&&typeof N.runWithContext=="function"?N.runWithContext(v):v()}function st(v,N){let x;const[M,ne,d]=K_(v,N);x=vr(M.reverse(),"beforeRouteLeave",v,N);for(const g of M)g.leaveGuards.forEach(y=>{x.push(kt(y,v,N))});const p=nt.bind(null,v,N);return x.push(p),je(x).then(()=>{x=[];for(const g of r.list())x.push(kt(g,v,N));return x.push(p),je(x)}).then(()=>{x=vr(ne,"beforeRouteUpdate",v,N);for(const g of ne)g.updateGuards.forEach(y=>{x.push(kt(y,v,N))});return x.push(p),je(x)}).then(()=>{x=[];for(const g of d)if(g.beforeEnter)if(tt(g.beforeEnter))for(const y of g.beforeEnter)x.push(kt(y,v,N));else x.push(kt(g.beforeEnter,v,N));return x.push(p),je(x)}).then(()=>(v.matched.forEach(g=>g.enterCallbacks={}),x=vr(d,"beforeRouteEnter",v,N,xt),x.push(p),je(x))).then(()=>{x=[];for(const g of o.list())x.push(kt(g,v,N));return x.push(p),je(x)}).catch(g=>yt(g,8)?g:Promise.reject(g))}function At(v,N,x){l.list().forEach(M=>xt(()=>M(v,N,x)))}function Jt(v,N,x,M,ne){const d=L(v,N);if(d)return d;const p=N===Pt,g=Cn?history.state:{};x&&(M||p?i.replace(v.fullPath,Y({scroll:p&&g&&g.scroll},ne)):i.push(v.fullPath,ne)),a.value=v,rt(v,N,x,p),Nt()}let it;function Kn(){it||(it=i.listen((v,N,x)=>{if(!zs.listening)return;const M=k(v),ne=Ee(M);if(ne){ue(Y(ne,{replace:!0,force:!0}),M).catch(cs);return}c=M;const d=a.value;Cn&&__(Ql(d.fullPath,x.delta),ji()),st(M,d).catch(p=>yt(p,12)?p:yt(p,2)?(ue(Y(P(p.to),{force:!0}),M).then(g=>{yt(g,20)&&!x.delta&&x.type===ws.pop&&i.go(-1,!1)}).catch(cs),Promise.reject()):(x.delta&&i.go(-x.delta,!1),q(p,M,d))).then(p=>{p=p||Jt(M,d,!1),p&&(x.delta&&!yt(p,8)?i.go(-x.delta,!1):x.type===ws.pop&&yt(p,20)&&i.go(-1,!1)),At(M,d,p)}).catch(cs)}))}let pn=Qn(),me=Qn(),Z;function q(v,N,x){Nt(v);const M=me.list();return M.length?M.forEach(ne=>ne(v,N,x)):console.error(v),Promise.reject(v)}function gt(){return Z&&a.value!==Pt?Promise.resolve():new Promise((v,N)=>{pn.add([v,N])})}function Nt(v){return Z||(Z=!v,Kn(),pn.list().forEach(([N,x])=>v?x(v):N()),pn.reset()),v}function rt(v,N,x,M){const{scrollBehavior:ne}=t;if(!Cn||!ne)return Promise.resolve();const d=!x&&g_(Ql(v.fullPath,0))||(M||!x)&&history.state&&history.state.scroll||null;return Nc().then(()=>ne(v,N,d)).then(p=>p&&p_(p)).catch(p=>q(p,v,N))}const De=v=>i.go(v);let _n;const gn=new Set,zs={currentRoute:a,listening:!0,addRoute:_,removeRoute:m,clearRoutes:e.clearRoutes,hasRoute:D,getRoutes:w,resolve:k,options:t,push:O,replace:te,go:De,back:()=>De(-1),forward:()=>De(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:me.add,isReady:gt,install(v){const N=this;v.component("RouterLink",$_),v.component("RouterView",j_),v.config.globalProperties.$router=N,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>Rn(a)}),Cn&&!_n&&a.value===Pt&&(_n=!0,O(i.location).catch(ne=>{}));const x={};for(const ne in Pt)Object.defineProperty(x,ne,{get:()=>a.value[ne],enumerable:!0});v.provide(Gi,N),v.provide(Su,Ic(x)),v.provide(zr,a);const M=v.unmount;gn.add(v),v.unmount=function(){gn.delete(v),gn.size<1&&(c=Pt,it&&it(),it=null,a.value=Pt,_n=!1,Z=!1),M()}}};function je(v){return v.reduce((N,x)=>N.then(()=>xt(x)),Promise.resolve())}return zs}function K_(t,e){const n=[],s=[],i=[],r=Math.max(e.matched.length,t.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(t.matched.find(c=>kn(c,l))?s.push(l):n.push(l));const a=t.matched[o];a&&(e.matched.find(c=>kn(c,a))||i.push(a))}return[n,s,i]}function z_(){return dt(Gi)}const q_={class:"room-selector"},Y_={__name:"RoomSelector",emits:["join-room"],setup(t,{emit:e}){const n=e,s=Tn("");function i(){s.value.trim()&&(n("join-room",s.value.trim()),s.value="")}return(r,o)=>($e(),Ge("div",q_,[Fr(de("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=l=>s.value=l),placeholder:"Nhập mã phòng",onKeyup:Np(i,["enter"])},null,544),[[jr,s.value]]),de("button",{class:"primary-btn",onClick:i},"Vào phòng")]))}},Q_={class:"game-history"},J_={key:0,class:"no-games"},X_={key:1,class:"games-list"},Z_=["onClick"],eg={class:"game-info"},tg={class:"game-date"},ng={class:"game-players"},sg={__name:"GamesList",props:{games:{type:Array,default:()=>[]}},emits:["open-game"],setup(t,{emit:e}){const n=t,s=Ue(()=>[...n.games||[]].reverse()),i=e,r=Ue(()=>n.games.length>0);function o(a){return new Date(a).toLocaleDateString("vi-VN",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function l(a){const c=n.games.length-1-a;i("open-game",c)}return(a,c)=>($e(),Ge("div",Q_,[r.value?($e(),Ge("div",X_,[($e(!0),Ge(Qe,null,$c(s.value,(u,h)=>($e(),Ge("div",{key:u.id,class:"game-item",onClick:f=>l(h)},[de("div",eg,[de("div",tg,gs(o(u.date)),1),de("div",ng,gs(u.players.join(" - ")),1)])],8,Z_))),128))])):($e(),Ge("div",J_," Chưa có ván bài nào được ghi nhận "))]))}},ig={class:"modal-content"},rg={class:"room-input-group"},og={class:"player-name-inputs"},lg=["for"],ag=["id","onUpdate:modelValue"],cg={class:"modal-buttons"},ug={__name:"PlayerNamesModal",props:{isVisible:{type:Boolean,default:!1},currentRoom:{type:String,default:""}},emits:["close","start-game"],setup(t,{emit:e}){const n=t,s=e,i=Tn(n.currentRoom||""),r=Ls([{id:1,name:""},{id:2,name:""},{id:3,name:""},{id:4,name:""}]);ls(()=>n.currentRoom,h=>{i.value=h||""});const o=()=>r.filter(f=>f.name.trim()!=="").length>=2;function l(){o()&&s("start-game",{room:i.value,players:r.map(h=>h.name.trim()||"Người chơi")})}function a(){c(),s("close")}function c(){i.value=n.currentRoom||"",r.forEach(h=>h.name="")}function u(h){h.target.classList.contains("modal")&&a()}return(h,f)=>t.isVisible?($e(),Ge("div",{key:0,class:"modal",onClick:u},[de("div",ig,[f[2]||(f[2]=de("h2",null,"Nhập Tên Người Chơi",-1)),de("div",rg,[f[1]||(f[1]=de("label",{for:"gameRoom"},"Mã phòng:",-1)),Fr(de("input",{type:"text",id:"gameRoom","onUpdate:modelValue":f[0]||(f[0]=_=>i.value=_),placeholder:"Nhập mã phòng hoặc để trống"},null,512),[[jr,i.value]])]),de("div",og,[($e(!0),Ge(Qe,null,$c(r,_=>($e(),Ge("div",{key:_.id,class:"input-group"},[de("label",{for:"playerName"+_.id},"Người chơi "+gs(_.id)+":",9,lg),Fr(de("input",{type:"text",id:"playerName"+_.id,"onUpdate:modelValue":m=>_.name=m,placeholder:"Nhập tên"},null,8,ag),[[jr,_.name]])]))),128))]),de("div",cg,[de("button",{id:"startGameBtn",class:Fi(["confirm-btn",{disabled:!o()}]),onClick:l}," Bắt Đầu ",2),de("button",{id:"cancelNewGame",class:"cancel-btn",onClick:a},"Hủy")])])])):lu("",!0)}},hg=()=>{};var ha={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S=function(t,e){if(!t)throw Wn(e)},Wn=function(t){return new Error("Firebase Database ("+Iu.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},fg=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],l=t[n++],a=((i&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Oo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,l=o?t[i+1]:0,a=i+2<t.length,c=a?t[i+2]:0,u=r>>2,h=(r&3)<<4|l>>4;let f=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(f=64)),s.push(n[u],n[h],n[f],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Tu(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):fg(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||l==null||c==null||h==null)throw new dg;const f=r<<2|l>>4;if(s.push(f),c!==64){const _=l<<4&240|c>>2;if(s.push(_),h!==64){const m=c<<6&192|h;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class dg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ru=function(t){const e=Tu(t);return Oo.encodeByteArray(e,!0)},di=function(t){return Ru(t).replace(/\./g,"")},qr=function(t){try{return Oo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pg(t){return xu(void 0,t)}function xu(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!_g(n)||(t[n]=xu(t[n],e[n]));return t}function _g(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=()=>gg().__FIREBASE_DEFAULTS__,yg=()=>{if(typeof process>"u"||typeof ha>"u")return;const t=ha.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},vg=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&qr(t[1]);return e&&JSON.parse(e)},Au=()=>{try{return hg()||mg()||yg()||vg()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Eg=t=>{var e,n;return(n=(e=Au())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Cg=t=>{const e=Eg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Nu=()=>{var t;return(t=Au())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bg(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[di(JSON.stringify(n)),di(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wg(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Pu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(wg())}function Sg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ig(){return Iu.NODE_ADMIN===!0}function Tg(){try{return typeof indexedDB=="object"}catch{return!1}}function Rg(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xg="FirebaseError";class $s extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=xg,Object.setPrototypeOf(this,$s.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ou.prototype.create)}}class Ou{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Ag(r,s):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new $s(i,l,s)}}function Ag(t,e){return t.replace(Ng,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Ng=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(t){return JSON.parse(t)}function ge(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=Ss(qr(r[0])||""),n=Ss(qr(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Pg=function(t){const e=Du(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Og=function(t){const e=Du(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ln(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function fa(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function pi(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function _i(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(da(r)&&da(o)){if(!_i(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function da(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dg(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)s[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=l^r&(o^l),u=1518500249):(c=r^o^l,u=1859775393):h<60?(c=r&o|l&(r|o),u=2400959708):(c=r^o^l,u=3395469782);const f=(i<<5|i>>>27)+c+a+u+s[h]&4294967295;a=l,l=o,o=(r<<30|r>>>2)&4294967295,r=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Ki(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,S(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},zi=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(t){return t&&t._delegate?t._delegate:t}class Is{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Hs;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Bg(e))try{this.getOrInitializeService({instanceIdentifier:tn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tn){return this.instances.has(e)}getOptions(e=tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);s===l&&o.resolve(i)}return i}onInit(e,n){var s;const i=this.normalizeInstanceIdentifier(n),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Fg(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=tn){return this.component?this.component.multipleInstances?e:tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Fg(t){return t===tn?void 0:t}function Bg(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Lg(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var le;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(le||(le={}));const $g={debug:le.DEBUG,verbose:le.VERBOSE,info:le.INFO,warn:le.WARN,error:le.ERROR,silent:le.SILENT},Ug=le.INFO,Wg={[le.DEBUG]:"log",[le.VERBOSE]:"log",[le.INFO]:"info",[le.WARN]:"warn",[le.ERROR]:"error"},Vg=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=Wg[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ku{constructor(e){this.name=e,this._logLevel=Ug,this._logHandler=Vg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in le))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?$g[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,le.DEBUG,...e),this._logHandler(this,le.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,le.VERBOSE,...e),this._logHandler(this,le.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,le.INFO,...e),this._logHandler(this,le.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,le.WARN,...e),this._logHandler(this,le.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,le.ERROR,...e),this._logHandler(this,le.ERROR,...e)}}const jg=(t,e)=>e.some(n=>t instanceof n);let pa,_a;function Gg(){return pa||(pa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Kg(){return _a||(_a=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mu=new WeakMap,Yr=new WeakMap,Lu=new WeakMap,Er=new WeakMap,Do=new WeakMap;function zg(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Ft(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Mu.set(n,t)}).catch(()=>{}),Do.set(e,t),e}function qg(t){if(Yr.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Yr.set(t,e)}let Qr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Yr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Lu.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ft(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Yg(t){Qr=t(Qr)}function Qg(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Cr(this),e,...n);return Lu.set(s,e.sort?e.sort():[e]),Ft(s)}:Kg().includes(t)?function(...e){return t.apply(Cr(this),e),Ft(Mu.get(this))}:function(...e){return Ft(t.apply(Cr(this),e))}}function Jg(t){return typeof t=="function"?Qg(t):(t instanceof IDBTransaction&&qg(t),jg(t,Gg())?new Proxy(t,Qr):t)}function Ft(t){if(t instanceof IDBRequest)return zg(t);if(Er.has(t))return Er.get(t);const e=Jg(t);return e!==t&&(Er.set(t,e),Do.set(e,t)),e}const Cr=t=>Do.get(t);function Xg(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),l=Ft(o);return s&&o.addEventListener("upgradeneeded",a=>{s(Ft(o.result),a.oldVersion,a.newVersion,Ft(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{r&&a.addEventListener("close",()=>r()),i&&a.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const Zg=["get","getKey","getAll","getAllKeys","count"],em=["put","add","delete","clear"],br=new Map;function ga(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(br.get(e))return br.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=em.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Zg.includes(n)))return;const r=async function(o,...l){const a=this.transaction(o,i?"readwrite":"readonly");let c=a.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&a.done]))[0]};return br.set(e,r),r}Yg(t=>({...t,get:(e,n,s)=>ga(e,n)||t.get(e,n,s),has:(e,n)=>!!ga(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(nm(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function nm(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Jr="@firebase/app",ma="0.11.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=new ku("@firebase/app"),sm="@firebase/app-compat",im="@firebase/analytics-compat",rm="@firebase/analytics",om="@firebase/app-check-compat",lm="@firebase/app-check",am="@firebase/auth",cm="@firebase/auth-compat",um="@firebase/database",hm="@firebase/data-connect",fm="@firebase/database-compat",dm="@firebase/functions",pm="@firebase/functions-compat",_m="@firebase/installations",gm="@firebase/installations-compat",mm="@firebase/messaging",ym="@firebase/messaging-compat",vm="@firebase/performance",Em="@firebase/performance-compat",Cm="@firebase/remote-config",bm="@firebase/remote-config-compat",wm="@firebase/storage",Sm="@firebase/storage-compat",Im="@firebase/firestore",Tm="@firebase/vertexai",Rm="@firebase/firestore-compat",xm="firebase",Am="11.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr="[DEFAULT]",Nm={[Jr]:"fire-core",[sm]:"fire-core-compat",[rm]:"fire-analytics",[im]:"fire-analytics-compat",[lm]:"fire-app-check",[om]:"fire-app-check-compat",[am]:"fire-auth",[cm]:"fire-auth-compat",[um]:"fire-rtdb",[hm]:"fire-data-connect",[fm]:"fire-rtdb-compat",[dm]:"fire-fn",[pm]:"fire-fn-compat",[_m]:"fire-iid",[gm]:"fire-iid-compat",[mm]:"fire-fcm",[ym]:"fire-fcm-compat",[vm]:"fire-perf",[Em]:"fire-perf-compat",[Cm]:"fire-rc",[bm]:"fire-rc-compat",[wm]:"fire-gcs",[Sm]:"fire-gcs-compat",[Im]:"fire-fst",[Rm]:"fire-fst-compat",[Tm]:"fire-vertex","fire-js":"fire-js",[xm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi=new Map,Pm=new Map,Zr=new Map;function ya(t,e){try{t.container.addComponent(e)}catch(n){St.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function mi(t){const e=t.name;if(Zr.has(e))return St.debug(`There were multiple attempts to register component ${e}.`),!1;Zr.set(e,t);for(const n of gi.values())ya(n,t);for(const n of Pm.values())ya(n,t);return!0}function Om(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Dm(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const km={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Bt=new Ou("app","Firebase",km);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Is("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Bt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm=Am;function Fu(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Xr,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw Bt.create("bad-app-name",{appName:String(i)});if(n||(n=Nu()),!n)throw Bt.create("no-options");const r=gi.get(i);if(r){if(_i(n,r.options)&&_i(s,r.config))return r;throw Bt.create("duplicate-app",{appName:i})}const o=new Hg(i);for(const a of Zr.values())o.addComponent(a);const l=new Mm(n,s,o);return gi.set(i,l),l}function Fm(t=Xr){const e=gi.get(t);if(!e&&t===Xr&&Nu())return Fu();if(!e)throw Bt.create("no-app",{appName:t});return e}function Nn(t,e,n){var s;let i=(s=Nm[t])!==null&&s!==void 0?s:t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${i}" with version "${e}":`];r&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),St.warn(l.join(" "));return}mi(new Is(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bm="firebase-heartbeat-database",Hm=1,Ts="firebase-heartbeat-store";let wr=null;function Bu(){return wr||(wr=Xg(Bm,Hm,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ts)}catch(n){console.warn(n)}}}}).catch(t=>{throw Bt.create("idb-open",{originalErrorMessage:t.message})})),wr}async function $m(t){try{const n=(await Bu()).transaction(Ts),s=await n.objectStore(Ts).get(Hu(t));return await n.done,s}catch(e){if(e instanceof $s)St.warn(e.message);else{const n=Bt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});St.warn(n.message)}}}async function va(t,e){try{const s=(await Bu()).transaction(Ts,"readwrite");await s.objectStore(Ts).put(e,Hu(t)),await s.done}catch(n){if(n instanceof $s)St.warn(n.message);else{const s=Bt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});St.warn(s.message)}}}function Hu(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um=1024,Wm=30;class Vm{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Gm(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ea();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>Wm){const o=Km(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){St.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ea(),{heartbeatsToSend:s,unsentEntries:i}=jm(this._heartbeatsCache.heartbeats),r=di(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return St.warn(n),""}}}function Ea(){return new Date().toISOString().substring(0,10)}function jm(t,e=Um){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Ca(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ca(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Gm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Tg()?Rg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await $m(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return va(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return va(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ca(t){return di(JSON.stringify({version:2,heartbeats:t})).length}function Km(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zm(t){mi(new Is("platform-logger",e=>new tm(e),"PRIVATE")),mi(new Is("heartbeat",e=>new Vm(e),"PRIVATE")),Nn(Jr,ma,t),Nn(Jr,ma,"esm2017"),Nn("fire-js","")}zm("");var ba={};const wa="@firebase/database",Sa="1.0.14";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $u="";function qm(t){$u=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ge(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ss(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return _t(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ym(e)}}catch{}return new Qm},sn=Uu("localStorage"),Jm=Uu("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=new ku("@firebase/database"),Xm=function(){let t=1;return function(){return t++}}(),Wu=function(t){const e=Mg(t),n=new kg;n.update(e);const s=n.digest();return Oo.encodeByteArray(s)},Us=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Us.apply(null,s):typeof s=="object"?e+=ge(s):e+=s,e+=" "}return e};let hs=null,Ia=!0;const Zm=function(t,e){S(!0,"Can't turn on custom loggers persistently."),Pn.logLevel=le.VERBOSE,hs=Pn.log.bind(Pn)},Ce=function(...t){if(Ia===!0&&(Ia=!1,hs===null&&Jm.get("logging_enabled")===!0&&Zm()),hs){const e=Us.apply(null,t);hs(e)}},Ws=function(t){return function(...e){Ce(t,...e)}},eo=function(...t){const e="FIREBASE INTERNAL ERROR: "+Us(...t);Pn.error(e)},It=function(...t){const e=`FIREBASE FATAL ERROR: ${Us(...t)}`;throw Pn.error(e),new Error(e)},Oe=function(...t){const e="FIREBASE WARNING: "+Us(...t);Pn.warn(e)},ey=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Oe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ko=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},ty=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Fn="[MIN_NAME]",an="[MAX_NAME]",fn=function(t,e){if(t===e)return 0;if(t===Fn||e===an)return-1;if(e===Fn||t===an)return 1;{const n=Ta(t),s=Ta(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},ny=function(t,e){return t===e?0:t<e?-1:1},Jn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ge(e))},Mo=function(t){if(typeof t!="object"||t===null)return ge(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ge(e[s]),n+=":",n+=Mo(t[e[s]]);return n+="}",n},Vu=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function we(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ju=function(t){S(!ko(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,l,a;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=l+s,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(a=0;a<64;a+=8){let f=parseInt(u.substr(a,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},sy=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},iy=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function ry(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const oy=new RegExp("^-?(0*)\\d{1,10}$"),ly=-2147483648,ay=2147483647,Ta=function(t){if(oy.test(t)){const e=Number(t);if(e>=ly&&e<=ay)return e}return null},Vn=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Oe("Exception was thrown by user callback.",n),e},Math.floor(0))}},cy=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},fs=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Dm(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Oe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ce("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Oe(e)}}class si{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}si.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="5",Gu="v",Ku="s",zu="r",qu="f",Yu=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Qu="ls",Ju="p",to="ac",Xu="websocket",Zu="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e,n,s,i,r=!1,o="",l=!1,a=!1,c=null){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=sn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&sn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function fy(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function th(t,e,n){S(typeof e=="string","typeof type must == string"),S(typeof n=="object","typeof params must == object");let s;if(e===Xu)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Zu)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);fy(t)&&(n.ns=t.namespace);const i=[];return we(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dy{constructor(){this.counters_={}}incrementCounter(e,n=1){_t(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return pg(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr={},Ir={};function Fo(t){const e=t.toString();return Sr[e]||(Sr[e]=new dy),Sr[e]}function py(t,e){const n=t.toString();return Ir[n]||(Ir[n]=e()),Ir[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _y{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Vn(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra="start",gy="close",my="pLPCommand",yy="pRTLPCB",nh="id",sh="pw",ih="ser",vy="cb",Ey="seg",Cy="ts",by="d",wy="dframe",rh=1870,oh=30,Sy=rh-oh,Iy=25e3,Ty=3e4;class bn{constructor(e,n,s,i,r,o,l){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ws(e),this.stats_=Fo(n),this.urlFn=a=>(this.appCheckToken&&(a[to]=this.appCheckToken),th(n,Zu,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new _y(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ty)),ty(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Bo((...r)=>{const[o,l,a,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ra)this.id=l,this.password=a;else if(o===gy)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ra]="t",s[ih]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[vy]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Gu]=Lo,this.transportSessionId&&(s[Ku]=this.transportSessionId),this.lastSessionId&&(s[Qu]=this.lastSessionId),this.applicationId&&(s[Ju]=this.applicationId),this.appCheckToken&&(s[to]=this.appCheckToken),typeof location<"u"&&location.hostname&&Yu.test(location.hostname)&&(s[zu]=qu);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){bn.forceAllow_=!0}static forceDisallow(){bn.forceDisallow_=!0}static isAvailable(){return bn.forceAllow_?!0:!bn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!sy()&&!iy()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ge(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Ru(n),i=Vu(s,Sy);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[wy]="t",s[nh]=e,s[sh]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ge(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Bo{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Xm(),window[my+this.uniqueCallbackIdentifier]=e,window[yy+this.uniqueCallbackIdentifier]=n,this.myIFrame=Bo.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ce("frame writing exception"),l.stack&&Ce(l.stack),Ce(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ce("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[nh]=this.myID,e[sh]=this.myPW,e[ih]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+oh+s.length<=rh;){const o=this.pendingSegs.shift();s=s+"&"+Ey+i+"="+o.seg+"&"+Cy+i+"="+o.ts+"&"+by+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(Iy)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Ce("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ry=16384,xy=45e3;let yi=null;typeof MozWebSocket<"u"?yi=MozWebSocket:typeof WebSocket<"u"&&(yi=WebSocket);class Je{constructor(e,n,s,i,r,o,l){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ws(this.connId),this.stats_=Fo(n),this.connURL=Je.connectionURL_(n,o,l,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[Gu]=Lo,typeof location<"u"&&location.hostname&&Yu.test(location.hostname)&&(o[zu]=qu),n&&(o[Ku]=n),s&&(o[Qu]=s),i&&(o[to]=i),r&&(o[Ju]=r),th(e,Xu,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,sn.set("previous_websocket_failure",!0);try{let s;Ig(),this.mySock=new yi(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Je.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&yi!==null&&!Je.forceDisallow_}static previouslyFailed(){return sn.isInMemoryStorage||sn.get("previous_websocket_failure")===!0}markConnectionHealthy(){sn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Ss(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(S(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ge(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Vu(n,Ry);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(xy))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Je.responsesRequiredToBeHealthy=2;Je.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{static get ALL_TRANSPORTS(){return[bn,Je]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Je&&Je.isAvailable();let s=n&&!Je.previouslyFailed();if(e.webSocketOnly&&(n||Oe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Je];else{const i=this.transports_=[];for(const r of Rs.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Rs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Rs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay=6e4,Ny=5e3,Py=10*1024,Oy=100*1024,Tr="t",xa="d",Dy="s",Aa="r",ky="e",Na="o",Pa="a",Oa="n",Da="p",My="h";class Ly{constructor(e,n,s,i,r,o,l,a,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ws("c:"+this.id+":"),this.transportManager_=new Rs(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=fs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Oy?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Py?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Tr in e){const n=e[Tr];n===Pa?this.upgradeIfSecondaryHealthy_():n===Aa?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Na&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Jn("t",e),s=Jn("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Da,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Pa,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Oa,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Jn("t",e),s=Jn("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Jn(Tr,e);if(xa in e){const s=e[xa];if(n===My){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Oa){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Dy?this.onConnectionShutdown_(s):n===Aa?this.onReset_(s):n===ky?eo("Server Error: "+s):n===Na?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):eo("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Lo!==s&&Oe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),fs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Ay))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):fs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Ny))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Da,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(sn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e){this.allowedEvents_=e,this.listeners_={},S(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){S(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends ah{static getInstance(){return new vi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Pu()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return S(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ka=32,Ma=768;class ee{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function z(){return new ee("")}function V(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Wt(t){return t.pieces_.length-t.pieceNum_}function ae(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new ee(t.pieces_,e)}function Ho(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Fy(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function xs(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function ch(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new ee(e,0)}function he(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof ee)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new ee(n,0)}function G(t){return t.pieceNum_>=t.pieces_.length}function Pe(t,e){const n=V(t),s=V(e);if(n===null)return e;if(n===s)return Pe(ae(t),ae(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function By(t,e){const n=xs(t,0),s=xs(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=fn(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function $o(t,e){if(Wt(t)!==Wt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Ke(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Wt(t)>Wt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Hy{constructor(e,n){this.errorPrefix_=n,this.parts_=xs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=zi(this.parts_[s]);uh(this)}}function $y(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=zi(e),uh(t)}function Uy(t){const e=t.parts_.pop();t.byteLength_-=zi(e),t.parts_.length>0&&(t.byteLength_-=1)}function uh(t){if(t.byteLength_>Ma)throw new Error(t.errorPrefix_+"has a key path longer than "+Ma+" bytes ("+t.byteLength_+").");if(t.parts_.length>ka)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ka+") or object contains a cycle "+nn(t))}function nn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo extends ah{static getInstance(){return new Uo}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return S(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=1e3,Wy=60*5*1e3,La=30*1e3,Vy=1.3,jy=3e4,Gy="server_kill",Fa=3;class wt extends lh{constructor(e,n,s,i,r,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=wt.nextPersistentConnectionId_++,this.log_=Ws("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Xn,this.maxReconnectDelay_=Wy,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Uo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&vi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(ge(r)),S(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new Hs,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),S(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const a=l.d,c=l.s;wt.warnOnListenWarnings_(a,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&_t(e,"w")){const s=Ln(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Oe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Og(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=La)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Pg(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ge(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):eo("Unrecognized action received from server: "+ge(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){S(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Xn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Xn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>jy&&(this.reconnectDelay_=Xn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Vy)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+wt.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,s())},c=function(h){S(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(h)};this.realtime_={close:a,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Ce("getToken() completed but was canceled"):(Ce("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,l=new Ly(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,_=>{Oe(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(Gy)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Oe(h),a())}}}interrupt(e){Ce("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ce("Resuming connection for reason: "+e),delete this.interruptReasons_[e],fa(this.interruptReasons_)&&(this.reconnectDelay_=Xn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>Mo(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new ee(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){Ce("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Fa&&(this.reconnectDelay_=La,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ce("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Fa&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+$u.replace(/\./g,"-")]=1,Pu()?e["framework.cordova"]=1:Sg()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=vi.getInstance().currentlyOnline();return fa(this.interruptReasons_)&&e}}wt.nextPersistentConnectionId_=0;wt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new j(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new j(Fn,e),i=new j(Fn,n);return this.compare(s,i)!==0}minPost(){return j.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Js;class hh extends qi{static get __EMPTY_NODE(){return Js}static set __EMPTY_NODE(e){Js=e}compare(e,n){return fn(e.name,n.name)}isDefinedOn(e){throw Wn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return j.MIN}maxPost(){return new j(an,Js)}makePost(e,n){return S(typeof e=="string","KeyIndex indexValue must always be a string."),new j(e,Js)}toString(){return".key"}}const On=new hh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ve{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??ve.RED,this.left=i??Me.EMPTY_NODE,this.right=r??Me.EMPTY_NODE}copy(e,n,s,i,r){return new ve(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Me.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Me.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ve.RED=!0;ve.BLACK=!1;class Ky{copy(e,n,s,i,r){return this}insert(e,n,s){return new ve(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Me{constructor(e,n=Me.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Me(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ve.BLACK,null,null))}remove(e){return new Me(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ve.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Xs(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Xs(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Xs(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Xs(this.root_,null,this.comparator_,!0,e)}}Me.EMPTY_NODE=new Ky;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(t,e){return fn(t.name,e.name)}function Wo(t,e){return fn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let no;function qy(t){no=t}const fh=function(t){return typeof t=="number"?"number:"+ju(t):"string:"+t},dh=function(t){if(t.isLeafNode()){const e=t.val();S(typeof e=="string"||typeof e=="number"||typeof e=="object"&&_t(e,".sv"),"Priority must be a string or number.")}else S(t===no||t.isEmpty(),"priority of unexpected type.");S(t===no||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ba;class ye{static set __childrenNodeConstructor(e){Ba=e}static get __childrenNodeConstructor(){return Ba}constructor(e,n=ye.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,S(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),dh(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ye(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ye.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return G(e)?this:V(e)===".priority"?this.priorityNode_:ye.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:ye.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=V(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(S(s!==".priority"||Wt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,ye.__childrenNodeConstructor.EMPTY_NODE.updateChild(ae(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+fh(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ju(this.value_):e+=this.value_,this.lazyHash_=Wu(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ye.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ye.__childrenNodeConstructor?-1:(S(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=ye.VALUE_TYPE_ORDER.indexOf(n),r=ye.VALUE_TYPE_ORDER.indexOf(s);return S(i>=0,"Unknown leaf type: "+n),S(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}ye.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ph,_h;function Yy(t){ph=t}function Qy(t){_h=t}class Jy extends qi{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return j.MIN}maxPost(){return new j(an,new ye("[PRIORITY-POST]",_h))}makePost(e,n){const s=ph(e);return new j(n,new ye("[PRIORITY-POST]",s))}toString(){return".priority"}}const fe=new Jy;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xy=Math.log(2);class Zy{constructor(e){const n=r=>parseInt(Math.log(r)/Xy,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ei=function(t,e,n,s){t.sort(e);const i=function(a,c){const u=c-a;let h,f;if(u===0)return null;if(u===1)return h=t[a],f=n?n(h):h,new ve(f,h.node,ve.BLACK,null,null);{const _=parseInt(u/2,10)+a,m=i(a,_),w=i(_+1,c);return h=t[_],f=n?n(h):h,new ve(f,h.node,ve.BLACK,m,w)}},r=function(a){let c=null,u=null,h=t.length;const f=function(m,w){const D=h-m,k=h;h-=m;const P=i(D+1,k),L=t[D],O=n?n(L):L;_(new ve(O,L.node,w,null,P))},_=function(m){c?(c.left=m,c=m):(u=m,c=m)};for(let m=0;m<a.count;++m){const w=a.nextBitIsOne(),D=Math.pow(2,a.count-(m+1));w?f(D,ve.BLACK):(f(D,ve.BLACK),f(D,ve.RED))}return u},o=new Zy(t.length),l=r(o);return new Me(s||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rr;const yn={};class bt{static get Default(){return S(yn&&fe,"ChildrenNode.ts has not been loaded"),Rr=Rr||new bt({".priority":yn},{".priority":fe}),Rr}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Ln(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Me?n:null}hasIndex(e){return _t(this.indexSet_,e.toString())}addIndex(e,n){S(e!==On,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(j.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let l;i?l=Ei(s,e.getCompare()):l=yn;const a=e.toString(),c=Object.assign({},this.indexSet_);c[a]=e;const u=Object.assign({},this.indexes_);return u[a]=l,new bt(u,c)}addToIndexes(e,n){const s=pi(this.indexes_,(i,r)=>{const o=Ln(this.indexSet_,r);if(S(o,"Missing index implementation for "+r),i===yn)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(j.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),Ei(l,o.getCompare())}else return yn;else{const l=n.get(e.name);let a=i;return l&&(a=a.remove(new j(e.name,l))),a.insert(e,e.node)}});return new bt(s,this.indexSet_)}removeFromIndexes(e,n){const s=pi(this.indexes_,i=>{if(i===yn)return i;{const r=n.get(e.name);return r?i.remove(new j(e.name,r)):i}});return new bt(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zn;class H{static get EMPTY_NODE(){return Zn||(Zn=new H(new Me(Wo),null,bt.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&dh(this.priorityNode_),this.children_.isEmpty()&&S(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Zn}updatePriority(e){return this.children_.isEmpty()?this:new H(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Zn:n}}getChild(e){const n=V(e);return n===null?this:this.getImmediateChild(n).getChild(ae(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(S(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new j(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?Zn:this.priorityNode_;return new H(i,o,r)}}updateChild(e,n){const s=V(e);if(s===null)return n;{S(V(e)!==".priority"||Wt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(ae(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(fe,(o,l)=>{n[o]=l.val(e),s++,r&&H.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+fh(this.getPriority().val())+":"),this.forEachChild(fe,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Wu(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new j(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new j(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new j(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,j.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,j.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Vs?-1:0}withIndex(e){if(e===On||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new H(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===On||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(fe),i=n.getIterator(fe);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===On?null:this.indexMap_.get(e.toString())}}H.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ev extends H{constructor(){super(new Me(Wo),H.EMPTY_NODE,bt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return H.EMPTY_NODE}isEmpty(){return!1}}const Vs=new ev;Object.defineProperties(j,{MIN:{value:new j(Fn,H.EMPTY_NODE)},MAX:{value:new j(an,Vs)}});hh.__EMPTY_NODE=H.EMPTY_NODE;ye.__childrenNodeConstructor=H;qy(Vs);Qy(Vs);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tv=!0;function _e(t,e=null){if(t===null)return H.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),S(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new ye(n,_e(e))}if(!(t instanceof Array)&&tv){const n=[];let s=!1;if(we(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=_e(l);a.isEmpty()||(s=s||!a.getPriority().isEmpty(),n.push(new j(o,a)))}}),n.length===0)return H.EMPTY_NODE;const r=Ei(n,zy,o=>o.name,Wo);if(s){const o=Ei(n,fe.getCompare());return new H(r,_e(e),new bt({".priority":o},{".priority":fe}))}else return new H(r,_e(e),bt.Default)}else{let n=H.EMPTY_NODE;return we(t,(s,i)=>{if(_t(t,s)&&s.substring(0,1)!=="."){const r=_e(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(_e(e))}}Yy(_e);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv extends qi{constructor(e){super(),this.indexPath_=e,S(!G(e)&&V(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}makePost(e,n){const s=_e(e),i=H.EMPTY_NODE.updateChild(this.indexPath_,s);return new j(n,i)}maxPost(){const e=H.EMPTY_NODE.updateChild(this.indexPath_,Vs);return new j(an,e)}toString(){return xs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv extends qi{compare(e,n){const s=e.node.compareTo(n.node);return s===0?fn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return j.MIN}maxPost(){return j.MAX}makePost(e,n){const s=_e(e);return new j(n,s)}toString(){return".value"}}const iv=new sv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gh(t){return{type:"value",snapshotNode:t}}function Bn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function As(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ns(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function rv(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){S(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(s.getChild(i))&&l.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(As(n,l)):S(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Bn(n,s)):o.trackChildChange(Ns(n,s,l))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(fe,(i,r)=>{n.hasChild(i)||s.trackChildChange(As(i,r))}),n.isLeafNode()||n.forEachChild(fe,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Ns(i,r,o))}else s.trackChildChange(Bn(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?H.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this.indexedFilter_=new Vo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ps.getStartPost_(e),this.endPost_=Ps.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new j(n,s))||(s=H.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=H.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(H.EMPTY_NODE);const r=this;return n.forEachChild(fe,(o,l)=>{r.matches(new j(o,l))||(i=i.updateImmediateChild(o,H.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Ps(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new j(n,s))||(s=H.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=H.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=H.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(H.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,H.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,_)=>h(_,f)}else o=this.index_.getCompare();const l=e;S(l.numChildren()===this.limit_,"");const a=new j(n,s),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),u=this.rangedFilter_.matches(a);if(l.hasChild(n)){const h=l.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||l.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const _=f==null?1:o(f,a);if(u&&!s.isEmpty()&&_>=0)return r!=null&&r.trackChildChange(Ns(n,s,h)),l.updateImmediateChild(n,s);{r!=null&&r.trackChildChange(As(n,h));const w=l.updateImmediateChild(n,H.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r!=null&&r.trackChildChange(Bn(f.name,f.node)),w.updateImmediateChild(f.name,f.node)):w}}else return s.isEmpty()?e:u&&o(c,a)>=0?(r!=null&&(r.trackChildChange(As(c.name,c.node)),r.trackChildChange(Bn(n,s))),l.updateImmediateChild(n,s).updateImmediateChild(c.name,H.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=fe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return S(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return S(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Fn}hasEnd(){return this.endSet_}getIndexEndValue(){return S(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return S(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:an}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return S(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===fe}copy(){const e=new jo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function lv(t){return t.loadsAllData()?new Vo(t.getIndex()):t.hasLimit()?new ov(t):new Ps(t)}function Ha(t){const e={};if(t.isDefault())return e;let n;if(t.index_===fe?n="$priority":t.index_===iv?n="$value":t.index_===On?n="$key":(S(t.index_ instanceof nv,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ge(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ge(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ge(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ge(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ge(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function $a(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==fe&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci extends lh{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(S(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Ws("p:rest:"),this.listens_={}}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ci.getListenId_(e,s),l={};this.listens_[o]=l;const a=Ha(e._queryParams);this.restRequest_(r+".json",a,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Ln(this.listens_,o)===l){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const s=Ci.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Ha(e._queryParams),s=e._path.toString(),i=new Hs;return this.restRequest_(s+".json",n,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(s,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Dg(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(s&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=Ss(l.responseText)}catch{Oe("Failed to parse JSON response for "+o+": "+l.responseText)}s(null,a)}else l.status!==401&&l.status!==404&&Oe("Got unsuccessful REST response for "+o+" Status: "+l.status),s(l.status);s=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(){this.rootNode_=H.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(){return{value:null,children:new Map}}function mh(t,e,n){if(G(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=V(e);t.children.has(s)||t.children.set(s,bi());const i=t.children.get(s);e=ae(e),mh(i,e,n)}}function so(t,e,n){t.value!==null?n(e,t.value):cv(t,(s,i)=>{const r=new ee(e.toString()+"/"+s);so(i,r,n)})}function cv(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&we(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua=10*1e3,hv=30*1e3,fv=5*60*1e3;class dv{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new uv(e);const s=Ua+(hv-Ua)*Math.random();fs(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;we(e,(i,r)=>{r>0&&_t(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),fs(this.reportStats_.bind(this),Math.floor(Math.random()*2*fv))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xe;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Xe||(Xe={}));function Go(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ko(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function zo(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Xe.ACK_USER_WRITE,this.source=Go()}operationForChild(e){if(G(this.path)){if(this.affectedTree.value!=null)return S(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ee(e));return new wi(z(),n,this.revert)}}else return S(V(this.path)===e,"operationForChild called for unrelated child."),new wi(ae(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,n){this.source=e,this.path=n,this.type=Xe.LISTEN_COMPLETE}operationForChild(e){return G(this.path)?new Os(this.source,z()):new Os(this.source,ae(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Xe.OVERWRITE}operationForChild(e){return G(this.path)?new cn(this.source,z(),this.snap.getImmediateChild(e)):new cn(this.source,ae(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Xe.MERGE}operationForChild(e){if(G(this.path)){const n=this.children.subtree(new ee(e));return n.isEmpty()?null:n.value?new cn(this.source,z(),n.value):new Hn(this.source,z(),n)}else return S(V(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Hn(this.source,ae(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(G(e))return this.isFullyInitialized()&&!this.filtered_;const n=V(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function _v(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(rv(o.childName,o.snapshotNode))}),es(t,i,"child_removed",e,s,n),es(t,i,"child_added",e,s,n),es(t,i,"child_moved",r,s,n),es(t,i,"child_changed",e,s,n),es(t,i,"value",e,s,n),i}function es(t,e,n,s,i,r){const o=s.filter(l=>l.type===n);o.sort((l,a)=>mv(t,l,a)),o.forEach(l=>{const a=gv(t,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function gv(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function mv(t,e,n){if(e.childName==null||n.childName==null)throw Wn("Should only compare child_ events.");const s=new j(e.childName,e.snapshotNode),i=new j(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(t,e){return{eventCache:t,serverCache:e}}function ds(t,e,n,s){return Yi(new Vt(e,n,s),t.serverCache)}function yh(t,e,n,s){return Yi(t.eventCache,new Vt(e,n,s))}function Si(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function un(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xr;const yv=()=>(xr||(xr=new Me(ny)),xr);class oe{static fromObject(e){let n=new oe(null);return we(e,(s,i)=>{n=n.set(new ee(s),i)}),n}constructor(e,n=yv()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:z(),value:this.value};if(G(e))return null;{const s=V(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(ae(e),n);return r!=null?{path:he(new ee(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(G(e))return this;{const n=V(e),s=this.children.get(n);return s!==null?s.subtree(ae(e)):new oe(null)}}set(e,n){if(G(e))return new oe(n,this.children);{const s=V(e),r=(this.children.get(s)||new oe(null)).set(ae(e),n),o=this.children.insert(s,r);return new oe(this.value,o)}}remove(e){if(G(e))return this.children.isEmpty()?new oe(null):new oe(null,this.children);{const n=V(e),s=this.children.get(n);if(s){const i=s.remove(ae(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new oe(null):new oe(this.value,r)}else return this}}get(e){if(G(e))return this.value;{const n=V(e),s=this.children.get(n);return s?s.get(ae(e)):null}}setTree(e,n){if(G(e))return n;{const s=V(e),r=(this.children.get(s)||new oe(null)).setTree(ae(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new oe(this.value,o)}}fold(e){return this.fold_(z(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(he(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,z(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(G(e))return null;{const r=V(e),o=this.children.get(r);return o?o.findOnPath_(ae(e),he(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,z(),n)}foreachOnPath_(e,n,s){if(G(e))return this;{this.value&&s(n,this.value);const i=V(e),r=this.children.get(i);return r?r.foreachOnPath_(ae(e),he(n,i),s):new oe(null)}}foreach(e){this.foreach_(z(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(he(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.writeTree_=e}static empty(){return new et(new oe(null))}}function ps(t,e,n){if(G(e))return new et(new oe(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=Pe(i,e);return r=r.updateChild(o,n),new et(t.writeTree_.set(i,r))}else{const i=new oe(n),r=t.writeTree_.setTree(e,i);return new et(r)}}}function io(t,e,n){let s=t;return we(n,(i,r)=>{s=ps(s,he(e,i),r)}),s}function Wa(t,e){if(G(e))return et.empty();{const n=t.writeTree_.setTree(e,new oe(null));return new et(n)}}function ro(t,e){return dn(t,e)!=null}function dn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Pe(n.path,e)):null}function Va(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(fe,(s,i)=>{e.push(new j(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new j(s,i.value))}),e}function Ht(t,e){if(G(e))return t;{const n=dn(t,e);return n!=null?new et(new oe(n)):new et(t.writeTree_.subtree(e))}}function oo(t){return t.writeTree_.isEmpty()}function $n(t,e){return vh(z(),t.writeTree_,e)}function vh(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(S(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=vh(he(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(he(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(t,e){return wh(e,t)}function vv(t,e,n,s,i){S(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=ps(t.visibleWrites,e,n)),t.lastWriteId=s}function Ev(t,e,n,s){S(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=io(t.visibleWrites,e,n),t.lastWriteId=s}function Cv(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function bv(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);S(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&wv(l,s.path)?i=!1:Ke(s.path,l.path)&&(r=!0)),o--}if(i){if(r)return Sv(t),!0;if(s.snap)t.visibleWrites=Wa(t.visibleWrites,s.path);else{const l=s.children;we(l,a=>{t.visibleWrites=Wa(t.visibleWrites,he(s.path,a))})}return!0}else return!1}function wv(t,e){if(t.snap)return Ke(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ke(he(t.path,n),e))return!0;return!1}function Sv(t){t.visibleWrites=Eh(t.allWrites,Iv,z()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Iv(t){return t.visible}function Eh(t,e,n){let s=et.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let l;if(r.snap)Ke(n,o)?(l=Pe(n,o),s=ps(s,l,r.snap)):Ke(o,n)&&(l=Pe(o,n),s=ps(s,z(),r.snap.getChild(l)));else if(r.children){if(Ke(n,o))l=Pe(n,o),s=io(s,l,r.children);else if(Ke(o,n))if(l=Pe(o,n),G(l))s=io(s,z(),r.children);else{const a=Ln(r.children,V(l));if(a){const c=a.getChild(ae(l));s=ps(s,z(),c)}}}else throw Wn("WriteRecord should have .snap or .children")}}return s}function Ch(t,e,n,s,i){if(!s&&!i){const r=dn(t.visibleWrites,e);if(r!=null)return r;{const o=Ht(t.visibleWrites,e);if(oo(o))return n;if(n==null&&!ro(o,z()))return null;{const l=n||H.EMPTY_NODE;return $n(o,l)}}}else{const r=Ht(t.visibleWrites,e);if(!i&&oo(r))return n;if(!i&&n==null&&!ro(r,z()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(Ke(c.path,e)||Ke(e,c.path))},l=Eh(t.allWrites,o,e),a=n||H.EMPTY_NODE;return $n(l,a)}}}function Tv(t,e,n){let s=H.EMPTY_NODE;const i=dn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(fe,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=Ht(t.visibleWrites,e);return n.forEachChild(fe,(o,l)=>{const a=$n(Ht(r,new ee(o)),l);s=s.updateImmediateChild(o,a)}),Va(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Ht(t.visibleWrites,e);return Va(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Rv(t,e,n,s,i){S(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=he(e,n);if(ro(t.visibleWrites,r))return null;{const o=Ht(t.visibleWrites,r);return oo(o)?i.getChild(n):$n(o,i.getChild(n))}}function xv(t,e,n,s){const i=he(e,n),r=dn(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=Ht(t.visibleWrites,i);return $n(o,s.getNode().getImmediateChild(n))}else return null}function Av(t,e){return dn(t.visibleWrites,e)}function Nv(t,e,n,s,i,r,o){let l;const a=Ht(t.visibleWrites,e),c=dn(a,z());if(c!=null)l=c;else if(n!=null)l=$n(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const u=[],h=o.getCompare(),f=r?l.getReverseIteratorFrom(s,o):l.getIteratorFrom(s,o);let _=f.getNext();for(;_&&u.length<i;)h(_,s)!==0&&u.push(_),_=f.getNext();return u}else return[]}function Pv(){return{visibleWrites:et.empty(),allWrites:[],lastWriteId:-1}}function Ii(t,e,n,s){return Ch(t.writeTree,t.treePath,e,n,s)}function qo(t,e){return Tv(t.writeTree,t.treePath,e)}function ja(t,e,n,s){return Rv(t.writeTree,t.treePath,e,n,s)}function Ti(t,e){return Av(t.writeTree,he(t.treePath,e))}function Ov(t,e,n,s,i,r){return Nv(t.writeTree,t.treePath,e,n,s,i,r)}function Yo(t,e,n){return xv(t.writeTree,t.treePath,e,n)}function bh(t,e){return wh(he(t.treePath,e),t.writeTree)}function wh(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dv{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;S(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),S(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,Ns(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,As(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Bn(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,Ns(s,e.snapshotNode,i.oldSnap));else throw Wn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Sh=new kv;class Qo{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Vt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Yo(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:un(this.viewCache_),r=Ov(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mv(t){return{filter:t}}function Lv(t,e){S(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),S(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Fv(t,e,n,s,i){const r=new Dv;let o,l;if(n.type===Xe.OVERWRITE){const c=n;c.source.fromUser?o=lo(t,e,c.path,c.snap,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!G(c.path),o=Ri(t,e,c.path,c.snap,s,i,l,r))}else if(n.type===Xe.MERGE){const c=n;c.source.fromUser?o=Hv(t,e,c.path,c.children,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=ao(t,e,c.path,c.children,s,i,l,r))}else if(n.type===Xe.ACK_USER_WRITE){const c=n;c.revert?o=Wv(t,e,c.path,s,i,r):o=$v(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===Xe.LISTEN_COMPLETE)o=Uv(t,e,n.path,s,r);else throw Wn("Unknown operation type: "+n.type);const a=r.getChanges();return Bv(e,o,a),{viewCache:o,changes:a}}function Bv(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Si(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(gh(Si(e)))}}function Ih(t,e,n,s,i,r){const o=e.eventCache;if(Ti(s,n)!=null)return e;{let l,a;if(G(n))if(S(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=un(e),u=c instanceof H?c:H.EMPTY_NODE,h=qo(s,u);l=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Ii(s,un(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=V(n);if(c===".priority"){S(Wt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();a=e.serverCache.getNode();const h=ja(s,n,u,a);h!=null?l=t.filter.updatePriority(u,h):l=o.getNode()}else{const u=ae(n);let h;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const f=ja(s,n,o.getNode(),a);f!=null?h=o.getNode().getImmediateChild(c).updateChild(u,f):h=o.getNode().getImmediateChild(c)}else h=Yo(s,c,e.serverCache);h!=null?l=t.filter.updateChild(o.getNode(),c,h,u,i,r):l=o.getNode()}}return ds(e,l,o.isFullyInitialized()||G(n),t.filter.filtersNodes())}}function Ri(t,e,n,s,i,r,o,l){const a=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(G(n))c=u.updateFullNode(a.getNode(),s,null);else if(u.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,s);c=u.updateFullNode(a.getNode(),_,null)}else{const _=V(n);if(!a.isCompleteForPath(n)&&Wt(n)>1)return e;const m=ae(n),D=a.getNode().getImmediateChild(_).updateChild(m,s);_===".priority"?c=u.updatePriority(a.getNode(),D):c=u.updateChild(a.getNode(),_,D,m,Sh,null)}const h=yh(e,c,a.isFullyInitialized()||G(n),u.filtersNodes()),f=new Qo(i,h,r);return Ih(t,h,n,i,f,l)}function lo(t,e,n,s,i,r,o){const l=e.eventCache;let a,c;const u=new Qo(i,e,r);if(G(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),a=ds(e,c,!0,t.filter.filtersNodes());else{const h=V(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),a=ds(e,c,l.isFullyInitialized(),l.isFiltered());else{const f=ae(n),_=l.getNode().getImmediateChild(h);let m;if(G(f))m=s;else{const w=u.getCompleteChild(h);w!=null?Ho(f)===".priority"&&w.getChild(ch(f)).isEmpty()?m=w:m=w.updateChild(f,s):m=H.EMPTY_NODE}if(_.equals(m))a=e;else{const w=t.filter.updateChild(l.getNode(),h,m,f,u,o);a=ds(e,w,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function Ga(t,e){return t.eventCache.isCompleteForChild(e)}function Hv(t,e,n,s,i,r,o){let l=e;return s.foreach((a,c)=>{const u=he(n,a);Ga(e,V(u))&&(l=lo(t,l,u,c,i,r,o))}),s.foreach((a,c)=>{const u=he(n,a);Ga(e,V(u))||(l=lo(t,l,u,c,i,r,o))}),l}function Ka(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function ao(t,e,n,s,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;G(n)?c=s:c=new oe(null).setTree(n,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(u.hasChild(h)){const _=e.serverCache.getNode().getImmediateChild(h),m=Ka(t,_,f);a=Ri(t,a,new ee(h),m,i,r,o,l)}}),c.children.inorderTraversal((h,f)=>{const _=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!u.hasChild(h)&&!_){const m=e.serverCache.getNode().getImmediateChild(h),w=Ka(t,m,f);a=Ri(t,a,new ee(h),w,i,r,o,l)}}),a}function $v(t,e,n,s,i,r,o){if(Ti(i,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(s.value!=null){if(G(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return Ri(t,e,n,a.getNode().getChild(n),i,r,l,o);if(G(n)){let c=new oe(null);return a.getNode().forEachChild(On,(u,h)=>{c=c.set(new ee(u),h)}),ao(t,e,n,c,i,r,l,o)}else return e}else{let c=new oe(null);return s.foreach((u,h)=>{const f=he(n,u);a.isCompleteForPath(f)&&(c=c.set(u,a.getNode().getChild(f)))}),ao(t,e,n,c,i,r,l,o)}}function Uv(t,e,n,s,i){const r=e.serverCache,o=yh(e,r.getNode(),r.isFullyInitialized()||G(n),r.isFiltered());return Ih(t,o,n,s,Sh,i)}function Wv(t,e,n,s,i,r){let o;if(Ti(s,n)!=null)return e;{const l=new Qo(s,e,i),a=e.eventCache.getNode();let c;if(G(n)||V(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Ii(s,un(e));else{const h=e.serverCache.getNode();S(h instanceof H,"serverChildren would be complete if leaf node"),u=qo(s,h)}u=u,c=t.filter.updateFullNode(a,u,r)}else{const u=V(n);let h=Yo(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=a.getImmediateChild(u)),h!=null?c=t.filter.updateChild(a,u,h,ae(n),l,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(a,u,H.EMPTY_NODE,ae(n),l,r):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ii(s,un(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Ti(s,z())!=null,ds(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vv{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Vo(s.getIndex()),r=lv(s);this.processor_=Mv(r);const o=n.serverCache,l=n.eventCache,a=i.updateFullNode(H.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(H.EMPTY_NODE,l.getNode(),null),u=new Vt(a,o.isFullyInitialized(),i.filtersNodes()),h=new Vt(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=Yi(h,u),this.eventGenerator_=new pv(this.query_)}get query(){return this.query_}}function jv(t){return t.viewCache_.serverCache.getNode()}function Gv(t){return Si(t.viewCache_)}function Kv(t,e){const n=un(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!G(e)&&!n.getImmediateChild(V(e)).isEmpty())?n.getChild(e):null}function za(t){return t.eventRegistrations_.length===0}function zv(t,e){t.eventRegistrations_.push(e)}function qa(t,e,n){const s=[];if(n){S(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function Ya(t,e,n,s){e.type===Xe.MERGE&&e.source.queryId!==null&&(S(un(t.viewCache_),"We should always have a full cache before handling merges"),S(Si(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=Fv(t.processor_,i,e,n,s);return Lv(t.processor_,r.viewCache),S(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Th(t,r.changes,r.viewCache.eventCache.getNode(),null)}function qv(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(fe,(r,o)=>{s.push(Bn(r,o))}),n.isFullyInitialized()&&s.push(gh(n.getNode())),Th(t,s,n.getNode(),e)}function Th(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return _v(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi;class Rh{constructor(){this.views=new Map}}function Yv(t){S(!xi,"__referenceConstructor has already been defined"),xi=t}function Qv(){return S(xi,"Reference.ts has not been loaded"),xi}function Jv(t){return t.views.size===0}function Jo(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return S(r!=null,"SyncTree gave us an op for an invalid query."),Ya(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(Ya(o,e,n,s));return r}}function xh(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let l=Ii(n,i?s:null),a=!1;l?a=!0:s instanceof H?(l=qo(n,s),a=!1):(l=H.EMPTY_NODE,a=!1);const c=Yi(new Vt(l,a,!1),new Vt(s,i,!1));return new Vv(e,c)}return o}function Xv(t,e,n,s,i,r){const o=xh(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),zv(o,n),qv(o,n)}function Zv(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const l=jt(t);if(i==="default")for(const[a,c]of t.views.entries())o=o.concat(qa(c,n,s)),za(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||r.push(c.query));else{const a=t.views.get(i);a&&(o=o.concat(qa(a,n,s)),za(a)&&(t.views.delete(i),a.query._queryParams.loadsAllData()||r.push(a.query)))}return l&&!jt(t)&&r.push(new(Qv())(e._repo,e._path)),{removed:r,events:o}}function Ah(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function $t(t,e){let n=null;for(const s of t.views.values())n=n||Kv(s,e);return n}function Nh(t,e){if(e._queryParams.loadsAllData())return Ji(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Ph(t,e){return Nh(t,e)!=null}function jt(t){return Ji(t)!=null}function Ji(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ai;function eE(t){S(!Ai,"__referenceConstructor has already been defined"),Ai=t}function tE(){return S(Ai,"Reference.ts has not been loaded"),Ai}let nE=1;class Qa{constructor(e){this.listenProvider_=e,this.syncPointTree_=new oe(null),this.pendingWriteTree_=Pv(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Oh(t,e,n,s,i){return vv(t.pendingWriteTree_,e,n,s,i),i?jn(t,new cn(Go(),e,n)):[]}function sE(t,e,n,s){Ev(t.pendingWriteTree_,e,n,s);const i=oe.fromObject(n);return jn(t,new Hn(Go(),e,i))}function Mt(t,e,n=!1){const s=Cv(t.pendingWriteTree_,e);if(bv(t.pendingWriteTree_,e)){let r=new oe(null);return s.snap!=null?r=r.set(z(),!0):we(s.children,o=>{r=r.set(new ee(o),!0)}),jn(t,new wi(s.path,r,n))}else return[]}function js(t,e,n){return jn(t,new cn(Ko(),e,n))}function iE(t,e,n){const s=oe.fromObject(n);return jn(t,new Hn(Ko(),e,s))}function rE(t,e){return jn(t,new Os(Ko(),e))}function oE(t,e,n){const s=Zo(t,n);if(s){const i=el(s),r=i.path,o=i.queryId,l=Pe(r,e),a=new Os(zo(o),l);return tl(t,r,a)}else return[]}function Ni(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||Ph(o,e))){const a=Zv(o,e,n,s);Jv(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=a.removed;if(l=a.events,!i){const u=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(f,_)=>jt(_));if(u&&!h){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const _=cE(f);for(let m=0;m<_.length;++m){const w=_[m],D=w.query,k=Lh(t,w);t.listenProvider_.startListening(_s(D),Ds(t,D),k.hashFn,k.onComplete)}}}!h&&c.length>0&&!s&&(u?t.listenProvider_.stopListening(_s(e),null):c.forEach(f=>{const _=t.queryToTagMap.get(Xi(f));t.listenProvider_.stopListening(_s(f),_)}))}uE(t,c)}return l}function Dh(t,e,n,s){const i=Zo(t,s);if(i!=null){const r=el(i),o=r.path,l=r.queryId,a=Pe(o,e),c=new cn(zo(l),a,n);return tl(t,o,c)}else return[]}function lE(t,e,n,s){const i=Zo(t,s);if(i){const r=el(i),o=r.path,l=r.queryId,a=Pe(o,e),c=oe.fromObject(n),u=new Hn(zo(l),a,c);return tl(t,o,u)}else return[]}function co(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,_)=>{const m=Pe(f,i);r=r||$t(_,m),o=o||jt(_)});let l=t.syncPointTree_.get(i);l?(o=o||jt(l),r=r||$t(l,z())):(l=new Rh,t.syncPointTree_=t.syncPointTree_.set(i,l));let a;r!=null?a=!0:(a=!1,r=H.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((_,m)=>{const w=$t(m,z());w&&(r=r.updateImmediateChild(_,w))}));const c=Ph(l,e);if(!c&&!e._queryParams.loadsAllData()){const f=Xi(e);S(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const _=hE();t.queryToTagMap.set(f,_),t.tagToQueryMap.set(_,f)}const u=Qi(t.pendingWriteTree_,i);let h=Xv(l,e,n,u,r,a);if(!c&&!o&&!s){const f=Nh(l,e);h=h.concat(fE(t,e,f))}return h}function Xo(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=Pe(o,e),c=$t(l,a);if(c)return c});return Ch(i,e,r,n,!0)}function aE(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const h=Pe(c,n);s=s||$t(u,h)});let i=t.syncPointTree_.get(n);i?s=s||$t(i,z()):(i=new Rh,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new Vt(s,!0,!1):null,l=Qi(t.pendingWriteTree_,e._path),a=xh(i,e,l,r?o.getNode():H.EMPTY_NODE,r);return Gv(a)}function jn(t,e){return kh(e,t.syncPointTree_,null,Qi(t.pendingWriteTree_,z()))}function kh(t,e,n,s){if(G(t.path))return Mh(t,e,n,s);{const i=e.get(z());n==null&&i!=null&&(n=$t(i,z()));let r=[];const o=V(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,u=bh(s,o);r=r.concat(kh(l,a,c,u))}return i&&(r=r.concat(Jo(i,t,s,n))),r}}function Mh(t,e,n,s){const i=e.get(z());n==null&&i!=null&&(n=$t(i,z()));let r=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=bh(s,o),u=t.operationForChild(o);u&&(r=r.concat(Mh(u,l,a,c)))}),i&&(r=r.concat(Jo(i,t,s,n))),r}function Lh(t,e){const n=e.query,s=Ds(t,n);return{hashFn:()=>(jv(e)||H.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?oE(t,n._path,s):rE(t,n._path);{const r=ry(i,n);return Ni(t,n,null,r)}}}}function Ds(t,e){const n=Xi(e);return t.queryToTagMap.get(n)}function Xi(t){return t._path.toString()+"$"+t._queryIdentifier}function Zo(t,e){return t.tagToQueryMap.get(e)}function el(t){const e=t.indexOf("$");return S(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new ee(t.substr(0,e))}}function tl(t,e,n){const s=t.syncPointTree_.get(e);S(s,"Missing sync point for query tag that we're tracking");const i=Qi(t.pendingWriteTree_,e);return Jo(s,n,i,null)}function cE(t){return t.fold((e,n,s)=>{if(n&&jt(n))return[Ji(n)];{let i=[];return n&&(i=Ah(n)),we(s,(r,o)=>{i=i.concat(o)}),i}})}function _s(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(tE())(t._repo,t._path):t}function uE(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=Xi(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function hE(){return nE++}function fE(t,e,n){const s=e._path,i=Ds(t,e),r=Lh(t,n),o=t.listenProvider_.startListening(_s(e),i,r.hashFn,r.onComplete),l=t.syncPointTree_.subtree(s);if(i)S(!jt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,u,h)=>{if(!G(c)&&u&&jt(u))return[Ji(u).query];{let f=[];return u&&(f=f.concat(Ah(u).map(_=>_.query))),we(h,(_,m)=>{f=f.concat(m)}),f}});for(let c=0;c<a.length;++c){const u=a[c];t.listenProvider_.stopListening(_s(u),Ds(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new nl(n)}node(){return this.node_}}class sl{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=he(this.path_,e);return new sl(this.syncTree_,n)}node(){return Xo(this.syncTree_,this.path_)}}const dE=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Ja=function(t,e,n){if(!t||typeof t!="object")return t;if(S(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return pE(t[".sv"],e,n);if(typeof t[".sv"]=="object")return _E(t[".sv"],e);S(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},pE=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:S(!1,"Unexpected server value: "+t)}},_E=function(t,e,n){t.hasOwnProperty("increment")||S(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&S(!1,"Unexpected increment value: "+s);const i=e.node();if(S(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Fh=function(t,e,n,s){return il(e,new sl(n,t),s)},Bh=function(t,e,n){return il(t,new nl(e),n)};function il(t,e,n){const s=t.getPriority().val(),i=Ja(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,l=Ja(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new ye(l,_e(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new ye(i))),o.forEachChild(fe,(l,a)=>{const c=il(a,e.getImmediateChild(l),n);c!==a&&(r=r.updateImmediateChild(l,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function ol(t,e){let n=e instanceof ee?e:new ee(e),s=t,i=V(n);for(;i!==null;){const r=Ln(s.node.children,i)||{children:{},childCount:0};s=new rl(i,s,r),n=ae(n),i=V(n)}return s}function Gn(t){return t.node.value}function Hh(t,e){t.node.value=e,uo(t)}function $h(t){return t.node.childCount>0}function gE(t){return Gn(t)===void 0&&!$h(t)}function Zi(t,e){we(t.node.children,(n,s)=>{e(new rl(n,t,s))})}function Uh(t,e,n,s){n&&e(t),Zi(t,i=>{Uh(i,e,!0)})}function mE(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Gs(t){return new ee(t.parent===null?t.name:Gs(t.parent)+"/"+t.name)}function uo(t){t.parent!==null&&yE(t.parent,t.name,t)}function yE(t,e,n){const s=gE(n),i=_t(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,uo(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,uo(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vE=/[\[\].#$\/\u0000-\u001F\u007F]/,EE=/[\[\].#$\u0000-\u001F\u007F]/,Ar=10*1024*1024,ll=function(t){return typeof t=="string"&&t.length!==0&&!vE.test(t)},Wh=function(t){return typeof t=="string"&&t.length!==0&&!EE.test(t)},CE=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Wh(t)},bE=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!ko(t)||t&&typeof t=="object"&&_t(t,".sv")},Vh=function(t,e,n,s){s&&e===void 0||er(Ki(t,"value"),e,n)},er=function(t,e,n){const s=n instanceof ee?new Hy(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+nn(s));if(typeof e=="function")throw new Error(t+"contains a function "+nn(s)+" with contents = "+e.toString());if(ko(e))throw new Error(t+"contains "+e.toString()+" "+nn(s));if(typeof e=="string"&&e.length>Ar/3&&zi(e)>Ar)throw new Error(t+"contains a string greater than "+Ar+" utf8 bytes "+nn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(we(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ll(o)))throw new Error(t+" contains an invalid key ("+o+") "+nn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);$y(s,o),er(t,l,s),Uy(s)}),i&&r)throw new Error(t+' contains ".value" child '+nn(s)+" in addition to actual children.")}},wE=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=xs(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ll(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(By);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&Ke(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},SE=function(t,e,n,s){const i=Ki(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];we(e,(o,l)=>{const a=new ee(o);if(er(i,l,he(n,a)),Ho(a)===".priority"&&!bE(l))throw new Error(i+"contains an invalid value for '"+a.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(a)}),wE(i,r)},jh=function(t,e,n,s){if(!Wh(n))throw new Error(Ki(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},IE=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),jh(t,e,n)},Gh=function(t,e){if(V(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},TE=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ll(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!CE(n))throw new Error(Ki(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function tr(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!$o(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function Kh(t,e,n){tr(t,n),zh(t,s=>$o(s,e))}function Ye(t,e,n){tr(t,n),zh(t,s=>Ke(s,e)||Ke(e,s))}function zh(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(xE(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function xE(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();hs&&Ce("event: "+n.toString()),Vn(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AE="repo_interrupt",NE=25;class PE{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new RE,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=bi(),this.transactionQueueTree_=new rl,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function OE(t,e,n){if(t.stats_=Fo(t.repoInfo_),t.forceRestClient_||cy())t.server_=new Ci(t.repoInfo_,(s,i,r,o)=>{Xa(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Za(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ge(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new wt(t.repoInfo_,e,(s,i,r,o)=>{Xa(t,s,i,r,o)},s=>{Za(t,s)},s=>{DE(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=py(t.repoInfo_,()=>new dv(t.stats_,t.server_)),t.infoData_=new av,t.infoSyncTree_=new Qa({startListening:(s,i,r,o)=>{let l=[];const a=t.infoData_.getNode(s._path);return a.isEmpty()||(l=js(t.infoSyncTree_,s._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),al(t,"connected",!1),t.serverSyncTree_=new Qa({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(l,a)=>{const c=o(l,a);Ye(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function qh(t){const n=t.infoData_.getNode(new ee(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function nr(t){return dE({timestamp:qh(t)})}function Xa(t,e,n,s,i){t.dataUpdateCount++;const r=new ee(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const a=pi(n,c=>_e(c));o=lE(t.serverSyncTree_,r,a,i)}else{const a=_e(n);o=Dh(t.serverSyncTree_,r,a,i)}else if(s){const a=pi(n,c=>_e(c));o=iE(t.serverSyncTree_,r,a)}else{const a=_e(n);o=js(t.serverSyncTree_,r,a)}let l=r;o.length>0&&(l=Un(t,r)),Ye(t.eventQueue_,l,o)}function Za(t,e){al(t,"connected",e),e===!1&&FE(t)}function DE(t,e){we(e,(n,s)=>{al(t,n,s)})}function al(t,e,n){const s=new ee("/.info/"+e),i=_e(n);t.infoData_.updateSnapshot(s,i);const r=js(t.infoSyncTree_,s,i);Ye(t.eventQueue_,s,r)}function cl(t){return t.nextWriteId_++}function kE(t,e,n){const s=aE(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=_e(i).withIndex(e._queryParams.getIndex());co(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=js(t.serverSyncTree_,e._path,r);else{const l=Ds(t.serverSyncTree_,e);o=Dh(t.serverSyncTree_,e._path,r,l)}return Ye(t.eventQueue_,e._path,o),Ni(t.serverSyncTree_,e,n,null,!0),r},i=>(Ks(t,"get for query "+ge(e)+" failed: "+i),Promise.reject(new Error(i))))}function ME(t,e,n,s,i){Ks(t,"set",{path:e.toString(),value:n,priority:s});const r=nr(t),o=_e(n,s),l=Xo(t.serverSyncTree_,e),a=Bh(o,l,r),c=cl(t),u=Oh(t.serverSyncTree_,e,a,c,!0);tr(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(f,_)=>{const m=f==="ok";m||Oe("set at "+e+" failed: "+f);const w=Mt(t.serverSyncTree_,c,!m);Ye(t.eventQueue_,e,w),ho(t,i,f,_)});const h=hl(t,e);Un(t,h),Ye(t.eventQueue_,h,[])}function LE(t,e,n,s){Ks(t,"update",{path:e.toString(),value:n});let i=!0;const r=nr(t),o={};if(we(n,(l,a)=>{i=!1,o[l]=Fh(he(e,l),_e(a),t.serverSyncTree_,r)}),i)Ce("update() called with empty data.  Don't do anything."),ho(t,s,"ok",void 0);else{const l=cl(t),a=sE(t.serverSyncTree_,e,o,l);tr(t.eventQueue_,a),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||Oe("update at "+e+" failed: "+c);const f=Mt(t.serverSyncTree_,l,!h),_=f.length>0?Un(t,e):e;Ye(t.eventQueue_,_,f),ho(t,s,c,u)}),we(n,c=>{const u=hl(t,he(e,c));Un(t,u)}),Ye(t.eventQueue_,e,[])}}function FE(t){Ks(t,"onDisconnectEvents");const e=nr(t),n=bi();so(t.onDisconnect_,z(),(i,r)=>{const o=Fh(i,r,t.serverSyncTree_,e);mh(n,i,o)});let s=[];so(n,z(),(i,r)=>{s=s.concat(js(t.serverSyncTree_,i,r));const o=hl(t,i);Un(t,o)}),t.onDisconnect_=bi(),Ye(t.eventQueue_,z(),s)}function BE(t,e,n){let s;V(e._path)===".info"?s=co(t.infoSyncTree_,e,n):s=co(t.serverSyncTree_,e,n),Kh(t.eventQueue_,e._path,s)}function HE(t,e,n){let s;V(e._path)===".info"?s=Ni(t.infoSyncTree_,e,n):s=Ni(t.serverSyncTree_,e,n),Kh(t.eventQueue_,e._path,s)}function $E(t){t.persistentConnection_&&t.persistentConnection_.interrupt(AE)}function Ks(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ce(n,...e)}function ho(t,e,n,s){e&&Vn(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Yh(t,e,n){return Xo(t.serverSyncTree_,e,n)||H.EMPTY_NODE}function ul(t,e=t.transactionQueueTree_){if(e||sr(t,e),Gn(e)){const n=Jh(t,e);S(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&UE(t,Gs(e),n)}else $h(e)&&Zi(e,n=>{ul(t,n)})}function UE(t,e,n){const s=n.map(c=>c.currentWriteId),i=Yh(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const u=n[c];S(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Pe(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const l=r.val(!0),a=e;t.server_.put(a.toString(),l,c=>{Ks(t,"transaction put response",{path:a.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,u=u.concat(Mt(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();sr(t,ol(t.transactionQueueTree_,e)),ul(t,t.transactionQueueTree_),Ye(t.eventQueue_,e,u);for(let f=0;f<h.length;f++)Vn(h[f])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{Oe("transaction at "+a.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Un(t,e)}},o)}function Un(t,e){const n=Qh(t,e),s=Gs(n),i=Jh(t,n);return WE(t,i,s),s}function WE(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=Pe(n,a.path);let u=!1,h;if(S(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)u=!0,h=a.abortReason,i=i.concat(Mt(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=NE)u=!0,h="maxretry",i=i.concat(Mt(t.serverSyncTree_,a.currentWriteId,!0));else{const f=Yh(t,a.path,o);a.currentInputSnapshot=f;const _=e[l].update(f.val());if(_!==void 0){er("transaction failed: Data returned ",_,a.path);let m=_e(_);typeof _=="object"&&_!=null&&_t(_,".priority")||(m=m.updatePriority(f.getPriority()));const D=a.currentWriteId,k=nr(t),P=Bh(m,f,k);a.currentOutputSnapshotRaw=m,a.currentOutputSnapshotResolved=P,a.currentWriteId=cl(t),o.splice(o.indexOf(D),1),i=i.concat(Oh(t.serverSyncTree_,a.path,P,a.currentWriteId,a.applyLocally)),i=i.concat(Mt(t.serverSyncTree_,D,!0))}else u=!0,h="nodata",i=i.concat(Mt(t.serverSyncTree_,a.currentWriteId,!0))}Ye(t.eventQueue_,n,i),i=[],u&&(e[l].status=2,function(f){setTimeout(f,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(h==="nodata"?s.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):s.push(()=>e[l].onComplete(new Error(h),!1,null))))}sr(t,t.transactionQueueTree_);for(let l=0;l<s.length;l++)Vn(s[l]);ul(t,t.transactionQueueTree_)}function Qh(t,e){let n,s=t.transactionQueueTree_;for(n=V(e);n!==null&&Gn(s)===void 0;)s=ol(s,n),e=ae(e),n=V(e);return s}function Jh(t,e){const n=[];return Xh(t,e,n),n.sort((s,i)=>s.order-i.order),n}function Xh(t,e,n){const s=Gn(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Zi(e,i=>{Xh(t,i,n)})}function sr(t,e){const n=Gn(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Hh(e,n.length>0?n:void 0)}Zi(e,s=>{sr(t,s)})}function hl(t,e){const n=Gs(Qh(t,e)),s=ol(t.transactionQueueTree_,e);return mE(s,i=>{Nr(t,i)}),Nr(t,s),Uh(s,i=>{Nr(t,i)}),n}function Nr(t,e){const n=Gn(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(S(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(S(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Mt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Hh(e,void 0):n.length=r+1,Ye(t.eventQueue_,Gs(e),i);for(let o=0;o<s.length;o++)Vn(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VE(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function jE(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Oe(`Invalid query segment '${n}' in query '${t}'`)}return e}const ec=function(t,e){const n=GE(t),s=n.namespace;n.domain==="firebase.com"&&It(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&It("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||ey();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new eh(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new ee(n.pathString)}},GE=function(t){let e="",n="",s="",i="",r="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(i=VE(t.substring(u,h)));const f=jE(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),n=e.substring(m+1),r=s}"ns"in f&&(r=f.ns)}return{host:e,port:a,domain:n,subdomain:s,secure:o,scheme:l,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",KE=function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=tc.charAt(n%64),n=Math.floor(n/64);S(n===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=tc.charAt(e[i]);return S(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ge(this.snapshot.exportVal())}}class qE{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return S(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return G(this._path)?null:Ho(this._path)}get ref(){return new Rt(this._repo,this._path)}get _queryIdentifier(){const e=$a(this._queryParams),n=Mo(e);return n==="{}"?"default":n}get _queryObject(){return $a(this._queryParams)}isEqual(e){if(e=hn(e),!(e instanceof fl))return!1;const n=this._repo===e._repo,s=$o(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Fy(this._path)}}class Rt extends fl{constructor(e,n){super(e,n,new jo,!1)}get parent(){const e=ch(this._path);return e===null?null:new Rt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ks{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ee(e),s=Ms(this.ref,e);return new ks(this._node.getChild(n),s,fe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new ks(i,Ms(this.ref,s),fe)))}hasChild(e){const n=new ee(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Yt(t,e){return t=hn(t),t._checkNotDeleted("ref"),e!==void 0?Ms(t._root,e):t._root}function Ms(t,e){return t=hn(t),V(t._path)===null?IE("child","path",e):jh("child","path",e),new Rt(t._repo,he(t._path,e))}function YE(t,e){t=hn(t),Gh("push",t._path),Vh("push",e,t._path,!0);const n=qh(t._repo),s=KE(n),i=Ms(t,s),r=Ms(t,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function ef(t,e){t=hn(t),Gh("set",t._path),Vh("set",e,t._path,!1);const n=new Hs;return ME(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function dl(t,e){SE("update",e,t._path);const n=new Hs;return LE(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function ir(t){t=hn(t);const e=new Zh(()=>{}),n=new rr(e);return kE(t._repo,t,n).then(s=>new ks(s,new Rt(t._repo,t._path),t._queryParams.getIndex()))}class rr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new zE("value",this,new ks(e.snapshotNode,new Rt(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new qE(this,e,n):null}matches(e){return e instanceof rr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function QE(t,e,n,s,i){const r=new Zh(n,void 0),o=new rr(r);return BE(t._repo,t,o),()=>HE(t._repo,t,o)}function tf(t,e,n,s){return QE(t,"value",e)}Yv(Rt);eE(Rt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JE="FIREBASE_DATABASE_EMULATOR_HOST",fo={};let XE=!1;function ZE(t,e,n,s){t.repoInfo_=new eh(e,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function eC(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||It("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ce("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=ec(r,i),l=o.repoInfo,a;typeof process<"u"&&ba&&(a=ba[JE]),a?(r=`http://${a}?ns=${l.namespace}`,o=ec(r,i),l=o.repoInfo):o.repoInfo.secure;const c=new hy(t.name,t.options,e);TE("Invalid Firebase Database URL",o),G(o.path)||It("Database URL must point to the root of a Firebase Database (not including a child path).");const u=nC(l,t,c,new uy(t,n));return new sC(u,t)}function tC(t,e){const n=fo[e];(!n||n[t.key]!==t)&&It(`Database ${e}(${t.repoInfo_}) has already been deleted.`),$E(t),delete n[t.key]}function nC(t,e,n,s){let i=fo[e.name];i||(i={},fo[e.name]=i);let r=i[t.toURLString()];return r&&It("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new PE(t,XE,n,s),i[t.toURLString()]=r,r}class sC{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(OE(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Rt(this._repo,z())),this._rootInternal}_delete(){return this._rootInternal!==null&&(tC(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&It("Cannot call "+e+" on a deleted database.")}}function iC(t=Fm(),e){const n=Om(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Cg("database");s&&rC(n,...s)}return n}function rC(t,e,n,s={}){t=hn(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&_i(s,r.repoInfo_.emulatorOptions))return;It("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&It('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new si(si.OWNER);else if(s.mockUserToken){const l=typeof s.mockUserToken=="string"?s.mockUserToken:bg(s.mockUserToken,t.app.options.projectId);o=new si(l)}ZE(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oC(t){qm(Lm),mi(new Is("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return eC(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),Nn(wa,Sa,t),Nn(wa,Sa,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lC={".sv":"timestamp"};function nf(){return lC}wt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};wt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};oC();var aC="firebase",cC="11.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nn(aC,cC,"app");const uC={apiKey:"AIzaSyAX31LhNzoFVB50yjJckNtqB66iF7ptI54",authDomain:"ghidim-2718d.firebaseapp.com",databaseURL:"https://ghidim-2718d-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"ghidim-2718d",storageBucket:"ghidim-2718d.firebasestorage.app",messagingSenderId:"802578627346",appId:"1:802578627346:web:65a1a7fded1081b81191cb"},hC=Fu(uC),Qt=iC(hC);async function fC(t){const e=Yt(Qt,"rooms/"+t),n=await ir(e);return n.exists()?n.val():null}function dC(t,e){const n=Array.isArray(t.scores)?t.scores:[],s=Array.isArray(t.totalScores)?t.totalScores:e.map(()=>0);return{oldScores:n,oldTotalScores:s}}async function pC(t){let e=await fC(t);if(!e){e={name:`${t}`,createdAt:nf(),games:[]};const n=Yt(Qt,"rooms/"+t);await ef(n,e)}return e}async function _C(t,e){const n=Yt(Qt,"rooms/"+t+"/games"),s=YE(n),i={id:Date.now(),date:nf(),players:e,scores:[],totalScores:[0,0,0,0],room:t};return await ef(s,i),{...i,firebaseId:s.key}}async function RC(t,e,n){const s=Yt(Qt,`rooms/${t}/games/${e}`),i=await ir(s);if(i.exists()){const r=i.val(),{oldScores:o,oldTotalScores:l}=dC(r,n),a=[...o,n],c=l.map((u,h)=>u+n[h]);await dl(s,{scores:a,totalScores:c})}}async function xC(t,e,n,s){const i=Yt(Qt,`rooms/${t}/games/${e}`),r=await ir(i);if(r.exists()){const o=r.val(),l=o.scores[n],a=[...o.scores];a[n]=s;const c=o.totalScores.map((u,h)=>u-l[h]+s[h]);await dl(i,{scores:a,totalScores:c})}}async function AC(t,e){const n=Yt(Qt,`rooms/${t}/games/${e}`);(await ir(n)).exists()&&await dl(n,{isEnded:!0})}const Pi="currentGame",sf="currentRoom";let rf=of(sf)||"public",ii=null,ri=null;function of(t){return localStorage.getItem(t)}function lf(t,e){localStorage.setItem(t,typeof e=="string"?e:JSON.stringify(e))}function af(t){localStorage.removeItem(t)}async function gC(t){const e=await pC(t);return await uf(t),pl(t),e}async function mC({room:t,players:e}){try{if(!Array.isArray(e)||e.length<4)throw new Error("Cần có ít nhất 4 người chơi hợp lệ");const n=e.map(r=>r==null?void 0:r.trim()).filter(r=>r),s=(t==null?void 0:t.trim())||Ut();await uf(s),pl(s);const i=await _C(s,n.length?n:["Bot"]);return await hf(i),i}catch(n){throw console.error("Error in createNewGame:",n),n}}function nc(t,e){cf();const n=Yt(Qt,`rooms/${t}/games`);ii=tf(n,s=>{const i=s.val(),r=i?Object.entries(i).map(([o,l])=>({firebaseId:o,...l})):[];r.sort((o,l)=>new Date(l.createdAt||0)-new Date(o.createdAt||0)),e(r)})}function cf(){ii&&(ii(),ii=null)}function NC(t,e,n,s){yC();const i=Yt(Qt,`rooms/${t}/games/${e}`);ri=tf(i,r=>{const o=r.val();s(o?{firebaseId:i.key,...o}:n)})}function yC(){ri&&(ri(),ri=null)}async function uf(t){return t!=null&&t.trim()||(t="public"),console.log(`Ensuring room exists: ${t}`),Promise.resolve(t)}function pl(t){return af(Pi),rf=t,lf(sf,t),t}function Ut(){return rf}async function hf(t){t.id||(t.id=Date.now()),t.room||(t.room=Ut()),lf(Pi,t)}function PC(){try{const t=of(Pi);if(!t)return null;const e=JSON.parse(t);return e.scores=e.scores||[],e.totalScores=e.totalScores||[0,0,0,0],e.room=e.room||Ut(),e.room!==Ut()?(af(Pi),console.log("Đã xóa game cũ vì không thuộc phòng hiện tại:",Ut()),null):e}catch(t){return console.error("Error getting current game:",t),null}}function vC(t){if(!(t!=null&&t.id))throw new Error("Cần có danh sách người chơi hợp lệ");return t.room&&t.room!==Ut()&&pl(t.room),hf(t).then(()=>t)}const EC={class:"container"},CC={class:"header"},bC={key:0,class:"room-badge"},wC={__name:"HomeView",setup(t){const e=z_(),n=Tn(Ut()),s=Tn([]),i=Tn(!1);async function r(c="public"){await gC(c),nc(n.value=c,u=>{s.value=u})}function o(){i.value=!0}function l(c){try{const u=s.value[c];vC(u),e.push("/scoring")}catch(u){console.error("Error creating new game:",u),alert("Có lỗi khi tạo ván mới. Vui lòng thử lại.")}}async function a(c){try{await mC(c),i.value=!1,await e.push("/scoring")}catch(u){console.error("Error creating new game:",u),alert("Có lỗi khi tạo ván mới. Vui lòng thử lại.")}}return Hc(()=>{nc(Ut(),c=>{s.value=c})}),xo(()=>{cf()}),(c,u)=>($e(),Ge("div",EC,[de("div",CC,[u[1]||(u[1]=de("h1",null,"Lịch Sử Ván Bài",-1)),n.value?($e(),Ge("div",bC," Phòng: "+gs(n.value),1)):lu("",!0)]),be(Y_,{onJoinRoom:r}),be(sg,{games:s.value,onOpenGame:l},null,8,["games"]),be(ug,{"is-visible":i.value,"current-room":n.value,onClose:u[0]||(u[0]=h=>i.value=!1),onStartGame:a},null,8,["is-visible","current-room"]),de("button",{id:"newGameBtn",class:"primary-btn",onClick:o}," Tạo Ván Mới ")]))}},SC=[{path:"/",name:"home",component:wC},{path:"/scoring",name:"scoring",component:()=>Vp(()=>import("./game-service.js"),[])}],IC=G_({history:E_("/ghidiembai/"),routes:SC});function TC(){"serviceWorker"in navigator?window.addEventListener("load",()=>{navigator.serviceWorker.register("/ghidiembai/service-worker.js").then(e=>{console.log("ServiceWorker đã đăng ký thành công:",e.scope),window.addEventListener("online",()=>{e.sync&&e.sync.register("sync-games").then(()=>console.log("Đã đăng ký sync cho ván bài")).catch(n=>console.error("Lỗi khi đăng ký sync:",n))})}).catch(e=>{console.error("Đăng ký ServiceWorker thất bại:",e)})}):console.log("Trình duyệt không hỗ trợ service worker")}TC();const ff=Dp($p);ff.use(IC);ff.mount("#app");export{AC as A,Qe as F,$e as a,Ue as b,Ge as c,de as d,Fi as e,Ls as f,Tn as g,lu as h,Fr as i,Ut as j,PC as k,xo as l,qd as m,yo as n,Hc as o,be as p,yC as q,$c as r,NC as s,gs as t,z_ as u,jr as v,ls as w,hf as x,xC as y,RC as z};
