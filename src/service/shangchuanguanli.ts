/* eslint-disable */
// @ts-ignore
import request from '@/http/vue-query';
import { CustomRequestOptions_ } from '@/http/types';

import * as API from './types';

/** 获取所有上传文件 GET /upload */
export function uploadUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UploadUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  return request<{ data: API.Upload[] }>('/upload', {
    method: 'GET',
    data: {}, // 添加空的data对象以满足类型要求
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

/** 删除文件 DELETE /upload/${param0} */
export function uploadIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UploadIdUsingDeleteParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<unknown>(`/upload/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 上传文件 POST /upload/file */
export function uploadFileUsingPost({
  body,
  files,
  options,
}: {
  body: API.UploadFileUsingPostBody;
  files?: globalThis.File;
  options?: CustomRequestOptions_;
}) {
  const formData = new FormData();

  if (files) {
    formData.append('files', files);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as { [key: string]: any })[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof globalThis.File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.UploadFileUsingPostResponse>('/upload/file', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

/** 获取文件信息 GET /upload/info/${param0} */
export function uploadInfoIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UploadInfoIdUsingGetParams;
  options?: CustomRequestOptions_;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.Upload>(`/upload/info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
