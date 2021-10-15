"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTemplate = void 0;
var vue_1 = require("vue");
function parseTemplate(source) {
    var components = createSet(source.matchAll(/_resolveComponent\("([\w-.]+)"\)/gm));
    var directives = createSet(source.matchAll(/_resolveDirective\("([\w-.]+)"\)/gm));
    return { components: components, directives: directives };
}
exports.parseTemplate = parseTemplate;
function createSet(matches) {
    return new Set(Array.from(matches, function (i) { return vue_1.capitalize(vue_1.camelize(i[1])); }));
}
//# sourceMappingURL=parseTemplate.js.map