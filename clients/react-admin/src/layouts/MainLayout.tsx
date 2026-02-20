import { sidebarMenuItems } from '@/routes/config'
import { Layout, Menu } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Header, Content, Sider } = Layout

export const MainLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKey =
    location.pathname === '/menu' ? '/menu' : location.pathname || '/'

  return (
    <Layout className="min-h-screen">
      <Sider width={200} className="bg-white">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold">React Admin</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={sidebarMenuItems}
          className="border-r-0"
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header className="bg-white border-b border-gray-200 px-6 flex items-center h-16">
          <h2 className="text-lg font-semibold m-0">管理后台</h2>
        </Header>
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
