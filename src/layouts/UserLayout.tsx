/**
 * Copyrigt 2020, Lamuda Inc.
 */
import React from 'react';
import UserRouter from '../router/UserRouter';

// import styles from './UserLayout.less';
// const styles = require('./UserLayout.less');
import styles from "./UserLayout.less";
// import style from './UserLayout.less';
import logoSvg from '@/assets/images/logo.svg';


const UserLayout: React.FC = () => {
  return (
    <div className={styles.userLayout}>
      <div className={styles.userLayoutMain}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={logoSvg} alt="" />
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
        <div className={styles.right}>
        </div>
      </div>
    </div>
  )
}

export default UserLayout;