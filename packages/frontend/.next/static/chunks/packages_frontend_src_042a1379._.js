(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/packages/frontend/src/lib/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "api": (()=>api)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/',
    withCredentials: true
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/frontend/src/features/auth/auth.api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getMe": (()=>getMe),
    "login": (()=>login),
    "logout": (()=>logout),
    "refresh": (()=>refresh),
    "register": (()=>register)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/frontend/src/lib/api.ts [app-client] (ecmascript)");
;
const login = (data)=>Promise.resolve(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/login', data).then((res)=>res.data));
const register = (data)=>Promise.resolve(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/register', data).then(({ data })=>data));
const refresh = (data)=>Promise.resolve(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/refresh', data).then(({ data })=>data));
const logout = (data)=>Promise.resolve(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/logout', data).then(({ data })=>data));
const getMe = (token)=>Promise.resolve(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(({ data })=>data));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/frontend/src/store/auth.store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAuthStore": (()=>useAuthStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$features$2f$auth$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/frontend/src/features/auth/auth.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        user: null,
        tokens: null,
        setUser: (user)=>set({
                user
            }),
        setTokens: (tokens)=>set({
                tokens
            }),
        logout: ()=>set({
                user: null,
                tokens: null
            }),
        login: async (creds)=>{
            const tokens = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$features$2f$auth$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])(creds);
            set({
                tokens
            });
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$features$2f$auth$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])(tokens.access_token);
            set({
                user
            });
        },
        register: async (creds)=>{
            const tokens = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$features$2f$auth$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["register"])(creds);
            set({
                tokens
            });
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$features$2f$auth$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])(tokens.access_token);
            set({
                user
            });
        },
        refresh: async ()=>{
            const { tokens } = get();
            if (!tokens?.refresh_token) throw new Error('No refresh token');
            const newTokens = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$features$2f$auth$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refresh"])({
                refreshToken: tokens.refresh_token
            });
            set({
                tokens: newTokens
            });
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$features$2f$auth$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])(newTokens.access_token);
            set({
                user
            });
        }
    }), {
    name: 'auth',
    partialize: (state)=>({
            tokens: state.tokens,
            user: state.user
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/frontend/src/components/auth-test.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AuthTest)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/frontend/src/store/auth.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function AuthTest() {
    _s();
    const { user, tokens, login, register, refresh, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>login({
                        username: 'youruser',
                        pass: 'yourpass'
                    }),
                children: "Login"
            }, void 0, false, {
                fileName: "[project]/packages/frontend/src/components/auth-test.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>register({
                        username: 'newuser',
                        pass: 'newpass'
                    }),
                children: "Register"
            }, void 0, false, {
                fileName: "[project]/packages/frontend/src/components/auth-test.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: refresh,
                children: "Refresh"
            }, void 0, false, {
                fileName: "[project]/packages/frontend/src/components/auth-test.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: logout,
                children: "Logout"
            }, void 0, false, {
                fileName: "[project]/packages/frontend/src/components/auth-test.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                children: JSON.stringify({
                    user,
                    tokens
                }, null, 2)
            }, void 0, false, {
                fileName: "[project]/packages/frontend/src/components/auth-test.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/frontend/src/components/auth-test.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_s(AuthTest, "ZxGYoo8Oc3TlkrWnnTI9grPBMPw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AuthTest;
var _c;
__turbopack_context__.k.register(_c, "AuthTest");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=packages_frontend_src_042a1379._.js.map