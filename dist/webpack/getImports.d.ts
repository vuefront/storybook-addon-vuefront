export declare function getImports(config: VueFrontConfig, source: string, id: string): {
    imports: Map<string, string[]>;
    hasNewImports: boolean;
    components: string[];
};
