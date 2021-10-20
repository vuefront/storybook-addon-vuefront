import * as _ from 'lodash'
//@ts-ignore
import vuefrontDefaultConfig from 'vuefront'
let rootPath = ''
let rootReplace = 'vuefront/lib'

const mergeConfig = (objValue: VueFrontConfig, srcValue: VueFrontConfig, index: string): VueFrontConfig => {
  if(index !== 'locales') {
    if (_.isArray(objValue)) {
      return _.concat(objValue, srcValue) as VueFrontConfig
    } else if (_.isObject(objValue)) {
      return _.merge(objValue, srcValue)
    } else {
      return srcValue
    }
  } else if(_.includes(['atoms', 'layouts', 'molecules', 'organisms', 'extensions'], index)) {
    if (_.isArray(objValue)) {
      return _.concat(objValue, srcValue) as VueFrontConfig
    } else if (_.isObject(objValue)) {
      return _.merge(objValue, srcValue)
    } else {
      return srcValue
    }
   } else {
    return _.mergeWith(objValue, srcValue, mergeConfig)
  }
}

const checkPath = (path: string) => {
  const newPath = _.replace(path, /^(~)/, rootPath + '/src')
  try {
    require.resolve(newPath)
    return true
  } catch (e) {
    return false
   }
}

const convertComponentPath = (items: VueFrontComponentList, root: string) => {
  let result: VueFrontComponentList = {}
  if(!items) {
    return
  }
  const category = items
  for(const key in category) {
    let component = undefined
    let css = undefined
    if (typeof category[key] === 'string') {
      component = category[key] as string
    } else {
      css = (category[key] as VueFrontComponent).css
      component = (category[key] as VueFrontComponent).component
    }
    let compResult: VueFrontComponent = {}

    if (!_.isUndefined(component)) {
      if(checkPath(component)) {
        compResult = {
          type: 'full',
          path: component.replace('vuefront/lib', rootReplace)
        }
      } else if(checkPath(root + '/' +component)) {
        compResult = {
          type: 'full',
          path: root.replace('vuefront/lib', rootReplace) + '/' +component,
        }
      } else {
        compResult = {
          type: 'inside',
          path: root.replace('vuefront/lib', rootReplace),
          component,
        }
      }
    }
    if (!_.isUndefined(css)) {
      if(checkPath(css)) {
        compResult = {
          ...compResult,
          css: css.replace('vuefront/lib', rootReplace)
        }
      } else if(checkPath(root + '/' +css)) {
        compResult = {
          ...compResult,
          css: root.replace('vuefront/lib', rootReplace) + '/' +css,
        }
      }
    }
    result[key] = compResult
  }

  return result
}

const convertPath = (config: VueFrontConfig): VueFrontConfig => {
  const result: VueFrontConfig = {}

  if (config.atoms) {
    result.atoms = convertComponentPath(config.atoms as VueFrontComponentList, config.root?.components || '')
  }
  if (config.molecules) {
    result.molecules = convertComponentPath(config.molecules as VueFrontComponentList, config.root?.components || '')
  }
  if (config.organisms) {
    result.organisms = convertComponentPath(config.organisms as VueFrontComponentList, config.root?.components || '')
  }
  if (config.templates) {
    result.templates = convertComponentPath(config.templates as VueFrontComponentList, config.root?.components || '')
  }
  if (config.pages) {
    result.pages = convertComponentPath(config.pages as VueFrontComponentList, config.root?.components || '')
  }
  if (config.loaders) {
    result.loaders = convertComponentPath(config.loaders as VueFrontComponentList, config.root?.components || '')
  }
  if (config.extensions) {
    result.extensions = convertComponentPath(config.extensions as VueFrontComponentList, config.root?.components || '')
  }

  if(config.locales) {
    result.locales = {}
    for (const key in config.locales) {
      result.locales[key] = []
      const locale = config.locales[key]
      for (const key2 in locale) {
        const locale2 = locale[key2]
        if (typeof locale2 === 'string') {
          if(checkPath(locale2 as string)) {
            result.locales[key].push({
              type: 'full',
              path: locale2 as string
            })
          } else if (checkPath(config?.root?.locales + '/' + locale2)) {
            result.locales[key].push({
              type: 'full',
              path: config?.root?.locales + '/' + (locale2 as string)
            })
          } else {
            result.locales[key].push({
              type: 'inside',
              path: config.root?.locales || '',
              component: locale2 as string
            })
          }
        }
      }
    }
  }

  return result
}

const cloneConfig = (config: VueFrontConfig): VueFrontConfig => {
  return JSON.parse(JSON.stringify(config))
}

export default (replaceRoot = 'vuefront/lib'): VueFrontConfig => {
  rootReplace = replaceRoot
  let themeOptions: VueFrontConfig = {}
  themeOptions = cloneConfig(vuefrontDefaultConfig)
  if (vuefrontDefaultConfig.organisms) {
    vuefrontDefaultConfig.organisms.Position = {
      css: "organisms/position/position.scss",
      component: "organisms/position/position-test.vue",
    }
  }

  themeOptions = {...themeOptions,...convertPath(vuefrontDefaultConfig)}

  return themeOptions
}
