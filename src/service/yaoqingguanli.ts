/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 创建邀请码 POST /invite */
export function inviteUsingPost({
  body,
  options,
}: {
  body: API.CreateInviteDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取邀请详情 GET /invite/${param0} */
export function inviteIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.InviteIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/invite/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取邀请收益记录 GET /invite/earnings */
export function inviteEarningsUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.InviteEarningsUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/invite/earnings', {
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

/** 获取我的邀请列表 GET /invite/my */
export function inviteMyUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.InviteMyUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/invite/my', {
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

/** 获取邀请统计信息 GET /invite/stats */
export function inviteStatsUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/invite/stats', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 使用邀请码 POST /invite/use */
export function inviteUseUsingPost({
  body,
  options,
}: {
  body: API.UseInviteDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/invite/use', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
