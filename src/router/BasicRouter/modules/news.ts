// News || 新闻
import { lazy } from 'react';
import CommonRoute from '../CommonRoute';

const NewsList = lazy(
  () => import(/* webpackChunkName: "news-list" */ '@/pages/news/list/index')
)

const NewsDetailsList = lazy(
  () => import(/* webpackChunkName: "news-details-list" */ '@/pages/news/detail/index')
)

const route: CommonRoute = {
  name: 'news',
  title: '新闻管理',
  icon: 'news',
  path: '/news',
  children: [
    {
      name: 'list',
      title: "新闻列表",
      path: '/news/list',
      exact: true,
      component: NewsList
    },
    {
      name: "detail",
      title: "新闻详情列表",
      path: '/news/detail-list',
      exact: true,
      component: NewsDetailsList
    },
  ]
};

export default route;