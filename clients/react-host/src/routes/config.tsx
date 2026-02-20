import { MainLayout } from '@/layouts'
import { loadRemote } from '@module-federation/enhanced/runtime'
import { createElement, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// 使用普通lazy写法 https://github.com/remix-run/react-router/tree/main/examples/lazy-loading，虽然用了RouterProvider，但是RouterProvider写法比较杂乱且有类型风险，暂时不采用https://github.com/remix-run/react-router/issues/10475
const HomePage = lazy(() => import('@/pages/home'))

const remoteRoutes = [
  {
    path: '@remoteApp/image',
    handle: { label: 'Image' },
  },
  {
    path: '@remoteApp/masonry',
    handle: { label: 'Masonry' },
  },
  {
    path: '@remoteApp/scroll-view',
    handle: { label: 'ScrollView' },
  },
  {
    path: '@remoteApp/virtual-list',
    handle: { label: 'VirtualList' },
  },
].map((r) => {
  const LazyRemoteComponent = lazy(() => loadRemote(r.path.slice(1)))

  return {
    path: r.path,
    element: createElement(LazyRemoteComponent),
    handle: r.handle,
  }
})

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      { path: '/', element: <HomePage></HomePage>, handle: { label: '首页' } },

      ...remoteRoutes,
    ],
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
