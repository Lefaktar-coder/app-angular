"use strict";
(self.webpackChunkcars_app = self.webpackChunkcars_app || []).push([
  [179],
  {
    2: () => {
      function ne(e) {
        return "function" == typeof e;
      }
      function _o(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Co = _o(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function vr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class yt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ne(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Co ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  rc(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Co ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Co(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) rc(t);
            else {
              if (t instanceof yt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && vr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && vr(n, t), t instanceof yt && t._removeParent(this);
        }
      }
      yt.EMPTY = (() => {
        const e = new yt();
        return (e.closed = !0), e;
      })();
      const tc = yt.EMPTY;
      function nc(e) {
        return (
          e instanceof yt ||
          (e && "closed" in e && ne(e.remove) && ne(e.add) && ne(e.unsubscribe))
        );
      }
      function rc(e) {
        ne(e) ? e() : e.unsubscribe();
      }
      const ln = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Eo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Eo;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Eo;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function oc(e) {
        Eo.setTimeout(() => {
          const { onUnhandledError: t } = ln;
          if (!t) throw e;
          t(e);
        });
      }
      function ic() {}
      const bD = gs("C", void 0, void 0);
      function gs(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let cn = null;
      function wo(e) {
        if (ln.useDeprecatedSynchronousErrorHandling) {
          const t = !cn;
          if ((t && (cn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = cn;
            if (((cn = null), n)) throw r;
          }
        } else e();
      }
      class ms extends yt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), nc(t) && t.add(this))
              : (this.destination = FD);
        }
        static create(t, n, r) {
          return new _r(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Ds(
                (function ID(e) {
                  return gs("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Ds(
                (function MD(e) {
                  return gs("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Ds(bD, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const AD = Function.prototype.bind;
      function ys(e, t) {
        return AD.call(e, t);
      }
      class TD {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              bo(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              bo(r);
            }
          else bo(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              bo(n);
            }
        }
      }
      class _r extends ms {
        constructor(t, n, r) {
          let o;
          if ((super(), ne(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && ln.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ys(t.next, i),
                  error: t.error && ys(t.error, i),
                  complete: t.complete && ys(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new TD(o);
        }
      }
      function bo(e) {
        ln.useDeprecatedSynchronousErrorHandling
          ? (function SD(e) {
              ln.useDeprecatedSynchronousErrorHandling &&
                cn &&
                ((cn.errorThrown = !0), (cn.error = e));
            })(e)
          : oc(e);
      }
      function Ds(e, t) {
        const { onStoppedNotification: n } = ln;
        n && Eo.setTimeout(() => n(e, t));
      }
      const FD = {
          closed: !0,
          next: ic,
          error: function ND(e) {
            throw e;
          },
          complete: ic,
        },
        vs =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function sc(e) {
        return e;
      }
      let be = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function PD(e) {
              return (
                (e && e instanceof ms) ||
                ((function xD(e) {
                  return e && ne(e.next) && ne(e.error) && ne(e.complete);
                })(e) &&
                  nc(e))
              );
            })(n)
              ? n
              : new _r(n, r, o);
            return (
              wo(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = uc(r))((o, i) => {
              const s = new _r({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [vs]() {
            return this;
          }
          pipe(...n) {
            return (function ac(e) {
              return 0 === e.length
                ? sc
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = uc(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function uc(e) {
        var t;
        return null !== (t = e ?? ln.Promise) && void 0 !== t ? t : Promise;
      }
      const OD = _o(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let _s = (() => {
        class e extends be {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new lc(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new OD();
          }
          next(n) {
            wo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            wo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            wo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? tc
              : ((this.currentObservers = null),
                i.push(n),
                new yt(() => {
                  (this.currentObservers = null), vr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new be();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new lc(t, n)), e;
      })();
      class lc extends _s {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : tc;
        }
      }
      function An(e) {
        return (t) => {
          if (
            (function RD(e) {
              return ne(e?.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Tn(e, t, n, r, o) {
        return new kD(e, t, n, r, o);
      }
      class kD extends ms {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function dn(e, t) {
        return An((n, r) => {
          let o = 0;
          n.subscribe(
            Tn(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function fn(e) {
        return this instanceof fn ? ((this.v = e), this) : new fn(e);
      }
      function HD(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function fc(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const hc = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function pc(e) {
        return ne(e?.then);
      }
      function gc(e) {
        return ne(e[vs]);
      }
      function mc(e) {
        return Symbol.asyncIterator && ne(e?.[Symbol.asyncIterator]);
      }
      function yc(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Dc = (function $D() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function vc(e) {
        return ne(e?.[Dc]);
      }
      function _c(e) {
        return (function BD(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof fn
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield fn(n.read());
              if (o) return yield fn(void 0);
              yield yield fn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Cc(e) {
        return ne(e?.getReader);
      }
      function Ft(e) {
        if (e instanceof be) return e;
        if (null != e) {
          if (gc(e))
            return (function UD(e) {
              return new be((t) => {
                const n = e[vs]();
                if (ne(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (hc(e))
            return (function GD(e) {
              return new be((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (pc(e))
            return (function zD(e) {
              return new be((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, oc);
              });
            })(e);
          if (mc(e)) return Ec(e);
          if (vc(e))
            return (function WD(e) {
              return new be((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Cc(e))
            return (function qD(e) {
              return Ec(_c(e));
            })(e);
        }
        throw yc(e);
      }
      function Ec(e) {
        return new be((t) => {
          (function KD(e, t) {
            var n, r, o, i;
            return (function LD(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = HD(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Zt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Mo(e, t, n = 1 / 0) {
        return ne(t)
          ? Mo((r, o) => dn((i, s) => t(r, i, o, s))(Ft(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            An((r, o) =>
              (function YD(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let v = !1;
                    Ft(n(g, c++)).subscribe(
                      Tn(
                        t,
                        (y) => {
                          o?.(y), i ? h(y) : t.next(y);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const y = u.shift();
                                s ? Zt(t, s, () => p(y)) : p(y);
                              }
                              f();
                            } catch (y) {
                              t.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Tn(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const wc = new be((e) => e.complete());
      function Es(e) {
        return e[e.length - 1];
      }
      function bc(e) {
        return (function QD(e) {
          return e && ne(e.schedule);
        })(Es(e))
          ? e.pop()
          : void 0;
      }
      function Mc(e, t = 0) {
        return An((n, r) => {
          n.subscribe(
            Tn(
              r,
              (o) => Zt(r, e, () => r.next(o), t),
              () => Zt(r, e, () => r.complete(), t),
              (o) => Zt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Ic(e, t = 0) {
        return An((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Sc(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new be((n) => {
          Zt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Zt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ws(e, t) {
        return t
          ? (function sv(e, t) {
              if (null != e) {
                if (gc(e))
                  return (function tv(e, t) {
                    return Ft(e).pipe(Ic(t), Mc(t));
                  })(e, t);
                if (hc(e))
                  return (function rv(e, t) {
                    return new be((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (pc(e))
                  return (function nv(e, t) {
                    return Ft(e).pipe(Ic(t), Mc(t));
                  })(e, t);
                if (mc(e)) return Sc(e, t);
                if (vc(e))
                  return (function ov(e, t) {
                    return new be((n) => {
                      let r;
                      return (
                        Zt(n, t, () => {
                          (r = e[Dc]()),
                            Zt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ne(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Cc(e))
                  return (function iv(e, t) {
                    return Sc(_c(e), t);
                  })(e, t);
              }
              throw yc(e);
            })(e, t)
          : Ft(e);
      }
      function bs(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new _r({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return Ft(t(...n)).subscribe(r);
      }
      function Y(e) {
        for (let t in e) if (e[t] === Y) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Ms(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function X(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(X).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Is(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const lv = Y({ __forward_ref__: Y });
      function Q(e) {
        return (
          (e.__forward_ref__ = Q),
          (e.toString = function () {
            return X(this());
          }),
          e
        );
      }
      function A(e) {
        return Ss(e) ? e() : e;
      }
      function Ss(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(lv) &&
          e.__forward_ref__ === Q
        );
      }
      function As(e) {
        return e && !!e.ɵproviders;
      }
      const Ac = "https://g.co/ng/security#xss";
      class C extends Error {
        constructor(t, n) {
          super(Io(t, n)), (this.code = t);
        }
      }
      function Io(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function F(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function So(e, t) {
        throw new C(-201, !1);
      }
      function Je(e, t) {
        null == e &&
          (function W(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function U(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Dt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Ao(e) {
        return Tc(e, To) || Tc(e, Fc);
      }
      function Tc(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Nc(e) {
        return e && (e.hasOwnProperty(Ts) || e.hasOwnProperty(yv))
          ? e[Ts]
          : null;
      }
      const To = Y({ ɵprov: Y }),
        Ts = Y({ ɵinj: Y }),
        Fc = Y({ ngInjectableDef: Y }),
        yv = Y({ ngInjectorDef: Y });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let Ns;
      function et(e) {
        const t = Ns;
        return (Ns = e), t;
      }
      function xc(e, t, n) {
        const r = Ao(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void So(X(e));
      }
      const ee = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Cr = {},
        Fs = "__NG_DI_FLAG__",
        No = "ngTempTokenPath",
        vv = "ngTokenPath",
        _v = /\n/gm,
        Cv = "\u0275",
        Pc = "__source";
      let Er;
      function Nn(e) {
        const t = Er;
        return (Er = e), t;
      }
      function Ev(e, t = N.Default) {
        if (void 0 === Er) throw new C(-203, !1);
        return null === Er
          ? xc(e, void 0, t)
          : Er.get(e, t & N.Optional ? null : void 0, t);
      }
      function V(e, t = N.Default) {
        return (
          (function Dv() {
            return Ns;
          })() || Ev
        )(A(e), t);
      }
      function Fn(e, t = N.Default) {
        return V(e, Fo(t));
      }
      function Fo(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function xs(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = A(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = wv(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(V(o, i));
          } else t.push(V(r));
        }
        return t;
      }
      function wr(e, t) {
        return (e[Fs] = t), (e.prototype[Fs] = t), e;
      }
      function wv(e) {
        return e[Fs];
      }
      function xt(e) {
        return { toString: e }.toString();
      }
      var vt = (() => (
          ((vt = vt || {})[(vt.OnPush = 0)] = "OnPush"),
          (vt[(vt.Default = 1)] = "Default"),
          vt
        ))(),
        _t = (() => {
          return (
            ((e = _t || (_t = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            _t
          );
          var e;
        })();
      const Pt = {},
        G = [],
        xo = Y({ ɵcmp: Y }),
        Ps = Y({ ɵdir: Y }),
        Os = Y({ ɵpipe: Y }),
        Rc = Y({ ɵmod: Y }),
        Ot = Y({ ɵfac: Y }),
        br = Y({ __NG_ELEMENT_ID__: Y });
      let Iv = 0;
      function kc(e) {
        return xt(() => {
          const t = Vc(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === vt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || _t.Emulated,
              id: "c" + Iv++,
              styles: e.styles || G,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          Bc(n);
          const r = e.dependencies;
          return (n.directiveDefs = Po(r, !1)), (n.pipeDefs = Po(r, !0)), n;
        });
      }
      function Av(e) {
        return q(e) || Me(e);
      }
      function Tv(e) {
        return null !== e;
      }
      function Rt(e) {
        return xt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || G,
          declarations: e.declarations || G,
          imports: e.imports || G,
          exports: e.exports || G,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Lc(e, t) {
        if (null == e) return Pt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function x(e) {
        return xt(() => {
          const t = Vc(e);
          return Bc(t), t;
        });
      }
      function q(e) {
        return e[xo] || null;
      }
      function Me(e) {
        return e[Ps] || null;
      }
      function je(e) {
        return e[Os] || null;
      }
      function Vc(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || G,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Lc(e.inputs, t),
          outputs: Lc(e.outputs),
        };
      }
      function Bc(e) {
        e.features?.forEach((t) => t(e));
      }
      function Po(e, t) {
        if (!e) return null;
        const n = t ? je : Av;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(Tv);
      }
      const kt = 0,
        b = 1,
        R = 2,
        se = 3,
        at = 4,
        hn = 5,
        Ie = 6,
        xn = 7,
        le = 8,
        Oo = 9,
        Ro = 10,
        L = 11,
        Rs = 12,
        Ir = 13,
        Hc = 14,
        Pn = 15,
        Se = 16,
        Sr = 17,
        On = 18,
        Ct = 19,
        Ar = 20,
        jc = 21,
        te = 22,
        ks = 1,
        $c = 2,
        ko = 7,
        Lo = 8,
        Rn = 9,
        Oe = 10;
      function qe(e) {
        return Array.isArray(e) && "object" == typeof e[ks];
      }
      function ut(e) {
        return Array.isArray(e) && !0 === e[ks];
      }
      function Ls(e) {
        return 0 != (4 & e.flags);
      }
      function Tr(e) {
        return e.componentOffset > -1;
      }
      function Vo(e) {
        return 1 == (1 & e.flags);
      }
      function lt(e) {
        return !!e.template;
      }
      function Fv(e) {
        return 0 != (256 & e[R]);
      }
      function pn(e, t) {
        return e.hasOwnProperty(Ot) ? e[Ot] : null;
      }
      class Ov {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Lt() {
        return zc;
      }
      function zc(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = kv), Rv;
      }
      function Rv() {
        const e = qc(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Pt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function kv(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            qc(e) ||
            (function Lv(e, t) {
              return (e[Wc] = t);
            })(e, { previous: Pt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new Ov(u && u.currentValue, t, a === Pt)), (e[r] = t);
      }
      Lt.ngInherit = !0;
      const Wc = "__ngSimpleChanges__";
      function qc(e) {
        return e[Wc] || null;
      }
      const tt = function (e, t, n) {};
      function Ce(e) {
        for (; Array.isArray(e); ) e = e[kt];
        return e;
      }
      function Bo(e, t) {
        return Ce(t[e]);
      }
      function Ke(e, t) {
        return Ce(t[e.index]);
      }
      function Zc(e, t) {
        return e.data[t];
      }
      function Ye(e, t) {
        const n = t[e];
        return qe(n) ? n : n[kt];
      }
      function Ho(e) {
        return 64 == (64 & e[R]);
      }
      function Qt(e, t) {
        return null == t ? null : e[t];
      }
      function Xc(e) {
        e[On] = 0;
      }
      function Bs(e, t) {
        e[hn] += t;
        let n = e,
          r = e[se];
        for (
          ;
          null !== r && ((1 === t && 1 === n[hn]) || (-1 === t && 0 === n[hn]));

        )
          (r[hn] += t), (n = r), (r = r[se]);
      }
      const P = { lFrame: ad(null), bindingsEnabled: !0 };
      function Jc() {
        return P.bindingsEnabled;
      }
      function D() {
        return P.lFrame.lView;
      }
      function H() {
        return P.lFrame.tView;
      }
      function Hs(e) {
        return (P.lFrame.contextLView = e), e[le];
      }
      function js(e) {
        return (P.lFrame.contextLView = null), e;
      }
      function Ee() {
        let e = ed();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function ed() {
        return P.lFrame.currentTNode;
      }
      function Et(e, t) {
        const n = P.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function $s() {
        return P.lFrame.isParent;
      }
      function Ln() {
        return P.lFrame.bindingIndex++;
      }
      function Zv(e, t) {
        const n = P.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Gs(t);
      }
      function Gs(e) {
        P.lFrame.currentDirectiveIndex = e;
      }
      function Ws(e) {
        P.lFrame.currentQueryIndex = e;
      }
      function Qv(e) {
        const t = e[b];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Ie] : null;
      }
      function id(e, t, n) {
        if (n & N.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & N.Host ||
              ((o = Qv(i)), null === o || ((i = i[Pn]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (P.lFrame = sd());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function qs(e) {
        const t = sd(),
          n = e[b];
        (P.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function sd() {
        const e = P.lFrame,
          t = null === e ? null : e.child;
        return null === t ? ad(e) : t;
      }
      function ad(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function ud() {
        const e = P.lFrame;
        return (
          (P.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const ld = ud;
      function Ks() {
        const e = ud();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function ke() {
        return P.lFrame.selectedIndex;
      }
      function gn(e) {
        P.lFrame.selectedIndex = e;
      }
      function oe() {
        const e = P.lFrame;
        return Zc(e.tView, e.selectedIndex);
      }
      function jo(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks ?? (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, c);
        }
      }
      function $o(e, t, n) {
        cd(e, t, 3, n);
      }
      function Uo(e, t, n, r) {
        (3 & e[R]) === n && cd(e, t, n, r);
      }
      function Ys(e, t) {
        let n = e[R];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[R] = n));
      }
      function cd(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[On] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[On] += 65536),
              (a < i || -1 == i) &&
                (a_(e, n, t, u), (e[On] = (4294901760 & e[On]) + u + 2)),
              u++;
      }
      function a_(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[R] >> 11 < e[On] >> 16 && (3 & e[R]) === t) {
            (e[R] += 2048), tt(4, a, i);
            try {
              i.call(a);
            } finally {
              tt(5, a, i);
            }
          }
        } else {
          tt(4, a, i);
          try {
            i.call(a);
          } finally {
            tt(5, a, i);
          }
        }
      }
      const Vn = -1;
      class Fr {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Xs(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            fd(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function dd(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function fd(e) {
        return 64 === e.charCodeAt(0);
      }
      function xr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  hd(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function hd(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function pd(e) {
        return e !== Vn;
      }
      function Go(e) {
        return 32767 & e;
      }
      function zo(e, t) {
        let n = (function d_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[Pn]), n--;
        return r;
      }
      let Qs = !0;
      function Wo(e) {
        const t = Qs;
        return (Qs = e), t;
      }
      const gd = 255,
        md = 5;
      let f_ = 0;
      const wt = {};
      function qo(e, t) {
        const n = yd(e, t);
        if (-1 !== n) return n;
        const r = t[b];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Js(r.data, e),
          Js(t, null),
          Js(r.blueprint, null));
        const o = ea(e, t),
          i = e.injectorIndex;
        if (pd(o)) {
          const s = Go(o),
            a = zo(o, t),
            u = a[b].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function Js(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function yd(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function ea(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = bd(o)), null === r)) return Vn;
          if ((n++, (o = o[Pn]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Vn;
      }
      function ta(e, t, n) {
        !(function h_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(br) && (r = n[br]),
            null == r && (r = n[br] = f_++);
          const o = r & gd;
          t.data[e + (o >> md)] |= 1 << o;
        })(e, t, n);
      }
      function Dd(e, t, n) {
        if (n & N.Optional || void 0 !== e) return e;
        So();
      }
      function vd(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          !(n & (N.Self | N.Host)))
        ) {
          const o = e[Oo],
            i = et(void 0);
          try {
            return o ? o.get(t, r, n & N.Optional) : xc(t, r, n & N.Optional);
          } finally {
            et(i);
          }
        }
        return Dd(r, 0, n);
      }
      function _d(e, t, n, r = N.Default, o) {
        if (null !== e) {
          if (1024 & t[R]) {
            const s = (function D_(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[R] && !(256 & s[R]);

              ) {
                const a = Cd(i, s, n, r | N.Self, wt);
                if (a !== wt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[jc];
                  if (l) {
                    const c = l.get(n, wt, r);
                    if (c !== wt) return c;
                  }
                  (u = bd(s)), (s = s[Pn]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, wt);
            if (s !== wt) return s;
          }
          const i = Cd(e, t, n, r, wt);
          if (i !== wt) return i;
        }
        return vd(t, n, r, o);
      }
      function Cd(e, t, n, r, o) {
        const i = (function m_(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(br) ? e[br] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & gd : y_) : t;
        })(n);
        if ("function" == typeof i) {
          if (!id(t, e, r)) return r & N.Host ? Dd(o, 0, r) : vd(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & N.Optional) return s;
            So();
          } finally {
            ld();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = yd(e, t),
            u = Vn,
            l = r & N.Host ? t[Se][Ie] : null;
          for (
            (-1 === a || r & N.SkipSelf) &&
            ((u = -1 === a ? ea(e, t) : t[a + 8]),
            u !== Vn && wd(r, !1)
              ? ((s = t[b]), (a = Go(u)), (t = zo(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[b];
            if (Ed(i, a, c.data)) {
              const d = g_(a, t, n, s, r, l);
              if (d !== wt) return d;
            }
            (u = t[a + 8]),
              u !== Vn && wd(r, t[b].data[a + 8] === l) && Ed(i, a, t)
                ? ((s = c), (a = Go(u)), (t = zo(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function g_(e, t, n, r, o, i) {
        const s = t[b],
          a = s.data[e + 8],
          c = (function Ko(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && lt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Tr(a) && Qs : r != s && 0 != (3 & a.type),
            o & N.Host && i === a
          );
        return null !== c ? mn(t, s, c, a) : wt;
      }
      function mn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function u_(e) {
            return e instanceof Fr;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function cv(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function z(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : F(e);
              })(i[n])
            );
          const a = Wo(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? et(s.injectImpl) : null;
          id(e, r, N.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function s_(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = zc(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && et(u), Wo(a), (s.resolving = !1), ld();
          }
        }
        return o;
      }
      function Ed(e, t, n) {
        return !!(n[t + (e >> md)] & (1 << e));
      }
      function wd(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class Bn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return _d(this._tNode, this._lView, t, Fo(r), n);
        }
      }
      function y_() {
        return new Bn(Ee(), D());
      }
      function na(e) {
        return Ss(e)
          ? () => {
              const t = na(A(e));
              return t && t();
            }
          : pn(e);
      }
      function bd(e) {
        const t = e[b],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Ie] : null;
      }
      const jn = "__parameters__";
      function Un(e, t, n) {
        return xt(() => {
          const r = (function oa(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(jn)
                ? u[jn]
                : Object.defineProperty(u, jn, { value: [] })[jn];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class M {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = U({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function yn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? yn(n, t) : t(n)));
      }
      function Id(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Yo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Ze(e, t, n) {
        let r = Gn(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function E_(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function sa(e, t) {
        const n = Gn(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Gn(e, t) {
        return (function Sd(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const Xo = wr(Un("Optional"), 8),
        Qo = wr(Un("SkipSelf"), 4);
      var $e = (() => (
        (($e = $e || {})[($e.Important = 1)] = "Important"),
        ($e[($e.DashCase = 2)] = "DashCase"),
        $e
      ))();
      const fa = new Map();
      let G_ = 0;
      const pa = "__ngContext__";
      function Te(e, t) {
        qe(t)
          ? ((e[pa] = t[Ar]),
            (function W_(e) {
              fa.set(e[Ar], e);
            })(t))
          : (e[pa] = t);
      }
      let ga;
      function ma(e, t) {
        return ga(e, t);
      }
      function Br(e) {
        const t = e[se];
        return ut(t) ? t[se] : t;
      }
      function ya(e) {
        return qd(e[Ir]);
      }
      function Da(e) {
        return qd(e[at]);
      }
      function qd(e) {
        for (; null !== e && !ut(e); ) e = e[at];
        return e;
      }
      function Wn(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          ut(r) ? (i = r) : qe(r) && ((s = !0), (r = r[kt]));
          const a = Ce(r);
          0 === e && null !== n
            ? null == o
              ? Jd(t, n, a)
              : Dn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Dn(t, n, a, o || null, !0)
            : 2 === e
            ? (function Ma(e, t, n) {
                const r = ti(e, t);
                r &&
                  (function fC(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function gC(e, t, n, r, o) {
                const i = n[ko];
                i !== Ce(n) && Wn(t, e, r, i, o);
                for (let a = Oe; a < n.length; a++) {
                  const u = n[a];
                  Hr(u[b], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function _a(e, t, n) {
        return e.createElement(t, n);
      }
      function Yd(e, t) {
        const n = e[Rn],
          r = n.indexOf(t),
          o = t[se];
        512 & t[R] && ((t[R] &= -513), Bs(o, -1)), n.splice(r, 1);
      }
      function Ca(e, t) {
        if (e.length <= Oe) return;
        const n = Oe + t,
          r = e[n];
        if (r) {
          const o = r[Sr];
          null !== o && o !== e && Yd(o, r), t > 0 && (e[n - 1][at] = r[at]);
          const i = Yo(e, Oe + t);
          !(function oC(e, t) {
            Hr(e, t, t[L], 2, null, null), (t[kt] = null), (t[Ie] = null);
          })(r[b], r);
          const s = i[Ct];
          null !== s && s.detachView(i[b]),
            (r[se] = null),
            (r[at] = null),
            (r[R] &= -65);
        }
        return r;
      }
      function Zd(e, t) {
        if (!(128 & t[R])) {
          const n = t[L];
          n.destroyNode && Hr(e, t, n, 3, null, null),
            (function aC(e) {
              let t = e[Ir];
              if (!t) return Ea(e[b], e);
              for (; t; ) {
                let n = null;
                if (qe(t)) n = t[Ir];
                else {
                  const r = t[Oe];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[at] && t !== e; )
                    qe(t) && Ea(t[b], t), (t = t[se]);
                  null === t && (t = e), qe(t) && Ea(t[b], t), (n = t && t[at]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ea(e, t) {
        if (!(128 & t[R])) {
          (t[R] &= -65),
            (t[R] |= 128),
            (function dC(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Fr)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        tt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          tt(5, a, u);
                        }
                      }
                    else {
                      tt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        tt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function cC(e, t) {
              const n = e.cleanup,
                r = t[xn];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[xn] = null;
              }
            })(e, t),
            1 === t[b].type && t[L].destroy();
          const n = t[Sr];
          if (null !== n && ut(t[se])) {
            n !== t[se] && Yd(n, t);
            const r = t[Ct];
            null !== r && r.detachView(e);
          }
          !(function q_(e) {
            fa.delete(e[Ar]);
          })(t);
        }
      }
      function Xd(e, t, n) {
        return (function Qd(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[kt];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === _t.None || i === _t.Emulated) return null;
            }
            return Ke(r, n);
          }
        })(e, t.parent, n);
      }
      function Dn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Jd(e, t, n) {
        e.appendChild(t, n);
      }
      function ef(e, t, n, r, o) {
        null !== r ? Dn(e, t, n, r, o) : Jd(e, t, n);
      }
      function ti(e, t) {
        return e.parentNode(t);
      }
      let wa,
        Aa,
        rf = function nf(e, t, n) {
          return 40 & e.type ? Ke(e, n) : null;
        };
      function ni(e, t, n, r) {
        const o = Xd(e, r, t),
          i = t[L],
          a = (function tf(e, t, n) {
            return rf(e, t, n);
          })(r.parent || t[Ie], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) ef(i, o, n[u], a, !1);
          else ef(i, o, n, a, !1);
        void 0 !== wa && wa(i, r, t, n, o);
      }
      function ri(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ke(t, e);
          if (4 & n) return ba(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return ri(e, r);
            {
              const o = e[t.index];
              return ut(o) ? ba(-1, o) : Ce(o);
            }
          }
          if (32 & n) return ma(t, e)() || Ce(e[t.index]);
          {
            const r = sf(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : ri(Br(e[Se]), r)
              : ri(e, t.next);
          }
        }
        return null;
      }
      function sf(e, t) {
        return null !== t ? e[Se][Ie].projection[t.projection] : null;
      }
      function ba(e, t) {
        const n = Oe + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[b].firstChild;
          if (null !== o) return ri(r, o);
        }
        return t[ko];
      }
      function Ia(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Te(Ce(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) Ia(e, t, n.child, r, o, i, !1), Wn(t, e, o, a, i);
            else if (32 & u) {
              const l = ma(n, r);
              let c;
              for (; (c = l()); ) Wn(t, e, o, c, i);
              Wn(t, e, o, a, i);
            } else 16 & u ? af(e, t, r, n, o, i) : Wn(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Hr(e, t, n, r, o, i) {
        Ia(n, r, e.firstChild, t, o, i, !1);
      }
      function af(e, t, n, r, o, i) {
        const s = n[Se],
          u = s[Ie].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Wn(t, e, o, u[l], i);
        else Ia(e, t, u, s[se], o, i, !0);
      }
      function uf(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function lf(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Xs(e, t, r),
          null !== o && uf(e, t, o),
          null !== i &&
            (function yC(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class pf {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ac})`;
        }
      }
      function Jt(e) {
        return e instanceof pf ? e.changingThisBreaksApplicationSecurity : e;
      }
      const FC = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var pe = (() => (
        ((pe = pe || {})[(pe.NONE = 0)] = "NONE"),
        (pe[(pe.HTML = 1)] = "HTML"),
        (pe[(pe.STYLE = 2)] = "STYLE"),
        (pe[(pe.SCRIPT = 3)] = "SCRIPT"),
        (pe[(pe.URL = 4)] = "URL"),
        (pe[(pe.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        pe
      ))();
      function Oa(e) {
        const t = (function Ur() {
          const e = D();
          return e && e[Rs];
        })();
        return t
          ? t.sanitize(pe.URL, e) || ""
          : (function jr(e, t) {
              const n = (function SC(e) {
                return (e instanceof pf && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(`Required a safe ${t}, got a ${n} (see ${Ac})`);
              }
              return n === t;
            })(e, "URL")
          ? Jt(e)
          : (function Na(e) {
              return (e = String(e)).match(FC) ? e : "unsafe:" + e;
            })(F(e));
      }
      const Ef = new M("ENVIRONMENT_INITIALIZER"),
        wf = new M("INJECTOR", -1),
        bf = new M("INJECTOR_DEF_TYPES");
      class Mf {
        get(t, n = Cr) {
          if (n === Cr) {
            const r = new Error(`NullInjectorError: No provider for ${X(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function WC(...e) {
        return { ɵproviders: If(0, e), ɵfromNgModule: !0 };
      }
      function If(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          yn(t, (i) => {
            const s = i;
            Ra(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Sf(o, n),
          n
        );
      }
      function Sf(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          ka(o, (i) => {
            t.push(i);
          });
        }
      }
      function Ra(e, t, n, r) {
        if (!(e = A(e))) return !1;
        let o = null,
          i = Nc(e);
        const s = !i && q(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Nc(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) Ra(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                yn(i.imports, (c) => {
                  Ra(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && Sf(l, t);
            }
            if (!a) {
              const l = pn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: G },
                { provide: bf, useValue: o, multi: !0 },
                { provide: Ef, useValue: () => V(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              ka(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function ka(e, t) {
        for (let n of e)
          As(n) && (n = n.ɵproviders), Array.isArray(n) ? ka(n, t) : t(n);
      }
      const qC = Y({ provide: String, useValue: Y });
      function La(e) {
        return null !== e && "object" == typeof e && qC in e;
      }
      function vn(e) {
        return "function" == typeof e;
      }
      const Va = new M("Set Injector scope."),
        ai = {},
        YC = {};
      let Ba;
      function ui() {
        return void 0 === Ba && (Ba = new Mf()), Ba;
      }
      class _n {}
      class Nf extends _n {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            ja(t, (s) => this.processProvider(s)),
            this.records.set(wf, Kn(void 0, this)),
            o.has("environment") && this.records.set(_n, Kn(void 0, this));
          const i = this.records.get(Va);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(bf.multi, G, N.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Nn(this),
            r = et(void 0);
          try {
            return t();
          } finally {
            Nn(n), et(r);
          }
        }
        get(t, n = Cr, r = N.Default) {
          this.assertNotDestroyed(), (r = Fo(r));
          const o = Nn(this),
            i = et(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function e0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof M)
                    );
                  })(t) && Ao(t);
                (a = u && this.injectableDefInScope(u) ? Kn(Ha(t), ai) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? ui() : this.parent).get(
              t,
              (n = r & N.Optional && n === Cr ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[No] = s[No] || []).unshift(X(t)), o)) throw s;
              return (function bv(e, t, n, r) {
                const o = e[No];
                throw (
                  (t[Pc] && o.unshift(t[Pc]),
                  (e.message = (function Mv(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == Cv
                        ? e.slice(2)
                        : e;
                    let o = X(t);
                    if (Array.isArray(t)) o = t.map(X).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : X(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      _v,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[vv] = o),
                  (e[No] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            et(i), Nn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Nn(this),
            n = et(void 0);
          try {
            const r = this.get(Ef.multi, G, N.Self);
            for (const o of r) o();
          } finally {
            Nn(t), et(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(X(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = vn((t = A(t))) ? t : A(t && t.provide);
          const r = (function XC(e) {
            return La(e) ? Kn(void 0, e.useValue) : Kn(Ff(e), ai);
          })(t);
          if (vn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Kn(void 0, ai, !0)),
              (o.factory = () => xs(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === ai && ((n.value = YC), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function JC(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = A(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Ha(e) {
        const t = Ao(e),
          n = null !== t ? t.factory : pn(e);
        if (null !== n) return n;
        if (e instanceof M) throw new C(204, !1);
        if (e instanceof Function)
          return (function ZC(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Rr(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function gv(e) {
              const t = e && (e[To] || e[Fc]);
              return t
                ? ((function mv(e) {
                    if (e.hasOwnProperty("name")) return e.name;
                    ("" + e).match(/^function\s*([^\s(]+)/);
                  })(e),
                  t)
                : null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function Ff(e, t, n) {
        let r;
        if (vn(e)) {
          const o = A(e);
          return pn(o) || Ha(o);
        }
        if (La(e)) r = () => A(e.useValue);
        else if (
          (function Tf(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...xs(e.deps || []));
        else if (
          (function Af(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => V(A(e.useExisting));
        else {
          const o = A(e && (e.useClass || e.provide));
          if (
            !(function QC(e) {
              return !!e.deps;
            })(e)
          )
            return pn(o) || Ha(o);
          r = () => new o(...xs(e.deps));
        }
        return r;
      }
      function Kn(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function ja(e, t) {
        for (const n of e)
          Array.isArray(n) ? ja(n, t) : n && As(n) ? ja(n.ɵproviders, t) : t(n);
      }
      class t0 {}
      class xf {}
      class r0 {
        resolveComponentFactory(t) {
          throw (function n0(e) {
            const t = Error(
              `No component factory found for ${X(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let li = (() => {
        class e {}
        return (e.NULL = new r0()), e;
      })();
      function o0() {
        return Yn(Ee(), D());
      }
      function Yn(e, t) {
        return new ct(Ke(e, t));
      }
      let ct = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = o0), e;
      })();
      class Of {}
      let Cn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function a0() {
                const e = D(),
                  n = Ye(Ee().index, e);
                return (qe(n) ? n : e)[L];
              })()),
            e
          );
        })(),
        u0 = (() => {
          class e {}
          return (
            (e.ɵprov = U({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class ci {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const l0 = new ci("15.2.6"),
        $a = {},
        Ua = "ngOriginalError";
      function Ga(e) {
        return e[Ua];
      }
      class Zn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Ga(t);
          for (; n && Ga(n); ) n = Ga(n);
          return n || null;
        }
      }
      function za(e) {
        return e.ownerDocument;
      }
      function kf(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Lf = "ng-template";
      function v0(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== kf(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Vf(e) {
        return 4 === e.type && e.value !== Lf;
      }
      function _0(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Lf);
      }
      function C0(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function b0(e) {
            for (let t = 0; t < e.length; t++) if (dd(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !_0(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (dt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!v0(e.attrs, l, n)) {
                    if (dt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = E0(8 & r ? "class" : u, o, Vf(e), n);
                if (-1 === d) {
                  if (dt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== kf(h, l, 0)) || (2 & r && l !== f)) {
                    if (dt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !dt(r) && !dt(u)) return !1;
            if (s && dt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return dt(r) || s;
      }
      function dt(e) {
        return 0 == (1 & e);
      }
      function E0(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function M0(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Bf(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (C0(e, t[r], n)) return !0;
        return !1;
      }
      function Hf(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function S0(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !dt(s) && ((t += Hf(i, o)), (o = "")),
              (r = s),
              (i = i || !dt(r));
          n++;
        }
        return "" !== o && (t += Hf(i, o)), t;
      }
      const O = {};
      function Xe(e) {
        jf(H(), D(), ke() + e, !1);
      }
      function jf(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[R])) {
            const i = e.preOrderCheckHooks;
            null !== i && $o(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Uo(t, i, 0, n);
          }
        gn(n);
      }
      function zf(e, t = null, n = null, r) {
        const o = Wf(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Wf(e, t = null, n = null, r, o = new Set()) {
        const i = [n || G, WC(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : X(e))),
          new Nf(i, t || ui(), r || null, o)
        );
      }
      let en = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return zf({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return zf({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Cr),
          (e.NULL = new Mf()),
          (e.ɵprov = U({ token: e, providedIn: "any", factory: () => V(wf) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function _(e, t = N.Default) {
        const n = D();
        return null === n ? V(e, t) : _d(Ee(), n, A(e), t);
      }
      function Jf(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Ws(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function fi(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[kt] = o),
          (d[R] = 76 | r),
          (null !== c || (e && 1024 & e[R])) && (d[R] |= 1024),
          Xc(d),
          (d[se] = d[Pn] = e),
          (d[le] = n),
          (d[Ro] = s || (e && e[Ro])),
          (d[L] = a || (e && e[L])),
          (d[Rs] = u || (e && e[Rs]) || null),
          (d[Oo] = l || (e && e[Oo]) || null),
          (d[Ie] = i),
          (d[Ar] = (function z_() {
            return G_++;
          })()),
          (d[jc] = c),
          (d[Se] = 2 == t.type ? e[Se] : d),
          d
        );
      }
      function Jn(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Za(e, t, n, r, o) {
            const i = ed(),
              s = $s(),
              u = (e.data[t] = (function eE(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function Yv() {
              return P.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Nr() {
            const e = P.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Et(i, !0), i;
      }
      function Gr(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Xa(e, t, n) {
        qs(t);
        try {
          const r = e.viewQuery;
          null !== r && au(1, r, n);
          const o = e.template;
          null !== o && eh(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Jf(e, t),
            e.staticViewQueries && au(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function X0(e, t) {
              for (let n = 0; n < t.length; n++) vE(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[R] &= -5), Ks();
        }
      }
      function hi(e, t, n, r) {
        const o = t[R];
        if (128 != (128 & o)) {
          qs(t);
          try {
            Xc(t),
              (function nd(e) {
                return (P.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && eh(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && $o(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && Uo(t, l, 0, null), Ys(t, 0);
            }
            if (
              ((function yE(e) {
                for (let t = ya(e); null !== t; t = Da(t)) {
                  if (!t[$c]) continue;
                  const n = t[Rn];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[R] || Bs(o[se], 1), (o[R] |= 512);
                  }
                }
              })(t),
              (function mE(e) {
                for (let t = ya(e); null !== t; t = Da(t))
                  for (let n = Oe; n < t.length; n++) {
                    const r = t[n],
                      o = r[b];
                    Ho(r) && hi(o, r, o.template, r[le]);
                  }
              })(t),
              null !== e.contentQueries && Jf(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && $o(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && Uo(t, l, 1), Ys(t, 1);
            }
            !(function Y0(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) gn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      Zv(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  gn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function Z0(e, t) {
                for (let n = 0; n < t.length; n++) DE(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && au(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && $o(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && Uo(t, l, 2), Ys(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[R] &= -41),
              512 & t[R] && ((t[R] &= -513), Bs(t[se], -1));
          } finally {
            Ks();
          }
        }
      }
      function eh(e, t, n, r, o) {
        const i = ke(),
          s = 2 & r;
        try {
          gn(-1),
            s && t.length > te && jf(e, t, te, !1),
            tt(s ? 2 : 0, o),
            n(r, o);
        } finally {
          gn(i), tt(s ? 3 : 1, o);
        }
      }
      function Qa(e, t, n) {
        if (Ls(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Ja(e, t, n) {
        Jc() &&
          ((function sE(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            Tr(n) &&
              (function hE(e, t, n) {
                const r = Ke(t, e),
                  o = th(n),
                  i = e[Ro],
                  s = pi(
                    e,
                    fi(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || qo(n, t),
              Te(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = mn(t, e, a, n);
              Te(l, t),
                null !== s && pE(0, a - o, l, u, 0, s),
                lt(u) && (Ye(n.index, t)[le] = mn(t, e, a, n));
            }
          })(e, t, n, Ke(n, t)),
          64 == (64 & n.flags) && ah(e, t, n));
      }
      function eu(e, t, n = Ke) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function th(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = tu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function tu(e, t, n, r, o, i, s, a, u, l) {
        const c = te + r,
          d = c + o,
          f = (function Q0(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : O);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[b] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function rh(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? oh(n, t, o, i)
              : r.hasOwnProperty(o) && oh(n, t, r[o], i);
          }
        return n;
      }
      function oh(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Qe(e, t, n, r, o, i, s, a) {
        const u = Ke(t, n);
        let c,
          l = t.inputs;
        !a && null != l && (c = l[r])
          ? (uu(e, n, c, r, o), Tr(t) && ih(n, t.index))
          : 3 & t.type &&
            ((r = (function nE(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(u, r, o));
      }
      function ih(e, t) {
        const n = Ye(t, e);
        16 & n[R] || (n[R] |= 32);
      }
      function nu(e, t, n, r) {
        if (Jc()) {
          const o = null === r ? null : { "": -1 },
            i = (function uE(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (Bf(t, s.selectors, !1))
                    if ((r || (r = []), lt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          ru(e, t, a.length);
                      } else r.unshift(s), ru(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && sh(e, t, n, s, o, a),
            o &&
              (function lE(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = xr(n.mergedAttrs, n.attrs);
      }
      function sh(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) ta(qo(n, t), e, r[l].type);
        !(function dE(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = Gr(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = xr(n.mergedAttrs, c.hostAttrs)),
            fE(e, n, t, u, c),
            cE(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            u++;
        }
        !(function tE(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = rh(d.inputs, c, u, f ? f.inputs : null)),
              (l = rh(d.outputs, c, l, p));
            const g = null === u || null === s || Vf(t) ? null : gE(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function ah(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function Xv() {
            return P.lFrame.currentDirectiveIndex;
          })();
        try {
          gn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            Gs(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                aE(u, l);
          }
        } finally {
          gn(-1), Gs(s);
        }
      }
      function aE(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function ru(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function cE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          lt(t) && (n[""] = e);
        }
      }
      function fE(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = pn(o.type)),
          s = new Fr(i, lt(o), _);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function oE(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function iE(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Gr(e, n, o.hostVars, O), o);
      }
      function pE(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function gE(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function uh(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function DE(e, t) {
        const n = Ye(t, e);
        if (Ho(n)) {
          const r = n[b];
          48 & n[R] ? hi(r, n, r.template, n[le]) : n[hn] > 0 && iu(n);
        }
      }
      function iu(e) {
        for (let r = ya(e); null !== r; r = Da(r))
          for (let o = Oe; o < r.length; o++) {
            const i = r[o];
            if (Ho(i))
              if (512 & i[R]) {
                const s = i[b];
                hi(s, i, s.template, i[le]);
              } else i[hn] > 0 && iu(i);
          }
        const n = e[b].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Ye(n[r], e);
            Ho(o) && o[hn] > 0 && iu(o);
          }
      }
      function vE(e, t) {
        const n = Ye(t, e),
          r = n[b];
        (function _E(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Xa(r, n, n[le]);
      }
      function pi(e, t) {
        return e[Ir] ? (e[Hc][at] = t) : (e[Ir] = t), (e[Hc] = t), t;
      }
      function su(e) {
        for (; e; ) {
          e[R] |= 32;
          const t = Br(e);
          if (Fv(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function gi(e, t, n, r = !0) {
        const o = t[Ro];
        o.begin && o.begin();
        try {
          hi(e, t, e.template, n);
        } catch (s) {
          throw (r && fh(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function au(e, t, n) {
        Ws(0), t(e, n);
      }
      function lh(e) {
        return e[xn] || (e[xn] = []);
      }
      function ch(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function fh(e, t) {
        const n = e[Oo],
          r = n ? n.get(Zn, null) : null;
        r && r.handleError(t);
      }
      function uu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function mi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Is(o, a))
              : 2 == i && (r = Is(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function yi(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Ce(i)), ut(i)))
            for (let a = Oe; a < i.length; a++) {
              const u = i[a],
                l = u[b].firstChild;
              null !== l && yi(u[b], u, l, r);
            }
          const s = n.type;
          if (8 & s) yi(e, t, n.child, r);
          else if (32 & s) {
            const a = ma(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = sf(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Br(t[Se]);
              yi(u[b], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class zr {
        get rootNodes() {
          const t = this._lView,
            n = t[b];
          return yi(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[le];
        }
        set context(t) {
          this._lView[le] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[R]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[se];
            if (ut(t)) {
              const n = t[Lo],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Ca(t, r), Yo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Zd(this._lView[b], this._lView);
        }
        onDestroy(t) {
          !(function nh(e, t, n, r) {
            const o = lh(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && ch(e).push(r, o.length - 1));
          })(this._lView[b], this._lView, null, t);
        }
        markForCheck() {
          su(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[R] &= -65;
        }
        reattach() {
          this._lView[R] |= 64;
        }
        detectChanges() {
          gi(this._lView[b], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function sC(e, t) {
              Hr(e, t, t[L], 2, null, null);
            })(this._lView[b], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class CE extends zr {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          gi(t[b], t, t[le], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class hh extends li {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = q(t);
          return new Wr(n, this.ngModule);
        }
      }
      function ph(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class wE {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Fo(r);
          const o = this.injector.get(t, $a, r);
          return o !== $a || n === $a ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Wr extends xf {
        get inputs() {
          return ph(this.componentDef.inputs);
        }
        get outputs() {
          return ph(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function A0(e) {
              return e.map(S0).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof _n ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new wE(t, i) : t,
            a = s.get(Of, null);
          if (null === a) throw new C(407, !1);
          const u = s.get(u0, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function J0(e, t, n) {
                  return e.selectRootElement(t, n === _t.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : _a(
                  l,
                  c,
                  (function EE(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = tu(0, null, null, 1, 0, null, null, null, null, null),
            p = fi(null, h, null, f, null, null, a, l, u, s, null);
          let g, v;
          qs(p);
          try {
            const y = this.componentDef;
            let w,
              m = null;
            y.findHostDirectiveDefs
              ? ((w = []),
                (m = new Map()),
                y.findHostDirectiveDefs(y, w, m),
                w.push(y))
              : (w = [y]);
            const S = (function ME(e, t) {
                const n = e[b],
                  r = te;
                return (e[r] = t), Jn(n, r, 2, "#host", null);
              })(p, d),
              Z = (function IE(e, t, n, r, o, i, s, a) {
                const u = o[b];
                !(function SE(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = xr(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (mi(t, t.mergedAttrs, !0), null !== n && lf(r, n, t));
                })(r, e, t, s);
                const l = i.createRenderer(t, n),
                  c = fi(
                    o,
                    th(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && ru(u, e, r.length - 1),
                  pi(o, c),
                  (o[e.index] = c)
                );
              })(S, d, y, w, p, a, l);
            (v = Zc(h, te)),
              d &&
                (function TE(e, t, n, r) {
                  if (r) Xs(e, n, ["ng-version", l0.full]);
                  else {
                    const { attrs: o, classes: i } = (function T0(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!dt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Xs(e, n, o),
                      i && i.length > 0 && uf(e, n, i.join(" "));
                  }
                })(l, y, d, r),
              void 0 !== n &&
                (function NE(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(v, this.ngContentSelectors, n),
              (g = (function AE(e, t, n, r, o, i) {
                const s = Ee(),
                  a = o[b],
                  u = Ke(s, o);
                sh(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  Te(mn(o, a, s.directiveStart + c, s), o);
                ah(a, o, s), u && Te(u, o);
                const l = mn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[le] = o[le] = l), null !== i))
                  for (const c of i) c(l, t);
                return Qa(a, s, e), l;
              })(Z, y, w, m, p, [FE])),
              Xa(h, p, null);
          } finally {
            Ks();
          }
          return new bE(this.componentType, g, Yn(v, p), p, v);
        }
      }
      class bE extends t0 {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new CE(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            uu(i[b], i, o, t, n), ih(i, this._tNode.index);
          }
        }
        get injector() {
          return new Bn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function FE() {
        const e = Ee();
        jo(D()[b], e);
      }
      function K(e) {
        let t = (function gh(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (lt(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = lu(e.inputs)),
                (s.declaredInputs = lu(e.declaredInputs)),
                (s.outputs = lu(e.outputs));
              const a = o.hostBindings;
              a && RE(e, a);
              const u = o.viewQuery,
                l = o.contentQueries;
              if (
                (u && PE(e, u),
                l && OE(e, l),
                Ms(e.inputs, o.inputs),
                Ms(e.declaredInputs, o.declaredInputs),
                Ms(e.outputs, o.outputs),
                lt(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === K && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function xE(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = xr(o.hostAttrs, (n = xr(n, o.hostAttrs))));
          }
        })(r);
      }
      function lu(e) {
        return e === Pt ? {} : e === G ? [] : e;
      }
      function PE(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function OE(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function RE(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function Di(e) {
        return (
          !!cu(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function cu(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Ne(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function tr(e, t, n, r) {
        return Ne(e, Ln(), n) ? t + F(n) + r : O;
      }
      function du(e) {
        return (function kn(e, t) {
          return e[t];
        })(
          (function Kv() {
            return P.lFrame.contextLView;
          })(),
          te + e
        );
      }
      function Gt(e, t, n) {
        const r = D();
        return Ne(r, Ln(), t) && Qe(H(), oe(), r, e, t, r[L], n, !1), Gt;
      }
      function fu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        uu(e, n, t.inputs[s], s, r);
      }
      function j(e, t, n, r) {
        const o = D(),
          i = H(),
          s = te + e,
          a = o[L],
          u = i.firstCreatePass
            ? (function qE(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Jn(t, e, 2, r, Qt(s, o));
                return (
                  nu(t, n, u, Qt(s, i)),
                  null !== u.attrs && mi(u, u.attrs, !1),
                  null !== u.mergedAttrs && mi(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = (o[s] = _a(
            a,
            t,
            (function i_() {
              return P.lFrame.currentNamespace;
            })()
          )),
          c = Vo(u);
        return (
          Et(u, !0),
          lf(a, l, u),
          32 != (32 & u.flags) && ni(i, o, l, u),
          0 ===
            (function Uv() {
              return P.lFrame.elementDepthCount;
            })() && Te(l, o),
          (function Gv() {
            P.lFrame.elementDepthCount++;
          })(),
          c && (Ja(i, o, u), Qa(i, u, o)),
          null !== r && eu(o, u),
          j
        );
      }
      function $() {
        let e = Ee();
        $s()
          ? (function Us() {
              P.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Et(e, !1));
        const t = e;
        !(function zv() {
          P.lFrame.elementDepthCount--;
        })();
        const n = H();
        return (
          n.firstCreatePass && (jo(n, e), Ls(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function l_(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            fu(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function c_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            fu(n, t, D(), t.stylesWithoutHost, !1),
          $
        );
      }
      function ot(e, t, n, r) {
        return j(e, t, n, r), $(), ot;
      }
      function gu() {
        return D();
      }
      function _i(e) {
        return !!e && "function" == typeof e.then;
      }
      const Fh = function Nh(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function we(e, t, n, r) {
        const o = D(),
          i = H(),
          s = Ee();
        return (
          (function Ph(e, t, n, r, o, i, s) {
            const a = Vo(r),
              l = e.firstCreatePass && ch(e),
              c = t[le],
              d = lh(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Ke(r, t),
                v = s ? s(g) : g,
                y = d.length,
                w = s ? (S) => s(Ce(S[r.index])) : r.index;
              let m = null;
              if (
                (!s &&
                  a &&
                  (m = (function YE(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[xn],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== m)
              )
                ((m.__ngLastListenerFn__ || m).__ngNextListenerFn__ = i),
                  (m.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Rh(r, t, c, i, !1);
                const S = n.listen(v, o, i);
                d.push(i, S), l && l.push(o, w, y, y + 1);
              }
            } else i = Rh(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let v = 0; v < g; v += 2) {
                  const Z = t[p[v]][p[v + 1]].subscribe(i),
                    he = d.length;
                  d.push(i, Z), l && l.push(o, r.index, he, -(he + 1));
                }
            }
          })(i, o, o[L], s, e, t, r),
          we
        );
      }
      function Oh(e, t, n, r) {
        try {
          return tt(6, t, n), !1 !== n(r);
        } catch (o) {
          return fh(e, o), !1;
        } finally {
          tt(7, t, n);
        }
      }
      function Rh(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          su(e.componentOffset > -1 ? Ye(e.index, t) : t);
          let u = Oh(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Oh(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function kh(e = 1) {
        return (function Jv(e) {
          return (P.lFrame.contextLView = (function e_(e, t) {
            for (; e > 0; ) (t = t[Pn]), e--;
            return t;
          })(e, P.lFrame.contextLView))[le];
        })(e);
      }
      function Ci(e, t, n) {
        return mu(e, "", t, "", n), Ci;
      }
      function mu(e, t, n, r, o) {
        const i = D(),
          s = tr(i, t, n, r);
        return s !== O && Qe(H(), oe(), i, e, s, i[L], o, !1), mu;
      }
      function Ei(e, t) {
        return (e << 17) | (t << 2);
      }
      function tn(e) {
        return (e >> 17) & 32767;
      }
      function yu(e) {
        return 2 | e;
      }
      function wn(e) {
        return (131068 & e) >> 2;
      }
      function Du(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function vu(e) {
        return 1 | e;
      }
      function zh(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? tn(i) : wn(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          ow(e[a], t) && ((u = !0), (e[a + 1] = r ? vu(c) : yu(c))),
            (a = r ? tn(c) : wn(c));
        }
        u && (e[n + 1] = r ? yu(i) : vu(i));
      }
      function ow(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Gn(e, t) >= 0)
        );
      }
      function wi(e, t) {
        return (
          (function ft(e, t, n, r) {
            const o = D(),
              i = H(),
              s = (function Bt(e) {
                const t = P.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function ep(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[ke()],
                    s = (function Jh(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function op(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function hw(e, t, n, r) {
                      const o = (function zs(e) {
                        const t = P.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Kr((n = _u(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = _u(o, e, t, n, r)), null === i)) {
                            let u = (function pw(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== wn(r)) return e[tn(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = _u(null, e, t, u[1], r)),
                              (u = Kr(u, t.attrs, r)),
                              (function gw(e, t, n, r) {
                                e[tn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function mw(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Kr(r, e[i].hostAttrs, n);
                              return Kr(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function nw(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = tn(s),
                        u = wn(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || Gn(n, c) > 0) && (l = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== u) {
                          const f = tn(e[a + 1]);
                          (e[r + 1] = Ei(f, a)),
                            0 !== f && (e[f + 1] = Du(e[f + 1], r)),
                            (e[a + 1] = (function ew(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Ei(a, 0)),
                            0 !== a && (e[a + 1] = Du(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Ei(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = Du(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = yu(e[r + 1])),
                        zh(e, c, r, !0),
                        zh(e, c, r, !1),
                        (function rw(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            Gn(i, t) >= 0 &&
                            (n[r + 1] = vu(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Ei(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== O &&
                Ne(o, s, t) &&
                (function np(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function tw(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? rp(u, t, n, o, wn(l), s)
                      : void 0;
                  bi(c) ||
                    (bi(i) ||
                      ((function JE(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = rp(u, null, n, o, a, s))),
                    (function mC(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : $e.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= $e.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, Bo(ke(), n), o, i));
                })(
                  i,
                  i.data[ke()],
                  o,
                  o[L],
                  e,
                  (o[s + 1] = (function vw(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = X(Jt(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          wi
        );
      }
      function _u(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Kr(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Kr(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                Ze(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function rp(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === O && (f = d ? G : void 0);
          let h = d ? sa(f, r) : c === r ? f : void 0;
          if ((l && !bi(h) && (h = sa(u, r)), bi(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? tn(p) : wn(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = sa(u, r));
        }
        return a;
      }
      function bi(e) {
        return void 0 !== e;
      }
      function ae(e, t = "") {
        const n = D(),
          r = H(),
          o = e + te,
          i = r.firstCreatePass ? Jn(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function va(e, t) {
            return e.createText(t);
          })(n[L], t));
        ni(r, n, s, i), Et(i, !1);
      }
      function Yr(e) {
        return Mi("", e, ""), Yr;
      }
      function Mi(e, t, n) {
        const r = D(),
          o = tr(r, e, t, n);
        return (
          o !== O &&
            (function $t(e, t, n) {
              const r = Bo(t, e);
              !(function Kd(e, t, n) {
                e.setValue(t, n);
              })(e[L], r, n);
            })(r, ke(), o),
          Mi
        );
      }
      const dr = "en-US";
      let Ip = dr;
      function wu(e, t, n, r, o) {
        if (((e = A(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) wu(e[i], t, n, r, o);
        else {
          const i = H(),
            s = D();
          let a = vn(e) ? e : A(e.provide),
            u = Ff(e);
          const l = Ee(),
            c = 1048575 & l.providerIndexes,
            d = l.directiveStart,
            f = l.providerIndexes >> 20;
          if (vn(e) || !e.multi) {
            const h = new Fr(u, o, _),
              p = Mu(a, t, o ? c : c + f, d);
            -1 === p
              ? (ta(qo(l, s), i, a),
                bu(i, e, t.length),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Mu(a, t, c + f, d),
              p = Mu(a, t, c, c + f),
              v = p >= 0 && n[p];
            if ((o && !v) || (!o && !(h >= 0 && n[h]))) {
              ta(qo(l, s), i, a);
              const y = (function Lb(e, t, n, r, o) {
                const i = new Fr(e, n, _);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Xp(i, o, r && !n),
                  i
                );
              })(o ? kb : Rb, n.length, o, r, u);
              !o && v && (n[p].providerFactory = y),
                bu(i, e, t.length, 0),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(y),
                s.push(y);
            } else bu(i, e, h > -1 ? h : p, Xp(n[o ? p : h], u, !o && r));
            !o && r && v && n[p].componentProviders++;
          }
        }
      }
      function bu(e, t, n, r) {
        const o = vn(t),
          i = (function KC(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? A(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = l.indexOf(n);
              -1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u);
            } else l.push(n, u);
          }
        }
      }
      function Xp(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Mu(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function Rb(e, t, n, r) {
        return Iu(this.multi, []);
      }
      function kb(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = mn(n, n[b], this.providerFactory.index, r);
          (i = a.slice(0, s)), Iu(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), Iu(o, i);
        return i;
      }
      function Iu(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function re(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function Ob(e, t, n) {
              const r = H();
              if (r.firstCreatePass) {
                const o = lt(e);
                wu(n, r.data, r.blueprint, o, !0),
                  wu(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class fr {}
      class Vb {}
      class Qp extends fr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new hh(this));
          const r = (function We(e, t) {
            const n = e[Rc] || null;
            if (!n && !0 === t)
              throw new Error(
                `Type ${X(e)} does not have '\u0275mod' property.`
              );
            return n;
          })(t);
          (this._bootstrapComponents = (function jt(e) {
            return e instanceof Function ? e() : e;
          })(r.bootstrap)),
            (this._r3Injector = Wf(
              t,
              n,
              [
                { provide: fr, useValue: this },
                { provide: li, useValue: this.componentFactoryResolver },
              ],
              X(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Su extends Vb {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Qp(this.moduleType, t);
        }
      }
      function Tu(e, t, n, r) {
        return (function sg(e, t, n, r, o, i) {
          const s = t + n;
          return Ne(e, s, o)
            ? (function Mt(e, t, n) {
                return (e[t] = n);
              })(e, s + 1, i ? r.call(i, o) : r(o))
            : (function to(e, t) {
                const n = e[t];
                return n === O ? void 0 : n;
              })(e, s + 1);
        })(
          D(),
          (function Re() {
            const e = P.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r
        );
      }
      function Nu(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Fe = class hM extends _s {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Nu(i)), o && (o = Nu(o)), s && (s = Nu(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof yt && t.add(a), a;
        }
      };
      let zt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = yM), e;
      })();
      const gM = zt,
        mM = class extends gM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = fi(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[Sr] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[Ct];
            return (
              null !== s && (o[Ct] = s.createEmbeddedView(r)),
              Xa(r, o, t),
              new zr(o)
            );
          }
        };
      function yM() {
        return (function Ni(e, t) {
          return 4 & e.type ? new mM(t, e, Yn(e, t)) : null;
        })(Ee(), D());
      }
      let At = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = DM), e;
      })();
      function DM() {
        return (function hg(e, t) {
          let n;
          const r = t[e.index];
          if (ut(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = Ce(r);
            else {
              const i = t[L];
              o = i.createComment("");
              const s = Ke(e, t);
              Dn(
                i,
                ti(i, s),
                o,
                (function hC(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = uh(r, t, o, e)), pi(t, n);
          }
          return new dg(n, e, t);
        })(Ee(), D());
      }
      const vM = At,
        dg = class extends vM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Yn(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Bn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = ea(this._hostTNode, this._hostLView);
            if (pd(t)) {
              const n = zo(t, this._hostLView),
                r = Go(t);
              return new Bn(n[b].data[r + 8], n);
            }
            return new Bn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = fg(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Oe;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Or(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new Wr(q(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(_n, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[b];
            if (
              (function $v(e) {
                return ut(e[se]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[se],
                  f = new dg(d, d[Ie], d[se]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function uC(e, t, n, r) {
              const o = Oe + r,
                i = n.length;
              r > 0 && (n[o - 1][at] = t),
                r < i - Oe
                  ? ((t[at] = n[o]), Id(n, Oe + r, t))
                  : (n.push(t), (t[at] = null)),
                (t[se] = n);
              const s = t[Sr];
              null !== s &&
                n !== s &&
                (function lC(e, t) {
                  const n = e[Rn];
                  t[Se] !== t[se][se][Se] && (e[$c] = !0),
                    null === n ? (e[Rn] = [t]) : n.push(t);
                })(s, t);
              const a = t[Ct];
              null !== a && a.insertView(e), (t[R] |= 64);
            })(o, r, s, i);
            const a = ba(i, s),
              u = r[L],
              l = ti(u, s[ko]);
            return (
              null !== l &&
                (function iC(e, t, n, r, o, i) {
                  (r[kt] = o), (r[Ie] = t), Hr(e, r, n, 1, o, i);
                })(o, s[Ie], u, r, l, a),
              t.attachToViewContainerRef(),
              Id(xu(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = fg(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ca(this._lContainer, n);
            r && (Yo(xu(this._lContainer), n), Zd(r[b], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ca(this._lContainer, n);
            return r && null != Yo(xu(this._lContainer), n) ? new zr(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function fg(e) {
        return e[Lo];
      }
      function xu(e) {
        return e[Lo] || (e[Lo] = []);
      }
      function xi(...e) {}
      const Lg = new M("Application Initializer");
      let Pi = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = xi),
              (this.reject = xi),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (_i(i)) n.push(i);
                else if (Fh(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Lg, 8));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const oo = new M("AppId", {
        providedIn: "root",
        factory: function Vg() {
          return `${$u()}${$u()}${$u()}`;
        },
      });
      function $u() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Bg = new M("Platform Initializer"),
        Uu = new M("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Wt = new M("LocaleId", {
          providedIn: "root",
          factory: () =>
            Fn(Wt, N.Optional | N.SkipSelf) ||
            (function ZM() {
              return (typeof $localize < "u" && $localize.locale) || dr;
            })(),
        }),
        tI = (() => Promise.resolve(0))();
      function Gu(e) {
        typeof Zone > "u"
          ? tI.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class xe {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Fe(!1)),
            (this.onMicrotaskEmpty = new Fe(!1)),
            (this.onStable = new Fe(!1)),
            (this.onError = new Fe(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function nI() {
              let e = ee.requestAnimationFrame,
                t = ee.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function iI(e) {
              const t = () => {
                !(function oI(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ee, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Wu(e),
                                (e.isCheckStableRunning = !0),
                                zu(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Wu(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return $g(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Ug(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return $g(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Ug(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Wu(e),
                          zu(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!xe.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (xe.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, rI, xi, xi);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const rI = {};
      function zu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Wu(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function $g(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Ug(e) {
        e._nesting--, zu(e);
      }
      class sI {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Fe()),
            (this.onMicrotaskEmpty = new Fe()),
            (this.onStable = new Fe()),
            (this.onError = new Fe());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Gg = new M(""),
        Oi = new M("");
      let Yu,
        qu = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Yu ||
                  ((function aI(e) {
                    Yu = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      xe.assertNotInAngularZone(),
                        Gu(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Gu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(xe), V(Ku), V(Oi));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ku = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Yu?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const qt = !1;
      let nn = null;
      const zg = new M("AllowMultipleToken"),
        Zu = new M("PlatformDestroyListeners"),
        uI = new M("appBootstrapListener");
      function qg(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new M(r);
        return (i = []) => {
          let s = Xu();
          if (!s || s.injector.get(zg, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function dI(e) {
                  if (nn && !nn.get(zg, !1)) throw new C(400, !1);
                  nn = e;
                  const t = e.get(Yg);
                  (function Wg(e) {
                    const t = e.get(Bg, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Kg(e = [], t) {
                    return en.create({
                      name: t,
                      providers: [
                        { provide: Va, useValue: "platform" },
                        { provide: Zu, useValue: new Set([() => (nn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function hI(e) {
            const t = Xu();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function Xu() {
        return nn?.get(Yg) ?? null;
      }
      let Yg = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Xg(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new sI()
                      : ("zone.js" === e ? void 0 : e) || new xe(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Zg(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: xe, useValue: o }];
            return o.run(() => {
              const s = en.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(Zn, null);
              if (!u) throw new C(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Ri(this._modules, a), l.unsubscribe();
                  });
                }),
                (function Qg(e, t, n) {
                  try {
                    const r = n();
                    return _i(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(Pi);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function Sp(e) {
                          Je(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Ip = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Wt, dr) || dr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Jg({}, r);
            return (function lI(e, t, n) {
              const r = new Su(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Qu);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Zu, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(en));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Jg(e, t) {
        return Array.isArray(t) ? t.reduce(Jg, e) : { ...e, ...t };
      }
      let Qu = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new be((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new be((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    xe.assertNotInAngularZone(),
                      Gu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  xe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function av(...e) {
              const t = bc(e),
                n = (function ev(e, t) {
                  return "number" == typeof Es(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Ft(r[0])
                  : (function ZD(e = 1 / 0) {
                      return Mo(sc, e);
                    })(n)(ws(r, t))
                : wc;
            })(
              i,
              s.pipe(
                (function uv(e = {}) {
                  const {
                    connector: t = () => new _s(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return An((g, v) => {
                      l++, !d && !c && f();
                      const y = (u = u ?? t());
                      v.add(() => {
                        l--, 0 === l && !d && !c && (a = bs(p, o));
                      }),
                        y.subscribe(v),
                        !s &&
                          l > 0 &&
                          ((s = new _r({
                            next: (w) => y.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = bs(h, n, w)), y.error(w);
                            },
                            complete: () => {
                              (c = !0), f(), (a = bs(h, r)), y.complete();
                            },
                          })),
                          Ft(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof xf;
            if (!this._injector.get(Pi).done) {
              !o &&
                (function Mr(e) {
                  const t = q(e) || Me(e) || je(e);
                  return null !== t && t.standalone;
                })(n);
              throw new C(405, qt);
            }
            let s;
            (s = o ? n : this._injector.get(li).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function cI(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(fr),
              l = s.create(en.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(Gg, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Ri(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Ri(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(uI, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Ri(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(xe), V(_n), V(Zn));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Ri(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      class im {
        constructor() {}
        supports(t) {
          return Di(t);
        }
        create(t) {
          return new EI(t);
        }
      }
      const CI = (e, t) => t;
      class EI {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || CI);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < am(r, o, i)) ? n : r,
              a = am(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Di(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function $E(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new wI(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new sm()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new sm()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class wI {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class bI {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class sm {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new bI()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function am(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class um {
        constructor() {}
        supports(t) {
          return t instanceof Map || cu(t);
        }
        create() {
          return new MI();
        }
      }
      class MI {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || cu(t))) throw new C(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new II(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class II {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function lm() {
        return new Vi([new im()]);
      }
      let Vi = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || lm()),
              deps: [[e, new Qo(), new Xo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = U({ token: e, providedIn: "root", factory: lm })), e;
      })();
      function cm() {
        return new io([new um()]);
      }
      let io = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || cm()),
              deps: [[e, new Qo(), new Xo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = U({ token: e, providedIn: "root", factory: cm })), e;
      })();
      const TI = qg(null, "core", []);
      let NI = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(Qu));
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = Dt({})),
            e
          );
        })(),
        ol = null;
      function gr() {
        return ol;
      }
      class PI {}
      const Tt = new M("DocumentToken");
      function _m(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      const pl = /\s+/,
        Cm = [];
      let Em = (() => {
        class e {
          constructor(n, r, o, i) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = i),
              (this.initialClasses = Cm),
              (this.stateMap = new Map());
          }
          set klass(n) {
            this.initialClasses = null != n ? n.trim().split(pl) : Cm;
          }
          set ngClass(n) {
            this.rawClass = "string" == typeof n ? n.trim().split(pl) : n;
          }
          ngDoCheck() {
            for (const r of this.initialClasses) this._updateState(r, !0);
            const n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set)
              for (const r of n) this._updateState(r, !0);
            else if (null != n)
              for (const r of Object.keys(n))
                this._updateState(r, Boolean(n[r]));
            this._applyStateDiff();
          }
          _updateState(n, r) {
            const o = this.stateMap.get(n);
            void 0 !== o
              ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
                (o.touched = !0))
              : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const n of this.stateMap) {
              const r = n[0],
                o = n[1];
              o.changed
                ? (this._toggleClass(r, o.enabled), (o.changed = !1))
                : o.touched ||
                  (o.enabled && this._toggleClass(r, !1),
                  this.stateMap.delete(r)),
                (o.touched = !1);
            }
          }
          _toggleClass(n, r) {
            (n = n.trim()).length > 0 &&
              n.split(pl).forEach((o) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Vi), _(io), _(ct), _(Cn));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          e
        );
      })();
      class vS {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Mm = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new vS(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Im(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              Im(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(At), _(zt), _(Vi));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Im(e, t) {
        e.context.$implicit = t.item;
      }
      let Tm = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngEl = n),
                (this._differs = r),
                (this._renderer = o),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(n) {
              (this._ngStyle = n),
                !this._differ &&
                  n &&
                  (this._differ = this._differs.find(n).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const n = this._differ.diff(this._ngStyle);
                n && this._applyChanges(n);
              }
            }
            _setStyle(n, r) {
              const [o, i] = n.split("."),
                s = -1 === o.indexOf("-") ? void 0 : $e.DashCase;
              null != r
                ? this._renderer.setStyle(
                    this._ngEl.nativeElement,
                    o,
                    i ? `${r}${i}` : r,
                    s
                  )
                : this._renderer.removeStyle(this._ngEl.nativeElement, o, s);
            }
            _applyChanges(n) {
              n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
                n.forEachAddedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                ),
                n.forEachChangedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(ct), _(io), _(Cn));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
              standalone: !0,
            })),
            e
          );
        })(),
        KS = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = Dt({})),
            e
          );
        })();
      class Pm {}
      class MA extends PI {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Cl extends MA {
        static makeCurrent() {
          !(function xI(e) {
            ol || (ol = e);
          })(new Cl());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function IA() {
            return (
              (lo = lo || document.querySelector("base")),
              lo ? lo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function SA(e) {
                (Zi = Zi || document.createElement("a")),
                  Zi.setAttribute("href", e);
                const t = Zi.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          lo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return _m(document.cookie, t);
        }
      }
      let Zi,
        lo = null;
      const Vm = new M("TRANSITION_ID"),
        TA = [
          {
            provide: Lg,
            useFactory: function AA(e, t, n) {
              return () => {
                n.get(Pi).donePromise.then(() => {
                  const r = gr(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Vm, Tt, en],
            multi: !0,
          },
        ];
      let FA = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Xi = new M("EventManagerPlugins");
      let Qi = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Xi), V(xe));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Bm {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = gr().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Hm = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        co = (() => {
          class e extends Hm {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(Tt));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const El = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        wl = /%COMP%/g,
        Um = new M("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function Gm(e, t) {
        return t.flat(100).map((n) => n.replace(wl, e));
      }
      function zm(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let bl = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ml(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Km
                ? o.applyToHost(n)
                : o instanceof Il && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case _t.Emulated:
                  i = new Km(s, a, r, this.appId, u);
                  break;
                case _t.ShadowDom:
                  return new VA(s, a, n, r);
                default:
                  i = new Il(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Qi), V(co), V(oo), V(Um));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ml {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(El[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (qm(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (qm(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = El[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = El[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & ($e.DashCase | $e.Important)
            ? t.style.setProperty(n, r, o & $e.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & $e.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, zm(r))
            : this.eventManager.addEventListener(t, n, zm(r));
        }
      }
      function qm(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class VA extends Ml {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Gm(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Il extends Ml {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = Gm(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Km extends Il {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function RA(e) {
              return "_ngcontent-%COMP%".replace(wl, e);
            })(s)),
            (this.hostAttr = (function kA(e) {
              return "_nghost-%COMP%".replace(wl, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let BA = (() => {
        class e extends Bm {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Tt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ym = ["alt", "control", "meta", "shift"],
        HA = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        jA = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let $A = (() => {
        class e extends Bm {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => gr().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Ym.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = HA[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Ym.forEach((s) => {
                  s !== o && (0, jA[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Tt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const WA = qg(TI, "browser", [
          { provide: Uu, useValue: "browser" },
          {
            provide: Bg,
            useValue: function UA() {
              Cl.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Tt,
            useFactory: function zA() {
              return (
                (function CC(e) {
                  Aa = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Qm = new M(""),
        Jm = [
          {
            provide: Oi,
            useClass: class NA {
              addToWindow(t) {
                (ee.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (ee.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ee.getAllAngularRootElements = () => t.getAllRootElements()),
                  ee.frameworkStabilizers || (ee.frameworkStabilizers = []),
                  ee.frameworkStabilizers.push((r) => {
                    const o = ee.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? gr().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Gg, useClass: qu, deps: [xe, Ku, Oi] },
          { provide: qu, useClass: qu, deps: [xe, Ku, Oi] },
        ],
        ey = [
          { provide: Va, useValue: "root" },
          {
            provide: Zn,
            useFactory: function GA() {
              return new Zn();
            },
            deps: [],
          },
          { provide: Xi, useClass: BA, multi: !0, deps: [Tt, xe, Uu] },
          { provide: Xi, useClass: $A, multi: !0, deps: [Tt] },
          { provide: bl, useClass: bl, deps: [Qi, co, oo, Um] },
          { provide: Of, useExisting: bl },
          { provide: Hm, useExisting: co },
          { provide: co, useClass: co, deps: [Tt] },
          { provide: Qi, useClass: Qi, deps: [Xi, xe] },
          { provide: Pm, useClass: FA, deps: [] },
          [],
        ];
      let qA = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: oo, useValue: n.appId },
                { provide: Vm, useExisting: oo },
                TA,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Qm, 12));
          }),
          (e.ɵmod = Rt({ type: e })),
          (e.ɵinj = Dt({ providers: [...ey, ...Jm], imports: [KS, NI] })),
          e
        );
      })();
      typeof window < "u" && window;
      const { isArray: tT } = Array,
        { getPrototypeOf: nT, prototype: rT, keys: oT } = Object;
      const { isArray: aT } = Array;
      function cT(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function dT(...e) {
        const t = (function JD(e) {
            return ne(Es(e)) ? e.pop() : void 0;
          })(e),
          { args: n, keys: r } = (function iT(e) {
            if (1 === e.length) {
              const t = e[0];
              if (tT(t)) return { args: t, keys: null };
              if (
                (function sT(e) {
                  return e && "object" == typeof e && nT(e) === rT;
                })(t)
              ) {
                const n = oT(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e),
          o = new be((i) => {
            const { length: s } = n;
            if (!s) return void i.complete();
            const a = new Array(s);
            let u = s,
              l = s;
            for (let c = 0; c < s; c++) {
              let d = !1;
              Ft(n[c]).subscribe(
                Tn(
                  i,
                  (f) => {
                    d || ((d = !0), l--), (a[c] = f);
                  },
                  () => u--,
                  void 0,
                  () => {
                    (!u || !d) && (l || i.next(r ? cT(r, a) : a), i.complete());
                  }
                )
              );
            }
          });
        return t
          ? o.pipe(
              (function lT(e) {
                return dn((t) =>
                  (function uT(e, t) {
                    return aT(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(t)
            )
          : o;
      }
      let ry = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Cn), _(ct));
            }),
            (e.ɵdir = x({ type: e })),
            e
          );
        })(),
        In = (() => {
          class e extends ry {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (
                  t ||
                  (t = (function Ae(e) {
                    return xt(() => {
                      const t = e.prototype.constructor,
                        n = t[Ot] || na(t),
                        r = Object.prototype;
                      let o = Object.getPrototypeOf(e.prototype).constructor;
                      for (; o && o !== r; ) {
                        const i = o[Ot] || na(o);
                        if (i && i !== n) return i;
                        o = Object.getPrototypeOf(o);
                      }
                      return (i) => new i();
                    });
                  })(e))
                )(r || e);
              };
            })()),
            (e.ɵdir = x({ type: e, features: [K] })),
            e
          );
        })();
      const Nt = new M("NgValueAccessor"),
        hT = { provide: Nt, useExisting: Q(() => Ji), multi: !0 },
        gT = new M("CompositionEventMode");
      let Ji = (() => {
        class e extends ry {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function pT() {
                  const e = gr() ? gr().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Cn), _(ct), _(gT, 8));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                we("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [re([hT]), K],
          })),
          e
        );
      })();
      const mT = !1;
      function on(e) {
        return (
          null == e ||
          (("string" == typeof e || Array.isArray(e)) && 0 === e.length)
        );
      }
      function iy(e) {
        return null != e && "number" == typeof e.length;
      }
      const Pe = new M("NgValidators"),
        sn = new M("NgAsyncValidators"),
        yT =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Tl {
        static min(t) {
          return (function sy(e) {
            return (t) => {
              if (on(t.value) || on(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n < e
                ? { min: { min: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static max(t) {
          return (function ay(e) {
            return (t) => {
              if (on(t.value) || on(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n > e
                ? { max: { max: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static required(t) {
          return (function uy(e) {
            return on(e.value) ? { required: !0 } : null;
          })(t);
        }
        static requiredTrue(t) {
          return (function ly(e) {
            return !0 === e.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function cy(e) {
            return on(e.value) || yT.test(e.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function dy(e) {
            return (t) =>
              on(t.value) || !iy(t.value)
                ? null
                : t.value.length < e
                ? {
                    minlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function fy(e) {
            return (t) =>
              iy(t.value) && t.value.length > e
                ? {
                    maxlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function hy(e) {
            if (!e) return es;
            let t, n;
            return (
              "string" == typeof e
                ? ((n = ""),
                  "^" !== e.charAt(0) && (n += "^"),
                  (n += e),
                  "$" !== e.charAt(e.length - 1) && (n += "$"),
                  (t = new RegExp(n)))
                : ((n = e.toString()), (t = e)),
              (r) => {
                if (on(r.value)) return null;
                const o = r.value;
                return t.test(o)
                  ? null
                  : { pattern: { requiredPattern: n, actualValue: o } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return vy(t);
        }
        static composeAsync(t) {
          return _y(t);
        }
      }
      function es(e) {
        return null;
      }
      function py(e) {
        return null != e;
      }
      function gy(e) {
        const t = _i(e) ? ws(e) : e;
        if (mT && !Fh(t)) {
          let n = "Expected async validator to return Promise or Observable.";
          throw (
            ("object" == typeof e &&
              (n +=
                " Are you using a synchronous validator where an async validator is expected?"),
            new C(-1101, n))
          );
        }
        return t;
      }
      function my(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function yy(e, t) {
        return t.map((n) => n(e));
      }
      function Dy(e) {
        return e.map((t) =>
          (function DT(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function vy(e) {
        if (!e) return null;
        const t = e.filter(py);
        return 0 == t.length
          ? null
          : function (n) {
              return my(yy(n, t));
            };
      }
      function Nl(e) {
        return null != e ? vy(Dy(e)) : null;
      }
      function _y(e) {
        if (!e) return null;
        const t = e.filter(py);
        return 0 == t.length
          ? null
          : function (n) {
              return dT(yy(n, t).map(gy)).pipe(dn(my));
            };
      }
      function Fl(e) {
        return null != e ? _y(Dy(e)) : null;
      }
      function Cy(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Ey(e) {
        return e._rawValidators;
      }
      function wy(e) {
        return e._rawAsyncValidators;
      }
      function xl(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function ts(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function by(e, t) {
        const n = xl(t);
        return (
          xl(e).forEach((o) => {
            ts(n, o) || n.push(o);
          }),
          n
        );
      }
      function My(e, t) {
        return xl(t).filter((n) => !ts(e, n));
      }
      class Iy {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Nl(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Fl(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class Be extends Iy {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class an extends Iy {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Sy {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let Ay = (() => {
          class e extends Sy {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(an, 2));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  wi("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [K],
            })),
            e
          );
        })(),
        Ty = (() => {
          class e extends Sy {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(Be, 10));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  wi("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [K],
            })),
            e
          );
        })();
      function Ny(e, t) {
        return e ? `with name: '${t}'` : `at index: ${t}`;
      }
      const Rl = !1,
        fo = "VALID",
        rs = "INVALID",
        mr = "PENDING",
        ho = "DISABLED";
      function kl(e) {
        return (os(e) ? e.validators : e) || null;
      }
      function Ll(e, t) {
        return (os(t) ? t.asyncValidators : e) || null;
      }
      function os(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      function Fy(e, t, n) {
        const r = e.controls;
        if (!(t ? Object.keys(r) : r).length)
          throw new C(
            1e3,
            Rl
              ? (function ET(e) {
                  return `\n    There are no form controls registered with this ${
                    e ? "group" : "array"
                  } yet. If you're using ngModel,\n    you may want to check next tick (e.g. use setTimeout).\n  `;
                })(t)
              : ""
          );
        if (!r[n])
          throw new C(
            1001,
            Rl
              ? (function wT(e, t) {
                  return `Cannot find form control ${Ny(e, t)}`;
                })(t, n)
              : ""
          );
      }
      function xy(e, t, n) {
        e._forEachChild((r, o) => {
          if (void 0 === n[o])
            throw new C(
              1002,
              Rl
                ? (function bT(e, t) {
                    return `Must supply a value for form control ${Ny(e, t)}`;
                  })(t, o)
                : ""
            );
        });
      }
      class is {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === fo;
        }
        get invalid() {
          return this.status === rs;
        }
        get pending() {
          return this.status == mr;
        }
        get disabled() {
          return this.status === ho;
        }
        get enabled() {
          return this.status !== ho;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(by(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(by(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(My(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(My(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return ts(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return ts(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = mr),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = ho),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = fo),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === fo || this.status === mr) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? ho : fo;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = mr), (this._hasOwnPendingAsyncValidator = !0);
            const n = gy(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Fe()), (this.statusChanges = new Fe());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? ho
            : this.errors
            ? rs
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(mr)
            ? mr
            : this._anyControlsHaveStatus(rs)
            ? rs
            : fo;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          os(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function MT(e) {
              return Array.isArray(e) ? Nl(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function IT(e) {
              return Array.isArray(e) ? Fl(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class po extends is {
        constructor(t, n, r) {
          super(kl(n), Ll(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          xy(this, !0, t),
            Object.keys(t).forEach((r) => {
              Fy(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      class Py extends po {}
      const yr = new M("CallSetDisabledState", {
          providedIn: "root",
          factory: () => ss,
        }),
        ss = "always";
      function go(e, t, n = ss) {
        Vl(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function AT(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && Oy(e, t);
            });
          })(e, t),
          (function NT(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function TT(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && Oy(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function ST(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function us(e, t, n = !0) {
        const r = () => {};
        t.valueAccessor &&
          (t.valueAccessor.registerOnChange(r),
          t.valueAccessor.registerOnTouched(r)),
          cs(e, t),
          e &&
            (t._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(() => {}));
      }
      function ls(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function Vl(e, t) {
        const n = Ey(e);
        null !== t.validator
          ? e.setValidators(Cy(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = wy(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(Cy(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        ls(t._rawValidators, o), ls(t._rawAsyncValidators, o);
      }
      function cs(e, t) {
        let n = !1;
        if (null !== e) {
          if (null !== t.validator) {
            const o = Ey(e);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== t.validator);
              i.length !== o.length && ((n = !0), e.setValidators(i));
            }
          }
          if (null !== t.asyncValidator) {
            const o = wy(e);
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== t.asyncValidator);
              i.length !== o.length && ((n = !0), e.setAsyncValidators(i));
            }
          }
        }
        const r = () => {};
        return ls(t._rawValidators, r), ls(t._rawAsyncValidators, r), n;
      }
      function Oy(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function Ly(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function Vy(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const yo = class extends is {
        constructor(t = null, n, r) {
          super(kl(n), Ll(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            os(n) &&
              (n.nonNullable || n.initialValueIsDefault) &&
              (this.defaultValue = Vy(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== n.emitViewToModelChange)
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          Ly(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          Ly(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          Vy(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      };
      let Uy = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        zy = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = Dt({})),
            e
          );
        })();
      const Ul = new M("NgModelWithFormControlWarning"),
        GT = { provide: Be, useExisting: Q(() => ds) };
      let ds = (() => {
        class e extends Be {
          constructor(n, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new Fe()),
              this._setValidators(n),
              this._setAsyncValidators(r);
          }
          ngOnChanges(n) {
            this._checkFormPresent(),
              n.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (cs(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(n) {
            const r = this.form.get(n.path);
            return (
              go(r, n, this.callSetDisabledState),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(n),
              r
            );
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            us(n.control || null, n, !1),
              (function OT(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
              })(this.directives, n);
          }
          addFormGroup(n) {
            this._setUpFormContainer(n);
          }
          removeFormGroup(n) {
            this._cleanUpFormContainer(n);
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          addFormArray(n) {
            this._setUpFormContainer(n);
          }
          removeFormArray(n) {
            this._cleanUpFormContainer(n);
          }
          getFormArray(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            this.form.get(n.path).setValue(r);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function ky(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this.directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n) {
            this.form.reset(n), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((n) => {
              const r = n.control,
                o = this.form.get(n.path);
              r !== o &&
                (us(r || null, n),
                ((e) => e instanceof yo)(o) &&
                  (go(o, n, this.callSetDisabledState), (n.control = o)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(n) {
            const r = this.form.get(n.path);
            (function Ry(e, t) {
              Vl(e, t);
            })(r, n),
              r.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(n) {
            if (this.form) {
              const r = this.form.get(n.path);
              r &&
                (function FT(e, t) {
                  return cs(e, t);
                })(r, n) &&
                r.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Vl(this.form, this), this._oldForm && cs(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(Pe, 10), _(sn, 10), _(yr, 8));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (n, r) {
              1 & n &&
                we("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [re([GT]), K, Lt],
          })),
          e
        );
      })();
      const qT = { provide: an, useExisting: Q(() => Wl) };
      let Wl = (() => {
          class e extends an {
            set isDisabled(n) {}
            constructor(n, r, o, i, s) {
              super(),
                (this._ngModelWarningConfig = s),
                (this._added = !1),
                (this.update = new Fe()),
                (this._ngModelWarningSent = !1),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function jl(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Ji
                        ? (n = i)
                        : (function PT(e) {
                            return Object.getPrototypeOf(e.constructor) === In;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              this._added || this._setUpControl(),
                (function Hl(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            get path() {
              return (function as(e, t) {
                return [...t.path, e];
              })(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                (this._added = !0);
            }
          }
          return (
            (e._ngModelWarningSentOnce = !1),
            (e.ɵfac = function (n) {
              return new (n || e)(
                _(Be, 13),
                _(Pe, 10),
                _(sn, 10),
                _(Nt, 10),
                _(Ul, 8)
              );
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [["", "formControlName", ""]],
              inputs: {
                name: ["formControlName", "name"],
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
              },
              outputs: { update: "ngModelChange" },
              features: [re([qT]), K, Lt],
            })),
            e
          );
        })(),
        uN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = Dt({ imports: [zy] })),
            e
          );
        })();
      class aD extends is {
        constructor(t, n, r) {
          super(kl(n), Ll(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[this._adjustIndex(t)];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          let r = this._adjustIndex(t);
          r < 0 && (r = 0),
            this.controls[r] &&
              this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          let o = this._adjustIndex(t);
          o < 0 && (o = 0),
            this.controls[o] &&
              this.controls[o]._registerOnCollectionChange(() => {}),
            this.controls.splice(o, 1),
            n && (this.controls.splice(o, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          xy(this, !1, t),
            t.forEach((r, o) => {
              Fy(this, !1, o),
                this.at(o).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, o) => {
              this.at(o) &&
                this.at(o).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((t) => t.getRawValue());
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _adjustIndex(t) {
          return t < 0 ? t + this.length : t;
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((n) => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(t) {
          return this.at(t) ?? null;
        }
      }
      function uD(e) {
        return (
          !!e &&
          (void 0 !== e.asyncValidators ||
            void 0 !== e.validators ||
            void 0 !== e.updateOn)
        );
      }
      let lN = (() => {
          class e {
            constructor() {
              this.useNonNullable = !1;
            }
            get nonNullable() {
              const n = new e();
              return (n.useNonNullable = !0), n;
            }
            group(n, r = null) {
              const o = this._reduceControls(n);
              let i = {};
              return (
                uD(r)
                  ? (i = r)
                  : null !== r &&
                    ((i.validators = r.validator),
                    (i.asyncValidators = r.asyncValidator)),
                new po(o, i)
              );
            }
            record(n, r = null) {
              const o = this._reduceControls(n);
              return new Py(o, r);
            }
            control(n, r, o) {
              let i = {};
              return this.useNonNullable
                ? (uD(r)
                    ? (i = r)
                    : ((i.validators = r), (i.asyncValidators = o)),
                  new yo(n, { ...i, nonNullable: !0 }))
                : new yo(n, r, o);
            }
            array(n, r, o) {
              const i = n.map((s) => this._createControl(s));
              return new aD(i, r, o);
            }
            _reduceControls(n) {
              const r = {};
              return (
                Object.keys(n).forEach((o) => {
                  r[o] = this._createControl(n[o]);
                }),
                r
              );
            }
            _createControl(n) {
              return n instanceof yo || n instanceof is
                ? n
                : Array.isArray(n)
                ? this.control(
                    n[0],
                    n.length > 1 ? n[1] : null,
                    n.length > 2 ? n[2] : null
                  )
                : this.control(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        cN = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: Ul,
                    useValue: n.warnOnNgModelWithFormControl ?? "always",
                  },
                  { provide: yr, useValue: n.callSetDisabledState ?? ss },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = Dt({ imports: [uN] })),
            e
          );
        })();
      class fs {}
      class Zl {}
      class Yt {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Yt
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new Yt();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Yt
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class pN {
        encodeKey(t) {
          return lD(t);
        }
        encodeValue(t) {
          return lD(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const mN = /%(\d[a-f0-9])/gi,
        yN = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function lD(e) {
        return encodeURIComponent(e).replace(mN, (t, n) => yN[n] ?? t);
      }
      function hs(e) {
        return `${e}`;
      }
      class un {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new pN()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function gN(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        u = n.get(s) || [];
                      u.push(a), n.set(s, u);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(hs) : [hs(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new un({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(hs(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(hs(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class DN {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function cD(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function dD(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function fD(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Do {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function vN(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new Yt()),
            this.context || (this.context = new DN()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new un()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : cD(this.body) ||
              dD(this.body) ||
              fD(this.body) ||
              (function _N(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof un
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || fD(this.body)
            ? null
            : dD(this.body)
            ? this.body.type || null
            : cD(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof un
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let u = t.headers || this.headers,
            l = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (u = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                u
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                l
              )),
            new Do(n, r, i, {
              params: l,
              headers: u,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var ye = (() => (
        ((ye = ye || {})[(ye.Sent = 0)] = "Sent"),
        (ye[(ye.UploadProgress = 1)] = "UploadProgress"),
        (ye[(ye.ResponseHeader = 2)] = "ResponseHeader"),
        (ye[(ye.DownloadProgress = 3)] = "DownloadProgress"),
        (ye[(ye.Response = 4)] = "Response"),
        (ye[(ye.User = 5)] = "User"),
        ye
      ))();
      class Xl {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new Yt()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Ql extends Xl {
        constructor(t = {}) {
          super(t), (this.type = ye.ResponseHeader);
        }
        clone(t = {}) {
          return new Ql({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class ps extends Xl {
        constructor(t = {}) {
          super(t),
            (this.type = ye.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new ps({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class hD extends Xl {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Jl(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let pD = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof Do) i = n;
            else {
              let u, l;
              (u = o.headers instanceof Yt ? o.headers : new Yt(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof un
                      ? o.params
                      : new un({ fromObject: o.params })),
                (i = new Do(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = (function dN(...e) {
              return ws(e, bc(e));
            })(i).pipe(
              (function fN(e, t) {
                return ne(t) ? Mo(e, t, 1) : Mo(e, 1);
              })((u) => this.handler.handle(u))
            );
            if (n instanceof Do || "events" === o.observe) return s;
            const a = s.pipe(
              (function hN(e, t) {
                return An((n, r) => {
                  let o = 0;
                  n.subscribe(Tn(r, (i) => e.call(t, i, o++) && r.next(i)));
                });
              })((u) => u instanceof ps)
            );
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      dn((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      dn((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      dn((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(dn((u) => u.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new un().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Jl(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Jl(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Jl(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(fs));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function gD(e, t) {
        return t(e);
      }
      function CN(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const wN = new M("HTTP_INTERCEPTORS"),
        vo = new M("HTTP_INTERCEPTOR_FNS");
      function bN() {
        let e = null;
        return (t, n) => (
          null === e &&
            (e = (Fn(wN, { optional: !0 }) ?? []).reduceRight(CN, gD)),
          e(t, n)
        );
      }
      let mD = (() => {
        class e extends fs {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null);
          }
          handle(n) {
            if (null === this.chain) {
              const r = Array.from(new Set(this.injector.get(vo)));
              this.chain = r.reduceRight(
                (o, i) =>
                  (function EN(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(o, i, this.injector),
                gD
              );
            }
            return this.chain(n, (r) => this.backend.handle(r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Zl), V(_n));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const AN = /^\)\]\}',?\n/;
      let DD = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new be((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new Yt(o.getAllResponseHeaders()),
                    g =
                      (function TN(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new Ql({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: g,
                    })),
                    s
                  );
                },
                u = () => {
                  let { headers: h, status: p, statusText: g, url: v } = a(),
                    y = null;
                  204 !== p &&
                    (y = typeof o.response > "u" ? o.responseText : o.response),
                    0 === p && (p = y ? 200 : 0);
                  let w = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof y) {
                    const m = y;
                    y = y.replace(AN, "");
                    try {
                      y = "" !== y ? JSON.parse(y) : null;
                    } catch (S) {
                      (y = m), w && ((w = !1), (y = { error: S, text: y }));
                    }
                  }
                  w
                    ? (r.next(
                        new ps({
                          body: y,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: v || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new hD({
                          error: y,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: v || void 0,
                        })
                      );
                },
                l = (h) => {
                  const { url: p } = a(),
                    g = new hD({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(g);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: ye.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: ye.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", u),
                o.addEventListener("error", l),
                o.addEventListener("timeout", l),
                o.addEventListener("abort", l),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: ye.Sent }),
                () => {
                  o.removeEventListener("error", l),
                    o.removeEventListener("abort", l),
                    o.removeEventListener("load", u),
                    o.removeEventListener("timeout", l),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Pm));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ec = new M("XSRF_ENABLED"),
        vD = new M("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        _D = new M("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class CD {}
      let xN = (() => {
        class e {
          constructor(n, r, o) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = _m(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(Tt), V(Uu), V(vD));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function PN(e, t) {
        const n = e.url.toLowerCase();
        if (
          !Fn(ec) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = Fn(CD).getToken(),
          o = Fn(_D);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var fe = (() => (
        ((fe = fe || {})[(fe.Interceptors = 0)] = "Interceptors"),
        (fe[(fe.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (fe[(fe.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (fe[(fe.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (fe[(fe.JsonpSupport = 4)] = "JsonpSupport"),
        (fe[(fe.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        fe
      ))();
      function Dr(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function ON(...e) {
        const t = [
          pD,
          DD,
          mD,
          { provide: fs, useExisting: mD },
          { provide: Zl, useExisting: DD },
          { provide: vo, useValue: PN, multi: !0 },
          { provide: ec, useValue: !0 },
          { provide: CD, useClass: xN },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function zC(e) {
          return { ɵproviders: e };
        })(t);
      }
      const ED = new M("LEGACY_INTERCEPTOR_FN");
      let kN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = Dt({
              providers: [
                ON(
                  Dr(fe.LegacyInterceptors, [
                    { provide: ED, useFactory: bN },
                    { provide: vo, useExisting: ED, multi: !0 },
                  ])
                ),
              ],
            })),
            e
          );
        })(),
        LN = (() => {
          class e {
            constructor(n) {
              this.http = n;
            }
            sendQuery(n) {
              return this.http.post(
                "https://testologia.site/intensive-price",
                n
              );
            }
            getData(n) {
              return this.http.get("https://testologia.site/intensive-data", {
                params: { category: n },
              });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(pD));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function VN(e, t) {
        if (1 & e) {
          const n = gu();
          j(0, "div", 33)(1, "div", 34),
            ot(2, "img", 35),
            $(),
            j(3, "div", 36),
            ae(4),
            $(),
            j(5, "div", 37)(6, "div", 38),
            ot(7, "img", 39),
            j(8, "div"),
            ae(9, "\u041f\u0440\u0438\u0432\u043e\u0434"),
            $(),
            j(10, "div"),
            ae(11),
            $()(),
            j(12, "div", 38),
            ot(13, "img", 40),
            j(14, "div"),
            ae(15, "\u0414\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044c"),
            $(),
            j(16, "div"),
            ae(17),
            $()(),
            j(18, "div", 38),
            ot(19, "img", 41),
            j(20, "div"),
            ae(21, "\u041a\u043e\u043b-\u0432\u043e \u043c\u0435\u0441\u0442"),
            $(),
            j(22, "div"),
            ae(23),
            $()()(),
            j(24, "div", 42)(25, "button", 43),
            we("click", function () {
              const i = Hs(n).$implicit,
                s = kh(),
                a = du(38);
              return js(s.goScroll(a, i));
            }),
            ae(
              26,
              "\u0417\u0410\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c"
            ),
            $()()();
        }
        if (2 & e) {
          const n = t.$implicit;
          Xe(2),
            Ci("src", n.image, Oa),
            Ci("alt", n.name),
            Xe(2),
            Yr(n.name),
            Xe(7),
            Yr(n.gear),
            Xe(6),
            Mi("", n.engine, " \u043b.\u0441."),
            Xe(6),
            Yr(n.places);
        }
      }
      const wD = function (e) {
        return { active: e };
      };
      let BN = (() => {
          class e {
            constructor(n, r) {
              (this.fb = n),
                (this.appService = r),
                (this.priceForm = this.fb.group({
                  name: ["", Tl.required],
                  phone: ["", Tl.required],
                  car: ["", Tl.required],
                })),
                (this.category = "sport");
            }
            ngOnInit() {
              this.appService
                .getData(this.category)
                .subscribe((n) => (this.carsData = n));
            }
            goScroll(n, r) {
              n.scrollIntoView({ behavior: "smooth" }),
                r && this.priceForm.patchValue({ car: r.name });
            }
            onMouseMove(n) {
              this.trans = {
                transform:
                  "translate3d(" +
                  (0.3 * n.clientX) / 8 +
                  "px," +
                  (0.3 * n.clientY) / 8 +
                  "px,0px)",
              };
            }
            toggleCategory(n) {
              (this.category = n), this.ngOnInit();
            }
            onScroll() {
              this.bgPos = {
                backgroundPositionX: "0" + 0.3 * window.scrollY + "px",
              };
            }
            onSubmit() {
              this.priceForm.valid &&
                this.appService.sendQuery(this.priceForm.value).subscribe({
                  next: (n) => {
                    alert(n.message), this.priceForm.reset();
                  },
                  error: (n) => {
                    alert(n.error.message);
                  },
                });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(lN), _(LN));
            }),
            (e.ɵcmp = kc({
              type: e,
              selectors: [["app-root"]],
              hostBindings: function (n, r) {
                1 & n &&
                  we(
                    "mousemove",
                    function (i) {
                      return r.onMouseMove(i);
                    },
                    0,
                    za
                  )(
                    "scroll",
                    function (i) {
                      return r.onScroll(i);
                    },
                    !1,
                    za
                  );
              },
              decls: 60,
              vars: 11,
              consts: [
                [1, "header"],
                [1, "container"],
                [1, "logo"],
                ["src", "/assets/images/logo.png", "alt", "Logo"],
                [1, "menu"],
                [1, "menu-item"],
                ["href", "#"],
                ["href", "#cars"],
                ["href", "#price"],
                [1, "main", 3, "ngStyle"],
                [1, "main-info"],
                [1, "main-title"],
                [1, "main-text"],
                [1, "main-action"],
                ["id", "main-action", 1, "button", 3, "click"],
                ["id", "cars", 1, "car"],
                ["cars", ""],
                [1, "sub-title"],
                [1, "car-toggle"],
                [3, "ngClass", "click"],
                [1, "car-items"],
                ["class", "car-item", 4, "ngFor", "ngForOf"],
                ["id", "price", 1, "price"],
                ["price", ""],
                [1, "price-text"],
                ["action", "#", 1, "price-form", 3, "formGroup"],
                [
                  "placeholder",
                  "\u0412\u0430\u0448\u0435 \u0438\u043c\u044f",
                  "id",
                  "name",
                  "type",
                  "text",
                  "formControlName",
                  "name",
                  1,
                  "price-input",
                ],
                [
                  "placeholder",
                  "\u0412\u0430\u0448 \u0442\u0435\u043b\u0435\u0444\u043e\u043d",
                  "id",
                  "phone",
                  "type",
                  "tel",
                  "formControlName",
                  "phone",
                  1,
                  "price-input",
                ],
                [
                  "placeholder",
                  "\u0410\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0432\u0430\u0441 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442",
                  "id",
                  "car",
                  "type",
                  "text",
                  "formControlName",
                  "car",
                  1,
                  "price-input",
                ],
                [
                  "type",
                  "button",
                  "id",
                  "price-action",
                  1,
                  "button",
                  3,
                  "disabled",
                  "click",
                ],
                [
                  "src",
                  "/assets/images/rolls.png",
                  "alt",
                  "Rolls",
                  1,
                  "price-image",
                  3,
                  "ngStyle",
                ],
                [1, "footer"],
                [1, "rights"],
                [1, "car-item"],
                [1, "car-item-image"],
                [3, "src", "alt"],
                [1, "car-item-title"],
                [1, "car-itm-info"],
                [1, "car-item-point"],
                ["src", "/assets/images/gear.png", "alt", "gear"],
                ["src", "/assets/images/wheel.png", "alt", "wheel"],
                ["src", "/assets/images/belt.png", "alt", "belt"],
                [1, "car-item-action"],
                [1, "button", "car-button", 3, "click"],
              ],
              template: function (n, r) {
                if (1 & n) {
                  const o = gu();
                  j(0, "header", 0)(1, "div", 1)(2, "div", 2),
                    ot(3, "img", 3),
                    $(),
                    j(4, "nav", 4)(5, "ul")(6, "li", 5)(7, "a", 6),
                    ae(8, "\u0413\u043b\u0430\u0432\u043d\u0430\u044f"),
                    $()(),
                    j(9, "li", 5)(10, "a", 7),
                    ae(
                      11,
                      "\u0410\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u0438"
                    ),
                    $()(),
                    j(12, "li", 5)(13, "a", 8),
                    ae(
                      14,
                      "\u0411\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0430\u0432\u0442\u043e"
                    ),
                    $()()()()()(),
                    j(15, "section", 9)(16, "div", 1)(17, "div", 10)(
                      18,
                      "h1",
                      11
                    ),
                    ae(
                      19,
                      "\u0410\u0440\u0435\u043d\u0434\u0430 \u043f\u0440\u0435\u043c\u0438\u0430\u043b\u044c\u043d\u044b\u0445 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u0435\u0439"
                    ),
                    $(),
                    j(20, "div", 12),
                    ae(
                      21,
                      "\u0412 \u043d\u0430\u0448\u0435\u043c \u043a\u043b\u0443\u0431\u0435 \u0438\u043c\u0435\u0435\u0442\u0441\u044f \u0441\u043e\u043b\u0438\u0434\u043d\u0430\u044f \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f \u0441\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u044b\u0445 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u0435\u0439 \u2014 \u043e\u0442 \u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u043d\u044b\u0445 \u0441\u0435\u0440\u0438\u0439\u043d\u044b\u0445 \u043c\u0430\u0448\u0438\u043d \u0434\u043e \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0433\u043e \u0433\u043e\u043d\u043e\u0447\u043d\u043e\u0433\u043e \u044d\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u0430. \u0412\u043e\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u043e\u0439 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c\u044e \u043f\u043e\u0431\u044b\u0432\u0430\u0442\u044c \u0437\u0430 \u0440\u0443\u043b\u0435\u043c \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0439 \u043b\u0435\u0433\u0435\u043d\u0434\u044b \u0438 \u0443\u0437\u043d\u0430\u0442\u044c, \u043d\u0430 \u0447\u0442\u043e \u043e\u043d\u0430 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u0430 \u0437\u0430 \u043f\u0440\u0435\u0434\u0435\u043b\u0430\u043c\u0438 \u0433\u043e\u043d\u043e\u0447\u043d\u043e\u0439 \u0442\u0440\u0430\u0441\u0441\u044b! "
                    ),
                    $(),
                    j(22, "div", 13)(23, "button", 14),
                    we("click", function () {
                      Hs(o);
                      const s = du(26);
                      return js(r.goScroll(s));
                    }),
                    ae(
                      24,
                      "\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u0438"
                    ),
                    $()()()()(),
                    j(25, "section", 15, 16)(27, "div", 1)(28, "h2", 17),
                    ae(
                      29,
                      "\u041d\u0430\u0448 \u0430\u0432\u0442\u043e\u043f\u0430\u0440\u043a"
                    ),
                    $(),
                    j(30, "div", 18)(31, "div", 19),
                    we("click", function () {
                      return r.toggleCategory("sport");
                    }),
                    ae(32, "Sport"),
                    $(),
                    j(33, "div", 19),
                    we("click", function () {
                      return r.toggleCategory("luxury");
                    }),
                    ae(34, "Luxury"),
                    $()(),
                    j(35, "div", 20),
                    (function Ah(e, t, n, r, o, i, s, a) {
                      const u = D(),
                        l = H(),
                        c = e + te,
                        d = l.firstCreatePass
                          ? (function zE(e, t, n, r, o, i, s, a, u) {
                              const l = t.consts,
                                c = Jn(t, e, 4, s || null, Qt(l, a));
                              nu(t, n, c, Qt(l, u)), jo(t, c);
                              const d = (c.tView = tu(
                                2,
                                c,
                                r,
                                o,
                                i,
                                t.directiveRegistry,
                                t.pipeRegistry,
                                null,
                                t.schemas,
                                l
                              ));
                              return (
                                null !== t.queries &&
                                  (t.queries.template(t, c),
                                  (d.queries = t.queries.embeddedTView(c))),
                                c
                              );
                            })(c, l, u, t, n, r, o, i, s)
                          : l.data[c];
                      Et(d, !1);
                      const f = u[L].createComment("");
                      ni(l, u, f, d),
                        Te(f, u),
                        pi(u, (u[c] = uh(f, u, f, d))),
                        Vo(d) && Ja(l, u, d),
                        null != s && eu(u, d, a);
                    })(36, VN, 27, 6, "div", 21),
                    $()()(),
                    j(37, "section", 22, 23)(39, "div", 1)(40, "h2", 17),
                    ae(
                      41,
                      "\u0423\u0437\u043d\u0430\u0442\u044c \u0446\u0435\u043d\u0443 \u0438 \u0437\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c"
                    ),
                    $(),
                    j(42, "div", 24),
                    ae(
                      43,
                      "\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435, \u0438 \u043c\u044b \u043f\u0435\u0440\u0435\u0437\u0432\u043e\u043d\u0438\u043c \u0432\u0430\u043c \u0434\u043b\u044f \u0443\u0442\u043e\u0447\u043d\u0435\u043d\u0438\u044f \u0432\u0441\u0435\u0445 \u0434\u0435\u0442\u0430\u043b\u0435\u0439 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f"
                    ),
                    $(),
                    j(44, "form", 25)(45, "label"),
                    ot(46, "input", 26),
                    $(),
                    j(47, "label"),
                    ot(48, "input", 27),
                    $(),
                    j(49, "label"),
                    ot(50, "input", 28),
                    $(),
                    j(51, "button", 29),
                    we("click", function () {
                      return r.onSubmit();
                    }),
                    ae(
                      52,
                      "\u0423\u0437\u043d\u0430\u0442\u044c \u0446\u0435\u043d\u0443 "
                    ),
                    $()(),
                    ot(53, "img", 30),
                    $()(),
                    j(54, "footer", 31)(55, "div", 1)(56, "div", 2),
                    ot(57, "img", 3),
                    $(),
                    j(58, "div", 32),
                    ae(
                      59,
                      " \xa9 \u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b "
                    ),
                    $()()();
                }
                2 & n &&
                  (Xe(15),
                  Gt("ngStyle", r.bgPos),
                  Xe(16),
                  Gt("ngClass", Tu(7, wD, "sport" === r.category)),
                  Xe(2),
                  Gt("ngClass", Tu(9, wD, "luxury" === r.category)),
                  Xe(3),
                  Gt("ngForOf", r.carsData),
                  Xe(8),
                  Gt("formGroup", r.priceForm),
                  Xe(7),
                  Gt("disabled", !r.priceForm.valid),
                  Xe(2),
                  Gt("ngStyle", r.trans));
              },
              dependencies: [Em, Mm, Tm, Uy, Ji, Ay, Ty, ds, Wl],
              styles: [
                ".container[_ngcontent-%COMP%]{max-width:1200px;margin:0 auto}.button[_ngcontent-%COMP%]{padding:20px;width:334px;height:64px;background:#030305;border:0;box-sizing:border-box;text-align:center;font-weight:700;font-size:16px;letter-spacing:.02em;text-transform:uppercase;color:#fff;transition:background-color .5s}.button[_ngcontent-%COMP%]:hover:not(:disabled){cursor:pointer;background:#575757}.button[_ngcontent-%COMP%]:disabled{cursor:not-allowed;color:gray;background-color:#343434}.sub-title[_ngcontent-%COMP%]{font-weight:700;font-size:60px;color:#030305}.header[_ngcontent-%COMP%]{border-bottom:1px solid #e5e5e5;padding:25px 0}.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{vertical-align:bottom}.menu[_ngcontent-%COMP%]{margin-left:244px}.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;display:flex}.menu-item[_ngcontent-%COMP%]{margin-right:115px}.menu-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:15px;color:#030305;text-decoration:none;border-bottom:2px solid transparent}.menu-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{border-bottom:2px solid black}.main[_ngcontent-%COMP%]{background-image:url(/assets/images/background.png);background-position:center;background-size:cover;padding:104px 0 154px}.main-info[_ngcontent-%COMP%]{max-width:855px}.main-title[_ngcontent-%COMP%]{font-weight:700;font-size:80px;line-height:110%;color:#030305;margin-bottom:40px}.main-text[_ngcontent-%COMP%]{font-size:16px;line-height:130%;color:#030305;margin-bottom:40px;max-width:502px}.car[_ngcontent-%COMP%]{padding:100px 0}.sub-title[_ngcontent-%COMP%]{font-weight:700;font-size:60px;line-height:70px;color:#030305}.car-items[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.car-item[_ngcontent-%COMP%]{max-width:384px;text-align:center;margin-top:40px}.car-item-image[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%]{transform:scale(1.1)}.car-item-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{vertical-align:bottom;transition:all .3s}.car-item-title[_ngcontent-%COMP%]{font-weight:700;font-size:24px;line-height:150%;text-align:center;letter-spacing:.02em;color:#030305;padding:15px 0 17px}.car-itm-info[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.car-item-point[_ngcontent-%COMP%]{width:110px;height:92px;margin:0 7px}.car-item-point[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:11px}.car-item-action[_ngcontent-%COMP%]{margin-top:13px}.car-item-action[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{width:100%;padding:15px;height:54px}.car-item-point[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:nth-child(2){font-weight:700}.price[_ngcontent-%COMP%]{overflow:hidden}.price[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{position:relative;padding-bottom:121px}.price[_ngcontent-%COMP%]   .sub-title[_ngcontent-%COMP%]{margin-bottom:20px}.price-text[_ngcontent-%COMP%]{font-size:16px;line-height:130%;color:#5d5d5f;margin-bottom:60px}.price-form[_ngcontent-%COMP%]{max-width:344px}.price-input[_ngcontent-%COMP%]{padding:22px 18px;width:344px;height:65px;background:#ffffff;border:1px solid #5d5d5f;box-sizing:border-box;font-size:16px;color:#000;outline:none;margin-bottom:15px}.price-input[_ngcontent-%COMP%]::placeholder{color:#5d5d5f}.price[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{width:100%}.price-image[_ngcontent-%COMP%]{position:absolute;bottom:0;left:401px}.footer[_ngcontent-%COMP%]{border-top:1px solid #e5e5e5;padding:25px 0}.footer[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.rights[_ngcontent-%COMP%]{font-size:15px;line-height:18px;color:#030305}.price-input.ng-touched.ng-valid[_ngcontent-%COMP%]{border:1px solid #5d5d5f}.price-input.ng-touched.ng-invalid[_ngcontent-%COMP%]{border:1px solid red}.car-toggle[_ngcontent-%COMP%]{display:flex;width:194px;border:1px solid gray;margin:20px 0}.car-toggle[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:20px;background:white;box-sizing:border-box;text-align:center;font-weight:700;font-size:16px;letter-spacing:.02em;text-transform:uppercase;color:#000;transition:background-color .5s;cursor:pointer}.car-toggle[_ngcontent-%COMP%]   div.active[_ngcontent-%COMP%]{background:#030305;color:#fff}.car[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:wrap}",
              ],
            })),
            e
          );
        })(),
        HN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e, bootstrap: [BN] })),
            (e.ɵinj = Dt({ imports: [qA, cN, kN] })),
            e
          );
        })();
      WA()
        .bootstrapModule(HN)
        .catch((e) => console.error(e));
    },
  },
  (ne) => {
    ne((ne.s = 2));
  },
]);
