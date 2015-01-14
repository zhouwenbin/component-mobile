(function(e, t) {
  typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function(e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
})(typeof window != "undefined" ? window : this, function(e, t) {
  function g(e) {
    var t = e.length,
      n = h.type(e);
    return n === "function" || h.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
  }

  function S(e, t, n) {
    if (h.isFunction(t)) return h.grep(e, function(e, r) {
      return !!t.call(e, r, e) !== n
    });
    if (t.nodeType) return h.grep(e, function(e) {
      return e === t !== n
    });
    if (typeof t == "string") {
      if (E.test(t)) return h.filter(t, e, n);
      t = h.filter(t, e)
    }
    return h.grep(e, function(e) {
      return h.inArray(e, t) >= 0 !== n
    })
  }

  function A(e, t) {
    do e = e[t]; while (e && e.nodeType !== 1);
    return e
  }

  function _(e) {
    var t = M[e] = {};
    return h.each(e.match(O) || [], function(e, n) {
      t[n] = !0
    }), t
  }

  function P() {
    T.addEventListener ? (T.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (T.detachEvent("onreadystatechange", H), e.detachEvent("onload", H))
  }

  function H() {
    if (T.addEventListener || event.type === "load" || T.readyState === "complete") P(), h.ready()
  }

  function q(e, t, n) {
    if (n === undefined && e.nodeType === 1) {
      var r = "data-" + t.replace(I, "-$1").toLowerCase();
      n = e.getAttribute(r);
      if (typeof n == "string") {
        try {
          n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : F.test(n) ? h.parseJSON(n) : n
        } catch (i) {}
        h.data(e, t, n)
      } else n = undefined
    }
    return n
  }

  function R(e) {
    var t;
    for (t in e) {
      if (t === "data" && h.isEmptyObject(e[t])) continue;
      if (t !== "toJSON") return !1
    }
    return !0
  }

  function U(e, t, r, i) {
    if (!h.acceptData(e)) return;
    var s, o, u = h.expando,
      a = e.nodeType,
      f = a ? h.cache : e,
      l = a ? e[u] : e[u] && u;
    if ((!l || !f[l] || !i && !f[l].data) && r === undefined && typeof t == "string") return;
    l || (a ? l = e[u] = n.pop() || h.guid++ : l = u), f[l] || (f[l] = a ? {} : {
      toJSON: h.noop
    });
    if (typeof t == "object" || typeof t == "function") i ? f[l] = h.extend(f[l], t) : f[l].data = h.extend(f[l].data, t);
    return o = f[l], i || (o.data || (o.data = {}), o = o.data), r !== undefined && (o[h.camelCase(t)] = r), typeof t == "string" ? (s = o[t], s == null && (s = o[h.camelCase(t)])) : s = o, s
  }

  function z(e, t, n) {
    if (!h.acceptData(e)) return;
    var r, i, s = e.nodeType,
      o = s ? h.cache : e,
      u = s ? e[h.expando] : h.expando;
    if (!o[u]) return;
    if (t) {
      r = n ? o[u] : o[u].data;
      if (r) {
        h.isArray(t) ? t = t.concat(h.map(t, h.camelCase)) : t in r ? t = [t] : (t = h.camelCase(t), t in r ? t = [t] : t = t.split(" ")), i = t.length;
        while (i--) delete r[t[i]];
        if (n ? !R(r) : !h.isEmptyObject(r)) return
      }
    }
    if (!n) {
      delete o[u].data;
      if (!R(o[u])) return
    }
    s ? h.cleanData([e], !0) : l.deleteExpando || o != o.window ? delete o[u] : o[u] = null
  }

  function et() {
    return !0
  }

  function tt() {
    return !1
  }

  function nt() {
    try {
      return T.activeElement
    } catch (e) {}
  }

  function rt(e) {
    var t = it.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement)
      while (t.length) n.createElement(t.pop());
    return n
  }

  function wt(e, t) {
    var n, r, i = 0,
      s = typeof e.getElementsByTagName !== B ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== B ? e.querySelectorAll(t || "*") : undefined;
    if (!s)
      for (s = [], n = e.childNodes || e;
        (r = n[i]) != null; i++) !t || h.nodeName(r, t) ? s.push(r) : h.merge(s, wt(r, t));
    return t === undefined || t && h.nodeName(e, t) ? h.merge([e], s) : s
  }

  function Et(e) {
    J.test(e.type) && (e.defaultChecked = e.checked)
  }

  function St(e, t) {
    return h.nodeName(e, "table") && h.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function xt(e) {
    return e.type = (h.find.attr(e, "type") !== null) + "/" + e.type, e
  }

  function Tt(e) {
    var t = vt.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function Nt(e, t) {
    var n, r = 0;
    for (;
      (n = e[r]) != null; r++) h._data(n, "globalEval", !t || h._data(t[r], "globalEval"))
  }

  function Ct(e, t) {
    if (t.nodeType !== 1 || !h.hasData(e)) return;
    var n, r, i, s = h._data(e),
      o = h._data(t, s),
      u = s.events;
    if (u) {
      delete o.handle, o.events = {};
      for (n in u)
        for (r = 0, i = u[n].length; r < i; r++) h.event.add(t, n, u[n][r])
    }
    o.data && (o.data = h.extend({}, o.data))
  }

  function kt(e, t) {
    var n, r, i;
    if (t.nodeType !== 1) return;
    n = t.nodeName.toLowerCase();
    if (!l.noCloneEvent && t[h.expando]) {
      i = h._data(t);
      for (r in i.events) h.removeEvent(t, r, i.handle);
      t.removeAttribute(h.expando)
    }
    if (n === "script" && t.text !== e.text) xt(t).text = e.text, Tt(t);
    else if (n === "object") t.parentNode && (t.outerHTML = e.outerHTML), l.html5Clone && e.innerHTML && !h.trim(t.innerHTML) && (t.innerHTML = e.innerHTML);
    else if (n === "input" && J.test(e.type)) t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value);
    else if (n === "option") t.defaultSelected = t.selected = e.defaultSelected;
    else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
  }

  function Ot(t, n) {
    var r, i = h(n.createElement(t)).appendTo(n.body),
      s = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : h.css(i[0], "display");
    return i.detach(), s
  }

  function Mt(e) {
    var t = T,
      n = At[e];
    if (!n) {
      n = Ot(e, t);
      if (n === "none" || !n) Lt = (Lt || h("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Lt[0].contentWindow || Lt[0].contentDocument).document, t.write(), t.close(), n = Ot(e, t), Lt.detach();
      At[e] = n
    }
    return n
  }

  function jt(e, t) {
    return {
      get: function() {
        var n = e();
        if (n == null) return;
        if (n) {
          delete this.get;
          return
        }
        return (this.get = t).apply(this, arguments)
      }
    }
  }

  function Vt(e, t) {
    if (t in e) return t;
    var n = t.charAt(0).toUpperCase() + t.slice(1),
      r = t,
      i = Xt.length;
    while (i--) {
      t = Xt[i] + n;
      if (t in e) return t
    }
    return r
  }

  function $t(e, t) {
    var n, r, i, s = [],
      o = 0,
      u = e.length;
    for (; o < u; o++) {
      r = e[o];
      if (!r.style) continue;
      s[o] = h._data(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && V(r) && (s[o] = h._data(r, "olddisplay", Mt(r.nodeName)))) : (i = V(r), (n && n !== "none" || !i) && h._data(r, "olddisplay", i ? n : h.css(r, "display")))
    }
    for (o = 0; o < u; o++) {
      r = e[o];
      if (!r.style) continue;
      if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
    }
    return e
  }

  function Jt(e, t, n) {
    var r = Rt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
  }

  function Kt(e, t, n, r, i) {
    var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
      o = 0;
    for (; s < 4; s += 2) n === "margin" && (o += h.css(e, n + X[s], !0, i)), r ? (n === "content" && (o -= h.css(e, "padding" + X[s], !0, i)), n !== "margin" && (o -= h.css(e, "border" + X[s] + "Width", !0, i))) : (o += h.css(e, "padding" + X[s], !0, i), n !== "padding" && (o += h.css(e, "border" + X[s] + "Width", !0, i)));
    return o
  }

  function Qt(e, t, n) {
    var r = !0,
      i = t === "width" ? e.offsetWidth : e.offsetHeight,
      s = Pt(e),
      o = l.boxSizing && h.css(e, "boxSizing", !1, s) === "border-box";
    if (i <= 0 || i == null) {
      i = Ht(e, t, s);
      if (i < 0 || i == null) i = e.style[t];
      if (Dt.test(i)) return i;
      r = o && (l.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
    }
    return i + Kt(e, t, n || (o ? "border" : "content"), r, s) + "px"
  }

  function Gt(e, t, n, r, i) {
    return new Gt.prototype.init(e, t, n, r, i)
  }

  function on() {
    return setTimeout(function() {
      Yt = undefined
    }), Yt = h.now()
  }

  function un(e, t) {
    var n, r = {
        height: e
      },
      i = 0;
    t = t ? 1 : 0;
    for (; i < 4; i += 2 - t) n = X[i], r["margin" + n] = r["padding" + n] = e;
    return t && (r.opacity = r.width = e), r
  }

  function an(e, t, n) {
    var r, i = (sn[t] || []).concat(sn["*"]),
      s = 0,
      o = i.length;
    for (; s < o; s++)
      if (r = i[s].call(n, t, e)) return r
  }

  function fn(e, t, n) {
    var r, i, s, o, u, a, f, c, p = this,
      d = {},
      v = e.style,
      m = e.nodeType && V(e),
      g = h._data(e, "fxshow");
    n.queue || (u = h._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
      u.unqueued || a()
    }), u.unqueued++, p.always(function() {
      p.always(function() {
        u.unqueued--, h.queue(e, "fx").length || u.empty.fire()
      })
    })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [v.overflow, v.overflowX, v.overflowY], f = h.css(e, "display"), c = f === "none" ? h._data(e, "olddisplay") || Mt(e.nodeName) : f, c === "inline" && h.css(e, "float") === "none" && (!l.inlineBlockNeedsLayout || Mt(e.nodeName) === "inline" ? v.display = "inline-block" : v.zoom = 1)), n.overflow && (v.overflow = "hidden", l.shrinkWrapBlocks() || p.always(function() {
      v.overflow = n.overflow[0], v.overflowX = n.overflow[1], v.overflowY = n.overflow[2]
    }));
    for (r in t) {
      i = t[r];
      if (en.exec(i)) {
        delete t[r], s = s || i === "toggle";
        if (i === (m ? "hide" : "show")) {
          if (i !== "show" || !g || g[r] === undefined) continue;
          m = !0
        }
        d[r] = g && g[r] || h.style(e, r)
      } else f = undefined
    }
    if (!h.isEmptyObject(d)) {
      g ? "hidden" in g && (m = g.hidden) : g = h._data(e, "fxshow", {}), s && (g.hidden = !m), m ? h(e).show() : p.done(function() {
        h(e).hide()
      }), p.done(function() {
        var t;
        h._removeData(e, "fxshow");
        for (t in d) h.style(e, t, d[t])
      });
      for (r in d) o = an(m ? g[r] : 0, r, p), r in g || (g[r] = o.start, m && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
    } else(f === "none" ? Mt(e.nodeName) : f) === "inline" && (v.display = f)
  }

  function ln(e, t) {
    var n, r, i, s, o;
    for (n in e) {
      r = h.camelCase(n), i = t[r], s = e[n], h.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = h.cssHooks[r];
      if (o && "expand" in o) {
        s = o.expand(s), delete e[r];
        for (n in s) n in e || (e[n] = s[n], t[n] = i)
      } else t[r] = i
    }
  }

  function cn(e, t, n) {
    var r, i, s = 0,
      o = rn.length,
      u = h.Deferred().always(function() {
        delete a.elem
      }),
      a = function() {
        if (i) return !1;
        var t = Yt || on(),
          n = Math.max(0, f.startTime + f.duration - t),
          r = n / f.duration || 0,
          s = 1 - r,
          o = 0,
          a = f.tweens.length;
        for (; o < a; o++) f.tweens[o].run(s);
        return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
      },
      f = u.promise({
        elem: e,
        props: h.extend({}, t),
        opts: h.extend(!0, {
          specialEasing: {}
        }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: Yt || on(),
        duration: n.duration,
        tweens: [],
        createTween: function(t, n) {
          var r = h.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
          return f.tweens.push(r), r
        },
        stop: function(t) {
          var n = 0,
            r = t ? f.tweens.length : 0;
          if (i) return this;
          i = !0;
          for (; n < r; n++) f.tweens[n].run(1);
          return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
        }
      }),
      l = f.props;
    ln(l, f.opts.specialEasing);
    for (; s < o; s++) {
      r = rn[s].call(f, e, l, f.opts);
      if (r) return r
    }
    return h.map(l, an, f), h.isFunction(f.opts.start) && f.opts.start.call(e, f), h.fx.timer(h.extend(a, {
      elem: e,
      anim: f,
      queue: f.opts.queue
    })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
  }

  function Fn(e) {
    return function(t, n) {
      typeof t != "string" && (n = t, t = "*");
      var r, i = 0,
        s = t.toLowerCase().match(O) || [];
      if (h.isFunction(n))
        while (r = s[i++]) r.charAt(0) === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
    }
  }

  function In(e, t, n, r) {
    function o(u) {
      var a;
      return i[u] = !0, h.each(e[u] || [], function(e, u) {
        var f = u(t, n, r);
        if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
        if (s) return !(a = f)
      }), a
    }
    var i = {},
      s = e === Hn;
    return o(t.dataTypes[0]) || !i["*"] && o("*")
  }

  function qn(e, t) {
    var n, r, i = h.ajaxSettings.flatOptions || {};
    for (r in t) t[r] !== undefined && ((i[r] ? e : n || (n = {}))[r] = t[r]);
    return n && h.extend(!0, e, n), e
  }

  function Rn(e, t, n) {
    var r, i, s, o, u = e.contents,
      a = e.dataTypes;
    while (a[0] === "*") a.shift(), i === undefined && (i = e.mimeType || t.getResponseHeader("Content-Type"));
    if (i)
      for (o in u)
        if (u[o] && u[o].test(i)) {
          a.unshift(o);
          break
        }
    if (a[0] in n) s = a[0];
    else {
      for (o in n) {
        if (!a[0] || e.converters[o + " " + a[0]]) {
          s = o;
          break
        }
        r || (r = o)
      }
      s = s || r
    }
    if (s) return s !== a[0] && a.unshift(s), n[s]
  }

  function Un(e, t, n, r) {
    var i, s, o, u, a, f = {},
      l = e.dataTypes.slice();
    if (l[1])
      for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
    s = l.shift();
    while (s) {
      e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
      if (s)
        if (s === "*") s = a;
        else if (a !== "*" && a !== s) {
        o = f[a + " " + s] || f["* " + s];
        if (!o)
          for (i in f) {
            u = i.split(" ");
            if (u[1] === s) {
              o = f[a + " " + u[0]] || f["* " + u[0]];
              if (o) {
                o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                break
              }
            }
          }
        if (o !== !0)
          if (o && e["throws"]) t = o(t);
          else try {
            t = o(t)
          } catch (c) {
            return {
              state: "parsererror",
              error: o ? c : "No conversion from " + a + " to " + s
            }
          }
      }
    }
    return {
      state: "success",
      data: t
    }
  }

  function Jn(e, t, n, r) {
    var i;
    if (h.isArray(t)) h.each(t, function(t, i) {
      n || Wn.test(e) ? r(e, i) : Jn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
    });
    else if (!n && h.type(t) === "object")
      for (i in t) Jn(e + "[" + i + "]", t[i], n, r);
    else r(e, t)
  }

  function Yn() {
    try {
      return new e.XMLHttpRequest
    } catch (t) {}
  }

  function Zn() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch (t) {}
  }

  function ir(e) {
    return h.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
  }
  var n = [],
    r = n.slice,
    i = n.concat,
    s = n.push,
    o = n.indexOf,
    u = {},
    a = u.toString,
    f = u.hasOwnProperty,
    l = {},
    c = "1.11.1",
    h = function(e, t) {
      return new h.fn.init(e, t)
    },
    p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    d = /^-ms-/,
    v = /-([\da-z])/gi,
    m = function(e, t) {
      return t.toUpperCase()
    };
  h.fn = h.prototype = {
    jquery: c,
    constructor: h,
    selector: "",
    length: 0,
    toArray: function() {
      return r.call(this)
    },
    get: function(e) {
      return e != null ? e < 0 ? this[e + this.length] : this[e] : r.call(this)
    },
    pushStack: function(e) {
      var t = h.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    },
    each: function(e, t) {
      return h.each(this, e, t)
    },
    map: function(e) {
      return this.pushStack(h.map(this, function(t, n) {
        return e.call(t, n, t)
      }))
    },
    slice: function() {
      return this.pushStack(r.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(e) {
      var t = this.length,
        n = +e + (e < 0 ? t : 0);
      return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: s,
    sort: n.sort,
    splice: n.splice
  }, h.extend = h.fn.extend = function() {
    var e, t, n, r, i, s, o = arguments[0] || {},
      u = 1,
      a = arguments.length,
      f = !1;
    typeof o == "boolean" && (f = o, o = arguments[u] || {}, u++), typeof o != "object" && !h.isFunction(o) && (o = {}), u === a && (o = this, u--);
    for (; u < a; u++)
      if ((i = arguments[u]) != null)
        for (r in i) {
          e = o[r], n = i[r];
          if (o === n) continue;
          f && n && (h.isPlainObject(n) || (t = h.isArray(n))) ? (t ? (t = !1, s = e && h.isArray(e) ? e : []) : s = e && h.isPlainObject(e) ? e : {}, o[r] = h.extend(f, s, n)) : n !== undefined && (o[r] = n)
        }
      return o
  }, h.extend({
    expando: "jQuery" + (c + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(e) {
      throw new Error(e)
    },
    noop: function() {},
    isFunction: function(e) {
      return h.type(e) === "function"
    },
    isArray: Array.isArray || function(e) {
      return h.type(e) === "array"
    },
    isWindow: function(e) {
      return e != null && e == e.window
    },
    isNumeric: function(e) {
      return !h.isArray(e) && e - parseFloat(e) >= 0
    },
    isEmptyObject: function(e) {
      var t;
      for (t in e) return !1;
      return !0
    },
    isPlainObject: function(e) {
      var t;
      if (!e || h.type(e) !== "object" || e.nodeType || h.isWindow(e)) return !1;
      try {
        if (e.constructor && !f.call(e, "constructor") && !f.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (n) {
        return !1
      }
      if (l.ownLast)
        for (t in e) return f.call(e, t);
      for (t in e);
      return t === undefined || f.call(e, t)
    },
    type: function(e) {
      return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? u[a.call(e)] || "object" : typeof e
    },
    globalEval: function(t) {
      t && h.trim(t) && (e.execScript || function(t) {
        e.eval.call(e, t)
      })(t)
    },
    camelCase: function(e) {
      return e.replace(d, "ms-").replace(v, m)
    },
    nodeName: function(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    },
    each: function(e, t, n) {
      var r, i = 0,
        s = e.length,
        o = g(e);
      if (n)
        if (o)
          for (; i < s; i++) {
            r = t.apply(e[i], n);
            if (r === !1) break
          } else
            for (i in e) {
              r = t.apply(e[i], n);
              if (r === !1) break
            } else if (o)
              for (; i < s; i++) {
                r = t.call(e[i], i, e[i]);
                if (r === !1) break
              } else
                for (i in e) {
                  r = t.call(e[i], i, e[i]);
                  if (r === !1) break
                }
            return e
    },
    trim: function(e) {
      return e == null ? "" : (e + "").replace(p, "")
    },
    makeArray: function(e, t) {
      var n = t || [];
      return e != null && (g(Object(e)) ? h.merge(n, typeof e == "string" ? [e] : e) : s.call(n, e)), n
    },
    inArray: function(e, t, n) {
      var r;
      if (t) {
        if (o) return o.call(t, e, n);
        r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
        for (; n < r; n++)
          if (n in t && t[n] === e) return n
      }
      return -1
    },
    merge: function(e, t) {
      var n = +t.length,
        r = 0,
        i = e.length;
      while (r < n) e[i++] = t[r++];
      if (n !== n)
        while (t[r] !== undefined) e[i++] = t[r++];
      return e.length = i, e
    },
    grep: function(e, t, n) {
      var r, i = [],
        s = 0,
        o = e.length,
        u = !n;
      for (; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
      return i
    },
    map: function(e, t, n) {
      var r, s = 0,
        o = e.length,
        u = g(e),
        a = [];
      if (u)
        for (; s < o; s++) r = t(e[s], s, n), r != null && a.push(r);
      else
        for (s in e) r = t(e[s], s, n), r != null && a.push(r);
      return i.apply([], a)
    },
    guid: 1,
    proxy: function(e, t) {
      var n, i, s;
      return typeof t == "string" && (s = e[t], t = e, e = s), h.isFunction(e) ? (n = r.call(arguments, 2), i = function() {
        return e.apply(t || this, n.concat(r.call(arguments)))
      }, i.guid = e.guid = e.guid || h.guid++, i) : undefined
    },
    now: function() {
      return +(new Date)
    },
    support: l
  }), h.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
    u["[object " + t + "]"] = t.toLowerCase()
  });
  var y = function(e) {
    function st(e, t, r, i) {
      var s, u, f, l, c, d, g, y, S, x;
      (t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [];
      if (!e || typeof e != "string") return r;
      if ((l = t.nodeType) !== 1 && l !== 9) return [];
      if (v && !i) {
        if (s = Z.exec(e))
          if (f = s[1]) {
            if (l === 9) {
              u = t.getElementById(f);
              if (!u || !u.parentNode) return r;
              if (u.id === f) return r.push(u), r
            } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u), r
          } else {
            if (s[2]) return P.apply(r, t.getElementsByTagName(e)), r;
            if ((f = s[3]) && n.getElementsByClassName && t.getElementsByClassName) return P.apply(r, t.getElementsByClassName(f)), r
          }
        if (n.qsa && (!m || !m.test(e))) {
          y = g = w, S = t, x = l === 9 && e;
          if (l === 1 && t.nodeName.toLowerCase() !== "object") {
            d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
            while (c--) d[c] = y + mt(d[c]);
            S = et.test(e) && dt(t.parentNode) || t, x = d.join(",")
          }
          if (x) try {
            return P.apply(r, S.querySelectorAll(x)), r
          } catch (T) {} finally {
            g || t.removeAttribute("id")
          }
        }
      }
      return a(e.replace(z, "$1"), t, r, i)
    }

    function ot() {
      function t(n, i) {
        return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
      }
      var e = [];
      return t
    }

    function ut(e) {
      return e[w] = !0, e
    }

    function at(e) {
      var t = p.createElement("div");
      try {
        return !!e(t)
      } catch (n) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function ft(e, t) {
      var n = e.split("|"),
        i = e.length;
      while (i--) r.attrHandle[n[i]] = t
    }

    function lt(e, t) {
      var n = t && e,
        r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || A) - (~e.sourceIndex || A);
      if (r) return r;
      if (n)
        while (n = n.nextSibling)
          if (n === t) return -1;
      return e ? 1 : -1
    }

    function ct(e) {
      return function(t) {
        var n = t.nodeName.toLowerCase();
        return n === "input" && t.type === e
      }
    }

    function ht(e) {
      return function(t) {
        var n = t.nodeName.toLowerCase();
        return (n === "input" || n === "button") && t.type === e
      }
    }

    function pt(e) {
      return ut(function(t) {
        return t = +t, ut(function(n, r) {
          var i, s = e([], n.length, t),
            o = s.length;
          while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
        })
      })
    }

    function dt(e) {
      return e && typeof e.getElementsByTagName !== L && e
    }

    function vt() {}

    function mt(e) {
      var t = 0,
        n = e.length,
        r = "";
      for (; t < n; t++) r += e[t].value;
      return r
    }

    function gt(e, t, n) {
      var r = t.dir,
        i = n && r === "parentNode",
        s = x++;
      return t.first ? function(t, n, s) {
        while (t = t[r])
          if (t.nodeType === 1 || i) return e(t, n, s)
      } : function(t, n, o) {
        var u, a, f = [S, s];
        if (o) {
          while (t = t[r])
            if (t.nodeType === 1 || i)
              if (e(t, n, o)) return !0
        } else
          while (t = t[r])
            if (t.nodeType === 1 || i) {
              a = t[w] || (t[w] = {});
              if ((u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
              a[r] = f;
              if (f[2] = e(t, n, o)) return !0
            }
      }
    }

    function yt(e) {
      return e.length > 1 ? function(t, n, r) {
        var i = e.length;
        while (i--)
          if (!e[i](t, n, r)) return !1;
        return !0
      } : e[0]
    }

    function bt(e, t, n) {
      var r = 0,
        i = t.length;
      for (; r < i; r++) st(e, t[r], n);
      return n
    }

    function wt(e, t, n, r, i) {
      var s, o = [],
        u = 0,
        a = e.length,
        f = t != null;
      for (; u < a; u++)
        if (s = e[u])
          if (!n || n(s, r, i)) o.push(s), f && t.push(u);
      return o
    }

    function Et(e, t, n, r, i, s) {
      return r && !r[w] && (r = Et(r)), i && !i[w] && (i = Et(i, s)), ut(function(s, o, u, a) {
        var f, l, c, h = [],
          p = [],
          d = o.length,
          v = s || bt(t || "*", u.nodeType ? [u] : u, []),
          m = e && (s || !t) ? wt(v, h, e, u, a) : v,
          g = n ? i || (s ? e : d || r) ? [] : o : m;
        n && n(m, g, u, a);
        if (r) {
          f = wt(g, p), r(f, [], u, a), l = f.length;
          while (l--)
            if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
        }
        if (s) {
          if (i || e) {
            if (i) {
              f = [], l = g.length;
              while (l--)(c = g[l]) && f.push(m[l] = c);
              i(null, g = [], f, a)
            }
            l = g.length;
            while (l--)(c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
          }
        } else g = wt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : P.apply(o, g)
      })
    }

    function St(e) {
      var t, n, i, s = e.length,
        o = r.relative[e[0].type],
        u = o || r.relative[" "],
        a = o ? 1 : 0,
        l = gt(function(e) {
          return e === t
        }, u, !0),
        c = gt(function(e) {
          return B.call(t, e) > -1
        }, u, !0),
        h = [function(e, n, r) {
          return !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
        }];
      for (; a < s; a++)
        if (n = r.relative[e[a].type]) h = [gt(yt(h), n)];
        else {
          n = r.filter[e[a].type].apply(null, e[a].matches);
          if (n[w]) {
            i = ++a;
            for (; i < s; i++)
              if (r.relative[e[i].type]) break;
            return Et(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({
              value: e[a - 2].type === " " ? "*" : ""
            })).replace(z, "$1"), n, a < i && St(e.slice(a, i)), i < s && St(e = e.slice(i)), i < s && mt(e))
          }
          h.push(n)
        }
      return yt(h)
    }

    function xt(e, t) {
      var n = t.length > 0,
        i = e.length > 0,
        s = function(s, o, u, a, l) {
          var c, h, d, v = 0,
            m = "0",
            g = s && [],
            y = [],
            b = f,
            w = s || i && r.find.TAG("*", l),
            E = S += b == null ? 1 : Math.random() || .1,
            x = w.length;
          l && (f = o !== p && o);
          for (; m !== x && (c = w[m]) != null; m++) {
            if (i && c) {
              h = 0;
              while (d = e[h++])
                if (d(c, o, u)) {
                  a.push(c);
                  break
                }
              l && (S = E)
            }
            n && ((c = !d && c) && v--, s && g.push(c))
          }
          v += m;
          if (n && m !== v) {
            h = 0;
            while (d = t[h++]) d(g, y, o, u);
            if (s) {
              if (v > 0)
                while (m--) !g[m] && !y[m] && (y[m] = _.call(a));
              y = wt(y)
            }
            P.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(a)
          }
          return l && (S = E, f = b), g
        };
      return n ? ut(s) : s
    }
    var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + -(new Date),
      E = e.document,
      S = 0,
      x = 0,
      T = ot(),
      N = ot(),
      C = ot(),
      k = function(e, t) {
        return e === t && (c = !0), 0
      },
      L = typeof undefined,
      A = 1 << 31,
      O = {}.hasOwnProperty,
      M = [],
      _ = M.pop,
      D = M.push,
      P = M.push,
      H = M.slice,
      B = M.indexOf || function(e) {
        var t = 0,
          n = this.length;
        for (; t < n; t++)
          if (this[t] === e) return t;
        return -1
      },
      j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      F = "[\\x20\\t\\r\\n\\f]",
      I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      q = I.replace("w", "w#"),
      R = "\\[" + F + "*(" + I + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + F + "*\\]",
      U = ":(" + I + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|" + ".*" + ")\\)|)",
      z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
      W = new RegExp("^" + F + "*," + F + "*"),
      X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
      V = new RegExp("=" + F + "*([^\\]'\"]*?)" + F + "*\\]", "g"),
      $ = new RegExp(U),
      J = new RegExp("^" + q + "$"),
      K = {
        ID: new RegExp("^#(" + I + ")"),
        CLASS: new RegExp("^\\.(" + I + ")"),
        TAG: new RegExp("^(" + I.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + R),
        PSEUDO: new RegExp("^" + U),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + j + ")$", "i"),
        needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
      },
      Q = /^(?:input|select|textarea|button)$/i,
      G = /^h\d$/i,
      Y = /^[^{]+\{\s*\[native \w/,
      Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      et = /[+~]/,
      tt = /'|\\/g,
      nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"),
      rt = function(e, t, n) {
        var r = "0x" + t - 65536;
        return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
      };
    try {
      P.apply(M = H.call(E.childNodes), E.childNodes), M[E.childNodes.length].nodeType
    } catch (it) {
      P = {
        apply: M.length ? function(e, t) {
          D.apply(e, H.call(t))
        } : function(e, t) {
          var n = e.length,
            r = 0;
          while (e[n++] = t[r++]);
          e.length = n - 1
        }
      }
    }
    n = st.support = {}, s = st.isXML = function(e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return t ? t.nodeName !== "HTML" : !1
    }, h = st.setDocument = function(e) {
      var t, i = e ? e.ownerDocument || e : E,
        o = i.defaultView;
      if (i === p || i.nodeType !== 9 || !i.documentElement) return p;
      p = i, d = i.documentElement, v = !s(i), o && o !== o.top && (o.addEventListener ? o.addEventListener("unload", function() {
        h()
      }, !1) : o.attachEvent && o.attachEvent("onunload", function() {
        h()
      })), n.attributes = at(function(e) {
        return e.className = "i", !e.getAttribute("className")
      }), n.getElementsByTagName = at(function(e) {
        return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
      }), n.getElementsByClassName = Y.test(i.getElementsByClassName) && at(function(e) {
        return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
      }), n.getById = at(function(e) {
        return d.appendChild(e).id = w, !i.getElementsByName || !i.getElementsByName(w).length
      }), n.getById ? (r.find.ID = function(e, t) {
        if (typeof t.getElementById !== L && v) {
          var n = t.getElementById(e);
          return n && n.parentNode ? [n] : []
        }
      }, r.filter.ID = function(e) {
        var t = e.replace(nt, rt);
        return function(e) {
          return e.getAttribute("id") === t
        }
      }) : (delete r.find.ID, r.filter.ID = function(e) {
        var t = e.replace(nt, rt);
        return function(e) {
          var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
          return n && n.value === t
        }
      }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
        if (typeof t.getElementsByTagName !== L) return t.getElementsByTagName(e)
      } : function(e, t) {
        var n, r = [],
          i = 0,
          s = t.getElementsByTagName(e);
        if (e === "*") {
          while (n = s[i++]) n.nodeType === 1 && r.push(n);
          return r
        }
        return s
      }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
        if (typeof t.getElementsByClassName !== L && v) return t.getElementsByClassName(e)
      }, g = [], m = [];
      if (n.qsa = Y.test(i.querySelectorAll)) at(function(e) {
        e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && m.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + F + "*(?:value|" + j + ")"), e.querySelectorAll(":checked").length || m.push(":checked")
      }), at(function(e) {
        var t = i.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + F + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
      });
      return (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && at(function(e) {
        n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", U)
      }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function(e, t) {
        var n = e.nodeType === 9 ? e.documentElement : e,
          r = t && t.parentNode;
        return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
      } : function(e, t) {
        if (t)
          while (t = t.parentNode)
            if (t === e) return !0;
        return !1
      }, k = t ? function(e, t) {
        if (e === t) return c = !0, 0;
        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, r & 1 || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === i || e.ownerDocument === E && b(E, e) ? -1 : t === i || t.ownerDocument === E && b(E, t) ? 1 : l ? B.call(l, e) - B.call(l, t) : 0 : r & 4 ? -1 : 1)
      } : function(e, t) {
        if (e === t) return c = !0, 0;
        var n, r = 0,
          s = e.parentNode,
          o = t.parentNode,
          u = [e],
          a = [t];
        if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, t) : 0;
        if (s === o) return lt(e, t);
        n = e;
        while (n = n.parentNode) u.unshift(n);
        n = t;
        while (n = n.parentNode) a.unshift(n);
        while (u[r] === a[r]) r++;
        return r ? lt(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
      }, i
    }, st.matches = function(e, t) {
      return st(e, null, null, t)
    }, st.matchesSelector = function(e, t) {
      (e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']");
      if (n.matchesSelector && v && (!g || !g.test(t)) && (!m || !m.test(t))) try {
        var r = y.call(e, t);
        if (r || n.disconnectedMatch || e.document && e.document.nodeType !== 11) return r
      } catch (i) {}
      return st(t, p, null, [e]).length > 0
    }, st.contains = function(e, t) {
      return (e.ownerDocument || e) !== p && h(e), b(e, t)
    }, st.attr = function(e, t) {
      (e.ownerDocument || e) !== p && h(e);
      var i = r.attrHandle[t.toLowerCase()],
        s = i && O.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : undefined;
      return s !== undefined ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
    }, st.error = function(e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, st.uniqueSort = function(e) {
      var t, r = [],
        i = 0,
        s = 0;
      c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k);
      if (c) {
        while (t = e[s++]) t === e[s] && (i = r.push(s));
        while (i--) e.splice(r[i], 1)
      }
      return l = null, e
    }, i = st.getText = function(e) {
      var t, n = "",
        r = 0,
        s = e.nodeType;
      if (!s)
        while (t = e[r++]) n += i(t);
      else if (s === 1 || s === 9 || s === 11) {
        if (typeof e.textContent == "string") return e.textContent;
        for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
      } else if (s === 3 || s === 4) return e.nodeValue;
      return n
    }, r = st.selectors = {
      cacheLength: 50,
      createPseudo: ut,
      match: K,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(e) {
          return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        },
        CHILD: function(e) {
          return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && st.error(e[0]), e
        },
        PSEUDO: function(e) {
          var t, n = !e[6] && e[2];
          return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function(e) {
          var t = e.replace(nt, rt).toLowerCase();
          return e === "*" ? function() {
            return !0
          } : function(e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        },
        CLASS: function(e) {
          var t = T[e + " "];
          return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && T(e, function(e) {
            return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
          })
        },
        ATTR: function(e, t, n) {
          return function(r) {
            var i = st.attr(r, e);
            return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
          }
        },
        CHILD: function(e, t, n, r, i) {
          var s = e.slice(0, 3) !== "nth",
            o = e.slice(-4) !== "last",
            u = t === "of-type";
          return r === 1 && i === 0 ? function(e) {
            return !!e.parentNode
          } : function(t, n, a) {
            var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
              m = t.parentNode,
              g = u && t.nodeName.toLowerCase(),
              y = !a && !u;
            if (m) {
              if (s) {
                while (v) {
                  c = t;
                  while (c = c[v])
                    if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                  d = v = e === "only" && !d && "nextSibling"
                }
                return !0
              }
              d = [o ? m.firstChild : m.lastChild];
              if (o && y) {
                l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                  if (c.nodeType === 1 && ++h && c === t) {
                    l[e] = [S, p, h];
                    break
                  }
              } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
              else
                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                  if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                    y && ((c[w] || (c[w] = {}))[e] = [S, h]);
                    if (c === t) break
                  }
              return h -= i, h === r || h % r === 0 && h / r >= 0
            }
          }
        },
        PSEUDO: function(e, t) {
          var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
          return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function(e, n) {
            var r, s = i(e, t),
              o = s.length;
            while (o--) r = B.call(e, s[o]), e[r] = !(n[r] = s[o])
          }) : function(e) {
            return i(e, 0, n)
          }) : i
        }
      },
      pseudos: {
        not: ut(function(e) {
          var t = [],
            n = [],
            r = u(e.replace(z, "$1"));
          return r[w] ? ut(function(e, t, n, i) {
            var s, o = r(e, null, i, []),
              u = e.length;
            while (u--)
              if (s = o[u]) e[u] = !(t[u] = s)
          }) : function(e, i, s) {
            return t[0] = e, r(t, null, s, n), !n.pop()
          }
        }),
        has: ut(function(e) {
          return function(t) {
            return st(e, t).length > 0
          }
        }),
        contains: ut(function(e) {
          return function(t) {
            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
          }
        }),
        lang: ut(function(e) {
          return J.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
            function(t) {
              var n;
              do
                if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0;
              while ((t = t.parentNode) && t.nodeType === 1);
              return !1
            }
        }),
        target: function(t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id
        },
        root: function(e) {
          return e === d
        },
        focus: function(e) {
          return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        },
        enabled: function(e) {
          return e.disabled === !1
        },
        disabled: function(e) {
          return e.disabled === !0
        },
        checked: function(e) {
          var t = e.nodeName.toLowerCase();
          return t === "input" && !!e.checked || t === "option" && !!e.selected
        },
        selected: function(e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        },
        empty: function(e) {
          for (e = e.firstChild; e; e = e.nextSibling)
            if (e.nodeType < 6) return !1;
          return !0
        },
        parent: function(e) {
          return !r.pseudos.empty(e)
        },
        header: function(e) {
          return G.test(e.nodeName)
        },
        input: function(e) {
          return Q.test(e.nodeName)
        },
        button: function(e) {
          var t = e.nodeName.toLowerCase();
          return t === "input" && e.type === "button" || t === "button"
        },
        text: function(e) {
          var t;
          return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
        },
        first: pt(function() {
          return [0]
        }),
        last: pt(function(e, t) {
          return [t - 1]
        }),
        eq: pt(function(e, t, n) {
          return [n < 0 ? n + t : n]
        }),
        even: pt(function(e, t) {
          var n = 0;
          for (; n < t; n += 2) e.push(n);
          return e
        }),
        odd: pt(function(e, t) {
          var n = 1;
          for (; n < t; n += 2) e.push(n);
          return e
        }),
        lt: pt(function(e, t, n) {
          var r = n < 0 ? n + t : n;
          for (; --r >= 0;) e.push(r);
          return e
        }),
        gt: pt(function(e, t, n) {
          var r = n < 0 ? n + t : n;
          for (; ++r < t;) e.push(r);
          return e
        })
      }
    }, r.pseudos.nth = r.pseudos.eq;
    for (t in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) r.pseudos[t] = ct(t);
    for (t in {
        submit: !0,
        reset: !0
      }) r.pseudos[t] = ht(t);
    return vt.prototype = r.filters = r.pseudos, r.setFilters = new vt, o = st.tokenize = function(e, t) {
      var n, i, s, o, u, a, f, l = N[e + " "];
      if (l) return t ? 0 : l.slice(0);
      u = e, a = [], f = r.preFilter;
      while (u) {
        if (!n || (i = W.exec(u))) i && (u = u.slice(i[0].length) || u), a.push(s = []);
        n = !1;
        if (i = X.exec(u)) n = i.shift(), s.push({
          value: n,
          type: i[0].replace(z, " ")
        }), u = u.slice(n.length);
        for (o in r.filter)(i = K[o].exec(u)) && (!f[o] || (i = f[o](i))) && (n = i.shift(), s.push({
          value: n,
          type: o,
          matches: i
        }), u = u.slice(n.length));
        if (!n) break
      }
      return t ? u.length : u ? st.error(e) : N(e, a).slice(0)
    }, u = st.compile = function(e, t) {
      var n, r = [],
        i = [],
        s = C[e + " "];
      if (!s) {
        t || (t = o(e)), n = t.length;
        while (n--) s = St(t[n]), s[w] ? r.push(s) : i.push(s);
        s = C(e, xt(i, r)), s.selector = e
      }
      return s
    }, a = st.select = function(e, t, i, s) {
      var a, f, l, c, h, p = typeof e == "function" && e,
        d = !s && o(e = p.selector || e);
      i = i || [];
      if (d.length === 1) {
        f = d[0] = d[0].slice(0);
        if (f.length > 2 && (l = f[0]).type === "ID" && n.getById && t.nodeType === 9 && v && r.relative[f[1].type]) {
          t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0];
          if (!t) return i;
          p && (t = t.parentNode), e = e.slice(f.shift().value.length)
        }
        a = K.needsContext.test(e) ? 0 : f.length;
        while (a--) {
          l = f[a];
          if (r.relative[c = l.type]) break;
          if (h = r.find[c])
            if (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && dt(t.parentNode) || t)) {
              f.splice(a, 1), e = s.length && mt(f);
              if (!e) return P.apply(i, s), i;
              break
            }
        }
      }
      return (p || u(e, d))(s, t, !v, i, et.test(e) && dt(t.parentNode) || t), i
    }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = at(function(e) {
      return e.compareDocumentPosition(p.createElement("div")) & 1
    }), at(function(e) {
      return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
    }) || ft("type|href|height|width", function(e, t, n) {
      if (!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
    }), (!n.attributes || !at(function(e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
    })) && ft("value", function(e, t, n) {
      if (!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
    }), at(function(e) {
      return e.getAttribute("disabled") == null
    }) || ft(j, function(e, t, n) {
      var r;
      if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }), st
  }(e);
  h.find = y, h.expr = y.selectors, h.expr[":"] = h.expr.pseudos, h.unique = y.uniqueSort, h.text = y.getText, h.isXMLDoc = y.isXML, h.contains = y.contains;
  var b = h.expr.match.needsContext,
    w = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    E = /^.[^:#\[\.,]*$/;
  h.filter = function(e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? h.find.matchesSelector(r, e) ? [r] : [] : h.find.matches(e, h.grep(t, function(e) {
      return e.nodeType === 1
    }))
  }, h.fn.extend({
    find: function(e) {
      var t, n = [],
        r = this,
        i = r.length;
      if (typeof e != "string") return this.pushStack(h(e).filter(function() {
        for (t = 0; t < i; t++)
          if (h.contains(r[t], this)) return !0
      }));
      for (t = 0; t < i; t++) h.find(e, r[t], n);
      return n = this.pushStack(i > 1 ? h.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    },
    filter: function(e) {
      return this.pushStack(S(this, e || [], !1))
    },
    not: function(e) {
      return this.pushStack(S(this, e || [], !0))
    },
    is: function(e) {
      return !!S(this, typeof e == "string" && b.test(e) ? h(e) : e || [], !1).length
    }
  });
  var x, T = e.document,
    N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = h.fn.init = function(e, t) {
      var n, r;
      if (!e) return this;
      if (typeof e == "string") {
        e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? n = [null, e, null] : n = N.exec(e);
        if (n && (n[1] || !t)) {
          if (n[1]) {
            t = t instanceof h ? t[0] : t, h.merge(this, h.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : T, !0));
            if (w.test(n[1]) && h.isPlainObject(t))
              for (n in t) h.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
            return this
          }
          r = T.getElementById(n[2]);
          if (r && r.parentNode) {
            if (r.id !== n[2]) return x.find(e);
            this.length = 1, this[0] = r
          }
          return this.context = T, this.selector = e, this
        }
        return !t || t.jquery ? (t || x).find(e) : this.constructor(t).find(e)
      }
      return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : h.isFunction(e) ? typeof x.ready != "undefined" ? x.ready(e) : e(h) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), h.makeArray(e, this))
    };
  C.prototype = h.fn, x = h(T);
  var k = /^(?:parents|prev(?:Until|All))/,
    L = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  h.extend({
    dir: function(e, t, n) {
      var r = [],
        i = e[t];
      while (i && i.nodeType !== 9 && (n === undefined || i.nodeType !== 1 || !h(i).is(n))) i.nodeType === 1 && r.push(i), i = i[t];
      return r
    },
    sibling: function(e, t) {
      var n = [];
      for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
      return n
    }
  }), h.fn.extend({
    has: function(e) {
      var t, n = h(e, this),
        r = n.length;
      return this.filter(function() {
        for (t = 0; t < r; t++)
          if (h.contains(this, n[t])) return !0
      })
    },
    closest: function(e, t) {
      var n, r = 0,
        i = this.length,
        s = [],
        o = b.test(e) || typeof e != "string" ? h(e, t || this.context) : 0;
      for (; r < i; r++)
        for (n = this[r]; n && n !== t; n = n.parentNode)
          if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && h.find.matchesSelector(n, e))) {
            s.push(n);
            break
          }
      return this.pushStack(s.length > 1 ? h.unique(s) : s)
    },
    index: function(e) {
      return e ? typeof e == "string" ? h.inArray(this[0], h(e)) : h.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(e, t) {
      return this.pushStack(h.unique(h.merge(this.get(), h(e, t))))
    },
    addBack: function(e) {
      return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }
  }), h.each({
    parent: function(e) {
      var t = e.parentNode;
      return t && t.nodeType !== 11 ? t : null
    },
    parents: function(e) {
      return h.dir(e, "parentNode")
    },
    parentsUntil: function(e, t, n) {
      return h.dir(e, "parentNode", n)
    },
    next: function(e) {
      return A(e, "nextSibling")
    },
    prev: function(e) {
      return A(e, "previousSibling")
    },
    nextAll: function(e) {
      return h.dir(e, "nextSibling")
    },
    prevAll: function(e) {
      return h.dir(e, "previousSibling")
    },
    nextUntil: function(e, t, n) {
      return h.dir(e, "nextSibling", n)
    },
    prevUntil: function(e, t, n) {
      return h.dir(e, "previousSibling", n)
    },
    siblings: function(e) {
      return h.sibling((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
      return h.sibling(e.firstChild)
    },
    contents: function(e) {
      return h.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : h.merge([], e.childNodes)
    }
  }, function(e, t) {
    h.fn[e] = function(n, r) {
      var i = h.map(this, t, n);
      return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = h.filter(r, i)), this.length > 1 && (L[e] || (i = h.unique(i)), k.test(e) && (i = i.reverse())), this.pushStack(i)
    }
  });
  var O = /\S+/g,
    M = {};
  h.Callbacks = function(e) {
    e = typeof e == "string" ? M[e] || _(e) : h.extend({}, e);
    var t, n, r, i, s, o, u = [],
      a = !e.once && [],
      f = function(c) {
        n = e.memory && c, r = !0, s = o || 0, o = 0, i = u.length, t = !0;
        for (; u && s < i; s++)
          if (u[s].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
            n = !1;
            break
          }
        t = !1, u && (a ? a.length && f(a.shift()) : n ? u = [] : l.disable())
      },
      l = {
        add: function() {
          if (u) {
            var r = u.length;
            (function s(t) {
              h.each(t, function(t, n) {
                var r = h.type(n);
                r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && s(n)
              })
            })(arguments), t ? i = u.length : n && (o = r, f(n))
          }
          return this
        },
        remove: function() {
          return u && h.each(arguments, function(e, n) {
            var r;
            while ((r = h.inArray(n, u, r)) > -1) u.splice(r, 1), t && (r <= i && i--, r <= s && s--)
          }), this
        },
        has: function(e) {
          return e ? h.inArray(e, u) > -1 : !!u && !!u.length
        },
        empty: function() {
          return u = [], i = 0, this
        },
        disable: function() {
          return u = a = n = undefined, this
        },
        disabled: function() {
          return !u
        },
        lock: function() {
          return a = undefined, n || l.disable(), this
        },
        locked: function() {
          return !a
        },
        fireWith: function(e, n) {
          return u && (!r || a) && (n = n || [], n = [e, n.slice ? n.slice() : n], t ? a.push(n) : f(n)), this
        },
        fire: function() {
          return l.fireWith(this, arguments), this
        },
        fired: function() {
          return !!r
        }
      };
    return l
  }, h.extend({
    Deferred: function(e) {
      var t = [
          ["resolve", "done", h.Callbacks("once memory"), "resolved"],
          ["reject", "fail", h.Callbacks("once memory"), "rejected"],
          ["notify", "progress", h.Callbacks("memory")]
        ],
        n = "pending",
        r = {
          state: function() {
            return n
          },
          always: function() {
            return i.done(arguments).fail(arguments), this
          },
          then: function() {
            var e = arguments;
            return h.Deferred(function(n) {
              h.each(t, function(t, s) {
                var o = h.isFunction(e[t]) && e[t];
                i[s[1]](function() {
                  var e = o && o.apply(this, arguments);
                  e && h.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                })
              }), e = null
            }).promise()
          },
          promise: function(e) {
            return e != null ? h.extend(e, r) : r
          }
        },
        i = {};
      return r.pipe = r.then, h.each(t, function(e, s) {
        var o = s[2],
          u = s[3];
        r[s[1]] = o.add, u && o.add(function() {
          n = u
        }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function() {
          return i[s[0] + "With"](this === i ? r : this, arguments), this
        }, i[s[0] + "With"] = o.fireWith
      }), r.promise(i), e && e.call(i, i), i
    },
    when: function(e) {
      var t = 0,
        n = r.call(arguments),
        i = n.length,
        s = i !== 1 || e && h.isFunction(e.promise) ? i : 0,
        o = s === 1 ? e : h.Deferred(),
        u = function(e, t, n) {
          return function(i) {
            t[e] = this, n[e] = arguments.length > 1 ? r.call(arguments) : i, n === a ? o.notifyWith(t, n) : --s || o.resolveWith(t, n)
          }
        },
        a, f, l;
      if (i > 1) {
        a = new Array(i), f = new Array(i), l = new Array(i);
        for (; t < i; t++) n[t] && h.isFunction(n[t].promise) ? n[t].promise().done(u(t, l, n)).fail(o.reject).progress(u(t, f, a)) : --s
      }
      return s || o.resolveWith(l, n), o.promise()
    }
  });
  var D;
  h.fn.ready = function(e) {
    return h.ready.promise().done(e), this
  }, h.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(e) {
      e ? h.readyWait++ : h.ready(!0)
    },
    ready: function(e) {
      if (e === !0 ? --h.readyWait : h.isReady) return;
      if (!T.body) return setTimeout(h.ready);
      h.isReady = !0;
      if (e !== !0 && --h.readyWait > 0) return;
      D.resolveWith(T, [h]), h.fn.triggerHandler && (h(T).triggerHandler("ready"), h(T).off("ready"))
    }
  }), h.ready.promise = function(t) {
    if (!D) {
      D = h.Deferred();
      if (T.readyState === "complete") setTimeout(h.ready);
      else if (T.addEventListener) T.addEventListener("DOMContentLoaded", H, !1), e.addEventListener("load", H, !1);
      else {
        T.attachEvent("onreadystatechange", H), e.attachEvent("onload", H);
        var n = !1;
        try {
          n = e.frameElement == null && T.documentElement
        } catch (r) {}
        n && n.doScroll && function i() {
          if (!h.isReady) {
            try {
              n.doScroll("left")
            } catch (e) {
              return setTimeout(i, 50)
            }
            P(), h.ready()
          }
        }()
      }
    }
    return D.promise(t)
  };
  var B = typeof undefined,
    j;
  for (j in h(l)) break;
  l.ownLast = j !== "0", l.inlineBlockNeedsLayout = !1, h(function() {
      var e, t, n, r;
      n = T.getElementsByTagName("body")[0];
      if (!n || !n.style) return;
      t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", l.inlineBlockNeedsLayout = e = t.offsetWidth === 3, e && (n.style.zoom = 1)), n.removeChild(r)
    }),
    function() {
      var e = T.createElement("div");
      if (l.deleteExpando == null) {
        l.deleteExpando = !0;
        try {
          delete e.test
        } catch (t) {
          l.deleteExpando = !1
        }
      }
      e = null
    }(), h.acceptData = function(e) {
      var t = h.noData[(e.nodeName + " ").toLowerCase()],
        n = +e.nodeType || 1;
      return n !== 1 && n !== 9 ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
  var F = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    I = /([A-Z])/g;
  h.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function(e) {
      return e = e.nodeType ? h.cache[e[h.expando]] : e[h.expando], !!e && !R(e)
    },
    data: function(e, t, n) {
      return U(e, t, n)
    },
    removeData: function(e, t) {
      return z(e, t)
    },
    _data: function(e, t, n) {
      return U(e, t, n, !0)
    },
    _removeData: function(e, t) {
      return z(e, t, !0)
    }
  }), h.fn.extend({
    data: function(e, t) {
      var n, r, i, s = this[0],
        o = s && s.attributes;
      if (e === undefined) {
        if (this.length) {
          i = h.data(s);
          if (s.nodeType === 1 && !h._data(s, "parsedAttrs")) {
            n = o.length;
            while (n--) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = h.camelCase(r.slice(5)), q(s, r, i[r])));
            h._data(s, "parsedAttrs", !0)
          }
        }
        return i
      }
      return typeof e == "object" ? this.each(function() {
        h.data(this, e)
      }) : arguments.length > 1 ? this.each(function() {
        h.data(this, e, t)
      }) : s ? q(s, e, h.data(s, e)) : undefined
    },
    removeData: function(e) {
      return this.each(function() {
        h.removeData(this, e)
      })
    }
  }), h.extend({
    queue: function(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = h._data(e, t), n && (!r || h.isArray(n) ? r = h._data(e, t, h.makeArray(n)) : r.push(n)), r || []
    },
    dequeue: function(e, t) {
      t = t || "fx";
      var n = h.queue(e, t),
        r = n.length,
        i = n.shift(),
        s = h._queueHooks(e, t),
        o = function() {
          h.dequeue(e, t)
        };
      i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
    },
    _queueHooks: function(e, t) {
      var n = t + "queueHooks";
      return h._data(e, n) || h._data(e, n, {
        empty: h.Callbacks("once memory").add(function() {
          h._removeData(e, t + "queue"), h._removeData(e, n)
        })
      })
    }
  }), h.fn.extend({
    queue: function(e, t) {
      var n = 2;
      return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? h.queue(this[0], e) : t === undefined ? this : this.each(function() {
        var n = h.queue(this, e, t);
        h._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && h.dequeue(this, e)
      })
    },
    dequeue: function(e) {
      return this.each(function() {
        h.dequeue(this, e)
      })
    },
    clearQueue: function(e) {
      return this.queue(e || "fx", [])
    },
    promise: function(e, t) {
      var n, r = 1,
        i = h.Deferred(),
        s = this,
        o = this.length,
        u = function() {
          --r || i.resolveWith(s, [s])
        };
      typeof e != "string" && (t = e, e = undefined), e = e || "fx";
      while (o--) n = h._data(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
      return u(), i.promise(t)
    }
  });
  var W = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    X = ["Top", "Right", "Bottom", "Left"],
    V = function(e, t) {
      return e = t || e, h.css(e, "display") === "none" || !h.contains(e.ownerDocument, e)
    },
    $ = h.access = function(e, t, n, r, i, s, o) {
      var u = 0,
        a = e.length,
        f = n == null;
      if (h.type(n) === "object") {
        i = !0;
        for (u in n) h.access(e, t, u, n[u], !0, s, o)
      } else if (r !== undefined) {
        i = !0, h.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
          return f.call(h(e), n)
        }));
        if (t)
          for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
      }
      return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
    },
    J = /^(?:checkbox|radio)$/i;
  (function() {
    var e = T.createElement("input"),
      t = T.createElement("div"),
      n = T.createDocumentFragment();
    t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", l.leadingWhitespace = t.firstChild.nodeType === 3, l.tbody = !t.getElementsByTagName("tbody").length, l.htmlSerialize = !!t.getElementsByTagName("link").length, l.html5Clone = T.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", e.type = "checkbox", e.checked = !0, n.appendChild(e), l.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", l.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
      l.noCloneEvent = !1
    }), t.cloneNode(!0).click());
    if (l.deleteExpando == null) {
      l.deleteExpando = !0;
      try {
        delete t.test
      } catch (r) {
        l.deleteExpando = !1
      }
    }
  })(),
  function() {
    var t, n, r = T.createElement("div");
    for (t in {
        submit: !0,
        change: !0,
        focusin: !0
      }) n = "on" + t, (l[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), l[t + "Bubbles"] = r.attributes[n].expando === !1);
    r = null
  }();
  var K = /^(?:input|select|textarea)$/i,
    Q = /^key/,
    G = /^(?:mouse|pointer|contextmenu)|click/,
    Y = /^(?:focusinfocus|focusoutblur)$/,
    Z = /^([^.]*)(?:\.(.+)|)$/;
  h.event = {
    global: {},
    add: function(e, t, n, r, i) {
      var s, o, u, a, f, l, c, p, d, v, m, g = h._data(e);
      if (!g) return;
      n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = h.guid++), (o = g.events) || (o = g.events = {}), (l = g.handle) || (l = g.handle = function(e) {
        return typeof h === B || !!e && h.event.triggered === e.type ? undefined : h.event.dispatch.apply(l.elem, arguments)
      }, l.elem = e), t = (t || "").match(O) || [""], u = t.length;
      while (u--) {
        s = Z.exec(t[u]) || [], d = m = s[1], v = (s[2] || "").split(".").sort();
        if (!d) continue;
        f = h.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = h.event.special[d] || {}, c = h.extend({
          type: d,
          origType: m,
          data: r,
          handler: n,
          guid: n.guid,
          selector: i,
          needsContext: i && h.expr.match.needsContext.test(i),
          namespace: v.join(".")
        }, a);
        if (!(p = o[d])) {
          p = o[d] = [], p.delegateCount = 0;
          if (!f.setup || f.setup.call(e, r, v, l) === !1) e.addEventListener ? e.addEventListener(d, l, !1) : e.attachEvent && e.attachEvent("on" + d, l)
        }
        f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), h.event.global[d] = !0
      }
      e = null
    },
    remove: function(e, t, n, r, i) {
      var s, o, u, a, f, l, c, p, d, v, m, g = h.hasData(e) && h._data(e);
      if (!g || !(l = g.events)) return;
      t = (t || "").match(O) || [""], f = t.length;
      while (f--) {
        u = Z.exec(t[f]) || [], d = m = u[1], v = (u[2] || "").split(".").sort();
        if (!d) {
          for (d in l) h.event.remove(e, d + t[f], n, r, !0);
          continue
        }
        c = h.event.special[d] || {}, d = (r ? c.delegateType : c.bindType) || d, p = l[d] || [], u = u[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = p.length;
        while (s--) o = p[s], (i || m === o.origType) && (!n || n.guid === o.guid) && (!u || u.test(o.namespace)) && (!r || r === o.selector || r === "**" && o.selector) && (p.splice(s, 1), o.selector && p.delegateCount--, c.remove && c.remove.call(e, o));
        a && !p.length && ((!c.teardown || c.teardown.call(e, v, g.handle) === !1) && h.removeEvent(e, d, g.handle), delete l[d])
      }
      h.isEmptyObject(l) && (delete g.handle, h._removeData(e, "events"))
    },
    trigger: function(t, n, r, i) {
      var s, o, u, a, l, c, p, d = [r || T],
        v = f.call(t, "type") ? t.type : t,
        m = f.call(t, "namespace") ? t.namespace.split(".") : [];
      u = c = r = r || T;
      if (r.nodeType === 3 || r.nodeType === 8) return;
      if (Y.test(v + h.event.triggered)) return;
      v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), o = v.indexOf(":") < 0 && "on" + v, t = t[h.expando] ? t : new h.Event(v, typeof t == "object" && t), t.isTrigger = i ? 2 : 3, t.namespace = m.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = n == null ? [t] : h.makeArray(n, [t]), l = h.event.special[v] || {};
      if (!i && l.trigger && l.trigger.apply(r, n) === !1) return;
      if (!i && !l.noBubble && !h.isWindow(r)) {
        a = l.delegateType || v, Y.test(a + v) || (u = u.parentNode);
        for (; u; u = u.parentNode) d.push(u), c = u;
        c === (r.ownerDocument || T) && d.push(c.defaultView || c.parentWindow || e)
      }
      p = 0;
      while ((u = d[p++]) && !t.isPropagationStopped()) t.type = p > 1 ? a : l.bindType || v, s = (h._data(u, "events") || {})[t.type] && h._data(u, "handle"), s && s.apply(u, n), s = o && u[o], s && s.apply && h.acceptData(u) && (t.result = s.apply(u, n), t.result === !1 && t.preventDefault());
      t.type = v;
      if (!i && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), n) === !1) && h.acceptData(r) && o && r[v] && !h.isWindow(r)) {
        c = r[o], c && (r[o] = null), h.event.triggered = v;
        try {
          r[v]()
        } catch (g) {}
        h.event.triggered = undefined, c && (r[o] = c)
      }
      return t.result
    },
    dispatch: function(e) {
      e = h.event.fix(e);
      var t, n, i, s, o, u = [],
        a = r.call(arguments),
        f = (h._data(this, "events") || {})[e.type] || [],
        l = h.event.special[e.type] || {};
      a[0] = e, e.delegateTarget = this;
      if (l.preDispatch && l.preDispatch.call(this, e) === !1) return;
      u = h.event.handlers.call(this, e, f), t = 0;
      while ((s = u[t++]) && !e.isPropagationStopped()) {
        e.currentTarget = s.elem, o = 0;
        while ((i = s.handlers[o++]) && !e.isImmediatePropagationStopped())
          if (!e.namespace_re || e.namespace_re.test(i.namespace)) e.handleObj = i, e.data = i.data, n = ((h.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, a), n !== undefined && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation())
      }
      return l.postDispatch && l.postDispatch.call(this, e), e.result
    },
    handlers: function(e, t) {
      var n, r, i, s, o = [],
        u = t.delegateCount,
        a = e.target;
      if (u && a.nodeType && (!e.button || e.type !== "click"))
        for (; a != this; a = a.parentNode || this)
          if (a.nodeType === 1 && (a.disabled !== !0 || e.type !== "click")) {
            i = [];
            for (s = 0; s < u; s++) r = t[s], n = r.selector + " ", i[n] === undefined && (i[n] = r.needsContext ? h(n, this).index(a) >= 0 : h.find(n, this, null, [a]).length), i[n] && i.push(r);
            i.length && o.push({
              elem: a,
              handlers: i
            })
          }
      return u < t.length && o.push({
        elem: this,
        handlers: t.slice(u)
      }), o
    },
    fix: function(e) {
      if (e[h.expando]) return e;
      var t, n, r, i = e.type,
        s = e,
        o = this.fixHooks[i];
      o || (this.fixHooks[i] = o = G.test(i) ? this.mouseHooks : Q.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new h.Event(s), t = r.length;
      while (t--) n = r[t], e[n] = s[n];
      return e.target || (e.target = s.srcElement || T), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, s) : e
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(e, t) {
        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(e, t) {
        var n, r, i, s = t.button,
          o = t.fromElement;
        return e.pageX == null && t.clientX != null && (r = e.target.ownerDocument || T, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          if (this !== nt() && this.focus) try {
            return this.focus(), !1
          } catch (e) {}
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === nt() && this.blur) return this.blur(), !1
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (h.nodeName(this, "input") && this.type === "checkbox" && this.click) return this.click(), !1
        },
        _default: function(e) {
          return h.nodeName(e.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(e) {
          e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function(e, t, n, r) {
      var i = h.extend(new h.Event, n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      r ? h.event.trigger(i, null, t) : h.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }
  }, h.removeEvent = T.removeEventListener ? function(e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  } : function(e, t, n) {
    var r = "on" + t;
    e.detachEvent && (typeof e[r] === B && (e[r] = null), e.detachEvent(r, n))
  }, h.Event = function(e, t) {
    if (!(this instanceof h.Event)) return new h.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === !1 ? et : tt) : this.type = e, t && h.extend(this, t), this.timeStamp = e && e.timeStamp || h.now(), this[h.expando] = !0
  }, h.Event.prototype = {
    isDefaultPrevented: tt,
    isPropagationStopped: tt,
    isImmediatePropagationStopped: tt,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = et;
      if (!e) return;
      e.preventDefault ? e.preventDefault() : e.returnValue = !1
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = et;
      if (!e) return;
      e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = et, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, h.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(e, t) {
    h.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function(e) {
        var n, r = this,
          i = e.relatedTarget,
          s = e.handleObj;
        if (!i || i !== r && !h.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
        return n
      }
    }
  }), l.submitBubbles || (h.event.special.submit = {
    setup: function() {
      if (h.nodeName(this, "form")) return !1;
      h.event.add(this, "click._submit keypress._submit", function(e) {
        var t = e.target,
          n = h.nodeName(t, "input") || h.nodeName(t, "button") ? t.form : undefined;
        n && !h._data(n, "submitBubbles") && (h.event.add(n, "submit._submit", function(e) {
          e._submit_bubble = !0
        }), h._data(n, "submitBubbles", !0))
      })
    },
    postDispatch: function(e) {
      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && h.event.simulate("submit", this.parentNode, e, !0))
    },
    teardown: function() {
      if (h.nodeName(this, "form")) return !1;
      h.event.remove(this, "._submit")
    }
  }), l.changeBubbles || (h.event.special.change = {
    setup: function() {
      if (K.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio") h.event.add(this, "propertychange._change", function(e) {
          e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
        }), h.event.add(this, "click._change", function(e) {
          this._just_changed && !e.isTrigger && (this._just_changed = !1), h.event.simulate("change", this, e, !0)
        });
        return !1
      }
      h.event.add(this, "beforeactivate._change", function(e) {
        var t = e.target;
        K.test(t.nodeName) && !h._data(t, "changeBubbles") && (h.event.add(t, "change._change", function(e) {
          this.parentNode && !e.isSimulated && !e.isTrigger && h.event.simulate("change", this.parentNode, e, !0)
        }), h._data(t, "changeBubbles", !0))
      })
    },
    handle: function(e) {
      var t = e.target;
      if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
    },
    teardown: function() {
      return h.event.remove(this, "._change"), !K.test(this.nodeName)
    }
  }), l.focusinBubbles || h.each({
    focus: "focusin",
    blur: "focusout"
  }, function(e, t) {
    var n = function(e) {
      h.event.simulate(t, e.target, h.event.fix(e), !0)
    };
    h.event.special[t] = {
      setup: function() {
        var r = this.ownerDocument || this,
          i = h._data(r, t);
        i || r.addEventListener(e, n, !0), h._data(r, t, (i || 0) + 1)
      },
      teardown: function() {
        var r = this.ownerDocument || this,
          i = h._data(r, t) - 1;
        i ? h._data(r, t, i) : (r.removeEventListener(e, n, !0), h._removeData(r, t))
      }
    }
  }), h.fn.extend({
    on: function(e, t, n, r, i) {
      var s, o;
      if (typeof e == "object") {
        typeof t != "string" && (n = n || t, t = undefined);
        for (s in e) this.on(s, t, n, e[s], i);
        return this
      }
      n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
      if (r === !1) r = tt;
      else if (!r) return this;
      return i === 1 && (o = r, r = function(e) {
        return h().off(e), o.apply(this, arguments)
      }, r.guid = o.guid || (o.guid = h.guid++)), this.each(function() {
        h.event.add(this, e, r, n, t)
      })
    },
    one: function(e, t, n, r) {
      return this.on(e, t, n, r, 1)
    },
    off: function(e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, h(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if (typeof e == "object") {
        for (i in e) this.off(i, t, e[i]);
        return this
      }
      if (t === !1 || typeof t == "function") n = t, t = undefined;
      return n === !1 && (n = tt), this.each(function() {
        h.event.remove(this, e, n, t)
      })
    },
    trigger: function(e, t) {
      return this.each(function() {
        h.event.trigger(e, t, this)
      })
    },
    triggerHandler: function(e, t) {
      var n = this[0];
      if (n) return h.event.trigger(e, t, n, !0)
    }
  });
  var it = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    st = / jQuery\d+="(?:null|\d+)"/g,
    ot = new RegExp("<(?:" + it + ")[\\s/>]", "i"),
    ut = /^\s+/,
    at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    ft = /<([\w:]+)/,
    lt = /<tbody/i,
    ct = /<|&#?\w+;/,
    ht = /<(?:script|style|link)/i,
    pt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    dt = /^$|\/(?:java|ecma)script/i,
    vt = /^true\/(.*)/,
    mt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    gt = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    yt = rt(T),
    bt = yt.appendChild(T.createElement("div"));
  gt.optgroup = gt.option, gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead, gt.th = gt.td, h.extend({
    clone: function(e, t, n) {
      var r, i, s, o, u, a = h.contains(e.ownerDocument, e);
      l.html5Clone || h.isXMLDoc(e) || !ot.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (bt.innerHTML = e.outerHTML, bt.removeChild(s = bt.firstChild));
      if ((!l.noCloneEvent || !l.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !h.isXMLDoc(e)) {
        r = wt(s), u = wt(e);
        for (o = 0;
          (i = u[o]) != null; ++o) r[o] && kt(i, r[o])
      }
      if (t)
        if (n) {
          u = u || wt(e), r = r || wt(s);
          for (o = 0;
            (i = u[o]) != null; o++) Ct(i, r[o])
        } else Ct(e, s);
      return r = wt(s, "script"), r.length > 0 && Nt(r, !a && wt(e, "script")), r = u = i = null, s
    },
    buildFragment: function(e, t, n, r) {
      var i, s, o, u, a, f, c, p = e.length,
        d = rt(t),
        v = [],
        m = 0;
      for (; m < p; m++) {
        s = e[m];
        if (s || s === 0)
          if (h.type(s) === "object") h.merge(v, s.nodeType ? [s] : s);
          else if (!ct.test(s)) v.push(t.createTextNode(s));
        else {
          u = u || d.appendChild(t.createElement("div")), a = (ft.exec(s) || ["", ""])[1].toLowerCase(), c = gt[a] || gt._default, u.innerHTML = c[1] + s.replace(at, "<$1></$2>") + c[2], i = c[0];
          while (i--) u = u.lastChild;
          !l.leadingWhitespace && ut.test(s) && v.push(t.createTextNode(ut.exec(s)[0]));
          if (!l.tbody) {
            s = a === "table" && !lt.test(s) ? u.firstChild : c[1] === "<table>" && !lt.test(s) ? u : 0, i = s && s.childNodes.length;
            while (i--) h.nodeName(f = s.childNodes[i], "tbody") && !f.childNodes.length && s.removeChild(f)
          }
          h.merge(v, u.childNodes), u.textContent = "";
          while (u.firstChild) u.removeChild(u.firstChild);
          u = d.lastChild
        }
      }
      u && d.removeChild(u), l.appendChecked || h.grep(wt(v, "input"), Et), m = 0;
      while (s = v[m++]) {
        if (r && h.inArray(s, r) !== -1) continue;
        o = h.contains(s.ownerDocument, s), u = wt(d.appendChild(s), "script"), o && Nt(u);
        if (n) {
          i = 0;
          while (s = u[i++]) dt.test(s.type || "") && n.push(s)
        }
      }
      return u = null, d
    },
    cleanData: function(e, t) {
      var r, i, s, o, u = 0,
        a = h.expando,
        f = h.cache,
        c = l.deleteExpando,
        p = h.event.special;
      for (;
        (r = e[u]) != null; u++)
        if (t || h.acceptData(r)) {
          s = r[a], o = s && f[s];
          if (o) {
            if (o.events)
              for (i in o.events) p[i] ? h.event.remove(r, i) : h.removeEvent(r, i, o.handle);
            f[s] && (delete f[s], c ? delete r[a] : typeof r.removeAttribute !== B ? r.removeAttribute(a) : r[a] = null, n.push(s))
          }
        }
    }
  }), h.fn.extend({
    text: function(e) {
      return $(this, function(e) {
        return e === undefined ? h.text(this) : this.empty().append((this[0] && this[0].ownerDocument || T).createTextNode(e))
      }, null, e, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(e) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var t = St(this, e);
          t.appendChild(e)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(e) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var t = St(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    },
    remove: function(e, t) {
      var n, r = e ? h.filter(e, this) : this,
        i = 0;
      for (;
        (n = r[i]) != null; i++) !t && n.nodeType === 1 && h.cleanData(wt(n)), n.parentNode && (t && h.contains(n.ownerDocument, n) && Nt(wt(n, "script")), n.parentNode.removeChild(n));
      return this
    },
    empty: function() {
      var e, t = 0;
      for (;
        (e = this[t]) != null; t++) {
        e.nodeType === 1 && h.cleanData(wt(e, !1));
        while (e.firstChild) e.removeChild(e.firstChild);
        e.options && h.nodeName(e, "select") && (e.options.length = 0)
      }
      return this
    },
    clone: function(e, t) {
      return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
        return h.clone(this, e, t)
      })
    },
    html: function(e) {
      return $(this, function(e) {
        var t = this[0] || {},
          n = 0,
          r = this.length;
        if (e === undefined) return t.nodeType === 1 ? t.innerHTML.replace(st, "") : undefined;
        if (typeof e == "string" && !ht.test(e) && (l.htmlSerialize || !ot.test(e)) && (l.leadingWhitespace || !ut.test(e)) && !gt[(ft.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = e.replace(at, "<$1></$2>");
          try {
            for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (h.cleanData(wt(t, !1)), t.innerHTML = e);
            t = 0
          } catch (i) {}
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    },
    replaceWith: function() {
      var e = arguments[0];
      return this.domManip(arguments, function(t) {
        e = this.parentNode, h.cleanData(wt(this)), e && e.replaceChild(t, this)
      }), e && (e.length || e.nodeType) ? this : this.remove()
    },
    detach: function(e) {
      return this.remove(e, !0)
    },
    domManip: function(e, t) {
      e = i.apply([], e);
      var n, r, s, o, u, a, f = 0,
        c = this.length,
        p = this,
        d = c - 1,
        v = e[0],
        m = h.isFunction(v);
      if (m || c > 1 && typeof v == "string" && !l.checkClone && pt.test(v)) return this.each(function(n) {
        var r = p.eq(n);
        m && (e[0] = v.call(this, n, r.html())), r.domManip(e, t)
      });
      if (c) {
        a = h.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, a.childNodes.length === 1 && (a = n);
        if (n) {
          o = h.map(wt(a, "script"), xt), s = o.length;
          for (; f < c; f++) r = a, f !== d && (r = h.clone(r, !0, !0), s && h.merge(o, wt(r, "script"))), t.call(this[f], r, f);
          if (s) {
            u = o[o.length - 1].ownerDocument, h.map(o, Tt);
            for (f = 0; f < s; f++) r = o[f], dt.test(r.type || "") && !h._data(r, "globalEval") && h.contains(u, r) && (r.src ? h._evalUrl && h._evalUrl(r.src) : h.globalEval((r.text || r.textContent || r.innerHTML || "").replace(mt, "")))
          }
          a = n = null
        }
      }
      return this
    }
  }), h.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(e, t) {
    h.fn[e] = function(e) {
      var n, r = 0,
        i = [],
        o = h(e),
        u = o.length - 1;
      for (; r <= u; r++) n = r === u ? this : this.clone(!0), h(o[r])[t](n), s.apply(i, n.get());
      return this.pushStack(i)
    }
  });
  var Lt, At = {};
  (function() {
    var e;
    l.shrinkWrapBlocks = function() {
      if (e != null) return e;
      e = !1;
      var t, n, r;
      n = T.getElementsByTagName("body")[0];
      if (!n || !n.style) return;
      return t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(T.createElement("div")).style.width = "5px", e = t.offsetWidth !== 3), n.removeChild(r), e
    }
  })();
  var _t = /^margin/,
    Dt = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"),
    Pt, Ht, Bt = /^(top|right|bottom|left)$/;
  e.getComputedStyle ? (Pt = function(e) {
      return e.ownerDocument.defaultView.getComputedStyle(e, null)
    }, Ht = function(e, t, n) {
      var r, i, s, o, u = e.style;
      return n = n || Pt(e), o = n ? n.getPropertyValue(t) || n[t] : undefined, n && (o === "" && !h.contains(e.ownerDocument, e) && (o = h.style(e, t)), Dt.test(o) && _t.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), o === undefined ? o : o + ""
    }) : T.documentElement.currentStyle && (Pt = function(e) {
      return e.currentStyle
    }, Ht = function(e, t, n) {
      var r, i, s, o, u = e.style;
      return n = n || Pt(e), o = n ? n[t] : undefined, o == null && u && u[t] && (o = u[t]), Dt.test(o) && !Bt.test(t) && (r = u.left, i = e.runtimeStyle, s = i && i.left, s && (i.left = e.currentStyle.left), u.left = t === "fontSize" ? "1em" : o, o = u.pixelLeft + "px", u.left = r, s && (i.left = s)), o === undefined ? o : o + "" || "auto"
    }),
    function() {
      function a() {
        var t, n, r, a;
        n = T.getElementsByTagName("body")[0];
        if (!n || !n.style) return;
        t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i = s = !1, u = !0, e.getComputedStyle && (i = (e.getComputedStyle(t, null) || {}).top !== "1%", s = (e.getComputedStyle(t, null) || {
          width: "4px"
        }).width === "4px", a = t.appendChild(T.createElement("div")), a.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", a.style.marginRight = a.style.width = "0", t.style.width = "1px", u = !parseFloat((e.getComputedStyle(a, null) || {}).marginRight)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = t.getElementsByTagName("td"), a[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = a[0].offsetHeight === 0, o && (a[0].style.display = "", a[1].style.display = "none", o = a[0].offsetHeight === 0), n.removeChild(r)
      }
      var t, n, r, i, s, o, u;
      t = T.createElement("div"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = r && r.style;
      if (!n) return;
      n.cssText = "float:left;opacity:.5", l.opacity = n.opacity === "0.5", l.cssFloat = !!n.cssFloat, t.style.backgroundClip = "content-box", t.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = t.style.backgroundClip === "content-box", l.boxSizing = n.boxSizing === "" || n.MozBoxSizing === "" || n.WebkitBoxSizing === "", h.extend(l, {
        reliableHiddenOffsets: function() {
          return o == null && a(), o
        },
        boxSizingReliable: function() {
          return s == null && a(), s
        },
        pixelPosition: function() {
          return i == null && a(), i
        },
        reliableMarginRight: function() {
          return u == null && a(), u
        }
      })
    }(), h.swap = function(e, t, n, r) {
      var i, s, o = {};
      for (s in t) o[s] = e.style[s], e.style[s] = t[s];
      i = n.apply(e, r || []);
      for (s in t) e.style[s] = o[s];
      return i
    };
  var Ft = /alpha\([^)]*\)/i,
    It = /opacity\s*=\s*([^)]*)/,
    qt = /^(none|table(?!-c[ea]).+)/,
    Rt = new RegExp("^(" + W + ")(.*)$", "i"),
    Ut = new RegExp("^([+-])=(" + W + ")", "i"),
    zt = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    Wt = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    Xt = ["Webkit", "O", "Moz", "ms"];
  h.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = Ht(e, "opacity");
            return n === "" ? "1" : n
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": l.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function(e, t, n, r) {
      if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
      var i, s, o, u = h.camelCase(t),
        a = e.style;
      t = h.cssProps[u] || (h.cssProps[u] = Vt(a, u)), o = h.cssHooks[t] || h.cssHooks[u];
      if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
      s = typeof n, s === "string" && (i = Ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(h.css(e, t)), s = "number");
      if (n == null || n !== n) return;
      s === "number" && !h.cssNumber[u] && (n += "px"), !l.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
      if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) try {
        a[t] = n
      } catch (f) {}
    },
    css: function(e, t, n, r) {
      var i, s, o, u = h.camelCase(t);
      return t = h.cssProps[u] || (h.cssProps[u] = Vt(e.style, u)), o = h.cssHooks[t] || h.cssHooks[u], o && "get" in o && (s = o.get(e, !0, n)), s === undefined && (s = Ht(e, t, r)), s === "normal" && t in Wt && (s = Wt[t]), n === "" || n ? (i = parseFloat(s), n === !0 || h.isNumeric(i) ? i || 0 : s) : s
    }
  }), h.each(["height", "width"], function(e, t) {
    h.cssHooks[t] = {
      get: function(e, n, r) {
        if (n) return qt.test(h.css(e, "display")) && e.offsetWidth === 0 ? h.swap(e, zt, function() {
          return Qt(e, t, r)
        }) : Qt(e, t, r)
      },
      set: function(e, n, r) {
        var i = r && Pt(e);
        return Jt(e, n, r ? Kt(e, t, r, l.boxSizing && h.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
      }
    }
  }), l.opacity || (h.cssHooks.opacity = {
    get: function(e, t) {
      return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    },
    set: function(e, t) {
      var n = e.style,
        r = e.currentStyle,
        i = h.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
        s = r && r.filter || n.filter || "";
      n.zoom = 1;
      if ((t >= 1 || t === "") && h.trim(s.replace(Ft, "")) === "" && n.removeAttribute) {
        n.removeAttribute("filter");
        if (t === "" || r && !r.filter) return
      }
      n.filter = Ft.test(s) ? s.replace(Ft, i) : s + " " + i
    }
  }), h.cssHooks.marginRight = jt(l.reliableMarginRight, function(e, t) {
    if (t) return h.swap(e, {
      display: "inline-block"
    }, Ht, [e, "marginRight"])
  }), h.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(e, t) {
    h.cssHooks[e + t] = {
      expand: function(n) {
        var r = 0,
          i = {},
          s = typeof n == "string" ? n.split(" ") : [n];
        for (; r < 4; r++) i[e + X[r] + t] = s[r] || s[r - 2] || s[0];
        return i
      }
    }, _t.test(e) || (h.cssHooks[e + t].set = Jt)
  }), h.fn.extend({
    css: function(e, t) {
      return $(this, function(e, t, n) {
        var r, i, s = {},
          o = 0;
        if (h.isArray(t)) {
          r = Pt(e), i = t.length;
          for (; o < i; o++) s[t[o]] = h.css(e, t[o], !1, r);
          return s
        }
        return n !== undefined ? h.style(e, t, n) : h.css(e, t)
      }, e, t, arguments.length > 1)
    },
    show: function() {
      return $t(this, !0)
    },
    hide: function() {
      return $t(this)
    },
    toggle: function(e) {
      return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
        V(this) ? h(this).show() : h(this).hide()
      })
    }
  }), h.Tween = Gt, Gt.prototype = {
    constructor: Gt,
    init: function(e, t, n, r, i, s) {
      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (h.cssNumber[n] ? "" : "px")
    },
    cur: function() {
      var e = Gt.propHooks[this.prop];
      return e && e.get ? e.get(this) : Gt.propHooks._default.get(this)
    },
    run: function(e) {
      var t, n = Gt.propHooks[this.prop];
      return this.options.duration ? this.pos = t = h.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Gt.propHooks._default.set(this), this
    }
  }, Gt.prototype.init.prototype = Gt.prototype, Gt.propHooks = {
    _default: {
      get: function(e) {
        var t;
        return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = h.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
      },
      set: function(e) {
        h.fx.step[e.prop] ? h.fx.step[e.prop](e) : e.elem.style && (e.elem.style[h.cssProps[e.prop]] != null || h.cssHooks[e.prop]) ? h.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, Gt.propHooks.scrollTop = Gt.propHooks.scrollLeft = {
    set: function(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, h.easing = {
    linear: function(e) {
      return e
    },
    swing: function(e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, h.fx = Gt.prototype.init, h.fx.step = {};
  var Yt, Zt, en = /^(?:toggle|show|hide)$/,
    tn = new RegExp("^(?:([+-])=|)(" + W + ")([a-z%]*)$", "i"),
    nn = /queueHooks$/,
    rn = [fn],
    sn = {
      "*": [function(e, t) {
        var n = this.createTween(e, t),
          r = n.cur(),
          i = tn.exec(t),
          s = i && i[3] || (h.cssNumber[e] ? "" : "px"),
          o = (h.cssNumber[e] || s !== "px" && +r) && tn.exec(h.css(n.elem, e)),
          u = 1,
          a = 20;
        if (o && o[3] !== s) {
          s = s || o[3], i = i || [], o = +r || 1;
          do u = u || ".5", o /= u, h.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
        }
        return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
      }]
    };
  h.Animation = h.extend(cn, {
      tweener: function(e, t) {
        h.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        var n, r = 0,
          i = e.length;
        for (; r < i; r++) n = e[r], sn[n] = sn[n] || [], sn[n].unshift(t)
      },
      prefilter: function(e, t) {
        t ? rn.unshift(e) : rn.push(e)
      }
    }), h.speed = function(e, t, n) {
      var r = e && typeof e == "object" ? h.extend({}, e) : {
        complete: n || !n && t || h.isFunction(e) && e,
        duration: e,
        easing: n && t || t && !h.isFunction(t) && t
      };
      r.duration = h.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in h.fx.speeds ? h.fx.speeds[r.duration] : h.fx.speeds._default;
      if (r.queue == null || r.queue === !0) r.queue = "fx";
      return r.old = r.complete, r.complete = function() {
        h.isFunction(r.old) && r.old.call(this), r.queue && h.dequeue(this, r.queue)
      }, r
    }, h.fn.extend({
      fadeTo: function(e, t, n, r) {
        return this.filter(V).css("opacity", 0).show().end().animate({
          opacity: t
        }, e, n, r)
      },
      animate: function(e, t, n, r) {
        var i = h.isEmptyObject(e),
          s = h.speed(t, n, r),
          o = function() {
            var t = cn(this, h.extend({}, e), s);
            (i || h._data(this, "finish")) && t.stop(!0)
          };
        return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
      },
      stop: function(e, t, n) {
        var r = function(e) {
          var t = e.stop;
          delete e.stop, t(n)
        };
        return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
          var t = !0,
            i = e != null && e + "queueHooks",
            s = h.timers,
            o = h._data(this);
          if (i) o[i] && o[i].stop && r(o[i]);
          else
            for (i in o) o[i] && o[i].stop && nn.test(i) && r(o[i]);
          for (i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
          (t || !n) && h.dequeue(this, e)
        })
      },
      finish: function(e) {
        return e !== !1 && (e = e || "fx"), this.each(function() {
          var t, n = h._data(this),
            r = n[e + "queue"],
            i = n[e + "queueHooks"],
            s = h.timers,
            o = r ? r.length : 0;
          n.finish = !0, h.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
          for (t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
          for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
          delete n.finish
        })
      }
    }), h.each(["toggle", "show", "hide"], function(e, t) {
      var n = h.fn[t];
      h.fn[t] = function(e, r, i) {
        return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(un(t, !0), e, r, i)
      }
    }), h.each({
      slideDown: un("show"),
      slideUp: un("hide"),
      slideToggle: un("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function(e, t) {
      h.fn[e] = function(e, n, r) {
        return this.animate(t, e, n, r)
      }
    }), h.timers = [], h.fx.tick = function() {
      var e, t = h.timers,
        n = 0;
      Yt = h.now();
      for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
      t.length || h.fx.stop(), Yt = undefined
    }, h.fx.timer = function(e) {
      h.timers.push(e), e() ? h.fx.start() : h.timers.pop()
    }, h.fx.interval = 13, h.fx.start = function() {
      Zt || (Zt = setInterval(h.fx.tick, h.fx.interval))
    }, h.fx.stop = function() {
      clearInterval(Zt), Zt = null
    }, h.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, h.fn.delay = function(e, t) {
      return e = h.fx ? h.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
        var r = setTimeout(t, e);
        n.stop = function() {
          clearTimeout(r)
        }
      })
    },
    function() {
      var e, t, n, r, i;
      t = T.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = T.createElement("select"), i = n.appendChild(T.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", l.getSetAttribute = t.className !== "t", l.style = /top/.test(r.getAttribute("style")), l.hrefNormalized = r.getAttribute("href") === "/a", l.checkOn = !!e.value, l.optSelected = i.selected, l.enctype = !!T.createElement("form").enctype, n.disabled = !0, l.optDisabled = !i.disabled, e = T.createElement("input"), e.setAttribute("value", ""), l.input = e.getAttribute("value") === "", e.value = "t", e.setAttribute("type", "radio"), l.radioValue = e.value === "t"
    }();
  var hn = /\r/g;
  h.fn.extend({
    val: function(e) {
      var t, n, r, i = this[0];
      if (!arguments.length) {
        if (i) return t = h.valHooks[i.type] || h.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(hn, "") : n == null ? "" : n);
        return
      }
      return r = h.isFunction(e), this.each(function(n) {
        var i;
        if (this.nodeType !== 1) return;
        r ? i = e.call(this, n, h(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : h.isArray(i) && (i = h.map(i, function(e) {
          return e == null ? "" : e + ""
        })), t = h.valHooks[this.type] || h.valHooks[this.nodeName.toLowerCase()];
        if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
      })
    }
  }), h.extend({
    valHooks: {
      option: {
        get: function(e) {
          var t = h.find.attr(e, "value");
          return t != null ? t : h.trim(h.text(e))
        }
      },
      select: {
        get: function(e) {
          var t, n, r = e.options,
            i = e.selectedIndex,
            s = e.type === "select-one" || i < 0,
            o = s ? null : [],
            u = s ? i + 1 : r.length,
            a = i < 0 ? u : s ? i : 0;
          for (; a < u; a++) {
            n = r[a];
            if ((n.selected || a === i) && (l.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !h.nodeName(n.parentNode, "optgroup"))) {
              t = h(n).val();
              if (s) return t;
              o.push(t)
            }
          }
          return o
        },
        set: function(e, t) {
          var n, r, i = e.options,
            s = h.makeArray(t),
            o = i.length;
          while (o--) {
            r = i[o];
            if (h.inArray(h.valHooks.option.get(r), s) >= 0) try {
              r.selected = n = !0
            } catch (u) {
              r.scrollHeight
            } else r.selected = !1
          }
          return n || (e.selectedIndex = -1), i
        }
      }
    }
  }), h.each(["radio", "checkbox"], function() {
    h.valHooks[this] = {
      set: function(e, t) {
        if (h.isArray(t)) return e.checked = h.inArray(h(e).val(), t) >= 0
      }
    }, l.checkOn || (h.valHooks[this].get = function(e) {
      return e.getAttribute("value") === null ? "on" : e.value
    })
  });
  var pn, dn, vn = h.expr.attrHandle,
    mn = /^(?:checked|selected)$/i,
    gn = l.getSetAttribute,
    yn = l.input;
  h.fn.extend({
    attr: function(e, t) {
      return $(this, h.attr, e, t, arguments.length > 1)
    },
    removeAttr: function(e) {
      return this.each(function() {
        h.removeAttr(this, e)
      })
    }
  }), h.extend({
    attr: function(e, t, n) {
      var r, i, s = e.nodeType;
      if (!e || s === 3 || s === 8 || s === 2) return;
      if (typeof e.getAttribute === B) return h.prop(e, t, n);
      if (s !== 1 || !h.isXMLDoc(e)) t = t.toLowerCase(), r = h.attrHooks[t] || (h.expr.match.bool.test(t) ? dn : pn);
      if (n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = h.find.attr(e, t), i == null ? undefined : i);
      if (n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
      h.removeAttr(e, t)
    },
    removeAttr: function(e, t) {
      var n, r, i = 0,
        s = t && t.match(O);
      if (s && e.nodeType === 1)
        while (n = s[i++]) r = h.propFix[n] || n, h.expr.match.bool.test(n) ? yn && gn || !mn.test(n) ? e[r] = !1 : e[h.camelCase("default-" + n)] = e[r] = !1 : h.attr(e, n, ""), e.removeAttribute(gn ? n : r)
    },
    attrHooks: {
      type: {
        set: function(e, t) {
          if (!l.radioValue && t === "radio" && h.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    }
  }), dn = {
    set: function(e, t, n) {
      return t === !1 ? h.removeAttr(e, n) : yn && gn || !mn.test(n) ? e.setAttribute(!gn && h.propFix[n] || n, n) : e[h.camelCase("default-" + n)] = e[n] = !0, n
    }
  }, h.each(h.expr.match.bool.source.match(/\w+/g), function(e, t) {
    var n = vn[t] || h.find.attr;
    vn[t] = yn && gn || !mn.test(t) ? function(e, t, r) {
      var i, s;
      return r || (s = vn[t], vn[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, vn[t] = s), i
    } : function(e, t, n) {
      if (!n) return e[h.camelCase("default-" + t)] ? t.toLowerCase() : null
    }
  });
  if (!yn || !gn) h.attrHooks.value = {
    set: function(e, t, n) {
      if (!h.nodeName(e, "input")) return pn && pn.set(e, t, n);
      e.defaultValue = t
    }
  };
  gn || (pn = {
    set: function(e, t, n) {
      var r = e.getAttributeNode(n);
      r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "";
      if (n === "value" || t === e.getAttribute(n)) return t
    }
  }, vn.id = vn.name = vn.coords = function(e, t, n) {
    var r;
    if (!n) return (r = e.getAttributeNode(t)) && r.value !== "" ? r.value : null
  }, h.valHooks.button = {
    get: function(e, t) {
      var n = e.getAttributeNode(t);
      if (n && n.specified) return n.value
    },
    set: pn.set
  }, h.attrHooks.contenteditable = {
    set: function(e, t, n) {
      pn.set(e, t === "" ? !1 : t, n)
    }
  }, h.each(["width", "height"], function(e, t) {
    h.attrHooks[t] = {
      set: function(e, n) {
        if (n === "") return e.setAttribute(t, "auto"), n
      }
    }
  })), l.style || (h.attrHooks.style = {
    get: function(e) {
      return e.style.cssText || undefined
    },
    set: function(e, t) {
      return e.style.cssText = t + ""
    }
  });
  var bn = /^(?:input|select|textarea|button|object)$/i,
    wn = /^(?:a|area)$/i;
  h.fn.extend({
    prop: function(e, t) {
      return $(this, h.prop, e, t, arguments.length > 1)
    },
    removeProp: function(e) {
      return e = h.propFix[e] || e, this.each(function() {
        try {
          this[e] = undefined, delete this[e]
        } catch (t) {}
      })
    }
  }), h.extend({
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(e, t, n) {
      var r, i, s, o = e.nodeType;
      if (!e || o === 3 || o === 8 || o === 2) return;
      return s = o !== 1 || !h.isXMLDoc(e), s && (t = h.propFix[t] || t, i = h.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
    },
    propHooks: {
      tabIndex: {
        get: function(e) {
          var t = h.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : bn.test(e.nodeName) || wn.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    }
  }), l.hrefNormalized || h.each(["href", "src"], function(e, t) {
    h.propHooks[t] = {
      get: function(e) {
        return e.getAttribute(t, 4)
      }
    }
  }), l.optSelected || (h.propHooks.selected = {
    get: function(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }
  }), h.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    h.propFix[this.toLowerCase()] = this
  }), l.enctype || (h.propFix.enctype = "encoding");
  var En = /[\t\r\n\f]/g;
  h.fn.extend({
    addClass: function(e) {
      var t, n, r, i, s, o, u = 0,
        a = this.length,
        f = typeof e == "string" && e;
      if (h.isFunction(e)) return this.each(function(t) {
        h(this).addClass(e.call(this, t, this.className))
      });
      if (f) {
        t = (e || "").match(O) || [];
        for (; u < a; u++) {
          n = this[u], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(En, " ") : " ");
          if (r) {
            s = 0;
            while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
            o = h.trim(r), n.className !== o && (n.className = o)
          }
        }
      }
      return this
    },
    removeClass: function(e) {
      var t, n, r, i, s, o, u = 0,
        a = this.length,
        f = arguments.length === 0 || typeof e == "string" && e;
      if (h.isFunction(e)) return this.each(function(t) {
        h(this).removeClass(e.call(this, t, this.className))
      });
      if (f) {
        t = (e || "").match(O) || [];
        for (; u < a; u++) {
          n = this[u], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(En, " ") : "");
          if (r) {
            s = 0;
            while (i = t[s++])
              while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
            o = e ? h.trim(r) : "", n.className !== o && (n.className = o)
          }
        }
      }
      return this
    },
    toggleClass: function(e, t) {
      var n = typeof e;
      return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : h.isFunction(e) ? this.each(function(n) {
        h(this).toggleClass(e.call(this, n, this.className, t), t)
      }) : this.each(function() {
        if (n === "string") {
          var t, r = 0,
            i = h(this),
            s = e.match(O) || [];
          while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
        } else if (n === B || n === "boolean") this.className && h._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : h._data(this, "__className__") || ""
      })
    },
    hasClass: function(e) {
      var t = " " + e + " ",
        n = 0,
        r = this.length;
      for (; n < r; n++)
        if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(En, " ").indexOf(t) >= 0) return !0;
      return !1
    }
  }), h.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
    h.fn[t] = function(e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), h.fn.extend({
    hover: function(e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    },
    bind: function(e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
      return this.off(e, null, t)
    },
    delegate: function(e, t, n, r) {
      return this.on(t, e, n, r)
    },
    undelegate: function(e, t, n) {
      return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  });
  var Sn = h.now(),
    xn = /\?/,
    Tn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  h.parseJSON = function(t) {
    if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
    var n, r = null,
      i = h.trim(t + "");
    return i && !h.trim(i.replace(Tn, function(e, t, i, s) {
      return n && t && (r = 0), r === 0 ? e : (n = i || t, r += !s - !i, "")
    })) ? Function("return " + i)() : h.error("Invalid JSON: " + t)
  }, h.parseXML = function(t) {
    var n, r;
    if (!t || typeof t != "string") return null;
    try {
      e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
    } catch (i) {
      n = undefined
    }
    return (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) && h.error("Invalid XML: " + t), n
  };
  var Nn, Cn, kn = /#.*$/,
    Ln = /([?&])_=[^&]*/,
    An = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
    On = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Mn = /^(?:GET|HEAD)$/,
    _n = /^\/\//,
    Dn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Pn = {},
    Hn = {},
    Bn = "*/".concat("*");
  try {
    Cn = location.href
  } catch (jn) {
    Cn = T.createElement("a"), Cn.href = "", Cn = Cn.href
  }
  Nn = Dn.exec(Cn.toLowerCase()) || [], h.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Cn,
      type: "GET",
      isLocal: On.test(Nn[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Bn,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": h.parseJSON,
        "text xml": h.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(e, t) {
      return t ? qn(qn(e, h.ajaxSettings), t) : qn(h.ajaxSettings, e)
    },
    ajaxPrefilter: Fn(Pn),
    ajaxTransport: Fn(Hn),
    ajax: function(e, t) {
      function x(e, t, n, r) {
        var f, g, y, w, S, x = t;
        if (b === 2) return;
        b = 2, o && clearTimeout(o), a = undefined, s = r || "", E.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, n && (w = Rn(l, E, n)), w = Un(l, w, E, f);
        if (f) l.ifModified && (S = E.getResponseHeader("Last-Modified"), S && (h.lastModified[i] = S), S = E.getResponseHeader("etag"), S && (h.etag[i] = S)), e === 204 || l.type === "HEAD" ? x = "nocontent" : e === 304 ? x = "notmodified" : (x = w.state, g = w.data, y = w.error, f = !y);
        else {
          y = x;
          if (e || !x) x = "error", e < 0 && (e = 0)
        }
        E.status = e, E.statusText = (t || x) + "", f ? d.resolveWith(c, [g, x, E]) : d.rejectWith(c, [E, x, y]), E.statusCode(m), m = undefined, u && p.trigger(f ? "ajaxSuccess" : "ajaxError", [E, l, f ? g : y]), v.fireWith(c, [E, x]), u && (p.trigger("ajaxComplete", [E, l]), --h.active || h.event.trigger("ajaxStop"))
      }
      typeof e == "object" && (t = e, e = undefined), t = t || {};
      var n, r, i, s, o, u, a, f, l = h.ajaxSetup({}, t),
        c = l.context || l,
        p = l.context && (c.nodeType || c.jquery) ? h(c) : h.event,
        d = h.Deferred(),
        v = h.Callbacks("once memory"),
        m = l.statusCode || {},
        g = {},
        y = {},
        b = 0,
        w = "canceled",
        E = {
          readyState: 0,
          getResponseHeader: function(e) {
            var t;
            if (b === 2) {
              if (!f) {
                f = {};
                while (t = An.exec(s)) f[t[1].toLowerCase()] = t[2]
              }
              t = f[e.toLowerCase()]
            }
            return t == null ? null : t
          },
          getAllResponseHeaders: function() {
            return b === 2 ? s : null
          },
          setRequestHeader: function(e, t) {
            var n = e.toLowerCase();
            return b || (e = y[n] = y[n] || e, g[e] = t), this
          },
          overrideMimeType: function(e) {
            return b || (l.mimeType = e), this
          },
          statusCode: function(e) {
            var t;
            if (e)
              if (b < 2)
                for (t in e) m[t] = [m[t], e[t]];
              else E.always(e[E.status]);
            return this
          },
          abort: function(e) {
            var t = e || w;
            return a && a.abort(t), x(0, t), this
          }
        };
      d.promise(E).complete = v.add, E.success = E.done, E.error = E.fail, l.url = ((e || l.url || Cn) + "").replace(kn, "").replace(_n, Nn[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = h.trim(l.dataType || "*").toLowerCase().match(O) || [""], l.crossDomain == null && (n = Dn.exec(l.url.toLowerCase()), l.crossDomain = !(!n || n[1] === Nn[1] && n[2] === Nn[2] && (n[3] || (n[1] === "http:" ? "80" : "443")) === (Nn[3] || (Nn[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = h.param(l.data, l.traditional)), In(Pn, l, t, E);
      if (b === 2) return E;
      u = l.global, u && h.active++ === 0 && h.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Mn.test(l.type), i = l.url, l.hasContent || (l.data && (i = l.url += (xn.test(i) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Ln.test(i) ? i.replace(Ln, "$1_=" + Sn++) : i + (xn.test(i) ? "&" : "?") + "_=" + Sn++)), l.ifModified && (h.lastModified[i] && E.setRequestHeader("If-Modified-Since", h.lastModified[i]), h.etag[i] && E.setRequestHeader("If-None-Match", h.etag[i])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && E.setRequestHeader("Content-Type", l.contentType), E.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + Bn + "; q=0.01" : "") : l.accepts["*"]);
      for (r in l.headers) E.setRequestHeader(r, l.headers[r]);
      if (!l.beforeSend || l.beforeSend.call(c, E, l) !== !1 && b !== 2) {
        w = "abort";
        for (r in {
            success: 1,
            error: 1,
            complete: 1
          }) E[r](l[r]);
        a = In(Hn, l, t, E);
        if (!a) x(-1, "No Transport");
        else {
          E.readyState = 1, u && p.trigger("ajaxSend", [E, l]), l.async && l.timeout > 0 && (o = setTimeout(function() {
            E.abort("timeout")
          }, l.timeout));
          try {
            b = 1, a.send(g, x)
          } catch (S) {
            if (!(b < 2)) throw S;
            x(-1, S)
          }
        }
        return E
      }
      return E.abort()
    },
    getJSON: function(e, t, n) {
      return h.get(e, t, n, "json")
    },
    getScript: function(e, t) {
      return h.get(e, undefined, t, "script")
    }
  }), h.each(["get", "post"], function(e, t) {
    h[t] = function(e, n, r, i) {
      return h.isFunction(n) && (i = i || r, r = n, n = undefined), h.ajax({
        url: e,
        type: t,
        dataType: i,
        data: n,
        success: r
      })
    }
  }), h.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
    h.fn[t] = function(e) {
      return this.on(t, e)
    }
  }), h._evalUrl = function(e) {
    return h.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    })
  }, h.fn.extend({
    wrapAll: function(e) {
      if (h.isFunction(e)) return this.each(function(t) {
        h(this).wrapAll(e.call(this, t))
      });
      if (this[0]) {
        var t = h(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
          var e = this;
          while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
          return e
        }).append(this)
      }
      return this
    },
    wrapInner: function(e) {
      return h.isFunction(e) ? this.each(function(t) {
        h(this).wrapInner(e.call(this, t))
      }) : this.each(function() {
        var t = h(this),
          n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    },
    wrap: function(e) {
      var t = h.isFunction(e);
      return this.each(function(n) {
        h(this).wrapAll(t ? e.call(this, n) : e)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        h.nodeName(this, "body") || h(this).replaceWith(this.childNodes)
      }).end()
    }
  }), h.expr.filters.hidden = function(e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !l.reliableHiddenOffsets() && (e.style && e.style.display || h.css(e, "display")) === "none"
  }, h.expr.filters.visible = function(e) {
    return !h.expr.filters.hidden(e)
  };
  var zn = /%20/g,
    Wn = /\[\]$/,
    Xn = /\r?\n/g,
    Vn = /^(?:submit|button|image|reset|file)$/i,
    $n = /^(?:input|select|textarea|keygen)/i;
  h.param = function(e, t) {
    var n, r = [],
      i = function(e, t) {
        t = h.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
      };
    t === undefined && (t = h.ajaxSettings && h.ajaxSettings.traditional);
    if (h.isArray(e) || e.jquery && !h.isPlainObject(e)) h.each(e, function() {
      i(this.name, this.value)
    });
    else
      for (n in e) Jn(n, e[n], t, i);
    return r.join("&").replace(zn, "+")
  }, h.fn.extend({
    serialize: function() {
      return h.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var e = h.prop(this, "elements");
        return e ? h.makeArray(e) : this
      }).filter(function() {
        var e = this.type;
        return this.name && !h(this).is(":disabled") && $n.test(this.nodeName) && !Vn.test(e) && (this.checked || !J.test(e))
      }).map(function(e, t) {
        var n = h(this).val();
        return n == null ? null : h.isArray(n) ? h.map(n, function(e) {
          return {
            name: t.name,
            value: e.replace(Xn, "\r\n")
          }
        }) : {
          name: t.name,
          value: n.replace(Xn, "\r\n")
        }
      }).get()
    }
  }), h.ajaxSettings.xhr = e.ActiveXObject !== undefined ? function() {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Yn() || Zn()
  } : Yn;
  var Kn = 0,
    Qn = {},
    Gn = h.ajaxSettings.xhr();
  e.ActiveXObject && h(e).on("unload", function() {
    for (var e in Qn) Qn[e](undefined, !0)
  }), l.cors = !!Gn && "withCredentials" in Gn, Gn = l.ajax = !!Gn, Gn && h.ajaxTransport(function(e) {
    if (!e.crossDomain || l.cors) {
      var t;
      return {
        send: function(n, r) {
          var i, s = e.xhr(),
            o = ++Kn;
          s.open(e.type, e.url, e.async, e.username, e.password);
          if (e.xhrFields)
            for (i in e.xhrFields) s[i] = e.xhrFields[i];
          e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
          for (i in n) n[i] !== undefined && s.setRequestHeader(i, n[i] + "");
          s.send(e.hasContent && e.data || null), t = function(n, i) {
            var u, a, f;
            if (t && (i || s.readyState === 4)) {
              delete Qn[o], t = undefined, s.onreadystatechange = h.noop;
              if (i) s.readyState !== 4 && s.abort();
              else {
                f = {}, u = s.status, typeof s.responseText == "string" && (f.text = s.responseText);
                try {
                  a = s.statusText
                } catch (l) {
                  a = ""
                }!u && e.isLocal && !e.crossDomain ? u = f.text ? 200 : 404 : u === 1223 && (u = 204)
              }
            }
            f && r(u, a, f, s.getAllResponseHeaders())
          }, e.async ? s.readyState === 4 ? setTimeout(t) : s.onreadystatechange = Qn[o] = t : t()
        },
        abort: function() {
          t && t(undefined, !0)
        }
      }
    }
  }), h.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(e) {
        return h.globalEval(e), e
      }
    }
  }), h.ajaxPrefilter("script", function(e) {
    e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
  }), h.ajaxTransport("script", function(e) {
    if (e.crossDomain) {
      var t, n = T.head || h("head")[0] || T.documentElement;
      return {
        send: function(r, i) {
          t = T.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
            if (n || !t.readyState || /loaded|complete/.test(t.readyState)) t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success")
          }, n.insertBefore(t, n.firstChild)
        },
        abort: function() {
          t && t.onload(undefined, !0)
        }
      }
    }
  });
  var er = [],
    tr = /(=)\?(?=&|$)|\?\?/;
  h.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var e = er.pop() || h.expando + "_" + Sn++;
      return this[e] = !0, e
    }
  }), h.ajaxPrefilter("json jsonp", function(t, n, r) {
    var i, s, o, u = t.jsonp !== !1 && (tr.test(t.url) ? "url" : typeof t.data == "string" && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tr.test(t.data) && "data");
    if (u || t.dataTypes[0] === "jsonp") return i = t.jsonpCallback = h.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, u ? t[u] = t[u].replace(tr, "$1" + i) : t.jsonp !== !1 && (t.url += (xn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
      return o || h.error(i + " was not called"), o[0]
    }, t.dataTypes[0] = "json", s = e[i], e[i] = function() {
      o = arguments
    }, r.always(function() {
      e[i] = s, t[i] && (t.jsonpCallback = n.jsonpCallback, er.push(i)), o && h.isFunction(s) && s(o[0]), o = s = undefined
    }), "script"
  }), h.parseHTML = function(e, t, n) {
    if (!e || typeof e != "string") return null;
    typeof t == "boolean" && (n = t, t = !1), t = t || T;
    var r = w.exec(e),
      i = !n && [];
    return r ? [t.createElement(r[1])] : (r = h.buildFragment([e], t, i), i && i.length && h(i).remove(), h.merge([], r.childNodes))
  };
  var nr = h.fn.load;
  h.fn.load = function(e, t, n) {
    if (typeof e != "string" && nr) return nr.apply(this, arguments);
    var r, i, s, o = this,
      u = e.indexOf(" ");
    return u >= 0 && (r = h.trim(e.slice(u, e.length)), e = e.slice(0, u)), h.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (s = "POST"), o.length > 0 && h.ajax({
      url: e,
      type: s,
      dataType: "html",
      data: t
    }).done(function(e) {
      i = arguments, o.html(r ? h("<div>").append(h.parseHTML(e)).find(r) : e)
    }).complete(n && function(e, t) {
      o.each(n, i || [e.responseText, t, e])
    }), this
  }, h.expr.filters.animated = function(e) {
    return h.grep(h.timers, function(t) {
      return e === t.elem
    }).length
  };
  var rr = e.document.documentElement;
  h.offset = {
    setOffset: function(e, t, n) {
      var r, i, s, o, u, a, f, l = h.css(e, "position"),
        c = h(e),
        p = {};
      l === "static" && (e.style.position = "relative"), u = c.offset(), s = h.css(e, "top"), a = h.css(e, "left"), f = (l === "absolute" || l === "fixed") && h.inArray("auto", [s, a]) > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), h.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (p.top = t.top - u.top + o), t.left != null && (p.left = t.left - u.left + i), "using" in t ? t.using.call(e, p) : c.css(p)
    }
  }, h.fn.extend({
    offset: function(e) {
      if (arguments.length) return e === undefined ? this : this.each(function(t) {
        h.offset.setOffset(this, e, t)
      });
      var t, n, r = {
          top: 0,
          left: 0
        },
        i = this[0],
        s = i && i.ownerDocument;
      if (!s) return;
      return t = s.documentElement, h.contains(t, i) ? (typeof i.getBoundingClientRect !== B && (r = i.getBoundingClientRect()), n = ir(s), {
        top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
        left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
      }) : r
    },
    position: function() {
      if (!this[0]) return;
      var e, t, n = {
          top: 0,
          left: 0
        },
        r = this[0];
      return h.css(r, "position") === "fixed" ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), h.nodeName(e[0], "html") || (n = e.offset()), n.top += h.css(e[0], "borderTopWidth", !0), n.left += h.css(e[0], "borderLeftWidth", !0)), {
        top: t.top - n.top - h.css(r, "marginTop", !0),
        left: t.left - n.left - h.css(r, "marginLeft", !0)
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var e = this.offsetParent || rr;
        while (e && !h.nodeName(e, "html") && h.css(e, "position") === "static") e = e.offsetParent;
        return e || rr
      })
    }
  }), h.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(e, t) {
    var n = /Y/.test(t);
    h.fn[e] = function(r) {
      return $(this, function(e, r, i) {
        var s = ir(e);
        if (i === undefined) return s ? t in s ? s[t] : s.document.documentElement[r] : e[r];
        s ? s.scrollTo(n ? h(s).scrollLeft() : i, n ? i : h(s).scrollTop()) : e[r] = i
      }, e, r, arguments.length, null)
    }
  }), h.each(["top", "left"], function(e, t) {
    h.cssHooks[t] = jt(l.pixelPosition, function(e, n) {
      if (n) return n = Ht(e, t), Dt.test(n) ? h(e).position()[t] + "px" : n
    })
  }), h.each({
    Height: "height",
    Width: "width"
  }, function(e, t) {
    h.each({
      padding: "inner" + e,
      content: t,
      "": "outer" + e
    }, function(n, r) {
      h.fn[r] = function(r, i) {
        var s = arguments.length && (n || typeof r != "boolean"),
          o = n || (r === !0 || i === !0 ? "margin" : "border");
        return $(this, function(t, n, r) {
          var i;
          return h.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? h.css(t, n, o) : h.style(t, n, r, o)
        }, t, s ? r : undefined, s, null)
      }
    })
  }), h.fn.size = function() {
    return this.length
  }, h.fn.andSelf = h.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function() {
    return h
  });
  var sr = e.jQuery,
    or = e.$;
  return h.noConflict = function(t) {
    return e.$ === h && (e.$ = or), t && e.jQuery === h && (e.jQuery = sr), h
  }, typeof t === B && (e.jQuery = e.$ = h), h
}), define("can/util/can", [], function() {
    var e = window.can || {};
    if (typeof GLOBALCAN == "undefined" || GLOBALCAN !== !1) window.can = e;
    e.k = function() {}, e.isDeferred = function(e) {
      return e && typeof e.then == "function" && typeof e.pipe == "function"
    };
    var t = 0;
    return e.cid = function(e, n) {
      return e._cid || (t++, e._cid = (n || "") + t), e._cid
    }, e.VERSION = "2.1.3", e.simpleExtend = function(e, t) {
      for (var n in t) e[n] = t[n];
      return e
    }, e.frag = function(t) {
      var n;
      return !t || typeof t == "string" ? (n = e.buildFragment(t == null ? "" : "" + t, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n) : t.nodeType === 11 ? t : typeof t.nodeType == "number" ? (n = document.createDocumentFragment(), n.appendChild(t), n) : typeof t.length == "number" ? (n = document.createDocumentFragment(), e.each(t, function(t) {
        n.appendChild(e.frag(t))
      }), n) : (n = e.buildFragment("" + t, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n)
    }, e.__reading = function() {}, e
  }), define("can/util/attr", ["can/util/can"], function(e) {
    var t = window.setImmediate || function(e) {
        return setTimeout(e, 0)
      },
      n = {
        MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        map: {
          "class": "className",
          value: "value",
          innerText: "innerText",
          textContent: "textContent",
          checked: !0,
          disabled: !0,
          readonly: !0,
          required: !0,
          src: function(e, t) {
            return t == null || t === "" ? (e.removeAttribute("src"), null) : (e.setAttribute("src", t), t)
          },
          style: function(e, t) {
            return e.style.cssText = t || ""
          }
        },
        defaultValue: ["input", "textarea"],
        set: function(t, r, i) {
          var s;
          n.MutationObserver || (s = n.get(t, r));
          var o = t.nodeName.toString().toLowerCase(),
            u = n.map[r],
            a;
          typeof u == "function" ? a = u(t, i) : u === !0 ? (a = t[r] = !0, r === "checked" && t.type === "radio" && e.inArray(o, n.defaultValue) >= 0 && (t.defaultChecked = !0)) : u ? (a = t[u] = i, u === "value" && e.inArray(o, n.defaultValue) >= 0 && (t.defaultValue = i)) : (t.setAttribute(r, i), a = i), !n.MutationObserver && a !== s && n.trigger(t, r, s)
        },
        trigger: function(n, r, i) {
          if (e.data(e.$(n), "canHasAttributesBindings")) return t(function() {
            e.trigger(n, {
              type: "attributes",
              attributeName: r,
              target: n,
              oldValue: i,
              bubbles: !1
            }, [])
          })
        },
        get: function(e, t) {
          var r = n.map[t];
          return typeof r == "string" && e[r] ? e[r] : e.getAttribute(t)
        },
        remove: function(e, t) {
          var r;
          n.MutationObserver || (r = n.get(e, t));
          var i = n.map[t];
          typeof i == "function" && i(e, undefined), i === !0 ? e[t] = !1 : typeof i == "string" ? e[i] = "" : e.removeAttribute(t), !n.MutationObserver && r != null && n.trigger(e, t, r)
        },
        has: function() {
          var e = document.createElement("div");
          return e.hasAttribute ? function(e, t) {
            return e.hasAttribute(t)
          } : function(e, t) {
            return e.getAttribute(t) !== null
          }
        }()
      };
    return n
  }), define("can/event", ["can/util/can"], function(e) {
    return e.addEvent = function(e, t) {
      var n = this.__bindEvents || (this.__bindEvents = {}),
        r = n[e] || (n[e] = []);
      return r.push({
        handler: t,
        name: e
      }), this
    }, e.listenTo = function(t, n, r) {
      var i = this.__listenToEvents;
      i || (i = this.__listenToEvents = {});
      var s = e.cid(t),
        o = i[s];
      o || (o = i[s] = {
        obj: t,
        events: {}
      });
      var u = o.events[n];
      u || (u = o.events[n] = []), u.push(r), e.bind.call(t, n, r)
    }, e.stopListening = function(t, n, r) {
      var i = this.__listenToEvents,
        s = i,
        o = 0;
      if (!i) return this;
      if (t) {
        var u = e.cid(t);
        (s = {})[u] = i[u];
        if (!i[u]) return this
      }
      for (var a in s) {
        var f = s[a],
          l;
        t = i[a].obj, n ? (l = {})[n] = f.events[n] : l = f.events;
        for (var c in l) {
          var h = l[c] || [];
          o = 0;
          while (o < h.length) r && r === h[o] || !r ? (e.unbind.call(t, c, h[o]), h.splice(o, 1)) : o++;
          h.length || delete f.events[c]
        }
        e.isEmptyObject(f.events) && delete i[a]
      }
      return this
    }, e.removeEvent = function(e, t, n) {
      if (!this.__bindEvents) return this;
      var r = this.__bindEvents[e] || [],
        i = 0,
        s, o = typeof t == "function";
      while (i < r.length) s = r[i], (n ? n(s, e, t) : o && s.handler === t || !o && (s.cid === t || !t)) ? r.splice(i, 1) : i++;
      return this
    }, e.dispatch = function(e, t) {
      var n = this.__bindEvents;
      if (!n) return;
      typeof e == "string" && (e = {
        type: e
      });
      var r = e.type,
        i = (n[r] || []).slice(0),
        s = [e];
      t && s.push.apply(s, t);
      for (var o = 0, u = i.length; o < u; o++) i[o].handler.apply(this, s);
      return e
    }, e.one = function(t, n) {
      var r = function() {
        return e.unbind.call(this, t, r), n.apply(this, arguments)
      };
      return e.bind.call(this, t, r), this
    }, e.event = {
      on: function() {
        return arguments.length === 0 && e.Control && this instanceof e.Control ? e.Control.prototype.on.call(this) : e.addEvent.apply(this, arguments)
      },
      off: function() {
        return arguments.length === 0 && e.Control && this instanceof e.Control ? e.Control.prototype.off.call(this) : e.removeEvent.apply(this, arguments)
      },
      bind: e.addEvent,
      unbind: e.removeEvent,
      delegate: function(t, n, r) {
        return e.addEvent.call(this, n, r)
      },
      undelegate: function(t, n, r) {
        return e.removeEvent.call(this, n, r)
      },
      trigger: e.dispatch,
      one: e.one,
      addEvent: e.addEvent,
      removeEvent: e.removeEvent,
      listenTo: e.listenTo,
      stopListening: e.stopListening,
      dispatch: e.dispatch
    }, e.event
  }), define("can/util/array/each", ["can/util/can"], function(e) {
    var t = function(e) {
      var t = e.length;
      return typeof arr != "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
    };
    return e.each = function(n, r, i) {
      var s = 0,
        o, u, a;
      if (n)
        if (t(n))
          if (e.List && n instanceof e.List)
            for (u = n.attr("length"); s < u; s++) {
              a = n.attr(s);
              if (r.call(i || a, a, s, n) === !1) break
            } else
              for (u = n.length; s < u; s++) {
                a = n[s];
                if (r.call(i || a, a, s, n) === !1) break
              } else if (typeof n == "object")
                if (e.Map && n instanceof e.Map || n === e.route) {
                  var f = e.Map.keys(n);
                  for (s = 0, u = f.length; s < u; s++) {
                    o = f[s], a = n.attr(o);
                    if (r.call(i || a, a, o, n) === !1) break
                  }
                } else
                  for (o in n)
                    if (n.hasOwnProperty(o) && r.call(i || n[o], n[o], o, n) === !1) break;
      return n
    }, e
  }), define("can/util/inserted", ["can/util/can"], function(e) {
    e.inserted = function(t) {
      t = e.makeArray(t);
      var n = !1,
        r = e.$(document.contains ? document : document.body),
        i;
      for (var s = 0, o;
        (o = t[s]) !== undefined; s++) {
        if (!n) {
          if (!o.getElementsByTagName) continue;
          if (!e.has(r, o).length) return;
          n = !0
        }
        if (n && o.getElementsByTagName) {
          i = e.makeArray(o.getElementsByTagName("*")), e.trigger(o, "inserted", [], !1);
          for (var u = 0, a;
            (a = i[u]) !== undefined; u++) e.trigger(a, "inserted", [], !1)
        }
      }
    }, e.appendChild = function(t, n) {
      var r;
      n.nodeType === 11 ? r = e.makeArray(n.childNodes) : r = [n], t.appendChild(n), e.inserted(r)
    }, e.insertBefore = function(t, n, r) {
      var i;
      n.nodeType === 11 ? i = e.makeArray(n.childNodes) : i = [n], t.insertBefore(n, r), e.inserted(i)
    }
  }), define("can/util/jquery", ["jquery", "can/util/can", "can/util/attr", "can/event", "can/util/array/each", "can/util/inserted"], function(e, t, n, r) {
    var i = function(e) {
      return e.nodeName && (e.nodeType === 1 || e.nodeType === 9) || e == window
    };
    e.extend(t, e, {
      trigger: function(n, r, s, o) {
        i(n) ? e.event.trigger(r, s, n, !o) : n.trigger ? n.trigger(r, s) : (typeof r == "string" && (r = {
          type: r
        }), r.target = r.target || n, s && (s.length && typeof s == "string" ? s = [s] : s.length || (s = [s])), s || (s = []), t.dispatch.call(n, r, s))
      },
      event: t.event,
      addEvent: t.addEvent,
      removeEvent: t.removeEvent,
      buildFragment: function(t, n) {
        var r;
        return t = [t], n = n || document, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, r = e.buildFragment(t, n), r.cacheable ? e.clone(r.fragment) : r.fragment || r
      },
      $: e,
      each: t.each,
      bind: function(n, r) {
        return this.bind && this.bind !== t.bind ? this.bind(n, r) : i(this) ? e.event.add(this, n, r) : t.addEvent.call(this, n, r), this
      },
      unbind: function(n, r) {
        return this.unbind && this.unbind !== t.unbind ? this.unbind(n, r) : i(this) ? e.event.remove(this, n, r) : t.removeEvent.call(this, n, r), this
      },
      delegate: function(n, r, s) {
        return this.delegate ? this.delegate(n, r, s) : i(this) ? e(this).delegate(n, r, s) : t.bind.call(this, r, s), this
      },
      undelegate: function(n, r, s) {
        return this.undelegate ? this.undelegate(n, r, s) : i(this) ? e(this).undelegate(n, r, s) : t.unbind.call(this, r, s), this
      },
      proxy: function(e, t) {
        return function() {
          return e.apply(t, arguments)
        }
      },
      attr: n
    }), t.on = t.bind, t.off = t.unbind, e.each(["append", "filter", "addClass", "remove", "data", "get", "has"], function(e, n) {
      t[n] = function(e) {
        return e[n].apply(e, t.makeArray(arguments).slice(1))
      }
    });
    var s = e.cleanData;
    e.cleanData = function(n) {
      e.each(n, function(e, n) {
        n && t.trigger(n, "removed", [], !1)
      }), s(n)
    };
    var o = e.fn.domManip,
      u;
    e.fn.domManip = function(e, t, n) {
      for (var r = 1; r < arguments.length; r++)
        if (typeof arguments[r] == "function") {
          u = r;
          break
        }
      return o.apply(this, arguments)
    }, e(document.createElement("div")).append(document.createElement("div")), e.fn.domManip = u === 2 ? function(e, n, r) {
      return o.call(this, e, n, function(e) {
        var n;
        e.nodeType === 11 && (n = t.makeArray(e.childNodes));
        var i = r.apply(this, arguments);
        return t.inserted(n ? n : [e]), i
      })
    } : function(e, n) {
      return o.call(this, e, function(e) {
        var r;
        e.nodeType === 11 && (r = t.makeArray(e.childNodes));
        var i = n.apply(this, arguments);
        return t.inserted(r ? r : [e]), i
      })
    };
    if (!t.attr.MutationObserver) {
      var a = e.attr;
      e.attr = function(e, n) {
        var r, i;
        arguments.length >= 3 && (r = a.call(this, e, n));
        var s = a.apply(this, arguments);
        return arguments.length >= 3 && (i = a.call(this, e, n)), i !== r && t.attr.trigger(e, n, r), s
      };
      var f = e.removeAttr;
      e.removeAttr = function(e, n) {
        var r = a.call(this, e, n),
          i = f.apply(this, arguments);
        return r != null && t.attr.trigger(e, n, r), i
      }, e.event.special.attributes = {
        setup: function() {
          t.data(t.$(this), "canHasAttributesBindings", !0)
        },
        teardown: function() {
          e.removeData(this, "canHasAttributesBindings")
        }
      }
    } else e.event.special.attributes = {
      setup: function() {
        var e = this,
          n = new t.attr.MutationObserver(function(n) {
            n.forEach(function(n) {
              var r = t.simpleExtend({}, n);
              t.trigger(e, r, [])
            })
          });
        n.observe(this, {
          attributes: !0,
          attributeOldValue: !0
        }), t.data(t.$(this), "canAttributesObserver", n)
      },
      teardown: function() {
        t.data(t.$(this), "canAttributesObserver").disconnect(), e.removeData(this, "canAttributesObserver")
      }
    };
    return function() {
      var e = "<-\n>",
        n = t.buildFragment(e, document);
      if (e !== n.childNodes[0].nodeValue) {
        var r = t.buildFragment;
        t.buildFragment = function(e, t) {
          var n = r(e, t);
          return n.childNodes.length === 1 && n.childNodes[0].nodeType === 3 && (n.childNodes[0].nodeValue = e), n
        }
      }
    }(), e.event.special.inserted = {}, e.event.special.removed = {}, t
  }), define("can/util/library", ["can/util/jquery"], function(e) {
    return e
  }), define("can/util/bind", ["can/util/library"], function(e) {
    return e.bindAndSetup = function() {
      return e.addEvent.apply(this, arguments), this._init || (this._bindings ? this._bindings++ : (this._bindings = 1, this._bindsetup && this._bindsetup())), this
    }, e.unbindAndTeardown = function(t, n) {
      return e.removeEvent.apply(this, arguments), this._bindings === null ? this._bindings = 0 : this._bindings--, !this._bindings && this._bindteardown && this._bindteardown(), this
    }, e
  }), define("can/map/bubble", ["can/util/library"], function(e) {
    var t = e.bubble = {
      event: function(e, t) {
        return e.constructor._bubbleRule(t, e)
      },
      childrenOf: function(e, n) {
        e._each(function(r, i) {
          r && r.bind && t.toParent(r, e, i, n)
        })
      },
      teardownChildrenFrom: function(e, n) {
        e._each(function(r) {
          t.teardownFromParent(e, r, n)
        })
      },
      toParent: function(t, n, r, i) {
        e.listenTo.call(n, t, i, function() {
          var i = e.makeArray(arguments),
            s = i.shift();
          i[0] = (e.List && n instanceof e.List ? n.indexOf(t) : r) + (i[0] ? "." + i[0] : ""), s.triggeredNS = s.triggeredNS || {};
          if (s.triggeredNS[n._cid]) return;
          s.triggeredNS[n._cid] = !0, e.trigger(n, s, i)
        })
      },
      teardownFromParent: function(t, n, r) {
        n && n.unbind && e.stopListening.call(t, n, r)
      },
      isBubbling: function(e, t) {
        return e._bubbleBindings && e._bubbleBindings[t]
      },
      bind: function(e, n) {
        if (!e._init) {
          var r = t.event(e, n);
          r && (e._bubbleBindings || (e._bubbleBindings = {}), e._bubbleBindings[r] ? e._bubbleBindings[r] ++ : (e._bubbleBindings[r] = 1, t.childrenOf(e, r)))
        }
      },
      unbind: function(n, r) {
        var i = t.event(n, r);
        i && (n._bubbleBindings && n._bubbleBindings[i] --, n._bubbleBindings && !n._bubbleBindings[i] && (delete n._bubbleBindings[i], t.teardownChildrenFrom(n, i), e.isEmptyObject(n._bubbleBindings) && delete n._bubbleBindings))
      },
      add: function(n, r, i) {
        if (r instanceof e.Map && n._bubbleBindings)
          for (var s in n._bubbleBindings) n._bubbleBindings[s] && (t.teardownFromParent(n, r, s), t.toParent(r, n, i, s))
      },
      removeMany: function(e, n) {
        for (var r = 0, i = n.length; r < i; r++) t.remove(e, n[r])
      },
      remove: function(n, r) {
        if (r instanceof e.Map && n._bubbleBindings)
          for (var i in n._bubbleBindings) n._bubbleBindings[i] && t.teardownFromParent(n, r, i)
      },
      set: function(n, r, i, s) {
        return e.Map.helpers.isObservable(i) && t.add(n, i, r), e.Map.helpers.isObservable(s) && t.remove(n, s), i
      }
    };
    return t
  }), define("can/util/string", ["can/util/library"], function(e) {
    var t = /_|-/,
      n = /\=\=/,
      r = /([A-Z]+)([A-Z][a-z])/g,
      i = /([a-z\d])([A-Z])/g,
      s = /([a-z\d])([A-Z])/g,
      o = /\{([^\}]+)\}/g,
      u = /"/g,
      a = /'/g,
      f = /-+(.)?/g,
      l = /[a-z][A-Z]/g,
      c = function(e, t, n) {
        var r = e[t];
        return r === undefined && n === !0 && (r = e[t] = {}), r
      },
      h = function(e) {
        return /^f|^o/.test(typeof e)
      },
      p = function(e) {
        var t = e === null || e === undefined || isNaN(e) && "" + e == "NaN";
        return "" + (t ? "" : e)
      };
    return e.extend(e, {
      esc: function(e) {
        return p(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(u, "&#34;").replace(a, "&#39;")
      },
      getObject: function(t, n, r) {
        var i = t ? t.split(".") : [],
          s = i.length,
          o, u = 0,
          a, f, l;
        n = e.isArray(n) ? n : [n || window], l = n.length;
        if (!s) return n[0];
        for (u; u < l; u++) {
          o = n[u], f = undefined;
          for (a = 0; a < s && h(o); a++) f = o, o = c(f, i[a]);
          if (f !== undefined && o !== undefined) break
        }
        r === !1 && o !== undefined && delete f[i[a - 1]];
        if (r === !0 && o === undefined) {
          o = n[0];
          for (a = 0; a < s && h(o); a++) o = c(o, i[a], !0)
        }
        return o
      },
      capitalize: function(e, t) {
        return e.charAt(0).toUpperCase() + e.slice(1)
      },
      camelize: function(e) {
        return p(e).replace(f, function(e, t) {
          return t ? t.toUpperCase() : ""
        })
      },
      hyphenate: function(e) {
        return p(e).replace(l, function(e, t) {
          return e.charAt(0) + "-" + e.charAt(1).toLowerCase()
        })
      },
      underscore: function(e) {
        return e.replace(n, "/").replace(r, "$1_$2").replace(i, "$1_$2").replace(s, "_").toLowerCase()
      },
      sub: function(t, n, r) {
        var i = [];
        return t = t || "", i.push(t.replace(o, function(t, s) {
          var o = e.getObject(s, n, r === !0 ? !1 : undefined);
          return o === undefined || o === null ? (i = null, "") : h(o) && i ? (i.push(o), "") : "" + o
        })), i === null ? i : i.length <= 1 ? i[0] : i
      },
      replacer: o,
      undHash: t
    }), e
  }), define("can/construct", ["can/util/string"], function(e) {
    var t = 0;
    return e.Construct = function() {
      if (arguments.length) return e.Construct.extend.apply(e.Construct, arguments)
    }, e.extend(e.Construct, {
      constructorExtends: !0,
      newInstance: function() {
        var e = this.instance(),
          t;
        return e.setup && (t = e.setup.apply(e, arguments)), e.init && e.init.apply(e, t || arguments), e
      },
      _inherit: function(t, n, r) {
        e.extend(r || t, t || {})
      },
      _overwrite: function(e, t, n, r) {
        e[n] = r
      },
      setup: function(t, n) {
        this.defaults = e.extend(!0, {}, t.defaults, this.defaults)
      },
      instance: function() {
        t = 1;
        var e = new this;
        return t = 0, e
      },
      extend: function(n, r, i) {
        function y() {
          if (!t) return this.constructor !== y && arguments.length && y.constructorExtends ? y.extend.apply(y, arguments) : y.newInstance.apply(y, arguments)
        }
        var s = n,
          o = r,
          u = i;
        typeof s != "string" && (u = o, o = s, s = null), u || (u = o, o = null), u = u || {};
        var a = this,
          f = this.prototype,
          l, c, h, p, d, v, m, g;
        g = this.instance(), e.Construct._inherit(u, f, g);
        for (d in a) a.hasOwnProperty(d) && (y[d] = a[d]);
        e.Construct._inherit(o, a, y), s && (l = s.split("."), v = l.pop(), c = e.getObject(l.join("."), window, !0), m = c, h = e.underscore(s.replace(/\./g, "_")), p = e.underscore(v), c[v] = y), e.extend(y, {
          constructor: y,
          prototype: g,
          namespace: m,
          _shortName: p,
          fullName: s,
          _fullName: h
        }), v !== undefined && (y.shortName = v), y.prototype.constructor = y;
        var b = [a].concat(e.makeArray(arguments)),
          w = y.setup.apply(y, b);
        return y.init && y.init.apply(y, w || b), y
      }
    }), e.Construct.prototype.setup = function() {}, e.Construct.prototype.init = function() {}, e.Construct
  }), define("can/util/batch", ["can/util/can"], function(e) {
    var t = 1,
      n = 0,
      r = [],
      i = [];
    e.batch = {
      start: function(e) {
        n++, e && i.push(e)
      },
      stop: function(s, o) {
        s ? n = 0 : n--;
        if (n === 0) {
          var u = r.slice(0),
            a = i.slice(0),
            f, l;
          r = [], i = [], t++, o && e.batch.start();
          for (f = 0, l = u.length; f < l; f++) e.dispatch.apply(u[f][0], u[f][1]);
          for (f = 0, l = a.length; f < a.length; f++) a[f]()
        }
      },
      trigger: function(i, s, o) {
        if (!i._init) {
          if (n === 0) return e.dispatch.call(i, s, o);
          s = typeof s == "string" ? {
            type: s
          } : s, s.batchNum = t, r.push([i, [s, o]])
        }
      }
    }
  }), define("can/map", ["can/util/library", "can/util/bind", "can/map/bubble", "can/construct", "can/util/batch"], function(e, t, n) {
    var r = null,
      i = function() {
        for (var e in r) r[e].added && delete r[e].obj._cid;
        r = null
      },
      s = function(e) {
        return r && r[e._cid] && r[e._cid].instance
      },
      o = null,
      u = e.Map = e.Construct.extend({
        setup: function() {
          e.Construct.setup.apply(this, arguments);
          if (e.Map) {
            this.defaults || (this.defaults = {}), this._computes = [];
            for (var t in this.prototype) t !== "define" && typeof this.prototype[t] != "function" ? this.defaults[t] = this.prototype[t] : this.prototype[t].isComputed && this._computes.push(t);
            this.helpers.define && this.helpers.define(this)
          }
          e.List && !(this.prototype instanceof e.List) && (this.List = u.List.extend({
            Map: this
          }, {}))
        },
        _bubble: n,
        _bubbleRule: function(e) {
          return (e === "change" || e.indexOf(".") >= 0) && "change"
        },
        _computes: [],
        bind: e.bindAndSetup,
        on: e.bindAndSetup,
        unbind: e.unbindAndTeardown,
        off: e.unbindAndTeardown,
        id: "id",
        helpers: {
          define: null,
          attrParts: function(e, t) {
            return t ? [e] : typeof e == "object" ? e : ("" + e).split(".")
          },
          addToMap: function(t, n) {
            var s;
            r || (s = i, r = {});
            var o = t._cid,
              u = e.cid(t);
            return r[u] || (r[u] = {
              obj: t,
              instance: n,
              added: !o
            }), s
          },
          isObservable: function(t) {
            return t instanceof e.Map || t && t === e.route
          },
          canMakeObserve: function(t) {
            return t && !e.isDeferred(t) && (e.isArray(t) || e.isPlainObject(t))
          },
          serialize: function(t, n, r) {
            var i = e.cid(t),
              s = !1;
            return o || (s = !0, o = {
              attr: {},
              serialize: {}
            }), o[n][i] = r, t.each(function(i, s) {
              var a, f = u.helpers.isObservable(i),
                l = f && o[n][e.cid(i)];
              l ? a = l : n === "serialize" ? a = u.helpers._serialize(t, s, i) : a = u.helpers._getValue(t, s, i, n), a !== undefined && (r[s] = a)
            }), e.__reading(t, "__keys"), s && (o = null), r
          },
          _serialize: function(e, t, n) {
            return u.helpers._getValue(e, t, n, "serialize")
          },
          _getValue: function(e, t, n, r) {
            return u.helpers.isObservable(n) ? n[r]() : n
          }
        },
        keys: function(t) {
          var n = [];
          e.__reading(t, "__keys");
          for (var r in t._data) n.push(r);
          return n
        }
      }, {
        setup: function(t) {
          t instanceof e.Map && (t = t.serialize()), this._data = {}, e.cid(this, ".map"), this._init = 1;
          var n = this._setupDefaults();
          this._setupComputes(n);
          var r = t && e.Map.helpers.addToMap(t, this),
            i = e.extend(e.extend(!0, {}, n), t);
          this.attr(i), r && r(), this.bind("change", e.proxy(this._changes, this)), delete this._init
        },
        _setupComputes: function() {
          var e = this.constructor._computes;
          this._computedBindings = {};
          for (var t = 0, n = e.length, r; t < n; t++) r = e[t], this[r] = this[r].clone(this), this._computedBindings[r] = {
            count: 0
          }
        },
        _setupDefaults: function() {
          return this.constructor.defaults || {}
        },
        _bindsetup: function() {},
        _bindteardown: function() {},
        _changes: function(t, n, r, i, s) {
          e.batch.trigger(this, {
            type: n,
            batchNum: t.batchNum,
            target: t.target
          }, [i, s])
        },
        _triggerChange: function(t, r, i, s) {
          n.isBubbling(this, "change") ? e.batch.trigger(this, {
            type: "change",
            target: this
          }, [t, r, i, s]) : e.batch.trigger(this, t, [i, s]), (r === "remove" || r === "add") && e.batch.trigger(this, {
            type: "__keys",
            target: this
          })
        },
        _each: function(e) {
          var t = this.__get();
          for (var n in t) t.hasOwnProperty(n) && e(t[n], n)
        },
        attr: function(t, n) {
          var r = typeof t;
          return r !== "string" && r !== "number" ? this._attrs(t, n) : arguments.length === 1 ? (e.__reading(this, t), this._get(t)) : (this._set(t, n), this)
        },
        each: function() {
          return e.each.apply(undefined, [this].concat(e.makeArray(arguments)))
        },
        removeAttr: function(t) {
          var n = e.List && this instanceof e.List,
            r = e.Map.helpers.attrParts(t),
            i = r.shift(),
            s = n ? this[i] : this._data[i];
          return r.length && s ? s.removeAttr(r) : (typeof t == "string" && !!~t.indexOf(".") && (i = t), this._remove(i, s), s)
        },
        _remove: function(e, t) {
          e in this._data && (delete this._data[e], e in this.constructor.prototype || delete this[e], this._triggerChange(e, "remove", undefined, t))
        },
        _get: function(e) {
          e = "" + e;
          var t = e.indexOf(".");
          if (t >= 0) {
            var n = this.__get(e);
            if (n !== undefined) return n;
            var r = e.substr(0, t),
              i = e.substr(t + 1),
              s = this.__get(r);
            return s && s._get ? s._get(i) : undefined
          }
          return this.__get(e)
        },
        __get: function(e) {
          return e ? this._computedBindings[e] ? this[e]() : this._data[e] : this._data
        },
        __type: function(t, n) {
          if (!(t instanceof e.Map) && e.Map.helpers.canMakeObserve(t)) {
            var r = s(t);
            if (r) return r;
            if (e.isArray(t)) {
              var i = e.List;
              return new i(t)
            }
            var o = this.constructor.Map || e.Map;
            return new o(t)
          }
          return t
        },
        _set: function(e, t, n) {
          e = "" + e;
          var r = e.indexOf("."),
            i;
          if (!n && r >= 0) {
            var s = e.substr(0, r),
              o = e.substr(r + 1);
            i = this._init ? undefined : this.__get(s);
            if (!u.helpers.isObservable(i)) throw "can.Map: Object does not exist";
            i._set(o, t)
          } else this.__convert && (t = this.__convert(e, t)), i = this._init ? undefined : this.__get(e), this.__set(e, this.__type(t, e), i)
        },
        __set: function(e, t, n) {
          if (t !== n) {
            var r = n !== undefined || this.__get().hasOwnProperty(e) ? "set" : "add";
            this.___set(e, this.constructor._bubble.set(this, e, t, n)), this._triggerChange(e, r, t, n), n && this.constructor._bubble.teardownFromParent(this, n)
          }
        },
        ___set: function(e, t) {
          this._computedBindings[e] ? this[e](t) : this._data[e] = t, typeof this.constructor.prototype[e] != "function" && !this._computedBindings[e] && (this[e] = t)
        },
        bind: function(t, n) {
          var r = this._computedBindings && this._computedBindings[t];
          if (r)
            if (!r.count) {
              r.count = 1;
              var i = this;
              r.handler = function(n, r, s) {
                e.batch.trigger(i, {
                  type: t,
                  batchNum: n.batchNum,
                  target: i
                }, [r, s])
              }, this[t].bind("change", r.handler)
            } else r.count++;
          return this.constructor._bubble.bind(this, t), e.bindAndSetup.apply(this, arguments)
        },
        unbind: function(t, n) {
          var r = this._computedBindings && this._computedBindings[t];
          return r && (r.count === 1 ? (r.count = 0, this[t].unbind("change", r.handler), delete r.handler) : r.count--), this.constructor._bubble.unbind(this, t), e.unbindAndTeardown.apply(this, arguments)
        },
        serialize: function() {
          return e.Map.helpers.serialize(this, "serialize", {})
        },
        _attrs: function(t, n) {
          if (t === undefined) return u.helpers.serialize(this, "attr", {});
          t = e.simpleExtend({}, t);
          var r, i = this,
            s;
          e.batch.start(), this.each(function(e, r) {
            if (r === "_cid") return;
            s = t[r];
            if (s === undefined) {
              n && i.removeAttr(r);
              return
            }
            i.__convert && (s = i.__convert(r, s)), u.helpers.isObservable(s) ? i.__set(r, i.__type(s, r), e) : u.helpers.isObservable(e) && u.helpers.canMakeObserve(s) ? e.attr(s, n) : e !== s && i.__set(r, i.__type(s, r), e), delete t[r]
          });
          for (r in t) r !== "_cid" && (s = t[r], this._set(r, s, !0));
          return e.batch.stop(), this
        },
        compute: function(t) {
          if (e.isFunction(this.constructor.prototype[t])) return e.compute(this[t], this);
          var n = t.split("."),
            r = n.length - 1,
            i = {
              args: []
            };
          return e.compute(function(t) {
            if (!arguments.length) return e.compute.read(this, n, i).value;
            e.compute.read(this, n.slice(0, r)).value.attr(n[r], t)
          }, this)
        }
      });
    return u.prototype.on = u.prototype.bind, u.prototype.off = u.prototype.unbind, u
  }), define("can/list", ["can/util/library", "can/map", "can/map/bubble"], function(e, t, n) {
    var r = [].splice,
      i = function() {
        var e = {
          0: "a",
          length: 1
        };
        return r.call(e, 0, 1), !e[0]
      }(),
      s = t.extend({
        Map: t
      }, {
        setup: function(t, n) {
          this.length = 0, e.cid(this, ".map"), this._init = 1, this._setupComputes(), t = t || [];
          var r;
          e.isDeferred(t) ? this.replace(t) : (r = t.length && e.Map.helpers.addToMap(t, this), this.push.apply(this, e.makeArray(t || []))), r && r(), this.bind("change", e.proxy(this._changes, this)), e.simpleExtend(this, n), delete this._init
        },
        _triggerChange: function(n, r, i, s) {
          t.prototype._triggerChange.apply(this, arguments);
          var o = +n;
          !~n.indexOf(".") && !isNaN(o) && (r === "add" ? (e.batch.trigger(this, r, [i, o]), e.batch.trigger(this, "length", [this.length])) : r === "remove" ? (e.batch.trigger(this, r, [s, o]), e.batch.trigger(this, "length", [this.length])) : e.batch.trigger(this, r, [i, o]))
        },
        __get: function(t) {
          return t ? this[t] && this[t].isComputed && e.isFunction(this.constructor.prototype[t]) ? this[t]() : this[t] : this
        },
        ___set: function(e, t) {
          this[e] = t, +e >= this.length && (this.length = +e + 1)
        },
        _remove: function(e, t) {
          isNaN(+e) ? (delete this[e], this._triggerChange(e, "remove", undefined, t)) : this.splice(e, 1)
        },
        _each: function(e) {
          var t = this.__get();
          for (var n = 0; n < t.length; n++) e(t[n], n)
        },
        serialize: function() {
          return t.helpers.serialize(this, "serialize", [])
        },
        splice: function(t, s) {
          var o = e.makeArray(arguments),
            u = [],
            a, f;
          for (a = 2; a < o.length; a++) o[a] = n.set(this, a, this.__type(o[a], a)), u.push(o[a]);
          s === undefined && (s = o[1] = this.length - t);
          var l = r.apply(this, o),
            c = l;
          if (u.length && l.length)
            for (f = 0; f < l.length; f++) e.inArray(l[f], u) >= 0 && c.splice(f, 1);
          if (!i)
            for (a = this.length; a < l.length + this.length; a++) delete this[a];
          return e.batch.start(), s > 0 && (this._triggerChange("" + t, "remove", undefined, l), n.removeMany(this, l)), o.length > 2 && this._triggerChange("" + t, "add", o.slice(2), l), e.batch.stop(), l
        },
        _attrs: function(n, r) {
          if (n === undefined) return t.helpers.serialize(this, "attr", []);
          n = e.makeArray(n), e.batch.start(), this._updateAttrs(n, r), e.batch.stop()
        },
        _updateAttrs: function(e, n) {
          var r = Math.min(e.length, this.length);
          for (var i = 0; i < r; i++) {
            var s = this[i],
              o = e[i];
            t.helpers.isObservable(s) && t.helpers.canMakeObserve(o) ? s.attr(o, n) : s !== o && this._set(i, o)
          }
          e.length > this.length ? this.push.apply(this, e.slice(this.length)) : e.length < this.length && n && this.splice(e.length)
        }
      }),
      o = function(t) {
        return t[0] && e.isArray(t[0]) ? t[0] : e.makeArray(t)
      };
    return e.each({
      push: "length",
      unshift: 0
    }, function(e, t) {
      var r = [][t];
      s.prototype[t] = function() {
        var t = [],
          i = e ? this.length : 0,
          s = arguments.length,
          o, u;
        while (s--) u = arguments[s], t[s] = n.set(this, s, this.__type(u, s));
        return o = r.apply(this, t), (!this.comparator || t.length) && this._triggerChange("" + i, "add", t, undefined), o
      }
    }), e.each({
      pop: "length",
      shift: 0
    }, function(e, t) {
      s.prototype[t] = function() {
        var r = o(arguments),
          i = e && this.length ? this.length - 1 : 0,
          s = [][t].apply(this, r);
        return this._triggerChange("" + i, "remove", undefined, [s]), s && s.unbind && n.remove(this, s), s
      }
    }), e.extend(s.prototype, {
      indexOf: function(t, n) {
        return this.attr("length"), e.inArray(t, this, n)
      },
      join: function() {
        return [].join.apply(this.attr(), arguments)
      },
      reverse: function() {
        var t = e.makeArray([].reverse.call(this));
        this.replace(t)
      },
      slice: function() {
        var e = Array.prototype.slice.apply(this, arguments);
        return new this.constructor(e)
      },
      concat: function() {
        var t = [];
        return e.each(e.makeArray(arguments), function(n, r) {
          t[r] = n instanceof e.List ? n.serialize() : n
        }), new this.constructor(Array.prototype.concat.apply(this.serialize(), t))
      },
      forEach: function(t, n) {
        return e.each(this, t, n || this)
      },
      replace: function(t) {
        return e.isDeferred(t) ? t.then(e.proxy(this.replace, this)) : this.splice.apply(this, [0, this.length].concat(e.makeArray(t || []))), this
      },
      filter: function(t, n) {
        var r = new e.List,
          i = this,
          s;
        return this.each(function(e, o, u) {
          s = t.call(n | i, e, o, i), s && r.push(e)
        }), r
      }
    }), e.List = t.List = s, e.List
  }), define("can/util/string/deparam", ["can/util/library", "can/util/string"], function(e) {
    var t = /^\d+$/,
      n = /([^\[\]]+)|(\[\])/g,
      r = /([^?#]*)(#.*)?$/,
      i = function(e) {
        return decodeURIComponent(e.replace(/\+/g, " "))
      };
    return e.extend(e, {
      deparam: function(s) {
        var o = {},
          u, a;
        return s && r.test(s) && (u = s.split("&"), e.each(u, function(e) {
          var r = e.split("="),
            s = i(r.shift()),
            u = i(r.join("=")),
            f = o;
          if (s) {
            r = s.match(n);
            for (var l = 0, c = r.length - 1; l < c; l++) f[r[l]] || (f[r[l]] = t.test(r[l + 1]) || r[l + 1] === "[]" ? [] : {}), f = f[r[l]];
            a = r.pop(), a === "[]" ? f.push(u) : f[a] = u
          }
        })), o
      }
    }), e
  }), define("can/route", ["can/util/library", "can/map", "can/list", "can/util/string/deparam"], function(e) {
    var t = /\:([\w\.]+)/g,
      n = /^(?:&[^=]+=[^&]*)+/,
      r = function(t) {
        var n = [];
        return e.each(t, function(t, r) {
          n.push((r === "className" ? "class" : r) + '="' + (r === "href" ? t : e.esc(t)) + '"')
        }), n.join(" ")
      },
      i = function(e, t) {
        var n = 0,
          r = 0,
          i = {};
        for (var s in e.defaults) e.defaults[s] === t[s] && (i[s] = 1, n++);
        for (; r < e.names.length; r++) {
          if (!t.hasOwnProperty(e.names[r])) return -1;
          i[e.names[r]] || n++
        }
        return n
      },
      s = window.location,
      o = function(e) {
        return (e + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1")
      },
      u = e.each,
      a = e.extend,
      f = function(t) {
        return t && typeof t == "object" ? (t instanceof e.Map ? t = t.attr() : t = e.isFunction(t.slice) ? t.slice() : e.extend({}, t), e.each(t, function(e, n) {
          t[n] = f(e)
        })) : t !== undefined && t !== null && e.isFunction(t.toString) && (t = t.toString()), t
      },
      l = function(e) {
        return e.replace(/\\/g, "")
      },
      c, h, p, d, v = function(t, n, r, i) {
        d = 1, clearTimeout(c), c = setTimeout(function() {
          d = 0;
          var t = e.route.data.serialize(),
            n = e.route.param(t, !0);
          e.route._call("setURL", n), e.batch.trigger(m, "__url", [n, p]), p = n
        }, 10)
      },
      m = e.extend({}, e.event);
    e.route = function(n, r) {
      var i = e.route._call("root");
      i.lastIndexOf("/") === i.length - 1 && n.indexOf("/") === 0 && (n = n.substr(1)), r = r || {};
      var s = [],
        u, a = "",
        f = t.lastIndex = 0,
        c, h = e.route._call("querySeparator"),
        p = e.route._call("matchSlashes");
      while (u = t.exec(n)) s.push(u[1]), a += l(n.substring(f, t.lastIndex - u[0].length)), c = "\\" + (l(n.substr(t.lastIndex, 1)) || h + (p ? "" : "|/")), a += "([^" + c + "]" + (r[u[1]] ? "*" : "+") + ")", f = t.lastIndex;
      return a += n.substr(f).replace("\\", ""), e.route.routes[n] = {
        test: new RegExp("^" + a + "($|" + o(h) + ")"),
        route: n,
        names: s,
        defaults: r,
        length: n.split("/").length
      }, e.route
    }, a(e.route, {
      param: function(n, r) {
        var s, o = 0,
          f, l = n.route,
          c = 0;
        delete n.route, u(n, function() {
          c++
        }), u(e.route.routes, function(e, t) {
          f = i(e, n), f > o && (s = e, o = f);
          if (f >= c) return !1
        }), e.route.routes[l] && i(e.route.routes[l], n) === o && (s = e.route.routes[l]);
        if (s) {
          var h = a({}, n),
            p = s.route.replace(t, function(e, t) {
              return delete h[t], n[t] === s.defaults[t] ? "" : encodeURIComponent(n[t])
            }).replace("\\", ""),
            d;
          return u(s.defaults, function(e, t) {
            h[t] === e && delete h[t]
          }), d = e.param(h), r && e.route.attr("route", s.route), p + (d ? e.route._call("querySeparator") + d : "")
        }
        return e.isEmptyObject(n) ? "" : e.route._call("querySeparator") + e.param(n)
      },
      deparam: function(t) {
        var n = e.route._call("root");
        n.lastIndexOf("/") === n.length - 1 && t.indexOf("/") === 0 && (t = t.substr(1));
        var r = {
            length: -1
          },
          i = e.route._call("querySeparator"),
          s = e.route._call("paramsMatcher");
        u(e.route.routes, function(e, n) {
          e.test.test(t) && e.length > r.length && (r = e)
        });
        if (r.length > -1) {
          var o = t.match(r.test),
            f = o.shift(),
            l = t.substr(f.length - (o[o.length - 1] === i ? 1 : 0)),
            c = l && s.test(l) ? e.deparam(l.slice(1)) : {};
          return c = a(!0, {}, r.defaults, c), u(o, function(e, t) {
            e && e !== i && (c[r.names[t]] = decodeURIComponent(e))
          }), c.route = r.route, c
        }
        return t.charAt(0) !== i && (t = i + t), s.test(t) ? e.deparam(t.slice(1)) : {}
      },
      data: new e.Map({}),
      map: function(t) {
        var n;
        t.prototype instanceof e.Map ? n = new t : n = t, e.route.data = n
      },
      routes: {},
      ready: function(t) {
        return t !== !0 && (e.route._setup(), e.route.setState()), e.route
      },
      url: function(t, n) {
        return n && (t = e.extend({}, e.route.deparam(e.route._call("matchingPartOfURL")), t)), e.route._call("root") + e.route.param(t)
      },
      link: function(t, n, i, s) {
        return "<a " + r(a({
          href: e.route.url(n, s)
        }, i)) + ">" + t + "</a>"
      },
      current: function(t) {
        return e.__reading(m, "__url"), this._call("matchingPartOfURL") === e.route.param(t)
      },
      bindings: {
        hashchange: {
          paramsMatcher: n,
          querySeparator: "&",
          matchSlashes: !1,
          bind: function() {
            e.bind.call(window, "hashchange", g)
          },
          unbind: function() {
            e.unbind.call(window, "hashchange", g)
          },
          matchingPartOfURL: function() {
            return s.href.split(/#!?/)[1] || ""
          },
          setURL: function(e) {
            return s.hash = "#!" + e, e
          },
          root: "#!"
        }
      },
      defaultBinding: "hashchange",
      currentBinding: null,
      _setup: function() {
        e.route.currentBinding || (e.route._call("bind"), e.route.bind("change", v), e.route.currentBinding = e.route.defaultBinding)
      },
      _teardown: function() {
        e.route.currentBinding && (e.route._call("unbind"), e.route.unbind("change", v), e.route.currentBinding = null), clearTimeout(c), d = 0
      },
      _call: function() {
        var t = e.makeArray(arguments),
          n = t.shift(),
          r = e.route.bindings[e.route.currentBinding || e.route.defaultBinding],
          i = r[n];
        return i.apply ? i.apply(r, t) : i
      }
    }), u(["bind", "unbind", "on", "off", "delegate", "undelegate", "removeAttr", "compute", "_get", "__get", "each"], function(t) {
      e.route[t] = function() {
        if (!e.route.data[t]) return;
        return e.route.data[t].apply(e.route.data, arguments)
      }
    }), e.route.attr = function(t, n) {
      var r = typeof t,
        i;
      return n === undefined ? i = arguments : r !== "string" && r !== "number" ? i = [f(t), n] : i = [t, f(n)], e.route.data.attr.apply(e.route.data, i)
    };
    var g = e.route.setState = function() {
      var t = e.route._call("matchingPartOfURL"),
        n = h;
      h = e.route.deparam(t);
      if (!d || t !== p) {
        e.batch.start();
        for (var r in n) h[r] || e.route.removeAttr(r);
        e.route.attr(h), e.batch.trigger(m, "__url", [t, p]), e.batch.stop()
      }
    };
    return e.route
  }), define("can/control", ["can/util/library", "can/construct"], function(e) {
    var t = function(t, n, r) {
        return e.bind.call(t, n, r),
          function() {
            e.unbind.call(t, n, r)
          }
      },
      n = e.isFunction,
      r = e.extend,
      i = e.each,
      s = [].slice,
      o = /\{([^\}]+)\}/g,
      u = e.getObject("$.event.special", [e]) || {},
      a = function(t, n, r, i) {
        return e.delegate.call(t, n, r, i),
          function() {
            e.undelegate.call(t, n, r, i)
          }
      },
      f = function(n, r, i, s) {
        return s ? a(n, e.trim(s), r, i) : t(n, r, i)
      },
      l, c = e.Control = e.Construct({
        setup: function() {
          e.Construct.setup.apply(this, arguments);
          if (e.Control) {
            var t = this,
              n;
            t.actions = {};
            for (n in t.prototype) t._isAction(n) && (t.actions[n] = t._action(n))
          }
        },
        _shifter: function(t, r) {
          var i = typeof r == "string" ? t[r] : r;
          return n(i) || (i = t[i]),
            function() {
              return t.called = r, i.apply(t, [this.nodeName ? e.$(this) : this].concat(s.call(arguments, 0)))
            }
        },
        _isAction: function(e) {
          var t = this.prototype[e],
            r = typeof t;
          return e !== "constructor" && (r === "function" || r === "string" && n(this.prototype[t])) && !!(u[e] || h[e] || /[^\w]/.test(e))
        },
        _action: function(t, n) {
          o.lastIndex = 0;
          if (n || !o.test(t)) {
            var r = n ? e.sub(t, this._lookup(n)) : t;
            if (!r) return null;
            var i = e.isArray(r),
              s = i ? r[1] : r,
              u = s.split(/\s+/g),
              a = u.pop();
            return {
              processor: h[a] || l,
              parts: [s, u.join(" "), a],
              delegate: i ? r[0] : undefined
            }
          }
        },
        _lookup: function(e) {
          return [e, window]
        },
        processors: {},
        defaults: {}
      }, {
        setup: function(t, n) {
          var i = this.constructor,
            s = i.pluginName || i._fullName,
            o;
          return this.element = e.$(t), s && s !== "can_control" && this.element.addClass(s), o = e.data(this.element, "controls"), o || (o = [], e.data(this.element, "controls", o)), o.push(this), this.options = r({}, i.defaults, n), this.on(), [this.element, this.options]
        },
        on: function(t, n, r, i) {
          if (!t) {
            this.off();
            var s = this.constructor,
              o = this._bindings,
              u = s.actions,
              a = this.element,
              l = e.Control._shifter(this, "destroy"),
              c, h;
            for (c in u) u.hasOwnProperty(c) && (h = u[c] || s._action(c, this.options, this), h && (o.control[c] = h.processor(h.delegate || a, h.parts[2], h.parts[1], c, this)));
            return e.bind.call(a, "removed", l), o.user.push(function(t) {
              e.unbind.call(t, "removed", l)
            }), o.user.length
          }
          return typeof t == "string" && (i = r, r = n, n = t, t = this.element), i === undefined && (i = r, r = n, n = null), typeof i == "string" && (i = e.Control._shifter(this, i)), this._bindings.user.push(f(t, r, i, n)), this._bindings.user.length
        },
        off: function() {
          var e = this.element[0],
            t = this._bindings;
          t && (i(t.user || [], function(t) {
            t(e)
          }), i(t.control || {}, function(t) {
            t(e)
          })), this._bindings = {
            user: [],
            control: {}
          }
        },
        destroy: function() {
          if (this.element === null) return;
          var t = this.constructor,
            n = t.pluginName || t._fullName,
            r;
          this.off(), n && n !== "can_control" && this.element.removeClass(n), r = e.data(this.element, "controls"), r.splice(e.inArray(this, r), 1), e.trigger(this, "destroyed"), this.element = null
        }
      }),
      h = e.Control.processors;
    return l = function(t, n, r, i, s) {
      return f(t, n, e.Control._shifter(s, i), r)
    }, i(["change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave", "inserted", "removed"], function(e) {
      h[e] = l
    }), c
  }), define("can/control/route", ["can/util/library", "can/route", "can/control"], function(e) {
    return e.Control.processors.route = function(t, n, r, i, s) {
      r = r || "", e.route.routes[r] || (r[0] === "/" && (r = r.substring(1)), e.route(r));
      var o, u = function(t, n, u) {
        if (e.route.attr("route") === r && (t.batchNum === undefined || t.batchNum !== o)) {
          o = t.batchNum;
          var a = e.route.attr();
          delete a.route, e.isFunction(s[i]) ? s[i](a) : s[s[i]](a)
        }
      };
      return e.route.bind("change", u),
        function() {
          e.route.unbind("change", u)
        }
    }, e
  }), define("can/model", ["can/util/library", "can/map", "can/list"], function(e) {
    var t = function(t, n, r) {
        var i = new e.Deferred;
        return t.then(function() {
          var t = e.makeArray(arguments),
            s = !0;
          try {
            t[0] = r.apply(n, t)
          } catch (o) {
            s = !1, i.rejectWith(i, [o].concat(t))
          }
          s && i.resolveWith(i, t)
        }, function() {
          i.rejectWith(this, arguments)
        }), typeof t.abort == "function" && (i.abort = function() {
          return t.abort()
        }), i
      },
      n = 0,
      r = function(t) {
        return e.__reading(t, t.constructor.id), t.__get(t.constructor.id)
      },
      i = function(t, n, r, i, s, o) {
        var u = {};
        if (typeof t == "string") {
          var a = t.split(/\s+/);
          u.url = a.pop(), a.length && (u.type = a.pop())
        } else e.extend(u, t);
        return u.data = typeof n == "object" && !e.isArray(n) ? e.extend(u.data || {}, n) : n, u.url = e.sub(u.url, u.data, !0), e.ajax(e.extend({
          type: r || "post",
          dataType: i || "json",
          success: s,
          error: o
        }, u))
      },
      s = function(n, i, s, o, u) {
        var a;
        e.isArray(n) ? (a = n[1], n = n[0]) : a = n.serialize(), a = [a];
        var f, l = n.constructor,
          c;
        return (i === "update" || i === "destroy") && a.unshift(r(n)), c = l[i].apply(l, a), f = t(c, n, function(e) {
          return n[u || i + "d"](e, c), n
        }), c.abort && (f.abort = function() {
          c.abort()
        }), f.then(s, o), f
      },
      o = {
        models: function(t) {
          return function(n, r) {
            e.Model._reqs++;
            if (!n) return;
            if (n instanceof this.List) return n;
            var i = this,
              s = [],
              o = i.List || v,
              u = r instanceof e.List ? r : new o,
              a = e.isArray(n),
              f = n instanceof v,
              l = a ? n : f ? n.serialize() : e.getObject(t || "data", n);
            if (typeof l == "undefined") throw new Error("Could not get any raw data while converting using .models");
            return u.length && u.splice(0), e.each(l, function(e) {
              s.push(i.model(e))
            }), u.push.apply(u, s), a || e.each(n, function(e, t) {
              t !== "data" && u.attr(t, e)
            }), setTimeout(e.proxy(this._clean, this), 1), u
          }
        },
        model: function(t) {
          return function(n) {
            if (!n) return;
            typeof n.serialize == "function" && (n = n.serialize()), this.parseModel ? n = this.parseModel.apply(this, arguments) : t && (n = e.getObject(t || "data", n));
            var r = n[this.id],
              i = (r || r === 0) && this.store[r] ? this.store[r].attr(n, this.removeAttr || !1) : new this(n);
            return i
          }
        }
      },
      u = function(t) {
        return function(n) {
          return t ? e.getObject(t || "data", n) : n
        }
      },
      a = {
        parseModel: u,
        parseModels: u
      },
      f = {
        create: {
          url: "_shortName",
          type: "post"
        },
        update: {
          data: function(t, n) {
            n = n || {};
            var r = this.id;
            return n[r] && n[r] !== t && (n["new" + e.capitalize(t)] = n[r], delete n[r]), n[r] = t, n
          },
          type: "put"
        },
        destroy: {
          type: "delete",
          data: function(e, t) {
            return t = t || {}, t.id = t[this.id] = e, t
          }
        },
        findAll: {
          url: "_shortName"
        },
        findOne: {}
      },
      l = function(e, t) {
        return function(n) {
          return n = e.data ? e.data.apply(this, arguments) : n, i(t || this[e.url || "_url"], n, e.type || "get")
        }
      },
      c = function(e, t) {
        if (!e.resource) return;
        var n = e.resource.replace(/\/+$/, "");
        return t === "findAll" || t === "create" ? n : n + "/{" + e.id + "}"
      };
    e.Model = e.Map.extend({
      fullName: "can.Model",
      _reqs: 0,
      setup: function(t, r, i, s) {
        typeof r != "string" && (s = i, i = r), s || (s = i), this.store = {}, e.Map.setup.apply(this, arguments);
        if (!e.Model) return;
        i && i.List ? (this.List = i.List, this.List.Map = this) : this.List = t.List.extend({
          Map: this
        }, {});
        var u = this,
          h = e.proxy(this._clean, u);
        e.each(f, function(n, r) {
          i && i[r] && (typeof i[r] == "string" || typeof i[r] == "object") ? u[r] = l(n, i[r]) : i && i.resource && (u[r] = l(n, c(u, r)));
          if (u["make" + e.capitalize(r)]) {
            var s = u["make" + e.capitalize(r)](u[r]);
            e.Construct._overwrite(u, t, r, function() {
              e.Model._reqs++;
              var t = s.apply(this, arguments),
                n = t.then(h, h);
              return n.abort = t.abort, n
            })
          }
        }), e.each(o, function(n, r) {
          var s = "parse" + e.capitalize(r),
            o = u[r];
          typeof o == "string" ? (e.Construct._overwrite(u, t, s, a[s](o)), e.Construct._overwrite(u, t, r, n(o))) : (!i || !i[r] && !i[s]) && e.Construct._overwrite(u, t, s, a[s]())
        }), e.each(a, function(n, r) {
          typeof u[r] == "string" && e.Construct._overwrite(u, t, r, n(u[r]))
        });
        if (u.fullName === "can.Model" || !u.fullName) u.fullName = "Model" + ++n;
        e.Model._reqs = 0, this._url = this._shortName + "/{" + this.id + "}"
      },
      _ajax: l,
      _makeRequest: s,
      _clean: function() {
        e.Model._reqs--;
        if (!e.Model._reqs)
          for (var t in this.store) this.store[t]._bindings || delete this.store[t];
        return arguments[0]
      },
      models: o.models("data"),
      model: o.model()
    }, {
      setup: function(t) {
        var n = t && t[this.constructor.id];
        e.Model._reqs && n != null && (this.constructor.store[n] = this), e.Map.prototype.setup.apply(this, arguments)
      },
      isNew: function() {
        var e = r(this);
        return !e && e !== 0
      },
      save: function(e, t) {
        return s(this, this.isNew() ? "create" : "update", e, t)
      },
      destroy: function(t, n) {
        if (this.isNew()) {
          var r = this,
            i = e.Deferred();
          return i.then(t, n), i.done(function(e) {
            r.destroyed(e)
          }).resolve(r)
        }
        return s(this, "destroy", t, n, "destroyed")
      },
      _bindsetup: function() {
        return this.constructor.store[this.__get(this.constructor.id)] = this, e.Map.prototype._bindsetup.apply(this, arguments)
      },
      _bindteardown: function() {
        return delete this.constructor.store[r(this)], e.Map.prototype._bindteardown.apply(this, arguments)
      },
      ___set: function(t, n) {
        e.Map.prototype.___set.call(this, t, n), t === this.constructor.id && this._bindings && (this.constructor.store[r(this)] = this)
      }
    });
    var h = function(t) {
        var n = "parse" + e.capitalize(t);
        return function(e) {
          return this[n] && (e = this[n].apply(this, arguments)), this[t](e)
        }
      },
      p = function(e) {
        return this.parseModel ? this.parseModel.apply(this, arguments) : this.model(e)
      },
      d = {
        makeFindAll: h("models"),
        makeFindOne: h("model"),
        makeCreate: p,
        makeUpdate: p
      };
    e.each(d, function(n, r) {
      e.Model[r] = function(r) {
        return function() {
          var i = e.makeArray(arguments),
            s = e.isFunction(i[1]) ? i.splice(0, 1) : i.splice(0, 2),
            o = t(r.apply(this, s), this, n);
          return o.then(i[0], i[1]), o
        }
      }
    }), e.each(["created", "updated", "destroyed"], function(t) {
      e.Model.prototype[t] = function(n) {
        var r, i = this.constructor;
        r = n && typeof n == "object" && this.attr(n.attr ? n.attr() : n), e.dispatch.call(this, {
          type: "change",
          target: this
        }, [t]), e.dispatch.call(i, t, [this])
      }
    });
    var v = e.Model.List = e.List.extend({
      _bubbleRule: function(t, n) {
        return e.List._bubbleRule(t, n) || "destroyed"
      }
    }, {
      setup: function(t) {
        e.isPlainObject(t) && !e.isArray(t) ? (e.List.prototype.setup.apply(this), this.replace(e.isDeferred(t) ? t : this.constructor.Map.findAll(t))) : e.List.prototype.setup.apply(this, arguments), this._init = 1, this.bind("destroyed", e.proxy(this._destroyed, this)), delete this._init
      },
      _destroyed: function(e, t) {
        if (/\w+/.test(t)) {
          var n;
          while ((n = this.indexOf(e.target)) > -1) this.splice(n, 1)
        }
      }
    });
    return e.Model
  }), define("can/view", ["can/util/library"], function(e) {
    var t = e.isFunction,
      n = e.makeArray,
      r = 1,
      i = function(e) {
        var t = function() {
          return f.frag(e.apply(this, arguments))
        };
        return t.render = function() {
          return e.apply(e, arguments)
        }, t
      },
      s = function(e, t) {
        if (!e.length) throw "can.view: No template or empty template:" + t
      },
      o = function(t, n) {
        var r = typeof t == "string" ? t : t.url,
          i = t.engine && "." + t.engine || r.match(/\.[\w\d]+$/),
          o, u, a;
        r.match(/^#/) && (r = r.substr(1));
        if (u = document.getElementById(r)) i = "." + u.type.match(/\/(x\-)?(.+)/)[2];
        !i && !f.cached[r] && (r += i = f.ext), e.isArray(i) && (i = i[0]), a = f.toId(r), r.match(/^\/\//) && (r = r.substr(2), r = window.steal ? steal.config().root.mapJoin("" + steal.id(r)) : r), window.require && require.toUrl && (r = require.toUrl(r)), o = f.types[i];
        if (f.cached[a]) return f.cached[a];
        if (u) return f.registerView(a, u.innerHTML, o);
        var l = new e.Deferred;
        return e.ajax({
          async: n,
          url: r,
          dataType: "text",
          error: function(e) {
            s("", r), l.reject(e)
          },
          success: function(e) {
            s(e, r), f.registerView(a, e, o, l)
          }
        }), l
      },
      u = function(t) {
        var n = [];
        if (e.isDeferred(t)) return [t];
        for (var r in t) e.isDeferred(t[r]) && n.push(t[r]);
        return n
      },
      a = function(t) {
        return e.isArray(t) && t[1] === "success" ? t[0] : t
      },
      f = e.view = e.template = function(e, n, r, i) {
        t(r) && (i = r, r = undefined);
        var s;
        return t(e) ? s = e(n, r, i) : s = f.renderAs("fragment", e, n, r, i), s
      };
    return e.extend(f, {
      frag: function(e, t) {
        return f.hookup(f.fragment(e), t)
      },
      fragment: function(t) {
        if (typeof t != "string" && t.nodeType === 11) return t;
        var n = e.buildFragment(t, document.body);
        return n.childNodes.length || n.appendChild(document.createTextNode("")), n
      },
      toId: function(t) {
        return e.map(t.toString().split(/\/|\./g), function(e) {
          if (e) return e
        }).join("_")
      },
      toStr: function(e) {
        return e == null ? "" : "" + e
      },
      hookup: function(t, n) {
        var r = [],
          i, s;
        return e.each(t.childNodes ? e.makeArray(t.childNodes) : t, function(t) {
          t.nodeType === 1 && (r.push(t), r.push.apply(r, e.makeArray(t.getElementsByTagName("*"))))
        }), e.each(r, function(e) {
          e.getAttribute && (i = e.getAttribute("data-view-id")) && (s = f.hookups[i]) && (s(e, n, i), delete f.hookups[i], e.removeAttribute("data-view-id"))
        }), t
      },
      hookups: {},
      hook: function(e) {
        return f.hookups[++r] = e, " data-view-id='" + r + "'"
      },
      cached: {},
      cachedRenderers: {},
      cache: !0,
      register: function(t) {
        this.types["." + t.suffix] = t, e[t.suffix] = f[t.suffix] = function(e, n) {
          var r, s;
          if (!n) return s = function() {
            return r || (t.fragRenderer ? r = t.fragRenderer(null, e) : r = i(t.renderer(null, e))), r.apply(this, arguments)
          }, s.render = function() {
            var n = t.renderer(null, e);
            return n.apply(n, arguments)
          }, s;
          var o = function() {
            return r || (t.fragRenderer ? r = t.fragRenderer(e, n) : r = t.renderer(e, n)), r.apply(this, arguments)
          };
          return t.fragRenderer ? f.preload(e, o) : f.preloadStringRenderer(e, o)
        }
      },
      types: {},
      ext: ".ejs",
      registerScript: function(e, t, n) {
        return "can.view.preloadStringRenderer('" + t + "'," + f.types["." + e].script(t, n) + ");"
      },
      preload: function(t, n) {
        var r = f.cached[t] = (new e.Deferred).resolve(function(e, t) {
          return n.call(e, e, t)
        });
        return r.__view_id = t, f.cachedRenderers[t] = n, n
      },
      preloadStringRenderer: function(e, t) {
        return this.preload(e, i(t))
      },
      render: function(t, n, r, i) {
        return e.view.renderAs("string", t, n, r, i)
      },
      renderTo: function(e, t, n, r) {
        return (e === "string" && t.render ? t.render : t)(n, r)
      },
      renderAs: function(r, i, s, l, c) {
        t(l) && (c = l, l = undefined);
        var h = u(s),
          p, d, v, m, g;
        if (h.length) return d = new e.Deferred, v = e.extend({}, s), h.push(o(i, !0)), e.when.apply(e, h).then(function(t) {
          var i = n(arguments),
            o = i.pop(),
            u;
          if (e.isDeferred(s)) v = a(t);
          else
            for (var f in s) e.isDeferred(s[f]) && (v[f] = a(i.shift()));
          u = e.view.renderTo(r, o, v, l), d.resolve(u, v), c && c(u, v)
        }, function() {
          d.reject.apply(d, arguments)
        }), d;
        p = e.__clearReading(), m = t(c), d = o(i, m), p && e.__setReading(p);
        if (m) g = d, d.then(function(t) {
          c(s ? e.view.renderTo(r, t, s, l) : t)
        });
        else {
          if (d.state() === "resolved" && d.__view_id) {
            var y = f.cachedRenderers[d.__view_id];
            return s ? e.view.renderTo(r, y, s, l) : y
          }
          d.then(function(t) {
            g = s ? e.view.renderTo(r, t, s, l) : t
          })
        }
        return g
      },
      registerView: function(t, n, r, s) {
        var o = typeof r == "object" ? r : f.types[r || f.ext],
          u;
        return o.fragRenderer ? u = o.fragRenderer(t, n) : u = i(o.renderer(t, n)), s = s || new e.Deferred, f.cache && (f.cached[t] = s, s.__view_id = t, f.cachedRenderers[t] = u), s.resolve(u)
      }
    }), e
  }), define("can/compute", ["can/util/library", "can/util/bind", "can/util/batch"], function(e, t) {
    var n = [];
    e.__read = function(e, t) {
      n.push({});
      var r = e.call(t);
      return {
        value: r,
        observed: n.pop()
      }
    }, e.__reading = function(e, t) {
      n.length && (n[n.length - 1][e._cid + "|" + t] = {
        obj: e,
        event: t + ""
      })
    }, e.__clearReading = function() {
      if (n.length) {
        var e = n[n.length - 1];
        return n[n.length - 1] = {}, e
      }
    }, e.__setReading = function(e) {
      n.length && (n[n.length - 1] = e)
    }, e.__addReading = function(t) {
      n.length && e.simpleExtend(n[n.length - 1], t)
    };
    var r = function(t, n, r, s) {
        var u = e.__read(t, n),
          a = u.observed;
        return i(r, a, s), o(r, s), u
      },
      i = function(e, t, n) {
        for (var r in t) s(e, t, r, n)
      },
      s = function(e, t, n, r) {
        if (e[n]) delete e[n];
        else {
          var i = t[n];
          i.obj.bind(i.event, r)
        }
      },
      o = function(e, t) {
        for (var n in e) {
          var r = e[n];
          r.obj.unbind(r.event, t)
        }
      },
      u = function(t, n, r, i) {
        n !== r && e.batch.trigger(t, i ? {
          type: "change",
          batchNum: i
        } : "change", [n, r])
      },
      a = function(t, n, i, s) {
        var o, u, a;
        return {
          on: function(f) {
            u || (u = function(e) {
              if (t.bound && (e.batchNum === undefined || e.batchNum !== a)) {
                var s = o.value;
                o = r(n, i, o.observed, u), f(o.value, s, e.batchNum), a = a = e.batchNum
              }
            }), o = r(n, i, {}, u), s(o.value), t.hasDependencies = !e.isEmptyObject(o.observed)
          },
          off: function(e) {
            for (var t in o.observed) {
              var n = o.observed[t];
              n.obj.unbind(n.event, u)
            }
          }
        }
      },
      f = function(t, n, i, s) {
        var o, u, a, f;
        return {
          on: function(l) {
            a || (a = function(r) {
              if (t.bound && (r.batchNum === undefined || r.batchNum !== f)) {
                var s = e.__clearReading(),
                  o = n.call(i);
                e.__setReading(s), l(o, u, r.batchNum), u = o, f = f = r.batchNum
              }
            }), o = r(n, i, {}, a), u = o.value, s(o.value), t.hasDependencies = !e.isEmptyObject(o.observed)
          },
          off: function(e) {
            for (var t in o.observed) {
              var n = o.observed[t];
              n.obj.unbind(n.event, a)
            }
          }
        }
      },
      l = function(t) {
        return t instanceof e.Map || t && t.__get
      },
      c = function() {};
    e.compute = function(t, r, i, s) {
      if (t && t.isComputed) return t;
      var o, l = c,
        h = c,
        p, d = function() {
          return p
        },
        v = function(e) {
          p = e
        },
        m = v,
        g = [],
        y = function(e, t, n) {
          m(e), u(o, e, t, n)
        },
        b;
      for (var w = 0, E = arguments.length; w < E; w++) g[w] = arguments[w];
      o = function(t) {
        if (arguments.length) {
          var i = p,
            s = v.call(r, t, i);
          return o.hasDependencies ? d.call(r) : (s === undefined ? p = d.call(r) : p = s, u(o, p, i), p)
        }
        return n.length && o.canReadForChangeEvent !== !1 && (e.__reading(o, "change"), o.bound || e.compute.temporarilyBind(o)), o.bound ? p : d.call(r)
      };
      if (typeof t == "function") {
        v = t, d = t, o.canReadForChangeEvent = i === !1 ? !1 : !0;
        var S = s ? f(o, t, r || this, m) : a(o, t, r || this, m);
        l = S.on, h = S.off
      } else if (r)
        if (typeof r == "string") {
          var x = r,
            T = t instanceof e.Map;
          if (T) {
            o.hasDependencies = !0;
            var N;
            d = function() {
              return t.attr(x)
            }, v = function(e) {
              t.attr(x, e)
            }, l = function(n) {
              N = function(e, t, r) {
                n(t, r, e.batchNum)
              }, t.bind(i || x, N), p = e.__read(d).value
            }, h = function(e) {
              t.unbind(i || x, N)
            }
          } else d = function() {
            return t[x]
          }, v = function(e) {
            t[x] = e
          }, l = function(n) {
            N = function() {
              n(d(), p)
            }, e.bind.call(t, i || x, N), p = e.__read(d).value
          }, h = function(n) {
            e.unbind.call(t, i || x, N)
          }
        } else if (typeof r == "function") p = t, v = r, r = i, b = "setter";
      else {
        p = t;
        var C = r,
          L = y;
        r = C.context || C, d = C.get || d, v = C.set || function() {
          return p
        };
        if (C.fn) {
          var A = C.fn,
            O;
          d = function() {
            return A.call(r, p)
          }, A.length === 0 ? O = a(o, A, r, m) : A.length === 1 ? O = a(o, function() {
            return A.call(r, p)
          }, r, m) : (y = function(e) {
            e !== undefined && L(e, p)
          }, O = a(o, function() {
            var e = A.call(r, p, function(e) {
              L(e, p)
            });
            return e !== undefined ? e : p
          }, r, m)), l = O.on, h = O.off
        } else y = function() {
          var e = d.call(r);
          L(e, p)
        };
        l = C.on || l, h = C.off || h
      } else p = t;
      return e.cid(o, "compute"), e.simpleExtend(o, {
        isComputed: !0,
        _bindsetup: function() {
          this.bound = !0;
          var t = e.__clearReading();
          l.call(this, y), e.__setReading(t)
        },
        _bindteardown: function() {
          h.call(this, y), this.bound = !1
        },
        bind: e.bindAndSetup,
        unbind: e.unbindAndTeardown,
        clone: function(t) {
          return t && (b === "setter" ? g[2] = t : g[1] = t), e.compute.apply(e, g)
        }
      })
    };
    var h, p = function() {
      for (var e = 0, t = h.length; e < t; e++) h[e].unbind("change", c);
      h = null
    };
    return e.compute.temporarilyBind = function(e) {
      e.bind("change", c), h || (h = [], setTimeout(p, 10)), h.push(e)
    }, e.compute.truthy = function(t) {
      return e.compute(function() {
        var e = t();
        return typeof e == "function" && (e = e()), !!e
      })
    }, e.compute.async = function(t, n, r) {
      return e.compute(t, {
        fn: n,
        context: r
      })
    }, e.compute.read = function(t, n, r) {
      r = r || {};
      var i = t,
        s, o, u;
      for (var a = 0, f = n.length; a < f; a++) {
        o = i, o && o.isComputed && (r.foundObservable && r.foundObservable(o, a), o = i = o()), l(o) ? (!u && r.foundObservable && r.foundObservable(o, a), u = 1, typeof o[n[a]] == "function" && o.constructor.prototype[n[a]] === o[n[a]] ? r.returnObserveMethods ? i = i[n[a]] : n[a] === "constructor" && o instanceof e.Construct ? i = o[n[a]] : i = o[n[a]].apply(o, r.args || []) : i = i.attr(n[a])) : i = o[n[a]], s = typeof i, i && i.isComputed && !r.isArgument && a < f - 1 ? (!u && r.foundObservable && r.foundObservable(o, a + 1), i = i()) : a < n.length - 1 && s === "function" && r.executeAnonymousFunctions && !(e.Construct && i.prototype instanceof e.Construct) && (i = i());
        if (a < n.length - 1 && (i === null || s !== "function" && s !== "object")) return r.earlyExit && r.earlyExit(o, a, i), {
          value: undefined,
          parent: o
        }
      }
      return typeof i == "function" && !(e.Construct && i.prototype instanceof e.Construct) && (!e.route || i !== e.route) && (r.isArgument ? !i.isComputed && r.proxyMethods !== !1 && (i = e.proxy(i, o)) : (i.isComputed && !u && r.foundObservable && r.foundObservable(i, a), i = i.call(o))), i === undefined && r.earlyExit && r.earlyExit(o, a - 1), {
        value: i,
        parent: o
      }
    }, e.compute
  }), define("can/view/scope", ["can/util/library", "can/construct", "can/map", "can/list", "can/view", "can/compute"], function(e) {
    var t = /(\\)?\./g,
      n = /\\\./g,
      r = function(e) {
        var r = [],
          i = 0;
        return e.replace(t, function(t, s, o) {
          s || (r.push(e.slice(i, o).replace(n, ".")), i = o + t.length)
        }), r.push(e.slice(i).replace(n, ".")), r
      },
      i = e.Construct.extend({
        read: e.compute.read
      }, {
        init: function(e, t) {
          this._context = e, this._parent = t, this.__cache = {}
        },
        attr: function(t) {
          var n = e.__clearReading(),
            r = this.read(t, {
              isArgument: !0,
              returnObserveMethods: !0,
              proxyMethods: !1
            }).value;
          return e.__setReading(n), r
        },
        add: function(e) {
          return e !== this._context ? new this.constructor(e, this) : this
        },
        computeData: function(t, n) {
          n = n || {
            args: []
          };
          var r = this,
            i, s, o = {
              compute: e.compute(function(u) {
                if (!arguments.length) {
                  if (i) return e.compute.read(i, s, n).value;
                  var f = r.read(t, n);
                  return i = f.rootObserve, s = f.reads, o.scope = f.scope, o.initialValue = f.value, o.reads = f.reads, o.root = i, f.value
                }
                if (i.isComputed && !s.length) i(u);
                else {
                  var a = s.length - 1;
                  e.compute.read(i, s.slice(0, a)).value.attr(s[a], u)
                }
              })
            };
          return o
        },
        compute: function(e, t) {
          return this.computeData(e, t).compute
        },
        read: function(t, n) {
          var i;
          if (t.substr(0, 2) === "./") i = !0, t = t.substr(2);
          else {
            if (t.substr(0, 3) === "../") return this._parent.read(t.substr(3), n);
            if (t === "..") return {
              value: this._parent._context
            };
            if (t === "." || t === "this") return {
              value: this._context
            }
          }
          var s = t.indexOf("\\.") === -1 ? t.split(".") : r(t),
            o, u = this,
            a, f = [],
            l = -1,
            c, h, p, d;
          while (u) {
            o = u._context;
            if (o !== null) {
              var v = e.compute.read(o, s, e.simpleExtend({
                foundObservable: function(e, t) {
                  p = e, d = s.slice(t)
                },
                earlyExit: function(t, n) {
                  n > l && (a = p, f = d, l = n, h = u, c = e.__clearReading())
                },
                executeAnonymousFunctions: !0
              }, n));
              if (v.value !== undefined) return {
                scope: u,
                rootObserve: p,
                value: v.value,
                reads: d
              }
            }
            e.__clearReading(), i ? u = null : u = u._parent
          }
          return a ? (e.__setReading(c), {
            scope: h,
            rootObserve: a,
            reads: f,
            value: undefined
          }) : {
            names: s,
            value: undefined
          }
        }
      });
    return e.view.Scope = i, i
  }), define("can/view/elements", ["can/util/library", "can/view"], function(e) {
    var t = function() {
        return e.$(document.createComment("~")).length === 1
      }(),
      n = {
        tagToContentPropMap: {
          option: "textContent" in document.createElement("option") ? "textContent" : "innerText",
          textarea: "value"
        },
        attrMap: e.attr.map,
        attrReg: /([^\s=]+)[\s]*=[\s]*/,
        defaultValue: e.attr.defaultValue,
        tagMap: {
          "": "span",
          colgroup: "col",
          table: "tbody",
          tr: "td",
          ol: "li",
          ul: "li",
          tbody: "tr",
          thead: "tr",
          tfoot: "tr",
          select: "option",
          optgroup: "option"
        },
        reverseTagMap: {
          col: "colgroup",
          tr: "tbody",
          option: "select",
          td: "tr",
          th: "tr",
          li: "ul"
        },
        getParentNode: function(e, t) {
          return t && e.parentNode.nodeType === 11 ? t : e.parentNode
        },
        setAttr: e.attr.set,
        getAttr: e.attr.get,
        removeAttr: e.attr.remove,
        contentText: function(e) {
          return typeof e == "string" ? e : !e && e !== 0 ? "" : "" + e
        },
        after: function(t, n) {
          var r = t[t.length - 1];
          r.nextSibling ? e.insertBefore(r.parentNode, n, r.nextSibling) : e.appendChild(r.parentNode, n)
        },
        replace: function(r, i) {
          n.after(r, i), e.remove(e.$(r)).length < r.length && !t && e.each(r, function(e) {
            e.nodeType === 8 && e.parentNode.removeChild(e)
          })
        }
      };
    return e.view.elements = n, n
  }), define("can/view/callbacks", ["can/util/library", "can/view"], function(e) {
    var t = e.view.attr = function(e, t) {
        if (!t) {
          var i = n[e];
          if (!i)
            for (var s = 0, o = r.length; s < o; s++) {
              var u = r[s];
              if (u.match.test(e)) {
                i = u.handler;
                break
              }
            }
          return i
        }
        typeof e == "string" ? n[e] = t : r.push({
          match: e,
          handler: t
        })
      },
      n = {},
      r = [],
      i = /[-\:]/,
      s = e.view.tag = function(e, t) {
        if (!t) {
          var n = o[e.toLowerCase()];
          return !n && i.test(e) && (n = function() {}), n
        }
        window.html5 && (window.html5.elements += " " + e, window.html5.shivDocument()), o[e.toLowerCase()] = t
      },
      o = {};
    return e.view.callbacks = {
      _tags: o,
      _attributes: n,
      _regExpAttributes: r,
      tag: s,
      attr: t,
      tagHandler: function(t, n, r) {
        var i = r.options.attr("tags." + n),
          s = i || o[n],
          u = r.scope,
          a;
        if (s) {
          var f = e.__clearReading();
          a = s(t, r), e.__setReading(f)
        } else a = u;
        if (a && r.subtemplate) {
          u !== a && (u = u.add(a));
          var l = r.subtemplate(u, r.options),
            c = typeof l == "string" ? e.view.frag(l) : l;
          e.appendChild(t, c)
        }
      }
    }, e.view.callbacks
  }), define("can/view/scanner", ["can/view", "can/view/elements", "can/view/callbacks"], function(can, elements, viewCallbacks) {
    var newLine = /(\r|\n)+/g,
      notEndTag = /\//,
      clean = function(e) {
        return e.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t")
      },
      getTag = function(e, t, n) {
        if (e) return e;
        while (n < t.length) {
          if (t[n] === "<" && !notEndTag.test(t[n + 1])) return elements.reverseTagMap[t[n + 1]] || "span";
          n++
        }
        return ""
      },
      bracketNum = function(e) {
        return --e.split("{").length - --e.split("}").length
      },
      myEval = function(script) {
        eval(script)
      },
      attrReg = /([^\s]+)[\s]*=[\s]*$/,
      startTxt = "var ___v1ew = [];",
      finishTxt = "return ___v1ew.join('')",
      put_cmd = "___v1ew.push(\n",
      insert_cmd = put_cmd,
      htmlTag = null,
      quote = null,
      beforeQuote = null,
      rescan = null,
      getAttrName = function() {
        var e = beforeQuote.match(attrReg);
        return e && e[1]
      },
      status = function() {
        return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0
      },
      top = function(e) {
        return e[e.length - 1]
      },
      Scanner;
    return can.view.Scanner = Scanner = function(e) {
      can.extend(this, {
        text: {},
        tokens: []
      }, e), this.text.options = this.text.options || "", this.tokenReg = [], this.tokenSimple = {
        "<": "<",
        ">": ">",
        '"': '"',
        "'": "'"
      }, this.tokenComplex = [], this.tokenMap = {};
      for (var t = 0, n; n = this.tokens[t]; t++) n[2] ? (this.tokenReg.push(n[2]), this.tokenComplex.push({
        abbr: n[1],
        re: new RegExp(n[2]),
        rescan: n[3]
      })) : (this.tokenReg.push(n[1]), this.tokenSimple[n[1]] = n[0]), this.tokenMap[n[0]] = n[1];
      this.tokenReg = new RegExp("(" + this.tokenReg.slice(0).concat(["<", ">", '"', "'"]).join("|") + ")", "g")
    }, Scanner.prototype = {
      helpers: [],
      scan: function(e, t) {
        var n = [],
          r = 0,
          i = this.tokenSimple,
          s = this.tokenComplex;
        e = e.replace(newLine, "\n"), this.transform && (e = this.transform(e)), e.replace(this.tokenReg, function(t, o) {
          var u = arguments[arguments.length - 2];
          u > r && n.push(e.substring(r, u));
          if (i[t]) n.push(t);
          else
            for (var a = 0, f; f = s[a]; a++)
              if (f.re.test(t)) {
                n.push(f.abbr), f.rescan && n.push(f.rescan(o));
                break
              }
          r = u + o.length
        }), r < e.length && n.push(e.substr(r));
        var o = "",
          u = [startTxt + (this.text.start || "")],
          a = function(e, t) {
            u.push(put_cmd, '"', clean(e), '"' + (t || "") + ");")
          },
          f = [],
          l, c = null,
          h = !1,
          p = {
            attributeHookups: [],
            tagHookups: [],
            lastTagHookup: ""
          },
          d = function() {
            p.lastTagHookup = p.tagHookups.pop() + p.tagHookups.length
          },
          v = "",
          m = [],
          g = !1,
          y, b = !1,
          w = 0,
          E, S = this.tokenMap,
          x;
        htmlTag = quote = beforeQuote = null;
        for (;
          (E = n[w++]) !== undefined;) {
          if (c === null) switch (E) {
            case S.left:
            case S.escapeLeft:
            case S.returnLeft:
              h = htmlTag && 1;
            case S.commentLeft:
              c = E, o.length && a(o), o = "";
              break;
            case S.escapeFull:
              h = htmlTag && 1, rescan = 1, c = S.escapeLeft, o.length && a(o), rescan = n[w++], o = rescan.content || rescan, rescan.before && a(rescan.before), n.splice(w, 0, S.right);
              break;
            case S.commentFull:
              break;
            case S.templateLeft:
              o += S.left;
              break;
            case "<":
              n[w].indexOf("!--") !== 0 && (htmlTag = 1, h = 0), o += E;
              break;
            case ">":
              htmlTag = 0;
              var T = o.substr(o.length - 1) === "/" || o.substr(o.length - 2) === "--",
                N = "";
              p.attributeHookups.length && (N = "attrs: ['" + p.attributeHookups.join("','") + "'], ", p.attributeHookups = []);
              if (v + p.tagHookups.length !== p.lastTagHookup && v === top(p.tagHookups)) T && (o = o.substr(0, o.length - 1)), u.push(put_cmd, '"', clean(o), '"', ",can.view.pending({tagName:'" + v + "'," + N + "scope: " + (this.text.scope || "this") + this.text.options), T ? (u.push("}));"), o = "/>", d()) : n[w] === "<" && n[w + 1] === "/" + v ? (u.push("}));"), o = E, d()) : (u.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || "")), o = "");
              else if (h || !g && elements.tagToContentPropMap[m[m.length - 1]] || N) {
                var C = ",can.view.pending({" + N + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
                T ? a(o.substr(0, o.length - 1), C + '/>"') : a(o, C + '>"'), o = "", h = 0
              } else o += E;
              if (T || g) m.pop(), v = m[m.length - 1], g = !1;
              p.attributeHookups = [];
              break;
            case "'":
            case '"':
              if (htmlTag)
                if (quote && quote === E) {
                  quote = null;
                  var k = getAttrName();
                  viewCallbacks.attr(k) && p.attributeHookups.push(k);
                  if (b) {
                    o += E, a(o), u.push(finishTxt, "}));\n"), o = "", b = !1;
                    break
                  }
                } else if (quote === null) {
                quote = E, beforeQuote = l, x = getAttrName();
                if (v === "img" && x === "src" || x === "style") {
                  a(o.replace(attrReg, "")), o = "", b = !0, u.push(insert_cmd, "can.view.txt(2,'" + getTag(v, n, w) + "'," + status() + ",this,function(){", startTxt), a(x + "=" + E);
                  break
                }
              };
            default:
              if (l === "<") {
                v = E.substr(0, 3) === "!--" ? "!--" : E.split(/\s/)[0];
                var L = !1,
                  A;
                v.indexOf("/") === 0 && (L = !0, A = v.substr(1)), L ? (top(m) === A && (v = A, g = !0), top(p.tagHookups) === A && (a(o.substr(0, o.length - 1)), u.push(finishTxt + "}}) );"), o = "><", d())) : (v.lastIndexOf("/") === v.length - 1 && (v = v.substr(0, v.length - 1)), v !== "!--" && viewCallbacks.tag(v) && (v === "content" && elements.tagMap[top(m)] && (E = E.replace("content", elements.tagMap[top(m)])), p.tagHookups.push(v)), m.push(v))
              }
              o += E
          } else switch (E) {
            case S.right:
            case S.returnRight:
              switch (c) {
                case S.left:
                  y = bracketNum(o), y === 1 ? (u.push(insert_cmd, "can.view.txt(0,'" + getTag(v, n, w) + "'," + status() + ",this,function(){", startTxt, o), f.push({
                    before: "",
                    after: finishTxt + "}));\n"
                  })) : (r = f.length && y === -1 ? f.pop() : {
                    after: ";"
                  }, r.before && u.push(r.before), u.push(o, ";", r.after));
                  break;
                case S.escapeLeft:
                case S.returnLeft:
                  y = bracketNum(o), y && f.push({
                    before: finishTxt,
                    after: "}));\n"
                  });
                  var O = c === S.escapeLeft ? 1 : 0,
                    M = {
                      insert: insert_cmd,
                      tagName: getTag(v, n, w),
                      status: status(),
                      specialAttribute: b
                    };
                  for (var _ = 0; _ < this.helpers.length; _++) {
                    var D = this.helpers[_];
                    if (D.name.test(o)) {
                      o = D.fn(o, M), D.name.source === /^>[\s]*\w*/.source && (O = 0);
                      break
                    }
                  }
                  typeof o == "object" ? o.startTxt && o.end && b ? u.push(insert_cmd, "can.view.toStr( ", o.content, "() ) );") : (o.startTxt ? u.push(insert_cmd, "can.view.txt(\n" + (typeof status() == "string" || (o.escaped != null ? o.escaped : O)) + ",\n'" + v + "',\n" + status() + ",\nthis,\n") : o.startOnlyTxt && u.push(insert_cmd, "can.view.onlytxt(this,\n"), u.push(o.content), o.end && u.push("));")) : b ? u.push(insert_cmd, o, ");") : u.push(insert_cmd, "can.view.txt(\n" + (typeof status() == "string" || O) + ",\n'" + v + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", o, y ? startTxt : "}));\n"), rescan && rescan.after && rescan.after.length && (a(rescan.after.length), rescan = null)
              }
              c = null, o = "";
              break;
            case S.templateLeft:
              o += S.left;
              break;
            default:
              o += E
          }
          l = E
        }
        o.length && a(o), u.push(";");
        var P = u.join(""),
          H = {
            out: (this.text.outStart || "") + P + " " + finishTxt + (this.text.outEnd || "")
          };
        return myEval.call(H, "this.fn = (function(" + this.text.argNames + "){" + H.out + "});\r\n//# sourceURL=" + t + ".js"), H
      }
    }, can.view.pending = function(e) {
      var t = can.view.getHooks();
      return can.view.hook(function(n) {
        can.each(t, function(e) {
          e(n)
        }), e.templateType = "legacy", e.tagName && viewCallbacks.tagHandler(n, e.tagName, e), can.each(e && e.attrs || [], function(t) {
          e.attributeName = t;
          var r = viewCallbacks.attr(t);
          r && r(n, e)
        })
      })
    }, can.view.tag("content", function(e, t) {
      return t.scope
    }), can.view.Scanner = Scanner, Scanner
  }), define("can/view/node_lists", ["can/util/library", "can/view/elements"], function(e) {
    var t = !0;
    try {
      document.createTextNode("")._ = 0
    } catch (n) {
      t = !1
    }
    var r = {},
      i = {},
      s = "ejs_" + Math.random(),
      o = 0,
      u = function(e, n) {
        var r = n || i,
          u = a(e, r);
        return u ? u : t || e.nodeType !== 3 ? (++o, e[s] = (e.nodeName ? "element_" : "obj_") + o) : (++o, r["text_" + o] = e, "text_" + o)
      },
      a = function(e, n) {
        if (t || e.nodeType !== 3) return e[s];
        for (var r in n)
          if (n[r] === e) return r
      },
      f = [].splice,
      l = [].push,
      c = function(e) {
        var t = 0;
        for (var n = 0, r = e.length; n < r; n++) {
          var i = e[n];
          i.nodeType ? t++ : t += c(i)
        }
        return t
      },
      h = function(e, t) {
        var n = {};
        for (var r = 0, i = e.length; r < i; r++) {
          var s = p.first(e[r]);
          n[u(s, t)] = e[r]
        }
        return n
      },
      p = {
        id: u,
        update: function(t, n) {
          var r = p.unregisterChildren(t);
          n = e.makeArray(n);
          var i = t.length;
          return f.apply(t, [0, i].concat(n)), t.replacements ? p.nestReplacements(t) : p.nestList(t), r
        },
        nestReplacements: function(e) {
          var t = 0,
            n = {},
            r = h(e.replacements, n),
            i = e.replacements.length;
          while (t < e.length && i) {
            var s = e[t],
              o = r[a(s, n)];
            o && (e.splice(t, c(o), o), i--), t++
          }
          e.replacements = []
        },
        nestList: function(e) {
          var t = 0;
          while (t < e.length) {
            var n = e[t],
              i = r[u(n)];
            i ? i !== e && e.splice(t, c(i), i) : r[u(n)] = e, t++
          }
        },
        last: function(e) {
          var t = e[e.length - 1];
          return t.nodeType ? t : p.last(t)
        },
        first: function(e) {
          var t = e[0];
          return t.nodeType ? t : p.first(t)
        },
        register: function(e, t, n) {
          return e.unregistered = t, e.parentList = n, n === !0 ? e.replacements = [] : n ? (n.replacements.push(e), e.replacements = []) : p.nestList(e), e
        },
        unregisterChildren: function(t) {
          var n = [];
          return e.each(t, function(e) {
            e.nodeType ? (t.replacements || delete r[u(e)], n.push(e)) : l.apply(n, p.unregister(e))
          }), n
        },
        unregister: function(e) {
          var t = p.unregisterChildren(e);
          if (e.unregistered) {
            var n = e.unregistered;
            delete e.unregistered, delete e.replacements, n()
          }
          return t
        },
        nodeMap: r
      };
    return e.view.nodeLists = p, p
  }), define("can/view/parser", ["can/view"], function(e) {
    function t(e) {
      var t = {},
        n = e.split(",");
      for (var r = 0; r < n.length; r++) t[n[r]] = !0;
      return t
    }
    var n = "-A-Za-z0-9_",
      r = "[a-zA-Z_:][" + n + ":.]*",
      i = "\\s*=\\s*",
      s = '"((?:\\\\.|[^"])*)"',
      o = "'((?:\\\\.|[^'])*)'",
      u = "(?:" + i + "(?:" + "(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?",
      a = "\\{\\{[^\\}]*\\}\\}\\}?",
      f = "\\{\\{([^\\}]*)\\}\\}\\}?",
      l = new RegExp("^<([" + n + "]+)" + "(" + "(?:\\s*" + "(?:(?:" + "(?:" + r + ")?" + u + ")|" + "(?:" + a + ")+)" + ")*" + ")\\s*(\\/?)>"),
      c = new RegExp("^<\\/([" + n + "]+)[^>]*>"),
      h = new RegExp("(?:(?:(" + r + ")|" + f + ")" + "(?:" + i + "(?:" + "(?:" + s + ")|(?:" + o + ")|([^>\\s]+)" + ")" + ")?)", "g"),
      p = new RegExp(f, "g"),
      d = /<|\{\{/,
      v = t("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
      m = t("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
      g = t("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
      y = t("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
      b = t("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
      w = t("script,style"),
      E = function(e, t) {
        function n(e, n, i, s) {
          n = n.toLowerCase();
          if (m[n])
            while (a.last() && g[a.last()]) r("", a.last());
          y[n] && a.last() === n && r("", n), s = v[n] || !!s, t.start(n, s), s || a.push(n), E.parseAttrs(i, t), t.end(n, s)
        }

        function r(e, n) {
          var r;
          if (!n) r = 0;
          else
            for (r = a.length - 1; r >= 0; r--)
              if (a[r] === n) break; if (r >= 0) {
            for (var i = a.length - 1; i >= r; i--) t.close && t.close(a[i]);
            a.length = r
          }
        }

        function i(e, n) {
          t.special && t.special(n)
        }
        var s, o, u, a = [],
          f = e;
        a.last = function() {
          return this[this.length - 1]
        };
        while (e) {
          o = !0;
          if (!a.last() || !w[a.last()]) {
            e.indexOf("<!--") === 0 ? (s = e.indexOf("-->"), s >= 0 && (t.comment && t.comment(e.substring(4, s)), e = e.substring(s + 3), o = !1)) : e.indexOf("</") === 0 ? (u = e.match(c), u && (e = e.substring(u[0].length), u[0].replace(c, r), o = !1)) : e.indexOf("<") === 0 ? (u = e.match(l), u && (e = e.substring(u[0].length), u[0].replace(l, n), o = !1)) : e.indexOf("{{") === 0 && (u = e.match(p), u && (e = e.substring(u[0].length), u[0].replace(p, i)));
            if (o) {
              s = e.search(d);
              var h = s < 0 ? e : e.substring(0, s);
              e = s < 0 ? "" : e.substring(s), t.chars && h && t.chars(h)
            }
          } else e = e.replace(new RegExp("([\\s\\S]*?)</" + a.last() + "[^>]*>"), function(e, n) {
            return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), ""
          }), r("", a.last());
          if (e === f) throw "Parse Error: " + e;
          f = e
        }
        r(), t.done()
      };
    return E.parseAttrs = function(e, t) {
      (e != null ? e : "").replace(h, function(e, n, r, i, s, o) {
        r && t.special(r);
        if (n || i || s || o) {
          var u = arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : arguments[5] ? arguments[5] : b[n.toLowerCase()] ? n : "";
          t.attrStart(n || "");
          var a = p.lastIndex = 0,
            f = p.exec(u),
            l;
          while (f) l = u.substring(a, p.lastIndex - f[0].length), l.length && t.attrValue(l), t.special(f[1]), a = p.lastIndex, f = p.exec(u);
          l = u.substr(a, u.length), l && t.attrValue(l), t.attrEnd(n || "")
        }
      })
    }, e.view.parser = E, E
  }), define("can/view/live", ["can/util/library", "can/view/elements", "can/view", "can/view/node_lists", "can/view/parser"], function(e, t, n, r, i) {
    t = t || e.view.elements, r = r || e.view.NodeLists, i = i || e.view.parser;
    var s = function(t, n, r) {
        var i = !1,
          s = function() {
            return i || (i = !0, r(o), e.unbind.call(t, "removed", s)), !0
          },
          o = {
            teardownCheck: function(e) {
              return e ? !1 : s()
            }
          };
        return e.bind.call(t, "removed", s), n(o), o
      },
      o = function(e, t, n) {
        return s(e, function() {
          t.bind("change", n)
        }, function(e) {
          t.unbind("change", n), e.nodeList && r.unregister(e.nodeList)
        })
      },
      u = function(e) {
        var t = {},
          n;
        return i.parseAttrs(e, {
          attrStart: function(e) {
            t[e] = "", n = e
          },
          attrValue: function(e) {
            t[n] += e
          },
          attrEnd: function() {}
        }), t
      },
      a = [].splice,
      f = function(e) {
        return e && e.nodeType
      },
      l = function(e) {
        e.childNodes.length || e.appendChild(document.createTextNode(""))
      },
      c = {
        list: function(n, i, o, u, f, l) {
          var h = l || [n],
            p = [],
            d = function(n, i, s) {
              var f = document.createDocumentFragment(),
                c = [],
                d = [];
              e.each(i, function(t, n) {
                var i = [];
                l && r.register(i, null, !0);
                var a = e.compute(n + s),
                  h = o.call(u, t, a, i),
                  p = typeof h == "string",
                  v = e.frag(h);
                v = p ? e.view.hookup(v) : v;
                var m = e.makeArray(v.childNodes);
                l ? (r.update(i, m), c.push(i)) : c.push(r.register(m)), f.appendChild(v), d.push(a)
              });
              var v = s + 1;
              if (!h[v]) t.after(v === 1 ? [m] : [r.last(h[v - 1])], f);
              else {
                var g = r.first(h[v]);
                e.insertBefore(g.parentNode, f, g)
              }
              a.apply(h, [v, 0].concat(c)), a.apply(p, [s, 0].concat(d));
              for (var y = s + d.length, b = p.length; y < b; y++) p[y](y)
            },
            v = function(t, n, i, s, o) {
              if (!s && w.teardownCheck(m.parentNode)) return;
              var u = h.splice(i + 1, n.length),
                a = [];
              e.each(u, function(e) {
                var t = r.unregister(e);
                [].push.apply(a, t)
              }), p.splice(i, n.length);
              for (var f = i, l = p.length; f < l; f++) p[f](f);
              o || e.remove(e.$(a))
            },
            m = document.createTextNode(""),
            g, y = function(e) {
              g && g.unbind && g.unbind("add", d).unbind("remove", v), v({}, {
                length: h.length - 1
              }, 0, !0, e)
            },
            b = function(e, t, n) {
              y(), g = t || [], g.bind && g.bind("add", d).bind("remove", v), d({}, g, 0)
            };
          f = t.getParentNode(n, f);
          var w = s(f, function() {
            e.isFunction(i) && i.bind("change", b)
          }, function() {
            e.isFunction(i) && i.unbind("change", b), y(!0)
          });
          l ? (t.replace(h, m), r.update(h, [m]), l.unregistered = w.teardownCheck) : c.replace(h, m, w.teardownCheck), b({}, e.isFunction(i) ? i() : i)
        },
        html: function(n, i, s, u) {
          var a;
          s = t.getParentNode(n, s), a = o(s, i, function(e, t, n) {
            var i = r.first(c).parentNode;
            i && h(t), a.teardownCheck(r.first(c).parentNode)
          });
          var c = u || [n],
            h = function(n) {
              var i = !f(n),
                o = e.frag(n),
                u = e.makeArray(c);
              l(o), i && (o = e.view.hookup(o, s)), u = r.update(c, o.childNodes), t.replace(u, o)
            };
          a.nodeList = c, u ? u.unregistered = a.teardownCheck : r.register(c, a.teardownCheck), h(i())
        },
        replace: function(n, i, s) {
          var o = n.slice(0),
            u = e.frag(i);
          return r.register(n, s), typeof i == "string" && (u = e.view.hookup(u, n[0].parentNode)), r.update(n, u.childNodes), t.replace(o, u), n
        },
        text: function(n, i, s, u) {
          var a = t.getParentNode(n, s),
            f = o(a, i, function(t, n, r) {
              typeof l.nodeValue != "unknown" && (l.nodeValue = e.view.toStr(n)), f.teardownCheck(l.parentNode)
            }),
            l = document.createTextNode(e.view.toStr(i()));
          u ? (u.unregistered = f.teardownCheck, f.nodeList = u, r.update(u, [l]), t.replace([n], l)) : f.nodeList = c.replace([n], l, f.teardownCheck)
        },
        setAttributes: function(t, n) {
          var r = u(n);
          for (var i in r) e.attr.set(t, i, r[i])
        },
        attributes: function(n, r, i) {
          var s = {},
            a = function(r) {
              var i = u(r),
                o;
              for (o in i) {
                var a = i[o],
                  f = s[o];
                a !== f && e.attr.set(n, o, a), delete s[o]
              }
              for (o in s) t.removeAttr(n, o);
              s = i
            };
          o(n, r, function(e, t) {
            a(t)
          }), arguments.length >= 3 ? s = u(i) : a(r())
        },
        attributePlaceholder: "__!!__",
        attributeReplace: /__!!__/g,
        attribute: function(n, r, i) {
          o(n, i, function(e, i) {
            t.setAttr(n, r, h.render())
          });
          var s = e.$(n),
            u;
          u = e.data(s, "hooks"), u || e.data(s, "hooks", u = {});
          var a = t.getAttr(n, r),
            f = a.split(c.attributePlaceholder),
            l = [],
            h;
          l.push(f.shift(), f.join(c.attributePlaceholder)), u[r] ? u[r].computes.push(i) : u[r] = {
            render: function() {
              var e = 0,
                n = a ? a.replace(c.attributeReplace, function() {
                  return t.contentText(h.computes[e++]())
                }) : t.contentText(h.computes[e++]());
              return n
            },
            computes: [i],
            batchNum: undefined
          }, h = u[r], l.splice(1, 0, i()), t.setAttr(n, r, l.join(""))
        },
        specialAttribute: function(e, n, r) {
          o(e, r, function(r, i) {
            t.setAttr(e, n, p(i))
          }), t.setAttr(e, n, p(r()))
        },
        simpleAttribute: function(e, n, r) {
          o(e, r, function(r, i) {
            t.setAttr(e, n, i)
          }), t.setAttr(e, n, r())
        }
      };
    c.attr = c.simpleAttribute, c.attrs = c.attributes;
    var h = /(\r|\n)+/g,
      p = function(e) {
        var n = /^["'].*["']$/;
        return e = e.replace(t.attrReg, "").replace(h, ""), n.test(e) ? e.substr(1, e.length - 2) : e
      };
    return e.view.live = c, c
  }), define("can/view/render", ["can/view", "can/view/elements", "can/view/live", "can/util/string"], function(e, t, n) {
    var r = [],
      i = function(e) {
        var n = t.tagMap[e] || "span";
        return n === "span" ? "@@!!@@" : "<" + n + ">" + i(n) + "</" + n + ">"
      },
      s = function(t, n) {
        if (typeof t == "string") return t;
        if (!t && t !== 0) return "";
        var i = t.hookup && function(e, n) {
          t.hookup.call(t, e, n)
        } || typeof t == "function" && t;
        if (i) return n ? "<" + n + " " + e.view.hook(i) + "></" + n + ">" : (r.push(i), "");
        return "" + t
      },
      o = function(t, n) {
        return typeof t == "string" || typeof t == "number" ? e.esc(t) : s(t, n)
      },
      u = !1,
      a = function() {},
      f;
    return e.extend(e.view, {
      live: n,
      setupLists: function() {
        var t = e.view.lists,
          n;
        return e.view.lists = function(e, t) {
            return n = {
              list: e,
              renderer: t
            }, Math.random()
          },
          function() {
            return e.view.lists = t, n
          }
      },
      getHooks: function() {
        var e = r.slice(0);
        return f = e, r = [], e
      },
      onlytxt: function(e, t) {
        return o(t.call(e))
      },
      txt: function(l, c, h, p, d) {
        var v = t.tagMap[c] || "span",
          m = !1,
          g, y, b, w = a,
          E;
        if (u) g = d.call(p);
        else {
          if (typeof h == "string" || h === 1) u = !0;
          var S = e.view.setupLists();
          w = function() {
            b.unbind("change", a)
          }, b = e.compute(d, p, !1), b.bind("change", a), y = S(), g = b(), u = !1, m = b.hasDependencies
        }
        if (y) return w(), "<" + v + e.view.hook(function(e, t) {
          n.list(e, y.list, y.renderer, p, t)
        }) + "></" + v + ">";
        if (!m || typeof g == "function") return w(), (u || l === 2 || !l ? s : o)(g, h === 0 && v);
        var x = t.tagToContentPropMap[c];
        return h === 0 && !x ? "<" + v + e.view.hook(l && typeof g != "object" ? function(e, t) {
          n.text(e, b, t), w()
        } : function(e, t) {
          n.html(e, b, t), w()
        }) + ">" + i(v) + "</" + v + ">" : h === 1 ? (r.push(function(e) {
          n.attributes(e, b, b()), w()
        }), b()) : l === 2 ? (E = h, r.push(function(e) {
          n.specialAttribute(e, E, b), w()
        }), b()) : (E = h === 0 ? x : h, (h === 0 ? f : r).push(function(e) {
          n.attribute(e, E, b), w()
        }), n.attributePlaceholder)
      }
    }), e
  }), define("can/view/mustache", ["can/util/library", "can/view/scope", "can/view", "can/view/scanner", "can/compute", "can/view/render"], function(e) {
    e.view.ext = ".mustache";
    var t = "scope",
      n = "___h4sh",
      r = "{scope:" + t + ",options:options}",
      i = "{scope:" + t + ",options:options, special: true}",
      s = t + ",options",
      o = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g,
      u = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/,
      a = function(e) {
        return '{get:"' + e.replace(/"/g, '\\"') + '"}'
      },
      f = function(e) {
        return e && typeof e.get == "string"
      },
      l = function(t) {
        return t instanceof e.Map || t && !!t._get
      },
      c = function(e) {
        return e && e.splice && typeof e.length == "number"
      },
      h = function(t, n, r) {
        var i = function(e, r) {
          return t(e || n, r)
        };
        return function(t, s) {
          return t !== undefined && !(t instanceof e.view.Scope) && (t = n.add(t)), s !== undefined && !(s instanceof e.view.Options) && (s = r.add(s)), i(t, s || r)
        }
      },
      p = function(t, n) {
        if (this.constructor !== p) {
          var r = new p(t);
          return function(e, t) {
            return r.render(e, t)
          }
        }
        if (typeof t == "function") {
          this.template = {
            fn: t
          };
          return
        }
        e.extend(this, t), this.template = this.scanner.scan(this.text, this.name)
      };
    e.Mustache = window.Mustache = p, p.prototype.render = function(t, n) {
      return t instanceof e.view.Scope || (t = new e.view.Scope(t || {})), n instanceof e.view.Options || (n = new e.view.Options(n || {})), n = n || {}, this.template.fn.call(t, t, n)
    }, e.extend(p.prototype, {
      scanner: new e.view.Scanner({
        text: {
          start: "",
          scope: t,
          options: ",options: options",
          argNames: s
        },
        tokens: [
          ["returnLeft", "{{{", "{{[{&]"],
          ["commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n"],
          ["commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)"],
          ["escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)", function(e) {
            return {
              before: /^\n.+?\n$/.test(e) ? "\n" : "",
              content: e.match(/\{\{(.+?)\}\}/)[1] || ""
            }
          }],
          ["escapeLeft", "{{"],
          ["returnRight", "}}}"],
          ["right", "}}"]
        ],
        helpers: [{
          name: /^>[\s]*\w*/,
          fn: function(t, n) {
            var r = e.trim(t.replace(/^>\s?/, "")).replace(/["|']/g, "");
            return "can.Mustache.renderPartial('" + r + "'," + s + ")"
          }
        }, {
          name: /^\s*data\s/,
          fn: function(e, n) {
            var r = e.match(/["|'](.*)["|']/)[1];
            return "can.proxy(function(__){can.data(can.$(__),'" + r + "', this.attr('.')); }, " + t + ")"
          }
        }, {
          name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
          fn: function(e) {
            var n = /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
              r = e.match(n);
            return "can.proxy(function(__){var " + r[1] + "=can.$(__);with(" + t + ".attr('.')){" + r[2] + "}}, this);"
          }
        }, {
          name: /^.*$/,
          fn: function(t, f) {
            var l = !1,
              c = {
                content: "",
                startTxt: !1,
                startOnlyTxt: !1,
                end: !1
              };
            t = e.trim(t);
            if (t.length && (l = t.match(/^([#^/]|else$)/))) {
              l = l[0];
              switch (l) {
                case "#":
                case "^":
                  f.specialAttribute ? c.startOnlyTxt = !0 : (c.startTxt = !0, c.escaped = 0);
                  break;
                case "/":
                  return c.end = !0, c.content += 'return ___v1ew.join("");}}])', c
              }
              t = t.substring(1)
            }
            if (l !== "else") {
              var h = [],
                p = [],
                d = 0,
                v;
              c.content += "can.Mustache.txt(\n" + (f.specialAttribute ? i : r) + ",\n" + (l ? '"' + l + '"' : "null") + ",", (e.trim(t) + " ").replace(o, function(e, t) {
                d && (v = t.match(u)) ? v[2] ? h.push(v[0]) : p.push(v[4] + ":" + (v[6] ? v[6] : a(v[5]))) : h.push(a(t)), d++
              }), c.content += h.join(","), p.length && (c.content += ",{" + n + ":{" + p.join(",") + "}}")
            }
            l && l !== "else" && (c.content += ",[\n\n");
            switch (l) {
              case "^":
              case "#":
                c.content += "{fn:function(" + s + "){var ___v1ew = [];";
                break;
              case "else":
                c.content += 'return ___v1ew.join("");}},\n{inverse:function(' + s + "){\nvar ___v1ew = [];";
                break;
              default:
                c.content += ")"
            }
            return l || (c.startTxt = !0, c.end = !0), c
          }
        }]
      })
    });
    var d = e.view.Scanner.prototype.helpers;
    for (var v = 0; v < d.length; v++) p.prototype.scanner.helpers.unshift(d[v]);
    return p.txt = function(t, r, i) {
      var s = t.scope,
        o = t.options,
        u = [],
        a = {
          fn: function() {},
          inverse: function() {}
        },
        d, v = s.attr("."),
        m = !0,
        g;
      for (var y = 3; y < arguments.length; y++) {
        var b = arguments[y];
        if (r && e.isArray(b)) a = e.extend.apply(e, [a].concat(b));
        else if (b && b[n]) {
          d = b[n];
          for (var w in d) f(d[w]) && (d[w] = p.get(d[w].get, t, !1, !0))
        } else b && f(b) ? u.push(p.get(b.get, t, !1, !0, !0)) : u.push(b)
      }
      if (f(i)) {
        var E = i.get;
        i = p.get(i.get, t, u.length, !1), m = E === i
      }
      a.fn = h(a.fn, s, o), a.inverse = h(a.inverse, s, o);
      if (r === "^") {
        var S = a.fn;
        a.fn = a.inverse, a.inverse = S
      }
      return (g = m && typeof i == "string" && p.getHelper(i, o) || e.isFunction(i) && !i.isComputed && {
        fn: i
      }) ? (e.extend(a, {
        context: v,
        scope: s,
        contexts: s,
        hash: d
      }), u.push(a), function() {
        return g.fn.apply(v, u) || ""
      }) : function() {
        var t;
        e.isFunction(i) && i.isComputed ? t = i() : t = i;
        var n = u.length ? u : [t],
          s = !0,
          o = [],
          f, h, p;
        if (r)
          for (f = 0; f < n.length; f++) p = n[f], h = typeof p != "undefined" && l(p), c(p) ? r === "#" ? s = s && (h ? !!p.attr("length") : !!p.length) : r === "^" && (s = s && (h ? !p.attr("length") : !p.length)) : s = r === "#" ? s && !!p : r === "^" ? s && !p : s;
        if (s) {
          if (r === "#") {
            if (c(t)) {
              var d = l(t);
              for (f = 0; f < t.length; f++) o.push(a.fn(d ? t.attr("" + f) : t[f]));
              return o.join("")
            }
            return a.fn(t || {}) || ""
          }
          return r === "^" ? a.inverse(t || {}) || "" : "" + (t != null ? t : "")
        }
        return ""
      }
    }, p.get = function(t, n, r, i, s) {
      var o = n.scope.attr("."),
        u = n.options || {};
      if (r) {
        if (p.getHelper(t, u)) return t;
        if (n.scope && e.isFunction(o[t])) return o[t]
      }
      var a = n.scope.computeData(t, {
          isArgument: i,
          args: [o, n.scope]
        }),
        f = a.compute;
      e.compute.temporarilyBind(f);
      var l = a.initialValue;
      return !s && (l === undefined || a.scope !== n.scope) && p.getHelper(t, u) ? t : f.hasDependencies ? f : l
    }, p.resolve = function(t) {
      return l(t) && c(t) && t.attr("length") ? t : e.isFunction(t) ? t() : t
    }, e.view.Options = e.view.Scope.extend({
      init: function(t, n) {
        !t.helpers && !t.partials && !t.tags && (t = {
          helpers: t
        }), e.view.Scope.prototype.init.apply(this, arguments)
      }
    }), p._helpers = {}, p.registerHelper = function(e, t) {
      this._helpers[e] = {
        name: e,
        fn: t
      }
    }, p.getHelper = function(e, t) {
      var n = t.attr("helpers." + e);
      return n ? {
        fn: n
      } : this._helpers[e]
    }, p.render = function(t, n, r) {
      if (!e.view.cached[t]) {
        var i = e.__clearReading();
        n.attr("partial") && (t = n.attr("partial")), e.__setReading(i)
      }
      return e.view.render(t, n, r)
    }, p.safeString = function(e) {
      return {
        toString: function() {
          return e
        }
      }
    }, p.renderPartial = function(t, n, r) {
      var i = r.attr("partials." + t);
      return i ? i.render ? i.render(n, r) : i(n, r) : e.Mustache.render(t, n, r)
    }, e.each({
      "if": function(t, n) {
        var r;
        return e.isFunction(t) ? r = e.compute.truthy(t)() : r = !!p.resolve(t), r ? n.fn(n.contexts || this) : n.inverse(n.contexts || this)
      },
      unless: function(t, n) {
        return p._helpers["if"].fn.apply(this, [e.isFunction(t) ? e.compute(function() {
          return !t()
        }) : !t, n])
      },
      each: function(t, n) {
        var r = p.resolve(t),
          i = [],
          s, o, u;
        if (e.view.lists && (r instanceof e.List || t && t.isComputed && r === undefined)) return e.view.lists(t, function(e, t) {
          return n.fn(n.scope.add({
            "@index": t
          }).add(e))
        });
        t = r;
        if (!!t && c(t)) {
          for (u = 0; u < t.length; u++) i.push(n.fn(n.scope.add({
            "@index": u
          }).add(t[u])));
          return i.join("")
        }
        if (l(t)) {
          s = e.Map.keys(t);
          for (u = 0; u < s.length; u++) o = s[u], i.push(n.fn(n.scope.add({
            "@key": o
          }).add(t[o])));
          return i.join("")
        }
        if (t instanceof Object) {
          for (o in t) i.push(n.fn(n.scope.add({
            "@key": o
          }).add(t[o])));
          return i.join("")
        }
      },
      "with": function(e, t) {
        var n = e;
        e = p.resolve(e);
        if (!!e) return t.fn(n)
      },
      log: function(e, t) {
        typeof console != "undefined" && console.log && (t ? console.log(e, t.context) : console.log(e.context))
      },
      "@index": function(t, n) {
        n || (n = t, t = 0);
        var r = n.scope.attr("@index");
        return "" + ((e.isFunction(r) ? r() : r) + t)
      }
    }, function(e, t) {
      p.registerHelper(t, e)
    }), e.view.register({
      suffix: "mustache",
      contentType: "x-mustache-template",
      script: function(e, t) {
        return "can.Mustache(function(" + s + ") { " + (new p({
          text: t,
          name: e
        })).template.out + " })"
      },
      renderer: function(e, t) {
        return p({
          text: t,
          name: e
        })
      }
    }), e.mustache.registerHelper = e.proxy(e.Mustache.registerHelper, e.Mustache), e.mustache.safeString = e.Mustache.safeString, e
  }), define("can/observe", ["can/util/library", "can/map", "can/list", "can/compute"], function(e) {
    return e.Observe = e.Map, e.Observe.startBatch = e.batch.start, e.Observe.stopBatch = e.batch.stop, e.Observe.triggerBatch = e.batch.trigger, e
  }), define("can/view/bindings", ["can/util/library", "can/view/mustache", "can/control"], function(e) {
    var t = function() {
        var e = {
            "": !0,
            "true": !0,
            "false": !1
          },
          t = function(t) {
            if (!t || !t.getAttribute) return;
            var n = t.getAttribute("contenteditable");
            return e[n]
          };
        return function(e) {
          var n = t(e);
          return typeof n == "boolean" ? n : !!t(e.parentNode)
        }
      }(),
      n = function(e) {
        return e[0] === "{" && e[e.length - 1] === "}" ? e.substr(1, e.length - 2) : e
      };
    e.view.attr("can-value", function(r, a) {
      var f = n(r.getAttribute("can-value")),
        l = a.scope.computeData(f, {
          args: []
        }).compute,
        c, h;
      if (r.nodeName.toLowerCase() === "input") {
        r.type === "checkbox" && (e.attr.has(r, "can-true-value") ? c = r.getAttribute("can-true-value") : c = !0, e.attr.has(r, "can-false-value") ? h = r.getAttribute("can-false-value") : h = !1);
        if (r.type === "checkbox" || r.type === "radio") {
          new s(r, {
            value: l,
            trueValue: c,
            falseValue: h
          });
          return
        }
      }
      if (r.nodeName.toLowerCase() === "select" && r.multiple) {
        new o(r, {
          value: l
        });
        return
      }
      if (t(r)) {
        new u(r, {
          value: l
        });
        return
      }
      new i(r, {
        value: l
      })
    });
    var r = {
      enter: function(e, t, n) {
        return {
          event: "keyup",
          handler: function(e) {
            if (e.keyCode === 13) return n.call(this, e)
          }
        }
      }
    };
    e.view.attr(/can-[\w\.]+/, function(t, i) {
      var s = i.attributeName,
        o = s.substr("can-".length),
        u = function(r) {
          var o = n(t.getAttribute(s)),
            u = i.scope.read(o, {
              returnObserveMethods: !0,
              isArgument: !0
            });
          return u.value.call(u.parent, i.scope._context, e.$(this), r)
        };
      if (r[o]) {
        var a = r[o](i, t, u);
        u = a.handler, o = a.event
      }
      e.bind.call(t, o, u)
    });
    var i = e.Control.extend({
        init: function() {
          this.element[0].nodeName.toUpperCase() === "SELECT" ? setTimeout(e.proxy(this.set, this), 1) : this.set()
        },
        "{value} change": "set",
        set: function() {
          if (!this.element) return;
          var e = this.options.value();
          this.element[0].value = e == null ? "" : e
        },
        change: function() {
          if (!this.element) return;
          this.options.value(this.element[0].value)
        }
      }),
      s = e.Control.extend({
        init: function() {
          this.isCheckbox = this.element[0].type.toLowerCase() === "checkbox", this.check()
        },
        "{value} change": "check",
        check: function() {
          if (this.isCheckbox) {
            var t = this.options.value(),
              n = this.options.trueValue || !0;
            this.element[0].checked = t === n
          } else {
            var r = this.options.value() == this.element[0].value ? "set" : "remove";
            e.attr[r](this.element[0], "checked", !0)
          }
        },
        change: function() {
          this.isCheckbox ? this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue) : this.element[0].checked && this.options.value(this.element[0].value)
        }
      }),
      o = i.extend({
        init: function() {
          this.delimiter = ";", this.set()
        },
        set: function() {
          var t = this.options.value();
          typeof t == "string" ? (t = t.split(this.delimiter), this.isString = !0) : t && (t = e.makeArray(t));
          var n = {};
          e.each(t, function(e) {
            n[e] = !0
          }), e.each(this.element[0].childNodes, function(e) {
            e.value && (e.selected = !!n[e.value])
          })
        },
        get: function() {
          var t = [],
            n = this.element[0].childNodes;
          return e.each(n, function(e) {
            e.selected && e.value && t.push(e.value)
          }), t
        },
        change: function() {
          var t = this.get(),
            n = this.options.value();
          this.isString || typeof n == "string" ? (this.isString = !0, this.options.value(t.join(this.delimiter))) : n instanceof e.List ? n.attr(t, !0) : this.options.value(t)
        }
      }),
      u = e.Control.extend({
        init: function() {
          this.set(), this.on("blur", "setValue")
        },
        "{value} change": "set",
        set: function() {
          var e = this.options.value();
          this.element[0].innerHTML = typeof e == "undefined" ? "" : e
        },
        setValue: function() {
          this.options.value(this.element[0].innerHTML)
        }
      })
  }), define("can/component", ["can/util/library", "can/view/callbacks", "can/control", "can/observe", "can/view/mustache", "can/view/bindings"], function(e, t) {
    var n = /^(dataViewId|class|id)$/i,
      r = /\{([^\}]+)\}/g,
      i = e.Component = e.Construct.extend({
        setup: function() {
          e.Construct.setup.apply(this, arguments);
          if (e.Component) {
            var t = this,
              n = this.prototype.scope;
            this.Control = s.extend(this.prototype.events), !n || typeof n == "object" && !(n instanceof e.Map) ? this.Map = e.Map.extend(n || {}) : n.prototype instanceof e.Map && (this.Map = n), this.attributeScopeMappings = {}, e.each(this.Map ? this.Map.defaults : {}, function(e, n) {
              e === "@" && (t.attributeScopeMappings[n] = n)
            });
            if (this.prototype.template)
              if (typeof this.prototype.template == "function") {
                var r = this.prototype.template;
                this.renderer = function() {
                  return e.view.frag(r.apply(null, arguments))
                }
              } else this.renderer = e.view.mustache(this.prototype.template);
            e.view.tag(this.prototype.tag, function(e, n) {
              new t(e, n)
            })
          }
        }
      }, {
        setup: function(r, i) {
          var s = {},
            o = this,
            u = {},
            a, f, l;
          e.each(this.constructor.attributeScopeMappings, function(t, n) {
            s[n] = r.getAttribute(e.hyphenate(t))
          }), e.each(e.makeArray(r.attributes), function(l, c) {
            var h = e.camelize(l.nodeName.toLowerCase()),
              p = l.value;
            if (o.constructor.attributeScopeMappings[h] || n.test(h) || t.attr(l.nodeName)) return;
            if (p[0] === "{" && p[p.length - 1] === "}") p = p.substr(1, p.length - 2);
            else if (i.templateType !== "legacy") {
              s[h] = p;
              return
            }
            var d = i.scope.computeData(p, {
                args: []
              }),
              v = d.compute,
              m = function(e, t) {
                a = h, f.attr(h, t), a = null
              };
            v.bind("change", m), s[h] = v(), v.hasDependencies ? (e.bind.call(r, "removed", function() {
              v.unbind("change", m)
            }), u[h] = d) : v.unbind("change", m)
          });
          if (this.constructor.Map) f = new this.constructor.Map(s);
          else if (this.scope instanceof e.Map) f = this.scope;
          else if (e.isFunction(this.scope)) {
            var c = this.scope(s, i.scope, r);
            c instanceof e.Map ? f = c : c.prototype instanceof e.Map ? f = new c(s) : f = new(e.Map.extend(c))(s)
          }
          var h = {};
          e.each(u, function(e, t) {
            h[t] = function(n, r) {
              a !== t && e.compute(r)
            }, f.bind(t, h[t])
          }), e.bind.call(r, "removed", function() {
            e.each(h, function(e, t) {
              f.unbind(t, h[t])
            })
          }), (!e.isEmptyObject(this.constructor.attributeScopeMappings) || i.templateType !== "legacy") && e.bind.call(r, "attributes", function(t) {
            var i = e.camelize(t.attributeName);
            !u[i] && !n.test(i) && f.attr(i, r.getAttribute(t.attributeName))
          }), this.scope = f, e.data(e.$(r), "scope", this.scope);
          var p = i.scope.add(this.scope),
            d = {
              helpers: {}
            };
          e.each(this.helpers || {}, function(t, n) {
            e.isFunction(t) && (d.helpers[n] = function() {
              return t.apply(f, arguments)
            })
          }), this._control = new this.constructor.Control(r, {
            scope: this.scope
          }), this.constructor.renderer ? (d.tags || (d.tags = {}), d.tags.content = function v(t, n) {
            var r = i.subtemplate || n.subtemplate;
            r && (delete d.tags.content, e.view.live.replace([t], r(n.scope, n.options)), d.tags.content = v)
          }, l = this.constructor.renderer(p, i.options.add(d))) : i.templateType === "legacy" ? l = e.view.frag(i.subtemplate ? i.subtemplate(p, i.options.add(d)) : "") : l = i.subtemplate ? i.subtemplate(p, i.options.add(d)) : document.createDocumentFragment(), e.appendChild(r, l)
        }
      }),
      s = e.Control.extend({
        _lookup: function(e) {
          return [e.scope, e, window]
        },
        _action: function(t, n, i) {
          var s, o;
          r.lastIndex = 0, s = r.test(t);
          if (!i && s) return;
          if (!s) return e.Control._action.apply(this, arguments);
          o = e.compute(function() {
            var i, s = t.replace(r, function(t, r) {
                var s;
                return r === "scope" ? (i = n.scope, "") : (r = r.replace(/^scope\./, ""), s = e.compute.read(n.scope, r.split("."), {
                  isArgument: !0
                }).value, s === undefined && (s = e.getObject(r)), typeof s == "string" ? s : (i = s, ""))
              }),
              o = s.split(/\s+/g),
              u = o.pop();
            return {
              processor: this.processors[u] || this.processors.click,
              parts: [s, o.join(" "), u],
              delegate: i || undefined
            }
          }, this);
          var u = function(e, n) {
            i._bindings.control[t](i.element), i._bindings.control[t] = n.processor(n.delegate || i.element, n.parts[2], n.parts[1], t, i)
          };
          return o.bind("change", u), i._bindings.readyComputes[t] = {
            compute: o,
            handler: u
          }, o()
        }
      }, {
        setup: function(t, n) {
          return this.scope = n.scope, e.Control.prototype.setup.call(this, t, n)
        },
        off: function() {
          this._bindings && e.each(this._bindings.readyComputes || {}, function(e) {
            e.compute.unbind("change", e.handler)
          }), e.Control.prototype.off.apply(this, arguments), this._bindings.readyComputes = {}
        }
      });
    return window.$ && $.fn && ($.fn.scope = function(e) {
      return e ? this.data("scope").attr(e) : this.data("scope")
    }), e.scope = function(t, n) {
      return t = e.$(t), n ? e.data(t, "scope").attr(n) : e.data(t, "scope")
    }, i
  }), define("can", ["can/util/library", "can/control/route", "can/model", "can/view/mustache", "can/component"], function(e) {
    return e
  }),
  function(e) {
    typeof define == "function" && define.amd ? define("jquery.cookie", ["jquery"], e) : typeof exports == "object" ? e(require("jquery")) : e(jQuery)
  }(function(e) {
    function n(e) {
      return u.raw ? e : encodeURIComponent(e)
    }

    function r(e) {
      return u.raw ? e : decodeURIComponent(e)
    }

    function i(e) {
      return n(u.json ? JSON.stringify(e) : String(e))
    }

    function s(e) {
      e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
      try {
        return e = decodeURIComponent(e.replace(t, " ")), u.json ? JSON.parse(e) : e
      } catch (n) {}
    }

    function o(t, n) {
      var r = u.raw ? t : s(t);
      return e.isFunction(n) ? n(r) : r
    }
    var t = /\+/g,
      u = e.cookie = function(t, s, a) {
        if (s !== undefined && !e.isFunction(s)) {
          a = e.extend({}, u.defaults, a);
          if (typeof a.expires == "number") {
            var f = a.expires,
              l = a.expires = new Date;
            l.setTime(+l + f * 864e5)
          }
          return document.cookie = [n(t), "=", i(s), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
        }
        var c = t ? undefined : {},
          h = document.cookie ? document.cookie.split("; ") : [];
        for (var p = 0, d = h.length; p < d; p++) {
          var v = h[p].split("="),
            m = r(v.shift()),
            g = v.join("=");
          if (t && t === m) {
            c = o(g, s);
            break
          }!t && (g = o(g)) !== undefined && (c[m] = g)
        }
        return c
      };
    u.defaults = {}, e.removeCookie = function(t, n) {
      return e.cookie(t) === undefined ? !1 : (e.cookie(t, "", e.extend({}, n, {
        expires: -1
      })), !e.cookie(t))
    }
  }),
  function() {
    var e = this,
      t = e._,
      n = Array.prototype,
      r = Object.prototype,
      i = Function.prototype,
      s = n.push,
      o = n.slice,
      u = n.concat,
      a = r.toString,
      f = r.hasOwnProperty,
      l = Array.isArray,
      c = Object.keys,
      h = i.bind,
      p = function(e) {
        return e instanceof p ? e : this instanceof p ? void(this._wrapped = e) : new p(e)
      };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = p), exports._ = p) : e._ = p, p.VERSION = "1.7.0";
    var d = function(e, t, n) {
      if (t === void 0) return e;
      switch (null == n ? 3 : n) {
        case 1:
          return function(n) {
            return e.call(t, n)
          };
        case 2:
          return function(n, r) {
            return e.call(t, n, r)
          };
        case 3:
          return function(n, r, i) {
            return e.call(t, n, r, i)
          };
        case 4:
          return function(n, r, i, s) {
            return e.call(t, n, r, i, s)
          }
      }
      return function() {
        return e.apply(t, arguments)
      }
    };
    p.iteratee = function(e, t, n) {
      return null == e ? p.identity : p.isFunction(e) ? d(e, t, n) : p.isObject(e) ? p.matches(e) : p.property(e)
    }, p.each = p.forEach = function(e, t, n) {
      if (null == e) return e;
      t = d(t, n);
      var r, i = e.length;
      if (i === +i)
        for (r = 0; i > r; r++) t(e[r], r, e);
      else {
        var s = p.keys(e);
        for (r = 0, i = s.length; i > r; r++) t(e[s[r]], s[r], e)
      }
      return e
    }, p.map = p.collect = function(e, t, n) {
      if (null == e) return [];
      t = p.iteratee(t, n);
      for (var r, i = e.length !== +e.length && p.keys(e), s = (i || e).length, o = Array(s), u = 0; s > u; u++) r = i ? i[u] : u, o[u] = t(e[r], r, e);
      return o
    };
    var v = "Reduce of empty array with no initial value";
    p.reduce = p.foldl = p.inject = function(e, t, n, r) {
      null == e && (e = []), t = d(t, r, 4);
      var i, s = e.length !== +e.length && p.keys(e),
        o = (s || e).length,
        u = 0;
      if (arguments.length < 3) {
        if (!o) throw new TypeError(v);
        n = e[s ? s[u++] : u++]
      }
      for (; o > u; u++) i = s ? s[u] : u, n = t(n, e[i], i, e);
      return n
    }, p.reduceRight = p.foldr = function(e, t, n, r) {
      null == e && (e = []), t = d(t, r, 4);
      var i, s = e.length !== +e.length && p.keys(e),
        o = (s || e).length;
      if (arguments.length < 3) {
        if (!o) throw new TypeError(v);
        n = e[s ? s[--o] : --o]
      }
      for (; o--;) i = s ? s[o] : o, n = t(n, e[i], i, e);
      return n
    }, p.find = p.detect = function(e, t, n) {
      var r;
      return t = p.iteratee(t, n), p.some(e, function(e, n, i) {
        return t(e, n, i) ? (r = e, !0) : void 0
      }), r
    }, p.filter = p.select = function(e, t, n) {
      var r = [];
      return null == e ? r : (t = p.iteratee(t, n), p.each(e, function(e, n, i) {
        t(e, n, i) && r.push(e)
      }), r)
    }, p.reject = function(e, t, n) {
      return p.filter(e, p.negate(p.iteratee(t)), n)
    }, p.every = p.all = function(e, t, n) {
      if (null == e) return !0;
      t = p.iteratee(t, n);
      var r, i, s = e.length !== +e.length && p.keys(e),
        o = (s || e).length;
      for (r = 0; o > r; r++)
        if (i = s ? s[r] : r, !t(e[i], i, e)) return !1;
      return !0
    }, p.some = p.any = function(e, t, n) {
      if (null == e) return !1;
      t = p.iteratee(t, n);
      var r, i, s = e.length !== +e.length && p.keys(e),
        o = (s || e).length;
      for (r = 0; o > r; r++)
        if (i = s ? s[r] : r, t(e[i], i, e)) return !0;
      return !1
    }, p.contains = p.include = function(e, t) {
      return null == e ? !1 : (e.length !== +e.length && (e = p.values(e)), p.indexOf(e, t) >= 0)
    }, p.invoke = function(e, t) {
      var n = o.call(arguments, 2),
        r = p.isFunction(t);
      return p.map(e, function(e) {
        return (r ? t : e[t]).apply(e, n)
      })
    }, p.pluck = function(e, t) {
      return p.map(e, p.property(t))
    }, p.where = function(e, t) {
      return p.filter(e, p.matches(t))
    }, p.findWhere = function(e, t) {
      return p.find(e, p.matches(t))
    }, p.max = function(e, t, n) {
      var r, i, s = -1 / 0,
        o = -1 / 0;
      if (null == t && null != e) {
        e = e.length === +e.length ? e : p.values(e);
        for (var u = 0, a = e.length; a > u; u++) r = e[u], r > s && (s = r)
      } else t = p.iteratee(t, n), p.each(e, function(e, n, r) {
        i = t(e, n, r), (i > o || i === -1 / 0 && s === -1 / 0) && (s = e, o = i)
      });
      return s
    }, p.min = function(e, t, n) {
      var r, i, s = 1 / 0,
        o = 1 / 0;
      if (null == t && null != e) {
        e = e.length === +e.length ? e : p.values(e);
        for (var u = 0, a = e.length; a > u; u++) r = e[u], s > r && (s = r)
      } else t = p.iteratee(t, n), p.each(e, function(e, n, r) {
        i = t(e, n, r), (o > i || 1 / 0 === i && 1 / 0 === s) && (s = e, o = i)
      });
      return s
    }, p.shuffle = function(e) {
      for (var t, n = e && e.length === +e.length ? e : p.values(e), r = n.length, i = Array(r), s = 0; r > s; s++) t = p.random(0, s), t !== s && (i[s] = i[t]), i[t] = n[s];
      return i
    }, p.sample = function(e, t, n) {
      return null == t || n ? (e.length !== +e.length && (e = p.values(e)), e[p.random(e.length - 1)]) : p.shuffle(e).slice(0, Math.max(0, t))
    }, p.sortBy = function(e, t, n) {
      return t = p.iteratee(t, n), p.pluck(p.map(e, function(e, n, r) {
        return {
          value: e,
          index: n,
          criteria: t(e, n, r)
        }
      }).sort(function(e, t) {
        var n = e.criteria,
          r = t.criteria;
        if (n !== r) {
          if (n > r || n === void 0) return 1;
          if (r > n || r === void 0) return -1
        }
        return e.index - t.index
      }), "value")
    };
    var m = function(e) {
      return function(t, n, r) {
        var i = {};
        return n = p.iteratee(n, r), p.each(t, function(r, s) {
          var o = n(r, s, t);
          e(i, r, o)
        }), i
      }
    };
    p.groupBy = m(function(e, t, n) {
      p.has(e, n) ? e[n].push(t) : e[n] = [t]
    }), p.indexBy = m(function(e, t, n) {
      e[n] = t
    }), p.countBy = m(function(e, t, n) {
      p.has(e, n) ? e[n] ++ : e[n] = 1
    }), p.sortedIndex = function(e, t, n, r) {
      n = p.iteratee(n, r, 1);
      for (var i = n(t), s = 0, o = e.length; o > s;) {
        var u = s + o >>> 1;
        n(e[u]) < i ? s = u + 1 : o = u
      }
      return s
    }, p.toArray = function(e) {
      return e ? p.isArray(e) ? o.call(e) : e.length === +e.length ? p.map(e, p.identity) : p.values(e) : []
    }, p.size = function(e) {
      return null == e ? 0 : e.length === +e.length ? e.length : p.keys(e).length
    }, p.partition = function(e, t, n) {
      t = p.iteratee(t, n);
      var r = [],
        i = [];
      return p.each(e, function(e, n, s) {
        (t(e, n, s) ? r : i).push(e)
      }), [r, i]
    }, p.first = p.head = p.take = function(e, t, n) {
      return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : o.call(e, 0, t)
    }, p.initial = function(e, t, n) {
      return o.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
    }, p.last = function(e, t, n) {
      return null == e ? void 0 : null == t || n ? e[e.length - 1] : o.call(e, Math.max(e.length - t, 0))
    }, p.rest = p.tail = p.drop = function(e, t, n) {
      return o.call(e, null == t || n ? 1 : t)
    }, p.compact = function(e) {
      return p.filter(e, p.identity)
    };
    var g = function(e, t, n, r) {
      if (t && p.every(e, p.isArray)) return u.apply(r, e);
      for (var i = 0, o = e.length; o > i; i++) {
        var a = e[i];
        p.isArray(a) || p.isArguments(a) ? t ? s.apply(r, a) : g(a, t, n, r) : n || r.push(a)
      }
      return r
    };
    p.flatten = function(e, t) {
      return g(e, t, !1, [])
    }, p.without = function(e) {
      return p.difference(e, o.call(arguments, 1))
    }, p.uniq = p.unique = function(e, t, n, r) {
      if (null == e) return [];
      p.isBoolean(t) || (r = n, n = t, t = !1), null != n && (n = p.iteratee(n, r));
      for (var i = [], s = [], o = 0, u = e.length; u > o; o++) {
        var a = e[o];
        if (t) o && s === a || i.push(a), s = a;
        else if (n) {
          var f = n(a, o, e);
          p.indexOf(s, f) < 0 && (s.push(f), i.push(a))
        } else p.indexOf(i, a) < 0 && i.push(a)
      }
      return i
    }, p.union = function() {
      return p.uniq(g(arguments, !0, !0, []))
    }, p.intersection = function(e) {
      if (null == e) return [];
      for (var t = [], n = arguments.length, r = 0, i = e.length; i > r; r++) {
        var s = e[r];
        if (!p.contains(t, s)) {
          for (var o = 1; n > o && p.contains(arguments[o], s); o++);
          o === n && t.push(s)
        }
      }
      return t
    }, p.difference = function(e) {
      var t = g(o.call(arguments, 1), !0, !0, []);
      return p.filter(e, function(e) {
        return !p.contains(t, e)
      })
    }, p.zip = function(e) {
      if (null == e) return [];
      for (var t = p.max(arguments, "length").length, n = Array(t), r = 0; t > r; r++) n[r] = p.pluck(arguments, r);
      return n
    }, p.object = function(e, t) {
      if (null == e) return {};
      for (var n = {}, r = 0, i = e.length; i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
      return n
    }, p.indexOf = function(e, t, n) {
      if (null == e) return -1;
      var r = 0,
        i = e.length;
      if (n) {
        if ("number" != typeof n) return r = p.sortedIndex(e, t), e[r] === t ? r : -1;
        r = 0 > n ? Math.max(0, i + n) : n
      }
      for (; i > r; r++)
        if (e[r] === t) return r;
      return -1
    }, p.lastIndexOf = function(e, t, n) {
      if (null == e) return -1;
      var r = e.length;
      for ("number" == typeof n && (r = 0 > n ? r + n + 1 : Math.min(r, n + 1)); --r >= 0;)
        if (e[r] === t) return r;
      return -1
    }, p.range = function(e, t, n) {
      arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
      for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), s = 0; r > s; s++, e += n) i[s] = e;
      return i
    };
    var y = function() {};
    p.bind = function(e, t) {
      var n, r;
      if (h && e.bind === h) return h.apply(e, o.call(arguments, 1));
      if (!p.isFunction(e)) throw new TypeError("Bind must be called on a function");
      return n = o.call(arguments, 2), r = function() {
        if (this instanceof r) {
          y.prototype = e.prototype;
          var i = new y;
          y.prototype = null;
          var s = e.apply(i, n.concat(o.call(arguments)));
          return p.isObject(s) ? s : i
        }
        return e.apply(t, n.concat(o.call(arguments)))
      }
    }, p.partial = function(e) {
      var t = o.call(arguments, 1);
      return function() {
        for (var n = 0, r = t.slice(), i = 0, s = r.length; s > i; i++) r[i] === p && (r[i] = arguments[n++]);
        for (; n < arguments.length;) r.push(arguments[n++]);
        return e.apply(this, r)
      }
    }, p.bindAll = function(e) {
      var t, n, r = arguments.length;
      if (1 >= r) throw new Error("bindAll must be passed function names");
      for (t = 1; r > t; t++) n = arguments[t], e[n] = p.bind(e[n], e);
      return e
    }, p.memoize = function(e, t) {
      var n = function(r) {
        var i = n.cache,
          s = t ? t.apply(this, arguments) : r;
        return p.has(i, s) || (i[s] = e.apply(this, arguments)), i[s]
      };
      return n.cache = {}, n
    }, p.delay = function(e, t) {
      var n = o.call(arguments, 2);
      return setTimeout(function() {
        return e.apply(null, n)
      }, t)
    }, p.defer = function(e) {
      return p.delay.apply(p, [e, 1].concat(o.call(arguments, 1)))
    }, p.throttle = function(e, t, n) {
      var r, i, s, o = null,
        u = 0;
      n || (n = {});
      var a = function() {
        u = n.leading === !1 ? 0 : p.now(), o = null, s = e.apply(r, i), o || (r = i = null)
      };
      return function() {
        var f = p.now();
        u || n.leading !== !1 || (u = f);
        var l = t - (f - u);
        return r = this, i = arguments, 0 >= l || l > t ? (clearTimeout(o), o = null, u = f, s = e.apply(r, i), o || (r = i = null)) : o || n.trailing === !1 || (o = setTimeout(a, l)), s
      }
    }, p.debounce = function(e, t, n) {
      var r, i, s, o, u, a = function() {
        var f = p.now() - o;
        t > f && f > 0 ? r = setTimeout(a, t - f) : (r = null, n || (u = e.apply(s, i), r || (s = i = null)))
      };
      return function() {
        s = this, i = arguments, o = p.now();
        var f = n && !r;
        return r || (r = setTimeout(a, t)), f && (u = e.apply(s, i), s = i = null), u
      }
    }, p.wrap = function(e, t) {
      return p.partial(t, e)
    }, p.negate = function(e) {
      return function() {
        return !e.apply(this, arguments)
      }
    }, p.compose = function() {
      var e = arguments,
        t = e.length - 1;
      return function() {
        for (var n = t, r = e[t].apply(this, arguments); n--;) r = e[n].call(this, r);
        return r
      }
    }, p.after = function(e, t) {
      return function() {
        return --e < 1 ? t.apply(this, arguments) : void 0
      }
    }, p.before = function(e, t) {
      var n;
      return function() {
        return --e > 0 ? n = t.apply(this, arguments) : t = null, n
      }
    }, p.once = p.partial(p.before, 2), p.keys = function(e) {
      if (!p.isObject(e)) return [];
      if (c) return c(e);
      var t = [];
      for (var n in e) p.has(e, n) && t.push(n);
      return t
    }, p.values = function(e) {
      for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = e[t[i]];
      return r
    }, p.pairs = function(e) {
      for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = [t[i], e[t[i]]];
      return r
    }, p.invert = function(e) {
      for (var t = {}, n = p.keys(e), r = 0, i = n.length; i > r; r++) t[e[n[r]]] = n[r];
      return t
    }, p.functions = p.methods = function(e) {
      var t = [];
      for (var n in e) p.isFunction(e[n]) && t.push(n);
      return t.sort()
    }, p.extend = function(e) {
      if (!p.isObject(e)) return e;
      for (var t, n, r = 1, i = arguments.length; i > r; r++) {
        t = arguments[r];
        for (n in t) f.call(t, n) && (e[n] = t[n])
      }
      return e
    }, p.pick = function(e, t, n) {
      var r, i = {};
      if (null == e) return i;
      if (p.isFunction(t)) {
        t = d(t, n);
        for (r in e) {
          var s = e[r];
          t(s, r, e) && (i[r] = s)
        }
      } else {
        var a = u.apply([], o.call(arguments, 1));
        e = new Object(e);
        for (var f = 0, l = a.length; l > f; f++) r = a[f], r in e && (i[r] = e[r])
      }
      return i
    }, p.omit = function(e, t, n) {
      if (p.isFunction(t)) t = p.negate(t);
      else {
        var r = p.map(u.apply([], o.call(arguments, 1)), String);
        t = function(e, t) {
          return !p.contains(r, t)
        }
      }
      return p.pick(e, t, n)
    }, p.defaults = function(e) {
      if (!p.isObject(e)) return e;
      for (var t = 1, n = arguments.length; n > t; t++) {
        var r = arguments[t];
        for (var i in r) e[i] === void 0 && (e[i] = r[i])
      }
      return e
    }, p.clone = function(e) {
      return p.isObject(e) ? p.isArray(e) ? e.slice() : p.extend({}, e) : e
    }, p.tap = function(e, t) {
      return t(e), e
    };
    var b = function(e, t, n, r) {
      if (e === t) return 0 !== e || 1 / e === 1 / t;
      if (null == e || null == t) return e === t;
      e instanceof p && (e = e._wrapped), t instanceof p && (t = t._wrapped);
      var i = a.call(e);
      if (i !== a.call(t)) return !1;
      switch (i) {
        case "[object RegExp]":
        case "[object String]":
          return "" + e == "" + t;
        case "[object Number]":
          return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
        case "[object Date]":
        case "[object Boolean]":
          return +e === +t
      }
      if ("object" != typeof e || "object" != typeof t) return !1;
      for (var s = n.length; s--;)
        if (n[s] === e) return r[s] === t;
      var o = e.constructor,
        u = t.constructor;
      if (o !== u && "constructor" in e && "constructor" in t && !(p.isFunction(o) && o instanceof o && p.isFunction(u) && u instanceof u)) return !1;
      n.push(e), r.push(t);
      var f, l;
      if ("[object Array]" === i) {
        if (f = e.length, l = f === t.length)
          for (; f-- && (l = b(e[f], t[f], n, r)););
      } else {
        var c, h = p.keys(e);
        if (f = h.length, l = p.keys(t).length === f)
          for (; f-- && (c = h[f], l = p.has(t, c) && b(e[c], t[c], n, r)););
      }
      return n.pop(), r.pop(), l
    };
    p.isEqual = function(e, t) {
      return b(e, t, [], [])
    }, p.isEmpty = function(e) {
      if (null == e) return !0;
      if (p.isArray(e) || p.isString(e) || p.isArguments(e)) return 0 === e.length;
      for (var t in e)
        if (p.has(e, t)) return !1;
      return !0
    }, p.isElement = function(e) {
      return !!e && 1 === e.nodeType
    }, p.isArray = l || function(e) {
      return "[object Array]" === a.call(e)
    }, p.isObject = function(e) {
      var t = typeof e;
      return "function" === t || "object" === t && !!e
    }, p.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
      p["is" + e] = function(t) {
        return a.call(t) === "[object " + e + "]"
      }
    }), p.isArguments(arguments) || (p.isArguments = function(e) {
      return p.has(e, "callee")
    }), "function" != typeof /./ && (p.isFunction = function(e) {
      return "function" == typeof e || !1
    }), p.isFinite = function(e) {
      return isFinite(e) && !isNaN(parseFloat(e))
    }, p.isNaN = function(e) {
      return p.isNumber(e) && e !== +e
    }, p.isBoolean = function(e) {
      return e === !0 || e === !1 || "[object Boolean]" === a.call(e)
    }, p.isNull = function(e) {
      return null === e
    }, p.isUndefined = function(e) {
      return e === void 0
    }, p.has = function(e, t) {
      return null != e && f.call(e, t)
    }, p.noConflict = function() {
      return e._ = t, this
    }, p.identity = function(e) {
      return e
    }, p.constant = function(e) {
      return function() {
        return e
      }
    }, p.noop = function() {}, p.property = function(e) {
      return function(t) {
        return t[e]
      }
    }, p.matches = function(e) {
      var t = p.pairs(e),
        n = t.length;
      return function(e) {
        if (null == e) return !n;
        e = new Object(e);
        for (var r = 0; n > r; r++) {
          var i = t[r],
            s = i[0];
          if (i[1] !== e[s] || !(s in e)) return !1
        }
        return !0
      }
    }, p.times = function(e, t, n) {
      var r = Array(Math.max(0, e));
      t = d(t, n, 1);
      for (var i = 0; e > i; i++) r[i] = t(i);
      return r
    }, p.random = function(e, t) {
      return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    }, p.now = Date.now || function() {
      return (new Date).getTime()
    };
    var w = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      },
      E = p.invert(w),
      S = function(e) {
        var t = function(t) {
            return e[t]
          },
          n = "(?:" + p.keys(e).join("|") + ")",
          r = RegExp(n),
          i = RegExp(n, "g");
        return function(e) {
          return e = null == e ? "" : "" + e, r.test(e) ? e.replace(i, t) : e
        }
      };
    p.escape = S(w), p.unescape = S(E), p.result = function(e, t) {
      if (null == e) return void 0;
      var n = e[t];
      return p.isFunction(n) ? e[t]() : n
    };
    var x = 0;
    p.uniqueId = function(e) {
      var t = ++x + "";
      return e ? e + t : t
    }, p.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    var T = /(.)^/,
      N = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
      },
      C = /\\|'|\r|\n|\u2028|\u2029/g,
      k = function(e) {
        return "\\" + N[e]
      };
    p.template = function(e, t, n) {
      !t && n && (t = n), t = p.defaults({}, t, p.templateSettings);
      var r = RegExp([(t.escape || T).source, (t.interpolate || T).source, (t.evaluate || T).source].join("|") + "|$", "g"),
        i = 0,
        s = "__p+='";
      e.replace(r, function(t, n, r, o, u) {
        return s += e.slice(i, u).replace(C, k), i = u + t.length, n ? s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? s += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), t
      }), s += "';\n", t.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
      try {
        var o = new Function(t.variable || "obj", "_", s)
      } catch (u) {
        throw u.source = s, u
      }
      var a = function(e) {
          return o.call(this, e, p)
        },
        f = t.variable || "obj";
      return a.source = "function(" + f + "){\n" + s + "}", a
    }, p.chain = function(e) {
      var t = p(e);
      return t._chain = !0, t
    };
    var L = function(e) {
      return this._chain ? p(e).chain() : e
    };
    p.mixin = function(e) {
      p.each(p.functions(e), function(t) {
        var n = p[t] = e[t];
        p.prototype[t] = function() {
          var e = [this._wrapped];
          return s.apply(e, arguments), L.call(this, n.apply(p, e))
        }
      })
    }, p.mixin(p), p.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
      var t = n[e];
      p.prototype[e] = function() {
        var n = this._wrapped;
        return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], L.call(this, n)
      }
    }), p.each(["concat", "join", "slice"], function(e) {
      var t = n[e];
      p.prototype[e] = function() {
        return L.call(this, t.apply(this._wrapped, arguments))
      }
    }), p.prototype.value = function() {
      return this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
      return p
    })
  }.call(this), ! function(e, t) {
    function n(e, t) {
      var n, r, i = e.toLowerCase();
      for (t = [].concat(t), n = 0; n < t.length; n += 1)
        if (r = t[n]) {
          if (r.test && r.test(e)) return !0;
          if (r.toLowerCase() === i) return !0
        }
    }
    var r = t.prototype.trim,
      i = t.prototype.trimRight,
      s = t.prototype.trimLeft,
      o = function(e) {
        return 1 * e || 0
      },
      u = function(e, t) {
        if (1 > t) return "";
        for (var n = ""; t > 0;) 1 & t && (n += e), t >>= 1, e += e;
        return n
      },
      a = [].slice,
      f = function(e) {
        return null == e ? "\\s" : e.source ? e.source : "[" + d.escapeRegExp(e) + "]"
      },
      l = {
        lt: "<",
        gt: ">",
        quot: '"',
        amp: "&",
        apos: "'"
      },
      c = {};
    for (var h in l) c[l[h]] = h;
    c["'"] = "#39";
    var p = function() {
        function e(e) {
          return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
        }
        var n = u,
          r = function() {
            return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments)
          };
        return r.format = function(r, i) {
          var s, o, u, a, f, l, c, h = 1,
            d = r.length,
            v = "",
            m = [];
          for (o = 0; d > o; o++)
            if (v = e(r[o]), "string" === v) m.push(r[o]);
            else if ("array" === v) {
            if (a = r[o], a[2])
              for (s = i[h], u = 0; u < a[2].length; u++) {
                if (!s.hasOwnProperty(a[2][u])) throw new Error(p('[_.sprintf] property "%s" does not exist', a[2][u]));
                s = s[a[2][u]]
              } else s = a[1] ? i[a[1]] : i[h++];
            if (/[^s]/.test(a[8]) && "number" != e(s)) throw new Error(p("[_.sprintf] expecting number but found %s", e(s)));
            switch (a[8]) {
              case "b":
                s = s.toString(2);
                break;
              case "c":
                s = t.fromCharCode(s);
                break;
              case "d":
                s = parseInt(s, 10);
                break;
              case "e":
                s = a[7] ? s.toExponential(a[7]) : s.toExponential();
                break;
              case "f":
                s = a[7] ? parseFloat(s).toFixed(a[7]) : parseFloat(s);
                break;
              case "o":
                s = s.toString(8);
                break;
              case "s":
                s = (s = t(s)) && a[7] ? s.substring(0, a[7]) : s;
                break;
              case "u":
                s = Math.abs(s);
                break;
              case "x":
                s = s.toString(16);
                break;
              case "X":
                s = s.toString(16).toUpperCase()
            }
            s = /[def]/.test(a[8]) && a[3] && s >= 0 ? "+" + s : s, l = a[4] ? "0" == a[4] ? "0" : a[4].charAt(1) : " ", c = a[6] - t(s).length, f = a[6] ? n(l, c) : "", m.push(a[5] ? s + f : f + s)
          }
          return m.join("")
        }, r.cache = {}, r.parse = function(e) {
          for (var t = e, n = [], r = [], i = 0; t;) {
            if (null !== (n = /^[^\x25]+/.exec(t))) r.push(n[0]);
            else if (null !== (n = /^\x25{2}/.exec(t))) r.push("%");
            else {
              if (null === (n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))) throw new Error("[_.sprintf] huh?");
              if (n[2]) {
                i |= 1;
                var s = [],
                  o = n[2],
                  u = [];
                if (null === (u = /^([a-z_][a-z_\d]*)/i.exec(o))) throw new Error("[_.sprintf] huh?");
                for (s.push(u[1]);
                  "" !== (o = o.substring(u[0].length));)
                  if (null !== (u = /^\.([a-z_][a-z_\d]*)/i.exec(o))) s.push(u[1]);
                  else {
                    if (null === (u = /^\[(\d+)\]/.exec(o))) throw new Error("[_.sprintf] huh?");
                    s.push(u[1])
                  }
                n[2] = s
              } else i |= 2;
              if (3 === i) throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
              r.push(n)
            }
            t = t.substring(n[0].length)
          }
          return r
        }, r
      }(),
      d = {
        VERSION: "2.4.0",
        isBlank: function(e) {
          return null == e && (e = ""), /^\s*$/.test(e)
        },
        stripTags: function(e) {
          return null == e ? "" : t(e).replace(/<\/?[^>]+>/g, "")
        },
        capitalize: function(e) {
          return e = null == e ? "" : t(e), e.charAt(0).toUpperCase() + e.slice(1)
        },
        chop: function(e, n) {
          return null == e ? [] : (e = t(e), n = ~~n, n > 0 ? e.match(new RegExp(".{1," + n + "}", "g")) : [e])
        },
        clean: function(e) {
          return d.strip(e).replace(/\s+/g, " ")
        },
        count: function(e, n) {
          if (null == e || null == n) return 0;
          e = t(e), n = t(n);
          for (var r = 0, i = 0, s = n.length;;) {
            if (i = e.indexOf(n, i), -1 === i) break;
            r++, i += s
          }
          return r
        },
        chars: function(e) {
          return null == e ? [] : t(e).split("")
        },
        swapCase: function(e) {
          return null == e ? "" : t(e).replace(/\S/g, function(e) {
            return e === e.toUpperCase() ? e.toLowerCase() : e.toUpperCase()
          })
        },
        escapeHTML: function(e) {
          return null == e ? "" : t(e).replace(/[&<>"']/g, function(e) {
            return "&" + c[e] + ";"
          })
        },
        unescapeHTML: function(e) {
          return null == e ? "" : t(e).replace(/\&([^;]+);/g, function(e, n) {
            var r;
            return n in l ? l[n] : (r = n.match(/^#x([\da-fA-F]+)$/)) ? t.fromCharCode(parseInt(r[1], 16)) : (r = n.match(/^#(\d+)$/)) ? t.fromCharCode(~~r[1]) : e
          })
        },
        escapeRegExp: function(e) {
          return null == e ? "" : t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        },
        splice: function(e, t, n, r) {
          var i = d.chars(e);
          return i.splice(~~t, ~~n, r), i.join("")
        },
        insert: function(e, t, n) {
          return d.splice(e, t, 0, n)
        },
        include: function(e, n) {
          return "" === n ? !0 : null == e ? !1 : -1 !== t(e).indexOf(n)
        },
        join: function() {
          var e = a.call(arguments),
            t = e.shift();
          return null == t && (t = ""), e.join(t)
        },
        lines: function(e) {
          return null == e ? [] : t(e).split("\n")
        },
        reverse: function(e) {
          return d.chars(e).reverse().join("")
        },
        startsWith: function(e, n) {
          return "" === n ? !0 : null == e || null == n ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(0, n.length) === n)
        },
        endsWith: function(e, n) {
          return "" === n ? !0 : null == e || null == n ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(e.length - n.length) === n)
        },
        succ: function(e) {
          return null == e ? "" : (e = t(e), e.slice(0, -1) + t.fromCharCode(e.charCodeAt(e.length - 1) + 1))
        },
        titleize: function(e) {
          return null == e ? "" : (e = t(e).toLowerCase(), e.replace(/(?:^|\s|-)\S/g, function(e) {
            return e.toUpperCase()
          }))
        },
        camelize: function(e) {
          return d.trim(e).replace(/[-_\s]+(.)?/g, function(e, t) {
            return t ? t.toUpperCase() : ""
          })
        },
        underscored: function(e) {
          return d.trim(e).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
        },
        dasherize: function(e) {
          return d.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
        },
        classify: function(e) {
          return d.capitalize(d.camelize(t(e).replace(/[\W_]/g, " ")).replace(/\s/g, ""))
        },
        humanize: function(e) {
          return d.capitalize(d.underscored(e).replace(/_id$/, "").replace(/_/g, " "))
        },
        trim: function(e, n) {
          return null == e ? "" : !n && r ? r.call(e) : (n = f(n), t(e).replace(new RegExp("^" + n + "+|" + n + "+$", "g"), ""))
        },
        ltrim: function(e, n) {
          return null == e ? "" : !n && s ? s.call(e) : (n = f(n), t(e).replace(new RegExp("^" + n + "+"), ""))
        },
        rtrim: function(e, n) {
          return null == e ? "" : !n && i ? i.call(e) : (n = f(n), t(e).replace(new RegExp(n + "+$"), ""))
        },
        truncate: function(e, n, r) {
          return null == e ? "" : (e = t(e), r = r || "...", n = ~~n, e.length > n ? e.slice(0, n) + r : e)
        },
        prune: function(e, n, r) {
          if (null == e) return "";
          if (e = t(e), n = ~~n, r = null != r ? t(r) : "...", e.length <= n) return e;
          var i = function(e) {
              return e.toUpperCase() !== e.toLowerCase() ? "A" : " "
            },
            s = e.slice(0, n + 1).replace(/.(?=\W*\w*$)/g, i);
          return s = s.slice(s.length - 2).match(/\w\w/) ? s.replace(/\s*\S+$/, "") : d.rtrim(s.slice(0, s.length - 1)), (s + r).length > e.length ? e : e.slice(0, s.length) + r
        },
        words: function(e, t) {
          return d.isBlank(e) ? [] : d.trim(e, t).split(t || /\s+/)
        },
        pad: function(e, n, r, i) {
          e = null == e ? "" : t(e), n = ~~n;
          var s = 0;
          switch (r ? r.length > 1 && (r = r.charAt(0)) : r = " ", i) {
            case "right":
              return s = n - e.length, e + u(r, s);
            case "both":
              return s = n - e.length, u(r, Math.ceil(s / 2)) + e + u(r, Math.floor(s / 2));
            default:
              return s = n - e.length, u(r, s) + e
          }
        },
        lpad: function(e, t, n) {
          return d.pad(e, t, n)
        },
        rpad: function(e, t, n) {
          return d.pad(e, t, n, "right")
        },
        lrpad: function(e, t, n) {
          return d.pad(e, t, n, "both")
        },
        sprintf: p,
        vsprintf: function(e, t) {
          return t.unshift(e), p.apply(null, t)
        },
        toNumber: function(e, t) {
          return e ? (e = d.trim(e), e.match(/^-?\d+(?:\.\d+)?$/) ? o(o(e).toFixed(~~t)) : 0 / 0) : 0
        },
        numberFormat: function(e, t, n, r) {
          if (isNaN(e) || null == e) return "";
          e = e.toFixed(~~t), r = "string" == typeof r ? r : ",";
          var i = e.split("."),
            s = i[0],
            o = i[1] ? (n || ".") + i[1] : "";
          return s.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + r) + o
        },
        strRight: function(e, n) {
          if (null == e) return "";
          e = t(e), n = null != n ? t(n) : n;
          var r = n ? e.indexOf(n) : -1;
          return ~r ? e.slice(r + n.length, e.length) : e
        },
        strRightBack: function(e, n) {
          if (null == e) return "";
          e = t(e), n = null != n ? t(n) : n;
          var r = n ? e.lastIndexOf(n) : -1;
          return ~r ? e.slice(r + n.length, e.length) : e
        },
        strLeft: function(e, n) {
          if (null == e) return "";
          e = t(e), n = null != n ? t(n) : n;
          var r = n ? e.indexOf(n) : -1;
          return ~r ? e.slice(0, r) : e
        },
        strLeftBack: function(e, t) {
          if (null == e) return "";
          e += "", t = null != t ? "" + t : t;
          var n = e.lastIndexOf(t);
          return ~n ? e.slice(0, n) : e
        },
        toSentence: function(e, t, n, r) {
          t = t || ", ", n = n || " and ";
          var i = e.slice(),
            s = i.pop();
          return e.length > 2 && r && (n = d.rtrim(t) + n), i.length ? i.join(t) + n + s : s
        },
        toSentenceSerial: function() {
          var e = a.call(arguments);
          return e[3] = !0, d.toSentence.apply(d, e)
        },
        slugify: function(e) {
          if (null == e) return "";
          var n = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",
            r = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
            i = new RegExp(f(n), "g");
          return e = t(e).toLowerCase().replace(i, function(e) {
            var t = n.indexOf(e);
            return r.charAt(t) || "-"
          }), d.dasherize(e.replace(/[^\w\s-]/g, ""))
        },
        surround: function(e, t) {
          return [t, e, t].join("")
        },
        quote: function(e, t) {
          return d.surround(e, t || '"')
        },
        unquote: function(e, t) {
          return t = t || '"', e[0] === t && e[e.length - 1] === t ? e.slice(1, e.length - 1) : e
        },
        exports: function() {
          var e = {};
          for (var t in this) this.hasOwnProperty(t) && !t.match(/^(?:include|contains|reverse)$/) && (e[t] = this[t]);
          return e
        },
        repeat: function(e, n, r) {
          if (null == e) return "";
          if (n = ~~n, null == r) return u(t(e), n);
          for (var i = []; n > 0; i[--n] = e);
          return i.join(r)
        },
        naturalCmp: function(e, n) {
          if (e == n) return 0;
          if (!e) return -1;
          if (!n) return 1;
          for (var r = /(\.\d+)|(\d+)|(\D+)/g, i = t(e).toLowerCase().match(r), s = t(n).toLowerCase().match(r), o = Math.min(i.length, s.length), u = 0; o > u; u++) {
            var a = i[u],
              f = s[u];
            if (a !== f) {
              var l = parseInt(a, 10);
              if (!isNaN(l)) {
                var c = parseInt(f, 10);
                if (!isNaN(c) && l - c) return l - c
              }
              return f > a ? -1 : 1
            }
          }
          return i.length === s.length ? i.length - s.length : n > e ? -1 : 1
        },
        levenshtein: function(e, n) {
          if (null == e && null == n) return 0;
          if (null == e) return t(n).length;
          if (null == n) return t(e).length;
          e = t(e), n = t(n);
          for (var r, i, s = [], o = 0; o <= n.length; o++)
            for (var u = 0; u <= e.length; u++) i = o && u ? e.charAt(u - 1) === n.charAt(o - 1) ? r : Math.min(s[u], s[u - 1], r) + 1 : o + u, r = s[u], s[u] = i;
          return s.pop()
        },
        toBoolean: function(e, t, r) {
          return "number" == typeof e && (e = "" + e), "string" != typeof e ? !!e : (e = d.trim(e), n(e, t || ["true", "1"]) ? !0 : n(e, r || ["false", "0"]) ? !1 : void 0)
        }
      };
    d.strip = d.trim, d.lstrip = d.ltrim, d.rstrip = d.rtrim, d.center = d.lrpad, d.rjust = d.lpad, d.ljust = d.rpad, d.contains = d.include, d.q = d.quote, d.toBool = d.toBoolean, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (module.exports = d), exports._s = d), "function" == typeof define && define.amd && define("underscore.string", [], function() {
      return d
    }), e._ = e._ || {}, e._.string = e._.str = d
  }(this, String), ! function(e) {
    function t(e, t) {
      var n = (65535 & e) + (65535 & t),
        r = (e >> 16) + (t >> 16) + (n >> 16);
      return r << 16 | 65535 & n
    }

    function n(e, t) {
      return e << t | e >>> 32 - t
    }

    function r(e, r, i, s, o, u) {
      return t(n(t(t(r, e), t(s, u)), o), i)
    }

    function i(e, t, n, i, s, o, u) {
      return r(t & n | ~t & i, e, t, s, o, u)
    }

    function s(e, t, n, i, s, o, u) {
      return r(t & i | n & ~i, e, t, s, o, u)
    }

    function o(e, t, n, i, s, o, u) {
      return r(t ^ n ^ i, e, t, s, o, u)
    }

    function u(e, t, n, i, s, o, u) {
      return r(n ^ (t | ~i), e, t, s, o, u)
    }

    function a(e, n) {
      e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;
      var r, a, f, l, c, h = 1732584193,
        p = -271733879,
        d = -1732584194,
        v = 271733878;
      for (r = 0; r < e.length; r += 16) a = h, f = p, l = d, c = v, h = i(h, p, d, v, e[r], 7, -680876936), v = i(v, h, p, d, e[r + 1], 12, -389564586), d = i(d, v, h, p, e[r + 2], 17, 606105819), p = i(p, d, v, h, e[r + 3], 22, -1044525330), h = i(h, p, d, v, e[r + 4], 7, -176418897), v = i(v, h, p, d, e[r + 5], 12, 1200080426), d = i(d, v, h, p, e[r + 6], 17, -1473231341), p = i(p, d, v, h, e[r + 7], 22, -45705983), h = i(h, p, d, v, e[r + 8], 7, 1770035416), v = i(v, h, p, d, e[r + 9], 12, -1958414417), d = i(d, v, h, p, e[r + 10], 17, -42063), p = i(p, d, v, h, e[r + 11], 22, -1990404162), h = i(h, p, d, v, e[r + 12], 7, 1804603682), v = i(v, h, p, d, e[r + 13], 12, -40341101), d = i(d, v, h, p, e[r + 14], 17, -1502002290), p = i(p, d, v, h, e[r + 15], 22, 1236535329), h = s(h, p, d, v, e[r + 1], 5, -165796510), v = s(v, h, p, d, e[r + 6], 9, -1069501632), d = s(d, v, h, p, e[r + 11], 14, 643717713), p = s(p, d, v, h, e[r], 20, -373897302), h = s(h, p, d, v, e[r + 5], 5, -701558691), v = s(v, h, p, d, e[r + 10], 9, 38016083), d = s(d, v, h, p, e[r + 15], 14, -660478335), p = s(p, d, v, h, e[r + 4], 20, -405537848), h = s(h, p, d, v, e[r + 9], 5, 568446438), v = s(v, h, p, d, e[r + 14], 9, -1019803690), d = s(d, v, h, p, e[r + 3], 14, -187363961), p = s(p, d, v, h, e[r + 8], 20, 1163531501), h = s(h, p, d, v, e[r + 13], 5, -1444681467), v = s(v, h, p, d, e[r + 2], 9, -51403784), d = s(d, v, h, p, e[r + 7], 14, 1735328473), p = s(p, d, v, h, e[r + 12], 20, -1926607734), h = o(h, p, d, v, e[r + 5], 4, -378558), v = o(v, h, p, d, e[r + 8], 11, -2022574463), d = o(d, v, h, p, e[r + 11], 16, 1839030562), p = o(p, d, v, h, e[r + 14], 23, -35309556), h = o(h, p, d, v, e[r + 1], 4, -1530992060), v = o(v, h, p, d, e[r + 4], 11, 1272893353), d = o(d, v, h, p, e[r + 7], 16, -155497632), p = o(p, d, v, h, e[r + 10], 23, -1094730640), h = o(h, p, d, v, e[r + 13], 4, 681279174), v = o(v, h, p, d, e[r], 11, -358537222), d = o(d, v, h, p, e[r + 3], 16, -722521979), p = o(p, d, v, h, e[r + 6], 23, 76029189), h = o(h, p, d, v, e[r + 9], 4, -640364487), v = o(v, h, p, d, e[r + 12], 11, -421815835), d = o(d, v, h, p, e[r + 15], 16, 530742520), p = o(p, d, v, h, e[r + 2], 23, -995338651), h = u(h, p, d, v, e[r], 6, -198630844), v = u(v, h, p, d, e[r + 7], 10, 1126891415), d = u(d, v, h, p, e[r + 14], 15, -1416354905), p = u(p, d, v, h, e[r + 5], 21, -57434055), h = u(h, p, d, v, e[r + 12], 6, 1700485571), v = u(v, h, p, d, e[r + 3], 10, -1894986606), d = u(d, v, h, p, e[r + 10], 15, -1051523), p = u(p, d, v, h, e[r + 1], 21, -2054922799), h = u(h, p, d, v, e[r + 8], 6, 1873313359), v = u(v, h, p, d, e[r + 15], 10, -30611744), d = u(d, v, h, p, e[r + 6], 15, -1560198380), p = u(p, d, v, h, e[r + 13], 21, 1309151649), h = u(h, p, d, v, e[r + 4], 6, -145523070), v = u(v, h, p, d, e[r + 11], 10, -1120210379), d = u(d, v, h, p, e[r + 2], 15, 718787259), p = u(p, d, v, h, e[r + 9], 21, -343485551), h = t(h, a), p = t(p, f), d = t(d, l), v = t(v, c);
      return [h, p, d, v]
    }

    function f(e) {
      var t, n = "";
      for (t = 0; t < 32 * e.length; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
      return n
    }

    function l(e) {
      var t, n = [];
      for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
      for (t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
      return n
    }

    function c(e) {
      return f(a(l(e), 8 * e.length))
    }

    function h(e, t) {
      var n, r, i = l(e),
        s = [],
        o = [];
      for (s[15] = o[15] = void 0, i.length > 16 && (i = a(i, 8 * e.length)), n = 0; 16 > n; n += 1) s[n] = 909522486 ^ i[n], o[n] = 1549556828 ^ i[n];
      return r = a(s.concat(l(t)), 512 + 8 * t.length), f(a(o.concat(r), 640))
    }

    function p(e) {
      var t, n, r = "0123456789abcdef",
        i = "";
      for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
      return i
    }

    function d(e) {
      return unescape(encodeURIComponent(e))
    }

    function v(e) {
      return c(d(e))
    }

    function m(e) {
      return p(v(e))
    }

    function g(e, t) {
      return h(d(e), d(t))
    }

    function y(e, t) {
      return p(g(e, t))
    }

    function b(e, t, n) {
      return t ? n ? g(t, e) : y(t, e) : n ? v(e) : m(e)
    }
    "function" == typeof define && define.amd ? define("md5", [], function() {
      return b
    }) : e.md5 = b
  }(this),
  function(e) {
    function o() {
      try {
        return r in e && e[r]
      } catch (t) {
        return !1
      }
    }
    var t = {},
      n = e.document,
      r = "localStorage",
      i = "script",
      s;
    t.disabled = !1, t.version = "1.3.17", t.set = function(e, t) {}, t.get = function(e, t) {}, t.has = function(e) {
      return t.get(e) !== undefined
    }, t.remove = function(e) {}, t.clear = function() {}, t.transact = function(e, n, r) {
      r == null && (r = n, n = null), n == null && (n = {});
      var i = t.get(e, n);
      r(i), t.set(e, i)
    }, t.getAll = function() {}, t.forEach = function() {}, t.serialize = function(e) {
      return JSON.stringify(e)
    }, t.deserialize = function(e) {
      if (typeof e != "string") return undefined;
      try {
        return JSON.parse(e)
      } catch (t) {
        return e || undefined
      }
    };
    if (o()) s = e[r], t.set = function(e, n) {
      return n === undefined ? t.remove(e) : (s.setItem(e, t.serialize(n)), n)
    }, t.get = function(e, n) {
      var r = t.deserialize(s.getItem(e));
      return r === undefined ? n : r
    }, t.remove = function(e) {
      s.removeItem(e)
    }, t.clear = function() {
      s.clear()
    }, t.getAll = function() {
      var e = {};
      return t.forEach(function(t, n) {
        e[t] = n
      }), e
    }, t.forEach = function(e) {
      for (var n = 0; n < s.length; n++) {
        var r = s.key(n);
        e(r, t.get(r))
      }
    };
    else if (n.documentElement.addBehavior) {
      var u, a;
      try {
        a = new ActiveXObject("htmlfile"), a.open(), a.write("<" + i + ">document.w=window</" + i + '><iframe src="/favicon.ico"></iframe>'), a.close(), u = a.w.frames[0].document, s = u.createElement("div")
      } catch (f) {
        s = n.createElement("div"), u = n.body
      }
      var l = function(e) {
          return function() {
            var n = Array.prototype.slice.call(arguments, 0);
            n.unshift(s), u.appendChild(s), s.addBehavior("#default#userData"), s.load(r);
            var i = e.apply(t, n);
            return u.removeChild(s), i
          }
        },
        c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");

      function h(e) {
        return e.replace(/^d/, "___$&").replace(c, "___")
      }
      t.set = l(function(e, n, i) {
        return n = h(n), i === undefined ? t.remove(n) : (e.setAttribute(n, t.serialize(i)), e.save(r), i)
      }), t.get = l(function(e, n, r) {
        n = h(n);
        var i = t.deserialize(e.getAttribute(n));
        return i === undefined ? r : i
      }), t.remove = l(function(e, t) {
        t = h(t), e.removeAttribute(t), e.save(r)
      }), t.clear = l(function(e) {
        var t = e.XMLDocument.documentElement.attributes;
        e.load(r);
        for (var n = 0, i; i = t[n]; n++) e.removeAttribute(i.name);
        e.save(r)
      }), t.getAll = function(e) {
        var n = {};
        return t.forEach(function(e, t) {
          n[e] = t
        }), n
      }, t.forEach = l(function(e, n) {
        var r = e.XMLDocument.documentElement.attributes;
        for (var i = 0, s; s = r[i]; ++i) n(s.name, t.deserialize(e.getAttribute(s.name)))
      })
    }
    try {
      var p = "__storejs__";
      t.set(p, p), t.get(p) != p && (t.disabled = !0), t.remove(p)
    } catch (f) {
      t.disabled = !0
    }
    t.enabled = !t.disabled, typeof module != "undefined" && module.exports && this.module !== module ? module.exports = t : typeof define == "function" && define.amd ? define("store", t) : e.store = t
  }(Function("return this")()), define("sf.b2c.mall.business.config", [], function() {
    var e = "www.sfht.com",
      t = "sfhaitao.xyz!",
      n = {
        _aid: 1,
        _sm: "md5"
      },
      r = window.location.hostname,
      i = {
        url: "http://dev.sfht.com/m.api",
        fileurl: "http://dev.sfht.com/file.api",
        detailurl: "http://dev-item.sfht.com",
        topicurl: "http://dev-topic.sfht.com",
        mainurl: "http://dev.sfht.com"
      },
      s = {
        404: "http://dev.sfht.com/404.html",
        activated: "http://dev.sfht.com/activated.html",
        agreement: "http://dev.sfht.com/agreement.html",
        center: "http://dev.sfht.com/center.html",
        gotopay: "http://dev.sfht.com/gotopay.html",
        index: "http://dev.sfht.com/index.html",
        login: "http://dev.sfht.com/login.html",
        nullactivated: "http://dev.sfht.com/nullactivated.html",
        order: "http://dev.sfht.com/order.html",
        orderdetail: "http://dev.sfht.com/orderdetail.html",
        orderlist: "http://dev.sfht.com/orderlist.html",
        passwordchange: "http://dev.sfht.com/password-change.html",
        preheat: "http://dev.sfht.com/preheat.html",
        process: "http://dev.sfht.com/process.html",
        register: "http://dev.sfht.com/register.html",
        retrieve: "http://dev.sfht.com/retrieve.html",
        ilogin: "http://dev.sfht.com/i.login.html",
        iregister: "http://dev.sfht.com/i.register.html"
      };
    return {
      setting: {
        none_append_word: t,
        default_header: n,
        md5_key: e,
        api: i,
        link: s
      }
    }
  }), define("sf.b2c.mall.api.security.type", [], function() {
    return {
      UserLogin: {
        name: "UserLogin",
        code: 8192
      },
      RegisteredDevice: {
        name: "RegisteredDevice",
        code: 256
      },
      None: {
        name: "None",
        code: 0
      }
    }
  }), define("sf.b2c.mall.framework.comm", ["jquery", "jquery.cookie", "can", "underscore", "md5", "store", "sf.b2c.mall.business.config", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i, s, o, u) {
    var a = -360,
      f = -300,
      l = -180,
      c = -160,
      h = [a, f, l, c],
      p = n.Construct.extend({
        api: {},
        buildRequestData: function() {
          if (this.api) {
            var e = {};
            r.extend(e, {
              _mt: this.api.METHOD_NAME
            }), r.extend(e, this.api.COMMON);
            var t;
            for (t in this.api.REQUIRED) e[t] = this.data[t];
            for (t in this.api.OPTIONAL) e[t] = this.data[t];
            return e
          }
        },
        init: function(e) {
          this.setData(e)
        },
        setData: function(e) {
          this.data = e
        },
        sendRequest: function(e) {
          var t = this.validate(e);
          if (t !== !0) return t;
          var n = this.buildRequestData();
          return this.request(n, e)
        },
        validate: function(e) {
          if (this.api) {
            if (!this.api.METHOD_NAME) return "缺少_mt";
            for (var t in this.api.REQUIRED)
              if (!r.has(this.data, t)) return new Error("缺少必填字段" + t)
          }
          if (this.api.SECURITY_TYPE === u.UserLogin.name && !this.checkUserLogin()) {
            if (!e) return new Error("该请求需要在登录后发起");
            this.goToLogin()
          }
          return !0
        },
        checkUserLogin: function() {
          var t = s.get("csrfToken");
          return !!e.cookie(p._aid + "_ct") && !!t
        },
        goToLogin: function() {
          var e = window.location.pathname;
          e !== o.setting.login && (window.location.href = o.setting.login + "?from" + e)
        },
        access: function(e, t) {
          if (e.stat.code === 0 && e.content[0] && e.stat.stateList[0].code === 0) return !0;
          if (!r.contains(h, e.stat.code) || !t) return !1;
          this.goToLogin()
        },
        encrypt: function(e, t) {
          var n = [];
          r.each(e, function(e, t) {
            n.push(t + "=" + e)
          }), n.sort();
          var s = n.join("");
          return s += t, i(s)
        },
        sign: function(e, t) {
          var n = {
            None: function(e, t) {
              return r.extend(e, {
                _sig: this.encrypt(e, o.setting.none_append_word)
              })
            },
            RegisteredDevice: function(e, t) {
              return r.extend(e, {
                _sig: this.encrypt(e, o.setting.none_append_word)
              })
            },
            UserLogin: function(e, t) {
              var n = s.get("csrfToken");
              if (n) return r.extend(e, {
                _sig: this.encrypt(e, n)
              });
              this.goToLogin()
            }
          };
          if (r.isFunction(n[this.api.SECURITY_TYPE])) {
            r.each(e, function(t, n, i) {
              (r.isUndefined(t) || r.isNull(t)) && delete e[n]
            });
            var i = r.extend(e, o.setting.default_header);
            i = r.extend(i, {
              _aid: p._aid
            });
            var u = n[this.api.SECURITY_TYPE].call(this, i, t);
            return r.extend(i, u)
          }
          return e
        },
        request: function(e, t) {
          var r = n.Deferred(),
            i = this;
          return n.ajax({
            url: o.setting.api.url,
            type: "post",
            data: i.sign(e)
          }).done(function(n) {
            n && n.stat && (i.serverTime = n.stat.systime), i.access(n, t) ? (i.afterRequest(e._mt, n.content[0]), r.resolve(n.content[0])) : n.stat.stateList.length == 0 ? r.reject(n.stat.code) : r.reject(n.stat.stateList[0].code)
          }).fail(function(e) {
            r.reject(e)
          }), r
        },
        getServerTime: function() {
          return this.serverTime
        },
        afterRequest: function(e, t) {
          var n = {
            "user.webLogin": function(e) {
              s.set("csrfToken", e.csrfToken)
            }
          };
          r.isFunction(n[e]) && n[e].call(this, t)
        },
        ajax: function(e) {
          return n.ajax(e)
        }
      });
    return p.register = function(e) {
      this._aid = e
    }, p
  }), define("sf.b2c.mall.api.b2cmall.getBanner", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getBanner",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.b2cmall.getFastSaleInfoList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getFastSaleInfoList",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {},
        OPTIONAL: {
          pageIndex: "int",
          pageSize: "int"
        },
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.b2cmall.getItemInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getItemInfo",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          itemId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          9000210: "未知的item",
          9000220: "su不可售"
        }
      }
    })
  }), define("sf.b2c.mall.api.b2cmall.getProductHotData", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getProductHotData",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          itemId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          9000210: "未知的item"
        }
      }
    })
  }), define("sf.b2c.mall.api.b2cmall.getProductHotDataList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getProductHotDataList",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          itemIds: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          9000002: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.b2cmall.getSkuInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getSkuInfo",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          skuId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          9000200: "未知的sku"
        }
      }
    })
  }), define("sf.b2c.mall.api.b2cmall.getTimeLimitedSaleInfoList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getTimeLimitedSaleInfoList",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          filter: "string"
        },
        OPTIONAL: {
          size: "int"
        },
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.b2cmall.getItemSummary", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "b2cmall.getItemSummary",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          itemId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          9000210: "未知的item",
          9000220: "su不可售"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.cancelOrder", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.cancelOrder",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          orderId: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error",
          4000800: "订单状态不能取消"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.confirmReceive", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.confirmReceive",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          subOrderId: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error",
          4000900: "子订单状态不符合确认操作"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.getOrder", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.getOrder",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          orderId: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.getOrderList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.getOrderList",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          query: "json"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.getSubOrder", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.getSubOrder",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          subOrderId: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.requestPay", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.requestPay",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          orderId: "string",
          amount: "int"
        },
        OPTIONAL: {
          payType: "string"
        },
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.order.requestPayV2", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.requestPayV2",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          orderId: "string",
          payType: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error",
          4001500: "请求支付系统失败",
          4001700: "满足查询条件的订单不存在",
          4002200: "子订单获取物流线路信息为空"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.submitOrder", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.submitOrder",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          addressId: "json",
          items: "json"
        },
        OPTIONAL: {
          userMsg: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error",
          4000200: "订单地址不存在",
          4000300: "订单地址状态错误",
          4000400: "订单商品信息改变",
          4000500: "订单商品库存不足",
          4000600: "订单商品超过限额",
          4000700: "订单商品金额改变"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.submitOrderForAllSys", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.submitOrderForAllSys",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          addressId: "json",
          items: "json",
          sysType: "string"
        },
        OPTIONAL: {
          userMsg: "string",
          sysInfo: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error",
          4000200: "订单地址不存在",
          4000400: "订单商品信息改变",
          4000500: "订单商品库存不足",
          4000600: "订单商品超过限额",
          4000700: "订单商品金额改变"
        }
      }
    })
  }), define("sf.b2c.mall.api.order.submitOrderV2", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "order.submitOrderV2",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          addressId: "json",
          items: "json"
        },
        OPTIONAL: {
          userMsg: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          4000100: "order unkown error",
          4000200: "订单地址不存在",
          4000400: "订单商品信息改变",
          4000500: "订单商品库存不足",
          4000600: "订单商品超过限额",
          4000700: "订单商品金额改变"
        }
      }
    })
  }), define("sf.b2c.mall.api.product.findRecommendProducts", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "product.findRecommendProducts",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          itemId: "long"
        },
        OPTIONAL: {
          size: "int"
        },
        VERIFY: {},
        ERROR_CODE: {
          5000400: "类目未发现"
        }
      }
    })
  }), define("sf.b2c.mall.api.product.findSaleBaseInfoList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "product.findSaleBaseInfoList",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          sale_base_info_list: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.shopcart.add", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "shopcart.add",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          sku: "string",
          num: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4100100: "购物车添加失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.shopcart.bulkDeleteShopCart", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "shopcart.bulkDeleteShopCart",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          skulist: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4100400: "购物车清空失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.shopcart.clearShopCart", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "shopcart.clearShopCart",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4100400: "购物车清空失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.shopcart.getSkuAll", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "shopcart.getSkuAll",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4100500: "查询购物车spu列表失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.shopcart.getSkuCount", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "shopcart.getSkuCount",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4100500: "查询购物车spu列表失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.shopcart.remove", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "shopcart.remove",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          sku: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4100200: "购物车sku删除失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.shopcart.updateSKUNum", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "shopcart.updateSKUNum",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          sku: "string",
          num: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          4100300: "购物车更新数量失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.appLogin", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.appLogin",
        SECURITY_TYPE: i.RegisteredDevice.name,
        REQUIRED: {
          accountId: "string",
          type: "string",
          password: "string"
        },
        OPTIONAL: {
          vfCode: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000010: "未找到用户",
          1000030: "用户名or密码错误",
          1000070: "参数错误",
          1000100: "验证码错误",
          1000110: "账户尚未激活",
          1000300: "用户名或密码错误已达3次，需要输入验证码"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.changePassword", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.changePassword",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          oldPassword: "string",
          newPassword: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000010: "未找到用户",
          1000040: "原密码错误",
          1000060: "密码与原密码相同"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.checkLink", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.checkLink",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          linkContent: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000020: "账户已注册",
          1000120: "链接已过期",
          1000130: "签名验证失败",
          1000140: "密码修改间隔太短"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.checkSmsCode", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.checkSmsCode",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          mobile: "string",
          smsCode: "string",
          askType: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000230: "手机号错误，请输入正确的手机号",
          1000250: "手机验证码已过期"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.checkUserExist", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.checkUserExist",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          accountId: "string",
          type: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.checkVerifyCode", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.checkVerifyCode",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          vfcode: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.createRecAddress", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.createRecAddress",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          nationName: "string",
          provinceName: "string",
          cityName: "string",
          regionName: "string",
          detail: "string",
          cellphone: "string"
        },
        OPTIONAL: {
          zipCode: "string",
          recName: "string",
          recId: "long",
          partnerId: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误",
          1000310: "已达到最大允许数目"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.createReceiverInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.createReceiverInfo",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          recName: "string",
          type: "string",
          credtNum: "string"
        },
        OPTIONAL: {
          credtImgUrl1: "string",
          credtImgUrl2: "string",
          partnerId: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误",
          1000200: "收货人身份信息已存在，选择即可",
          1000230: "手机号错误，请输入正确的手机号",
          1000280: "身份证号码错误",
          1000310: "已达到最大允许数目"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.delRecAddress", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.delRecAddress",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          addrId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.deviceRegister", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.deviceRegister",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          deviceInfo: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.downSmsCode", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.downSmsCode",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          mobile: "string",
          askType: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000010: "未找到用户",
          1000020: "账户已注册",
          1000070: "参数错误",
          1000230: "手机号错误，请输入正确的手机号",
          1000270: "短信请求太过频繁",
          1000290: "短信请求太多"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.federatedLogin", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.federatedLogin",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          reqParas: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000130: "签名验证失败",
          1000210: "校验第三方accessToken失败",
          1000220: "不支持非门店账户下单or非门店下单"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.getIDCardUrlList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.getIDCardUrlList",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.getInviteCodeList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.getInviteCodeList",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.getRecAddressList", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.getRecAddressList",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.getUserInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.getUserInfo",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.logout", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.logout",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.mailRegister", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.mailRegister",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          mailId: "string",
          passWord: "string",
          linkContent: "string"
        },
        OPTIONAL: {
          nick: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000020: "账户已注册",
          1000050: "邮箱地址错误",
          1000070: "参数错误",
          1000120: "链接已过期",
          1000130: "签名验证失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.mobileRegister", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.mobileRegister",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          mobile: "string",
          smsCode: "string",
          password: "string"
        },
        OPTIONAL: {
          nick: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000020: "账户已注册",
          1000230: "手机号错误，请输入正确的手机号",
          1000240: "手机验证码错误",
          1000250: "手机验证码已过期"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.needVfCode", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.needVfCode",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          accountId: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.renewToken", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.renewToken",
        SECURITY_TYPE: i.RegisteredDevice.name,
        REQUIRED: {
          token: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.resetPassword", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.resetPassword",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          accountId: "string",
          type: "string",
          newPassword: "string"
        },
        OPTIONAL: {
          linkContent: "string",
          smsCode: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000010: "未找到用户",
          1000070: "参数错误",
          1000120: "链接已过期",
          1000130: "签名验证失败",
          1000140: "密码修改间隔太短",
          1000230: "手机号错误，请输入正确的手机号",
          1000240: "手机验证码错误",
          1000250: "手机验证码已过期"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.sendActivateMail", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.sendActivateMail",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          mailId: "string"
        },
        OPTIONAL: {
          vfCode: "string",
          from: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000020: "账户已注册",
          1000050: "邮箱地址错误",
          1000070: "参数错误",
          1000100: "验证码错误",
          1000160: "邮件请求频繁"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.sendResetPwdLink", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.sendResetPwdLink",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          mailId: "string"
        },
        OPTIONAL: {
          vfCode: "string",
          from: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000010: "未找到用户",
          1000050: "邮箱地址错误",
          1000070: "参数错误",
          1000100: "验证码错误",
          1000110: "账户尚未激活",
          1000160: "邮件请求频繁"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.setDefaultAddr", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.setDefaultAddr",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          addrId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.upateUserInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.upateUserInfo",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {
          gender: "string",
          nick: "string",
          headImgUrl: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.updateRecAddress", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.updateRecAddress",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          addrId: "long"
        },
        OPTIONAL: {
          nationName: "string",
          provinceName: "string",
          cityName: "string",
          regionName: "string",
          detail: "string",
          zipCode: "string",
          cellphone: "string",
          recName: "string",
          recId: "long"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.updateReceiverInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.updateReceiverInfo",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          recId: "long"
        },
        OPTIONAL: {
          recName: "string",
          type: "string",
          credtNum: "string",
          credtImgUrl1: "string",
          credtImgUrl2: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误",
          1000200: "收货人身份信息已存在，选择即可",
          1000230: "手机号错误，请输入正确的手机号",
          1000280: "身份证号码错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.webLogin", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.webLogin",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {
          accountId: "string",
          type: "string",
          password: "string"
        },
        OPTIONAL: {
          vfCode: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000010: "未找到用户",
          1000030: "用户名or密码错误",
          1000070: "参数错误",
          1000100: "验证码错误",
          1000110: "账户尚未激活",
          1000300: "用户名或密码错误已达3次，需要输入验证码"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.setDefaultRecv", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.setDefaultRecv",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          recId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.updateUserInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.updateUserInfo",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {},
        OPTIONAL: {
          gender: "string",
          nick: "string",
          headImgUrl: "string"
        },
        VERIFY: {},
        ERROR_CODE: {
          1000070: "参数错误"
        }
      }
    })
  }), define("sf.b2c.mall.api.user.delRecvInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.delRecvInfo",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          recId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.getRecvInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.getRecvInfo",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          recId: "long"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.user.getBirthInfo", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "user.getBirthInfo",
        SECURITY_TYPE: i.None.name,
        REQUIRED: {},
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    })
  }), define("sf.b2c.mall.api.sc.getUserRoutes", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "sc.getUserRoutes",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          bizId: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          2004020: "订单不存在失败"
        }
      }
    })
  }), define("sf.b2c.mall.api.sc.getUserRoutesByOrderId", ["jquery", "can", "underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.api.security.type"], function(e, t, n, r, i) {
    return r.extend({
      api: {
        METHOD_NAME: "sc.getUserRoutesByOrderId",
        SECURITY_TYPE: i.UserLogin.name,
        REQUIRED: {
          orderId: "string",
          subOrderId: "string"
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {
          2004020: "订单不存在失败"
        }
      }
    })
  }), define("sf.b2c.mall.framework.adapter", ["can", "underscore"], function(e, t) {
    return e.Map.extend({
      format: function() {
        throw new Error("使用前必须被复写")
      },
      empty: function() {
        var e = t.bind(function(e, t) {
          this.removeAttr(t)
        }, this);
        this.each(e)
      },
      replace: function(e) {
        this.empty(), this.attr(e)
      }
    })
  }), define("sf.b2c.mall.framework.multiple.comm", ["underscore", "sf.b2c.mall.framework.comm", "sf.b2c.mall.business.config", "sf.b2c.mall.api.security.type"], function(e, t, n, r) {
    var i = -360,
      s = -300,
      o = -180,
      u = -160,
      a = [i, s, o, u];
    return t.extend({
      init: function(e) {
        this.buildApi(e)
      },
      buildApi: function(t) {
        var n = e.pluck(t, "api"),
          i = e.pluck(n, "METHOD_NAME");
        this.api.METHOD_NAME = i.join(",");
        var s = {
          code: -1,
          name: null
        };
        e.each(n, function(e) {
          var t = r[e.SECURITY_TYPE];
          t.code > s.code && (s = t)
        }), this.api.SECURITY_TYPE = s.name, this.api.REQUIRED = e.pluck(n, "REQUIRED"), this.api.OPTIONAL = e.pluck(n, "OPTIONAL")
      },
      buildRequestData: function() {
        if (this.api) {
          var t = {};
          e.extend(t, {
            _mt: this.api.METHOD_NAME
          }), e.extend(t, this.api.COMMON);
          var n = this,
            r;
          return e.each(this.api.REQUIRED, function(e, i) {
            for (r in n.api.REQUIRED[i]) t[i + "_" + r] = n.data[i][r]
          }), e.each(this.api.OPTIONAL, function(e, i) {
            for (r in n.api.OPTIONAL[i]) t[i + "_" + r] = n.data[i][r]
          }), t
        }
      },
      access: function(t, n) {
        if (e.isArray(t.content)) {
          var r = this,
            i = !0;
          return e.each(t.content, function(e, s) {
            i = i && r._access(t, s, n)
          }), i
        }
        return this._access(t, 0, n)
      },
      _access: function(t, n, r) {
        if (t.stat.code === 0 && t.content[n] && t.stat.stateList[n].code === 0) return !0;
        if (!e.contains(a, t.stat.code) || !r) return !1;
        this.goToLogin()
      },
      request: function(e, t) {
        var r = can.Deferred(),
          i = this;
        return can.ajax({
          url: n.setting.api.url,
          type: "post",
          data: i.sign(e),
          crossDomain: !0,
          xhrFields: {
            withCredentials: !0
          }
        }).done(function(n) {
          i.access(n, t) ? (i.afterRequest(e._mt, n.content), r.resolve(n.content)) : n.stat.stateList.length == 0 ? r.reject(n.stat.code) : r.reject(n.stat)
        }).fail(function(e) {
          r.reject(e)
        }), r
      }
    })
  }), define("sf.b2c.mall.framework.view.controller", ["can", "underscore"], function(e, t) {
    return e.Control.extend({
      draw: function(t, n, r) {
        this.element.html(e.view(t, n, r || {}))
      },
      render: function() {
        throw "使用前必须被复写"
      },
      supplement: function() {
        throw "使用前必须被复写"
      }
    })
  }), define("sf.b2c.mall.util.utils", ["jquery", "can", "underscore", "md5", "sf.b2c.mall.business.config"], function(e, t, n, r, i) {
    return {
      md5: function(e) {
        return r(e + i.setting.md5_key)
      }
    }
  });