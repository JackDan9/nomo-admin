import React from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserInfo } from '@/store/model/user-info'
import request from '@/utils/request';
import userStore from '@/store/user';

import './index.less';
import service from './service';

const Login: React.FC = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    const data = await service.login(values);

    const token = data.token;
    request.setHeader({ Authorization: token });
    userStore.setToken(token);
    
    const userInfo: UserInfo = {
      companyid: data.companyid,
      nickname: data.nickname,
      openid: data.openid,
      uid: data.uid,
      username: data.username,
      permission: [
        {
          id: 1,
          name: 'dashboard',
          description: '首页',
          reminder: '您没有权限访问首页'
        },
        {
          id: 2,
          name: 'chart'
        },
        {
          id: 3,
          name: 'article'
        },
        {
          id: 4,
          name: 'blank'
        },
        {
          id: 5,
          name: 'form'
        },
        {
          id: 6,
          name: 'account'
        }
      ]
    }

    if (data['roleid'] > 3) {
      userInfo.permission = [
        {
          id: 1,
          name: 'dashboard',
          description: '首页',
          reminder: '您没有权限访问首页'
        }
      ]
    }
    userStore.setUserInfo(userInfo);
    history.replace('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-name">
        <div className="login-name-zh">拉姆达</div>
        <div className="login-name-en">Lamuda</div>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>

        <Form.Item className="top-line">
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item> */}

          <a className="login-form-forgot" href="">
            忘记密码 ?
          </a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;