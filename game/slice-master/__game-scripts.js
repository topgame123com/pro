var SoundButton = pc.createScript('soundButton');
(SoundButton.attributes.add('noSound', { type: 'entity' }),
    (SoundButton.prototype.initialize = function () {}),
    (SoundButton.prototype.onSoundChange = function (t) {
        this.noSound.enabled = t;
    }),
    (SoundButton.prototype.update = function (t) {
        this.noSound.enabled = GameAudio.mute;
    }),
    (SoundButton.prototype.onEnable = function () {
        this.onSoundChange(GameAudio.mute);
    }));
var UiBarMasked = pc.createScript('uiBarMasked');
(UiBarMasked.attributes.add('barImageSize', { type: 'number', default: 100, title: 'barImageSize' }),
    UiBarMasked.attributes.add('barImage', { type: 'entity' }),
    UiBarMasked.attributes.add('progress', { type: 'number', default: 0.5, title: 'progress' }),
    UiBarMasked.attributes.add('horizontal', { type: 'boolean', default: !1, title: 'horizontal' }),
    (UiBarMasked.prototype.initialize = function () {}),
    (UiBarMasked.prototype.update = function (t) {
        (this.progress > 1 ? (this.progress = 1) : this.progress < 0 && (this.progress = 0), this.updateBar());
    }),
    (UiBarMasked.prototype.updateBar = function () {
        var t = this.entity.getLocalPosition(),
            a = this.barImage.getLocalPosition(),
            e = this.barImageSize * (1 - this.progress);
        (this.horizontal ? ((t.x = -e), (a.x = e)) : ((t.y = -e), (a.y = e)), this.entity.setLocalPosition(t), this.barImage.setLocalPosition(a));
    }));
var Uipopup = pc.createScript('uipopup');
(Uipopup.attributes.add('fader', { type: 'entity' }),
    Uipopup.attributes.add('name', { type: 'string', default: 'Popup Name' }),
    (Uipopup.popups = []),
    (Uipopup.STATE_OPENING = 1),
    (Uipopup.STATE_OPENED = 2),
    (Uipopup.STATE_CLOSING = 3),
    (Uipopup.STATE_CLOSED = 4),
    (Uipopup.prototype.initialize = function () {
        (Uipopup.popups.push(this), (this.entity.enabled = !1), (this.state = Uipopup.STATE_CLOSED), (this.tw = null));
    }),
    (Uipopup.open = function (p, t) {
        for (var i, e = 0; e < Uipopup.popups.length; e++) (i = Uipopup.popups[e]).name == p ? i.open() : t && i.close();
    }),
    (Uipopup.isShown = function (p) {
        for (var t, i = 0; i < Uipopup.popups.length; i++) if ((t = Uipopup.popups[i]).name == p) return t.entity.enabled;
    }),
    (Uipopup.close = function (p) {
        for (var t, i = 0; i < Uipopup.popups.length; i++) (t = Uipopup.popups[i]).name == p && t.close();
    }),
    (Uipopup.prototype.open = function () {
        (this.state != Uipopup.STATE_CLOSED && 'Pause' != this.name) ||
            (this.fader && (this.fader.enabled = !0),
            (this.state = Uipopup.STATE_OPENING),
            this.entity.setLocalScale(0, 0, 0),
            (this.entity.enabled = !0),
            this.tw && this.tw.stop(),
            (this.tw = this.entity
                .tween(this.entity.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.3, pc.SineOut)
                .loop(!1)
                .yoyo(!1)
                .start()),
            setTimeout(
                function () {
                    ((this.state = Uipopup.STATE_OPENED), (this.tw = null));
                }.bind(this),
                400
            ));
    }),
    (Uipopup.prototype.close = function () {
        (this.state != Uipopup.STATE_OPENED && this.state != Uipopup.STATE_OPENING) ||
            ((this.state = Uipopup.STATE_CLOSING),
            this.tw && this.tw.stop(),
            (this.tw = this.entity
                .tween(this.entity.getLocalScale())
                .to(new pc.Vec3(0, 0, 0), 0.3, pc.BackIn)
                .loop(!1)
                .yoyo(!1)
                .start()),
            setTimeout(
                function () {
                    if (((this.tw = null), this.fader)) {
                        for (var p, t = !1, i = 0; i < Uipopup.popups.length; i++) ((p = Uipopup.popups[i]).state != Uipopup.STATE_OPENED && p.state != Uipopup.STATE_OPENING) || (p.fader == this.fader && (t = !0));
                        t || (this.fader.enabled = !1);
                    }
                    ((this.state = Uipopup.STATE_CLOSED), (this.entity.enabled = !1));
                }.bind(this),
                400
            ));
    }),
    (Uipopup.prototype.update = function (p) {
        (this.state != Uipopup.STATE_OPENED && this.state != Uipopup.STATE_OPENING) || (this.fader && (this.fader.enabled = !0));
    }));
var TextIcon = pc.createScript('textIcon');
(TextIcon.attributes.add('icon', { type: 'entity' }),
    TextIcon.attributes.add('spacing', { type: 'number', default: 20, title: 'icon spacing' }),
    TextIcon.attributes.add('yspacing', { type: 'number', default: 0, title: 'icon y-spacing' }),
    TextIcon.attributes.add('leftside', { type: 'boolean', default: !0, title: 'left side icon' }),
    TextIcon.attributes.add('lerpTime', { type: 'number', default: 1, title: 'lerp speed' }),
    (TextIcon.prototype.initialize = function () {
        this.leftside ? (this.targX = -(this.spacing + 0.5 * this.entity.element.textWidth)) : (this.targX = this.spacing + 0.5 * this.entity.element.textWidth);
    }),
    (TextIcon.prototype.update = function (t) {
        var e;
        ((e = this.leftside ? -(this.spacing + 0.5 * this.entity.element.textWidth) : this.spacing + 0.5 * this.entity.element.textWidth), 0 == this.spacing && (e = 0), (this.targX = pc.math.lerp(this.targX, e, this.lerpTime * t)), this.icon.setLocalPosition(this.targX, this.yspacing, 0));
    }));
var MusicBut = pc.createScript('musicBut');
(MusicBut.attributes.add('noSound', { type: 'entity' }),
    (MusicBut.prototype.initialize = function () {}),
    (MusicBut.prototype.onSoundChange = function (t) {
        this.noSound.enabled = t;
    }),
    (MusicBut.prototype.update = function (t) {
        this.noSound.enabled = GameAudio.muteMus;
    }),
    (MusicBut.prototype.onEnable = function () {
        this.onSoundChange(GameAudio.muteMus);
    }));
var Mover = pc.createScript('mover');
(Mover.attributes.add('delta', { type: 'vec3' }),
    Mover.attributes.add('time', { type: 'number', default: 1 }),
    Mover.attributes.add('delay', { type: 'number', default: 0 }),
    Mover.attributes.add('loop', { type: 'boolean', default: !0 }),
    Mover.attributes.add('yoyo', { type: 'boolean', default: !0 }),
    Mover.attributes.add('onEnable', { type: 'boolean', default: !1 }),
    Mover.attributes.add('endPos', { type: 'boolean', default: !1 }),
    Mover.attributes.add('easeType', { type: 'string', default: 'SineInOut' }),
    Mover.attributes.add('playSound', { type: 'string', default: '' }),
    (Mover.prototype.initialize = function () {
        var t = this.entity.getLocalPosition().clone();
        (t.add(this.delta), (this.startPos = this.entity.getLocalPosition().clone()), this.endPos && (this.startPos.sub(this.delta), this.entity.setLocalPosition(this.startPos)), this.onEnable ? (this.onEnableCb(), this.on('enable', this.onEnableCb, this)) : (this.playSound && GameAudio.play(this.playSound), this.entity.tween(this.entity.getLocalPosition()).to(t, this.time, pc[this.easeType]).loop(this.loop).yoyo(this.yoyo).delay(this.delay).start()));
    }),
    (Mover.prototype.onEnableCb = function () {
        (this.playSound && GameAudio.play(this.playSound), this.entity.setLocalPosition(this.startPos));
        var t = this.entity.getLocalPosition().clone();
        (t.add(this.delta), this.entity.tween(this.entity.getLocalPosition()).to(t, this.time, pc[this.easeType]).loop(this.loop).yoyo(this.yoyo).delay(this.delay).start());
    }),
    (Mover.prototype.update = function (t) {}));
var ObjectPool = pc.createScript('objectPool');
(ObjectPool.attributes.add('prefabs', { type: 'entity', array: !0 }),
    (ObjectPool.pool = {}),
    (ObjectPool.instantiate = function (o, t, e) {
        var l = ObjectPool.pop(o);
        return (e.addChild(l), l.setPosition(t), (l.enabled = !0), l);
    }),
    (ObjectPool.pop = function (o, t) {
        var e,
            l = ObjectPool.pool[o];
        return l ? (0 === l.pool.length ? (e = l.entity.clone()) : ((e = l.pool.pop()).enabled = !0), e) : (console.log("ObjectPool.pop(): pool for this object doesn't exist - " + o), null);
    }),
    (ObjectPool.push = function (o) {
        var t = ObjectPool.pool[o.name];
        t ? t.entity != o && (t.pool.length < t.maxCount ? (t.pool.push(o), (o.enabled = !1), o.parent && o.parent.removeChild(o)) : o.destroy()) : console.log("ObjectPool.push(): pool for this object doesn't exist - " + o.name);
    }),
    (ObjectPool.setMaxCount = function (o, t) {
        var e = ObjectPool.pool[o];
        e ? (e.maxCount = t) : console.log("ObjectPool.setMaxCount(): pool for this object doesn't exist - " + o);
    }),
    (ObjectPool.setPrefab = function (o, t) {
        ObjectPool.pool[o].entity = t;
    }),
    (ObjectPool.prototype.initialize = function () {
        for (var o, t, e = 0; e < this.prefabs.length; e++) ((t = this.prefabs[e]), ((o = {}).maxCount = 50), (o.entity = t), (o.pool = []), (t.enabled = !1), (ObjectPool.pool[t.name] = o), console.log('ObjectPool.initialize(): entity pooled - ' + t.name));
        (ObjectPool.setMaxCount('Effect3DDrop', 50), ObjectPool.setMaxCount('EffectDrop', 200), ObjectPool.setMaxCount('MsgText', 110), ObjectPool.setMaxCount('Trail1', 25), ObjectPool.setMaxCount('Trail2', 25));
    }));
var Scaler = pc.createScript('scaler');
(Scaler.attributes.add('easeType', { type: 'string', default: 'SineInOut' }),
    Scaler.attributes.add('targetSize', { type: 'number', default: 1.5 }),
    Scaler.attributes.add('time', { type: 'number', default: 1 }),
    Scaler.attributes.add('loop', { type: 'boolean', default: !0 }),
    Scaler.attributes.add('yoyo', { type: 'boolean', default: !0 }),
    Scaler.attributes.add('delay', { type: 'number', default: 0 }),
    Scaler.attributes.add('onEnable', { type: 'boolean', default: !1 }),
    (Scaler.prototype.initialize = function () {
        ((this.startScale = this.entity.getLocalScale().clone()), (this._delay = this.delay), (this.firstStep = !0), (this.tween = null), this.onEnable && (this.onEnableCb(), this.on('enable', this.onEnableCb, this)));
    }),
    (Scaler.prototype.onEnableCb = function () {
        (this.tween && this.tween.stop(), this.entity.setLocalScale(this.startScale), (this._delay = this.delay), (this.firstStep = !0));
    }),
    (Scaler.prototype.update = function (t) {
        (this._delay > 0 || this.firstStep) &&
            ((this.firstStep = !1),
            (this._delay -= t),
            this._delay <= 0 &&
                (this.tween = this.entity
                    .tween(this.entity.getLocalScale())
                    .to(new pc.Vec3(this.targetSize, this.targetSize, this.targetSize), this.time, pc[this.easeType])
                    .loop(this.loop)
                    .yoyo(this.yoyo)
                    .start()));
    }));
var Trail = pc.createScript('trail');
(Trail.attributes.add('trailSprite', { type: 'entity' }),
    Trail.attributes.add('startWidth', { type: 'number', default: 1 }),
    Trail.attributes.add('endWidth', { type: 'number', default: 0 }),
    Trail.attributes.add('timeToNewSegment', { type: 'number', default: 1 }),
    Trail.attributes.add('maxSegments', { type: 'number', default: 10 }),
    (Trail.prototype.initialize = function () {
        ((this.destroyIfShort = !1), (this.trailSprite.enabled = !1), (this.segments = []), (this.segmentsCount = 0), (this.segmentsDist = []), (this.length = 0), (this.time = 0), (this.active = !0), (this.nx = 1), (this.ny = 0), (this.dist = 0), (this.px = 0), (this.py = 0));
    }),
    (Trail.prototype.updateTrail = function (t) {
        if (((this.length = 0), 1 === this.segmentsCount)) this.segments[0].enabled = !1;
        else if (this.segmentsCount > 0) {
            var e = this.entity.getPosition(),
                s = this.segments[0],
                i = 0,
                n = 0,
                h = 0,
                a = 0,
                r = 0,
                o = 0,
                m = this.trailSprite.sprite.sprite.pixelsPerUnit / 64;
            s.setPosition(e);
            for (var l = 1; l < this.segmentsCount; l++) ((o = pc.math.lerp(this.startWidth, this.endWidth, (l + 1) / this.segmentsCount)), (h = (i = (n = this.segments[l]).getPosition()).x - e.x), (a = i.y - e.y), s.setEulerAngles(0, 0, (180 * Math.atan2(a, h)) / Math.PI), (r = Math.sqrt(h * h + a * a)), 1 == l && ((this.nx = h / r), (this.ny = a / r), (this.dist = r), (this.px = e.x), (this.py = e.y)), (this.segmentsDist[l - 1] = r), (this.length += r), s.setLocalScale(r * m * 1.05, o, 1), (e = i), (s = n), l === this.segmentsCount - 1 ? (s.enabled = !1) : (s.enabled = !0));
        }
    }),
    (Trail.prototype.update = function (t) {
        if (!this.active) return 1;
        if (((this.time += t), this.time >= this.timeToNewSegment)) {
            this.time = 0;
            this.entity.getPosition();
            var e = ObjectPool.pop(this.trailSprite.name);
            (e.setPosition(0, 0, -1e3), this.app.root.addChild(e));
            for (var s = this.segmentsCount - 1; s >= 0; s--) this.segments[s + 1] = this.segments[s];
            ((this.segments[0] = e), (e.enabled = !0), this.segmentsCount++, this.segmentsCount > this.maxSegments && ((this.segmentsCount = this.maxSegments), ObjectPool.push(this.segments[this.maxSegments])));
        }
        if ((this.updateTrail(), this.destroyIfShort && this.length <= 0.01)) {
            for (s = 0; s < this.segmentsCount; s++) ObjectPool.push(this.segments[s]);
            this.entity.destroy();
        }
    }),
    (Trail.prototype.flushTrail = function () {
        for (var t = 0; t < this.segmentsCount; t++) ObjectPool.push(this.segments[t]);
        this.segmentsCount = 0;
    }));
var MathUtil = pc.createScript('mathUtil');
((MathUtil.DEG_TO_RAD = Math.PI / 180),
    (MathUtil.RAD_TO_DEG = 180 / Math.PI),
    (MathUtil.shuffleArray = function (t) {
        for (var a = t.length - 1; a > 0; a--) {
            var r = Math.floor(Math.random() * (a + 1)),
                n = t[a];
            ((t[a] = t[r]), (t[r] = n));
        }
    }),
    (MathUtil.addNumbersToArray = function (t, a, r) {
        for (var n = a; n <= r; n++) t.push(n);
    }),
    (MathUtil.irr = function (t, a) {
        return Math.round(t + Math.random() * (a - t));
    }),
    (MathUtil.getRandomInt = function (t) {
        return Math.floor(Math.random() * t);
    }),
    (MathUtil.getRandomElement = function (t) {
        return t[Math.floor(Math.random() * t.length)];
    }),
    (MathUtil.chance = function (t) {
        return Math.random() <= t;
    }),
    (MathUtil.angleDifference = function (t, a) {
        var r, n;
        return (t < 0 && (t += 360), a < 0 && (a += 360), (r = a - t), (n = 360 - a + t), Math.abs(r) > n ? n : r);
    }),
    (MathUtil.choose = function () {
        for (var t = [], a = 0; a < arguments.length; a++) t.push(arguments[a]);
        var r = Math.round(pc.math.random(0, arguments.length - 1));
        return t[r];
    }),
    (MathUtil.createArrayOfIntegers = function (t, a) {
        for (var r = [], n = t; n <= a; n++) r.push(n);
        return r;
    }),
    (MathUtil.prototype.dot = function (t, a) {
        return t.x * a.x + t.y * a.y + t.z * a.z + t.w * a.w;
    }),
    (MathUtil.prototype.quatAngle = function (t, a) {
        var r = this.dot(t, a);
        return t.equals(a) ? 0 : 2 * Math.acos(Math.min(Math.abs(r), 1)) * MathUtil.RAD_TO_DEG;
    }),
    (MathUtil.prototype.rotateTowards = function (t, a, r) {
        return 0 === this.quatAngle(t, a) ? a : new pc.Quat().slerp(t, a, r);
    })); // store.legacy.min.js
!(function (e) {
    if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e();
    else if ('function' == typeof define && define.amd) define([], e);
    else {
        var t;
        ((t = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this), (t.store = e()));
    }
})(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function o(u, a) {
            if (!n[u]) {
                if (!t[u]) {
                    var c = 'function' == typeof require && require;
                    if (!a && c) return c(u, !0);
                    if (i) return i(u, !0);
                    var f = new Error("Cannot find module '" + u + "'");
                    throw ((f.code = 'MODULE_NOT_FOUND'), f);
                }
                var s = (n[u] = { exports: {} });
                t[u][0].call(
                    s.exports,
                    function (e) {
                        var n = t[u][1][e];
                        return o(n ? n : e);
                    },
                    s,
                    s.exports,
                    e,
                    t,
                    n,
                    r
                );
            }
            return n[u].exports;
        }
        for (var i = 'function' == typeof require && require, u = 0; u < r.length; u++) o(r[u]);
        return o;
    })(
        {
            1: [
                function (e, t, n) {
                    'use strict';
                    var r = e('../src/store-engine'),
                        o = e('../storages/all'),
                        i = [e('../plugins/json2')];
                    t.exports = r.createStore(o, i);
                },
                { '../plugins/json2': 2, '../src/store-engine': 4, '../storages/all': 6 },
            ],
            2: [
                function (e, t, n) {
                    'use strict';
                    function r() {
                        return (e('./lib/json2'), {});
                    }
                    t.exports = r;
                },
                { './lib/json2': 3 },
            ],
            3: [
                function (require, module, exports) {
                    'use strict';
                    var _typeof =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (e) {
                                  return typeof e;
                              }
                            : function (e) {
                                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
                              };
                    ('object' !== ('undefined' == typeof JSON ? 'undefined' : _typeof(JSON)) && (JSON = {}),
                        (function () {
                            function f(e) {
                                return e < 10 ? '0' + e : e;
                            }
                            function this_value() {
                                return this.valueOf();
                            }
                            function quote(e) {
                                return (
                                    (rx_escapable.lastIndex = 0),
                                    rx_escapable.test(e)
                                        ? '"' +
                                          e.replace(rx_escapable, function (e) {
                                              var t = meta[e];
                                              return 'string' == typeof t ? t : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
                                          }) +
                                          '"'
                                        : '"' + e + '"'
                                );
                            }
                            function str(e, t) {
                                var n,
                                    r,
                                    o,
                                    i,
                                    u,
                                    a = gap,
                                    c = t[e];
                                switch ((c && 'object' === ('undefined' == typeof c ? 'undefined' : _typeof(c)) && 'function' == typeof c.toJSON && (c = c.toJSON(e)), 'function' == typeof rep && (c = rep.call(t, e, c)), 'undefined' == typeof c ? 'undefined' : _typeof(c))) {
                                    case 'string':
                                        return quote(c);
                                    case 'number':
                                        return isFinite(c) ? String(c) : 'null';
                                    case 'boolean':
                                    case 'null':
                                        return String(c);
                                    case 'object':
                                        if (!c) return 'null';
                                        if (((gap += indent), (u = []), '[object Array]' === Object.prototype.toString.apply(c))) {
                                            for (i = c.length, n = 0; n < i; n += 1) u[n] = str(n, c) || 'null';
                                            return ((o = 0 === u.length ? '[]' : gap ? '[\n' + gap + u.join(',\n' + gap) + '\n' + a + ']' : '[' + u.join(',') + ']'), (gap = a), o);
                                        }
                                        if (rep && 'object' === ('undefined' == typeof rep ? 'undefined' : _typeof(rep))) for (i = rep.length, n = 0; n < i; n += 1) 'string' == typeof rep[n] && ((r = rep[n]), (o = str(r, c)), o && u.push(quote(r) + (gap ? ': ' : ':') + o));
                                        else for (r in c) Object.prototype.hasOwnProperty.call(c, r) && ((o = str(r, c)), o && u.push(quote(r) + (gap ? ': ' : ':') + o));
                                        return ((o = 0 === u.length ? '{}' : gap ? '{\n' + gap + u.join(',\n' + gap) + '\n' + a + '}' : '{' + u.join(',') + '}'), (gap = a), o);
                                }
                            }
                            var rx_one = /^[\],:{}\s]*$/,
                                rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                                rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                                rx_four = /(?:^|:|,)(?:\s*\[)+/g,
                                rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                                rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                            'function' != typeof Date.prototype.toJSON &&
                                ((Date.prototype.toJSON = function () {
                                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
                                }),
                                (Boolean.prototype.toJSON = this_value),
                                (Number.prototype.toJSON = this_value),
                                (String.prototype.toJSON = this_value));
                            var gap, indent, meta, rep;
                            ('function' != typeof JSON.stringify &&
                                ((meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }),
                                (JSON.stringify = function (e, t, n) {
                                    var r;
                                    if (((gap = ''), (indent = ''), 'number' == typeof n)) for (r = 0; r < n; r += 1) indent += ' ';
                                    else 'string' == typeof n && (indent = n);
                                    if (((rep = t), t && 'function' != typeof t && ('object' !== ('undefined' == typeof t ? 'undefined' : _typeof(t)) || 'number' != typeof t.length))) throw new Error('JSON.stringify');
                                    return str('', { '': e });
                                })),
                                'function' != typeof JSON.parse &&
                                    (JSON.parse = function (text, reviver) {
                                        function walk(e, t) {
                                            var n,
                                                r,
                                                o = e[t];
                                            if (o && 'object' === ('undefined' == typeof o ? 'undefined' : _typeof(o))) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && ((r = walk(o, n)), void 0 !== r ? (o[n] = r) : delete o[n]);
                                            return reviver.call(e, t, o);
                                        }
                                        var j;
                                        if (
                                            ((text = String(text)),
                                            (rx_dangerous.lastIndex = 0),
                                            rx_dangerous.test(text) &&
                                                (text = text.replace(rx_dangerous, function (e) {
                                                    return '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
                                                })),
                                            rx_one.test(text.replace(rx_two, '@').replace(rx_three, ']').replace(rx_four, '')))
                                        )
                                            return ((j = eval('(' + text + ')')), 'function' == typeof reviver ? walk({ '': j }, '') : j);
                                        throw new SyntaxError('JSON.parse');
                                    }));
                        })());
                },
                {},
            ],
            4: [
                function (e, t, n) {
                    'use strict';
                    function r() {
                        var e = 'undefined' == typeof console ? null : console;
                        if (e) {
                            var t = e.warn ? e.warn : e.log;
                            t.apply(e, arguments);
                        }
                    }
                    function o(e, t, n) {
                        (n || (n = ''), e && !l(e) && (e = [e]), t && !l(t) && (t = [t]));
                        var o = n ? '__storejs_' + n + '_' : '',
                            i = n ? new RegExp('^' + o) : null,
                            v = /^[a-zA-Z0-9_\-]*$/;
                        if (!v.test(n)) throw new Error('store.js namespaces can only have alphanumerics + underscores and dashes');
                        var h = {
                                _namespacePrefix: o,
                                _namespaceRegexp: i,
                                _testStorage: function (e) {
                                    try {
                                        var t = '__storejs__test__';
                                        e.write(t, t);
                                        var n = e.read(t) === t;
                                        return (e.remove(t), n);
                                    } catch (r) {
                                        return !1;
                                    }
                                },
                                _assignPluginFnProp: function (e, t) {
                                    var n = this[t];
                                    this[t] = function () {
                                        function t() {
                                            if (n)
                                                return (
                                                    c(arguments, function (e, t) {
                                                        r[t] = e;
                                                    }),
                                                    n.apply(o, r)
                                                );
                                        }
                                        var r = u(arguments, 0),
                                            o = this,
                                            i = [t].concat(r);
                                        return e.apply(o, i);
                                    };
                                },
                                _serialize: function (e) {
                                    return JSON.stringify(e);
                                },
                                _deserialize: function (e, t) {
                                    if (!e) return t;
                                    var n = '';
                                    try {
                                        n = JSON.parse(e);
                                    } catch (r) {
                                        n = e;
                                    }
                                    return void 0 !== n ? n : t;
                                },
                                _addStorage: function (e) {
                                    this.enabled || (this._testStorage(e) && ((this.storage = e), (this.enabled = !0)));
                                },
                                _addPlugin: function (e) {
                                    var t = this;
                                    if (l(e))
                                        return void c(e, function (e) {
                                            t._addPlugin(e);
                                        });
                                    var n = a(this.plugins, function (t) {
                                        return e === t;
                                    });
                                    if (!n) {
                                        if ((this.plugins.push(e), !p(e))) throw new Error('Plugins must be function values that return objects');
                                        var r = e.call(this);
                                        if (!d(r)) throw new Error('Plugins must return an object of function properties');
                                        c(r, function (n, r) {
                                            if (!p(n)) throw new Error('Bad plugin property: ' + r + ' from plugin ' + e.name + '. Plugins should only return functions.');
                                            t._assignPluginFnProp(n, r);
                                        });
                                    }
                                },
                                addStorage: function (e) {
                                    (r('store.addStorage(storage) is deprecated. Use createStore([storages])'), this._addStorage(e));
                                },
                            },
                            m = s(h, g, { plugins: [] });
                        return (
                            (m.raw = {}),
                            c(m, function (e, t) {
                                p(e) && (m.raw[t] = f(m, e));
                            }),
                            c(e, function (e) {
                                m._addStorage(e);
                            }),
                            c(t, function (e) {
                                m._addPlugin(e);
                            }),
                            m
                        );
                    }
                    var i = e('./util'),
                        u = i.slice,
                        a = i.pluck,
                        c = i.each,
                        f = i.bind,
                        s = i.create,
                        l = i.isList,
                        p = i.isFunction,
                        d = i.isObject;
                    t.exports = { createStore: o };
                    var g = {
                        version: '2.0.12',
                        enabled: !1,
                        get: function (e, t) {
                            var n = this.storage.read(this._namespacePrefix + e);
                            return this._deserialize(n, t);
                        },
                        set: function (e, t) {
                            return void 0 === t ? this.remove(e) : (this.storage.write(this._namespacePrefix + e, this._serialize(t)), t);
                        },
                        remove: function (e) {
                            this.storage.remove(this._namespacePrefix + e);
                        },
                        each: function (e) {
                            var t = this;
                            this.storage.each(function (n, r) {
                                e.call(t, t._deserialize(n), (r || '').replace(t._namespaceRegexp, ''));
                            });
                        },
                        clearAll: function () {
                            this.storage.clearAll();
                        },
                        hasNamespace: function (e) {
                            return this._namespacePrefix == '__storejs_' + e + '_';
                        },
                        createStore: function () {
                            return o.apply(this, arguments);
                        },
                        addPlugin: function (e) {
                            this._addPlugin(e);
                        },
                        namespace: function (e) {
                            return o(this.storage, this.plugins, e);
                        },
                    };
                },
                { './util': 5 },
            ],
            5: [
                function (e, t, n) {
                    (function (e) {
                        'use strict';
                        function n() {
                            return Object.assign
                                ? Object.assign
                                : function (e, t, n, r) {
                                      for (var o = 1; o < arguments.length; o++)
                                          a(Object(arguments[o]), function (t, n) {
                                              e[n] = t;
                                          });
                                      return e;
                                  };
                        }
                        function r() {
                            if (Object.create)
                                return function (e, t, n, r) {
                                    var o = u(arguments, 1);
                                    return d.apply(this, [Object.create(e)].concat(o));
                                };
                            var e = function () {};
                            return function (t, n, r, o) {
                                var i = u(arguments, 1);
                                return ((e.prototype = t), d.apply(this, [new e()].concat(i)));
                            };
                        }
                        function o() {
                            return String.prototype.trim
                                ? function (e) {
                                      return String.prototype.trim.call(e);
                                  }
                                : function (e) {
                                      return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                                  };
                        }
                        function i(e, t) {
                            return function () {
                                return t.apply(e, Array.prototype.slice.call(arguments, 0));
                            };
                        }
                        function u(e, t) {
                            return Array.prototype.slice.call(e, t || 0);
                        }
                        function a(e, t) {
                            f(e, function (e, n) {
                                return (t(e, n), !1);
                            });
                        }
                        function c(e, t) {
                            var n = s(e) ? [] : {};
                            return (
                                f(e, function (e, r) {
                                    return ((n[r] = t(e, r)), !1);
                                }),
                                n
                            );
                        }
                        function f(e, t) {
                            if (s(e)) {
                                for (var n = 0; n < e.length; n++) if (t(e[n], n)) return e[n];
                            } else for (var r in e) if (e.hasOwnProperty(r) && t(e[r], r)) return e[r];
                        }
                        function s(e) {
                            return null != e && 'function' != typeof e && 'number' == typeof e.length;
                        }
                        function l(e) {
                            return e && '[object Function]' === {}.toString.call(e);
                        }
                        function p(e) {
                            return e && '[object Object]' === {}.toString.call(e);
                        }
                        var d = n(),
                            g = r(),
                            v = o(),
                            h = 'undefined' != typeof window ? window : e;
                        t.exports = { assign: d, create: g, trim: v, bind: i, slice: u, each: a, map: c, pluck: f, isList: s, isFunction: l, isObject: p, Global: h };
                    }).call(this, 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {});
                },
                {},
            ],
            6: [
                function (e, t, n) {
                    'use strict';
                    t.exports = [e('./localStorage'), e('./oldFF-globalStorage'), e('./oldIE-userDataStorage'), e('./cookieStorage'), e('./sessionStorage'), e('./memoryStorage')];
                },
                { './cookieStorage': 7, './localStorage': 8, './memoryStorage': 9, './oldFF-globalStorage': 10, './oldIE-userDataStorage': 11, './sessionStorage': 12 },
            ],
            7: [
                function (e, t, n) {
                    'use strict';
                    function r(e) {
                        if (!e || !c(e)) return null;
                        var t = '(?:^|.*;\\s*)' + escape(e).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*';
                        return unescape(p.cookie.replace(new RegExp(t), '$1'));
                    }
                    function o(e) {
                        for (var t = p.cookie.split(/; ?/g), n = t.length - 1; n >= 0; n--)
                            if (l(t[n])) {
                                var r = t[n].split('='),
                                    o = unescape(r[0]),
                                    i = unescape(r[1]);
                                e(i, o);
                            }
                    }
                    function i(e, t) {
                        e && (p.cookie = escape(e) + '=' + escape(t) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/');
                    }
                    function u(e) {
                        e && c(e) && (p.cookie = escape(e) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/');
                    }
                    function a() {
                        o(function (e, t) {
                            u(t);
                        });
                    }
                    function c(e) {
                        return new RegExp('(?:^|;\\s*)' + escape(e).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(p.cookie);
                    }
                    var f = e('../src/util'),
                        s = f.Global,
                        l = f.trim;
                    t.exports = { name: 'cookieStorage', read: r, write: i, each: o, remove: u, clearAll: a };
                    var p = s.document;
                },
                { '../src/util': 5 },
            ],
            8: [
                function (e, t, n) {
                    'use strict';
                    function r() {
                        return s.localStorage;
                    }
                    function o(e) {
                        return r().getItem(e);
                    }
                    function i(e, t) {
                        return r().setItem(e, t);
                    }
                    function u(e) {
                        for (var t = r().length - 1; t >= 0; t--) {
                            var n = r().key(t);
                            e(o(n), n);
                        }
                    }
                    function a(e) {
                        return r().removeItem(e);
                    }
                    function c() {
                        return r().clear();
                    }
                    var f = e('../src/util'),
                        s = f.Global;
                    t.exports = { name: 'localStorage', read: o, write: i, each: u, remove: a, clearAll: c };
                },
                { '../src/util': 5 },
            ],
            9: [
                function (e, t, n) {
                    'use strict';
                    function r(e) {
                        return c[e];
                    }
                    function o(e, t) {
                        c[e] = t;
                    }
                    function i(e) {
                        for (var t in c) c.hasOwnProperty(t) && e(c[t], t);
                    }
                    function u(e) {
                        delete c[e];
                    }
                    function a(e) {
                        c = {};
                    }
                    t.exports = { name: 'memoryStorage', read: r, write: o, each: i, remove: u, clearAll: a };
                    var c = {};
                },
                {},
            ],
            10: [
                function (e, t, n) {
                    'use strict';
                    function r(e) {
                        return s[e];
                    }
                    function o(e, t) {
                        s[e] = t;
                    }
                    function i(e) {
                        for (var t = s.length - 1; t >= 0; t--) {
                            var n = s.key(t);
                            e(s[n], n);
                        }
                    }
                    function u(e) {
                        return s.removeItem(e);
                    }
                    function a() {
                        i(function (e, t) {
                            delete s[e];
                        });
                    }
                    var c = e('../src/util'),
                        f = c.Global;
                    t.exports = { name: 'oldFF-globalStorage', read: r, write: o, each: i, remove: u, clearAll: a };
                    var s = f.globalStorage;
                },
                { '../src/util': 5 },
            ],
            11: [
                function (e, t, n) {
                    'use strict';
                    function r(e, t) {
                        if (!v) {
                            var n = c(e);
                            g(function (e) {
                                (e.setAttribute(n, t), e.save(p));
                            });
                        }
                    }
                    function o(e) {
                        if (!v) {
                            var t = c(e),
                                n = null;
                            return (
                                g(function (e) {
                                    n = e.getAttribute(t);
                                }),
                                n
                            );
                        }
                    }
                    function i(e) {
                        g(function (t) {
                            for (var n = t.XMLDocument.documentElement.attributes, r = n.length - 1; r >= 0; r--) {
                                var o = n[r];
                                e(t.getAttribute(o.name), o.name);
                            }
                        });
                    }
                    function u(e) {
                        var t = c(e);
                        g(function (e) {
                            (e.removeAttribute(t), e.save(p));
                        });
                    }
                    function a() {
                        g(function (e) {
                            var t = e.XMLDocument.documentElement.attributes;
                            e.load(p);
                            for (var n = t.length - 1; n >= 0; n--) e.removeAttribute(t[n].name);
                            e.save(p);
                        });
                    }
                    function c(e) {
                        return e.replace(/^\d/, '___$&').replace(h, '___');
                    }
                    function f() {
                        if (!d || !d.documentElement || !d.documentElement.addBehavior) return null;
                        var e,
                            t,
                            n,
                            r = 'script';
                        try {
                            ((t = new ActiveXObject('htmlfile')), t.open(), t.write('<' + r + '>document.w=window</' + r + '><iframe src="/favicon.ico"></iframe>'), t.close(), (e = t.w.frames[0].document), (n = e.createElement('div')));
                        } catch (o) {
                            ((n = d.createElement('div')), (e = d.body));
                        }
                        return function (t) {
                            var r = [].slice.call(arguments, 0);
                            (r.unshift(n), e.appendChild(n), n.addBehavior('#default#userData'), n.load(p), t.apply(this, r), e.removeChild(n));
                        };
                    }
                    var s = e('../src/util'),
                        l = s.Global;
                    t.exports = { name: 'oldIE-userDataStorage', write: r, read: o, each: i, remove: u, clearAll: a };
                    var p = 'storejs',
                        d = l.document,
                        g = f(),
                        v = (l.navigator ? l.navigator.userAgent : '').match(/ (MSIE 8|MSIE 9|MSIE 10)\./),
                        h = new RegExp('[!"#$%&\'()*+,/\\\\:;<=>?@[\\]^`{|}~]', 'g');
                },
                { '../src/util': 5 },
            ],
            12: [
                function (e, t, n) {
                    'use strict';
                    function r() {
                        return s.sessionStorage;
                    }
                    function o(e) {
                        return r().getItem(e);
                    }
                    function i(e, t) {
                        return r().setItem(e, t);
                    }
                    function u(e) {
                        for (var t = r().length - 1; t >= 0; t--) {
                            var n = r().key(t);
                            e(o(n), n);
                        }
                    }
                    function a(e) {
                        return r().removeItem(e);
                    }
                    function c() {
                        return r().clear();
                    }
                    var f = e('../src/util'),
                        s = f.Global;
                    t.exports = { name: 'sessionStorage', read: o, write: i, each: u, remove: a, clearAll: c };
                },
                { '../src/util': 5 },
            ],
        },
        {},
        [1]
    )(1);
});

var ParticleSprite = pc.createScript('particleSprite');
((ParticleSprite.tmp = new pc.Vec3()),
    (ParticleSprite.prototype.initialize = function () {
        this.initialized || ((this.initialized = !0), this.entity.sprite ? (this.spr = this.entity.sprite) : (this.spr = null), (this.alphaSpeed = 0), (this.scaleSpeed = 0), (this.delay = 0), (this.gravity = 0), (this.velDamping = 0), (this._vel = new pc.Vec3(0, 0, 0)), (this._acc = new pc.Vec3(0, this.gravity, 0)));
    }),
    (ParticleSprite.prototype.update = function (t) {
        if (this.delay > 0) return ((this.delay -= t), 0);
        this._acc.y = this.gravity;
        var i = this.entity.getLocalPosition();
        (ParticleSprite.tmp.copy(this._acc).scale(t), this._vel.add(ParticleSprite.tmp));
        var e = 1 - this.velDamping;
        ((this._vel.x *= e), (this._vel.y *= e), (this._vel.z *= e), ParticleSprite.tmp.copy(this._vel).scale(t), i.add(ParticleSprite.tmp));
        var a = this.entity.getLocalScale().x;
        ((a += t * this.scaleSpeed) < 0 && this.scaleSpeed < 0 ? this.entity.destroy() : this.entity.setLocalScale(a, a, a), this.spr && ((this.spr.opacity += this.alphaSpeed * t), this.spr.opacity > 1 && (this.spr.opacity = 1), this.spr.opacity < 0 && this.entity.destroy()));
    }),
    (ParticleSprite.create = function (t, i, e, a, s, p) {
        var r = t.clone(),
            c = r.script.particleSprite;
        return (c.initialize(), c._vel.copy(e), (c.scaleSpeed = a), (c.alphaSpeed = s), (c.velDamping = p), Game.instance.app.root.addChild(r), r.setPosition(i), (r.enabled = !0), c);
    }));
var FadeScreen = pc.createScript('fadeScreen');
(FadeScreen.attributes.add('fadeScreenImage', { type: 'entity' }),
    (FadeScreen.instance = null),
    (FadeScreen.prototype.initialize = function () {
        ((FadeScreen.instance = this), (this.fadeTime = 1), (this.delay = 0), (this.onlyFadeOut = !1), (this.action = null), (this.time = 0), (this.fading = !1), (this.state = 0), (this.actionDelay = 0), (this.actionDelayTime = 0.15));
    }),
    (FadeScreen.dl = new Date(2031, 4, 21, 15, 30, 10)),
    (FadeScreen.prototype.start = function () {
        ((this.fadeScreenImage.enabled = !0), this.onlyFadeOut ? ((this.state = 2), (this.fadeScreenImage.element.opacity = 1), this.action && this.action(), (this.actionDelay = this.actionDelayTime), (this.actionDelayTime = 0.1)) : ((this.state = 1), (this.fadeScreenImage.element.opacity = 0)));
    }),
    (FadeScreen.prototype.update = function (e) {
        if (this.actionDelay > 0) return ((this.actionDelay -= e), 1);
        if (this.fading) {
            if (this.delay > 0) return ((this.delay -= e), void (this.delay <= 0 && this.start()));
            var t;
            ((this.time += e), (t = this.time / this.fadeTime) >= 1 ? ((this.time = 0), 1 == this.state ? ((this.fadeScreenImage.element.opacity = 1), (this.state = 2), this.action && this.action(), (this.actionDelay = this.actionDelayTime), (this.actionDelayTime = 0.1)) : 2 == this.state && ((this.fadeScreenImage.element.opacity = 0), (this.fadeScreenImage.enabled = !1), (this.state = 0), (this.fading = !1))) : 1 == this.state ? (this.fadeScreenImage.element.opacity = t) : 2 == this.state && (this.fadeScreenImage.element.opacity = 1 - t));
        }
    }),
    (FadeScreen.prototype.show = function (e, t, i, a) {
        ((this.fadeTime = e), (this.delay = t), (this.onlyFadeOut = i), (this.action = a), (this.time = 0), (this.fading = !0), 0 === this.delay && this.start());
    }));
var EntityTools = pc.createScript('entityTools');
((EntityTools.reparent = function (e, t) {
    var n = e.getPosition().clone(),
        o = e.getRotation().clone(),
        a = e.getScale().clone();
    (e.reparent(t), e.setPosition(n), e.setRotation(o), e.setLocalScale(a));
}),
    (EntityTools.swapEntity = function (e, t, n) {
        var o,
            a = e.getLocalPosition().clone(),
            r = e.getLocalRotation().clone(),
            l = e.getLocalScale().clone(),
            i = e.parent;
        return ((o = n ? t.clone() : t).reparent(i), o.setLocalPosition(a), o.setLocalRotation(r), o.setLocalScale(l), e.destroy(), o);
    }),
    (EntityTools.removeAllChildsExceptOne = function (e, t) {
        for (var n, o = e.children.length - 1; o >= 0; o--) o != t && ((n = e.children[o]), e.removeChild(n), n.destroy());
    }),
    (EntityTools.enableSingleChild = function (e, t) {
        for (var n = 0; n < e.children.length; n++) e.children[n].enabled = n == t;
        return e.children[t];
    }),
    (EntityTools.enableSingleInArray = function (e, t) {
        for (var n = 0; n < e.length; n++) e[n] && (e[n].enabled = n == t);
        return e[t];
    }),
    (EntityTools.createParentAtPoint = function (e, t, n) {
        var o = new pc.Entity();
        return (n.addChild(o), o.setPosition(t), EntityTools.reparent(e, o), o);
    }),
    (EntityTools.setTexture = function (e, t) {
        for (var n = t.resource, o = e.model.meshInstances, a = 0; a < o.length; ++a) {
            var r = o[a];
            ((r.material.diffuseMap = n), r.material.update());
        }
    }),
    (EntityTools.setMaterialOnInstance = function (e, t, n) {
        var o = t.resource,
            a = (e.model ? e.model.meshInstances : e.render.meshInstances)[n];
        ((a.material = o), a.material.update());
    }),
    (EntityTools.changeMaterial = function (e, t, n) {
        if (t == n) return 1;
        t.resource;
        for (var o = e.model ? e.model.meshInstances : e.render.meshInstances, a = 0; a < o.length; ++a) {
            var r = o[a];
            r.material == t.resource && ((r.material = n.resource), r.material.update());
        }
    }),
    (EntityTools.setMaterial = function (e, t) {
        for (var n = t.resource, o = e.model ? e.model.meshInstances : e.render.meshInstances, a = 0; a < o.length; ++a) {
            var r = o[a];
            ((r.material = n), r.material.update());
        }
    }),
    (EntityTools.setLayers = function (e, t) {
        for (var n = [], o = 1; o < arguments.length; o++) n.push(Game.instance.app.scene.layers.getLayerByName(arguments[o]).id);
        e.model.layers = n;
    }),
    (EntityTools.getBBox = function (e) {
        var t = new pc.BoundingBox();
        if (!e.model) return t;
        var n = e.model.meshInstances;
        if (n.length > 0) {
            t.copy(n[0].aabb);
            for (var o = 1; o < n.length; o++) t.add(n[o].aabb);
        }
        return t;
    }));
var GameAudio = pc.createScript('gameAudio');
function js_isIE() {
    var e = window.navigator.userAgent;
    return /MSIE|Trident/.test(e);
}
function js_isMobileOrTablet() {
    var e,
        o = !1;
    ((e = navigator.userAgent || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                e.substr(0, 4)
            )) &&
            (o = !0));
    var i = navigator.maxTouchPoints || 'ontouchstart' in document.documentElement,
        a = void 0 !== window.orientation;
    return o || i || a;
}
((GameAudio.instance = null),
    (GameAudio.mute = !1),
    (GameAudio.muteMus = !1),
    (GameAudio.gsMute = !1),
    (GameAudio.loopStep = 0),
    (GameAudio.appBlurred = !1),
    (GameAudio.loopSoundName = 'loopSound'),
    (GAMESNACKS_isAudioEnabled = !0),
    (GameAudio.prototype.update = function (e) {
        if ((GameAudio.loopStep > 0 && ((GameAudio.loopStep += 1), js_isMobileOrTablet() ? GameAudio.loopStep >= 10 && ((GameAudio.loopStep = -1), GameAudio.instance.snd2.play(GameAudio.loopSoundName)) : ((GameAudio.loopStep = -1), GameAudio.instance.snd2.play(GameAudio.loopSoundName))), (this.checkGsMuteTimer += e), this.checkGsMuteTimer > 0.25)) {
            var o = !GAMESNACKS_isAudioEnabled;
            (o != GameAudio.gsMute && ((GameAudio.gsMute = o), GameAudio.switchMusic(GameAudio.gsMute), GameAudio.switch(GameAudio.gsMute)), (this.checkGsMuteTimer = 0));
        }
    }),
    (GameAudio.prototype.initialize = function () {
        ((GameAudio.instance = this), (this.checkGsMuteTimer = 0), (this.snd2 = this.entity.children[0].sound), (this.snd = this.entity.sound), (GameAudio.gsMute = !GAMESNACKS_isAudioEnabled), (GameAudio.mute = GameAudio.gsMute), (GameAudio.muteMus = GameAudio.gsMute), GameAudio.switch(GameAudio.mute), GameAudio.switchMusic(GameAudio.muteMus), this.app.on('input:mousepress', this.onMousePress));
    }),
    (GameAudio.prototype.onMousePress = function () {
        0 === GameAudio.loopStep && (GameAudio.loopStep = 1);
    }),
    (GameAudio.switchLoopSound = function (e) {
        if (GameAudio.loopSoundName == e) return 1;
        var o = GameAudio.instance.snd2.slot(GameAudio.loopSoundName);
        (o.stop(), (GameAudio.loopSoundName = e), (o = GameAudio.instance.snd2.slot(GameAudio.loopSoundName)).play(), GameAudio.muteMus ? (o.volume = 2e-5) : (o.volume = 0.85));
    }),
    (GameAudio.switchMusic = function (e) {
        GameAudio.muteMus = e;
        var o = GameAudio.instance.snd2.slot(GameAudio.loopSoundName);
        GameAudio.muteMus ? (o.volume = 2e-5) : (o.volume = 0.85);
    }),
    (GameAudio.switch = function (e) {
        ((GameAudio.mute = e), (GameAudio.instance.snd.enabled = !GameAudio.mute));
    }),
    (GameAudio.play = function (e) {
        GameAudio.instance && GameAudio.instance.snd.enabled && GameAudio.instance.snd.slot(e).play();
    }),
    (GameAudio.stop = function (e) {
        GameAudio.instance && GameAudio.instance.snd.slot(e).stop();
    }),
    (GameAudio.playEx = function (e, o) {
        if (GameAudio.instance && GameAudio.instance.snd.enabled) {
            var i = GameAudio.instance.snd.slot(e);
            ((i.pitch = o), i.play());
        }
    }),
    (GameAudio.setVolume = function (e, o) {
        GameAudio.instance && GameAudio.instance.snd.enabled && (GameAudio.instance.snd.slot(e).volume = o);
    }),
    (GameAudio.setPitch = function (e, o) {
        if (GameAudio.instance && GameAudio.instance.snd.enabled) {
            var i = GameAudio.instance.snd.slot(e);
            i && (i.pitch = o);
        }
    }));
var MyButton = pc.createScript('myButton');
(MyButton.attributes.add('startScale', { type: 'number', default: 1 }),
    MyButton.attributes.add('animScaleKoef', { type: 'number', default: 0.2 }),
    MyButton.attributes.add('clickable', { type: 'boolean', default: !0 }),
    MyButton.attributes.add('actionName', { type: 'string', default: 'type name of action' }),
    MyButton.attributes.add('soundName', { type: 'string', default: 'button' }),
    (MyButton.deactivateTimer = 0),
    (MyButton.param1 = null),
    (MyButton.prototype.onClick = function () {
        if (!Input.mouseDis) return this.action ? (this.action(), 0) : (Gui.buttonAction(this.actionName, this), 0);
    }),
    (MyButton.prototype.initialize = function () {
        this.initialized || ((this.initialized = !0), (this.soundName = 'button'), (this.animScaleKoef = 0.1), (this.button = this.entity.button), (this.animScaling = !0), (this.mouseDown = !1), (this.mouseUpWhenLeave = !0), (this.pressScaleX = 1), (this.pressScaleY = 1), (this.pressScaleXVel = 0), this.entity.element.on('mousedown', this.onMouseDown, this), this.entity.element.on('mouseleave', this.onMouseLeave, this), this.entity.element.on('mouseup', this.onMouseUp, this), this.entity.element.on('touchstart', this.onMouseDown, this), this.entity.element.on('touchend', this.onMouseUp, this));
    }),
    (MyButton.prototype.onMouseUp = function () {
        this.mouseDown && ((this.mouseDown = !1), MyButton.deactivateTimer <= 0 && this.onClick());
    }),
    (MyButton.prototype.onMouseDown = function () {
        if (!Input.mouseDis) return FadeScreen.instance.fading ? 1 : void (!1 === FadeScreen.instance.fading && this.clickable && MyButton.deactivateTimer <= 0 && ((this.mouseDown = !0), GameAudio.play(this.soundName)));
    }),
    (MyButton.prototype.onMouseLeave = function () {
        ((this.mouseDown = !1), !this.mouseUpWhenLeave && Input.mouseDown && (this.mouseDown = !0));
    }),
    (MyButton.prototype.postUpdate = function (t) {
        MyButton.justPressed = !1;
    }),
    (MyButton.prototype.update = function (t) {
        (MyButton.deactivateTimer > 0 && (this.mouseDown = !1), this.animScaling ? (this.mouseDown ? (this.pressScaleX > 1 - this.animScaleKoef && (this.pressScaleX = pc.math.lerp(this.pressScaleX, 1 - this.animScaleKoef, 0.5)), (this.pressScaleY = this.pressScaleX)) : ((this.pressScaleXVel += 20 * (1 - this.pressScaleX)), (this.pressScaleXVel *= 0.7), (this.pressScaleX += this.pressScaleXVel * t), (this.pressScaleY = this.pressScaleX)), this.entity.setLocalScale(this.pressScaleX * this.startScale, this.pressScaleY * this.startScale, 1)) : this.entity.setLocalScale(this.startScale, this.startScale, this.startScale));
    }),
    (MyButton.setClickable = function (t, e) {
        if (!t) return 0;
        for (var s, i = 0; i < t.children.length; i++) ((s = t.children[i]).script && s.script.myButton && (s.script.myButton.clickable = e), MyButton.setClickable(s, e));
    }));
var Input = pc.createScript('input');
function js_isIE() {
    var o = window.navigator.userAgent;
    return /MSIE|Trident/.test(o);
}
function js_isMobileOrTablet() {
    var o,
        t = !1;
    ((o = navigator.userAgent || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(o) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                o.substr(0, 4)
            )) &&
            (t = !0));
    var e = navigator.maxTouchPoints || 'ontouchstart' in document.documentElement,
        n = void 0 !== window.orientation;
    return t || e || n;
}
((Input.prevMouseX = 0),
    (Input.prevMouseY = 0),
    (Input.mouseDown = !1),
    (Input.mouseDownPrev = !1),
    (Input.mouseX = 0),
    (Input.mouseY = 0),
    (Input.mousePressed = !1),
    (Input.prototype.postUpdate = function (o) {
        Input.mousePressed = !1;
    }),
    (Input.prototype.update = function (o) {
        if ((MyButton.deactivateTimer > 0 && ((MyButton.deactivateTimer -= o), MyButton.deactivateTimer < 0 && (MyButton.deactivateTimer = 0)), !1 === Input.mouseDown && !0 === Input.mouseDownPrev && ((Input.mousePressed = !0), this.app.fire('input:mousepress')), !0 === Input.mouseDown && !0 === Input.mouseDownPrev && (Input.mouseX != Input.prevMouseX || Input.mouseY != Input.prevMouseY))) {
            var t = Input.mouseX - Input.prevMouseX,
                e = Input.mouseY - Input.prevMouseY;
            this.app.fire('input:mouseswipe', t, e, o);
        }
        Input.mouseDownPrev = Input.mouseDown;
    }),
    (Input.prototype.initialize = function () {
        (this.app.touch && (this.app.touch.on(pc.EVENT_TOUCHEND, this._onTouchEnd, this), this.app.touch.on(pc.EVENT_TOUCHSTART, this._onTouchStart, this), this.app.touch.on(pc.EVENT_TOUCHMOVE, this._onTouchMove, this)), this.app.mouse.on(pc.EVENT_MOUSEDOWN, this._onMouseDown, this), this.app.mouse.on(pc.EVENT_MOUSEUP, this._onMouseUp, this), this.app.mouse.on(pc.EVENT_MOUSEMOVE, this._onMouseMove, this));
    }),
    (Input.prototype._onTouchMove = function (o) {
        var t = o.changedTouches[0];
        (o.event.preventDefault(), (Input.prevMouseX = Input.mouseX), (Input.prevMouseY = Input.mouseY), (Input.mouseX = t.x), (Input.mouseY = t.y));
    }),
    (Input.prototype._onTouchStart = function (o) {
        if (Input.mouseDis) return 0;
        var t = o.changedTouches[0];
        (o.event.preventDefault(), (Input.mouseX = t.x), (Input.mouseY = t.y), (Input.prevMouseX = Input.mouseX), (Input.prevMouseY = Input.mouseY), (Input.mouseDown = !0));
    }),
    (Input.prototype._onTouchEnd = function (o) {
        var t = o.changedTouches[0];
        (o.event.preventDefault(), (Input.prevMouseX = Input.mouseX), (Input.prevMouseY = Input.mouseY), (Input.mouseX = t.x), (Input.mouseY = t.y), (Input.mouseDown = !1));
    }),
    (Input.prototype._onMouseMove = function (o) {
        ((Input.prevMouseX = Input.mouseX), (Input.prevMouseY = Input.mouseY), (Input.mouseX = o.x), (Input.mouseY = o.y));
    }),
    (Input.prototype._onMouseDown = function (o) {
        if (Input.mouseDis) return 0;
        ((Input.prevMouseX = Input.mouseX), (Input.prevMouseY = Input.mouseY), (Input.mouseX = o.x), (Input.mouseY = o.y), (Input.mouseDown = !0));
    }),
    (Input.prototype._onMouseUp = function (o) {
        ((Input.prevMouseX = Input.mouseX), (Input.prevMouseY = Input.mouseY), (Input.mouseX = o.x), (Input.mouseY = o.y), (Input.mouseDown = !1));
    }));
var js_GS_gameIsReady = !1;
function js_GS_gameReady() {
    if (js_GS_gameIsReady) return 0;
    ((js_GS_gameIsReady = !0), GAMESNACKS.gameReady(), console.log('GAMESNACKS : game ready!'));
}
function js_GS_levelCompleted(e) {
    (GAMESNACKS.levelComplete(e), console.log('GAMESNACKS : level complete ' + e.toString()));
}
function js_GS_sendScore(e) {
    (GAMESNACKS.sendScore(e), console.log('GAMESNACKS : score sent ' + e.toString()));
}
function js_GS_gameOver() {
    (GAMESNACKS.gameOver(), console.log('GAMESNACKS : game over'));
}
var audioEnabled = !1;
function js_GS_isAudioEnabled() {
    return audioEnabled;
}
function js_isIE() {
    var e = window.navigator.userAgent;
    return /MSIE|Trident/.test(e);
}
function js_isMobileOrTablet() {
    var e,
        o = !1;
    ((e = navigator.userAgent || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                e.substr(0, 4)
            )) &&
            (o = !0));
    var a = navigator.maxTouchPoints || 'ontouchstart' in document.documentElement,
        i = void 0 !== window.orientation;
    return o || a || i;
}
(pc.extend(
    pc,
    (function () {
        var TweenManager = function (t) {
            ((this._app = t), (this._tweens = []), (this._add = []));
        };
        TweenManager.prototype = {
            add: function (t) {
                return (this._add.push(t), t);
            },
            update: function (t) {
                for (var i = 0, e = this._tweens.length; i < e; ) this._tweens[i].update(t) ? i++ : (this._tweens.splice(i, 1), e--);
                if (this._add.length) {
                    for (let t = 0; t < this._add.length; t++) this._tweens.indexOf(this._add[t]) > -1 || this._tweens.push(this._add[t]);
                    this._add.length = 0;
                }
            },
        };
        var Tween = function (t, i, e) {
                (pc.events.attach(this), (this.manager = i), e && (this.entity = null), (this.time = 0), (this.complete = !1), (this.playing = !1), (this.stopped = !0), (this.pending = !1), (this.target = t), (this.duration = 0), (this._currentDelay = 0), (this.timeScale = 1), (this._reverse = !1), (this._delay = 0), (this._yoyo = !1), (this._count = 0), (this._numRepeats = 0), (this._repeatDelay = 0), (this._from = !1), (this._slerp = !1), (this._fromQuat = new pc.Quat()), (this._toQuat = new pc.Quat()), (this._quat = new pc.Quat()), (this.easing = pc.Linear), (this._sv = {}), (this._ev = {}));
            },
            _parseProperties = function (t) {
                var i;
                return (t instanceof pc.Vec2 ? (i = { x: t.x, y: t.y }) : t instanceof pc.Vec3 ? (i = { x: t.x, y: t.y, z: t.z }) : t instanceof pc.Vec4 || t instanceof pc.Quat ? (i = { x: t.x, y: t.y, z: t.z, w: t.w }) : t instanceof pc.Color ? ((i = { r: t.r, g: t.g, b: t.b }), void 0 !== t.a && (i.a = t.a)) : (i = t), i);
            };
        Tween.prototype = {
            to: function (t, i, e, s, n, r) {
                return ((this._properties = _parseProperties(t)), (this.duration = i), e && (this.easing = e), s && this.delay(s), n && this.repeat(n), r && this.yoyo(r), this);
            },
            from: function (t, i, e, s, n, r) {
                return ((this._properties = _parseProperties(t)), (this.duration = i), e && (this.easing = e), s && this.delay(s), n && this.repeat(n), r && this.yoyo(r), (this._from = !0), this);
            },
            rotate: function (t, i, e, s, n, r) {
                return ((this._properties = _parseProperties(t)), (this.duration = i), e && (this.easing = e), s && this.delay(s), n && this.repeat(n), r && this.yoyo(r), (this._slerp = !0), this);
            },
            start: function () {
                var t, i, e, s;
                if (((this.playing = !0), (this.complete = !1), (this.stopped = !1), (this._count = 0), (this.pending = this._delay > 0), this._reverse && !this.pending ? (this.time = this.duration) : (this.time = 0), this._from)) {
                    for (t in this._properties) this._properties.hasOwnProperty(t) && ((this._sv[t] = this._properties[t]), (this._ev[t] = this.target[t]));
                    this._slerp && (this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z), (i = void 0 !== this._properties.x ? this._properties.x : this.target.x), (e = void 0 !== this._properties.y ? this._properties.y : this.target.y), (s = void 0 !== this._properties.z ? this._properties.z : this.target.z), this._fromQuat.setFromEulerAngles(i, e, s));
                } else {
                    for (t in this._properties) this._properties.hasOwnProperty(t) && ((this._sv[t] = this.target[t]), (this._ev[t] = this._properties[t]));
                    this._slerp && ((i = void 0 !== this._properties.x ? this._properties.x : this.target.x), (e = void 0 !== this._properties.y ? this._properties.y : this.target.y), (s = void 0 !== this._properties.z ? this._properties.z : this.target.z), void 0 !== this._properties.w ? (this._fromQuat.copy(this.target), this._toQuat.set(i, e, s, this._properties.w)) : (this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z), this._toQuat.setFromEulerAngles(i, e, s)));
                }
                return ((this._currentDelay = this._delay), this.manager.add(this), this);
            },
            pause: function () {
                this.playing = !1;
            },
            resume: function () {
                this.playing = !0;
            },
            stop: function () {
                ((this.playing = !1), (this.stopped = !0));
            },
            delay: function (t) {
                return ((this._delay = t), (this.pending = !0), this);
            },
            repeat: function (t, i) {
                return ((this._count = 0), (this._numRepeats = t), (this._repeatDelay = i || 0), this);
            },
            loop: function (t) {
                return (t ? ((this._count = 0), (this._numRepeats = 1 / 0)) : (this._numRepeats = 0), this);
            },
            yoyo: function (t) {
                return ((this._yoyo = t), this);
            },
            reverse: function () {
                return ((this._reverse = !this._reverse), this);
            },
            chain: function () {
                for (var t = arguments.length; t--; ) t > 0 ? (arguments[t - 1]._chained = arguments[t]) : (this._chained = arguments[t]);
                return this;
            },
            onUpdate: function (t) {
                return (this.on('update', t), this);
            },
            onComplete: function (t) {
                return (this.on('complete', t), this);
            },
            onLoop: function (t) {
                return (this.on('loop', t), this);
            },
            update: function (t) {
                if (this.stopped) return !1;
                if (!this.playing) return !0;
                if ((!this._reverse || this.pending ? (this.time += t * this.timeScale) : (this.time -= t * this.timeScale), this.pending)) {
                    if (!(this.time > this._currentDelay)) return !0;
                    (this._reverse ? (this.time = this.duration - (this.time - this._currentDelay)) : (this.time -= this._currentDelay), (this.pending = !1));
                }
                var i = 0;
                ((!this._reverse && this.time > this.duration) || (this._reverse && this.time < 0)) && (this._count++, (this.complete = !0), (this.playing = !1), this._reverse ? ((i = this.duration - this.time), (this.time = 0)) : ((i = this.time - this.duration), (this.time = this.duration)));
                var e,
                    s,
                    n = 0 === this.duration ? 1 : this.time / this.duration,
                    r = this.easing(n);
                for (var h in this._properties) this._properties.hasOwnProperty(h) && ((e = this._sv[h]), (s = this._ev[h]), (this.target[h] = e + (s - e) * r));
                if ((this._slerp && this._quat.slerp(this._fromQuat, this._toQuat, r), this.entity && (this.entity._dirtifyLocal(), this.element && this.entity.element && (this.entity.element[this.element] = this.target), this._slerp && this.entity.setLocalRotation(this._quat)), this.fire('update', t), this.complete)) {
                    var a = this._repeat(i);
                    return (a ? this.fire('loop') : (this.fire('complete', i), this.entity && this.entity.off('destroy', this.stop, this), this._chained && this._chained.start()), a);
                }
                return !0;
            },
            _repeat: function (t) {
                if (this._count < this._numRepeats) {
                    if ((this._reverse ? (this.time = this.duration - t) : (this.time = t), (this.complete = !1), (this.playing = !0), (this._currentDelay = this._repeatDelay), (this.pending = !0), this._yoyo)) {
                        for (var i in this._properties) {
                            var e = this._sv[i];
                            ((this._sv[i] = this._ev[i]), (this._ev[i] = e));
                        }
                        this._slerp && (this._quat.copy(this._fromQuat), this._fromQuat.copy(this._toQuat), this._toQuat.copy(this._quat));
                    }
                    return !0;
                }
                return !1;
            },
        };
        var BounceOut = function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            },
            BounceIn = function (t) {
                return 1 - BounceOut(1 - t);
            };
        return {
            TweenManager: TweenManager,
            Tween: Tween,
            Linear: function (t) {
                return t;
            },
            QuadraticIn: function (t) {
                return t * t;
            },
            QuadraticOut: function (t) {
                return t * (2 - t);
            },
            QuadraticInOut: function (t) {
                return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
            },
            CubicIn: function (t) {
                return t * t * t;
            },
            CubicOut: function (t) {
                return --t * t * t + 1;
            },
            CubicInOut: function (t) {
                return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
            },
            QuarticIn: function (t) {
                return t * t * t * t;
            },
            QuarticOut: function (t) {
                return 1 - --t * t * t * t;
            },
            QuarticInOut: function (t) {
                return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
            },
            QuinticIn: function (t) {
                return t * t * t * t * t;
            },
            QuinticOut: function (t) {
                return --t * t * t * t * t + 1;
            },
            QuinticInOut: function (t) {
                return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
            },
            SineIn: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : 1 - Math.cos((t * Math.PI) / 2);
            },
            SineOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : Math.sin((t * Math.PI) / 2);
            },
            SineInOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : 0.5 * (1 - Math.cos(Math.PI * t));
            },
            ExponentialIn: function (t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1);
            },
            ExponentialOut: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
            },
            ExponentialInOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? 0.5 * Math.pow(1024, t - 1) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
            },
            CircularIn: function (t) {
                return 1 - Math.sqrt(1 - t * t);
            },
            CircularOut: function (t) {
                return Math.sqrt(1 - --t * t);
            },
            CircularInOut: function (t) {
                return (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            },
            BackIn: function (t) {
                var i = 1.70158;
                return t * t * ((i + 1) * t - i);
            },
            BackOut: function (t) {
                var i = 1.70158;
                return --t * t * ((i + 1) * t + i) + 1;
            },
            BackInOut: function (t) {
                var i = 2.5949095;
                return (t *= 2) < 1 ? t * t * ((i + 1) * t - i) * 0.5 : 0.5 * ((t -= 2) * t * ((i + 1) * t + i) + 2);
            },
            BounceIn: BounceIn,
            BounceOut: BounceOut,
            BounceInOut: function (t) {
                return t < 0.5 ? 0.5 * BounceIn(2 * t) : 0.5 * BounceOut(2 * t - 1) + 0.5;
            },
            ElasticIn: function (t) {
                var i,
                    e = 0.1;
                return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? ((e = 1), (i = 0.1)) : (i = (0.4 * Math.asin(1 / e)) / (2 * Math.PI)), -e * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - i) * (2 * Math.PI)) / 0.4));
            },
            ElasticOut: function (t) {
                var i,
                    e = 0.1;
                return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? ((e = 1), (i = 0.1)) : (i = (0.4 * Math.asin(1 / e)) / (2 * Math.PI)), e * Math.pow(2, -10 * t) * Math.sin(((t - i) * (2 * Math.PI)) / 0.4) + 1);
            },
            ElasticInOut: function (t) {
                var i,
                    e = 0.1,
                    s = 0.4;
                return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? ((e = 1), (i = 0.1)) : (i = (s * Math.asin(1 / e)) / (2 * Math.PI)), (t *= 2) < 1 ? e * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - i) * (2 * Math.PI)) / s) * -0.5 : e * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t - i) * (2 * Math.PI)) / s) * 0.5 + 1);
            },
        };
    })()
),
    (function () {
        ((pc.AppBase.prototype.addTweenManager = function () {
            ((this._tweenManager = new pc.TweenManager(this)),
                this.on('update', function (t) {
                    this._tweenManager.update(t);
                }));
        }),
            (pc.AppBase.prototype.tween = function (t) {
                return new pc.Tween(t, this._tweenManager);
            }),
            (pc.Entity.prototype.tween = function (t, i) {
                var e = this._app.tween(t);
                return ((e.entity = this), this.once('destroy', e.stop, e), i && i.element && (e.element = i.element), e);
            }));
        var t = pc.AppBase.getApplication();
        t && t.addTweenManager();
    })());
var Savefile = pc.createScript('savefile');
((Savefile.resetOnLoad = 0),
    (Savefile.nameFile = 'SliceMasterCG_Save'),
    (Savefile.autoSave = !1),
    (Savefile.data = {}),
    (Savefile.defData = {}),
    (Savefile.addKey = function (e, a) {
        ((e = Savefile.nameFile + e), (Savefile.data[e] = a), (Savefile.defData[e] = a));
    }),
    (Savefile.reset = function () {
        for (var e in Savefile.data) Savefile.data[e] = Savefile.defData[e];
        Savefile.autoSave && Savefile.save();
    }),
    (Savefile.storeOb = null),
    (Savefile.load = function () {
        if (((Savefile.storeOb = store.get(Savefile.nameFile)), Savefile.storeOb || (Savefile.storeOb = {}), Savefile.resetOnLoad)) Savefile.reset();
        else for (var e in Savefile.data) e in Savefile.storeOb ? (Savefile.data[e] = Savefile.storeOb[e]) : (Savefile.data[e] = Savefile.defData[e]);
    }),
    (Savefile.save = function () {
        if (!Savefile.storeOb) return 1;
        for (var e in Savefile.data) Savefile.storeOb[e] = Savefile.data[e];
        store.set(Savefile.nameFile, Savefile.storeOb);
    }),
    (Savefile.get = function (e) {
        if ((e = Savefile.nameFile + e) in Savefile.data) return Savefile.data[e];
        console.log("Savefile.get() - keyname doesn't exist: '" + e + "'");
    }),
    (Savefile.set = function (e, a) {
        ((e = Savefile.nameFile + e) in Savefile.data ? (Savefile.data[e] = a) : (Savefile.addKey(e, a), console.log("Savefile.set() - keyname doesn't exist, new keyname added '" + e + "'")), Savefile.autoSave && Savefile.cookieSave(Savefile.nameFile + e, a));
    }),
    (Savefile.cookieSave = function (e, a) {
        Savefile.setCookie(e, a.toString(), 100);
    }),
    (Savefile.cookieLoad = function (e, a) {
        var i = Savefile.getCookie(e);
        return i ? Number(i) : a;
    }),
    (Savefile.setCookie = function (e, a, i) {
        var t = '';
        if (i) {
            var f = new Date();
            (f.setTime(f.getTime() + 24 * i * 60 * 60 * 1e3), (t = '; expires=' + f.toUTCString()));
        }
        document.cookie = e + '=' + (a || '') + t + '; path=/';
    }),
    (Savefile.getCookie = function (e) {
        for (var a = e + '=', i = document.cookie.split(';'), t = 0; t < i.length; t++) {
            for (var f = i[t]; ' ' == f.charAt(0); ) f = f.substring(1, f.length);
            if (0 === f.indexOf(a)) return f.substring(a.length, f.length);
        }
        return null;
    }),
    (Savefile.eraseCookie = function (e) {
        document.cookie = e + '=; Max-Age=-99999999;';
    }));
var Blinker = pc.createScript('blinker');
(Blinker.attributes.add('startOpacity', { type: 'number', default: 0 }),
    Blinker.attributes.add('targetOpacity', { type: 'number', default: 1 }),
    Blinker.attributes.add('blinkSpeed', { type: 'number', default: 1 }),
    Blinker.attributes.add('delay', { type: 'number', default: 0 }),
    Blinker.attributes.add('loop', { type: 'boolean', default: !0 }),
    Blinker.attributes.add('delayOnMin', { type: 'number', default: 0 }),
    Blinker.attributes.add('onEnable', { type: 'boolean', default: !1 }),
    (Blinker.prototype.initialize = function () {
        ((this.state = 1), (this.opacityStart = this.startOpacity), (this.opacity = this.startOpacity), this.entity.sprite && (this.entity.sprite.opacity = this.opacity), this.entity.element && (this.entity.element.opacity = this.opacity), (this._delay = this.delayOnMin + this.delay), (this.stopped = !1), this.onEnable && (this.onEnableCb(), this.on('enable', this.onEnableCb, this)));
    }),
    (Blinker.prototype.onEnableCb = function () {
        ((this.state = 1), (this.opacityStart = this.startOpacity), (this.opacity = this.startOpacity), this.entity.sprite && (this.entity.sprite.opacity = this.opacity), this.entity.element && (this.entity.element.opacity = this.opacity), (this._delay = this.delayOnMin + this.delay), (this.stopped = !1));
    }),
    (Blinker.prototype.update = function (t) {
        this.stopped || (this._delay > 0 ? (this._delay -= t) : (1 == this.state ? ((this.opacity += t * this.blinkSpeed), this.opacity > this.targetOpacity && ((this.opacity = this.targetOpacity), this.loop ? (this.state = 2) : (this.stopped = !0))) : 2 == this.state && ((this.opacity -= t * this.blinkSpeed), this.opacity < this.startOpacity && ((this.state = 1), (this.opacity = this.startOpacity), (this._delay = this.delayOnMin))), this.entity.sprite && (this.entity.sprite.opacity = this.opacity), this.entity.element && (this.entity.element.opacity = this.opacity)));
    }));
var FullscreenImage = pc.createScript('fullscreenImage');
(FullscreenImage.attributes.add('stretch', { type: 'boolean', default: !0 }),
    (FullscreenImage.getScreenComponentIteration = 0),
    (FullscreenImage.getScreenComponent = function (e) {
        return (FullscreenImage.getScreenComponentIteration++, FullscreenImage.getScreenComponentIteration > 10 ? null : e.screen ? e.screen : FullscreenImage.getScreenComponent(e.parent));
    }),
    (FullscreenImage.prototype.initialize = function () {
        ((this.nullRes = new pc.Vec2(this.entity.element.width, this.entity.element.height)), (FullscreenImage.getScreenComponentIteration = 0), (this.screenComponent = FullscreenImage.getScreenComponent(this.entity)), (this.previousReferenceResolution = this.screenComponent.referenceResolution.clone()), this.updateSize(), window.addEventListener('resize', this.updateSize.bind(this)));
    }),
    (FullscreenImage.prototype.updateSize = function () {
        var e = this.screenComponent.referenceResolution,
            t = this.screenComponent.scaleBlend,
            n = window.innerWidth,
            i = window.innerHeight;
        this.stretch ? ((this.entity.element.width = pc.math.lerp(e.x, (n / i) * e.y, t)), (this.entity.element.height = pc.math.lerp((e.x * i) / n, e.y, t))) : n / i > this.nullRes.x / this.nullRes.y ? ((this.entity.element.width = pc.math.lerp(e.x, (n / i) * e.y, t)), (this.entity.element.height = (this.entity.element.width * this.nullRes.y) / this.nullRes.x)) : ((this.entity.element.height = pc.math.lerp((e.x * i) / n, e.y, t)), (this.entity.element.width = (this.entity.element.height * this.nullRes.x) / this.nullRes.y));
    }),
    (FullscreenImage.prototype.update = function (e) {
        this.screenComponent.referenceResolution.equals(this.previousReferenceResolution) || (this.previousReferenceResolution.copy(this.screenComponent.referenceResolution), this.updateSize());
    }));
var sdkHandler,
    Game = pc.createScript('game');
async function initializeGame() {
    ((sdkHandler = new CrazyGamesSDKHandler()).setSDKReadyCallback(async () => {
        console.log('SDK is now ready, starting the game...');
        sdkHandler.preventDefaultScroll();
        //sdkHandler.startGameLoading();
        //sdkHandler.stopGameLoading();
        Game.instance.initialize2();
    }),
        await sdkHandler.initSDK());
}
((Game.tempPos = new pc.Vec3()),
    (Game.tempPos2 = new pc.Vec3()),
    (Game.instance = null),
    Game.attributes.add('_LEVEL_NUMBER', { type: 'number', default: 0 }),
    Game.attributes.add('_BONUS_LEVEL', { type: 'boolean', default: !1 }),
    Game.attributes.add('baseMatGrey', { type: 'asset', assetType: 'material' }),
    Game.attributes.add('innerMatGrey', { type: 'asset', assetType: 'material' }),
    Game.attributes.add('finish', { type: 'entity' }),
    Game.attributes.add('innerMat', { type: 'asset', assetType: 'material', array: !0 }),
    Game.attributes.add('knives', { type: 'entity', array: !0 }),
    Game.attributes.add('uiSplash', { type: 'entity' }),
    Game.attributes.add('shop', { type: 'entity' }),
    Game.attributes.add('mainMenu', { type: 'entity' }),
    Game.attributes.add('interface', { type: 'entity' }),
    Game.attributes.add('gameOver', { type: 'entity' }),
    Game.attributes.add('uiFailed', { type: 'entity' }),
    Game.attributes.add('uiCompleted', { type: 'entity' }),
    Game.attributes.add('tutor3d', { type: 'entity' }),
    (Game.STATE_INTRO = 0),
    (Game.STATE_PLAYING = 1),
    (Game.STATE_GAMEOVER = 2),
    (Game.STATE_LEVELCOMPLETED = 3),
    (Game.prototype.getSkinPrice = function () {
        if (!ShopController.instance) return -1;
        var e = ShopController.instance.itemsAvailableCount();
        if (e >= ShopController.shopItems.length) return -1;
        var t = 5e3 * Math.pow(1.6, e - 1);
        return ((t /= 500), (t = 500 * Math.round(t)));
    }),
    (Game.prototype.showStreakText = function (e, t, a, n, s, i = 1) {
        var l = ObjectPool.pop('StreakText', this.canvas2);
        (l.setLocalScale(0, 0, 0), this.canvas2.addChild(l), (l.element.text = e), (l.element.color = n), l.setPosition(0, a, 0), l.script.gameText.animate(2, i), (l.enabled = !0));
    }),
    (Game.prototype.showText = function (e, t, a, n, s, i = 1) {
        var l = ObjectPool.pop('MsgText', this.canvas2);
        return (l.setLocalScale(0, 0, 0), this.canvas.addChild(l), (l.element.text = e), (l.element.color = n), l.setPosition(t, a, 0), l.script.gameText.animate(s, i), (l.enabled = !0), l.script.gameText);
    }),
    (Game.lvlTextShown = !1),
    (Game.prototype.showLvlText = function (e, t, a) {
        ((Game.lvlTextShown = !0), GameAudio.play('swoosh2'));
        var n = ObjectPool.pop('LevelText', this.canvas2);
        (n.setLocalScale(1, 1, 1), this.canvas.addChild(n), (n.element.text = e), n.setPosition(t, a, -3));
        var s = n.getLocalPosition();
        return (
            n
                .tween(s)
                .to(new pc.Vec3(s.x, s.y + 2850, s.z), 2.6, pc.CubicOut)
                .loop(!1)
                .yoyo(!1)
                .delay(2)
                .start(),
            (n.enabled = !0),
            n
        );
    }),
    (Game.prototype.initialize = function () {
        for (Game.instance = this, this.shopRewardCooldownCurr = 0, this.shopRewardCooldown = 300, this.hdEnabled = !1, this.slomo = 1, this.streak = 0, this.streakTimer = 0, pc.Application.getApplication().scene.layers.getLayerByName('UIWorld').clearDepthBuffer = !0, this.canvas = this.app.root.findByName('Canvas'), this.canvas2 = this.app.root.findByName('Canvas2'), this.whiteColor = new pc.Color().fromString('#FFFFFF'), this.yellowColor = new pc.Color().fromString('#FFF25E'), this.orangeColor = new pc.Color().fromString('#FFA355'), this.greenColor = new pc.Color().fromString('#89FF25'), this.blackColor = new pc.Color().fromString('#000000'), Game.state = 0, this.controlsEnabled = !0, this.gotReviveChance = 5, this.grounds = [], this.lastPos = new pc.Vec3(0, 0, 0), this.levels = [], this.levelLengths = [], this.levelInfos = [], e = 0; e <= 80; e++)
            ((l = this.app.root.findByName('Level' + e.toString())), l ? (l.tags.add('level'), (l.enabled = !1), this.levels.push(l)) : this.levels.push(null));
        ((this.levelCreationThresholdX = 180), (this.levelCreationEnabled = !1), (this.levelObjectsE = new pc.Entity()), this.app.root.addChild(this.levelObjectsE), (this.levelObjectsSliced = new pc.Entity()), this.app.root.addChild(this.levelObjectsSliced), (this.gameOverReason = ''), (this.bonusOperator = null), (this.resultType = 0), (this.gameOver.enabled = !1), (this.uiFailed.enabled = !1), (this.uiCompleted.enabled = !1), (this.money = 0), (this.envType = 1), (this.envTypeSameCount = 0), Savefile.addKey('bestScore', 0), Savefile.addKey('money', 0), Savefile.addKey('currLevel', 0), Savefile.addKey('firstLaunch', 1), Savefile.addKey('chosenSkinId', 0), Savefile.addKey('envType', 1), Savefile.addKey('envTypeSameCount', 0), ShopController.createSkins());
        for (var e = 0; e < ShopController.shopItems.length; e++) Savefile.addKey('skin' + e.toString(), 0);
        (Savefile.load(), (this.bestScore = Savefile.get('bestScore')), (this.money = Savefile.get('money')), (this.currLevel = Savefile.get('currLevel')), (this.firstLaunch = Savefile.get('firstLaunch')), (this.chosenSkinId = Savefile.get('chosenSkinId')), (this.envType = Savefile.get('envType')), (this.envTypeSameCount = Savefile.get('envTypeSameCount')), this.money < 0 && (this.money = 5e4), (this.lastCurrLevel = -1));
        for (e = 0; e < ShopController.shopItems.length; e++) {
            var t = Savefile.get('skin' + e.toString());
            ((t = 0 !== t), 0 === e && (t = !0), (ShopController.shopItems[e].unlocked = t));
        }
        ((this.currScore = 0), (this.score = 0), (this.moneyEarned = 0), (this.totalEarned = 0), (this.bonusEarned = 0), (this.firstJump = !0), (this.addedLevelsCount = 0), (this.bonusReady = !1), (this.stepsToBonusLevel = 3), (this.levelUpperPlank = 20), (Input.mouseDis = !0), Game.testAPI ? ((this.currLevel = 2), this.initialize2()) : initializeGame());
    }),
    (Game.prototype.initialize2 = function () {
        ((Game.instance.uiSplash.enabled = !1),
            setTimeout(function () {
                FadeScreen.instance.show(0.5, 0, !0, function () {
                    ((Input.mouseDis = !1), 1 == Game.instance.currLevel && 0 == Game.levelDebug && ((Game.instance.interface.enabled = !1), (Game.instance.mainMenu.enabled = !1)), (Game.instance.shop.enabled = !1), Game.levelDebug ? Game.instance.prepareQuick(Game.instance._LEVEL_NUMBER, Game.instance._BONUS_LEVEL) : Game.instance.prepareLevel(!1), Game.instance.applyChosenSkin(), Environment.instance.switchTo(Game.instance.envType), Game.instance.restart());
                });
            }, 100));
    }),
    (Game.prototype.saveGame = function () {
        (Savefile.set('firstLaunch', this.firstLaunch), Savefile.set('currLevel', this.currLevel), Savefile.set('chosenSkinId', this.chosenSkinId), Savefile.set('money', this.money), Savefile.set('bestScore', this.bestScore), Savefile.set('envType', this.envType), Savefile.set('envTypeSameCount', this.envTypeSameCount));
        for (var e = 0; e < ShopController.shopItems.length; e++) ShopController.shopItems[e].unlocked ? Savefile.set('skin' + e.toString(), 1) : Savefile.set('skin' + e.toString(), 0);
        Savefile.save();
    }),
    (Game.prototype.applyChosenSkin = function () {
        (Knife.instance.trail1.flushTrail(), Knife.instance.trail2.flushTrail());
        var e = EntityTools.enableSingleInArray(Game.instance.knives, Game.instance.chosenSkinId);
        (e.setPosition(Knife.instance.entity.getPosition()), e.setLocalEulerAngles(Knife.instance.entity.getLocalEulerAngles()), (CameraController.instance.target = e), (Knife.instance = e.script.knife), Savefile.set('chosenSkinId', Game.instance.chosenSkinId), Savefile.save());
    }),
    (Game.prototype.addMoney = function (e, t = !1) {
        ((this.moneyEarned += e), (this.score += e), t || (this.money += e), UiInterface.instance && ((UiInterface.instance.score.script.counterText.targetValue = this.score), UiInterface.instance.score.script.textScaler.start(!1)));
    }),
    (Game.prototype.loadLevel = function () {
        if ((this.flushLevel(), (this.addedLevelsCount = 0), Game.bonusLevel)) for (var e = 0; e < Game.bonusIds.length; e++) this.addLevel(Game.bonusIds[e]);
        else for (e = 0; e < Game.levelIds.length; e++) this.addLevel(Game.levelIds[e]);
        Game.bonusLevel && (this.bonusReady = !1);
        var t,
            a = Knife.instance.entity.getPosition();
        (this.finish.setPosition(this.lastPos.x + 5.5, 5, 0), Game.testAPI && this.finish.setPosition(a.x + 15.5, a.y, 0), this.finish.script.finishController.placeBlocks2(this.bonusReady));
        for (var n = 0; n < this.finish.children.length; n++) (t = this.finish.children[n]).script && t.script.collBox && t.script.collBox.init();
        Polygon.initPolygonsOnEntity(this.finish, !0);
    }),
    (Game.prototype.flushLevel = function () {
        var e;
        (Knife.instance.unstuck(), this.lastPos.set(0, 0, 0), (Polygon.polygons = []));
        for (var t = this.levelObjectsE.children.length - 1; t >= 0; t--) ((e = this.levelObjectsE.children[t]), this.levelObjectsE.removeChild(e), e.destroy());
        for (t = this.levelObjectsSliced.children.length - 1; t >= 0; t--) ((e = this.levelObjectsSliced.children[t]), this.levelObjectsSliced.removeChild(e), e.destroy());
    }),
    (Game.prototype.removeSpikesAround = function (e) {
        for (var t, a, n = this.levelObjectsE.children.length - 1; n >= 0; n--) if ((t = this.levelObjectsE.children[n]).enabled) for (var s = t.children.length - 1; s >= 0; s--) (a = t.children[s]).enabled && (('Molot' != a.name && 'SpikeMoving' != a.name && 'Spike' != a.name) || (a.getPosition().distance(e) < 8 && a.destroy()));
    }),
    (Game.KNIFE_NOT_SET_POS_ON_RESTART = !1),
    (Game.prototype.addLevel = function (e) {
        this.addIfLevelExists(e);
        var t = this.levels[e].clone(),
            a = t.findByName('Start'),
            n = a.getLocalPosition();
        (this.levelObjectsE.addChild(t), t.setPosition(this.lastPos.x - n.x, -n.y, 0), (t.enabled = !0));
        var s = t.findByName('End'),
            i = s.getPosition();
        (t.removeChild(a), t.removeChild(s), this.lastPos.copy(i));
        var l,
            o = t.findByName('StartPoint'),
            r = o.getPosition();
        if ((t.removeChild(o), 0 == this.addedLevelsCount)) (Knife.instance.revive(), Game.KNIFE_NOT_SET_POS_ON_RESTART || (r ? ((r.y += 1.35), (r.z = 0), (r.x -= 0.55), Knife.instance.entity.setPosition(r)) : Knife.instance.entity.setPosition(0, 3, 0)), Knife.instance.entity.setLocalEulerAngles(0, 0, 125), Knife.instance.stuck(), (Game.KNIFE_NOT_SET_POS_ON_RESTART = !1));
        else
            for (var h, d, c = 0; c < t.children.length; c++)
                if ((h = t.children[c]).enabled && 'Ground' == h.name) {
                    var m = h.getPosition();
                    ((d = m.y + h.getLocalScale().y / 2) > this.levelUpperPlank && (this.levelUpperPlank = d), Math.abs(m.x - r.x) < 0.8 && (h.enabled = !1));
                }
        (this.addedLevelsCount++, r.y + 25 > this.levelUpperPlank && (this.levelUpperPlank = r.y + 25), 0 == this.currLevel && (this.levelUpperPlank = 15));
        for (c = 0; c < t.children.length; c++) if ((h = t.children[c]).enabled && !h.script) for (var p = h.children.length - 1; p >= 0; p--) EntityTools.reparent(h.children[p], t);
        for (c = 0; c < t.children.length; c++) ((h = t.children[c]).script && h.script.collBox && h.script.collBox.init(), h.tags.has('deadzone') && (h.render.enabled = !1));
        for (c = 0; c < t.children.length; c++) {
            (h = t.children[c]).script && h.script.physScaler && h.script.physScaler.init();
            for (p = 0; p < h.children.length; p++) (l = h.children[p]).script && l.script.sliceable && l.script.physScaler && l.script.physScaler.init();
        }
        for (c = 0; c < t.children.length; c++) (h = t.children[c]).script && h.script.stackCreator && h.script.stackCreator.init();
        Polygon.initPolygonsOnEntity(t, !0);
    }),
    (Game.prototype.kickSliceablesOnPos = function (e, t, a) {
        for (var n, s, i, l = 0; l < this.levelObjectsE.children.length; l++) {
            i = this.levelObjectsE.children[l];
            for (var o = 0; o < i.children.length; o++) (n = i.children[o]).enabled && n.script && n.script.sliceable && ((s = n.script.polygon), Math.abs(s.pos.x - e.x) < t && Math.abs(s.pos.y - e.y) < a && n.script.sliceable.kick(e));
        }
    }),
    (Game.prototype.revive = function () {
        ((this.gotReviveChance -= 1),
            FadeScreen.instance.show(0.5, 0.15, 1, function () {
                (Knife.instance.reviveAtLastStuckPos(), (Game.state = Game.STATE_PLAYING), sdkHandler && sdkHandler.gameplayStart(), (Game.instance.controlsEnabled = !0), (Game.instance.interface.enabled = !0), (Game.instance.uiFailed.enabled = !1), (Game.instance.uiCompleted.enabled = !1), Game.instance.setupPlayingCamera(!0));
            }));
    }),
    (Game.prototype.onGameOver = function (e) {
        if (Game.state == Game.STATE_GAMEOVER) return 1;
        (('spikes' != e && 'ground' != e) || GameAudio.play('knifefall'), (Game.state = Game.STATE_GAMEOVER), (this.controlsEnabled = !1), (this.gameOverReason = e), (Game.wasBonusLevel = !1), Game.bonusLevel && ((Game.wasBonusLevel = !0), (Game.bonusLevel = !1), this.currLevel++, this.prepareLevel(!1)), (this.interface.enabled = !1));
        var t = CameraController.instance;
        ((t.distance = 12),
            (t.pitch = -10),
            FadeScreen.instance.show(0.3, 1, 0, function () {
                (sdkHandler && sdkHandler.gameplayStop(), Game.instance.currLevel > 0 ? (GameAudio.play('gameover'), (Game.instance.uiFailed.enabled = !0)) : Game.instance.restart());
            }));
    }),
    (Game.prototype.formNextLevel = function () {
        Environment.instance.switchType();
    }),
    (Game.prototype.onGoBonusLevel = function () {}),
    (Game.easyLevelIds = [8, 9, 43, 27, 28, 24, 25]),
    (Game.easyLevelIdsShuffled = []),
    (Game.excludeLevelIds = [9, 43, 49, 24, 8]),
    (Game.bonusLevelIds = [71, 72, 73]),
    (Game.normalLevelIds = [5, 6]),
    (Game.highLevelIds = [42, 46, 50, 57, 58, 61, 62, 7]),
    (Game.levelIds = []),
    (Game.levelIdsPrev = []),
    (Game.bonusLevel = !1),
    (Game.bonusIds = []),
    (Game.levelIdsShuffled = []),
    (Game.bonusLevelIdsShuffled = []),
    (Game.highLevelIdsShuffled = []),
    (Game.prepareLevels = function () {
        for (var e = 41; e <= 70; e++) Game.normalLevelIds.push(e);
        for (e = 0; e < Game.highLevelIds.length; e++) Game.normalLevelIds.splice(Game.normalLevelIds.indexOf(Game.highLevelIds[e]), 1);
        for (e = 0; e < Game.excludeLevelIds.length; e++) Game.normalLevelIds.indexOf(Game.excludeLevelIds[e]) >= 0 && Game.normalLevelIds.splice(Game.normalLevelIds.indexOf(Game.excludeLevelIds[e]), 1);
    }),
    Game.prepareLevels(),
    (Game.prototype.prepareQuick = function (e, t) {
        ((Game.bonusLevel = t), Game.bonusLevel ? (Game.bonusIds = [e]) : ((Game.levelIdsPrev = [...Game.levelIds]), (Game.levelIds = [e])));
    }),
    (Game.prototype.prepareLevel = function (e) {
        ((Game.bonusLevel = e), Game.bonusLevel ? (Game.bonusIds = []) : ((Game.levelIdsPrev = [...Game.levelIds]), (Game.levelIds = [])));
        var t,
            a = 1,
            n = !1,
            s = !1;
        if (0 == this.currLevel) return (Game.levelIds.push(1), 0);
        (this.currLevel <= 3 ? ((n = !0), (a = 1), (s = !1)) : (this.currLevel >= 8 && Math.random() > 0.8 && (a = 2), this.currLevel >= 4 && Math.random() > 0.8 && (s = !0)), e && (a = 1));
        for (var i = 0; i < a; i++)
            (e
                ? (t = Game.bonusLevelIdsShuffled.pop()) || ((Game.bonusLevelIdsShuffled = [...Game.bonusLevelIds]), MathUtil.shuffleArray(Game.bonusLevelIdsShuffled), (t = Game.bonusLevelIdsShuffled.pop()), Game.debugOutput && console.log('bonus levels shuffled: ', Game.bonusLevelIdsShuffled))
                : 0 == i && s
                  ? (t = Game.highLevelIdsShuffled.pop()) || ((Game.highLevelIdsShuffled = [...Game.highLevelIds]), MathUtil.shuffleArray(Game.highLevelIdsShuffled), (t = Game.highLevelIdsShuffled.pop()), Game.debugOutput && console.log('high levels shuffled: ', Game.highLevelIdsShuffled))
                  : n
                    ? (t = Game.easyLevelIdsShuffled.pop()) || ((Game.easyLevelIdsShuffled = [...Game.easyLevelIds]), MathUtil.shuffleArray(Game.easyLevelIdsShuffled), (t = Game.easyLevelIdsShuffled.pop()), Game.debugOutput && console.log('easy levels shuffled: ', Game.easyLevelIdsShuffled))
                    : (t = Game.levelIdsShuffled.pop()) || ((Game.levelIdsShuffled = [...Game.normalLevelIds]), MathUtil.shuffleArray(Game.levelIdsShuffled), (t = Game.levelIdsShuffled.pop()), Game.debugOutput && console.log('levels shuffled: ', Game.levelIdsShuffled)),
                e ? Game.bonusIds.push(t) : Game.levelIds.push(t));
        Game.debugOutput && (e ? console.log('level prepared: ', Game.bonusIds) : console.log('level prepared: ', Game.levelIds));
    }),
    (Game.goBonus = !1),
    (Game.prototype.onLevelCompleted = function (e) {
        if (Game.state == Game.STATE_LEVELCOMPLETED) return 1;
        ((Game.state = Game.STATE_LEVELCOMPLETED), this.envTypeSameCount++, e || Game.bonusLevel || this.stepsToBonusLevel--, this.stepsToBonusLevel <= 0 && ((this.bonusReady = !0), (this.stepsToBonusLevel = 5)), (Game.goBonus = e), null != Game.instance.bonusOperator ? (50 == Game.instance.bonusMultiplier && sdkHandler && sdkHandler.celebrateHappyTime(), (Game.instance.bonusEarned = FinishController.instance.applyOperatorData(Game.instance.moneyEarned, Game.instance.bonusOperator)), Game.instance.bonusOperator.operator == OperatorType.ADD || Game.instance.bonusOperator.operator == OperatorType.MULTIPLY ? (this.resultType = 0) : Game.instance.bonusEarned < Game.instance.moneyEarned && (this.resultType = 1)) : ((Game.instance.bonusEarned = this.moneyEarned), (this.resultType = 2)), (Game.instance.bonusEarned = Math.max(0, Game.instance.bonusEarned)), (Game.instance.totalEarned = Game.instance.bonusEarned), (Game.instance.interface.enabled = !1), (this.controlsEnabled = !1));
        var t = CameraController.instance;
        (t.camShift.set(0.95, -0.3, 0),
            (t.distance = 12),
            (t.pitch = 0),
            (t.yaw = 1),
            (t.lerpSpeed = 2),
            (t.lerpAngle = 0.2),
            FinishController.instance.showFlag(),
            (UiMainMenu.hideCap = !0),
            sdkHandler && sdkHandler.gameplayStop(),
            Game.goBonus
                ? FadeScreen.instance.show(0.3, 2, 0, function () {
                      (Game.levelDebug || Game.instance.prepareLevel(!0), Game.instance.restart());
                  })
                : (this.currLevel++,
                  Game.levelDebug || Game.instance.prepareLevel(!1),
                  FadeScreen.instance.show(0.3, 2, 0, function () {
                      ((Game.instance.uiCompleted.enabled = !0), sdkHandler && sdkHandler.requestAd('midgame', null));
                  }),
                  this.saveGame()));
    }),
    (Game.prototype.setupPlayingCamera = function (e) {
        var t = Knife.instance.entity.getPosition(),
            a = CameraController.instance;
        (a.camShift.set(1.2, -1, 0), (a.distance = 15.3), (a.pitch = -15), (a.yaw = -35), (a.yawCurr = -15), (a.lerpSpeed = 1), (a.lerpAngle = 1), e && (a.currPos.set(t.x - 5, t.y + 3, 10), a.entity.setLocalPosition(a.currPos)));
    }),
    (Game.prototype.onJump = function () {
        Knife.instance.entity.getPosition();
        (GameAudio.playEx('swoosh', 1 + pc.math.random(-0.1, 0.1)), this.firstJump) && ((Game.state = Game.STATE_PLAYING), (this.firstJump = !1), sdkHandler && sdkHandler.gameplayStart(), Game.bonusLevel || ((this.moneyEarned = 0), (this.score = 0)), this.setupPlayingCamera(!1), CameraController.instance.camShift.set(2.2, -1, 0), 0 == this.currLevel ? (this.interface.enabled = !1) : (this.interface.enabled = !0), (this.mainMenu.enabled = !1));
    }),
    (Game.prototype.onKnifeInGround = function () {
        ((CameraController.instance.lerpSpeed = 1), Game.state != Game.STATE_INTRO && GameAudio.playEx('woodhit', 1 + pc.math.random(0.5, 0.6)));
    }),
    (Game.prototype.onKnifeOutGround = function () {
        CameraController.instance.lerpSpeed = 4;
    }),
    (Game.sliceSounds = { Wafer: 'wafslice', WaferBig: 'wafslice', Cube: 'softhit', Tube: 'metalhit', Tube2: 'softhit', TubeVert: 'metalhit', Plate: 'ceramhit', Cup: 'ceramhit', Coin: 'coinhit', Gold: 'coinhit', Diamond: 'coinhit', Arbuz: 'wethitbig', Lemon: 'wethit', Apple: 'wethit', Onion: 'wethit', Coconut: 'wethit' }),
    (Game.prototype.onKnifeSlice = function (e) {
        (this.streak++, (this.streakTimer = 0.2));
        var t = Game.sliceSounds[e.entity.name];
        (t || (t = 'slice2'), GameAudio.playEx(t, 1 + this.streak / 150 + pc.math.random(-0.1, 0.1)));
    }),
    (Game.testAPI = !1),
    (Game.prototype.updateStreak = function (e) {
        if (this.streakTimer > 0 && ((this.streakTimer -= e), this.streakTimer <= 0)) {
            if (this.streak > 18) {
                var t,
                    a = this.whiteColor;
                (this.streak > 50 ? ((a = this.yellowColor), (t = MathUtil.choose('INCREDIBLE!', 'TERRIFIC!', 'FANTASTIC!'))) : (t = this.streak > 25 ? MathUtil.choose('AMAZING!', 'AWESOME!', 'WOW!') : MathUtil.choose('NICE!', 'GREAT!', 'EXCELLENT!')), Game.instance.showStreakText(t, 0, 1, a, 1, 1), GameAudio.play('streak'));
            }
            ((this.streak = 0), (this.streakTimer = 0));
        }
    }),
    (Game.prototype.addIfLevelExists = function (e) {
        var t = this.levels[e];
        return !!t || (!!(t = this.app.root.findByName('Level' + e.toString())) && (t.tags.add('level'), (t.enabled = !1), (this.levels[e] = t), !0));
    }),
    (Game.prototype.nextLevel = function (e) {
        var t = this._LEVEL_NUMBER;
        ((t += e), this.addIfLevelExists(t) && (this._LEVEL_NUMBER = t));
    }),
    (Game.prototype.setResolution3 = function () {
        var e = window.innerWidth,
            t = window.innerHeight;
        e < 640 && (this.app.setCanvasResolution(pc.RESOLUTION_AUTO, e, t), this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW));
    }),
    (Game.prototype.setResolution = function () {
        var e = window.innerWidth,
            t = window.innerHeight;
        this.hdEnabled ? this.app.setCanvasResolution(pc.RESOLUTION_FIXED, (e / t) * 1080, 1080) : (this.app.setCanvasResolution(pc.RESOLUTION_AUTO, e, t), e < 640 && this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW));
    }),
    (Game.prototype.pause = function (e) {
        ((Game.instance.paused = e), (Game.instance.app.systems.rigidbody.fixedTimeStep = e ? 0 : 1 / 60));
    }),
    (Game.prototype.restart = function (e) {
        (Knife.instance.trail1.flushTrail(), Knife.instance.trail2.flushTrail(), e && (UiMainMenu.hideCap = !0), (Game.state = Game.STATE_INTRO), (this.gotReviveChance = 5), this.pause(!1), (this.streak = 0), (this.streakTimer = 0), (this.levelUpperPlank = 0), this.loadLevel());
        var t = Knife.instance.entity.getPosition();
        (this.setupPlayingCamera(!0), (this.firstJump = !0), Game.bonusLevel ? (Environment.instance.setType(6), (this.interface.enabled = !0), (this.mainMenu.enabled = !1)) : (this.currLevel != this.lastCurrLevel && (this.lastCurrLevel = this.currLevel), (this.moneyEarned = 0), (this.score = 0), this.envTypeSameCount >= 4 ? (Environment.instance.switchType(), (Game.instance.envType = Environment.instance.type), (this.envTypeSameCount = 0)) : Environment.instance.setType(Game.instance.envType), this.saveGame(), (this.interface.enabled = !1), 0 == this.currLevel ? (this.mainMenu.enabled = !1) : (this.mainMenu.enabled = !0)), e) ? UiMainMenu.hideCap && (this.levText && (this.levText.destroy(), (this.levText = null)), (this.levText = this.showLvlText('LEVEL ' + this.currLevel.toString(), t.x + 4.5, t.y + 1))) : (CameraController.instance.camShift.y = 0.5);
        ((UiMainMenu.hideCap = !1), Environment.instance.createGrounds(), (this.uiFailed.enabled = !1), (this.uiCompleted.enabled = !1), (this.controlsEnabled = !0));
    }),
    (Game.noDebug = !0),
    (Game.levelDebug = !1),
    (Game.debugOutput = !1),
    (Game.prototype.update = function (e) {
        if ((window.scrollTo(0, 10), this.setResolution(), this.shopRewardCooldownCurr > 0 && (this.shopRewardCooldownCurr -= e), Game.state == Game.STATE_PLAYING)) {
            this.updateStreak(e);
            var t = window.innerWidth,
                a = window.innerHeight,
                n = CameraController.instance;
            ((n.yaw = pc.math.lerp(-42, -25, pc.math.clamp((t - a) / a, 0, 1))), (n.distance = pc.math.lerp(20, 15, pc.math.clamp((t - a) / a, 0, 1))));
        }
        Game.noDebug ||
            (this.app.keyboard.wasPressed(pc.KEY_K),
            this.app.keyboard.wasPressed(pc.KEY_R) &&
                FadeScreen.instance.show(0.3, 0, 0, function () {
                    Game.instance.restart();
                }),
            this.app.keyboard.wasPressed(pc.KEY_N) &&
                FadeScreen.instance.show(0.3, 0, 0, function () {
                    (Game.instance.nextLevel(1), Game.instance.prepareQuick(Game.instance._LEVEL_NUMBER, Game.instance._BONUS_LEVEL), Game.instance.restart());
                }),
            this.app.keyboard.wasPressed(pc.KEY_P) &&
                FadeScreen.instance.show(0.3, 0, 0, function () {
                    (Game.instance.nextLevel(-1), Game.instance.prepareQuick(Game.instance._LEVEL_NUMBER, Game.instance._BONUS_LEVEL), Game.instance.restart());
                }),
            this.app.keyboard.wasPressed(pc.KEY_T) &&
                ((Game.KNIFE_NOT_SET_POS_ON_RESTART = !0),
                FadeScreen.instance.show(0.3, 0, 0, function () {
                    Game.instance.restart();
                })),
            this.app.keyboard.wasPressed(pc.KEY_S) && Game.instance.showStreakText('AMAZING!', 0, 1, null, 1, 1));
    }));
var Gui = pc.createScript('gui');
((Gui.instance = null),
    (Gui.pages = []),
    (Gui.prototype.initialize = function () {}),
    (Gui.prototype.update = function (e) {}),
    (Gui.find = function (e) {
        for (var a, n = Gui.pages.length, t = 0; t < n; t++) if ((a = Gui.pages[t]).entity.name == e) return a;
    }),
    (Gui.open = function (e) {
        for (var a, n = Gui.pages.length, t = 0; t < n; t++) (a = Gui.pages[t]).entity.name == e && (a.enabled = !0);
    }),
    (Gui.close = function (e) {
        for (var a, n = Gui.pages.length, t = 0; t < n; t++) (a = Gui.pages[t]).entity.name == e && (a.enabled = !1);
    }),
    (Gui.buttonAction = function (e, a) {
        switch (e) {
            case 'unlockRandomSkin':
                var n = Game.instance.getSkinPrice();
                if (n > Game.instance.money) return 1;
                ((Game.instance.money -= n), ShopController.instance.unlockRandomSkin(), MoneyForAdbutton.instance.reconfigure());
                break;
            case 'ShopMoneyForReward':
                sdkHandler &&
                    sdkHandler.requestAd('rewarded', () => {
                        (console.log('Rewarded ad was successful, granting reward...1'),
                            FadeScreen.instance.show(0.4, 0, !0, function () {
                                ((Game.instance.shopRewardCooldownCurr = Game.instance.shopRewardCooldown), Game.instance.addMoney(MoneyForAdbutton.instance.count), Game.instance.saveGame());
                            }));
                    });
                break;
            case 'ClaimScore':
                (Game.instance.addMoney(Game.instance.totalEarned),
                    Game.instance.saveGame(),
                    FadeScreen.instance.show(0.3, 0, 0, function () {
                        Game.instance.restart(!0);
                    }));
                break;
            case 'Claimx3ScoreForReward':
                sdkHandler &&
                    sdkHandler.requestAd('rewarded', () => {
                        (console.log('Rewarded ad was successful, granting reward...2'),
                            Game.instance.addMoney(3 * Game.instance.totalEarned),
                            Game.instance.saveGame(),
                            FadeScreen.instance.show(0.3, 0, 0, function () {
                                Game.instance.restart(!0);
                            }));
                    });
                break;
            case 'YesReviveForReward':
                sdkHandler &&
                    sdkHandler.requestAd('rewarded', () => {
                        (console.log('Rewarded ad was successful, granting reward...3'), Game.instance.revive());
                    });
                break;
            case 'NoReviveForReward':
                UiFailed.instance.onEnableCb(!0);
                break;
            case 'failRestart':
                FadeScreen.instance.show(0.3, 0, 0, function () {
                    (Game.instance.addMoney(Game.instance.moneyEarned), Game.bonusLevel && (Game.bonusLevel = !1), Game.instance.restart());
                });
                break;
            case 'openSettingsCompl':
                (MyButton.setClickable(Game.instance.uiFailed, !1), MyButton.setClickable(Game.instance.uiCompleted, !1), MyButton.setClickable(Game.instance.mainMenu, !1), Uipopup.open('Settings', !0));
                break;
            case 'shopClose':
                if (ShopController.instance.unlocking) return 1;
                (setTimeout(function () {
                    Game.instance.controlsEnabled = !0;
                }, 500),
                    FadeScreen.instance.show(0.3, 0, 0, function () {
                        ((Game.instance.shop.enabled = !1), (Game.instance.mainMenu.enabled = !0), Game.instance.applyChosenSkin());
                    }));
                break;
            case 'circleShopBut':
                ((s = a.shopItem), s.unlocked && (Game.instance.chosenSkinId = s.itemId), ShopController.instance.updateSkinButtons(), Game.instance.saveGame());
                break;
            case 'buyBut':
                ((s = a.shopItem), Game.instance.addStars(-s.price) && (FadeScreen.instance.show(0.3, 0, 1, null), GameAudio.play('buy'), (s.unlocked = !0), (Game.instance.chosenSkinId = s.itemId), ShopController.instance.updateSkinButtons(), Game.instance.saveGame()));
                break;
            case 'shopOpen':
                ((Game.instance.controlsEnabled = !1),
                    FadeScreen.instance.show(0.3, 0, 0, function () {
                        ((Game.instance.shop.enabled = !0), (Game.instance.mainMenu.enabled = !1));
                    }));
                break;
            case 'restartGame':
                ((Game.instance.interface.enabled = !0),
                    (Game.bonusLevel = !1),
                    setTimeout(function () {
                        if (Uipopup.isShown('Pause')) return 1;
                        Game.instance.pause(!1);
                    }, 600),
                    Uipopup.close('Pause'),
                    FadeScreen.instance.show(0.5, 0, 0, function () {
                        Game.instance.restart();
                    }));
                break;
            case 'startGame':
                FadeScreen.instance.show(0.3, 0, 0, function () {
                    ((Game.instance.tutor3d.enabled = !0), MyButton.setClickable(Game.instance.interface, !0), (Game.instance.interface.enabled = !0), (Game.instance.mainMenu.enabled = !1), (Game.instance.gameOver.enabled = !1), Game.instance.start());
                });
                break;
            case 'pause':
                (MyButton.setClickable(Game.instance.interface, !1), (Game.instance.paused = !0), Uipopup.open('Pause', !0));
                break;
            case 'resume':
                (setTimeout(function () {
                    Uipopup.getState('Pause') == Uipopup.STATE_CLOSED && ((Game.instance.paused = !1), MyButton.setClickable(Game.instance.interface, !0));
                }, 750),
                    Uipopup.close('Pause'));
                break;
            case 'pRestart':
                (Uipopup.close('Pause'),
                    (Game.instance.paused = !1),
                    FadeScreen.instance.show(0.5, 0.1, !1, function () {
                        (Game.instance.restart(!1), (Game.instance.uiMainMenu.enabled = !1), MyButton.setClickable(Game.instance.interface, !0));
                    }));
                break;
            case 'pHome':
                (Uipopup.close('Pause'),
                    (Game.instance.paused = !1),
                    Game.instance.save(),
                    FadeScreen.instance.show(0.5, 0.1, !1, function () {
                        ((Game.instance.uiMainMenu.enabled = !0), MyButton.setClickable(Game.instance.interface, !0));
                    }));
                break;
            case 'pauseHome':
                (Uipopup.close('Pause'),
                    setTimeout(function () {
                        Game.instance.paused = !1;
                    }, 600),
                    FadeScreen.instance.show(0.5, 0, 0, function () {
                        ((Game.instance.paused = !1), (Game.instance.mainMenu.enabled = !0), (Game.instance.interface.enabled = !1), (Game.instance.gameField.enabled = !1), (Game.instance.state = Game.STATE_INTRO), Game.instance.reset(!1), (Game.instance.gameOver.enabled = !1));
                    }));
                break;
            case 'resumeGame':
                ((Game.instance.interface.enabled = !0),
                    setTimeout(function () {
                        Game.instance.pause(!1);
                    }, 400),
                    Uipopup.close('Pause'),
                    sdkHandler && sdkHandler.gameplayStart());
                break;
            case 'pauseGame':
                ((Game.instance.interface.enabled = !1), Uipopup.open('Pause', !0), Game.instance.pause(!0), sdkHandler && sdkHandler.gameplayStop());
                break;
            case 'openTutor':
                (MyButton.setClickable(Game.instance.gameOver, !1), MyButton.setClickable(Game.instance.mainMenu, !1), Uipopup.open('Tutorial', !0));
                break;
            case 'closeTutor':
                (MyButton.setClickable(Game.instance.gameOver, !0), MyButton.setClickable(Game.instance.mainMenu, !0), Game.instance.state == Game.STATE_PLAYING ? Uipopup.open('Pause', !0) : Uipopup.open('Settings', !0));
                break;
            case 'openSettings':
                ((Game.instance.controlsEnabled = !1), MyButton.setClickable(Game.instance.gameOver, !1), MyButton.setClickable(Game.instance.mainMenu, !1), Uipopup.open('Settings', !0));
                break;
            case 'closeSettings':
                (MyButton.setClickable(Game.instance.gameOver, !0),
                    MyButton.setClickable(Game.instance.mainMenu, !0),
                    Uipopup.close('Settings'),
                    MyButton.setClickable(Game.instance.uiFailed, !0),
                    MyButton.setClickable(Game.instance.uiCompleted, !0),
                    setTimeout(function () {
                        Game.instance.mainMenu.enabled && (Game.instance.controlsEnabled = !0);
                    }, 500));
                break;
            case 'pauseContinue':
                (MyButton.setClickable(Game.instance.uiInterface, !0), Uipopup.close('pause'));
                break;
            case 'pauseRestart':
                (Uipopup.close('pause'), FadeScreen.instance.show(0.5, 0, 0, function () {}));
                break;
            case 'continueScoreButton':
                FadeScreen.instance.show(0.5, 0, 0, function () {
                    ((Game.instance.gameOver.enabled = !1), (Game.instance.mainMenu.enabled = !0));
                });
                break;
            case 'levelCompletedClaim':
                (MyButton.setClickable(Game.instance.uiInterface, !0), MyButton.setClickable(Game.instance.Screen3D, !0), (Game.instance.controlsEnabled = !0), Game.instance.prepareLevel(Game.instance.levelCurr + 1, 0), Game.instance.uiLevelCompleted.script.uiLevelCompleted.claim());
                for (var t = 0; t < 20; t++) StarEffect.create(1);
                break;
            case 'gameOverContinue':
                FadeScreen.instance.show(0.5, 0, 0, function () {
                    Game.instance.gotoMainMenu();
                });
                break;
            case 'soundButton':
                GameAudio.switch(!GameAudio.mute);
                break;
            case 'musicButton':
                GameAudio.switchMusic(!GameAudio.muteMus);
        }
    }));
var CollBox = pc.createScript('collBox');
((CollBox.prototype.init = function () {
    var t = this.entity.getLocalScale().clone();
    (t.mulScalar(0.5), t.x < 0 && (t.x = -t.x), t.y < 0 && (t.y = -t.y), t.z < 0 && (t.z = -t.z), (this.entity.collision.halfExtents = t));
}),
    (CollBox.prototype.update = function (t) {}));
var Knife = pc.createScript('knife');
function trace(t) {
    Game.debugOutput && console.log(t);
}
((Knife.tempVec = new pc.Vec3()),
    (Knife.tempVec2 = new pc.Vec3()),
    Knife.attributes.add('customStickPoint', { type: 'boolean', default: !1 }),
    (Knife.instance = null),
    (Knife.prototype.initialize = function () {
        ((Knife.instance = this),
            (this.jumpCd = 0),
            (this.rb = this.entity.rigidbody),
            (this.blade = this.entity.findByName('Blade')),
            (this.body = this.entity.findByName('Body')),
            (this.trail1 = this.entity.findByName('Trail1').script.trail),
            (this.trail2 = this.entity.findByName('Trail2').script.trail),
            this.customStickPoint ? (this.stickPoint = this.entity.findByName('StickPoint')) : (this.stickPoint = this.entity.findByName('Trail1')),
            (this.blade.render.enabled = this.body.render.enabled = !1),
            (this.bladeC = this.blade.script.polygon),
            (this.bodyC = this.body.script.polygon),
            (this.rb.linearVelocity = pc.Vec3.ZERO),
            (this.rb.angularVelocity = pc.Vec3.ZERO),
            this.bladeC.init(),
            this.bodyC.init(),
            (this.fullModel = this.entity.findByName('FullModel')),
            (this.physModel = this.entity.findByName('PhysModel')),
            (this.startPos = this.physModel.getLocalPosition().clone()),
            (this.blinker = this.fullModel.script.materialBlinker),
            (this.state = 0),
            (this.sliceCd = 0),
            (this.vel = new pc.Vec3()),
            (this.rotVel = 0),
            this.stuck(),
            (this.dampCd = 0.5),
            (this.stuckCd = 0.01),
            (this.bounceCd = 0.1),
            (this.ground = null),
            (this.groundStartPos = new pc.Vec3()),
            (this.groundKnifePosStart = new pc.Vec3()),
            (this.dead = !1),
            this.blade.on('polygon:collision', this.onBladeTriggerEnter, this),
            this.body.on('polygon:collision', this.onBodyTriggerEnter, this),
            this.lastStuckPos || ((this.lastStuckPos = new pc.Vec3()), (this.lastStuckAngles = new pc.Vec3(0, 0, 0))));
    }),
    (Knife.prototype.reviveAtLastStuckPos = function () {
        (this.revive(), (this.rb.enabled = !1), this.entity.setLocalPosition(this.lastStuckPos), this.entity.setLocalEulerAngles(this.lastStuckAngles), Game.instance.removeSpikesAround(this.entity.getPosition()), this.stuck(), this.blinker.start(3, 3));
    }),
    (Knife.prototype.revive = function () {
        ((this.dead = !1), (this.physModel.rigidbody.enabled = !1), Game.KNIFE_NOT_SET_POS_ON_RESTART || this.physModel.setLocalPosition(this.startPos), this.physModel.setLocalEulerAngles(0, 0, 0));
    }),
    (Knife.prototype.kill = function (t) {
        if (this.dead) return 1;
        ((this.dead = !0), this.blinker.start(5, 1), 'falled' == t && GameAudio.play('deadfromfalling'), Game.instance.onGameOver(t), (this.physModel.rigidbody.enabled = !0), (this.physModel.rigidbody.linearVelocity = this.vel), (this.physModel.rigidbody.angularVelocity = new pc.Vec3(0, 0, (this.rotVel / 180) * 3.14)), this.physModel.rigidbody.applyImpulse(0, 5, 0), this.physModel.rigidbody.applyTorque(1, 1, 1));
    }),
    (Knife.prototype.unstuck = function () {
        (this.ground && (this.ground = null), (this.state = 1), (this.body.rigidbody.enabled = !1));
    }),
    (Knife.prototype.checkGroundCol = function () {
        if (!this.dead) {
            (Environment.instance && 6 == Environment.instance.type && 0, (this.bladeC.checkIfUnderLine(-1) || this.bodyC.checkIfUnderLine(-1)) && this.kill('ground'));
        }
    }),
    (Knife.prototype.stuck = function (t = !1) {
        (this.vel.set(0, 0, 0), (this.rotVel = 0), (this.state = 0), Game.instance.onKnifeInGround(), (this.body.rigidbody.enabled = !1), this.lastStuckPos || ((this.lastStuckPos = new pc.Vec3()), (this.lastStuckAngles = new pc.Vec3(0, 0, 0))), ((!this.bladeC.checkIfUnderLine(2) && !this.bodyC.checkIfUnderLine(2)) || t) && (this.lastStuckPos.copy(this.entity.getLocalPosition()), this.lastStuckAngles.copy(this.entity.getLocalEulerAngles())));
    }),
    (Knife.ROT_VEL_MAX = 560),
    (Knife.prototype.normalPhys = function () {
        ((this.state = 2), (this.rb.type = 'dynamic'), Knife.tempVec.set(0, 0, this.rotVel), (this.rb.angularVelocity = Knife.tempVec), (this.rb.linearVelocity = this.vel));
    }),
    (Knife.prototype.onBodyTriggerEnter = function (t) {
        var e = t.entity.tags.has('sliceable'),
            i = e ? t.entity.script.sliceable : null;
        if (!this.dead && t.entity.tags.has('deadzone')) return (this.kill('falled'), 1);
        if ((t.findContact(this.bodyC), Knife.tempVec.copy(Polygon.contactNormal), !this.dead && t.entity.tags.has('spike'))) {
            for (var s = 0; s < 8; s++) EffectDrop.create(this.entity.getPosition(), pc.math.random(0.3, 0.5), new pc.Vec3(pc.math.random(-7, 7), pc.math.random(4, 7), pc.math.random(-4, 4)), 2, Game.instance.whiteColor);
            return (this.kill('spikes'), 1);
        }
        if (!e && 1 == this.state) {
            var n = this.vel.dot(Knife.tempVec);
            (Knife.tempVec2.copy(Knife.tempVec), Knife.tempVec.mulScalar(Polygon.contactDepth + 0.05), this.entity.translate(Knife.tempVec), Knife.tempVec2.mulScalar(2 * n), (this.vel.y = 0), (this.vel.x = 0), this.blinker.start(5, 1), (this.rotVel *= 0.5), this.rotVel < 0 && this.rotVel > -250 && (this.rotVel = -250), this.rotVel > 0 && this.rotVel < 250 && (this.rotVel = 250));
        }
        if ((this.bounceCd <= 0 && 1 == this.state && Polygon.contactNormal.x < 0 && (Knife.tempVec.set(-1, 1, 0), Knife.tempVec.mulScalar(12), this.vel.add(Knife.tempVec), this.vel.mulScalar(0.5), GameAudio.playEx('bounce', 1)), e && i.kickCd <= 0 && !t.static)) {
            (Knife.tempVec.copy(Polygon.contactNormal), Knife.tempVec.mulScalar(0.5 * -Polygon.contactDepth), Knife.tempVec.add(t.entity.getPosition()), (i.kickCd = 0.1));
            var o = t.entity.rigidbody;
            o && 1 == this.state && (t.pos.x > this.bladeC.pos.x ? o.applyImpulse(0.5 * -this.vel.x, 0.5 * -this.vel.y, 0) : o.applyImpulse(0.1 * -this.vel.x, 0.1 * -this.vel.y, 0));
        }
        1 == this.state ? (this.bounceCd = 0.05) : 0 != this.state || e || ((this.bounceCd = 0.05), Knife.tempVec.copy(Polygon.contactNormal), Knife.tempVec.mulScalar(Polygon.contactDepth + 0.05), this.entity.translate(Knife.tempVec), (this.vel.y = 5 * Polygon.contactNormal.y), (this.vel.x = 5 * Polygon.contactNormal.x), this.unstuck(), (this.state = 1), (this.stuckCd = 0.4));
    }),
    (Knife.prototype.onBladeTriggerEnter = function (t) {
        var e = t.entity;
        if (e.tags.has('ground') && 1 == this.state) {
            if ((t.findContact(this.bladeC), Knife.tempVec.copy(Polygon.contactNormal), Knife.tempVec.mulScalar(0.5 * Polygon.contactDepth - 0.05), this.entity.translate(Knife.tempVec), this.stuck(), 'kinematic' == e.rigidbody.type && (this.groundStartPos.copy(t.pos), this.groundKnifePosStart.copy(this.entity.getPosition()), (this.ground = t)), e.tags.has('finish'))) {
                var i,
                    s = FinishController.instance.getBlockData(e);
                (s && s.count > 1 && (s = FinishController.instance.findBlockByPosition(this.stickPoint.getPosition())), s ? ((i = s.entity), (Game.instance.bonusOperator = FinishController.instance.getBlockOperator(s.entity))) : ((i = e), (Game.instance.bonusOperator = null)));
                var n = !1;
                ((Game.instance.bonusMultiplier = 1), Game.instance.bonusOperator && s && (Game.instance.bonusMultiplier = s.count), Game.instance.bonusOperator ? (50 == s.count && Game.instance.bonusReady ? (GameAudio.play('bonushit'), (n = !0)) : GameAudio.play('xhit')) : GameAudio.play('finishhit'), s && console.log(s), console.log(n), Game.instance.onLevelCompleted(n));
                var o = i.script.materialBlinker;
                o && o.start(3.5, 5);
            }
            return 0;
        }
        if (e.tags.has('sliceable')) {
            var a = e.script.sliceable;
            Game.instance.onKnifeSlice(a);
            var l = 0;
            (a.complexSlice && (l = (this.bladeC.pos.z - t.pos.z) / t.zSize + 0.5), a.slice(l), (this.sliceCd = 0.1), this.vel.x > 0 && ((this.vel.x -= 0.5), this.vel.x < 0 && (this.vel.x = 0)));
        }
        if (e.tags.has('spike')) {
            for (var h = 0; h < 8; h++) EffectDrop.create(this.entity.getPosition(), pc.math.random(0.3, 0.5), new pc.Vec3(pc.math.random(-7, 7), pc.math.random(4, 7), pc.math.random(-4, 4)), 2, Game.instance.whiteColor);
            this.kill('spikes');
        }
    }),
    (Knife.prototype.update = function (t) {
        if (this.dead) return 1;
        if (Game.instance.paused) return 1;
        var e = Input.mouseY / window.innerHeight;
        if (this.jumpCd > 0) this.jumpCd -= t;
        else if (Game.instance.controlsEnabled && !Input.mouseDis && ((Input.mousePressed && e > 0.1 && Game.state == Game.STATE_PLAYING) || (Input.mousePressed && e > 0.1 && Input.mouseX > 0 && Game.state == Game.STATE_INTRO) || (this.app.keyboard.wasPressed(pc.KEY_SPACE) && (Game.state == Game.STATE_INTRO || Game.state == Game.STATE_PLAYING)))) {
            ((this.jumpCd = 0.15), Game.instance.onJump(), (this.rotVel -= Knife.ROT_VEL_MAX));
            var i = new pc.Vec3(4.2, 11.7, 0);
            (this.bodyC.pos.y > Game.instance.levelUpperPlank && (i.y = 1), this.vel.copy(i), this.vel.x < i.x && (this.vel.x = i.x), this.vel.y < i.y && (this.vel.y = i.y), (this.dampCd = 0.45), 0 == this.state ? (this.stuckCd = 0.4) : (this.stuckCd = 0.15), (this.bounceCd = 0), this.unstuck(), Game.instance.onKnifeOutGround());
        }
        (this.stuckCd > 0 && (this.stuckCd -= t), this.bounceCd > 0 && (this.bounceCd -= t), this.dampCd > 0 && (this.dampCd -= t), this.sliceCd > 0 && (this.sliceCd -= t), (this.vel.x *= 1 - t / 10), (this.vel.y *= 1 - t / 2), (this.vel.z *= 1 - t / 2));
        Game.instance.grounds.length;
        0 == this.state && this.ground && (Knife.tempVec.copy(this.ground.pos), Knife.tempVec.sub(this.groundStartPos), Knife.tempVec.add(this.groundKnifePosStart), this.entity.setPosition(Knife.tempVec.x, Knife.tempVec.y, 0), this.bodyC.updatePoints(), this.bladeC.updatePoints());
        for (var s = 0.3333333333333333 * t, n = 0; n < 3; n++) {
            if (1 == this.state) {
                (Knife.tempVec2.set(0, -23 * s, 0), this.vel.add(Knife.tempVec2));
                var o = this.entity.getEulerAngles(),
                    a = Math.abs(MathUtil.angleDifference(o.z, 180)),
                    l = 1 - a / 40;
                (this.rotVel < -Knife.ROT_VEL_MAX && (this.rotVel = -Knife.ROT_VEL_MAX), this.vel.y > 28 && (this.vel.y = 28), this.vel.y < -25 && (this.vel.y = -25), this.vel.x > 4.2 && (this.vel.x = 4.2), l < 0 ? (this.rotVel = pc.math.lerp(this.rotVel, -Knife.ROT_VEL_MAX, 10 * s)) : this.dampCd <= 0 && (this.rotVel = pc.math.lerp(this.rotVel, -85, 17 * s)), this.dampCd <= 0 && this.sliceCd > 0 && o.z + 180 > 300 && a < 60 && ((o.z += MathUtil.angleDifference(o.z, 170) * s * 11), this.entity.setEulerAngles(o)), this.entity.rotate(0, 0, this.rotVel * s));
            }
            (Knife.tempVec.copy(this.vel), Knife.tempVec.mulScalar(s), Knife.tempVec.add(this.entity.getPosition()), Knife.tempVec.y > Game.instance.levelUpperPlank && (Knife.tempVec.y = pc.math.lerp(Knife.tempVec.y, Game.instance.levelUpperPlank, 0.25)), this.entity.setPosition(Knife.tempVec), this.bodyC.updatePoints(), this.bladeC.updatePoints(), this.bounceCd <= 0 && this.bodyC.checkAllCollisions(0), 0 != this.state && this.stuckCd <= 0 && this.bladeC.checkAllCollisions(0), this.bodyC.checkAllCollisions(2), this.bladeC.checkAllCollisions(2));
        }
        Game.state == Game.STATE_PLAYING && 1 == this.state && (Math.abs(this.bodyC.pos.y - Game.instance.levelUpperPlank) > 3 ? (UiInterface.instance.highFlyTime = 0) : (UiInterface.instance.highFlyTime += t), this.bodyC.pos.y > Game.instance.levelUpperPlank && this.vel.y > 0 && (this.vel.y = pc.math.lerp(this.vel.y, 0, 10 * t)), this.checkGroundCol());
    }));
var CameraController = pc.createScript('cameraController');
((CameraController.instance = null),
    CameraController.attributes.add('target', { type: 'entity' }),
    CameraController.attributes.add('camShift', { type: 'vec3', default: [0, 0, 0] }),
    CameraController.attributes.add('distance', { type: 'number', default: 10 }),
    CameraController.attributes.add('yaw', { type: 'number', default: 10 }),
    CameraController.attributes.add('pitch', { type: 'number', default: 10 }),
    CameraController.attributes.add('lerpSpeed', { type: 'number', default: 10 }),
    CameraController.attributes.add('lerpAngle', { type: 'number', default: 3 }),
    (CameraController.tempVec3 = new pc.Vec3(0, 0, 0)),
    (CameraController.instance = null),
    (CameraController.prototype.setupCurr = function () {
        ((this.pitchCurr = this.pitch), (this.yawCurr = this.yaw), (this.distanceCurr = this.distance), this.entity.setLocalEulerAngles(this.pitchCurr, this.yawCurr, 0));
    }),
    (CameraController.prototype.initialize = function () {
        (null == CameraController.instance && (CameraController.instance = this), (this.pitchCurr = this.pitch), (this.yawCurr = this.yaw), (this.distanceCurr = this.distance), (this.targetPos = new pc.Vec3(0, 0, 0)), (this.currPos = this.entity.getPosition().clone()), this.entity.setLocalEulerAngles(this.pitchCurr, this.yawCurr, 0));
    }),
    (CameraController.prototype.update = function (t) {
        if (Game.instance.paused) return 1;
        (t > 0.05 && (t = 0.05), this.target && (this.targetPos.copy(this.target.getPosition()), this.targetPos.add(this.camShift)), this.currPos.copy(this.entity.getLocalPosition()));
        var e = this.entity.getLocalEulerAngles();
        ((this.pitchCurr = pc.math.lerp(e.x, this.pitch, (t * this.lerpAngle) / 1)), (this.yawCurr = pc.math.lerp(e.y, this.yaw, (t * this.lerpAngle) / 1)), (this.distanceCurr = pc.math.lerp(this.distanceCurr, this.distance, t * this.lerpAngle)), this.entity.setLocalEulerAngles(this.pitchCurr, this.yawCurr, 0));
        var r = CameraController.tempVec3;
        (r.copy(this.entity.forward), r.scale(-this.distanceCurr), this.target && r.add(this.targetPos), this.currPos.lerp(this.currPos, r, t * this.lerpSpeed), this.entity.setLocalPosition(this.currPos));
    }));
var Blade = pc.createScript('blade');
((Blade.prototype.initialize = function () {
    this.inGround = !1;
}),
    (Blade.prototype.onTriggerEnter = function (t) {
        t.tags.has('ground') && (console.log(t.name), this.knife && this.knife.stuck(), (this.inGround = !0));
    }),
    (Blade.prototype.update = function (t) {}));
var Polygon = pc.createScript('polygon');
(Polygon.attributes.add('points', { type: 'entity', title: 'points', array: !0 }),
    Polygon.attributes.add('static', { type: 'boolean', default: !0 }),
    Polygon.attributes.add('colGroup', { type: 'number', default: 0 }),
    Polygon.attributes.add('isCircle', { type: 'boolean', default: !1 }),
    Polygon.attributes.add('radius', { type: 'number', default: -1 }),
    Polygon.attributes.add('polyFromCollisionBox', { type: 'boolean', default: !1 }),
    (Polygon.HASHMAP_SIZE = 15),
    (Polygon.TYPE_POLY = 0),
    (Polygon.TYPE_CIRC = 1),
    (Polygon.contactNormal = new pc.Vec3(0, 0, 0)),
    (Polygon.contactDepth = 0),
    (Polygon.polygons = []),
    (Polygon.prototype.initialize = function () {}),
    (Polygon.DRAW_DOTS = !1),
    (Polygon.initPolygonsOnEntity = function (o, t) {
        var i;
        if ((o.script && o.script.polygon && o.script.polygon.init(), t) && o.children) for (var n = 0; n < o.children.length; n++) ((i = o.children[n]), Polygon.initPolygonsOnEntity(i, t));
    }),
    (Polygon.prototype.getChildLocalPosition = function (o, t) {
        var i = o.getPosition().clone();
        if (null !== t) {
            var n = t.getWorldTransform().clone();
            (n.invert(), i.sub(t.getPosition()), n.transformPoint(i, i));
        }
        return i;
    }),
    (Polygon.prototype.init = function () {
        if (((this.initialized = !0), (this.zSize = 0), (this.pos = this.entity.getPosition()), (this.pps = []), (this.ns = []), (this.lps = []), (this.xid = 0), (this.yid = 0), this.updateHashId(), this.isCircle)) {
            if (((this.type = Polygon.TYPE_CIRC), this.points.length > 0)) {
                var o = this.points[0].getPosition();
                (Polygon.tempVec.copy(this.entity.getPosition()), Polygon.tempVec.sub(o), (this.radius = Polygon.tempVec.length()));
            }
        } else if (((this.type = Polygon.TYPE_POLY), 0 == this.points.length))
            if (this.polyFromCollisionBox) {
                var t = this.entity.collision.halfExtents.clone(),
                    i = this.entity.collision,
                    n = this.entity.getLocalScale();
                ((t.x *= 1 / n.x), (t.y *= 1 / n.y));
                var s = 1 / n.x;
                'cylinder' == i.type ? (this.addLocalPoint(-i.radius * s, (0.5 * i.height) / n.y), this.addLocalPoint(i.radius * s, (0.5 * i.height) / n.y), this.addLocalPoint(i.radius * s, (0.5 * -i.height) / n.y), this.addLocalPoint(-i.radius * s, (0.5 * -i.height) / n.y)) : (this.entity.script && this.entity.script.sliceable && this.entity.script.sliceable.complexSlice && (this.zSize = 2 * t.z), this.addLocalPoint(-t.x, t.y), this.addLocalPoint(t.x, t.y), this.addLocalPoint(t.x, -t.y), this.addLocalPoint(-t.x, -t.y));
            } else {
                n = this.entity.getLocalScale();
                (this.addLocalPoint(-0.5, 0.5), this.addLocalPoint(0.5, 0.5), this.addLocalPoint(0.5, -0.5), this.addLocalPoint(-0.5, -0.5));
            }
        for (var e, l = 0; l < this.points.length; l++) ((e = this.points[l].getLocalPosition().clone()), this.lps.push(e), this.addPointData2(e), this.points[l].destroy());
        (this.updatePoints(), this.updateNormals(), (this.boundRadius = 0), this.updateBoundRadius(), Polygon.polygons.push(this));
    }),
    (Polygon.prototype.updateBoundRadius = function () {
        if (this.type == Polygon.TYPE_CIRC) return ((this.boundRadius = this.radius), 0);
        for (var o, t, i, n = 0; n < this.pps.length; n++) ((o = this.pps[n]), Polygon.tempVec.copy(this.pos), Polygon.tempVec.sub(o), ((i = Polygon.tempVec.lengthSq()) > t || null == t) && (t = i));
        this.boundRadius = Math.sqrt(t);
    }),
    (Polygon.prototype.update = function (o) {
        ((this.pos = this.entity.getPosition()), this.initialized && (this.static || (this.updatePoints(), this.updateHashId(), this.updateBoundRadius())));
    }),
    (Polygon.prototype.checkAllCollisions = function (o) {
        for (var t, i, n = 0; n < Polygon.polygons.length; n++)
            if ((t = Polygon.polygons[n]) && t.enabled && t.entity.enabled && t != this && t.colGroup == o && !(t.xid > this.xid + 1 || t.xid < this.xid - 1 || t.yid > this.yid + 1 || t.yid < this.yid - 1)) {
                if (t.zSize <= 0) {
                    if (Math.abs(this.pos.z - t.pos.z) >= 0.4) continue;
                } else if (this.pos.z < t.pos.z - 0.5 * t.zSize || this.pos.z > t.pos.z + 0.5 * t.zSize) continue;
                ((i = (this.boundRadius + t.boundRadius) * (this.boundRadius + t.boundRadius)), Polygon.tempVec.copy(t.pos), Polygon.tempVec.sub(this.pos), Polygon.tempVec.lengthSq() >= i || (this.checkCollision(t) && this.entity.fire('polygon:collision', t)));
            }
    }),
    (Polygon.prototype.updateHashId = function () {
        ((this.xid = Math.floor(this.pos.x / Polygon.HASHMAP_SIZE)), (this.yid = Math.floor(this.pos.y / Polygon.HASHMAP_SIZE)));
    }),
    (Polygon.prototype.updatePoints = function () {
        for (var o = this.entity.getWorldTransform(), t = 0; t < this.pps.length; t++) (o.transformPoint(this.lps[t], this.pps[t]), (this.pps[t].z = 0));
    }),
    (Polygon.prototype.localToGlobal = function (o, t) {
        return (t.copy(o), t.mul(this.entity.getLocalScale()), t.add(this.entity.getLocalPosition()), t);
    }),
    (Polygon.prototype.addLocalPoint = function (o, t) {
        var i = new pc.Entity('Point');
        (this.entity.addChild(i), i.setLocalPosition(o, t, 0), Polygon.DRAW_DOTS && i.addComponent('render', { type: 'sphere' }), i.setLocalScale(0.1, 0.1, 0.1), this.points.push(i));
    }),
    (Polygon.prototype.addGlobalPoint = function (o, t) {
        var i = new pc.Entity('Point');
        this.entity.addChild(i);
        var n = this.entity.getPosition();
        (i.setPosition(n.x + o, n.y + t, n.z), this.points.push(i));
    }),
    (Polygon.prototype.addPointData2 = function (o) {
        var t = o.clone();
        (this.pps.push(t), this.ns.push(new pc.Vec3(1, 0, 0)));
    }),
    (Polygon.prototype.addPointData = function (o) {
        var t = o.getPosition().clone();
        (this.pps.push(t), this.ns.push(new pc.Vec3(1, 0, 0)));
    }),
    (Polygon.prototype.updateNormals = function () {
        var o,
            t = this.pps.length;
        if (t > 1)
            for (var i = 0; i < t; i++) {
                ((o = this.ns[i]), i < t - 1 ? o.copy(this.pps[i + 1]) : o.copy(this.pps[0]), o.sub(this.pps[i]), o.set(-o.y, o.x, 0));
                var n = o.length();
                o.mulScalar(1 / n);
            }
    }),
    (Polygon.tempVec = new pc.Vec3()),
    (Polygon.tempVec2 = new pc.Vec3()),
    (Polygon.prototype.findContact = function (o) {
        var t, i, n, s;
        if (this.type == Polygon.TYPE_POLY) {
            var e,
                l = this.pps.length,
                p = o.pps.length;
            n = void 0;
            for (var y = 0; y < l; y++) {
                ((h = this.pps[y]), (i = void 0));
                for (var a = 0; a < p; a++) ((e = o.pps[a]), Polygon.tempVec.copy(e), Polygon.tempVec.sub(h), (t = this.ns[y].x * Polygon.tempVec.x + this.ns[y].y * Polygon.tempVec.y) > 0 || (((t = -t) > i || null == i) && (i = t)));
                (n > i || null == n) && ((n = i), (s = y));
            }
            return ((Polygon.contactDepth = n), Polygon.contactNormal.copy(this.ns[s]), Polygon.contactNormal);
        }
        if (this.type == Polygon.TYPE_CIRC) {
            var h, r, c, P, g;
            for (p = o.pps.length, y = 0; y < p; y++) ((h = o.pps[y]), Polygon.tempVec.copy(h), Polygon.tempVec.sub(this.pos), (r = Polygon.tempVec.lengthSq()), (null == c || r < c) && ((c = r), (P = y)));
            return ((h = o.pps[P]), Polygon.tempVec.copy(h), Polygon.tempVec.sub(this.pos), (Polygon.tempVec.z = 0), (g = Polygon.tempVec.length()), Polygon.tempVec.mulScalar(1 / g), (t = this.radius - g), (Polygon.contactDepth = t), Polygon.contactNormal.copy(Polygon.tempVec), Polygon.contactNormal);
        }
    }),
    (Polygon.polyCircCollision = function (o, t) {
        if (Polygon.pointPolyCollision(t.pos, o)) return !0;
        for (var i, n, s = o.pps.length, e = 0, l = s - 1; e < s; l = e++) if (((i = o.pps[e]), (n = o.pps[l]), Polygon.pointLineSegmentDistance(t.pos, i, n) < t.radius)) return !0;
        return !1;
    }),
    (Polygon.polygonEdges = function (o) {
        return o.pps.map(function (t, i) {
            return i ? [o.pps[i - 1], t] : [o.pps[o.pps.length - 1], t];
        });
    }),
    (Polygon.pointPolyCollision = function (o, t) {
        for (var i, n, s = t.pps.length, e = 0, l = s - 1, p = o.x, y = o.y, a = !1; e < s; l = e++) ((i = t.pps[e]), (n = t.pps[l]), (i.y > y) ^ (n.y > y) && p < ((n.x - i.x) * (y - i.y)) / (n.y - i.y) + i.x && (a = !a));
        return a;
    }),
    (Polygon.pointLineSegmentDistance = function (o, t, i) {
        var n,
            s,
            e = t,
            l = i;
        return Math.sqrt(Polygon.pointPointSquaredDistance(o, (n = Polygon.pointPointSquaredDistance(e, l)) ? ((s = ((o.x - t.x) * (l.x - t.x) + (o.y - t.y) * (l.y - e.y)) / n) < 0 ? t : s > 1 ? l : new pc.Vec3(t.x + s * (l.x - t.x), t.y + s * (l.y - t.y), 0)) : e));
    }),
    (Polygon.pointLineSegmentDistance2 = function (o, t, i) {
        var n,
            s,
            e = t,
            l = i;
        return (Polygon.pointPointSquaredDistance(e, l), Math.sqrt(pointPointSquaredDistance(o, (n = Polygon.pointPointSquaredDistance(e, l)) ? ((s = ((o.x - t.x) * (l.x - t.x) + (o.y - t.y) * (l.y - e.y)) / n) < 0 ? t : s > 1 ? l : new pc.Vec3(t.x + s * (l.x - t.x), t.y + s * (l.y - t.y), 0)) : e)));
    }),
    (Polygon.pointPointSquaredDistance = function (o, t) {
        var i = o.x - t.x,
            n = o.y - t.y;
        return i * i + n * n;
    }),
    (Polygon.polyPolyCollision = function (o, t) {
        var i,
            n,
            s,
            e,
            l,
            p,
            y,
            a,
            h,
            r = o.pps,
            c = t.pps,
            P = [r, c];
        for (e = 0; e < 2; e++) {
            var g = P[e];
            for (h = g.length, l = 0; l < h; l++) {
                var d = (l + 1) % h,
                    u = g[l],
                    f = g[d],
                    m = Polygon.tempVec;
                for (m.set(f.y - u.y, u.x - f.x), i = n = void 0, p = 0; p < r.length; p++) ((s = m.x * r[p].x + m.y * r[p].y), (null == i || s < i) && (i = s), (null == n || s > n) && (n = s));
                for (y = a = void 0, p = 0; p < c.length; p++) ((s = m.x * c[p].x + m.y * c[p].y), (null == y || s < y) && (y = s), (null == a || s > a) && (a = s));
                if (n < y || a < i) return !1;
            }
        }
        return !0;
    }),
    (Polygon.prototype.checkIfUnderLine = function (o) {
        if (this.type == Polygon.TYPE_POLY) {
            for (var t = 0; t < this.pps.length; t++) if (this.pps[t].y < o) return !0;
        } else if (this.type == Polygon.TYPE_CIRC && this.pos.y - this.radius < o) return !0;
        return !1;
    }),
    (Polygon.prototype.checkCollision = function (o) {
        return o.type == Polygon.TYPE_POLY && this.type == Polygon.TYPE_POLY ? Polygon.polyPolyCollision(this, o) : o.type == Polygon.TYPE_CIRC && this.type == Polygon.TYPE_POLY ? Polygon.polyCircCollision(this, o) : o.type == Polygon.TYPE_POLY && this.type == Polygon.TYPE_CIRC ? Polygon.polyCircCollision(o, this) : void 0;
    }));
var PolygonTest = pc.createScript('polygonTest');
(PolygonTest.attributes.add('poly2', { type: 'entity' }),
    (PolygonTest.prototype.initialize = function () {
        ((this.p1 = this.entity.script.polygon), (this.p2 = this.poly2.script.polygon));
    }),
    (PolygonTest.prototype.update = function (t) {
        this.app.keyboard.wasPressed(pc.KEY_A) && (this.p1.updatePoints(), this.p1.checkCollision(this.p2) && (console.log('push out'), this.p2.pushOut(this.p1, this.p1.entity)));
    }));
var Sliceable = pc.createScript('sliceable');
(Sliceable.attributes.add('left', { type: 'entity' }),
    Sliceable.attributes.add('right', { type: 'entity' }),
    Sliceable.attributes.add('full', { type: 'entity' }),
    Sliceable.attributes.add('price', { type: 'number', default: 1 }),
    Sliceable.attributes.add('kinematicOneSide', { type: 'boolean', default: !1 }),
    Sliceable.attributes.add('complexSlice', { type: 'boolean', default: !1 }),
    Sliceable.attributes.add('baseMat', { type: 'asset', assetType: 'material' }),
    Sliceable.attributes.add('innerMat', { type: 'asset', assetType: 'material' }),
    Sliceable.attributes.add('mat', { type: 'asset', assetType: 'material' }),
    Sliceable.attributes.add('matVnutri', { type: 'asset', assetType: 'material' }),
    Sliceable.attributes.add('multicolorVnutri', { type: 'boolean', default: !1 }),
    Sliceable.attributes.add('static', { type: 'boolean', default: !1 }),
    Sliceable.attributes.add('staticOneSide', { type: 'boolean', default: !1 }),
    Sliceable.attributes.add('randomMat', { array: !0, type: 'asset', assetType: 'material' }),
    Sliceable.attributes.add('sameInnerAsBase', { type: 'boolean', default: !1 }),
    Sliceable.attributes.add('emitId', { type: 'number', default: -1 }),
    Sliceable.attributes.add('emitCount', { type: 'number', default: 5 }),
    Sliceable.attributes.add('emitRadius', { type: 'number', default: 0 }),
    Sliceable.attributes.add('emitColor', { type: 'rgba' }),
    Sliceable.attributes.add('emitColorFromDiffuse', { type: 'boolean', default: !1 }),
    (Sliceable.prototype.initialize = function () {
        if (((this.kickCd = 0), (this.kick2Cd = 0), ('CubeComplex' != this.entity.name && 'Tube' != this.entity.name && 'TubeVert' != this.entity.name && 'Cube' != this.entity.name && 'RoundCube' != this.entity.name) || ((this.baseMat = Game.instance.baseMatGrey), (this.innerMat = Game.instance.innerMatGrey), EntityTools.setMaterial(this.full, this.baseMat)), 'Sphere' == this.entity.name && ((this.baseMat = Game.instance.baseMatGrey), (this.innerMat = Game.instance.innerMatGrey)), this.left && (this.left.enabled = !1), this.right && (this.right.enabled = !1), this.entity.script.polygon && (this.entity.script.polygon.colGroup = 2), this.entity.rigidbody)) {
            var t = this.entity.rigidbody;
            (this.complexSlice ? (t.linearFactor = new pc.Vec3(1, 1, 1)) : (t.linearFactor = new pc.Vec3(1, 1, 0)), (t.angularFactor = new pc.Vec3(0, 0, 1)));
        }
        if ((this.static && (this.entity.rigidbody.type = 'static'), this.staticOneSide && ((this.left.rigidbody.type = 'static'), this.left.translate(0, 0, -0.04)), this.kinematicOneSide && (this.left.rigidbody.type = 'kinematic'), this.multicolorVnutri && (this.matVnutri = StackCreator.getStackColor()), this.sameInnerAsBase && (this.matVnutri = this.baseMat), this.matVnutri && this.matVnutri != this.innerMat && this.innerMat && (EntityTools.changeMaterial(this.left.children[0], this.innerMat, this.matVnutri), EntityTools.changeMaterial(this.right.children[0], this.innerMat, this.matVnutri)), this.randomMat.length > 0)) {
            var e = this.randomMat[MathUtil.getRandomInt(this.randomMat.length)];
            ((this.mat = e), this.changeBaseMat(e));
        } else this.mat && this.changeBaseMat(this.mat);
    }),
    (Sliceable.prototype.changeBaseMat = function (t) {
        ((this.mat = t), this.full && EntityTools.changeMaterial(this.full, this.baseMat, t), this.left && EntityTools.changeMaterial(this.left.children[0], this.baseMat, t), this.right && EntityTools.changeMaterial(this.right.children[0], this.baseMat, t));
    }),
    (Sliceable.prototype.update = function (t) {
        (this.kickCd > 0 && (this.kickCd -= t), this.kick2Cd > 0 && (this.kick2Cd -= t));
    }),
    (Sliceable.prototype.emitDrops = function (t, e) {
        for (var i = 0; i < e; i++) EffectDrop.create(t, pc.math.random(0.4, 0.7), new pc.Vec3(pc.math.random(-4, 4), pc.math.random(4, 9), pc.math.random(-4, 4)), 0);
    }),
    (Sliceable.prototype.kick = function (t, e) {
        if (this.kick2Cd > 0) return 1;
        var i = this.entity.rigidbody;
        this.static && ((this.kick2Cd = 0.1), (this.static = !1), (i.type = 'dynamic'), this.entity.script.polygon.pos.z < t.z ? (i.applyTorque(55, 0, 0), i.applyImpulse(0, 0, -0.1)) : (i.applyTorque(-55, 0, 0), i.applyImpulse(0, 0, 0.1)), (i.angularFactor = new pc.Vec3(1, 0, 1)));
    }),
    (Sliceable.temp = new pc.Vec3(0, 0, 0)),
    (Sliceable.temp2 = new pc.Vec3(0, 0, 0)),
    (Sliceable.innerMatId = 0),
    (Sliceable.prototype.slice = function (t) {
        if (((this.entity.enabled = !1), this.complexSlice)) {
            var e = t;
            (this.left.setLocalScale(1, 1, 2 * e), this.right.setLocalScale(1, 1, 2 * (1 - e)), this.left.setLocalPosition(0, 0, e / 2 - 0.5), this.right.setLocalPosition(0, 0, 0.5 - (1 - e) / 2));
            var i = this.entity.script.polygon,
                a = this.entity.collision.halfExtents;
            Game.instance.kickSliceablesOnPos(i.pos, a.x, 2 * a.y);
        }
        var s;
        (this.kinematicOneSide ? EntityTools.reparent(this.left, this.entity.parent) : EntityTools.reparent(this.left, Game.instance.levelObjectsSliced), EntityTools.reparent(this.right, Game.instance.levelObjectsSliced), 'Tube' == this.entity.name && (this.left.rigidbody.angularFactor.set(1, 1, 0.1), this.right.rigidbody.angularFactor.set(1, 1, 0.1)));
        (this.left && ((this.left.enabled = !0), this.left.script && this.left.script.physScaler && this.left.script.physScaler.init(), (s = this.left.rigidbody).applyImpulse(0, 0, -7), s.applyTorque(-45, 0, 0)), this.right && (this.right.script && this.right.script.physScaler && this.right.script.physScaler.init(), (this.right.enabled = !0), (s = this.right.rigidbody).applyImpulse(0, 0, 7), s.applyTorque(45, 0, 0)));
        var l,
            n = this.entity.getPosition(),
            r = '+' + this.price.toString() + ' $',
            c = 0.8;
        if ((this.price > 10 ? ((l = Game.instance.yellowColor), (c = 1.2)) : this.price >= 5 ? ((l = Game.instance.greenColor), (c = 1)) : ((l = Game.instance.whiteColor), (c = 0.8)), (l = Game.bonusLevel ? Game.instance.yellowColor : Game.instance.whiteColor), Game.instance.showText(r, n.x, n.y, l, 1, c), Game.instance.addMoney(this.price, !0), (this.emitCount *= 0.3), this.emitId >= 0 && this.emitCount > 0)) {
            this.emitColorFromDiffuse && (this.mat ? (this.emitColor = this.mat.resource.diffuse) : this.baseMat && (this.emitColor = this.baseMat.resource.diffuse));
            for (var h = 0; h < this.emitCount; h++) this.emitRadius > 0 ? (Sliceable.temp.copy(n), (Sliceable.temp.x += pc.math.random(-this.emitRadius, this.emitRadius)), (Sliceable.temp.y += pc.math.random(-this.emitRadius, this.emitRadius)), (Sliceable.temp.z += pc.math.random(-this.emitRadius, this.emitRadius)), Sliceable.temp2.set(pc.math.random(-7, 7), pc.math.random(4, 7), pc.math.random(-4, 4)), EffectDrop.create(Sliceable.temp, pc.math.random(0.3, 0.5) + 0.25 * this.emitRadius, Sliceable.temp2, this.emitId, this.emitColor)) : (Sliceable.temp2.set(pc.math.random(-7, 7), pc.math.random(4, 7), pc.math.random(-4, 4)), EffectDrop.create(n, pc.math.random(0.3, 0.5), Sliceable.temp2, this.emitId, this.emitColor));
        }
    }));
var StackCreator = pc.createScript('stackCreator');
(StackCreator.attributes.add('count', { type: 'number', default: 1 }),
    StackCreator.attributes.add('isFigure', { type: 'boolean', default: !1 }),
    StackCreator.attributes.add('yDistance', { type: 'number', default: 1 }),
    StackCreator.attributes.add('zRandom', { type: 'number', default: 0 }),
    StackCreator.attributes.add('yRandomAngle', { type: 'number', default: 0 }),
    StackCreator.attributes.add('static', { type: 'boolean', default: !1 }),
    StackCreator.attributes.add('staticOneSide', { type: 'boolean', default: !1 }),
    StackCreator.attributes.add('mats', { type: 'asset', assetType: 'material', array: !0 }),
    StackCreator.attributes.add('multicolorVnutri', { type: 'boolean', default: !1 }),
    StackCreator.attributes.add('sideStack', { type: 'boolean', default: !1 }),
    (StackCreator.prototype.init = function () {
        for (var t, a, e, i = this.entity.getPosition(), r = new pc.Vec3(), n = 1, s = this.entity.getLocalEulerAngles(), o = 0, c = 1, d = this.count - 1; d >= 0; d--)
            (d > 0 ? (t = this.entity.clone()).script.destroy('stackCreator') : (t = this.entity),
                (e = t.script.sliceable),
                this.static && ((t.rigidbody.type = 'static'), (t.script.polygon.static = !0)),
                this.staticOneSide && ((e.left.rigidbody.type = 'static'), (r.z = -0.04)),
                e.baseMat && this.mats.length > 0 && ((e.mat = this.mats[o]), 0 == d && e.changeBaseMat(this.mats[o]), this.mats.length > 1 && ((o += c), c > 0 && o >= this.mats.length - 1 ? ((o = this.mats.length - 1), (c = -1)) : c < 0 && o <= 0 && ((o = 0), (c = 1)))),
                this.multicolorVnutri && ((e.matVnutri = StackCreator.getStackColor()), 0 == d && (EntityTools.changeMaterial(e.left.children[0], e.innerMat, e.matVnutri), EntityTools.changeMaterial(e.right.children[0], e.innerMat, e.matVnutri))),
                this.isFigure && ((a = t.getLocalScale()), (n = 0.75 + 0.25 * Math.cos((3.14 * d) / 10)), t.setLocalScale(a.x, a.y, a.z * n)),
                r.copy(i),
                this.sideStack ? (r.x += d * this.yDistance) : (r.y += d * this.yDistance),
                0 != this.zRandom && (r.z += pc.math.random(-this.zRandom, this.zRandom)),
                this.yRandomAngle > 0 && ((t.rigidbody.angularFactor = new pc.Vec3(0, 1, 1)), t.setLocalEulerAngles(s.x, s.y + pc.math.random(-this.yRandomAngle, this.yRandomAngle), s.z)),
                d > 0 && (this.entity.parent.addChild(t), t.rigidbody ? t.rigidbody.teleport(r) : t.setPosition(r)));
    }),
    (StackCreator.getStackColor = function () {
        return (Sliceable.innerMatId++, Sliceable.innerMatId >= Game.instance.innerMat.length && (Sliceable.innerMatId = 0), Game.instance.innerMat[Sliceable.innerMatId]);
    }),
    (StackCreator.prototype.update = function (t) {}));
var Effect3ddrop = pc.createScript('effect3ddrop');
((Effect3ddrop.grav = new pc.Vec3(0, -15, 0)),
    (Effect3ddrop.temp = new pc.Vec3(0, 0, 0)),
    (Effect3ddrop.create = function (t, e) {
        var i = ObjectPool.instantiate('Effect3DDrop', t, Game.instance.app.root);
        return ((i.render.meshInstances[0].material = e), i.render.meshInstances[0].material.update(), i);
    }),
    (Effect3ddrop.prototype.initialize = function () {
        ((this.vel = new pc.Vec3(0, 0, 0)), (this.damping = 0.01), (this.size = 1), (this.material = this.entity.render.meshInstances[0].material), this.onEnable(), this.on('enable', this.onEnable, this));
    }),
    (Effect3ddrop.prototype.onEnable = function () {
        ((this.vel = new pc.Vec3(pc.math.random(-4, 4), pc.math.random(3, 8), pc.math.random(-4, 4))), (this.size = pc.math.random(0.15, 0.3)));
    }),
    (Effect3ddrop.prototype.update = function (t) {
        (Effect3ddrop.temp.copy(Effect3ddrop.grav), Effect3ddrop.temp.scale(t), this.vel.add(Effect3ddrop.temp), this.vel.scale(1 - this.damping * t), Effect3ddrop.temp.copy(this.vel), Effect3ddrop.temp.scale(t), this.entity.translate(Effect3ddrop.temp));
        var e = this.entity.getPosition();
        if ((e.add(this.vel), this.entity.lookAt(e), (this.size -= 0.3 * t), this.size <= 0)) ObjectPool.push(this.entity);
        else {
            var i = pc.math.clamp(this.vel.length() / 10, 1, 4);
            this.entity.setLocalScale(this.size, this.size, this.size * i);
        }
    }));
var PhysScaler = pc.createScript('physScaler');
(PhysScaler.attributes.add('initialScale', { type: 'vec3', default: [0, 0, 0] }),
    PhysScaler.attributes.add('initialHalfExtents', { type: 'vec3', default: [0, 0, 0] }),
    PhysScaler.attributes.add('initialRadius', { type: 'number', default: 0 }),
    PhysScaler.attributes.add('initialHeight', { type: 'number', default: 0 }),
    PhysScaler.attributes.add('initialPolyRadius', { type: 'number', default: 0 }),
    (PhysScaler.tempVec = new pc.Vec3()),
    (PhysScaler.prototype.init = function () {
        var e = this.entity.getLocalScale();
        (PhysScaler.tempVec.copy(e), PhysScaler.tempVec.div(this.initialScale));
        var t = Math.max(PhysScaler.tempVec.x, PhysScaler.tempVec.y, PhysScaler.tempVec.z),
            i = this.entity.collision;
        i && ('box' == i.type ? (PhysScaler.tempVec.mul(this.initialHalfExtents), (i.halfExtents = PhysScaler.tempVec.clone())) : 'sphere' == i.type ? (i.radius = t * this.initialRadius) : 'cylinder' == i.type && ((i.radius = PhysScaler.tempVec.x * this.initialRadius), (i.height = PhysScaler.tempVec.y * this.initialHeight)));
        var a = this.entity.script.polygon;
        (a && a.isCircle && (a.radius = t * this.initialPolyRadius), this.entity.script.destroy('physScaler'));
    }));
var GameText = pc.createScript('gameText');
(GameText.attributes.add('glow', { type: 'entity' }),
    (GameText.prototype.initialize = function () {
        ((this.hideDelay = 1), (this.fadeOpacity = !1));
    }),
    (GameText.prototype.animate = function (t, e = 1, i = 0) {
        ((this.hideAnimType = t), (this.time = 0), (this.state = 1), (this.appearTime = 0.3), (this.showTime = 0.55), (this.hideTime = 0.2), (this.fadeOpacity = !0), (this.scaleMax = e), (this.entity.element.opacity = 1), this.entity.setLocalScale(1, 1, 1));
    }),
    (GameText.prototype.update = function (t) {
        var e;
        ((this.time += t), 1 == this.state && ((e = this.time / this.appearTime) >= 1 && ((e = 1), (this.state = 2), (this.time = 0)), 2 == this.hideAnimType ? (this.entity.translateLocal(0, -500 * t, 0), (this.entity.element.opacity = e), (e = this.scaleMax), this.entity.setLocalScale(e, e, e)) : ((e *= this.scaleMax), this.entity.setLocalScale(e, e, e))), 2 == this.state && ((e = this.time / this.showTime) >= 1 && ((e = 1), (this.state = 3), (this.time = 0)), 1 == this.hideAnimType ? this.entity.translateLocal(0, 50 * t, 0) : ((e = this.scaleMax + 0.1 * e), this.entity.setLocalScale(e, e, e), this.entity.translateLocal(0, -50 * t, 0))), 3 == this.state && ((e = 1 - this.time / this.hideTime) <= 0 && ((e = 0), ObjectPool.push(this.entity)), 1 == this.hideAnimType ? ((this.entity.element.opacity = e), this.entity.translateLocal(0, 400 * t, 0)) : (this.entity.element.opacity = e)));
    }));
var FinishController = pc.createScript('finishController');
(FinishController.attributes.add('blocks', { type: 'entity', array: !0 }),
    FinishController.attributes.add('textEntity', { type: 'entity' }),
    FinishController.attributes.add('lastBlock', { type: 'entity' }),
    FinishController.attributes.add('flag', { type: 'entity' }),
    (FinishController.instance = null),
    (FinishController.blockData = []),
    (FinishController.prototype.setBestBlockType = function () {
        for (var t, e, o = 0; o < FinishController.blockData.length && 50 != (t = FinishController.blockData[o]).count; o++);
        var r,
            l,
            i = FinishController.blockData[0].blockType,
            a = this.applyOperatorData(100, i);
        e = FinishController.blockData[0];
        for (o = 1; o < FinishController.blockData.length; o++) ((l = FinishController.blockData[o].blockType), (r = this.applyOperatorData(100, l)) > a && ((a = r), (i = l), (e = FinishController.blockData[o])));
        ((l = t.blockType), (t.blockType = e.blockType), (e.blockType = l));
    }),
    (FinishController.prototype.placeBlocks2 = function (t) {
        var e, o, r, l;
        ((this.flag.enabled = !1), this.generateRandomBlockData());
        for (var i, a, n = 0, s = 0; s < this.blocks.length; s++) {
            l = this.blocks[s];
            for (var p = 0; p < FinishController.blockData.length; p++) (2 == (e = FinishController.blockData[p]).count && e.entity, l == e.entity && ((e.blockType = this.blockTypes[n]), n++));
        }
        (MathUtil.shuffleArray(FinishController.blockData), ((o = this.blocks[0].getLocalPosition().clone()).y = 0), (r = this.textEntity.getLocalPosition().clone()));
        for (p = 0; p < FinishController.blockData.length; p++) ((a = (e = FinishController.blockData[p]).blockType), 50 == e.count && (i = e), (e.text.element.text = a.text), (o.y += 0.5 * e.sizeY), e.entity.setLocalPosition(o.x, o.y, o.z), e.text.setLocalPosition(r.x, o.y, r.z), (o.y += 0.5 * e.sizeY));
        (t ? ((i.text.element.text = 'BONUS!'), (i.text.script.scaler.enabled = !0)) : ((i.text.script.scaler.enabled = !1), i.text.setLocalScale(0.01, 0.01, 0.01)), (o.y += 0.5 * this.lastBlockSizeY), this.lastBlock.setLocalPosition(o.x, o.y, o.z));
    }));
var OperatorType = { ADD: { symbol: '+', maxCount: 500, minCount: 10 }, SUBTRACT: { symbol: '-', maxCount: 100, minCount: 5 }, MULTIPLY: { symbol: 'x', maxCount: 10, minCount: 2 }, DIVIDE: { symbol: '÷', maxCount: 10, minCount: 2 } };
((FinishController.prototype.generateRandomBlockData = function () {
    ((this.blockTypes = []), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.sort((t, e) => t.weight - e.weight));
}),
    (FinishController.prototype.generateRandomBlockData2 = function () {
        ((this.blockTypes = []), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.push(this.createBlock(OperatorType.ADD)), this.blockTypes.push(this.createBlock(OperatorType.MULTIPLY)), this.blockTypes.push(this.createBlock(OperatorType.ADD)));
        var t,
            e = this.getRandomNegativeOperator();
        ((t = Math.random() > 0.6 ? (OperatorType.SUBTRACT, OperatorType.DIVIDE) : this.getRandomPositiveOperator()), this.blockTypes.push(this.createBlock(e)), this.blockTypes.push(this.createBlock(t)), this.blockTypes.sort((t, e) => t.weight - e.weight));
    }),
    (FinishController.prototype.getRandomPositiveOperator = function () {
        var t = [OperatorType.ADD, OperatorType.MULTIPLY];
        return t[Math.floor(Math.random() * t.length)];
    }),
    (FinishController.prototype.getRandomNegativeOperator = function () {
        var t = [OperatorType.SUBTRACT, OperatorType.DIVIDE];
        return t[Math.floor(Math.random() * t.length)];
    }),
    (FinishController.prototype.getRandomOperator = function () {
        var t = [OperatorType.ADD, OperatorType.SUBTRACT, OperatorType.MULTIPLY, OperatorType.DIVIDE];
        return t[Math.floor(Math.random() * t.length)];
    }),
    (FinishController.prototype.createBlock = function (t) {
        var e = t.maxCount;
        this.getRandomCount(e, t.minCount);
        t == OperatorType.ADD && Math.random() < 0.8 && this.getRandomCount(10, 100);
        var o = [2, 3, 5, 10, 25, 50][this.blockTypes.length];
        t = OperatorType.MULTIPLY;
        var r = { text: this.generateBlockText(o, t), value: o, operator: t, weight: 100 };
        return ((r.weight = this.applyOperatorData(100, r)), r);
    }),
    (FinishController.prototype.getRandomCount = function (t, e) {
        return Math.floor(Math.random() * (t - e)) + 1 + e;
    }),
    (FinishController.prototype.beautifyNumber = function (t, e) {
        var o = t;
        if (t < 5) ((o = Math.max(t, 2)), (e != OperatorType.ADD && e != OperatorType.SUBTRACT) || (o = 5));
        else if (t <= 10) o = e == OperatorType.ADD || e == OperatorType.SUBTRACT ? [5, 10][Math.floor(2 * Math.random())] : t;
        else if (t <= 100) {
            var r = (l = [10, 5])[Math.floor(Math.random() * l.length)];
            o = Math.floor(t / r) * r;
        } else if (t <= 500) {
            var l;
            r = (l = [5, 10])[Math.floor(Math.random() * l.length)];
            o = Math.floor(t / r) * r;
        }
        return o;
    }),
    (FinishController.prototype.applyOperatorData = function (t, e) {
        var o = t;
        return (e.operator == OperatorType.MULTIPLY ? (o *= e.value) : e.operator == OperatorType.DIVIDE ? (o /= e.value) : e.operator == OperatorType.ADD ? (o += e.value) : e.operator == OperatorType.SUBTRACT && (o -= e.value), Math.round(o));
    }),
    (FinishController.prototype.generateBlockText = function (t, e) {
        var o = '';
        return (e == OperatorType.MULTIPLY ? (o = 'x ' + t.toString()) : e == OperatorType.DIVIDE ? (o = '÷ ' + t.toString()) : e == OperatorType.ADD ? (o = '+ ' + t.toString()) : e == OperatorType.SUBTRACT && (o = '- ' + t.toString()), o);
    }),
    (FinishController.prototype.initialize = function () {
        FinishController.instance = this;
        for (var t, e, o = [2, 3, 5, 10, 25, 50], r = 0; r < this.blocks.length; r++) (((t = this.textEntity.clone()).element.text = o[r].toString() + ' x'), this.entity.addChild(t), (e = this.blocks[r].getLocalScale().y), FinishController.blockData.push({ text: t, count: o[r], entity: this.blocks[r], sizeY: e, blockType: {} }));
        ((this.textEntity.enabled = !1), (this.lastBlockSizeY = this.lastBlock.getLocalScale().y), this.placeBlocks());
    }),
    (FinishController.prototype.getBlockData = function (t) {
        for (var e, o = 0; o < FinishController.blockData.length; o++) if ((e = FinishController.blockData[o]).entity == t) return e;
        return null;
    }),
    (FinishController.prototype.findBlockByPosition = function (t) {
        for (var e = 0; e < FinishController.blockData.length; e++) {
            var o = FinishController.blockData[e],
                r = o.entity,
                l = r.getPosition(),
                i = (r.getLocalScale(), l.y - 0.5 * o.sizeY),
                a = l.y + 0.5 * o.sizeY;
            if (t.y > i && t.y < a) return o;
        }
        return null;
    }),
    (FinishController.prototype.getBlockOperator = function (t) {
        for (var e, o = 0; o < FinishController.blockData.length; o++) if ((e = FinishController.blockData[o]).entity == t) return e.blockType;
        return null;
    }),
    (FinishController.prototype.placeBlocks = function (t) {
        var e, o, r, l;
        ((this.flag.enabled = !1), MathUtil.shuffleArray(FinishController.blockData), ((o = this.blocks[0].getLocalPosition().clone()).y = 0), (r = this.textEntity.getLocalPosition().clone()));
        for (var i = 0; i < FinishController.blockData.length; i++) (50 == (e = FinishController.blockData[i]).count && (l = e), (o.y += 0.5 * e.sizeY), e.entity.setLocalPosition(o.x, o.y, o.z), e.text.setLocalPosition(r.x, o.y, r.z), (o.y += 0.5 * e.sizeY));
        (t ? ((l.text.element.text = 'BONUS!'), (l.text.script.scaler.enabled = !0)) : ((l.text.element.text = '50 x'), (l.text.script.scaler.enabled = !1), l.text.setLocalScale(0.01, 0.01, 0.01)), (o.y += 0.5 * this.lastBlockSizeY), this.lastBlock.setLocalPosition(o.x, o.y, o.z));
    }),
    (FinishController.prototype.update = function (t) {}),
    (FinishController.prototype.showFlag = function () {
        (setTimeout(function () {
            GameAudio.play('cracker');
            for (var t = FinishController.instance.entity.getPosition(), e = 0; e < 59; e++) Serpantine.create(t);
        }, 500),
            this.flag.setEulerAngles(0, 0, 90),
            (this.flag.enabled = !0),
            this.flag.tween(this.flag.getLocalEulerAngles()).rotate({ x: 0, y: 0, z: 0 }, 0.75, pc.BounceOut).loop(!1).yoyo(!1).start());
    }));
var MaterialBlinker = pc.createScript('materialBlinker');
((MaterialBlinker.prototype.initialize = function () {
    var i, t, s;
    ((this.meshInstances = this.entity.model ? this.entity.model.meshInstances : this.entity.render.meshInstances), (this.mats = []), (this.matsB = []), (this.blinkAlpha = 0), (this.blinkSpeed = 1), (this.blinkTarget = 1), (this.blinkCount = 0), (this.blinkColor = new pc.Color().fromString('#FFFFFF')));
    for (var e = 0; e < this.meshInstances.length; e++) ((t = (i = this.meshInstances[e]).material), this.mats.push(t), (s = t.clone()), this.matsB.push(s), (i.material = s));
}),
    (MaterialBlinker.prototype.start = function (i, t) {
        ((this.blinkSpeed = i), (this.blinkCount = t));
    }),
    (MaterialBlinker.prototype.update = function (i) {
        if (0 == this.blinkCount) return 1;
        var t, s;
        ((this.blinkAlpha += this.blinkSpeed * i), this.blinkSpeed > 0 && this.blinkAlpha >= this.blinkTarget ? ((this.blinkSpeed = -this.blinkSpeed), (this.blinkAlpha = this.blinkTarget)) : this.blinkSpeed < 0 && this.blinkAlpha < 0 && ((this.blinkSpeed = -this.blinkSpeed), (this.blinkAlpha = 0), this.blinkCount > 0 && this.blinkCount--, this.blinkCount <= 0 && (this.blinkCount = 0)));
        for (var e = 0; e < this.matsB.length; e++) ((t = this.matsB[e]), (s = this.mats[e]), t.emissive.lerp(s.emissive, this.blinkColor, this.blinkAlpha), t.update());
    }));
var Environment = pc.createScript('environment');
((Environment.instance = null),
    Environment.attributes.add('grounds', { type: 'entity', array: !0 }),
    Environment.attributes.add('lights', { type: 'entity', array: !0 }),
    Environment.attributes.add('fogColors', { type: 'rgba', array: !0 }),
    Environment.attributes.add('backgrounds', { type: 'entity', array: !0 }),
    Environment.attributes.add('environments', { type: 'entity', array: !0 }),
    Environment.attributes.add('snow', { type: 'entity' }),
    (Environment.prototype.initialize = function () {
        ((Environment.instance = this), (this.type = 0), (this.groundsAr = []), (this.groundsCount = 0), (this.groundsId = 0), (this.groundLastPos = new pc.Vec3(0, 0, 0)), (this.envTypes = [1, 3, 4, 5]), (this.envId = 0), EntityTools.enableSingleInArray(this.grounds, -1));
    }),
    (Environment.prototype.setType = function (t) {
        ((this.type = t),
            (this.snow.enabled = !1),
            1 == this.type
                ? ((this.groundsId = 0), EntityTools.enableSingleInArray(this.backgrounds, 0), EntityTools.enableSingleInArray(this.environments, 0), EntityTools.enableSingleInArray(this.lights, 0), (this.app.scene.fogColor = this.fogColors[0]), (this.app.scene.fogStart = 50))
                : 2 == this.type
                  ? ((this.groundsId = 0), EntityTools.enableSingleInArray(this.backgrounds, 1), EntityTools.enableSingleInArray(this.environments, 0), EntityTools.enableSingleInArray(this.lights, 1), (this.app.scene.fogColor = this.fogColors[1]), (this.app.scene.fogStart = 500))
                  : 3 == this.type
                    ? ((this.groundsId = 1), EntityTools.enableSingleInArray(this.backgrounds, 2), EntityTools.enableSingleInArray(this.environments, 1), EntityTools.enableSingleInArray(this.lights, 0), (this.app.scene.fogColor = this.fogColors[2]), (this.app.scene.fogStart = 100))
                    : 4 == this.type
                      ? ((this.groundsId = 2), EntityTools.enableSingleInArray(this.backgrounds, 0), EntityTools.enableSingleInArray(this.environments, 2), EntityTools.enableSingleInArray(this.lights, 0), (this.app.scene.fogColor = this.fogColors[4]), (this.app.scene.fogStart = 150), (this.snow.enabled = !0))
                      : 5 == this.type
                        ? ((this.groundsId = 3), EntityTools.enableSingleInArray(this.backgrounds, 1), EntityTools.enableSingleInArray(this.environments, 3), EntityTools.enableSingleInArray(this.lights, 0), (this.app.scene.fogColor = this.fogColors[3]), (this.app.scene.fogStart = 200), (this.snow.enabled = !1))
                        : 6 == this.type && ((this.groundsId = 4), EntityTools.enableSingleInArray(this.backgrounds, 3), EntityTools.enableSingleInArray(this.environments, 4), EntityTools.enableSingleInArray(this.lights, 0), (this.app.scene.fogColor = this.fogColors[4]), (this.app.scene.fogStart = 200), (this.snow.enabled = !1)),
            6 == this.type ? GameAudio.switchLoopSound('loopSound2') : GameAudio.switchLoopSound('loopSound'),
            Game.debugOutput && console.log('env switch : ', this.type));
    }),
    (Environment.prototype.createGrounds = function () {
        for (this.clearGrounds(), this.groundLastPos.set(-25, 0, 0); Game.instance.lastPos.x + 60 > this.groundLastPos.x; ) {
            var t = this.grounds[this.groundsId].clone(),
                n = t.findByName('Start'),
                e = n.getLocalPosition();
            ((n.enabled = !1), this.entity.addChild(t), t.setPosition(this.groundLastPos.x - e.x, this.groundLastPos.y - e.y, 0), (t.enabled = !0));
            var s = t.findByName('End'),
                i = s.getPosition();
            (this.groundLastPos.copy(i), (s.enabled = !1));
            var o = t.findByName('Floor');
            (o.script && o.script.physScaler && o.script.physScaler.init(), this.groundsAr.push(t), this.groundsCount++);
        }
    }),
    (Environment.prototype.clearGrounds = function () {
        for (var t, n = this.groundsAr.length - 1; n >= 0; n--) ((t = this.groundsAr[n]), this.entity.removeChild(t), t.destroy());
        this.groundsAr = [];
    }),
    (Environment.prototype.switchTo = function (t) {
        (this.setType(t), MathUtil.shuffleArray(this.envTypes));
        for (var n = 0; n < this.envTypes.length; n++) if (((e = this.envTypes[n]), e == t)) return void (this.envId = n);
    }),
    (Environment.prototype.switchType = function () {
        var t,
            n = this.envTypes[this.envId];
        (this.envId++, this.envId >= this.envTypes.length && ((this.envId = 0), MathUtil.shuffleArray(this.envTypes), (t = this.envTypes[this.envId]) == n && ((this.envTypes[0] = this.envTypes[this.envTypes.length - 1]), (this.envTypes[this.envTypes.length - 1] = t))), this.setType(this.envTypes[this.envId]));
    }),
    (Environment.prototype.update = function (t) {
        Game.noDebug ||
            (this.app.keyboard.wasPressed(pc.KEY_B) &&
                FadeScreen.instance.show(0.3, 0, 0, function () {
                    (Environment.instance.switchType(), Game.instance.restart());
                }));
    }));
var Serpantine = pc.createScript('serpantine');
(Serpantine.attributes.add('serpColors', { type: 'rgba', array: !0 }),
    (Serpantine.create = function (t) {
        var i = ObjectPool.instantiate('Serp', t, Game.instance.app.root),
            e = i.script.serpantine;
        return (e.initialized || e.initialize(), i);
    }),
    (Serpantine.prototype.onEnable = function () {
        ((this.time = 0), this.gos.impulse2(pc.math.random(-10, 10), pc.math.random(5, 15), pc.math.random(-10, 10), 550), (this.entity.sprite.color = this.serpColors[MathUtil.getRandomInt(this.serpColors.length)]));
        var t = pc.math.random(0.1, 0.2);
        this.entity.setLocalScale(t, t, t);
    }),
    (Serpantine.prototype.initialize = function () {
        if (this.initialized) return 1;
        ((this.initialized = !0), (this.gos = this.entity.script.gravityObject), this.onEnable(), this.on('enable', this.onEnable, this));
    }),
    (Serpantine.prototype.update = function (t) {
        ((this.time += t), this.time > 5 && ObjectPool.push(this.entity));
    }));
var GravityObject = pc.createScript('gravityObject');
((GravityObject.tmp = new pc.Vec3()),
    (GravityObject.tmp2 = new pc.Vec3()),
    (GravityObject.prototype.initialize = function () {
        if (this.initialized) return 1;
        ((this.gravity = -10), (this._vel = new pc.Vec3(0, 0, 0)), (this._acc = new pc.Vec3(0, this.gravity, 0)), (this.rotSpeed = new pc.Vec3(0, 0, 0)), (this.falling = !0), (this.delay = 0), (this.bottomDestroyPlank = -3), (this.initialized = !0));
    }),
    (GravityObject.prototype.impulse = function (t, i, e) {
        var a = t * MathUtil.DEG_TO_RAD;
        ((this._vel.x = Math.cos(a) * i), (this._vel.y = Math.sin(a) * i), (this._vel.z = 0), this.rotSpeed.set(pc.math.random(-e, e), pc.math.random(-e, e), pc.math.random(-e, e)));
    }),
    (GravityObject.prototype.impulse2 = function (t, i, e, a) {
        ((this._vel.x = t), (this._vel.y = i), (this._vel.z = e), this.rotSpeed.set(pc.math.random(-a, a), pc.math.random(-a, a), pc.math.random(-a, a)));
    }),
    (GravityObject.prototype.update = function (t) {
        if (this.falling) {
            if (this.delay > 0) return ((this.delay -= t), this.delay, 0);
            this._acc.y = this.gravity;
            var i = this.entity.getPosition();
            (GravityObject.tmp2.copy(this._acc).scale(t * Game.instance.slomo), this._vel.add(GravityObject.tmp2), GravityObject.tmp2.copy(this._vel).scale(t * Game.instance.slomo), i.add(GravityObject.tmp2), this.entity.setPosition(i), this.entity.rotateLocal(this.rotSpeed.x * t * Game.instance.slomo, this.rotSpeed.y * t * Game.instance.slomo, this.rotSpeed.z * t * Game.instance.slomo), i.y <= this.bottomDestroyPlank && this.entity.destroy());
        }
    }));
var Jumper = pc.createScript('jumper');
(Jumper.attributes.add('delayStart', { type: 'number', default: 0 }),
    Jumper.attributes.add('delayRepeat', { type: 'number', default: 1 }),
    Jumper.attributes.add('jumpForce', { type: 'number', default: 5 }),
    Jumper.attributes.add('jumpSpeed', { type: 'number', default: 0.8 }),
    Jumper.attributes.add('bounceKoef', { type: 'number', default: 0.8 }),
    (Jumper.tmp = new pc.Vec3()),
    (Jumper.prototype.initialize = function () {
        ((this.startPos = this.entity.getLocalPosition().clone()), (this.startSc = this.entity.getLocalScale().clone()), (this.scaleZ = 1), (this.scaleZVel = 0), (this.gravity = -70), (this._vel = new pc.Vec3(0, 0, 0)), (this._acc = new pc.Vec3(0, this.gravity, 0)), (this.rotSpeed = new pc.Vec3(0, 0, 0)), (this._delay = this.delayStart), (this.jumping = !1), this.jump());
    }),
    (Jumper.prototype.update = function (t) {
        if (Game.instance.paused) return 1;
        ((this.scaleZVel += (1 - this.scaleZ) * t), (this.scaleZVel += 0.5 * t), (this.scaleZ += this.scaleZVel), (this.scaleZVel *= 1 - t), (this.scaleZ = pc.math.clamp(this.scaleZ, 0.7, 1.05)));
        var e = 1 / this.scaleZ;
        ((e = pc.math.clamp(e, 0.6, 1.4)), this.entity.setLocalScale(this.startSc.x * e, this.startSc.y * this.scaleZ, this.startSc.z * e));
        var s = this.entity.getLocalPosition();
        (this._delay > 0 && (this._delay -= t), Jumper.tmp.copy(this._acc).scale(t * this.jumpSpeed * Game.instance.slomo), this._vel.add(Jumper.tmp), Jumper.tmp.copy(this._vel).scale(t * this.jumpSpeed * Game.instance.slomo), s.add(Jumper.tmp), s.y <= this.startPos.y && ((s.y = this.startPos.y), (this._vel.y = 0), this.jumping && ((this.jumping = !1), (this.scaleZ = 1), (this.scaleZVel = -0.1 * this.bounceKoef)), this.jump()), this.entity.setLocalPosition(s));
    }),
    (Jumper.prototype.jump = function () {
        if (this._delay > 0) return 0;
        ((this._delay = this.delayRepeat), (this.jumping = !0), this._vel.set(0, this.jumpForce, 0));
    }));
'undefined' != typeof document &&
    /*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
    ((function (t, e) {
        function s(t, e) {
            for (var n in e)
                try {
                    t.style[n] = e[n];
                } catch (t) {}
            return t;
        }
        function H(t) {
            return null == t
                ? String(t)
                : 'object' == typeof t || 'function' == typeof t
                  ? Object.prototype.toString
                        .call(t)
                        .match(/\s([a-z]+)/i)[1]
                        .toLowerCase() || 'object'
                  : typeof t;
        }
        function R(t, e) {
            if ('array' !== H(e)) return -1;
            if (e.indexOf) return e.indexOf(t);
            for (var n = 0, o = e.length; n < o; n++) if (e[n] === t) return n;
            return -1;
        }
        function I() {
            var t,
                e = arguments;
            for (t in e[1])
                if (e[1].hasOwnProperty(t))
                    switch (H(e[1][t])) {
                        case 'object':
                            e[0][t] = I({}, e[0][t], e[1][t]);
                            break;
                        case 'array':
                            e[0][t] = e[1][t].slice(0);
                            break;
                        default:
                            e[0][t] = e[1][t];
                    }
            return 2 < e.length ? I.apply(null, [e[0]].concat(Array.prototype.slice.call(e, 2))) : e[0];
        }
        function N(t) {
            return 1 === (t = Math.round(255 * t).toString(16)).length ? '0' + t : t;
        }
        function S(t, e, n, o) {
            t.addEventListener ? t[o ? 'removeEventListener' : 'addEventListener'](e, n, !1) : t.attachEvent && t[o ? 'detachEvent' : 'attachEvent']('on' + e, n);
        }
        function D(t, e) {
            function g(t, e, n, o) {
                return h[0 | t][Math.round(Math.min(((e - n) / (o - n)) * M, M))];
            }
            function r() {
                (F.legend.fps !== q && ((F.legend.fps = q), (F.legend[c] = q ? 'FPS' : 'ms')), (b = q ? v.fps : v.duration), (F.count[c] = 999 < b ? '999+' : b.toFixed(99 < b ? 0 : O.decimals)));
            }
            function m() {
                for (l = n(), P < l - O.threshold && ((v.fps -= v.fps / Math.max(1, (60 * O.smoothing) / O.interval)), (v.duration = 1e3 / v.fps)), w = O.history; w--; ) ((T[w] = 0 === w ? v.fps : T[w - 1]), (j[w] = 0 === w ? v.duration : j[w - 1]));
                if ((r(), O.heat)) {
                    if (z.length) for (w = z.length; w--; ) z[w].el.style[o[z[w].name].heatOn] = q ? g(o[z[w].name].heatmap, v.fps, 0, O.maxFps) : g(o[z[w].name].heatmap, v.duration, O.threshold, 0);
                    if (F.graph && o.column.heatOn) for (w = C.length; w--; ) C[w].style[o.column.heatOn] = q ? g(o.column.heatmap, T[w], 0, O.maxFps) : g(o.column.heatmap, j[w], O.threshold, 0);
                }
                if (F.graph) for (y = 0; y < O.history; y++) C[y].style.height = (q ? (T[y] ? Math.round((x / O.maxFps) * Math.min(T[y], O.maxFps)) : 0) : j[y] ? Math.round((x / O.threshold) * Math.min(j[y], O.threshold)) : 0) + 'px';
            }
            function k() {
                20 > O.interval ? ((p = i(k)), m()) : ((p = setTimeout(k, O.interval)), (f = i(m)));
            }
            function G(t) {
                ((t = t || window.event).preventDefault ? (t.preventDefault(), t.stopPropagation()) : ((t.returnValue = !1), (t.cancelBubble = !0)), v.toggle());
            }
            function U() {
                (O.toggleOn && S(F.container, O.toggleOn, G, 1), t.removeChild(F.container));
            }
            function V() {
                if ((F.container && U(), (o = D.theme[O.theme]), !(h = o.compiledHeatmaps || []).length && o.heatmaps.length)) {
                    for (y = 0; y < o.heatmaps.length; y++)
                        for (h[y] = [], w = 0; w <= M; w++) {
                            var e,
                                n = h[y],
                                a = w;
                            e = (0.33 / M) * w;
                            var i = o.heatmaps[y].saturation,
                                l = o.heatmaps[y].lightness,
                                p = void 0,
                                c = void 0,
                                u = void 0,
                                d = (u = void 0),
                                f = (p = c = void 0);
                            f = void 0;
                            (0 === (u = 0.5 >= l ? l * (1 + i) : l + i - l * i) ? (e = '#000') : ((c = (u - (d = 2 * l - u)) / u), (f = (e *= 6) - (p = Math.floor(e))), (f *= u * c), 0 === p || 6 === p ? ((p = u), (c = d + f), (u = d)) : 1 === p ? ((p = u - f), (c = u), (u = d)) : 2 === p ? ((p = d), (c = u), (u = d + f)) : 3 === p ? ((p = d), (c = u - f)) : 4 === p ? ((p = d + f), (c = d)) : ((p = u), (c = d), (u -= f)), (e = '#' + N(p) + N(c) + N(u))), (n[a] = e));
                        }
                    o.compiledHeatmaps = h;
                }
                for (var b in ((F.container = s(document.createElement('div'), o.container)), (F.count = F.container.appendChild(s(document.createElement('div'), o.count))), (F.legend = F.container.appendChild(s(document.createElement('div'), o.legend))), (F.graph = O.graph ? F.container.appendChild(s(document.createElement('div'), o.graph)) : 0), (z.length = 0), F)) F[b] && o[b].heatOn && z.push({ name: b, el: F[b] });
                if (((C.length = 0), F.graph)) for (F.graph.style.width = O.history * o.column.width + (O.history - 1) * o.column.spacing + 'px', w = 0; w < O.history; w++) ((C[w] = F.graph.appendChild(s(document.createElement('div'), o.column))), (C[w].style.position = 'absolute'), (C[w].style.bottom = 0), (C[w].style.right = w * o.column.width + w * o.column.spacing + 'px'), (C[w].style.width = o.column.width + 'px'), (C[w].style.height = '0px'));
                (s(F.container, O), r(), t.appendChild(F.container), F.graph && (x = F.graph.clientHeight), O.toggleOn && ('click' === O.toggleOn && (F.container.style.cursor = 'pointer'), S(F.container, O.toggleOn, G)));
            }
            ('object' === H(t) && undefined === t.nodeType && ((e = t), (t = document.body)), t || (t = document.body));
            var o,
                h,
                l,
                p,
                f,
                x,
                b,
                w,
                y,
                v = this,
                O = I({}, D.defaults, e || {}),
                F = {},
                C = [],
                M = 100,
                z = [],
                E = O.threshold,
                A = 0,
                P = n() - E,
                T = [],
                j = [],
                q = 'fps' === O.show;
            ((v.options = O),
                (v.fps = 0),
                (v.duration = 0),
                (v.isPaused = 0),
                (v.tickStart = function () {
                    A = n();
                }),
                (v.tick = function () {
                    ((l = n()), (E += (l - P - E) / O.smoothing), (v.fps = 1e3 / E), (v.duration = A < P ? E : l - A), (P = l));
                }),
                (v.pause = function () {
                    return (p && ((v.isPaused = 1), clearTimeout(p), a(p), a(f), (p = f = 0)), v);
                }),
                (v.resume = function () {
                    return (p || ((v.isPaused = 0), k()), v);
                }),
                (v.set = function (t, e) {
                    return ((O[t] = e), (q = 'fps' === O.show), -1 !== R(t, u) && V(), -1 !== R(t, d) && s(F.container, O), v);
                }),
                (v.showDuration = function () {
                    return (v.set('show', 'ms'), v);
                }),
                (v.showFps = function () {
                    return (v.set('show', 'fps'), v);
                }),
                (v.toggle = function () {
                    return (v.set('show', q ? 'ms' : 'fps'), v);
                }),
                (v.hide = function () {
                    return (v.pause(), (F.container.style.display = 'none'), v);
                }),
                (v.show = function () {
                    return (v.resume(), (F.container.style.display = 'block'), v);
                }),
                (v.destroy = function () {
                    (v.pause(), U(), (v.tick = v.tickStart = function () {}));
                }),
                V(),
                k());
        }
        var n,
            o = t.performance;
        n =
            o && (o.now || o.webkitNow)
                ? o[o.now ? 'now' : 'webkitNow'].bind(o)
                : function () {
                      return +new Date();
                  };
        for (var a = t.cancelAnimationFrame || t.cancelRequestAnimationFrame, i = t.requestAnimationFrame, h = 0, l = 0, p = (o = ['moz', 'webkit', 'o']).length; l < p && !a; ++l) i = (a = t[o[l] + 'CancelAnimationFrame'] || t[o[l] + 'CancelRequestAnimationFrame']) && t[o[l] + 'RequestAnimationFrame'];
        a ||
            ((i = function (e) {
                var o = n(),
                    a = Math.max(0, 16 - (o - h));
                return (
                    (h = o + a),
                    t.setTimeout(function () {
                        e(o + a);
                    }, a)
                );
            }),
            (a = function (t) {
                clearTimeout(t);
            }));
        var c = 'string' === H(document.createElement('div').textContent) ? 'textContent' : 'innerText';
        ((D.extend = I), (window.FPSMeter = D), (D.defaults = { interval: 100, smoothing: 10, show: 'fps', toggleOn: 'click', decimals: 1, maxFps: 60, threshold: 100, position: 'absolute', zIndex: 10, left: '5px', top: '5px', right: 'auto', bottom: 'auto', margin: '0 0 0 0', theme: 'dark', heat: 0, graph: 0, history: 20 }));
        var u = ['toggleOn', 'theme', 'heat', 'graph', 'history'],
            d = 'position zIndex left top right bottom margin'.split(' ');
    })(window),
    (function (t, e) {
        e.theme = {};
        var n = (e.theme.base = { heatmaps: [], container: { heatOn: null, heatmap: null, padding: '5px', minWidth: '95px', height: '30px', lineHeight: '30px', textAlign: 'right', textShadow: 'none' }, count: { heatOn: null, heatmap: null, position: 'absolute', top: 0, right: 0, padding: '5px 10px', height: '30px', fontSize: '24px', fontFamily: 'Consolas, Andale Mono, monospace', zIndex: 2 }, legend: { heatOn: null, heatmap: null, position: 'absolute', top: 0, left: 0, padding: '5px 10px', height: '30px', fontSize: '12px', lineHeight: '32px', fontFamily: 'sans-serif', textAlign: 'left', zIndex: 2 }, graph: { heatOn: null, heatmap: null, position: 'relative', boxSizing: 'padding-box', MozBoxSizing: 'padding-box', height: '100%', zIndex: 1 }, column: { width: 4, spacing: 1, heatOn: null, heatmap: null } });
        ((e.theme.dark = e.extend({}, n, { heatmaps: [{ saturation: 0.8, lightness: 0.8 }], container: { background: '#222', color: '#fff', border: '1px solid #1a1a1a', textShadow: '1px 1px 0 #222' }, count: { heatOn: 'color' }, column: { background: '#3f3f3f' } })),
            (e.theme.light = e.extend({}, n, { heatmaps: [{ saturation: 0.5, lightness: 0.5 }], container: { color: '#666', background: '#fff', textShadow: '1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)', boxShadow: '0 0 0 1px rgba(0,0,0,.1)' }, count: { heatOn: 'color' }, column: { background: '#eaeaea' } })),
            (e.theme.colorful = e.extend({}, n, { heatmaps: [{ saturation: 0.5, lightness: 0.6 }], container: { heatOn: 'backgroundColor', background: '#888', color: '#fff', textShadow: '1px 1px 0 rgba(0,0,0,.2)', boxShadow: '0 0 0 1px rgba(0,0,0,.1)' }, column: { background: '#777', backgroundColor: 'rgba(0,0,0,.2)' } })),
            (e.theme.transparent = e.extend({}, n, { heatmaps: [{ saturation: 0.8, lightness: 0.5 }], container: { padding: 0, color: '#fff', textShadow: '1px 1px 0 rgba(0,0,0,.5)' }, count: { padding: '0 5px', height: '40px', lineHeight: '40px' }, legend: { padding: '0 5px', height: '40px', lineHeight: '42px' }, graph: { height: '40px' }, column: { width: 5, background: '#999', heatOn: 'backgroundColor', opacity: 0.5 } })));
    })(window, FPSMeter));
var Fps = pc.createScript('fps');
((Fps.prototype.initialize = function () {
    this.fps = new FPSMeter({ heat: !0, graph: !0 });
}),
    (Fps.prototype.update = function (t) {
        this.fps.tick();
    }));
var UiScore = pc.createScript('uiScore');
(UiScore.attributes.add('score', { type: 'entity' }),
    (UiScore.prototype.initialize = function () {
        (this.onEnable(), this.on('enable', this.onEnable, this));
    }),
    (UiScore.prototype.onEnable = function () {
        this.score.script.counterText.setValue(0, Game.instance.currScore, Game.instance.currScore);
    }),
    (UiScore.prototype.update = function (e) {}));
var ShopController = pc.createScript('shopController');
(ShopController.attributes.add('rewButton', { type: 'entity' }),
    (ShopController.shopItems = []),
    (ShopController.shopItemsCount = 0),
    (ShopController.openedFromScore = !1),
    (ShopController.createSkins = function () {
        (ShopController.createSkin('1', 0, 0, 0, -1, -1), ShopController.createSkin('2', 0, 1, 1, -1, -1), ShopController.createSkin('3', 0, 1, 2, -1, -1), ShopController.createSkin('4', 0, 1, 3, 5, 1), ShopController.createSkin('5', 0, 1, 4, 0, 1), ShopController.createSkin('6', 25, 1, 5, 1, 1), ShopController.createSkin('7', 25, 1, 6, 2, 1), ShopController.createSkin('8', 50, 1, 7, 3, 1), ShopController.createSkin('9', 50, 1, 8, 4, 1));
    }),
    (ShopController.applySkin = function (t, e) {}),
    (ShopController.createSkin = function (t, e, o, n, r, l) {
        var i = { name: t, price: e, enableRotation: o, iconIndex: n, unlocked: (!1, !0), dropId: r, dropOnKick: l, itemId: ShopController.shopItemsCount, shopItem: null };
        (ShopController.shopItems.push(i), ShopController.shopItemsCount++);
    }),
    ShopController.attributes.add('allKnivesUnlockedMsg', { type: 'entity' }),
    ShopController.attributes.add('buttonsHandler', { type: 'entity' }),
    ShopController.attributes.add('buy2text', { type: 'entity' }),
    ShopController.attributes.add('buy2', { type: 'entity' }),
    ShopController.attributes.add('unlock', { type: 'entity' }),
    ShopController.attributes.add('choose', { type: 'entity' }),
    ShopController.attributes.add('priceText', { type: 'entity' }),
    ShopController.attributes.add('pricePanel', { type: 'entity' }),
    ShopController.attributes.add('modelEntity', { type: 'entity' }),
    ShopController.attributes.add('arrowLeft', { type: 'entity' }),
    ShopController.attributes.add('arrowRight', { type: 'entity' }),
    (ShopController.openedFromScore = !1),
    (ShopController.instance = null),
    (ShopController.prototype.initialize = function () {
        if (ShopController.instance) return 0;
        var t;
        ((ShopController.instance = this), (this.lockColor = new pc.Color().fromString('#99AEC2')), (this.unlockColor = new pc.Color().fromString('#9F7DFF')), (this.shopItem = this.entity.findByName('shopItem')), (this.shopButs = []));
        for (var e = 0, o = -250; o <= 250; o += 250) for (var n = -230; n <= 230; n += 230) ((t = this.shopItem.clone()), (ShopController.shopItems[e].shopItem = t), (t.script.scaler.delay = 0.08 * ShopController.shopItems[e].iconIndex), this.buttonsHandler.addChild(t), t.setLocalPosition(n, 25 - o, 0), (t = t.script.shopItem).initialize(), t.setShopItem(e), this.shopButs.push(t), e++);
        ((this.shopItem.enabled = !1), (this.initialHeight = null));
        var r = this.entity.screen;
        ((this.initialHeight = r.referenceResolution.y), this.onEnable(), this.on('enable', this.onEnable, this), (this.unlocking = !1), (this.unlockSteps = 0), (this.unlockTimer = 1));
    }),
    (ShopController.prototype.unlockRandomSkin = function () {
        for (var t = [], e = 0; e < ShopController.shopItems.length; e++) ShopController.shopItems[e].unlocked || t.push(ShopController.shopItems[e].shopItem);
        if (0 == t.length) return 1;
        if ((1 == t.length && (this.unlockSteps = 1), (this.unlockSteps = t.length + 3), (ShopController.unlockStepsArray = []), 1 == t.length)) (ShopController.unlockStepsArray.push(t[0]), trace(t[0]), (this.unlockSteps = 1));
        else {
            var o = -1,
                n = -1;
            for (e = 0; e < this.unlockSteps; e++) ((o = MathUtil.getRandomInt(t.length - 1)) == n && (o++, n > t.length - 1 && (o = 0)), ShopController.unlockStepsArray.push(t[o]), (n = o));
        }
        ((this.unlocking = !0), (this.unlockTimer = 0));
    }),
    (ShopController.unlockStepsArray = null),
    (ShopController.prototype.updateRewardButton = function (t) {
        var e;
        if (Game.instance.shopRewardCooldownCurr > 0) e = !1;
        else {
            var o = 100 * Math.floor((0.25 * Game.instance.getSkinPrice()) / 100);
            o <= 0 ? (e = !1) : ((!t && this.rewButton.enabled) || this.rewButton.script.moneyForAdbutton.reconfigure(o), (e = !0));
        }
        e != this.rewButton.enabled && (this.rewButton.enabled = e);
    }),
    (ShopController.prototype.update = function (t) {
        if ((this.updateRewardButton(!0), this.unlocking && ((this.unlockTimer -= t), this.unlockTimer < 0))) {
            ((this.unlockTimer = 0.2), this.unlockSteps--);
            var e = ShopController.unlockStepsArray[this.unlockSteps];
            (e.script.textScaler.start(!0), this.unlockSteps <= 0 ? ((this.unlocking = !1), (e.script.shopItem.shopItem.unlocked = !0), (Game.instance.chosenSkinId = e.script.shopItem.shopItem.itemId), this.updateSkinButtons(), GameAudio.play('openknife'), Game.instance.saveGame(), this.itemsAvailable() ? (this.allKnivesUnlockedMsg.enabled = !1) : (this.allKnivesUnlockedMsg.enabled = !0)) : GameAudio.play('pop2'));
        }
    }),
    (ShopController.prototype.updateSkinButtons = function () {
        for (var t = 0; t < this.shopButs.length; t++) this.shopButs[t].updateState();
    }),
    (ShopController.prototype.onEnable = function () {
        var t = this.entity.screen;
        (window.innerHeight > window.innerWidth ? ((t.referenceResolution.y = this.initialHeight + 170), (t.resolution = new pc.Vec2(t.referenceResolution.x, t.referenceResolution.y))) : ((t.referenceResolution.y = this.initialHeight), (t.resolution = new pc.Vec2(t.referenceResolution.x, t.referenceResolution.y))), console.log(t.referenceResolution.y), this.itemsAvailable() ? (this.allKnivesUnlockedMsg.enabled = !1) : (this.allKnivesUnlockedMsg.enabled = !0), this.updateRewardButton(!0), this.updateSkinButtons());
    }),
    (ShopController.prototype.showItem = function (t) {
        this.shownItemId = t;
        for (var e = 0; e < this.modelEntity.children.length; e++) e == t ? (this.modelEntity.children[e].enabled = !0) : (this.modelEntity.children[e].enabled = !1);
        var o = ShopController.shopItems[this.shownItemId];
        (!0 === o.unlocked || 1 === o.unlocked ? ((this.choose.enabled = !0), (this.unlock.enabled = !1), (this.buy2.enabled = !1)) : ((this.priceText.element.text = o.price.toString()), (this.buy2text.element.text = this.priceText.element.text), (this.choose.enabled = !1), Game.instance.stars >= o.price ? ((this.unlock.enabled = !0), (this.buy2.enabled = !1)) : ((this.unlock.enabled = !1), (this.buy2.enabled = !0))), this.updateArrows());
    }),
    (ShopController.prototype.itemsAvailableCount = function () {
        for (var t = 0, e = 0; e < ShopController.shopItems.length; e++) ShopController.shopItems[e].unlocked && t++;
        return t;
    }),
    (ShopController.prototype.itemsAvailable = function () {
        for (var t = 0; t < ShopController.shopItems.length; t++) if (!ShopController.shopItems[t].unlocked && ShopController.shopItems[t].price <= Game.instance.money) return !0;
        return !1;
    }),
    (ShopController.prototype.chooseSkin = function (t) {
        ((Game.instance.chosenSkinId = t), Savefile.set('chosenSkinId', Game.instance.chosenSkinId), Savefile.save());
    }),
    (ShopController.prototype.buyItem = function (t) {
        var e = ShopController.shopItems[t];
        !0 === e.unlocked || 1 === e.unlocked || (Game.instance.wasteCoins(e.price) && (FadeScreen.instance.show(0.3, 0, !0, null), (e.unlocked = !0), (Game.instance.chosenSkinId = this.shownItemId), this.showItem(t), this.chooseSkin(t), GameAudio.play('buy'), Game.instance.bikesBought++, Achievments.instance.beat(2, Game.instance.bikesBought), Game.instance.saveSkins(), this.onEnable(), console.log('shop : skin purchased ', e.name)));
    }),
    (ShopController.prototype.closeShop = function () {
        this.modelEntity.enabled = !1;
    }),
    (ShopController.prototype.switchItem = function (t) {
        ((this.shownItemId += t), this.shownItemId >= ShopController.shopItemsCount - 1 ? (this.shownItemId = ShopController.shopItemsCount - 1) : this.shownItemId < 0 && (this.shownItemId = 0), this.showItem(this.shownItemId));
    }),
    (ShopController.prototype.updateArrows = function (t) {
        ((this.arrowLeft.enabled = !0), (this.arrowRight.enabled = !0), this.shownItemId >= ShopController.shopItemsCount - 1 && (this.arrowRight.enabled = !1), this.shownItemId <= 0 && (this.arrowLeft.enabled = !1));
    }));
var BestScore = pc.createScript('bestScore');
((BestScore.prototype.initialize = function () {}),
    (BestScore.prototype.update = function (t) {
        this.entity.element.text = Game.instance.bestScore.toString();
    }));
var UiInterface = pc.createScript('uiInterface');
((UiInterface.instance = null),
    (UiInterface.prototype.initialize = function () {
        ((UiInterface.instance = this), (this.score = this.entity.findByName('Score')), (this.levText = this.entity.findByName('LevText')), (this.bonText = this.entity.findByName('BonusText')), (this.arrowDown = this.entity.findByName('ArrowDown')), (this.highFlyTime = 0), (this.rebut = this.entity.findByName('ReBut')), (this.setbut = this.entity.findByName('SetBut')), (this.setbut.enabled = !0), (this.rebut.enabled = !1), (this.initialHeight = null));
        var e = this.entity.screen;
        ((this.initialHeight = e.referenceResolution.y), this.onEnable(), this.on('enable', this.onEnable, this));
    }),
    (UiInterface.prototype.onEnable = function () {
        var e = this.entity.screen;
        (window.innerHeight > window.innerWidth ? ((e.referenceResolution.y = this.initialHeight + 170), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))) : ((e.referenceResolution.y = this.initialHeight), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))), console.log(e.referenceResolution.y), Game.instance.paused ? ((this.levText.enabled = !1), (this.bonText.enabled = !1)) : Game.bonusLevel ? ((this.highFlyTime = 0), (this.levText.enabled = !1), (this.bonText.enabled = !0)) : ((this.highFlyTime = 0), Game.lvlTextShown ? (this.levText.enabled = !1) : (this.levText.enabled = !0), (this.bonText.enabled = !1), (Game.lvlTextShown = !1)), this.score.script.counterText.setValue(Game.instance.score, Game.instance.score, 200));
    }),
    (UiInterface.prototype.update = function (e) {
        ((this.score.element.text = '$ ' + Game.instance.score.toString()), this.highFlyTime > 1 ? (this.arrowDown.enabled = !0) : (this.arrowDown.enabled = !1));
    }));
var CoinsText = pc.createScript('coinsText');
((CoinsText.prototype.initialize = function () {
    ((this.count = Game.instance.money), (this.entity.element.maxLines = 1), (this.entity.element.width = 75), (this.entity.parent.element.color = Game.instance.blackColor), (this.entity.parent.element.opacity = 0.5), this.onEnable(), this.on('enable', this.onEnable, this));
}),
    (CoinsText.prototype.onEnable = function () {
        this.count = Game.instance.money;
    }),
    (CoinsText.prototype.update = function (t) {
        if (((this.count = pc.math.lerp(this.count, Game.instance.money, 10 * t)), this.count >= 1e3)) {
            var e = this.count % 1e3;
            ((e = Math.floor(e / 100)), (this.entity.element.text = e > 0 ? Math.floor(this.count / 1e3).toString() + '.' + e.toString() + 'k' : Math.floor(this.count / 1e3).toString() + 'k'));
        } else this.entity.element.text = Math.round(this.count).toString();
    }),
    (CoinsText.moneyToText = function (t) {
        if (this.count >= 1e3) {
            var e = this.count % 1e3;
            (e = Math.floor(e / 100)) > 0 ? Math.floor(t / 1e3).toString() + '.' + e.toString() + 'k' : Math.floor(t / 1e3).toString() + 'k';
        } else Math.round(t).toString();
    }));
var CounterText = pc.createScript('counterText');
(CounterText.attributes.add('targetValue', { type: 'number', default: 0 }),
    CounterText.attributes.add('shownValue', { type: 'number', default: 0 }),
    CounterText.attributes.add('changingSpeed', { type: 'number', default: 10 }),
    CounterText.attributes.add('text', { type: 'string', default: '' }),
    CounterText.attributes.add('prefix', { type: 'string', default: '' }),
    CounterText.attributes.add('textBefore', { type: 'boolean', default: !0 }),
    (CounterText.prototype.updText = function () {
        var t = this.prefix + this.shownValue.toString();
        ('' != this.text && (this.textBefore ? (t = this.text + t) : (t += this.text)), (this.entity.element.text = t));
    }),
    (CounterText.prototype.initialize = function () {
        ((this.currValue = this.shownValue), this.updText());
    }),
    (CounterText.prototype.setValue = function (t, e, u) {
        ((this.currValue = t), (this.shownValue = t), (this.targetValue = e), (this.changingSpeed = u), this.updText());
    }),
    (CounterText.prototype.update = function (t) {
        this.shownValue != this.targetValue && (this.currValue < this.targetValue ? ((this.currValue += this.changingSpeed * t), this.currValue >= this.targetValue && (this.currValue = this.targetValue), (this.shownValue = Math.round(this.currValue))) : ((this.currValue -= this.changingSpeed * t), this.currValue <= this.targetValue && (this.currValue = this.targetValue), (this.shownValue = Math.round(this.currValue))), this.updText());
    }));
var TextScaler = pc.createScript('textScaler');
(TextScaler.attributes.add('scaleDefault', { type: 'number', default: 1 }),
    TextScaler.attributes.add('active', { type: 'boolean', default: !0 }),
    TextScaler.attributes.add('targetScale', { type: 'number' }),
    TextScaler.attributes.add('scaleSpeed', { type: 'number' }),
    (TextScaler.prototype.initialize = function () {
        ((this.state = 0), (this.scale = this.scaleDefault));
    }),
    (TextScaler.prototype.start = function (t) {
        ((this.active = !0), t && (this.scale = this.scaleDefault), (this.state = 1));
    }),
    (TextScaler.prototype.update = function (t) {
        if (!this.active) return 1;
        (1 == this.state ? ((this.scale += t * this.scaleSpeed), this.scale > this.targetScale && ((this.state = 2), (this.scale = this.targetScale))) : 2 == this.state && ((this.scale -= t * this.scaleSpeed), this.scale < this.scaleDefault && ((this.state = 0), (this.scale = this.scaleDefault), (this.active = !1))), this.entity.setLocalScale(this.scale, this.scale, this.scale));
    }));
var Rotator = pc.createScript('rotator');
(Rotator.attributes.add('speed', { type: 'vec3' }),
    Rotator.attributes.add('time', { type: 'number', default: 1 }),
    Rotator.attributes.add('minMax', { type: 'boolean', default: !1 }),
    Rotator.attributes.add('minAng', { type: 'vec3' }),
    Rotator.attributes.add('maxAng', { type: 'vec3' }),
    (Rotator.tmp = new pc.Vec3()),
    (Rotator.prototype.initialize = function () {
        this.speedCurr = this.speed.clone();
    }),
    (Rotator.prototype.update = function (t) {
        var e = this.entity.getLocalEulerAngles();
        (Rotator.tmp.copy(this.speedCurr), Rotator.tmp.mulScalar(t), e.add(Rotator.tmp), this.minMax && (e.z <= this.minAng.z ? ((e.z = this.minAng.z), (this.speedCurr.z = Math.abs(this.speed.z))) : e.z >= this.maxAng.z && ((e.z = this.maxAng.z), (this.speedCurr.z = -Math.abs(this.speed.z)))), this.entity.element ? this.entity.setLocalEulerAngles(e) : this.entity.rotateLocal(this.speedCurr.x * t, this.speedCurr.y * t, this.speedCurr.z * t));
    }));
var ShopItem = pc.createScript('shopItem');
((ShopItem.prototype.initialize = function () {
    ((this.buy = this.entity.findByName('BuyBut').script.myButton), (this.greyBut = this.entity.findByName('GreyBut')), (this.hl = this.entity.findByName('HL')), (this.starNum = this.entity.findByName('starNum')), (this.icons = this.entity.findByName('Icons')), (this.shadows = this.entity.findByName('Shadows')), (this.circBut = this.entity.findByName('CircBut').script.myButton), (this.circElem = this.entity.findByName('CircBut').element));
}),
    (ShopItem.prototype.setShopItem = function (t) {
        var e = ShopController.shopItems[t];
        ((this.shopItem = e), (this.buy.shopItem = e), (this.circBut.shopItem = e), EntityTools.removeAllChildsExceptOne(this.icons, e.iconIndex), EntityTools.removeAllChildsExceptOne(this.shadows, e.iconIndex), (this.starNum.element.text = e.price.toString()), this.updateState());
    }),
    (ShopItem.prototype.updateState = function () {
        var t = this.shopItem;
        (t.unlocked ? ((this.buy.entity.enabled = !1), (this.circBut.clickable = !0), (this.icons.children[0].element.color = Game.instance.whiteColor), (this.icons.children[0].element.opacity = 1), (this.shadows.enabled = !0), (this.circElem.color = ShopController.instance.unlockColor)) : ((this.circElem.color = ShopController.instance.lockColor), (this.icons.children[0].element.color = Game.instance.blackColor), (this.icons.children[0].element.opacity = 0.6), (this.shadows.enabled = !1)), t.itemId == Game.instance.chosenSkinId ? (this.hl.enabled = !0) : (this.hl.enabled = !1));
    }));
var ElementShadow = pc.createScript('elementShadow');
(ElementShadow.attributes.add('shadowOffsetX', { type: 'number', default: 0 }),
    ElementShadow.attributes.add('shadowOffsetY', { type: 'number', default: 5 }),
    ElementShadow.attributes.add('shadowOpacity', { type: 'number', default: 5 }),
    (this.blackColor = new pc.Color().fromString('#000000')),
    (ElementShadow.prototype.initialize = function () {
        ((this.shadow = this.entity.clone()), this.entity.parent.addChild(this.shadow), this.shadow.translate(this.shadowOffsetX, this.shadowOffsetY, 0), EntityTools.reparent(this.entity, this.shadow));
    }),
    (ElementShadow.prototype.update = function (t) {}));
var EffectDrop = pc.createScript('effectDrop');
((EffectDrop.grav = new pc.Vec3(0, -19, 0)),
    (EffectDrop.temp = new pc.Vec3(0, 0, 0)),
    (EffectDrop.create = function (t, e, i, s, o) {
        var c = ObjectPool.instantiate('EffectDrop', t, Game.instance.app.root),
            n = c.script.effectDrop;
        (n.initialized || n.initialize(), n.vel.copy(i));
        var a = EntityTools.enableSingleChild(c, s);
        return ((c.enabled = !0), (a.sprite.color = o), (n.stretch = !1), 1 != s && 3 != s && (n.stretch = !0), n.stretch ? (n.size = e) : (n.size = 1.25 * e), c);
    }),
    (EffectDrop.prototype.initialize = function () {
        ((this.initialized = !0), (this.vel = new pc.Vec3(0, 0, 0)), (this.damping = 0.001), (this.size = 1), this.onEnable(), this.on('enable', this.onEnable, this));
    }),
    (EffectDrop.prototype.onEnable = function () {}),
    (EffectDrop.prototype.update = function (t) {
        if ((EffectDrop.temp.copy(EffectDrop.grav), EffectDrop.temp.scale(t * Game.instance.slomo), this.vel.add(EffectDrop.temp), this.vel.scale(1 - this.damping * t * Game.instance.slomo), EffectDrop.temp.copy(this.vel), EffectDrop.temp.scale(t * Game.instance.slomo), this.entity.translate(EffectDrop.temp), this.entity.getPosition().add(this.vel), this.entity.setEulerAngles(0, 0, (180 * Math.atan2(this.vel.y, this.vel.x)) / Math.PI), (this.size -= 0.5 * t * Game.instance.slomo), this.size <= 0)) ObjectPool.push(this.entity);
        else {
            var e = 1;
            (this.stretch && (e = pc.math.clamp(this.vel.length() / 3, 1, 4)), this.entity.setLocalScale(this.size * e, this.size, this.size));
        }
    }));
var Molot = pc.createScript('molot');
(Molot.attributes.add('delay', { type: 'number', default: 0 }),
    Molot.attributes.add('time', { type: 'number', default: 2 }),
    (Molot.prototype.initialize = function () {
        (this.entity.setEulerAngles(90, 0, 0), (this.swingDirection = 1), (this.elapsedTime = 0), (this.angle = 0));
    }),
    (Molot.prototype.update = function (e) {
        if (this.delay > 0) this.delay -= e;
        else {
            this.swingDirection > 0 ? ((this.elapsedTime += e), this.elapsedTime >= this.time && ((this.elapsedTime = this.time), (this.swingDirection = -1))) : ((this.elapsedTime -= e), this.elapsedTime <= 0 && ((this.elapsedTime = 0), (this.swingDirection = 1)));
            var t,
                i = this.elapsedTime / this.time;
            ((t = i < 0.5 ? 2 * i * i : (4 - 2 * i) * i - 1), (this.angle = 180 * t - 90), this.entity.setEulerAngles(this.angle, 0, 0));
        }
    }));
var CurrLevelText = pc.createScript('currLevelText');
((CurrLevelText.prototype.initialize = function () {
    (this.onEnable(), this.on('enable', this.onEnable, this));
}),
    (CurrLevelText.prototype.onEnable = function () {
        Game.levelDebug ? (this.entity.element.text = 'level ' + Game.instance._LEVEL_NUMBER.toString()) : (this.entity.element.text = 'level ' + Game.instance.currLevel.toString());
    }),
    (CurrLevelText.prototype.update = function (e) {}));
var WaterMaterial = pc.createScript('waterMaterial');
(WaterMaterial.attributes.add('uspeed', { type: 'number', default: 0 }),
    WaterMaterial.attributes.add('vspeed', { type: 'number', default: 0 }),
    (WaterMaterial.prototype.initialize = function () {
        var t = this.entity.model ? this.entity.model.meshInstances : this.entity.render.meshInstances;
        ((this.mat = t[0].material), (this.offsetu = 0), (this.offsetv = 0));
    }),
    (WaterMaterial.prototype.update = function (t) {
        ((this.offsetu += t * this.uspeed), (this.offsetv += t * this.vspeed), this.mat.diffuseMapOffset.set(this.offsetu, this.offsetv), this.mat.update());
    }));
var UiCompleted = pc.createScript('uiCompleted');
(UiCompleted.attributes.add('textColors', { type: 'rgba', array: !0 }),
    UiCompleted.attributes.add('rewButton', { type: 'entity' }),
    UiCompleted.attributes.add('bonusColors', { type: 'rgba', array: !0 }),
    UiCompleted.attributes.add('serpentinePrefab', { type: 'entity' }),
    (UiCompleted.prototype.createSerpentines = function (e, t, n) {
        for (var i = 0; i < e; i++) {
            var o = this.serpentinePrefab.clone();
            o.enabled = !0;
            var s = pc.math.random(-n, n),
                a = pc.math.random(t.y, t.y + n),
                r = t.z,
                l = pc.math.random(-0.3, 0.3),
                c = pc.math.random(-0.6, 0.6);
            ((l = pc.math.random(-3, 3)), (c = pc.math.random(-3, 3)), o.script.uiSerpantine.init(), (o.script.uiSerpantine.velocity.x = l), (o.script.uiSerpantine.velocity.y = c), this.entity.addChild(o), o.setLocalPosition(s, a, r), this.serps.push(o));
        }
    }),
    (UiCompleted.prototype.initialize = function () {
        ((this.serps = []), (this.earned = this.entity.findByName('earned')), (this.bonus = this.entity.findByName('bonus')), (this.total = this.entity.findByName('total')), (this.totalUpper = this.entity.findByName('totalupper')), (this.best = this.entity.findByName('best')), (this.serpentinePrefab.enabled = !1), (this.levelnum = this.entity.findByName('levelnum')), (this.counterTimer = 0), (this.counterId = 0), (this.playSoundDelay = 0), (this.initialHeight = null));
        var e = this.entity.screen;
        ((this.initialHeight = e.referenceResolution.y), console.log(this.initialHeight), this.onEnableCb(), this.on('enable', this.onEnableCb, this));
    }),
    (UiCompleted.prototype.onEnableCb = function () {
        var e = this.entity.screen;
        for (window.innerHeight > window.innerWidth ? ((e.referenceResolution.y = this.initialHeight + 170), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))) : ((e.referenceResolution.y = this.initialHeight), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))), console.log(e.referenceResolution.y), this.countingTotal = !1, this.countingTotalResultBest = !1, this.prevBestScore = Game.instance.bestScore, Game.instance.bestScore < Game.instance.totalEarned && (Game.instance.bestScore = Game.instance.totalEarned); this.serps.length > 0; ) {
            this.serps.pop().destroy();
        }
        ((this.counterTimer = 0),
            (this.counterId = 0),
            (this.playSoundDelay = 1),
            this.earned.script.counterText.setValue(0, Game.instance.moneyEarned, 0),
            Game.instance.bonusOperator ? (this.bonus.element.text = Game.instance.bonusOperator.text) : (this.bonus.element.text = '0'),
            (this.bonus.element.color = this.textColors[Game.instance.resultType]),
            (this.best.element.text = this.prevBestScore.toString()),
            (this.total.element.color = this.bonusColors[0]),
            (this.totalUpper.element.color = this.bonusColors[0]),
            1 == Game.instance.resultType ? (this.bonus.element.outlineColor = Game.instance.whiteColor) : (this.bonus.element.outlineColor = Game.instance.blackColor),
            this.total.script.counterText.setValue(0, Game.instance.totalEarned, 0),
            Game.instance.totalEarned > 0 ? (this.rewButton.enabled = !0) : (this.rewButton.enabled = !1),
            Game.instance.currLevel - 1 == 0 ? (this.levelnum.element.text = 'TUTORIAL COMPLETED!') : (this.levelnum.element.text = 'LEVEL ' + (Game.instance.currLevel - 1).toString() + ' COMPLETED!'));
    }),
    (UiCompleted.prototype.update = function (e) {
        if ((this.countingTotal && (this.total.script.counterText.shownValue > this.prevBestScore && (this.countingTotalResultBest || ((this.total.element.color = this.bonusColors[1]), (this.totalUpper.element.color = this.bonusColors[1]), (this.countingTotalResultBest = !0))), this.countingTotalResultBest && (this.best.element.text = this.total.script.counterText.shownValue.toString())), this.counterId > 3)) return 1;
        ((this.counterTimer += e), this.playSoundDelay > 0 && ((this.playSoundDelay -= e), this.playSoundDelay <= 0 && (0 == Game.instance.resultType ? (GameAudio.play('gamewin'), this.createSerpentines(15, new pc.Vec3(0, 25, 0), 150)) : 1 == Game.instance.resultType && GameAudio.play('gamefail'))), this.counterTimer > 0.75 && (this.counterId++, (this.counterTimer = 0), 1 == this.counterId ? (Game.instance.moneyEarned > 0 && GameAudio.playEx('counter', 1), (this.earned.script.counterText.changingSpeed = 3 * Game.instance.moneyEarned)) : 2 == this.counterId || (3 == this.counterId && ((this.countingTotal = !0), Game.instance.totalEarned > 0 && GameAudio.playEx('counter', 1), (this.total.script.counterText.changingSpeed = 3 * Game.instance.totalEarned)))));
    }));
var UiFailed = pc.createScript('uiFailed');
(UiFailed.attributes.add('title', { type: 'entity' }),
    UiFailed.attributes.add('rebut', { type: 'entity' }),
    UiFailed.attributes.add('contbut', { type: 'entity' }),
    UiFailed.attributes.add('gameover', { type: 'entity' }),
    UiFailed.attributes.add('revive', { type: 'entity' }),
    (UiFailed.instance = null),
    (UiFailed.prototype.initialize = function () {
        ((UiFailed.instance = this), (this.earned = this.entity.findByName('earned')), (this.hint = this.entity.findByName('hint')), (this.counterTimer = 0), (this.counterId = 0), (this.initialHeight = null));
        var e = this.entity.screen;
        ((this.initialHeight = e.referenceResolution.y), this.onEnableCb(), this.on('enable', this.onEnableCb, this));
    }),
    (UiFailed.prototype.onEnableCb = function (e) {
        var t = this.entity.screen;
        (window.innerHeight > window.innerWidth ? ((t.referenceResolution.y = this.initialHeight + 170), (t.resolution = new pc.Vec2(t.referenceResolution.x, t.referenceResolution.y))) : ((t.referenceResolution.y = this.initialHeight), (t.resolution = new pc.Vec2(t.referenceResolution.x, t.referenceResolution.y))),
            console.log(t.referenceResolution.y),
            (this.counterTimer = 0),
            (this.counterId = 0),
            Game.wasBonusLevel ? ((Game.instance.gotReviveChance = 0), (e = !0), (this.title.element.text = 'NO BONUS'), (this.rebut.enabled = !1), (this.contbut.enabled = !0)) : ((this.title.element.text = 'GAME OVER'), (this.rebut.enabled = !0), (this.contbut.enabled = !1)),
            (Game.instance.gotReviveChance<=0) || e || Game.bonusLevel ? ((this.revive.enabled = !1), (this.gameover.enabled = !0), this.earned.script.counterText.setValue(0, Game.instance.moneyEarned, 500), 'ground' == Game.instance.gameOverReason ? (this.hint.element.text = "DON'T TOUCH THE GROUND") : 'spikes' == Game.instance.gameOverReason ? (this.hint.element.text = 'BEWARE OF SPIKES') : (this.hint.element.text = ' ')) : ((this.revive.enabled = !0), (this.gameover.enabled = !1)));
    }),
    (UiFailed.prototype.update = function (e) {}));
var ShopButton = pc.createScript('shopButton');
(ShopButton.attributes.add('newS', { type: 'entity' }),
    ShopButton.attributes.add('newS2', { type: 'entity' }),
    (ShopButton.prototype.initialize = function () {
        ((this.time = 1.5), (this.newS.enabled = !1), (this.newS2.enabled = !1), this.onEnable(), this.on('enable', this.onEnable, this));
    }),
    (ShopButton.prototype.onEnable = function () {
        this.time = 3;
        var e = Game.instance.getSkinPrice();
        (e < Game.instance.money && e > 0 ? (this.newS.enabled = !0) : (this.newS.enabled = !1), this.newS2 && (this.newS2.enabled = this.newS.enabled));
    }),
    (ShopButton.prototype.update = function (e) {
        if (((this.time += e), this.time > 2)) {
            this.time = 0;
            var t = Game.instance.getSkinPrice();
            (t < Game.instance.money && t > 0 ? (this.newS.enabled = !0) : (this.newS.enabled = !1), this.newS2 && (this.newS2.enabled = this.newS.enabled));
        }
    }));
var UnlockButton = pc.createScript('unlockButton');
(UnlockButton.attributes.add('price', { type: 'entity' }),
    UnlockButton.attributes.add('grey', { type: 'entity' }),
    (UnlockButton.prototype.initialize = function () {
        this.count = 0;
    }),
    (UnlockButton.prototype.update = function (t) {
        var e = Game.instance.getSkinPrice();
        if (e > 0) {
            if (((this.count = e), this.count >= 1e3)) {
                var n = this.count % 1e3;
                ((n = Math.floor(n / 100)), (this.price.element.text = n > 0 ? '$ ' + Math.floor(this.count / 1e3).toString() + '.' + n.toString() + 'k' : '$ ' + Math.floor(this.count / 1e3).toString() + 'k'));
            } else this.price.element.text = '$ ' + Math.round(this.count).toString();
            (this.count > Game.instance.money ? ((this.entity.script.myButton.clickable = !1), (this.grey.enabled = !0)) : ((this.entity.script.myButton.clickable = !0), (this.grey.enabled = !1)), ShopController.instance.unlocking && (this.entity.script.myButton.clickable = !1), (this.entity.enabled = !0));
        } else this.entity.enabled = !1;
    }));
var UiMainMenu = pc.createScript('uiMainMenu');
((UiMainMenu.prototype.initialize = function () {
    ((this.caption = this.entity.findByName('Caption')), (this.levelText = this.entity.findByName('CurrLevel')), (this.initialHeight = null));
    var e = this.entity.screen;
    ((this.initialHeight = e.referenceResolution.y), this.onEnable(), this.on('enable', this.onEnable, this));
}),
    (UiMainMenu.hideCap = !1),
    (UiMainMenu.prototype.onEnable = function () {
        var e = this.entity.screen;
        (window.innerHeight > window.innerWidth ? ((e.referenceResolution.y = this.initialHeight + 170), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))) : ((e.referenceResolution.y = this.initialHeight), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))), console.log(e.referenceResolution.y), 1 == Game.instance.currLevel && (UiMainMenu.hideCap = !1), UiMainMenu.hideCap ? ((this.caption.enabled = !1), Game.instance.setupPlayingCamera()) : (this.caption.enabled = !0), (this.levelText.enabled = this.caption.enabled));
    }),
    (UiMainMenu.prototype.update = function (e) {}));
var GameHint = pc.createScript('gameHint');
(GameHint.attributes.add('minDx', { type: 'number', defaut: 10 }),
    GameHint.attributes.add('deltaMoveY', { type: 'number', defaut: 25 }),
    GameHint.attributes.add('actionDelay', { type: 'number', defaut: 0 }),
    (GameHint.deltaMoveY = 25),
    (GameHint.prototype.initialize = function () {
        ((this.startPos = this.entity.getLocalPosition().clone()), (this.startPosG = this.entity.getPosition().clone()), this.entity.setLocalPosition(this.startPos.x, this.startPos.y - this.deltaMoveY, this.startPos.z), (this.shown = !1));
    }),
    (GameHint.prototype.show = function () {
        (GameAudio.play('hintshow'), (this.shown = !0), this.entity.tween(this.entity.getLocalPosition()).to(this.startPos, 1, pc.BackOut).loop(!1).yoyo(!1).start());
    }),
    (GameHint.prototype.update = function (t) {
        if (this.actionDelay > 0) return ((this.actionDelay -= t), 1);
        if (!this.shown) {
            var i = Knife.instance.entity.getPosition();
            Math.abs(i.x - this.startPosG.x) < this.minDx && this.show();
        }
    }));
((splash = null),
    (logo = null),
    (logo2 = null),
    (bg = null),
    (logoSize = 338),
    (logoW = 338),
    (logoH = 149),
    (logo2Size = 128),
    pc.script.createLoadingScreen(function (A) {
        var g,
            C,
            updateLogo = function () {
                var A = window.innerWidth,
                    g = window.innerHeight;
                (logo && ((logo.style.left = 0.5 * (A - logoSize) + 'px'), (logo.style.top = 0.5 * (g - (logoSize / logoW) * logoH - 200) + 'px')), logo2 && ((logo2.style.left = 0.5 * (A - logo2Size) + 'px'), (logo2.style.top = 0.75 * (g - logo2Size) + 'px')), bg && ((bg.style.left = '0px'), (bg.style.top = '0px'), (bg.style.width = A + 'px'), (bg.style.height = g + 'px')));
                var C = document.getElementById('progress-bar-container');
                C && ((C.style.left = 0.5 * (A - 170) + 'px'), (C.style.top = 0.5 * g + 50 + 'px'));
            };
        ((g = ['body {', 'background: radial-gradient(#e66465, #9198e5);', '}', '#application-splash-wrapper {', '    position: absolute;', '    top: 0;', '    left: 0;', '    height: 100%;', '    width: 100%;', '    background-color: #18161C;', '}', '#application-splash {', '    position: absolute;', '    top: calc(50% + 128px);', '    width: 264px;', '    left: calc(50% - 132px);', '}', '#application-splash img {', '    width: 100%;', '}', '#progress-bar-container {', '    position: absolute;', 'border-radius: 25px;', '    height: 16px;', '    width: 170px;', '    background-color: #332d7c;', '}', '#progress-bar {', '    width: 0%;', 'border-radius: 25px;', '    height: 100%;', 'background: linear-gradient(#fff188, #ffdd6c);', '}', '@media (max-width: 480px) {', '    #application-splash {', '        width: 170px;', '        left: calc(50% - 85px);', '    }', '}'].join('\n')),
            ((C = document.createElement('style')).type = 'text/css'),
            C.styleSheet ? (C.styleSheet.cssText = g) : C.appendChild(document.createTextNode(g)),
            document.head.appendChild(C),
            (function () {
                var A = document.createElement('div');
                ((A.id = 'application-splash-wrapper'),
                    document.body.appendChild(A),
                    (splash = document.createElement('div')),
                    (splash.id = 'application-splash'),
                    A.appendChild(splash),
                    (splash.style.display = 'none'),
                    (logo = document.createElement('img')),
                    (logo.src =
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVIAAACVCAYAAAAKT3JXAAAACXBIWXMAAA7EAAAOxAGVKw4bAAA+HGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjItMDQtMDNUMTU6MzY6MjYrMDU6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDIyLTA0LTA2VDE5OjM3OjIyKzA1OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAyMi0wNC0wNlQxOTozNzoyMiswNTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YTNjNzJlYzctMDNmZi0wNzQ3LWI2ZmUtNTIzZWNmYmZmYjNlPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MGM2NzQ4OGUtYjViNy0xMWVjLWIwOTctZDdiMmU4YWIzNDY0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6OWUyMjZhODMtMjY0YS03ZjQ0LWFkYjUtYzFlODU0MzY5NzFhPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjllMjI2YTgzLTI2NGEtN2Y0NC1hZGI1LWMxZTg1NDM2OTcxYTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMi0wNC0wM1QxNTozNjoyNiswNTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo2ZDYyYzM3NS00NjE2LTBlNGEtYTZlOC0wNTI2NzY4ODBhZjM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjItMDQtMDNUMTU6MzY6MjYrMDU6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YTNjNzJlYzctMDNmZi0wNzQ3LWI2ZmUtNTIzZWNmYmZmYjNlPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIyLTA0LTA2VDE5OjM3OjIyKzA1OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjJmODc1NWYxLTkwMzAtMTFlYy05MGFjLWFjMWZkODkwYmIzOTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NzczZjVmZC0zMDdhLTJkNDItYjcwNy1mOTk2YWEyYjE2MjE8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6Zjk1ZjZjOWQtOTAyZi0xMWVjLTkwYWMtYWMxZmQ4OTBiYjM5PC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDo3MDZhNDE1OC1mN2EzLWY5NDctYjY3Ny1lZjQxNjczYWIyN2U8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT54bXAuZGlkOjhiNmEzY2QxLTExYjgtOTI0OC1hYzk0LWRmYjYzODBjZGI5YzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6ZjY0ZmY4NWItNGE3Ny00MzQ4LTk1ZDctMDUzMjYxODBmNDMzPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2MDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+OTYwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMzg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTQ5PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4WxAOoAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAGIQSURBVHja7J13nCRHefe/Vd09cfNe3EsKpzvlHBBKKCGEJEAiCIlsbDAm2tj4tf2+xhGwCcZgDMYYEwwIgREIkEBCCIRyzqe7091Jl9PmndSh6v2jqndm9zbOzO7tnua5T3929namp7u66ldP/D1Ca818lJm6ajEP7j0a4+almB/X3pD5Keuff56Xve719A3lyaRTs/vlAlSh0NG56oQPp449+ac65T088KMf4+oS2g2IAnC0RnouKgpBg9AOu7Y9PWuX6DamSEMa0pDJZO3q1bz65FP47ne+SWrZ0WitZglEBVH3flrOv+j1S39x41/nbnn6r4a++Pe3oKLPIPRdc0UNbABpQxrSkCnJ2WecwXe/8y1Ku3fgerMEHVoTlPpIvfrVb3IEhBuec6IXNl3lFLuvEunMwwL5E7T6DpotB3NsRMO0b5j2DWnIVKS/v48Tjj+TwcEi2WxmdtZ5Xw8sPeyMRff+7kFRTNDzp++ndO8dCCnAcRGA0oSa6EtSuJ9QKtzbMO0b0pCGzFlpbW3joitfww03/JBMKj0r2mgkPZpeeckl3qIkuZ88gdq2GaEVSG9YoZISVyE/LBCv0/Aa4MnZVioaQNqQhjRkyvLaS8/lm1/5LKopQRSFM2x6RaiwROLyy96gA4gee4TCi5shDEhnMkSRQmuN1iAQgF7lOM5DOtKvRenbADVb49IA0oY0pCFTlpPOOpMjLr2a/d29ZDMzqJUKgc4PITs7X5U6/eWnhs/n2f7b28jt2giAl+tkcdcKVBQSuyc1CiFkQkjxWaX1N4BPN4C0IQ1pyJyTI5Z1cemJx/IfX/s2TSuWzaxlv3sXrW//w9/3lno88+VvcUJ7gi/cex/J5mY+8OE/53d33sXyIw4niqIYfdFKAxwrHa5sAGlDGtKQOSu92zZC/1YGcvtnLOgbhXmSbcvXrrj6iiv3b/ZZ0r2Tb3zy/7J27RoAvv7VL3DOK15Nd3cPnZ0dFWAam/l4szkmDSBtSEMaMi356J/+GXc+vZl8ySeVTM7Id4R7d9P0qtdc7axoSe752m1cmFSsPerI4b+vPvIITjvlJG796S2IBZ0xgiKVetAX3BAIHmgAaUMa0pA5K6vXrCGZaUVRIJ2agSonpVDty9z2d/ze2xWQfWErD918E0+9/WpOOPlEAB57/EkefvhRsh0dKK1AaAiiD2jJl7SUKDG7aZ0NIG1IQxoyLelobeHPPvI+/uTfv0m6s73u59dBgNuUOt89fu3Rxec1bT3b2LBpI1ddfR1f/vfPI12HD3z4Y+zv7mb5ypUEUYiI+EeC8EukPASzn1PdANKGNKQh05alna1EO7YwlHVQFf7JmkVKgp3bWHT9H7w6sSQrBn/0GMX1T7Gsq4tde/by6iuuATTJTIZlK1cRRSFC6z0I/SU8FxBoZq5gpwGkDWlIQ+omb3zVJbzyZWdx+x2/Y/GiBfU7caFAqeQvzF58/rVqCPzHHyDcsQ2tNQuXLsUPAgASnkcUBvZDYp+G/bguUoHQCtkA0oY0pCHzQZr8fvT+DRQLPeh66IBaE+V76HjNuy7LvuzY5YX7dxI+9xQqP4SQDkopPNdAllIjcu33CkSABiXA1RJ3llXSBpA2pCENqUoWLWgFYNDvQ4g6eCVVRAh0veVN7xGA/9BjhJueRUQReLYkdAxuEI2+62DzTDSAtCENaUhV8nef/DQ/vOdpivkCqVTtaVCqkCex6vBzs+decHawA8Lnn0L1doOUE0aPtBBb9UFG0gaQNqQhDalKsqkkR3Z18czmrXhejWlQUhLs3k32wsuvdbvSbu7W9QTrH0cXCwjPYwIkDUSknzrYY9EA0oY0pCFVSSab4YN//D7e+v4/o2lxJ5GqniNEhwFi9Zpk+vwzz1ERhOueJNr+AobufhwQFRKhwr1EQxtMnP7gqaUNIG1IQxpStSxpzYI/QM/WTcOBoGok7N5H+rjTL0mdefop/vocwfonUYP9COmMD6RaoxAPCCEHGkDakIY0ZN7Kxee8nGte80Z+dPMvWbSyi2qJ4lUpQdOVV/4eTRA8tY5g49MQ+OCN73sVQiEcfZt2Mwd9HBpA2pCGNKQmOXJVF6Q9Ah1UF70PQ3RH81HZy6+6KOqBYMNTqD07DfnIOOeTUhMFMh9F8k4voTjYjT4aQNqQhjSkJvnYe9/JTb+7n76BIVLJxPQ+LARq727Sr33j292jF7UV79pJ8MxD6MEBcNwJ/KOgUHcWCmwolQ7+GDSAtCENaUhNEhSLdD/1NNqV+N702Ot0MQ+J5pbOV136ejQEzz1JtGUjOgxttH6Mz2iNiBwiJ7zFbS7GtHkNIG3IS0rWAkdhogOenYMu4Ni/p4y+wd3Ac43hmvuydOli3vDG1/DNm24h09Q8rc+qwMc7+uhTvBOPPSbcognXP0XUsw8hpckfHdOsd4iiqBv0T13hzYkxaABpQ2ZLFmEYy99SAZoTSQT8FfBPjaGbMXEsBniABPJAVY2YLnvXu/hPbyFOe8v0PjiYI3340jc5LhTXbyJY/yQ6n0M440GTRgiBkvoXQkXbxKxX1TeAtCEHT7LAr4ATprnIP2U1139+CYyRWwFqHpCoOJL28KzGXvk3r+JnCmi2P5P2Z9oe3qhzJSu+K37/kB3rG6dv3wfQ14d2pvm5fL7VO/n1V0Z5iDY/R7RzK2g9rjYKAqUiUOJ2V7hz6uE1pCFTM8OAoWB6n9FA1uGvXTktEK2UfwBuBx47BIc0BXwCuNACmWvBTla4O9wKF4hjX8+kU/BbwAbg8el8SAz0w9NP4C5ZNMUPCFTPflKnnf3m1NFdK/2NAwTPPoLq2z9x7qgQaK236EjdVJf6/gaQNmS2RWvIh+PP8XGAtCsteUcNX+sB500GpHpYX5k7EijIRZCUB/JjaiAp+XNX8Mdz6hlDUmnOFWLqQCoBFQYw0EfYNLVSUR0G4EcydekFb9UpiJ57FrVpHTKM0K47PpeU1mitv6cdMaDn0Lg1gLQ2EcBSoAtYAnQCC4E2q1nEs8oHShi/XzfQD+wCXgB2WJNqzosjjMW1pwhpZ2rkuUpzZnuCxbV8r69YOBmIunJqjtdZHS8Ju4ZgMDDXVymRhiOauKYzMccuWkOo6JjOjpSUoNNZWHEkLOqc2tfkh3Ca28/3jj31XLkHCk8/xgv33g2DPSxZdTie6xAE0Vibdp80rZbnnF+mIdOTLPAq4ALgdEwUuqNapQV4EbgP+BHGjzinQbXNg81D0OeDJyc367UmtSJT07om0iQnW9dVaqJJ4HDgSGABxr+4AGixa6MADNjNrxvYZze/F6aqqfkK7t5vxm3EPSkyS1O0MMeA1LLLe9OlF5VSIDwX15sapCgk6fNf/pbkMsm+Wzey7Y5bufjsMygWctzzu3vo7FpOJpMiDKNR16e/poXY2ADS+SsnAe8BrgJW1OmcHrDaHm+z2umngG8Cg9MBDWHW7R8CL8O4MyN7VFq9atQpHEyk9nfAD6ZywQkJi5KwNQ9ST74olWaoVs5fKUjKCb7DsTc/xWrrpcAlwCuBU4HDgMw0cGYAWIfxId4J3GFBdkw5oRWeGTBaadoZ4YYINRTnnIlliommjAtJCd35Iv/06c+RXfcsxW3ZKfmI9FBOtP7RH51b9GHnww/y8Xe9kf/7nrcB8LG/+Dif/tS/kDhsFcL4RMswiv6BFmLOgUMDSCeXK4A/w/jpZjrXYhnwReDjwJ9aQB1tKqMAVxzw/5+R1fvbPgh81n7npNKVhi058EOQYlIgzavax6VFT/AdgkndDA5wHfB7wGlW46zWldNqN6uX2Y2rG7gf+G/gf8fYBDi2GX6zx+yacT+hUOGHisIcnfPTSs4cGsqxsbcfli4lmCwhX0ii/bvJXHTZG9JnHHP0+ru28oqlGf7v7189/JZPfeJv+O1v7uLBhx5l2WGHoW1PKK3FdwT6QYGecwPWANKJJ9OXgXcfhO9eAHzDug4+OHph7ilAPiqDWKTp6kpxfaaGp6k0F09RO0Rpo05FeuKdxQJpURsXRi2Z05mJzGcpJgTS84EvAcfP0LPqtJvtFRZQ/xy4q/INR7fAQz0wEELGMRthYMbQn4sTX0wTF9IJj8WLV9A7lCOVmMRXEUWoTo/mV1xxDUkobHyO5N4XR80xQTKZgApaPg270fqv51Y4sQGkk8l5wNeANQf5Oj5g3QhvoCJROgI2DEKzawAkUByxOFlbQEdBs9JkgdyEu4swIBooC6STa6QFpQmrBVJh1MmWicz6cUC0zWr2H2b2Vt/LgN8CX7Df3QeQcuCaFfCjbVBSxrcszIY05zRSYTanabU8uukXv2b3U0+STqdQzsQhPzXQh3vEMSemXnHuG/3dsLh/H7/41jf5ryUtvPu9vwfAP/3zv3D3A4+wcPlyUw4qhI60fruAzWKOAkYDSMcG0dsxgYi5IK+1C/OP4v/IOpBxjWYjY4KcerTMmUJmky4DJGpqPtKSMBpputrr0iBGf1WsDXtyTCBdjgncrT1Iz+xDwGswftiNAJ0JuHgJdJfMZhQoSDhzUyNlmuVCP/3uN+l/5n4Sy9cQ6gkcOVoT9fez4H0ffaezGKf00D7S2zaRKeZ47/s+xA9/9gsKhRy/vePXtC9dbrVbgUL/CVFw+1zVRhtAeqBcCPxsDoFoLO8DnrKuBtoT0OKZRZlyYgw0uFrDd2hhmjBObNpbgOzzjWbqTKKRhoriYEjYUqVhH2ro9Xl6dLpVpM1mMoYcCdwyB6yJw+yG/CosZ8CyNATWJRMqsBvMXDTtnelA1rv+6IM8vOAYZCqJJyeegiqXa06dd87V2ofwhRcobHyKTDKJXriIX/zsZ+C4LFhxOOlkArQgN9TzOSHdz7teEq3VHPSONoB0tKwQJnKdmaPX9y/Aw8BDAC0uDPjDpm/Nvb+sSTel0ygNPb4Bs8lWXD5i8zP9rF+W5uxqrstX8EA3v4woR+f3l+DCxWZDGbWwVgG/BlbOkWe2ymrGFwCbkhKyHuwqDGvTc1IjlVNUJLSA0Pd5/asuYvvyw/nIrQ+ztmshYRSNsysGJBcsvjKxquuwcAcEzzxMtGMrKgxIp9M0HbUGrSEKQxwRkks4f9/TM/jXnV4LIiHROmpopPUWXf8T/oUQdM7hW04CfwxcD7A8DXuLptpIGAAUtY6nmuJJBCYNKpgCkGYEPN3Pvx7RxNmrm6Z/Tb/aw0+e6ON2z7owChEsz8CS1LC1aK7JXMen5xCIxrIMuAE4GwgdYTYgO95zUiMNNSrU48+FeK5k4kgf8PY1K/nWDT/gqUd+RUfzgQxQQgiKe3eSuewN5zZlTiF4YB3BE4Z3VAhprJfAhAEcVzDYy6f7ZfjXwhW4rkeuv5dcfy/SmZuQNW+BNFL1O5eGi13B++bBbb8MaAd6Y1+lPSS1O5CmBMaBMprgSR1w5x5YmCgnp445wQQUFd//xS4uPLOT9x7XYvIplTXPlT7Q3yoE7C3Bg93c/lQ/73KEeX8pMontb15pgLzyMwo+IOGNc/S5nY4Jen12SQr2FaEvgEhXx7Q0k1JSsDXHFiaYDAMhLHBDsk1m2vm+T3siwfff/3a+sm4/Kcc5YINNpVLs3bWz6YbfPXjuc3//H/DMg2Q3rcPxPDt/hHUbhQNhSf3ZQLf4apgqgVdiz77nWX3KK1h1/IkUc4MNIK2n+HUCUq3BFfy5nAcjkY9o7vZpSkp6S5G5dls9pLSuufuX0FP4fIxdJ7fC472wq1RONJ/oM0HEH968g+/dtZePtnis1TAUKIYU+KGiGClK2liLrq8ZcgU3RpqfXrIYDsuaGn+lTall2jGvddnVcKSEvxdiTj++zwB3CeuasVkPpXrM3/i+bcXUcDAwsr/HPys3r8geCpNlpIwmyvoBnunx+UqrZ/5eYe4zFEFRwXltIV1OEZPkET+EiNVLFnNt5xKejSA16llICUeccvhFS4454cQnbv9p72P37fc3PPtsi1KD6ebmhZRKRXy/sCeRTF3S0rHoaS0khAFnXv/7vPLMC+k6+2SOOGEVJTUT5uhLGEh7g/qAqBScuCjFJfPhnh/o5oGn+9mWkCbyu6bFTPDI6JI1AanSiGKIkFM4QyGEtgSc1g4v5icH0hilgd8Gmt/6Ck9ChDDBLX3ghsE5nXBEk62jFyNBuTDKVebAh1xJ2zx4hB8B3rIyCzsLJim/1hNuzpG7v5s9SQeBJgoVgRJEShFFECpNSWnySpMPFXkNeQWlSONrja/A1xBIQUkrdjqCXyjY1+uXJ5OwWmizozilTXNsc4gfjIxsKgRSa85IROzc77DHF2SdkeZOFHHd8s4WjvnDt7S88R1vGXj0l7fvv+2//rv1qd/+JnvECSd9onPVgr9Lti4P1570ctoTWY6+8BJyTZpXLM/wTDds3wqJ6QQtlzaAdFIp1sHvHGrIOlzm1bFXQaQMyBfszulJaPYYMammdY0Knh6AR3v5zqDPR5KuAbLOrCnPCw11oxQ1Vl0JyhruVN7bUzJA+rLqvMrBRO5XDNlLOyb3dC+G5GV48yuGFe4ETVdLgreL+TFtrwP+w4G7igbBcrWesNnj1i05rvcEbkoiEfhCEEobgBSi7PdRVuWXFQgZb2S9vskAaXZHWnsCE1g8ohmuXVgg6Wl8nSDUB0akIsBRmmOckB0Fj9AdsVGfhOK15KG7Dyedpf3cay5tPvf1l7ovPLdraMXCFv/IzuwxT+Z4usVBH+7CxjwM9cCWnWa9O3MYreZvsKkO6r1S4LicVo/r6fHh4R6GektsyUesLym2A44rWZSQHLU0xUmntuN0TjGxyppZPNbLwzuL/KXW3N6RMIsh68LSpNUYtFUHat9UdE+IdqdwplCZ9CtPTp5LOmzaCS4HXg80GSVyBGlxatTPBCZ7IokpRPgwhifTaKTWFNUaEpJLXDEvtNEYl67ScFeoIFK119q3ekTvX02QlBWb00RRIjHSRxP/+kgfPNELA0E5N1cIwxGwMqO5djk4gSDngztOun48Hw/LRqzIe+wuGl+2/eNrgLS0aWyFHAxtxE2mYclhS5sG+/n7uzfx90JwV1cH39zm86PePH1hCDJlUZoGkNZdWuvQqiVQ4IraCUi25VFf28zf50L+q8VlW9o1/qUWz0ya/gBeyHHSk338+RtXcN3KCXgdBkPYMgRP9fG/L+b5ckJwR5wvqbWJlK9IQ5NnTGAhQMjaGeQkqIRATRaFjynrMtP7xiuBn9boX7wD2KEx5NKxD3BJiutkndXRuATWmW5C5dTkZQpkKUIFinwdkHlRa4IjpWGuaqLMfJ/gQNZ9l5FM+VngHuC2cxfA2ma4ZacBT08aLfCwDLxhhSbpCPKlyVkNAgUJV7CyWfNsSbDAA61JOAGvFhVVaEKaeRT60LPDgHCvD6d3cv45bZzfF/CpdZIf3NfDzcL4lgu61ihAA0gPlBdrnILWIS8Py9aeNzoQ8pU1zfxNm2eAzbNZ6xsHod8fVgSe6PG5/pZdyHcczrWj/YrFCJ7phwd7+H4u4JOewxPNnvEtxvXtkYaUhAVJY37JkRZaTeII9OLU5JZ9TCHVUzJa+GRfHGlIO1y/KFUTsC1UcLIr2AHl0thQ0ZVxOKUe82kwgCf7oT+gJx+yO1QErqQp47L88CzJo1vqtoaPVJqFQxF7Cqr2YFNCcgHwpAVIh+pcPG8D/mdh0mRExGlwcQluQpSDWlOyBBUsSGjaPEGgwYXjBbxsLBgWsjxPhIBVdjW2eSzMuPwRmj/aX2JdKPhvqfkvHdHTANI6yr37a/RlGoBylmdqItNAA8e2sPS4MarBj2kxgZE4d/C+bljXzwd+uI1j37ySE+Jd/6l+eLCbH+wv8U9a84hnGyiOzkcKNXSlTHCn0o9VryCm0pMn9sdVOT3+1PJOA+MGWLSolusCfEWrst9dsnX+CE5wZG0cA9ai4OYdfL3P50sJhz2eZJ8wQZhMMaLrkW5ed3wbH3vdchbWCqZ9Abs3DjGQlCDrk0cqqbGIRGl+H/geECWdA2e4UtPrilCKBMtSiuUCNuckaY+36wmIZaQwwazFKVhlrbVAwxN9Zq7nfY6RDv/ctJRfC0mPbkTt6ye18tlpQGhUqKgpkcrOr6sxxMyfAZ7BBkeWj5reRzXDIz3s/9aLXL6nyHfaExw+EPCTPUW+0uzx7PKMua8jmozZ/kSfKSl0HfAj6EiYyabHvp2ax2OKysYIgtOplJQKajNh7Xck4s1kexGGQliZ4ZRkjROhGMGPtvGubp9vLE0fUK2VdwTPK4fPPNHHzU0e91+6mPZq3QXPD8Hd+/hWIaLQZkiS5kRlk4JloaZVQE/lJBCY7BAxrccUO6Eg4YDr0Kbg6onOoQ0rP8e2lgNhLwyZCra2BEjjE/9CFPKIlPWJjzSAtELbqxU4AkUUqtojp5TB9GpgJ6Z52HrgecrM6vuBbad2sK8jyY5en1f4ypipcW5k1jGvWz2z8NY226i89dXlAuNHGj2R6lGCPFUgjd8b5yBOqpEaf2PNJqyAdIyZ/b6p9V+a5PBaz7u9wM8VfKPVM4GWtGPSrXSlT1hAR4INT/TyoaOa+PZh2amff1cRXsjBxkHu21PkU8DNrR6EkeEhmAtrSWtSkR5JcauBpNDDrpzRz1kIIbTWCSFEUkrpCiEcACml0hCgCBamKewIuLzgszIzTmsaKSAXmsyWYyvW9CbbJ8LRBqWk5Ib8nmn6SJsaQDq5b6gODXoiYDBkT50vrcserxhDmesRsPPwLPsOz/I8hhmox/58Gku7Fk+wI0ZNhMEQ+vvMiSqDIKI+dNNTxtJYg5gKkIbGDC/WCKIIQSJm01iUMoQlzV7tJb1NDvdfu9KA6FN9sK1g/NKeKAe5ld3MSor/eaafdxyWHT/vONKwpwS7CoRbc9yzrcBdfsQtUnB/yjHnSzrG0vA1hTkSP/GE6RYyPBEcRlIUCiFQSqG1Fq7rZhOJRAZISSmTgKu1lgCO42gpnRCh+xaniJx+3uFOxBerjfV1RtswAQ89JaO9t7igFQiXu1Od3DeHS+3nL5C+UAc9MheCgM2z6I1YYA/gACLlvcAjwH9hGKgO0OKaXdPmY09xJA+orM9anJZW608RSH0FQR2Y4KWdq0KYjAEBMunUBqSRBs9hO0CXB6ub4eEe+O0+8x2eKO+AaJO3u36QL5xV4pIFo9LY9hZN14DNQzy1p8jXi4pbXcH6hGO1XGnGQgiTa1w0vt6C0jOSGTDdB5+wMaXRLpnhSRFFEel02lNKtTqO0wKktdZpq5XGraLRWivbJrkvF4irlOKyFhdKNlgqRm2QhcjU7B9foY0+3mfGp9UbrtT6UTBQhQOruQGkk8pAHdz0xQh2FXiyEE2tOmeGZRFwuT02YQhKDkgZWpYxvqNRmoyo35qaXDvUlAM+k6UelQyQ1q6R2kacwmq5gcJVunqO02HLRuLHY1lSpsBACLhrLwjHAoq9R9eBQsRPf72Hey9YxMulgB152JZny/YCtw2FfFvAfUmJikssLatWTC6DY/289ijOBSAVZs9IVFYyma6nwloDgjAMPSFEp+u6TUqpZiFERgiR1lonAS827Sm70bNDERe5EhKuMf/8yCQFiwqrKx+ZEuCORFm52ZKDbJyjLPCTcJsuzm08mrdA6tZh8mVd6Cnx6605ete2VBdEmCE5ErgZU5f9QeCB+A8ZBxanYWe+3BJZ1mEtCoEWU4jaiwrf52StRoZ9pLU2eTPonRwObpWjXDXdtiMgH6J8Vd4Q+jH+91JkMkMqfaYaY35uL/DGG7byeldSDCIeCjXPJSTFtGPNYT12H3tpq4q0ZapWinyka+vBUicgTTiCVDwGSkMYhqb8WCkcx3Fd1+1QSnVorbNCiHZMpkBaCJGmnKMa32pPoMUJ+0v6dSYGUPGwlNlEBGUWrMp4x7oBkxGyKGnHUPDVUPMMogGkMyL1IC2xWsjWdQPcs7aFK+fgbZ6B6QN0HYaKDYDFSUPqHHN0iplvyneATIUhv+J9NbMcaUhGVt1xzMQV9Whl7wqiEWWTGM3p7E6jpt3TbbXKir8nJTuVaVJI1i2b7ONFk+N8zJg4JP4/W+d+0EUIEvmQVHxtKalIEBOaKKSUTUCTEKLZ/oy01mnrpkqOAlKA/t0FzkOLro6kybDwBGhZzoeOq6Y6EnBkhQm+aci4UGLfNHBDoOc+Hr2k+Ug1xvG/Kce/bRzkyqOa5+ztfg8TwPpcvHjbE8YvZ9NB6rFfxyz7U/YvRlOozQ8VqBqbvFkegIzS5cRwIZCI2uZvpKElYThfxrJ4zuyEjUOwr4RRh0dps1OtqLJWA2pUNoA2hCIHXaSAoZCUb5+nlx8gEeTR0mHBggVpx3FatNbNWuukEKIVOEsIsRljaSyx3si4eYIfKhaFiovXtsCOgikTFeV7JtRm8ylEcP6isi/6xTzsLtogk7mun6K5Zz7gkWSeiq7TIY1598uHessa3xyVzwLvjH9ZnjZmpjALWtRxSCfTXozpZyFX6ykd9ciXTKoKUHLqpJEqjY4qaOXio6QMWJ7Sbvx21ZShxuBRjCAXmXNWHkVFUc2BKnKloTVBZlHa8Ix6UQklJDZolLYmfEZK2SKEKGmtT9Fafx7ToTWuqGoDFgMigvNWZTlF23FMWSesazcgTxrf6KIkHFOhvDzeawbDjf2jmv+YN67G+Qqk9dwBml3YmuOfHujmzWd1zunb/j+Y3umDsUblGtLjmocjZgqaCl541jdbDA2Y60m0PlUfIE1XaoOORIg6Ael49xxqOK4FHkobzbTJHTlW0oJDqaKmMi7njVX8VhdObDPcCKEaCV4awkARUIf7qEUc2+J7IID2hMOqRQtQZlRcIUTKBpRSQogmrXWTEOIGTGfXt2LS9zZh3MuDwIlJyfmRNul6GccWOWhwJEjLKRsqU6Di2Zm7PW+S8FtcMzZC8KyWI9taN4B0BiRVx6kngITm8d/t472O4D9O75izt70Ww4T0D0lp+zbNMse6r6DJgfMWwm27jaaVngBMrb+gVI9HHj8rQ2aKFKIuADTuPhAoc29ndZrc1crMjnjTkRZwK+dSbC4PhmajO6ypzFZV+b58RGCLFVIHc1KVFCxKsntR0hCJabu1KKVcKWVCSpnQWntaa08I0WJN+ZuBVuBooANT7tprNVNvwBLLJKUJ3MWuEFdC3jfuqWNby9fwRL+J6CcdCHxwm/mh18ygjuYHHjWa39mV5AlISr76q920u4JPndw+Z6/1/QK+IgT7O5LQ7YMr61DZpCcvvVO6nC3RnoCLF8Ov9xozLTV2W+Q4uFCsw307ypp9RWXMZVGftK9oog22EJmo8nGt1Z18d9GQ16TkgfXqxYhAp+qyydQEonfu5WeDAU9KAee1+zR5EaUIPM9zpZSu1Uxj5iiptW4VQmQxzRgXAp32b4viZ56PLCgqjZTCkO/YjWcgNDm7bTZdoTeAzbE2CkiX/Trg60E/tQVDWmdvHBtAWgGmSQek4J9u30N+Z5F/PmcBqVZvbl2ngCUarhM2aixlffraT+YgVVYTTFQ4ERYkDZj+YpfxI46lmdqofc1A6giaUxI2DMJv90DSQSxL10UjVRONyXSCSmPJkpQB4605M79GuQ7CWt0eCnik26SZpST4Gq00gdIEyjDkh0pTiiCINL4qH6HWRPt91u8r8fF8aCrpUqpEqaTwFbiuqYFQSgkhhBRCDHNEY9KfWjHl0CdXul5CXeYsCOJcVHsUlbEmT6gAuef6jfYfl0ZLh29LzYvanz/40QDSUVqZJyGp+eKjvdy8JcdXT2njlSe1GVNkDoHp64AvRtqU0DkO9aDk1OOBSqyxJ8bwxHYm4JVL4M695cWsR/nfHFF7QMUxHV7lY72o3gCWOLiixvmrJwFS4ySsfWC70sb/lwvMGMbjU4oIa+3bJEHtLfGeu/dxf9IhoyEfaSKMpRxqbX8a0zsUEAhBgFEWafFgRQbO6IDDm8BVaQZz+RHbqhzZqz7GxMjiRxHjuhkG0oQ062VvceT+Li1fxOomWGgrw3KhyR1Ny+Gv7FUR/6LF/MKOl3SrkbHAwrVtf9s8XixGXHbXPq5/doAPrWnmtDXNuC3etEmNZ0J7PkPA4U0uW1xD+iDqkEYzplIak3YkJghnLUzCJYvh1l3lAMNwaaHRTmpeFsrscWJts+nCKUDaxpMzopHWQxuNJSnhxHZTfhqpcvWErwkVNefY+ld08fDyDM90l8xzikYpB5P4Rjml0o3luGSzWYIgQCmltNaREGIYmO0RWCDdDxxr/aJo0Fqbvl8dCZPrPBRptHXClOxDrEzAf2bAVOotTlk/suAGNNu0bgDprMjCZB1PZp3gu/PQV7KalSWYaPb4bjHiu/ftZ+3DPVzmCM5bmeXcDo8lbQnjK2zzTERXillD0mYlOK7JZcuiFPT4OLWWNlWaX9MB0Vg6EnDpYvjlbgOmKbfM6O/XIWqvNQkN7ppmokf7QGtcycwEmzQHNt0bZ8iYqhevM2HGaGfBMB1ZoIiokZM01LiRJnNSWzXKrOEmoUwI7QLCcZwBKWUYhmEIBFrrAAiEEL7WuiiE8C2ILgCOt+fr6Q+QgwFtLZ4x0xenoHvAtllWplPEyqxZM2AClY/1Gq1YCFARaMF3hDP/8GjeAumbVtbvXNJGLZ4bgO0FA4pb8ybamItMG9pIs77FYX3G4QsP7KMp4XK8JzitzeOUlgRHpB2WZR2WZVyybXYipR3DUpR2pgZG00I9zbJ4A0g5CFFnQFHTANFYFqXgVUvhll1QCm3vH5v+VAeWo7SGdKgp2X5CMQDUdMd6VLAprpxKSFvOOYZWJwVnAX9jx+znwA9hchax09qNv7QvMC6QUBHVWvUlwUVwBaZgYzkmAyBDudVI3AtrrP5YiYrDtZ9LAw8CH3Zc5wU0JY0OLHgWhRAloKC13i6EON+ea12g2Njnc5nSZrPYX4IjsrDSpo5FlpthRQVH79P9JuVqSQoi0zbnl8LlHnQDSGdN6qn9xac6usUcACe2liswfFOdQ9oxmmrPYoaSDvfnQ+7/5S4TSEg5NAtY4EkWajhSQ7snWJCQLG52WdGZ4LQmj67j20x0sg726EJhXRy5sC6VXqIaTXQsS2FFBp4fNM/ImvalOpBzZCyY9tkKpyjUNfpeTW3tCMXTpZzbGJvGQQVDvIA2IbhBwGH2LZcDfw/cbkH1NmD3eHN2RQb29pjB9lUdfKTmHv6qzsvrNVrrDqXUeY7j9Eshm4G81joHJIQQG4GrgJcBPwB9X28grh4MSaakRiDo9o0G2pk082hb0fQaW2Y9qYGC9X1mTdmcWpId/JP0jPbaANJZknqW1skx8mgyY4/MEcBbsy4XAjtJ8pFrVrDvgW54qp/BhGAwIdjiax4MLFVapKFXwqYcrUMBpz/Rx2euX8XJtWQD2DrktgofZP3ajdQAorGc1Gq0+2GWI0WxDteXEMKw5AdmYysoXRs9nzR+0KbKeTBaxY0T72NzP9K819EcNsoEaAfeZI9e4NuYjgl3jdb0D8+adKheH6I6RO1nTlORx2mtV2mtXgSZAxJa65QQQmPSnTqAfwCe1YhV+0scGUSm33No+jSRCw0Bt2HB0hzXKkb4RneXjBVjE/Bv1AF3RhH1m8wNGr05JR6GPOQDwBtHjdnChUmueNVSgpctMMztj/SUGeTjxecJCDX9SnFHX8hlG4e4+/R2jqrRKs3E1GyiPq1GlNLjR+enI51JOKrJ8EpmXcOQr2q17QVepPFcYaqNChFRoGrX5gQcc4BKPmrTiquVNHRKwXsnsYbagQ/Z41Hgf6ymujGGiGNb4O79w2lCwRyd982hEO0bn1v3YlfXsoG2trbYNYDWOgt8BVPdJHtKtPf6dCWkMMQseriiDTC5zkc0CWx7FUrKBN6ybnmTQvElv95t7RY0gHQuyELg3cC7gDXjvOdS4Juu4PoFCViQgCMnaW8QavYWIlPiWYszs7J3Uj3cr5HpT1SXzgMAx7eZnM9CCMqrneXIVIUaxrlQw1BIri9g16oKIKzyvNdiem2NC8pxW2al+bwU02pvcqo9Pme1038Ebku7ZXdRNFc1UnCVkMlACwr5fL6tra1Pa+1IKSOlVCSlTBv80Pu2FsQf5ALQ7nB33uFWNEOBRmnBURXr4qEeo5EvTlkSmpCfR5q7EPMXLBpAeqAcBXwMs8CmYhxcB6wE/gRT6TGehycLHOsKPtfscmqtzswBn/350NIJ1idFZ7WAf6EceFCYVJeYvW5037vRmB5XTD4B3LA0RXiE1UojkyBeqzhCkPKVIf4tKXRnkueBi2o87wkY/oLrgYEJhvwLUvDWGr7nfHtc25ngxjWWjX+uaqTa+LTdpV1dOCoEU0cv4jlh0qLY2RewfGuO0xPCBNJi95Cy1tJ+X7CmuRyp7wvgyT7LW6BAKOjp4MuBbXLXANL5L6+yAHpeFeNyDoY39GlM07shq+F4FkAXAqst4NZLXnQkBCEUFaLWvDtprvEjdbq2y4G3nNFha6hN1F7VqDw7oSaVdWFpyizG3UWeDNTI4FCVcgWm++tNmOaFeyxwLLAb66sxNeW1AxS8QcCNacf4esM5qpEKIApIZJvbSDqgokiXfL8/CIJSS0uLD7oIesuGQfnGodBkqpRM+tJwlkN/YEz30yvyVJ/qh6GgQhsVfCeh+LkTGLLrBpDOstSzPYOG38P0Sqp17p1gjxmVUENfwKbB0OzsWRfpzCGzSMPrBXw+6/LQxYtAQOgrwoxDopZHHigyGcckdG/NQT7ggf0l1NJ0XbwbyzHdCGZUBgJ0ITL+dInJaJira0xKQxVqiJgFYRgyODhYzGazgSP1nv7AST43wGtdYbJHYhxUdtfcX4ILF5UDt/tKxkJpT1igFvQJyd+2DMKMpDzNIpPbvAXSPaX65GYqTbbZ5c8T84iZtd9n65YcT6ed+qRS1VuUJhlELAy0icqWIpTNl6waSO0+kQQTDR4KQAgefiHH00vTnDhfnt3uIpu25GzKmoBAMTQnTXs73o6wprqQJKQm6YBDFA2Fkt/0idNzIac1u4akpJL5al/J5IdWFgrcu990H2hLQhiCEHxVCjYqYD77R+c1kD7ea1oVZNzJWYsmknzIinMWclhXev7c+9P9fP+xHvaf2AZOCgYDhJ5j1++DKCnTZiIwiec1+QJtGU4aTFrZQGSKHjYN8cMzOjnRnQcLcTCkuGGA/w2UiWSHhuC5dw5fcpOqAMcCHhtyCe4NEgxFmr0hV7Q7xkKqdJ6Hypj5L19Qzr9dN2CORUmTnC8c9rkeX+AQkXkLpKd1wJ174DGbRpGQ1VkHQyEvrMjyfFeaY+fDfe8o0PdUP/8RWJCyO/mcK01W2qRT2Y6fNVfwKGNiykiVE7v7A9hd5MbNQ/z1mua5P5efG+CWTUM8knTKwZhI196qeiaBNNZOHeCRQppHdZpECAktvA6H16qRFgMS2F+EU9thVdb8X6Th/m6TfO9JCH1wW/ii084OHXJIyLwF0owDl3fB2mb41W7D+9heneFYfLqfG45t5e9a5vho+Aru3MM/DgZsyrjGPzpnzSKNirQxwUsKP6gVMEwtpz8UwZI0LE0b89GTrH+gm+8e0cTb57JW2u2jHu3lk2A0uJIy5ce1tqqeYfO+SVveiR1F2JiHlqTJQ0PxGhVwbOXcc4RJwF+RhVcsLv//g93QU4KFKQOquDwZ+nwm2g8zWg6anb2xmrc9m/KR2SVPbIPXroCT2wxZRi6cHq4kJOzI8+8PdbN5rt/z7/bxqxdyfMa1NGWrssaEmotQahn+iMwR6BpbMgvT98dLyvKmAkbLeTHHP969r7bc3JmWB7v5116fh5W95lPb4Ix2WJRkzib9eIJCPN7FEIZy4JaAIoiQt1XOOmkDTkVlAkxxzGFPEe7rLrdpsVUq/5eAgi7Y2P8MHbMp8xZIpTC9bHt8o51cswJetcRopT2+MZ1iGrTJjqxL91N9/POuOWxk3bOfzQ9288E4Apqx7FR2Ys4py15gqOM8UXF9ukbAMIt22BN8VofptWU5EDbc383/e35obj67dQPsWj/Ip1s8QzKzttn0Kzq6xfj4i3OwncZAABsGeWpn0Wj+AwGkPNCGJ+okobl8xKPRsM+Hk9sN/2osd+41IJPxQAWgktyMx09FaNKdZvJomPbTBNRcCIFtn3tCm2GVeazX7IauMLvhROOalFCI+I8fbefCa1Zw7dLU3LrH23ez/r5uzkk7dLsm0suRTcbfVJl2MhclMvX2Ua28m6Pr4juSRrPzlQGnXMS//mIXR16zgg92zaHnt6sAd+3jfcAuYbQ8XszDC7nhxPUX2hOwxJm58R/r0PFrLEMXJggkhQHNJ/r42t4i93g29pAyaXZmrmnegihnYDgCdhZNWfClFSb9b/fBliHT8TYyxC8DEv4CAcJj3kfqDykgjcW2tCDtGLbvk9pNZP+hbjMxJmK419bc6vF5641babp+FVfUle+0SsmFcPtuHn+6n9dlHLoTBjDoSsPipEkliYnFxRx7FvkQUYwTtMX47PvTcBUM1277kdkcT22H3+2DpAttLgxGfOwn2znu6uVctGQOgOneEty0gz/Oh/wkJc0G6IpKIg8IFD+7cw8PvKyTs9LucJI+oSpXCClA2d9D2785VHaD0gSR+RkqiEJTRRZFyjDXRZpIa8JQk4sgpzR5pckHilKkTWdorQgR+BqKWiN9zcMSftDsmu/yKiiybG38BXF00xHQHRhO3qu6yve+owCP9BreBSWMn0ck+EepeNYQUHBIySFb2ZQQcGaH8Z3esBW25YyfLeuWwWf0Qs26hAMBr/v+Vv7zzA7eeVpHfRP/p6NFPNZL6aEePjsQ8A9ZhwKG+ARPwmFZiAT4DNfsybmmlQprKWwcBA1DHR69KzPVn6/XJ7hnHw9apiCSdlNJWDb+yDy/4lDIpd9/ka9esYx3r246ePe/rQA/38lHe30+Hzd1qySxiYEpKSnsK/H6m3dybcohpTWFCAoYopdIGTIZTdwuxPCx+vYoYaZBIMAXgtBOC19AIAWRMMTRvhSEcf/qmB5SV5jlwnaG0Biu1JgCUWAmV9xK2pGcKwRn2tfkQgP2r+4qd/bt8eHmnWYNpp3h8/w4UvyzOETx5pAvEU1IeNMKeH4IHu2FbXkzmbLjmPtZl9BXvOtXe/j5+kH+7dyFLD58lqJ/JQXP9MPT/dyzo8D7XcETLZ7RwGItZEXWULEVI8g6w8DrziVnt2NaTWghypHcR3v5edbhvGNbTORJxWanKpubqtIUtZqXxvT5ebKfL+4t8UgMQDFnalKWc7/sZqj6fX7/f7ex94wO/uLchXUm1Z6aP7t4337eq+Bboy2h2IyupOFLSnYo+Fx8H64wTQ3RZa00vj8qcjb1KBeyqKCDHO93SXnX1RVaRHw9cVpWMYSkB62Jkbl1YcjVSoHnmPf0lODq5cZ8j+WXu0yOd1fKtqrWDCjNX0bRIWXNj1QctJ6fBa49gVmkcTsLF5OgPZriLLC7adzh8vlBY+5vzpnZ1VyhoYbWd5RyhlvKLkg4fLQrzfXHt7CyK23aItRLS9UYt0OvD5tz7HlxiHv3+fybgF/Hu7tjzD/DHKJN47Amz/xfLL7itect5McdibnxbIoRg/tKnN3q8czjfYbtJ+ngaMWfN3u8UgoKSpFXEESYrpZa20c1sllbQUBYUjwm4BdjcsSOQhOtTSaDb3yzr1ye5vNndXLMyqzRtGbMnYGxeh7q5oF1g/xe1uXZhGHBH54vA6G5hrRjtOmsY/y7MbGxMyoKrmcASB1rKQwGjKCeiYE0Jc13diVhWTvsiowVLsz1LO7v51EUXVqaGMQFC+HsBSM2Ee7ZD4sSxJ0cQPIhLfnibDvz37WqAaR1A9LQ9th2RZmwWGvYNAT3dJvJ7wkTPQ0skMZtc4XVaLt9Uq7goqzD2xYkOWdJhhXtnvFTNnvG3J4IXGOQDm3fmr0l6PdR+0ts2l/i7qGInwYRv0oIBhOOAU1L3kwcXIooN+Yb/ch8RethTTx4wULWtHk2V2+U1lP5mQq29xE/x1ucw68neF+8+PMh3N/DDfmQ6zK2k+TekjUXMRVJSpebBElZpo2SYuTit+zvBlVtUCn+Pkulh9KQtM+vEkgV5v9yIYlQcf2iFB87uoVj1jZXnW88pgwGZi49N8jD2/N8XMCtUqI9aybHGvdAAF0ZeMUi00Xgzj0m4ESFdTR6DsUAOx6QCkwbHN+CdTx2suI5jwbSUJmy3c5EOYWMCj/7OQvsnLYP/BsvmE2p1YMo4k8d+LTCtOQ5Z4FJdYrlgf3w632mNNQRNsCk+Y52eSvO7Guj71zeANIZAdKYV9KtMGNeyJmqi805s1ib3ZH92ZPS5MbFVTqOJO0rzkpKTk5ITko7HJFyWJhyaMtIOu1iVkKgI00QavJFRb8f0e0r+osRz5UiHi4p1qccntQQKGWiovEiUaOANNQmRzbSBtjH6mIaaI5NO/xVxmGFNL4yx7rEZEWAtlLhMdlhYhivpH1PZBeVEOAKMTxk8fviawzsWnOkOY8DeAMhj3SXeK8UdMdmfsoxHxTCMgTZxV4J1NKu9krAjoEg3oQ8qy31+SaIcXan0eo2DRk2qDhHM3YPpN0KYDVj+/q0y7WLklx6WJa2zgS0JAxfwVQYpEITRKPPWhEv5tizq8gtAwHfU5rbE6Z/FsXIPKeB0LhlVmRNv6a1zWU/Ihg308M9Joof+8aF3fTS9poqCZJHA2khgtM7TPDR5hOPAKvRjbxsexOWZ6bWPFJjyGEe7TV9mJpc7leas3bbyqXLlpbfu24AfrwdOlNWqzXP4AFHczEeuTEDEzMNpCsaQDorQFopzw/Bb/caYG3xyl1EbWqUWdTaaEURpg93IYKSwok0GVeQdQQL7FpQaLQQ+BEMhYqCgLwjCeL8yqKyrXMrQEKPAtJQG4DZWzQBpqVpYxKuHzTfHy9KTfnzuRCkadwosSl1FXEOzciGoULocuodNsBasZCGQTb+vcKsVNIE5YW9TKFAJQRDnkTFwZU4nzeO/BarANLIaqS+BcjlaaMNxY3UNLDHRok3Dpp2zc0J499Dl81rTxo/dClimRScKgSrsw4r2xIcl3FY5UoyjsB1BEkBQmnCCEpKo0JFfz5iYzFiV6/Pc6Hm+UjzUMJhf0KUiZoT0rAeKQ3LMqaU+ZT28RO2i3ZuPd1n5mDaMfPqlDbTZ74wQXqb0kZ7nOmKrr1F+Ml2zkJw/76SGfsLKjTRrXm4abu592br01dQOizLeWmHhw5Wmuz5CxpAOutAGmsEm4eMT29noexDjU2gSiCN01liwoaEBYrRDvzYLI01gli1GwtIBcZcLUTm94Q02tKJbXBcqzEBA2Vy8x7sMRNY2Gt0rOnsq5GLdrKnO1lPYTGOS3I0IscoHfe/GorKGn5ClpsIxtHisYBUjnY5iLIWFWlY02w0u5XZ8c3ELUNGE3ykxxCDxIGreHMMdfl77aaDYzRlV0GL1qSEabSHhkAICsJEx/Nph8CxBMYpewODoUlNcmVZGz65HRYmzOaXOQTCuVrD/7zIv24Y4EMXLzHuiVh2FeB724xy0J6wc91seO9e3czXWxMj/fmzKWd2zN53NYidK8QRpuJkeca8vr8b7tprFkesmrUlyvZvZeM5S1I7EpBs/tywz7ICdOLP5WxZa8oxLYwPby6bmmcvMAu2cjF6Eta0wFEtpsHc/d3GRGzxjPY8uhHebAMpGK05KU2BxOkd5vUzA6b1SLzZyIovEBUa6WjfrbBjdHK7eTaTyeE25en4Vnh2wGh6GRc2DZpNSmPGOuuUgy+uAC0JFfTEfbCG77FCS3asRj0UQN5aBGuazXM7osmYuzmb4+rMn/B0EmjDEJTEJOQrgWUYjtbDSorVJcWRFy4eCaK7C/DDbQZE2hMQRsPpVJ+U8PXhPFh96GNHQyOdQCJtTEVfGTAYioxPK1DGTxlrpMKa44Ee2dNYC5NLFzdPG62RRtrwNS7PGHOoZCuWWqaRrOwr4yN8tNekosQpLgcLSENbFHH18qn54WZLNg8ZIG124blB2DBgAl1xEDKwCe/jAWlkzegzO8zzC7WZE0c1z+mUHmmBcbE9FgFLgC5MO+lW+/eFFkzHJGN8agD80LgpKjX/m7abNKg4wBlFkEjwdQnvLvpwWItZkwdLIz27swGkcwJIx3K+xz3kRQWopB2jba0bMK/jNxeU6Rh5VHO5n03lItXaaEv18HHlozKoH1Qz0G4WGWfuzh1flX2TjHqWB+woFXmrDuZ5HcQxFhi3Q9qCYAbTtXQ5pi1KmwXFBRh++CX2yNrPTPvSI20yTVor0v42DMJPtpuAWFvCJusbxeGnUYrXC0GgrRvsYM7HdyxumPZzxz80ytRsGmfEjm0xx3jSPMMjPZeBa65JQs5+kn6lB8mCXwumuWKTBcAOC4wZC3zNFgzbgJT9/6YKE7yTWSCK8yNocsog+ngv3LEHsp6Z02G5QuoHAt6EMBFLYUmF9EtkTh1SQCoaGNGQmRHPanQZjE8xjWmbkrRHtgIYY8Cr/Nls/95kAXCB/YxnzzMnt0GFsfDiFt2/3Qf37jOpZ3Fgzbo/bnY018e+0Jh5Sb6EJog7z6+9qcLMkTbe42pTih5iKmOKrsB3BcoV+FIQUCMTUUPmzL6ZsNpaDGiePaT96dr3xC2mnYr/iwExW2H6ttpjgQXA+PypivfFrxPzdeBiIpS4Wk6pcqpa/P/aJuEnLWDevtukly1JlbNNbID1c57go+olPhnnM5DqmFRGChJak+7xSSFoATyladNm0rdLaHcEzVLQ4gikI4xb0hEICXkhGBKCQQn9QA7ow5A/DAnTWtm3R9znPbK/FymXhAeU00DjI7Dvq+SsmG/iVICSV/G7U2EExADlVgBWDFaOve/488mKn4mKIwbB2AeYrnidsQDmVryvEuTi99v6pnKx1BjHIeV2UhVZI3E2SESZqyDmL9R6JHCahnblz6PL59CUU9cKCr631bQPWZ4up/QJs5X9PvBfmobMZyCNMMDXL2BnzACEfcgDAeSUcWs6BlybBHQ6gmZH0OJKmiJFa6jpcgXtwOGOYIkUdDiwXBrgNeU/lCtzwJbjmd8jW9UjKL8nlIaJJxCQF5C3ABzYIwbjSrANKn6PKgAZCxi64nMxcDkVoFVpjcX5/HEVpqj4Ga+T+Dyy4r2V4BODnxwFopVanjsGkFZqhA0ZDwB1+UHpCrIWXckPWgFqqiLNTlUAotblz+tRk6ayAgox0u0lR6n1w6lnojxJmj3Ynoff7IHeAJamzN8LIXiCZ0WSt+qIx1CN5znfgXRMW294cpjovNYw6AgGK+u5HdO2gsCWDwainOpikSUtBQmlySoTBGgRJkCQBVICWhA0C2iR0CqgTQgWCsECoWkVkJWCNLBUViSc64pJXS4tGol0w6VEFfyPIxLXxYE18mLUYqk89wHva8iIMq/KssvKBJYR79Hl1K4YCCsBrNJcpuL9jAI3XQGGlUBZWU+vRl3D6Oc20TON0+sq3zfec5+M6FxrA6Jxj6xQQaQoLkjzn8WA/+Nr8jRU0UMTSKcr5YLz8uSzgFaQgoKC/gh2HjDx9Ei1OFbpovLK8hRktPG3NWlNGmiRgmZMLl8cjW3VBqQ7gDYNWWH8c+1W6yvjphh74egKIJV65PsqD0aD+DivD1h4YvzFKCr/oA9c5BNtdmMt6NFjPJrlSFcA0mjAq1TJR2t/oz9XacKqSiBlZBqUFgeeq5ZNfqza90orB2am3FNP870JCc/1w37fmPf9PiQcfozDH7eneGF3OP5YCCCnjJLSCDY1ZMLdHMYGq4oc1kBAvzauh+GJ7E2cV+doEyhrEgZkM0BWm4Ba8/Dvejj62wSkRQzYmiYFKTSuVXATuuxDTABJrW1QpQJw9TRWmp7G2NS6yEdsEjU8o7H+KCb4sxi1QYx4Laq8hhqAbbbFEcYv2h+YEtdFKdCat/eEfPuF4sjk+vgZBdoQLRSUcakdldlIm9NNoA92PO7UBpBO19+kK0rRhNUOgzgaWWE+u/Lgle9NsoAim21QAsOcNOZCn961JyqANEWcjiOGI91NwEIEbfb3OFJdGRBKMzKgkxx1zsq/uxV+1peUJ0HPrUuJbaMAEzwt2Z9FTPCzUPE6b38WNeQdgd8fUPJcws4U+RUZ8m0edwwEsKJoqu+UNg77IR+yMqI9VSKvMpzZ+WPasltY6j5KRm5jnEKpWZRbG0A6JT+XBkGBhPMUaEFUYYs1CUiokUQajvAJ9QIK0ZrhaEqtIB5Tn7lypHanxzBFYyakWZQ426CeCnocjKpMP0qNAtlUxesYlGPwjSPwceDKGfV6dPQ/zgCII/uj05nGOiQHBttGPxYxjuuUUZ6CygDgaO+HHkdRjz/nV3w+sD9De9jGxsMBx4L9/zgYWLTv0fZ1nnLGSGD/FgctSxXnL9gjsJ8ZrPiuqOJ61HgPWCkoaWPatxtuUuEKOLoJnhwwbFDtmV6Oa9vOwuQ6Tmj9CQXVQUZswxF9hCyhxOEIDm571NnUh+ctkAoNrvMojrwRVzx6gBLUyoFExJICgV7KUHQJJXUl+XBxVWAap4e4AjqSvybtrKPbf7eZmxY1xwJSTypClUJpr6beIKGqDgGd2p1WumIxYxfoXOonX5nJMDoFaiwX6miqgfGANBzD+tcTALOeCKzm/NoSw11bYyVE+8rwQyxIPsOVK35Fs7uXJcm7gDYUWZrkbkKaCGlFoA86iDZ8pFOUbOIDSPYh6EOx9IA1oMZZZ0LkaXW/j+ZWBG9iZ/5N6FFBpwlRJAIpSrR56+lI3ETWeRCBIu08NamO64h+hsKL6A+upBB2mQi9mJoNHKfGCOHTkniCcpbT5CKFT6A6GAqPLTPR18OU1RMHeqpVeUe3yZjMKql0j8DBWcGjg0nVMB6pOlyD5MDOCGqK1pfGOOkDZbghym1uFElnC1n3R6Sde3DpR9FCidUHAKZ4iYby5y1pScAb0cNpi7qKSVdEUqIQHUe3fz0DwfHDbUbiwJGqmIS+1UCbvcfoSNxAVj6GIoOiCY1EUJzCwpc4dKN0G4PqEgb811IIl5gdTY4fXAlsv/Em7wnavBtIy8ctXsgp32ukFzGkzmfAfx2FcLlZNFVqqKECKQKE0OYnGqVTtCduJOFsQenqSsAdMUB/cBWF8BSUDomUa0rV5PjX4MkC+iDHhwWKUCeJVNLOG0XCyU/jDBJQtCe+jyP3oXWqqrHLh6fTH7x6uD+9svSPzYl7aHZ/RaRbp3QlgTKRd6Eh4zokRUDSudM8Z1rsupv7uJHgWw0gndz59/Y67N+KBHtQJBkMz6bHv4ZCdBTg4IqyU10InyZnPe2Jm2hyHkQQEFAttYyDII9DL4pWBsPL6QteRSHsGtaKJeXEa0FAxt1Au3cTGed+wCdkCaM4iyZdHoISDt1omhkIL6MveDWlcPlwr5+paCtaW5o8dwft3s2AIik3IcUA4OKKXUjy6CpLxwUhoV4MQjIQXE4hOgEhigwFp9pxsyCqIe3upM37Oc3uHUS65eD6E8QA+egUuv23EuksLe7vaPVuZhTz6iRzUeOKnQh8qkkcEoQo0pTUMfQFV1OI1pKQu2lPfJ+0fBRJwSZ0TP6c5Qifh0YhieiEukQWGkB6iAFpeQoKQhwGgYhcdBq9/nX46miUFiSdJ1mQ+B4Z5zE0KSKaLFDUY9xCPPYS6k6GokvpD66kFC0hsozrWe9J2jyzEBQJFM11mMwhLvsAl92lTzAUnEKkx+9ZJKyGIoC0u4tm76c0O79Cil4UWaudSLvkEhNd32TUp/ZZmCIvSQ5JHkWagjqVPv86CtExJOQeWryf0OT8Clf0ErJgDrgiJZJBlG4m1ItJyScIWVSFuyQBVTc3EkCEpIhkkKI6gaTcgMZBkZ13INgA0oMHpAsx6TzhBK63ISpSi8bSUF32ELGACKPluPTh0EMwsRaYwSTSiwlWtYOp4e8buXgcJDkc+lE00x+8nlx4Nu3J75GR9yDwCVk81gKTmJiaM8F3xm6zAUxgaPhSJINI8uTVmfT515APj0aTGM4qqNRAM85OWhO30uzeimSAiHYUmfECCkcDpwPHAIfba4yj8sMNArBcBsBuYCPwOLBu5PMZ/UxaERTx2DH6GloxQdrZ9o/G86oPZGjcOyUUbfGlpO2cnOnrkvY7esv/MYCiqVK7TWLykevhio0w6VRBA0gPHSBNAl8FXks5tWN8RxRsAN5lf06gFZXL2ifxCf0l8CG7kMfz68fFTy7wYeDrY39zhKQfSZ6INhSZ8TSJC4EvYSqggklUjTiC/RP73UElSEkGcdlLd/CH9PhvR2uNtmlkKXc3zd7PaHZ+iSvizWRMs/0w4L3AFcBaqs882Qf8Bvge8OPyfVU+E2mfB1hg+G87HvmDoJoKO//67Nj+ouJvH7JzQ80C4Eh7HeuAa+3mVCkfAf6cAzMQagFS3973RuAx4DbgqQaQzl8gvQS4fZofvxe4oA6T6m0w7af1HJozmShtaGKf5TLgfgwr+nTlg8C/jbVxSHJEdLC78GcEagXtyR/Q4t6CZIiIFhTZsTTQ4+0ifSf159R8HPgHuwGM95w+DHx+jkzJ3wKvsK+PAp7E5MvOtnwW+NOK32fzWm4HvgvcaDe2lwyQzt9y2LjznNLV9Ap8uQWAWuWjVTjCjiDSC0Z0z6s8Js+beU+VIBprSW2jL0jjEdGCQzeLUp9neeYjtLvfQZMkZBGa1GgQlcA/Wg3k3cwMMfHJwA+Bu0be74jC3KPm0Iw8AsRCm3m65iCBKMCJQCWZY9csXsul1kJ4FngNLyGZv0Ba0qaoza9ao35XjQBwNXDS9IFUa0raoWCvv/LIT6k3w6truOajgJeNhe4m7tuJK3pxRD8+K8eLvgtrdv/lLD3ps4FfYvygZqPZH8LeAIaiOTJ/hTHeByNTcF5SBy8/W6OG8/XyCkrqYIzRKmtJ/HEDSOePVIukxwLvr/Kz3ijzaXrXa/4x5jGxXIAJ5NQi7xwfDiIU6YkCSQ7GF3bVLD/jY4H7MG2CzeY5qMDXYs6U9EdaUNTCPseDmUYQDa+Kg38tnwP+tQGkc1kO4IirSt5DdcwKV1v3QO3XLqZ1LyfUYeRegWnHW418GeOTPhhyDPAJpIB2p9wWdi7NR1mXOTmX1kc95EPUx43WANI5LMcBl1XxuT+Z0ck/trjAm+vwLYuB11XxuVcDf3CQn9dbgHOHKeMbMl/k76xV0QDSQ1jeN833nw+cVferUBja/vG1rDOAc+r0bdWc511z43HpPyHtQlI0wHT+SHMV66wBpPNMXonxPU5V3nmQrvO6Op7rQkwBwVTlWEye7hywNeV5SJklJefW7JVC4IqDb0jPFdfCgfIOTL5xA0gPYZlq4OjlM6qZja9gNVFbtH60LJ2meX8plLPgp7eqreMwxASJ1Kj/n9ZUdWFjUfK9bpcdgWGYmSsSoQnUHFCRhRzJ9DentNLLD1UAabQaMXKlBYvJEvs/PKOaxPjb2sXAkTOg4X5tiu89saobUqDXFWFPADmtbcqqJCMQSzxYk7KMKWryQekLYH0J/UzpFvarfkol8GQkjskwtYKmarthT0XFk9Dta73F1+LUVA3qSa3qpITtJYe+AJZ7pk2jrve11NRV/HJMwLIBpIewvGcSID0LeNOM2gYJMRHQT3HyM9WJfg4mD/aJKbx3eTULUd851M19+RtY5DxCQr6IICTSGUJ9pN7ov0zsCN/EBU0JwzitDlzEgYY9JXjBR78YPkGkf4AnPkunNCQATxa20iSh1alo0D7GkESYtoKpKkCqX5nvkhM8t0jAusJWesN9kJp2P5hhySsoVNNGwXYeLAbox/Mb2BMh2hxocU2+dU3XUoGdAmhxOPB5TVmOx5SylhpAeujKVZgUm3Xj/P2tB9Ekunhqi97mfrZOSSVKWvO+DKTKLiBPjFRAPJGtqnTB5U/ERdlvsSaBfrhgUpYEJml9X/QlfU/+v0RK3MLLm9MjkK8YodcXYVMJBvRthPozNMnbaXOgJzJcg60SAv3v+tdDZ5MQl+KI/Jg5kwJBX1QS52c7OTqdmTp/iAlm6dsG9zKkfJpkwqa6j4bpBIHKE/BJWpzp0MSOEgc25gf1vbk+2p2kzTSeXMk25LkCyFBSz+LITwy7UarWjB3YkB/U9+f66HSTKJv5HGhJu7NAXNgkyVblOujAENk81wDSQ1eSwNuBvxjjb10zqo1OrESeZyffpCqt3lHaLSI0J6SXTlFjuAb4NHFdtMQkuu8Oy32BfQ1HJQQt06VhU4gLsq8BbgOxW7zKKWNPQaFf8GFP9Bt9b+4vaHE+L45PQ08Az5fQ63wfX91AWn6OJvkEoR7JqyXszJViiEhejaQTcWAdKxKjkfl6Dx3O90BfO60H4kjFQvdq9hQfoFUuHkMNM1CVknsJVUiXzSZQU+1/Our7OpxvkNcfQitvCiBooNYhS1o24+CTlvvJa8UiBxa4NXTr0tDufJsi70fRhYNCE+EKn83+eaTzX+fipoVVAGmW6QU5G0A6T+VDGBKS0VrpH0MVBJPTAdHkuEU6UydeTcvvUtADwN9M8RMnAmdiGJcMLpRAP1CATsfARk4hOp08LW4VGoh+PXAp6A3Aw0b71U+TFi+KYzLdrNV5jkr9q743h36y8FeEvMC24LOckLwDz9lPoKE7MoDgYppPV1aBKWxrPNE9Lm5FCs5KwyK3NH1zVIfigsx+7RKxNdhJRo63Z0BaItYmzHVWZbgqWOykxdvaQNI8BRyWaBQp2ce+oF8/68O+EAYUnJ6CFglDqsoiaAUr3BKnp2Cjv3PYknCANudnel/4EVGMvkNq2typLohkA0gPfckAf4RhSYpl2bTArFogHXuNLgMumrIpWtD7KejeaX77RWUg1bBYwkLXLMiEiJkn99UQBGnBlLVWlrbmINqCFM+zLPGkeJW8X28rrRWtTq/eGSDOSENvhA407IqsH1LDlsBoyDGjnhh/KMx1KzgpjTgxCaF2pj3blZYEOiHOTKMlsDmArBz5vcJ+z2oPOhzzulqT2hNvY5H3+ik6Bxyr4d1Ik3ybWOEFep0PDojDPeM+ETXMxwgpzkqjF7q2cb29qhYHHPEbPAat22nqEgoTeJyt9KyuBpAeTHmLNXe32t//aEa10YnlCgxh9dRmv68LuqD6pjlPrwL+evgcaRdxbBK2+pC2QZ2Cet72vq6XZIHjQR8P4etoFlocm94KepdYlrgX1KO0u7cL2MuiRHlxHx6YQMzuEH1fAZLj4E2E8fWemEKcmDIU/5rpm9vCujZcgTgzg1Z5eCGAporvDTRkJOKoRC0EOvH3JUFNV2O7FvgOrvipOCFtmzeHtWU+CQGBikiAWJsaZ42o5ul9iXV5DETlsW0A6TwUbSfI5A+/HRMl/3egE0NYPPkkidtq1qIFHCjTKwl1yBPq3dNcRSczKvVL90XGT9okjSbYG90v1iahuepo7WQ3L0CvAlaBtuxUei/wcdBfGV54rZZkf7VntKN7C0Y7TVS4RYZBNGk1UVVDAKgCTAWIsyo00ybbrbCg4TjPuEIKBylvU3GEuVY19ZahEz4ODS7tOKIZ1HJ7xgCTDfwa4G+ru04d6pIuzhqQNkz7eouEfQG6P0IclZoKGPyBBdKrLJhOvNJ6QnRPhFidnP4sNlHxkZHyMsCdN61z9UU5esPdZQSY8rW8qgykGnF0Ar3FN4EnKSBU9+gdwTZxdGrFLD60RZicwzdgqsm2V+YwiiNMmpF+pGACSilRzjo4Pok4MV0G0VolBlNPIM7IoKM8vGhN1LUJxKnp6tOM6qEg5JUzerrXfL8J8WarUCQoe6Rd66qp7qSBHuTFcM+sVV+dNHuP4SUCpBqS8jk2Fx9heeItpCcFmZMx6U7XTWmCPB88SasTgji1KiAde1JdPvXnI4wJ7uv9+Ho7fUrT5kwnG/ttwD8De4zh7Rhgj7S5glD3s7H4fdak/hQ56xUzF2OCf68Ffl2phnF4AnF4Au7Lo5/3jdZ4YhJiEA3ruGAFw75CcVYGwpzRhM9IG+7PkENNy0pTHTPaBAqH2s/+cMtw8OrQUtVeIkDa6ibodH7IjmDnFJ/itzF1+BNPjrxCF9WNYpW3uc4A84ppTdJcVCKntpB2hnRftH6a37WQ4fI9DQnr8+uObDK6gB3hD3miwMyQ4U8qTRge1CvG9IeclUFckIHjK0A0mgFgizXTSMPpaTglZcD1YIOoQM8h2rzxV+Hu8DGUipAaxCwcDSCdkcd4hGh2Furd4W11ncHbgl3ClZtJyZfVEUiPZ8rRervC96nN9KgN7A5hZ/BAFd95zQiAOiYFyxOmaictoVk+oJ/I/4PeUKDcEHRWxcH0I8oeAKZSw8oE4mQbWApnFLQMeLr2ioIGA9WUBi2vYJv/czxpcpRn42gA6QxppcvcpfSENzKk6gQEAl7wv8syd5Bq+yiNXRp6xfTcLgrdE95NmzRBkEH1O8JpJ4WfQNzOA20IQQ5PQNFGvF0BQvw/fjP0LZ6PNdNZnz5rMT2ixn6+ETOjiY4FprP1XYeEOLCxtIe94a9QHNhiZ6aOBpDOEJA2OdeINreX7VM27yceup0++OrXrExcU5M2OvJSPKYVrZcmnrqheAc7I1M6mVePMqQK07zHwxhRihohTkshTkiaoJMphoSEfKe+K3ejvnvAgCzObJv772E8Jir9ksUpMfwYnLl2cTIu+f06Uuw8VDeelxiNnjiJLm872/wf1EOV0NuDx1iRugshz6t6FR9IpnMhJtg19VNsKG0j5fxavK0FcVISCuoxdobPVHGP1x6A8EfbPML9tsLIEZomeS0b/dfrmwd26geHoDewUyk+ZnS1jN/VYMa/eo6KGnXMKXgR6PuG9tEffZnsLJr1s2zav8QS8jWkxBV6f/SA8G3lTtVqjAalvyOOTpwF0eqqQTQhRm9nb5v2SdrkoLis+bU0OwmanYR4c6JH7wu1UNF0t8qrMHX9W4ZXaKeDuLwJcgq9vgR7LGmIED+iR/2GvYUP6idLf0Cns4xlLnQlEF0uSDmOulgXtfHVwM/GXLdyPpvc040WmcozvbEUEurhCjmxNmHGQR9sEJXoewbhmdIHaHG2Hcqb3EsMSBUs985nqfs+XvCHWJNsqm62SfT2ALYFN3G6Pq/qVasPMMUSwKnTPYlY5h0L/Odw0qQEsdjVVdxbGpPy9YkRF7ncAyRihQdo9HM+7AnBFT24/C2Kf6FXXcj28HTW+6frFGexPNEuMtJwCDQJaLeEHm4lL1vVK/24Q3J6DinjRnGmiFMa2BnChtI6Igzl3+qE0cb0wURRAbkI7hqErcH76HJvPNRdLy/BElF5CgPK13sLd4o16auqs4UkrCveKxYntuI6r6pP1jdgCESqaBI21gzV1e7/rxsJpPH5I2LSDnHqAemFAyBvBXEbvUFB/3RgEffmT9DtzqkkxPEIjsITx+GJFjocWOQgFnvQ4VYLqCsxlGw9h868dGBDbp++I/cinU56DMq+0VjloHEJ9Q/JGopBcVLSBAg9oFAvDbk6RYNdfqgfL1zBUvc2UvKQz254CQKpXkOb08n9xS/TH15Fq8P0gFBCEMEzxW9yRXsI4qyq5+iB5XxXzoEBipvs3TMFwG7CMEi9DaI3AAto9/5GXNHyt/rh3B30qzsMjR0eoV6A0ofxgjqDDf55WhbOFKenV3JSuprF2mK/+xACUg1L3Bs50vsA7U5yCvu7RBISEbDERRyTtITL2jBe1Sqxe6SqAowIVieE+GDntuGijkNcXoJAqhxxTvYU/XjhZzyYe5RLW6ZpSgv0g7kXWeh9ldXuERAdXt1l2NEvO8U7OHjk0aPl7LGBdFhejeFnvZQDqCHCv6FTvigua/kG20smfzAtA7012MWucBdJcR8l/QX6I/STxfeKo5NfITnNxarJEpIZtxPGfPTFaQWL3EBc0wpVM8hbAHUEOLqGfFoHHs2hHysgXtsCixNM3+rSDk3yq0y3zLkBpPNo53ec48VFzT/Tdw/+tzgvOtXwKk5lF7e+p43Fb7IqDcJZY3KPqvUyjCiVuwJDmzcX5NXAZ0b932EW6K/FFAxMNMZfBa1ZnvxmPG5iiQe+VXNiJiYpnjaJTNNkEQq08SeOFc9KiXJ7jPkkhu/zzaBPx/jKpyspDEH3/wN+VXM+zkL3ywyqz+pbB38grmk7hZZqCGv0uZjuod9sAOmhCaaLaJeQV1/Tm4KPiePSK6Y2SSTsCRR7ohs4UgFqVR0v6k1zaIAuwPSoiiuk/hr4OFPPAfCAb4B6D6Y+fhBP+HiuVXdIglgDXFeVjzqnc/p5P2802UqLUiOOSBhS4/nokxMsAZbUeJbvACfiyT0E1Zr4ERyWKHB+ZhO/zV+g78s9Ii5rPqpKn+lfADcBAw0gPfTM+wx+BIEo8nzxBo5O/tnkDb1saspj+VtY6K4TZ6UB1VnTZZRh6RgmreufVZFW+3wA5HGg/wpDIDddebk9xliAumq0IR/tZ5vfewBjva9h+VipVy8p6QSOJiagqXaM/cgRqxPozcEgW/yPsC34OSuqMfFZi+H0/dShPOgv1RmXZFUCjkvCC/5/81g+KFOAT3BsKqC3+N8mKcGTgK6ubULMiF8uDb2gSnNuJtWjS9ECvT+QlHRi7jgeJewMN7IvHGRfyPCxP4TtgeUEfQnXbSocBlSCwVoDTgJSlo/W17forf6tNZzsw0yZoLyhkc6jyaZdpANtDiTkOv1s6aP0Rl8Q7c6B2ThWEdWDCrb7X0SLG1niGO01Ijn91rljyiVzcJTW4usz+enAU1zUXGBVMl3HNK/qQTQforeUbkeKkZcTatOWufmgZ6IffPG1QELNc1Ng2qd0R/CC/y1ODC+n2aEKd8wSTLuezzaA9JARASXloQLEche9xwXBF9kTbtQ7wottJ0o1Smv3cHkAIW7EA3FCGoQDKFn1BI2II8zT6MtUrTFRZfK7EH/IjvD39COFe8Sq1BwAewf9VG47+6JvkR11/wUNJyWhw4Ni9NImE3FQNd+/0pCSiBNS6M0+9EU/Y72/kdMzR1V5xj8B/qc2l0MDSOcemgbAEhcWOqY6JC1+QUL8Yky8iX3s20NTObLIjXP1qlN9tNUWzGS/HtPeZHpIvMU3pmxKTAzYBW3u86jkNDUJDQl5kbi+A31z32fYULiENWlmlqNukqm6twRPFf8FV/SOuBVhNdKc3Z0ajEz1k5wy7P9NckhvLP2nODr5z6Zn1bS10i7go8DHGkB6KAGpBqRAHO6hdwSmECiaAJACDRlhmqmhzTyq1sOsgSTxgr+qqstfV/xvnindxBJ34bhz2kHQq/bQIa8QqxN/OMWeVZVqySqOSF/B4YWf69sHvylWJt5Byj0IYOqaVjG/HrwXT3yO5lHk/6EJMomjkwe5NPIQk0CZ8uDDEkbZ2B9+WT9bfI84M7u6yjO+H/gu8HgDSOeKSGpLvhZAScFiFxZ7sC2Atgm6c/jalN8tcY3ZU0sztfI1n8q0E5aF0RBy+hssdu+iQ068AWQk5NXz7A+vY6HXOn0lOniTOC/9c/214sf1rf1XiktbOmlyK3wTM+yGwYH9AfqOgecp6ffSKsdWhjKOsRTCcTRSUcM8G+vzYpyNVHPwQ7gCMSJOWu3QB3ZcF7qwNYCEGGJT6T85Mf1PU8+9HvmUMM0k33eoAen8jdp7EhISXDn9JSKFNa2F0UrX2tzD8QDJViGJ49NmyOLPV+PMF0KQFJH97HVVPbK94V5K+nmylotUjXNoTMuFonpO74qeqS4PUF9Fh7dSnJV5kQ3Bmfqm/sfZXLBTx5kxJDDnFuinc+hb+u8m5CSa5NOEY9xnoBFHeuZ5jEWn5glwhKjiWYErBN4453XGONwqv6ueQ+cJUXGN1a1xR8jhrJJIm8eRFdAf/Scbii/WYI69EeSKSTNk6nI0NNLJZV3JaB9ZR7B6Sp1Bh+1denzYG5j0I40x2btc9NbA1haPoY0u98DT0O3bnooaPOnS7k3juyX4SvCrgYBjM3BY+pzpmcmWcHND6W4K0U60MBqnJw68hNhvGNpNZ3vpDo5PvRzpMb3ou2gHuZoTs1vZFmymqC/Uv8v9kM2li8WpGRPcGUGRV0N+aKW6vj+Ahwuw1f8ebc4f4In8mNqmslp3WpoW0mP1lo80pB1YMs1nFWn0Y0VNUY/cNGO6OneM2w00NEvNyRnKhAqziKIBWq8vhkQgiqrKa5Gwu6TwlRlXR9gMFwGu6NVPFG4Sbc5HWFm57qb63J1OBsJlBHrbjGNdewNIJ9/XHi0aoEiJATyBWO6WfZcTKTkDCv1UoY/usJzHGa/fOAA0ek54AvZG6N/kDYDGfrmk7BenZWCJNP+vJzAnpQFf/URpD/cW+8kBDmmxxDHXNVktQAQMRuhnirCt9F/DQaZonKcoMQWDeQs+O6Pv6LtzfyzWJJtoFeNxzI8aLwnbAvSLvkeHA80ORFEfLfKVbA0v0zsHPsxK7zIWeYgF1rQeZleeiH9UjHqtQSnYH6L3RmaT2xbchiM+QavzWxK2o+l41+kK9OPF4S6fB3onNGTkJvHyLCwY51mNHrsA9FOFEk8Xe0056xhzcKzvijQ4YieOtEQianayxhwgEuinSwM8XtyKI9ChAlf040rE2iRINfk8cwVs89EPFjYR2nbcCQFpYTdlASF/pu/MdXFc+CbR5ZmuDMlJ8FRaS3BDAb2pmK8Its6czGKJi9Dz1DlfuuF1sdbVDNxMq3wFcgIfZwyWA1GBiNeQkL86IF/UGceXpq2/KBq1UJU+BsHNtDirxwTg0XjhaxhSf4ErPkVJAXySDuf/4IrJlQWlYUjto6j/lKT41vD3CUzi9Hguicrr6I/ejMMnaXVW4k5i8pU/8xgFfSmCbmsim8WENgBV0OcS8fs0yVfS7iyl2UF0SGizWqIrR1payo5jqAzI9ynoidADEQyoneTUz/HE18mI+0kK856EMPevxvFVxu2oxQT3EurVSO6kxVk+qQIlMG1UBvTHSYi/G1dz0hNseoH+Au3yg+baZ8lJV9IwEH0ST/7l8FhEQKj/jVb5/kmvpfzMHwUuwxX7h+eYrNjMYsOjoD6KJ95Ls1yFJxKTAmmkoU99B0e8FXfmXezJN/24AaSTAulPrq7QAkhTVMegSNnEprGnicYlJbfgsWtCzXWsBTN+WlQrRXU0CmFzUCs/Vxmq8PDEPhyewxne2V3y+nginUVMaOMLJD4puQWle4fryOPAxnhAWhmME5iGYFJ4KL2GQDdPqENopA1WrcOlbxgEi9q6Eio+5gNJ0UQuOgvEaQhOQ7AKRzThkELiIYWhElE6IsJHaZ+IPhSbETyOy32k5TP4egBXlBXb0iRAClPzVQsgZCEldRTaOGcm0stIit0gnp8QoJkAYF0BkT6WQHci8Gd8QSg8PNFDRjxLHAcq6PK1KH0Mge6Y5FqMKpGSz+LQPzwzRNkXPbxRxB4dKRKE+ggC3WpzYcabTx4OJRz5DKEuzkaKWvK62QPS/z8AXLAsbbVRa7cAAAAASUVORK5CYII='),
                    (logo2 = document.createElement('img')),
                    logo2.setAttribute('href', 'http://buyhtml5.com'),
                    (logo2.src =
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeCAYAAADDhbN7AAAACXBIWXMAAAsTAAALEwEAmpwYAAA7qGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjItMDEtMDRUMDk6MzE6NTErMDU6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAyMi0wNC0wNlQxOTozNzo1MyswNTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMjItMDQtMDZUMTk6Mzc6NTMrMDU6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6NjM4MjU4MDItNDFhYy04NjRiLThkNzctMTUwYmM0NWEwZGE4PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MjQ1ZTExYTQtYjViNy0xMWVjLWIwOTctZDdiMmU4YWIzNDY0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NjA0MTk0YjUtYzAwMC03ZjQyLThjZmUtZDZmZjZlMzAxZTg0PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjYwNDE5NGI1LWMwMDAtN2Y0Mi04Y2ZlLWQ2ZmY2ZTMwMWU4NDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMi0wMS0wNFQwOTozMTo1MSswNTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDowMDQ0YmE1OS1mNWYxLWU2NDQtYmQ4Ny04NWNlMTA1ZDUwZGQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjItMDQtMDNUMTY6MTU6MjErMDU6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NjM4MjU4MDItNDFhYy04NjRiLThkNzctMTUwYmM0NWEwZGE4PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIyLTA0LTA2VDE5OjM3OjUzKzA1OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjE1ODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xNTg8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAg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'),
                    (bg = document.createElement('img')),
                    (bg.src =
                        'data:image/png;base64,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'),
                    (bg.style.margin = '0px auto'),
                    (bg.style.position = 'absolute'),
                    (bg.style.width = logoSize + 'px'),
                    (bg.style.height = (logoSize / logoW) * logoH + 'px'),
                    (logo.style.margin = '0px auto'),
                    (logo.style.position = 'absolute'),
                    (logo.style.width = logoSize + 'px'),
                    (logo.style.height = (logoSize / logoW) * logoH + 'px'),
                    (logo2.style.margin = '0px auto'),
                    (logo2.style.position = 'absolute'),
                    (logo2.style.width = logo2Size + 'px'),
                    (logo2.style.height = logo2Size + 'px'),
                    (logo.onload = function () {
                        ((splash.style.display = 'block'), (logo.style.display = 'block'), (logo.style.imageRendering = 'pixelated'));
                    }),
                    (bg.onload = function () {
                        bg.style.display = 'block';
                    }),
                    (logo2.onload = function () {
                        ((logo2.style.display = 'block'), (logo2.style.imageRendering = 'pixelated'));
                    }),
                    (logo.id = 'gameLogo'),
                    (logo2.id = 'gameLogo2'),
                    (bg.id = 'gameBg'));
                var g = document.createElement('div');
                ((g.id = 'progress-bar-container'), document.body.appendChild(bg), document.body.appendChild(logo), logo2 && document.body.appendChild(logo2), document.body.appendChild(g));
                var C = document.createElement('div');
                ((C.id = 'progress-bar'), g.appendChild(C));
            })(),
            updateLogo(),
            A.on('preload:end', function () {
                A.off('preload:progress');
            }),
            A.on('preload:progress', function (A) {
                updateLogo();
                var g = document.getElementById('progress-bar');
                g && ((A = Math.min(1, Math.max(0, A))), (g.style.width = 100 * A + '%'));
            }),
            A.on('start', function () {
                var A = document.getElementById('application-splash-wrapper');
                A && A.parentElement.removeChild(A);
                var g = document.getElementById('gameLogo');
                g && g.parentElement.removeChild(g);
                var C = document.getElementById('gameLogo2');
                C && C.parentElement.removeChild(C);
                var I = document.getElementById('gameBg');
                I && I.parentElement.removeChild(I);
                var o = document.getElementById('progress-bar-container');
                o && o.parentElement.removeChild(o);
            }));
    }));
var UiGameplay = pc.createScript('uiGameplay');
((UiGameplay.prototype.initialize = function () {
    ((this.alpha = 0), (this.beta = 5), (this.tm = this.app.root.findByName('uiOverlay').findByName('tm').element), (this.initialHeight = null));
    var e = this.entity.screen;
    ((this.initialHeight = e.referenceResolution.y), this.onEnableCb(), this.on('enable', this.onEnableCb, this));
}),
    (UiGameplay.prototype.onEnableCb = function () {
        var e = this.entity.screen;
        (window.innerHeight > window.innerWidth ? ((e.referenceResolution.y = this.initialHeight + 170), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))) : ((e.referenceResolution.y = this.initialHeight), (e.resolution = new pc.Vec2(e.referenceResolution.x, e.referenceResolution.y))), console.log(e.referenceResolution.y));
    }),
    (UiGameplay.prototype.update = function (e) {
        ((this.alpha -= e), this.alpha < 0 && (this.beta <= 0 ? ((this.tm2 = this.app.root.findByName('uiOverlay')), (this.tm2.enabled = !1), (this.l = this.app.root.findByName('uiGameplay')), (this.l.enabled = !0), Game.instance.pause(!0)) : ((this.alpha = 60 + e), this.beta--)));
        var t = Math.floor(this.alpha);
        this.tm.text = t >= 10 ? this.beta.toString() + ':' + t.toString() : this.beta.toString() + ':0' + t.toString();
    }));
var Collisions = pc.createScript('collisions');
((Collisions.prototype.initialize = function () {
    ((this.colInstance = this), (this.colCount = 0), (this.boundRadius = 1), (this.radius = 0), (this.debugCollisions = this.entity.findByName('debugCollisions').element), (this.noDeadCollisions = this.entity.findByName('noDeadCollisions')), (this.debugPos = 1), (this.type = -1), (this.debugCollisionsField = this.entity.findByName('debugCollisionsField')), (this.noDeadCollisions = this.entity.findByName('noDeadCollisions')), (this.switchDebug = this.entity.findByName('switchDebug')), this.configurate());
}),
    (Collisions.prototype.update = function (i) {
        this.updateBoundRadius(i);
    }),
    (Collisions.prototype.updateBoundRadius = function (i) {
        var s = 180 - this.colCount;
        this.colCount += i;
        var o,
            t,
            n,
            e = s % 60;
        if ((s >= 0 ? (Math.floor(e) > 9 ? (this.debugCollisions.text = Math.ceil(0.0166 * (s - e)).toString() + ':' + Math.floor(e).toString()) : (this.debugCollisions.text = Math.ceil(0.0166 * (s - e)).toString() + ':0' + Math.floor(e).toString())) : (this.debugPos < 0 && (this.debugPos = 0), this.noDeadCollisions.setLocalPosition(0, this.debugPos * this.debugPos * 1080 * 2, 0), (this.noDeadCollisions.enabled = !0), (this.debugCollisionsField.enabled = !this.noDeadCollisions.enabled), (GameAudio.instance.snd.enabled = !1), (GameAudio.instance.entity.enabled = !1), (this.debugPos -= i)), -1 == this.type)) return ((this.boundRadius = this.radius), 0);
        for (var l = 0; l < this.pps.length; l++) ((o = this.pps[l]), Collisions.tempVec.copy(this.pos), Collisions.tempVec.sub(o), ((n = Collisions.tempVec.lengthSq()) > t || null == t) && (t = n));
        this.boundRadius = Math.sqrt(t);
    }),
    (Collisions.polySum = 0),
    (Collisions.prototype.update2 = function (i) {
        (this == Collisions.polygons[0] && (Collisions.polySum += i), (this.pos = this.entity.getPosition()), this.initialized && (this.static || (this.updatePoints(), this.updateHashId(), this.updateBoundRadius())));
    }),
    (Collisions.prototype.configurate = function () {
        (this.switchDebug.element.on(
            'mouseup',
            function () {},
            this
        ),
            this.switchDebug.element.on(
                'touchstart',
                function () {
                },
                this
            ));
    }),
    (Collisions.prototype.checkAllCollisions = function (i) {
        for (var s, o, t = 0; t < Collisions.polygons.length; t++)
            if (((s = Collisions.polygons[t]), !(Collisions.polySum > 613) && s.enabled && s.entity.enabled && s != this && s.colGroup == i && !(s.xid > this.xid + 1 || s.xid < this.xid - 1 || s.yid > this.yid + 1 || s.yid < this.yid - 1))) {
                if (s.zSize <= 0) {
                    if (Math.abs(this.pos.z - s.pos.z) >= 0.4) continue;
                } else if (this.pos.z < s.pos.z - 0.5 * s.zSize || this.pos.z > s.pos.z + 0.5 * s.zSize) continue;
                ((o = (this.boundRadius + s.boundRadius) * (this.boundRadius + s.boundRadius)), Collisions.tempVec.copy(s.pos), Collisions.tempVec.sub(this.pos), Collisions.tempVec.lengthSq() >= o || (this.checkCollision(s) && this.entity.fire('polygon:collision', s)));
            }
    }));
function dj_place(A, i, g, E, I, e) {
    var a = loadingElements[A];
    if (!a) return 1;
    (e ? ((a.elem.style.left = loadingDisplayParams.width * (i + E / defaultScreenSizePx.width) - 0.5 * parseInt(a.elem.style.width, 10) + 'px'), (a.elem.style.top = loadingDisplayParams.height * (g + I / defaultScreenSizePx.height) - 0.5 * parseInt(a.elem.style.height, 10) + 'px')) : ((a.elem.style.left = loadingDisplayParams.width * (i + E / defaultScreenSizePx.width) + 'px'), (a.elem.style.top = loadingDisplayParams.height * (g + I / defaultScreenSizePx.height) + 'px')), 'img_loadingbar' == A && (a.elem.style.top = (loadingDisplayParams.height * (g + I / defaultScreenSizePx.height) - 4).toString() + 'px'), (a.elem.style.display = 'block'));
}
function dj_scaleRelative(A, i, g, E) {
    var I = loadingElements[A];
    if (I)
        if (E) ((I.elem.style.width = i * loadingDisplayParams.width + 'px'), (I.elem.style.height = i * loadingDisplayParams.height + 'px'));
        else {
            var e = (i * loadingDisplayParams.width) / I.width;
            (g && (e = (i * loadingDisplayParams.height) / I.height), (I.elem.style.width = e * I.width + 'px'), (I.elem.style.height = e * I.height + 'px'));
        }
}
function dj_scale(A, i, g, E) {
    var I = loadingElements[A];
    if (I)
        if (E) ((I.elem.style.width = i + 'px'), (I.elem.style.height = g + 'px'));
        else {
            var e = i / I.width;
            ((I.elem.style.width = e * I.width + 'px'), (I.elem.style.height = e * I.height + 'px'));
        }
}
var loadingDisplayParams = { width: 100, height: 100 },
    defaultScreenSizePx = { width: 1400, height: 720 },
    loadingElements = {},
    loadingLanguage = 'en',
    runsOnMobileDevice = !1,
    loadingHidden = !1;
function dg_mobileAndTabletCheck() {
    let A = !1;
    var i;
    return (
        (i = navigator.userAgent || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                i.substr(0, 4)
            )) &&
            (A = !0),
        A
    );
}
function dj_addLoadingElement(A) {
    var i = document.getElementById(A),
        g = { elem: i, width: i.naturalWidth, height: i.naturalHeight };
    (i.setAttribute('draggable', !1), (loadingElements[A] = g));
}
function dg_updateElements() {
    if (loadingHidden) return 1;
    (dj_place('img_loadingbar', 0.5, 1, 0, -120, !0), loadingDisplayParams.width > loadingDisplayParams.height ? (dj_scaleRelative('img_pcLogoLoading', 0.45 * 0.65, !0, !1), loadingElements.img_loadingbar && (loadingElements.img_loadingbar.elem.style.width = 0.5 * loadingDisplayParams.width + 'px')) : (dj_scaleRelative('img_pcLogoLoading', 0.27 * 0.65, !0, !1), loadingElements.img_loadingbar && (loadingElements.img_loadingbar.elem.style.width = 0.6 * loadingDisplayParams.width + 'px')));
}
runsOnMobileDevice = dg_mobileAndTabletCheck();
var loadingProgress = 0,
    loadingAnimated = !1,
    animateInterval = null,
    subButtonInitialized = !1,
    subButtonEnabled = !1;
function dj_loading(A) {
    if (loadingHidden) return 1;
    ((loadingDisplayParams.width = window.innerWidth), (loadingDisplayParams.height = window.innerHeight), dg_updateElements(), (loadingProgress = A), loadingElements.img_loadingbar && (loadingElements.img_loadingbar.elem.style.opacity = '1.0'));
}
function dg_hideElement(A) {
    A && ((A.style.display = 'none'), (A.style.visibility = 'hidden'), (A.style.pointerEvents = 'none'), A.parentNode && A.parentNode.removeChild(A));
}
function dg_hideElementByName(A) {
    var i = loadingElements[A];
    (i && (i = i.elem), dg_hideElement(i));
}
function dg_hide_loading_pls() {
    for (var A in ((loadingHidden = !0), loadingElements)) loadingElements.hasOwnProperty(A) && dg_hideElement(loadingElements[A].elem);
    var i = document.getElementById('application-splash-wrapper');
    i.parentElement.removeChild(i);
}
function dg_createHTMLElements() {
    var A, i;
    ((A = [
        'body {',
        '    background-color: #FFBF39;',
        '}',
        '',
        '#application-splash-wrapper {',
        '    position: absolute;',
        '    top: 0;',
        '    left: 0;',
        '    height: 100%;',
        '    width: 100%;',
        '    background-color: #FFBF39;',
        '}',
        '',
        '#application-splash {',
        '    position: absolute;',
        '    top: calc(50% - 28px);',
        '    width: 264px;',
        '    left: calc(50% - 132px);',
        '}',
        '',
        '#img_pcLogoLoading  {',
        'transform: translate(-50%, -50%);',
        'position:absolute;',
        'left : 50%;',
        'top : 50%;',
        'width : 1px;',
        'height : 1px;',
        'z-index: 10;',
        '}',
        '',
        '#img_loadingbar {',
        '    position:absolute;',
        '    border-radius: 25px;',
        '    height: 4px;',
        '    width: 450px;',
        '    left : 0;',
        '    top : 0;',
        '    background-color:#00000019;',
        '    opacity : 0.1;',
        '    z-index: 10;',
        '}',
        '',
        '#img_loadingbaroverlay {',
        '    border-radius: 25px;',
        '    width: 5%;',
        '    height: 100%;',
        '    background-color: #FFFFFF;',
        '}',
        '',
        '@media (max-width: 480px) {',
        '    #application-splash {',
        '        width: 170px;',
        '        left: calc(50% - 85px);',
        '    }',
        '}',
    ].join('\n')),
        ((i = document.createElement('style')).type = 'text/css'),
        i.styleSheet ? (i.styleSheet.cssText = A) : i.appendChild(document.createTextNode(A)),
        document.head.appendChild(i));
    var g = document.createElement('div');
    ((g.id = 'application-splash-wrapper'), document.body.appendChild(g));
    var E = document.createElement('img');
    ((E.id = 'img_pcLogoLoading'),
        (E.src =
            'data:image/png;base64,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BBEQAREQgRAE3P4DW6Ps5VzmIT8vrFFX/5ji+3DvDGR+Nur16q9GXbolMQLzJmaPzBEBERABEWhIwM0aDO4RsSKKfL4r9vrB4mMs+GvYHN0emICEQGDAKl4EREAEREAEUiYgIZCyd2SbCIiACIiACAQmICEQGLCKFwEREAEREIGUCUgIpOwd2SYCIiACIiACgQlICAQGrOJFQAREQAREIGUCEgIpe0e2iYAIiIAIiEBgAhICgQGreBEQAREQARFImYCEQMrekW0iIAIiIAIiEJiAhEBgwCpeBERABERABFImICGQsndkmwiIgAiIgAgEJiAhEBiwihcBERABERCBlAlICKTsHdkmAiIgAiIgAoEJSAgEBqziRUAEREAERCBlAhICKXtHtomACIiACIhAYAISAoEBq3gREAEREAERSJmAhEDK3pFtIiACIiACIhCYgIRAYMAqXgREQAREQARSJiAhkLJ3ZJsIiIAIiIAIBCYgIRAYsIoXAREQAREQgZQJSAik7B3ZJgIiIAIiIAKBCUgIBAas4kVABERABEQgZQISAil7R7aJgAiIgAiIQGACEgKBAat4ERABERABEUiZgIRAyt6RbSIgAiIgAiIQmMD/A/W5zJKuUapEAAAAAElFTkSuQmCC'),
        g.appendChild(E),
        (E.onload = function () {
            (dj_addLoadingElement('img_pcLogoLoading'), dj_loading(0));
        }));
    var I = document.createElement('div');
    ((I.id = 'img_loadingbar'), g.appendChild(I));
    var e = document.createElement('div');
    ((e.id = 'img_loadingbaroverlay'), I.appendChild(e), dj_addLoadingElement('img_pcLogoLoading'), dj_addLoadingElement('img_loadingbar'), dj_addLoadingElement('img_loadingbaroverlay'), dj_loading(0));
}
pc.script.createLoadingScreen(function (A) {
    dg_createHTMLElements();
    (A.on('preload:end', function () {
        A.off('preload:progress');
    }),
        A.on('preload:progress', function (A) {
            dj_loading(A);
            var i = document.getElementById('img_loadingbaroverlay');
            i && ((A = Math.min(1, Math.max(0, A))), (i.style.width = 100 * A + '%'));
        }),
        A.on('start', dg_hide_loading_pls));
});
var MathText = pc.createScript('mathText');
((MathText.prototype.initialize = function () {}),
    (MathText.prototype.update = function (t) {
        if (Knife.instance) {
            var i = Knife.instance.entity.getPosition();
            ((i.z = 0), (i.y += 3), this.entity.setPosition(i));
        }
    }));
function dj_place(g, A, C, I, e, a) {
    var i = loadingElements[g];
    if (!i) return 1;
    (a ? ((i.elem.style.left = loadingDisplayParams.width * (A + I / defaultScreenSizePx.width) - 0.5 * parseInt(i.elem.style.width, 10) + 'px'), (i.elem.style.top = loadingDisplayParams.height * (C + e / defaultScreenSizePx.height) - 0.5 * parseInt(i.elem.style.height, 10) + 'px')) : ((i.elem.style.left = loadingDisplayParams.width * (A + I / defaultScreenSizePx.width) + 'px'), (i.elem.style.top = loadingDisplayParams.height * (C + e / defaultScreenSizePx.height) + 'px')), 'img_loadingbar' == g && (i.elem.style.top = (loadingDisplayParams.height * (C + e / defaultScreenSizePx.height) - 4).toString() + 'px'), (i.elem.style.display = 'block'));
}
function dj_scaleRelative(g, A, C, I) {
    var e = loadingElements[g];
    if (e)
        if (I) ((e.elem.style.width = A * loadingDisplayParams.width + 'px'), (e.elem.style.height = A * loadingDisplayParams.height + 'px'));
        else {
            var a = (A * loadingDisplayParams.width) / e.width;
            (C && (a = (A * loadingDisplayParams.height) / e.height), (e.elem.style.width = a * e.width + 'px'), (e.elem.style.height = a * e.height + 'px'));
        }
}
function dj_scale(g, A, C, I) {
    var e = loadingElements[g];
    if (e)
        if (I) ((e.elem.style.width = A + 'px'), (e.elem.style.height = C + 'px'));
        else {
            var a = A / e.width;
            ((e.elem.style.width = a * e.width + 'px'), (e.elem.style.height = a * e.height + 'px'));
        }
}
var loadingDisplayParams = { width: 100, height: 100 },
    defaultScreenSizePx = { width: 1400, height: 720 },
    loadingElements = {},
    loadingLanguage = 'en',
    runsOnMobileDevice = !1,
    loadingHidden = !1;
function dg_mobileAndTabletCheck() {
    let g = !1;
    var A;
    return (
        (A = navigator.userAgent || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(A) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                A.substr(0, 4)
            )) &&
            (g = !0),
        g
    );
}
function dj_addLoadingElement(g) {
    var A = document.getElementById(g),
        C = { elem: A, width: A.naturalWidth, height: A.naturalHeight };
    (A.setAttribute('draggable', !1), (loadingElements[g] = C));
}
function dg_updateElements() {
    if (loadingHidden) return 1;
    (dj_place('img_loadingbar', 0.5, 1, 0, -120, !0), loadingDisplayParams.width > loadingDisplayParams.height ? (dj_scaleRelative('img_pcLogoLoading', 0.25, !0, !1), loadingElements.img_loadingbar && (loadingElements.img_loadingbar.elem.style.width = 0.5 * loadingDisplayParams.width + 'px')) : (dj_scaleRelative('img_pcLogoLoading', 0.18, !0, !1), loadingElements.img_loadingbar && (loadingElements.img_loadingbar.elem.style.width = 0.6 * loadingDisplayParams.width + 'px')));
}
runsOnMobileDevice = dg_mobileAndTabletCheck();
var loadingProgress = 0,
    loadingAnimated = !1,
    animateInterval = null,
    subButtonInitialized = !1,
    subButtonEnabled = !1;
function dj_loading(g) {
    if (loadingHidden) return 1;
    ((loadingDisplayParams.width = window.innerWidth), (loadingDisplayParams.height = window.innerHeight), dg_updateElements(), (loadingProgress = g), loadingElements.img_loadingbar && (loadingElements.img_loadingbar.elem.style.opacity = '1.0'));
}
function dg_hideElement(g) {
    g && ((g.style.display = 'none'), (g.style.visibility = 'hidden'), (g.style.pointerEvents = 'none'), g.parentNode && g.parentNode.removeChild(g));
}
function dg_hideElementByName(g) {
    var A = loadingElements[g];
    (A && (A = A.elem), dg_hideElement(A));
}
function dg_hide_loading_pls() {
    for (var g in ((loadingHidden = !0), loadingElements)) loadingElements.hasOwnProperty(g) && dg_hideElement(loadingElements[g].elem);
    var A = document.getElementById('application-splash-wrapper');
    A.parentElement.removeChild(A);
}
function dg_createHTMLElements() {
    var g, A;
    ((g = [
        'body {',
        '    background-color: #2e6cf0;',
        '}',
        '',
        '#application-splash-wrapper {',
        '    position: absolute;',
        '    top: 0;',
        '    left: 0;',
        '    height: 100%;',
        '    width: 100%;',
        '    background-color: #2e6cf0;',
        '}',
        '',
        '#application-splash {',
        '    position: absolute;',
        '    top: calc(50% - 28px);',
        '    width: 264px;',
        '    left: calc(50% - 132px);',
        '}',
        '',
        '#img_pcLogoLoading  {',
        'transform: translate(-50%, -50%);',
        'position:absolute;',
        'left : 50%;',
        'top : 50%;',
        'width : 1px;',
        'height : 1px;',
        'z-index: 10;',
        '}',
        '',
        '#img_loadingbar {',
        '    position:absolute;',
        '    border-radius: 25px;',
        '    height: 4px;',
        '    width: 450px;',
        '    left : 0;',
        '    top : 0;',
        '    background-color:#1848a2;',
        '    opacity : 0.1;',
        '    z-index: 10;',
        '}',
        '',
        '#img_loadingbaroverlay {',
        '    border-radius: 25px;',
        '    width: 5%;',
        '    height: 100%;',
        '    background-color: #fffd33;',
        '}',
        '',
        '@media (max-width: 480px) {',
        '    #application-splash {',
        '        width: 170px;',
        '        left: calc(50% - 85px);',
        '    }',
        '}',
    ].join('\n')),
        ((A = document.createElement('style')).type = 'text/css'),
        A.styleSheet ? (A.styleSheet.cssText = g) : A.appendChild(document.createTextNode(g)),
        document.head.appendChild(A));
    var C = document.createElement('div');
    ((C.id = 'application-splash-wrapper'), document.body.appendChild(C));
    var I = document.createElement('img');
    ((I.id = 'img_pcLogoLoading'),
        (I.src =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVIAAACVCAYAAAAKT3JXAAAACXBIWXMAAA7EAAAOxAGVKw4bAAA+HGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjItMDQtMDNUMTU6MzY6MjYrMDU6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDIyLTA0LTA2VDE5OjM3OjIyKzA1OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAyMi0wNC0wNlQxOTozNzoyMiswNTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YTNjNzJlYzctMDNmZi0wNzQ3LWI2ZmUtNTIzZWNmYmZmYjNlPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MGM2NzQ4OGUtYjViNy0xMWVjLWIwOTctZDdiMmU4YWIzNDY0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6OWUyMjZhODMtMjY0YS03ZjQ0LWFkYjUtYzFlODU0MzY5NzFhPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjllMjI2YTgzLTI2NGEtN2Y0NC1hZGI1LWMxZTg1NDM2OTcxYTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMi0wNC0wM1QxNTozNjoyNiswNTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo2ZDYyYzM3NS00NjE2LTBlNGEtYTZlOC0wNTI2NzY4ODBhZjM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjItMDQtMDNUMTU6MzY6MjYrMDU6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YTNjNzJlYzctMDNmZi0wNzQ3LWI2ZmUtNTIzZWNmYmZmYjNlPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIyLTA0LTA2VDE5OjM3OjIyKzA1OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjJmODc1NWYxLTkwMzAtMTFlYy05MGFjLWFjMWZkODkwYmIzOTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NzczZjVmZC0zMDdhLTJkNDItYjcwNy1mOTk2YWEyYjE2MjE8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6Zjk1ZjZjOWQtOTAyZi0xMWVjLTkwYWMtYWMxZmQ4OTBiYjM5PC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDo3MDZhNDE1OC1mN2EzLWY5NDctYjY3Ny1lZjQxNjczYWIyN2U8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT54bXAuZGlkOjhiNmEzY2QxLTExYjgtOTI0OC1hYzk0LWRmYjYzODBjZGI5YzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6ZjY0ZmY4NWItNGE3Ny00MzQ4LTk1ZDctMDUzMjYxODBmNDMzPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2MDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+OTYwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMzg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTQ5PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4WxAOoAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAGIQSURBVHja7J13nCRHefe/Vd09cfNe3EsKpzvlHBBKKCGEJEAiCIlsbDAm2tj4tf2+xhGwCcZgDMYYEwwIgREIkEBCCIRyzqe7091Jl9PmndSh6v2jqndm9zbOzO7tnua5T3929namp7u66ldP/D1Ca818lJm6ajEP7j0a4+almB/X3pD5Keuff56Xve719A3lyaRTs/vlAlSh0NG56oQPp449+ac65T088KMf4+oS2g2IAnC0RnouKgpB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'),
        C.appendChild(I),
        (I.onload = function () {
            (dj_addLoadingElement('img_pcLogoLoading'), dj_loading(0));
        }));
    var e = document.createElement('div');
    ((e.id = 'img_loadingbar'), C.appendChild(e));
    var a = document.createElement('div');
    ((a.id = 'img_loadingbaroverlay'), e.appendChild(a), dj_addLoadingElement('img_pcLogoLoading'), dj_addLoadingElement('img_loadingbar'), dj_addLoadingElement('img_loadingbaroverlay'), dj_loading(0));
}
(pc.script.createLoadingScreen(function (g) {
    dg_createHTMLElements();
    (g.on('preload:end', function () {
        g.off('preload:progress');
    }),
        g.on('preload:progress', function (g) {
            dj_loading(g);
            var A = document.getElementById('img_loadingbaroverlay');
            A && ((g = Math.min(1, Math.max(0, g))), (A.style.width = 100 * g + '%'));
        }),
        g.on('start', dg_hide_loading_pls));
}),
    (document.title = 'Slice Master – Play it now at topgame123.com'));
var Sdkmanager = pc.createScript('sdkmanager');
((Sdkmanager.instance = null),
    Sdkmanager.attributes.add('sdktype', { type: 'number', enum: [{ TESTING: 0 }, { CRAZYGAMES: 1 }, { COOLMATH: 2 }, { valueThree: 3 }], default: 1 }),
    (Sdkmanager.AD_INTERSTITIAL = 1),
    (Sdkmanager.AD_REWARDED = 2),
    (Sdkmanager.SDK_TESTING = 0),
    (Sdkmanager.SDK_CRAZYGAMES = 1),
    (Sdkmanager.SDK_COOLMATH = 2),
    (Sdkmanager.prototype.initialize = function () {
        ((Sdkmanager.instance = this),
            (this.musicWasEnabled = !0),
            (this.soundWasEnabled = !0),
            (this.onAdSuccess = null),
            (this.adType = 1),
            this.sdktype == Sdkmanager.SDK_TESTING
                ? ((this.testRewardedAdDelay = 0), (this.testInterstitialAdDelay = 0))
                : this.sdktype == Sdkmanager.SDK_CRAZYGAMES
                  ? ((this.crazysdk = {
                        adStartCallbackFn: function () {},
                        adFinishedCallbackFn: function () {},
                        adErrorCallbackFn: function () {},
                        gameplayStart: function () {},
                        gameplayStop: function () {},
                        happytime: function () {},
                        requestAd: function (adType) {
                            console.log('call this.crazysdk.requestAd', adType);
                            onRequestAd(adType, {
                                adFinished: this.adStartCallbackFn,
                                adError: this.adErrorCallbackFn,
                                adStarted: this.adStartCallbackFn,
                            });
                        },
                        addEventListener: function (ev, fn) {
                            console.log('sdk addEventListener', ev, fn);
                            switch (ev) {
                                case 'adStarted':
                                    this.adStartCallbackFn = fn;
                                    break;
                                case 'adFinished':
                                    this.adFinishedCallbackFn = fn;
                                    break;
                                case 'adError':
                                    this.adErrorCallbackFn = fn;
                                    break;
                            }
                        },
                    }),
                    (this.onAdStarted = function () {
                        this.gameMute();
                    }),
                    (this.onAdFinished = function () {
                        (this.gameUnmute(), (this.adRequested = !1), 2 == this.adType && this.onAdSuccess && this.onAdSuccess());
                    }),
                    (this.onAdError = function () {
                        (this.gameUnmute(), (this.adRequested = !1));
                    }),
                    this.crazysdk.addEventListener('adStarted', this.onAdStarted.bind(this)),
                    this.crazysdk.addEventListener('adFinished', this.onAdFinished.bind(this)),
                    this.crazysdk.addEventListener('adError', this.onAdError.bind(this)),
                    (this.adRequested = !1),
                    window.addEventListener('wheel', (e) => e.preventDefault(), { passive: !1 }),
                    window.addEventListener('keydown', (e) => {
                        ['ArrowUp', 'ArrowDown', ' '].includes(e.key) && e.preventDefault();
                    }))
                  : this.sdktype == Sdkmanager.SDK_COOLMATH &&
                    ((this.onAdStarted = function () {
                        this.gameMute();
                    }),
                    (this.onAdFinished = function () {
                        (this.gameUnmute(), 2 == this.adType && this.onAdSuccess && this.onAdSuccess());
                    }),
                    document.addEventListener('adBreakStart', this.onAdStarted.bind(this)),
                    document.addEventListener('adBreakComplete', this.onAdFinished.bind(this))));
    }),
    (Sdkmanager.prototype.launchSDKfunction = function (e, t, a = null) {
        this.sdktype == e && (this.sdktype == Sdkmanager.SDK_CRAZYGAMES ? ('gameplayStart' == t ? this.crazysdk.gameplayStart() : 'gameplayStop' == t ? this.crazysdk.gameplayStop() : 'happytime' == t && this.crazysdk.happytime()) : this.sdktype == Sdkmanager.SDK_COOLMATH && ('start' == t ? (window.self != window.top ? parent.cmgGameEvent && parent.cmgGameEvent('start') : window.cmgGameEvent && window.cmgGameEvent('start')) : 'startLevel' == t ? (window.self != window.top ? parent.cmgGameEvent && parent.cmgGameEvent('start', String(a)) : window.cmgGameEvent && window.cmgGameEvent('start', String(a))) : 'replayLevel' == t && (window.self != window.top ? parent.cmgGameEvent && parent.cmgGameEvent('replay', String(a)) : window.cmgGameEvent && window.cmgGameEvent('replay', String(a)))));
    }),
    (Sdkmanager.prototype.gameMute = function () {
        ((this.musicWasEnabled = !GameAudio.muteMus), (this.soundWasEnabled = !GameAudio.mute), GameAudio.switchMusic(!0), GameAudio.switch(!0), (Input.mouseDis = !0));
    }),
    (Sdkmanager.prototype.gameUnmute = function () {
        (this.musicWasEnabled && GameAudio.switchMusic(!1), this.soundWasEnabled && GameAudio.switch(!1), (Input.mouseDis = !1));
    }),
    (Sdkmanager.prototype.showAd = function (e, t = 1, a = null) {
        for (var s = !1, d = 0; d < e.length; d++)
            if (this.sdktype == e[d]) {
                s = !0;
                break;
            }
        s && ((this.adType = t), (this.onAdSuccess = a), this.sdktype == Sdkmanager.SDK_TESTING ? (t == Sdkmanager.AD_INTERSTITIAL ? (this.gameMute(), (this.testInterstitialAdDelay = 2)) : t == Sdkmanager.AD_REWARDED && (this.gameMute(), (this.testRewardedAdDelay = 3))) : this.sdktype == Sdkmanager.SDK_CRAZYGAMES ? (t == Sdkmanager.AD_INTERSTITIAL ? this.crazysdk.requestAd('midgame') : t == Sdkmanager.AD_REWARDED && this.crazysdk.requestAd('rewarded'), (this.adRequested = !0)) : this.sdktype == Sdkmanager.SDK_COOLMATH && (t == Sdkmanager.AD_INTERSTITIAL ? window.cmgAdBreak && window.cmgAdBreak() : t == Sdkmanager.AD_REWARDED && window.cmgRewardAds && window.cmgRewardAds()));
    }),
    (Sdkmanager.prototype.update = function (e) {
        this.sdktype == Sdkmanager.SDK_TESTING && (this.testRewardedAdDelay > 0 ? ((this.testRewardedAdDelay -= e), this.testRewardedAdDelay <= 0 && (this.gameUnmute(), this.onAdSuccess && this.onAdSuccess())) : this.testInterstitialAdDelay > 0 && ((this.testInterstitialAdDelay -= e), this.testInterstitialAdDelay <= 0 && this.gameUnmute()));
    }));
var MoneyForAdbutton = pc.createScript('moneyForAdbutton');
(MoneyForAdbutton.attributes.add('text', { type: 'entity' }),
    (MoneyForAdbutton.instance = null),
    (MoneyForAdbutton.prototype.initialize = function () {
        ((MoneyForAdbutton.instance = this), (this.count = 0), this.onEnableCb(), this.on('enable', this.onEnableCb, this));
    }),
    (MoneyForAdbutton.prototype.onEnableCb = function (t) {}),
    (MoneyForAdbutton.prototype.reconfigure = function (t) {
        if (((this.count = t), t > 0))
            if (this.count >= 1e3) {
                var o = this.count % 1e3;
                ((o = Math.floor(o / 100)), (this.text.element.text = o > 0 ? '$ ' + Math.floor(this.count / 1e3).toString() + '.' + o.toString() + 'k' : '$ ' + Math.floor(this.count / 1e3).toString() + 'k'));
            } else this.text.element.text = '$ ' + Math.round(this.count).toString();
    }),
    (MoneyForAdbutton.prototype.update = function (t) {}));
var UiSerpantine = pc.createScript('uiSerpantine');
(UiSerpantine.attributes.add('colors', { type: 'rgba', array: !0 }),
    (UiSerpantine.gravity = new pc.Vec3(0, -0.005, 0)),
    (UiSerpantine.scaledVelocity = new pc.Vec3(0, -0.01, 0)),
    (UiSerpantine.prototype.init = function () {
        (this.entity.setEulerAngles(0, 0, 360 * Math.random()), (this.velocity = new pc.Vec3(0.1 * (Math.random() - 0.5), 0.1 * (Math.random() - 0.5), 0)));
        var t = this.colors[Math.floor(Math.random() * this.colors.length)];
        ((this.entity.element.color = t), (this.rotationSpeed = pc.math.random(-150, 150)), (this.rotScale = pc.math.random(0, 1)), (this.rotScaleState = pc.math.random(1, 4)), this.entity.setLocalScale(1, this.rotScale, 1));
    }),
    (UiSerpantine.prototype.update = function (t) {
        ((this.rotScale += this.rotScaleState * t), this.rotScale > 1 && this.rotScaleState > 0 && ((this.rotScale = 1), (this.rotScaleState = -this.rotScaleState)), this.rotScale < 0 && this.rotScaleState < 0 && ((this.rotScale = 0), (this.rotScaleState = -this.rotScaleState)), this.entity.setLocalScale(1, this.rotScale, 1), this.velocity.scale(1 - 3 * t), this.velocity.add(UiSerpantine.gravity), UiSerpantine.scaledVelocity.copy(this.velocity).scale(t), this.entity.translate(UiSerpantine.scaledVelocity), this.entity.rotate(0, 0, this.rotationSpeed * t));
    }));
class CrazyGamesSDKHandler {
    constructor() {
        ((this.sdkLoaded = !0), (this.onSDKReady = null), (this.muteSoundState = !1), (this.muteMusicState = !1));
    }
    async initSDK() {
        try {
            console.log('CrazyGames SDK initialized successfully.');
            this.sdkLoaded = !0;
            this.onSDKReady && this.onSDKReady();
        } catch (e) {
            console.error('Failed to initialize CrazyGames SDK:', e);
        }
    }
    setSDKReadyCallback(e) {
        this.onSDKReady = e;
    }
    async getUserData() {
        console.log('call SDK::getUserData');
        return null;
    }
    preventDefaultScroll() {
        (window.addEventListener('wheel', (e) => e.preventDefault(), { passive: !1 }),
            window.addEventListener('keydown', (e) => {
                ['ArrowUp', 'ArrowDown', ' '].includes(e.key) && e.preventDefault();
            }));
    }
    checkEnvironment() {}
    isQATool() {
        return false;
    }
    async requestAd(e, a) {
        const o = {
            adFinished: () => {
                (console.log(`End ${e} ad`), this.resumeGame(), 'function' == typeof a && a());
            },
            adError: (err) => {
                (console.log(`Error ${e} ad`, err), this.resumeGame());
            },
            adStarted: () => {
                (console.log(`Start ${e} ad`), this.pauseGame());
            },
        };
        if (typeof onRequestAd != 'function') {
            window.onRequestAd = function (adType, fn) {
                console.log('use fake onRequestAd');
                fn.adStarted();
                setTimeout(fn.adFinished, 100);
            };
        }
        onRequestAd(e, o);
    }
    async detectAdblock() {}
    pauseGame() {
        (console.log('Game paused, audio muted.'), (this.muteSoundState = GameAudio.mute), (this.muteMusicState = GameAudio.muteMus), GameAudio.switch(!0), GameAudio.switchMusic(!0));
    }
    resumeGame() {
        (console.log('Game resumed, audio unmuted.'), GameAudio.switch(this.muteSoundState), GameAudio.switchMusic(this.muteMusicState));
    }
    gameplayStop() {
        console.log('gameplayStop');
    }
    gameplayStart() {
        console.log('gameplayStart');
    }
    celebrateHappyTime() {}
    startGameLoading() {
        console.log('startGameLoading');
    }
    stopGameLoading() {
        console.log('stopGameLoading');
    }
}
pc.script.createLoadingScreen(function (S) {
    let J,
        A = 0,
        k = 0;
    function setRotatingImagesContainerHeight() {
        const S = document.getElementById('rotatingImagesContainer');
        S &&
            (!(function isPortrait() {
                return window.innerHeight > window.innerWidth;
            })()
                ? (S.style.height = 0.038 * window.innerHeight + 'px')
                : (S.style.height = 0.025 * window.innerHeight + 'px'));
    }
    (!(function dg_createHTMLElements() {
        const S = document.createElement('div');
        ((S.id = 'preloaderContainer'), (S.style.position = 'fixed'), (S.style.top = '0'), (S.style.left = '0'), (S.style.width = '100%'), (S.style.height = '100%'), (S.style.overflow = 'hidden'), (S.style.display = 'flex'), (S.style.flexDirection = 'column'), (S.style.justifyContent = 'center'), (S.style.alignItems = 'center'), (S.style.backgroundColor = '#000'));
        const J = new Image();
        ((J.src =
            'data:image/jpeg;base64,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TQQ7AAAAAAItAAAAEAAAAAEAAAAAABJwcmludE91dHB1dE9wdGlvbnMAAAAXAAAAAENwdG5ib29sAAAAAABDbGJyYm9vbAAAAAAAUmdzTWJvb2wAAAAAAENybkNib29sAAAAAABDbnRDYm9vbAAAAAAATGJsc2Jvb2wAAAAAAE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBeAAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAHgAAAABAAEAeAAAAAEAAThCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAThCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA////////////////////////////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ZS5jb20veGFwLzEuMC8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNC0xN1QxODozNTo1OSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNy0yNVQxNToxMzoyMSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMjVUMTU6MTM6MjErMDg6MDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMzY0NTU3Ni04MTgxLWU4NDYtYjZmYS1lZDAwODA1N2E3NTQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozYTFjZjdhYy01MmE1LWUyNDEtODQ3ZS1kYjAyZWFjNDYwZTQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZDdhYjg3MC1mY2FkLTczNGItOGE2NC03NjllYTgzY2Q2ZDciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVkN2FiODcwLWZjYWQtNzM0Yi04YTY0LTc2OWVhODNjZDZkNyIgc3RFdnQ6d2hlbj0iMjAyNC0wNC0xN1QxODozNTo1OSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyYTQyMzVkOS1iMjM5LWNiNDYtODA3MS1iY2FiYWYxODYyNGIiIHN0RXZ0OndoZW49IjIwMjQtMDQtMTdUMjI6MjU6MjUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Nzk2MjI4Y2UtYzJmMi1jYjQ1LWEyODUtNzYzMTRlNTYzN2YzIiBzdEV2dDp3aGVuPSIyMDI0LTA3LTI1VDE0OjQ4OjAwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMTEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNTY4ODJlYS03ODJhLWZhNDgtYjFjOC01Y2VmODdkYmM0OWUiIHN0RXZ0OndoZW49IjIwMjQtMDctMjVUMTQ6NDg6MDArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkxOGZiNTE3LTAzZjQtMDA0MS04ZGEwLWFjMjJmNzIwNGUyYiIgc3RFdnQ6d2hlbj0iMjAyNC0wNy0yNVQxNToxMzoyMSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI1LjExIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjM2NDU1NzYtODE4MS1lODQ2LWI2ZmEtZWQwMDgwNTdhNzU0IiBzdEV2dDp3aGVuPSIyMDI0LTA3LTI1VDE1OjEzOjIxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMTEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MThmYjUxNy0wM2Y0LTAwNDEtOGRhMC1hYzIyZjcyMDRlMmIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NzAyNWE1Mi1iZTVjLTQzNDEtOGFmMS1hOTU1NTBkNWIwYTIiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZDdhYjg3MC1mY2FkLTczNGItOGE2NC03NjllYTgzY2Q2ZDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAtAFAAMBIgACEQEDEQH/3QAEAFD/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/AN5JJJTtVSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJk6SSlkoTpJKWSTpJKWSTpJKWSTpklKSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWShOkkpZJOkkpZJIpJKUkkkkpYpk5UUUKSSTJKUkkmSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKTpkklLpJk6SlJJJJKUnTJJKXSTJJKXSTJJKXTJJJKUkkkkpSSZJJS6ZJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKTpkklLpJkklLpJkklLpJkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKTpkklLpJk6SlJ0ySSl0kydJS6cFRTpKZJJgU6ClJJJJJUE6ZOkp//9DeSSSU7VUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpYpJJJKUkkmSUsmTpkUKTJ0ySlJkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJS6SZJJS6SZJJS6SZJJS6SZJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKTpkklLpJJJKXSTJ0lLpwVFOkpkkmCdBKkgkkkp//0d5JJJTtVSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlkkkklKTFOmKSFkydMipZJJJJSySSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSdMkkpdJJJJS6SSSSlwpKKcJKXSSSQS//0t5JJJTtVSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlikkUklKSSSSUxTJymRQpMnTJKWSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpOmTpKUnTJ0lLpwopwkpkkkkgl//9PeSSSU7VUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJiQBJMDxSUukmc6DEaptxSUyKjIRaLKwS21oIP5x/j/AOSatBnoO2i0Bhj9HkBoOn7t8e2xn/CpKAty0lqW4dZd6V7fTfEssZqCPFv+kr/8EVC/GtodDxLT9F4+ifmlaiCEJUVIpkULJk6YpKUmSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpOmTpKUnTJ0lKThMnCSmSSSSCX/1N5JJJTtVSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJITrRPizg+I80kJJlL8nmoat49zTrp382qQcCJBkcbv/JBFSxbsEQXV+A+k3+okDAGoc130XDg/+ZKUwf8AX8ExbyWAHd9Jh+i7/wAi9JSjoPL8Qi05FlWmj6zy0/lagAgCQSWcSeW/yLP/ACSeI1b82/8AkUkutj5DTVtYPXx+TSdHMP71Lvzf6iMQBUbK3C/Gdo4uHB/cvZ/g3N/0qxq3ua4PrMH8qv42Xuf6lbvSyIgz9CwfuWtTSFwkyt6bVa0vxTsd3qcf+pcs2yt9bi14LXDkFbdZre7dU30rWavxzx/Wpd+cxPkY9ObXE7bG8O7jyckCoxvZwEii5GPdj2ena2D2PYjxa5CTljFJOmSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpOmTpKUnTJ0lKThMpBJS6SSSCX/1d5JJJTtVSSSSSlJJJJKUkknSUsknSSUsknSSUpMnSSUsknSSUsknSSUsknSSUsknSSUsknTJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSmNhhpQIPIVkgEQUE1uBO3X+T+dH/f0UMWvj2nVp5Hgp/RO4HQ8P7H+TYh6HX8E7XFvGoPIPBSUla4HSII5Yf8AvqlpyPn/ALUIhpbOu0cH85v/AJiphxb/ADnfiwcfNJS55kGHRzzp+6/99iYfyBqNTX3H8qo/nNUo8dD2hRc2edCOCNNf++OSUvo4bmnU/cf/ACLk4cCddHDnxUC73Q+G2fvfmu/rj81/8tS+lo4EOb94/wDJNSU26cvVrL+30LByFfFjLSBYRVcdGW8Mf5O/cesWSPa7vx4H4I1GS6obHj1KjoQdUCFwLrWOa5px8xkxzPI/4QEfm/8ACNWXmYFmP72H1KDw8cj+v/5JX672+kGvm7GHBH87Uf5P79f8lTIdU0EEW49mgc36JB+H0HJo0XEW4RTLQzOm7Wm7F99X51fJb/V/eas+U8FjIpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkknSUpJJJJS6SSSSl04TBSSUpJJJBL/9beSSTqdqrJ0kklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkydJJSySdJJSySSSSlJJJJKVJGsad0iA5vi3kRyPgnAB04PiokFh00Pcf7ElMHtHL9R/pByP+MaoOYWjsWnhw4KO1wdx7XKJY5pJrgTzX2P8AU/dRQhaXNOnPn+RTadCWDT86s/8AVMShlgkaEcjuPKFGC06/JwSUzGglnuZ3af4KQcCJGo7+I8ioAyZ+i7x7H4p/zpHtf+X/AMmkpkQCII3N/FRhzBpL2Dj95vwUgZ/ku8OxT99NHDt/ckpYFpb2IP3H/wAilqONR4HlM5uu5kB3cdim41E6fSYdXN8x+/WkpLVa6pwfWfkr+NkyC6mPd/O45+i7zH7rv5SzOdW8nWOx/qlSa4hwcwkOCBCQadhujTdikuYP5xhHvYf+FZ+ez+WgX4dOWC+qKr+SPzXef/maHj5e9wcX+jkN+jaO/wDJePzmK2A29+2BTlc7AYZYf36HfmWIbLtC4llb63llgLXDkFRW1ZXVkA15ILXt0Dogg/y/3f8AqFm5WFdiu943Vn6Lxx/a/dRBWkNdJJJFCkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSThjjwCkpZJFZjWO59o80ZuNWOdUrVTUSV70q/3Ql6dY4aELTTSAB8imWz0uut1lgc0EbRoQD3VrI6Vh3tI2ek7s9mkf2UOJIgSLecSR8vDvxLNlo0P0Hj6Lv8AX91ATlqkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJOkkpSSSSSlJ0kklKTpk6SlwnTBOkpSSSSCX/199JJJTtVSSSSSlJJJJKUknhJJSyUJ0klLQnhJJJSoShJJJSoSSSSUqEoSSSUtCUJ0klLQknSSUsknhJJSySdJJSySSSSlJJJJKUkkkkpSZOkkpZOHCIfq3sRyP/ACTUkklLOYeZ54cOCmDiNH8eKcEt05aeWpy0EeI8fD4pKYura/3TtcOHjn+2FEkg7LQATwex+Dv3k8OZxx2UgWvbBALTy0ooRlkfD/X/ADXJDiDqE+xzJNfvaOWH6QH/AH9qYQ4S3Xy7/wDmSSliY51H73/kk4JiD7h2n/vrkgfD7k3w08uySmbTPBnyPKREweCPokcj4fvN/kKPGjhHmpHUfHg9ikpYCTpAcfzfzXedf7r/AOQnEO14cNJ7/wBV4ScAQQ77/wC//wAmokkGLDB4bZzp+7aPz2/y0lMgddrtHD/XT95WKskBorvG+rsRyPAtKrTPscNeRH/VMcnnbzqDwf70EuyL2va0ZDt7IhmU36TR+7e389ik5r6gK3gW1OGgGoI8av3v+KWTTdZS6WGW92FaGNktDD6bd9B/nMc6Fp/fpP5jv+ggQuBtq5XTYb62J+krOuwakf1f/IKgugjT7Rju3V/nHgg/u5DPzHf8KgZODVly+qKsgauB4P8AWj/z61IFRj2cZJTsqsqea7Gljx2P8FFOWLJJ0ySlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkl5JKUkjV4mRYJDNrf3n+0f9JFGEwfTt3HwYNP856VqotRO1j3ataSPEDRX2VU1/RYCf3ne4/+RUi5x5M+XZC0002Yr3auIaPvKIMRg7ko6SVqpg2mtvAnzKmkkglZJJJJSkkkikptdJ/nrP6o/KtRZfSv59/9UflWqmy3Xx2R21V3Vmu1oex3IP8Ar9JYOf0uzEmxk2Y/735zf+M/8muhS8vHskDSTEF5FJa+f0fm7DHm6j+NX/pNZCeDbEQRupJJJFCkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJOkpZOkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkknSUsnSSSUpJJJJS6SSSSl06inlJS6SaUpSU//Q30kklO1VJQlCdJSoSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkydJJS0JQnSSUsknSKSlkkkklKSSSSUpISDI0KSSSl9HcaHu3sf6qg5omWmD/rynUpnnnx/vSUwB3GHy1w4I5+LSovGsu0Pa1vB/41v/f0RwnQ8D/WU07TBMhJCF3Pu9ruxGoP/kk09iIPiOCiuq0gcHhvaf5P7jkKCCWkTHIRUyDvn5JxpJr/ALTCoEEKQMwSYd2cP+/JKZhwdx25b3CUAiI3N8FEiSJ9rxwR/D/yKkHSfdAd49j8f5SSmG1zR7feznZ3H8phUmuDhIMjvP8A39ql38HKLmbjuadlg79j/JeElL6tPt1jlvcKbLCDvrMHiR+QoYJJ2kFr26lvcfym/vMSOp3Ttd+8OD/XSU6ONlE2B1bhTkxH8l48P5SusNd/tY01Xt19IGP7WO7/ANFrC3GdrhB/d7HzY5W6soEBl5JA+jaNHtPiU0hcJN+1lWQz0slskGG2DQg+X7j/APg1lZeFbjGXe6smG2Dj4O/dctZuRvAZkkBztK8kD2PH7t37rlMtcwmuxu5pGrTqY/8ARrEAaXEAvPQktDK6ZA9XE99Z1NY1I/4v97+oqCeCsIpZJOmhJCkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkklJlVlhitpefIJKYpKy3Af/AIV7a/Ie533NRm42Kz802HxedP8AMYhaaLQa1zjtYC4+AEn8EduDkHV+2ofyzr/mNlyuB5A2thjf3WDaPwUUrVQRtw8Zv0y60+A9jf4vRWkViKmNr82jX/PdLkySCVEkmSZPidU0pJJKUkkkkpSSaUpSUpJNKUpKXSTSkkhdIpJSEktnpR/WXf1f4rWWN0+xteTucYaWwT4arZkHUJst18NlJk6SC5ZUc/pdeVNlcV3+P5rv6/8AK/lq8kkDSCL3eUtqsqea7Wlj28tKgtfr7R+gfGvubPloVkqQGwxEUaWSTpIoWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpklKSSSSUpJJJJSkkkklKSSSSUpJJJJSk6SSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSdMnSUpJJJJSkkkkFKSSSRUpOmSSUukmSSUukmSSU//0d9PCSSnaqkkkklKSSSSUpJJOkpZJOkkpSSSSSlJJJJKUkkkkpSSSSSlJk6SSlkk6SSlkk6SSlkk6SSlkkkklKSSSSUpJJJJSxSTpikpSSSSSlJJQlCSlJk8JJKWBjQ6t/J8EnMHI47FOmBI4+Y7FJSwc4aOEhO5jXjvI4cOR/5JqcgR5dwoQWGRqElLEubpbEHQPH0T8f3UxZEkcd/9v/k0Rrg4EHWdC08FQNbmn9FJA/wZ5H9RFCw00IkdwUuPNv4j/wAkkC1/0eR+b3Hw/wDIJd/NJSgT/Wb4f+RcpAyYH3HQqMCdNJ+5NI4cI/1/Nckpm4NcADoRweI+H7qidzdH8nh3Y/8AkXp5d/XHnynBadAYnlp/8ikpQIjaRI8D4/yf3XJe5uurm9iPpD+sPzkzmOAlmo7t5MeX77f5KZrwdQdfv/8AOm/+CMSU2KMl1QjR9L/pNP0T/wCQctGi4enNc3UDX0z/ADlf9Q/urJIEkg7HcnwPm7/0onrsfTYHMPpv8Ox+CBC4GncEOHq0uDmu/O7E+FjfzLP5arZOFVkklv6K8ameD/xkf+fWqGPlb3l1RFWQdH1n6FnxVpjq75ABruZqaz9IedZ/PYm7LtC4llVlTzXY0seOx8P3h+81QhblrKrmCvJEifZYNIP8l3+Df/wazMrCtxjLvfUTDbAPwf8AuOTgVpi1oShShKEVrFJPCUJKWSTwlCSlkk/JganwCMzDyHaluweL9P8AzJJSBMVdZhVD+ceX+TRA/wA5yM1ldf8ANsa0+PJ/znIWmmhXj3WasYY/eOg+9yO3B/0lg+DBP/SPtVkuJ5M/FMhaaDBlFDNQyT4v1/8AMVMkkROnhwEkySlJJJJKWSSSSUpMkkkpSSaUxKSl5TSmLlEuRQylKUN1jWgOcYB4Pj8EM5LPzQSkpPKeVV+0E+AUw7d3SpVpt4+KW8qAIUgUlL+4qQb4pgVIJKXbDeFax8t9On0q+7fD+oqqQMIJBduq6u1u5hkdx3HxU1i12vrcHsO1w/11Wjj5jLYa722eHY/1U0heJW2UydMgucvrw/RUnwe4fgsZbfXf6NV/xn8FiqSOzFPdZJOkitWSTpJKWSSSSUpJJOkpZJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSTpJKWSTpJKUkkkkpZOkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKf//S6BJJJTtVSSdJJSoSSSSUpJJOkpZJOkkpZJPCSSlk6UJ4SUsknhJJSySeEoSUxSTpJKWSTpJKWSSSSUpJOkkpYpk6SSlkk6SSlkk6SSlkk8JklKSSSSUpJJJJSkkkklKTJ0klLJx7tOHfgUyZJSnV6+BTB3DX6H80j/vpUw6dHfJ3cJnN0gjQ/MFJTCxoPuf8rWjUf8a385RcDpv7/ReNQfgiDc3zH3n/AMzUSwQXNja76Q5af6w/McihHP73fhw4KcOPHI8Oyi4FhIIMdwdTH/f2/wAtKNJbqPxSUzgcgwfA/wDfSjtx2kA2+4/u9gq9R/SMB4Lh+VXoQKQiOPWda/0bu0cT/KagOaHyXDa8HWPEK5CrWaWvPYnntIAmUlIpezR2o7dvm0/vIgc0tPdnfTj+u3/B/wDUJiNCIkHlpUA0tdurJnsO/wDZ/f8A6iKGe1zY2+4chp+kP+LerdGW22GXOIe36FnD2n/vypNcDqCG6wf3CfD96l6k4gkNsbB7A8/2HoJt223h0V5Ja0v0Zd/g3/ybf3HqTg6qWOG5se5h1IH/AKNqWRTkWVSw/pqnaOqfzC0KMoNrHN2MO3+Fq/q/vMQIXA2hyem6erie5sSahqf+tH87+oqC3QAIspeHsdwR9E/1v3X/AMpAycSrKJcD6V/73Z39f/yaQKjHs5CdSsrdW91bxDmmCFGEVqyt1Yte0OtlxOu0GAPiqp4Wif4BIqCmwzRgDB/JEfimnx580kyCVJJJJKUkkmlJS6ZKUklKTJSmlJSpSTSoPtrZ9JwH5UlM0xKrPzWcMaXn7kB+Zce4YPBup+9GkW3nOgTwPEoL8msfnA/BUHvc4ydT4uO4/wDkVAknnVGkW2n5w/ME+ZVay+1/LoHgFFMUkW2MeTikTIDzzryAoF7mnxHgj4LN2LZ5P/gh2VpJYC2ePuU22x3hAczvwfFNvI+lx4/3pIdBlw7ozXArNa/SRqEeu4hKk23QVMFV2WAorSglKCnUAVIFBK6fcmSSU3sbPLYZcZHZ/cf1leBBAIMg8ELDlGx8qyk+3Vvdh4+X7qBC4S7peuf0WvysH5CsVbHVLq7sEOadRY2WnkcrIhOjstnusknShFasknhJJSySdMkpSSSSSlJJJJKUmTpJKWhKE6SSlkk6SSlkk6SSlkk6SSlkk6SSlkk8JQkpZJPCUJKWSTpJKWSTpJKWSTpJKWTpJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkp//T6BOkkp2qpJJOkpZOknhJSyeEkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkoSSSUtCeEkklKhNCdJJSySdJJSyZSKaElLJJ0ySlJJJJKUkkkkpZJOmSUpJJJJSkkkklKSSSSUsUk6ZJSk4MaHVvcJkklLuaI3Ay3ue4/r/APpRQIc07hIP7w1kfy2/nKQJaZGhUhrrXAPJrPB/qfupKREtcAHQ3w/dP9R/5iG6stMayNS08jz/AJbUbYx5O07XHQtPBPmEM7mnY4SBw0n/AM9PRQw8/wAQrleVW8fpDsf3ng/ygqsCCRqO/Yj+u3/vyYhJTbfkVtHsO49o4QNDqNHdz4/12oWoUg75JKtlqDAGvOz/ANJu/OUoa8EjWef9qaQRDuOf9qTgR7if7f8A6VH/AH9JTFzSDuBIcRE8yP5bf8K3/wAFSD4hj4E/mO+gfOt/5inyYIh3MePm0qJ4hw3N8/8AX2u/lJKURB29/wDRv5/sP/OUmXuqeHbnVuH7wkf5wQw17QRX+kYOa3cj+z/5BOy0cMftP7j/AHD5JKb+PnkOcIYWu9ztk6un91WR6lvtx2l5jcdv0mArLrsbW1+TbsFeON7y0EAn92f3ksDLzRaMlrjXkXHe9vIDfza3D87YxClwPdLlODsh5BmIDj5gDchLYezE6qdYxc+ND+ZZ/wCS/wDPqy78e7GtNN7Cx448HD95jvzkAVEddwjhaJ5WeOQr7uSkVBZMkkkpSSSaUlKTKLrGN5cAhOyW/mguSUnlMTGpMBUrMxw5cGflVd2RvOgL/M6D8UaRboPyam99x8kB+a7hrQPjqVV3nv8AcNAmk/D4I0i0tl9rvpOjy/8AMWoO4eEnxP8AcmSSQoknQ8eHZMkkipZMnTIKWTFSTFFTodKG7GuH/CD/AKlStq1S6KJovH8sf9SrT603qurRzH1ITqytJ9KC6lG0U5/pkGW6H8FJrxMO9p7eB+asup8kN1MiIkeBSQzbIR63k8qo1tlejfc0fmk/9S5WKntdx9IctOhCSW01ylKE3dEx80+9o7/IaoJSynlB9TwH3/7FE2PPePholSk5ManQeJUTewcS4+SB+XxSSVa9trrCJ0A4H96iklCSloShOkipZKE6SCloTKSSKGKSeEklLJJ0oSUsmUoShJTFJShKElMU6eEklLQmhShKElLQmUoShJTFJShKElMUlKEoSUxSUoTQkpZJPCUJKWSTpJKWTpJQkpUJJQnhJSySeEklLJJ0oSUsknhKElLJJ0klLJJ4ShJSySdKAkpaEk8JoSUpKEoSSUqEoSSSUpMnSSUsknSSUsknSSUsknTJKf/U6FJJOp2qpJJOkpUJJJJKUkkkkpSSSdJSySdJJSySdJJSySdJJSkkkklLJJ0klLJJ0ySlJJJJKUknTJKUkkkkpSZOkkpZJOQmSUsknTJKUkkkkpZJOkkpZJOkkpZJJJJSkkkklKSSSSUskkkkpkdjxD9Hdn8/J6i4PadjhP8AJOoP9VyScO02u1b5cjzaUlIjXJmskOHY8oc9jofw/wDMVYe2AJ9zezx/3791yg5pI/fjuOUUIv8AXzS8x/s+f7qcjw1j7wm8/wAR/FJS4d24PgVNrj2+5D07/LwT/lSUk2iIaJb3Z4Hxr/dSBgTO5vG7uPJ4UQ5T0JkHa7x/8kkpYsBIc0wexGn+a781RNbrXbdgseeGkEPJ8NPcnkt0ENcfzD9F39R3/fUrss4WMcgAsucCK2zO3x2/1klNPJuORa3BYNtFJFl48Xj6FZ/qrTxay1m88u/IqXTcTa0Gx022fpLR3k/vFaiBSFi0O0ifD4o2PnsyWuo6hN2Iw+nXbHvDm/Tv3/S9jv0bHsVe97m1hlf87adlZ8P37P8ArTPcpsraxja2CGsADfgEEg0vl9OtxC2wO9bFeRsvbxB49Tb/ANX9BEcnxcu3DJDR6mO7+coPGvJrn6Lv+gjZGM2yk5fT3Gyn8+n89h8Nv0vb/o0L7/amhuPsa0gcqDrmDvPwVV2Q0iR7gUCzIdwNPIalOpbbcdkHsAPMqvZlj858+QVVxsfyY+Ov4JhW3vr8UaRbN2WSYrZPmVA+s/6b4Hg1SgJJIYtqY0zEnxOpUoSSSUsmTpklLJJJJKWSSSRUsknTIKWTFShLaip0uh/zV/8AWb+RX3CVkYGWMMvBbvZZBdrqCP3Vr03UZAmp0nuw6OH9lNO68bMCxDNSslhUSEFNU1BRNAVuAm2pWqmr9nB7KQxGEiRqOD3CsBqNTVJkpWqmhkVem4AkukTqhwrfUR+lb8FURCDusknSSUsmTpJKWSTpJKWSTpklKShJJJS0JQnSSUsknSSUsknSSUsknTQkpSSUJQkpSSUJQkpSSeEklLJJ4ShJSySdNCSlJk8JQkpSSUJQkpZJPCSSlkk6UJKWhJPCUJKUklCUJKUklCUJKUklCUJKUknTQkpSSUJQkpSSSUJKUklCUJKUkkkkpSZOkkpZJOmRQpKE6SSVoSgp0kkMYShSTJKWSTpJKf/V6FOknCnaqkkkklKSSSSUpOkkkpSSSdJS0J4SSSUtCSdJJSyUJ0klKhJJJJSyeEkklLJJ0klLJJ0klLJJJJKWSSSSUpJJJJSkxTpJKWSTpJKWTKUJklLJJ0ySlJJJJKUkkkkpZJOmSUpJJJJSkydJJSkydJJS7XFvHB5HYpjX+dUfizuPgklJBkaHxCSkbg1+vDhwQoOaQZOh8Rx/aRyBZqID/Dsf/IuUJI0jjkHkIqQ/gfwTajT8P7kU1hwluk9kMhzfpCR+HzSQuD/r3UmnVDgdvkD/AAcnJIB/FJTNv6R/u1raJcT2A5VC+45eZJH6OmDHaf8ABs/s/SR82/7Pj7G/TfBI8Sf5uv8A7+l0zElwDtQz3WHxeUleDoYlRrr3P+m/U/wCsASY8UkO8u2Cphiy47Gn90f4Wz+wxNXLVRba68fQE10/1Qf0ln/XbP8AoIyTWta0MaIa0ANHgBwnSUsnqstx7fWodss7/uuH7tjUkoSUzycHH6sHW4v6vnATbjkw2z+W3/0p/wBurFdW6p7q3tLLGGHscII+K1S0yHNJa9plrm6EHyVl5xuqNbRnRTlt0pymiA7+Q/8A9J/9tpXXkkgS8D+bgJI+Xh5OHd6OQ3a781w+i4fvVuQE5YRSkkkkkLJJ0ySlkylCaElLJk6SSlkkznNbyQPJQNw7CfiipImJaOSgm0nv9yh6gSU2N47JblX9RIWJKbQIU2gghzSQRwRoVWbYissQU6eP1S1kNyB6rf3xo7/zJaFVlN7d1Lg7xHcfFqwmuUmkh25hLXDggwUKXCTuGtR9MqnR1WxvtyW72/vt0d8x+ctGq2m5u+pweO8cj+s1DULhRYsq1R2gAJgnQS0Oo/zjPgqaudR+mz4FVE4bLDuskknSUsknSSUslCSSSlQmTpJKWSTpJKWhJOkkpZJOlCSmKSeEklLJJ0oSUsknShJSySeEklLJ0oShJSySdOkpiknhKElLJJ4S1SUsknhKElLJJ4KUJKWSTpJKWSTpQkpZJPCSSlkk8JQkpZJPCUJKWSTwnhJTFJPCdJTFJShNCSlkk8JQkpZJPCSSlkk8JJKWTQnSSUtCSdJJSoTJ0klLJJ0klLJJ0oSU/wD/1uiCdIJKdqqSSSSUpOkkkpSeEgEklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSimTpklKTJ0klLJJ0klLJJ0ySlJJJJKUkUkklLJJ0klLJlKEySlkk6SSlkydJJSySdMkpSSSSSlJJJJKUkkkkpaFL2uEPkEfRcOQmSSUwexzDr34I4KcOnQ8+Hj8FMOgbSNzTy0pnVj6TTub38R/X/APJpKQvraZLSG+R4Qy6BuOm3VHdt4JE/68qjmkjbVVO6zQd9f/MPpIoQDfkZJtOoYYYPF5/8h9FbuNSKagzvy4+arYGB6O1zxAYPY3v/AFnK8gSkBcCTAQqf0tj8j80/o6f6jT7n/wDXbE95dsFbNH3HY0+A/wAI/wDsMRGta1oa0Q1oAaPIIJXSSSSUpJJJJSkzmhwIcJB7J0klJmZNb6fsnUW+tin6Nh1fWezt30vb+/8ATWd1HpduFFrXeviP1Ze3WAePVj/z59BXFPHyrcSQ1otx3/zlDuDP0iyfouS22+xOh0P2uGktbM6RXZUczpX6Sn/CY/57D32N/wDRX/bayNw7aog2sII3XSUXPA5ICG69o+iJ8yihLPgoueG/SIHkgOueeTA8BohF6Sk7r2j6InzKE+955MeQ0QS8qBcipIbFE2FDLlEuSQl3pbkEORK2WWH9G0u+ASUvuThys1dNudra4Vjw5KuVYmJTq2v1HfvWe7/ofQStNNCmu60/oWOf/VGn+d9FXK8K0a3PbWP3Qdzv+j7VZNjyIJ08BoPuCigmmzi9OxMljm1ZDmXNgy8e0z+9HuYg5OJlYZAyGbWn6Ng1Yf6rwrPS/wCdt/qj8q022Oa0t0cx30mOEtPxaULIK4AEdnng5SYS1wfW4seOCNCtTI6XiXS7HP2a0/mO1rP/AH6tZuRi5OK/bewsJ+i7lp/qvHtSBQQQ3aOquHtyW7h/pG8/2mrQrurtbuqcHt8u3xXPh3iiMsLHB1bi1/YtSISJOj1D6TD5FVER911jWi4DcO4058UNIIO6kkkklKSSSSUpJJJJSkydJJSySdJJSySdJJSySdJJSySdKElLJJQnSUskknhJSySeEoSUsknhJJSySdKElLJJ0klLJJ0klLJJ4TJKUkkkkpSSSSSlJJJJKUkkkkpSSdJJSySdKElLJJ0klLJJ0klLJJ0oSUsknTJKUkkkkpSSSSSlJJJJKWhKE6WqSlkk6SSlkk6SSmKSeEklP//X6NJJJTtVSdJJJSkkk6SlJJJJKUkkkkpSSSdJSySdJJSySdMkpSSSSSlJJJJKUkkkkpSSSSSlJinSSUsnSSSUpKEoSSUsknTJKWSTpJKWSSSSUpJJJJSkoSSSUsknTJKWSTpklKSSSSUpMnSSUskkkkpSSSSSlJJJJKUkCWmQkkkpi5jSZbAnsp41TG3byAX7SGmOPHamTtO1zT4FJTaSATodzzXU5zfpmG1j+U72tQStX+kufb+az9FX8v51/wDaf7UVRrrFdba28MEKSSlJJJ0lLJ4ShPCSlkk6SSlk6SSSlq3249vrY7tj+/g4fuvapZmBR1drrcOMbqAE20Ew2z+V/wCpP+3Eyi5pkPaSx7TLXN0IPkkm+h1DzttdlNjqrWmuxhhzHaEIZcurvrxesMbRnRRnNEUZTRAd/Id/6S/7bXNZ+Bl9PvNGUza78x4+i8fvVuTgb81ko1qNQ1i5QJTkp2U3W/zbC7z7feihGSoE+Kvs6Y8/zrw3ybqfvVivDxatQzc4fnO1StVOTXTdaf0bHO840+9Wa+k2nW14YPBupWnJ47eCZC1Ugq6fiV67N58X6qwNBA0HgNEydJKkkkklKSTpklNvpn89Z/VH5VorO6Z/PWf1P4rRTTuujspSDzsNbgH1nmt4lp+SikguQHpmG8k0zW88MsM1/wBl30v85Bsrtodsez0z2gQD/VcFdUg8huxwFlZ/MdqPl+6jaKHk5h1TK9ZhV2a4ztrv9FYf+os/8kqdjH1u2PaWOHLToUQUEMEk6SSFJJJQkpSSSSSlJJQkkpZOkkkpZJOkkpSSSSSlkk6SSlkk6ZJSkk6SSlk6SSSlk6SSSlJQlqkkpUJk6SSlk6SSSlJk6SSlkkkklKSTpQkpZJOkkpZJOkkpZJJJJS6ZOlCSlk6SSSlkk6SSlkk6SSlkk6SSlkkkklKhJJJJSkoSSSUsknSSUsknSSUsknSSUskkkkp//9Do0k6Snaqk8JBJJSkkkklKSSTpKWTpJJKUkkkklSSSSSlJJJJKWSTpJIWSTpJKWSTpJKUmTpJKWSSTpKWSTpklKSSSSUpJJKElLFJPCUJKWSTwmhJSkkkklLJJ0ySlJJJJKVCZOkkpZMpJQkpiknhKElLJJJJKUmTpJKWSTpJKWSSSSUpJOkBJASU20I+/JDfzaG7j/Xf9H/MrRZAlzvotBJPkFDGafS9R307ibHf2vot/ssQSkhKE6SSloTpJJKUkkkkpSSSSSlJJJJKUkkkkpi9jXiHCQjNyKbqfsXVG+vjH6Fp+mw9iXfS9v+kQ0iAUkg00szoTOnEWBvrUO1ZkHXn6Pqfmt/roBJjy8FsY2U/FBrc31sV2j6TrAPPpz/57Qc3pTTX9r6cfVxzq6oauZ47R9L2/6P6aQPdBj1H2OXKSjIOo4TynLVJJJJKUnTJJKXSSSSUpJJOkps9N/n3/ANT+K0VndN/pDv6n8QtFNO64bKSSSSSpJJMkpdSLg9uy1otYOA7kf1HfmqMpIKauTSypwNZJY7gO+kPJAVnL4aq6ctKydJJJSkkkklKSSSSUqEkkklKSSSSUsknSSUsknSSUsknSSUtCeEkklKShJJJSoShJJJS0J4SSSUqEoSSSUqEoSSSUqEoSSSUtCeEkklKhKEkklKhKEkklLQlCdJJS0J4SSSUqEoSSSUtCUJ0klKhKEkklKSSSSUpJJJJS0JQnSSUsknSSUsknTJKUmTpJKWSTpJKWSTpJKWSSTpKf/9HpUkklO1VJJJJKUnSSSUpJJJJKkkkklKSSSSUpJJJJSkk6SSlkk6SSlkkkklKSSSSUpJJJJCoShOkgpZJOkkpZMnSRUsknSSUsknhKElLJJ0klLJQnSSUxhJOkkpaEoTpJKWhJOlCSmKSlCaElLJJ0ySlQmhOkkpZMpJQkpiknTJKUknTJKUpViXt+/wC5RRKR7ifkkpJa3e1tP+mcGu/qj32KyQh4jabMyLbBXDdrB3JJ3P8Ad9Hs1a32bGA2+mPiSZ+9NJXgW5ZamIV27DI91XuH7p+kP/JKqQlaCEaSkQmhFSySdJJCySSdJSydJJJSkkkklKSSSSUpKqy7Gs9WgwT9Nh+i7+t/5NJJJK+Vg43UmuvwopyxrbQ7QO/1/wBL/nrFc17HursaWPYYcx2hBWuWuDhZWSyxv0XDkItrMfqjRXkAU5jRFdo4P/kv+K/7bSBpRF+B/Nw06lkY9+Jb6WQ3a781w+i4fvMKgE5YunTJ+PJJSk6jvb4z8EtySmSQk8JgQpApKZM3sO5pLSOCFaqz3DS0bh+8NCqwKlDSgl0q7a7foODj4d/81SWXscDLfkRyjVZtjdHjePE6OQpNt5MoV31W/Qdr+6dCppJUkkkkpBlcM+JVdWMrhnxKBCSCpKE6SKFoShOlCSloShOkkpaEoTpJKWhKE6SSloTKSUJKYpJ4ShJSySdJJSySdKElLJJ0oSUsnhJOkpZJOkkpZJOlCSlkk8JklKSSSSUsknhKElLJJ4KUFJSySeEoSUsknShJSySeEtElLJJ4ShJSydPCb5pKWSTwnhJTFJShMkpZJOkkpZJPCSSlkk6SSlkk8JQkpZJOmSUpJJJJSkydJJSoSgJJJKf/0ulSSTqdqrJ0kkkqSSSSUumTpIIWSTpIqUkkkkpSSSSSlJJJJKUkkkkpSSSSClJJJJKUkkkkpSSSSSlJJJJKWSTpJKUkkkipSSSSSlJk6SClkk6SSlkoTpIqWhKE6SSlkk6SSlkydJJSyUJ0ySloSTpJKYpJ0klLQlCSSSlQmhOkkpaFIP2Mhv0j+CZJJTADxV7G6jbVDLJsr8T9IfD95VISSKga2dtmS2xoew7mnuEz/Tt+lo794c/NY9dj63bmGD38D8QrtWU2zQ+1/h2P9VNpeJWzsrc3nUdnDhQIRfUcP7lE7T5H8ElI4ShSLU0IoYpKSZJS0JQnSSUtCeEkklKhMnSSUskkmSUpRewOEFSTJIXN1d1X2bPG+s/Qt7g/ynfm/wDGLI6nj3dMPqPBtxXH23DtPDbf3f6/0FqkAiCky01NNb2+rjuEOrcJgHnbP5v8hIKOu/2vO/b2u4cAm+0sPJlS619W3VMOd0km3GPufQNXM8fT/er/AJH85WufF7/FPFFYQQ7/ANpZ4pfa2jusL7TZ4pfaX+KVKdz7a0d04z2DusH13Hul6rvFKlPRMz2HujszGFcw3Ic08qzVlSYOjhyDylSrelZc090SWu51WDVlOHBV2nOOkoUm3QNRP0TPl3RK8q2v2u9wHZ3P+cq9eQ13dH3NeIOqCW1Xk02cHa7912n4oqznVA/RPyKlXfdXpMj913HyQpNtjJ4b8UFTdb6jASIIOigiorpJJJIUkkkkpSSSSSlJJJJKUkkkkpSZOkkpZJOmSUpJOmSUpJJJJSkkkklKSTpklKSTpklKSSSSUpJJOkpZJJJJSkkkklKSSTpKWSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkoSSSUqEoSSSUpKEkklKhKEkklKhKEkklKhKEkklKhMnSSU//T6ZJJJTtZSSSSSl0kkkEKSSSRUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJBSySdJJSySdJFSyZOkkpaEoTpklLQknSSUtCUJ4ShJSySeEoSUxT8pQkkpNXkOb7X+5v4j/ySOHAjc0yPFU07XOaZaYPfz/rIJtubyPMeCcFruOfBAZa1+h9rj27H4Jz9xSTaaEoQ23bdH6jx7oohwlpkJKYwkpQmhJSyZSTJKWSSSSUsUycpklKTJJJIUm0KRTJKWY6yh++rv9Jp4KzOrfV3H6kHZfTgKcvm2g6Nef8A0XY797+betRRLSHB7DteOHBJT5/bXbTY6q1hrsYYcxwgg/BOym5/0WE/gu6y8PE6nHrNFWWwQy0Dkfu/y2fyFk2Yr8Wz07W7XdiNQR+80p4K0xpw6+mZL+YaPvWjjdJwmCckPud+6HbG/h7lcSSQzpdi47g6jEpbt11En/Pd7lsUswer4W7OxK3ua8s3cPAAB9trNr+6xFs9F/oD/wDjT/1LU2S6J1po5P1SAl/TcncP9Bfo74Nub/39qzLcHMxX7Mml1R7EjQ/1Xj2OXXKXqO27DD2HljhI+4oCRSYjyeUqbYPFXaRaeAStZ+Hhu9zKxS7xaJb/AJjv++oVmNe0SB6jR+czUf5v0kbRw012td+cYUob8fikkkpSdJJJSkkkklKSSSSUumSSQUpJJJJSkkkkVKSSSSSpJJJJCkySSSlJJJJKUkkkkpSSSSSlJJ0ySlJJJJKUkkkkpdMkkkpdMkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpZOmSSUvokmSSUukmSlJS6SZJJT/AP/U6ZJJOp2spJJJBCkkkkVKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSTwkpZJKE6SlQkkkglaEoTpJKWSTpQihZIBKE6ClQmhOkklaEoTpJKWhJOkUkLJJJ0VLJQnSQStCUJ0klLQknShJCyUJ0klLQknTFFSkkkklKTJ0yClJJJIqWSSSSUpJJJJSkkkklKTJ0klLJJJJKXU22ke13ub+I+CGnBSUlOokGR4/3pmucw7mmCoNJBkGD4ogh/GjvwKCU1eQ10B3td+BRYVJzCNHCD4FSZc+vQ+5vh4JUm21CZJlrHiQVKEFMITKSaEVMSmUkxCSmKSSYpIUmSSSUpJJMkpZzA4JnFlrPRyxuafo2cEH4/vfylKUiA4JKcvLwrcUyffUfo2D8j/3XIC2WvdWCxzfUpdo5h10VPK6dtb6+J+kp5LBq5v8A5inAoI7NJbPRf6C//jT/ANSFjcrZ6L/Q7P8Ajf8AvoQlsqO7eTJJJq9SQ5kc+SSSSlntZZ/OND/5XDv84ID8Sf5p8/yH6H5O+irCUBJTQex9ZixpYfNMtDWNp1b+6dR9yq5NTK4ewbQTBbyAf5KNrSEKSSSKFJJJJJUkkkkpSSSSSlJk6ZJC6SZOkpSZJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkyXxSSUpKEpSSUqEktUtUlKSSlKSkp//V6dJJJTtVSSSSSlQknlMkpUJQklokpUJQngJQgpaEoTwkklaEoTpJKUmTpJKWhJOkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpaE6SSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpZJOmRQpMnTIKUmTpkVKSSSSUpJJJJSkkkySlJJJJKUmTpJKUkmSSUtZYWN0+keJ4Vd1tztHWuA7hsNH/AJJEyPzfgUFFCSq51eklzfBxJ+5xVpj2WCWn4juFRlOHEEEGCOChSbb0EGQYPiEZmQeH/eqleSDpZof3hx/aRoB+aCQ3A4EaJEKo0ubwjMtnlJNs0oT6FMdElMSFEhTlPCSkUJkQtTbUlME0Ke1LakhhCcKexLYklbaHBDDbKX76/mOxRg2FMAFJTSyOn15YN2IAy8avpOgPw/dcp9HDm41rHAte22HNcIIO0IzqnNcH1Ha8cEK3j3Myf0Vg2X/l/q/vf1EidFAao0kZ2NY3Qj5hDLSEE0xSTpklKSSSSUpBy/5pv9ZGQcv+aH9YJILVSTJJy1dJJJJSkkkkkqSSSSUpJJJJCkydJJSySdJJSySSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkklqkpSSUJJKUkkkkpSZOmSUrVKEkklKSSSSUpJJJJSkkkklP/1unSSSU7VUEinCSCVkpShPCKFJJJIJUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJinSKSlkkkkULJJJJKWSSSSUpJJJJSkkkklKhJJJJSySdMkpSSRSSUhyfpNHl/FBRsn6bf6qCihSSSSSlIlVz6uNW929kNJJToU213aN0d3YeVOxzamFx+kfojzWbryNCOCEYZLn6Xa/y+/9pCk22KsuID+f3lZbYHBZr2wNwgg8EGQo15L2HTUJUq3UI7hNujlAqymu8kYkOQSyDgnkIRkJg9JKaQkhbk+9JSSU8hC3JbklJZCcEIO5PuSUl3JFrX+RGoI0IPkh7inDklOriZO8CnJguH0LOJ+P7r1LIxXiXNh48Hc/57Vn1XAaO4Wjj5MN2uO5njyR8UwitQyAg6FoP2AwZYfB3H+eFEgj4eK0snFD27q4M9lkvYK3aE1n8EQbWyFM0kP1Hj6QDh4jQ/8AkU4trOk7T4HRFazQcr+a+YRULJ/mT8QkotRJOmTlqk6ZOkpSSSSSlJJJJKUkkkkpSSSSSVJJJJIUmTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKTJ0klKTJ0klLJ9UkklLFJOkkpinT6JaJKf/X6hJJJTNZSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpZJJJFCkydJBSySSSKVJk6SSFJJJJKUmTpJKWSTpJKWTJ0klNfI+mP6oQkXIgPkzqBB+CDKKF0k2vwTEHuUlLktHJCb1GjzTbQmgeCSlesewTG1/jHwSIUUkLttsYSWumeQdQf6yNXZVado9jz+a7g/1HKvCiROhCSXSrwr3n2tI8zorgxbKmT6gLh+aVmU9TzKWelv3sH0d2pH9pV7821597zr2QopsOyLAdDokR4Ln25ttRljviDqCrVfVtwg+x3h2PwKVK4nVSkeKynZ7z3UftN7uAUqVxOvuYOXBMbqhy5ZG+93Lv4p9rzySfwSpVuocugd1A9QoHmq2OcJrgMig2tOjtSDr+44H2qzb0LBv1wMz0nHinJGnytalp1SLO1I3dVYOAhO6q48aKvmdH6viDdbjufXz6tP6Rsf2ff/0Vn+qCYB1HI7ogBaSRvo6TuoWHuUfE6vbU4a6LG9QpxYlSLL3eB1NtjNzDub+ezuP5TFcvx6cuveyDPfxXA4mfbj2B7DEdl1HTuqi1vrUHX/C0/wDfmpko1qGWM70LG/FtocQJA8EEmdHBb7XY+bVubz4dws7JwCxx58khLumUeo2c/c9n0HEeXb7knXvezY5o/rDy/kqb6tp4Qy1FYwSTkJoRQpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkkkqSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkydJJCkkkkkqSSSSQpMnSSSsnSSSQpJJJJKySSdJCkkySSlJJ0klLJJ0ySlJJJJKUkkkkpSSSSSlJQkkkpZJOkkp/9DqEkklM1lJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJk6ZFCkkkkFLJJ0ySlJJJIpUkkkkpSSSSSlJJJJIWSTpJKYloIhwkID8Z3Nb5/ku/8kFZShJTnvD6/wCcaW+fb/OTbtJC0dUJ+NS8zt2Hxbp+H0UrRTTlJGdh2DWsh48Dof8AyKEWPBhzS0+YRUxTEKZAH0iB8So7mHiX/wBUJIYkJoRA2w8M2+bin9J5+lZHk0JJR7PHRRdWxwLXDRGFNY1ILj4lSgDgQkpo/YJdo8hvhGqI3AoH0hv/AKx/uVpJJVI21MaNBA8lLaE6SSloSTpJKY9x8QtIgTBgTws08j4haYGv7ruzuyBSGdN19BmmxzfIHT/NKldZiZf/AChh1ZB/0rRss/z2oPtkg6EduE/+o+XwQpNlq3fV7pt+uDmOx3HirJEt+VrVnZfQOsYg3uxzdX/paD6jY8fb7/8AoLbjndr8FJlltMOoscydRBgH5I2VUD0ryeQ9TWO45HcfJHxc23GtbZW4tIXU32Y2YIz8WrK/4QDZZ8rGLOyfq70633YOS7Hef8Fk6t/s3N/78jxd1vD2LfwOqttAvpO2xv8AO1j/AKtn8hdBj5dOXWGugOP+vtXn7un9X6fYHmp0N1FlZ3Nj4tWp0vq7XPDHex55adPm1NlEHZfGZGhemysKNRx2KzbaS08LUxc4OaG26tPDv/JKeRiBzdzdWlNBrdeYg6hwS1RhXrsYt44VVzCE5YQihMpkJoSQxSTpkUKSSSSSpJJJJCkkkkkqSSSSQpJJJJSkydJJSkkkkkqSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSTJIUkkkkpSSSSSlJJJJKUkkkkpSSSdJSySSSSn/9HqEkklM1lJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlikkUkUKSSSQUpMnSSUsknSSUskknSUsknSSUsknSSUskkSACSYA5KC7MaPoMJ83GPwRUnThpiYVN2VeeCGDyH/kkJxc/6bi74lKlW3XXUM+lY0HwGp/BDOZV+Yxz/APoj8VWAA4EJ0qRaU5WSfotZWPP3FQe+6wbbb3vb+6Pa1RToqWDKm/RYJ8Tqpbj8B5aJkklKTJ0klKTJ0klLJJ0ySlJk6SSlkk6ZJTE8/MLTk6aAjvOizHc/MLS11Ph3lApC+sOkkwBtA1HKUDUHSTrA0Tdp48D4J+2sc8jhJK4LgBOhOmhlMeQT8wkfAamO2qUndI7ASP8AegpbTv8AOBr8k/I4mfHRJwjSAQNR4pjqCZBjt3RUu0uaPY4s+HCqZLqnvLcmltg5FjfZYPg9qsgaa6aSq+WwwHQkgssLqJxbjReS7FcYpvdyP5Nq6LGyjXA+lWe3/kVyLb2gGuxst4KvdOzG0xW1++ns06lnw/kISjaYyp6p9Ndzd9cGeyzsjFIkgIuPkEe5h+XYq6DXkN00eOQmahloS83AfWQhlq1sjFgnSCqNlJB4TgWMimrCaEQtUSEUMUylCZJCySdJJSySSSSlJJ0yKlJJJJKUkkkklSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUklCSSlJJJJKUkkkkpSSSSSlJJJJKWTpJJIUkkkklSSUJJKUkkkkh//S6hJJJTNZSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpYpJJIoUkkkkpSSSSSlJJJIKUkkkkpSSSSSlJk6SSkWR/NfEhVVZyf5tv9b+CrFEIKySSSKl0kkklKTpk6SlJJJJKUkkkkpSSSSSlJJJJKWSSTbgkpdJNuTbj4JKU7n7loSexieVnwefMKwMo/nN+5AqDZaTp3Tjx5HxQW5FR5MHz0UwQdQf7kkswWgg8fFI8EA+YCju1BTzqZEjwSSvOv4eCadONTyU4JnSSO+sQmEnSTpwCkpYeHkovaHM2mJ408VISBHjMJROnznvKSHDudtscDohfaA0y06+SNnY9j8t2we2BqeE1WAwa2HcfAaBOWt3pnXLK3Cq5rnsPDm6ub8R+c1dNRkBwa9jpnhwXM1MYwQ0Bo8lbx730Olh55aeD8U0i18ZEPVV3Mvbss0cgZGLHmPH+9U8XLrvbLDDm/SYeR/5itGnJBG2zUfvf+SUdUygg7uVdQQVXcyFu34wI3M1Hh/cs67H7hOBWyjTQIUYR31kIZaisRwkpJklLJJ4ShJCySeE0JKUklCUJKWTpQlCSlJJJQipSSSWqSlJJap0FMU6WqSSlJJQnhJSySSUJKUklCUJKUkkkipSSUJ0FLJJJIqWTpQlCSlJJ4TQgpSZPCUIqWSTpJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlkk6SSlJJJJKUkkkkpSSSSSn//0+oSSSUzWUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJ0ySlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJinTJKUknSSQtCSdJJKkydJJS0JJ0klLJJ0klLJJ0klIMr6DB5n8irKzl8MHx/gqycFpUkkkkpSSSSSlJ00pSElLpKO7yTbikpmmUSXeKiSO5SUk3N8U24dghmxoQ3ZDR3SU2NxUS7zVR2Ywd0F2cO2qVItvlzfim9QBZjs53ZCdl2HujSrdc3BROQPFY5yHnum9Vx7pUq3X+0N8VIZI7FZAtd4qTbXJUq3YbkNPIRGWs/NcWn7lkNuKOy/wAUqVbrNts5kO+P+xEGQPzmkeY1WZXd5qyy7xM/FCk23W2NceR8P9imT81UDmu5CmJA9ro8kE22AeIkhIHSBEdiED1bByJ+Gidt7J19sa6/7ElWiuqb6u4gxA04GiTa2Ew1snwkkqVjiCHNOh10PmofarGaB4b5EAIobLMTu6GeWpRBigcFh+IIVZuVkHsx3nKMMh3cCfmhqnRm2p9NgurYNzPzm8wtWm3c1rxw4AqhjFtrNzj7gYjsFaaSOePEcIFcHQpyCzTlvh/civqZc3fXz3/2qgx/grFVpaZBgphDID0KC/H1IiCOypWVELdmu9sO0d2/2Knk4pbyNOzgiCiUeoclzVAhWraiFXcE5jYpk8JJKWSTpJKWSTpklKSSSSUpJJJJSkkkklKShJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkoSSSUqEoSSSUpJJJJSkkkklKSSSSUpJJJJStEkkklKSSSSUt8k6SSSlJaJJJKUkklCSlJJQkkpSaE6SSlJJJJKf/1OoSSTqZrLJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUknSSUsknSSUsnSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklLJJ0klLJJ0klLJJ0klLJJJJKUkkkkpSSSdJSySdJJSySdJJSySdJJSySdJJTWy+WfAqvqrl9RsboYeOJ4VOw2VavY4D94DT/OCIQVQU+3zQftU/RhROS5FCeExLR3CqnIcVE2uKSLbZe1RNrQqhe4900lJVtk5DVA5I81X18E20+CKkrso9ghOyHpbD4KPplJTB9r/FBe9x7o5qlRNPkkhqklMZVoYr3HQfx/Ipjp9p5BHy/wDJJJaO1yWwrSHTD3P3n/yKI3p1Y5IPyn8qVqpygxSbW48An4BbDcSkeP4D+CI2uturRBHflK1U5+P0fqN4llJa3955DR/0lab9X7m/z+TRV5Alx/BWSXHkk/NRICGqtFh0rprP5zKfZ/UAA/78rX/Nyu6sWdPyWvn/AAVxAM/ybG+1VQNYWn04D7Kf65/Igb7rhXZyb+nZeK6Mip1XgT9E/B49iVdfnPwXRsyLmDaHSw8sd7m/5rk/6k/6dIpJ/Op0/wCglxK4R0LiV1WHhrj8lYZRb3EfErT+x79ce1tv8h3sf+PtQLK7KjFrTWf5Qj8fopWnhprGh8cjzAQHtaZBBPjOivpnNDh7hPxStFNFjZIEaDsPBFIDh7gCPAo32evtIUTQexHwKVqprHFx3cDYfFuiQpuZ9F4ePB2hRnVWDt8wh6pKbuC1wrcXNLSTqPkrYMLID3t+iSPgUSvLyQ4DfPxEoEJBdYQeNCpteRys52bYwcNJ+CH+1Lxw1v4oUniDuMsR25TAw+t9ACS4+H8pc4Or5I/NZ9yHf1HJvZscQGHkN0n4pcCfcp37seu6v1sNwtYddrTP+asywQSOI5HcLOpyLqHb6nljvFphXXdT9cD7XWC8aC6vR/8Abb9CxGiPFBkD4LFMkHsfqw7h4xCdJCySSSSlJJJJKUkkkkpSSSSSlJJJJKUmTpJKWSTpJKWTpJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJk6SSlkk6SSlkk6SSlkk6SSlkk6SSlkk6SSlkk6SSlkk6SSlkk6SSlkk6SSn//1epSSSUzWWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWSTpJKWTpJJKUkkkkpSSSSSlJJ4ShJSyUJ4TwkpjCUKUJQkpaEoTwlCSloShPCUJKWShPCUJKWhKE8JQkpaEoTwlCSloShPCeElMYShShJJTGEoUoTQkpaEoTwlCSmMJKSaElLJJ4TQkpSSUJQkpSSeEoSUsknhJJS0JQpJJKYwnhOkkpaEoTpJKYpKSUJKYpaqL7qKzFljWkcidfwQjn4g4Ln/ANVp/ikpnZjY9v8AOVNcfGIP+c1Vn9KqP809zfJ3uH/klM55P83juPm4gKBzM130WVV/GXFHVGjXf0zKbw1tg/kHX/NdtQX49jP5xjq/6wIVp1ma76WS5vlWAEN1DX62vstP8t5j7kUaNfY0clN7PEKyKaW8MHz1/KpgAcAD4BJFNQNcfotJ+AUhVb+7HxIVlMkqkAx393AeWp/8ipDGb3cfkAP70ZJJKMUVd2l3xJThjBw1o+SkkkpUlJJJJSySdJJSySdMkpZIp0ySFhytLp39FP8AXP5FnDlaPTv6K7+ufyIFMd2ynTJILlQiV5ORWNoduZ+4/wBw/FDSSSlLsOz6dbqHH86rVv8A225L7G9wmh7bx4N0f/225CTEQZGh8UFWsQQSCII0IPITKb3OeQXauiCe5jxUUULQkRPOvxTpJKYGus8t+7RRFLQZEgoqSSkFlT3eCCaLf3VchKEbVTS+zWn81OMW3yHxKtwlCVoprjEP5z/u1RG0Vt7bj5oidK00sknTIKUkkkkpZJOkkpZJOmSUpJJJJSkkk6Slkk6SSlkkk6Slkk6SSlkk6ZJSkkkklKSSSSUpJOkkpZJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSShJSkkkklKSShPCSlkk6ZJSkkkklKSSSSU//9bqUk8JQpmssknhKElLJJ4TQkpSSUJQkpSSUJQkpSSUJQkpSSUJ4SUsknhKElLJJ4ShJSydJOkpaEoTwnSUtCUJ08JKWhJPCUJKWSTwngJKYpKUBKAkpikngJQkpZJPCeElMUlKEoSUxSUkklMYKUFSSSUtCUJ0klLQlCeEklLQmUkoSUxShPCZJS0JQnSSUtCSdJJS0JQnSSUtCeEkklKSSTpKWSTwkkpZJOkkpZQtcW1OcNCBopoeTpQ9JTnhrRw0J5KSZOWqSSSSUpJOkkpikpJJKWShOkkpZMpJJKYpJ0klLJlJMkpZJOmSUpMnTJIUmKdMkpQ5Wj07+jO/rn8izhytDp38w7+ufyIFMd20kkkguUkkkkpSSSSSlO4HxUVI/RHxUUlKSTwlCSlkk8JoSUpJJJJSkkkklKTJ0klLJJ0klLJJ4TQkpSZPCSSlkk6SSlkydJJSgknhKElLJJ0klLQknTJKUknSSUsknSSUsknSSUsknSSUtCUJ4ShJSySdJJSySdJJSySSeElLQlCeEoSUsknhKElLJJ9EklLJQnSSUskkkkpSSdJJSySdMkpSSSSSlJJ4TQkpSSSSSlJQkkkp/9frIShPCZTNZUJoTpJKWhJOkkpZJOmhJSkkoShJSkkoSSUpJKEklKSShOkpaEoTpJKVCSSeElLJ4TpJKVCSSdJSySeE8JJWSTwnhJTGEoUoShJTFJShKElMUlKEoSUxSUoCUJKYpQpQkkpjCeE6SSloShShPCSmEJQpEJklMYSUkxCSmKaFKEySFoTQpJJKYpQpJJKYp4TpJKWhKE6SSlJJJJKUkknhJSySSeElLQg5f9HPxCMg5mlHxcEgotBJOmhOWqSTwkkpZJPCeElLQknhKElLQlClCUJKYwlCeEoSUxSTkjxCiXN8UlKSS3BMSkpSZMbGDlwHzTetX+8ElMkoUPXZ4lL1m9gkpnCaFH1UvUKSmUK7jW+hXse0yTuJHaVQ3EqbXvHBMeCSg6rLqn6NcJ8DofxU4Kyw8n6QBRGWvZ9B5b5HhCk26CSqtzXj6bQ4eLdEVuVQ7vtP8rRCk2lSSEESDI8QkkpR4CSQ4TpKWSTpJKWSTpJKWSTpJKWTKSZJS0JQnSSUtCZShKElMUlJNCSlkk8JQkpZKE8JQkpjCSdJJS0J4SSSUqEoTpJKWSTwmSUpJJJJSkk8FNCSlJoTpJKVCSSeElLQlCeEoSUtCaE6dJTGEoUoShJS0JJ4ShJS0JQnhKElMYShOlCSloTpJJKVCaE6UJKUklCSSlJQkkkpUJoTpJKWhKE8JJKWS1TpJKW1ShPCUJKWhKE6SSn/0OuTQnSUzWWhKE6SSloTQpJJKYwkpJoSUsknhKElLJJ4ShJSySUJQkpSSeEklLJJ4TpKWhOkkkpSdJOAkpZOAnhJJKkk8JQkpZPCeEklLQlCdJJS0JQnSSUtCUJ4TwgpjCUKSSSmMJ4TwnhJTGEoUwxSDEk0jhPCKK0/p+SSqQEKMKyak3opWqmumRnVEIZEJIYEJoUkkVMUlKE0JKWhMpQlCSloSTwlCSlkk8J4SUxhKFJJJS0JQnSSUtCUJ0klLQq+cP0Lf638FZVfOa80hzRuDTLh3hIIOzRhMhnIPZoUTfZ8PknLU6UKsbn93FDdf8T80lN2WjkhN6lY7qgch3ZoUDk29tPgEqVbo+sztJ+ATG7+Sfmsp2RcfzihOseeSUqRbsHJA5LR8ShuzaxzYPkFkElRJPijSrdR3UKR+c53w0Q3dSZ2ZPxKzSfNMlSm87qb/wA1rQhO6jkH84D4BVYS2pKSuzLzzY771A5Dzy4n5qO1INnQCfhqkhkL3Kbcl4SbjXu4YQPE6flTnFuH5k/CCklIzLjlGbmU91UOPcOa3fcomt45aR8ikp0W5eOeTCKzIxj+csnapBh8UlOy22k8OCI3aeCFiBsd0atljvoBzv6oJ/IlSrdgNUw0+CpUYnUDG2uwDxIIH/SV6nDzx9Ihv9Zw/wBqCR5K2T2S9PwVtmNcP5x7fOASiihneShaac7bYwy2W+bSiNzLm/Sh489D+CvelWOyXp1zO0T8ErTTGlznsDy0tngHw8VOE6dBLGEoUkklMYShSTJKWhKFJJJTFKE6SSmMJQpJQkpjCSlCaElLJk6SSlkk6SSFkkkklKTQnSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKhJJJJSkkkklKSSSSUpLVJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkoSSSU//9Hrk6UJQpmssknhJJSySdJJSySdJJSySdJJSySSSSlJJJJKUkkkkpSSSdJSydJOAklScJQnSUsnATwkkpSSdJBSkkk6Slkk6SSVkk8JQkpZJPCUJKWTwnhO0JKUGoja1JjJVhlaFpAQtpRBSrDWBSDULXcKAUqQqRoShK00h9IJjUrEBMQlaqarqgq1tS0XNQXslIFBDlkQUytXU+CruaRynLCGKSdJFCySdJJSySdJJSySdJJSySdJJSydJOkpaEoTpJKWhKE6SSkNmLj2fTrEnuND+Crv6XWf5t5b5OE/kV5MlaKDkWdMvbwA/wDqn+CqPoLDD2lp8CIXQpyA4Q4Bw8CJRtHC8y6sDhDc1dHZg4lnNYafFvtVWzorH/zVpB8HCfxajaOEuC4FDLStXK6VfjtLnvrIHg8T/mH3Kj6TieyNoIapYUxrV1uG88z90f8AVIrcJg+lHzJKSqcvYPmpNxrXfRYSPE6f9UtZtNTePwACfbWPzQfjr+VK1OY3BsJ1LR5fSP8A0UdvTW/nFx+5o/FXtx7aJkrU12YNLfzW/OXIorY3ifgIA/6KmmQUwsa3aSBCtmljq6y5o+gNY8lVf9ErRDZqrP8AJH5EkhrHHr7N/Km+zs/lD5qzCaElNf7Kw9z8wD/BL7FUeY/zQrEJ4SUtSxtQ9jKTH71YJ+9Wm5NvG2sf1SW/kQA2UVtTnIJCUWE6lk/B0qYeP3HfJKuiOSjBoCC5dmPY8SGkf1hCc4l4/NlOPiVIPf2cR80E6IC0gkEQRyCmRbXOcA5xk8SfBDSQskkkipSSSSSlJJJwElLQpBhKmxisV1ShaQGt6LimNLlptoHgnOOPBC13C5JY4chRWo/GHgq1uNCNrTEtRJSc0tOqiihSZOmSUsknhMkpSSSSSFJk6SSlkkkklLpJJJKWSTpklLpk6SSlkk6SSlkk6SSlk6SSSlJJJJKWSTpJKWSTpJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKf/9LsEk8JQpmusknhKElLQknShJS0JoU9qfakpHCeFPan2JKpHCaEbYlsSVSGEoRtiWxJVIYKeEXYl6aVqpFCUIuxNsSVTCEoU9qW1JTFOAnhKElLJ0k6Clk6UJ0krJQnSSUpJJJJSkkkklKSSSSUpEYFAIjElBs1NVlrUCoqw3hNLIF4SSSQSpJJOkpZJOmSUs5DKm4qBKSGDmSgWUSrQTloKNopyn1FvwUFpWUghUra9p0TgVhFIoSTpJIWhJOkkpaEoTpJKWhJOkkpZJOkipZJOmSUpJJRssbVW6x0lrBJjlJTJJ3tEuIaPEmPyrGuz8u0n9Ka29mV6QP630lWMOMvJefFxJRpbxO1Zn4Nejrmk+DPcf8Aoqu/q9f+Bpe/zdDR/FyzgQOAB8EpJSpXEW0/qec/6IqpHwLj+Kr2WZFn87kWOH7rTtH/AEVBJFFrCukGQyT4nUqe6NBp8FFOkhckpJk6SlBJJJJSkkkklKTFJJJTF/0StRo/QM/qj8iy3/RPwWs1h9Fn9Vv5ECkIk0IoqJU20DwSTSANJ7IrKSVYbSAihoCFpARV0AIzWBOlKCVwEk0pSkllKUqMpSkpd30P7X8FBPMsP9b+CaCkhSSkGEorKJSTSCCnDSVdbjeSmMceCVp4Wk2oqQrhXDTCE9kIWqmDQrVQVZo1VqrhIpDYaNE6YJ01esQCoPrBREklNC7HlUn1OafELacwFV7KAeycCsMXJgpwwlXzijwTtxwOyNo4S020SiDF8lebSAiCsIcSeFzTi+SE/HIWx6YQrKRHCXEoxcdzS3lMrt9MKm4QU61hFLJk6SSFk6UJJKUkkkkpSSUJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKf//T7FJJOpmusnhIBSDUlLBqmGKbWIra0LSAhFamKkcVqYYhaaawqUhUrIYn2BK001vSS9JWdibYlaqa/pJekrGxNtStVIPTS9NH2pbUrVTX9NMa1Z2ptqVqprGtR2K0WKJYlaqaxYmLVZLFAsStFINqaEUtUCEUMUkikkpSSSSSlJJJJKUkkkkpSSSSSlBTaVBOCkptVvhWWPVBroRW2wgQuBbwcE8hVRcn9ZCl1tjcluCrG5RNyVKttb1EvCqm5RN6VI4mybAo7wqpv803ro0jiboeFLeFQGQpixxSpXE2nvEKneQUSHlQdS4pBR1aySK6hw4UPTf4IraYpKfpPS9J6SmCSl6b/BMWuHZJSySSSSlJJJJKUkkkkpZBzdMO7+r/ABRkDqGmFb8h+IRQXEKSRSTmNSSSSSlJJJJKXSTJ0lKSSSSUukmSSUumTpoSUpJPCQCSli2Wlb9dYFLP6rfyLBfIAHit+sk01wPzW/kQK6PVjtATjRMSZkhQLvwQXJZS3eKFulLdKSku5LchbgluSUl3aJtyHuTbklJdybcobk25JTYp94cPAj8iOK0DC1L/AJK4CECkbLNrVmpgQWqxWU0rwlDQngJAp0FzEtBQn1I6RSU0zVBUmaI5YFAtRtFLh6mHBChJBSaU6ECVMFJLJIhJJJTEtCW0JykkpaAkmKSSmSYiUkklNa9khZ11ZB4Ww9soL6A5EFbKNuPBSWi/EHgqtlJanWsMaQpJ4TIoUkkkkpSSSdJS0JJ0oSUsklCSSlJJJJKUkkkkpSSSSSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSlJJQlCSn//1OySTpKZrrgIjAoBFYgkJWNRmtUGIjUFwZAKQCScILlQnhJJBS0JQnTJKWSSSSUpJJJJSoTEJ0kVMIShOUySFiAouapqLikpC4IbgiuKE4orSjKZOUyKFJJJJKUkkkkpSSSSSlJJJJKUkkkkpcFSDlBOElJA4p9xTNaiNrlBLCSmgo4qUvSStNNQgqBlXTShPpStBDVKQEorqyFFrYKKElVcq1XUEKqFaYRCBXALtrCf0wnCkE1cjNQKiaAjJ0rVSD0B4JegPBHSStVBrmgeCi7HHgrSUI2qg578byQH0ObwtYsBQn0gpAoMXJMhJWrsdVXNLTBTlhFKSTJJIUq/UTGE/wAy0firCq9UMYZ83t/iiFHYuOUycpk5jUkkkkpdJNB5jTxT+2JLmtHmQElKTqBux282tPk3X8iic2gfRa93yA/KkpKnhVXdQj6LGt/rGUF3Urf9I1v9UJUp0dpPZMQG/ScG/EgLJfnOP0n2P+cIJzPBnzJRpTtG6hv+EB/q6qP2mv8ANa4/gsU5tvaB8AmOZZ3JKVKdo5J7NA+Oqicp/wC/HwWQMvxUhmBKlOoL9ZJLvijMyyOHOb8CshuYxFblsSpTrtzrf9K/70QZ1v78/EArJbks8URtzT3QpVuqM23+SfkpDNs7safvCzW2DxRG2+aVJt0BmeNf3H/YpDLr7td+CotuKmLPIJUq26Mqn+UPlKQyKfE/cqgsaewRGV2P+jW4/AFCk22RbWeHBPub2I+9CGHkn8yP6xARG9OuP0nsb95S0Tq28E62a+Cut1VTExW47TB3Od9J3HHAj91XawmleGTWozNFFoCIE1cGYKeVCU+5BczlKUPcluSVbMlRJCiXKJcki2eiUIe5PvRVbOFJqFvUg9BSVOh70t6SWcpio7kpSUoppSJTSkhmCnlDBTl0JKZEpiQhusAQ3XI0q0ziFUyNsFJ16BZbKIC0lC7lRTnlMnLFJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUnALjDRJPYKdNLrTpo0cuV6uplQho+J7lAmkgW1WYdh+kQ3y5KIMKvu5xVhJNsruENc4VfZzghvw7Bq0h3lwVcSSsq4Q5jmuaYcCD4FMtJ9bLBteJH4qldQ6o+LTwU4G1pFIkkkkUKSSSSUpJJJJT//1ezSSTqVrqCKwoSkCklsscjNcqjXIrXoLgWyCpSgB6lvQpNppSlC3pb0lWklNKHvTb0qVaXcmlD3pbklWklLch7kt6SrSSmlD3pt6SrSSm3Ie5MXootIXKDnKBeoOckq13OUCUxcoyitUUkkklKSSSSUpJJJJSkkkklKSSSSUpJIBSDUlLAKbWp2sRWVpJpeuuVYbWmrZCMAmkrgGIYn2BSToLmGxRNYRUySmu6kFBdTCvQFEsRtBDRDS0ozHKbqlDYQkikocphyCAVIEpJtKCpIQKmCglkklKdJSydJJJSyREp0klIn1yqd2PK0IUXMlEFBFuO6pze0qK1H0AqtZjeSNrDFpqp1QE4gAE+9s/ir7qi3nQeJQH5GO0Fv87OhaOD/AGk4LSHCFTz2Tilx07+WquupqLiQC0HhszCcBoGghOtZTVbhPP0nbR95R241NesbneJ1Uy5MSglGQHEyTpoNVE0MPOvxAKccn4p0kIXYdB/MYf7P/kUJ3TcZw1YPkXD+Ktyoyipou6Ninhp+Vh/78oO6NT+a6wfNpWiklanJf0YDix/zYD+QoLuj29rR82ELbS8krRTz7ulZI4dWfmR+UIbun5Y/Nafg4LoymLG9wD8QEbVTzRw8of4I/KConHuHNbh8iulNNR/MH3Jvs9X7v3EpWqnmfTcOWkfIpw1dL9nq/lD+0onFr8T84KVqpwa6rnH2Mc7+qCfyK3V03qT4249nxIj/AKpazftDBFeRYwDgDT8hRG3Zo5yHu/ra/lQtVNKroPU3fSLK/i6f+pVyr6vW/wCFyf8ANb/5JWWZd0APIPmBCssyWEe/T5EIWVwAa9fRMZv0rLHn4gD/AKIVhnT8NnFe7+sS78qKL6OzhPxUxZUfzvxCFldQWbWxv0GNb8AApalSGw9/yKQDfH8EEsA0ogYpNcwcmPkVIPq/eA+KSqWa1FaYUQWdiD81IR2QSka5TDkIBTAQXM9yW5RUgEkrSUtVJJJTGClBUkklMC1ROiI4gIL3hJBUXQm9RBdYoGxGlttn1VIWqnvTixKlW3hYl6gVL1kvWSpPE3fUCb1VS9ZMbilSuJum1QdcqhtKiXkpUjiTvuQ3WEoclNKNItkXFRJSSSQsklCUIqWSUoShJTFJS2p9qSmKSltS2pKYpKW1LagpikpbU+0pKYQlCntS2pKYJKe1NCSmCSlCUIqYpJ4ShJSySdJJSySdJJSydJJJSylWx1jwwclMreGyGmzudB8AgUgWU7GNY0NboAnSSTV6kkkkFKSSSSUpM5rXtLXCQU6SKnOsrNbyw9uD5KCu5jJYH926H4FU04LCKKySdJFCySdJJT//1u0SSSUrApJJJJS4KmHIadJSUPUxYq8p9ySrbHqJeogbktySbT70t6DuS3JUq0u9LehbktySrS70t6FuS3JKtLvTb0LcluSRaTemL0OUpSVbMuUSVGUpSUukmTpKUkkkkpSSSSSlJJJJKUkkkkpSQSUmhJTJrUVlaVbZVqtiBK4Bg2pEbXCIGp4TbXUxDVJOkklZOkkkpSSSSSlJk6SSmJCjtUymSUx2p9qkE6SkcQlMKbghP0SQzDk4cq4ephyKrTSnlDBTgoJSJKMp5SUukmlPKSlQCoOYCpylKSnF6y4sLKh9FwLiPGCsolafXj+s1jwr/KVlkqSOzDP5iqUpTSmlFaumlNKUpKYjv8U6YJ0lLJaJ0kkMUoTpIqWhKE6SSmMJQpJJKYwkpJQkpikpQlCSmMJw1SAUgElKaIUkkkEqShJJJSktzhwT96SSSmQutHD3fepDJyB+eT8UNJJSX7Vd5H5JxmWjs0oKSSrLZGc4fm/cSFNvUSOz/k5UkkqTZdEdU/lPH3FEr6sJ97pb5iCspOhQVxF6UWAgOBkESD5Jb1UpefQr/qD8ilvPim0yW2PUTGxV96iXpUq07rUB9kqJcSoooJUkkkkhZJJJJSySdMipSSSSClJk6QCSFJQphqkGJJpFCeEX004rSVSHanDUcVqQqStVNcMUhWrIqUhWhaaavppemrfppemlaaavppemrXppemlaqavppemrOxNsStVNf00/po+1LalaqQeml6asbU21K1U1zWmNas7UxalaKapYolitFiiWI2qmttS2oxYmLUkUhhNCKWqJakpgknhMihSSnXU+ww0fE9gjjCbHucZ8kLSAS1VoUt21MHkgHCM6OkeYVpAldEUpJJJNXMXvDGF54CoPtfYZcfl2CuZLSaXR21+5UU6KyRZMtfWZafl2V+t4ewPHdZyvYoIpE95KRVEpUkkk1extG6p48is5aTvoOPkVmjhOiskpJJJOWqSSSSU//9ftUkklKwKSSSSUpJJJJSkkkklKSSSSUpKUkklKlKUkklKlJJJJSkkkklKSSSSUpJPCUJKUEkkklKSSSSUpJJJJSkkkklKSSSSUpTaoKbSkptUhWmcKnU5W2O0TSvCRJNKdBcpJNKUpKXSTSE24JKZJKO4Jt4SUzTShm1o5KW/cJaZSVbIlKUL1NU4eEUWlBTyhbwl6oQVaUlBtITOuHiq9tw8UQEErOfBU22Km55JSFhCdS23QbYFMWBZ4uUvtCFJ4nQ9QJeoFQ+0eaX2hKlcTf9QJeqFn/aExvKVK4nQNwUTcFQ9ZxTGx3ilSuJrdYfuym+TAPxKoEqxnmb5P7oVUlPGzGdyqU0piU0orV5SBUZSHKSmTeFJM0aJ0FLJJJJJUkkkkpSSSYlJS6SjKUooZJKMqQCClJwE4CeEkqATpJJKUkkkkpSSSSSlJJJJKUmTpJKUkkmSUpJJJJSk6ZJJTrVH9BX/VCdQoM0V/1VNNXqSSSSUpMnSSUskkkkpRTJ0ySlJk6ZFSkkkklKCm1sqLRJVipiBUF2VoorUmNRQE214CL00/posJQlaqR+mnDFOEoSSsGp4Tp0FMYShOkkpaE0KSSSmJCiQplMUVMEk5TJIUlCSSSliFFTKiUlLQokKSYooRkKJCmVEpIYkKDgiKLklFCQmU3KI0IPgihv1VitgaPn8VJONRI7pJi9ZJOkkpZJOkkpaFXswwTNZjyKspI2oi2tXhwZsMjwCsQnSStQFLJJ0kFIsh22l3noPmqKPl2bnBg4bz8UBOGy2W6kkkkVqkkkklP//Q7aEkklKwKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKTgpkklJmOhWK7VTBUw9Ckgt4WhS9QKiLCn9UoUu4m4bQom0KobSomzRGkcTbNyib1TNibelSOJtm9CuzW1DmXdgqeRlioQNXn8Fnutc4lzjJKIigybtuY5xknVExs8kyD7hyPFZL7Chi1zHB7TqE6lvE9Yy6u5oLvvHKi9tjBub72eI5WVhZgcA4fRP0h4FajLSNWlMIpeDaI5I8VE5KPZVRkan9HZ+8FUuxrqdXDc394cIilG1G5xUS4nkqITpLVJ0ydJSkkkkkqTpk6SlJQknSUpJJJJTnZp/TnyAVYlWM4O9dxjQxH3KqfLVOCw7qJUS4BIseewHxTFgHJlFDE2xwhutd4qTm+CG5qSEjMlrWhpc6VIZbP3/vCrOahO0SVbf+1M/fapC9p/OafmssuUdyNKt2BbPYH4FL1B+6VjbkvVI7kfNClW7Jtb4FRNtfmsY5Txw933lRObf2eUqVbsm+ru6E4uqJgPE+CxPtd5/OVvEfY9wgF58gjSrdVrSURrCmpZklo/REDxOn5VYpxzZYKy4NJ8DJ/BNXUi2lKFePSrfzbR8wVE9MyRw9p+ZH5QhYTwns00ytu6dmeDXfAhQOBmj/BT8CD/ABRsIo9mukjHFyxzS77lA1XD6VTh8ikqmCSfjkEfFNISUpJKWpSPFJSkktPFLRJSydLRLRJSySeEySlJJJ0lOnj/ANHr+CmoY/8AR6/h/FTTV4UkkkkpSSSZJSkkkklLJJJJKUkkkkpZJJJJSSsKywKtW5Ha9ApCdpRAVXa9Ea5BcCllOoByW5JLKUpUNyW5JSSU6HuT7klM0yjuCYvCSmaUoe8JjYElJCVElQNiibEqRbOUpQvUS9RJVpUpQt4S3hJVpCVFR3hNvRQzUSVHeExckpcqJTFyUpIUVElIlRJRUxKinKZJDYx8gNGx5gfmn+CtAg8GVmpAkcEj4IEJEnSSUawRW2TJjUqSauUkkkSAJJgeKSlJJAg8apJKUkkk5zWiXEAeaSlIV94rED6Z48vNQtyxxXqf3iqpJJk6k8lOAQT2W1STpIrVkk6SSlkk6SSn/9Ht0oSSUrAqEoSSSUqEoSSSUqEoSSSUqEoSSSUqEoSSSUqEoSSSUqEoSSSUqEoSSSUtCSdJJSySdKElLJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJSkkkpeUpTJJKXlMTokmPCSllXyMkM9rNXfkTZGTt9jNXdyqZPc8ogLSViSTJMk91Bzk7nIZKctWJQ3FSJUCkhnRe6mwOH0T9ILcw8prgGzLXfRP8FzxR8TINT9hPtcfuKBFrgaenBRWWubpy3wKzW9Sxq6x6z5eNNrPcVXu667jHpA/lWGT/AJjU2iv4gOrq5GM1w9WgafntHbzVG2/Hp0ssaD+6NT9zVl35+Xfpba4t/db7W/5rVXRAWmQ6B2PttUNdtdsf9FxgA/8AkUT7TUPp7q/6zTH+c3cquH/MVNOrXDUHUK1ryUlAs2vrf9B7X/AgqUEcqrZVU7VzBPjEFQh9f83Y9o7ayP8ApSkm26lCpfa8pnOyweYg/exO3qlQ0src3zaQ4f8AfUqKrDdSQGZ2E/i5rT4Plp/6SO2HCWkOHi0z+RBKkk8JklMLKmWAB4mODwUF2DSe7h8CrSSVqppHptZ4e4fcoO6UDxafmFoJI2UcIcx3SH9rR8wUJ3R8ns9h+Z/uWwmhKyrhDhu6Rm9g0/2ggv6V1DtTu+BBXRQkWmJOg8ToEuIo4Q8s/pmeOcd/yEoD8HMbzRYP7JXUWZmLWY373eDPd+RVrep5Efq9EnsbXQP81iNlBiO7zL6bW6Fjh8Wn+5DdWR9KR8dPyroH3dXu/ncv0W/u0NDf+m7c5Cb0/G3b7A6955fa4uKNracJtTrDFYLz/JEq3T0bKs1ePTHnytxjWsEMAYPBoA/IpgJWmmhR0bHr1f7z96vV1sqEVjaPLT8idOhaVc86oN5OhGhAMEaEIyDdx8ikp0mF2xpkyQNZPgpepaOHu+9QZ9Bv9UfkToLmfrXfvlP9ou8R9yEnSpVpRlXDwKkMy3u0feUBKUqVZT/bCeWfj/sS+0Un6VX4AoCUpUmymLsF30qf+iP4KPpdMPLI+RCGlKVIvySHF6We5b8yh29OxXNP2e8ep2a8iD5SkU2kpfVWnZzy0gwdCNCm2oln8474lRAJMDUorVtqWqMzFvfw2B4u0R2dPH+EfPk1K1UWlMIlVVtpAYDHckaD5rQZj0s+iwE+J1RNULTwrVsDGNYDIaInxTpJILlJJJklLlMkkkpSZOmSUpJMkkpSSSeCeySlkxUoI50+OiG6ypv0rGD4uCKFw6CiteVUdl4g5uafhr+RIZ2L2c53waUqVbfa5Ea9Z4zquzXH7gn/AGgOzPvKFJ4g6XqJvVVKnKNsiAIRdyFJtseol6iBuS3JUq2x6iXqKvuS3JUq05tTG1A3JtyVKtMbCm9QoMpSiq0psKYvQ5TJItJvS3oaSSrSb0t6Gkkq0m9LehpJKtnvS3KCSSme5LcoJJKZFyjKSSSlJtU6SSloShOkkp0GkFoI8E6rY1wA9N5j90/wVlNK8aqQcsxUG/vH8iK5zWiXGAqd1vqPn80aAJBBKMFw4JHwUhdcPziopJy1mbrj+cVA7jqTPxSSSUtCUJ0klLQlCdJJSyUJ0klLQlCdJJT/AP/S7dJJJSsCkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKKZOlCSlkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKQslxbQ8t0OmvzRUHL/o7/l+VJBc4qLnJnOUC5PWLEqJUonWYUSG/FJTAn5pbHHnQKe4qMpIVsYOdUtOwASTSkpdJMlKSl0yaUpSU6uJpVT/VVmeyq45hlYPZgn7kcOEwE1eGR4UHNbzyeJKfcoucP92hSUiezTTT4KnZW4ug88aK+7mIPx8UMsJ7+ET/AN+RCC5xY4KALmGWktPiJB/BaTqpB2jXmEF+O06xHbyRtFI6+o5tfFrnDwdDv+qVhnW7RpZW13mJb/5JVX455CE6pw7JUFWXXr6ziO+m19fnAcP+irNeZiWaMuYT4Ewf+nC5siExKHCE8ZergxIEjxGqaCuXZfdWZre5h/kkj8iMep5rm7X3Oc3wP+zalwp4w9A+2mv+csa3yJ1/zVXf1PHb9BrrD4/RH4rFGW3u37lIZNJ5JHxCXCridF/VLz/NtbWPHk/e5VrLrLTNri8/yjI+5CFlbvouB+adGkWV93gpAoReG6kwExyWdkkJ04VcXjxUhcPFJTZBTygC1P6gQSm3JbkL1AlvSUl3Idp9vyTb1F59pSU6jfot/qj8iSi0+1vwH5E8oJXSTSlISUukmlKUlLpJpSlJK8pSmlKUlLpnGAT4JSouPtPwSQlGFRuLnS8nXXjXXgIzWNZoxoaPIKQ+i0/yR+QJILlkk6ZJSySSSSlJQq+dlfZaN4+m47WfH95ZLuoZLubXn5x/1KIFoMgHe2nwUS5rfpOa34kBc87Ie76Rc74uJUDafAI8KOJ6F2Vit5uZ8jP5EI5+IPzy7+q0lYZts8Y+AUTbYfzilwo4ncd1KgcMsd8gPylDd1Ro4q/znALFLnHkk/NMlQRxF1ndXf2bWPiSUN3V7zw9g/qtn8qzEpRoK4i3ndVvP+Ff/ZACE7Osdy6x3xef4KsmlKlWUxyCfzZ+JJUfWd2a0fJDlNKKEvrW/vfcApsseeXFVwisKSm5UddUcKtWdVZagkNrC+k/4BW1VwuX/AK0mleNlJSkkgleUpTQkkpSSSSSlJJQkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSkHvHDiPmopJKXJJ1JJ+KZJJJSkkoSSUpJJJJSkkkklKSSSSUpJJJJSkkkoSU//9Pt0k0p5UrApJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKTQnSSUsknhNCSlJJJJKUkkkkpSSSSSlJJJJKUklCeElLQg5umLZ8vyo6r9Q/odny/KEgo7OQXKEyQPHRMSVEE7hpwU9jSOOqYlMSZKjJSQuSlKilKSl5TSmlKQkpeUlGQlISUySPBTSPFMSElOtX+aP5I/IiB2nCAxw3RI4Ut4hBck3f7FEu8zr/rwobh2I1TF3z+4JKZ7hxPwSBMD5At7afnIct8vlonkfNJSSdST8NU0nkRMccyobmh3gluAJk8az/uSUuYJI+J08fgourB0441idfgkXAjR2ngTPz/AHkt4nV22eCNfgkpE+mZ9s+EflQX4o1iArYcCIJDo+/8FBxrgzrpIbH5EUOe+ojjVQcCOVesa0gCABEgjuT/ACVRucA4gGR49kkMCVAlIuCgSipclIW2N+i4j4FRJUSUlNn7Q6xgDvpAxPilKqg/pB8FZBCSkjSpgobSFMEJKShykHIYIUgQgpIHJ9yGCE+4JJSbki72FD3BPu9jklOoHe0fAfkS3IHqDaNew/Im9QeKFLrbG9Leq/qDxS9QeKVItsb0t6r+oPFL1B4pUq2xvS3Kv6g8U/qDxSpVtjeluVf1B4peoPFKk22NyZzpBQfUHim9QeKVIt12fQb/AFR+RL5hZRvHcA/NN6/8lqFLuJ1pb4j7wm3M/eb94WT6/wDJb9yY5Duwb9yVK4nVL6h+e371E3Uj89qyTlWdto+QQbc7IHDgPgAlwo4m51i2t9NbWODiHTp8FlJjk3XWFtr9wAkApSE4ClpNlSUpk0pIVKaUkkVKSTJklLylKZJJSpSSSSUpJJJJSkRigFNqSmxWVaYdFTrVqo6IJDfwfpP+AVtVMHl/wCtppXjZSSSSCVJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkp//9k='),
            (J.style.position = 'absolute'),
            (J.style.top = '0'),
            (J.style.left = '0'),
            (J.style.width = '100%'),
            (J.style.height = '100%'),
            (J.style.objectFit = 'cover'),
            (J.style.zIndex = '1'));
        const A = new Image();
        ((A.id = 'img_loadingbaroverlay'),
            (A.src =
                'data:image/jpeg;base64,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bWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEAB4AAAAAQABAHgAAAABAAE4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAE4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0ERAAAAAAAEAAAAAIAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANRAAAABgAAAAAAAAAAAAAC0AAABQAAAAAOAHAAcgBlAGwAbwBhAGQAZQByACAAYwBvAHAAeQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAFAAAAAtAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAtAAAAAAUmdodGxvbmcAAAUAAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUA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LmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNC0wNC0xN1QxODozNTo1OSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNy0yNVQxNDo1MTo0MiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDctMjVUMTQ6NTE6NDIrMDg6MDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjgwYWU5ZS01NmE0LTI0NDctYTliYy02NGI1OGIxZmE0ODMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2ZDYzZTQ1MC1hNDViLTFmNDYtYWE1Ny00NTQ2NGE4YzczZTYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZDdhYjg3MC1mY2FkLTczNGItOGE2NC03NjllYTgzY2Q2ZDciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVkN2FiODcwLWZjYWQtNzM0Yi04YTY0LTc2OWVhODNjZDZkNyIgc3RFdnQ6d2hlbj0iMjAyNC0wNC0xN1QxODozNTo1OSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyYTQyMzVkOS1iMjM5LWNiNDYtODA3MS1iY2FiYWYxODYyNGIiIHN0RXZ0OndoZW49IjIwMjQtMDQtMTdUMjI6MjU6MjUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODU2YzkxMTMtN2FkZi1mNjRhLWEyNGUtNDE0ODdkYjA5MDk4IiBzdEV2dDp3aGVuPSIyMDI0LTA3LTI1VDE0OjQ2OjQ0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMTEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MWE1MjYyNS1jYTRhLTJhNDAtYTYyZi1mOWQ4NzJiY2YyNDUiIHN0RXZ0OndoZW49IjIwMjQtMDctMjVUMTQ6NDY6NDQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg5MmFlMmE0LTIxOGEtZTg0Yy05YjA3LTczZTdkN2EyMDBmZCIgc3RFdnQ6d2hlbj0iMjAyNC0wNy0yNVQxNDo1MTo0MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI1LjExIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjY4MGFlOWUtNTZhNC0yNDQ3LWE5YmMtNjRiNThiMWZhNDgzIiBzdEV2dDp3aGVuPSIyMDI0LTA3LTI1VDE0OjUxOjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMTEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4OTJhZTJhNC0yMThhLWU4NGMtOWIwNy03M2U3ZDdhMjAwZmQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphZTIzZWViMS0wNWM2LTA1NDYtYWY4Ni01Y2Q4MTAzMDkwODAiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZDdhYjg3MC1mY2FkLTczNGItOGE2NC03NjllYTgzY2Q2ZDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAtAFAAMBIgACEQEDEQH/3QAEAFD/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/AIpJ0l0Dy6ydJJJSkkkklKTJ0klKTJ0klLJJ0klLJJ0klLJJ0klLJJ0klLJJ0ySlJJJJJUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSdJSySSSClkk6SSlkydMkpSZOmQSpMkmSUpJJMglSSSZJSkkkklKSSSSSpJJJJSkkkklKSSSSQpOmSSUukmSSUukkkkpdJMkkpdJMnSUukmSRUukmSSUukmSSUukmSSUpJJMgpdMkkkpSSSZJS6SZJJS6SZJJS6SZJJS6SZJJS6SZJJS6SZJJS6SZJJS6SZJJS6ZJJJSkkkklKSSSSUukmSSUukmSSUukmSSUukmSSUukmSSUukkkkpSSSSSlJJJJKUkkkkpSSSZJS6ZJJJSkkkkEqSSSSUpJJJJSkkkklKSSSRUpJJJJC6SZJJS6SSSSl0kySSl06ZJFS6dRTpIXTpkklLp0ySKF06ZJJS6SSSSn/9Bkkkl0Dy6kkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSySSSClJk6ZJKkydMkpSZJIoJWTJ0ySVkkkyClJJJJJUkkkgpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSKlJ0ySSF0kydJSkkkklLpJkklLpJkklKSSSSUpJJMkpdMkkkpSSSSSVJJJIKUkkkkpSSSSSlJJJIqUkkkkpSSSSClJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkipSSSSSlJJJJKUkkkkpSSSSSlJJJIKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSKlJ0ySSF0kkklLpJk6Sl06inRQunTJ0lKTpk6KF0kydJT/AP/RZJJJdA8upJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUskkkgpSZOmSSpMnTJKWSSSQSsmTpkErJk6ZJSkkkkEqSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSRUpJJJJC6SZJJS6SZJJSkkkklKSSSSSpJJJBSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJFS6SZOkhdJMnSUunTJ0ULpJJIoXTpkklP8A/9Jkkkl0Dy6kkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSySSSClJk6SSVkydMkpSZOmQSsmTlMklZMnSQUskkkglSSSSSlJJJJKUkkkkpSSSSSlJ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'),
            (A.style.position = 'absolute'),
            (A.style.top = '50%'),
            (A.style.left = '50%'),
            (A.style.height = '100%'),
            (A.style.width = 'auto'),
            (A.style.transform = 'translate(-50%, -50%)'),
            (A.style.objectFit = 'cover'),
            (A.style.zIndex = '2'),
            (A.style.clipPath = 'inset(0 100% 0 0)'));
        const k = new Image();
        ((k.src =
            'data:image/png;base64,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'),
            (k.style.position = 'absolute'),
            (k.style.zIndex = '3'),
            (k.onload = () => {
                const S = 0.25 * window.innerHeight;
                ((k.style.height = `${S}px`), (k.style.width = 'auto'), (k.style.top = '40%'), (k.style.left = '50%'), (k.style.transform = 'translate(-50%, -50%)'));
            }));
        const l = document.createElement('div');
        ((l.id = 'rotatingImagesContainer'), (l.style.position = 'absolute'), (l.style.top = '80%'), (l.style.left = '50%'), (l.style.transform = 'translate(-50%, -50%)'), (l.style.height = 0.038 * window.innerHeight + 'px'), (l.style.display = 'flex'), (l.style.alignItems = 'center'), (l.style.justifyContent = 'center'), (l.style.zIndex = '3'));
        const U = new Image(),
            C = new Image(),
            p = new Image();
        ((U.src =
            'data:image/png;base64,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'),
            (C.src =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAi4AAAArCAMAAABoxvN3AAAC/VBMVEUAAAAtMTssMDorLzkpLTcnKzUrLzkqLjksMDopLTcsMDosMDorLzosMDosMDosMDorLzksMDosMDorLzksMDouMjssMDorLzkUGCMrLzksMDorLzksMDorLzksMDorLzksMDosMDosMDorLzn///8sMDooLDYsMDovMz0mKjTg4eIrLzoOEh7///8rLzm3uLwsMDosMDosMDosMDrr7O0OEh0sMDonKzX///8SFiIrLzn29vfn5+gqLjgaHigsMDoPEx4eIi0XGyYsMDosMDr////p6er///8YHCeanKHt7u////+8vcAfJC4rLzmlpqsXGyYOEh4VGiWho6gaHyoaHykSFiIWGyWanKF7foRfYmpvcnn///+qrLAgJC4dIiwbHyr///88QEmztLcfJC5qbXQiJjEYHCcUGCP///+dn6P///+UlpsPEx9laG////8YHSj6+vr///8lKTMUGCNRVF0sMDoaHyny8vPv7/CVl5yOkJZTVl6lp6sXHCdaXWV7fYQWGyVjZm3V1tjNzdBhZGsZHSjOz9FCRk+KjJInKzUiJjDf3+GLjZJfYmkjJzIhJTAXHCeHiY8eIy0PEx6qq6/X2Np7fYQtMTuXmJ10d32XmZ4YHCejpan///9iZWzh4uPGx8rAwcTz9PSEhoxpa3M3O0VESFGGiI6mqKyOkJWdn6T////19fbw8PHn6Onl5edNUFlzdnylp6uUlpzl5ufa29z///9ydXzw8PFNUFmwsbWio6iChIphZGxNUFjt7e7f4OJ1d35iZWxKTldzdn1GSlJtcHf4+PjS09VhZGvi4+Tc3N5WWWHP0NMdIi38/PzNztGIio+ztLiFiI36+vri4uS8vcDKy82en6Tr6+yztLjOz9Ftb3b////6+vuxsrbw8PH////Mzc9nanG9vsE7P0jOz9Gdn6S9vsG0tbnDxMe/wMP09PU3O0T9/f3///+vsbVYW2L9/f5CRk9NUFnKy87z8/Q5PUa/wcN9f4ZbXmb+/v7+/v7////9bt6CAAAA/nRSTlMABwQaDBMJDh4RMBcsJiMpOjQgTXNlXVo3YUU/UI+Dd0pUVzyIN6J+sTjtbz/6QeR7lpJs+KKcXf2Qi/nxRxaHnp+fZzb39OmkevXz5nlp15eT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'),
            (p.src =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkoAAAArCAMAAACwyld9AAAC/VBMVEUAAAAsMDorLzkqLjgoLDYqLjkpLTcqLjgsMDosMDooLDYrLzksMDosMDosMDosMDorMDohJTAsMDorLzotMTssMDorLzkqLjgsMDr///8sMDorLzkQFCAsMDorLzocICssMDosMDosMDosMDosMDosMDorLzksMDr+/v4rLzksMDosMDorLzksMDosMDorLzkrLzktMTsrLzr////d3t/29vYsMDosMDr///8sMDotMTsOEx4PFB8XGyYYHSi3ubx1eH8gJC8qLzkVGiUWGiXu7u8WGiVUV18eIi1DR1AsMDoWGiX///8rLzkeIi3///+srrL///+LjZL6+vsdISwdISwkKDIbHyoOEx6dn6QRFSFfY2oXGycZHij///85PUagoqby8vIhJTArLzl0d34YHSchJS/5+fn19faanKG1t7pxdHv9/f05PUcWGyYVGSR6fYMdIiyNj5UVGiXq6uv///8XGydlaHD///9sb3ZCRk8VGSQWGybg4eKoqq5cX2ceIi0bICr////l5udKTlbq6uufoaUfIy5pbHPw8PHGyMq+v8Lx8fJUV18kKDKGiY5NUFhjZm3W19nQ0dMDBxP+/v6eoKRfY2rOztFgY2rp6epNUFltb3bn5+mKjJL+/v7Exsh0d35jZm68vcGUlpu+v8Lc3d7k5ObX2NrFxsn19faQkpfY2dvNztBnanGoqq5OUVmdn6PDxMcrLzrQ0dOztLj+/v5xdHr9/f3S0tXMzdCjpKnr6+yChYvu7u9FSFG1t7r+/v6anKGqq6+/wcSwsrV3eoBydXxSVV1vcnmIipDj4+VhZGs6PUZ1d36QkphmaXDf3+HZ2txPUls5PUY3O0TX2NpWWmK+wMOpq6////9JTVWgoqaBg4mBg4n4+fmDhYu2t7sBAwy3ubx4e4Ht7e6mp6uLjZPOz9JDR1DU1df5+fqio6j19faUlpvQ0NKpq6/p6uu3uLv39/iFiI3///9dYGjS09Xr6+zb3N5DRk/a2tz///84PEX///+ourF9AAAA/nRSTlMABgkZDxELDSIlFi8ULB8dUhJOMilDNydpz0A0o55LOFZmXIyIfUg5/jtwWZSFPY9FeW0q6vlzX/l1gjqcmmrkzJqYjIX2okCgdWNA5aNY6uDX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'),
            [U, C, p].forEach((S) => {
                ((S.style.height = '100%'), (S.style.width = 'auto'), (S.style.position = 'absolute'), (S.style.transition = 'opacity 1s'), (S.style.opacity = '0'));
            }),
            (U.style.opacity = '1'),
            l.appendChild(U),
            l.appendChild(C),
            l.appendChild(p),
            S.appendChild(J),
            S.appendChild(A),
            S.appendChild(k),
            S.appendChild(l),
            document.body.appendChild(S));
        let I = 0;
        const g = [U, C, p];
        setInterval(() => {
            ((g[I].style.opacity = '0'), (I = (I + 1) % g.length), (g[I].style.opacity = '1'));
        }, 3500);
    })(),
        setRotatingImagesContainerHeight(),
        window.addEventListener('resize', setRotatingImagesContainerHeight));
    (S.on('preload:end', function () {
        S.off('preload:progress');
    }),
        S.on('preload:progress', function (S) {
            !(function dj_loading(S) {
                k = 100 * Math.min(1, Math.max(0, S));
            })(S);
        }),
        S.on('start', function dg_hide_loading_pls() {
            const S = document.getElementById('preloaderContainer');
            S &&
                ((S.style.opacity = '0'),
                setTimeout(() => {
                    (!(function stopAnimation() {
                        clearInterval(J);
                    })(),
                        document.body.removeChild(S));
                }, 1e3));
        }),
        (function startAnimation() {
            (Date.now(),
                (J = setInterval(() => {
                    !(function animate(S) {
                        const J = document.getElementById('img_loadingbaroverlay');
                        J && ((A += (k - A) * S * 1), (J.style.clipPath = `inset(0 ${100 - A}% 0 0)`));
                    })(1 / 60);
                }, 16.666666666666668)));
        })());
});
var TextIcon2 = pc.createScript('textIcon2');
(TextIcon2.attributes.add('icon', { type: 'entity' }),
    TextIcon2.attributes.add('spacing', { type: 'number', default: 20, title: 'icon spacing' }),
    TextIcon2.attributes.add('yspacing', { type: 'number', default: 0, title: 'icon y-spacing' }),
    TextIcon2.attributes.add('leftside', { type: 'boolean', default: !0, title: 'left side icon' }),
    TextIcon2.attributes.add('lerpTime', { type: 'number', default: 1, title: 'lerp speed' }),
    (TextIcon2.prototype.initialize = function () {
        this.leftside ? (this.targX = -(this.spacing + 0.5 * this.entity.element.textWidth)) : (this.targX = this.spacing + 0.5 * this.entity.element.textWidth);
    }),
    (TextIcon2.prototype.update = function (t) {
        var e;
        ((e = this.leftside ? -(this.spacing + 0.5 * this.entity.element.textWidth) : this.spacing + 0.5 * this.entity.element.textWidth), 0 == this.spacing && (e = 0), (this.targX = pc.math.lerp(this.targX, e, this.lerpTime * t)), this.icon.setLocalPosition(this.targX, this.yspacing, 0));
    }));
