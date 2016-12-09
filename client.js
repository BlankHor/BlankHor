//Copyright 2016 Stan Tatarnykov
(function () {
    var t = {
        scope: {}
    };
    t.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, e, a) {
        if (a.get || a.set) throw new TypeError("ES3 does not support getters and setters.");
        t != Array.prototype && t != Object.prototype && (t[e] = a.value)
    };
    t.getGlobal = function (t) {
        return "undefined" != typeof window && window === t ? t : "undefined" != typeof global ? global : t
    };
    t.global = t.getGlobal(this);
    t.polyfill = function (e, a, i, n) {
        if (a) {
            i = t.global;
            e = e.split(".");
            for (n = 0; n < e.length - 1; n++) {
                var s = e[n];
                s in i || (i[s] = {});
                i = i[s]
            }
            e = e[e.length - 1];
            n = i[e];
            a = a(n);
            a != n && null != a && t.defineProperty(i, e, {
                configurable: !0,
                writable: !0,
                value: a
            })
        }
    };
    t.polyfill("Array.prototype.fill", function (t) {
        return t ? t : function (t, e, a) {
            var i = this.length || 0;
            0 > e && (e = Math.max(0, i + e));
            if (null == a || a > i) a = i;
            a = Number(a);
            0 > a && (a = Math.max(0, i + a));
            for (e = Number(e || 0); e < a; e++) this[e] = t;
            return this
        }
    }, "es6-impl", "es3");
    t.polyfill("Math.trunc", function (t) {
        return t ? t : function (t) {
            t = Number(t);
            if (isNaN(t) || Infinity === t || -Infinity === t || 0 === t) return t;
            var e = Math.floor(Math.abs(t));
            return 0 > t ? -e : e
        }
    }, "es6-impl", "es3");
    var e = 157,
        a = !1,
        i = "45.63.15.119",
        n = 400,
        s = 500,
        r = [],
        l = {
            "USA-West": [],
            "USA-East": [],
            "South America": [],
            Europe: [],
            Asia: [],
            "East-Europe": []
        };

    function o(t, e, a) {
        t = {
            name: t,
            ip: e,
            region: a,
            playersCount: -1,
            ping: 1e4,
            domOptionIndex: 0
        };
        r.push(t);
        l[a].push(t);
        return t
    }
    if (a) h = "USA-West",
    console.log("DEBUG MODE!!!!!!!!!!!!!!!!!!!!!!!", h),
    o("LOCAL TEST", "192.168.0.11", h);
    else {
        var h = "USA-East";
        o("USA 1 (New York)", "104.207.132.63", h);
        o("USA 2 (New York)", "107.191.40.35", h);
        o("USA 3 (New York)", "107.191.43.180", h);
        o("USA 4 (New York)", "45.63.17.44", h);
        o("USA 5 (New York)", "107.191.40.38", h);
        o("USA 6 (Miami)", "104.238.138.249", h);
        o("USA 7(Chicago)", "45.76.20.213", h);
        o("USA 8(Chicago)", "45.76.28.156", h);
        h = "USA-West";
        o("USA 9 (California)", "45.63.87.103", h);
        o("USA 10 (California)", "45.32.137.149", h);
        o("USA 11 (Seattle)", "45.32.228.141", h);
        o("USA 12 (Seattle)", "104.207.158.226", h);
        h = "South America";
        o("Brazil 1 (Sao Paulo)", "177.54.158.172", h);
        o("Brazil 2 (Sao Paulo)", "177.54.158.190", h);
        o("Brazil 3 (Sao Paulo)", "177.54.158.191", h);
        o("Brazil 4 (Texas)", "108.61.224.165", h);
        o("Brazil 5 (Texas)", "107.191.55.233", h);
        h = "Europe";
        o("Europe 1 (London)", "45.63.98.41", h);
        o("Europe 2 (London)", "104.238.170.8", h);
        o("Europe 3 (London)", "45.76.129.33", h);
        o("Europe 4 (London)", "45.76.134.74", h);
        o("Europe 5 (London)", "45.76.135.33", h);
        o("Europe 6 (London)", "45.76.129.125", h);
        o("Europe 7 (Germany)", "45.32.158.172", h);
        o("Europe 8 (Germany)", "45.32.152.68", h);
        o("Europe 9 (Paris)", "45.32.144.28", h);
        o("Europe 10 (Amsterdam)", "185.92.221.137", h);
        h = "East-Europe";
        o("Russia 1 (Moscow)", "158.255.6.206", h);
        o("Russia 2 (Moscow)", "158.255.6.207", h);
        o("Russia 3 (Germany)", "104.238.159.143", h);
        o("Russia 4 (Germany)", "45.32.157.75", h);
        o("Russia 5 (Germany)", "45.32.158.92", h);
        o("Russia 6 (Germany)", "104.207.131.166", h);
        o("Russia 7 (Germany)", "45.76.84.33", h);
        h = "Asia";
        o("Asia (Singapore)", "103.3.63.181", h);
        o("Asia (Tokyo)", "45.32.28.177", h);
        o("Australia (Sydney)", "45.63.28.66", h)
    }
    var c = 2;

    function f(t) {
        t = t.split("+").join(" ");
        for (var e = {}, a, i = /[?&]?([^=]+)=([^&]*)/g; a = i.exec(t);) e[decodeURIComponent(a[1])] = decodeURIComponent(a[2]);
        return e
    }
    var g = f(document.location.search),
        u = 0 < g.mobileios,
        p = 0 < g.mobileAndroid,
        y = u || p,
        m = !0,
        w = 0 < g.videoson,
        b = 0 < g.nofullscr,
        I = !1,
        P = g.s,
        v = g.l;
    null != P && null != v && 5 < v.length && (I = !0);

    function M(t) {
        this.serverObj = t;
        this.testWs = new WebSocket("ws://" + this.serverObj.ip + ":7020");
        this.startT = +new Date;
        this.testWs.binaryType = "arraybuffer";
        var e = this;
        this.pingsDelayMsTot = this.pingsRec = 0;
        this.testWs.onopen = function () {
            e.sendPing()
        };
        this.sendPing = function () {
            var t = new ei(1);
            t.writeUInt8(255);
            e.testWs.send(t.dataView.buffer);
            this.startT = +new Date
        };
        this.testWs.onmessage = function (t) {
            t = new ti(new DataView(t.data));
            255 == t.readUInt8() && (t = +new Date - e.startT, e.pingsRec += 1, e.pingsDelayMsTot += t, 3 <= e.pingsRec ? (e.serverObj.ping = e.pingsDelayMsTot / e.pingsRec, e.testWs.close(), B(e)) : e.sendPing())
        }
    }
    var A = Ca(0, Math.max(0, r.length - 1 - c)),
        x = r[A],
        k = r[Math.max(0, Ca(0, r.length - 1 - c))],
        T = k.region,
        S = [],
        U = !1,
        E;

    function D() {
        if (!U) {
            U = !0;
            for (var t in l) l.hasOwnProperty(t) && 0 < l[t].length && S.push(new M(l[t][0]));
            E = setTimeout(function () {
                for (var t = 0; t < S.length; t++) S[t].testWs.close();
                C()
            }, 3e3)
        }
    }
    function B(t) {
        t.serverObj.ping < k.ping && (k = t.serverObj);
        t = S.indexOf(t); - 1 != t && S.splice(t, 1);
        0 == S.length && (E && clearTimeout(E), C())
    }
    function C() {
        U = !1;
        console.log("@@@@  Fastest region is " + k.region + " with ping " + k.ping + "ms ");
        var t = l[k.region].slice();
        t.sort(function (t, e) {
            return t.playersCount < e.playersCount ? 1 : t.playersCount > e.playersCount ? -1 : 0
        });
        for (var e = !1, a = !0, i = 0; i < t.length; i++) if (t[i].playersCount < s && (a = !1), t[i].playersCount < n) {
            x = t[i];
            A = r.indexOf(x);
            e = !0;
            break
        }
        if (!e) if (a) for (console.log("All servers in region are full! Picking any available server..."), a = !0, i = 0; i < r.length; i++) {
            if (r[i].playersCount < s) {
                x = r[i];
                A = r.indexOf(x);
                break
            }
        } else x = t[Ca(0, t.length - 1)],
        A = r.indexOf(x);
        T = k.region;
        li();
        ri();
        console.log("Connecting to best server...");
        di() && Ma.close();
        ni()
    }
    var _;

    function R(t) {
        if (window.WebViewJavascriptBridge) return t(WebViewJavascriptBridge);
        if (window.WVJBCallbacks) return window.WVJBCallbacks.push(t);
        window.WVJBCallbacks = [t];
        var e = document.createElement("iframe");
        e.style.display = "none";
        e.src = "wvjbscheme://__BRIDGE_LOADED__";
        document.documentElement.appendChild(e);
        setTimeout(function () {
            document.documentElement.removeChild(e)
        }, 0)
    }
    u && R(function (t) {
        _ = t;
        t.registerHandler("testJavascriptHandler", function (t, e) {
            console.log("ObjC called testJavascriptHandler with", t);
            e({
                "Javascript Says": "Right back atcha!"
            })
        })
    });

    function O() {
        _ && u && _.callHandler("adShowCallBack", {
            foo: "bar"
        }, function (t) {
            console.log("JS got response " + t)
        })
    }
    function W() {
        console.log("Showing ad android...");
        window.location = "myscheme://showAdmob"
    }
    var F = 0,
        L = 0;
    if (window.localStorage) var G = 1 * window.localStorage.getItem("lastAdShowT") || 0,
        H = +new Date - G,
        L = 0 < H ? G : 0,
        F = 1 * window.localStorage.getItem("gamesSinceAd");
    var Y = 0,
        N = +new Date,
        z = !1;

    function X() {
        return !m || y || "undefined" == typeof adplayer ? (console.log("preroll: no show: ads disabled"), !1) : w ? (console.log("preroll: test mode, always show video ad!"), !0) : 1 > Y && 0 == L ? (console.log("preroll: no show: NEW PLAYER, no games yet started!"), !1) : 300 < (+new Date - L) / 1e3 && 0 < F ? (console.log("preroll: show: time limit passed!"), !0) : 3 <= F ? (console.log("preroll: show: 3+ games passed!"), !0) : !1
    }
    function j() {
        "undefined" != typeof aipPlayer ? (console.log("Loading video preroll..."), adplayer = new aipPlayer({
            AD_WIDTH: 960,
            AD_HEIGHT: 540,
            AD_FULLSCREEN: !1,
            PREROLL_ELEM: document.getElementById("preroll"),
            AIP_COMPLETE: function () {
                console.log("Video ad finished.");
                z = !1;
                F = 0;
                L = +new Date;
                if (window.localStorage) try {
                    window.localStorage.setItem("lastAdShowT", L),
                    window.localStorage.setItem("gamesSinceAd", F)
                } catch (t) {}
                _i()
            }
        })) : (console.log("Video ad (blocked) -finished."), z = !1, _i())
    }
    function V(t, e) {
        var a = document.head || document.getElementsByTagName("head")[0],
            i = document.createElement("script"),
            n = !0;
        i.async = "async";
        i.type = "text/javascript";
        i.charset = "UTF-8";
        i.src = t;
        i.onload = i.onreadystatechange = function () {
            !n || i.readyState && !/loaded|complete/.test(i.readyState) || (n = !1, e(), i.onload = i.onreadystatechange = null)
        };
        a.appendChild(i)
    }
    m && !y && V("//api.adinplay.com/player/v2/MOP/mope.io/player.min.js", j);
    var J = .175,
        q = "#3FBA54",
        K = "#09992F",
        Z = "#09992F",
        Q = "#4E66E4",
        $ = "#4655A6",
        tt = "#F35F53",
        et = "#CF6259",
        at = "#FF911E",
        it = "#C67019",
        nt = "#EF3C31",
        st = "#4AE05E",
        rt = "#8C9688",
        lt = 1,
        ot = 2,
        ht = 3,
        dt = 4,
        ct = 5,
        ft = 6,
        gt = 7,
        ut = 8,
        pt = 9,
        yt = 10,
        mt = 11,
        wt = 12,
        bt = 13,
        It = 14,
        Pt = 15,
        vt = 16,
        Mt = 17,
        At = 18,
        xt = 19,
        kt = 20,
        Tt = 21,
        St = 22,
        Ut = 23,
        Et = 24,
        Dt = 25,
        Bt = 26,
        Ct = 27,
        _t = 1,
        Rt = 2,
        Ot = 3,
        Wt = 4,
        Ft = 5,
        Lt = 6,
        Gt = 7,
        Ht = 8,
        Yt = 9,
        Nt = 10,
        zt = 11,
        Xt = 12,
        jt = 13,
        Vt = 14,
        Jt = 15,
        qt = 16,
        Kt = 17,
        Zt = 18,
        Qt = 19,
        $t = 20,
        te = 21,
        ee = 22,
        ae = 23,
        ie = 24,
        ne = 25,
        se = document.getElementById("gCanvas"),
        re = null,
        le = null,
        oe = se.getContext("2d");
    oe.shadowColor = "black";
    var he = !1,
        de = Math.min(window.devicePixelRatio, 2),
        ce = n_camzoom = 2.7,
        ce = 1,
        fe = camy = n_camx = n_camy = o_camx = o_camy = 0,
        ge = 1,
        ue = 0,
        pe = 0,
        ye = 0,
        me = 0,
        we = 0,
        be = 0,
        Ie = 0,
        Pe = !1,
        ve = !1,
        Me, Ae, xe = 0,
        ke = 0;
    skins = {};
    var Te = !1,
        Se = !1,
        Ue = !1,
        Ee = !1,
        De = !1;
    if (window.localStorage) {
        Te = 0 < window.localStorage.getItem("options_noImages") + 0;
        document.getElementById("options_noImages").checked = Te;
        Se = 0 < window.localStorage.getItem("options_noNames") + 0;
        document.getElementById("options_noNames").checked = Se;
        Ue = 0 < window.localStorage.getItem("options_lowGraphics") + 0;
        document.getElementById("options_lowGraphics").checked = Ue;
        Ee = 0 < window.localStorage.getItem("options_noJoystick") + 0;
        document.getElementById("options_noJoystick").checked = Ee;
        var De = 0 < window.localStorage.getItem("options_leftHanded") + 0,
            Be = document.getElementById("options_leftHanded");
        Be && (Be.checked = De)
    }
    var Ce = 0,
        _e = 0,
        Re = +new Date,
        Oe = "... fps",
        We = +new Date,
        Fe = 0,
        Le, Ge = "...",
        He = 0,
        Ye = 0,
        Ne = !1,
        ze = !1,
        Xe = !1,
        je = !1,
        Ve = +new Date,
        Je = !1,
        qe = water = 100,
        Ke = xp = xpPer = 0,
        Ze = 0,
        Qe = 0,
        $e = "",
        ta = new Za(0, 0, 100, 100, "RUN"),
        ea = new Za(0, 0, 100, 100, "W"),
        aa = new Za(0, 0, 100, 100, "CHAT"),
        ia = !1,
        na = -1,
        sa = 0,
        ra = 0,
        la = 0,
        oa = 0,
        ha = 50,
        da = 0,
        ca = 0,
        fa = 0;
    joystickDistF_n = joystickDistF = 0;
    var ga = 100,
        ua = Array(50).fill(0),
        pa = Array(50).fill(0),
        ya = Array(50).fill(0),
        ma = Array(50).fill(0),
        wa = !1,
        ba = [],
        Ia = {},
        Pa = [],
        va = +Date.now(),
        Ma;
    Yi();
    Vi();
    if (I) {
        console.log("Party link detected! Verifying...");
        for (var P = Oa(P), Aa = !1, xa = 0; xa < r.length; xa++) if (r[xa].ip == P && 5 < P.length) {
            var A = xa,
                x = r[A],
                ka = document.getElementById("spawnXpLabel");
            ka.style.display = "block";
            ka.style.opacity = 1;
            ka.textContent = "Joining party server...";
            I = Aa = !0;
            break
        }
        Aa ? (console.log("Connecting to party server..."), ni(), li(), ri()) : (alert("This party link is no longer valid! Joining auto server..."), P = null, I = !1, D())
    } else D();

    function Ta() {
        masterWs = new WebSocket("ws://" + i + ":7500");
        masterWs.binaryType = "arraybuffer";
        masterWs.onopen = function () {
            var t = new ei(1);
            t.writeUInt8(200);
            masterWs.send(t.dataView.buffer)
        };
        masterWs.onmessage = function (t) {
            t = new ti(new DataView(t.data));
            if (100 == t.readUInt8()) {
                var e = t.readUInt32();
                Ge = qa(e) + " players";
                for (var e = t.readUInt16(), a = 0; a < e; a++) for (var i = Oa(t.readUInt32()), n = t.readUInt16(), s = 0; s < r.length; s++) if (r[s].ip == i) {
                    r[s].playersCount = 6e4 == n ? -1 : n;
                    break
                }
            }
            li()
        };
        masterWs.onerror = function (t) {
            console.log("MasterServer: error connecting!")
        };
        masterWs.onclose = function (t) {}
    }
    Ta();
    var Sa = !! navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
        Ua = -1 < navigator.userAgent.toLowerCase().indexOf("android");
    if ((Sa || Ua) && !y) {
        var Ea = !1;
        if (window.localStorage) {
            Ea = 0 < window.localStorage.getItem("oldVisitor");
            try {
                window.localStorage.setItem("oldVisitor", 1)
            } catch (t) {
                Ea = !0
            }
        }
        Ea || (Sa ? window.location.href = "https://itunes.apple.com/us/app/mope.io/id1086471119?ls=1&mt=8" : Ua && (window.location.href = "https://play.google.com/store/apps/details?id=tatarnykov.stan.mopeioandroid"))
    }
    var Da = "ontouchstart" in window || navigator.maxTouchPoints;
    Da && console.log("mobile touch device detected!");

    function Ba(t, e) {
        return Math.random() * (e - t) + t
    }
    function Ca(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    }
    function _a(t) {
        t = Math.trunc(t) % 360 + (t - Math.trunc(t));
        return 0 < t ? t : t + 360
    }
    function Ra(t) {
        t = t.split(".");
        return 256 * (256 * (256 * +t[0] + +t[1]) + +t[2]) + +t[3]
    }
    function Oa(t) {
        for (var e = t % 256, a = 3; 0 < a; a--) t = Math.floor(t / 256),
        e = t % 256 + "." + e;
        return e
    }
    function Wa(t, e) {
        var a = e.split("?")[0],
            i, n;
        i = -1 !== e.indexOf("?") ? e.split("?")[1] : "";
        if ("" !== i) {
            n = i.split("&");
            for (var s = n.length - 1; 0 <= s; --s) i = n[s].split("=")[0],
            i === t && n.splice(s, 1);
            a = a + "?" + n.join("&")
        }
        return a
    }
    function Fa(t) {
        return 180 / Math.PI * t
    }
    function La(t) {
        return Math.PI / 180 * t
    }
    function Ga(t, e, a, i) {
        return Math.atan2(i - e, a - t)
    }
    function Ha(t, e) {
        return 0 != (t >> e) % 2
    }
    function Ya(t, e, a) {
        return a ? t | 1 << e : t & ~ (1 << e)
    }
    function Na(t, e) {
        var a = _a(Fa(e - t));
        180 < a && (a -= 360);
        return La(a)
    }
    function za(t, e, a) {
        return Math.min(a, Math.max(e, t))
    }
    function Xa(t) {
        return unescape(encodeURIComponent(t))
    }
    function ja(t) {
        return decodeURIComponent(escape(t))
    }
    function Va(t, e, a) {
        var i = 1.2 * oe.measureText("M").width;
        t = t.split("\n");
        for (var n = 0; n < t.length; ++n) oe.fillText(t[n], e, a),
        a += i
    }
    function Ja(t) {
        var e = parseInt(t, 10),
            a = Math.floor(e / 3600);
        t = Math.floor((e - 3600 * a) / 60);
        e = e - 3600 * a - 60 * t;
        10 > e && (e = "0" + e);
        return t + ":" + e
    }
    function qa(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    function Ka(t) {
        return 1e3 > t ? t : Math.round(t / 1e3 * 10) / 10 + "k"
    }
    function Za(t, e, a, i, n) {
        this.x = t;
        this.y = e;
        this.w = a;
        this.h = i;
        this.text = n;
        this.pressed = !1;
        this.pressedTouchID = -1;
        this.testPosHitsButton = function (t, e) {
            return t < this.x - this.w / 2 || t > this.x + this.w / 2 ? !1 : e < this.y - this.w / 2 || e > this.y + this.w / 2 ? !1 : !0
        };
        this.draw = function () {
            oe.save();
            oe.globalAlpha = .2;
            oe.fillStyle = this.pressed ? "white" : "#000000";
            oe.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
            oe.globalAlpha = 1;
            oe.fillStyle = "#000000";
            this.text && (oe.globalAlpha = .2, oe.lineWidth = 1, oe.textAlign = "center", oe.textBaseline = "middle", Ue ? (oe.shadowOffsetX = 0, oe.shadowOffsetY = 0) : (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1), oe.fillStyle = "white", oe.font = 15 * de + "px Arial", oe.fillText(this.text, this.x, this.y));
            oe.restore()
        }
    }
    Qa.prototype = {
        id: 0,
        oType: Lt,
        spawnTime: 0,
        rPer: 0,
        updateTime: 0,
        x: 0,
        y: 0,
        ox: 0,
        oy: 0,
        nx: 0,
        ny: 0,
        rad: 0,
        oRad: 0,
        nRad: 0,
        z: 0,
        name: "",
        dead: !1,
        type: 0
    };

    function Qa(t, e, a, i, n) {
        this.id = t;
        this.oType = e;
        this.ox = this.x = this.nx = a;
        this.oy = this.y = this.ny = i;
        this.nRad = n;
        this.oRad = this.rad = 0;
        if (e == zt || e == Vt || e == ae || e == ne || e == ie) this.oRad = this.rad = n;
        this.angle = this.oAngle = this.angledelta = 0;
        this.rPer = Ba(0, 1);
        this.updateTime = this.spawnTime = ci;
        this.flag_hurt = !1;
        this.hpPer = this.hpPer_n = this.hpBarA = this.hpBarA_n = 0;
        this.oType == Rt && (this.flag_invincible = this.flag_usingAbility = this.flag_stunned = this.flag_underWater = this.flag_tailBitten = this.flag_lowWat = !1, this.nameA = this.stunA = this.underwaterA = 0);
        if (this.oType == Rt || this.oType == Yt || this.oType == ee || this.oType == jt) this.chatLines = [];
        this.updateZ = function () {
            switch (this.oType) {
            case Qt:
                this.z = -160;
                break;
            case Vt:
                this.z = -159;
                break;
            case ae:
                this.z = -152;
                break;
            case ne:
                this.z = -152;
                break;
            case ie:
                this.z = -151;
                break;
            case ee:
                this.z = -150;
                break;
            case zt:
                this.z = -149;
                break;
            case qt:
                this.z = -102;
                break;
            case jt:
                this.z = -101;
                break;
            case Yt:
                this.z = -100;
                break;
            case Ot:
                this.z = 999;
                break;
            case Ft:
            case te:
                this.z = 1001;
                break;
            case Wt:
                this.z = 1002;
                break;
            case Xt:
                this.z = 1003;
                break;
            case Nt:
                this.z = 1e4;
                break;
            default:
                this.z = this.flag_underWater || this.flag_usingAbility && this.type == ft ? -140 : this.type == It ? 1004 : this.type == yt || this.type == wt ? 1e3 : this.rad
            }
        };
        this.draw = function () {
            var t = this.moveUpdate();
            oe.save();
            oe.translate(this.x, this.y);
            if (!Ue && (this.oType == Lt || this.oType == $t || this.oType == Gt || this.oType == Ht || this.oType == Kt || this.oType == Jt || this.oType == Yt || this.oType == ee || this.oType == jt)) {
                var a;
                a = (ci - this.spawnTime) / 1e3;
                var i = this.oType == Ht || this.oType == Kt || this.oType == Jt ? 2 : 1.3,
                    n = .1;
                if (this.oType == Yt || this.oType == jt || this.oType == ee) i = 2.5,
                n = .04;
                a = n * Math.sin(2 * Math.PI / i * a);
                oe.scale(1 + a, 1 + a / 2)
            }
            i = this.getOutlineColor();
            n = 2;
            this.dead ? oe.globalAlpha *= 1 - t : e != Qt && (oe.globalAlpha *= Math.min(1, (ci - this.spawnTime) / (1e3 * J)));
            if (this.oType == Ot) this.drawOutlinedCircle("", K);
            else if (this.oType == Ft) this.drawOutlinedCircle("", et);
            else if (this.oType == te) this.drawOutlinedCircle("", it);
            else if (this.oType == Wt) this.drawOutlinedCircle("", $);
            else if (this.oType == Lt) this.drawOutlinedCircle("", tt);
            else if (this.oType == $t) this.drawOutlinedCircle("", at),
            oe.rotate(this.rPer * Math.PI * 2),
            $a(.25 * this.rad, .4 * this.rad, (.3 + .15 * this.rPer) * this.rad, "#905113");
            else if (this.oType == Ht || this.oType == Kt) n = 2,
            a = this.oType == Kt ? 15 : 9,
            this.isGreenOutlined() && (n = 3, oe.fillStyle = i, oe.beginPath(), oe.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n), oe.fill(), oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad + 2), Math.PI, 2 * Math.PI), oe.fillStyle = i, oe.fill(), n = 1),
            oe.fillStyle = K,
            oe.beginPath(),
            oe.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            oe.fill(),
            oe.fillStyle = "#FFCA49",
            oe.beginPath(),
            oe.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
            oe.fill(),
            Ue || (oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI), oe.fillStyle = K, oe.fill()),
            oe.beginPath(),
            oe.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI),
            oe.fillStyle = this.oType == Kt ? "#B8413B" : "#CFAD59",
            oe.fill();
            else if (this.oType == Zt) n = 2,
            oe.save(),
            a = (ci - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 2 * a),
            oe.fillStyle = "#45D157",
            oe.globalAlpha = .93,
            oe.beginPath(),
            oe.arc(.5 * -this.rad, .5 * -this.rad + 10 * this.rPer, Math.max(0, .55 * this.rad + a), 0, 2 * Math.PI),
            oe.fill(),
            oe.beginPath(),
            oe.arc(.5 * this.rad, .5 * -this.rad - 10 * this.rPer, Math.max(0, .43 * this.rad - a), 0, 2 * Math.PI),
            oe.fill(),
            oe.beginPath(),
            oe.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .48 * this.rad + a), 0, 2 * Math.PI),
            oe.fill(),
            oe.beginPath(),
            oe.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .4 * this.rad + this.rPer - a), 0, 2 * Math.PI),
            oe.fill(),
            oe.restore(),
            a = 20,
            oe.fillStyle = i,
            oe.beginPath(),
            oe.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            oe.fill(),
            oe.fillStyle = "#FFCA49",
            oe.beginPath(),
            oe.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
            oe.fill(),
            oe.beginPath(),
            oe.arc(0, 0, Math.max(0, .8 * this.rad), Math.PI, 2 * Math.PI),
            oe.fillStyle = i,
            oe.fill(),
            oe.beginPath(),
            oe.arc(0, 0, Math.max(0, .8 * this.rad - n), Math.PI, 2 * Math.PI),
            oe.fillStyle = "#B8413B",
            oe.fill();
            else if (this.oType == Jt) oe.fillStyle = i,
            a = 6.28 * this.rPer,
            oe.beginPath(),
            oe.arc(0, 0, this.rad + 2, 0 + a, a + 2 * Math.PI - 1.57),
            oe.fill(),
            oe.fillStyle = "#3DAA4C",
            oe.beginPath(),
            oe.arc(0, 0, this.rad, 0 + a, a + 2 * Math.PI - 1.57),
            oe.fill();
            else if (this.oType == Yt) this.drawOutlinedCircle("", "#9F8641"),
            $a(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35"),
            $a(0 + this.rPer, 1, Math.max(0, this.rad - 12), "#5C4E28");
            else if (this.oType == ae) oe.save(),
            t = oe.globalAlpha,
            oe.globalAlpha = .5 * t,
            $a(0, 0, this.rad, "#62C5FF"),
            oe.globalAlpha = 1 * t,
            oe.strokeStyle = "#62C5FF",
            oe.beginPath(),
            a = -.7 * this.rad,
            oe.moveTo(a, -5),
            oe.lineTo(a - 4, 5),
            oe.lineTo(a + 4, 2),
            oe.lineTo(a + 2, 15),
            oe.lineWidth = 3,
            oe.stroke(),
            oe.restore();
            else if (this.oType == ne) {
                oe.save();
                t = oe.globalAlpha;
                oe.globalAlpha = .5 * t;
                var s = Math.max(0, this.rad - 30);
                a = (ci - this.spawnTime) / 1e3;
                var i = 2.2,
                    r = 6.5 * Math.cos(2 * Math.PI / i * a);
                a = 6.5 * Math.sin(2 * Math.PI / i * a);
                oe.globalAlpha = .4 * t;
                $a(0, 0, s, "#2CAAC4");
                oe.globalAlpha = .7 * t;
                Ue || $a(0 + r / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, s - 6), "#2D93B0");
                $a(0 + r / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, s - 14), "#29A0BA");
                $a(0 + r / 1.5 - 2 * this.rPer, a, Math.max(0, s - 38.5 + a / 5), "#2B8CAA");
                $a(0 + r / 1.5 - 2 * this.rPer, a, Math.max(0, s - 54.5 + a / 11), "#28829E");
                oe.restore()
            } else this.oType == ie ? (oe.save(), t = oe.globalAlpha, Ue || oe.rotate(2 * this.rPer * Math.PI), a = (ci - this.spawnTime) / 1e3, a = 1.5 * Math.sin(2 * Math.PI / 6 * a), oe.globalAlpha = .7 * t, n = 4, oe.fillStyle = "black", oe.beginPath(), oe.arc(0, 0, this.rad, 0, 2 * Math.PI), oe.fill(), Ue || (oe.fillStyle = "black", oe.globalAlpha = .5 * t, oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.beginPath(), oe.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.beginPath(), oe.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI), oe.fill(), oe.beginPath()), oe.restore()) : this.oType == ee ? (a = (ci - this.spawnTime) / 1e3, i = 1.2, r = 2.5 * Math.cos(2 * Math.PI / i * a), a = 2.5 * Math.sin(2 * Math.PI / i * a), this.drawOutlinedCircle("", "#2CAAC4"), Ue || $a(0 + r / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, this.rad - 6), "#2D93B0"), $a(0 + r / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, this.rad - 14), "#29A0BA"), $a(0 + r / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 18.5 + a / 5), "#2B8CAA"), $a(0 + r / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 24.5 + a / 11), "#28829E")) : this.oType == jt ? (this.drawOutlinedCircle("", "#9F8641"), Ue || $a(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35"), $a(0 + this.rPer, 1, Math.max(0, this.rad - 14), "#5C4E28"), $a(0 - 2 * this.rPer - 3, 1, Math.max(0, this.rad - 18.5), "#40371D")) : this.oType == Nt ? (oe.save(), a = (ci - this.spawnTime) / 1e3, a = 1.5 * Math.sin(2 * Math.PI / 2 * a), oe.fillStyle = "#45D157", oe.globalAlpha = .93, oe.beginPath(), oe.arc(.5 * -this.rad, .5 * -this.rad + 10 * this.rPer, Math.max(0, .65 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.5 * this.rad, .5 * -this.rad - 10 * this.rPer, Math.max(0, .73 * this.rad - a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .78 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .6 * this.rad + this.rPer - a), 0, 2 * Math.PI), oe.fill(), oe.restore()) : this.oType == zt ? (oe.save(), Ue || oe.rotate(2 * this.rPer * Math.PI), a = (ci - this.spawnTime) / 1e3, a = 1.5 * Math.sin(2 * Math.PI / 6 * a), oe.globalAlpha = 1, n = 4, oe.fillStyle = "#8B7833", oe.beginPath(), oe.arc(0, 0, this.rad, 0, 2 * Math.PI), oe.fill(), Ue || (oe.fillStyle = "#98803A", oe.globalAlpha = 1, oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.beginPath(), oe.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.beginPath(), oe.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI), oe.fill(), oe.beginPath()), oe.restore()) : this.oType == Vt ? (oe.save(), Ue || oe.rotate(2 * this.rPer * Math.PI), a = (ci - this.spawnTime) / 1e3, a = 5.5 * Math.sin(2 * Math.PI / 4 * a), oe.globalAlpha = 1, n = 4, oe.fillStyle = "#c8b745", oe.beginPath(), oe.arc(0, 0, this.rad, 0, 2 * Math.PI), oe.fill(), oe.fillStyle = $, oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI), oe.fill(), Ue || (oe.beginPath(), oe.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI), oe.fill()), oe.restore()) : this.oType == Qt ? (a = (ci - this.spawnTime) / 1e3, a = 8.5 * Math.sin(2 * Math.PI / 5 * a), 1 == this.oceanNum ? (oe.fillStyle = "#c8b745", oe.fillRect(-this.oceanW / 2 - 10, -this.oceanH / 2, 30, this.oceanH), oe.fillStyle = "#1898bd", oe.fillRect(-this.oceanW / 2 + a, -this.oceanH / 2, this.oceanW - a, this.oceanH)) : (oe.fillStyle = "#c8b745", oe.fillRect(this.oceanW / 2 - 10 - 10, -this.oceanH / 2, 20, this.oceanH), oe.fillStyle = "#1898bd", oe.fillRect(-this.oceanW / 2, -this.oceanH / 2, this.oceanW - 10 + a, this.oceanH))) : this.oType == Xt ? this.drawOutlinedCircle("", rt) : this.oType == qt ? (oe.fillStyle = "#C8B745", oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad), 0, 2 * Math.PI), oe.fill(), oe.fillStyle = "#E4D04C", oe.beginPath(), oe.arc(-5 + 10 * this.rPer, -5 + 10 * this.rPer, .8 * this.rad, 0, 2 * Math.PI), oe.fill()) : this.oType == Gt ? this.drawOutlinedCircle("", Q) : this.oType == Rt ? this.drawAnimal(t) : this.drawOutlinedCircle("????", "black");
            this.flag_hurt && (oe.fillStyle = "rgba(255,0,0,0.3)", oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad - n), 0, 2 * Math.PI), oe.fill());
            this.hpBarA += .04 * (this.hpBarA_n - this.hpBarA);.001 < this.hpBarA && (this.hpPer += .1 * (this.hpPer_n - this.hpPer), i = Math.max(1, this.rad / 25), n = 20 * i, a = 5 * i, i = -this.rad - 10 * i, oe.globalAlpha *= this.hpBarA, oe.fillStyle = "rgba(0,0,0,0.35)", oe.fillRect(0 - n / 2, i - a / 2, n, a), oe.fillStyle = "#16D729", oe.fillRect(0 - n / 2, i - a / 2, this.hpPer / 100 * n, a));
            oe.restore()
        };
        this.drawChat = function () {
            if (!(1 > this.chatLines.length)) {
                oe.save();
                oe.font = "10px Arial";
                oe.lineWidth = 1;
                oe.textAlign = "center";
                oe.textBaseline = "middle";
                for (var t = [], e = this.chatLines.length - 1; 0 <= e; e--) {
                    var a = this.chatLines[e],
                        i = -13 * (this.chatLines.length - 1 - e),
                        n = ci > a.chatFadeT ? 0 : 1;
                    a.chatA += .1 * (n - a.chatA);
                    oe.shadowOffsetX = 0;
                    oe.shadowOffsetY = 0;.02 > a.chatA ? (.02 > n && (a.chatTxt = ""), t.push(e)) : (n = oe.measureText(a.chatTxt).width, oe.globalAlpha = .8 * a.chatA, oe.fillStyle = K, oe.fillRect(this.x - 1 - n / 2, i + this.y - this.rad - 10 - 5 - 1, n + 2, 12), oe.fillStyle = "#F1C34C", Ue || (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1, oe.shadowColor = "black"), oe.globalAlpha = a.chatA, oe.fillText(a.chatTxt, this.x, i + this.y - this.rad - 10))
                }
                for (e = 0; e < t.length; e++) this.chatLines.splice(t[e], 1);
                oe.restore()
            }
        };
        this.getOutlineColor = function () {
            return this.isGreenOutlined() ? "#4AE05E" : K
        };
        this.isGreenOutlined = function () {
            return this.oType == Rt ? 0 < pa[this.type - 1] : 0 < ma[this.oType - 1]
        };
        this.gotChat = function (t) {
            this.chatLines.push({
                chatTxt: t,
                chatFadeT: ci + 4e3,
                chatA: 0
            });
            5 < this.chatLines.length && this.chatLines.splice(this.chatLines.length - 1, 1)
        };
        this.drawOutlinedCircle = function (t, e) {
            var a = this.getOutlineColor();
            Ue && a == K || $a(0, 0, this.rad, a);
            $a(0, 0, Math.max(0, this.rad - 1.5), e)
        };
        this.drawAnimal = function (t) {
            var e, a = "",
                i = .08 * this.rad;
            switch (this.type) {
            case lt:
                e = "#9BA9B9";
                a = "mouse";
                break;
            case ot:
                e = "#AA937E";
                a = "rabbit";
                break;
            case ht:
                e = "#DD6BD4";
                a = "pig";
                break;
            case dt:
                e = "#FF9D43";
                a = "fox";
                break;
            case ct:
                e = "#C4773E";
                a = "deer";
                break;
            case ut:
                e = "#f8c923";
                a = "lion";
                break;
            case pt:
                e = "#CAC05B";
                a = "cheetah";
                break;
            case gt:
                e = "#FFFFFF";
                a = "zebra";
                break;
            case yt:
                e = "#99591C";
                a = "bear";
                break;
            case mt:
                e = "#30F51C";
                i = .16 * this.rad;
                a = "croc";
                break;
            case wt:
                e = "#94a3a9";
                a = "rhino";
                break;
            case bt:
                e = "#945A99";
                a = "hippo";
                break;
            case ft:
                e = "#4C4A45";
                a = "mole";
                break;
            case It:
                e = "#22FF8A";
                i = .16 * this.rad;
                a = "dragon";
                break;
            case Pt:
                e = "#f88e37";
                a = "shrimp";
                break;
            case vt:
                e = "#ac8686";
                a = "trout";
                break;
            case Mt:
                e = "#bf2408";
                a = this.flag_usingAbility ? "crab2" : "crab";
                break;
            case At:
                e = "#40dda4";
                a = "squid";
                break;
            case xt:
                e = "#999fc6";
                a = "shark";
                break;
            case kt:
                e = "#164336";
                a = "stingray";
                break;
            case Tt:
                e = "#502E1A";
                a = this.flag_usingAbility ? "turtle2" : "turtle";
                break;
            case St:
                e = "#73BE2F";
                a = "seahorse";
                break;
            case Ut:
                e = "#FDB9BA";
                a = "jellyfish";
                break;
            case Et:
                e = "#64a034";
                a = "kraken";
                break;
            case Dt:
                e = "#6C5C2C";
                a = this.flag_usingAbility ? "pufferfish2" : "pufferfish";
                break;
            case Bt:
                e = "#141414";
                a = "killerwhale";
                break;
            case Ct:
                e = "#689CD7";
                a = this.flag_usingAbility ? "swordfish2" : "swordfish";
                break;
            default:
                e = "#000000"
            }
            oe.save();
            oe.rotate(this.angle);
            var n, s = (ci - this.spawnTime) / 1e3;
            n = .7 * Math.sin(2 * Math.PI / 2.5 * s);
            var r = this.flag_underWater || this.flag_usingAbility && this.type == ft ? 0 : 1;
            this.underwaterA += .1 * (r - this.underwaterA);
            oe.globalAlpha *= this.underwaterA;
            if (this.flag_invincible) {
                var r = .3,
                    l = .5 * (1 - r);
                oe.globalAlpha *= r + l + l * Math.sin(2 * Math.PI / 1 * ((ci - this.spawnTime) / 1e3))
            }
            this.nameA += .1 * ((this.flag_underWater || this.flag_usingAbility && this.type == ft ? 0 : 1) - this.nameA);
            r = 2 + n;
            l = 0 < ua[this.type - 1] ? "#EF3C31" : 0 < pa[this.type - 1] ? "#4AE05E" : K;
            Ue && l == K ? r = 0 : $a(0, 0, this.rad, l);
            n = null;
            a && !Te && (skins.hasOwnProperty(a) || (skins[a] = new Image, skins[a].src = "./skins/" + a + ".png"), n = 0 != skins[a].width && skins[a].complete ? skins[a] : null);
            n || (oe.fillStyle = e, oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad - r), 0, 2 * Math.PI), oe.fill());
            if (this.type != ot && this.type != lt && this.type != Mt) {
                var s = (ci - this.spawnTime) / 1e3,
                    a = 4 * Math.sin(2 * Math.PI / 5 * s),
                    s = 2.5 * r,
                    o = Math.PI / 180;
                oe.fillStyle = this.flag_tailBitten ? "#EF3C31" : 0 < ya[this.type - 1] && this.id != Ye ? "#4AE05E" : l;
                Ue && oe.fillStyle != K || (oe.beginPath(), oe.moveTo((this.rad - r + 1) * Math.cos((282.5 + s) * o), (this.rad - r + 1) * Math.sin(282.5 * o)), oe.lineTo((this.rad - r + 1) * Math.cos((257.5 - s) * o), (this.rad - r + 1) * Math.sin(257.5 * o)), oe.lineTo((this.rad + i + r) * Math.cos((270 + a) * o), (this.rad + i + r) * Math.sin((270 + a) * o)), oe.lineTo((this.rad - r + 1) * Math.cos((282.5 + s) * o), (this.rad - r + 1) * Math.sin(282.5 * o)), oe.fill());
                Ue || n && !this.flag_tailBitten || (oe.fillStyle = this.flag_tailBitten ? "#EF3C31" : e, oe.beginPath(), oe.moveTo((this.rad - r) * Math.cos(282.5 * o), (this.rad - r) * Math.sin(282.5 * o)), oe.lineTo((this.rad - r) * Math.cos(257.5 * o), (this.rad - r) * Math.sin(257.5 * o)), oe.lineTo((this.rad + i) * Math.cos((270 + a) * o), (this.rad + i) * Math.sin((270 + a) * o)), oe.lineTo((this.rad - r) * Math.cos(282.5 * o), (this.rad - r) * Math.sin(282.5 * o)), oe.fill())
            }
            null != n && (i = 500 / 340, e = this.rad - r, oe.drawImage(n, -e * i, -e * i, 2 * e * i, 2 * e * i));
            this.flag_hurt && (oe.fillStyle = "rgba(255,0,0,0.3)", oe.beginPath(), oe.arc(0, 0, Math.max(0, this.rad - r), 0, 2 * Math.PI), oe.fill());
            this.type == wt && (oe.fillStyle = "#E5CF79", oe.beginPath(), e = this.rad - r, i = 1 * e, oe.moveTo(-.16 * e, i), oe.lineTo(0, e * (this.flag_usingAbility ? 1.41 : .7)), oe.lineTo(.153 * e, i), oe.closePath(), oe.fill());
            n || (this.type == bt ? (oe.beginPath(), oe.arc(.2 * this.rad, .7 * this.rad, Math.max(0, .55 * this.rad - r), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.2 * -this.rad, .7 * this.rad, Math.max(0, .55 * this.rad - r), 0, 2 * Math.PI), oe.fill(), oe.fillStyle = "#8C96A6", oe.beginPath(), oe.arc(-(.29 * this.rad), .7 * this.rad + 10, Math.max(0, 3 - r / 2), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.29 * this.rad, .7 * this.rad + 10, Math.max(0, 3 - r / 2), 0, 2 * Math.PI), oe.fill()) : this.type == pt ? (oe.fillStyle = "#B5AE4C", oe.beginPath(), oe.arc(.1 * this.rad, -.45 * this.rad, .13 * this.rad, 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(-.4 * this.rad, -.2 * this.rad, .12 * this.rad, 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.15 * this.rad, -.25 * this.rad, .16 * this.rad, 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.63 * this.rad, -.4 * this.rad, .1 * this.rad, 0, 2 * Math.PI), oe.fill()) : this.type == gt ? (oe.fillStyle = "#000000", e = Math.max(0, this.rad - r), r = 0, oe.beginPath(), oe.moveTo(1 * -e, 0 + r), oe.lineTo(0, .2 * -e + r), oe.lineTo(1 * e, 0 + r), oe.lineTo(0, .1 * e + r), oe.closePath(), oe.fill(), r -= .3 * this.rad, oe.beginPath(), oe.moveTo(.8 * -e, 0 + r), oe.lineTo(0, .2 * -e + r), oe.lineTo(.8 * e, 0 + r), oe.lineTo(0, .1 * e + r), oe.closePath(), oe.fill(), r -= .3 * this.rad, oe.beginPath(), oe.moveTo(.7 * -e, 0 + r), oe.lineTo(0, .1 * -e + r), oe.lineTo(.7 * e, 0 + r), oe.lineTo(0, .1 * e + r), oe.closePath(), oe.fill()) : this.type == ct ? (oe.fillStyle = "#E5C870", oe.beginPath(), r = .35 * -this.rad, i = .1 * -this.rad, oe.moveTo(r, i), oe.lineTo(r + .25 * this.rad, i), oe.lineTo(r - .35 * this.rad, i - 15), oe.fill(), oe.beginPath(), r = .35 * this.rad, i = .1 * -this.rad, oe.moveTo(r, i), oe.lineTo(r - .25 * this.rad, i), oe.lineTo(r + .35 * this.rad, i - 15), oe.fill()) : this.type == yt ? (oe.fillStyle = "black", oe.beginPath(), oe.arc(0, this.rad - 3, Math.max(0, 5 - r / 2), 0, 2 * Math.PI), oe.fill()) : this.type == ft && (oe.fillStyle = "#FA2E8D", oe.beginPath(), oe.arc(0, this.rad - 3, Math.max(0, 4 - r / 2), 0, 2 * Math.PI), oe.fill(), e = Math.max(0, this.rad + 2.5 - r), oe.fillStyle = "#F64455", oe.beginPath(), i = .707 * -e, a = .707 * e, oe.arc(i, a, Math.max(0, 5 - r / 2), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(i + 2, a + 2, Math.max(0, 4 - r / 2), 0, 2 * Math.PI), oe.fill(), i = .707 * e, a = .707 * e, oe.arc(i, a, Math.max(0, 5 - r / 2), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(i - 2, a + 2, Math.max(0, 4 - r / 2), 0, 2 * Math.PI), oe.fill()));
            n || (oe.save(), n = Math.max(1, this.rad / 25), oe.scale(n, n), this.drawEyeAtPos(6, .32 * this.rad), this.drawEyeAtPos(-6, .32 * this.rad), oe.restore());
            if (this.flag_underWater || this.flag_usingAbility && this.type == ft) oe.save(),
            oe.globalAlpha = 1 - this.underwaterA,
            s = (ci - this.spawnTime) / 1e3,
            r = 1 * Math.sin(2 * Math.PI / 1.5 * s),
            this.flag_underWater && (oe.globalAlpha *= .65),
            oe.fillStyle = this.flag_underWater ? "#4E71C3" : "#7E6A35",
            n = this.flag_underWater ? .15 * this.rad : .1 * this.rad,
            oe.beginPath(),
            oe.arc(-.35 * this.rad, -.33 * this.rad, Math.max(0, n + r), 0, 2 * Math.PI),
            oe.fill(),
            oe.beginPath(),
            oe.arc(.35 * this.rad, -.32 * this.rad, Math.max(0, n - r), 0, 2 * Math.PI),
            oe.fill(),
            oe.beginPath(),
            oe.arc(.35 * this.rad, .36 * this.rad, Math.max(0, n + r), 0, 2 * Math.PI),
            oe.fill(),
            oe.beginPath(),
            oe.arc(-.35 * this.rad, .35 * this.rad, Math.max(0, n - r), 0, 2 * Math.PI),
            oe.fill(),
            this.type == xt ? (oe.globalAlpha = 1 - this.underwaterA, oe.fillStyle = "#73799b", oe.beginPath(), e = this.rad, i = .25 * e, oe.moveTo(-.07 * e, i), oe.lineTo(0, i - .5 * e), oe.lineTo(.35 * e, i), oe.closePath(), oe.fill()) : this.type == Et && (oe.globalAlpha = 1 - this.underwaterA, $a(.4 * this.rad, .75 * this.rad, .12 * this.rad, "#598b30"), $a(.65 * this.rad, .55 * this.rad, .1 * this.rad, "#64a034"), $a(-.4 * this.rad, .75 * this.rad, .12 * this.rad, "#64a034"), $a(-.65 * this.rad, .55 * this.rad, .1 * this.rad, "#598b30")),
            oe.restore();
            oe.restore();
            r = this.flag_stunned ? 1 : 0;
            this.stunA += .1 * (r - this.stunA);.01 < this.stunA && (oe.save(), oe.rotate(ci % 2500 / 2500 * 2 * Math.PI), oe.globalAlpha = this.stunA, n = .2 * this.rad, s = (ci - this.spawnTime) / 1e3, r = (.5 + .07 * n) * Math.sin(2 * Math.PI / 1 * s), oe.fillStyle = "#F3D444", oe.beginPath(), oe.arc(-.22 * this.rad, -.22 * this.rad, Math.max(0, n + r), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.22 * this.rad, -.22 * this.rad, Math.max(0, n - r), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(.22 * this.rad, .22 * this.rad, Math.max(0, n + r), 0, 2 * Math.PI), oe.fill(), oe.beginPath(), oe.arc(-.22 * this.rad, .22 * this.rad, Math.max(0, n - r), 0, 2 * Math.PI), oe.fill(), oe.restore());
            this.flag_lowWat && (r = .2, l = .5 * (.8 - r), n = r + l + l * Math.sin(2 * Math.PI / 1.2 * (ci / 1e3)), oe.save(), oe.globalAlpha = n, oe.fillStyle = Q, oe.beginPath(), oe.arc(0, this.rad + 5, 5, 0, 2 * Math.PI), oe.fill(), oe.restore());
            oe.save();
            oe.textAlign = "center";
            oe.textBaseline = "middle";
            Ue || (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1, oe.shadowColor = "black");
            oe.fillStyle = "white";
            oe.globalAlpha = this.dead ? oe.globalAlpha * (1 - t) : 1;
            oe.globalAlpha *= this.nameA;
            yOffset = this.rad + 9;
            this.name && !Se && (oe.font = "10px Arial", oe.fillText(this.name, 0, 0 + yOffset), yOffset += 12);
            oe.restore()
        };
        this.drawEyeAtPos = function (t, e) {
            oe.beginPath();
            oe.arc(t, e, 4.5, 0, 2 * Math.PI);
            oe.fillStyle = "black";
            oe.fill();
            oe.beginPath();
            oe.fillStyle = "white";
            oe.arc(t - 2, e - 1, .99, 0, 2 * Math.PI);
            oe.fill()
        };
        this.moveUpdate = function () {
            var t = (ci - this.updateTime) / 1e3 / J,
                t = 0 > t ? 0 : 1 < t ? 1 : t;
            this.dead && 1 <= t && Pa.push(this);
            this.x = t * (this.nx - this.ox) + this.ox;
            this.y = t * (this.ny - this.oy) + this.oy;
            this.rad += .1 * (this.nRad - this.rad);
            if (this.oType == Rt) {
                var e = .1 * this.angleDelta;
                this.angleDelta -= e;
                this.angle += e
            }
            return Math.min(1, t)
        }
    }
    function $a(t, e, a, i) {
        oe.fillStyle = i;
        oe.beginPath();
        oe.arc(t, e, a, 0, 2 * Math.PI);
        oe.fill()
    }
    function ti(t) {
        this.data = t;
        this.offset = 0;
        this.readUInt8 = function () {
            var t = this.data.getUint8(this.offset);
            this.offset += 1;
            return t
        };
        this.readUInt16 = function () {
            try {
                var t = this.data.getUint16(this.offset, !1);
                this.offset += 2;
                return t
            } catch (t) {
                return 0
            }
        };
        this.readUInt32 = function () {
            var t = this.data.getUint32(this.offset, !1);
            this.offset += 4;
            return t
        };
        this.readString = function () {
            for (var t = this.readUInt16(), e = "", a, i = 0; i < t; i++) a = this.readUInt8(),
            i != t - 1 && (e += String.fromCharCode(a));
            return ja(e)
        }
    }
    function ei(t) {
        this.len = 0;
        this.dataView = new DataView(new ArrayBuffer(t));
        this.writeUInt8 = function (t) {
            this.dataView.setUint8(this.len, t);
            this.len += 1
        };
        this.writeUInt16 = function (t) {
            this.dataView.setUint16(this.len, t, !1);
            this.len += 2
        };
        this.writeInt16 = function (t) {
            this.dataView.setInt16(this.len, t, !1);
            this.len += 2
        };
        this.writeUInt32 = function (t) {
            this.dataView.setUint32(this.len, t, !1);
            this.len += 4
        };
        this.writeString = function (t) {
            t = Xa(t);
            len = t.length;
            this.writeUInt16(t.length);
            for (var e = 0; e < len; e++) this.writeUInt8(t.charCodeAt(e))
        }
    }
    var ai, ii = 0;

    function ni() {
        di() && (theWs = Ma, Ma = null, theWs.close());
        1 < ii && (A += 1, A > r.length - 1 && (A = 0), x = r[A], ri());
        Je = !1;
        document.getElementById("connecting").style.visibility = "visible";
        Ri();
        console.log("Connecting to " + x.name + "...");
        Ma = new WebSocket("ws://" + x.ip + ":7020");
        Ma.binaryType = "arraybuffer";
        Ma.onopen = function () {
            ii = 0;
            document.getElementById("startMenu").style.visibility = "visible";
            document.getElementById("connecting").style.visibility = "hidden"
        };
        Ma.onmessage = function (t) {
            oi(new DataView(t.data))
        };
        Ma.onclose = function (t) {
            this == Ma && (ii += 1, ze = Ne = Xe = !1, Je || (ai = setTimeout(function () {
                ni()
            }, 2e3), document.getElementById("connecting").style.visibility = "visible"))
        };
        Ma.onerror = function () {
            console.log("socket error!")
        }
    }
    document.getElementById("serverSelect").onchange = si;

    function si() {
        A = document.getElementById("serverSelect").selectedIndex;
        x = r[A];
        ri();
        console.log("Server changed...");
        di() && Ma.close();
        I = !1;
        document.getElementById("spawnXpLabel").style.opacity = 0;
        v = P = null;
        ni()
    }
    function ri() {
        if (window.localStorage) try {
            window.localStorage.setItem("lastServerIP", x.ip)
        } catch (t) {}
        //document.getElementById("serverSelect").selectedIndex = A
    }
    function li() {
        for (var t = document.getElementById("serverSelect"); t.lastChild;) t.removeChild(t.lastChild);
        for (var e = -1, n = 1, a = 0; a < r.length; a++) {
			if(r[a].name.indexOf("Russia")!=-1){
				console.log(r[a].name)
				var i = document.createElement("option");
				i.text = "Сервер " + n + " [" + (0 > r[a].playersCount ? "..." : r[a].playersCount) + " игроков " + (r[a].playersCount >= s ? "-Сервер Полон!" : "") + "]";
				r[a].ip == x.ip && (e = a);
				t.add(i)
				n++
			}
        } - 1 == e && (e = 0);
        t.selectedIndex = e
    }
    function oi(t) {
        t = new ti(t);
        switch (t.readUInt8()) {
        case 1:
            nPlayers = t.readUInt16();
            Ge = qa(nPlayers) + " players";
            serverVer = t.readUInt16();
            serverVer > e ? setTimeout(function () {
                y || (window.onbeforeunload = null);
                console.log("Old client (ver " + e + "/" + serverVer + ")");
                alert("mope.io has been updated! Servers have restarted, Refresh needed.");
                window.location.reload()
            }, 1500) : (serverVer > e && console.log("Old server version detected!"), document.getElementById("startMenuWrapper").style.display = "block", Ci(!0));
            break;
        case 2:
            var a = t.readUInt8();
            console.log("joined a game! response " + a);
            if (1 == a) {
                Xe || (document.getElementById("startButton").style.visibility = "visible");
                spectating = 2 == t.readUInt8();
                Ne = !spectating;
                ze = spectating;
                je = Xe = !0;
                Ye = t.readUInt32();
                myRoomID = t.readUInt16();
                xe = t.readUInt16();
                ke = t.readUInt16();
                fe = o_camx = n_camx = t.readUInt16() / 4;
                camy = o_camy = n_camy = t.readUInt16() / 4;
                n_camzoom = t.readUInt16() / 1e3;
                ce = 1.5 * n_camzoom;
                spectating || mi(t);
                spectating || (document.getElementById("startMenuWrapper").style.display = "none", y || (window.onbeforeunload = function (t) {
                    return "You're alive in a game, close mope.io?"
                }));
                if (!spectating && (Y += 1, F += 1, window.localStorage)) try {
                    window.localStorage.setItem("gamesSinceAd", F)
                } catch (t) {}
                I && (t = document.getElementById("spawnXpLabel"), t.style.display = "block", t.style.opacity = 1, t.textContent = "Joined party server :)");
                Vi()
            } else if (0 == a) {
                t = document.getElementById("spawnXpLabel");
                t.style.display = "block";
                t.style.opacity = 1;
                t.textContent = "Error: this server is full!";
                I = !1;
                var i = x;
                setTimeout(function () {
                    Ne || x != i || (ii = 100, ni())
                }, 1e3)
            } else 2 == a && (t = document.getElementById("spawnXpLabel"), t.style.display = "block", t.style.opacity = 1, t.textContent = "Error: link is invalid/expired!", I = !1, t = document.location.href, t = Wa("l", t), t = Wa("s", t), window.history.pushState("", document.title, t), alert("Error, your mope.io party link is invalid/ expired! Joining auto server..."), setTimeout(function () {
                Ne || Ma.close()
            }, 2e3));
            break;
        case 8:
            var a = t.readUInt16(),
                n = t.readUInt8();
            lbData = [];
            for (xa = 0; xa < n; ++xa) lbData.push({
                rank: t.readUInt16(),
                name: t.readString(),
                score: t.readUInt32()
            });
            wi(lbData, 0, a);
            break;
        case 10:
            nPlayers = t.readUInt16();
            Ge = qa(nPlayers) + " players";
            break;
        case 18:
            var s = t.readUInt8();
            ga = t.readUInt32();
            switch (s) {
            case lt:
                Ii = "Вы маленькая мышка... \n";
                break;
            case ot:
                Ii = "Вы стали кроликом! \nПодсказка: зажмите левую кнопку мыши или пробел для ускорения (Используете много воды)";
                break;
            case ht:
                Ii = "Вы стали хрюшкой!\n Хрюшки двигаются быстрее в по грязи. (Вы можете есть грибы)";
                break;
            case dt:
                Ii = "Вы стали лисой! \n (Вы можете прятаться в красных кустах)";
                break;
            case ct:
                Ii = "Вы стали оленем!";
                break;
            case ft:
                Ii = "Вы стали кротом! \n Залезайте в любую нору, жмите W и ползите под землей.";
                break;
            case gt:
                Ii = "Вы стали зеброй!";
                break;
            case ut:
                Ii = "Выстали львом! \n Ррррр...!";
                break;
            case pt:
                Ii = "Вы стали гепардом!";
                break;
            case yt:
                Ii = "Вы стали мишкой! \n Мишка может забираться на темно-зеленые кусты! (И хорошо плавать)";
                break;
            case mt:
                Ii = "Вы стали крокодилом! \n(Крокодил может прятаться в источниках воды) + Хорошо плавает в грязи, озерах и океанах!";
                break;
            case bt:
                Ii = "Вы стали бегемотом! \nБегемоты отличные плавцы. Доминируют в озерах, океане, грязи!";
                break;
            case wt:
                Ii = "Вы сали носорогом!\n Нажмите W, чтобы нанести удар рогом";
                break;
            case Pt:
                Ii = "Вы маленькая креветка... ";
                break;
            case vt:
                Ii = "Вы стали форелью!\n Подсказка: Жмите левую кнопку мыши для ускорения. (Используете много выды!)";
                break;
            case Mt:
                Ii = "Вы стали крабом!\n Краб может выживать на суше.\n (На земле, нажмите W, чтобы спрятаться в раковину!)";
                break;
            case At:
                Ii = "Вы стали кальмаром!\n Кальмары могут стрелять чернилами (Нажмите W) /n+ вы можете прятаться в красных кустах!";
                break;
            case xt:
                Ii = "Вы стали акулой!";
                break;
            case St:
                Ii = "Вы стали морскым коньком!\n Проворный охотник!";
                break;
            case Ut:
                Ii = "Вы стали медузой!";
                break;
            case Tt:
                Ii = "Вы стали черепашкой!\n Черепашки хорошо выживают в воде и на суше!(Нажмите W на суше, чтобы спрятаться в свой панцирь)";
                break;
            case kt:
                Ii = "Вы стали морским скатом!\n Используйте электро-шок(Нажать W!), чтобы ударить животных электричеством! \n(Нужна перезарядка)";
                break;
            case Et:
                Ii = "Вы стали кракеном!\n(Нажмите W, чтобы сделать водоворот!)";
                break;
            case Dt:
                Ii = "Вы стали рыбой фугу!\n (Нажмите W, чтобы выпустить колючки!)";
                break;
            case Bt:
                Ii = "Вы стали касаткой!";
                break;
            case Ct:
                Ii = "Вы стали рыбой-мечом!\n (Нажмите W, чтобы ускориться и бить острым носом!)";
                break;
            case It:
                Ii = "Вы стали драконом! (Уау, вы удивительны!) \nДоминируйте над всеми!";
                break;
            default:
                Ii = "Улучшение!"
            }
            Pi = "white";
            vi = +new Date + 9e3;
            wa || (wa = !0, ua = Array(50).fill(0), pa = Array(50).fill(0), ya = Array(50).fill(0), ma = Array(50).fill(0));
            ua = Array(50).fill(0);
            for (var r = t.readUInt8(), a = 0; a < r; a++) ua[t.readUInt8() - 1] = 1;
            n = pa;
            pa = Array(50).fill(0);
            r = t.readUInt8();
            for (a = 0; a < r; a++) pa[t.readUInt8() - 1] = 1;
            ya = Array(50).fill(0);
            r = t.readUInt8();
            for (a = 0; a < r; a++) ya[t.readUInt8() - 1] = 1;
            var l = ma;
            ma = Array(50).fill(0);
            r = t.readUInt8();
            for (a = 0; a < r; a++) ma[t.readUInt8() - 1] = 1;
            Mi = [];
            Ui = s == lt || s == Pt;
            for (a = 0; a < pa.length; a++) 0 < pa[a] && 0 == n[a] && (t = new Qa(0, Rt, 0, 0, 35), t.type = a + 1, Mi.push(t));
            for (a = 0; a < ma.length; a++) 0 < ma[a] && 0 == l[a] && (t = new Qa(0, a + 1, 0, 0, 35), Mi.push(t));
            console.log("now " + Mi.length + " NEW edible objs!");
            Ai = +new Date + 9e3;
            xi = 0;
            if (0 < Mi.length) for (Ti = 1.2, t = 45 * Math.max(0, Mi.length - 1), ki = t + 40, a = 0; a < Mi.length; a++) n = Mi[a],
            n.x = n.ox = n.nx = 0 - t / 2 + a / Math.max(1, Mi.length - 1) * t,
            n.y = n.oy = n.ny = 0,
            n.nRad = 20;
            break;
        case 14:
            var a = t.readUInt8(),
                o = t.readUInt32();
            Ii = 0 == a ? "О нет, вас съели! \n Следите за красными индекаторами игроков" : 1 == a ? "О нет, вы емерли от удара хвоста!\n Следите за хвостом!" : 4 == a ? "Вы умерли от жажды =( Следите за индекатором жажды!" : 2 == a ? "You died from a jellyfish sting!" : 3 == a ? "Вас убил скат!" : "Вы умерли! Следите за своим здоровьем!";
            Pi = "#F1C34C";
            vi = +new Date + 3500;
            Ne = !1;
            ze = !0;
            ji();
            try {
                y || setTimeout(factorem.refreshAds.bind(factorem, null, !0), 800)
            } catch (t) {
                console.log("error refreshing ad: " + t)
            }
            window.setTimeout(function () {
                if (!Ne) {
                    u && O();
                    p && W();
                    document.getElementById("startMenuWrapper").style.display = "block";
                    $e = 0 < o ? "Вы получите при старте +" + Ka(o) + " XP!" : "";
                    Qe = 0;
                    var t = document.getElementById("spawnXpLabel");
                    t.style.opacity = 0;
                    $e && setTimeout(function () {
                        Ne || (t.style.display = "block", t.style.opacity = 1)
                    }, 1e3);
                    document.getElementById("spawnXpLabel").textContent = $e;
                    y || (window.onbeforeunload = null)
                }
            }, 2e3);
            break;
        case 4:
            fi(t);
            break;
        case 19:
            a = t.readUInt32();
            if (a = Ia[a]) t = t.readString(),
            a.gotChat(t);
            break;
        case 22:
            t = t.readString();
            a = Ra(x.ip);
            Oi("mope.io/?s=" + a + "&l=" + t);
            break;
        case 23:
            t = t.readUInt8(),
            Ne && (console.log("event msg"), 1 == t ? (Ii = "Ouch! Your tail got bitten!", vi = ci + 2500) : 2 == t ? (Ii = "You've been stung by a jellyfish!", vi = ci + 2500) : 3 == t ? (Ii = "ZAP! You've been shocked by a STINGRAY!", vi = ci + 2500) : 50 == t ? (Ii = "You've been inked!", vi = ci + 2500) : 5 == t ? (Ii = "Oh no! Escape the kraken's pull!", vi = ci + 2500) : 6 == t && (Ii = "Ouch! Pufferfish are pointy!", vi = ci + 2500))
        }
    }
    function hi(t) {
        Ma.send(t.dataView.buffer)
    }
    function di() {
        return null != Ma && Ma.readyState == Ma.OPEN
    }
    var ci = +new Date,
        va = +new Date;

    function fi(t) {
        va = ci = +new Date;
        o_camx = fe;
        o_camy = camy;
        n_camx = t.readUInt16() / 4;
        n_camy = t.readUInt16() / 4;
        n_camzoom = t.readUInt16() / 1e3;
        var e = t.readUInt8();
        Ha(e, 1) || (qe = t.readUInt8(), xp = t.readUInt32(), Ke = t.readUInt8());
        for (var a = t.readUInt16(), i = 0; i < a; i++) {
            var n = t.readUInt8(),
                s = t.readUInt32(),
                r = t.readUInt16() / 4,
                l = t.readUInt16() / 4,
                o = t.readUInt16() / 4,
                e = t.readUInt8(),
                h = null;
            0 < e && (h = Ia[t.readUInt32()]);
            var d = new Qa(s, n, l, o, r),
                e = Ia[s];
            delete Ia[s];
            e = ba.indexOf(e); - 1 != e && ba.splice(e, 1);
            Ia[s] = d;
            ba.push(d);
            h && (d.updateTime = ci, d.nx = d.x, d.ny = d.y, d.ox = h.x, d.oy = h.y, d.x = h.x, d.y = h.y);
            n == Rt && (e = t.readUInt8(), s = t.readString(), d.type = e, d.name = s ? s : "Нет ника");
            n == Qt && (e = t.readUInt16(), n = t.readUInt16(), d.oceanW = e, d.oceanH = n, d.oceanNum = l > xe / 2 ? 1 : 0)
        }
        a = t.readUInt16();
        for (i = 0; i < a; i++) {
            s = t.readUInt32();
            l = t.readUInt16() / 4;
            o = t.readUInt16() / 4;
            r = t.readUInt16() / 10;
            if (d = Ia[s]) d.updateTime = ci,
            d.ox = d.x,
            d.oy = d.y,
            d.nx = l,
            d.ny = o,
            d.oRad = d.rad,
            d.nRad = r;
            d && d.oType == Rt && (l = t.readUInt8(), n = t.readUInt16(), e = t.readUInt8(), d.type = l, l = La(n - 90), d.angleDelta = Na(d.angle, l), d.oAngle = d.angle, d.flag_hurt = Ha(e, 7), d.flag_lowWat = Ha(e, 6), l = Ha(e, 5), d.flag_underWater = Ha(e, 4), d.flag_invincible = Ha(e, 3), d.flag_usingAbility = Ha(e, 2), e = Ha(e, 0) ? t.readUInt8() : 0, d.flag_tailBitten = Ha(e, 0), d.flag_stunned = Ha(e, 1), l ? (l = t.readUInt8(), .001 > d.hpBarA && (d.hpPer = l), d.hpPer_n = l, d.hpBarA_n = 1) : d.hpBarA_n = 0);
            d && d.oType == Zt && (e = t.readUInt8(), d.flag_hurt = Ha(e, 0), d.flag_hurt ? (l = t.readUInt8(), d.hpBarA = 1, d.hpPer = l, .5 > d.hpBarA && (d.hpPer = l), d.hpPer_n = l, d.hpBarA_n = 1) : d.hpBarA_n = 0);
            d || console.log("PROBLEM, NO OBJ!")
        }
        a = t.readUInt16();
        for (l = 0; l < a; l++) d = t.readUInt32(),
        i = 0 < t.readUInt8() ? t.readUInt32() : 0,
        d = Ia[d],
        i = 0 < i ? Ia[i] : void 0,
        d && (d.dead = !0, d.updateTime = ci, d.oType != ae && d.oType != ne && d.oType != ie && (i ? (d.ox = d.x, d.oy = d.y, d.oRad = d.rad, d.nx = i.nx, d.ny = i.ny, d.nRad = Math.min(d.rad, i.rad), d.hp_n = 0) : (d.ox = d.x, d.oy = d.y, d.oRad = d.rad, d.nx = d.x, d.ny = d.y, d.nRad = 0)))
    }
    function gi(t, e) {
        crossHx = t;
        crossHy = e;
        crossL = 30;
        oe.beginPath();
        oe.moveTo(crossHx, crossHy - crossL / 2);
        oe.lineTo(crossHx, crossHy + crossL / 2);
        oe.stroke();
        oe.moveTo(crossHx - crossL / 2, crossHy);
        oe.lineTo(crossHx + crossL / 2, crossHy);
        oe.stroke()
    }
    function ui() {
        if (!Ue) {
            oe.fillStyle = q;
            oe.fillRect(0, 0, Me, Ae);
            oe.save();
            oe.strokeStyle = "black";
            oe.globalAlpha = .055;
            oe.scale(ce, ce);
            for (var t = Me / ce, e = Ae / ce, a = -.5 + (-fe + t / 2) % 30; a < t; a += 30) oe.beginPath(),
            oe.moveTo(a, 0),
            oe.lineTo(a, e),
            oe.stroke();
            for (a = -.5 + (-camy + e / 2) % 30; a < e; a += 30) oe.beginPath(),
            oe.moveTo(0, a),
            oe.lineTo(t, a),
            oe.stroke();
            oe.restore()
        }
    }
    var pi = 250,
        yi = 250;

    function mi(t) {
        pi = xe / ke * yi;
        le = document.createElement("canvas");
        le.width = pi;
        le.height = yi;
        var e = le.getContext("2d");
        e.globalAlpha = .35;
        e.fillStyle = "#000000";
        e.fillRect(0, 0, le.width, le.height);
        for (var a = pi / 200, i = yi / 200, n = t.readUInt16(), s = 0; 2 > s; s++) {
            e.fillStyle = Q;
            e.globalAlpha = .5;
            var r = pi / xe;
            0 == s ? e.fillRect(0 * r, 0 * r, n * r, ke * r) : e.fillRect((xe - n) * r, 0 * r, n * r, ke * r)
        }
        n = t.readUInt16();
        e.fillStyle = Q;
        e.globalAlpha = .5;
        for (s = 0; s < n; s++) {
            var r = t.readUInt8() * a,
                l = t.readUInt8() * i,
                o = 5 * t.readUInt8();
            e.beginPath();
            e.arc(r, l, Math.max(1, pi / xe * o), 0, 2 * Math.PI);
            e.fill()
        }
        n = t.readUInt16();
        e.fillStyle = "#907A33";
        e.globalAlpha = .7;
        for (s = 0; s < n; s++) r = t.readUInt8() * a,
        l = t.readUInt8() * i,
        e.beginPath(),
        e.arc(r, l, Math.max(2.5, pi / xe * 200), 0, 2 * Math.PI),
        e.fill();
        n = t.readUInt16();
        e.fillStyle = K;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++) r = t.readUInt8() * a,
        l = t.readUInt8() * i,
        e.beginPath(),
        e.arc(r, l, Math.max(1.5, pi / xe * 50), 0, 2 * Math.PI),
        e.fill();
        n = t.readUInt16();
        e.fillStyle = "#A89937";
        e.globalAlpha = .6;
        for (s = 0; s < n; s++) r = t.readUInt8() * a,
        l = t.readUInt8() * i,
        e.beginPath(),
        e.arc(r, l, Math.max(1.5, pi / xe * 100), 0, 2 * Math.PI),
        e.fill();
        n = t.readUInt16();
        e.fillStyle = tt;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++) r = t.readUInt8() * a,
        l = t.readUInt8() * i,
        e.beginPath(),
        e.arc(r, l, Math.max(2.5, pi / xe * 40), 0, 2 * Math.PI),
        e.fill();
        n = t.readUInt16();
        e.fillStyle = at;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++) r = t.readUInt8() * a,
        l = t.readUInt8() * i,
        e.beginPath(),
        e.arc(r, l, Math.max(2.5, pi / xe * 40), 0, 2 * Math.PI),
        e.fill();
        n = t.readUInt16();
        e.fillStyle = Q;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++) r = t.readUInt8() * a,
        l = t.readUInt8() * i,
        e.beginPath(),
        e.arc(r, l, Math.max(2.5, pi / xe * 50), 0, 2 * Math.PI),
        e.fill()
    }
    function wi(t, e, a) {
        re = null;
        if (0 != t.length) {
            re = document.createElement("canvas");
            e = re.getContext("2d");
            var i;
            i = 55 + 22 * t.length;
            re.width = 290;
            re.height = i;
            e.globalAlpha = .45;
            e.fillStyle = "#000000";
            e.fillRect(0, 0, 290, i);
            e.globalAlpha = 1;
            e.fillStyle = "#FFFFFF";
            i = "Топ игроков";
            e.font = "30px Arial";
            Ue || (e.shadowOffsetX = 1, e.shadowOffsetY = 1);
            e.shadowColor = "black";
            e.fillText(i, 95 - e.measureText(i).width / 2, 40);
            var n;
            e.textAlign = "left";
            e.font = "18px Arial";
            for (n = 0; n < t.length; ++n) i = Se ? "" : t[n].name || "Нет Ника",
            a == t[n].rank ? (e.fillStyle = "#FEED92", Se && (i = "you")) : e.fillStyle = "#FFFFFF",
            i = t[n].rank + ". " + i + " (" + Ka(t[n].score) + ")",
            e.fillText(i, 15, 65 + 22 * n)
        }
    }
    function bi() {
        ue += .05 * ((Ne ? 1 : 0) - ue);
        oe.save();
        if (.01 < ue) {
            oe.globalAlpha *= ue;
            water += .1 * (qe - water);
            xpPer += .03 * (Ke - xpPer);
            var t = Ia[Ye],
                e = t && t.type == ft && t.flag_usingAbility,
                t = t && (t.flag_underWater || e),
                e = 1,
                a = 25 >= water;
            a && (e = .7 + .3 * Math.sin(2 * Math.PI / 1.2 * (ci / 1e3)));
            var i = Math.min(450, .9 * Me) * ge,
                n = 30 * ge,
                s = Me / 2,
                r = Ae - 60 * ge;
            oe.globalAlpha = .35 * e;
            oe.fillStyle = "#000000";
            oe.fillRect(s - i / 2, r - n / 2, i, n);
            oe.globalAlpha = e;
            oe.fillStyle = t ? "#8CCEF4" : Q;
            oe.fillRect(s - i / 2, r - n / 2, water / 100 * i, n);
            oe.fillStyle = Pe ? a ? tt : "orange" : a ? tt : "white";
            oe.globalAlpha = 1 * e;
            oe.font = 22 * ge + "px Arial";
            oe.lineWidth = 1;
            oe.textAlign = "center";
            oe.textBaseline = "middle";
            oe.shadowColor = "black";
            Ue || (a ? (oe.shadowOffsetX = 0, oe.shadowOffsetY = 0) : (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1), t ? oe.fillText(a ? "LOW Air" : "Air", s, r) : oe.fillText(a ? "Мало воды" : "Вода", s, r), oe.shadowOffsetX = 0, oe.shadowOffsetY = 0);
            oe.globalAlpha = .35;
            oe.fillStyle = "#000000";
            r = Ae - n / 2 - 5;
            i = .9 * Me;
            oe.fillRect(s - i / 2, r - n / 2, i, n);
            oe.globalAlpha = 1;
            oe.fillStyle = "#F3C553";
            oe.fillRect(s - i / 2, r - n / 2, xpPer / 100 * i, n);
            oe.fillStyle = "white";
            oe.globalAlpha = 1;
            oe.shadowColor = "black";
            Ue || (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1);
            oe.fillText("У вас " + Ka(xp) + " xp (Вам нужно " + Ka(ga) + " xp до следующего улучшения)", s, r);
            oe.shadowOffsetX = 0;
            oe.shadowOffsetY = 0;
            Da && (ta.draw(), ea.draw(), aa.draw(), da += .1 * ((ia ? 1 : 0) - da), .005 < da && Ne && (oe.globalAlpha = .3 * da, oe.beginPath(), oe.arc(sa, ra, ha * de, 0, 2 * Math.PI), oe.fillStyle = "#000000", oe.fill(), oe.globalAlpha = .5 * da, oe.beginPath(), oe.arc(la, oa, ha * de * .57, 0, 2 * Math.PI), oe.fillStyle = "#000000", oe.fill(), t = .3 * fa, fa -= t, ca += t, joystickDistF += .1 * (joystickDistF_n - joystickDistF), oe.save(), oe.translate(Me / 2, Ae / 2), oe.rotate(ca), oe.globalAlpha = .5 * da, oe.beginPath(), oe.fillStyle = "#000000", t = 40 * de, Ia[Ye] && (t = (9 + Ia[Ye].rad) * ce), t *= .1 + .9 * joystickDistF, e = 15 * de, oe.moveTo(t + 30 * de * (.2 + .8 * joystickDistF), 0), oe.lineTo(t, e / 2), oe.lineTo(t, -e / 2), oe.closePath(), oe.fill(), oe.restore()))
        }
        oe.restore()
    }
    var Ii = "Ready to survive!",
        Pi = "white",
        vi = +new Date + 0,
        Mi = [],
        Ai = +new Date + 0,
        xi = 0,
        ki = 100,
        Ti = 2,
        Si = new Image,
        Ui = !1;
    Si.src = "./img/instr_eatsymbol.png";

    function Ei() {
        var t = (vi - ci) / 1e3 / 1,
            t = 0 > t ? 0 : 1 < t ? 1 : t;
        0 < t && (oe.save(), oe.globalAlpha = t, oe.font = 25 * ge + "px Arial", oe.lineWidth = 1, oe.textAlign = "center", oe.textBaseline = "middle", Ue || (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1, oe.shadowColor = "black"), oe.fillStyle = Pi, Va(Ii, Me / 2, .2 * Ae), oe.restore());
        xi += .1 * ((0 < Ai - ci ? 1 : 0) - xi);
        if (.01 < xi && !Ue) {
            if (0 < Mi.length) {
                oe.save();
                oe.translate(Me / 2, Ae * (.7 + .5 * (1 - xi)));
                oe.scale(Ti * ge, Ti * ge);
                oe.globalAlpha = .2 * xi;
                oe.fillStyle = "black";
                var e = ki + 15 / Ti,
                    a = 40 + 10 / Ti;
                oe.fillRect(-e / 2, -a / 2, e, a);
                oe.globalAlpha = xi;
                for (t = 0; t < Mi.length; t++) Mi[t].draw()
            }
            0 != Si.width && Si.complete && (t = a / Si.height * xi, oe.drawImage(Si, -e / 2 - Si.width * t - 15, -a / 2, Si.width * t, Si.height * t));
            Ui && (oe.save(), oe.fillStyle = "#52EB59", oe.font = 16 * ge + "px Arial", oe.lineWidth = 1, oe.textAlign = "center", oe.textBaseline = "middle", Ue || (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1, oe.shadowColor = "black"), oe.fillText("Ешьте шарики обведенные ствело-зеленым цветом. (Вы можете есть ягоды)", 0, -45), oe.restore());
            oe.restore()
        }
    }
    function Di(t) {
        ci = +new Date;
        window.requestAnimationFrame(Di);
        oe.clearRect(0, 0, Me, Ae);
        t = (ci - va) / 1e3 / .2;
        t = 0 > t ? 0 : 1 < t ? 1 : t;
        fe = t * (n_camx - o_camx) + o_camx;
        camy = t * (n_camy - o_camy) + o_camy;
        ce = (25 * ce + n_camzoom) / 26;
        zi();
        ui();
        oe.save();
        t = Me / 2;
        var e = Ae / 2;
        oe.translate(t * (1 - ce) + (t - fe) * ce, e * (1 - ce) + (e - camy) * ce);
        oe.scale(ce, ce);
        oe.save();
        je && (t = 10, t = 600, oe.globalAlpha = .5, oe.fillStyle = Z, oe.fillRect(0 - t, 0 - t, xe + 2 * t, t), oe.fillRect(0 - t, ke, xe + 2 * t, t), oe.globalAlpha = .6, oe.fillStyle = Q, oe.fillRect(0 - t, -.5, t, ke + 1), oe.fillRect(xe, -.5, t, ke + 1));
        oe.restore();
        Pa = [];
        for (d = 0; d < ba.length; d++) ba[d].updateZ();
        ba.sort(function (t, e) {
            return t.z == e.z ? t.id - e.id : t.z - e.z
        });
        for (d = 0; d < ba.length; d++) ba[d].draw();
        if (!Se) for (d = 0; d < ba.length; d++)"undefined" != typeof ba[d].chatLines && ba[d].drawChat();
        for (d = 0; d < Pa.length; d++) t = Pa[d],
        Ia.hasOwnProperty(t.id) && delete Ia[t.id],
        t = ba.indexOf(t),
        -1 != t && ba.splice(t, 1);
        oe.restore();
        Ne && (re && re.width && oe.drawImage(re, 10 * de, 10 * de, re.width * ge, re.height * ge), le && le.width && oe.drawImage(le, Me - (10 * de + le.width * ge), 10 * de, pi * ge, yi * ge), t = Ia[Ye]) && (oe.fillStyle = "white", oe.beginPath(), oe.arc(Me - (10 * de + le.width * ge) + t.x * le.width * ge / xe, 10 * de + t.y * le.height * ge / ke, 3, 0, 2 * Math.PI), oe.fill());
        Ei();
        bi();
        370 > Gi && Ne || (oe.save(), oe.font = 15 * ge + "px Arial", oe.lineWidth = 1, oe.textAlign = "right", oe.textBaseline = "bottom", Ue || (oe.shadowOffsetX = 1, oe.shadowOffsetY = 1, oe.shadowColor = "black"), oe.fillStyle = "white", oe.fillText(Ge, Me - 5, Ae - 2), Ue && (Ce += 1, 1e3 < ci - Re && (Re = +new Date, Oe = Ce + " fps", Ce = 0, console.log("fps: (avg. " + 1e3 * Fe / (ci - We) + ")")), Fe += 1, oe.fillText(Oe, Me - 5, Ae - 45)), oe.restore())
    }
    window.requestAnimationFrame ? window.requestAnimationFrame(Di) : setInterval(draw, 1e3 / 60);
    var Bi = 0;

    function Ci(t) {
        if (di() && !Ne) {
            if (!t) {
                var e = +new Date;
                if (1e3 > e - Bi) return;
                Bi = e
            }
            playerName = nickInput.value.replace(/(<([^>]+)>)/gi, "").substring(0, 20);
            e = 9 + Xa(playerName).length + 1;
            null != P && null != v && (e += Xa(v).length + 2);
            mes = new ei(e);
            mes.writeUInt8(2);
            mes.writeString(playerName);
            mes.writeUInt8(t ? 2 : 1);
            mes.writeUInt16(Me);
            mes.writeUInt16(Ae);
            I ? (mes.writeUInt8(1), mes.writeString(v)) : mes.writeUInt8(0);
            hi(mes);
            if (!t && window.localStorage) try {
                window.localStorage.setItem("nick", playerName + "")
            } catch (t) {}
            wa = !1
        }
    }
    var _i = function () {
        console.log("Video done, joining game!");
        document.getElementById("spawn_cell").play();
        Ci(!1)
    };

    function Ri() {
        document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").style.display = "block", document.getElementById("partyLinkClicked").style.display = "none")
    }
    document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").onclick = function () {
        Xe && (document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").style.display = "none", document.getElementById("partyLinkClicked").style.display = "block"), newMsg = new ei(1), newMsg.writeUInt8(22), hi(newMsg))
    });

    function Oi(t) {
        var e = document.getElementById("partyLinkTxt");
        e.value = t;
        e.setSelectionRange(0, e.value.length);
        e.focus();
        e.setSelectionRange(0, e.value.length)
    }
    document.getElementById("partyLinkCopyBut") && (document.getElementById("partyLinkCopyBut").onclick = function () {
        var t = document.getElementById("partyLinkTxt");
        t.focus();
        t.setSelectionRange(0, t.value.length);
        try {
            document.execCommand("copy"),
            partyLinkCopyBut.text = "Copied!",
            setTimeout(function () {
                partyLinkCopyBut.text = "Copy"
            }, 1e3)
        } catch (t) {}
    });
    document.getElementById("startButton").onclick = function () {
        ji();
        document.getElementById("spawn_cell").play();
        !z && Xe && (X() ? (adplayer.startPreRoll(), z = !0, document.getElementById("startMenuWrapper").style.display = "none") : Ci(!1))
    };
    document.getElementById("settingsButton").onclick = function () {
        var t = document.getElementById("optionsDiv");
        t.style.display = "none" == t.style.display ? "block" : "none";
        console.log("onlick")
    };
    document.getElementById("options_noImages").onchange = function () {
        if (window.localStorage) {
            Te = document.getElementById("options_noImages").checked;
            try {
                window.localStorage.setItem("options_noImages", Te ? 1 : 0)
            } catch (t) {}
            console.log("options_noimages: saved as " + window.localStorage.getItem("options_noImages"))
        }
    };
    document.getElementById("options_noNames").onchange = function () {
        if (window.localStorage) {
            Se = document.getElementById("options_noNames").checked;
            try {
                window.localStorage.setItem("options_noNames", Se ? 1 : 0)
            } catch (t) {}
            console.log("options_noNames: saved as " + window.localStorage.getItem("options_noNames"))
        }
    };
    document.getElementById("options_lowGraphics").onchange = function () {
        if (window.localStorage) {
            Ue = document.getElementById("options_lowGraphics").checked;
            try {
                window.localStorage.setItem("options_lowGraphics", Ue ? 1 : 0)
            } catch (t) {}
            Yi();
            console.log("options_lowGraphics: saved as " + window.localStorage.getItem("options_lowGraphics"))
        }
    };
    document.getElementById("options_noJoystick").onchange = function () {
        if (window.localStorage) {
            Ee = document.getElementById("options_noJoystick").checked;
            try {
                window.localStorage.setItem("options_noJoystick", Ee ? 1 : 0)
            } catch (t) {}
            Yi();
            console.log("options_noJoystick: saved as " + window.localStorage.getItem("options_noJoystick"))
        }
    };
    var Wi = document.getElementById("options_leftHanded");
    Wi && (Wi.onchange = function () {
        if (window.localStorage) {
            De = Wi.checked;
            try {
                window.localStorage.setItem("options_leftHanded", De ? 1 : 0)
            } catch (t) {}
            Yi();
            console.log("options_leftHanded: saved as " + window.localStorage.getItem("options_leftHanded"))
        }
    });
    var Fi = !1;
    document.onkeydown = function (t) {
        ji();
        var e = t.keyCode || t.which;
        32 == e && !Fi && Ne ? (t.preventDefault(), Ni(1, !0)) : 87 == e && !Fi && Ne && (t.preventDefault(), Ni(2, !0))
    };
    document.onkeyup = function (t) {
        var e = t.keyCode || t.which;
        13 != e || Ne ? Ne && (e = t.keyCode || t.which, 32 != e || Fi ? (87 != e || Fi || (t.preventDefault(), Ni(2, !1)), 13 == e && Ne && Li()) : Ni(1, !1)) : document.getElementById("startButton").click()
    };

    function Li() {
        var t = document.getElementById("chatinput");
        if (!Fi && Ne) console.log("opening chatbox"),
        t.style.visibility = "visible",
        t.focus(),
        Fi = !0,
        t.onblur = function () {
            Fi && Li()
        };
        else if (Fi) {
            console.log("closing chatbox");
            var e = t.value + "";
            Fi = !1;
            t.style.visibility = "hidden";
            t.blur();
            0 < e.length && Ne && (newMsg = new ei(3 + Xa(e).length), newMsg.writeUInt8(19), newMsg.writeString(e), hi(newMsg));
            t.value = ""
        }
    }
    window.onresize = Yi;
    var Gi = 100,
        Hi = 100;

    function Yi() {
        Gi = window.innerWidth;
        Hi = window.innerHeight;
        de = window.devicePixelRatio;
        Me = Gi * de;
        Ae = Hi * de;
        se.width = Me;
        se.height = Ae;
        se.style.width = Gi + "px";
        se.style.height = Hi + "px";
        document.getElementById("chatinput").style.marginTop = Hi / 2 - 50 + "px";
        Da && (ta.w = ta.h = 95 * de, ea.w = ea.h = 95 * de, aa.w = 60 * de, aa.h = 30 * de, ta.x = 25 * de + ta.w / 2, ta.y = Ae - (25 * de + ta.w / 2), De && (ta.x = Me - ta.x), ea.x = ta.x, ea.y = ta.y - (10 * de + ea.w / 2 + ta.w / 2), aa.x = 72.5 * de + 125 * de, aa.y = 15 * de + aa.h / 2);
        ge = Math.max(Me / 1344, Ae / 756);
        ge = Math.min(1, Math.max(.4, ge * de));
        500 > Math.min(Gi, Hi) && (ge = de / 2 * .9);
        di() && (mes = new ei(5), mes.writeUInt8(17), mes.writeUInt16(Me), mes.writeUInt16(Ae), hi(mes))
    }
    function Ni(t, e) {
        1 == t ? (Pe != e && di() && Ne && (e && Xi(), mes = new ei(2), mes.writeUInt8(21), mes.writeUInt8(e ? 1 : 0), hi(mes)), Pe = e) : 2 == t ? (ve != e && di() && Ne && (e && Xi(), mes = new ei(2), mes.writeUInt8(20), mes.writeUInt8(e ? 1 : 0), hi(mes)), ve = e) : 3 == t && (ve != e && di() && Ne && (e && Xi(), mes = new ei(2), mes.writeUInt8(20), mes.writeUInt8(e ? 1 : 0), hi(mes)), ve = e)
    }
    se.addEventListener("gesturestart", function (t) {
        console.log("gesture start!");
        t.preventDefault()
    });
    se.ontouchstart = function (t) {
        ji();
        console.log("touch start!");
        if (Da) for (var e = 0; e < t.changedTouches.length; e++) {
            var a = t.changedTouches[e],
                i = ta.testPosHitsButton(a.clientX * de, a.clientY * de);
            if (!ta.pressed && i) {
                t.preventDefault();
                ta.pressed = !0;
                ta.pressedTouchID = a.identifier;
                Ni(1, !0);
                return
            }
            i = ea.testPosHitsButton(a.clientX * de, a.clientY * de);
            if (!ea.pressed && i) {
                t.preventDefault();
                ea.pressed = !0;
                ea.pressedTouchID = a.identifier;
                Ni(2, !0);
                return
            }
            i = aa.testPosHitsButton(a.clientX * de, a.clientY * de);
            if (!aa.pressed && i) {
                t.preventDefault();
                Li();
                return
            }
            if (!Ee && !ia && Ne) {
                ia = !0;
                sa = a.clientX * de;
                ra = a.clientY * de;
                la = sa;
                oa = ra;
                na = a.identifier;
                return
            }
        }
        pe = t.touches[0].clientX * de;
        ye = t.touches[0].clientY * de;
        zi()
    };
    se.ontouchmove = function (t) {
        ji();
        t.preventDefault();
        for (var e = 0; e < t.changedTouches.length; e++) {
            var a = t.changedTouches[e];
            if (a.identifier != ta.pressedTouchID && a.identifier != ea.pressedTouchID && a.identifier != aa.pressedTouchID) if (Ee) pe = a.clientX * de,
            ye = a.clientY * de,
            zi();
            else if (ia && a.identifier == na) {
                var i = a.clientX * de - sa,
                    a = a.clientY * de - ra,
                    n = Math.sqrt(i * i + a * a);
                if (0 < n) {
                    var i = i / n,
                        a = a / n,
                        n = Math.min(1, n / (ha * de)),
                        s = Math.pow(n, 3);.1 > s && (s = 0);
                    s *= 300 * de;
                    fa = Na(ca, Math.atan2(a, i));
                    joystickDistF_n = n;
                    la = sa + ha * de * i * n;
                    oa = ra + ha * de * a * n;
                    pe = Me / 2 + i * s;
                    ye = Ae / 2 + a * s;
                    zi()
                }
            }
        }
    };
    se.ontouchend = function (t) {
        console.log("touch end!");
        if (Da && Ne) for (var e = 0; e < t.changedTouches.length; e++) {
            var a = t.changedTouches[e];
            ia && a.identifier == na && (ia = !1, na = -1);
            ta.pressed && ta.pressedTouchID == a.identifier ? (ta.pressed = !1, ta.pressedTouchID = -1, Ni(1, !1), console.log("run released!")) : ea.pressed && ea.pressedTouchID == a.identifier && (ea.pressed = !1, ea.pressedTouchID = -1, Ni(2, !1), console.log("button released!"))
        }
    };
    se.ontouchcancel = function (t) {
        console.log("touch cancel");
        se.ontouchend(t)
    };
    se.ontouchleave = function (t) {
        console.log("touch leave")
    };
    se.onmousemove = function (t) {
        pe = t.clientX * de;
        ye = t.clientY * de;
        zi();
        Je || ji()
    };
    se.onmousedown = function (t) {
        ji();
        1 == t.which && Ni(1, !0);
        3 == t.which && Ni(2, !0)
    };
    se.onmouseup = function (t) {
        1 == t.which && Ni(1, !1);
        3 == t.which && Ni(2, !1)
    };
    se.onblur = function (t) {
        Ni(1, !1);
        Ni(2, !1)
    };
    window.onfocus = function (t) {
        ji()
    };
    window.onmouseout = function (t) {
        null == t.toElement && null == t.relatedTarget && (Ni(1, !1), Ni(2, !1))
    };
    document.oncontextmenu = document.body.oncontextmenu = function () {
        return !Ne
    };

    function zi() {
        var t = Me / 2,
            e = Ae / 2;
        be = me;
        Ie = we;
        me = (pe - (t - fe * ce)) / ce;
        we = (ye - (e - camy * ce)) / ce
    }
    function Xi() {
        di() && Ne && (.1 < Math.abs(be - me) || .1 < Math.abs(Ie - we)) && (mes = new ei(6), mes.writeUInt8(5), mes.writeInt16(me), mes.writeInt16(we), hi(mes))
    }
    setInterval(Xi, 20);

    function ji() {
        Ve = +new Date;
        Je && (Je = !1, y || (window.onbeforeunload = null), document.getElementById("connecting").style.visibility = "visible", window.location.reload())
    }
    setInterval(function () {
        +new Date - Ve > 6e4 * (Ne ? 240 : 10) && !Je && Xe && (console.log("Disconnected for afk..."), Je = !0, di() && Ma.close())
    }, 5e3);

    function Vi() {
        Yi();
        Ia = {};
        ba = [];
        Pa = [];
        qe = water = 100;
        water = qe = Ke = xpPer = xp = 0;
        if (!I) {
            $e = "";
            var t = document.getElementById("spawnXpLabel");
            t.style.display = $e ? "block" : "none";
            t.textContent = $e
        }
        aa.pressed = !1;
        ta.pressed = !1;
        ia = ea.pressed = !1
    }
    window.onload = function () {
        Yi();
        if (window.localStorage) {
            var t = document.getElementById("nickInput");
            t.value = window.localStorage.getItem("nick");
            t.setSelectionRange(0, t.value.length);
            Da || t.focus()
        }
    }
})();