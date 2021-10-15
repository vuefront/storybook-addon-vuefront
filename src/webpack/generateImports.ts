import { getImports } from './getImports'
// const runtimePaths = {
//   installAssets: require.resolve('../../runtime.mjs')
// }

export function generateImports (config: VueFrontConfig,source: string, id: string, defaultExport: string) {
  const { imports, hasNewImports, components } = getImports(config, source, id)

  let content = ''

  if (components.length) {
    content += '\n\n/* Vuefront */\n'

    content += `function installAssets (component, type, assets) {
      component[type] = component[type] || {}
    
      for (const i in assets) {
        component[type][i] = component[type][i] || assets[i]
      }
    }
    \n`

    let result = []
    for (const item of Array.from(imports)) {
      
      result.push(`${item[0]}: ${item[1][0]}`)
    }
    content += Array.from(imports).map(i => {
      return i[1][1]
    }).join('\n') + '\n'
    content += Array.from(imports).map(i => {
      return i[1][2]
    }).join('\n') + '\n'

    content += '\n'

    if (components.length) {
      content += `installAssets(${defaultExport}, 'components', { ${result.join(',')} })\n`
    }
  }

  return { code: content, hasNewImports }
}

