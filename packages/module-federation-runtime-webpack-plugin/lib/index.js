"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
// 方案解决插件 https://github.com/module-federation/module-federation-examples/issues/646
// 官方尚未感觉有必要合并pr https://github.com/webpack/webpack/pull/11843
// v2才官方支持 https://module-federation.io/blog/hoisted-runtime.html#support-for-runtimechunk-single
const pluginName = 'ModuleFederationRuntimeWebpackPlugin';
class ModuleFederationRuntimeWebpackPlugin {
    constructor({ fileName }) {
        if (!fileName) {
            console.warn('No remote file configured, please pass {fileName: "remoteEntry.js"} in options');
        }
        this._options = { fileName: fileName !== null && fileName !== void 0 ? fileName : 'remoteEntry.js' };
    }
    apply(compiler) {
        // 本次构建生成资源前钩子
        compiler.hooks.emit.tap(pluginName, (compilation) => {
            const { assets, namedChunks } = compilation;
            // 获取runtimeChunk
            const runtimeChunk = namedChunks.get('runtime');
            if (!runtimeChunk) {
                throw new Error('No runtime single configured, so use of the plugin not required');
            }
            // 获取runtimeChunk文件全名
            const runtimeChunkFileName = Array.from(runtimeChunk.files)[0];
            // 获取runtimeChunk文件内容
            const runtimeChunkSource = assets[runtimeChunkFileName];
            // 获取remoteEntryChunk文件内容
            const remoteEntryChunkSource = assets[this._options.fileName];
            if (!remoteEntryChunkSource) {
                throw new Error(`No remote entry ${remoteEntryChunkSource} found, please make sure module federation configured properly else you dont need this plugin`);
            }
            // 获取runtimeChunk和remoteEntry合并的chunk内容
            const mergedSource = new webpack_1.sources.ConcatSource(remoteEntryChunkSource, runtimeChunkSource);
            // 更新assets
            assets[this._options.fileName] = mergedSource;
        });
    }
}
exports.default = ModuleFederationRuntimeWebpackPlugin;
