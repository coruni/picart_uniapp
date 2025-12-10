/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取用户列表 GET /user */
export function userUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.UserUsingGetResponse>('/user', {
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

/** 创建用户 POST /user */
export function userUsingPost({
  body,
  options,
}: {
  body: API.CreateUserDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户详情 GET /user/${param0} */
export function userIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.UserIdUsingGetResponse>(`/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除用户 DELETE /user/${param0} */
export function userIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户 PATCH /user/${param0} */
export function userIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdUsingPatchParams;
  body: API.UpdateUserDto;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 关注用户 POST /user/${param0}/follow */
export function userIdFollowUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdFollowUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.UserIdFollowUsingPostResponse>(`/user/${param0}/follow`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取粉丝列表 GET /user/${param0}/followers */
export function userIdFollowersUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdFollowersUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}/followers`, {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // limit has a default value: 10
      limit: '10',
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取粉丝数量 GET /user/${param0}/followers/count */
export function userIdFollowersCountUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdFollowersCountUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}/followers/count`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取关注列表 GET /user/${param0}/followings */
export function userIdFollowingsUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdFollowingsUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}/followings`, {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // limit has a default value: 10
      limit: '10',
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取关注数量 GET /user/${param0}/followings/count */
export function userIdFollowingsCountUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdFollowingsCountUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}/followings/count`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取关用户 POST /user/${param0}/unfollow */
export function userIdUnfollowUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UserIdUnfollowUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/user/${param0}/unfollow`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 计算抽成金额 POST /user/commission/calculate */
export function userCommissionCalculateUsingPost({
  body,
  options,
}: {
  body: API.CalculateCommissionDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/commission/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户抽成配置 GET /user/commission/config */
export function userCommissionConfigUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/commission/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置用户抽成配置 POST /user/commission/config */
export function userCommissionConfigUsingPost({
  body,
  options,
}: {
  body: API.UserCommissionConfigDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/commission/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送邮箱验证码 POST /user/email/verification */
export function userEmailVerificationUsingPost({
  body,
  options,
}: {
  body: API.SendMailDto;
  options?: CustomRequestOptions_;
}) {
  return request<API.UserEmailVerificationUsingPostResponse>(
    '/user/email/verification',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 用户登录 POST /user/login */
export function userLoginUsingPost({
  body,
  options,
}: {
  body: API.LoginDto;
  options?: CustomRequestOptions_;
}) {
  return request<API.UserLoginUsingPostResponse>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录（单设备） POST /user/logout */
export function userLogoutUsingPost({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 重置密码 POST /user/password/reset */
export function userPasswordResetUsingPost({
  body,
  options,
}: {
  body: API.UserPasswordResetUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<API.UserPasswordResetUsingPostResponse>(
    '/user/password/reset',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取当前用户信息 GET /user/profile */
export function userProfileUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.UserProfileUsingGetResponse>('/user/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新 access token POST /user/refresh-token */
export function userRefreshTokenUsingPost({
  body,
  options,
}: {
  body: API.UserRefreshTokenUsingPostBody;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /user/register */
export function userRegisterUsingPost({
  body,
  options,
}: {
  body: API.CreateUserDto;
  options?: CustomRequestOptions_;
}) {
  return request<API.UserRegisterUsingPostResponse>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户钱包信息 GET /user/wallet */
export function userWalletUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/wallet', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 钱包充值 POST /user/wallet/recharge */
export function userWalletRechargeUsingPost({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/wallet/recharge', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 钱包提现 POST /user/wallet/withdraw */
export function userWalletWithdrawUsingPost({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/user/wallet/withdraw', {
    method: 'POST',
    ...(options || {}),
  });
}
