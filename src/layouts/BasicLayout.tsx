import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Layout, BackTop, Menu, Tabs } from 'antd';
import BasicRouter from '@/router/BasicRouter';
import CommonRoute from '@/router/BasicRouter/CommonRoute';
import InitRoute from '@/router/BasicRouter/InitRoute';
import UserStore from '@/store/user';
// import HeaderBar from '@/components/HeaderBar';
// import SiderBar from '@/components/SiderBar';
// import service from './service'
// import Tab from '@/store/tab';
import styles from './BasicLayout.less'

// https://github.com/malte-wessel/react-custom-scrollbars
import { Scrollbars } from 'react-custom-scrollbars';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from '@/components/Avatar';
import SvgIcon from '@/components/Base/SvgIcon';
import NavLink from '@/components/NavLink';

import DefaultSettings from '@/config/defaultSettings';
interface tabList {
  tab: any,
  key: string,
  locale: any,
  closable: boolean,
  exact: boolean,
  path: string,
  component: any
}

const BasicLayout: React.FC = (props) => {
  const history = useHistory()
  const location = useLocation()
  const { TabPane } = Tabs;
  const routeName = '首页';
  const { Content } = Layout;
  const contentStyle = { paddingTop: 0 };
  // 是否折叠侧边菜单
  const [collapse, setCollapse] = useState(false)
  // 路由配置
  const [routeMap, setRouteMap] = useState<CommonRoute[]>([])
  // 是否现实多标签Tab
  // const [hideTabs, setHiderTabs] = useState(true);
  // 路由的Key
  const routeKey = '/dashboard'
  // 实现多标签的Tab的缓存Key列表
  const [tabKeyList, setTabKeyList] = useState<any[]>([routeKey])
  // 实现多标签的Tab列表
  // const [tabListArr, setTabListArr] = useState<any[]>([]);
  // 当前激活的菜单
  const [activeKey, setActiveKey] = useState(routeKey);
  // 实现多标签的Tab列表
  const [tabList, setTabList] = useState<tabList[]>([]);


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
      if(location.pathname !== '/dashboard') {
        setActiveKey('/dashboard');
        history.push('/dashboard');
      } else {
        setActiveKey(location.pathname)
      }
    }
  }, [])

  /**
   * 
   * @param data router data
   * @description 递归获取路由树列表
   */
  const updateTree = (data: any) => {
    const treeData = data;
    const treeList: any = [];
    
    const getTreeList = (data: any) => {
      data.forEach(node => {
        if (!node.level) {
          treeList.push({ tab: node.title, key: node.path, path: node.path, locale: node.locale, closable: true, component: node.component, exact: node.exact })
        }
        if (node.children && node.children.length > 0) {
          getTreeList(node.children);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  }

  const routes = routeMap;
  const tabLists: any = updateTree(routes);
  const tabListArr: any[] = [];

  tabLists.map((v) => {
    if (v.key === routeKey) {
      if (tabList.length === 0) {
        v.closable = false;
        v.tab = routeName;
        setTabList([...tabList, v]);
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

  const updateTreeList = (data) => {
    const treeData = data;
    const treeList: any = [];
    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        if (!node.level) {
          treeList.push({ tab: node.title, key: node.path, path: node.path, locale: node.locale, closable: true, component: node.component, exact: node.exact });
        }
        if (node.children && node.children.length > 0) { //!node.hideChildrenInMenu &&
          getTreeList(node.children);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };
  
  /**
   * 
   * @param v 
   * @description 截取路由 /a/b/1
   */
  const StringToRoute = ( v ) => {
    const str = /\/:(.+)/g
    const key = v.replace(str,(_,g)=>'')
    const keyArr = key.split('/')
    if(keyArr.length === 2) {
      const keyString = [keyArr[0], keyArr[1]];
      return (keyString.toString()).replace(/,/g,'/')
    } else {
      const keyString = [keyArr[0],keyArr[1],keyArr[2]]
      return (keyString.toString()).replace(/,/g,'/')
    }
  }
  /**
   * 
   * @param e 
   * @description 切换左侧导航栏数据
   */
  const handelClickMenu = (e) => {
    const { key } = e;
    let splitKey = StringToRoute(key);
    const tabLists = updateTreeList(routeMap);
    
    if (tabListArr.includes(splitKey)) {
      setActiveKey(key);
    }
    tabLists.map((v) => {
      if (v.key === splitKey) {
        if (tabList.length === 0) {
          v.closable = false;
          setTabList([...tabList, v]);
        } else {
          if (!tabKeyList.includes(key)) {
            const { closable, component, locale, tab, exact, path } = v;
            setTabList([...tabList, { closable, component, key, locale, tab, exact, path }]);
            setTabKeyList([...tabKeyList, key]);
          }
        }
      }
    });
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

  const changeActiveKey = (activeKey) => {
    setActiveKey(activeKey);
    history.push(activeKey);
  }

  type ActionType = "add" | "remove"
  // @ts-ignore
  type TargetKey = string | MouseEvent<HTMLElement, MouseEvent>;

  const onEdit = (targetKey: TargetKey, action: ActionType) => {
    // debugger;
    // return this[action](targetKey);
    if(action === 'remove') {
      remove(targetKey)
    }
  }

  const remove = (targetKey) => {
    console.log(activeKey);
    let lastIndex;
    tabList.forEach((tabItem, index) => {
      if(tabItem.key === targetKey) {
        lastIndex = index - 1;
      }
    })
    const tabTempList:any = [];
    const tabTempKeyList:any = [];
    tabList.map(tabItem => {
      if(tabItem.key !== targetKey) {
        tabTempList.push(tabItem);
        tabTempKeyList.push(tabItem.key);
      }
    })
    if (lastIndex >= 0 && activeKey === targetKey) {
      setActiveKey(tabList[lastIndex].key);
    }
    history.push(activeKey);
    setTabList(tabTempList);
    setTabKeyList(tabTempKeyList);
    setActiveKey(activeKey);
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
                <img className={styles.image} src={DefaultSettings.logo} alt="logo" />
                <span className={styles.title}>{DefaultSettings.title}</span>
              </Link>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[activeKey]} onClick={handelClickMenu}>
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
            {tabList && tabList.length ? (
              <Tabs
                type="editable-card"
                onChange={changeActiveKey}
                activeKey={activeKey}
                tabBarStyle={{ background: '#fff' }}
                tabPosition="top"
                hideAdd
                tabBarGutter={-1}
                onEdit={onEdit}>
                {tabList.map(tabItem => (
                  <TabPane tab={tabItem.tab} key={tabItem.key} closable={tabItem.closable}>
                  </TabPane>
                ))}
              </Tabs>
            ) : null}
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

export default BasicLayout;