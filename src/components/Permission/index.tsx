import React from 'react'
import { message } from 'antd'
import { checkPermission } from '@/utils/permission'

interface PermissionProps {
  // 权限id
  permissionId?: number
  // 权限名称
  permissionName?: string
  [key: string]: any
}

// 普通组件的方式
// 如果没有权限，直接让DOM元素不渲染
const Permission: React.FC<PermissionProps> = (props) => {
  const { permissionId, permissionName, children } = props
  if (checkPermission(permissionId, permissionName)) {
    return <>{children}</>
  } else {
    return null
  }
}

// 高阶组件的方式
// 使用复杂一些，但是可以提供更灵活的方式。比如这里可以重写点击事件，并进行统一的错误提示
const wrapPermission = (WrapedComponent: React.FC<PermissionProps>) => {
  const WrapComponent: React.FC<PermissionProps> = (props) => {
    const { permissionId, permissionName, ...rest } = props

    const handleRemind = () => {
      message.error('您没有该权限，请联系相关人员开通')
    }

    if (checkPermission(permissionId, permissionName)) {
      return <WrapedComponent {...rest} />
    } else {
      return <WrapedComponent {...rest} onClick={handleRemind} />
    }
  }
  return WrapComponent
}

export default Permission
export { wrapPermission }