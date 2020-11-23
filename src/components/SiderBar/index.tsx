import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import CommonRoute from '@/router/BasicRouter/CommonRoute';
import SvgIcon from '@/components/Base/SvgIcon';
import logo from '@/assets/images/logo.svg';
import NavLink from '@/components/NavLink';
import './index.less';

interface SiderBarProps {
  routeMap: CommonRoute[]
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

  // 当前激活的菜单
  const [activeMenu, setActiveMenu] = useState('/dashboard')

  useEffect(() => {
    setActiveMenu(location.pathname)
  }, [])

  const handelClickMenu = (e) => {
    setActiveMenu(e.key)
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
      <div className="side-bar">
        <div className="side-bar-logo">
          <Link to="/dashboard">
            <img className="image" src={logo} alt="" />
            <span className="title">Lamuda</span>
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

