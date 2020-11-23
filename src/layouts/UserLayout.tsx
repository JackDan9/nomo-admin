/**
 * Copyrigt 2020, Lamuda Inc.
 */
import React from 'react';
import UserRouter from '../router/UserRouter';

// import styles from './UserLayout.less';
// const styles = require('./UserLayout.less');
import "./UserLayout.less";
// import style from './UserLayout.less';
import logoSvg from '@/assets/images/logo.svg';


const UserLayout: React.FC = () => {
  return (
    <div className="container">
      <div className="main">
        <div className="left">
          <div className="logo">
            <img src={logoSvg} alt="" />
          </div>
          <div className="login">
            <UserRouter />
          </div>
          <div className="switchLang">
            <span className="chinese">简体中文</span> 
            <span className="line">|</span>
            <span className="english">English</span>
          </div>
        </div>
        <div className="right">
        </div>
      </div>
    </div>
  )
}

export default UserLayout;