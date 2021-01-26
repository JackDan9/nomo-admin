import { lazy } from 'react';
import CommonRoute from '../CommonRoute';

const BrandClassfication = lazy(
  () => import(/* webpackChunkName: "brand-classfication" */ '@/pages/brand/classfication')
)

const BrandLevel = lazy(
  () => import(/* webpackChunkName: "brand-level" */ '@/pages/brand/level')
)

const route: CommonRoute = {
  name: 'brand',
  title: '品牌管理',
  icon: 'brand',
  path: '/brand',
  children: [
    {
      name: 'classfication',
      title: '品牌分类',
      path: '/brand/classfication',
      exact: true,
      component: BrandClassfication
    },
    {
      name: 'level',
      title: '品牌等级',
      path: '/brand/level',
      exact: true,
      component: BrandLevel
    }
  ]
}

export default route;