"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var renderImport = function (component, tag) {
    var result = '';
    if (component.type === 'full') {
        result = "import ".concat(tag, " from '").concat(component.path, "';");
    }
    else {
        result = "import {".concat(component.component, "} from '").concat(component.path, "';");
    }
    return result;
};
var renderImportCss = function (component, tag) {
    var result = '';
    if (component.css) {
        result += "import \"".concat(component.css, "\"");
    }
    return result;
};
var getImport = function (name, type, config, tag, renderImport) {
    var comImport = null;
    switch (type) {
        case 'A':
            if (!config.atoms || !config.atoms[name]) {
                return null;
            }
            comImport = renderImport(config.atoms[name], tag);
            break;
        case 'M':
            if (!config.molecules || !config.molecules[name]) {
                return null;
            }
            comImport = renderImport(config.molecules[name], tag);
            break;
        case 'O':
            if (!config.organisms || !config.organisms[name]) {
                return null;
            }
            comImport = renderImport(config.organisms[name], tag);
            break;
        case 'T':
            if (!config.templates || !config.templates[name]) {
                return null;
            }
            comImport = renderImport(config.templates[name], tag);
            break;
        case 'L':
            if (!config.loaders || !config.loaders[name]) {
                return null;
            }
            comImport = renderImport(config.loaders[name], tag);
            break;
        case 'E':
            if (!config.extensions || !config.extensions[name]) {
                return null;
            }
            comImport = renderImport(config.extensions[name], tag);
            break;
    }
    return comImport;
};
function match(config, tag) {
    if (!tag.startsWith('Vf'))
        return null;
    var regex = /^Vf(.)(.*)$/gm;
    var m = regex.exec(tag);
    if (!m) {
        return null;
    }
    var type = m[1];
    var name = m[2];
    var comImport = getImport(name, type, config, tag, renderImport);
    if (!comImport) {
        return null;
    }
    var comImportCss = getImport(name, type, config, tag, renderImportCss);
    return [tag, comImport, comImportCss || ''];
}
exports.default = match;
//# sourceMappingURL=tag.js.map