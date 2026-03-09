import { getMenuList, type MenuItemDto } from '@/api/menu'
import { MainLayout } from '@/layouts'
import { loadRemote } from '@module-federation/enhanced/runtime'
import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// 使用普通lazy写法 https://github.com/remix-run/react-router/tree/main/examples/lazy-loading，虽然用了RouterProvider，但是RouterProvider写法比较杂乱且有类型风险，暂时不采用https://github.com/remix-run/react-router/issues/10475
const HomePage = lazy(() => import('@/pages/home'))

const localRoutes = [
  {
    path: '/',
    element: <HomePage></HomePage>,
    handle: { label: '首页' },
  },
]

const localPathSet = new Set(localRoutes.map((r) => r.path))
const routeByPath = new Map(
  localRoutes.map((r) => [
    r.path,
    r as { path: string; handle: { label: string }; element: React.ReactNode },
  ]),
)

/** 请求 menus 与 localRoutes 取交集，只保留 path 在 localRoutes 中的项，element 用本地路由的 */
export async function getMenusAsSidebarItems(): Promise<
  {
    path: string
    handle: { label: string }
    element: React.ReactNode
  }[]
> {
  const menus = await getMenuList()

  const flatten = (
    items: MenuItemDto[],
  ): { pathNorm: string; name: string }[] => {
    const result: { pathNorm: string; name: string }[] = []

    items.forEach((item) => {
      const path = item.path ?? ''
      const pathNorm = path
        ? path.startsWith('/') || path.startsWith('@')
          ? path
          : `/${path}`
        : '/'

      result.push({ pathNorm, name: item.name })

      if (item.children?.length) {
        result.push(...flatten(item.children))
      }
    })

    return result
  }

  const flat = flatten(menus)

  const localMergedRoutes = flat.filter(({ pathNorm }) =>
    localPathSet.has(pathNorm),
  )

  const remoteMergedRoutes = flat.filter(({ pathNorm }) =>
    pathNorm.includes('@'),
  )

  return [...localMergedRoutes, ...remoteMergedRoutes].map(
    ({ pathNorm, name }) => {
      const route = routeByPath.get(pathNorm)

      return {
        path: pathNorm,
        handle: { label: name },
        element:
          (pathNorm.includes('@')
            ? createElement(lazy(() => loadRemote(pathNorm.slice(1))))
            : route?.element) ?? null,
      }
    },
  )
}

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: await getMenusAsSidebarItems(),
  },
]

const layoutChildren = routesConfig[0]?.children ?? []

export const sidebarMenuItems = layoutChildren.map((r) => {
  const route = r as { path?: string; handle?: { label: string } }
  return {
    key: route.path ?? '/',
    label: route.handle?.label ?? route.path ?? '',
  }
})
