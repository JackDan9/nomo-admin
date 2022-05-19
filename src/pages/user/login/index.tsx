import React from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, SettingOutlined, SnippetsOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { UserInfo } from '@/store/model/user-info'
import userStore from '@/store/user';

import DefaultSettings from '@/config/defaultSettings';
import styles from './index.less';
import service from './service';

const Login: React.FC = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    const data = await service.login(values);

    const token = data.token;
    userStore.setToken(token);
    console.log("userStore.token: ",userStore.token);
    if(userStore.token) {
      history.replace('/dashboard');
    } else {
      history.replace('/user/login');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginName}>
        <div className={styles.loginNameZh}>{DefaultSettings.chineseName}</div>
        {/* <div className={styles.loginNameEn}>管理员</div> */}
      </div>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {/* <Form.Item
          name="usernumber"
          rules={[{ required: true, message: '请输入学号!' }]}
        >
          <Input className={styles.siteFormItemInput} prefix={<SettingOutlined className={styles.siteFormItemIcon} />} placeholder="请输入学号" />
        </Form.Item> */}
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input className={styles.siteFormItemInput} prefix={<UserOutlined className={styles.siteFormItemIcon} />} placeholder="请输入用户名" />
        </Form.Item>
        {/* <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入邮箱!' }]}
        >
          <Input className={styles.siteFormItemInput} prefix={<SnippetsOutlined className={styles.siteFormItemIcon} />} placeholder="请输入邮箱" />
        </Form.Item> */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            className={styles.siteFormItemInput}
            prefix={<LockOutlined className={styles.siteFormItemIcon} />}
            type="password"
            placeholder="请输入新密码"
          />
        </Form.Item>
        {/* <Form.Item
          name="password"
          rules={[{ required: true, message: '请再次确认密码!' }]}
        >
          <Input
            className={styles.siteFormItemInput}
            prefix={<MenuUnfoldOutlined className={styles.siteFormItemIcon} />}
            type="password"
            placeholder="再次确认新密码"
          />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginFromButton}>
            登录
          </Button>
        </Form.Item>

        <Form.Item className={styles.topLine}>
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item> */}
          {/* <a className={styles.register} href="/user/register">
            立即登录
          </a> */}

          {/* <a className={styles.loginFromForgot} href="">
            忘记密码 ?
          </a> */}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;