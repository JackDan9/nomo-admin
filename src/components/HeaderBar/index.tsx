import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from '@/components/Avatar';
import './index.less';

interface HeaderBarProps {
  collapse: boolean
  onTrigger: () => void
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const { collapse, onTrigger } = props;

  return (
    <div className="header-bar">
      {collapse ? (
        <MenuUnfoldOutlined className="header-bar-trigger" onClick={onTrigger} />
      ) : (
        <MenuUnfoldOutlined className="header-bar-trigger" onClick={onTrigger} />
      )}

      <div>
        <Avatar />
      </div>
    </div>
  )
}

export default HeaderBar;