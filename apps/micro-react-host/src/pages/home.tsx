import { routesConfig } from '@/routes/config'
import { lazy } from 'react'
import { Link } from 'react-router-dom'

const Button = lazy(() => import('remoteApp/Button'))

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Button></Button>

      {routesConfig[0].children?.map(
        (route) =>
          route.path !== '/' && (
            <Link key={route.path} to={route.path || '/'}>
              {route.path?.slice(1)}
            </Link>
          ),
      )}
    </div>
  )
}
