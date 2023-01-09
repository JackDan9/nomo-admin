// Cities || 城市
import { lazy } from 'react';
import CommonRoute from '../CommonRoute';

const CitiesList = lazy(
  () => import(/* webpackChunkName: "cities-list" */ '@/pages/cities/list/index')
)

// const CitiesDetailsList = lazy(
//   () => import(/* webpackChunkName: "cities-details-list" */ '@/pages/cities/detail/index')
// )

const route: CommonRoute = {
  name: 'cities',
  title: '城市管理',
  icon: 'cities',
  path: '/cities',
  children: [
    {
      name: 'list',
      title: "城市列表",
      path: '/cities/list',
      exact: true,
      component: CitiesList
    },
    // {
    //   name: "detail",
    //   title: "新闻详情列表",
    //   path: '/cities/detail-list',
    //   exact: true,
    //   component: CitiesDetailsList
    // },
  ]
};

export default route;