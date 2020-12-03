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

const BasicLayout: React.FC = (props) => {
  const history = useHistory()
  // 是否折叠侧边菜单
  const [collapse, setCollapse] = useState(false)
  // 路由配置
  const [routeMap, setRouteMap] = useState<CommonRoute[]>([])
  // 是否现实多标签Tab
  const [hideTabs, setHiderTabs] = useState(true);
  // 实现多标签的Tab列表
  // const [tabList, setTabList]  = useState<tabList[]>([])

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
  // const tabLists:any = this.updateTree(routes);
  // let tabList:any = [];
  // let tabListArr:any = [];
  // tabLists.map((v) => {
  //   if(v.key === routeKey) {
  //     if(tabList.length === 0) {
  //       v.closable = false;
  //       v.tab = tabName;
  //       tabList.push(v);
  //     }
  //   }
  //   if(v.key) {
  //     tabListArr.push(v.key);
  //   }
  // });

  // updateTree = (data:any) => {
  //   const treeData = data;
  //   const treeList:any = [];
  //   // 递归获取树列表
  //   const getTreeList = (data: any) => {
  //     data.forEach(node => {
  //       if(!node.level) {
  //         treeList.push({ tab: node.name, key: node.path, locale: node.locale, closable: true, content: node.component })
  //       }
  //       if(node.routes && node.routes.length > 0) {
  //         //!node.hideChildrenInMenu &&
  //         getTreeList(node.routes);
  //       }
  //     });
  //   };
  //   getTreeList(treeData);
  //   return treeList; 
  // }

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
        <HeaderBar collapse={collapse} onTrigger={triggerCollapse} hideTabs={hideTabs} routeMap={routeMap} />

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