/*
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function() {
    if (window.CKEDITOR && window.CKEDITOR.dom) return;
    window.CKEDITOR || (window.CKEDITOR = function() {
      var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
        d = {
          timestamp: "FB9E",
          version: "4.5.6",
          revision: "91e81fe",
          rnd: Math.floor(900 * Math.random()) + 100,
          _: {
            pending: [],
            basePathSrcPattern: a
          },
          status: "unloaded",
          basePath: function() {
            var b = window.CKEDITOR_BASEPATH || "";
            if (!b)
              for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) {
                var l = c[d].src.match(a);
                if (l) {
                  b = l[1];
                  break
                }
              } - 1 == b.indexOf(":/") && "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] +
                b : location.href.match(/^[^\?]*\/(?:)/)[0] + b);
            if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
            return b
          }(),
          getUrl: function(a) {
            -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
            this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
            return a
          },
          domReady: function() {
            function a() {
              try {
                document.addEventListener ? (document.removeEventListener("DOMContentLoaded",
                  a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
              } catch (c) {}
            }

            function b() {
              for (var a; a = c.shift();) a()
            }
            var c = [];
            return function(b) {
              function d() {
                try {
                  document.documentElement.doScroll("left")
                } catch (f) {
                  setTimeout(d, 1);
                  return
                }
                a()
              }
              c.push(b);
              "complete" === document.readyState && setTimeout(a, 1);
              if (1 == c.length)
                if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                else if (document.attachEvent) {
                document.attachEvent("onreadystatechange",
                  a);
                window.attachEvent("onload", a);
                b = !1;
                try {
                  b = !window.frameElement
                } catch (t) {}
                document.documentElement.doScroll && b && d()
              }
            }
          }()
        },
        b = window.CKEDITOR_GETURL;
      if (b) {
        var c = d.getUrl;
        d.getUrl = function(a) {
          return b.call(d, a) || c.call(d, a)
        }
      }
      return d
    }());
    CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(a) {
      var d = CKEDITOR.event.prototype,
        b;
      for (b in d) null == a[b] && (a[b] = d[b])
    }, CKEDITOR.event.prototype = function() {
      function a(a) {
        var e = d(this);
        return e[a] || (e[a] = new b(a))
      }
      var d = function(a) {
          a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
          return a.events || (a.events = {})
        },
        b = function(a) {
          this.name = a;
          this.listeners = []
        };
      b.prototype = {
        getListenerIndex: function(a) {
          for (var b = 0, d = this.listeners; b < d.length; b++)
            if (d[b].fn == a) return b;
          return -1
        }
      };
      return {
        define: function(b, d) {
          var g = a.call(this, b);
          CKEDITOR.tools.extend(g, d, !0)
        },
        on: function(b, d, g, h, l) {
          function q(a, f, z, l) {
            a = {
              name: b,
              sender: this,
              editor: a,
              data: f,
              listenerData: h,
              stop: z,
              cancel: l,
              removeListener: t
            };
            return !1 === d.call(g, a) ? !1 : a.data
          }

          function t() {
            z.removeListener(b, d)
          }
          var f = a.call(this, b);
          if (0 > f.getListenerIndex(d)) {
            f = f.listeners;
            g || (g = this);
            isNaN(l) && (l = 10);
            var z = this;
            q.fn = d;
            q.priority = l;
            for (var A = f.length - 1; 0 <= A; A--)
              if (f[A].priority <= l) return f.splice(A + 1, 0, q), {
                removeListener: t
              };
            f.unshift(q)
          }
          return {
            removeListener: t
          }
        },
        once: function() {
          var a = Array.prototype.slice.call(arguments),
            b = a[1];
          a[1] = function(a) {
            a.removeListener();
            return b.apply(this, arguments)
          };
          return this.on.apply(this, a)
        },
        capture: function() {
          CKEDITOR.event.useCapture = 1;
          var a = this.on.apply(this, arguments);
          CKEDITOR.event.useCapture = 0;
          return a
        },
        fire: function() {
          var a = 0,
            b = function() {
              a = 1
            },
            g = 0,
            h = function() {
              g = 1
            };
          return function(l, q, t) {
            var f = d(this)[l];
            l = a;
            var z = g;
            a = g = 0;
            if (f) {
              var A = f.listeners;
              if (A.length)
                for (var A = A.slice(0), u, C = 0; C < A.length; C++) {
                  if (f.errorProof) try {
                    u =
                      A[C].call(this, t, q, b, h)
                  } catch (m) {} else u = A[C].call(this, t, q, b, h);
                  !1 === u ? g = 1 : "undefined" != typeof u && (q = u);
                  if (a || g) break
                }
            }
            q = g ? !1 : "undefined" == typeof q ? !0 : q;
            a = l;
            g = z;
            return q
          }
        }(),
        fireOnce: function(a, b, g) {
          b = this.fire(a, b, g);
          delete d(this)[a];
          return b
        },
        removeListener: function(a, b) {
          var g = d(this)[a];
          if (g) {
            var h = g.getListenerIndex(b);
            0 <= h && g.listeners.splice(h, 1)
          }
        },
        removeAllListeners: function() {
          var a = d(this),
            b;
          for (b in a) delete a[b]
        },
        hasListeners: function(a) {
          return (a = d(this)[a]) && 0 < a.listeners.length
        }
      }
    }());
    CKEDITOR.editor || (CKEDITOR.editor = function() {
      CKEDITOR._.pending.push([this, arguments]);
      CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire = function(a, d) {
      a in {
        instanceReady: 1,
        loaded: 1
      } && (this[a] = !0);
      return CKEDITOR.event.prototype.fire.call(this, a, d, this)
    }, CKEDITOR.editor.prototype.fireOnce = function(a, d) {
      a in {
        instanceReady: 1,
        loaded: 1
      } && (this[a] = !0);
      return CKEDITOR.event.prototype.fireOnce.call(this, a, d, this)
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
    CKEDITOR.env || (CKEDITOR.env = function() {
      var a = navigator.userAgent.toLowerCase(),
        d = a.match(/edge[ \/](\d+.?\d*)/),
        b = -1 < a.indexOf("trident/"),
        b = !(!d && !b),
        b = {
          ie: b,
          edge: !!d,
          webkit: !b && -1 < a.indexOf(" applewebkit/"),
          air: -1 < a.indexOf(" adobeair/"),
          mac: -1 < a.indexOf("macintosh"),
          quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
          mobile: -1 < a.indexOf("mobile"),
          iOS: /(ipad|iphone|ipod)/.test(a),
          isCustomDomain: function() {
            if (!this.ie) return !1;
            var a = document.domain,
              b = window.location.hostname;
            return a != b && a != "[" + b + "]"
          },
          secure: "https:" == location.protocol
        };
      b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie;
      b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0);
      var c = 0;
      b.ie && (c = d ? parseFloat(d[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks);
      b.gecko && (d = a.match(/rv:([\d\.]+)/)) && (d = d[1].split("."), c = 1E4 * d[0] + 100 * (d[1] || 0) + 1 * (d[2] || 0));
      b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
      b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
      b.version = c;
      b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit && 534 > c);
      b.hidpi = 2 <= window.devicePixelRatio;
      b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c;
      b.needsNbspFiller = b.ie && 11 > c;
      b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
      b.quirks && (b.cssClass += " cke_browser_quirks");
      b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
      b.air && (b.cssClass += " cke_browser_air");
      b.iOS && (b.cssClass += " cke_browser_ios");
      b.hidpi && (b.cssClass += " cke_hidpi");
      return b
    }());
    "unloaded" == CKEDITOR.status && function() {
      CKEDITOR.event.implementOn(CKEDITOR);
      CKEDITOR.loadFullCore = function() {
        if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1;
        else {
          delete CKEDITOR.loadFullCore;
          var a = document.createElement("script");
          a.type = "text/javascript";
          a.src = CKEDITOR.basePath + "ckeditor.js";
          document.getElementsByTagName("head")[0].appendChild(a)
        }
      };
      CKEDITOR.loadFullCoreTimeout = 0;
      CKEDITOR.add = function(a) {
        (this._.pending || (this._.pending = [])).push(a)
      };
      (function() {
        CKEDITOR.domReady(function() {
          var a =
            CKEDITOR.loadFullCore,
            d = CKEDITOR.loadFullCoreTimeout;
          a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : d && setTimeout(function() {
            CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
          }, 1E3 * d))
        })
      })();
      CKEDITOR.status = "basic_loaded"
    }();
    "use strict";
    CKEDITOR.VERBOSITY_WARN = 1;
    CKEDITOR.VERBOSITY_ERROR = 2;
    CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR;
    CKEDITOR.warn = function(a, d) {
      CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", {
        type: "warn",
        errorCode: a,
        additionalData: d
      })
    };
    CKEDITOR.error = function(a, d) {
      CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", {
        type: "error",
        errorCode: a,
        additionalData: d
      })
    };
    CKEDITOR.on("log", function(a) {
      if (window.console && window.console.log) {
        var d = console[a.data.type] ? a.data.type : "log",
          b = a.data.errorCode;
        if (a = a.data.additionalData) console[d]("[CKEDITOR] Error code: " + b + ".", a);
        else console[d]("[CKEDITOR] Error code: " + b + ".");
        console[d]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-" + b)
      }
    }, null, null, 999);
    CKEDITOR.dom = {};
    (function() {
      var a = [],
        d = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
        b = /&/g,
        c = />/g,
        e = /</g,
        g = /"/g,
        h = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
        l = {
          lt: "\x3c",
          gt: "\x3e",
          amp: "\x26",
          quot: '"',
          nbsp: " ",
          shy: "­"
        },
        q = function(a, f) {
          return "#" == f[0] ? String.fromCharCode(parseInt(f.slice(1), 10)) : l[f]
        };
      CKEDITOR.on("reset", function() {
        a = []
      });
      CKEDITOR.tools = {
        arrayCompare: function(a, f) {
          if (!a && !f) return !0;
          if (!a || !f || a.length != f.length) return !1;
          for (var b = 0; b < a.length; b++)
            if (a[b] != f[b]) return !1;
          return !0
        },
        getIndex: function(a, f) {
          for (var b = 0; b < a.length; ++b)
            if (f(a[b])) return b;
          return -1
        },
        clone: function(a) {
          var f;
          if (a && a instanceof Array) {
            f = [];
            for (var b = 0; b < a.length; b++) f[b] = CKEDITOR.tools.clone(a[b]);
            return f
          }
          if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a;
          f = new a.constructor;
          for (b in a) f[b] = CKEDITOR.tools.clone(a[b]);
          return f
        },
        capitalize: function(a, f) {
          return a.charAt(0).toUpperCase() +
            (f ? a.slice(1) : a.slice(1).toLowerCase())
        },
        extend: function(a) {
          var f = arguments.length,
            b, c;
          "boolean" == typeof(b = arguments[f - 1]) ? f-- : "boolean" == typeof(b = arguments[f - 2]) && (c = arguments[f - 1], f -= 2);
          for (var l = 1; l < f; l++) {
            var d = arguments[l],
              m;
            for (m in d)
              if (!0 === b || null == a[m])
                if (!c || m in c) a[m] = d[m]
          }
          return a
        },
        prototypedCopy: function(a) {
          var f = function() {};
          f.prototype = a;
          return new f
        },
        copy: function(a) {
          var f = {},
            b;
          for (b in a) f[b] = a[b];
          return f
        },
        isArray: function(a) {
          return "[object Array]" == Object.prototype.toString.call(a)
        },
        isEmpty: function(a) {
          for (var f in a)
            if (a.hasOwnProperty(f)) return !1;
          return !0
        },
        cssVendorPrefix: function(a, f, b) {
          if (b) return d + a + ":" + f + ";" + a + ":" + f;
          b = {};
          b[a] = f;
          b[d + a] = f;
          return b
        },
        cssStyleToDomStyle: function() {
          var a = document.createElement("div").style,
            f = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
          return function(a) {
            return "float" == a ? f : a.replace(/-./g, function(a) {
              return a.substr(1).toUpperCase()
            })
          }
        }(),
        buildStyleHtml: function(a) {
          a = [].concat(a);
          for (var f,
              b = [], c = 0; c < a.length; c++)
            if (f = a[c]) /@import|[{}]/.test(f) ? b.push("\x3cstyle\x3e" + f + "\x3c/style\x3e") : b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + f + '"\x3e');
          return b.join("")
        },
        htmlEncode: function(a) {
          return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(e, "\x26lt;")
        },
        htmlDecode: function(a) {
          return a.replace(h, q)
        },
        htmlEncodeAttr: function(a) {
          return CKEDITOR.tools.htmlEncode(a).replace(g, "\x26quot;")
        },
        htmlDecodeAttr: function(a) {
          return CKEDITOR.tools.htmlDecode(a)
        },
        transformPlainTextToHtml: function(a, f) {
          var b = f == CKEDITOR.ENTER_BR,
            c = this.htmlEncode(a.replace(/\r\n/g, "\n")),
            c = c.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"),
            l = f == CKEDITOR.ENTER_P ? "p" : "div";
          if (!b) {
            var d = /\n{2}/g;
            if (d.test(c)) var m = "\x3c" + l + "\x3e",
              q = "\x3c/" + l + "\x3e",
              c = m + c.replace(d, function() {
                return q + m
              }) + q
          }
          c = c.replace(/\n/g, "\x3cbr\x3e");
          b || (c = c.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + l + "\x3e)"), function(a) {
            return CKEDITOR.tools.repeat(a, 2)
          }));
          c = c.replace(/^ | $/g, "\x26nbsp;");
          return c = c.replace(/(>|\s) /g,
            function(a, f) {
              return f + "\x26nbsp;"
            }).replace(/ (?=<)/g, "\x26nbsp;")
        },
        getNextNumber: function() {
          var a = 0;
          return function() {
            return ++a
          }
        }(),
        getNextId: function() {
          return "cke_" + this.getNextNumber()
        },
        getUniqueId: function() {
          for (var a = "e", f = 0; 8 > f; f++) a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
          return a
        },
        override: function(a, f) {
          var b = f(a);
          b.prototype = a.prototype;
          return b
        },
        setTimeout: function(a, f, b, c, l) {
          l || (l = window);
          b || (b = l);
          return l.setTimeout(function() {
              c ? a.apply(b, [].concat(c)) : a.apply(b)
            },
            f || 0)
        },
        trim: function() {
          var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
          return function(f) {
            return f.replace(a, "")
          }
        }(),
        ltrim: function() {
          var a = /^[ \t\n\r]+/g;
          return function(f) {
            return f.replace(a, "")
          }
        }(),
        rtrim: function() {
          var a = /[ \t\n\r]+$/g;
          return function(f) {
            return f.replace(a, "")
          }
        }(),
        indexOf: function(a, f) {
          if ("function" == typeof f)
            for (var b = 0, c = a.length; b < c; b++) {
              if (f(a[b])) return b
            } else {
              if (a.indexOf) return a.indexOf(f);
              b = 0;
              for (c = a.length; b < c; b++)
                if (a[b] === f) return b
            }
          return -1
        },
        search: function(a, b) {
          var c = CKEDITOR.tools.indexOf(a,
            b);
          return 0 <= c ? a[c] : null
        },
        bind: function(a, b) {
          return function() {
            return a.apply(b, arguments)
          }
        },
        createClass: function(a) {
          var b = a.$,
            c = a.base,
            l = a.privates || a._,
            d = a.proto;
          a = a.statics;
          !b && (b = function() {
            c && this.base.apply(this, arguments)
          });
          if (l) var q = b,
            b = function() {
              var a = this._ || (this._ = {}),
                b;
              for (b in l) {
                var f = l[b];
                a[b] = "function" == typeof f ? CKEDITOR.tools.bind(f, this) : f
              }
              q.apply(this, arguments)
            };
          c && (b.prototype = this.prototypedCopy(c.prototype), b.prototype.constructor = b, b.base = c, b.baseProto = c.prototype, b.prototype.base =
            function() {
              this.base = c.prototype.base;
              c.apply(this, arguments);
              this.base = arguments.callee
            });
          d && this.extend(b.prototype, d, !0);
          a && this.extend(b, a, !0);
          return b
        },
        addFunction: function(b, f) {
          return a.push(function() {
            return b.apply(f || this, arguments)
          }) - 1
        },
        removeFunction: function(b) {
          a[b] = null
        },
        callFunction: function(b) {
          var f = a[b];
          return f && f.apply(window, Array.prototype.slice.call(arguments, 1))
        },
        cssLength: function() {
          var a = /^-?\d+\.?\d*px$/,
            b;
          return function(c) {
            b = CKEDITOR.tools.trim(c + "") + "px";
            return a.test(b) ?
              b : c || ""
          }
        }(),
        convertToPx: function() {
          var a;
          return function(b) {
            a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a));
            return /%$/.test(b) ? b : (a.setStyle("width", b), a.$.clientWidth)
          }
        }(),
        repeat: function(a, b) {
          return Array(b + 1).join(a)
        },
        tryThese: function() {
          for (var a, b = 0, c = arguments.length; b < c; b++) {
            var l = arguments[b];
            try {
              a = l();
              break
            } catch (d) {}
          }
          return a
        },
        genKey: function() {
          return Array.prototype.slice.call(arguments).join("-")
        },
        defer: function(a) {
          return function() {
            var b = arguments,
              c = this;
            window.setTimeout(function() {
              a.apply(c, b)
            }, 0)
          }
        },
        normalizeCssText: function(a, b) {
          var c = [],
            l, d = CKEDITOR.tools.parseCssText(a, !0, b);
          for (l in d) c.push(l + ":" + d[l]);
          c.sort();
          return c.length ? c.join(";") + ";" : ""
        },
        convertRgbToHex: function(a) {
          return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, c, l) {
            a = [b, c, l];
            for (b = 0; 3 > b; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
            return "#" + a.join("")
          })
        },
        parseCssText: function(a, b, c) {
          var l = {};
          c && (c = new CKEDITOR.dom.element("span"), c.setAttribute("style", a), a = CKEDITOR.tools.convertRgbToHex(c.getAttribute("style") || ""));
          if (!a || ";" == a) return l;
          a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, d) {
            b && (c = c.toLowerCase(), "font-family" == c && (d = d.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ",")), d = CKEDITOR.tools.trim(d));
            l[c] = d
          });
          return l
        },
        writeCssText: function(a, b) {
          var c, l = [];
          for (c in a) l.push(c +
            ":" + a[c]);
          b && l.sort();
          return l.join("; ")
        },
        objectCompare: function(a, b, c) {
          var l;
          if (!a && !b) return !0;
          if (!a || !b) return !1;
          for (l in a)
            if (a[l] != b[l]) return !1;
          if (!c)
            for (l in b)
              if (a[l] != b[l]) return !1;
          return !0
        },
        objectKeys: function(a) {
          var b = [],
            c;
          for (c in a) b.push(c);
          return b
        },
        convertArrayToObject: function(a, b) {
          var c = {};
          1 == arguments.length && (b = !0);
          for (var l = 0, d = a.length; l < d; ++l) c[a[l]] = b;
          return c
        },
        fixDomain: function() {
          for (var a;;) try {
            a = window.parent.document.domain;
            break
          } catch (b) {
            a = a ? a.replace(/.+?(?:\.|$)/,
              "") : document.domain;
            if (!a) break;
            document.domain = a
          }
          return !!a
        },
        eventsBuffer: function(a, b, c) {
          function l() {
            q = (new Date).getTime();
            d = !1;
            c ? b.call(c) : b()
          }
          var d, q = 0;
          return {
            input: function() {
              if (!d) {
                var b = (new Date).getTime() - q;
                b < a ? d = setTimeout(l, a - b) : l()
              }
            },
            reset: function() {
              d && clearTimeout(d);
              d = q = 0
            }
          }
        },
        enableHtml5Elements: function(a, b) {
          for (var c = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),
              l = c.length, d; l--;) d = a.createElement(c[l]), b && a.appendChild(d)
        },
        checkIfAnyArrayItemMatches: function(a, b) {
          for (var c = 0, l = a.length; c < l; ++c)
            if (a[c].match(b)) return !0;
          return !1
        },
        checkIfAnyObjectPropertyMatches: function(a, b) {
          for (var c in a)
            if (c.match(b)) return !0;
          return !1
        },
        transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
        getCookie: function(a) {
          a = a.toLowerCase();
          for (var b = document.cookie.split(";"), c, l, d = 0; d < b.length; d++)
            if (c = b[d].split("\x3d"),
              l = decodeURIComponent(CKEDITOR.tools.trim(c[0]).toLowerCase()), l === a) return decodeURIComponent(1 < c.length ? c[1] : "");
          return null
        },
        setCookie: function(a, b) {
          document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(b) + ";path\x3d/"
        },
        getCsrfToken: function() {
          var a = CKEDITOR.tools.getCookie("ckCsrfToken");
          if (!a || 40 != a.length) {
            var a = [],
              b = "";
            if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a);
            else
              for (var c = 0; 40 > c; c++) a.push(Math.floor(256 * Math.random()));
            for (c = 0; c < a.length; c++) var l = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[c] % 36),
              b = b + (.5 < Math.random() ? l.toUpperCase() : l);
            a = b;
            CKEDITOR.tools.setCookie("ckCsrfToken", a)
          }
          return a
        }
      }
    })();
    CKEDITOR.dtd = function() {
      var a = CKEDITOR.tools.extend,
        d = function(a, b) {
          for (var c = CKEDITOR.tools.clone(a), l = 1; l < arguments.length; l++) {
            b = arguments[l];
            for (var d in b) delete c[d]
          }
          return c
        },
        b = {},
        c = {},
        e = {
          address: 1,
          article: 1,
          aside: 1,
          blockquote: 1,
          details: 1,
          div: 1,
          dl: 1,
          fieldset: 1,
          figure: 1,
          footer: 1,
          form: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1,
          header: 1,
          hgroup: 1,
          hr: 1,
          main: 1,
          menu: 1,
          nav: 1,
          ol: 1,
          p: 1,
          pre: 1,
          section: 1,
          table: 1,
          ul: 1
        },
        g = {
          command: 1,
          link: 1,
          meta: 1,
          noscript: 1,
          script: 1,
          style: 1
        },
        h = {},
        l = {
          "#": 1
        },
        q = {
          center: 1,
          dir: 1,
          noframes: 1
        };
      a(b, {
        a: 1,
        abbr: 1,
        area: 1,
        audio: 1,
        b: 1,
        bdi: 1,
        bdo: 1,
        br: 1,
        button: 1,
        canvas: 1,
        cite: 1,
        code: 1,
        command: 1,
        datalist: 1,
        del: 1,
        dfn: 1,
        em: 1,
        embed: 1,
        i: 1,
        iframe: 1,
        img: 1,
        input: 1,
        ins: 1,
        kbd: 1,
        keygen: 1,
        label: 1,
        map: 1,
        mark: 1,
        meter: 1,
        noscript: 1,
        object: 1,
        output: 1,
        progress: 1,
        q: 1,
        ruby: 1,
        s: 1,
        samp: 1,
        script: 1,
        select: 1,
        small: 1,
        span: 1,
        strong: 1,
        sub: 1,
        sup: 1,
        textarea: 1,
        time: 1,
        u: 1,
        "var": 1,
        video: 1,
        wbr: 1
      }, l, {
        acronym: 1,
        applet: 1,
        basefont: 1,
        big: 1,
        font: 1,
        isindex: 1,
        strike: 1,
        style: 1,
        tt: 1
      });
      a(c, e, b, q);
      d = {
        a: d(b, {
          a: 1,
          button: 1
        }),
        abbr: b,
        address: c,
        area: h,
        article: c,
        aside: c,
        audio: a({
          source: 1,
          track: 1
        }, c),
        b: b,
        base: h,
        bdi: b,
        bdo: b,
        blockquote: c,
        body: c,
        br: h,
        button: d(b, {
          a: 1,
          button: 1
        }),
        canvas: b,
        caption: c,
        cite: b,
        code: b,
        col: h,
        colgroup: {
          col: 1
        },
        command: h,
        datalist: a({
          option: 1
        }, b),
        dd: c,
        del: b,
        details: a({
          summary: 1
        }, c),
        dfn: b,
        div: c,
        dl: {
          dt: 1,
          dd: 1
        },
        dt: c,
        em: b,
        embed: h,
        fieldset: a({
          legend: 1
        }, c),
        figcaption: c,
        figure: a({
          figcaption: 1
        }, c),
        footer: c,
        form: c,
        h1: b,
        h2: b,
        h3: b,
        h4: b,
        h5: b,
        h6: b,
        head: a({
          title: 1,
          base: 1
        }, g),
        header: c,
        hgroup: {
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1
        },
        hr: h,
        html: a({
          head: 1,
          body: 1
        }, c, g),
        i: b,
        iframe: l,
        img: h,
        input: h,
        ins: b,
        kbd: b,
        keygen: h,
        label: b,
        legend: b,
        li: c,
        link: h,
        main: c,
        map: c,
        mark: b,
        menu: a({
          li: 1
        }, c),
        meta: h,
        meter: d(b, {
          meter: 1
        }),
        nav: c,
        noscript: a({
          link: 1,
          meta: 1,
          style: 1
        }, b),
        object: a({
          param: 1
        }, b),
        ol: {
          li: 1
        },
        optgroup: {
          option: 1
        },
        option: l,
        output: b,
        p: b,
        param: h,
        pre: b,
        progress: d(b, {
          progress: 1
        }),
        q: b,
        rp: b,
        rt: b,
        ruby: a({
          rp: 1,
          rt: 1
        }, b),
        s: b,
        samp: b,
        script: l,
        section: c,
        select: {
          optgroup: 1,
          option: 1
        },
        small: b,
        source: h,
        span: b,
        strong: b,
        style: l,
        sub: b,
        summary: a({
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1
        }, b),
        sup: b,
        table: {
          caption: 1,
          colgroup: 1,
          thead: 1,
          tfoot: 1,
          tbody: 1,
          tr: 1
        },
        tbody: {
          tr: 1
        },
        td: c,
        textarea: l,
        tfoot: {
          tr: 1
        },
        th: c,
        thead: {
          tr: 1
        },
        time: d(b, {
          time: 1
        }),
        title: l,
        tr: {
          th: 1,
          td: 1
        },
        track: h,
        u: b,
        ul: {
          li: 1
        },
        "var": b,
        video: a({
          source: 1,
          track: 1
        }, c),
        wbr: h,
        acronym: b,
        applet: a({
          param: 1
        }, c),
        basefont: h,
        big: b,
        center: c,
        dialog: h,
        dir: {
          li: 1
        },
        font: b,
        isindex: h,
        noframes: c,
        strike: b,
        tt: b
      };
      a(d, {
        $block: a({
          audio: 1,
          dd: 1,
          dt: 1,
          figcaption: 1,
          li: 1,
          video: 1
        }, e, q),
        $blockLimit: {
          article: 1,
          aside: 1,
          audio: 1,
          body: 1,
          caption: 1,
          details: 1,
          dir: 1,
          div: 1,
          dl: 1,
          fieldset: 1,
          figcaption: 1,
          figure: 1,
          footer: 1,
          form: 1,
          header: 1,
          hgroup: 1,
          main: 1,
          menu: 1,
          nav: 1,
          ol: 1,
          section: 1,
          table: 1,
          td: 1,
          th: 1,
          tr: 1,
          ul: 1,
          video: 1
        },
        $cdata: {
          script: 1,
          style: 1
        },
        $editable: {
          address: 1,
          article: 1,
          aside: 1,
          blockquote: 1,
          body: 1,
          details: 1,
          div: 1,
          fieldset: 1,
          figcaption: 1,
          footer: 1,
          form: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1,
          header: 1,
          hgroup: 1,
          main: 1,
          nav: 1,
          p: 1,
          pre: 1,
          section: 1
        },
        $empty: {
          area: 1,
          base: 1,
          basefont: 1,
          br: 1,
          col: 1,
          command: 1,
          dialog: 1,
          embed: 1,
          hr: 1,
          img: 1,
          input: 1,
          isindex: 1,
          keygen: 1,
          link: 1,
          meta: 1,
          param: 1,
          source: 1,
          track: 1,
          wbr: 1
        },
        $inline: b,
        $list: {
          dl: 1,
          ol: 1,
          ul: 1
        },
        $listItem: {
          dd: 1,
          dt: 1,
          li: 1
        },
        $nonBodyContent: a({
          body: 1,
          head: 1,
          html: 1
        }, d.head),
        $nonEditable: {
          applet: 1,
          audio: 1,
          button: 1,
          embed: 1,
          iframe: 1,
          map: 1,
          object: 1,
          option: 1,
          param: 1,
          script: 1,
          textarea: 1,
          video: 1
        },
        $object: {
          applet: 1,
          audio: 1,
          button: 1,
          hr: 1,
          iframe: 1,
          img: 1,
          input: 1,
          object: 1,
          select: 1,
          table: 1,
          textarea: 1,
          video: 1
        },
        $removeEmpty: {
          abbr: 1,
          acronym: 1,
          b: 1,
          bdi: 1,
          bdo: 1,
          big: 1,
          cite: 1,
          code: 1,
          del: 1,
          dfn: 1,
          em: 1,
          font: 1,
          i: 1,
          ins: 1,
          label: 1,
          kbd: 1,
          mark: 1,
          meter: 1,
          output: 1,
          q: 1,
          ruby: 1,
          s: 1,
          samp: 1,
          small: 1,
          span: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          time: 1,
          tt: 1,
          u: 1,
          "var": 1
        },
        $tabIndex: {
          a: 1,
          area: 1,
          button: 1,
          input: 1,
          object: 1,
          select: 1,
          textarea: 1
        },
        $tableContent: {
          caption: 1,
          col: 1,
          colgroup: 1,
          tbody: 1,
          td: 1,
          tfoot: 1,
          th: 1,
          thead: 1,
          tr: 1
        },
        $transparent: {
          a: 1,
          audio: 1,
          canvas: 1,
          del: 1,
          ins: 1,
          map: 1,
          noscript: 1,
          object: 1,
          video: 1
        },
        $intermediate: {
          caption: 1,
          colgroup: 1,
          dd: 1,
          dt: 1,
          figcaption: 1,
          legend: 1,
          li: 1,
          optgroup: 1,
          option: 1,
          rp: 1,
          rt: 1,
          summary: 1,
          tbody: 1,
          td: 1,
          tfoot: 1,
          th: 1,
          thead: 1,
          tr: 1
        }
      });
      return d
    }();
    CKEDITOR.dom.event = function(a) {
      this.$ = a
    };
    CKEDITOR.dom.event.prototype = {
      getKey: function() {
        return this.$.keyCode || this.$.which
      },
      getKeystroke: function() {
        var a = this.getKey();
        if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL;
        this.$.shiftKey && (a += CKEDITOR.SHIFT);
        this.$.altKey && (a += CKEDITOR.ALT);
        return a
      },
      preventDefault: function(a) {
        var d = this.$;
        d.preventDefault ? d.preventDefault() : d.returnValue = !1;
        a && this.stopPropagation()
      },
      stopPropagation: function() {
        var a = this.$;
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
      },
      getTarget: function() {
        var a =
          this.$.target || this.$.srcElement;
        return a ? new CKEDITOR.dom.node(a) : null
      },
      getPhase: function() {
        return this.$.eventPhase || 2
      },
      getPageOffset: function() {
        var a = this.getTarget().getDocument().$;
        return {
          x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft),
          y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop)
        }
      }
    };
    CKEDITOR.CTRL = 1114112;
    CKEDITOR.SHIFT = 2228224;
    CKEDITOR.ALT = 4456448;
    CKEDITOR.EVENT_PHASE_CAPTURING = 1;
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2;
    CKEDITOR.EVENT_PHASE_BUBBLING = 3;
    CKEDITOR.dom.domObject = function(a) {
      a && (this.$ = a)
    };
    CKEDITOR.dom.domObject.prototype = function() {
      var a = function(a, b) {
        return function(c) {
          "undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c))
        }
      };
      return {
        getPrivate: function() {
          var a;
          (a = this.getCustomData("_")) || this.setCustomData("_", a = {});
          return a
        },
        on: function(d) {
          var b = this.getCustomData("_cke_nativeListeners");
          b || (b = {}, this.setCustomData("_cke_nativeListeners", b));
          b[d] || (b = b[d] = a(this, d), this.$.addEventListener ? this.$.addEventListener(d, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" +
            d, b));
          return CKEDITOR.event.prototype.on.apply(this, arguments)
        },
        removeListener: function(a) {
          CKEDITOR.event.prototype.removeListener.apply(this, arguments);
          if (!this.hasListeners(a)) {
            var b = this.getCustomData("_cke_nativeListeners"),
              c = b && b[a];
            c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a])
          }
        },
        removeAllListeners: function() {
          var a = this.getCustomData("_cke_nativeListeners"),
            b;
          for (b in a) {
            var c = a[b];
            this.$.detachEvent ? this.$.detachEvent("on" +
              b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1);
            delete a[b]
          }
          CKEDITOR.event.prototype.removeAllListeners.call(this)
        }
      }
    }();
    (function(a) {
      var d = {};
      CKEDITOR.on("reset", function() {
        d = {}
      });
      a.equals = function(a) {
        try {
          return a && a.$ === this.$
        } catch (c) {
          return !1
        }
      };
      a.setCustomData = function(a, c) {
        var e = this.getUniqueId();
        (d[e] || (d[e] = {}))[a] = c;
        return this
      };
      a.getCustomData = function(a) {
        var c = this.$["data-cke-expando"];
        return (c = c && d[c]) && a in c ? c[a] : null
      };
      a.removeCustomData = function(a) {
        var c = this.$["data-cke-expando"],
          c = c && d[c],
          e, g;
        c && (e = c[a], g = a in c, delete c[a]);
        return g ? e : null
      };
      a.clearCustomData = function() {
        this.removeAllListeners();
        var a =
          this.$["data-cke-expando"];
        a && delete d[a]
      };
      a.getUniqueId = function() {
        return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
      };
      CKEDITOR.event.implementOn(a)
    })(CKEDITOR.dom.domObject.prototype);
    CKEDITOR.dom.node = function(a) {
      return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this
    };
    CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.NODE_ELEMENT = 1;
    CKEDITOR.NODE_DOCUMENT = 9;
    CKEDITOR.NODE_TEXT = 3;
    CKEDITOR.NODE_COMMENT = 8;
    CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
    CKEDITOR.POSITION_IDENTICAL = 0;
    CKEDITOR.POSITION_DISCONNECTED = 1;
    CKEDITOR.POSITION_FOLLOWING = 2;
    CKEDITOR.POSITION_PRECEDING = 4;
    CKEDITOR.POSITION_IS_CONTAINED = 8;
    CKEDITOR.POSITION_CONTAINS = 16;
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
      appendTo: function(a, d) {
        a.append(this, d);
        return a
      },
      clone: function(a, d) {
        function b(c) {
          c["data-cke-expando"] && (c["data-cke-expando"] = !1);
          if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
            if (d || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) {
              c = c.childNodes;
              for (var e = 0; e < c.length; e++) b(c[e])
            }
        }

        function c(b) {
          if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
            if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
              var d =
                b.getName();
              ":" == d[0] && b.renameNode(d.substring(1))
            }
            if (a)
              for (d = 0; d < b.getChildCount(); d++) c(b.getChild(d))
          }
        }
        var e = this.$.cloneNode(a);
        b(e);
        e = new CKEDITOR.dom.node(e);
        CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(e);
        return e
      },
      hasPrevious: function() {
        return !!this.$.previousSibling
      },
      hasNext: function() {
        return !!this.$.nextSibling
      },
      insertAfter: function(a) {
        a.$.parentNode.insertBefore(this.$, a.$.nextSibling);
        return a
      },
      insertBefore: function(a) {
        a.$.parentNode.insertBefore(this.$,
          a.$);
        return a
      },
      insertBeforeMe: function(a) {
        this.$.parentNode.insertBefore(a.$, this.$);
        return a
      },
      getAddress: function(a) {
        for (var d = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) {
          var e = c.parentNode;
          e && d.unshift(this.getIndex.call({
            $: c
          }, a));
          c = e
        }
        return d
      },
      getDocument: function() {
        return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
      },
      getIndex: function(a) {
        function d(a, b) {
          var c = b ? a.nextSibling : a.previousSibling;
          return c && c.nodeType == CKEDITOR.NODE_TEXT ? c.nodeValue ?
            c : d(c, b) : null
        }
        var b = this.$,
          c = -1,
          e;
        if (!this.$.parentNode || a && b.nodeType == CKEDITOR.NODE_TEXT && !b.nodeValue && !d(b) && !d(b, !0)) return -1;
        do
          if (!a || b == this.$ || b.nodeType != CKEDITOR.NODE_TEXT || !e && b.nodeValue) c++, e = b.nodeType == CKEDITOR.NODE_TEXT;
        while (b = b.previousSibling);
        return c
      },
      getNextSourceNode: function(a, d, b) {
        if (b && !b.call) {
          var c = b;
          b = function(a) {
            return !a.equals(c)
          }
        }
        a = !a && this.getFirst && this.getFirst();
        var e;
        if (!a) {
          if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
          a = this.getNext()
        }
        for (; !a &&
          (e = (e || this).getParent());) {
          if (b && !1 === b(e, !0)) return null;
          a = e.getNext()
        }
        return !a || b && !1 === b(a) ? null : d && d != a.type ? a.getNextSourceNode(!1, d, b) : a
      },
      getPreviousSourceNode: function(a, d, b) {
        if (b && !b.call) {
          var c = b;
          b = function(a) {
            return !a.equals(c)
          }
        }
        a = !a && this.getLast && this.getLast();
        var e;
        if (!a) {
          if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
          a = this.getPrevious()
        }
        for (; !a && (e = (e || this).getParent());) {
          if (b && !1 === b(e, !0)) return null;
          a = e.getPrevious()
        }
        return !a || b && !1 === b(a) ? null : d && a.type !=
          d ? a.getPreviousSourceNode(!1, d, b) : a
      },
      getPrevious: function(a) {
        var d = this.$,
          b;
        do b = (d = d.previousSibling) && 10 != d.nodeType && new CKEDITOR.dom.node(d); while (b && a && !a(b));
        return b
      },
      getNext: function(a) {
        var d = this.$,
          b;
        do b = (d = d.nextSibling) && new CKEDITOR.dom.node(d); while (b && a && !a(b));
        return b
      },
      getParent: function(a) {
        var d = this.$.parentNode;
        return d && (d.nodeType == CKEDITOR.NODE_ELEMENT || a && d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(d) : null
      },
      getParents: function(a) {
        var d = this,
          b = [];
        do b[a ?
          "push" : "unshift"](d); while (d = d.getParent());
        return b
      },
      getCommonAncestor: function(a) {
        if (a.equals(this)) return this;
        if (a.contains && a.contains(this)) return a;
        var d = this.contains ? this : this.getParent();
        do
          if (d.contains(a)) return d;
        while (d = d.getParent());
        return null
      },
      getPosition: function(a) {
        var d = this.$,
          b = a.$;
        if (d.compareDocumentPosition) return d.compareDocumentPosition(b);
        if (d == b) return CKEDITOR.POSITION_IDENTICAL;
        if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
          if (d.contains) {
            if (d.contains(b)) return CKEDITOR.POSITION_CONTAINS +
              CKEDITOR.POSITION_PRECEDING;
            if (b.contains(d)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
          }
          if ("sourceIndex" in d) return 0 > d.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : d.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
        }
        d = this.getAddress();
        a = a.getAddress();
        for (var b = Math.min(d.length, a.length), c = 0; c < b; c++)
          if (d[c] != a[c]) return d[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
        return d.length < a.length ? CKEDITOR.POSITION_CONTAINS +
          CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
      },
      getAscendant: function(a, d) {
        var b = this.$,
          c, e;
        d || (b = b.parentNode);
        "function" == typeof a ? (e = !0, c = a) : (e = !1, c = function(b) {
          b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : "";
          return "string" == typeof a ? b == a : b in a
        });
        for (; b;) {
          if (c(e ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b);
          try {
            b = b.parentNode
          } catch (g) {
            b = null
          }
        }
        return null
      },
      hasAscendant: function(a, d) {
        var b = this.$;
        d || (b = b.parentNode);
        for (; b;) {
          if (b.nodeName &&
            b.nodeName.toLowerCase() == a) return !0;
          b = b.parentNode
        }
        return !1
      },
      move: function(a, d) {
        a.append(this.remove(), d)
      },
      remove: function(a) {
        var d = this.$,
          b = d.parentNode;
        if (b) {
          if (a)
            for (; a = d.firstChild;) b.insertBefore(d.removeChild(a), d);
          b.removeChild(d)
        }
        return this
      },
      replace: function(a) {
        this.insertBefore(a);
        a.remove()
      },
      trim: function() {
        this.ltrim();
        this.rtrim()
      },
      ltrim: function() {
        for (var a; this.getFirst && (a = this.getFirst());) {
          if (a.type == CKEDITOR.NODE_TEXT) {
            var d = CKEDITOR.tools.ltrim(a.getText()),
              b = a.getLength();
            if (d) d.length <
              b && (a.split(b - d.length), this.$.removeChild(this.$.firstChild));
            else {
              a.remove();
              continue
            }
          }
          break
        }
      },
      rtrim: function() {
        for (var a; this.getLast && (a = this.getLast());) {
          if (a.type == CKEDITOR.NODE_TEXT) {
            var d = CKEDITOR.tools.rtrim(a.getText()),
              b = a.getLength();
            if (d) d.length < b && (a.split(d.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
            else {
              a.remove();
              continue
            }
          }
          break
        }
        CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
      },
      isReadOnly: function(a) {
        var d =
          this;
        this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent());
        CKEDITOR.env.edge && d && d.is("textarea", "input") && (a = !0);
        if (!a && d && "undefined" != typeof d.$.isContentEditable) return !(d.$.isContentEditable || d.data("cke-editable"));
        for (; d;) {
          if (d.data("cke-editable")) return !1;
          if (d.hasAttribute("contenteditable")) return "false" == d.getAttribute("contenteditable");
          d = d.getParent()
        }
        return !0
      }
    });
    CKEDITOR.dom.window = function(a) {
      CKEDITOR.dom.domObject.call(this, a)
    };
    CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
      focus: function() {
        this.$.focus()
      },
      getViewPaneSize: function() {
        var a = this.$.document,
          d = "CSS1Compat" == a.compatMode;
        return {
          width: (d ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
          height: (d ? a.documentElement.clientHeight : a.body.clientHeight) || 0
        }
      },
      getScrollPosition: function() {
        var a = this.$;
        if ("pageXOffset" in a) return {
          x: a.pageXOffset || 0,
          y: a.pageYOffset || 0
        };
        a = a.document;
        return {
          x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
          y: a.documentElement.scrollTop ||
            a.body.scrollTop || 0
        }
      },
      getFrame: function() {
        var a = this.$.frameElement;
        return a ? new CKEDITOR.dom.element.get(a) : null
      }
    });
    CKEDITOR.dom.document = function(a) {
      CKEDITOR.dom.domObject.call(this, a)
    };
    CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
      type: CKEDITOR.NODE_DOCUMENT,
      appendStyleSheet: function(a) {
        if (this.$.createStyleSheet) this.$.createStyleSheet(a);
        else {
          var d = new CKEDITOR.dom.element("link");
          d.setAttributes({
            rel: "stylesheet",
            type: "text/css",
            href: a
          });
          this.getHead().append(d)
        }
      },
      appendStyleText: function(a) {
        if (this.$.createStyleSheet) {
          var d = this.$.createStyleSheet("");
          d.cssText = a
        } else {
          var b = new CKEDITOR.dom.element("style", this);
          b.append(new CKEDITOR.dom.text(a, this));
          this.getHead().append(b)
        }
        return d ||
          b.$.sheet
      },
      createElement: function(a, d) {
        var b = new CKEDITOR.dom.element(a, this);
        d && (d.attributes && b.setAttributes(d.attributes), d.styles && b.setStyles(d.styles));
        return b
      },
      createText: function(a) {
        return new CKEDITOR.dom.text(a, this)
      },
      focus: function() {
        this.getWindow().focus()
      },
      getActive: function() {
        var a;
        try {
          a = this.$.activeElement
        } catch (d) {
          return null
        }
        return new CKEDITOR.dom.element(a)
      },
      getById: function(a) {
        return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null
      },
      getByAddress: function(a, d) {
        for (var b =
            this.$.documentElement, c = 0; b && c < a.length; c++) {
          var e = a[c];
          if (d)
            for (var g = -1, h = 0; h < b.childNodes.length; h++) {
              var l = b.childNodes[h];
              if (!0 !== d || 3 != l.nodeType || !l.previousSibling || 3 != l.previousSibling.nodeType)
                if (g++, g == e) {
                  b = l;
                  break
                }
            } else b = b.childNodes[e]
        }
        return b ? new CKEDITOR.dom.node(b) : null
      },
      getElementsByTag: function(a, d) {
        CKEDITOR.env.ie && 8 >= document.documentMode || !d || (a = d + ":" + a);
        return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))
      },
      getHead: function() {
        var a = this.$.getElementsByTagName("head")[0];
        return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
      },
      getBody: function() {
        return new CKEDITOR.dom.element(this.$.body)
      },
      getDocumentElement: function() {
        return new CKEDITOR.dom.element(this.$.documentElement)
      },
      getWindow: function() {
        return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
      },
      write: function(a) {
        this.$.open("text/html", "replace");
        CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' +
          CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e"));
        this.$.write(a);
        this.$.close()
      },
      find: function(a) {
        return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))
      },
      findOne: function(a) {
        return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null
      },
      _getHtml5ShivFrag: function() {
        var a = this.getCustomData("html5ShivFrag");
        a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a));
        return a
      }
    });
    CKEDITOR.dom.nodeList = function(a) {
      this.$ = a
    };
    CKEDITOR.dom.nodeList.prototype = {
      count: function() {
        return this.$.length
      },
      getItem: function(a) {
        return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null
      }
    };
    CKEDITOR.dom.element = function(a, d) {
      "string" == typeof a && (a = (d ? d.$ : document).createElement(a));
      CKEDITOR.dom.domObject.call(this, a)
    };
    CKEDITOR.dom.element.get = function(a) {
      return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a))
    };
    CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node;
    CKEDITOR.dom.element.createFromHtml = function(a, d) {
      var b = new CKEDITOR.dom.element("div", d);
      b.setHtml(a);
      return b.getFirst().remove()
    };
    CKEDITOR.dom.element.setMarker = function(a, d, b, c) {
      var e = d.getCustomData("list_marker_id") || d.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
        g = d.getCustomData("list_marker_names") || d.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
      a[e] = d;
      g[b] = 1;
      return d.setCustomData(b, c)
    };
    CKEDITOR.dom.element.clearAllMarkers = function(a) {
      for (var d in a) CKEDITOR.dom.element.clearMarkers(a, a[d], 1)
    };
    CKEDITOR.dom.element.clearMarkers = function(a, d, b) {
      var c = d.getCustomData("list_marker_names"),
        e = d.getCustomData("list_marker_id"),
        g;
      for (g in c) d.removeCustomData(g);
      d.removeCustomData("list_marker_names");
      b && (d.removeCustomData("list_marker_id"), delete a[e])
    };
    (function() {
      function a(a, b) {
        return -1 < (" " + a + " ").replace(g, " ").indexOf(" " + b + " ")
      }

      function d(a) {
        var b = !0;
        a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1);
        return function() {
          b || a.removeAttribute("id")
        }
      }

      function b(a, b) {
        return "#" + a.$.id + " " + b.split(/,\s*/).join(", #" + a.$.id + " ")
      }

      function c(a) {
        for (var b = 0, c = 0, f = h[a].length; c < f; c++) b += parseInt(this.getComputedStyle(h[a][c]) || 0, 10) || 0;
        return b
      }
      var e = document.createElement("_").classList,
        e = "undefined" !== typeof e && null !== String(e.add).match(/\[Native code\]/gi),
        g = /[\n\t\r]/g;
      CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_ELEMENT,
        addClass: e ? function(a) {
          this.$.classList.add(a);
          return this
        } : function(b) {
          var c = this.$.className;
          c && (a(c, b) || (c += " " + b));
          this.$.className = c || b;
          return this
        },
        removeClass: e ? function(a) {
          var b = this.$;
          b.classList.remove(a);
          b.className || b.removeAttribute("class");
          return this
        } : function(b) {
          var c = this.getAttribute("class");
          c && a(c, b) && ((c = c.replace(new RegExp("(?:^|\\s+)" + b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class",
            c) : this.removeAttribute("class"));
          return this
        },
        hasClass: function(b) {
          return a(this.$.className, b)
        },
        append: function(a, b) {
          "string" == typeof a && (a = this.getDocument().createElement(a));
          b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
          return a
        },
        appendHtml: function(a) {
          if (this.$.childNodes.length) {
            var b = new CKEDITOR.dom.element("div", this.getDocument());
            b.setHtml(a);
            b.moveChildren(this)
          } else this.setHtml(a)
        },
        appendText: function(a) {
          null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ?
            this.$.text += a : this.append(new CKEDITOR.dom.text(a))
        },
        appendBogus: function(a) {
          if (a || CKEDITOR.env.needsBrFiller) {
            for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
            a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a))
          }
        },
        breakParent: function(a, b) {
          var c = new CKEDITOR.dom.range(this.getDocument());
          c.setStartAfter(this);
          c.setEndAfter(a);
          var f = c.extractContents(!1, b || !1);
          c.insertNode(this.remove());
          f.insertAfterNode(this)
        },
        contains: document.compareDocumentPosition ? function(a) {
          return !!(this.$.compareDocumentPosition(a.$) & 16)
        } : function(a) {
          var b = this.$;
          return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
        },
        focus: function() {
          function a() {
            try {
              this.$.focus()
            } catch (b) {}
          }
          return function(b) {
            b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
          }
        }(),
        getHtml: function() {
          var a = this.$.innerHTML;
          return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
        },
        getOuterHtml: function() {
          if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/,
            "");
          var a = this.$.ownerDocument.createElement("div");
          a.appendChild(this.$.cloneNode(!0));
          return a.innerHTML
        },
        getClientRect: function() {
          var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
          !a.width && (a.width = a.right - a.left);
          !a.height && (a.height = a.bottom - a.top);
          return a
        },
        setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function(a) {
          try {
            var b = this.$;
            if (this.getParent()) return b.innerHTML = a;
            var c = this.getDocument()._getHtml5ShivFrag();
            c.appendChild(b);
            b.innerHTML = a;
            c.removeChild(b);
            return a
          } catch (f) {
            this.$.innerHTML =
              "";
            b = new CKEDITOR.dom.element("body", this.getDocument());
            b.$.innerHTML = a;
            for (b = b.getChildren(); b.count();) this.append(b.getItem(0));
            return a
          }
        } : function(a) {
          return this.$.innerHTML = a
        },
        setText: function() {
          var a = document.createElement("p");
          a.innerHTML = "x";
          a = a.textContent;
          return function(b) {
            this.$[a ? "textContent" : "innerText"] = b
          }
        }(),
        getAttribute: function() {
          var a = function(a) {
            return this.$.getAttribute(a, 2)
          };
          return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
            switch (a) {
              case "class":
                a =
                  "className";
                break;
              case "http-equiv":
                a = "httpEquiv";
                break;
              case "name":
                return this.$.name;
              case "tabindex":
                return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), a;
              case "checked":
                return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
              case "hspace":
              case "value":
                return this.$[a];
              case "style":
                return this.$.style.cssText;
              case "contenteditable":
              case "contentEditable":
                return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") :
                  null
            }
            return this.$.getAttribute(a, 2)
          } : a
        }(),
        getChildren: function() {
          return new CKEDITOR.dom.nodeList(this.$.childNodes)
        },
        getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function(a) {
          var b = this.getWindow().$.getComputedStyle(this.$, null);
          return b ? b.getPropertyValue(a) : ""
        } : function(a) {
          return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
        },
        getDtd: function() {
          var a = CKEDITOR.dtd[this.getName()];
          this.getDtd = function() {
            return a
          };
          return a
        },
        getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
        getTabIndex: function() {
          var a = this.$.tabIndex;
          return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1
        },
        getText: function() {
          return this.$.textContent || this.$.innerText || ""
        },
        getWindow: function() {
          return this.getDocument().getWindow()
        },
        getId: function() {
          return this.$.id || null
        },
        getNameAtt: function() {
          return this.$.name || null
        },
        getName: function() {
          var a = this.$.nodeName.toLowerCase();
          if (CKEDITOR.env.ie && 8 >= document.documentMode) {
            var b = this.$.scopeName;
            "HTML" !=
            b && (a = b.toLowerCase() + ":" + a)
          }
          this.getName = function() {
            return a
          };
          return this.getName()
        },
        getValue: function() {
          return this.$.value
        },
        getFirst: function(a) {
          var b = this.$.firstChild;
          (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
          return b
        },
        getLast: function(a) {
          var b = this.$.lastChild;
          (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a));
          return b
        },
        getStyle: function(a) {
          return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
        },
        is: function() {
          var a = this.getName();
          if ("object" == typeof arguments[0]) return !!arguments[0][a];
          for (var b = 0; b < arguments.length; b++)
            if (arguments[b] == a) return !0;
          return !1
        },
        isEditable: function(a) {
          var b = this.getName();
          return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
        },
        isIdentical: function(a) {
          var b = this.clone(0, 1);
          a = a.clone(0,
            1);
          b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
          a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
          if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);
          b = b.getOuterHtml();
          a = a.getOuterHtml();
          if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
            var c = this.getParent();
            c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml())
          }
          return b == a
        },
        isVisible: function() {
          var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"),
            b, c;
          a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible()));
          return !!a
        },
        isEmptyInlineRemoveable: function() {
          if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
          for (var a = this.getChildren(),
              b = 0, c = a.count(); b < c; b++) {
            var f = a.getItem(b);
            if (f.type != CKEDITOR.NODE_ELEMENT || !f.data("cke-bookmark"))
              if (f.type == CKEDITOR.NODE_ELEMENT && !f.isEmptyInlineRemoveable() || f.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(f.getText())) return !1
          }
          return !0
        },
        hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
          for (var a = this.$.attributes, b = 0; b < a.length; b++) {
            var c = a[b];
            switch (c.nodeName) {
              case "class":
                if (this.getAttribute("class")) return !0;
              case "data-cke-expando":
                continue;
              default:
                if (c.specified) return !0
            }
          }
          return !1
        } : function() {
          var a = this.$.attributes,
            b = a.length,
            c = {
              "data-cke-expando": 1,
              _moz_dirty: 1
            };
          return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName])
        },
        hasAttribute: function() {
          function a(b) {
            var c = this.$.attributes.getNamedItem(b);
            if ("input" == this.getName()) switch (b) {
              case "class":
                return 0 < this.$.className.length;
              case "checked":
                return !!this.$.checked;
              case "value":
                return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value
            }
            return c ? c.specified : !1
          }
          return CKEDITOR.env.ie ?
            8 > CKEDITOR.env.version ? function(b) {
              return "name" == b ? !!this.$.name : a.call(this, b)
            } : a : function(a) {
              return !!this.$.attributes.getNamedItem(a)
            }
        }(),
        hide: function() {
          this.setStyle("display", "none")
        },
        moveChildren: function(a, b) {
          var c = this.$;
          a = a.$;
          if (c != a) {
            var f;
            if (b)
              for (; f = c.lastChild;) a.insertBefore(c.removeChild(f), a.firstChild);
            else
              for (; f = c.firstChild;) a.appendChild(c.removeChild(f))
          }
        },
        mergeSiblings: function() {
          function a(b, c, f) {
            if (c && c.type == CKEDITOR.NODE_ELEMENT) {
              for (var d = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)
                if (d.push(c),
                  c = f ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return;
              if (b.isIdentical(c)) {
                for (var l = f ? b.getLast() : b.getFirst(); d.length;) d.shift().move(b, !f);
                c.moveChildren(b, !f);
                c.remove();
                l && l.type == CKEDITOR.NODE_ELEMENT && l.mergeSiblings()
              }
            }
          }
          return function(b) {
            if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious())
          }
        }(),
        show: function() {
          this.setStyles({
            display: "",
            visibility: ""
          })
        },
        setAttribute: function() {
          var a = function(a, b) {
            this.$.setAttribute(a,
              b);
            return this
          };
          return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(b, c) {
            "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
            return this
          } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
            if ("src" == b && c.match(/^http:\/\//)) try {
              a.apply(this, arguments)
            } catch (f) {} else a.apply(this, arguments);
            return this
          } : a
        }(),
        setAttributes: function(a) {
          for (var b in a) this.setAttribute(b,
            a[b]);
          return this
        },
        setValue: function(a) {
          this.$.value = a;
          return this
        },
        removeAttribute: function() {
          var a = function(a) {
            this.$.removeAttribute(a)
          };
          return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
            "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable");
            this.$.removeAttribute(a)
          } : a
        }(),
        removeAttributes: function(a) {
          if (CKEDITOR.tools.isArray(a))
            for (var b = 0; b < a.length; b++) this.removeAttribute(a[b]);
          else
            for (b in a) a.hasOwnProperty(b) && this.removeAttribute(b)
        },
        removeStyle: function(a) {
          var b = this.$.style;
          if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style");
          else {
            var c = ["top", "left", "right", "bottom"],
              f;
            "border" == a && (f = ["color", "style", "width"]);
            for (var b = [], d = 0; d < c.length; d++)
              if (f)
                for (var A = 0; A < f.length; A++) b.push([a, c[d], f[A]].join("-"));
              else b.push([a, c[d]].join("-"));
            for (a = 0; a < b.length; a++) this.removeStyle(b[a])
          }
        },
        setStyle: function(a, b) {
          this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
          return this
        },
        setStyles: function(a) {
          for (var b in a) this.setStyle(b, a[b]);
          return this
        },
        setOpacity: function(a) {
          CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a)
        },
        unselectable: function() {
          this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
          if (CKEDITOR.env.ie) {
            this.setAttribute("unselectable",
              "on");
            for (var a, b = this.getElementsByTag("*"), c = 0, f = b.count(); c < f; c++) a = b.getItem(c), a.setAttribute("unselectable", "on")
          }
        },
        getPositionedAncestor: function() {
          for (var a = this;
            "html" != a.getName();) {
            if ("static" != a.getComputedStyle("position")) return a;
            a = a.getParent()
          }
          return null
        },
        getDocumentPosition: function(a) {
          var b = 0,
            c = 0,
            f = this.getDocument(),
            d = f.getBody(),
            A = "BackCompat" == f.$.compatMode;
          if (document.documentElement.getBoundingClientRect) {
            var e = this.$.getBoundingClientRect(),
              g = f.$.documentElement,
              m = g.clientTop ||
              d.$.clientTop || 0,
              y = g.clientLeft || d.$.clientLeft || 0,
              h = !0;
            CKEDITOR.env.ie && (h = f.getDocumentElement().contains(this), f = f.getBody().contains(this), h = A && f || !A && h);
            h && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || g.scrollLeft, c = d.$.scrollTop || g.scrollTop) : (c = A ? d.$ : g, b = c.scrollLeft, c = c.scrollTop), b = e.left + b - y, c = e.top + c - m)
          } else
            for (m = this, y = null; m && "body" != m.getName() && "html" != m.getName();) {
              b += m.$.offsetLeft - m.$.scrollLeft;
              c += m.$.offsetTop - m.$.scrollTop;
              m.equals(this) ||
                (b += m.$.clientLeft || 0, c += m.$.clientTop || 0);
              for (; y && !y.equals(m);) b -= y.$.scrollLeft, c -= y.$.scrollTop, y = y.getParent();
              y = m;
              m = (e = m.$.offsetParent) ? new CKEDITOR.dom.element(e) : null
            }
          a && (e = this.getWindow(), m = a.getWindow(), !e.equals(m) && e.$.frameElement && (a = (new CKEDITOR.dom.element(e.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y));
          document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || A || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0);
          return {
            x: b,
            y: c
          }
        },
        scrollIntoView: function(a) {
          var b =
            this.getParent();
          if (b) {
            do
              if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) {
                var c = b.getWindow();
                try {
                  var f = c.$.frameElement;
                  f && (b = new CKEDITOR.dom.element(f))
                } catch (d) {}
              }
            while (b = b.getParent())
          }
        },
        scrollIntoParent: function(a, b, c) {
          var f, d, e, u;

          function g(b, c) {
            /body|html/.test(a.getName()) ? a.getWindow().$.scrollBy(b, c) : (a.$.scrollLeft += b, a.$.scrollTop += c)
          }

          function m(a, b) {
            var c = {
              x: 0,
              y: 0
            };
            if (!a.is(h ?
                "body" : "html")) {
              var f = a.$.getBoundingClientRect();
              c.x = f.left;
              c.y = f.top
            }
            f = a.getWindow();
            f.equals(b) || (f = m(CKEDITOR.dom.element.get(f.$.frameElement), b), c.x += f.x, c.y += f.y);
            return c
          }

          function y(a, b) {
            return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0
          }!a && (a = this.getWindow());
          e = a.getDocument();
          var h = "BackCompat" == e.$.compatMode;
          a instanceof CKEDITOR.dom.window && (a = h ? e.getBody() : e.getDocumentElement());
          e = a.getWindow();
          d = m(this, e);
          var v = m(a, e),
            x = this.$.offsetHeight;
          f = this.$.offsetWidth;
          var k = a.$.clientHeight,
            p = a.$.clientWidth;
          e = d.x - y(this, "left") - v.x || 0;
          u = d.y - y(this, "top") - v.y || 0;
          f = d.x + f + y(this, "right") - (v.x + p) || 0;
          d = d.y + x + y(this, "bottom") - (v.y + k) || 0;
          (0 > u || 0 < d) && g(0, !0 === b ? u : !1 === b ? d : 0 > u ? u : d);
          c && (0 > e || 0 < f) && g(0 > e ? e : f, 0)
        },
        setState: function(a, b, c) {
          b = b || "cke";
          switch (a) {
            case CKEDITOR.TRISTATE_ON:
              this.addClass(b + "_on");
              this.removeClass(b + "_off");
              this.removeClass(b + "_disabled");
              c && this.setAttribute("aria-pressed", !0);
              c && this.removeAttribute("aria-disabled");
              break;
            case CKEDITOR.TRISTATE_DISABLED:
              this.addClass(b +
                "_disabled");
              this.removeClass(b + "_off");
              this.removeClass(b + "_on");
              c && this.setAttribute("aria-disabled", !0);
              c && this.removeAttribute("aria-pressed");
              break;
            default:
              this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
          }
        },
        getFrameDocument: function() {
          var a = this.$;
          try {
            a.contentWindow.document
          } catch (b) {
            a.src = a.src
          }
          return a && new CKEDITOR.dom.document(a.contentWindow.document)
        },
        copyAttributes: function(a,
          b) {
          var c = this.$.attributes;
          b = b || {};
          for (var f = 0; f < c.length; f++) {
            var d = c[f],
              e = d.nodeName.toLowerCase(),
              u;
            if (!(e in b))
              if ("checked" == e && (u = this.getAttribute(e))) a.setAttribute(e, u);
              else if (!CKEDITOR.env.ie || this.hasAttribute(e)) u = this.getAttribute(e), null === u && (u = d.nodeValue), a.setAttribute(e, u)
          }
          "" !== this.$.style.cssText && (a.$.style.cssText = this.$.style.cssText)
        },
        renameNode: function(a) {
          if (this.getName() != a) {
            var b = this.getDocument();
            a = new CKEDITOR.dom.element(a, b);
            this.copyAttributes(a);
            this.moveChildren(a);
            this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
            a.$["data-cke-expando"] = this.$["data-cke-expando"];
            this.$ = a.$;
            delete this.getName
          }
        },
        getChild: function() {
          function a(b, c) {
            var f = b.childNodes;
            if (0 <= c && c < f.length) return f[c]
          }
          return function(b) {
            var c = this.$;
            if (b.slice)
              for (b = b.slice(); 0 < b.length && c;) c = a(c, b.shift());
            else c = a(c, b);
            return c ? new CKEDITOR.dom.node(c) : null
          }
        }(),
        getChildCount: function() {
          return this.$.childNodes.length
        },
        disableContextMenu: function() {
          function a(b) {
            return b.type == CKEDITOR.NODE_ELEMENT &&
              b.hasClass("cke_enable_context_menu")
          }
          this.on("contextmenu", function(b) {
            b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault()
          })
        },
        getDirection: function(a) {
          return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
        },
        data: function(a, b) {
          a = "data-" + a;
          if (void 0 === b) return this.getAttribute(a);
          !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b);
          return null
        },
        getEditor: function() {
          var a = CKEDITOR.instances,
            b, c;
          for (b in a)
            if (c = a[b], c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return c;
          return null
        },
        find: function(a) {
          var c = d(this);
          a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this, a)));
          c();
          return a
        },
        findOne: function(a) {
          var c = d(this);
          a = this.$.querySelector(b(this, a));
          c();
          return a ? new CKEDITOR.dom.element(a) : null
        },
        forEach: function(a, b, c) {
          if (!(c || b && this.type != b)) var f = a(this);
          if (!1 !== f) {
            c = this.getChildren();
            for (var d = 0; d < c.count(); d++) f =
              c.getItem(d), f.type == CKEDITOR.NODE_ELEMENT ? f.forEach(a, b) : b && f.type != b || a(f)
          }
        }
      });
      var h = {
        width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
        height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
      };
      CKEDITOR.dom.element.prototype.setSize = function(a, b, d) {
        "number" == typeof b && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px"))
      };
      CKEDITOR.dom.element.prototype.getSize = function(a, b) {
        var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)],
          this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
        b && (d -= c.call(this, a));
        return d
      }
    })();
    CKEDITOR.dom.documentFragment = function(a) {
      a = a || CKEDITOR.document;
      this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a
    };
    CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
      type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
      insertAfterNode: function(a) {
        a = a.$;
        a.parentNode.insertBefore(this.$, a.nextSibling)
      },
      getHtml: function() {
        var a = new CKEDITOR.dom.element("div");
        this.clone(1, 1).appendTo(a);
        return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
      }
    }, !0, {
      append: 1,
      appendBogus: 1,
      clone: 1,
      getFirst: 1,
      getHtml: 1,
      getLast: 1,
      getParent: 1,
      getNext: 1,
      getPrevious: 1,
      appendTo: 1,
      moveChildren: 1,
      insertBefore: 1,
      insertAfterNode: 1,
      replace: 1,
      trim: 1,
      type: 1,
      ltrim: 1,
      rtrim: 1,
      getDocument: 1,
      getChildCount: 1,
      getChild: 1,
      getChildren: 1
    });
    (function() {
      function a(a, b) {
        var c = this.range;
        if (this._.end) return null;
        if (!this._.start) {
          this._.start = 1;
          if (c.collapsed) return this.end(), null;
          c.optimize()
        }
        var f, d = c.startContainer;
        f = c.endContainer;
        var e = c.startOffset,
          z = c.endOffset,
          x, k = this.guard,
          p = this.type,
          n = a ? "getPreviousSourceNode" : "getNextSourceNode";
        if (!a && !this._.guardLTR) {
          var D = f.type == CKEDITOR.NODE_ELEMENT ? f : f.getParent(),
            r = f.type == CKEDITOR.NODE_ELEMENT ? f.getChild(z) : f.getNext();
          this._.guardLTR = function(a, b) {
            return (!b || !D.equals(a)) && (!r ||
              !a.equals(r)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
          }
        }
        if (a && !this._.guardRTL) {
          var F = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
            g = d.type == CKEDITOR.NODE_ELEMENT ? e ? d.getChild(e - 1) : null : d.getPrevious();
          this._.guardRTL = function(a, b) {
            return (!b || !F.equals(a)) && (!g || !a.equals(g)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
          }
        }
        var h = a ? this._.guardRTL : this._.guardLTR;
        x = k ? function(a, b) {
          return !1 === h(a, b) ? !1 : k(a, b)
        } : h;
        this.current ? f = this.current[n](!1, p, x) : (a ? f.type == CKEDITOR.NODE_ELEMENT &&
          (f = 0 < z ? f.getChild(z - 1) : !1 === x(f, !0) ? null : f.getPreviousSourceNode(!0, p, x)) : (f = d, f.type == CKEDITOR.NODE_ELEMENT && ((f = f.getChild(e)) || (f = !1 === x(d, !0) ? null : d.getNextSourceNode(!0, p, x)))), f && !1 === x(f) && (f = null));
        for (; f && !this._.end;) {
          this.current = f;
          if (!this.evaluator || !1 !== this.evaluator(f)) {
            if (!b) return f
          } else if (b && this.evaluator) return !1;
          f = f[n](!1, p, x)
        }
        this.end();
        return this.current = null
      }

      function d(b) {
        for (var c, f = null; c = a.call(this, b);) f = c;
        return f
      }
      CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
        $: function(a) {
          this.range =
            a;
          this._ = {}
        },
        proto: {
          end: function() {
            this._.end = 1
          },
          next: function() {
            return a.call(this)
          },
          previous: function() {
            return a.call(this, 1)
          },
          checkForward: function() {
            return !1 !== a.call(this, 0, 1)
          },
          checkBackward: function() {
            return !1 !== a.call(this, 1, 1)
          },
          lastForward: function() {
            return d.call(this)
          },
          lastBackward: function() {
            return d.call(this, 1)
          },
          reset: function() {
            delete this.current;
            this._ = {}
          }
        }
      });
      var b = {
          block: 1,
          "list-item": 1,
          table: 1,
          "table-row-group": 1,
          "table-header-group": 1,
          "table-footer-group": 1,
          "table-row": 1,
          "table-column-group": 1,
          "table-column": 1,
          "table-cell": 1,
          "table-caption": 1
        },
        c = {
          absolute: 1,
          fixed: 1
        };
      CKEDITOR.dom.element.prototype.isBlockBoundary = function(a) {
        return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0
      };
      CKEDITOR.dom.walker.blockBoundary = function(a) {
        return function(b) {
          return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
        }
      };
      CKEDITOR.dom.walker.listItemBoundary = function() {
        return this.blockBoundary({
          br: 1
        })
      };
      CKEDITOR.dom.walker.bookmark = function(a, b) {
        function c(a) {
          return a && a.getName && "span" == a.getName() && a.data("cke-bookmark")
        }
        return function(f) {
          var d, e;
          d = f && f.type != CKEDITOR.NODE_ELEMENT && (e = f.getParent()) && c(e);
          d = a ? d : d || c(f);
          return !!(b ^ d)
        }
      };
      CKEDITOR.dom.walker.whitespaces = function(a) {
        return function(b) {
          var c;
          b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && "​" == b.getText());
          return !!(a ^ c)
        }
      };
      CKEDITOR.dom.walker.invisible = function(a) {
        var b = CKEDITOR.dom.walker.whitespaces(),
          c = CKEDITOR.env.webkit ? 1 : 0;
        return function(f) {
          b(f) ? f = 1 : (f.type == CKEDITOR.NODE_TEXT && (f = f.getParent()), f = f.$.offsetWidth <= c);
          return !!(a ^ f)
        }
      };
      CKEDITOR.dom.walker.nodeType = function(a, b) {
        return function(c) {
          return !!(b ^ c.type == a)
        }
      };
      CKEDITOR.dom.walker.bogus = function(a) {
        function b(a) {
          return !g(a) && !h(a)
        }
        return function(c) {
          var f = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && e.test(c.getText());
          f && (f = c.getParent(), c = c.getNext(b), f = f.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary()));
          return !!(a ^ f)
        }
      };
      CKEDITOR.dom.walker.temp = function(a) {
        return function(b) {
          b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
          b = b && b.hasAttribute("data-cke-temp");
          return !!(a ^ b)
        }
      };
      var e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
        g = CKEDITOR.dom.walker.whitespaces(),
        h = CKEDITOR.dom.walker.bookmark(),
        l = CKEDITOR.dom.walker.temp(),
        q = function(a) {
          return h(a) || g(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty)
        };
      CKEDITOR.dom.walker.ignored = function(a) {
        return function(b) {
          b = g(b) || h(b) ||
            l(b);
          return !!(a ^ b)
        }
      };
      var t = CKEDITOR.dom.walker.ignored();
      CKEDITOR.dom.walker.empty = function(a) {
        return function(b) {
          for (var c = 0, f = b.getChildCount(); c < f; ++c)
            if (!t(b.getChild(c))) return !!a;
          return !a
        }
      };
      var f = CKEDITOR.dom.walker.empty(),
        z = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function(a) {
          var b = {},
            c;
          for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1);
          return b
        }(CKEDITOR.dtd.$block), {
          caption: 1,
          td: 1,
          th: 1
        });
      CKEDITOR.dom.walker.editable = function(a) {
        return function(b) {
          b = t(b) ? !1 : b.type == CKEDITOR.NODE_TEXT ||
            b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(z) && f(b)) ? !0 : !1;
          return !!(a ^ b)
        }
      };
      CKEDITOR.dom.element.prototype.getBogus = function() {
        var a = this;
        do a = a.getPreviousSourceNode(); while (q(a));
        return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && e.test(a.getText())) ? a : !1
      }
    })();
    CKEDITOR.dom.range = function(a) {
      this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
      this.collapsed = !0;
      var d = a instanceof CKEDITOR.dom.document;
      this.document = d ? a : a.getDocument();
      this.root = d ? a.getBody() : a
    };
    (function() {
      function a(a) {
        a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
      }

      function d(a, b, c, d, e) {
        function m(a, b, c, f) {
          var d = c ? a.getPrevious() : a.getNext();
          if (f && l) return d;
          k || f ? b.append(a.clone(!0, e), c) : (a.remove(), x && b.append(a));
          return d
        }

        function g() {
          var a, b, c, f = Math.min(w.length, H.length);
          for (a = 0; a < f; a++)
            if (b = w[a], c = H[a], !b.equals(c)) return a;
          return a - 1
        }

        function h() {
          var b = I - 1,
            c = t && q && !p.equals(n);
          b < G - 1 || b < J - 1 || c ? (c ? a.moveToPosition(n,
            CKEDITOR.POSITION_BEFORE_START) : J == b + 1 && B ? a.moveToPosition(H[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(H[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = w[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({
            startNode: c
          }))) : a.collapse(!0)
        }
        a.optimizeBookmark();
        var l = 0 === b,
          x = 1 == b,
          k = 2 == b;
        b = k || x;
        var p = a.startContainer,
          n = a.endContainer,
          D = a.startOffset,
          r = a.endOffset,
          F, B, t, q, M, S;
        if (k && n.type == CKEDITOR.NODE_TEXT && p.equals(n)) p = a.document.createText(p.substring(D, r)), c.append(p);
        else {
          n.type == CKEDITOR.NODE_TEXT ? k ? S = !0 : n = n.split(r) : 0 < n.getChildCount() ? r >= n.getChildCount() ? (n = n.getChild(r - 1), B = !0) : n = n.getChild(r) : q = B = !0;
          p.type == CKEDITOR.NODE_TEXT ? k ? M = !0 : p.split(D) : 0 < p.getChildCount() ? 0 === D ? (p = p.getChild(D), F = !0) : p = p.getChild(D - 1) : t = F = !0;
          for (var w = p.getParents(), H = n.getParents(), I = g(), G = w.length - 1, J = H.length - 1, O = c, K, aa, W, fa = -1, P = I; P <= G; P++) {
            aa =
              w[P];
            W = aa.getNext();
            for (P != G || aa.equals(H[P]) && G < J ? b && (K = O.append(aa.clone(0, e))) : F ? m(aa, O, !1, t) : M && O.append(a.document.createText(aa.substring(D))); W;) {
              if (W.equals(H[P])) {
                fa = P;
                break
              }
              W = m(W, O)
            }
            O = K
          }
          O = c;
          for (P = I; P <= J; P++)
            if (c = H[P], W = c.getPrevious(), c.equals(w[P])) b && (O = O.getChild(0));
            else {
              P != J || c.equals(w[P]) && J < G ? b && (K = O.append(c.clone(0, e))) : B ? m(c, O, !1, q) : S && O.append(a.document.createText(c.substring(0, r)));
              if (P > fa)
                for (; W;) W = m(W, O, !0);
              O = K
            }
          k || h()
        }
      }

      function b() {
        var a = !1,
          b = CKEDITOR.dom.walker.whitespaces(),
          c = CKEDITOR.dom.walker.bookmark(!0),
          d = CKEDITOR.dom.walker.bogus();
        return function(e) {
          return c(e) || b(e) ? !0 : d(e) && !a ? a = !0 : e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(g) ? !1 : !0
        }
      }

      function c(a) {
        var b = CKEDITOR.dom.walker.whitespaces(),
          c = CKEDITOR.dom.walker.bookmark(1);
        return function(d) {
          return c(d) || b(d) ? !0 : !a && h(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty)
        }
      }

      function e(a) {
        return function() {
          var b;
          return this[a ?
            "getPreviousNode" : "getNextNode"](function(a) {
            !b && t(a) && (b = a);
            return q(a) && !(h(a) && a.equals(b))
          })
        }
      }
      var g = {
          abbr: 1,
          acronym: 1,
          b: 1,
          bdo: 1,
          big: 1,
          cite: 1,
          code: 1,
          del: 1,
          dfn: 1,
          em: 1,
          font: 1,
          i: 1,
          ins: 1,
          label: 1,
          kbd: 1,
          q: 1,
          samp: 1,
          small: 1,
          span: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          tt: 1,
          u: 1,
          "var": 1
        },
        h = CKEDITOR.dom.walker.bogus(),
        l = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
        q = CKEDITOR.dom.walker.editable(),
        t = CKEDITOR.dom.walker.ignored(!0);
      CKEDITOR.dom.range.prototype = {
        clone: function() {
          var a = new CKEDITOR.dom.range(this.root);
          a._setStartContainer(this.startContainer);
          a.startOffset = this.startOffset;
          a._setEndContainer(this.endContainer);
          a.endOffset = this.endOffset;
          a.collapsed = this.collapsed;
          return a
        },
        collapse: function(a) {
          a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset);
          this.collapsed = !0
        },
        cloneContents: function(a) {
          var b = new CKEDITOR.dom.documentFragment(this.document);
          this.collapsed || d(this, 2, b, !1, "undefined" == typeof a ? !0 : a);
          return b
        },
        deleteContents: function(a) {
          this.collapsed ||
            d(this, 0, null, a)
        },
        extractContents: function(a, b) {
          var c = new CKEDITOR.dom.documentFragment(this.document);
          this.collapsed || d(this, 1, c, a, "undefined" == typeof b ? !0 : b);
          return c
        },
        createBookmark: function(a) {
          var b, c, d, e, m = this.collapsed;
          b = this.document.createElement("span");
          b.data("cke-bookmark", 1);
          b.setStyle("display", "none");
          b.setHtml("\x26nbsp;");
          a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (m ? "C" : "S")));
          m || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), e = this.clone(),
            e.collapse(), e.insertNode(c));
          e = this.clone();
          e.collapse(!0);
          e.insertNode(b);
          c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
          return {
            startNode: a ? d + (m ? "C" : "S") : b,
            endNode: a ? d + "E" : c,
            serializable: a,
            collapsed: m
          }
        },
        createBookmark2: function() {
          function a(c) {
            var f = c.container,
              d = c.offset,
              e;
            e = f;
            var g = d;
            e = e.type != CKEDITOR.NODE_ELEMENT || 0 === g || g == e.getChildCount() ? 0 : e.getChild(g - 1).type == CKEDITOR.NODE_TEXT && e.getChild(g).type == CKEDITOR.NODE_TEXT;
            e && (f = f.getChild(d -
              1), d = f.getLength());
            f.type == CKEDITOR.NODE_ELEMENT && 1 < d && (d = f.getChild(d - 1).getIndex(!0) + 1);
            if (f.type == CKEDITOR.NODE_TEXT) {
              e = f;
              for (g = 0;
                (e = e.getPrevious()) && e.type == CKEDITOR.NODE_TEXT;) g += e.getLength();
              e = g;
              f.getText() ? d += e : (g = f.getPrevious(b), e ? (d = e, f = g ? g.getNext() : f.getParent().getFirst()) : (f = f.getParent(), d = g ? g.getIndex(!0) + 1 : 0))
            }
            c.container = f;
            c.offset = d
          }
          var b = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
          return function(b) {
            var c = this.collapsed,
              d = {
                container: this.startContainer,
                offset: this.startOffset
              },
              e = {
                container: this.endContainer,
                offset: this.endOffset
              };
            b && (a(d), c || a(e));
            return {
              start: d.container.getAddress(b),
              end: c ? null : e.container.getAddress(b),
              startOffset: d.offset,
              endOffset: e.offset,
              normalized: b,
              collapsed: c,
              is2: !0
            }
          }
        }(),
        moveToBookmark: function(a) {
          if (a.is2) {
            var b = this.document.getByAddress(a.start, a.normalized),
              c = a.startOffset,
              d = a.end && this.document.getByAddress(a.end, a.normalized);
            a = a.endOffset;
            this.setStart(b, c);
            d ? this.setEnd(d, a) : this.collapse(!0)
          } else b = (c = a.serializable) ? this.document.getById(a.startNode) :
            a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
        },
        getBoundaryNodes: function() {
          var a = this.startContainer,
            b = this.endContainer,
            c = this.startOffset,
            d = this.endOffset,
            e;
          if (a.type == CKEDITOR.NODE_ELEMENT)
            if (e = a.getChildCount(), e > c) a = a.getChild(c);
            else if (1 > e) a = a.getPreviousSourceNode();
          else {
            for (a = a.$; a.lastChild;) a = a.lastChild;
            a = new CKEDITOR.dom.node(a);
            a = a.getNextSourceNode() || a
          }
          if (b.type == CKEDITOR.NODE_ELEMENT)
            if (e =
              b.getChildCount(), e > d) b = b.getChild(d).getPreviousSourceNode(!0);
            else if (1 > e) b = b.getPreviousSourceNode();
          else {
            for (b = b.$; b.lastChild;) b = b.lastChild;
            b = new CKEDITOR.dom.node(b)
          }
          a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
          return {
            startNode: a,
            endNode: b
          }
        },
        getCommonAncestor: function(a, b) {
          var c = this.startContainer,
            d = this.endContainer,
            c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
          return b && !c.is ? c.getParent() :
            c
        },
        optimize: function() {
          var a = this.startContainer,
            b = this.startOffset;
          a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
          a = this.endContainer;
          b = this.endOffset;
          a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
        },
        optimizeBookmark: function() {
          var a = this.startContainer,
            b = this.endContainer;
          a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
          b && b.is && b.is("span") && b.data("cke-bookmark") &&
            this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
        },
        trim: function(a, b) {
          var c = this.startContainer,
            d = this.startOffset,
            e = this.collapsed;
          if ((!a || e) && c && c.type == CKEDITOR.NODE_TEXT) {
            if (d)
              if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent();
              else {
                var m = c.split(d),
                  d = c.getIndex() + 1,
                  c = c.getParent();
                this.startContainer.equals(this.endContainer) ? this.setEnd(m, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1)
              }
            else d = c.getIndex(), c = c.getParent();
            this.setStart(c, d);
            if (e) {
              this.collapse(!0);
              return
            }
          }
          c = this.endContainer;
          d = this.endOffset;
          b || e || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
        },
        enlarge: function(a, b) {
          function c(a) {
            return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a
          }
          var d = new RegExp(/[^\s\ufeff]/);
          switch (a) {
            case CKEDITOR.ENLARGE_INLINE:
              var e = 1;
            case CKEDITOR.ENLARGE_ELEMENT:
              var m = function(a, b) {
                var c = new CKEDITOR.dom.range(h);
                c.setStart(a, b);
                c.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                var c = new CKEDITOR.dom.walker(c),
                  f;
                for (c.guard = function(a) {
                    return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary())
                  }; f = c.next();) {
                  if (f.type != CKEDITOR.NODE_TEXT) return !1;
                  F = f != a ? f.getText() : f.substring(b);
                  if (d.test(F)) return !1
                }
                return !0
              };
              if (this.collapsed) break;
              var g = this.getCommonAncestor(),
                h = this.root,
                l, x, k, p, n, D = !1,
                r, F;
              r = this.startContainer;
              var B = this.startOffset;
              r.type == CKEDITOR.NODE_TEXT ? (B && (r = !CKEDITOR.tools.trim(r.substring(0, B)).length && r, D = !!r), r && ((p = r.getPrevious()) || (k = r.getParent()))) :
                (B && (p = r.getChild(B - 1) || r.getLast()), p || (k = r));
              for (k = c(k); k || p;) {
                if (k && !p) {
                  !n && k.equals(g) && (n = !0);
                  if (e ? k.isBlockBoundary() : !h.contains(k)) break;
                  D && "inline" == k.getComputedStyle("display") || (D = !1, n ? l = k : this.setStartBefore(k));
                  p = k.getPrevious()
                }
                for (; p;)
                  if (r = !1, p.type == CKEDITOR.NODE_COMMENT) p = p.getPrevious();
                  else {
                    if (p.type == CKEDITOR.NODE_TEXT) F = p.getText(), d.test(F) && (p = null), r = /[\s\ufeff]$/.test(F);
                    else if ((p.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && p.is("br")) && !p.data("cke-bookmark"))
                      if (D && CKEDITOR.dtd.$removeEmpty[p.getName()]) {
                        F =
                          p.getText();
                        if (d.test(F)) p = null;
                        else
                          for (var B = p.$.getElementsByTagName("*"), t = 0, q; q = B[t++];)
                            if (!CKEDITOR.dtd.$removeEmpty[q.nodeName.toLowerCase()]) {
                              p = null;
                              break
                            }
                        p && (r = !!F.length)
                      } else p = null;
                    r && (D ? n ? l = k : k && this.setStartBefore(k) : D = !0);
                    if (p) {
                      r = p.getPrevious();
                      if (!k && !r) {
                        k = p;
                        p = null;
                        break
                      }
                      p = r
                    } else k = null
                  }
                k && (k = c(k.getParent()))
              }
              r = this.endContainer;
              B = this.endOffset;
              k = p = null;
              n = D = !1;
              r.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(r.substring(B)).length ? D = !0 : (D = !r.getLength(), B == r.getLength() ? (p = r.getNext()) ||
                (k = r.getParent()) : m(r, B) && (k = r.getParent())) : (p = r.getChild(B)) || (k = r);
              for (; k || p;) {
                if (k && !p) {
                  !n && k.equals(g) && (n = !0);
                  if (e ? k.isBlockBoundary() : !h.contains(k)) break;
                  D && "inline" == k.getComputedStyle("display") || (D = !1, n ? x = k : k && this.setEndAfter(k));
                  p = k.getNext()
                }
                for (; p;) {
                  r = !1;
                  if (p.type == CKEDITOR.NODE_TEXT) F = p.getText(), m(p, 0) || (p = null), r = /^[\s\ufeff]/.test(F);
                  else if (p.type == CKEDITOR.NODE_ELEMENT) {
                    if ((0 < p.$.offsetWidth || b && p.is("br")) && !p.data("cke-bookmark"))
                      if (D && CKEDITOR.dtd.$removeEmpty[p.getName()]) {
                        F =
                          p.getText();
                        if (d.test(F)) p = null;
                        else
                          for (B = p.$.getElementsByTagName("*"), t = 0; q = B[t++];)
                            if (!CKEDITOR.dtd.$removeEmpty[q.nodeName.toLowerCase()]) {
                              p = null;
                              break
                            }
                        p && (r = !!F.length)
                      } else p = null
                  } else r = 1;
                  r && D && (n ? x = k : this.setEndAfter(k));
                  if (p) {
                    r = p.getNext();
                    if (!k && !r) {
                      k = p;
                      p = null;
                      break
                    }
                    p = r
                  } else k = null
                }
                k && (k = c(k.getParent()))
              }
              l && x && (g = l.contains(x) ? x : l, this.setStartBefore(g), this.setEndAfter(g));
              break;
            case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
            case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
              k = new CKEDITOR.dom.range(this.root);
              h = this.root;
              k.setStartAt(h, CKEDITOR.POSITION_AFTER_START);
              k.setEnd(this.startContainer, this.startOffset);
              k = new CKEDITOR.dom.walker(k);
              var M, S, w = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                  br: 1
                } : null),
                H = null,
                I = function(a) {
                  if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable"))
                    if (H) {
                      if (H.equals(a)) {
                        H = null;
                        return
                      }
                    } else H = a;
                  else if (H) return;
                  var b = w(a);
                  b || (M = a);
                  return b
                },
                e = function(a) {
                  var b = I(a);
                  !b && a.is && a.is("br") && (S = a);
                  return b
                };
              k.guard = I;
              k = k.lastBackward();
              M = M || h;
              this.setStartAt(M, !M.is("br") && (!k && this.checkStartOfBlock() || k && M.contains(k)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
              if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                k = this.clone();
                k = new CKEDITOR.dom.walker(k);
                var G = CKEDITOR.dom.walker.whitespaces(),
                  J = CKEDITOR.dom.walker.bookmark();
                k.evaluator = function(a) {
                  return !G(a) && !J(a)
                };
                if ((k = k.previous()) && k.type == CKEDITOR.NODE_ELEMENT && k.is("br")) break
              }
              k = this.clone();
              k.collapse();
              k.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
              k = new CKEDITOR.dom.walker(k);
              k.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? e : I;
              M = H = S = null;
              k = k.lastForward();
              M = M || h;
              this.setEndAt(M, !k && this.checkEndOfBlock() || k && M.contains(k) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
              S && this.setEndAfter(S)
          }
        },
        shrink: function(a, b, c) {
          if (!this.collapsed) {
            a = a || CKEDITOR.SHRINK_TEXT;
            var d = this.clone(),
              e = this.startContainer,
              m = this.endContainer,
              g = this.startOffset,
              h = this.endOffset,
              l = 1,
              x = 1;
            e && e.type == CKEDITOR.NODE_TEXT && (g ? g >= e.getLength() ? d.setStartAfter(e) : (d.setStartBefore(e), l =
              0) : d.setStartBefore(e));
            m && m.type == CKEDITOR.NODE_TEXT && (h ? h >= m.getLength() ? d.setEndAfter(m) : (d.setEndAfter(m), x = 0) : d.setEndBefore(m));
            var d = new CKEDITOR.dom.walker(d),
              k = CKEDITOR.dom.walker.bookmark();
            d.evaluator = function(b) {
              return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
            };
            var p;
            d.guard = function(b, d) {
              if (k(b)) return !0;
              if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(p) || !1 === c && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT &&
                b.hasAttribute("contenteditable")) return !1;
              d || b.type != CKEDITOR.NODE_ELEMENT || (p = b);
              return !0
            };
            l && (e = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(e, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
            x && (d.reset(), (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
            return !(!l && !x)
          }
        },
        insertNode: function(a) {
          this.optimizeBookmark();
          this.trim(!1, !0);
          var b = this.startContainer,
            c = b.getChild(this.startOffset);
          c ? a.insertBefore(c) : b.append(a);
          a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
          this.setStartBefore(a)
        },
        moveToPosition: function(a, b) {
          this.setStartAt(a, b);
          this.collapse(!0)
        },
        moveToRange: function(a) {
          this.setStart(a.startContainer, a.startOffset);
          this.setEnd(a.endContainer, a.endOffset)
        },
        selectNodeContents: function(a) {
          this.setStart(a, 0);
          this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
        },
        setStart: function(b, c) {
          b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] &&
            (c = b.getIndex(), b = b.getParent());
          this._setStartContainer(b);
          this.startOffset = c;
          this.endContainer || (this._setEndContainer(b), this.endOffset = c);
          a(this)
        },
        setEnd: function(b, c) {
          b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent());
          this._setEndContainer(b);
          this.endOffset = c;
          this.startContainer || (this._setStartContainer(b), this.startOffset = c);
          a(this)
        },
        setStartAfter: function(a) {
          this.setStart(a.getParent(), a.getIndex() + 1)
        },
        setStartBefore: function(a) {
          this.setStart(a.getParent(),
            a.getIndex())
        },
        setEndAfter: function(a) {
          this.setEnd(a.getParent(), a.getIndex() + 1)
        },
        setEndBefore: function(a) {
          this.setEnd(a.getParent(), a.getIndex())
        },
        setStartAt: function(b, c) {
          switch (c) {
            case CKEDITOR.POSITION_AFTER_START:
              this.setStart(b, 0);
              break;
            case CKEDITOR.POSITION_BEFORE_END:
              b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
              break;
            case CKEDITOR.POSITION_BEFORE_START:
              this.setStartBefore(b);
              break;
            case CKEDITOR.POSITION_AFTER_END:
              this.setStartAfter(b)
          }
          a(this)
        },
        setEndAt: function(b, c) {
          switch (c) {
            case CKEDITOR.POSITION_AFTER_START:
              this.setEnd(b, 0);
              break;
            case CKEDITOR.POSITION_BEFORE_END:
              b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
              break;
            case CKEDITOR.POSITION_BEFORE_START:
              this.setEndBefore(b);
              break;
            case CKEDITOR.POSITION_AFTER_END:
              this.setEndAfter(b)
          }
          a(this)
        },
        fixBlock: function(a, b) {
          var c = this.createBookmark(),
            d = this.document.createElement(b);
          this.collapse(a);
          this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
          this.extractContents().appendTo(d);
          d.trim();
          this.insertNode(d);
          var e = d.getBogus();
          e && e.remove();
          d.appendBogus();
          this.moveToBookmark(c);
          return d
        },
        splitBlock: function(a, b) {
          var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
            d = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
            e = c.block,
            m = d.block,
            g = null;
          if (!c.blockLimit.equals(d.blockLimit)) return null;
          "br" != a && (e || (e = this.fixBlock(!0, a), m = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), m || (m = this.fixBlock(!1, a)));
          c = e && this.checkStartOfBlock();
          d = m && this.checkEndOfBlock();
          this.deleteContents();
          e && e.equals(m) && (d ? (g = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(m, CKEDITOR.POSITION_AFTER_END), m = null) : c ? (g = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e = null) : (m = this.splitElement(e, b || !1), e.is("ul", "ol") || e.appendBogus()));
          return {
            previousBlock: e,
            nextBlock: m,
            wasStartOfBlock: c,
            wasEndOfBlock: d,
            elementPath: g
          }
        },
        splitElement: function(a, b) {
          if (!this.collapsed) return null;
          this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
          var c = this.extractContents(!1, b || !1),
            d = a.clone(!1, b || !1);
          c.appendTo(d);
          d.insertAfter(a);
          this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
          return d
        },
        removeEmptyBlocksAtEnd: function() {
          function a(d) {
            return function(a) {
              return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || d.is("table") && a.is("caption") ? !1 : !0
            }
          }
          var b = CKEDITOR.dom.walker.whitespaces(),
            c = CKEDITOR.dom.walker.bookmark(!1);
          return function(b) {
            for (var c = this.createBookmark(),
                d = this[b ? "endPath" : "startPath"](), e = d.block || d.blockLimit, g; e && !e.equals(d.root) && !e.getFirst(a(e));) g = e.getParent(), this[b ? "setEndAt" : "setStartAt"](e, CKEDITOR.POSITION_AFTER_END), e.remove(1), e = g;
            this.moveToBookmark(c)
          }
        }(),
        startPath: function() {
          return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
        },
        endPath: function() {
          return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
        },
        checkBoundaryOfElement: function(a, b) {
          var d = b == CKEDITOR.START,
            e = this.clone();
          e.collapse(d);
          e[d ? "setStartAt" :
            "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
          e = new CKEDITOR.dom.walker(e);
          e.evaluator = c(d);
          return e[d ? "checkBackward" : "checkForward"]()
        },
        checkStartOfBlock: function() {
          var a = this.startContainer,
            c = this.startOffset;
          CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), l.test(a) && this.trim(0, 1));
          this.trim();
          a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
          c = this.clone();
          c.collapse(!0);
          c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
          a = new CKEDITOR.dom.walker(c);
          a.evaluator = b();
          return a.checkBackward()
        },
        checkEndOfBlock: function() {
          var a = this.endContainer,
            c = this.endOffset;
          CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), l.test(a) && this.trim(1, 0));
          this.trim();
          a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
          c = this.clone();
          c.collapse(!1);
          c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
          a = new CKEDITOR.dom.walker(c);
          a.evaluator = b();
          return a.checkForward()
        },
        getPreviousNode: function(a,
          b, c) {
          var d = this.clone();
          d.collapse(1);
          d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
          c = new CKEDITOR.dom.walker(d);
          c.evaluator = a;
          c.guard = b;
          return c.previous()
        },
        getNextNode: function(a, b, c) {
          var d = this.clone();
          d.collapse();
          d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
          c = new CKEDITOR.dom.walker(d);
          c.evaluator = a;
          c.guard = b;
          return c.next()
        },
        checkReadOnly: function() {
          function a(b, c) {
            for (; b;) {
              if (b.type == CKEDITOR.NODE_ELEMENT) {
                if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0;
                if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break
              }
              b = b.getParent()
            }
            return 1
          }
          return function() {
            var b = this.startContainer,
              c = this.endContainer;
            return !(a(b, c) && a(c, b))
          }
        }(),
        moveToElementEditablePosition: function(a, b) {
          if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
          for (var c = 0; a;) {
            if (a.type == CKEDITOR.NODE_TEXT) {
              b && this.endContainer && this.checkEndOfBlock() && l.test(a.getText()) ?
                this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
              c = 1;
              break
            }
            if (a.type == CKEDITOR.NODE_ELEMENT)
              if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1;
              else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
            else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a),
              this.setEndAfter(a), !0;
            var d = a,
              e = c,
              m = void 0;
            d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (m = d[b ? "getLast" : "getFirst"](t));
            e || m || (m = d[b ? "getPrevious" : "getNext"](t));
            a = m
          }
          return !!c
        },
        moveToClosestEditablePosition: function(a, b) {
          var c, d = 0,
            e, m, g = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
          a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, g[b ? 0 : 1])) : c = this.clone();
          if (a && !a.is(CKEDITOR.dtd.$block)) d = 1;
          else if (e = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (m = e.type ==
            CKEDITOR.NODE_ELEMENT) && e.is(CKEDITOR.dtd.$block) && "false" == e.getAttribute("contenteditable") ? (c.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(e, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && m && e.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(e, 0), c.collapse()) : c.moveToPosition(e, g[b ? 1 : 0]);
          d && this.moveToRange(c);
          return !!d
        },
        moveToElementEditStart: function(a) {
          return this.moveToElementEditablePosition(a)
        },
        moveToElementEditEnd: function(a) {
          return this.moveToElementEditablePosition(a, !0)
        },
        getEnclosedNode: function() {
          var a = this.clone();
          a.optimize();
          if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
          var a = new CKEDITOR.dom.walker(a),
            b = CKEDITOR.dom.walker.bookmark(!1, !0),
            c = CKEDITOR.dom.walker.whitespaces(!0);
          a.evaluator = function(a) {
            return c(a) && b(a)
          };
          var d = a.next();
          a.reset();
          return d && d.equals(a.previous()) ? d : null
        },
        getTouchedStartNode: function() {
          var a = this.startContainer;
          return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) ||
            a
        },
        getTouchedEndNode: function() {
          var a = this.endContainer;
          return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
        },
        getNextEditableNode: e(),
        getPreviousEditableNode: e(1),
        scrollIntoView: function() {
          var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document),
            b, c, d, e = this.clone();
          e.optimize();
          (d = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = e.startContainer.getText(), b = e.startContainer.split(e.startOffset), a.insertAfter(e.startContainer)) :
          e.insertNode(a);
          a.scrollIntoView();
          d && (e.startContainer.setText(c), b.remove());
          a.remove()
        },
        _setStartContainer: function(a) {
          this.startContainer = a
        },
        _setEndContainer: function(a) {
          this.endContainer = a
        }
      }
    })();
    CKEDITOR.POSITION_AFTER_START = 1;
    CKEDITOR.POSITION_BEFORE_END = 2;
    CKEDITOR.POSITION_BEFORE_START = 3;
    CKEDITOR.POSITION_AFTER_END = 4;
    CKEDITOR.ENLARGE_ELEMENT = 1;
    CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2;
    CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3;
    CKEDITOR.ENLARGE_INLINE = 4;
    CKEDITOR.START = 1;
    CKEDITOR.END = 2;
    CKEDITOR.SHRINK_ELEMENT = 1;
    CKEDITOR.SHRINK_TEXT = 2;
    "use strict";
    (function() {
      function a(a) {
        1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
      }

      function d(a) {
        var b = [];
        a.forEach(function(a) {
          if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1
        }, CKEDITOR.NODE_ELEMENT, !0);
        return b
      }

      function b(a, c, e, g) {
        a: {
          null == g && (g = d(e));
          for (var h; h = g.shift();)
            if (h.getDtd().p) {
              g = {
                element: h,
                remaining: g
              };
              break a
            }
          g = null
        }
        if (!g) return 0;
        if ((h = CKEDITOR.filter.instances[g.element.data("cke-filter")]) && !h.check(c)) return b(a,
          c, e, g.remaining);c = new CKEDITOR.dom.range(g.element);c.selectNodeContents(g.element);c = c.createIterator();c.enlargeBr = a.enlargeBr;c.enforceRealBlocks = a.enforceRealBlocks;c.activeFilter = c.filter = h;a._.nestedEditable = {
          element: g.element,
          container: e,
          remaining: g.remaining,
          iterator: c
        };
        return 1
      }

      function c(a, b, c) {
        if (!b) return !1;
        a = a.clone();
        a.collapse(!c);
        return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END)
      }
      var e = /^[\r\n\t ]+$/,
        g = CKEDITOR.dom.walker.bookmark(!1, !0),
        h = CKEDITOR.dom.walker.whitespaces(!0),
        l = function(a) {
          return g(a) && h(a)
        },
        q = {
          dd: 1,
          dt: 1,
          li: 1
        };
      a.prototype = {
        getNextParagraph: function(a) {
          var d, h, A, u, C;
          a = a || "p";
          if (this._.nestedEditable) {
            if (d = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, d;
            this.activeFilter = this.filter;
            if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a);
            this._.nestedEditable =
              null
          }
          if (!this.range.root.getDtd()[a]) return null;
          if (!this._.started) {
            var m = this.range.clone();
            h = m.startPath();
            var y = m.endPath(),
              E = !m.collapsed && c(m, h.block),
              v = !m.collapsed && c(m, y.block, 1);
            m.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
            E && m.setStartAt(h.block, CKEDITOR.POSITION_BEFORE_END);
            v && m.setEndAt(y.block, CKEDITOR.POSITION_AFTER_START);
            h = m.endContainer.hasAscendant("pre", !0) || m.startContainer.hasAscendant("pre", !0);
            m.enlarge(this.forceBrBreak && !h || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
            m.collapsed || (h = new CKEDITOR.dom.walker(m.clone()), y = CKEDITOR.dom.walker.bookmark(!0, !0), h.evaluator = y, this._.nextNode = h.next(), h = new CKEDITOR.dom.walker(m.clone()), h.evaluator = y, h = h.previous(), this._.lastNode = h.getNextSourceNode(!0, null, m.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (y = this.range.clone(), y.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), y.checkEndOfBlock() &&
              (y = new CKEDITOR.dom.elementPath(y.endContainer, y.root), this._.lastNode = (y.block || y.blockLimit).getNextSourceNode(!0))), this._.lastNode && m.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = m.document.createText(""), this._.lastNode.insertAfter(h)), m = null);
            this._.started = 1;
            h = m
          }
          y = this._.nextNode;
          m = this._.lastNode;
          for (this._.nextNode = null; y;) {
            var E = 0,
              v = y.hasAscendant("pre"),
              x = y.type != CKEDITOR.NODE_ELEMENT,
              k = 0;
            if (x) y.type == CKEDITOR.NODE_TEXT && e.test(y.getText()) && (x = 0);
            else {
              var p = y.getName();
              if (CKEDITOR.dtd.$block[p] && "false" == y.getAttribute("contenteditable")) {
                d = y;
                b(this, a, d);
                break
              } else if (y.isBlockBoundary(this.forceBrBreak && !v && {
                  br: 1
                })) {
                if ("br" == p) x = 1;
                else if (!h && !y.getChildCount() && "hr" != p) {
                  d = y;
                  A = y.equals(m);
                  break
                }
                h && (h.setEndAt(y, CKEDITOR.POSITION_BEFORE_START), "br" != p && (this._.nextNode = y));
                E = 1
              } else {
                if (y.getFirst()) {
                  h || (h = this.range.clone(), h.setStartAt(y, CKEDITOR.POSITION_BEFORE_START));
                  y = y.getFirst();
                  continue
                }
                x = 1
              }
            }
            x && !h && (h = this.range.clone(), h.setStartAt(y, CKEDITOR.POSITION_BEFORE_START));
            A = (!E || x) && y.equals(m);
            if (h && !E)
              for (; !y.getNext(l) && !A;) {
                p = y.getParent();
                if (p.isBlockBoundary(this.forceBrBreak && !v && {
                    br: 1
                  })) {
                  E = 1;
                  x = 0;
                  A || p.equals(m);
                  h.setEndAt(p, CKEDITOR.POSITION_BEFORE_END);
                  break
                }
                y = p;
                x = 1;
                A = y.equals(m);
                k = 1
              }
            x && h.setEndAt(y, CKEDITOR.POSITION_AFTER_END);
            y = this._getNextSourceNode(y, k, m);
            if ((A = !y) || E && h) break
          }
          if (!d) {
            if (!h) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
            d = new CKEDITOR.dom.elementPath(h.startContainer, h.root);
            y = d.blockLimit;
            E = {
              div: 1,
              th: 1,
              td: 1
            };
            d = d.block;
            !d && y && !this.enforceRealBlocks && E[y.getName()] && h.checkStartOfBlock() && h.checkEndOfBlock() && !y.equals(h.root) ? d = y : !d || this.enforceRealBlocks && d.is(q) ? (d = this.range.document.createElement(a), h.extractContents().appendTo(d), d.trim(), h.insertNode(d), u = C = !0) : "li" != d.getName() ? h.checkStartOfBlock() && h.checkEndOfBlock() || (d = d.clone(!1), h.extractContents().appendTo(d), d.trim(), C = h.splitBlock(), u = !C.wasStartOfBlock, C = !C.wasEndOfBlock, h.insertNode(d)) : A || (this._.nextNode = d.equals(m) ? null : this._getNextSourceNode(h.getBoundaryNodes().endNode,
              1, m))
          }
          u && (u = d.getPrevious()) && u.type == CKEDITOR.NODE_ELEMENT && ("br" == u.getName() ? u.remove() : u.getLast() && "br" == u.getLast().$.nodeName.toLowerCase() && u.getLast().remove());
          C && (u = d.getLast()) && u.type == CKEDITOR.NODE_ELEMENT && "br" == u.getName() && (!CKEDITOR.env.needsBrFiller || u.getPrevious(g) || u.getNext(g)) && u.remove();
          this._.nextNode || (this._.nextNode = A || d.equals(m) || !m ? null : this._getNextSourceNode(d, 1, m));
          return d
        },
        _getNextSourceNode: function(a, b, c) {
          function d(a) {
            return !(a.equals(c) || a.equals(e))
          }
          var e =
            this.range.root;
          for (a = a.getNextSourceNode(b, null, d); !g(a);) a = a.getNextSourceNode(b, null, d);
          return a
        }
      };
      CKEDITOR.dom.range.prototype.createIterator = function() {
        return new a(this)
      }
    })();
    CKEDITOR.command = function(a, d) {
      this.uiItems = [];
      this.exec = function(b) {
        if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1;
        this.editorFocus && a.focus();
        return !1 === this.fire("exec") ? !0 : !1 !== d.exec.call(this, a, b)
      };
      this.refresh = function(a, b) {
        if (!this.readOnly && a.readOnly) return !0;
        if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0;
        this.startDisabled || this.enable();
        this.modes && !this.modes[a.mode] && this.disable();
        return !1 === this.fire("refresh", {
          editor: a,
          path: b
        }) ? !0 : d.refresh && !1 !== d.refresh.apply(this, arguments)
      };
      var b;
      this.checkAllowed = function(c) {
        return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b
      };
      CKEDITOR.tools.extend(this, d, {
        modes: {
          wysiwyg: 1
        },
        editorFocus: 1,
        contextSensitive: !!d.context,
        state: CKEDITOR.TRISTATE_DISABLED
      });
      CKEDITOR.event.call(this)
    };
    CKEDITOR.command.prototype = {
      enable: function() {
        this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF)
      },
      disable: function() {
        this.setState(CKEDITOR.TRISTATE_DISABLED)
      },
      setState: function(a) {
        if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1;
        this.previousState = this.state;
        this.state = a;
        this.fire("state");
        return !0
      },
      toggleState: function() {
        this.state == CKEDITOR.TRISTATE_OFF ?
          this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
      }
    };
    CKEDITOR.event.implementOn(CKEDITOR.command.prototype);
    CKEDITOR.ENTER_P = 1;
    CKEDITOR.ENTER_BR = 2;
    CKEDITOR.ENTER_DIV = 3;
    CKEDITOR.config = {
      customConfig: "config.js",
      autoUpdateElement: !0,
      language: "",
      defaultLanguage: "en",
      contentsLangDirection: "",
      enterMode: CKEDITOR.ENTER_P,
      forceEnterMode: !1,
      shiftEnterMode: CKEDITOR.ENTER_BR,
      docType: "\x3c!DOCTYPE html\x3e",
      bodyId: "",
      bodyClass: "",
      fullPage: !1,
      height: 200,
      contentsCss: CKEDITOR.getUrl("contents.css"),
      extraPlugins: "",
      removePlugins: "",
      protectedSource: [],
      tabIndex: 0,
      width: "",
      baseFloatZIndex: 1E4,
      blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    };
    (function() {
      function a(a, b, c, d, e) {
        var k, p;
        a = [];
        for (k in b) {
          p = b[k];
          p = "boolean" == typeof p ? {} : "function" == typeof p ? {
            match: p
          } : L(p);
          "$" != k.charAt(0) && (p.elements = k);
          c && (p.featureName = c.toLowerCase());
          var n = p;
          n.elements = h(n.elements, /\s+/) || null;
          n.propertiesOnly = n.propertiesOnly || !0 === n.elements;
          var r = /\s*,\s*/,
            m = void 0;
          for (m in S) {
            n[m] = h(n[m], r) || null;
            var G = n,
              f = w[m],
              x = h(n[w[m]], r),
              g = n[m],
              D = [],
              F = !0,
              J = void 0;
            x ? F = !1 : x = {};
            for (J in g) "!" == J.charAt(0) && (J = J.slice(1), D.push(J), x[J] = !0, F = !1);
            for (; J = D.pop();) g[J] =
              g["!" + J], delete g["!" + J];
            G[f] = (F ? !1 : x) || null
          }
          n.match = n.match || null;
          d.push(p);
          a.push(p)
        }
        b = e.elements;
        e = e.generic;
        var l;
        c = 0;
        for (d = a.length; c < d; ++c) {
          k = L(a[c]);
          p = !0 === k.classes || !0 === k.styles || !0 === k.attributes;
          n = k;
          m = f = r = void 0;
          for (r in S) n[r] = E(n[r]);
          G = !0;
          for (m in w) {
            r = w[m];
            f = n[r];
            x = [];
            g = void 0;
            for (g in f) - 1 < g.indexOf("*") ? x.push(new RegExp("^" + g.replace(/\*/g, ".*") + "$")) : x.push(g);
            f = x;
            f.length && (n[r] = f, G = !1)
          }
          n.nothingRequired = G;
          n.noProperties = !(n.attributes || n.classes || n.styles);
          if (!0 === k.elements ||
            null === k.elements) e[p ? "unshift" : "push"](k);
          else
            for (l in n = k.elements, delete k.elements, n)
              if (b[l]) b[l][p ? "unshift" : "push"](k);
              else b[l] = [k]
        }
      }

      function d(a, c, d, k) {
        if (!a.match || a.match(c))
          if (k || l(a, c))
            if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), d.allStyles || (d.allStyles = b(a.styles, c.styles, d.validStyles)), !d.allClasses) {
              a = a.classes;
              c = c.classes;
              k = d.validClasses;
              if (a)
                if (!0 === a) a = !0;
                else {
                  for (var e = 0, p = c.length, n; e < p; ++e) n = c[e], k[n] ||
                    (k[n] = a(n));
                  a = !1
                }
              else a = !1;
              d.allClasses = a
            }
      }

      function b(a, b, c) {
        if (!a) return !1;
        if (!0 === a) return !0;
        for (var d in b) c[d] || (c[d] = a(d));
        return !1
      }

      function c(a, b, c) {
        if (!a.match || a.match(b)) {
          if (a.noProperties) return !1;
          c.hadInvalidAttribute = e(a.attributes, b.attributes) || c.hadInvalidAttribute;
          c.hadInvalidStyle = e(a.styles, b.styles) || c.hadInvalidStyle;
          a = a.classes;
          b = b.classes;
          if (a) {
            for (var d = !1, k = !0 === a, p = b.length; p--;)
              if (k || a(b[p])) b.splice(p, 1), d = !0;
            a = d
          } else a = !1;
          c.hadInvalidClass = a || c.hadInvalidClass
        }
      }

      function e(a,
        b) {
        if (!a) return !1;
        var c = !1,
          d = !0 === a,
          k;
        for (k in b)
          if (d || a(k)) delete b[k], c = !0;
        return c
      }

      function g(a, b, c) {
        if (a.disabled || a.customConfig && !c || !b) return !1;
        a._.cachedChecks = {};
        return !0
      }

      function h(a, b) {
        if (!a) return !1;
        if (!0 === a) return a;
        if ("string" == typeof a) return a = T(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
        if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1;
        var c = {},
          d = 0,
          k;
        for (k in a) c[k] = a[k], d++;
        return d ? c : !1
      }

      function l(a, b) {
        if (a.nothingRequired) return !0;
        var c, d, k, p;
        if (k = a.requiredClasses)
          for (p = b.classes, c = 0; c < k.length; ++c)
            if (d = k[c], "string" == typeof d) {
              if (-1 == CKEDITOR.tools.indexOf(p, d)) return !1
            } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(p, d)) return !1;
        return q(b.styles, a.requiredStyles) && q(b.attributes, a.requiredAttributes)
      }

      function q(a, b) {
        if (!b) return !0;
        for (var c = 0, d; c < b.length; ++c)
          if (d = b[c], "string" == typeof d) {
            if (!(d in a)) return !1
          } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1;
        return !0
      }

      function t(a) {
        if (!a) return {};
        a = a.split(/\s*,\s*/).sort();
        for (var b = {}; a.length;) b[a.shift()] = "cke-test";
        return b
      }

      function f(a) {
        var b, c, d, k, p = {},
          e = 1;
        for (a = T(a); b = a.match(H);)(c = b[2]) ? (d = z(c, "styles"), k = z(c, "attrs"), c = z(c, "classes")) : d = k = c = null, p["$" + e++] = {
          elements: b[1],
          classes: c,
          styles: d,
          attributes: k
        }, a = a.slice(b[0].length);
        return p
      }

      function z(a, b) {
        var c = a.match(I[b]);
        return c ? T(c[1]) : null
      }

      function A(a) {
        var b = a.styleBackup = a.attributes.style,
          c = a.classBackup = a.attributes["class"];
        a.styles || (a.styles = CKEDITOR.tools.parseCssText(b ||
          "", 1));
        a.classes || (a.classes = c ? c.split(/\s+/) : [])
      }

      function u(a, b, k, e) {
        var n = 0,
          r;
        e.toHtml && (b.name = b.name.replace(G, "$1"));
        if (e.doCallbacks && a.elementCallbacks) {
          a: {
            r = a.elementCallbacks;
            for (var f = 0, x = r.length, g; f < x; ++f)
              if (g = r[f](b)) {
                r = g;
                break a
              }
            r = void 0
          }
          if (r) return r
        }
        if (e.doTransform && (r = a._.transformations[b.name])) {
          A(b);
          for (f = 0; f < r.length; ++f) p(a, b, r[f]);
          m(b)
        }
        if (e.doFilter) {
          a: {
            f = b.name;x = a._;a = x.allowedRules.elements[f];r = x.allowedRules.generic;f = x.disallowedRules.elements[f];x = x.disallowedRules.generic;
            g = e.skipRequired;
            var D = {
                valid: !1,
                validAttributes: {},
                validClasses: {},
                validStyles: {},
                allAttributes: !1,
                allClasses: !1,
                allStyles: !1,
                hadInvalidAttribute: !1,
                hadInvalidClass: !1,
                hadInvalidStyle: !1
              },
              w, h;
            if (a || r) {
              A(b);
              if (f)
                for (w = 0, h = f.length; w < h; ++w)
                  if (!1 === c(f[w], b, D)) {
                    a = null;
                    break a
                  }
              if (x)
                for (w = 0, h = x.length; w < h; ++w) c(x[w], b, D);
              if (a)
                for (w = 0, h = a.length; w < h; ++w) d(a[w], b, D, g);
              if (r)
                for (w = 0, h = r.length; w < h; ++w) d(r[w], b, D, g);
              a = D
            } else a = null
          }
          if (!a || !a.valid) return k.push(b), 1;h = a.validAttributes;
          var F = a.validStyles;
          r = a.validClasses;
          var f = b.attributes,
            l = b.styles,
            x = b.classes;g = b.classBackup;
          var I = b.styleBackup,
            B, H, O = [],
            D = [],
            L = /^data-cke-/;w = !1;delete f.style;delete f["class"];delete b.classBackup;delete b.styleBackup;
          if (!a.allAttributes)
            for (B in f) h[B] || (L.test(B) ? B == (H = B.replace(/^data-cke-saved-/, "")) || h[H] || (delete f[B], w = !0) : (delete f[B], w = !0));
          if (!a.allStyles || a.hadInvalidStyle) {
            for (B in l) a.allStyles || F[B] ? O.push(B + ":" + l[B]) : w = !0;
            O.length && (f.style = O.sort().join("; "))
          } else I && (f.style = I);
          if (!a.allClasses ||
            a.hadInvalidClass) {
            for (B = 0; B < x.length; ++B)(a.allClasses || r[x[B]]) && D.push(x[B]);
            D.length && (f["class"] = D.sort().join(" "));
            g && D.length < g.split(/\s+/).length && (w = !0)
          } else g && (f["class"] = g);w && (n = 1);
          if (!e.skipFinalValidation && !y(b)) return k.push(b), 1
        }
        e.toHtml && (b.name = b.name.replace(J, "cke:$1"));
        return n
      }

      function C(a) {
        var b = [],
          c;
        for (c in a) - 1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*"));
        return b.length ? new RegExp("^(?:" + b.join("|") + ")$") : null
      }

      function m(a) {
        var b = a.attributes,
          c;
        delete b.style;
        delete b["class"];
        if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c;
        a.classes.length && (b["class"] = a.classes.sort().join(" "))
      }

      function y(a) {
        switch (a.name) {
          case "a":
            if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1;
            break;
          case "img":
            if (!a.attributes.src) return !1
        }
        return !0
      }

      function E(a) {
        if (!a) return !1;
        if (!0 === a) return !0;
        var b = C(a);
        return function(c) {
          return c in a || b && c.match(b)
        }
      }

      function v() {
        return new CKEDITOR.htmlParser.element("br")
      }

      function x(a) {
        return a.type == CKEDITOR.NODE_ELEMENT && ("br" ==
          a.name || B.$block[a.name])
      }

      function k(a, b, c) {
        var d = a.name;
        if (B.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(v()) : (a.parent && c.push({
          check: "it",
          el: a.parent
        }), a.remove());
        else if (B.$block[d] || "tr" == d)
          if ("br" == b) a.previous && !x(a.previous) && (b = v(), b.insertBefore(a)), a.next && !x(a.next) && (b = v(), b.insertAfter(a)), a.replaceWithChildren();
          else {
            var d = a.children,
              k;
            b: {
              k = B[b];
              for (var e = 0, p = d.length, n; e < p; ++e)
                if (n = d[e], n.type == CKEDITOR.NODE_ELEMENT && !k[n.name]) {
                  k = !1;
                  break b
                }
              k = !0
            }
            if (k) a.name = b, a.attributes = {}, c.push({
              check: "parent-down",
              el: a
            });
            else {
              k = a.parent;
              for (var e = k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == k.name, r, f, p = d.length; 0 < p;) n = d[--p], e && (n.type == CKEDITOR.NODE_TEXT || n.type == CKEDITOR.NODE_ELEMENT && B.$inline[n.name]) ? (r || (r = new CKEDITOR.htmlParser.element(b), r.insertAfter(a), c.push({
                check: "parent-down",
                el: r
              })), r.add(n, 0)) : (r = null, f = B[k.name] || B.span, n.insertAfter(a), k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n.type != CKEDITOR.NODE_ELEMENT || f[n.name] || c.push({
                check: "el-up",
                el: n
              }));
              a.remove()
            }
          }
        else d in {
          style: 1,
          script: 1
        } ? a.remove() : (a.parent && c.push({
          check: "it",
          el: a.parent
        }), a.replaceWithChildren())
      }

      function p(a, b, c) {
        var d, k;
        for (d = 0; d < c.length; ++d)
          if (k = c[d], !(k.check && !a.check(k.check, !1) || k.left && !k.left(b))) {
            k.right(b, O);
            break
          }
      }

      function n(a, b) {
        var c = b.getDefinition(),
          d = c.attributes,
          k = c.styles,
          e, p, n, r;
        if (a.name != c.element) return !1;
        for (e in d)
          if ("class" == e)
            for (c = d[e].split(/\s+/), n = a.classes.join("|"); r = c.pop();) {
              if (-1 == n.indexOf(r)) return !1
            } else if (a.attributes[e] != d[e]) return !1;
        for (p in k)
          if (a.styles[p] !=
            k[p]) return !1;
        return !0
      }

      function D(a, b) {
        var c, d;
        "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]);
        return [{
          element: c,
          left: d,
          right: function(a, c) {
            c.transform(a, b)
          }
        }]
      }

      function r(a) {
        return function(b) {
          return n(b, a)
        }
      }

      function F(a) {
        return function(b, c) {
          c[a](b)
        }
      }
      var B = CKEDITOR.dtd,
        L = CKEDITOR.tools.copy,
        T = CKEDITOR.tools.trim,
        M = ["", "p", "br", "div"];
      CKEDITOR.FILTER_SKIP_TREE = 2;
      CKEDITOR.filter = function(a) {
        this.allowedContent = [];
        this.disallowedContent = [];
        this.elementCallbacks = null;
        this.disabled = !1;
        this.editor = null;
        this.id = CKEDITOR.tools.getNextNumber();
        this._ = {
          allowedRules: {
            elements: {},
            generic: []
          },
          disallowedRules: {
            elements: {},
            generic: []
          },
          transformations: {},
          cachedTests: {}
        };
        CKEDITOR.filter.instances[this.id] = this;
        if (a instanceof CKEDITOR.editor) {
          a = this.editor = a;
          this.customConfig = !0;
          var b = a.config.allowedContent;
          !0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(M[a.enterMode] + " " + M[a.shiftEnterMode], "default",
            1), this.disallow(a.config.disallowedContent))
        } else this.customConfig = !1, this.allow(a, "default", 1)
      };
      CKEDITOR.filter.instances = {};
      CKEDITOR.filter.prototype = {
        allow: function(b, c, d) {
          if (!g(this, b, d)) return !1;
          var k, e;
          if ("string" == typeof b) b = f(b);
          else if (b instanceof CKEDITOR.style) {
            if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d);
            k = b.getDefinition();
            b = {};
            d = k.attributes;
            b[k.element] = k = {
              styles: k.styles,
              requiredStyles: k.styles && CKEDITOR.tools.objectKeys(k.styles)
            };
            d && (d =
              L(d), k.classes = d["class"] ? d["class"].split(/\s+/) : null, k.requiredClasses = k.classes, delete d["class"], k.attributes = d, k.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
          } else if (CKEDITOR.tools.isArray(b)) {
            for (k = 0; k < b.length; ++k) e = this.allow(b[k], c, d);
            return e
          }
          a(this, b, c, this.allowedContent, this._.allowedRules);
          return !0
        },
        applyTo: function(a, b, c, d) {
          if (this.disabled) return !1;
          var e = this,
            p = [],
            n = this.editor && this.editor.config.protectedSource,
            r, f = !1,
            m = {
              doFilter: !c,
              doTransform: !0,
              doCallbacks: !0,
              toHtml: b
            };
          a.forEach(function(a) {
            if (a.type == CKEDITOR.NODE_ELEMENT) {
              if ("off" == a.attributes["data-cke-filter"]) return !1;
              if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))
                if (r = u(e, a, p, m), r & 1) f = !0;
                else if (r & 2) return !1
            } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
              var c;
              a: {
                var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));c = [];
                var k, x, g;
                if (n)
                  for (x = 0; x < n.length; ++x)
                    if ((g = d.match(n[x])) && g[0].length == d.length) {
                      c = !0;
                      break a
                    }
                d = CKEDITOR.htmlParser.fragment.fromHtml(d);1 == d.children.length && (k = d.children[0]).type == CKEDITOR.NODE_ELEMENT && u(e, k, c, m);c = !c.length
              }
              c || p.push(a)
            }
          }, null, !0);
          p.length && (f = !0);
          var x;
          a = [];
          d = M[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
          for (var g; c = p.pop();) c.type == CKEDITOR.NODE_ELEMENT ? k(c, d, a) : c.remove();
          for (; x = a.pop();)
            if (c = x.el, c.parent) switch (g = B[c.parent.name] || B.span, x.check) {
              case "it":
                B.$removeEmpty[c.name] && !c.children.length ? k(c, d, a) : y(c) || k(c, d, a);
                break;
              case "el-up":
                c.parent.type ==
                  CKEDITOR.NODE_DOCUMENT_FRAGMENT || g[c.name] || k(c, d, a);
                break;
              case "parent-down":
                c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || g[c.name] || k(c.parent, d, a)
            }
            return f
        },
        checkFeature: function(a) {
          if (this.disabled || !a) return !0;
          a.toFeature && (a = a.toFeature(this.editor));
          return !a.requiredContent || this.check(a.requiredContent)
        },
        disable: function() {
          this.disabled = !0
        },
        disallow: function(b) {
          if (!g(this, b, !0)) return !1;
          "string" == typeof b && (b = f(b));
          a(this, b, null, this.disallowedContent, this._.disallowedRules);
          return !0
        },
        addContentForms: function(a) {
          if (!this.disabled && a) {
            var b, c, d = [],
              k;
            for (b = 0; b < a.length && !k; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (k = c);
            if (k) {
              for (b = 0; b < a.length; ++b) d.push(D(a[b], k));
              this.addTransformations(d)
            }
          }
        },
        addElementCallback: function(a) {
          this.elementCallbacks || (this.elementCallbacks = []);
          this.elementCallbacks.push(a)
        },
        addFeature: function(a) {
          if (this.disabled || !a) return !0;
          a.toFeature && (a = a.toFeature(this.editor));
          this.allow(a.allowedContent, a.name);
          this.addTransformations(a.contentTransformations);
          this.addContentForms(a.contentForms);
          return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
        },
        addTransformations: function(a) {
          var b, c;
          if (!this.disabled && a) {
            var d = this._.transformations,
              k;
            for (k = 0; k < a.length; ++k) {
              b = a[k];
              var e = void 0,
                p = void 0,
                n = void 0,
                f = void 0,
                x = void 0,
                m = void 0;
              c = [];
              for (p = 0; p < b.length; ++p) n = b[p], "string" == typeof n ? (n = n.split(/\s*:\s*/), f = n[0], x = null, m = n[1]) : (f = n.check, x = n.left, m = n.right), e || (e = n, e = e.element ? e.element : f ? f.match(/^([a-z0-9]+)/i)[0] :
                e.left.getDefinition().element), x instanceof CKEDITOR.style && (x = r(x)), c.push({
                check: f == e ? null : f,
                left: x,
                right: "string" == typeof m ? F(m) : m
              });
              b = e;
              d[b] || (d[b] = []);
              d[b].push(c)
            }
          }
        },
        check: function(a, b, c) {
          if (this.disabled) return !0;
          if (CKEDITOR.tools.isArray(a)) {
            for (var d = a.length; d--;)
              if (this.check(a[d], b, c)) return !0;
            return !1
          }
          var k, e;
          if ("string" == typeof a) {
            e = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e";
            if (e in this._.cachedChecks) return this._.cachedChecks[e];
            d = f(a).$1;
            k = d.styles;
            var n = d.classes;
            d.name = d.elements;
            d.classes = n = n ? n.split(/\s*,\s*/) : [];
            d.styles = t(k);
            d.attributes = t(d.attributes);
            d.children = [];
            n.length && (d.attributes["class"] = n.join(" "));
            k && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles));
            k = d
          } else d = a.getDefinition(), k = d.styles, n = d.attributes || {}, k ? (k = L(k), n.style = CKEDITOR.tools.writeCssText(k, !0)) : k = {}, k = {
            name: d.element,
            attributes: n,
            classes: n["class"] ? n["class"].split(/\s+/) : [],
            styles: k,
            children: []
          };
          var n = CKEDITOR.tools.clone(k),
            r = [],
            x;
          if (!1 !== b && (x = this._.transformations[k.name])) {
            for (d =
              0; d < x.length; ++d) p(this, k, x[d]);
            m(k)
          }
          u(this, n, r, {
            doFilter: !0,
            doTransform: !1 !== b,
            skipRequired: !c,
            skipFinalValidation: !c
          });
          b = 0 < r.length ? !1 : CKEDITOR.tools.objectCompare(k.attributes, n.attributes, !0) ? !0 : !1;
          "string" == typeof a && (this._.cachedChecks[e] = b);
          return b
        },
        getAllowedEnterMode: function() {
          var a = ["p", "div", "br"],
            b = {
              p: CKEDITOR.ENTER_P,
              div: CKEDITOR.ENTER_DIV,
              br: CKEDITOR.ENTER_BR
            };
          return function(c, d) {
            var k = a.slice(),
              e;
            if (this.check(M[c])) return c;
            for (d || (k = k.reverse()); e = k.pop();)
              if (this.check(e)) return b[e];
            return CKEDITOR.ENTER_BR
          }
        }(),
        destroy: function() {
          delete CKEDITOR.filter.instances[this.id];
          delete this._;
          delete this.allowedContent;
          delete this.disallowedContent
        }
      };
      var S = {
          styles: 1,
          attributes: 1,
          classes: 1
        },
        w = {
          styles: "requiredStyles",
          attributes: "requiredAttributes",
          classes: "requiredClasses"
        },
        H = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
        I = {
          styles: /{([^}]+)}/,
          attrs: /\[([^\]]+)\]/,
          classes: /\(([^\)]+)\)/
        },
        G = /^cke:(object|embed|param)$/,
        J = /^(object|embed|param)$/,
        O = CKEDITOR.filter.transformationsTools = {
          sizeToStyle: function(a) {
            this.lengthToStyle(a, "width");
            this.lengthToStyle(a, "height")
          },
          sizeToAttribute: function(a) {
            this.lengthToAttribute(a, "width");
            this.lengthToAttribute(a, "height")
          },
          lengthToStyle: function(a, b, c) {
            c = c || b;
            if (!(c in a.styles)) {
              var d = a.attributes[b];
              d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d)
            }
            delete a.attributes[b]
          },
          lengthToAttribute: function(a, b, c) {
            c = c || b;
            if (!(c in a.attributes)) {
              var d = a.styles[b],
                k = d && d.match(/^(\d+)(?:\.\d*)?px$/);
              k ? a.attributes[c] = k[1] : "cke-test" == d && (a.attributes[c] = "cke-test")
            }
            delete a.styles[b]
          },
          alignmentToStyle: function(a) {
            if (!("float" in a.styles)) {
              var b = a.attributes.align;
              if ("left" == b || "right" == b) a.styles["float"] = b
            }
            delete a.attributes.align
          },
          alignmentToAttribute: function(a) {
            if (!("align" in a.attributes)) {
              var b = a.styles["float"];
              if ("left" == b || "right" == b) a.attributes.align = b
            }
            delete a.styles["float"]
          },
          matchesStyle: n,
          transform: function(a, b) {
            if ("string" == typeof b) a.name = b;
            else {
              var c = b.getDefinition(),
                d = c.styles,
                k = c.attributes,
                e, p, n, r;
              a.name = c.element;
              for (e in k)
                if ("class" == e)
                  for (c = a.classes.join("|"), n = k[e].split(/\s+/); r = n.pop();) - 1 == c.indexOf(r) && a.classes.push(r);
                else a.attributes[e] = k[e];
              for (p in d) a.styles[p] = d[p]
            }
          }
        }
    })();
    (function() {
      CKEDITOR.focusManager = function(a) {
        if (a.focusManager) return a.focusManager;
        this.hasFocus = !1;
        this.currentActive = null;
        this._ = {
          editor: a
        };
        return this
      };
      CKEDITOR.focusManager._ = {
        blurDelay: 200
      };
      CKEDITOR.focusManager.prototype = {
        focus: function(a) {
          this._.timer && clearTimeout(this._.timer);
          a && (this.currentActive = a);
          this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"))
        },
        lock: function() {
          this._.locked =
            1
        },
        unlock: function() {
          delete this._.locked
        },
        blur: function(a) {
          function d() {
            if (this.hasFocus) {
              this.hasFocus = !1;
              var a = this._.editor.container;
              a && a.removeClass("cke_focus");
              this._.editor.fire("blur")
            }
          }
          if (!this._.locked) {
            this._.timer && clearTimeout(this._.timer);
            var b = CKEDITOR.focusManager._.blurDelay;
            a || !b ? d.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
              delete this._.timer;
              d.call(this)
            }, b, this)
          }
        },
        add: function(a, d) {
          var b = a.getCustomData("focusmanager");
          if (!b || b != this) {
            b && b.remove(a);
            var b =
              "focus",
              c = "blur";
            d && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1);
            var e = {
              blur: function() {
                a.equals(this.currentActive) && this.blur()
              },
              focus: function() {
                this.focus(a)
              }
            };
            a.on(b, e.focus, this);
            a.on(c, e.blur, this);
            d && (CKEDITOR.event.useCapture = 0);
            a.setCustomData("focusmanager", this);
            a.setCustomData("focusmanager_handlers", e)
          }
        },
        remove: function(a) {
          a.removeCustomData("focusmanager");
          var d = a.removeCustomData("focusmanager_handlers");
          a.removeListener("blur", d.blur);
          a.removeListener("focus",
            d.focus)
        }
      }
    })();
    CKEDITOR.keystrokeHandler = function(a) {
      if (a.keystrokeHandler) return a.keystrokeHandler;
      this.keystrokes = {};
      this.blockedKeystrokes = {};
      this._ = {
        editor: a
      };
      return this
    };
    (function() {
      var a, d = function(b) {
          b = b.data;
          var d = b.getKeystroke(),
            g = this.keystrokes[d],
            h = this._.editor;
          a = !1 === h.fire("key", {
            keyCode: d,
            domEvent: b
          });
          a || (g && (a = !1 !== h.execCommand(g, {
            from: "keystrokeHandler"
          })), a || (a = !!this.blockedKeystrokes[d]));
          a && b.preventDefault(!0);
          return !a
        },
        b = function(b) {
          a && (a = !1, b.data.preventDefault(!0))
        };
      CKEDITOR.keystrokeHandler.prototype = {
        attach: function(a) {
          a.on("keydown", d, this);
          if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this)
        }
      }
    })();
    (function() {
      CKEDITOR.lang = {
        languages: {
          af: 1,
          ar: 1,
          bg: 1,
          bn: 1,
          bs: 1,
          ca: 1,
          cs: 1,
          cy: 1,
          da: 1,
          de: 1,
          el: 1,
          "en-au": 1,
          "en-ca": 1,
          "en-gb": 1,
          en: 1,
          eo: 1,
          es: 1,
          et: 1,
          eu: 1,
          fa: 1,
          fi: 1,
          fo: 1,
          "fr-ca": 1,
          fr: 1,
          gl: 1,
          gu: 1,
          he: 1,
          hi: 1,
          hr: 1,
          hu: 1,
          id: 1,
          is: 1,
          it: 1,
          ja: 1,
          ka: 1,
          km: 1,
          ko: 1,
          ku: 1,
          lt: 1,
          lv: 1,
          mk: 1,
          mn: 1,
          ms: 1,
          nb: 1,
          nl: 1,
          no: 1,
          pl: 1,
          "pt-br": 1,
          pt: 1,
          ro: 1,
          ru: 1,
          si: 1,
          sk: 1,
          sl: 1,
          sq: 1,
          "sr-latn": 1,
          sr: 1,
          sv: 1,
          th: 1,
          tr: 1,
          tt: 1,
          ug: 1,
          uk: 1,
          vi: 1,
          "zh-cn": 1,
          zh: 1
        },
        rtl: {
          ar: 1,
          fa: 1,
          he: 1,
          ku: 1,
          ug: 1
        },
        load: function(a, d, b) {
          a && CKEDITOR.lang.languages[a] || (a = this.detect(d,
            a));
          var c = this;
          d = function() {
            c[a].dir = c.rtl[a] ? "rtl" : "ltr";
            b(a, c[a])
          };
          this[a] ? d() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), d, this)
        },
        detect: function(a, d) {
          var b = this.languages;
          d = d || navigator.userLanguage || navigator.language || a;
          var c = d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
            e = c[1],
            c = c[2];
          b[e + "-" + c] ? e = e + "-" + c : b[e] || (e = null);
          CKEDITOR.lang.detect = e ? function() {
            return e
          } : function(a) {
            return a
          };
          return e || a
        }
      }
    })();
    CKEDITOR.scriptLoader = function() {
      var a = {},
        d = {};
      return {
        load: function(b, c, e, g) {
          var h = "string" == typeof b;
          h && (b = [b]);
          e || (e = CKEDITOR);
          var l = b.length,
            q = [],
            t = [],
            f = function(a) {
              c && (h ? c.call(e, a) : c.call(e, q, t))
            };
          if (0 === l) f(!0);
          else {
            var z = function(a, b) {
                (b ? q : t).push(a);
                0 >= --l && (g && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), f(b))
              },
              A = function(b, c) {
                a[b] = 1;
                var e = d[b];
                delete d[b];
                for (var f = 0; f < e.length; f++) e[f](b, c)
              },
              u = function(b) {
                if (a[b]) z(b, !0);
                else {
                  var e = d[b] || (d[b] = []);
                  e.push(z);
                  if (!(1 < e.length)) {
                    var f =
                      new CKEDITOR.dom.element("script");
                    f.setAttributes({
                      type: "text/javascript",
                      src: b
                    });
                    c && (CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? f.$.onreadystatechange = function() {
                      if ("loaded" == f.$.readyState || "complete" == f.$.readyState) f.$.onreadystatechange = null, A(b, !0)
                    } : (f.$.onload = function() {
                      setTimeout(function() {
                        A(b, !0)
                      }, 0)
                    }, f.$.onerror = function() {
                      A(b, !1)
                    }));
                    f.appendTo(CKEDITOR.document.getHead())
                  }
                }
              };
            g && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
            for (var C = 0; C < l; C++) u(b[C])
          }
        },
        queue: function() {
          function a() {
            var b;
            (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0)
          }
          var c = [];
          return function(d, g) {
            var h = this;
            c.push({
              scriptUrl: d,
              callback: function() {
                g && g.apply(this, arguments);
                c.shift();
                a.call(h)
              }
            });
            1 == c.length && a.call(this)
          }
        }()
      }
    }();
    CKEDITOR.resourceManager = function(a, d) {
      this.basePath = a;
      this.fileName = d;
      this.registered = {};
      this.loaded = {};
      this.externals = {};
      this._ = {
        waitingList: {}
      }
    };
    CKEDITOR.resourceManager.prototype = {
      add: function(a, d) {
        if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.');
        var b = this.registered[a] = d || {};
        b.name = a;
        b.path = this.getPath(a);
        CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
        return this.get(a)
      },
      get: function(a) {
        return this.registered[a] || null
      },
      getPath: function(a) {
        var d = this.externals[a];
        return CKEDITOR.getUrl(d && d.dir || this.basePath + a + "/")
      },
      getFilePath: function(a) {
        var d = this.externals[a];
        return CKEDITOR.getUrl(this.getPath(a) + (d ? d.file : this.fileName + ".js"))
      },
      addExternal: function(a, d, b) {
        a = a.split(",");
        for (var c = 0; c < a.length; c++) {
          var e = a[c];
          b || (d = d.replace(/[^\/]+$/, function(a) {
            b = a;
            return ""
          }));
          this.externals[e] = {
            dir: d,
            file: b || this.fileName + ".js"
          }
        }
      },
      load: function(a, d, b) {
        CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
        for (var c = this.loaded, e = this.registered, g = [], h = {}, l = {}, q = 0; q < a.length; q++) {
          var t = a[q];
          if (t)
            if (c[t] || e[t]) l[t] = this.get(t);
            else {
              var f = this.getFilePath(t);
              g.push(f);
              f in h || (h[f] = []);
              h[f].push(t)
            }
        }
        CKEDITOR.scriptLoader.load(g, function(a, e) {
          if (e.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + h[e[0]].join(",") + '" was not found at "' + e[0] + '".');
          for (var f = 0; f < a.length; f++)
            for (var g = h[a[f]], m = 0; m < g.length; m++) {
              var y = g[m];
              l[y] = this.get(y);
              c[y] = 1
            }
          d.call(b, l)
        }, this)
      }
    };
    CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
      var d = {};
      return function(b, c, e) {
        var g = {},
          h = function(b) {
            a.call(this, b, function(a) {
              CKEDITOR.tools.extend(g, a);
              var b = [],
                f;
              for (f in a) {
                var l = a[f],
                  A = l && l.requires;
                if (!d[f]) {
                  if (l.icons)
                    for (var u = l.icons.split(","), C = u.length; C--;) CKEDITOR.skin.addIcon(u[C], l.path + "icons/" + (CKEDITOR.env.hidpi && l.hidpi ? "hidpi/" : "") + u[C] + ".png");
                  d[f] = 1
                }
                if (A)
                  for (A.split && (A = A.split(",")), l = 0; l < A.length; l++) g[A[l]] || b.push(A[l])
              }
              if (b.length) h.call(this,
                b);
              else {
                for (f in g) l = g[f], l.onLoad && !l.onLoad._called && (!1 === l.onLoad() && delete g[f], l.onLoad._called = 1);
                c && c.call(e || window, g)
              }
            }, this)
          };
        h.call(this, b)
      }
    });
    CKEDITOR.plugins.setLang = function(a, d, b) {
      var c = this.get(a);
      a = c.langEntries || (c.langEntries = {});
      c = c.lang || (c.lang = []);
      c.split && (c = c.split(",")); - 1 == CKEDITOR.tools.indexOf(c, d) && c.push(d);
      a[d] = b
    };
    CKEDITOR.ui = function(a) {
      if (a.ui) return a.ui;
      this.items = {};
      this.instances = {};
      this.editor = a;
      this._ = {
        handlers: {}
      };
      return this
    };
    CKEDITOR.ui.prototype = {
      add: function(a, d, b) {
        b.name = a.toLowerCase();
        var c = this.items[a] = {
          type: d,
          command: b.command || null,
          args: Array.prototype.slice.call(arguments, 2)
        };
        CKEDITOR.tools.extend(c, b)
      },
      get: function(a) {
        return this.instances[a]
      },
      create: function(a) {
        var d = this.items[a],
          b = d && this._.handlers[d.type],
          c = d && d.command && this.editor.getCommand(d.command),
          b = b && b.create.apply(this, d.args);
        this.instances[a] = b;
        c && c.uiItems.push(b);
        b && !b.type && (b.type = d.type);
        return b
      },
      addHandler: function(a, d) {
        this._.handlers[a] =
          d
      },
      space: function(a) {
        return CKEDITOR.document.getById(this.spaceId(a))
      },
      spaceId: function(a) {
        return this.editor.id + "_" + a
      }
    };
    CKEDITOR.event.implementOn(CKEDITOR.ui);
    (function() {
      function a(a, e, f) {
        CKEDITOR.event.call(this);
        a = a && CKEDITOR.tools.clone(a);
        if (void 0 !== e) {
          if (!(e instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
          if (!f) throw Error("One of the element modes must be specified.");
          if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
          if (!b(e, f)) throw Error('The specified element mode is not supported on element: "' + e.getName() + '".');
          this.element = e;
          this.elementMode = f;
          this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
        } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
        this._ = {};
        this.commands = {};
        this.templates = {};
        this.name = this.name || d();
        this.id = CKEDITOR.tools.getNextId();
        this.status = "unloaded";
        this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
        this.ui = new CKEDITOR.ui(this);
        this.focusManager = new CKEDITOR.focusManager(this);
        this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
        this.on("readOnly",
          c);
        this.on("selectionChange", function(a) {
          g(this, a.data.path)
        });
        this.on("activeFilterChange", function() {
          g(this, this.elementPath(), !0)
        });
        this.on("mode", c);
        this.on("instanceReady", function() {
          this.config.startupFocus && this.focus()
        });
        CKEDITOR.fire("instanceCreated", null, this);
        CKEDITOR.add(this);
        CKEDITOR.tools.setTimeout(function() {
          "destroyed" !== this.status ? l(this, a) : CKEDITOR.warn("editor-incorrect-destroy")
        }, 0, this)
      }

      function d() {
        do var a = "editor" + ++u; while (CKEDITOR.instances[a]);
        return a
      }

      function b(a,
        b) {
        return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1
      }

      function c() {
        var a = this.commands,
          b;
        for (b in a) e(this, a[b])
      }

      function e(a, b) {
        b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
      }

      function g(a, b, c) {
        if (b) {
          var d, e, k = a.commands;
          for (e in k) d = k[e], (c || d.contextSensitive) && d.refresh(a, b)
        }
      }

      function h(a) {
        var b = a.config.customConfig;
        if (!b) return !1;
        var b =
          CKEDITOR.getUrl(b),
          c = C[b] || (C[b] = {});
        c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && h(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function() {
          c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
          h(a)
        });
        return !0
      }

      function l(a, b) {
        a.on("customConfigLoaded", function() {
          if (b) {
            if (b.on)
              for (var c in b.on) a.on(c, b.on[c]);
            CKEDITOR.tools.extend(a.config, b, !0);
            delete a.config.on
          }
          c = a.config;
          a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ?
            a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1;
          a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1;
          a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
          a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
          a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
          c.skin && (CKEDITOR.skinName = c.skin);
          a.fireOnce("configLoaded");
          a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
          a.filter = a.activeFilter = new CKEDITOR.filter(a);
          q(a)
        });
        b && null != b.customConfig && (a.config.customConfig = b.customConfig);
        h(a) || a.fireOnce("customConfigLoaded")
      }

      function q(a) {
        CKEDITOR.skin.loadPart("editor", function() {
          t(a)
        })
      }

      function t(a) {
        CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b,
          c) {
          var d = a.config.title;
          a.langCode = b;
          a.lang = CKEDITOR.tools.prototypedCopy(c);
          a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
          a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir);
          a.fire("langLoaded");
          f(a)
        })
      }

      function f(a) {
        a.getStylesSet(function(b) {
          a.once("loaded", function() {
            a.fire("stylesSet", {
              styles: b
            })
          }, null, null, 1);
          z(a)
        })
      }

      function z(a) {
        var b = a.config,
          c = b.plugins,
          d = b.extraPlugins,
          e =
          b.removePlugins;
        if (d) var k = new RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
          c = c.replace(k, ""),
          c = c + ("," + d);
        if (e) var p = new RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
          c = c.replace(p, "");
        CKEDITOR.env.air && (c += ",adobeair");
        CKEDITOR.plugins.load(c.split(","), function(c) {
          var d = [],
            k = [],
            e = [];
          a.plugins = c;
          for (var f in c) {
            var x = c[f],
              g = x.lang,
              h = null,
              l = x.requires,
              w;
            CKEDITOR.tools.isArray(l) && (l = l.join(","));
            if (l && (w = l.match(p)))
              for (; l = w.pop();) CKEDITOR.error("editor-plugin-required", {
                plugin: l.replace(",", ""),
                requiredBy: f
              });
            g && !a.lang[f] && (g.split && (g = g.split(",")), 0 <= CKEDITOR.tools.indexOf(g, a.langCode) ? h = a.langCode : (h = a.langCode.replace(/-.*/, ""), h = h != a.langCode && 0 <= CKEDITOR.tools.indexOf(g, h) ? h : 0 <= CKEDITOR.tools.indexOf(g, "en") ? "en" : g[0]), x.langEntries && x.langEntries[h] ? (a.lang[f] = x.langEntries[h], h = null) : e.push(CKEDITOR.getUrl(x.path + "lang/" + h + ".js")));
            k.push(h);
            d.push(x)
          }
          CKEDITOR.scriptLoader.load(e, function() {
            for (var c = ["beforeInit", "init", "afterInit"], e = 0; e < c.length; e++)
              for (var p =
                  0; p < d.length; p++) {
                var n = d[p];
                0 === e && k[p] && n.lang && n.langEntries && (a.lang[n.name] = n.langEntries[k[p]]);
                if (n[c[e]]) n[c[e]](a)
              }
            a.fireOnce("pluginsLoaded");
            b.keystrokes && a.setKeystroke(a.config.keystrokes);
            for (p = 0; p < a.config.blockedKeystrokes.length; p++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[p]] = 1;
            a.status = "loaded";
            a.fireOnce("loaded");
            CKEDITOR.fire("instanceLoaded", null, a)
          })
        })
      }

      function A() {
        var a = this.element;
        if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
          var b = this.getData();
          this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
          a.is("textarea") ? a.setValue(b) : a.setHtml(b);
          return !0
        }
        return !1
      }
      a.prototype = CKEDITOR.editor.prototype;
      CKEDITOR.editor = a;
      var u = 0,
        C = {};
      CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        addCommand: function(a, b) {
          b.name = a.toLowerCase();
          var c = new CKEDITOR.command(this, b);
          this.mode && e(this, c);
          return this.commands[a] = c
        },
        _attachToForm: function() {
          function a(b) {
            c.updateElement();
            c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault()
          }

          function b(a) {
            return !!(a && a.call && a.apply)
          }
          var c = this,
            d = c.element,
            e = new CKEDITOR.dom.element(d.$.form);
          d.is("textarea") && e && (e.on("submit", a), b(e.$.submit) && (e.$.submit = CKEDITOR.tools.override(e.$.submit, function(b) {
            return function() {
              a();
              b.apply ? b.apply(this) : b()
            }
          })), c.on("destroy", function() {
            e.removeListener("submit", a)
          }))
        },
        destroy: function(a) {
          this.fire("beforeDestroy");
          !a && A.call(this);
          this.editable(null);
          this.filter && (this.filter.destroy(), delete this.filter);
          delete this.activeFilter;
          this.status =
            "destroyed";
          this.fire("destroy");
          this.removeAllListeners();
          CKEDITOR.remove(this);
          CKEDITOR.fire("instanceDestroyed", null, this)
        },
        elementPath: function(a) {
          if (!a) {
            a = this.getSelection();
            if (!a) return null;
            a = a.getStartElement()
          }
          return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
        },
        createRange: function() {
          var a = this.editable();
          return a ? new CKEDITOR.dom.range(a) : null
        },
        execCommand: function(a, b) {
          var c = this.getCommand(a),
            d = {
              name: a,
              commandData: b,
              command: c
            };
          return c && c.state != CKEDITOR.TRISTATE_DISABLED &&
            !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1
        },
        getCommand: function(a) {
          return this.commands[a]
        },
        getData: function(a) {
          !a && this.fire("beforeGetData");
          var b = this._.data;
          "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "");
          b = {
            dataValue: b
          };
          !a && this.fire("getData", b);
          return b.dataValue
        },
        getSnapshot: function() {
          var a = this.fire("getSnapshot");
          "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : "");
          return a
        },
        loadSnapshot: function(a) {
          this.fire("loadSnapshot", a)
        },
        setData: function(a, b, c) {
          var d = !0,
            e = b;
          b && "object" == typeof b && (c = b.internal, e = b.callback, d = !b.noSnapshot);
          !c && d && this.fire("saveSnapshot");
          if (e || !c) this.once("dataReady", function(a) {
            !c && d && this.fire("saveSnapshot");
            e && e.call(a.editor)
          });
          a = {
            dataValue: a
          };
          !c && this.fire("setData", a);
          this._.data = a.dataValue;
          !c && this.fire("afterSetData", a)
        },
        setReadOnly: function(a) {
          a = null == a || a;
          this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly"))
        },
        insertHtml: function(a, b, c) {
          this.fire("insertHtml", {
            dataValue: a,
            mode: b,
            range: c
          })
        },
        insertText: function(a) {
          this.fire("insertText", a)
        },
        insertElement: function(a) {
          this.fire("insertElement", a)
        },
        getSelectedHtml: function(a) {
          var b = this.editable(),
            c = this.getSelection(),
            c = c && c.getRanges();
          if (!b || !c || 0 === c.length) return null;
          b = b.getHtmlFromRange(c[0]);
          return a ? b.getHtml() : b
        },
        extractSelectedHtml: function(a, b) {
          var c = this.editable(),
            d = this.getSelection().getRanges();
          if (!c || 0 === d.length) return null;
          d = d[0];
          c = c.extractHtmlFromRange(d, b);
          b || this.getSelection().selectRanges([d]);
          return a ? c.getHtml() : c
        },
        focus: function() {
          this.fire("beforeFocus")
        },
        checkDirty: function() {
          return "ready" == this.status && this._.previousValue !== this.getSnapshot()
        },
        resetDirty: function() {
          this._.previousValue = this.getSnapshot()
        },
        updateElement: function() {
          return A.call(this)
        },
        setKeystroke: function() {
          for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
              [].slice.call(arguments, 0)
            ], c, d, e = b.length; e--;) c = b[e], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
        },
        addFeature: function(a) {
          return this.filter.addFeature(a)
        },
        setActiveFilter: function(a) {
          a || (a = this.filter);
          this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode),
            a.getAllowedEnterMode(this.shiftEnterMode, !0)))
        },
        setActiveEnterMode: function(a, b) {
          a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
          b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
          if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange")
        },
        showNotification: function(a) {
          alert(a)
        }
      })
    })();
    CKEDITOR.ELEMENT_MODE_NONE = 0;
    CKEDITOR.ELEMENT_MODE_REPLACE = 1;
    CKEDITOR.ELEMENT_MODE_APPENDTO = 2;
    CKEDITOR.ELEMENT_MODE_INLINE = 3;
    CKEDITOR.htmlParser = function() {
      this._ = {
        htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g
      }
    };
    (function() {
      var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
        d = {
          checked: 1,
          compact: 1,
          declare: 1,
          defer: 1,
          disabled: 1,
          ismap: 1,
          multiple: 1,
          nohref: 1,
          noresize: 1,
          noshade: 1,
          nowrap: 1,
          readonly: 1,
          selected: 1
        };
      CKEDITOR.htmlParser.prototype = {
        onTagOpen: function() {},
        onTagClose: function() {},
        onText: function() {},
        onCDATA: function() {},
        onComment: function() {},
        parse: function(b) {
          for (var c, e, g = 0, h; c = this._.htmlPartsRegex.exec(b);) {
            e = c.index;
            if (e > g)
              if (g = b.substring(g, e), h) h.push(g);
              else this.onText(g);
            g = this._.htmlPartsRegex.lastIndex;
            if (e = c[1])
              if (e = e.toLowerCase(), h && CKEDITOR.dtd.$cdata[e] && (this.onCDATA(h.join("")), h = null), !h) {
                this.onTagClose(e);
                continue
              }
            if (h) h.push(c[0]);
            else if (e = c[3]) {
              if (e = e.toLowerCase(), !/="/.test(e)) {
                var l = {},
                  q, t = c[4];
                c = !!c[5];
                if (t)
                  for (; q = a.exec(t);) {
                    var f = q[1].toLowerCase();
                    q = q[2] || q[3] || q[4] || "";
                    l[f] = !q && d[f] ? f : CKEDITOR.tools.htmlDecodeAttr(q)
                  }
                this.onTagOpen(e, l, c);
                !h && CKEDITOR.dtd.$cdata[e] && (h = [])
              }
            } else if (e = c[2]) this.onComment(e)
          }
          if (b.length > g) this.onText(b.substring(g,
            b.length))
        }
      }
    })();
    CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
      $: function() {
        this._ = {
          output: []
        }
      },
      proto: {
        openTag: function(a) {
          this._.output.push("\x3c", a)
        },
        openTagClose: function(a, d) {
          d ? this._.output.push(" /\x3e") : this._.output.push("\x3e")
        },
        attribute: function(a, d) {
          "string" == typeof d && (d = CKEDITOR.tools.htmlEncodeAttr(d));
          this._.output.push(" ", a, '\x3d"', d, '"')
        },
        closeTag: function(a) {
          this._.output.push("\x3c/", a, "\x3e")
        },
        text: function(a) {
          this._.output.push(a)
        },
        comment: function(a) {
          this._.output.push("\x3c!--", a,
            "--\x3e")
        },
        write: function(a) {
          this._.output.push(a)
        },
        reset: function() {
          this._.output = [];
          this._.indent = !1
        },
        getHtml: function(a) {
          var d = this._.output.join("");
          a && this.reset();
          return d
        }
      }
    });
    "use strict";
    (function() {
      CKEDITOR.htmlParser.node = function() {};
      CKEDITOR.htmlParser.node.prototype = {
        remove: function() {
          var a = this.parent.children,
            d = CKEDITOR.tools.indexOf(a, this),
            b = this.previous,
            c = this.next;
          b && (b.next = c);
          c && (c.previous = b);
          a.splice(d, 1);
          this.parent = null
        },
        replaceWith: function(a) {
          var d = this.parent.children,
            b = CKEDITOR.tools.indexOf(d, this),
            c = a.previous = this.previous,
            e = a.next = this.next;
          c && (c.next = a);
          e && (e.previous = a);
          d[b] = a;
          a.parent = this.parent;
          this.parent = null
        },
        insertAfter: function(a) {
          var d = a.parent.children,
            b = CKEDITOR.tools.indexOf(d, a),
            c = a.next;
          d.splice(b + 1, 0, this);
          this.next = a.next;
          this.previous = a;
          a.next = this;
          c && (c.previous = this);
          this.parent = a.parent
        },
        insertBefore: function(a) {
          var d = a.parent.children,
            b = CKEDITOR.tools.indexOf(d, a);
          d.splice(b, 0, this);
          this.next = a;
          (this.previous = a.previous) && (a.previous.next = this);
          a.previous = this;
          this.parent = a.parent
        },
        getAscendant: function(a) {
          var d = "function" == typeof a ? a : "string" == typeof a ? function(b) {
              return b.name == a
            } : function(b) {
              return b.name in a
            },
            b = this.parent;
          for (; b &&
            b.type == CKEDITOR.NODE_ELEMENT;) {
            if (d(b)) return b;
            b = b.parent
          }
          return null
        },
        wrapWith: function(a) {
          this.replaceWith(a);
          a.add(this);
          return a
        },
        getIndex: function() {
          return CKEDITOR.tools.indexOf(this.parent.children, this)
        },
        getFilterContext: function(a) {
          return a || {}
        }
      }
    })();
    "use strict";
    CKEDITOR.htmlParser.comment = function(a) {
      this.value = a;
      this._ = {
        isBlockLike: !1
      }
    };
    CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
      type: CKEDITOR.NODE_COMMENT,
      filter: function(a, d) {
        var b = this.value;
        if (!(b = a.onComment(d, b, this))) return this.remove(), !1;
        if ("string" != typeof b) return this.replaceWith(b), !1;
        this.value = b;
        return !0
      },
      writeHtml: function(a, d) {
        d && this.filter(d);
        a.comment(this.value)
      }
    });
    "use strict";
    (function() {
      CKEDITOR.htmlParser.text = function(a) {
        this.value = a;
        this._ = {
          isBlockLike: !1
        }
      };
      CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_TEXT,
        filter: function(a, d) {
          if (!(this.value = a.onText(d, this.value, this))) return this.remove(), !1
        },
        writeHtml: function(a, d) {
          d && this.filter(d);
          a.text(this.value)
        }
      })
    })();
    "use strict";
    (function() {
      CKEDITOR.htmlParser.cdata = function(a) {
        this.value = a
      };
      CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_TEXT,
        filter: function() {},
        writeHtml: function(a) {
          a.write(this.value)
        }
      })
    })();
    "use strict";
    CKEDITOR.htmlParser.fragment = function() {
      this.children = [];
      this.parent = null;
      this._ = {
        isBlockLike: !0,
        hasInlineStarted: !1
      }
    };
    (function() {
      function a(a) {
        return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
      }
      var d = CKEDITOR.tools.extend({
          table: 1,
          ul: 1,
          ol: 1,
          dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
        b = {
          ol: 1,
          ul: 1
        },
        c = CKEDITOR.tools.extend({}, {
          html: 1
        }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
          style: 1,
          script: 1
        }),
        e = {
          ul: "li",
          ol: "li",
          dl: "dd",
          table: "tbody",
          tbody: "tr",
          thead: "tr",
          tfoot: "tr",
          tr: "td"
        };
      CKEDITOR.htmlParser.fragment.fromHtml =
        function(g, h, l) {
          function q(a) {
            var b;
            if (0 < y.length)
              for (var c = 0; c < y.length; c++) {
                var d = y[c],
                  k = d.name,
                  e = CKEDITOR.dtd[k],
                  f = v.name && CKEDITOR.dtd[v.name];
                f && !f[k] || a && e && !e[a] && CKEDITOR.dtd[a] ? k == v.name && (z(v, v.parent, 1), c--) : (b || (t(), b = 1), d = d.clone(), d.parent = v, v = d, y.splice(c, 1), c--)
              }
          }

          function t() {
            for (; E.length;) z(E.shift(), v)
          }

          function f(a) {
            if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
              var b = a.children.length,
                c = a.children[b - 1],
                d;
              c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ?
                c.value = d : a.children.length = b - 1)
            }
          }

          function z(b, c, d) {
            c = c || v || m;
            var e = v;
            void 0 === b.previous && (A(c, b) && (v = c, C.onTagOpen(l, {}), b.returnPoint = c = v), f(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (k = !1), "textarea" == b.name && (x = !1));
            b.returnPoint ? (v = b.returnPoint, delete b.returnPoint) : v = d ? c : e
          }

          function A(a, b) {
            if ((a == m || "body" == a.name) && l && (!a.name || CKEDITOR.dtd[a.name][l])) {
              var c, d;
              return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) &&
                !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
            }
          }

          function u(a, b) {
            return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1
          }
          var C = new CKEDITOR.htmlParser,
            m = h instanceof CKEDITOR.htmlParser.element ? h : "string" == typeof h ? new CKEDITOR.htmlParser.element(h) : new CKEDITOR.htmlParser.fragment,
            y = [],
            E = [],
            v = m,
            x = "textarea" == m.name,
            k = "pre" == m.name;
          C.onTagOpen = function(e, n, f, r) {
            n = new CKEDITOR.htmlParser.element(e, n);
            n.isUnknown && f && (n.isEmpty = !0);
            n.isOptionalClose = r;
            if (a(n)) y.push(n);
            else {
              if ("pre" == e) k = !0;
              else {
                if ("br" == e && k) {
                  v.add(new CKEDITOR.htmlParser.text("\n"));
                  return
                }
                "textarea" == e && (x = !0)
              }
              if ("br" == e) E.push(n);
              else {
                for (; !(r = (f = v.name) ? CKEDITOR.dtd[f] || (v._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, n.isUnknown || v.isUnknown || r[e]);)
                  if (v.isOptionalClose) C.onTagClose(f);
                  else if (e in b && f in b) f = v.children, (f = f[f.length - 1]) && "li" == f.name || z(f = new CKEDITOR.htmlParser.element("li"), v), !n.returnPoint && (n.returnPoint = v), v = f;
                else if (e in CKEDITOR.dtd.$listItem &&
                  !u(e, f)) C.onTagOpen("li" == e ? "ul" : "dl", {}, 0, 1);
                else if (f in d && !u(e, f)) !n.returnPoint && (n.returnPoint = v), v = v.parent;
                else if (f in CKEDITOR.dtd.$inline && y.unshift(v), v.parent) z(v, v.parent, 1);
                else {
                  n.isOrphan = 1;
                  break
                }
                q(e);
                t();
                n.parent = v;
                n.isEmpty ? z(n) : v = n
              }
            }
          };
          C.onTagClose = function(a) {
            for (var b = y.length - 1; 0 <= b; b--)
              if (a == y[b].name) {
                y.splice(b, 1);
                return
              }
            for (var c = [], d = [], k = v; k != m && k.name != a;) k._.isBlockLike || d.unshift(k), c.push(k), k = k.returnPoint || k.parent;
            if (k != m) {
              for (b = 0; b < c.length; b++) {
                var e = c[b];
                z(e, e.parent)
              }
              v =
                k;
              k._.isBlockLike && t();
              z(k, k.parent);
              k == v && (v = v.parent);
              y = y.concat(d)
            }
            "body" == a && (l = !1)
          };
          C.onText = function(a) {
            if (!(v._.hasInlineStarted && !E.length || k || x) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return;
            var b = v.name,
              f = b ? CKEDITOR.dtd[b] || (v._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
            if (!x && !f["#"] && b in d) C.onTagOpen(e[b] || ""), C.onText(a);
            else {
              t();
              q();
              k || x || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
              a = new CKEDITOR.htmlParser.text(a);
              if (A(v, a)) this.onTagOpen(l, {}, 0, 1);
              v.add(a)
            }
          };
          C.onCDATA =
            function(a) {
              v.add(new CKEDITOR.htmlParser.cdata(a))
            };
          C.onComment = function(a) {
            t();
            q();
            v.add(new CKEDITOR.htmlParser.comment(a))
          };
          C.parse(g);
          for (t(); v != m;) z(v, v.parent, 1);
          f(m);
          return m
        };
      CKEDITOR.htmlParser.fragment.prototype = {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        add: function(a, b) {
          isNaN(b) && (b = this.children.length);
          var c = 0 < b ? this.children[b - 1] : null;
          if (c) {
            if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 === c.value.length)) {
              this.children.pop();
              this.add(a);
              return
            }
            c.next =
              a
          }
          a.previous = c;
          a.parent = this;
          this.children.splice(b, 0, a);
          this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
        },
        filter: function(a, b) {
          b = this.getFilterContext(b);
          a.onRoot(b, this);
          this.filterChildren(a, !1, b)
        },
        filterChildren: function(a, b, c) {
          if (this.childrenFilteredBy != a.id) {
            c = this.getFilterContext(c);
            if (b && !this.parent) a.onRoot(c, this);
            this.childrenFilteredBy = a.id;
            for (b = 0; b < this.children.length; b++) !1 === this.children[b].filter(a,
              c) && b--
          }
        },
        writeHtml: function(a, b) {
          b && this.filter(b);
          this.writeChildrenHtml(a)
        },
        writeChildrenHtml: function(a, b, c) {
          var d = this.getFilterContext();
          if (c && !this.parent && b) b.onRoot(d, this);
          b && this.filterChildren(b, !1, d);
          b = 0;
          c = this.children;
          for (d = c.length; b < d; b++) c[b].writeHtml(a)
        },
        forEach: function(a, b, c) {
          if (!(c || b && this.type != b)) var d = a(this);
          if (!1 !== d) {
            c = this.children;
            for (var e = 0; e < c.length; e++) d = c[e], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : b && d.type != b || a(d)
          }
        },
        getFilterContext: function(a) {
          return a || {}
        }
      }
    })();
    "use strict";
    (function() {
      function a() {
        this.rules = []
      }

      function d(b, c, d, g) {
        var h, l;
        for (h in c)(l = b[h]) || (l = b[h] = new a), l.add(c[h], d, g)
      }
      CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
        $: function(b) {
          this.id = CKEDITOR.tools.getNextNumber();
          this.elementNameRules = new a;
          this.attributeNameRules = new a;
          this.elementsRules = {};
          this.attributesRules = {};
          this.textRules = new a;
          this.commentRules = new a;
          this.rootRules = new a;
          b && this.addRules(b, 10)
        },
        proto: {
          addRules: function(a, c) {
            var e;
            "number" == typeof c ? e = c : c && "priority" in c && (e =
              c.priority);
            "number" != typeof e && (e = 10);
            "object" != typeof c && (c = {});
            a.elementNames && this.elementNameRules.addMany(a.elementNames, e, c);
            a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, e, c);
            a.elements && d(this.elementsRules, a.elements, e, c);
            a.attributes && d(this.attributesRules, a.attributes, e, c);
            a.text && this.textRules.add(a.text, e, c);
            a.comment && this.commentRules.add(a.comment, e, c);
            a.root && this.rootRules.add(a.root, e, c)
          },
          applyTo: function(a) {
            a.filter(this)
          },
          onElementName: function(a, c) {
            return this.elementNameRules.execOnName(a,
              c)
          },
          onAttributeName: function(a, c) {
            return this.attributeNameRules.execOnName(a, c)
          },
          onText: function(a, c, d) {
            return this.textRules.exec(a, c, d)
          },
          onComment: function(a, c, d) {
            return this.commentRules.exec(a, c, d)
          },
          onRoot: function(a, c) {
            return this.rootRules.exec(a, c)
          },
          onElement: function(a, c) {
            for (var d = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], g, h = 0; 3 > h; h++)
              if (g = d[h]) {
                g = g.exec(a, c, this);
                if (!1 === g) return null;
                if (g && g != c) return this.onNode(a, g);
                if (c.parent && !c.name) break
              }
            return c
          },
          onNode: function(a, c) {
            var d = c.type;
            return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null
          },
          onAttribute: function(a, c, d, g) {
            return (d = this.attributesRules[d]) ? d.exec(a, g, c, this) : g
          }
        }
      });
      CKEDITOR.htmlParser.filterRulesGroup = a;
      a.prototype = {
        add: function(a, c, d) {
          this.rules.splice(this.findIndex(c), 0, {
            value: a,
            priority: c,
            options: d
          })
        },
        addMany: function(a,
          c, d) {
          for (var g = [this.findIndex(c), 0], h = 0, l = a.length; h < l; h++) g.push({
            value: a[h],
            priority: c,
            options: d
          });
          this.rules.splice.apply(this.rules, g)
        },
        findIndex: function(a) {
          for (var c = this.rules, d = c.length - 1; 0 <= d && a < c[d].priority;) d--;
          return d + 1
        },
        exec: function(a, c) {
          var d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment,
            g = Array.prototype.slice.call(arguments, 1),
            h = this.rules,
            l = h.length,
            q, t, f, z;
          for (z = 0; z < l; z++)
            if (d && (q = c.type, t = c.name), f = h[z], !(a.nonEditable && !f.options.applyToAll ||
                a.nestedEditable && f.options.excludeNestedEditable)) {
              f = f.value.apply(null, g);
              if (!1 === f || d && f && (f.name != t || f.type != q)) return f;
              null != f && (g[0] = c = f)
            }
          return c
        },
        execOnName: function(a, c) {
          for (var d = 0, g = this.rules, h = g.length, l; c && d < h; d++) l = g[d], a.nonEditable && !l.options.applyToAll || a.nestedEditable && l.options.excludeNestedEditable || (c = c.replace(l.value[0], l.value[1]));
          return c
        }
      }
    })();
    (function() {
      function a(a, d) {
        function n(a) {
          return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
            "data-cke-bogus": 1
          })
        }

        function p(a, d) {
          return function(k) {
            if (k.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
              var e = [],
                p = b(k),
                r, w;
              if (p)
                for (f(p, 1) && e.push(p); p;) g(p) && (r = c(p)) && f(r) && ((w = c(r)) && !g(w) ? e.push(r) : (n(x).insertAfter(r), r.remove())), p = p.previous;
              for (p = 0; p < e.length; p++) e[p].remove();
              if (e = !a || !1 !== ("function" == typeof d ? d(k) : d)) x || CKEDITOR.env.needsBrFiller ||
                k.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? x || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || k.name in CKEDITOR.dtd.tr || k.name in CKEDITOR.dtd.$listItem) ? (e = b(k), e = !e || "form" == k.name && "input" == e.name) : e = !1 : e = !1;
              e && k.add(n(a))
            }
          }
        }

        function f(a, b) {
          if ((!x || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
          var c;
          return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(y)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a),
            a.value = c[0]), !CKEDITOR.env.needsBrFiller && x && (!b || a.parent.name in w) || !x && ((c = a.previous) && "br" == c.name || !c || g(c))) ? !0 : !1
        }
        var r = {
            elements: {}
          },
          x = "html" == d,
          w = CKEDITOR.tools.extend({}, k),
          D;
        for (D in w) "#" in v[D] || delete w[D];
        for (D in w) r.elements[D] = p(x, a.config.fillEmptyBlocks);
        r.root = p(x, !1);
        r.elements.br = function(a) {
          return function(b) {
            if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
              var d = b.attributes;
              if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"];
              else {
                for (d = b.next; d && e(d);) d =
                  d.next;
                var k = c(b);
                !d && g(b.parent) ? h(b.parent, n(a)) : g(d) && k && !g(k) && n(a).insertBefore(d)
              }
            }
          }
        }(x);
        return r
      }

      function d(a, b) {
        return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
      }

      function b(a) {
        for (a = a.children[a.children.length - 1]; a && e(a);) a = a.previous;
        return a
      }

      function c(a) {
        for (a = a.previous; a && e(a);) a = a.previous;
        return a
      }

      function e(a) {
        return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
      }

      function g(a) {
        return a &&
          (a.type == CKEDITOR.NODE_ELEMENT && a.name in k || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
      }

      function h(a, b) {
        var c = a.children[a.children.length - 1];
        a.children.push(b);
        b.parent = a;
        c && (c.next = b, b.previous = c)
      }

      function l(a) {
        a = a.attributes;
        "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
        a.contenteditable = "false"
      }

      function q(a) {
        a = a.attributes;
        switch (a["data-cke-editable"]) {
          case "true":
            a.contenteditable = "true";
            break;
          case "1":
            delete a.contenteditable
        }
      }

      function t(a) {
        return a.replace(F,
          function(a, b, c) {
            return "\x3c" + b + c.replace(B, function(a, b) {
              return L.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
            }) + "\x3e"
          })
      }

      function f(a, b) {
        return a.replace(b, function(a, b, c) {
          0 === a.indexOf("\x3ctextarea") && (a = b + u(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e");
          return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e"
        })
      }

      function z(a) {
        return a.replace(S, function(a, b) {
          return decodeURIComponent(b)
        })
      }

      function A(a) {
        return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
          function(a) {
            return "\x3c!--" + E + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e"
          })
      }

      function u(a) {
        return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function(a, b) {
          return decodeURIComponent(b)
        })
      }

      function C(a, b) {
        var c = b._.dataStore;
        return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function(a, b) {
          return decodeURIComponent(b)
        }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
          return c && c[b] || ""
        })
      }

      function m(a, b) {
        var c = [],
          d = b.config.protectedSource,
          k = b._.dataStore || (b._.dataStore = {
            id: 1
          }),
          e = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,
          d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);
        a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function(a) {
          return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e"
        });
        for (var n = 0; n < d.length; n++) a = a.replace(d[n], function(a) {
          a = a.replace(e, function(a, b, d) {
            return c[d]
          });
          return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e"
        });
        a = a.replace(e, function(a, b, d) {
          return "\x3c!--" + E + (b ? "{C}" :
            "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
        });
        a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function(a) {
          return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function(a, b) {
            k[k.id] = decodeURIComponent(b);
            return "{cke_protected_" + k.id++ + "}"
          })
        });
        return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(a, c, d, k) {
          return "\x3c" + c + d + "\x3e" + C(u(k), b) + "\x3c/" + c + "\x3e"
        })
      }
      CKEDITOR.htmlDataProcessor = function(b) {
        var c,
          k, e = this;
        this.editor = b;
        this.dataFilter = c = new CKEDITOR.htmlParser.filter;
        this.htmlFilter = k = new CKEDITOR.htmlParser.filter;
        this.writer = new CKEDITOR.htmlParser.basicWriter;
        c.addRules(p);
        c.addRules(n, {
          applyToAll: !0
        });
        c.addRules(a(b, "data"), {
          applyToAll: !0
        });
        k.addRules(D);
        k.addRules(r, {
          applyToAll: !0
        });
        k.addRules(a(b, "html"), {
          applyToAll: !0
        });
        b.on("toHtml", function(a) {
          a = a.data;
          var c = a.dataValue,
            k, c = m(c, b),
            c = f(c, M),
            c = t(c),
            c = f(c, T),
            c = c.replace(w, "$1cke:$2"),
            c = c.replace(I, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
            c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
            c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
          k = a.context || b.editable().getName();
          var e;
          CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == k && (k = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", e = 1);
          k = b.document.createElement(k);
          k.setHtml("a" + c);
          c = k.getHtml().substr(1);
          c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
          e && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
          c = c.replace(H, "$1$2");
          c = z(c);
          c = u(c);
          k = !1 === a.fixForBody ? !1 :
            d(a.enterMode, b.config.autoParagraph);
          c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, k);
          k && (e = c, !e.children.length && CKEDITOR.dtd[e.name][k] && (k = new CKEDITOR.htmlParser.element(k), e.add(k)));
          a.dataValue = c
        }, null, null, 5);
        b.on("toHtml", function(a) {
          a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered")
        }, null, null, 6);
        b.on("toHtml", function(a) {
          a.data.dataValue.filterChildren(e.dataFilter, !0)
        }, null, null, 10);
        b.on("toHtml", function(a) {
          a = a.data;
          var b = a.dataValue,
            c = new CKEDITOR.htmlParser.basicWriter;
          b.writeChildrenHtml(c);
          b = c.getHtml(!0);
          a.dataValue = A(b)
        }, null, null, 15);
        b.on("toDataFormat", function(a) {
          var c = a.data.dataValue;
          a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, ""));
          a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, d(a.data.enterMode, b.config.autoParagraph))
        }, null, null, 5);
        b.on("toDataFormat", function(a) {
          a.data.dataValue.filterChildren(e.htmlFilter, !0)
        }, null, null, 10);
        b.on("toDataFormat", function(a) {
          a.data.filter.applyTo(a.data.dataValue, !1, !0)
        }, null, null, 11);
        b.on("toDataFormat", function(a) {
          var c = a.data.dataValue,
            d = e.writer;
          d.reset();
          c.writeChildrenHtml(d);
          c = d.getHtml(!0);
          c = u(c);
          c = C(c, b);
          a.data.dataValue = c
        }, null, null, 15)
      };
      CKEDITOR.htmlDataProcessor.prototype = {
        toHtml: function(a, b, c, d) {
          var k = this.editor,
            e, n, p, f;
          b && "object" == typeof b ? (e = b.context, c = b.fixForBody, d = b.dontFilter, n = b.filter, p = b.enterMode, f = b.protectedWhitespaces) : e = b;
          e || null === e || (e = k.editable().getName());
          return k.fire("toHtml", {
            dataValue: a,
            context: e,
            fixForBody: c,
            dontFilter: d,
            filter: n || k.filter,
            enterMode: p || k.enterMode,
            protectedWhitespaces: f
          }).dataValue
        },
        toDataFormat: function(a, b) {
          var c, d, k;
          b && (c = b.context, d = b.filter, k = b.enterMode);
          c || null === c || (c = this.editor.editable().getName());
          return this.editor.fire("toDataFormat", {
            dataValue: a,
            filter: d || this.editor.filter,
            context: c,
            enterMode: k || this.editor.enterMode
          }).dataValue
        }
      };
      var y = /(?:&nbsp;|\xa0)$/,
        E = "{cke_protected}",
        v = CKEDITOR.dtd,
        x = "caption colgroup col thead tfoot tbody".split(" "),
        k = CKEDITOR.tools.extend({}, v.$blockLimit,
          v.$block),
        p = {
          elements: {
            input: l,
            textarea: l
          }
        },
        n = {
          attributeNames: [
            [/^on/, "data-cke-pa-on"],
            [/^data-cke-expando$/, ""]
          ]
        },
        D = {
          elements: {
            embed: function(a) {
              var b = a.parent;
              if (b && "object" == b.name) {
                var c = b.attributes.width,
                  b = b.attributes.height;
                c && (a.attributes.width = c);
                b && (a.attributes.height = b)
              }
            },
            a: function(a) {
              var b = a.attributes;
              if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1
            }
          }
        },
        r = {
          elementNames: [
            [/^cke:/, ""],
            [/^\?xml:namespace$/, ""]
          ],
          attributeNames: [
            [/^data-cke-(saved|pa)-/,
              ""
            ],
            [/^data-cke-.*/, ""],
            ["hidefocus", ""]
          ],
          elements: {
            $: function(a) {
              var b = a.attributes;
              if (b) {
                if (b["data-cke-temp"]) return !1;
                for (var c = ["name", "href", "src"], d, k = 0; k < c.length; k++) d = "data-cke-saved-" + c[k], d in b && delete b[c[k]]
              }
              return a
            },
            table: function(a) {
              a.children.slice(0).sort(function(a, b) {
                var c, d;
                a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(x, a.name), d = CKEDITOR.tools.indexOf(x, b.name)); - 1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1);
                return c > d ?
                  1 : -1
              })
            },
            param: function(a) {
              a.children = [];
              a.isEmpty = !0;
              return a
            },
            span: function(a) {
              "Apple-style-span" == a.attributes["class"] && delete a.name
            },
            html: function(a) {
              delete a.attributes.contenteditable;
              delete a.attributes["class"]
            },
            body: function(a) {
              delete a.attributes.spellcheck;
              delete a.attributes.contenteditable
            },
            style: function(a) {
              var b = a.children[0];
              b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
              a.attributes.type || (a.attributes.type = "text/css")
            },
            title: function(a) {
              var b = a.children[0];
              !b && h(a, b = new CKEDITOR.htmlParser.text);
              b.value = a.attributes["data-cke-title"] || ""
            },
            input: q,
            textarea: q
          },
          attributes: {
            "class": function(a) {
              return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
            }
          }
        };
      CKEDITOR.env.ie && (r.attributes.style = function(a) {
        return a.replace(/(^|;)([^\:]+)/g, function(a) {
          return a.toLowerCase()
        })
      });
      var F = /<(a|area|img|input|source)\b([^>]*)>/gi,
        B = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
        L = /^(href|src|name)$/i,
        T = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
        M = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
        S = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
        w = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
        H = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
        I = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    })();
    "use strict";
    CKEDITOR.htmlParser.element = function(a, d) {
      this.name = a;
      this.attributes = d || {};
      this.children = [];
      var b = a || "",
        c = b.match(/^cke:(.*)/);
      c && (b = c[1]);
      b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b);
      this.isEmpty = !!CKEDITOR.dtd.$empty[a];
      this.isUnknown = !CKEDITOR.dtd[a];
      this._ = {
        isBlockLike: b,
        hasInlineStarted: this.isEmpty || !b
      }
    };
    CKEDITOR.htmlParser.cssStyle = function(a) {
      var d = {};
      ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, e) {
        "font-family" == c && (e = e.replace(/["']/g, ""));
        d[c.toLowerCase()] = e
      });
      return {
        rules: d,
        populate: function(a) {
          var c = this.toString();
          c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c)
        },
        toString: function() {
          var a = [],
            c;
          for (c in d) d[c] && a.push(c, ":", d[c], ";");
          return a.join("")
        }
      }
    };
    (function() {
      function a(a) {
        return function(b) {
          return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a)
        }
      }
      var d = function(a, b) {
          a = a[0];
          b = b[0];
          return a < b ? -1 : a > b ? 1 : 0
        },
        b = CKEDITOR.htmlParser.fragment.prototype;
      CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_ELEMENT,
        add: b.add,
        clone: function() {
          return new CKEDITOR.htmlParser.element(this.name, this.attributes)
        },
        filter: function(a, b) {
          var d = this,
            h, l;
          b = d.getFilterContext(b);
          if (b.off) return !0;
          if (!d.parent) a.onRoot(b, d);
          for (;;) {
            h = d.name;
            if (!(l = a.onElementName(b, h))) return this.remove(), !1;
            d.name = l;
            if (!(d = a.onElement(b, d))) return this.remove(), !1;
            if (d !== this) return this.replaceWith(d), !1;
            if (d.name == h) break;
            if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d), !1;
            if (!d.name) return this.replaceWithChildren(), !1
          }
          h = d.attributes;
          var q, t;
          for (q in h) {
            for (l = h[q];;)
              if (t = a.onAttributeName(b, q))
                if (t != q) delete h[q], q = t;
                else break;
            else {
              delete h[q];
              break
            }
            t && (!1 === (l = a.onAttribute(b, d, t, l)) ? delete h[t] :
              h[t] = l)
          }
          d.isEmpty || this.filterChildren(a, !1, b);
          return !0
        },
        filterChildren: b.filterChildren,
        writeHtml: function(a, b) {
          b && this.filter(b);
          var g = this.name,
            h = [],
            l = this.attributes,
            q, t;
          a.openTag(g, l);
          for (q in l) h.push([q, l[q]]);
          a.sortAttributes && h.sort(d);
          q = 0;
          for (t = h.length; q < t; q++) l = h[q], a.attribute(l[0], l[1]);
          a.openTagClose(g, this.isEmpty);
          this.writeChildrenHtml(a);
          this.isEmpty || a.closeTag(g)
        },
        writeChildrenHtml: b.writeChildrenHtml,
        replaceWithChildren: function() {
          for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
          this.remove()
        },
        forEach: b.forEach,
        getFirst: function(b) {
          if (!b) return this.children.length ? this.children[0] : null;
          "function" != typeof b && (b = a(b));
          for (var d = 0, g = this.children.length; d < g; ++d)
            if (b(this.children[d])) return this.children[d];
          return null
        },
        getHtml: function() {
          var a = new CKEDITOR.htmlParser.basicWriter;
          this.writeChildrenHtml(a);
          return a.getHtml()
        },
        setHtml: function(a) {
          a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children;
          for (var b = 0, d = a.length; b < d; ++b) a[b].parent = this
        },
        getOuterHtml: function() {
          var a =
            new CKEDITOR.htmlParser.basicWriter;
          this.writeHtml(a);
          return a.getHtml()
        },
        split: function(a) {
          for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), h = 0; h < b.length; ++h) b[h].parent = d;
          d.children = b;
          b[0] && (b[0].previous = null);
          0 < a && (this.children[a - 1].next = null);
          this.parent.add(d, this.getIndex() + 1);
          return d
        },
        addClass: function(a) {
          if (!this.hasClass(a)) {
            var b = this.attributes["class"] || "";
            this.attributes["class"] = b + (b ? " " : "") + a
          }
        },
        removeClass: function(a) {
          var b = this.attributes["class"];
          b && ((b =
            CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"])
        },
        hasClass: function(a) {
          var b = this.attributes["class"];
          return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1
        },
        getFilterContext: function(a) {
          var b = [];
          a || (a = {
            off: !1,
            nonEditable: !1,
            nestedEditable: !1
          });
          a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0);
          a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable &&
            "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0);
          if (b.length) {
            a = CKEDITOR.tools.copy(a);
            for (var d = 0; d < b.length; d += 2) a[b[d]] = b[d + 1]
          }
          return a
        }
      }, !0)
    })();
    (function() {
      var a = {},
        d = /{([^}]+)}/g,
        b = /([\\'])/g,
        c = /\n/g,
        e = /\r/g;
      CKEDITOR.template = function(g) {
        if (a[g]) this.output = a[g];
        else {
          var h = g.replace(b, "\\$1").replace(c, "\\n").replace(e, "\\r").replace(d, function(a, b) {
            return "',data['" + b + "']\x3d\x3dundefined?'{" + b + "}':data['" + b + "'],'"
          });
          this.output = a[g] = Function("data", "buffer", "return buffer?buffer.push('" + h + "'):['" + h + "'].join('');")
        }
      }
    })();
    delete CKEDITOR.loadFullCore;
    CKEDITOR.instances = {};
    CKEDITOR.document = new CKEDITOR.dom.document(document);
    CKEDITOR.add = function(a) {
      CKEDITOR.instances[a.name] = a;
      a.on("focus", function() {
        CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance"))
      });
      a.on("blur", function() {
        CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"))
      });
      CKEDITOR.fire("instance", null, a)
    };
    CKEDITOR.remove = function(a) {
      delete CKEDITOR.instances[a.name]
    };
    (function() {
      var a = {};
      CKEDITOR.addTemplate = function(d, b) {
        var c = a[d];
        if (c) return c;
        c = {
          name: d,
          source: b
        };
        CKEDITOR.fire("template", c);
        return a[d] = new CKEDITOR.template(c.source)
      };
      CKEDITOR.getTemplate = function(d) {
        return a[d]
      }
    })();
    (function() {
      var a = [];
      CKEDITOR.addCss = function(d) {
        a.push(d)
      };
      CKEDITOR.getCss = function() {
        return a.join("\n")
      }
    })();
    CKEDITOR.on("instanceDestroyed", function() {
      CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
    });
    CKEDITOR.TRISTATE_ON = 1;
    CKEDITOR.TRISTATE_OFF = 2;
    CKEDITOR.TRISTATE_DISABLED = 0;
    (function() {
      CKEDITOR.inline = function(a, d) {
        if (!CKEDITOR.env.isCompatible) return null;
        a = CKEDITOR.dom.element.get(a);
        if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
        var b = new CKEDITOR.editor(d, a, CKEDITOR.ELEMENT_MODE_INLINE),
          c = a.is("textarea") ? a : null;
        c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document),
          a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0);
        b.on("loaded", function() {
          b.fire("uiReady");
          b.editable(a);
          b.container = a;
          b.ui.contentsElement = a;
          b.setData(b.getData(1));
          b.resetDirty();
          b.fire("contentDom");
          b.mode = "wysiwyg";
          b.fire("mode");
          b.status = "ready";
          b.fireOnce("instanceReady");
          CKEDITOR.fire("instanceReady", null, b)
        }, null, null, 1E4);
        b.on("destroy", function() {
          c && (b.container.clearCustomData(), b.container.remove(), c.show());
          b.element.clearCustomData();
          delete b.element
        });
        return b
      };
      CKEDITOR.inlineAll = function() {
        var a, d, b;
        for (b in CKEDITOR.dtd.$editable)
          for (var c = CKEDITOR.document.getElementsByTag(b), e = 0, g = c.count(); e < g; e++) a = c.getItem(e), "true" == a.getAttribute("contenteditable") && (d = {
            element: a,
            config: {}
          }, !1 !== CKEDITOR.fire("inline", d) && CKEDITOR.inline(a, d.config))
      };
      CKEDITOR.domReady(function() {
        !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
      })
    })();
    CKEDITOR.replaceClass = "ckeditor";
    (function() {
      function a(a, e, g, h) {
        if (!CKEDITOR.env.isCompatible) return null;
        a = CKEDITOR.dom.element.get(a);
        if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
        var l = new CKEDITOR.editor(e, a, h);
        h == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), l._.required = a.hasAttribute("required"), a.removeAttribute("required"));
        g && l.setData(g, null, !0);
        l.on("loaded", function() {
          b(l);
          h == CKEDITOR.ELEMENT_MODE_REPLACE && l.config.autoUpdateElement &&
            a.$.form && l._attachToForm();
          l.setMode(l.config.startupMode, function() {
            l.resetDirty();
            l.status = "ready";
            l.fireOnce("instanceReady");
            CKEDITOR.fire("instanceReady", null, l)
          })
        });
        l.on("destroy", d);
        return l
      }

      function d() {
        var a = this.container,
          b = this.element;
        a && (a.clearCustomData(), a.remove());
        b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element)
      }

      function b(a) {
        var b = a.name,
          d = a.element,
          h = a.elementMode,
          l =
          a.fire("uiSpace", {
            space: "top",
            html: ""
          }).html,
          q = a.fire("uiSpace", {
            space: "bottom",
            html: ""
          }).html,
          t = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
          b = CKEDITOR.dom.element.createFromHtml(t.output({
            id: a.id,
            name: b,
            langDir: a.lang.dir,
            langCode: a.langCode,
            voiceLabel: a.title,
            topHtml: l ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + l + "\x3c/span\x3e" : "",
            contentId: a.ui.spaceId("contents"),
            bottomHtml: q ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + q + "\x3c/span\x3e" : "",
            outerEl: CKEDITOR.env.ie ? "span" : "div"
          }));
        h == CKEDITOR.ELEMENT_MODE_REPLACE ?
          (d.hide(), b.insertAfter(d)) : d.append(b);
        a.container = b;
        a.ui.contentsElement = a.ui.space("contents");
        l && a.ui.space("top").unselectable();
        q && a.ui.space("bottom").unselectable();
        d = a.config.width;
        h = a.config.height;
        d && b.setStyle("width", CKEDITOR.tools.cssLength(d));
        h && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(h));
        b.disableContextMenu();
        CKEDITOR.env.webkit && b.on("focus", function() {
          a.focus()
        });
        a.fireOnce("uiReady")
      }
      CKEDITOR.replace = function(b, d) {
        return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE)
      };
      CKEDITOR.appendTo = function(b, d, g) {
        return a(b, d, g, CKEDITOR.ELEMENT_MODE_APPENDTO)
      };
      CKEDITOR.replaceAll = function() {
        for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
          var d = null,
            h = a[b];
          if (h.name || h.id) {
            if ("string" == typeof arguments[0]) {
              if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(h.className)) continue
            } else if ("function" == typeof arguments[0] && (d = {}, !1 === arguments[0](h, d))) continue;
            this.replace(h, d)
          }
        }
      };
      CKEDITOR.editor.prototype.addMode = function(a, b) {
        (this._.modes || (this._.modes = {}))[a] = b
      };
      CKEDITOR.editor.prototype.setMode = function(a, b) {
        var d = this,
          h = this._.modes;
        if (a != d.mode && h && h[a]) {
          d.fire("beforeSetMode", a);
          if (d.mode) {
            var l = d.checkDirty(),
              h = d._.previousModeData,
              q, t = 0;
            d.fire("beforeModeUnload");
            d.editable(0);
            d._.previousMode = d.mode;
            d._.previousModeData = q = d.getData(1);
            "source" == d.mode && h == q && (d.fire("lockSnapshot", {
              forceUpdate: !0
            }), t = 1);
            d.ui.space("contents").setHtml("");
            d.mode = ""
          } else d._.previousModeData = d.getData(1);
          this._.modes[a](function() {
            d.mode = a;
            void 0 !== l && !l &&
              d.resetDirty();
            t ? d.fire("unlockSnapshot") : "wysiwyg" == a && d.fire("saveSnapshot");
            setTimeout(function() {
              d.fire("mode");
              b && b.call(d)
            }, 0)
          })
        }
      };
      CKEDITOR.editor.prototype.resize = function(a, b, d, h) {
        var l = this.container,
          q = this.ui.space("contents"),
          t = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
        h = h ? this.container.getFirst(function(a) {
          return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
        }) : l;
        h.setSize("width", a, !0);
        t && (t.style.width = "1%");
        var f = (h.$.offsetHeight || 0) - (q.$.clientHeight ||
            0),
          l = Math.max(b - (d ? 0 : f), 0);
        b = d ? b + f : b;
        q.setStyle("height", l + "px");
        t && (t.style.width = "100%");
        this.fire("resize", {
          outerHeight: b,
          contentsHeight: l,
          outerWidth: a || h.getSize("width")
        })
      };
      CKEDITOR.editor.prototype.getResizable = function(a) {
        return a ? this.ui.space("contents") : this.container
      };
      CKEDITOR.domReady(function() {
        CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
      })
    })();
    CKEDITOR.config.startupMode = "wysiwyg";
    (function() {
      function a(a) {
        var b = a.editor,
          e = a.data.path,
          n = e.blockLimit,
          f = a.data.selection,
          r = f.getRanges()[0],
          F;
        if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)
          if (f = d(f, e)) f.appendBogus(), F = CKEDITOR.env.ie;
        h(b, e.block, n) && r.collapsed && !r.getCommonAncestor().isReadOnly() && (e = r.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), n = new CKEDITOR.dom.walker(e), n.guard = function(a) {
            return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly()
          }, !n.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) &&
          (b = r.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), F = 1, a.cancel());
        F && r.select()
      }

      function d(a, b) {
        if (a.isFake) return 0;
        var d = b.block || b.blockLimit,
          e = d && d.getLast(c);
        if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus())) return d
      }

      function b(a) {
        var b = a.data.getTarget();
        b.is("input") &&
          (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
      }

      function c(a) {
        return f(a) && z(a)
      }

      function e(a, b) {
        return function(c) {
          var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget;
          (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c)
        }
      }

      function g(a) {
        function b(a) {
          return function(b, k) {
            k && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b);
            if (!(k || !c(b) || a && u(b))) return !1
          }
        }
        var d, e = a.getRanges()[0];
        a = a.root;
        var f = {
          table: 1,
          ul: 1,
          ol: 1,
          dl: 1
        };
        if (e.startPath().contains(f)) {
          var r = e.clone();
          r.collapse(1);
          r.setStartAt(a, CKEDITOR.POSITION_AFTER_START);
          a = new CKEDITOR.dom.walker(r);
          a.guard = b();
          a.checkBackward();
          if (d) return r = e.clone(), r.collapse(), r.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(r), a.guard = b(!0), d = !1, a.checkForward(), d
        }
        return null
      }

      function h(a, b, c) {
        return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable"))
      }

      function l(a) {
        return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
      }

      function q(a) {
        var b = a.editor;
        b.getSelection().scrollIntoView();
        setTimeout(function() {
          b.fire("saveSnapshot")
        }, 0)
      }

      function t(a, b, c) {
        var d = a.getCommonAncestor(b);
        for (b = a = c ? b : a;
          (a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();) b = a;
        b.remove()
      }
      CKEDITOR.editable = CKEDITOR.tools.createClass({
        base: CKEDITOR.dom.element,
        $: function(a, b) {
          this.base(b.$ || b);
          this.editor = a;
          this.status = "unloaded";
          this.hasFocus = !1;
          this.setup()
        },
        proto: {
          focus: function() {
            var a;
            if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) {
              a.focus();
              return
            }
            try {
              this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]()
            } catch (b) {
              if (!CKEDITOR.env.ie) throw b;
            }
            CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
          },
          on: function(a,
            b) {
            var c = Array.prototype.slice.call(arguments, 0);
            CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = e(b, this), c[0] = a, c[1] = b);
            return CKEDITOR.dom.element.prototype.on.apply(this, c)
          },
          attachListener: function(a) {
            !this._.listeners && (this._.listeners = []);
            var b = Array.prototype.slice.call(arguments, 1),
              b = a.on.apply(a, b);
            this._.listeners.push(b);
            return b
          },
          clearListeners: function() {
            var a = this._.listeners;
            try {
              for (; a.length;) a.pop().removeListener()
            } catch (b) {}
          },
          restoreAttrs: function() {
            var a =
              this._.attrChanges,
              b, c;
            for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c))
          },
          attachClass: function(a) {
            var b = this.getCustomData("classes");
            this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a))
          },
          changeAttr: function(a, b) {
            var c = this.getAttribute(a);
            b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b))
          },
          insertText: function(a) {
            this.editor.focus();
            this.insertHtml(this.transformPlainTextToHtml(a),
              "text")
          },
          transformPlainTextToHtml: function(a) {
            var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
            return CKEDITOR.tools.transformPlainTextToHtml(a, b)
          },
          insertHtml: function(a, b, c) {
            var d = this.editor;
            d.focus();
            d.fire("saveSnapshot");
            c || (c = d.getSelection().getRanges()[0]);
            m(this, b || "html", a, c);
            c.select();
            q(this);
            this.editor.fire("afterInsertHtml", {})
          },
          insertHtmlIntoRange: function(a, b, c) {
            m(this, c || "html", a, b);
            this.editor.fire("afterInsertHtml", {
              intoRange: b
            })
          },
          insertElement: function(a, b) {
            var d = this.editor;
            d.focus();
            d.fire("saveSnapshot");
            var e = d.activeEnterMode,
              d = d.getSelection(),
              f = a.getName(),
              f = CKEDITOR.dtd.$block[f];
            b || (b = d.getRanges()[0]);
            this.insertElementIntoRange(a, b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), f && ((f = a.getNext(function(a) {
              return c(a) && !u(a)
            })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? b.moveToElementEditStart(f) : b.moveToElementEditEnd(a) : f || e == CKEDITOR.ENTER_BR || (f = b.fixBlock(!0,
              e == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(f))));
            d.selectRanges([b]);
            q(this)
          },
          insertElementIntoSelection: function(a) {
            this.insertElement(a)
          },
          insertElementIntoRange: function(a, b) {
            var c = this.editor,
              d = c.config.enterMode,
              e = a.getName(),
              f = CKEDITOR.dtd.$block[e];
            if (b.checkReadOnly()) return !1;
            b.deleteContents(1);
            b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.is({
              tr: 1,
              table: 1,
              tbody: 1,
              thead: 1,
              tfoot: 1
            }) && y(b);
            var h, g;
            if (f)
              for (;
                (h = b.getCommonAncestor(0, 1)) && (g = CKEDITOR.dtd[h.getName()]) &&
                (!g || !g[e]);) h.getName() in CKEDITOR.dtd.span ? b.splitElement(h) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(h), b.collapse(!0), h.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
            b.insertNode(a);
            return !0
          },
          setData: function(a, b) {
            b || (a = this.editor.dataProcessor.toHtml(a));
            this.setHtml(a);
            this.fixInitialSelection();
            "unloaded" == this.status && (this.status = "ready");
            this.editor.fire("dataReady")
          },
          getData: function(a) {
            var b = this.getHtml();
            a || (b = this.editor.dataProcessor.toDataFormat(b));
            return b
          },
          setReadOnly: function(a) {
            this.setAttribute("contenteditable", !a)
          },
          detach: function() {
            this.removeClass("cke_editable");
            this.status = "detached";
            var a = this.editor;
            this._.detach();
            delete a.document;
            delete a.window
          },
          isInline: function() {
            return this.getDocument().equals(CKEDITOR.document)
          },
          fixInitialSelection: function() {
            function a() {
              var b = c.getDocument().$,
                d = b.getSelection(),
                k;
              a: if (d.anchorNode && d.anchorNode == c.$) k = !0;
                else {
                  if (CKEDITOR.env.webkit && (k = c.getDocument().getActive()) && k.equals(c) && !d.anchorNode) {
                    k = !0;
                    break a
                  }
                  k = void 0
                }
              k && (k = new CKEDITOR.dom.range(c), k.moveToElementEditStart(c), b = b.createRange(), b.setStart(k.startContainer.$, k.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b))
            }

            function b() {
              var a = c.getDocument().$,
                d = a.selection,
                k = c.getDocument().getActive();
              "None" == d.type && k.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select())
            }
            var c = this;
            if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b());
            else if (this.hasFocus) this.focus(), a();
            else this.once("focus", function() {
              a()
            }, null, null, -999)
          },
          getHtmlFromRange: function(a) {
            if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
            a = {
              doc: this.getDocument(),
              range: a.clone()
            };
            E.eol.detect(a, this);
            E.bogus.exclude(a);
            E.cell.shrink(a);
            a.fragment = a.range.cloneContents();
            E.tree.rebuild(a, this);
            E.eol.fix(a, this);
            return new CKEDITOR.dom.documentFragment(a.fragment.$)
          },
          extractHtmlFromRange: function(a, b) {
            var c = v,
              d = {
                range: a,
                doc: a.document
              },
              e = this.getHtmlFromRange(a);
            if (a.collapsed) return a.optimize(), e;
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            c.table.detectPurge(d);
            d.bookmark = a.createBookmark();
            delete d.range;
            var f = this.editor.createRange();
            f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
            d.targetBookmark = f.createBookmark();
            c.list.detectMerge(d, this);
            c.table.detectRanges(d, this);
            c.block.detectMerge(d, this);
            d.tableContentsRanges ? (c.table.deleteRanges(d),
              a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d)));
            a.moveToBookmark(d.targetBookmark);
            a.optimize();
            c.fixUneditableRangePosition(a);
            c.list.merge(d, this);
            c.table.purge(d, this);
            c.block.merge(d, this);
            if (b) {
              c = a.startPath();
              if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) {
                a: {
                  var d = c.block.getElementsByTag("span"),
                    f = 0,
                    h;
                  if (d)
                    for (; h = d.getItem(f++);)
                      if (!z(h)) {
                        d = !0;
                        break a
                      }
                  d = !1
                }
                d = !d
              }
              d && (a.moveToPosition(c.block,
                CKEDITOR.POSITION_BEFORE_START), c.block.remove())
            } else c.autoParagraph(this.editor, a), A(a.startContainer) && a.startContainer.appendBogus();
            a.startContainer.mergeSiblings();
            return e
          },
          setup: function() {
            var a = this.editor;
            this.attachListener(a, "beforeGetData", function() {
              var b = this.getData();
              this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(C, function(a, b) {
                return b
              }));
              a.setData(b, null, 1)
            }, this);
            this.attachListener(a, "getSnapshot", function(a) {
              a.data = this.getData(1)
            }, this);
            this.attachListener(a,
              "afterSetData",
              function() {
                this.setData(a.getData(1))
              }, this);
            this.attachListener(a, "loadSnapshot", function(a) {
              this.setData(a.data, 1)
            }, this);
            this.attachListener(a, "beforeFocus", function() {
              var b = a.getSelection();
              (b = b && b.getNative()) && "Control" == b.type || this.focus()
            }, this);
            this.attachListener(a, "insertHtml", function(a) {
              this.insertHtml(a.data.dataValue, a.data.mode, a.data.range)
            }, this);
            this.attachListener(a, "insertElement", function(a) {
              this.insertElement(a.data)
            }, this);
            this.attachListener(a, "insertText",
              function(a) {
                this.insertText(a.data)
              }, this);
            this.setReadOnly(a.readOnly);
            this.attachClass("cke_editable");
            a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed");
            this.attachClass("cke_contents_" + a.config.contentsLangDirection);
            a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
            a.keystrokeHandler.attach(this);
            this.on("blur", function() {
              this.hasFocus = !1
            }, null, null, -1);
            this.on("focus", function() {
              this.hasFocus = !0
            }, null, null, -1);
            a.focusManager.add(this);
            this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function() {
              a.focusManager.focus(this)
            }, this));
            this.isInline() && this.changeAttr("tabindex", a.tabIndex);
            if (!this.is("textarea")) {
              a.document = this.getDocument();
              a.window = this.getWindow();
              var d = a.document;
              this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
              var e = a.config.contentsLangDirection;
              this.getDirection(1) !=
                e && this.changeAttr("dir", e);
              var n = CKEDITOR.getCss();
              n && (e = d.getHead(), e.getCustomData("stylesheet") || (n = d.appendStyleText(n), n = new CKEDITOR.dom.element(n.ownerNode || n.owningElement), e.setCustomData("stylesheet", n), n.data("cke-temp", 1)));
              e = d.getCustomData("stylesheet_ref") || 0;
              d.setCustomData("stylesheet_ref", e + 1);
              this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
              this.attachListener(this, "click", function(a) {
                a = a.data;
                var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
                b && 2 != a.$.button && b.isReadOnly() && a.preventDefault()
              });
              var h = {
                8: 1,
                46: 1
              };
              this.attachListener(a, "key", function(b) {
                if (a.readOnly) return !0;
                var c = b.data.domEvent.getKey(),
                  d;
                if (c in h) {
                  b = a.getSelection();
                  var k, e = b.getRanges()[0],
                    n = e.startPath(),
                    p, w, l, c = 8 == c;
                  CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (k = b.getSelectedElement()) || (k = g(b)) ? (a.fire("saveSnapshot"), e.moveToPosition(k, CKEDITOR.POSITION_BEFORE_START), k.remove(), e.select(), a.fire("saveSnapshot"), d = 1) : e.collapsed && ((p = n.block) && (l = p[c ? "getPrevious" :
                    "getNext"](f)) && l.type == CKEDITOR.NODE_ELEMENT && l.is("table") && e[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), e[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && p.remove(), e["moveToElementEdit" + (c ? "End" : "Start")](l), e.select(), a.fire("saveSnapshot"), d = 1) : n.blockLimit && n.blockLimit.is("td") && (w = n.blockLimit.getAscendant("table")) && e.checkBoundaryOfElement(w, c ? CKEDITOR.START : CKEDITOR.END) && (l = w[c ? "getPrevious" : "getNext"](f)) ? (a.fire("saveSnapshot"), e["moveToElementEdit" + (c ? "End" : "Start")](l),
                    e.checkStartOfBlock() && e.checkEndOfBlock() ? l.remove() : e.select(), a.fire("saveSnapshot"), d = 1) : (w = n.contains(["td", "th", "caption"])) && e.checkBoundaryOfElement(w, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
                }
                return !d
              });
              a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(b) {
                b.data.getKeystroke() in h && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select())
              });
              this.attachListener(this, "dblclick", function(b) {
                if (a.readOnly) return !1;
                b = {
                  element: b.data.getTarget()
                };
                a.fire("doubleclick", b)
              });
              CKEDITOR.env.ie && this.attachListener(this, "click", b);
              CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function(b) {
                var c = b.data.getTarget();
                c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
              });
              CKEDITOR.env.edge && this.attachListener(this, "mouseup", function(b) {
                (b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b)
              });
              CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
                if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(C, ""))) {
                  var c = a.createRange();
                  c.moveToElementEditStart(b);
                  c.select(!0)
                }
              });
              CKEDITOR.env.webkit && (this.attachListener(this, "click", function(a) {
                a.data.getTarget().is("input", "select") && a.data.preventDefault()
              }), this.attachListener(this, "mouseup", function(a) {
                a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
              }));
              CKEDITOR.env.webkit && this.attachListener(a,
                "key",
                function(b) {
                  if (a.readOnly) return !0;
                  b = b.data.domEvent.getKey();
                  if (b in h) {
                    var c = 8 == b,
                      d = a.getSelection().getRanges()[0];
                    b = d.startPath();
                    if (d.collapsed) a: {
                      var k = b.block;
                      if (k && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(k, !c) && d.collapsed) {
                        if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                          var e = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
                          if (e && e.type == CKEDITOR.NODE_ELEMENT && e.is("hr")) {
                            a.fire("saveSnapshot");
                            e.remove();
                            b = !0;
                            break a
                          }
                        }
                        d = d.startPath().block;
                        if (!d ||
                          d && d.contains(k)) b = void 0;
                        else {
                          a.fire("saveSnapshot");
                          var f;
                          (f = (c ? d : k).getBogus()) && f.remove();
                          f = a.getSelection();
                          e = f.createBookmarks();
                          (c ? k : d).moveChildren(c ? d : k, !1);
                          b.lastElement.mergeSiblings();
                          t(k, d, !c);
                          f.selectBookmarks(e);
                          b = !0
                        }
                      } else b = !1
                    }
                    else c = d, f = b.block, d = c.endPath().block, f && d && !f.equals(d) ? (a.fire("saveSnapshot"), (k = f.getBogus()) && k.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(f, !1), b.lastElement.mergeSiblings(), t(f, d, !0)), c = a.getSelection().getRanges()[0],
                      c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1;
                    if (!b) return;
                    a.getSelection().scrollIntoView();
                    a.fire("saveSnapshot");
                    return !1
                  }
                }, this, null, 100)
            }
          }
        },
        _: {
          detach: function() {
            this.editor.setData(this.editor.getData(), 0, 1);
            this.clearListeners();
            this.restoreAttrs();
            var a;
            if (a = this.removeCustomData("classes"))
              for (; a.length;) this.removeClass(a.pop());
            if (!this.is("textarea")) {
              a = this.getDocument();
              var b = a.getHead();
              if (b.getCustomData("stylesheet")) {
                var c =
                  a.getCustomData("stylesheet_ref");
                --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove())
              }
            }
            this.editor.fire("contentDomUnload");
            delete this.editor
          }
        }
      });
      CKEDITOR.editor.prototype.editable = function(a) {
        var b = this._.editable;
        if (b && a) return 0;
        arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null));
        return b
      };
      CKEDITOR.on("instanceLoaded", function(b) {
        var c = b.editor;
        c.on("insertElement",
          function(a) {
            a = a.data;
            a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1))
          });
        c.on("selectionChange", function(b) {
          if (!c.readOnly) {
            var d = c.getSelection();
            d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty())
          }
        })
      });
      CKEDITOR.on("instanceCreated", function(a) {
        var b = a.editor;
        b.on("mode", function() {
          var a =
            b.editable();
          if (a && a.isInline()) {
            var c = b.title;
            a.changeAttr("role", "textbox");
            a.changeAttr("aria-label", c);
            c && a.changeAttr("title", c);
            var d = b.fire("ariaEditorHelpLabel", {}).label;
            if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
              var e = CKEDITOR.tools.getNextId(),
                d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e");
              c.append(d);
              a.changeAttr("aria-describedby", e)
            }
          }
        })
      });
      CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
      var f = CKEDITOR.dom.walker.whitespaces(!0),
        z = CKEDITOR.dom.walker.bookmark(!1, !0),
        A = CKEDITOR.dom.walker.empty(),
        u = CKEDITOR.dom.walker.bogus(),
        C = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
        m = function() {
          function a(b) {
            return b.type == CKEDITOR.NODE_ELEMENT
          }

          function b(c, d) {
            var e, f, n, p, h = [],
              r = d.range.startContainer;
            e = d.range.startPath();
            for (var r = B[r.getName()], g = 0, D = c.getChildren(), l = D.count(), F = -1, m = -1, t = 0, q = e.contains(B.$list); g <
              l; ++g) e = D.getItem(g), a(e) ? (n = e.getName(), q && n in CKEDITOR.dtd.$list ? h = h.concat(b(e, d)) : (p = !!r[n], "br" != n || !e.data("cke-eol") || g && g != l - 1 || (t = (f = g ? h[g - 1].node : D.getItem(g + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && B.$block[f.getName()]), -1 != F || p || (F = g), p || (m = g), h.push({
              isElement: 1,
              isLineBreak: t,
              isBlock: e.isBlockBoundary(),
              hasBlockSibling: f,
              node: e,
              name: n,
              allowed: p
            }), f = t = 0)) : h.push({
              isElement: 0,
              node: e,
              allowed: 1
            }); - 1 < F && (h[F].firstNotAllowed = 1); - 1 < m && (h[m].lastNotAllowed = 1);
            return h
          }

          function d(b, c) {
            var e = [],
              k = b.getChildren(),
              f = k.count(),
              n, h = 0,
              r = B[c],
              g = !b.is(B.$inline) || b.is("br");
            for (g && e.push(" "); h < f; h++) n = k.getItem(h), a(n) && !n.is(r) ? e = e.concat(d(n, c)) : e.push(n);
            g && e.push(" ");
            return e
          }

          function e(b) {
            return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1)
          }

          function f(b) {
            return b && a(b) && (b.is(B.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
          }

          function r(b, c, d, e) {
            var k = b.clone(),
              f, n;
            k.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
            (f = (new CKEDITOR.dom.walker(k)).next()) && a(f) && m[f.getName()] &&
              (n = f.getPrevious()) && a(n) && !n.getParent().equals(b.startContainer) && d.contains(n) && e.contains(f) && f.isIdentical(n) && (f.moveChildren(n), f.remove(), r(b, c, d, e))
          }

          function g(b, c) {
            function d(b, c) {
              if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1
            }
            var e = c.endContainer.getChild(c.endOffset),
              k = c.endContainer.getChild(c.endOffset - 1);
            e && d(e, b[b.length - 1]);
            k && d(k, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
          }
          var B = CKEDITOR.dtd,
            m = {
              p: 1,
              div: 1,
              h1: 1,
              h2: 1,
              h3: 1,
              h4: 1,
              h5: 1,
              h6: 1,
              ul: 1,
              ol: 1,
              li: 1,
              pre: 1,
              dl: 1,
              blockquote: 1
            },
            t = {
              p: 1,
              div: 1,
              h1: 1,
              h2: 1,
              h3: 1,
              h4: 1,
              h5: 1,
              h6: 1
            },
            q = CKEDITOR.tools.extend({}, B.$inline);
          delete q.br;
          return function(m, w, H, I) {
            var G = m.editor,
              J = !1;
            "unfiltered_html" == w && (w = "html", J = !0);
            if (!I.checkReadOnly()) {
              var L = (new CKEDITOR.dom.elementPath(I.startContainer, I.root)).blockLimit || I.root;
              m = {
                type: w,
                dontFilter: J,
                editable: m,
                editor: G,
                range: I,
                blockLimit: L,
                mergeCandidates: [],
                zombies: []
              };
              w = m.range;
              I = m.mergeCandidates;
              var K, u;
              "text" == m.type && w.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (K = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", w.document), w.insertNode(K), w.setStartAfter(K));
              J = new CKEDITOR.dom.elementPath(w.startContainer);
              m.endPath = L = new CKEDITOR.dom.elementPath(w.endContainer);
              if (!w.collapsed) {
                var G = L.block || L.blockLimit,
                  y = w.getCommonAncestor();
                G && !G.equals(y) && !G.contains(y) && w.checkEndOfBlock() && m.zombies.push(G);
                w.deleteContents()
              }
              for (;
                (u = e(w)) && a(u) && u.isBlockBoundary() && J.contains(u);) w.moveToPosition(u, CKEDITOR.POSITION_BEFORE_END);
              r(w, m.blockLimit, J, L);
              K && (w.setEndBefore(K), w.collapse(), K.remove());
              K = w.startPath();
              if (G = K.contains(f, !1, 1)) w.splitElement(G), m.inlineStylesRoot = G, m.inlineStylesPeak = K.lastElement;
              K = w.createBookmark();
              (G = K.startNode.getPrevious(c)) && a(G) && f(G) && I.push(G);
              (G = K.startNode.getNext(c)) && a(G) && f(G) && I.push(G);
              for (G = K.startNode;
                (G = G.getParent()) && f(G);) I.push(G);
              w.moveToBookmark(K);
              if (K = H) {
                K = m.range;
                if ("text" == m.type && m.inlineStylesRoot) {
                  u = m.inlineStylesPeak;
                  w = u.getDocument().createText("{cke-peak}");
                  for (I =
                    m.inlineStylesRoot.getParent(); !u.equals(I);) w = w.appendTo(u.clone()), u = u.getParent();
                  H = w.getOuterHtml().split("{cke-peak}").join(H)
                }
                u = m.blockLimit.getName();
                if (/^\s+|\s+$/.test(H) && "span" in CKEDITOR.dtd[u]) {
                  var A = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';
                  H = A + H + A
                }
                H = m.editor.dataProcessor.toHtml(H, {
                  context: null,
                  fixForBody: !1,
                  protectedWhitespaces: !!A,
                  dontFilter: m.dontFilter,
                  filter: m.editor.activeFilter,
                  enterMode: m.editor.activeEnterMode
                });
                u = K.document.createElement("body");
                u.setHtml(H);
                A && (u.getFirst().remove(), u.getLast().remove());
                if ((A = K.startPath().block) && (1 != A.getChildCount() || !A.getBogus())) a: {
                  var z;
                  if (1 == u.getChildCount() && a(z = u.getFirst()) && z.is(t) && !z.hasAttribute("contenteditable")) {
                    A = z.getElementsByTag("*");
                    K = 0;
                    for (I = A.count(); K < I; K++)
                      if (w = A.getItem(K), !w.is(q)) break a;
                    z.moveChildren(z.getParent(1));
                    z.remove()
                  }
                }
                m.dataWrapper = u;
                K = H
              }
              if (K) {
                z = m.range;
                K = z.document;
                var v;
                u = m.blockLimit;
                I = 0;
                var C, A = [],
                  N, E;
                H = G = 0;
                var R, X;
                w = z.startContainer;
                var J = m.endPath.elements[0],
                  Y, L = J.getPosition(w),
                  y = !!J.getCommonAncestor(w) && L != CKEDITOR.POSITION_IDENTICAL && !(L & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                w = b(m.dataWrapper, m);
                for (g(w, z); I < w.length; I++) {
                  L = w[I];
                  if (v = L.isLineBreak) {
                    v = z;
                    R = u;
                    var U = void 0,
                      ba = void 0;
                    L.hasBlockSibling ? v = 1 : (U = v.startContainer.getAscendant(B.$block, 1)) && U.is({
                      div: 1,
                      p: 1
                    }) ? (ba = U.getPosition(R), ba == CKEDITOR.POSITION_IDENTICAL || ba == CKEDITOR.POSITION_CONTAINS ? v = 0 : (R = v.splitElement(U), v.moveToPosition(R, CKEDITOR.POSITION_AFTER_START), v = 1)) : v = 0
                  }
                  if (v) H = 0 < I;
                  else {
                    v =
                      z.startPath();
                    !L.isBlock && h(m.editor, v.block, v.blockLimit) && (E = l(m.editor)) && (E = K.createElement(E), E.appendBogus(), z.insertNode(E), CKEDITOR.env.needsBrFiller && (C = E.getBogus()) && C.remove(), z.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END));
                    if ((v = z.startPath().block) && !v.equals(N)) {
                      if (C = v.getBogus()) C.remove(), A.push(v);
                      N = v
                    }
                    L.firstNotAllowed && (G = 1);
                    if (G && L.isElement) {
                      v = z.startContainer;
                      for (R = null; v && !B[v.getName()][L.name];) {
                        if (v.equals(u)) {
                          v = null;
                          break
                        }
                        R = v;
                        v = v.getParent()
                      }
                      if (v) R && (X = z.splitElement(R),
                        m.zombies.push(X), m.zombies.push(R));
                      else {
                        R = u.getName();
                        Y = !I;
                        v = I == w.length - 1;
                        R = d(L.node, R);
                        for (var U = [], ba = R.length, ca = 0, ea = void 0, Z = 0, V = -1; ca < ba; ca++) ea = R[ca], " " == ea ? (Z || Y && !ca || (U.push(new CKEDITOR.dom.text(" ")), V = U.length), Z = 1) : (U.push(ea), Z = 0);
                        v && V == U.length && U.pop();
                        Y = U
                      }
                    }
                    if (Y) {
                      for (; v = Y.pop();) z.insertNode(v);
                      Y = 0
                    } else z.insertNode(L.node);
                    L.lastNotAllowed && I < w.length - 1 && ((X = y ? J : X) && z.setEndAt(X, CKEDITOR.POSITION_AFTER_START), G = 0);
                    z.collapse()
                  }
                }
                1 != w.length ? C = !1 : (C = w[0], C = C.isElement && "false" ==
                  C.node.getAttribute("contenteditable"));
                C && (H = !0, v = w[0].node, z.setStartAt(v, CKEDITOR.POSITION_BEFORE_START), z.setEndAt(v, CKEDITOR.POSITION_AFTER_END));
                m.dontMoveCaret = H;
                m.bogusNeededBlocks = A
              }
              C = m.range;
              var Q;
              X = m.bogusNeededBlocks;
              for (Y = C.createBookmark(); N = m.zombies.pop();) N.getParent() && (E = C.clone(), E.moveToElementEditStart(N), E.removeEmptyBlocksAtEnd());
              if (X)
                for (; N = X.pop();) CKEDITOR.env.needsBrFiller ? N.appendBogus() : N.append(C.document.createText(" "));
              for (; N = m.mergeCandidates.pop();) N.mergeSiblings();
              C.moveToBookmark(Y);
              if (!m.dontMoveCaret) {
                for (N = e(C); N && a(N) && !N.is(B.$empty);) {
                  if (N.isBlockBoundary()) C.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END);
                  else {
                    if (f(N) && N.getHtml().match(/(\s|&nbsp;)$/g)) {
                      Q = null;
                      break
                    }
                    Q = C.clone();
                    Q.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END)
                  }
                  N = N.getLast(c)
                }
                Q && C.moveToRange(Q)
              }
            }
          }
        }(),
        y = function() {
          function a(b) {
            b = new CKEDITOR.dom.walker(b);
            b.guard = function(a, b) {
              if (b) return !1;
              if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent)
            };
            b.evaluator = function(a) {
              return a.type ==
                CKEDITOR.NODE_ELEMENT
            };
            return b
          }

          function b(a, c, d) {
            c = a.getDocument().createElement(c);
            a.append(c, d);
            return c
          }

          function c(a) {
            var b = a.count(),
              d;
            for (b; 0 < b--;) d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
          }
          return function(d) {
            var e = d.startContainer,
              f = e.getAscendant("table", 1),
              h = !1;
            c(f.getElementsByTag("td"));
            c(f.getElementsByTag("th"));
            f = d.clone();
            f.setStart(e, 0);
            f = a(f).lastBackward();
            f || (f = d.clone(), f.setEndAt(e,
              CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), h = !0);
            f || (f = e);
            f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), d.collapse(!0), f.remove()) : (f.is({
              tbody: 1,
              thead: 1,
              tfoot: 1
            }) && (f = b(f, "tr", h)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", h)), (e = f.getBogus()) && e.remove(), d.moveToPosition(f, h ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
          }
        }(),
        E = {
          eol: {
            detect: function(a, b) {
              var c = a.range,
                d = c.clone(),
                e = c.clone(),
                f = new CKEDITOR.dom.elementPath(c.startContainer, b),
                h = new CKEDITOR.dom.elementPath(c.endContainer,
                  b);
              d.collapse(1);
              e.collapse();
              f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1);
              h.block && e.checkBoundaryOfElement(h.block, CKEDITOR.START) && (c.setEndBefore(h.block), a.appendEolBr = 1)
            },
            fix: function(a, b) {
              var c = b.getDocument(),
                d;
              a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d));
              !a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c), 1)
            },
            createEolBr: function(a) {
              return a.createElement("br", {
                attributes: {
                  "data-cke-eol": 1
                }
              })
            }
          },
          bogus: {
            exclude: function(a) {
              var b = a.range.getBoundaryNodes(),
                c = b.startNode,
                b = b.endNode;
              !b || !u(b) || c && c.equals(b) || a.range.setEndBefore(b)
            }
          },
          tree: {
            rebuild: function(a, b) {
              var c = a.range,
                d = c.getCommonAncestor(),
                e = new CKEDITOR.dom.elementPath(d, b),
                f = new CKEDITOR.dom.elementPath(c.startContainer, b),
                c = new CKEDITOR.dom.elementPath(c.endContainer, b),
                h;
              d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
              if (e.blockLimit.is({
                  tr: 1,
                  table: 1
                })) {
                var g = e.contains("table").getParent();
                h = function(a) {
                  return !a.equals(g)
                }
              } else if (e.block &&
                e.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) {
                var l = e.contains(CKEDITOR.dtd.$list).getParent();
                h = function(a) {
                  return !a.equals(l)
                }
              }
              h || (h = function(a) {
                return !a.equals(e.block) && !a.equals(e.blockLimit)
              });
              this.rebuildFragment(a, b, d, h)
            },
            rebuildFragment: function(a, b, c, d) {
              for (var e; c && !c.equals(b) && d(c);) e = c.clone(0, 1), a.fragment.appendTo(e), a.fragment = e, c = c.getParent()
            }
          },
          cell: {
            shrink: function(a) {
              a = a.range;
              var b = a.startContainer,
                c = a.endContainer,
                d = a.startOffset,
                e = a.endOffset;
              b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT)
            }
          }
        },
        v = function() {
          function a(b, c) {
            var d = b.getParent();
            if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d)
          }

          function b(c, d, e) {
            a(d);
            a(e, 1);
            for (var f; f = e.getNext();) f.insertAfter(d), d = f;
            A(c) && c.remove()
          }

          function c(a, b) {
            var d = new CKEDITOR.dom.range(a);
            d.setStartAfter(b.startNode);
            d.setEndBefore(b.endNode);
            return d
          }
          return {
            list: {
              detectMerge: function(a, b) {
                var d = c(b, a.bookmark),
                  e = d.startPath(),
                  f = d.endPath(),
                  k = e.contains(CKEDITOR.dtd.$list),
                  h = f.contains(CKEDITOR.dtd.$list);
                a.mergeList = k && h && k.getParent().equals(h.getParent()) && !k.equals(h);
                a.mergeListItems = e.block && f.block && e.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem);
                if (a.mergeList || a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = d.createBookmark()
              },
              merge: function(a, c) {
                if (a.mergeListBookmark) {
                  var d = a.mergeListBookmark.startNode,
                    e = a.mergeListBookmark.endNode,
                    f = new CKEDITOR.dom.elementPath(d, c),
                    h = new CKEDITOR.dom.elementPath(e, c);
                  if (a.mergeList) {
                    var p = f.contains(CKEDITOR.dtd.$list),
                      g = h.contains(CKEDITOR.dtd.$list);
                    p.equals(g) || (g.moveChildren(p), g.remove())
                  }
                  a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), h = h.contains(CKEDITOR.dtd.$listItem), f.equals(h) || b(h, d, e));
                  d.remove();
                  e.remove()
                }
              }
            },
            block: {
              detectMerge: function(a, b) {
                if (!a.tableContentsRanges && !a.mergeListBookmark) {
                  var c = new CKEDITOR.dom.range(b);
                  c.setStartBefore(a.bookmark.startNode);
                  c.setEndAfter(a.bookmark.endNode);
                  a.mergeBlockBookmark = c.createBookmark()
                }
              },
              merge: function(a, c) {
                if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                  var d = a.mergeBlockBookmark.startNode,
                    e = a.mergeBlockBookmark.endNode,
                    f = new CKEDITOR.dom.elementPath(d, c),
                    h = new CKEDITOR.dom.elementPath(e, c),
                    f = f.block,
                    h = h.block;
                  f && h && !f.equals(h) && b(h, d, e);
                  d.remove();
                  e.remove()
                }
              }
            },
            table: function() {
              function a(c) {
                var e = [],
                  f, k = new CKEDITOR.dom.walker(c),
                  h = c.startPath().contains(d),
                  n = c.endPath().contains(d),
                  p = {};
                k.guard = function(a,
                  k) {
                  if (a.type == CKEDITOR.NODE_ELEMENT) {
                    var g = "visited_" + (k ? "out" : "in");
                    if (a.getCustomData(g)) return;
                    CKEDITOR.dom.element.setMarker(p, a, g, 1)
                  }
                  if (k && h && a.equals(h)) f = c.clone(), f.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), e.push(f);
                  else if (!k && n && a.equals(n)) f = c.clone(), f.setStartAt(n, CKEDITOR.POSITION_AFTER_START), e.push(f);
                  else {
                    if (g = !k) g = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!h || b(a, h)) && (!n || b(a, n));
                    g && (f = c.clone(), f.selectNodeContents(a), e.push(f))
                  }
                };
                k.lastForward();
                CKEDITOR.dom.element.clearAllMarkers(p);
                return e
              }

              function b(a, c) {
                var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
                  e = a.getPosition(c);
                return e === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (e & d)
              }
              var d = {
                td: 1,
                th: 1,
                caption: 1
              };
              return {
                detectPurge: function(a) {
                  var b = a.range,
                    c = b.clone();
                  c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                  var c = new CKEDITOR.dom.walker(c),
                    e = 0;
                  c.evaluator = function(a) {
                    a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e
                  };
                  c.checkForward();
                  if (1 < e) {
                    var c = b.startPath().contains("table"),
                      f = b.endPath().contains("table");
                    c && f && b.checkBoundaryOfElement(c,
                      CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark())
                  }
                },
                detectRanges: function(e, f) {
                  var k = c(f, e.bookmark),
                    h = k.clone(),
                    g, l, w = k.getCommonAncestor();
                  w.is(CKEDITOR.dtd.$tableContent) && !w.is(d) && (w = w.getAscendant("table", !0));
                  l = w;
                  w = new CKEDITOR.dom.elementPath(k.startContainer, l);
                  l = new CKEDITOR.dom.elementPath(k.endContainer, l);
                  w = w.contains("table");
                  l = l.contains("table");
                  if (w || l) w && l && b(w, l) ? (e.tableSurroundingRange =
                    h, h.setStartAt(w, CKEDITOR.POSITION_AFTER_END), h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), h = k.clone(), h.setEndAt(w, CKEDITOR.POSITION_AFTER_END), g = k.clone(), g.setStartAt(l, CKEDITOR.POSITION_BEFORE_START), g = a(h).concat(a(g))) : w ? l || (e.tableSurroundingRange = h, h.setStartAt(w, CKEDITOR.POSITION_AFTER_END), k.setEndAt(w, CKEDITOR.POSITION_AFTER_END)) : (e.tableSurroundingRange = h, h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), k.setStartAt(l, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = g ? g : a(k)
                },
                deleteRanges: function(a) {
                  for (var b; b =
                    a.tableContentsRanges.pop();) b.extractContents(), A(b.startContainer) && b.startContainer.appendBogus();
                  a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
                },
                purge: function(a) {
                  if (a.purgeTableBookmark) {
                    var b = a.doc,
                      c = a.range.clone(),
                      b = b.createElement("p");
                    b.insertBefore(a.purgeTableBookmark.startNode);
                    c.moveToBookmark(a.purgeTableBookmark);
                    c.deleteContents();
                    a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                  }
                }
              }
            }(),
            detectExtractMerge: function(a) {
              return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) &&
                a.range.endPath().contains(CKEDITOR.dtd.$listItem))
            },
            fixUneditableRangePosition: function(a) {
              a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0)
            },
            autoParagraph: function(a, b) {
              var c = b.startPath(),
                d;
              h(a, c.block, c.blockLimit) && (d = l(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START))
            }
          }
        }()
    })();
    (function() {
      function a() {
        var a = this._.fakeSelection,
          b;
        a && (b = this.getSelection(1), b && b.isHidden() || (a.reset(), a = 0));
        if (!a && (a = b || this.getSelection(1), !a || a.getType() == CKEDITOR.SELECTION_NONE)) return;
        this.fire("selectionCheck", a);
        b = this.elementPath();
        b.compare(this._.selectionPreviousPath) || (CKEDITOR.env.webkit && (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = b, this.fire("selectionChange", {
          selection: a,
          path: b
        }))
      }

      function d() {
        C = !0;
        u || (b.call(this), u = CKEDITOR.tools.setTimeout(b,
          200, this))
      }

      function b() {
        u = null;
        C && (CKEDITOR.tools.setTimeout(a, 0, this), C = !1)
      }

      function c(a) {
        return m(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1
      }

      function e(a) {
        function b(c, d) {
          return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1
        }
        if (!(a.root instanceof CKEDITOR.editable)) return !1;
        var d = a.startContainer,
          e = a.getPreviousNode(c, null, d),
          f = a.getNextNode(c, null, d);
        return b(e) || b(f, 1) || !(e || f || d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary() &&
          d.getBogus()) ? !0 : !1
      }

      function g(a) {
        return a.getCustomData("cke-fillingChar")
      }

      function h(a, b) {
        var c = a && a.removeCustomData("cke-fillingChar");
        if (c) {
          if (!1 !== b) {
            var d, e = a.getDocument().getSelection().getNative(),
              f = e && "None" != e.type && e.getRangeAt(0);
            1 < c.getLength() && f && f.intersectsNode(c.$) && (d = q(e), f = e.focusNode == c.$ && 0 < e.focusOffset, e.anchorNode == c.$ && 0 < e.anchorOffset && d[0].offset--, f && d[1].offset--)
          }
          c.setText(l(c.getText()));
          d && t(a.getDocument().$, d)
        }
      }

      function l(a) {
        return a.replace(/\u200B( )?/g, function(a) {
          return a[1] ?
            " " : ""
        })
      }

      function q(a) {
        return [{
          node: a.anchorNode,
          offset: a.anchorOffset
        }, {
          node: a.focusNode,
          offset: a.focusOffset
        }]
      }

      function t(a, b) {
        var c = a.getSelection(),
          d = a.createRange();
        d.setStart(b[0].node, b[0].offset);
        d.collapse(!0);
        c.removeAllRanges();
        c.addRange(d);
        c.extend(b[1].node, b[1].offset)
      }

      function f(a) {
        var b = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '"\x3e\x26nbsp;\x3c/div\x3e',
          a.document);
        a.fire("lockSnapshot");
        a.editable().append(b);
        var c = a.getSelection(1),
          d = a.createRange(),
          e = c.root.on("selectionchange", function(a) {
            a.cancel()
          }, null, null, 0);
        d.setStartAt(b, CKEDITOR.POSITION_AFTER_START);
        d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
        c.selectRanges([d]);
        e.removeListener();
        a.fire("unlockSnapshot");
        a._.hiddenSelectionContainer = b
      }

      function z(a) {
        var b = {
          37: 1,
          39: 1,
          8: 1,
          46: 1
        };
        return function(c) {
          var d = c.data.getKeystroke();
          if (b[d]) {
            var e = a.getSelection().getRanges(),
              f = e[0];
            1 == e.length &&
              f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
          }
        }
      }

      function A(a) {
        for (var b = 0; b < a.length; b++) {
          var c = a[b];
          c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
          if (!c.collapsed) {
            if (c.startContainer.isReadOnly())
              for (var d = c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());) e && "false" == d.getAttribute("contentEditable") &&
                c.setStartAfter(d), d = d.getParent();
            d = c.startContainer;
            e = c.endContainer;
            var f = c.startOffset,
              h = c.endOffset,
              g = c.clone();
            d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? g.setStartAfter(d) : g.setStartBefore(d));
            e && e.type == CKEDITOR.NODE_TEXT && (h ? g.setEndAfter(e) : g.setEndBefore(e));
            d = new CKEDITOR.dom.walker(g);
            d.evaluator = function(d) {
              if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) {
                var e = c.clone();
                c.setEndBefore(d);
                c.collapsed && a.splice(b--, 1);
                d.getPosition(g.endContainer) & CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d),
                  e.collapsed || a.splice(b + 1, 0, e));
                return !0
              }
              return !1
            };
            d.next()
          }
        }
        return a
      }
      var u, C, m = CKEDITOR.dom.walker.invisible(1),
        y = function() {
          function a(b) {
            return function(a) {
              var c = a.editor.createRange();
              c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
              return !1
            }
          }

          function b(a) {
            return function(b) {
              var c = b.editor,
                d = c.createRange(),
                e;
              (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a));
              e && c.getSelection().selectRanges([d]);
              c.fire("saveSnapshot");
              b.selected.remove();
              e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d]));
              c.fire("saveSnapshot");
              return !1
            }
          }
          var c = a(),
            d = a(1);
          return {
            37: c,
            38: c,
            39: d,
            40: d,
            8: b(),
            46: b(1)
          }
        }();
      CKEDITOR.on("instanceCreated", function(b) {
        function c() {
          var a = e.getSelection();
          a && a.removeAllRanges()
        }
        var e = b.editor;
        e.on("contentDom", function() {
          function b() {
            H = new CKEDITOR.dom.selection(e.getSelection());
            H.lock()
          }

          function c() {
            k.removeListener("mouseup", c);
            l.removeListener("mouseup", c);
            var a = CKEDITOR.document.$.selection,
              b = a.createRange();
            "None" != a.type && b.parentElement().ownerDocument == f.$ && b.select()
          }
          var f = e.document,
            k = CKEDITOR.document,
            g = e.editable(),
            p = f.getBody(),
            l = f.getDocumentElement(),
            m = g.isInline(),
            w, H;
          CKEDITOR.env.gecko && g.attachListener(g, "focus", function(a) {
            a.removeListener();
            0 !== w && (a = e.getSelection().getNative()) && a.isCollapsed && a.anchorNode == g.$ && (a = e.createRange(), a.moveToElementEditStart(g), a.select())
          }, null, null, -2);
          g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
            w && CKEDITOR.env.webkit &&
              (w = e._.previousActive && e._.previousActive.equals(f.getActive()));
            e.unlockSelection(w);
            w = 0
          }, null, null, -1);
          g.attachListener(g, "mousedown", function() {
            w = 0
          });
          if (CKEDITOR.env.ie || m) E ? g.attachListener(g, "beforedeactivate", b, null, null, -1) : g.attachListener(e, "selectionCheck", b, null, null, -1), g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
            e.lockSelection(H);
            w = 1
          }, null, null, -1), g.attachListener(g, "mousedown", function() {
            w = 0
          });
          if (CKEDITOR.env.ie && !m) {
            var I;
            g.attachListener(g, "mousedown",
              function(a) {
                2 == a.data.$.button && ((a = e.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (I = e.window.getScrollPosition()))
              });
            g.attachListener(g, "mouseup", function(a) {
              2 == a.data.$.button && I && (e.document.$.documentElement.scrollLeft = I.x, e.document.$.documentElement.scrollTop = I.y);
              I = null
            });
            if ("BackCompat" != f.$.compatMode) {
              if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) l.on("mousedown", function(a) {
                function b(a) {
                  a = a.data.$;
                  if (d) {
                    var c = p.$.createTextRange();
                    try {
                      c.moveToPoint(a.clientX, a.clientY)
                    } catch (e) {}
                    d.setEndPoint(0 >
                      f.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c);
                    d.select()
                  }
                }

                function c() {
                  l.removeListener("mousemove", b);
                  k.removeListener("mouseup", c);
                  l.removeListener("mouseup", c);
                  d.select()
                }
                a = a.data;
                if (a.getTarget().is("html") && a.$.y < l.$.clientHeight && a.$.x < l.$.clientWidth) {
                  var d = p.$.createTextRange();
                  try {
                    d.moveToPoint(a.$.clientX, a.$.clientY)
                  } catch (e) {}
                  var f = d.duplicate();
                  l.on("mousemove", b);
                  k.on("mouseup", c);
                  l.on("mouseup", c)
                }
              });
              if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) l.on("mousedown",
                function(a) {
                  a.data.getTarget().is("html") && (k.on("mouseup", c), l.on("mouseup", c))
                })
            }
          }
          g.attachListener(g, "selectionchange", a, e);
          g.attachListener(g, "keyup", d, e);
          g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
            e.forceNextSelectionCheck();
            e.selectionChange(1)
          });
          if (m && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
            var G;
            g.attachListener(g, "mousedown", function() {
              G = 1
            });
            g.attachListener(f.getDocumentElement(), "mouseup", function() {
              G && d.call(e);
              G = 0
            })
          } else g.attachListener(CKEDITOR.env.ie ?
            g : f.getDocumentElement(), "mouseup", d, e);
          CKEDITOR.env.webkit && g.attachListener(f, "keydown", function(a) {
            switch (a.data.getKey()) {
              case 13:
              case 33:
              case 34:
              case 35:
              case 36:
              case 37:
              case 39:
              case 8:
              case 45:
              case 46:
                h(g)
            }
          }, null, null, -1);
          g.attachListener(g, "keydown", z(e), null, null, -1)
        });
        e.on("setData", function() {
          e.unlockSelection();
          CKEDITOR.env.webkit && c()
        });
        e.on("contentDomUnload", function() {
          e.unlockSelection()
        });
        if (CKEDITOR.env.ie9Compat) e.on("beforeDestroy", c, null, null, 9);
        e.on("dataReady", function() {
          delete e._.fakeSelection;
          delete e._.hiddenSelectionContainer;
          e.selectionChange(1)
        });
        e.on("loadSnapshot", function() {
          var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
            b = e.editable().getLast(a);
          b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = e.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
        }, null, null, 100);
        e.on("key", function(a) {
          if ("wysiwyg" == e.mode) {
            var b = e.getSelection();
            if (b.isFake) {
              var c = y[a.data.keyCode];
              if (c) return c({
                editor: e,
                selected: b.getSelectedElement(),
                selection: b,
                keyEvent: a
              })
            }
          }
        })
      });
      CKEDITOR.on("instanceReady", function(a) {
        function b() {
          var a = d.editable();
          if (a && (a = g(a))) {
            var c = d.document.$.getSelection();
            "None" == c.type || c.anchorNode != a.$ && c.focusNode != a.$ || (f = q(c));
            e = a.getText();
            a.setText(l(e))
          }
        }

        function c() {
          var a = d.editable();
          a && (a = g(a)) && (a.setText(e), f && (t(d.document.$, f), f = null))
        }
        var d = a.editor,
          e, f;
        CKEDITOR.env.webkit && (d.on("selectionChange", function() {
            var a = d.editable(),
              b = g(a);
            b && (b.getCustomData("ready") ? h(a) : b.setCustomData("ready", 1))
          }, null,
          null, -1), d.on("beforeSetMode", function() {
          h(d.editable())
        }, null, null, -1), d.on("beforeUndoImage", b), d.on("afterUndoImage", c), d.on("beforeGetData", b, null, null, 0), d.on("getData", c))
      });
      CKEDITOR.editor.prototype.selectionChange = function(b) {
        (b ? a : d).call(this)
      };
      CKEDITOR.editor.prototype.getSelection = function(a) {
        return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
      };
      CKEDITOR.editor.prototype.lockSelection =
        function(a) {
          a = a || this.getSelection(1);
          return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1
        };
      CKEDITOR.editor.prototype.unlockSelection = function(a) {
        var b = this._.savedSelection;
        return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1
      };
      CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
        delete this._.selectionPreviousPath
      };
      CKEDITOR.dom.document.prototype.getSelection = function() {
        return new CKEDITOR.dom.selection(this)
      };
      CKEDITOR.dom.range.prototype.select =
        function() {
          var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
          a.selectRanges([this]);
          return a
        };
      CKEDITOR.SELECTION_NONE = 1;
      CKEDITOR.SELECTION_TEXT = 2;
      CKEDITOR.SELECTION_ELEMENT = 3;
      var E = "function" != typeof window.getSelection,
        v = 1;
      CKEDITOR.dom.selection = function(a) {
        if (a instanceof CKEDITOR.dom.selection) {
          var b = a;
          a = a.root
        }
        var c = a instanceof CKEDITOR.dom.element;
        this.rev = b ? b.rev : v++;
        this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
        this.root = c ? a : this.document.getBody();
        this.isLocked = 0;
        this._ = {
          cache: {}
        };
        if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this;
        a = this.getNative();
        var d, e;
        if (a)
          if (a.getRangeAt) d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer);
          else {
            try {
              e = a.createRange()
            } catch (f) {}
            d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement())
          }
        if (!d || d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) &&
          !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList;
        return this
      };
      var x = {
        img: 1,
        hr: 1,
        li: 1,
        table: 1,
        tr: 1,
        td: 1,
        th: 1,
        embed: 1,
        object: 1,
        ol: 1,
        ul: 1,
        a: 1,
        input: 1,
        form: 1,
        select: 1,
        textarea: 1,
        button: 1,
        fieldset: 1,
        thead: 1,
        tfoot: 1
      };
      CKEDITOR.dom.selection.prototype = {
        getNative: function() {
          return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel =
            E ? this.document.$.selection : this.document.getWindow().$.getSelection()
        },
        getType: E ? function() {
          var a = this._.cache;
          if (a.type) return a.type;
          var b = CKEDITOR.SELECTION_NONE;
          try {
            var c = this.getNative(),
              d = c.type;
            "Text" == d && (b = CKEDITOR.SELECTION_TEXT);
            "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT);
            c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT)
          } catch (e) {}
          return a.type = b
        } : function() {
          var a = this._.cache;
          if (a.type) return a.type;
          var b = CKEDITOR.SELECTION_TEXT,
            c = this.getNative();
          if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
          else if (1 == c.rangeCount) {
            var c = c.getRangeAt(0),
              d = c.startContainer;
            d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && x[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT)
          }
          return a.type = b
        },
        getRanges: function() {
          var a = E ? function() {
            function a(b) {
              return (new CKEDITOR.dom.node(b)).getIndex()
            }
            var b = function(b, c) {
              b = b.duplicate();
              b.collapse(c);
              var d = b.parentElement();
              if (!d.hasChildNodes()) return {
                container: d,
                offset: 0
              };
              for (var e = d.children, f, k, h = b.duplicate(), g = 0,
                  w = e.length - 1, l = -1, n, m; g <= w;)
                if (l = Math.floor((g + w) / 2), f = e[l], h.moveToElementText(f), n = h.compareEndPoints("StartToStart", b), 0 < n) w = l - 1;
                else if (0 > n) g = l + 1;
              else return {
                container: d,
                offset: a(f)
              };
              if (-1 == l || l == e.length - 1 && 0 > n) {
                h.moveToElementText(d);
                h.setEndPoint("StartToStart", b);
                h = h.text.replace(/(\r\n|\r)/g, "\n").length;
                e = d.childNodes;
                if (!h) return f = e[e.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? {
                  container: d,
                  offset: e.length
                } : {
                  container: f,
                  offset: f.nodeValue.length
                };
                for (d = e.length; 0 < h && 0 < d;) k = e[--d], k.nodeType ==
                  CKEDITOR.NODE_TEXT && (m = k, h -= k.nodeValue.length);
                return {
                  container: m,
                  offset: -h
                }
              }
              h.collapse(0 < n ? !0 : !1);
              h.setEndPoint(0 < n ? "StartToStart" : "EndToStart", b);
              h = h.text.replace(/(\r\n|\r)/g, "\n").length;
              if (!h) return {
                container: d,
                offset: a(f) + (0 < n ? 0 : 1)
              };
              for (; 0 < h;) try {
                k = f[0 < n ? "previousSibling" : "nextSibling"], k.nodeType == CKEDITOR.NODE_TEXT && (h -= k.nodeValue.length, m = k), f = k
              } catch (t) {
                return {
                  container: d,
                  offset: a(f)
                }
              }
              return {
                container: m,
                offset: 0 < n ? -h : m.nodeValue.length + h
              }
            };
            return function() {
              var a = this.getNative(),
                c = a &&
                a.createRange(),
                d = this.getType();
              if (!a) return [];
              if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a];
              if (d == CKEDITOR.SELECTION_ELEMENT) {
                for (var d = [], e = 0; e < c.length; e++) {
                  for (var f = c.item(e), k = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h <
                    k.childNodes.length && k.childNodes[h] != f; h++);
                  a.setStart(new CKEDITOR.dom.node(k), h);
                  a.setEnd(new CKEDITOR.dom.node(k), h + 1);
                  d.push(a)
                }
                return d
              }
              return []
            }
          }() : function() {
            var a = [],
              b, c = this.getNative();
            if (!c) return a;
            for (var d = 0; d < c.rangeCount; d++) {
              var e = c.getRangeAt(d);
              b = new CKEDITOR.dom.range(this.root);
              b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset);
              b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
              a.push(b)
            }
            return a
          };
          return function(b) {
            var c = this._.cache,
              d = c.ranges;
            d || (c.ranges =
              d = new CKEDITOR.dom.rangeList(a.call(this)));
            return b ? A(new CKEDITOR.dom.rangeList(d.slice())) : d
          }
        }(),
        getStartElement: function() {
          var a = this._.cache;
          if (void 0 !== a.startElement) return a.startElement;
          var b;
          switch (this.getType()) {
            case CKEDITOR.SELECTION_ELEMENT:
              return this.getSelectedElement();
            case CKEDITOR.SELECTION_TEXT:
              var c = this.getRanges()[0];
              if (c) {
                if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                else {
                  for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ?
                      b.getChildCount() : b.getLength()) && !b.isBlockBoundary();) c.setStartAfter(b);
                  b = c.startContainer;
                  if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                  if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT)
                    for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) b = c, c = c.getFirst();
                  else b = c.startContainer
                }
                b = b.$
              }
          }
          return a.startElement = b ? new CKEDITOR.dom.element(b) : null
        },
        getSelectedElement: function() {
          var a = this._.cache;
          if (void 0 !== a.selectedElement) return a.selectedElement;
          var b = this,
            c = CKEDITOR.tools.tryThese(function() {
                return b.getNative().createRange().item(0)
              },
              function() {
                for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && x[c.getName()] && (d = c)); e--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
                return d && d.$
              });
          return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
        },
        getSelectedText: function() {
          var a = this._.cache;
          if (void 0 !== a.selectedText) return a.selectedText;
          var b = this.getNative(),
            b = E ? "Control" == b.type ? "" : b.createRange().text : b.toString();
          return a.selectedText = b
        },
        lock: function() {
          this.getRanges();
          this.getStartElement();
          this.getSelectedElement();
          this.getSelectedText();
          this._.cache.nativeSel = null;
          this.isLocked = 1
        },
        unlock: function(a) {
          if (this.isLocked) {
            if (a) var b = this.getSelectedElement(),
              c = !b && this.getRanges(),
              d = this.isFake;
            this.isLocked = 0;
            this.reset();
            a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
          }
        },
        reset: function() {
          this._.cache = {};
          this.isFake = 0;
          var a = this.root.editor;
          if (a && a._.fakeSelection)
            if (this.rev == a._.fakeSelection.rev) {
              delete a._.fakeSelection;
              var b = a._.hiddenSelectionContainer;
              if (b) {
                var c = a.checkDirty();
                a.fire("lockSnapshot");
                b.remove();
                a.fire("unlockSnapshot");
                !c && a.resetDirty()
              }
              delete a._.hiddenSelectionContainer
            } else CKEDITOR.warn("selection-fake-reset");
          this.rev = v++
        },
        selectElement: function(a) {
          var b = new CKEDITOR.dom.range(this.root);
          b.setStartBefore(a);
          b.setEndAfter(a);
          this.selectRanges([b])
        },
        selectRanges: function(a) {
          var b = this.root.editor,
            b = b && b._.hiddenSelectionContainer;
          this.reset();
          if (b)
            for (var b = this.root, c, d = 0; d < a.length; ++d) c =
              a[d], c.endContainer.equals(b) && (c.endOffset = Math.min(c.endOffset, b.getChildCount()));
          if (a.length)
            if (this.isLocked) {
              var f = CKEDITOR.document.getActive();
              this.unlock();
              this.selectRanges(a);
              this.lock();
              f && !f.equals(this.root) && f.focus()
            } else {
              var g;
              a: {
                var l, m;
                if (1 == a.length && !(m = a[0]).collapsed && (g = m.getEnclosedNode()) && g.type == CKEDITOR.NODE_ELEMENT && (m = m.clone(), m.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (l = m.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (g = l), "false" == g.getAttribute("contenteditable"))) break a;
                g = void 0
              }
              if (g) this.fake(g);
              else {
                if (E) {
                  m = CKEDITOR.dom.walker.whitespaces(!0);
                  l = /\ufeff|\u00a0/;
                  b = {
                    table: 1,
                    tbody: 1,
                    tr: 1
                  };
                  1 < a.length && (g = a[a.length - 1], a[0].setEnd(g.endContainer, g.endOffset));
                  g = a[0];
                  a = g.collapsed;
                  var t, q, u;
                  if ((c = g.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in x && (!c.is("a") || !c.getText())) try {
                    u = c.$.createControlRange();
                    u.addElement(c.$);
                    u.select();
                    return
                  } catch (w) {}
                  if (g.startContainer.type == CKEDITOR.NODE_ELEMENT && g.startContainer.getName() in b || g.endContainer.type ==
                    CKEDITOR.NODE_ELEMENT && g.endContainer.getName() in b) g.shrink(CKEDITOR.NODE_ELEMENT, !0), a = g.collapsed;
                  u = g.createBookmark();
                  b = u.startNode;
                  a || (f = u.endNode);
                  u = g.document.$.body.createTextRange();
                  u.moveToElementText(b.$);
                  u.moveStart("character", 1);
                  f ? (l = g.document.$.body.createTextRange(), l.moveToElementText(f.$), u.setEndPoint("EndToEnd", l), u.moveEnd("character", -1)) : (t = b.getNext(m), q = b.hasAscendant("pre"), t = !(t && t.getText && t.getText().match(l)) && (q || !b.hasPrevious() || b.getPrevious().is && b.getPrevious().is("br")),
                    q = g.document.createElement("span"), q.setHtml("\x26#65279;"), q.insertBefore(b), t && g.document.createText("﻿").insertBefore(b));
                  g.setStartBefore(b);
                  b.remove();
                  a ? (t ? (u.moveStart("character", -1), u.select(), g.document.$.selection.clear()) : u.select(), g.moveToPosition(q, CKEDITOR.POSITION_BEFORE_START), q.remove()) : (g.setEndBefore(f), f.remove(), u.select())
                } else {
                  f = this.getNative();
                  if (!f) return;
                  this.removeAllRanges();
                  for (u = 0; u < a.length; u++) {
                    if (u < a.length - 1 && (t = a[u], q = a[u + 1], l = t.clone(), l.setStart(t.endContainer,
                        t.endOffset), l.setEnd(q.startContainer, q.startOffset), !l.collapsed && (l.shrink(CKEDITOR.NODE_ELEMENT, !0), g = l.getCommonAncestor(), l = l.getEnclosedNode(), g.isReadOnly() || l && l.isReadOnly()))) {
                      q.setStart(t.startContainer, t.startOffset);
                      a.splice(u--, 1);
                      continue
                    }
                    g = a[u];
                    q = this.document.$.createRange();
                    g.collapsed && CKEDITOR.env.webkit && e(g) && (t = this.root, h(t, !1), l = t.getDocument().createText("​"), t.setCustomData("cke-fillingChar", l), g.insertNode(l), (t = l.getNext()) && !l.getPrevious() && t.type == CKEDITOR.NODE_ELEMENT &&
                      "br" == t.getName() ? (h(this.root), g.moveToPosition(t, CKEDITOR.POSITION_BEFORE_START)) : g.moveToPosition(l, CKEDITOR.POSITION_AFTER_END));
                    q.setStart(g.startContainer.$, g.startOffset);
                    try {
                      q.setEnd(g.endContainer.$, g.endOffset)
                    } catch (H) {
                      if (0 <= H.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) g.collapse(1), q.setEnd(g.endContainer.$, g.endOffset);
                      else throw H;
                    }
                    f.addRange(q)
                  }
                }
                this.reset();
                this.root.fire("selectionchange")
              }
            }
        },
        fake: function(a) {
          var b = this.root.editor;
          this.reset();
          f(b);
          var c = this._.cache,
            d = new CKEDITOR.dom.range(this.root);
          d.setStartBefore(a);
          d.setEndAfter(a);
          c.ranges = new CKEDITOR.dom.rangeList(d);
          c.selectedElement = c.startElement = a;
          c.type = CKEDITOR.SELECTION_ELEMENT;
          c.selectedText = c.nativeSel = null;
          this.isFake = 1;
          this.rev = v++;
          b._.fakeSelection = this;
          this.root.fire("selectionchange")
        },
        isHidden: function() {
          var a = this.getCommonAncestor();
          a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
          return !(!a || !a.data("cke-hidden-sel"))
        },
        createBookmarks: function(a) {
          a = this.getRanges().createBookmarks(a);
          this.isFake && (a.isFake = 1);
          return a
        },
        createBookmarks2: function(a) {
          a = this.getRanges().createBookmarks2(a);
          this.isFake && (a.isFake = 1);
          return a
        },
        selectBookmarks: function(a) {
          for (var b = [], c, d = 0; d < a.length; d++) {
            var e = new CKEDITOR.dom.range(this.root);
            e.moveToBookmark(a[d]);
            b.push(e)
          }
          a.isFake && (c = b[0].getEnclosedNode(), c && c.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0));
          a.isFake ? this.fake(c) : this.selectRanges(b);
          return this
        },
        getCommonAncestor: function() {
          var a = this.getRanges();
          return a.length ? a[0].startContainer.getCommonAncestor(a[a.length -
            1].endContainer) : null
        },
        scrollIntoView: function() {
          this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
        },
        removeAllRanges: function() {
          if (this.getType() != CKEDITOR.SELECTION_NONE) {
            var a = this.getNative();
            try {
              a && a[E ? "empty" : "removeAllRanges"]()
            } catch (b) {}
            this.reset()
          }
        }
      }
    })();
    "use strict";
    CKEDITOR.STYLE_BLOCK = 1;
    CKEDITOR.STYLE_INLINE = 2;
    CKEDITOR.STYLE_OBJECT = 3;
    (function() {
      function a(a, b) {
        for (var c, d;
          (a = a.getParent()) && !a.equals(b);)
          if (a.getAttribute("data-nostyle")) c = a;
          else if (!d) {
          var e = a.getAttribute("contentEditable");
          "false" == e ? c = a : "true" == e && (d = 1)
        }
        return c
      }

      function d(a, b, c, d) {
        return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a))
      }

      function b(c) {
        var f = c.document;
        if (c.collapsed) f = E(this, f), c.insertNode(f), c.moveToPosition(f, CKEDITOR.POSITION_BEFORE_END);
        else {
          var h = this.element,
            g = this._.definition,
            k, l = g.ignoreReadonly,
            m = l || g.includeReadonly;
          null ==
            m && (m = c.root.getCustomData("cke_includeReadonly"));
          var n = CKEDITOR.dtd[h];
          n || (k = !0, n = CKEDITOR.dtd.span);
          c.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
          c.trim();
          var p = c.createBookmark(),
            t = p.startNode,
            q = p.endNode,
            r = t,
            u;
          if (!l) {
            var x = c.getCommonAncestor(),
              l = a(t, x),
              x = a(q, x);
            l && (r = l.getNextSourceNode(!0));
            x && (q = x)
          }
          for (r.getPosition(q) == CKEDITOR.POSITION_FOLLOWING && (r = 0); r;) {
            l = !1;
            if (r.equals(q)) r = null, l = !0;
            else {
              var v = r.type == CKEDITOR.NODE_ELEMENT ? r.getName() : null,
                x = v && "false" == r.getAttribute("contentEditable"),
                z = v &&
                r.getAttribute("data-nostyle");
              if (v && r.data("cke-bookmark")) {
                r = r.getNextSourceNode(!0);
                continue
              }
              if (x && m && CKEDITOR.dtd.$block[v])
                for (var A = r, y = e(A), B = void 0, D = y.length, F = 0, A = D && new CKEDITOR.dom.range(A.getDocument()); F < D; ++F) {
                  var B = y[F],
                    T = CKEDITOR.filter.instances[B.data("cke-filter")];
                  if (T ? T.check(this) : 1) A.selectNodeContents(B), b.call(this, A)
                }
              y = v ? !n[v] || z ? 0 : x && !m ? 0 : d(r, q, g, M) : 1;
              if (y)
                if (B = r.getParent(), y = g, D = h, F = k, !B || !(B.getDtd() || CKEDITOR.dtd.span)[D] && !F || y.parentRule && !y.parentRule(B)) l = !0;
                else {
                  if (u ||
                    v && CKEDITOR.dtd.$removeEmpty[v] && (r.getPosition(q) | M) != M || (u = c.clone(), u.setStartBefore(r)), v = r.type, v == CKEDITOR.NODE_TEXT || x || v == CKEDITOR.NODE_ELEMENT && !r.getChildCount()) {
                    for (var v = r, Z;
                      (l = !v.getNext(L)) && (Z = v.getParent(), n[Z.getName()]) && d(Z, t, g, S);) v = Z;
                    u.setEndAfter(v)
                  }
                }
              else l = !0;
              r = r.getNextSourceNode(z || x)
            }
            if (l && u && !u.collapsed) {
              for (var l = E(this, f), x = l.hasAttributes(), z = u.getCommonAncestor(), v = {}, y = {}, B = {}, D = {}, V, Q, da; l && z;) {
                if (z.getName() == h) {
                  for (V in g.attributes) !D[V] && (da = z.getAttribute(Q)) &&
                    (l.getAttribute(V) == da ? y[V] = 1 : D[V] = 1);
                  for (Q in g.styles) !B[Q] && (da = z.getStyle(Q)) && (l.getStyle(Q) == da ? v[Q] = 1 : B[Q] = 1)
                }
                z = z.getParent()
              }
              for (V in y) l.removeAttribute(V);
              for (Q in v) l.removeStyle(Q);
              x && !l.hasAttributes() && (l = null);
              l ? (u.extractContents().appendTo(l), u.insertNode(l), C.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), u.extractContents().appendTo(l), u.insertNode(l), C.call(this, l), l.remove(!0));
              u = null
            }
          }
          c.moveToBookmark(p);
          c.shrink(CKEDITOR.SHRINK_TEXT);
          c.shrink(CKEDITOR.NODE_ELEMENT, !0)
        }
      }

      function c(a) {
        function b() {
          for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(n.getParent()), e = null, f = null, g = 0; g < a.elements.length; g++) {
            var h = a.elements[g];
            if (h == a.block || h == a.blockLimit) break;
            p.checkElementRemovable(h, !0) && (e = h)
          }
          for (g = 0; g < c.elements.length; g++) {
            h = c.elements[g];
            if (h == c.block || h == c.blockLimit) break;
            p.checkElementRemovable(h, !0) && (f = h)
          }
          f && n.breakParent(f);
          e && d.breakParent(e)
        }
        a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
        var c =
          a.createBookmark(),
          d = c.startNode;
        if (a.collapsed) {
          for (var e = new CKEDITOR.dom.elementPath(d.getParent(), a.root), f, h = 0, g; h < e.elements.length && (g = e.elements[h]) && g != e.block && g != e.blockLimit; h++)
            if (this.checkElementRemovable(g)) {
              var l;
              a.collapsed && (a.checkBoundaryOfElement(g, CKEDITOR.END) || (l = a.checkBoundaryOfElement(g, CKEDITOR.START))) ? (f = g, f.match = l ? "start" : "end") : (g.mergeSiblings(), g.is(this.element) ? u.call(this, g) : m(g, k(this)[g.getName()]))
            }
          if (f) {
            g = d;
            for (h = 0;; h++) {
              l = e.elements[h];
              if (l.equals(f)) break;
              else if (l.match) continue;
              else l = l.clone();
              l.append(g);
              g = l
            }
            g["start" == f.match ? "insertBefore" : "insertAfter"](f)
          }
        } else {
          var n = c.endNode,
            p = this;
          b();
          for (e = d; !e.equals(n);) f = e.getNextSourceNode(), e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e) && (e.getName() == this.element ? u.call(this, e) : m(e, k(this)[e.getName()]), f.type == CKEDITOR.NODE_ELEMENT && f.contains(d) && (b(), f = d.getNext())), e = f
        }
        a.moveToBookmark(c);
        a.shrink(CKEDITOR.NODE_ELEMENT, !0)
      }

      function e(a) {
        var b = [];
        a.forEach(function(a) {
          if ("true" ==
            a.getAttribute("contenteditable")) return b.push(a), !1
        }, CKEDITOR.NODE_ELEMENT, !0);
        return b
      }

      function g(a) {
        var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
        (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && v(a, this)
      }

      function h(a) {
        var b = a.getCommonAncestor(!0, !0);
        if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
          var b = this._.definition,
            c = b.attributes;
          if (c)
            for (var d in c) a.removeAttribute(d, c[d]);
          if (b.styles)
            for (var e in b.styles) b.styles.hasOwnProperty(e) &&
              a.removeStyle(e)
        }
      }

      function l(a) {
        var b = a.createBookmark(!0),
          c = a.createIterator();
        c.enforceRealBlocks = !0;
        this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
        for (var d, e = a.document, f; d = c.getNextParagraph();) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = E(this, e, d), t(d, f));
        a.moveToBookmark(b)
      }

      function q(a) {
        var b = a.createBookmark(1),
          c = a.createIterator();
        c.enforceRealBlocks = !0;
        c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
        for (var d, e; d = c.getNextParagraph();) this.checkElementRemovable(d) &&
          (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), t(d, e)) : u.call(this, d));
        a.moveToBookmark(b)
      }

      function t(a, b) {
        var c = !b;
        c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
        var d = b && b.is("pre"),
          e = a.is("pre"),
          g = !d && e;
        if (d && !e) {
          e = b;
          (g = a.getBogus()) && g.remove();
          g = a.getHtml();
          g = z(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
          g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
          g = g.replace(/([ \t\n\r]+|&nbsp;)/g,
            " ");
          g = g.replace(/<br\b[^>]*>/gi, "\n");
          if (CKEDITOR.env.ie) {
            var h = a.getDocument().createElement("div");
            h.append(e);
            e.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e";
            e.copyAttributes(h.getFirst());
            e = h.getFirst().remove()
          } else e.setHtml(g);
          b = e
        } else g ? b = A(c ? [a.getHtml()] : f(a), b) : a.moveChildren(b);
        b.replace(a);
        if (d) {
          var c = b,
            k;
          (k = c.getPrevious(T)) && k.type == CKEDITOR.NODE_ELEMENT && k.is("pre") && (d = z(k.getHtml(), /\n$/, "") + "\n\n" + z(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" :
            c.setHtml(d), k.remove())
        } else c && y(b)
      }

      function f(a) {
        var b = [];
        z(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
          return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e"
        }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) {
          b.push(c)
        });
        return b
      }

      function z(a, b, c) {
        var d = "",
          e = "";
        a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
          b && (d = b);
          c && (e = c);
          return ""
        });
        return d + a.replace(b, c) + e
      }

      function A(a, b) {
        var c;
        1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
        for (var d = 0; d < a.length; d++) {
          var e = a[d],
            e = e.replace(/(\r\n|\r)/g, "\n"),
            e = z(e, /^[ \t]*\n/, ""),
            e = z(e, /\n$/, ""),
            e = z(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
              return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
            }),
            e = e.replace(/\n/g, "\x3cbr\x3e"),
            e = e.replace(/[ \t]{2,}/g, function(a) {
              return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
            });
          if (c) {
            var f = b.clone();
            f.setHtml(e);
            c.append(f)
          } else b.setHtml(e)
        }
        return c || b
      }

      function u(a, b) {
        var c = this._.definition,
          d = c.attributes,
          c = c.styles,
          e = k(this)[a.getName()],
          f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c),
          g;
        for (g in d)
          if ("class" != g && !this._.definition.fullMatch || a.getAttribute(g) == p(g, d[g])) b && "data-" == g.slice(0, 5) || (f = a.hasAttribute(g), a.removeAttribute(g));
        for (var h in c) this._.definition.fullMatch && a.getStyle(h) != p(h, c[h], !0) || (f = f || !!a.getStyle(h), a.removeStyle(h));
        m(a, e, D[a.getName()]);
        f && (this._.definition.alwaysRemoveElement ?
          y(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? y(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
      }

      function C(a) {
        for (var b = k(this), c = a.getElementsByTag(this.element), d, e = c.count(); 0 <= --e;) d = c.getItem(e), d.isReadOnly() || u.call(this, d, !0);
        for (var f in b)
          if (f != this.element)
            for (c = a.getElementsByTag(f), e = c.count() - 1; 0 <= e; e--) d = c.getItem(e), d.isReadOnly() || m(d, b[f])
      }

      function m(a, b, c) {
        if (b = b && b.attributes)
          for (var d = 0; d < b.length; d++) {
            var e = b[d][0],
              f;
            if (f = a.getAttribute(e)) {
              var g = b[d][1];
              (null === g || g.test && g.test(f) || "string" == typeof g && f == g) && a.removeAttribute(e)
            }
          }
        c || y(a)
      }

      function y(a, b) {
        if (!a.hasAttributes() || b)
          if (CKEDITOR.dtd.$block[a.getName()]) {
            var c = a.getPrevious(T),
              d = a.getNext(T);
            !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({
              br: 1
            }) || a.append("br", 1);
            !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({
              br: 1
            }) || a.append("br");
            a.remove(!0)
          } else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
            d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
      }

      function E(a, b, c) {
        var d;
        d = a.element;
        "*" == d && (d = "span");
        d = new CKEDITOR.dom.element(d, b);
        c && c.copyAttributes(d);
        d = v(d, a);
        b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
        return d
      }

      function v(a, b) {
        var c = b._.definition,
          d = c.attributes,
          c = CKEDITOR.style.getStyleText(c);
        if (d)
          for (var e in d) a.setAttribute(e, d[e]);
        c && a.setAttribute("style", c);
        return a
      }

      function x(a,
        b) {
        for (var c in a) a[c] = a[c].replace(B, function(a, c) {
          return b[c]
        })
      }

      function k(a) {
        if (a._.overrides) return a._.overrides;
        var b = a._.overrides = {},
          c = a._.definition.overrides;
        if (c) {
          CKEDITOR.tools.isArray(c) || (c = [c]);
          for (var d = 0; d < c.length; d++) {
            var e = c[d],
              f, g;
            "string" == typeof e ? f = e.toLowerCase() : (f = e.element ? e.element.toLowerCase() : a.element, g = e.attributes);
            e = b[f] || (b[f] = {});
            if (g) {
              var e = e.attributes = e.attributes || [],
                h;
              for (h in g) e.push([h.toLowerCase(), g[h]])
            }
          }
        }
        return b
      }

      function p(a, b, c) {
        var d = new CKEDITOR.dom.element("span");
        d[c ? "setStyle" : "setAttribute"](a, b);
        return d[c ? "getStyle" : "getAttribute"](a)
      }

      function n(a, b, c) {
        var d = a.document,
          e = a.getRanges();
        b = b ? this.removeFromRange : this.applyToRange;
        for (var f, g = e.createIterator(); f = g.getNextRange();) b.call(this, f, c);
        a.selectRanges(e);
        d.removeCustomData("doc_processing_style")
      }
      var D = {
          address: 1,
          div: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1,
          p: 1,
          pre: 1,
          section: 1,
          header: 1,
          footer: 1,
          nav: 1,
          article: 1,
          aside: 1,
          figure: 1,
          dialog: 1,
          hgroup: 1,
          time: 1,
          meter: 1,
          menu: 1,
          command: 1,
          keygen: 1,
          output: 1,
          progress: 1,
          details: 1,
          datagrid: 1,
          datalist: 1
        },
        r = {
          a: 1,
          blockquote: 1,
          embed: 1,
          hr: 1,
          img: 1,
          li: 1,
          object: 1,
          ol: 1,
          table: 1,
          td: 1,
          tr: 1,
          th: 1,
          ul: 1,
          dl: 1,
          dt: 1,
          dd: 1,
          form: 1,
          audio: 1,
          video: 1
        },
        F = /\s*(?:;\s*|$)/,
        B = /#\((.+?)\)/g,
        L = CKEDITOR.dom.walker.bookmark(0, 1),
        T = CKEDITOR.dom.walker.whitespaces(1);
      CKEDITOR.style = function(a, b) {
        if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a);
        var c = a.attributes;
        c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style);
        b && (a = CKEDITOR.tools.clone(a), x(a.attributes, b), x(a.styles, b));
        c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*";
        this.type = a.type || (D[c] ? CKEDITOR.STYLE_BLOCK : r[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
        "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT);
        this._ = {
          definition: a
        }
      };
      CKEDITOR.style.prototype = {
        apply: function(a) {
          if (a instanceof CKEDITOR.dom.document) return n.call(this, a.getSelection());
          if (this.checkApplicable(a.elementPath(), a)) {
            var b =
              this._.enterMode;
            b || (this._.enterMode = a.activeEnterMode);
            n.call(this, a.getSelection(), 0, a);
            this._.enterMode = b
          }
        },
        remove: function(a) {
          if (a instanceof CKEDITOR.dom.document) return n.call(this, a.getSelection(), 1);
          if (this.checkApplicable(a.elementPath(), a)) {
            var b = this._.enterMode;
            b || (this._.enterMode = a.activeEnterMode);
            n.call(this, a.getSelection(), 1, a);
            this._.enterMode = b
          }
        },
        applyToRange: function(a) {
          this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? l : this.type == CKEDITOR.STYLE_OBJECT ?
            g : null;
          return this.applyToRange(a)
        },
        removeFromRange: function(a) {
          this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? q : this.type == CKEDITOR.STYLE_OBJECT ? h : null;
          return this.removeFromRange(a)
        },
        applyToObject: function(a) {
          v(a, this)
        },
        checkActive: function(a, b) {
          switch (this.type) {
            case CKEDITOR.STYLE_BLOCK:
              return this.checkElementRemovable(a.block || a.blockLimit, !0, b);
            case CKEDITOR.STYLE_OBJECT:
            case CKEDITOR.STYLE_INLINE:
              for (var c = a.elements, d = 0, e; d < c.length; d++)
                if (e = c[d],
                  this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) {
                  if (this.type == CKEDITOR.STYLE_OBJECT) {
                    var f = e.getName();
                    if (!("string" == typeof this.element ? f == this.element : f in this.element)) continue
                  }
                  if (this.checkElementRemovable(e, !0, b)) return !0
                }
          }
          return !1
        },
        checkApplicable: function(a, b, c) {
          b && b instanceof CKEDITOR.filter && (c = b);
          if (c && !c.check(this)) return !1;
          switch (this.type) {
            case CKEDITOR.STYLE_OBJECT:
              return !!a.contains(this.element);
            case CKEDITOR.STYLE_BLOCK:
              return !!a.blockLimit.getDtd()[this.element]
          }
          return !0
        },
        checkElementMatch: function(a, b) {
          var c = this._.definition;
          if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
          var d = a.getName();
          if ("string" == typeof this.element ? d == this.element : d in this.element) {
            if (!b && !a.hasAttributes()) return !0;
            if (d = c._AC) c = d;
            else {
              var d = {},
                e = 0,
                f = c.attributes;
              if (f)
                for (var g in f) e++, d[g] = f[g];
              if (g = CKEDITOR.style.getStyleText(c)) d.style || e++, d.style = g;
              d._length = e;
              c = c._AC = d
            }
            if (c._length) {
              for (var h in c)
                if ("_length" != h) {
                  e = a.getAttribute(h) || "";
                  if ("style" == h) a: {
                    d = c[h];
                    "string" == typeof d &&
                    (d = CKEDITOR.tools.parseCssText(d));
                    "string" == typeof e && (e = CKEDITOR.tools.parseCssText(e, !0));g = void 0;
                    for (g in d)
                      if (!(g in e) || e[g] != d[g] && "inherit" != d[g] && "inherit" != e[g]) {
                        d = !1;
                        break a
                      }
                    d = !0
                  }
                  else d = c[h] == e;
                  if (d) {
                    if (!b) return !0
                  } else if (b) return !1
                }
              if (b) return !0
            } else return !0
          }
          return !1
        },
        checkElementRemovable: function(a, b, c) {
          if (this.checkElementMatch(a, b, c)) return !0;
          if (b = k(this)[a.getName()]) {
            var d;
            if (!(b = b.attributes)) return !0;
            for (c = 0; c < b.length; c++)
              if (d = b[c][0], d = a.getAttribute(d)) {
                var e = b[c][1];
                if (null ===
                  e) return !0;
                if ("string" == typeof e) {
                  if (d == e) return !0
                } else if (e.test(d)) return !0
              }
          }
          return !1
        },
        buildPreview: function(a) {
          var b = this._.definition,
            c = [],
            d = b.element;
          "bdo" == d && (d = "span");
          var c = ["\x3c", d],
            e = b.attributes;
          if (e)
            for (var f in e) c.push(" ", f, '\x3d"', e[f], '"');
          (e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"');
          c.push("\x3e", a || b.name, "\x3c/", d, "\x3e");
          return c.join("")
        },
        getDefinition: function() {
          return this._.definition
        }
      };
      CKEDITOR.style.getStyleText = function(a) {
        var b = a._ST;
        if (b) return b;
        var b = a.styles,
          c = a.attributes && a.attributes.style || "",
          d = "";
        c.length && (c = c.replace(F, ";"));
        for (var e in b) {
          var f = b[e],
            g = (e + ":" + f).replace(F, ";");
          "inherit" == f ? d += g : c += g
        }
        c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0));
        return a._ST = c + d
      };
      CKEDITOR.style.customHandlers = {};
      CKEDITOR.style.addCustomHandler = function(a) {
        var b = function(a) {
          this._ = {
            definition: a
          };
          this.setup && this.setup(a)
        };
        b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), {
            assignedTo: CKEDITOR.STYLE_OBJECT
          },
          a, !0);
        return this.customHandlers[a.type] = b
      };
      var M = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
        S = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    })();
    CKEDITOR.styleCommand = function(a, d) {
      this.requiredContent = this.allowedContent = this.style = a;
      CKEDITOR.tools.extend(this, d, !0)
    };
    CKEDITOR.styleCommand.prototype.exec = function(a) {
      a.focus();
      this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style)
    };
    CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet");
    CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet);
    CKEDITOR.loadStylesSet = function(a, d, b) {
      CKEDITOR.stylesSet.addExternal(a, d, "");
      CKEDITOR.stylesSet.load(a, b)
    };
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
      attachStyleStateChange: function(a, d) {
        var b = this._.styleStateChangeCallbacks;
        b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(a) {
          for (var d = 0; d < b.length; d++) {
            var g = b[d],
              h = g.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
            g.fn.call(this, h)
          }
        }));
        b.push({
          style: a,
          fn: d
        })
      },
      applyStyle: function(a) {
        a.apply(this)
      },
      removeStyle: function(a) {
        a.remove(this)
      },
      getStylesSet: function(a) {
        if (this._.stylesDefinitions) a(this._.stylesDefinitions);
        else {
          var d = this,
            b = d.config.stylesCombo_stylesSet || d.config.stylesSet;
          if (!1 === b) a(null);
          else if (b instanceof Array) d._.stylesDefinitions = b, a(b);
          else {
            b || (b = "default");
            var b = b.split(":"),
              c = b[0];
            CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
            CKEDITOR.stylesSet.load(c, function(b) {
              d._.stylesDefinitions = b[c];
              a(d._.stylesDefinitions)
            })
          }
        }
      }
    });
    CKEDITOR.dom.comment = function(a, d) {
      "string" == typeof a && (a = (d ? d.$ : document).createComment(a));
      CKEDITOR.dom.domObject.call(this, a)
    };
    CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
      type: CKEDITOR.NODE_COMMENT,
      getOuterHtml: function() {
        return "\x3c!--" + this.$.nodeValue + "--\x3e"
      }
    });
    "use strict";
    (function() {
      var a = {},
        d = {},
        b;
      for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
      for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (d[b] = 1);
      CKEDITOR.dom.elementPath = function(b, e) {
        var g = null,
          h = null,
          l = [],
          q = b,
          t;
        e = e || b.getDocument().getBody();
        do
          if (q.type == CKEDITOR.NODE_ELEMENT) {
            l.push(q);
            if (!this.lastElement && (this.lastElement = q, q.is(CKEDITOR.dtd.$object) || "false" == q.getAttribute("contenteditable"))) continue;
            if (q.equals(e)) break;
            if (!h && (t = q.getName(),
                "true" == q.getAttribute("contenteditable") ? h = q : !g && d[t] && (g = q), a[t])) {
              if (t = !g && "div" == t) {
                a: {
                  t = q.getChildren();
                  for (var f = 0, z = t.count(); f < z; f++) {
                    var A = t.getItem(f);
                    if (A.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[A.getName()]) {
                      t = !0;
                      break a
                    }
                  }
                  t = !1
                }
                t = !t
              }
              t ? g = q : h = q
            }
          }
        while (q = q.getParent());
        h || (h = e);
        this.block = g;
        this.blockLimit = h;
        this.root = e;
        this.elements = l
      }
    })();
    CKEDITOR.dom.elementPath.prototype = {
      compare: function(a) {
        var d = this.elements;
        a = a && a.elements;
        if (!a || d.length != a.length) return !1;
        for (var b = 0; b < d.length; b++)
          if (!d[b].equals(a[b])) return !1;
        return !0
      },
      contains: function(a, d, b) {
        var c;
        "string" == typeof a && (c = function(b) {
          return b.getName() == a
        });
        a instanceof CKEDITOR.dom.element ? c = function(b) {
          return b.equals(a)
        } : CKEDITOR.tools.isArray(a) ? c = function(b) {
          return -1 < CKEDITOR.tools.indexOf(a, b.getName())
        } : "function" == typeof a ? c = a : "object" == typeof a && (c = function(b) {
          return b.getName() in
            a
        });
        var e = this.elements,
          g = e.length;
        d && g--;
        b && (e = Array.prototype.slice.call(e, 0), e.reverse());
        for (d = 0; d < g; d++)
          if (c(e[d])) return e[d];
        return null
      },
      isContextFor: function(a) {
        var d;
        return a in CKEDITOR.dtd.$block ? (d = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!d.getDtd()[a]) : !0
      },
      direction: function() {
        return (this.block || this.blockLimit || this.root).getDirection(1)
      }
    };
    CKEDITOR.dom.text = function(a, d) {
      "string" == typeof a && (a = (d ? d.$ : document).createTextNode(a));
      this.$ = a
    };
    CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
      type: CKEDITOR.NODE_TEXT,
      getLength: function() {
        return this.$.nodeValue.length
      },
      getText: function() {
        return this.$.nodeValue
      },
      setText: function(a) {
        this.$.nodeValue = a
      },
      split: function(a) {
        var d = this.$.parentNode,
          b = d.childNodes.length,
          c = this.getLength(),
          e = this.getDocument(),
          g = new CKEDITOR.dom.text(this.$.splitText(a), e);
        d.childNodes.length == b && (a >= c ? (g = e.createText(""), g.insertAfter(this)) : (a = e.createText(""), a.insertAfter(g), a.remove()));
        return g
      },
      substring: function(a,
        d) {
        return "number" != typeof d ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, d)
      }
    });
    (function() {
      function a(a, c, d) {
        var g = a.serializable,
          h = c[d ? "endContainer" : "startContainer"],
          l = d ? "endOffset" : "startOffset",
          q = g ? c.document.getById(a.startNode) : a.startNode;
        a = g ? c.document.getById(a.endNode) : a.endNode;
        h.equals(q.getPrevious()) ? (c.startOffset = c.startOffset - h.getLength() - a.getPrevious().getLength(), h = a.getNext()) : h.equals(a.getPrevious()) && (c.startOffset -= h.getLength(), h = a.getNext());
        h.equals(q.getParent()) && c[l]++;
        h.equals(a.getParent()) && c[l]++;
        c[d ? "endContainer" : "startContainer"] = h;
        return c
      }
      CKEDITOR.dom.rangeList = function(a) {
        if (a instanceof CKEDITOR.dom.rangeList) return a;
        a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
        return CKEDITOR.tools.extend(a, d)
      };
      var d = {
        createIterator: function() {
          var a = this,
            c = CKEDITOR.dom.walker.bookmark(),
            d = [],
            g;
          return {
            getNextRange: function(h) {
              g = void 0 === g ? 0 : g + 1;
              var l = a[g];
              if (l && 1 < a.length) {
                if (!g)
                  for (var q = a.length - 1; 0 <= q; q--) d.unshift(a[q].createBookmark(!0));
                if (h)
                  for (var t = 0; a[g + t + 1];) {
                    var f = l.document;
                    h = 0;
                    q = f.getById(d[t].endNode);
                    for (f = f.getById(d[t + 1].startNode);;) {
                      q =
                        q.getNextSourceNode(!1);
                      if (f.equals(q)) h = 1;
                      else if (c(q) || q.type == CKEDITOR.NODE_ELEMENT && q.isBlockBoundary()) continue;
                      break
                    }
                    if (!h) break;
                    t++
                  }
                for (l.moveToBookmark(d.shift()); t--;) q = a[++g], q.moveToBookmark(d.shift()), l.setEnd(q.endContainer, q.endOffset)
              }
              return l
            }
          }
        },
        createBookmarks: function(b) {
          for (var c = [], d, g = 0; g < this.length; g++) {
            c.push(d = this[g].createBookmark(b, !0));
            for (var h = g + 1; h < this.length; h++) this[h] = a(d, this[h]), this[h] = a(d, this[h], !0)
          }
          return c
        },
        createBookmarks2: function(a) {
          for (var c = [], d = 0; d <
            this.length; d++) c.push(this[d].createBookmark2(a));
          return c
        },
        moveToBookmarks: function(a) {
          for (var c = 0; c < this.length; c++) this[c].moveToBookmark(a[c])
        }
      }
    })();
    (function() {
      function a() {
        return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
      }

      function d(b) {
        var c = CKEDITOR.skin["ua_" + b],
          d = CKEDITOR.env;
        if (c)
          for (var c = c.split(",").sort(function(a, b) {
              return a > b ? -1 : 1
            }), e = 0, g; e < c.length; e++)
            if (g = c[e], d.ie && (g.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == g) && (g = "ie"), d[g]) {
              b += "_" + c[e];
              break
            }
        return CKEDITOR.getUrl(a() + b + ".css")
      }

      function b(a, b) {
        g[a] || (CKEDITOR.document.appendStyleSheet(d(a)), g[a] = 1);
        b && b()
      }

      function c(a) {
        var b =
          a.getById(h);
        b || (b = a.getHead().append("style"), b.setAttribute("id", h), b.setAttribute("type", "text/css"));
        return b
      }

      function e(a, b, c) {
        var d, e, g;
        if (CKEDITOR.env.webkit)
          for (b = b.split("}").slice(0, -1), e = 0; e < b.length; e++) b[e] = b[e].split("{");
        for (var h = 0; h < a.length; h++)
          if (CKEDITOR.env.webkit)
            for (e = 0; e < b.length; e++) {
              g = b[e][1];
              for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]);
              a[h].$.sheet.addRule(b[e][0], g)
            } else {
              g = b;
              for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]);
              CKEDITOR.env.ie && 11 > CKEDITOR.env.version ?
                a[h].$.styleSheet.cssText += g : a[h].$.innerHTML += g
            }
      }
      var g = {};
      CKEDITOR.skin = {
        path: a,
        loadPart: function(c, d) {
          CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() {
            b(c, d)
          }) : b(c, d)
        },
        getPath: function(a) {
          return CKEDITOR.getUrl(d(a))
        },
        icons: {},
        addIcon: function(a, b, c, d) {
          a = a.toLowerCase();
          this.icons[a] || (this.icons[a] = {
            path: b,
            offset: c || 0,
            bgsize: d || "16px"
          })
        },
        getIconStyle: function(a, b, c, d, e) {
          var g;
          a && (a = a.toLowerCase(), b && (g = this.icons[a + "-rtl"]),
            g || (g = this.icons[a]));
          a = c || g && g.path || "";
          d = d || g && g.offset;
          e = e || g && g.bgsize || "16px";
          a && (a = a.replace(/'/g, "\\'"));
          return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + e + ";"
        }
      };
      CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        getUiColor: function() {
          return this.uiColor
        },
        setUiColor: function(a) {
          var b = c(CKEDITOR.document);
          return (this.setUiColor = function(a) {
            this.uiColor = a;
            var c = CKEDITOR.skin.chameleon,
              d = "",
              g = "";
            "function" == typeof c && (d = c(this, "editor"), g =
              c(this, "panel"));
            a = [
              [q, a]
            ];
            e([b], d, a);
            e(l, g, a)
          }).call(this, a)
        }
      });
      var h = "cke_ui_color",
        l = [],
        q = /\$color/g;
      CKEDITOR.on("instanceLoaded", function(a) {
        if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
          var b = a.editor;
          a = function(a) {
            a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
            if (!a.getById("cke_ui_color")) {
              a = c(a);
              l.push(a);
              var d = b.getUiColor();
              d && e([a], CKEDITOR.skin.chameleon(b, "panel"), [
                [q, d]
              ])
            }
          };
          b.on("panelShow", a);
          b.on("menuShow", a);
          b.config.uiColor && b.setUiColor(b.config.uiColor)
        }
      })
    })();
    (function() {
      if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1;
      else {
        var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
        a.appendTo(CKEDITOR.document.getHead());
        try {
          var d = a.getComputedStyle("border-top-color"),
            b = a.getComputedStyle("border-right-color");
          CKEDITOR.env.hc = !(!d || d != b)
        } catch (c) {
          CKEDITOR.env.hc = !1
        }
        a.remove()
      }
      CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc");
      CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
      CKEDITOR.status = "loaded";
      CKEDITOR.fireOnce("loaded");
      if (a = CKEDITOR._.pending)
        for (delete CKEDITOR._.pending, d = 0; d < a.length; d++) CKEDITOR.editor.prototype.constructor.apply(a[d][0], a[d][1]), CKEDITOR.add(a[d][0])
    })();
    /*
     Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
     For licensing, see LICENSE.md or http://ckeditor.com/license
    */
    CKEDITOR.skin.name = "moono";
    CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko";
    CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8";
    CKEDITOR.skin.chameleon = function() {
      var b = function() {
          return function(b, e) {
            for (var a = b.match(/[^#]./g), c = 0; 3 > c; c++) {
              var f = c,
                d;
              d = parseInt(a[c], 16);
              d = ("0" + (0 > e ? 0 | d * (1 + e) : 0 | d + (255 - d) * e).toString(16)).slice(-2);
              a[f] = d
            }
            return "#" + a.join("")
          }
        }(),
        c = function() {
          var b = new CKEDITOR.template("background:#{to};background-image:linear-gradient(to bottom,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType\x3d0,startColorstr\x3d'{from}',endColorstr\x3d'{to}');");
          return function(c, a) {
            return b.output({
              from: c,
              to: a
            })
          }
        }(),
        f = {
          editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
          panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
      return function(g, e) {
        var a = g.uiColor,
          a = {
            id: "." + g.id,
            defaultBorder: b(a, -.1),
            defaultGradient: c(b(a, .9), a),
            lightGradient: c(b(a, 1), b(a, .7)),
            mediumGradient: c(b(a, .8), b(a, .5)),
            ckeButtonOn: c(b(a, .6), b(a, .7)),
            ckeResizer: b(a, -.4),
            ckeToolbarSeparator: b(a, .5),
            ckeColorauto: b(a, .8),
            dialogBody: b(a, .7),
            dialogTabSelected: c("#FFFFFF", "#FFFFFF"),
            dialogTabSelectedBorder: "#FFF",
            elementsPathColor: b(a, -.6),
            elementsPathBg: a,
            menubuttonIcon: b(a, .5),
            menubuttonIconHover: b(a, .3)
          };
        return f[e].output(a).replace(/\[/g, "{").replace(/\]/g,
          "}")
      }
    }();
    CKEDITOR.plugins.add("dialogui", {
      onLoad: function() {
        var h = function(b) {
            this._ || (this._ = {});
            this._["default"] = this._.initValue = b["default"] || "";
            this._.required = b.required || !1;
            for (var a = [this._], d = 1; d < arguments.length; d++) a.push(arguments[d]);
            a.push(!0);
            CKEDITOR.tools.extend.apply(CKEDITOR.tools, a);
            return this._
          },
          v = {
            build: function(b, a, d) {
              return new CKEDITOR.ui.dialog.textInput(b, a, d)
            }
          },
          n = {
            build: function(b, a, d) {
              return new CKEDITOR.ui.dialog[a.type](b, a, d)
            }
          },
          q = {
            isChanged: function() {
              return this.getValue() !=
                this.getInitValue()
            },
            reset: function(b) {
              this.setValue(this.getInitValue(), b)
            },
            setInitValue: function() {
              this._.initValue = this.getValue()
            },
            resetInitValue: function() {
              this._.initValue = this._["default"]
            },
            getInitValue: function() {
              return this._.initValue
            }
          },
          r = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
            onChange: function(b, a) {
              this._.domOnChangeRegistered || (b.on("load", function() {
                this.getInputElement().on("change", function() {
                    b.parts.dialog.isVisible() && this.fire("change", {
                      value: this.getValue()
                    })
                  },
                  this)
              }, this), this._.domOnChangeRegistered = !0);
              this.on("change", a)
            }
          }, !0),
          x = /^on([A-Z]\w+)/,
          t = function(b) {
            for (var a in b)(x.test(a) || "title" == a || "type" == a) && delete b[a];
            return b
          },
          w = function(b) {
            b = b.data.getKeystroke();
            b == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : b == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
          };
        CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
          labeledElement: function(b, a, d, f) {
            if (!(4 > arguments.length)) {
              var c = h.call(this, a);
              c.labelId = CKEDITOR.tools.getNextId() +
                "_label";
              this._.children = [];
              var e = {
                role: a.role || "presentation"
              };
              a.includeLabel && (e["aria-labelledby"] = c.labelId);
              CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "div", null, e, function() {
                var e = [],
                  g = a.required ? " cke_required" : "";
                "horizontal" != a.labelLayout ? e.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + c.labelId + '"', c.inputId ? ' for\x3d"' + c.inputId + '"' : "", (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", a.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                  a.controlStyle ? ' style\x3d"' + a.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, a), "\x3c/div\x3e") : (g = {
                  type: "hbox",
                  widths: a.widths,
                  padding: 0,
                  children: [{
                    type: "html",
                    html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + c.labelId + '" for\x3d"' + c.inputId + '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(a.label) + "\x3c/label\x3e"
                  }, {
                    type: "html",
                    html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style\x3d"' + a.controlStyle +
                      '"' : "") + "\x3e" + f.call(this, b, a) + "\x3c/span\x3e"
                  }]
                }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, e));
                return e.join("")
              })
            }
          },
          textInput: function(b, a, d) {
            if (!(3 > arguments.length)) {
              h.call(this, a);
              var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                c = {
                  "class": "cke_dialog_ui_input_" + a.type,
                  id: f,
                  type: a.type
                };
              a.validate && (this.validate = a.validate);
              a.maxLength && (c.maxlength = a.maxLength);
              a.size && (c.size = a.size);
              a.inputStyle && (c.style = a.inputStyle);
              var e = this,
                m = !1;
              b.on("load", function() {
                e.getInputElement().on("keydown",
                  function(a) {
                    13 == a.data.getKeystroke() && (m = !0)
                  });
                e.getInputElement().on("keyup", function(a) {
                  13 == a.data.getKeystroke() && m && (b.getButton("ok") && setTimeout(function() {
                    b.getButton("ok").click()
                  }, 0), m = !1);
                  e.bidi && w.call(e, a)
                }, null, null, 1E3)
              });
              CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                var b = ['\x3cdiv class\x3d"cke_dialog_ui_input_', a.type, '" role\x3d"presentation"'];
                a.width && b.push('style\x3d"width:' + a.width + '" ');
                b.push("\x3e\x3cinput ");
                c["aria-labelledby"] = this._.labelId;
                this._.required &&
                  (c["aria-required"] = this._.required);
                for (var e in c) b.push(e + '\x3d"' + c[e] + '" ');
                b.push(" /\x3e\x3c/div\x3e");
                return b.join("")
              })
            }
          },
          textarea: function(b, a, d) {
            if (!(3 > arguments.length)) {
              h.call(this, a);
              var f = this,
                c = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                e = {};
              a.validate && (this.validate = a.validate);
              e.rows = a.rows || 5;
              e.cols = a.cols || 20;
              e["class"] = "cke_dialog_ui_input_textarea " + (a["class"] || "");
              "undefined" != typeof a.inputStyle && (e.style = a.inputStyle);
              a.dir && (e.dir = a.dir);
              if (f.bidi) b.on("load",
                function() {
                  f.getInputElement().on("keyup", w)
                }, f);
              CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                e["aria-labelledby"] = this._.labelId;
                this._.required && (e["aria-required"] = this._.required);
                var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', c, '" '],
                  b;
                for (b in e) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(e[b]) + '" ');
                a.push("\x3e", CKEDITOR.tools.htmlEncode(f._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
                return a.join("")
              })
            }
          },
          checkbox: function(b,
            a, d) {
            if (!(3 > arguments.length)) {
              var f = h.call(this, a, {
                "default": !!a["default"]
              });
              a.validate && (this.validate = a.validate);
              CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "span", null, null, function() {
                var c = CKEDITOR.tools.extend({}, a, {
                    id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                  }, !0),
                  e = [],
                  d = CKEDITOR.tools.getNextId() + "_label",
                  g = {
                    "class": "cke_dialog_ui_checkbox_input",
                    type: "checkbox",
                    "aria-labelledby": d
                  };
                t(c);
                a["default"] && (g.checked = "checked");
                "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, e, "input", null, g);
                e.push(' \x3clabel id\x3d"', d, '" for\x3d"', g.id, '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(a.label), "\x3c/label\x3e");
                return e.join("")
              })
            }
          },
          radio: function(b, a, d) {
            if (!(3 > arguments.length)) {
              h.call(this, a);
              this._["default"] || (this._["default"] = this._.initValue = a.items[0][1]);
              a.validate && (this.validate = a.validate);
              var f = [],
                c = this;
              a.role = "radiogroup";
              a.includeLabel = !0;
              CKEDITOR.ui.dialog.labeledElement.call(this,
                b, a, d,
                function() {
                  for (var e = [], d = [], g = (a.id ? a.id : CKEDITOR.tools.getNextId()) + "_radio", k = 0; k < a.items.length; k++) {
                    var l = a.items[k],
                      h = void 0 !== l[2] ? l[2] : l[0],
                      n = void 0 !== l[1] ? l[1] : l[0],
                      p = CKEDITOR.tools.getNextId() + "_radio_input",
                      q = p + "_label",
                      p = CKEDITOR.tools.extend({}, a, {
                        id: p,
                        title: null,
                        type: null
                      }, !0),
                      h = CKEDITOR.tools.extend({}, p, {
                        title: h
                      }, !0),
                      r = {
                        type: "radio",
                        "class": "cke_dialog_ui_radio_input",
                        name: g,
                        value: n,
                        "aria-labelledby": q
                      },
                      u = [];
                    c._["default"] == n && (r.checked = "checked");
                    t(p);
                    t(h);
                    "undefined" != typeof p.inputStyle &&
                      (p.style = p.inputStyle);
                    p.keyboardFocusable = !0;
                    f.push(new CKEDITOR.ui.dialog.uiElement(b, p, u, "input", null, r));
                    u.push(" ");
                    new CKEDITOR.ui.dialog.uiElement(b, h, u, "label", null, {
                      id: q,
                      "for": r.id
                    }, l[0]);
                    e.push(u.join(""))
                  }
                  new CKEDITOR.ui.dialog.hbox(b, f, e, d);
                  return d.join("")
                });
              this._.children = f
            }
          },
          button: function(b, a, d) {
            if (arguments.length) {
              "function" == typeof a && (a = a(b.getParentEditor()));
              h.call(this, a, {
                disabled: a.disabled || !1
              });
              CKEDITOR.event.implementOn(this);
              var f = this;
              b.on("load", function() {
                var a = this.getElement();
                (function() {
                  a.on("click", function(a) {
                    f.click();
                    a.data.preventDefault()
                  });
                  a.on("keydown", function(a) {
                    a.data.getKeystroke() in {
                      32: 1
                    } && (f.click(), a.data.preventDefault())
                  })
                })();
                a.unselectable()
              }, this);
              var c = CKEDITOR.tools.extend({}, a);
              delete c.style;
              var e = CKEDITOR.tools.getNextId() + "_label";
              CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "a", null, {
                  style: a.style,
                  href: "javascript:void(0)",
                  title: a.label,
                  hidefocus: "true",
                  "class": a["class"],
                  role: "button",
                  "aria-labelledby": e
                }, '\x3cspan id\x3d"' + e + '" class\x3d"cke_dialog_ui_button"\x3e' +
                CKEDITOR.tools.htmlEncode(a.label) + "\x3c/span\x3e")
            }
          },
          select: function(b, a, d) {
            if (!(3 > arguments.length)) {
              var f = h.call(this, a);
              a.validate && (this.validate = a.validate);
              f.inputId = CKEDITOR.tools.getNextId() + "_select";
              CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                var c = CKEDITOR.tools.extend({}, a, {
                    id: a.id ? a.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                  }, !0),
                  e = [],
                  d = [],
                  g = {
                    id: f.inputId,
                    "class": "cke_dialog_ui_input_select",
                    "aria-labelledby": this._.labelId
                  };
                e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                  a.type, '" role\x3d"presentation"');
                a.width && e.push('style\x3d"width:' + a.width + '" ');
                e.push("\x3e");
                void 0 !== a.size && (g.size = a.size);
                void 0 !== a.multiple && (g.multiple = a.multiple);
                t(c);
                for (var k = 0, l; k < a.items.length && (l = a.items[k]); k++) d.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(l[0]));
                "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                f.select = new CKEDITOR.ui.dialog.uiElement(b, c, e, "select", null,
                  g, d.join(""));
                e.push("\x3c/div\x3e");
                return e.join("")
              })
            }
          },
          file: function(b, a, d) {
            if (!(3 > arguments.length)) {
              void 0 === a["default"] && (a["default"] = "");
              var f = CKEDITOR.tools.extend(h.call(this, a), {
                definition: a,
                buttons: []
              });
              a.validate && (this.validate = a.validate);
              b.on("load", function() {
                CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file")
              });
              CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                f.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                var b = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                  f.frameId, '" title\x3d"', a.label, '" src\x3d"javascript:void('
                ];
                b.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                b.push(')"\x3e\x3c/iframe\x3e');
                return b.join("")
              })
            }
          },
          fileButton: function(b, a, d) {
            var f = this;
            if (!(3 > arguments.length)) {
              h.call(this, a);
              a.validate && (this.validate = a.validate);
              var c = CKEDITOR.tools.extend({}, a),
                e = c.onClick;
              c.className = (c.className ? c.className + " " : "") + "cke_dialog_ui_button";
              c.onClick = function(c) {
                var d =
                  a["for"];
                e && !1 === e.call(this, c) || (b.getContentElement(d[0], d[1]).submit(), this.disable())
              };
              b.on("load", function() {
                b.getContentElement(a["for"][0], a["for"][1])._.buttons.push(f)
              });
              CKEDITOR.ui.dialog.button.call(this, b, c, d)
            }
          },
          html: function() {
            var b = /^\s*<[\w:]+\s+([^>]*)?>/,
              a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
              d = /\/$/;
            return function(f, c, e) {
              if (!(3 > arguments.length)) {
                var m = [],
                  g = c.html;
                "\x3c" != g.charAt(0) && (g = "\x3cspan\x3e" + g + "\x3c/span\x3e");
                var k = c.focus;
                if (k) {
                  var l = this.focus;
                  this.focus = function() {
                    ("function" ==
                      typeof k ? k : l).call(this);
                    this.fire("focus")
                  };
                  c.isFocusable && (this.isFocusable = this.isFocusable);
                  this.keyboardFocusable = !0
                }
                CKEDITOR.ui.dialog.uiElement.call(this, f, c, m, "span", null, null, "");
                m = m.join("").match(b);
                g = g.match(a) || ["", "", ""];
                d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = "/" + g[2]);
                e.push([g[1], " ", m[1] || "", g[2]].join(""))
              }
            }
          }(),
          fieldset: function(b, a, d, f, c) {
            var e = c.label;
            this._ = {
              children: a
            };
            CKEDITOR.ui.dialog.uiElement.call(this, b, c, f, "fieldset", null, null, function() {
              var a = [];
              e && a.push("\x3clegend" +
                (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + e + "\x3c/legend\x3e");
              for (var b = 0; b < d.length; b++) a.push(d[b]);
              return a.join("")
            })
          }
        }, !0);
        CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
        CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          setLabel: function(b) {
            var a = CKEDITOR.document.getById(this._.labelId);
            1 > a.getChildCount() ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue = b;
            return this
          },
          getLabel: function() {
            var b =
              CKEDITOR.document.getById(this._.labelId);
            return !b || 1 > b.getChildCount() ? "" : b.getChild(0).getText()
          },
          eventProcessors: r
        }, !0);
        CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          click: function() {
            return this._.disabled ? !1 : this.fire("click", {
              dialog: this._.dialog
            })
          },
          enable: function() {
            this._.disabled = !1;
            var b = this.getElement();
            b && b.removeClass("cke_disabled")
          },
          disable: function() {
            this._.disabled = !0;
            this.getElement().addClass("cke_disabled")
          },
          isVisible: function() {
            return this.getElement().getFirst().isVisible()
          },
          isEnabled: function() {
            return !this._.disabled
          },
          eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
            onClick: function(b, a) {
              this.on("click", function() {
                a.apply(this, arguments)
              })
            }
          }, !0),
          accessKeyUp: function() {
            this.click()
          },
          accessKeyDown: function() {
            this.focus()
          },
          keyboardFocusable: !0
        }, !0);
        CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
          getInputElement: function() {
            return CKEDITOR.document.getById(this._.inputId)
          },
          focus: function() {
            var b = this.selectParentTab();
            setTimeout(function() {
              var a = b.getInputElement();
              a && a.$.focus()
            }, 0)
          },
          select: function() {
            var b = this.selectParentTab();
            setTimeout(function() {
              var a = b.getInputElement();
              a && (a.$.focus(), a.$.select())
            }, 0)
          },
          accessKeyUp: function() {
            this.select()
          },
          setValue: function(b) {
            if (this.bidi) {
              var a = b && b.charAt(0);
              (a = "‪" == a ? "ltr" : "‫" == a ? "rtl" : null) && (b = b.slice(1));
              this.setDirectionMarker(a)
            }
            b || (b = "");
            return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
          },
          getValue: function() {
            var b = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
            if (this.bidi && b) {
              var a = this.getDirectionMarker();
              a && (b = ("ltr" == a ? "‪" : "‫") + b)
            }
            return b
          },
          setDirectionMarker: function(b) {
            var a = this.getInputElement();
            b ? a.setAttributes({
              dir: b,
              "data-cke-dir-marker": b
            }) : this.getDirectionMarker() && a.removeAttributes(["dir", "data-cke-dir-marker"])
          },
          getDirectionMarker: function() {
            return this.getInputElement().data("cke-dir-marker")
          },
          keyboardFocusable: !0
        }, q, !0);
        CKEDITOR.ui.dialog.textarea.prototype =
          new CKEDITOR.ui.dialog.textInput;
        CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
          getInputElement: function() {
            return this._.select.getElement()
          },
          add: function(b, a, d) {
            var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
              c = this.getInputElement().$;
            f.$.text = b;
            f.$.value = void 0 === a || null === a ? b : a;
            void 0 === d || null === d ? CKEDITOR.env.ie ? c.add(f.$) : c.add(f.$, null) : c.add(f.$, d);
            return this
          },
          remove: function(b) {
            this.getInputElement().$.remove(b);
            return this
          },
          clear: function() {
            for (var b = this.getInputElement().$; 0 < b.length;) b.remove(0);
            return this
          },
          keyboardFocusable: !0
        }, q, !0);
        CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          getInputElement: function() {
            return this._.checkbox.getElement()
          },
          setValue: function(b, a) {
            this.getInputElement().$.checked = b;
            !a && this.fire("change", {
              value: b
            })
          },
          getValue: function() {
            return this.getInputElement().$.checked
          },
          accessKeyUp: function() {
            this.setValue(!this.getValue())
          },
          eventProcessors: {
            onChange: function(b,
              a) {
              if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments);
              b.on("load", function() {
                var a = this._.checkbox.getElement();
                a.on("propertychange", function(b) {
                  b = b.data.$;
                  "checked" == b.propertyName && this.fire("change", {
                    value: a.$.checked
                  })
                }, this)
              }, this);
              this.on("change", a);
              return null
            }
          },
          keyboardFocusable: !0
        }, q, !0);
        CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
          setValue: function(b, a) {
            for (var d = this._.children, f, c = 0; c < d.length && (f = d[c]); c++) f.getElement().$.checked =
              f.getValue() == b;
            !a && this.fire("change", {
              value: b
            })
          },
          getValue: function() {
            for (var b = this._.children, a = 0; a < b.length; a++)
              if (b[a].getElement().$.checked) return b[a].getValue();
            return null
          },
          accessKeyUp: function() {
            var b = this._.children,
              a;
            for (a = 0; a < b.length; a++)
              if (b[a].getElement().$.checked) {
                b[a].getElement().focus();
                return
              }
            b[0].getElement().focus()
          },
          eventProcessors: {
            onChange: function(b, a) {
              if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments);
              b.on("load", function() {
                for (var a =
                    this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
                  a = a.data.$;
                  "checked" == a.propertyName && this.$.checked && b.fire("change", {
                    value: this.getAttribute("value")
                  })
                })
              }, this);
              this.on("change", a);
              return null
            }
          }
        }, q, !0);
        CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, q, {
          getInputElement: function() {
            var b = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
            return 0 < b.$.forms.length ? new CKEDITOR.dom.element(b.$.forms[0].elements[0]) :
              this.getElement()
          },
          submit: function() {
            this.getInputElement().getParent().$.submit();
            return this
          },
          getAction: function() {
            return this.getInputElement().getParent().$.action
          },
          registerEvents: function(b) {
            var a = /^on([A-Z]\w+)/,
              d, f = function(a, b, c, d) {
                a.on("formLoaded", function() {
                  a.getInputElement().on(c, d, a)
                })
              },
              c;
            for (c in b)
              if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : f(this, this._.dialog, d[1].toLowerCase(), b[c]);
            return this
          },
          reset: function() {
            function b() {
              d.$.open();
              var b = "";
              f.size && (b = f.size - (CKEDITOR.env.ie ? 7 : 0));
              var h = a.frameId + "_input";
              d.$.write(['\x3chtml dir\x3d"' + g + '" lang\x3d"' + k + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + g + '" lang\x3d"' + k + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', a.labelId, '" for\x3d"', h, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
                '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', h, '" aria-labelledby\x3d"', a.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < b ? b : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + m + ")}", "\x3c/script\x3e"
              ].join(""));
              d.$.close();
              for (b = 0; b < c.length; b++) c[b].enable()
            }
            var a = this._,
              d = CKEDITOR.document.getById(a.frameId).getFrameDocument(),
              f = a.definition,
              c = a.buttons,
              e = this.formLoadedNumber,
              m = this.formUnloadNumber,
              g = a.dialog._.editor.lang.dir,
              k = a.dialog._.editor.langCode;
            e || (e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
              this.fire("formLoaded")
            }, this), m = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
              this.getInputElement().clearCustomData()
            }, this), this.getDialog()._.editor.on("destroy", function() {
              CKEDITOR.tools.removeFunction(e);
              CKEDITOR.tools.removeFunction(m)
            }));
            CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
          },
          getValue: function() {
            return this.getInputElement().$.value || ""
          },
          setInitValue: function() {
            this._.initValue = ""
          },
          eventProcessors: {
            onChange: function(b, a) {
              this._.domOnChangeRegistered || (this.on("formLoaded", function() {
                this.getInputElement().on("change", function() {
                  this.fire("change", {
                    value: this.getValue()
                  })
                }, this)
              }, this), this._.domOnChangeRegistered = !0);
              this.on("change", a)
            }
          },
          keyboardFocusable: !0
        }, !0);
        CKEDITOR.ui.dialog.fileButton.prototype =
          new CKEDITOR.ui.dialog.button;
        CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
        CKEDITOR.dialog.addUIElement("text", v);
        CKEDITOR.dialog.addUIElement("password", v);
        CKEDITOR.dialog.addUIElement("textarea", n);
        CKEDITOR.dialog.addUIElement("checkbox", n);
        CKEDITOR.dialog.addUIElement("radio", n);
        CKEDITOR.dialog.addUIElement("button", n);
        CKEDITOR.dialog.addUIElement("select", n);
        CKEDITOR.dialog.addUIElement("file", n);
        CKEDITOR.dialog.addUIElement("fileButton", n);
        CKEDITOR.dialog.addUIElement("html",
          n);
        CKEDITOR.dialog.addUIElement("fieldset", {
          build: function(b, a, d) {
            for (var f = a.children, c, e = [], h = [], g = 0; g < f.length && (c = f[g]); g++) {
              var k = [];
              e.push(k);
              h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, k))
            }
            return new CKEDITOR.ui.dialog[a.type](b, h, e, d, a)
          }
        })
      }
    });
    CKEDITOR.DIALOG_RESIZE_NONE = 0;
    CKEDITOR.DIALOG_RESIZE_WIDTH = 1;
    CKEDITOR.DIALOG_RESIZE_HEIGHT = 2;
    CKEDITOR.DIALOG_RESIZE_BOTH = 3;
    CKEDITOR.DIALOG_STATE_IDLE = 1;
    CKEDITOR.DIALOG_STATE_BUSY = 2;
    (function() {
      function x() {
        for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
          if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
        return null
      }

      function A() {
        for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
          if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
        return null
      }

      function K(a, b) {
        for (var c = a.$.getElementsByTagName("input"),
            d = 0, e = c.length; d < e; d++) {
          var f = new CKEDITOR.dom.element(c[d]);
          "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", "")))
        }
      }

      function T(a, b) {
        var c = this.getInputElement();
        c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
        a || (this.select ? this.select() : this.focus());
        b && alert(b);
        this.fire("validated", {
          valid: a,
          msg: b
        })
      }

      function U() {
        var a = this.getInputElement();
        a && a.removeAttribute("aria-invalid")
      }

      function V(a) {
        var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", W).output({
            id: CKEDITOR.tools.getNextNumber(),
            editorId: a.id,
            langDir: a.lang.dir,
            langCode: a.langCode,
            editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
            closeTitle: a.lang.common.close,
            hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
          })),
          c = b.getChild([0, 0, 0, 0, 0]),
          d = c.getChild(0),
          e = c.getChild(1);
        a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
        !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));
        d.unselectable();
        e.unselectable();
        return {
          element: b,
          parts: {
            dialog: b.getChild(0),
            title: d,
            close: e,
            tabs: c.getChild(2),
            contents: c.getChild([3, 0, 0, 0]),
            footer: c.getChild([3, 0, 1, 0])
          }
        }
      }

      function L(a, b, c) {
        this.element = b;
        this.focusIndex = c;
        this.tabIndex = 0;
        this.isFocusable = function() {
          return !b.getAttribute("disabled") && b.isVisible()
        };
        this.focus = function() {
          a._.currentFocusIndex = this.focusIndex;
          this.element.focus()
        };
        b.on("keydown", function(a) {
          a.data.getKeystroke() in {
            32: 1,
            13: 1
          } && this.fire("click")
        });
        b.on("focus", function() {
          this.fire("mouseover")
        });
        b.on("blur", function() {
          this.fire("mouseout")
        })
      }

      function X(a) {
        function b() {
          a.layout()
        }
        var c = CKEDITOR.document.getWindow();
        c.on("resize", b);
        a.on("hide", function() {
          c.removeListener("resize", b)
        })
      }

      function M(a, b) {
        this._ = {
          dialog: a
        };
        CKEDITOR.tools.extend(this, b)
      }

      function Y(a) {
        function b(b) {
          var c = a.getSize(),
            k = CKEDITOR.document.getWindow().getViewPaneSize(),
            q = b.data.$.screenX,
            n = b.data.$.screenY,
            r = q - d.x,
            l = n - d.y;
          d = {
            x: q,
            y: n
          };
          e.x += r;
          e.y += l;
          a.move(e.x + h[3] < g ? -h[3] : e.x - h[1] > k.width - c.width - g ? k.width - c.width + ("rtl" == f.lang.dir ? 0 : h[1]) : e.x, e.y + h[0] < g ? -h[0] : e.y - h[2] > k.height - c.height - g ? k.height - c.height + h[2] : e.y, 1);
          b.data.preventDefault()
        }

        function c() {
          CKEDITOR.document.removeListener("mousemove", b);
          CKEDITOR.document.removeListener("mouseup", c);
          if (CKEDITOR.env.ie6Compat) {
            var a = u.getChild(0).getFrameDocument();
            a.removeListener("mousemove", b);
            a.removeListener("mouseup", c)
          }
        }
        var d = null,
          e = null,
          f = a.getParentEditor(),
          g = f.config.dialog_magnetDistance,
          h = CKEDITOR.skin.margins || [0, 0, 0, 0];
        "undefined" == typeof g && (g = 20);
        a.parts.title.on("mousedown", function(g) {
          d = {
            x: g.data.$.screenX,
            y: g.data.$.screenY
          };
          CKEDITOR.document.on("mousemove", b);
          CKEDITOR.document.on("mouseup",
            c);
          e = a.getPosition();
          if (CKEDITOR.env.ie6Compat) {
            var f = u.getChild(0).getFrameDocument();
            f.on("mousemove", b);
            f.on("mouseup", c)
          }
          g.data.preventDefault()
        }, a)
      }

      function Z(a) {
        function b(b) {
          var c = "rtl" == f.lang.dir,
            n = k.width,
            q = k.height,
            G = n + (b.data.$.screenX - m.x) * (c ? -1 : 1) * (a._.moved ? 1 : 2),
            H = q + (b.data.$.screenY - m.y) * (a._.moved ? 1 : 2),
            B = a._.element.getFirst(),
            B = c && B.getComputedStyle("right"),
            C = a.getPosition();
          C.y + H > p.height && (H = p.height - C.y);
          (c ? B : C.x) + G > p.width && (G = p.width - (c ? B : C.x));
          if (e == CKEDITOR.DIALOG_RESIZE_WIDTH ||
            e == CKEDITOR.DIALOG_RESIZE_BOTH) n = Math.max(d.minWidth || 0, G - g);
          if (e == CKEDITOR.DIALOG_RESIZE_HEIGHT || e == CKEDITOR.DIALOG_RESIZE_BOTH) q = Math.max(d.minHeight || 0, H - h);
          a.resize(n, q);
          a._.moved || a.layout();
          b.data.preventDefault()
        }

        function c() {
          CKEDITOR.document.removeListener("mouseup", c);
          CKEDITOR.document.removeListener("mousemove", b);
          q && (q.remove(), q = null);
          if (CKEDITOR.env.ie6Compat) {
            var a = u.getChild(0).getFrameDocument();
            a.removeListener("mouseup", c);
            a.removeListener("mousemove", b)
          }
        }
        var d = a.definition,
          e = d.resizable;
        if (e != CKEDITOR.DIALOG_RESIZE_NONE) {
          var f = a.getParentEditor(),
            g, h, p, m, k, q, n = CKEDITOR.tools.addFunction(function(e) {
              k = a.getSize();
              var d = a.parts.contents;
              d.$.getElementsByTagName("iframe").length && (q = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), d.append(q));
              h = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
              g = k.width - a.parts.contents.getSize("width",
                1);
              m = {
                x: e.screenX,
                y: e.screenY
              };
              p = CKEDITOR.document.getWindow().getViewPaneSize();
              CKEDITOR.document.on("mousemove", b);
              CKEDITOR.document.on("mouseup", c);
              CKEDITOR.env.ie6Compat && (d = u.getChild(0).getFrameDocument(), d.on("mousemove", b), d.on("mouseup", c));
              e.preventDefault && e.preventDefault()
            });
          a.on("load", function() {
            var b = "";
            e == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : e == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
            b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
              b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e");
            a.parts.footer.append(b, 1)
          });
          f.on("destroy", function() {
            CKEDITOR.tools.removeFunction(n)
          })
        }
      }

      function I(a) {
        a.data.preventDefault(1)
      }

      function N(a) {
        var b = CKEDITOR.document.getWindow(),
          c = a.config,
          d = c.dialog_backgroundCoverColor || "white",
          e = c.dialog_backgroundCoverOpacity,
          f = c.baseFloatZIndex,
          c = CKEDITOR.tools.genKey(d,
            e, f),
          g = z[c];
        g ? g.show() : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + d, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (d = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + d + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), f.push("void((function(){" +
          encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(f.join("")), g.setOpacity(void 0 !== e ? e : .5), g.on("keydown", I), g.on("keypress", I), g.on("keyup", I), g.appendTo(CKEDITOR.document.getBody()), z[c] = g);
        a.focusManager.add(g);
        u = g;
        a = function() {
          var a = b.getViewPaneSize();
          g.setStyles({
            width: a.width + "px",
            height: a.height + "px"
          })
        };
        var h = function() {
          var a = b.getScrollPosition(),
            c = CKEDITOR.dialog._.currentTop;
          g.setStyles({
            left: a.x + "px",
            top: a.y + "px"
          });
          if (c) {
            do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog)
          }
        };
        J = a;
        b.on("resize", a);
        a();
        CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus();
        if (CKEDITOR.env.ie6Compat) {
          var p = function() {
            h();
            arguments.callee.prevScrollHandler.apply(this, arguments)
          };
          b.$.setTimeout(function() {
            p.prevScrollHandler =
              window.onscroll || function() {};
            window.onscroll = p
          }, 0);
          h()
        }
      }

      function O(a) {
        u && (a.focusManager.remove(u), a = CKEDITOR.document.getWindow(), u.hide(), a.removeListener("resize", J), CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
          window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
        }, 0), J = null)
      }
      var v = CKEDITOR.tools.cssLength,
        W = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
        CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
      CKEDITOR.dialog = function(a, b) {
        function c() {
          var a = l._.focusList;
          a.sort(function(a, b) {
            return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
          });
          for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
        }

        function d(a) {
          var b = l._.focusList;
          a = a || 0;
          if (!(1 > b.length)) {
            var c = l._.currentFocusIndex;
            l._.tabBarMode && 0 > a && (c = 0);
            try {
              b[c].getInputElement().$.blur()
            } catch (e) {}
            var d = c,
              g = 1 < l._.pageCount;
            do {
              d += a;
              if (g && !l._.tabBarMode && (d == b.length || -1 == d)) {
                l._.tabBarMode = !0;
                l._.tabs[l._.currentTabId][0].focus();
                l._.currentFocusIndex = -1;
                return
              }
              d = (d + b.length) % b.length;
              if (d == c) break
            } while (a && !b[d].isFocusable());
            b[d].focus();
            "text" == b[d].type && b[d].select()
          }
        }

        function e(b) {
          if (l == CKEDITOR.dialog._.currentTop) {
            var c = b.data.getKeystroke(),
              e = "rtl" == a.lang.dir,
              g = [37, 38, 39, 40];
            q = n = 0;
            if (9 == c || c == CKEDITOR.SHIFT + 9) d(c == CKEDITOR.SHIFT + 9 ? -1 : 1), q = 1;
            else if (c == CKEDITOR.ALT + 121 && !l._.tabBarMode && 1 < l.getPageCount()) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1, q = 1;
            else if (-1 != CKEDITOR.tools.indexOf(g,
                c) && l._.tabBarMode) c = -1 != CKEDITOR.tools.indexOf([e ? 39 : 37, 38], c) ? x.call(l) : A.call(l), l.selectPage(c), l._.tabs[c][0].focus(), q = 1;
            else if (13 != c && 32 != c || !l._.tabBarMode)
              if (13 == c) c = b.data.getTarget(), c.is("a", "button", "select", "textarea") || c.is("input") && "button" == c.$.type || ((c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), q = 1), n = 1;
              else if (27 == c)(c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", {
              hide: !0
            }).hide && this.hide(), n = 1;
            else return;
            else this.selectPage(this._.currentTabId),
              this._.tabBarMode = !1, this._.currentFocusIndex = -1, d(1), q = 1;
            f(b)
          }
        }

        function f(a) {
          q ? a.data.preventDefault(1) : n && a.data.stopPropagation()
        }
        var g = CKEDITOR.dialog._.dialogDefinitions[b],
          h = CKEDITOR.tools.clone(aa),
          p = a.config.dialog_buttonsOrder || "OS",
          m = a.lang.dir,
          k = {},
          q, n;
        ("OS" == p && CKEDITOR.env.mac || "rtl" == p && "ltr" == m || "ltr" == p && "rtl" == m) && h.buttons.reverse();
        g = CKEDITOR.tools.extend(g(a), h);
        g = CKEDITOR.tools.clone(g);
        g = new P(this, g);
        h = V(a);
        this._ = {
          editor: a,
          element: h.element,
          name: b,
          contentSize: {
            width: 0,
            height: 0
          },
          size: {
            width: 0,
            height: 0
          },
          contents: {},
          buttons: {},
          accessKeyMap: {},
          tabs: {},
          tabIdList: [],
          currentTabId: null,
          currentTabIndex: null,
          pageCount: 0,
          lastTab: null,
          tabBarMode: !1,
          focusList: [],
          currentFocusIndex: 0,
          hasFocus: !1
        };
        this.parts = h.parts;
        CKEDITOR.tools.setTimeout(function() {
          a.fire("ariaWidget", this.parts.contents)
        }, 0, this);
        h = {
          position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
          top: 0,
          visibility: "hidden"
        };
        h["rtl" == m ? "right" : "left"] = 0;
        this.parts.dialog.setStyles(h);
        CKEDITOR.event.call(this);
        this.definition = g = CKEDITOR.fire("dialogDefinition", {
          name: b,
          definition: g
        }, a).definition;
        if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) {
          h = a.config.removeDialogTabs.split(";");
          for (m = 0; m < h.length; m++)
            if (p = h[m].split(":"), 2 == p.length) {
              var r = p[0];
              k[r] || (k[r] = []);
              k[r].push(p[1])
            }
          a._.removeDialogTabs = k
        }
        if (a._.removeDialogTabs && (k = a._.removeDialogTabs[b]))
          for (m = 0; m < k.length; m++) g.removeContents(k[m]);
        if (g.onLoad) this.on("load", g.onLoad);
        if (g.onShow) this.on("show", g.onShow);
        if (g.onHide) this.on("hide", g.onHide);
        if (g.onOk) this.on("ok", function(b) {
          a.fire("saveSnapshot");
          setTimeout(function() {
            a.fire("saveSnapshot")
          }, 0);
          !1 === g.onOk.call(this, b) && (b.data.hide = !1)
        });
        this.state = CKEDITOR.DIALOG_STATE_IDLE;
        if (g.onCancel) this.on("cancel", function(a) {
          !1 === g.onCancel.call(this, a) && (a.data.hide = !1)
        });
        var l = this,
          t = function(a) {
            var b = l._.contents,
              c = !1,
              d;
            for (d in b)
              for (var e in b[d])
                if (c = a.call(this, b[d][e])) return
          };
        this.on("ok", function(a) {
          t(function(b) {
            if (b.validate) {
              var c = b.validate(this),
                d = "string" == typeof c || !1 === c;
              d && (a.data.hide = !1, a.stop());
              T.call(b, !d, "string" == typeof c ?
                c : void 0);
              return d
            }
          })
        }, this, null, 0);
        this.on("cancel", function(b) {
          t(function(c) {
            if (c.isChanged()) return a.config.dialog_noConfirmCancel || confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0
          })
        }, this, null, 0);
        this.parts.close.on("click", function(a) {
          !1 !== this.fire("cancel", {
            hide: !0
          }).hide && this.hide();
          a.data.preventDefault()
        }, this);
        this.changeFocus = d;
        var y = this._.element;
        a.focusManager.add(y, 1);
        this.on("show", function() {
          y.on("keydown", e, this);
          if (CKEDITOR.env.gecko) y.on("keypress", f, this)
        });
        this.on("hide",
          function() {
            y.removeListener("keydown", e);
            CKEDITOR.env.gecko && y.removeListener("keypress", f);
            t(function(a) {
              U.apply(a)
            })
          });
        this.on("iframeAdded", function(a) {
          (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", e, this, null, 0)
        });
        this.on("show", function() {
          c();
          var b = 1 < l._.pageCount;
          a.config.dialog_startupFocusTab && b ? (l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = b ? -1 : this._.focusList.length - 1, g.onFocus ?
            (b = g.onFocus.call(this)) && b.focus() : d(1))
        }, this, null, 4294967295);
        if (CKEDITOR.env.ie6Compat) this.on("load", function() {
          var a = this.getElement(),
            b = a.getFirst();
          b.remove();
          b.appendTo(a)
        }, this);
        Y(this);
        Z(this);
        (new CKEDITOR.dom.text(g.title, CKEDITOR.document)).appendTo(this.parts.title);
        for (m = 0; m < g.contents.length; m++)(k = g.contents[m]) && this.addPage(k);
        this.parts.tabs.on("click", function(a) {
          var b = a.data.getTarget();
          b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
            this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, d(1)), a.data.preventDefault())
        }, this);
        m = [];
        k = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
          type: "hbox",
          className: "cke_dialog_footer_buttons",
          widths: [],
          children: g.buttons
        }, m).getChild();
        this.parts.footer.setHtml(m.join(""));
        for (m = 0; m < k.length; m++) this._.buttons[k[m].id] = k[m]
      };
      CKEDITOR.dialog.prototype = {
        destroy: function() {
          this.hide();
          this._.element.remove()
        },
        resize: function() {
          return function(a, b) {
            this._.contentSize && this._.contentSize.width ==
              a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", {
                dialog: this,
                width: a,
                height: b
              }, this._.editor), this.fire("resize", {
                width: a,
                height: b
              }, this._.editor), this.parts.contents.setStyles({
                width: a + "px",
                height: b + "px"
              }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
                width: a,
                height: b
              })
          }
        }(),
        getSize: function() {
          var a = this._.element.getFirst();
          return {
            width: a.$.offsetWidth || 0,
            height: a.$.offsetHeight || 0
          }
        },
        move: function(a, b, c) {
          var d = this._.element.getFirst(),
            e = "rtl" == this._.editor.lang.dir,
            f = "fixed" == d.getComputedStyle("position");
          CKEDITOR.env.ie && d.setStyle("zoom", "100%");
          f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = {
              x: a,
              y: b
            }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), e && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = {
              top: (0 < b ? b : 0) + "px"
            },
            b[e ? "right" : "left"] = (0 < a ? a : 0) + "px", d.setStyles(b), c && (this._.moved = 1))
        },
        getPosition: function() {
          return CKEDITOR.tools.extend({}, this._.position)
        },
        show: function() {
          var a = this._.element,
            b = this.definition;
          a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody());
          this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
          this.reset();
          this.selectPage(this.definition.contents[0].id);
          null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
          this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
          null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, N(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this);
          a.on("keydown", Q);
          a.on("keyup", R);
          this._.hasFocus = !1;
          for (var c in b.contents)
            if (b.contents[c]) {
              var a = b.contents[c],
                d = this._.tabs[a.id],
                e = a.requiredContent,
                f = 0;
              if (d) {
                for (var g in this._.contents[a.id]) {
                  var h = this._.contents[a.id][g];
                  "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(), f++))
                }!f || e && !this._.editor.activeFilter.check(e) ? d[0].addClass("cke_dialog_tab_disabled") : d[0].removeClass("cke_dialog_tab_disabled")
              }
            }
          CKEDITOR.tools.setTimeout(function() {
            this.layout();
            X(this);
            this.parts.dialog.setStyle("visibility", "");
            this.fireOnce("load", {});
            CKEDITOR.ui.fire("ready", this);
            this.fire("show", {});
            this._.editor.fire("dialogShow", this);
            this._.parentDialog || this._.editor.focusManager.lock();
            this.foreach(function(a) {
              a.setInitValue && a.setInitValue()
            })
          }, 100, this)
        },
        layout: function() {
          var a = this.parts.dialog,
            b = this.getSize(),
            c = CKEDITOR.document.getWindow().getViewPaneSize(),
            d = (c.width - b.width) / 2,
            e = (c.height - b.height) / 2;
          CKEDITOR.env.ie6Compat || (b.height + (0 < e ? e : 0) > c.height ||
            b.width + (0 < d ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
          this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : e)
        },
        foreach: function(a) {
          for (var b in this._.contents)
            for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
          return this
        },
        reset: function() {
          var a = function(a) {
            a.reset && a.reset(1)
          };
          return function() {
            this.foreach(a);
            return this
          }
        }(),
        setupContent: function() {
          var a = arguments;
          this.foreach(function(b) {
            b.setup && b.setup.apply(b, a)
          })
        },
        commitContent: function() {
          var a = arguments;
          this.foreach(function(b) {
            CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
            b.commit && b.commit.apply(b, a)
          })
        },
        hide: function() {
          if (this.parts.dialog.isVisible()) {
            this.fire("hide", {});
            this._.editor.fire("dialogHide", this);
            this.selectPage(this._.tabIdList[0]);
            var a = this._.element;
            a.setStyle("display", "none");
            this.parts.dialog.setStyle("visibility", "hidden");
            for (ba(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
            if (this._.parentDialog) {
              var b = this._.parentDialog.getElement().getFirst();
              b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
            } else O(this._.editor);
            if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
            else {
              CKEDITOR.dialog._.currentZIndex = null;
              a.removeListener("keydown", Q);
              a.removeListener("keyup", R);
              var c = this._.editor;
              c.focus();
              setTimeout(function() {
                c.focusManager.unlock();
                CKEDITOR.env.iOS && c.window.focus()
              }, 0)
            }
            delete this._.parentDialog;
            this.foreach(function(a) {
              a.resetInitValue && a.resetInitValue()
            });
            this.setState(CKEDITOR.DIALOG_STATE_IDLE)
          }
        },
        addPage: function(a) {
          if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
            for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                  type: "vbox",
                  className: "cke_dialog_page_contents",
                  children: a.elements,
                  expand: !!a.expand,
                  padding: a.padding,
                  style: a.style || "width: 100%;"
                }, b), e = this._.contents[a.id] = {}, f = d.getChild(),
                g = 0; d = f.shift();) d.notAllowed || "hbox" == d.type || "vbox" == d.type || g++, e[d.id] = d, "function" == typeof d.getChild && f.push.apply(f, d.getChild());
            g || (a.hidden = !0);
            b = CKEDITOR.dom.element.createFromHtml(b.join(""));
            b.setAttribute("role", "tabpanel");
            d = CKEDITOR.env;
            e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
            c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', e, '"', d.gecko && !d.hc ? "" : ' href\x3d"javascript:void(0)"',
              ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"
            ].join(""));
            b.setAttribute("aria-labelledby", e);
            this._.tabs[a.id] = [c, b];
            this._.tabIdList.push(a.id);
            !a.hidden && this._.pageCount++;
            this._.lastTab = c;
            this.updateStyle();
            b.setAttribute("name", a.id);
            b.appendTo(this.parts.contents);
            c.unselectable();
            this.parts.tabs.append(c);
            a.accessKey && (S(this, this, "CTRL+" + a.accessKey, ca, da), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
          }
        },
        selectPage: function(a) {
          if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") &&
            !1 !== this.fire("selectPage", {
              page: a,
              currentPage: this._.currentTabId
            })) {
            for (var b in this._.tabs) {
              var c = this._.tabs[b][0],
                d = this._.tabs[b][1];
              b != a && (c.removeClass("cke_dialog_tab_selected"), d.hide());
              d.setAttribute("aria-hidden", b != a)
            }
            var e = this._.tabs[a];
            e[0].addClass("cke_dialog_tab_selected");
            CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (K(e[1]), e[1].show(), setTimeout(function() {
              K(e[1], 1)
            }, 0)) : e[1].show();
            this._.currentTabId = a;
            this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
          }
        },
        updateStyle: function() {
          this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
        },
        hidePage: function(a) {
          var b = this._.tabs[a] && this._.tabs[a][0];
          b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(x.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
        },
        showPage: function(a) {
          if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
        },
        getElement: function() {
          return this._.element
        },
        getName: function() {
          return this._.name
        },
        getContentElement: function(a, b) {
          var c = this._.contents[a];
          return c && c[b]
        },
        getValueOf: function(a, b) {
          return this.getContentElement(a, b).getValue()
        },
        setValueOf: function(a, b, c) {
          return this.getContentElement(a, b).setValue(c)
        },
        getButton: function(a) {
          return this._.buttons[a]
        },
        click: function(a) {
          return this._.buttons[a].click()
        },
        disableButton: function(a) {
          return this._.buttons[a].disable()
        },
        enableButton: function(a) {
          return this._.buttons[a].enable()
        },
        getPageCount: function() {
          return this._.pageCount
        },
        getParentEditor: function() {
          return this._.editor
        },
        getSelectedElement: function() {
          return this.getParentEditor().getSelection().getSelectedElement()
        },
        addFocusable: function(a, b) {
          if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new L(this, a, b));
          else {
            this._.focusList.splice(b, 0, new L(this, a, b));
            for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
          }
        },
        setState: function(a) {
          if (this.state != a) {
            this.state = a;
            if (a == CKEDITOR.DIALOG_STATE_BUSY) {
              if (!this.parts.spinner) {
                var b = this.getParentEditor().lang.dir,
                  c = {
                    attributes: {
                      "class": "cke_dialog_spinner"
                    },
                    styles: {
                      "float": "rtl" == b ? "right" : "left"
                    }
                  };
                c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px";
                this.parts.spinner = CKEDITOR.document.createElement("div", c);
                this.parts.spinner.setHtml("\x26#8987;");
                this.parts.spinner.appendTo(this.parts.title, 1)
              }
              this.parts.spinner.show();
              this.getButton("ok").disable()
            } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
            this.fire("state", a)
          }
        }
      };
      CKEDITOR.tools.extend(CKEDITOR.dialog, {
        add: function(a, b) {
          this._.dialogDefinitions[a] &&
            "function" != typeof b || (this._.dialogDefinitions[a] = b)
        },
        exists: function(a) {
          return !!this._.dialogDefinitions[a]
        },
        getCurrent: function() {
          return CKEDITOR.dialog._.currentTop
        },
        isTabEnabled: function(a, b, c) {
          a = a.config.removeDialogTabs;
          return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
        },
        okButton: function() {
          var a = function(a, c) {
            c = c || {};
            return CKEDITOR.tools.extend({
              id: "ok",
              type: "button",
              label: a.lang.common.ok,
              "class": "cke_dialog_ui_button_ok",
              onClick: function(a) {
                a = a.data.dialog;
                !1 !== a.fire("ok", {
                  hide: !0
                }).hide && a.hide()
              }
            }, c, !0)
          };
          a.type = "button";
          a.override = function(b) {
            return CKEDITOR.tools.extend(function(c) {
              return a(c, b)
            }, {
              type: "button"
            }, !0)
          };
          return a
        }(),
        cancelButton: function() {
          var a = function(a, c) {
            c = c || {};
            return CKEDITOR.tools.extend({
              id: "cancel",
              type: "button",
              label: a.lang.common.cancel,
              "class": "cke_dialog_ui_button_cancel",
              onClick: function(a) {
                a = a.data.dialog;
                !1 !== a.fire("cancel", {
                  hide: !0
                }).hide && a.hide()
              }
            }, c, !0)
          };
          a.type = "button";
          a.override = function(b) {
            return CKEDITOR.tools.extend(function(c) {
              return a(c,
                b)
            }, {
              type: "button"
            }, !0)
          };
          return a
        }(),
        addUIElement: function(a, b) {
          this._.uiElementBuilders[a] = b
        }
      });
      CKEDITOR.dialog._ = {
        uiElementBuilders: {},
        dialogDefinitions: {},
        currentTop: null,
        currentZIndex: null
      };
      CKEDITOR.event.implementOn(CKEDITOR.dialog);
      CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
      var aa = {
          resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
          minWidth: 600,
          minHeight: 400,
          buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        },
        D = function(a, b, c) {
          for (var d = 0, e; e = a[d]; d++)
            if (e.id == b || c && e[c] && (e = D(e[c],
                b, c))) return e;
          return null
        },
        E = function(a, b, c, d, e) {
          if (c) {
            for (var f = 0, g; g = a[f]; f++) {
              if (g.id == c) return a.splice(f, 0, b), b;
              if (d && g[d] && (g = E(g[d], b, c, d, !0))) return g
            }
            if (e) return null
          }
          a.push(b);
          return b
        },
        F = function(a, b, c) {
          for (var d = 0, e; e = a[d]; d++) {
            if (e.id == b) return a.splice(d, 1);
            if (c && e[c] && (e = F(e[c], b, c))) return e
          }
          return null
        },
        P = function(a, b) {
          this.dialog = a;
          for (var c = b.contents, d = 0, e; e = c[d]; d++) c[d] = e && new M(a, e);
          CKEDITOR.tools.extend(this, b)
        };
      P.prototype = {
        getContents: function(a) {
          return D(this.contents,
            a)
        },
        getButton: function(a) {
          return D(this.buttons, a)
        },
        addContents: function(a, b) {
          return E(this.contents, a, b)
        },
        addButton: function(a, b) {
          return E(this.buttons, a, b)
        },
        removeContents: function(a) {
          F(this.contents, a)
        },
        removeButton: function(a) {
          F(this.buttons, a)
        }
      };
      M.prototype = {
        get: function(a) {
          return D(this.elements, a, "children")
        },
        add: function(a, b) {
          return E(this.elements, a, b, "children")
        },
        remove: function(a) {
          F(this.elements, a, "children")
        }
      };
      var J, z = {},
        u, w = {},
        Q = function(a) {
          var b = a.data.$.ctrlKey || a.data.$.metaKey,
            c =
            a.data.$.altKey,
            d = a.data.$.shiftKey,
            e = String.fromCharCode(a.data.$.keyCode);
          (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
        },
        R = function(a) {
          var b = a.data.$.ctrlKey || a.data.$.metaKey,
            c = a.data.$.altKey,
            d = a.data.$.shiftKey,
            e = String.fromCharCode(a.data.$.keyCode);
          (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key),
            a.data.preventDefault()))
        },
        S = function(a, b, c, d, e) {
          (w[c] || (w[c] = [])).push({
            uiElement: a,
            dialog: b,
            key: c,
            keyup: e || a.accessKeyUp,
            keydown: d || a.accessKeyDown
          })
        },
        ba = function(a) {
          for (var b in w) {
            for (var c = w[b], d = c.length - 1; 0 <= d; d--) c[d].dialog != a && c[d].uiElement != a || c.splice(d, 1);
            0 === c.length && delete w[b]
          }
        },
        da = function(a, b) {
          a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
        },
        ca = function() {};
      (function() {
        CKEDITOR.ui.dialog = {
          uiElement: function(a, b, c, d, e, f, g) {
            if (!(4 > arguments.length)) {
              var h = (d.call ? d(b) : d) ||
                "div",
                p = ["\x3c", h, " "],
                m = (e && e.call ? e(b) : e) || {},
                k = (f && f.call ? f(b) : f) || {},
                q = (g && g.call ? g.call(this, a, b) : g) || "",
                n = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement";
              b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0);
              k.id = n;
              var r = {};
              b.type && (r["cke_dialog_ui_" + b.type] = 1);
              b.className && (r[b.className] = 1);
              b.disabled && (r.cke_disabled = 1);
              for (var l = k["class"] && k["class"].split ? k["class"].split(" ") : [], n = 0; n < l.length; n++) l[n] && (r[l[n]] = 1);
              l = [];
              for (n in r) l.push(n);
              k["class"] = l.join(" ");
              b.title && (k.title = b.title);
              r = (b.style || "").split(";");
              b.align && (l = b.align, m["margin-left"] = "left" == l ? 0 : "auto", m["margin-right"] = "right" == l ? 0 : "auto");
              for (n in m) r.push(n + ":" + m[n]);
              b.hidden && r.push("display:none");
              for (n = r.length - 1; 0 <= n; n--) "" === r[n] && r.splice(n, 1);
              0 < r.length && (k.style = (k.style ? k.style + "; " : "") + r.join("; "));
              for (n in k) p.push(n + '\x3d"' + CKEDITOR.tools.htmlEncode(k[n]) + '" ');
              p.push("\x3e", q, "\x3c/", h, "\x3e");
              c.push(p.join(""));
              (this._ || (this._ = {})).dialog = a;
              "boolean" == typeof b.isChanged && (this.isChanged = function() {
                return b.isChanged
              });
              "function" == typeof b.isChanged && (this.isChanged = b.isChanged);
              "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                return function(c) {
                  a.call(this, b.setValue.call(this, c))
                }
              }));
              "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
                return function() {
                  return b.getValue.call(this, a.call(this))
                }
              }));
              CKEDITOR.event.implementOn(this);
              this.registerEvents(b);
              this.accessKeyUp && this.accessKeyDown && b.accessKey && S(this, a, "CTRL+" + b.accessKey);
              var t = this;
              a.on("load", function() {
                var b = t.getInputElement();
                if (b) {
                  var c = t.type in {
                    checkbox: 1,
                    ratio: 1
                  } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
                  b.on("focus", function() {
                    a._.tabBarMode = !1;
                    a._.hasFocus = !0;
                    t.fire("focus");
                    c && this.addClass(c)
                  });
                  b.on("blur", function() {
                    t.fire("blur");
                    c && this.removeClass(c)
                  })
                }
              });
              CKEDITOR.tools.extend(this, b);
              this.keyboardFocusable && (this.tabIndex =
                b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() {
                  a._.currentFocusIndex = t.focusIndex
                }))
            }
          },
          hbox: function(a, b, c, d, e) {
            if (!(4 > arguments.length)) {
              this._ || (this._ = {});
              var f = this._.children = b,
                g = e && e.widths || null,
                h = e && e.height || null,
                p, m = {
                  role: "presentation"
                };
              e && e.align && (m.align = e.align);
              CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
                type: "hbox"
              }, d, "table", {}, m, function() {
                var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];
                for (p = 0; p < c.length; p++) {
                  var b = "cke_dialog_ui_hbox_child",
                    d = [];
                  0 === p && (b = "cke_dialog_ui_hbox_first");
                  p == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                  a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');
                  g ? g[p] && d.push("width:" + v(g[p])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                  h && d.push("height:" + v(h));
                  e && void 0 !== e.padding && d.push("padding:" + v(e.padding));
                  CKEDITOR.env.ie && CKEDITOR.env.quirks && f[p].align && d.push("text-align:" + f[p].align);
                  0 < d.length && a.push('style\x3d"' + d.join("; ") + '" ');
                  a.push("\x3e", c[p], "\x3c/td\x3e")
                }
                a.push("\x3c/tr\x3e\x3c/tbody\x3e");
                return a.join("")
              })
            }
          },
          vbox: function(a, b, c, d, e) {
            if (!(3 > arguments.length)) {
              this._ || (this._ = {});
              var f = this._.children = b,
                g = e && e.width || null,
                h = e && e.heights || null;
              CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
                type: "vbox"
              }, d, "div", null, {
                role: "presentation"
              }, function() {
                var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                b.push('style\x3d"');
                e && e.expand && b.push("height:100%;");
                b.push("width:" + v(g || "100%"), ";");
                CKEDITOR.env.webkit && b.push("float:none;");
                b.push('"');
                b.push('align\x3d"',
                  CKEDITOR.tools.htmlEncode(e && e.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
                b.push("\x3e\x3ctbody\x3e");
                for (var d = 0; d < c.length; d++) {
                  var k = [];
                  b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');
                  g && k.push("width:" + v(g || "100%"));
                  h ? k.push("height:" + v(h[d])) : e && e.expand && k.push("height:" + Math.floor(100 / c.length) + "%");
                  e && void 0 !== e.padding && k.push("padding:" + v(e.padding));
                  CKEDITOR.env.ie && CKEDITOR.env.quirks && f[d].align && k.push("text-align:" + f[d].align);
                  0 < k.length && b.push('style\x3d"',
                    k.join("; "), '" ');
                  b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[d], "\x3c/td\x3e\x3c/tr\x3e")
                }
                b.push("\x3c/tbody\x3e\x3c/table\x3e");
                return b.join("")
              })
            }
          }
        }
      })();
      CKEDITOR.ui.dialog.uiElement.prototype = {
        getElement: function() {
          return CKEDITOR.document.getById(this.domId)
        },
        getInputElement: function() {
          return this.getElement()
        },
        getDialog: function() {
          return this._.dialog
        },
        setValue: function(a, b) {
          this.getInputElement().setValue(a);
          !b && this.fire("change", {
            value: a
          });
          return this
        },
        getValue: function() {
          return this.getInputElement().getValue()
        },
        isChanged: function() {
          return !1
        },
        selectParentTab: function() {
          for (var a = this.getInputElement();
            (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
          if (!a) return this;
          a = a.getAttribute("name");
          this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
          return this
        },
        focus: function() {
          this.selectParentTab().getInputElement().focus();
          return this
        },
        registerEvents: function(a) {
          var b = /^on([A-Z]\w+)/,
            c, d = function(a, b, c, d) {
              b.on("load", function() {
                a.getInputElement().on(c, d, a)
              })
            },
            e;
          for (e in a)
            if (c =
              e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
          return this
        },
        eventProcessors: {
          onLoad: function(a, b) {
            a.on("load", b, this)
          },
          onShow: function(a, b) {
            a.on("show", b, this)
          },
          onHide: function(a, b) {
            a.on("hide", b, this)
          }
        },
        accessKeyDown: function() {
          this.focus()
        },
        accessKeyUp: function() {},
        disable: function() {
          var a = this.getElement();
          this.getInputElement().setAttribute("disabled", "true");
          a.addClass("cke_disabled")
        },
        enable: function() {
          var a =
            this.getElement();
          this.getInputElement().removeAttribute("disabled");
          a.removeClass("cke_disabled")
        },
        isEnabled: function() {
          return !this.getElement().hasClass("cke_disabled")
        },
        isVisible: function() {
          return this.getInputElement().isVisible()
        },
        isFocusable: function() {
          return this.isEnabled() && this.isVisible() ? !0 : !1
        }
      };
      CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
        getChild: function(a) {
          if (1 > arguments.length) return this._.children.concat();
          a.splice || (a = [a]);
          return 2 >
            a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
        }
      }, !0);
      CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
      (function() {
        var a = {
          build: function(a, c, d) {
            for (var e = c.children, f, g = [], h = [], p = 0; p < e.length && (f = e[p]); p++) {
              var m = [];
              g.push(m);
              h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, m))
            }
            return new CKEDITOR.ui.dialog[c.type](a, h, g, d, c)
          }
        };
        CKEDITOR.dialog.addUIElement("hbox", a);
        CKEDITOR.dialog.addUIElement("vbox",
          a)
      })();
      CKEDITOR.dialogCommand = function(a, b) {
        this.dialogName = a;
        CKEDITOR.tools.extend(this, b, !0)
      };
      CKEDITOR.dialogCommand.prototype = {
        exec: function(a) {
          a.openDialog(this.dialogName)
        },
        canUndo: !1,
        editorFocus: 1
      };
      (function() {
        var a = /^([a]|[^a])+$/,
          b = /^\d*$/,
          c = /^\d*(?:\.\d+)?$/,
          d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
          e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
          f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
        CKEDITOR.VALIDATE_OR = 1;
        CKEDITOR.VALIDATE_AND = 2;
        CKEDITOR.dialog.validate = {
          functions: function() {
            var a =
              arguments;
            return function() {
              var b = this && this.getValue ? this.getValue() : a[0],
                c, d = CKEDITOR.VALIDATE_AND,
                e = [],
                f;
              for (f = 0; f < a.length; f++)
                if ("function" == typeof a[f]) e.push(a[f]);
                else break;
              f < a.length && "string" == typeof a[f] && (c = a[f], f++);
              f < a.length && "number" == typeof a[f] && (d = a[f]);
              var n = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
              for (f = 0; f < e.length; f++) n = d == CKEDITOR.VALIDATE_AND ? n && e[f](b) : n || e[f](b);
              return n ? !0 : c
            }
          },
          regex: function(a, b) {
            return function(c) {
              c = this && this.getValue ? this.getValue() : c;
              return a.test(c) ? !0 : b
            }
          },
          notEmpty: function(b) {
            return this.regex(a, b)
          },
          integer: function(a) {
            return this.regex(b, a)
          },
          number: function(a) {
            return this.regex(c, a)
          },
          cssLength: function(a) {
            return this.functions(function(a) {
              return e.test(CKEDITOR.tools.trim(a))
            }, a)
          },
          htmlLength: function(a) {
            return this.functions(function(a) {
              return d.test(CKEDITOR.tools.trim(a))
            }, a)
          },
          inlineStyle: function(a) {
            return this.functions(function(a) {
              return f.test(CKEDITOR.tools.trim(a))
            }, a)
          },
          equals: function(a, b) {
            return this.functions(function(b) {
              return b == a
            }, b)
          },
          notEqual: function(a, b) {
            return this.functions(function(b) {
              return b != a
            }, b)
          }
        };
        CKEDITOR.on("instanceDestroyed", function(a) {
          if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
            for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
            for (var c in z) z[c].remove();
            z = {}
          }
          a = a.editor._.storedDialogs;
          for (var d in a) a[d].destroy()
        })
      })();
      CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        openDialog: function(a, b) {
          var c = null,
            d = CKEDITOR.dialog._.dialogDefinitions[a];
          null === CKEDITOR.dialog._.currentTop && N(this);
          if ("function" == typeof d) c =
            this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
          else {
            if ("failed" == d) throw O(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
            "string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
              "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
              this.openDialog(a, b)
            }, this, 0, 1)
          }
          CKEDITOR.skin.loadPart("dialog");
          return c
        }
      })
    })();
    CKEDITOR.plugins.add("dialog", {
      requires: "dialogui",
      init: function(x) {
        x.on("doubleclick", function(A) {
          A.data.dialog && x.openDialog(A.data.dialog)
        }, null, null, 999)
      }
    });
    CKEDITOR.plugins.add("about", {
      requires: "dialog",
      init: function(a) {
        var b = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
        b.modes = {
          wysiwyg: 1,
          source: 1
        };
        b.canUndo = !1;
        b.readOnly = 1;
        a.ui.addButton && a.ui.addButton("About", {
          label: a.lang.about.title,
          command: "about",
          toolbar: "about"
        });
        CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
      }
    });
    (function() {
      CKEDITOR.plugins.add("a11yhelp", {
        requires: "dialog",
        availableLangs: {
          af: 1,
          ar: 1,
          bg: 1,
          ca: 1,
          cs: 1,
          cy: 1,
          da: 1,
          de: 1,
          el: 1,
          en: 1,
          "en-gb": 1,
          eo: 1,
          es: 1,
          et: 1,
          eu: 1,
          fa: 1,
          fi: 1,
          fo: 1,
          fr: 1,
          "fr-ca": 1,
          gl: 1,
          gu: 1,
          he: 1,
          hi: 1,
          hr: 1,
          hu: 1,
          id: 1,
          it: 1,
          ja: 1,
          km: 1,
          ko: 1,
          ku: 1,
          lt: 1,
          lv: 1,
          mk: 1,
          mn: 1,
          nb: 1,
          nl: 1,
          no: 1,
          pl: 1,
          pt: 1,
          "pt-br": 1,
          ro: 1,
          ru: 1,
          si: 1,
          sk: 1,
          sl: 1,
          sq: 1,
          sr: 1,
          "sr-latn": 1,
          sv: 1,
          th: 1,
          tr: 1,
          tt: 1,
          ug: 1,
          uk: 1,
          vi: 1,
          zh: 1,
          "zh-cn": 1
        },
        init: function(b) {
          var c = this;
          b.addCommand("a11yHelp", {
            exec: function() {
              var a = b.langCode,
                a = c.availableLangs[a] ?
                a : c.availableLangs[a.replace(/-.*/, "")] ? a.replace(/-.*/, "") : "en";
              CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + "dialogs/lang/" + a + ".js"), function() {
                b.lang.a11yhelp = c.langEntries[a];
                b.openDialog("a11yHelp")
              })
            },
            modes: {
              wysiwyg: 1,
              source: 1
            },
            readOnly: 1,
            canUndo: !1
          });
          b.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
          CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
          b.on("ariaEditorHelpLabel", function(a) {
            a.data.label = b.lang.common.editorHelp
          })
        }
      })
    })();
    (function() {
      function f(c) {
        var a = this.att;
        c = c && c.hasAttribute(a) && c.getAttribute(a) || "";
        void 0 !== c && this.setValue(c)
      }

      function g() {
        for (var c, a = 0; a < arguments.length; a++)
          if (arguments[a] instanceof CKEDITOR.dom.element) {
            c = arguments[a];
            break
          }
        if (c) {
          var a = this.att,
            b = this.getValue();
          b ? c.setAttribute(a, b) : c.removeAttribute(a, b)
        }
      }
      var k = {
        id: 1,
        dir: 1,
        classes: 1,
        styles: 1
      };
      CKEDITOR.plugins.add("dialogadvtab", {
        requires: "dialog",
        allowedContent: function(c) {
          c || (c = k);
          var a = [];
          c.id && a.push("id");
          c.dir && a.push("dir");
          var b =
            "";
          a.length && (b += "[" + a.join(",") + "]");
          c.classes && (b += "(*)");
          c.styles && (b += "{*}");
          return b
        },
        createAdvancedTab: function(c, a, b) {
          a || (a = k);
          var d = c.lang.common,
            h = {
              id: "advanced",
              label: d.advancedTab,
              title: d.advancedTab,
              elements: [{
                type: "vbox",
                padding: 1,
                children: []
              }]
            },
            e = [];
          if (a.id || a.dir) a.id && e.push({
            id: "advId",
            att: "id",
            type: "text",
            requiredContent: b ? b + "[id]" : null,
            label: d.id,
            setup: f,
            commit: g
          }), a.dir && e.push({
            id: "advLangDir",
            att: "dir",
            type: "select",
            requiredContent: b ? b + "[dir]" : null,
            label: d.langDir,
            "default": "",
            style: "width:100%",
            items: [
              [d.notSet, ""],
              [d.langDirLTR, "ltr"],
              [d.langDirRTL, "rtl"]
            ],
            setup: f,
            commit: g
          }), h.elements[0].children.push({
            type: "hbox",
            widths: ["50%", "50%"],
            children: [].concat(e)
          });
          if (a.styles || a.classes) e = [], a.styles && e.push({
            id: "advStyles",
            att: "style",
            type: "text",
            requiredContent: b ? b + "{cke-xyz}" : null,
            label: d.styles,
            "default": "",
            validate: CKEDITOR.dialog.validate.inlineStyle(d.invalidInlineStyle),
            onChange: function() {},
            getStyle: function(a, c) {
              var b = this.getValue().match(new RegExp("(?:^|;)\\s*" +
                a + "\\s*:\\s*([^;]*)", "i"));
              return b ? b[1] : c
            },
            updateStyle: function(a, b) {
              var d = this.getValue(),
                e = c.document.createElement("span");
              e.setAttribute("style", d);
              e.setStyle(a, b);
              d = CKEDITOR.tools.normalizeCssText(e.getAttribute("style"));
              this.setValue(d, 1)
            },
            setup: f,
            commit: g
          }), a.classes && e.push({
            type: "hbox",
            widths: ["45%", "55%"],
            children: [{
              id: "advCSSClasses",
              att: "class",
              type: "text",
              requiredContent: b ? b + "(cke-xyz)" : null,
              label: d.cssClasses,
              "default": "",
              setup: f,
              commit: g
            }]
          }), h.elements[0].children.push({
            type: "hbox",
            widths: ["50%", "50%"],
            children: [].concat(e)
          });
          return h
        }
      })
    })();
    CKEDITOR.plugins.add("basicstyles", {
      init: function(c) {
        var e = 0,
          d = function(g, d, b, a) {
            if (a) {
              a = new CKEDITOR.style(a);
              var f = h[b];
              f.unshift(a);
              c.attachStyleStateChange(a, function(a) {
                !c.readOnly && c.getCommand(b).setState(a)
              });
              c.addCommand(b, new CKEDITOR.styleCommand(a, {
                contentForms: f
              }));
              c.ui.addButton && c.ui.addButton(g, {
                label: d,
                command: b,
                toolbar: "basicstyles," + (e += 10)
              })
            }
          },
          h = {
            bold: ["strong", "b", ["span", function(a) {
              a = a.styles["font-weight"];
              return "bold" == a || 700 <= +a
            }]],
            italic: ["em", "i", ["span", function(a) {
              return "italic" ==
                a.styles["font-style"]
            }]],
            underline: ["u", ["span", function(a) {
              return "underline" == a.styles["text-decoration"]
            }]],
            strike: ["s", "strike", ["span", function(a) {
              return "line-through" == a.styles["text-decoration"]
            }]],
            subscript: ["sub"],
            superscript: ["sup"]
          },
          b = c.config,
          a = c.lang.basicstyles;
        d("Bold", a.bold, "bold", b.coreStyles_bold);
        d("Italic", a.italic, "italic", b.coreStyles_italic);
        d("Underline", a.underline, "underline", b.coreStyles_underline);
        d("Strike", a.strike, "strike", b.coreStyles_strike);
        d("Subscript", a.subscript,
          "subscript", b.coreStyles_subscript);
        d("Superscript", a.superscript, "superscript", b.coreStyles_superscript);
        c.setKeystroke([
          [CKEDITOR.CTRL + 66, "bold"],
          [CKEDITOR.CTRL + 73, "italic"],
          [CKEDITOR.CTRL + 85, "underline"]
        ])
      }
    });
    CKEDITOR.config.coreStyles_bold = {
      element: "strong",
      overrides: "b"
    };
    CKEDITOR.config.coreStyles_italic = {
      element: "em",
      overrides: "i"
    };
    CKEDITOR.config.coreStyles_underline = {
      element: "u"
    };
    CKEDITOR.config.coreStyles_strike = {
      element: "s",
      overrides: "strike"
    };
    CKEDITOR.config.coreStyles_subscript = {
      element: "sub"
    };
    CKEDITOR.config.coreStyles_superscript = {
      element: "sup"
    };
    (function() {
      function q(a, f, d, b) {
        if (!a.isReadOnly() && !a.equals(d.editable())) {
          CKEDITOR.dom.element.setMarker(b, a, "bidi_processed", 1);
          b = a;
          for (var c = d.editable();
            (b = b.getParent()) && !b.equals(c);)
            if (b.getCustomData("bidi_processed")) {
              a.removeStyle("direction");
              a.removeAttribute("dir");
              return
            }
          b = "useComputedState" in d.config ? d.config.useComputedState : 1;
          (b ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != f && (a.removeStyle("direction"), b ? (a.removeAttribute("dir"), f != a.getComputedStyle("direction") &&
            a.setAttribute("dir", f)) : a.setAttribute("dir", f), d.forceNextSelectionCheck())
        }
      }

      function v(a, f, d) {
        var b = a.getCommonAncestor(!1, !0);
        a = a.clone();
        a.enlarge(d == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
        if (a.checkBoundaryOfElement(b, CKEDITOR.START) && a.checkBoundaryOfElement(b, CKEDITOR.END)) {
          for (var c; b && b.type == CKEDITOR.NODE_ELEMENT && (c = b.getParent()) && 1 == c.getChildCount() && !(b.getName() in f);) b = c;
          return b.type == CKEDITOR.NODE_ELEMENT && b.getName() in f && b
        }
      }

      function p(a) {
        return {
          context: "p",
          allowedContent: {
            "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
              propertiesOnly: !0,
              attributes: "dir"
            }
          },
          requiredContent: "p[dir]",
          refresh: function(a, d) {
            var b = a.config.useComputedState,
              c, b = void 0 === b || b;
            if (!b) {
              c = d.lastElement;
              for (var h = a.editable(); c && !(c.getName() in u || c.equals(h));) {
                var e = c.getParent();
                if (!e) break;
                c = e
              }
            }
            c = c || d.block || d.blockLimit;
            c.equals(a.editable()) && (h = a.getSelection().getRanges()[0].getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (c = h);
            c && (b = b ? c.getComputedStyle("direction") :
              c.getStyle("direction") || c.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF));
            b = (d.block || d.blockLimit || a.editable()).getDirection(1);
            b != (a._.selDir || a.lang.dir) && (a._.selDir = b, a.fire("contentDirChanged", b))
          },
          exec: function(f) {
            var d = f.getSelection(),
              b = f.config.enterMode,
              c = d.getRanges();
            if (c && c.length) {
              for (var h = {}, e = d.createBookmarks(), c = c.createIterator(), g,
                  l = 0; g = c.getNextRange(1);) {
                var k = g.getEnclosedNode();
                k && (!k || k.type == CKEDITOR.NODE_ELEMENT && k.getName() in r) || (k = v(g, t, b));
                k && q(k, a, f, h);
                var m = new CKEDITOR.dom.walker(g),
                  n = e[l].startNode,
                  p = e[l++].endNode;
                m.evaluator = function(a) {
                  var c = b == CKEDITOR.ENTER_P ? "p" : "div",
                    d;
                  if (d = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in t) {
                    if (c = a.is(c)) c = (c = a.getParent()) ? c.type == CKEDITOR.NODE_ELEMENT : !1;
                    d = !(c && a.getParent().is("blockquote"))
                  }
                  return !!(d && a.getPosition(n) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(p) &
                    CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                };
                for (; k = m.next();) q(k, a, f, h);
                g = g.createIterator();
                for (g.enlargeBr = b != CKEDITOR.ENTER_BR; k = g.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");) q(k, a, f, h)
              }
              CKEDITOR.dom.element.clearAllMarkers(h);
              f.forceNextSelectionCheck();
              d.selectBookmarks(e);
              f.focus()
            }
          }
        }
      }

      function w(a) {
        var f = a == l.setAttribute,
          d = a == l.removeAttribute,
          b = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
        return function(c, h) {
          if (!this.isReadOnly()) {
            var e;
            if (e = c == (f || d ?
                "dir" : "direction") || "style" == c && (d || b.test(h))) {
              a: {
                e = this;
                for (var g = e.getDocument().getBody().getParent(); e;) {
                  if (e.equals(g)) {
                    e = !1;
                    break a
                  }
                  e = e.getParent()
                }
                e = !0
              }
              e = !e
            }
            if (e && (e = this.getDirection(1), g = a.apply(this, arguments), e != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), g
          }
          return a.apply(this, arguments)
        }
      }
      var t = {
          table: 1,
          ul: 1,
          ol: 1,
          blockquote: 1,
          div: 1
        },
        r = {},
        u = {};
      CKEDITOR.tools.extend(r, t, {
        tr: 1,
        p: 1,
        div: 1,
        li: 1
      });
      CKEDITOR.tools.extend(u, r, {
        td: 1
      });
      CKEDITOR.plugins.add("bidi", {
        init: function(a) {
          function f(b,
            c, d, e, f) {
            a.addCommand(d, new CKEDITOR.command(a, e));
            a.ui.addButton && a.ui.addButton(b, {
              label: c,
              command: d,
              toolbar: "bidi," + f
            })
          }
          if (!a.blockless) {
            var d = a.lang.bidi;
            f("BidiLtr", d.ltr, "bidiltr", p("ltr"), 10);
            f("BidiRtl", d.rtl, "bidirtl", p("rtl"), 20);
            a.on("contentDom", function() {
              a.document.on("dirChanged", function(b) {
                a.fire("dirChanged", {
                  node: b.data,
                  dir: b.data.getDirection(1)
                })
              })
            });
            a.on("contentDirChanged", function(b) {
              b = (a.lang.dir != b.data ? "add" : "remove") + "Class";
              var c = a.ui.space(a.config.toolbarLocation);
              if (c) c[b]("cke_mixed_dir_content")
            })
          }
        }
      });
      for (var l = CKEDITOR.dom.element.prototype, n = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], m = 0; m < n.length; m++) l[n[m]] = CKEDITOR.tools.override(l[n[m]], w)
    })();
    (function() {
      var m = {
        exec: function(g) {
          var a = g.getCommand("blockquote").state,
            k = g.getSelection(),
            c = k && k.getRanges()[0];
          if (c) {
            var h = k.createBookmarks();
            if (CKEDITOR.env.ie) {
              var e = h[0].startNode,
                b = h[0].endNode,
                d;
              if (e && "blockquote" == e.getParent().getName())
                for (d = e; d = d.getNext();)
                  if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
                    e.move(d, !0);
                    break
                  }
              if (b && "blockquote" == b.getParent().getName())
                for (d = b; d = d.getPrevious();)
                  if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
                    b.move(d);
                    break
                  }
            }
            var f = c.createIterator();
            f.enlargeBr = g.config.enterMode != CKEDITOR.ENTER_BR;
            if (a == CKEDITOR.TRISTATE_OFF) {
              for (e = []; a = f.getNextParagraph();) e.push(a);
              1 > e.length && (a = g.document.createElement(g.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), b = h.shift(), c.insertNode(a), a.append(new CKEDITOR.dom.text("﻿", g.document)), c.moveToBookmark(b), c.selectNodeContents(a), c.collapse(!0), b = c.createBookmark(), e.push(a), h.unshift(b));
              d = e[0].getParent();
              c = [];
              for (b = 0; b < e.length; b++) a = e[b], d = d.getCommonAncestor(a.getParent());
              for (a = {
                  table: 1,
                  tbody: 1,
                  tr: 1,
                  ol: 1,
                  ul: 1
                }; a[d.getName()];) d = d.getParent();
              for (b = null; 0 < e.length;) {
                for (a = e.shift(); !a.getParent().equals(d);) a = a.getParent();
                a.equals(b) || c.push(a);
                b = a
              }
              for (; 0 < c.length;)
                if (a = c.shift(), "blockquote" == a.getName()) {
                  for (b = new CKEDITOR.dom.documentFragment(g.document); a.getFirst();) b.append(a.getFirst().remove()), e.push(b.getLast());
                  b.replace(a)
                } else e.push(a);
              c = g.document.createElement("blockquote");
              for (c.insertBefore(e[0]); 0 < e.length;) a = e.shift(), c.append(a)
            } else if (a == CKEDITOR.TRISTATE_ON) {
              b = [];
              for (d = {}; a = f.getNextParagraph();) {
                for (e = c = null; a.getParent();) {
                  if ("blockquote" == a.getParent().getName()) {
                    c = a.getParent();
                    e = a;
                    break
                  }
                  a = a.getParent()
                }
                c && e && !e.getCustomData("blockquote_moveout") && (b.push(e), CKEDITOR.dom.element.setMarker(d, e, "blockquote_moveout", !0))
              }
              CKEDITOR.dom.element.clearAllMarkers(d);
              a = [];
              e = [];
              for (d = {}; 0 < b.length;) f = b.shift(), c = f.getParent(), f.getPrevious() ? f.getNext() ? (f.breakParent(f.getParent()), e.push(f.getNext())) : f.remove().insertAfter(c) : f.remove().insertBefore(c), c.getCustomData("blockquote_processed") ||
                (e.push(c), CKEDITOR.dom.element.setMarker(d, c, "blockquote_processed", !0)), a.push(f);
              CKEDITOR.dom.element.clearAllMarkers(d);
              for (b = e.length - 1; 0 <= b; b--) {
                c = e[b];
                a: {
                  d = c;
                  for (var f = 0, m = d.getChildCount(), l = void 0; f < m && (l = d.getChild(f)); f++)
                    if (l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary()) {
                      d = !1;
                      break a
                    }
                  d = !0
                }
                d && c.remove()
              }
              if (g.config.enterMode == CKEDITOR.ENTER_BR)
                for (c = !0; a.length;)
                  if (f = a.shift(), "div" == f.getName()) {
                    b = new CKEDITOR.dom.documentFragment(g.document);
                    !c || !f.getPrevious() || f.getPrevious().type ==
                      CKEDITOR.NODE_ELEMENT && f.getPrevious().isBlockBoundary() || b.append(g.document.createElement("br"));
                    for (c = f.getNext() && !(f.getNext().type == CKEDITOR.NODE_ELEMENT && f.getNext().isBlockBoundary()); f.getFirst();) f.getFirst().remove().appendTo(b);
                    c && b.append(g.document.createElement("br"));
                    b.replace(f);
                    c = !1
                  }
            }
            k.selectBookmarks(h);
            g.focus()
          }
        },
        refresh: function(g, a) {
          this.setState(g.elementPath(a.block || a.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
        },
        context: "blockquote",
        allowedContent: "blockquote",
        requiredContent: "blockquote"
      };
      CKEDITOR.plugins.add("blockquote", {
        init: function(g) {
          g.blockless || (g.addCommand("blockquote", m), g.ui.addButton && g.ui.addButton("Blockquote", {
            label: g.lang.blockquote.toolbar,
            command: "blockquote",
            toolbar: "blocks,10"
          }))
        }
      })
    })();
    (function() {
      function r(b, a, c) {
        a.type || (a.type = "auto");
        if (c && !1 === b.fire("beforePaste", a) || !a.dataValue && a.dataTransfer.isEmpty()) return !1;
        a.dataValue || (a.dataValue = "");
        if (CKEDITOR.env.gecko && "drop" == a.method && b.toolbox) b.once("afterPaste", function() {
          b.toolbox.focus()
        });
        return b.fire("paste", a)
      }

      function y(b) {
        function a() {
          var a = b.editable();
          if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
            var d = function(a) {
              b.readOnly && "cut" == a.name || n.initPasteDataTransfer(a, b);
              a.data.preventDefault()
            };
            a.on("copy",
              d);
            a.on("cut", d);
            a.on("cut", function() {
              b.readOnly || b.extractSelectedHtml()
            }, null, null, 999)
          }
          a.on(n.mainPasteEvent, function(b) {
            "beforepaste" == n.mainPasteEvent && p || k(b)
          });
          "beforepaste" == n.mainPasteEvent && (a.on("paste", function(a) {
            v || (e(), a.data.preventDefault(), k(a), f("paste") || b.openDialog("paste"))
          }), a.on("contextmenu", g, null, null, 0), a.on("beforepaste", function(b) {
            !b.data || b.data.$.ctrlKey || b.data.$.shiftKey || g()
          }, null, null, 0));
          a.on("beforecut", function() {
            !p && h(b)
          });
          var c;
          a.attachListener(CKEDITOR.env.ie ?
            a : b.document.getDocumentElement(), "mouseup",
            function() {
              c = setTimeout(function() {
                t()
              }, 0)
            });
          b.on("destroy", function() {
            clearTimeout(c)
          });
          a.on("keyup", t)
        }

        function c(a) {
          return {
            type: a,
            canUndo: "cut" == a,
            startDisabled: !0,
            exec: function() {
              "cut" == this.type && h();
              var a;
              var d = this.type;
              if (CKEDITOR.env.ie) a = f(d);
              else try {
                a = b.document.$.execCommand(d, !1, null)
              } catch (c) {
                a = !1
              }
              a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
              return a
            }
          }
        }

        function d() {
          return {
            canUndo: !1,
            async: !0,
            exec: function(b, a) {
              var d = function(a,
                  d) {
                  a && r(b, a, !!d);
                  b.fire("afterCommandExec", {
                    name: "paste",
                    command: c,
                    returnValue: !!a
                  })
                },
                c = this;
              "string" == typeof a ? d({
                dataValue: a,
                method: "paste",
                dataTransfer: n.initPasteDataTransfer()
              }, 1) : b.getClipboardData(d)
            }
          }
        }

        function e() {
          v = 1;
          setTimeout(function() {
            v = 0
          }, 100)
        }

        function g() {
          p = 1;
          setTimeout(function() {
            p = 0
          }, 10)
        }

        function f(a) {
          var d = b.document,
            c = d.getBody(),
            e = !1,
            f = function() {
              e = !0
            };
          c.on(a, f);
          7 < CKEDITOR.env.version ? d.$.execCommand(a) : d.$.selection.createRange().execCommand(a);
          c.removeListener(a, f);
          return e
        }

        function h() {
          if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
            var a = b.getSelection(),
              d, c, e;
            a.getType() == CKEDITOR.SELECTION_ELEMENT && (d = a.getSelectedElement()) && (c = a.getRanges()[0], e = b.document.createText(""), e.insertBefore(d), c.setStartBefore(e), c.setEndAfter(d), a.selectRanges([c]), setTimeout(function() {
              d.getParent() && (e.remove(), a.selectElement(d))
            }, 0))
          }
        }

        function l(a, d) {
          var c = b.document,
            e = b.editable(),
            f = function(b) {
              b.cancel()
            },
            q;
          if (!c.getById("cke_pastebin")) {
            var g = b.getSelection(),
              h = g.createBookmarks();
            CKEDITOR.env.ie && g.root.fire("selectionchange");
            var m = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is("body") || CKEDITOR.env.ie ? "div" : "body", c);
            m.setAttributes({
              id: "cke_pastebin",
              "data-cke-temp": "1"
            });
            var k = 0,
              c = c.getWindow();
            CKEDITOR.env.webkit ? (e.append(m), m.addClass("cke_editable"), e.is("body") || (k = "static" != e.getComputedStyle("position") ? e : CKEDITOR.dom.element.get(e.$.offsetParent), k = k.getDocumentPosition().y)) : e.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(m);
            m.setStyles({
              position: "absolute",
              top: c.getScrollPosition().y - k + 10 + "px",
              width: "1px",
              height: Math.max(1, c.getViewPaneSize().height - 20) + "px",
              overflow: "hidden",
              margin: 0,
              padding: 0
            });
            CKEDITOR.env.safari && m.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text"));
            (k = m.getParent().isReadOnly()) ? (m.setOpacity(0), m.setAttribute("contenteditable", !0)) : m.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-1000px");
            b.on("selectionChange", f, null, null, 0);
            if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) q = e.once("blur", f, null, null, -100);
            k && m.focus();
            k = new CKEDITOR.dom.range(m);
            k.selectNodeContents(m);
            var t = k.select();
            CKEDITOR.env.ie && (q = e.once("blur", function() {
              b.lockSelection(t)
            }));
            var l = CKEDITOR.document.getWindow().getScrollPosition().y;
            setTimeout(function() {
              CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = l);
              q && q.removeListener();
              CKEDITOR.env.ie && e.focus();
              g.selectBookmarks(h);
              m.remove();
              var a;
              CKEDITOR.env.webkit && (a = m.getFirst()) && a.is && a.hasClass("Apple-style-span") && (m = a);
              b.removeListener("selectionChange", f);
              d(m.getHtml())
            }, 0)
          }
        }

        function z() {
          if ("paste" == n.mainPasteEvent) return b.fire("beforePaste", {
            type: "auto",
            method: "paste"
          }), !1;
          b.focus();
          e();
          var a = b.focusManager;
          a.lock();
          if (b.editable().fire(n.mainPasteEvent) && !f("paste")) return a.unlock(), !1;
          a.unlock();
          return !0
        }

        function q(a) {
          if ("wysiwyg" == b.mode) switch (a.data.keyCode) {
            case CKEDITOR.CTRL + 86:
            case CKEDITOR.SHIFT + 45:
              a = b.editable();
              e();
              "paste" == n.mainPasteEvent && a.fire("beforepaste");
              break;
            case CKEDITOR.CTRL + 88:
            case CKEDITOR.SHIFT + 46:
              b.fire("saveSnapshot"),
                setTimeout(function() {
                  b.fire("saveSnapshot")
                }, 50)
          }
        }

        function k(a) {
          var d = {
            type: "auto",
            method: "paste",
            dataTransfer: n.initPasteDataTransfer(a)
          };
          d.dataTransfer.cacheData();
          var c = !1 !== b.fire("beforePaste", d);
          c && n.canClipboardApiBeTrusted(d.dataTransfer, b) ? (a.data.preventDefault(), setTimeout(function() {
            r(b, d)
          }, 0)) : l(a, function(a) {
            d.dataValue = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
            c && r(b, d)
          })
        }

        function t() {
          if ("wysiwyg" == b.mode) {
            var a = u("paste");
            b.getCommand("cut").setState(u("cut"));
            b.getCommand("copy").setState(u("copy"));
            b.getCommand("paste").setState(a);
            b.fire("pasteState", a)
          }
        }

        function u(a) {
          if (w && a in {
              paste: 1,
              cut: 1
            }) return CKEDITOR.TRISTATE_DISABLED;
          if ("paste" == a) return CKEDITOR.TRISTATE_OFF;
          a = b.getSelection();
          var d = a.getRanges();
          return a.getType() == CKEDITOR.SELECTION_NONE || 1 == d.length && d[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
        }
        var n = CKEDITOR.plugins.clipboard,
          p = 0,
          v = 0,
          w = 0;
        (function() {
          b.on("key", q);
          b.on("contentDom", a);
          b.on("selectionChange", function(b) {
            w = b.data.selection.getRanges()[0].checkReadOnly();
            t()
          });
          b.contextMenu && b.contextMenu.addListener(function(b, a) {
            w = a.getRanges()[0].checkReadOnly();
            return {
              cut: u("cut"),
              copy: u("copy"),
              paste: u("paste")
            }
          })
        })();
        (function() {
          function a(d, c, e, f, q) {
            var g = b.lang.clipboard[c];
            b.addCommand(c, e);
            b.ui.addButton && b.ui.addButton(d, {
              label: g,
              command: c,
              toolbar: "clipboard," + f
            });
            b.addMenuItems && b.addMenuItem(c, {
              label: g,
              command: c,
              group: "clipboard",
              order: q
            })
          }
          a("Cut", "cut", c("cut"), 10, 1);
          a("Copy", "copy", c("copy"), 20, 4);
          a("Paste", "paste", d(), 30, 8)
        })();
        b.getClipboardData =
          function(a, d) {
            function c(a) {
              a.removeListener();
              a.cancel();
              d(a.data)
            }

            function e(a) {
              a.removeListener();
              a.cancel();
              k = !0;
              d({
                type: g,
                dataValue: a.data.dataValue,
                dataTransfer: a.data.dataTransfer,
                method: "paste"
              })
            }

            function f() {
              this.customTitle = a && a.title
            }
            var q = !1,
              g = "auto",
              k = !1;
            d || (d = a, a = null);
            b.on("paste", c, null, null, 0);
            b.on("beforePaste", function(a) {
              a.removeListener();
              q = !0;
              g = a.data.type
            }, null, null, 1E3);
            !1 === z() && (b.removeListener("paste", c), q && b.fire("pasteDialog", f) ? (b.on("pasteDialogCommit", e), b.on("dialogHide",
              function(a) {
                a.removeListener();
                a.data.removeListener("pasteDialogCommit", e);
                setTimeout(function() {
                  k || d(null)
                }, 10)
              })) : d(null))
          }
      }

      function A(b) {
        if (CKEDITOR.env.webkit) {
          if (!b.match(/^[^<]*$/g) && !b.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
        } else if (CKEDITOR.env.ie) {
          if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi) && !b.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
        } else if (CKEDITOR.env.gecko) {
          if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
        } else return "html";
        return "htmlifiedtext"
      }

      function B(b, a) {
        function c(a) {
          return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
        }
        a = a.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e");
        a = a.replace(/<\/?[A-Z]+>/g, function(a) {
          return a.toLowerCase()
        });
        if (a.match(/^[^<]$/)) return a;
        CKEDITOR.env.webkit && -1 < a.indexOf("\x3cdiv\x3e") && (a = a.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), a.match(/<div>(<br>|)<\/div>/) &&
          (a = "\x3cp\x3e" + a.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
            return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1)
          }) + "\x3c/p\x3e"), a = a.replace(/<\/div><div>/g, "\x3cbr\x3e"), a = a.replace(/<\/?div>/g, ""));
        CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (a = a.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < a.indexOf("\x3cbr\x3e\x3cbr\x3e") && (a = "\x3cp\x3e" + a.replace(/(<br>){2,}/g, function(a) {
          return c(a.length / 4)
        }) + "\x3c/p\x3e"));
        return C(b, a)
      }

      function D() {
        function b() {
          var a = {},
            b;
          for (b in CKEDITOR.dtd) "$" !=
            b.charAt(0) && "div" != b && "span" != b && (a[b] = 1);
          return a
        }
        var a = {};
        return {
          get: function(c) {
            return "plain-text" == c ? a.plainText || (a.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = a.semanticContent) || (c = new CKEDITOR.filter, c.allow({
              $1: {
                elements: b(),
                attributes: !0,
                styles: !1,
                classes: !1
              }
            }), c = a.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null
          }
        }
      }

      function x(b, a, c) {
        a = CKEDITOR.htmlParser.fragment.fromHtml(a);
        var d = new CKEDITOR.htmlParser.basicWriter;
        c.applyTo(a, !0, !1, b.activeEnterMode);
        a.writeHtml(d);
        return d.getHtml()
      }

      function C(b, a) {
        b.enterMode == CKEDITOR.ENTER_BR ? a = a.replace(/(<\/p><p>)+/g, function(a) {
          return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2)
        }).replace(/<\/?p>/g, "") : b.enterMode == CKEDITOR.ENTER_DIV && (a = a.replace(/<(\/)?p>/g, "\x3c$1div\x3e"));
        return a
      }

      function E(b) {
        b.data.preventDefault();
        b.data.$.dataTransfer.dropEffect = "none"
      }

      function F(b) {
        var a = CKEDITOR.plugins.clipboard;
        b.on("contentDom", function() {
          function c(a, d, c) {
            d.select();
            r(b, {
              dataTransfer: c,
              method: "drop"
            }, 1);
            c.sourceEditor.fire("saveSnapshot");
            c.sourceEditor.editable().extractHtmlFromRange(a);
            c.sourceEditor.getSelection().selectRanges([a]);
            c.sourceEditor.fire("saveSnapshot")
          }

          function d(d, c) {
            d.select();
            r(b, {
              dataTransfer: c,
              method: "drop"
            }, 1);
            a.resetDragDataTransfer()
          }

          function e(a, d, c) {
            var e = {
              $: a.data.$,
              target: a.data.getTarget()
            };
            d && (e.dragRange = d);
            c && (e.dropRange = c);
            !1 === b.fire(a.name, e) && a.data.preventDefault()
          }

          function g(a) {
            a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent());
            return a.getChildCount()
          }
          var f = b.editable(),
            h = CKEDITOR.plugins.clipboard.getDropTarget(b),
            l = b.ui.space("top"),
            p = b.ui.space("bottom");
          a.preventDefaultDropOnElement(l);
          a.preventDefaultDropOnElement(p);
          f.attachListener(h, "dragstart", e);
          f.attachListener(b, "dragstart", a.resetDragDataTransfer, a, null, 1);
          f.attachListener(b, "dragstart", function(d) {
            a.initDragDataTransfer(d, b)
          }, null, null, 2);
          f.attachListener(b, "dragstart", function() {
            var d = a.dragRange = b.getSelection().getRanges()[0];
            CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (a.dragStartContainerChildCount = d ? g(d.startContainer) : null, a.dragEndContainerChildCount =
              d ? g(d.endContainer) : null)
          }, null, null, 100);
          f.attachListener(h, "dragend", e);
          f.attachListener(b, "dragend", a.initDragDataTransfer, a, null, 1);
          f.attachListener(b, "dragend", a.resetDragDataTransfer, a, null, 100);
          f.attachListener(h, "dragover", function(a) {
            var b = a.data.getTarget();
            b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault()
          });
          f.attachListener(h, "drop", function(d) {
            if (!d.data.$.defaultPrevented) {
              d.data.preventDefault();
              var c = d.data.getTarget();
              if (!c.isReadOnly() || c.type == CKEDITOR.NODE_ELEMENT && c.is("html")) {
                var c = a.getRangeAtDropPosition(d, b),
                  f = a.dragRange;
                c && e(d, f, c)
              }
            }
          }, null, null, 9999);
          f.attachListener(b, "drop", a.initDragDataTransfer, a, null, 1);
          f.attachListener(b, "drop", function(e) {
            if (e = e.data) {
              var f = e.dropRange,
                g = e.dragRange,
                h = e.dataTransfer;
              h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function() {
                  a.internalDrop(g, f, h, b)
                }, 0) : h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c(g, f, h) :
                d(f, h)
            }
          }, null, null, 9999)
        })
      }
      CKEDITOR.plugins.add("clipboard", {
        requires: "dialog",
        init: function(b) {
          var a, c = D();
          b.config.forcePasteAsPlainText ? a = "plain-text" : b.config.pasteFilter ? a = b.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in b.config || (a = "semantic-content");
          b.pasteFilter = c.get(a);
          y(b);
          F(b);
          CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
          b.on("paste", function(a) {
            a.data.dataTransfer || (a.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer);
            if (!a.data.dataValue) {
              var c =
                a.data.dataTransfer,
                g = c.getData("text/html");
              if (g) a.data.dataValue = g, a.data.type = "html";
              else if (g = c.getData("text/plain")) a.data.dataValue = b.editable().transformPlainTextToHtml(g), a.data.type = "text"
            }
          }, null, null, 1);
          b.on("paste", function(a) {
            var b = a.data.dataValue,
              c = CKEDITOR.dtd.$block; - 1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
              return b.replace(/\t/g,
                "\x26nbsp;\x26nbsp; \x26nbsp;")
            })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
            if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
              var f, h, l = new CKEDITOR.dom.element("div");
              for (l.setHtml(b); 1 == l.getChildCount() && (f = l.getFirst()) && f.type == CKEDITOR.NODE_ELEMENT && (f.hasClass("cke_editable") || f.hasClass("cke_contents"));) l = h = f;
              h && (b = h.getHtml().replace(/<br>$/i, ""))
            }
            CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, f) {
              return f.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + f) : b
            }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, f) {
              return f in c ? (a.data.endsWithEOL = 1, "\x3c/" + f + "\x3e") : b
            }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
            a.data.dataValue = b
          }, null, null, 3);
          b.on("paste", function(a) {
              a = a.data;
              var e = a.type,
                g = a.dataValue,
                f, h = b.config.clipboard_defaultContentType || "html",
                l = a.dataTransfer.getTransferType(b);
              f = "html" == e || "html" == a.preSniffing ? "html" : A(g);
              "htmlifiedtext" == f && (g = B(b.config, g));
              "text" == e && "html" == f ? g = x(b, g, c.get("plain-text")) : l == CKEDITOR.DATA_TRANSFER_EXTERNAL && b.pasteFilter && !a.dontFilter && (g = x(b, g, b.pasteFilter));
              a.startsWithEOL && (g = '\x3cbr data-cke-eol\x3d"1"\x3e' + g);
              a.endsWithEOL && (g += '\x3cbr data-cke-eol\x3d"1"\x3e');
              "auto" == e && (e = "html" == f || "html" == h ? "html" : "text");
              a.type = e;
              a.dataValue = g;
              delete a.preSniffing;
              delete a.startsWithEOL;
              delete a.endsWithEOL
            },
            null, null, 6);
          b.on("paste", function(a) {
            a = a.data;
            a.dataValue && (b.insertHtml(a.dataValue, a.type, a.range), setTimeout(function() {
              b.fire("afterPaste")
            }, 0))
          }, null, null, 1E3);
          b.on("pasteDialog", function(a) {
            setTimeout(function() {
              b.openDialog("paste", a.data)
            }, 0)
          })
        }
      });
      CKEDITOR.plugins.clipboard = {
        isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
        isCustomDataTypesSupported: !CKEDITOR.env.ie,
        isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
        mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ?
          "beforepaste" : "paste",
        canClipboardApiBeTrusted: function(b, a) {
          return b.getTransferType(a) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !b.isEmpty() || CKEDITOR.env.gecko && (b.getData("text/html") || b.getFilesCount()) ? !0 : !1
        },
        getDropTarget: function(b) {
          var a = b.editable();
          return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || a.isInline() ? a : b.document
        },
        fixSplitNodesAfterDrop: function(b, a, c, d) {
          function e(b, c, d) {
            var e = b;
            e.type == CKEDITOR.NODE_TEXT && (e = b.getParent());
            if (e.equals(c) && d != c.getChildCount()) return b =
              a.startContainer.getChild(a.startOffset - 1), c = a.startContainer.getChild(a.startOffset), b && b.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = b.getLength(), b.setText(b.getText() + c.getText()), c.remove(), a.setStart(b, d), a.collapse(!0)), !0
          }
          var g = a.startContainer;
          "number" == typeof d && "number" == typeof c && g.type == CKEDITOR.NODE_ELEMENT && (e(b.startContainer, g, c) || e(b.endContainer, g, d))
        },
        isDropRangeAffectedByDragRange: function(b, a) {
          var c = a.startContainer,
            d = a.endOffset;
          return b.endContainer.equals(c) &&
            b.endOffset <= d || b.startContainer.getParent().equals(c) && b.startContainer.getIndex() < d || b.endContainer.getParent().equals(c) && b.endContainer.getIndex() < d ? !0 : !1
        },
        internalDrop: function(b, a, c, d) {
          var e = CKEDITOR.plugins.clipboard,
            g = d.editable(),
            f, h;
          d.fire("saveSnapshot");
          d.fire("lockSnapshot", {
            dontUpdate: 1
          });
          CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, a, e.dragStartContainerChildCount, e.dragEndContainerChildCount);
          (h = this.isDropRangeAffectedByDragRange(b, a)) || (f = b.createBookmark(!1));
          e = a.clone().createBookmark(!1);
          h && (f = b.createBookmark(!1));
          b = f.startNode;
          a = f.endNode;
          h = e.startNode;
          a && b.getPosition(h) & CKEDITOR.POSITION_PRECEDING && a.getPosition(h) & CKEDITOR.POSITION_FOLLOWING && h.insertBefore(b);
          b = d.createRange();
          b.moveToBookmark(f);
          g.extractHtmlFromRange(b, 1);
          a = d.createRange();
          a.moveToBookmark(e);
          r(d, {
            dataTransfer: c,
            method: "drop",
            range: a
          }, 1);
          d.fire("unlockSnapshot")
        },
        getRangeAtDropPosition: function(b, a) {
          var c = b.data.$,
            d = c.clientX,
            e = c.clientY,
            g = a.getSelection(!0).getRanges()[0],
            f =
            a.createRange();
          if (b.data.testRange) return b.data.testRange;
          if (document.caretRangeFromPoint) c = a.document.$.caretRangeFromPoint(d, e), f.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), f.collapse(!0);
          else if (c.rangeParent) f.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), f.collapse(!0);
          else {
            if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && g && a.editable().hasFocus) return g;
            if (document.body.createTextRange) {
              a.focus();
              c = a.document.getBody().$.createTextRange();
              try {
                for (var h = !1, l = 0; 20 > l &&
                  !h; l++) {
                  if (!h) try {
                    c.moveToPoint(d, e - l), h = !0
                  } catch (p) {}
                  if (!h) try {
                    c.moveToPoint(d, e + l), h = !0
                  } catch (q) {}
                }
                if (h) {
                  var k = "cke-temp-" + (new Date).getTime();
                  c.pasteHTML('\x3cspan id\x3d"' + k + '"\x3e​\x3c/span\x3e');
                  var t = a.document.getById(k);
                  f.moveToPosition(t, CKEDITOR.POSITION_BEFORE_START);
                  t.remove()
                } else {
                  var u = a.document.$.elementFromPoint(d, e),
                    n = new CKEDITOR.dom.element(u),
                    r;
                  if (n.equals(a.editable()) || "html" == n.getName()) return g && g.startContainer && !g.startContainer.equals(a.editable()) ? g : null;
                  r = n.getClientRect();
                  d < r.left ? f.setStartAt(n, CKEDITOR.POSITION_AFTER_START) : f.setStartAt(n, CKEDITOR.POSITION_BEFORE_END);
                  f.collapse(!0)
                }
              } catch (v) {
                return null
              }
            } else return null
          }
          return f
        },
        initDragDataTransfer: function(b, a) {
          var c = b.data.$ ? b.data.$.dataTransfer : null,
            d = new this.dataTransfer(c, a);
          c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d;
          b.data.dataTransfer = d
        },
        resetDragDataTransfer: function() {
          this.dragData = null
        },
        initPasteDataTransfer: function(b, a) {
          if (this.isCustomCopyCutSupported &&
            b && b.data && b.data.$) {
            var c = new this.dataTransfer(b.data.$.clipboardData, a);
            this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = b.data.$.clipboardData) : this.copyCutData = c;
            return c
          }
          return new this.dataTransfer(null, a)
        },
        preventDefaultDropOnElement: function(b) {
          b && b.on("dragover", E)
        }
      };
      var p = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
      CKEDITOR.plugins.clipboard.dataTransfer = function(b, a) {
        b && (this.$ = b);
        this._ = {
          metaRegExp: /^<meta.*?>/i,
          bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,
          fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g,
          data: {},
          files: [],
          normalizeType: function(a) {
            a = a.toLowerCase();
            return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a
          }
        };
        this.id = this.getData(p);
        this.id || (this.id = "Text" == p ? "" : "cke-" + CKEDITOR.tools.getUniqueId());
        if ("Text" != p) try {
          this.$.setData(p, this.id)
        } catch (c) {}
        a && (this.sourceEditor = a, this.setData("text/html", a.getSelectedHtml(1)), "Text" == p || this.getData("text/plain") || this.setData("text/plain", a.getSelection().getSelectedText()))
      };
      CKEDITOR.DATA_TRANSFER_INTERNAL =
        1;
      CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2;
      CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
      CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
        getData: function(b) {
          b = this._.normalizeType(b);
          var a = this._.data[b];
          if (void 0 === a || null === a || "" === a) try {
            a = this.$.getData(b)
          } catch (c) {}
          if (void 0 === a || null === a || "" === a) a = "";
          "text/html" == b ? (a = a.replace(this._.metaRegExp, ""), (b = this._.bodyRegExp.exec(a)) && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, ""))) : "Text" == b && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == a.substring(0,
            7) && (a = "");
          return a
        },
        setData: function(b, a) {
          b = this._.normalizeType(b);
          this._.data[b] = a;
          if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == b || "Text" == b) {
            "Text" == p && "Text" == b && (this.id = a);
            try {
              this.$.setData(b, a)
            } catch (c) {}
          }
        },
        getTransferType: function(b) {
          return this.sourceEditor ? this.sourceEditor == b ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
        },
        cacheData: function() {
          function b(b) {
            b = a._.normalizeType(b);
            var c = a.getData(b);
            c && (a._.data[b] =
              c)
          }
          if (this.$) {
            var a = this,
              c, d;
            if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
              if (this.$.types)
                for (c = 0; c < this.$.types.length; c++) b(this.$.types[c])
            } else b("Text"), b("URL");
            d = this._getImageFromClipboard();
            if (this.$ && this.$.files || d) {
              this._.files = [];
              for (c = 0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]);
              0 === this._.files.length && d && this._.files.push(d)
            }
          }
        },
        getFilesCount: function() {
          return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length :
            this._getImageFromClipboard() ? 1 : 0
        },
        getFile: function(b) {
          return this._.files.length ? this._.files[b] : this.$ && this.$.files && this.$.files.length ? this.$.files[b] : 0 === b ? this._getImageFromClipboard() : void 0
        },
        isEmpty: function() {
          var b = {},
            a;
          if (this.getFilesCount()) return !1;
          for (a in this._.data) b[a] = 1;
          if (this.$)
            if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
              if (this.$.types)
                for (var c = 0; c < this.$.types.length; c++) b[this.$.types[c]] = 1
            } else b.Text = 1, b.URL = 1;
            "Text" != p && (b[p] = 0);
          for (a in b)
            if (b[a] && "" !==
              this.getData(a)) return !1;
          return !0
        },
        _getImageFromClipboard: function() {
          var b;
          if (this.$ && this.$.items && this.$.items[0]) try {
            if ((b = this.$.items[0].getAsFile()) && b.type) return b
          } catch (a) {}
        }
      }
    })();
    (function() {
      var c = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
      CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"');
      CKEDITOR.env.gecko && (c += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
      var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
        c = c + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
        r = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"),
        t = CKEDITOR.addTemplate("button", c);
      CKEDITOR.plugins.add("button", {
        beforeInit: function(a) {
          a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
        }
      });
      CKEDITOR.UI_BUTTON = "button";
      CKEDITOR.ui.button = function(a) {
        CKEDITOR.tools.extend(this, a, {
          title: a.label,
          click: a.click || function(b) {
            b.execCommand(a.command)
          }
        });
        this._ = {}
      };
      CKEDITOR.ui.button.handler = {
        create: function(a) {
          return new CKEDITOR.ui.button(a)
        }
      };
      CKEDITOR.ui.button.prototype = {
        render: function(a, b) {
          function c() {
            var e = a.mode;
            e && (e = this.modes[e] ? void 0 !== k[e] ? k[e] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, e = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : e, this.setState(e), this.refresh && this.refresh())
          }
          var l = CKEDITOR.env,
            m = this._.id = CKEDITOR.tools.getNextId(),
            f = "",
            g = this.command,
            n;
          this._.editor = a;
          var d = {
              id: m,
              button: this,
              editor: a,
              focus: function() {
                CKEDITOR.document.getById(m).focus()
              },
              execute: function() {
                this.button.click(a)
              },
              attach: function(a) {
                this.button.attach(a)
              }
            },
            u = CKEDITOR.tools.addFunction(function(a) {
              if (d.onkey) return a = new CKEDITOR.dom.event(a), !1 !== d.onkey(d, a.getKeystroke())
            }),
            v = CKEDITOR.tools.addFunction(function(a) {
              var b;
              d.onfocus && (b = !1 !== d.onfocus(d, new CKEDITOR.dom.event(a)));
              return b
            }),
            p = 0;
          d.clickFn = n = CKEDITOR.tools.addFunction(function() {
            p && (a.unlockSelection(1), p = 0);
            d.execute();
            l.iOS && a.focus()
          });
          if (this.modes) {
            var k = {};
            a.on("beforeModeUnload", function() {
              a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (k[a.mode] = this._.state)
            }, this);
            a.on("activeFilterChange",
              c, this);
            a.on("mode", c, this);
            !this.readOnly && a.on("readOnly", c, this)
          } else g && (g = a.getCommand(g)) && (g.on("state", function() {
            this.setState(g.state)
          }, this), f += g.state == CKEDITOR.TRISTATE_ON ? "on" : g.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
          if (this.directional) a.on("contentDirChanged", function(b) {
            var c = CKEDITOR.document.getById(this._.id),
              d = c.getFirst();
            b = b.data;
            b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl");
            d.setAttribute("style", CKEDITOR.skin.getIconStyle(h,
              "rtl" == b, this.icon, this.iconOffset))
          }, this);
          g || (f += "off");
          var q = this.name || this.command,
            h = q;
          this.icon && !/\./.test(this.icon) && (h = this.icon, this.icon = null);
          f = {
            id: m,
            name: q,
            iconName: h,
            label: this.label,
            cls: this.className || "",
            state: f,
            ariaDisabled: "disabled" == f ? "true" : "false",
            title: this.title,
            titleJs: l.gecko && !l.hc ? "" : (this.title || "").replace("'", ""),
            hasArrow: this.hasArrow ? "true" : "false",
            keydownFn: u,
            focusFn: v,
            clickFn: n,
            style: CKEDITOR.skin.getIconStyle(h, "rtl" == a.lang.dir, this.icon, this.iconOffset),
            arrowHtml: this.hasArrow ?
              r.output() : ""
          };
          t.output(f, b);
          if (this.onRender) this.onRender();
          return d
        },
        setState: function(a) {
          if (this._.state == a) return !1;
          this._.state = a;
          var b = CKEDITOR.document.getById(this._.id);
          return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"), this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ?
            b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
        },
        getState: function() {
          return this._.state
        },
        toFeature: function(a) {
          if (this._.feature) return this._.feature;
          var b = this;
          this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b);
          return this._.feature = b
        }
      };
      CKEDITOR.ui.prototype.addButton = function(a, b) {
        this.add(a, CKEDITOR.UI_BUTTON, b)
      }
    })();
    CKEDITOR.plugins.add("panelbutton", {
      requires: "button",
      onLoad: function() {
        function e(c) {
          var a = this._;
          a.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(c), a.on ? a.panel.hide() : a.panel.showBlock(this._.id, this.document.getById(this._.id), 4))
        }
        CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
          base: CKEDITOR.ui.button,
          $: function(c) {
            var a = c.panel || {};
            delete c.panel;
            this.base(c);
            this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
            a.block = {
              attributes: a.attributes
            };
            this.hasArrow = a.toolbarRelated = !0;
            this.click = e;
            this._ = {
              panelDefinition: a
            }
          },
          statics: {
            handler: {
              create: function(c) {
                return new CKEDITOR.ui.panelButton(c)
              }
            }
          },
          proto: {
            createPanel: function(c) {
              var a = this._;
              if (!a.panel) {
                var f = this._.panelDefinition,
                  e = this._.panelDefinition.block,
                  g = f.parent || CKEDITOR.document.getBody(),
                  d = this._.panel = new CKEDITOR.ui.floatPanel(c, g, f),
                  f = d.addBlock(a.id, e),
                  b = this;
                d.onShow = function() {
                  b.className && this.element.addClass(b.className + "_panel");
                  b.setState(CKEDITOR.TRISTATE_ON);
                  a.on = 1;
                  b.editorFocus && c.focus();
                  if (b.onOpen) b.onOpen()
                };
                d.onHide = function(d) {
                  b.className && this.element.getFirst().removeClass(b.className + "_panel");
                  b.setState(b.modes && b.modes[c.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                  a.on = 0;
                  if (!d && b.onClose) b.onClose()
                };
                d.onEscape = function() {
                  d.hide(1);
                  b.document.getById(a.id).focus()
                };
                if (this.onBlock) this.onBlock(d, f);
                f.onHide = function() {
                  a.on = 0;
                  b.setState(CKEDITOR.TRISTATE_OFF)
                }
              }
            }
          }
        })
      },
      beforeInit: function(e) {
        e.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler)
      }
    });
    CKEDITOR.UI_PANELBUTTON = "panelbutton";
    (function() {
      CKEDITOR.plugins.add("panel", {
        beforeInit: function(a) {
          a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
        }
      });
      CKEDITOR.UI_PANEL = "panel";
      CKEDITOR.ui.panel = function(a, b) {
        b && CKEDITOR.tools.extend(this, b);
        CKEDITOR.tools.extend(this, {
          className: "",
          css: []
        });
        this.id = CKEDITOR.tools.getNextId();
        this.document = a;
        this.isFramed = this.forceIFrame || this.css.length;
        this._ = {
          blocks: {}
        }
      };
      CKEDITOR.ui.panel.handler = {
        create: function(a) {
          return new CKEDITOR.ui.panel(a)
        }
      };
      var f = CKEDITOR.addTemplate("panel",
          '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
        g = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
        h = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
      CKEDITOR.ui.panel.prototype = {
        render: function(a, b) {
          this.getHolderElement = function() {
            var a = this._.holder;
            if (!a) {
              if (this.isFramed) {
                var a = this.document.getById(this.id + "_frame"),
                  b = a.getParent(),
                  a = a.getFrameDocument();
                CKEDITOR.env.iOS && b.setStyles({
                  overflow: "scroll",
                  "-webkit-overflow-scrolling": "touch"
                });
                b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
                  this.isLoaded = !0;
                  if (this.onLoad) this.onLoad()
                }, this));
                a.write(h.output(CKEDITOR.tools.extend({
                  css: CKEDITOR.tools.buildStyleHtml(this.css),
                  onload: "window.parent.CKEDITOR.tools.callFunction(" +
                    b + ");"
                }, d)));
                a.getWindow().$.CKEDITOR = CKEDITOR;
                a.on("keydown", function(a) {
                  var b = a.data.getKeystroke(),
                    c = this.document.getById(this.id).getAttribute("dir");
                  this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
                }, this);
                a = a.getBody();
                a.unselectable();
                CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
              } else a = this.document.getById(this.id);
              this._.holder = a
            }
            return a
          };
          var d = {
            editorId: a.id,
            id: this.id,
            langCode: a.langCode,
            dir: a.lang.dir,
            cls: this.className,
            frame: "",
            env: CKEDITOR.env.cssClass,
            "z-index": a.config.baseFloatZIndex + 1
          };
          if (this.isFramed) {
            var e = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
            d.frame = g.output({
              id: this.id + "_frame",
              src: e
            })
          }
          e = f.output(d);
          b && b.push(e);
          return e
        },
        addBlock: function(a, b) {
          b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(),
            b);
          this._.currentBlock || this.showBlock(a);
          return b
        },
        getBlock: function(a) {
          return this._.blocks[a]
        },
        showBlock: function(a) {
          a = this._.blocks[a];
          var b = this._.currentBlock,
            d = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
          b && b.hide();
          this._.currentBlock = a;
          CKEDITOR.fire("ariaWidget", d);
          a._.focusIndex = -1;
          this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
          a.show();
          return a
        },
        destroy: function() {
          this.element && this.element.remove()
        }
      };
      CKEDITOR.ui.panel.block =
        CKEDITOR.tools.createClass({
          $: function(a, b) {
            this.element = a.append(a.getDocument().createElement("div", {
              attributes: {
                tabindex: -1,
                "class": "cke_panel_block"
              },
              styles: {
                display: "none"
              }
            }));
            b && CKEDITOR.tools.extend(this, b);
            this.element.setAttributes({
              role: this.attributes.role || "presentation",
              "aria-label": this.attributes["aria-label"],
              title: this.attributes.title || this.attributes["aria-label"]
            });
            this.keys = {};
            this._.focusIndex = -1;
            this.element.disableContextMenu()
          },
          _: {
            markItem: function(a) {
              -1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
            }
          },
          proto: {
            show: function() {
              this.element.setStyle("display", "")
            },
            hide: function() {
              this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none")
            },
            onKeyDown: function(a, b) {
              var d = this.keys[a];
              switch (d) {
                case "next":
                  for (var e = this._.focusIndex, d = this.element.getElementsByTag("a"), c; c = d.getItem(++e);)
                    if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                      this._.focusIndex = e;
                      c.focus();
                      break
                    }
                  return c ||
                    b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1));
                case "prev":
                  e = this._.focusIndex;
                  for (d = this.element.getElementsByTag("a"); 0 < e && (c = d.getItem(--e));) {
                    if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                      this._.focusIndex = e;
                      c.focus();
                      break
                    }
                    c = null
                  }
                  return c || b ? !1 : (this._.focusIndex = d.count(), this.onKeyDown(a, 1));
                case "click":
                case "mouseup":
                  return e = this._.focusIndex, (c = 0 <= e && this.element.getElementsByTag("a").getItem(e)) && (c.$[d] ? c.$[d]() : c.$["on" + d]()), !1
              }
              return !0
            }
          }
        })
    })();
    CKEDITOR.plugins.add("floatpanel", {
      requires: "panel"
    });
    (function() {
      function v(a, b, c, l, h) {
        h = CKEDITOR.tools.genKey(b.getUniqueId(), c.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", h || "");
        var g = f[h];
        g || (g = f[h] = new CKEDITOR.ui.panel(b, l), g.element = c.append(CKEDITOR.dom.element.createFromHtml(g.render(a), b)), g.element.setStyles({
          display: "none",
          position: "absolute"
        }));
        return g
      }
      var f = {};
      CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
        $: function(a, b, c, l) {
          function h() {
            e.hide()
          }
          c.forceIFrame = 1;
          c.toolbarRelated && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE &&
            (b = CKEDITOR.document.getById("cke_" + a.name));
          var g = b.getDocument();
          l = v(a, g, b, c, l || 0);
          var m = l.element,
            p = m.getFirst(),
            e = this;
          m.disableContextMenu();
          this.element = m;
          this._ = {
            editor: a,
            panel: l,
            parentElement: b,
            definition: c,
            document: g,
            iframe: p,
            children: [],
            dir: a.lang.dir,
            showBlockParams: null
          };
          a.on("mode", h);
          a.on("resize", h);
          g.getWindow().on("resize", function() {
            this.reposition()
          }, this)
        },
        proto: {
          addBlock: function(a, b) {
            return this._.panel.addBlock(a, b)
          },
          addListBlock: function(a, b) {
            return this._.panel.addListBlock(a,
              b)
          },
          getBlock: function(a) {
            return this._.panel.getBlock(a)
          },
          showBlock: function(a, b, c, l, h, g) {
            var m = this._.panel,
              p = m.showBlock(a);
            this._.showBlockParams = [].slice.call(arguments);
            this.allowBlur(!1);
            var e = this._.editor.editable();
            this._.returnFocus = e.hasFocus ? e : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
            this._.hideTimeout = 0;
            var k = this.element,
              e = this._.iframe,
              e = CKEDITOR.env.ie && !CKEDITOR.env.edge ? e : new CKEDITOR.dom.window(e.$.contentWindow),
              f = k.getDocument(),
              r = this._.parentElement.getPositionedAncestor(),
              t = b.getDocumentPosition(f),
              f = r ? r.getDocumentPosition(f) : {
                x: 0,
                y: 0
              },
              q = "rtl" == this._.dir,
              d = t.x + (l || 0) - f.x,
              n = t.y + (h || 0) - f.y;
            !q || 1 != c && 4 != c ? q || 2 != c && 3 != c || (d += b.$.offsetWidth - 1) : d += b.$.offsetWidth;
            if (3 == c || 4 == c) n += b.$.offsetHeight - 1;
            this._.panel._.offsetParentId = b.getId();
            k.setStyles({
              top: n + "px",
              left: 0,
              display: ""
            });
            k.setOpacity(0);
            k.getFirst().removeStyle("width");
            this._.editor.focusManager.add(e);
            this._.blurSet || (CKEDITOR.event.useCapture = !0, e.on("blur", function(a) {
                function u() {
                  delete this._.returnFocus;
                  this.hide()
                }
                this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(u, 0, this)) : u.call(this))
              }, this), e.on("focus", function() {
                this._.focused = !0;
                this.hideChild();
                this.allowBlur(!0)
              }, this), CKEDITOR.env.iOS && (e.on("touchstart", function() {
                clearTimeout(this._.hideTimeout)
              }, this), e.on("touchend", function() {
                this._.hideTimeout = 0;
                this.focus()
              }, this)), CKEDITOR.event.useCapture = !1,
              this._.blurSet = 1);
            m.onEscape = CKEDITOR.tools.bind(function(a) {
              if (this.onEscape && !1 === this.onEscape(a)) return !1
            }, this);
            CKEDITOR.tools.setTimeout(function() {
              var a = CKEDITOR.tools.bind(function() {
                var a = k;
                a.removeStyle("width");
                if (p.autoSize) {
                  var b = p.element.getDocument(),
                    b = (CKEDITOR.env.webkit ? p.element : b.getBody()).$.scrollWidth;
                  CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3);
                  a.setStyle("width", b + 10 + "px");
                  b = p.element.$.scrollHeight;
                  CKEDITOR.env.ie && CKEDITOR.env.quirks &&
                    0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3);
                  a.setStyle("height", b + "px");
                  m._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                } else a.removeStyle("height");
                q && (d -= k.$.offsetWidth);
                k.setStyle("left", d + "px");
                var b = m.element.getWindow(),
                  a = k.$.getBoundingClientRect(),
                  b = b.getViewPaneSize(),
                  c = a.width || a.right - a.left,
                  e = a.height || a.bottom - a.top,
                  l = q ? a.right : b.width - a.left,
                  h = q ? b.width - a.right : a.left;
                q ? l < c && (d = h > c ? d + c : b.width > c ? d - a.left : d - a.right + b.width) : l < c && (d = h > c ? d - c : b.width >
                  c ? d - a.right + b.width : d - a.left);
                c = a.top;
                b.height - a.top < e && (n = c > e ? n - e : b.height > e ? n - a.bottom + b.height : n - a.top);
                CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(k.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (d = CKEDITOR.env.ie8Compat ? d - 2 * k.getDocument().getDocumentElement().$.scrollLeft : d - (a.$.scrollWidth - a.$.clientWidth)));
                var a = k.getFirst(),
                  f;
                (f = a.getCustomData("activePanel")) && f.onHide && f.onHide.call(this, 1);
                a.setCustomData("activePanel", this);
                k.setStyles({
                  top: n + "px",
                  left: d + "px"
                });
                k.setOpacity(1);
                g && g()
              }, this);
              m.isLoaded ? a() : m.onLoad = a;
              CKEDITOR.tools.setTimeout(function() {
                var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                this.focus();
                p.element.focus();
                CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a);
                this.allowBlur(!0);
                this._.editor.fire("panelShow", this)
              }, 0, this)
            }, CKEDITOR.env.air ? 200 : 0, this);
            this.visible = 1;
            this.onShow && this.onShow.call(this)
          },
          reposition: function() {
            var a = this._.showBlockParams;
            this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a))
          },
          focus: function() {
            if (CKEDITOR.env.webkit) {
              var a = CKEDITOR.document.getActive();
              a && !a.equals(this._.iframe) && a.$.blur()
            }(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
          },
          blur: function() {
            var a = this._.iframe.getFrameDocument().getActive();
            a && a.is("a") && (this._.lastFocused = a)
          },
          hide: function(a) {
            if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
              this.hideChild();
              CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
              this.element.setStyle("display", "none");
              this.visible = 0;
              this.element.getFirst().removeCustomData("activePanel");
              if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus();
              delete this._.lastFocused;
              this._.showBlockParams = null;
              this._.editor.fire("panelHide", this)
            }
          },
          allowBlur: function(a) {
            var b = this._.panel;
            void 0 !== a && (b.allowBlur = a);
            return b.allowBlur
          },
          showAsChild: function(a, b, c, f, h, g) {
            if (this._.activeChild != a || a._.panel._.offsetParentId != c.getId()) this.hideChild(), a.onHide =
              CKEDITOR.tools.bind(function() {
                CKEDITOR.tools.setTimeout(function() {
                  this._.focused || this.hide()
                }, 0, this)
              }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, c, f, h, g), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
                a.element.getChild(0).$.style.cssText += ""
              }, 100)
          },
          hideChild: function(a) {
            var b = this._.activeChild;
            b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus())
          }
        }
      });
      CKEDITOR.on("instanceDestroyed", function() {
        var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
          b;
        for (b in f) {
          var c = f[b];
          a ? c.destroy() : c.element.hide()
        }
        a && (f = {})
      })
    })();
    CKEDITOR.plugins.add("colorbutton", {
      requires: "panelbutton,floatpanel",
      init: function(c) {
        function r(p, g, e, h) {
          var k = new CKEDITOR.style(l["colorButton_" + g + "Style"]),
            m = CKEDITOR.tools.getNextId() + "_colorBox";
          c.ui.add(p, CKEDITOR.UI_PANELBUTTON, {
            label: e,
            title: e,
            modes: {
              wysiwyg: 1
            },
            editorFocus: 0,
            toolbar: "colors," + h,
            allowedContent: k,
            requiredContent: k,
            panel: {
              css: CKEDITOR.skin.getPath("editor"),
              attributes: {
                role: "listbox",
                "aria-label": f.panelTitle
              }
            },
            onBlock: function(a, b) {
              b.autoSize = !0;
              b.element.addClass("cke_colorblock");
              b.element.setHtml(u(a, g, m));
              b.element.getDocument().getBody().setStyle("overflow", "hidden");
              CKEDITOR.ui.fire("ready", this);
              var d = b.keys,
                e = "rtl" == c.lang.dir;
              d[e ? 37 : 39] = "next";
              d[40] = "next";
              d[9] = "next";
              d[e ? 39 : 37] = "prev";
              d[38] = "prev";
              d[CKEDITOR.SHIFT + 9] = "prev";
              d[32] = "click"
            },
            refresh: function() {
              c.activeFilter.check(k) || this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            onOpen: function() {
              var a = c.getSelection(),
                a = a && a.getStartElement(),
                a = c.elementPath(a),
                b;
              if (a) {
                a = a.block || a.blockLimit || c.document.getBody();
                do b =
                  a && a.getComputedStyle("back" == g ? "background-color" : "color") || "transparent"; while ("back" == g && "transparent" == b && a && (a = a.getParent()));
                b && "transparent" != b || (b = "#ffffff");
                this._.panel._.iframe.getFrameDocument().getById(m).setStyle("background-color", b);
                return b
              }
            }
          })
        }

        function u(p, g, e) {
          var h = [],
            k = l.colorButton_colors.split(","),
            m = c.plugins.colordialog && !1 !== l.colorButton_enableMore,
            a = k.length + (m ? 2 : 1),
            b = CKEDITOR.tools.addFunction(function(a, b) {
              function d(a) {
                this.removeListener("ok", d);
                this.removeListener("cancel",
                  d);
                "ok" == a.name && e(this.getContentElement("picker", "selectedColor").getValue(), b)
              }
              var e = arguments.callee;
              if ("?" == a) c.openDialog("colordialog", function() {
                this.on("ok", d);
                this.on("cancel", d)
              });
              else {
                c.focus();
                p.hide();
                c.fire("saveSnapshot");
                c.removeStyle(new CKEDITOR.style(l["colorButton_" + b + "Style"], {
                  color: "inherit"
                }));
                if (a) {
                  var f = l["colorButton_" + b + "Style"];
                  f.childRule = "back" == b ? function(a) {
                    return t(a)
                  } : function(a) {
                    return !(a.is("a") || a.getElementsByTag("a").count()) || t(a)
                  };
                  c.applyStyle(new CKEDITOR.style(f, {
                    color: a
                  }))
                }
                c.fire("saveSnapshot")
              }
            });
          h.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', f.auto, '" onclick\x3d"CKEDITOR.tools.callFunction(', b, ",null,'", g, "');return false;\" href\x3d\"javascript:void('", f.auto, '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', a, '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"', e, '"\x3e\x3c/span\x3e\x3c/td\x3e\x3ctd colspan\x3d7 align\x3dcenter\x3e',
            f.auto, '\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e');
          for (e = 0; e < k.length; e++) {
            0 === e % 8 && h.push("\x3c/tr\x3e\x3ctr\x3e");
            var d = k[e].split("/"),
              n = d[0],
              q = d[1] || n;
            d[1] || (n = "#" + n.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
            d = c.lang.colorbutton.colors[q] || q;
            h.push('\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', d, '" onclick\x3d"CKEDITOR.tools.callFunction(', b, ",'", n, "','", g, "'); return false;\" href\x3d\"javascript:void('",
              d, '\')" role\x3d"option" aria-posinset\x3d"', e + 2, '" aria-setsize\x3d"', a, '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#', q, '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e')
          }
          m && h.push('\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d8 align\x3dcenter\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', f.more, '" onclick\x3d"CKEDITOR.tools.callFunction(', b, ",'?','", g, "');return false;\" href\x3d\"javascript:void('", f.more, "')\"", ' role\x3d"option" aria-posinset\x3d"',
            a, '" aria-setsize\x3d"', a, '"\x3e', f.more, "\x3c/a\x3e\x3c/td\x3e");
          h.push("\x3c/tr\x3e\x3c/table\x3e");
          return h.join("")
        }

        function t(c) {
          return "false" == c.getAttribute("contentEditable") || c.getAttribute("data-nostyle")
        }
        var l = c.config,
          f = c.lang.colorbutton;
        CKEDITOR.env.hc || (r("TextColor", "fore", f.textColorTitle, 10), r("BGColor", "back", f.bgColorTitle, 20))
      }
    });
    CKEDITOR.config.colorButton_colors = "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF";
    CKEDITOR.config.colorButton_foreStyle = {
      element: "span",
      styles: {
        color: "#(color)"
      },
      overrides: [{
        element: "font",
        attributes: {
          color: null
        }
      }]
    };
    CKEDITOR.config.colorButton_backStyle = {
      element: "span",
      styles: {
        "background-color": "#(color)"
      }
    };
    CKEDITOR.plugins.colordialog = {
      requires: "dialog",
      init: function(b) {
        var c = new CKEDITOR.dialogCommand("colordialog");
        c.editorFocus = !1;
        b.addCommand("colordialog", c);
        CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
        b.getColorFromDialog = function(c, f) {
          var d = function(a) {
              this.removeListener("ok", d);
              this.removeListener("cancel", d);
              a = "ok" == a.name ? this.getValueOf("picker", "selectedColor") : null;
              c.call(f, a)
            },
            e = function(a) {
              a.on("ok", d);
              a.on("cancel", d)
            };
          b.execCommand("colordialog");
          if (b._.storedDialogs &&
            b._.storedDialogs.colordialog) e(b._.storedDialogs.colordialog);
          else CKEDITOR.on("dialogDefinition", function(a) {
            if ("colordialog" == a.data.name) {
              var b = a.data.definition;
              a.removeListener();
              b.onLoad = CKEDITOR.tools.override(b.onLoad, function(a) {
                return function() {
                  e(this);
                  b.onLoad = a;
                  "function" == typeof a && a.call(this)
                }
              })
            }
          })
        }
      }
    };
    CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog);
    (function() {
      CKEDITOR.plugins.add("templates", {
        requires: "dialog",
        init: function(a) {
          CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
          a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
          a.ui.addButton && a.ui.addButton("Templates", {
            label: a.lang.templates.button,
            command: "templates",
            toolbar: "doctools,10"
          })
        }
      });
      var c = {},
        f = {};
      CKEDITOR.addTemplates = function(a, d) {
        c[a] = d
      };
      CKEDITOR.getTemplates = function(a) {
        return c[a]
      };
      CKEDITOR.loadTemplates = function(a, d) {
        for (var e = [], b = 0, c = a.length; b < c; b++) f[a[b]] || (e.push(a[b]), f[a[b]] = 1);
        e.length ? CKEDITOR.scriptLoader.load(e, d) : setTimeout(d, 0)
      }
    })();
    CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")];
    CKEDITOR.config.templates_replaceContent = !0;
    CKEDITOR.plugins.add("menu", {
      requires: "floatpanel",
      beforeInit: function(g) {
        for (var h = g.config.menu_groups.split(","), p = g._.menuGroups = {}, n = g._.menuItems = {}, a = 0; a < h.length; a++) p[h[a]] = a + 1;
        g.addMenuGroup = function(b, a) {
          p[b] = a || 100
        };
        g.addMenuItem = function(a, c) {
          p[c.group] && (n[a] = new CKEDITOR.menuItem(this, a, c))
        };
        g.addMenuItems = function(a) {
          for (var c in a) this.addMenuItem(c, a[c])
        };
        g.getMenuItem = function(a) {
          return n[a]
        };
        g.removeMenuItem = function(a) {
          delete n[a]
        }
      }
    });
    (function() {
      function g(a) {
        a.sort(function(a, c) {
          return a.group < c.group ? -1 : a.group > c.group ? 1 : a.order < c.order ? -1 : a.order > c.order ? 1 : 0
        })
      }
      var h = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1"_cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked}';
      CKEDITOR.env.gecko && CKEDITOR.env.mac && (h += ' onkeypress\x3d"return false;"');
      CKEDITOR.env.gecko && (h += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
      var h = h + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),
        p = CKEDITOR.addTemplate("menuItem", h + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e'),
        n = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e');
      CKEDITOR.menu = CKEDITOR.tools.createClass({
        $: function(a, b) {
          b = this._.definition = b || {};
          this.id = CKEDITOR.tools.getNextId();
          this.editor = a;
          this.items = [];
          this._.listeners = [];
          this._.level = b.level || 1;
          var c = CKEDITOR.tools.extend({}, b.panel, {
              css: [CKEDITOR.skin.getPath("editor")],
              level: this._.level - 1,
              block: {}
            }),
            m = c.block.attributes = c.attributes || {};
          !m.role && (m.role = "menu");
          this._.panelDefinition =
            c
        },
        _: {
          onShow: function() {
            var a = this.editor.getSelection(),
              b = a && a.getStartElement(),
              c = this.editor.elementPath(),
              m = this._.listeners;
            this.removeAll();
            for (var e = 0; e < m.length; e++) {
              var l = m[e](b, a, c);
              if (l)
                for (var k in l) {
                  var f = this.editor.getMenuItem(k);
                  !f || f.command && !this.editor.getCommand(f.command).state || (f.state = l[k], this.add(f))
                }
            }
          },
          onClick: function(a) {
            this.hide();
            if (a.onClick) a.onClick();
            else a.command && this.editor.execCommand(a.command)
          },
          onEscape: function(a) {
            var b = this.parent;
            b ? b._.panel.hideChild(1) :
              27 == a && this.hide(1);
            return !1
          },
          onHide: function() {
            this.onHide && this.onHide()
          },
          showSubMenu: function(a) {
            var b = this._.subMenu,
              c = this.items[a];
            if (c = c.getItems && c.getItems()) {
              b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
                level: this._.level + 1
              }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
              for (var m in c) {
                var e = this.editor.getMenuItem(m);
                e && (e.state = c[m], b.add(e))
              }
              var l = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                String(a));
              setTimeout(function() {
                b.show(l, 2)
              }, 0)
            } else this._.panel.hideChild(1)
          }
        },
        proto: {
          add: function(a) {
            a.order || (a.order = this.items.length);
            this.items.push(a)
          },
          removeAll: function() {
            this.items = []
          },
          show: function(a, b, c, m) {
            if (!this.parent && (this._.onShow(), !this.items.length)) return;
            b = b || ("rtl" == this.editor.lang.dir ? 2 : 1);
            var e = this.items,
              l = this.editor,
              k = this._.panel,
              f = this._.element;
            if (!k) {
              k = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
              k.onEscape = CKEDITOR.tools.bind(function(a) {
                if (!1 === this._.onEscape(a)) return !1
              }, this);
              k.onShow = function() {
                k._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")
              };
              k.onHide = CKEDITOR.tools.bind(function() {
                this._.onHide && this._.onHide()
              }, this);
              f = k.addBlock(this.id, this._.panelDefinition.block);
              f.autoSize = !0;
              var d = f.keys;
              d[40] = "next";
              d[9] = "next";
              d[38] = "prev";
              d[CKEDITOR.SHIFT + 9] = "prev";
              d["rtl" == l.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
              d[32] = CKEDITOR.env.ie ? "mouseup" :
                "click";
              CKEDITOR.env.ie && (d[13] = "mouseup");
              f = this._.element = f.element;
              d = f.getDocument();
              d.getBody().setStyle("overflow", "hidden");
              d.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
              this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) {
                clearTimeout(this._.showSubTimeout);
                this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, l.config.menu_subMenuDelay || 400, this, [a])
              }, this);
              this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
                clearTimeout(this._.showSubTimeout)
              }, this);
              this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
                var b = this.items[a];
                if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
                else if (b.getItems) this._.showSubMenu(a);
                else this._.onClick(b)
              }, this)
            }
            g(e);
            for (var d = l.elementPath(), d = ['\x3cdiv class\x3d"cke_menu' + (d && d.direction() != l.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], h = e.length, p = h && e[0].group, n = 0; n < h; n++) {
              var q = e[n];
              p != q.group && (d.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),
                p = q.group);
              q.render(this, n, d)
            }
            d.push("\x3c/div\x3e");
            f.setHtml(d.join(""));
            CKEDITOR.ui.fire("ready", this);
            this.parent ? this.parent._.panel.showAsChild(k, this.id, a, b, c, m) : k.showBlock(this.id, a, b, c, m);
            l.fire("menuShow", [k])
          },
          addListener: function(a) {
            this._.listeners.push(a)
          },
          hide: function(a) {
            this._.onHide && this._.onHide();
            this._.panel && this._.panel.hide(a)
          }
        }
      });
      CKEDITOR.menuItem = CKEDITOR.tools.createClass({
        $: function(a, b, c) {
          CKEDITOR.tools.extend(this, c, {
            order: 0,
            className: "cke_menubutton__" + b
          });
          this.group =
            a._.menuGroups[this.group];
          this.editor = a;
          this.name = b
        },
        proto: {
          render: function(a, b, c) {
            var h = a.id + String(b),
              e = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state,
              l = "",
              k = e == CKEDITOR.TRISTATE_ON ? "on" : e == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
            this.role in {
              menuitemcheckbox: 1,
              menuitemradio: 1
            } && (l = ' aria-checked\x3d"' + (e == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
            var f = this.getItems,
              d = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
              g = this.name;
            this.icon && !/\./.test(this.icon) && (g =
              this.icon);
            a = {
              id: h,
              name: this.name,
              iconName: g,
              label: this.label,
              cls: this.className || "",
              state: k,
              hasPopup: f ? "true" : "false",
              disabled: e == CKEDITOR.TRISTATE_DISABLED,
              title: this.label,
              href: "javascript:void('" + (this.label || "").replace("'") + "')",
              hoverFn: a._.itemOverFn,
              moveOutFn: a._.itemOutFn,
              clickFn: a._.itemClickFn,
              index: b,
              iconStyle: CKEDITOR.skin.getIconStyle(g, "rtl" == this.editor.lang.dir, g == this.icon ? null : this.icon, this.iconOffset),
              arrowHtml: f ? n.output({
                label: d
              }) : "",
              role: this.role ? this.role : "menuitem",
              ariaChecked: l
            };
            p.output(a, c)
          }
        }
      })
    })();
    CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div";
    CKEDITOR.plugins.add("contextmenu", {
      requires: "menu",
      onLoad: function() {
        CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
          base: CKEDITOR.menu,
          $: function(a) {
            this.base.call(this, a, {
              panel: {
                className: "cke_menu_panel",
                attributes: {
                  "aria-label": a.lang.contextmenu.options
                }
              }
            })
          },
          proto: {
            addTarget: function(a, e) {
              a.on("contextmenu", function(a) {
                a = a.data;
                var c = CKEDITOR.env.webkit ? f : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
                if (!e || !c) {
                  a.preventDefault();
                  if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                    var c = this.editor,
                      b = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function(a) {
                        return a.hasAttribute("contenteditable")
                      }, !0);
                    b && "false" == b.getAttribute("contenteditable") && c.getSelection().fake(b)
                  }
                  var b = a.getTarget().getDocument(),
                    d = a.getTarget().getDocument().getDocumentElement(),
                    c = !b.equals(CKEDITOR.document),
                    b = b.getWindow().getScrollPosition(),
                    g = c ? a.$.clientX : a.$.pageX || b.x + a.$.clientX,
                    h = c ? a.$.clientY : a.$.pageY || b.y + a.$.clientY;
                  CKEDITOR.tools.setTimeout(function() {
                      this.open(d, null, g, h)
                    }, CKEDITOR.env.ie ?
                    200 : 0, this)
                }
              }, this);
              if (CKEDITOR.env.webkit) {
                var f, d = function() {
                  f = 0
                };
                a.on("keydown", function(a) {
                  f = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey
                });
                a.on("keyup", d);
                a.on("contextmenu", d)
              }
            },
            open: function(a, e, f, d) {
              this.editor.focus();
              a = a || CKEDITOR.document.getDocumentElement();
              this.editor.selectionChange(1);
              this.show(a, e, f, d)
            }
          }
        })
      },
      beforeInit: function(a) {
        var e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
        a.on("contentDom", function() {
          e.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl)
        });
        a.addCommand("contextMenu", {
          exec: function() {
            a.contextMenu.open(a.document.getBody())
          }
        });
        a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
        a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
      }
    });
    (function() {
      CKEDITOR.plugins.add("div", {
        requires: "dialog",
        init: function(a) {
          if (!a.blockless) {
            var c = a.lang.div,
              b = "div(*)";
            CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (b += ";div[dir,id,lang,title]{*}");
            a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
              allowedContent: b,
              requiredContent: "div",
              contextSensitive: !0,
              refresh: function(a, c) {
                this.setState("div" in (a.config.div_wrapTable ? c.root : c.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
              }
            }));
            a.addCommand("editdiv",
              new CKEDITOR.dialogCommand("editdiv", {
                requiredContent: "div"
              }));
            a.addCommand("removediv", {
              requiredContent: "div",
              exec: function(a) {
                function c(b) {
                  (b = CKEDITOR.plugins.div.getSurroundDiv(a, b)) && !b.data("cke-div-added") && (f.push(b), b.data("cke-div-added"))
                }
                for (var b = a.getSelection(), g = b && b.getRanges(), e, h = b.createBookmarks(), f = [], d = 0; d < g.length; d++) e = g[d], e.collapsed ? c(b.getStartElement()) : (e = new CKEDITOR.dom.walker(e), e.evaluator = c, e.lastForward());
                for (d = 0; d < f.length; d++) f[d].remove(!0);
                b.selectBookmarks(h)
              }
            });
            a.ui.addButton && a.ui.addButton("CreateDiv", {
              label: c.toolbar,
              command: "creatediv",
              toolbar: "blocks,50"
            });
            a.addMenuItems && (a.addMenuItems({
              editdiv: {
                label: c.edit,
                command: "editdiv",
                group: "div",
                order: 1
              },
              removediv: {
                label: c.remove,
                command: "removediv",
                group: "div",
                order: 5
              }
            }), a.contextMenu && a.contextMenu.addListener(function(b) {
              return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? {
                editdiv: CKEDITOR.TRISTATE_OFF,
                removediv: CKEDITOR.TRISTATE_OFF
              } : null
            }));
            CKEDITOR.dialog.add("creatediv", this.path +
              "dialogs/div.js");
            CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
          }
        }
      });
      CKEDITOR.plugins.div = {
        getSurroundDiv: function(a, c) {
          var b = a.elementPath(c);
          return a.elementPath(b.blockLimit).contains(function(a) {
            return a.is("div") && !a.isReadOnly()
          }, 1)
        }
      }
    })();
    CKEDITOR.plugins.add("resize", {
      init: function(b) {
        function f(d) {
          var e = c.width,
            m = c.height,
            f = e + (d.data.$.screenX - n.x) * ("rtl" == g ? -1 : 1);
          d = m + (d.data.$.screenY - n.y);
          h && (e = Math.max(a.resize_minWidth, Math.min(f, a.resize_maxWidth)));
          p && (m = Math.max(a.resize_minHeight, Math.min(d, a.resize_maxHeight)));
          b.resize(h ? e : null, m)
        }

        function k() {
          CKEDITOR.document.removeListener("mousemove", f);
          CKEDITOR.document.removeListener("mouseup", k);
          b.document && (b.document.removeListener("mousemove", f), b.document.removeListener("mouseup",
            k))
        }
        var a = b.config,
          r = b.ui.spaceId("resizer"),
          g = b.element ? b.element.getDirection(1) : "ltr";
        !a.resize_dir && (a.resize_dir = "vertical");
        void 0 === a.resize_maxWidth && (a.resize_maxWidth = 3E3);
        void 0 === a.resize_maxHeight && (a.resize_maxHeight = 3E3);
        void 0 === a.resize_minWidth && (a.resize_minWidth = 750);
        void 0 === a.resize_minHeight && (a.resize_minHeight = 250);
        if (!1 !== a.resize_enabled) {
          var l = null,
            n, c, h = ("both" == a.resize_dir || "horizontal" == a.resize_dir) && a.resize_minWidth != a.resize_maxWidth,
            p = ("both" == a.resize_dir || "vertical" ==
              a.resize_dir) && a.resize_minHeight != a.resize_maxHeight,
            q = CKEDITOR.tools.addFunction(function(d) {
              l || (l = b.getResizable());
              c = {
                width: l.$.offsetWidth || 0,
                height: l.$.offsetHeight || 0
              };
              n = {
                x: d.screenX,
                y: d.screenY
              };
              a.resize_minWidth > c.width && (a.resize_minWidth = c.width);
              a.resize_minHeight > c.height && (a.resize_minHeight = c.height);
              CKEDITOR.document.on("mousemove", f);
              CKEDITOR.document.on("mouseup", k);
              b.document && (b.document.on("mousemove", f), b.document.on("mouseup", k));
              d.preventDefault && d.preventDefault()
            });
          b.on("destroy",
            function() {
              CKEDITOR.tools.removeFunction(q)
            });
          b.on("uiSpace", function(a) {
            if ("bottom" == a.data.space) {
              var e = "";
              h && !p && (e = " cke_resizer_horizontal");
              !h && p && (e = " cke_resizer_vertical");
              var c = '\x3cspan id\x3d"' + r + '" class\x3d"cke_resizer' + e + " cke_resizer_" + g + '" title\x3d"' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + q + ', event)"\x3e' + ("ltr" == g ? "◢" : "◣") + "\x3c/span\x3e";
              "ltr" == g && "ltr" == e ? a.data.html += c : a.data.html = c + a.data.html
            }
          }, b, null, 100);
          b.on("maximize",
            function(a) {
              b.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
            })
        }
      }
    });
    (function() {
      function B(a) {
        function d() {
          for (var b = g(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || q(a), f = 0; f < e.length; f++) {
            var l = e[f];
            if ("/" != l) {
              "string" == typeof l && (l = e[f] = {
                name: l
              });
              var m, d = l.groups;
              if (d)
                for (var h = 0; h < d.length; h++) m = d[h], (m = b[m]) && c(l, m);
              (m = b[l.name]) && c(l, m)
            }
          }
          return e
        }

        function g() {
          var b = {},
            c, f, e;
          for (c in a.ui.items) f = a.ui.items[c], e = f.toolbar || "others", e = e.split(","), f = e[0], e = parseInt(e[1] || -1, 10), b[f] || (b[f] = []), b[f].push({
            name: c,
            order: e
          });
          for (f in b) b[f] = b[f].sort(function(b,
            a) {
            return b.order == a.order ? 0 : 0 > a.order ? -1 : 0 > b.order ? 1 : b.order < a.order ? -1 : 1
          });
          return b
        }

        function c(c, e) {
          if (e.length) {
            c.items ? c.items.push(a.ui.create("-")) : c.items = [];
            for (var f; f = e.shift();) f = "string" == typeof f ? f : f.name, b && -1 != CKEDITOR.tools.indexOf(b, f) || (f = a.ui.create(f)) && a.addFeature(f) && c.items.push(f)
          }
        }

        function h(b) {
          var a = [],
            e, d, h;
          for (e = 0; e < b.length; ++e) d = b[e], h = {}, "/" == d ? a.push(d) : CKEDITOR.tools.isArray(d) ? (c(h, CKEDITOR.tools.clone(d)), a.push(h)) : d.items && (c(h, CKEDITOR.tools.clone(d.items)),
            h.name = d.name, a.push(h));
          return a
        }
        var b = a.config.removeButtons,
          b = b && b.split(","),
          e = a.config.toolbar;
        "string" == typeof e && (e = a.config["toolbar_" + e]);
        return a.toolbar = e ? h(e) : d()
      }

      function q(a) {
        return a._.toolbarGroups || (a._.toolbarGroups = [{
          name: "document",
          groups: ["mode", "document", "doctools"]
        }, {
          name: "clipboard",
          groups: ["clipboard", "undo"]
        }, {
          name: "editing",
          groups: ["find", "selection", "spellchecker"]
        }, {
          name: "forms"
        }, "/", {
          name: "basicstyles",
          groups: ["basicstyles", "cleanup"]
        }, {
          name: "paragraph",
          groups: ["list",
            "indent", "blocks", "align", "bidi"
          ]
        }, {
          name: "links"
        }, {
          name: "insert"
        }, "/", {
          name: "styles"
        }, {
          name: "colors"
        }, {
          name: "tools"
        }, {
          name: "others"
        }, {
          name: "about"
        }])
      }
      var y = function() {
        this.toolbars = [];
        this.focusCommandExecuted = !1
      };
      y.prototype.focus = function() {
        for (var a = 0, d; d = this.toolbars[a++];)
          for (var g = 0, c; c = d.items[g++];)
            if (c.focus) {
              c.focus();
              return
            }
      };
      var C = {
        modes: {
          wysiwyg: 1,
          source: 1
        },
        readOnly: 1,
        exec: function(a) {
          a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
              a.toolbox.focus()
            },
            100) : a.toolbox.focus())
        }
      };
      CKEDITOR.plugins.add("toolbar", {
        requires: "button",
        init: function(a) {
          var d, g = function(c, h) {
            var b, e = "rtl" == a.lang.dir,
              k = a.config.toolbarGroupCycling,
              r = e ? 37 : 39,
              e = e ? 39 : 37,
              k = void 0 === k || k;
            switch (h) {
              case 9:
              case CKEDITOR.SHIFT + 9:
                for (; !b || !b.items.length;)
                  if (b = 9 == h ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length)
                    for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;)(c = d ? c.previous : c.next) ||
                      (b = 0);
                c && c.focus();
                return !1;
              case r:
                b = c;
                do b = b.next, !b && k && (b = c.toolbar.items[0]); while (b && !b.focus);
                b ? b.focus() : g(c, 9);
                return !1;
              case 40:
                return c.button && c.button.hasArrow ? (a.once("panelShow", function(b) {
                  b.data._.panel._.currentBlock.onKeyDown(40)
                }), c.execute()) : g(c, 40 == h ? r : e), !1;
              case e:
              case 38:
                b = c;
                do b = b.previous, !b && k && (b = c.toolbar.items[c.toolbar.items.length - 1]); while (b && !b.focus);
                b ? b.focus() : (d = 1, g(c, CKEDITOR.SHIFT + 9), d = 0);
                return !1;
              case 27:
                return a.focus(), !1;
              case 13:
              case 32:
                return c.execute(), !1
            }
            return !0
          };
          a.on("uiSpace", function(c) {
            if (c.data.space == a.config.toolbarLocation) {
              c.removeListener();
              a.toolbox = new y;
              var d = CKEDITOR.tools.getNextId(),
                b = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', a.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + a.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e'],
                d = !1 !== a.config.toolbarStartupExpanded,
                e, k;
              a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE &&
                b.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? "\x3e" : ' style\x3d"display:none"\x3e'));
              for (var r = a.toolbox.toolbars, f = B(a), l = 0; l < f.length; l++) {
                var m, n = 0,
                  v, p = f[l],
                  w;
                if (p)
                  if (e && (b.push("\x3c/span\x3e"), k = e = 0), "/" === p) b.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');
                  else {
                    w = p.items || p;
                    for (var x = 0; x < w.length; x++) {
                      var t = w[x],
                        q;
                      if (t) {
                        var z = function(c) {
                          c = c.render(a, b);
                          u = n.items.push(c) - 1;
                          0 < u && (c.previous = n.items[u - 1], c.previous.next = c);
                          c.toolbar = n;
                          c.onkey = g;
                          c.onfocus = function() {
                            a.toolbox.focusCommandExecuted ||
                              a.focus()
                          }
                        };
                        if (t.type == CKEDITOR.UI_SEPARATOR) k = e && t;
                        else {
                          q = !1 !== t.canGroup;
                          if (!n) {
                            m = CKEDITOR.tools.getNextId();
                            n = {
                              id: m,
                              items: []
                            };
                            v = p.name && (a.lang.toolbar.toolbarGroups[p.name] || p.name);
                            b.push('\x3cspan id\x3d"', m, '" class\x3d"cke_toolbar"', v ? ' aria-labelledby\x3d"' + m + '_label"' : "", ' role\x3d"toolbar"\x3e');
                            v && b.push('\x3cspan id\x3d"', m, '_label" class\x3d"cke_voice_label"\x3e', v, "\x3c/span\x3e");
                            b.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
                            var u = r.push(n) - 1;
                            0 < u && (n.previous = r[u -
                              1], n.previous.next = n)
                          }
                          q ? e || (b.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), e = 1) : e && (b.push("\x3c/span\x3e"), e = 0);
                          k && (z(k), k = 0);
                          z(t)
                        }
                      }
                    }
                    e && (b.push("\x3c/span\x3e"), k = e = 0);
                    n && b.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                  }
              }
              a.config.toolbarCanCollapse && b.push("\x3c/span\x3e");
              if (a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                var A = CKEDITOR.tools.addFunction(function() {
                  a.execCommand("toolbarCollapse")
                });
                a.on("destroy", function() {
                  CKEDITOR.tools.removeFunction(A)
                });
                a.addCommand("toolbarCollapse", {
                  readOnly: 1,
                  exec: function(b) {
                    var a = b.ui.space("toolbar_collapser"),
                      c = a.getPrevious(),
                      e = b.ui.space("contents"),
                      d = c.getParent(),
                      f = parseInt(e.$.style.height, 10),
                      h = d.$.offsetHeight,
                      g = a.hasClass("cke_toolbox_collapser_min");
                    g ? (c.show(), a.removeClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarExpand));
                    a.getFirst().setText(g ? "▲" : "◀");
                    e.setStyle("height",
                      f - (d.$.offsetHeight - h) + "px");
                    b.fire("resize", {
                      outerHeight: b.container.$.offsetHeight,
                      contentsHeight: e.$.offsetHeight,
                      outerWidth: b.container.$.offsetWidth
                    })
                  },
                  modes: {
                    wysiwyg: 1,
                    source: 1
                  }
                });
                a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                b.push('\x3ca title\x3d"' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id\x3d"' + a.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                d || b.push(" cke_toolbox_collapser_min");
                b.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + A + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
              }
              b.push("\x3c/span\x3e");
              c.data.html += b.join("")
            }
          });
          a.on("destroy", function() {
            if (this.toolbox) {
              var a, d = 0,
                b, e, g;
              for (a = this.toolbox.toolbars; d < a.length; d++)
                for (e = a[d].items, b = 0; b < e.length; b++) g = e[b], g.clickFn && CKEDITOR.tools.removeFunction(g.clickFn), g.keyDownFn && CKEDITOR.tools.removeFunction(g.keyDownFn)
            }
          });
          a.on("uiReady", function() {
            var c = a.ui.space("toolbox");
            c && a.focusManager.add(c,
              1)
          });
          a.addCommand("toolbarFocus", C);
          a.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
          a.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
          a.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
            create: function() {
              return {
                render: function(a, d) {
                  d.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');
                  return {}
                }
              }
            }
          })
        }
      });
      CKEDITOR.ui.prototype.addToolbarGroup = function(a, d, g) {
        var c = q(this.editor),
          h = 0 === d,
          b = {
            name: a
          };
        if (g) {
          if (g = CKEDITOR.tools.search(c, function(a) {
              return a.name == g
            })) {
            !g.groups && (g.groups = []);
            if (d &&
              (d = CKEDITOR.tools.indexOf(g.groups, d), 0 <= d)) {
              g.groups.splice(d + 1, 0, a);
              return
            }
            h ? g.groups.splice(0, 0, a) : g.groups.push(a);
            return
          }
          d = null
        }
        d && (d = CKEDITOR.tools.indexOf(c, function(a) {
          return a.name == d
        }));
        h ? c.splice(0, 0, a) : "number" == typeof d ? c.splice(d + 1, 0, b) : c.push(a)
      }
    })();
    CKEDITOR.UI_SEPARATOR = "separator";
    CKEDITOR.config.toolbarLocation = "top";
    (function() {
      function q(a, d) {
        function l(c) {
          c = k.list[c];
          if (c.equals(a.editable()) || "true" == c.getAttribute("contenteditable")) {
            var e = a.createRange();
            e.selectNodeContents(c);
            e.select()
          } else a.getSelection().selectElement(c);
          a.focus()
        }

        function m() {
          n && n.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
          delete k.list
        }
        var p = a.ui.spaceId("path"),
          n, k = a._.elementsPath,
          q = k.idBase;
        d.html += '\x3cspan id\x3d"' + p + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' +
          p + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + p + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
        a.on("uiReady", function() {
          var c = a.ui.space("path");
          c && a.focusManager.add(c, 1)
        });
        k.onClick = l;
        var v = CKEDITOR.tools.addFunction(l),
          w = CKEDITOR.tools.addFunction(function(c, e) {
            var g = k.idBase,
              b;
            e = new CKEDITOR.dom.event(e);
            b = "rtl" == a.lang.dir;
            switch (e.getKeystroke()) {
              case b ? 39:
                37:
                  case 9:
                return (b = CKEDITOR.document.getById(g + (c + 1))) || (b = CKEDITOR.document.getById(g +
                  "0")), b.focus(), !1;
              case b ? 37:
                39:
                  case CKEDITOR.SHIFT + 9:
                return (b = CKEDITOR.document.getById(g + (c - 1))) || (b = CKEDITOR.document.getById(g + (k.list.length - 1))), b.focus(), !1;
              case 27:
                return a.focus(), !1;
              case 13:
              case 32:
                return l(c), !1
            }
            return !0
          });
        a.on("selectionChange", function() {
          for (var c = [], e = k.list = [], g = [], b = k.filters, d = !0, l = a.elementPath().elements, f, u = l.length; u--;) {
            var h = l[u],
              r = 0;
            f = h.data("cke-display-name") ? h.data("cke-display-name") : h.data("cke-real-element-type") ? h.data("cke-real-element-type") : h.getName();
            (d = h.hasAttribute("contenteditable") ? "true" == h.getAttribute("contenteditable") : d) || h.hasAttribute("contenteditable") || (r = 1);
            for (var t = 0; t < b.length; t++) {
              var m = b[t](h, f);
              if (!1 === m) {
                r = 1;
                break
              }
              f = m || f
            }
            r || (e.unshift(h), g.unshift(f))
          }
          e = e.length;
          for (b = 0; b < e; b++) f = g[b], d = a.lang.elementspath.eleTitle.replace(/%1/, f), f = x.output({
            id: q + b,
            label: d,
            text: f,
            jsTitle: "javascript:void('" + f + "')",
            index: b,
            keyDownFn: w,
            clickFn: v
          }), c.unshift(f);
          n || (n = CKEDITOR.document.getById(p));
          g = n;
          g.setHtml(c.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
          a.fire("elementsPathUpdate", {
            space: g
          })
        });
        a.on("readOnly", m);
        a.on("contentDomUnload", m);
        a.addCommand("elementsPathFocus", y.toolbarFocus);
        a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
      }
      var y = {
          toolbarFocus: {
            editorFocus: !1,
            readOnly: 1,
            exec: function(a) {
              (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
            }
          }
        },
        d = "";
      CKEDITOR.env.gecko && CKEDITOR.env.mac && (d += ' onkeypress\x3d"return false;"');
      CKEDITOR.env.gecko && (d += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
      var x = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + d + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
      CKEDITOR.plugins.add("elementspath", {
        init: function(a) {
          a._.elementsPath = {
            idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() +
              "_",
            filters: []
          };
          a.on("uiSpace", function(d) {
            "bottom" == d.data.space && q(a, d.data)
          })
        }
      })
    })();
    (function() {
      function q(b, d, a) {
        a = b.config.forceEnterMode || a;
        "wysiwyg" == b.mode && (d || (d = b.activeEnterMode), b.elementPath().isContextFor("p") || (d = CKEDITOR.ENTER_BR, a = 1), b.fire("saveSnapshot"), d == CKEDITOR.ENTER_BR ? t(b, d, null, a) : u(b, d, null, a), b.fire("saveSnapshot"))
      }

      function v(b) {
        b = b.getSelection().getRanges(!0);
        for (var d = b.length - 1; 0 < d; d--) b[d].deleteContents();
        return b[0]
      }

      function y(b) {
        var d = b.startContainer.getAscendant(function(a) {
          return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable")
        }, !0);
        if (b.root.equals(d)) return b;
        d = new CKEDITOR.dom.range(d);
        d.moveToRange(b);
        return d
      }
      CKEDITOR.plugins.add("enterkey", {
        init: function(b) {
          b.addCommand("enter", {
            modes: {
              wysiwyg: 1
            },
            editorFocus: !1,
            exec: function(b) {
              q(b)
            }
          });
          b.addCommand("shiftEnter", {
            modes: {
              wysiwyg: 1
            },
            editorFocus: !1,
            exec: function(b) {
              q(b, b.activeShiftEnterMode, 1)
            }
          });
          b.setKeystroke([
            [13, "enter"],
            [CKEDITOR.SHIFT + 13, "shiftEnter"]
          ])
        }
      });
      var z = CKEDITOR.dom.walker.whitespaces(),
        A = CKEDITOR.dom.walker.bookmark();
      CKEDITOR.plugins.enterkey = {
        enterBlock: function(b,
          d, a, h) {
          if (a = a || v(b)) {
            a = y(a);
            var f = a.document,
              k = a.checkStartOfBlock(),
              m = a.checkEndOfBlock(),
              l = b.elementPath(a.startContainer),
              c = l.block,
              n = d == CKEDITOR.ENTER_DIV ? "div" : "p",
              e;
            if (k && m) {
              if (c && (c.is("li") || c.getParent().is("li"))) {
                c.is("li") || (c = c.getParent());
                a = c.getParent();
                e = a.getParent();
                h = !c.hasPrevious();
                var p = !c.hasNext(),
                  n = b.getSelection(),
                  g = n.createBookmarks(),
                  k = c.getDirection(1),
                  m = c.getAttribute("class"),
                  r = c.getAttribute("style"),
                  q = e.getDirection(1) != k;
                b = b.enterMode != CKEDITOR.ENTER_BR || q || r || m;
                if (e.is("li")) h || p ? (h && p && a.remove(), c[p ? "insertAfter" : "insertBefore"](e)) : c.breakParent(e);
                else {
                  if (b)
                    if (l.block.is("li") ? (e = f.createElement(d == CKEDITOR.ENTER_P ? "p" : "div"), q && e.setAttribute("dir", k), r && e.setAttribute("style", r), m && e.setAttribute("class", m), c.moveChildren(e)) : e = l.block, h || p) e[h ? "insertBefore" : "insertAfter"](a);
                    else c.breakParent(a), e.insertAfter(a);
                  else if (c.appendBogus(!0), h || p)
                    for (; f = c[h ? "getFirst" : "getLast"]();) f[h ? "insertBefore" : "insertAfter"](a);
                  else
                    for (c.breakParent(a); f = c.getLast();) f.insertAfter(a);
                  c.remove()
                }
                n.selectBookmarks(g);
                return
              }
              if (c && c.getParent().is("blockquote")) {
                c.breakParent(c.getParent());
                c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove();
                c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove();
                a.moveToElementEditStart(c);
                a.select();
                return
              }
            } else if (c && c.is("pre") && !m) {
              t(b, d, a, h);
              return
            }
            if (k = a.splitBlock(n)) {
              d = k.previousBlock;
              c = k.nextBlock;
              l = k.wasStartOfBlock;
              b = k.wasEndOfBlock;
              c ? (g = c.getParent(), g.is("li") && (c.breakParent(g),
                c.move(c.getNext(), 1))) : d && (g = d.getParent()) && g.is("li") && (d.breakParent(g), g = d.getNext(), a.moveToElementEditStart(g), d.move(d.getPrevious()));
              if (l || b) {
                if (d) {
                  if (d.is("li") || !w.test(d.getName()) && !d.is("pre")) e = d.clone()
                } else c && (e = c.clone());
                e ? h && !e.is("li") && e.renameNode(n) : g && g.is("li") ? e = g : (e = f.createElement(n), d && (p = d.getDirection()) && e.setAttribute("dir", p));
                if (f = k.elementPath)
                  for (h = 0, n = f.elements.length; h < n; h++) {
                    g = f.elements[h];
                    if (g.equals(f.block) || g.equals(f.blockLimit)) break;
                    CKEDITOR.dtd.$removeEmpty[g.getName()] &&
                      (g = g.clone(), e.moveChildren(g), e.append(g))
                  }
                e.appendBogus();
                e.getParent() || a.insertNode(e);
                e.is("li") && e.removeAttribute("value");
                !CKEDITOR.env.ie || !l || b && d.getChildCount() || (a.moveToElementEditStart(b ? d : e), a.select());
                a.moveToElementEditStart(l && !b ? c : e)
              } else c.is("li") && (e = a.clone(), e.selectNodeContents(c), e = new CKEDITOR.dom.walker(e), e.evaluator = function(a) {
                  return !(A(a) || z(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
                }, (g = e.next()) &&
                g.type == CKEDITOR.NODE_ELEMENT && g.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? f.createElement("br") : f.createText(" ")).insertBefore(g)), c && a.moveToElementEditStart(c);
              a.select();
              a.scrollIntoView()
            }
          }
        },
        enterBr: function(b, d, a, h) {
          if (a = a || v(b)) {
            var f = a.document,
              k = a.checkEndOfBlock(),
              m = new CKEDITOR.dom.elementPath(b.getSelection().getStartElement()),
              l = m.block,
              c = l && m.block.getName();
            h || "li" != c ? (!h && k && w.test(c) ? (k = l.getDirection()) ? (f = f.createElement("div"), f.setAttribute("dir", k), f.insertAfter(l), a.setStart(f,
              0)) : (f.createElement("br").insertAfter(l), CKEDITOR.env.gecko && f.createText("").insertAfter(l), a.setStartAt(l.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (b = "pre" == c && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? f.createText("\r") : f.createElement("br"), a.deleteContents(), a.insertNode(b), CKEDITOR.env.needsBrFiller ? (f.createText("﻿").insertAfter(b), k && (l || m.blockLimit).appendBogus(), b.getNext().$.nodeValue = "", a.setStartAt(b.getNext(), CKEDITOR.POSITION_AFTER_START)) :
              a.setStartAt(b, CKEDITOR.POSITION_AFTER_END)), a.collapse(!0), a.select(), a.scrollIntoView()) : u(b, d, a, h)
          }
        }
      };
      var x = CKEDITOR.plugins.enterkey,
        t = x.enterBr,
        u = x.enterBlock,
        w = /^h[1-6]$/
    })();
    (function() {
      function k(b, f) {
        var g = {},
          c = [],
          e = {
            nbsp: " ",
            shy: "­",
            gt: "\x3e",
            lt: "\x3c",
            amp: "\x26",
            apos: "'",
            quot: '"'
          };
        b = b.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(b, a) {
          var d = f ? "\x26" + a + ";" : e[a];
          g[d] = f ? e[a] : "\x26" + a + ";";
          c.push(d);
          return ""
        });
        if (!f && b) {
          b = b.split(",");
          var a = document.createElement("div"),
            d;
          a.innerHTML = "\x26" + b.join(";\x26") + ";";
          d = a.innerHTML;
          a = null;
          for (a = 0; a < d.length; a++) {
            var h = d.charAt(a);
            g[h] = "\x26" + b[a] + ";";
            c.push(h)
          }
        }
        g.regex = c.join(f ? "|" : "");
        return g
      }
      CKEDITOR.plugins.add("entities", {
        afterInit: function(b) {
          function f(a) {
            return h[a]
          }

          function g(b) {
            return "force" != c.entities_processNumerical && a[b] ? a[b] : "\x26#" + b.charCodeAt(0) + ";"
          }
          var c = b.config;
          if (b = (b = b.dataProcessor) && b.htmlFilter) {
            var e = [];
            !1 !== c.basicEntities && e.push("nbsp,gt,lt,amp");
            c.entities && (e.length && e.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
              c.entities_latin && e.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), c.entities_greek && e.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
              c.entities_additional && e.push(c.entities_additional));
            var a = k(e.join(",")),
              d = a.regex ? "[" + a.regex + "]" : "a^";
            delete a.regex;
            c.entities && c.entities_processNumerical && (d = "[^ -~]|" + d);
            var d = new RegExp(d, "g"),
              h = k("nbsp,gt,lt,amp,shy", !0),
              l = new RegExp(h.regex, "g");
            b.addRules({
              text: function(a) {
                return a.replace(l, f).replace(d, g)
              }
            }, {
              applyToAll: !0,
              excludeNestedEditable: !0
            })
          }
        }
      })
    })();
    CKEDITOR.config.basicEntities = !0;
    CKEDITOR.config.entities = !0;
    CKEDITOR.config.entities_latin = !0;
    CKEDITOR.config.entities_greek = !0;
    CKEDITOR.config.entities_additional = "#39";
    CKEDITOR.plugins.add("popup");
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
      popup: function(e, a, b, d) {
        a = a || "80%";
        b = b || "70%";
        "string" == typeof a && 1 < a.length && "%" == a.substr(a.length - 1, 1) && (a = parseInt(window.screen.width * parseInt(a, 10) / 100, 10));
        "string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
        640 > a && (a = 640);
        420 > b && (b = 420);
        var f = parseInt((window.screen.height - b) / 2, 10),
          g = parseInt((window.screen.width - a) / 2, 10);
        d = (d || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" +
          a + ",height\x3d" + b + ",top\x3d" + f + ",left\x3d" + g;
        var c = window.open("", null, d, !0);
        if (!c) return !1;
        try {
          -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (c.moveTo(g, f), c.resizeTo(a, b)), c.focus(), c.location.href = e
        } catch (h) {
          window.open(e, null, d, !0)
        }
        return !0
      }
    });
    (function() {
        function g(a, c) {
          var d = [];
          if (c)
            for (var b in c) d.push(b + "\x3d" + encodeURIComponent(c[b]));
          else return a;
          return a + (-1 != a.indexOf("?") ? "\x26" : "?") + d.join("\x26")
        }

        function k(a) {
          a += "";
          return a.charAt(0).toUpperCase() + a.substr(1)
        }

        function m() {
          var a = this.getDialog(),
            c = a.getParentEditor();
          c._.filebrowserSe = this;
          var d = c.config["filebrowser" + k(a.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%",
            a = c.config["filebrowser" + k(a.getName()) + "WindowHeight