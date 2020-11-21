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
        </Switch>
      </React.Suspense>
    </Router>
  )
}

export default App