import type { Compiler } from 'webpack';
declare type Options = {
    autoImport: boolean;
    config: VueFrontConfig;
};
export declare class VuefrontLoaderPlugin {
    options: Required<Options>;
    constructor(options: Options);
    apply(compiler: Compiler): void;
}
export {};
