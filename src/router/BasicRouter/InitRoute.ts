import { Permission } from '@/store/model/permission';
import CommonRoute from './CommonRoute';
import accountRoute from './modules/account';
import dashboardRoute from './modules/dashboard';
import orderRoute from './modules/order';
import businessRoute from './modules/business';
import brandRoute from './modules/brand';

const routeMap = [dashboardRoute, accountRoute, orderRoute, businessRoute, brandRoute];

// 根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames: string[], routeMap: CommonRoute[]) => {
  const acceptedRouteMap: CommonRoute[] = [];
  routeMap.forEach((route: CommonRoute) => {
    // 如果一级路由的名称存在路由权限表中, 则它之下的所有子路由都可访问
    if(routeNames.includes(route.name)) {
      acceptedRouteMap.push(route);
    } else {
      // 如果一级路由的名称不在路由权限表中, 再看它的子路由名称在路由权限表中
      if(route.children) {
        route.children = filterRouteMap(routeNames, route.children);
        // 如果有子路由可访问, 再添加.
        if (route.children.length > 0) {
          acceptedRouteMap.push(route)
        } 
      }
    }
  })
  return acceptedRouteMap
}

const InitRoutes = (permission: Permission[]) => {
  const routeNames:any = permission.map((item) => item.name)
  return filterRouteMap(routeNames, routeMap);
}

export default InitRoutes;
