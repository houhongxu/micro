import { MainLayout } from '@/layouts'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const MenuPage = lazy(() => import('@/pages/menu'))

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <>home</>,
      },
      {
        path: '/menu',
        element: <MenuPage></MenuPage>,
      },
    ],
  },
]
