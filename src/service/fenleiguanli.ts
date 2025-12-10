/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取所有分类 GET /category */
export function categoryUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CategoryUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.CategoryUsingGetResponse>('/category', {
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

/** 创建分类 POST /category */
export function categoryUsingPost({
  body,
  options,
}: {
  body: API.CreateCategoryDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分类详情 GET /category/${param0} */
export function categoryIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CategoryIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.CategoryIdUsingGetResponse>(`/category/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除分类 DELETE /category/${param0} */
export function categoryIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CategoryIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/category/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新分类 PATCH /category/${param0} */
export function categoryIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CategoryIdUsingPatchParams;
  body: API.UpdateCategoryDto;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/category/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
