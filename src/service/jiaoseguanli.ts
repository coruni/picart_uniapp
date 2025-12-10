/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取所有角色 GET /role */
export function roleUsingGet({ options }: { options?: CustomRequestOptions_ }) {
  return request<API.RoleUsingGetResponse>('/role', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建角色 POST /role */
export function roleUsingPost({
  body,
  options,
}: {
  body: API.RoleUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<API.RoleUsingPostResponse>('/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID获取角色 GET /role/${param0} */
export function roleIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.RoleIdUsingGetResponse>(`/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除角色 DELETE /role/${param0} */
export function roleIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/role/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新角色 PATCH /role/${param0} */
export function roleIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleIdUsingPatchParams;
  body: API.RoleIdUsingPatchBody;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.RoleIdUsingPatchResponse>(`/role/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 复制角色 POST /role/${param0}/copy */
export function roleIdCopyUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleIdCopyUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/role/${param0}/copy`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 为角色分配权限 POST /role/${param0}/permissions */
export function roleIdPermissionsUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleIdPermissionsUsingPostParams;
  body: API.RoleIdPermissionsUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/role/${param0}/permissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 启用/禁用角色 PATCH /role/${param0}/status */
export function roleIdStatusUsingPatch({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleIdStatusUsingPatchParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/role/${param0}/status`, {
    method: 'PATCH',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取活跃角色列表 GET /role/active */
export function roleActiveUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.RoleActiveUsingGetResponse>('/role/active', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取角色列表 GET /role/list */
export function roleListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleListUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.RoleListUsingGetResponse>('/role/list', {
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
