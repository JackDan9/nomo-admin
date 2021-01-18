import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Layout, BackTop, Menu, Tabs, Button } from 'antd';
import useAntdMediaQuery from 'use-media-antd-query';
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
  const [mobileCollapse, setMobileCollapse] = useState(true)
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

  const colSize = useAntdMediaQuery();
  const isMobile = (colSize === 'sm' || colSize === 'xs')


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
      if (location.pathname !== '/dashboard') {
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
    if (v.key) {
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

  /**
   * @description 移动端切换菜单折叠状态
   */
  const triggerMobileCollapse = () => {
    setMobileCollapse((state) => !state)
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
  const StringToRoute = (v) => {
    const str = /\/:(.+)/g
    const key = v.replace(str, (_, g) => '')
    const keyArr = key.split('/')
    if (keyArr.length === 2) {
      const keyString = [keyArr[0], keyArr[1]];
      return (keyString.toString()).replace(/,/g, '/')
    } else {
      const keyString = [keyArr[0], keyArr[1], keyArr[2]]
      return (keyString.toString()).replace(/,/g, '/')
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
    if (action === 'remove') {
      remove(targetKey)
    }
  }

  const remove = (targetKey) => {
    let tempActiveKey: any = activeKey;
    let lastIndex;
    tabList.forEach((tabItem, index) => {
      if (tabItem.key === targetKey) {
        lastIndex = index - 1;
      }
    })
    const tabTempList: any = [];
    const tabTempKeyList: any = [];
    tabList.map(tabItem => {
      if (tabItem.key !== targetKey) {
        tabTempList.push(tabItem);
        tabTempKeyList.push(tabItem.key);
      }
    })
    if (lastIndex >= 0 && activeKey === targetKey) {
      tempActiveKey = tabList[lastIndex].key;
    }
    history.push(tempActiveKey);
    setTabList(tabTempList);
    setTabKeyList(tabTempKeyList);
    setActiveKey(tempActiveKey);
  }

  return (
    <Layout className={styles.basicLayout}>
      {isMobile ?
        (
          <div style={mobileCollapse ? {
            position: 'fixed',
            width: '0',
            overflow: 'hidden',
            flex: '0 0 0',
            maxWidth: '0',
            minWidth: '0',
            transition: 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
          } : {
              position: 'fixed',
              width: '210px',
              overflow: 'hidden',
              flex: '0 0 210px',
              maxWidth: '210px',
              minWidth: '210px',
              transition: 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
            }}>
          </div>
        ) : (
          <div style={collapse ?
            {
              width: '80px',
              overflow: 'hidden',
              flex: '0 0 80px',
              maxWidth: '80px',
              minWidth: '80px',
              transition: 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
            } : {
              width: '210px',
              overflow: 'hidden',
              flex: '0 0 210px',
              maxWidth: '210px',
              minWidth: '210px',
              transition: 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
            }}></div>
        )
      }

      {isMobile ?
        (
          <div>
            <div className={styles.mobileDrawer} style={!mobileCollapse ? { padding: '0px', height: '100vh', width: '100%', transition: 'transform .3s cubic-bezier(.7,.3,.1,1)' } : {padding: '0px', height: '100vh'}}>
              <div className={styles.mobileMask} style={!mobileCollapse ? { height: '100%', opacity: 1, transition: 'none', animation: 'antdDrawerFadeIn .3s cubic-bezier(.7,.3,.1,1)', pointerEvents: 'auto' } : {height: 0}} onClick={triggerMobileCollapse}></div>
              <div className={styles.mobileWrapper} style={!mobileCollapse ? {width: '210px'} : {width: '210px', transform: 'translateX(-100%)'}}>
                <div className={styles.mobileContent}>
                  <div className={styles.mobileBody}>
                    <div className={styles.mobileDrawerBody} style={{height: '100vh', padding: '0px', display: 'flex', flexDirection: 'row'}}>
                      <Layout.Sider
                        className={styles.siderFixed}
                        width={mobileCollapse ? 0 : 210}
                        trigger={null}
                        collapsible={true}
                        collapsed={collapse}
                      >
                        {/* <SiderBar routeMap={routeMap} /> */}
                        <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
                          <div className={styles.siderBar}>
                            <div className={styles.siderBarLogo} style={collapse ? { 'padding': '16px 24px' } : { 'padding': '16px' }}>
                              <Link to="/dashboard">
                                <img src={DefaultSettings.logo} alt="logo" />
                                {
                                  !collapse ? (
                                    <h1>{DefaultSettings.title}</h1>
                                  ) : null
                                }
                              </Link>
                            </div>
                            <div className={styles.siderMenu}>
                              <Menu theme="dark" mode="inline" selectedKeys={[activeKey]} onClick={handelClickMenu}>
                                {routeMap.map((route) => getMenuItem(route))}
                              </Menu>
                            </div>
                            <div className={styles.siderBarFooter}>
                              <Menu theme="dark" mode="inline" onClick={triggerCollapse}>
                                <Menu.Item style={{ backgroundColor: '#001529' }}>
                                  {
                                    collapse ? (
                                      <MenuFoldOutlined className={styles.headerBarTrigger} />
                                    ) : (
                                        <MenuUnfoldOutlined className={styles.headerBarTrigger} />
                                      )
                                  }
                                </Menu.Item>
                              </Menu>
                            </div>
                          </div>
                        </Scrollbars>
                      </Layout.Sider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Layout.Sider
            className={styles.siderFixed}
            width={collapse ? 80 : 210}
            trigger={null}
            collapsible={true}
            collapsed={collapse}
          >
            {/* <SiderBar routeMap={routeMap} /> */}
            <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
              <div className={styles.siderBar}>
                <div className={styles.siderBarLogo} style={collapse ? { 'padding': '16px 24px' } : { 'padding': '16px' }}>
                  <Link to="/dashboard">
                    <img src={DefaultSettings.logo} alt="logo" />
                    {
                      !collapse ? (
                        <h1>{DefaultSettings.title}</h1>
                      ) : null
                    }

                  </Link>
                </div>
                <div className={styles.siderMenu}>
                  <Menu theme="dark" mode="inline" selectedKeys={[activeKey]} onClick={handelClickMenu}>
                    {routeMap.map((route) => getMenuItem(route))}
                  </Menu>
                </div>
                <div className={styles.siderBarFooter}>
                  <Menu theme="dark" mode="inline" onClick={triggerCollapse}>
                    <Menu.Item style={{ backgroundColor: '#001529' }}>
                      {
                        collapse ? (
                          <MenuFoldOutlined className={styles.headerBarTrigger} />
                        ) : (
                            <MenuUnfoldOutlined className={styles.headerBarTrigger} />
                          )
                      }
                    </Menu.Item>
                  </Menu>
                </div>
              </div>
            </Scrollbars>
          </Layout.Sider>
        )
      }

      <Layout id="layoutMain" className={styles.container} style={{ position: 'relative' }}>
        {/* <HeaderBar collapse={collapse} onTrigger={triggerCollapse} hideTabs={hideTabs} routeMap={routeMap} /> */}
        <div className={styles.header}>
          <div className={styles.headerBar}>
            {isMobile ? (
                <span className={styles.mobileLogo}>
                  <Link to="/dashboard">
                    <img src={DefaultSettings.logo} alt="logo" />
                  </Link>
                </span>
            ): null}
            {isMobile ? (
              <span className={styles.mobileButton} onClick={triggerMobileCollapse}>
                <span className={styles.mobileTrigger}>
                {mobileCollapse ? (
                  <MenuFoldOutlined className={styles.headerBarTrigger} />
                  ) : (
                    <MenuUnfoldOutlined className={styles.headerBarTrigger} />
                  )
                }
                </span>
              </span>
            ):null}
            <div style={{ flex: '1 1 0%' }}></div>
            <div className={styles.headerBarRight}>
              <Avatar />
            </div>
          </div>
          <Content className={styles.headerContent} style={contentStyle}>
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

        <footer className={styles.footer}>
          <footer className={styles.footerMain}>
            <div className={styles.footerCopyright}>
              Copyright
              <span role="img" aria-label="copyright" className={styles.footerCopyrightIcon}><svg viewBox="64 64 896 896" focusable="false" data-icon="copyright" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"></path></svg></span>
              2021
            </div>
          </footer>
        </footer>
        
        {isMobile ? null: (
            <BackTop
              style={{ right: '50px' }}
              // target={() => document.getElementById("layoutMain")}
              visibilityHeight={600}
            />
          )
        }
      </Layout>
    </Layout>
  )
}

export default BasicLayout;