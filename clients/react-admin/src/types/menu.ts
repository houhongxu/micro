export interface MenuItem {
  id: string
  name: string
  path?: string
  icon?: string
  parentId?: string
  children?: MenuItem[]
}
