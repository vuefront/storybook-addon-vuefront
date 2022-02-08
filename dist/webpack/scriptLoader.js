"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var generateImports_1 = require("./generateImports");
var loader_utils_1 = require("loader-utils");
function VuefrontLoader(content, opt) {
    var _this = this;
    var _a, _b;
    this.async();
    this.cacheable();
    var options = __assign({ match: [], attrsMatch: [], config: {} }, (0, loader_utils_1.getOptions)(this));
    var render = (_a = /^import { render } from "(.+)"$/m.exec(content)) === null || _a === void 0 ? void 0 : _a[1];
    var script = (_b = /^import script from "(.+)"$/m.exec(content)) === null || _b === void 0 ? void 0 : _b[1];
    var module = render || script;
    if (module && !this.resourceQuery) {
        new Promise(function (resolve, reject) {
            _this.loadModule(module, function (err, source) {
                var _a;
                if (err)
                    return reject(err);
                var module = (_a = /export \* from "(.+)"/.exec(source)) === null || _a === void 0 ? void 0 : _a[1];
                module && _this.loadModule(module, function (err, source) {
                    if (err)
                        reject(err);
                    else
                        resolve(source);
                });
            });
        }).then(function (source) {
            content += (0, generateImports_1.generateImports)(options.config, source, _this.resourcePath, 'script').code;
            _this.callback(null, content);
        });
    }
    else {
        this.callback(null, content);
    }
}
exports.default = VuefrontLoader;
//# sourceMappingURL=scriptLoader.js.map