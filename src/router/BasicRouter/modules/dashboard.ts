// Dashboard || 首页
import { lazy } from 'react';
import CommonRoute from '../CommonRoute';

const Dashboard = lazy(
  () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard')
)

const route: CommonRoute = {
  name: 'dashboard',
  title: '首页',
  icon: 'dashboard',
  path: '/dashboard',
  exact: true,
  component: Dashboard
}

export default route;