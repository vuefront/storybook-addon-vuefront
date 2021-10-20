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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
//@ts-ignore
var vuefront_1 = __importDefault(require("vuefront"));
var rootPath = '';
var rootReplace = 'vuefront/lib';
var mergeConfig = function (objValue, srcValue, index) {
    if (index !== 'locales') {
        if (_.isArray(objValue)) {
            return _.concat(objValue, srcValue);
        }
        else if (_.isObject(objValue)) {
            return _.merge(objValue, srcValue);
        }
        else {
            return srcValue;
        }
    }
    else if (_.includes(['atoms', 'layouts', 'molecules', 'organisms', 'extensions'], index)) {
        if (_.isArray(objValue)) {
            return _.concat(objValue, srcValue);
        }
        else if (_.isObject(objValue)) {
            return _.merge(objValue, srcValue);
        }
        else {
            return srcValue;
        }
    }
    else {
        return _.mergeWith(objValue, srcValue, mergeConfig);
    }
};
var checkPath = function (path) {
    var newPath = _.replace(path, /^(~)/, rootPath + '/src');
    try {
        require.resolve(newPath);
        return true;
    }
    catch (e) {
        return false;
    }
};
var convertComponentPath = function (items, root) {
    var result = {};
    if (!items) {
        return;
    }
    var category = items;
    for (var key in category) {
        var component = undefined;
        var css = undefined;
        if (typeof category[key] === 'string') {
            component = category[key];
        }
        else {
            css = category[key].css;
            component = category[key].component;
        }
        var compResult = {};
        if (!_.isUndefined(component)) {
            if (checkPath(component)) {
                compResult = {
                    type: 'full',
                    path: component.replace('vuefront/lib', rootReplace)
                };
            }
            else if (checkPath(root + '/' + component)) {
                compResult = {
                    type: 'full',
                    path: root.replace('vuefront/lib', rootReplace) + '/' + component,
                };
            }
            else {
                compResult = {
                    type: 'inside',
                    path: root.replace('vuefront/lib', rootReplace),
                    component: component,
                };
            }
        }
        if (!_.isUndefined(css)) {
            if (checkPath(css)) {
                compResult = __assign(__assign({}, compResult), { css: css.replace('vuefront/lib', rootReplace) });
            }
            else if (checkPath(root + '/' + css)) {
                compResult = __assign(__assign({}, compResult), { css: root.replace('vuefront/lib', rootReplace) + '/' + css });
            }
        }
        result[key] = compResult;
    }
    return result;
};
var convertPath = function (config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var result = {};
    if (config.atoms) {
        result.atoms = convertComponentPath(config.atoms, ((_a = config.root) === null || _a === void 0 ? void 0 : _a.components) || '');
    }
    if (config.molecules) {
        result.molecules = convertComponentPath(config.molecules, ((_b = config.root) === null || _b === void 0 ? void 0 : _b.components) || '');
    }
    if (config.organisms) {
        result.organisms = convertComponentPath(config.organisms, ((_c = config.root) === null || _c === void 0 ? void 0 : _c.components) || '');
    }
    if (config.templates) {
        result.templates = convertComponentPath(config.templates, ((_d = config.root) === null || _d === void 0 ? void 0 : _d.components) || '');
    }
    if (config.pages) {
        result.pages = convertComponentPath(config.pages, ((_e = config.root) === null || _e === void 0 ? void 0 : _e.components) || '');
    }
    if (config.loaders) {
        result.loaders = convertComponentPath(config.loaders, ((_f = config.root) === null || _f === void 0 ? void 0 : _f.components) || '');
    }
    if (config.extensions) {
        result.extensions = convertComponentPath(config.extensions, ((_g = config.root) === null || _g === void 0 ? void 0 : _g.components) || '');
    }
    if (config.locales) {
        result.locales = {};
        for (var key in config.locales) {
            result.locales[key] = [];
            var locale = config.locales[key];
            for (var key2 in locale) {
                var locale2 = locale[key2];
                if (typeof locale2 === 'string') {
                    if (checkPath(locale2)) {
                        result.locales[key].push({
                            type: 'full',
                            path: locale2
                        });
                    }
                    else if (checkPath(((_h = config === null || config === void 0 ? void 0 : config.root) === null || _h === void 0 ? void 0 : _h.locales) + '/' + locale2)) {
                        result.locales[key].push({
                            type: 'full',
                            path: ((_j = config === null || config === void 0 ? void 0 : config.root) === null || _j === void 0 ? void 0 : _j.locales) + '/' + locale2
                        });
                    }
                    else {
                        result.locales[key].push({
                            type: 'inside',
                            path: ((_k = config.root) === null || _k === void 0 ? void 0 : _k.locales) || '',
                            component: locale2
                        });
                    }
                }
            }
        }
    }
    return result;
};
var cloneConfig = function (config) {
    return JSON.parse(JSON.stringify(config));
};
exports.default = (function (replaceRoot) {
    if (replaceRoot === void 0) { replaceRoot = 'vuefront/lib'; }
    rootReplace = replaceRoot;
    var themeOptions = {};
    themeOptions = cloneConfig(vuefront_1.default);
    if (vuefront_1.default.organisms) {
        vuefront_1.default.organisms.Position = {
            css: "organisms/position/position.scss",
            component: "organisms/position/position-test.vue",
        };
    }
    themeOptions = __assign(__assign({}, themeOptions), convertPath(vuefront_1.default));
    return themeOptions;
});
//# sourceMappingURL=setupConfig.js.map