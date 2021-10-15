import type { Configuration, RuleSetRule, RuleSetUseItem } from 'webpack';
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
  if (!webpackConfig.module) {
    webpackConfig.module = {
      rules: []
    }
  }
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = []
  }
  const {rules} = webpackConfig.module
    const themeOptions = setupConfig(options.replaceRoot || undefined)
    webpackConfig.plugins.push(new VuefrontLoaderPlugin({config:themeOptions}))

    for (const key in rules) {

      if (String(rules[key].test) === String(/\.s[ca]ss$/)) {
        webpackConfig.module.rules[key].use = [...webpackConfig.module.rules[key].use.slice(0, -1), {
          loader: 'postcss-loader',
          options: {
            implementation: require('postcss')
          }
        }, ...webpackConfig.module.rules[key].use.slice(-1)]
      }
    }
  return webpackConfig;
};
