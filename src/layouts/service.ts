import { UserInfo } from '@/store/model/user-info'
// 获取当前登录用户的信息
const getUserInfo = (params: {token?: string}): Promise<UserInfo> => {
  $request.setHeader({
    "Authorization": "Bearer" + params["token"]
  })
  return $request.get('/getUserInfo', params);
}
export default {
  getUserInfo
}