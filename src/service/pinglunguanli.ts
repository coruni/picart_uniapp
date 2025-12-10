/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取全部评论(管理) GET /comment */
export function commentUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<API.CommentUsingGetResponse>('/comment', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建评论 POST /comment */
export function commentUsingPost({
  body,
  options,
}: {
  body: API.CreateCommentDto;
  options?: CustomRequestOptions_;
}) {
  return request<unknown>('/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取评论详情 GET /comment/${param0} */
export function commentIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.CommentIdUsingGetResponse>(`/comment/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 删除评论 DELETE /comment/${param0} */
export function commentIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.BaseResponseDto>(`/comment/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新评论 PATCH /comment/${param0} */
export function commentIdUsingPatch({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentIdUsingPatchParams;
  body: API.UpdateCommentDto;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/comment/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 点赞评论 POST /comment/${param0}/like */
export function commentIdLikeUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentIdLikeUsingPostParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/comment/${param0}/like`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取评论回复列表（弃用） GET /comment/${param0}/replies */
export function commentIdRepliesUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentIdRepliesUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.PaginatedResponseDto>(`/comment/${param0}/replies`, {
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

/** 获取文章评论列表 GET /comment/article/${param0} */
export function commentArticleIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentArticleIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.CommentArticleIdUsingGetResponse>(
    `/comment/article/${param0}`,
    {
      method: 'GET',
      params: {
        // page has a default value: 1
        page: '1',
        // limit has a default value: 10
        limit: '10',
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** 获取文章评论数量 GET /comment/article/${param0}/count */
export function commentArticleIdCountUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentArticleIdCountUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/comment/article/${param0}/count`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户评论列表 GET /comment/user/${param0} */
export function commentUserUserIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.CommentUserUserIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { userId: param0, ...queryParams } = params;

  return request<API.PaginatedResponseDto>(`/comment/user/${param0}`, {
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
