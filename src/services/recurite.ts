/**
 * 招聘信息API接口服务
 */
import request from "@/utils/request";

const RECURITE_API = {
  /**
   * 获取招聘列表接口
   * 
   * @param params 
   * @returns 
   */
  getRecuriteList(params): Promise<any> {
    return request.post(`/getRecuriteList`, params);
  },
  /**
   * 创建和保存招聘信息
   * 
   * @param params 
   * @returns 
   */
  saveOrUpdateRecurite(params): Promise<any> {
    return request.post(`saveOrUpdateRecurite`, params)
  },
  /**
   * 更新招聘信息
   * 
   * @param params 
   * @returns 
   */
  editRecurite(params): Promise<any> {
    return request.post(`editRecurite`, params);
  },
  /**
   * 删除招聘信息
   * 
   * @param params 
   * @returns 
   */
  deleteRecurite(params): Promise<any> {
    return request.deleteBody(`deleteRecurite`, params);
  },
  /**
   * 获取招聘信息详情列表
   * 
   * @param params 
   * @returns 
   */
  getRecuriteDetailsList(params): Promise<any> {
    return request.post(`/getRecuriteDetailsList`, params)
  },
  saveOrUpdateRecuriteDetails(params): Promise<any> {
    return request.post(`saveOrUpdateRecuriteDetails`, params)
  },
  editRecuriteDetails(params): Promise<any> {
    return request.post(`/editRecuriteDetails`, params);
  },
  deleteRecuriteDetails(params): Promise<any> {
    return request.deleteBody(`deleteRecuriteDetails`, params);
  },
}

export default RECURITE_API;