!function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="/demobar/",r(r.s=244)}({0:function(t,n,r){(function(n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n&&n)||Function("return this")()}).call(this,r(43))},1:function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},12:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},13:function(t,n,r){var e=r(34),o=r(21);t.exports=function(t){return e(o(t))}},14:function(t,n,r){var e=r(6),o=r(27),u=r(15),i=r(16),c=Object.defineProperty;n.f=e?c:function(t,n,r){if(u(t),n=i(n,!0),u(r),o)try{return c(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},15:function(t,n,r){var e=r(4);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},16:function(t,n,r){var e=r(4);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},17:function(t,n,r){var e=r(7);t.exports=function(t){return e[t+"Prototype"]}},19:function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},2:function(t,n,r){"use strict";var e=r(0),o=r(37).f,u=r(44),i=r(7),c=r(28),a=r(9),f=r(5),s=function(t){var n=function(n,r,e){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,r)}return new t(n,r,e)}return t.apply(this,arguments)};return n.prototype=t.prototype,n};t.exports=function(t,n){var r,p,l,v,y,d,b,h,m=t.target,x=t.global,g=t.stat,w=t.proto,j=x?e:g?e[m]:(e[m]||{}).prototype,S=x?i:i[m]||(i[m]={}),O=S.prototype;for(l in n)r=!u(x?l:m+(g?".":"#")+l,t.forced)&&j&&f(j,l),y=S[l],r&&(d=t.noTargetGet?(h=o(j,l))&&h.value:j[l]),v=r&&d?d:n[l],r&&typeof y==typeof v||(b=t.bind&&r?c(v,e):t.wrap&&r?s(v):w&&"function"==typeof v?c(Function.call,v):v,(t.sham||v&&v.sham||y&&y.sham)&&a(b,"sham",!0),S[l]=b,w&&(f(i,p=m+"Prototype")||a(i,p,{}),i[p][l]=v,t.real&&O&&!O[l]&&a(O,l,v)))}},20:function(t,n,r){var e=r(32),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},21:function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},22:function(t,n,r){var e=r(7),o=r(0),u=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,n){return arguments.length<2?u(e[t])||u(o[t]):e[t]&&e[t][n]||o[t]&&o[t][n]}},24:function(t,n,r){var e=r(19);t.exports=Array.isArray||function(t){return"Array"==e(t)}},244:function(t,n,r){"use strict";r.r(n);var e=r(49),o=r.n(e),u=r(39),i=r.n(u),c=(r(245),document.getElementById("praise_bubble")),a=document.getElementById("heart"),f=document.getElementsByClassName("base-img");a.addEventListener("click",(function(){var t,n=Math.floor(6*Math.random())+1,r=Math.floor(11*Math.random())+1,e=Math.floor(1e3*Math.random())%4,u=document.createElement("div");u.className=i()(t="bubble b".concat(n," bl")).call(t,r);var a=document.createElement("img");a.setAttribute("src",f[e].getAttribute("src")),u.appendChild(a),c.appendChild(u),o()((function(){c.removeChild(u)}),3e3)}))},245:function(t,n,r){},25:function(t,n,r){var e=r(21);t.exports=function(t){return Object(e(t))}},27:function(t,n,r){var e=r(6),o=r(1),u=r(35);t.exports=!e&&!o((function(){return 7!=Object.defineProperty(u("div"),"a",{get:function(){return 7}}).a}))},28:function(t,n,r){var e=r(29);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 0:return function(){return t.call(n)};case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},29:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},3:function(t,n,r){var e=r(0),o=r(45),u=r(5),i=r(46),c=r(38),a=r(62),f=o("wks"),s=e.Symbol,p=a?s:s&&s.withoutSetter||i;t.exports=function(t){return u(f,t)||(c&&u(s,t)?f[t]=s[t]:f[t]=p("Symbol."+t)),f[t]}},30:function(t,n){t.exports=!0},31:function(t,n,r){var e=r(22);t.exports=e("navigator","userAgent")||""},32:function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},34:function(t,n,r){var e=r(1),o=r(19),u="".split;t.exports=e((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?u.call(t,""):Object(t)}:Object},35:function(t,n,r){var e=r(0),o=r(4),u=e.document,i=o(u)&&o(u.createElement);t.exports=function(t){return i?u.createElement(t):{}}},37:function(t,n,r){var e=r(6),o=r(40),u=r(12),i=r(13),c=r(16),a=r(5),f=r(27),s=Object.getOwnPropertyDescriptor;n.f=e?s:function(t,n){if(t=i(t),n=c(n,!0),f)try{return s(t,n)}catch(t){}if(a(t,n))return u(!o.f.call(t,n),t[n])}},38:function(t,n,r){var e=r(1);t.exports=!!Object.getOwnPropertySymbols&&!e((function(){return!String(Symbol())}))},39:function(t,n,r){t.exports=r(79)},4:function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},40:function(t,n,r){"use strict";var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,u=o&&!e.call({1:2},1);n.f=u?function(t){var n=o(this,t);return!!n&&n.enumerable}:e},43:function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},44:function(t,n,r){var e=r(1),o=/#|\.prototype\./,u=function(t,n){var r=c[i(t)];return r==f||r!=a&&("function"==typeof n?e(n):!!n)},i=u.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=u.data={},a=u.NATIVE="N",f=u.POLYFILL="P";t.exports=u},45:function(t,n,r){var e=r(30),o=r(59);(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.6.4",mode:e?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},46:function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++r+e).toString(36)}},47:function(t,n,r){var e=r(1),o=r(3),u=r(48),i=o("species");t.exports=function(t){return u>=51||!e((function(){var n=[];return(n.constructor={})[i]=function(){return{foo:1}},1!==n[t](Boolean).foo}))}},48:function(t,n,r){var e,o,u=r(0),i=r(31),c=u.process,a=c&&c.versions,f=a&&a.v8;f?o=(e=f.split("."))[0]+e[1]:i&&(!(e=i.match(/Edge\/(\d+)/))||e[1]>=74)&&(e=i.match(/Chrome\/(\d+)/))&&(o=e[1]),t.exports=o&&+o},49:function(t,n,r){t.exports=r(93)},5:function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},50:function(t,n,r){var e=r(4),o=r(24),u=r(3)("species");t.exports=function(t,n){var r;return o(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!o(r.prototype)?e(r)&&null===(r=r[u])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===n?0:n)}},51:function(t,n,r){"use strict";var e=r(16),o=r(14),u=r(12);t.exports=function(t,n,r){var i=e(n);i in t?o.f(t,i,u(0,r)):t[i]=r}},57:function(t,n,r){var e=r(2),o=r(0),u=r(31),i=[].slice,c=function(t){return function(n,r){var e=arguments.length>2,o=e?i.call(arguments,2):void 0;return t(e?function(){("function"==typeof n?n:Function(n)).apply(this,o)}:n,r)}};e({global:!0,bind:!0,forced:/MSIE .\./.test(u)},{setTimeout:c(o.setTimeout),setInterval:c(o.setInterval)})},59:function(t,n,r){var e=r(0),o=r(68),u=e["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=u},6:function(t,n,r){var e=r(1);t.exports=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},62:function(t,n,r){var e=r(38);t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},68:function(t,n,r){var e=r(0),o=r(9);t.exports=function(t,n){try{o(e,t,n)}catch(r){e[t]=n}return n}},7:function(t,n){t.exports={}},71:function(t,n,r){"use strict";var e=r(2),o=r(1),u=r(24),i=r(4),c=r(25),a=r(20),f=r(51),s=r(50),p=r(47),l=r(3),v=r(48),y=l("isConcatSpreadable"),d=v>=51||!o((function(){var t=[];return t[y]=!1,t.concat()[0]!==t})),b=p("concat"),h=function(t){if(!i(t))return!1;var n=t[y];return void 0!==n?!!n:u(t)};e({target:"Array",proto:!0,forced:!d||!b},{concat:function(t){var n,r,e,o,u,i=c(this),p=s(i,0),l=0;for(n=-1,e=arguments.length;n<e;n++)if(u=-1===n?i:arguments[n],h(u)){if(l+(o=a(u.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(r=0;r<o;r++,l++)r in u&&f(p,l,u[r])}else{if(l>=9007199254740991)throw TypeError("Maximum allowed index exceeded");f(p,l++,u)}return p.length=l,p}})},79:function(t,n,r){var e=r(80);t.exports=e},80:function(t,n,r){var e=r(81),o=Array.prototype;t.exports=function(t){var n=t.concat;return t===o||t instanceof Array&&n===o.concat?e:n}},81:function(t,n,r){r(71);var e=r(17);t.exports=e("Array").concat},9:function(t,n,r){var e=r(6),o=r(14),u=r(12);t.exports=e?function(t,n,r){return o.f(t,n,u(1,r))}:function(t,n,r){return t[n]=r,t}},93:function(t,n,r){r(57);var e=r(7);t.exports=e.setTimeout}});