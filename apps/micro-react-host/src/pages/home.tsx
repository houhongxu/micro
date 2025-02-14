import { routesConfig } from '@/routes/config'
import { lazy } from 'react'
import { Link } from 'react-router-dom'
import RemoteComponent from 'remote-module/lib/remote-component/remote-component'

const Button = lazy(() => import('remoteApp/Button'))

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Button></Button>

      <RemoteComponent url="http://localhost:3000/remote/index.js"></RemoteComponent>

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
