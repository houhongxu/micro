import type { MenuItem } from '@/types/menu'
import request from '@/utils/request'

// 转换后端数据格式到前端格式
function transformMenu(menu: any): MenuItem {
  return {
    id: String(menu.id),
    name: menu.name,
    path: menu.path || undefined,
    icon: menu.icon || undefined,
    parentId: menu.parentId ? String(menu.parentId) : undefined,
    children: menu.children?.map(transformMenu),
  }
}

export async function getMenuList(): Promise<MenuItem[]> {
  const menus = await request<any[]>('/menu')
  return menus.map(transformMenu)
}

export async function createMenu(menu: MenuItem): Promise<MenuItem> {
  const created = await request<any>('/menu', {
    method: 'POST',
    body: {
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      parentId: menu.parentId ? Number(menu.parentId) : undefined,
    },
  })
  return transformMenu(created)
}

export async function updateMenu(
  id: string,
  menu: Partial<MenuItem>,
): Promise<MenuItem> {
  const updated = await request<any>(`/menu/${id}`, {
    method: 'PATCH',
    body: {
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      parentId: menu.parentId ? Number(menu.parentId) : undefined,
    },
  })
  return transformMenu(updated)
}

export async function deleteMenu(id: string): Promise<void> {
  await request(`/menu/${id}`, {
    method: 'DELETE',
  })
}
