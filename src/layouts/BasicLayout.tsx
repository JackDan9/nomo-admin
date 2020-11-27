import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import BasicRouter from '@/router/BasicRouter';
import CommonRoute from '@/router/BasicRouter/CommonRoute';
import InitRoute from '@/router/BasicRouter/InitRoute';
import UserStore from '@/store/user';
import HeaderBar from '@/components/HeaderBar';
import SiderBar from '@/components/SiderBar';
import service from './service'
import styles from './BasicLayout.less'


const BasicLayout: React.FC = () => {
  const history = useHistory()
  // 是否折叠侧边菜单
  const [collapse, setCollapse] = useState(false)
  // 路由配置
  const [routeMap, setRouteMap] = useState<CommonRoute[]>([])

  useEffect(() => {
    const token = UserStore.token
    if (!token) {
      history.replace('/user/login')
    } else {
      const userInfo = UserStore.userInfo
      setRouteMap(InitRoute(userInfo.permission))
      // service.getUserInfo({ token }).then((res) => {
      //   UserStore.setUserInfo(res)
      //   setRouteMap(InitRoute(res.permission))
      // })
    }
  }, [])

  // 切换菜单折叠状态
  const triggerCollapse = () => {
    setCollapse((state) => !state)
  }

  return (
    <Layout className={styles.basicLayout}>
      <Layout.Sider
        className={styles.sider}
        width={160}
        trigger={null}
        collapsible={true}
        collapsed={collapse}
      >
        <SiderBar routeMap={routeMap} />
      </Layout.Sider>

      <Layout id="layoutMain" className={styles.main}>
        <HeaderBar collapse={collapse} onTrigger={triggerCollapse} />

        <div className={styles.content}>
          <BasicRouter routeMap={routeMap} />
        </div>

        <BackTop
          style={{ right: '50px' }}
          target={() => document.getElementById('layoutMain')!}
          visibilityHeight={600}
        />
      </Layout>
    </Layout>
  )
}

export default BasicLayout;