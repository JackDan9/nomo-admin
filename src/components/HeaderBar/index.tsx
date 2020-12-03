import React, { useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import { Route } from 'react-router-dom';
import Avatar from '@/components/Avatar';
import styles from './index.less';

interface HeaderBarProps {
  collapse: boolean,
  onTrigger: () => void,
  hideTabs: boolean,
  routeMap: any,
}

interface tabList {
  closable: boolean,
  key: string,
  component: any,
  locale: any,
  tab: any
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const { collapse, onTrigger, hideTabs, routeMap } = props;
  const { Content } = Layout;
  const { TabPane } = Tabs;

  const contentStyle = { paddingTop: 0 };

  const updateTree = (data) => {
    const treeData = data;
    const treeList:tabList[] = [];

    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        treeList.push({
          tab: node.name,
          key: node.path,
          locale: node.locale,
          closable: true,
          component: node.component
        })

        if(node.routes && node.routes.length !== 0) {
          getTreeList(node.routes);
        }
      });
    };

    getTreeList(treeData);
    return treeList;
  }

  const tabLists = updateTree(routeMap);
  const routeKey = '/dashboard';
  const tabName = '首页';

  const tabList:tabList[] = [];
  const tabListArr:tabList[] = [];

  tabLists.map((tabItem) => {
    if(tabItem.key === routeKey) {
      if(tabList.length === 0) {
        tabItem.closable = false;
        tabItem.tab = tabName;
        tabList.push(tabItem);
      }
    }

    if(tabItem.key) {
      tabListArr.push(tabItem);
    }
  })

  const [activeKey, setActiveKey] = useState(routeKey);

  const changeActiveKey = (activeKey) => {
    setActiveKey(activeKey);
  }

  type ActionType = "add" | "remove"
  // @ts-ignore
  type TargetKey = string | MouseEvent<HTMLElement, MouseEvent>;

  const onEdit = (targetKey: TargetKey, action: ActionType) => {
    // this[action][targetKey]
    // console.log(targetKey);
    // console.log(action);
  }

  return (
    <div>
      <div className={styles.headerBar}>
        {collapse ? (
          <MenuUnfoldOutlined className={styles.headerBarTrigger} onClick={onTrigger} />
        ) : (
            <MenuUnfoldOutlined className={styles.headerBarTrigger} onClick={onTrigger} />
          )}
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
            onEdit={onEdit}
            tabBarStyle={{ background: '#fff' }}
            tabPosition="top"
            tabBarGutter={-1}>
            {tabList.map(item => (
              <TabPane tab={item.tab} key={item.key} closable={item.closable}>
                {/* <Route key={item.key} path={item.path} component={item.content} exact={item.exact} /> */}
                {/* { item.content } */}
              </TabPane>
            ))}
          </Tabs>
        ) : null}
      </Content>
    </div>
  )
}

export default HeaderBar;