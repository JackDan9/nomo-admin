// UserInfo || 用户信息
import { Permission } from '@/store/model/permission';

export interface UserInfo {
  uid?: number
  // 姓名, realname或者nickname
  name?: string
  username?: string
  // 昵称
  nickname?: string
  // 真实姓名
  realname?: string
  // 公司ID
  companyid?: number
  // 角色ID
  roleid?: number
  openid?: number
  // 角色
  roles?: number[]
  // 性别
  gender?: number
  // 年龄
  age?: number
  // 头像
  avatar?: string
  // 邮箱
  email?: string
  // 手机号
  phone?: string
  permission: Permission[]
}

