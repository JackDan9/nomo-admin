import Mock from 'mockjs'

import account from './modules/account'
import base from './modules/base'
import user from './modules/user'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// 延时数据返回,模拟loading效果
Mock.setup({
  timeout: '300-800'
})

Mock.mock(/login/, 'post', user.login)
Mock.mock(/userInfo/, 'get', user.getUserInfo)

Mock.mock(/\/base/, 'get', base.getBase)

Mock.mock(/\/account\/list/, 'post', account.getList)
Mock.mock(/\/account\/detail/, 'post', account.getDetail)
Mock.mock(/\/account\/update/, 'post', account.update)
Mock.mock(/\/account\/delete/, 'post', account.remove)