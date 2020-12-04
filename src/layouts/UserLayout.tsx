/**
 * Copyrigt 2020, Lamuda Inc.
 */
import React from 'react';
import UserRouter from '../router/UserRouter';

import DefaultSettings from '@/config/defaultSettings';
import styles from "./UserLayout.less";


const UserLayout: React.FC = () => {
  return (
    <div className={styles.userLayout}>
      <div className={styles.userLayoutMain}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={DefaultSettings.logo} alt="" />
          </div>
          <div className={styles.login}>
            <UserRouter />
          </div>
          <div className={styles.switchLang}>
            <span className={styles.chinese}>简体中文</span> 
            <span className={styles.line}>|</span>
            <span className={styles.english}>English</span>
          </div>
        </div>
        <div className={styles.right} style={{ background: `url(${DefaultSettings.userLayoutBg}) no-repeat fixed center` }}>
        </div>
      </div>
    </div>
  )
}

export default UserLayout;