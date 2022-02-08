"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
            var vueRules = (0, getVueRules_1.getVueRules)(compiler);
            if (!vueRules.length) {
                throw new Error("[VuefrontLoaderPlugin Error] No matching rule for vue-loader found.\n" +
                    "Make sure there is at least one root-level rule that uses vue-loader and VuefrontLoaderPlugin is applied after VueLoaderPlugin.");
            }
            var rules_1 = __spreadArray([], compiler.options.module.rules, true);
            vueRules.forEach(function (_a) {
                var rule = _a.rule, index = _a.index;
                rule.oneOf = [
                    {
                        resourceQuery: '?',
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        use: rule.use
                    },
                    {
                        use: __spreadArray([
                            {
                                loader: require.resolve('./scriptLoader'), options: {
                                    config: _this.options.config,
                                },
                            }
                        ], rule.use, true)
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