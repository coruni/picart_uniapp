/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取订单列表 GET /order */
export function orderUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.OrderUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.OrderUsingGetResponse>('/order', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取订单详情 GET /order/${param0} */
export function orderIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.OrderIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/order/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消订单 PUT /order/${param0}/cancel */
export function orderIdCancelUsingPut({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.OrderIdCancelUsingPutParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/order/${param0}/cancel`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 申请退款 POST /order/${param0}/refund */
export function orderIdRefundUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.OrderIdRefundUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/order/${param0}/refund`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 创建文章订单 POST /order/article */
export function orderArticleUsingPost({
  body,
  options,
}: {
  body: API.CreateArticleOrderDto;
  options?: CustomRequestOptions_;
}) {
  return request<API.OrderArticleUsingPostResponse>('/order/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建会员充值订单 POST /order/membership */
export function orderMembershipUsingPost({
  body,
  options,
}: {
  body: API.CreateMembershipOrderDto;
  options?: CustomRequestOptions_;
}) {
  return request<API.OrderMembershipUsingPostResponse>('/order/membership', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据订单号获取订单 GET /order/no/${param0} */
export function orderNoOrderNoUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.OrderNoOrderNoUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { orderNo: param0, ...queryParams } = params;

  return request<unknown>(`/order/no/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取待支付订单 GET /order/pending */
export function orderPendingUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/order/pending', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户订单列表 GET /order/user */
export function orderUserUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.OrderUserUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.OrderUserUsingGetResponse>('/order/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取钱包余额 GET /order/wallet/balance */
export function orderWalletBalanceUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/order/wallet/balance', {
    method: 'GET',
    ...(options || {}),
  });
}
