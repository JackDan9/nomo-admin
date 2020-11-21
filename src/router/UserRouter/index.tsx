import React, { lazy, Suspense } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from '../../components/PageLoading';

const Login = lazy(() => import(/* webpackChunkName: "login" */ '../../pages/user/login'))
const Register = lazy(() => import(/* webpackChunkName: "register" */ '../../pages/user/register'))

const routes: RouteProps[] = [
  {
    path: '/user/login',
    exact: true,
    component: Login,
  },
  {
    path: '/user/register',
    exact: true,
    component: Register
  }
]

const UserRouter: React.FC = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      { routes.map((route: RouteProps) => (
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

export default UserRouter;