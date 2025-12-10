/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取所有权限 GET /permission */
export function permissionUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.PermissionUsingGetResponse>('/permission', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建权限 POST /permission */
export function permissionUsingPost({
  body,
  options,
}: {
  body: API.PermissionUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<API.PermissionUsingPostResponse>('/permission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID获取权限 GET /permission/${param0} */
export function permissionIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PermissionIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.PermissionIdUsingGetResponse>(`/permission/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除权限 DELETE /permission/${param0} */
export function permissionIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PermissionIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/permission/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新权限 PATCH /permission/${param0} */
export function permissionIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PermissionIdUsingPatchParams;
  body: API.PermissionIdUsingPatchBody;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.PermissionIdUsingPatchResponse>(`/permission/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
