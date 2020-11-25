/**
 * Request
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { notification } from 'antd';
import config from '@/config/global';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// const service = axios.create({
//   baseURL: config.domain,
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000
// })

export class HttpRequest {
  private baseConfig: AxiosRequestConfig = {
    baseURL: config.domain,
    headers: {},
    // withCredentials: true,
    timeout: 8000,
  }

  private instance: AxiosInstance = axios.create(
    this.baseConfig
  )

  constructor() {
    this.setRequestInterceptors()
    this.setResponseInterceptors()
  }

  setHeader = (headers: any) => {
    this.baseConfig.headers = { ...this.baseConfig.headers, ...headers }
    this.instance = axios.create(this.baseConfig);
    this.setRequestInterceptors()
    this.setResponseInterceptors()
  }

  // get请求
  public get = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
    this.instance({
      ...{ url, method: 'get', params: data },
      ...config
    })

  // post请求
  public post = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
    this.instance({
      ...{ url, method: 'post', data },
      ...config
    })

  // 不经过统一的axios实例的get请求
  public postOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
    axios({
      ...this.baseConfig,
      ...{ url, method: 'post', data },
      ...config
    })

  // 不经过统一的axios实例的post请求
  public getOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
    axios({
      ...this.baseConfig,
      ...{ url, method: 'get', params: data },
      ...config
    })

  // delete请求,后端通过requestBody接收
  public deleteBody = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
    this.instance({
      ...{ url, method: 'delete', data },
      ...config
    })

  // delete请求,后端通过后端通过requestParam接收
  public deleteParam = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
    this.instance({
      ...{ url, method: 'delete', params: data },
      ...config
    })

  // 请求拦截器 | Request Interceptors
  private setRequestInterceptors = () => {
    this.instance.interceptors.request.use(
      (config) => {
        return config
      }, (err) => {
        notification.error({
          message: '请求失败',
          description: err
        });
        return Promise.reject(err);
      }
    )
  }

  // 响应拦截器 | Response Interceptors
  private setResponseInterceptors = () => {
    this.instance.interceptors.response.use(
      (response) => {
        const { code, result, msg } = response.data
        if (code === 0) {
          return result;
        } else {
          notification.error({
            message: `请求错误 ${code}`,
            description: msg
          })
          return Promise.reject(response);
        }
      }, (err) => {
        notification.error({
          message: `服务器响应失败`,
          description: err
        });
        return Promise.reject(err);
      }
    )
  }
}

export default new HttpRequest();