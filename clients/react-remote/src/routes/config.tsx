import { MainLayout } from '@/layouts'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// 使用普通lazy写法 https://github.com/remix-run/react-router/tree/main/examples/lazy-loading，虽然用了RouterProvider，但是RouterProvider写法比较杂乱且有类型风险，暂时不采用https://github.com/remix-run/react-router/issues/10475
const HomePage = lazy(() => import('@/pages/home'))
const ImagePage = lazy(() => import('@/pages/image'))
const MasonryPage = lazy(() => import('@/pages/masonry'))
const ScrollViewPage = lazy(() => import('@/pages/scroll-view'))
const VirtualListPage = lazy(() => import('@/pages/virtual-list'))

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      { path: '/', element: <HomePage></HomePage>, handle: { label: '首页' } },
      {
        path: '/masonry',
        element: <MasonryPage></MasonryPage>,
        handle: { label: 'Masonry' },
      },
      {
        path: '/scroll-view',
        element: <ScrollViewPage></ScrollViewPage>,
        handle: { label: 'ScrollView' },
      },
      {
        path: '/image',
        element: <ImagePage></ImagePage>,
        handle: { label: 'Image' },
      },
      {
        path: '/virtual-list',
        element: <VirtualListPage></VirtualListPage>,
        handle: { label: 'VirtualList' },
      },
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
