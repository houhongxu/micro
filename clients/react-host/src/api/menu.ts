import request from '@/utils/request'

export interface MenuItemDto {
  id: number
  name: string
  path?: string
  parentId?: number | null
  children?: MenuItemDto[]
}

/** 请求 menus 获得数组（后端树形） */
export async function getMenuList(): Promise<MenuItemDto[]> {
  return request<MenuItemDto[]>('/menu')
}
