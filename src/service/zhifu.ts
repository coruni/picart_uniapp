/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 创建支付 POST /payment/create */
export function paymentCreateUsingPost({
  body,
  options,
}: {
  body: API.CreatePaymentDto;
  options?: CustomRequestOptions_;
}) {
  return request<API.PaymentCreateUsingPostResponse>('/payment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 支付宝支付回调 POST /payment/notify/alipay */
export function paymentNotifyAlipayUsingPost({
  body,
  options,
}: {
  body: API.AlipayNotifyDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/payment/notify/alipay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 微信支付回调 POST /payment/notify/wechat */
export function paymentNotifyWechatUsingPost({
  body,
  options,
}: {
  body: API.WechatNotifyDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/payment/notify/wechat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询订单支付记录 GET /payment/order/${param0} */
export function paymentOrderOrderIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PaymentOrderOrderIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { orderId: param0, ...queryParams } = params;

  return request<unknown>(`/payment/order/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询支付记录 GET /payment/record/${param0} */
export function paymentRecordIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PaymentRecordIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/payment/record/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 模拟支付成功（仅用于测试） POST /payment/simulate/${param0}/success */
export function paymentSimulateIdSuccessUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PaymentSimulateIdSuccessUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/payment/simulate/${param0}/success`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询用户支付记录 GET /payment/user */
export function paymentUserUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PaymentUserUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/payment/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
