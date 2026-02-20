import { createMenu, deleteMenu, getMenuList, updateMenu } from '@/api/menu'
import type { MenuItem } from '@/types/menu'
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Spin,
  Table,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useMemo, useState } from 'react'

export default function MenuPage() {
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [parentMenuId, setParentMenuId] = useState<string | undefined>(
    undefined,
  )
  const [form] = Form.useForm()

  // 仅顶级菜单用于父菜单选择（限制两层：只能选顶级作为父级）
  const rootMenusForParentSelect = useMemo(
    () => menus.map((m) => ({ label: m.name, value: m.id })),
    [menus],
  )

  const fetchMenus = async () => {
    setLoading(true)
    try {
      const data = await getMenuList()
      setMenus(data)
    } catch (error) {
      message.error('获取菜单列表失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const handleAdd = (parentId?: string) => {
    setEditingMenu(null)
    setParentMenuId(parentId)
    form.resetFields()
    if (parentId) {
      form.setFieldsValue({ parentId })
    }
    setIsModalOpen(true)
  }

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu)
    setParentMenuId(menu.parentId)
    form.setFieldsValue({
      ...menu,
      parentId: menu.parentId,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个菜单吗？',
      onOk: async () => {
        try {
          await deleteMenu(id)
          message.success('删除成功')
          fetchMenus()
        } catch (error) {
          message.error('删除失败')
        }
      },
    })
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      if (editingMenu) {
        await updateMenu(editingMenu.id, values)
        message.success('更新成功')
      } else {
        await createMenu({
          ...values,
          id: `menu-${Date.now()}`,
        })
        message.success('创建成功')
      }
      setIsModalOpen(false)
      form.resetFields()
      fetchMenus()
    } catch (error) {
      message.error(editingMenu ? '更新失败' : '创建失败')
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    setEditingMenu(null)
    setParentMenuId(undefined)
  }

  const processMenusForDisplay = (
    items: MenuItem[],
    parentPath = '',
  ): Array<MenuItem & { displayName: string }> => {
    return items.map((item) => {
      const currentPath = parentPath
        ? `${parentPath} / ${item.name}`
        : item.name

      // 有子菜单才传 children，否则不传，表格不会显示展开图标
      const processedChildren =
        item.children && item.children.length > 0
          ? processMenusForDisplay(item.children, currentPath)
          : undefined

      return {
        ...item,
        displayName: currentPath,
        children: processedChildren,
      }
    })
  }

  const columns: ColumnsType<MenuItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: '名称',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (_, record) => (
        <Space>
          {/* 仅顶级菜单可添加子菜单，限制两层 */}
          {!record.parentId && (
            <Button type="link" onClick={() => handleAdd(record.id)}>
              添加子菜单
            </Button>
          )}
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="menu-page flex items-center justify-center min-h-[400px]">
        <Spin tip="加载中..." />
      </div>
    )
  }

  return (
    <div className="menu-page">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">菜单管理</h1>
        <Button type="primary" onClick={() => handleAdd()}>
          新增菜单
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={processMenusForDisplay(menus)}
          rowKey="id"
          pagination={false}
          className="menu-table"
          expandable={{
            expandRowByClick: true,
          }}
        />
      </div>

      <Modal
        title={editingMenu ? '编辑菜单' : '新增菜单'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={600}
        className="menu-modal"
      >
        <Form form={form} layout="vertical" className="menu-form">
          <Form.Item
            name="parentId"
            label="父菜单"
            tooltip="仅支持两层菜单，不选则为顶级菜单；父菜单只能选顶级"
          >
            <Select
              placeholder="请选择父菜单（可选，仅顶级）"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={rootMenusForParentSelect.map((menu) => ({
                ...menu,
                disabled: editingMenu?.id === menu.value,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item name="path" label="路径">
            <Input placeholder="请输入路径，如：/menu" />
          </Form.Item>
          <Form.Item name="icon" label="图标">
            <Input placeholder="请输入图标名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
