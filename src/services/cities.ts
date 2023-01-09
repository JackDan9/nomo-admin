/**
 * 经济新闻API接口服务
 */
 import request from "@/utils/request";

 const Cities_API = {
   /**
    * 获取新闻列表接口
    * 
    * @param params 
    * @returns 
    */
   getCitiesList(params): Promise<any> {
     return request.post(`/getCitiesList`, params);
   },
   /**
    * 创建和保存新闻信息
    * 
    * @param params 
    * @returns 
    */
   saveOrUpdateCities(params): Promise<any> {
     return request.post(`saveOrUpdateCities`, params);
   },
   /**
    * 更新新闻信息
    * 
    * @param params 
    * @returns 
    */
   editCities(params): Promise<any> {
     return request.post(`/editCities`, params);
   },
   /**
    * 删除新闻信息
    * 
    * @param params 
    * @returns 
    */
   deleteCities(params): Promise<any> {
     return request.deleteBody(`deleteCities`, params);
   },
   /**
    * 获取新闻详情列表接口
    * 
    * @param params 
    * @returns 
    */
   getCitiesDetailsList(params): Promise<any> {
     return request.post(`/getCitiesDetailsList`, params);
   },
   /**
    * 
    * @param params 城市中文名称
    * @returns 
    */
   getCityByLocationName(params): Promise<any> {
    return request.post(`/getCityByLocationName`, params);
   }
 }
 
 export default Cities_API;