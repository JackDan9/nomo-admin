import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PageLoading from './components/PageLoading';

const BasicLayout = React.lazy(
  () => import(/* webpackChunkName: "basic-layout" */ './layouts/BasicLayout')
)

const UserLayout = React.lazy(
  () => import(/* webpackChunkName: "user-layout" */ './layouts/UserLayout')
)

const App: React.FC = () => {
  
  return (
    <Router>
      <React.Suspense fallback={ <PageLoading /> }>
        <Switch>
          <Route path="/user" component={UserLayout} />
           {/*
              由于没有设置exact，只要url中包含"/",就会与这个路由匹配成功，所以必须将它写在最后。
              如果写在最前面，比如url为“/account/login”时，也会匹配成功，
             */}
          <Route path="/" component={BasicLayout} />
        </Switch>
        
      </React.Suspense>
    </Router>
  )
}

export default App