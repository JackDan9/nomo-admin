import { observable, action } from 'mobx';
import { UserInfo } from '@/store/model/user-info';

class User {
  // token
  @observable token: string = sessionStorage.getItem('token') || '';
  // user-info || 用户信息
  @observable userInfo: UserInfo = {
    permission: []
  }

  @action
  public setToken(value: string) {
    this.token = value;
    sessionStorage.setItem('token', value);
  }

  @action
  public setUserInfo(value: UserInfo) {
    this.userInfo = value;
  }
}

export default new User();
