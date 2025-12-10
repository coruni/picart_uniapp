import type { CustomRequestOptions } from '@/http/types'
import { http as alovaHttp } from './alova'

/*
 * openapi-ts-request 工具的 request 跨客户端适配方法
 */
export default function request<T extends { data?: any }>(
  url: string,
  options: Omit<CustomRequestOptions, 'url'> & {
    params?: Record<string, unknown>
    headers?: Record<string, unknown>
  },
) {
  // 使用 alova 的方法，支持 PATCH 等所有 HTTP 方法
  const method = options.method?.toUpperCase() || 'GET'

  // 准备请求配置
  const requestConfig: any = {
    url,
    method,
    params: options.params || options.query,
    headers: options.headers || options.header,
    data: options.data,
  }

  // 根据请求方法调用相应的 alova 方法
  switch (method) {
    case 'GET':
      return alovaHttp.Get<T['data']>(requestConfig.url, { params: requestConfig.params })
    case 'POST':
      return alovaHttp.Post<T['data']>(requestConfig.url, requestConfig.data, { params: requestConfig.params })
    case 'PUT':
      return alovaHttp.Put<T['data']>(requestConfig.url, requestConfig.data, { params: requestConfig.params })
    case 'DELETE':
      return alovaHttp.Delete<T['data']>(requestConfig.url, { params: requestConfig.params })
    case 'PATCH':
      return alovaHttp.Patch<T['data']>(requestConfig.url, requestConfig.data, { params: requestConfig.params })
    default:
      // 对于其他方法，使用 alova 的通用请求方式
      return alovaHttp.Request<T['data']>(requestConfig)
  }
}
