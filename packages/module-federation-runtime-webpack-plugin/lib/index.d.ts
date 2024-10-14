import { Compiler } from 'webpack';
interface ModuleFedSingleRuntimePluginOptions {
    fileName: string;
}
declare class ModuleFederationRuntimeWebpackPlugin {
    private _options;
    constructor({ fileName }: Partial<ModuleFedSingleRuntimePluginOptions>);
    apply(compiler: Compiler): void;
}
export default ModuleFederationRuntimeWebpackPlugin;
