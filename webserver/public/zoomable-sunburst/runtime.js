// @observablehq/runtime v4.4.4 Copyright 2019 Observable, Inc.
function e(e, t, n) {
  n = n || {}
  var r = e.ownerDocument,
    i = r.defaultView.CustomEvent
  'function' == typeof i
    ? (i = new i(t, {detail: n}))
    : ((i = r.createEvent('Event')).initEvent(t, !1, !1), (i.detail = n)),
    e.dispatchEvent(i)
}
function t(e) {
  return (
    Array.isArray(e) ||
    e instanceof Int8Array ||
    e instanceof Int16Array ||
    e instanceof Int32Array ||
    e instanceof Uint8Array ||
    e instanceof Uint8ClampedArray ||
    e instanceof Uint16Array ||
    e instanceof Uint32Array ||
    e instanceof Float32Array ||
    e instanceof Float64Array
  )
}
function n(e) {
  return e === (0 | e) + ''
}
function r(e) {
  const t = document.createElement('span')
  return (
    (t.className = 'observablehq--cellname'), (t.textContent = `${e} = `), t
  )
}
const i = Symbol.prototype.toString
function o(e) {
  return i.call(e)
}
const {getOwnPropertySymbols: s, prototype: {hasOwnProperty: a}} = Object,
  {toStringTag: l} = Symbol,
  u = {},
  c = s
function d(e, t) {
  return a.call(e, t)
}
function h(e) {
  return e[l] || (e.constructor && e.constructor.name) || 'Object'
}
function p(e, t) {
  try {
    const n = e[t]
    return n && n.constructor, n
  } catch (e) {
    return u
  }
}
const f = [
  {symbol: '@@__IMMUTABLE_INDEXED__@@', name: 'Indexed', modifier: !0},
  {symbol: '@@__IMMUTABLE_KEYED__@@', name: 'Keyed', modifier: !0},
  {symbol: '@@__IMMUTABLE_LIST__@@', name: 'List', arrayish: !0},
  {symbol: '@@__IMMUTABLE_MAP__@@', name: 'Map'},
  {
    symbol: '@@__IMMUTABLE_ORDERED__@@',
    name: 'Ordered',
    modifier: !0,
    prefix: !0
  },
  {symbol: '@@__IMMUTABLE_RECORD__@@', name: 'Record'},
  {symbol: '@@__IMMUTABLE_SET__@@', name: 'Set', arrayish: !0, setish: !0},
  {symbol: '@@__IMMUTABLE_STACK__@@', name: 'Stack', arrayish: !0}
]
function m(e) {
  try {
    let t = f.filter(({symbol: t}) => !0 === e[t])
    if (!t.length) return
    const n = t.find(e => !e.modifier),
      r = 'Map' === n.name && t.find(e => e.modifier && e.prefix),
      i = t.some(e => e.arrayish),
      o = t.some(e => e.setish)
    return {
      name: `${r ? r.name : ''}${n.name}`,
      symbols: t,
      arrayish: i && !o,
      setish: o
    }
  } catch (e) {
    return null
  }
}
function g(n, i, o) {
  let s,
    a,
    l,
    u,
    c = t(n)
  n instanceof Map
    ? ((s = `Map(${n.size})`), (a = b))
    : n instanceof Set
      ? ((s = `Set(${n.size})`), (a = v))
      : c
        ? ((s = `${n.constructor.name}(${n.length})`), (a = w))
        : (u = m(n))
          ? ((s = `Immutable.${u.name}${
              'Record' === u.name ? '' : `(${n.size})`
            }`),
            (c = u.arrayish),
            (a = u.arrayish ? y : u.setish ? _ : k))
          : ((s = h(n)), (a = x))
  const d = document.createElement('span')
  ;(d.className = 'observablehq--expanded'), o && d.appendChild(r(o))
  const p = d.appendChild(document.createElement('a'))
  ;(p.innerHTML =
    "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M4 7L0 1h8z' fill='currentColor' />\n  </svg>"),
    p.appendChild(document.createTextNode(`${s}${c ? ' [' : ' {'}`)),
    p.addEventListener('mouseup', function(e) {
      e.stopPropagation(), ne(d, N(n, null, o))
    }),
    (a = a(n))
  for (let e = 0; !(l = a.next()).done && e < 20; ++e) d.appendChild(l.value)
  if (!l.done) {
    const t = d.appendChild(document.createElement('a'))
    ;(t.className = 'observablehq--field'),
      (t.style.display = 'block'),
      t.appendChild(document.createTextNode('  … more')),
      t.addEventListener('mouseup', function(t) {
        t.stopPropagation(),
          d.insertBefore(l.value, d.lastChild.previousSibling)
        for (let e = 0; !(l = a.next()).done && e < 19; ++e)
          d.insertBefore(l.value, d.lastChild.previousSibling)
        l.done && d.removeChild(d.lastChild.previousSibling), e(d, 'load')
      })
  }
  return d.appendChild(document.createTextNode(c ? ']' : '}')), d
}
function* b(e) {
  for (const [t, n] of e) yield E(t, n)
  yield* x(e)
}
function* v(e) {
  for (const t of e) yield S(t)
  yield* x(e)
}
function* _(e) {
  for (const t of e) yield S(t)
}
function* w(e) {
  for (let t = 0, n = e.length; t < n; ++t)
    t in e && (yield C(t, p(e, t), 'observablehq--index'))
  for (const t in e)
    !n(t) && d(e, t) && (yield C(t, p(e, t), 'observablehq--key'))
  for (const t of c(e)) yield C(o(t), p(e, t), 'observablehq--symbol')
}
function* y(e) {
  let t = 0
  for (const n = e.size; t < n; ++t) yield C(t, e.get(t), !0)
}
function* x(e) {
  for (const t in e) d(e, t) && (yield C(t, p(e, t), 'observablehq--key'))
  for (const t of c(e)) yield C(o(t), p(e, t), 'observablehq--symbol')
}
function* k(e) {
  for (const [t, n] of e) yield C(t, n, 'observablehq--key')
}
function C(e, t, n) {
  const r = document.createElement('div'),
    i = r.appendChild(document.createElement('span'))
  return (
    (r.className = 'observablehq--field'),
    (i.className = n),
    (i.textContent = `  ${e}`),
    r.appendChild(document.createTextNode(': ')),
    r.appendChild(te(t)),
    r
  )
}
function E(e, t) {
  const n = document.createElement('div')
  return (
    (n.className = 'observablehq--field'),
    n.appendChild(document.createTextNode('  ')),
    n.appendChild(te(e)),
    n.appendChild(document.createTextNode(' => ')),
    n.appendChild(te(t)),
    n
  )
}
function S(e) {
  const t = document.createElement('div')
  return (
    (t.className = 'observablehq--field'),
    t.appendChild(document.createTextNode('  ')),
    t.appendChild(te(e)),
    t
  )
}
function $(e) {
  const t = window.getSelection()
  return (
    'Range' === t.type &&
    (t.containsNode(e, !0) ||
      t.anchorNode.isSelfOrDescendant(e) ||
      t.focusNode.isSelfOrDescendant(e))
  )
}
function N(e, n, i) {
  let o,
    s,
    a,
    l,
    u = t(e)
  if (
    (e instanceof Map
      ? ((o = `Map(${e.size})`), (s = L))
      : e instanceof Set
        ? ((o = `Set(${e.size})`), (s = q))
        : u
          ? ((o = `${e.constructor.name}(${e.length})`), (s = M))
          : (l = m(e))
            ? ((o = `Immutable.${l.name}${
                'Record' === l.name ? '' : `(${e.size})`
              }`),
              (u = l.arrayish),
              (s = l.arrayish ? A : l.setish ? P : T))
            : ((o = h(e)), (s = j)),
    n)
  ) {
    const t = document.createElement('span')
    return (
      (t.className = 'observablehq--shallow'),
      i && t.appendChild(r(i)),
      t.appendChild(document.createTextNode(o)),
      t.addEventListener('mouseup', function(n) {
        $(t) || (n.stopPropagation(), ne(t, N(e)))
      }),
      t
    )
  }
  const c = document.createElement('span')
  ;(c.className = 'observablehq--collapsed'), i && c.appendChild(r(i))
  const d = c.appendChild(document.createElement('a'))
  ;(d.innerHTML =
    "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M7 4L1 8V0z' fill='currentColor' />\n  </svg>"),
    d.appendChild(document.createTextNode(`${o}${u ? ' [' : ' {'}`)),
    c.addEventListener(
      'mouseup',
      function(t) {
        $(c) || (t.stopPropagation(), ne(c, g(e, 0, i)))
      },
      !0
    ),
    (s = s(e))
  for (let e = 0; !(a = s.next()).done && e < 20; ++e)
    e > 0 && c.appendChild(document.createTextNode(', ')),
      c.appendChild(a.value)
  return (
    a.done || c.appendChild(document.createTextNode(', …')),
    c.appendChild(document.createTextNode(u ? ']' : '}')),
    c
  )
}
function* L(e) {
  for (const [t, n] of e) yield R(t, n)
  yield* j(e)
}
function* q(e) {
  for (const t of e) yield te(t, !0)
  yield* j(e)
}
function* P(e) {
  for (const t of e) yield te(t, !0)
}
function* A(e) {
  let t = -1,
    n = 0
  for (const r = e.size; n < r; ++n)
    n > t + 1 && (yield O(n - t - 1)), yield te(e.get(n), !0), (t = n)
  n > t + 1 && (yield O(n - t - 1))
}
function* M(e) {
  let t = -1,
    r = 0
  for (const n = e.length; r < n; ++r)
    r in e &&
      (r > t + 1 && (yield O(r - t - 1)), yield te(p(e, r), !0), (t = r))
  r > t + 1 && (yield O(r - t - 1))
  for (const t in e)
    !n(t) && d(e, t) && (yield U(t, p(e, t), 'observablehq--key'))
  for (const t of c(e)) yield U(o(t), p(e, t), 'observablehq--symbol')
}
function* j(e) {
  for (const t in e) d(e, t) && (yield U(t, p(e, t), 'observablehq--key'))
  for (const t of c(e)) yield U(o(t), p(e, t), 'observablehq--symbol')
}
function* T(e) {
  for (const [t, n] of e) yield U(t, n, 'observablehq--key')
}
function O(e) {
  const t = document.createElement('span')
  return (
    (t.className = 'observablehq--empty'),
    (t.textContent = 1 === e ? 'empty' : `empty × ${e}`),
    t
  )
}
function U(e, t, n) {
  const r = document.createDocumentFragment(),
    i = r.appendChild(document.createElement('span'))
  return (
    (i.className = n),
    (i.textContent = e),
    r.appendChild(document.createTextNode(': ')),
    r.appendChild(te(t, !0)),
    r
  )
}
function R(e, t) {
  const n = document.createDocumentFragment()
  return (
    n.appendChild(te(e, !0)),
    n.appendChild(document.createTextNode(' => ')),
    n.appendChild(te(t, !0)),
    n
  )
}
function z(e, t) {
  var n = e + '',
    r = n.length
  return r < t ? new Array(t - r + 1).join(0) + n : n
}
function D(e) {
  return e < 0 ? '-' + z(-e, 6) : e > 9999 ? '+' + z(e, 6) : z(e, 4)
}
var I = Error.prototype.toString
var F = RegExp.prototype.toString
const B = 20
function H(e) {
  return e.replace(/[\\`\x00-\x09\x0b-\x19]|\${/g, W)
}
function W(e) {
  var t = e.charCodeAt(0)
  switch (t) {
    case 8:
      return '\\b'
    case 9:
      return '\\t'
    case 11:
      return '\\v'
    case 12:
      return '\\f'
    case 13:
      return '\\r'
  }
  return t < 16
    ? '\\x0' + t.toString(16)
    : t < 32 ? '\\x' + t.toString(16) : '\\' + e
}
function V(e, t) {
  for (var n = 0; t.exec(e); ) ++n
  return n
}
var G = Function.prototype.toString,
  K = {prefix: 'async ƒ'},
  Y = {prefix: 'async ƒ*'},
  J = {prefix: 'class'},
  X = {prefix: 'ƒ'},
  Q = {prefix: 'ƒ*'}
function Z(e, t, n) {
  var i = document.createElement('span')
  ;(i.className = 'observablehq--function'), n && i.appendChild(r(n))
  var o = i.appendChild(document.createElement('span'))
  return (
    (o.className = 'observablehq--keyword'),
    (o.textContent = e.prefix),
    i.appendChild(document.createTextNode(t)),
    i
  )
}
const {prototype: {toString: ee}} = Object
function te(e, t, n, i) {
  let s = typeof e
  switch (s) {
    case 'boolean':
    case 'undefined':
      e += ''
      break
    case 'number':
      e = 0 === e && 1 / e < 0 ? '-0' : e + ''
      break
    case 'bigint':
      e += 'n'
      break
    case 'symbol':
      e = o(e)
      break
    case 'function':
      return (function(e, t) {
        var n,
          r,
          i = G.call(e)
        switch (e.constructor && e.constructor.name) {
          case 'AsyncFunction':
            n = K
            break
          case 'AsyncGeneratorFunction':
            n = Y
            break
          case 'GeneratorFunction':
            n = Q
            break
          default:
            n = /^class\b/.test(i) ? J : X
        }
        return n === J
          ? Z(n, '', t)
          : (r = /^(?:async\s*)?(\w+)\s*=>/.exec(i))
            ? Z(n, '(' + r[1] + ')', t)
            : (r = /^(?:async\s*)?\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(i))
              ? Z(
                  n,
                  r[1] ? '(' + r[1].replace(/\s*,\s*/g, ', ') + ')' : '()',
                  t
                )
              : (r = /^(?:async\s*)?function(?:\s*\*)?(?:\s*\w+)?\s*\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(
                  i
                ))
                ? Z(
                    n,
                    r[1] ? '(' + r[1].replace(/\s*,\s*/g, ', ') + ')' : '()',
                    t
                  )
                : Z(n, '(…)', t)
      })(e, i)
    case 'string':
      return (function(e, t, n, i) {
        if (!1 === t) {
          if (V(e, /["\n]/g) <= V(e, /`|\${/g)) {
            const t = document.createElement('span')
            i && t.appendChild(r(i))
            const n = t.appendChild(document.createElement('span'))
            return (
              (n.className = 'observablehq--string'),
              (n.textContent = JSON.stringify(e)),
              t
            )
          }
          const o = e.split('\n')
          if (o.length > B && !n) {
            const n = document.createElement('div')
            i && n.appendChild(r(i))
            const s = n.appendChild(document.createElement('span'))
            ;(s.className = 'observablehq--string'),
              (s.textContent = '`' + H(o.slice(0, B).join('\n')))
            const a = n.appendChild(document.createElement('span')),
              l = o.length - B
            return (
              (a.textContent = `Show ${l} truncated line${l > 1 ? 's' : ''}`),
              (a.className = 'observablehq--string-expand'),
              a.addEventListener('mouseup', function(r) {
                r.stopPropagation(), ne(n, te(e, t, !0, i))
              }),
              n
            )
          }
          const s = document.createElement('span')
          i && s.appendChild(r(i))
          const a = s.appendChild(document.createElement('span'))
          return (
            (a.className = `observablehq--string${
              n ? ' observablehq--expanded' : ''
            }`),
            (a.textContent = '`' + H(e) + '`'),
            s
          )
        }
        const o = document.createElement('span')
        i && o.appendChild(r(i))
        const s = o.appendChild(document.createElement('span'))
        return (
          (s.className = 'observablehq--string'),
          (s.textContent = JSON.stringify(
            e.length > 100 ? `${e.slice(0, 50)}…${e.slice(-49)}` : e
          )),
          o
        )
      })(e, t, n, i)
    default:
      if (null === e) {
        ;(s = null), (e = 'null')
        break
      }
      if (e instanceof Date) {
        ;(s = 'date'),
          (a = e),
          (e = isNaN(a)
            ? 'Invalid Date'
            : (function(e) {
                return (
                  0 === e.getUTCMilliseconds() &&
                  0 === e.getUTCSeconds() &&
                  0 === e.getUTCMinutes() &&
                  0 === e.getUTCHours()
                )
              })(a)
              ? D(a.getUTCFullYear()) +
                '-' +
                z(a.getUTCMonth() + 1, 2) +
                '-' +
                z(a.getUTCDate(), 2)
              : D(a.getFullYear()) +
                '-' +
                z(a.getMonth() + 1, 2) +
                '-' +
                z(a.getDate(), 2) +
                'T' +
                z(a.getHours(), 2) +
                ':' +
                z(a.getMinutes(), 2) +
                (a.getMilliseconds()
                  ? ':' + z(a.getSeconds(), 2) + '.' + z(a.getMilliseconds(), 3)
                  : a.getSeconds() ? ':' + z(a.getSeconds(), 2) : ''))
        break
      }
      if (e === u) {
        ;(s = 'forbidden'), (e = '[forbidden]')
        break
      }
      switch (ee.call(e)) {
        case '[object RegExp]':
          ;(s = 'regexp'),
            (e = (function(e) {
              return F.call(e)
            })(e))
          break
        case '[object Error]':
        case '[object DOMException]':
          ;(s = 'error'),
            (e = (function(e) {
              return e.stack || I.call(e)
            })(e))
          break
        default:
          return (n ? g : N)(e, t, i)
      }
  }
  var a
  const l = document.createElement('span')
  i && l.appendChild(r(i))
  const c = l.appendChild(document.createElement('span'))
  return (c.className = `observablehq--${s}`), (c.textContent = e), l
}
function ne(t, n) {
  t.classList.contains('observablehq--inspect') &&
    n.classList.add('observablehq--inspect'),
    t.parentNode.replaceChild(n, t),
    e(n, 'load')
}
const re = /\s+\(\d+:\d+\)$/m
class ie {
  constructor(e) {
    if (!e) throw new Error('invalid node')
    ;(this._node = e), e.classList.add('observablehq')
  }
  pending() {
    const {_node: e} = this
    e.classList.remove('observablehq--error'),
      e.classList.add('observablehq--running')
  }
  fulfilled(t, n) {
    const {_node: r} = this
    if (
      ((!(t instanceof Element || t instanceof Text) ||
        (t.parentNode && t.parentNode !== r)) &&
        (t = te(
          t,
          !1,
          r.firstChild &&
            r.firstChild.classList &&
            r.firstChild.classList.contains('observablehq--expanded'),
          n
        )).classList.add('observablehq--inspect'),
      r.classList.remove('observablehq--running', 'observablehq--error'),
      r.firstChild !== t)
    )
      if (r.firstChild) {
        for (; r.lastChild !== r.firstChild; ) r.removeChild(r.lastChild)
        r.replaceChild(t, r.firstChild)
      } else r.appendChild(t)
    e(r, 'update')
  }
  rejected(t, n) {
    const {_node: i} = this
    for (
      i.classList.remove('observablehq--running'),
        i.classList.add('observablehq--error');
      i.lastChild;

    )
      i.removeChild(i.lastChild)
    var o = document.createElement('div')
    ;(o.className = 'observablehq--inspect'),
      n && o.appendChild(r(n)),
      o.appendChild(document.createTextNode((t + '').replace(re, ''))),
      i.appendChild(o),
      e(i, 'error', {error: t})
  }
}
function oe(e) {
  return function() {
    return e
  }
}
ie.into = function(e) {
  if ('string' == typeof e && null == (e = document.querySelector(e)))
    throw new Error('container not found')
  return function() {
    return new ie(e.appendChild(document.createElement('div')))
  }
}
var se = {
  math: 'http://www.w3.org/1998/Math/MathML',
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
}
var ae = 0
function le(e) {
  ;(this.id = e), (this.href = window.location.href + '#' + e)
}
le.prototype.toString = function() {
  return 'url(' + this.href + ')'
}
var ue = {
  canvas: function(e, t) {
    var n = document.createElement('canvas')
    return (n.width = e), (n.height = t), n
  },
  context2d: function(e, t, n) {
    null == n && (n = devicePixelRatio)
    var r = document.createElement('canvas')
    ;(r.width = e * n), (r.height = t * n), (r.style.width = e + 'px')
    var i = r.getContext('2d')
    return i.scale(n, n), i
  },
  download: function(e, t = 'untitled', n = 'Save') {
    const r = document.createElement('a'),
      i = r.appendChild(document.createElement('button'))
    async function o() {
      await new Promise(requestAnimationFrame),
        URL.revokeObjectURL(r.href),
        r.removeAttribute('href'),
        (i.textContent = n),
        (i.disabled = !1)
    }
    return (
      (i.textContent = n),
      (r.download = t),
      (r.onclick = async t => {
        if (((i.disabled = !0), r.href)) return o()
        i.textContent = 'Saving…'
        try {
          const t = await ('function' == typeof e ? e() : e)
          ;(i.textContent = 'Download'), (r.href = URL.createObjectURL(t))
        } catch (e) {
          i.textContent = n
        }
        if (t.eventPhase) return o()
        i.disabled = !1
      }),
      r
    )
  },
  element: function(e, t) {
    var n,
      r = (e += ''),
      i = r.indexOf(':')
    i >= 0 && 'xmlns' !== (r = e.slice(0, i)) && (e = e.slice(i + 1))
    var o = se.hasOwnProperty(r)
      ? document.createElementNS(se[r], e)
      : document.createElement(e)
    if (t)
      for (var s in t)
        (i = (r = s).indexOf(':')),
          (n = t[s]),
          i >= 0 && 'xmlns' !== (r = s.slice(0, i)) && (s = s.slice(i + 1)),
          se.hasOwnProperty(r)
            ? o.setAttributeNS(se[r], s, n)
            : o.setAttribute(s, n)
    return o
  },
  input: function(e) {
    var t = document.createElement('input')
    return null != e && (t.type = e), t
  },
  range: function(e, t, n) {
    1 === arguments.length && ((t = e), (e = null))
    var r = document.createElement('input')
    return (
      (r.min = e = null == e ? 0 : +e),
      (r.max = t = null == t ? 1 : +t),
      (r.step = null == n ? 'any' : (n = +n)),
      (r.type = 'range'),
      r
    )
  },
  select: function(e) {
    var t = document.createElement('select')
    return (
      Array.prototype.forEach.call(e, function(e) {
        var n = document.createElement('option')
        ;(n.value = n.textContent = e), t.appendChild(n)
      }),
      t
    )
  },
  svg: function(e, t) {
    var n = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    return (
      n.setAttribute('viewBox', [0, 0, e, t]),
      n.setAttribute('width', e),
      n.setAttribute('height', t),
      n
    )
  },
  text: function(e) {
    return document.createTextNode(e)
  },
  uid: function(e) {
    return new le('O-' + (null == e ? '' : e + '-') + ++ae)
  }
}
var ce = {
  buffer: function(e) {
    return new Promise(function(t, n) {
      var r = new FileReader()
      ;(r.onload = function() {
        t(r.result)
      }),
        (r.onerror = n),
        r.readAsArrayBuffer(e)
    })
  },
  text: function(e) {
    return new Promise(function(t, n) {
      var r = new FileReader()
      ;(r.onload = function() {
        t(r.result)
      }),
        (r.onerror = n),
        r.readAsText(e)
    })
  },
  url: function(e) {
    return new Promise(function(t, n) {
      var r = new FileReader()
      ;(r.onload = function() {
        t(r.result)
      }),
        (r.onerror = n),
        r.readAsDataURL(e)
    })
  }
}
function de() {
  return this
}
function he(e, t) {
  let n = !1
  return {
    [Symbol.iterator]: de,
    next: () => (n ? {done: !0} : ((n = !0), {done: !1, value: e})),
    return: () => ((n = !0), t(e), {done: !0}),
    throw: () => ({done: (n = !0)})
  }
}
function pe(e) {
  let t,
    n,
    r = !1
  const i = e(function(e) {
    n ? (n(e), (n = null)) : (r = !0)
    return (t = e)
  })
  return {
    [Symbol.iterator]: de,
    throw: () => ({done: !0}),
    return: () => (null != i && i(), {done: !0}),
    next: function() {
      return {
        done: !1,
        value: r ? ((r = !1), Promise.resolve(t)) : new Promise(e => (n = e))
      }
    }
  }
}
function fe(e) {
  switch (e.type) {
    case 'range':
    case 'number':
      return e.valueAsNumber
    case 'date':
      return e.valueAsDate
    case 'checkbox':
      return e.checked
    case 'file':
      return e.multiple ? e.files : e.files[0]
    default:
      return e.value
  }
}
var me = {
  disposable: he,
  filter: function*(e, t) {
    for (var n, r = -1; !(n = e.next()).done; )
      t(n.value, ++r) && (yield n.value)
  },
  input: function(e) {
    return pe(function(t) {
      var n = (function(e) {
          switch (e.type) {
            case 'button':
            case 'submit':
            case 'checkbox':
              return 'click'
            case 'file':
              return 'change'
            default:
              return 'input'
          }
        })(e),
        r = fe(e)
      function i() {
        t(fe(e))
      }
      return (
        e.addEventListener(n, i),
        void 0 !== r && t(r),
        function() {
          e.removeEventListener(n, i)
        }
      )
    })
  },
  map: function*(e, t) {
    for (var n, r = -1; !(n = e.next()).done; ) yield t(n.value, ++r)
  },
  observe: pe,
  queue: function(e) {
    let t
    const n = [],
      r = e(function(e) {
        n.push(e), t && (t(n.shift()), (t = null))
        return e
      })
    return {
      [Symbol.iterator]: de,
      throw: () => ({done: !0}),
      return: () => (null != r && r(), {done: !0}),
      next: function() {
        return {
          done: !1,
          value: n.length
            ? Promise.resolve(n.shift())
            : new Promise(e => (t = e))
        }
      }
    }
  },
  range: function*(e, t, n) {
    ;(e = +e),
      (t = +t),
      (n = (i = arguments.length) < 2 ? ((t = e), (e = 0), 1) : i < 3 ? 1 : +n)
    for (var r = -1, i = 0 | Math.max(0, Math.ceil((t - e) / n)); ++r < i; )
      yield e + r * n
  },
  valueAt: function(e, t) {
    if (!(!isFinite((t = +t)) || t < 0 || (t != t) | 0))
      for (var n, r = -1; !(n = e.next()).done; ) if (++r === t) return n.value
  },
  worker: function(e) {
    const t = URL.createObjectURL(new Blob([e], {type: 'text/javascript'})),
      n = new Worker(t)
    return he(n, () => {
      n.terminate(), URL.revokeObjectURL(t)
    })
  }
}
function ge(e, t) {
  return function(n) {
    var r,
      i,
      o,
      s,
      a,
      l,
      u,
      c,
      d = n[0],
      h = [],
      p = null,
      f = -1
    for (a = 1, l = arguments.length; a < l; ++a) {
      if ((r = arguments[a]) instanceof Node)
        (h[++f] = r), (d += '\x3c!--o:' + f + '--\x3e')
      else if (Array.isArray(r)) {
        for (u = 0, c = r.length; u < c; ++u)
          (i = r[u]) instanceof Node
            ? (null === p &&
                ((h[++f] = p = document.createDocumentFragment()),
                (d += '\x3c!--o:' + f + '--\x3e')),
              p.appendChild(i))
            : ((p = null), (d += i))
        p = null
      } else d += r
      d += n[a]
    }
    if (((p = e(d)), ++f > 0)) {
      for (
        o = new Array(f),
          s = document.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null, !1);
        s.nextNode();

      )
        (i = s.currentNode),
          /^o:/.test(i.nodeValue) && (o[+i.nodeValue.slice(2)] = i)
      for (a = 0; a < f; ++a) (i = o[a]) && i.parentNode.replaceChild(h[a], i)
    }
    return 1 === p.childNodes.length
      ? p.removeChild(p.firstChild)
      : 11 === p.nodeType ? ((i = t()).appendChild(p), i) : p
  }
}
var be = ge(
    function(e) {
      var t = document.createElement('template')
      return (t.innerHTML = e.trim()), document.importNode(t.content, !0)
    },
    function() {
      return document.createElement('span')
    }
  ),
  ve = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: Le,
    hr: /^( *[-*_]){3,} *(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
    nptable: Le,
    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
    blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
    table: Le,
    paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
    text: /^[^\n]+/
  }
function _e(e) {
  ;(this.tokens = []),
    (this.tokens.links = {}),
    (this.options = e || Pe.defaults),
    (this.rules = ve.normal),
    this.options.gfm &&
      (this.options.tables ? (this.rules = ve.tables) : (this.rules = ve.gfm))
}
;(ve.bullet = /(?:[*+-]|\d+\.)/),
  (ve.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/),
  (ve.item = Ee(ve.item, 'gm')(/bull/g, ve.bullet)()),
  (ve.list = Ee(ve.list)(/bull/g, ve.bullet)(
    'hr',
    '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))'
  )('def', '\\n+(?=' + ve.def.source + ')')()),
  (ve.blockquote = Ee(ve.blockquote)('def', ve.def)()),
  (ve._tag =
    '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b'),
  (ve.html = Ee(ve.html)('comment', /<!--[\s\S]*?-->/)(
    'closed',
    /<(tag)[\s\S]+?<\/\1>/
  )('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, ve._tag)()),
  (ve.paragraph = Ee(ve.paragraph)('hr', ve.hr)('heading', ve.heading)(
    'lheading',
    ve.lheading
  )('blockquote', ve.blockquote)('tag', '<' + ve._tag)('def', ve.def)()),
  (ve.normal = qe({}, ve)),
  (ve.gfm = qe({}, ve.normal, {
    fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
    paragraph: /^/,
    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
  })),
  (ve.gfm.paragraph = Ee(ve.paragraph)(
    '(?!',
    '(?!' +
      ve.gfm.fences.source.replace('\\1', '\\2') +
      '|' +
      ve.list.source.replace('\\1', '\\3') +
      '|'
  )()),
  (ve.tables = qe({}, ve.gfm, {
    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
  })),
  (_e.rules = ve),
  (_e.lex = function(e, t) {
    return new _e(t).lex(e)
  }),
  (_e.prototype.lex = function(e) {
    return (
      (e = e
        .replace(/\r\n|\r/g, '\n')
        .replace(/\t/g, '    ')
        .replace(/\u00a0/g, ' ')
        .replace(/\u2424/g, '\n')),
      this.token(e, !0)
    )
  }),
  (_e.prototype.token = function(e, t, n) {
    var r, i, o, s, a, l, u, c, d
    for (e = e.replace(/^ +$/gm, ''); e; )
      if (
        ((o = this.rules.newline.exec(e)) &&
          ((e = e.substring(o[0].length)),
          o[0].length > 1 && this.tokens.push({type: 'space'})),
        (o = this.rules.code.exec(e)))
      )
        (e = e.substring(o[0].length)),
          (o = o[0].replace(/^ {4}/gm, '')),
          this.tokens.push({
            type: 'code',
            text: this.options.pedantic ? o : o.replace(/\n+$/, '')
          })
      else if ((o = this.rules.fences.exec(e)))
        (e = e.substring(o[0].length)),
          this.tokens.push({type: 'code', lang: o[2], text: o[3] || ''})
      else if ((o = this.rules.heading.exec(e)))
        (e = e.substring(o[0].length)),
          this.tokens.push({type: 'heading', depth: o[1].length, text: o[2]})
      else if (t && (o = this.rules.nptable.exec(e))) {
        for (
          e = e.substring(o[0].length),
            l = {
              type: 'table',
              header: o[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
              align: o[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              cells: o[3].replace(/\n$/, '').split('\n')
            },
            c = 0;
          c < l.align.length;
          c++
        )
          /^ *-+: *$/.test(l.align[c])
            ? (l.align[c] = 'right')
            : /^ *:-+: *$/.test(l.align[c])
              ? (l.align[c] = 'center')
              : /^ *:-+ *$/.test(l.align[c])
                ? (l.align[c] = 'left')
                : (l.align[c] = null)
        for (c = 0; c < l.cells.length; c++)
          l.cells[c] = l.cells[c].split(/ *\| */)
        this.tokens.push(l)
      } else if ((o = this.rules.lheading.exec(e)))
        (e = e.substring(o[0].length)),
          this.tokens.push({
            type: 'heading',
            depth: '=' === o[2] ? 1 : 2,
            text: o[1]
          })
      else if ((o = this.rules.hr.exec(e)))
        (e = e.substring(o[0].length)), this.tokens.push({type: 'hr'})
      else if ((o = this.rules.blockquote.exec(e)))
        (e = e.substring(o[0].length)),
          this.tokens.push({type: 'blockquote_start'}),
          (o = o[0].replace(/^ *> ?/gm, '')),
          this.token(o, t, !0),
          this.tokens.push({type: 'blockquote_end'})
      else if ((o = this.rules.list.exec(e))) {
        for (
          e = e.substring(o[0].length),
            s = o[2],
            this.tokens.push({type: 'list_start', ordered: s.length > 1}),
            r = !1,
            d = (o = o[0].match(this.rules.item)).length,
            c = 0;
          c < d;
          c++
        )
          (u = (l = o[c]).length),
            ~(l = l.replace(/^ *([*+-]|\d+\.) +/, '')).indexOf('\n ') &&
              ((u -= l.length),
              (l = this.options.pedantic
                ? l.replace(/^ {1,4}/gm, '')
                : l.replace(new RegExp('^ {1,' + u + '}', 'gm'), ''))),
            this.options.smartLists &&
              c !== d - 1 &&
              (s === (a = ve.bullet.exec(o[c + 1])[0]) ||
                (s.length > 1 && a.length > 1) ||
                ((e = o.slice(c + 1).join('\n') + e), (c = d - 1))),
            (i = r || /\n\n(?!\s*$)/.test(l)),
            c !== d - 1 &&
              ((r = '\n' === l.charAt(l.length - 1)), i || (i = r)),
            this.tokens.push({
              type: i ? 'loose_item_start' : 'list_item_start'
            }),
            this.token(l, !1, n),
            this.tokens.push({type: 'list_item_end'})
        this.tokens.push({type: 'list_end'})
      } else if ((o = this.rules.html.exec(e)))
        (e = e.substring(o[0].length)),
          this.tokens.push({
            type: this.options.sanitize ? 'paragraph' : 'html',
            pre:
              !this.options.sanitizer &&
              ('pre' === o[1] || 'script' === o[1] || 'style' === o[1]),
            text: o[0]
          })
      else if (!n && t && (o = this.rules.def.exec(e)))
        (e = e.substring(o[0].length)),
          (this.tokens.links[o[1].toLowerCase()] = {href: o[2], title: o[3]})
      else if (t && (o = this.rules.table.exec(e))) {
        for (
          e = e.substring(o[0].length),
            l = {
              type: 'table',
              header: o[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
              align: o[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              cells: o[3].replace(/(?: *\| *)?\n$/, '').split('\n')
            },
            c = 0;
          c < l.align.length;
          c++
        )
          /^ *-+: *$/.test(l.align[c])
            ? (l.align[c] = 'right')
            : /^ *:-+: *$/.test(l.align[c])
              ? (l.align[c] = 'center')
              : /^ *:-+ *$/.test(l.align[c])
                ? (l.align[c] = 'left')
                : (l.align[c] = null)
        for (c = 0; c < l.cells.length; c++)
          l.cells[c] = l.cells[c]
            .replace(/^ *\| *| *\| *$/g, '')
            .split(/ *\| */)
        this.tokens.push(l)
      } else if (t && (o = this.rules.paragraph.exec(e)))
        (e = e.substring(o[0].length)),
          this.tokens.push({
            type: 'paragraph',
            text:
              '\n' === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1]
          })
      else if ((o = this.rules.text.exec(e)))
        (e = e.substring(o[0].length)),
          this.tokens.push({type: 'text', text: o[0]})
      else if (e) throw new Error('Infinite loop on byte: ' + e.charCodeAt(0))
    return this.tokens
  })
var we = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
  url: Le,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: Le,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
}
function ye(e, t) {
  if (
    ((this.options = t || Pe.defaults),
    (this.links = e),
    (this.rules = we.normal),
    (this.renderer = this.options.renderer || new xe()),
    (this.renderer.options = this.options),
    !this.links)
  )
    throw new Error('Tokens array requires a `links` property.')
  this.options.gfm
    ? this.options.breaks ? (this.rules = we.breaks) : (this.rules = we.gfm)
    : this.options.pedantic && (this.rules = we.pedantic)
}
function xe(e) {
  this.options = e || {}
}
function ke(e) {
  ;(this.tokens = []),
    (this.token = null),
    (this.options = e || Pe.defaults),
    (this.options.renderer = this.options.renderer || new xe()),
    (this.renderer = this.options.renderer),
    (this.renderer.options = this.options)
}
function Ce(e, t) {
  return e
    .replace(t ? /&/g : /&(?!#?\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
function Ee(e, t) {
  return (
    (e = e.source),
    (t = t || ''),
    function n(r, i) {
      return r
        ? ((i = (i = i.source || i).replace(/(^|[^\[])\^/g, '$1')),
          (e = e.replace(r, i)),
          n)
        : new RegExp(e, t)
    }
  )
}
function Se(e, t) {
  return (
    $e[' ' + e] ||
      (/^[^:]+:\/*[^\/]*$/.test(e)
        ? ($e[' ' + e] = e + '/')
        : ($e[' ' + e] = e.replace(/[^\/]*$/, ''))),
    (e = $e[' ' + e]),
    '//' === t.slice(0, 2)
      ? e.replace(/:[\s\S]*/, ':') + t
      : '/' === t.charAt(0) ? e.replace(/(:\/*[^\/]*)[\s\S]*/, '$1') + t : e + t
  )
}
;(we._inside = /(?:\[[^\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/),
  (we._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/),
  (we.link = Ee(we.link)('inside', we._inside)('href', we._href)()),
  (we.reflink = Ee(we.reflink)('inside', we._inside)()),
  (we.normal = qe({}, we)),
  (we.pedantic = qe({}, we.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
  })),
  (we.gfm = qe({}, we.normal, {
    escape: Ee(we.escape)('])', '~|])')(),
    url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
    del: /^~~(?=\S)([\s\S]*?\S)~~/,
    text: Ee(we.text)(']|', '~]|')('|', '|https?://|')()
  })),
  (we.breaks = qe({}, we.gfm, {
    br: Ee(we.br)('{2,}', '*')(),
    text: Ee(we.gfm.text)('{2,}', '*')()
  })),
  (ye.rules = we),
  (ye.output = function(e, t, n) {
    return new ye(t, n).output(e)
  }),
  (ye.prototype.output = function(e) {
    for (var t, n, r, i, o = ''; e; )
      if ((i = this.rules.escape.exec(e)))
        (e = e.substring(i[0].length)), (o += i[1])
      else if ((i = this.rules.autolink.exec(e)))
        (e = e.substring(i[0].length)),
          '@' === i[2]
            ? ((n = Ce(
                ':' === i[1].charAt(6)
                  ? this.mangle(i[1].substring(7))
                  : this.mangle(i[1])
              )),
              (r = this.mangle('mailto:') + n))
            : (r = n = Ce(i[1])),
          (o += this.renderer.link(r, null, n))
      else if (this.inLink || !(i = this.rules.url.exec(e))) {
        if ((i = this.rules.tag.exec(e)))
          !this.inLink && /^<a /i.test(i[0])
            ? (this.inLink = !0)
            : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1),
            (e = e.substring(i[0].length)),
            (o += this.options.sanitize
              ? this.options.sanitizer ? this.options.sanitizer(i[0]) : Ce(i[0])
              : i[0])
        else if ((i = this.rules.link.exec(e)))
          (e = e.substring(i[0].length)),
            (this.inLink = !0),
            (o += this.outputLink(i, {href: i[2], title: i[3]})),
            (this.inLink = !1)
        else if (
          (i = this.rules.reflink.exec(e)) ||
          (i = this.rules.nolink.exec(e))
        ) {
          if (
            ((e = e.substring(i[0].length)),
            (t = (i[2] || i[1]).replace(/\s+/g, ' ')),
            !(t = this.links[t.toLowerCase()]) || !t.href)
          ) {
            ;(o += i[0].charAt(0)), (e = i[0].substring(1) + e)
            continue
          }
          ;(this.inLink = !0), (o += this.outputLink(i, t)), (this.inLink = !1)
        } else if ((i = this.rules.strong.exec(e)))
          (e = e.substring(i[0].length)),
            (o += this.renderer.strong(this.output(i[2] || i[1])))
        else if ((i = this.rules.em.exec(e)))
          (e = e.substring(i[0].length)),
            (o += this.renderer.em(this.output(i[2] || i[1])))
        else if ((i = this.rules.code.exec(e)))
          (e = e.substring(i[0].length)),
            (o += this.renderer.codespan(Ce(i[2].trim(), !0)))
        else if ((i = this.rules.br.exec(e)))
          (e = e.substring(i[0].length)), (o += this.renderer.br())
        else if ((i = this.rules.del.exec(e)))
          (e = e.substring(i[0].length)),
            (o += this.renderer.del(this.output(i[1])))
        else if ((i = this.rules.text.exec(e)))
          (e = e.substring(i[0].length)),
            (o += this.renderer.text(Ce(this.smartypants(i[0]))))
        else if (e) throw new Error('Infinite loop on byte: ' + e.charCodeAt(0))
      } else
        (e = e.substring(i[0].length)),
          (r = n = Ce(i[1])),
          (o += this.renderer.link(r, null, n))
    return o
  }),
  (ye.prototype.outputLink = function(e, t) {
    var n = Ce(t.href),
      r = t.title ? Ce(t.title) : null
    return '!' !== e[0].charAt(0)
      ? this.renderer.link(n, r, this.output(e[1]))
      : this.renderer.image(n, r, Ce(e[1]))
  }),
  (ye.prototype.smartypants = function(e) {
    return this.options.smartypants
      ? e
          .replace(/---/g, '—')
          .replace(/--/g, '–')
          .replace(/(^|[-\u2014\/(\[{"\s])'/g, '$1‘')
          .replace(/'/g, '’')
          .replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, '$1“')
          .replace(/"/g, '”')
          .replace(/\.{3}/g, '…')
      : e
  }),
  (ye.prototype.mangle = function(e) {
    if (!this.options.mangle) return e
    for (var t, n = '', r = e.length, i = 0; i < r; i++)
      (t = e.charCodeAt(i)),
        Math.random() > 0.5 && (t = 'x' + t.toString(16)),
        (n += '&#' + t + ';')
    return n
  }),
  (xe.prototype.code = function(e, t, n) {
    if (this.options.highlight) {
      var r = this.options.highlight(e, t)
      null != r && r !== e && ((n = !0), (e = r))
    }
    return t
      ? '<pre><code class="' +
          this.options.langPrefix +
          Ce(t, !0) +
          '">' +
          (n ? e : Ce(e, !0)) +
          '\n</code></pre>\n'
      : '<pre><code>' + (n ? e : Ce(e, !0)) + '\n</code></pre>'
  }),
  (xe.prototype.blockquote = function(e) {
    return '<blockquote>\n' + e + '</blockquote>\n'
  }),
  (xe.prototype.html = function(e) {
    return e
  }),
  (xe.prototype.heading = function(e, t, n) {
    return (
      '<h' +
      t +
      ' id="' +
      this.options.headerPrefix +
      n.toLowerCase().replace(/[^\w]+/g, '-') +
      '">' +
      e +
      '</h' +
      t +
      '>\n'
    )
  }),
  (xe.prototype.hr = function() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
  }),
  (xe.prototype.list = function(e, t) {
    var n = t ? 'ol' : 'ul'
    return '<' + n + '>\n' + e + '</' + n + '>\n'
  }),
  (xe.prototype.listitem = function(e) {
    return '<li>' + e + '</li>\n'
  }),
  (xe.prototype.paragraph = function(e) {
    return '<p>' + e + '</p>\n'
  }),
  (xe.prototype.table = function(e, t) {
    return (
      '<table>\n<thead>\n' +
      e +
      '</thead>\n<tbody>\n' +
      t +
      '</tbody>\n</table>\n'
    )
  }),
  (xe.prototype.tablerow = function(e) {
    return '<tr>\n' + e + '</tr>\n'
  }),
  (xe.prototype.tablecell = function(e, t) {
    var n = t.header ? 'th' : 'td'
    return (
      (t.align
        ? '<' + n + ' style="text-align:' + t.align + '">'
        : '<' + n + '>') +
      e +
      '</' +
      n +
      '>\n'
    )
  }),
  (xe.prototype.strong = function(e) {
    return '<strong>' + e + '</strong>'
  }),
  (xe.prototype.em = function(e) {
    return '<em>' + e + '</em>'
  }),
  (xe.prototype.codespan = function(e) {
    return '<code>' + e + '</code>'
  }),
  (xe.prototype.br = function() {
    return this.options.xhtml ? '<br/>' : '<br>'
  }),
  (xe.prototype.del = function(e) {
    return '<del>' + e + '</del>'
  }),
  (xe.prototype.link = function(e, t, n) {
    if (this.options.sanitize) {
      try {
        var r = decodeURIComponent(
          (function(e) {
            return e.replace(
              /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
              function(e, t) {
                return 'colon' === (t = t.toLowerCase())
                  ? ':'
                  : '#' === t.charAt(0)
                    ? 'x' === t.charAt(1)
                      ? String.fromCharCode(parseInt(t.substring(2), 16))
                      : String.fromCharCode(+t.substring(1))
                    : ''
              }
            )
          })(e)
        )
          .replace(/[^\w:]/g, '')
          .toLowerCase()
      } catch (e) {
        return n
      }
      if (
        0 === r.indexOf('javascript:') ||
        0 === r.indexOf('vbscript:') ||
        0 === r.indexOf('data:')
      )
        return n
    }
    this.options.baseUrl && !Ne.test(e) && (e = Se(this.options.baseUrl, e))
    var i = '<a href="' + e + '"'
    return t && (i += ' title="' + t + '"'), (i += '>' + n + '</a>')
  }),
  (xe.prototype.image = function(e, t, n) {
    this.options.baseUrl && !Ne.test(e) && (e = Se(this.options.baseUrl, e))
    var r = '<img src="' + e + '" alt="' + n + '"'
    return (
      t && (r += ' title="' + t + '"'), (r += this.options.xhtml ? '/>' : '>')
    )
  }),
  (xe.prototype.text = function(e) {
    return e
  }),
  (ke.parse = function(e, t, n) {
    return new ke(t, n).parse(e)
  }),
  (ke.prototype.parse = function(e) {
    ;(this.inline = new ye(e.links, this.options, this.renderer)),
      (this.tokens = e.reverse())
    for (var t = ''; this.next(); ) t += this.tok()
    return t
  }),
  (ke.prototype.next = function() {
    return (this.token = this.tokens.pop())
  }),
  (ke.prototype.peek = function() {
    return this.tokens[this.tokens.length - 1] || 0
  }),
  (ke.prototype.parseText = function() {
    for (var e = this.token.text; 'text' === this.peek().type; )
      e += '\n' + this.next().text
    return this.inline.output(e)
  }),
  (ke.prototype.tok = function() {
    switch (this.token.type) {
      case 'space':
        return ''
      case 'hr':
        return this.renderer.hr()
      case 'heading':
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          this.token.text
        )
      case 'code':
        return this.renderer.code(
          this.token.text,
          this.token.lang,
          this.token.escaped
        )
      case 'table':
        var e,
          t,
          n,
          r,
          i = '',
          o = ''
        for (n = '', e = 0; e < this.token.header.length; e++)
          ({header: !0, align: this.token.align[e]},
            (n += this.renderer.tablecell(
              this.inline.output(this.token.header[e]),
              {header: !0, align: this.token.align[e]}
            )))
        for (
          i += this.renderer.tablerow(n), e = 0;
          e < this.token.cells.length;
          e++
        ) {
          for (t = this.token.cells[e], n = '', r = 0; r < t.length; r++)
            n += this.renderer.tablecell(this.inline.output(t[r]), {
              header: !1,
              align: this.token.align[r]
            })
          o += this.renderer.tablerow(n)
        }
        return this.renderer.table(i, o)
      case 'blockquote_start':
        for (o = ''; 'blockquote_end' !== this.next().type; ) o += this.tok()
        return this.renderer.blockquote(o)
      case 'list_start':
        o = ''
        for (var s = this.token.ordered; 'list_end' !== this.next().type; )
          o += this.tok()
        return this.renderer.list(o, s)
      case 'list_item_start':
        for (o = ''; 'list_item_end' !== this.next().type; )
          o += 'text' === this.token.type ? this.parseText() : this.tok()
        return this.renderer.listitem(o)
      case 'loose_item_start':
        for (o = ''; 'list_item_end' !== this.next().type; ) o += this.tok()
        return this.renderer.listitem(o)
      case 'html':
        var a =
          this.token.pre || this.options.pedantic
            ? this.token.text
            : this.inline.output(this.token.text)
        return this.renderer.html(a)
      case 'paragraph':
        return this.renderer.paragraph(this.inline.output(this.token.text))
      case 'text':
        return this.renderer.paragraph(this.parseText())
    }
  })
var $e = {},
  Ne = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i
function Le() {}
function qe(e) {
  for (var t, n, r = 1; r < arguments.length; r++)
    for (n in (t = arguments[r]))
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
  return e
}
function Pe(e, t, n) {
  if (n || 'function' == typeof t) {
    n || ((n = t), (t = null))
    var r,
      i,
      o = (t = qe({}, Pe.defaults, t || {})).highlight,
      s = 0
    try {
      r = _e.lex(e, t)
    } catch (e) {
      return n(e)
    }
    i = r.length
    var a = function(e) {
      if (e) return (t.highlight = o), n(e)
      var i
      try {
        i = ke.parse(r, t)
      } catch (t) {
        e = t
      }
      return (t.highlight = o), e ? n(e) : n(null, i)
    }
    if (!o || o.length < 3) return a()
    if ((delete t.highlight, !i)) return a()
    for (; s < r.length; s++)
      !(function(e) {
        'code' !== e.type
          ? --i || a()
          : o(e.text, e.lang, function(t, n) {
              return t
                ? a(t)
                : null == n || n === e.text
                  ? --i || a()
                  : ((e.text = n), (e.escaped = !0), void (--i || a()))
            })
      })(r[s])
  } else
    try {
      return t && (t = qe({}, Pe.defaults, t)), ke.parse(_e.lex(e, t), t)
    } catch (e) {
      if (
        ((e.message +=
          '\nPlease report this to https://github.com/chjj/marked.'),
        (t || Pe.defaults).silent)
      )
        return (
          '<p>An error occurred:</p><pre>' + Ce(e.message + '', !0) + '</pre>'
        )
      throw e
    }
}
;(Le.exec = Le),
  (Pe.options = Pe.setOptions = function(e) {
    return qe(Pe.defaults, e), Pe
  }),
  (Pe.defaults = {
    gfm: !0,
    tables: !0,
    breaks: !1,
    pedantic: !1,
    sanitize: !1,
    sanitizer: null,
    mangle: !0,
    smartLists: !1,
    silent: !1,
    highlight: null,
    langPrefix: 'lang-',
    smartypants: !1,
    headerPrefix: '',
    renderer: new xe(),
    xhtml: !1,
    baseUrl: null
  }),
  (Pe.Parser = ke),
  (Pe.parser = ke.parse),
  (Pe.Renderer = xe),
  (Pe.Lexer = _e),
  (Pe.lexer = _e.lex),
  (Pe.InlineLexer = ye),
  (Pe.inlineLexer = ye.output),
  (Pe.parse = Pe)
const Ae = 'https://cdn.jsdelivr.net/npm/@observablehq/highlight.js@2.0.0/'
function Me(e) {
  return function() {
    return ge(
      function(t) {
        var n = document.createElement('div')
        n.innerHTML = Pe(t, {langPrefix: ''}).trim()
        var r = n.querySelectorAll('pre code[class]')
        return (
          r.length > 0 &&
            e(Ae + 'highlight.min.js').then(function(t) {
              r.forEach(function(n) {
                function r() {
                  t.highlightBlock(n),
                    n.parentNode.classList.add('observablehq--md-pre')
                }
                t.getLanguage(n.className)
                  ? r()
                  : e(Ae + 'async-languages/index.js')
                      .then(r => {
                        if (r.has(n.className))
                          return e(
                            Ae + 'async-languages/' + r.get(n.className)
                          ).then(e => {
                            t.registerLanguage(n.className, e)
                          })
                      })
                      .then(r, r)
              })
            }),
          n
        )
      },
      function() {
        return document.createElement('div')
      }
    )
  }
}
function je(e) {
  let t
  Object.defineProperties(this, {
    generator: {value: pe(e => void (t = e))},
    value: {get: () => e, set: n => t((e = n))}
  }),
    void 0 !== e && t(e)
}
function* Te() {
  for (;;) yield Date.now()
}
var Oe = new Map()
function Ue(e, t) {
  var n
  return (n = Oe.get((e = +e)))
    ? n.then(oe(t))
    : (n = Date.now()) >= e
      ? Promise.resolve(t)
      : (function(e, t) {
          var n = new Promise(function(n) {
            Oe.delete(t)
            var r = t - e
            if (!(r > 0)) throw new Error('invalid time')
            if (r > 2147483647) throw new Error('too long to wait')
            setTimeout(n, r)
          })
          return Oe.set(t, n), n
        })(n, e).then(oe(t))
}
var Re = {
  delay: function(e, t) {
    return new Promise(function(n) {
      setTimeout(function() {
        n(t)
      }, e)
    })
  },
  tick: function(e, t) {
    return Ue(Math.ceil((Date.now() + 1) / e) * e, t)
  },
  when: Ue
}
function ze(e, t) {
  if (/^(\w+:)|\/\//i.test(e)) return e
  if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href
  if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e))
    throw new Error('illegal name')
  return 'https://unpkg.com/' + e
}
const De = new Map(),
  Ie = [],
  Fe = Ie.map,
  Be = Ie.some,
  He = Ie.hasOwnProperty,
  We = 'https://cdn.jsdelivr.net/npm/',
  Ve = /^((?:@[^\/@]+\/)?[^\/@]+)(?:@([^\/]+))?(?:\/(.*))?$/,
  Ge = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/,
  Ke = /\.[^\/]*$/,
  Ye = ['unpkg', 'jsdelivr', 'browser', 'main']
class RequireError extends Error {
  constructor(e) {
    super(e)
  }
}
function Je(e) {
  const t = Ve.exec(e)
  return t && {name: t[1], version: t[2], path: t[3]}
}
function Xe(e) {
  const t = `${We}${e.name}${e.version ? `@${e.version}` : ''}/package.json`
  let n = De.get(t)
  return (
    n ||
      De.set(
        t,
        (n = fetch(t).then(e => {
          if (!e.ok) throw new RequireError('unable to load package.json')
          return e.redirected && !De.has(e.url) && De.set(e.url, n), e.json()
        }))
      ),
    n
  )
}
RequireError.prototype.name = RequireError.name
const Qe = Ze(async function(e, t) {
  if (
    (e.startsWith(We) && (e = e.substring(We.length)), /^(\w+:)|\/\//i.test(e))
  )
    return e
  if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href
  if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e))
    throw new RequireError('illegal name')
  const n = Je(e)
  if (!n) return `${We}${e}`
  if (!n.version && null != t && t.startsWith(We)) {
    const e = await Xe(Je(t.substring(We.length)))
    n.version =
      (e.dependencies && e.dependencies[n.name]) ||
      (e.peerDependencies && e.peerDependencies[n.name])
  }
  if (
    (n.path && !Ke.test(n.path) && (n.path += '.js'),
    n.path && n.version && Ge.test(n.version))
  )
    return `${We}${n.name}@${n.version}/${n.path}`
  const r = await Xe(n)
  return `${We}${r.name}@${r.version}/${n.path ||
    (function(e) {
      for (const t of Ye) {
        const n = e[t]
        if ('string' == typeof n) return Ke.test(n) ? n : `${n}.js`
      }
    })(r) ||
    'index.js'}`
})
function Ze(e) {
  const t = new Map(),
    n = i(null)
  function r(e) {
    if ('string' != typeof e) return e
    let n = t.get(e)
    return (
      n ||
        t.set(
          e,
          (n = new Promise((t, n) => {
            const r = document.createElement('script')
            ;(r.onload = () => {
              try {
                t(Ie.pop()(i(e)))
              } catch (e) {
                n(new RequireError('invalid module'))
              }
              r.remove()
            }),
              (r.onerror = () => {
                n(new RequireError('unable to load module')), r.remove()
              }),
              (r.async = !0),
              (r.src = e),
              (window.define = rt),
              document.head.appendChild(r)
          }))
        ),
      n
    )
  }
  function i(t) {
    return n => Promise.resolve(e(n, t)).then(r)
  }
  function o(e) {
    return arguments.length > 1
      ? Promise.all(Fe.call(arguments, n)).then(et)
      : n(e)
  }
  return (
    (o.alias = function(t) {
      return Ze(
        (n, r) =>
          n in t && ((r = null), 'string' != typeof (n = t[n])) ? n : e(n, r)
      )
    }),
    (o.resolve = e),
    o
  )
}
function et(e) {
  const t = {}
  for (const n of e)
    for (const e in n)
      He.call(n, e) &&
        (null == n[e]
          ? Object.defineProperty(t, e, {get: tt(n, e)})
          : (t[e] = n[e]))
  return t
}
function tt(e, t) {
  return () => e[t]
}
function nt(e) {
  return 'exports' === (e += '') || 'module' === e
}
function rt(e, t, n) {
  const r = arguments.length
  r < 2
    ? ((n = e), (t = []))
    : r < 3 && ((n = t), (t = 'string' == typeof e ? [] : e)),
    Ie.push(
      Be.call(t, nt)
        ? e => {
            const r = {},
              i = {exports: r}
            return Promise.all(
              Fe.call(
                t,
                t => ('exports' === (t += '') ? r : 'module' === t ? i : e(t))
              )
            ).then(e => (n.apply(null, e), i.exports))
          }
        : e =>
            Promise.all(Fe.call(t, e)).then(
              e => ('function' == typeof n ? n.apply(null, e) : n)
            )
    )
}
function it(e) {
  return null == e ? Qe : Ze(e)
}
rt.amd = {}
var ot = ge(
    function(e) {
      var t = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      return (t.innerHTML = e.trim()), t
    },
    function() {
      return document.createElementNS('http://www.w3.org/2000/svg', 'g')
    }
  ),
  st = String.raw
function at(e) {
  return new Promise(function(t, n) {
    var r = document.createElement('link')
    ;(r.rel = 'stylesheet'),
      (r.href = e),
      (r.onerror = n),
      (r.onload = t),
      document.head.appendChild(r)
  })
}
function lt(e) {
  return function() {
    return Promise.all([
      e('@observablehq/katex@0.11.1/dist/katex.min.js'),
      e.resolve('@observablehq/katex@0.11.1/dist/katex.min.css').then(at)
    ]).then(function(e) {
      var t = e[0],
        n = r()
      function r(e) {
        return function() {
          var n = document.createElement('div')
          return (
            t.render(st.apply(String, arguments), n, e),
            n.removeChild(n.firstChild)
          )
        }
      }
      return (n.options = r), (n.block = r({displayMode: !0})), n
    })
  }
}
function ut() {
  return pe(function(e) {
    var t = e(document.body.clientWidth)
    function n() {
      var n = document.body.clientWidth
      n !== t && e((t = n))
    }
    return (
      window.addEventListener('resize', n),
      function() {
        window.removeEventListener('resize', n)
      }
    )
  })
}
function ct(e) {
  const t = it(e)
  Object.defineProperties(this, {
    DOM: {value: ue, writable: !0, enumerable: !0},
    Files: {value: ce, writable: !0, enumerable: !0},
    Generators: {value: me, writable: !0, enumerable: !0},
    html: {value: oe(be), writable: !0, enumerable: !0},
    md: {value: Me(t), writable: !0, enumerable: !0},
    Mutable: {value: oe(je), writable: !0, enumerable: !0},
    now: {value: Te, writable: !0, enumerable: !0},
    Promises: {value: Re, writable: !0, enumerable: !0},
    require: {value: oe(t), writable: !0, enumerable: !0},
    resolve: {value: oe(ze), writable: !0, enumerable: !0},
    svg: {value: oe(ot), writable: !0, enumerable: !0},
    tex: {value: lt(t), writable: !0, enumerable: !0},
    width: {value: ut, writable: !0, enumerable: !0}
  })
}
function dt(e, t) {
  ;(this.message = e + ''), (this.input = t)
}
;(dt.prototype = Object.create(Error.prototype)),
  (dt.prototype.name = 'RuntimeError'),
  (dt.prototype.constructor = dt)
var ht = Array.prototype,
  pt = ht.map,
  ft = ht.forEach
function mt(e) {
  return function() {
    return e
  }
}
function gt(e) {
  return e
}
function bt() {}
var vt = 1,
  _t = 2,
  wt = 3,
  yt = {}
function xt(e, t, n) {
  var r
  null == n && (n = yt),
    Object.defineProperties(this, {
      _observer: {value: n, writable: !0},
      _definition: {value: Et, writable: !0},
      _duplicate: {value: void 0, writable: !0},
      _duplicates: {value: void 0, writable: !0},
      _indegree: {value: NaN, writable: !0},
      _inputs: {value: [], writable: !0},
      _invalidate: {value: bt, writable: !0},
      _module: {value: t},
      _name: {value: null, writable: !0},
      _outputs: {value: new Set(), writable: !0},
      _promise: {value: Promise.resolve(void 0), writable: !0},
      _reachable: {value: n !== yt, writable: !0},
      _rejector: {
        value: ((r = this),
        function(e) {
          if (e === Et) throw new dt(r._name + ' is not defined', r._name)
          throw new dt(r._name + ' could not be resolved', r._name)
        })
      },
      _type: {value: e},
      _value: {value: void 0, writable: !0},
      _version: {value: 0, writable: !0}
    })
}
function kt(e) {
  e._module._runtime._dirty.add(e), e._outputs.add(this)
}
function Ct(e) {
  e._module._runtime._dirty.add(e), e._outputs.delete(this)
}
function Et() {
  throw Et
}
function St(e) {
  return function() {
    throw new dt(e + ' is defined more than once')
  }
}
function $t(e, t, n) {
  var r = this._module._scope,
    i = this._module._runtime
  if (
    (this._inputs.forEach(Ct, this),
    t.forEach(kt, this),
    (this._inputs = t),
    (this._definition = n),
    (this._value = void 0),
    n === bt ? i._variables.delete(this) : i._variables.add(this),
    e == this._name && r.get(e) === this)
  )
    this._outputs.forEach(i._updates.add, i._updates)
  else {
    var o, s
    if (this._name)
      if (this._outputs.size)
        r.delete(this._name),
          ((s = this._module._resolve(this._name))._outputs = this._outputs),
          (this._outputs = new Set()),
          s._outputs.forEach(function(e) {
            e._inputs[e._inputs.indexOf(this)] = s
          }, this),
          s._outputs.forEach(i._updates.add, i._updates),
          i._dirty.add(s).add(this),
          r.set(this._name, s)
      else if ((s = r.get(this._name)) === this) r.delete(this._name)
      else {
        if (s._type !== wt) throw new Error()
        s._duplicates.delete(this),
          (this._duplicate = void 0),
          1 === s._duplicates.size &&
            ((s = s._duplicates.keys().next().value),
            (o = r.get(this._name)),
            (s._outputs = o._outputs),
            (o._outputs = new Set()),
            s._outputs.forEach(function(e) {
              e._inputs[e._inputs.indexOf(o)] = s
            }),
            (s._definition = s._duplicate),
            (s._duplicate = void 0),
            i._dirty.add(o).add(s),
            i._updates.add(s),
            r.set(this._name, s))
      }
    if (this._outputs.size) throw new Error()
    e &&
      ((s = r.get(e))
        ? s._type === wt
          ? ((this._definition = St(e)),
            (this._duplicate = n),
            s._duplicates.add(this))
          : s._type === _t
            ? ((this._outputs = s._outputs),
              (s._outputs = new Set()),
              this._outputs.forEach(function(e) {
                e._inputs[e._inputs.indexOf(s)] = this
              }, this),
              i._dirty.add(s).add(this),
              r.set(e, this))
            : ((s._duplicate = s._definition),
              (this._duplicate = n),
              ((o = new xt(wt, this._module))._name = e),
              (o._definition = this._definition = s._definition = St(e)),
              (o._outputs = s._outputs),
              (s._outputs = new Set()),
              o._outputs.forEach(function(e) {
                e._inputs[e._inputs.indexOf(s)] = o
              }),
              (o._duplicates = new Set([this, s])),
              i._dirty.add(s).add(o),
              i._updates.add(s).add(o),
              r.set(e, o))
        : r.set(e, this)),
      (this._name = e)
  }
  return i._updates.add(this), i._compute(), this
}
function Nt(e) {
  Object.defineProperties(this, {
    _runtime: {value: e},
    _scope: {value: new Map()},
    _source: {value: null, writable: !0}
  })
}
function Lt(e) {
  return e._name
}
Object.defineProperties(xt.prototype, {
  _pending: {
    value: function() {
      this._observer.pending && this._observer.pending()
    },
    writable: !0,
    configurable: !0
  },
  _fulfilled: {
    value: function(e) {
      this._observer.fulfilled && this._observer.fulfilled(e, this._name)
    },
    writable: !0,
    configurable: !0
  },
  _rejected: {
    value: function(e) {
      this._observer.rejected && this._observer.rejected(e, this._name)
    },
    writable: !0,
    configurable: !0
  },
  define: {
    value: function(e, t, n) {
      switch (arguments.length) {
        case 1:
          ;(n = e), (e = t = null)
          break
        case 2:
          ;(n = t), 'string' == typeof e ? (t = null) : ((t = e), (e = null))
      }
      return $t.call(
        this,
        null == e ? null : e + '',
        null == t ? [] : pt.call(t, this._module._resolve, this._module),
        'function' == typeof n ? n : mt(n)
      )
    },
    writable: !0,
    configurable: !0
  },
  delete: {
    value: function() {
      return $t.call(this, null, [], bt)
    },
    writable: !0,
    configurable: !0
  },
  import: {
    value: function(e, t, n) {
      arguments.length < 3 && ((n = t), (t = e))
      return $t.call(this, t + '', [n._resolve(e + '')], gt)
    },
    writable: !0,
    configurable: !0
  }
}),
  Object.defineProperties(Nt.prototype, {
    _copy: {
      value: function(e, t) {
        ;(e._source = this), t.set(this, e)
        for (const [o, s] of this._scope) {
          var n = e._scope.get(o)
          if (!n || n._type !== vt)
            if (s._definition === gt) {
              var r = s._inputs[0],
                i = r._module
              e.import(
                r._name,
                o,
                t.get(i) || (i._source ? i._copy(new Nt(e._runtime), t) : i)
              )
            } else e.define(o, s._inputs.map(Lt), s._definition)
        }
        return e
      },
      writable: !0,
      configurable: !0
    },
    _resolve: {
      value: function(e) {
        var t,
          n = this._scope.get(e)
        if (!n)
          if (((n = new xt(_t, this)), this._runtime._builtin._scope.has(e)))
            n.import(e, this._runtime._builtin)
          else if ('invalidation' === e) n.define(e, Pt)
          else if ('visibility' === e) n.define(e, At)
          else {
            try {
              t = this._runtime._global(e)
            } catch (t) {
              return n.define(
                e,
                ((r = t),
                function() {
                  throw r
                })
              )
            }
            void 0 === t
              ? this._scope.set((n._name = e), n)
              : n.define(e, mt(t))
          }
        var r
        return n
      },
      writable: !0,
      configurable: !0
    },
    redefine: {
      value: function(e) {
        var t = this._scope.get(e)
        if (!t) throw new dt(e + ' is not defined')
        if (t._type === wt) throw new dt(e + ' is defined more than once')
        return t.define.apply(t, arguments)
      },
      writable: !0,
      configurable: !0
    },
    define: {
      value: function() {
        var e = new xt(vt, this)
        return e.define.apply(e, arguments)
      },
      writable: !0,
      configurable: !0
    },
    derive: {
      value: function(e, t) {
        var n = new Nt(this._runtime)
        return (
          (n._source = this),
          ft.call(e, function(e) {
            'object' != typeof e && (e = {name: e + ''}),
              null == e.alias && (e.alias = e.name),
              n.import(e.name, e.alias, t)
          }),
          Promise.resolve().then(() => {
            const e = new Set([this])
            for (const t of e)
              for (const n of t._scope.values())
                if (n._definition === gt) {
                  const t = n._inputs[0]._module,
                    r = t._source || t
                  if (r === this)
                    return void console.warn(
                      'circular module definition; ignoring'
                    )
                  e.add(r)
                }
            this._copy(n, new Map())
          }),
          n
        )
      },
      writable: !0,
      configurable: !0
    },
    import: {
      value: function() {
        var e = new xt(vt, this)
        return e.import.apply(e, arguments)
      },
      writable: !0,
      configurable: !0
    },
    value: {
      value: async function(e) {
        var t = this._scope.get(e)
        if (!t) throw new dt(e + ' is not defined')
        t._observer === yt && ((t._observer = !0), this._runtime._dirty.add(t))
        return await this._runtime._compute(), t._promise
      },
      writable: !0,
      configurable: !0
    },
    variable: {
      value: function(e) {
        return new xt(vt, this, e)
      },
      writable: !0,
      configurable: !0
    }
  })
const qt =
  'function' == typeof requestAnimationFrame
    ? requestAnimationFrame
    : setImmediate
var Pt = {},
  At = {}
function Mt(
  e = new ct(),
  t = function(e) {
    return window[e]
  }
) {
  var n = this.module()
  if (
    (Object.defineProperties(this, {
      _dirty: {value: new Set()},
      _updates: {value: new Set()},
      _computing: {value: null, writable: !0},
      _init: {value: null, writable: !0},
      _modules: {value: new Map()},
      _variables: {value: new Set()},
      _disposed: {value: !1, writable: !0},
      _builtin: {value: n},
      _global: {value: t}
    }),
    e)
  )
    for (var r in e) new xt(_t, n).define(r, [], e[r])
}
function jt(e) {
  const t = new Set(e._inputs)
  for (const n of t) {
    if (n === e) return !0
    n._inputs.forEach(t.add, t)
  }
  return !1
}
function Tt(e) {
  ++e._indegree
}
function Ot(e) {
  --e._indegree
}
function Ut(e) {
  return e._promise.catch(e._rejector)
}
function Rt(e) {
  return new Promise(function(t) {
    e._invalidate = t
  })
}
function zt(e, t) {
  let n,
    r,
    i =
      'function' == typeof IntersectionObserver &&
      t._observer &&
      t._observer._node,
    o = !i,
    s = bt,
    a = bt
  return (
    i &&
      ((r = new IntersectionObserver(
        ([e]) => (o = e.isIntersecting) && ((n = null), s())
      )).observe(i),
      e.then(() => (r.disconnect(), (r = null), a()))),
    function(e) {
      return o
        ? Promise.resolve(e)
        : r
          ? (n || (n = new Promise((e, t) => ((s = e), (a = t)))),
            n.then(() => e))
          : Promise.reject()
    }
  )
}
function Dt(e) {
  e._invalidate(), (e._invalidate = bt), e._pending()
  var t = e._value,
    n = ++e._version,
    r = null,
    i = (e._promise = Promise.all(e._inputs.map(Ut))
      .then(function(i) {
        if (e._version === n) {
          for (var o = 0, s = i.length; o < s; ++o)
            switch (i[o]) {
              case Pt:
                i[o] = r = Rt(e)
                break
              case At:
                r || (r = Rt(e)), (i[o] = zt(r, e))
            }
          return e._definition.apply(t, i)
        }
      })
      .then(function(t) {
        return (function(e) {
          return (
            e && 'function' == typeof e.next && 'function' == typeof e.return
          )
        })(t)
          ? ((r || Rt(e)).then(
              ((o = t),
              function() {
                o.return()
              })
            ),
            (function(e, t, n, r) {
              function i() {
                var n = new Promise(function(e) {
                  e(r.next())
                }).then(function(r) {
                  return r.done
                    ? void 0
                    : Promise.resolve(r.value).then(function(r) {
                        if (e._version === t)
                          return It(e, r, n).then(i), e._fulfilled(r), r
                      })
                })
                n.catch(function(r) {
                  e._version === t && (It(e, void 0, n), e._rejected(r))
                })
              }
              return new Promise(function(e) {
                e(r.next())
              }).then(function(e) {
                if (!e.done) return n.then(i), e.value
              })
            })(e, n, i, t))
          : t
        var o
      }))
  i.then(
    function(t) {
      e._version === n && ((e._value = t), e._fulfilled(t))
    },
    function(t) {
      e._version === n && ((e._value = void 0), e._rejected(t))
    }
  )
}
function It(e, t, n) {
  var r = e._module._runtime
  return (
    (e._value = t),
    (e._promise = n),
    e._outputs.forEach(r._updates.add, r._updates),
    r._compute()
  )
}
function Ft(e, t) {
  e._invalidate(),
    (e._invalidate = bt),
    e._pending(),
    ++e._version,
    (e._indegree = NaN),
    (e._promise = Promise.reject(t)).catch(bt),
    (e._value = void 0),
    e._rejected(t)
}
Object.defineProperties(Mt, {
  load: {
    value: function(e, t, n) {
      if (
        ('function' == typeof t && ((n = t), (t = null)),
        'function' != typeof n)
      )
        throw new Error('invalid observer')
      null == t && (t = new ct())
      const {modules: r, id: i} = e,
        o = new Map(),
        s = new Mt(t),
        a = l(i)
      function l(e) {
        let t = o.get(e)
        return t || o.set(e, (t = s.module())), t
      }
      for (const e of r) {
        const t = l(e.id)
        let r = 0
        for (const i of e.variables)
          i.from
            ? t.import(i.remote, i.name, l(i.from))
            : t === a
              ? t
                  .variable(n(i, r, e.variables))
                  .define(i.name, i.inputs, i.value)
              : t.define(i.name, i.inputs, i.value),
            ++r
      }
      return s
    },
    writable: !0,
    configurable: !0
  }
}),
  Object.defineProperties(Mt.prototype, {
    _compute: {
      value: function() {
        return this._computing || (this._computing = this._computeSoon())
      },
      writable: !0,
      configurable: !0
    },
    _computeSoon: {
      value: function() {
        var e = this
        return new Promise(function(t) {
          qt(function() {
            t(), e._disposed || e._computeNow()
          })
        })
      },
      writable: !0,
      configurable: !0
    },
    _computeNow: {
      value: function() {
        var e,
          t,
          n = []
        ;(e = new Set(this._dirty)).forEach(function(t) {
          t._inputs.forEach(e.add, e)
          const n = (function(e) {
            if (e._observer !== yt) return !0
            var t = new Set(e._outputs)
            for (const e of t) {
              if (e._observer !== yt) return !0
              e._outputs.forEach(t.add, t)
            }
            return !1
          })(t)
          n > t._reachable
            ? this._updates.add(t)
            : n < t._reachable && t._invalidate(),
            (t._reachable = n)
        }, this),
          (e = new Set(this._updates)).forEach(function(t) {
            t._reachable
              ? ((t._indegree = 0), t._outputs.forEach(e.add, e))
              : ((t._indegree = NaN), e.delete(t))
          }),
          (this._computing = null),
          this._updates.clear(),
          this._dirty.clear(),
          e.forEach(function(e) {
            e._outputs.forEach(Tt)
          })
        do {
          for (
            e.forEach(function(e) {
              0 === e._indegree && n.push(e)
            });
            (t = n.pop());

          )
            Dt(t), t._outputs.forEach(r), e.delete(t)
          e.forEach(function(t) {
            jt(t) &&
              (Ft(t, new dt('circular definition')),
              t._outputs.forEach(Ot),
              e.delete(t))
          })
        } while (e.size)
        function r(e) {
          0 == --e._indegree && n.push(e)
        }
      },
      writable: !0,
      configurable: !0
    },
    dispose: {
      value: function() {
        ;(this._computing = Promise.resolve()),
          (this._disposed = !0),
          this._variables.forEach(e => {
            e._invalidate(), (e._version = NaN)
          })
      },
      writable: !0,
      configurable: !0
    },
    module: {
      value: function(e, t = bt) {
        let n
        if (void 0 === e)
          return (n = this._init) ? ((this._init = null), n) : new Nt(this)
        if ((n = this._modules.get(e))) return n
        ;(this._init = n = new Nt(this)), this._modules.set(e, n)
        try {
          e(this, t)
        } finally {
          this._init = null
        }
        return n
      },
      writable: !0,
      configurable: !0
    }
  })
export {ie as Inspector, ct as Library, Mt as Runtime, dt as RuntimeError}
