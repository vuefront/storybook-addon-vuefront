"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VuefrontLoaderPlugin = void 0;
var getVueRules_1 = require("./getVueRules");
var VuefrontLoaderPlugin = /** @class */ (function () {
    function VuefrontLoaderPlugin(options) {
        this.options = {
            autoImport: true,
            config: options.config
        };
    }
    VuefrontLoaderPlugin.prototype.apply = function (compiler) {
        var _this = this;
        if (this.options.autoImport) {
            if (!compiler.options.module) {
                return;
            }
            var vueRules = getVueRules_1.getVueRules(compiler);
            if (!vueRules.length) {
                throw new Error("[VuefrontLoaderPlugin Error] No matching rule for vue-loader found.\n" +
                    "Make sure there is at least one root-level rule that uses vue-loader and VuefrontLoaderPlugin is applied after VueLoaderPlugin.");
            }
            var rules_1 = __spreadArrays(compiler.options.module.rules);
            vueRules.forEach(function (_a) {
                var rule = _a.rule, index = _a.index;
                rule.oneOf = [
                    {
                        resourceQuery: '?',
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        use: rule.use
                    },
                    {
                        use: __spreadArrays([
                            {
                                loader: require.resolve('./scriptLoader'), options: {
                                    config: _this.options.config,
                                },
                            }
                        ], rule.use)
                    },
                ];
                delete rule.use;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                rules_1[index] = rule;
                // })
                // eslint-disable-next-line no-param-reassign
                if (compiler.options.module)
                    compiler.options.module.rules = rules_1;
            });
        }
    };
    return VuefrontLoaderPlugin;
}());
exports.VuefrontLoaderPlugin = VuefrontLoaderPlugin;
//# sourceMappingURL=plugin.js.map