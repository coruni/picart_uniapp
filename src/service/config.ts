/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取用户配置 GET /user/config */
export function userConfigUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.UserConfigUsingGetResponse>('/user/config', {
    method: 'GET',
    ...(options || {}),
  });
}
