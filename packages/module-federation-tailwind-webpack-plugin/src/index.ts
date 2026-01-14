import {
  DEFAULT_VIRTUAL_MODULE_NAME,
  DEFAULT_VIRTUAL_MODULE_CONTENT,
} from './constant'
import importCssLoader from './loader'
import path from 'path'
import type { Compiler } from 'webpack'
import VirtualModulesPlugin from 'webpack-virtual-modules'

export interface ModuleFederationTailwindPluginOptions {
  /**
   * 虚拟 CSS 模块的文件名
   */
  virtualModuleName?: string
  /**
   * 虚拟 CSS 模块的内容
   */
  virtualModuleContent?: string
}

/**
 * Webpack Plugin
 * 为 Module Federation expose 组件自动引入 Tailwind CSS
 * - 创建 tailwind.css 虚拟模块
 * - 提供 loader 用于在 expose 文件中自动注入 import
 */
class ModuleFederationTailwindPlugin {
  private options: Required<ModuleFederationTailwindPluginOptions>
  public static loader: string

  constructor(options: ModuleFederationTailwindPluginOptions = {}) {
    this.options = {
      virtualModuleName:
        options.virtualModuleName || DEFAULT_VIRTUAL_MODULE_NAME,
      virtualModuleContent:
        options.virtualModuleContent || DEFAULT_VIRTUAL_MODULE_CONTENT,
    }
  }

  static {
    // loader 的路径（编译后的路径）
    ModuleFederationTailwindPlugin.loader = path.join(__dirname, 'loader.js')
  }

  apply(compiler: Compiler) {
    const { virtualModuleName, virtualModuleContent } = this.options

    // 创建虚拟模块插件
    const virtualModulesPlugin = new VirtualModulesPlugin({
      [virtualModuleName]: virtualModuleContent,
    })

    // 应用虚拟模块插件
    virtualModulesPlugin.apply(compiler)

    // 5个expose产生10个css的原因： splitChunks:all 时，因为模块联邦是异步引入，每个expose会被分割，名称被插件按照exposes对象设置为name.hash.css，而virtualModuleContent也会被分割，但是是项目设置，未配置name，默认为id.hash.css
  }
}

export default ModuleFederationTailwindPlugin
export { importCssLoader }
