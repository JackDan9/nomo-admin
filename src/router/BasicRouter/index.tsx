import React, { Suspense } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from '@/components/PageLoading';

import CommonRoute from './CommonRoute';

interface BasicRouterProps {
  routeMap: CommonRoute[]
}

const BasicRouter: React.FC<BasicRouterProps> = ({ routeMap }) => {
  // 根据路由配置生成路由
  const getRoutes = (routeMap: CommonRoute[]) => {
    const routes: RouteProps[] = [];
    const getRoute = (routeMap: CommonRoute[]) => {
      routeMap.forEach((config) => {
        const { path, exact, component, children } = config
        if (children) {
          getRoute(children)
        } else {
          routes.push({ path, exact, component })
        }
      })
    }
    getRoute(routeMap)
    return routes;
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {getRoutes(routeMap).map((route: RouteProps) => (
          <Route 
            key={route.path + ''}
            path={route.path}
            exact={route.exact}
            component={route.component} 
          />
        ))}
      </Switch>
    </Suspense>
  )
}

export default BasicRouter;