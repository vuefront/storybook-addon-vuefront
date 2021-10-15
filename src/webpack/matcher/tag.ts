const _ = require('lodash')
type IRenderFunction = (component: VueFrontComponent, tag: string) => string;

const renderImport = (component: VueFrontComponent, tag: string) => {
  let result = ''

  if (component.type === 'full') {
    result = `import ${tag} from '${component.path}';`
  } else {
    result = `import {${component.component}} from '${component.path}';`
  }

  return result
}
const renderImportCss = (component: VueFrontComponent, tag: string) => {
  let result = ''

  if (component.css) {
    result += `import "${component.css}"`
  }

  return result
}
const getImport = (name: string, type: string, config: VueFrontConfig, tag: string, renderImport: IRenderFunction): string | null => {
  
  let comImport: string | null = null

  switch (type) {
    case 'A':
    if(!config.atoms || !config.atoms[name]) {
      return null
    }
    comImport = renderImport(config.atoms[name] as VueFrontComponent, tag)
    break;
    case 'M':
    if(!config.molecules || !config.molecules[name]) {
      return null
    }
    comImport = renderImport(config.molecules[name] as VueFrontComponent, tag)
    break;
    case 'O':
    if(!config.organisms || !config.organisms[name]) {
      return null
    }
    comImport = renderImport(config.organisms[name] as VueFrontComponent, tag)
    break;
    case 'T':
    if(!config.templates || !config.templates[name]) {
      return null
    }
    comImport = renderImport(config.templates[name] as VueFrontComponent, tag)
    break;
    case 'L':
    if(!config.loaders || !config.loaders[name]) {
      return null
    }
    comImport = renderImport(config.loaders[name] as VueFrontComponent, tag)
    break;
    case 'E':
    if(!config.extensions || !config.extensions[name]) {
      return null
    }
    comImport = renderImport(config.extensions[name] as VueFrontComponent, tag)
    break;
  }
  return comImport
}
export default function match (config: VueFrontConfig, tag: string): string[] | null {
  if (!tag.startsWith('Vf')) return null

  const regex = /^Vf(.)(.*)$/gm

  const m = regex.exec(tag)

  if (!m) {
    return null
  }

  const type = m[1]
  const name = m[2]

  let comImport = getImport(name, type, config, tag, renderImport)
  if (!comImport) {
    return null
  }
  let comImportCss = getImport(name, type, config, tag, renderImportCss)
  return [tag, comImport, comImportCss || '']
}
