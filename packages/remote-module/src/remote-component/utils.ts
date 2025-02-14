import { ComponentType, LazyExoticComponent, lazy } from 'react'

const REMOTE_COMPONENT_CACHE = new Map<
  string,
  LazyExoticComponent<ComponentType<any>>
>()

async function fetchLoader(remoteUrl: string) {
  console.log('remote-component fetch:', remoteUrl)

  try {
    const res = await fetch(remoteUrl)

    const text = await res.text()

    // 模拟cjs module
    const module = {
      exports: { default: {} as ComponentType<any> },
    }

    // 模拟cjs require
    const require = (pkgName: string) => {
      return window[pkgName as keyof Window]
    }

    // 执行umd文件，并使用模拟的module.exports拿到webpackModule
    Function('require, exports, module', text)(require, module.exports, module)

    console.log('remote-component module:', module)

    return { default: module.exports.default }
  } catch (e) {
    throw new Error('remote-component url加载失败：' + e)
  }
}

export function lazyCacheLoader(url: string) {
  if (REMOTE_COMPONENT_CACHE.size > 10) {
    const first: string | undefined = REMOTE_COMPONENT_CACHE.keys().next().value

    if (first) {
      REMOTE_COMPONENT_CACHE.delete(first)
    }
  }

  let component = REMOTE_COMPONENT_CACHE.get(url)

  if (!component) {
    component = lazy(() => fetchLoader(url))

    REMOTE_COMPONENT_CACHE.set(url, component)
  }

  return component
}
