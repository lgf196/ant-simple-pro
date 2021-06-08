/*!
 * Tiny Advanced Code Editor plugin
 *
 * Copyright 2010-2021 Tiny Technologies, Inc. All rights reserved.
 *
 * Version: 2.3.0-147
 */
!function() {
  "use strict";
  function t(e) {
      return parseInt(e, 10)
  }
  function r(e, t) {
      return 0 == (t = e - t) ? 0 : 0 < t ? 1 : -1
  }
  function n(e, t, n) {
      return {
          major: e,
          minor: t,
          patch: n
      }
  }
  function o(e) {
      return (e = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e)) ? n(t(e[1]), t(e[2]), t(e[3])) : n(0, 0, 0)
  }
  function i(e, t) {
      var n = r(e.major, t.major);
      return 0 !== n || 0 !== (n = r(e.minor, t.minor)) ? n : 0 !== (t = r(e.patch, t.patch)) ? t : 0
  }
  function u(e) {
      return o([(e = e).majorVersion, e.minorVersion].join(".").split(".").slice(0, 3).join("."))
  }
  function c(e, t) {
      return !!e && -1 === i(u(e), o(t))
  }
  function a(e) {
      return function() {
          return e
      }
  }
  var e = function(r, o) {
      return function() {
          for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
          var n = r.console;
          n && o in n && n[o].apply(n, arguments)
      }
  }
    , f = {
      log: e(window, "log"),
      error: e(window, "error"),
      warn: e(window, "warn")
  }
    , l = a(!1)
    , s = a(!0)
    , d = function() {
      return m
  }
    , m = {
      fold: function(e, t) {
          return e()
      },
      is: l,
      isSome: l,
      isNone: s,
      getOr: v,
      getOrThunk: h,
      getOrDie: function(e) {
          throw new Error(e || "error: getOrDie called on none.")
      },
      getOrNull: a(null),
      getOrUndefined: a(void 0),
      or: v,
      orThunk: h,
      map: d,
      each: function() {},
      bind: d,
      exists: l,
      forall: s,
      filter: d,
      equals: p,
      equals_: p,
      toArray: function() {
          return []
      },
      toString: a("none()")
  };
  function p(e) {
      return e.isNone()
  }
  function h(e) {
      return e()
  }
  function v(e) {
      return e
  }
  function g(e) {
      return N(e) ? e : (e = e,
      j.fromDom(e.dom.ownerDocument))
  }
  function y(e) {
      return x.from(e.dom.parentNode).map(j.fromDom)
  }
  function w(e) {
      return D(e) ? e : j.fromDom(g(e).dom.body)
  }
  var b, T, _, C, S, E = function(n) {
      function e() {
          return o
      }
      function t(e) {
          return e(n)
      }
      var r = a(n)
        , o = {
          fold: function(e, t) {
              return t(n)
          },
          is: function(e) {
              return n === e
          },
          isSome: s,
          isNone: l,
          getOr: r,
          getOrThunk: r,
          getOrDie: r,
          getOrNull: r,
          getOrUndefined: r,
          or: e,
          orThunk: e,
          map: function(e) {
              return E(e(n))
          },
          each: function(e) {
              e(n)
          },
          bind: t,
          exists: t,
          forall: t,
          filter: function(e) {
              return e(n) ? o : m
          },
          toArray: function() {
              return [n]
          },
          toString: function() {
              return "some(" + n + ")"
          },
          equals: function(e) {
              return e.is(n)
          },
          equals_: function(e, t) {
              return e.fold(l, function(e) {
                  return t(n, e)
              })
          }
      };
      return o
  }, x = {
      some: E,
      none: d,
      from: function(e) {
          return null == e ? m : E(e)
      }
  }, I = function(e) {
      if (null == e)
          throw new Error("Node cannot be null or undefined");
      return {
          dom: e
      }
  }, j = {
      fromHtml: function(e, t) {
          t = (t || document).createElement("div");
          if (t.innerHTML = e,
          !t.hasChildNodes() || 1 < t.childNodes.length)
              throw console.error("HTML does not have a single root node", e),
              new Error("HTML must have a single root node");
          return I(t.childNodes[0])
      },
      fromTag: function(e, t) {
          e = (t || document).createElement(e);
          return I(e)
      },
      fromText: function(e, t) {
          e = (t || document).createTextNode(e);
          return I(e)
      },
      fromDom: I,
      fromPoint: function(e, t, n) {
          return x.from(e.dom.elementFromPoint(t, n)).map(I)
      }
  }, e = function(t) {
      return function(e) {
          return typeof e === t
      }
  }, O = (b = "string",
  function(e) {
      return e = typeof (t = e),
      (null === t ? "null" : "object" == e && (Array.prototype.isPrototypeOf(t) || t.constructor && "Array" === t.constructor.name) ? "array" : "object" == e && (String.prototype.isPrototypeOf(t) || t.constructor && "String" === t.constructor.name) ? "string" : e) === b;
      var t
  }
  ), P = e("boolean"), k = e("function"), A = e("number"), L = function() {
      return (L = Object.assign || function(e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in t = arguments[n])
                  Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e
      }
      ).apply(this, arguments)
  }, d = ("undefined" != typeof window || Function("return this;")(),
  function(t) {
      return function(e) {
          return e.dom.nodeType === t
      }
  }
  ), M = d(1), N = d(9), D = d(11), R = k(Element.prototype.attachShadow) && k(Node.prototype.getRootNode) ? function(e) {
      return j.fromDom(e.dom.getRootNode())
  }
  : g, e = {}, d = {
      exports: e
  };
  _ = e,
  C = d,
  S = T = void 0,
  function(e) {
      "object" == typeof _ && void 0 !== C ? C.exports = e() : "function" == typeof T && T.amd ? T([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EphoxContactWrapper = e()
  }(function() {
      return function r(o, i, u) {
          function c(t, e) {
              if (!i[t]) {
                  if (!o[t]) {
                      var n = "function" == typeof S && S;
                      if (!e && n)
                          return n(t, !0);
                      if (a)
                          return a(t, !0);
                      throw (n = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND",
                      n
                  }
                  n = i[t] = {
                      exports: {}
                  },
                  o[t][0].call(n.exports, function(e) {
                      return c(o[t][1][e] || e)
                  }, n, n.exports, r, o, i, u)
              }
              return i[t].exports
          }
          for (var a = "function" == typeof S && S, e = 0; e < u.length; e++)
              c(u[e]);
          return c
      }({
          1: [function(e, t, n) {
              var r, o, t = t.exports = {};
              function i() {
                  throw new Error("setTimeout has not been defined")
              }
              function u() {
                  throw new Error("clearTimeout has not been defined")
              }
              function c(t) {
                  if (r === setTimeout)
                      return setTimeout(t, 0);
                  if ((r === i || !r) && setTimeout)
                      return r = setTimeout,
                      setTimeout(t, 0);
                  try {
                      return r(t, 0)
                  } catch (e) {
                      try {
                          return r.call(null, t, 0)
                      } catch (e) {
                          return r.call(this, t, 0)
                      }
                  }
              }
              !function() {
                  try {
                      r = "function" == typeof setTimeout ? setTimeout : i
                  } catch (e) {
                      r = i
                  }
                  try {
                      o = "function" == typeof clearTimeout ? clearTimeout : u
                  } catch (e) {
                      o = u
                  }
              }();
              var a, f = [], l = !1, s = -1;
              function d() {
                  l && a && (l = !1,
                  a.length ? f = a.concat(f) : s = -1,
                  f.length && m())
              }
              function m() {
                  if (!l) {
                      var e = c(d);
                      l = !0;
                      for (var t = f.length; t; ) {
                          for (a = f,
                          f = []; ++s < t; )
                              a && a[s].run();
                          s = -1,
                          t = f.length
                      }
                      a = null,
                      l = !1,
                      function(t) {
                          if (o === clearTimeout)
                              return clearTimeout(t);
                          if ((o === u || !o) && clearTimeout)
                              return o = clearTimeout,
                              clearTimeout(t);
                          try {
                              o(t)
                          } catch (e) {
                              try {
                                  return o.call(null, t)
                              } catch (e) {
                                  return o.call(this, t)
                              }
                          }
                      }(e)
                  }
              }
              function p(e, t) {
                  this.fun = e,
                  this.array = t
              }
              function h() {}
              t.nextTick = function(e) {
                  var t = new Array(arguments.length - 1);
                  if (1 < arguments.length)
                      for (var n = 1; n < arguments.length; n++)
                          t[n - 1] = arguments[n];
                  f.push(new p(e,t)),
                  1 !== f.length || l || c(m)
              }
              ,
              p.prototype.run = function() {
                  this.fun.apply(null, this.array)
              }
              ,
              t.title = "browser",
              t.browser = !0,
              t.env = {},
              t.argv = [],
              t.version = "",
              t.versions = {},
              t.on = h,
              t.addListener = h,
              t.once = h,
              t.off = h,
              t.removeListener = h,
              t.removeAllListeners = h,
              t.emit = h,
              t.prependListener = h,
              t.prependOnceListener = h,
              t.listeners = function(e) {
                  return []
              }
              ,
              t.binding = function(e) {
                  throw new Error("process.binding is not supported")
              }
              ,
              t.cwd = function() {
                  return "/"
              }
              ,
              t.chdir = function(e) {
                  throw new Error("process.chdir is not supported")
              }
              ,
              t.umask = function() {
                  return 0
              }
          }
          , {}],
          2: [function(e, s, t) {
              (function(t) {
                  function r() {}
                  function i(e) {
                      if ("object" != typeof this)
                          throw new TypeError("Promises must be constructed via new");
                      if ("function" != typeof e)
                          throw new TypeError("not a function");
                      this._state = 0,
                      this._handled = !1,
                      this._value = void 0,
                      this._deferreds = [],
                      l(e, this)
                  }
                  function o(n, r) {
                      for (; 3 === n._state; )
                          n = n._value;
                      0 !== n._state ? (n._handled = !0,
                      i._immediateFn(function() {
                          var e, t = 1 === n._state ? r.onFulfilled : r.onRejected;
                          if (null !== t) {
                              try {
                                  e = t(n._value)
                              } catch (e) {
                                  return void c(r.promise, e)
                              }
                              u(r.promise, e)
                          } else
                              (1 === n._state ? u : c)(r.promise, n._value)
                      })) : n._deferreds.push(r)
                  }
                  function u(t, e) {
                      try {
                          if (e === t)
                              throw new TypeError("A promise cannot be resolved with itself.");
                          if (e && ("object" == typeof e || "function" == typeof e)) {
                              var n = e.then;
                              if (e instanceof i)
                                  return t._state = 3,
                                  t._value = e,
                                  void a(t);
                              if ("function" == typeof n)
                                  return void l((r = n,
                                  o = e,
                                  function() {
                                      r.apply(o, arguments)
                                  }
                                  ), t)
                          }
                          t._state = 1,
                          t._value = e,
                          a(t)
                      } catch (e) {
                          c(t, e)
                      }
                      var r, o
                  }
                  function c(e, t) {
                      e._state = 2,
                      e._value = t,
                      a(e)
                  }
                  function a(e) {
                      2 === e._state && 0 === e._deferreds.length && i._immediateFn(function() {
                          e._handled || i._unhandledRejectionFn(e._value)
                      });
                      for (var t = 0, n = e._deferreds.length; t < n; t++)
                          o(e, e._deferreds[t]);
                      e._deferreds = null
                  }
                  function f(e, t, n) {
                      this.onFulfilled = "function" == typeof e ? e : null,
                      this.onRejected = "function" == typeof t ? t : null,
                      this.promise = n
                  }
                  function l(e, t) {
                      var n = !1;
                      try {
                          e(function(e) {
                              n || (n = !0,
                              u(t, e))
                          }, function(e) {
                              n || (n = !0,
                              c(t, e))
                          })
                      } catch (e) {
                          if (n)
                              return;
                          n = !0,
                          c(t, e)
                      }
                  }
                  var e, n;
                  e = this,
                  n = setTimeout,
                  i.prototype.catch = function(e) {
                      return this.then(null, e)
                  }
                  ,
                  i.prototype.then = function(e, t) {
                      var n = new this.constructor(r);
                      return o(this, new f(e,t,n)),
                      n
                  }
                  ,
                  i.all = function(e) {
                      var c = Array.prototype.slice.call(e);
                      return new i(function(o, i) {
                          if (0 === c.length)
                              return o([]);
                          var u = c.length;
                          for (var e = 0; e < c.length; e++)
                              !function t(n, e) {
                                  try {
                                      if (e && ("object" == typeof e || "function" == typeof e)) {
                                          var r = e.then;
                                          if ("function" == typeof r)
                                              return void r.call(e, function(e) {
                                                  t(n, e)
                                              }, i)
                                      }
                                      c[n] = e,
                                      0 == --u && o(c)
                                  } catch (e) {
                                      i(e)
                                  }
                              }(e, c[e])
                      }
                      )
                  }
                  ,
                  i.resolve = function(t) {
                      return t && "object" == typeof t && t.constructor === i ? t : new i(function(e) {
                          e(t)
                      }
                      )
                  }
                  ,
                  i.reject = function(n) {
                      return new i(function(e, t) {
                          t(n)
                      }
                      )
                  }
                  ,
                  i.race = function(o) {
                      return new i(function(e, t) {
                          for (var n = 0, r = o.length; n < r; n++)
                              o[n].then(e, t)
                      }
                      )
                  }
                  ,
                  i._immediateFn = "function" == typeof t ? function(e) {
                      t(e)
                  }
                  : function(e) {
                      n(e, 0)
                  }
                  ,
                  i._unhandledRejectionFn = function(e) {
                      "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                  }
                  ,
                  i._setImmediateFn = function(e) {
                      i._immediateFn = e
                  }
                  ,
                  i._setUnhandledRejectionFn = function(e) {
                      i._unhandledRejectionFn = e
                  }
                  ,
                  void 0 !== s && s.exports ? s.exports = i : e.Promise || (e.Promise = i)
              }
              ).call(this, e("timers").setImmediate)
          }
          , {
              timers: 3
          }],
          3: [function(a, e, f) {
              (function(e, t) {
                  var r = a("process/browser.js").nextTick
                    , n = Function.prototype.apply
                    , o = Array.prototype.slice
                    , i = {}
                    , u = 0;
                  function c(e, t) {
                      this._id = e,
                      this._clearFn = t
                  }
                  f.setTimeout = function() {
                      return new c(n.call(setTimeout, window, arguments),clearTimeout)
                  }
                  ,
                  f.setInterval = function() {
                      return new c(n.call(setInterval, window, arguments),clearInterval)
                  }
                  ,
                  f.clearTimeout = f.clearInterval = function(e) {
                      e.close()
                  }
                  ,
                  c.prototype.unref = c.prototype.ref = function() {}
                  ,
                  c.prototype.close = function() {
                      this._clearFn.call(window, this._id)
                  }
                  ,
                  f.enroll = function(e, t) {
                      clearTimeout(e._idleTimeoutId),
                      e._idleTimeout = t
                  }
                  ,
                  f.unenroll = function(e) {
                      clearTimeout(e._idleTimeoutId),
                      e._idleTimeout = -1
                  }
                  ,
                  f._unrefActive = f.active = function(e) {
                      clearTimeout(e._idleTimeoutId);
                      var t = e._idleTimeout;
                      0 <= t && (e._idleTimeoutId = setTimeout(function() {
                          e._onTimeout && e._onTimeout()
                      }, t))
                  }
                  ,
                  f.setImmediate = "function" == typeof e ? e : function(e) {
                      var t = u++
                        , n = !(arguments.length < 2) && o.call(arguments, 1);
                      return i[t] = !0,
                      r(function() {
                          i[t] && (n ? e.apply(null, n) : e.call(null),
                          f.clearImmediate(t))
                      }),
                      t
                  }
                  ,
                  f.clearImmediate = "function" == typeof t ? t : function(e) {
                      delete i[e]
                  }
              }
              ).call(this, a("timers").setImmediate, a("timers").clearImmediate)
          }
          , {
              "process/browser.js": 1,
              timers: 3
          }],
          4: [function(e, t, n) {
              var r = e("promise-polyfill")
                , e = "undefined" != typeof window ? window : Function("return this;")();
              t.exports = {
                  boltExport: e.Promise || r
              }
          }
          , {
              "promise-polyfill": 2
          }]
      }, {}, [4])(4)
  });
  function F() {
      function c(e, t, n) {
          function r(n) {
              return function() {
                  for (var e = [], t = 0; t < arguments.length; t++)
                      e[t] = arguments[t];
                  o || (o = !0,
                  null !== i && (clearTimeout(i),
                  i = null),
                  n.apply(null, e))
              }
          }
          void 0 === n && (n = 1e3);
          var o = !1
            , i = null
            , e = r(e)
            , u = r(t);
          return {
              reject: u,
              resolve: e,
              start: function() {
                  for (var e = [], t = 0; t < arguments.length; t++)
                      e[t] = arguments[t];
                  o || (i = setTimeout(function() {
                      return u.apply(null, e)
                  }, n))
              }
          }
      }
      var n = {}
        , a = {};
      tinymce.Resource = {
          add: function(e, t) {
              a[e] && (a[e](t),
              delete a[e]),
              n[e] = V.resolve(t)
          },
          load: function(r, o) {
              var i = 'Script at URL "' + o + '" failed to load'
                , u = 'Script at URL "' + o + "\" did not call `tinymce.Resource.add('" + r + "', data)` within 1 second";
              if (void 0 !== n[r])
                  return n[r];
              var e = new V(function(e, t) {
                  var n = c(e, t);
                  a[r] = n.resolve,
                  tinymce.ScriptLoader.loadScripts([o], function() {
                      return n.start(u)
                  }, function() {
                      return n.reject(i)
                  })
              }
              );
              return n[r] = e
          }
      }
  }
  function U(e) {
      return e.getParam("code_dialog_width", 600)
  }
  var V = d.exports.boltExport;
  function B(n, r) {
      function e(e, t) {
          return t && !t() || setTimeout(function() {
              e.state.completionActive || e.showHint({
                  completeSingle: !1,
                  container: r
              })
          }, 100),
          n.Pass
      }
      return {
          completeAfter: e,
          completeIfAfterLt: function(t) {
              return e(t, function() {
                  var e = t.getCursor();
                  return "<" === t.getRange(n.Pos(e.line, e.ch - 1), e)
              })
          },
          completeIfInTag: function(t) {
              return e(t, function() {
                  var e = t.getTokenAt(t.getCursor());
                  return !!("string" !== e.type || /['"]/.test(e.string.charAt(e.string.length - 1)) && 1 !== e.string.length) && n.innerMode(t.getMode(), e.state).state.tagName
              })
          }
      }
  }
  function H(t) {
      return x.from(tinymce.get).bind(function(e) {
          return x.from(e(t))
      })
  }
  function q(e, t, n, r) {
      function o(e) {
          27 !== e.keyCode && e.stopPropagation()
      }
      void 0 === r && (r = "");
      var i = B(e, H(n.editorId).map(function(e) {
          e = R(j.fromDom(e.getElement()));
          return w(e).dom
      }).getOrUndefined())
        , r = {
          lineWrapping: n.lineWrapping,
          lineNumbers: n.lineNumbers,
          foldGutter: n.foldGutter,
          theme: n.theme,
          direction: n.direction,
          matchTags: {
              bothTags: !0
          },
          keyMap: "sublime",
          gutters: n.gutter ? ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] : [],
          extraKeys: {
              "Alt-F": "findPersistent",
              "Ctrl-J": "toMatchingTag",
              "Ctrl-B": "selectNextOccurrence",
              "'<'": i.completeAfter,
              "'/'": i.completeIfAfterLt,
              "' '": i.completeIfInTag,
              "'='": i.completeIfInTag,
              "Ctrl-Q": function(e) {
                  e.foldCode(e.getCursor())
              }
          },
          mode: "text/html",
          value: r
      }
        , u = e(t, r);
      return t.addEventListener("keyup", o),
      t.addEventListener("keydown", o),
      t.addEventListener("keypress", o),
      setTimeout(function() {
          u.focus(),
          n.cursor && u.doc.setCursor(n.cursor)
      }, tinymce.Env.ie ? 50 : 0),
      setTimeout(function() {
          return u.refresh()
      }, 200),
      {
          cmi: u,
          unbind: function() {
              t.removeEventListener("keyup", o),
              t.removeEventListener("keydown", o),
              t.removeEventListener("keypress", o)
          }
      }
  }
  function W(t, n) {
      if (J[n])
          return V.resolve();
      var r, o, e = H(n), i = e.bind(function(e) {
          return x.from(null === (e = e.ui) || void 0 === e ? void 0 : e.styleSheetLoader)
      }).getOr(tinymce.DOM.styleSheetLoader);
      return e.each(function(e) {
          e.on("remove", function() {
              i.unload && i.unload(t),
              delete J[n]
          })
      }),
      J[n] = !0,
      r = t,
      o = i,
      new V(function(e, t) {
          (o || tinymce.DOM.styleSheetLoader).load(r, e, t)
      }
      )
  }
  function G(e, t, n) {
      return V.all([W(t, n), (n = "tinymce.plugins.advcode.CodeMirror",
      e = e,
      tinymce.Resource || F(),
      tinymce.Resource.load(n, e))]).then(function(e) {
          e[0];
          return (0,
          e[1])()
      })
  }
  function K(e, t) {
      e.focus(),
      e.undoManager.transact(function() {
          e.setContent(t)
      }),
      e.selection.setCursorLocation(),
      e.nodeChanged()
  }
  function z(e, t, n) {
      !function(e, t, n) {
          if (!(O(n) || P(n) || A(n)))
              throw console.error("Invalid call to Attribute.set. Key ", t, ":: Value ", n, ":: Element ", e),
              new Error("Attribute value was not simple");
          e.setAttribute(t, n + "")
      }(e.dom, t, n)
  }
  var J = {}
    , Q = function(e, o) {
      e.windowManager.open({
          title: o.title,
          body: o.body,
          buttons: [{
              text: "Ok",
              subtype: "primary",
              onclick: "submit",
              disabled: !0
          }, {
              text: "Cancel",
              onclick: "close"
          }],
          onPostRender: function() {
              var e, t, n = this.getRoot(), r = n.find("form > *")[0];
              t = n.getEl("body"),
              (e = new tinymce.ui.Throbber(t)).show(1e3),
              o.onPostRender(r).then(function() {
                  e.hide(),
                  n.statusbar.items().disabled(!1)
              })
          },
          onSubmit: function(e) {
              o.onSubmit(e.data)
          },
          onClose: function() {
              o.onClose && o.onClose()
          }
      })
  }
    , X = Object.hasOwnProperty;
  function Y(e, t, n) {
      for (var r = e.dom, o = k(n) ? n : l; r.parentNode; ) {
          r = r.parentNode;
          var i = j.fromDom(r);
          if (t(i))
              return x.some(i);
          if (o(i))
              break
      }
      return x.none()
  }
  function Z(e, t, n) {
      var r;
      return r = Y,
      n = n,
      function(e, t) {
          return t(e)
      }(e = e, t = t) ? x.some(e) : k(n) && n(e) ? x.none() : r(e, t, n)
  }
  function $(e) {
      null !== (e = e.dom).parentNode && e.parentNode.removeChild(e)
  }
  function ee(e) {
      return t = e,
      e = "name",
      X.call(t, e);
      var t
  }
  function te(e) {
      var r = e.split(/\r?\n/);
      return function(e, t) {
          for (var n = 0; n < e.length; n++) {
              var r = t(e[n], n);
              if (r.isSome())
                  return r
          }
          return x.none()
      }(r, function(t, n) {
          var e = t.indexOf(me);
          return (-1 !== (e = e) ? x.some(e) : x.none()).map(function(e) {
              return t === me ? 0 === n ? {
                  line: n,
                  ch: 0
              } : {
                  line: n - 1,
                  ch: r[n - 1].length
              } : {
                  line: n,
                  ch: e
              }
          })
      }).getOr({
          line: 0,
          ch: 0
      })
  }
  function ne(e, t) {
      var n, r, o = j.fromHtml(me), e = j.fromDom(e), e = Z(e, function(e) {
          return function(e, t) {
              e = e.dom;
              return !(!e || !e.hasAttribute) && e.hasAttribute(t)
          }(e, "data-mce-bogus")
      }, t).getOr(e);
      return r = o,
      y(n = e).each(function(e) {
          e.dom.insertBefore(r.dom, n.dom)
      }),
      o
  }
  function re(t, e) {
      var n = t.dom
        , r = t.selection
        , o = r.getBookmark()
        , n = ee(o) ? n.select(o.name)[o.index] : n.select("#" + o.id + "_start")[0]
        , n = x.from(n).map(function(e) {
          var n = j.fromDom(t.getBody());
          return ne(e, function(e) {
              return t = n,
              e.dom === t.dom;
              var t
          })
      })
        , e = e();
      return n.each($),
      r.moveToBookmark(o),
      e
  }
  function oe(e) {
      var t = re(e, function() {
          return e.getContent({
              source_view: !0
          })
      })
        , t = te(t);
      return {
          content: e.getContent({
              source_view: !0
          }),
          cursor: t
      }
  }
  function ie(o, i) {
      var e, t, n, u = G(i.codeMirrorScriptUrl, i.codeMirrorCssUrl, i.editorId), c = (e = x.none(),
      t = e,
      n = {
          get: function() {
              return t
          },
          set: function(e) {
              t = e
          }
      },
      {
          clear: function() {
              return n.set(x.none())
          },
          set: function(e) {
              return n.set(x.some(e))
          },
          isSet: function() {
              return n.get().isSome()
          },
          on: function(e) {
              return n.get().each(e)
          }
      });
      Q(o, {
          title: "Source code",
          body: {
              type: "panel",
              border: 1,
              classes: "codemirror",
              minWidth: U(o),
              minHeight: U(o)
          },
          onPostRender: function(e) {
              var t = e.getEl("body")
                , n = oe(o)
                , r = L(L({}, i), {
                  cursor: n.cursor
              });
              return u.then(function(e) {
                  return q(e, t, r, n.content)
              }).then(function(e) {
                  c.set(e)
              })
          },
          onSubmit: function() {
              return c.on(function(e) {
                  K(o, e.cmi.doc.getValue()),
                  e.unbind()
              })
          },
          onClose: function() {
              return c.on(function(e) {
                  return e.unbind()
              })
          }
      })
  }
  function ue(e, t) {
      return function(e, t, n) {
          n = function(e, t) {
              t = function(e, t) {
                  t = e.dom.getAttribute(t);
                  return null === t ? void 0 : t
              }(e, t);
              return void 0 === t || "" === t ? [] : t.split(" ")
          }(e, t).concat([n]);
          return z(e, t, n.join(" ")),
          !0
      }(e, "class", t)
  }
  function ce(e, t, n) {
      if (!O(n))
          throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", n, ":: Element ", e),
          new Error("CSS value must be a string: " + n);
      var r;
      void 0 !== (r = e).style && k(r.style.getPropertyValue) && e.style.setProperty(t, n)
  }
  function ae(r, o) {
      return new V(function(e) {
          var t = j.fromDom(r);
          !function(e, t, n) {
              e = e.dom;
              ce(e, t, n)
          }(t, "width", "100%"),
          y(t).filter(M).each(function(e) {
              return t = "mce-codemirror",
              void (void 0 !== (e = e).dom.classList ? e.dom.classList.add(t) : ue(e, t));
              var t
          }),
          e(G(o.codeMirrorScriptUrl, o.codeMirrorCssUrl, o.editorId).then(function(e) {
              var e = q(e, r, o)
                , t = e.cmi
                , n = e.unbind;
              return {
                  getValue: function() {
                      return t.doc.getValue()
                  },
                  setValue: function(e) {
                      return t.doc.setValue(e)
                  },
                  destroy: function() {
                      return n()
                  }
              }
          }))
      }
      )
  }
  function fe(t) {
      var e = {
          name: "codeview",
          type: "customeditor",
          tag: "div"
      };
      if (n = tinymce,
      r = "5.0.12",
      !n || 1 !== i(u(n), o(r)))
          return L(L({}, e), {
              init: function(e) {
                  return ae(e, t)
              }
          });
      var n, r = t.customEditorScriptUrl;
      return L(L({}, e), {
          scriptId: "tinymce.plugins.advcode.customeditor",
          scriptUrl: r,
          settings: t
      })
  }
  function le(t, e) {
      var n = oe(t)
        , e = L(L({}, e), {
          cursor: n.cursor
      })
        , n = {
          title: "Source Code",
          size: "large",
          body: {
              type: "panel",
              items: [fe(e)]
          },
          buttons: [{
              type: "cancel",
              name: "cancel",
              text: "Cancel"
          }, {
              type: "submit",
              name: "save",
              text: "Save",
              primary: !0
          }],
          initialData: {
              codeview: n.content
          },
          onSubmit: function(e) {
              K(t, e.getData().codeview),
              e.close()
          }
      };
      t.windowManager.open(n)
  }
  function se(r, o, i) {
      return function() {
          var e, t, n, e = {
              customEditorScriptUrl: (t = i) + "/customeditor.min.js",
              codeMirrorScriptUrl: (n = t,
              (e = o).getParam("codemirror_script", n + "/codemirror.min.js", "string")),
              codeMirrorCssUrl: (t = t,
              e.getParam("codemirror_css", t + "/codemirror.min.css", "string")),
              lineWrapping: e.getParam("codemirror_linewrapping", !0, "boolean"),
              lineNumbers: e.getParam("codemirror_linenumbers", !0, "boolean"),
              foldGutter: e.getParam("codemirror_foldgutter", !0, "boolean"),
              theme: e.getParam("codemirror_theme", "default", "string"),
              direction: "rtl" === e.getBody().dir ? "rtl" : "ltr",
              gutter: e.getParam("codemirror_gutter", !0, "boolean"),
              editorId: e.id
          };
          r(o, e)
      }
  }
  function de(e, t) {
      return c(tinymce, "4.3.13") ? (f.error("The advcode plugin requires at least 4.3.13 version of TinyMCE."),
      function() {}
      ) : (c(tinymce, "5.0.0") ? function(e, t) {
          t = se(ie, e, t);
          e.addCommand("mceCodeEditor", t),
          e.addButton("code", {
              icon: "code",
              tooltip: "Source code",
              onclick: t
          }),
          e.addMenuItem("code", {
              icon: "code",
              text: "Source code",
              context: "tools",
              onclick: t
          })
      }(e, t) : (n = "sourcecode",
      t = se(le, e = e, t = t),
      e.addCommand("mceCodeEditor", t),
      e.ui.registry.addButton("code", {
          icon: n,
          tooltip: "Source code",
          onAction: t
      }),
      e.ui.registry.addMenuItem("code", {
          icon: n,
          text: "Source code",
          onAction: t
      })),
      {});
      var n
  }
  var me = "\x3c!--mce_cursor--\x3e";
  tinymce.PluginManager.add("advcode", de)
}();