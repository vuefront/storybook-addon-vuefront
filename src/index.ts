import type { Configuration, RuleSetRule, RuleSetUseItem, Module } from 'webpack';
import postcss from 'postcss';
import setupConfig from './setupConfig'
import {VuefrontLoaderPlugin} from './webpack/plugin'

type StyleLoaderOptions = Record<string, unknown>;
type CssLoaderOptions = Record<string, unknown> & {
  importLoaders?: number;
};

type PostcssLoaderOptions = Record<string, unknown> & {
  implementation?: typeof postcss;
};

interface Options {
  styleLoaderOptions?: StyleLoaderOptions | false;
  cssLoaderOptions?: CssLoaderOptions | false;
  postcssLoaderOptions?: PostcssLoaderOptions | false;
  rule?: RuleSetRule;
  replaceRoot?: string | false
}

function wrapLoader(
  loader: string,
  options?:
    | StyleLoaderOptions
    | CssLoaderOptions
    | PostcssLoaderOptions
    | false,
): RuleSetUseItem[] {
  if (options === false) {
    return [];
  }

  return [{ loader, options }];
}

export const webpack = (
  webpackConfig: Configuration = {},
  options: Options = {},
): Configuration => {
    const { module = { rules: []} } = webpackConfig;
   const rules: RuleSetRule[] = []
   const themeOptions = setupConfig(options.replaceRoot || undefined)

    for (const key in module.rules) {

      if (String(module.rules[key].test) === String(/\.s[ca]ss$/)) {
        if (typeof module.rules[key].use !== 'undefined') {
          const use = module.rules[key].use as RuleSetUseItem[]
          rules.push({
            ...module.rules[key],
            use: [
              ...use.slice(0, -1), 
              {
                loader: 'postcss-loader',
                options: {
                  implementation: require('postcss')
                }
              }, ...use.slice(-1)
            ]
          })
        }
      } else {
        rules.push(module.rules[key])
      }
    }



  return {
    ...webpackConfig,
    module: {
      ...module,
      rules: [
        ...rules
      ]
    },
    plugins: [
      ...webpackConfig.plugins || [],
      new VuefrontLoaderPlugin({ autoImport: true, config: themeOptions })
    ]
  };
};
