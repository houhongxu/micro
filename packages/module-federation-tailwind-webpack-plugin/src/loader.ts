import { DEFAULT_VIRTUAL_MODULE_NAME } from './constant'
import path from 'path'
import type { LoaderContext } from 'webpack'

interface ImportCssLoaderOptions {
  virtualModuleName?: string
  exposes: Record<string, string>
}

/**
 * Webpack Loader
 * 为 expose 组件自动引入 virtualModuleName 虚拟模块
 * 在源码前添加 import virtualModuleName，由 VirtualModulesPlugin 提供虚拟模块
 * 只对 exposes 的文件生效
 */
export default function importCssLoader(
  this: LoaderContext<ImportCssLoaderOptions>,
  source: string,
): string {
  // 通过 this.getOptions() 获取 loader 选项
  const { virtualModuleName = DEFAULT_VIRTUAL_MODULE_NAME, exposes } =
    this.getOptions() ?? {}

  const resourcePath = this.resourcePath

  if (!resourcePath) {
    return source
  }

  // 只处理 exposes 的文件
  if (exposes) {
    const exposePaths = Object.values(exposes)

    if (exposePaths.length > 0) {
      const resolvedResourcePath = path.resolve(resourcePath)

      const isExposeFile = exposePaths.some((exposePath) => {
        const resolvedExposePath = path.resolve(process.cwd(), exposePath)
        return resolvedResourcePath.startsWith(resolvedExposePath)
      })

      if (!isExposeFile) {
        return source
      }
    }
  }

  // 检查是否已经包含 virtualModuleName 的 import（避免重复添加）
  if (
    source.includes(`import '${virtualModuleName}'`) ||
    source.includes(`import "${virtualModuleName}"`)
  ) {
    return source
  }

  // 在源码前添加 import virtualModuleName
  // VirtualModulesPlugin 会提供这个虚拟模块，内容是 virtualModuleContent
  return `import '${virtualModuleName}';\n${source}`
}
