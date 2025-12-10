/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 轮播列表 GET /banners */
export function bannersUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.BannersUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.BannersUsingGetResponse>('/banners', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建轮播 POST /banners */
export function bannersUsingPost({
  body,
  options,
}: {
  body: API.BannersUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<API.BannersUsingPostResponse>('/banners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除轮播 DELETE /banners/${param0} */
export function bannersIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.BannersIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.BannersIdUsingDeleteResponse>(`/banners/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新轮播 PATCH /banners/${param0} */
export function bannersIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.BannersIdUsingPatchParams;
  body: API.BannersIdUsingPatchBody;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.BannersIdUsingPatchResponse>(`/banners/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 轮播活动列表 GET /banners/active */
export function bannersActiveUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.BannersActiveUsingGetResponse>('/banners/active', {
    method: 'GET',
    ...(options || {}),
  });
}
