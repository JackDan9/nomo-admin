// Account || 用户管理
import { lazy } from "react";
import CommonRoute from '../CommonRoute';

const Account = lazy(
  () => import(/* webpackChunkName: "account" */ '@/pages/account')
)

const route: CommonRoute = {
  name: 'account',
  title: '用户管理',
  icon: 'account',
  path: '/account',
  exact: true,
  component: Account
}

export default route;