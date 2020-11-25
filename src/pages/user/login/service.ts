// 登录
// import $request from '@/utils/request';

const login = async (params: { username: string; password: string; }) => {
  const res = await $request.post('http://c.bu86.com/api/user/token', params)
  return {
    token: res.token
  }
}

export default {
  login
}