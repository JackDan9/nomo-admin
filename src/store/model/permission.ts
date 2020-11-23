export interface Permission {
  id?: number
  // 路由权限/按钮权限
  type?: 'route' | 'button'
  // 权限名称
  name?: string
  // 描述
  description?: string
  // 提示信息
  reminder?: string
}