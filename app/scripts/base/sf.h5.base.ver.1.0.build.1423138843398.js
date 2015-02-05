/* Zepto 1.1.6 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function _(t){return null!=t&&t==t.window}function $(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function M(t){return D(t)&&!_(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(M(i[e])||A(i[e]))?(M(i[e])&&!M(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),M(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return $(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=_,n.isArray=A,n.isPlainObject=M,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!$(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!$(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){X(this,t)},this)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[C(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[C(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return W(this,"");i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),W(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?_(s)?s["inner"+i]:$(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),x(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),x(e,n,i)}function x(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function b(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function j(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function S(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:b,success:b,error:b,complete:b,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),j(o);var u=o.dataType,f=/\?.+=\?/.test(o.url);if(f&&(u="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=u&&"jsonp"!=u)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==u)return f||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var C,h=o.accepts[u],p={},m=function(t,e){p[t.toLowerCase()]=[t,e]},x=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),T=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||m("X-Requested-With","XMLHttpRequest"),m("Accept",h||"*/*"),(h=o.mimeType||h)&&(h.indexOf(",")>-1&&(h=h.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(h)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&m("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)m(r,o.headers[r]);if(S.setRequestHeader=m,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=b,clearTimeout(C);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==x){u=u||w(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==u?(1,eval)(e):"xml"==u?e=S.responseXML:"json"==u&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var N="async"in o?o.async:!0;S.open(o.type,o.url,N,o.username,o.password);for(r in p)T.apply(S,p[r]);return o.timeout>0&&(C=setTimeout(function(){S.onreadystatechange=b,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(S.apply(null,arguments))},t.post=function(){var e=S.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=S.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=S(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(T(e)+"="+T(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);
define("zepto", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.zepto;
    };
}(this)));

/*!
 * CanJS - 2.1.3
 * http://canjs.us/
 * Copyright (c) 2014 Bitovi
 * Mon, 25 Aug 2014 21:51:36 GMT
 * Licensed MIT
 * Includes: can/component,can/construct,can/map,can/list,can/observe,can/compute,can/model,can/view,can/control,can/route,can/control/route,can/view/mustache,can/view/bindings,can/view/live,can/view/scope,can/util/string,can/util/attr
 * Download from: http://canjs.com
 */
// (function(undefined) {
define('can', ['zepto'], function (zepto) {

    // ## util/can.js
    var __m3 = (function() {

        var can = window.can || {};
        if (typeof GLOBALCAN === 'undefined' || GLOBALCAN !== false) {
            window.can = can;
        }

        // An empty function useful for where you need a dummy callback.
        can.k = function() {};

        can.isDeferred = function(obj) {
            // Returns `true` if something looks like a deferred.
            return obj && typeof obj.then === "function" && typeof obj.pipe === "function";
        };

        var cid = 0;
        can.cid = function(object, name) {
            if (!object._cid) {
                cid++;
                object._cid = (name || '') + cid;
            }
            return object._cid;
        };
        can.VERSION = '2.1.3';

        can.simpleExtend = function(d, s) {
            for (var prop in s) {
                d[prop] = s[prop];
            }
            return d;
        };

        can.frag = function(item) {
            var frag;
            if (!item || typeof item === "string") {
                frag = can.buildFragment(item == null ? "" : "" + item, document.body);
                // If we have an empty frag...
                if (!frag.childNodes.length) {
                    frag.appendChild(document.createTextNode(''));
                }
                return frag;
            } else if (item.nodeType === 11) {
                return item;
            } else if (typeof item.nodeType === "number") {
                frag = document.createDocumentFragment();
                frag.appendChild(item);
                return frag;
            } else if (typeof item.length === "number") {
                frag = document.createDocumentFragment();
                can.each(item, function(item) {
                    frag.appendChild(can.frag(item));
                });
                return frag;
            } else {
                frag = can.buildFragment("" + item, document.body);
                // If we have an empty frag...
                if (!frag.childNodes.length) {
                    frag.appendChild(document.createTextNode(''));
                }
                return frag;
            }
        };

        // this is here in case can.compute hasn't loaded
        can.__reading = function() {};

        return can;
    })();

    // ## util/attr/attr.js
    var __m4 = (function(can) {

        // Acts as a polyfill for setImmediate which only works in IE 10+. Needed to make
        // the triggering of `attributes` event async.
        var setImmediate = window.setImmediate || function(cb) {
                return setTimeout(cb, 0);
            },
            attr = {
                // This property lets us know if the browser supports mutation observers.
                // If they are supported then that will be setup in can/util/jquery and those native events will be used to inform observers of attribute changes.
                // Otherwise this module handles triggering an `attributes` event on the element.
                MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,


                map: {
                    "class": "className",
                    "value": "value",
                    "innerText": "innerText",
                    "textContent": "textContent",
                    "checked": true,
                    "disabled": true,
                    "readonly": true,
                    "required": true,
                    // For the `src` attribute we are using a setter function to prevent values such as an empty string or null from being set.
                    // An `img` tag attempts to fetch the `src` when it is set, so we need to prevent that from happening by removing the attribute instead.
                    src: function(el, val) {
                        if (val == null || val === "") {
                            el.removeAttribute("src");
                            return null;
                        } else {
                            el.setAttribute("src", val);
                            return val;
                        }
                    },
                    style: function(el, val) {
                        return el.style.cssText = val || "";
                    }
                },
                // These are elements whos default value we should set.
                defaultValue: ["input", "textarea"],
                // ## attr.set
                // Set the value an attribute on an element.
                set: function(el, attrName, val) {
                    var oldValue;
                    // In order to later trigger an event we need to compare the new value to the old value, so here we go ahead and retrieve the old value for browsers that don't have native MutationObservers.
                    if (!attr.MutationObserver) {
                        oldValue = attr.get(el, attrName);
                    }

                    var tagName = el.nodeName.toString()
                        .toLowerCase(),
                        prop = attr.map[attrName],
                        newValue;

                    // Using the property of `attr.map`, go through and check if the property is a function, and if so call it. Then check if the property is `true`, and if so set the value to `true`, also making sure to set `defaultChecked` to `true` for elements of `attr.defaultValue`. We always set the value to true because for these boolean properties, setting them to false would be the same as removing the attribute.
                    // For all other attributes use `setAttribute` to set the new value.
                    if (typeof prop === "function") {
                        newValue = prop(el, val);
                    } else if (prop === true) {
                        newValue = el[attrName] = true;

                        if (attrName === "checked" && el.type === "radio") {
                            if (can.inArray(tagName, attr.defaultValue) >= 0) {
                                el.defaultChecked = true;
                            }
                        }

                    } else if (prop) {
                        newValue = el[prop] = val;
                        if (prop === "value" && can.inArray(tagName, attr.defaultValue) >= 0) {
                            el.defaultValue = val;
                        }
                    } else {
                        el.setAttribute(attrName, val);
                        newValue = val;
                    }

                    // Now that the value has been set, for browsers without MutationObservers, check to see that value has changed and if so trigger the "attributes" event on the element.
                    if (!attr.MutationObserver && newValue !== oldValue) {
                        attr.trigger(el, attrName, oldValue);
                    }
                },
                // ## attr.trigger
                // Used to trigger an "attributes" event on an element. Checks to make sure that someone is listening for the event and then queues a function to be called asynchronously using `setImmediate.
                trigger: function(el, attrName, oldValue) {
                    if (can.data(can.$(el), "canHasAttributesBindings")) {
                        return setImmediate(function() {
                            can.trigger(el, {
                                    type: "attributes",
                                    attributeName: attrName,
                                    target: el,
                                    oldValue: oldValue,
                                    bubbles: false
                                }, []);
                        });
                    }
                },
                // ## attr.get
                // Gets the value of an attribute. First checks to see if the property is a string on `attr.map` and if so returns the value from the element's property. Otherwise uses `getAttribute` to retrieve the value.
                get: function(el, attrName) {
                    var prop = attr.map[attrName];
                    if (typeof prop === "string" && el[prop]) {
                        return el[prop];
                    }

                    return el.getAttribute(attrName);
                },
                // ## attr.remove
                // Removes an attribute from an element. Works by using the `attr.map` to see if the attribute is a special type of property. If the property is a function then the fuction is called with `undefined` as the value. If the property is `true` then the attribute is set to false. If the property is a string then the attribute is set to an empty string. Otherwise `removeAttribute` is used.
                // If the attribute previously had a value and the browser doesn't support MutationObservers we then trigger an "attributes" event.
                remove: function(el, attrName) {
                    var oldValue;
                    if (!attr.MutationObserver) {
                        oldValue = attr.get(el, attrName);
                    }

                    var setter = attr.map[attrName];
                    if (typeof setter === "function") {
                        setter(el, undefined);
                    }
                    if (setter === true) {
                        el[attrName] = false;
                    } else if (typeof setter === "string") {
                        el[setter] = "";
                    } else {
                        el.removeAttribute(attrName);
                    }
                    if (!attr.MutationObserver && oldValue != null) {
                        attr.trigger(el, attrName, oldValue);
                    }

                },
                // ## attr.has
                // Checks if an element contains an attribute.
                // For browsers that support `hasAttribute`, creates a function that calls hasAttribute, otherwise creates a function that uses `getAttribute` to check that the attribute is not null.
                has: (function() {
                    var el = document.createElement('div');
                    if (el.hasAttribute) {
                        return function(el, name) {
                            return el.hasAttribute(name);
                        };
                    } else {
                        return function(el, name) {
                            return el.getAttribute(name) !== null;
                        };
                    }
                })()
            };

        return attr;

    })(__m3);

    // ## event/event.js
    var __m5 = (function(can) {
        // ## can.event.addEvent
        // Adds a basic event listener to an object.
        // This consists of storing a cache of event listeners on each object,
        // that are iterated through later when events are dispatched.

        can.addEvent = function(event, handler) {
            // Initialize event cache.
            var allEvents = this.__bindEvents || (this.__bindEvents = {}),
                eventList = allEvents[event] || (allEvents[event] = []);

            // Add the event
            eventList.push({
                    handler: handler,
                    name: event
                });
            return this;
        };

        // ## can.event.listenTo
        // Listens to an event without know how bind is implemented.
        // The primary use for this is to listen to another's objects event while
        // tracking events on the local object (similar to namespacing).
        // The API was heavily influenced by BackboneJS: http://backbonejs.org/

        can.listenTo = function(other, event, handler) {
            // Initialize event cache
            var idedEvents = this.__listenToEvents;
            if (!idedEvents) {
                idedEvents = this.__listenToEvents = {};
            }

            // Identify the other object
            var otherId = can.cid(other);
            var othersEvents = idedEvents[otherId];

            // Create a local event cache
            if (!othersEvents) {
                othersEvents = idedEvents[otherId] = {
                    obj: other,
                    events: {}
                };
            }
            var eventsEvents = othersEvents.events[event];
            if (!eventsEvents) {
                eventsEvents = othersEvents.events[event] = [];
            }

            // Add the event, both locally and to the other object
            eventsEvents.push(handler);
            can.bind.call(other, event, handler);
        };

        // ## can.event.stopListening
        // Stops listening for events on other objects

        can.stopListening = function(other, event, handler) {
            var idedEvents = this.__listenToEvents,
                iterIdedEvents = idedEvents,
                i = 0;
            if (!idedEvents) {
                return this;
            }
            if (other) {
                var othercid = can.cid(other);
                (iterIdedEvents = {})[othercid] = idedEvents[othercid];
                // you might be trying to listen to something that is not there
                if (!idedEvents[othercid]) {
                    return this;
                }
            }

            // Clean up events on the other object
            for (var cid in iterIdedEvents) {
                var othersEvents = iterIdedEvents[cid],
                    eventsEvents;
                other = idedEvents[cid].obj;

                // Find the cache of events
                if (!event) {
                    eventsEvents = othersEvents.events;
                } else {
                    (eventsEvents = {})[event] = othersEvents.events[event];
                }

                // Unbind event handlers, both locally and on the other object
                for (var eventName in eventsEvents) {
                    var handlers = eventsEvents[eventName] || [];
                    i = 0;
                    while (i < handlers.length) {
                        if (handler && handler === handlers[i] || !handler) {
                            can.unbind.call(other, eventName, handlers[i]);
                            handlers.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    // no more handlers?
                    if (!handlers.length) {
                        delete othersEvents.events[eventName];
                    }
                }
                if (can.isEmptyObject(othersEvents.events)) {
                    delete idedEvents[cid];
                }
            }
            return this;
        };

        // ## can.event.removeEvent
        // Removes a basic event listener from an object.
        // This removes event handlers from the cache of listened events.

        can.removeEvent = function(event, fn, __validate) {
            if (!this.__bindEvents) {
                return this;
            }
            var events = this.__bindEvents[event] || [],
                i = 0,
                ev, isFunction = typeof fn === 'function';
            while (i < events.length) {
                ev = events[i];
                // Determine whether this event handler is "equivalent" to the one requested
                // Generally this requires the same event/function, but a validation function
                // can be included for extra conditions. This is used in some plugins like `can/event/namespace`.
                if (__validate ? __validate(ev, event, fn) : isFunction && ev.handler === fn || !isFunction && (ev.cid === fn || !fn)) {
                    events.splice(i, 1);
                } else {
                    i++;
                }
            }
            return this;
        };

        // ## can.event.dispatch
        // Dispatches/triggers a basic event on an object.

        can.dispatch = function(event, args) {
            var events = this.__bindEvents;
            if (!events) {
                return;
            }

            // Initialize the event object
            if (typeof event === 'string') {
                event = {
                    type: event
                };
            }

            // Grab event listeners
            var eventName = event.type,
                handlers = (events[eventName] || []).slice(0),
                passed = [event];

            // Execute handlers listening for this event.
            if (args) {
                passed.push.apply(passed, args);
            }

            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].handler.apply(this, passed);
            }

            return event;
        };

        // ## can.event.one
        // Adds a basic event listener that listens to an event once and only once.

        can.one = function(event, handler) {
            // Unbind the listener after it has been executed
            var one = function() {
                can.unbind.call(this, event, one);
                return handler.apply(this, arguments);
            };

            // Bind the altered listener
            can.bind.call(this, event, one);
            return this;
        };

        // ## can.event
        // Create and export the `can.event` mixin
        can.event = {
            // Event method aliases

            on: function() {
                if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                    return can.Control.prototype.on.call(this);
                } else {
                    return can.addEvent.apply(this, arguments);
                }
            },


            off: function() {
                if (arguments.length === 0 && can.Control && this instanceof can.Control) {
                    return can.Control.prototype.off.call(this);
                } else {
                    return can.removeEvent.apply(this, arguments);
                }
            },


            bind: can.addEvent,

            unbind: can.removeEvent,

            delegate: function(selector, event, handler) {
                return can.addEvent.call(this, event, handler);
            },

            undelegate: function(selector, event, handler) {
                return can.removeEvent.call(this, event, handler);
            },

            trigger: can.dispatch,

            // Normal can/event methods
            one: can.one,
            addEvent: can.addEvent,
            removeEvent: can.removeEvent,
            listenTo: can.listenTo,
            stopListening: can.stopListening,
            dispatch: can.dispatch
        };

        return can.event;
    })(__m3);

    // ## util/object/isplain/isplain.js
    var __m7 = (function(can) {
        var core_hasOwn = Object.prototype.hasOwnProperty,
            isWindow = function(obj) {
                // In IE8 window.window !== window.window, so we allow == here.

                return obj !== null && obj == obj.window;
            }, isPlainObject = function(obj) {
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
                    return false;
                }
                try {
                    // Not own constructor property must be Object
                    if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                        return false;
                    }
                } catch (e) {
                    // IE8,9 Will throw exceptions on certain host objects #9897
                    return false;
                }
                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.
                var key;
                for (key in obj) {}
                return key === undefined || core_hasOwn.call(obj, key);
            };
        can.isPlainObject = isPlainObject;
        return can;
    })(__m3);

    // ## util/fragment.js
    var __m8 = (function(can) {
        // fragment.js
        // ---------
        // _DOM Fragment support._
        var fragmentRE = /^\s*<(\w+)[^>]*>/,
            toString = {}.toString,
            fragment = function(html, name) {
                if (name === undefined) {
                    name = fragmentRE.test(html) && RegExp.$1;
                }
                if (html && toString.call(html.replace) === "[object Function]") {
                    // Fix "XHTML"-style tags in all browsers
                    html = html.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, '<$1></$2>');
                }
                var container = document.createElement('div'),
                    temp = document.createElement('div');
                // IE's parser will strip any `<tr><td>` tags when `innerHTML`
                // is called on a `tbody`. To get around this, we construct a
                // valid table with a `tbody` that has the `innerHTML` we want.
                // Then the container is the `firstChild` of the `tbody`.
                // [source](http://www.ericvasilik.com/2006/07/code-karma.html).
                if (name === 'tbody' || name === 'tfoot' || name === 'thead') {
                    temp.innerHTML = '<table>' + html + '</table>';
                    container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
                } else if (name === 'tr') {
                    temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                    container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
                } else if (name === 'td' || name === 'th') {
                    temp.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
                    container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild.firstChild;
                } else if (name === 'option') {
                    temp.innerHTML = '<select>' + html + '</select>';
                    container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
                } else {
                    container.innerHTML = '' + html;
                }
                // IE8 barfs if you pass slice a `childNodes` object, so make a copy.
                var tmp = {}, children = container.childNodes;
                tmp.length = children.length;
                for (var i = 0; i < children.length; i++) {
                    tmp[i] = children[i];
                }
                return [].slice.call(tmp);
            };
        can.buildFragment = function(html, nodes) {
            if (html && html.nodeType === 11) {
                return html;
            }
            var parts = fragment(html),
                frag = document.createDocumentFragment();
            for (var i = 0, length = parts.length; i < length; i++) {
                frag.appendChild(parts[i]);
            }
            return frag;
        };

        // ## Fix build fragment.
        // In IE8, we can pass a fragment and it removes newlines.
        // This checks for that and replaces can.buildFragment with something
        // that if only a single text node is returned, returns a fragment with
        // a text node that is set to the content.
        (function() {
            var text = "<-\n>",
                frag = can.buildFragment(text, document);
            if (text !== frag.childNodes[0].nodeValue) {
                var oldBuildFragment = can.buildFragment;
                can.buildFragment = function(html, nodes) {
                    var res = oldBuildFragment(html, nodes);
                    if (res.childNodes.length === 1 && res.childNodes[0].nodeType === 3) {
                        res.childNodes[0].nodeValue = html;
                    }
                    return res;
                };

            }
        })();

        return can;
    })(__m3);

    // ## util/deferred.js
    var __m9 = (function(can) {
        // deferred.js
        // ---------
        // _Lightweight, jQuery style deferreds._
        // extend is usually provided by the wrapper but to avoid steal.then calls
        // we define a simple extend here as well
        var extend = function(target, src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    target[key] = src[key];
                }
            }
        }, Deferred = function(func) {
                if (!(this instanceof Deferred)) {
                    return new Deferred();
                }
                this._doneFuncs = [];
                this._failFuncs = [];
                this._resultArgs = null;
                this._status = '';
                // Check for option `function` -- call it with this as context and as first
                // parameter, as specified in jQuery API.
                if (func) {
                    func.call(this, this);
                }
            };
        can.Deferred = Deferred;
        can.when = Deferred.when = function() {
            var args = can.makeArray(arguments);
            if (args.length < 2) {
                var obj = args[0];
                if (obj && (can.isFunction(obj.isResolved) && can.isFunction(obj.isRejected))) {
                    return obj;
                } else {
                    return Deferred()
                        .resolve(obj);
                }
            } else {
                var df = Deferred(),
                    done = 0,
                    // Resolve params -- params of each resolve, we need to track them down
                    // to be able to pass them in the correct order if the master
                    // needs to be resolved.
                    rp = [];
                can.each(args, function(arg, j) {
                    arg.done(function() {
                        rp[j] = arguments.length < 2 ? arguments[0] : arguments;
                        if (++done === args.length) {
                            df.resolve.apply(df, rp);
                        }
                    })
                        .fail(function() {
                            df.reject(arguments.length === 1 ? arguments[0] : arguments);
                        });
                });
                return df;
            }
        };
        var resolveFunc = function(type, _status) {
            return function(context) {
                var args = this._resultArgs = arguments.length > 1 ? arguments[1] : [];
                return this.exec(context, this[type], args, _status);
            };
        }, doneFunc = function doneFunc(type, _status) {
                return function() {
                    var self = this;
                    // In Safari, the properties of the `arguments` object are not enumerable,
                    // so we have to convert arguments to an `Array` that allows `can.each` to loop over them.
                    can.each(Array.prototype.slice.call(arguments), function(v, i, args) {
                        if (!v) {
                            return;
                        }
                        if (v.constructor === Array) {
                            doneFunc.apply(self, v);
                        } else {
                            // Immediately call the `function` if the deferred has been resolved.
                            if (self._status === _status) {
                                v.apply(self, self._resultArgs || []);
                            }
                            self[type].push(v);
                        }
                    });
                    return this;
                };
            };

        var isDeferred = function(obj) {
            return obj && obj.then && obj.fail && obj.done;
        };

        var wire = function(parentDeferred, result, setter, value) {
            if (isDeferred(result)) {
                result.done(can.proxy(parentDeferred.resolve, parentDeferred))
                    .fail(can.proxy(parentDeferred.reject, parentDeferred));
            } else {
                setter.call(parentDeferred, result !== undefined ? result : value);
            }
        };
        extend(Deferred.prototype, {
                then: function(done, fail) {
                    var d = can.Deferred(),
                        resolve = d.resolve,
                        reject = d.reject;
                    this.done(function(value) {
                        if (typeof done === "function") {
                            wire(d, done.apply(this, arguments), resolve, value);
                        } else {
                            resolve.apply(d, arguments);
                        }

                    });
                    this.fail(function(value) {
                        if (typeof fail === "function") {
                            wire(d, fail.apply(this, arguments), reject, value);
                        } else {
                            reject.apply(d, arguments);
                        }
                    });
                    return d;
                },
                resolveWith: resolveFunc('_doneFuncs', 'rs'),
                rejectWith: resolveFunc('_failFuncs', 'rj'),
                done: doneFunc('_doneFuncs', 'rs'),
                fail: doneFunc('_failFuncs', 'rj'),
                always: function() {
                    var args = can.makeArray(arguments);
                    if (args.length && args[0]) {
                        this.done(args[0])
                            .fail(args[0]);
                    }
                    return this;
                },
                state: function() {
                    switch (this._status) {
                        case 'rs':
                            return 'resolved';
                        case 'rj':
                            return 'rejected';
                        default:
                            return 'pending';
                    }
                },
                isResolved: function() {
                    return this._status === 'rs';
                },
                isRejected: function() {
                    return this._status === 'rj';
                },
                reject: function() {
                    return this.rejectWith(this, arguments);
                },
                resolve: function() {
                    return this.resolveWith(this, arguments);
                },
                exec: function(context, dst, args, st) {
                    if (this._status !== '') {
                        return this;
                    }
                    this._status = st;
                    can.each(dst, function(d) {
                        if (typeof d.apply === 'function') {
                            d.apply(context, args);
                        }
                    });
                    return this;
                },
                promise: function() {
                    var promise = this.then();
                    promise.reject = promise.resolve = undefined;
                    return promise;
                }
            });
        Deferred.prototype.pipe = Deferred.prototype.then;
        return can;
    })(__m3);

    // ## util/array/each.js
    var __m10 = (function(can) {

        // The following is from jQuery
        var isArrayLike = function(obj) {
            var length = obj.length;
            return typeof arr !== "function" &&
            (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
        };

        can.each = function(elements, callback, context) {
            var i = 0,
                key,
                len,
                item;
            if (elements) {
                if (isArrayLike(elements)) {
                    if (can.List && elements instanceof can.List) {
                        for (len = elements.attr("length"); i < len; i++) {
                            item = elements.attr(i);
                            if (callback.call(context || item, item, i, elements) === false) {
                                break;
                            }
                        }
                    } else {
                        for (len = elements.length; i < len; i++) {
                            item = elements[i];
                            if (callback.call(context || item, item, i, elements) === false) {
                                break;
                            }
                        }
                    }

                } else if (typeof elements === "object") {

                    if (can.Map && elements instanceof can.Map || elements === can.route) {
                        var keys = can.Map.keys(elements);
                        for (i = 0, len = keys.length; i < len; i++) {
                            key = keys[i];
                            item = elements.attr(key);
                            if (callback.call(context || item, item, key, elements) === false) {
                                break;
                            }
                        }
                    } else {
                        for (key in elements) {
                            if (elements.hasOwnProperty(key) && callback.call(context || elements[key], elements[key], key, elements) === false) {
                                break;
                            }
                        }
                    }

                }
            }
            return elements;
        };
        return can;
    })(__m3);

    // ## util/inserted/inserted.js
    var __m11 = (function(can) {
        can.inserted = function(elems) {
            // Turn the `elems` property into an array to prevent mutations from changing the looping.
            elems = can.makeArray(elems);
            var inDocument = false,
                // Gets the `doc` to use as a reference for finding out whether the element is in the document.
                doc = can.$(document.contains ? document : document.body),
                children;
            // Go through `elems` and trigger the `inserted` event.
            // If the first element is not in the document (a Document Fragment) it will exit the function. If it is in the document it sets the `inDocument` flag to true. This means that we only check for the first element and either exit the function or start triggering "inserted" for child elements.
            for (var i = 0, elem;
                (elem = elems[i]) !== undefined; i++) {
                if (!inDocument) {
                    if (elem.getElementsByTagName) {
                        if (can.has(doc, elem)
                            .length) {
                            inDocument = true;
                        } else {
                            return;
                        }
                    } else {
                        continue;
                    }
                }

                // If we've found an element in the document then we can now trigger **"inserted"** for `elem` and all of its children. We are using `getElementsByTagName("*")` so that we grab all of the descendant nodes.
                if (inDocument && elem.getElementsByTagName) {
                    children = can.makeArray(elem.getElementsByTagName("*"));
                    can.trigger(elem, "inserted", [], false);
                    for (var j = 0, child;
                        (child = children[j]) !== undefined; j++) {
                        can.trigger(child, "inserted", [], false);
                    }
                }
            }
        };

        // ## can.appendChild
        // Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `can.inserted` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
        can.appendChild = function(el, child) {
            var children;
            if (child.nodeType === 11) {
                children = can.makeArray(child.childNodes);
            } else {
                children = [child];
            }
            el.appendChild(child);
            can.inserted(children);
        };

        // ## can.insertBefore
        // Like can.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
        can.insertBefore = function(el, child, ref) {
            var children;
            if (child.nodeType === 11) {
                children = can.makeArray(child.childNodes);
            } else {
                children = [child];
            }
            el.insertBefore(child, ref);
            can.inserted(children);
        };
    })(__m3);

    // ## util/zepto/zepto.js
    var __m2 = (function(can, attr, event) {
        // data.js
        // ---------
        // _jQuery-like data methods._
        var $ = Zepto;

        // data.js
        // ---------
        // _jQuery-like data methods._
        var data = {}, dataAttr = $.fn.data,
            uuid = $.uuid = +new Date(),
            exp = $.expando = 'Zepto' + uuid;

        function getData(node, name) {
            var id = node[exp],
                store = id && data[id];
            return name === undefined ? store || setData(node) :
            (store && store[name]) || dataAttr.call($(node), name);
        }

        function setData(node, name, value) {
            var id = node[exp] || (node[exp] = ++uuid),
                store = data[id] || (data[id] = {});
            if (name !== undefined) {
                store[name] = value;
            }
            return store;
        }

        $.fn.data = function(name, value) {
            return value === undefined ?
                this.length === 0 ? undefined : getData(this[0], name) :
                this.each(function(idx) {
                    setData(this, name, $.isFunction(value) ?
                        value.call(this, idx, getData(this, name)) : value);
                });
        };
        $.cleanData = function(elems) {
            // trigger all the events ... then remove the data
            for (var i = 0, elem;
                (elem = elems[i]) !== undefined; i++) {
                can.trigger(elem, "removed", [], false);
            }
            for (i = 0;
                (elem = elems[i]) !== undefined; i++) {
                var id = elem[exp];
                delete data[id];
            }

        };

        // zepto.js
        // ---------
        // _Zepto node list._

        var oldEach = can.each;
        // Extend what you can out of Zepto.
        $.extend(can, Zepto);
        can.each = oldEach;
        can.attr = attr;
        can.event = event;
        var arrHas = function(obj, name) {
            return obj[0] && obj[0][name] || obj[name];
        };

        // Do what's similar for jQuery.
        can.trigger = function(obj, event, args, bubble) {
            if (obj.trigger) {
                obj.trigger(event, args);
            } else if (arrHas(obj, "dispatchEvent")) {
                if (bubble === false) {
                    $([obj])
                        .triggerHandler(event, args);
                } else {
                    $([obj])
                        .trigger(event, args);
                }

            } else {
                if (typeof event === "string") {
                    event = {
                        type: event
                    };
                }
                event.target = event.target || obj;
                can.dispatch.call(obj, event, can.makeArray(args));
            }

        };

        can.$ = Zepto;

        can.bind = function(ev, cb) {
            // If we can bind to it...
            if (this.bind && this.bind !== can.bind) {
                this.bind(ev, cb);
            } else if (arrHas(this, "addEventListener")) {
                $([this])
                    .bind(ev, cb);
            } else {
                can.addEvent.call(this, ev, cb);
            }
            return this;
        };
        can.unbind = function(ev, cb) {
            // If we can bind to it...
            if (this.unbind && this.unbind !== can.unbind) {
                this.unbind(ev, cb);
            } else if (arrHas(this, "addEventListener")) {
                $([this])
                    .unbind(ev, cb);
            } else {
                can.removeEvent.call(this, ev, cb);
            }
            return this;
        };

        // Alias on/off to bind/unbind respectively
        can.on = can.bind;
        can.off = can.unbind;

        can.delegate = function(selector, ev, cb) {
            if (!selector) {
                // Zepto fails with no selector
                can.bind.call(this, ev, cb);
            } else if (this.delegate) {
                this.delegate(selector, ev, cb);
            } else if (arrHas(this, "addEventListener")) {
                $([this])
                    .delegate(selector, ev, cb);
            } else {
                // Make it bind-able...
                can.addEvent.call(this, ev, cb);
            }
        };
        can.undelegate = function(selector, ev, cb) {
            if (!selector) {
                // Zepto fails with no selector
                can.unbind.call(this, ev, cb);
            } else if (this.undelegate) {
                this.undelegate(selector, ev, cb);
            } else if (arrHas(this, "addEventListener")) {
                $([this])
                    .undelegate(selector, ev, cb);
            } else {
                // Make it bind-able...
                can.removeEvent.call(this, ev, cb);
            }
        };

        $.each(["append", "filter", "addClass", "remove", "data", "has"], function(i, name) {
            can[name] = function(wrapped) {
                return wrapped[name].apply(wrapped, can.makeArray(arguments)
                    .slice(1));
            };
        });

        can.makeArray = function(arr) {
            var ret = [];

            if (arr == null) {
                return [];
            }

            if (arr.length === undefined || typeof arr === 'string') {
                return [arr];
            }

            can.each(arr, function(a, i) {
                ret[i] = a;
            });

            return ret;
        };

        can.proxy = function(f, ctx) {
            return function() {
                return f.apply(ctx, arguments);
            };
        };

        // Make ajax.
        var XHR = $.ajaxSettings.xhr;
        $.ajaxSettings.xhr = function() {
            var xhr = XHR();
            var open = xhr.open;
            xhr.open = function(type, url, async) {
                open.call(this, type, url, ASYNC === undefined ? true : ASYNC);
            };
            return xhr;
        };
        var ASYNC;
        var AJAX = $.ajax;
        var updateDeferred = function(xhr, d) {
            for (var prop in xhr) {
                if (typeof d[prop] === 'function') {
                    d[prop] = function() {
                        xhr[prop].apply(xhr, arguments);
                    };
                } else {
                    d[prop] = prop[xhr];
                }
            }
        };
        can.ajax = function(options) {

            var success = options.success,
                error = options.error;
            var d = can.Deferred();

            options.success = function(data) {

                updateDeferred(xhr, d);
                d.resolve.call(d, data);
                if (success) {
                    success.apply(this, arguments);
                }
            };
            options.error = function() {
                updateDeferred(xhr, d);
                d.reject.apply(d, arguments);
                if (error) {
                    error.apply(this, arguments);
                }
            };
            if (options.async === false) {
                ASYNC = false;
            }
            var xhr = AJAX(options);
            ASYNC = undefined;
            updateDeferred(xhr, d);
            return d;
        };

        // Make destroyed and empty work.
        var $_empty = $.fn.empty;
        $.fn.empty = function() {
            this.each(function() {
                $.cleanData(this.getElementsByTagName('*'));
                this.innerHTML = '';
            });
            return $_empty.call(this);
        };

        var $_remove = $.fn.remove;
        $.fn.remove = function() {
            this.each(function() {
                if (this.getElementsByTagName) {
                    $.cleanData([this].concat(can.makeArray(this.getElementsByTagName('*'))));
                }
            });
            return $_remove.call(this);
        };

        can.trim = function(str) {
            return str.trim();
        };
        can.isEmptyObject = function(object) {
            var name;
            for (name in object) {}
            return name === undefined;
        };

        // Make extend handle `true` for deep.
        can.extend = function(first) {
            if (first === true) {
                var args = can.makeArray(arguments);
                args.shift();
                return $.extend.apply($, args);
            }
            return $.extend.apply($, arguments);
        };

        can.get = function(wrapped, index) {
            return wrapped[index];
        };

        // setup inserted calls
        can.each(['after', 'prepend', 'before', 'append', 'html'], function(name) {
            var original = Zepto.fn[name];
            Zepto.fn[name] = function() {
                var elems,
                    args = can.makeArray(arguments);

                if (args[0] != null) {
                    // documentFragment
                    if (typeof args[0] === "string") {
                        args[0] = $.zepto.fragment(args[0]);
                    }
                    if (args[0].nodeType === 11) {
                        elems = can.makeArray(args[0].childNodes);
                    } else {
                        elems = [args[0]];
                    }
                }

                var ret = original.apply(this, args);

                can.inserted(elems);

                return ret;
            };
        });

        // Setup attributes events

        // turn off mutation events for zepto
        delete attr.MutationObserver;

        var oldAttr = $.fn.attr;
        $.fn.attr = function(attrName, value) {
            var isString = typeof attrName === "string",
                oldValue,
                newValue;
            if (value !== undefined && isString) {
                oldValue = oldAttr.call(this, attrName);
            }
            var res = oldAttr.apply(this, arguments);
            if (value !== undefined && isString) {
                newValue = oldAttr.call(this, attrName);
            }
            if (newValue !== oldValue) {
                can.attr.trigger(this[0], attrName, oldValue);
            }
            return res;
        };
        var oldRemove = $.fn.removeAttr;
        $.fn.removeAttr = function(attrName) {
            var oldValue = oldAttr.call(this, attrName),
                res = oldRemove.apply(this, arguments);

            if (oldValue != null) {
                can.attr.trigger(this[0], attrName, oldValue);
            }
            return res;
        };

        var oldBind = $.fn.bind,
            oldUnbind = $.fn.unbind;

        $.fn.bind = function(event) {
            if (event === "attributes") {
                this.each(function() {
                    var el = can.$(this);
                    can.data(el, "canHasAttributesBindings", (can.data(el, "canHasAttributesBindings") || 0) + 1);
                });
            }
            return oldBind.apply(this, arguments);
        };

        $.fn.unbind = function(event) {
            if (event === "attributes") {
                this.each(function() {
                    var el = can.$(this),
                        cur = can.data(el, "canHasAttributesBindings") || 0;
                    if (cur <= 0) {
                        can.data(el, "canHasAttributesBindings", 0);
                    } else {
                        can.data(el, "canHasAttributesBindings", cur - 1);
                    }
                });
            }
            return oldUnbind.apply(this, arguments);
        };

        return can;
    })(__m3, __m4, __m5, Zepto, __m7, __m8, __m9, __m10, __m11);

    // ## view/view.js
    var __m13 = (function(can) {

        var isFunction = can.isFunction,
            makeArray = can.makeArray,
            // Used for hookup `id`s.
            hookupId = 1;

        // internal utility methods
        // ------------------------

        // ##### makeRenderer

        var makeRenderer = function(textRenderer) {
            var renderer = function() {
                return $view.frag(textRenderer.apply(this, arguments));
            };
            renderer.render = function() {
                return textRenderer.apply(textRenderer, arguments);
            };
            return renderer;
        };

        // ##### checkText
        // Makes sure there's a template, if not, have `steal` provide a warning.
        var checkText = function(text, url) {
            if (!text.length) {

                // _removed if not used as a steal module_



                throw "can.view: No template or empty template:" + url;
            }
        };

        // ##### get
        // get a deferred renderer for provided url

        var get = function(obj, async) {
            var url = typeof obj === 'string' ? obj : obj.url,
                suffix = (obj.engine && '.' + obj.engine) || url.match(/\.[\w\d]+$/),
                type,
                // If we are reading a script element for the content of the template,
                // `el` will be set to that script element.
                el,
                // A unique identifier for the view (used for caching).
                // This is typically derived from the element id or
                // the url for the template.
                id;

            //If the url has a #, we assume we want to use an inline template
            //from a script element and not current page's HTML
            if (url.match(/^#/)) {
                url = url.substr(1);
            }
            // If we have an inline template, derive the suffix from the `text/???` part.
            // This only supports `<script>` tags.
            if (el = document.getElementById(url)) {
                suffix = '.' + el.type.match(/\/(x\-)?(.+)/)[2];
            }

            // If there is no suffix, add one.
            if (!suffix && !$view.cached[url]) {
                url += suffix = $view.ext;
            }

            // if the suffix was derived from the .match() operation, pluck out the first value
            if (can.isArray(suffix)) {
                suffix = suffix[0];
            }

            // Convert to a unique and valid id.
            id = $view.toId(url);

            // If an absolute path, use `steal`/`require` to get it.
            // You should only be using `//` if you are using an AMD loader like `steal` or `require` (not almond).
            if (url.match(/^\/\//)) {
                url = url.substr(2);
                url = !window.steal ?
                    url :
                    steal.config()
                    .root.mapJoin("" + steal.id(url));
            }

            // Localize for `require` (not almond)
            if (window.require) {
                if (require.toUrl) {
                    url = require.toUrl(url);
                }
            }

            // Set the template engine type.
            type = $view.types[suffix];

            // If it is cached,
            if ($view.cached[id]) {
                // Return the cached deferred renderer.
                return $view.cached[id];

                // Otherwise if we are getting this from a `<script>` element.
            } else if (el) {
                // Resolve immediately with the element's `innerHTML`.
                return $view.registerView(id, el.innerHTML, type);
            } else {
                // Make an ajax request for text.
                var d = new can.Deferred();
                can.ajax({
                        async: async,
                        url: url,
                        dataType: 'text',
                        error: function(jqXHR) {
                            checkText('', url);
                            d.reject(jqXHR);
                        },
                        success: function(text) {
                            // Make sure we got some text back.
                            checkText(text, url);
                            $view.registerView(id, text, type, d);
                        }
                    });
                return d;
            }
        };
        // ##### getDeferreds
        // Gets an `array` of deferreds from an `object`.
        // This only goes one level deep.

        var getDeferreds = function(data) {
            var deferreds = [];

            // pull out deferreds
            if (can.isDeferred(data)) {
                return [data];
            } else {
                for (var prop in data) {
                    if (can.isDeferred(data[prop])) {
                        deferreds.push(data[prop]);
                    }
                }
            }
            return deferreds;
        };

        // ##### usefulPart
        // Gets the useful part of a resolved deferred.
        // When a jQuery.when is resolved, it returns an array to each argument.
        // Reference ($.when)[https://api.jquery.com/jQuery.when/]
        // This is for `model`s and `can.ajax` that resolve to an `array`.

        var usefulPart = function(resolved) {
            return can.isArray(resolved) && resolved[1] === 'success' ? resolved[0] : resolved;
        };

        // #### can.view
        //defines $view for internal use, can.template for backwards compatibility

        var $view = can.view = can.template = function(view, data, helpers, callback) {
            // If helpers is a `function`, it is actually a callback.
            if (isFunction(helpers)) {
                callback = helpers;
                helpers = undefined;
            }
            var result;
            // Get the result, if a renderer function is passed in, then we just use that to render the data
            if (isFunction(view)) {
                result = view(data, helpers, callback);
            } else {
                result = $view.renderAs("fragment", view, data, helpers, callback);
            }

            return result;
        };

        // can.view methods
        // --------------------------
        can.extend($view, {
                // ##### frag
                // creates a fragment and hooks it up all at once

                frag: function(result, parentNode) {
                    return $view.hookup($view.fragment(result), parentNode);
                },

                // #### fragment
                // this is used internally to create a document fragment, insert it,then hook it up
                fragment: function(result) {
                    if (typeof result !== "string" && result.nodeType === 11) {
                        return result;
                    }
                    var frag = can.buildFragment(result, document.body);
                    // If we have an empty frag...
                    if (!frag.childNodes.length) {
                        frag.appendChild(document.createTextNode(''));
                    }
                    return frag;
                },

                // ##### toId
                // Convert a path like string into something that's ok for an `element` ID.
                toId: function(src) {
                    return can.map(src.toString()
                        .split(/\/|\./g), function(part) {
                            // Dont include empty strings in toId functions
                            if (part) {
                                return part;
                            }
                        })
                        .join('_');
                },
                // ##### toStr
                // convert argument to a string
                toStr: function(txt) {
                    return txt == null ? "" : "" + txt;
                },

                // ##### hookup
                // attach the provided `fragment` to `parentNode`

                hookup: function(fragment, parentNode) {
                    var hookupEls = [],
                        id,
                        func;

                    // Get all `childNodes`.
                    can.each(fragment.childNodes ? can.makeArray(fragment.childNodes) : fragment, function(node) {
                        if (node.nodeType === 1) {
                            hookupEls.push(node);
                            hookupEls.push.apply(hookupEls, can.makeArray(node.getElementsByTagName('*')));
                        }
                    });

                    // Filter by `data-view-id` attribute.
                    can.each(hookupEls, function(el) {
                        if (el.getAttribute && (id = el.getAttribute('data-view-id')) && (func = $view.hookups[id])) {
                            func(el, parentNode, id);
                            delete $view.hookups[id];
                            el.removeAttribute('data-view-id');
                        }
                    });

                    return fragment;
                },

                // `hookups` keeps list of pending hookups, ie fragments to attach to a parent node

                hookups: {},

                // `hook` factory method for hookup function inserted into templates
                // hookup functions are called after the html is rendered to the page
                // only implemented by EJS templates.

                hook: function(cb) {
                    $view.hookups[++hookupId] = cb;
                    return ' data-view-id=\'' + hookupId + '\'';
                },


                cached: {},
                cachedRenderers: {},

                // cache view templates resolved via XHR on the client

                cache: true,

                // ##### register
                // given an info object, register a template type
                // different templating solutions produce strings or document fragments via their renderer function

                register: function(info) {
                    this.types['.' + info.suffix] = info;

                    // _removed if not used as a steal module_



                    can[info.suffix] = $view[info.suffix] = function(id, text) {
                        var renderer,
                            renderFunc;
                        // If there is no text, assume id is the template text, so return a nameless renderer.
                        if (!text) {
                            renderFunc = function() {
                                if (!renderer) {
                                    // if the template has a fragRenderer already, just return that.
                                    if (info.fragRenderer) {
                                        renderer = info.fragRenderer(null, id);
                                    } else {
                                        renderer = makeRenderer(info.renderer(null, id));
                                    }
                                }
                                return renderer.apply(this, arguments);
                            };
                            renderFunc.render = function() {
                                var textRenderer = info.renderer(null, id);
                                return textRenderer.apply(textRenderer, arguments);
                            };
                            return renderFunc;
                        }
                        var registeredRenderer = function() {
                            if (!renderer) {
                                if (info.fragRenderer) {
                                    renderer = info.fragRenderer(id, text);
                                } else {
                                    renderer = info.renderer(id, text);
                                }
                            }
                            return renderer.apply(this, arguments);
                        };
                        if (info.fragRenderer) {
                            return $view.preload(id, registeredRenderer);
                        } else {
                            return $view.preloadStringRenderer(id, registeredRenderer);
                        }

                    };

                },

                //registered view types
                types: {},


                ext: ".ejs",


                registerScript: function(type, id, src) {
                    return 'can.view.preloadStringRenderer(\'' + id + '\',' + $view.types['.' + type].script(id, src) + ');';
                },


                preload: function(id, renderer) {
                    var def = $view.cached[id] = new can.Deferred()
                        .resolve(function(data, helpers) {
                            return renderer.call(data, data, helpers);
                        });

                    // set cache references (otherwise preloaded recursive views won't recurse properly)
                    def.__view_id = id;
                    $view.cachedRenderers[id] = renderer;

                    return renderer;
                },


                preloadStringRenderer: function(id, stringRenderer) {
                    return this.preload(id, makeRenderer(stringRenderer));
                },

                // #### renderers
                // ---------------
                // can.view's primary purpose is to load templates (from strings or filesystem) and render them
                // can.view supports two different forms of rendering systems
                // mustache templates return a string based rendering function

                // stache (or other fragment based templating systems) return a document fragment, so 'hookup' steps are not required
                // ##### render
                //call `renderAs` with a hardcoded string, as view.render
                // always operates against resolved template files or hardcoded strings
                render: function(view, data, helpers, callback) {
                    return can.view.renderAs("string", view, data, helpers, callback);
                },

                // ##### renderTo
                renderTo: function(format, renderer, data, helpers) {
                    return (format === "string" && renderer.render ? renderer.render : renderer)(data, helpers);
                },


                renderAs: function(format, view, data, helpers, callback) {
                    // If helpers is a `function`, it is actually a callback.
                    if (isFunction(helpers)) {
                        callback = helpers;
                        helpers = undefined;
                    }

                    // See if we got passed any deferreds.
                    var deferreds = getDeferreds(data);
                    var reading, deferred, dataCopy, async, response;
                    if (deferreds.length) {
                        // Does data contain any deferreds?
                        // The deferred that resolves into the rendered content...
                        deferred = new can.Deferred();
                        dataCopy = can.extend({}, data);

                        // Add the view request to the list of deferreds.
                        deferreds.push(get(view, true));
                        // Wait for the view and all deferreds to finish...
                        can.when.apply(can, deferreds)
                            .then(function(resolved) {
                                // Get all the resolved deferreds.
                                var objs = makeArray(arguments),
                                    // Renderer is the last index of the data.
                                    renderer = objs.pop(),
                                    // The result of the template rendering with data.
                                    result;

                                // Make data look like the resolved deferreds.
                                if (can.isDeferred(data)) {
                                    dataCopy = usefulPart(resolved);
                                } else {
                                    // Go through each prop in data again and
                                    // replace the defferreds with what they resolved to.
                                    for (var prop in data) {
                                        if (can.isDeferred(data[prop])) {
                                            dataCopy[prop] = usefulPart(objs.shift());
                                        }
                                    }
                                }

                                // Get the rendered result.
                                result = can.view.renderTo(format, renderer, dataCopy, helpers);

                                // Resolve with the rendered view.
                                deferred.resolve(result, dataCopy);

                                // If there's a `callback`, call it back with the result.
                                if (callback) {
                                    callback(result, dataCopy);
                                }
                            }, function() {
                                deferred.reject.apply(deferred, arguments);
                            });
                        // Return the deferred...
                        return deferred;
                    } else {
                        // get is called async but in
                        // ff will be async so we need to temporarily reset
                        reading = can.__clearReading();

                        // If there's a `callback` function
                        async = isFunction(callback);
                        // Get the `view` type
                        deferred = get(view, async);

                        if (reading) {
                            can.__setReading(reading);
                        }

                        // If we are `async`...
                        if (async) {
                            // Return the deferred
                            response = deferred;
                            // And fire callback with the rendered result.
                            deferred.then(function(renderer) {
                                callback(data ? can.view.renderTo(format, renderer, data, helpers) : renderer);
                            });
                        } else {
                            // if the deferred is resolved, call the cached renderer instead
                            // this is because it's possible, with recursive deferreds to
                            // need to render a view while its deferred is _resolving_.  A _resolving_ deferred
                            // is a deferred that was just resolved and is calling back it's success callbacks.
                            // If a new success handler is called while resoliving, it does not get fired by
                            // jQuery's deferred system.  So instead of adding a new callback
                            // we use the cached renderer.
                            // We also add __view_id on the deferred so we can look up it's cached renderer.
                            // In the future, we might simply store either a deferred or the cached result.
                            if (deferred.state() === 'resolved' && deferred.__view_id) {
                                var currentRenderer = $view.cachedRenderers[deferred.__view_id];
                                return data ? can.view.renderTo(format, currentRenderer, data, helpers) : currentRenderer;
                            } else {
                                // Otherwise, the deferred is complete, so
                                // set response to the result of the rendering.
                                deferred.then(function(renderer) {
                                    response = data ? can.view.renderTo(format, renderer, data, helpers) : renderer;
                                });
                            }
                        }

                        return response;
                    }
                },


                registerView: function(id, text, type, def) {
                    // Get the renderer function.
                    var info = (typeof type === "object" ? type : $view.types[type || $view.ext]),
                        renderer;
                    if (info.fragRenderer) {
                        renderer = info.fragRenderer(id, text);
                    } else {
                        renderer = makeRenderer(info.renderer(id, text));
                    }

                    def = def || new can.Deferred();

                    // Cache if we are caching.
                    if ($view.cache) {
                        $view.cached[id] = def;
                        def.__view_id = id;
                        $view.cachedRenderers[id] = renderer;
                    }

                    // Return the objects for the response's `dataTypes`
                    // (in this case view).
                    return def.resolve(renderer);
                }
            });

        // _removed if not used as a steal module_

        return can;
    })(__m2);

    // ## view/callbacks/callbacks.js
    var __m12 = (function(can) {

        var attr = can.view.attr = function(attributeName, attrHandler) {
            if (attrHandler) {
                if (typeof attributeName === "string") {
                    attributes[attributeName] = attrHandler;
                } else {
                    regExpAttributes.push({
                            match: attributeName,
                            handler: attrHandler
                        });
                }
            } else {
                var cb = attributes[attributeName];
                if (!cb) {

                    for (var i = 0, len = regExpAttributes.length; i < len; i++) {
                        var attrMatcher = regExpAttributes[i];
                        if (attrMatcher.match.test(attributeName)) {
                            cb = attrMatcher.handler;
                            break;
                        }
                    }
                }
                return cb;
            }
        };

        var attributes = {},
            regExpAttributes = [],
            automaticCustomElementCharacters = /[-\:]/;

        var tag = can.view.tag = function(tagName, tagHandler) {
            if (tagHandler) {
                // if we have html5shive ... re-generate
                if (window.html5) {
                    window.html5.elements += " " + tagName;
                    window.html5.shivDocument();
                }

                tags[tagName.toLowerCase()] = tagHandler;
            } else {
                var cb = tags[tagName.toLowerCase()];
                if (!cb && automaticCustomElementCharacters.test(tagName)) {
                    // empty callback for things that look like special tags
                    cb = function() {};
                }
                return cb;
            }

        };
        var tags = {};

        can.view.callbacks = {
            _tags: tags,
            _attributes: attributes,
            _regExpAttributes: regExpAttributes,
            tag: tag,
            attr: attr,
            // handles calling back a tag callback
            tagHandler: function(el, tagName, tagData) {
                var helperTagCallback = tagData.options.attr('tags.' + tagName),
                    tagCallback = helperTagCallback || tags[tagName];

                // If this was an element like <foo-bar> that doesn't have a component, just render its content
                var scope = tagData.scope,
                    res;

                if (tagCallback) {
                    var reads = can.__clearReading();
                    res = tagCallback(el, tagData);
                    can.__setReading(reads);
                } else {
                    res = scope;
                }



                // If the tagCallback gave us something to render with, and there is content within that element
                // render it!
                if (res && tagData.subtemplate) {

                    if (scope !== res) {
                        scope = scope.add(res);
                    }
                    var result = tagData.subtemplate(scope, tagData.options);
                    var frag = typeof result === "string" ? can.view.frag(result) : result;
                    can.appendChild(el, frag);
                }
            }
        };
        return can.view.callbacks;
    })(__m2, __m13);

    // ## util/string/string.js
    var __m16 = (function(can) {
        // ##string.js
        // _Miscellaneous string utility functions._
        // Several of the methods in this plugin use code adapated from Prototype
        // Prototype JavaScript framework, version 1.6.0.1.
        // © 2005-2007 Sam Stephenson
        var strUndHash = /_|-/,
            strColons = /\=\=/,
            strWords = /([A-Z]+)([A-Z][a-z])/g,
            strLowUp = /([a-z\d])([A-Z])/g,
            strDash = /([a-z\d])([A-Z])/g,
            strReplacer = /\{([^\}]+)\}/g,
            strQuote = /"/g,
            strSingleQuote = /'/g,
            strHyphenMatch = /-+(.)?/g,
            strCamelMatch = /[a-z][A-Z]/g,
            // Returns the `prop` property from `obj`.
            // If `add` is true and `prop` doesn't exist in `obj`, create it as an
            // empty object.
            getNext = function(obj, prop, add) {
                var result = obj[prop];
                if (result === undefined && add === true) {
                    result = obj[prop] = {};
                }
                return result;
            },
            // Returns `true` if the object can have properties (no `null`s).
            isContainer = function(current) {
                return /^f|^o/.test(typeof current);
            }, convertBadValues = function(content) {
                // Convert bad values into empty strings
                var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
                return '' + (isInvalid ? '' : content);
            };
        can.extend(can, {
                esc: function(content) {
                    return convertBadValues(content)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(strQuote, '&#34;')
                        .replace(strSingleQuote, '&#39;');
                },
                getObject: function(name, roots, add) {
                    // The parts of the name we are looking up
                    // `['App','Models','Recipe']`
                    var parts = name ? name.split('.') : [],
                        length = parts.length,
                        current, r = 0,
                        i, container, rootsLength;
                    // Make sure roots is an `array`.
                    roots = can.isArray(roots) ? roots : [roots || window];
                    rootsLength = roots.length;
                    if (!length) {
                        return roots[0];
                    }
                    // For each root, mark it as current.
                    for (r; r < rootsLength; r++) {
                        current = roots[r];
                        container = undefined;
                        // Walk current to the 2nd to last object or until there
                        // is not a container.
                        for (i = 0; i < length && isContainer(current); i++) {
                            container = current;
                            current = getNext(container, parts[i]);
                        }
                        // If we found property break cycle
                        if (container !== undefined && current !== undefined) {
                            break;
                        }
                    }
                    // Remove property from found container
                    if (add === false && current !== undefined) {
                        delete container[parts[i - 1]];
                    }
                    // When adding property add it to the first root
                    if (add === true && current === undefined) {
                        current = roots[0];
                        for (i = 0; i < length && isContainer(current); i++) {
                            current = getNext(current, parts[i], true);
                        }
                    }
                    return current;
                },
                capitalize: function(s, cache) {
                    // Used to make newId.
                    return s.charAt(0)
                        .toUpperCase() + s.slice(1);
                },
                camelize: function(str) {
                    return convertBadValues(str)
                        .replace(strHyphenMatch, function(match, chr) {
                            return chr ? chr.toUpperCase() : '';
                        });
                },
                hyphenate: function(str) {
                    return convertBadValues(str)
                        .replace(strCamelMatch, function(str, offset) {
                            return str.charAt(0) + '-' + str.charAt(1)
                                .toLowerCase();
                        });
                },
                underscore: function(s) {
                    return s.replace(strColons, '/')
                        .replace(strWords, '$1_$2')
                        .replace(strLowUp, '$1_$2')
                        .replace(strDash, '_')
                        .toLowerCase();
                },
                sub: function(str, data, remove) {
                    var obs = [];
                    str = str || '';
                    obs.push(str.replace(strReplacer, function(whole, inside) {
                                // Convert inside to type.
                                var ob = can.getObject(inside, data, remove === true ? false : undefined);
                                if (ob === undefined || ob === null) {
                                    obs = null;
                                    return '';
                                }
                                // If a container, push into objs (which will return objects found).
                                if (isContainer(ob) && obs) {
                                    obs.push(ob);
                                    return '';
                                }
                                return '' + ob;
                            }));
                    return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
                },
                replacer: strReplacer,
                undHash: strUndHash
            });
        return can;
    })(__m2);

    // ## construct/construct.js
    var __m15 = (function(can) {
        // ## construct.js
        // `can.Construct`
        // _This is a modified version of
        // [John Resig's class](http://ejohn.org/blog/simple-javascript-inheritance/).
        // It provides class level inheritance and callbacks._
        // A private flag used to initialize a new class instance without
        // initializing it's bindings.
        var initializing = 0;

        can.Construct = function() {
            if (arguments.length) {
                return can.Construct.extend.apply(can.Construct, arguments);
            }
        };

        can.extend(can.Construct, {

                constructorExtends: true,

                newInstance: function() {
                    // Get a raw instance object (`init` is not called).
                    var inst = this.instance(),
                        args;
                    // Call `setup` if there is a `setup`
                    if (inst.setup) {
                        args = inst.setup.apply(inst, arguments);
                    }
                    // Call `init` if there is an `init`
                    // If `setup` returned `args`, use those as the arguments
                    if (inst.init) {
                        inst.init.apply(inst, args || arguments);
                    }
                    return inst;
                },
                // Overwrites an object with methods. Used in the `super` plugin.
                // `newProps` - New properties to add.
                // `oldProps` - Where the old properties might be (used with `super`).
                // `addTo` - What we are adding to.
                _inherit: function(newProps, oldProps, addTo) {
                    can.extend(addTo || newProps, newProps || {});
                },
                // used for overwriting a single property.
                // this should be used for patching other objects
                // the super plugin overwrites this
                _overwrite: function(what, oldProps, propName, val) {
                    what[propName] = val;
                },
                // Set `defaults` as the merger of the parent `defaults` and this
                // object's `defaults`. If you overwrite this method, make sure to
                // include option merging logic.

                setup: function(base, fullName) {
                    this.defaults = can.extend(true, {}, base.defaults, this.defaults);
                },
                // Create's a new `class` instance without initializing by setting the
                // `initializing` flag.
                instance: function() {
                    // Prevents running `init`.
                    initializing = 1;
                    var inst = new this();
                    // Allow running `init`.
                    initializing = 0;
                    return inst;
                },
                // Extends classes.

                extend: function(name, staticProperties, instanceProperties) {
                    var fullName = name,
                        klass = staticProperties,
                        proto = instanceProperties;

                    // Figure out what was passed and normalize it.
                    if (typeof fullName !== 'string') {
                        proto = klass;
                        klass = fullName;
                        fullName = null;
                    }
                    if (!proto) {
                        proto = klass;
                        klass = null;
                    }
                    proto = proto || {};
                    var _super_class = this,
                        _super = this.prototype,
                        parts, current, _fullName, _shortName, propName, shortName, namespace, prototype;
                    // Instantiate a base class (but only create the instance,
                    // don't run the init constructor).
                    prototype = this.instance();
                    // Copy the properties over onto the new prototype.
                    can.Construct._inherit(proto, _super, prototype);
                    // The dummy class constructor.

                    function Constructor() {
                        // All construction is actually done in the init method.
                        if (!initializing) {


                            return this.constructor !== Constructor &&
                            // We are being called without `new` or we are extending.
                            arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) :
                            // We are being called with `new`.
                            Constructor.newInstance.apply(Constructor, arguments);
                        }
                    }
                    // Copy old stuff onto class (can probably be merged w/ inherit)
                    for (propName in _super_class) {
                        if (_super_class.hasOwnProperty(propName)) {
                            Constructor[propName] = _super_class[propName];
                        }
                    }
                    // Copy new static properties on class.
                    can.Construct._inherit(klass, _super_class, Constructor);
                    // Setup namespaces.
                    if (fullName) {

                        parts = fullName.split('.');
                        shortName = parts.pop();
                        current = can.getObject(parts.join('.'), window, true);
                        namespace = current;
                        _fullName = can.underscore(fullName.replace(/\./g, "_"));
                        _shortName = can.underscore(shortName);



                        current[shortName] = Constructor;
                    }
                    // Set things that shouldn't be overwritten.
                    can.extend(Constructor, {
                            constructor: Constructor,
                            prototype: prototype,

                            namespace: namespace,

                            _shortName: _shortName,

                            fullName: fullName,
                            _fullName: _fullName
                        });
                    // Dojo and YUI extend undefined
                    if (shortName !== undefined) {
                        Constructor.shortName = shortName;
                    }
                    // Make sure our prototype looks nice.
                    Constructor.prototype.constructor = Constructor;
                    // Call the class `setup` and `init`
                    var t = [_super_class].concat(can.makeArray(arguments)),
                        args = Constructor.setup.apply(Constructor, t);
                    if (Constructor.init) {
                        Constructor.init.apply(Constructor, args || t);
                    }

                    return Constructor;
                }
            });

        can.Construct.prototype.setup = function() {};

        can.Construct.prototype.init = function() {};
        return can.Construct;
    })(__m16);

    // ## control/control.js
    var __m14 = (function(can) {
        // ### bind
        // this helper binds to one element and returns a function that unbinds from that element.
        var bind = function(el, ev, callback) {

            can.bind.call(el, ev, callback);

            return function() {
                can.unbind.call(el, ev, callback);
            };
        },
            isFunction = can.isFunction,
            extend = can.extend,
            each = can.each,
            slice = [].slice,
            paramReplacer = /\{([^\}]+)\}/g,
            special = can.getObject("$.event.special", [can]) || {},

            // ### delegate
            // this helper binds to elements based on a selector and returns a
            // function that unbinds.
            delegate = function(el, selector, ev, callback) {
                can.delegate.call(el, selector, ev, callback);
                return function() {
                    can.undelegate.call(el, selector, ev, callback);
                };
            },

            // ### binder
            // Calls bind or unbind depending if there is a selector.
            binder = function(el, ev, callback, selector) {
                return selector ?
                    delegate(el, can.trim(selector), ev, callback) :
                    bind(el, ev, callback);
            },

            basicProcessor;

        var Control = can.Control = can.Construct(

            // ## *static functions*

            {
                // ## can.Control.setup
                // This function pre-processes which methods are event listeners and which are methods of
                // the control. It has a mechanism to allow controllers to inherit default values from super
                // classes, like `can.Construct`, and will cache functions that are action functions (see `_isAction`)
                // or functions with an underscored name.
                setup: function() {
                    can.Construct.setup.apply(this, arguments);

                    if (can.Control) {
                        var control = this,
                            funcName;

                        control.actions = {};
                        for (funcName in control.prototype) {
                            if (control._isAction(funcName)) {
                                control.actions[funcName] = control._action(funcName);
                            }
                        }
                    }
                },
                // ## can.Control._shifter
                // Moves `this` to the first argument, wraps it with `jQuery` if it's
                // an element.
                _shifter: function(context, name) {

                    var method = typeof name === "string" ? context[name] : name;

                    if (!isFunction(method)) {
                        method = context[method];
                    }

                    return function() {
                        context.called = name;
                        return method.apply(context, [this.nodeName ? can.$(this) : this].concat(slice.call(arguments, 0)));
                    };
                },

                // ## can.Control._isAction
                // Return `true` if `methodName` refers to an action. An action is a `methodName` value that
                // is not the constructor, and is either a function or string that refers to a function, or is
                // defined in `special`, `processors`. Detects whether `methodName` is also a valid method name.
                _isAction: function(methodName) {
                    var val = this.prototype[methodName],
                        type = typeof val;

                    return (methodName !== 'constructor') &&
                    (type === "function" || (type === "string" && isFunction(this.prototype[val]))) && !! (special[methodName] || processors[methodName] || /[^\w]/.test(methodName));
                },
                // ## can.Control._action
                // Takes a method name and the options passed to a control and tries to return the data
                // necessary to pass to a processor (something that binds things).
                // For performance reasons, `_action` is called twice:
                // * It's called when the Control class is created. for templated method names (e.g., `{window} foo`), it returns null. For non-templated method names it returns the event binding data. That data is added to `this.actions`.
                // * It is called wehn a control instance is created, but only for templated actions.
                _action: function(methodName, options) {

                    // If we don't have options (a `control` instance), we'll run this later. If we have
                    // options, run `can.sub` to replace the action template `{}` with values from the `options`
                    // or `window`. If a `{}` template resolves to an object, `convertedName` will be an array.
                    // In that case, the event name we want will be the last item in that array.
                    paramReplacer.lastIndex = 0;
                    if (options || !paramReplacer.test(methodName)) {
                        var convertedName = options ? can.sub(methodName, this._lookup(options)) : methodName;
                        if (!convertedName) {

                            return null;
                        }
                        var arr = can.isArray(convertedName),
                            name = arr ? convertedName[1] : convertedName,
                            parts = name.split(/\s+/g),
                            event = parts.pop();

                        return {
                            processor: processors[event] || basicProcessor,
                            parts: [name, parts.join(" "), event],
                            delegate: arr ? convertedName[0] : undefined
                        };
                    }
                },
                _lookup: function(options) {
                    return [options, window];
                },
                // ## can.Control.processors
                // An object of `{eventName : function}` pairs that Control uses to
                // hook up events automatically.
                processors: {},
                // ## can.Control.defaults
                // A object of name-value pairs that act as default values for a control instance
                defaults: {}
            }, {
                // ## *prototype functions*

                // ## setup
                // Setup is where most of the Control's magic happens. It performs several pre-initialization steps:
                // - Sets `this.element`
                // - Adds the Control's name to the element's className
                // - Saves the Control in `$.data`
                // - Merges Options
                // - Binds event handlers using `delegate`
                // The final step is to return pass the element and prepareed options, to be used in `init`.
                setup: function(element, options) {

                    var cls = this.constructor,
                        pluginname = cls.pluginName || cls._fullName,
                        arr;

                    // Retrieve the raw element, then set the plugin name as a class there.
                    this.element = can.$(element);

                    if (pluginname && pluginname !== 'can_control') {
                        this.element.addClass(pluginname);
                    }

                    // Set up the 'controls' data on the element. If it does not exist, initialize
                    // it to an empty array.
                    arr = can.data(this.element, 'controls');
                    if (!arr) {
                        arr = [];
                        can.data(this.element, 'controls', arr);
                    }
                    arr.push(this);

                    // The `this.options` property is an Object that contains configuration data
                    // passed to a control when it is created (`new can.Control(element, options)`)
                    // The `options` argument passed when creating the control is merged with `can.Control.defaults`
                    // in [can.Control.prototype.setup setup].
                    // If no `options` value is used during creation, the value in `defaults` is used instead
                    this.options = extend({}, cls.defaults, options);

                    this.on();

                    return [this.element, this.options];
                },
                // ## on
                // This binds an event handler for an event to a selector under the scope of `this.element`
                // If no options are specified, all events are rebound to their respective elements. The actions,
                // which were cached in `setup`, are used and all elements are bound using `delegate` from `this.element`.
                on: function(el, selector, eventName, func) {
                    if (!el) {
                        this.off();

                        var cls = this.constructor,
                            bindings = this._bindings,
                            actions = cls.actions,
                            element = this.element,
                            destroyCB = can.Control._shifter(this, "destroy"),
                            funcName, ready;

                        for (funcName in actions) {
                            // Only push if we have the action and no option is `undefined`
                            if (actions.hasOwnProperty(funcName)) {
                                ready = actions[funcName] || cls._action(funcName, this.options, this);
                                if (ready) {
                                    bindings.control[funcName] = ready.processor(ready.delegate || element,
                                        ready.parts[2], ready.parts[1], funcName, this);
                                }
                            }
                        }

                        // Set up the ability to `destroy` the control later.
                        can.bind.call(element, "removed", destroyCB);
                        bindings.user.push(function(el) {
                            can.unbind.call(el, "removed", destroyCB);
                        });
                        return bindings.user.length;
                    }

                    // if `el` is a string, use that as `selector` and re-set it to this control's element...
                    if (typeof el === 'string') {
                        func = eventName;
                        eventName = selector;
                        selector = el;
                        el = this.element;
                    }

                    // ...otherwise, set `selector` to null
                    if (func === undefined) {
                        func = eventName;
                        eventName = selector;
                        selector = null;
                    }

                    if (typeof func === 'string') {
                        func = can.Control._shifter(this, func);
                    }

                    this._bindings.user.push(binder(el, eventName, func, selector));

                    return this._bindings.user.length;
                },
                // ## off
                // Unbinds all event handlers on the controller.
                // This should _only_ be called in combination with .on()
                off: function() {
                    var el = this.element[0],
                        bindings = this._bindings;
                    if (bindings) {
                        each(bindings.user || [], function(value) {
                            value(el);
                        });
                        each(bindings.control || {}, function(value) {
                            value(el);
                        });
                    }
                    // Adds bindings.
                    this._bindings = {
                        user: [],
                        control: {}
                    };
                },
                // ## destroy
                // Prepares a `control` for garbage collection.
                // First checks if it has already been removed. Then, removes all the bindings, data, and
                // the element from the Control instance.
                destroy: function() {
                    if (this.element === null) {

                        return;
                    }
                    var Class = this.constructor,
                        pluginName = Class.pluginName || Class._fullName,
                        controls;

                    this.off();

                    if (pluginName && pluginName !== 'can_control') {
                        this.element.removeClass(pluginName);
                    }

                    controls = can.data(this.element, "controls");
                    controls.splice(can.inArray(this, controls), 1);

                    can.trigger(this, "destroyed");

                    this.element = null;
                }
            });

        // ## Processors
        // Processors do the binding. This basic processor binds events. Each returns a function that unbinds
        // when called.
        var processors = can.Control.processors;
        basicProcessor = function(el, event, selector, methodName, control) {
            return binder(el, event, can.Control._shifter(control, methodName), selector);
        };

        // Set common events to be processed as a `basicProcessor`
        each(["change", "click", "contextmenu", "dblclick", "keydown", "keyup",
                "keypress", "mousedown", "mousemove", "mouseout", "mouseover",
                "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin",
                "focusout", "mouseenter", "mouseleave",
                "touchstart", "touchmove", "touchcancel", "touchend", "touchleave",
                "inserted", "removed"
            ], function(v) {
                processors[v] = basicProcessor;
            });

        return Control;
    })(__m2, __m15);

    // ## util/bind/bind.js
    var __m19 = (function(can) {

        // ## Bind helpers
        can.bindAndSetup = function() {
            // Add the event to this object
            can.addEvent.apply(this, arguments);
            // If not initializing, and the first binding
            // call bindsetup if the function exists.
            if (!this._init) {
                if (!this._bindings) {
                    this._bindings = 1;
                    // setup live-binding
                    if (this._bindsetup) {
                        this._bindsetup();
                    }
                } else {
                    this._bindings++;
                }
            }
            return this;
        };
        can.unbindAndTeardown = function(ev, handler) {
            // Remove the event handler
            can.removeEvent.apply(this, arguments);
            if (this._bindings === null) {
                this._bindings = 0;
            } else {
                this._bindings--;
            }
            // If there are no longer any bindings and
            // there is a bindteardown method, call it.
            if (!this._bindings && this._bindteardown) {
                this._bindteardown();
            }
            return this;
        };
        return can;
    })(__m2);

    // ## map/bubble.js
    var __m20 = (function(can) {

        var bubble = can.bubble = {
            // Given a binding, returns a string event name used to set up bubbline.
            // If no binding should be done, undefined or null should be returned
            event: function(map, eventName) {
                return map.constructor._bubbleRule(eventName, map);
            },
            childrenOf: function(parentMap, eventName) {

                parentMap._each(function(child, prop) {
                    if (child && child.bind) {
                        bubble.toParent(child, parentMap, prop, eventName);
                    }
                });

            },
            teardownChildrenFrom: function(parentMap, eventName) {
                parentMap._each(function(child) {

                    bubble.teardownFromParent(parentMap, child, eventName);

                });
            },
            toParent: function(child, parent, prop, eventName) {
                can.listenTo.call(parent, child, eventName, function() {
                    // `batchTrigger` the type on this...
                    var args = can.makeArray(arguments),
                        ev = args.shift();

                    args[0] =
                    (can.List && parent instanceof can.List ?
                        parent.indexOf(child) :
                        prop) + (args[0] ? "." + args[0] : "");

                    // track objects dispatched on this map
                    ev.triggeredNS = ev.triggeredNS || {};

                    // if it has already been dispatched exit
                    if (ev.triggeredNS[parent._cid]) {
                        return;
                    }

                    ev.triggeredNS[parent._cid] = true;
                    // send change event with modified attr to parent
                    can.trigger(parent, ev, args);
                });
            },
            teardownFromParent: function(parent, child, eventName) {
                if (child && child.unbind) {
                    can.stopListening.call(parent, child, eventName);
                }
            },
            isBubbling: function(parent, eventName) {
                return parent._bubbleBindings && parent._bubbleBindings[eventName];
            },
            bind: function(parent, eventName) {
                if (!parent._init) {
                    var bubbleEvent = bubble.event(parent, eventName);
                    if (bubbleEvent) {
                        if (!parent._bubbleBindings) {
                            parent._bubbleBindings = {};
                        }
                        if (!parent._bubbleBindings[bubbleEvent]) {
                            parent._bubbleBindings[bubbleEvent] = 1;
                            // setup live-binding
                            bubble.childrenOf(parent, bubbleEvent);
                        } else {
                            parent._bubbleBindings[bubbleEvent]++;
                        }

                    }
                }
            },
            unbind: function(parent, eventName) {
                var bubbleEvent = bubble.event(parent, eventName);
                if (bubbleEvent) {
                    if (parent._bubbleBindings) {
                        parent._bubbleBindings[bubbleEvent]--;
                    }
                    if (parent._bubbleBindings && !parent._bubbleBindings[bubbleEvent]) {
                        delete parent._bubbleBindings[bubbleEvent];
                        bubble.teardownChildrenFrom(parent, bubbleEvent);
                        if (can.isEmptyObject(parent._bubbleBindings)) {
                            delete parent._bubbleBindings;
                        }
                    }
                }
            },
            add: function(parent, child, prop) {
                if (child instanceof can.Map && parent._bubbleBindings) {
                    for (var eventName in parent._bubbleBindings) {
                        if (parent._bubbleBindings[eventName]) {
                            bubble.teardownFromParent(parent, child, eventName);
                            bubble.toParent(child, parent, prop, eventName);
                        }
                    }
                }
            },
            removeMany: function(parent, children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    bubble.remove(parent, children[i]);
                }
            },
            remove: function(parent, child) {
                if (child instanceof can.Map && parent._bubbleBindings) {
                    for (var eventName in parent._bubbleBindings) {
                        if (parent._bubbleBindings[eventName]) {
                            bubble.teardownFromParent(parent, child, eventName);
                        }
                    }
                }
            },
            set: function(parent, prop, value, current) {

                //var res = parent.__type(value, prop);
                if (can.Map.helpers.isObservable(value)) {
                    bubble.add(parent, value, prop);
                }
                // bubble.add will remove, so only remove if we are replacing another object
                if (can.Map.helpers.isObservable(current)) {
                    bubble.remove(parent, current);
                }
                return value;
            }
        };

        return bubble;

    })(__m2);

    // ## util/batch/batch.js
    var __m21 = (function(can) {
        // Which batch of events this is for -- might not want to send multiple
        // messages on the same batch.  This is mostly for event delegation.
        var batchNum = 1,
            // how many times has start been called without a stop
            transactions = 0,
            // an array of events within a transaction
            batchEvents = [],
            stopCallbacks = [];
        can.batch = {

            start: function(batchStopHandler) {
                transactions++;
                if (batchStopHandler) {
                    stopCallbacks.push(batchStopHandler);
                }
            },

            stop: function(force, callStart) {
                if (force) {
                    transactions = 0;
                } else {
                    transactions--;
                }
                if (transactions === 0) {
                    var items = batchEvents.slice(0),
                        callbacks = stopCallbacks.slice(0),
                        i, len;
                    batchEvents = [];
                    stopCallbacks = [];
                    batchNum++;
                    if (callStart) {
                        can.batch.start();
                    }
                    for (i = 0, len = items.length; i < len; i++) {
                        can.dispatch.apply(items[i][0], items[i][1]);
                    }
                    for (i = 0, len = callbacks.length; i < callbacks.length; i++) {
                        callbacks[i]();
                    }
                }
            },

            trigger: function(item, event, args) {
                // Don't send events if initalizing.
                if (!item._init) {
                    if (transactions === 0) {
                        return can.dispatch.call(item, event, args);
                    } else {
                        event = typeof event === 'string' ? {
                            type: event
                        } : event;
                        event.batchNum = batchNum;
                        batchEvents.push([
                                item, [event, args]
                            ]);
                    }
                }
            }
        };
    })(__m3);

    // ## map/map.js
    var __m18 = (function(can, bind, bubble) {
        // ## Helpers

        // A temporary map of Maps that have been made from plain JS objects.
        var madeMap = null;
        // Clears out map of converted objects.
        var teardownMap = function() {
            for (var cid in madeMap) {
                if (madeMap[cid].added) {
                    delete madeMap[cid].obj._cid;
                }
            }
            madeMap = null;
        };
        // Retrieves a Map instance from an Object.
        var getMapFromObject = function(obj) {
            return madeMap && madeMap[obj._cid] && madeMap[obj._cid].instance;
        };
        // A temporary map of Maps
        var serializeMap = null;


        var Map = can.Map = can.Construct.extend({

                setup: function() {

                    can.Construct.setup.apply(this, arguments);

                    // Do not run if we are defining can.Map.
                    if (can.Map) {
                        if (!this.defaults) {
                            this.defaults = {};
                        }
                        // Builds a list of compute and non-compute properties in this Object's prototype.
                        this._computes = [];

                        for (var prop in this.prototype) {
                            // Non-functions are regular defaults.
                            if (prop !== "define" && typeof this.prototype[prop] !== "function") {
                                this.defaults[prop] = this.prototype[prop];
                                // Functions with an `isComputed` property are computes.
                            } else if (this.prototype[prop].isComputed) {
                                this._computes.push(prop);
                            }
                        }
                        if (this.helpers.define) {
                            this.helpers.define(this);
                        }
                    }
                    // If we inherit from can.Map, but not can.List, make sure any lists are the correct type.
                    if (can.List && !(this.prototype instanceof can.List)) {
                        this.List = Map.List.extend({
                                Map: this
                            }, {});
                    }

                },
                // Reference to bubbling helpers.
                _bubble: bubble,
                // Given an eventName, determine if bubbling should be setup.
                _bubbleRule: function(eventName) {
                    return (eventName === "change" || eventName.indexOf(".") >= 0) && "change";
                },
                // List of computes on the Map's prototype.
                _computes: [],
                // Adds an event to this Map.
                bind: can.bindAndSetup,
                on: can.bindAndSetup,
                // Removes an event from this Map.
                unbind: can.unbindAndTeardown,
                off: can.unbindAndTeardown,
                // Name of the id field. Used in can.Model.
                id: "id",
                // ## Internal helpers
                helpers: {
                    // ### can.Map.helpers.define
                    // Stub function for the define plugin.
                    define: null,

                    // ### can.Map.helpers.attrParts
                    // Parses attribute name into its parts.
                    attrParts: function(attr, keepKey) {
                        //Keep key intact

                        if (keepKey) {
                            return [attr];
                        }
                        // Split key on '.'
                        return typeof attr === "object" ? attr : ("" + attr)
                            .split(".");
                    },

                    // ### can.Map.helpers.addToMap
                    // Tracks Map instances created from JS Objects
                    addToMap: function(obj, instance) {
                        var teardown;
                        // Setup a fresh mapping if `madeMap` is missing.
                        if (!madeMap) {
                            teardown = teardownMap;
                            madeMap = {};
                        }
                        // Record if Object has a `_cid` before adding one.
                        var hasCid = obj._cid;
                        var cid = can.cid(obj);

                        // Only update if there already isn't one already.
                        if (!madeMap[cid]) {

                            madeMap[cid] = {
                                obj: obj,
                                instance: instance,
                                added: !hasCid
                            };
                        }
                        return teardown;
                    },

                    // ### can.Map.helpers.isObservable
                    // Determines if `obj` is observable.
                    isObservable: function(obj) {
                        return obj instanceof can.Map || (obj && obj === can.route);
                    },

                    // ### can.Map.helpers.canMakeObserve
                    // Determines if an object can be made into an observable.
                    canMakeObserve: function(obj) {
                        return obj && !can.isDeferred(obj) && (can.isArray(obj) || can.isPlainObject(obj));
                    },

                    // ### can.Map.helpers.serialize
                    // Serializes a Map or Map.List
                    serialize: function(map, how, where) {
                        var cid = can.cid(map),
                            firstSerialize = false;
                        if (!serializeMap) {
                            firstSerialize = true;
                            // Serialize might call .attr() so we need to keep different map
                            serializeMap = {
                                attr: {},
                                serialize: {}
                            };
                        }
                        serializeMap[how][cid] = where;
                        // Go through each property.
                        map.each(function(val, name) {
                            // If the value is an `object`, and has an `attrs` or `serialize` function.
                            var result,
                                isObservable = Map.helpers.isObservable(val),
                                serialized = isObservable && serializeMap[how][can.cid(val)];
                            if (serialized) {
                                result = serialized;
                            } else {
                                if (how === "serialize") {
                                    result = Map.helpers._serialize(map, name, val);
                                } else {
                                    result = Map.helpers._getValue(map, name, val, how);
                                }
                            }
                            // this is probably removable
                            if (result !== undefined) {
                                where[name] = result;
                            }
                        });

                        can.__reading(map, '__keys');
                        if (firstSerialize) {
                            serializeMap = null;
                        }
                        return where;
                    },
                    _serialize: function(map, name, val) {
                        return Map.helpers._getValue(map, name, val, "serialize");
                    },
                    _getValue: function(map, name, val, how) {
                        if (Map.helpers.isObservable(val)) {
                            return val[how]();
                        } else {
                            return val;
                        }
                    }
                },

                keys: function(map) {
                    var keys = [];
                    can.__reading(map, '__keys');
                    for (var keyName in map._data) {
                        keys.push(keyName);
                    }
                    return keys;
                }
            },

            {
                setup: function(obj) {
                    if (obj instanceof can.Map) {
                        obj = obj.serialize();
                    }

                    // `_data` is where we keep the properties.
                    this._data = {};

                    // The namespace this `object` uses to listen to events.
                    can.cid(this, ".map");
                    // Sets all `attrs`.
                    this._init = 1;
                    // It's handy if we pass this to comptues, because computes can have a default value.
                    var defaultValues = this._setupDefaults();
                    this._setupComputes(defaultValues);
                    var teardownMapping = obj && can.Map.helpers.addToMap(obj, this);

                    var data = can.extend(can.extend(true, {}, defaultValues), obj);

                    this.attr(data);

                    if (teardownMapping) {
                        teardownMapping();
                    }

                    // `batchTrigger` change events.
                    this.bind('change', can.proxy(this._changes, this));

                    delete this._init;
                },
                // Sets up computed properties on a Map.
                _setupComputes: function() {
                    var computes = this.constructor._computes;
                    this._computedBindings = {};

                    for (var i = 0, len = computes.length, prop; i < len; i++) {
                        prop = computes[i];
                        // Make the context of the compute the current Map
                        this[prop] = this[prop].clone(this);
                        // Keep track of computed properties
                        this._computedBindings[prop] = {
                            count: 0
                        };
                    }
                },
                _setupDefaults: function() {
                    return this.constructor.defaults || {};
                },
                // Setup child bindings.
                _bindsetup: function() {},
                // Teardown child bindings.
                _bindteardown: function() {},
                // `change`event handler.
                _changes: function(ev, attr, how, newVal, oldVal) {
                    // when a change happens, create the named event.
                    can.batch.trigger(this, {
                            type: attr,
                            batchNum: ev.batchNum,
                            target: ev.target
                        }, [newVal, oldVal]);


                },
                // Trigger a change event.
                _triggerChange: function(attr, how, newVal, oldVal) {
                    // so this change can bubble ... a bubbling change triggers the
                    // _changes trigger
                    if (bubble.isBubbling(this, "change")) {
                        can.batch.trigger(this, {
                                type: "change",
                                target: this
                            }, [attr, how, newVal, oldVal]);
                    } else {
                        can.batch.trigger(this, attr, [newVal, oldVal]);
                    }

                    if (how === "remove" || how === "add") {
                        can.batch.trigger(this, {
                                type: "__keys",
                                target: this
                            });
                    }
                },
                // Iterator that does not trigger live binding.
                _each: function(callback) {
                    var data = this.__get();
                    for (var prop in data) {
                        if (data.hasOwnProperty(prop)) {
                            callback(data[prop], prop);
                        }
                    }
                },

                attr: function(attr, val) {
                    // This is super obfuscated for space -- basically, we're checking
                    // if the type of the attribute is not a `number` or a `string`.
                    var type = typeof attr;
                    if (type !== "string" && type !== "number") {
                        return this._attrs(attr, val);
                        // If we are getting a value.
                    } else if (arguments.length === 1) {
                        can.__reading(this, attr);
                        return this._get(attr);
                    } else {
                        // Otherwise we are setting.
                        this._set(attr, val);
                        return this;
                    }
                },

                each: function() {
                    return can.each.apply(undefined, [this].concat(can.makeArray(arguments)));
                },

                removeAttr: function(attr) {
                    // If this is List.
                    var isList = can.List && this instanceof can.List,
                        // Convert the `attr` into parts (if nested).
                        parts = can.Map.helpers.attrParts(attr),
                        // The actual property to remove.
                        prop = parts.shift(),
                        // The current value.
                        current = isList ? this[prop] : this._data[prop];

                    // If we have more parts, call `removeAttr` on that part.
                    if (parts.length && current) {
                        return current.removeAttr(parts);
                    } else {

                        // If attr does not have a `.`
                        if (typeof attr === 'string' && !! ~attr.indexOf('.')) {
                            prop = attr;
                        }

                        this._remove(prop, current);
                        return current;
                    }
                },
                // Remove a property.
                _remove: function(prop, current) {
                    if (prop in this._data) {
                        // Delete the property from `_data` and the Map
                        // as long as it isn't part of the Map's prototype.
                        delete this._data[prop];
                        if (!(prop in this.constructor.prototype)) {
                            delete this[prop];
                        }
                        // Let others now this property has been removed.
                        this._triggerChange(prop, "remove", undefined, current);

                    }
                },
                // Reads a property from the `object`.
                _get: function(attr) {
                    attr = "" + attr;
                    var dotIndex = attr.indexOf('.');


                    // Handles the case of a key having a `.` in its name
                    // Otherwise we have to dig deeper into the Map to get the value.
                    if (dotIndex >= 0) {
                        // Attempt to get the value
                        var value = this.__get(attr);
                        // For keys with a `.` in them, value will be defined
                        if (value !== undefined) {
                            return value;
                        }
                        var first = attr.substr(0, dotIndex),
                            second = attr.substr(dotIndex + 1),
                            current = this.__get(first);
                        return current && current._get ? current._get(second) : undefined;
                    } else {
                        return this.__get(attr);
                    }
                },
                // Reads a property directly if an `attr` is provided, otherwise
                // returns the "real" data object itself.
                __get: function(attr) {
                    if (attr) {
                        // If property is a compute return the result, otherwise get the value directly
                        if (this._computedBindings[attr]) {
                            return this[attr]();
                        } else {
                            return this._data[attr];
                        }
                        // If not property is provided, return entire `_data` object
                    } else {
                        return this._data;
                    }
                },
                // converts the value into an observable if needed
                __type: function(value, prop) {
                    // If we are getting an object.
                    if (!(value instanceof can.Map) && can.Map.helpers.canMakeObserve(value)) {

                        var cached = getMapFromObject(value);
                        if (cached) {
                            return cached;
                        }
                        if (can.isArray(value)) {
                            var List = can.List;
                            return new List(value);
                        } else {
                            var Map = this.constructor.Map || can.Map;
                            return new Map(value);
                        }
                    }
                    return value;
                },
                // Sets `attr` prop as value on this object where.
                // `attr` - Is a string of properties or an array  of property values.
                // `value` - The raw value to set.
                _set: function(attr, value, keepKey) {
                    attr = "" + attr;
                    var dotIndex = attr.indexOf('.'),
                        current;
                    if (!keepKey && dotIndex >= 0) {
                        var first = attr.substr(0, dotIndex),
                            second = attr.substr(dotIndex + 1);

                        current = this._init ? undefined : this.__get(first);

                        if (Map.helpers.isObservable(current)) {
                            current._set(second, value);
                        } else {
                            throw "can.Map: Object does not exist";
                        }
                    } else {
                        if (this.__convert) {
                            //Convert if there is a converter
                            value = this.__convert(attr, value);
                        }
                        current = this._init ? undefined : this.__get(attr);
                        this.__set(attr, this.__type(value, attr), current);
                    }
                },
                __set: function(prop, value, current) {
                    // TODO: Check if value is object and transform.
                    // Don't do anything if the value isn't changing.
                    if (value !== current) {
                        // Check if we are adding this for the first time --
                        // if we are, we need to create an `add` event.
                        var changeType = current !== undefined || this.__get()
                            .hasOwnProperty(prop) ? "set" : "add";

                        // Set the value on `_data` and hook it up to send event.
                        this.___set(prop, this.constructor._bubble.set(this, prop, value, current));

                        // `batchTrigger` the change event.
                        this._triggerChange(prop, changeType, value, current);

                        // If we can stop listening to our old value, do it.
                        if (current) {
                            this.constructor._bubble.teardownFromParent(this, current);
                        }
                    }

                },
                // Directly sets a property on this `object`.
                ___set: function(prop, val) {
                    if (this._computedBindings[prop]) {
                        this[prop](val);
                    } else {
                        this._data[prop] = val;
                    }
                    // Add property directly for easy writing.
                    // Check if its on the `prototype` so we don't overwrite methods like `attrs`.
                    if (typeof this.constructor.prototype[prop] !== 'function' && !this._computedBindings[prop]) {
                        this[prop] = val;
                    }
                },

                bind: function(eventName, handler) {
                    var computedBinding = this._computedBindings && this._computedBindings[eventName];
                    if (computedBinding) {
                        // The first time we bind to this computed property we
                        // initialize `count` and `batchTrigger` the change event.
                        if (!computedBinding.count) {
                            computedBinding.count = 1;
                            var self = this;
                            computedBinding.handler = function(ev, newVal, oldVal) {
                                can.batch.trigger(self, {
                                        type: eventName,
                                        batchNum: ev.batchNum,
                                        target: self
                                    }, [newVal, oldVal]);
                            };
                            this[eventName].bind("change", computedBinding.handler);
                        } else {
                            // Increment number of things listening to this computed property.
                            computedBinding.count++;
                        }

                    }
                    // The first time we bind to this Map, `_bindsetup` will
                    // be called to setup child event bubbling.
                    this.constructor._bubble.bind(this, eventName);
                    return can.bindAndSetup.apply(this, arguments);

                },

                unbind: function(eventName, handler) {
                    var computedBinding = this._computedBindings && this._computedBindings[eventName];
                    if (computedBinding) {
                        // If there is only one listener, we unbind the change event handler
                        // and clean it up since no one is listening to this property any more.
                        if (computedBinding.count === 1) {
                            computedBinding.count = 0;
                            this[eventName].unbind("change", computedBinding.handler);
                            delete computedBinding.handler;
                        } else {
                            // Decrement number of things listening to this computed property
                            computedBinding.count--;
                        }

                    }
                    this.constructor._bubble.unbind(this, eventName);
                    return can.unbindAndTeardown.apply(this, arguments);

                },

                serialize: function() {
                    return can.Map.helpers.serialize(this, 'serialize', {});
                },

                _attrs: function(props, remove) {
                    if (props === undefined) {
                        return Map.helpers.serialize(this, 'attr', {});
                    }

                    props = can.simpleExtend({}, props);
                    var prop,
                        self = this,
                        newVal;

                    // Batch all of the change events until we are done.
                    can.batch.start();
                    // Merge current properties with the new ones.
                    this.each(function(curVal, prop) {
                        // You can not have a _cid property; abort.
                        if (prop === "_cid") {
                            return;
                        }
                        newVal = props[prop];

                        // If we are merging, remove the property if it has no value.
                        if (newVal === undefined) {
                            if (remove) {
                                self.removeAttr(prop);
                            }
                            return;
                        }

                        // Run converter if there is one
                        if (self.__convert) {
                            newVal = self.__convert(prop, newVal);
                        }

                        // If we're dealing with models, we want to call _set to let converters run.
                        if (Map.helpers.isObservable(newVal)) {

                            self.__set(prop, self.__type(newVal, prop), curVal);
                            // If its an object, let attr merge.
                        } else if (Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal)) {
                            curVal.attr(newVal, remove);
                            // Otherwise just set.
                        } else if (curVal !== newVal) {
                            self.__set(prop, self.__type(newVal, prop), curVal);
                        }

                        delete props[prop];
                    });
                    // Add remaining props.
                    for (prop in props) {
                        // Ignore _cid.
                        if (prop !== "_cid") {
                            newVal = props[prop];
                            this._set(prop, newVal, true);
                        }

                    }
                    can.batch.stop();
                    return this;
                },

                compute: function(prop) {
                    // If the property is a function, use it as the getter/setter
                    // otherwise, create a new compute that returns the value of a property on `this`
                    if (can.isFunction(this.constructor.prototype[prop])) {
                        return can.compute(this[prop], this);
                    } else {
                        var reads = prop.split("."),
                            last = reads.length - 1,
                            options = {
                                args: []
                            };
                        return can.compute(function(newVal) {
                            if (arguments.length) {
                                can.compute.read(this, reads.slice(0, last))
                                    .value.attr(reads[last], newVal);
                            } else {
                                return can.compute.read(this, reads, options)
                                    .value;
                            }
                        }, this);
                    }

                }
            });

        // Setup on/off aliases
        Map.prototype.on = Map.prototype.bind;
        Map.prototype.off = Map.prototype.unbind;

        return Map;
    })(__m2, __m19, __m20, __m15, __m21);

    // ## list/list.js
    var __m22 = (function(can, Map, bubble) {

        // Helpers for `observable` lists.
        var splice = [].splice,
            // test if splice works correctly
            spliceRemovesProps = (function() {
                // IE's splice doesn't remove properties
                var obj = {
                    0: "a",
                    length: 1
                };
                splice.call(obj, 0, 1);
                return !obj[0];
            })();


        var list = Map.extend(

            {

                Map: Map

            },

            {
                setup: function(instances, options) {
                    this.length = 0;
                    can.cid(this, ".map");
                    this._init = 1;
                    this._setupComputes();
                    instances = instances || [];
                    var teardownMapping;

                    if (can.isDeferred(instances)) {
                        this.replace(instances);
                    } else {
                        teardownMapping = instances.length && can.Map.helpers.addToMap(instances, this);
                        this.push.apply(this, can.makeArray(instances || []));
                    }

                    if (teardownMapping) {
                        teardownMapping();
                    }

                    // this change needs to be ignored
                    this.bind('change', can.proxy(this._changes, this));
                    can.simpleExtend(this, options);
                    delete this._init;
                },
                _triggerChange: function(attr, how, newVal, oldVal) {

                    Map.prototype._triggerChange.apply(this, arguments);
                    // `batchTrigger` direct add and remove events...
                    var index = +attr;
                    // Make sure this is not nested and not an expando
                    if (!~attr.indexOf('.') && !isNaN(index)) {

                        if (how === 'add') {
                            can.batch.trigger(this, how, [newVal, index]);
                            can.batch.trigger(this, 'length', [this.length]);
                        } else if (how === 'remove') {
                            can.batch.trigger(this, how, [oldVal, index]);
                            can.batch.trigger(this, 'length', [this.length]);
                        } else {
                            can.batch.trigger(this, how, [newVal, index]);
                        }

                    }

                },
                __get: function(attr) {
                    if (attr) {
                        if (this[attr] && this[attr].isComputed && can.isFunction(this.constructor.prototype[attr])) {
                            return this[attr]();
                        } else {
                            return this[attr];
                        }
                    } else {
                        return this;
                    }
                },
                ___set: function(attr, val) {
                    this[attr] = val;
                    if (+attr >= this.length) {
                        this.length = (+attr + 1);
                    }
                },
                _remove: function(prop, current) {
                    // if removing an expando property
                    if (isNaN(+prop)) {
                        delete this[prop];
                        this._triggerChange(prop, "remove", undefined, current);
                    } else {
                        this.splice(prop, 1);
                    }
                },
                _each: function(callback) {
                    var data = this.__get();
                    for (var i = 0; i < data.length; i++) {
                        callback(data[i], i);
                    }
                },
                // Returns the serialized form of this list.

                serialize: function() {
                    return Map.helpers.serialize(this, 'serialize', []);
                },

                splice: function(index, howMany) {
                    var args = can.makeArray(arguments),
                        added = [],
                        i, j;
                    for (i = 2; i < args.length; i++) {
                        args[i] = bubble.set(this, i, this.__type(args[i], i));
                        added.push(args[i]);
                    }
                    if (howMany === undefined) {
                        howMany = args[1] = this.length - index;
                    }
                    var removed = splice.apply(this, args),
                        cleanRemoved = removed;

                    // remove any items that were just added from the removed array
                    if (added.length && removed.length) {
                        for (j = 0; j < removed.length; j++) {
                            if (can.inArray(removed[j], added) >= 0) {
                                cleanRemoved.splice(j, 1);
                            }
                        }
                    }

                    if (!spliceRemovesProps) {
                        for (i = this.length; i < removed.length + this.length; i++) {
                            delete this[i];
                        }
                    }

                    can.batch.start();
                    if (howMany > 0) {
                        this._triggerChange("" + index, "remove", undefined, removed);
                        bubble.removeMany(this, removed);
                    }
                    if (args.length > 2) {
                        this._triggerChange("" + index, "add", args.slice(2), removed);
                    }
                    can.batch.stop();
                    return removed;
                },

                _attrs: function(items, remove) {
                    if (items === undefined) {
                        return Map.helpers.serialize(this, 'attr', []);
                    }

                    // Create a copy.
                    items = can.makeArray(items);

                    can.batch.start();
                    this._updateAttrs(items, remove);
                    can.batch.stop();
                },

                _updateAttrs: function(items, remove) {
                    var len = Math.min(items.length, this.length);

                    for (var prop = 0; prop < len; prop++) {
                        var curVal = this[prop],
                            newVal = items[prop];

                        if (Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal)) {
                            curVal.attr(newVal, remove);
                            //changed from a coercion to an explicit
                        } else if (curVal !== newVal) {
                            this._set(prop, newVal);
                        } else {

                        }
                    }
                    if (items.length > this.length) {
                        // Add in the remaining props.
                        this.push.apply(this, items.slice(this.length));
                    } else if (items.length < this.length && remove) {
                        this.splice(items.length);
                    }
                }
            }),

            // Converts to an `array` of arguments.
            getArgs = function(args) {
                return args[0] && can.isArray(args[0]) ?
                    args[0] :
                    can.makeArray(args);
            };
        // Create `push`, `pop`, `shift`, and `unshift`
        can.each({

                push: "length",

                unshift: 0
            },
            // Adds a method
            // `name` - The method name.
            // `where` - Where items in the `array` should be added.

            function(where, name) {
                var orig = [][name];
                list.prototype[name] = function() {
                    // Get the items being added.
                    var args = [],
                        // Where we are going to add items.
                        len = where ? this.length : 0,
                        i = arguments.length,
                        res, val;

                    // Go through and convert anything to an `map` that needs to be converted.
                    while (i--) {
                        val = arguments[i];
                        args[i] = bubble.set(this, i, this.__type(val, i));
                    }

                    // Call the original method.
                    res = orig.apply(this, args);

                    if (!this.comparator || args.length) {

                        this._triggerChange("" + len, "add", args, undefined);
                    }

                    return res;
                };
            });

        can.each({

                pop: "length",

                shift: 0
            },
            // Creates a `remove` type method

            function(where, name) {
                list.prototype[name] = function() {

                    var args = getArgs(arguments),
                        len = where && this.length ? this.length - 1 : 0;

                    var res = [][name].apply(this, args);

                    // Create a change where the args are
                    // `len` - Where these items were removed.
                    // `remove` - Items removed.
                    // `undefined` - The new values (there are none).
                    // `res` - The old, removed values (should these be unbound).
                    this._triggerChange("" + len, "remove", undefined, [res]);

                    if (res && res.unbind) {
                        bubble.remove(this, res);
                    }

                    return res;
                };
            });

        can.extend(list.prototype, {

                indexOf: function(item, fromIndex) {
                    this.attr('length');
                    return can.inArray(item, this, fromIndex);
                },


                join: function() {
                    return [].join.apply(this.attr(), arguments);
                },


                reverse: function() {
                    var list = can.makeArray([].reverse.call(this));
                    this.replace(list);
                },


                slice: function() {
                    var temp = Array.prototype.slice.apply(this, arguments);
                    return new this.constructor(temp);
                },


                concat: function() {
                    var args = [];
                    can.each(can.makeArray(arguments), function(arg, i) {
                        args[i] = arg instanceof can.List ? arg.serialize() : arg;
                    });
                    return new this.constructor(Array.prototype.concat.apply(this.serialize(), args));
                },


                forEach: function(cb, thisarg) {
                    return can.each(this, cb, thisarg || this);
                },


                replace: function(newList) {
                    if (can.isDeferred(newList)) {
                        newList.then(can.proxy(this.replace, this));
                    } else {
                        this.splice.apply(this, [0, this.length].concat(can.makeArray(newList || [])));
                    }

                    return this;
                },
                filter: function(callback, thisArg) {
                    var filteredList = new can.List(),
                        self = this,
                        filtered;
                    this.each(function(item, index, list) {
                        filtered = callback.call(thisArg | self, item, index, self);
                        if (filtered) {
                            filteredList.push(item);
                        }
                    });
                    return filteredList;
                }
            });
        can.List = Map.List = list;
        return can.List;
    })(__m2, __m18, __m20);

    // ## compute/compute.js
    var __m23 = (function(can, bind) {

        // ## Reading Helpers
        // The following methods are used to call a function that relies on
        // observable data and to track the observable events which should
        // be listened to when changes occur.
        // To do this, [`can.__reading(observable, event)`](#can-__reading) is called to
        // "broadcast" the corresponding event on each read.
        // ### Observed
        // An "Observed" is an object of observable objects and events that
        // a function relies on. These objects and events must be listened to
        // in order to determine when to check a function for updates.
        // This looks like the following:
        //     {
        //       "map1|first": {obj: map, event: "first"},
        //       "map1|last" : {obj: map, event: "last"}
        //     }
        // Each object-event pair is mapped so no duplicates will be listed.

        // ### State
        // `can.__read` may call a function that calls `can.__read` again. For
        // example, a compute can read another compute. To track each compute's
        // `Observed` object (containing observable objects and events), we maintain
        // a stack of Observed values for each call to `__read`.
        var stack = [];

        // ### can.__read
        // With a given function and context, calls the function
        // and returns the resulting value of the function as well
        // as the observable properties and events that were read.
        can.__read = function(func, self) {

            // Add an object that `can.__read` will write to.
            stack.push({});

            var value = func.call(self);

            // Example return value:
            // `{value: 100, observed: Observed}`
            return {
                value: value,
                observed: stack.pop()
            };
        };

        // ### can.__reading
        // When an observable value is read, it must call `can.__reading` to
        // broadcast which object and event should be listened to.
        can.__reading = function(obj, event) {
            // Add the observable object and the event
            // that was read to the `Observed` object on
            // the stack.
            if (stack.length) {
                stack[stack.length - 1][obj._cid + '|' + event] = {
                    obj: obj,
                    event: event + ""
                };
            }

        };

        // ### can.__clearReading
        // Clears and returns the current observables.
        // This can be used to access a value without
        // it being handled as a regular `read`.
        can.__clearReading = function() {
            if (stack.length) {
                var ret = stack[stack.length - 1];
                stack[stack.length - 1] = {};
                return ret;
            }
        };
        // Specifies current observables.
        can.__setReading = function(o) {
            if (stack.length) {
                stack[stack.length - 1] = o;
            }
        };
        can.__addReading = function(o) {
            if (stack.length) {
                can.simpleExtend(stack[stack.length - 1], o);
            }
        };

        // ## Section Name

        // ### getValueAndBind
        // Calls a function and sets up bindings to call `onchanged`
        // when events from its "Observed" object are triggered.
        // Removes bindings from `oldObserved` that are no longer needed.
        // - func - the function to call.
        // - context - the `this` of the function.
        // - oldObserved - an object that contains what has already been bound to
        // - onchanged - the function to call when any change occurs
        var getValueAndBind = function(func, context, oldObserved, onchanged) {
            // Call the function, get the value as well as the observed objects and events
            var info = can.__read(func, context),
                // The objects-event pairs that must be bound to
                newObserveSet = info.observed;
            // Go through what needs to be observed.
            bindNewSet(oldObserved, newObserveSet, onchanged);
            unbindOldSet(oldObserved, onchanged);

            return info;
        };
        // This will not be optimized.
        var bindNewSet = function(oldObserved, newObserveSet, onchanged) {
            for (var name in newObserveSet) {
                bindOrPreventUnbinding(oldObserved, newObserveSet, name, onchanged);
            }
        };
        // This will be optimized.
        var bindOrPreventUnbinding = function(oldObserved, newObserveSet, name, onchanged) {
            if (oldObserved[name]) {
                // After binding is set up, values
                // in `oldObserved` will be unbound. So if a name
                // has already be observed, remove from `oldObserved`
                // to prevent this.
                delete oldObserved[name];
            } else {
                // If current name has not been observed, listen to it.
                var obEv = newObserveSet[name];
                obEv.obj.bind(obEv.event, onchanged);
            }
        };
        // Iterate through oldObserved, looking for observe/attributes
        // that are no longer being bound and unbind them.
        var unbindOldSet = function(oldObserved, onchanged) {
            for (var name in oldObserved) {
                var obEv = oldObserved[name];
                obEv.obj.unbind(obEv.event, onchanged);
            }
        };

        // ### updateOnChange
        // Fires a change event when a compute's value changes
        var updateOnChange = function(compute, newValue, oldValue, batchNum) {
            // Only trigger event when value has changed
            if (newValue !== oldValue) {
                can.batch.trigger(compute, batchNum ? {
                        type: "change",
                        batchNum: batchNum
                    } : 'change', [
                        newValue,
                        oldValue
                    ]);
            }
        };

        // ###setupComputeHandlers
        // Sets up handlers for a compute.
        // - compute - the compute to set up handlers for
        // - func - the getter/setter function for the compute
        // - context - the `this` for the compute
        // - setCachedValue - function for setting cached value
        // Returns an object with `on` and `off` functions.
        var setupComputeHandlers = function(compute, func, context, setCachedValue) {
            var readInfo,
                onchanged,
                batchNum;

            return {
                // Set up handler for when the compute changes
                on: function(updater) {
                    if (!onchanged) {
                        onchanged = function(ev) {
                            if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                                // Keep the old value
                                var oldValue = readInfo.value;

                                // Get the new value
                                readInfo = getValueAndBind(func, context, readInfo.observed, onchanged);

                                // Call the updater with old and new values
                                updater(readInfo.value, oldValue, ev.batchNum);

                                batchNum = batchNum = ev.batchNum;
                            }
                        };
                    }

                    readInfo = getValueAndBind(func, context, {}, onchanged);

                    setCachedValue(readInfo.value);

                    compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
                },
                // Remove handler for the compute
                off: function(updater) {
                    for (var name in readInfo.observed) {
                        var ob = readInfo.observed[name];
                        ob.obj.unbind(ob.event, onchanged);
                    }
                }
            };
        };
        var setupSingleBindComputeHandlers = function(compute, func, context, setCachedValue) {
            var readInfo,
                oldValue,
                onchanged,
                batchNum;

            return {
                // Set up handler for when the compute changes
                on: function(updater) {
                    if (!onchanged) {
                        onchanged = function(ev) {
                            if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                                // Get the new value
                                var reads = can.__clearReading();
                                var newValue = func.call(context);
                                can.__setReading(reads);
                                // Call the updater with old and new values
                                updater(newValue, oldValue, ev.batchNum);
                                oldValue = newValue;
                                batchNum = batchNum = ev.batchNum;
                            }
                        };
                    }

                    readInfo = getValueAndBind(func, context, {}, onchanged);
                    oldValue = readInfo.value;

                    setCachedValue(readInfo.value);

                    compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
                },
                // Remove handler for the compute
                off: function(updater) {
                    for (var name in readInfo.observed) {
                        var ob = readInfo.observed[name];
                        ob.obj.unbind(ob.event, onchanged);
                    }
                }
            };
        };

        // ###isObserve
        // Checks if an object is observable
        var isObserve = function(obj) {
            return obj instanceof can.Map || obj && obj.__get;
        },
            // Instead of calculating whether anything is listening every time,
            // use a function to do nothing (which may be overwritten)
            k = function() {};

        // ## Creating a can.compute
        // A `can.compute` can be created by
        // - [Specifying the getterSeter function](#specifying-gettersetter-function)
        // - [Observing a property of an object](#observing-a-property-of-an-object)
        // - [Specifying an initial value and a setter function](#specifying-an-initial-value-and-a-setter)
        // - [Specifying an initial value and how to read, update, and listen to changes](#specifying-an-initial-value-and-a-settings-object)
        // - [Simply specifying an initial value](#specifying-only-a-value)
        can.compute = function(getterSetter, context, eventName, bindOnce) {
            // ### Setting up
            // Do nothing if getterSetter is already a compute
            if (getterSetter && getterSetter.isComputed) {
                return getterSetter;
            }
            // The computed object
            var computed,
                // The following functions are overwritten depending on how compute() is called
                // A method to set up listening
                on = k,
                // A method to teardown listening
                off = k,
                // Current cached value (valid only when bound is true)
                value,
                // How the value is read by default
                get = function() {
                    return value;
                },
                // How the value is set by default
                set = function(newVal) {
                    value = newVal;
                },
                setCached = set,
                // Save arguments for cloning
                args = [],
                // updater for when value is changed
                updater = function(newValue, oldValue, batchNum) {
                    setCached(newValue);
                    updateOnChange(computed, newValue, oldValue, batchNum);
                },
                // the form of the arguments
                form;


            // convert arguments to args to make V8 Happy
            for (var i = 0, arglen = arguments.length; i < arglen; i++) {
                args[i] = arguments[i];
            }

            computed = function(newVal) {
                // If the computed function is called with arguments,
                // a value should be set
                if (arguments.length) {
                    // Save a reference to the old value
                    var old = value;
                    // Setter may return the value if setter
                    // is for a value maintained exclusively by this compute.
                    var setVal = set.call(context, newVal, old);
                    // If the computed function has dependencies,
                    // return the current value
                    if (computed.hasDependencies) {
                        return get.call(context);
                    }
                    // Setting may not fire a change event, in which case
                    // the value must be read
                    if (setVal === undefined) {
                        value = get.call(context);
                    } else {
                        value = setVal;
                    }
                    // Fire the change
                    updateOnChange(computed, value, old);
                    return value;
                } else {
                    // Another compute may bind to this `computed`
                    if (stack.length && computed.canReadForChangeEvent !== false) {

                        // Tell the compute to listen to change on this computed
                        // Use `can.__reading` to allow other compute to listen
                        // for a change on this `computed`
                        can.__reading(computed, 'change');
                        // We are going to bind on this compute.
                        // If we are not bound, we should bind so that
                        // we don't have to re-read to get the value of this compute.
                        if (!computed.bound) {
                            can.compute.temporarilyBind(computed);
                        }
                    }
                    // If computed is bound, use the cached value
                    if (computed.bound) {
                        return value;
                    } else {
                        return get.call(context);
                    }
                }
            };
            // ###Specifying getterSetter function
            // If `can.compute` is [called with a getterSetter function](http://canjs.com/docs/can.compute.html#sig_can_compute_getterSetter__context__),
            // override set and get
            if (typeof getterSetter === 'function') {
                // `can.compute(getterSetter, [context])`
                set = getterSetter;
                get = getterSetter;
                computed.canReadForChangeEvent = eventName === false ? false : true;

                var handlers = bindOnce ?
                    setupSingleBindComputeHandlers(computed, getterSetter, context || this, setCached) :
                    setupComputeHandlers(computed, getterSetter, context || this, setCached);
                on = handlers.on;
                off = handlers.off;

                // ###Observing a property of an object
                // If `can.compute` is called with an
                // [object, property name, and optional event name](http://canjs.com/docs/can.compute.html#sig_can_compute_object_propertyName__eventName__),
                // create a compute from a property of an object. This allows the
                // creation of a compute on objects that can be listened to with [`can.bind`](http://canjs.com/docs/can.bind.html)
            } else if (context) {
                if (typeof context === 'string') {
                    // `can.compute(obj, "propertyName", [eventName])`
                    var propertyName = context,
                        isObserve = getterSetter instanceof can.Map;
                    if (isObserve) {
                        computed.hasDependencies = true;
                        var handler;
                        get = function() {
                            return getterSetter.attr(propertyName);
                        };
                        set = function(newValue) {
                            getterSetter.attr(propertyName, newValue);
                        };
                        on = function(update) {
                            handler = function(ev, newVal, oldVal) {
                                update(newVal, oldVal, ev.batchNum);
                            };
                            getterSetter.bind(eventName || propertyName, handler);
                            // Set the cached value
                            value = can.__read(get).value;
                        };
                        off = function(update) {
                            getterSetter.unbind(eventName || propertyName, handler);
                        };
                    } else {
                        get = function() {
                            return getterSetter[propertyName];
                        };
                        set = function(newValue) {
                            getterSetter[propertyName] = newValue;
                        };

                        on = function(update) {
                            handler = function() {
                                update(get(), value);
                            };
                            can.bind.call(getterSetter, eventName || propertyName, handler);
                            // use can.__read because
                            // we should not be indicating that some parent
                            // reads this property if it happens to be binding on it
                            value = can.__read(get)
                                .value;
                        };
                        off = function(update) {
                            can.unbind.call(getterSetter, eventName || propertyName, handler);
                        };
                    }
                    // ###Specifying an initial value and a setter
                    // If `can.compute` is called with an [initial value and a setter function](http://canjs.com/docs/can.compute.html#sig_can_compute_initialValue_setter_newVal_oldVal__),
                    // a compute that can adjust incoming values is set up.
                } else {
                    // `can.compute(initialValue, setter)`
                    if (typeof context === 'function') {

                        value = getterSetter;
                        set = context;
                        context = eventName;
                        form = 'setter';
                        // ###Specifying an initial value and a settings object
                        // If `can.compute` is called with an [initial value and optionally a settings object](http://canjs.com/docs/can.compute.html#sig_can_compute_initialValue__settings__),
                        // a can.compute is created that can optionally specify how to read,
                        // update, and listen to changes in dependent values. This form of
                        // can.compute can be used to derive a compute that derives its
                        // value from any source
                    } else {
                        // `can.compute(initialValue,{get:, set:, on:, off:})`


                        value = getterSetter;
                        var options = context,
                            oldUpdater = updater;

                        context = options.context || options;
                        get = options.get || get;
                        set = options.set || function() {
                            return value;
                        };
                        // This is a "hack" to allow async computes.
                        if (options.fn) {
                            var fn = options.fn,
                                data;
                            // make sure get is called with the newVal, but not setter
                            get = function() {
                                return fn.call(context, value);
                            };
                            // Check the number of arguments the
                            // async function takes.
                            if (fn.length === 0) {

                                data = setupComputeHandlers(computed, fn, context, setCached);

                            } else if (fn.length === 1) {
                                data = setupComputeHandlers(computed, function() {
                                    return fn.call(context, value);
                                }, context, setCached);
                            } else {
                                updater = function(newVal) {
                                    if (newVal !== undefined) {
                                        oldUpdater(newVal, value);
                                    }
                                };
                                data = setupComputeHandlers(computed, function() {
                                    var res = fn.call(context, value, function(newVal) {
                                        oldUpdater(newVal, value);
                                    });
                                    // If undefined is returned, don't update the value.
                                    return res !== undefined ? res : value;
                                }, context, setCached);
                            }


                            on = data.on;
                            off = data.off;
                        } else {
                            updater = function() {
                                var newVal = get.call(context);
                                oldUpdater(newVal, value);
                            };
                        }

                        on = options.on || on;
                        off = options.off || off;
                    }
                }
                // ###Specifying only a value
                // If can.compute is called with an initialValue only,
                // reads to this value can be observed.
            } else {
                // `can.compute(initialValue)`
                value = getterSetter;
            }
            can.cid(computed, 'compute');
            return can.simpleExtend(computed, {

                    isComputed: true,
                    _bindsetup: function() {
                        this.bound = true;
                        // Set up live-binding
                        // While binding, this should not count as a read
                        var oldReading = can.__clearReading();
                        on.call(this, updater);
                        // Restore "Observed" for reading
                        can.__setReading(oldReading);
                    },
                    _bindteardown: function() {
                        off.call(this, updater);
                        this.bound = false;
                    },

                    bind: can.bindAndSetup,

                    unbind: can.unbindAndTeardown,
                    clone: function(context) {
                        if (context) {
                            if (form === 'setter') {
                                args[2] = context;
                            } else {
                                args[1] = context;
                            }
                        }
                        return can.compute.apply(can, args);
                    }
                });
        };
        // A list of temporarily bound computes
        var computes, unbindComputes = function() {
                for (var i = 0, len = computes.length; i < len; i++) {
                    computes[i].unbind('change', k);
                }
                computes = null;
            };
        // Binds computes for a moment to retain their value and prevent caching
        can.compute.temporarilyBind = function(compute) {
            compute.bind('change', k);
            if (!computes) {
                computes = [];
                setTimeout(unbindComputes, 10);
            }
            computes.push(compute);
        };

        // Whether a compute is truthy
        can.compute.truthy = function(compute) {
            return can.compute(function() {
                var res = compute();
                if (typeof res === 'function') {
                    res = res();
                }
                return !!res;
            });
        };
        can.compute.async = function(initialValue, asyncComputer, context) {
            return can.compute(initialValue, {
                    fn: asyncComputer,
                    context: context
                });
        };
        // {map: new can.Map({first: "Justin"})}, ["map","first"]
        can.compute.read = function(parent, reads, options) {
            options = options || {};
            // `cur` is the current value.
            var cur = parent,
                type,
                // `prev` is the object we are reading from.
                prev,
                // `foundObs` did we find an observable.
                foundObs;
            for (var i = 0, readLength = reads.length; i < readLength; i++) {
                // Update what we are reading from.
                prev = cur;
                // Read from the compute. We can't read a property yet.
                if (prev && prev.isComputed) {
                    if (options.foundObservable) {
                        options.foundObservable(prev, i);
                    }
                    prev = cur = prev();
                }
                // Look to read a property from something.
                if (isObserve(prev)) {
                    if (!foundObs && options.foundObservable) {
                        options.foundObservable(prev, i);
                    }
                    foundObs = 1;
                    // is it a method on the prototype?
                    if (typeof prev[reads[i]] === 'function' && prev.constructor.prototype[reads[i]] === prev[reads[i]]) {
                        // call that method
                        if (options.returnObserveMethods) {
                            cur = cur[reads[i]];
                        } else if (reads[i] === 'constructor' && prev instanceof can.Construct) {
                            cur = prev[reads[i]];
                        } else {
                            cur = prev[reads[i]].apply(prev, options.args || []);
                        }
                    } else {
                        // use attr to get that value
                        cur = cur.attr(reads[i]);
                    }
                } else {
                    // just do the dot operator
                    cur = prev[reads[i]];
                }
                type = typeof cur;
                // If it's a compute, get the compute's value
                // unless we are at the end of the
                if (cur && cur.isComputed && (!options.isArgument && i < readLength - 1)) {
                    if (!foundObs && options.foundObservable) {
                        options.foundObservable(prev, i + 1);
                    }
                    cur = cur();
                }
                // If it's an anonymous function, execute as requested
                else if (i < reads.length - 1 && type === 'function' && options.executeAnonymousFunctions && !(can.Construct && cur.prototype instanceof can.Construct)) {
                    cur = cur();
                }
                // if there are properties left to read, and we don't have an object, early exit
                if (i < reads.length - 1 && (cur === null || type !== 'function' && type !== 'object')) {
                    if (options.earlyExit) {
                        options.earlyExit(prev, i, cur);
                    }
                    // return undefined so we know this isn't the right value
                    return {
                        value: undefined,
                        parent: prev
                    };
                }
            }
            // handle an ending function
            // unless it is a can.Construct-derived constructor
            if (typeof cur === 'function' && !(can.Construct && cur.prototype instanceof can.Construct) && !(can.route && cur === can.route)) {
                if (options.isArgument) {
                    if (!cur.isComputed && options.proxyMethods !== false) {
                        cur = can.proxy(cur, prev);
                    }
                } else {
                    if (cur.isComputed && !foundObs && options.foundObservable) {
                        options.foundObservable(cur, i);
                    }
                    cur = cur.call(prev);
                }
            }
            // if we don't have a value, exit early.
            if (cur === undefined) {
                if (options.earlyExit) {
                    options.earlyExit(prev, i - 1);
                }
            }
            return {
                value: cur,
                parent: prev
            };
        };

        return can.compute;
    })(__m2, __m19, __m21);

    // ## observe/observe.js
    var __m17 = (function(can) {
        can.Observe = can.Map;
        can.Observe.startBatch = can.batch.start;
        can.Observe.stopBatch = can.batch.stop;
        can.Observe.triggerBatch = can.batch.trigger;
        return can;
    })(__m2, __m18, __m22, __m23);

    // ## view/scope/scope.js
    var __m25 = (function(can) {

        // ## Helpers

        // Regex for escaped periods
        var escapeReg = /(\\)?\./g,
            // Regex for double escaped periods
            escapeDotReg = /\\\./g,
            // **getNames**
            // Returns array of names by splitting provided string by periods and single escaped periods.
            // ```getNames("a.b\.c.d\\.e") //-> ['a', 'b', 'c', 'd.e']```
            getNames = function(attr) {
                var names = [],
                    last = 0;
                // Goes through attr string and places the characters found between the periods and single escaped periods into the
                // `names` array.  Double escaped periods are ignored.
                attr.replace(escapeReg, function(first, second, index) {

                    if (!second) {
                        names.push(
                            attr
                            .slice(last, index)

                            .replace(escapeDotReg, '.'));
                        last = index + first.length;
                    }
                });

                names.push(
                    attr
                    .slice(last)

                    .replace(escapeDotReg, '.'));
                return names;
            };


        var Scope = can.Construct.extend(


            {
                // ## Scope.read
                // Scope.read was moved to can.compute.read
                // can.compute.read reads properties from a parent.  A much more complex version of getObject.
                read: can.compute.read
            },

            {
                init: function(context, parent) {
                    this._context = context;
                    this._parent = parent;
                    this.__cache = {};
                },

                // ## Scope.prototype.attr
                // Reads a value from the current context or parent contexts.
                attr: function(key) {
                    // Reads for whatever called before attr.  It's possible
                    // that this.read clears them.  We want to restore them.
                    var previousReads = can.__clearReading(),
                        res = this.read(key, {
                                isArgument: true,
                                returnObserveMethods: true,
                                proxyMethods: false
                            }).value;
                    can.__setReading(previousReads);
                    return res;
                },

                // ## Scope.prototype.add
                // Creates a new scope and sets the current scope to be the parent.
                // ```
                // var scope = new can.view.Scope([{name:"Chris"}, {name: "Justin"}]).add({name: "Brian"});
                // scope.attr("name") //-> "Brian"
                // ```
                add: function(context) {
                    if (context !== this._context) {
                        return new this.constructor(context, this);
                    } else {
                        return this;
                    }
                },

                // ## Scope.prototype.computeData
                // Finds the first location of the key in the scope and then provides a get-set compute that represents the key's value
                // and other information about where the value was found.
                computeData: function(key, options) {
                    options = options || {
                        args: []
                    };
                    var self = this,
                        rootObserve,
                        rootReads,
                        computeData = {
                            // computeData.compute returns a get-set compute that is tied to the first location of the provided
                            // key in the context of the scope.
                            compute: can.compute(function(newVal) {
                                // **Compute setter**
                                if (arguments.length) {
                                    if (rootObserve.isComputed && !rootReads.length) {
                                        rootObserve(newVal);
                                    } else {
                                        var last = rootReads.length - 1;
                                        can.compute.read(rootObserve, rootReads.slice(0, last))
                                            .value.attr(rootReads[last], newVal);
                                    }
                                    // **Compute getter**
                                } else {
                                    // If computeData has found the value for the key in the past in an observable then go directly to
                                    // the observable (rootObserve) that the value was found in the last time and return the new value.  This
                                    // is a huge performance gain for the fact that we aren't having to check the entire scope each time.
                                    if (rootObserve) {
                                        return can.compute.read(rootObserve, rootReads, options)
                                            .value;
                                    }
                                    // If the key has not already been located in a observable then we need to search the scope for the
                                    // key.  Once we find the key then we need to return it's value and if it is found in an observable
                                    // then we need to store the observable so the next time this compute is called it can grab the value
                                    // directly from the observable.
                                    var data = self.read(key, options);
                                    rootObserve = data.rootObserve;
                                    rootReads = data.reads;
                                    computeData.scope = data.scope;
                                    computeData.initialValue = data.value;
                                    computeData.reads = data.reads;
                                    computeData.root = rootObserve;
                                    return data.value;
                                }
                            })
                        };
                    return computeData;
                },

                // ## Scope.prototype.compute
                // Provides a get-set compute that represents a key's value.
                compute: function(key, options) {
                    return this.computeData(key, options)
                        .compute;
                },

                // ## Scope.prototype.read
                // Finds the first isntance of a key in the available scopes and returns the keys value along with the the observable the key
                // was found in, readsData and the current scope.

                read: function(attr, options) {
                    // check if we should only look within current scope
                    var stopLookup;
                    if (attr.substr(0, 2) === './') {
                        // set flag to halt lookup from walking up scope
                        stopLookup = true;
                        // stop lookup from checking parent scopes
                        attr = attr.substr(2);
                    }
                    // check if we should be running this on a parent.
                    else if (attr.substr(0, 3) === "../") {
                        return this._parent.read(attr.substr(3), options);
                    } else if (attr === "..") {
                        return {
                            value: this._parent._context
                        };
                    } else if (attr === "." || attr === "this") {
                        return {
                            value: this._context
                        };
                    }

                    // Array of names from splitting attr string into names.  ```"a.b\.c.d\\.e" //-> ['a', 'b', 'c', 'd.e']```
                    var names = attr.indexOf('\\.') === -1 ?
                    // Reference doesn't contain escaped periods
                    attr.split('.')
                    // Reference contains escaped periods ```(`a.b\.c.foo` == `a["b.c"].foo)```
                    : getNames(attr),
                        // The current context (a scope is just data and a parent scope).
                        context,
                        // The current scope.
                        scope = this,
                        // While we are looking for a value, we track the most likely place this value will be found.
                        // This is so if there is no me.name.first, we setup a listener on me.name.
                        // The most likely candidate is the one with the most "read matches" "lowest" in the
                        // context chain.
                        // By "read matches", we mean the most number of values along the key.
                        // By "lowest" in the context chain, we mean the closest to the current context.
                        // We track the starting position of the likely place with `defaultObserve`.
                        defaultObserve,
                        // Tracks how to read from the defaultObserve.
                        defaultReads = [],
                        // Tracks the highest found number of "read matches".
                        defaultPropertyDepth = -1,
                        // `scope.read` is designed to be called within a compute, but
                        // for performance reasons only listens to observables within one context.
                        // This is to say, if you have me.name in the current context, but me.name.first and
                        // we are looking for me.name.first, we don't setup bindings on me.name and me.name.first.
                        // To make this happen, we clear readings if they do not find a value.  But,
                        // if that path turns out to be the default read, we need to restore them.  This
                        // variable remembers those reads so they can be restored.
                        defaultComputeReadings,
                        // Tracks the default's scope.
                        defaultScope,
                        // Tracks the first found observe.
                        currentObserve,
                        // Tracks the reads to get the value for a scope.
                        currentReads;

                    // Goes through each scope context provided until it finds the key (attr).  Once the key is found
                    // then it's value is returned along with an observe, the current scope and reads.
                    // While going through each scope context searching for the key, each observable found is returned and
                    // saved so that either the observable the key is found in can be returned, or in the case the key is not
                    // found in an observable the closest observable can be returned.

                    while (scope) {
                        context = scope._context;
                        if (context !== null) {
                            var data = can.compute.read(context, names, can.simpleExtend({

                                        foundObservable: function(observe, nameIndex) {
                                            currentObserve = observe;
                                            currentReads = names.slice(nameIndex);
                                        },
                                        // Called when we were unable to find a value.
                                        earlyExit: function(parentValue, nameIndex) {

                                            if (nameIndex > defaultPropertyDepth) {
                                                defaultObserve = currentObserve;
                                                defaultReads = currentReads;
                                                defaultPropertyDepth = nameIndex;
                                                defaultScope = scope;

                                                defaultComputeReadings = can.__clearReading();
                                            }
                                        },
                                        // Execute anonymous functions found along the way
                                        executeAnonymousFunctions: true
                                    }, options));
                            // **Key was found**, return value and location data
                            if (data.value !== undefined) {
                                return {
                                    scope: scope,
                                    rootObserve: currentObserve,
                                    value: data.value,
                                    reads: currentReads
                                };
                            }
                        }
                        // Prevent prior readings and then move up to the next scope.
                        can.__clearReading();
                        if (!stopLookup) {
                            // Move up to the next scope.
                            scope = scope._parent;
                        } else {
                            scope = null;
                        }
                    }

                    // **Key was not found**, return undefined for the value.  Unless an observable was
                    // found in the process of searching for the key, then return the most likely observable along with it's
                    // scope and reads.

                    if (defaultObserve) {
                        can.__setReading(defaultComputeReadings);
                        return {
                            scope: defaultScope,
                            rootObserve: defaultObserve,
                            reads: defaultReads,
                            value: undefined
                        };
                    } else {
                        return {
                            names: names,
                            value: undefined
                        };
                    }
                }
            });

        can.view.Scope = Scope;
        return Scope;
    })(__m2, __m15, __m18, __m22, __m13, __m23);

    // ## view/elements.js
    var __m27 = (function(can) {

        var selectsCommentNodes = (function() {
            return can.$(document.createComment('~')).length === 1;
        })();


        var elements = {
            tagToContentPropMap: {
                option: 'textContent' in document.createElement('option') ? 'textContent' : 'innerText',
                textarea: 'value'
            },

            // 3.0 TODO: remove
            attrMap: can.attr.map,
            // matches the attrName of a regexp
            attrReg: /([^\s=]+)[\s]*=[\s]*/,
            // 3.0 TODO: remove
            defaultValue: can.attr.defaultValue,
            // a map of parent element to child elements

            tagMap: {
                '': 'span',
                colgroup: 'col',
                table: 'tbody',
                tr: 'td',
                ol: 'li',
                ul: 'li',
                tbody: 'tr',
                thead: 'tr',
                tfoot: 'tr',
                select: 'option',
                optgroup: 'option'
            },
            // a tag's parent element
            reverseTagMap: {
                col: 'colgroup',
                tr: 'tbody',
                option: 'select',
                td: 'tr',
                th: 'tr',
                li: 'ul'
            },
            // Used to determine the parentNode if el is directly within a documentFragment
            getParentNode: function(el, defaultParentNode) {
                return defaultParentNode && el.parentNode.nodeType === 11 ? defaultParentNode : el.parentNode;
            },
            // 3.0 TODO: remove
            setAttr: can.attr.set,
            // 3.0 TODO: remove
            getAttr: can.attr.get,
            // 3.0 TODO: remove
            removeAttr: can.attr.remove,
            // Gets a "pretty" value for something
            contentText: function(text) {
                if (typeof text === 'string') {
                    return text;
                }
                // If has no value, return an empty string.
                if (!text && text !== 0) {
                    return '';
                }
                return '' + text;
            },

            after: function(oldElements, newFrag) {
                var last = oldElements[oldElements.length - 1];
                // Insert it in the `document` or `documentFragment`
                if (last.nextSibling) {
                    can.insertBefore(last.parentNode, newFrag, last.nextSibling);
                } else {
                    can.appendChild(last.parentNode, newFrag);
                }
            },

            replace: function(oldElements, newFrag) {
                elements.after(oldElements, newFrag);
                if (can.remove(can.$(oldElements)).length < oldElements.length && !selectsCommentNodes) {
                    can.each(oldElements, function(el) {
                        if (el.nodeType === 8) {
                            el.parentNode.removeChild(el);
                        }
                    });
                }
            }
        };

        can.view.elements = elements;

        return elements;
    })(__m2, __m13);

    // ## view/scanner.js
    var __m26 = (function(can, elements, viewCallbacks) {


        var newLine = /(\r|\n)+/g,
            notEndTag = /\//,
            // Escapes characters starting with `\`.
            clean = function(content) {
                return content
                    .split('\\')
                    .join("\\\\")
                    .split("\n")
                    .join("\\n")
                    .split('"')
                    .join('\\"')
                    .split("\t")
                    .join("\\t");
            },
            // Returns a tagName to use as a temporary placeholder for live content
            // looks forward ... could be slow, but we only do it when necessary
            getTag = function(tagName, tokens, i) {
                // if a tagName is provided, use that
                if (tagName) {
                    return tagName;
                } else {
                    // otherwise go searching for the next two tokens like "<",TAG
                    while (i < tokens.length) {
                        if (tokens[i] === "<" && !notEndTag.test(tokens[i + 1])) {
                            return elements.reverseTagMap[tokens[i + 1]] || 'span';
                        }
                        i++;
                    }
                }
                return '';
            },
            bracketNum = function(content) {
                return (--content.split("{")
                    .length) - (--content.split("}")
                    .length);
            },
            myEval = function(script) {
                eval(script);
            },
            attrReg = /([^\s]+)[\s]*=[\s]*$/,
            // Commands for caching.
            startTxt = 'var ___v1ew = [];',
            finishTxt = "return ___v1ew.join('')",
            put_cmd = "___v1ew.push(\n",
            insert_cmd = put_cmd,
            // Global controls (used by other functions to know where we are).
            // Are we inside a tag?
            htmlTag = null,
            // Are we within a quote within a tag?
            quote = null,
            // What was the text before the current quote? (used to get the `attr` name)
            beforeQuote = null,
            // Whether a rescan is in progress
            rescan = null,
            getAttrName = function() {
                var matches = beforeQuote.match(attrReg);
                return matches && matches[1];
            },
            // Used to mark where the element is.
            status = function() {
                // `t` - `1`.
                // `h` - `0`.
                // `q` - String `beforeQuote`.
                return quote ? "'" + getAttrName() + "'" : (htmlTag ? 1 : 0);
            },
            // returns the top of a stack
            top = function(stack) {
                return stack[stack.length - 1];
            },
            Scanner;


        can.view.Scanner = Scanner = function(options) {
            // Set options on self
            can.extend(this, {

                    text: {},
                    tokens: []
                }, options);
            // make sure it's an empty string if it's not
            this.text.options = this.text.options || "";

            // Cache a token lookup
            this.tokenReg = [];
            this.tokenSimple = {
                "<": "<",
                ">": ">",
                '"': '"',
                "'": "'"
            };
            this.tokenComplex = [];
            this.tokenMap = {};
            for (var i = 0, token; token = this.tokens[i]; i++) {


                // Save complex mappings (custom regexp)
                if (token[2]) {
                    this.tokenReg.push(token[2]);
                    this.tokenComplex.push({
                            abbr: token[1],
                            re: new RegExp(token[2]),
                            rescan: token[3]
                        });
                }
                // Save simple mappings (string only, no regexp)
                else {
                    this.tokenReg.push(token[1]);
                    this.tokenSimple[token[1]] = token[0];
                }
                this.tokenMap[token[0]] = token[1];
            }

            // Cache the token registry.
            this.tokenReg = new RegExp("(" + this.tokenReg.slice(0)
                .concat(["<", ">", '"', "'"])
                .join("|") + ")", "g");
        };


        Scanner.prototype = {
            // a default that can be overwritten
            helpers: [],

            scan: function(source, name) {
                var tokens = [],
                    last = 0,
                    simple = this.tokenSimple,
                    complex = this.tokenComplex;

                source = source.replace(newLine, "\n");
                if (this.transform) {
                    source = this.transform(source);
                }
                source.replace(this.tokenReg, function(whole, part) {
                    // offset is the second to last argument
                    var offset = arguments[arguments.length - 2];

                    // if the next token starts after the last token ends
                    // push what's in between
                    if (offset > last) {
                        tokens.push(source.substring(last, offset));
                    }

                    // push the simple token (if there is one)
                    if (simple[whole]) {
                        tokens.push(whole);
                    }
                    // otherwise lookup complex tokens
                    else {
                        for (var i = 0, token; token = complex[i]; i++) {
                            if (token.re.test(whole)) {
                                tokens.push(token.abbr);
                                // Push a rescan function if one exists
                                if (token.rescan) {
                                    tokens.push(token.rescan(part));
                                }
                                break;
                            }
                        }
                    }

                    // update the position of the last part of the last token
                    last = offset + part.length;
                });

                // if there's something at the end, add it
                if (last < source.length) {
                    tokens.push(source.substr(last));
                }

                var content = '',
                    buff = [startTxt + (this.text.start || '')],
                    // Helper `function` for putting stuff in the view concat.
                    put = function(content, bonus) {
                        buff.push(put_cmd, '"', clean(content), '"' + (bonus || '') + ');');
                    },
                    // A stack used to keep track of how we should end a bracket
                    // `}`.
                    // Once we have a `<%= %>` with a `leftBracket`,
                    // we store how the file should end here (either `))` or `;`).
                    endStack = [],
                    // The last token, used to remember which tag we are in.
                    lastToken,
                    // The corresponding magic tag.
                    startTag = null,
                    // Was there a magic tag inside an html tag?
                    magicInTag = false,
                    // was there a special state
                    specialStates = {
                        attributeHookups: [],
                        // a stack of tagHookups
                        tagHookups: [],
                        //last tag hooked up
                        lastTagHookup: ''
                    },
                    // Helper `function` for removing tagHookups from the hookup stack
                    popTagHookup = function() {
                        // The length of tagHookups is the nested depth which can be used to uniquely identify custom tags of the same type
                        specialStates.lastTagHookup = specialStates.tagHookups.pop() + specialStates.tagHookups.length;
                    },
                    // The current tag name.
                    tagName = '',
                    // stack of tagNames
                    tagNames = [],
                    // Pop from tagNames?
                    popTagName = false,
                    // Declared here.
                    bracketCount,
                    // in a special attr like src= or style=
                    specialAttribute = false,

                    i = 0,
                    token,
                    tmap = this.tokenMap,
                    attrName;

                // Reinitialize the tag state goodness.
                htmlTag = quote = beforeQuote = null;
                for (;
                    (token = tokens[i++]) !== undefined;) {
                    if (startTag === null) {
                        switch (token) {
                            case tmap.left:
                            case tmap.escapeLeft:
                            case tmap.returnLeft:
                                magicInTag = htmlTag && 1;

                            case tmap.commentLeft:
                                // A new line -- just add whatever content within a clean.
                                // Reset everything.
                                startTag = token;
                                if (content.length) {
                                    put(content);
                                }
                                content = '';
                                break;
                            case tmap.escapeFull:
                                // This is a full line escape (a line that contains only whitespace and escaped logic)
                                // Break it up into escape left and right
                                magicInTag = htmlTag && 1;
                                rescan = 1;
                                startTag = tmap.escapeLeft;
                                if (content.length) {
                                    put(content);
                                }
                                rescan = tokens[i++];
                                content = rescan.content || rescan;
                                if (rescan.before) {
                                    put(rescan.before);
                                }
                                tokens.splice(i, 0, tmap.right);
                                break;
                            case tmap.commentFull:
                                // Ignore full line comments.
                                break;
                            case tmap.templateLeft:
                                content += tmap.left;
                                break;
                            case '<':
                                // Make sure we are not in a comment.
                                if (tokens[i].indexOf("!--") !== 0) {
                                    htmlTag = 1;
                                    magicInTag = 0;
                                }

                                content += token;

                                break;
                            case '>':
                                htmlTag = 0;
                                // content.substr(-1) doesn't work in IE7/8
                                var emptyElement = (content.substr(content.length - 1) === "/" || content.substr(content.length - 2) === "--"),
                                    attrs = "";
                                // if there was a magic tag
                                // or it's an element that has text content between its tags,
                                // but content is not other tags add a hookup
                                // TODO: we should only add `can.EJS.pending()` if there's a magic tag
                                // within the html tags.
                                if (specialStates.attributeHookups.length) {
                                    attrs = "attrs: ['" + specialStates.attributeHookups.join("','") + "'], ";
                                    specialStates.attributeHookups = [];
                                }
                                // this is the > of a special tag
                                // comparison to lastTagHookup makes sure the same custom tags can be nested
                                if ((tagName + specialStates.tagHookups.length) !== specialStates.lastTagHookup && tagName === top(specialStates.tagHookups)) {
                                    // If it's a self closing tag (like <content/>) make sure we put the / at the end.
                                    if (emptyElement) {
                                        content = content.substr(0, content.length - 1);
                                    }
                                    // Put the start of the end
                                    buff.push(put_cmd,
                                        '"', clean(content), '"',
                                        ",can.view.pending({tagName:'" + tagName + "'," + (attrs) + "scope: " + (this.text.scope || "this") + this.text.options);

                                    // if it's a self closing tag (like <content/>) close and end the tag
                                    if (emptyElement) {
                                        buff.push("}));");
                                        content = "/>";
                                        popTagHookup();
                                    }
                                    // if it's an empty tag
                                    else if (tokens[i] === "<" && tokens[i + 1] === "/" + tagName) {
                                        buff.push("}));");
                                        content = token;
                                        popTagHookup();
                                    } else {
                                        // it has content
                                        buff.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || ''));
                                        content = '';
                                    }

                                } else if (magicInTag || (!popTagName && elements.tagToContentPropMap[tagNames[tagNames.length - 1]]) || attrs) {
                                    // make sure / of /> is on the right of pending
                                    var pendingPart = ",can.view.pending({" + attrs + "scope: " + (this.text.scope || "this") + this.text.options + "}),\"";
                                    if (emptyElement) {
                                        put(content.substr(0, content.length - 1), pendingPart + "/>\"");
                                    } else {
                                        put(content, pendingPart + ">\"");
                                    }
                                    content = '';
                                    magicInTag = 0;
                                } else {
                                    content += token;
                                }

                                // if it's a tag like <input/>
                                if (emptyElement || popTagName) {
                                    // remove the current tag in the stack
                                    tagNames.pop();
                                    // set the current tag to the previous parent
                                    tagName = tagNames[tagNames.length - 1];
                                    // Don't pop next time
                                    popTagName = false;
                                }
                                specialStates.attributeHookups = [];
                                break;
                            case "'":
                            case '"':
                                // If we are in an html tag, finding matching quotes.
                                if (htmlTag) {
                                    // We have a quote and it matches.
                                    if (quote && quote === token) {
                                        // We are exiting the quote.
                                        quote = null;
                                        // Otherwise we are creating a quote.
                                        // TODO: does this handle `\`?
                                        var attr = getAttrName();
                                        if (viewCallbacks.attr(attr)) {
                                            specialStates.attributeHookups.push(attr);
                                        }

                                        if (specialAttribute) {

                                            content += token;
                                            put(content);
                                            buff.push(finishTxt, "}));\n");
                                            content = "";
                                            specialAttribute = false;

                                            break;
                                        }

                                    } else if (quote === null) {
                                        quote = token;
                                        beforeQuote = lastToken;
                                        attrName = getAttrName();
                                        // TODO: check if there's magic!!!!
                                        if ((tagName === "img" && attrName === "src") || attrName === "style") {
                                            // put content that was before the attr name, but don't include the src=
                                            put(content.replace(attrReg, ""));
                                            content = "";

                                            specialAttribute = true;

                                            buff.push(insert_cmd, "can.view.txt(2,'" + getTag(tagName, tokens, i) + "'," + status() + ",this,function(){", startTxt);
                                            put(attrName + "=" + token);
                                            break;
                                        }

                                    }
                                }

                            default:
                                // Track the current tag
                                if (lastToken === '<') {

                                    tagName = token.substr(0, 3) === "!--" ?
                                        "!--" : token.split(/\s/)[0];

                                    var isClosingTag = false,
                                        cleanedTagName;

                                    if (tagName.indexOf("/") === 0) {
                                        isClosingTag = true;
                                        cleanedTagName = tagName.substr(1);
                                    }

                                    if (isClosingTag) { // </tag>

                                        // when we enter a new tag, pop the tag name stack
                                        if (top(tagNames) === cleanedTagName) {
                                            // set tagName to the last tagName
                                            // if there are no more tagNames, we'll rely on getTag.
                                            tagName = cleanedTagName;
                                            popTagName = true;
                                        }
                                        // if we are in a closing tag of a custom tag
                                        if (top(specialStates.tagHookups) === cleanedTagName) {

                                            // remove the last < from the content
                                            put(content.substr(0, content.length - 1));

                                            // finish the "section"
                                            buff.push(finishTxt + "}}) );");
                                            // the < belongs to the outside
                                            content = "><";
                                            popTagHookup();
                                        }

                                    } else {
                                        if (tagName.lastIndexOf("/") === tagName.length - 1) {
                                            tagName = tagName.substr(0, tagName.length - 1);

                                        }

                                        if (tagName !== "!--" && (viewCallbacks.tag(tagName))) {
                                            // if the content tag is inside something it doesn't belong ...
                                            if (tagName === "content" && elements.tagMap[top(tagNames)]) {
                                                // convert it to an element that will work
                                                token = token.replace("content", elements.tagMap[top(tagNames)]);
                                            }
                                            // we will hookup at the ending tag>
                                            specialStates.tagHookups.push(tagName);
                                        }

                                        tagNames.push(tagName);

                                    }

                                }
                                content += token;
                                break;
                        }
                    } else {
                        // We have a start tag.
                        switch (token) {
                            case tmap.right:
                            case tmap.returnRight:
                                switch (startTag) {
                                    case tmap.left:
                                        // Get the number of `{ minus }`
                                        bracketCount = bracketNum(content);

                                        // We are ending a block.
                                        if (bracketCount === 1) {
                                            // We are starting on.
                                            buff.push(insert_cmd, 'can.view.txt(0,\'' + getTag(tagName, tokens, i) + '\',' + status() + ',this,function(){', startTxt, content);
                                            endStack.push({
                                                    before: "",
                                                    after: finishTxt + "}));\n"
                                                });
                                        } else {

                                            // How are we ending this statement?
                                            last = // If the stack has value and we are ending a block...
                                            endStack.length && bracketCount === -1 ? // Use the last item in the block stack.
                                            endStack.pop() : // Or use the default ending.
                                            {
                                                after: ";"
                                            };

                                            // If we are ending a returning block,
                                            // add the finish text which returns the result of the
                                            // block.
                                            if (last.before) {
                                                buff.push(last.before);
                                            }
                                            // Add the remaining content.
                                            buff.push(content, ";", last.after);
                                        }
                                        break;
                                    case tmap.escapeLeft:
                                    case tmap.returnLeft:
                                        // We have an extra `{` -> `block`.
                                        // Get the number of `{ minus }`.
                                        bracketCount = bracketNum(content);
                                        // If we have more `{`, it means there is a block.
                                        if (bracketCount) {
                                            // When we return to the same # of `{` vs `}` end with a `doubleParent`.
                                            endStack.push({
                                                    before: finishTxt,
                                                    after: "}));\n"
                                                });
                                        }

                                        var escaped = startTag === tmap.escapeLeft ? 1 : 0,
                                            commands = {
                                                insert: insert_cmd,
                                                tagName: getTag(tagName, tokens, i),
                                                status: status(),
                                                specialAttribute: specialAttribute
                                            };

                                        for (var ii = 0; ii < this.helpers.length; ii++) {
                                            // Match the helper based on helper
                                            // regex name value
                                            var helper = this.helpers[ii];
                                            if (helper.name.test(content)) {
                                                content = helper.fn(content, commands);

                                                // dont escape partials
                                                if (helper.name.source === /^>[\s]*\w*/.source) {
                                                    escaped = 0;
                                                }
                                                break;
                                            }
                                        }

                                        // Handle special cases
                                        if (typeof content === 'object') {

                                            if (content.startTxt && content.end && specialAttribute) {
                                                buff.push(insert_cmd, "can.view.toStr( ", content.content, '() ) );');

                                            } else {

                                                if (content.startTxt) {
                                                    buff.push(insert_cmd, "can.view.txt(\n" +
                                                        (typeof status() === "string" || (content.escaped != null ? content.escaped : escaped)) + ",\n'" + tagName + "',\n" + status() + ",\nthis,\n");
                                                } else if (content.startOnlyTxt) {
                                                    buff.push(insert_cmd, 'can.view.onlytxt(this,\n');
                                                }
                                                buff.push(content.content);
                                                if (content.end) {
                                                    buff.push('));');
                                                }

                                            }

                                        } else if (specialAttribute) {

                                            buff.push(insert_cmd, content, ');');

                                        } else {
                                            // If we have `<%== a(function(){ %>` then we want
                                            // `can.EJS.text(0,this, function(){ return a(function(){ var _v1ew = [];`.

                                            buff.push(insert_cmd, "can.view.txt(\n" + (typeof status() === "string" || escaped) +
                                                ",\n'" + tagName + "',\n" + status() + ",\nthis,\nfunction(){ " +
                                                (this.text.escape || '') +
                                                "return ", content,
                                                // If we have a block.
                                                bracketCount ?
                                                // Start with startTxt `"var _v1ew = [];"`.
                                                startTxt :
                                                // If not, add `doubleParent` to close push and text.
                                                "}));\n");



                                        }

                                        if (rescan && rescan.after && rescan.after.length) {
                                            put(rescan.after.length);
                                            rescan = null;
                                        }
                                        break;
                                }
                                startTag = null;
                                content = '';
                                break;
                            case tmap.templateLeft:
                                content += tmap.left;
                                break;
                            default:
                                content += token;
                                break;
                        }
                    }
                    lastToken = token;
                }

                // Put it together...
                if (content.length) {
                    // Should be `content.dump` in Ruby.
                    put(content);
                }
                buff.push(";");
                var template = buff.join(''),
                    out = {
                        out: (this.text.outStart || "") + template + " " + finishTxt + (this.text.outEnd || "")
                    };

                // Use `eval` instead of creating a function, because it is easier to debug.
                myEval.call(out, 'this.fn = (function(' + this.text.argNames + '){' + out.out + '});\r\n//# sourceURL=' + name + '.js');
                return out;
            }
        };

        // can.view.attr

        // This is called when there is a special tag
        can.view.pending = function(viewData) {
            // we need to call any live hookups
            // so get that and return the hook
            // a better system will always be called with the same stuff
            var hooks = can.view.getHooks();
            return can.view.hook(function(el) {
                can.each(hooks, function(fn) {
                    fn(el);
                });
                viewData.templateType = "legacy";
                if (viewData.tagName) {
                    viewCallbacks.tagHandler(el, viewData.tagName, viewData);
                }

                can.each(viewData && viewData.attrs || [], function(attributeName) {
                    viewData.attributeName = attributeName;
                    var callback = viewCallbacks.attr(attributeName);
                    if (callback) {
                        callback(el, viewData);
                    }
                });

            });

        };

        can.view.tag("content", function(el, tagData) {
            return tagData.scope;
        });

        can.view.Scanner = Scanner;

        return Scanner;
    })(__m13, __m27, __m12);

    // ## view/node_lists/node_lists.js
    var __m30 = (function(can) {
        // ## Helpers
        // Some browsers don't allow expando properties on HTMLTextNodes
        // so let's try to assign a custom property, an 'expando' property.
        // We use this boolean to determine how we are going to hold on
        // to HTMLTextNode within a nodeList.  More about this in the 'id'
        // function.
        var canExpando = true;
        try {
            document.createTextNode('')._ = 0;
        } catch (ex) {
            canExpando = false;
        }

        // A mapping of element ids to nodeList id allowing us to quickly find an element
        // that needs to be replaced when updated.
        var nodeMap = {},
            // A mapping of ids to text nodes, this map will be used in the
            // case of the browser not supporting expando properties.
            textNodeMap = {},
            // The name of the expando property; the value returned
            // given a nodeMap key.
            expando = 'ejs_' + Math.random(),
            // The id used as the key in our nodeMap, this integer
            // will be preceded by 'element_' or 'obj_' depending on whether
            // the element has a nodeName.
            _id = 0,

            // ## nodeLists.id
            // Given a template node, create an id on the node as a expando
            // property, or if the node is an HTMLTextNode and the browser
            // doesn't support expando properties store the id with a
            // reference to the text node in an internal collection then return
            // the lookup id.
            id = function(node, localMap) {
                var _textNodeMap = localMap || textNodeMap;
                var id = readId(node, _textNodeMap);
                if (id) {
                    return id;
                } else {
                    // If the browser supports expando properties or the node
                    // provided is not an HTMLTextNode, we don't need to work
                    // with the internal textNodeMap and we can place the property
                    // on the node.
                    if (canExpando || node.nodeType !== 3) {
                        ++_id;
                        return node[expando] = (node.nodeName ? 'element_' : 'obj_') + _id;
                    } else {
                        // If we didn't find the node, we need to register it and return
                        // the id used.
                        ++_id;

                        // If we didn't find the node, we need to register it and return
                        // the id used.
                        // We have to store the node itself because of the browser's lack
                        // of support for expando properties (i.e. we can't use a look-up
                        // table and store the id on the node as a custom property).
                        _textNodeMap['text_' + _id] = node;
                        return 'text_' + _id;
                    }
                }
            },
            readId = function(node, textNodeMap) {
                if (canExpando || node.nodeType !== 3) {
                    return node[expando];
                } else {
                    // The nodeList has a specific collection for HTMLTextNodes for
                    // (older) browsers that do not support expando properties.
                    for (var textNodeID in textNodeMap) {
                        if (textNodeMap[textNodeID] === node) {
                            return textNodeID;
                        }
                    }
                }
            },
            splice = [].splice,
            push = [].push,

            // ## nodeLists.itemsInChildListTree
            // Given a nodeList return the number of child items in the provided
            // list and any child lists.
            itemsInChildListTree = function(list) {
                var count = 0;
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list[i];
                    // If the item is an HTMLElement then increment the count by 1.
                    if (item.nodeType) {
                        count++;
                    } else {
                        // If the item is not an HTMLElement it is a list, so
                        // increment the count by the number of items in the child
                        // list.
                        count += itemsInChildListTree(item);
                    }
                }
                return count;
            },
            replacementMap = function(replacements, idMap) {
                var map = {};
                for (var i = 0, len = replacements.length; i < len; i++) {
                    var node = nodeLists.first(replacements[i]);
                    map[id(node, idMap)] = replacements[i];
                }
                return map;
            };

        // ## Registering & Updating
        // To keep all live-bound sections knowing which elements they are managing,
        // all live-bound elments are registered and updated when they change.
        // For example, the above template, when rendered with data like:
        //     data = new can.Map({
        //         items: ["first","second"]
        //     })
        // This will first render the following content:
        //     <div>
        //         <span data-view-id='5'/>
        //     </div>
        // When the `5` callback is called, this will register the `<span>` like:
        //     var ifsNodes = [<span 5>]
        //     nodeLists.register(ifsNodes);
        // And then render `{{if}}`'s contents and update `ifsNodes` with it:
        //     nodeLists.update( ifsNodes, [<"\nItems:\n">, <span data-view-id="6">] );
        // Next, hookup `6` is called which will regsiter the `<span>` like:
        //     var eachsNodes = [<span 6>];
        //     nodeLists.register(eachsNodes);
        // And then it will render `{{#each}}`'s content and update `eachsNodes` with it:
        //     nodeLists.update(eachsNodes, [<label>,<label>]);
        // As `nodeLists` knows that `eachsNodes` is inside `ifsNodes`, it also updates
        // `ifsNodes`'s nodes to look like:
        //     [<"\nItems:\n">,<label>,<label>]
        // Now, if all items were removed, `{{#if}}` would be able to remove
        // all the `<label>` elements.
        // When you regsiter a nodeList, you can also provide a callback to know when
        // that nodeList has been replaced by a parent nodeList.  This is
        // useful for tearing down live-binding.
        var nodeLists = {
            id: id,

            // ## nodeLists.update
            // Updates a nodeList with new items, i.e. when values for the template have changed.
            update: function(nodeList, newNodes) {
                // Unregister all childNodeLists.
                var oldNodes = nodeLists.unregisterChildren(nodeList);

                newNodes = can.makeArray(newNodes);

                var oldListLength = nodeList.length;

                // Replace oldNodeLists's contents.
                splice.apply(nodeList, [
                        0,
                        oldListLength
                    ].concat(newNodes));

                if (nodeList.replacements) {
                    nodeLists.nestReplacements(nodeList);
                } else {
                    nodeLists.nestList(nodeList);
                }

                return oldNodes;
            },
            nestReplacements: function(list) {
                var index = 0,
                    // temporary id map that is limited to this call
                    idMap = {},
                    // replacements are in reverse order in the DOM
                    rMap = replacementMap(list.replacements, idMap),
                    rCount = list.replacements.length;

                while (index < list.length && rCount) {
                    var node = list[index],
                        replacement = rMap[readId(node, idMap)];
                    if (replacement) {
                        list.splice(index, itemsInChildListTree(replacement), replacement);
                        rCount--;
                    }
                    index++;
                }
                list.replacements = [];
            },
            // ## nodeLists.nestList
            // If a given list does not exist in the nodeMap then create an lookup
            // id for it in the nodeMap and assign the list to it.
            // If the the provided does happen to exist in the nodeMap update the
            // elements in the list.
            // @param {Array.<HTMLElement>} nodeList The nodeList being nested.
            nestList: function(list) {
                var index = 0;
                while (index < list.length) {
                    var node = list[index],
                        childNodeList = nodeMap[id(node)];
                    if (childNodeList) {
                        if (childNodeList !== list) {
                            list.splice(index, itemsInChildListTree(childNodeList), childNodeList);
                        }
                    } else {
                        // Indicate the new nodes belong to this list.
                        nodeMap[id(node)] = list;
                    }
                    index++;
                }
            },

            // ## nodeLists.last
            // Return the last HTMLElement in a nodeList, if the last
            // element is a nodeList, returns the last HTMLElement of
            // the child list, etc.
            last: function(nodeList) {
                var last = nodeList[nodeList.length - 1];
                // If the last node in the list is not an HTMLElement
                // it is a nodeList so call `last` again.
                if (last.nodeType) {
                    return last;
                } else {
                    return nodeLists.last(last);
                }
            },

            // ## nodeLists.first
            // Return the first HTMLElement in a nodeList, if the first
            // element is a nodeList, returns the first HTMLElement of
            // the child list, etc.
            first: function(nodeList) {
                var first = nodeList[0];
                // If the first node in the list is not an HTMLElement
                // it is a nodeList so call `first` again.
                if (first.nodeType) {
                    return first;
                } else {
                    return nodeLists.first(first);
                }
            },

            // ## nodeLists.register
            // Registers a nodeList and returns the nodeList passed to register
            register: function(nodeList, unregistered, parent) {
                // If a unregistered callback has been provided assign it to the nodeList
                // as a property to be called when the nodeList is unregistred.
                nodeList.unregistered = unregistered;
                nodeList.parentList = parent;

                if (parent === true) {
                    // this is the "top" parent in stache
                    nodeList.replacements = [];
                } else if (parent) {
                    // TOOD: remove
                    parent.replacements.push(nodeList);
                    nodeList.replacements = [];
                } else {
                    nodeLists.nestList(nodeList);
                }


                return nodeList;
            },

            // ## nodeLists.unregisterChildren
            // Unregister all childen within the provided list and return the
            // unregistred nodes.
            // @param {Array.<HTMLElement>} nodeList The child list to unregister.
            unregisterChildren: function(nodeList) {
                var nodes = [];
                // For each node in the nodeList we want to compute it's id
                // and delete it from the nodeList's internal map.
                can.each(nodeList, function(node) {
                    // If the node does not have a nodeType it is an array of
                    // nodes.
                    if (node.nodeType) {
                        if (!nodeList.replacements) {
                            delete nodeMap[id(node)];
                        }

                        nodes.push(node);
                    } else {
                        // Recursively unregister each of the child lists in
                        // the nodeList.
                        push.apply(nodes, nodeLists.unregister(node));
                    }
                });
                return nodes;
            },

            // ## nodeLists.unregister
            // Unregister's a nodeList and returns the unregistered nodes.
            // Call if the nodeList is no longer being updated. This will
            // also unregister all child nodeLists.
            unregister: function(nodeList) {
                var nodes = nodeLists.unregisterChildren(nodeList);
                // If an 'unregisted' function was provided during registration, remove
                // it from the list, and call the function provided.
                if (nodeList.unregistered) {
                    var unregisteredCallback = nodeList.unregistered;
                    delete nodeList.unregistered;
                    delete nodeList.replacements;
                    unregisteredCallback();
                }
                return nodes;
            },

            nodeMap: nodeMap
        };
        can.view.nodeLists = nodeLists;
        return nodeLists;
    })(__m2, __m27);

    // ## view/parser/parser.js
    var __m31 = (function(can) {


        function makeMap(str) {
            var obj = {}, items = str.split(",");
            for (var i = 0; i < items.length; i++) {
                obj[items[i]] = true;
            }

            return obj;
        }

        var alphaNumericHU = "-A-Za-z0-9_",
            attributeNames = "[a-zA-Z_:][" + alphaNumericHU + ":.]*",
            spaceEQspace = "\\s*=\\s*",
            dblQuote2dblQuote = "\"((?:\\\\.|[^\"])*)\"",
            quote2quote = "'((?:\\\\.|[^'])*)'",
            attributeEqAndValue = "(?:" + spaceEQspace + "(?:" +
                "(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?",
            matchStash = "\\{\\{[^\\}]*\\}\\}\\}?",
            stash = "\\{\\{([^\\}]*)\\}\\}\\}?",
            startTag = new RegExp("^<([" + alphaNumericHU + "]+)" +
                "(" +
                "(?:\\s*" +
                "(?:(?:" +
                "(?:" + attributeNames + ")?" +
                attributeEqAndValue + ")|" +
                "(?:" + matchStash + ")+)" +
                ")*" +
                ")\\s*(\\/?)>"),
            endTag = new RegExp("^<\\/([" + alphaNumericHU + "]+)[^>]*>"),
            attr = new RegExp("(?:" +
                "(?:(" + attributeNames + ")|" + stash + ")" +
                "(?:" + spaceEQspace +
                "(?:" +
                "(?:" + dblQuote2dblQuote + ")|(?:" + quote2quote + ")|([^>\\s]+)" +
                ")" +
                ")?)", "g"),
            mustache = new RegExp(stash, "g"),
            txtBreak = /<|\{\{/;

        // Empty Elements - HTML 5
        var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

        // Block Elements - HTML 5
        var block = makeMap("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

        // Inline Elements - HTML 5
        var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

        // Elements that you can, intentionally, leave open
        // (and which close themselves)
        var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

        // Attributes that have their values filled in disabled="disabled"
        var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

        // Special Elements (can contain anything)
        var special = makeMap("script,style");

        var HTMLParser = function(html, handler) {

            function parseStartTag(tag, tagName, rest, unary) {
                tagName = tagName.toLowerCase();

                if (block[tagName]) {
                    while (stack.last() && inline[stack.last()]) {
                        parseEndTag("", stack.last());
                    }
                }

                if (closeSelf[tagName] && stack.last() === tagName) {
                    parseEndTag("", tagName);
                }

                unary = empty[tagName] || !! unary;

                handler.start(tagName, unary);

                if (!unary) {
                    stack.push(tagName);
                }
                // find attribute or special
                HTMLParser.parseAttrs(rest, handler);

                handler.end(tagName, unary);

            }

            function parseEndTag(tag, tagName) {
                // If no tag name is provided, clean shop
                var pos;
                if (!tagName) {
                    pos = 0;
                }


                // Find the closest opened tag of the same type
                else {
                    for (pos = stack.length - 1; pos >= 0; pos--) {
                        if (stack[pos] === tagName) {
                            break;
                        }
                    }

                }


                if (pos >= 0) {
                    // Close all the open elements, up the stack
                    for (var i = stack.length - 1; i >= pos; i--) {
                        if (handler.close) {
                            handler.close(stack[i]);
                        }
                    }

                    // Remove the open elements from the stack
                    stack.length = pos;
                }
            }

            function parseMustache(mustache, inside) {
                if (handler.special) {
                    handler.special(inside);
                }
            }


            var index, chars, match, stack = [],
                last = html;
            stack.last = function() {
                return this[this.length - 1];
            };

            while (html) {
                chars = true;

                // Make sure we're not in a script or style element
                if (!stack.last() || !special[stack.last()]) {

                    // Comment
                    if (html.indexOf("<!--") === 0) {
                        index = html.indexOf("-->");

                        if (index >= 0) {
                            if (handler.comment) {
                                handler.comment(html.substring(4, index));
                            }
                            html = html.substring(index + 3);
                            chars = false;
                        }

                        // end tag
                    } else if (html.indexOf("</") === 0) {
                        match = html.match(endTag);

                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(endTag, parseEndTag);
                            chars = false;
                        }

                        // start tag
                    } else if (html.indexOf("<") === 0) {
                        match = html.match(startTag);

                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(startTag, parseStartTag);
                            chars = false;
                        }
                    } else if (html.indexOf("{{") === 0) {
                        match = html.match(mustache);

                        if (match) {
                            html = html.substring(match[0].length);
                            match[0].replace(mustache, parseMustache);
                        }
                    }

                    if (chars) {
                        index = html.search(txtBreak);

                        var text = index < 0 ? html : html.substring(0, index);
                        html = index < 0 ? "" : html.substring(index);

                        if (handler.chars && text) {
                            handler.chars(text);
                        }
                    }

                } else {
                    html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function(all, text) {
                        text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
                        if (handler.chars) {
                            handler.chars(text);
                        }
                        return "";
                    });

                    parseEndTag("", stack.last());
                }

                if (html === last) {
                    throw "Parse Error: " + html;
                }

                last = html;
            }

            // Clean up any remaining tags
            parseEndTag();


            handler.done();
        };
        HTMLParser.parseAttrs = function(rest, handler) {


            (rest != null ? rest : "").replace(attr, function(text, name, special, dblQuote, singleQuote, val) {
                if (special) {
                    handler.special(special);

                }
                if (name || dblQuote || singleQuote || val) {
                    var value = arguments[3] ? arguments[3] :
                        arguments[4] ? arguments[4] :
                        arguments[5] ? arguments[5] :
                        fillAttrs[name.toLowerCase()] ? name : "";
                    handler.attrStart(name || "");

                    var last = mustache.lastIndex = 0,
                        res = mustache.exec(value),
                        chars;
                    while (res) {
                        chars = value.substring(
                            last,
                            mustache.lastIndex - res[0].length);
                        if (chars.length) {
                            handler.attrValue(chars);
                        }
                        handler.special(res[1]);
                        last = mustache.lastIndex;
                        res = mustache.exec(value);
                    }
                    chars = value.substr(
                        last,
                        value.length);
                    if (chars) {
                        handler.attrValue(chars);
                    }
                    handler.attrEnd(name || "");
                }


            });


        };

        can.view.parser = HTMLParser;

        return HTMLParser;

    })(__m13);

    // ## view/live/live.js
    var __m29 = (function(can, elements, view, nodeLists, parser) {

        elements = elements || can.view.elements;
        nodeLists = nodeLists || can.view.NodeLists;
        parser = parser || can.view.parser;

        // ## live.js
        // The live module provides live binding for computes
        // and can.List.
        // Currently, it's API is designed for `can/view/render`, but
        // it could easily be used for other purposes.
        // ### Helper methods
        // #### setup
        // `setup(HTMLElement, bind(data), unbind(data)) -> data`
        // Calls bind right away, but will call unbind
        // if the element is "destroyed" (removed from the DOM).
        var setup = function(el, bind, unbind) {
            // Removing an element can call teardown which
            // unregister the nodeList which calls teardown
            var tornDown = false,
                teardown = function() {
                    if (!tornDown) {
                        tornDown = true;
                        unbind(data);
                        can.unbind.call(el, 'removed', teardown);
                    }
                    return true;
                }, data = {
                    teardownCheck: function(parent) {
                        return parent ? false : teardown();
                    }
                };
            can.bind.call(el, 'removed', teardown);
            bind(data);
            return data;
        },
            // #### listen
            // Calls setup, but presets bind and unbind to
            // operate on a compute
            listen = function(el, compute, change) {
                return setup(el, function() {
                    compute.bind('change', change);
                }, function(data) {
                    compute.unbind('change', change);
                    if (data.nodeList) {
                        nodeLists.unregister(data.nodeList);
                    }
                });
            },
            // #### getAttributeParts
            // Breaks up a string like foo='bar' into ["foo","'bar'""]
            getAttributeParts = function(newVal) {
                var attrs = {},
                    attr;
                parser.parseAttrs(newVal, {
                        attrStart: function(name) {
                            attrs[name] = "";
                            attr = name;
                        },
                        attrValue: function(value) {
                            attrs[attr] += value;
                        },
                        attrEnd: function() {}
                    });
                return attrs;
            },
            splice = [].splice,
            isNode = function(obj) {
                return obj && obj.nodeType;
            },
            addTextNodeIfNoChildren = function(frag) {
                if (!frag.childNodes.length) {
                    frag.appendChild(document.createTextNode(""));
                }
            };

        var live = {

            list: function(el, compute, render, context, parentNode, nodeList) {

                // A nodeList of all elements this live-list manages.
                // This is here so that if this live list is within another section
                // that section is able to remove the items in this list.
                var masterNodeList = nodeList || [el],
                    // A mapping of items to their indicies'
                    indexMap = [],
                    // Called when items are added to the list.
                    add = function(ev, items, index) {
                        // Collect new html and mappings
                        var frag = document.createDocumentFragment(),
                            newNodeLists = [],
                            newIndicies = [];
                        // For each new item,
                        can.each(items, function(item, key) {
                            var itemNodeList = [];

                            if (nodeList) {
                                nodeLists.register(itemNodeList, null, true);
                            }

                            var itemIndex = can.compute(key + index),
                                // get its string content
                                itemHTML = render.call(context, item, itemIndex, itemNodeList),
                                gotText = typeof itemHTML === "string",
                                // and convert it into elements.
                                itemFrag = can.frag(itemHTML);
                            // Add those elements to the mappings.

                            itemFrag = gotText ? can.view.hookup(itemFrag) : itemFrag;

                            var childNodes = can.makeArray(itemFrag.childNodes);
                            if (nodeList) {
                                nodeLists.update(itemNodeList, childNodes);
                                newNodeLists.push(itemNodeList);
                            } else {
                                newNodeLists.push(nodeLists.register(childNodes));
                            }


                            // Hookup the fragment (which sets up child live-bindings) and
                            // add it to the collection of all added elements.
                            frag.appendChild(itemFrag);
                            // track indicies;
                            newIndicies.push(itemIndex);
                        });
                        // The position of elements is always after the initial text placeholder node
                        var masterListIndex = index + 1;


                        // Check if we are adding items at the end
                        if (!masterNodeList[masterListIndex]) {
                            elements.after(masterListIndex === 1 ? [text] : [nodeLists.last(masterNodeList[masterListIndex - 1])], frag);
                        } else {
                            // Add elements before the next index's first element.
                            var el = nodeLists.first(masterNodeList[masterListIndex]);
                            can.insertBefore(el.parentNode, frag, el);
                        }
                        splice.apply(masterNodeList, [
                                masterListIndex,
                                0
                            ].concat(newNodeLists));

                        // update indices after insert point
                        splice.apply(indexMap, [
                                index,
                                0
                            ].concat(newIndicies));

                        for (var i = index + newIndicies.length, len = indexMap.length; i < len; i++) {
                            indexMap[i](i);
                        }
                    },
                    // Called when items are removed or when the bindings are torn down.
                    remove = function(ev, items, index, duringTeardown, fullTeardown) {
                        // If this is because an element was removed, we should
                        // check to make sure the live elements are still in the page.
                        // If we did this during a teardown, it would cause an infinite loop.
                        if (!duringTeardown && data.teardownCheck(text.parentNode)) {
                            return;
                        }
                        var removedMappings = masterNodeList.splice(index + 1, items.length),
                            itemsToRemove = [];
                        can.each(removedMappings, function(nodeList) {

                            // Unregister to free up event bindings.
                            var nodesToRemove = nodeLists.unregister(nodeList);

                            // add items that we will remove all at once
                            [].push.apply(itemsToRemove, nodesToRemove);
                        });
                        // update indices after remove point
                        indexMap.splice(index, items.length);
                        for (var i = index, len = indexMap.length; i < len; i++) {
                            indexMap[i](i);
                        }
                        // don't remove elements during teardown.  Something else will probably be doing that.
                        if (!fullTeardown) {
                            can.remove(can.$(itemsToRemove));
                        }

                    },
                    // A text node placeholder
                    text = document.createTextNode(''),
                    // The current list.
                    list,
                    // Called when the list is replaced with a new list or the binding is torn-down.
                    teardownList = function(fullTeardown) {
                        // there might be no list right away, and the list might be a plain
                        // array
                        if (list && list.unbind) {
                            list.unbind('add', add)
                                .unbind('remove', remove);
                        }
                        // use remove to clean stuff up for us
                        remove({}, {
                                length: masterNodeList.length - 1
                            }, 0, true, fullTeardown);
                    },
                    // Called when the list is replaced or setup.
                    updateList = function(ev, newList, oldList) {
                        teardownList();
                        // make an empty list if the compute returns null or undefined
                        list = newList || [];
                        // list might be a plain array
                        if (list.bind) {
                            list.bind('add', add)
                                .bind('remove', remove);
                        }
                        add({}, list, 0);
                    };
                parentNode = elements.getParentNode(el, parentNode);
                // Setup binding and teardown to add and remove events
                var data = setup(parentNode, function() {
                    if (can.isFunction(compute)) {
                        compute.bind('change', updateList);
                    }
                }, function() {
                    if (can.isFunction(compute)) {
                        compute.unbind('change', updateList);
                    }
                    teardownList(true);
                });
                if (!nodeList) {
                    live.replace(masterNodeList, text, data.teardownCheck);
                } else {
                    elements.replace(masterNodeList, text);
                    nodeLists.update(masterNodeList, [text]);
                    nodeList.unregistered = data.teardownCheck;
                }

                // run the list setup
                updateList({}, can.isFunction(compute) ? compute() : compute);
            },

            html: function(el, compute, parentNode, nodeList) {
                var data;
                parentNode = elements.getParentNode(el, parentNode);
                data = listen(parentNode, compute, function(ev, newVal, oldVal) {

                    // TODO: remove teardownCheck in 2.1
                    var attached = nodeLists.first(nodes).parentNode;
                    // update the nodes in the DOM with the new rendered value
                    if (attached) {
                        makeAndPut(newVal);
                    }
                    data.teardownCheck(nodeLists.first(nodes).parentNode);
                });

                var nodes = nodeList || [el],
                    makeAndPut = function(val) {
                        var isString = !isNode(val),
                            frag = can.frag(val),
                            oldNodes = can.makeArray(nodes);

                        // Add a placeholder textNode if necessary.
                        addTextNodeIfNoChildren(frag);

                        if (isString) {
                            frag = can.view.hookup(frag, parentNode);
                        }
                        // We need to mark each node as belonging to the node list.
                        oldNodes = nodeLists.update(nodes, frag.childNodes);
                        elements.replace(oldNodes, frag);
                    };
                data.nodeList = nodes;

                // register the span so nodeLists knows the parentNodeList
                if (!nodeList) {
                    nodeLists.register(nodes, data.teardownCheck);
                } else {
                    nodeList.unregistered = data.teardownCheck;
                }
                makeAndPut(compute());
            },

            replace: function(nodes, val, teardown) {
                var oldNodes = nodes.slice(0),
                    frag = can.frag(val);
                nodeLists.register(nodes, teardown);


                if (typeof val === 'string') {
                    // if it was a string, check for hookups
                    frag = can.view.hookup(frag, nodes[0].parentNode);
                }
                // We need to mark each node as belonging to the node list.
                nodeLists.update(nodes, frag.childNodes);
                elements.replace(oldNodes, frag);
                return nodes;
            },

            text: function(el, compute, parentNode, nodeList) {
                var parent = elements.getParentNode(el, parentNode);
                // setup listening right away so we don't have to re-calculate value
                var data = listen(parent, compute, function(ev, newVal, oldVal) {
                    // Sometimes this is 'unknown' in IE and will throw an exception if it is

                    if (typeof node.nodeValue !== 'unknown') {
                        node.nodeValue = can.view.toStr(newVal);
                    }

                    // TODO: remove in 2.1
                    data.teardownCheck(node.parentNode);
                });
                // The text node that will be updated

                var node = document.createTextNode(can.view.toStr(compute()));
                if (nodeList) {
                    nodeList.unregistered = data.teardownCheck;
                    data.nodeList = nodeList;

                    nodeLists.update(nodeList, [node]);
                    elements.replace([el], node);
                } else {
                    // Replace the placeholder with the live node and do the nodeLists thing.
                    // Add that node to nodeList so we can remove it when the parent element is removed from the page
                    data.nodeList = live.replace([el], node, data.teardownCheck);
                }

            },
            setAttributes: function(el, newVal) {
                var attrs = getAttributeParts(newVal);
                for (var name in attrs) {
                    can.attr.set(el, name, attrs[name]);
                }
            },

            attributes: function(el, compute, currentValue) {
                var oldAttrs = {};

                var setAttrs = function(newVal) {
                    var newAttrs = getAttributeParts(newVal),
                        name;
                    for (name in newAttrs) {
                        var newValue = newAttrs[name],
                            oldValue = oldAttrs[name];
                        if (newValue !== oldValue) {
                            can.attr.set(el, name, newValue);
                        }
                        delete oldAttrs[name];
                    }
                    for (name in oldAttrs) {
                        elements.removeAttr(el, name);
                    }
                    oldAttrs = newAttrs;
                };
                listen(el, compute, function(ev, newVal) {
                    setAttrs(newVal);
                });
                // current value has been set
                if (arguments.length >= 3) {
                    oldAttrs = getAttributeParts(currentValue);
                } else {
                    setAttrs(compute());
                }
            },
            attributePlaceholder: '__!!__',
            attributeReplace: /__!!__/g,
            attribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, hook.render());
                });
                var wrapped = can.$(el),
                    hooks;
                // Get the list of hookups or create one for this element.
                // Hooks is a map of attribute names to hookup `data`s.
                // Each hookup data has:
                // `render` - A `function` to render the value of the attribute.
                // `funcs` - A list of hookup `function`s on that attribute.
                // `batchNum` - The last event `batchNum`, used for performance.
                hooks = can.data(wrapped, 'hooks');
                if (!hooks) {
                    can.data(wrapped, 'hooks', hooks = {});
                }
                // Get the attribute value.
                var attr = elements.getAttr(el, attributeName),
                    // Split the attribute value by the template.
                    // Only split out the first __!!__ so if we have multiple hookups in the same attribute,
                    // they will be put in the right spot on first render
                    parts = attr.split(live.attributePlaceholder),
                    goodParts = [],
                    hook;
                goodParts.push(parts.shift(), parts.join(live.attributePlaceholder));
                // If we already had a hookup for this attribute...
                if (hooks[attributeName]) {
                    // Just add to that attribute's list of `function`s.
                    hooks[attributeName].computes.push(compute);
                } else {
                    // Create the hookup data.
                    hooks[attributeName] = {
                        render: function() {
                            var i = 0,
                                // attr doesn't have a value in IE
                                newAttr = attr ? attr.replace(live.attributeReplace, function() {
                                    return elements.contentText(hook.computes[i++]());
                                }) : elements.contentText(hook.computes[i++]());
                            return newAttr;
                        },
                        computes: [compute],
                        batchNum: undefined
                    };
                }
                // Save the hook for slightly faster performance.
                hook = hooks[attributeName];
                // Insert the value in parts.
                goodParts.splice(1, 0, compute());

                // Set the attribute.
                elements.setAttr(el, attributeName, goodParts.join(''));
            },
            specialAttribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, getValue(newVal));
                });
                elements.setAttr(el, attributeName, getValue(compute()));
            },

            simpleAttribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, newVal);
                });
                elements.setAttr(el, attributeName, compute());
            }
        };
        live.attr = live.simpleAttribute;
        live.attrs = live.attributes;
        var newLine = /(\r|\n)+/g;
        var getValue = function(val) {
            var regexp = /^["'].*["']$/;
            val = val.replace(elements.attrReg, '')
                .replace(newLine, '');
            // check if starts and ends with " or '
            return regexp.test(val) ? val.substr(1, val.length - 2) : val;
        };
        can.view.live = live;

        return live;
    })(__m2, __m27, __m13, __m30, __m31);

    // ## view/render.js
    var __m28 = (function(can, elements, live) {


        var pendingHookups = [],
            tagChildren = function(tagName) {
                var newTag = elements.tagMap[tagName] || "span";
                if (newTag === "span") {
                    //innerHTML in IE doesn't honor leading whitespace after empty elements
                    return "@@!!@@";
                }
                return "<" + newTag + ">" + tagChildren(newTag) + "</" + newTag + ">";
            },
            contentText = function(input, tag) {

                // If it's a string, return.
                if (typeof input === 'string') {
                    return input;
                }
                // If has no value, return an empty string.
                if (!input && input !== 0) {
                    return '';
                }

                // If it's an object, and it has a hookup method.
                var hook = (input.hookup &&

                    // Make a function call the hookup method.

                    function(el, id) {
                        input.hookup.call(input, el, id);
                    }) ||

                // Or if it's a `function`, just use the input.
                (typeof input === 'function' && input);

                // Finally, if there is a `function` to hookup on some dom,
                // add it to pending hookups.
                if (hook) {
                    if (tag) {
                        return "<" + tag + " " + can.view.hook(hook) + "></" + tag + ">";
                    } else {
                        pendingHookups.push(hook);
                    }

                    return '';
                }

                // Finally, if all else is `false`, `toString()` it.
                return "" + input;
            },
            // Returns escaped/sanatized content for anything other than a live-binding
            contentEscape = function(txt, tag) {
                return (typeof txt === 'string' || typeof txt === 'number') ?
                    can.esc(txt) :
                    contentText(txt, tag);
            },
            // A flag to indicate if .txt was called within a live section within an element like the {{name}}
            // within `<div {{#person}}{{name}}{{/person}}/>`.
            withinTemplatedSectionWithinAnElement = false,
            emptyHandler = function() {};

        var lastHookups;

        can.extend(can.view, {
                live: live,
                // called in text to make a temporary
                // can.view.lists function that can be called with
                // the list to iterate over and the template
                // used to produce the content within the list
                setupLists: function() {

                    var old = can.view.lists,
                        data;

                    can.view.lists = function(list, renderer) {
                        data = {
                            list: list,
                            renderer: renderer
                        };
                        return Math.random();
                    };
                    // sets back to the old data
                    return function() {
                        can.view.lists = old;
                        return data;
                    };
                },
                getHooks: function() {
                    var hooks = pendingHookups.slice(0);
                    lastHookups = hooks;
                    pendingHookups = [];
                    return hooks;
                },
                onlytxt: function(self, func) {
                    return contentEscape(func.call(self));
                },

                txt: function(escape, tagName, status, self, func) {
                    // the temporary tag needed for any live setup
                    var tag = (elements.tagMap[tagName] || "span"),
                        // should live-binding be setup
                        setupLiveBinding = false,
                        // the compute's value
                        value,
                        listData,
                        compute,
                        unbind = emptyHandler,
                        attributeName;

                    // Are we currently within a live section within an element like the {{name}}
                    // within `<div {{#person}}{{name}}{{/person}}/>`.
                    if (withinTemplatedSectionWithinAnElement) {
                        value = func.call(self);
                    } else {

                        // If this magic tag is within an attribute or an html element,
                        // set the flag to true so we avoid trying to live bind
                        // anything that func might be setup.
                        // TODO: the scanner should be able to set this up.
                        if (typeof status === "string" || status === 1) {
                            withinTemplatedSectionWithinAnElement = true;
                        }

                        // Sets up a listener so we know any can.view.lists called
                        // when func is called
                        var listTeardown = can.view.setupLists();
                        unbind = function() {
                            compute.unbind("change", emptyHandler);
                        };
                        // Create a compute that calls func and looks for dependencies.
                        // By passing `false`, this compute can not be a dependency of other
                        // computes.  This is because live-bits are nested, but
                        // handle their own updating. For example:
                        //     {{#if items.length}}{{#items}}{{.}}{{/items}}{{/if}}
                        // We do not want `{{#if items.length}}` changing the DOM if
                        // `{{#items}}` text changes.
                        compute = can.compute(func, self, false);

                        // Bind to get and temporarily cache the value of the compute.
                        compute.bind("change", emptyHandler);

                        // Call the "wrapping" function and get the binding information
                        listData = listTeardown();

                        // Get the value of the compute
                        value = compute();

                        // Let people know we are no longer within an element.
                        withinTemplatedSectionWithinAnElement = false;

                        // If we should setup live-binding.
                        setupLiveBinding = compute.hasDependencies;
                    }

                    if (listData) {
                        unbind();
                        return "<" + tag + can.view.hook(function(el, parentNode) {
                            live.list(el, listData.list, listData.renderer, self, parentNode);
                        }) + "></" + tag + ">";
                    }

                    // If we had no observes just return the value returned by func.
                    if (!setupLiveBinding || typeof value === "function") {
                        unbind();
                        return ((withinTemplatedSectionWithinAnElement || escape === 2 || !escape) ?
                            contentText :
                            contentEscape)(value, status === 0 && tag);
                    }

                    // the property (instead of innerHTML elements) to adjust. For
                    // example options should use textContent
                    var contentProp = elements.tagToContentPropMap[tagName];

                    // The magic tag is outside or between tags.
                    if (status === 0 && !contentProp) {
                        // Return an element tag with a hookup in place of the content
                        return "<" + tag + can.view.hook(
                            // if value is an object, it's likely something returned by .safeString
                            escape && typeof value !== "object" ?
                            // If we are escaping, replace the parentNode with
                            // a text node who's value is `func`'s return value.

                            function(el, parentNode) {
                                live.text(el, compute, parentNode);
                                unbind();
                            } :
                            // If we are not escaping, replace the parentNode with a
                            // documentFragment created as with `func`'s return value.

                            function(el, parentNode) {
                                live.html(el, compute, parentNode);
                                unbind();
                                //children have to be properly nested HTML for buildFragment to work properly
                            }) + ">" + tagChildren(tag) + "</" + tag + ">";
                        // In a tag, but not in an attribute
                    } else if (status === 1) {
                        // remember the old attr name
                        pendingHookups.push(function(el) {
                            live.attributes(el, compute, compute());
                            unbind();
                        });

                        return compute();
                    } else if (escape === 2) { // In a special attribute like src or style

                        attributeName = status;
                        pendingHookups.push(function(el) {
                            live.specialAttribute(el, attributeName, compute);
                            unbind();
                        });
                        return compute();
                    } else { // In an attribute...
                        attributeName = status === 0 ? contentProp : status;
                        // if the magic tag is inside the element, like `<option><% TAG %></option>`,
                        // we add this hookup to the last element (ex: `option`'s) hookups.
                        // Otherwise, the magic tag is in an attribute, just add to the current element's
                        // hookups.
                        (status === 0 ? lastHookups : pendingHookups)
                            .push(function(el) {
                                live.attribute(el, attributeName, compute);
                                unbind();
                            });
                        return live.attributePlaceholder;
                    }
                }
            });

        return can;
    })(__m13, __m27, __m29, __m16);

    // ## view/mustache/mustache.js
    var __m24 = (function(can) {

        // # mustache.js
        // `can.Mustache`: The Mustache templating engine.
        // See the [Transformation](#section-29) section within *Scanning Helpers* for a detailed explanation
        // of the runtime render code design. The majority of the Mustache engine implementation
        // occurs within the *Transformation* scanning helper.

        // ## Initialization
        // Define the view extension.
        can.view.ext = ".mustache";

        // ### Setup internal helper variables and functions.
        // An alias for the context variable used for tracking a stack of contexts.
        // This is also used for passing to helper functions to maintain proper context.
        var SCOPE = 'scope',
            // An alias for the variable used for the hash object that can be passed
            // to helpers via `options.hash`.
            HASH = '___h4sh',
            // An alias for the most used context stacking call.
            CONTEXT_OBJ = '{scope:' + SCOPE + ',options:options}',
            // a context object used to incidate being special
            SPECIAL_CONTEXT_OBJ = '{scope:' + SCOPE + ',options:options, special: true}',
            // argument names used to start the function (used by scanner and steal)
            ARG_NAMES = SCOPE + ",options",

            // matches arguments inside a {{ }}
            argumentsRegExp = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g,

            // matches a literal number, string, null or regexp
            literalNumberStringBooleanRegExp = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/,

            // returns an object literal that we can use to look up a value in the current scope
            makeLookupLiteral = function(type) {
                return '{get:"' + type.replace(/"/g, '\\"') + '"}';
            },
            // returns if the object is a lookup
            isLookup = function(obj) {
                return obj && typeof obj.get === "string";
            },


            isObserveLike = function(obj) {
                return obj instanceof can.Map || (obj && !! obj._get);
            },


            isArrayLike = function(obj) {
                return obj && obj.splice && typeof obj.length === 'number';
            },
            // used to make sure .fn and .inverse are always called with a Scope like object
            makeConvertToScopes = function(original, scope, options) {
                var originalWithScope = function(ctx, opts) {
                    return original(ctx || scope, opts);
                };
                return function(updatedScope, updatedOptions) {
                    if (updatedScope !== undefined && !(updatedScope instanceof can.view.Scope)) {
                        updatedScope = scope.add(updatedScope);
                    }
                    if (updatedOptions !== undefined && !(updatedOptions instanceof can.view.Options)) {
                        updatedOptions = options.add(updatedOptions);
                    }
                    return originalWithScope(updatedScope, updatedOptions || options);
                };
            };

        // ## Mustache

        var Mustache = function(options, helpers) {
            // Support calling Mustache without the constructor.
            // This returns a function that renders the template.
            if (this.constructor !== Mustache) {
                var mustache = new Mustache(options);
                return function(data, options) {
                    return mustache.render(data, options);
                };
            }

            // If we get a `function` directly, it probably is coming from
            // a `steal`-packaged view.
            if (typeof options === "function") {
                this.template = {
                    fn: options
                };
                return;
            }

            // Set options on self.
            can.extend(this, options);
            this.template = this.scanner.scan(this.text, this.name);
        };


        // Put Mustache on the `can` object.
        can.Mustache = window.Mustache = Mustache;


        Mustache.prototype.

        render = function(data, options) {
            if (!(data instanceof can.view.Scope)) {
                data = new can.view.Scope(data || {});
            }
            if (!(options instanceof can.view.Options)) {
                options = new can.view.Options(options || {});
            }
            options = options || {};

            return this.template.fn.call(data, data, options);
        };

        can.extend(Mustache.prototype, {
                // Share a singleton scanner for parsing templates.
                scanner: new can.view.Scanner({
                        // A hash of strings for the scanner to inject at certain points.
                        text: {
                            // This is the logic to inject at the beginning of a rendered template.
                            // This includes initializing the `context` stack.
                            start: "", //"var "+SCOPE+"= this instanceof can.view.Scope? this : new can.view.Scope(this);\n",
                            scope: SCOPE,
                            options: ",options: options",
                            argNames: ARG_NAMES
                        },

                        // An ordered token registry for the scanner.
                        // This needs to be ordered by priority to prevent token parsing errors.
                        // Each token follows the following structure:
                        //		[
                        //			// Which key in the token map to match.
                        //			"tokenMapName",
                        //			// A simple token to match, like "{{".
                        //			"token",
                        //			// Optional. A complex (regexp) token to match that
                        //			// overrides the simple token.
                        //			"[\\s\\t]*{{",
                        //			// Optional. A function that executes advanced
                        //			// manipulation of the matched content. This is
                        //			// rarely used.
                        //			function(content){
                        //				return content;
                        //			}
                        //		]
                        tokens: [

                            // Return unescaped
                            ["returnLeft", "{{{", "{{[{&]"],
                            // Full line comments
                            ["commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n"],

                            // Inline comments
                            ["commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)"],

                            // Full line escapes
                            // This is used for detecting lines with only whitespace and an escaped tag
                            ["escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)",
                                function(content) {
                                    return {
                                        before: /^\n.+?\n$/.test(content) ? '\n' : '',
                                        content: content.match(/\{\{(.+?)\}\}/)[1] || ''
                                    };
                                }
                            ],
                            // Return escaped
                            ["escapeLeft", "{{"],
                            // Close return unescaped
                            ["returnRight", "}}}"],
                            // Close tag
                            ["right", "}}"]
                        ],

                        // ## Scanning Helpers
                        // This is an array of helpers that transform content that is within escaped tags like `{{token}}`. These helpers are solely for the scanning phase; they are unrelated to Mustache/Handlebars helpers which execute at render time. Each helper has a definition like the following:
                        //		{
                        //			// The content pattern to match in order to execute.
                        //			// Only the first matching helper is executed.
                        //			name: /pattern to match/,
                        //			// The function to transform the content with.
                        //			// @param {String} content   The content to transform.
                        //			// @param {Object} cmd       Scanner helper data.
                        //			//                           {
                        //			//                             insert: "insert command",
                        //			//                             tagName: "div",
                        //			//                             status: 0
                        //			//                           }
                        //			fn: function(content, cmd) {
                        //				return 'for text injection' ||
                        //					{ raw: 'to bypass text injection' };
                        //			}
                        //		}
                        helpers: [
                            // ### Partials
                            // Partials begin with a greater than sign, like {{> box}}.
                            // Partials are rendered at runtime (as opposed to compile time),
                            // so recursive partials are possible. Just avoid infinite loops.
                            // For example, this template and partial:
                            // 		base.mustache:
                            // 			<h2>Names</h2>
                            // 			{{#names}}
                            // 				{{> user}}
                            // 			{{/names}}
                            // 		user.mustache:
                            // 			<strong>{{name}}</strong>
                            {
                                name: /^>[\s]*\w*/,
                                fn: function(content, cmd) {
                                    // Get the template name and call back into the render method,
                                    // passing the name and the current context.
                                    var templateName = can.trim(content.replace(/^>\s?/, ''))
                                        .replace(/["|']/g, "");
                                    return "can.Mustache.renderPartial('" + templateName + "'," + ARG_NAMES + ")";
                                }
                            },

                            // ### Data Hookup
                            // This will attach the data property of `this` to the element
                            // its found on using the first argument as the data attribute
                            // key.
                            // For example:
                            //		<li id="nameli" {{ data 'name' }}></li>
                            // then later you can access it like:
                            //		can.$('#nameli').data('name');

                            {
                                name: /^\s*data\s/,
                                fn: function(content, cmd) {
                                    var attr = content.match(/["|'](.*)["|']/)[1];
                                    // return a function which calls `can.data` on the element
                                    // with the attribute name with the current context.
                                    return "can.proxy(function(__){" +
                                    // "var context = this[this.length-1];" +
                                    // "context = context." + STACKED + " ? context[context.length-2] : context; console.warn(this, context);" +
                                    "can.data(can.$(__),'" + attr + "', this.attr('.')); }, " + SCOPE + ")";
                                }
                            }, {
                                name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                                fn: function(content) {
                                    var quickFunc = /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                                        parts = content.match(quickFunc);

                                    //find
                                    return "can.proxy(function(__){var " + parts[1] + "=can.$(__);with(" + SCOPE + ".attr('.')){" + parts[2] + "}}, this);";
                                }
                            },
                            // ### Transformation (default)
                            // This transforms all content to its interpolated equivalent,
                            // including calls to the corresponding helpers as applicable.
                            // This outputs the render code for almost all cases.
                            // #### Definitions
                            // * `context` - This is the object that the current rendering context operates within.
                            //		Each nested template adds a new `context` to the context stack.
                            // * `stack` - Mustache supports nested sections,
                            //		each of which add their own context to a stack of contexts.
                            //		Whenever a token gets interpolated, it will check for a match against the
                            //		last context in the stack, then iterate through the rest of the stack checking for matches.
                            //		The first match is the one that gets returned.
                            // * `Mustache.txt` - This serializes a collection of logic, optionally contained within a section.
                            //		If this is a simple interpolation, only the interpolation lookup will be passed.
                            //		If this is a section, then an `options` object populated by the truthy (`options.fn`) and
                            //		falsey (`options.inverse`) encapsulated functions will also be passed. This section handling
                            //		exists to support the runtime context nesting that Mustache supports.
                            // * `Mustache.get` - This resolves an interpolation reference given a stack of contexts.
                            // * `options` - An object containing methods for executing the inner contents of sections or helpers.
                            //		`options.fn` - Contains the inner template logic for a truthy section.
                            //		`options.inverse` - Contains the inner template logic for a falsey section.
                            //		`options.hash` - Contains the merged hash object argument for custom helpers.
                            // #### Design
                            // This covers the design of the render code that the transformation helper generates.
                            // ##### Pseudocode
                            // A detailed explanation is provided in the following sections, but here is some brief pseudocode
                            // that gives a high level overview of what the generated render code does (with a template similar to
                            // `"{{#a}}{{b.c.d.e.name}}{{/a}}" == "Phil"`).
                            // *Initialize the render code.*
                            // 		view = []
                            // 		context = []
                            // 		stack = fn { context.concat([this]) }
                            // *Render the root section.*
                            // 		view.push( "string" )
                            // 		view.push( can.view.txt(
                            // *Render the nested section with `can.Mustache.txt`.*
                            // 			txt(
                            // *Add the current context to the stack.*
                            // 				stack(),
                            // *Flag this for truthy section mode.*
                            // 				"#",
                            // *Interpolate and check the `a` variable for truthyness using the stack with `can.Mustache.get`.*
                            // 				get( "a", stack() ),
                            // *Include the nested section's inner logic.
                            // The stack argument is usually the parent section's copy of the stack,
                            // but it can be an override context that was passed by a custom helper.
                            // Sections can nest `0..n` times -- **NESTCEPTION**.*
                            // 				{ fn: fn(stack) {
                            // *Render the nested section (everything between the `{{#a}}` and `{{/a}}` tokens).*
                            // 					view = []
                            // 					view.push( "string" )
                            // 					view.push(
                            // *Add the current context to the stack.*
                            // 						stack(),
                            // *Flag this as interpolation-only mode.*
                            // 						null,
                            // *Interpolate the `b.c.d.e.name` variable using the stack.*
                            // 						get( "b.c.d.e.name", stack() ),
                            // 					)
                            // 					view.push( "string" )
                            // *Return the result for the nested section.*
                            // 					return view.join()
                            // 				}}
                            // 			)
                            // 		))
                            // 		view.push( "string" )
                            // *Return the result for the root section, which includes all nested sections.*
                            // 		return view.join()
                            // ##### Initialization
                            // Each rendered template is started with the following initialization code:
                            // 		var ___v1ew = [];
                            // 		var ___c0nt3xt = [];
                            // 		___c0nt3xt.__sc0pe = true;
                            // 		var __sc0pe = function(context, self) {
                            // 			var s;
                            // 			if (arguments.length == 1 && context) {
                            // 				s = !context.__sc0pe ? [context] : context;
                            // 			} else {
                            // 				s = context && context.__sc0pe
                            //					? context.concat([self])
                            //					: __sc0pe(context).concat([self]);
                            // 			}
                            // 			return (s.__sc0pe = true) && s;
                            // 		};
                            // The `___v1ew` is the the array used to serialize the view.
                            // The `___c0nt3xt` is a stacking array of contexts that slices and expands with each nested section.
                            // The `__sc0pe` function is used to more easily update the context stack in certain situations.
                            // Usually, the stack function simply adds a new context (`self`/`this`) to a context stack.
                            // However, custom helpers will occasionally pass override contexts that need their own context stack.
                            // ##### Sections
                            // Each section, `{{#section}} content {{/section}}`, within a Mustache template generates a section
                            // context in the resulting render code. The template itself is treated like a root section, with the
                            // same execution logic as any others. Each section can have `0..n` nested sections within it.
                            // Here's an example of a template without any descendent sections.
                            // Given the template: `"{{a.b.c.d.e.name}}" == "Phil"`
                            // Would output the following render code:
                            //		___v1ew.push("\"");
                            //		___v1ew.push(can.view.txt(1, '', 0, this, function() {
                            // 			return can.Mustache.txt(__sc0pe(___c0nt3xt, this), null,
                            //				can.Mustache.get("a.b.c.d.e.name",
                            //					__sc0pe(___c0nt3xt, this))
                            //			);
                            //		}));
                            //		___v1ew.push("\" == \"Phil\"");
                            // The simple strings will get appended to the view. Any interpolated references (like `{{a.b.c.d.e.name}}`)
                            // will be pushed onto the view via `can.view.txt` in order to support live binding.
                            // The function passed to `can.view.txt` will call `can.Mustache.txt`, which serializes the object data by doing
                            // a context lookup with `can.Mustache.get`.
                            // `can.Mustache.txt`'s first argument is a copy of the context stack with the local context `this` added to it.
                            // This stack will grow larger as sections nest.
                            // The second argument is for the section type. This will be `"#"` for truthy sections, `"^"` for falsey,
                            // or `null` if it is an interpolation instead of a section.
                            // The third argument is the interpolated value retrieved with `can.Mustache.get`, which will perform the
                            // context lookup and return the approriate string or object.
                            // Any additional arguments, if they exist, are used for passing arguments to custom helpers.
                            // For nested sections, the last argument is an `options` object that contains the nested section's logic.
                            // Here's an example of a template with a single nested section.
                            // Given the template: `"{{#a}}{{b.c.d.e.name}}{{/a}}" == "Phil"`
                            // Would output the following render code:
                            //		___v1ew.push("\"");
                            // 		___v1ew.push(can.view.txt(0, '', 0, this, function() {
                            // 			return can.Mustache.txt(__sc0pe(___c0nt3xt, this), "#",
                            //				can.Mustache.get("a", __sc0pe(___c0nt3xt, this)),
                            //					[{
                            // 					_: function() {
                            // 						return ___v1ew.join("");
                            // 					}
                            // 				}, {
                            // 					fn: function(___c0nt3xt) {
                            // 						var ___v1ew = [];
                            // 						___v1ew.push(can.view.txt(1, '', 0, this,
                            //								function() {
                            //                                  return can.Mustache.txt(
                            // 									__sc0pe(___c0nt3xt, this),
                            // 									null,
                            // 									can.Mustache.get("b.c.d.e.name",
                            // 										__sc0pe(___c0nt3xt, this))
                            // 								);
                            // 							}
                            // 						));
                            // 						return ___v1ew.join("");
                            // 					}
                            // 				}]
                            //			)
                            // 		}));
                            //		___v1ew.push("\" == \"Phil\"");
                            // This is specified as a truthy section via the `"#"` argument. The last argument includes an array of helper methods used with `options`.
                            // These act similarly to custom helpers: `options.fn` will be called for truthy sections, `options.inverse` will be called for falsey sections.
                            // The `options._` function only exists as a dummy function to make generating the section nesting easier (a section may have a `fn`, `inverse`,
                            // or both, but there isn't any way to determine that at compilation time).
                            // Within the `fn` function is the section's render context, which in this case will render anything between the `{{#a}}` and `{{/a}}` tokens.
                            // This function has `___c0nt3xt` as an argument because custom helpers can pass their own override contexts. For any case where custom helpers
                            // aren't used, `___c0nt3xt` will be equivalent to the `__sc0pe(___c0nt3xt, this)` stack created by its parent section. The `inverse` function
                            // works similarly, except that it is added when `{{^a}}` and `{{else}}` are used. `var ___v1ew = []` is specified in `fn` and `inverse` to
                            // ensure that live binding in nested sections works properly.
                            // All of these nested sections will combine to return a compiled string that functions similar to EJS in its uses of `can.view.txt`.
                            // #### Implementation
                            {
                                name: /^.*$/,
                                fn: function(content, cmd) {
                                    var mode = false,
                                        result = {
                                            content: "",
                                            startTxt: false,
                                            startOnlyTxt: false,
                                            end: false
                                        };

                                    // Trim the content so we don't have any trailing whitespace.
                                    content = can.trim(content);

                                    // Determine what the active mode is.
                                    // * `#` - Truthy section
                                    // * `^` - Falsey section
                                    // * `/` - Close the prior section
                                    // * `else` - Inverted section (only exists within a truthy/falsey section)
                                    if (content.length && (mode = content.match(/^([#^/]|else$)/))) {
                                        mode = mode[0];
                                        switch (mode) {

                                            // Open a new section.
                                            case '#':

                                            case '^':
                                                if (cmd.specialAttribute) {
                                                    result.startOnlyTxt = true;
                                                    //result.push(cmd.insert + 'can.view.onlytxt(this,function(){ return ');
                                                } else {
                                                    result.startTxt = true;
                                                    // sections should never be escaped
                                                    result.escaped = 0;
                                                    //result.push(cmd.insert + 'can.view.txt(0,\'' + cmd.tagName + '\',' + cmd.status + ',this,function(){ return ');
                                                }
                                                break;
                                                // Close the prior section.

                                            case '/':
                                                result.end = true;
                                                result.content += 'return ___v1ew.join("");}}])';
                                                return result;
                                        }

                                        // Trim the mode off of the content.
                                        content = content.substring(1);
                                    }

                                    // `else` helpers are special and should be skipped since they don't
                                    // have any logic aside from kicking off an `inverse` function.
                                    if (mode !== 'else') {
                                        var args = [],
                                            hashes = [],
                                            i = 0,
                                            m;

                                        // Start the content render block.
                                        result.content += 'can.Mustache.txt(\n' +
                                        (cmd.specialAttribute ? SPECIAL_CONTEXT_OBJ : CONTEXT_OBJ) +
                                            ',\n' + (mode ? '"' + mode + '"' : 'null') + ',';

                                        // Parse the helper arguments.
                                        // This needs uses this method instead of a split(/\s/) so that
                                        // strings with spaces can be correctly parsed.
                                        (can.trim(content) + ' ')
                                            .replace(argumentsRegExp, function(whole, arg) {

                                                // Check for special helper arguments (string/number/boolean/hashes).
                                                if (i && (m = arg.match(literalNumberStringBooleanRegExp))) {
                                                    // Found a native type like string/number/boolean.
                                                    if (m[2]) {
                                                        args.push(m[0]);
                                                    }
                                                    // Found a hash object.
                                                    else {
                                                        // Addd to the hash object.

                                                        hashes.push(m[4] + ":" + (m[6] ? m[6] : makeLookupLiteral(m[5])));
                                                    }
                                                }
                                                // Otherwise output a normal interpolation reference.
                                                else {
                                                    args.push(makeLookupLiteral(arg));
                                                }
                                                i++;
                                            });

                                        result.content += args.join(",");
                                        if (hashes.length) {
                                            result.content += ",{" + HASH + ":{" + hashes.join(",") + "}}";
                                        }

                                    }

                                    // Create an option object for sections of code.
                                    if (mode && mode !== 'else') {
                                        result.content += ',[\n\n';
                                    }
                                    switch (mode) {
                                        // Truthy section
                                        case '^':
                                        case '#':
                                            result.content += ('{fn:function(' + ARG_NAMES + '){var ___v1ew = [];');
                                            break;
                                            // If/else section
                                            // Falsey section

                                        case 'else':
                                            result.content += 'return ___v1ew.join("");}},\n{inverse:function(' + ARG_NAMES + '){\nvar ___v1ew = [];';
                                            break;

                                            // Not a section, no mode
                                        default:
                                            result.content += (')');
                                            break;
                                    }

                                    if (!mode) {
                                        result.startTxt = true;
                                        result.end = true;
                                    }

                                    return result;
                                }
                            }
                        ]
                    })
            });

        // Add in default scanner helpers first.
        // We could probably do this differently if we didn't 'break' on every match.
        var helpers = can.view.Scanner.prototype.helpers;
        for (var i = 0; i < helpers.length; i++) {
            Mustache.prototype.scanner.helpers.unshift(helpers[i]);
        }


        Mustache.txt = function(scopeAndOptions, mode, name) {

            // here we are going to cache the lookup values so future calls are much faster
            var scope = scopeAndOptions.scope,
                options = scopeAndOptions.options,
                args = [],
                helperOptions = {
                    fn: function() {},
                    inverse: function() {}
                },
                hash,
                context = scope.attr("."),
                getHelper = true,
                helper;

            // convert lookup values to actual values in name, arguments, and hash
            for (var i = 3; i < arguments.length; i++) {
                var arg = arguments[i];
                if (mode && can.isArray(arg)) {
                    // merge into options
                    helperOptions = can.extend.apply(can, [helperOptions].concat(arg));
                } else if (arg && arg[HASH]) {
                    hash = arg[HASH];
                    // get values on hash
                    for (var prop in hash) {
                        if (isLookup(hash[prop])) {
                            hash[prop] = Mustache.get(hash[prop].get, scopeAndOptions, false, true);
                        }
                    }
                } else if (arg && isLookup(arg)) {
                    args.push(Mustache.get(arg.get, scopeAndOptions, false, true, true));
                } else {
                    args.push(arg);
                }
            }

            if (isLookup(name)) {
                var get = name.get;
                name = Mustache.get(name.get, scopeAndOptions, args.length, false);

                // Base whether or not we will get a helper on whether or not the original
                // name.get and Mustache.get resolve to the same thing. Saves us from running
                // into issues like {{text}} / {text: 'with'}
                getHelper = (get === name);
            }

            // overwrite fn and inverse to always convert to scopes
            helperOptions.fn = makeConvertToScopes(helperOptions.fn, scope, options);
            helperOptions.inverse = makeConvertToScopes(helperOptions.inverse, scope, options);

            // if mode is ^, swap fn and inverse
            if (mode === '^') {
                var tmp = helperOptions.fn;
                helperOptions.fn = helperOptions.inverse;
                helperOptions.inverse = tmp;
            }

            // Check for a registered helper or a helper-like function.
            if (helper = (getHelper && (typeof name === "string" && Mustache.getHelper(name, options)) || (can.isFunction(name) && !name.isComputed && {
                            fn: name
                        }))) {
                // Add additional data to be used by helper functions

                can.extend(helperOptions, {
                        context: context,
                        scope: scope,
                        contexts: scope,
                        hash: hash
                    });

                args.push(helperOptions);
                // Call the helper.
                return function() {
                    return helper.fn.apply(context, args) || '';
                };

            }

            return function() {
                //{{#foo.bar zed ted}}
                var value;
                if (can.isFunction(name) && name.isComputed) {
                    value = name();
                } else {
                    value = name;
                }
                // An array of arguments to check for truthyness when evaluating sections.
                var validArgs = args.length ? args : [value],
                    // Whether the arguments meet the condition of the section.
                    valid = true,
                    result = [],
                    i, argIsObserve, arg;
                // Validate the arguments based on the section mode.
                if (mode) {
                    for (i = 0; i < validArgs.length; i++) {
                        arg = validArgs[i];
                        argIsObserve = typeof arg !== 'undefined' && isObserveLike(arg);
                        // Array-like objects are falsey if their length = 0.
                        if (isArrayLike(arg)) {
                            // Use .attr to trigger binding on empty lists returned from function
                            if (mode === '#') {
                                valid = valid && !! (argIsObserve ? arg.attr('length') : arg.length);
                            } else if (mode === '^') {
                                valid = valid && !(argIsObserve ? arg.attr('length') : arg.length);
                            }
                        }
                        // Otherwise just check if it is truthy or not.
                        else {
                            valid = mode === '#' ? valid && !! arg : mode === '^' ? valid && !arg : valid;
                        }
                    }
                }

                // Otherwise interpolate like normal.
                if (valid) {

                    if (mode === "#") {
                        if (isArrayLike(value)) {
                            var isObserveList = isObserveLike(value);

                            // Add the reference to the list in the contexts.
                            for (i = 0; i < value.length; i++) {
                                result.push(helperOptions.fn(
                                        isObserveList ? value.attr('' + i) : value[i]));
                            }
                            return result.join('');
                        }
                        // Normal case.
                        else {
                            return helperOptions.fn(value || {}) || '';
                        }
                    } else if (mode === "^") {
                        return helperOptions.inverse(value || {}) || '';
                    } else {
                        return '' + (value != null ? value : '');
                    }
                }

                return '';
            };
        };


        Mustache.get = function(key, scopeAndOptions, isHelper, isArgument, isLookup) {

            // Cache a reference to the current context and options, we will use them a bunch.
            var context = scopeAndOptions.scope.attr('.'),
                options = scopeAndOptions.options || {};

            // If key is called as a helper,
            if (isHelper) {
                // try to find a registered helper.
                if (Mustache.getHelper(key, options)) {
                    return key;
                }
                // Support helper-like functions as anonymous helpers.
                // Check if there is a method directly in the "top" context.
                if (scopeAndOptions.scope && can.isFunction(context[key])) {
                    return context[key];
                }


            }

            // Get a compute (and some helper data) that represents key's value in the current scope
            var computeData = scopeAndOptions.scope.computeData(key, {
                    isArgument: isArgument,
                    args: [context, scopeAndOptions.scope]
                }),
                compute = computeData.compute;

            // Bind on the compute to cache its value. We will unbind in a timeout later.
            can.compute.temporarilyBind(compute);

            // computeData gives us an initial value
            var initialValue = computeData.initialValue;



            // Use helper over the found value if the found value isn't in the current context
            if (!isLookup && (initialValue === undefined || computeData.scope !== scopeAndOptions.scope) && Mustache.getHelper(key, options)) {
                return key;
            }

            // If there are no dependencies, just return the value.
            if (!compute.hasDependencies) {
                return initialValue;
            } else {
                return compute;
            }
        };


        Mustache.resolve = function(value) {
            if (isObserveLike(value) && isArrayLike(value) && value.attr('length')) {
                return value;
            } else if (can.isFunction(value)) {
                return value();
            } else {
                return value;
            }
        };



        can.view.Options = can.view.Scope.extend({
                init: function(data, parent) {
                    if (!data.helpers && !data.partials && !data.tags) {
                        data = {
                            helpers: data
                        };
                    }
                    can.view.Scope.prototype.init.apply(this, arguments);
                }
            });

        // ## Helpers
        // Helpers are functions that can be called from within a template.
        // These helpers differ from the scanner helpers in that they execute
        // at runtime instead of during compilation.
        // Custom helpers can be added via `can.Mustache.registerHelper`,
        // but there are also some built-in helpers included by default.
        // Most of the built-in helpers are little more than aliases to actions
        // that the base version of Mustache simply implies based on the
        // passed in object.
        // Built-in helpers:
        // * `data` - `data` is a special helper that is implemented via scanning helpers.
        //		It hooks up the active element to the active data object: `<div {{data "key"}} />`
        // * `if` - Renders a truthy section: `{{#if var}} render {{/if}}`
        // * `unless` - Renders a falsey section: `{{#unless var}} render {{/unless}}`
        // * `each` - Renders an array: `{{#each array}} render {{this}} {{/each}}`
        // * `with` - Opens a context section: `{{#with var}} render {{/with}}`
        Mustache._helpers = {};

        Mustache.registerHelper = function(name, fn) {
            this._helpers[name] = {
                name: name,
                fn: fn
            };
        };


        Mustache.getHelper = function(name, options) {
            var helper = options.attr("helpers." + name);
            return helper ? {
                fn: helper
            } : this._helpers[name];
        };


        Mustache.render = function(partial, scope, options) {
            // TOOD: clean up the following
            // If there is a "partial" property and there is not
            // an already-cached partial, we use the value of the
            // property to look up the partial

            // if this partial is not cached ...
            if (!can.view.cached[partial]) {
                // we don't want to bind to changes so clear and restore reading
                var reads = can.__clearReading();
                if (scope.attr('partial')) {
                    partial = scope.attr('partial');
                }
                can.__setReading(reads);
            }

            // Call into `can.view.render` passing the
            // partial and scope.
            return can.view.render(partial, scope, options);
        };


        Mustache.safeString = function(str) {
            return {
                toString: function() {
                    return str;
                }
            };
        };

        Mustache.renderPartial = function(partialName, scope, options) {
            var partial = options.attr("partials." + partialName);
            if (partial) {
                return partial.render ? partial.render(scope, options) :
                    partial(scope, options);
            } else {
                return can.Mustache.render(partialName, scope, options);
            }
        };

        // The built-in Mustache helpers.
        can.each({
                // Implements the `if` built-in helper.

                'if': function(expr, options) {
                    var value;
                    // if it's a function, wrap its value in a compute
                    // that will only change values from true to false
                    if (can.isFunction(expr)) {
                        value = can.compute.truthy(expr)();
                    } else {
                        value = !! Mustache.resolve(expr);
                    }

                    if (value) {
                        return options.fn(options.contexts || this);
                    } else {
                        return options.inverse(options.contexts || this);
                    }
                },
                // Implements the `unless` built-in helper.

                'unless': function(expr, options) {
                    return Mustache._helpers['if'].fn.apply(this, [can.isFunction(expr) ? can.compute(function() {
                                    return !expr();
                                }) : !expr, options]);
                },

                // Implements the `each` built-in helper.

                'each': function(expr, options) {
                    // Check if this is a list or a compute that resolves to a list, and setup
                    // the incremental live-binding

                    // First, see what we are dealing with.  It's ok to read the compute
                    // because can.view.text is only temporarily binding to what is going on here.
                    // Calling can.view.lists prevents anything from listening on that compute.
                    var resolved = Mustache.resolve(expr),
                        result = [],
                        keys,
                        key,
                        i;

                    // When resolved === undefined, the property hasn't been defined yet
                    // Assume it is intended to be a list
                    if (can.view.lists && (resolved instanceof can.List || (expr && expr.isComputed && resolved === undefined))) {
                        return can.view.lists(expr, function(item, index) {
                            return options.fn(options.scope.add({
                                        "@index": index
                                    })
                                .add(item));
                        });
                    }
                    expr = resolved;

                    if ( !! expr && isArrayLike(expr)) {
                        for (i = 0; i < expr.length; i++) {
                            result.push(options.fn(options.scope.add({
                                            "@index": i
                                        })
                                    .add(expr[i])));
                        }
                        return result.join('');
                    } else if (isObserveLike(expr)) {
                        keys = can.Map.keys(expr);
                        // listen to keys changing so we can livebind lists of attributes.

                        for (i = 0; i < keys.length; i++) {
                            key = keys[i];
                            result.push(options.fn(options.scope.add({
                                            "@key": key
                                        })
                                    .add(expr[key])));
                        }
                        return result.join('');
                    } else if (expr instanceof Object) {
                        for (key in expr) {
                            result.push(options.fn(options.scope.add({
                                            "@key": key
                                        })
                                    .add(expr[key])));
                        }
                        return result.join('');

                    }
                },
                // Implements the `with` built-in helper.

                'with': function(expr, options) {
                    var ctx = expr;
                    expr = Mustache.resolve(expr);
                    if ( !! expr) {
                        return options.fn(ctx);
                    }
                },

                'log': function(expr, options) {
                    if (typeof console !== "undefined" && console.log) {
                        if (!options) {
                            console.log(expr.context);
                        } else {
                            console.log(expr, options.context);
                        }
                    }
                },

                "@index": function(offset, options) {
                    if (!options) {
                        options = offset;
                        offset = 0;
                    }
                    var index = options.scope.attr("@index");
                    return "" + ((can.isFunction(index) ? index() : index) + offset);
                }

            }, function(fn, name) {
                Mustache.registerHelper(name, fn);
            });

        // ## Registration
        // Registers Mustache with can.view.
        can.view.register({
                suffix: "mustache",

                contentType: "x-mustache-template",

                // Returns a `function` that renders the view.
                script: function(id, src) {
                    return "can.Mustache(function(" + ARG_NAMES + ") { " + new Mustache({
                            text: src,
                            name: id
                        })
                        .template.out + " })";
                },

                renderer: function(id, text) {
                    return Mustache({
                            text: text,
                            name: id
                        });
                }
            });

        can.mustache.registerHelper = can.proxy(can.Mustache.registerHelper, can.Mustache);
        can.mustache.safeString = can.Mustache.safeString;
        return can;
    })(__m2, __m25, __m13, __m26, __m23, __m28);

    // ## view/bindings/bindings.js
    var __m32 = (function(can) {

        // Function for determining of an element is contenteditable
        var isContentEditable = (function() {
            // A contenteditable element has a value of an empty string or "true"
            var values = {
                "": true,
                "true": true,
                "false": false
            };

            // Tests if an element has the appropriate contenteditable attribute
            var editable = function(el) {
                // DocumentFragments do not have a getAttribute
                if (!el || !el.getAttribute) {
                    return;
                }

                var attr = el.getAttribute("contenteditable");
                return values[attr];
            };

            return function(el) {
                // First check if the element is explicitly true or false
                var val = editable(el);
                if (typeof val === "boolean") {
                    return val;
                } else {
                    // Otherwise, check the parent
                    return !!editable(el.parentNode);
                }
            };
        })(),
            removeCurly = function(value) {
                if (value[0] === "{" && value[value.length - 1] === "}") {
                    return value.substr(1, value.length - 2);
                }
                return value;
            };

        // ## can-value
        // Implement the `can-value` special attribute
        // ### Usage
        // 		<input can-value="name" />
        // When a view engine finds this attribute, it will call this callback. The value of the attribute
        // should be a string representing some value in the current scope to cross-bind to.
        can.view.attr("can-value", function(el, data) {

            var attr = removeCurly(el.getAttribute("can-value")),
                // Turn the attribute passed in into a compute.  If the user passed in can-value="name" and the current
                // scope of the template is some object called data, the compute representing this can-value will be the
                // data.attr('name') property.
                value = data.scope.computeData(attr, {
                        args: []
                    })
                    .compute,
                trueValue,
                falseValue;

            // Depending on the type of element, this attribute has different behavior. can.Controls are defined (further below
            // in this file) for each type of input. This block of code collects arguments and instantiates each can.Control. There
            // is one for checkboxes/radios, another for multiselect inputs, and another for everything else.
            if (el.nodeName.toLowerCase() === "input") {
                if (el.type === "checkbox") {
                    // If the element is a checkbox and has an attribute called "can-true-value",
                    // set up a compute that toggles the value of the checkbox to "true" based on another attribute.
                    // 		<input type='checkbox' can-value='sex' can-true-value='male' can-false-value='female' />
                    if (can.attr.has(el, "can-true-value")) {
                        trueValue = el.getAttribute("can-true-value");
                    } else {
                        trueValue = true;
                    }
                    if (can.attr.has(el, "can-false-value")) {
                        falseValue = el.getAttribute("can-false-value");
                    } else {
                        falseValue = false;
                    }
                }

                if (el.type === "checkbox" || el.type === "radio") {
                    // For checkboxes and radio buttons, create a Checked can.Control around the input.  Pass in
                    // the compute representing the can-value and can-true-value and can-false-value properties (if
                    // they were used).
                    new Checked(el, {
                            value: value,
                            trueValue: trueValue,
                            falseValue: falseValue
                        });
                    return;
                }
            }
            if (el.nodeName.toLowerCase() === "select" && el.multiple) {
                // For multiselect enabled select inputs, we instantiate a special control around that select element
                // called Multiselect
                new Multiselect(el, {
                        value: value
                    });
                return;
            }
            // For contenteditable elements, we instantiate a Content control.
            if (isContentEditable(el)) {
                new Content(el, {
                        value: value
                    });
                return;
            }
            // The default case. Instantiate the Value control around the element. Pass it the compute representing
            // the observable attribute property that was set.
            new Value(el, {
                    value: value
                });
        });

        // ## Special Event Types (can-SPECIAL)

        // A special object, similar to [$.event.special](http://benalman.com/news/2010/03/jquery-special-events/),
        // for adding hooks for special can-SPECIAL types (not native DOM events). Right now, only can-enter is
        // supported, but this object might be exported so that it can be added to easily.
        // To implement a can-SPECIAL event type, add a property to the special object, whose value is a function
        // that returns the following:
        //		// the real event name to bind to
        //		event: "event-name",
        //		handler: function (ev) {
        //			// some logic that figures out if the original handler should be called or not, and if so...
        //			return original.call(this, ev);
        //		}
        var special = {
            enter: function(data, el, original) {
                return {
                    event: "keyup",
                    handler: function(ev) {
                        if (ev.keyCode === 13) {
                            return original.call(this, ev);
                        }
                    }
                };
            }
        };

        // ## can-EVENT
        // The following section contains code for implementing the can-EVENT attribute.
        // This binds on a wildcard attribute name. Whenever a view is being processed
        // and can-xxx (anything starting with can-), this callback will be run.  Inside, its setting up an event handler
        // that calls a method identified by the value of this attribute.
        can.view.attr(/can-[\w\.]+/, function(el, data) {

            // the attribute name is the function to call
            var attributeName = data.attributeName,
                // The event type to bind on is deteremined by whatever is after can-
                // For example, can-submit binds on the submit event.
                event = attributeName.substr("can-".length),
                // This is the method that the event will initially trigger. It will look up the method by the string name
                // passed in the attribute and call it.
                handler = function(ev) {
                    // The attribute value, representing the name of the method to call (i.e. can-submit="foo" foo is the
                    // name of the method)
                    var attr = removeCurly(el.getAttribute(attributeName)),
                        scopeData = data.scope.read(attr, {
                                returnObserveMethods: true,
                                isArgument: true
                            });
                    return scopeData.value.call(scopeData.parent, data.scope._context, can.$(this), ev);
                };

            // This code adds support for special event types, like can-enter="foo". special.enter (or any special[event]) is
            // a function that returns an object containing an event and a handler. These are to be used for binding. For example,
            // when a user adds a can-enter attribute, we'll bind on the keyup event, and the handler performs special logic to
            // determine on keyup if the enter key was pressed.
            if (special[event]) {
                var specialData = special[event](data, el, handler);
                handler = specialData.handler;
                event = specialData.event;
            }
            // Bind the handler defined above to the element we're currently processing and the event name provided in this
            // attribute name (can-click="foo")
            can.bind.call(el, event, handler);
        });

        // ## Two way binding can.Controls
        // Each type of input that is supported by view/bindings is wrapped with a special can.Control.  The control serves
        // two functions:
        // 1. Bind on the property changing (the compute we're two-way binding to) and change the input value.
        // 2. Bind on the input changing and change the property (compute) we're two-way binding to.
        // There is one control per input type. There could easily be more for more advanced input types, like the HTML5 type="date" input type.

        // ### Value
        // A can.Control that manages the two-way bindings on most inputs.  When can-value is found as an attribute
        // on an input, the callback above instantiates this Value control on the input element.
        var Value = can.Control.extend({
                init: function() {
                    // Handle selects by calling `set` after this thread so the rest of the element can finish rendering.
                    if (this.element[0].nodeName.toUpperCase() === "SELECT") {
                        setTimeout(can.proxy(this.set, this), 1);
                    } else {
                        this.set();
                    }

                },
                // If the live bound data changes, call set to reflect the change in the dom.
                "{value} change": "set",
                set: function() {
                    // This may happen in some edgecases, esp. with selects that are not in DOM after the timeout has fired
                    if (!this.element) {
                        return;
                    }
                    var val = this.options.value();
                    // Set the element's value to match the attribute that was passed in
                    this.element[0].value = (val == null ? '' : val);
                },
                // If the input value changes, this will set the live bound data to reflect the change.
                "change": function() {
                    // This may happen in some edgecases, esp. with selects that are not in DOM after the timeout has fired
                    if (!this.element) {
                        return;
                    }
                    // Set the value of the attribute passed in to reflect what the user typed
                    this.options.value(this.element[0].value);
                }
            }),
            // ### Checked
            // A can.Control that manages the two-way bindings on a checkbox element.  When can-value is found as an attribute
            // on a checkbox, the callback above instantiates this Checked control on the checkbox element.
            Checked = can.Control.extend({
                    init: function() {
                        // If its not a checkbox, its a radio input
                        this.isCheckbox = (this.element[0].type.toLowerCase() === "checkbox");
                        this.check();
                    },
                    // `value` is the compute representing the can-value for this element.  For example can-value="foo" and current
                    // scope is someObj, value is the compute representing someObj.attr('foo')
                    "{value} change": "check",
                    check: function() {
                        // jshint eqeqeq: false
                        if (this.isCheckbox) {
                            var value = this.options.value(),
                                trueValue = this.options.trueValue || true;
                            // If `can-true-value` attribute was set, check if the value is equal to that string value, and set
                            // the checked property based on their equality.
                            this.element[0].checked = (value === trueValue);
                        }
                        // Its a radio input type
                        else {
                            var setOrRemove = this.options.value() == this.element[0].value ?
                                "set" : "remove";

                            can.attr[setOrRemove](this.element[0], 'checked', true);

                        }

                    },
                    // This event is triggered by the DOM.  If a change event occurs, we must set the value of the compute (options.value).
                    "change": function() {

                        if (this.isCheckbox) {
                            // If the checkbox is checked and can-true-value was used, set value to the string value of can-true-value.  If
                            // can-false-value was used and checked is false, set value to the string value of can-false-value.
                            this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue);
                        }
                        // Radio input type
                        else {
                            if (this.element[0].checked) {
                                this.options.value(this.element[0].value);
                            }
                        }

                    }
                }),
            // ### Multiselect
            // A can.Control that handles select input with the "multiple" attribute (meaning more than one can be selected at once).
            Multiselect = Value.extend({
                    init: function() {
                        this.delimiter = ";";
                        this.set();
                    },
                    // Since this control extends Value (above), the set method will be called when the value compute changes (and on init).
                    set: function() {

                        var newVal = this.options.value();

                        // When given a string, try to extract all the options from it (i.e. "a;b;c;d")
                        if (typeof newVal === 'string') {
                            newVal = newVal.split(this.delimiter);
                            this.isString = true;
                        }
                        // When given something else, try to make it an array and deal with it
                        else if (newVal) {
                            newVal = can.makeArray(newVal);
                        }

                        // Make an object containing all the options passed in for convenient lookup
                        var isSelected = {};
                        can.each(newVal, function(val) {
                            isSelected[val] = true;
                        });

                        // Go through each &lt;option/&gt; element, if it has a value property (its a valid option), then
                        // set its selected property if it was in the list of vals that were just set.
                        can.each(this.element[0].childNodes, function(option) {
                            if (option.value) {
                                option.selected = !! isSelected[option.value];
                            }

                        });

                    },
                    // A helper function used by the 'change' handler below. Its purpose is to return an array of selected
                    // values, like ["foo", "bar"]
                    get: function() {
                        var values = [],
                            children = this.element[0].childNodes;

                        can.each(children, function(child) {
                            if (child.selected && child.value) {
                                values.push(child.value);
                            }
                        });

                        return values;
                    },
                    // Called when the user changes this input in any way.
                    'change': function() {
                        // Get an array of the currently selected values
                        var value = this.get(),
                            currentValue = this.options.value();

                        // If the compute is a string, set its value to the joined version of the values array (i.e. "foo;bar")
                        if (this.isString || typeof currentValue === "string") {
                            this.isString = true;
                            this.options.value(value.join(this.delimiter));
                        }
                        // If the compute is a can.List, replace its current contents with the new array of values
                        else if (currentValue instanceof can.List) {
                            currentValue.attr(value, true);
                        }
                        // Otherwise set the value to the array of values selected in the input.
                        else {
                            this.options.value(value);
                        }

                    }
                }),
            Content = can.Control.extend({
                    init: function() {
                        this.set();
                        this.on("blur", "setValue");
                    },
                    "{value} change": "set",
                    set: function() {
                        var val = this.options.value();
                        this.element[0].innerHTML = (typeof val === 'undefined' ? '' : val);
                    },
                    setValue: function() {
                        this.options.value(this.element[0].innerHTML);
                    }
                });

    })(__m2, __m24, __m14);

    // ## component/component.js
    var __m1 = (function(can, viewCallbacks) {
        // ## Helpers
        // Attribute names to ignore for setting scope values.
        var ignoreAttributesRegExp = /^(dataViewId|class|id)$/i,
            paramReplacer = /\{([^\}]+)\}/g;


        var Component = can.Component = can.Construct.extend(

            // ## Static


            {
                // ### setup
                // When a component is extended, this sets up the component's internal constructor
                // functions and templates for later fast initialization.
                setup: function() {
                    can.Construct.setup.apply(this, arguments);

                    // When `can.Component.setup` function is ran for the first time, `can.Component` doesn't exist yet
                    // which ensures that the following code is ran only in constructors that extend `can.Component`.
                    if (can.Component) {
                        var self = this,
                            scope = this.prototype.scope;

                        // Define a control using the `events` prototype property.
                        this.Control = ComponentControl.extend(this.prototype.events);

                        // Look to convert `scope` to a Map constructor function.
                        if (!scope || (typeof scope === "object" && !(scope instanceof can.Map))) {
                            // If scope is an object, use that object as the prototype of an extended
                            // Map constructor function.
                            // A new instance of that Map constructor function will be created and
                            // set a the constructor instance's scope.
                            this.Map = can.Map.extend(scope || {});
                        } else if (scope.prototype instanceof can.Map) {
                            // If scope is a can.Map constructor function, just use that.
                            this.Map = scope;
                        }

                        // Look for default `@` values. If a `@` is found, these
                        // attributes string values will be set and 2-way bound on the
                        // component instance's scope.
                        this.attributeScopeMappings = {};
                        can.each(this.Map ? this.Map.defaults : {}, function(val, prop) {
                            if (val === "@") {
                                self.attributeScopeMappings[prop] = prop;
                            }
                        });

                        // Convert the template into a renderer function.
                        if (this.prototype.template) {
                            // If `this.prototype.template` is a function create renderer from it by
                            // wrapping it with the anonymous function that will pass it the arguments,
                            // otherwise create the render from the string
                            if (typeof this.prototype.template === "function") {
                                var temp = this.prototype.template;
                                this.renderer = function() {
                                    return can.view.frag(temp.apply(null, arguments));
                                };
                            } else {
                                this.renderer = can.view.mustache(this.prototype.template);
                            }
                        }

                        // Register this component to be created when its `tag` is found.
                        can.view.tag(this.prototype.tag, function(el, options) {
                            new self(el, options);
                        });
                    }

                }
            }, {
                // ## Prototype

                // ### setup
                // When a new component instance is created, setup bindings, render the template, etc.
                setup: function(el, hookupOptions) {
                    // Setup values passed to component
                    var initalScopeData = {},
                        component = this,
                        twoWayBindings = {},
                        // what scope property is currently updating
                        scopePropertyUpdating,
                        // the object added to the scope
                        componentScope,
                        frag;

                    // ## Scope

                    // Add scope prototype properties marked with an "@" to the `initialScopeData` object
                    can.each(this.constructor.attributeScopeMappings, function(val, prop) {
                        initalScopeData[prop] = el.getAttribute(can.hyphenate(val));
                    });

                    // Get the value in the scope for each attribute
                    // the hookup should probably happen after?
                    can.each(can.makeArray(el.attributes), function(node, index) {
                        var name = can.camelize(node.nodeName.toLowerCase()),
                            value = node.value;



                        // Ignore attributes already present in the ScopeMappings.
                        if (component.constructor.attributeScopeMappings[name] || ignoreAttributesRegExp.test(name) || viewCallbacks.attr(node.nodeName)) {
                            return;
                        }
                        // Only setup bindings if attribute looks like `foo="{bar}"`
                        if (value[0] === "{" && value[value.length - 1] === "}") {
                            value = value.substr(1, value.length - 2);
                        } else {
                            // Legacy template types will crossbind "foo=bar"
                            if (hookupOptions.templateType !== "legacy") {
                                initalScopeData[name] = value;
                                return;
                            }
                        }
                        // Cross-bind the value in the scope to this
                        // component's scope
                        var computeData = hookupOptions.scope.computeData(value, {
                                args: []
                            }),
                            compute = computeData.compute;

                        // bind on this, check it's value, if it has dependencies
                        var handler = function(ev, newVal) {
                            scopePropertyUpdating = name;
                            componentScope.attr(name, newVal);
                            scopePropertyUpdating = null;
                        };

                        // Compute only returned if bindable
                        compute.bind("change", handler);

                        // Set the value to be added to the scope
                        initalScopeData[name] = compute();

                        // We don't need to listen to the compute `change` if it doesn't have any dependencies
                        if (!compute.hasDependencies) {
                            compute.unbind("change", handler);
                        } else {
                            // Make sure we unbind (there's faster ways of doing this)
                            can.bind.call(el, "removed", function() {
                                compute.unbind("change", handler);
                            });
                            // Setup the two-way binding
                            twoWayBindings[name] = computeData;
                        }

                    });
                    if (this.constructor.Map) {
                        // If `Map` property is set on the constructor use it to wrap the `initialScopeData`
                        componentScope = new this.constructor.Map(initalScopeData);
                    } else if (this.scope instanceof can.Map) {
                        // If `this.scope` is instance of `can.Map` assign it to the `componentScope`
                        componentScope = this.scope;
                    } else if (can.isFunction(this.scope)) {
                        // If `this.scope` is a function, call the function and
                        var scopeResult = this.scope(initalScopeData, hookupOptions.scope, el);

                        if (scopeResult instanceof can.Map) {
                            // If the function returns a can.Map, use that as the scope
                            componentScope = scopeResult;
                        } else if (scopeResult.prototype instanceof can.Map) {
                            // If `scopeResult` is of a `can.Map` type, use it to wrap the `initialScopeData`
                            componentScope = new scopeResult(initalScopeData);
                        } else {
                            // Otherwise extend `can.Map` with the `scopeResult` and initialize it with the `initialScopeData`
                            componentScope = new(can.Map.extend(scopeResult))(initalScopeData);
                        }

                    }

                    // ## Two way bindings

                    // Object to hold the bind handlers so we can tear them down
                    var handlers = {};
                    // Setup reverse bindings
                    can.each(twoWayBindings, function(computeData, prop) {
                        handlers[prop] = function(ev, newVal) {
                            // Check that this property is not being changed because
                            // it's source value just changed
                            if (scopePropertyUpdating !== prop) {
                                computeData.compute(newVal);
                            }
                        };
                        componentScope.bind(prop, handlers[prop]);
                    });
                    // Teardown reverse bindings when the element is removed
                    can.bind.call(el, "removed", function() {
                        can.each(handlers, function(handler, prop) {
                            componentScope.unbind(prop, handlers[prop]);
                        });
                    });
                    // Setup the attributes bindings
                    if (!can.isEmptyObject(this.constructor.attributeScopeMappings) || hookupOptions.templateType !== "legacy") {
                        // Bind on the `attributes` event and update the scope.
                        can.bind.call(el, "attributes", function(ev) {
                            // Convert attribute name from the `attribute-name` to the `attributeName` format.
                            var camelized = can.camelize(ev.attributeName);
                            if (!twoWayBindings[camelized] && !ignoreAttributesRegExp.test(camelized)) {
                                // If there is a mapping for this attribute, update the `componentScope` attribute
                                componentScope.attr(camelized, el.getAttribute(ev.attributeName));
                            }
                        });

                    }

                    // Set `componentScope` to `this.scope` and set it to the element's `data` object as a `scope` property
                    this.scope = componentScope;
                    can.data(can.$(el), "scope", this.scope);

                    // Create a real Scope object out of the scope property
                    var renderedScope = hookupOptions.scope.add(this.scope),
                        options = {
                            helpers: {}
                        };

                    // ## Helpers

                    // Setup helpers to callback with `this` as the component
                    can.each(this.helpers || {}, function(val, prop) {
                        if (can.isFunction(val)) {
                            options.helpers[prop] = function() {
                                return val.apply(componentScope, arguments);
                            };
                        }
                    });

                    // ## `events` control

                    // Create a control to listen to events
                    this._control = new this.constructor.Control(el, {
                            // Pass the scope to the control so we can listen to it's changes from the controller.
                            scope: this.scope
                        });

                    // ## Rendering

                    // If this component has a template (that we've already converted to a renderer)
                    if (this.constructor.renderer) {
                        // If `options.tags` doesn't exist set it to an empty object.
                        if (!options.tags) {
                            options.tags = {};
                        }

                        // We need be alerted to when a <content> element is rendered so we can put the original contents of the widget in its place
                        options.tags.content = function contentHookup(el, rendererOptions) {
                            // First check if there was content within the custom tag
                            // otherwise, render what was within <content>, the default code
                            var subtemplate = hookupOptions.subtemplate || rendererOptions.subtemplate;

                            if (subtemplate) {

                                // `rendererOptions.options` is a scope of helpers where `<content>` was found, so
                                // the right helpers should already be available.
                                // However, `_tags.content` is going to point to this current content callback.  We need to
                                // remove that so it will walk up the chain

                                delete options.tags.content;

                                can.view.live.replace([el], subtemplate(
                                        // This is the context of where `<content>` was found
                                        // which will have the the component's context
                                        rendererOptions.scope,

                                        rendererOptions.options));

                                // Restore the content tag so it could potentially be used again (as in lists)
                                options.tags.content = contentHookup;
                            }
                        };
                        // Render the component's template
                        frag = this.constructor.renderer(renderedScope, hookupOptions.options.add(options));
                    } else {
                        // Otherwise render the contents between the
                        if (hookupOptions.templateType === "legacy") {
                            frag = can.view.frag(hookupOptions.subtemplate ? hookupOptions.subtemplate(renderedScope, hookupOptions.options.add(options)) : "");
                        } else {
                            frag = hookupOptions.subtemplate ? hookupOptions.subtemplate(renderedScope, hookupOptions.options.add(options)) : document.createDocumentFragment();
                        }

                    }
                    // Append the resulting document fragment to the element
                    can.appendChild(el, frag);
                }
            });

        var ComponentControl = can.Control.extend({
                // Change lookup to first look in the scope.
                _lookup: function(options) {
                    return [options.scope, options, window];
                },
                _action: function(methodName, options, controlInstance) {
                    var hasObjectLookup, readyCompute;

                    paramReplacer.lastIndex = 0;

                    hasObjectLookup = paramReplacer.test(methodName);

                    // If we don't have options (a `control` instance), we'll run this
                    // later.
                    if (!controlInstance && hasObjectLookup) {
                        return;
                    } else if (!hasObjectLookup) {
                        return can.Control._action.apply(this, arguments);
                    } else {
                        // We have `hasObjectLookup` and `controlInstance`.

                        readyCompute = can.compute(function() {
                            var delegate;

                            // Set the delegate target and get the name of the event we're listening to.
                            var name = methodName.replace(paramReplacer, function(matched, key) {
                                var value;

                                // If we are listening directly on the `scope` set it as a delegate target.
                                if (key === "scope") {
                                    delegate = options.scope;
                                    return "";
                                }

                                // Remove `scope.` from the start of the key and read the value from the `scope`.
                                key = key.replace(/^scope\./, "");
                                value = can.compute.read(options.scope, key.split("."), {
                                        isArgument: true
                                    }).value;

                                // If `value` is undefined use `can.getObject` to get the value.
                                if (value === undefined) {
                                    value = can.getObject(key);
                                }

                                // If `value` is a string we just return it, otherwise we set it as a delegate target.
                                if (typeof value === "string") {
                                    return value;
                                } else {
                                    delegate = value;
                                    return "";
                                }

                            });

                            // Get the name of the `event` we're listening to.
                            var parts = name.split(/\s+/g),
                                event = parts.pop();

                            // Return everything needed to handle the event we're listening to.
                            return {
                                processor: this.processors[event] || this.processors.click,
                                parts: [name, parts.join(" "), event],
                                delegate: delegate || undefined
                            };

                        }, this);

                        // Create a handler function that we'll use to handle the `change` event on the `readyCompute`.
                        var handler = function(ev, ready) {
                            controlInstance._bindings.control[methodName](controlInstance.element);
                            controlInstance._bindings.control[methodName] = ready.processor(
                                ready.delegate || controlInstance.element,
                                ready.parts[2], ready.parts[1], methodName, controlInstance);
                        };

                        readyCompute.bind("change", handler);

                        controlInstance._bindings.readyComputes[methodName] = {
                            compute: readyCompute,
                            handler: handler
                        };

                        return readyCompute();
                    }
                }
            },
            // Extend `events` with a setup method that listens to changes in `scope` and
            // rebinds all templated event handlers.
            {
                setup: function(el, options) {
                    this.scope = options.scope;
                    return can.Control.prototype.setup.call(this, el, options);
                },
                off: function() {
                    // If `this._bindings` exists we need to go through it's `readyComputes` and manually
                    // unbind `change` event listeners set by the controller.
                    if (this._bindings) {
                        can.each(this._bindings.readyComputes || {}, function(value) {
                            value.compute.unbind("change", value.handler);
                        });
                    }
                    // Call `can.Control.prototype.off` function on this instance to cleanup the bindings.
                    can.Control.prototype.off.apply(this, arguments);
                    this._bindings.readyComputes = {};
                }
            });

        // If there is a `$` object and it has the `fn` object, create the `scope` plugin that returns
        // the scope object
        if (window.$ && $.fn) {
            $.fn.scope = function(attr) {
                // If `attr` is passed to the `scope` plugin return the value of that
                // attribute on the `scope` object, otherwise return the whole scope
                if (attr) {
                    return this.data("scope")
                        .attr(attr);
                } else {
                    return this.data("scope");
                }
            };
        }

        // Define the `can.scope` function that can be used to retrieve the `scope` from the element
        can.scope = function(el, attr) {
            el = can.$(el);
            // If `attr` is passed to the `can.scope` function return the value of that
            // attribute on the `scope` object otherwise return the whole scope
            if (attr) {
                return can.data(el, "scope")
                    .attr(attr);
            } else {
                return can.data(el, "scope");
            }
        };

        return Component;
    })(__m2, __m12, __m14, __m17, __m24, __m32);

    // ## model/model.js
    var __m33 = (function(can) {

        // ## model.js
        // (Don't steal this file directly in your code.)

        // ## pipe
        // `pipe` lets you pipe the results of a successful deferred
        // through a function before resolving the deferred.

        var pipe = function(def, thisArg, func) {
            // The piped result will be available through a new Deferred.
            var d = new can.Deferred();
            def.then(function() {
                var args = can.makeArray(arguments),
                    success = true;

                try {
                    // Pipe the results through the function.
                    args[0] = func.apply(thisArg, args);
                } catch (e) {
                    success = false;
                    // The function threw an error, so reject the Deferred.
                    d.rejectWith(d, [e].concat(args));
                }
                if (success) {
                    // Resolve the new Deferred with the piped value.
                    d.resolveWith(d, args);
                }
            }, function() {
                // Pass on the rejection if the original Deferred never resolved.
                d.rejectWith(this, arguments);
            });

            // `can.ajax` returns a Deferred with an abort method to halt the AJAX call.
            if (typeof def.abort === 'function') {
                d.abort = function() {
                    return def.abort();
                };
            }

            // Return the new (piped) Deferred.
            return d;
        },

            // ## modelNum
            // When new model constructors are set up without a full name,
            // `modelNum` lets us name them uniquely (to keep track of them).
            modelNum = 0,

            // ## getId
            getId = function(inst) {
                // `can.__reading` makes a note that `id` was just read.
                can.__reading(inst, inst.constructor.id);
                // Use `__get` instead of `attr` for performance. (But that means we have to remember to call `can.__reading`.)
                return inst.__get(inst.constructor.id);
            },

            // ## ajax
            // This helper method makes it easier to make an AJAX call from the configuration of the Model.
            ajax = function(ajaxOb, data, type, dataType, success, error) {

                var params = {};

                // A string here would be something like `"GET /endpoint"`.
                if (typeof ajaxOb === 'string') {
                    // Split on spaces to separate the HTTP method and the URL.
                    var parts = ajaxOb.split(/\s+/);
                    params.url = parts.pop();
                    if (parts.length) {
                        params.type = parts.pop();
                    }
                } else {
                    // If the first argument is an object, just load it into `params`.
                    can.extend(params, ajaxOb);
                }

                // If the `data` argument is a plain object, copy it into `params`.
                params.data = typeof data === "object" && !can.isArray(data) ?
                    can.extend(params.data || {}, data) : data;

                // Substitute in data for any templated parts of the URL.
                params.url = can.sub(params.url, params.data, true);

                return can.ajax(can.extend({
                            type: type || 'post',
                            dataType: dataType || 'json',
                            success: success,
                            error: error
                        }, params));
            },

            // ## makeRequest
            // This function abstracts making the actual AJAX request away from the Model.
            makeRequest = function(modelObj, type, success, error, method) {
                var args;

                // If `modelObj` is an Array, it it means we are coming from
                // the queued request, and we're passing already-serialized data.
                if (can.isArray(modelObj)) {
                    // In that case, modelObj's signature will be `[modelObj, serializedData]`, so we need to unpack it.
                    args = modelObj[1];
                    modelObj = modelObj[0];
                } else {
                    // If we aren't supplied with serialized data, we'll make our own.
                    args = modelObj.serialize();
                }
                args = [args];

                var deferred,
                    model = modelObj.constructor,
                    jqXHR;

                // When calling `update` and `destroy`, the current ID needs to be the first parameter in the AJAX call.
                if (type === 'update' || type === 'destroy') {
                    args.unshift(getId(modelObj));
                }
                jqXHR = model[type].apply(model, args);

                // Make sure that can.Model can react to the request before anything else does.
                deferred = pipe(jqXHR, modelObj, function(data) {
                    // `method` is here because `"destroyed" !== "destroy" + "d"`.
                    // TODO: Do something smarter/more consistent here?
                    modelObj[method || type + "d"](data, jqXHR);
                    return modelObj;
                });

                // Hook up `abort`
                if (jqXHR.abort) {
                    deferred.abort = function() {
                        jqXHR.abort();
                    };
                }

                deferred.then(success, error);
                return deferred;
            },

            initializers = {
                // ## models
                // Returns a function that, when handed a list of objects, makes them into models and returns a model list of them.
                // `prop` is the property on `instancesRawData` that has the array of objects in it (if it's not `data`).
                models: function(prop) {
                    return function(instancesRawData, oldList) {
                        // Increment reqs counter so new instances will be added to the store.
                        // (This is cleaned up at the end of the method.)
                        can.Model._reqs++;

                        // If there is no data, we can't really do anything with it.
                        if (!instancesRawData) {
                            return;
                        }

                        // If the "raw" data is already a List, it's not raw.
                        if (instancesRawData instanceof this.List) {
                            return instancesRawData;
                        }

                        var self = this,
                            // `tmp` will hold the models before we push them onto `modelList`.
                            tmp = [],
                            // `ML` (see way below) is just `can.Model.List`.
                            ListClass = self.List || ML,
                            modelList = oldList instanceof can.List ? oldList : new ListClass(),

                            // Check if we were handed an Array or a model list.
                            rawDataIsArray = can.isArray(instancesRawData),
                            rawDataIsList = instancesRawData instanceof ML,

                            // Get the "plain" objects from the models from the list/array.
                            raw = rawDataIsArray ? instancesRawData : (
                                rawDataIsList ? instancesRawData.serialize() : can.getObject(prop || "data", instancesRawData));

                        if (typeof raw === 'undefined') {
                            throw new Error('Could not get any raw data while converting using .models');
                        }



                        // If there was anything left in the list we were given, get rid of it.
                        if (modelList.length) {
                            modelList.splice(0);
                        }

                        // If we pushed these directly onto the list, it would cause a change event for each model.
                        // So, we push them onto `tmp` first and then push everything at once, causing one atomic change event that contains all the models at once.
                        can.each(raw, function(rawPart) {
                            tmp.push(self.model(rawPart));
                        });
                        modelList.push.apply(modelList, tmp);

                        // If there was other stuff on `instancesRawData`, let's transfer that onto `modelList` too.
                        if (!rawDataIsArray) {
                            can.each(instancesRawData, function(val, prop) {
                                if (prop !== 'data') {
                                    modelList.attr(prop, val);
                                }
                            });
                        }
                        // Clean up the store on the next turn of the event loop. (`this` is a model constructor.)
                        setTimeout(can.proxy(this._clean, this), 1);
                        return modelList;
                    };
                },
                // ## model
                // Returns a function that, when handed a plain object, turns it into a model.
                // `prop` is the property on `attributes` that has the properties for the model in it.
                model: function(prop) {
                    return function(attributes) {
                        // If there're no properties, there can be no model.
                        if (!attributes) {
                            return;
                        }
                        // If this object knows how to serialize, parse, or access itself, we'll use that instead.
                        if (typeof attributes.serialize === 'function') {
                            attributes = attributes.serialize();
                        }
                        if (this.parseModel) {
                            attributes = this.parseModel.apply(this, arguments);
                        } else if (prop) {
                            attributes = can.getObject(prop || "data", attributes);
                        }

                        var id = attributes[this.id],
                            // 0 is a valid ID.
                            model = (id || id === 0) && this.store[id] ?
                            // If this model is in the store already, just update it.
                            this.store[id].attr(attributes, this.removeAttr || false) :
                            // Otherwise, we need a new model.
                            new this(attributes);

                        return model;
                    };
                }
            },


            parserMaker = function(prop) {
                return function(attributes) {
                    return prop ? can.getObject(prop || "data", attributes) : attributes;
                };
            },

            // ## parsers
            // This object describes how to take the data from an AJAX request and prepare it for `models` and `model`.
            // These functions are meant to be overwritten (if necessary) in an extended model constructor.
            parsers = {

                parseModel: parserMaker,

                parseModels: parserMaker
            },

            // ## ajaxMethods
            // This object describes how to make an AJAX request for each ajax method (`create`, `update`, etc.)
            // Each AJAX method is an object in `ajaxMethods` and can have the following properties:
            // - `url`: Which property on the model contains the default URL for this method.
            // - `type`: The default HTTP request method.
            // - `data`: A method that takes the arguments from `makeRequest` (see above) and returns a data object for use in the AJAX call.


            ajaxMethods = {

                create: {
                    url: "_shortName",
                    type: "post"
                },

                update: {
                    // ## update.data
                    data: function(id, attrs) {
                        attrs = attrs || {};

                        // `this.id` is the property that represents the ID (and is usually `"id"`).
                        var identity = this.id;

                        // If the value of the property being used as the ID changed,
                        // indicate that in the request and replace the current ID property.
                        if (attrs[identity] && attrs[identity] !== id) {
                            attrs["new" + can.capitalize(id)] = attrs[identity];
                            delete attrs[identity];
                        }
                        attrs[identity] = id;

                        return attrs;
                    },
                    type: "put"
                },

                destroy: {
                    type: 'delete',
                    // ## destroy.data
                    data: function(id, attrs) {
                        attrs = attrs || {};
                        // `this.id` is the property that represents the ID (and is usually `"id"`).
                        attrs.id = attrs[this.id] = id;
                        return attrs;
                    }
                },

                findAll: {
                    url: "_shortName"
                },

                findOne: {}
            },
            // ## ajaxMaker
            // Takes a method defined just above and a string that describes how to call that method
            // and makes a function that calls that method with the given data.
            // - `ajaxMethod`: The object defined above in `ajaxMethods`.
            // - `str`: The string the configuration provided (such as `"/recipes.json"` for a `findAll` call).
            ajaxMaker = function(ajaxMethod, str) {
                return function(data) {
                    data = ajaxMethod.data ?
                    // If the AJAX method mentioned above has its own way of getting `data`, use that.
                    ajaxMethod.data.apply(this, arguments) :
                    // Otherwise, just use the data passed in.
                    data;

                    // Make the AJAX call with the URL, data, and type indicated by the proper `ajaxMethod` above.
                    return ajax(str || this[ajaxMethod.url || "_url"], data, ajaxMethod.type || "get");
                };
            },
            // ## createURLFromResource
            // For each of the names (create, update, destroy, findOne, and findAll) use the
            // URL provided by the `resource` property. For example:
            // 		ToDo = can.Model.extend({
            // 			resource: "/todos"
            // 		}, {});
            // 	Will create a can.Model that is identical to:
            // 		ToDo = can.Model.extend({
            // 			findAll: "GET /todos",
            // 			findOne: "GET /todos/{id}",
            // 			create:  "POST /todos",
            // 			update:  "PUT /todos/{id}",
            // 			destroy: "DELETE /todos/{id}"
            // 		},{});
            // - `model`: the can.Model that has the resource property
            // - `method`: a property from the ajaxMethod object
            createURLFromResource = function(model, name) {
                if (!model.resource) {
                    return;
                }

                var resource = model.resource.replace(/\/+$/, "");
                if (name === "findAll" || name === "create") {
                    return resource;
                } else {
                    return resource + "/{" + model.id + "}";
                }
            };

        // # can.Model
        // A can.Map that connects to a RESTful interface.
        can.Model = can.Map.extend({
                // `fullName` identifies the model type in debugging.
                fullName: "can.Model",
                _reqs: 0,
                // ## can.Model.setup

                setup: function(base, fullName, staticProps, protoProps) {
                    // Assume `fullName` wasn't passed. (`can.Model.extend({ ... }, { ... })`)
                    // This is pretty usual.
                    if (typeof fullName !== "string") {
                        protoProps = staticProps;
                        staticProps = fullName;
                    }
                    // Assume no static properties were passed. (`can.Model.extend({ ... })`)
                    // This is really unusual for a model though, since there's so much configuration.
                    if (!protoProps) {

                        protoProps = staticProps;
                    }

                    // Create the model store here, in case someone wants to use can.Model without inheriting from it.
                    this.store = {};

                    can.Map.setup.apply(this, arguments);
                    if (!can.Model) {
                        return;
                    }

                    // `List` is just a regular can.Model.List that knows what kind of Model it's hooked up to.

                    if (staticProps && staticProps.List) {
                        this.List = staticProps.List;
                        this.List.Map = this;
                    } else {
                        this.List = base.List.extend({
                                Map: this
                            }, {});
                    }

                    var self = this,
                        clean = can.proxy(this._clean, self);

                    // Go through `ajaxMethods` and set up static methods according to their configurations.
                    can.each(ajaxMethods, function(method, name) {
                        // Check the configuration for this ajaxMethod.
                        // If the configuration isn't a function, it should be a string (like `"GET /endpoint"`)
                        // or an object like `{url: "/endpoint", type: 'GET'}`.

                        //if we have a string(like `"GET /endpoint"`) or an object(ajaxSettings) set in the static definition(not inherited),
                        //convert it to a function.
                        if (staticProps && staticProps[name] && (typeof staticProps[name] === 'string' || typeof staticProps[name] === 'object')) {
                            self[name] = ajaxMaker(method, staticProps[name]);
                        }
                        //if we have a resource property set in the static definition
                        else if (staticProps && staticProps.resource) {
                            self[name] = ajaxMaker(method, createURLFromResource(self, name));
                        }

                        // There may also be a "maker" function (like `makeFindAll`) that alters the behavior of acting upon models
                        // by changing when and how the function we just made with `ajaxMaker` gets called.
                        // For example, you might cache responses and only make a call when you don't have a cached response.
                        if (self["make" + can.capitalize(name)]) {
                            // Use the "maker" function to make the new "ajaxMethod" function.
                            var newMethod = self["make" + can.capitalize(name)](self[name]);
                            // Replace the "ajaxMethod" function in the configuration with the new one.
                            // (`_overwrite` just overwrites a property in a given Construct.)
                            can.Construct._overwrite(self, base, name, function() {
                                // Increment the numer of requests...
                                can.Model._reqs++;
                                // ...make the AJAX call (and whatever else you're doing)...
                                var def = newMethod.apply(this, arguments);
                                // ...and clean up the store.
                                var then = def.then(clean, clean);
                                // Pass along `abort` so you can still abort the AJAX call.
                                then.abort = def.abort;

                                return then;
                            });
                        }
                    });

                    // Set up the methods that will set up `models` and `model`.
                    can.each(initializers, function(makeInitializer, name) {
                        var parseName = "parse" + can.capitalize(name),
                            dataProperty = self[name];

                        // If there was a different property to find the model's data in than `data`,
                        // make `parseModel` and `parseModels` functions that look that up instead.
                        if (typeof dataProperty === "string") {
                            can.Construct._overwrite(self, base, parseName, parsers[parseName](dataProperty));
                            can.Construct._overwrite(self, base, name, makeInitializer(dataProperty));
                        }

                        // If there was no prototype, or no `model` and no `parseModel`,
                        // we'll have to create a `parseModel`.
                        else if (!staticProps || (!staticProps[name] && !staticProps[parseName])) {
                            can.Construct._overwrite(self, base, parseName, parsers[parseName]());
                        }
                    });

                    // With the overridden parse methods, set up `models` and `model`.
                    can.each(parsers, function(makeParser, name) {
                        // If there was a different property to find the model's data in than `data`,
                        // make `model` and `models` functions that look that up instead.
                        if (typeof self[name] === "string") {
                            can.Construct._overwrite(self, base, name, makeParser(self[name]));
                        }
                    });

                    // Make sure we have a unique name for this Model.
                    if (self.fullName === "can.Model" || !self.fullName) {
                        self.fullName = "Model" + (++modelNum);
                    }

                    can.Model._reqs = 0;
                    this._url = this._shortName + "/{" + this.id + "}";
                },
                _ajax: ajaxMaker,
                _makeRequest: makeRequest,
                // ## can.Model._clean
                // `_clean` cleans up the model store after a request happens.
                _clean: function() {
                    can.Model._reqs--;
                    // Don't clean up unless we have no pending requests.
                    if (!can.Model._reqs) {
                        for (var id in this.store) {
                            // Delete all items in the store without any event bindings.
                            if (!this.store[id]._bindings) {
                                delete this.store[id];
                            }
                        }
                    }
                    return arguments[0];
                },

                models: initializers.models("data"),

                model: initializers.model()
            },


            {
                // ## can.Model#setup
                setup: function(attrs) {
                    // Try to add things as early as possible to the store (#457).
                    // This is the earliest possible moment, even before any properties are set.
                    var id = attrs && attrs[this.constructor.id];
                    if (can.Model._reqs && id != null) {
                        this.constructor.store[id] = this;
                    }
                    can.Map.prototype.setup.apply(this, arguments);
                },
                // ## can.Model#isNew
                // Something is new if its ID is `null` or `undefined`.

                isNew: function() {
                    var id = getId(this);
                    // 0 is a valid ID.
                    // TODO: Why not `return id === null || id === undefined;`?
                    return !(id || id === 0); // If `null` or `undefined`
                },
                // ## can.Model#save
                // `save` calls `create` or `update` as necessary, based on whether a model is new.

                save: function(success, error) {
                    return makeRequest(this, this.isNew() ? 'create' : 'update', success, error);
                },
                // ## can.Model#destroy
                // Acts like can.Map.destroy but it also makes an AJAX call.

                destroy: function(success, error) {
                    // If this model is new, don't make an AJAX call.
                    // Instead, we have to construct the Deferred ourselves and return it.
                    if (this.isNew()) {
                        var self = this;
                        var def = can.Deferred();
                        def.then(success, error);

                        return def.done(function(data) {
                            self.destroyed(data);
                        }).resolve(self);
                    }

                    // If it isn't new, though, go ahead and make a request.
                    return makeRequest(this, 'destroy', success, error, 'destroyed');
                },
                // ## can.Model#bind and can.Model#unbind
                // These aren't actually implemented here, but their setup needs to be changed to account for the store.

                _bindsetup: function() {
                    this.constructor.store[this.__get(this.constructor.id)] = this;
                    return can.Map.prototype._bindsetup.apply(this, arguments);
                },

                _bindteardown: function() {
                    delete this.constructor.store[getId(this)];
                    return can.Map.prototype._bindteardown.apply(this, arguments);
                },
                // Change the behavior of `___set` to account for the store.
                ___set: function(prop, val) {
                    can.Map.prototype.___set.call(this, prop, val);
                    // If we add or change the ID, update the store accordingly.
                    // TODO: shouldn't this also delete the record from the old ID in the store?
                    if (prop === this.constructor.id && this._bindings) {
                        this.constructor.store[getId(this)] = this;
                    }
                }
            });

        // Returns a function that knows how to prepare data from `findAll` or `findOne` calls.
        // `name` should be either `model` or `models`.
        var makeGetterHandler = function(name) {
            var parseName = "parse" + can.capitalize(name);
            return function(data) {
                // If there's a `parse...` function, use its output.
                if (this[parseName]) {
                    data = this[parseName].apply(this, arguments);
                }
                // Run our maybe-parsed data through `model` or `models`.
                return this[name](data);
            };
        },
            // Handle data returned from `create`, `update`, and `destroy` calls.
            createUpdateDestroyHandler = function(data) {
                if (this.parseModel) {
                    return this.parseModel.apply(this, arguments);
                } else {
                    return this.model(data);
                }
            };

        var responseHandlers = {

            makeFindAll: makeGetterHandler("models"),

            makeFindOne: makeGetterHandler("model"),
            makeCreate: createUpdateDestroyHandler,
            makeUpdate: createUpdateDestroyHandler
        };

        // Go through the response handlers and make the actual "make" methods.
        can.each(responseHandlers, function(method, name) {
            can.Model[name] = function(oldMethod) {
                return function() {
                    var args = can.makeArray(arguments),
                        // If args[1] is a function, we were only passed one argument before success and failure callbacks.
                        oldArgs = can.isFunction(args[1]) ? args.splice(0, 1) : args.splice(0, 2),
                        // Call the AJAX method (`findAll` or `update`, etc.) and pipe it through the response handler from above.
                        def = pipe(oldMethod.apply(this, oldArgs), this, method);

                    def.then(args[0], args[1]);
                    return def;
                };
            };
        });

        // ## can.Model.created, can.Model.updated, and can.Model.destroyed
        // Livecycle methods for models.
        can.each([

                "created",

                "updated",

                "destroyed"
            ], function(funcName) {
                // Each of these is pretty much the same, except for the events they trigger.
                can.Model.prototype[funcName] = function(attrs) {
                    var stub,
                        constructor = this.constructor;

                    // Update attributes if attributes have been passed
                    stub = attrs && typeof attrs === 'object' && this.attr(attrs.attr ? attrs.attr() : attrs);

                    // triggers change event that bubble's like
                    // handler( 'change','1.destroyed' ). This is used
                    // to remove items on destroyed from Model Lists.
                    // but there should be a better way.
                    can.dispatch.call(this, {
                            type: "change",
                            target: this
                        }, [funcName]);



                    // Call event on the instance's Class
                    can.dispatch.call(constructor, funcName, [this]);
                };
            });


        // # can.Model.List
        // Model Lists are just like `Map.List`s except that when their items are
        // destroyed, they automatically get removed from the List.
        var ML = can.Model.List = can.List.extend({
                // ## can.Model.List.setup
                // On change or a nested named event, setup change bubbling.
                // On any other type of event, setup "destroyed" bubbling.
                _bubbleRule: function(eventName, list) {
                    return can.List._bubbleRule(eventName, list) || "destroyed";
                }
            }, {
                setup: function(params) {
                    // If there was a plain object passed to the List constructor,
                    // we use those as parameters for an initial findAll.
                    if (can.isPlainObject(params) && !can.isArray(params)) {
                        can.List.prototype.setup.apply(this);
                        this.replace(can.isDeferred(params) ? params : this.constructor.Map.findAll(params));
                    } else {
                        // Otherwise, set up the list like normal.
                        can.List.prototype.setup.apply(this, arguments);
                    }
                    this._init = 1;
                    this.bind('destroyed', can.proxy(this._destroyed, this));
                    delete this._init;
                },
                _destroyed: function(ev, attr) {
                    if (/\w+/.test(attr)) {
                        var index;
                        while ((index = this.indexOf(ev.target)) > -1) {
                            this.splice(index, 1);
                        }
                    }
                }
            });

        return can.Model;
    })(__m2, __m18, __m22);

    // ## util/string/deparam/deparam.js
    var __m35 = (function(can) {
        // ## deparam.js
        // `can.deparam`
        // _Takes a string of name value pairs and returns a Object literal that represents those params._
        var digitTest = /^\d+$/,
            keyBreaker = /([^\[\]]+)|(\[\])/g,
            paramTest = /([^?#]*)(#.*)?$/,
            prep = function(str) {
                return decodeURIComponent(str.replace(/\+/g, ' '));
            };
        can.extend(can, {
                deparam: function(params) {
                    var data = {}, pairs, lastPart;
                    if (params && paramTest.test(params)) {
                        pairs = params.split('&');
                        can.each(pairs, function(pair) {
                            var parts = pair.split('='),
                                key = prep(parts.shift()),
                                value = prep(parts.join('=')),
                                current = data;
                            if (key) {
                                parts = key.match(keyBreaker);
                                for (var j = 0, l = parts.length - 1; j < l; j++) {
                                    if (!current[parts[j]]) {
                                        // If what we are pointing to looks like an `array`
                                        current[parts[j]] = digitTest.test(parts[j + 1]) || parts[j + 1] === '[]' ? [] : {};
                                    }
                                    current = current[parts[j]];
                                }
                                lastPart = parts.pop();
                                if (lastPart === '[]') {
                                    current.push(value);
                                } else {
                                    current[lastPart] = value;
                                }
                            }
                        });
                    }
                    return data;
                }
            });
        return can;
    })(__m2, __m16);

    // ## route/route.js
    var __m34 = (function(can) {

        // ## route.js
        // `can.route`
        // _Helps manage browser history (and client state) by synchronizing the
        // `window.location.hash` with a `can.Map`._
        // Helper methods used for matching routes.
        var
        // `RegExp` used to match route variables of the type ':name'.
        // Any word character or a period is matched.
        matcher = /\:([\w\.]+)/g,
            // Regular expression for identifying &amp;key=value lists.
            paramsMatcher = /^(?:&[^=]+=[^&]*)+/,
            // Converts a JS Object into a list of parameters that can be
            // inserted into an html element tag.
            makeProps = function(props) {
                var tags = [];
                can.each(props, function(val, name) {
                    tags.push((name === 'className' ? 'class' : name) + '="' +
                        (name === "href" ? val : can.esc(val)) + '"');
                });
                return tags.join(" ");
            },
            // Checks if a route matches the data provided. If any route variable
            // is not present in the data, the route does not match. If all route
            // variables are present in the data, the number of matches is returned
            // to allow discerning between general and more specific routes.
            matchesData = function(route, data) {
                var count = 0,
                    i = 0,
                    defaults = {};
                // look at default values, if they match ...
                for (var name in route.defaults) {
                    if (route.defaults[name] === data[name]) {
                        // mark as matched
                        defaults[name] = 1;
                        count++;
                    }
                }
                for (; i < route.names.length; i++) {
                    if (!data.hasOwnProperty(route.names[i])) {
                        return -1;
                    }
                    if (!defaults[route.names[i]]) {
                        count++;
                    }

                }

                return count;
            },
            location = window.location,
            wrapQuote = function(str) {
                return (str + '')
                    .replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
            },
            each = can.each,
            extend = can.extend,
            // Helper for convert any object (or value) to stringified object (or value)
            stringify = function(obj) {
                // Object is array, plain object, Map or List
                if (obj && typeof obj === "object") {
                    // Get native object or array from Map or List
                    if (obj instanceof can.Map) {
                        obj = obj.attr();
                        // Clone object to prevent change original values
                    } else {
                        obj = can.isFunction(obj.slice) ? obj.slice() : can.extend({}, obj);
                    }
                    // Convert each object property or array item into stringified new
                    can.each(obj, function(val, prop) {
                        obj[prop] = stringify(val);
                    });
                    // Object supports toString function
                } else if (obj !== undefined && obj !== null && can.isFunction(obj.toString)) {
                    obj = obj.toString();
                }

                return obj;
            },
            removeBackslash = function(str) {
                return str.replace(/\\/g, "");
            },
            // A ~~throttled~~ debounced function called multiple times will only fire once the
            // timer runs down. Each call resets the timer.
            timer,
            // Intermediate storage for `can.route.data`.
            curParams,
            // The last hash caused by a data change
            lastHash,
            // Are data changes pending that haven't yet updated the hash
            changingData,
            // If the `can.route.data` changes, update the hash.
            // Using `.serialize()` retrieves the raw data contained in the `observable`.
            // This function is ~~throttled~~ debounced so it only updates once even if multiple values changed.
            // This might be able to use batchNum and avoid this.
            onRouteDataChange = function(ev, attr, how, newval) {
                // indicate that data is changing
                changingData = 1;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    // indicate that the hash is set to look like the data
                    changingData = 0;
                    var serialized = can.route.data.serialize(),
                        path = can.route.param(serialized, true);
                    can.route._call("setURL", path);
                    // trigger a url change so its possible to live-bind on url-based changes
                    can.batch.trigger(eventsObject, "__url", [path, lastHash]);
                    lastHash = path;
                }, 10);
            },
            // A dummy events object used to dispatch url change events on.
            eventsObject = can.extend({}, can.event);

        can.route = function(url, defaults) {
            // if route ends with a / and url starts with a /, remove the leading / of the url
            var root = can.route._call("root");

            if (root.lastIndexOf("/") === root.length - 1 &&
                url.indexOf("/") === 0) {
                url = url.substr(1);
            }

            defaults = defaults || {};
            // Extract the variable names and replace with `RegExp` that will match
            // an atual URL with values.
            var names = [],
                res,
                test = "",
                lastIndex = matcher.lastIndex = 0,
                next,
                querySeparator = can.route._call("querySeparator"),
                matchSlashes = can.route._call("matchSlashes");

            // res will be something like [":foo","foo"]
            while (res = matcher.exec(url)) {
                names.push(res[1]);
                test += removeBackslash(url.substring(lastIndex, matcher.lastIndex - res[0].length));
                // if matchSlashes is false (the default) don't greedily match any slash in the string, assume its part of the URL
                next = "\\" + (removeBackslash(url.substr(matcher.lastIndex, 1)) || querySeparator + (matchSlashes ? "" : "|/"));
                // a name without a default value HAS to have a value
                // a name that has a default value can be empty
                // The `\\` is for string-escaping giving single `\` for `RegExp` escaping.
                test += "([^" + next + "]" + (defaults[res[1]] ? "*" : "+") + ")";
                lastIndex = matcher.lastIndex;
            }
            test += url.substr(lastIndex)
                .replace("\\", "");
            // Add route in a form that can be easily figured out.
            can.route.routes[url] = {
                // A regular expression that will match the route when variable values
                // are present; i.e. for `:page/:type` the `RegExp` is `/([\w\.]*)/([\w\.]*)/` which
                // will match for any value of `:page` and `:type` (word chars or period).
                test: new RegExp("^" + test + "($|" + wrapQuote(querySeparator) + ")"),
                // The original URL, same as the index for this entry in routes.
                route: url,
                // An `array` of all the variable names in this route.
                names: names,
                // Default values provided for the variables.
                defaults: defaults,
                // The number of parts in the URL separated by `/`.
                length: url.split('/')
                    .length
            };
            return can.route;
        };


        extend(can.route, {


                param: function(data, _setRoute) {
                    // Check if the provided data keys match the names in any routes;
                    // Get the one with the most matches.
                    var route,
                        // Need to have at least 1 match.
                        matches = 0,
                        matchCount,
                        routeName = data.route,
                        propCount = 0;

                    delete data.route;

                    each(data, function() {
                        propCount++;
                    });
                    // Otherwise find route.
                    each(can.route.routes, function(temp, name) {
                        // best route is the first with all defaults matching

                        matchCount = matchesData(temp, data);
                        if (matchCount > matches) {
                            route = temp;
                            matches = matchCount;
                        }
                        if (matchCount >= propCount) {
                            return false;
                        }
                    });
                    // If we have a route name in our `can.route` data, and it's
                    // just as good as what currently matches, use that
                    if (can.route.routes[routeName] && matchesData(can.route.routes[routeName], data) === matches) {
                        route = can.route.routes[routeName];
                    }
                    // If this is match...
                    if (route) {
                        var cpy = extend({}, data),
                            // Create the url by replacing the var names with the provided data.
                            // If the default value is found an empty string is inserted.
                            res = route.route.replace(matcher, function(whole, name) {
                                delete cpy[name];
                                return data[name] === route.defaults[name] ? "" : encodeURIComponent(data[name]);
                            })
                                .replace("\\", ""),
                            after;
                        // Remove matching default values
                        each(route.defaults, function(val, name) {
                            if (cpy[name] === val) {
                                delete cpy[name];
                            }
                        });

                        // The remaining elements of data are added as
                        // `&amp;` separated parameters to the url.
                        after = can.param(cpy);
                        // if we are paraming for setting the hash
                        // we also want to make sure the route value is updated
                        if (_setRoute) {
                            can.route.attr('route', route.route);
                        }
                        return res + (after ? can.route._call("querySeparator") + after : "");
                    }
                    // If no route was found, there is no hash URL, only paramters.
                    return can.isEmptyObject(data) ? "" : can.route._call("querySeparator") + can.param(data);
                },

                deparam: function(url) {

                    // remove the url
                    var root = can.route._call("root");
                    if (root.lastIndexOf("/") === root.length - 1 &&
                        url.indexOf("/") === 0) {
                        url = url.substr(1);
                    }

                    // See if the url matches any routes by testing it against the `route.test` `RegExp`.
                    // By comparing the URL length the most specialized route that matches is used.
                    var route = {
                        length: -1
                    },
                        querySeparator = can.route._call("querySeparator"),
                        paramsMatcher = can.route._call("paramsMatcher");

                    each(can.route.routes, function(temp, name) {
                        if (temp.test.test(url) && temp.length > route.length) {
                            route = temp;
                        }
                    });
                    // If a route was matched.
                    if (route.length > -1) {

                        var // Since `RegExp` backreferences are used in `route.test` (parens)
                        // the parts will contain the full matched string and each variable (back-referenced) value.
                        parts = url.match(route.test),
                            // Start will contain the full matched string; parts contain the variable values.
                            start = parts.shift(),
                            // The remainder will be the `&amp;key=value` list at the end of the URL.
                            remainder = url.substr(start.length - (parts[parts.length - 1] === querySeparator ? 1 : 0)),
                            // If there is a remainder and it contains a `&amp;key=value` list deparam it.
                            obj = (remainder && paramsMatcher.test(remainder)) ? can.deparam(remainder.slice(1)) : {};

                        // Add the default values for this route.
                        obj = extend(true, {}, route.defaults, obj);
                        // Overwrite each of the default values in `obj` with those in
                        // parts if that part is not empty.
                        each(parts, function(part, i) {
                            if (part && part !== querySeparator) {
                                obj[route.names[i]] = decodeURIComponent(part);
                            }
                        });
                        obj.route = route.route;
                        return obj;
                    }
                    // If no route was matched, it is parsed as a `&amp;key=value` list.
                    if (url.charAt(0) !== querySeparator) {
                        url = querySeparator + url;
                    }
                    return paramsMatcher.test(url) ? can.deparam(url.slice(1)) : {};
                },

                data: new can.Map({}),
                map: function(data) {
                    var appState;
                    // appState is a can.Map constructor function
                    if (data.prototype instanceof can.Map) {
                        appState = new data();
                    }
                    // appState is an instance of can.Map
                    else {
                        appState = data;
                    }
                    can.route.data = appState;
                },

                routes: {},

                ready: function(val) {
                    if (val !== true) {
                        can.route._setup();
                        can.route.setState();
                    }
                    return can.route;
                },

                url: function(options, merge) {

                    if (merge) {
                        options = can.extend({}, can.route.deparam(can.route._call("matchingPartOfURL")), options);
                    }
                    return can.route._call("root") + can.route.param(options);
                },

                link: function(name, options, props, merge) {
                    return "<a " + makeProps(
                        extend({
                                href: can.route.url(options, merge)
                            }, props)) + ">" + name + "</a>";
                },

                current: function(options) {
                    // "reads" the url so the url is live-bindable.
                    can.__reading(eventsObject, "__url");
                    return this._call("matchingPartOfURL") === can.route.param(options);
                },
                bindings: {
                    hashchange: {
                        paramsMatcher: paramsMatcher,
                        querySeparator: "&",
                        // don't greedily match slashes in routing rules
                        matchSlashes: false,
                        bind: function() {
                            can.bind.call(window, 'hashchange', setState);
                        },
                        unbind: function() {
                            can.unbind.call(window, 'hashchange', setState);
                        },
                        // Gets the part of the url we are determinging the route from.
                        // For hashbased routing, it's everything after the #, for
                        // pushState it's configurable
                        matchingPartOfURL: function() {
                            return location.href.split(/#!?/)[1] || "";
                        },
                        // gets called with the serialized can.route data after a route has changed
                        // returns what the url has been updated to (for matching purposes)
                        setURL: function(path) {
                            location.hash = "#!" + path;
                            return path;
                        },
                        root: "#!"
                    }
                },
                defaultBinding: "hashchange",
                currentBinding: null,
                // ready calls setup
                // setup binds and listens to data changes
                // bind listens to whatever you should be listening to
                // data changes tries to set the path

                // we need to be able to
                // easily kick off calling setState
                // 	teardown whatever is there
                //  turn on a particular binding

                // called when the route is ready
                _setup: function() {
                    if (!can.route.currentBinding) {
                        can.route._call("bind");
                        can.route.bind("change", onRouteDataChange);
                        can.route.currentBinding = can.route.defaultBinding;
                    }
                },
                _teardown: function() {
                    if (can.route.currentBinding) {
                        can.route._call("unbind");
                        can.route.unbind("change", onRouteDataChange);
                        can.route.currentBinding = null;
                    }
                    clearTimeout(timer);
                    changingData = 0;
                },
                // a helper to get stuff from the current or default bindings
                _call: function() {
                    var args = can.makeArray(arguments),
                        prop = args.shift(),
                        binding = can.route.bindings[can.route.currentBinding || can.route.defaultBinding],
                        method = binding[prop];
                    if (method.apply) {
                        return method.apply(binding, args);
                    } else {
                        return method;
                    }
                }
            });

        // The functions in the following list applied to `can.route` (e.g. `can.route.attr('...')`) will
        // instead act on the `can.route.data` observe.
        each(['bind', 'unbind', 'on', 'off', 'delegate', 'undelegate', 'removeAttr', 'compute', '_get', '__get', 'each'], function(name) {
            can.route[name] = function() {
                // `delegate` and `undelegate` require
                // the `can/map/delegate` plugin
                if (!can.route.data[name]) {
                    return;
                }

                return can.route.data[name].apply(can.route.data, arguments);
            };
        });

        // Because everything in hashbang is in fact a string this will automaticaly convert new values to string. Works with single value, or deep hashes.
        // Main motivation for this is to prevent double route event call for same value.
        // Example (the problem):
        // When you load page with hashbang like #!&some_number=2 and bind 'some_number' on routes.
        // It will fire event with adding of "2" (string) to 'some_number' property
        // But when you after this set can.route.attr({some_number: 2}) or can.route.attr('some_number', 2). it fires another event with change of 'some_number' from "2" (string) to 2 (integer)
        // This wont happen again with this normalization
        can.route.attr = function(attr, val) {
            var type = typeof attr,
                newArguments;

            // Reading
            if (val === undefined) {
                newArguments = arguments;
                // Sets object
            } else if (type !== "string" && type !== "number") {
                newArguments = [stringify(attr), val];
                // Sets key - value
            } else {
                newArguments = [attr, stringify(val)];
            }

            return can.route.data.attr.apply(can.route.data, newArguments);
        };

        var // Deparameterizes the portion of the hash of interest and assign the
        // values to the `can.route.data` removing existing values no longer in the hash.
        // setState is called typically by hashchange which fires asynchronously
        // So it's possible that someone started changing the data before the
        // hashchange event fired.  For this reason, it will not set the route data
        // if the data is changing or the hash already matches the hash that was set.
        setState = can.route.setState = function() {
            var hash = can.route._call("matchingPartOfURL");
            var oldParams = curParams;
            curParams = can.route.deparam(hash);

            // if the hash data is currently changing, or
            // the hash is what we set it to anyway, do NOT change the hash
            if (!changingData || hash !== lastHash) {
                can.batch.start();
                for (var attr in oldParams) {
                    if (!curParams[attr]) {
                        can.route.removeAttr(attr);
                    }
                }
                can.route.attr(curParams);
                // trigger a url change so its possible to live-bind on url-based changes
                can.batch.trigger(eventsObject, "__url", [hash, lastHash]);
                can.batch.stop();
            }
        };

        return can.route;
    })(__m2, __m18, __m22, __m35);

    // ## control/route/route.js
    var __m36 = (function(can) {

        // ## control/route.js
        // _Controller route integration._

        can.Control.processors.route = function(el, event, selector, funcName, controller) {
            selector = selector || "";
            if (!can.route.routes[selector]) {
                if (selector[0] === '/') {
                    selector = selector.substring(1);
                }
                can.route(selector);
            }
            var batchNum,
                check = function(ev, attr, how) {
                    if (can.route.attr('route') === (selector) &&
                        (ev.batchNum === undefined || ev.batchNum !== batchNum)) {

                        batchNum = ev.batchNum;

                        var d = can.route.attr();
                        delete d.route;
                        if (can.isFunction(controller[funcName])) {
                            controller[funcName](d);
                        } else {
                            controller[controller[funcName]](d);
                        }

                    }
                };
            can.route.bind('change', check);
            return function() {
                can.route.unbind('change', check);
            };
        };

        return can;
    })(__m2, __m34, __m14);

    window['can'] = __m3;

    return __m3;
// })();
});
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.3
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specified layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 * @param {Object} options The options to override the defaults
 */
function FastClick(layer, options) {
	
	var oldOnClick;

	options = options || {};

	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = options.touchBoundary || 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	/**
	 * The minimum time between tap(touchstart and touchend) events
	 *
	 * @type number
	 */
	this.tapDelay = options.tapDelay || 200;

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Some old versions of Android don't have Function.prototype.bind
	function bind(method, context) {
		return function() { return method.apply(context, arguments); };
	}


	var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
	var context = this;
	for (var i = 0, l = methods.length; i < l; i++) {
		context[methods[i]] = bind(context[methods[i]], context);
	}

	// Set up event handlers as required
	if (deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);

/**
 * BlackBerry requires exceptions.
 *
 * @type boolean
 */
var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
		return true;
	case 'select':
		return !deviceIsAndroid;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
	

	//Issue #159: Android Chrome Select Box does not open with a synthetic click event
	if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}

	return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	
	var length;

	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
			// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
			// random integers, it's safe to to continue if the identifier is 0 here.
			if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
		this.cancelNextClick = true;
		return true;
	}

	// Reset to prevent wrong click cancel on input (issue #156).
	this.cancelNextClick = false;

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);
		this.sendClick(targetElement, event);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
		if (!deviceIsIOS || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (deviceIsIOS && !deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	
	var layer = this.layer;

	if (deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	
	var metaViewport;
	var chromeVersion;
	var blackberryVersion;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	// Chrome version - zero for other browsers
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	if (chromeVersion) {

		if (deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');

			if (metaViewport) {
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// Chrome 32 and above with width=device-width or less don't need FastClick
				if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
					return true;
				}
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	if (deviceIsBlackBerry10) {
		blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

		// BlackBerry 10.3+ does not require Fastclick library.
		// https://github.com/ftlabs/fastclick/issues/251
		if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
			metaViewport = document.querySelector('meta[name=viewport]');

			if (metaViewport) {
				// user-scalable=no eliminates click delay.
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// width=device-width (or less than device-width) eliminates click delay.
				if (document.documentElement.scrollWidth <= window.outerWidth) {
					return true;
				}
			}
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 * @param {Object} options The options to override the defaults
 */
FastClick.attach = function(layer, options) {
	
	return new FastClick(layer, options);
};


if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {

	// AMD. Register as an anonymous module.
	define('fastclick',[],function() {
		
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}
;
// Zepto.cookie plugin
// 
// Copyright (c) 2010, 2012 
// @author Klaus Hartl (stilbuero.de)
// @author Daniel Lacy (daniellacy.com)
// 
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
;(function($){
    $.extend($.fn, {
        cookie : function (key, value, options) {
            var days, time, result, decode

            // A key and value were given. Set cookie.
            if (arguments.length > 1 && String(value) !== "[object Object]") {
                // Enforce object
                options = $.extend({}, options)

                if (value === null || value === undefined) options.expires = -1

                if (typeof options.expires === 'number') {
                    days = (options.expires * 24 * 60 * 60 * 1000)
                    time = options.expires = new Date()

                    time.setTime(time.getTime() + days)
                }

                value = String(value)

                return (document.cookie = [
                    encodeURIComponent(key), '=',
                    options.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '',
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''))
            }

            // Key and possibly options given, get cookie
            options = value || {}

            decode = options.raw ? function (s) { return s } : decodeURIComponent

            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
        }

    })
})(Zepto)
;
define("zepto.cookie", ["zepto"], function(){});

//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
//# sourceMappingURL=underscore-min.map;
!function(e,n){function r(e,n){var r,t,u=e.toLowerCase();for(n=[].concat(n),r=0;r<n.length;r+=1)if(t=n[r]){if(t.test&&t.test(e))return!0;if(t.toLowerCase()===u)return!0}}var t=n.prototype.trim,u=n.prototype.trimRight,i=n.prototype.trimLeft,l=function(e){return 1*e||0},o=function(e,n){if(1>n)return"";for(var r="";n>0;)1&n&&(r+=e),n>>=1,e+=e;return r},a=[].slice,c=function(e){return null==e?"\\s":e.source?e.source:"["+g.escapeRegExp(e)+"]"},s={lt:"<",gt:">",quot:'"',amp:"&",apos:"'"},f={};for(var p in s)f[s[p]]=p;f["'"]="#39";var h=function(){function e(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}var r=o,t=function(){return t.cache.hasOwnProperty(arguments[0])||(t.cache[arguments[0]]=t.parse(arguments[0])),t.format.call(null,t.cache[arguments[0]],arguments)};return t.format=function(t,u){var i,l,o,a,c,s,f,p=1,g=t.length,d="",m=[];for(l=0;g>l;l++)if(d=e(t[l]),"string"===d)m.push(t[l]);else if("array"===d){if(a=t[l],a[2])for(i=u[p],o=0;o<a[2].length;o++){if(!i.hasOwnProperty(a[2][o]))throw new Error(h('[_.sprintf] property "%s" does not exist',a[2][o]));i=i[a[2][o]]}else i=a[1]?u[a[1]]:u[p++];if(/[^s]/.test(a[8])&&"number"!=e(i))throw new Error(h("[_.sprintf] expecting number but found %s",e(i)));switch(a[8]){case"b":i=i.toString(2);break;case"c":i=n.fromCharCode(i);break;case"d":i=parseInt(i,10);break;case"e":i=a[7]?i.toExponential(a[7]):i.toExponential();break;case"f":i=a[7]?parseFloat(i).toFixed(a[7]):parseFloat(i);break;case"o":i=i.toString(8);break;case"s":i=(i=n(i))&&a[7]?i.substring(0,a[7]):i;break;case"u":i=Math.abs(i);break;case"x":i=i.toString(16);break;case"X":i=i.toString(16).toUpperCase()}i=/[def]/.test(a[8])&&a[3]&&i>=0?"+"+i:i,s=a[4]?"0"==a[4]?"0":a[4].charAt(1):" ",f=a[6]-n(i).length,c=a[6]?r(s,f):"",m.push(a[5]?i+c:c+i)}return m.join("")},t.cache={},t.parse=function(e){for(var n=e,r=[],t=[],u=0;n;){if(null!==(r=/^[^\x25]+/.exec(n)))t.push(r[0]);else if(null!==(r=/^\x25{2}/.exec(n)))t.push("%");else{if(null===(r=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(n)))throw new Error("[_.sprintf] huh?");if(r[2]){u|=1;var i=[],l=r[2],o=[];if(null===(o=/^([a-z_][a-z_\d]*)/i.exec(l)))throw new Error("[_.sprintf] huh?");for(i.push(o[1]);""!==(l=l.substring(o[0].length));)if(null!==(o=/^\.([a-z_][a-z_\d]*)/i.exec(l)))i.push(o[1]);else{if(null===(o=/^\[(\d+)\]/.exec(l)))throw new Error("[_.sprintf] huh?");i.push(o[1])}r[2]=i}else u|=2;if(3===u)throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");t.push(r)}n=n.substring(r[0].length)}return t},t}(),g={VERSION:"2.4.0",isBlank:function(e){return null==e&&(e=""),/^\s*$/.test(e)},stripTags:function(e){return null==e?"":n(e).replace(/<\/?[^>]+>/g,"")},capitalize:function(e){return e=null==e?"":n(e),e.charAt(0).toUpperCase()+e.slice(1)},chop:function(e,r){return null==e?[]:(e=n(e),r=~~r,r>0?e.match(new RegExp(".{1,"+r+"}","g")):[e])},clean:function(e){return g.strip(e).replace(/\s+/g," ")},count:function(e,r){if(null==e||null==r)return 0;e=n(e),r=n(r);for(var t=0,u=0,i=r.length;;){if(u=e.indexOf(r,u),-1===u)break;t++,u+=i}return t},chars:function(e){return null==e?[]:n(e).split("")},swapCase:function(e){return null==e?"":n(e).replace(/\S/g,function(e){return e===e.toUpperCase()?e.toLowerCase():e.toUpperCase()})},escapeHTML:function(e){return null==e?"":n(e).replace(/[&<>"']/g,function(e){return"&"+f[e]+";"})},unescapeHTML:function(e){return null==e?"":n(e).replace(/\&([^;]+);/g,function(e,r){var t;return r in s?s[r]:(t=r.match(/^#x([\da-fA-F]+)$/))?n.fromCharCode(parseInt(t[1],16)):(t=r.match(/^#(\d+)$/))?n.fromCharCode(~~t[1]):e})},escapeRegExp:function(e){return null==e?"":n(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")},splice:function(e,n,r,t){var u=g.chars(e);return u.splice(~~n,~~r,t),u.join("")},insert:function(e,n,r){return g.splice(e,n,0,r)},include:function(e,r){return""===r?!0:null==e?!1:-1!==n(e).indexOf(r)},join:function(){var e=a.call(arguments),n=e.shift();return null==n&&(n=""),e.join(n)},lines:function(e){return null==e?[]:n(e).split("\n")},reverse:function(e){return g.chars(e).reverse().join("")},startsWith:function(e,r){return""===r?!0:null==e||null==r?!1:(e=n(e),r=n(r),e.length>=r.length&&e.slice(0,r.length)===r)},endsWith:function(e,r){return""===r?!0:null==e||null==r?!1:(e=n(e),r=n(r),e.length>=r.length&&e.slice(e.length-r.length)===r)},succ:function(e){return null==e?"":(e=n(e),e.slice(0,-1)+n.fromCharCode(e.charCodeAt(e.length-1)+1))},titleize:function(e){return null==e?"":(e=n(e).toLowerCase(),e.replace(/(?:^|\s|-)\S/g,function(e){return e.toUpperCase()}))},camelize:function(e){return g.trim(e).replace(/[-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""})},underscored:function(e){return g.trim(e).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase()},dasherize:function(e){return g.trim(e).replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase()},classify:function(e){return g.capitalize(g.camelize(n(e).replace(/[\W_]/g," ")).replace(/\s/g,""))},humanize:function(e){return g.capitalize(g.underscored(e).replace(/_id$/,"").replace(/_/g," "))},trim:function(e,r){return null==e?"":!r&&t?t.call(e):(r=c(r),n(e).replace(new RegExp("^"+r+"+|"+r+"+$","g"),""))},ltrim:function(e,r){return null==e?"":!r&&i?i.call(e):(r=c(r),n(e).replace(new RegExp("^"+r+"+"),""))},rtrim:function(e,r){return null==e?"":!r&&u?u.call(e):(r=c(r),n(e).replace(new RegExp(r+"+$"),""))},truncate:function(e,r,t){return null==e?"":(e=n(e),t=t||"...",r=~~r,e.length>r?e.slice(0,r)+t:e)},prune:function(e,r,t){if(null==e)return"";if(e=n(e),r=~~r,t=null!=t?n(t):"...",e.length<=r)return e;var u=function(e){return e.toUpperCase()!==e.toLowerCase()?"A":" "},i=e.slice(0,r+1).replace(/.(?=\W*\w*$)/g,u);return i=i.slice(i.length-2).match(/\w\w/)?i.replace(/\s*\S+$/,""):g.rtrim(i.slice(0,i.length-1)),(i+t).length>e.length?e:e.slice(0,i.length)+t},words:function(e,n){return g.isBlank(e)?[]:g.trim(e,n).split(n||/\s+/)},pad:function(e,r,t,u){e=null==e?"":n(e),r=~~r;var i=0;switch(t?t.length>1&&(t=t.charAt(0)):t=" ",u){case"right":return i=r-e.length,e+o(t,i);case"both":return i=r-e.length,o(t,Math.ceil(i/2))+e+o(t,Math.floor(i/2));default:return i=r-e.length,o(t,i)+e}},lpad:function(e,n,r){return g.pad(e,n,r)},rpad:function(e,n,r){return g.pad(e,n,r,"right")},lrpad:function(e,n,r){return g.pad(e,n,r,"both")},sprintf:h,vsprintf:function(e,n){return n.unshift(e),h.apply(null,n)},toNumber:function(e,n){return e?(e=g.trim(e),e.match(/^-?\d+(?:\.\d+)?$/)?l(l(e).toFixed(~~n)):0/0):0},numberFormat:function(e,n,r,t){if(isNaN(e)||null==e)return"";e=e.toFixed(~~n),t="string"==typeof t?t:",";var u=e.split("."),i=u[0],l=u[1]?(r||".")+u[1]:"";return i.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+t)+l},strRight:function(e,r){if(null==e)return"";e=n(e),r=null!=r?n(r):r;var t=r?e.indexOf(r):-1;return~t?e.slice(t+r.length,e.length):e},strRightBack:function(e,r){if(null==e)return"";e=n(e),r=null!=r?n(r):r;var t=r?e.lastIndexOf(r):-1;return~t?e.slice(t+r.length,e.length):e},strLeft:function(e,r){if(null==e)return"";e=n(e),r=null!=r?n(r):r;var t=r?e.indexOf(r):-1;return~t?e.slice(0,t):e},strLeftBack:function(e,n){if(null==e)return"";e+="",n=null!=n?""+n:n;var r=e.lastIndexOf(n);return~r?e.slice(0,r):e},toSentence:function(e,n,r,t){n=n||", ",r=r||" and ";var u=e.slice(),i=u.pop();return e.length>2&&t&&(r=g.rtrim(n)+r),u.length?u.join(n)+r+i:i},toSentenceSerial:function(){var e=a.call(arguments);return e[3]=!0,g.toSentence.apply(g,e)},slugify:function(e){if(null==e)return"";var r="ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",t="aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",u=new RegExp(c(r),"g");return e=n(e).toLowerCase().replace(u,function(e){var n=r.indexOf(e);return t.charAt(n)||"-"}),g.dasherize(e.replace(/[^\w\s-]/g,""))},surround:function(e,n){return[n,e,n].join("")},quote:function(e,n){return g.surround(e,n||'"')},unquote:function(e,n){return n=n||'"',e[0]===n&&e[e.length-1]===n?e.slice(1,e.length-1):e},exports:function(){var e={};for(var n in this)this.hasOwnProperty(n)&&!n.match(/^(?:include|contains|reverse)$/)&&(e[n]=this[n]);return e},repeat:function(e,r,t){if(null==e)return"";if(r=~~r,null==t)return o(n(e),r);for(var u=[];r>0;u[--r]=e);return u.join(t)},naturalCmp:function(e,r){if(e==r)return 0;if(!e)return-1;if(!r)return 1;for(var t=/(\.\d+)|(\d+)|(\D+)/g,u=n(e).toLowerCase().match(t),i=n(r).toLowerCase().match(t),l=Math.min(u.length,i.length),o=0;l>o;o++){var a=u[o],c=i[o];if(a!==c){var s=parseInt(a,10);if(!isNaN(s)){var f=parseInt(c,10);if(!isNaN(f)&&s-f)return s-f}return c>a?-1:1}}return u.length===i.length?u.length-i.length:r>e?-1:1},levenshtein:function(e,r){if(null==e&&null==r)return 0;if(null==e)return n(r).length;if(null==r)return n(e).length;e=n(e),r=n(r);for(var t,u,i=[],l=0;l<=r.length;l++)for(var o=0;o<=e.length;o++)u=l&&o?e.charAt(o-1)===r.charAt(l-1)?t:Math.min(i[o],i[o-1],t)+1:l+o,t=i[o],i[o]=u;return i.pop()},toBoolean:function(e,n,t){return"number"==typeof e&&(e=""+e),"string"!=typeof e?!!e:(e=g.trim(e),r(e,n||["true","1"])?!0:r(e,t||["false","0"])?!1:void 0)}};g.strip=g.trim,g.lstrip=g.ltrim,g.rstrip=g.rtrim,g.center=g.lrpad,g.rjust=g.lpad,g.ljust=g.rpad,g.contains=g.include,g.q=g.quote,g.toBool=g.toBoolean,"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(module.exports=g),exports._s=g),"function"==typeof define&&define.amd&&define("underscore.string",[],function(){return g}),e._=e._||{},e._.string=e._.str=g}(this,String);
!function(a){function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define('md5',[],function(){return t}):a.md5=t}(this);
;(function(win){
	var store = {},
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage

	store.disabled = false
	store.version = '1.3.17'
	store.set = function(key, value) {}
	store.get = function(key, defaultVal) {}
	store.has = function(key) { return store.get(key) !== undefined }
	store.remove = function(key) {}
	store.clear = function() {}
	store.transact = function(key, defaultVal, transactionFn) {
		if (transactionFn == null) {
			transactionFn = defaultVal
			defaultVal = null
		}
		if (defaultVal == null) {
			defaultVal = {}
		}
		var val = store.get(key, defaultVal)
		transactionFn(val)
		store.set(key, val)
	}
	store.getAll = function() {}
	store.forEach = function() {}

	store.serialize = function(value) {
		return JSON.stringify(value)
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined }
		try { return JSON.parse(value) }
		catch(e) { return value || undefined }
	}

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]) }
		catch(err) { return false }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName]
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key) }
			storage.setItem(key, store.serialize(val))
			return val
		}
		store.get = function(key, defaultVal) {
			var val = store.deserialize(storage.getItem(key))
			return (val === undefined ? defaultVal : val)
		}
		store.remove = function(key) { storage.removeItem(key) }
		store.clear = function() { storage.clear() }
		store.getAll = function() {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i)
				callback(key, store.get(key))
			}
		}
	} else if (doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer
		// Since #userData storage applies only to specific paths, we need to
		// somehow link our data to a specific path.  We choose /favicon.ico
		// as a pretty safe option, since all browsers already make a request to
		// this URL anyway and being a 404 will not hurt us here.  We wrap an
		// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
		// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
		// since the iframe access rules appear to allow direct access and
		// manipulation of the document element, even for a 404 page.  This
		// document can be used instead of the current document (which would
		// have been limited to the current path) to perform #userData storage.
		try {
			storageContainer = new ActiveXObject('htmlfile')
			storageContainer.open()
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
			storageContainer.close()
			storageOwner = storageContainer.w.frames[0].document
			storage = storageOwner.createElement('div')
		} catch(e) {
			// somehow ActiveXObject instantiation failed (perhaps some special
			// security settings or otherwse), fall back to per-path storage
			storage = doc.createElement('div')
			storageOwner = doc.body
		}
		var withIEStorage = function(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0)
				args.unshift(storage)
				// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
				// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
				storageOwner.appendChild(storage)
				storage.addBehavior('#default#userData')
				storage.load(localStorageName)
				var result = storeFunction.apply(store, args)
				storageOwner.removeChild(storage)
				return result
			}
		}

		// In IE7, keys cannot start with a digit or contain certain chars.
		// See https://github.com/marcuswestin/store.js/issues/40
		// See https://github.com/marcuswestin/store.js/issues/83
		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
		function ieKeyFix(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key)
			if (val === undefined) { return store.remove(key) }
			storage.setAttribute(key, store.serialize(val))
			storage.save(localStorageName)
			return val
		})
		store.get = withIEStorage(function(storage, key, defaultVal) {
			key = ieKeyFix(key)
			var val = store.deserialize(storage.getAttribute(key))
			return (val === undefined ? defaultVal : val)
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			storage.removeAttribute(key)
			storage.save(localStorageName)
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes
			storage.load(localStorageName)
			for (var i=0, attr; attr=attributes[i]; i++) {
				storage.removeAttribute(attr.name)
			}
			storage.save(localStorageName)
		})
		store.getAll = function(storage) {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
			}
		})
	}

	try {
		var testKey = '__storejs__'
		store.set(testKey, testKey)
		if (store.get(testKey) != testKey) { store.disabled = true }
		store.remove(testKey)
	} catch(e) {
		store.disabled = true
	}
	store.enabled = !store.disabled

	if (typeof module != 'undefined' && module.exports && this.module !== module) { module.exports = store }
	else if (typeof define === 'function' && define.amd) { define('store',store) }
	else { win.store = store }

})(Function('return this')());

define('sf.b2c.mall.api.security.type',[],function(){
  

  return {
    UserLogin: {
      name: 'UserLogin',
      code: 0x2000
    },
    RegisteredDevice: {
      name: 'RegisteredDevice',
      code: 0x0100
    },
    None: {
      name: 'None',
      code: 0
    }
  };
});
/**
 * @class sf.b2c.mall.framework.adapter
 * @description adapter基类
 * @param  {Object} can
 * @param  {Object} _   underscore
 * @return {can.Map}
 */
define('sf.b2c.mall.framework.adapter',['can', 'underscore'], function (can, _) {
  

  return can.Map.extend({

    /**
     * @function sf.b2c.mall.framework.adapter.format
     * @description 对传输进来的数据进行格式化
     */
    format: function () {
      throw new Error('使用前必须被复写');
    },

    /**
     * @function sf.b2c.mall.framework.adapter.empty
     * @description 清空现在的attrs
     */
    empty: function () {
      var handler = _.bind(function (value, key) {
        this.removeAttr(key);
      }, this);
      this.each(handler);
    },

    /**
     * @function sf.b2c.mall.framework.adapter.replace
     * @description 清空现在的attrs之后设置
     * @param  {Map} attrs 需要设置的熟悉
     */
    replace: function (attrs) {
      this.empty();
      this.attr(attrs);
    }

  });

});


/**
 * @author jiyanliang|weizhiqiang
 * @class sf.b2c.mall.framework.comm
 * @description comm通信基类
 */
define('sf.b2c.mall.framework.comm',[
    'zepto',
    'zepto.cookie',
    'can',
    'underscore',
    'md5',
    'store',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.security.type'
  ],

  function($, cookie, can, _, md5, store, SFBizConfig, SecurityType) {

    var ERROR_CODE_TOKEN_ERROR = -360;
    var ERROR_CODE_TOKEN_EXPIRE = -300;
    var ERROR_CODE_SIGNATURE_ERROR = -180;
    var ERROR_CODE_ACCESS_DENIED = -160;

    var TOKEN_AND_SIGNATURE_ERROR_GROUP = [
      ERROR_CODE_TOKEN_ERROR,
      ERROR_CODE_TOKEN_EXPIRE,
      ERROR_CODE_SIGNATURE_ERROR,
      ERROR_CODE_ACCESS_DENIED
    ];

    var SFBaseComm = can.Construct.extend({

      /**
       * api的定义需要被每个子类复写
       * @type {Object}
       */
      api: {},

      /**
       * @function sf.b2c.mall.framework.comm.buildRequestData
       * @description 通过与定义的API接口和用户通过this.data传入的参数构建向服务端发起请求需要用到的数据
       * @return {Object} 向服务端提交的数据结构
       */
      buildRequestData: function() {
        if (this.api) {
          var requestData = {};

          // 添加每个请求的_mt参数
          _.extend(requestData, {
            '_mt': this.api.METHOD_NAME
          });

          // 提供公共参数
          _.extend(requestData, this.api.COMMON);

          var key;
          // 添加必填参数
          for (key in this.api.REQUIRED) {
            requestData[key] = this.data[key];
          }

          // 添加选填参数
          for (key in this.api.OPTIONAL) {
            requestData[key] = this.data[key];
          }

          return requestData;
        }
      },

      /**
       * @override
       * @function sf.b2c.mall.framework.comm.init
       * @description 初始化方法
       * @param  {Object} data 传入的涌来提交服务端的数据
       */
      init: function(data) {
        this.setData(data);
      },

      /**
       * @function sf.b2c.mall.framework.setData
       * @description 修改请求参数
       */
      setData: function (data) {
        this.data = data;
      },

      /**
       * @function sf.b2c.mall.framework.sendRequest
       * @description 构建请求
       * @param {boolean} isForceUserLogin 是否需要强制用户登录
       * @return {Object} can.Deferred
       */
      sendRequest: function(isForceUserLogin) {

        //step1 调用子业务类进行数据校验
        var checkResult = this.validate(isForceUserLogin);

        if (checkResult !== true) {
          return checkResult;
        }

        //step2 构建ajax请求数据，放到baseCommon的全局变量中，可以支持多个请求一起发送
        var requestData = this.buildRequestData();

        //step3 发送请求,获得返回数据
        return this.request(requestData, isForceUserLogin);
      },

      /**
       * @function sf.b2c.framework.comm.validate
       * @description 根据用户SecurityType进行检验，同时也会检验比天字段是否写入
       * @returns {Error|Boolean} 错误对象|验证成功
       */
      validate: function(isForceUserLogin) {
        // 检查必填字段，如果没有必填字段直接抛错
        if (this.api) {
          if (!this.api.METHOD_NAME) return '缺少_mt';

          for (var key in this.api.REQUIRED) {
            if (!_.has(this.data, key)) {
              return new Error('缺少必填字段' + key);
            }
          }
        }

        //根据action校验是否登录
        if (this.api.SECURITY_TYPE === SecurityType.UserLogin.name) {
          if (!this.checkUserLogin()) {
            if (isForceUserLogin) {
              this.goToLogin();
            }else{
              return new Error('该请求需要在登录后发起');
            }
          }
        }

        return true;
      },

      /**
       * @function sf.b2c.mall.framework.checkUserLogin
       * @description 检查用户是否登陆
       * @return {Boolean} 用户是否登陆
       */
      checkUserLogin: function() {
        // var csrf = window.localStorage ? window.localStorage.getItem('csrfToken') : $.jStorage.get('csrfToken');
        var csrf = store.get('csrfToken');
        return !!($.cookie(SFBaseComm._aid + '_ct') && csrf);
      },

      /**
       * @function sf.b2c.mall.framework.goToLogin
       * @description 跳转到登陆
       */
      goToLogin: function() {
        // 获取现在的pathname作为跳转的from依据
        var path = window.location.pathname;
        if (path !== SFBizConfig.setting.login) {
          window.location.href = SFBizConfig.setting.login + '?from' + path;
        }
      },

      /**
       * @function sf.b2c.mall.framework.comm.access
       * @description 返回的参数是否正确
       * @param  {Map}      response          服务端返回的信息
       * @param  {Boolean}  isForceUserLogin  是否需要强制登陆
       */
      access: function(response, isForceUserLogin) {
        if (response.stat.code === 0 && response.content[0] && response.stat.stateList[0].code === 0) {
          return true;
        } else if (_.contains(TOKEN_AND_SIGNATURE_ERROR_GROUP, response.stat.code) && isForceUserLogin) {
          this.goToLogin();
        } else {
          return false;
        }
      },

      /**
       * @function sf.b2c.mall.framework.comm.encrypt
       * @param  {Map}    params      需要加密的参数
       * @param  {String} appendWord  加言
       */
      encrypt: function(params, appendWord) {
        var arr = [];

        // 将Map变成Array，使用key=value的方式进行拼接
        _.each(params, function(value, key) {
          arr.push(key + '=' + value);
        });

        // 以ascii进行排序
        arr.sort();

        // 将队列拼接成String
        var str = arr.join('');
        str = str + appendWord;

        // 做md5加密
        return md5(str);
      },

      /**
       * @function sf.b2c.mall.framework.comm.sign
       * @param  {Map}      params           参与请求签名的实体
       * @param  {Boolean}  isForceUserLogin 是否需要强制登陆
       */
      sign: function(params, isForceUserLogin) {
        var map = {
          'None': function(data, force) {
            return _.extend(data, {
              _sig: this.encrypt(data, SFBizConfig.setting['none_append_word'])
            });
          },

          'RegisteredDevice': function(data, force) {
            return _.extend(data, {
              _sig: this.encrypt(data, SFBizConfig.setting['none_append_word'])
            });
          },

          'UserLogin': function(data, force) {
            // var csrf = window.localStorage ? window.localStorage.getItem('csrfToken') : $.jStorage.get('csrfToken');
            var csrf = store.get('csrfToken');

            if (csrf) {
              return _.extend(data, {
                _sig: this.encrypt(data, csrf)
              });
            } else {
              this.goToLogin();
            }
          }
        };

        if (_.isFunction(map[this.api.SECURITY_TYPE])) {
          // 过滤所有的undefined和null的数据
          _.each(params, function(value, key, list) {
            if (_.isUndefined(value) || _.isNull(value)) {
              delete params[key];
            }
          });

          // 将参数附加上必须要传递的标记
          var required = _.extend(params, SFBizConfig.setting['default_header']);
          required = _.extend(required, {_aid: SFBaseComm._aid});

          // 做加密生产_sig对象
          var _sig = map[this.api.SECURITY_TYPE].call(this, required, isForceUserLogin);

          // 返回数据可以直接做请求
          return _.extend(required, _sig);
        } else {
          return params;
        }
      },

      /**
       * @function sf.b2c.mall.framework.request
       * @param  {Map}     data             请求参数
       * @param  {Boolean} isForceUserLogin 是否需要强制登陆
       * @return {can.Deferred}
       */
      request: function(data, isForceUserLogin) {
        var def = can.Deferred();

        var that = this;
        can.ajax({
          url: SFBizConfig.setting.api.url,
          type: 'post',
          data: that.sign(data)
        })
        .done(function(response) {
          if (response && response.stat) {
            that.serverTime = response.stat.systime;
          }

          if (that.access(response, isForceUserLogin)) {
            that.afterRequest(data._mt, response.content[0]);
            def.resolve(response.content[0]);
          } else {
            if (response.stat.stateList.length == 0) {
              def.reject(response.stat.code);
            } else {
              def.reject(response.stat.stateList[0].code);
            }
          }
        })
        .fail(function(error) {
          def.reject(error);
        });

        return def;
      },

      /**
       * @description 通过服务端接口每次从stat中返回的system在客户端中保留服务端时间
       * @return {Int} 服务端时间的时间戳
       */
      getServerTime: function () {
        return this.serverTime;
      },

      /**
       * @description 请求后处理回调
       * @function sf.b2c.mall.framework.comm.afterRequest
       * @param  {String} mt
       * @param  {Map} response
       */
      afterRequest: function(mt, response) {
        var map = {
          'user.webLogin': function(response) {

            store.set('csrfToken', response.csrfToken);

            // if (window.localStorage) {
            //   window.localStorage.setItem('csrfToken', response.csrfToken);
            // } else {
            //   $.jStorage.set('csrfToken', response.csrfToken);
            // }
          }
        };

        if (_.isFunction(map[mt])) {
          map[mt].call(this, response);
        }
      },

      /**
       * @description 调用简单的ajax请求
       * @param  {Map} data 请求$.ajaxSetting
       * @return {Object} can.Deferred
       */
      ajax: function(data) {
        return can.ajax(data);
      }
    });

    SFBaseComm.register = function (aid) {
      this._aid = aid;
    }

    return SFBaseComm;
  });


/**
 * @class sf.b2c.mall.framework.multiple.comm
 * @description comm的合并通信
 * @example
 *
 * ```
 * var webLogin = new SFUserWebLogin(utils.testData.user4Login);
 *
 *     webLogin
 *       .sendRequest()
 *       .done(function(loginResult) {
 *       })
 *       .fail(function(errorCode) {
 *         errorCode.should.equal(0);
 *         done();
 *       })
 *       .then(function(loginResult) {
 *         request_a = new SFGetSKUInfo({sku: 1});
 *         request_b = new SFGetUserInfo();
 *
 *         var mComm = new SFFrameworkMultipleComm([request_a, request_b]);
 *         mComm.setData([request_a.data, request_b.data]);
 *         return mComm.sendRequest();
 *       })
 *       .done(function(message) {
 *         console.log(message)
 *         message.length.should.equal(2)
 *         message[0].skuId.should.equal('1')
 *         message[1].mailId.should.equal(utils.testData.user4Login.accountId)
 *         done();
 *       })
 *       .fail(function(stat) {
 *         for(var i in stat.stateList){
 *           stat.stateList[i].code.should.equal(0);
 *         }
 *         done();
 *       })
 * ```
 */

define(
  'sf.b2c.mall.framework.multiple.comm',[
    'underscore',
    'sf.b2c.mall.framework.comm',
    'sf.b2c.mall.business.config',
    'sf.b2c.mall.api.security.type'
  ],
  function ( _, SFComm, SFBizConfig, SecurityType) {

    var ERROR_CODE_TOKEN_ERROR = -360;
    var ERROR_CODE_TOKEN_EXPIRE = -300;
    var ERROR_CODE_SIGNATURE_ERROR = -180;
    var ERROR_CODE_ACCESS_DENIED = -160;

    var TOKEN_AND_SIGNATURE_ERROR_GROUP = [
      ERROR_CODE_TOKEN_ERROR,
      ERROR_CODE_TOKEN_EXPIRE,
      ERROR_CODE_SIGNATURE_ERROR,
      ERROR_CODE_ACCESS_DENIED
    ];

    return SFComm.extend({

      /**
       * @override
       * @function sf.b2c.mall.framework.multiple.comm.init
       * @description 在init方法中传入comm的队列
       * @param  {List<Comm>} comms comms 需要合并的接口Array
       */
      init: function (comms) {
        this.buildApi(comms);
      },

      /**
       * @function sf.b2c.mall.framework.multiple.comm.buildApi
       * @description 为multiple创建api对象
       * @param  {List<Comm>} comms 需要合并的接口Array
       */
      buildApi: function (comms) {
        var apis = _.pluck(comms, 'api');

        // 拼接_mt字段饿方法请求
        var _mt_arr = _.pluck(apis, 'METHOD_NAME');
        this.api.METHOD_NAME = _mt_arr.join(',');

        // 获取SecurityType
        var securityType = {
          code: -1,
          name: null
        };
        _.each(apis, function(api){
          var st = SecurityType[api.SECURITY_TYPE];
          if (st.code > securityType.code) {
            securityType = st;
          }
        });
        this.api.SECURITY_TYPE = securityType.name;

        // 设置Data
        this.api.REQUIRED = _.pluck(apis, 'REQUIRED');
        this.api.OPTIONAL = _.pluck(apis, 'OPTIONAL');
      },

      /**
       * @override
       * @function sf.b2c.mall.framework.multiple.comm.buildRequestData
       * @description 对multiple的comms做数据处理
       */
      buildRequestData: function () {
        if (this.api) {
          var requestData = {};

          _.extend(requestData, {
            '_mt': this.api.METHOD_NAME
          });

          _.extend(requestData, this.api.COMMON);

          var that = this;

          var key;
          _.each(this.api.REQUIRED, function(apis, index){
            for (key in that.api.REQUIRED[index]) {
              requestData[index + '_' + key] = that.data[index][key];
            }
          });

          _.each(this.api.OPTIONAL, function(apis, index){
            for (key in that.api.OPTIONAL[index]) {
              requestData[index + '_' + key] = that.data[index][key];
            }
          });

          return requestData;
        }
      },

      /**
       * @override
       * @function sf.b2c.mall.framework.multiple.comm.access
       * @description 返回的参数是否正确
       * @param  {Map}      response          服务端返回的信息
       * @param  {Boolean}  isForceUserLogin  是否需要强制登陆
       */
      access: function(responses, isForceUserLogin) {
        if (_.isArray(responses.content)) {
          var that = this;
          var result = true;
          _.each(responses.content, function(response, index){
            result = result && that._access(responses, index, isForceUserLogin);
          });
          return result;
        }else{
          return this._access(responses, 0, isForceUserLogin);
        }
      },

      _access: function (response, index, isForceUserLogin) {
        if (response.stat.code === 0 && response.content[index] && response.stat.stateList[index].code === 0) {
          return true;
        } else if (_.contains(TOKEN_AND_SIGNATURE_ERROR_GROUP, response.stat.code) && isForceUserLogin) {
          this.goToLogin();
        } else {
          return false;
        }
      },

      /**
       * @function sf.b2c.mall.framework.request
       * @param  {Map}     data             请求参数
       * @param  {Boolean} isForceUserLogin 是否需要强制登陆
       * @return {can.Deferred}
       */
      request: function(data, isForceUserLogin) {
        var def = can.Deferred();

        var that = this;
        can.ajax({
          url: SFBizConfig.setting.api.url,
          type: 'post',
          data: that.sign(data),
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          }
        })
        .done(function(response) {
          if (that.access(response, isForceUserLogin)) {
            that.afterRequest(data._mt, response.content);
            def.resolve(response.content);
          } else {
            if (response.stat.stateList.length == 0) {
              def.reject(response.stat.code);
            } else {
              def.reject(response.stat);
            }
          }
        })
        .fail(function(error) {
          def.reject(error);
        });

        return def;
      },

    });
});


/**
 * @class sf.b2c.mall.framework.view.controller
 * @description view.controller基类
 * @param  {Object} can
 * @param  {Object} _   underscore
 * @return {can.Map}
 */
define('sf.b2c.mall.framework.view.controller',['can', 'underscore'], function (can, _) {

  return can.Control.extend({

    /**
     * @function sf.b2c.mall.framework.view.controller.draw
     * @description view的绘制
     * @param  {String}           template  模版名称
     * @param  {Map}              data      数据
     * @param  {Mustache.Helper}  helper
     */
    draw: function (template, data, helper) {
      this.element.html(can.view(template, data, helper || {}));
    },

    /**
     * @function sf.b2c.mall.framework.view.controller.render
     * @description view的第1层渲染
     */
    render: function () {
      throw('使用前必须被复写');
    },

    /**
     * @function sf.b2c.mall.framework.view.controller.supplement
     * @description view的第2层渲染
     */
    supplement: function () {
      throw('使用前必须被复写');
    }

  });

});


/**
 * @class sf.b2c.mall.util.check
 * @param  {Object} $
 * @param  {Object} can
 * @param  {Object} _
 * @param  {Object} errorCode
 */
define('sf.b2c.mall.util.utils',[
    'zepto',
    'can',
    'underscore',
    'md5',
    'sf.b2c.mall.business.config',
  ],
  function($, can, _, md5, SFBizConfig) {

    return {

      /**
       * [md5 进行MD5加密]
       * @param  {[type]} str
       * @return {[type]}
       */
      md5: function(str) {
        return md5(str + SFBizConfig.setting.md5_key);
      }
    }

  });
