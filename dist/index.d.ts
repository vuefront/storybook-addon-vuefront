import { Configuration } from 'webpack';
import postcss from 'postcss';
import type { RuleSetRule } from 'webpack';
declare type StyleLoaderOptions = Record<string, unknown>;
declare type CssLoaderOptions = Record<string, unknown> & {
    importLoaders?: number;
};
declare type PostcssLoaderOptions = Record<string, unknown> & {
    implementation?: typeof postcss;
};
interface Options {
    styleLoaderOptions?: StyleLoaderOptions | false;
    cssLoaderOptions?: CssLoaderOptions | false;
    postcssLoaderOptions?: PostcssLoaderOptions | false;
    rule?: RuleSetRule;
    replaceRoot?: string | false;
}
export declare const webpack: (webpackConfig?: Configuration, options?: Options) => Configuration;
export {};
