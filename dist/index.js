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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = void 0;
var setupConfig_1 = __importDefault(require("./setupConfig"));
var plugin_1 = require("./webpack/plugin");
function wrapLoader(loader, options) {
    if (options === false) {
        return [];
    }
    return [{ loader: loader, options: options }];
}
var webpack = function (webpackConfig, options) {
    if (webpackConfig === void 0) { webpackConfig = {}; }
    if (options === void 0) { options = {}; }
    var _a = webpackConfig.module, module = _a === void 0 ? { rules: [] } : _a;
    var rules = [];
    var themeOptions = setupConfig_1.default(options.replaceRoot || undefined);
    for (var key in module.rules) {
        if (String(module.rules[key].test) === String(/\.s[ca]ss$/)) {
            if (typeof module.rules[key].use !== 'undefined') {
                var use = module.rules[key].use;
                rules.push(__assign(__assign({}, module.rules[key]), { use: __spreadArrays(use.slice(0, -1), [
                        {
                            loader: 'postcss-loader',
                            options: {
                                implementation: require('postcss')
                            }
                        }
                    ], use.slice(-1)) }));
            }
        }
        else {
            rules.push(module.rules[key]);
        }
    }
    return __assign(__assign({}, webpackConfig), { module: __assign(__assign({}, module), { rules: __spreadArrays(rules) }), plugins: __spreadArrays(webpackConfig.plugins || [], [
            new plugin_1.VuefrontLoaderPlugin({ autoImport: true, config: themeOptions })
        ]) });
};
exports.webpack = webpack;
//# sourceMappingURL=index.js.map