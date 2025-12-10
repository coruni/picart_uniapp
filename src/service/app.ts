/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** AppController_getHello GET / */
export function usingGet({ options }: { options?: CustomRequestOptions_ }) {
  return request<unknown>('/', {
    method: 'GET',
    ...(options || {}),
  });
}
