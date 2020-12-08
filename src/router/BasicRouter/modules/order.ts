// Ticket || 票务管理
import { lazy } from "react";
import CommonRoute from '../CommonRoute';

const OrderTicket = lazy(
  () => import(/* webpackChunkName: "order-ticket" */ '@/pages/order/ticket')
)

const route: CommonRoute = {
  name: 'order',
  title: '票务管理',
  icon: 'fly',
  path: '/order',
  children: [
    {
      name: 'ticket',
      title: '出票中心',
      path: '/order/ticket',
      exact: true,
      component: OrderTicket
    }
  ]
}

export default route;