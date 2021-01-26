// Business || 经营图
import { lazy } from 'react';
import CommonRoute from '../CommonRoute';

const BusinessPlan = lazy(
  () => import(/* webpackChunkName: "business-plan" */ '@/pages/business/plan')
)

const BusinessPicture = lazy(
  () => import(/* webpackChunkName: "business-picture" */ '@/pages/business/picture')
)

const route: CommonRoute = {
  name: 'business',
  title: '经营图',
  icon: 'business',
  path: '/business',
  children: [
    {
      name: 'picture',
      title: '经营图视',
      path: '/business/picture',
      exact: true,
      component: BusinessPicture
    },
    {
      name: 'plan',
      title: '方案制作',
      path: '/business/plan',
      exact: true,
      component: BusinessPlan
    }
  ]
}

export default route;