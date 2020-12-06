import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import Tab from '@/store/tab';
import CommonRoute from '@/router/BasicRouter/CommonRoute';
import SvgIcon from '@/components/Base/SvgIcon';
import logo from '@/assets/images/logo.svg';
import NavLink from '@/components/NavLink';

import styles from './index.less';

interface SiderBarProps {
  routeMap: CommonRoute[]
}

interface tabList {
  tab: any,
  key: string,
  locale: any,
  closable: boolean,
  component: any
}

/**
 * 侧边菜单
 */
const renderThumb = (props: any) => {
  const { style, ...rest } = props

  const thumbStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: '3px',
    cursor: 'pointer'
  }

  return <div style={{ ...style, ...thumbStyle }} {...rest} />
}

const SiderBar: React.FC<SiderBarProps> = ({ routeMap }) => {
  const location = useLocation()
  const history = useHistory();

  const routeKey = '/dashboard';
  // 当前激活的菜单
  const [activeMenu, setActiveMenu] = useState(routeKey)

  useEffect(() => {
    if(location.pathname !== '/dashboard') {
      setActiveMenu('/dashboard');
      history.push('/dashboard');
    } else {
      setActiveMenu(location.pathname)
    }
  }, [])

  const updateTree = (data) => {
    const treeData = data;
    const treeList: tabList[] = [];

    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        treeList.push({
          tab: node.title,
          key: node.path,
          locale: node.locale,
          closable: true,
          component: node.component
        })

        if (node.routes && node.routes.length !== 0) {
          getTreeList(node.routes);
        }
      });
    };

    getTreeList(treeData);
    return treeList;
  }

  const tabLists = updateTree(routeMap);
  const tabName = '首页';
  const tabList = Tab.tabList;
  const tabListArr:any = Tab.tabListArr;
  
  tabLists.map((tabItem) => {
    if(tabItem.key === routeKey) {
      if(tabList.length === 0) {
        tabItem.closable = false;
        tabItem.tab = tabName;
        Tab.setSplitKey(tabItem.key)
        Tab.setTabList([...tabList, tabItem]);
      }
    }

    if(tabItem.key && !tabListArr.includes(tabItem.key)) {
      Tab.setTabListArr([...tabListArr, tabItem.key]);
    }
  })


  const [tabListKey, setTabListKey] = useState([routeKey]);
  const handelClickMenu = (e) => {
    const { key } = e;
    const tabList = Tab.tabList;
    const tabListArr = Tab.tabListArr;
    Tab.setSplitKey(key);
    tabLists.map((tabItem) => {
      if (tabItem.key === key) {
        if (tabList.length === 0) {
          tabItem.closable = false;
          Tab.setTabList([...tabList, tabItem])
        } else {
          if (!tabListKey.includes(key)) {
            const { closable, component, locale, tab } = tabItem;
            Tab.setTabList([...tabList, { closable, component, key: e.key, locale, tab }])
            setTabListKey((tabListKey) => [...tabListKey, key]);
          }
        }
      }
    })

    if (tabListArr.includes(key)) {
      setActiveMenu(key)
    }
  }

  // 根据路由配置生成菜单
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
    <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
      <div className={styles.siderBar}>
        <div className={styles.siderBarLogo}>
          <Link to="/dashboard">
            <img className={styles.image} src={logo} alt="" />
            <span className={styles.title}>Lamuda</span>
          </Link>
        </div>

        <Menu theme="dark" mode="inline" selectedKeys={[activeMenu]} onClick={handelClickMenu}>
          {routeMap.map((route) => getMenuItem(route))}
        </Menu>
      </div>
    </Scrollbars>
  )
}

export default SiderBar;