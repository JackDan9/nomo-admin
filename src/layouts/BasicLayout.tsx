import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, BackTop, Menu } from 'antd';
import BasicRouter from '@/router/BasicRouter';
import CommonRoute from '@/router/BasicRouter/CommonRoute';
import InitRoute from '@/router/BasicRouter/InitRoute';
import UserStore from '@/store/user';
import HeaderBar from '@/components/HeaderBar';
import SiderBar from '@/components/SiderBar';
import service from './service'
import Tab from '@/store/tab';
import styles from './BasicLayout.less'

// https://github.com/malte-wessel/react-custom-scrollbars
import { Scrollbars } from 'react-custom-scrollbars';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from '@/components/Avatar';
import route from '@/router/BasicRouter/modules/dashboard';
import SvgIcon from '@/components/Base/SvgIcon';
import NavLink from '@/components/NavLink';

import DefaultSettings from '@/config/defaultSettings';
interface tabList {
  tab: any,
  key: string,
  path: any,
  locale: any,
  closable: boolean,
  component: any
}

const BasicLayout: React.FC = (props) => {
  const history = useHistory()
  // 是否折叠侧边菜单
  const [collapse, setCollapse] = useState(false)
  // 路由配置
  const [routeMap, setRouteMap] = useState<CommonRoute[]>([])
  // 是否现实多标签Tab
  const [hideTabs, setHiderTabs] = useState(true);
  // 实现多标签的Tab列表
  const [tabList, setTabList]  = useState<tabList[]>([])
  // 实现多标签的Tab的缓存Key列表
  const [tabListArr, setTabListArr] = useState<any[]>([])
  const routeKey = '/dashboard';
  // 当前激活的菜单
  const [activeMenu, setActiveMenu] = useState(routeKey)


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

  const updateTree = (data:any) => {
    const treeData = data;
    const treeList:any = [];
    // 递归获取树列表
    const getTreeList = (data: any) => {
      data.forEach(node => {
        if(!node.level) {
          treeList.push({ tab: node.name, key: node.path, locale: node.locale, closable: true, content: node.component })
        }
        if(node.routes && node.routes.length > 0) {
          getTreeList(node.routes);
        }
      });
    };
    getTreeList(treeData);
    return treeList; 
  }

  const routes = routeMap;
  debugger;
  const tabLists:any = updateTree(routes);
  const routeName = '首页';

  tabLists.map((v) => {
    if(v.key === routeKey) {
      if(tabList.length === 0) {
        v.closable = false;
        v.tab = routeName;
        tabList.push(v);
      }
    }
    if(v.key) {
      tabListArr.push(v.key);
    }
  });
  /**
   * @description 侧边菜单
   */
  const renderThumb = (props: any) => {
    const { style, ...rest } = props;

    const thumbStyle: React.CSSProperties = {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderRadius: '3px',
      cursor: 'pointer'
    }

    return <div style={{ ...style, ...thumbStyle }} {...rest} />
  }

  /**
   * @description 切换菜单折叠状态
   */
  const triggerCollapse = () => {
    setCollapse((state) => !state)
  }

  const { Content } = Layout;
  const contentStyle = { paddingTop: 0 };

  /**
   * 
   * @param e 
   * @description 切换左侧导航栏数据
   */
  const handelClickMenu = (e) => {
    const { key } = e;
    setActiveMenu(key);
  }

  /**
   * 
   * @param route CommonRoute
   * @description 根据路由配置生成菜单
   */
  const getMenuItem = (route: CommonRoute) => {
    const { title, path, icon, children } = route

    if (children) {
      return (
        <Menu.SubMenu key={path + ''} icon={icon ? <SvgIcon name={icon} /> : null} title={title}>
          {children.map((route: CommonRoute) => getMenuItem(route))}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={path + ''}>
        <NavLink path={path + ''} icon={icon} title={title} />
      </Menu.Item>
    )
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
        {/* <SiderBar routeMap={routeMap} /> */}
        <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
          <div className={styles.siderBar}>
            <div className={styles.siderBarLogo}>
              <Link to="/dashboard">
                <img className={styles.image} src={DefaultSettings.logo} alt="" />
                <span className={styles.title}>{DefaultSettings.title}</span>
              </Link>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[activeMenu]} onClick={handelClickMenu}>
              {routeMap.map((route) => getMenuItem(route))}
            </Menu>
          </div>
        </Scrollbars>
      </Layout.Sider>

      <Layout id="layoutMain" className={styles.main}>
        {/* <HeaderBar collapse={collapse} onTrigger={triggerCollapse} hideTabs={hideTabs} routeMap={routeMap} /> */}
        <div>
          <div className={styles.headerBar}>
            {
              collapse ? (
                <MenuUnfoldOutlined className={styles.headerBarTrigger} onClick={triggerCollapse} />
              ) : (
                  <MenuUnfoldOutlined className={styles.headerBarTrigger} onClick={triggerCollapse} />
                )
            }
            <div>
              <Avatar />
            </div>
          </div>
          <Content className={styles.content} style={contentStyle}>

          </Content>
        </div>
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
/**
 * 
 * @param prevProps 
 * @param nextProps 
 * @description { 如果把 nextProps 传入 render 方法的返回结果与将 prevProps 传入 render 方法的返回结果一致则返回 true，否则返回 false }
 */
const updateComponent = (prevProps:any, nextProps:any) => {
 
 if(nextProps === prevProps) {
  return false;
 } else {
  return true;
 }
}

export default React.memo(BasicLayout);