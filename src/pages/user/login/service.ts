// 登录
// import $request from '@/utils/request';

const login = async (params: { username: string; password: string; }) => {
  const res = await $request.post('/user/token', params)
  return res
}

export default {
  login
}