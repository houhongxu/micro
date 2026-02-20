import { NavLink, Outlet } from 'react-router-dom'

const sidebarMenuItems = [
  { key: '/', label: '首页' },
  { key: '/masonry', label: 'Masonry' },
  { key: '/scroll-view', label: 'ScrollView' },
  { key: '/image', label: 'Image' },
  { key: '/virtual-list', label: 'VirtualList' },
]

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-52 shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold">React Remote</h1>
        </div>
        <nav className="p-2">
          <ul className="space-y-0.5">
            {sidebarMenuItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.key}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 flex items-center px-6 bg-white border-b border-gray-200">
          <h2 className="text-lg font-semibold m-0">Remote 应用</h2>
        </header>
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
