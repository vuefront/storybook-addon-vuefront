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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
    var _a;
    if (webpackConfig === void 0) { webpackConfig = {}; }
    if (options === void 0) { options = {}; }
    var _b = webpackConfig.module, module = _b === void 0 ? { rules: [] } : _b;
    var rules = [];
    var themeOptions = (0, setupConfig_1.default)(options.replaceRoot || undefined);
    (_a = module.rules) === null || _a === void 0 ? void 0 : _a.forEach(function (val, key) {
        if (val !== '...') {
            if (String(val.test) === String(/\.s[ca]ss$/)) {
                if (typeof val.use !== 'undefined') {
                    var use = val.use;
                    rules.push(__assign(__assign({}, val), { use: __spreadArray(__spreadArray(__spreadArray([], use.slice(0, -1), true), [
                            {
                                loader: 'postcss-loader',
                                options: {
                                    implementation: require('postcss')
                                }
                            }
                        ], false), use.slice(-1), true) }));
                }
            }
            else {
                rules.push(val);
            }
        }
    });
    return __assign(__assign({}, webpackConfig), { module: __assign(__assign({}, module), { rules: __spreadArray([], rules, true) }), plugins: __spreadArray(__spreadArray([], webpackConfig.plugins || [], true), [
            new plugin_1.VuefrontLoaderPlugin({ autoImport: true, config: themeOptions })
        ], false) });
};
exports.webpack = webpack;
//# sourceMappingURL=index.js.map