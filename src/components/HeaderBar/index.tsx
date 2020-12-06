import React, { useEffect, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import { Route } from 'react-router-dom';

import Tab from '@/store/tab';
import Avatar from '@/components/Avatar';
import styles from './index.less';

interface HeaderBarProps {
  collapse: boolean,
  onTrigger: () => void,
  hideTabs: boolean,
  routeMap: any,
}

interface tabList {
  tab: any,
  key: string,
  locale: any,
  closable: boolean,
  component: any
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const { collapse, onTrigger, hideTabs, routeMap } = props;
  const { Content } = Layout;
  const { TabPane } = Tabs;

  const contentStyle = { paddingTop: 0 };

  const [activeKey, setActiveKey] = useState(Tab.splitKey);

  const changeActiveKey = (activeKey) => {
    Tab.setRouterKey(activeKey);
  }
  type ActionType = "add" | "remove"
  // @ts-ignore
  type TargetKey = string | MouseEvent<HTMLElement, MouseEvent>;

  const onEdit = (targetKey: TargetKey, action: ActionType) => {

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
        {Tab.tabList && Tab.tabList ? (
          <Tabs
            type="editable-card"
            onChange={changeActiveKey}
            activeKey={Tab.splitKey}
            onEdit={onEdit}
            tabBarStyle={{ background: '#fff' }}
            tabPosition="top"
            tabBarGutter={-1}>
            {Tab.tabList.map(item => (<TabPane tab={item.tab} key={item.key} closable={item.closable} style={{marginLeft: '2px'}}>
                {/* <Route key={item.key} path={item.key} component={item.component} exact={item.exact} /> */}
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