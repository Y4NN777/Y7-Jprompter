(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 88143, (e, t, r) => {
    "use strict";
    function n({widthInt: e, heightInt: t, blurWidth: r, blurHeight: n, blurDataURL: i, objectFit: a}) {
        let s = r ? 40 * r : e
          , o = n ? 40 * n : t
          , l = s && o ? `viewBox='0 0 ${s} ${o}'` : "";
        return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l ? "none" : "contain" === a ? "xMidYMid" : "cover" === a ? "xMidYMid slice" : "none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "getImageBlurSvg", {
        enumerable: !0,
        get: function() {
            return n
        }
    })
}
, 87690, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        VALID_LOADERS: function() {
            return a
        },
        imageConfigDefault: function() {
            return s
        }
    };
    for (var i in n)
        Object.defineProperty(r, i, {
            enumerable: !0,
            get: n[i]
        });
    let a = ["default", "imgix", "cloudinary", "akamai", "custom"]
      , s = {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        path: "/next/image",
        loader: "default",
        loaderFile: "",
        domains: [],
        disableStaticImages: !1,
        minimumCacheTTL: 14400,
        formats: ["image/webp"],
        maximumRedirects: 3,
        dangerouslyAllowLocalIP: !1,
        dangerouslyAllowSVG: !1,
        contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
        contentDispositionType: "attachment",
        localPatterns: void 0,
        remotePatterns: [],
        qualities: [75],
        unoptimized: !1
    }
}
, 8927, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "getImgProps", {
        enumerable: !0,
        get: function() {
            return c
        }
    }),
    e.r(33525);
    let n = e.r(43369)
      , i = e.r(88143)
      , a = e.r(87690)
      , s = ["-moz-initial", "fill", "none", "scale-down", void 0];
    function o(e) {
        return void 0 !== e.default
    }
    function l(e) {
        return void 0 === e ? e : "number" == typeof e ? Number.isFinite(e) ? e : NaN : "string" == typeof e && /^[0-9]+$/.test(e) ? parseInt(e, 10) : NaN
    }
    function c({src: e, sizes: t, unoptimized: r=!1, priority: c=!1, preload: u=!1, loading: d, className: h, quality: p, width: m, height: f, fill: x=!1, style: y, overrideSrc: v, onLoad: g, onLoadingComplete: b, placeholder: w="empty", blurDataURL: j, fetchPriority: N, decoding: k="async", layout: S, objectFit: C, objectPosition: M, lazyBoundary: A, lazyRoot: T, ...P}, _) {
        var E;
        let I, D, R, {imgConf: L, showAltText: z, blurComplete: O, defaultLoader: V} = _, $ = L || a.imageConfigDefault;
        if ("allSizes"in $)
            I = $;
        else {
            let e = [...$.deviceSizes, ...$.imageSizes].sort( (e, t) => e - t)
              , t = $.deviceSizes.sort( (e, t) => e - t)
              , r = $.qualities?.sort( (e, t) => e - t);
            I = {
                ...$,
                allSizes: e,
                deviceSizes: t,
                qualities: r
            }
        }
        if (void 0 === V)
            throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"), "__NEXT_ERROR_CODE", {
                value: "E163",
                enumerable: !1,
                configurable: !0
            });
        let F = P.loader || V;
        delete P.loader,
        delete P.srcSet;
        let B = "__next_img_default"in F;
        if (B) {
            if ("custom" === I.loader)
                throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
                    value: "E252",
                    enumerable: !1,
                    configurable: !0
                })
        } else {
            let e = F;
            F = t => {
                let {config: r, ...n} = t;
                return e(n)
            }
        }
        if (S) {
            "fill" === S && (x = !0);
            let e = {
                intrinsic: {
                    maxWidth: "100%",
                    height: "auto"
                },
                responsive: {
                    width: "100%",
                    height: "auto"
                }
            }[S];
            e && (y = {
                ...y,
                ...e
            });
            let r = {
                responsive: "100vw",
                fill: "100vw"
            }[S];
            r && !t && (t = r)
        }
        let H = ""
          , U = l(m)
          , q = l(f);
        if ((E = e) && "object" == typeof E && (o(E) || void 0 !== E.src)) {
            let t = o(e) ? e.default : e;
            if (!t.src)
                throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`), "__NEXT_ERROR_CODE", {
                    value: "E460",
                    enumerable: !1,
                    configurable: !0
                });
            if (!t.height || !t.width)
                throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`), "__NEXT_ERROR_CODE", {
                    value: "E48",
                    enumerable: !1,
                    configurable: !0
                });
            if (D = t.blurWidth,
            R = t.blurHeight,
            j = j || t.blurDataURL,
            H = t.src,
            !x)
                if (U || q) {
                    if (U && !q) {
                        let e = U / t.width;
                        q = Math.round(t.height * e)
                    } else if (!U && q) {
                        let e = q / t.height;
                        U = Math.round(t.width * e)
                    }
                } else
                    U = t.width,
                    q = t.height
        }
        let W = !c && !u && ("lazy" === d || void 0 === d);
        (!(e = "string" == typeof e ? e : H) || e.startsWith("data:") || e.startsWith("blob:")) && (r = !0,
        W = !1),
        I.unoptimized && (r = !0),
        B && !I.dangerouslyAllowSVG && e.split("?", 1)[0].endsWith(".svg") && (r = !0);
        let Y = l(p)
          , G = Object.assign(x ? {
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            objectFit: C,
            objectPosition: M
        } : {}, z ? {} : {
            color: "transparent"
        }, y)
          , X = O || "empty" === w ? null : "blur" === w ? `url("data:image/svg+xml;charset=utf-8,${(0,
        i.getImageBlurSvg)({
            widthInt: U,
            heightInt: q,
            blurWidth: D,
            blurHeight: R,
            blurDataURL: j || "",
            objectFit: G.objectFit
        })}")` : `url("${w}")`
          , J = s.includes(G.objectFit) ? "fill" === G.objectFit ? "100% 100%" : "cover" : G.objectFit
          , K = X ? {
            backgroundSize: J,
            backgroundPosition: G.objectPosition || "50% 50%",
            backgroundRepeat: "no-repeat",
            backgroundImage: X
        } : {}
          , Z = function({config: e, src: t, unoptimized: r, width: i, quality: a, sizes: s, loader: o}) {
            if (r) {
                let e = (0,
                n.getDeploymentId)();
                if (t.startsWith("/") && !t.startsWith("//") && e) {
                    let r = t.includes("?") ? "&" : "?";
                    t = `${t}${r}dpl=${e}`
                }
                return {
                    src: t,
                    srcSet: void 0,
                    sizes: void 0
                }
            }
            let {widths: l, kind: c} = function({deviceSizes: e, allSizes: t}, r, n) {
                if (n) {
                    let r = /(^|\s)(1?\d?\d)vw/g
                      , i = [];
                    for (let e; e = r.exec(n); )
                        i.push(parseInt(e[2]));
                    if (i.length) {
                        let r = .01 * Math.min(...i);
                        return {
                            widths: t.filter(t => t >= e[0] * r),
                            kind: "w"
                        }
                    }
                    return {
                        widths: t,
                        kind: "w"
                    }
                }
                return "number" != typeof r ? {
                    widths: e,
                    kind: "w"
                } : {
                    widths: [...new Set([r, 2 * r].map(e => t.find(t => t >= e) || t[t.length - 1]))],
                    kind: "x"
                }
            }(e, i, s)
              , u = l.length - 1;
            return {
                sizes: s || "w" !== c ? s : "100vw",
                srcSet: l.map( (r, n) => `${o({
                    config: e,
                    src: t,
                    quality: a,
                    width: r
                })} ${"w" === c ? r : n + 1}${c}`).join(", "),
                src: o({
                    config: e,
                    src: t,
                    quality: a,
                    width: l[u]
                })
            }
        }({
            config: I,
            src: e,
            unoptimized: r,
            width: U,
            quality: Y,
            sizes: t,
            loader: F
        })
          , Q = W ? "lazy" : d;
        return {
            props: {
                ...P,
                loading: Q,
                fetchPriority: N,
                width: U,
                height: q,
                decoding: k,
                className: h,
                style: {
                    ...G,
                    ...K
                },
                sizes: Z.sizes,
                srcSet: Z.srcSet,
                src: v || Z.src
            },
            meta: {
                unoptimized: r,
                preload: u || c,
                placeholder: w,
                fill: x
            }
        }
    }
}
, 98879, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return o
        }
    });
    let n = e.r(71645)
      , i = "undefined" == typeof window
      , a = i ? () => {}
    : n.useLayoutEffect
      , s = i ? () => {}
    : n.useEffect;
    function o(e) {
        let {headManager: t, reduceComponentsToState: r} = e;
        function o() {
            if (t && t.mountedInstances) {
                let e = n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));
                t.updateHead(r(e))
            }
        }
        return i && (t?.mountedInstances?.add(e.children),
        o()),
        a( () => (t?.mountedInstances?.add(e.children),
        () => {
            t?.mountedInstances?.delete(e.children)
        }
        )),
        a( () => (t && (t._pendingUpdate = o),
        () => {
            t && (t._pendingUpdate = o)
        }
        )),
        s( () => (t && t._pendingUpdate && (t._pendingUpdate(),
        t._pendingUpdate = null),
        () => {
            t && t._pendingUpdate && (t._pendingUpdate(),
            t._pendingUpdate = null)
        }
        )),
        null
    }
}
, 25633, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        default: function() {
            return f
        },
        defaultHead: function() {
            return d
        }
    };
    for (var i in n)
        Object.defineProperty(r, i, {
            enumerable: !0,
            get: n[i]
        });
    let a = e.r(55682)
      , s = e.r(90809)
      , o = e.r(43476)
      , l = s._(e.r(71645))
      , c = a._(e.r(98879))
      , u = e.r(42732);
    function d() {
        return [(0,
        o.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"), (0,
        o.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")]
    }
    function h(e, t) {
        return "string" == typeof t || "number" == typeof t ? e : t.type === l.default.Fragment ? e.concat(l.default.Children.toArray(t.props.children).reduce( (e, t) => "string" == typeof t || "number" == typeof t ? e : e.concat(t), [])) : e.concat(t)
    }
    e.r(33525);
    let p = ["name", "httpEquiv", "charSet", "itemProp"];
    function m(e) {
        let t, r, n, i;
        return e.reduce(h, []).reverse().concat(d().reverse()).filter((t = new Set,
        r = new Set,
        n = new Set,
        i = {},
        e => {
            let a = !0
              , s = !1;
            if (e.key && "number" != typeof e.key && e.key.indexOf("$") > 0) {
                s = !0;
                let r = e.key.slice(e.key.indexOf("$") + 1);
                t.has(r) ? a = !1 : t.add(r)
            }
            switch (e.type) {
            case "title":
            case "base":
                r.has(e.type) ? a = !1 : r.add(e.type);
                break;
            case "meta":
                for (let t = 0, r = p.length; t < r; t++) {
                    let r = p[t];
                    if (e.props.hasOwnProperty(r))
                        if ("charSet" === r)
                            n.has(r) ? a = !1 : n.add(r);
                        else {
                            let t = e.props[r]
                              , n = i[r] || new Set;
                            ("name" !== r || !s) && n.has(t) ? a = !1 : (n.add(t),
                            i[r] = n)
                        }
                }
            }
            return a
        }
        )).reverse().map( (e, t) => {
            let r = e.key || t;
            return l.default.cloneElement(e, {
                key: r
            })
        }
        )
    }
    let f = function({children: e}) {
        let t = (0,
        l.useContext)(u.HeadManagerContext);
        return (0,
        o.jsx)(c.default, {
            reduceComponentsToState: m,
            headManager: t,
            children: e
        })
    };
    ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }),
    Object.assign(r.default, r),
    t.exports = r.default)
}
, 18556, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "ImageConfigContext", {
        enumerable: !0,
        get: function() {
            return a
        }
    });
    let n = e.r(55682)._(e.r(71645))
      , i = e.r(87690)
      , a = n.default.createContext(i.imageConfigDefault)
}
, 65856, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "RouterContext", {
        enumerable: !0,
        get: function() {
            return n
        }
    });
    let n = e.r(55682)._(e.r(71645)).default.createContext(null)
}
, 70965, (e, t, r) => {
    "use strict";
    function n(e, t) {
        let r = e || 75;
        return t?.qualities?.length ? t.qualities.reduce( (e, t) => Math.abs(t - r) < Math.abs(e - r) ? t : e, 0) : r
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "findClosestQuality", {
        enumerable: !0,
        get: function() {
            return n
        }
    })
}
, 1948, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "default", {
        enumerable: !0,
        get: function() {
            return s
        }
    });
    let n = e.r(70965)
      , i = e.r(43369);
    function a({config: e, src: t, width: r, quality: a}) {
        if (t.startsWith("/") && t.includes("?") && e.localPatterns?.length === 1 && "**" === e.localPatterns[0].pathname && "" === e.localPatterns[0].search)
            throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
                value: "E871",
                enumerable: !1,
                configurable: !0
            });
        let s = (0,
        n.findClosestQuality)(a, e)
          , o = (0,
        i.getDeploymentId)();
        return `${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${s}${t.startsWith("/") && o ? `&dpl=${o}` : ""}`
    }
    a.__next_img_default = !0;
    let s = a
}
, 18581, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "useMergedRef", {
        enumerable: !0,
        get: function() {
            return i
        }
    });
    let n = e.r(71645);
    function i(e, t) {
        let r = (0,
        n.useRef)(null)
          , i = (0,
        n.useRef)(null);
        return (0,
        n.useCallback)(n => {
            if (null === n) {
                let e = r.current;
                e && (r.current = null,
                e());
                let t = i.current;
                t && (i.current = null,
                t())
            } else
                e && (r.current = a(e, n)),
                t && (i.current = a(t, n))
        }
        , [e, t])
    }
    function a(e, t) {
        if ("function" != typeof e)
            return e.current = t,
            () => {
                e.current = null
            }
            ;
        {
            let r = e(t);
            return "function" == typeof r ? r : () => e(null)
        }
    }
    ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }),
    Object.assign(r.default, r),
    t.exports = r.default)
}
, 85437, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.defineProperty(r, "Image", {
        enumerable: !0,
        get: function() {
            return b
        }
    });
    let n = e.r(55682)
      , i = e.r(90809)
      , a = e.r(43476)
      , s = i._(e.r(71645))
      , o = n._(e.r(74080))
      , l = n._(e.r(25633))
      , c = e.r(8927)
      , u = e.r(87690)
      , d = e.r(18556);
    e.r(33525);
    let h = e.r(65856)
      , p = n._(e.r(1948))
      , m = e.r(18581)
      , f = {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        qualities: [75],
        path: "/next/image",
        loader: "default",
        dangerouslyAllowSVG: !1,
        unoptimized: !0
    };
    function x(e, t, r, n, i, a, s) {
        let o = e?.src;
        e && e["data-loaded-src"] !== o && (e["data-loaded-src"] = o,
        ("decode"in e ? e.decode() : Promise.resolve()).catch( () => {}
        ).then( () => {
            if (e.parentElement && e.isConnected) {
                if ("empty" !== t && i(!0),
                r?.current) {
                    let t = new Event("load");
                    Object.defineProperty(t, "target", {
                        writable: !1,
                        value: e
                    });
                    let n = !1
                      , i = !1;
                    r.current({
                        ...t,
                        nativeEvent: t,
                        currentTarget: e,
                        target: e,
                        isDefaultPrevented: () => n,
                        isPropagationStopped: () => i,
                        persist: () => {}
                        ,
                        preventDefault: () => {
                            n = !0,
                            t.preventDefault()
                        }
                        ,
                        stopPropagation: () => {
                            i = !0,
                            t.stopPropagation()
                        }
                    })
                }
                n?.current && n.current(e)
            }
        }
        ))
    }
    function y(e) {
        return s.use ? {
            fetchPriority: e
        } : {
            fetchpriority: e
        }
    }
    "undefined" == typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
    let v = (0,
    s.forwardRef)( ({src: e, srcSet: t, sizes: r, height: n, width: i, decoding: o, className: l, style: c, fetchPriority: u, placeholder: d, loading: h, unoptimized: p, fill: f, onLoadRef: v, onLoadingCompleteRef: g, setBlurComplete: b, setShowAltText: w, sizesInput: j, onLoad: N, onError: k, ...S}, C) => {
        let M = (0,
        s.useCallback)(e => {
            e && (k && (e.src = e.src),
            e.complete && x(e, d, v, g, b, p, j))
        }
        , [e, d, v, g, b, k, p, j])
          , A = (0,
        m.useMergedRef)(C, M);
        return (0,
        a.jsx)("img", {
            ...S,
            ...y(u),
            loading: h,
            width: i,
            height: n,
            decoding: o,
            "data-nimg": f ? "fill" : "1",
            className: l,
            style: c,
            sizes: r,
            srcSet: t,
            src: e,
            ref: A,
            onLoad: e => {
                x(e.currentTarget, d, v, g, b, p, j)
            }
            ,
            onError: e => {
                w(!0),
                "empty" !== d && b(!0),
                k && k(e)
            }
        })
    }
    );
    function g({isAppRouter: e, imgAttributes: t}) {
        let r = {
            as: "image",
            imageSrcSet: t.srcSet,
            imageSizes: t.sizes,
            crossOrigin: t.crossOrigin,
            referrerPolicy: t.referrerPolicy,
            ...y(t.fetchPriority)
        };
        return e && o.default.preload ? (o.default.preload(t.src, r),
        null) : (0,
        a.jsx)(l.default, {
            children: (0,
            a.jsx)("link", {
                rel: "preload",
                href: t.srcSet ? void 0 : t.src,
                ...r
            }, "__nimg-" + t.src + t.srcSet + t.sizes)
        })
    }
    let b = (0,
    s.forwardRef)( (e, t) => {
        let r = (0,
        s.useContext)(h.RouterContext)
          , n = (0,
        s.useContext)(d.ImageConfigContext)
          , i = (0,
        s.useMemo)( () => {
            let e = f || n || u.imageConfigDefault
              , t = [...e.deviceSizes, ...e.imageSizes].sort( (e, t) => e - t)
              , r = e.deviceSizes.sort( (e, t) => e - t)
              , i = e.qualities?.sort( (e, t) => e - t);
            return {
                ...e,
                allSizes: t,
                deviceSizes: r,
                qualities: i,
                localPatterns: "undefined" == typeof window ? n?.localPatterns : e.localPatterns
            }
        }
        , [n])
          , {onLoad: o, onLoadingComplete: l} = e
          , m = (0,
        s.useRef)(o);
        (0,
        s.useEffect)( () => {
            m.current = o
        }
        , [o]);
        let x = (0,
        s.useRef)(l);
        (0,
        s.useEffect)( () => {
            x.current = l
        }
        , [l]);
        let[y,b] = (0,
        s.useState)(!1)
          , [w,j] = (0,
        s.useState)(!1)
          , {props: N, meta: k} = (0,
        c.getImgProps)(e, {
            defaultLoader: p.default,
            imgConf: i,
            blurComplete: y,
            showAltText: w
        });
        return (0,
        a.jsxs)(a.Fragment, {
            children: [(0,
            a.jsx)(v, {
                ...N,
                unoptimized: k.unoptimized,
                placeholder: k.placeholder,
                fill: k.fill,
                onLoadRef: m,
                onLoadingCompleteRef: x,
                setBlurComplete: b,
                setShowAltText: j,
                sizesInput: e.sizes,
                ref: t
            }), k.preload ? (0,
            a.jsx)(g, {
                isAppRouter: !r,
                imgAttributes: N
            }) : null]
        })
    }
    );
    ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }),
    Object.assign(r.default, r),
    t.exports = r.default)
}
, 94909, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        default: function() {
            return u
        },
        getImageProps: function() {
            return c
        }
    };
    for (var i in n)
        Object.defineProperty(r, i, {
            enumerable: !0,
            get: n[i]
        });
    let a = e.r(55682)
      , s = e.r(8927)
      , o = e.r(85437)
      , l = a._(e.r(1948));
    function c(e) {
        let {props: t} = (0,
        s.getImgProps)(e, {
            defaultLoader: l.default,
            imgConf: {
                deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                imageSizes: [32, 48, 64, 96, 128, 256, 384],
                qualities: [75],
                path: "/next/image",
                loader: "default",
                dangerouslyAllowSVG: !1,
                unoptimized: !0
            }
        });
        for (let[e,r] of Object.entries(t))
            void 0 === r && delete t[e];
        return {
            props: t
        }
    }
    let u = o.Image
}
, 57688, (e, t, r) => {
    t.exports = e.r(94909)
}
, 52683, e => {
    "use strict";
    let t, r, n, i, a, s, o, l, c;
    var u, d = e.i(43476), h = e.i(46696), p = e.i(71645);
    let m = (0,
    p.createContext)(null);
    m.displayName = "PanelGroupContext";
    let f = "data-panel-group-direction"
      , x = "data-panel-group-id"
      , y = "data-resize-handle"
      , v = "data-panel-resize-handle-id"
      , g = p.useLayoutEffect
      , b = p["useId".toString()]
      , w = "function" == typeof b ? b : () => null
      , j = 0;
    function N(e=null) {
        let t = w()
          , r = (0,
        p.useRef)(e || t || null);
        return null === r.current && (r.current = "" + j++),
        null != e ? e : r.current
    }
    function k({children: e, className: t="", collapsedSize: r, collapsible: n, defaultSize: i, forwardedRef: a, id: s, maxSize: o, minSize: l, onCollapse: c, onExpand: u, onResize: d, order: h, style: f, tagName: y="div", ...v}) {
        let b = (0,
        p.useContext)(m);
        if (null === b)
            throw Error("Panel components must be rendered within a PanelGroup container");
        let {collapsePanel: w, expandPanel: j, getPanelSize: k, getPanelStyle: S, groupId: C, isPanelCollapsed: M, reevaluatePanelConstraints: A, registerPanel: T, resizePanel: P, unregisterPanel: _} = b
          , E = N(s)
          , I = (0,
        p.useRef)({
            callbacks: {
                onCollapse: c,
                onExpand: u,
                onResize: d
            },
            constraints: {
                collapsedSize: r,
                collapsible: n,
                defaultSize: i,
                maxSize: o,
                minSize: l
            },
            id: E,
            idIsFromProps: void 0 !== s,
            order: h
        });
        (0,
        p.useRef)({
            didLogMissingDefaultSizeWarning: !1
        }),
        g( () => {
            let {callbacks: e, constraints: t} = I.current
              , a = {
                ...t
            };
            I.current.id = E,
            I.current.idIsFromProps = void 0 !== s,
            I.current.order = h,
            e.onCollapse = c,
            e.onExpand = u,
            e.onResize = d,
            t.collapsedSize = r,
            t.collapsible = n,
            t.defaultSize = i,
            t.maxSize = o,
            t.minSize = l,
            (a.collapsedSize !== t.collapsedSize || a.collapsible !== t.collapsible || a.maxSize !== t.maxSize || a.minSize !== t.minSize) && A(I.current, a)
        }
        ),
        g( () => {
            let e = I.current;
            return T(e),
            () => {
                _(e)
            }
        }
        , [h, E, T, _]),
        (0,
        p.useImperativeHandle)(a, () => ({
            collapse: () => {
                w(I.current)
            }
            ,
            expand: e => {
                j(I.current, e)
            }
            ,
            getId: () => E,
            getSize: () => k(I.current),
            isCollapsed: () => M(I.current),
            isExpanded: () => !M(I.current),
            resize: e => {
                P(I.current, e)
            }
        }), [w, j, k, M, E, P]);
        let D = S(I.current, i);
        return (0,
        p.createElement)(y, {
            ...v,
            children: e,
            className: t,
            id: E,
            style: {
                ...D,
                ...f
            },
            [x]: C,
            "data-panel": "",
            "data-panel-collapsible": n || void 0,
            "data-panel-id": E,
            "data-panel-size": parseFloat("" + D.flexGrow).toFixed(1)
        })
    }
    let S = (0,
    p.forwardRef)( (e, t) => (0,
    p.createElement)(k, {
        ...e,
        forwardedRef: t
    }));
    k.displayName = "Panel",
    S.displayName = "forwardRef(Panel)";
    let C = null
      , M = -1
      , A = null;
    function T(e, r, n) {
        var i, a, s;
        let o = function(e, t, r) {
            let n = (t & V) != 0
              , i = (t & $) != 0
              , a = (t & F) != 0
              , s = (t & B) != 0;
            if (t) {
                if (n)
                    if (a)
                        return "se-resize";
                    else if (s)
                        return "ne-resize";
                    else
                        return "e-resize";
                else if (i)
                    if (a)
                        return "sw-resize";
                    else if (s)
                        return "nw-resize";
                    else
                        return "w-resize";
                else if (a)
                    return "s-resize";
                else if (s)
                    return "n-resize"
            }
            switch (e) {
            case "horizontal":
                return "ew-resize";
            case "intersection":
                return "move";
            case "vertical":
                return "ns-resize"
            }
        }(e, r, 0);
        C !== o && (C = o,
        null === A && (A = document.createElement("style"),
        t && A.setAttribute("nonce", t),
        document.head.appendChild(A)),
        M >= 0 && (null == (s = A.sheet) || s.removeRule(M)),
        M = null != (i = null == (a = A.sheet) ? void 0 : a.insertRule(`*{cursor: ${o} !important;}`)) ? i : -1)
    }
    function P(e) {
        return "keydown" === e.type
    }
    function _(e) {
        return e.type.startsWith("pointer")
    }
    function E(e) {
        return e.type.startsWith("mouse")
    }
    function I(e) {
        if (_(e)) {
            if (e.isPrimary)
                return {
                    x: e.clientX,
                    y: e.clientY
                }
        } else if (E(e))
            return {
                x: e.clientX,
                y: e.clientY
            };
        return {
            x: 1 / 0,
            y: 1 / 0
        }
    }
    let D = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
    function R(e) {
        let t = e.length;
        for (; t--; ) {
            let r = e[t];
            if (en(r, "Missing node"),
            function(e) {
                var t;
                let r, n = getComputedStyle(e);
                return "fixed" === n.position || !!("auto" !== n.zIndex && ("static" !== n.position || "flex" === (r = getComputedStyle(null != (t = O(e)) ? t : e).display) || "inline-flex" === r) || 1 > +n.opacity || "transform"in n && "none" !== n.transform || "webkitTransform"in n && "none" !== n.webkitTransform || "mixBlendMode"in n && "normal" !== n.mixBlendMode || "filter"in n && "none" !== n.filter || "webkitFilter"in n && "none" !== n.webkitFilter || "isolation"in n && "isolate" === n.isolation || D.test(n.willChange)) || "touch" === n.webkitOverflowScrolling
            }(r))
                return r
        }
        return null
    }
    function L(e) {
        return e && Number(getComputedStyle(e).zIndex) || 0
    }
    function z(e) {
        let t = [];
        for (; e; )
            t.push(e),
            e = O(e);
        return t
    }
    function O(e) {
        let {parentNode: t} = e;
        return t && t instanceof ShadowRoot ? t.host : t
    }
    let V = 1
      , $ = 2
      , F = 4
      , B = 8
      , H = "coarse" === function() {
        if ("function" == typeof matchMedia)
            return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine"
    }()
      , U = []
      , q = !1
      , W = new Map
      , Y = new Map
      , G = new Set;
    function X(e) {
        let {target: t} = e
          , {x: r, y: n} = I(e);
        q = !0,
        Q({
            target: t,
            x: r,
            y: n
        }),
        et(),
        U.length > 0 && (er("down", e),
        ee(),
        e.preventDefault(),
        Z(t) || e.stopImmediatePropagation())
    }
    function J(e) {
        let {x: t, y: r} = I(e);
        if (q && "pointerleave" !== e.type && 0 === e.buttons && (q = !1,
        er("up", e)),
        !q) {
            let {target: n} = e;
            Q({
                target: n,
                x: t,
                y: r
            })
        }
        er("move", e),
        ee(),
        U.length > 0 && e.preventDefault()
    }
    function K(e) {
        let {target: t} = e
          , {x: r, y: n} = I(e);
        Y.clear(),
        q = !1,
        U.length > 0 && (e.preventDefault(),
        Z(t) || e.stopImmediatePropagation()),
        er("up", e),
        Q({
            target: t,
            x: r,
            y: n
        }),
        ee(),
        et()
    }
    function Z(e) {
        let t = e;
        for (; t; ) {
            if (t.hasAttribute(y))
                return !0;
            t = t.parentElement
        }
        return !1
    }
    function Q({target: e, x: t, y: r}) {
        U.splice(0);
        let n = null;
        (e instanceof HTMLElement || e instanceof SVGElement) && (n = e),
        G.forEach(e => {
            let {element: i, hitAreaMargins: a} = e
              , s = i.getBoundingClientRect()
              , {bottom: o, left: l, right: c, top: u} = s
              , d = H ? a.coarse : a.fine;
            if (t >= l - d && t <= c + d && r >= u - d && r <= o + d) {
                if (null !== n && document.contains(n) && i !== n && !i.contains(n) && !n.contains(i) && function(e, t) {
                    let r;
                    if (e === t)
                        throw Error("Cannot compare node with itself");
                    let n = {
                        a: z(e),
                        b: z(t)
                    };
                    for (; n.a.at(-1) === n.b.at(-1); )
                        e = n.a.pop(),
                        t = n.b.pop(),
                        r = e;
                    en(r, "Stacking order can only be calculated for elements with a common ancestor");
                    let i = {
                        a: L(R(n.a)),
                        b: L(R(n.b))
                    };
                    if (i.a === i.b) {
                        let e = r.childNodes
                          , t = {
                            a: n.a.at(-1),
                            b: n.b.at(-1)
                        }
                          , i = e.length;
                        for (; i--; ) {
                            let r = e[i];
                            if (r === t.a)
                                return 1;
                            if (r === t.b)
                                return -1
                        }
                    }
                    return Math.sign(i.a - i.b)
                }(n, i) > 0) {
                    let e = n
                      , t = !1;
                    for (; e; ) {
                        var h;
                        if (e.contains(i))
                            break;
                        if (h = e.getBoundingClientRect(),
                        h.x < s.x + s.width && h.x + h.width > s.x && h.y < s.y + s.height && h.y + h.height > s.y) {
                            t = !0;
                            break
                        }
                        e = e.parentElement
                    }
                    if (t)
                        return
                }
                U.push(e)
            }
        }
        )
    }
    function ee() {
        let e = !1
          , t = !1;
        U.forEach(r => {
            let {direction: n} = r;
            "horizontal" === n ? e = !0 : t = !0
        }
        );
        let r = 0;
        Y.forEach(e => {
            r |= e
        }
        ),
        e && t ? T("intersection", r, q) : e ? T("horizontal", r, q) : t ? T("vertical", r, q) : null !== A && (document.head.removeChild(A),
        C = null,
        A = null,
        M = -1)
    }
    function et() {
        var e;
        null == (e = r) || e.abort();
        let t = {
            capture: !0,
            signal: (r = new AbortController).signal
        };
        G.size && (q ? (U.length > 0 && W.forEach( (e, r) => {
            let {body: n} = r;
            e > 0 && (n.addEventListener("contextmenu", K, t),
            n.addEventListener("pointerleave", J, t),
            n.addEventListener("pointermove", J, t))
        }
        ),
        W.forEach( (e, r) => {
            let {body: n} = r;
            n.addEventListener("pointerup", K, t),
            n.addEventListener("pointercancel", K, t)
        }
        )) : W.forEach( (e, r) => {
            let {body: n} = r;
            e > 0 && (n.addEventListener("pointerdown", X, t),
            n.addEventListener("pointermove", J, t))
        }
        ))
    }
    function er(e, t) {
        G.forEach(r => {
            let {setResizeHandlerState: n} = r;
            n(e, U.includes(r), t)
        }
        )
    }
    function en(e, t) {
        if (!e)
            throw console.error(t),
            Error(t)
    }
    function ei(e, t, r=10) {
        return e.toFixed(r) === t.toFixed(r) ? 0 : e > t ? 1 : -1
    }
    function ea(e, t, r=10) {
        return 0 === ei(e, t, r)
    }
    function es(e, t, r) {
        return 0 === ei(e, t, r)
    }
    function eo({panelConstraints: e, panelIndex: t, size: r}) {
        let n = e[t];
        en(null != n, `Panel constraints not found for index ${t}`);
        let {collapsedSize: i=0, collapsible: a, maxSize: s=100, minSize: o=0} = n;
        return 0 > ei(r, o) && (r = a && 0 > ei(r, (i + o) / 2) ? i : o),
        r = parseFloat((r = Math.min(s, r)).toFixed(10))
    }
    function el({delta: e, initialLayout: t, panelConstraints: r, pivotIndices: n, prevLayout: i, trigger: a}) {
        if (es(e, 0))
            return t;
        let s = [...t]
          , [o,l] = n;
        en(null != o, "Invalid first pivot index"),
        en(null != l, "Invalid second pivot index");
        let c = 0;
        if ("keyboard" === a) {
            {
                let n = e < 0 ? l : o
                  , i = r[n];
                en(i, `Panel constraints not found for index ${n}`);
                let {collapsedSize: a=0, collapsible: s, minSize: c=0} = i;
                if (s) {
                    let r = t[n];
                    if (en(null != r, `Previous layout not found for panel index ${n}`),
                    es(r, a)) {
                        let t = c - r;
                        ei(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t)
                    }
                }
            }
            {
                let n = e < 0 ? o : l
                  , i = r[n];
                en(i, `No panel constraints found for index ${n}`);
                let {collapsedSize: a=0, collapsible: s, minSize: c=0} = i;
                if (s) {
                    let r = t[n];
                    if (en(null != r, `Previous layout not found for panel index ${n}`),
                    es(r, c)) {
                        let t = r - a;
                        ei(t, Math.abs(e)) > 0 && (e = e < 0 ? 0 - t : t)
                    }
                }
            }
        }
        {
            let n = e < 0 ? 1 : -1
              , i = e < 0 ? l : o
              , a = 0;
            for (; ; ) {
                let e = t[i];
                if (en(null != e, `Previous layout not found for panel index ${i}`),
                a += eo({
                    panelConstraints: r,
                    panelIndex: i,
                    size: 100
                }) - e,
                (i += n) < 0 || i >= r.length)
                    break
            }
            let s = Math.min(Math.abs(e), Math.abs(a));
            e = e < 0 ? 0 - s : s
        }
        {
            let n = e < 0 ? o : l;
            for (; n >= 0 && n < r.length; ) {
                let i = Math.abs(e) - Math.abs(c)
                  , a = t[n];
                en(null != a, `Previous layout not found for panel index ${n}`);
                let o = eo({
                    panelConstraints: r,
                    panelIndex: n,
                    size: a - i
                });
                if (!es(a, o) && (c += a - o,
                s[n] = o,
                c.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
                    numeric: !0
                }) >= 0))
                    break;
                e < 0 ? n-- : n++
            }
        }
        if (function(e, t, r) {
            if (e.length !== t.length)
                return !1;
            for (let r = 0; r < e.length; r++)
                if (!es(e[r], t[r], void 0))
                    return !1;
            return !0
        }(i, s))
            return i;
        {
            let n = e < 0 ? l : o
              , i = t[n];
            en(null != i, `Previous layout not found for panel index ${n}`);
            let a = i + c
              , u = eo({
                panelConstraints: r,
                panelIndex: n,
                size: a
            });
            if (s[n] = u,
            !es(u, a)) {
                let t = a - u
                  , n = e < 0 ? l : o;
                for (; n >= 0 && n < r.length; ) {
                    let i = s[n];
                    en(null != i, `Previous layout not found for panel index ${n}`);
                    let a = eo({
                        panelConstraints: r,
                        panelIndex: n,
                        size: i + t
                    });
                    if (es(i, a) || (t -= a - i,
                    s[n] = a),
                    es(t, 0))
                        break;
                    e > 0 ? n-- : n++
                }
            }
        }
        return es(s.reduce( (e, t) => t + e, 0), 100) ? s : i
    }
    function ec(e, t=document) {
        return Array.from(t.querySelectorAll(`[${v}][data-panel-group-id="${e}"]`))
    }
    function eu(e, t, r=document) {
        let n = ec(e, r).findIndex(e => e.getAttribute(v) === t);
        return null != n ? n : null
    }
    function ed(e, t, r) {
        let n = eu(e, t, r);
        return null != n ? [n, n + 1] : [-1, -1]
    }
    function eh(e, t=document) {
        if ((t instanceof HTMLElement || "object" == typeof t && null !== t && "tagName"in t && "getAttribute"in t) && t.dataset.panelGroupId == e)
            return t;
        let r = t.querySelector(`[data-panel-group][data-panel-group-id="${e}"]`);
        return r || null
    }
    function ep(e, t=document) {
        let r = t.querySelector(`[${v}="${e}"]`);
        return r || null
    }
    function em(e, t) {
        if (e.length !== t.length)
            return !1;
        for (let r = 0; r < e.length; r++)
            if (e[r] !== t[r])
                return !1;
        return !0
    }
    function ef(e, t) {
        let {x: r, y: n} = I(t);
        return "horizontal" === e ? r : n
    }
    function ex(e, t, r) {
        t.forEach( (t, n) => {
            let i = e[n];
            en(i, `Panel data not found for index ${n}`);
            let {callbacks: a, constraints: s, id: o} = i
              , {collapsedSize: l=0, collapsible: c} = s
              , u = r[o];
            if (null == u || t !== u) {
                r[o] = t;
                let {onCollapse: e, onExpand: n, onResize: i} = a;
                i && i(t, u),
                c && (e || n) && (n && (null == u || ea(u, l)) && !ea(t, l) && n(),
                e && (null == u || !ea(u, l)) && ea(t, l) && e())
            }
        }
        )
    }
    function ey(e, t) {
        if (e.length !== t.length)
            return !1;
        for (let r = 0; r < e.length; r++)
            if (e[r] != t[r])
                return !1;
        return !0
    }
    function ev(e) {
        try {
            if ("undefined" != typeof localStorage)
                e.getItem = e => localStorage.getItem(e),
                e.setItem = (e, t) => {
                    localStorage.setItem(e, t)
                }
                ;
            else
                throw Error("localStorage not supported in this environment")
        } catch (t) {
            console.error(t),
            e.getItem = () => null,
            e.setItem = () => {}
        }
    }
    function eg(e) {
        return `react-resizable-panels:${e}`
    }
    function eb(e) {
        return e.map(e => {
            let {constraints: t, id: r, idIsFromProps: n, order: i} = e;
            return n ? r : i ? `${i}:${JSON.stringify(t)}` : JSON.stringify(t)
        }
        ).sort( (e, t) => e.localeCompare(t)).join(",")
    }
    function ew(e, t) {
        try {
            let r = eg(e)
              , n = t.getItem(r);
            if (n) {
                let e = JSON.parse(n);
                if ("object" == typeof e && null != e)
                    return e
            }
        } catch (e) {}
        return null
    }
    function ej(e, t, r, n, i) {
        var a;
        let s = eg(e)
          , o = eb(t)
          , l = null != (a = ew(e, i)) ? a : {};
        l[o] = {
            expandToSizes: Object.fromEntries(r.entries()),
            layout: n
        };
        try {
            i.setItem(s, JSON.stringify(l))
        } catch (e) {
            console.error(e)
        }
    }
    function eN({layout: e, panelConstraints: t}) {
        let r = [...e]
          , n = r.reduce( (e, t) => e + t, 0);
        if (r.length !== t.length)
            throw Error(`Invalid ${t.length} panel layout: ${r.map(e => `${e}%`).join(", ")}`);
        if (!es(n, 100) && r.length > 0)
            for (let e = 0; e < t.length; e++) {
                let t = r[e];
                en(null != t, `No layout data found for index ${e}`);
                let i = 100 / n * t;
                r[e] = i
            }
        let i = 0;
        for (let e = 0; e < t.length; e++) {
            let n = r[e];
            en(null != n, `No layout data found for index ${e}`);
            let a = eo({
                panelConstraints: t,
                panelIndex: e,
                size: n
            });
            n != a && (i += n - a,
            r[e] = a)
        }
        if (!es(i, 0))
            for (let e = 0; e < t.length; e++) {
                let n = r[e];
                en(null != n, `No layout data found for index ${e}`);
                let a = eo({
                    panelConstraints: t,
                    panelIndex: e,
                    size: n + i
                });
                if (n !== a && (i -= a - n,
                r[e] = a,
                es(i, 0)))
                    break
            }
        return r
    }
    let ek = {
        getItem: e => (ev(ek),
        ek.getItem(e)),
        setItem: (e, t) => {
            ev(ek),
            ek.setItem(e, t)
        }
    }
      , eS = {};
    function eC({autoSaveId: e=null, children: t, className: r="", direction: n, forwardedRef: i, id: a=null, onLayout: s=null, keyboardResizeBy: o=null, storage: l=ek, style: c, tagName: u="div", ...d}) {
        let h = N(a)
          , y = (0,
        p.useRef)(null)
          , [b,w] = (0,
        p.useState)(null)
          , [j,k] = (0,
        p.useState)([])
          , S = function() {
            let[e,t] = (0,
            p.useState)(0);
            return (0,
            p.useCallback)( () => t(e => e + 1), [])
        }()
          , C = (0,
        p.useRef)({})
          , M = (0,
        p.useRef)(new Map)
          , A = (0,
        p.useRef)(0)
          , T = (0,
        p.useRef)({
            autoSaveId: e,
            direction: n,
            dragState: b,
            id: h,
            keyboardResizeBy: o,
            onLayout: s,
            storage: l
        })
          , I = (0,
        p.useRef)({
            layout: j,
            panelDataArray: [],
            panelDataArrayChanged: !1
        });
        (0,
        p.useRef)({
            didLogIdAndOrderWarning: !1,
            didLogPanelConstraintsWarning: !1,
            prevPanelIds: []
        }),
        (0,
        p.useImperativeHandle)(i, () => ({
            getId: () => T.current.id,
            getLayout: () => {
                let {layout: e} = I.current;
                return e
            }
            ,
            setLayout: e => {
                let {onLayout: t} = T.current
                  , {layout: r, panelDataArray: n} = I.current
                  , i = eN({
                    layout: e,
                    panelConstraints: n.map(e => e.constraints)
                });
                em(r, i) || (k(i),
                I.current.layout = i,
                t && t(i),
                ex(n, i, C.current))
            }
        }), []),
        g( () => {
            T.current.autoSaveId = e,
            T.current.direction = n,
            T.current.dragState = b,
            T.current.id = h,
            T.current.onLayout = s,
            T.current.storage = l
        }
        ),
        function({committedValuesRef: e, eagerValuesRef: t, groupId: r, layout: n, panelDataArray: i, panelGroupElement: a, setLayout: s}) {
            (0,
            p.useRef)({
                didWarnAboutMissingResizeHandle: !1
            }),
            g( () => {
                if (!a)
                    return;
                let e = ec(r, a);
                for (let t = 0; t < i.length - 1; t++) {
                    let {valueMax: r, valueMin: a, valueNow: s} = function({layout: e, panelsArray: t, pivotIndices: r}) {
                        let n = 0
                          , i = 100
                          , a = 0
                          , s = 0
                          , o = r[0];
                        return en(null != o, "No pivot index found"),
                        t.forEach( (e, t) => {
                            let {constraints: r} = e
                              , {maxSize: l=100, minSize: c=0} = r;
                            t === o ? (n = c,
                            i = l) : (a += c,
                            s += l)
                        }
                        ),
                        {
                            valueMax: Math.min(i, 100 - a),
                            valueMin: Math.max(n, 100 - s),
                            valueNow: e[o]
                        }
                    }({
                        layout: n,
                        panelsArray: i,
                        pivotIndices: [t, t + 1]
                    })
                      , o = e[t];
                    if (null == o)
                        ;
                    else {
                        let e = i[t];
                        en(e, `No panel data found for index "${t}"`),
                        o.setAttribute("aria-controls", e.id),
                        o.setAttribute("aria-valuemax", "" + Math.round(r)),
                        o.setAttribute("aria-valuemin", "" + Math.round(a)),
                        o.setAttribute("aria-valuenow", null != s ? "" + Math.round(s) : "")
                    }
                }
                return () => {
                    e.forEach( (e, t) => {
                        e.removeAttribute("aria-controls"),
                        e.removeAttribute("aria-valuemax"),
                        e.removeAttribute("aria-valuemin"),
                        e.removeAttribute("aria-valuenow")
                    }
                    )
                }
            }
            , [r, n, i, a]),
            (0,
            p.useEffect)( () => {
                if (!a)
                    return;
                let e = t.current;
                en(e, "Eager values not found");
                let {panelDataArray: i} = e;
                en(null != eh(r, a), `No group found for id "${r}"`);
                let o = ec(r, a);
                en(o, `No resize handles found for group id "${r}"`);
                let l = o.map(e => {
                    let t = e.getAttribute(v);
                    en(t, "Resize handle element has no handle id attribute");
                    let[o,l] = function(e, t, r, n=document) {
                        var i, a, s, o;
                        let l = ep(t, n)
                          , c = ec(e, n)
                          , u = l ? c.indexOf(l) : -1;
                        return [null != (i = null == (a = r[u]) ? void 0 : a.id) ? i : null, null != (s = null == (o = r[u + 1]) ? void 0 : o.id) ? s : null]
                    }(r, t, i, a);
                    if (null == o || null == l)
                        return () => {}
                        ;
                    let c = e => {
                        if (!e.defaultPrevented && "Enter" === e.key) {
                            e.preventDefault();
                            let l = i.findIndex(e => e.id === o);
                            if (l >= 0) {
                                let e = i[l];
                                en(e, `No panel data found for index ${l}`);
                                let o = n[l]
                                  , {collapsedSize: c=0, collapsible: u, minSize: d=0} = e.constraints;
                                if (null != o && u) {
                                    let e = el({
                                        delta: es(o, c) ? d - c : c - o,
                                        initialLayout: n,
                                        panelConstraints: i.map(e => e.constraints),
                                        pivotIndices: ed(r, t, a),
                                        prevLayout: n,
                                        trigger: "keyboard"
                                    });
                                    n !== e && s(e)
                                }
                            }
                        }
                    }
                    ;
                    return e.addEventListener("keydown", c),
                    () => {
                        e.removeEventListener("keydown", c)
                    }
                }
                );
                return () => {
                    l.forEach(e => e())
                }
            }
            , [a, e, t, r, n, i, s])
        }({
            committedValuesRef: T,
            eagerValuesRef: I,
            groupId: h,
            layout: j,
            panelDataArray: I.current.panelDataArray,
            setLayout: k,
            panelGroupElement: y.current
        }),
        (0,
        p.useEffect)( () => {
            let {panelDataArray: t} = I.current;
            if (e) {
                if (0 === j.length || j.length !== t.length)
                    return;
                let r = eS[e];
                null == r && (r = function(e, t=10) {
                    let r = null;
                    return (...n) => {
                        null !== r && clearTimeout(r),
                        r = setTimeout( () => {
                            e(...n)
                        }
                        , t)
                    }
                }(ej, 100),
                eS[e] = r),
                r(e, [...t], new Map(M.current), j, l)
            }
        }
        , [e, j, l]),
        (0,
        p.useEffect)( () => {}
        );
        let D = (0,
        p.useCallback)(e => {
            let {onLayout: t} = T.current
              , {layout: r, panelDataArray: n} = I.current;
            if (e.constraints.collapsible) {
                let i = n.map(e => e.constraints)
                  , {collapsedSize: a=0, panelSize: s, pivotIndices: o} = eT(n, e, r);
                if (en(null != s, `Panel size not found for panel "${e.id}"`),
                !ea(s, a)) {
                    M.current.set(e.id, s);
                    let l = el({
                        delta: eA(n, e) === n.length - 1 ? s - a : a - s,
                        initialLayout: r,
                        panelConstraints: i,
                        pivotIndices: o,
                        prevLayout: r,
                        trigger: "imperative-api"
                    });
                    ey(r, l) || (k(l),
                    I.current.layout = l,
                    t && t(l),
                    ex(n, l, C.current))
                }
            }
        }
        , [])
          , R = (0,
        p.useCallback)( (e, t) => {
            let {onLayout: r} = T.current
              , {layout: n, panelDataArray: i} = I.current;
            if (e.constraints.collapsible) {
                let a = i.map(e => e.constraints)
                  , {collapsedSize: s=0, panelSize: o=0, minSize: l=0, pivotIndices: c} = eT(i, e, n)
                  , u = null != t ? t : l;
                if (ea(o, s)) {
                    let t = M.current.get(e.id)
                      , s = null != t && t >= u ? t : u
                      , l = el({
                        delta: eA(i, e) === i.length - 1 ? o - s : s - o,
                        initialLayout: n,
                        panelConstraints: a,
                        pivotIndices: c,
                        prevLayout: n,
                        trigger: "imperative-api"
                    });
                    ey(n, l) || (k(l),
                    I.current.layout = l,
                    r && r(l),
                    ex(i, l, C.current))
                }
            }
        }
        , [])
          , L = (0,
        p.useCallback)(e => {
            let {layout: t, panelDataArray: r} = I.current
              , {panelSize: n} = eT(r, e, t);
            return en(null != n, `Panel size not found for panel "${e.id}"`),
            n
        }
        , [])
          , z = (0,
        p.useCallback)( (e, t) => {
            let {panelDataArray: r} = I.current
              , n = eA(r, e);
            return function({defaultSize: e, dragState: t, layout: r, panelData: n, panelIndex: i, precision: a=3}) {
                let s = r[i];
                return {
                    flexBasis: 0,
                    flexGrow: null == s ? void 0 != e ? e.toFixed(a) : "1" : 1 === n.length ? "1" : s.toFixed(a),
                    flexShrink: 1,
                    overflow: "hidden",
                    pointerEvents: null !== t ? "none" : void 0
                }
            }({
                defaultSize: t,
                dragState: b,
                layout: j,
                panelData: r,
                panelIndex: n
            })
        }
        , [b, j])
          , O = (0,
        p.useCallback)(e => {
            let {layout: t, panelDataArray: r} = I.current
              , {collapsedSize: n=0, collapsible: i, panelSize: a} = eT(r, e, t);
            return en(null != a, `Panel size not found for panel "${e.id}"`),
            !0 === i && ea(a, n)
        }
        , [])
          , H = (0,
        p.useCallback)(e => {
            let {layout: t, panelDataArray: r} = I.current
              , {collapsedSize: n=0, collapsible: i, panelSize: a} = eT(r, e, t);
            return en(null != a, `Panel size not found for panel "${e.id}"`),
            !i || ei(a, n) > 0
        }
        , [])
          , U = (0,
        p.useCallback)(e => {
            let {panelDataArray: t} = I.current;
            t.push(e),
            t.sort( (e, t) => {
                let r = e.order
                  , n = t.order;
                return null == r && null == n ? 0 : null == r ? -1 : null == n ? 1 : r - n
            }
            ),
            I.current.panelDataArrayChanged = !0,
            S()
        }
        , [S]);
        g( () => {
            if (I.current.panelDataArrayChanged) {
                I.current.panelDataArrayChanged = !1;
                let {autoSaveId: r, onLayout: n, storage: i} = T.current
                  , {layout: a, panelDataArray: s} = I.current
                  , o = null;
                if (r) {
                    var e, t;
                    let n = null != (t = (null != (e = ew(r, i)) ? e : {})[eb(s)]) ? t : null;
                    n && (M.current = new Map(Object.entries(n.expandToSizes)),
                    o = n.layout)
                }
                null == o && (o = function({panelDataArray: e}) {
                    let t = Array(e.length)
                      , r = e.map(e => e.constraints)
                      , n = 0
                      , i = 100;
                    for (let a = 0; a < e.length; a++) {
                        let e = r[a];
                        en(e, `Panel constraints not found for index ${a}`);
                        let {defaultSize: s} = e;
                        null != s && (n++,
                        t[a] = s,
                        i -= s)
                    }
                    for (let a = 0; a < e.length; a++) {
                        let s = r[a];
                        en(s, `Panel constraints not found for index ${a}`);
                        let {defaultSize: o} = s;
                        if (null != o)
                            continue;
                        let l = i / (e.length - n);
                        n++,
                        t[a] = l,
                        i -= l
                    }
                    return t
                }({
                    panelDataArray: s
                }));
                let l = eN({
                    layout: o,
                    panelConstraints: s.map(e => e.constraints)
                });
                em(a, l) || (k(l),
                I.current.layout = l,
                n && n(l),
                ex(s, l, C.current))
            }
        }
        ),
        g( () => {
            let e = I.current;
            return () => {
                e.layout = []
            }
        }
        , []);
        let q = (0,
        p.useCallback)(e => {
            let t = !1
              , r = y.current;
            return r && "rtl" === window.getComputedStyle(r, null).getPropertyValue("direction") && (t = !0),
            function(r) {
                var n, i;
                r.preventDefault();
                let a = y.current;
                if (!a)
                    return () => null;
                let {direction: s, dragState: o, id: l, keyboardResizeBy: c, onLayout: u} = T.current
                  , {layout: d, panelDataArray: h} = I.current
                  , {initialLayout: p} = null != o ? o : {}
                  , m = ed(l, e, a)
                  , f = function(e, t, r, n, i, a) {
                    if (P(e)) {
                        let t = "horizontal" === r
                          , n = 0;
                        n = e.shiftKey ? 100 : null != i ? i : 10;
                        let a = 0;
                        switch (e.key) {
                        case "ArrowDown":
                            a = t ? 0 : n;
                            break;
                        case "ArrowLeft":
                            a = t ? -n : 0;
                            break;
                        case "ArrowRight":
                            a = t ? n : 0;
                            break;
                        case "ArrowUp":
                            a = t ? 0 : -n;
                            break;
                        case "End":
                            a = 100;
                            break;
                        case "Home":
                            a = -100
                        }
                        return a
                    }
                    return null == n ? 0 : function(e, t, r, n, i) {
                        let a = "horizontal" === r
                          , s = ep(t, i);
                        en(s, `No resize handle element found for id "${t}"`);
                        let o = s.getAttribute(x);
                        en(o, "Resize handle element has no group id attribute");
                        let {initialCursorPosition: l} = n
                          , c = ef(r, e)
                          , u = eh(o, i);
                        en(u, `No group element found for id "${o}"`);
                        let d = u.getBoundingClientRect();
                        return (c - l) / (a ? d.width : d.height) * 100
                    }(e, t, r, n, a)
                }(r, e, s, o, c, a)
                  , v = "horizontal" === s;
                v && t && (f = -f);
                let g = el({
                    delta: f,
                    initialLayout: null != p ? p : d,
                    panelConstraints: h.map(e => e.constraints),
                    pivotIndices: m,
                    prevLayout: d,
                    trigger: P(r) ? "keyboard" : "mouse-or-touch"
                })
                  , b = !ey(d, g);
                (_(r) || E(r)) && A.current != f && ((A.current = f,
                b || 0 === f) ? Y.set(e, 0) : v ? (n = f < 0 ? V : $,
                Y.set(e, n)) : (i = f < 0 ? F : B,
                Y.set(e, i))),
                b && (k(g),
                I.current.layout = g,
                u && u(g),
                ex(h, g, C.current))
            }
        }
        , [])
          , W = (0,
        p.useCallback)( (e, t) => {
            let {onLayout: r} = T.current
              , {layout: n, panelDataArray: i} = I.current
              , a = i.map(e => e.constraints)
              , {panelSize: s, pivotIndices: o} = eT(i, e, n);
            en(null != s, `Panel size not found for panel "${e.id}"`);
            let l = el({
                delta: eA(i, e) === i.length - 1 ? s - t : t - s,
                initialLayout: n,
                panelConstraints: a,
                pivotIndices: o,
                prevLayout: n,
                trigger: "imperative-api"
            });
            ey(n, l) || (k(l),
            I.current.layout = l,
            r && r(l),
            ex(i, l, C.current))
        }
        , [])
          , G = (0,
        p.useCallback)( (e, t) => {
            let {layout: r, panelDataArray: n} = I.current
              , {collapsedSize: i=0, collapsible: a} = t
              , {collapsedSize: s=0, collapsible: o, maxSize: l=100, minSize: c=0} = e.constraints
              , {panelSize: u} = eT(n, e, r);
            null != u && (a && o && ea(u, i) ? ea(i, s) || W(e, s) : u < c ? W(e, c) : u > l && W(e, l))
        }
        , [W])
          , X = (0,
        p.useCallback)( (e, t) => {
            let {direction: r} = T.current
              , {layout: n} = I.current;
            if (!y.current)
                return;
            let i = ep(e, y.current);
            en(i, `Drag handle element not found for id "${e}"`);
            let a = ef(r, t);
            w({
                dragHandleId: e,
                dragHandleRect: i.getBoundingClientRect(),
                initialCursorPosition: a,
                initialLayout: n
            })
        }
        , [])
          , J = (0,
        p.useCallback)( () => {
            w(null)
        }
        , [])
          , K = (0,
        p.useCallback)(e => {
            let {panelDataArray: t} = I.current
              , r = eA(t, e);
            r >= 0 && (t.splice(r, 1),
            delete C.current[e.id],
            I.current.panelDataArrayChanged = !0,
            S())
        }
        , [S])
          , Z = (0,
        p.useMemo)( () => ({
            collapsePanel: D,
            direction: n,
            dragState: b,
            expandPanel: R,
            getPanelSize: L,
            getPanelStyle: z,
            groupId: h,
            isPanelCollapsed: O,
            isPanelExpanded: H,
            reevaluatePanelConstraints: G,
            registerPanel: U,
            registerResizeHandle: q,
            resizePanel: W,
            startDragging: X,
            stopDragging: J,
            unregisterPanel: K,
            panelGroupElement: y.current
        }), [D, b, n, R, L, z, h, O, H, G, U, q, W, X, J, K]);
        return (0,
        p.createElement)(m.Provider, {
            value: Z
        }, (0,
        p.createElement)(u, {
            ...d,
            children: t,
            className: r,
            id: a,
            ref: y,
            style: {
                display: "flex",
                flexDirection: "horizontal" === n ? "row" : "column",
                height: "100%",
                overflow: "hidden",
                width: "100%",
                ...c
            },
            "data-panel-group": "",
            [f]: n,
            [x]: h
        }))
    }
    let eM = (0,
    p.forwardRef)( (e, t) => (0,
    p.createElement)(eC, {
        ...e,
        forwardedRef: t
    }));
    function eA(e, t) {
        return e.findIndex(e => e === t || e.id === t.id)
    }
    function eT(e, t, r) {
        let n = eA(e, t)
          , i = n === e.length - 1
          , a = r[n];
        return {
            ...t.constraints,
            panelSize: a,
            pivotIndices: i ? [n - 1, n] : [n, n + 1]
        }
    }
    function eP({children: e=null, className: t="", disabled: r=!1, hitAreaMargins: n, id: i, onBlur: a, onClick: s, onDragging: o, onFocus: l, onPointerDown: c, onPointerUp: u, style: d={}, tabIndex: h=0, tagName: b="div", ...w}) {
        var j, k;
        let S = (0,
        p.useRef)(null)
          , C = (0,
        p.useRef)({
            onClick: s,
            onDragging: o,
            onPointerDown: c,
            onPointerUp: u
        });
        (0,
        p.useEffect)( () => {
            C.current.onClick = s,
            C.current.onDragging = o,
            C.current.onPointerDown = c,
            C.current.onPointerUp = u
        }
        );
        let M = (0,
        p.useContext)(m);
        if (null === M)
            throw Error("PanelResizeHandle components must be rendered within a PanelGroup container");
        let {direction: A, groupId: T, registerResizeHandle: P, startDragging: _, stopDragging: E, panelGroupElement: I} = M
          , D = N(i)
          , [R,L] = (0,
        p.useState)("inactive")
          , [z,O] = (0,
        p.useState)(!1)
          , [V,$] = (0,
        p.useState)(null)
          , F = (0,
        p.useRef)({
            state: R
        });
        g( () => {
            F.current.state = R
        }
        ),
        (0,
        p.useEffect)( () => {
            if (r)
                $(null);
            else {
                let e = P(D);
                $( () => e)
            }
        }
        , [r, D, P]);
        let B = null != (j = null == n ? void 0 : n.coarse) ? j : 15
          , H = null != (k = null == n ? void 0 : n.fine) ? k : 5;
        return (0,
        p.useEffect)( () => {
            if (r || null == V)
                return;
            let e = S.current;
            en(e, "Element ref not attached");
            let t = !1;
            return function(e, t, r, n, i) {
                var a;
                let {ownerDocument: s} = t
                  , o = {
                    direction: r,
                    element: t,
                    hitAreaMargins: n,
                    setResizeHandlerState: i
                }
                  , l = null != (a = W.get(s)) ? a : 0;
                return W.set(s, l + 1),
                G.add(o),
                et(),
                function() {
                    var t;
                    Y.delete(e),
                    G.delete(o);
                    let r = null != (t = W.get(s)) ? t : 1;
                    if (W.set(s, r - 1),
                    et(),
                    1 === r && W.delete(s),
                    U.includes(o)) {
                        let e = U.indexOf(o);
                        e >= 0 && U.splice(e, 1),
                        ee(),
                        i("up", !0, null)
                    }
                }
            }(D, e, A, {
                coarse: B,
                fine: H
            }, (e, r, n) => {
                if (!r)
                    return void L("inactive");
                switch (e) {
                case "down":
                    {
                        L("drag"),
                        t = !1,
                        en(n, 'Expected event to be defined for "down" action'),
                        _(D, n);
                        let {onDragging: e, onPointerDown: r} = C.current;
                        null == e || e(!0),
                        null == r || r();
                        break
                    }
                case "move":
                    {
                        let {state: e} = F.current;
                        t = !0,
                        "drag" !== e && L("hover"),
                        en(n, 'Expected event to be defined for "move" action'),
                        V(n);
                        break
                    }
                case "up":
                    {
                        L("hover"),
                        E();
                        let {onClick: e, onDragging: r, onPointerUp: n} = C.current;
                        null == r || r(!1),
                        null == n || n(),
                        t || null == e || e()
                    }
                }
            }
            )
        }
        , [B, A, r, H, P, D, V, _, E]),
        !function({disabled: e, handleId: t, resizeHandler: r, panelGroupElement: n}) {
            (0,
            p.useEffect)( () => {
                if (e || null == r || null == n)
                    return;
                let i = ep(t, n);
                if (null == i)
                    return;
                let a = e => {
                    if (!e.defaultPrevented)
                        switch (e.key) {
                        case "ArrowDown":
                        case "ArrowLeft":
                        case "ArrowRight":
                        case "ArrowUp":
                        case "End":
                        case "Home":
                            e.preventDefault(),
                            r(e);
                            break;
                        case "F6":
                            {
                                e.preventDefault();
                                let r = i.getAttribute(x);
                                en(r, `No group element found for id "${r}"`);
                                let a = ec(r, n)
                                  , s = eu(r, t, n);
                                en(null !== s, `No resize element found for id "${t}"`);
                                let o = e.shiftKey ? s > 0 ? s - 1 : a.length - 1 : s + 1 < a.length ? s + 1 : 0;
                                a[o].focus()
                            }
                        }
                }
                ;
                return i.addEventListener("keydown", a),
                () => {
                    i.removeEventListener("keydown", a)
                }
            }
            , [n, e, t, r])
        }({
            disabled: r,
            handleId: D,
            resizeHandler: V,
            panelGroupElement: I
        }),
        (0,
        p.createElement)(b, {
            ...w,
            children: e,
            className: t,
            id: i,
            onBlur: () => {
                O(!1),
                null == a || a()
            }
            ,
            onFocus: () => {
                O(!0),
                null == l || l()
            }
            ,
            ref: S,
            role: "separator",
            style: {
                touchAction: "none",
                userSelect: "none",
                ...d
            },
            tabIndex: h,
            [f]: A,
            [x]: T,
            [y]: "",
            "data-resize-handle-active": "drag" === R ? "pointer" : z ? "keyboard" : void 0,
            "data-panel-resize-handle-enabled": !r,
            [v]: D,
            "data-resize-handle-state": R
        })
    }
    eC.displayName = "PanelGroup",
    eM.displayName = "forwardRef(PanelGroup)",
    eP.displayName = "PanelResizeHandle";
    let e_ = e => {
        let t, r = new Set, n = (e, n) => {
            let i = "function" == typeof e ? e(t) : e;
            if (!Object.is(i, t)) {
                let e = t;
                t = (null != n ? n : "object" != typeof i || null === i) ? i : Object.assign({}, t, i),
                r.forEach(r => r(t, e))
            }
        }
        , i = () => t, a = {
            setState: n,
            getState: i,
            getInitialState: () => s,
            subscribe: e => (r.add(e),
            () => r.delete(e))
        }, s = t = e(n, i, a);
        return a
    }
      , eE = e => {
        let t = e ? e_(e) : e_
          , r = e => (function(e, t=e => e) {
            let r = p.default.useSyncExternalStore(e.subscribe, p.default.useCallback( () => t(e.getState()), [e, t]), p.default.useCallback( () => t(e.getInitialState()), [e, t]));
            return p.default.useDebugValue(r),
            r
        }
        )(t, e);
        return Object.assign(r, t),
        r
    }
      , eI = e => e ? eE(e) : eE;
    function eD(e, t) {
        let r;
        try {
            r = e()
        } catch (e) {
            return
        }
        return {
            getItem: e => {
                var n;
                let i = e => null === e ? null : JSON.parse(e, null == t ? void 0 : t.reviver)
                  , a = null != (n = r.getItem(e)) ? n : null;
                return a instanceof Promise ? a.then(i) : i(a)
            }
            ,
            setItem: (e, n) => r.setItem(e, JSON.stringify(n, null == t ? void 0 : t.replacer)),
            removeItem: e => r.removeItem(e)
        }
    }
    let eR = e => t => {
        try {
            let r = e(t);
            if (r instanceof Promise)
                return r;
            return {
                then: e => eR(e)(r),
                catch(e) {
                    return this
                }
            }
        } catch (e) {
            return {
                then(e) {
                    return this
                },
                catch: t => eR(t)(e)
            }
        }
    }
      , eL = (e, t) => (r, n, i) => {
        let a, s = {
            storage: eD( () => localStorage),
            partialize: e => e,
            version: 0,
            merge: (e, t) => ({
                ...t,
                ...e
            }),
            ...t
        }, o = !1, l = new Set, c = new Set, u = s.storage;
        if (!u)
            return e( (...e) => {
                console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),
                r(...e)
            }
            , n, i);
        let d = () => {
            let e = s.partialize({
                ...n()
            });
            return u.setItem(s.name, {
                state: e,
                version: s.version
            })
        }
          , h = i.setState;
        i.setState = (e, t) => (h(e, t),
        d());
        let p = e( (...e) => (r(...e),
        d()), n, i);
        i.getInitialState = () => p;
        let m = () => {
            var e, t;
            if (!u)
                return;
            o = !1,
            l.forEach(e => {
                var t;
                return e(null != (t = n()) ? t : p)
            }
            );
            let i = (null == (t = s.onRehydrateStorage) ? void 0 : t.call(s, null != (e = n()) ? e : p)) || void 0;
            return eR(u.getItem.bind(u))(s.name).then(e => {
                if (e)
                    if ("number" != typeof e.version || e.version === s.version)
                        return [!1, e.state];
                    else {
                        if (s.migrate) {
                            let t = s.migrate(e.state, e.version);
                            return t instanceof Promise ? t.then(e => [!0, e]) : [!0, t]
                        }
                        console.error("State loaded from storage couldn't be migrated since no migrate function was provided")
                    }
                return [!1, void 0]
            }
            ).then(e => {
                var t;
                let[i,o] = e;
                if (r(a = s.merge(o, null != (t = n()) ? t : p), !0),
                i)
                    return d()
            }
            ).then( () => {
                null == i || i(a, void 0),
                a = n(),
                o = !0,
                c.forEach(e => e(a))
            }
            ).catch(e => {
                null == i || i(void 0, e)
            }
            )
        }
        ;
        return i.persist = {
            setOptions: e => {
                s = {
                    ...s,
                    ...e
                },
                e.storage && (u = e.storage)
            }
            ,
            clearStorage: () => {
                null == u || u.removeItem(s.name)
            }
            ,
            getOptions: () => s,
            rehydrate: () => m(),
            hasHydrated: () => o,
            onHydrate: e => (l.add(e),
            () => {
                l.delete(e)
            }
            ),
            onFinishHydration: e => (c.add(e),
            () => {
                c.delete(e)
            }
            )
        },
        s.skipHydration || m(),
        a || p
    }
      , ez = eI()(eL( (e, t) => ({
        currentView: "home",
        sidebarOpen: !0,
        sidebarCollapsed: !1,
        mobileMenuOpen: !1,
        navigationHistory: ["home"],
        canGoBack: !1,
        setCurrentView: t => e(e => ({
            currentView: t,
            navigationHistory: [...e.navigationHistory, t],
            canGoBack: e.navigationHistory.length > 0,
            mobileMenuOpen: !1
        })),
        toggleSidebar: () => e(e => ({
            sidebarOpen: !e.sidebarOpen
        })),
        setSidebarCollapsed: t => e({
            sidebarCollapsed: t
        }),
        setMobileMenuOpen: t => e({
            mobileMenuOpen: t
        }),
        goBack: () => {
            let r = t().navigationHistory;
            if (r.length > 1) {
                let t = r.slice(0, -1);
                e({
                    currentView: t[t.length - 1],
                    navigationHistory: t,
                    canGoBack: t.length > 1
                })
            }
        }
    }), {
        name: "navigation-storage",
        partialize: e => ({
            sidebarCollapsed: e.sidebarCollapsed,
            currentView: e.currentView
        })
    }))
      , eO = (e, t) => t.some(t => e instanceof t)
      , eV = new WeakMap
      , e$ = new WeakMap
      , eF = new WeakMap
      , eB = {
        get(e, t, r) {
            if (e instanceof IDBTransaction) {
                if ("done" === t)
                    return eV.get(e);
                if ("store" === t)
                    return r.objectStoreNames[1] ? void 0 : r.objectStore(r.objectStoreNames[0])
            }
            return eH(e[t])
        },
        set: (e, t, r) => (e[t] = r,
        !0),
        has: (e, t) => e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
    };
    function eH(e) {
        if (e instanceof IDBRequest) {
            let t;
            return t = new Promise( (t, r) => {
                let n = () => {
                    e.removeEventListener("success", i),
                    e.removeEventListener("error", a)
                }
                  , i = () => {
                    t(eH(e.result)),
                    n()
                }
                  , a = () => {
                    r(e.error),
                    n()
                }
                ;
                e.addEventListener("success", i),
                e.addEventListener("error", a)
            }
            ),
            eF.set(t, e),
            t
        }
        if (e$.has(e))
            return e$.get(e);
        let t = function(e) {
            if ("function" == typeof e)
                return (i || (i = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e) ? function(...t) {
                    return e.apply(eU(this), t),
                    eH(this.request)
                }
                : function(...t) {
                    return eH(e.apply(eU(this), t))
                }
                ;
            return (e instanceof IDBTransaction && function(e) {
                if (eV.has(e))
                    return;
                let t = new Promise( (t, r) => {
                    let n = () => {
                        e.removeEventListener("complete", i),
                        e.removeEventListener("error", a),
                        e.removeEventListener("abort", a)
                    }
                      , i = () => {
                        t(),
                        n()
                    }
                      , a = () => {
                        r(e.error || new DOMException("AbortError","AbortError")),
                        n()
                    }
                    ;
                    e.addEventListener("complete", i),
                    e.addEventListener("error", a),
                    e.addEventListener("abort", a)
                }
                );
                eV.set(e, t)
            }(e),
            eO(e, n || (n = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]))) ? new Proxy(e,eB) : e
        }(e);
        return t !== e && (e$.set(e, t),
        eF.set(t, e)),
        t
    }
    let eU = e => eF.get(e)
      , eq = ["get", "getKey", "getAll", "getAllKeys", "count"]
      , eW = ["put", "add", "delete", "clear"]
      , eY = new Map;
    function eG(e, t) {
        if (!(e instanceof IDBDatabase && !(t in e) && "string" == typeof t))
            return;
        if (eY.get(t))
            return eY.get(t);
        let r = t.replace(/FromIndex$/, "")
          , n = t !== r
          , i = eW.includes(r);
        if (!(r in (n ? IDBIndex : IDBObjectStore).prototype) || !(i || eq.includes(r)))
            return;
        let a = async function(e, ...t) {
            let a = this.transaction(e, i ? "readwrite" : "readonly")
              , s = a.store;
            return n && (s = s.index(t.shift())),
            (await Promise.all([s[r](...t), i && a.done]))[0]
        };
        return eY.set(t, a),
        a
    }
    eB = {
        ...o = eB,
        get: (e, t, r) => eG(e, t) || o.get(e, t, r),
        has: (e, t) => !!eG(e, t) || o.has(e, t)
    };
    let eX = ["continue", "continuePrimaryKey", "advance"]
      , eJ = {}
      , eK = new WeakMap
      , eZ = new WeakMap
      , eQ = {
        get(e, t) {
            if (!eX.includes(t))
                return e[t];
            let r = eJ[t];
            return r || (r = eJ[t] = function(...e) {
                eK.set(this, eZ.get(this)[t](...e))
            }
            ),
            r
        }
    };
    async function *e0(...e) {
        let t = this;
        if (t instanceof IDBCursor || (t = await t.openCursor(...e)),
        !t)
            return;
        let r = new Proxy(t,eQ);
        for (eZ.set(r, t),
        eF.set(r, eU(t)); t; )
            yield r,
            t = await (eK.get(r) || t.continue()),
            eK.delete(r)
    }
    function e1(e, t) {
        return t === Symbol.asyncIterator && eO(e, [IDBIndex, IDBObjectStore, IDBCursor]) || "iterate" === t && eO(e, [IDBIndex, IDBObjectStore])
    }
    eB = {
        ...l = eB,
        get: (e, t, r) => e1(e, t) ? e0 : l.get(e, t, r),
        has: (e, t) => e1(e, t) || l.has(e, t)
    };
    let e2 = null;
    async function e5() {
        return e2 || (e2 = await function(e, t, {blocked: r, upgrade: n, blocking: i, terminated: a}={}) {
            let s = indexedDB.open(e, 1)
              , o = eH(s);
            return n && s.addEventListener("upgradeneeded", e => {
                n(eH(s.result), e.oldVersion, e.newVersion, eH(s.transaction), e)
            }
            ),
            r && s.addEventListener("blocked", e => r(e.oldVersion, e.newVersion, e)),
            o.then(e => {
                a && e.addEventListener("close", () => a()),
                i && e.addEventListener("versionchange", e => i(e.oldVersion, e.newVersion, e))
            }
            ).catch( () => {}
            ),
            o
        }("y7-jprompter-db", 0, {
            upgrade(e) {
                e.objectStoreNames.contains("converter") || e.createObjectStore("converter"),
                e.objectStoreNames.contains("learning") || e.createObjectStore("learning"),
                e.objectStoreNames.contains("history") || e.createObjectStore("history", {
                    keyPath: "id"
                }).createIndex("by-timestamp", "timestamp")
            }
        }))
    }
    async function e4(e, t) {
        try {
            let r = await e5()
              , n = await r.get(e, t);
            return n ? JSON.parse(n) : null
        } catch (t) {
            return console.error(`Error getting value from ${e}:`, t),
            null
        }
    }
    async function e3(e, t, r) {
        try {
            let n = await e5();
            await n.put(e, JSON.stringify(r), t)
        } catch (t) {
            console.error(`Error setting value in ${e}:`, t)
        }
    }
    async function e6(e, t) {
        try {
            let r = await e5();
            await r.delete(e, t)
        } catch (t) {
            console.error(`Error deleting value from ${e}:`, t)
        }
    }
    function e8(e) {
        if (function() {
            try {
                return "indexedDB"in window && null !== window.indexedDB
            } catch {
                return !1
            }
        }())
            return {
                getItem: async t => {
                    try {
                        return await e4(e, t)
                    } catch (e) {
                        return console.error(`Error loading ${t} from IndexedDB:`, e),
                        null
                    }
                }
                ,
                setItem: async (t, r) => {
                    try {
                        await e3(e, t, r)
                    } catch (e) {
                        console.error(`Error saving ${t} to IndexedDB:`, e)
                    }
                }
                ,
                removeItem: async t => {
                    try {
                        await e6(e, t)
                    } catch (e) {
                        console.error(`Error removing ${t} from IndexedDB:`, e)
                    }
                }
            };
        return {
            getItem: e => localStorage.getItem(e),
            setItem: (e, t) => {
                localStorage.setItem(e, t)
            }
            ,
            removeItem: e => {
                localStorage.removeItem(e)
            }
        }
    }
    let e9 = {
        totalConversions: 0,
        averageScore: 0,
        bestScore: 0,
        masteredCategories: [],
        currentStreak: 0,
        longestStreak: 0,
        achievements: [],
        lastActivityAt: new Date
    }
      , e7 = eI()(eL( (e, t) => ({
        skills: e9,
        currentTip: null,
        tipLastFetched: null,
        chatMessages: [],
        isChatLoading: !1,
        updateSkillsFromFeedback: t => e(e => {
            let r = e.skills.totalConversions + 1
              , n = (e.skills.averageScore * e.skills.totalConversions + t.overallScore) / r;
            return {
                skills: {
                    ...e.skills,
                    totalConversions: r,
                    averageScore: Math.round(10 * n) / 10,
                    bestScore: Math.max(e.skills.bestScore, t.overallScore),
                    masteredCategories: [...new Set([...e.skills.masteredCategories, ...t.skillsImproved])],
                    lastActivityAt: new Date
                }
            }
        }
        ),
        incrementStreak: () => e(e => {
            let t = e.skills.currentStreak + 1;
            return {
                skills: {
                    ...e.skills,
                    currentStreak: t,
                    longestStreak: Math.max(e.skills.longestStreak, t),
                    lastActivityAt: new Date
                }
            }
        }
        ),
        resetStreak: () => e(e => ({
            skills: {
                ...e.skills,
                currentStreak: 0
            }
        })),
        addAchievement: (t, r, n) => e(e => e.skills.achievements.some(e => e.id === t) ? e : {
            skills: {
                ...e.skills,
                achievements: [...e.skills.achievements, {
                    id: t,
                    name: r,
                    description: n,
                    icon: "trophy",
                    unlockedAt: new Date
                }]
            }
        }),
        fetchDailyTip: async () => {
            let {tipLastFetched: r} = t();
            if (r) {
                let e = new Date(r)
                  , t = new Date;
                if (e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear())
                    return
            }
            try {
                let t = await fetch("/api/daily-tip");
                if (t.ok) {
                    let r = await t.json();
                    e({
                        currentTip: {
                            ...r,
                            fetchedAt: new Date
                        },
                        tipLastFetched: new Date
                    })
                }
            } catch (e) {
                console.error("Failed to fetch daily tip:", e)
            }
        }
        ,
        setCurrentTip: t => e({
            currentTip: t
        }),
        addChatMessage: t => e(e => ({
            chatMessages: [...e.chatMessages, {
                ...t,
                id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                timestamp: new Date
            }]
        })),
        clearChat: () => e({
            chatMessages: []
        }),
        setIsChatLoading: t => e({
            isChatLoading: t
        }),
        sendChatMessage: async e => {
            let {addChatMessage: r, setIsChatLoading: n} = t();
            r({
                role: "user",
                content: e
            }),
            n(!0);
            try {
                let t = await fetch("/api/feedback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        originalPrompt: e,
                        jsonPrompt: {
                            question: e
                        }
                    })
                });
                if (t.ok) {
                    let e = await t.json();
                    r({
                        role: "assistant",
                        content: e.suggestions?.join("\n\n") || "I can help you learn about prompt engineering. Try asking about JSON structures, complexity levels, or best practices!"
                    })
                } else
                    r({
                        role: "assistant",
                        content: "I apologize, but I encountered an error. Please try again."
                    })
            } catch (e) {
                r({
                    role: "assistant",
                    content: "I apologize, but I encountered an error. Please try again."
                })
            } finally {
                n(!1)
            }
        }
        ,
        resetProgress: () => e({
            skills: e9,
            chatMessages: [],
            currentTip: null,
            tipLastFetched: null
        })
    }), {
        name: "y7-jprompter-learning",
        storage: eD( () => e8("learning")),
        partialize: e => ({
            skills: e.skills,
            currentTip: e.currentTip,
            tipLastFetched: e.tipLastFetched
        })
    }))
      , te = eI()(eL( (e, t) => ({
        inputText: "",
        complexity: 4,
        contextInjection: "",
        jsonOutput: null,
        formattedOutput: "",
        explanation: "",
        previousOutput: null,
        conceptGraph: null,
        activeOutputView: "json",
        isLoading: !1,
        error: null,
        isModalOpen: !1,
        history: [],
        setInputText: t => e({
            inputText: t
        }),
        setComplexity: t => e({
            complexity: t
        }),
        setContextInjection: t => e({
            contextInjection: t
        }),
        setJsonOutput: t => e(e => ({
            previousOutput: e.jsonOutput,
            jsonOutput: t
        })),
        setFormattedOutput: t => e({
            formattedOutput: t
        }),
        setExplanation: t => e({
            explanation: t
        }),
        setConceptGraph: t => e({
            conceptGraph: t
        }),
        setActiveOutputView: t => e({
            activeOutputView: t
        }),
        setIsLoading: t => e({
            isLoading: t
        }),
        setError: t => e({
            error: t
        }),
        setIsModalOpen: t => e({
            isModalOpen: t
        }),
        convert: async () => {
            let {inputText: r, complexity: n, contextInjection: i} = t();
            if (!r.trim())
                return void e({
                    error: "Please enter a prompt to convert"
                });
            e({
                isLoading: !0,
                error: null
            });
            try {
                let a = localStorage.getItem("gemini-api-key") || void 0
                  , s = localStorage.getItem("client-fingerprint") || function() {
                    let e = document.createElement("canvas")
                      , t = e.getContext("2d");
                    t && (t.textBaseline = "top",
                    t.font = "14px Arial",
                    t.fillText("y7-jprompter-fp", 2, 2));
                    let r = [navigator.userAgent, navigator.language, screen.width, screen.height, screen.colorDepth, new Date().getTimezoneOffset(), e.toDataURL()].join("|")
                      , n = 0;
                    for (let e = 0; e < r.length; e++)
                        n = (n << 5) - n + r.charCodeAt(e),
                        n &= n;
                    return Math.abs(n).toString(36)
                }();
                s && localStorage.setItem("client-fingerprint", s);

                function extractJSON(text) {
                    console.log('[extractJSON] Processing response (length:', text.length, ')');
                    
                    // Strategy 1: Remove markdown code blocks
                    const cleanedText = text.replace(/```(?:json)?\s*([\s\S]*?)```/g, '$1').trim();
                    
                    // Strategy 2: Try to parse the entire cleaned text
                    try {
                        const parsed = JSON.parse(cleanedText);
                        console.log('[extractJSON] Success: Direct parse');
                        return parsed;
                    } catch {
                        // Strategy 3: Find JSON object with balanced braces
                        const jsonMatches = cleanedText.matchAll(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
                        const matches = Array.from(jsonMatches);
                        
                        for (const match of matches) {
                        try {
                            const parsed = JSON.parse(match[0]);
                            console.log('[extractJSON] Success: Pattern match');
                            return parsed;
                        } catch {
                            continue;
                        }
                        }
                        
                        // Strategy 4: Try to find any object-like structure and fix common issues
                        const simpleMatch = cleanedText.match(/\{[\s\S]*\}/);
                        if (simpleMatch) {
                        const jsonStr = simpleMatch[0]
                            .replace(/([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":') // Add quotes to keys
                            .replace(/:\s*'([^']*)'/g, ':"$1"') // Replace single quotes with double
                            .replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
                        
                        try {
                            const parsed = JSON.parse(jsonStr);
                            console.log('[extractJSON] Success: Fixed JSON');
                            return parsed;
                        } catch (e3) {
                            console.error('[extractJSON] All strategies failed');
                            console.error('Original text:', text.substring(0, 300));
                            console.error('Last parse error:', e3);
                        }
                        }
                    }
                    
                    throw new Error('No valid JSON structure found in response');
                }

                /**
                 * Detect language from text (English or French)
                 */
                function detectLanguage(text){
                  const frenchChars = /[àâäéèêëïîôöùûüÿñç]/i;
                  const frenchWords =
                    /\b(le|la|les|et|ou|mais|avec|pour|dans|sur|par|comme|si|alors|donc|or|ni|car)\b/i;
                
                  if (frenchChars.test(text) || frenchWords.test(text)) {
                    return 'fr';
                  }
                  return 'en';
                }
                
                /**
                 * Get translated field names based on language
                 */
                function getTranslatedKeys(language) {
                  const translations = {
                    en: {
                      task: 'task',
                      input: 'input',
                      output_format: 'output_format',
                      requirements: 'requirements',
                      context: 'context',
                      constraints: 'constraints',
                      examples: 'examples',
                    },
                    fr: {
                      task: 'tâche',
                      input: 'entrée',
                      output_format: 'format_de_sortie',
                      requirements: 'exigences',
                      context: 'contexte',
                      constraints: 'contraintes',
                      examples: 'exemples',
                    },
                  };
                
                  return translations[language];
                }


                const GENERATION_CONFIGS = {
                    conversion: {
                        temperature: 0.3,
                        topP: 0.8,
                        maxOutputTokens: 4096,
                    },
                    extraction: {
                        temperature: 0.2,
                        topP: 0.9,
                        maxOutputTokens: 2048,
                    },
                    feedback: {
                        temperature: 0.4,
                        topP: 0.9,
                        maxOutputTokens: 1024,
                    },
                    explanation: {
                        temperature: 0.4,
                        topP: 0.9,
                        maxOutputTokens: 1024,
                    },
                    summary: {
                        temperature: 0.2,
                        maxOutputTokens: 200,
                    },
                    tip: {
                        temperature: 0.7,
                        maxOutputTokens: 512,
                    },
                };

               

                const language = detectLanguage(prompt);
                const keys = getTranslatedKeys(language);

                async function convertPromptToJSON(
                  prompt,
                  complexity,
                  contextInjection,
                  customApiKey
                ){

                    const language = detectLanguage(r);
                    const keys = getTranslatedKeys(language);
                
                    // Build optimized system prompt (shorter = fewer tokens = lower cost)
                    const fields = [keys.task, keys.input, keys.output_format, keys.requirements];
                    if (complexity >= 3) fields.push(keys.context, keys.constraints);
                    if (complexity >= 4) fields.push(keys.examples);
                    // Extremely concise prompt to minimize tokens
                    const systemPrompt = `Convert to JSON (level ${complexity}/7)${contextInjection ? `. Ctx: ${contextInjection.slice(0, 80)}` : ''}. Fields: ${fields.join(', ')}. Input: "${r}". Return ONLY valid JSON, no text.`;
                    const url= "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
                    const headers= {
                        "x-goog-api-key": a,
                        "Content-Type": "application/json"
                    };
                    const payload= {
                        contents: [
                            { role: 'user', parts: [{ text: systemPrompt }] }
                        ],
                        generationConfig: GENERATION_CONFIGS.conversion,
                    }
                    try {
                    const result= await fetch(url, 
                        {
                            method: "POST",
                            headers: headers, 
                            body: JSON.stringify(payload)
                        } 
                    );

                    console.log(result)
                    const resp=  await result.json();
                    console.log(resp );
                
                    const responseText =  resp['candidates'][0]['content']['parts'][0]['text']; //result.response.text();
                    console.log('[Gemini] Response received (length:', responseText.length, ')');
                    console.log('[Gemini] First 200 chars:', responseText.substring(0, 200));
                    
                    const json = extractJSON(responseText);
                    console.log('[Gemini] JSON extracted successfully, keys:', Object.keys(json).join(', '));
                    
                    // Generate simple explanation (no API call to save quota!)
                    const fieldCount = Object.keys(json).length;
                    const explanation = `Structured prompt with ${fieldCount} field${fieldCount === 1 ? '' : 's'}: ${Object.keys(json).join(', ')}. This format provides clear structure and reduces ambiguity for better AI responses.`;
                    return { json, explanation };
                    } catch (error) {
                    console.error('Gemini API error:', error);
                    console.error('Error details:', {
                        name: error instanceof Error ? error.name : 'Unknown',
                        message: error instanceof Error ? error.message : String(error),
                        stack: error instanceof Error ? error.stack : undefined,
                    });
                    
                    if (error instanceof Error) {
                        const errorMsg = error.message.toLowerCase();
                        
                        if (errorMsg.includes('api key') || errorMsg.includes('api_key_invalid')) {
                        console.error('[Gemini] API Key error:', error.message);
                        throw new Error('Invalid API key. Please check your Gemini API key in Settings.');
                        }
                        if (errorMsg.includes('resource_exhausted')) {
                        console.error('[Gemini] Quota exhausted:', error.message);
                        throw new Error('API quota exceeded. Please try again later or check your API key limits.');
                        }
                        if (errorMsg.includes('not found') || errorMsg.includes('model')) {
                        console.error('[Gemini] Model error:', error.message);
                        throw new Error(`Model error: ${error.message}. The model may not be available.`);
                        }
                        if (errorMsg.includes('invalid') || errorMsg.includes('malformed')) {
                        console.error('[Gemini] Request format error:', error.message);
                        throw new Error('Request format error. Please try a simpler prompt.');
                        }
                        console.error('[Gemini] Unknown error:', error);
                        throw error;
                    }
                    throw new Error('Failed to convert prompt');
                    }
                }

                function extractConceptsFromJSON(json, complexity) {
                    const nodes = [];
                    const relationships = [];
                    
                    // Extract nodes from JSON keys (no duplicate root task)
                    const entries = Object.entries(json);
                    let hasTaskNode = false;
                    
                    entries.forEach(([key, value], index) => {
                        const nodeId = key.toLowerCase().replace(/[^a-z0-9]/g, '_');
                        
                        // Determine category based on key name
                        let category = 'context';
                        if (key.includes('task') || key.includes('tâche') || key.includes('action')) {
                        category = 'task';
                        hasTaskNode = true;
                        }
                        else if (key.includes('input') || key.includes('entrée') || key.includes('data')) category = 'context';
                        else if (key.includes('output') || key.includes('sortie') || key.includes('format')) category = 'output';
                        else if (key.includes('requirement') || key.includes('exigence') || key.includes('spec')) category = 'constraints';
                        else if (key.includes('constraint') || key.includes('contrainte') || key.includes('limit')) category = 'constraints';
                        else if (key.includes('example') || key.includes('exemple') || key.includes('sample')) category = 'examples';
                        else if (key.includes('context') || key.includes('contexte') || key.includes('background')) category = 'context';
                        
                        // Weight based on category importance
                        let weight = 0.5;
                        if (category === 'task') weight = 1.0;
                        else if (category === 'output') weight = 0.8;
                        else if (category === 'constraints') weight = 0.7;
                        else if (category === 'context') weight = 0.6;
                        else if (category === 'examples') weight = 0.5;
                        
                        nodes.push({ 
                        id: nodeId,
                        label: key.length > 20 ? key.substring(0, 17) + '...' : key,
                        category,
                        weight,
                        depth: category === 'task' ? 0 : 1,
                        confidence: 0.9
                        });
                        
                        // Create relationships - connect to task node if it exists
                        if (category !== 'task' && hasTaskNode) {
                        const taskNodeId = entries.find(([k]) => 
                            k.includes('task') || k.includes('tâche') || k.includes('action')
                        )?.[0].toLowerCase().replace(/[^a-z0-9]/g, '_');
                        
                        if (taskNodeId) {
                            const relType = category === 'constraints' ? 'requires' : 'influences';
                            relationships.push({
                            source: taskNodeId,
                            target: nodeId,
                            type: relType,
                            strength: category === 'output' ? 0.9 : 0.7
                            });
                        }
                        }
                        
                        // Create child nodes for arrays with actual content
                        if (Array.isArray(value) && value.length > 0) {
                        value.slice(0, complexity >= 5 ? 3 : 2).forEach((item, idx) => {
                            if (item && (typeof item === 'string' || typeof item === 'object')) {
                            const childId = `${nodeId}_${idx}`;
                            const label = typeof item === 'string' 
                                ? (item.length > 15 ? item.substring(0, 12) + '...' : item)
                                : typeof item === 'object' && item !== null
                                ? Object.keys(item)[0] || `Item ${idx + 1}`
                                : `Item ${idx + 1}`;
                                
                            nodes.push({
                                id: childId,
                                label,
                                category: 'examples',
                                weight: 0.3,
                                depth: 2,
                                confidence: 0.8
                            });
                            relationships.push({
                                source: nodeId,
                                target: childId,
                                type: 'requires',
                                strength: 0.5
                            });
                            }
                        });
                        }
                        // Handle object values
                        else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        Object.entries(value).slice(0, 2).forEach(([subKey, subValue]) => {
                            const childId = `${nodeId}_${subKey.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
                            nodes.push({
                            id: childId,
                            label: subKey.length > 15 ? subKey.substring(0, 12) + '...' : subKey,
                            category: 'context',
                            weight: 0.4,
                            depth: 2,
                            confidence: 0.85
                            });
                            relationships.push({
                            source: nodeId,
                            target: childId,
                            type: 'influences',
                            strength: 0.6
                            });
                        });
                        }
                    });
                    
                    // For complexity 5+, add some interconnections between nodes
                    if (complexity >= 5 && nodes.length > 3) {
                        const outputNode = nodes.find(n => n.category === 'output');
                        const constraintNode = nodes.find(n => n.category === 'constraints');
                        if (outputNode && constraintNode) {
                        relationships.push({
                            source: constraintNode.id,
                            target: outputNode.id,
                            type: 'requires',
                            strength: 0.6
                        });
                        }
                    }
                    
                    return { 
                        nodes, 
                        relationships,
                        bifurcated: complexity >= 5
                    };
                }

                async function post(){
                    // Truncate very long prompts (don't waste API call on summarization)
                    let processedPrompt = prompt;
                    if (prompt.length > 2000) {
                    processedPrompt = prompt.substring(0, 2000) + '...';
                    console.log('[API] Truncated long prompt from', prompt.length, 'to', processedPrompt.length);
                    }
                                    // Convert prompt to JSON (pass custom API key if provided)
                    const { json, explanation } = await convertPromptToJSON(
                        processedPrompt,
                        n,
                        i,
                        a
                    );
                
                    // Extract concepts from JSON locally (no API call needed)
                    const conceptGraph = extractConceptsFromJSON(json, n);
                
                    // Format the JSON for display
                    const formatted = JSON.stringify(json, null, 2);
                
                    return {
                        json,
                        formatted,
                        explanation,
                        conceptGraph: {
                            ...conceptGraph,
                            n, //complexity
                        },
                    };
                }
                



                // Build optimized system prompt (shorter = fewer tokens = lower cost)
                const fields = [keys.task, keys.input, keys.output_format, keys.requirements];
                if (n >= 3) fields.push(keys.context, keys.constraints);
                if (n >= 4) fields.push(keys.examples);


                let l = await post()//await o.json();
                e(e => ({
                    previousOutput: e.jsonOutput,
                    jsonOutput: l.json,
                    formattedOutput: l.formatted,
                    explanation: l.explanation,
                    conceptGraph: l.conceptGraph,
                    isLoading: !1
                }));
                let c = {
                    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    input: {
                        text: r,
                        complexity: n,
                        contextInjection: i
                    },
                    output: {
                        json: l.json, //l.json,
                        formatted: l.formatted,
                        explanation: l.explanation,
                        conceptGraph: l.conceptGraph
                    },
                    timestamp: new Date
                };
                t().addToHistory(c),
                e7.getState().updateSkillsFromFeedback({
                    overallScore: 75 + Math.floor(25 * Math.random()),
                    axes: {
                        clarity: 80,
                        specificity: 75,
                        structure: 85,
                        actionability: 70,
                        creativity: 80
                    },
                    suggestions: [],
                    skillsImproved: [],
                    timestamp: new Date
                })
            } catch (t) {
                throw e({
                    error: t instanceof Error ? t.message : "An error occurred",
                    isLoading: !1
                }),
                t
            }
        }
        ,
        clearAll: () => e({
            inputText: "",
            contextInjection: "",
            jsonOutput: null,
            formattedOutput: "",
            explanation: "",
            previousOutput: null,
            conceptGraph: null,
            error: null
        }),
        applyTemplate: t => e({
            jsonOutput: t.structure,
            formattedOutput: JSON.stringify(t.structure, null, 2),
            explanation: `Template: ${t.name}

${t.description}`,
            activeOutputView: "json"
        }),
        addToHistory: t => e(e => ({
            history: [t, ...e.history].slice(0, 50)
        })),
        clearHistory: () => e({
            history: []
        }),
        removeFromHistory: t => e(e => ({
            history: e.history.filter(e => e.id !== t)
        })),
        loadFromHistory: t => e({
            inputText: t.input.text,
            complexity: t.input.complexity,
            contextInjection: t.input.contextInjection || "",
            jsonOutput: t.output.json,
            formattedOutput: t.output.formatted,
            explanation: t.output.explanation,
            conceptGraph: t.output.conceptGraph
        }),
        exportHistory: () => {
            let {history: e} = t();
            return JSON.stringify(e, null, 2)
        }
        ,
        importHistory: t => {
            try {
                let r = JSON.parse(t);
                Array.isArray(r) && e({
                    history: r
                })
            } catch (e) {
                console.error("Failed to import history:", e)
            }
        }
    }), {
        name: "y7-jprompter-converter",
        storage: eD( () => e8("converter")),
        partialize: e => ({
            history: e.history,
            complexity: e.complexity,
            contextInjection: e.contextInjection
        })
    }))
      , tt = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
      , tr = new Set(tt)
      , tn = e => 180 * e / Math.PI
      , ti = e => ts(tn(Math.atan2(e[1], e[0])))
      , ta = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: e => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
        rotate: ti,
        rotateZ: ti,
        skewX: e => tn(Math.atan(e[1])),
        skewY: e => tn(Math.atan(e[2])),
        skew: e => (Math.abs(e[1]) + Math.abs(e[2])) / 2
    }
      , ts = e => ((e %= 360) < 0 && (e += 360),
    e)
      , to = e => Math.sqrt(e[0] * e[0] + e[1] * e[1])
      , tl = e => Math.sqrt(e[4] * e[4] + e[5] * e[5])
      , tc = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: to,
        scaleY: tl,
        scale: e => (to(e) + tl(e)) / 2,
        rotateX: e => ts(tn(Math.atan2(e[6], e[5]))),
        rotateY: e => ts(tn(Math.atan2(-e[2], e[0]))),
        rotateZ: ti,
        rotate: ti,
        skewX: e => tn(Math.atan(e[4])),
        skewY: e => tn(Math.atan(e[1])),
        skew: e => (Math.abs(e[1]) + Math.abs(e[4])) / 2
    };
    function tu(e) {
        return +!!e.includes("scale")
    }
    function td(e, t) {
        let r, n;
        if (!e || "none" === e)
            return tu(t);
        let i = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
        if (i)
            r = tc,
            n = i;
        else {
            let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
            r = ta,
            n = t
        }
        if (!n)
            return tu(t);
        let a = r[t]
          , s = n[1].split(",").map(th);
        return "function" == typeof a ? a(s) : s[a]
    }
    function th(e) {
        return parseFloat(e.trim())
    }
    let tp = e => t => "string" == typeof t && t.startsWith(e)
      , tm = tp("--")
      , tf = tp("var(--")
      , tx = e => !!tf(e) && ty.test(e.split("/*")[0].trim())
      , ty = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
    function tv({top: e, left: t, right: r, bottom: n}) {
        return {
            x: {
                min: t,
                max: r
            },
            y: {
                min: e,
                max: n
            }
        }
    }
    let tg = (e, t, r) => e + (t - e) * r;
    function tb(e) {
        return void 0 === e || 1 === e
    }
    function tw({scale: e, scaleX: t, scaleY: r}) {
        return !tb(e) || !tb(t) || !tb(r)
    }
    function tj(e) {
        return tw(e) || tN(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY
    }
    function tN(e) {
        var t, r;
        return (t = e.x) && "0%" !== t || (r = e.y) && "0%" !== r
    }
    function tk(e, t, r, n, i) {
        return void 0 !== i && (e = n + i * (e - n)),
        n + r * (e - n) + t
    }
    function tS(e, t=0, r=1, n, i) {
        e.min = tk(e.min, t, r, n, i),
        e.max = tk(e.max, t, r, n, i)
    }
    function tC(e, {x: t, y: r}) {
        tS(e.x, t.translate, t.scale, t.originPoint),
        tS(e.y, r.translate, r.scale, r.originPoint)
    }
    function tM(e, t) {
        e.min = e.min + t,
        e.max = e.max + t
    }
    function tA(e, t, r, n, i=.5) {
        let a = tg(e.min, e.max, i);
        tS(e, t, r, a, n)
    }
    function tT(e, t) {
        tA(e.x, t.x, t.scaleX, t.scale, t.originX),
        tA(e.y, t.y, t.scaleY, t.scale, t.originY)
    }
    function tP(e, t) {
        return tv(function(e, t) {
            if (!t)
                return e;
            let r = t({
                x: e.left,
                y: e.top
            })
              , n = t({
                x: e.right,
                y: e.bottom
            });
            return {
                top: r.y,
                left: r.x,
                bottom: n.y,
                right: n.x
            }
        }(e.getBoundingClientRect(), t))
    }
    let t_ = new Set(["width", "height", "top", "left", "right", "bottom", ...tt])
      , tE = (e, t, r) => r > t ? t : r < e ? e : r
      , tI = {
        test: e => "number" == typeof e,
        parse: parseFloat,
        transform: e => e
    }
      , tD = {
        ...tI,
        transform: e => tE(0, 1, e)
    }
      , tR = {
        ...tI,
        default: 1
    }
      , tL = e => ({
        test: t => "string" == typeof t && t.endsWith(e) && 1 === t.split(" ").length,
        parse: parseFloat,
        transform: t => `${t}${e}`
    })
      , tz = tL("deg")
      , tO = tL("%")
      , tV = tL("px")
      , t$ = tL("vh")
      , tF = tL("vw")
      , tB = {
        ...tO,
        parse: e => tO.parse(e) / 100,
        transform: e => tO.transform(100 * e)
    }
      , tH = e => t => t.test(e)
      , tU = [tI, tV, tO, tz, tF, t$, {
        test: e => "auto" === e,
        parse: e => e
    }]
      , tq = e => tU.find(tH(e));
    e.i(47167);
    let tW = () => {}
      , tY = () => {}
      , tG = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
      , tX = e => e === tI || e === tV
      , tJ = new Set(["x", "y", "z"])
      , tK = tt.filter(e => !tJ.has(e))
      , tZ = {
        width: ({x: e}, {paddingLeft: t="0", paddingRight: r="0"}) => e.max - e.min - parseFloat(t) - parseFloat(r),
        height: ({y: e}, {paddingTop: t="0", paddingBottom: r="0"}) => e.max - e.min - parseFloat(t) - parseFloat(r),
        top: (e, {top: t}) => parseFloat(t),
        left: (e, {left: t}) => parseFloat(t),
        bottom: ({y: e}, {top: t}) => parseFloat(t) + (e.max - e.min),
        right: ({x: e}, {left: t}) => parseFloat(t) + (e.max - e.min),
        x: (e, {transform: t}) => td(t, "x"),
        y: (e, {transform: t}) => td(t, "y")
    };
    tZ.translateX = tZ.x,
    tZ.translateY = tZ.y;
    let tQ = e => e
      , t0 = {}
      , t1 = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"];
    function t2(e, t) {
        let r = !1
          , n = !0
          , i = {
            delta: 0,
            timestamp: 0,
            isProcessing: !1
        }
          , a = () => r = !0
          , s = t1.reduce( (e, r) => (e[r] = function(e, t) {
            let r = new Set
              , n = new Set
              , i = !1
              , a = !1
              , s = new WeakSet
              , o = {
                delta: 0,
                timestamp: 0,
                isProcessing: !1
            }
              , l = 0;
            function c(t) {
                s.has(t) && (u.schedule(t),
                e()),
                l++,
                t(o)
            }
            let u = {
                schedule: (e, t=!1, a=!1) => {
                    let o = a && i ? r : n;
                    return t && s.add(e),
                    o.has(e) || o.add(e),
                    e
                }
                ,
                cancel: e => {
                    n.delete(e),
                    s.delete(e)
                }
                ,
                process: e => {
                    if (o = e,
                    i) {
                        a = !0;
                        return
                    }
                    i = !0,
                    [r,n] = [n, r],
                    r.forEach(c),
                    t,
                    l = 0,
                    r.clear(),
                    i = !1,
                    a && (a = !1,
                    u.process(e))
                }
            };
            return u
        }(a, t ? r : void 0),
        e), {})
          , {setup: o, read: l, resolveKeyframes: c, preUpdate: u, update: d, preRender: h, render: p, postRender: m} = s
          , f = () => {
            let a = t0.useManualTiming ? i.timestamp : performance.now();
            r = !1,
            t0.useManualTiming || (i.delta = n ? 1e3 / 60 : Math.max(Math.min(a - i.timestamp, 40), 1)),
            i.timestamp = a,
            i.isProcessing = !0,
            o.process(i),
            l.process(i),
            c.process(i),
            u.process(i),
            d.process(i),
            h.process(i),
            p.process(i),
            m.process(i),
            i.isProcessing = !1,
            r && t && (n = !1,
            e(f))
        }
        ;
        return {
            schedule: t1.reduce( (t, a) => {
                let o = s[a];
                return t[a] = (t, a=!1, s=!1) => (!r && (r = !0,
                n = !0,
                i.isProcessing || e(f)),
                o.schedule(t, a, s)),
                t
            }
            , {}),
            cancel: e => {
                for (let t = 0; t < t1.length; t++)
                    s[t1[t]].cancel(e)
            }
            ,
            state: i,
            steps: s
        }
    }
    let {schedule: t5, cancel: t4, state: t3, steps: t6} = t2("undefined" != typeof requestAnimationFrame ? requestAnimationFrame : tQ, !0)
      , t8 = new Set
      , t9 = !1
      , t7 = !1
      , re = !1;
    function rt() {
        if (t7) {
            let e = Array.from(t8).filter(e => e.needsMeasurement)
              , t = new Set(e.map(e => e.element))
              , r = new Map;
            t.forEach(e => {
                let t, n = (t = [],
                tK.forEach(r => {
                    let n = e.getValue(r);
                    void 0 !== n && (t.push([r, n.get()]),
                    n.set(+!!r.startsWith("scale")))
                }
                ),
                t);
                n.length && (r.set(e, n),
                e.render())
            }
            ),
            e.forEach(e => e.measureInitialState()),
            t.forEach(e => {
                e.render();
                let t = r.get(e);
                t && t.forEach( ([t,r]) => {
                    e.getValue(t)?.set(r)
                }
                )
            }
            ),
            e.forEach(e => e.measureEndState()),
            e.forEach(e => {
                void 0 !== e.suspendedScrollY && window.scrollTo(0, e.suspendedScrollY)
            }
            )
        }
        t7 = !1,
        t9 = !1,
        t8.forEach(e => e.complete(re)),
        t8.clear()
    }
    function rr() {
        t8.forEach(e => {
            e.readKeyframes(),
            e.needsMeasurement && (t7 = !0)
        }
        )
    }
    class rn {
        constructor(e, t, r, n, i, a=!1) {
            this.state = "pending",
            this.isAsync = !1,
            this.needsMeasurement = !1,
            this.unresolvedKeyframes = [...e],
            this.onComplete = t,
            this.name = r,
            this.motionValue = n,
            this.element = i,
            this.isAsync = a
        }
        scheduleResolve() {
            this.state = "scheduled",
            this.isAsync ? (t8.add(this),
            t9 || (t9 = !0,
            t5.read(rr),
            t5.resolveKeyframes(rt))) : (this.readKeyframes(),
            this.complete())
        }
        readKeyframes() {
            let {unresolvedKeyframes: e, name: t, element: r, motionValue: n} = this;
            if (null === e[0]) {
                let i = n?.get()
                  , a = e[e.length - 1];
                if (void 0 !== i)
                    e[0] = i;
                else if (r && t) {
                    let n = r.readValue(t, a);
                    null != n && (e[0] = n)
                }
                void 0 === e[0] && (e[0] = a),
                n && void 0 === i && n.set(e[0])
            }
            for (let t = 1; t < e.length; t++)
                e[t] ?? (e[t] = e[t - 1])
        }
        setFinalKeyframe() {}
        measureInitialState() {}
        renderEndStyles() {}
        measureEndState() {}
        complete(e=!1) {
            this.state = "complete",
            this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e),
            t8.delete(this)
        }
        cancel() {
            "scheduled" === this.state && (t8.delete(this),
            this.state = "pending")
        }
        resume() {
            "pending" === this.state && this.scheduleResolve()
        }
    }
    let ri = e => Math.round(1e5 * e) / 1e5
      , ra = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu
      , rs = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu
      , ro = (e, t) => r => !!("string" == typeof r && rs.test(r) && r.startsWith(e) || t && null != r && Object.prototype.hasOwnProperty.call(r, t))
      , rl = (e, t, r) => n => {
        if ("string" != typeof n)
            return n;
        let[i,a,s,o] = n.match(ra);
        return {
            [e]: parseFloat(i),
            [t]: parseFloat(a),
            [r]: parseFloat(s),
            alpha: void 0 !== o ? parseFloat(o) : 1
        }
    }
      , rc = {
        ...tI,
        transform: e => Math.round(tE(0, 255, e))
    }
      , ru = {
        test: ro("rgb", "red"),
        parse: rl("red", "green", "blue"),
        transform: ({red: e, green: t, blue: r, alpha: n=1}) => "rgba(" + rc.transform(e) + ", " + rc.transform(t) + ", " + rc.transform(r) + ", " + ri(tD.transform(n)) + ")"
    }
      , rd = {
        test: ro("#"),
        parse: function(e) {
            let t = ""
              , r = ""
              , n = ""
              , i = "";
            return e.length > 5 ? (t = e.substring(1, 3),
            r = e.substring(3, 5),
            n = e.substring(5, 7),
            i = e.substring(7, 9)) : (t = e.substring(1, 2),
            r = e.substring(2, 3),
            n = e.substring(3, 4),
            i = e.substring(4, 5),
            t += t,
            r += r,
            n += n,
            i += i),
            {
                red: parseInt(t, 16),
                green: parseInt(r, 16),
                blue: parseInt(n, 16),
                alpha: i ? parseInt(i, 16) / 255 : 1
            }
        },
        transform: ru.transform
    }
      , rh = {
        test: ro("hsl", "hue"),
        parse: rl("hue", "saturation", "lightness"),
        transform: ({hue: e, saturation: t, lightness: r, alpha: n=1}) => "hsla(" + Math.round(e) + ", " + tO.transform(ri(t)) + ", " + tO.transform(ri(r)) + ", " + ri(tD.transform(n)) + ")"
    }
      , rp = {
        test: e => ru.test(e) || rd.test(e) || rh.test(e),
        parse: e => ru.test(e) ? ru.parse(e) : rh.test(e) ? rh.parse(e) : rd.parse(e),
        transform: e => "string" == typeof e ? e : e.hasOwnProperty("red") ? ru.transform(e) : rh.transform(e),
        getAnimatableNone: e => {
            let t = rp.parse(e);
            return t.alpha = 0,
            rp.transform(t)
        }
    }
      , rm = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu
      , rf = "number"
      , rx = "color"
      , ry = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
    function rv(e) {
        let t = e.toString()
          , r = []
          , n = {
            color: [],
            number: [],
            var: []
        }
          , i = []
          , a = 0
          , s = t.replace(ry, e => (rp.test(e) ? (n.color.push(a),
        i.push(rx),
        r.push(rp.parse(e))) : e.startsWith("var(") ? (n.var.push(a),
        i.push("var"),
        r.push(e)) : (n.number.push(a),
        i.push(rf),
        r.push(parseFloat(e))),
        ++a,
        "${}")).split("${}");
        return {
            values: r,
            split: s,
            indexes: n,
            types: i
        }
    }
    function rg(e) {
        return rv(e).values
    }
    function rb(e) {
        let {split: t, types: r} = rv(e)
          , n = t.length;
        return e => {
            let i = "";
            for (let a = 0; a < n; a++)
                if (i += t[a],
                void 0 !== e[a]) {
                    let t = r[a];
                    t === rf ? i += ri(e[a]) : t === rx ? i += rp.transform(e[a]) : i += e[a]
                }
            return i
        }
    }
    let rw = e => "number" == typeof e ? 0 : rp.test(e) ? rp.getAnimatableNone(e) : e
      , rj = {
        test: function(e) {
            return isNaN(e) && "string" == typeof e && (e.match(ra)?.length || 0) + (e.match(rm)?.length || 0) > 0
        },
        parse: rg,
        createTransformer: rb,
        getAnimatableNone: function(e) {
            let t = rg(e);
            return rb(e)(t.map(rw))
        }
    }
      , rN = new Set(["brightness", "contrast", "saturate", "opacity"]);
    function rk(e) {
        let[t,r] = e.slice(0, -1).split("(");
        if ("drop-shadow" === t)
            return e;
        let[n] = r.match(ra) || [];
        if (!n)
            return e;
        let i = r.replace(n, "")
          , a = +!!rN.has(t);
        return n !== r && (a *= 100),
        t + "(" + a + i + ")"
    }
    let rS = /\b([a-z-]*)\(.*?\)/gu
      , rC = {
        ...rj,
        getAnimatableNone: e => {
            let t = e.match(rS);
            return t ? t.map(rk).join(" ") : e
        }
    }
      , rM = {
        ...tI,
        transform: Math.round
    }
      , rA = {
        borderWidth: tV,
        borderTopWidth: tV,
        borderRightWidth: tV,
        borderBottomWidth: tV,
        borderLeftWidth: tV,
        borderRadius: tV,
        radius: tV,
        borderTopLeftRadius: tV,
        borderTopRightRadius: tV,
        borderBottomRightRadius: tV,
        borderBottomLeftRadius: tV,
        width: tV,
        maxWidth: tV,
        height: tV,
        maxHeight: tV,
        top: tV,
        right: tV,
        bottom: tV,
        left: tV,
        padding: tV,
        paddingTop: tV,
        paddingRight: tV,
        paddingBottom: tV,
        paddingLeft: tV,
        margin: tV,
        marginTop: tV,
        marginRight: tV,
        marginBottom: tV,
        marginLeft: tV,
        backgroundPositionX: tV,
        backgroundPositionY: tV,
        rotate: tz,
        rotateX: tz,
        rotateY: tz,
        rotateZ: tz,
        scale: tR,
        scaleX: tR,
        scaleY: tR,
        scaleZ: tR,
        skew: tz,
        skewX: tz,
        skewY: tz,
        distance: tV,
        translateX: tV,
        translateY: tV,
        translateZ: tV,
        x: tV,
        y: tV,
        z: tV,
        perspective: tV,
        transformPerspective: tV,
        opacity: tD,
        originX: tB,
        originY: tB,
        originZ: tV,
        zIndex: rM,
        fillOpacity: tD,
        strokeOpacity: tD,
        numOctaves: rM
    }
      , rT = {
        ...rA,
        color: rp,
        backgroundColor: rp,
        outlineColor: rp,
        fill: rp,
        stroke: rp,
        borderColor: rp,
        borderTopColor: rp,
        borderRightColor: rp,
        borderBottomColor: rp,
        borderLeftColor: rp,
        filter: rC,
        WebkitFilter: rC
    }
      , rP = e => rT[e];
    function r_(e, t) {
        let r = rP(e);
        return r !== rC && (r = rj),
        r.getAnimatableNone ? r.getAnimatableNone(t) : void 0
    }
    let rE = new Set(["auto", "none", "0"]);
    class rI extends rn {
        constructor(e, t, r, n, i) {
            super(e, t, r, n, i, !0)
        }
        readKeyframes() {
            let {unresolvedKeyframes: e, element: t, name: r} = this;
            if (!t || !t.current)
                return;
            super.readKeyframes();
            for (let r = 0; r < e.length; r++) {
                let n = e[r];
                if ("string" == typeof n && tx(n = n.trim())) {
                    let i = function e(t, r, n=1) {
                        tY(n <= 4, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
                        let[i,a] = function(e) {
                            let t = tG.exec(e);
                            if (!t)
                                return [, ];
                            let[,r,n,i] = t;
                            return [`--${r ?? n}`, i]
                        }(t);
                        if (!i)
                            return;
                        let s = window.getComputedStyle(r).getPropertyValue(i);
                        if (s) {
                            let e = s.trim();
                            return /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e) ? parseFloat(e) : e
                        }
                        return tx(a) ? e(a, r, n + 1) : a
                    }(n, t.current);
                    void 0 !== i && (e[r] = i),
                    r === e.length - 1 && (this.finalKeyframe = n)
                }
            }
            if (this.resolveNoneKeyframes(),
            !t_.has(r) || 2 !== e.length)
                return;
            let[n,i] = e
              , a = tq(n)
              , s = tq(i);
            if (a !== s)
                if (tX(a) && tX(s))
                    for (let t = 0; t < e.length; t++) {
                        let r = e[t];
                        "string" == typeof r && (e[t] = parseFloat(r))
                    }
                else
                    tZ[r] && (this.needsMeasurement = !0)
        }
        resolveNoneKeyframes() {
            let {unresolvedKeyframes: e, name: t} = this
              , r = [];
            for (let t = 0; t < e.length; t++)
                (null === e[t] || function(e) {
                    if ("number" == typeof e)
                        return 0 === e;
                    if (null === e)
                        return !0;
                    return "none" === e || "0" === e || /^0[^.\s]+$/u.test(e)
                }(e[t])) && r.push(t);
            r.length && function(e, t, r) {
                let n, i = 0;
                for (; i < e.length && !n; ) {
                    let t = e[i];
                    "string" == typeof t && !rE.has(t) && rv(t).values.length && (n = e[i]),
                    i++
                }
                if (n && r)
                    for (let i of t)
                        e[i] = r_(r, n)
            }(e, r, t)
        }
        measureInitialState() {
            let {element: e, unresolvedKeyframes: t, name: r} = this;
            if (!e || !e.current)
                return;
            "height" === r && (this.suspendedScrollY = window.pageYOffset),
            this.measuredOrigin = tZ[r](e.measureViewportBox(), window.getComputedStyle(e.current)),
            t[0] = this.measuredOrigin;
            let n = t[t.length - 1];
            void 0 !== n && e.getValue(r, n).jump(n, !1)
        }
        measureEndState() {
            let {element: e, name: t, unresolvedKeyframes: r} = this;
            if (!e || !e.current)
                return;
            let n = e.getValue(t);
            n && n.jump(this.measuredOrigin, !1);
            let i = r.length - 1
              , a = r[i];
            r[i] = tZ[t](e.measureViewportBox(), window.getComputedStyle(e.current)),
            null !== a && void 0 === this.finalKeyframe && (this.finalKeyframe = a),
            this.removedTransforms?.length && this.removedTransforms.forEach( ([t,r]) => {
                e.getValue(t).set(r)
            }
            ),
            this.resolveNoneKeyframes()
        }
    }
    let rD = e => !!(e && e.getVelocity);
    function rR() {
        a = void 0
    }
    let rL = {
        now: () => (void 0 === a && rL.set(t3.isProcessing || t0.useManualTiming ? t3.timestamp : performance.now()),
        a),
        set: e => {
            a = e,
            queueMicrotask(rR)
        }
    };
    function rz(e, t) {
        -1 === e.indexOf(t) && e.push(t)
    }
    function rO(e, t) {
        let r = e.indexOf(t);
        r > -1 && e.splice(r, 1)
    }
    class rV {
        constructor() {
            this.subscriptions = []
        }
        add(e) {
            return rz(this.subscriptions, e),
            () => rO(this.subscriptions, e)
        }
        notify(e, t, r) {
            let n = this.subscriptions.length;
            if (n)
                if (1 === n)
                    this.subscriptions[0](e, t, r);
                else
                    for (let i = 0; i < n; i++) {
                        let n = this.subscriptions[i];
                        n && n(e, t, r)
                    }
        }
        getSize() {
            return this.subscriptions.length
        }
        clear() {
            this.subscriptions.length = 0
        }
    }
    class r$ {
        constructor(e, t={}) {
            this.canTrackVelocity = null,
            this.events = {},
            this.updateAndNotify = e => {
                let t = rL.now();
                if (this.updatedAt !== t && this.setPrevFrameValue(),
                this.prev = this.current,
                this.setCurrent(e),
                this.current !== this.prev && (this.events.change?.notify(this.current),
                this.dependents))
                    for (let e of this.dependents)
                        e.dirty()
            }
            ,
            this.hasAnimated = !1,
            this.setCurrent(e),
            this.owner = t.owner
        }
        setCurrent(e) {
            this.current = e,
            this.updatedAt = rL.now(),
            null === this.canTrackVelocity && void 0 !== e && (this.canTrackVelocity = !isNaN(parseFloat(this.current)))
        }
        setPrevFrameValue(e=this.current) {
            this.prevFrameValue = e,
            this.prevUpdatedAt = this.updatedAt
        }
        onChange(e) {
            return this.on("change", e)
        }
        on(e, t) {
            this.events[e] || (this.events[e] = new rV);
            let r = this.events[e].add(t);
            return "change" === e ? () => {
                r(),
                t5.read( () => {
                    this.events.change.getSize() || this.stop()
                }
                )
            }
            : r
        }
        clearListeners() {
            for (let e in this.events)
                this.events[e].clear()
        }
        attach(e, t) {
            this.passiveEffect = e,
            this.stopPassiveEffect = t
        }
        set(e) {
            this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e)
        }
        setWithVelocity(e, t, r) {
            this.set(t),
            this.prev = void 0,
            this.prevFrameValue = e,
            this.prevUpdatedAt = this.updatedAt - r
        }
        jump(e, t=!0) {
            this.updateAndNotify(e),
            this.prev = e,
            this.prevUpdatedAt = this.prevFrameValue = void 0,
            t && this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect()
        }
        dirty() {
            this.events.change?.notify(this.current)
        }
        addDependent(e) {
            this.dependents || (this.dependents = new Set),
            this.dependents.add(e)
        }
        removeDependent(e) {
            this.dependents && this.dependents.delete(e)
        }
        get() {
            return c && c.push(this),
            this.current
        }
        getPrevious() {
            return this.prev
        }
        getVelocity() {
            var e;
            let t = rL.now();
            if (!this.canTrackVelocity || void 0 === this.prevFrameValue || t - this.updatedAt > 30)
                return 0;
            let r = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
            return e = parseFloat(this.current) - parseFloat(this.prevFrameValue),
            r ? 1e3 / r * e : 0
        }
        start(e) {
            return this.stop(),
            new Promise(t => {
                this.hasAnimated = !0,
                this.animation = e(t),
                this.events.animationStart && this.events.animationStart.notify()
            }
            ).then( () => {
                this.events.animationComplete && this.events.animationComplete.notify(),
                this.clearAnimation()
            }
            )
        }
        stop() {
            this.animation && (this.animation.stop(),
            this.events.animationCancel && this.events.animationCancel.notify()),
            this.clearAnimation()
        }
        isAnimating() {
            return !!this.animation
        }
        clearAnimation() {
            delete this.animation
        }
        destroy() {
            this.dependents?.clear(),
            this.events.destroy?.notify(),
            this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect()
        }
    }
    function rF(e, t) {
        return new r$(e,t)
    }
    let rB = [...tU, rp, rj]
      , {schedule: rH} = t2(queueMicrotask, !1)
      , rU = {
        animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"]
    }
      , rq = {};
    for (let e in rU)
        rq[e] = {
            isEnabled: t => rU[e].some(e => !!t[e])
        };
    let rW = () => ({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    })
      , rY = () => ({
        x: rW(),
        y: rW()
    })
      , rG = () => ({
        min: 0,
        max: 0
    })
      , rX = () => ({
        x: rG(),
        y: rG()
    })
      , rJ = "undefined" != typeof window
      , rK = {
        current: null
    }
      , rZ = {
        current: !1
    }
      , rQ = new WeakMap;
    function r0(e) {
        return null !== e && "object" == typeof e && "function" == typeof e.start
    }
    function r1(e) {
        return "string" == typeof e || Array.isArray(e)
    }
    let r2 = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"]
      , r5 = ["initial", ...r2];
    function r4(e) {
        return r0(e.animate) || r5.some(t => r1(e[t]))
    }
    function r3(e) {
        return !!(r4(e) || e.variants)
    }
    function r6(e) {
        let t = [{}, {}];
        return e?.values.forEach( (e, r) => {
            t[0][r] = e.get(),
            t[1][r] = e.getVelocity()
        }
        ),
        t
    }
    function r8(e, t, r, n) {
        if ("function" == typeof t) {
            let[i,a] = r6(n);
            t = t(void 0 !== r ? r : e.custom, i, a)
        }
        if ("string" == typeof t && (t = e.variants && e.variants[t]),
        "function" == typeof t) {
            let[i,a] = r6(n);
            t = t(void 0 !== r ? r : e.custom, i, a)
        }
        return t
    }
    let r9 = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
    class r7 {
        scrapeMotionValuesFromProps(e, t, r) {
            return {}
        }
        constructor({parent: e, props: t, presenceContext: r, reducedMotionConfig: n, blockInitialAnimation: i, visualState: a}, s={}) {
            this.current = null,
            this.children = new Set,
            this.isVariantNode = !1,
            this.isControllingVariants = !1,
            this.shouldReduceMotion = null,
            this.values = new Map,
            this.KeyframeResolver = rn,
            this.features = {},
            this.valueSubscriptions = new Map,
            this.prevMotionValues = {},
            this.events = {},
            this.propEventSubscriptions = {},
            this.notifyUpdate = () => this.notify("Update", this.latestValues),
            this.render = () => {
                this.current && (this.triggerBuild(),
                this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
            }
            ,
            this.renderScheduledAt = 0,
            this.scheduleRender = () => {
                let e = rL.now();
                this.renderScheduledAt < e && (this.renderScheduledAt = e,
                t5.render(this.render, !1, !0))
            }
            ;
            const {latestValues: o, renderState: l} = a;
            this.latestValues = o,
            this.baseTarget = {
                ...o
            },
            this.initialValues = t.initial ? {
                ...o
            } : {},
            this.renderState = l,
            this.parent = e,
            this.props = t,
            this.presenceContext = r,
            this.depth = e ? e.depth + 1 : 0,
            this.reducedMotionConfig = n,
            this.options = s,
            this.blockInitialAnimation = !!i,
            this.isControllingVariants = r4(t),
            this.isVariantNode = r3(t),
            this.isVariantNode && (this.variantChildren = new Set),
            this.manuallyAnimateOnMount = !!(e && e.current);
            const {willChange: c, ...u} = this.scrapeMotionValuesFromProps(t, {}, this);
            for (const e in u) {
                const t = u[e];
                void 0 !== o[e] && rD(t) && t.set(o[e])
            }
        }
        mount(e) {
            this.current = e,
            rQ.set(e, this),
            this.projection && !this.projection.instance && this.projection.mount(e),
            this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)),
            this.values.forEach( (e, t) => this.bindToMotionValue(t, e)),
            rZ.current || function() {
                if (rZ.current = !0,
                rJ)
                    if (window.matchMedia) {
                        let e = window.matchMedia("(prefers-reduced-motion)")
                          , t = () => rK.current = e.matches;
                        e.addEventListener("change", t),
                        t()
                    } else
                        rK.current = !1
            }(),
            this.shouldReduceMotion = "never" !== this.reducedMotionConfig && ("always" === this.reducedMotionConfig || rK.current),
            this.parent?.addChild(this),
            this.update(this.props, this.presenceContext)
        }
        unmount() {
            for (let e in this.projection && this.projection.unmount(),
            t4(this.notifyUpdate),
            t4(this.render),
            this.valueSubscriptions.forEach(e => e()),
            this.valueSubscriptions.clear(),
            this.removeFromVariantTree && this.removeFromVariantTree(),
            this.parent?.removeChild(this),
            this.events)
                this.events[e].clear();
            for (let e in this.features) {
                let t = this.features[e];
                t && (t.unmount(),
                t.isMounted = !1)
            }
            this.current = null
        }
        addChild(e) {
            this.children.add(e),
            this.enteringChildren ?? (this.enteringChildren = new Set),
            this.enteringChildren.add(e)
        }
        removeChild(e) {
            this.children.delete(e),
            this.enteringChildren && this.enteringChildren.delete(e)
        }
        bindToMotionValue(e, t) {
            let r;
            this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
            let n = tr.has(e);
            n && this.onBindTransform && this.onBindTransform();
            let i = t.on("change", t => {
                this.latestValues[e] = t,
                this.props.onUpdate && t5.preRender(this.notifyUpdate),
                n && this.projection && (this.projection.isTransformDirty = !0),
                this.scheduleRender()
            }
            );
            window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, t)),
            this.valueSubscriptions.set(e, () => {
                i(),
                r && r(),
                t.owner && t.stop()
            }
            )
        }
        sortNodePosition(e) {
            return this.current && this.sortInstanceNodePosition && this.type === e.type ? this.sortInstanceNodePosition(this.current, e.current) : 0
        }
        updateFeatures() {
            let e = "animation";
            for (e in rq) {
                let t = rq[e];
                if (!t)
                    continue;
                let {isEnabled: r, Feature: n} = t;
                if (!this.features[e] && n && r(this.props) && (this.features[e] = new n(this)),
                this.features[e]) {
                    let t = this.features[e];
                    t.isMounted ? t.update() : (t.mount(),
                    t.isMounted = !0)
                }
            }
        }
        triggerBuild() {
            this.build(this.renderState, this.latestValues, this.props)
        }
        measureViewportBox() {
            return this.current ? this.measureInstanceViewportBox(this.current, this.props) : rX()
        }
        getStaticValue(e) {
            return this.latestValues[e]
        }
        setStaticValue(e, t) {
            this.latestValues[e] = t
        }
        update(e, t) {
            (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
            this.prevProps = this.props,
            this.props = e,
            this.prevPresenceContext = this.presenceContext,
            this.presenceContext = t;
            for (let t = 0; t < r9.length; t++) {
                let r = r9[t];
                this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](),
                delete this.propEventSubscriptions[r]);
                let n = e["on" + r];
                n && (this.propEventSubscriptions[r] = this.on(r, n))
            }
            this.prevMotionValues = function(e, t, r) {
                for (let n in t) {
                    let i = t[n]
                      , a = r[n];
                    if (rD(i))
                        e.addValue(n, i);
                    else if (rD(a))
                        e.addValue(n, rF(i, {
                            owner: e
                        }));
                    else if (a !== i)
                        if (e.hasValue(n)) {
                            let t = e.getValue(n);
                            !0 === t.liveStyle ? t.jump(i) : t.hasAnimated || t.set(i)
                        } else {
                            let t = e.getStaticValue(n);
                            e.addValue(n, rF(void 0 !== t ? t : i, {
                                owner: e
                            }))
                        }
                }
                for (let n in r)
                    void 0 === t[n] && e.removeValue(n);
                return t
            }(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues),
            this.handleChildMotionValue && this.handleChildMotionValue()
        }
        getProps() {
            return this.props
        }
        getVariant(e) {
            return this.props.variants ? this.props.variants[e] : void 0
        }
        getDefaultTransition() {
            return this.props.transition
        }
        getTransformPagePoint() {
            return this.props.transformPagePoint
        }
        getClosestVariantNode() {
            return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
        }
        addVariantChild(e) {
            let t = this.getClosestVariantNode();
            if (t)
                return t.variantChildren && t.variantChildren.add(e),
                () => t.variantChildren.delete(e)
        }
        addValue(e, t) {
            let r = this.values.get(e);
            t !== r && (r && this.removeValue(e),
            this.bindToMotionValue(e, t),
            this.values.set(e, t),
            this.latestValues[e] = t.get())
        }
        removeValue(e) {
            this.values.delete(e);
            let t = this.valueSubscriptions.get(e);
            t && (t(),
            this.valueSubscriptions.delete(e)),
            delete this.latestValues[e],
            this.removeValueFromRenderState(e, this.renderState)
        }
        hasValue(e) {
            return this.values.has(e)
        }
        getValue(e, t) {
            if (this.props.values && this.props.values[e])
                return this.props.values[e];
            let r = this.values.get(e);
            return void 0 === r && void 0 !== t && (r = rF(null === t ? void 0 : t, {
                owner: this
            }),
            this.addValue(e, r)),
            r
        }
        readValue(e, t) {
            let r = void 0 === this.latestValues[e] && this.current ? this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options) : this.latestValues[e];
            if (null != r) {
                let n, i;
                if ("string" == typeof r && (n = r,
                /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n) || (i = r,
                /^0[^.\s]+$/u.test(i))))
                    r = parseFloat(r);
                else {
                    let n;
                    n = r,
                    !rB.find(tH(n)) && rj.test(t) && (r = r_(e, t))
                }
                this.setBaseTarget(e, rD(r) ? r.get() : r)
            }
            return rD(r) ? r.get() : r
        }
        setBaseTarget(e, t) {
            this.baseTarget[e] = t
        }
        getBaseTarget(e) {
            let t, {initial: r} = this.props;
            if ("string" == typeof r || "object" == typeof r) {
                let n = r8(this.props, r, this.presenceContext?.custom);
                n && (t = n[e])
            }
            if (r && void 0 !== t)
                return t;
            let n = this.getBaseTargetFromProps(this.props, e);
            return void 0 === n || rD(n) ? void 0 !== this.initialValues[e] && void 0 === t ? void 0 : this.baseTarget[e] : n
        }
        on(e, t) {
            return this.events[e] || (this.events[e] = new rV),
            this.events[e].add(t)
        }
        notify(e, ...t) {
            this.events[e] && this.events[e].notify(...t)
        }
        scheduleRenderMicrotask() {
            rH.render(this.render)
        }
    }
    class ne extends r7 {
        constructor() {
            super(...arguments),
            this.KeyframeResolver = rI
        }
        sortInstanceNodePosition(e, t) {
            return 2 & e.compareDocumentPosition(t) ? 1 : -1
        }
        getBaseTargetFromProps(e, t) {
            return e.style ? e.style[t] : void 0
        }
        removeValueFromRenderState(e, {vars: t, style: r}) {
            delete t[e],
            delete r[e]
        }
        handleChildMotionValue() {
            this.childSubscription && (this.childSubscription(),
            delete this.childSubscription);
            let {children: e} = this.props;
            rD(e) && (this.childSubscription = e.on("change", e => {
                this.current && (this.current.textContent = `${e}`)
            }
            ))
        }
    }
    let nt = (e, t) => t && "number" == typeof e ? t.transform(e) : e
      , nr = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective"
    }
      , nn = tt.length;
    function ni(e, t, r) {
        let {style: n, vars: i, transformOrigin: a} = e
          , s = !1
          , o = !1;
        for (let e in t) {
            let r = t[e];
            if (tr.has(e)) {
                s = !0;
                continue
            }
            if (tm(e)) {
                i[e] = r;
                continue
            }
            {
                let t = nt(r, rA[e]);
                e.startsWith("origin") ? (o = !0,
                a[e] = t) : n[e] = t
            }
        }
        if (!t.transform && (s || r ? n.transform = function(e, t, r) {
            let n = ""
              , i = !0;
            for (let a = 0; a < nn; a++) {
                let s = tt[a]
                  , o = e[s];
                if (void 0 === o)
                    continue;
                let l = !0;
                if (!(l = "number" == typeof o ? o === +!!s.startsWith("scale") : 0 === parseFloat(o)) || r) {
                    let e = nt(o, rA[s]);
                    if (!l) {
                        i = !1;
                        let t = nr[s] || s;
                        n += `${t}(${e}) `
                    }
                    r && (t[s] = e)
                }
            }
            return n = n.trim(),
            r ? n = r(t, i ? "" : n) : i && (n = "none"),
            n
        }(t, e.transform, r) : n.transform && (n.transform = "none")),
        o) {
            let {originX: e="50%", originY: t="50%", originZ: r=0} = a;
            n.transformOrigin = `${e} ${t} ${r}`
        }
    }
    function na(e, {style: t, vars: r}, n, i) {
        let a, s = e.style;
        for (a in t)
            s[a] = t[a];
        for (a in i?.applyProjectionStyles(s, n),
        r)
            s.setProperty(a, r[a])
    }
    function ns(e, t) {
        return t.max === t.min ? 0 : e / (t.max - t.min) * 100
    }
    let no = {
        correct: (e, t) => {
            if (!t.target)
                return e;
            if ("string" == typeof e)
                if (!tV.test(e))
                    return e;
                else
                    e = parseFloat(e);
            let r = ns(e, t.target.x)
              , n = ns(e, t.target.y);
            return `${r}% ${n}%`
        }
    }
      , nl = {
        borderRadius: {
            ...no,
            applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
        },
        borderTopLeftRadius: no,
        borderTopRightRadius: no,
        borderBottomLeftRadius: no,
        borderBottomRightRadius: no,
        boxShadow: {
            correct: (e, {treeScale: t, projectionDelta: r}) => {
                let n = rj.parse(e);
                if (n.length > 5)
                    return e;
                let i = rj.createTransformer(e)
                  , a = +("number" != typeof n[0])
                  , s = r.x.scale * t.x
                  , o = r.y.scale * t.y;
                n[0 + a] /= s,
                n[1 + a] /= o;
                let l = tg(s, o, .5);
                return "number" == typeof n[2 + a] && (n[2 + a] /= l),
                "number" == typeof n[3 + a] && (n[3 + a] /= l),
                i(n)
            }
        }
    };
    function nc(e, {layout: t, layoutId: r}) {
        return tr.has(e) || e.startsWith("origin") || (t || void 0 !== r) && (!!nl[e] || "opacity" === e)
    }
    function nu(e, t, r) {
        let {style: n} = e
          , i = {};
        for (let a in n)
            (rD(n[a]) || t.style && rD(t.style[a]) || nc(a, e) || r?.getValue(a)?.liveStyle !== void 0) && (i[a] = n[a]);
        return i
    }
    class nd extends ne {
        constructor() {
            super(...arguments),
            this.type = "html",
            this.renderInstance = na
        }
        readValueFromInstance(e, t) {
            if (tr.has(t))
                return this.projection?.isProjecting ? tu(t) : ( (e, t) => {
                    let {transform: r="none"} = getComputedStyle(e);
                    return td(r, t)
                }
                )(e, t);
            {
                let r = window.getComputedStyle(e)
                  , n = (tm(t) ? r.getPropertyValue(t) : r[t]) || 0;
                return "string" == typeof n ? n.trim() : n
            }
        }
        measureInstanceViewportBox(e, {transformPagePoint: t}) {
            return tP(e, t)
        }
        build(e, t, r) {
            ni(e, t, r.transformTemplate)
        }
        scrapeMotionValuesFromProps(e, t, r) {
            return nu(e, t, r)
        }
    }
    let nh = e => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase()
      , np = {
        offset: "stroke-dashoffset",
        array: "stroke-dasharray"
    }
      , nm = {
        offset: "strokeDashoffset",
        array: "strokeDasharray"
    };
    function nf(e, {attrX: t, attrY: r, attrScale: n, pathLength: i, pathSpacing: a=1, pathOffset: s=0, ...o}, l, c, u) {
        if (ni(e, o, c),
        l) {
            e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
            return
        }
        e.attrs = e.style,
        e.style = {};
        let {attrs: d, style: h} = e;
        d.transform && (h.transform = d.transform,
        delete d.transform),
        (h.transform || d.transformOrigin) && (h.transformOrigin = d.transformOrigin ?? "50% 50%",
        delete d.transformOrigin),
        h.transform && (h.transformBox = u?.transformBox ?? "fill-box",
        delete d.transformBox),
        void 0 !== t && (d.x = t),
        void 0 !== r && (d.y = r),
        void 0 !== n && (d.scale = n),
        void 0 !== i && function(e, t, r=1, n=0, i=!0) {
            e.pathLength = 1;
            let a = i ? np : nm;
            e[a.offset] = tV.transform(-n);
            let s = tV.transform(t)
              , o = tV.transform(r);
            e[a.array] = `${s} ${o}`
        }(d, i, a, s, !1)
    }
    let nx = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"])
      , ny = e => "string" == typeof e && "svg" === e.toLowerCase();
    function nv(e, t, r) {
        let n = nu(e, t, r);
        for (let r in e)
            (rD(e[r]) || rD(t[r])) && (n[-1 !== tt.indexOf(r) ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r] = e[r]);
        return n
    }
    class ng extends ne {
        constructor() {
            super(...arguments),
            this.type = "svg",
            this.isSVGTag = !1,
            this.measureInstanceViewportBox = rX
        }
        getBaseTargetFromProps(e, t) {
            return e[t]
        }
        readValueFromInstance(e, t) {
            if (tr.has(t)) {
                let e = rP(t);
                return e && e.default || 0
            }
            return t = nx.has(t) ? t : nh(t),
            e.getAttribute(t)
        }
        scrapeMotionValuesFromProps(e, t, r) {
            return nv(e, t, r)
        }
        build(e, t, r) {
            nf(e, t, this.isSVGTag, r.transformTemplate, r.style)
        }
        renderInstance(e, t, r, n) {
            for (let r in na(e, t, void 0, n),
            t.attrs)
                e.setAttribute(nx.has(r) ? r : nh(r), t.attrs[r])
        }
        mount(e) {
            this.isSVGTag = ny(e.tagName),
            super.mount(e)
        }
    }
    let nb = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
    function nw(e) {
        if ("string" != typeof e || e.includes("-"))
            ;
        else if (nb.indexOf(e) > -1 || /[A-Z]/u.test(e))
            return !0;
        return !1
    }
    let nj = (0,
    p.createContext)({})
      , nN = (0,
    p.createContext)({
        strict: !1
    })
      , nk = (0,
    p.createContext)({
        transformPagePoint: e => e,
        isStatic: !1,
        reducedMotion: "never"
    })
      , nS = (0,
    p.createContext)({});
    function nC(e) {
        return Array.isArray(e) ? e.join(" ") : e
    }
    let nM = () => ({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });
    function nA(e, t, r) {
        for (let n in t)
            rD(t[n]) || nc(n, r) || (e[n] = t[n])
    }
    let nT = () => ({
        ...nM(),
        attrs: {}
    })
      , nP = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);
    function n_(e) {
        return e.startsWith("while") || e.startsWith("drag") && "draggable" !== e || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || nP.has(e)
    }
    let nE = e => !n_(e);
    try {
        cj = ( () => {
            let e = Error("Cannot find module '@emotion/is-prop-valid'");
            throw e.code = "MODULE_NOT_FOUND",
            e
        }
        )().default,
        "function" == typeof cj && (nE = e => e.startsWith("on") ? !n_(e) : cj(e))
    } catch {}
    let nI = (0,
    p.createContext)(null);
    function nD(e) {
        let t = (0,
        p.useRef)(null);
        return null === t.current && (t.current = e()),
        t.current
    }
    function nR(e) {
        return rD(e) ? e.get() : e
    }
    let nL = e => (t, r) => {
        let n = (0,
        p.useContext)(nS)
          , i = (0,
        p.useContext)(nI)
          , a = () => (function({scrapeMotionValuesFromProps: e, createRenderState: t}, r, n, i) {
            return {
                latestValues: function(e, t, r, n) {
                    let i = {}
                      , a = n(e, {});
                    for (let e in a)
                        i[e] = nR(a[e]);
                    let {initial: s, animate: o} = e
                      , l = r4(e)
                      , c = r3(e);
                    t && c && !l && !1 !== e.inherit && (void 0 === s && (s = t.initial),
                    void 0 === o && (o = t.animate));
                    let u = !!r && !1 === r.initial
                      , d = (u = u || !1 === s) ? o : s;
                    if (d && "boolean" != typeof d && !r0(d)) {
                        let t = Array.isArray(d) ? d : [d];
                        for (let r = 0; r < t.length; r++) {
                            let n = r8(e, t[r]);
                            if (n) {
                                let {transitionEnd: e, transition: t, ...r} = n;
                                for (let e in r) {
                                    let t = r[e];
                                    if (Array.isArray(t)) {
                                        let e = u ? t.length - 1 : 0;
                                        t = t[e]
                                    }
                                    null !== t && (i[e] = t)
                                }
                                for (let t in e)
                                    i[t] = e[t]
                            }
                        }
                    }
                    return i
                }(r, n, i, e),
                renderState: t()
            }
        }
        )(e, t, n, i);
        return r ? a() : nD(a)
    }
      , nz = nL({
        scrapeMotionValuesFromProps: nu,
        createRenderState: nM
    })
      , nO = nL({
        scrapeMotionValuesFromProps: nv,
        createRenderState: nT
    })
      , nV = Symbol.for("motionComponentSymbol");
    function n$(e) {
        return e && "object" == typeof e && Object.prototype.hasOwnProperty.call(e, "current")
    }
    let nF = "data-" + nh("framerAppearId")
      , nB = (0,
    p.createContext)({})
      , nH = rJ ? p.useLayoutEffect : p.useEffect;
    function nU(e, {forwardMotionProps: t=!1}={}, r, n) {
        r && function(e) {
            for (let t in e)
                rq[t] = {
                    ...rq[t],
                    ...e[t]
                }
        }(r);
        let i = nw(e) ? nO : nz;
        function a(r, a) {
            var s;
            let o, l = {
                ...(0,
                p.useContext)(nk),
                ...r,
                layoutId: function({layoutId: e}) {
                    let t = (0,
                    p.useContext)(nj).id;
                    return t && void 0 !== e ? t + "-" + e : e
                }(r)
            }, {isStatic: c} = l, u = function(e) {
                let {initial: t, animate: r} = function(e, t) {
                    if (r4(e)) {
                        let {initial: t, animate: r} = e;
                        return {
                            initial: !1 === t || r1(t) ? t : void 0,
                            animate: r1(r) ? r : void 0
                        }
                    }
                    return !1 !== e.inherit ? t : {}
                }(e, (0,
                p.useContext)(nS));
                return (0,
                p.useMemo)( () => ({
                    initial: t,
                    animate: r
                }), [nC(t), nC(r)])
            }(r), h = i(r, c);
            if (!c && rJ) {
                (0,
                p.useContext)(nN).strict;
                let t = function(e) {
                    let {drag: t, layout: r} = rq;
                    if (!t && !r)
                        return {};
                    let n = {
                        ...t,
                        ...r
                    };
                    return {
                        MeasureLayout: t?.isEnabled(e) || r?.isEnabled(e) ? n.MeasureLayout : void 0,
                        ProjectionNode: n.ProjectionNode
                    }
                }(l);
                o = t.MeasureLayout,
                u.visualElement = function(e, t, r, n, i) {
                    let {visualElement: a} = (0,
                    p.useContext)(nS)
                      , s = (0,
                    p.useContext)(nN)
                      , o = (0,
                    p.useContext)(nI)
                      , l = (0,
                    p.useContext)(nk).reducedMotion
                      , c = (0,
                    p.useRef)(null);
                    n = n || s.renderer,
                    !c.current && n && (c.current = n(e, {
                        visualState: t,
                        parent: a,
                        props: r,
                        presenceContext: o,
                        blockInitialAnimation: !!o && !1 === o.initial,
                        reducedMotionConfig: l
                    }));
                    let u = c.current
                      , d = (0,
                    p.useContext)(nB);
                    u && !u.projection && i && ("html" === u.type || "svg" === u.type) && function(e, t, r, n) {
                        let {layoutId: i, layout: a, drag: s, dragConstraints: o, layoutScroll: l, layoutRoot: c, layoutCrossfade: u} = t;
                        e.projection = new r(e.latestValues,t["data-framer-portal-id"] ? void 0 : function e(t) {
                            if (t)
                                return !1 !== t.options.allowProjection ? t.projection : e(t.parent)
                        }(e.parent)),
                        e.projection.setOptions({
                            layoutId: i,
                            layout: a,
                            alwaysMeasureLayout: !!s || o && n$(o),
                            visualElement: e,
                            animationType: "string" == typeof a ? a : "both",
                            initialPromotionConfig: n,
                            crossfade: u,
                            layoutScroll: l,
                            layoutRoot: c
                        })
                    }(c.current, r, i, d);
                    let h = (0,
                    p.useRef)(!1);
                    (0,
                    p.useInsertionEffect)( () => {
                        u && h.current && u.update(r, o)
                    }
                    );
                    let m = r[nF]
                      , f = (0,
                    p.useRef)(!!m && !window.MotionHandoffIsComplete?.(m) && window.MotionHasOptimisedAnimation?.(m));
                    return nH( () => {
                        u && (h.current = !0,
                        window.MotionIsMounted = !0,
                        u.updateFeatures(),
                        u.scheduleRenderMicrotask(),
                        f.current && u.animationState && u.animationState.animateChanges())
                    }
                    ),
                    (0,
                    p.useEffect)( () => {
                        u && (!f.current && u.animationState && u.animationState.animateChanges(),
                        f.current && (queueMicrotask( () => {
                            window.MotionHandoffMarkAsComplete?.(m)
                        }
                        ),
                        f.current = !1),
                        u.enteringChildren = void 0)
                    }
                    ),
                    u
                }(e, h, l, n, t.ProjectionNode)
            }
            return (0,
            d.jsxs)(nS.Provider, {
                value: u,
                children: [o && u.visualElement ? (0,
                d.jsx)(o, {
                    visualElement: u.visualElement,
                    ...l
                }) : null, function(e, t, r, {latestValues: n}, i, a=!1) {
                    let s = (nw(e) ? function(e, t, r, n) {
                        let i = (0,
                        p.useMemo)( () => {
                            let r = nT();
                            return nf(r, t, ny(n), e.transformTemplate, e.style),
                            {
                                ...r.attrs,
                                style: {
                                    ...r.style
                                }
                            }
                        }
                        , [t]);
                        if (e.style) {
                            let t = {};
                            nA(t, e.style, e),
                            i.style = {
                                ...t,
                                ...i.style
                            }
                        }
                        return i
                    }
                    : function(e, t) {
                        let r, n, i = {}, a = (r = e.style || {},
                        nA(n = {}, r, e),
                        Object.assign(n, function({transformTemplate: e}, t) {
                            return (0,
                            p.useMemo)( () => {
                                let r = nM();
                                return ni(r, t, e),
                                Object.assign({}, r.vars, r.style)
                            }
                            , [t])
                        }(e, t)),
                        n);
                        return e.drag && !1 !== e.dragListener && (i.draggable = !1,
                        a.userSelect = a.WebkitUserSelect = a.WebkitTouchCallout = "none",
                        a.touchAction = !0 === e.drag ? "none" : `pan-${"x" === e.drag ? "y" : "x"}`),
                        void 0 === e.tabIndex && (e.onTap || e.onTapStart || e.whileTap) && (i.tabIndex = 0),
                        i.style = a,
                        i
                    }
                    )(t, n, i, e)
                      , o = function(e, t, r) {
                        let n = {};
                        for (let i in e)
                            ("values" !== i || "object" != typeof e.values) && (nE(i) || !0 === r && n_(i) || !t && !n_(i) || e.draggable && i.startsWith("onDrag")) && (n[i] = e[i]);
                        return n
                    }(t, "string" == typeof e, a)
                      , l = e !== p.Fragment ? {
                        ...o,
                        ...s,
                        ref: r
                    } : {}
                      , {children: c} = t
                      , u = (0,
                    p.useMemo)( () => rD(c) ? c.get() : c, [c]);
                    return (0,
                    p.createElement)(e, {
                        ...l,
                        children: u
                    })
                }(e, r, (s = u.visualElement,
                (0,
                p.useCallback)(e => {
                    e && h.onMount && h.onMount(e),
                    s && (e ? s.mount(e) : s.unmount()),
                    a && ("function" == typeof a ? a(e) : n$(a) && (a.current = e))
                }
                , [s])), h, c, t)]
            })
        }
        a.displayName = `motion.${"string" == typeof e ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
        let s = (0,
        p.forwardRef)(a);
        return s[nV] = e,
        s
    }
    function nq(e, t, r) {
        let n = e.getProps();
        return r8(n, t, void 0 !== r ? r : n.custom, e)
    }
    function nW(e, t) {
        return e?.[t] ?? e?.default ?? e
    }
    let nY = e => Array.isArray(e);
    function nG(e, t) {
        let r = e.getValue("willChange");
        if (rD(r) && r.add)
            return r.add(t);
        if (!r && t0.WillChange) {
            let r = new t0.WillChange("auto");
            e.addValue("willChange", r),
            r.add(t)
        }
    }
    function nX(e) {
        e.duration = 0,
        e.type = "keyframes"
    }
    let nJ = (e, t) => r => t(e(r))
      , nK = (...e) => e.reduce(nJ)
      , nZ = e => 1e3 * e
      , nQ = {
        layout: 0,
        mainThread: 0,
        waapi: 0
    };
    function n0(e, t, r) {
        return (r < 0 && (r += 1),
        r > 1 && (r -= 1),
        r < 1 / 6) ? e + (t - e) * 6 * r : r < .5 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e
    }
    function n1(e, t) {
        return r => r > 0 ? t : e
    }
    let n2 = (e, t, r) => {
        let n = e * e
          , i = r * (t * t - n) + n;
        return i < 0 ? 0 : Math.sqrt(i)
    }
      , n5 = [rd, ru, rh];
    function n4(e) {
        let t = n5.find(t => t.test(e));
        if (tW(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"),
        !t)
            return !1;
        let r = t.parse(e);
        return t === rh && (r = function({hue: e, saturation: t, lightness: r, alpha: n}) {
            e /= 360,
            r /= 100;
            let i = 0
              , a = 0
              , s = 0;
            if (t /= 100) {
                let n = r < .5 ? r * (1 + t) : r + t - r * t
                  , o = 2 * r - n;
                i = n0(o, n, e + 1 / 3),
                a = n0(o, n, e),
                s = n0(o, n, e - 1 / 3)
            } else
                i = a = s = r;
            return {
                red: Math.round(255 * i),
                green: Math.round(255 * a),
                blue: Math.round(255 * s),
                alpha: n
            }
        }(r)),
        r
    }
    let n3 = (e, t) => {
        let r = n4(e)
          , n = n4(t);
        if (!r || !n)
            return n1(e, t);
        let i = {
            ...r
        };
        return e => (i.red = n2(r.red, n.red, e),
        i.green = n2(r.green, n.green, e),
        i.blue = n2(r.blue, n.blue, e),
        i.alpha = tg(r.alpha, n.alpha, e),
        ru.transform(i))
    }
      , n6 = new Set(["none", "hidden"]);
    function n8(e, t) {
        return r => tg(e, t, r)
    }
    function n9(e) {
        return "number" == typeof e ? n8 : "string" == typeof e ? tx(e) ? n1 : rp.test(e) ? n3 : it : Array.isArray(e) ? n7 : "object" == typeof e ? rp.test(e) ? n3 : ie : n1
    }
    function n7(e, t) {
        let r = [...e]
          , n = r.length
          , i = e.map( (e, r) => n9(e)(e, t[r]));
        return e => {
            for (let t = 0; t < n; t++)
                r[t] = i[t](e);
            return r
        }
    }
    function ie(e, t) {
        let r = {
            ...e,
            ...t
        }
          , n = {};
        for (let i in r)
            void 0 !== e[i] && void 0 !== t[i] && (n[i] = n9(e[i])(e[i], t[i]));
        return e => {
            for (let t in n)
                r[t] = n[t](e);
            return r
        }
    }
    let it = (e, t) => {
        let r = rj.createTransformer(t)
          , n = rv(e)
          , i = rv(t);
        if (!(n.indexes.var.length === i.indexes.var.length && n.indexes.color.length === i.indexes.color.length && n.indexes.number.length >= i.indexes.number.length))
            return tW(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"),
            n1(e, t);
        if (n6.has(e) && !i.values.length || n6.has(t) && !n.values.length)
            return n6.has(e) ? r => r <= 0 ? e : t : r => r >= 1 ? t : e;
        return nK(n7(function(e, t) {
            let r = []
              , n = {
                color: 0,
                var: 0,
                number: 0
            };
            for (let i = 0; i < t.values.length; i++) {
                let a = t.types[i]
                  , s = e.indexes[a][n[a]]
                  , o = e.values[s] ?? 0;
                r[i] = o,
                n[a]++
            }
            return r
        }(n, i), i.values), r)
    }
    ;
    function ir(e, t, r) {
        return "number" == typeof e && "number" == typeof t && "number" == typeof r ? tg(e, t, r) : n9(e)(e, t)
    }
    let ii = e => {
        let t = ({timestamp: t}) => e(t);
        return {
            start: (e=!0) => t5.update(t, e),
            stop: () => t4(t),
            now: () => t3.isProcessing ? t3.timestamp : rL.now()
        }
    }
      , ia = (e, t, r=10) => {
        let n = ""
          , i = Math.max(Math.round(t / r), 2);
        for (let t = 0; t < i; t++)
            n += Math.round(1e4 * e(t / (i - 1))) / 1e4 + ", ";
        return `linear(${n.substring(0, n.length - 2)})`
    }
    ;
    function is(e) {
        let t = 0
          , r = e.next(t);
        for (; !r.done && t < 2e4; )
            t += 50,
            r = e.next(t);
        return t >= 2e4 ? 1 / 0 : t
    }
    function io(e, t, r) {
        var n, i;
        let a = Math.max(t - 5, 0);
        return n = r - e(a),
        (i = t - a) ? 1e3 / i * n : 0
    }
    let il = .01
      , ic = 2
      , iu = .005
      , id = .5;
    function ih(e, t) {
        return e * Math.sqrt(1 - t * t)
    }
    let ip = ["duration", "bounce"]
      , im = ["stiffness", "damping", "mass"];
    function ix(e, t) {
        return t.some(t => void 0 !== e[t])
    }
    function iy(e=.3, t=.3) {
        let r, n = "object" != typeof e ? {
            visualDuration: e,
            keyframes: [0, 1],
            bounce: t
        } : e, {restSpeed: i, restDelta: a} = n, s = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], l = {
            done: !1,
            value: s
        }, {stiffness: c, damping: u, mass: d, duration: h, velocity: p, isResolvedFromDuration: m} = function(e) {
            let t = {
                velocity: 0,
                stiffness: 100,
                damping: 10,
                mass: 1,
                isResolvedFromDuration: !1,
                ...e
            };
            if (!ix(e, im) && ix(e, ip))
                if (e.visualDuration) {
                    let r = 2 * Math.PI / (1.2 * e.visualDuration)
                      , n = r * r
                      , i = 2 * tE(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(n);
                    t = {
                        ...t,
                        mass: 1,
                        stiffness: n,
                        damping: i
                    }
                } else {
                    let r = function({duration: e=800, bounce: t=.3, velocity: r=0, mass: n=1}) {
                        let i, a;
                        tW(e <= nZ(10), "Spring duration must be 10 seconds or less", "spring-duration-limit");
                        let s = 1 - t;
                        s = tE(.05, 1, s),
                        e = tE(.01, 10, e / 1e3),
                        s < 1 ? (i = t => {
                            let n = t * s
                              , i = n * e;
                            return .001 - (n - r) / ih(t, s) * Math.exp(-i)
                        }
                        ,
                        a = t => {
                            let n = t * s * e
                              , a = Math.pow(s, 2) * Math.pow(t, 2) * e
                              , o = Math.exp(-n)
                              , l = ih(Math.pow(t, 2), s);
                            return (n * r + r - a) * o * (-i(t) + .001 > 0 ? -1 : 1) / l
                        }
                        ) : (i = t => -.001 + Math.exp(-t * e) * ((t - r) * e + 1),
                        a = t => e * e * (r - t) * Math.exp(-t * e));
                        let o = function(e, t, r) {
                            let n = r;
                            for (let r = 1; r < 12; r++)
                                n -= e(n) / t(n);
                            return n
                        }(i, a, 5 / e);
                        if (e = nZ(e),
                        isNaN(o))
                            return {
                                stiffness: 100,
                                damping: 10,
                                duration: e
                            };
                        {
                            let t = Math.pow(o, 2) * n;
                            return {
                                stiffness: t,
                                damping: 2 * s * Math.sqrt(n * t),
                                duration: e
                            }
                        }
                    }(e);
                    (t = {
                        ...t,
                        ...r,
                        mass: 1
                    }).isResolvedFromDuration = !0
                }
            return t
        }({
            ...n,
            velocity: -((n.velocity || 0) / 1e3)
        }), f = p || 0, x = u / (2 * Math.sqrt(c * d)), y = o - s, v = Math.sqrt(c / d) / 1e3, g = 5 > Math.abs(y);
        if (i || (i = g ? il : ic),
        a || (a = g ? iu : id),
        x < 1) {
            let e = ih(v, x);
            r = t => o - Math.exp(-x * v * t) * ((f + x * v * y) / e * Math.sin(e * t) + y * Math.cos(e * t))
        } else if (1 === x)
            r = e => o - Math.exp(-v * e) * (y + (f + v * y) * e);
        else {
            let e = v * Math.sqrt(x * x - 1);
            r = t => {
                let r = Math.exp(-x * v * t)
                  , n = Math.min(e * t, 300);
                return o - r * ((f + x * v * y) * Math.sinh(n) + e * y * Math.cosh(n)) / e
            }
        }
        let b = {
            calculatedDuration: m && h || null,
            next: e => {
                let t = r(e);
                if (m)
                    l.done = e >= h;
                else {
                    let n = 0 === e ? f : 0;
                    x < 1 && (n = 0 === e ? nZ(f) : io(r, e, t));
                    let s = Math.abs(o - t) <= a;
                    l.done = Math.abs(n) <= i && s
                }
                return l.value = l.done ? o : t,
                l
            }
            ,
            toString: () => {
                let e = Math.min(is(b), 2e4)
                  , t = ia(t => b.next(e * t).value, e, 30);
                return e + "ms " + t
            }
            ,
            toTransition: () => {}
        };
        return b
    }
    function iv({keyframes: e, velocity: t=0, power: r=.8, timeConstant: n=325, bounceDamping: i=10, bounceStiffness: a=500, modifyTarget: s, min: o, max: l, restDelta: c=.5, restSpeed: u}) {
        let d, h, p = e[0], m = {
            done: !1,
            value: p
        }, f = r * t, x = p + f, y = void 0 === s ? x : s(x);
        y !== x && (f = y - p);
        let v = e => -f * Math.exp(-e / n)
          , g = e => y + v(e)
          , b = e => {
            let t = v(e)
              , r = g(e);
            m.done = Math.abs(t) <= c,
            m.value = m.done ? y : r
        }
          , w = e => {
            let t;
            if (t = m.value,
            void 0 !== o && t < o || void 0 !== l && t > l) {
                var r;
                d = e,
                h = iy({
                    keyframes: [m.value, (r = m.value,
                    void 0 === o ? l : void 0 === l || Math.abs(o - r) < Math.abs(l - r) ? o : l)],
                    velocity: io(g, e, m.value),
                    damping: i,
                    stiffness: a,
                    restDelta: c,
                    restSpeed: u
                })
            }
        }
        ;
        return w(0),
        {
            calculatedDuration: null,
            next: e => {
                let t = !1;
                return (h || void 0 !== d || (t = !0,
                b(e),
                w(e)),
                void 0 !== d && e >= d) ? h.next(e - d) : (t || b(e),
                m)
            }
        }
    }
    iy.applyToOptions = e => {
        let t = function(e, t=100, r) {
            let n = r({
                ...e,
                keyframes: [0, t]
            })
              , i = Math.min(is(n), 2e4);
            return {
                type: "keyframes",
                ease: e => n.next(i * e).value / t,
                duration: i / 1e3
            }
        }(e, 100, iy);
        return e.ease = t.ease,
        e.duration = nZ(t.duration),
        e.type = "keyframes",
        e
    }
    ;
    let ig = (e, t, r) => (((1 - 3 * r + 3 * t) * e + (3 * r - 6 * t)) * e + 3 * t) * e;
    function ib(e, t, r, n) {
        return e === t && r === n ? tQ : i => 0 === i || 1 === i ? i : ig(function(e, t, r, n, i) {
            let a, s, o = 0;
            do
                (a = ig(s = t + (r - t) / 2, n, i) - e) > 0 ? r = s : t = s;
            while (Math.abs(a) > 1e-7 && ++o < 12)return s
        }(i, 0, 1, e, r), t, n)
    }
    let iw = ib(.42, 0, 1, 1)
      , ij = ib(0, 0, .58, 1)
      , iN = ib(.42, 0, .58, 1)
      , ik = e => t => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2
      , iS = e => t => 1 - e(1 - t)
      , iC = ib(.33, 1.53, .69, .99)
      , iM = iS(iC)
      , iA = ik(iM)
      , iT = e => (e *= 2) < 1 ? .5 * iM(e) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
      , iP = e => 1 - Math.sin(Math.acos(e))
      , i_ = iS(iP)
      , iE = ik(iP)
      , iI = e => Array.isArray(e) && "number" == typeof e[0]
      , iD = {
        linear: tQ,
        easeIn: iw,
        easeInOut: iN,
        easeOut: ij,
        circIn: iP,
        circInOut: iE,
        circOut: i_,
        backIn: iM,
        backInOut: iA,
        backOut: iC,
        anticipate: iT
    }
      , iR = e => {
        if (iI(e)) {
            tY(4 === e.length, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
            let[t,r,n,i] = e;
            return ib(t, r, n, i)
        }
        return "string" == typeof e ? (tY(void 0 !== iD[e], `Invalid easing type '${e}'`, "invalid-easing-type"),
        iD[e]) : e
    }
      , iL = (e, t, r) => {
        let n = t - e;
        return 0 === n ? 1 : (r - e) / n
    }
    ;
    function iz({duration: e=300, keyframes: t, times: r, ease: n="easeInOut"}) {
        var i;
        let a, s = Array.isArray(n) && "number" != typeof n[0] ? n.map(iR) : iR(n), o = {
            done: !1,
            value: t[0]
        }, l = function(e, t, {clamp: r=!0, ease: n, mixer: i}={}) {
            let a = e.length;
            if (tY(a === t.length, "Both input and output ranges must be the same length", "range-length"),
            1 === a)
                return () => t[0];
            if (2 === a && t[0] === t[1])
                return () => t[1];
            let s = e[0] === e[1];
            e[0] > e[a - 1] && (e = [...e].reverse(),
            t = [...t].reverse());
            let o = function(e, t, r) {
                let n = []
                  , i = r || t0.mix || ir
                  , a = e.length - 1;
                for (let r = 0; r < a; r++) {
                    let a = i(e[r], e[r + 1]);
                    t && (a = nK(Array.isArray(t) ? t[r] || tQ : t, a)),
                    n.push(a)
                }
                return n
            }(t, n, i)
              , l = o.length
              , c = r => {
                if (s && r < e[0])
                    return t[0];
                let n = 0;
                if (l > 1)
                    for (; n < e.length - 2 && !(r < e[n + 1]); n++)
                        ;
                let i = iL(e[n], e[n + 1], r);
                return o[n](i)
            }
            ;
            return r ? t => c(tE(e[0], e[a - 1], t)) : c
        }((i = r && r.length === t.length ? r : (!function(e, t) {
            let r = e[e.length - 1];
            for (let n = 1; n <= t; n++) {
                let i = iL(0, t, n);
                e.push(tg(r, 1, i))
            }
        }(a = [0], t.length - 1),
        a),
        i.map(t => t * e)), t, {
            ease: Array.isArray(s) ? s : t.map( () => s || iN).splice(0, t.length - 1)
        });
        return {
            calculatedDuration: e,
            next: t => (o.value = l(t),
            o.done = t >= e,
            o)
        }
    }
    let iO = e => null !== e;
    function iV(e, {repeat: t, repeatType: r="loop"}, n, i=1) {
        let a = e.filter(iO)
          , s = i < 0 || t && "loop" !== r && t % 2 == 1 ? 0 : a.length - 1;
        return s && void 0 !== n ? n : a[s]
    }
    let i$ = {
        decay: iv,
        inertia: iv,
        tween: iz,
        keyframes: iz,
        spring: iy
    };
    function iF(e) {
        "string" == typeof e.type && (e.type = i$[e.type])
    }
    class iB {
        constructor() {
            this.updateFinished()
        }
        get finished() {
            return this._finished
        }
        updateFinished() {
            this._finished = new Promise(e => {
                this.resolve = e
            }
            )
        }
        notifyFinished() {
            this.resolve()
        }
        then(e, t) {
            return this.finished.then(e, t)
        }
    }
    let iH = e => e / 100;
    class iU extends iB {
        constructor(e) {
            super(),
            this.state = "idle",
            this.startTime = null,
            this.isStopped = !1,
            this.currentTime = 0,
            this.holdTime = null,
            this.playbackSpeed = 1,
            this.stop = () => {
                let {motionValue: e} = this.options;
                e && e.updatedAt !== rL.now() && this.tick(rL.now()),
                this.isStopped = !0,
                "idle" !== this.state && (this.teardown(),
                this.options.onStop?.())
            }
            ,
            nQ.mainThread++,
            this.options = e,
            this.initAnimation(),
            this.play(),
            !1 === e.autoplay && this.pause()
        }
        initAnimation() {
            let {options: e} = this;
            iF(e);
            let {type: t=iz, repeat: r=0, repeatDelay: n=0, repeatType: i, velocity: a=0} = e
              , {keyframes: s} = e
              , o = t || iz;
            o !== iz && "number" != typeof s[0] && (this.mixKeyframes = nK(iH, ir(s[0], s[1])),
            s = [0, 100]);
            let l = o({
                ...e,
                keyframes: s
            });
            "mirror" === i && (this.mirroredGenerator = o({
                ...e,
                keyframes: [...s].reverse(),
                velocity: -a
            })),
            null === l.calculatedDuration && (l.calculatedDuration = is(l));
            let {calculatedDuration: c} = l;
            this.calculatedDuration = c,
            this.resolvedDuration = c + n,
            this.totalDuration = this.resolvedDuration * (r + 1) - n,
            this.generator = l
        }
        updateTime(e) {
            let t = Math.round(e - this.startTime) * this.playbackSpeed;
            null !== this.holdTime ? this.currentTime = this.holdTime : this.currentTime = t
        }
        tick(e, t=!1) {
            let {generator: r, totalDuration: n, mixKeyframes: i, mirroredGenerator: a, resolvedDuration: s, calculatedDuration: o} = this;
            if (null === this.startTime)
                return r.next(0);
            let {delay: l=0, keyframes: c, repeat: u, repeatType: d, repeatDelay: h, type: p, onUpdate: m, finalKeyframe: f} = this.options;
            this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - n / this.speed, this.startTime)),
            t ? this.currentTime = e : this.updateTime(e);
            let x = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1)
              , y = this.playbackSpeed >= 0 ? x < 0 : x > n;
            this.currentTime = Math.max(x, 0),
            "finished" === this.state && null === this.holdTime && (this.currentTime = n);
            let v = this.currentTime
              , g = r;
            if (u) {
                let e = Math.min(this.currentTime, n) / s
                  , t = Math.floor(e)
                  , r = e % 1;
                !r && e >= 1 && (r = 1),
                1 === r && t--,
                (t = Math.min(t, u + 1)) % 2 && ("reverse" === d ? (r = 1 - r,
                h && (r -= h / s)) : "mirror" === d && (g = a)),
                v = tE(0, 1, r) * s
            }
            let b = y ? {
                done: !1,
                value: c[0]
            } : g.next(v);
            i && (b.value = i(b.value));
            let {done: w} = b;
            y || null === o || (w = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0);
            let j = null === this.holdTime && ("finished" === this.state || "running" === this.state && w);
            return j && p !== iv && (b.value = iV(c, this.options, f, this.speed)),
            m && m(b.value),
            j && this.finish(),
            b
        }
        then(e, t) {
            return this.finished.then(e, t)
        }
        get duration() {
            return this.calculatedDuration / 1e3
        }
        get iterationDuration() {
            let {delay: e=0} = this.options || {};
            return this.duration + e / 1e3
        }
        get time() {
            return this.currentTime / 1e3
        }
        set time(e) {
            e = nZ(e),
            this.currentTime = e,
            null === this.startTime || null !== this.holdTime || 0 === this.playbackSpeed ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed),
            this.driver?.start(!1)
        }
        get speed() {
            return this.playbackSpeed
        }
        set speed(e) {
            this.updateTime(rL.now());
            let t = this.playbackSpeed !== e;
            this.playbackSpeed = e,
            t && (this.time = this.currentTime / 1e3)
        }
        play() {
            if (this.isStopped)
                return;
            let {driver: e=ii, startTime: t} = this.options;
            this.driver || (this.driver = e(e => this.tick(e))),
            this.options.onPlay?.();
            let r = this.driver.now();
            "finished" === this.state ? (this.updateFinished(),
            this.startTime = r) : null !== this.holdTime ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = t ?? r),
            "finished" === this.state && this.speed < 0 && (this.startTime += this.calculatedDuration),
            this.holdTime = null,
            this.state = "running",
            this.driver.start()
        }
        pause() {
            this.state = "paused",
            this.updateTime(rL.now()),
            this.holdTime = this.currentTime
        }
        complete() {
            "running" !== this.state && this.play(),
            this.state = "finished",
            this.holdTime = null
        }
        finish() {
            this.notifyFinished(),
            this.teardown(),
            this.state = "finished",
            this.options.onComplete?.()
        }
        cancel() {
            this.holdTime = null,
            this.startTime = 0,
            this.tick(0),
            this.teardown(),
            this.options.onCancel?.()
        }
        teardown() {
            this.state = "idle",
            this.stopDriver(),
            this.startTime = this.holdTime = null,
            nQ.mainThread--
        }
        stopDriver() {
            this.driver && (this.driver.stop(),
            this.driver = void 0)
        }
        sample(e) {
            return this.startTime = 0,
            this.tick(e, !0)
        }
        attachTimeline(e) {
            return this.options.allowFlatten && (this.options.type = "keyframes",
            this.options.ease = "linear",
            this.initAnimation()),
            this.driver?.stop(),
            e.observe(this)
        }
    }
    function iq(e) {
        let t;
        return () => (void 0 === t && (t = e()),
        t)
    }
    let iW = iq( () => void 0 !== window.ScrollTimeline)
      , iY = {}
      , iG = (s = iq( () => {
        try {
            document.createElement("div").animate({
                opacity: 0
            }, {
                easing: "linear(0, 1)"
            })
        } catch (e) {
            return !1
        }
        return !0
    }
    ),
    () => iY.linearEasing ?? s())
      , iX = ([e,t,r,n]) => `cubic-bezier(${e}, ${t}, ${r}, ${n})`
      , iJ = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: iX([0, .65, .55, 1]),
        circOut: iX([.55, 0, 1, .45]),
        backIn: iX([.31, .01, .66, -.59]),
        backOut: iX([.33, 1.53, .69, .99])
    };
    function iK(e) {
        return "function" == typeof e && "applyToOptions"in e
    }
    class iZ extends iB {
        constructor(e) {
            if (super(),
            this.finishedTime = null,
            this.isStopped = !1,
            !e)
                return;
            const {element: t, name: r, keyframes: n, pseudoElement: i, allowFlatten: a=!1, finalKeyframe: s, onComplete: o} = e;
            this.isPseudoElement = !!i,
            this.allowFlatten = a,
            this.options = e,
            tY("string" != typeof e.type, 'Mini animate() doesn\'t support "type" as a string.', "mini-spring");
            const l = function({type: e, ...t}) {
                return iK(e) && iG() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300),
                t.ease ?? (t.ease = "easeOut"),
                t)
            }(e);
            this.animation = function(e, t, r, {delay: n=0, duration: i=300, repeat: a=0, repeatType: s="loop", ease: o="easeOut", times: l}={}, c) {
                let u = {
                    [t]: r
                };
                l && (u.offset = l);
                let d = function e(t, r) {
                    if (t)
                        return "function" == typeof t ? iG() ? ia(t, r) : "ease-out" : iI(t) ? iX(t) : Array.isArray(t) ? t.map(t => e(t, r) || iJ.easeOut) : iJ[t]
                }(o, i);
                Array.isArray(d) && (u.easing = d);
                let h = {
                    delay: n,
                    duration: i,
                    easing: Array.isArray(d) ? "linear" : d,
                    fill: "both",
                    iterations: a + 1,
                    direction: "reverse" === s ? "alternate" : "normal"
                };
                c && (h.pseudoElement = c);
                let p = e.animate(u, h);
                return p
            }(t, r, n, l, i),
            !1 === l.autoplay && this.animation.pause(),
            this.animation.onfinish = () => {
                if (this.finishedTime = this.time,
                !i) {
                    let e = iV(n, this.options, s, this.speed);
                    this.updateMotionValue ? this.updateMotionValue(e) : r.startsWith("--") ? t.style.setProperty(r, e) : t.style[r] = e,
                    this.animation.cancel()
                }
                o?.(),
                this.notifyFinished()
            }
        }
        play() {
            this.isStopped || (this.animation.play(),
            "finished" === this.state && this.updateFinished())
        }
        pause() {
            this.animation.pause()
        }
        complete() {
            this.animation.finish?.()
        }
        cancel() {
            try {
                this.animation.cancel()
            } catch (e) {}
        }
        stop() {
            if (this.isStopped)
                return;
            this.isStopped = !0;
            let {state: e} = this;
            "idle" !== e && "finished" !== e && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
            this.isPseudoElement || this.cancel())
        }
        commitStyles() {
            this.isPseudoElement || this.animation.commitStyles?.()
        }
        get duration() {
            return Number(this.animation.effect?.getComputedTiming?.().duration || 0) / 1e3
        }
        get iterationDuration() {
            let {delay: e=0} = this.options || {};
            return this.duration + e / 1e3
        }
        get time() {
            return (Number(this.animation.currentTime) || 0) / 1e3
        }
        set time(e) {
            this.finishedTime = null,
            this.animation.currentTime = nZ(e)
        }
        get speed() {
            return this.animation.playbackRate
        }
        set speed(e) {
            e < 0 && (this.finishedTime = null),
            this.animation.playbackRate = e
        }
        get state() {
            return null !== this.finishedTime ? "finished" : this.animation.playState
        }
        get startTime() {
            return Number(this.animation.startTime)
        }
        set startTime(e) {
            this.animation.startTime = e
        }
        attachTimeline({timeline: e, observe: t}) {
            return (this.allowFlatten && this.animation.effect?.updateTiming({
                easing: "linear"
            }),
            this.animation.onfinish = null,
            e && iW()) ? (this.animation.timeline = e,
            tQ) : t(this)
        }
    }
    let iQ = {
        anticipate: iT,
        backInOut: iA,
        circInOut: iE
    };
    class i0 extends iZ {
        constructor(e) {
            !function(e) {
                "string" == typeof e.ease && e.ease in iQ && (e.ease = iQ[e.ease])
            }(e),
            iF(e),
            super(e),
            e.startTime && (this.startTime = e.startTime),
            this.options = e
        }
        updateMotionValue(e) {
            let {motionValue: t, onUpdate: r, onComplete: n, element: i, ...a} = this.options;
            if (!t)
                return;
            if (void 0 !== e)
                return void t.set(e);
            let s = new iU({
                ...a,
                autoplay: !1
            })
              , o = nZ(this.finishedTime ?? this.time);
            t.setWithVelocity(s.sample(o - 10).value, s.sample(o).value, 10),
            s.stop()
        }
    }
    let i1 = (e, t) => "zIndex" !== t && !!("number" == typeof e || Array.isArray(e) || "string" == typeof e && (rj.test(e) || "0" === e) && !e.startsWith("url("))
      , i2 = new Set(["opacity", "clipPath", "filter", "transform"])
      , i5 = iq( () => Object.hasOwnProperty.call(Element.prototype, "animate"));
    class i4 extends iB {
        constructor({autoplay: e=!0, delay: t=0, type: r="keyframes", repeat: n=0, repeatDelay: i=0, repeatType: a="loop", keyframes: s, name: o, motionValue: l, element: c, ...u}) {
            super(),
            this.stop = () => {
                this._animation && (this._animation.stop(),
                this.stopTimeline?.()),
                this.keyframeResolver?.cancel()
            }
            ,
            this.createdAt = rL.now();
            const d = {
                autoplay: e,
                delay: t,
                type: r,
                repeat: n,
                repeatDelay: i,
                repeatType: a,
                name: o,
                motionValue: l,
                element: c,
                ...u
            }
              , h = c?.KeyframeResolver || rn;
            this.keyframeResolver = new h(s, (e, t, r) => this.onKeyframesResolved(e, t, d, !r),o,l,c),
            this.keyframeResolver?.scheduleResolve()
        }
        onKeyframesResolved(e, t, r, n) {
            this.keyframeResolver = void 0;
            let {name: i, type: a, velocity: s, delay: o, isHandoff: l, onUpdate: c} = r;
            this.resolvedAt = rL.now(),
            !function(e, t, r, n) {
                let i = e[0];
                if (null === i)
                    return !1;
                if ("display" === t || "visibility" === t)
                    return !0;
                let a = e[e.length - 1]
                  , s = i1(i, t)
                  , o = i1(a, t);
                return tW(s === o, `You are trying to animate ${t} from "${i}" to "${a}". "${s ? a : i}" is not an animatable value.`, "value-not-animatable"),
                !!s && !!o && (function(e) {
                    let t = e[0];
                    if (1 === e.length)
                        return !0;
                    for (let r = 0; r < e.length; r++)
                        if (e[r] !== t)
                            return !0
                }(e) || ("spring" === r || iK(r)) && n)
            }(e, i, a, s) && ((t0.instantAnimations || !o) && c?.(iV(e, r, t)),
            e[0] = e[e.length - 1],
            nX(r),
            r.repeat = 0);
            let u = {
                startTime: n ? this.resolvedAt && this.resolvedAt - this.createdAt > 40 ? this.resolvedAt : this.createdAt : void 0,
                finalKeyframe: t,
                ...r,
                keyframes: e
            }
              , d = !l && function(e) {
                let {motionValue: t, name: r, repeatDelay: n, repeatType: i, damping: a, type: s} = e;
                if (!(t?.owner?.current instanceof HTMLElement))
                    return !1;
                let {onUpdate: o, transformTemplate: l} = t.owner.getProps();
                return i5() && r && i2.has(r) && ("transform" !== r || !l) && !o && !n && "mirror" !== i && 0 !== a && "inertia" !== s
            }(u) ? new i0({
                ...u,
                element: u.motionValue.owner.current
            }) : new iU(u);
            d.finished.then( () => this.notifyFinished()).catch(tQ),
            this.pendingTimeline && (this.stopTimeline = d.attachTimeline(this.pendingTimeline),
            this.pendingTimeline = void 0),
            this._animation = d
        }
        get finished() {
            return this._animation ? this.animation.finished : this._finished
        }
        then(e, t) {
            return this.finished.finally(e).then( () => {}
            )
        }
        get animation() {
            return this._animation || (this.keyframeResolver?.resume(),
            re = !0,
            rr(),
            rt(),
            re = !1),
            this._animation
        }
        get duration() {
            return this.animation.duration
        }
        get iterationDuration() {
            return this.animation.iterationDuration
        }
        get time() {
            return this.animation.time
        }
        set time(e) {
            this.animation.time = e
        }
        get speed() {
            return this.animation.speed
        }
        get state() {
            return this.animation.state
        }
        set speed(e) {
            this.animation.speed = e
        }
        get startTime() {
            return this.animation.startTime
        }
        attachTimeline(e) {
            return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e,
            () => this.stop()
        }
        play() {
            this.animation.play()
        }
        pause() {
            this.animation.pause()
        }
        complete() {
            this.animation.complete()
        }
        cancel() {
            this._animation && this.animation.cancel(),
            this.keyframeResolver?.cancel()
        }
    }
    let i3 = e => null !== e
      , i6 = {
        type: "spring",
        stiffness: 500,
        damping: 25,
        restSpeed: 10
    }
      , i8 = {
        type: "keyframes",
        duration: .8
    }
      , i9 = {
        type: "keyframes",
        ease: [.25, .1, .35, 1],
        duration: .3
    }
      , i7 = (e, t, r, n={}, i, a) => s => {
        let o = nW(n, e) || {}
          , l = o.delay || n.delay || 0
          , {elapsed: c=0} = n;
        c -= nZ(l);
        let u = {
            keyframes: Array.isArray(r) ? r : [null, r],
            ease: "easeOut",
            velocity: t.getVelocity(),
            ...o,
            delay: -c,
            onUpdate: e => {
                t.set(e),
                o.onUpdate && o.onUpdate(e)
            }
            ,
            onComplete: () => {
                s(),
                o.onComplete && o.onComplete()
            }
            ,
            name: e,
            motionValue: t,
            element: a ? void 0 : i
        };
        !function({when: e, delay: t, delayChildren: r, staggerChildren: n, staggerDirection: i, repeat: a, repeatType: s, repeatDelay: o, from: l, elapsed: c, ...u}) {
            return !!Object.keys(u).length
        }(o) && Object.assign(u, ( (e, {keyframes: t}) => t.length > 2 ? i8 : tr.has(e) ? e.startsWith("scale") ? {
            type: "spring",
            stiffness: 550,
            damping: 0 === t[1] ? 2 * Math.sqrt(550) : 30,
            restSpeed: 10
        } : i6 : i9)(e, u)),
        u.duration && (u.duration = nZ(u.duration)),
        u.repeatDelay && (u.repeatDelay = nZ(u.repeatDelay)),
        void 0 !== u.from && (u.keyframes[0] = u.from);
        let d = !1;
        if (!1 !== u.type && (0 !== u.duration || u.repeatDelay) || (nX(u),
        0 === u.delay && (d = !0)),
        (t0.instantAnimations || t0.skipAnimations) && (d = !0,
        nX(u),
        u.delay = 0),
        u.allowFlatten = !o.type && !o.ease,
        d && !a && void 0 !== t.get()) {
            let e = function(e, {repeat: t, repeatType: r="loop"}, n) {
                let i = e.filter(i3)
                  , a = t && "loop" !== r && t % 2 == 1 ? 0 : i.length - 1;
                return i[a]
            }(u.keyframes, o);
            if (void 0 !== e)
                return void t5.update( () => {
                    u.onUpdate(e),
                    u.onComplete()
                }
                )
        }
        return o.isSync ? new iU(u) : new i4(u)
    }
    ;
    function ae(e, t, {delay: r=0, transitionOverride: n, type: i}={}) {
        let {transition: a=e.getDefaultTransition(), transitionEnd: s, ...o} = t;
        n && (a = n);
        let l = []
          , c = i && e.animationState && e.animationState.getState()[i];
        for (let t in o) {
            let n = e.getValue(t, e.latestValues[t] ?? null)
              , i = o[t];
            if (void 0 === i || c && function({protectedKeys: e, needsAnimating: t}, r) {
                let n = e.hasOwnProperty(r) && !0 !== t[r];
                return t[r] = !1,
                n
            }(c, t))
                continue;
            let s = {
                delay: r,
                ...nW(a || {}, t)
            }
              , u = n.get();
            if (void 0 !== u && !n.isAnimating && !Array.isArray(i) && i === u && !s.velocity)
                continue;
            let d = !1;
            if (window.MotionHandoffAnimation) {
                let r = e.props[nF];
                if (r) {
                    let e = window.MotionHandoffAnimation(r, t, t5);
                    null !== e && (s.startTime = e,
                    d = !0)
                }
            }
            nG(e, t),
            n.start(i7(t, n, i, e.shouldReduceMotion && t_.has(t) ? {
                type: !1
            } : s, e, d));
            let h = n.animation;
            h && l.push(h)
        }
        return s && Promise.all(l).then( () => {
            t5.update( () => {
                s && function(e, t) {
                    let {transitionEnd: r={}, transition: n={}, ...i} = nq(e, t) || {};
                    for (let t in i = {
                        ...i,
                        ...r
                    }) {
                        var a;
                        let r = nY(a = i[t]) ? a[a.length - 1] || 0 : a;
                        e.hasValue(t) ? e.getValue(t).set(r) : e.addValue(t, rF(r))
                    }
                }(e, s)
            }
            )
        }
        ),
        l
    }
    function at(e, t, r, n=0, i=1) {
        let a = Array.from(e).sort( (e, t) => e.sortNodePosition(t)).indexOf(t)
          , s = e.size
          , o = (s - 1) * n;
        return "function" == typeof r ? r(a, s) : 1 === i ? a * n : o - a * n
    }
    function ar(e, t, r={}) {
        let n = nq(e, t, "exit" === r.type ? e.presenceContext?.custom : void 0)
          , {transition: i=e.getDefaultTransition() || {}} = n || {};
        r.transitionOverride && (i = r.transitionOverride);
        let a = n ? () => Promise.all(ae(e, n, r)) : () => Promise.resolve()
          , s = e.variantChildren && e.variantChildren.size ? (n=0) => {
            let {delayChildren: a=0, staggerChildren: s, staggerDirection: o} = i;
            return function(e, t, r=0, n=0, i=0, a=1, s) {
                let o = [];
                for (let l of e.variantChildren)
                    l.notify("AnimationStart", t),
                    o.push(ar(l, t, {
                        ...s,
                        delay: r + ("function" == typeof n ? 0 : n) + at(e.variantChildren, l, n, i, a)
                    }).then( () => l.notify("AnimationComplete", t)));
                return Promise.all(o)
            }(e, t, n, a, s, o, r)
        }
        : () => Promise.resolve()
          , {when: o} = i;
        if (!o)
            return Promise.all([a(), s(r.delay)]);
        {
            let[e,t] = "beforeChildren" === o ? [a, s] : [s, a];
            return e().then( () => t())
        }
    }
    function an(e, t) {
        if (!Array.isArray(t))
            return !1;
        let r = t.length;
        if (r !== e.length)
            return !1;
        for (let n = 0; n < r; n++)
            if (t[n] !== e[n])
                return !1;
        return !0
    }
    let ai = r5.length
      , aa = [...r2].reverse()
      , as = r2.length;
    function ao(e=!1) {
        return {
            isActive: e,
            protectedKeys: {},
            needsAnimating: {},
            prevResolvedValues: {}
        }
    }
    function al() {
        return {
            animate: ao(!0),
            whileInView: ao(),
            whileHover: ao(),
            whileTap: ao(),
            whileDrag: ao(),
            whileFocus: ao(),
            exit: ao()
        }
    }
    class ac {
        constructor(e) {
            this.isMounted = !1,
            this.node = e
        }
        update() {}
    }
    let au = 0
      , ad = {
        x: !1,
        y: !1
    };
    function ah(e, t, r, n={
        passive: !0
    }) {
        return e.addEventListener(t, r, n),
        () => e.removeEventListener(t, r)
    }
    let ap = e => "mouse" === e.pointerType ? "number" != typeof e.button || e.button <= 0 : !1 !== e.isPrimary;
    function am(e) {
        return {
            point: {
                x: e.pageX,
                y: e.pageY
            }
        }
    }
    function af(e, t, r, n) {
        return ah(e, t, e => ap(e) && r(e, am(e)), n)
    }
    function ax(e) {
        return e.max - e.min
    }
    function ay(e, t, r, n=.5) {
        e.origin = n,
        e.originPoint = tg(t.min, t.max, e.origin),
        e.scale = ax(r) / ax(t),
        e.translate = tg(r.min, r.max, e.origin) - e.originPoint,
        (e.scale >= .9999 && e.scale <= 1.0001 || isNaN(e.scale)) && (e.scale = 1),
        (e.translate >= -.01 && e.translate <= .01 || isNaN(e.translate)) && (e.translate = 0)
    }
    function av(e, t, r, n) {
        ay(e.x, t.x, r.x, n ? n.originX : void 0),
        ay(e.y, t.y, r.y, n ? n.originY : void 0)
    }
    function ag(e, t, r) {
        e.min = r.min + t.min,
        e.max = e.min + ax(t)
    }
    function ab(e, t, r) {
        e.min = t.min - r.min,
        e.max = e.min + ax(t)
    }
    function aw(e, t, r) {
        ab(e.x, t.x, r.x),
        ab(e.y, t.y, r.y)
    }
    function aj(e) {
        return [e("x"), e("y")]
    }
    let aN = ({current: e}) => e ? e.ownerDocument.defaultView : null
      , ak = (e, t) => Math.abs(e - t);
    class aS {
        constructor(e, t, {transformPagePoint: r, contextWindow: n=window, dragSnapToOrigin: i=!1, distanceThreshold: a=3}={}) {
            if (this.startEvent = null,
            this.lastMoveEvent = null,
            this.lastMoveEventInfo = null,
            this.handlers = {},
            this.contextWindow = window,
            this.updatePoint = () => {
                var e, t;
                if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                    return;
                let r = aA(this.lastMoveEventInfo, this.history)
                  , n = null !== this.startEvent
                  , i = (e = r.offset,
                t = {
                    x: 0,
                    y: 0
                },
                Math.sqrt(ak(e.x, t.x) ** 2 + ak(e.y, t.y) ** 2) >= this.distanceThreshold);
                if (!n && !i)
                    return;
                let {point: a} = r
                  , {timestamp: s} = t3;
                this.history.push({
                    ...a,
                    timestamp: s
                });
                let {onStart: o, onMove: l} = this.handlers;
                n || (o && o(this.lastMoveEvent, r),
                this.startEvent = this.lastMoveEvent),
                l && l(this.lastMoveEvent, r)
            }
            ,
            this.handlePointerMove = (e, t) => {
                this.lastMoveEvent = e,
                this.lastMoveEventInfo = aC(t, this.transformPagePoint),
                t5.update(this.updatePoint, !0)
            }
            ,
            this.handlePointerUp = (e, t) => {
                this.end();
                let {onEnd: r, onSessionEnd: n, resumeAnimation: i} = this.handlers;
                if (this.dragSnapToOrigin && i && i(),
                !(this.lastMoveEvent && this.lastMoveEventInfo))
                    return;
                let a = aA("pointercancel" === e.type ? this.lastMoveEventInfo : aC(t, this.transformPagePoint), this.history);
                this.startEvent && r && r(e, a),
                n && n(e, a)
            }
            ,
            !ap(e))
                return;
            this.dragSnapToOrigin = i,
            this.handlers = t,
            this.transformPagePoint = r,
            this.distanceThreshold = a,
            this.contextWindow = n || window;
            const s = aC(am(e), this.transformPagePoint)
              , {point: o} = s
              , {timestamp: l} = t3;
            this.history = [{
                ...o,
                timestamp: l
            }];
            const {onSessionStart: c} = t;
            c && c(e, aA(s, this.history)),
            this.removeListeners = nK(af(this.contextWindow, "pointermove", this.handlePointerMove), af(this.contextWindow, "pointerup", this.handlePointerUp), af(this.contextWindow, "pointercancel", this.handlePointerUp))
        }
        updateHandlers(e) {
            this.handlers = e
        }
        end() {
            this.removeListeners && this.removeListeners(),
            t4(this.updatePoint)
        }
    }
    function aC(e, t) {
        return t ? {
            point: t(e.point)
        } : e
    }
    function aM(e, t) {
        return {
            x: e.x - t.x,
            y: e.y - t.y
        }
    }
    function aA({point: e}, t) {
        return {
            point: e,
            delta: aM(e, aT(t)),
            offset: aM(e, t[0]),
            velocity: function(e, t) {
                if (e.length < 2)
                    return {
                        x: 0,
                        y: 0
                    };
                let r = e.length - 1
                  , n = null
                  , i = aT(e);
                for (; r >= 0 && (n = e[r],
                !(i.timestamp - n.timestamp > nZ(.1))); )
                    r--;
                if (!n)
                    return {
                        x: 0,
                        y: 0
                    };
                let a = (i.timestamp - n.timestamp) / 1e3;
                if (0 === a)
                    return {
                        x: 0,
                        y: 0
                    };
                let s = {
                    x: (i.x - n.x) / a,
                    y: (i.y - n.y) / a
                };
                return s.x === 1 / 0 && (s.x = 0),
                s.y === 1 / 0 && (s.y = 0),
                s
            }(t, .1)
        }
    }
    function aT(e) {
        return e[e.length - 1]
    }
    function aP(e, t, r) {
        return {
            min: void 0 !== t ? e.min + t : void 0,
            max: void 0 !== r ? e.max + r - (e.max - e.min) : void 0
        }
    }
    function a_(e, t) {
        let r = t.min - e.min
          , n = t.max - e.max;
        return t.max - t.min < e.max - e.min && ([r,n] = [n, r]),
        {
            min: r,
            max: n
        }
    }
    function aE(e, t, r) {
        return {
            min: aI(e, t),
            max: aI(e, r)
        }
    }
    function aI(e, t) {
        return "number" == typeof e ? e : e[t] || 0
    }
    let aD = new WeakMap;
    class aR {
        constructor(e) {
            this.openDragLock = null,
            this.isDragging = !1,
            this.currentDirection = null,
            this.originPoint = {
                x: 0,
                y: 0
            },
            this.constraints = !1,
            this.hasMutatedConstraints = !1,
            this.elastic = rX(),
            this.latestPointerEvent = null,
            this.latestPanInfo = null,
            this.visualElement = e
        }
        start(e, {snapToCursor: t=!1, distanceThreshold: r}={}) {
            let {presenceContext: n} = this.visualElement;
            if (n && !1 === n.isPresent)
                return;
            let i = e => {
                let {dragSnapToOrigin: r} = this.getProps();
                r ? this.pauseAnimation() : this.stopAnimation(),
                t && this.snapToCursor(am(e).point)
            }
              , a = (e, t) => {
                let {drag: r, dragPropagation: n, onDragStart: i} = this.getProps();
                if (r && !n && (this.openDragLock && this.openDragLock(),
                this.openDragLock = function(e) {
                    if ("x" === e || "y" === e)
                        if (ad[e])
                            return null;
                        else
                            return ad[e] = !0,
                            () => {
                                ad[e] = !1
                            }
                            ;
                    return ad.x || ad.y ? null : (ad.x = ad.y = !0,
                    () => {
                        ad.x = ad.y = !1
                    }
                    )
                }(r),
                !this.openDragLock))
                    return;
                this.latestPointerEvent = e,
                this.latestPanInfo = t,
                this.isDragging = !0,
                this.currentDirection = null,
                this.resolveConstraints(),
                this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0,
                this.visualElement.projection.target = void 0),
                aj(e => {
                    let t = this.getAxisMotionValue(e).get() || 0;
                    if (tO.test(t)) {
                        let {projection: r} = this.visualElement;
                        if (r && r.layout) {
                            let n = r.layout.layoutBox[e];
                            n && (t = ax(n) * (parseFloat(t) / 100))
                        }
                    }
                    this.originPoint[e] = t
                }
                ),
                i && t5.postRender( () => i(e, t)),
                nG(this.visualElement, "transform");
                let {animationState: a} = this.visualElement;
                a && a.setActive("whileDrag", !0)
            }
              , s = (e, t) => {
                this.latestPointerEvent = e,
                this.latestPanInfo = t;
                let {dragPropagation: r, dragDirectionLock: n, onDirectionLock: i, onDrag: a} = this.getProps();
                if (!r && !this.openDragLock)
                    return;
                let {offset: s} = t;
                if (n && null === this.currentDirection) {
                    this.currentDirection = function(e, t=10) {
                        let r = null;
                        return Math.abs(e.y) > t ? r = "y" : Math.abs(e.x) > t && (r = "x"),
                        r
                    }(s),
                    null !== this.currentDirection && i && i(this.currentDirection);
                    return
                }
                this.updateAxis("x", t.point, s),
                this.updateAxis("y", t.point, s),
                this.visualElement.render(),
                a && a(e, t)
            }
              , o = (e, t) => {
                this.latestPointerEvent = e,
                this.latestPanInfo = t,
                this.stop(e, t),
                this.latestPointerEvent = null,
                this.latestPanInfo = null
            }
              , l = () => aj(e => "paused" === this.getAnimationState(e) && this.getAxisMotionValue(e).animation?.play())
              , {dragSnapToOrigin: c} = this.getProps();
            this.panSession = new aS(e,{
                onSessionStart: i,
                onStart: a,
                onMove: s,
                onSessionEnd: o,
                resumeAnimation: l
            },{
                transformPagePoint: this.visualElement.getTransformPagePoint(),
                dragSnapToOrigin: c,
                distanceThreshold: r,
                contextWindow: aN(this.visualElement)
            })
        }
        stop(e, t) {
            let r = e || this.latestPointerEvent
              , n = t || this.latestPanInfo
              , i = this.isDragging;
            if (this.cancel(),
            !i || !n || !r)
                return;
            let {velocity: a} = n;
            this.startAnimation(a);
            let {onDragEnd: s} = this.getProps();
            s && t5.postRender( () => s(r, n))
        }
        cancel() {
            this.isDragging = !1;
            let {projection: e, animationState: t} = this.visualElement;
            e && (e.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            this.panSession = void 0;
            let {dragPropagation: r} = this.getProps();
            !r && this.openDragLock && (this.openDragLock(),
            this.openDragLock = null),
            t && t.setActive("whileDrag", !1)
        }
        updateAxis(e, t, r) {
            let {drag: n} = this.getProps();
            if (!r || !aL(e, n, this.currentDirection))
                return;
            let i = this.getAxisMotionValue(e)
              , a = this.originPoint[e] + r[e];
            this.constraints && this.constraints[e] && (a = function(e, {min: t, max: r}, n) {
                return void 0 !== t && e < t ? e = n ? tg(t, e, n.min) : Math.max(e, t) : void 0 !== r && e > r && (e = n ? tg(r, e, n.max) : Math.min(e, r)),
                e
            }(a, this.constraints[e], this.elastic[e])),
            i.set(a)
        }
        resolveConstraints() {
            let {dragConstraints: e, dragElastic: t} = this.getProps()
              , r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout
              , n = this.constraints;
            e && n$(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && r ? this.constraints = function(e, {top: t, left: r, bottom: n, right: i}) {
                return {
                    x: aP(e.x, r, i),
                    y: aP(e.y, t, n)
                }
            }(r.layoutBox, e) : this.constraints = !1,
            this.elastic = function(e=.35) {
                return !1 === e ? e = 0 : !0 === e && (e = .35),
                {
                    x: aE(e, "left", "right"),
                    y: aE(e, "top", "bottom")
                }
            }(t),
            n !== this.constraints && r && this.constraints && !this.hasMutatedConstraints && aj(e => {
                var t, n;
                let i;
                !1 !== this.constraints && this.getAxisMotionValue(e) && (this.constraints[e] = (t = r.layoutBox[e],
                n = this.constraints[e],
                i = {},
                void 0 !== n.min && (i.min = n.min - t.min),
                void 0 !== n.max && (i.max = n.max - t.min),
                i))
            }
            )
        }
        resolveRefConstraints() {
            var e;
            let {dragConstraints: t, onMeasureDragConstraints: r} = this.getProps();
            if (!t || !n$(t))
                return !1;
            let n = t.current;
            tY(null !== n, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
            let {projection: i} = this.visualElement;
            if (!i || !i.layout)
                return !1;
            let a = function(e, t, r) {
                let n = tP(e, r)
                  , {scroll: i} = t;
                return i && (tM(n.x, i.offset.x),
                tM(n.y, i.offset.y)),
                n
            }(n, i.root, this.visualElement.getTransformPagePoint())
              , s = (e = i.layout.layoutBox,
            {
                x: a_(e.x, a.x),
                y: a_(e.y, a.y)
            });
            if (r) {
                let e = r(function({x: e, y: t}) {
                    return {
                        top: t.min,
                        right: e.max,
                        bottom: t.max,
                        left: e.min
                    }
                }(s));
                this.hasMutatedConstraints = !!e,
                e && (s = tv(e))
            }
            return s
        }
        startAnimation(e) {
            let {drag: t, dragMomentum: r, dragElastic: n, dragTransition: i, dragSnapToOrigin: a, onDragTransitionEnd: s} = this.getProps()
              , o = this.constraints || {};
            return Promise.all(aj(s => {
                if (!aL(s, t, this.currentDirection))
                    return;
                let l = o && o[s] || {};
                a && (l = {
                    min: 0,
                    max: 0
                });
                let c = {
                    type: "inertia",
                    velocity: r ? e[s] : 0,
                    bounceStiffness: n ? 200 : 1e6,
                    bounceDamping: n ? 40 : 1e7,
                    timeConstant: 750,
                    restDelta: 1,
                    restSpeed: 10,
                    ...i,
                    ...l
                };
                return this.startAxisValueAnimation(s, c)
            }
            )).then(s)
        }
        startAxisValueAnimation(e, t) {
            let r = this.getAxisMotionValue(e);
            return nG(this.visualElement, e),
            r.start(i7(e, r, 0, t, this.visualElement, !1))
        }
        stopAnimation() {
            aj(e => this.getAxisMotionValue(e).stop())
        }
        pauseAnimation() {
            aj(e => this.getAxisMotionValue(e).animation?.pause())
        }
        getAnimationState(e) {
            return this.getAxisMotionValue(e).animation?.state
        }
        getAxisMotionValue(e) {
            let t = `_drag${e.toUpperCase()}`
              , r = this.visualElement.getProps();
            return r[t] || this.visualElement.getValue(e, (r.initial ? r.initial[e] : void 0) || 0)
        }
        snapToCursor(e) {
            aj(t => {
                let {drag: r} = this.getProps();
                if (!aL(t, r, this.currentDirection))
                    return;
                let {projection: n} = this.visualElement
                  , i = this.getAxisMotionValue(t);
                if (n && n.layout) {
                    let {min: r, max: a} = n.layout.layoutBox[t];
                    i.set(e[t] - tg(r, a, .5))
                }
            }
            )
        }
        scalePositionWithinConstraints() {
            if (!this.visualElement.current)
                return;
            let {drag: e, dragConstraints: t} = this.getProps()
              , {projection: r} = this.visualElement;
            if (!n$(t) || !r || !this.constraints)
                return;
            this.stopAnimation();
            let n = {
                x: 0,
                y: 0
            };
            aj(e => {
                let t = this.getAxisMotionValue(e);
                if (t && !1 !== this.constraints) {
                    var r, i;
                    let a, s, o, l = t.get();
                    n[e] = (r = {
                        min: l,
                        max: l
                    },
                    i = this.constraints[e],
                    a = .5,
                    s = ax(r),
                    (o = ax(i)) > s ? a = iL(i.min, i.max - s, r.min) : s > o && (a = iL(r.min, r.max - o, i.min)),
                    tE(0, 1, a))
                }
            }
            );
            let {transformTemplate: i} = this.visualElement.getProps();
            this.visualElement.current.style.transform = i ? i({}, "") : "none",
            r.root && r.root.updateScroll(),
            r.updateLayout(),
            this.resolveConstraints(),
            aj(t => {
                if (!aL(t, e, null))
                    return;
                let r = this.getAxisMotionValue(t)
                  , {min: i, max: a} = this.constraints[t];
                r.set(tg(i, a, n[t]))
            }
            )
        }
        addListeners() {
            if (!this.visualElement.current)
                return;
            aD.set(this.visualElement, this);
            let e = af(this.visualElement.current, "pointerdown", e => {
                let {drag: t, dragListener: r=!0} = this.getProps();
                t && r && this.start(e)
            }
            )
              , t = () => {
                let {dragConstraints: e} = this.getProps();
                n$(e) && e.current && (this.constraints = this.resolveRefConstraints())
            }
              , {projection: r} = this.visualElement
              , n = r.addEventListener("measure", t);
            r && !r.layout && (r.root && r.root.updateScroll(),
            r.updateLayout()),
            t5.read(t);
            let i = ah(window, "resize", () => this.scalePositionWithinConstraints())
              , a = r.addEventListener("didUpdate", ({delta: e, hasLayoutChanged: t}) => {
                this.isDragging && t && (aj(t => {
                    let r = this.getAxisMotionValue(t);
                    r && (this.originPoint[t] += e[t].translate,
                    r.set(r.get() + e[t].translate))
                }
                ),
                this.visualElement.render())
            }
            );
            return () => {
                i(),
                e(),
                n(),
                a && a()
            }
        }
        getProps() {
            let e = this.visualElement.getProps()
              , {drag: t=!1, dragDirectionLock: r=!1, dragPropagation: n=!1, dragConstraints: i=!1, dragElastic: a=.35, dragMomentum: s=!0} = e;
            return {
                ...e,
                drag: t,
                dragDirectionLock: r,
                dragPropagation: n,
                dragConstraints: i,
                dragElastic: a,
                dragMomentum: s
            }
        }
    }
    function aL(e, t, r) {
        return (!0 === t || t === e) && (null === r || r === e)
    }
    let az = e => (t, r) => {
        e && t5.postRender( () => e(t, r))
    }
    ;
    var aO = p;
    function aV(e=!0) {
        let t = (0,
        p.useContext)(nI);
        if (null === t)
            return [!0, null];
        let {isPresent: r, onExitComplete: n, register: i} = t
          , a = (0,
        p.useId)();
        (0,
        p.useEffect)( () => {
            if (e)
                return i(a)
        }
        , [e]);
        let s = (0,
        p.useCallback)( () => e && n && n(a), [a, n, e]);
        return !r && n ? [!1, s] : [!0]
    }
    let a$ = {
        hasAnimatedSinceResize: !0,
        hasEverUpdated: !1
    }
      , aF = !1;
    class aB extends aO.Component {
        componentDidMount() {
            let {visualElement: e, layoutGroup: t, switchLayoutGroup: r, layoutId: n} = this.props
              , {projection: i} = e;
            i && (t.group && t.group.add(i),
            r && r.register && n && r.register(i),
            aF && i.root.didUpdate(),
            i.addEventListener("animationComplete", () => {
                this.safeToRemove()
            }
            ),
            i.setOptions({
                ...i.options,
                onExitComplete: () => this.safeToRemove()
            })),
            a$.hasEverUpdated = !0
        }
        getSnapshotBeforeUpdate(e) {
            let {layoutDependency: t, visualElement: r, drag: n, isPresent: i} = this.props
              , {projection: a} = r;
            return a && (a.isPresent = i,
            aF = !0,
            n || e.layoutDependency !== t || void 0 === t || e.isPresent !== i ? a.willUpdate() : this.safeToRemove(),
            e.isPresent !== i && (i ? a.promote() : a.relegate() || t5.postRender( () => {
                let e = a.getStack();
                e && e.members.length || this.safeToRemove()
            }
            ))),
            null
        }
        componentDidUpdate() {
            let {projection: e} = this.props.visualElement;
            e && (e.root.didUpdate(),
            rH.postRender( () => {
                !e.currentAnimation && e.isLead() && this.safeToRemove()
            }
            ))
        }
        componentWillUnmount() {
            let {visualElement: e, layoutGroup: t, switchLayoutGroup: r} = this.props
              , {projection: n} = e;
            aF = !0,
            n && (n.scheduleCheckAfterUnmount(),
            t && t.group && t.group.remove(n),
            r && r.deregister && r.deregister(n))
        }
        safeToRemove() {
            let {safeToRemove: e} = this.props;
            e && e()
        }
        render() {
            return null
        }
    }
    function aH(e) {
        let[t,r] = aV()
          , n = (0,
        aO.useContext)(nj);
        return (0,
        d.jsx)(aB, {
            ...e,
            layoutGroup: n,
            switchLayoutGroup: (0,
            aO.useContext)(nB),
            isPresent: t,
            safeToRemove: r
        })
    }
    function aU(e) {
        return "object" == typeof e && null !== e
    }
    function aq(e) {
        return aU(e) && "ownerSVGElement"in e
    }
    let aW = (e, t) => e.depth - t.depth;
    class aY {
        constructor() {
            this.children = [],
            this.isDirty = !1
        }
        add(e) {
            rz(this.children, e),
            this.isDirty = !0
        }
        remove(e) {
            rO(this.children, e),
            this.isDirty = !0
        }
        forEach(e) {
            this.isDirty && this.children.sort(aW),
            this.isDirty = !1,
            this.children.forEach(e)
        }
    }
    let aG = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"]
      , aX = aG.length
      , aJ = e => "string" == typeof e ? parseFloat(e) : e
      , aK = e => "number" == typeof e || tV.test(e);
    function aZ(e, t) {
        return void 0 !== e[t] ? e[t] : e.borderRadius
    }
    let aQ = a1(0, .5, i_)
      , a0 = a1(.5, .95, tQ);
    function a1(e, t, r) {
        return n => n < e ? 0 : n > t ? 1 : r(iL(e, t, n))
    }
    function a2(e, t) {
        e.min = t.min,
        e.max = t.max
    }
    function a5(e, t) {
        a2(e.x, t.x),
        a2(e.y, t.y)
    }
    function a4(e, t) {
        e.translate = t.translate,
        e.scale = t.scale,
        e.originPoint = t.originPoint,
        e.origin = t.origin
    }
    function a3(e, t, r, n, i) {
        return e -= t,
        e = n + 1 / r * (e - n),
        void 0 !== i && (e = n + 1 / i * (e - n)),
        e
    }
    function a6(e, t, [r,n,i], a, s) {
        !function(e, t=0, r=1, n=.5, i, a=e, s=e) {
            if (tO.test(t) && (t = parseFloat(t),
            t = tg(s.min, s.max, t / 100) - s.min),
            "number" != typeof t)
                return;
            let o = tg(a.min, a.max, n);
            e === a && (o -= t),
            e.min = a3(e.min, t, r, o, i),
            e.max = a3(e.max, t, r, o, i)
        }(e, t[r], t[n], t[i], t.scale, a, s)
    }
    let a8 = ["x", "scaleX", "originX"]
      , a9 = ["y", "scaleY", "originY"];
    function a7(e, t, r, n) {
        a6(e.x, t, a8, r ? r.x : void 0, n ? n.x : void 0),
        a6(e.y, t, a9, r ? r.y : void 0, n ? n.y : void 0)
    }
    function se(e) {
        return 0 === e.translate && 1 === e.scale
    }
    function st(e) {
        return se(e.x) && se(e.y)
    }
    function sr(e, t) {
        return e.min === t.min && e.max === t.max
    }
    function sn(e, t) {
        return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max)
    }
    function si(e, t) {
        return sn(e.x, t.x) && sn(e.y, t.y)
    }
    function sa(e) {
        return ax(e.x) / ax(e.y)
    }
    function ss(e, t) {
        return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint
    }
    class so {
        constructor() {
            this.members = []
        }
        add(e) {
            rz(this.members, e),
            e.scheduleRender()
        }
        remove(e) {
            if (rO(this.members, e),
            e === this.prevLead && (this.prevLead = void 0),
            e === this.lead) {
                let e = this.members[this.members.length - 1];
                e && this.promote(e)
            }
        }
        relegate(e) {
            let t, r = this.members.findIndex(t => e === t);
            if (0 === r)
                return !1;
            for (let e = r; e >= 0; e--) {
                let r = this.members[e];
                if (!1 !== r.isPresent) {
                    t = r;
                    break
                }
            }
            return !!t && (this.promote(t),
            !0)
        }
        promote(e, t) {
            let r = this.lead;
            if (e !== r && (this.prevLead = r,
            this.lead = e,
            e.show(),
            r)) {
                r.instance && r.scheduleRender(),
                e.scheduleRender(),
                e.resumeFrom = r,
                t && (e.resumeFrom.preserveOpacity = !0),
                r.snapshot && (e.snapshot = r.snapshot,
                e.snapshot.latestValues = r.animationValues || r.latestValues),
                e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
                let {crossfade: n} = e.options;
                !1 === n && r.hide()
            }
        }
        exitAnimationComplete() {
            this.members.forEach(e => {
                let {options: t, resumingFrom: r} = e;
                t.onExitComplete && t.onExitComplete(),
                r && r.options.onExitComplete && r.options.onExitComplete()
            }
            )
        }
        scheduleRender() {
            this.members.forEach(e => {
                e.instance && e.scheduleRender(!1)
            }
            )
        }
        removeLeadSnapshot() {
            this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
        }
    }
    let sl = ["", "X", "Y", "Z"]
      , sc = 0;
    function su(e, t, r, n) {
        let {latestValues: i} = t;
        i[e] && (r[e] = i[e],
        t.setStaticValue(e, 0),
        n && (n[e] = 0))
    }
    function sd({attachResizeListener: e, defaultParent: t, measureScroll: r, checkIsScrollRoot: n, resetTransform: i}) {
        return class {
            constructor(e={}, r=t?.()) {
                this.id = sc++,
                this.animationId = 0,
                this.animationCommitId = 0,
                this.children = new Set,
                this.options = {},
                this.isTreeAnimating = !1,
                this.isAnimationBlocked = !1,
                this.isLayoutDirty = !1,
                this.isProjectionDirty = !1,
                this.isSharedProjectionDirty = !1,
                this.isTransformDirty = !1,
                this.updateManuallyBlocked = !1,
                this.updateBlockedByResize = !1,
                this.isUpdating = !1,
                this.isSVG = !1,
                this.needsReset = !1,
                this.shouldResetTransform = !1,
                this.hasCheckedOptimisedAppear = !1,
                this.treeScale = {
                    x: 1,
                    y: 1
                },
                this.eventHandlers = new Map,
                this.hasTreeAnimated = !1,
                this.layoutVersion = 0,
                this.updateScheduled = !1,
                this.scheduleUpdate = () => this.update(),
                this.projectionUpdateScheduled = !1,
                this.checkUpdateFailed = () => {
                    this.isUpdating && (this.isUpdating = !1,
                    this.clearAllSnapshots())
                }
                ,
                this.updateProjection = () => {
                    this.projectionUpdateScheduled = !1,
                    this.nodes.forEach(sm),
                    this.nodes.forEach(sw),
                    this.nodes.forEach(sj),
                    this.nodes.forEach(sf)
                }
                ,
                this.resolvedRelativeTargetAt = 0,
                this.linkedParentVersion = 0,
                this.hasProjected = !1,
                this.isVisible = !0,
                this.animationProgress = 0,
                this.sharedNodes = new Map,
                this.latestValues = e,
                this.root = r ? r.root || r : this,
                this.path = r ? [...r.path, r] : [],
                this.parent = r,
                this.depth = r ? r.depth + 1 : 0;
                for (let e = 0; e < this.path.length; e++)
                    this.path[e].shouldResetTransform = !0;
                this.root === this && (this.nodes = new aY)
            }
            addEventListener(e, t) {
                return this.eventHandlers.has(e) || this.eventHandlers.set(e, new rV),
                this.eventHandlers.get(e).add(t)
            }
            notifyListeners(e, ...t) {
                let r = this.eventHandlers.get(e);
                r && r.notify(...t)
            }
            hasListeners(e) {
                return this.eventHandlers.has(e)
            }
            mount(t) {
                if (this.instance)
                    return;
                this.isSVG = aq(t) && !(aq(t) && "svg" === t.tagName),
                this.instance = t;
                let {layoutId: r, layout: n, visualElement: i} = this.options;
                if (i && !i.current && i.mount(t),
                this.root.nodes.add(this),
                this.parent && this.parent.children.add(this),
                this.root.hasTreeAnimated && (n || r) && (this.isLayoutDirty = !0),
                e) {
                    let r, n = 0, i = () => this.root.updateBlockedByResize = !1;
                    t5.read( () => {
                        n = window.innerWidth
                    }
                    ),
                    e(t, () => {
                        let e = window.innerWidth;
                        if (e !== n) {
                            let t, a;
                            n = e,
                            this.root.updateBlockedByResize = !0,
                            r && r(),
                            t = rL.now(),
                            a = ({timestamp: e}) => {
                                let r = e - t;
                                r >= 250 && (t4(a),
                                i(r - 250))
                            }
                            ,
                            t5.setup(a, !0),
                            r = () => t4(a),
                            a$.hasAnimatedSinceResize && (a$.hasAnimatedSinceResize = !1,
                            this.nodes.forEach(sb))
                        }
                    }
                    )
                }
                r && this.root.registerSharedNode(r, this),
                !1 !== this.options.animate && i && (r || n) && this.addEventListener("didUpdate", ({delta: e, hasLayoutChanged: t, hasRelativeLayoutChanged: r, layout: n}) => {
                    if (this.isTreeAnimationBlocked()) {
                        this.target = void 0,
                        this.relativeTarget = void 0;
                        return
                    }
                    let a = this.options.transition || i.getDefaultTransition() || sA
                      , {onLayoutAnimationStart: s, onLayoutAnimationComplete: o} = i.getProps()
                      , l = !this.targetLayout || !si(this.targetLayout, n)
                      , c = !t && r;
                    if (this.options.layoutRoot || this.resumeFrom || c || t && (l || !this.currentAnimation)) {
                        this.resumeFrom && (this.resumingFrom = this.resumeFrom,
                        this.resumingFrom.resumingFrom = void 0);
                        let t = {
                            ...nW(a, "layout"),
                            onPlay: s,
                            onComplete: o
                        };
                        (i.shouldReduceMotion || this.options.layoutRoot) && (t.delay = 0,
                        t.type = !1),
                        this.startAnimation(t),
                        this.setAnimationOrigin(e, c)
                    } else
                        t || sb(this),
                        this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                    this.targetLayout = n
                }
                )
            }
            unmount() {
                this.options.layoutId && this.willUpdate(),
                this.root.nodes.remove(this);
                let e = this.getStack();
                e && e.remove(this),
                this.parent && this.parent.children.delete(this),
                this.instance = void 0,
                this.eventHandlers.clear(),
                t4(this.updateProjection)
            }
            blockUpdate() {
                this.updateManuallyBlocked = !0
            }
            unblockUpdate() {
                this.updateManuallyBlocked = !1
            }
            isUpdateBlocked() {
                return this.updateManuallyBlocked || this.updateBlockedByResize
            }
            isTreeAnimationBlocked() {
                return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
            }
            startUpdate() {
                !this.isUpdateBlocked() && (this.isUpdating = !0,
                this.nodes && this.nodes.forEach(sN),
                this.animationId++)
            }
            getTransformTemplate() {
                let {visualElement: e} = this.options;
                return e && e.getProps().transformTemplate
            }
            willUpdate(e=!0) {
                if (this.root.hasTreeAnimated = !0,
                this.root.isUpdateBlocked()) {
                    this.options.onExitComplete && this.options.onExitComplete();
                    return
                }
                if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && function e(t) {
                    if (t.hasCheckedOptimisedAppear = !0,
                    t.root === t)
                        return;
                    let {visualElement: r} = t.options;
                    if (!r)
                        return;
                    let n = r.props[nF];
                    if (window.MotionHasOptimisedAnimation(n, "transform")) {
                        let {layout: e, layoutId: r} = t.options;
                        window.MotionCancelOptimisedAnimation(n, "transform", t5, !(e || r))
                    }
                    let {parent: i} = t;
                    i && !i.hasCheckedOptimisedAppear && e(i)
                }(this),
                this.root.isUpdating || this.root.startUpdate(),
                this.isLayoutDirty)
                    return;
                this.isLayoutDirty = !0;
                for (let e = 0; e < this.path.length; e++) {
                    let t = this.path[e];
                    t.shouldResetTransform = !0,
                    t.updateScroll("snapshot"),
                    t.options.layoutRoot && t.willUpdate(!1)
                }
                let {layoutId: t, layout: r} = this.options;
                if (void 0 === t && !r)
                    return;
                let n = this.getTransformTemplate();
                this.prevTransformTemplateValue = n ? n(this.latestValues, "") : void 0,
                this.updateSnapshot(),
                e && this.notifyListeners("willUpdate")
            }
            update() {
                if (this.updateScheduled = !1,
                this.isUpdateBlocked()) {
                    this.unblockUpdate(),
                    this.clearAllSnapshots(),
                    this.nodes.forEach(sy);
                    return
                }
                if (this.animationId <= this.animationCommitId)
                    return void this.nodes.forEach(sv);
                this.animationCommitId = this.animationId,
                this.isUpdating ? (this.isUpdating = !1,
                this.nodes.forEach(sg),
                this.nodes.forEach(sh),
                this.nodes.forEach(sp)) : this.nodes.forEach(sv),
                this.clearAllSnapshots();
                let e = rL.now();
                t3.delta = tE(0, 1e3 / 60, e - t3.timestamp),
                t3.timestamp = e,
                t3.isProcessing = !0,
                t6.update.process(t3),
                t6.preRender.process(t3),
                t6.render.process(t3),
                t3.isProcessing = !1
            }
            didUpdate() {
                this.updateScheduled || (this.updateScheduled = !0,
                rH.read(this.scheduleUpdate))
            }
            clearAllSnapshots() {
                this.nodes.forEach(sx),
                this.sharedNodes.forEach(sk)
            }
            scheduleUpdateProjection() {
                this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0,
                t5.preRender(this.updateProjection, !1, !0))
            }
            scheduleCheckAfterUnmount() {
                t5.postRender( () => {
                    this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
                }
                )
            }
            updateSnapshot() {
                !this.snapshot && this.instance && (this.snapshot = this.measure(),
                !this.snapshot || ax(this.snapshot.measuredBox.x) || ax(this.snapshot.measuredBox.y) || (this.snapshot = void 0))
            }
            updateLayout() {
                if (!this.instance || (this.updateScroll(),
                !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
                    return;
                if (this.resumeFrom && !this.resumeFrom.instance)
                    for (let e = 0; e < this.path.length; e++)
                        this.path[e].updateScroll();
                let e = this.layout;
                this.layout = this.measure(!1),
                this.layoutVersion++,
                this.layoutCorrected = rX(),
                this.isLayoutDirty = !1,
                this.projectionDelta = void 0,
                this.notifyListeners("measure", this.layout.layoutBox);
                let {visualElement: t} = this.options;
                t && t.notify("LayoutMeasure", this.layout.layoutBox, e ? e.layoutBox : void 0)
            }
            updateScroll(e="measure") {
                let t = !!(this.options.layoutScroll && this.instance);
                if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === e && (t = !1),
                t && this.instance) {
                    let t = n(this.instance);
                    this.scroll = {
                        animationId: this.root.animationId,
                        phase: e,
                        isRoot: t,
                        offset: r(this.instance),
                        wasRoot: this.scroll ? this.scroll.isRoot : t
                    }
                }
            }
            resetTransform() {
                if (!i)
                    return;
                let e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout
                  , t = this.projectionDelta && !st(this.projectionDelta)
                  , r = this.getTransformTemplate()
                  , n = r ? r(this.latestValues, "") : void 0
                  , a = n !== this.prevTransformTemplateValue;
                e && this.instance && (t || tj(this.latestValues) || a) && (i(this.instance, n),
                this.shouldResetTransform = !1,
                this.scheduleRender())
            }
            measure(e=!0) {
                var t;
                let r = this.measurePageBox()
                  , n = this.removeElementScroll(r);
                return e && (n = this.removeTransform(n)),
                s_((t = n).x),
                s_(t.y),
                {
                    animationId: this.root.animationId,
                    measuredBox: r,
                    layoutBox: n,
                    latestValues: {},
                    source: this.id
                }
            }
            measurePageBox() {
                let {visualElement: e} = this.options;
                if (!e)
                    return rX();
                let t = e.measureViewportBox();
                if (!(this.scroll?.wasRoot || this.path.some(sI))) {
                    let {scroll: e} = this.root;
                    e && (tM(t.x, e.offset.x),
                    tM(t.y, e.offset.y))
                }
                return t
            }
            removeElementScroll(e) {
                let t = rX();
                if (a5(t, e),
                this.scroll?.wasRoot)
                    return t;
                for (let r = 0; r < this.path.length; r++) {
                    let n = this.path[r]
                      , {scroll: i, options: a} = n;
                    n !== this.root && i && a.layoutScroll && (i.wasRoot && a5(t, e),
                    tM(t.x, i.offset.x),
                    tM(t.y, i.offset.y))
                }
                return t
            }
            applyTransform(e, t=!1) {
                let r = rX();
                a5(r, e);
                for (let e = 0; e < this.path.length; e++) {
                    let n = this.path[e];
                    !t && n.options.layoutScroll && n.scroll && n !== n.root && tT(r, {
                        x: -n.scroll.offset.x,
                        y: -n.scroll.offset.y
                    }),
                    tj(n.latestValues) && tT(r, n.latestValues)
                }
                return tj(this.latestValues) && tT(r, this.latestValues),
                r
            }
            removeTransform(e) {
                let t = rX();
                a5(t, e);
                for (let e = 0; e < this.path.length; e++) {
                    let r = this.path[e];
                    if (!r.instance || !tj(r.latestValues))
                        continue;
                    tw(r.latestValues) && r.updateSnapshot();
                    let n = rX();
                    a5(n, r.measurePageBox()),
                    a7(t, r.latestValues, r.snapshot ? r.snapshot.layoutBox : void 0, n)
                }
                return tj(this.latestValues) && a7(t, this.latestValues),
                t
            }
            setTargetDelta(e) {
                this.targetDelta = e,
                this.root.scheduleUpdateProjection(),
                this.isProjectionDirty = !0
            }
            setOptions(e) {
                this.options = {
                    ...this.options,
                    ...e,
                    crossfade: void 0 === e.crossfade || e.crossfade
                }
            }
            clearMeasurements() {
                this.scroll = void 0,
                this.layout = void 0,
                this.snapshot = void 0,
                this.prevTransformTemplateValue = void 0,
                this.targetDelta = void 0,
                this.target = void 0,
                this.isLayoutDirty = !1
            }
            forceRelativeParentToResolveTarget() {
                this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== t3.timestamp && this.relativeParent.resolveTargetDelta(!0)
            }
            resolveTargetDelta(e=!1) {
                let t = this.getLead();
                this.isProjectionDirty || (this.isProjectionDirty = t.isProjectionDirty),
                this.isTransformDirty || (this.isTransformDirty = t.isTransformDirty),
                this.isSharedProjectionDirty || (this.isSharedProjectionDirty = t.isSharedProjectionDirty);
                let r = !!this.resumingFrom || this !== t;
                if (!(e || r && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
                    return;
                let {layout: n, layoutId: i} = this.options;
                if (!this.layout || !(n || i))
                    return;
                this.resolvedRelativeTargetAt = t3.timestamp;
                let a = this.getClosestProjectingParent();
                if (a && this.linkedParentVersion !== a.layoutVersion && !a.options.layoutRoot && this.removeRelativeTarget(),
                this.targetDelta || this.relativeTarget || (a && a.layout ? this.createRelativeTarget(a, this.layout.layoutBox, a.layout.layoutBox) : this.removeRelativeTarget()),
                this.relativeTarget || this.targetDelta) {
                    if (this.target || (this.target = rX(),
                    this.targetWithTransforms = rX()),
                    this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
                        var s, o, l;
                        this.forceRelativeParentToResolveTarget(),
                        s = this.target,
                        o = this.relativeTarget,
                        l = this.relativeParent.target,
                        ag(s.x, o.x, l.x),
                        ag(s.y, o.y, l.y)
                    } else
                        this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : a5(this.target, this.layout.layoutBox),
                        tC(this.target, this.targetDelta)) : a5(this.target, this.layout.layoutBox);
                    this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1,
                    a && !!a.resumingFrom == !!this.resumingFrom && !a.options.layoutScroll && a.target && 1 !== this.animationProgress ? this.createRelativeTarget(a, this.target, a.target) : this.relativeParent = this.relativeTarget = void 0)
                }
            }
            getClosestProjectingParent() {
                if (!(!this.parent || tw(this.parent.latestValues) || tN(this.parent.latestValues)))
                    if (this.parent.isProjecting())
                        return this.parent;
                    else
                        return this.parent.getClosestProjectingParent()
            }
            isProjecting() {
                return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
            }
            createRelativeTarget(e, t, r) {
                this.relativeParent = e,
                this.linkedParentVersion = e.layoutVersion,
                this.forceRelativeParentToResolveTarget(),
                this.relativeTarget = rX(),
                this.relativeTargetOrigin = rX(),
                aw(this.relativeTargetOrigin, t, r),
                a5(this.relativeTarget, this.relativeTargetOrigin)
            }
            removeRelativeTarget() {
                this.relativeParent = this.relativeTarget = void 0
            }
            calcProjection() {
                let e = this.getLead()
                  , t = !!this.resumingFrom || this !== e
                  , r = !0;
                if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (r = !1),
                t && (this.isSharedProjectionDirty || this.isTransformDirty) && (r = !1),
                this.resolvedRelativeTargetAt === t3.timestamp && (r = !1),
                r)
                    return;
                let {layout: n, layoutId: i} = this.options;
                if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation),
                this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
                !this.layout || !(n || i))
                    return;
                a5(this.layoutCorrected, this.layout.layoutBox);
                let a = this.treeScale.x
                  , s = this.treeScale.y;
                !function(e, t, r, n=!1) {
                    let i, a, s = r.length;
                    if (s) {
                        t.x = t.y = 1;
                        for (let o = 0; o < s; o++) {
                            a = (i = r[o]).projectionDelta;
                            let {visualElement: s} = i.options;
                            (!s || !s.props.style || "contents" !== s.props.style.display) && (n && i.options.layoutScroll && i.scroll && i !== i.root && tT(e, {
                                x: -i.scroll.offset.x,
                                y: -i.scroll.offset.y
                            }),
                            a && (t.x *= a.x.scale,
                            t.y *= a.y.scale,
                            tC(e, a)),
                            n && tj(i.latestValues) && tT(e, i.latestValues))
                        }
                        t.x < 1.0000000000001 && t.x > .999999999999 && (t.x = 1),
                        t.y < 1.0000000000001 && t.y > .999999999999 && (t.y = 1)
                    }
                }(this.layoutCorrected, this.treeScale, this.path, t),
                e.layout && !e.target && (1 !== this.treeScale.x || 1 !== this.treeScale.y) && (e.target = e.layout.layoutBox,
                e.targetWithTransforms = rX());
                let {target: o} = e;
                if (!o) {
                    this.prevProjectionDelta && (this.createProjectionDeltas(),
                    this.scheduleRender());
                    return
                }
                this.projectionDelta && this.prevProjectionDelta ? (a4(this.prevProjectionDelta.x, this.projectionDelta.x),
                a4(this.prevProjectionDelta.y, this.projectionDelta.y)) : this.createProjectionDeltas(),
                av(this.projectionDelta, this.layoutCorrected, o, this.latestValues),
                this.treeScale.x === a && this.treeScale.y === s && ss(this.projectionDelta.x, this.prevProjectionDelta.x) && ss(this.projectionDelta.y, this.prevProjectionDelta.y) || (this.hasProjected = !0,
                this.scheduleRender(),
                this.notifyListeners("projectionUpdate", o))
            }
            hide() {
                this.isVisible = !1
            }
            show() {
                this.isVisible = !0
            }
            scheduleRender(e=!0) {
                if (this.options.visualElement?.scheduleRender(),
                e) {
                    let e = this.getStack();
                    e && e.scheduleRender()
                }
                this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
            }
            createProjectionDeltas() {
                this.prevProjectionDelta = rY(),
                this.projectionDelta = rY(),
                this.projectionDeltaWithTransform = rY()
            }
            setAnimationOrigin(e, t=!1) {
                let r, n = this.snapshot, i = n ? n.latestValues : {}, a = {
                    ...this.latestValues
                }, s = rY();
                this.relativeParent && this.relativeParent.options.layoutRoot || (this.relativeTarget = this.relativeTargetOrigin = void 0),
                this.attemptToResolveRelativeTarget = !t;
                let o = rX()
                  , l = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0)
                  , c = this.getStack()
                  , u = !c || c.members.length <= 1
                  , d = !!(l && !u && !0 === this.options.crossfade && !this.path.some(sM));
                this.animationProgress = 0,
                this.mixTargetDelta = t => {
                    let n = t / 1e3;
                    if (sS(s.x, e.x, n),
                    sS(s.y, e.y, n),
                    this.setTargetDelta(s),
                    this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
                        var c, h, p, m, f, x;
                        aw(o, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
                        p = this.relativeTarget,
                        m = this.relativeTargetOrigin,
                        f = o,
                        x = n,
                        sC(p.x, m.x, f.x, x),
                        sC(p.y, m.y, f.y, x),
                        r && (c = this.relativeTarget,
                        h = r,
                        sr(c.x, h.x) && sr(c.y, h.y)) && (this.isProjectionDirty = !1),
                        r || (r = rX()),
                        a5(r, this.relativeTarget)
                    }
                    l && (this.animationValues = a,
                    function(e, t, r, n, i, a) {
                        i ? (e.opacity = tg(0, r.opacity ?? 1, aQ(n)),
                        e.opacityExit = tg(t.opacity ?? 1, 0, a0(n))) : a && (e.opacity = tg(t.opacity ?? 1, r.opacity ?? 1, n));
                        for (let i = 0; i < aX; i++) {
                            let a = `border${aG[i]}Radius`
                              , s = aZ(t, a)
                              , o = aZ(r, a);
                            (void 0 !== s || void 0 !== o) && (s || (s = 0),
                            o || (o = 0),
                            0 === s || 0 === o || aK(s) === aK(o) ? (e[a] = Math.max(tg(aJ(s), aJ(o), n), 0),
                            (tO.test(o) || tO.test(s)) && (e[a] += "%")) : e[a] = o)
                        }
                        (t.rotate || r.rotate) && (e.rotate = tg(t.rotate || 0, r.rotate || 0, n))
                    }(a, i, this.latestValues, n, d, u)),
                    this.root.scheduleUpdateProjection(),
                    this.scheduleRender(),
                    this.animationProgress = n
                }
                ,
                this.mixTargetDelta(1e3 * !!this.options.layoutRoot)
            }
            startAnimation(e) {
                this.notifyListeners("animationStart"),
                this.currentAnimation?.stop(),
                this.resumingFrom?.currentAnimation?.stop(),
                this.pendingAnimation && (t4(this.pendingAnimation),
                this.pendingAnimation = void 0),
                this.pendingAnimation = t5.update( () => {
                    var t, r, n;
                    let i;
                    a$.hasAnimatedSinceResize = !0,
                    nQ.layout++,
                    this.motionValue || (this.motionValue = rF(0)),
                    this.currentAnimation = (t = this.motionValue,
                    r = [0, 1e3],
                    n = {
                        ...e,
                        velocity: 0,
                        isSync: !0,
                        onUpdate: t => {
                            this.mixTargetDelta(t),
                            e.onUpdate && e.onUpdate(t)
                        }
                        ,
                        onStop: () => {
                            nQ.layout--
                        }
                        ,
                        onComplete: () => {
                            nQ.layout--,
                            e.onComplete && e.onComplete(),
                            this.completeAnimation()
                        }
                    },
                    (i = rD(t) ? t : rF(t)).start(i7("", i, r, n)),
                    i.animation),
                    this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                    this.pendingAnimation = void 0
                }
                )
            }
            completeAnimation() {
                this.resumingFrom && (this.resumingFrom.currentAnimation = void 0,
                this.resumingFrom.preserveOpacity = void 0);
                let e = this.getStack();
                e && e.exitAnimationComplete(),
                this.resumingFrom = this.currentAnimation = this.animationValues = void 0,
                this.notifyListeners("animationComplete")
            }
            finishAnimation() {
                this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(1e3),
                this.currentAnimation.stop()),
                this.completeAnimation()
            }
            applyTransformsToTarget() {
                let e = this.getLead()
                  , {targetWithTransforms: t, target: r, layout: n, latestValues: i} = e;
                if (t && r && n) {
                    if (this !== e && this.layout && n && sE(this.options.animationType, this.layout.layoutBox, n.layoutBox)) {
                        r = this.target || rX();
                        let t = ax(this.layout.layoutBox.x);
                        r.x.min = e.target.x.min,
                        r.x.max = r.x.min + t;
                        let n = ax(this.layout.layoutBox.y);
                        r.y.min = e.target.y.min,
                        r.y.max = r.y.min + n
                    }
                    a5(t, r),
                    tT(t, i),
                    av(this.projectionDeltaWithTransform, this.layoutCorrected, t, i)
                }
            }
            registerSharedNode(e, t) {
                this.sharedNodes.has(e) || this.sharedNodes.set(e, new so),
                this.sharedNodes.get(e).add(t);
                let r = t.options.initialPromotionConfig;
                t.promote({
                    transition: r ? r.transition : void 0,
                    preserveFollowOpacity: r && r.shouldPreserveFollowOpacity ? r.shouldPreserveFollowOpacity(t) : void 0
                })
            }
            isLead() {
                let e = this.getStack();
                return !e || e.lead === this
            }
            getLead() {
                let {layoutId: e} = this.options;
                return e && this.getStack()?.lead || this
            }
            getPrevLead() {
                let {layoutId: e} = this.options;
                return e ? this.getStack()?.prevLead : void 0
            }
            getStack() {
                let {layoutId: e} = this.options;
                if (e)
                    return this.root.sharedNodes.get(e)
            }
            promote({needsReset: e, transition: t, preserveFollowOpacity: r}={}) {
                let n = this.getStack();
                n && n.promote(this, r),
                e && (this.projectionDelta = void 0,
                this.needsReset = !0),
                t && this.setOptions({
                    transition: t
                })
            }
            relegate() {
                let e = this.getStack();
                return !!e && e.relegate(this)
            }
            resetSkewAndRotation() {
                let {visualElement: e} = this.options;
                if (!e)
                    return;
                let t = !1
                  , {latestValues: r} = e;
                if ((r.z || r.rotate || r.rotateX || r.rotateY || r.rotateZ || r.skewX || r.skewY) && (t = !0),
                !t)
                    return;
                let n = {};
                r.z && su("z", e, n, this.animationValues);
                for (let t = 0; t < sl.length; t++)
                    su(`rotate${sl[t]}`, e, n, this.animationValues),
                    su(`skew${sl[t]}`, e, n, this.animationValues);
                for (let t in e.render(),
                n)
                    e.setStaticValue(t, n[t]),
                    this.animationValues && (this.animationValues[t] = n[t]);
                e.scheduleRender()
            }
            applyProjectionStyles(e, t) {
                if (!this.instance || this.isSVG)
                    return;
                if (!this.isVisible) {
                    e.visibility = "hidden";
                    return
                }
                let r = this.getTransformTemplate();
                if (this.needsReset) {
                    this.needsReset = !1,
                    e.visibility = "",
                    e.opacity = "",
                    e.pointerEvents = nR(t?.pointerEvents) || "",
                    e.transform = r ? r(this.latestValues, "") : "none";
                    return
                }
                let n = this.getLead();
                if (!this.projectionDelta || !this.layout || !n.target) {
                    this.options.layoutId && (e.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1,
                    e.pointerEvents = nR(t?.pointerEvents) || ""),
                    this.hasProjected && !tj(this.latestValues) && (e.transform = r ? r({}, "") : "none",
                    this.hasProjected = !1);
                    return
                }
                e.visibility = "";
                let i = n.animationValues || n.latestValues;
                this.applyTransformsToTarget();
                let a = function(e, t, r) {
                    let n = ""
                      , i = e.x.translate / t.x
                      , a = e.y.translate / t.y
                      , s = r?.z || 0;
                    if ((i || a || s) && (n = `translate3d(${i}px, ${a}px, ${s}px) `),
                    (1 !== t.x || 1 !== t.y) && (n += `scale(${1 / t.x}, ${1 / t.y}) `),
                    r) {
                        let {transformPerspective: e, rotate: t, rotateX: i, rotateY: a, skewX: s, skewY: o} = r;
                        e && (n = `perspective(${e}px) ${n}`),
                        t && (n += `rotate(${t}deg) `),
                        i && (n += `rotateX(${i}deg) `),
                        a && (n += `rotateY(${a}deg) `),
                        s && (n += `skewX(${s}deg) `),
                        o && (n += `skewY(${o}deg) `)
                    }
                    let o = e.x.scale * t.x
                      , l = e.y.scale * t.y;
                    return (1 !== o || 1 !== l) && (n += `scale(${o}, ${l})`),
                    n || "none"
                }(this.projectionDeltaWithTransform, this.treeScale, i);
                r && (a = r(i, a)),
                e.transform = a;
                let {x: s, y: o} = this.projectionDelta;
                for (let t in e.transformOrigin = `${100 * s.origin}% ${100 * o.origin}% 0`,
                n.animationValues ? e.opacity = n === this ? i.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : i.opacityExit : e.opacity = n === this ? void 0 !== i.opacity ? i.opacity : "" : void 0 !== i.opacityExit ? i.opacityExit : 0,
                nl) {
                    if (void 0 === i[t])
                        continue;
                    let {correct: r, applyTo: s, isCSSVariable: o} = nl[t]
                      , l = "none" === a ? i[t] : r(i[t], n);
                    if (s) {
                        let t = s.length;
                        for (let r = 0; r < t; r++)
                            e[s[r]] = l
                    } else
                        o ? this.options.visualElement.renderState.vars[t] = l : e[t] = l
                }
                this.options.layoutId && (e.pointerEvents = n === this ? nR(t?.pointerEvents) || "" : "none")
            }
            clearSnapshot() {
                this.resumeFrom = this.snapshot = void 0
            }
            resetTree() {
                this.root.nodes.forEach(e => e.currentAnimation?.stop()),
                this.root.nodes.forEach(sy),
                this.root.sharedNodes.clear()
            }
        }
    }
    function sh(e) {
        e.updateLayout()
    }
    function sp(e) {
        let t = e.resumeFrom?.snapshot || e.snapshot;
        if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
            let {layoutBox: r, measuredBox: n} = e.layout
              , {animationType: i} = e.options
              , a = t.source !== e.layout.source;
            "size" === i ? aj(e => {
                let n = a ? t.measuredBox[e] : t.layoutBox[e]
                  , i = ax(n);
                n.min = r[e].min,
                n.max = n.min + i
            }
            ) : sE(i, t.layoutBox, r) && aj(n => {
                let i = a ? t.measuredBox[n] : t.layoutBox[n]
                  , s = ax(r[n]);
                i.max = i.min + s,
                e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0,
                e.relativeTarget[n].max = e.relativeTarget[n].min + s)
            }
            );
            let s = rY();
            av(s, r, t.layoutBox);
            let o = rY();
            a ? av(o, e.applyTransform(n, !0), t.measuredBox) : av(o, r, t.layoutBox);
            let l = !st(s)
              , c = !1;
            if (!e.resumeFrom) {
                let n = e.getClosestProjectingParent();
                if (n && !n.resumeFrom) {
                    let {snapshot: i, layout: a} = n;
                    if (i && a) {
                        let s = rX();
                        aw(s, t.layoutBox, i.layoutBox);
                        let o = rX();
                        aw(o, r, a.layoutBox),
                        si(s, o) || (c = !0),
                        n.options.layoutRoot && (e.relativeTarget = o,
                        e.relativeTargetOrigin = s,
                        e.relativeParent = n)
                    }
                }
            }
            e.notifyListeners("didUpdate", {
                layout: r,
                snapshot: t,
                delta: o,
                layoutDelta: s,
                hasLayoutChanged: l,
                hasRelativeLayoutChanged: c
            })
        } else if (e.isLead()) {
            let {onExitComplete: t} = e.options;
            t && t()
        }
        e.options.transition = void 0
    }
    function sm(e) {
        e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
        e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)),
        e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty))
    }
    function sf(e) {
        e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1
    }
    function sx(e) {
        e.clearSnapshot()
    }
    function sy(e) {
        e.clearMeasurements()
    }
    function sv(e) {
        e.isLayoutDirty = !1
    }
    function sg(e) {
        let {visualElement: t} = e.options;
        t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
        e.resetTransform()
    }
    function sb(e) {
        e.finishAnimation(),
        e.targetDelta = e.relativeTarget = e.target = void 0,
        e.isProjectionDirty = !0
    }
    function sw(e) {
        e.resolveTargetDelta()
    }
    function sj(e) {
        e.calcProjection()
    }
    function sN(e) {
        e.resetSkewAndRotation()
    }
    function sk(e) {
        e.removeLeadSnapshot()
    }
    function sS(e, t, r) {
        e.translate = tg(t.translate, 0, r),
        e.scale = tg(t.scale, 1, r),
        e.origin = t.origin,
        e.originPoint = t.originPoint
    }
    function sC(e, t, r, n) {
        e.min = tg(t.min, r.min, n),
        e.max = tg(t.max, r.max, n)
    }
    function sM(e) {
        return e.animationValues && void 0 !== e.animationValues.opacityExit
    }
    let sA = {
        duration: .45,
        ease: [.4, 0, .1, 1]
    }
      , sT = e => "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e)
      , sP = sT("applewebkit/") && !sT("chrome/") ? Math.round : tQ;
    function s_(e) {
        e.min = sP(e.min),
        e.max = sP(e.max)
    }
    function sE(e, t, r) {
        return "position" === e || "preserve-aspect" === e && !(.2 >= Math.abs(sa(t) - sa(r)))
    }
    function sI(e) {
        return e !== e.root && e.scroll?.wasRoot
    }
    let sD = sd({
        attachResizeListener: (e, t) => ah(e, "resize", t),
        measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop
        }),
        checkIsScrollRoot: () => !0
    })
      , sR = {
        current: void 0
    }
      , sL = sd({
        measureScroll: e => ({
            x: e.scrollLeft,
            y: e.scrollTop
        }),
        defaultParent: () => {
            if (!sR.current) {
                let e = new sD({});
                e.mount(window),
                e.setOptions({
                    layoutScroll: !0
                }),
                sR.current = e
            }
            return sR.current
        }
        ,
        resetTransform: (e, t) => {
            e.style.transform = void 0 !== t ? t : "none"
        }
        ,
        checkIsScrollRoot: e => "fixed" === window.getComputedStyle(e).position
    });
    function sz(e, t) {
        let r = function(e, t, r) {
            if (e instanceof EventTarget)
                return [e];
            if ("string" == typeof e) {
                let t = document
                  , r = (void 0) ?? t.querySelectorAll(e);
                return r ? Array.from(r) : []
            }
            return Array.from(e)
        }(e)
          , n = new AbortController;
        return [r, {
            passive: !0,
            ...t,
            signal: n.signal
        }, () => n.abort()]
    }
    function sO(e) {
        return !("touch" === e.pointerType || ad.x || ad.y)
    }
    function sV(e, t, r) {
        let {props: n} = e;
        e.animationState && n.whileHover && e.animationState.setActive("whileHover", "Start" === r);
        let i = n["onHover" + r];
        i && t5.postRender( () => i(t, am(t)))
    }
    function s$(e) {
        return aU(e) && "offsetHeight"in e
    }
    let sF = (e, t) => !!t && (e === t || sF(e, t.parentElement))
      , sB = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"])
      , sH = new WeakSet;
    function sU(e) {
        return t => {
            "Enter" === t.key && e(t)
        }
    }
    function sq(e, t) {
        e.dispatchEvent(new PointerEvent("pointer" + t,{
            isPrimary: !0,
            bubbles: !0
        }))
    }
    function sW(e) {
        return ap(e) && !(ad.x || ad.y)
    }
    function sY(e, t, r) {
        let {props: n} = e;
        if (e.current instanceof HTMLButtonElement && e.current.disabled)
            return;
        e.animationState && n.whileTap && e.animationState.setActive("whileTap", "Start" === r);
        let i = n["onTap" + ("End" === r ? "" : r)];
        i && t5.postRender( () => i(t, am(t)))
    }
    let sG = new WeakMap
      , sX = new WeakMap
      , sJ = e => {
        let t = sG.get(e.target);
        t && t(e)
    }
      , sK = e => {
        e.forEach(sJ)
    }
      , sZ = {
        some: 0,
        all: 1
    }
      , sQ = function(e, t) {
        if ("undefined" == typeof Proxy)
            return nU;
        let r = new Map
          , n = (r, n) => nU(r, n, e, t);
        return new Proxy( (e, t) => n(e, t),{
            get: (i, a) => "create" === a ? n : (r.has(a) || r.set(a, nU(a, void 0, e, t)),
            r.get(a))
        })
    }({
        animation: {
            Feature: class extends ac {
                constructor(e) {
                    super(e),
                    e.animationState || (e.animationState = function(e) {
                        let t = t => Promise.all(t.map( ({animation: t, options: r}) => (function(e, t, r={}) {
                            let n;
                            if (e.notify("AnimationStart", t),
                            Array.isArray(t))
                                n = Promise.all(t.map(t => ar(e, t, r)));
                            else if ("string" == typeof t)
                                n = ar(e, t, r);
                            else {
                                let i = "function" == typeof t ? nq(e, t, r.custom) : t;
                                n = Promise.all(ae(e, i, r))
                            }
                            return n.then( () => {
                                e.notify("AnimationComplete", t)
                            }
                            )
                        }
                        )(e, t, r)))
                          , r = al()
                          , n = !0
                          , i = t => (r, n) => {
                            let i = nq(e, n, "exit" === t ? e.presenceContext?.custom : void 0);
                            if (i) {
                                let {transition: e, transitionEnd: t, ...n} = i;
                                r = {
                                    ...r,
                                    ...n,
                                    ...t
                                }
                            }
                            return r
                        }
                        ;
                        function a(a) {
                            let {props: s} = e
                              , o = function e(t) {
                                if (!t)
                                    return;
                                if (!t.isControllingVariants) {
                                    let r = t.parent && e(t.parent) || {};
                                    return void 0 !== t.props.initial && (r.initial = t.props.initial),
                                    r
                                }
                                let r = {};
                                for (let e = 0; e < ai; e++) {
                                    let n = r5[e]
                                      , i = t.props[n];
                                    (r1(i) || !1 === i) && (r[n] = i)
                                }
                                return r
                            }(e.parent) || {}
                              , l = []
                              , c = new Set
                              , u = {}
                              , d = 1 / 0;
                            for (let t = 0; t < as; t++) {
                                var h, p;
                                let m = aa[t]
                                  , f = r[m]
                                  , x = void 0 !== s[m] ? s[m] : o[m]
                                  , y = r1(x)
                                  , v = m === a ? f.isActive : null;
                                !1 === v && (d = t);
                                let g = x === o[m] && x !== s[m] && y;
                                if (g && n && e.manuallyAnimateOnMount && (g = !1),
                                f.protectedKeys = {
                                    ...u
                                },
                                !f.isActive && null === v || !x && !f.prevProp || r0(x) || "boolean" == typeof x)
                                    continue;
                                let b = (h = f.prevProp,
                                "string" == typeof (p = x) ? p !== h : !!Array.isArray(p) && !an(p, h))
                                  , w = b || m === a && f.isActive && !g && y || t > d && y
                                  , j = !1
                                  , N = Array.isArray(x) ? x : [x]
                                  , k = N.reduce(i(m), {});
                                !1 === v && (k = {});
                                let {prevResolvedValues: S={}} = f
                                  , C = {
                                    ...S,
                                    ...k
                                }
                                  , M = t => {
                                    w = !0,
                                    c.has(t) && (j = !0,
                                    c.delete(t)),
                                    f.needsAnimating[t] = !0;
                                    let r = e.getValue(t);
                                    r && (r.liveStyle = !1)
                                }
                                ;
                                for (let e in C) {
                                    let t = k[e]
                                      , r = S[e];
                                    if (!u.hasOwnProperty(e))
                                        (nY(t) && nY(r) ? an(t, r) : t === r) ? void 0 !== t && c.has(e) ? M(e) : f.protectedKeys[e] = !0 : null != t ? M(e) : c.add(e)
                                }
                                f.prevProp = x,
                                f.prevResolvedValues = k,
                                f.isActive && (u = {
                                    ...u,
                                    ...k
                                }),
                                n && e.blockInitialAnimation && (w = !1);
                                let A = g && b
                                  , T = !A || j;
                                w && T && l.push(...N.map(t => {
                                    let r = {
                                        type: m
                                    };
                                    if ("string" == typeof t && n && !A && e.manuallyAnimateOnMount && e.parent) {
                                        let {parent: n} = e
                                          , i = nq(n, t);
                                        if (n.enteringChildren && i) {
                                            let {delayChildren: t} = i.transition || {};
                                            r.delay = at(n.enteringChildren, e, t)
                                        }
                                    }
                                    return {
                                        animation: t,
                                        options: r
                                    }
                                }
                                ))
                            }
                            if (c.size) {
                                let t = {};
                                if ("boolean" != typeof s.initial) {
                                    let r = nq(e, Array.isArray(s.initial) ? s.initial[0] : s.initial);
                                    r && r.transition && (t.transition = r.transition)
                                }
                                c.forEach(r => {
                                    let n = e.getBaseTarget(r)
                                      , i = e.getValue(r);
                                    i && (i.liveStyle = !0),
                                    t[r] = n ?? null
                                }
                                ),
                                l.push({
                                    animation: t
                                })
                            }
                            let m = !!l.length;
                            return n && (!1 === s.initial || s.initial === s.animate) && !e.manuallyAnimateOnMount && (m = !1),
                            n = !1,
                            m ? t(l) : Promise.resolve()
                        }
                        return {
                            animateChanges: a,
                            setActive: function(t, n) {
                                if (r[t].isActive === n)
                                    return Promise.resolve();
                                e.variantChildren?.forEach(e => e.animationState?.setActive(t, n)),
                                r[t].isActive = n;
                                let i = a(t);
                                for (let e in r)
                                    r[e].protectedKeys = {};
                                return i
                            },
                            setAnimateFunction: function(r) {
                                t = r(e)
                            },
                            getState: () => r,
                            reset: () => {
                                r = al()
                            }
                        }
                    }(e))
                }
                updateAnimationControlsSubscription() {
                    let {animate: e} = this.node.getProps();
                    r0(e) && (this.unmountControls = e.subscribe(this.node))
                }
                mount() {
                    this.updateAnimationControlsSubscription()
                }
                update() {
                    let {animate: e} = this.node.getProps()
                      , {animate: t} = this.node.prevProps || {};
                    e !== t && this.updateAnimationControlsSubscription()
                }
                unmount() {
                    this.node.animationState.reset(),
                    this.unmountControls?.()
                }
            }
        },
        exit: {
            Feature: class extends ac {
                constructor() {
                    super(...arguments),
                    this.id = au++
                }
                update() {
                    if (!this.node.presenceContext)
                        return;
                    let {isPresent: e, onExitComplete: t} = this.node.presenceContext
                      , {isPresent: r} = this.node.prevPresenceContext || {};
                    if (!this.node.animationState || e === r)
                        return;
                    let n = this.node.animationState.setActive("exit", !e);
                    t && !e && n.then( () => {
                        t(this.id)
                    }
                    )
                }
                mount() {
                    let {register: e, onExitComplete: t} = this.node.presenceContext || {};
                    t && t(this.id),
                    e && (this.unmount = e(this.id))
                }
                unmount() {}
            }
        },
        inView: {
            Feature: class extends ac {
                constructor() {
                    super(...arguments),
                    this.hasEnteredView = !1,
                    this.isInView = !1
                }
                startObserver() {
                    var e;
                    let t;
                    this.unmount();
                    let {viewport: r={}} = this.node.getProps()
                      , {root: n, margin: i, amount: a="some", once: s} = r
                      , o = {
                        root: n ? n.current : void 0,
                        rootMargin: i,
                        threshold: "number" == typeof a ? a : sZ[a]
                    }
                      , l = e => {
                        let {isIntersecting: t} = e;
                        if (this.isInView === t || (this.isInView = t,
                        s && !t && this.hasEnteredView))
                            return;
                        t && (this.hasEnteredView = !0),
                        this.node.animationState && this.node.animationState.setActive("whileInView", t);
                        let {onViewportEnter: r, onViewportLeave: n} = this.node.getProps()
                          , i = t ? r : n;
                        i && i(e)
                    }
                    ;
                    return e = this.node.current,
                    t = function({root: e, ...t}) {
                        let r = e || document;
                        sX.has(r) || sX.set(r, {});
                        let n = sX.get(r)
                          , i = JSON.stringify(t);
                        return n[i] || (n[i] = new IntersectionObserver(sK,{
                            root: e,
                            ...t
                        })),
                        n[i]
                    }(o),
                    sG.set(e, l),
                    t.observe(e),
                    () => {
                        sG.delete(e),
                        t.unobserve(e)
                    }
                }
                mount() {
                    this.startObserver()
                }
                update() {
                    if ("undefined" == typeof IntersectionObserver)
                        return;
                    let {props: e, prevProps: t} = this.node;
                    ["amount", "margin", "root"].some(function({viewport: e={}}, {viewport: t={}}={}) {
                        return r => e[r] !== t[r]
                    }(e, t)) && this.startObserver()
                }
                unmount() {}
            }
        },
        tap: {
            Feature: class extends ac {
                mount() {
                    let {current: e} = this.node;
                    e && (this.unmount = function(e, t, r={}) {
                        let[n,i,a] = sz(e, r)
                          , s = e => {
                            let n = e.currentTarget;
                            if (!sW(e))
                                return;
                            sH.add(n);
                            let a = t(n, e)
                              , s = (e, t) => {
                                window.removeEventListener("pointerup", o),
                                window.removeEventListener("pointercancel", l),
                                sH.has(n) && sH.delete(n),
                                sW(e) && "function" == typeof a && a(e, {
                                    success: t
                                })
                            }
                              , o = e => {
                                s(e, n === window || n === document || r.useGlobalTarget || sF(n, e.target))
                            }
                              , l = e => {
                                s(e, !1)
                            }
                            ;
                            window.addEventListener("pointerup", o, i),
                            window.addEventListener("pointercancel", l, i)
                        }
                        ;
                        return n.forEach(e => {
                            ((r.useGlobalTarget ? window : e).addEventListener("pointerdown", s, i),
                            s$(e)) && (e.addEventListener("focus", e => ( (e, t) => {
                                let r = e.currentTarget;
                                if (!r)
                                    return;
                                let n = sU( () => {
                                    if (sH.has(r))
                                        return;
                                    sq(r, "down");
                                    let e = sU( () => {
                                        sq(r, "up")
                                    }
                                    );
                                    r.addEventListener("keyup", e, t),
                                    r.addEventListener("blur", () => sq(r, "cancel"), t)
                                }
                                );
                                r.addEventListener("keydown", n, t),
                                r.addEventListener("blur", () => r.removeEventListener("keydown", n), t)
                            }
                            )(e, i)),
                            sB.has(e.tagName) || -1 !== e.tabIndex || e.hasAttribute("tabindex") || (e.tabIndex = 0))
                        }
                        ),
                        a
                    }(e, (e, t) => (sY(this.node, t, "Start"),
                    (e, {success: t}) => sY(this.node, e, t ? "End" : "Cancel")), {
                        useGlobalTarget: this.node.props.globalTapTarget
                    }))
                }
                unmount() {}
            }
        },
        focus: {
            Feature: class extends ac {
                constructor() {
                    super(...arguments),
                    this.isActive = !1
                }
                onFocus() {
                    let e = !1;
                    try {
                        e = this.node.current.matches(":focus-visible")
                    } catch (t) {
                        e = !0
                    }
                    e && this.node.animationState && (this.node.animationState.setActive("whileFocus", !0),
                    this.isActive = !0)
                }
                onBlur() {
                    this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", !1),
                    this.isActive = !1)
                }
                mount() {
                    this.unmount = nK(ah(this.node.current, "focus", () => this.onFocus()), ah(this.node.current, "blur", () => this.onBlur()))
                }
                unmount() {}
            }
        },
        hover: {
            Feature: class extends ac {
                mount() {
                    let {current: e} = this.node;
                    e && (this.unmount = function(e, t, r={}) {
                        let[n,i,a] = sz(e, r)
                          , s = e => {
                            if (!sO(e))
                                return;
                            let {target: r} = e
                              , n = t(r, e);
                            if ("function" != typeof n || !r)
                                return;
                            let a = e => {
                                sO(e) && (n(e),
                                r.removeEventListener("pointerleave", a))
                            }
                            ;
                            r.addEventListener("pointerleave", a, i)
                        }
                        ;
                        return n.forEach(e => {
                            e.addEventListener("pointerenter", s, i)
                        }
                        ),
                        a
                    }(e, (e, t) => (sV(this.node, t, "Start"),
                    e => sV(this.node, e, "End"))))
                }
                unmount() {}
            }
        },
        pan: {
            Feature: class extends ac {
                constructor() {
                    super(...arguments),
                    this.removePointerDownListener = tQ
                }
                onPointerDown(e) {
                    this.session = new aS(e,this.createPanHandlers(),{
                        transformPagePoint: this.node.getTransformPagePoint(),
                        contextWindow: aN(this.node)
                    })
                }
                createPanHandlers() {
                    let {onPanSessionStart: e, onPanStart: t, onPan: r, onPanEnd: n} = this.node.getProps();
                    return {
                        onSessionStart: az(e),
                        onStart: az(t),
                        onMove: r,
                        onEnd: (e, t) => {
                            delete this.session,
                            n && t5.postRender( () => n(e, t))
                        }
                    }
                }
                mount() {
                    this.removePointerDownListener = af(this.node.current, "pointerdown", e => this.onPointerDown(e))
                }
                update() {
                    this.session && this.session.updateHandlers(this.createPanHandlers())
                }
                unmount() {
                    this.removePointerDownListener(),
                    this.session && this.session.end()
                }
            }
        },
        drag: {
            Feature: class extends ac {
                constructor(e) {
                    super(e),
                    this.removeGroupControls = tQ,
                    this.removeListeners = tQ,
                    this.controls = new aR(e)
                }
                mount() {
                    let {dragControls: e} = this.node.getProps();
                    e && (this.removeGroupControls = e.subscribe(this.controls)),
                    this.removeListeners = this.controls.addListeners() || tQ
                }
                unmount() {
                    this.removeGroupControls(),
                    this.removeListeners()
                }
            }
            ,
            ProjectionNode: sL,
            MeasureLayout: aH
        },
        layout: {
            ProjectionNode: sL,
            MeasureLayout: aH
        }
    }, (e, t) => nw(e) ? new ng(t) : new nd(t,{
        allowProjection: e !== p.Fragment
    }));
    var s0 = p;
    function s1(e, t) {
        if ("function" == typeof e)
            return e(t);
        null != e && (e.current = t)
    }
    class s2 extends s0.Component {
        getSnapshotBeforeUpdate(e) {
            let t = this.props.childRef.current;
            if (t && e.isPresent && !this.props.isPresent) {
                let e = t.offsetParent
                  , r = s$(e) && e.offsetWidth || 0
                  , n = this.props.sizeRef.current;
                n.height = t.offsetHeight || 0,
                n.width = t.offsetWidth || 0,
                n.top = t.offsetTop,
                n.left = t.offsetLeft,
                n.right = r - n.width - n.left
            }
            return null
        }
        componentDidUpdate() {}
        render() {
            return this.props.children
        }
    }
    function s5({children: e, isPresent: t, anchorX: r, root: n}) {
        let i = (0,
        s0.useId)()
          , a = (0,
        s0.useRef)(null)
          , s = (0,
        s0.useRef)({
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0
        })
          , {nonce: o} = (0,
        s0.useContext)(nk)
          , l = function(...e) {
            return p.useCallback(function(...e) {
                return t => {
                    let r = !1
                      , n = e.map(e => {
                        let n = s1(e, t);
                        return r || "function" != typeof n || (r = !0),
                        n
                    }
                    );
                    if (r)
                        return () => {
                            for (let t = 0; t < n.length; t++) {
                                let r = n[t];
                                "function" == typeof r ? r() : s1(e[t], null)
                            }
                        }
                }
            }(...e), e)
        }(a, e?.ref);
        return (0,
        s0.useInsertionEffect)( () => {
            let {width: e, height: l, top: c, left: u, right: d} = s.current;
            if (t || !a.current || !e || !l)
                return;
            let h = "left" === r ? `left: ${u}` : `right: ${d}`;
            a.current.dataset.motionPopId = i;
            let p = document.createElement("style");
            o && (p.nonce = o);
            let m = n ?? document.head;
            return m.appendChild(p),
            p.sheet && p.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${l}px !important;
            ${h}px !important;
            top: ${c}px !important;
          }
        `),
            () => {
                m.contains(p) && m.removeChild(p)
            }
        }
        , [t]),
        (0,
        d.jsx)(s2, {
            isPresent: t,
            childRef: a,
            sizeRef: s,
            children: s0.cloneElement(e, {
                ref: l
            })
        })
    }
    let s4 = ({children: e, initial: t, isPresent: r, onExitComplete: n, custom: i, presenceAffectsLayout: a, mode: s, anchorX: o, root: l}) => {
        let c = nD(s3)
          , u = (0,
        p.useId)()
          , h = !0
          , m = (0,
        p.useMemo)( () => (h = !1,
        {
            id: u,
            initial: t,
            isPresent: r,
            custom: i,
            onExitComplete: e => {
                for (let t of (c.set(e, !0),
                c.values()))
                    if (!t)
                        return;
                n && n()
            }
            ,
            register: e => (c.set(e, !1),
            () => c.delete(e))
        }), [r, c, n]);
        return a && h && (m = {
            ...m
        }),
        (0,
        p.useMemo)( () => {
            c.forEach( (e, t) => c.set(t, !1))
        }
        , [r]),
        p.useEffect( () => {
            r || c.size || !n || n()
        }
        , [r]),
        "popLayout" === s && (e = (0,
        d.jsx)(s5, {
            isPresent: r,
            anchorX: o,
            root: l,
            children: e
        })),
        (0,
        d.jsx)(nI.Provider, {
            value: m,
            children: e
        })
    }
    ;
    function s3() {
        return new Map
    }
    let s6 = e => e.key || "";
    function s8(e) {
        let t = [];
        return p.Children.forEach(e, e => {
            (0,
            p.isValidElement)(e) && t.push(e)
        }
        ),
        t
    }
    let s9 = ({children: e, custom: t, initial: r=!0, onExitComplete: n, presenceAffectsLayout: i=!0, mode: a="sync", propagate: s=!1, anchorX: o="left", root: l}) => {
        let[c,u] = aV(s)
          , h = (0,
        p.useMemo)( () => s8(e), [e])
          , m = s && !c ? [] : h.map(s6)
          , f = (0,
        p.useRef)(!0)
          , x = (0,
        p.useRef)(h)
          , y = nD( () => new Map)
          , [v,g] = (0,
        p.useState)(h)
          , [b,w] = (0,
        p.useState)(h);
        nH( () => {
            f.current = !1,
            x.current = h;
            for (let e = 0; e < b.length; e++) {
                let t = s6(b[e]);
                m.includes(t) ? y.delete(t) : !0 !== y.get(t) && y.set(t, !1)
            }
        }
        , [b, m.length, m.join("-")]);
        let j = [];
        if (h !== v) {
            let e = [...h];
            for (let t = 0; t < b.length; t++) {
                let r = b[t]
                  , n = s6(r);
                m.includes(n) || (e.splice(t, 0, r),
                j.push(r))
            }
            return "wait" === a && j.length && (e = j),
            w(s8(e)),
            g(h),
            null
        }
        let {forceRender: N} = (0,
        p.useContext)(nj);
        return (0,
        d.jsx)(d.Fragment, {
            children: b.map(e => {
                let p = s6(e)
                  , v = (!s || !!c) && (h === b || m.includes(p));
                return (0,
                d.jsx)(s4, {
                    isPresent: v,
                    initial: (!f.current || !!r) && void 0,
                    custom: t,
                    presenceAffectsLayout: i,
                    mode: a,
                    root: l,
                    onExitComplete: v ? void 0 : () => {
                        if (!y.has(p))
                            return;
                        y.set(p, !0);
                        let e = !0;
                        y.forEach(t => {
                            t || (e = !1)
                        }
                        ),
                        e && (N?.(),
                        w(x.current),
                        s && u?.(),
                        n && n())
                    }
                    ,
                    anchorX: o,
                    children: e
                }, p)
            }
            )
        })
    }
      , s7 = (...e) => e.filter( (e, t, r) => !!e && r.indexOf(e) === t).join(" ");
    var oe = {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
    };
    let ot = (0,
    p.forwardRef)( ({color: e="currentColor", size: t=24, strokeWidth: r=2, absoluteStrokeWidth: n, className: i="", children: a, iconNode: s, ...o}, l) => (0,
    p.createElement)("svg", {
        ref: l,
        ...oe,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: n ? 24 * Number(r) / Number(t) : r,
        className: s7("lucide", i),
        ...o
    }, [...s.map( ([e,t]) => (0,
    p.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]))
      , or = (e, t) => {
        let r = (0,
        p.forwardRef)( ({className: r, ...n}, i) => (0,
        p.createElement)(ot, {
            ref: i,
            iconNode: t,
            className: s7(`lucide-${e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`, r),
            ...n
        }));
        return r.displayName = `${e}`,
        r
    }
      , on = or("Zap", [["path", {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db"
    }]])
      , oi = or("History", [["path", {
        d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
        key: "1357e3"
    }], ["path", {
        d: "M3 3v5h5",
        key: "1xhq8a"
    }], ["path", {
        d: "M12 7v5l4 2",
        key: "1fdv2h"
    }]])
      , oa = or("FileText", [["path", {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7"
    }], ["path", {
        d: "M14 2v4a2 2 0 0 0 2 2h4",
        key: "tnqrlb"
    }], ["path", {
        d: "M10 9H8",
        key: "b1mrlr"
    }], ["path", {
        d: "M16 13H8",
        key: "t4e002"
    }], ["path", {
        d: "M16 17H8",
        key: "z1uh3a"
    }]])
      , os = or("Settings", [["path", {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        key: "1qme2f"
    }], ["circle", {
        cx: "12",
        cy: "12",
        r: "3",
        key: "1v7zrd"
    }]])
      , oo = or("Info", [["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }], ["path", {
        d: "M12 16v-4",
        key: "1dtifu"
    }], ["path", {
        d: "M12 8h.01",
        key: "e9boi3"
    }]])
      , ol = or("ChevronLeft", [["path", {
        d: "m15 18-6-6 6-6",
        key: "1wnfg3"
    }]])
      , oc = or("ChevronRight", [["path", {
        d: "m9 18 6-6-6-6",
        key: "mthhwq"
    }]])
      , ou = [{
        id: "converter",
        label: "Converter",
        icon: on,
        description: "Convert prompts"
    }, {
        id: "history",
        label: "History",
        icon: oi,
        description: "Past conversions"
    }, {
        id: "templates",
        label: "Templates",
        icon: oa,
        description: "Prompt templates"
    }, {
        id: "settings",
        label: "Settings",
        icon: os,
        description: "Preferences"
    }, {
        id: "about",
        label: "About",
        icon: oo,
        description: "Information"
    }];
    function od() {
        let {currentView: e, setCurrentView: t, sidebarCollapsed: r, setSidebarCollapsed: n} = ez();
        return (0,
        d.jsx)(sQ.aside, {
            initial: !1,
            animate: {
                width: r ? "80px" : "240px"
            },
            transition: {
                duration: .3,
                ease: "easeInOut"
            },
            className: "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] z-40 hidden lg:block",
            "data-tour": "sidebar",
            children: (0,
            d.jsxs)("div", {
                className: "flex flex-col h-full",
                children: [(0,
                d.jsx)("div", {
                    className: "flex items-center justify-end p-3 border-b border-[var(--border-subtle)]",
                    children: (0,
                    d.jsx)(sQ.button, {
                        whileHover: {
                            scale: 1.1
                        },
                        whileTap: {
                            scale: .9
                        },
                        onClick: () => n(!r),
                        className: "p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors",
                        "aria-label": r ? "Expand sidebar" : "Collapse sidebar",
                        children: r ? (0,
                        d.jsx)(oc, {
                            className: "w-5 h-5"
                        }) : (0,
                        d.jsx)(ol, {
                            className: "w-5 h-5"
                        })
                    })
                }), (0,
                d.jsx)("nav", {
                    className: "flex-1 overflow-y-auto py-4",
                    children: (0,
                    d.jsx)("ul", {
                        className: "space-y-1 px-3",
                        children: ou.map(n => {
                            let i = n.icon
                              , a = e === n.id;
                            return (0,
                            d.jsx)("li", {
                                children: (0,
                                d.jsxs)(sQ.button, {
                                    whileHover: {
                                        x: 4
                                    },
                                    whileTap: {
                                        scale: .98
                                    },
                                    onClick: () => t(n.id),
                                    "data-tour": `nav-${n.id}`,
                                    className: `
                      relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-colors duration-200
                      ${a ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"}
                    `,
                                    title: r ? n.label : "",
                                    children: [a && (0,
                                    d.jsx)(sQ.div, {
                                        layoutId: "activeIndicator",
                                        className: "absolute inset-0 bg-[var(--accent-primary)] rounded-lg",
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }
                                    }), (0,
                                    d.jsx)(i, {
                                        className: "w-5 h-5 flex-shrink-0 relative z-10"
                                    }), (0,
                                    d.jsx)(s9, {
                                        mode: "wait",
                                        children: !r && (0,
                                        d.jsx)(sQ.span, {
                                            initial: {
                                                opacity: 0,
                                                width: 0
                                            },
                                            animate: {
                                                opacity: 1,
                                                width: "auto"
                                            },
                                            exit: {
                                                opacity: 0,
                                                width: 0
                                            },
                                            transition: {
                                                duration: .2
                                            },
                                            className: "font-medium text-sm relative z-10 whitespace-nowrap overflow-hidden",
                                            children: n.label
                                        })
                                    })]
                                })
                            }, n.id)
                        }
                        )
                    })
                }), (0,
                d.jsx)(s9, {
                    mode: "wait",
                    children: !r && (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0,
                            height: 0
                        },
                        animate: {
                            opacity: 1,
                            height: "auto"
                        },
                        exit: {
                            opacity: 0,
                            height: 0
                        },
                        className: "p-4 border-t border-[var(--border-subtle)]",
                        children: (0,
                        d.jsx)("p", {
                            className: "text-xs text-[var(--text-muted)] text-center",
                            children: "Y7-Jprompter v1.0"
                        })
                    })
                })]
            })
        })
    }
    let oh = or("Menu", [["line", {
        x1: "4",
        x2: "20",
        y1: "12",
        y2: "12",
        key: "1e0a9i"
    }], ["line", {
        x1: "4",
        x2: "20",
        y1: "6",
        y2: "6",
        key: "1owob3"
    }], ["line", {
        x1: "4",
        x2: "20",
        y1: "18",
        y2: "18",
        key: "yk5zj1"
    }]])
      , op = or("X", [["path", {
        d: "M18 6 6 18",
        key: "1bl5f8"
    }], ["path", {
        d: "m6 6 12 12",
        key: "d8bk6v"
    }]]);
    var om = e.i(57688)
      , of = e.i(74080);
    let ox = [{
        id: "converter",
        label: "Converter",
        icon: on,
        description: "Convert prompts"
    }, {
        id: "history",
        label: "History",
        icon: oi,
        description: "Past conversions"
    }, {
        id: "templates",
        label: "Templates",
        icon: oa,
        description: "Prompt templates"
    }, {
        id: "settings",
        label: "Settings",
        icon: os,
        description: "Preferences"
    }, {
        id: "about",
        label: "About",
        icon: oo,
        description: "Information"
    }];
    function oy() {
        let {currentView: e, setCurrentView: t, mobileMenuOpen: r, setMobileMenuOpen: n} = ez();
        return r ? (0,
        d.jsxs)(d.Fragment, {
            children: [(0,
            d.jsx)(sQ.div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                transition: {
                    duration: .2
                },
                onClick: () => n(!1),
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
            }), (0,
            d.jsxs)(sQ.div, {
                initial: {
                    x: "-100%"
                },
                animate: {
                    x: 0
                },
                exit: {
                    x: "-100%"
                },
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                },
                className: "fixed left-0 top-0 h-full w-[280px] bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] z-[9999] lg:hidden overflow-y-auto",
                children: [(0,
                d.jsxs)("div", {
                    className: "flex items-center justify-between p-4 border-b border-[var(--border-subtle)]",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0,
                        d.jsx)(om.default, {
                            src: "/favicon.svg",
                            alt: "Y7-Jprompter",
                            width: 28,
                            height: 28,
                            className: "w-7 h-7"
                        }), (0,
                        d.jsx)("span", {
                            className: "font-semibold text-[var(--text-primary)]",
                            children: "Y7-Jprompter"
                        })]
                    }), (0,
                    d.jsx)(sQ.button, {
                        whileHover: {
                            scale: 1.1
                        },
                        whileTap: {
                            scale: .9
                        },
                        onClick: () => n(!1),
                        className: "p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors",
                        children: (0,
                        d.jsx)(op, {
                            className: "w-5 h-5"
                        })
                    })]
                }), (0,
                d.jsx)("nav", {
                    className: "py-4",
                    children: (0,
                    d.jsx)("ul", {
                        className: "space-y-1 px-3",
                        children: ox.map( (r, n) => {
                            let i = r.icon
                              , a = e === r.id;
                            return (0,
                            d.jsx)(sQ.li, {
                                initial: {
                                    opacity: 0,
                                    x: -20
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                },
                                transition: {
                                    delay: .05 * n
                                },
                                children: (0,
                                d.jsxs)(sQ.button, {
                                    whileHover: {
                                        x: 4
                                    },
                                    whileTap: {
                                        scale: .98
                                    },
                                    onClick: () => t(r.id),
                                    className: `
                                            relative w-full flex items-center gap-3 px-4 py-3 rounded-lg
                                            transition-colors duration-200
                                            ${a ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}
                                        `,
                                    children: [a && (0,
                                    d.jsx)(sQ.div, {
                                        layoutId: "mobileActiveIndicator",
                                        className: "absolute inset-0 bg-[var(--accent-primary)] rounded-lg",
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }
                                    }), (0,
                                    d.jsx)(i, {
                                        className: "w-5 h-5 flex-shrink-0 relative z-10"
                                    }), (0,
                                    d.jsxs)("div", {
                                        className: "flex-1 text-left relative z-10",
                                        children: [(0,
                                        d.jsx)("div", {
                                            className: "font-medium text-sm",
                                            children: r.label
                                        }), (0,
                                        d.jsx)("div", {
                                            className: `text-xs ${a ? "text-white/80" : "text-[var(--text-muted)]"}`,
                                            children: r.description
                                        })]
                                    })]
                                })
                            }, r.id)
                        }
                        )
                    })
                }), (0,
                d.jsx)("div", {
                    className: "absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]",
                    children: (0,
                    d.jsx)("p", {
                        className: "text-xs text-[var(--text-muted)] text-center",
                        children: "Y7-Jprompter v1.0"
                    })
                })]
            })]
        }) : null
    }
    function ov() {
        let {mobileMenuOpen: e, setMobileMenuOpen: t} = ez()
          , [r,n] = (0,
        p.useState)(!1);
        return (0,
        p.useEffect)( () => {
            n(!0)
        }
        , []),
        (0,
        p.useEffect)( () => {
            let r = r => {
                "Escape" === r.key && e && t(!1)
            }
            ;
            return document.addEventListener("keydown", r),
            () => document.removeEventListener("keydown", r)
        }
        , [e, t]),
        (0,
        p.useEffect)( () => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "",
        () => {
            document.body.style.overflow = ""
        }
        ), [e]),
        (0,
        d.jsxs)(d.Fragment, {
            children: [(0,
            d.jsx)(sQ.button, {
                whileHover: {
                    scale: 1.05
                },
                whileTap: {
                    scale: .95
                },
                onClick: () => t(!e),
                className: "lg:hidden p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-colors",
                "aria-label": "Toggle menu",
                children: (0,
                d.jsx)(s9, {
                    mode: "wait",
                    children: e ? (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            rotate: -90,
                            opacity: 0
                        },
                        animate: {
                            rotate: 0,
                            opacity: 1
                        },
                        exit: {
                            rotate: 90,
                            opacity: 0
                        },
                        transition: {
                            duration: .2
                        },
                        children: (0,
                        d.jsx)(op, {
                            className: "w-5 h-5 text-[var(--text-primary)]"
                        })
                    }, "close") : (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            rotate: 90,
                            opacity: 0
                        },
                        animate: {
                            rotate: 0,
                            opacity: 1
                        },
                        exit: {
                            rotate: -90,
                            opacity: 0
                        },
                        transition: {
                            duration: .2
                        },
                        children: (0,
                        d.jsx)(oh, {
                            className: "w-5 h-5 text-[var(--text-primary)]"
                        })
                    }, "menu")
                })
            }), r && (0,
            of.createPortal)((0,
            d.jsx)(s9, {
                children: e && (0,
                d.jsx)(oy, {})
            }), document.body)]
        })
    }
    var og = e.i(63178);
    let ob = or("Sun", [["circle", {
        cx: "12",
        cy: "12",
        r: "4",
        key: "4exip2"
    }], ["path", {
        d: "M12 2v2",
        key: "tus03m"
    }], ["path", {
        d: "M12 20v2",
        key: "1lh1kg"
    }], ["path", {
        d: "m4.93 4.93 1.41 1.41",
        key: "149t6j"
    }], ["path", {
        d: "m17.66 17.66 1.41 1.41",
        key: "ptbguv"
    }], ["path", {
        d: "M2 12h2",
        key: "1t8f8n"
    }], ["path", {
        d: "M20 12h2",
        key: "1q8mjw"
    }], ["path", {
        d: "m6.34 17.66-1.41 1.41",
        key: "1m8zz5"
    }], ["path", {
        d: "m19.07 4.93-1.41 1.41",
        key: "1shlcs"
    }]])
      , ow = or("Moon", [["path", {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
        key: "a7tn18"
    }]]);
    function oj({showLabel: e=!1, className: t=""}) {
        let {theme: r, setTheme: n, resolvedTheme: i} = (0,
        og.useTheme)()
          , [a,s] = (0,
        p.useState)(!1);
        if ((0,
        p.useEffect)( () => {
            s(!0)
        }
        , []),
        !a)
            return (0,
            d.jsx)("div", {
                className: `w-10 h-10 rounded-lg bg-[var(--bg-secondary)] ${t}`
            });
        let o = "dark" === i;
        return (0,
        d.jsxs)(sQ.button, {
            whileHover: {
                scale: 1.05
            },
            whileTap: {
                scale: .95
            },
            onClick: () => {
                n(o ? "light" : "dark")
            }
            ,
            "data-tour": "theme-toggle",
            className: `
        relative flex items-center gap-2 p-2 rounded-lg
        bg-[var(--bg-secondary)] border border-[var(--border-subtle)]
        hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-glow)]
        transition-all duration-200
        ${t}
      `,
            "aria-label": `Switch to ${o ? "light" : "dark"} mode`,
            children: [(0,
            d.jsx)(s9, {
                mode: "wait",
                initial: !1,
                children: (0,
                d.jsx)(sQ.div, {
                    initial: {
                        y: -20,
                        opacity: 0
                    },
                    animate: {
                        y: 0,
                        opacity: 1
                    },
                    exit: {
                        y: 20,
                        opacity: 0
                    },
                    transition: {
                        duration: .2
                    },
                    children: o ? (0,
                    d.jsx)(ob, {
                        className: "h-5 w-5 text-[var(--accent-primary)]"
                    }) : (0,
                    d.jsx)(ow, {
                        className: "h-5 w-5 text-[var(--accent-primary)]"
                    })
                }, o ? "dark" : "light")
            }), e && (0,
            d.jsx)("span", {
                className: "text-sm font-medium text-[var(--text-secondary)]",
                children: o ? "Dark" : "Light"
            })]
        })
    }
    let oN = or("WandSparkles", [["path", {
        d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
        key: "ul74o6"
    }], ["path", {
        d: "m14 7 3 3",
        key: "1r5n42"
    }], ["path", {
        d: "M5 6v4",
        key: "ilb8ba"
    }], ["path", {
        d: "M19 14v4",
        key: "blhpug"
    }], ["path", {
        d: "M10 2v2",
        key: "7u0qdc"
    }], ["path", {
        d: "M7 8H3",
        key: "zfb6yr"
    }], ["path", {
        d: "M21 16h-4",
        key: "1cnmox"
    }], ["path", {
        d: "M11 3H9",
        key: "1obp7u"
    }]])
      , ok = or("Sparkles", [["path", {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        key: "4pj2yx"
    }], ["path", {
        d: "M20 3v4",
        key: "1olli1"
    }], ["path", {
        d: "M22 5h-4",
        key: "1gvqau"
    }], ["path", {
        d: "M4 17v2",
        key: "vumght"
    }], ["path", {
        d: "M5 18H3",
        key: "zchphs"
    }]])
      , oS = or("Plus", [["path", {
        d: "M5 12h14",
        key: "1ays0h"
    }], ["path", {
        d: "M12 5v14",
        key: "s699le"
    }]]);
    function oC({value: e, onChange: t, complexity: r}) {
        let[n,i] = (0,
        p.useState)(!1);
        if (r < 3)
            return null;
        let a = n || e.length > 0;
        return (0,
        d.jsx)("div", {
            className: "mt-4",
            children: (0,
            d.jsx)(s9, {
                mode: "wait",
                children: a ? (0,
                d.jsx)(sQ.div, {
                    initial: {
                        opacity: 0,
                        height: 0
                    },
                    animate: {
                        opacity: 1,
                        height: "auto"
                    },
                    exit: {
                        opacity: 0,
                        height: 0
                    },
                    transition: {
                        duration: .3
                    },
                    className: "overflow-hidden",
                    children: (0,
                    d.jsxs)(sQ.div, {
                        className: "bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary)]/20 rounded-xl p-4",
                        initial: {
                            scale: .98
                        },
                        animate: {
                            scale: 1
                        },
                        children: [(0,
                        d.jsxs)("div", {
                            className: "flex items-center justify-between mb-3",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [(0,
                                d.jsx)(sQ.div, {
                                    animate: {
                                        rotate: [0, 10, -10, 0]
                                    },
                                    transition: {
                                        duration: 2,
                                        repeat: 1 / 0
                                    },
                                    children: (0,
                                    d.jsx)(ok, {
                                        className: "w-4 h-4 text-[var(--accent-primary)]"
                                    })
                                }), (0,
                                d.jsx)("span", {
                                    className: "text-sm font-semibold text-[var(--text-primary)]",
                                    children: "Context Injection"
                                }), (0,
                                d.jsx)("span", {
                                    className: "text-xs px-2 py-0.5 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] rounded-full",
                                    children: "Advanced"
                                })]
                            }), (0,
                            d.jsx)(sQ.button, {
                                whileHover: {
                                    scale: 1.1
                                },
                                whileTap: {
                                    scale: .9
                                },
                                onClick: () => {
                                    t(""),
                                    i(!1)
                                }
                                ,
                                className: "p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors",
                                title: "Remove context",
                                children: (0,
                                d.jsx)(op, {
                                    className: "w-4 h-4"
                                })
                            })]
                        }), (0,
                        d.jsx)("p", {
                            className: "text-xs text-[var(--text-muted)] mb-3",
                            children: "Add project context, code snippets, or background information to make your prompts more specific."
                        }), (0,
                        d.jsx)("textarea", {
                            value: e,
                            onChange: e => t(e.target.value),
                            placeholder: "e.g., 'This is for a React TypeScript project using Next.js 14...'",
                            className: "w-full h-24 p-3 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm resize-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:outline-none transition-all"
                        }), e && (0,
                        d.jsxs)(sQ.div, {
                            initial: {
                                opacity: 0,
                                y: -5
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "mt-2 flex items-center gap-1.5 text-xs text-[var(--accent-primary)]",
                            children: [(0,
                            d.jsx)(ok, {
                                className: "w-3 h-3"
                            }), (0,
                            d.jsxs)("span", {
                                children: [e.length, " characters of context added"]
                            })]
                        })]
                    })
                }, "context-panel") : (0,
                d.jsxs)(sQ.button, {
                    initial: {
                        opacity: 0,
                        y: -5
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -5
                    },
                    onClick: () => i(!0),
                    "data-tour": "context-injection",
                    className: "flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[var(--border-default)] hover:border-[var(--accent-primary)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-all group",
                    children: [(0,
                    d.jsx)(oS, {
                        className: "w-4 h-4 group-hover:rotate-90 transition-transform"
                    }), (0,
                    d.jsx)("span", {
                        className: "text-sm font-medium",
                        children: "Add Context"
                    }), (0,
                    d.jsx)("span", {
                        className: "text-xs px-2 py-0.5 bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] rounded-full",
                        children: "Advanced"
                    })]
                }, "add-context-btn")
            })
        })
    }
    let oM = or("Save", [["path", {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476"
    }], ["path", {
        d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
        key: "1ydtos"
    }], ["path", {
        d: "M7 3v4a1 1 0 0 0 1 1h7",
        key: "t51u73"
    }]])
      , oA = or("Copy", [["rect", {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2",
        key: "17jyea"
    }], ["path", {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
        key: "zix9uf"
    }]])
      , oT = or("Download", [["path", {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
        key: "ih7n3h"
    }], ["polyline", {
        points: "7 10 12 15 17 10",
        key: "2ggqvy"
    }], ["line", {
        x1: "12",
        x2: "12",
        y1: "15",
        y2: "3",
        key: "1vk2je"
    }]])
      , oP = or("Share2", [["circle", {
        cx: "18",
        cy: "5",
        r: "3",
        key: "gq8acd"
    }], ["circle", {
        cx: "6",
        cy: "12",
        r: "3",
        key: "w7nqdw"
    }], ["circle", {
        cx: "18",
        cy: "19",
        r: "3",
        key: "1xt0gg"
    }], ["line", {
        x1: "8.59",
        x2: "15.42",
        y1: "13.51",
        y2: "17.49",
        key: "47mynk"
    }], ["line", {
        x1: "15.41",
        x2: "8.59",
        y1: "6.51",
        y2: "10.49",
        key: "1n3mei"
    }]])
      , o_ = or("RotateCcw", [["path", {
        d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
        key: "1357e3"
    }], ["path", {
        d: "M3 3v5h5",
        key: "1xhq8a"
    }]])
      , oE = or("Check", [["path", {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
    }]]);
    function oI({jsonOutput: e, onCopy: t, onDownload: r, onClear: n, copied: i=!1}) {
        let[a,s] = (0,
        p.useState)(!1)
          , [o,l] = (0,
        p.useState)(!1)
          , c = async () => {
            if (!e)
                return;
            let t = btoa(JSON.stringify(e))
              , r = `${window.location.origin}?shared=${t}`;
            await navigator.clipboard.writeText(r),
            l(!0),
            setTimeout( () => l(!1), 2e3)
        }
          , u = [{
            icon: a ? oE : oM,
            label: "Save to History",
            onClick: () => {
                s(!0),
                setTimeout( () => s(!1), 2e3)
            }
            ,
            disabled: !e,
            variant: a ? "success" : "default"
        }, {
            icon: i ? oE : oA,
            label: "Copy to Clipboard",
            onClick: t,
            disabled: !e,
            variant: i ? "success" : "default"
        }, {
            icon: oT,
            label: "Download JSON",
            onClick: r,
            disabled: !e,
            variant: "default"
        }, {
            icon: o ? oE : oP,
            label: "Share Link",
            onClick: c,
            disabled: !e,
            variant: o ? "success" : "default"
        }, {
            icon: o_,
            label: "Clear All",
            onClick: n,
            disabled: !1,
            variant: "danger"
        }];
        return (0,
        d.jsx)("div", {
            className: "flex items-center gap-1",
            children: u.map(e => {
                let t = e.icon;
                return (0,
                d.jsx)(sQ.button, {
                    onClick: e.onClick,
                    disabled: e.disabled,
                    whileHover: e.disabled ? {} : {
                        scale: 1.1
                    },
                    whileTap: e.disabled ? {} : {
                        scale: .9
                    },
                    title: e.label,
                    className: `
                            p-2 rounded-lg transition-all duration-200
                            ${e.disabled ? "opacity-30 cursor-not-allowed text-[var(--text-muted)]" : "success" === e.variant ? "text-[var(--accent-success)] bg-[var(--accent-success-subtle)]" : "danger" === e.variant ? "text-[var(--color-error)] hover:bg-[var(--color-error-subtle)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}
                        `,
                    children: (0,
                    d.jsx)(t, {
                        className: "w-4 h-4"
                    })
                }, e.label)
            }
            )
        })
    }
    let oD = [{
        label: "Code Review",
        prompt: "You are a senior software engineer reviewing code. Analyze the provided code for bugs, security issues, performance problems, and suggest improvements following best practices."
    }, {
        label: "Blog Writer",
        prompt: "Write a comprehensive blog post about the given topic. Include an engaging introduction, well-structured sections with headers, practical examples, and a compelling conclusion with a call to action."
    }, {
        label: "Data Analyst",
        prompt: "Analyze the provided dataset and generate insights. Identify trends, patterns, anomalies, and provide actionable recommendations based on the data. Present findings in a clear, structured format."
    }, {
        label: "API Designer",
        prompt: "Design a RESTful API for the described system. Include endpoints, HTTP methods, request/response schemas, authentication requirements, and error handling strategies."
    }, {
        label: "Email Composer",
        prompt: "Write a professional email for the given context. Maintain appropriate tone, be concise yet thorough, include clear action items, and ensure proper formatting."
    }, {
        label: "SQL Expert",
        prompt: "Generate optimized SQL queries for the described database operations. Consider indexing, query performance, and best practices for the specific database system."
    }];
    function oR({onSelect: e}) {
        let t = (0,
        p.useRef)(null);
        return (0,
        p.useEffect)( () => {
            let e = t.current;
            if (!e)
                return;
            let r = 1
              , n = setInterval( () => {
                e && (e.scrollLeft += .5 * r,
                e.scrollLeft >= e.scrollWidth - e.clientWidth - 1 ? r = -1 : e.scrollLeft <= 0 && (r = 1))
            }
            , 30);
            return () => {
                clearInterval(n)
            }
        }
        , []),
        (0,
        d.jsxs)("div", {
            className: "mb-4 relative z-10",
            "data-tour": "examples",
            children: [(0,
            d.jsxs)("div", {
                className: "flex items-center gap-2 mb-2",
                children: [(0,
                d.jsx)(ok, {
                    className: "w-3.5 h-3.5 text-[var(--accent-primary)]"
                }), (0,
                d.jsx)("span", {
                    className: "text-xs font-medium text-[var(--text-muted)]",
                    children: "Try an example"
                })]
            }), (0,
            d.jsx)("div", {
                ref: t,
                className: "flex gap-2 overflow-x-auto scrollbar-hide py-2 -my-1",
                style: {
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                },
                children: oD.map( (t, r) => (0,
                d.jsx)(sQ.button, {
                    onClick: () => e(t.prompt),
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        delay: .05 * r
                    },
                    whileHover: {
                        scale: 1.05,
                        y: -3
                    },
                    whileTap: {
                        scale: .98
                    },
                    className: "flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] transition-all shadow-sm hover:shadow-md",
                    children: t.label
                }, t.label))
            })]
        })
    }
    function oL() {
        let[e,t] = (0,
        p.useState)(0);
        (0,
        p.useEffect)( () => {
            let e = setInterval( () => {
                t(e => (e + 1) % 4)
            }
            , 1200);
            return () => clearInterval(e)
        }
        , []);
        let r = [{
            lines: ["{"],
            label: "Initializing structure"
        }, {
            lines: ["{", '  "role": "system",'],
            label: "Defining roles"
        }, {
            lines: ["{", '  "role": "system",', '  "context": ['],
            label: "Building context"
        }, {
            lines: ["{", '  "role": "system",', '  "context": [...]', '  "constraints": {...}'],
            label: "Adding constraints"
        }];
        return (0,
        d.jsxs)("div", {
            className: "w-full max-w-2xl mx-auto space-y-2 md:space-y-6 px-2",
            children: [(0,
            d.jsxs)("div", {
                className: "relative bg-[var(--bg-tertiary)] rounded-lg md:rounded-xl p-2 md:p-6 border-2 border-[var(--accent-primary)]/30 overflow-hidden min-h-[100px] md:min-h-[180px]",
                children: [(0,
                d.jsx)(sQ.div, {
                    className: "absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent",
                    animate: {
                        y: [0, 140, 0]
                    },
                    transition: {
                        duration: 2,
                        repeat: 1 / 0,
                        ease: "linear"
                    }
                }), (0,
                d.jsxs)("div", {
                    className: "font-mono text-xs md:text-sm space-y-1 md:space-y-2 relative z-10",
                    children: [(0,
                    d.jsx)(s9, {
                        mode: "wait",
                        children: r[e].lines.map( (t, n) => (0,
                        d.jsxs)(sQ.div, {
                            initial: {
                                opacity: 0,
                                x: -20,
                                filter: "blur(4px)"
                            },
                            animate: {
                                opacity: 1,
                                x: 0,
                                filter: "blur(0px)"
                            },
                            transition: {
                                delay: .15 * n,
                                duration: .3
                            },
                            className: "flex items-center gap-2",
                            children: [(0,
                            d.jsx)("span", {
                                className: "text-[var(--text-muted)] select-none w-4 md:w-6 text-right text-[10px] md:text-xs",
                                children: n + 1
                            }), (0,
                            d.jsx)("span", {
                                className: "flex-1 break-all",
                                children: t.includes('"') ? (0,
                                d.jsx)(d.Fragment, {
                                    children: t.split('"').map( (e, t) => t % 2 == 0 ? (0,
                                    d.jsx)("span", {
                                        className: "text-[var(--text-secondary)]",
                                        children: e
                                    }, t) : (0,
                                    d.jsxs)(sQ.span, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        className: "text-[var(--accent-primary)]",
                                        children: ['"', e, '"']
                                    }, t))
                                }) : (0,
                                d.jsx)("span", {
                                    className: "text-[var(--text-secondary)]",
                                    children: t
                                })
                            }), n === r[e].lines.length - 1 && (0,
                            d.jsx)(sQ.span, {
                                animate: {
                                    opacity: [1, 0, 1]
                                },
                                transition: {
                                    duration: .8,
                                    repeat: 1 / 0
                                },
                                className: "w-1.5 md:w-2 h-3 md:h-4 bg-[var(--accent-primary)] inline-block"
                            })]
                        }, `${e}-${n}`))
                    }), (0,
                    d.jsxs)(sQ.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 3 === e ? 1 : .2
                        },
                        className: "text-[var(--text-muted)] flex items-center gap-2",
                        children: [(0,
                        d.jsx)("span", {
                            className: "w-4 md:w-6 text-right text-[10px] md:text-xs",
                            children: r[e].lines.length + 1
                        }), (0,
                        d.jsx)("span", {
                            children: "}"
                        })]
                    })]
                }), (0,
                d.jsx)("div", {
                    className: "absolute inset-0 pointer-events-none overflow-hidden hidden md:block",
                    children: ["{", "}", "[", "]", ":", '"'].map( (e, t) => (0,
                    d.jsx)(sQ.div, {
                        className: "absolute text-xl md:text-2xl font-mono text-[var(--accent-primary)]/20",
                        animate: {
                            x: [300 * Math.random(), 300 * Math.random()],
                            y: [200 * Math.random(), 200 * Math.random()],
                            rotate: [0, 360],
                            opacity: [.1, .3, .1]
                        },
                        transition: {
                            duration: 3 + 2 * Math.random(),
                            repeat: 1 / 0,
                            ease: "easeInOut"
                        },
                        style: {
                            left: 100 * Math.random() + "%",
                            top: 100 * Math.random() + "%"
                        },
                        children: e
                    }, t))
                })]
            }), (0,
            d.jsxs)("div", {
                className: "text-center space-y-1 md:space-y-3",
                children: [(0,
                d.jsx)(sQ.p, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    className: "text-[10px] md:text-sm text-[var(--text-secondary)] font-medium",
                    children: r[e].label
                }, r[e].label), (0,
                d.jsx)("div", {
                    className: "flex gap-1 md:gap-2 justify-center",
                    children: r.map( (t, r) => (0,
                    d.jsx)(sQ.div, {
                        className: "h-1 md:h-2 rounded-full bg-[var(--accent-primary)]",
                        animate: {
                            width: r === e ? 16 : 4,
                            opacity: r === e ? 1 : .3
                        },
                        transition: {
                            duration: .3
                        }
                    }, r))
                }), (0,
                d.jsxs)(sQ.div, {
                    className: "hidden md:flex items-center justify-center gap-3 text-sm text-[var(--text-muted)]",
                    children: [(0,
                    d.jsx)("span", {
                        children: "Tokens processed:"
                    }), (0,
                    d.jsx)(sQ.span, {
                        initial: {
                            scale: 1.5,
                            color: "var(--accent-primary)"
                        },
                        animate: {
                            scale: 1,
                            color: "var(--text-secondary)"
                        },
                        className: "font-mono font-bold",
                        children: (e + 1) * 128
                    }, e)]
                })]
            })]
        })
    }
    let oz = or("Clock", [["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }], ["polyline", {
        points: "12 6 12 12 16 14",
        key: "68esgv"
    }]])
      , oO = or("Timer", [["line", {
        x1: "10",
        x2: "14",
        y1: "2",
        y2: "2",
        key: "14vaq8"
    }], ["line", {
        x1: "12",
        x2: "15",
        y1: "14",
        y2: "11",
        key: "17fdiu"
    }], ["circle", {
        cx: "12",
        cy: "14",
        r: "8",
        key: "1e1u0o"
    }]])
      , oV = or("ChartColumn", [["path", {
        d: "M3 3v16a2 2 0 0 0 2 2h16",
        key: "c24i48"
    }], ["path", {
        d: "M18 17V9",
        key: "2bz60n"
    }], ["path", {
        d: "M13 17V5",
        key: "1frdt8"
    }], ["path", {
        d: "M8 17v-3",
        key: "17ska0"
    }]])
      , o$ = or("Globe", [["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }], ["path", {
        d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
        key: "13o1zl"
    }], ["path", {
        d: "M2 12h20",
        key: "9i4pu4"
    }]]);
    function oF({message: e, retryAfter: t, type: r, onClose: n, onRetry: i}) {
        let a, [s,o] = (0,
        p.useState)(t), [l,c] = (0,
        p.useState)(!1);
        (0,
        p.useEffect)( () => {
            if (s <= 0)
                return void c(!0);
            let e = setInterval( () => {
                o(e => {
                    let t = e - 1;
                    return t <= 0 ? (c(!0),
                    0) : t
                }
                )
            }
            , 1e3);
            return () => clearInterval(e)
        }
        , [s]);
        let u = () => {
            switch (r) {
            case "burst":
                return "from-orange-500 to-red-500";
            case "minute":
            default:
                return "from-blue-500 to-indigo-500";
            case "daily":
                return "from-purple-500 to-pink-500";
            case "global":
                return "from-red-500 to-rose-500"
            }
        }
          , h = (t - s) / t * 100;
        return (0,
        d.jsx)(s9, {
            children: (0,
            d.jsx)(sQ.div, {
                initial: {
                    opacity: 0,
                    y: 50,
                    scale: .95
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                },
                exit: {
                    opacity: 0,
                    y: 20,
                    scale: .95
                },
                className: "fixed bottom-6 right-6 z-50 w-full max-w-md",
                children: (0,
                d.jsxs)("div", {
                    className: "bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl shadow-2xl overflow-hidden",
                    children: [(0,
                    d.jsx)("div", {
                        className: "h-1 bg-[var(--bg-secondary)] relative overflow-hidden",
                        children: (0,
                        d.jsx)(sQ.div, {
                            className: `absolute inset-y-0 left-0 bg-gradient-to-r ${u()}`,
                            initial: {
                                width: "0%"
                            },
                            animate: {
                                width: `${h}%`
                            },
                            transition: {
                                duration: .3
                            }
                        })
                    }), (0,
                    d.jsx)("div", {
                        className: "p-4",
                        children: (0,
                        d.jsxs)("div", {
                            className: "flex items-start gap-3",
                            children: [(0,
                            d.jsx)("div", {
                                className: "flex-shrink-0",
                                children: (a = ( () => {
                                    switch (r) {
                                    case "burst":
                                    default:
                                        return on;
                                    case "minute":
                                        return oO;
                                    case "daily":
                                        return oV;
                                    case "global":
                                        return o$
                                    }
                                }
                                )(),
                                (0,
                                d.jsx)(a, {
                                    className: "w-6 h-6"
                                }))
                            }), (0,
                            d.jsxs)("div", {
                                className: "flex-1 min-w-0",
                                children: [(0,
                                d.jsxs)("div", {
                                    className: "flex items-start justify-between gap-2",
                                    children: [(0,
                                    d.jsx)("h3", {
                                        className: "text-sm font-semibold text-[var(--text-primary)]",
                                        children: "Rate Limit Reached"
                                    }), (0,
                                    d.jsx)("button", {
                                        onClick: n,
                                        className: "flex-shrink-0 p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors",
                                        children: (0,
                                        d.jsx)(op, {
                                            className: "w-4 h-4"
                                        })
                                    })]
                                }), (0,
                                d.jsx)("p", {
                                    className: "mt-1 text-sm text-[var(--text-secondary)]",
                                    children: e
                                }), !l && (0,
                                d.jsxs)("div", {
                                    className: "mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]",
                                    children: [(0,
                                    d.jsx)(oz, {
                                        className: "w-3.5 h-3.5"
                                    }), (0,
                                    d.jsxs)("span", {
                                        children: ["Retry in ", (0,
                                        d.jsx)("span", {
                                            className: "font-mono font-semibold text-[var(--accent-primary)]",
                                            children: function(e) {
                                                if (e < 60)
                                                    return `${e} second${1 === e ? "" : "s"}`;
                                                let t = Math.ceil(e / 60);
                                                if (t < 60)
                                                    return `${t} minute${1 === t ? "" : "s"}`;
                                                let r = Math.ceil(t / 60);
                                                return `${r} hour${1 === r ? "" : "s"}`
                                            }(s)
                                        })]
                                    })]
                                }), (0,
                                d.jsxs)("div", {
                                    className: "mt-4 flex items-center gap-2",
                                    children: [l ? (0,
                                    d.jsx)(sQ.button, {
                                        initial: {
                                            scale: .9
                                        },
                                        animate: {
                                            scale: 1
                                        },
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        whileTap: {
                                            scale: .98
                                        },
                                        onClick: i,
                                        className: `px-4 py-2 rounded-lg bg-gradient-to-r ${u()} text-white text-sm font-medium shadow-lg`,
                                        children: "Retry Now"
                                    }) : (0,
                                    d.jsx)("div", {
                                        className: "px-4 py-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-disabled)] text-sm font-medium",
                                        children: "Please Wait..."
                                    }), "daily" === r && (0,
                                    d.jsx)("button", {
                                        onClick: () => {
                                            window.location.hash = "settings",
                                            n?.()
                                        }
                                        ,
                                        className: "px-4 py-2 rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] text-sm font-medium transition-colors",
                                        children: "Add API Key"
                                    })]
                                })]
                            })]
                        })
                    }), "daily" === r && (0,
                    d.jsx)("div", {
                        className: "px-4 pb-4",
                        children: (0,
                        d.jsx)("div", {
                            className: "p-3 bg-[var(--accent-primary-subtle)] rounded-lg border border-[var(--accent-primary)]/20",
                            children: (0,
                            d.jsxs)("p", {
                                className: "text-xs text-[var(--text-secondary)]",
                                children: [(0,
                                d.jsx)("strong", {
                                    children: "Tip:"
                                }), " Add your own Gemini API key in Settings for unlimited usage and higher rate limits."]
                            })
                        })
                    })]
                })
            })
        })
    }
    let oB = ["Basic", "Simple", "Standard", "Detailed", "Complex", "Advanced", "Expert"]
      , oH = {
        type: "spring",
        stiffness: 400,
        damping: 30
    }
      , oU = {
        type: "spring",
        stiffness: 300,
        damping: 25
    };
    function oq({className: e=""}) {
        let t = (0,
        p.useRef)(null)
          , [r,n] = (0,
        p.useState)(!1)
          , [i,a] = (0,
        p.useState)(!1)
          , [s,o] = (0,
        p.useState)(!1)
          , [l,c] = (0,
        p.useState)(null)
          , {inputText: u, complexity: m, contextInjection: f, isLoading: x, error: y, setInputText: v, setComplexity: g, setContextInjection: b, convert: w, clearAll: j, jsonOutput: N, setError: k} = te();
        (0,
        p.useEffect)( () => {
            let e = () => {
                o(!!localStorage.getItem("gemini-api-key"))
            }
            ;
            return e(),
            window.addEventListener("focus", e),
            () => window.removeEventListener("focus", e)
        }
        , []),
        (0,
        p.useEffect)( () => {
            if (y)
                try {
                    let e = JSON.parse(y);
                    e.isRateLimit && c({
                        message: e.message,
                        retryAfter: e.retryAfter,
                        type: e.type
                    })
                } catch {}
        }
        , [y]);
        let S = async () => {
            if (!u.trim()) {
                a(!0),
                setTimeout( () => a(!1), 500);
                return
            }
            let e = w();
            h.toast.promise(e, {
                loading: "Converting prompt...",
                success: "Prompt converted successfully!",
                error: e => {
                    try {
                        if (JSON.parse(y || "{}").isRateLimit)
                            return null
                    } catch {}
                    return e && "object" == typeof e && "message"in e ? e.message : "Conversion failed"
                }
            }),
            await e.catch( () => {}
            )
        }
          , C = (0,
        p.useCallback)(async () => {
            u && (await navigator.clipboard.writeText(u),
            h.toast.success("Prompt copied to clipboard"))
        }
        , [u]);
        return (0,
        p.useEffect)( () => {
            t.current && (t.current.style.height = "auto")
        }
        , [u]),
        (0,
        d.jsxs)("div", {
            className: `h-full flex flex-col ${e}`,
            children: [(0,
            d.jsxs)("div", {
                className: "flex-1 flex flex-col gap-4 min-h-0 overflow-y-auto pb-2",
                children: [(0,
                d.jsxs)(sQ.div, {
                    className: "flex flex-col bg-[var(--bg-card)] border rounded-xl p-5 transition-all duration-200",
                    style: {
                        borderColor: r ? "var(--accent-primary)" : "var(--border-subtle)"
                    },
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex justify-between items-center mb-3",
                        children: [(0,
                        d.jsx)("label", {
                            className: "text-sm font-medium text-[var(--text-primary)]",
                            children: "Your Prompt"
                        }), (0,
                        d.jsx)(oI, {
                            jsonOutput: N,
                            onCopy: C,
                            onDownload: () => {}
                            ,
                            onClear: j,
                            copied: !1
                        })]
                    }), !u && (0,
                    d.jsx)(oR, {
                        onSelect: v
                    }), (0,
                    d.jsx)("textarea", {
                        ref: t,
                        value: u,
                        onChange: e => v(e.target.value),
                        onFocus: () => n(!0),
                        onBlur: () => n(!1),
                        placeholder: "Enter your prompt here...",
                        className: "w-full h-full min-h-[150px] md:min-h-[200px] p-4 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm resize-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]/20 focus:outline-none transition-all"
                    }), (0,
                    d.jsx)("div", {
                        className: "flex justify-between items-center mt-2",
                        children: (0,
                        d.jsxs)("span", {
                            className: "text-xs text-[var(--text-muted)]",
                            children: [u.length, " characters"]
                        })
                    })]
                }), (0,
                d.jsx)(oC, {
                    value: f,
                    onChange: b,
                    complexity: m
                }), (0,
                d.jsxs)("div", {
                    className: "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 md:p-5",
                    "data-tour": "complexity",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex items-center justify-between mb-2 md:mb-4",
                        children: [(0,
                        d.jsx)("label", {
                            className: "text-xs md:text-sm font-medium text-[var(--text-primary)]",
                            children: "Complexity"
                        }), (0,
                        d.jsx)("span", {
                            className: "text-xs md:text-sm font-semibold text-[var(--accent-primary)]",
                            children: oB[m - 1]
                        })]
                    }), (0,
                    d.jsx)("div", {
                        className: "flex gap-1 md:gap-2",
                        children: [1, 2, 3, 4, 5, 6, 7].map(e => (0,
                        d.jsxs)(sQ.button, {
                            onClick: () => g(e),
                            whileTap: {
                                scale: .95
                            },
                            className: `
                relative flex-1 h-8 md:h-10 rounded-md md:rounded-lg text-xs md:text-sm font-medium transition-all overflow-hidden
                ${m === e ? "bg-[var(--accent-primary)] text-white shadow-md" : "bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"}
              `,
                            children: [m === e && (0,
                            d.jsx)(sQ.div, {
                                layoutId: "complexityIndicator",
                                className: "absolute inset-0 bg-[var(--accent-primary)] rounded-md md:rounded-lg",
                                transition: oH
                            }), (0,
                            d.jsx)("span", {
                                className: "relative z-10",
                                children: e
                            })]
                        }, e))
                    }), (0,
                    d.jsx)("div", {
                        className: "hidden md:block mt-3 h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden",
                        children: (0,
                        d.jsx)(sQ.div, {
                            className: "h-full bg-[var(--accent-primary)] rounded-full",
                            initial: {
                                width: "14.28%"
                            },
                            animate: {
                                width: `${m / 7 * 100}%`
                            },
                            transition: oU
                        })
                    })]
                }), (0,
                d.jsx)(s9, {
                    children: x && (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0,
                            height: 0
                        },
                        animate: {
                            opacity: 1,
                            height: "auto"
                        },
                        exit: {
                            opacity: 0,
                            height: 0
                        },
                        className: "md:hidden overflow-hidden",
                        children: (0,
                        d.jsx)(oL, {})
                    })
                })]
            }), (0,
            d.jsx)("div", {
                className: "pt-4 flex-shrink-0",
                children: (0,
                d.jsxs)(sQ.button, {
                    onClick: S,
                    disabled: !u.trim() || x,
                    whileHover: !u.trim() || x ? {} : {
                        scale: 1.02
                    },
                    whileTap: !u.trim() || x ? {} : {
                        scale: .98
                    },
                    animate: i ? {
                        x: [-10, 10, -10, 10, 0]
                    } : {},
                    transition: i ? {
                        duration: .4
                    } : oU,
                    "data-tour": "convert-btn",
                    className: "relative h-12 flex items-center justify-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl overflow-hidden w-full shadow-lg transition-all",
                    children: [(0,
                    d.jsx)(sQ.div, {
                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                        initial: {
                            x: "-100%"
                        },
                        whileHover: {
                            x: "100%"
                        },
                        transition: {
                            duration: .6
                        }
                    }), (0,
                    d.jsx)(s9, {
                        mode: "wait",
                        children: x ? (0,
                        d.jsxs)(sQ.span, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "flex items-center gap-3 relative z-10",
                            children: [(0,
                            d.jsxs)("span", {
                                className: "relative flex items-center gap-1",
                                children: [(0,
                                d.jsx)(sQ.span, {
                                    animate: {
                                        x: [-2, 0],
                                        opacity: [.5, 1]
                                    },
                                    transition: {
                                        duration: .6,
                                        repeat: 1 / 0,
                                        repeatType: "reverse"
                                    },
                                    className: "text-lg font-mono",
                                    children: "{"
                                }), (0,
                                d.jsx)(sQ.span, {
                                    animate: {
                                        scale: [.8, 1.2, .8]
                                    },
                                    transition: {
                                        duration: 1,
                                        repeat: 1 / 0
                                    },
                                    className: "w-1.5 h-1.5 bg-current rounded-full"
                                }), (0,
                                d.jsx)(sQ.span, {
                                    animate: {
                                        scale: [.8, 1.2, .8]
                                    },
                                    transition: {
                                        duration: 1,
                                        repeat: 1 / 0,
                                        delay: .2
                                    },
                                    className: "w-1.5 h-1.5 bg-current rounded-full"
                                }), (0,
                                d.jsx)(sQ.span, {
                                    animate: {
                                        scale: [.8, 1.2, .8]
                                    },
                                    transition: {
                                        duration: 1,
                                        repeat: 1 / 0,
                                        delay: .4
                                    },
                                    className: "w-1.5 h-1.5 bg-current rounded-full"
                                }), (0,
                                d.jsx)(sQ.span, {
                                    animate: {
                                        x: [0, 2],
                                        opacity: [1, .5]
                                    },
                                    transition: {
                                        duration: .6,
                                        repeat: 1 / 0,
                                        repeatType: "reverse"
                                    },
                                    className: "text-lg font-mono",
                                    children: "}"
                                })]
                            }), "Converting to JSON..."]
                        }, "loading") : (0,
                        d.jsxs)(sQ.span, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "flex items-center gap-2 relative z-10",
                            children: [(0,
                            d.jsx)(oN, {
                                className: "w-5 h-5"
                            }), "Convert Prompt", s && (0,
                            d.jsx)(sQ.span, {
                                initial: {
                                    scale: 0
                                },
                                animate: {
                                    scale: 1
                                },
                                className: "ml-1 px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-semibold uppercase tracking-wide",
                                children: "Custom Key"
                            })]
                        }, "convert")
                    })]
                })
            }), l && (0,
            d.jsx)(oF, {
                message: l.message,
                retryAfter: l.retryAfter,
                type: l.type,
                onClose: () => {
                    c(null),
                    k(null)
                }
                ,
                onRetry: S
            })]
        })
    }
    let oW = or("Code", [["polyline", {
        points: "16 18 22 12 16 6",
        key: "z7tu5w"
    }], ["polyline", {
        points: "8 6 2 12 8 18",
        key: "1eg1df"
    }]])
      , oY = or("GitCompare", [["circle", {
        cx: "18",
        cy: "18",
        r: "3",
        key: "1xkwt0"
    }], ["circle", {
        cx: "6",
        cy: "6",
        r: "3",
        key: "1lh9wr"
    }], ["path", {
        d: "M13 6h3a2 2 0 0 1 2 2v7",
        key: "1yeb86"
    }], ["path", {
        d: "M11 18H8a2 2 0 0 1-2-2V9",
        key: "19pyzm"
    }]])
      , oG = or("CircleHelp", [["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }], ["path", {
        d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
        key: "1u773s"
    }], ["path", {
        d: "M12 17h.01",
        key: "p32p05"
    }]])
      , oX = or("PenLine", [["path", {
        d: "M12 20h9",
        key: "t2du7b"
    }], ["path", {
        d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
        key: "1ykcvy"
    }]])
      , oJ = or("Maximize2", [["polyline", {
        points: "15 3 21 3 21 9",
        key: "mznyad"
    }], ["polyline", {
        points: "9 21 3 21 3 15",
        key: "1avn1i"
    }], ["line", {
        x1: "21",
        x2: "14",
        y1: "3",
        y2: "10",
        key: "ota7mn"
    }], ["line", {
        x1: "3",
        x2: "10",
        y1: "21",
        y2: "14",
        key: "1atl0r"
    }]])
      , oK = or("Hand", [["path", {
        d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
        key: "1fvzgz"
    }], ["path", {
        d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
        key: "1kc0my"
    }], ["path", {
        d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
        key: "10h0bg"
    }], ["path", {
        d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
        key: "1s1gnw"
    }]])
      , oZ = or("Pointer", [["path", {
        d: "M22 14a8 8 0 0 1-8 8",
        key: "56vcr3"
    }], ["path", {
        d: "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
        key: "1agjmk"
    }], ["path", {
        d: "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1",
        key: "wdbh2u"
    }], ["path", {
        d: "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10",
        key: "1ibuk9"
    }], ["path", {
        d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
        key: "g6ys72"
    }]])
      , oQ = or("Network", [["rect", {
        x: "16",
        y: "16",
        width: "6",
        height: "6",
        rx: "1",
        key: "4q2zg0"
    }], ["rect", {
        x: "2",
        y: "16",
        width: "6",
        height: "6",
        rx: "1",
        key: "8cvhb9"
    }], ["rect", {
        x: "9",
        y: "2",
        width: "6",
        height: "6",
        rx: "1",
        key: "1egb70"
    }], ["path", {
        d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
        key: "1jsf9p"
    }], ["path", {
        d: "M12 12V8",
        key: "2874zd"
    }]])
      , o0 = or("Circle", [["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }]])
      , o1 = or("GitBranch", [["line", {
        x1: "6",
        x2: "6",
        y1: "3",
        y2: "15",
        key: "17qcm7"
    }], ["circle", {
        cx: "18",
        cy: "6",
        r: "3",
        key: "1h7g24"
    }], ["circle", {
        cx: "6",
        cy: "18",
        r: "3",
        key: "fqmcym"
    }], ["path", {
        d: "M18 9a9 9 0 0 1-9 9",
        key: "n2h4wq"
    }]])
      , o2 = or("Boxes", [["path", {
        d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
        key: "lc1i9w"
    }], ["path", {
        d: "m7 16.5-4.74-2.85",
        key: "1o9zyk"
    }], ["path", {
        d: "m7 16.5 5-3",
        key: "va8pkn"
    }], ["path", {
        d: "M7 16.5v5.17",
        key: "jnp8gn"
    }], ["path", {
        d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
        key: "8zsnat"
    }], ["path", {
        d: "m17 16.5-5-3",
        key: "8arw3v"
    }], ["path", {
        d: "m17 16.5 4.74-2.85",
        key: "8rfmw"
    }], ["path", {
        d: "M17 16.5v5.17",
        key: "k6z78m"
    }], ["path", {
        d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
        key: "1xygjf"
    }], ["path", {
        d: "M12 8 7.26 5.15",
        key: "1vbdud"
    }], ["path", {
        d: "m12 8 4.74-2.85",
        key: "3rx089"
    }], ["path", {
        d: "M12 13.5V8",
        key: "1io7kd"
    }]]);
    var o5 = {
        value: () => {}
    };
    function o4() {
        for (var e, t = 0, r = arguments.length, n = {}; t < r; ++t) {
            if (!(e = arguments[t] + "") || e in n || /[\s.]/.test(e))
                throw Error("illegal type: " + e);
            n[e] = []
        }
        return new o3(n)
    }
    function o3(e) {
        this._ = e
    }
    function o6(e, t, r) {
        for (var n = 0, i = e.length; n < i; ++n)
            if (e[n].name === t) {
                e[n] = o5,
                e = e.slice(0, n).concat(e.slice(n + 1));
                break
            }
        return null != r && e.push({
            name: t,
            value: r
        }),
        e
    }
    function o8() {}
    function o9(e) {
        return null == e ? o8 : function() {
            return this.querySelector(e)
        }
    }
    function o7() {
        return []
    }
    function le(e) {
        return null == e ? o7 : function() {
            return this.querySelectorAll(e)
        }
    }
    function lt(e) {
        return function() {
            return this.matches(e)
        }
    }
    function lr(e) {
        return function(t) {
            return t.matches(e)
        }
    }
    o3.prototype = o4.prototype = {
        constructor: o3,
        on: function(e, t) {
            var r, n = this._, i = (e + "").trim().split(/^|\s+/).map(function(e) {
                var t = ""
                  , r = e.indexOf(".");
                if (r >= 0 && (t = e.slice(r + 1),
                e = e.slice(0, r)),
                e && !n.hasOwnProperty(e))
                    throw Error("unknown type: " + e);
                return {
                    type: e,
                    name: t
                }
            }), a = -1, s = i.length;
            if (arguments.length < 2) {
                for (; ++a < s; )
                    if ((r = (e = i[a]).type) && (r = function(e, t) {
                        for (var r, n = 0, i = e.length; n < i; ++n)
                            if ((r = e[n]).name === t)
                                return r.value
                    }(n[r], e.name)))
                        return r;
                return
            }
            if (null != t && "function" != typeof t)
                throw Error("invalid callback: " + t);
            for (; ++a < s; )
                if (r = (e = i[a]).type)
                    n[r] = o6(n[r], e.name, t);
                else if (null == t)
                    for (r in n)
                        n[r] = o6(n[r], e.name, null);
            return this
        },
        copy: function() {
            var e = {}
              , t = this._;
            for (var r in t)
                e[r] = t[r].slice();
            return new o3(e)
        },
        call: function(e, t) {
            if ((r = arguments.length - 2) > 0)
                for (var r, n, i = Array(r), a = 0; a < r; ++a)
                    i[a] = arguments[a + 2];
            if (!this._.hasOwnProperty(e))
                throw Error("unknown type: " + e);
            for (n = this._[e],
            a = 0,
            r = n.length; a < r; ++a)
                n[a].value.apply(t, i)
        },
        apply: function(e, t, r) {
            if (!this._.hasOwnProperty(e))
                throw Error("unknown type: " + e);
            for (var n = this._[e], i = 0, a = n.length; i < a; ++i)
                n[i].value.apply(t, r)
        }
    };
    var ln = Array.prototype.find;
    function li() {
        return this.firstElementChild
    }
    var la = Array.prototype.filter;
    function ls() {
        return Array.from(this.children)
    }
    function lo(e) {
        return Array(e.length)
    }
    function ll(e, t) {
        this.ownerDocument = e.ownerDocument,
        this.namespaceURI = e.namespaceURI,
        this._next = null,
        this._parent = e,
        this.__data__ = t
    }
    function lc(e, t, r, n, i, a) {
        for (var s, o = 0, l = t.length, c = a.length; o < c; ++o)
            (s = t[o]) ? (s.__data__ = a[o],
            n[o] = s) : r[o] = new ll(e,a[o]);
        for (; o < l; ++o)
            (s = t[o]) && (i[o] = s)
    }
    function lu(e, t, r, n, i, a, s) {
        var o, l, c, u = new Map, d = t.length, h = a.length, p = Array(d);
        for (o = 0; o < d; ++o)
            (l = t[o]) && (p[o] = c = s.call(l, l.__data__, o, t) + "",
            u.has(c) ? i[o] = l : u.set(c, l));
        for (o = 0; o < h; ++o)
            c = s.call(e, a[o], o, a) + "",
            (l = u.get(c)) ? (n[o] = l,
            l.__data__ = a[o],
            u.delete(c)) : r[o] = new ll(e,a[o]);
        for (o = 0; o < d; ++o)
            (l = t[o]) && u.get(p[o]) === l && (i[o] = l)
    }
    function ld(e) {
        return e.__data__
    }
    function lh(e, t) {
        return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
    }
    ll.prototype = {
        constructor: ll,
        appendChild: function(e) {
            return this._parent.insertBefore(e, this._next)
        },
        insertBefore: function(e, t) {
            return this._parent.insertBefore(e, t)
        },
        querySelector: function(e) {
            return this._parent.querySelector(e)
        },
        querySelectorAll: function(e) {
            return this._parent.querySelectorAll(e)
        }
    };
    var lp = "http://www.w3.org/1999/xhtml";
    let lm = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: lp,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    function lf(e) {
        var t = e += ""
          , r = t.indexOf(":");
        return r >= 0 && "xmlns" !== (t = e.slice(0, r)) && (e = e.slice(r + 1)),
        lm.hasOwnProperty(t) ? {
            space: lm[t],
            local: e
        } : e
    }
    function lx(e) {
        return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView
    }
    function ly(e, t) {
        return e.style.getPropertyValue(t) || lx(e).getComputedStyle(e, null).getPropertyValue(t)
    }
    function lv(e) {
        return e.trim().split(/^|\s+/)
    }
    function lg(e) {
        return e.classList || new lb(e)
    }
    function lb(e) {
        this._node = e,
        this._names = lv(e.getAttribute("class") || "")
    }
    function lw(e, t) {
        for (var r = lg(e), n = -1, i = t.length; ++n < i; )
            r.add(t[n])
    }
    function lj(e, t) {
        for (var r = lg(e), n = -1, i = t.length; ++n < i; )
            r.remove(t[n])
    }
    function lN() {
        this.textContent = ""
    }
    function lk() {
        this.innerHTML = ""
    }
    function lS() {
        this.nextSibling && this.parentNode.appendChild(this)
    }
    function lC() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }
    function lM(e) {
        var t = lf(e);
        return (t.local ? function(e) {
            return function() {
                return this.ownerDocument.createElementNS(e.space, e.local)
            }
        }
        : function(e) {
            return function() {
                var t = this.ownerDocument
                  , r = this.namespaceURI;
                return r === lp && t.documentElement.namespaceURI === lp ? t.createElement(e) : t.createElementNS(r, e)
            }
        }
        )(t)
    }
    function lA() {
        return null
    }
    function lT() {
        var e = this.parentNode;
        e && e.removeChild(this)
    }
    function lP() {
        var e = this.cloneNode(!1)
          , t = this.parentNode;
        return t ? t.insertBefore(e, this.nextSibling) : e
    }
    function l_() {
        var e = this.cloneNode(!0)
          , t = this.parentNode;
        return t ? t.insertBefore(e, this.nextSibling) : e
    }
    function lE(e) {
        return function() {
            var t = this.__on;
            if (t) {
                for (var r, n = 0, i = -1, a = t.length; n < a; ++n)
                    (r = t[n],
                    e.type && r.type !== e.type || r.name !== e.name) ? t[++i] = r : this.removeEventListener(r.type, r.listener, r.options);
                ++i ? t.length = i : delete this.__on
            }
        }
    }
    function lI(e, t, r) {
        return function() {
            var n, i = this.__on, a = function(e) {
                t.call(this, e, this.__data__)
            };
            if (i) {
                for (var s = 0, o = i.length; s < o; ++s)
                    if ((n = i[s]).type === e.type && n.name === e.name) {
                        this.removeEventListener(n.type, n.listener, n.options),
                        this.addEventListener(n.type, n.listener = a, n.options = r),
                        n.value = t;
                        return
                    }
            }
            this.addEventListener(e.type, a, r),
            n = {
                type: e.type,
                name: e.name,
                value: t,
                listener: a,
                options: r
            },
            i ? i.push(n) : this.__on = [n]
        }
    }
    function lD(e, t, r) {
        var n = lx(e)
          , i = n.CustomEvent;
        "function" == typeof i ? i = new i(t,r) : (i = n.document.createEvent("Event"),
        r ? (i.initEvent(t, r.bubbles, r.cancelable),
        i.detail = r.detail) : i.initEvent(t, !1, !1)),
        e.dispatchEvent(i)
    }
    lb.prototype = {
        add: function(e) {
            0 > this._names.indexOf(e) && (this._names.push(e),
            this._node.setAttribute("class", this._names.join(" ")))
        },
        remove: function(e) {
            var t = this._names.indexOf(e);
            t >= 0 && (this._names.splice(t, 1),
            this._node.setAttribute("class", this._names.join(" ")))
        },
        contains: function(e) {
            return this._names.indexOf(e) >= 0
        }
    };
    var lR = [null];
    function lL(e, t) {
        this._groups = e,
        this._parents = t
    }
    function lz() {
        return new lL([[document.documentElement]],lR)
    }
    function lO(e) {
        return "string" == typeof e ? new lL([[document.querySelector(e)]],[document.documentElement]) : new lL([[e]],lR)
    }
    lL.prototype = lz.prototype = {
        constructor: lL,
        select: function(e) {
            "function" != typeof e && (e = o9(e));
            for (var t = this._groups, r = t.length, n = Array(r), i = 0; i < r; ++i)
                for (var a, s, o = t[i], l = o.length, c = n[i] = Array(l), u = 0; u < l; ++u)
                    (a = o[u]) && (s = e.call(a, a.__data__, u, o)) && ("__data__"in a && (s.__data__ = a.__data__),
                    c[u] = s);
            return new lL(n,this._parents)
        },
        selectAll: function(e) {
            if ("function" == typeof e) {
                var t;
                t = e,
                e = function() {
                    var e;
                    return e = t.apply(this, arguments),
                    null == e ? [] : Array.isArray(e) ? e : Array.from(e)
                }
            } else
                e = le(e);
            for (var r = this._groups, n = r.length, i = [], a = [], s = 0; s < n; ++s)
                for (var o, l = r[s], c = l.length, u = 0; u < c; ++u)
                    (o = l[u]) && (i.push(e.call(o, o.__data__, u, l)),
                    a.push(o));
            return new lL(i,a)
        },
        selectChild: function(e) {
            var t;
            return this.select(null == e ? li : (t = "function" == typeof e ? e : lr(e),
            function() {
                return ln.call(this.children, t)
            }
            ))
        },
        selectChildren: function(e) {
            var t;
            return this.selectAll(null == e ? ls : (t = "function" == typeof e ? e : lr(e),
            function() {
                return la.call(this.children, t)
            }
            ))
        },
        filter: function(e) {
            "function" != typeof e && (e = lt(e));
            for (var t = this._groups, r = t.length, n = Array(r), i = 0; i < r; ++i)
                for (var a, s = t[i], o = s.length, l = n[i] = [], c = 0; c < o; ++c)
                    (a = s[c]) && e.call(a, a.__data__, c, s) && l.push(a);
            return new lL(n,this._parents)
        },
        data: function(e, t) {
            if (!arguments.length)
                return Array.from(this, ld);
            var r = t ? lu : lc
              , n = this._parents
              , i = this._groups;
            "function" != typeof e && (v = e,
            e = function() {
                return v
            }
            );
            for (var a = i.length, s = Array(a), o = Array(a), l = Array(a), c = 0; c < a; ++c) {
                var u = n[c]
                  , d = i[c]
                  , h = d.length
                  , p = "object" == typeof (y = e.call(u, u && u.__data__, c, n)) && "length"in y ? y : Array.from(y)
                  , m = p.length
                  , f = o[c] = Array(m)
                  , x = s[c] = Array(m);
                r(u, d, f, x, l[c] = Array(h), p, t);
                for (var y, v, g, b, w = 0, j = 0; w < m; ++w)
                    if (g = f[w]) {
                        for (w >= j && (j = w + 1); !(b = x[j]) && ++j < m; )
                            ;
                        g._next = b || null
                    }
            }
            return (s = new lL(s,n))._enter = o,
            s._exit = l,
            s
        },
        enter: function() {
            return new lL(this._enter || this._groups.map(lo),this._parents)
        },
        exit: function() {
            return new lL(this._exit || this._groups.map(lo),this._parents)
        },
        join: function(e, t, r) {
            var n = this.enter()
              , i = this
              , a = this.exit();
            return "function" == typeof e ? (n = e(n)) && (n = n.selection()) : n = n.append(e + ""),
            null != t && (i = t(i)) && (i = i.selection()),
            null == r ? a.remove() : r(a),
            n && i ? n.merge(i).order() : i
        },
        merge: function(e) {
            for (var t = e.selection ? e.selection() : e, r = this._groups, n = t._groups, i = r.length, a = n.length, s = Math.min(i, a), o = Array(i), l = 0; l < s; ++l)
                for (var c, u = r[l], d = n[l], h = u.length, p = o[l] = Array(h), m = 0; m < h; ++m)
                    (c = u[m] || d[m]) && (p[m] = c);
            for (; l < i; ++l)
                o[l] = r[l];
            return new lL(o,this._parents)
        },
        selection: function() {
            return this
        },
        order: function() {
            for (var e = this._groups, t = -1, r = e.length; ++t < r; )
                for (var n, i = e[t], a = i.length - 1, s = i[a]; --a >= 0; )
                    (n = i[a]) && (s && 4 ^ n.compareDocumentPosition(s) && s.parentNode.insertBefore(n, s),
                    s = n);
            return this
        },
        sort: function(e) {
            function t(t, r) {
                return t && r ? e(t.__data__, r.__data__) : !t - !r
            }
            e || (e = lh);
            for (var r = this._groups, n = r.length, i = Array(n), a = 0; a < n; ++a) {
                for (var s, o = r[a], l = o.length, c = i[a] = Array(l), u = 0; u < l; ++u)
                    (s = o[u]) && (c[u] = s);
                c.sort(t)
            }
            return new lL(i,this._parents).order()
        },
        call: function() {
            var e = arguments[0];
            return arguments[0] = this,
            e.apply(null, arguments),
            this
        },
        nodes: function() {
            return Array.from(this)
        },
        node: function() {
            for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
                for (var n = e[t], i = 0, a = n.length; i < a; ++i) {
                    var s = n[i];
                    if (s)
                        return s
                }
            return null
        },
        size: function() {
            let e = 0;
            for (let t of this)
                ++e;
            return e
        },
        empty: function() {
            return !this.node()
        },
        each: function(e) {
            for (var t = this._groups, r = 0, n = t.length; r < n; ++r)
                for (var i, a = t[r], s = 0, o = a.length; s < o; ++s)
                    (i = a[s]) && e.call(i, i.__data__, s, a);
            return this
        },
        attr: function(e, t) {
            var r = lf(e);
            if (arguments.length < 2) {
                var n = this.node();
                return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r)
            }
            return this.each((null == t ? r.local ? function(e) {
                return function() {
                    this.removeAttributeNS(e.space, e.local)
                }
            }
            : function(e) {
                return function() {
                    this.removeAttribute(e)
                }
            }
            : "function" == typeof t ? r.local ? function(e, t) {
                return function() {
                    var r = t.apply(this, arguments);
                    null == r ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r)
                }
            }
            : function(e, t) {
                return function() {
                    var r = t.apply(this, arguments);
                    null == r ? this.removeAttribute(e) : this.setAttribute(e, r)
                }
            }
            : r.local ? function(e, t) {
                return function() {
                    this.setAttributeNS(e.space, e.local, t)
                }
            }
            : function(e, t) {
                return function() {
                    this.setAttribute(e, t)
                }
            }
            )(r, t))
        },
        style: function(e, t, r) {
            return arguments.length > 1 ? this.each((null == t ? function(e) {
                return function() {
                    this.style.removeProperty(e)
                }
            }
            : "function" == typeof t ? function(e, t, r) {
                return function() {
                    var n = t.apply(this, arguments);
                    null == n ? this.style.removeProperty(e) : this.style.setProperty(e, n, r)
                }
            }
            : function(e, t, r) {
                return function() {
                    this.style.setProperty(e, t, r)
                }
            }
            )(e, t, null == r ? "" : r)) : ly(this.node(), e)
        },
        property: function(e, t) {
            return arguments.length > 1 ? this.each((null == t ? function(e) {
                return function() {
                    delete this[e]
                }
            }
            : "function" == typeof t ? function(e, t) {
                return function() {
                    var r = t.apply(this, arguments);
                    null == r ? delete this[e] : this[e] = r
                }
            }
            : function(e, t) {
                return function() {
                    this[e] = t
                }
            }
            )(e, t)) : this.node()[e]
        },
        classed: function(e, t) {
            var r = lv(e + "");
            if (arguments.length < 2) {
                for (var n = lg(this.node()), i = -1, a = r.length; ++i < a; )
                    if (!n.contains(r[i]))
                        return !1;
                return !0
            }
            return this.each(("function" == typeof t ? function(e, t) {
                return function() {
                    (t.apply(this, arguments) ? lw : lj)(this, e)
                }
            }
            : t ? function(e) {
                return function() {
                    lw(this, e)
                }
            }
            : function(e) {
                return function() {
                    lj(this, e)
                }
            }
            )(r, t))
        },
        text: function(e) {
            return arguments.length ? this.each(null == e ? lN : ("function" == typeof e ? function(e) {
                return function() {
                    var t = e.apply(this, arguments);
                    this.textContent = null == t ? "" : t
                }
            }
            : function(e) {
                return function() {
                    this.textContent = e
                }
            }
            )(e)) : this.node().textContent
        },
        html: function(e) {
            return arguments.length ? this.each(null == e ? lk : ("function" == typeof e ? function(e) {
                return function() {
                    var t = e.apply(this, arguments);
                    this.innerHTML = null == t ? "" : t
                }
            }
            : function(e) {
                return function() {
                    this.innerHTML = e
                }
            }
            )(e)) : this.node().innerHTML
        },
        raise: function() {
            return this.each(lS)
        },
        lower: function() {
            return this.each(lC)
        },
        append: function(e) {
            var t = "function" == typeof e ? e : lM(e);
            return this.select(function() {
                return this.appendChild(t.apply(this, arguments))
            })
        },
        insert: function(e, t) {
            var r = "function" == typeof e ? e : lM(e)
              , n = null == t ? lA : "function" == typeof t ? t : o9(t);
            return this.select(function() {
                return this.insertBefore(r.apply(this, arguments), n.apply(this, arguments) || null)
            })
        },
        remove: function() {
            return this.each(lT)
        },
        clone: function(e) {
            return this.select(e ? l_ : lP)
        },
        datum: function(e) {
            return arguments.length ? this.property("__data__", e) : this.node().__data__
        },
        on: function(e, t, r) {
            var n, i, a = (e + "").trim().split(/^|\s+/).map(function(e) {
                var t = ""
                  , r = e.indexOf(".");
                return r >= 0 && (t = e.slice(r + 1),
                e = e.slice(0, r)),
                {
                    type: e,
                    name: t
                }
            }), s = a.length;
            if (arguments.length < 2) {
                var o = this.node().__on;
                if (o) {
                    for (var l, c = 0, u = o.length; c < u; ++c)
                        for (n = 0,
                        l = o[c]; n < s; ++n)
                            if ((i = a[n]).type === l.type && i.name === l.name)
                                return l.value
                }
                return
            }
            for (n = 0,
            o = t ? lI : lE; n < s; ++n)
                this.each(o(a[n], t, r));
            return this
        },
        dispatch: function(e, t) {
            return this.each(("function" == typeof t ? function(e, t) {
                return function() {
                    return lD(this, e, t.apply(this, arguments))
                }
            }
            : function(e, t) {
                return function() {
                    return lD(this, e, t)
                }
            }
            )(e, t))
        },
        [Symbol.iterator]: function*() {
            for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
                for (var n, i = e[t], a = 0, s = i.length; a < s; ++a)
                    (n = i[a]) && (yield n)
        }
    };
    let lV = {
        passive: !1
    }
      , l$ = {
        capture: !0,
        passive: !1
    };
    function lF(e) {
        e.stopImmediatePropagation()
    }
    function lB(e) {
        e.preventDefault(),
        e.stopImmediatePropagation()
    }
    function lH(e) {
        var t = e.document.documentElement
          , r = lO(e).on("dragstart.drag", lB, l$);
        "onselectstart"in t ? r.on("selectstart.drag", lB, l$) : (t.__noselect = t.style.MozUserSelect,
        t.style.MozUserSelect = "none")
    }
    function lU(e, t) {
        var r = e.document.documentElement
          , n = lO(e).on("dragstart.drag", null);
        t && (n.on("click.drag", lB, l$),
        setTimeout(function() {
            n.on("click.drag", null)
        }, 0)),
        "onselectstart"in r ? n.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect,
        delete r.__noselect)
    }
    function lq(e, t, r) {
        e.prototype = t.prototype = r,
        r.constructor = e
    }
    function lW(e, t) {
        var r = Object.create(e.prototype);
        for (var n in t)
            r[n] = t[n];
        return r
    }
    function lY() {}
    var lG = "\\s*([+-]?\\d+)\\s*"
      , lX = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*"
      , lJ = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*"
      , lK = /^#([0-9a-f]{3,8})$/
      , lZ = RegExp(`^rgb\\(${lG},${lG},${lG}\\)$`)
      , lQ = RegExp(`^rgb\\(${lJ},${lJ},${lJ}\\)$`)
      , l0 = RegExp(`^rgba\\(${lG},${lG},${lG},${lX}\\)$`)
      , l1 = RegExp(`^rgba\\(${lJ},${lJ},${lJ},${lX}\\)$`)
      , l2 = RegExp(`^hsl\\(${lX},${lJ},${lJ}\\)$`)
      , l5 = RegExp(`^hsla\\(${lX},${lJ},${lJ},${lX}\\)$`)
      , l4 = {
        aliceblue: 0xf0f8ff,
        antiquewhite: 0xfaebd7,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 0xf0ffff,
        beige: 0xf5f5dc,
        bisque: 0xffe4c4,
        black: 0,
        blanchedalmond: 0xffebcd,
        blue: 255,
        blueviolet: 9055202,
        brown: 0xa52a2a,
        burlywood: 0xdeb887,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 0xd2691e,
        coral: 0xff7f50,
        cornflowerblue: 6591981,
        cornsilk: 0xfff8dc,
        crimson: 0xdc143c,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 0xb8860b,
        darkgray: 0xa9a9a9,
        darkgreen: 25600,
        darkgrey: 0xa9a9a9,
        darkkhaki: 0xbdb76b,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 0xff8c00,
        darkorchid: 0x9932cc,
        darkred: 9109504,
        darksalmon: 0xe9967a,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 0xff1493,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 0xb22222,
        floralwhite: 0xfffaf0,
        forestgreen: 2263842,
        fuchsia: 0xff00ff,
        gainsboro: 0xdcdcdc,
        ghostwhite: 0xf8f8ff,
        gold: 0xffd700,
        goldenrod: 0xdaa520,
        gray: 8421504,
        green: 32768,
        greenyellow: 0xadff2f,
        grey: 8421504,
        honeydew: 0xf0fff0,
        hotpink: 0xff69b4,
        indianred: 0xcd5c5c,
        indigo: 4915330,
        ivory: 0xfffff0,
        khaki: 0xf0e68c,
        lavender: 0xe6e6fa,
        lavenderblush: 0xfff0f5,
        lawngreen: 8190976,
        lemonchiffon: 0xfffacd,
        lightblue: 0xadd8e6,
        lightcoral: 0xf08080,
        lightcyan: 0xe0ffff,
        lightgoldenrodyellow: 0xfafad2,
        lightgray: 0xd3d3d3,
        lightgreen: 9498256,
        lightgrey: 0xd3d3d3,
        lightpink: 0xffb6c1,
        lightsalmon: 0xffa07a,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 0xb0c4de,
        lightyellow: 0xffffe0,
        lime: 65280,
        limegreen: 3329330,
        linen: 0xfaf0e6,
        magenta: 0xff00ff,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 0xba55d3,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 0xc71585,
        midnightblue: 1644912,
        mintcream: 0xf5fffa,
        mistyrose: 0xffe4e1,
        moccasin: 0xffe4b5,
        navajowhite: 0xffdead,
        navy: 128,
        oldlace: 0xfdf5e6,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 0xffa500,
        orangered: 0xff4500,
        orchid: 0xda70d6,
        palegoldenrod: 0xeee8aa,
        palegreen: 0x98fb98,
        paleturquoise: 0xafeeee,
        palevioletred: 0xdb7093,
        papayawhip: 0xffefd5,
        peachpuff: 0xffdab9,
        peru: 0xcd853f,
        pink: 0xffc0cb,
        plum: 0xdda0dd,
        powderblue: 0xb0e0e6,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 0xff0000,
        rosybrown: 0xbc8f8f,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 0xfa8072,
        sandybrown: 0xf4a460,
        seagreen: 3050327,
        seashell: 0xfff5ee,
        sienna: 0xa0522d,
        silver: 0xc0c0c0,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 0xfffafa,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 0xd2b48c,
        teal: 32896,
        thistle: 0xd8bfd8,
        tomato: 0xff6347,
        turquoise: 4251856,
        violet: 0xee82ee,
        wheat: 0xf5deb3,
        white: 0xffffff,
        whitesmoke: 0xf5f5f5,
        yellow: 0xffff00,
        yellowgreen: 0x9acd32
    };
    function l3() {
        return this.rgb().formatHex()
    }
    function l6() {
        return this.rgb().formatRgb()
    }
    function l8(e) {
        var t, r;
        return e = (e + "").trim().toLowerCase(),
        (t = lK.exec(e)) ? (r = t[1].length,
        t = parseInt(t[1], 16),
        6 === r ? l9(t) : 3 === r ? new ct(t >> 8 & 15 | t >> 4 & 240,t >> 4 & 15 | 240 & t,(15 & t) << 4 | 15 & t,1) : 8 === r ? l7(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (255 & t) / 255) : 4 === r ? l7(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, ((15 & t) << 4 | 15 & t) / 255) : null) : (t = lZ.exec(e)) ? new ct(t[1],t[2],t[3],1) : (t = lQ.exec(e)) ? new ct(255 * t[1] / 100,255 * t[2] / 100,255 * t[3] / 100,1) : (t = l0.exec(e)) ? l7(t[1], t[2], t[3], t[4]) : (t = l1.exec(e)) ? l7(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = l2.exec(e)) ? co(t[1], t[2] / 100, t[3] / 100, 1) : (t = l5.exec(e)) ? co(t[1], t[2] / 100, t[3] / 100, t[4]) : l4.hasOwnProperty(e) ? l9(l4[e]) : "transparent" === e ? new ct(NaN,NaN,NaN,0) : null
    }
    function l9(e) {
        return new ct(e >> 16 & 255,e >> 8 & 255,255 & e,1)
    }
    function l7(e, t, r, n) {
        return n <= 0 && (e = t = r = NaN),
        new ct(e,t,r,n)
    }
    function ce(e, t, r, n) {
        var i;
        return 1 == arguments.length ? ((i = e)instanceof lY || (i = l8(i)),
        i) ? new ct((i = i.rgb()).r,i.g,i.b,i.opacity) : new ct : new ct(e,t,r,null == n ? 1 : n)
    }
    function ct(e, t, r, n) {
        this.r = +e,
        this.g = +t,
        this.b = +r,
        this.opacity = +n
    }
    function cr() {
        return `#${cs(this.r)}${cs(this.g)}${cs(this.b)}`
    }
    function cn() {
        let e = ci(this.opacity);
        return `${1 === e ? "rgb(" : "rgba("}${ca(this.r)}, ${ca(this.g)}, ${ca(this.b)}${1 === e ? ")" : `, ${e})`}`
    }
    function ci(e) {
        return isNaN(e) ? 1 : Math.max(0, Math.min(1, e))
    }
    function ca(e) {
        return Math.max(0, Math.min(255, Math.round(e) || 0))
    }
    function cs(e) {
        return ((e = ca(e)) < 16 ? "0" : "") + e.toString(16)
    }
    function co(e, t, r, n) {
        return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN),
        new cc(e,t,r,n)
    }
    function cl(e) {
        if (e instanceof cc)
            return new cc(e.h,e.s,e.l,e.opacity);
        if (e instanceof lY || (e = l8(e)),
        !e)
            return new cc;
        if (e instanceof cc)
            return e;
        var t = (e = e.rgb()).r / 255
          , r = e.g / 255
          , n = e.b / 255
          , i = Math.min(t, r, n)
          , a = Math.max(t, r, n)
          , s = NaN
          , o = a - i
          , l = (a + i) / 2;
        return o ? (s = t === a ? (r - n) / o + (r < n) * 6 : r === a ? (n - t) / o + 2 : (t - r) / o + 4,
        o /= l < .5 ? a + i : 2 - a - i,
        s *= 60) : o = l > 0 && l < 1 ? 0 : s,
        new cc(s,o,l,e.opacity)
    }
    function cc(e, t, r, n) {
        this.h = +e,
        this.s = +t,
        this.l = +r,
        this.opacity = +n
    }
    function cu(e) {
        return (e = (e || 0) % 360) < 0 ? e + 360 : e
    }
    function cd(e) {
        return Math.max(0, Math.min(1, e || 0))
    }
    function ch(e, t, r) {
        return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255
    }
    function cp(e, t, r, n, i) {
        var a = e * e
          , s = a * e;
        return ((1 - 3 * e + 3 * a - s) * t + (4 - 6 * a + 3 * s) * r + (1 + 3 * e + 3 * a - 3 * s) * n + s * i) / 6
    }
    lq(lY, l8, {
        copy(e) {
            return Object.assign(new this.constructor, this, e)
        },
        displayable() {
            return this.rgb().displayable()
        },
        hex: l3,
        formatHex: l3,
        formatHex8: function() {
            return this.rgb().formatHex8()
        },
        formatHsl: function() {
            return cl(this).formatHsl()
        },
        formatRgb: l6,
        toString: l6
    }),
    lq(ct, ce, lW(lY, {
        brighter(e) {
            return e = null == e ? 1.4285714285714286 : Math.pow(1.4285714285714286, e),
            new ct(this.r * e,this.g * e,this.b * e,this.opacity)
        },
        darker(e) {
            return e = null == e ? .7 : Math.pow(.7, e),
            new ct(this.r * e,this.g * e,this.b * e,this.opacity)
        },
        rgb() {
            return this
        },
        clamp() {
            return new ct(ca(this.r),ca(this.g),ca(this.b),ci(this.opacity))
        },
        displayable() {
            return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: cr,
        formatHex: cr,
        formatHex8: function() {
            return `#${cs(this.r)}${cs(this.g)}${cs(this.b)}${cs((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`
        },
        formatRgb: cn,
        toString: cn
    })),
    lq(cc, function(e, t, r, n) {
        return 1 == arguments.length ? cl(e) : new cc(e,t,r,null == n ? 1 : n)
    }, lW(lY, {
        brighter(e) {
            return e = null == e ? 1.4285714285714286 : Math.pow(1.4285714285714286, e),
            new cc(this.h,this.s,this.l * e,this.opacity)
        },
        darker(e) {
            return e = null == e ? .7 : Math.pow(.7, e),
            new cc(this.h,this.s,this.l * e,this.opacity)
        },
        rgb() {
            var e = this.h % 360 + (this.h < 0) * 360
              , t = isNaN(e) || isNaN(this.s) ? 0 : this.s
              , r = this.l
              , n = r + (r < .5 ? r : 1 - r) * t
              , i = 2 * r - n;
            return new ct(ch(e >= 240 ? e - 240 : e + 120, i, n),ch(e, i, n),ch(e < 120 ? e + 240 : e - 120, i, n),this.opacity)
        },
        clamp() {
            return new cc(cu(this.h),cd(this.s),cd(this.l),ci(this.opacity))
        },
        displayable() {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        },
        formatHsl() {
            let e = ci(this.opacity);
            return `${1 === e ? "hsl(" : "hsla("}${cu(this.h)}, ${100 * cd(this.s)}%, ${100 * cd(this.l)}%${1 === e ? ")" : `, ${e})`}`
        }
    }));
    let cm = e => () => e;
    function cf(e, t) {
        var r = t - e;
        return r ? function(t) {
            return e + t * r
        }
        : cm(isNaN(e) ? t : e)
    }
    let cx = function e(t) {
        var r, n = 1 == (r = +t) ? cf : function(e, t) {
            var n, i, a;
            return t - e ? (n = e,
            i = t,
            n = Math.pow(n, a = r),
            i = Math.pow(i, a) - n,
            a = 1 / a,
            function(e) {
                return Math.pow(n + e * i, a)
            }
            ) : cm(isNaN(e) ? t : e)
        }
        ;
        function i(e, t) {
            var r = n((e = ce(e)).r, (t = ce(t)).r)
              , i = n(e.g, t.g)
              , a = n(e.b, t.b)
              , s = cf(e.opacity, t.opacity);
            return function(t) {
                return e.r = r(t),
                e.g = i(t),
                e.b = a(t),
                e.opacity = s(t),
                e + ""
            }
        }
        return i.gamma = e,
        i
    }(1);
    function cy(e) {
        return function(t) {
            var r, n, i = t.length, a = Array(i), s = Array(i), o = Array(i);
            for (r = 0; r < i; ++r)
                n = ce(t[r]),
                a[r] = n.r || 0,
                s[r] = n.g || 0,
                o[r] = n.b || 0;
            return a = e(a),
            s = e(s),
            o = e(o),
            n.opacity = 1,
            function(e) {
                return n.r = a(e),
                n.g = s(e),
                n.b = o(e),
                n + ""
            }
        }
    }
    function cv(e, t) {
        return e *= 1,
        t *= 1,
        function(r) {
            return e * (1 - r) + t * r
        }
    }
    cy(function(e) {
        var t = e.length - 1;
        return function(r) {
            var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1,
            t - 1) : Math.floor(r * t)
              , i = e[n]
              , a = e[n + 1]
              , s = n > 0 ? e[n - 1] : 2 * i - a
              , o = n < t - 1 ? e[n + 2] : 2 * a - i;
            return cp((r - n / t) * t, s, i, a, o)
        }
    }),
    cy(function(e) {
        var t = e.length;
        return function(r) {
            var n = Math.floor(((r %= 1) < 0 ? ++r : r) * t)
              , i = e[(n + t - 1) % t]
              , a = e[n % t]
              , s = e[(n + 1) % t]
              , o = e[(n + 2) % t];
            return cp((r - n / t) * t, i, a, s, o)
        }
    });
    var cg = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g
      , cb = RegExp(cg.source, "g");
    function cw(e, t) {
        if (e = function(e) {
            let t;
            for (; t = e.sourceEvent; )
                e = t;
            return e
        }(e),
        void 0 === t && (t = e.currentTarget),
        t) {
            var r = t.ownerSVGElement || t;
            if (r.createSVGPoint) {
                var n = r.createSVGPoint();
                return n.x = e.clientX,
                n.y = e.clientY,
                [(n = n.matrixTransform(t.getScreenCTM().inverse())).x, n.y]
            }
            if (t.getBoundingClientRect) {
                var i = t.getBoundingClientRect();
                return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop]
            }
        }
        return [e.pageX, e.pageY]
    }
    var cj, cN, ck, cS = 0, cC = 0, cM = 0, cA = 0, cT = 0, cP = 0, c_ = "object" == typeof performance && performance.now ? performance : Date, cE = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
        setTimeout(e, 17)
    }
    ;
    function cI() {
        return cT || (cE(cD),
        cT = c_.now() + cP)
    }
    function cD() {
        cT = 0
    }
    function cR() {
        this._call = this._time = this._next = null
    }
    function cL(e, t, r) {
        var n = new cR;
        return n.restart(e, t, r),
        n
    }
    function cz() {
        cT = (cA = c_.now()) + cP,
        cS = cC = 0;
        try {
            cI(),
            ++cS;
            for (var e, t = cN; t; )
                (e = cT - t._time) >= 0 && t._call.call(void 0, e),
                t = t._next;
            --cS
        } finally {
            cS = 0,
            function() {
                for (var e, t, r = cN, n = 1 / 0; r; )
                    r._call ? (n > r._time && (n = r._time),
                    e = r,
                    r = r._next) : (t = r._next,
                    r._next = null,
                    r = e ? e._next = t : cN = t);
                ck = e,
                cV(n)
            }(),
            cT = 0
        }
    }
    function cO() {
        var e = c_.now()
          , t = e - cA;
        t > 1e3 && (cP -= t,
        cA = e)
    }
    function cV(e) {
        !cS && (cC && (cC = clearTimeout(cC)),
        e - cT > 24 ? (e < 1 / 0 && (cC = setTimeout(cz, e - c_.now() - cP)),
        cM && (cM = clearInterval(cM))) : (cM || (cA = c_.now(),
        cM = setInterval(cO, 1e3)),
        cS = 1,
        cE(cz)))
    }
    function c$(e, t, r) {
        var n = new cR;
        return t = null == t ? 0 : +t,
        n.restart(r => {
            n.stop(),
            e(r + t)
        }
        , t, r),
        n
    }
    cR.prototype = cL.prototype = {
        constructor: cR,
        restart: function(e, t, r) {
            if ("function" != typeof e)
                throw TypeError("callback is not a function");
            r = (null == r ? cI() : +r) + (null == t ? 0 : +t),
            this._next || ck === this || (ck ? ck._next = this : cN = this,
            ck = this),
            this._call = e,
            this._time = r,
            cV()
        },
        stop: function() {
            this._call && (this._call = null,
            this._time = 1 / 0,
            cV())
        }
    };
    var cF = o4("start", "end", "cancel", "interrupt")
      , cB = [];
    function cH(e, t, r, n, i, a) {
        var s = e.__transition;
        if (s) {
            if (r in s)
                return
        } else
            e.__transition = {};
        !function(e, t, r) {
            var n, i = e.__transition;
            function a(l) {
                var c, u, d, h;
                if (1 !== r.state)
                    return o();
                for (c in i)
                    if ((h = i[c]).name === r.name) {
                        if (3 === h.state)
                            return c$(a);
                        4 === h.state ? (h.state = 6,
                        h.timer.stop(),
                        h.on.call("interrupt", e, e.__data__, h.index, h.group),
                        delete i[c]) : +c < t && (h.state = 6,
                        h.timer.stop(),
                        h.on.call("cancel", e, e.__data__, h.index, h.group),
                        delete i[c])
                    }
                if (c$(function() {
                    3 === r.state && (r.state = 4,
                    r.timer.restart(s, r.delay, r.time),
                    s(l))
                }),
                r.state = 2,
                r.on.call("start", e, e.__data__, r.index, r.group),
                2 === r.state) {
                    for (c = 0,
                    r.state = 3,
                    n = Array(d = r.tween.length),
                    u = -1; c < d; ++c)
                        (h = r.tween[c].value.call(e, e.__data__, r.index, r.group)) && (n[++u] = h);
                    n.length = u + 1
                }
            }
            function s(t) {
                for (var i = t < r.duration ? r.ease.call(null, t / r.duration) : (r.timer.restart(o),
                r.state = 5,
                1), a = -1, s = n.length; ++a < s; )
                    n[a].call(e, i);
                5 === r.state && (r.on.call("end", e, e.__data__, r.index, r.group),
                o())
            }
            function o() {
                for (var n in r.state = 6,
                r.timer.stop(),
                delete i[t],
                i)
                    return;
                delete e.__transition
            }
            i[t] = r,
            r.timer = cL(function(e) {
                r.state = 1,
                r.timer.restart(a, r.delay, r.time),
                r.delay <= e && a(e - r.delay)
            }, 0, r.time)
        }(e, r, {
            name: t,
            index: n,
            group: i,
            on: cF,
            tween: cB,
            time: a.time,
            delay: a.delay,
            duration: a.duration,
            ease: a.ease,
            timer: null,
            state: 0
        })
    }
    function cU(e, t) {
        var r = cW(e, t);
        if (r.state > 0)
            throw Error("too late; already scheduled");
        return r
    }
    function cq(e, t) {
        var r = cW(e, t);
        if (r.state > 3)
            throw Error("too late; already running");
        return r
    }
    function cW(e, t) {
        var r = e.__transition;
        if (!r || !(r = r[t]))
            throw Error("transition not found");
        return r
    }
    function cY(e, t) {
        var r, n, i, a = e.__transition, s = !0;
        if (a) {
            for (i in t = null == t ? null : t + "",
            a) {
                if ((r = a[i]).name !== t) {
                    s = !1;
                    continue
                }
                n = r.state > 2 && r.state < 5,
                r.state = 6,
                r.timer.stop(),
                r.on.call(n ? "interrupt" : "cancel", e, e.__data__, r.index, r.group),
                delete a[i]
            }
            s && delete e.__transition
        }
    }
    var cG = 180 / Math.PI
      , cX = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1
    };
    function cJ(e, t, r, n, i, a) {
        var s, o, l;
        return (s = Math.sqrt(e * e + t * t)) && (e /= s,
        t /= s),
        (l = e * r + t * n) && (r -= e * l,
        n -= t * l),
        (o = Math.sqrt(r * r + n * n)) && (r /= o,
        n /= o,
        l /= o),
        e * n < t * r && (e = -e,
        t = -t,
        l = -l,
        s = -s),
        {
            translateX: i,
            translateY: a,
            rotate: Math.atan2(t, e) * cG,
            skewX: Math.atan(l) * cG,
            scaleX: s,
            scaleY: o
        }
    }
    function cK(e, t, r, n) {
        function i(e) {
            return e.length ? e.pop() + " " : ""
        }
        return function(a, s) {
            var o, l, c, u, d = [], h = [];
            return a = e(a),
            s = e(s),
            !function(e, n, i, a, s, o) {
                if (e !== i || n !== a) {
                    var l = s.push("translate(", null, t, null, r);
                    o.push({
                        i: l - 4,
                        x: cv(e, i)
                    }, {
                        i: l - 2,
                        x: cv(n, a)
                    })
                } else
                    (i || a) && s.push("translate(" + i + t + a + r)
            }(a.translateX, a.translateY, s.translateX, s.translateY, d, h),
            o = a.rotate,
            l = s.rotate,
            o !== l ? (o - l > 180 ? l += 360 : l - o > 180 && (o += 360),
            h.push({
                i: d.push(i(d) + "rotate(", null, n) - 2,
                x: cv(o, l)
            })) : l && d.push(i(d) + "rotate(" + l + n),
            c = a.skewX,
            u = s.skewX,
            c !== u ? h.push({
                i: d.push(i(d) + "skewX(", null, n) - 2,
                x: cv(c, u)
            }) : u && d.push(i(d) + "skewX(" + u + n),
            !function(e, t, r, n, a, s) {
                if (e !== r || t !== n) {
                    var o = a.push(i(a) + "scale(", null, ",", null, ")");
                    s.push({
                        i: o - 4,
                        x: cv(e, r)
                    }, {
                        i: o - 2,
                        x: cv(t, n)
                    })
                } else
                    (1 !== r || 1 !== n) && a.push(i(a) + "scale(" + r + "," + n + ")")
            }(a.scaleX, a.scaleY, s.scaleX, s.scaleY, d, h),
            a = s = null,
            function(e) {
                for (var t, r = -1, n = h.length; ++r < n; )
                    d[(t = h[r]).i] = t.x(e);
                return d.join("")
            }
        }
    }
    var cZ = cK(function(e) {
        let t = new ("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(e + "");
        return t.isIdentity ? cX : cJ(t.a, t.b, t.c, t.d, t.e, t.f)
    }, "px, ", "px)", "deg)")
      , cQ = cK(function(e) {
        return null == e ? cX : (u || (u = document.createElementNS("http://www.w3.org/2000/svg", "g")),
        u.setAttribute("transform", e),
        e = u.transform.baseVal.consolidate()) ? cJ((e = e.matrix).a, e.b, e.c, e.d, e.e, e.f) : cX
    }, ", ", ")", ")");
    function c0(e, t, r) {
        var n = e._id;
        return e.each(function() {
            var e = cq(this, n);
            (e.value || (e.value = {}))[t] = r.apply(this, arguments)
        }),
        function(e) {
            return cW(e, n).value[t]
        }
    }
    function c1(e, t) {
        var r;
        return ("number" == typeof t ? cv : t instanceof l8 ? cx : (r = l8(t)) ? (t = r,
        cx) : function(e, t) {
            var r, n, i, a, s, o = cg.lastIndex = cb.lastIndex = 0, l = -1, c = [], u = [];
            for (e += "",
            t += ""; (i = cg.exec(e)) && (a = cb.exec(t)); )
                (s = a.index) > o && (s = t.slice(o, s),
                c[l] ? c[l] += s : c[++l] = s),
                (i = i[0]) === (a = a[0]) ? c[l] ? c[l] += a : c[++l] = a : (c[++l] = null,
                u.push({
                    i: l,
                    x: cv(i, a)
                })),
                o = cb.lastIndex;
            return o < t.length && (s = t.slice(o),
            c[l] ? c[l] += s : c[++l] = s),
            c.length < 2 ? u[0] ? (r = u[0].x,
            function(e) {
                return r(e) + ""
            }
            ) : (n = t,
            function() {
                return n
            }
            ) : (t = u.length,
            function(e) {
                for (var r, n = 0; n < t; ++n)
                    c[(r = u[n]).i] = r.x(e);
                return c.join("")
            }
            )
        }
        )(e, t)
    }
    var c2 = lz.prototype.constructor;
    function c5(e) {
        return function() {
            this.style.removeProperty(e)
        }
    }
    var c4 = 0;
    function c3(e, t, r, n) {
        this._groups = e,
        this._parents = t,
        this._name = r,
        this._id = n
    }
    var c6 = lz.prototype;
    c3.prototype = (function(e) {
        return lz().transition(e)
    }
    ).prototype = {
        constructor: c3,
        select: function(e) {
            var t = this._name
              , r = this._id;
            "function" != typeof e && (e = o9(e));
            for (var n = this._groups, i = n.length, a = Array(i), s = 0; s < i; ++s)
                for (var o, l, c = n[s], u = c.length, d = a[s] = Array(u), h = 0; h < u; ++h)
                    (o = c[h]) && (l = e.call(o, o.__data__, h, c)) && ("__data__"in o && (l.__data__ = o.__data__),
                    d[h] = l,
                    cH(d[h], t, r, h, d, cW(o, r)));
            return new c3(a,this._parents,t,r)
        },
        selectAll: function(e) {
            var t = this._name
              , r = this._id;
            "function" != typeof e && (e = le(e));
            for (var n = this._groups, i = n.length, a = [], s = [], o = 0; o < i; ++o)
                for (var l, c = n[o], u = c.length, d = 0; d < u; ++d)
                    if (l = c[d]) {
                        for (var h, p = e.call(l, l.__data__, d, c), m = cW(l, r), f = 0, x = p.length; f < x; ++f)
                            (h = p[f]) && cH(h, t, r, f, p, m);
                        a.push(p),
                        s.push(l)
                    }
            return new c3(a,s,t,r)
        },
        selectChild: c6.selectChild,
        selectChildren: c6.selectChildren,
        filter: function(e) {
            "function" != typeof e && (e = lt(e));
            for (var t = this._groups, r = t.length, n = Array(r), i = 0; i < r; ++i)
                for (var a, s = t[i], o = s.length, l = n[i] = [], c = 0; c < o; ++c)
                    (a = s[c]) && e.call(a, a.__data__, c, s) && l.push(a);
            return new c3(n,this._parents,this._name,this._id)
        },
        merge: function(e) {
            if (e._id !== this._id)
                throw Error();
            for (var t = this._groups, r = e._groups, n = t.length, i = r.length, a = Math.min(n, i), s = Array(n), o = 0; o < a; ++o)
                for (var l, c = t[o], u = r[o], d = c.length, h = s[o] = Array(d), p = 0; p < d; ++p)
                    (l = c[p] || u[p]) && (h[p] = l);
            for (; o < n; ++o)
                s[o] = t[o];
            return new c3(s,this._parents,this._name,this._id)
        },
        selection: function() {
            return new c2(this._groups,this._parents)
        },
        transition: function() {
            for (var e = this._name, t = this._id, r = ++c4, n = this._groups, i = n.length, a = 0; a < i; ++a)
                for (var s, o = n[a], l = o.length, c = 0; c < l; ++c)
                    if (s = o[c]) {
                        var u = cW(s, t);
                        cH(s, e, r, c, o, {
                            time: u.time + u.delay + u.duration,
                            delay: 0,
                            duration: u.duration,
                            ease: u.ease
                        })
                    }
            return new c3(n,this._parents,e,r)
        },
        call: c6.call,
        nodes: c6.nodes,
        node: c6.node,
        size: c6.size,
        empty: c6.empty,
        each: c6.each,
        on: function(e, t) {
            var r, n, i, a, s, o, l = this._id;
            return arguments.length < 2 ? cW(this.node(), l).on.on(e) : this.each((r = l,
            n = e,
            i = t,
            o = (n + "").trim().split(/^|\s+/).every(function(e) {
                var t = e.indexOf(".");
                return t >= 0 && (e = e.slice(0, t)),
                !e || "start" === e
            }) ? cU : cq,
            function() {
                var e = o(this, r)
                  , t = e.on;
                t !== a && (s = (a = t).copy()).on(n, i),
                e.on = s
            }
            ))
        },
        attr: function(e, t) {
            var r = lf(e)
              , n = "transform" === r ? cQ : c1;
            return this.attrTween(e, "function" == typeof t ? (r.local ? function(e, t, r) {
                var n, i, a;
                return function() {
                    var s, o, l = r(this);
                    return null == l ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local)) === (o = l + "") ? null : s === n && o === i ? a : (i = o,
                    a = t(n = s, l))
                }
            }
            : function(e, t, r) {
                var n, i, a;
                return function() {
                    var s, o, l = r(this);
                    return null == l ? void this.removeAttribute(e) : (s = this.getAttribute(e)) === (o = l + "") ? null : s === n && o === i ? a : (i = o,
                    a = t(n = s, l))
                }
            }
            )(r, n, c0(this, "attr." + e, t)) : null == t ? (r.local ? function(e) {
                return function() {
                    this.removeAttributeNS(e.space, e.local)
                }
            }
            : function(e) {
                return function() {
                    this.removeAttribute(e)
                }
            }
            )(r) : (r.local ? function(e, t, r) {
                var n, i, a = r + "";
                return function() {
                    var s = this.getAttributeNS(e.space, e.local);
                    return s === a ? null : s === n ? i : i = t(n = s, r)
                }
            }
            : function(e, t, r) {
                var n, i, a = r + "";
                return function() {
                    var s = this.getAttribute(e);
                    return s === a ? null : s === n ? i : i = t(n = s, r)
                }
            }
            )(r, n, t))
        },
        attrTween: function(e, t) {
            var r = "attr." + e;
            if (arguments.length < 2)
                return (r = this.tween(r)) && r._value;
            if (null == t)
                return this.tween(r, null);
            if ("function" != typeof t)
                throw Error();
            var n = lf(e);
            return this.tween(r, (n.local ? function(e, t) {
                var r, n;
                function i() {
                    var i = t.apply(this, arguments);
                    return i !== n && (r = (n = i) && function(t) {
                        this.setAttributeNS(e.space, e.local, i.call(this, t))
                    }
                    ),
                    r
                }
                return i._value = t,
                i
            }
            : function(e, t) {
                var r, n;
                function i() {
                    var i = t.apply(this, arguments);
                    return i !== n && (r = (n = i) && function(t) {
                        this.setAttribute(e, i.call(this, t))
                    }
                    ),
                    r
                }
                return i._value = t,
                i
            }
            )(n, t))
        },
        style: function(e, t, r) {
            var n, i, a, s, o, l, c, u, d, h, p, m, f, x, y, v, g, b, w, j, N, k = "transform" == (e += "") ? cZ : c1;
            return null == t ? this.styleTween(e, (n = e,
            function() {
                var e = ly(this, n)
                  , t = (this.style.removeProperty(n),
                ly(this, n));
                return e === t ? null : e === i && t === a ? s : s = k(i = e, a = t)
            }
            )).on("end.style." + e, c5(e)) : "function" == typeof t ? this.styleTween(e, (o = e,
            l = c0(this, "style." + e, t),
            function() {
                var e = ly(this, o)
                  , t = l(this)
                  , r = t + "";
                return null == t && (this.style.removeProperty(o),
                r = t = ly(this, o)),
                e === r ? null : e === c && r === u ? d : (u = r,
                d = k(c = e, t))
            }
            )).each((h = this._id,
            g = "end." + (v = "style." + (p = e)),
            function() {
                var e = cq(this, h)
                  , t = e.on
                  , r = null == e.value[v] ? y || (y = c5(p)) : void 0;
                (t !== m || x !== r) && (f = (m = t).copy()).on(g, x = r),
                e.on = f
            }
            )) : this.styleTween(e, (b = e,
            N = t + "",
            function() {
                var e = ly(this, b);
                return e === N ? null : e === w ? j : j = k(w = e, t)
            }
            ), r).on("end.style." + e, null)
        },
        styleTween: function(e, t, r) {
            var n = "style." + (e += "");
            if (arguments.length < 2)
                return (n = this.tween(n)) && n._value;
            if (null == t)
                return this.tween(n, null);
            if ("function" != typeof t)
                throw Error();
            return this.tween(n, function(e, t, r) {
                var n, i;
                function a() {
                    var a = t.apply(this, arguments);
                    return a !== i && (n = (i = a) && function(t) {
                        this.style.setProperty(e, a.call(this, t), r)
                    }
                    ),
                    n
                }
                return a._value = t,
                a
            }(e, t, null == r ? "" : r))
        },
        text: function(e) {
            var t, r;
            return this.tween("text", "function" == typeof e ? (t = c0(this, "text", e),
            function() {
                var e = t(this);
                this.textContent = null == e ? "" : e
            }
            ) : (r = null == e ? "" : e + "",
            function() {
                this.textContent = r
            }
            ))
        },
        textTween: function(e) {
            var t = "text";
            if (arguments.length < 1)
                return (t = this.tween(t)) && t._value;
            if (null == e)
                return this.tween(t, null);
            if ("function" != typeof e)
                throw Error();
            return this.tween(t, function(e) {
                var t, r;
                function n() {
                    var n = e.apply(this, arguments);
                    return n !== r && (t = (r = n) && function(e) {
                        this.textContent = n.call(this, e)
                    }
                    ),
                    t
                }
                return n._value = e,
                n
            }(e))
        },
        remove: function() {
            var e;
            return this.on("end.remove", (e = this._id,
            function() {
                var t = this.parentNode;
                for (var r in this.__transition)
                    if (+r !== e)
                        return;
                t && t.removeChild(this)
            }
            ))
        },
        tween: function(e, t) {
            var r = this._id;
            if (e += "",
            arguments.length < 2) {
                for (var n, i = cW(this.node(), r).tween, a = 0, s = i.length; a < s; ++a)
                    if ((n = i[a]).name === e)
                        return n.value;
                return null
            }
            return this.each((null == t ? function(e, t) {
                var r, n;
                return function() {
                    var i = cq(this, e)
                      , a = i.tween;
                    if (a !== r) {
                        n = r = a;
                        for (var s = 0, o = n.length; s < o; ++s)
                            if (n[s].name === t) {
                                (n = n.slice()).splice(s, 1);
                                break
                            }
                    }
                    i.tween = n
                }
            }
            : function(e, t, r) {
                var n, i;
                if ("function" != typeof r)
                    throw Error();
                return function() {
                    var a = cq(this, e)
                      , s = a.tween;
                    if (s !== n) {
                        i = (n = s).slice();
                        for (var o = {
                            name: t,
                            value: r
                        }, l = 0, c = i.length; l < c; ++l)
                            if (i[l].name === t) {
                                i[l] = o;
                                break
                            }
                        l === c && i.push(o)
                    }
                    a.tween = i
                }
            }
            )(r, e, t))
        },
        delay: function(e) {
            var t = this._id;
            return arguments.length ? this.each(("function" == typeof e ? function(e, t) {
                return function() {
                    cU(this, e).delay = +t.apply(this, arguments)
                }
            }
            : function(e, t) {
                return t *= 1,
                function() {
                    cU(this, e).delay = t
                }
            }
            )(t, e)) : cW(this.node(), t).delay
        },
        duration: function(e) {
            var t = this._id;
            return arguments.length ? this.each(("function" == typeof e ? function(e, t) {
                return function() {
                    cq(this, e).duration = +t.apply(this, arguments)
                }
            }
            : function(e, t) {
                return t *= 1,
                function() {
                    cq(this, e).duration = t
                }
            }
            )(t, e)) : cW(this.node(), t).duration
        },
        ease: function(e) {
            var t = this._id;
            return arguments.length ? this.each(function(e, t) {
                if ("function" != typeof t)
                    throw Error();
                return function() {
                    cq(this, e).ease = t
                }
            }(t, e)) : cW(this.node(), t).ease
        },
        easeVarying: function(e) {
            var t;
            if ("function" != typeof e)
                throw Error();
            return this.each((t = this._id,
            function() {
                var r = e.apply(this, arguments);
                if ("function" != typeof r)
                    throw Error();
                cq(this, t).ease = r
            }
            ))
        },
        end: function() {
            var e, t, r = this, n = r._id, i = r.size();
            return new Promise(function(a, s) {
                var o = {
                    value: s
                }
                  , l = {
                    value: function() {
                        0 == --i && a()
                    }
                };
                r.each(function() {
                    var r = cq(this, n)
                      , i = r.on;
                    i !== e && ((t = (e = i).copy())._.cancel.push(o),
                    t._.interrupt.push(o),
                    t._.end.push(l)),
                    r.on = t
                }),
                0 === i && a()
            }
            )
        },
        [Symbol.iterator]: c6[Symbol.iterator]
    };
    var c8 = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function(e) {
            return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2
        }
    };
    lz.prototype.interrupt = function(e) {
        return this.each(function() {
            cY(this, e)
        })
    }
    ,
    lz.prototype.transition = function(e) {
        var t, r;
        e instanceof c3 ? (t = e._id,
        e = e._name) : (t = ++c4,
        (r = c8).time = cI(),
        e = null == e ? null : e + "");
        for (var n = this._groups, i = n.length, a = 0; a < i; ++a)
            for (var s, o = n[a], l = o.length, c = 0; c < l; ++c)
                (s = o[c]) && cH(s, e, t, c, o, r || function(e, t) {
                    for (var r; !(r = e.__transition) || !(r = r[t]); )
                        if (!(e = e.parentNode))
                            throw Error(`transition ${t} not found`);
                    return r
                }(s, t));
        return new c3(n,this._parents,e,t)
    }
    ;
    let {abs: c9, max: c7, min: ue} = Math;
    function ut(e) {
        return {
            type: e
        }
    }
    function ur(e) {
        return ((e = Math.exp(e)) + 1 / e) / 2
    }
    ["w", "e"].map(ut),
    ["n", "s"].map(ut),
    ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(ut);
    let un = function e(t, r, n) {
        function i(e, i) {
            var a, s, o = e[0], l = e[1], c = e[2], u = i[0], d = i[1], h = i[2], p = u - o, m = d - l, f = p * p + m * m;
            if (f < 1e-12)
                s = Math.log(h / c) / t,
                a = function(e) {
                    return [o + e * p, l + e * m, c * Math.exp(t * e * s)]
                }
                ;
            else {
                var x = Math.sqrt(f)
                  , y = (h * h - c * c + n * f) / (2 * c * r * x)
                  , v = (h * h - c * c - n * f) / (2 * h * r * x)
                  , g = Math.log(Math.sqrt(y * y + 1) - y);
                s = (Math.log(Math.sqrt(v * v + 1) - v) - g) / t,
                a = function(e) {
                    var n, i, a = e * s, u = ur(g), d = c / (r * x) * (u * (((n = Math.exp(2 * (n = t * a + g))) - 1) / (n + 1)) - ((i = Math.exp(i = g)) - 1 / i) / 2);
                    return [o + d * p, l + d * m, c * u / ur(t * a + g)]
                }
            }
            return a.duration = 1e3 * s * t / Math.SQRT2,
            a
        }
        return i.rho = function(t) {
            var r = Math.max(.001, +t)
              , n = r * r;
            return e(r, n, n * n)
        }
        ,
        i
    }(Math.SQRT2, 2, 4)
      , ui = e => () => e;
    function ua(e, {sourceEvent: t, target: r, transform: n, dispatch: i}) {
        Object.defineProperties(this, {
            type: {
                value: e,
                enumerable: !0,
                configurable: !0
            },
            sourceEvent: {
                value: t,
                enumerable: !0,
                configurable: !0
            },
            target: {
                value: r,
                enumerable: !0,
                configurable: !0
            },
            transform: {
                value: n,
                enumerable: !0,
                configurable: !0
            },
            _: {
                value: i
            }
        })
    }
    function us(e, t, r) {
        this.k = e,
        this.x = t,
        this.y = r
    }
    us.prototype = {
        constructor: us,
        scale: function(e) {
            return 1 === e ? this : new us(this.k * e,this.x,this.y)
        },
        translate: function(e, t) {
            return 0 === e & 0 === t ? this : new us(this.k,this.x + this.k * e,this.y + this.k * t)
        },
        apply: function(e) {
            return [e[0] * this.k + this.x, e[1] * this.k + this.y]
        },
        applyX: function(e) {
            return e * this.k + this.x
        },
        applyY: function(e) {
            return e * this.k + this.y
        },
        invert: function(e) {
            return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k]
        },
        invertX: function(e) {
            return (e - this.x) / this.k
        },
        invertY: function(e) {
            return (e - this.y) / this.k
        },
        rescaleX: function(e) {
            return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e))
        },
        rescaleY: function(e) {
            return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e))
        },
        toString: function() {
            return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
        }
    };
    var uo = new us(1,0,0);
    function ul(e) {
        e.stopImmediatePropagation()
    }
    function uc(e) {
        e.preventDefault(),
        e.stopImmediatePropagation()
    }
    function uu(e) {
        return (!e.ctrlKey || "wheel" === e.type) && !e.button
    }
    function ud() {
        var e = this;
        return e instanceof SVGElement ? (e = e.ownerSVGElement || e).hasAttribute("viewBox") ? [[(e = e.viewBox.baseVal).x, e.y], [e.x + e.width, e.y + e.height]] : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]] : [[0, 0], [e.clientWidth, e.clientHeight]]
    }
    function uh() {
        return this.__zoom || uo
    }
    function up(e) {
        return -e.deltaY * (1 === e.deltaMode ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1)
    }
    function um() {
        return navigator.maxTouchPoints || "ontouchstart"in this
    }
    function uf(e, t, r) {
        var n = e.invertX(t[0][0]) - r[0][0]
          , i = e.invertX(t[1][0]) - r[1][0]
          , a = e.invertY(t[0][1]) - r[0][1]
          , s = e.invertY(t[1][1]) - r[1][1];
        return e.translate(i > n ? (n + i) / 2 : Math.min(0, n) || Math.max(0, i), s > a ? (a + s) / 2 : Math.min(0, a) || Math.max(0, s))
    }
    function ux(e) {
        return e.x
    }
    function uy(e) {
        return e.y
    }
    us.prototype,
    e.s([], 85664),
    e.i(85664);
    var uv = Math.PI * (3 - Math.sqrt(5));
    function ug(e) {
        return function() {
            return e
        }
    }
    function ub(e) {
        return (e() - .5) * 1e-6
    }
    function uw(e) {
        return e.index
    }
    function uj(e, t) {
        var r = e.get(t);
        if (!r)
            throw Error("node not found: " + t);
        return r
    }
    function uN(e, t, r, n) {
        if (isNaN(t) || isNaN(r))
            return e;
        var i, a, s, o, l, c, u, d, h, p = e._root, m = {
            data: n
        }, f = e._x0, x = e._y0, y = e._x1, v = e._y1;
        if (!p)
            return e._root = m,
            e;
        for (; p.length; )
            if ((c = t >= (a = (f + y) / 2)) ? f = a : y = a,
            (u = r >= (s = (x + v) / 2)) ? x = s : v = s,
            i = p,
            !(p = p[d = u << 1 | c]))
                return i[d] = m,
                e;
        if (o = +e._x.call(null, p.data),
        l = +e._y.call(null, p.data),
        t === o && r === l)
            return m.next = p,
            i ? i[d] = m : e._root = m,
            e;
        do
            i = i ? i[d] = [, , , , ] : e._root = [, , , , ],
            (c = t >= (a = (f + y) / 2)) ? f = a : y = a,
            (u = r >= (s = (x + v) / 2)) ? x = s : v = s;
        while ((d = u << 1 | c) == (h = (l >= s) << 1 | o >= a))return i[h] = p,
        i[d] = m,
        e
    }
    function uk(e, t, r, n, i) {
        this.node = e,
        this.x0 = t,
        this.y0 = r,
        this.x1 = n,
        this.y1 = i
    }
    function uS(e) {
        return e[0]
    }
    function uC(e) {
        return e[1]
    }
    function uM(e, t, r) {
        var n = new uA(null == t ? uS : t,null == r ? uC : r,NaN,NaN,NaN,NaN);
        return null == e ? n : n.addAll(e)
    }
    function uA(e, t, r, n, i, a) {
        this._x = e,
        this._y = t,
        this._x0 = r,
        this._y0 = n,
        this._x1 = i,
        this._y1 = a,
        this._root = void 0
    }
    function uT(e) {
        for (var t = {
            data: e.data
        }, r = t; e = e.next; )
            r = r.next = {
                data: e.data
            };
        return t
    }
    var uP = uM.prototype = uA.prototype;
    function u_(e) {
        return e.x + e.vx
    }
    function uE(e) {
        return e.y + e.vy
    }
    uP.copy = function() {
        var e, t, r = new uA(this._x,this._y,this._x0,this._y0,this._x1,this._y1), n = this._root;
        if (!n)
            return r;
        if (!n.length)
            return r._root = uT(n),
            r;
        for (e = [{
            source: n,
            target: r._root = [, , , , ]
        }]; n = e.pop(); )
            for (var i = 0; i < 4; ++i)
                (t = n.source[i]) && (t.length ? e.push({
                    source: t,
                    target: n.target[i] = [, , , , ]
                }) : n.target[i] = uT(t));
        return r
    }
    ,
    uP.add = function(e) {
        let t = +this._x.call(null, e)
          , r = +this._y.call(null, e);
        return uN(this.cover(t, r), t, r, e)
    }
    ,
    uP.addAll = function(e) {
        var t, r, n, i, a = e.length, s = Array(a), o = Array(a), l = 1 / 0, c = 1 / 0, u = -1 / 0, d = -1 / 0;
        for (r = 0; r < a; ++r)
            !(isNaN(n = +this._x.call(null, t = e[r])) || isNaN(i = +this._y.call(null, t))) && (s[r] = n,
            o[r] = i,
            n < l && (l = n),
            n > u && (u = n),
            i < c && (c = i),
            i > d && (d = i));
        if (l > u || c > d)
            return this;
        for (this.cover(l, c).cover(u, d),
        r = 0; r < a; ++r)
            uN(this, s[r], o[r], e[r]);
        return this
    }
    ,
    uP.cover = function(e, t) {
        if (isNaN(e *= 1) || isNaN(t *= 1))
            return this;
        var r = this._x0
          , n = this._y0
          , i = this._x1
          , a = this._y1;
        if (isNaN(r))
            i = (r = Math.floor(e)) + 1,
            a = (n = Math.floor(t)) + 1;
        else {
            for (var s, o, l = i - r || 1, c = this._root; r > e || e >= i || n > t || t >= a; )
                switch (o = (t < n) << 1 | e < r,
                (s = [, , , , ])[o] = c,
                c = s,
                l *= 2,
                o) {
                case 0:
                    i = r + l,
                    a = n + l;
                    break;
                case 1:
                    r = i - l,
                    a = n + l;
                    break;
                case 2:
                    i = r + l,
                    n = a - l;
                    break;
                case 3:
                    r = i - l,
                    n = a - l
                }
            this._root && this._root.length && (this._root = c)
        }
        return this._x0 = r,
        this._y0 = n,
        this._x1 = i,
        this._y1 = a,
        this
    }
    ,
    uP.data = function() {
        var e = [];
        return this.visit(function(t) {
            if (!t.length)
                do
                    e.push(t.data);
                while (t = t.next)
        }),
        e
    }
    ,
    uP.extent = function(e) {
        return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]
    }
    ,
    uP.find = function(e, t, r) {
        var n, i, a, s, o, l, c, u = this._x0, d = this._y0, h = this._x1, p = this._y1, m = [], f = this._root;
        for (f && m.push(new uk(f,u,d,h,p)),
        null == r ? r = 1 / 0 : (u = e - r,
        d = t - r,
        h = e + r,
        p = t + r,
        r *= r); l = m.pop(); )
            if ((f = l.node) && !((i = l.x0) > h) && !((a = l.y0) > p) && !((s = l.x1) < u) && !((o = l.y1) < d))
                if (f.length) {
                    var x = (i + s) / 2
                      , y = (a + o) / 2;
                    m.push(new uk(f[3],x,y,s,o), new uk(f[2],i,y,x,o), new uk(f[1],x,a,s,y), new uk(f[0],i,a,x,y)),
                    (c = (t >= y) << 1 | e >= x) && (l = m[m.length - 1],
                    m[m.length - 1] = m[m.length - 1 - c],
                    m[m.length - 1 - c] = l)
                } else {
                    var v = e - this._x.call(null, f.data)
                      , g = t - this._y.call(null, f.data)
                      , b = v * v + g * g;
                    if (b < r) {
                        var w = Math.sqrt(r = b);
                        u = e - w,
                        d = t - w,
                        h = e + w,
                        p = t + w,
                        n = f.data
                    }
                }
        return n
    }
    ,
    uP.remove = function(e) {
        if (isNaN(a = +this._x.call(null, e)) || isNaN(s = +this._y.call(null, e)))
            return this;
        var t, r, n, i, a, s, o, l, c, u, d, h, p = this._root, m = this._x0, f = this._y0, x = this._x1, y = this._y1;
        if (!p)
            return this;
        if (p.length)
            for (; ; ) {
                if ((c = a >= (o = (m + x) / 2)) ? m = o : x = o,
                (u = s >= (l = (f + y) / 2)) ? f = l : y = l,
                t = p,
                !(p = p[d = u << 1 | c]))
                    return this;
                if (!p.length)
                    break;
                (t[d + 1 & 3] || t[d + 2 & 3] || t[d + 3 & 3]) && (r = t,
                h = d)
            }
        for (; p.data !== e; )
            if (n = p,
            !(p = p.next))
                return this;
        return ((i = p.next) && delete p.next,
        n) ? i ? n.next = i : delete n.next : t ? (i ? t[d] = i : delete t[d],
        (p = t[0] || t[1] || t[2] || t[3]) && p === (t[3] || t[2] || t[1] || t[0]) && !p.length && (r ? r[h] = p : this._root = p)) : this._root = i,
        this
    }
    ,
    uP.removeAll = function(e) {
        for (var t = 0, r = e.length; t < r; ++t)
            this.remove(e[t]);
        return this
    }
    ,
    uP.root = function() {
        return this._root
    }
    ,
    uP.size = function() {
        var e = 0;
        return this.visit(function(t) {
            if (!t.length)
                do
                    ++e;
                while (t = t.next)
        }),
        e
    }
    ,
    uP.visit = function(e) {
        var t, r, n, i, a, s, o = [], l = this._root;
        for (l && o.push(new uk(l,this._x0,this._y0,this._x1,this._y1)); t = o.pop(); )
            if (!e(l = t.node, n = t.x0, i = t.y0, a = t.x1, s = t.y1) && l.length) {
                var c = (n + a) / 2
                  , u = (i + s) / 2;
                (r = l[3]) && o.push(new uk(r,c,u,a,s)),
                (r = l[2]) && o.push(new uk(r,n,u,c,s)),
                (r = l[1]) && o.push(new uk(r,c,i,a,u)),
                (r = l[0]) && o.push(new uk(r,n,i,c,u))
            }
        return this
    }
    ,
    uP.visitAfter = function(e) {
        var t, r = [], n = [];
        for (this._root && r.push(new uk(this._root,this._x0,this._y0,this._x1,this._y1)); t = r.pop(); ) {
            var i = t.node;
            if (i.length) {
                var a, s = t.x0, o = t.y0, l = t.x1, c = t.y1, u = (s + l) / 2, d = (o + c) / 2;
                (a = i[0]) && r.push(new uk(a,s,o,u,d)),
                (a = i[1]) && r.push(new uk(a,u,o,l,d)),
                (a = i[2]) && r.push(new uk(a,s,d,u,c)),
                (a = i[3]) && r.push(new uk(a,u,d,l,c))
            }
            n.push(t)
        }
        for (; t = n.pop(); )
            e(t.node, t.x0, t.y0, t.x1, t.y1);
        return this
    }
    ,
    uP.x = function(e) {
        return arguments.length ? (this._x = e,
        this) : this._x
    }
    ,
    uP.y = function(e) {
        return arguments.length ? (this._y = e,
        this) : this._y
    }
    ;
    let uI = e => () => e;
    function uD(e, {sourceEvent: t, subject: r, target: n, identifier: i, active: a, x: s, y: o, dx: l, dy: c, dispatch: u}) {
        Object.defineProperties(this, {
            type: {
                value: e,
                enumerable: !0,
                configurable: !0
            },
            sourceEvent: {
                value: t,
                enumerable: !0,
                configurable: !0
            },
            subject: {
                value: r,
                enumerable: !0,
                configurable: !0
            },
            target: {
                value: n,
                enumerable: !0,
                configurable: !0
            },
            identifier: {
                value: i,
                enumerable: !0,
                configurable: !0
            },
            active: {
                value: a,
                enumerable: !0,
                configurable: !0
            },
            x: {
                value: s,
                enumerable: !0,
                configurable: !0
            },
            y: {
                value: o,
                enumerable: !0,
                configurable: !0
            },
            dx: {
                value: l,
                enumerable: !0,
                configurable: !0
            },
            dy: {
                value: c,
                enumerable: !0,
                configurable: !0
            },
            _: {
                value: u
            }
        })
    }
    function uR(e) {
        return !e.ctrlKey && !e.button
    }
    function uL() {
        return this.parentNode
    }
    function uz(e, t) {
        return null == t ? {
            x: e.x,
            y: e.y
        } : t
    }
    function uO() {
        return navigator.maxTouchPoints || "ontouchstart"in this
    }
    uD.prototype.on = function() {
        var e = this._.on.apply(this._, arguments);
        return e === this._ ? this : e
    }
    ;
    let uV = or("Link2", [["path", {
        d: "M9 17H7A5 5 0 0 1 7 7h2",
        key: "8i5ue5"
    }], ["path", {
        d: "M15 7h2a5 5 0 1 1 0 10h-2",
        key: "1b9ql8"
    }], ["line", {
        x1: "8",
        x2: "16",
        y1: "12",
        y2: "12",
        key: "1jonct"
    }]])
      , u$ = or("ArrowRight", [["path", {
        d: "M5 12h14",
        key: "1ays0h"
    }], ["path", {
        d: "m12 5 7 7-7 7",
        key: "xquz4c"
    }]])
      , uF = or("ArrowLeft", [["path", {
        d: "m12 19-7-7 7-7",
        key: "1l729n"
    }], ["path", {
        d: "M19 12H5",
        key: "x3x0zl"
    }]])
      , uB = or("Layers", [["path", {
        d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
        key: "8b97xw"
    }], ["path", {
        d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",
        key: "dd6zsq"
    }], ["path", {
        d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",
        key: "ep9fru"
    }]])
      , uH = or("Activity", [["path", {
        d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
        key: "169zse"
    }]])
      , uU = or("User", [["path", {
        d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
        key: "975kel"
    }], ["circle", {
        cx: "12",
        cy: "7",
        r: "4",
        key: "17ys0d"
    }]])
      , uq = or("Target", [["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }], ["circle", {
        cx: "12",
        cy: "12",
        r: "6",
        key: "1vlfrh"
    }], ["circle", {
        cx: "12",
        cy: "12",
        r: "2",
        key: "1c9p78"
    }]])
      , uW = or("Lock", [["rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1"
    }], ["path", {
        d: "M7 11V7a5 5 0 0 1 10 0v4",
        key: "fwvmzm"
    }]])
      , uY = or("Send", [["path", {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
    }], ["path", {
        d: "m21.854 2.147-10.94 10.939",
        key: "12cjpa"
    }]])
      , uG = or("Lightbulb", [["path", {
        d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
        key: "1gvzjb"
    }], ["path", {
        d: "M9 18h6",
        key: "x1upvd"
    }], ["path", {
        d: "M10 22h4",
        key: "ceow96"
    }]])
      , uX = {
        persona: {
            icon: uU,
            color: "var(--node-persona)",
            label: "Persona"
        },
        task: {
            icon: uq,
            color: "var(--node-task)",
            label: "Task"
        },
        constraints: {
            icon: uW,
            color: "var(--node-constraints)",
            label: "Constraints"
        },
        context: {
            icon: oa,
            color: "var(--node-context)",
            label: "Context"
        },
        output: {
            icon: uY,
            color: "var(--node-output)",
            label: "Output"
        },
        examples: {
            icon: uG,
            color: "var(--node-examples)",
            label: "Examples"
        },
        metadata: {
            icon: or("Tag", [["path", {
                d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
                key: "vktsd0"
            }], ["circle", {
                cx: "7.5",
                cy: "7.5",
                r: ".5",
                fill: "currentColor",
                key: "kqv944"
            }]]),
            color: "var(--node-metadata)",
            label: "Metadata"
        }
    };
    function uJ({node: e, graph: t, onClose: r, onNodeSelect: n}) {
        if (!e || !t)
            return null;
        let i = uX[e.category]
          , a = t.relationships.filter(t => {
            let r = "string" == typeof t.source ? t.source : t.source.id
              , n = "string" == typeof t.target ? t.target : t.target.id;
            return r === e.id || n === e.id
        }
        )
          , s = a.filter(t => ("string" == typeof t.target ? t.target : t.target.id) === e.id)
          , o = a.filter(t => ("string" == typeof t.source ? t.source : t.source.id) === e.id)
          , l = e => t.nodes.find(t => t.id === e);
        return (0,
        d.jsx)(s9, {
            children: (0,
            d.jsxs)(sQ.div, {
                initial: {
                    opacity: 0,
                    x: 20
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                exit: {
                    opacity: 0,
                    x: 20
                },
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                },
                className: "absolute top-0 right-0 w-80 h-full bg-[var(--bg-card)] border-l border-[var(--border-subtle)] shadow-xl overflow-hidden flex flex-col z-20",
                children: [(0,
                d.jsx)("div", {
                    className: "p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]",
                    children: (0,
                    d.jsxs)("div", {
                        className: "flex items-start justify-between gap-3",
                        children: [(0,
                        d.jsxs)("div", {
                            className: "flex items-center gap-3 min-w-0",
                            children: [(0,
                            d.jsx)("div", {
                                className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                style: {
                                    backgroundColor: `${i.color}20`,
                                    color: i.color
                                },
                                children: (0,
                                d.jsx)(i.icon, {
                                    className: "w-5 h-5"
                                })
                            }), (0,
                            d.jsxs)("div", {
                                className: "min-w-0",
                                children: [(0,
                                d.jsx)("h3", {
                                    className: "font-semibold text-[var(--text-primary)] truncate",
                                    children: e.label
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-xs text-[var(--text-muted)]",
                                    children: i.label
                                })]
                            })]
                        }), (0,
                        d.jsx)("button", {
                            onClick: r,
                            className: "p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors flex-shrink-0",
                            children: (0,
                            d.jsx)(op, {
                                className: "w-5 h-5"
                            })
                        })]
                    })
                }), (0,
                d.jsxs)("div", {
                    className: "flex-1 overflow-auto p-4 space-y-5",
                    children: [e.description && (0,
                    d.jsxs)("section", {
                        children: [(0,
                        d.jsx)("h4", {
                            className: "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2",
                            children: "Description"
                        }), (0,
                        d.jsx)("p", {
                            className: "text-sm text-[var(--text-secondary)] leading-relaxed",
                            children: e.description
                        })]
                    }), (0,
                    d.jsxs)("section", {
                        children: [(0,
                        d.jsx)("h4", {
                            className: "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2",
                            children: "Properties"
                        }), (0,
                        d.jsxs)("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "p-3 bg-[var(--bg-secondary)] rounded-lg",
                                children: [(0,
                                d.jsxs)("div", {
                                    className: "flex items-center gap-2 text-[var(--text-muted)] mb-1",
                                    children: [(0,
                                    d.jsx)(uH, {
                                        className: "w-3.5 h-3.5"
                                    }), (0,
                                    d.jsx)("span", {
                                        className: "text-xs",
                                        children: "Weight"
                                    })]
                                }), (0,
                                d.jsxs)("p", {
                                    className: "text-lg font-semibold text-[var(--text-primary)]",
                                    children: [Math.round(100 * e.weight), "%"]
                                }), (0,
                                d.jsx)("div", {
                                    className: "mt-1.5 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden",
                                    children: (0,
                                    d.jsx)("div", {
                                        className: "h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all",
                                        style: {
                                            width: `${100 * e.weight}%`
                                        }
                                    })
                                })]
                            }), (0,
                            d.jsxs)("div", {
                                className: "p-3 bg-[var(--bg-secondary)] rounded-lg",
                                children: [(0,
                                d.jsxs)("div", {
                                    className: "flex items-center gap-2 text-[var(--text-muted)] mb-1",
                                    children: [(0,
                                    d.jsx)(uB, {
                                        className: "w-3.5 h-3.5"
                                    }), (0,
                                    d.jsx)("span", {
                                        className: "text-xs",
                                        children: "Depth"
                                    })]
                                }), (0,
                                d.jsxs)("p", {
                                    className: "text-lg font-semibold text-[var(--text-primary)]",
                                    children: ["Level ", e.depth]
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-xs text-[var(--text-muted)] mt-1",
                                    children: 0 === e.depth ? "Root" : 1 === e.depth ? "Primary" : "Secondary"
                                })]
                            }), (0,
                            d.jsxs)("div", {
                                className: "p-3 bg-[var(--bg-secondary)] rounded-lg",
                                children: [(0,
                                d.jsxs)("div", {
                                    className: "flex items-center gap-2 text-[var(--text-muted)] mb-1",
                                    children: [(0,
                                    d.jsx)(uF, {
                                        className: "w-3.5 h-3.5"
                                    }), (0,
                                    d.jsx)("span", {
                                        className: "text-xs",
                                        children: "Incoming"
                                    })]
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-lg font-semibold text-[var(--text-primary)]",
                                    children: s.length
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-xs text-[var(--text-muted)] mt-1",
                                    children: 0 === s.length ? "Independent" : "Dependencies"
                                })]
                            }), (0,
                            d.jsxs)("div", {
                                className: "p-3 bg-[var(--bg-secondary)] rounded-lg",
                                children: [(0,
                                d.jsxs)("div", {
                                    className: "flex items-center gap-2 text-[var(--text-muted)] mb-1",
                                    children: [(0,
                                    d.jsx)(u$, {
                                        className: "w-3.5 h-3.5"
                                    }), (0,
                                    d.jsx)("span", {
                                        className: "text-xs",
                                        children: "Outgoing"
                                    })]
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-lg font-semibold text-[var(--text-primary)]",
                                    children: o.length
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-xs text-[var(--text-muted)] mt-1",
                                    children: 0 === o.length ? "Terminal" : "Influences"
                                })]
                            })]
                        }), void 0 !== e.confidence && (0,
                        d.jsxs)("div", {
                            className: "mt-3 p-3 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-lg border border-[var(--border-subtle)]",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [(0,
                                d.jsx)("span", {
                                    className: "text-xs font-medium text-[var(--text-muted)]",
                                    children: "Confidence"
                                }), (0,
                                d.jsxs)("span", {
                                    className: "text-sm font-semibold text-[var(--text-primary)]",
                                    children: [Math.round(100 * e.confidence), "%"]
                                })]
                            }), (0,
                            d.jsx)("div", {
                                className: "h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden",
                                children: (0,
                                d.jsx)("div", {
                                    className: "h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all",
                                    style: {
                                        width: `${100 * e.confidence}%`
                                    }
                                })
                            })]
                        })]
                    }), s.length > 0 && (0,
                    d.jsxs)("section", {
                        children: [(0,
                        d.jsxs)("h4", {
                            className: "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-2",
                            children: [(0,
                            d.jsx)(uF, {
                                className: "w-3.5 h-3.5"
                            }), "Incoming (", s.length, ")"]
                        }), (0,
                        d.jsx)("div", {
                            className: "space-y-1.5",
                            children: s.map( (e, t) => {
                                let r = "string" == typeof e.source ? e.source : e.source.id
                                  , i = l(r);
                                if (!i)
                                    return null;
                                let a = uX[i.category];
                                return (0,
                                d.jsxs)("button", {
                                    onClick: () => n(r),
                                    className: "w-full flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors text-left",
                                    children: [(0,
                                    d.jsx)("div", {
                                        className: "w-6 h-6 rounded-md flex items-center justify-center",
                                        style: {
                                            backgroundColor: `${a.color}20`,
                                            color: a.color
                                        },
                                        children: (0,
                                        d.jsx)(a.icon, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    }), (0,
                                    d.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [(0,
                                        d.jsx)("p", {
                                            className: "text-sm text-[var(--text-primary)] truncate font-medium",
                                            children: i.label
                                        }), (0,
                                        d.jsxs)("div", {
                                            className: "flex items-center gap-2 mt-0.5",
                                            children: [(0,
                                            d.jsx)("span", {
                                                className: `text-xs px-1.5 py-0.5 rounded ${"requires" === e.type ? "bg-blue-500/20 text-blue-400" : "conflicts" === e.type ? "bg-red-500/20 text-red-400" : "bg-gray-500/20 text-gray-400"}`,
                                                children: e.type
                                            }), (0,
                                            d.jsxs)("span", {
                                                className: "text-xs text-[var(--text-muted)]",
                                                children: [Math.round(100 * e.strength), "% strength"]
                                            })]
                                        })]
                                    }), (0,
                                    d.jsx)(u$, {
                                        className: "w-4 h-4 text-[var(--text-muted)]"
                                    })]
                                }, t)
                            }
                            )
                        })]
                    }), o.length > 0 && (0,
                    d.jsxs)("section", {
                        children: [(0,
                        d.jsxs)("h4", {
                            className: "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-2",
                            children: [(0,
                            d.jsx)(u$, {
                                className: "w-3.5 h-3.5"
                            }), "Outgoing (", o.length, ")"]
                        }), (0,
                        d.jsx)("div", {
                            className: "space-y-1.5",
                            children: o.map( (e, t) => {
                                let r = "string" == typeof e.target ? e.target : e.target.id
                                  , i = l(r);
                                if (!i)
                                    return null;
                                let a = uX[i.category];
                                return (0,
                                d.jsxs)("button", {
                                    onClick: () => n(r),
                                    className: "w-full flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors text-left",
                                    children: [(0,
                                    d.jsx)("div", {
                                        className: "w-6 h-6 rounded-md flex items-center justify-center",
                                        style: {
                                            backgroundColor: `${a.color}20`,
                                            color: a.color
                                        },
                                        children: (0,
                                        d.jsx)(a.icon, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    }), (0,
                                    d.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [(0,
                                        d.jsx)("p", {
                                            className: "text-sm text-[var(--text-primary)] truncate font-medium",
                                            children: i.label
                                        }), (0,
                                        d.jsxs)("div", {
                                            className: "flex items-center gap-2 mt-0.5",
                                            children: [(0,
                                            d.jsx)("span", {
                                                className: `text-xs px-1.5 py-0.5 rounded ${"requires" === e.type ? "bg-blue-500/20 text-blue-400" : "conflicts" === e.type ? "bg-red-500/20 text-red-400" : "bg-gray-500/20 text-gray-400"}`,
                                                children: e.type
                                            }), (0,
                                            d.jsxs)("span", {
                                                className: "text-xs text-[var(--text-muted)]",
                                                children: [Math.round(100 * e.strength), "% strength"]
                                            })]
                                        })]
                                    }), (0,
                                    d.jsx)(u$, {
                                        className: "w-4 h-4 text-[var(--text-muted)]"
                                    })]
                                }, t)
                            }
                            )
                        })]
                    }), 0 === a.length && (0,
                    d.jsxs)("section", {
                        className: "text-center py-4",
                        children: [(0,
                        d.jsx)(uV, {
                            className: "w-8 h-8 text-[var(--text-muted)] mx-auto mb-2 opacity-50"
                        }), (0,
                        d.jsx)("p", {
                            className: "text-sm text-[var(--text-muted)]",
                            children: "No connections to other nodes"
                        })]
                    })]
                }), (0,
                d.jsxs)("div", {
                    className: "p-3 border-t border-[var(--border-subtle)] flex gap-2",
                    children: [(0,
                    d.jsxs)("button", {
                        onClick: () => {
                            let t = `${e.label}
Category: ${i.label}
Weight: ${Math.round(100 * e.weight)}%
${e.description || ""}`;
                            navigator.clipboard.writeText(t),
                            h.toast.success("Node info copied")
                        }
                        ,
                        className: "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors",
                        children: [(0,
                        d.jsx)(oA, {
                            className: "w-4 h-4"
                        }), "Copy Info"]
                    }), (0,
                    d.jsxs)("button", {
                        onClick: r,
                        className: "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors",
                        children: [(0,
                        d.jsx)(oJ, {
                            className: "w-4 h-4"
                        }), "Focus"]
                    })]
                })]
            })
        })
    }
    let uK = or("Filter", [["polygon", {
        points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",
        key: "1yg77f"
    }]])
      , uZ = or("Search", [["circle", {
        cx: "11",
        cy: "11",
        r: "8",
        key: "4ej97u"
    }], ["path", {
        d: "m21 21-4.3-4.3",
        key: "1qie3q"
    }]])
      , uQ = or("ChevronUp", [["path", {
        d: "m18 15-6-6-6 6",
        key: "153udz"
    }]])
      , u0 = [{
        id: "force",
        icon: (0,
        d.jsx)(oQ, {
            className: "w-4 h-4"
        }),
        label: "Force"
    }, {
        id: "radial",
        icon: (0,
        d.jsx)(o0, {
            className: "w-4 h-4"
        }),
        label: "Radial"
    }, {
        id: "hierarchy",
        icon: (0,
        d.jsx)(o1, {
            className: "w-4 h-4"
        }),
        label: "Tree"
    }, {
        id: "cluster",
        icon: (0,
        d.jsx)(o2, {
            className: "w-4 h-4"
        }),
        label: "Cluster"
    }]
      , u1 = [{
        id: "task",
        color: "var(--node-task)",
        label: "Task"
    }, {
        id: "context",
        color: "var(--node-context)",
        label: "Context"
    }, {
        id: "output",
        color: "var(--node-output)",
        label: "Output"
    }, {
        id: "constraints",
        color: "var(--node-constraints)",
        label: "Constraints"
    }, {
        id: "examples",
        color: "var(--node-examples)",
        label: "Examples"
    }];
    function u2({currentLayout: e, onLayoutChange: t, categoryFilters: r, onCategoryFilterToggle: n, searchQuery: i, onSearchChange: a, nodeCount: s}) {
        let[o,l] = (0,
        p.useState)(!1)
          , [c,u] = (0,
        p.useState)(!1)
          , [h,m] = (0,
        p.useState)(!0)
          , [f,x] = (0,
        p.useState)(!1);
        (0,
        p.useEffect)( () => {
            if (f || o || c)
                return;
            let e = setTimeout( () => {
                m(!1)
            }
            , 4e3);
            return () => clearTimeout(e)
        }
        , [f, o, c, e]);
        let y = (0,
        p.useCallback)( () => {
            m(!0)
        }
        , [])
          , v = r.size
          , g = u0.findIndex(t => t.id === e);
        return (0,
        d.jsxs)(d.Fragment, {
            children: [(0,
            d.jsx)("div", {
                className: "absolute inset-0 z-0",
                onMouseMove: y,
                onTouchStart: y
            }), (0,
            d.jsx)(s9, {
                children: !h && (0,
                d.jsxs)(sQ.button, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 20
                    },
                    onClick: () => m(!0),
                    className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-[var(--bg-card)]/80 backdrop-blur-sm rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2",
                    children: [(0,
                    d.jsx)(uQ, {
                        className: "w-4 h-4"
                    }), (0,
                    d.jsx)("span", {
                        className: "text-xs font-medium",
                        children: "Show Controls"
                    })]
                })
            }), (0,
            d.jsx)(s9, {
                children: h && (0,
                d.jsx)(sQ.div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 20
                    },
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    },
                    onMouseEnter: () => x(!0),
                    onMouseLeave: () => x(!1),
                    className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden",
                    children: (0,
                    d.jsx)("div", {
                        className: "flex items-center gap-2 p-2 bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-2xl",
                        children: (0,
                        d.jsx)(sQ.button, {
                            whileTap: {
                                scale: .9
                            },
                            onClick: () => {
                                let e = (g + 1) % u0.length;
                                t(u0[e].id)
                            }
                            ,
                            className: "relative p-3 rounded-xl bg-[var(--accent-primary)] text-white",
                            title: `Layout: ${u0[g].label}`,
                            children: u0[g].icon
                        })
                    })
                })
            }), (0,
            d.jsx)(s9, {
                children: h && (0,
                d.jsxs)(sQ.div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 20
                    },
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    },
                    onMouseEnter: () => x(!0),
                    onMouseLeave: () => x(!1),
                    className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:block",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex items-center gap-1 p-1.5 bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-2xl",
                        children: [(0,
                        d.jsx)(sQ.button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: .95
                            },
                            onClick: () => {
                                u(!c),
                                l(!1)
                            }
                            ,
                            className: `p-2.5 rounded-xl transition-colors ${c ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}`,
                            title: "Search nodes",
                            children: (0,
                            d.jsx)(uZ, {
                                className: "w-4 h-4"
                            })
                        }), (0,
                        d.jsx)("div", {
                            className: "w-px h-6 bg-[var(--border-subtle)] mx-1"
                        }), u0.map(r => (0,
                        d.jsxs)(sQ.button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: .95
                            },
                            onClick: () => t(r.id),
                            className: `relative p-2.5 rounded-xl transition-colors ${e === r.id ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}`,
                            title: r.label,
                            children: [e === r.id && (0,
                            d.jsx)(sQ.div, {
                                layoutId: "activeLayout",
                                className: "absolute inset-0 bg-[var(--accent-primary)] rounded-xl",
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }
                            }), (0,
                            d.jsx)("span", {
                                className: "relative z-10",
                                children: r.icon
                            })]
                        }, r.id)), (0,
                        d.jsx)("div", {
                            className: "w-px h-6 bg-[var(--border-subtle)] mx-1"
                        }), (0,
                        d.jsxs)(sQ.button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: .95
                            },
                            onClick: () => {
                                l(!o),
                                u(!1)
                            }
                            ,
                            className: `relative p-2.5 rounded-xl transition-colors ${o ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}`,
                            title: "Filter categories",
                            children: [(0,
                            d.jsx)(uK, {
                                className: "w-4 h-4"
                            }), v > 0 && (0,
                            d.jsx)("span", {
                                className: "absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-secondary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center",
                                children: v
                            })]
                        }), (0,
                        d.jsx)("div", {
                            className: "px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-secondary)] rounded-lg ml-1",
                            children: s
                        })]
                    }), (0,
                    d.jsx)(s9, {
                        children: c && (0,
                        d.jsx)(sQ.div, {
                            initial: {
                                opacity: 0,
                                y: 10,
                                scale: .95
                            },
                            animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                y: 10,
                                scale: .95
                            },
                            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64",
                            children: (0,
                            d.jsxs)("div", {
                                className: "relative",
                                children: [(0,
                                d.jsx)(uZ, {
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                                }), (0,
                                d.jsx)("input", {
                                    type: "text",
                                    value: i,
                                    onChange: e => a(e.target.value),
                                    placeholder: "Search nodes...",
                                    autoFocus: !0,
                                    className: "w-full pl-10 pr-8 py-3 text-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none shadow-lg"
                                }), i && (0,
                                d.jsx)("button", {
                                    onClick: () => a(""),
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors",
                                    children: (0,
                                    d.jsx)(op, {
                                        className: "w-4 h-4"
                                    })
                                })]
                            })
                        })
                    }), (0,
                    d.jsx)(s9, {
                        children: o && (0,
                        d.jsx)(sQ.div, {
                            initial: {
                                opacity: 0,
                                y: 10,
                                scale: .95
                            },
                            animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                y: 10,
                                scale: .95
                            },
                            className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
                            children: (0,
                            d.jsx)("div", {
                                className: "p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-lg",
                                children: (0,
                                d.jsx)("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: u1.map(e => {
                                        let t = r.has(e.id);
                                        return (0,
                                        d.jsxs)(sQ.button, {
                                            whileHover: {
                                                scale: 1.05
                                            },
                                            whileTap: {
                                                scale: .95
                                            },
                                            onClick: () => n(e.id),
                                            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${t ? "bg-[var(--bg-secondary)] text-[var(--text-muted)] opacity-50" : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"}`,
                                            children: [(0,
                                            d.jsx)("div", {
                                                className: "w-2.5 h-2.5 rounded-full transition-colors",
                                                style: {
                                                    backgroundColor: t ? "var(--text-muted)" : e.color
                                                }
                                            }), e.label]
                                        }, e.id)
                                    }
                                    )
                                })
                            })
                        })
                    })]
                })
            })]
        })
    }
    let u5 = {
        persona: "var(--node-persona)",
        task: "var(--node-task)",
        constraints: "var(--node-constraints)",
        context: "var(--node-context)",
        output: "var(--node-output)",
        examples: "var(--node-examples)",
        metadata: "var(--node-metadata)"
    }
      , u4 = {
        influences: {
            dasharray: "none",
            opacity: .6
        },
        requires: {
            dasharray: "8,4",
            opacity: .5
        },
        conflicts: {
            dasharray: "3,3",
            opacity: .4
        }
    };
    function u3({graph: e, onNodeClick: t, onNodeHover: r, className: n="", selectedNodeId: i, hideControls: a=!1, initialLayout: s="force"}) {
        let o = (0,
        p.useRef)(null)
          , l = (0,
        p.useRef)(null)
          , [c,u] = (0,
        p.useState)({
            width: 600,
            height: 400
        })
          , [h,m] = (0,
        p.useState)(null)
          , f = (0,
        p.useRef)(null)
          , [x,y] = (0,
        p.useState)(null)
          , [v,g] = (0,
        p.useState)(!1)
          , [b,w] = (0,
        p.useState)(s)
          , [j,N] = (0,
        p.useState)(new Set)
          , [k,S] = (0,
        p.useState)("");
        (0,
        p.useEffect)( () => {
            w(s)
        }
        , [s]);
        let C = i ?? x
          , M = e?.nodes.find(e => e.id === C) || null
          , A = (0,
        p.useMemo)( () => {
            if (!e)
                return null;
            let t = e.nodes;
            if (j.size > 0 && (t = t.filter(e => !j.has(e.category))),
            k.trim()) {
                let e = k.toLowerCase();
                t = t.filter(t => t.label.toLowerCase().includes(e) || t.description?.toLowerCase().includes(e))
            }
            let r = new Set(t.map(e => e.id))
              , n = e.relationships.filter(e => {
                let t = "string" == typeof e.source ? e.source : e.source.id
                  , n = "string" == typeof e.target ? e.target : e.target.id;
                return r.has(t) && r.has(n)
            }
            );
            return {
                ...e,
                nodes: t,
                relationships: n
            }
        }
        , [e, j, k])
          , T = (0,
        p.useCallback)(e => {
            N(t => {
                let r = new Set(t);
                return r.has(e) ? r.delete(e) : r.add(e),
                r
            }
            )
        }
        , []);
        (0,
        p.useEffect)( () => {
            if (!o.current)
                return;
            let e = new ResizeObserver(e => {
                let {width: t, height: r} = e[0].contentRect;
                t > 0 && r > 0 && u({
                    width: t,
                    height: r
                })
            }
            );
            return e.observe(o.current),
            () => e.disconnect()
        }
        , []),
        (0,
        p.useEffect)( () => {
            let e;
            if (!l.current || !A || !A.nodes.length)
                return;
            let n = lO(l.current)
              , {width: i, height: a} = c;
            n.selectAll("*").remove();
            let s = n.append("defs").append("filter").attr("id", "glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
            s.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
            let o = s.append("feMerge");
            o.append("feMergeNode").attr("in", "coloredBlur"),
            o.append("feMergeNode").attr("in", "SourceGraphic");
            let u = n.append("g").attr("class", "graph-container")
              , d = (function() {
                var e, t, r, n = uu, i = ud, a = uf, s = up, o = um, l = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], u = 250, d = un, h = o4("start", "zoom", "end"), p = 0, m = 10;
                function f(e) {
                    e.property("__zoom", uh).on("wheel.zoom", j, {
                        passive: !1
                    }).on("mousedown.zoom", N).on("dblclick.zoom", k).filter(o).on("touchstart.zoom", S).on("touchmove.zoom", C).on("touchend.zoom touchcancel.zoom", M).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                }
                function x(e, t) {
                    return (t = Math.max(l[0], Math.min(l[1], t))) === e.k ? e : new us(t,e.x,e.y)
                }
                function y(e, t, r) {
                    var n = t[0] - r[0] * e.k
                      , i = t[1] - r[1] * e.k;
                    return n === e.x && i === e.y ? e : new us(e.k,n,i)
                }
                function v(e) {
                    return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2]
                }
                function g(e, t, r, n) {
                    e.on("start.zoom", function() {
                        b(this, arguments).event(n).start()
                    }).on("interrupt.zoom end.zoom", function() {
                        b(this, arguments).event(n).end()
                    }).tween("zoom", function() {
                        var e = arguments
                          , a = b(this, e).event(n)
                          , s = i.apply(this, e)
                          , o = null == r ? v(s) : "function" == typeof r ? r.apply(this, e) : r
                          , l = Math.max(s[1][0] - s[0][0], s[1][1] - s[0][1])
                          , c = this.__zoom
                          , u = "function" == typeof t ? t.apply(this, e) : t
                          , h = d(c.invert(o).concat(l / c.k), u.invert(o).concat(l / u.k));
                        return function(e) {
                            if (1 === e)
                                e = u;
                            else {
                                var t = h(e)
                                  , r = l / t[2];
                                e = new us(r,o[0] - t[0] * r,o[1] - t[1] * r)
                            }
                            a.zoom(null, e)
                        }
                    })
                }
                function b(e, t, r) {
                    return !r && e.__zooming || new w(e,t)
                }
                function w(e, t) {
                    this.that = e,
                    this.args = t,
                    this.active = 0,
                    this.sourceEvent = null,
                    this.extent = i.apply(e, t),
                    this.taps = 0
                }
                function j(e, ...t) {
                    if (n.apply(this, arguments)) {
                        var r = b(this, t).event(e)
                          , i = this.__zoom
                          , o = Math.max(l[0], Math.min(l[1], i.k * Math.pow(2, s.apply(this, arguments))))
                          , u = cw(e);
                        if (r.wheel)
                            (r.mouse[0][0] !== u[0] || r.mouse[0][1] !== u[1]) && (r.mouse[1] = i.invert(r.mouse[0] = u)),
                            clearTimeout(r.wheel);
                        else {
                            if (i.k === o)
                                return;
                            r.mouse = [u, i.invert(u)],
                            cY(this),
                            r.start()
                        }
                        uc(e),
                        r.wheel = setTimeout(function() {
                            r.wheel = null,
                            r.end()
                        }, 150),
                        r.zoom("mouse", a(y(x(i, o), r.mouse[0], r.mouse[1]), r.extent, c))
                    }
                }
                function N(e, ...t) {
                    if (!r && n.apply(this, arguments)) {
                        var i = e.currentTarget
                          , s = b(this, t, !0).event(e)
                          , o = lO(e.view).on("mousemove.zoom", function(e) {
                            if (uc(e),
                            !s.moved) {
                                var t = e.clientX - u
                                  , r = e.clientY - d;
                                s.moved = t * t + r * r > p
                            }
                            s.event(e).zoom("mouse", a(y(s.that.__zoom, s.mouse[0] = cw(e, i), s.mouse[1]), s.extent, c))
                        }, !0).on("mouseup.zoom", function(e) {
                            o.on("mousemove.zoom mouseup.zoom", null),
                            lU(e.view, s.moved),
                            uc(e),
                            s.event(e).end()
                        }, !0)
                          , l = cw(e, i)
                          , u = e.clientX
                          , d = e.clientY;
                        lH(e.view),
                        ul(e),
                        s.mouse = [l, this.__zoom.invert(l)],
                        cY(this),
                        s.start()
                    }
                }
                function k(e, ...t) {
                    if (n.apply(this, arguments)) {
                        var r = this.__zoom
                          , s = cw(e.changedTouches ? e.changedTouches[0] : e, this)
                          , o = r.invert(s)
                          , l = r.k * (e.shiftKey ? .5 : 2)
                          , d = a(y(x(r, l), s, o), i.apply(this, t), c);
                        uc(e),
                        u > 0 ? lO(this).transition().duration(u).call(g, d, s, e) : lO(this).call(f.transform, d, s, e)
                    }
                }
                function S(r, ...i) {
                    if (n.apply(this, arguments)) {
                        var a, s, o, l, c = r.touches, u = c.length, d = b(this, i, r.changedTouches.length === u).event(r);
                        for (ul(r),
                        s = 0; s < u; ++s)
                            l = [l = cw(o = c[s], this), this.__zoom.invert(l), o.identifier],
                            d.touch0 ? d.touch1 || d.touch0[2] === l[2] || (d.touch1 = l,
                            d.taps = 0) : (d.touch0 = l,
                            a = !0,
                            d.taps = 1 + !!e);
                        e && (e = clearTimeout(e)),
                        a && (d.taps < 2 && (t = l[0],
                        e = setTimeout(function() {
                            e = null
                        }, 500)),
                        cY(this),
                        d.start())
                    }
                }
                function C(e, ...t) {
                    if (this.__zooming) {
                        var r, n, i, s, o = b(this, t).event(e), l = e.changedTouches, u = l.length;
                        for (uc(e),
                        r = 0; r < u; ++r)
                            i = cw(n = l[r], this),
                            o.touch0 && o.touch0[2] === n.identifier ? o.touch0[0] = i : o.touch1 && o.touch1[2] === n.identifier && (o.touch1[0] = i);
                        if (n = o.that.__zoom,
                        o.touch1) {
                            var d = o.touch0[0]
                              , h = o.touch0[1]
                              , p = o.touch1[0]
                              , m = o.touch1[1]
                              , f = (f = p[0] - d[0]) * f + (f = p[1] - d[1]) * f
                              , v = (v = m[0] - h[0]) * v + (v = m[1] - h[1]) * v;
                            n = x(n, Math.sqrt(f / v)),
                            i = [(d[0] + p[0]) / 2, (d[1] + p[1]) / 2],
                            s = [(h[0] + m[0]) / 2, (h[1] + m[1]) / 2]
                        } else {
                            if (!o.touch0)
                                return;
                            i = o.touch0[0],
                            s = o.touch0[1]
                        }
                        o.zoom("touch", a(y(n, i, s), o.extent, c))
                    }
                }
                function M(e, ...n) {
                    if (this.__zooming) {
                        var i, a, s = b(this, n).event(e), o = e.changedTouches, l = o.length;
                        for (ul(e),
                        r && clearTimeout(r),
                        r = setTimeout(function() {
                            r = null
                        }, 500),
                        i = 0; i < l; ++i)
                            a = o[i],
                            s.touch0 && s.touch0[2] === a.identifier ? delete s.touch0 : s.touch1 && s.touch1[2] === a.identifier && delete s.touch1;
                        if (s.touch1 && !s.touch0 && (s.touch0 = s.touch1,
                        delete s.touch1),
                        s.touch0)
                            s.touch0[1] = this.__zoom.invert(s.touch0[0]);
                        else if (s.end(),
                        2 === s.taps && (a = cw(a, this),
                        Math.hypot(t[0] - a[0], t[1] - a[1]) < m)) {
                            var c = lO(this).on("dblclick.zoom");
                            c && c.apply(this, arguments)
                        }
                    }
                }
                return f.transform = function(e, t, r, n) {
                    var i = e.selection ? e.selection() : e;
                    i.property("__zoom", uh),
                    e !== i ? g(e, t, r, n) : i.interrupt().each(function() {
                        b(this, arguments).event(n).start().zoom(null, "function" == typeof t ? t.apply(this, arguments) : t).end()
                    })
                }
                ,
                f.scaleBy = function(e, t, r, n) {
                    f.scaleTo(e, function() {
                        var e = this.__zoom.k
                          , r = "function" == typeof t ? t.apply(this, arguments) : t;
                        return e * r
                    }, r, n)
                }
                ,
                f.scaleTo = function(e, t, r, n) {
                    f.transform(e, function() {
                        var e = i.apply(this, arguments)
                          , n = this.__zoom
                          , s = null == r ? v(e) : "function" == typeof r ? r.apply(this, arguments) : r
                          , o = n.invert(s)
                          , l = "function" == typeof t ? t.apply(this, arguments) : t;
                        return a(y(x(n, l), s, o), e, c)
                    }, r, n)
                }
                ,
                f.translateBy = function(e, t, r, n) {
                    f.transform(e, function() {
                        return a(this.__zoom.translate("function" == typeof t ? t.apply(this, arguments) : t, "function" == typeof r ? r.apply(this, arguments) : r), i.apply(this, arguments), c)
                    }, null, n)
                }
                ,
                f.translateTo = function(e, t, r, n, s) {
                    f.transform(e, function() {
                        var e = i.apply(this, arguments)
                          , s = this.__zoom
                          , o = null == n ? v(e) : "function" == typeof n ? n.apply(this, arguments) : n;
                        return a(uo.translate(o[0], o[1]).scale(s.k).translate("function" == typeof t ? -t.apply(this, arguments) : -t, "function" == typeof r ? -r.apply(this, arguments) : -r), e, c)
                    }, n, s)
                }
                ,
                w.prototype = {
                    event: function(e) {
                        return e && (this.sourceEvent = e),
                        this
                    },
                    start: function() {
                        return 1 == ++this.active && (this.that.__zooming = this,
                        this.emit("start")),
                        this
                    },
                    zoom: function(e, t) {
                        return this.mouse && "mouse" !== e && (this.mouse[1] = t.invert(this.mouse[0])),
                        this.touch0 && "touch" !== e && (this.touch0[1] = t.invert(this.touch0[0])),
                        this.touch1 && "touch" !== e && (this.touch1[1] = t.invert(this.touch1[0])),
                        this.that.__zoom = t,
                        this.emit("zoom"),
                        this
                    },
                    end: function() {
                        return 0 == --this.active && (delete this.that.__zooming,
                        this.emit("end")),
                        this
                    },
                    emit: function(e) {
                        var t = lO(this.that).datum();
                        h.call(e, this.that, new ua(e,{
                            sourceEvent: this.sourceEvent,
                            target: f,
                            type: e,
                            transform: this.that.__zoom,
                            dispatch: h
                        }), t)
                    }
                },
                f.wheelDelta = function(e) {
                    return arguments.length ? (s = "function" == typeof e ? e : ui(+e),
                    f) : s
                }
                ,
                f.filter = function(e) {
                    return arguments.length ? (n = "function" == typeof e ? e : ui(!!e),
                    f) : n
                }
                ,
                f.touchable = function(e) {
                    return arguments.length ? (o = "function" == typeof e ? e : ui(!!e),
                    f) : o
                }
                ,
                f.extent = function(e) {
                    return arguments.length ? (i = "function" == typeof e ? e : ui([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]),
                    f) : i
                }
                ,
                f.scaleExtent = function(e) {
                    return arguments.length ? (l[0] = +e[0],
                    l[1] = +e[1],
                    f) : [l[0], l[1]]
                }
                ,
                f.translateExtent = function(e) {
                    return arguments.length ? (c[0][0] = +e[0][0],
                    c[1][0] = +e[1][0],
                    c[0][1] = +e[0][1],
                    c[1][1] = +e[1][1],
                    f) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]]
                }
                ,
                f.constrain = function(e) {
                    return arguments.length ? (a = e,
                    f) : a
                }
                ,
                f.duration = function(e) {
                    return arguments.length ? (u = +e,
                    f) : u
                }
                ,
                f.interpolate = function(e) {
                    return arguments.length ? (d = e,
                    f) : d
                }
                ,
                f.on = function() {
                    var e = h.on.apply(h, arguments);
                    return e === h ? f : e
                }
                ,
                f.clickDistance = function(e) {
                    return arguments.length ? (p = (e *= 1) * e,
                    f) : Math.sqrt(p)
                }
                ,
                f.tapDistance = function(e) {
                    return arguments.length ? (m = +e,
                    f) : m
                }
                ,
                f
            }
            )().scaleExtent([.2, 4]).on("zoom", e => {
                u.attr("transform", e.transform)
            }
            );
            n.call(d);
            let h = {
                width: i,
                height: a,
                padding: 50
            };
            e = "radial" === b ? (function(e, t) {
                let {width: r, height: n, padding: i=50} = t
                  , a = r / 2
                  , s = n / 2
                  , o = Math.min(r, n) / 2 - i
                  , l = new Map
                  , c = 0;
                e.forEach(e => {
                    let t = e.depth;
                    c = Math.max(c, t),
                    l.has(t) || l.set(t, []),
                    l.get(t).push(e)
                }
                );
                let u = [];
                return l.forEach( (e, t) => {
                    let r = 0 === c ? 0 : t / c * o
                      , n = 2 * Math.PI / e.length
                      , i = -Math.PI / 2;
                    e.forEach( (e, t) => {
                        let o = i + t * n;
                        u.push({
                            ...e,
                            x: a + r * Math.cos(o),
                            y: s + r * Math.sin(o),
                            fx: null,
                            fy: null
                        })
                    }
                    )
                }
                ),
                u
            }
            )(A.nodes, h).map(e => ({
                ...e,
                vx: 0,
                vy: 0
            })) : "hierarchy" === b ? (function(e, t, r) {
                let {width: n, height: i, padding: a=50} = r
                  , s = new Map;
                e.forEach(e => s.set(e.id, 0)),
                t.forEach(e => {
                    let t = "string" == typeof e.target ? e.target : e.target.id;
                    s.set(t, (s.get(t) || 0) + 1)
                }
                );
                let o = e.filter(e => 0 === e.depth || 0 === s.get(e.id));
                if (0 === o.length) {
                    let t = [...e].sort( (e, t) => t.weight - e.weight);
                    o.push(t[0])
                }
                let l = new Map;
                e.forEach(e => l.set(e.id, [])),
                t.forEach(e => {
                    let t = "string" == typeof e.source ? e.source : e.source.id
                      , r = "string" == typeof e.target ? e.target : e.target.id;
                    l.has(t) && l.get(t).push(r)
                }
                );
                let c = (t, r) => {
                    if (r.has(t))
                        return null;
                    r.add(t);
                    let n = e.find(e => e.id === t);
                    if (!n)
                        return null;
                    let i = (l.get(t) || []).map(e => c(e, r)).filter(e => null !== e);
                    return {
                        id: t,
                        data: n,
                        children: i.length > 0 ? i : void 0
                    }
                }
                  , u = new Set
                  , d = 1 === o.length ? c(o[0].id, u) : {
                    id: "__root__",
                    data: null,
                    children: o.map(e => c(e.id, u)).filter(e => null !== e)
                };
                if (!d)
                    return function(e, t) {
                        let {width: r, height: n, padding: i=50} = t
                          , a = Math.ceil(Math.sqrt(e.length))
                          , s = Math.ceil(e.length / a)
                          , o = (r - 2 * i) / a
                          , l = (n - 2 * i) / s;
                        return e.map( (e, t) => ({
                            ...e,
                            x: i + t % a * o + o / 2,
                            y: i + Math.floor(t / a) * l + l / 2,
                            fx: null,
                            fy: null
                        }))
                    }(e, r);
                let h = n - 2 * a
                  , p = i - 2 * a
                  , m = (e, t) => e.children && 0 !== e.children.length ? Math.max(...e.children.map(e => m(e, t + 1))) : t
                  , f = m(d, 0)
                  , x = new Map
                  , y = 0
                  , v = e => e.children && 0 !== e.children.length ? e.children.reduce( (e, t) => e + v(t), 0) : 1
                  , g = v(d)
                  , b = (e, t) => {
                    let r = 0 === f ? p / 2 : t / f * p;
                    if (!e.children || 0 === e.children.length) {
                        let t = 1 === g ? h / 2 : y / (g - 1) * h;
                        return y++,
                        "__root__" !== e.id && x.set(e.id, {
                            x: t + a,
                            y: r + a
                        }),
                        {
                            min: t,
                            max: t
                        }
                    }
                    let n = e.children.map(e => b(e, t + 1))
                      , i = Math.min(...n.map(e => e.min))
                      , s = Math.max(...n.map(e => e.max));
                    return "__root__" !== e.id && x.set(e.id, {
                        x: (i + s) / 2 + a,
                        y: r + a
                    }),
                    {
                        min: i,
                        max: s
                    }
                }
                ;
                return b(d, 0),
                e.map(e => {
                    let t = x.get(e.id) || {
                        x: n / 2,
                        y: i / 2
                    };
                    return {
                        ...e,
                        x: t.x,
                        y: t.y,
                        fx: null,
                        fy: null
                    }
                }
                )
            }
            )(A.nodes, A.relationships, h).map(e => ({
                ...e,
                vx: 0,
                vy: 0
            })) : "cluster" === b ? (function(e, t) {
                let {width: r, height: n} = t
                  , i = new Map
                  , a = ["task", "persona", "context", "constraints", "output", "examples", "metadata"];
                a.forEach(e => i.set(e, [])),
                e.forEach(e => {
                    i.has(e.category) || i.set(e.category, []),
                    i.get(e.category).push(e)
                }
                );
                let s = a.filter(e => (i.get(e)?.length || 0) > 0)
                  , o = Math.min(r, n) / 3
                  , l = r / 2
                  , c = n / 2
                  , u = new Map;
                s.forEach( (e, t) => {
                    let r = 2 * Math.PI * t / s.length - Math.PI / 2;
                    u.set(e, {
                        x: l + o * Math.cos(r),
                        y: c + o * Math.sin(r)
                    })
                }
                );
                let d = [];
                return i.forEach( (e, t) => {
                    let r = u.get(t) || {
                        x: l,
                        y: c
                    }
                      , n = e.length;
                    if (1 === n)
                        d.push({
                            ...e[0],
                            x: r.x,
                            y: r.y,
                            fx: null,
                            fy: null
                        });
                    else {
                        let t = Math.min(60, 20 + 8 * n);
                        e.forEach( (e, i) => {
                            let a = 2 * Math.PI * i / n;
                            d.push({
                                ...e,
                                x: r.x + t * Math.cos(a),
                                y: r.y + t * Math.sin(a),
                                fx: null,
                                fy: null
                            })
                        }
                        )
                    }
                }
                ),
                d
            }
            )(A.nodes, h).map(e => ({
                ...e,
                vx: 0,
                vy: 0
            })) : A.nodes.map(e => ({
                ...e,
                x: i / 2 + (Math.random() - .5) * 100,
                y: a / 2 + (Math.random() - .5) * 100,
                fx: null,
                fy: null,
                vx: 0,
                vy: 0
            }));
            let p = A.relationships.map(e => ({
                source: "string" == typeof e.source ? e.source : e.source.id,
                target: "string" == typeof e.target ? e.target : e.target.id,
                type: e.type,
                strength: e.strength
            }))
              , v = function(e) {
                let t;
                var r, n = 1, i = .001, a = 1 - Math.pow(.001, 1 / 300), s = 0, o = .6, l = new Map, c = cL(h), u = o4("tick", "end"), d = (t = 1,
                () => (t = (1664525 * t + 0x3c6ef35f) % 0x100000000) / 0x100000000);
                function h() {
                    p(),
                    u.call("tick", r),
                    n < i && (c.stop(),
                    u.call("end", r))
                }
                function p(t) {
                    var i, c, u = e.length;
                    void 0 === t && (t = 1);
                    for (var d = 0; d < t; ++d)
                        for (n += (s - n) * a,
                        l.forEach(function(e) {
                            e(n)
                        }),
                        i = 0; i < u; ++i)
                            null == (c = e[i]).fx ? c.x += c.vx *= o : (c.x = c.fx,
                            c.vx = 0),
                            null == c.fy ? c.y += c.vy *= o : (c.y = c.fy,
                            c.vy = 0);
                    return r
                }
                function m() {
                    for (var t, r = 0, n = e.length; r < n; ++r) {
                        if ((t = e[r]).index = r,
                        null != t.fx && (t.x = t.fx),
                        null != t.fy && (t.y = t.fy),
                        isNaN(t.x) || isNaN(t.y)) {
                            var i = 10 * Math.sqrt(.5 + r)
                              , a = r * uv;
                            t.x = i * Math.cos(a),
                            t.y = i * Math.sin(a)
                        }
                        (isNaN(t.vx) || isNaN(t.vy)) && (t.vx = t.vy = 0)
                    }
                }
                function f(t) {
                    return t.initialize && t.initialize(e, d),
                    t
                }
                return null == e && (e = []),
                m(),
                r = {
                    tick: p,
                    restart: function() {
                        return c.restart(h),
                        r
                    },
                    stop: function() {
                        return c.stop(),
                        r
                    },
                    nodes: function(t) {
                        return arguments.length ? (e = t,
                        m(),
                        l.forEach(f),
                        r) : e
                    },
                    alpha: function(e) {
                        return arguments.length ? (n = +e,
                        r) : n
                    },
                    alphaMin: function(e) {
                        return arguments.length ? (i = +e,
                        r) : i
                    },
                    alphaDecay: function(e) {
                        return arguments.length ? (a = +e,
                        r) : +a
                    },
                    alphaTarget: function(e) {
                        return arguments.length ? (s = +e,
                        r) : s
                    },
                    velocityDecay: function(e) {
                        return arguments.length ? (o = 1 - e,
                        r) : 1 - o
                    },
                    randomSource: function(e) {
                        return arguments.length ? (d = e,
                        l.forEach(f),
                        r) : d
                    },
                    force: function(e, t) {
                        return arguments.length > 1 ? (null == t ? l.delete(e) : l.set(e, f(t)),
                        r) : l.get(e)
                    },
                    find: function(t, r, n) {
                        var i, a, s, o, l, c = 0, u = e.length;
                        for (null == n ? n = 1 / 0 : n *= n,
                        c = 0; c < u; ++c)
                            (s = (i = t - (o = e[c]).x) * i + (a = r - o.y) * a) < n && (l = o,
                            n = s);
                        return l
                    },
                    on: function(e, t) {
                        return arguments.length > 1 ? (u.on(e, t),
                        r) : u.on(e)
                    }
                }
            }(e)
              , w = (function(e) {
                var t, r, n, i, a, s, o = uw, l = function(e) {
                    return 1 / Math.min(i[e.source.index], i[e.target.index])
                }, c = ug(30), u = 1;
                function d(n) {
                    for (var i = 0, o = e.length; i < u; ++i)
                        for (var l, c, d, h, p, m, f, x = 0; x < o; ++x)
                            c = (l = e[x]).source,
                            m = ((m = Math.sqrt((h = (d = l.target).x + d.vx - c.x - c.vx || ub(s)) * h + (p = d.y + d.vy - c.y - c.vy || ub(s)) * p)) - r[x]) / m * n * t[x],
                            h *= m,
                            p *= m,
                            d.vx -= h * (f = a[x]),
                            d.vy -= p * f,
                            c.vx += h * (f = 1 - f),
                            c.vy += p * f
                }
                function h() {
                    if (n) {
                        var s, l, c = n.length, u = e.length, d = new Map(n.map( (e, t) => [o(e, t, n), e]));
                        for (s = 0,
                        i = Array(c); s < u; ++s)
                            (l = e[s]).index = s,
                            "object" != typeof l.source && (l.source = uj(d, l.source)),
                            "object" != typeof l.target && (l.target = uj(d, l.target)),
                            i[l.source.index] = (i[l.source.index] || 0) + 1,
                            i[l.target.index] = (i[l.target.index] || 0) + 1;
                        for (s = 0,
                        a = Array(u); s < u; ++s)
                            l = e[s],
                            a[s] = i[l.source.index] / (i[l.source.index] + i[l.target.index]);
                        t = Array(u),
                        p(),
                        r = Array(u),
                        m()
                    }
                }
                function p() {
                    if (n)
                        for (var r = 0, i = e.length; r < i; ++r)
                            t[r] = +l(e[r], r, e)
                }
                function m() {
                    if (n)
                        for (var t = 0, i = e.length; t < i; ++t)
                            r[t] = +c(e[t], t, e)
                }
                return null == e && (e = []),
                d.initialize = function(e, t) {
                    n = e,
                    s = t,
                    h()
                }
                ,
                d.links = function(t) {
                    return arguments.length ? (e = t,
                    h(),
                    d) : e
                }
                ,
                d.id = function(e) {
                    return arguments.length ? (o = e,
                    d) : o
                }
                ,
                d.iterations = function(e) {
                    return arguments.length ? (u = +e,
                    d) : u
                }
                ,
                d.strength = function(e) {
                    return arguments.length ? (l = "function" == typeof e ? e : ug(+e),
                    p(),
                    d) : l
                }
                ,
                d.distance = function(e) {
                    return arguments.length ? (c = "function" == typeof e ? e : ug(+e),
                    m(),
                    d) : c
                }
                ,
                d
            }
            )(p).id(e => e.id);
            "force" === b ? v.force("link", w.distance(120).strength(e => .5 * e.strength)).force("charge", (function() {
                var e, t, r, n, i, a = ug(-30), s = 1, o = 1 / 0, l = .81;
                function c(r) {
                    var i, a = e.length, s = uM(e, ux, uy).visitAfter(d);
                    for (n = r,
                    i = 0; i < a; ++i)
                        t = e[i],
                        s.visit(h)
                }
                function u() {
                    if (e) {
                        var t, r, n = e.length;
                        for (t = 0,
                        i = Array(n); t < n; ++t)
                            i[(r = e[t]).index] = +a(r, t, e)
                    }
                }
                function d(e) {
                    var t, r, n, a, s, o = 0, l = 0;
                    if (e.length) {
                        for (n = a = s = 0; s < 4; ++s)
                            (t = e[s]) && (r = Math.abs(t.value)) && (o += t.value,
                            l += r,
                            n += r * t.x,
                            a += r * t.y);
                        e.x = n / l,
                        e.y = a / l
                    } else {
                        (t = e).x = t.data.x,
                        t.y = t.data.y;
                        do
                            o += i[t.data.index];
                        while (t = t.next)
                    }
                    e.value = o
                }
                function h(e, a, c, u) {
                    if (!e.value)
                        return !0;
                    var d = e.x - t.x
                      , h = e.y - t.y
                      , p = u - a
                      , m = d * d + h * h;
                    if (p * p / l < m)
                        return m < o && (0 === d && (m += (d = ub(r)) * d),
                        0 === h && (m += (h = ub(r)) * h),
                        m < s && (m = Math.sqrt(s * m)),
                        t.vx += d * e.value * n / m,
                        t.vy += h * e.value * n / m),
                        !0;
                    if (!e.length && !(m >= o)) {
                        (e.data !== t || e.next) && (0 === d && (m += (d = ub(r)) * d),
                        0 === h && (m += (h = ub(r)) * h),
                        m < s && (m = Math.sqrt(s * m)));
                        do
                            e.data !== t && (p = i[e.data.index] * n / m,
                            t.vx += d * p,
                            t.vy += h * p);
                        while (e = e.next)
                    }
                }
                return c.initialize = function(t, n) {
                    e = t,
                    r = n,
                    u()
                }
                ,
                c.strength = function(e) {
                    return arguments.length ? (a = "function" == typeof e ? e : ug(+e),
                    u(),
                    c) : a
                }
                ,
                c.distanceMin = function(e) {
                    return arguments.length ? (s = e * e,
                    c) : Math.sqrt(s)
                }
                ,
                c.distanceMax = function(e) {
                    return arguments.length ? (o = e * e,
                    c) : Math.sqrt(o)
                }
                ,
                c.theta = function(e) {
                    return arguments.length ? (l = e * e,
                    c) : Math.sqrt(l)
                }
                ,
                c
            }
            )().strength(-400)).force("center", function(e, t) {
                var r, n = 1;
                function i() {
                    var i, a, s = r.length, o = 0, l = 0;
                    for (i = 0; i < s; ++i)
                        o += (a = r[i]).x,
                        l += a.y;
                    for (o = (o / s - e) * n,
                    l = (l / s - t) * n,
                    i = 0; i < s; ++i)
                        a = r[i],
                        a.x -= o,
                        a.y -= l
                }
                return null == e && (e = 0),
                null == t && (t = 0),
                i.initialize = function(e) {
                    r = e
                }
                ,
                i.x = function(t) {
                    return arguments.length ? (e = +t,
                    i) : e
                }
                ,
                i.y = function(e) {
                    return arguments.length ? (t = +e,
                    i) : t
                }
                ,
                i.strength = function(e) {
                    return arguments.length ? (n = +e,
                    i) : n
                }
                ,
                i
            }(i / 2, a / 2)).force("collision", (function(e) {
                var t, r, n, i = 1, a = 1;
                function s() {
                    for (var e, s, l, c, u, d, h, p = t.length, m = 0; m < a; ++m)
                        for (e = 0,
                        s = uM(t, u_, uE).visitAfter(o); e < p; ++e)
                            h = (d = r[(l = t[e]).index]) * d,
                            c = l.x + l.vx,
                            u = l.y + l.vy,
                            s.visit(f);
                    function f(e, t, r, a, s) {
                        var o = e.data
                          , p = e.r
                          , m = d + p;
                        if (o) {
                            if (o.index > l.index) {
                                var f = c - o.x - o.vx
                                  , x = u - o.y - o.vy
                                  , y = f * f + x * x;
                                y < m * m && (0 === f && (y += (f = ub(n)) * f),
                                0 === x && (y += (x = ub(n)) * x),
                                y = (m - (y = Math.sqrt(y))) / y * i,
                                l.vx += (f *= y) * (m = (p *= p) / (h + p)),
                                l.vy += (x *= y) * m,
                                o.vx -= f * (m = 1 - m),
                                o.vy -= x * m)
                            }
                            return
                        }
                        return t > c + m || a < c - m || r > u + m || s < u - m
                    }
                }
                function o(e) {
                    if (e.data)
                        return e.r = r[e.data.index];
                    for (var t = e.r = 0; t < 4; ++t)
                        e[t] && e[t].r > e.r && (e.r = e[t].r)
                }
                function l() {
                    if (t) {
                        var n, i, a = t.length;
                        for (n = 0,
                        r = Array(a); n < a; ++n)
                            r[(i = t[n]).index] = +e(i, n, t)
                    }
                }
                return "function" != typeof e && (e = ug(null == e ? 1 : +e)),
                s.initialize = function(e, r) {
                    t = e,
                    n = r,
                    l()
                }
                ,
                s.iterations = function(e) {
                    return arguments.length ? (a = +e,
                    s) : a
                }
                ,
                s.strength = function(e) {
                    return arguments.length ? (i = +e,
                    s) : i
                }
                ,
                s.radius = function(t) {
                    return arguments.length ? (e = "function" == typeof t ? t : ug(+t),
                    l(),
                    s) : e
                }
                ,
                s
            }
            )().radius(e => u6(e) + 10)) : (v.force("link", w.distance(0).strength(0)).alpha(0).stop(),
            v.tick()),
            f.current = v;
            let j = u.append("g").attr("class", "links").selectAll("line").data(p).enter().append("line").attr("stroke", e => "requires" === e.type ? "var(--accent-primary)" : "conflicts" === e.type ? "var(--error)" : "var(--text-muted)").attr("stroke-width", e => Math.max(1.5, 3 * e.strength)).attr("stroke-dasharray", e => u4[e.type]?.dasharray || "none").attr("opacity", e => u4[e.type]?.opacity || .5).attr("stroke-linecap", "round").style("transition", "all 0.3s ease")
              , N = u.append("g").attr("class", "nodes").selectAll("g").data(e).enter().append("g").attr("class", "node").attr("cursor", "pointer").call((function() {
                var e, t, r, n, i = uR, a = uL, s = uz, o = uO, l = {}, c = o4("start", "drag", "end"), u = 0, d = 0;
                function h(e) {
                    e.on("mousedown.drag", p).filter(o).on("touchstart.drag", x).on("touchmove.drag", y, lV).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                }
                function p(s, o) {
                    if (!n && i.call(this, s, o)) {
                        var l = g(this, a.call(this, s, o), s, o, "mouse");
                        l && (lO(s.view).on("mousemove.drag", m, l$).on("mouseup.drag", f, l$),
                        lH(s.view),
                        lF(s),
                        r = !1,
                        e = s.clientX,
                        t = s.clientY,
                        l("start", s))
                    }
                }
                function m(n) {
                    if (lB(n),
                    !r) {
                        var i = n.clientX - e
                          , a = n.clientY - t;
                        r = i * i + a * a > d
                    }
                    l.mouse("drag", n)
                }
                function f(e) {
                    lO(e.view).on("mousemove.drag mouseup.drag", null),
                    lU(e.view, r),
                    lB(e),
                    l.mouse("end", e)
                }
                function x(e, t) {
                    if (i.call(this, e, t)) {
                        var r, n, s = e.changedTouches, o = a.call(this, e, t), l = s.length;
                        for (r = 0; r < l; ++r)
                            (n = g(this, o, e, t, s[r].identifier, s[r])) && (lF(e),
                            n("start", e, s[r]))
                    }
                }
                function y(e) {
                    var t, r, n = e.changedTouches, i = n.length;
                    for (t = 0; t < i; ++t)
                        (r = l[n[t].identifier]) && (lB(e),
                        r("drag", e, n[t]))
                }
                function v(e) {
                    var t, r, i = e.changedTouches, a = i.length;
                    for (n && clearTimeout(n),
                    n = setTimeout(function() {
                        n = null
                    }, 500),
                    t = 0; t < a; ++t)
                        (r = l[i[t].identifier]) && (lF(e),
                        r("end", e, i[t]))
                }
                function g(e, t, r, n, i, a) {
                    var o, d, p, m = c.copy(), f = cw(a || r, t);
                    if (null != (p = s.call(e, new uD("beforestart",{
                        sourceEvent: r,
                        target: h,
                        identifier: i,
                        active: u,
                        x: f[0],
                        y: f[1],
                        dx: 0,
                        dy: 0,
                        dispatch: m
                    }), n)))
                        return o = p.x - f[0] || 0,
                        d = p.y - f[1] || 0,
                        function r(a, s, c) {
                            var x, y = f;
                            switch (a) {
                            case "start":
                                l[i] = r,
                                x = u++;
                                break;
                            case "end":
                                delete l[i],
                                --u;
                            case "drag":
                                f = cw(c || s, t),
                                x = u
                            }
                            m.call(a, e, new uD(a,{
                                sourceEvent: s,
                                subject: p,
                                target: h,
                                identifier: i,
                                active: x,
                                x: f[0] + o,
                                y: f[1] + d,
                                dx: f[0] - y[0],
                                dy: f[1] - y[1],
                                dispatch: m
                            }), n)
                        }
                }
                return h.filter = function(e) {
                    return arguments.length ? (i = "function" == typeof e ? e : uI(!!e),
                    h) : i
                }
                ,
                h.container = function(e) {
                    return arguments.length ? (a = "function" == typeof e ? e : uI(e),
                    h) : a
                }
                ,
                h.subject = function(e) {
                    return arguments.length ? (s = "function" == typeof e ? e : uI(e),
                    h) : s
                }
                ,
                h.touchable = function(e) {
                    return arguments.length ? (o = "function" == typeof e ? e : uI(!!e),
                    h) : o
                }
                ,
                h.on = function() {
                    var e = c.on.apply(c, arguments);
                    return e === c ? h : e
                }
                ,
                h.clickDistance = function(e) {
                    return arguments.length ? (d = (e *= 1) * e,
                    h) : Math.sqrt(d)
                }
                ,
                h
            }
            )().on("start", function(e) {
                e.active || v.alphaTarget(.3).restart(),
                e.subject.fx = e.subject.x,
                e.subject.fy = e.subject.y
            }).on("drag", function(e) {
                e.subject.fx = e.x,
                e.subject.fy = e.y
            }).on("end", function(e) {
                e.active || v.alphaTarget(0),
                e.subject.fx = null,
                e.subject.fy = null
            }));
            return N.append("circle").attr("r", e => u6(e)).attr("fill", e => u5[e.category] || u5.metadata).attr("stroke", "var(--bg-primary)").attr("stroke-width", 2).attr("filter", "url(#glow)").style("transition", "all 0.3s ease"),
            N.append("text").text(e => (function(e, t=12) {
                return e.length <= t ? e : e.slice(0, t - 1) + "…"
            }
            )(e.label)).attr("text-anchor", "middle").attr("dy", "0.35em").attr("fill", "#ffffff").attr("font-size", e => Math.max(11, 9 + 4 * e.weight)).attr("font-weight", "700").attr("pointer-events", "none").style("text-shadow", "0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)").style("letter-spacing", "0.02em"),
            N.on("mouseenter", function(e, t) {
                m(t),
                r?.(t),
                lO(this).select("circle").transition().duration(200).attr("r", 1.2 * u6(t)),
                j.transition().duration(200).attr("opacity", e => {
                    let r = "object" == typeof e.source ? e.source.id : e.source
                      , n = "object" == typeof e.target ? e.target.id : e.target;
                    return r === t.id || n === t.id ? 1 : .1
                }
                ).attr("stroke-width", e => {
                    let r = "object" == typeof e.source ? e.source.id : e.source
                      , n = "object" == typeof e.target ? e.target.id : e.target;
                    return r === t.id || n === t.id ? 4 * e.strength : 2 * e.strength
                }
                )
            }).on("mouseleave", function(e, t) {
                m(null),
                r?.(null),
                lO(this).select("circle").transition().duration(200).attr("r", u6(t)),
                j.transition().duration(200).attr("opacity", e => u4[e.type]?.opacity || .5).attr("stroke-width", e => Math.max(1, 3 * e.strength))
            }).on("click", (e, r) => {
                e.stopPropagation(),
                x === r.id ? (y(null),
                g(!1)) : (y(r.id),
                g(!0)),
                t?.(r)
            }
            ),
            v.on("tick", () => {
                j.attr("x1", e => e.source.x).attr("y1", e => e.source.y).attr("x2", e => e.target.x).attr("y2", e => e.target.y),
                N.attr("transform", e => `translate(${e.x},${e.y})`)
            }
            ),
            "force" !== b && (N.attr("transform", e => `translate(${e.x},${e.y})`),
            j.attr("x1", e => e.source.x).attr("y1", e => e.source.y).attr("x2", e => e.target.x).attr("y2", e => e.target.y)),
            () => {
                v.stop()
            }
        }
        , [A, c, i, t, r, x, b]);
        let P = (0,
        p.useCallback)(e => {
            y(e)
        }
        , []);
        return e && e.nodes.length ? (0,
        d.jsxs)("div", {
            ref: o,
            className: `relative w-full h-full ${n}`,
            children: [(0,
            d.jsx)("svg", {
                ref: l,
                width: c.width,
                height: c.height,
                className: "w-full h-full bg-[var(--bg-secondary)] rounded-lg"
            }), !a && (0,
            d.jsx)(u2, {
                currentLayout: b,
                onLayoutChange: w,
                categoryFilters: j,
                onCategoryFilterToggle: T,
                searchQuery: k,
                onSearchChange: S,
                nodeCount: A?.nodes.length || 0
            }), (0,
            d.jsx)(s9, {
                children: h && !v && (0,
                d.jsxs)(sQ.div, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 10
                    },
                    className: "absolute bottom-4 left-4 p-4 bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] shadow-lg max-w-xs",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [(0,
                        d.jsx)("div", {
                            className: "w-4 h-4 rounded-full",
                            style: {
                                backgroundColor: u5[h.category]
                            }
                        }), (0,
                        d.jsx)("h4", {
                            className: "font-semibold text-[var(--text-primary)]",
                            children: h.label
                        })]
                    }), (0,
                    d.jsx)("p", {
                        className: "text-sm text-[var(--text-secondary)] capitalize mb-1",
                        children: h.category
                    }), (0,
                    d.jsxs)("div", {
                        className: "flex gap-4 text-xs text-[var(--text-muted)]",
                        children: [(0,
                        d.jsxs)("span", {
                            children: ["Weight: ", Math.round(100 * h.weight), "%"]
                        }), (0,
                        d.jsxs)("span", {
                            children: ["Depth: ", h.depth]
                        })]
                    }), h.description && (0,
                    d.jsx)("p", {
                        className: "text-xs text-[var(--text-muted)] mt-2 border-t border-[var(--border-subtle)] pt-2",
                        children: h.description
                    })]
                })
            }), e.bifurcated && (0,
            d.jsx)("div", {
                className: "absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--accent-secondary)] text-[var(--text-inverse)] text-xs font-medium rounded-full",
                children: "Bifurcated View"
            }), M && (0,
            d.jsx)(uJ, {
                node: M,
                graph: e,
                onClose: () => {
                    y(null),
                    i && t && t(null)
                }
                ,
                onNodeSelect: P
            })]
        }) : (0,
        d.jsx)("div", {
            ref: o,
            className: `flex items-center justify-center h-full bg-[var(--bg-secondary)] rounded-lg ${n}`,
            children: (0,
            d.jsx)("p", {
                className: "text-[var(--text-muted)]",
                children: "Convert a prompt to see the concept graph"
            })
        })
    }
    function u6(e) {
        return Math.max(15, 20 + 15 * e.weight - 3 * e.depth)
    }
    let u8 = {
        type: "spring",
        stiffness: 400,
        damping: 30
    };
    function u9({className: e="", showGraph: t=!0}) {
        let {jsonOutput: r, previousOutput: n, explanation: i, conceptGraph: a, activeOutputView: s, setActiveOutputView: o, setIsModalOpen: l, isLoading: c} = te()
          , [u,m] = (0,
        p.useState)(!1)
          , [f,x] = (0,
        p.useState)(!1)
          , [y,v] = (0,
        p.useState)(!1)
          , [g,b] = (0,
        p.useState)("")
          , [w,j] = (0,
        p.useState)(null)
          , [N,k] = (0,
        p.useState)(!1)
          , [S,C] = (0,
        p.useState)(!1)
          , M = (0,
        p.useCallback)(async () => {
            if (r)
                try {
                    await navigator.clipboard.writeText(JSON.stringify(r, null, 2)),
                    m(!0),
                    setTimeout( () => {
                        m(!1)
                    }
                    , 2e3)
                } catch (e) {
                    console.error("Failed to copy:", e)
                }
        }
        , [r])
          , A = (0,
        p.useCallback)( () => {
            if (!r)
                return;
            let e = new Blob([JSON.stringify(r, null, 2)],{
                type: "application/json"
            })
              , t = URL.createObjectURL(e)
              , n = document.createElement("a");
            n.href = t,
            n.download = `y7-jprompter-${Date.now()}.json`,
            document.body.appendChild(n),
            n.click(),
            document.body.removeChild(n),
            URL.revokeObjectURL(t),
            x(!0),
            setTimeout( () => {
                x(!1)
            }
            , 2e3)
        }
        , [r])
          , T = () => {
            r && (b(JSON.stringify(r, null, 2)),
            v(!0))
        }
          , P = () => {
            try {
                let e = JSON.parse(g);
                te.getState().setJsonOutput(e),
                v(!1)
            } catch (e) {
                console.error("Invalid JSON:", e)
            }
        }
          , _ = async () => {
            if (!r)
                return;
            let e = y ? g : JSON.stringify(r, null, 2);
            if (y)
                try {
                    let e = JSON.parse(g);
                    te.getState().setJsonOutput(e),
                    v(!1)
                } catch {
                    h.toast.error("Invalid JSON - please fix before refining");
                    return
                }
            let t = te.getState();
            t.setInputText(`Refine and improve this JSON prompt structure:

${e}`),
            h.toast.promise(t.convert(), {
                loading: "Refining JSON structure...",
                success: "Refined successfully!",
                error: "Refinement failed"
            })
        }
          , E = e => {
            null === e ? j(null) : j(e.id === w ? null : e.id)
        }
          , I = [{
            id: "json",
            label: "JSON",
            icon: (0,
            d.jsx)(oW, {
                className: "h-4 w-4"
            })
        }, {
            id: "formatted",
            label: "Formatted",
            icon: (0,
            d.jsx)(oa, {
                className: "h-4 w-4"
            })
        }, {
            id: "diff",
            label: "Diff",
            icon: (0,
            d.jsx)(oY, {
                className: "h-4 w-4"
            }),
            disabled: !n
        }];
        return c ? (0,
        d.jsx)(sQ.div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            className: `h-full flex items-center justify-center p-3 md:p-6 card ${e} overflow-y-auto`,
            children: (0,
            d.jsx)(oL, {})
        }) : r ? (0,
        d.jsxs)(sQ.div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            layout: !0,
            className: `h-full md:h-full flex flex-col card overflow-hidden ${e}`,
            "data-tour": "output-panel",
            children: [(0,
            d.jsxs)("div", {
                className: "flex items-center justify-between p-4 border-b border-[var(--border-subtle)]",
                children: [(0,
                d.jsx)("div", {
                    className: "relative flex gap-1 p-1 bg-[var(--bg-tertiary)] rounded-lg",
                    "data-tour": "output-tabs",
                    children: I.map(e => (0,
                    d.jsxs)(sQ.button, {
                        onClick: () => !e.disabled && o(e.id),
                        disabled: e.disabled,
                        whileHover: e.disabled ? {} : {
                            scale: 1.05
                        },
                        whileTap: e.disabled ? {} : {
                            scale: .95
                        },
                        className: `
                relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                transition-colors duration-200 z-10
                ${s === e.id ? "text-white" : e.disabled ? "text-[var(--text-disabled)] cursor-not-allowed" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}
              `,
                        children: [s === e.id && (0,
                        d.jsx)(sQ.div, {
                            layoutId: "activeTab",
                            className: "absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-md shadow-lg",
                            transition: u8
                        }), (0,
                        d.jsxs)("span", {
                            className: "relative z-10 flex items-center gap-2",
                            children: [e.icon, (0,
                            d.jsx)("span", {
                                className: "hidden sm:inline",
                                children: e.label
                            })]
                        })]
                    }, e.id))
                }), (0,
                d.jsxs)("div", {
                    className: "hidden md:flex items-center gap-2",
                    children: [i && (0,
                    d.jsx)("button", {
                        onClick: () => l(!0),
                        className: "btn-ghost p-2 rounded-lg",
                        title: "Why this structure?",
                        children: (0,
                        d.jsx)(oG, {
                            className: "h-5 w-5"
                        })
                    }), y ? (0,
                    d.jsxs)(d.Fragment, {
                        children: [(0,
                        d.jsx)("button", {
                            onClick: P,
                            className: "btn-ghost p-2 rounded-lg text-[var(--accent-success)]",
                            title: "Save changes",
                            children: (0,
                            d.jsx)(oM, {
                                className: "h-5 w-5"
                            })
                        }), (0,
                        d.jsx)("button", {
                            onClick: () => {
                                v(!1),
                                b("")
                            }
                            ,
                            className: "btn-ghost p-2 rounded-lg text-[var(--color-error)]",
                            title: "Cancel",
                            children: (0,
                            d.jsx)(op, {
                                className: "h-5 w-5"
                            })
                        })]
                    }) : (0,
                    d.jsx)("button", {
                        onClick: T,
                        className: "btn-ghost p-2 rounded-lg",
                        title: "Edit JSON",
                        children: (0,
                        d.jsx)(oX, {
                            className: "h-5 w-5"
                        })
                    }), (0,
                    d.jsx)("button", {
                        onClick: _,
                        className: "btn-ghost p-2 rounded-lg hover:text-[var(--accent-primary)]",
                        title: "Refine & improve this JSON",
                        children: (0,
                        d.jsx)(oN, {
                            className: "h-5 w-5"
                        })
                    }), (0,
                    d.jsx)("button", {
                        onClick: M,
                        className: "btn-ghost p-2 rounded-lg",
                        title: "Copy to clipboard",
                        children: u ? (0,
                        d.jsx)(oE, {
                            className: "h-5 w-5 text-[var(--accent-success)]"
                        }) : (0,
                        d.jsx)(oA, {
                            className: "h-5 w-5"
                        })
                    }), (0,
                    d.jsx)("button", {
                        onClick: A,
                        className: "btn-ghost p-2 rounded-lg",
                        title: "Download JSON",
                        children: f ? (0,
                        d.jsx)(oE, {
                            className: "h-5 w-5 text-[var(--accent-success)]"
                        }) : (0,
                        d.jsx)(oT, {
                            className: "h-5 w-5"
                        })
                    })]
                })]
            }), (0,
            d.jsxs)("div", {
                className: "flex-1 flex flex-col md:flex-row overflow-auto md:overflow-hidden min-h-0",
                children: [(0,
                d.jsx)("div", {
                    className: "flex-1 min-h-0 overflow-auto p-4 md:border-r border-[var(--border-subtle)]",
                    children: (0,
                    d.jsxs)(s9, {
                        mode: "wait",
                        children: ["json" === s && (0,
                        d.jsx)(sQ.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: .2
                            },
                            className: "h-full",
                            children: y ? (0,
                            d.jsx)("textarea", {
                                value: g,
                                onChange: e => b(e.target.value),
                                className: "w-full h-full p-4 font-mono text-sm bg-[var(--code-bg)] text-[var(--code-text)] rounded-lg border border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:outline-none resize-none",
                                spellCheck: !1
                            }) : (0,
                            d.jsx)("pre", {
                                className: "code-block h-full overflow-auto whitespace-pre-wrap",
                                children: JSON.stringify(r, null, 2)
                            })
                        }, "json"), "formatted" === s && (0,
                        d.jsx)(sQ.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: .2
                            },
                            className: "h-full overflow-auto",
                            children: (0,
                            d.jsx)(u7, {
                                data: r
                            })
                        }, "formatted"), "diff" === s && n && (0,
                        d.jsx)(sQ.div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: .2
                            },
                            className: "h-full overflow-auto",
                            children: (0,
                            d.jsx)(de, {
                                previous: n,
                                current: r
                            })
                        }, "diff")]
                    })
                }), t && a && (0,
                d.jsxs)("div", {
                    className: "hidden md:block md:w-1/2 md:h-auto bg-[var(--bg-tertiary)] relative",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "absolute top-2 right-2 z-20 flex gap-2",
                        children: [(0,
                        d.jsx)("button", {
                            onClick: () => C(!S),
                            className: "p-2 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] rounded-lg shadow-lg border border-[var(--border-default)] transition-colors",
                            title: S ? "Show controls" : "Hide controls",
                            children: S ? (0,
                            d.jsx)(oZ, {
                                className: "h-4 w-4"
                            }) : (0,
                            d.jsx)(oK, {
                                className: "h-4 w-4"
                            })
                        }), (0,
                        d.jsx)("button", {
                            onClick: () => k(!0),
                            className: "p-2 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] rounded-lg shadow-lg border border-[var(--border-default)] transition-colors",
                            title: "Open fullscreen",
                            children: (0,
                            d.jsx)(oJ, {
                                className: "h-4 w-4"
                            })
                        })]
                    }), (0,
                    d.jsx)(u3, {
                        graph: a,
                        onNodeClick: E,
                        selectedNodeId: w,
                        className: "h-full",
                        hideControls: S
                    })]
                })]
            }), (0,
            d.jsx)(dn, {
                copyToClipboard: M,
                copySuccess: u,
                downloadJSON: A,
                downloadSuccess: f,
                isEditing: y,
                saveEdit: P,
                startEditing: T,
                refineJson: _,
                openGraph: () => k(!0)
            }), (0,
            d.jsx)(s9, {
                children: u && (0,
                d.jsxs)(sQ.div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 20
                    },
                    className: "hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--accent-success)] text-[var(--text-inverse)] rounded-lg shadow-lg items-center gap-2",
                    children: [(0,
                    d.jsx)(oE, {
                        className: "h-4 w-4"
                    }), (0,
                    d.jsx)("span", {
                        className: "text-sm font-medium",
                        children: "Copied to clipboard!"
                    })]
                })
            }), (0,
            d.jsx)(s9, {
                children: N && (0,
                d.jsx)(dr, {
                    conceptGraph: a,
                    jsonOutput: r,
                    previousOutput: n,
                    selectedNodeId: w,
                    onNodeClick: E,
                    onClose: () => k(!1)
                })
            })]
        }) : (0,
        d.jsx)(sQ.div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            className: `h-full flex flex-col items-center justify-center p-6 card ${e}`,
            children: (0,
            d.jsxs)("div", {
                className: "text-center",
                children: [(0,
                d.jsx)(oW, {
                    className: "h-10 w-10 text-[var(--text-muted)] mx-auto mb-4 opacity-50"
                }), (0,
                d.jsx)("h3", {
                    className: "text-base font-medium text-[var(--text-secondary)] mb-2",
                    children: "No Output Yet"
                }), (0,
                d.jsxs)("p", {
                    className: "text-sm text-[var(--text-muted)] max-w-[250px]",
                    children: ["Enter a prompt and click ", (0,
                    d.jsx)("span", {
                        className: "text-[var(--accent-primary)] font-medium",
                        children: "Convert"
                    }), " to see the JSON structure"]
                })]
            })
        })
    }
    function u7({data: e}) {
        let t = (e, r=0, n="") => null == e ? (0,
        d.jsx)("span", {
            className: "text-[var(--text-muted)]",
            children: "null"
        }) : "string" == typeof e ? (0,
        d.jsxs)("span", {
            className: "text-[var(--code-string)]",
            children: ['"', e, '"']
        }) : "number" == typeof e ? (0,
        d.jsx)("span", {
            className: "text-[var(--code-number)]",
            children: e
        }) : "boolean" == typeof e ? (0,
        d.jsx)("span", {
            className: "text-[var(--code-keyword)]",
            children: e ? "true" : "false"
        }) : Array.isArray(e) ? (0,
        d.jsx)("ul", {
            className: "list-disc list-inside ml-4 space-y-1",
            children: e.map( (e, i) => (0,
            d.jsx)("li", {
                children: t(e, r + 1, `${n}-${i}`)
            }, i))
        }) : "object" == typeof e ? (0,
        d.jsx)("div", {
            className: `${r > 0 ? "ml-4 mt-2" : ""} space-y-2`,
            children: Object.entries(e).map( ([e,n]) => (0,
            d.jsxs)("div", {
                className: "p-3 bg-[var(--bg-tertiary)] rounded-lg",
                children: [(0,
                d.jsxs)("span", {
                    className: "text-sm font-medium text-[var(--accent-primary)]",
                    children: [e, ":"]
                }), (0,
                d.jsx)("div", {
                    className: "mt-1",
                    children: t(n, r + 1, e)
                })]
            }, e))
        }) : String(e);
        return (0,
        d.jsx)("div", {
            className: "space-y-3",
            children: Object.entries(e).map( ([e,r]) => (0,
            d.jsxs)("div", {
                className: "p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)]",
                children: [(0,
                d.jsx)("h4", {
                    className: "text-sm font-semibold text-[var(--accent-primary)] mb-2 capitalize",
                    children: e.replace(/_/g, " ")
                }), (0,
                d.jsx)("div", {
                    className: "text-sm text-[var(--text-primary)]",
                    children: t(r, 0, e)
                })]
            }, e))
        })
    }
    function de({previous: e, current: t}) {
        let r = JSON.stringify(e, null, 2).split("\n")
          , n = JSON.stringify(t, null, 2).split("\n")
          , i = Math.max(r.length, n.length)
          , a = [];
        for (let e = 0; e < i; e++) {
            let t = r[e] || ""
              , i = n[e] || "";
            t === i ? a.push({
                type: "same",
                content: i
            }) : (t && a.push({
                type: "removed",
                content: t
            }),
            i && a.push({
                type: "added",
                content: i
            }))
        }
        return (0,
        d.jsx)("div", {
            className: "font-mono text-sm",
            children: a.map( (e, t) => (0,
            d.jsxs)("div", {
                className: `px-4 py-0.5 ${"removed" === e.type ? "bg-[var(--color-error-subtle)] text-[var(--color-error)]" : "added" === e.type ? "bg-[var(--accent-success-subtle)] text-[var(--accent-success)]" : "text-[var(--text-secondary)]"}`,
                children: [(0,
                d.jsx)("span", {
                    className: "inline-block w-6 text-[var(--text-muted)]",
                    children: "removed" === e.type ? "-" : "added" === e.type ? "+" : " "
                }), e.content]
            }, t))
        })
    }
    let dt = [{
        id: "force",
        icon: (0,
        d.jsx)(oQ, {
            className: "w-4 h-4"
        }),
        label: "Force"
    }, {
        id: "radial",
        icon: (0,
        d.jsx)(o0, {
            className: "w-4 h-4"
        }),
        label: "Radial"
    }, {
        id: "hierarchy",
        icon: (0,
        d.jsx)(o1, {
            className: "w-4 h-4"
        }),
        label: "Tree"
    }, {
        id: "cluster",
        icon: (0,
        d.jsx)(o2, {
            className: "w-4 h-4"
        }),
        label: "Cluster"
    }];
    function dr({conceptGraph: e, jsonOutput: t, previousOutput: r, selectedNodeId: n, onNodeClick: i, onClose: a}) {
        let[s,o] = (0,
        p.useState)("graph")
          , [l,c] = (0,
        p.useState)("force")
          , u = [{
            id: "graph",
            label: "Graph",
            icon: (0,
            d.jsx)(oP, {
                className: "h-4 w-4"
            }),
            disabled: !e
        }, {
            id: "json",
            label: "JSON",
            icon: (0,
            d.jsx)(oW, {
                className: "h-4 w-4"
            })
        }, {
            id: "formatted",
            label: "Format",
            icon: (0,
            d.jsx)(oa, {
                className: "h-4 w-4"
            })
        }, {
            id: "diff",
            label: "Diff",
            icon: (0,
            d.jsx)(oY, {
                className: "h-4 w-4"
            }),
            disabled: !r
        }];
        return dt.find(e => e.id === l),
        (0,
        d.jsxs)(sQ.div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 z-[100] bg-[var(--bg-primary)] flex flex-col",
            children: [(0,
            d.jsxs)("div", {
                className: "flex items-center justify-between p-3 border-b border-[var(--border-subtle)]",
                children: [(0,
                d.jsx)("h2", {
                    className: "text-base font-semibold text-[var(--text-primary)]",
                    children: "Output View"
                }), (0,
                d.jsx)("button", {
                    onClick: a,
                    className: "p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors",
                    title: "Close",
                    children: (0,
                    d.jsx)(op, {
                        className: "h-5 w-5"
                    })
                })]
            }), (0,
            d.jsx)("div", {
                className: "flex gap-1 p-2 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]",
                children: u.map(e => (0,
                d.jsxs)("button", {
                    onClick: () => !e.disabled && o(e.id),
                    disabled: e.disabled,
                    className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${s === e.id ? "bg-[var(--accent-primary)] text-white shadow-md" : e.disabled ? "text-[var(--text-disabled)] cursor-not-allowed" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"}`,
                    children: [e.icon, (0,
                    d.jsx)("span", {
                        children: e.label
                    })]
                }, e.id))
            }), "graph" === s && e && (0,
            d.jsxs)("div", {
                className: "flex items-center justify-between px-3 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]",
                children: [(0,
                d.jsxs)("span", {
                    className: "text-xs text-[var(--text-muted)]",
                    children: [e.nodes.length, " nodes"]
                }), (0,
                d.jsx)("div", {
                    className: "flex gap-1",
                    children: dt.map(e => (0,
                    d.jsxs)("button", {
                        onClick: () => c(e.id),
                        className: `flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${l === e.id ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}`,
                        title: e.label,
                        children: [e.icon, (0,
                        d.jsx)("span", {
                            className: "hidden sm:inline",
                            children: e.label
                        })]
                    }, e.id))
                })]
            }), (0,
            d.jsx)("div", {
                className: "flex-1 relative overflow-hidden",
                children: (0,
                d.jsxs)(s9, {
                    mode: "wait",
                    children: ["graph" === s && e && (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "h-full bg-[var(--bg-tertiary)]",
                        children: (0,
                        d.jsx)(u3, {
                            graph: e,
                            onNodeClick: i,
                            selectedNodeId: n,
                            className: "h-full",
                            hideControls: !0,
                            initialLayout: l
                        })
                    }, `graph-${l}`), "json" === s && t && (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "h-full overflow-auto p-4",
                        children: (0,
                        d.jsx)("pre", {
                            className: "code-block h-full overflow-auto whitespace-pre-wrap text-sm",
                            children: JSON.stringify(t, null, 2)
                        })
                    }, "json"), "formatted" === s && t && (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "h-full overflow-auto p-4",
                        children: (0,
                        d.jsx)(u7, {
                            data: t
                        })
                    }, "formatted"), "diff" === s && r && t && (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "h-full overflow-auto p-4",
                        children: (0,
                        d.jsx)(de, {
                            previous: r,
                            current: t
                        })
                    }, "diff")]
                })
            })]
        })
    }
    function dn(e) {
        let[t,r] = (0,
        p.useState)(!1);
        return ((0,
        p.useEffect)( () => (r(!0),
        () => r(!1)), []),
        t) ? (0,
        of.createPortal)((0,
        d.jsx)(di, {
            ...e
        }), document.body) : null
    }
    function di({copyToClipboard: e, copySuccess: t, downloadJSON: r, downloadSuccess: n, isEditing: i, saveEdit: a, startEditing: s, refineJson: o, openGraph: l}) {
        let[c,u] = (0,
        p.useState)(!1)
          , h = [{
            icon: t ? (0,
            d.jsx)(oE, {
                className: "h-5 w-5"
            }) : (0,
            d.jsx)(oA, {
                className: "h-5 w-5"
            }),
            label: t ? "Copied!" : "Copy",
            onClick: e,
            primary: !0
        }, {
            icon: n ? (0,
            d.jsx)(oE, {
                className: "h-5 w-5"
            }) : (0,
            d.jsx)(oT, {
                className: "h-5 w-5"
            }),
            label: n ? "Saved!" : "Download",
            onClick: r
        }, {
            icon: i ? (0,
            d.jsx)(oM, {
                className: "h-5 w-5"
            }) : (0,
            d.jsx)(oX, {
                className: "h-5 w-5"
            }),
            label: i ? "Save" : "Edit",
            onClick: i ? a : s
        }, {
            icon: (0,
            d.jsx)(oN, {
                className: "h-5 w-5"
            }),
            label: "Refine",
            onClick: o
        }, {
            icon: (0,
            d.jsx)(oQ, {
                className: "h-5 w-5"
            }),
            label: "Graph",
            onClick: l
        }];
        return (0,
        d.jsxs)("div", {
            className: "md:hidden fixed bottom-6 right-6 z-[9999]",
            children: [(0,
            d.jsx)(s9, {
                children: c && (0,
                d.jsxs)(d.Fragment, {
                    children: [(0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "fixed inset-0 bg-black/30 backdrop-blur-sm",
                        style: {
                            zIndex: -1
                        },
                        onClick: () => u(!1)
                    }), h.map( (e, t) => {
                        let r, n = {
                            x: 150 * Math.cos(r = (180 - 90 / (h.length - 1) * t) * Math.PI / 180),
                            y: -(150 * Math.sin(r))
                        }, i = t >= h.length / 2;
                        return (0,
                        d.jsxs)(sQ.button, {
                            initial: {
                                opacity: 0,
                                scale: .3
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                x: n.x,
                                y: n.y,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    delay: .04 * t
                                }
                            },
                            exit: {
                                opacity: 0,
                                scale: .3,
                                x: 0,
                                y: 0,
                                transition: {
                                    duration: .15,
                                    delay: (h.length - t) * .02
                                }
                            },
                            onClick: () => {
                                e.onClick(),
                                e.label.includes("Copy") || e.label.includes("Download") || u(!1)
                            }
                            ,
                            className: `absolute w-11 h-11 rounded-full flex items-center justify-center shadow-lg active:scale-95 ${e.primary ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]"}`,
                            children: [e.icon, (0,
                            d.jsx)("span", {
                                className: `absolute px-2 py-1 text-xs font-medium bg-[var(--bg-card)] text-[var(--text-primary)] rounded-md whitespace-nowrap shadow-md border border-[var(--border-subtle)] ${i ? "bottom-full mb-2 left-1/2 -translate-x-1/2" : "right-full mr-2 top-1/2 -translate-y-1/2"}`,
                                children: e.label
                            })]
                        }, e.label)
                    }
                    )]
                })
            }), (0,
            d.jsx)(sQ.button, {
                whileTap: {
                    scale: .9
                },
                onClick: () => u(!c),
                className: "w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-[var(--accent-primary)] text-white",
                children: (0,
                d.jsx)(sQ.div, {
                    animate: {
                        rotate: 45 * !!c
                    },
                    transition: {
                        duration: .2
                    },
                    children: c ? (0,
                    d.jsx)(op, {
                        className: "h-6 w-6"
                    }) : (0,
                    d.jsx)(oW, {
                        className: "h-6 w-6"
                    })
                })
            })]
        })
    }
    let da = or("Eye", [["path", {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0"
    }], ["circle", {
        cx: "12",
        cy: "12",
        r: "3",
        key: "1v7zrd"
    }]])
      , ds = or("FolderOpen", [["path", {
        d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
        key: "usdka0"
    }]])
      , dl = or("FileJson", [["path", {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7"
    }], ["path", {
        d: "M14 2v4a2 2 0 0 0 2 2h4",
        key: "tnqrlb"
    }], ["path", {
        d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",
        key: "1oajmo"
    }], ["path", {
        d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",
        key: "mpwhp6"
    }]])
      , dc = or("Key", [["path", {
        d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
        key: "g0fldk"
    }], ["path", {
        d: "m21 2-9.6 9.6",
        key: "1j0ho8"
    }], ["circle", {
        cx: "7.5",
        cy: "15.5",
        r: "5.5",
        key: "yqb3hr"
    }]])
      , du = or("ChevronDown", [["path", {
        d: "m6 9 6 6 6-6",
        key: "qrunsl"
    }]])
      , dd = or("Folder", [["path", {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        key: "1kt360"
    }]])
      , dh = or("Trash2", [["path", {
        d: "M3 6h18",
        key: "d0wm0j"
    }], ["path", {
        d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
        key: "4alrt4"
    }], ["path", {
        d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
        key: "v07s0e"
    }], ["line", {
        x1: "10",
        x2: "10",
        y1: "11",
        y2: "17",
        key: "1uufr5"
    }], ["line", {
        x1: "14",
        x2: "14",
        y1: "11",
        y2: "17",
        key: "xtxkd"
    }]])
      , dp = or("Upload", [["path", {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
        key: "ih7n3h"
    }], ["polyline", {
        points: "17 8 12 3 7 8",
        key: "t8dd8p"
    }], ["line", {
        x1: "12",
        x2: "12",
        y1: "3",
        y2: "15",
        key: "widbto"
    }]])
      , dm = or("TriangleAlert", [["path", {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
    }], ["path", {
        d: "M12 9v4",
        key: "juzpu7"
    }], ["path", {
        d: "M12 17h.01",
        key: "p32p05"
    }]])
      , df = {
        danger: {
            icon: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
            button: "bg-[var(--color-error)] hover:bg-[var(--color-error)]/90"
        },
        warning: {
            icon: "bg-[var(--accent-warning)]/10 text-[var(--accent-warning)]",
            button: "bg-[var(--accent-warning)] hover:bg-[var(--accent-warning)]/90"
        },
        info: {
            icon: "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]",
            button: "bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)]"
        }
    };
    function dx({isOpen: e, onClose: t, onConfirm: r, title: n, message: i, confirmText: a="Confirm", cancelText: s="Cancel", variant: o="danger"}) {
        let l = df[o]
          , c = (0,
        p.useCallback)(e => {
            "Escape" === e.key && t()
        }
        , [t]);
        return (0,
        p.useEffect)( () => (e && (document.addEventListener("keydown", c),
        document.body.style.overflow = "hidden"),
        () => {
            document.removeEventListener("keydown", c),
            document.body.style.overflow = ""
        }
        ), [e, c]),
        (0,
        d.jsx)(s9, {
            children: e && (0,
            d.jsxs)(sQ.div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [(0,
                d.jsx)(sQ.div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: t,
                    className: "absolute inset-0 bg-black/50 backdrop-blur-sm"
                }), (0,
                d.jsxs)(sQ.div, {
                    initial: {
                        opacity: 0,
                        scale: .95,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        scale: .95,
                        y: 10
                    },
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    },
                    className: "relative w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-xl overflow-hidden",
                    children: [(0,
                    d.jsx)("button", {
                        onClick: t,
                        className: "absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                        children: (0,
                        d.jsx)(op, {
                            className: "w-5 h-5"
                        })
                    }), (0,
                    d.jsxs)("div", {
                        className: "p-6",
                        children: [(0,
                        d.jsx)("div", {
                            className: `w-12 h-12 rounded-xl ${l.icon} flex items-center justify-center mb-4`,
                            children: (0,
                            d.jsx)(dm, {
                                className: "w-6 h-6"
                            })
                        }), (0,
                        d.jsx)("h2", {
                            className: "text-lg font-semibold text-[var(--text-primary)] mb-2",
                            children: n
                        }), (0,
                        d.jsx)("p", {
                            className: "text-sm text-[var(--text-secondary)] leading-relaxed",
                            children: i
                        })]
                    }), (0,
                    d.jsxs)("div", {
                        className: "flex gap-3 p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]",
                        children: [(0,
                        d.jsx)("button", {
                            onClick: t,
                            className: "flex-1 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors",
                            children: s
                        }), (0,
                        d.jsx)("button", {
                            onClick: () => {
                                r(),
                                t()
                            }
                            ,
                            className: `flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-colors ${l.button}`,
                            children: a
                        })]
                    })]
                })]
            })
        })
    }
    function dy({isOpen: e, onClose: t}) {
        let {history: r, loadFromHistory: n, removeFromHistory: i, clearHistory: a, exportHistory: s, importHistory: o} = te()
          , [l,c] = (0,
        p.useState)("")
          , [u,h] = (0,
        p.useState)(null)
          , [m,f] = (0,
        p.useState)(!1)
          , [x,y] = (0,
        p.useState)("recent")
          , v = (0,
        p.useMemo)( () => [...new Set(r.map(e => `Level ${e.input.complexity}`))].sort(), [r])
          , g = (0,
        p.useMemo)( () => {
            let e = r;
            if (l) {
                let t = l.toLowerCase();
                e = e.filter(e => e.input.text.toLowerCase().includes(t) || JSON.stringify(e.output.json).toLowerCase().includes(t))
            }
            if (u) {
                let t = parseInt(u.replace("Level ", ""));
                e = e.filter(e => e.input.complexity === t)
            }
            return "recent" === x ? [...e].sort( (e, t) => new Date(t.timestamp).getTime() - new Date(e.timestamp).getTime()) : [...e].sort( (e, t) => t.input.complexity - e.input.complexity)
        }
        , [r, l, u, x]);
        return e ? (0,
        d.jsxs)(d.Fragment, {
            children: [(0,
            d.jsx)(s9, {
                children: (0,
                d.jsx)(sQ.div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
                    onClick: t,
                    children: (0,
                    d.jsxs)(sQ.div, {
                        initial: {
                            opacity: 0,
                            scale: .95,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            scale: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            scale: .95,
                            y: 20
                        },
                        onClick: e => e.stopPropagation(),
                        className: "w-full max-w-4xl max-h-[80vh] bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col",
                        children: [(0,
                        d.jsxs)("div", {
                            className: "flex items-center justify-between p-4 border-b border-[var(--border-subtle)]",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [(0,
                                d.jsx)("div", {
                                    className: "w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                                    children: (0,
                                    d.jsx)(dd, {
                                        className: "w-5 h-5 text-[var(--accent-primary)]"
                                    })
                                }), (0,
                                d.jsxs)("div", {
                                    children: [(0,
                                    d.jsx)("h2", {
                                        className: "text-lg font-semibold text-[var(--text-primary)]",
                                        children: "Prompt Library"
                                    }), (0,
                                    d.jsxs)("p", {
                                        className: "text-xs text-[var(--text-muted)]",
                                        children: [r.length, " saved prompts"]
                                    })]
                                })]
                            }), (0,
                            d.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [(0,
                                d.jsx)("button", {
                                    onClick: () => {
                                        let e = document.createElement("input");
                                        e.type = "file",
                                        e.accept = ".json",
                                        e.onchange = async e => {
                                            let t = e.target.files?.[0];
                                            t && o(await t.text())
                                        }
                                        ,
                                        e.click()
                                    }
                                    ,
                                    className: "p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                                    title: "Import library",
                                    children: (0,
                                    d.jsx)(dp, {
                                        className: "w-5 h-5"
                                    })
                                }), (0,
                                d.jsx)("button", {
                                    onClick: () => {
                                        let e = new Blob([s()],{
                                            type: "application/json"
                                        })
                                          , t = URL.createObjectURL(e)
                                          , r = document.createElement("a");
                                        r.href = t,
                                        r.download = `y7-jprompter-library-${Date.now()}.json`,
                                        r.click(),
                                        URL.revokeObjectURL(t)
                                    }
                                    ,
                                    className: "p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                                    title: "Export library",
                                    children: (0,
                                    d.jsx)(oT, {
                                        className: "w-5 h-5"
                                    })
                                }), (0,
                                d.jsx)("button", {
                                    onClick: t,
                                    className: "p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                                    children: (0,
                                    d.jsx)(op, {
                                        className: "w-5 h-5"
                                    })
                                })]
                            })]
                        }), (0,
                        d.jsxs)("div", {
                            className: "p-4 border-b border-[var(--border-subtle)] space-y-3",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "relative",
                                children: [(0,
                                d.jsx)(uZ, {
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                                }), (0,
                                d.jsx)("input", {
                                    type: "text",
                                    value: l,
                                    onChange: e => c(e.target.value),
                                    placeholder: "Search prompts...",
                                    className: "w-full pl-10 pr-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                                })]
                            }), (0,
                            d.jsxs)("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [(0,
                                d.jsxs)("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [(0,
                                    d.jsx)("span", {
                                        className: "text-xs text-[var(--text-muted)]",
                                        children: "Filter:"
                                    }), v.map( (e, t) => (0,
                                    d.jsx)("button", {
                                        onClick: () => h(u === e ? null : e),
                                        className: `px-2 py-1 text-xs rounded-full transition-colors ${u === e ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`,
                                        children: e
                                    }, `${e}-${t}`))]
                                }), (0,
                                d.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [(0,
                                    d.jsx)("span", {
                                        className: "text-xs text-[var(--text-muted)]",
                                        children: "Sort:"
                                    }), (0,
                                    d.jsxs)("select", {
                                        value: x,
                                        onChange: e => y(e.target.value),
                                        className: "px-2 py-1 text-xs bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none",
                                        children: [(0,
                                        d.jsx)("option", {
                                            value: "recent",
                                            children: "Most Recent"
                                        }), (0,
                                        d.jsx)("option", {
                                            value: "complexity",
                                            children: "Complexity"
                                        })]
                                    })]
                                })]
                            })]
                        }), (0,
                        d.jsx)("div", {
                            className: "flex-1 overflow-y-auto p-4",
                            children: 0 === g.length ? (0,
                            d.jsxs)("div", {
                                className: "flex flex-col items-center justify-center h-full text-center py-12",
                                children: [(0,
                                d.jsx)(dl, {
                                    className: "w-12 h-12 text-[var(--text-muted)] mb-4"
                                }), (0,
                                d.jsx)("h3", {
                                    className: "text-lg font-medium text-[var(--text-secondary)] mb-2",
                                    children: 0 === r.length ? "No Saved Prompts" : "No Results Found"
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-sm text-[var(--text-muted)]",
                                    children: 0 === r.length ? "Convert some prompts and they will appear here" : "Try adjusting your search or filters"
                                })]
                            }) : (0,
                            d.jsx)("div", {
                                className: "space-y-3",
                                children: g.map(e => (0,
                                d.jsx)(sQ.div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    className: "group p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-primary-subtle)] transition-all cursor-pointer",
                                    onClick: () => {
                                        n(e),
                                        t()
                                    }
                                    ,
                                    children: (0,
                                    d.jsxs)("div", {
                                        className: "flex items-start justify-between gap-4",
                                        children: [(0,
                                        d.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [(0,
                                            d.jsx)("p", {
                                                className: "text-sm text-[var(--text-primary)] line-clamp-2 mb-2",
                                                children: e.input.text
                                            }), (0,
                                            d.jsxs)("div", {
                                                className: "flex items-center gap-3 text-xs text-[var(--text-muted)]",
                                                children: [(0,
                                                d.jsxs)("span", {
                                                    className: "flex items-center gap-1",
                                                    children: [(0,
                                                    d.jsx)(oz, {
                                                        className: "w-3 h-3"
                                                    }), new Date(e.timestamp).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })]
                                                }), (0,
                                                d.jsxs)("span", {
                                                    className: "px-2 py-0.5 bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] rounded-full",
                                                    children: ["Level ", e.input.complexity]
                                                })]
                                            })]
                                        }), (0,
                                        d.jsxs)("div", {
                                            className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                                            children: [(0,
                                            d.jsx)("button", {
                                                onClick: t => {
                                                    t.stopPropagation(),
                                                    i(e.id)
                                                }
                                                ,
                                                className: "p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-subtle)] transition-colors",
                                                title: "Delete",
                                                children: (0,
                                                d.jsx)(dh, {
                                                    className: "w-4 h-4"
                                                })
                                            }), (0,
                                            d.jsx)(oc, {
                                                className: "w-4 h-4 text-[var(--text-muted)]"
                                            })]
                                        })]
                                    })
                                }, e.id))
                            })
                        }), r.length > 0 && (0,
                        d.jsxs)("div", {
                            className: "p-4 border-t border-[var(--border-subtle)] flex justify-between items-center",
                            children: [(0,
                            d.jsx)("button", {
                                onClick: () => f(!0),
                                className: "text-xs text-[var(--color-error)] hover:underline",
                                children: "Clear All History"
                            }), (0,
                            d.jsx)("p", {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "Click a prompt to load it"
                            })]
                        })]
                    })
                }, "prompt-library-modal")
            }), (0,
            d.jsx)(dx, {
                isOpen: m,
                onClose: () => f(!1),
                onConfirm: a,
                title: "Clear All History?",
                message: "This will permanently delete all your saved prompts and conversion history. This action cannot be undone.",
                confirmText: "Clear All",
                variant: "danger"
            })]
        }) : null
    }
    let dv = or("RefreshCw", [["path", {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
        key: "v9h5vc"
    }], ["path", {
        d: "M21 3v5h-5",
        key: "1q7to0"
    }], ["path", {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
        key: "3uifl3"
    }], ["path", {
        d: "M8 16H3v5",
        key: "1cv678"
    }]])
      , dg = or("TrendingUp", [["polyline", {
        points: "22 7 13.5 15.5 8.5 10.5 2 17",
        key: "126l90"
    }], ["polyline", {
        points: "16 7 22 7 22 13",
        key: "kwv8wd"
    }]])
      , db = [{
        key: "clarity",
        label: "Clarity",
        angle: -90
    }, {
        key: "specificity",
        label: "Specificity",
        angle: -18
    }, {
        key: "structure",
        label: "Structure",
        angle: 54
    }, {
        key: "actionability",
        label: "Action",
        angle: 126
    }, {
        key: "creativity",
        label: "Creative",
        angle: 198
    }];
    function dw({data: e, size: t=200, className: r=""}) {
        let n = t / 2
          , i = t / 2 - 30
          , a = (e, t) => {
            let r = e * Math.PI / 180;
            return {
                x: n + t * Math.cos(r),
                y: n + t * Math.sin(r)
            }
        }
          , s = db.map(t => {
            let r = e[t.key] || 0;
            return a(t.angle, r / 100 * i)
        }
        )
          , o = s.map(e => `${e.x},${e.y}`).join(" ");
        return (0,
        d.jsxs)("div", {
            className: `relative ${r}`,
            children: [(0,
            d.jsxs)("svg", {
                width: t,
                height: t,
                viewBox: `0 0 ${t} ${t}`,
                children: [[20, 40, 60, 80, 100].map(e => {
                    let t = e / 100 * i
                      , r = db.map(e => a(e.angle, t));
                    return (0,
                    d.jsx)("polygon", {
                        points: r.map(e => `${e.x},${e.y}`).join(" "),
                        fill: "none",
                        stroke: "var(--border-subtle)",
                        strokeWidth: 1,
                        opacity: .5
                    }, e)
                }
                ), db.map(e => {
                    let t = a(e.angle, i);
                    return (0,
                    d.jsx)("line", {
                        x1: n,
                        y1: n,
                        x2: t.x,
                        y2: t.y,
                        stroke: "var(--border-subtle)",
                        strokeWidth: 1,
                        opacity: .5
                    }, e.key)
                }
                ), (0,
                d.jsx)(sQ.polygon, {
                    initial: {
                        opacity: 0,
                        scale: .5
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    transition: {
                        duration: .5,
                        ease: "easeOut"
                    },
                    points: o,
                    fill: "var(--accent-primary)",
                    fillOpacity: .2,
                    stroke: "var(--accent-primary)",
                    strokeWidth: 2,
                    style: {
                        transformOrigin: `${n}px ${n}px`
                    }
                }), s.map( (e, t) => (0,
                d.jsx)(sQ.circle, {
                    initial: {
                        opacity: 0,
                        scale: 0
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    transition: {
                        delay: .1 * t,
                        duration: .3
                    },
                    cx: e.x,
                    cy: e.y,
                    r: 4,
                    fill: "var(--accent-primary)",
                    stroke: "var(--bg-primary)",
                    strokeWidth: 2
                }, db[t].key)), db.map(e => {
                    let t = a(e.angle, i + 18);
                    return (0,
                    d.jsx)("text", {
                        x: t.x,
                        y: t.y,
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                        className: "text-[10px] fill-[var(--text-muted)]",
                        children: e.label
                    }, e.key)
                }
                )]
            }), (0,
            d.jsx)("div", {
                className: "absolute inset-0 pointer-events-none",
                children: db.map( (t, r) => {
                    let n = e[t.key] || 0
                      , s = a(t.angle, .65 * i);
                    return (0,
                    d.jsx)(sQ.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: .3 + .1 * r
                        },
                        className: "absolute text-xs font-bold text-[var(--accent-primary)]",
                        style: {
                            left: s.x,
                            top: s.y,
                            transform: "translate(-50%, -50%)"
                        },
                        children: n
                    }, t.key)
                }
                )
            })]
        })
    }
    function dj({isOpen: e, onClose: t}) {
        let {inputText: r, jsonOutput: n} = te()
          , {skills: i} = e7()
          , [a,s] = (0,
        p.useState)(null)
          , [o,l] = (0,
        p.useState)(!1)
          , c = async () => {
            r && n && (l(!0),
            setTimeout( () => {
                s({
                    axes: {
                        clarity: Math.round(75 + 20 * Math.random()),
                        specificity: Math.round(70 + 25 * Math.random()),
                        structure: Math.round(80 + 15 * Math.random()),
                        actionability: Math.round(65 + 30 * Math.random()),
                        creativity: Math.round(70 + 25 * Math.random())
                    },
                    overallScore: Math.round(75 + 20 * Math.random()),
                    suggestions: ["Consider adding more specific constraints to your prompt", "The structure is good, but could benefit from examples", "Try breaking down complex requirements into sub-tasks"]
                }),
                l(!1)
            }
            , 1e3))
        }
        ;
        return ((0,
        p.useEffect)( () => {
            e && n && !a && c()
        }
        , [e, n]),
        e) ? (0,
        d.jsx)(s9, {
            children: (0,
            d.jsx)(sQ.div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
                onClick: t,
                children: (0,
                d.jsxs)(sQ.div, {
                    initial: {
                        opacity: 0,
                        scale: .95,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        scale: .95,
                        y: 20
                    },
                    onClick: e => e.stopPropagation(),
                    className: "w-full max-w-2xl max-h-[90vh] bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex items-center justify-between p-4 border-b border-[var(--border-subtle)]",
                        children: [(0,
                        d.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [(0,
                            d.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                                children: (0,
                                d.jsx)(oV, {
                                    className: "w-5 h-5 text-[var(--accent-primary)]"
                                })
                            }), (0,
                            d.jsxs)("div", {
                                children: [(0,
                                d.jsx)("h2", {
                                    className: "text-lg font-semibold text-[var(--text-primary)]",
                                    children: "Prompt Feedback"
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-xs text-[var(--text-muted)]",
                                    children: "AI-powered analysis of your prompt"
                                })]
                            })]
                        }), (0,
                        d.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [(0,
                            d.jsx)("button", {
                                onClick: c,
                                disabled: o,
                                className: "p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors disabled:opacity-50",
                                title: "Refresh feedback",
                                children: (0,
                                d.jsx)(dv, {
                                    className: o ? "w-5 h-5 animate-spin" : "w-5 h-5"
                                })
                            }), (0,
                            d.jsx)("button", {
                                onClick: t,
                                className: "p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                                children: (0,
                                d.jsx)(op, {
                                    className: "w-5 h-5"
                                })
                            })]
                        })]
                    }), (0,
                    d.jsx)("div", {
                        className: "p-4 md:p-6 flex-1 overflow-y-auto",
                        children: o ? (0,
                        d.jsxs)("div", {
                            className: "flex flex-col items-center justify-center py-12",
                            children: [(0,
                            d.jsx)(dv, {
                                className: "w-8 h-8 text-[var(--accent-primary)] animate-spin mb-4"
                            }), (0,
                            d.jsx)("p", {
                                className: "text-sm text-[var(--text-muted)]",
                                children: "Analyzing your prompt..."
                            })]
                        }) : a ? (0,
                        d.jsxs)("div", {
                            className: "grid md:grid-cols-2 gap-6",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "flex flex-col items-center",
                                children: [(0,
                                d.jsx)(dw, {
                                    data: a.axes,
                                    size: 220
                                }), (0,
                                d.jsxs)("div", {
                                    className: "mt-4 text-center",
                                    children: [(0,
                                    d.jsx)("div", {
                                        className: "text-3xl font-bold text-[var(--accent-primary)]",
                                        children: Math.round(a.overallScore)
                                    }), (0,
                                    d.jsx)("div", {
                                        className: "text-xs text-[var(--text-muted)]",
                                        children: "Overall Score"
                                    })]
                                })]
                            }), (0,
                            d.jsxs)("div", {
                                className: "space-y-4",
                                children: [(0,
                                d.jsxs)("h3", {
                                    className: "text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2",
                                    children: [(0,
                                    d.jsx)(uG, {
                                        className: "w-4 h-4 text-[var(--color-warning)]"
                                    }), "Suggestions"]
                                }), (0,
                                d.jsx)("div", {
                                    className: "space-y-3",
                                    children: a.suggestions.map( (e, t) => (0,
                                    d.jsx)(sQ.div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: .1 * t
                                        },
                                        className: "p-3 bg-[var(--bg-secondary)] rounded-lg text-sm text-[var(--text-secondary)]",
                                        children: e
                                    }, t))
                                }), (0,
                                d.jsxs)("div", {
                                    className: "mt-6 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)]",
                                    children: [(0,
                                    d.jsxs)("h4", {
                                        className: "text-xs font-semibold text-[var(--text-muted)] mb-3 flex items-center gap-2",
                                        children: [(0,
                                        d.jsx)(dg, {
                                            className: "w-3 h-3"
                                        }), "Your Progress"]
                                    }), (0,
                                    d.jsxs)("div", {
                                        className: "grid grid-cols-2 gap-4 text-center",
                                        children: [(0,
                                        d.jsxs)("div", {
                                            children: [(0,
                                            d.jsx)("div", {
                                                className: "text-xl font-bold text-[var(--text-primary)]",
                                                children: i.totalConversions
                                            }), (0,
                                            d.jsx)("div", {
                                                className: "text-xs text-[var(--text-muted)]",
                                                children: "Total Prompts"
                                            })]
                                        }), (0,
                                        d.jsxs)("div", {
                                            children: [(0,
                                            d.jsx)("div", {
                                                className: "text-xl font-bold text-[var(--accent-success)]",
                                                children: i.bestScore || "-"
                                            }), (0,
                                            d.jsx)("div", {
                                                className: "text-xs text-[var(--text-muted)]",
                                                children: "Best Score"
                                            })]
                                        })]
                                    })]
                                })]
                            })]
                        }) : (0,
                        d.jsxs)("div", {
                            className: "text-center py-12",
                            children: [(0,
                            d.jsx)(oV, {
                                className: "w-12 h-12 text-[var(--text-muted)] mx-auto mb-4"
                            }), (0,
                            d.jsx)("p", {
                                className: "text-sm text-[var(--text-muted)]",
                                children: "Convert a prompt first to get feedback"
                            })]
                        })
                    })]
                })
            })
        }) : null
    }
    let dN = or("Calendar", [["path", {
        d: "M8 2v4",
        key: "1cmpym"
    }], ["path", {
        d: "M16 2v4",
        key: "4m81vk"
    }], ["rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2",
        key: "1hopcy"
    }], ["path", {
        d: "M3 10h18",
        key: "8toen8"
    }]]);
    function dk() {
        let {history: e, removeFromHistory: t, clearHistory: r, loadFromHistory: n} = te()
          , {setCurrentView: i} = ez()
          , [a,s] = (0,
        p.useState)("")
          , o = e.filter(e => e.input.text.toLowerCase().includes(a.toLowerCase()));
        return (0,
        d.jsxs)(sQ.div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "p-6 max-w-4xl mx-auto",
            children: [(0,
            d.jsxs)("div", {
                className: "flex items-center justify-between mb-6",
                children: [(0,
                d.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [(0,
                    d.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                        children: (0,
                        d.jsx)(oi, {
                            className: "w-5 h-5 text-[var(--accent-primary)]"
                        })
                    }), (0,
                    d.jsxs)("div", {
                        children: [(0,
                        d.jsx)("h1", {
                            className: "text-xl font-bold text-[var(--text-primary)]",
                            children: "Conversion History"
                        }), (0,
                        d.jsxs)("p", {
                            className: "text-sm text-[var(--text-muted)]",
                            children: [e.length, " conversions saved"]
                        })]
                    })]
                }), e.length > 0 && (0,
                d.jsxs)("button", {
                    onClick: r,
                    className: "flex items-center gap-2 px-3 py-2 text-sm text-[var(--accent-error)] hover:bg-[var(--accent-error)]/10 rounded-lg transition-colors",
                    children: [(0,
                    d.jsx)(dh, {
                        className: "w-4 h-4"
                    }), "Clear All"]
                })]
            }), e.length > 0 && (0,
            d.jsxs)("div", {
                className: "relative mb-6",
                children: [(0,
                d.jsx)(uZ, {
                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                }), (0,
                d.jsx)("input", {
                    type: "text",
                    value: a,
                    onChange: e => s(e.target.value),
                    placeholder: "Search history...",
                    className: "w-full pl-10 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
                })]
            }), o.length > 0 ? (0,
            d.jsx)("div", {
                className: "space-y-3",
                children: o.map( (e, r) => (0,
                d.jsx)(sQ.div, {
                    initial: {
                        opacity: 0,
                        x: -20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        delay: .05 * r
                    },
                    className: "group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--accent-primary-subtle)] transition-all cursor-pointer",
                    onClick: () => {
                        n(e),
                        i("converter")
                    }
                    ,
                    children: (0,
                    d.jsxs)("div", {
                        className: "flex items-start justify-between gap-4",
                        children: [(0,
                        d.jsxs)("div", {
                            className: "flex-1 min-w-0",
                            children: [(0,
                            d.jsx)("p", {
                                className: "text-sm text-[var(--text-primary)] line-clamp-2 mb-2",
                                children: e.input.text
                            }), (0,
                            d.jsxs)("div", {
                                className: "flex items-center gap-4 text-xs text-[var(--text-muted)]",
                                children: [(0,
                                d.jsxs)("span", {
                                    className: "flex items-center gap-1",
                                    children: [(0,
                                    d.jsx)(dN, {
                                        className: "w-3 h-3"
                                    }), new Date(e.timestamp).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })]
                                }), (0,
                                d.jsxs)("span", {
                                    className: "flex items-center gap-1",
                                    children: [(0,
                                    d.jsx)(oz, {
                                        className: "w-3 h-3"
                                    }), new Date(e.timestamp).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })]
                                }), (0,
                                d.jsxs)("span", {
                                    className: "px-2 py-0.5 bg-[var(--bg-secondary)] rounded-full",
                                    children: ["Level ", e.input.complexity]
                                })]
                            })]
                        }), (0,
                        d.jsxs)("div", {
                            className: "flex items-center gap-2 shrink-0",
                            children: [(0,
                            d.jsx)("button", {
                                onClick: r => {
                                    r.stopPropagation(),
                                    t(e.id)
                                }
                                ,
                                className: "p-2 text-[var(--text-muted)] hover:text-[var(--accent-error)] hover:bg-[var(--accent-error)]/10 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100",
                                children: (0,
                                d.jsx)(dh, {
                                    className: "w-4 h-4 shrink-0"
                                })
                            }), (0,
                            d.jsx)(u$, {
                                className: "w-4 h-4 shrink-0 text-[var(--accent-primary)] md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            })]
                        })]
                    })
                }, e.id))
            }) : (0,
            d.jsxs)("div", {
                className: "text-center py-16",
                children: [(0,
                d.jsx)("div", {
                    className: "w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center",
                    children: (0,
                    d.jsx)(oi, {
                        className: "w-8 h-8 text-[var(--text-muted)]"
                    })
                }), (0,
                d.jsx)("h3", {
                    className: "text-lg font-medium text-[var(--text-primary)] mb-2",
                    children: a ? "No results found" : "No history yet"
                }), (0,
                d.jsx)("p", {
                    className: "text-sm text-[var(--text-muted)] mb-4",
                    children: a ? "Try a different search term" : "Your conversion history will appear here"
                }), !a && (0,
                d.jsx)("button", {
                    onClick: () => i("converter"),
                    className: "px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity",
                    children: "Start Converting"
                })]
            })]
        })
    }
    let dS = [{
        id: "code-review",
        name: "Code Review",
        category: "Development",
        description: "Analyze code for bugs, security issues, and best practices",
        prompt: "You are a senior software engineer reviewing code. Analyze the provided code for bugs, security issues, performance problems, and suggest improvements following best practices."
    }, {
        id: "blog-writer",
        name: "Blog Writer",
        category: "Content",
        description: "Create engaging blog posts with structure and CTAs",
        prompt: "Write a comprehensive blog post about the given topic. Include an engaging introduction, well-structured sections with headers, practical examples, and a compelling conclusion with a call to action."
    }, {
        id: "data-analyst",
        name: "Data Analyst",
        category: "Analysis",
        description: "Analyze datasets and generate actionable insights",
        prompt: "Analyze the provided dataset and generate insights. Identify trends, patterns, anomalies, and provide actionable recommendations based on the data. Present findings in a clear, structured format."
    }, {
        id: "api-designer",
        name: "API Designer",
        category: "Development",
        description: "Design RESTful APIs with best practices",
        prompt: "Design a RESTful API for the described system. Include endpoints, HTTP methods, request/response schemas, authentication requirements, and error handling strategies."
    }, {
        id: "email-composer",
        name: "Email Composer",
        category: "Communication",
        description: "Write professional emails with clear action items",
        prompt: "Write a professional email for the given context. Maintain appropriate tone, be concise yet thorough, include clear action items, and ensure proper formatting."
    }, {
        id: "sql-expert",
        name: "SQL Expert",
        category: "Development",
        description: "Generate optimized SQL queries",
        prompt: "Generate optimized SQL queries for the described database operations. Consider indexing, query performance, and best practices for the specific database system."
    }, {
        id: "ux-reviewer",
        name: "UX Reviewer",
        category: "Design",
        description: "Review UI/UX designs for usability",
        prompt: "Review the provided UI/UX design for usability issues. Analyze user flow, accessibility, visual hierarchy, and provide specific recommendations for improvement."
    }, {
        id: "documentation",
        name: "Tech Writer",
        category: "Documentation",
        description: "Write clear technical documentation",
        prompt: "Write clear and comprehensive technical documentation for the given feature or system. Include overview, setup instructions, usage examples, and troubleshooting tips."
    }]
      , dC = ["All", "Development", "Content", "Analysis", "Communication", "Design", "Documentation"];
    function dM() {
        let {setInputText: e} = te()
          , {setCurrentView: t} = ez()
          , [r,n] = (0,
        p.useState)("")
          , [i,a] = (0,
        p.useState)("All")
          , [s,o] = (0,
        p.useState)(null)
          , l = dS.filter(e => {
            let t = e.name.toLowerCase().includes(r.toLowerCase()) || e.description.toLowerCase().includes(r.toLowerCase())
              , n = "All" === i || e.category === i;
            return t && n
        }
        );
        return (0,
        d.jsxs)(sQ.div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "p-6 max-w-5xl mx-auto",
            children: [(0,
            d.jsxs)("div", {
                className: "flex items-center gap-3 mb-6",
                children: [(0,
                d.jsx)("div", {
                    className: "w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                    children: (0,
                    d.jsx)(oa, {
                        className: "w-5 h-5 text-[var(--accent-primary)]"
                    })
                }), (0,
                d.jsxs)("div", {
                    children: [(0,
                    d.jsx)("h1", {
                        className: "text-xl font-bold text-[var(--text-primary)]",
                        children: "Prompt Templates"
                    }), (0,
                    d.jsx)("p", {
                        className: "text-sm text-[var(--text-muted)]",
                        children: "Ready-to-use templates for common tasks"
                    })]
                })]
            }), (0,
            d.jsxs)("div", {
                className: "flex flex-col sm:flex-row gap-4 mb-6",
                children: [(0,
                d.jsxs)("div", {
                    className: "relative flex-1",
                    children: [(0,
                    d.jsx)(uZ, {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                    }), (0,
                    d.jsx)("input", {
                        type: "text",
                        value: r,
                        onChange: e => n(e.target.value),
                        placeholder: "Search templates...",
                        className: "w-full pl-10 pr-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
                    })]
                }), (0,
                d.jsx)("div", {
                    className: "flex gap-2 overflow-x-auto pb-1",
                    children: dC.map(e => (0,
                    d.jsx)("button", {
                        onClick: () => a(e),
                        className: `px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${i === e ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
                        children: e
                    }, e))
                })]
            }), (0,
            d.jsx)("div", {
                className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: l.map( (r, n) => (0,
                d.jsxs)(sQ.div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        delay: .05 * n
                    },
                    className: "group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--accent-primary-subtle)] transition-all",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex items-start justify-between mb-3",
                        children: [(0,
                        d.jsx)("span", {
                            className: "px-2 py-0.5 text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded-full",
                            children: r.category
                        }), (0,
                        d.jsx)("button", {
                            onClick: () => {
                                navigator.clipboard.writeText(r.prompt),
                                o(r.id),
                                h.toast.success("Copied to clipboard"),
                                setTimeout( () => o(null), 2e3)
                            }
                            ,
                            className: "p-1.5 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] rounded-lg transition-colors",
                            children: s === r.id ? (0,
                            d.jsx)(oE, {
                                className: "w-4 h-4 text-[var(--accent-success)]"
                            }) : (0,
                            d.jsx)(oA, {
                                className: "w-4 h-4"
                            })
                        })]
                    }), (0,
                    d.jsx)("h3", {
                        className: "font-semibold text-[var(--text-primary)] mb-1",
                        children: r.name
                    }), (0,
                    d.jsx)("p", {
                        className: "text-sm text-[var(--text-muted)] mb-4 line-clamp-2",
                        children: r.description
                    }), (0,
                    d.jsxs)("button", {
                        onClick: () => {
                            e(r.prompt),
                            t("converter"),
                            h.toast.success(`Template "${r.name}" loaded`)
                        }
                        ,
                        className: "w-full flex items-center justify-center gap-2 px-3 py-2 bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] rounded-lg text-sm font-medium hover:bg-[var(--accent-primary)] hover:text-white transition-colors",
                        children: ["Use Template", (0,
                        d.jsx)(u$, {
                            className: "w-4 h-4"
                        })]
                    })]
                }, r.id))
            }), 0 === l.length && (0,
            d.jsxs)("div", {
                className: "text-center py-16",
                children: [(0,
                d.jsx)("div", {
                    className: "w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center",
                    children: (0,
                    d.jsx)(oa, {
                        className: "w-8 h-8 text-[var(--text-muted)]"
                    })
                }), (0,
                d.jsx)("h3", {
                    className: "text-lg font-medium text-[var(--text-primary)] mb-2",
                    children: "No templates found"
                }), (0,
                d.jsx)("p", {
                    className: "text-sm text-[var(--text-muted)]",
                    children: "Try a different search or category"
                })]
            })]
        })
    }
    let dA = or("Monitor", [["rect", {
        width: "20",
        height: "14",
        x: "2",
        y: "3",
        rx: "2",
        key: "48i651"
    }], ["line", {
        x1: "8",
        x2: "16",
        y1: "21",
        y2: "21",
        key: "1svkeh"
    }], ["line", {
        x1: "12",
        x2: "12",
        y1: "17",
        y2: "21",
        key: "vw1qmm"
    }]])
      , dT = or("EyeOff", [["path", {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f"
    }], ["path", {
        d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
        key: "151rxh"
    }], ["path", {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a"
    }], ["path", {
        d: "m2 2 20 20",
        key: "1ooewy"
    }]]);
    function dP() {
        let {history: e, clearHistory: t, exportHistory: r, importHistory: n, complexity: i, setComplexity: a} = te()
          , {resetProgress: s} = e7()
          , [o,l] = (0,
        p.useState)("system")
          , [c,u] = (0,
        p.useState)(!0)
          , [m,f] = (0,
        p.useState)("")
          , [x,y] = (0,
        p.useState)(!1)
          , [v,g] = (0,
        p.useState)(!1)
          , [b,w] = (0,
        p.useState)(!1);
        return (0,
        p.useEffect)( () => {
            let e = localStorage.getItem("theme");
            e && l(e);
            let t = localStorage.getItem("gemini-api-key");
            t && (f(t),
            g(!0))
        }
        , []),
        (0,
        d.jsxs)(sQ.div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "p-6 max-w-2xl mx-auto",
            children: [(0,
            d.jsxs)("div", {
                className: "flex items-center gap-3 mb-8",
                children: [(0,
                d.jsx)("div", {
                    className: "w-10 h-10 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                    children: (0,
                    d.jsx)(os, {
                        className: "w-5 h-5 text-[var(--accent-primary)]"
                    })
                }), (0,
                d.jsxs)("div", {
                    children: [(0,
                    d.jsx)("h1", {
                        className: "text-xl font-bold text-[var(--text-primary)]",
                        children: "Settings"
                    }), (0,
                    d.jsx)("p", {
                        className: "text-sm text-[var(--text-muted)]",
                        children: "Customize your experience"
                    })]
                })]
            }), (0,
            d.jsxs)("div", {
                className: "space-y-6",
                children: [(0,
                d.jsxs)("section", {
                    className: "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5",
                    children: [(0,
                    d.jsxs)("h2", {
                        className: "text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2",
                        children: [(0,
                        d.jsx)(dc, {
                            className: "w-4 h-4 text-[var(--accent-primary)]"
                        }), "API Configuration"]
                    }), (0,
                    d.jsx)("div", {
                        className: "space-y-4",
                        children: (0,
                        d.jsxs)("div", {
                            children: [(0,
                            d.jsx)("label", {
                                className: "text-sm text-[var(--text-secondary)] mb-2 block",
                                children: "Gemini API Key"
                            }), (0,
                            d.jsxs)("div", {
                                className: "flex gap-2",
                                children: [(0,
                                d.jsxs)("div", {
                                    className: "relative flex-1",
                                    children: [(0,
                                    d.jsx)("input", {
                                        type: x ? "text" : "password",
                                        value: m,
                                        onChange: e => {
                                            f(e.target.value),
                                            g(!1)
                                        }
                                        ,
                                        placeholder: "Enter your Gemini API key",
                                        className: "w-full px-4 py-2.5 pr-10 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
                                    }), (0,
                                    d.jsx)("button", {
                                        onClick: () => y(!x),
                                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                                        children: x ? (0,
                                        d.jsx)(dT, {
                                            className: "w-4 h-4"
                                        }) : (0,
                                        d.jsx)(da, {
                                            className: "w-4 h-4"
                                        })
                                    })]
                                }), (0,
                                d.jsx)("button", {
                                    onClick: () => {
                                        if (m.trim()) {
                                            if (!m.trim().startsWith("AIza"))
                                                return void h.toast.error('Invalid API key format. Gemini API keys should start with "AIza"');
                                            if (m.trim().length < 30)
                                                return void h.toast.error("API key seems too short. Please check and try again.");
                                            localStorage.setItem("gemini-api-key", m.trim()),
                                            g(!0),
                                            h.toast.success("API key saved successfully! It will be used for all conversions.")
                                        } else
                                            localStorage.removeItem("gemini-api-key"),
                                            g(!1),
                                            h.toast.success("API key removed. Using default shared key.")
                                    }
                                    ,
                                    className: `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${v ? "bg-[var(--accent-success)]/20 text-[var(--accent-success)]" : "bg-[var(--accent-primary)] text-white hover:opacity-90"}`,
                                    children: v ? (0,
                                    d.jsx)(oE, {
                                        className: "w-4 h-4"
                                    }) : "Save"
                                })]
                            }), (0,
                            d.jsxs)("p", {
                                className: "text-xs text-[var(--text-muted)] mt-2",
                                children: ["Get your API key from", " ", (0,
                                d.jsx)("a", {
                                    href: "https://aistudio.google.com/app/apikey",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-[var(--accent-primary)] hover:underline",
                                    children: "Google AI Studio"
                                }), " ", "(free tier: 1,500 requests/day)"]
                            }), (0,
                            d.jsx)("div", {
                                className: "mt-3 p-3 bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary)]/20 rounded-lg",
                                children: (0,
                                d.jsxs)("div", {
                                    className: "flex gap-2 text-xs",
                                    children: [(0,
                                    d.jsx)("div", {
                                        className: "flex-shrink-0 mt-0.5",
                                        children: (0,
                                        d.jsx)("svg", {
                                            className: "w-4 h-4 text-[var(--accent-primary)]",
                                            fill: "currentColor",
                                            viewBox: "0 0 20 20",
                                            children: (0,
                                            d.jsx)("path", {
                                                fillRule: "evenodd",
                                                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                                                clipRule: "evenodd"
                                            })
                                        })
                                    }), (0,
                                    d.jsxs)("div", {
                                        className: "space-y-1 text-[var(--text-secondary)]",
                                        children: [(0,
                                        d.jsx)("p", {
                                            className: "font-medium text-[var(--text-primary)]",
                                            children: "How it works:"
                                        }), (0,
                                        d.jsxs)("ul", {
                                            className: "space-y-0.5 list-disc list-inside",
                                            children: [(0,
                                            d.jsx)("li", {
                                                children: "Your API key is stored only in your browser"
                                            }), (0,
                                            d.jsx)("li", {
                                                children: "Requests go directly from your browser to Google's servers"
                                            }), (0,
                                            d.jsx)("li", {
                                                children: "We never see or store your API key on our servers"
                                            }), (0,
                                            d.jsx)("li", {
                                                children: "Using your own key bypasses shared rate limits"
                                            }), (0,
                                            d.jsx)("li", {
                                                children: "Free tier gives you 1,500 requests per day (vs 100 shared)"
                                            })]
                                        })]
                                    })]
                                })
                            })]
                        })
                    })]
                }), (0,
                d.jsxs)("section", {
                    className: "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5",
                    children: [(0,
                    d.jsx)("h2", {
                        className: "text-sm font-semibold text-[var(--text-primary)] mb-4",
                        children: "Appearance"
                    }), (0,
                    d.jsx)("div", {
                        className: "space-y-4",
                        children: (0,
                        d.jsxs)("div", {
                            children: [(0,
                            d.jsx)("label", {
                                className: "text-sm text-[var(--text-secondary)] mb-2 block",
                                children: "Theme"
                            }), (0,
                            d.jsx)("div", {
                                className: "flex flex-wrap gap-2",
                                children: [{
                                    value: "light",
                                    icon: ob,
                                    label: "Light"
                                }, {
                                    value: "dark",
                                    icon: ow,
                                    label: "Dark"
                                }, {
                                    value: "system",
                                    icon: dA,
                                    label: "System"
                                }].map( ({value: e, icon: t, label: r}) => (0,
                                d.jsxs)("button", {
                                    onClick: () => (e => {
                                        if (l(e),
                                        localStorage.setItem("theme", e),
                                        "system" === e) {
                                            let e = window.matchMedia("(prefers-color-scheme: dark)").matches;
                                            document.documentElement.setAttribute("data-theme", e ? "dark" : "light")
                                        } else
                                            document.documentElement.setAttribute("data-theme", e);
                                        h.toast.success(`Theme changed to ${e}`)
                                    }
                                    )(e),
                                    className: `flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${o === e ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
                                    children: [(0,
                                    d.jsx)(t, {
                                        className: "w-4 h-4 shrink-0"
                                    }), (0,
                                    d.jsx)("span", {
                                        className: "truncate",
                                        children: r
                                    })]
                                }, e))
                            })]
                        })
                    })]
                }), (0,
                d.jsxs)("section", {
                    className: "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5",
                    children: [(0,
                    d.jsx)("h2", {
                        className: "text-sm font-semibold text-[var(--text-primary)] mb-4",
                        children: "Converter Defaults"
                    }), (0,
                    d.jsxs)("div", {
                        className: "space-y-4",
                        children: [(0,
                        d.jsxs)("div", {
                            children: [(0,
                            d.jsxs)("label", {
                                className: "text-sm text-[var(--text-secondary)] mb-2 block",
                                children: ["Default Complexity Level: ", i]
                            }), (0,
                            d.jsx)("input", {
                                type: "range",
                                min: "1",
                                max: "7",
                                value: i,
                                onChange: e => a(Number(e.target.value)),
                                className: "w-full accent-[var(--accent-primary)]"
                            }), (0,
                            d.jsxs)("div", {
                                className: "flex justify-between text-xs text-[var(--text-muted)] mt-1",
                                children: [(0,
                                d.jsx)("span", {
                                    children: "Basic"
                                }), (0,
                                d.jsx)("span", {
                                    children: "Expert"
                                })]
                            })]
                        }), (0,
                        d.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [(0,
                            d.jsxs)("div", {
                                children: [(0,
                                d.jsx)("p", {
                                    className: "text-sm text-[var(--text-primary)]",
                                    children: "Auto-save to history"
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-xs text-[var(--text-muted)]",
                                    children: "Save conversions automatically"
                                })]
                            }), (0,
                            d.jsx)("button", {
                                onClick: () => u(!c),
                                className: `w-12 h-6 rounded-full transition-colors ${c ? "bg-[var(--accent-primary)]" : "bg-[var(--bg-tertiary)]"}`,
                                children: (0,
                                d.jsx)("div", {
                                    className: `w-5 h-5 bg-white rounded-full shadow transition-transform ${c ? "translate-x-6" : "translate-x-0.5"}`
                                })
                            })]
                        })]
                    })]
                }), (0,
                d.jsxs)("section", {
                    className: "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5",
                    children: [(0,
                    d.jsx)("h2", {
                        className: "text-sm font-semibold text-[var(--text-primary)] mb-4",
                        children: "Data Management"
                    }), (0,
                    d.jsxs)("div", {
                        className: "space-y-3",
                        children: [(0,
                        d.jsxs)("div", {
                            className: "flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg",
                            children: [(0,
                            d.jsxs)("div", {
                                children: [(0,
                                d.jsx)("p", {
                                    className: "text-sm text-[var(--text-primary)]",
                                    children: "History"
                                }), (0,
                                d.jsxs)("p", {
                                    className: "text-xs text-[var(--text-muted)]",
                                    children: [e.length, " conversions saved"]
                                })]
                            }), (0,
                            d.jsxs)("div", {
                                className: "flex gap-2",
                                children: [(0,
                                d.jsx)("button", {
                                    onClick: () => {
                                        let e = new Blob([r()],{
                                            type: "application/json"
                                        })
                                          , t = URL.createObjectURL(e)
                                          , n = document.createElement("a");
                                        n.href = t,
                                        n.download = `jprompter-history-${new Date().toISOString().split("T")[0]}.json`,
                                        n.click(),
                                        URL.revokeObjectURL(t),
                                        h.toast.success("History exported")
                                    }
                                    ,
                                    disabled: 0 === e.length,
                                    className: "p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] rounded-lg transition-colors disabled:opacity-40",
                                    title: "Export",
                                    children: (0,
                                    d.jsx)(oT, {
                                        className: "w-4 h-4"
                                    })
                                }), (0,
                                d.jsx)("button", {
                                    onClick: () => {
                                        let e = document.createElement("input");
                                        e.type = "file",
                                        e.accept = ".json",
                                        e.onchange = e => {
                                            let t = e.target.files?.[0];
                                            if (t) {
                                                let e = new FileReader;
                                                e.onload = e => {
                                                    try {
                                                        let t = e.target?.result;
                                                        n(t),
                                                        h.toast.success("History imported")
                                                    } catch {
                                                        h.toast.error("Invalid file format")
                                                    }
                                                }
                                                ,
                                                e.readAsText(t)
                                            }
                                        }
                                        ,
                                        e.click()
                                    }
                                    ,
                                    className: "p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary-subtle)] rounded-lg transition-colors",
                                    title: "Import",
                                    children: (0,
                                    d.jsx)(dp, {
                                        className: "w-4 h-4"
                                    })
                                })]
                            })]
                        }), (0,
                        d.jsxs)("button", {
                            onClick: () => {
                                w(!0)
                            }
                            ,
                            className: "w-full flex items-center justify-center gap-2 px-4 py-3 text-[var(--accent-error)] bg-[var(--accent-error)]/10 hover:bg-[var(--accent-error)]/20 rounded-lg text-sm font-medium transition-colors",
                            children: [(0,
                            d.jsx)(dh, {
                                className: "w-4 h-4"
                            }), "Clear All Data"]
                        })]
                    })]
                }), (0,
                d.jsxs)("section", {
                    className: "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5",
                    children: [(0,
                    d.jsx)("h2", {
                        className: "text-sm font-semibold text-[var(--text-primary)] mb-4",
                        children: "Reset"
                    }), (0,
                    d.jsxs)("button", {
                        onClick: () => {
                            localStorage.removeItem("theme"),
                            l("system"),
                            a(4),
                            h.toast.success("Settings reset to defaults")
                        }
                        ,
                        className: "flex items-center gap-2 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg text-sm transition-colors",
                        children: [(0,
                        d.jsx)(o_, {
                            className: "w-4 h-4"
                        }), "Reset to Defaults"]
                    })]
                })]
            }), (0,
            d.jsx)(dx, {
                isOpen: b,
                onClose: () => w(!1),
                onConfirm: () => {
                    t(),
                    s(),
                    h.toast.success("All data cleared")
                }
                ,
                title: "Clear All Data?",
                message: "This will permanently delete all your conversion history, saved prompts, and learning progress. This action cannot be undone.",
                confirmText: "Clear Everything",
                variant: "danger"
            })]
        })
    }
    let d_ = or("Github", [["path", {
        d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
        key: "tonef"
    }], ["path", {
        d: "M9 18c-4.51 2-5-2-7-2",
        key: "9comsn"
    }]])
      , dE = or("ExternalLink", [["path", {
        d: "M15 3h6v6",
        key: "1q9fwt"
    }], ["path", {
        d: "M10 14 21 3",
        key: "gplh6r"
    }], ["path", {
        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
        key: "a6xqqp"
    }]])
      , dI = or("Heart", [["path", {
        d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
        key: "c3ymky"
    }]])
      , dD = [{
        icon: dl,
        title: "JSON Structured Output",
        description: "Convert natural language prompts into well-organized, reusable JSON structures."
    }, {
        icon: on,
        title: "AI-Powered Analysis",
        description: "Leverages Gemini AI for intelligent prompt parsing and structure generation."
    }, {
        icon: da,
        title: "Visual Graph View",
        description: "See your prompt concepts as an interactive D3 force-directed visualization."
    }]
      , dR = [{
        name: "Next.js 14",
        category: "Framework"
    }, {
        name: "TypeScript",
        category: "Language"
    }, {
        name: "Tailwind CSS",
        category: "Styling"
    }, {
        name: "Framer Motion",
        category: "Animation"
    }, {
        name: "Zustand",
        category: "State"
    }, {
        name: "D3.js",
        category: "Visualization"
    }, {
        name: "Gemini AI",
        category: "AI"
    }];
    function dL() {
        return (0,
        d.jsxs)(sQ.div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "p-6 max-w-3xl mx-auto",
            children: [(0,
            d.jsxs)("div", {
                className: "text-center mb-10",
                children: [(0,
                d.jsx)(sQ.div, {
                    initial: {
                        scale: .8,
                        opacity: 0
                    },
                    animate: {
                        scale: 1,
                        opacity: 1
                    },
                    transition: {
                        delay: .1
                    },
                    className: "w-20 h-20 mx-auto mb-4 rounded-2xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                    children: (0,
                    d.jsx)(om.default, {
                        src: "/favicon.svg",
                        alt: "Y7-Jprompter Logo",
                        width: 48,
                        height: 48,
                        className: "w-12 h-12"
                    })
                }), (0,
                d.jsx)("h1", {
                    className: "text-2xl font-bold text-[var(--text-primary)] mb-2",
                    children: "Y7-Jprompter"
                }), (0,
                d.jsx)("p", {
                    className: "text-[var(--text-secondary)]",
                    children: "Transform prompts into structured JSON"
                }), (0,
                d.jsx)("p", {
                    className: "text-sm text-[var(--text-muted)] mt-1",
                    children: "Version 1.0.0"
                })]
            }), (0,
            d.jsxs)("section", {
                className: "mb-8",
                children: [(0,
                d.jsx)("h2", {
                    className: "text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4",
                    children: "Features"
                }), (0,
                d.jsx)("div", {
                    className: "space-y-3",
                    children: dD.map( (e, t) => (0,
                    d.jsxs)(sQ.div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: .1 + .1 * t
                        },
                        className: "flex items-start gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl",
                        children: [(0,
                        d.jsx)("div", {
                            className: "w-10 h-10 rounded-lg bg-[var(--accent-primary-subtle)] flex items-center justify-center flex-shrink-0",
                            children: (0,
                            d.jsx)(e.icon, {
                                className: "w-5 h-5 text-[var(--accent-primary)]"
                            })
                        }), (0,
                        d.jsxs)("div", {
                            children: [(0,
                            d.jsx)("h3", {
                                className: "font-medium text-[var(--text-primary)] mb-1",
                                children: e.title
                            }), (0,
                            d.jsx)("p", {
                                className: "text-sm text-[var(--text-secondary)]",
                                children: e.description
                            })]
                        })]
                    }, e.title))
                })]
            }), (0,
            d.jsxs)("section", {
                className: "mb-8",
                children: [(0,
                d.jsx)("h2", {
                    className: "text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4",
                    children: "Tech Stack"
                }), (0,
                d.jsx)("div", {
                    className: "flex flex-wrap gap-2",
                    children: dR.map( (e, t) => (0,
                    d.jsxs)(sQ.span, {
                        initial: {
                            opacity: 0,
                            scale: .8
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            delay: .2 + .05 * t
                        },
                        className: "px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full text-sm",
                        children: [(0,
                        d.jsx)("span", {
                            className: "text-[var(--text-primary)]",
                            children: e.name
                        }), (0,
                        d.jsxs)("span", {
                            className: "text-[var(--text-muted)] ml-1.5 text-xs",
                            children: ["(", e.category, ")"]
                        })]
                    }, e.name))
                })]
            }), (0,
            d.jsxs)("section", {
                className: "mb-8",
                children: [(0,
                d.jsx)("h2", {
                    className: "text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4",
                    children: "Links"
                }), (0,
                d.jsxs)("div", {
                    className: "grid sm:grid-cols-2 gap-3",
                    children: [(0,
                    d.jsxs)("a", {
                        href: "https://github.com/y7-labs/y7-jprompter",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-primary-subtle)] transition-colors",
                        children: [(0,
                        d.jsx)(d_, {
                            className: "w-5 h-5 text-[var(--text-primary)]"
                        }), (0,
                        d.jsxs)("div", {
                            className: "flex-1",
                            children: [(0,
                            d.jsx)("p", {
                                className: "font-medium text-[var(--text-primary)]",
                                children: "GitHub"
                            }), (0,
                            d.jsx)("p", {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "View source code"
                            })]
                        }), (0,
                        d.jsx)(dE, {
                            className: "w-4 h-4 text-[var(--text-muted)]"
                        })]
                    }), (0,
                    d.jsxs)("a", {
                        href: "https://y7labs.dev",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-primary-subtle)] transition-colors",
                        children: [(0,
                        d.jsx)(oo, {
                            className: "w-5 h-5 text-[var(--text-primary)]"
                        }), (0,
                        d.jsxs)("div", {
                            className: "flex-1",
                            children: [(0,
                            d.jsx)("p", {
                                className: "font-medium text-[var(--text-primary)]",
                                children: "Y7 Labs"
                            }), (0,
                            d.jsx)("p", {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "Visit website"
                            })]
                        }), (0,
                        d.jsx)(dE, {
                            className: "w-4 h-4 text-[var(--text-muted)]"
                        })]
                    })]
                })]
            }), (0,
            d.jsxs)("section", {
                className: "text-center py-6 border-t border-[var(--border-subtle)]",
                children: [(0,
                d.jsxs)("p", {
                    className: "text-sm text-[var(--text-secondary)] flex items-center justify-center gap-1",
                    children: ["Made with ", (0,
                    d.jsx)(dI, {
                        className: "w-4 h-4 text-red-500"
                    }), " by Y7 Labs"]
                }), (0,
                d.jsx)("p", {
                    className: "text-xs text-[var(--text-muted)] mt-2",
                    children: "© 2026 Y7 Labs. All rights reserved."
                })]
            })]
        })
    }
    let dz = {
        rest: {
            x: -12,
            opacity: 0
        },
        hover: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 25
            }
        }
    };
    function dO() {
        var e;
        let {currentView: t, setCurrentView: r, sidebarCollapsed: n} = ez()
          , {convert: i, clearAll: a, jsonOutput: s} = te()
          , {skills: o} = e7()
          , [l] = (0,
        p.useState)("50-50")
          , [c,u] = (0,
        p.useState)(!1)
          , [m,f] = (0,
        p.useState)(!1)
          , [x,y] = (0,
        p.useState)(!1)
          , [v,g] = (0,
        p.useState)("input");
        return (0,
        p.useEffect)( () => {
            let e = () => u(window.innerWidth >= 1024);
            return e(),
            window.addEventListener("resize", e),
            () => window.removeEventListener("resize", e)
        }
        , []),
        (0,
        p.useEffect)( () => {
            s && !c && g("output")
        }
        , [s, c]),
        e = [{
            combo: {
                key: "Enter",
                ctrl: !0
            },
            handler: async () => {
                let e = i();
                h.toast.promise(e, {
                    loading: "Converting prompt...",
                    success: "Converted!",
                    error: "Failed"
                }),
                await e
            }
            ,
            description: "Convert Prompt"
        }, {
            combo: {
                key: "Delete",
                ctrl: !0
            },
            handler: a,
            description: "Clear All"
        }],
        (0,
        p.useEffect)( () => {
            let t = t => {
                let r = t.target
                  , n = "INPUT" === r.tagName || "TEXTAREA" === r.tagName;
                e.forEach( ({combo: e, handler: r}) => {
                    let i = t.key.toLowerCase() === e.key.toLowerCase()
                      , a = !!e.ctrl === (t.ctrlKey || t.metaKey)
                      , s = !!e.shift === t.shiftKey
                      , o = !!e.alt === t.altKey;
                    if (i && a && s && o) {
                        if (n && !e.ctrl && !e.alt && !e.meta)
                            return;
                        t.preventDefault(),
                        r(t)
                    }
                }
                )
            }
            ;
            return window.addEventListener("keydown", t),
            () => window.removeEventListener("keydown", t)
        }
        , [e]),
        (0,
        d.jsxs)("div", {
            className: "min-h-screen bg-[var(--bg-primary)]",
            children: [(0,
            d.jsx)("header", {
                className: "fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 backdrop-blur-sm",
                children: (0,
                d.jsxs)("div", {
                    className: "w-full px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex items-center gap-2 sm:gap-3",
                        children: [(0,
                        d.jsx)(ov, {}), (0,
                        d.jsxs)(sQ.div, {
                            className: "flex items-center gap-2 cursor-pointer",
                            onClick: () => r("home"),
                            whileHover: {
                                scale: 1.02
                            },
                            whileTap: {
                                scale: .98
                            },
                            children: [(0,
                            d.jsx)(sQ.div, {
                                className: "w-9 h-9 flex items-center justify-center",
                                whileHover: {
                                    rotate: 10,
                                    scale: 1.1
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 400
                                },
                                children: (0,
                                d.jsx)(om.default, {
                                    src: "/favicon.svg",
                                    alt: "Y7-Jprompter Logo",
                                    width: 28,
                                    height: 28,
                                    className: "w-7 h-7"
                                })
                            }), (0,
                            d.jsx)("span", {
                                className: "hidden sm:inline font-semibold text-[var(--text-primary)]",
                                children: "Y7-Jprompter"
                            })]
                        })]
                    }), (0,
                    d.jsxs)("div", {
                        className: "flex items-center gap-1 sm:gap-2",
                        children: [(0,
                        d.jsx)("button", {
                            onClick: () => f(!0),
                            className: "p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                            title: "Prompt Library",
                            children: (0,
                            d.jsx)(ds, {
                                className: "w-5 h-5"
                            })
                        }), (0,
                        d.jsx)("button", {
                            onClick: () => y(!0),
                            disabled: !s,
                            className: "p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                            title: "Get Feedback",
                            children: (0,
                            d.jsx)(oV, {
                                className: "w-5 h-5"
                            })
                        }), (0,
                        d.jsx)(oj, {})]
                    })]
                })
            }), "home" !== t && (0,
            d.jsx)(od, {}), (0,
            d.jsxs)("div", {
                className: "min-h-screen pt-16 transition-all duration-300 flex flex-col",
                style: {
                    marginLeft: "home" !== t && c ? n ? "80px" : "240px" : "0",
                    height: "converter" === t ? "100vh" : "auto"
                },
                children: ["home" === t && (0,
                d.jsxs)(sQ.main, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        duration: .2
                    },
                    className: "max-w-6xl mx-auto px-5 sm:px-6 lg:px-8",
                    children: [(0,
                    d.jsxs)("section", {
                        className: "py-16 sm:py-24 text-center",
                        children: [(0,
                        d.jsx)(sQ.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: .1
                            },
                            children: (0,
                            d.jsx)("span", {
                                className: "inline-block px-3 py-1 mb-6 text-sm font-medium text-[var(--accent-primary)] bg-[var(--accent-primary-subtle)] rounded-full",
                                children: "Free & Open Source"
                            })
                        }), (0,
                        d.jsxs)(sQ.h1, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: .15
                            },
                            className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight",
                            children: ["Transform Your Prompts", (0,
                            d.jsx)("br", {}), (0,
                            d.jsx)("span", {
                                className: "text-[var(--accent-primary)]",
                                children: "Into Structured JSON"
                            })]
                        }), (0,
                        d.jsx)(sQ.p, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: .2
                            },
                            className: "text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10",
                            children: "Convert natural language prompts into well-organized JSON structures. Visualize concepts and relationships with interactive graphs."
                        }), (0,
                        d.jsx)(sQ.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: .25
                            },
                            children: (0,
                            d.jsxs)(sQ.button, {
                                onClick: () => r("converter"),
                                initial: "rest",
                                whileHover: "hover",
                                whileTap: {
                                    scale: .98
                                },
                                className: "group relative inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-primary)] text-white font-semibold rounded-xl shadow-lg shadow-[var(--accent-primary-glow)] overflow-hidden",
                                children: [(0,
                                d.jsx)(sQ.div, {
                                    className: "absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-0",
                                    initial: {
                                        x: "-100%"
                                    },
                                    whileHover: {
                                        x: "100%",
                                        opacity: .3
                                    },
                                    transition: {
                                        duration: .6,
                                        ease: "easeInOut"
                                    }
                                }), (0,
                                d.jsx)("span", {
                                    className: "relative z-10",
                                    children: "Use for Free"
                                }), (0,
                                d.jsx)(sQ.span, {
                                    variants: dz,
                                    className: "relative z-10 hidden md:block",
                                    children: (0,
                                    d.jsx)(u$, {
                                        className: "w-5 h-5"
                                    })
                                }), (0,
                                d.jsx)("span", {
                                    className: "relative z-10 md:hidden",
                                    children: (0,
                                    d.jsx)(u$, {
                                        className: "w-5 h-5"
                                    })
                                })]
                            })
                        })]
                    }), (0,
                    d.jsxs)("section", {
                        className: "py-16 sm:py-20 border-t border-[var(--border-subtle)]",
                        children: [(0,
                        d.jsx)(sQ.h2, {
                            initial: {
                                opacity: 0
                            },
                            whileInView: {
                                opacity: 1
                            },
                            viewport: {
                                once: !0
                            },
                            className: "text-2xl font-bold text-[var(--text-primary)] text-center mb-10 sm:mb-12",
                            children: "How It Works"
                        }), (0,
                        d.jsx)("div", {
                            className: "grid sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mx-1 sm:mx-0",
                            children: [{
                                icon: dl,
                                title: "JSON Structured",
                                description: "Convert natural prompts into well-organized JSON format"
                            }, {
                                icon: on,
                                title: "AI Powered",
                                description: "Leverages Gemini AI for intelligent prompt analysis"
                            }, {
                                icon: da,
                                title: "Visual Graph",
                                description: "See your prompt structure as an interactive D3 visualization"
                            }].map( (e, t) => (0,
                            d.jsxs)(sQ.div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: !0
                                },
                                transition: {
                                    delay: .1 * t
                                },
                                whileHover: {
                                    y: -4
                                },
                                className: "group text-center p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary-subtle)] hover:shadow-lg transition-all cursor-pointer",
                                children: [(0,
                                d.jsx)(sQ.div, {
                                    whileHover: {
                                        rotate: 10,
                                        scale: 1.1
                                    },
                                    className: "w-14 h-14 mx-auto mb-5 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                                    children: (0,
                                    d.jsx)(e.icon, {
                                        className: "w-7 h-7 text-[var(--accent-primary)]"
                                    })
                                }), (0,
                                d.jsx)("h3", {
                                    className: "text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors",
                                    children: e.title
                                }), (0,
                                d.jsx)("p", {
                                    className: "text-[var(--text-secondary)] text-sm leading-relaxed",
                                    children: e.description
                                })]
                            }, e.title))
                        })]
                    }), (0,
                    d.jsx)("section", {
                        className: "py-16 sm:py-20 border-t border-[var(--border-subtle)]",
                        children: (0,
                        d.jsxs)("div", {
                            className: "max-w-3xl mx-auto px-1 sm:px-0",
                            children: [(0,
                            d.jsx)(sQ.h2, {
                                initial: {
                                    opacity: 0
                                },
                                whileInView: {
                                    opacity: 1
                                },
                                viewport: {
                                    once: !0
                                },
                                className: "text-2xl font-bold text-[var(--text-primary)] text-center mb-10 sm:mb-12",
                                children: "Three Simple Steps"
                            }), (0,
                            d.jsx)("div", {
                                className: "space-y-3 sm:space-y-4",
                                children: [{
                                    step: 1,
                                    icon: dl,
                                    title: "Enter Your Prompt",
                                    desc: "Type or paste any natural language prompt you want to structure"
                                }, {
                                    step: 2,
                                    icon: on,
                                    title: "Choose Complexity",
                                    desc: "Select how detailed you want the JSON structure to be (1-7)"
                                }, {
                                    step: 3,
                                    icon: da,
                                    title: "Get Results",
                                    desc: "View, copy, or download your structured JSON prompt"
                                }].map( (e, t) => (0,
                                d.jsx)(sQ.div, {
                                    initial: {
                                        opacity: 0,
                                        x: -30
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        delay: .15 * t,
                                        type: "spring",
                                        stiffness: 100
                                    },
                                    className: "group relative",
                                    children: (0,
                                    d.jsxs)(sQ.div, {
                                        whileHover: {
                                            x: 4
                                        },
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25
                                        },
                                        className: "flex items-start gap-5 p-5 rounded-xl hover:bg-[var(--bg-secondary)] transition-all cursor-pointer",
                                        children: [(0,
                                        d.jsx)(sQ.div, {
                                            className: "flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white font-bold flex items-center justify-center text-lg shadow-lg shadow-[var(--accent-primary-glow)]",
                                            whileHover: {
                                                scale: 1.1,
                                                rotate: 10
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 20
                                            },
                                            children: e.step
                                        }), (0,
                                        d.jsxs)("div", {
                                            className: "flex-1 min-w-0 pt-0.5",
                                            children: [(0,
                                            d.jsxs)("div", {
                                                className: "flex items-center gap-2.5 mb-2",
                                                children: [(0,
                                                d.jsx)(sQ.div, {
                                                    whileHover: {
                                                        scale: 1.1,
                                                        rotate: 5
                                                    },
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 400
                                                    },
                                                    children: (0,
                                                    d.jsx)(e.icon, {
                                                        className: "w-5 h-5 text-[var(--accent-primary)] flex-shrink-0"
                                                    })
                                                }), (0,
                                                d.jsx)("h3", {
                                                    className: "text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight",
                                                    children: e.title
                                                })]
                                            }), (0,
                                            d.jsx)("p", {
                                                className: "text-[var(--text-secondary)] text-sm leading-relaxed",
                                                children: e.desc
                                            })]
                                        }), (0,
                                        d.jsx)(sQ.div, {
                                            className: "flex-shrink-0 self-start pt-1",
                                            initial: {
                                                opacity: 0,
                                                x: -10
                                            },
                                            whileHover: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 20
                                            },
                                            children: (0,
                                            d.jsx)(u$, {
                                                className: "w-5 h-5 text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                                            })
                                        })]
                                    })
                                }, e.step))
                            })]
                        })
                    }), (0,
                    d.jsx)("section", {
                        className: "py-16 sm:py-20 border-t border-[var(--border-subtle)]",
                        children: (0,
                        d.jsxs)(sQ.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0
                            },
                            className: "max-w-3xl mx-auto",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "flex items-center justify-center gap-3 mb-6",
                                children: [(0,
                                d.jsx)("div", {
                                    className: "w-12 h-12 rounded-xl bg-[var(--accent-primary-subtle)] flex items-center justify-center",
                                    children: (0,
                                    d.jsx)(dc, {
                                        className: "w-6 h-6 text-[var(--accent-primary)]"
                                    })
                                }), (0,
                                d.jsx)("h2", {
                                    className: "text-2xl font-bold text-[var(--text-primary)]",
                                    children: "Bring Your Own API Key"
                                })]
                            }), (0,
                            d.jsx)("p", {
                                className: "text-center text-[var(--text-secondary)] mb-8 max-w-xl mx-auto",
                                children: "Get unlimited conversions by using your own Gemini API key. It's free to get and gives you full control."
                            }), (0,
                            d.jsxs)("div", {
                                className: "grid sm:grid-cols-2 gap-4 mb-8",
                                children: [(0,
                                d.jsxs)(sQ.div, {
                                    whileHover: {
                                        y: -2
                                    },
                                    className: "p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]",
                                    children: [(0,
                                    d.jsxs)("h3", {
                                        className: "font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2",
                                        children: [(0,
                                        d.jsx)("span", {
                                            className: "w-6 h-6 rounded-full bg-[var(--accent-primary-subtle)] flex items-center justify-center text-xs font-bold text-[var(--accent-primary)]",
                                            children: "1"
                                        }), "Get Your Free Key"]
                                    }), (0,
                                    d.jsxs)("p", {
                                        className: "text-sm text-[var(--text-secondary)]",
                                        children: ["Visit", " ", (0,
                                        d.jsx)("a", {
                                            href: "https://aistudio.google.com/apikey",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-[var(--accent-primary)] hover:underline",
                                            children: "Google AI Studio"
                                        }), " ", "and create a free Gemini API key in seconds."]
                                    })]
                                }), (0,
                                d.jsxs)(sQ.div, {
                                    whileHover: {
                                        y: -2
                                    },
                                    className: "p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]",
                                    children: [(0,
                                    d.jsxs)("h3", {
                                        className: "font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2",
                                        children: [(0,
                                        d.jsx)("span", {
                                            className: "w-6 h-6 rounded-full bg-[var(--accent-primary-subtle)] flex items-center justify-center text-xs font-bold text-[var(--accent-primary)]",
                                            children: "2"
                                        }), "Add to Settings"]
                                    }), (0,
                                    d.jsxs)("p", {
                                        className: "text-sm text-[var(--text-secondary)]",
                                        children: ["Go to", " ", (0,
                                        d.jsxs)("button", {
                                            onClick: () => r("settings"),
                                            className: "text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1",
                                            children: [(0,
                                            d.jsx)(os, {
                                                className: "w-3 h-3"
                                            }), "Settings"]
                                        }), " ", "and paste your API key. It's stored locally and never sent to our servers."]
                                    })]
                                })]
                            }), (0,
                            d.jsx)("div", {
                                className: "text-center p-4 rounded-xl bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/20",
                                children: (0,
                                d.jsxs)("p", {
                                    className: "text-sm text-[var(--accent-success)] font-medium flex items-center justify-center gap-4 flex-wrap",
                                    children: [(0,
                                    d.jsxs)("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [(0,
                                        d.jsx)(oE, {
                                            className: "w-4 h-4"
                                        }), " Your API key stays in your browser"]
                                    }), (0,
                                    d.jsxs)("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [(0,
                                        d.jsx)(oE, {
                                            className: "w-4 h-4"
                                        }), " Unlimited conversions"]
                                    }), (0,
                                    d.jsxs)("span", {
                                        className: "flex items-center gap-1.5",
                                        children: [(0,
                                        d.jsx)(oE, {
                                            className: "w-4 h-4"
                                        }), " No daily limits"]
                                    })]
                                })
                            })]
                        })
                    }), (0,
                    d.jsx)("section", {
                        className: "py-16 sm:py-20 border-t border-[var(--border-subtle)]",
                        children: (0,
                        d.jsxs)(sQ.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0
                            },
                            className: "text-center max-w-2xl mx-auto",
                            children: [(0,
                            d.jsx)("h2", {
                                className: "text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4",
                                children: "Ready to Transform Your Prompts?"
                            }), (0,
                            d.jsx)("p", {
                                className: "text-[var(--text-secondary)] mb-8",
                                children: "Start converting your natural language prompts into structured JSON today."
                            }), (0,
                            d.jsxs)(sQ.button, {
                                onClick: () => r("converter"),
                                initial: "rest",
                                whileHover: "hover",
                                whileTap: {
                                    scale: .98
                                },
                                className: "group relative inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-primary)] text-white font-semibold rounded-xl shadow-lg shadow-[var(--accent-primary-glow)] overflow-hidden",
                                children: [(0,
                                d.jsx)(sQ.div, {
                                    className: "absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-0",
                                    initial: {
                                        x: "-100%"
                                    },
                                    whileHover: {
                                        x: "100%",
                                        opacity: .3
                                    },
                                    transition: {
                                        duration: .6,
                                        ease: "easeInOut"
                                    }
                                }), (0,
                                d.jsx)("span", {
                                    className: "relative z-10",
                                    children: "Get Started"
                                }), (0,
                                d.jsx)(sQ.span, {
                                    variants: dz,
                                    className: "relative z-10 hidden md:block",
                                    children: (0,
                                    d.jsx)(u$, {
                                        className: "w-5 h-5"
                                    })
                                }), (0,
                                d.jsx)("span", {
                                    className: "relative z-10 md:hidden",
                                    children: (0,
                                    d.jsx)(u$, {
                                        className: "w-5 h-5"
                                    })
                                })]
                            })]
                        })
                    }), (0,
                    d.jsx)("section", {
                        className: "py-16 sm:py-20 border-t border-[var(--border-subtle)]",
                        children: (0,
                        d.jsxs)(sQ.div, {
                            initial: {
                                opacity: 0
                            },
                            whileInView: {
                                opacity: 1
                            },
                            viewport: {
                                once: !0
                            },
                            className: "max-w-3xl mx-auto",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "flex items-center justify-center gap-3 mb-10",
                                children: [(0,
                                d.jsx)(oG, {
                                    className: "w-6 h-6 text-[var(--accent-primary)]"
                                }), (0,
                                d.jsx)("h2", {
                                    className: "text-2xl font-bold text-[var(--text-primary)]",
                                    children: "Frequently Asked Questions"
                                })]
                            }), (0,
                            d.jsx)("div", {
                                className: "space-y-4",
                                children: [{
                                    q: "What is Y7-Jprompter?",
                                    a: "Y7-Jprompter is a free tool that converts natural language prompts into structured JSON format. This helps you create more effective prompts for AI systems by organizing your instructions clearly."
                                }, {
                                    q: "Is it really free to use?",
                                    a: "Yes! You get 100 free conversions per day. For unlimited usage, you can add your own free Gemini API key from Google AI Studio."
                                }, {
                                    q: "Is my API key safe?",
                                    a: "Absolutely. Your API key is stored only in your browser's local storage and is sent directly to Google's API. We never store or have access to your key on our servers."
                                }, {
                                    q: "What are complexity levels?",
                                    a: "Complexity levels (1-7) control how detailed the JSON output will be. Level 1 gives you a simple structure, while level 7 provides the most comprehensive breakdown with all available fields."
                                }, {
                                    q: "What is Context Injection?",
                                    a: "Context Injection (available at complexity 3+) lets you add project-specific context like your tech stack, coding style, or domain knowledge. This helps generate more tailored prompt structures."
                                }, {
                                    q: "Can I save my converted prompts?",
                                    a: "Yes! All your conversions are automatically saved to History. You can also save favorites to your Prompt Library for quick access later."
                                }].map( (e, t) => (0,
                                d.jsxs)(sQ.details, {
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    viewport: {
                                        once: !0
                                    },
                                    transition: {
                                        delay: .05 * t
                                    },
                                    className: "group p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] cursor-pointer",
                                    children: [(0,
                                    d.jsxs)("summary", {
                                        className: "flex items-center justify-between font-medium text-[var(--text-primary)] list-none",
                                        children: [(0,
                                        d.jsx)("span", {
                                            children: e.q
                                        }), (0,
                                        d.jsx)(du, {
                                            className: "w-5 h-5 text-[var(--text-muted)] group-open:rotate-180 transition-transform"
                                        })]
                                    }), (0,
                                    d.jsx)("p", {
                                        className: "mt-3 text-sm text-[var(--text-secondary)] leading-relaxed",
                                        children: e.a
                                    })]
                                }, t))
                            })]
                        })
                    }), (0,
                    d.jsx)("footer", {
                        className: "py-8 border-t border-[var(--border-subtle)] text-center",
                        children: (0,
                        d.jsx)("p", {
                            className: "text-sm text-[var(--text-muted)]",
                            children: "© 2026 Y7 Labs. All rights reserved."
                        })
                    })]
                }, "home"), "converter" === t && (0,
                d.jsxs)(sQ.main, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        duration: .2
                    },
                    className: "w-full h-full flex flex-col",
                    children: [(0,
                    d.jsxs)("div", {
                        className: "flex-1 px-5 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 overflow-hidden min-h-0",
                        children: [(0,
                        d.jsx)("section", {
                            className: "hidden lg:flex flex-1 min-h-0",
                            children: (0,
                            d.jsxs)(eM, {
                                direction: "horizontal",
                                className: "h-full gap-2",
                                children: [(0,
                                d.jsx)(S, {
                                    defaultSize: "70-30" === l ? 70 : "focus" === l ? 100 : 50,
                                    minSize: 30,
                                    className: "flex",
                                    children: (0,
                                    d.jsx)(sQ.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: .1
                                        },
                                        className: "flex-1 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl",
                                        "data-tour": "input-panel",
                                        children: (0,
                                        d.jsx)("div", {
                                            className: "p-6 h-full",
                                            children: (0,
                                            d.jsx)(oq, {})
                                        })
                                    })
                                }), "focus" !== l && (0,
                                d.jsxs)(d.Fragment, {
                                    children: [(0,
                                    d.jsx)(eP, {
                                        className: "w-2 flex items-center justify-center group hover:bg-[var(--accent-primary-subtle)] rounded-full transition-colors mx-1",
                                        children: (0,
                                        d.jsx)("div", {
                                            className: "w-1 h-12 bg-[var(--border-default)] group-hover:bg-[var(--accent-primary)] rounded-full transition-colors"
                                        })
                                    }), (0,
                                    d.jsx)(S, {
                                        defaultSize: "70-30" === l ? 30 : 50,
                                        minSize: 25,
                                        className: "flex",
                                        children: (0,
                                        d.jsx)(sQ.div, {
                                            initial: {
                                                opacity: 0,
                                                y: 20
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                delay: .2
                                            },
                                            className: "flex-1 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl",
                                            "data-tour": "output-panel",
                                            children: (0,
                                            d.jsx)(u9, {})
                                        })
                                    })]
                                })]
                            })
                        }), (0,
                        d.jsxs)("section", {
                            className: "lg:hidden flex flex-col flex-1 min-h-0",
                            children: [(0,
                            d.jsxs)("div", {
                                className: "flex-shrink-0 flex gap-2 p-1 bg-[var(--bg-tertiary)] rounded-xl mb-3",
                                children: [(0,
                                d.jsxs)("button", {
                                    onClick: () => g("input"),
                                    className: `flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${"input" === v ? "bg-[var(--accent-primary)] text-white shadow-md" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`,
                                    children: [(0,
                                    d.jsx)(oX, {
                                        className: "w-4 h-4"
                                    }), (0,
                                    d.jsx)("span", {
                                        children: "Input"
                                    })]
                                }), (0,
                                d.jsxs)("button", {
                                    onClick: () => g("output"),
                                    className: `flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all relative ${"output" === v ? "bg-[var(--accent-primary)] text-white shadow-md" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`,
                                    children: [(0,
                                    d.jsx)(oW, {
                                        className: "w-4 h-4"
                                    }), (0,
                                    d.jsx)("span", {
                                        children: "Output"
                                    }), s && "input" === v && (0,
                                    d.jsx)("span", {
                                        className: "absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent-success)] rounded-full animate-pulse"
                                    })]
                                })]
                            }), (0,
                            d.jsx)("div", {
                                className: "flex-1 min-h-0 overflow-hidden",
                                children: (0,
                                d.jsx)(s9, {
                                    mode: "wait",
                                    children: "input" === v ? (0,
                                    d.jsx)(sQ.div, {
                                        initial: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        transition: {
                                            duration: .2
                                        },
                                        className: "h-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl",
                                        "data-tour": "input-panel",
                                        children: (0,
                                        d.jsx)("div", {
                                            className: "p-4 h-full overflow-auto",
                                            children: (0,
                                            d.jsx)(oq, {})
                                        })
                                    }, "mobile-input") : (0,
                                    d.jsx)(sQ.div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        transition: {
                                            duration: .2
                                        },
                                        className: "h-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden backdrop-blur-xl",
                                        "data-tour": "output-panel",
                                        children: (0,
                                        d.jsx)(u9, {
                                            showGraph: !0
                                        })
                                    }, "mobile-output")
                                })
                            })]
                        }), (0,
                        d.jsxs)("section", {
                            className: `hidden lg:grid lg:grid-cols-3 gap-4 flex-shrink-0 transition-all duration-300 ${s ? "lg:hidden" : ""}`,
                            children: [(0,
                            d.jsxs)(sQ.div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .3
                                },
                                className: "bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5",
                                children: [(0,
                                d.jsxs)("h3", {
                                    className: "text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2",
                                    children: [(0,
                                    d.jsx)(on, {
                                        className: "w-4 h-4 text-[var(--accent-primary)]"
                                    }), "Quick Stats"]
                                }), (0,
                                d.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [(0,
                                    d.jsxs)("div", {
                                        className: "text-center p-3 bg-[var(--bg-secondary)] rounded-lg",
                                        children: [(0,
                                        d.jsx)("p", {
                                            className: "text-2xl font-bold text-[var(--accent-primary)]",
                                            children: o.totalConversions
                                        }), (0,
                                        d.jsx)("p", {
                                            className: "text-xs text-[var(--text-muted)]",
                                            children: "Conversions"
                                        })]
                                    }), (0,
                                    d.jsxs)("div", {
                                        className: "text-center p-3 bg-[var(--bg-secondary)] rounded-lg",
                                        children: [(0,
                                        d.jsx)("p", {
                                            className: "text-2xl font-bold text-[var(--accent-primary)]",
                                            children: o.averageScore > 0 ? o.averageScore : "-"
                                        }), (0,
                                        d.jsx)("p", {
                                            className: "text-xs text-[var(--text-muted)]",
                                            children: "Avg Score"
                                        })]
                                    })]
                                }), o.bestScore > 0 && (0,
                                d.jsxs)("div", {
                                    className: "mt-3 pt-3 border-t border-[var(--border-subtle)] flex justify-between text-xs",
                                    children: [(0,
                                    d.jsx)("span", {
                                        className: "text-[var(--text-muted)]",
                                        children: "Best Score"
                                    }), (0,
                                    d.jsx)("span", {
                                        className: "font-medium text-[var(--accent-success)]",
                                        children: o.bestScore
                                    })]
                                })]
                            }), (0,
                            d.jsxs)(sQ.div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .4
                                },
                                className: "bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5",
                                children: [(0,
                                d.jsxs)("h3", {
                                    className: "text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2",
                                    children: [(0,
                                    d.jsx)(da, {
                                        className: "w-4 h-4 text-[var(--accent-primary)]"
                                    }), "Daily Tip"]
                                }), (0,
                                d.jsx)("div", {
                                    className: "p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)]",
                                    children: (0,
                                    d.jsxs)("p", {
                                        className: "text-sm text-[var(--text-secondary)] leading-relaxed flex items-start gap-2",
                                        children: [(0,
                                        d.jsx)(uG, {
                                            className: "w-4 h-4 text-[var(--accent-warning)] flex-shrink-0 mt-0.5"
                                        }), (0,
                                        d.jsx)("span", {
                                            children: "Use complexity level 3+ to unlock Context Injection for more detailed prompt structures."
                                        })]
                                    })
                                })]
                            }), (0,
                            d.jsxs)(sQ.div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: .5
                                },
                                className: "bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5 md:col-span-2 lg:col-span-1",
                                children: [(0,
                                d.jsxs)("h3", {
                                    className: "text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2",
                                    children: [(0,
                                    d.jsx)(dl, {
                                        className: "w-4 h-4 text-[var(--accent-primary)]"
                                    }), "Keyboard Shortcuts"]
                                }), (0,
                                d.jsxs)("div", {
                                    className: "space-y-2 text-sm",
                                    children: [(0,
                                    d.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [(0,
                                        d.jsx)("span", {
                                            className: "text-[var(--text-muted)]",
                                            children: "Convert"
                                        }), (0,
                                        d.jsx)("kbd", {
                                            className: "px-2 py-0.5 bg-[var(--bg-secondary)] rounded text-xs font-mono",
                                            children: "Ctrl + Enter"
                                        })]
                                    }), (0,
                                    d.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [(0,
                                        d.jsx)("span", {
                                            className: "text-[var(--text-muted)]",
                                            children: "Clear All"
                                        }), (0,
                                        d.jsx)("kbd", {
                                            className: "px-2 py-0.5 bg-[var(--bg-secondary)] rounded text-xs font-mono",
                                            children: "Ctrl + Del"
                                        })]
                                    })]
                                })]
                            })]
                        })]
                    }), (0,
                    d.jsx)("footer", {
                        className: `flex-shrink-0 py-3 text-center border-t border-[var(--border-subtle)] px-5 sm:px-6 lg:px-8 ${s ? "lg:hidden" : ""}`,
                        children: (0,
                        d.jsx)("p", {
                            className: "text-xs text-[var(--text-muted)]",
                            children: "© 2026 Y7 Labs"
                        })
                    })]
                }, "converter"), "history" === t && (0,
                d.jsx)(sQ.main, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        duration: .2
                    },
                    className: "flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]",
                    children: (0,
                    d.jsx)(dk, {})
                }, "history"), "templates" === t && (0,
                d.jsx)(sQ.main, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        duration: .2
                    },
                    className: "flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]",
                    children: (0,
                    d.jsx)(dM, {})
                }, "templates"), "settings" === t && (0,
                d.jsx)(sQ.main, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        duration: .2
                    },
                    className: "flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]",
                    children: (0,
                    d.jsx)(dP, {})
                }, "settings"), "about" === t && (0,
                d.jsx)(sQ.main, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        duration: .2
                    },
                    className: "flex-1 overflow-auto bg-[var(--bg-primary)] min-h-[calc(100vh-4rem)]",
                    children: (0,
                    d.jsx)(dL, {})
                }, "about")]
            }), (0,
            d.jsx)(dy, {
                isOpen: m,
                onClose: () => f(!1)
            }), (0,
            d.jsx)(dj, {
                isOpen: x,
                onClose: () => y(!1)
            })]
        })
    }
    e.s(["default", () => dO], 52683)
}
]);
