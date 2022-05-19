/**
 * @Description 用户登录token信息和用户信息
 * @Author JackDan
 * @Date 2022-05-19
 */
import { observable, action } from 'mobx';
import { UserInfo } from '@/store/model/user-info';
import Cookie from 'js-cookie';

class User {
  // token
  @observable token: string = sessionStorage.getItem('token') || '';
  // user-info || 用户信息
  @observable userInfo: UserInfo = JSON.parse(sessionStorage.getItem('userinfo') || '{"permission": []}') 

  @action
  public setToken(value: string) {
    this.token = value;
    sessionStorage.setItem('token', value);
  }

  @action
  public setUserInfo(value: UserInfo) {
    this.userInfo = value;
    sessionStorage.setItem('userinfo', JSON.stringify(value));
  }
}

export default new User();
