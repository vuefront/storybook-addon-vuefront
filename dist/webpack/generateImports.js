"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImports = void 0;
var getImports_1 = require("./getImports");
// const runtimePaths = {
//   installAssets: require.resolve('../../runtime.mjs')
// }
function generateImports(config, source, id, defaultExport) {
    var _a = getImports_1.getImports(config, source, id), imports = _a.imports, hasNewImports = _a.hasNewImports, components = _a.components;
    var content = '';
    if (components.length) {
        content += '\n\n/* Vuefront */\n';
        content += "function installAssets (component, type, assets) {\n      component[type] = component[type] || {}\n    \n      for (const i in assets) {\n        component[type][i] = component[type][i] || assets[i]\n      }\n    }\n    \n";
        var result = [];
        for (var _i = 0, _b = Array.from(imports); _i < _b.length; _i++) {
            var item = _b[_i];
            result.push(item[0] + ": " + item[1][0]);
        }
        content += Array.from(imports).map(function (i) {
            return i[1][1];
        }).join('\n') + '\n';
        content += '\n';
        if (components.length) {
            content += "installAssets(" + defaultExport + ", 'components', { " + result.join(',') + " })\n";
        }
    }
    return { code: content, hasNewImports: hasNewImports };
}
exports.generateImports = generateImports;
//# sourceMappingURL=generateImports.js.map