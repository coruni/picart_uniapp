/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取已发布文章id列表 GET /article/published/ids */
export function articlePublishedIdsUsingGet({
  options,
}: {
  options?: CustomRequestOptions_;
}) {
  return request<API.ArticlePublishedIdsUsingGetResponse>(
    '/article/published/ids',
    {
      method: 'GET',
      ...(options || {}),
    }
  );
}
