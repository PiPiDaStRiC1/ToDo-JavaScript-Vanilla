// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"5j6Kf":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "d68ad56631b563d9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"a0t4e":[function(require,module,exports,__globalThis) {
var _events = require("./dom/events");
var _dragEventsJs = require("./dom/dragEvents.js");
var _elementsJs = require("./dom/elements.js");
var _themeJs = require("./utils/theme.js");
var _mediaJs = require("./utils/media.js");
(function appInit() {
    document.addEventListener('DOMContentLoaded', (0, _themeJs.showTodosAndChangeTheme));
    (0, _events.attachEvents)();
    (0, _dragEventsJs.attachDragEvents)();
    // Initial Media Query Check
    (0, _elementsJs.elements).mediaQueryMobile.matches && (0, _mediaJs.handleMediaMobile)((0, _elementsJs.elements).mediaQueryMobile);
    // mobile design update at once
    (0, _elementsJs.elements).mediaQueryTablet.matches && (0, _mediaJs.handleMediaTablet)((0, _elementsJs.elements).mediaQueryTablet);
// tablet design update at once
})();

},{"./dom/events":"a9e30","./dom/elements.js":"ljsH5","./utils/theme.js":"fR0HC","./utils/media.js":"4BUOk","./dom/dragEvents.js":"1MTMG"}],"a9e30":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "attachEvents", ()=>attachEvents);
var _elementsJs = require("../dom/elements.js");
var _themeJs = require("../utils/theme.js");
var _todoSortJs = require("../components/todoSort.js");
var _todoCreateJs = require("../components/todoCreate.js");
var _todoRemoveJs = require("../components/todoRemove.js");
var _mediaJs = require("../utils/media.js");
var _storageJs = require("../utils/storage.js");
function attachEvents() {
    (0, _elementsJs.elements).mediaQueryMobile.addEventListener('change', (0, _mediaJs.handleMediaMobile));
    (0, _elementsJs.elements).mediaQueryTablet.addEventListener('change', (0, _mediaJs.handleMediaTablet));
    (0, _elementsJs.elements).todoAddMark.addEventListener('click', (0, _todoCreateJs.addTodo));
    (0, _elementsJs.elements).sortAllBtn.addEventListener('click', (0, _todoSortJs.sort));
    (0, _elementsJs.elements).sortActiveBtn.addEventListener('click', (0, _todoSortJs.sort));
    (0, _elementsJs.elements).sortCompletedBtn.addEventListener('click', (0, _todoSortJs.sort));
    (0, _elementsJs.elements).sortCompletedClear.addEventListener('click', (0, _todoSortJs.clearCompleted));
    (0, _elementsJs.elements).sortParams.forEach((param)=>param.addEventListener('click', (0, _todoSortJs.active)));
    document.addEventListener('DOMContentLoaded', (0, _themeJs.showTodosAndChangeTheme));
    (0, _elementsJs.elements).changeThemeBtn.addEventListener('click', (0, _themeJs.changeTheme));
    (0, _elementsJs.elements).todoAddText.addEventListener('keydown', (0, _todoCreateJs.addTodoWithEnter));
    (0, _elementsJs.elements).todosList.addEventListener('click', (event)=>{
        if (event.target.classList.contains('todo__mark')) (0, _todoCreateJs.addMarkAndDecorateText)(event.target);
        else if (event.target.classList.contains('todo__text')) event.target.addEventListener('input', (0, _storageJs.changeTextInStorage));
        else if (event.target.classList.contains('todo__cross')) (0, _todoRemoveJs.removeTodo)(event.target);
    });
}

},{"../dom/elements.js":"ljsH5","../utils/theme.js":"fR0HC","../components/todoSort.js":"feij6","../components/todoCreate.js":"gXyRF","../components/todoRemove.js":"5JURI","../utils/media.js":"4BUOk","../utils/storage.js":"2BjnI","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"ljsH5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "elements", ()=>elements);
const elements = {
    body: document.querySelector('body'),
    main: document.querySelector('.main'),
    todoWrapper: document.querySelector('.todo'),
    sortParamsWrapper: document.querySelector('.todos__sort_params'),
    sortParams: document.querySelectorAll('.todos__sort_params_param'),
    todosList: document.querySelector('.todos__list'),
    todosSort: document.querySelector('.todos__sort'),
    changeThemeBtn: document.querySelector('.todo__header_btn'),
    todoAdd: document.querySelector('.todo__add'),
    todoAddMark: document.querySelector('.todo__mark--add'),
    todoAddText: document.querySelector('.todo__add_text'),
    sortAllBtn: document.querySelector('.sort__param--all'),
    sortActiveBtn: document.querySelector('.sort__param--active'),
    sortCompletedBtn: document.querySelector('.sort__param--completed'),
    sortCompletedClear: document.querySelector('.todos__sort_clear'),
    footerText: document.querySelector('.todo__footer_text'),
    mediaQueryMobile: window.matchMedia('(max-width: 468px)'),
    mediaQueryTablet: window.matchMedia('(max-width: 768px)')
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"fR0HC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "changeTheme", ()=>changeTheme);
parcelHelpers.export(exports, "showTodosAndChangeTheme", ()=>showTodosAndChangeTheme);
var _elementsJs = require("../dom/elements.js");
var _todoSortJs = require("../components/todoSort.js");
var _todoUpdateJs = require("../components/todoUpdate.js");
var _todoCountJs = require("../components/todoCount.js");
var _todoCreateJs = require("../components/todoCreate.js");
function changeTheme(event1, isClicked = true) {
    if (isClicked) {
        (0, _elementsJs.elements).changeThemeBtn.classList.toggle('todo__header_btn--light');
        // Save Theme to local Storage
        if ((0, _elementsJs.elements).changeThemeBtn.classList.contains('todo__header_btn--light')) localStorage.setItem('theme', 'light');
        else localStorage.setItem('theme', 'dark');
    }
    const lightSingleElements = [
        [
            (0, _elementsJs.elements).changeThemeBtn,
            'todo__header_btn--light'
        ],
        [
            (0, _elementsJs.elements).todosList,
            'todos__list--light'
        ],
        [
            (0, _elementsJs.elements).todosSort,
            'todos__sort--light'
        ],
        [
            (0, _elementsJs.elements).sortParamsWrapper,
            'todos__sort_params--light'
        ],
        [
            (0, _elementsJs.elements).todoAdd,
            'todo__add--light'
        ],
        [
            (0, _elementsJs.elements).todoAddText,
            'todo__add_text--light'
        ],
        [
            (0, _elementsJs.elements).todoAddMark,
            'todo__mark--add--light'
        ],
        [
            (0, _elementsJs.elements).body,
            'body--light'
        ],
        [
            document.querySelector('.todo__smth') ? document.querySelector('.todo__smth') : null,
            'todo__smth--light'
        ]
    ];
    const todoInputs = document.querySelectorAll('.todo__input');
    const todoMarks = document.querySelectorAll('.todo__mark');
    const todoTexts = document.querySelectorAll('.todo__text');
    const lightArrayElements = [
        [
            todoInputs,
            'todo__input--light'
        ],
        [
            todoMarks,
            'todo__mark--light'
        ],
        [
            todoTexts,
            'todo__text--light'
        ]
    ];
    if (localStorage.getItem('theme') === 'light') {
        // Light Background
        if ((0, _elementsJs.elements).mediaQueryTablet.matches) (0, _elementsJs.elements).main.classList.add('main--tablet', 'main--tablet--light');
        else {
            (0, _elementsJs.elements).main.classList.remove('main--tablet');
            (0, _elementsJs.elements).main.classList.add('main--light');
        }
        lightSingleElements.forEach(([_, className])=>{
            if (_ !== null) _.classList.add(className);
        });
        lightArrayElements.forEach(([arr, className])=>{
            arr.forEach((_)=>_.classList.add(className));
        });
    } else {
        // Dark Background 
        if ((0, _elementsJs.elements).mediaQueryTablet.matches) {
            (0, _elementsJs.elements).main.classList.add('main--tablet');
            (0, _elementsJs.elements).main.classList.remove('main--tablet--light');
        } else (0, _elementsJs.elements).main.classList.remove('main--tablet', 'main--light');
        lightSingleElements.forEach(([_, className])=>{
            if (_ !== null) _.classList.remove(className);
        });
        lightArrayElements.forEach(([arr, className])=>{
            arr.forEach((_)=>_.classList.remove(className));
        });
    }
}
function showTodosAndChangeTheme() {
    changeTheme(event, false);
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    storageTodosList.forEach(([text, className, id])=>{
        (0, _todoCreateJs.addTodo)(text, className, id, false);
        (0, _todoUpdateJs.updateTodoSmth)('todo__input', 'todo__mark', 'todo__text');
        (0, _todoCountJs.todoCount)();
    });
    if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--active") {
        (0, _elementsJs.elements).sortParams.forEach((param)=>{
            param.classList.remove('activeBtn');
        });
        (0, _elementsJs.elements).sortActiveBtn.classList.add('activeBtn');
        (0, _todoSortJs.sort).call((0, _elementsJs.elements).sortActiveBtn);
    } else if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--completed") {
        (0, _elementsJs.elements).sortParams.forEach((param)=>{
            param.classList.remove('activeBtn');
        });
        (0, _elementsJs.elements).sortCompletedBtn.classList.add('activeBtn');
        (0, _todoSortJs.sort).call((0, _elementsJs.elements).sortCompletedBtn);
    }
}

},{"../dom/elements.js":"ljsH5","../components/todoSort.js":"feij6","../components/todoUpdate.js":"fzcAu","../components/todoCount.js":"6P2cI","../components/todoCreate.js":"gXyRF","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"feij6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "active", ()=>active);
parcelHelpers.export(exports, "sort", ()=>sort);
parcelHelpers.export(exports, "clearCompleted", ()=>clearCompleted);
var _elementsJs = require("../dom/elements.js");
var _todoSmthJs = require("../components/todoSmth.js");
var _todoCreateJs = require("../components/todoCreate.js");
var _todoUpdateJs = require("./todoUpdate.js");
var _todoCountJs = require("./todoCount.js");
function active() {
    (0, _elementsJs.elements).sortParams.forEach((param)=>{
        param.classList.remove('activeBtn');
    });
    this.classList.add('activeBtn');
    localStorage.setItem('activeSortBtn', JSON.stringify(this.classList[1]));
}
function sort() {
    let className = '';
    let smthFieldText = '';
    if (this.classList.contains('sort__param--all')) {
        className = 'todo__input';
        smthFieldText = 'Add something...';
    } else if (this.classList.contains('sort__param--active')) {
        className = 'activeTodo';
        smthFieldText = 'No Active yet...';
    } else {
        className = 'completedTodo';
        smthFieldText = 'No Completed yet...';
    }
    let inputCount = 0;
    (0, _elementsJs.elements).todosList.innerHTML = '';
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    storageTodosList.forEach(([text, todoClass, id])=>{
        if (className === 'todo__input' || className === 'activeTodo' && todoClass === 'activeTodo' || className === 'completedTodo' && todoClass === 'completedTodo') {
            (0, _todoCreateJs.addTodo)(text, todoClass, id, false);
            inputCount++;
        }
    });
    (0, _todoSmthJs.createSmthField)(smthFieldText, inputCount);
    (0, _elementsJs.elements).mediaQueryMobile.matches ? (0, _elementsJs.elements).todosList.after((0, _elementsJs.elements).todosSort) : (0, _elementsJs.elements).todoWrapper.append((0, _elementsJs.elements).todosSort);
    (0, _elementsJs.elements).todoWrapper.append((0, _elementsJs.elements).footerText);
}
function clearCompleted() {
    const todoInputs = document.querySelectorAll('.todo__input');
    let inputCount = 0;
    if (todoInputs.length === 0) return;
    // Delete completed from local storage
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newstorageTodosList = storageTodosList.filter(([_, className, id])=>{
        if (className !== 'completedTodo') return [
            _,
            className,
            id
        ];
    });
    localStorage.setItem('todoList', JSON.stringify([
        ...newstorageTodosList
    ]));
    (0, _todoSmthJs.removeSmthField)();
    todoInputs.forEach((todoInput)=>{
        if (todoInput.classList.contains('completedTodo')) todoInput.remove();
        else {
            (0, _elementsJs.elements).todosList.append(todoInput);
            inputCount++;
        }
    });
    (0, _todoSmthJs.createSmthField)("Add something...", inputCount);
    (0, _elementsJs.elements).mediaQueryMobile.matches ? (0, _elementsJs.elements).todosList.after((0, _elementsJs.elements).todosSort) : (0, _elementsJs.elements).todoWrapper.append((0, _elementsJs.elements).todosSort);
    (0, _elementsJs.elements).todoWrapper.append((0, _elementsJs.elements).footerText);
    localStorage.setItem('activeSortBtn', JSON.stringify('sort__param--all'));
    (0, _todoUpdateJs.resetParamBtns)();
    // Reverse to All btn
    (0, _todoUpdateJs.updateTodoSmth)('todo__input', 'todo__mark', 'todo__text');
    (0, _todoCountJs.todoCount)();
}

},{"../dom/elements.js":"ljsH5","../components/todoSmth.js":"liFvc","../components/todoCreate.js":"gXyRF","./todoUpdate.js":"fzcAu","./todoCount.js":"6P2cI","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"liFvc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "removeSmthField", ()=>removeSmthField);
parcelHelpers.export(exports, "createSmthField", ()=>createSmthField);
var _elementsJs = require("../dom/elements.js");
function removeSmthField() {
    const smth = document.querySelector('.todo__smth');
    smth && smth.remove();
}
function createSmthField(inText, inputCount) {
    const smth = document.createElement('li');
    if (inputCount === 0) {
        smth.classList.add('todo__smth');
        smth.classList.add('fadeIn');
        smth.innerText = inText;
        (0, _elementsJs.elements).todosList.append(smth);
        const theme = localStorage.getItem('theme');
        if (theme === 'light') smth.classList.add('todo__smth--light');
        else smth.classList.remove('todo__smth--light');
    } else smth.remove();
}

},{"../dom/elements.js":"ljsH5","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gXyRF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addTodoWithEnter", ()=>addTodoWithEnter);
parcelHelpers.export(exports, "addTodo", ()=>addTodo);
parcelHelpers.export(exports, "addMarkAndDecorateText", ()=>addMarkAndDecorateText);
var _elementsJs = require("../dom/elements.js");
var _animationsJs = require("../utils/animations.js");
var _todoUpdateJs = require("./todoUpdate.js");
var _todoSmthJs = require("./todoSmth.js");
var _todoCountJs = require("../components/todoCount.js");
var _todoSortJs = require("../components/todoSort.js");
function addTodoWithEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTodo(this.value, 'activeTodo');
        this.value = "";
        (0, _elementsJs.elements).todoAddText.focus();
    }
}
function addTodo(text, className, id = null, isUpdate = true) {
    id = Number(id) || Date.now();
    const todoText = document.querySelector('.todo__add_text');
    // If user adds todo in a sort field -> Btn All (active) and sort all to see all todos
    if (!(0, _elementsJs.elements).sortAllBtn.classList.contains('activeBtn') && isUpdate) {
        if (!todoText.value) {
            todoText.setAttribute('placeholder', 'This field can`t be empty!');
            return;
        }
        const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
        localStorage.setItem('todoList', JSON.stringify([
            ...todoListStorage,
            [
                todoText.value,
                'activeTodo',
                id
            ]
        ]));
        localStorage.setItem('activeSortBtn', JSON.stringify('sort__param--all'));
        (0, _todoUpdateJs.resetParamBtns)();
        (0, _todoSortJs.sort).call((0, _elementsJs.elements).sortAllBtn);
        todoText.value = '';
        (0, _animationsJs.addAnimation)((0, _elementsJs.elements).todoAddMark);
        return;
    }
    if (!todoText.value && isUpdate) {
        todoText.setAttribute('placeholder', 'This field can`t be empty!');
        return;
    }
    (0, _todoSmthJs.removeSmthField)();
    todoText.setAttribute('placeholder', 'Create a new todo...');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo__input');
    newTodo.classList.add('activeTodo');
    newTodo.classList.add('fadeIn');
    newTodo.setAttribute('data-id', id);
    if ((0, _elementsJs.elements).mediaQueryMobile.matches) newTodo.innerHTML = `
            <div class="todo__mark"></div>
            <input type="text" placeholder="Change your todo..." class="todo__text">
            <button class="todo__cross"></button>
        `;
    else newTodo.innerHTML = `
            <div class="todo__mark"></div>
            <input type="text" placeholder="Change your todo..." class="todo__text">
        `;
    // Change Theme
    if (localStorage.getItem('theme') === 'light') {
        newTodo.classList.add('todo__input--light');
        newTodo.children[0].classList.add('todo__mark--light');
        newTodo.children[1].classList.add('todo__text--light');
    }
    const newTodoText = newTodo.querySelector('.todo__text');
    newTodoText.value = typeof text === 'object' ? todoText.value : String(text).replace(/[<>]/g, '');
    if (className === 'completedTodo') {
        newTodo.classList.add('completedTodo');
        newTodo.classList.remove('activeTodo');
        newTodo.children[0].classList.add('toggle__mark--checked');
        newTodo.children[1].classList.add('toggle__mark--cross');
    }
    (0, _elementsJs.elements).todosList.append(newTodo);
    (0, _todoUpdateJs.updateTodoSmth)('todo__input', 'todo__mark', 'todo__text');
    (0, _todoCountJs.todoCount)();
    newTodo.scrollIntoView({
        block: "end"
    });
    // Save to local storage and animation if not update information
    if (isUpdate) {
        const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
        localStorage.setItem('todoList', JSON.stringify([
            ...todoListStorage,
            [
                todoText.value,
                newTodo.classList.contains('activeTodo') ? 'activeTodo' : 'completedTodo',
                id
            ]
        ]));
        todoText.value = '';
        (0, _animationsJs.addAnimation)((0, _elementsJs.elements).todoAddMark);
    }
}
function addMarkAndDecorateText(mark) {
    mark.parentNode.classList.toggle('activeTodo');
    mark.classList.toggle('toggle__mark--checked');
    mark.nextElementSibling.classList.toggle('toggle__mark--cross');
    mark.parentNode.classList.toggle('completedTodo');
    // Change todo class
    const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodoListStorage = todoListStorage.map(([_, className, id])=>{
        if (Number(id) === Number(mark.parentNode.getAttribute('data-id'))) className = mark.parentNode.classList.contains('activeTodo') ? 'activeTodo' : 'completedTodo';
        return [
            _,
            className,
            id
        ];
    });
    localStorage.setItem('todoList', JSON.stringify(newTodoListStorage));
}

},{"../dom/elements.js":"ljsH5","../utils/animations.js":"2usXb","./todoUpdate.js":"fzcAu","./todoSmth.js":"liFvc","../components/todoCount.js":"6P2cI","../components/todoSort.js":"feij6","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2usXb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addAnimation", ()=>addAnimation);
function addAnimation(animationNode) {
    animationNode.classList.add('toggle__mark--checked');
    animationNode.classList.add('scale-out-center');
    setTimeout(()=>{
        animationNode.classList.remove('scale-out-center');
        animationNode.classList.add('scale-up-center');
        animationNode.classList.remove('toggle__mark--checked');
    }, 480);
    setTimeout(()=>animationNode.classList.remove('scale-up-center'), 1000);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fzcAu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "saveOrder", ()=>saveOrder);
parcelHelpers.export(exports, "updateTodoSmth", ()=>updateTodoSmth);
parcelHelpers.export(exports, "resetParamBtns", ()=>resetParamBtns);
var _elementsJs = require("../dom/elements.js");
function saveOrder() {
    const todosList = document.querySelector('.todos__list');
    const ids = [
        ...todosList.querySelectorAll('.todo__input')
    ].map((item)=>Number(item.dataset.id));
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    // All elements which include in DOM now
    const reordered = ids.map((id)=>storageTodosList.find(([_, __, todoId])=>Number(todoId) === id));
    // Show hidden fields which don`t include in DOM now (especially important for all-sort)
    // (save to global storageTodosList in local storage)
    const remaining = storageTodosList.filter(([_, __, id])=>!ids.includes(Number(id)));
    // Save order of appearing elements -> at first visible, then hidden
    localStorage.setItem('todoList', JSON.stringify([
        ...reordered,
        ...remaining
    ]));
}
function updateTodoSmth(...classNames) {
    let todoInputs = [];
    let todoMarks = [];
    let todoTexts = [];
    classNames.forEach((className)=>{
        switch(className){
            case 'todo__input':
                todoInputs = document.querySelectorAll(`.${className}`) || [];
                break;
            case 'todo__mark':
                todoMarks = document.querySelectorAll(`.${className}`) || [];
                break;
            case 'todo__text':
                todoTexts = document.querySelectorAll(`.${className}`) || [];
                break;
        }
    });
}
function resetParamBtns() {
    (0, _elementsJs.elements).sortParams.forEach((param)=>{
        param.classList.remove('activeBtn');
    });
    document.querySelector('.sort__param--all').classList.add('activeBtn');
}

},{"../dom/elements.js":"ljsH5","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6P2cI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "todoCount", ()=>todoCount);
function todoCount() {
    const todoInputs = document.querySelectorAll('.todo__input');
    let itemCount = 0;
    const todoCounts = document.querySelector('.todos__sort_left');
    todoInputs.forEach((_)=>itemCount++);
    todoCounts.innerText = `${itemCount} items left`;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5JURI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "removeTodo", ()=>removeTodo);
var _todoCount = require("./todoCount");
var _todoSmth = require("./todoSmth");
function removeTodo(cross) {
    let todoInputs = document.querySelectorAll('.todo__input');
    const todosList = document.querySelector('.todos__list');
    const todoId = cross.parentNode.getAttribute('data-id');
    cross.parentNode.classList.add('fadeOut');
    setTimeout(()=>{
        cross.parentNode.classList.remove('fadeOut');
        // Delete node from localStorage
        const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
        const newstorageTodosList = storageTodosList.filter(([_, className, id])=>{
            if (Number(todoId) !== Number(id)) return [
                _,
                className,
                id
            ];
        });
        localStorage.setItem('todoList', JSON.stringify([
            ...newstorageTodosList
        ]));
        const removeTodoIndex = [
            ...todoInputs
        ].findIndex((todoInput)=>Number(todoInput.getAttribute('data-id')) === Number(todoId));
        todoInputs[removeTodoIndex].remove(); // delete node from DOM
        todoInputs = [
            ...todoInputs
        ].filter((_, index)=>index !== removeTodoIndex); // delete node from todoInputs
        if (todosList.children.length === 0) (0, _todoSmth.createSmthField)("Add something...", 0);
        (0, _todoCount.todoCount)();
    }, 480);
}

},{"./todoCount":"6P2cI","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./todoSmth":"liFvc"}],"4BUOk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleMediaTablet", ()=>handleMediaTablet);
parcelHelpers.export(exports, "handleMediaMobile", ()=>handleMediaMobile);
parcelHelpers.export(exports, "appendAllCross", ()=>appendAllCross);
parcelHelpers.export(exports, "removeAllCross", ()=>removeAllCross);
var _elementsJs = require("../dom/elements.js");
var _todoRemoveJs = require("../components/todoRemove.js");
function handleMediaTablet(media) {
    const theme = localStorage.getItem('theme');
    switch(true){
        case media.matches && theme === 'light':
            (0, _elementsJs.elements).main.classList.add('main--tablet--light');
            (0, _elementsJs.elements).main.classList.remove('main--tablet');
            break;
        case media.matches && theme === 'dark':
            (0, _elementsJs.elements).main.classList.add('main--tablet');
            (0, _elementsJs.elements).main.classList.remove('main--tablet--light');
            break;
        case !media.matches && theme === 'light':
            (0, _elementsJs.elements).main.classList.remove('main--tablet', 'main--tablet--light');
            (0, _elementsJs.elements).main.classList.add('main--light');
            break;
        default:
            (0, _elementsJs.elements).main.classList.remove('main--tablet', 'main--tablet--light', 'main--light');
    }
}
function handleMediaMobile(media) {
    if (media.matches) {
        (0, _elementsJs.elements).sortParamsWrapper.classList.add('todo__params');
        (0, _elementsJs.elements).todoWrapper.append((0, _elementsJs.elements).sortParamsWrapper);
        (0, _elementsJs.elements).todoWrapper.append((0, _elementsJs.elements).footerText);
        appendAllCross();
    } else {
        (0, _elementsJs.elements).sortParamsWrapper.classList.remove('todo__params');
        (0, _elementsJs.elements).todosSort.insertBefore((0, _elementsJs.elements).sortParamsWrapper, (0, _elementsJs.elements).sortCompletedClear);
        removeAllCross();
    }
}
function appendAllCross() {
    const todoInputs = document.querySelectorAll('.todo__input');
    if ((0, _elementsJs.elements).mediaQueryMobile.matches) todoInputs.forEach((todoInput)=>{
        const cross = document.createElement('button');
        cross.classList.add('todo__cross');
        todoInput.append(cross);
    });
}
function removeAllCross() {
    document.querySelectorAll('.todo__cross').forEach((cross)=>{
        cross.removeEventListener('click', (0, _todoRemoveJs.removeTodo));
        cross.remove();
    });
}

},{"../dom/elements.js":"ljsH5","../components/todoRemove.js":"5JURI","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2BjnI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "changeTextInStorage", ()=>changeTextInStorage);
function changeTextInStorage() {
    const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodoListStorage = todoListStorage.map(([text, className, id])=>{
        if (Number(this.parentNode.getAttribute('data-id')) === Number(id)) return [
            this.value,
            className,
            id
        ];
        return [
            text,
            className,
            id
        ];
    });
    localStorage.setItem('todoList', JSON.stringify(newTodoListStorage));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1MTMG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "attachDragEvents", ()=>attachDragEvents);
var _elementsJs = require("./elements.js");
var _todoUpdateJs = require("../components/todoUpdate.js");
function attachDragEvents() {
    (0, _elementsJs.elements).todosList.addEventListener('mousedown', (event)=>{
        document.querySelectorAll(".todo__input").forEach((item)=>{
            item.style.border = '1px solid transparent';
            item.style.borderBottom = '1px solid #666666';
        });
        const item = event.target.closest('.todo__input');
        if (item) input.blur();
        if (!item) return;
        item.setAttribute('draggable', 'true');
        item.classList.add('selected');
        item.style.border = '1px dashed #83aaf8ff';
    });
    (0, _elementsJs.elements).todosList.addEventListener("mouseup", (event)=>{
        const item = event.target.closest(".todo__input");
        if (!item) return;
        item.classList.remove("selected");
        item.removeAttribute("draggable");
        item.style.border = '1px solid transparent';
        item.style.borderBottom = '1px solid #666666';
        (0, _todoUpdateJs.saveOrder)();
    });
    (0, _elementsJs.elements).todosList.addEventListener('touchstart', (event)=>{
        document.querySelectorAll(".todo__input").forEach((item)=>{
            item.style.border = '1px solid transparent';
            item.style.borderBottom = '1px solid #666666';
        });
        const item = event.target.closest('.todo__input');
        if (item) input.blur();
        setTimeout(()=>{
            if (!item) return;
            item.setAttribute('draggable', 'true');
            item.classList.add('selected');
        }, 1000);
        item.style.border = '1px dashed #83aaf8ff';
    });
    (0, _elementsJs.elements).todosList.addEventListener("touchend", (event)=>{
        const item = event.target.closest(".todo__input");
        if (!item) return;
        item.classList.remove("selected");
        item.removeAttribute("draggable");
        item.style.border = '1px solid transparent';
        item.style.borderBottom = '1px solid #666666';
        (0, _todoUpdateJs.saveOrder)();
    });
    (0, _elementsJs.elements).todosList.addEventListener('dragover', (event)=>{
        event.preventDefault();
        const selected = document.querySelector('.selected');
        if (!selected) return;
        const target = event.target.closest('.todo__input');
        if (!target || selected === target) return;
        const bounding = target.getBoundingClientRect();
        const offset = event.clientY - bounding.top;
        if (offset < bounding.height / 2) (0, _elementsJs.elements).todosList.insertBefore(selected, target);
        else (0, _elementsJs.elements).todosList.insertBefore(selected, target.nextElementSibling);
    });
}

},{"./elements.js":"ljsH5","../components/todoUpdate.js":"fzcAu","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["5j6Kf","a0t4e"], "a0t4e", "parcelRequireea3d", {})

//# sourceMappingURL=ToDo-JavaScript-.31b563d9.js.map
