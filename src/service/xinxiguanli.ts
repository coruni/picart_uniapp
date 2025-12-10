/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取当前用户所有消息（含全员通知） GET /message */
export function messageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MessageUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.MessageUsingGetResponse>('/message', {
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

/** 创建消息（支持全员、部分、个人通知） POST /message */
export function messageUsingPost({
  body,
  options,
}: {
  body: API.MessageUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<API.MessageUsingPostResponse>('/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取单条消息 GET /message/${param0} */
export function messageIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MessageIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.MessageIdUsingGetResponse>(`/message/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除消息 DELETE /message/${param0} */
export function messageIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MessageIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/message/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新消息内容 PATCH /message/${param0} */
export function messageIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MessageIdUsingPatchParams;
  body: API.MessageIdUsingPatchBody;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/message/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 标记消息为已读 POST /message/${param0}/read */
export function messageIdReadUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MessageIdReadUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/message/${param0}/read`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量操作消息（标记已读/删除） POST /message/batch */
export function messageBatchUsingPost({
  body,
  options,
}: {
  body: API.MessageBatchUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/message/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 标记所有消息为已读 POST /message/read-all */
export function messageReadAllUsingPost({
  body,
  options,
}: {
  body: API.MessageReadAllUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/message/read-all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 高级查询消息 GET /message/search */
export function messageSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MessageSearchUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/message/search', {
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

/** 获取未读消息数量 GET /message/unread/count */
export function messageUnreadCountUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.MessageUnreadCountUsingGetResponse>(
    '/message/unread/count',
    {
      method: 'GET',
      ...(options || {}),
    }
  );
}
