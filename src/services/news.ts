/**
 * 经济新闻API接口服务
 */
import request from "@/utils/request";

const NEWS_API = {
  /**
   * 获取新闻列表接口
   * 
   * @param params 
   * @returns 
   */
  getNewsList(params): Promise<any> {
    return request.post(`/getNewsList`, params);
  },
  /**
   * 创建和保存新闻信息
   * 
   * @param params 
   * @returns 
   */
  saveOrUpdateNews(params): Promise<any> {
    return request.post(`saveOrUpdateNews`, params);
  },
  /**
   * 更新新闻信息
   * 
   * @param params 
   * @returns 
   */
  editNews(params): Promise<any> {
    return request.post(`editNews`, params);
  },
  /**
   * 删除新闻信息
   * 
   * @param params 
   * @returns 
   */
  deleteNews(params): Promise<any> {
    return request.deleteBody(`deleteNews`, params);
  },
  /**
   * 获取新闻详情列表接口
   * 
   * @param params 
   * @returns 
   */
  getNewsDetailsList(params): Promise<any> {
    return request.post(`/getNewsDetailsList`, params);
  },
}

export default NEWS_API;