import { MainLayout } from '@/layouts'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const MenuPage = lazy(() => import('@/pages/menu'))

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      { path: '/', element: <>home</>, handle: { label: '首页' } },
      { path: '/menu', element: <MenuPage></MenuPage>, handle: { label: '菜单管理' } },
    ],
  },
]

const layoutChildren = routesConfig[0]?.children ?? []
export const sidebarMenuItems = layoutChildren.map((r) => {
  const route = r as { path?: string; handle?: { label: string } }
  return { key: route.path ?? '/', label: route.handle?.label ?? route.path ?? '' }
})
