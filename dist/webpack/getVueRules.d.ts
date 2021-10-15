import { Compiler, RuleSetUseItem } from 'webpack';
export declare function isVueLoader(use: RuleSetUseItem): boolean | "";
export declare function getVueRules(compiler: Compiler): {
    rule: any;
    index: number;
}[];
