/**
 * 用户信息API接口获取
 */
import request from "@/utils/request";

const ACCOUNT_API = {
  getUserList(params): Promise<any> {
    return request.post('/getUserList', params);
  }
}

export default ACCOUNT_API;