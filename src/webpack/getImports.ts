import { parseTemplate } from './parseTemplate'
import matchTag from './matcher/tag'

/** key: module ID, value: resolved components */
const componentsMap = new Map<string, Set<string>>()

export function getImports (config: VueFrontConfig, source: string, id: string) {
  const { components } = parseTemplate(source)
  const resolvedComponents = componentsMap.get(id) || (componentsMap.set(id, new Set()), componentsMap.get(id)!)
  const imports = new Map<string, string[]>()
  const componentsStart = resolvedComponents.size

  if (components.size) {
    // addImport(imports, 'installAssets', ['installAssets', 'vuefront-storybook/runtime'])
    components.forEach(name => {
      const result = matchTag(config, name)
      if(result) {
        addImport(imports, name, result)
        resolvedComponents.add(name)
      }
      // resolvedComponents.add()
      // if (name in importMap.components) {
      //   resolvedComponents.add(name)
      // }
    })
  }

  // resolvedComponents.forEach(name => {
  //   addImport(imports, name, 'vuetify/lib/' + (importMap.components as any)[name].from)
  // })

  const hasNewImports =
    resolvedComponents.size > componentsStart

  return {
    imports,
    hasNewImports,
    components: Array.from(resolvedComponents),
  }
}

function addImport (imports: Map<string, string[]>, name: string, value: string[]) {
  if (!imports.has(name)) {
    imports.set(name, value)
  }
}
