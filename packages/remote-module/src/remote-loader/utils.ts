import { ComponentType, LazyExoticComponent, lazy } from 'react'

const REMOTE_COMPONENT_CACHE = new Map<
  string,
  LazyExoticComponent<ComponentType<any>>
>()

interface Module {
  default: ComponentType<any>
}

async function fetchLoader(remoteUrl: string) {
  const stream = await fetch(remoteUrl)

  const blob = await stream.blob()

  const localUrl = URL.createObjectURL(blob)

  const module = (await import(localUrl)) as Module

  URL.revokeObjectURL(localUrl)

  return module
}

export function lazyCacheLoader(url: string) {
  if (REMOTE_COMPONENT_CACHE.size > 10) {
    const first = REMOTE_COMPONENT_CACHE.keys().next().value

    REMOTE_COMPONENT_CACHE.delete(first)
  }

  let component = REMOTE_COMPONENT_CACHE.get(url)

  if (!component) {
    component = lazy(() => fetchLoader(url))
    REMOTE_COMPONENT_CACHE.set(url, component)
  }

  return component
}
