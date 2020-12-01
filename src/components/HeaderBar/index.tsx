import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from '@/components/Avatar';
import styles from './index.less';

interface HeaderBarProps {
  collapse: boolean
  onTrigger: () => void
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
  const { collapse, onTrigger } = props;

  return (
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
  )
}

export default HeaderBar;