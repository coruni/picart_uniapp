/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取所有标签 GET /tag */
export function tagUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TagUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.TagUsingGetResponse>('/tag', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // limit has a default value: 10
      limit: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建标签 POST /tag */
export function tagUsingPost({
  body,
  options,
}: {
  body: API.CreateTagDto;
  options?: CustomRequestOptions_;
}) {
  return request<API.TagUsingPostResponse>('/tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取标签详情 GET /tag/${param0} */
export function tagIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TagIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.TagIdUsingGetResponse>(`/tag/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除标签 DELETE /tag/${param0} */
export function tagIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TagIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/tag/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新标签 PATCH /tag/${param0} */
export function tagIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TagIdUsingPatchParams;
  body: API.UpdateTagDto;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/tag/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 关注标签 POST /tag/${param0}/follow */
export function tagIdFollowUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TagIdFollowUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/tag/${param0}/follow`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消关注标签 DELETE /tag/${param0}/follow */
export function tagIdFollowUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TagIdFollowUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/tag/${param0}/follow`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
