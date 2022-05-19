import { lazy } from 'react';
import CommonRoute from '../CommonRoute';

const RecuriteList = lazy(
  () => import(/* webpackChunkName: "recurite" */ '@/pages/recurite/list/index')
)

const RecuriteDetailList = lazy(
  () => import(/* webpackChunkName: "recurite-detail-list" */ '@/pages/recurite/detail/index')
)


const route: CommonRoute = {
  name: 'recurite',
  title: '招聘管理',
  icon: 'recurite',
  path: '/recurite',
  children: [
    {
      name: 'list',
      title: '招聘列表',
      path: '/recurite/list',
      exact: true,
      component: RecuriteList
    },
    {
      name: 'detail',
      title: '招聘详情列表',
      path: '/recurite/detail-list',
      exact: true,
      component: RecuriteDetailList
    }
  ]
};


export default route;