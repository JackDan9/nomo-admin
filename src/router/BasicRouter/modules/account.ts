// Account || 用户管理
import { lazy } from "react";
import CommonRoute from '../CommonRoute';

const Account = lazy(
  () => import(/* webpackChunkName: "account" */ '@/pages/account')
)

const AccountCenter = lazy(
  () => import(/* webpackChunkName: "account-center" */ '@/pages/account/center')
)

const AccountSettings = lazy(
  () => import(/* webpackChunkName: "account-settings" */ '@/pages/account/settings')
)

const route: CommonRoute = {
  name: 'account',
  title: '用户管理',
  icon: 'account',
  path: '/account',
  // component: Account
  children: [
    {
      name: 'center',
      title: '用户中心',
      path: '/account/center',
      exact: true,
      component: AccountCenter
    },
    {
      name: 'settings',
      title: '用户设置',
      path: '/account/settings',
      exact: true,
      component: AccountSettings
    }
  ]
}

export default route;