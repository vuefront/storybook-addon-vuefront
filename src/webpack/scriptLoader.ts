import * as webpack from 'webpack'
import { generateImports } from './generateImports'
import {getOptions} from 'loader-utils'
export default function VuefrontLoader (this: any, content: string, opt: any) {
  this.async()
  this.cacheable()

  const options = {
    match: [],
    attrsMatch: [],
    config: {},
    ...getOptions(this)
  }

  const render = /^import { render } from "(.+)"$/m.exec(content)?.[1]
  const script = /^import script from "(.+)"$/m.exec(content)?.[1]
  const module = render || script

  if (module && !this.resourceQuery) {
    new Promise<string>((resolve, reject) => {
      this.loadModule(module, (err: any, source: any) => {
        if (err) return reject(err)
        const module = /export \* from "(.+)"/.exec(source)?.[1]
        module && this.loadModule(module, (err: any, source: any) => {
          if (err) reject(err)
          else resolve(source)
        })
      })
    }).then(source => {
      content += generateImports(options.config, source, this.resourcePath, 'script').code

      this.callback(null, content)
    })
  } else {
    this.callback(null, content)
  }
}
