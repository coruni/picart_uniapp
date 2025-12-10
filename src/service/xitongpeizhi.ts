/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取所有配置 GET /config */
export function configUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.ConfigUsingGetResponse>('/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建配置 POST /config */
export function configUsingPost({
  body,
  options,
}: {
  body: API.CreateConfigDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新所有配置 PATCH /config */
export function configUsingPatch({
  body,
  options,
}: {
  body: API.ConfigUsingPatchBody;
  options?: CustomRequestOptions_;
}) {
  return request<API.ConfigUsingPatchResponse>('/config', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取配置详情 GET /config/${param0} */
export function configIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ConfigIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/config/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除配置 DELETE /config/${param0} */
export function configIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ConfigIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/config/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新配置 PATCH /config/${param0} */
export function configIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ConfigIdUsingPatchParams;
  body: API.UpdateConfigDto;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/config/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据分组获取配置 GET /config/group/${param0} */
export function configGroupGroupUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ConfigGroupGroupUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { group: param0, ...queryParams } = params;

  return request<unknown>(`/config/group/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新分组配置 PATCH /config/group/${param0} */
export function configGroupGroupUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ConfigGroupGroupUsingPatchParams;
  body: API.ConfigGroupGroupUsingPatchBody;
  options?: CustomRequestOptions_;
}) {
  const { group: param0, ...queryParams } = params;

  return request<unknown>(`/config/group/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据键获取配置 GET /config/key/${param0} */
export function configKeyKeyUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ConfigKeyKeyUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { key: param0, ...queryParams } = params;

  return request<unknown>(`/config/key/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据键更新配置 PATCH /config/key/${param0} */
export function configKeyKeyUsingPatch({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ConfigKeyKeyUsingPatchParams;
  options?: CustomRequestOptions_;
}) {
  const { key: param0, ...queryParams } = params;

  return request<unknown>(`/config/key/${param0}`, {
    method: 'PATCH',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取公共配置 GET /config/public */
export function configPublicUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.ConfigPublicUsingGetResponse>('/config/public', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取系统信息 GET /config/system/info */
export function configSystemInfoUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/config/system/info', {
    method: 'GET',
    ...(options || {}),
  });
}
