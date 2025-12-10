/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取文章列表 GET /article */
export function articleUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.ArticleUsingGetResponse>('/article', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // limit has a default value: 10
      limit: '10',

      // type has a default value: all
      type: 'all',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建文章 POST /article */
export function articleUsingPost({
  body,
  options,
}: {
  body: API.CreateArticleDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章详情 GET /article/${param0} */
export function articleIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.ArticleIdUsingGetResponse>(`/article/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除文章 DELETE /article/${param0} */
export function articleIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/article/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新文章 PATCH /article/${param0} */
export function articleIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleIdUsingPatchParams;
  body: API.UpdateArticleDto;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/article/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 点赞/表情回复文章 POST /article/${param0}/like */
export function articleIdLikeUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleIdLikeUsingPostParams;
  body: API.ArticleLikeDto;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/article/${param0}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章点赞数量 GET /article/${param0}/like/count */
export function articleIdLikeCountUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleIdLikeCountUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/article/${param0}/like/count`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取文章点赞状态 GET /article/${param0}/like/status */
export function articleIdLikeStatusUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleIdLikeStatusUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/article/${param0}/like/status`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取点赞文章 GET /article/liked */
export function articleLikedUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleLikedUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.ArticleLikedUsingGetResponse>('/article/liked', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取相关推荐 GET /article/recommend/${param0} */
export function articleRecommendIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleRecommendIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.ArticleRecommendIdUsingGetResponse>(
    `/article/recommend/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 搜索文章列表 GET /article/search */
export function articleSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ArticleSearchUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.ArticleSearchUsingGetResponse>('/article/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
