/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Compiler } from 'webpack'
import { getVueRules } from './getVueRules'

type Options = {
  autoImport: boolean
  config: VueFrontConfig
}
export class VuefrontLoaderPlugin {
  options: Required<Options>

  constructor(options: Options) {
    this.options = {
      autoImport: true,
      config: options.config
    }
  }

  apply(compiler: Compiler): void {
    if (this.options.autoImport) {
      if (!compiler.options.module) {
        return
      }
      const vueRules = getVueRules(compiler)

      if (!vueRules.length) {
        throw new Error(
          `[VuefrontLoaderPlugin Error] No matching rule for vue-loader found.\n` +
          `Make sure there is at least one root-level rule that uses vue-loader and VuefrontLoaderPlugin is applied after VueLoaderPlugin.`
        )
      }

      const rules = [...compiler.options.module.rules]

      vueRules.forEach(({ rule, index }) => {
        rule.oneOf = [
          {
            resourceQuery: '?',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            use: rule.use
          },
          {
            use: [
              {
                loader: require.resolve('./scriptLoader'), options: {
                  config: this.options.config,
                },
              },

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              ...rule.use
            ]
          },
        ]
        delete rule.use

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        rules[index] = rule
        // })
        // eslint-disable-next-line no-param-reassign
        if(compiler.options.module)
          compiler.options.module.rules = rules
      })
    }
  }
}
