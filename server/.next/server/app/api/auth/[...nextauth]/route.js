"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_KIMISH_Desktop_gemstone_server_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\KIMISH\\\\Desktop\\\\gemstone\\\\server\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_KIMISH_Desktop_gemstone_server_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNLSU1JU0glNUNEZXNrdG9wJTVDZ2Vtc3RvbmUlNUNzZXJ2ZXIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0tJTUlTSCU1Q0Rlc2t0b3AlNUNnZW1zdG9uZSU1Q3NlcnZlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDcUM7QUFDbEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW1zdG9uZS8/NWFiYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxLSU1JU0hcXFxcRGVza3RvcFxcXFxnZW1zdG9uZVxcXFxzZXJ2ZXJcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcS0lNSVNIXFxcXERlc2t0b3BcXFxcZ2Vtc3RvbmVcXFxcc2VydmVyXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ rateLimitedHandler),\n/* harmony export */   POST: () => (/* binding */ rateLimitedHandler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_rateLimit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/rateLimit */ \"(rsc)/./lib/rateLimit.ts\");\n\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\nasync function rateLimitedHandler(req, ctx) {\n    const action = ctx.params.nextauth?.[0];\n    if (action === \"callback\" || action === \"signin\") {\n        const ip = req.headers.get(\"x-forwarded-for\")?.split(\",\")[0]?.trim() || \"unknown\";\n        const rl = (0,_lib_rateLimit__WEBPACK_IMPORTED_MODULE_2__.checkRateLimit)(`login:${ip}`, _lib_rateLimit__WEBPACK_IMPORTED_MODULE_2__.RATE_LIMITS.login);\n        if (!rl.allowed) {\n            return (0,_lib_rateLimit__WEBPACK_IMPORTED_MODULE_2__.rateLimitResponse)(rl.resetAt);\n        }\n    }\n    return handler(req, ctx);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDZ0M7QUFDUTtBQUN3QztBQUVoRixNQUFNSyxVQUFVTCxnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBRXBDLGVBQWVLLG1CQUFtQkMsR0FBZ0IsRUFBRUMsR0FBdUM7SUFDekYsTUFBTUMsU0FBU0QsSUFBSUUsTUFBTSxDQUFDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO0lBRXZDLElBQUlGLFdBQVcsY0FBY0EsV0FBVyxVQUFVO1FBQ2hELE1BQU1HLEtBQUtMLElBQUlNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG9CQUFvQkMsTUFBTSxJQUFJLENBQUMsRUFBRSxFQUFFQyxVQUFVO1FBQ3hFLE1BQU1DLEtBQUtmLDhEQUFjQSxDQUFDLENBQUMsTUFBTSxFQUFFVSxHQUFHLENBQUMsRUFBRVIsdURBQVdBLENBQUNjLEtBQUs7UUFDMUQsSUFBSSxDQUFDRCxHQUFHRSxPQUFPLEVBQUU7WUFDZixPQUFPaEIsaUVBQWlCQSxDQUFDYyxHQUFHRyxPQUFPO1FBQ3JDO0lBQ0Y7SUFFQSxPQUFPZixRQUFRRSxLQUFLQztBQUN0QjtBQUVnRSIsInNvdXJjZXMiOlsid2VicGFjazovL2dlbXN0b25lLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJ1xuaW1wb3J0IHsgY2hlY2tSYXRlTGltaXQsIHJhdGVMaW1pdFJlc3BvbnNlLCBSQVRFX0xJTUlUUyB9IGZyb20gJ0AvbGliL3JhdGVMaW1pdCdcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuXG5hc3luYyBmdW5jdGlvbiByYXRlTGltaXRlZEhhbmRsZXIocmVxOiBOZXh0UmVxdWVzdCwgY3R4OiB7IHBhcmFtczogeyBuZXh0YXV0aDogc3RyaW5nW10gfSB9KSB7XG4gIGNvbnN0IGFjdGlvbiA9IGN0eC5wYXJhbXMubmV4dGF1dGg/LlswXVxuXG4gIGlmIChhY3Rpb24gPT09ICdjYWxsYmFjaycgfHwgYWN0aW9uID09PSAnc2lnbmluJykge1xuICAgIGNvbnN0IGlwID0gcmVxLmhlYWRlcnMuZ2V0KCd4LWZvcndhcmRlZC1mb3InKT8uc3BsaXQoJywnKVswXT8udHJpbSgpIHx8ICd1bmtub3duJ1xuICAgIGNvbnN0IHJsID0gY2hlY2tSYXRlTGltaXQoYGxvZ2luOiR7aXB9YCwgUkFURV9MSU1JVFMubG9naW4pXG4gICAgaWYgKCFybC5hbGxvd2VkKSB7XG4gICAgICByZXR1cm4gcmF0ZUxpbWl0UmVzcG9uc2UocmwucmVzZXRBdClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaGFuZGxlcihyZXEsIGN0eClcbn1cblxuZXhwb3J0IHsgcmF0ZUxpbWl0ZWRIYW5kbGVyIGFzIEdFVCwgcmF0ZUxpbWl0ZWRIYW5kbGVyIGFzIFBPU1QgfVxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJjaGVja1JhdGVMaW1pdCIsInJhdGVMaW1pdFJlc3BvbnNlIiwiUkFURV9MSU1JVFMiLCJoYW5kbGVyIiwicmF0ZUxpbWl0ZWRIYW5kbGVyIiwicmVxIiwiY3R4IiwiYWN0aW9uIiwicGFyYW1zIiwibmV4dGF1dGgiLCJpcCIsImhlYWRlcnMiLCJnZXQiLCJzcGxpdCIsInRyaW0iLCJybCIsImxvZ2luIiwiYWxsb3dlZCIsInJlc2V0QXQiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthError: () => (/* binding */ AuthError),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   requireAdmin: () => (/* binding */ requireAdmin),\n/* harmony export */   requireAuth: () => (/* binding */ requireAuth)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    cookies: {\n        sessionToken: {\n            name:  false ? 0 : \"next-auth.session-token\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const isValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_2__.compare)(credentials.password, user.passwordHash);\n                if (!isValid) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    }\n};\nasync function requireAuth() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authOptions);\n    if (!session?.user) {\n        throw new AuthError(401, \"Unauthenticated\");\n    }\n    return session.user;\n}\nasync function requireAdmin() {\n    const user = await requireAuth();\n    if (user.role !== \"ADMIN\") {\n        throw new AuthError(403, \"Forbidden: admin access required\");\n    }\n    return user;\n}\nclass AuthError extends Error {\n    constructor(status, message){\n        super(message);\n        this.status = status;\n        this.name = \"AuthError\";\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTZEO0FBQ0k7QUFDL0I7QUFDRDtBQXlCMUIsTUFBTUksY0FBK0I7SUFDMUNDLFNBQVM7UUFBRUMsVUFBVTtJQUFNO0lBQzNCQyxTQUFTO1FBQ1BDLGNBQWM7WUFDWkMsTUFBTUMsTUFBeUIsR0FBZSxJQUFxQztZQUNuRkMsU0FBUztnQkFDUEMsVUFBVTtnQkFDVkMsVUFBVTtnQkFDVkMsTUFBTTtnQkFDTkMsUUFBUUwsa0JBQXlCO1lBQ25DO1FBQ0Y7SUFDRjtJQUNBTSxXQUFXO1FBQ1RmLDJFQUFtQkEsQ0FBQztZQUNsQlEsTUFBTTtZQUNOUSxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVLE9BQU87Z0JBRTFELE1BQU1FLE9BQU8sTUFBTXBCLDJDQUFNQSxDQUFDb0IsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUNwQztnQkFFQSxJQUFJLENBQUNLLE1BQU0sT0FBTztnQkFFbEIsTUFBTUcsVUFBVSxNQUFNeEIsaURBQU9BLENBQUNlLFlBQVlJLFFBQVEsRUFBRUUsS0FBS0ksWUFBWTtnQkFDckUsSUFBSSxDQUFDRCxTQUFTLE9BQU87Z0JBRXJCLE9BQU87b0JBQ0xFLElBQUlMLEtBQUtLLEVBQUU7b0JBQ1hWLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCVCxNQUFNYyxLQUFLZCxJQUFJO29CQUNmb0IsTUFBTU4sS0FBS00sSUFBSTtnQkFDakI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFVCxJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlMsTUFBTUosRUFBRSxHQUFHTCxLQUFLSyxFQUFFO2dCQUNsQkksTUFBTUgsSUFBSSxHQUFHTixLQUFLTSxJQUFJO1lBQ3hCO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU0zQixTQUFRLEVBQUVBLE9BQU8sRUFBRTJCLEtBQUssRUFBRTtZQUM5QixJQUFJM0IsUUFBUWtCLElBQUksRUFBRTtnQkFDaEJsQixRQUFRa0IsSUFBSSxDQUFDSyxFQUFFLEdBQUdJLE1BQU1KLEVBQUU7Z0JBQzFCdkIsUUFBUWtCLElBQUksQ0FBQ00sSUFBSSxHQUFHRyxNQUFNSCxJQUFJO1lBQ2hDO1lBQ0EsT0FBT3hCO1FBQ1Q7SUFDRjtJQUNBNEIsT0FBTztRQUNMQyxRQUFRO0lBQ1Y7QUFDRixFQUFDO0FBRU0sZUFBZUM7SUFDcEIsTUFBTTlCLFVBQVUsTUFBTUwsMkRBQWdCQSxDQUFDSTtJQUN2QyxJQUFJLENBQUNDLFNBQVNrQixNQUFNO1FBQ2xCLE1BQU0sSUFBSWEsVUFBVSxLQUFLO0lBQzNCO0lBQ0EsT0FBTy9CLFFBQVFrQixJQUFJO0FBQ3JCO0FBRU8sZUFBZWM7SUFDcEIsTUFBTWQsT0FBTyxNQUFNWTtJQUNuQixJQUFJWixLQUFLTSxJQUFJLEtBQUssU0FBUztRQUN6QixNQUFNLElBQUlPLFVBQVUsS0FBSztJQUMzQjtJQUNBLE9BQU9iO0FBQ1Q7QUFFTyxNQUFNYSxrQkFBa0JFO0lBQzdCQyxZQUFZLE1BQXFCLEVBQUVFLE9BQWUsQ0FBRTtRQUNsRCxLQUFLLENBQUNBO2FBRFdELFNBQUFBO1FBRWpCLElBQUksQ0FBQy9CLElBQUksR0FBRztJQUNkO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW1zdG9uZS8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zLCBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICdiY3J5cHRqcydcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJy4vcHJpc21hJ1xuaW1wb3J0IHR5cGUgeyBSb2xlIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmRlY2xhcmUgbW9kdWxlICduZXh0LWF1dGgnIHtcbiAgaW50ZXJmYWNlIFNlc3Npb24ge1xuICAgIHVzZXI6IHtcbiAgICAgIGlkOiBzdHJpbmdcbiAgICAgIGVtYWlsOiBzdHJpbmdcbiAgICAgIG5hbWU6IHN0cmluZyB8IG51bGxcbiAgICAgIHJvbGU6IFJvbGVcbiAgICB9XG4gIH1cblxuICBpbnRlcmZhY2UgVXNlciB7XG4gICAgcm9sZTogUm9sZVxuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICduZXh0LWF1dGgvand0JyB7XG4gIGludGVyZmFjZSBKV1Qge1xuICAgIGlkOiBzdHJpbmdcbiAgICByb2xlOiBSb2xlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6ICdqd3QnIH0sXG4gIGNvb2tpZXM6IHtcbiAgICBzZXNzaW9uVG9rZW46IHtcbiAgICAgIG5hbWU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyAnX19TZWN1cmUtbmV4dC1hdXRoLnNlc3Npb24tdG9rZW4nIDogJ25leHQtYXV0aC5zZXNzaW9uLXRva2VuJyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIHNhbWVTaXRlOiAnbGF4JyxcbiAgICAgICAgcGF0aDogJy8nLFxuICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ2NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAnZW1haWwnIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHJldHVybiBudWxsXG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9LFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIG51bGxcblxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZEhhc2gpXG4gICAgICAgIGlmICghaXNWYWxpZCkgcmV0dXJuIG51bGxcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9sb2dpbicsXG4gIH0sXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlQXV0aCgpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gIGlmICghc2Vzc2lvbj8udXNlcikge1xuICAgIHRocm93IG5ldyBBdXRoRXJyb3IoNDAxLCAnVW5hdXRoZW50aWNhdGVkJylcbiAgfVxuICByZXR1cm4gc2Vzc2lvbi51c2VyXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlQWRtaW4oKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCByZXF1aXJlQXV0aCgpXG4gIGlmICh1c2VyLnJvbGUgIT09ICdBRE1JTicpIHtcbiAgICB0aHJvdyBuZXcgQXV0aEVycm9yKDQwMywgJ0ZvcmJpZGRlbjogYWRtaW4gYWNjZXNzIHJlcXVpcmVkJylcbiAgfVxuICByZXR1cm4gdXNlclxufVxuXG5leHBvcnQgY2xhc3MgQXV0aEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdHVzOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpXG4gICAgdGhpcy5uYW1lID0gJ0F1dGhFcnJvcidcbiAgfVxufVxuIl0sIm5hbWVzIjpbImdldFNlcnZlclNlc3Npb24iLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiY29tcGFyZSIsInByaXNtYSIsImF1dGhPcHRpb25zIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY29va2llcyIsInNlc3Npb25Ub2tlbiIsIm5hbWUiLCJwcm9jZXNzIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwicHJvdmlkZXJzIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzVmFsaWQiLCJwYXNzd29yZEhhc2giLCJpZCIsInJvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInBhZ2VzIiwic2lnbkluIiwicmVxdWlyZUF1dGgiLCJBdXRoRXJyb3IiLCJyZXF1aXJlQWRtaW4iLCJFcnJvciIsImNvbnN0cnVjdG9yIiwic3RhdHVzIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dlbXN0b25lLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB9XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/rateLimit.ts":
/*!**************************!*\
  !*** ./lib/rateLimit.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RATE_LIMITS: () => (/* binding */ RATE_LIMITS),\n/* harmony export */   checkRateLimit: () => (/* binding */ checkRateLimit),\n/* harmony export */   rateLimitResponse: () => (/* binding */ rateLimitResponse)\n/* harmony export */ });\nconst store = new Map();\nfunction cleanup() {\n    const now = Date.now();\n    for (const [key, entry] of store){\n        if (now > entry.resetAt) {\n            store.delete(key);\n        }\n    }\n}\nconst CLEANUP_INTERVAL = 60000;\nlet cleanupTimer = null;\nfunction ensureCleanup() {\n    if (!cleanupTimer && typeof setInterval !== \"undefined\") {\n        cleanupTimer = setInterval(cleanup, CLEANUP_INTERVAL);\n    }\n}\nfunction checkRateLimit(key, config) {\n    ensureCleanup();\n    const now = Date.now();\n    const entry = store.get(key);\n    if (!entry || now > entry.resetAt) {\n        store.set(key, {\n            count: 1,\n            resetAt: now + config.windowMs\n        });\n        return {\n            allowed: true,\n            remaining: config.maxRequests - 1,\n            resetAt: now + config.windowMs\n        };\n    }\n    if (entry.count >= config.maxRequests) {\n        return {\n            allowed: false,\n            remaining: 0,\n            resetAt: entry.resetAt\n        };\n    }\n    entry.count++;\n    return {\n        allowed: true,\n        remaining: config.maxRequests - entry.count,\n        resetAt: entry.resetAt\n    };\n}\nfunction rateLimitResponse(resetAt) {\n    const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);\n    return new Response(JSON.stringify({\n        error: \"Too many requests. Please try again later.\"\n    }), {\n        status: 429,\n        headers: {\n            \"Content-Type\": \"application/json\",\n            \"Retry-After\": String(retryAfter),\n            \"X-RateLimit-Reset\": String(Math.ceil(resetAt / 1000))\n        }\n    });\n}\nconst RATE_LIMITS = {\n    login: {\n        windowMs: 15 * 60 * 1000,\n        maxRequests: 5\n    },\n    checkout: {\n        windowMs: 60 * 1000,\n        maxRequests: 3\n    },\n    webhook: {\n        windowMs: 60 * 1000,\n        maxRequests: 100\n    },\n    register: {\n        windowMs: 60 * 1000,\n        maxRequests: 3\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcmF0ZUxpbWl0LnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLE1BQU1BLFFBQVEsSUFBSUM7QUFFbEIsU0FBU0M7SUFDUCxNQUFNQyxNQUFNQyxLQUFLRCxHQUFHO0lBQ3BCLEtBQUssTUFBTSxDQUFDRSxLQUFLQyxNQUFNLElBQUlOLE1BQU87UUFDaEMsSUFBSUcsTUFBTUcsTUFBTUMsT0FBTyxFQUFFO1lBQ3ZCUCxNQUFNUSxNQUFNLENBQUNIO1FBQ2Y7SUFDRjtBQUNGO0FBRUEsTUFBTUksbUJBQW1CO0FBQ3pCLElBQUlDLGVBQXNEO0FBRTFELFNBQVNDO0lBQ1AsSUFBSSxDQUFDRCxnQkFBZ0IsT0FBT0UsZ0JBQWdCLGFBQWE7UUFDdkRGLGVBQWVFLFlBQVlWLFNBQVNPO0lBQ3RDO0FBQ0Y7QUFPTyxTQUFTSSxlQUNkUixHQUFXLEVBQ1hTLE1BQXVCO0lBRXZCSDtJQUVBLE1BQU1SLE1BQU1DLEtBQUtELEdBQUc7SUFDcEIsTUFBTUcsUUFBUU4sTUFBTWUsR0FBRyxDQUFDVjtJQUV4QixJQUFJLENBQUNDLFNBQVNILE1BQU1HLE1BQU1DLE9BQU8sRUFBRTtRQUNqQ1AsTUFBTWdCLEdBQUcsQ0FBQ1gsS0FBSztZQUFFWSxPQUFPO1lBQUdWLFNBQVNKLE1BQU1XLE9BQU9JLFFBQVE7UUFBQztRQUMxRCxPQUFPO1lBQUVDLFNBQVM7WUFBTUMsV0FBV04sT0FBT08sV0FBVyxHQUFHO1lBQUdkLFNBQVNKLE1BQU1XLE9BQU9JLFFBQVE7UUFBQztJQUM1RjtJQUVBLElBQUlaLE1BQU1XLEtBQUssSUFBSUgsT0FBT08sV0FBVyxFQUFFO1FBQ3JDLE9BQU87WUFBRUYsU0FBUztZQUFPQyxXQUFXO1lBQUdiLFNBQVNELE1BQU1DLE9BQU87UUFBQztJQUNoRTtJQUVBRCxNQUFNVyxLQUFLO0lBQ1gsT0FBTztRQUFFRSxTQUFTO1FBQU1DLFdBQVdOLE9BQU9PLFdBQVcsR0FBR2YsTUFBTVcsS0FBSztRQUFFVixTQUFTRCxNQUFNQyxPQUFPO0lBQUM7QUFDOUY7QUFFTyxTQUFTZSxrQkFBa0JmLE9BQWU7SUFDL0MsTUFBTWdCLGFBQWFDLEtBQUtDLElBQUksQ0FBQyxDQUFDbEIsVUFBVUgsS0FBS0QsR0FBRyxFQUFDLElBQUs7SUFDdEQsT0FBTyxJQUFJdUIsU0FDVEMsS0FBS0MsU0FBUyxDQUFDO1FBQUVDLE9BQU87SUFBNkMsSUFDckU7UUFDRUMsUUFBUTtRQUNSQyxTQUFTO1lBQ1AsZ0JBQWdCO1lBQ2hCLGVBQWVDLE9BQU9UO1lBQ3RCLHFCQUFxQlMsT0FBT1IsS0FBS0MsSUFBSSxDQUFDbEIsVUFBVTtRQUNsRDtJQUNGO0FBRUo7QUFFTyxNQUFNMEIsY0FBYztJQUN6QkMsT0FBTztRQUFFaEIsVUFBVSxLQUFLLEtBQUs7UUFBTUcsYUFBYTtJQUFFO0lBQ2xEYyxVQUFVO1FBQUVqQixVQUFVLEtBQUs7UUFBTUcsYUFBYTtJQUFFO0lBQ2hEZSxTQUFTO1FBQUVsQixVQUFVLEtBQUs7UUFBTUcsYUFBYTtJQUFJO0lBQ2pEZ0IsVUFBVTtRQUFFbkIsVUFBVSxLQUFLO1FBQU1HLGFBQWE7SUFBRTtBQUNsRCxFQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2Vtc3RvbmUvLi9saWIvcmF0ZUxpbWl0LnRzPzI1ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIFJhdGVMaW1pdEVudHJ5IHtcbiAgY291bnQ6IG51bWJlclxuICByZXNldEF0OiBudW1iZXJcbn1cblxuY29uc3Qgc3RvcmUgPSBuZXcgTWFwPHN0cmluZywgUmF0ZUxpbWl0RW50cnk+KClcblxuZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICBmb3IgKGNvbnN0IFtrZXksIGVudHJ5XSBvZiBzdG9yZSkge1xuICAgIGlmIChub3cgPiBlbnRyeS5yZXNldEF0KSB7XG4gICAgICBzdG9yZS5kZWxldGUoa2V5KVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBDTEVBTlVQX0lOVEVSVkFMID0gNjBfMDAwXG5sZXQgY2xlYW51cFRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRJbnRlcnZhbD4gfCBudWxsID0gbnVsbFxuXG5mdW5jdGlvbiBlbnN1cmVDbGVhbnVwKCkge1xuICBpZiAoIWNsZWFudXBUaW1lciAmJiB0eXBlb2Ygc2V0SW50ZXJ2YWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2xlYW51cFRpbWVyID0gc2V0SW50ZXJ2YWwoY2xlYW51cCwgQ0xFQU5VUF9JTlRFUlZBTClcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhdGVMaW1pdENvbmZpZyB7XG4gIHdpbmRvd01zOiBudW1iZXJcbiAgbWF4UmVxdWVzdHM6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSYXRlTGltaXQoXG4gIGtleTogc3RyaW5nLFxuICBjb25maWc6IFJhdGVMaW1pdENvbmZpZ1xuKTogeyBhbGxvd2VkOiBib29sZWFuOyByZW1haW5pbmc6IG51bWJlcjsgcmVzZXRBdDogbnVtYmVyIH0ge1xuICBlbnN1cmVDbGVhbnVwKClcblxuICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gIGNvbnN0IGVudHJ5ID0gc3RvcmUuZ2V0KGtleSlcblxuICBpZiAoIWVudHJ5IHx8IG5vdyA+IGVudHJ5LnJlc2V0QXQpIHtcbiAgICBzdG9yZS5zZXQoa2V5LCB7IGNvdW50OiAxLCByZXNldEF0OiBub3cgKyBjb25maWcud2luZG93TXMgfSlcbiAgICByZXR1cm4geyBhbGxvd2VkOiB0cnVlLCByZW1haW5pbmc6IGNvbmZpZy5tYXhSZXF1ZXN0cyAtIDEsIHJlc2V0QXQ6IG5vdyArIGNvbmZpZy53aW5kb3dNcyB9XG4gIH1cblxuICBpZiAoZW50cnkuY291bnQgPj0gY29uZmlnLm1heFJlcXVlc3RzKSB7XG4gICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlbWFpbmluZzogMCwgcmVzZXRBdDogZW50cnkucmVzZXRBdCB9XG4gIH1cblxuICBlbnRyeS5jb3VudCsrXG4gIHJldHVybiB7IGFsbG93ZWQ6IHRydWUsIHJlbWFpbmluZzogY29uZmlnLm1heFJlcXVlc3RzIC0gZW50cnkuY291bnQsIHJlc2V0QXQ6IGVudHJ5LnJlc2V0QXQgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmF0ZUxpbWl0UmVzcG9uc2UocmVzZXRBdDogbnVtYmVyKTogUmVzcG9uc2Uge1xuICBjb25zdCByZXRyeUFmdGVyID0gTWF0aC5jZWlsKChyZXNldEF0IC0gRGF0ZS5ub3coKSkgLyAxMDAwKVxuICByZXR1cm4gbmV3IFJlc3BvbnNlKFxuICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdUb28gbWFueSByZXF1ZXN0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nIH0pLFxuICAgIHtcbiAgICAgIHN0YXR1czogNDI5LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnUmV0cnktQWZ0ZXInOiBTdHJpbmcocmV0cnlBZnRlciksXG4gICAgICAgICdYLVJhdGVMaW1pdC1SZXNldCc6IFN0cmluZyhNYXRoLmNlaWwocmVzZXRBdCAvIDEwMDApKSxcbiAgICAgIH0sXG4gICAgfVxuICApXG59XG5cbmV4cG9ydCBjb25zdCBSQVRFX0xJTUlUUyA9IHtcbiAgbG9naW46IHsgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBtYXhSZXF1ZXN0czogNSB9IGFzIFJhdGVMaW1pdENvbmZpZyxcbiAgY2hlY2tvdXQ6IHsgd2luZG93TXM6IDYwICogMTAwMCwgbWF4UmVxdWVzdHM6IDMgfSBhcyBSYXRlTGltaXRDb25maWcsXG4gIHdlYmhvb2s6IHsgd2luZG93TXM6IDYwICogMTAwMCwgbWF4UmVxdWVzdHM6IDEwMCB9IGFzIFJhdGVMaW1pdENvbmZpZyxcbiAgcmVnaXN0ZXI6IHsgd2luZG93TXM6IDYwICogMTAwMCwgbWF4UmVxdWVzdHM6IDMgfSBhcyBSYXRlTGltaXRDb25maWcsXG59IGFzIGNvbnN0XG4iXSwibmFtZXMiOlsic3RvcmUiLCJNYXAiLCJjbGVhbnVwIiwibm93IiwiRGF0ZSIsImtleSIsImVudHJ5IiwicmVzZXRBdCIsImRlbGV0ZSIsIkNMRUFOVVBfSU5URVJWQUwiLCJjbGVhbnVwVGltZXIiLCJlbnN1cmVDbGVhbnVwIiwic2V0SW50ZXJ2YWwiLCJjaGVja1JhdGVMaW1pdCIsImNvbmZpZyIsImdldCIsInNldCIsImNvdW50Iiwid2luZG93TXMiLCJhbGxvd2VkIiwicmVtYWluaW5nIiwibWF4UmVxdWVzdHMiLCJyYXRlTGltaXRSZXNwb25zZSIsInJldHJ5QWZ0ZXIiLCJNYXRoIiwiY2VpbCIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwic3RhdHVzIiwiaGVhZGVycyIsIlN0cmluZyIsIlJBVEVfTElNSVRTIiwibG9naW4iLCJjaGVja291dCIsIndlYmhvb2siLCJyZWdpc3RlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/rateLimit.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CKIMISH%5CDesktop%5Cgemstone%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();