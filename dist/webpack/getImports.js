"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImports = void 0;
var parseTemplate_1 = require("./parseTemplate");
var tag_1 = __importDefault(require("./matcher/tag"));
/** key: module ID, value: resolved components */
var componentsMap = new Map();
function getImports(config, source, id) {
    var components = (0, parseTemplate_1.parseTemplate)(source).components;
    var resolvedComponents = componentsMap.get(id) || (componentsMap.set(id, new Set()), componentsMap.get(id));
    var imports = new Map();
    var componentsStart = resolvedComponents.size;
    if (components.size) {
        // addImport(imports, 'installAssets', ['installAssets', 'vuefront-storybook/runtime'])
        components.forEach(function (name) {
            var result = (0, tag_1.default)(config, name);
            if (result) {
                addImport(imports, name, result);
                resolvedComponents.add(name);
            }
            // resolvedComponents.add()
            // if (name in importMap.components) {
            //   resolvedComponents.add(name)
            // }
        });
    }
    // resolvedComponents.forEach(name => {
    //   addImport(imports, name, 'vuetify/lib/' + (importMap.components as any)[name].from)
    // })
    var hasNewImports = resolvedComponents.size > componentsStart;
    return {
        imports: imports,
        hasNewImports: hasNewImports,
        components: Array.from(resolvedComponents),
    };
}
exports.getImports = getImports;
function addImport(imports, name, value) {
    if (!imports.has(name)) {
        imports.set(name, value);
    }
}
//# sourceMappingURL=getImports.js.map