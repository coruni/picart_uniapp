/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取用户文章 GET /article/author/${param0} */
export function articleAuthorIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleAuthorIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.ArticleAuthorIdUsingGetResponse>(
    `/article/author/${param0}`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}
