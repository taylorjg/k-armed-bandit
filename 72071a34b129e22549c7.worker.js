!function(t){var e={};function n(r){if(e[r])return e[r].exports;var u=e[r]={i:r,l:!1,exports:{}};return t[r].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var u in t)n.d(r,u,function(e){return t[e]}.bind(null,u));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/k-armed-bandit/",n(n.s=42)}([function(t,e,n){"use strict";var r=n(10),u=n(4),o={number:n(15),string:n(16),object:n(17)};t.exports=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.validators,i=void 0===n?[]:n,a=e.predicates,c=void 0===a?o:a,f=e.type,l=void 0===f?null:f,s=new Proxy((function(){}),{get:function(e,n){if(n===u.validate)return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"argument";if(!l)return new Error("missing required type specifier");for(var n=0;n<i.length;++n){var r=i[n],u=r.fn(t);if(!u)throw 0===n?new Error("Expected ".concat(e," `").concat(t,"` to be of type `").concat(l,"`, but received type `").concat(typeof t,"`")):new Error("Expected ".concat(l," `").concat(e,"` `").concat(t,"` failed predicate `").concat(r.key,"`"))}};var o=c[n];if(o)return"function"===typeof o?(i.push({key:n,fn:o}),s):t({type:n,validators:[{key:n,fn:o.validator}],predicates:o.predicates});var a=c[u.func]&&c[u.func][n];return a?new Proxy((function(){}),{get:function(){throw new Error('invalid use of functional predicate "'.concat(n,'"'))},apply:function(t,e,u){return i.push({key:n,fn:a.apply(void 0,r(u))}),s}}):s},apply:function(t,e,n){if(2!==n.length&&3!==n.length)throw new Error('invalid number of arguments to "ow"');n[1][u.validate](n[0],n[2])}});return s}()},function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e){(function(e){t.exports=e}).call(this,{})},function(t,e,n){"use strict";e.func=Symbol("func"),e.validate=Symbol("validate")},function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return r(t,[{key:"next",value:function(){throw new Error("RNG.next must be overridden")}},{key:"seed",value:function(t,e){throw new Error("RNG.seed must be overridden")}},{key:"clone",value:function(t,e){throw new Error("RNG.clone must be overridden")}},{key:"_seed",value:function(t,e){if(t===(0|t))return t;for(var n=""+t,r=0,u=0;u<n.length;++u)r^=0|n.charCodeAt(u);return r}},{key:"name",get:function(){throw new Error("RNG.name must be overridden")}}]),t}();e.default=u},function(t,e,n){"use strict";t.exports=n(9).default},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.RNGFactory=e.RNG=void 0;var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=x(n(0)),o=x(n(6)),i=x(n(18)),a=x(n(29)),c=x(n(30)),f=x(n(31)),l=x(n(32)),s=x(n(33)),d=x(n(34)),v=x(n(35)),p=x(n(36)),h=x(n(37)),y=x(n(38)),m=x(n(39)),g=x(n(40)),b=x(n(41));function x(t){return t&&t.__esModule?t:{default:t}}e.RNG=o.default,e.RNGFactory=i.default;var w=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e&&(0,u.default)(e,u.default.object.instanceOf(o.default)),this._cache={},this.use(e)}return r(t,[{key:"clone",value:function(){return new t(arguments.length?i.default.apply(void 0,arguments):this.rng.clone())}},{key:"use",value:function(){this._rng=i.default.apply(void 0,arguments)}},{key:"patch",value:function(){if(this._patch)throw new Error("Math.random already patched");this._patch=Math.random,Math.random=this.uniform()}},{key:"unpatch",value:function(){this._patch&&(Math.random=this._patch,delete this._patch)}},{key:"next",value:function(){return this._rng.next()}},{key:"float",value:function(t,e){return this.uniform(t,e)()}},{key:"int",value:function(t,e){return this.uniformInt(t,e)()}},{key:"integer",value:function(t,e){return this.uniformInt(t,e)()}},{key:"bool",value:function(){return this.uniformBoolean()()}},{key:"boolean",value:function(){return this.uniformBoolean()()}},{key:"uniform",value:function(t,e){return this._memoize("uniform",a.default,t,e)}},{key:"uniformInt",value:function(t,e){return this._memoize("uniformInt",c.default,t,e)}},{key:"uniformBoolean",value:function(){return this._memoize("uniformBoolean",f.default)}},{key:"normal",value:function(t,e){return(0,l.default)(this,t,e)}},{key:"logNormal",value:function(t,e){return(0,s.default)(this,t,e)}},{key:"bernoulli",value:function(t){return(0,d.default)(this,t)}},{key:"binomial",value:function(t,e){return(0,v.default)(this,t,e)}},{key:"geometric",value:function(t){return(0,p.default)(this,t)}},{key:"poisson",value:function(t){return(0,h.default)(this,t)}},{key:"exponential",value:function(t){return(0,y.default)(this,t)}},{key:"irwinHall",value:function(t){return(0,m.default)(this,t)}},{key:"bates",value:function(t){return(0,g.default)(this,t)}},{key:"pareto",value:function(t){return(0,b.default)(this,t)}},{key:"_memoize",value:function(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),u=2;u<n;u++)r[u-2]=arguments[u];var o=""+r.join(";"),i=this._cache[t];return void 0!==i&&i.key===o||(i={key:o,distribution:e.apply(void 0,[this].concat(r))},this._cache[t]=i),i.distribution}},{key:"rng",get:function(){return this._rng}}]),t}();e.default=new w},function(t,e,n){var r=n(11),u=n(12),o=n(13),i=n(14);t.exports=function(t){return r(t)||u(t)||o(t)||i()}},function(t,e,n){var r=n(8);t.exports=function(t){if(Array.isArray(t))return r(t)}},function(t,e){t.exports=function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,e,n){var r=n(8);t.exports=function(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e,n){"use strict";var r=n(5)({positive:function(t){return t>0},negative:function(t){return t<0},nonNegative:function(t){return t>=0},integer:function(t){return t===(0|t)}},n(4).func,{is:function(t){return t},eq:function(t){return function(e){return e===t}},gt:function(t){return function(e){return e>t}},gte:function(t){return function(e){return e>=t}},lt:function(t){return function(e){return e<t}},lte:function(t){return function(e){return e<=t}}});t.exports={predicates:r,validator:function(t){return"number"===typeof t}}},function(t,e,n){"use strict";var r=n(5)({empty:function(t){return""===t},nonEmpty:function(t){return""!==t}},n(4).func,{is:function(t){return t},eq:function(t){return function(e){return e===t}},length:function(t){return function(e){return e.length===t}},minLength:function(t){return function(e){return e.length>=t}},maxLength:function(t){return function(e){return e.length<=t}},matches:function(t){return function(e){return t.test(e)}},startsWith:function(t){return function(e){return e.startsWith(t)}},endsWith:function(t){return function(e){return e.endsWith(t)}}});t.exports={predicates:r,validator:function(t){return"string"===typeof t}}},function(t,e,n){"use strict";var r=n(5)({plain:function(t){if("object"!==typeof t)return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.getPrototypeOf({})},empty:function(t){return 0===Object.keys(t).length},nonEmpty:function(t){return Object.keys(t).length>0}},n(4).func,{is:function(t){return t},instanceOf:function(t){return function(e){return e instanceof t}}});t.exports={predicates:r,validator:function(t){return"object"===typeof t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=a(n(19)),o=a(n(6)),i=a(n(28));function a(t){return t&&t.__esModule?t:{default:t}}function c(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}e.default=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];var a=e[0],f=void 0===a?"default":a,l=e.slice(1);switch("undefined"===typeof f?"undefined":r(f)){case"object":if(f instanceof o.default)return f;break;case"function":return new i.default(f);case"string":case"number":return new i.default(u.default.apply(void 0,c(l)))}throw new Error('invalid RNG "'+f+'"')}},function(t,e,n){var r=n(20),u=n(21),o=n(22),i=n(23),a=n(24),c=n(25),f=n(26);f.alea=r,f.xor128=u,f.xorwow=o,f.xorshift7=i,f.xor4096=a,f.tychei=c,t.exports=f},function(t,e,n){(function(t){var r;!function(t,u,o){function i(t){var e=this,n=function(){var t=4022871197;return function(e){e=String(e);for(var n=0;n<e.length;n++){var r=.02519603282416938*(t+=e.charCodeAt(n));r-=t=r>>>0,t=(r*=t)>>>0,t+=4294967296*(r-=t)}return 2.3283064365386963e-10*(t>>>0)}}();e.next=function(){var t=2091639*e.s0+2.3283064365386963e-10*e.c;return e.s0=e.s1,e.s1=e.s2,e.s2=t-(e.c=0|t)},e.c=1,e.s0=n(" "),e.s1=n(" "),e.s2=n(" "),e.s0-=n(t),e.s0<0&&(e.s0+=1),e.s1-=n(t),e.s1<0&&(e.s1+=1),e.s2-=n(t),e.s2<0&&(e.s2+=1),n=null}function a(t,e){return e.c=t.c,e.s0=t.s0,e.s1=t.s1,e.s2=t.s2,e}function c(t,e){var n=new i(t),r=e&&e.state,u=n.next;return u.int32=function(){return 4294967296*n.next()|0},u.double=function(){return u()+11102230246251565e-32*(2097152*u()|0)},u.quick=u,r&&("object"==typeof r&&a(r,n),u.state=function(){return a(n,{})}),u}u&&u.exports?u.exports=c:n(1)&&n(3)?void 0===(r=function(){return c}.call(e,n,e,u))||(u.exports=r):this.alea=c}(0,t,n(1))}).call(this,n(2)(t))},function(t,e,n){(function(t){var r;!function(t,u,o){function i(t){var e=this,n="";e.x=0,e.y=0,e.z=0,e.w=0,e.next=function(){var t=e.x^e.x<<11;return e.x=e.y,e.y=e.z,e.z=e.w,e.w^=e.w>>>19^t^t>>>8},t===(0|t)?e.x=t:n+=t;for(var r=0;r<n.length+64;r++)e.x^=0|n.charCodeAt(r),e.next()}function a(t,e){return e.x=t.x,e.y=t.y,e.z=t.z,e.w=t.w,e}function c(t,e){var n=new i(t),r=e&&e.state,u=function(){return(n.next()>>>0)/4294967296};return u.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},u.int32=n.next,u.quick=u,r&&("object"==typeof r&&a(r,n),u.state=function(){return a(n,{})}),u}u&&u.exports?u.exports=c:n(1)&&n(3)?void 0===(r=function(){return c}.call(e,n,e,u))||(u.exports=r):this.xor128=c}(0,t,n(1))}).call(this,n(2)(t))},function(t,e,n){(function(t){var r;!function(t,u,o){function i(t){var e=this,n="";e.next=function(){var t=e.x^e.x>>>2;return e.x=e.y,e.y=e.z,e.z=e.w,e.w=e.v,(e.d=e.d+362437|0)+(e.v=e.v^e.v<<4^t^t<<1)|0},e.x=0,e.y=0,e.z=0,e.w=0,e.v=0,t===(0|t)?e.x=t:n+=t;for(var r=0;r<n.length+64;r++)e.x^=0|n.charCodeAt(r),r==n.length&&(e.d=e.x<<10^e.x>>>4),e.next()}function a(t,e){return e.x=t.x,e.y=t.y,e.z=t.z,e.w=t.w,e.v=t.v,e.d=t.d,e}function c(t,e){var n=new i(t),r=e&&e.state,u=function(){return(n.next()>>>0)/4294967296};return u.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},u.int32=n.next,u.quick=u,r&&("object"==typeof r&&a(r,n),u.state=function(){return a(n,{})}),u}u&&u.exports?u.exports=c:n(1)&&n(3)?void 0===(r=function(){return c}.call(e,n,e,u))||(u.exports=r):this.xorwow=c}(0,t,n(1))}).call(this,n(2)(t))},function(t,e,n){(function(t){var r;!function(t,u,o){function i(t){var e=this;e.next=function(){var t,n,r=e.x,u=e.i;return t=r[u],n=(t^=t>>>7)^t<<24,n^=(t=r[u+1&7])^t>>>10,n^=(t=r[u+3&7])^t>>>3,n^=(t=r[u+4&7])^t<<7,t=r[u+7&7],n^=(t^=t<<13)^t<<9,r[u]=n,e.i=u+1&7,n},function(t,e){var n,r=[];if(e===(0|e))r[0]=e;else for(e=""+e,n=0;n<e.length;++n)r[7&n]=r[7&n]<<15^e.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&0===r[n];++n);for(8==n?r[7]=-1:r[n],t.x=r,t.i=0,n=256;n>0;--n)t.next()}(e,t)}function a(t,e){return e.x=t.x.slice(),e.i=t.i,e}function c(t,e){null==t&&(t=+new Date);var n=new i(t),r=e&&e.state,u=function(){return(n.next()>>>0)/4294967296};return u.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},u.int32=n.next,u.quick=u,r&&(r.x&&a(r,n),u.state=function(){return a(n,{})}),u}u&&u.exports?u.exports=c:n(1)&&n(3)?void 0===(r=function(){return c}.call(e,n,e,u))||(u.exports=r):this.xorshift7=c}(0,t,n(1))}).call(this,n(2)(t))},function(t,e,n){(function(t){var r;!function(t,u,o){function i(t){var e=this;e.next=function(){var t,n,r=e.w,u=e.X,o=e.i;return e.w=r=r+1640531527|0,n=u[o+34&127],t=u[o=o+1&127],n^=n<<13,t^=t<<17,n^=n>>>15,t^=t>>>12,n=u[o]=n^t,e.i=o,n+(r^r>>>16)|0},function(t,e){var n,r,u,o,i,a=[],c=128;for(e===(0|e)?(r=e,e=null):(e+="\0",r=0,c=Math.max(c,e.length)),u=0,o=-32;o<c;++o)e&&(r^=e.charCodeAt((o+32)%e.length)),0===o&&(i=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,o>=0&&(i=i+1640531527|0,u=0==(n=a[127&o]^=r+i)?u+1:0);for(u>=128&&(a[127&(e&&e.length||0)]=-1),u=127,o=512;o>0;--o)r=a[u+34&127],n=a[u=u+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,a[u]=r^n;t.w=i,t.X=a,t.i=u}(e,t)}function a(t,e){return e.i=t.i,e.w=t.w,e.X=t.X.slice(),e}function c(t,e){null==t&&(t=+new Date);var n=new i(t),r=e&&e.state,u=function(){return(n.next()>>>0)/4294967296};return u.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},u.int32=n.next,u.quick=u,r&&(r.X&&a(r,n),u.state=function(){return a(n,{})}),u}u&&u.exports?u.exports=c:n(1)&&n(3)?void 0===(r=function(){return c}.call(e,n,e,u))||(u.exports=r):this.xor4096=c}(0,t,n(1))}).call(this,n(2)(t))},function(t,e,n){(function(t){var r;!function(t,u,o){function i(t){var e=this,n="";e.next=function(){var t=e.b,n=e.c,r=e.d,u=e.a;return t=t<<25^t>>>7^n,n=n-r|0,r=r<<24^r>>>8^u,u=u-t|0,e.b=t=t<<20^t>>>12^n,e.c=n=n-r|0,e.d=r<<16^n>>>16^u,e.a=u-t|0},e.a=0,e.b=0,e.c=-1640531527,e.d=1367130551,t===Math.floor(t)?(e.a=t/4294967296|0,e.b=0|t):n+=t;for(var r=0;r<n.length+20;r++)e.b^=0|n.charCodeAt(r),e.next()}function a(t,e){return e.a=t.a,e.b=t.b,e.c=t.c,e.d=t.d,e}function c(t,e){var n=new i(t),r=e&&e.state,u=function(){return(n.next()>>>0)/4294967296};return u.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},u.int32=n.next,u.quick=u,r&&("object"==typeof r&&a(r,n),u.state=function(){return a(n,{})}),u}u&&u.exports?u.exports=c:n(1)&&n(3)?void 0===(r=function(){return c}.call(e,n,e,u))||(u.exports=r):this.tychei=c}(0,t,n(1))}).call(this,n(2)(t))},function(t,e,n){var r;!function(u,o,i){var a,c=256,f=i.pow(c,6),l=i.pow(2,52),s=2*l,d=255;function v(t,e,n){var r=[],d=m(y((e=1==e?{entropy:!0}:e||{}).entropy?[t,g(o)]:null==t?function(){try{var t;return a&&(t=a.randomBytes)?t=t(c):(t=new Uint8Array(c),(u.crypto||u.msCrypto).getRandomValues(t)),g(t)}catch(r){var e=u.navigator,n=e&&e.plugins;return[+new Date,u,n,u.screen,g(o)]}}():t,3),r),v=new p(r),b=function(){for(var t=v.g(6),e=f,n=0;t<l;)t=(t+n)*c,e*=c,n=v.g(1);for(;t>=s;)t/=2,e/=2,n>>>=1;return(t+n)/e};return b.int32=function(){return 0|v.g(4)},b.quick=function(){return v.g(4)/4294967296},b.double=b,m(g(v.S),o),(e.pass||n||function(t,e,n,r){return r&&(r.S&&h(r,v),t.state=function(){return h(v,{})}),n?(i.random=t,e):t})(b,d,"global"in e?e.global:this==i,e.state)}function p(t){var e,n=t.length,r=this,u=0,o=r.i=r.j=0,i=r.S=[];for(n||(t=[n++]);u<c;)i[u]=u++;for(u=0;u<c;u++)i[u]=i[o=d&o+t[u%n]+(e=i[u])],i[o]=e;(r.g=function(t){for(var e,n=0,u=r.i,o=r.j,i=r.S;t--;)e=i[u=d&u+1],n=n*c+i[d&(i[u]=i[o=d&o+e])+(i[o]=e)];return r.i=u,r.j=o,n})(c)}function h(t,e){return e.i=t.i,e.j=t.j,e.S=t.S.slice(),e}function y(t,e){var n,r=[],u=typeof t;if(e&&"object"==u)for(n in t)try{r.push(y(t[n],e-1))}catch(o){}return r.length?r:"string"==u?t:t+"\0"}function m(t,e){for(var n,r=t+"",u=0;u<r.length;)e[d&u]=d&(n^=19*e[d&u])+r.charCodeAt(u++);return g(e)}function g(t){return String.fromCharCode.apply(0,t)}if(m(i.random(),o),t.exports){t.exports=v;try{a=n(27)}catch(b){}}else void 0===(r=function(){return v}.call(e,n,e,t))||(t.exports=r)}("undefined"!==typeof self?self:this,[],Math)},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=o(n(0));function o(t){return t&&t.__esModule?t:{default:t}}var i=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return r.seed(t,n),r}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"next",value:function(){return this._rng()}},{key:"seed",value:function(t){(0,u.default)(t,u.default.function),this._rng=t}},{key:"clone",value:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return new(Function.prototype.bind.apply(e,[null].concat([this._rng],n)))}},{key:"name",get:function(){return"function"}}]),e}(o(n(6)).default);e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t,e,n){return void 0===n&&(n=void 0===e?1:e,e=0),(0,o.default)(e,o.default.number),(0,o.default)(n,o.default.number),function(){return t.next()*(n-e)+e}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t,e,n){return void 0===n&&(n=void 0===e?1:e,e=0),(0,o.default)(e,o.default.number.integer),(0,o.default)(n,o.default.number.integer),function(){return t.next()*(n-e+1)+e|0}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return function(){return t.next()>=.5}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return(0,o.default)(e,o.default.number),(0,o.default)(n,o.default.number),function(){var r=void 0,u=void 0,o=void 0;do{o=(r=2*t.next()-1)*r+(u=2*t.next()-1)*u}while(!o||o>1);return e+n*u*Math.sqrt(-2*Math.log(o)/o)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var u=t.normal.apply(t,n);return function(){return Math.exp(u())}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.5;return(0,o.default)(e,o.default.number.gte(0).lt(1)),function(){return t.next()+e|0}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5;return(0,o.default)(e,o.default.number.positive.integer),(0,o.default)(n,o.default.number.gte(0).lte(1)),function(){for(var r=0,u=0;r++<e;)u+=t.next()<n;return u}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.5;(0,o.default)(e,o.default.number.gt(0).lte(1));var n=1/Math.log(1-e);return function(){return 1+Math.log(t.next())*n|0}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};var i=[0,0,.6931471805599453,1.791759469228055,3.1780538303479458,4.787491742782046,6.579251212010101,8.525161361065415,10.60460290274525,12.801827480081469],a=function(t){return i[t]},c=.9189385332046727;e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if((0,o.default)(e,o.default.number.positive),e<10){var n=Math.exp(-e);return function(){for(var r=n,u=0,o=t.next();o>r;)o-=r,r=e*r/++u;return u}}var r=Math.sqrt(e),u=.931+2.53*r,i=.02483*u-.059,f=1.1239+1.1328/(u-3.4),l=.9277-3.6224/(u-2);return function(){for(;;){var n=void 0,o=t.next();if(o<=.86*l)return n=o/l-.43,Math.floor((2*i/(.5-Math.abs(n))+u)*n+e+.445);o>=l?n=t.next()-.5:(n=((n=o/l-.93)<0?-.5:.5)-n,o=t.next()*l);var s=.5-Math.abs(n);if(!(s<.013&&o>s)){var d=0|Math.floor((2*i/s+u)*n+e+.445);if(o=o*f/(i/(s*s)+u),d>=10){var v=(d+.5)*Math.log(e/d)-e-c+d-(1/12-(1/360-1/(1260*d*d))/(d*d))/d;if(Math.log(o*r)<=v)return d}else if(d>=0&&Math.log(o)<=d*Math.log(e)-e-a(d))return d}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return(0,o.default)(e,o.default.number.positive),function(){return-Math.log(1-t.next())/e}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return(0,o.default)(e,o.default.number.integer.gte(0)),function(){for(var n=0,r=0;r<e;++r)n+=t.next();return n}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;(0,o.default)(e,o.default.number.integer.positive);var n=t.irwinHall(e);return function(){return n()/e}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;(0,o.default)(e,o.default.number.gte(0));var n=1/e;return function(){return 1/Math.pow(1-t.next(),n)}}},function(t,e,n){"use strict";function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function o(t,e,n){return(o=u()?Reflect.construct:function(t,e,n){var u=[null];u.push.apply(u,e);var o=new(Function.bind.apply(t,u));return n&&r(o,n.prototype),o}).apply(null,arguments)}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t,e){if(t){if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function f(t){return function(t){if(Array.isArray(t))return i(t)}(t)||a(t)||c(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t){return function(t){if(Array.isArray(t))return t}(t)||a(t)||c(t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function v(t,e,n){return e&&d(t.prototype,e),n&&d(t,n),t}n.r(e),n.d(e,"runExperiments",(function(){return P}));var p=n(7),h=n.n(p),y=function(t){return Array.from(Array(t).keys())},m=function(t){return t[Math.floor(Math.random()*t.length)]},g=function(t){var e=Number.NEGATIVE_INFINITY,n=[];return t.forEach((function(t,r){t>e?(e=t,n=[r]):t===e&&n.push(r)})),1===n.length?n[0]:m(n)},b=function(){function t(){s(this,t)}return v(t,[{key:"selectAction",value:function(t,e,n,r){return g(n)}},{key:"name",get:function(){return"greedy"}}]),t}(),x=function(){function t(e){s(this,t),this.epsilon=e}return v(t,[{key:"selectAction",value:function(t,e,n,r){return Math.random()<this.epsilon?m(t):g(n)}},{key:"name",get:function(){return"\u03b5-greedy, \u03b5 = ".concat(this.epsilon)}}]),t}(),w=function(){function t(e){s(this,t),this.c=e}return v(t,[{key:"selectAction",value:function(t,e,n,r){return g(this.ucb(e,n,r))}},{key:"ucb",value:function(t,e,n){var r=this;return e.map((function(e,u){var o=t[u];return 0===o?Number.MAX_VALUE:e+r.c*Math.sqrt(Math.log(n)/o)}))}},{key:"name",get:function(){return"UCB, c = ".concat(this.c)}}]),t}(),_=function(t){return function(e){return t}},k=function(t){return 1/t},A=function(){function t(e,n,r,u){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;s(this,t),this.actions=e,this.actionSelector=n,this.stepSizeCalculator=r,this.colour=u,this.initialValue=o,this.ns=[],this.qs=[]}return v(t,[{key:"reset",value:function(){this.ns=Array(this.actions.length).fill(0),this.qs=Array(this.actions.length).fill(this.initialValue)}},{key:"update",value:function(t,e){var n=this.ns[t]+1;this.ns[t]=n;var r=this.qs[t],u=r+this.stepSizeCalculator(n)*(e-r);this.qs[t]=u}},{key:"name",get:function(){return this.actionSelector.name}}]),t}(),M=function(){function t(e){s(this,t),this.steps=e,this.reset()}return v(t,[{key:"reset",value:function(){this.runningAverageReward=Array(this.steps).fill(0),this.runningAveragePercentOptimalAction=Array(this.steps).fill(0)}},{key:"update",value:function(t,e,n,r){this.updateRunningAverageReward(t,e,n),this.updateRunningAveragePercentOptimalAction(t,e,r)}},{key:"updateRunningAverageReward",value:function(t,e,n){var r=this.runningAverageReward[t],u=r+1/e*(n-r);this.runningAverageReward[t]=u}},{key:"updateRunningAveragePercentOptimalAction",value:function(t,e,n){var r=n?100:0,u=this.runningAveragePercentOptimalAction[t],o=u+1/e*(r-u);this.runningAveragePercentOptimalAction[t]=o}}]),t}(),j=function(){function t(e){s(this,t),this.armDistributions=t.makeArmDistributions(e);var n=this.armDistributions.map((function(t){return t.trueValue}));this.optimalArm=g(n)}return v(t,null,[{key:"makeArmDistributions",value:function(e){return t.makeTrueValues(e).map((function(t,e){var n=t;return{arm:e,trueValue:t,normal:h.a.normal(n,1)}}))}},{key:"makeTrueValues",value:function(t){var e=h.a.normal(0,1);return y(t).map(e)}}]),t}(),O=function(t,e){return new A(e,function(t){var e=l(t.actionSelector),n=e[0],r=e.slice(1);switch(n){case"GreedyActionSelector":return o(b,f(r));case"EpsilonGreedyActionSelector":return o(x,f(r));case"UCBActionSelector":return o(w,f(r));default:throw new Error('Unexpected actionSelectorName, "'.concat(n,'"'))}}(t),function(t){var e=l(t.stepSizeCalculator),n=e[0],r=e.slice(1);switch(n){case"decayingStepSizeCalculator":return k;case"constantStepSizeCalculator":return _.apply(void 0,f(r));default:throw new Error('Unexpected stepSizeCalculatorName, "'.concat(n,'"'))}}(t),t.colour,t.initialValue)},P=function(t,e){var n=performance.now(),r=t.experimentsConfig,u=t.K,o=t.ACTIONS,i=t.RUNS,a=t.STEPS,c=r.map((function(t){return O(t,o)})),f=c.map((function(){return new M(a)}));y(i).forEach((function(t){var n=t+1,r=new j(u);c.forEach((function(t){return t.reset()})),y(a).map((function(t){return c.map((function(e){return function(t,e,n){var r=e.actionSelector.selectAction(e.actions,e.ns,e.qs,n),u=t.armDistributions[r].normal();return e.update(r,u),{reward:u,isOptimal:r===t.optimalArm}}(r,e,t+1)}))})).forEach((function(t,e){t.forEach((function(t,r){var u=t.reward,o=t.isOptimal;f[r].update(e,n,u,o)}))})),postMessage({type:"runExperimentsRunCompleted",workerIndex:e})})),postMessage({type:"runExperimentsResults",workerIndex:e,results:f.map((function(t){return{averageRewards:t.runningAverageReward,averagePercentOptimalActions:t.runningAveragePercentOptimalAction}}))});var l=performance.now()-n;console.log("worker[".concat(e,"] elapsedTime: ").concat(l))};addEventListener("message",(function(t){var n,r=t.data,u=r.type,o=r.method,i=r.id,a=r.params;"RPC"===u&&o&&((n=e[o])?Promise.resolve().then((function(){return n.apply(e,a)})):Promise.reject("No such method")).then((function(t){postMessage({type:"RPC",id:i,result:t})})).catch((function(t){var e={message:t};t.stack&&(e.message=t.message,e.stack=t.stack,e.name=t.name),postMessage({type:"RPC",id:i,error:e})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=72071a34b129e22549c7.worker.js.map