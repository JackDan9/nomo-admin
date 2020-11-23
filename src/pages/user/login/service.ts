// 登录
// import $request from '@/utils/request';

const login = async (params: { username: string; password: string; }) => {
  const res = await $request.post('/login', { params, responseType: 'json' })
  
  return {
    token: res.token
  }
}

export default {
  login
}