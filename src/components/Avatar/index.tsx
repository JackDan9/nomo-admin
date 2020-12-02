import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Dropdown, Avatar } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import UserStore from '@/store/user'
import styles from './index.less'

const AvatarMenu: React.FC = () => {
  const history = useHistory()

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'mine':
        break
      case 'setting':
        break
      case 'logout':
        UserStore.setToken('')
        UserStore.setUserInfo({ permission: [] })
        history.replace('/user/login')
        break
    }
  }

  const getMenuList = () => (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="mine">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="setting">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={getMenuList}>
      <div className={styles.headerBarAvatar}>
        <Avatar src={UserStore.userInfo.avatar} />
        <div className={styles.username}>{UserStore.userInfo.username}</div>
      </div>
    </Dropdown>
  )
}

export default AvatarMenu;