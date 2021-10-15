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
exports.getVueRules = exports.isVueLoader = void 0;
var vueLoaderPath;
try {
    vueLoaderPath = require.resolve('vue-loader');
}
catch (err) {
    console.error(err);
}
function isVueLoader(use) {
    return typeof use === 'object' && (use.ident === 'vue-loader-options' ||
        use.loader === 'vue-loader' ||
        (vueLoaderPath && use.loader === vueLoaderPath));
}
exports.isVueLoader = isVueLoader;
function getVueRules(compiler) {
    if (!compiler.options.module) {
        return [];
    }
    var rules = compiler.options.module.rules;
    // Naive approach without RuleSet or RuleSetCompiler
    return rules.map(function (rule, index) { return ((typeof rule === 'object' &&
        Array.isArray(rule === null || rule === void 0 ? void 0 : rule.use) &&
        rule.use.find(isVueLoader))
        ? { rule: __assign({}, rule), index: index }
        : null); }).filter(function (v) { return v != null; });
}
exports.getVueRules = getVueRules;
//# sourceMappingURL=getVueRules.js.map