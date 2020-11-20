import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const BasicLayout = React.lazy(
  () => import(/* webpackChunkName: "basic-layout" */ './layouts/BasicLayout')
)

const UserLayout = React.lazy(
  () => import(/* webpackChunkName: "user-layout" */ './layouts/UserLayout')
)

const App: React.FC = () => {
  
  return (
    <div>
      Hello world!
    </div>
  )
}

export default App