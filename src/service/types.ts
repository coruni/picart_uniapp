/* eslint-disable */
// @ts-ignore

export type AlipayNotifyDto = {
  /** 支付宝交易号 */
  trade_no: string;
  /** 商户订单号 */
  out_trade_no: string;
  /** 交易状态 */
  trade_status: string;
  /** 交易金额 */
  total_amount: string;
  /** 买家支付宝用户号 */
  buyer_id: string;
  /** 签名 */
  sign: string;
  /** 签名类型 */
  sign_type: string;
};

export type ArticleAuthorIdUsingGetParams = {
  /** 用户id */
  id: string;
  /** 分页 */
  page?: number;
  /** 限制 */
  limit?: number;
  type?: 'all' | 'popular' | 'latest';
};

export type ArticleAuthorIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      title: string;
      requireLogin: boolean;
      requireFollow: boolean;
      requirePayment: boolean;
      requireMembership: boolean;
      listRequireLogin: boolean;
      viewPrice: string;
      type: string;
      content: string;
      images: string[];
      sort: number;
      summary: string;
      views: number;
      likes: number;
      commentCount: number;
      status: string;
      cover: string;
      authorId: number;
      author: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        background: null;
        level: number;
        membershipLevel: number;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: null;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
        lastActiveAt: null;
        lastLoginAt: string;
        gender: string;
        isMember: boolean;
        isFollowed: boolean;
      };
      category: {
        id: number;
        name: string;
        description: string;
        parentId: number;
        link: string;
        parent: {
          id: number;
          name: string;
          description: string;
          parentId: null;
          link: string;
          avatar: string;
          background: string;
          cover: string;
          sort: number;
          status: string;
          articleCount: number;
          followCount: number;
          createdAt: string;
          updatedAt: string;
        };
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        status: string;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      };
      tags: {
        id: number;
        name: string;
        description: string;
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      }[];
      downloads: string[];
      downloadCount: number;
      createdAt: string;
      updatedAt: string;
      imageCount: number;
      isLiked: boolean;
      isPaid: boolean;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type ArticleAuthorIdUsingGetResponses = {
  200: ArticleAuthorIdUsingGetResponse;
};

export type ArticleIdLikeCountUsingGetParams = {
  id: string;
};

export type ArticleIdLikeCountUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 文章不存在
   */
  404: unknown;
};

export type ArticleIdLikeStatusUsingGetParams = {
  id: string;
};

export type ArticleIdLikeStatusUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 文章不存在
   */
  404: unknown;
};

export type ArticleIdLikeUsingPostParams = {
  id: string;
};

export type ArticleIdLikeUsingPostResponses = {
  /**
   * 操作成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 文章不存在
   */
  404: unknown;
};

export type ArticleIdUsingDeleteParams = {
  id: string;
};

export type ArticleIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 文章不存在
   */
  404: unknown;
};

export type ArticleIdUsingGetParams = {
  id: string;
};

export type ArticleIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    title: string;
    requireLogin: boolean;
    requireFollow: boolean;
    requirePayment: boolean;
    requireMembership: boolean;
    viewPrice: string;
    type: string;
    content: string;
    images: string[];
    imageCount: string;
    sort: number;
    summary: string;
    views: number;
    likes: number;
    status: string;
    cover: string;
    authorId: number;
    author: {
      id: number;
      username: string;
      nickname: string;
      avatar: string;
      level: number;
      membershipLevel: number;
      membershipStatus: string;
      membershipStartDate: string;
      membershipEndDate: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      description: string;
      followerCount: number;
      followingCount: number;
      lastActiveAt: null;
      lastLoginAt: string;
      gender: string;
      isMember: boolean;
      isFollowed: boolean;
    };
    category: {
      id: number;
      name: string;
      description: string;
      parentId: number;
      link: null;
      parent: {
        id: number;
        name: string;
        description: string;
        parentId: null;
        link: null;
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        status: string;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      };
      avatar: string;
      background: string;
      cover: string;
      sort: number;
      status: string;
      articleCount: number;
      followCount: number;
      createdAt: string;
      updatedAt: string;
    };
    tags: {
      id: number;
      name: string;
      description: string;
      avatar: string;
      background: string;
      cover: string;
      sort: number;
      articleCount: number;
      followCount: number;
      createdAt: string;
      updatedAt: string;
    }[];
    downloads: {
      id?: number;
      type?: string;
      url?: string;
      password?: string;
      extractionCode?: string;
      articleId?: number;
      createdAt?: string;
      updatedAt?: string;
    }[];
    downloadCount: number;
    createdAt: string;
    updatedAt: string;
    isLiked: boolean;
    isPaid: boolean;
    isFavorited: boolean;
    commentCount: number;
  };
};

export type ArticleIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: ArticleIdUsingGetResponse;
  /**
   * 文章不存在
   */
  404: ArticleIdUsingGetResponse;
};

export type ArticleIdUsingPatchParams = {
  id: string;
};

export type ArticleIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 文章不存在
   */
  404: unknown;
};

export type ArticleLikeDto = {
  /** 表情类型 */
  reactionType: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry' | 'dislike';
};

export type ArticleLikedUsingGetParams = {
  page?: number;
  limit?: number;
};

export type ArticleLikedUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      title: string;
      requireLogin: boolean;
      requireFollow: boolean;
      requirePayment: boolean;
      requireMembership: boolean;
      listRequireLogin: boolean;
      viewPrice: string;
      type: string;
      content: string;
      images: string[];
      sort: number;
      summary: null;
      views: number;
      likes: number;
      status: string;
      cover: string;
      authorId: number;
      author: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        level: number;
        membershipLevel: number;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: null;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
        lastActiveAt: null;
        lastLoginAt: string;
        gender: string;
        isMember: boolean;
        isFollowed: boolean;
      };
      category: {
        id: number;
        name: string;
        description: string;
        parentId: number;
        link: string;
        parent: {
          id: number;
          name: string;
          description: string;
          parentId: null;
          link: string;
          avatar: string;
          background: string;
          cover: string;
          sort: number;
          status: string;
          articleCount: number;
          followCount: number;
          createdAt: string;
          updatedAt: string;
        };
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        status: string;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      };
      tags: {
        id: number;
        name: string;
        description: string;
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      }[];
      downloadCount: number;
      createdAt: string;
      updatedAt: string;
      isLiked: boolean;
      isPaid: boolean;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type ArticleLikedUsingGetResponses = {
  200: ArticleLikedUsingGetResponse;
};

export type ArticlePublishedIdsUsingGetResponse = {
  code: number;
  message: string;
  data: number[];
};

export type ArticlePublishedIdsUsingGetResponses = {
  200: ArticlePublishedIdsUsingGetResponse;
};

export type ArticleRecommendIdUsingGetParams = {
  /** 文章id */
  id: string;
};

export type ArticleRecommendIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      title: string;
      requireLogin: boolean;
      requireFollow: boolean;
      requirePayment: boolean;
      requireMembership: boolean;
      listRequireLogin: boolean;
      viewPrice: string;
      type: string;
      content: string;
      images: string[];
      sort: number;
      summary: string;
      views: number;
      likes: number;
      commentCount: number;
      status: string;
      cover: string;
      authorId: number;
      author: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        background: null;
        level: number;
        membershipLevel: number;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: null;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
        lastActiveAt: null;
        lastLoginAt: string;
        gender: string;
        isMember: boolean;
        isFollowed: boolean;
      };
      category: {
        id: number;
        name: string;
        description: string;
        parentId: number;
        link: string;
        parent: {
          id: number;
          name: string;
          description: string;
          parentId: null;
          link: string;
          avatar: string;
          background: string;
          cover: string;
          sort: number;
          status: string;
          articleCount: number;
          followCount: number;
          createdAt: string;
          updatedAt: string;
        };
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        status: string;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      };
      tags: {
        id: number;
        name: string;
        description: string;
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      }[];
      downloads: string[];
      downloadCount: number;
      createdAt: string;
      updatedAt: string;
      imageCount: number;
      isLiked: boolean;
      isPaid: boolean;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type ArticleRecommendIdUsingGetResponses = {
  200: ArticleRecommendIdUsingGetResponse;
};

export type ArticleSearchUsingGetParams = {
  /** 分页 */
  page?: number;
  /** 限制 */
  limit?: number;
  keyword: string;
  categoryId?: number;
};

export type ArticleSearchUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      title: string;
      requireLogin: boolean;
      requireFollow: boolean;
      requirePayment: boolean;
      requireMembership: boolean;
      viewPrice: string;
      type: string;
      content: string;
      images: string[];
      imageCount: number;
      sort: number;
      summary: string;
      views: number;
      likes: number;
      status: string;
      cover: string;
      authorId: number;
      author: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        level: number;
        membershipLevel: number;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
        lastActiveAt: string;
        lastLoginAt: string;
        gender: string;
        isMember: boolean;
        isFollowed: boolean;
      };
      category: {
        id: number;
        name: string;
        description: string;
        parentId: number;
        link: null;
        parent: {
          id: number;
          name: string;
          description: string;
          parentId: null;
          link: null;
          avatar: string;
          background: string;
          cover: string;
          sort: number;
          status: string;
          articleCount: number;
          followCount: number;
          createdAt: string;
          updatedAt: string;
        };
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        status: string;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      };
      tags: {
        id: number;
        name: string;
        description: string;
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      }[];
      downloads: {
        id?: number;
        type?: string;
        url?: string;
        password?: string;
        extractionCode?: string;
        articleId?: number;
        createdAt?: string;
        updatedAt?: string;
      }[];
      downloadCount: number;
      createdAt: string;
      updatedAt: string;
      isLiked: boolean;
      isPaid: boolean;
      commentCount: number;
      isFavorited: boolean;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type ArticleSearchUsingGetResponses = {
  200: ArticleSearchUsingGetResponse;
};

export type ArticleUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
  title?: string;
  /** 分类 */
  categoryId?: number;
  type?: 'all' | 'latest' | 'following' | 'popular';
};

export type ArticleUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      title: string;
      requireLogin: boolean;
      requireFollow: boolean;
      requirePayment: boolean;
      requireMembership: boolean;
      viewPrice: string;
      type: string;
      content: string;
      images: string[];
      imageCount: number;
      sort: number;
      summary: string;
      views: number;
      likes: number;
      status: string;
      cover: string;
      authorId: number;
      author: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        level: number;
        membershipLevel: number;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
        lastActiveAt: null;
        lastLoginAt: string;
        gender: string;
        isMember: boolean;
        isFollowed: boolean;
      };
      category: {
        id: number;
        name: string;
        description: string;
        parentId: number;
        link: string;
        parent: {
          id: number;
          name: string;
          description: string;
          parentId: null;
          link: string;
          avatar: string;
          background: string;
          cover: string;
          sort: number;
          status: string;
          articleCount: number;
          followCount: number;
          createdAt: string;
          updatedAt: string;
        };
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        status: string;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      };
      tags: {
        id: number;
        name: string;
        description: string;
        avatar: string;
        background: string;
        cover: string;
        sort: number;
        articleCount: number;
        followCount: number;
        createdAt: string;
        updatedAt: string;
      }[];
      downloads: {
        id: number;
        type: string;
        url: string;
        password: string;
        extractionCode: string;
        articleId: number;
        createdAt: string;
        updatedAt: string;
      }[];
      downloadCount: number;
      createdAt: string;
      updatedAt: string;
      isLiked: boolean;
      isPaid: boolean;
      isFavorited: boolean;
      commentCount: number;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type ArticleUsingGetResponses = {
  /**
   * 获取成功
   */
  200: ArticleUsingGetResponse;
};

export type ArticleUsingPostResponses = {
  /**
   * 创建成功
   */
  201: unknown;
};

export type BannersActiveUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id?: number;
    title?: string;
    description?: string;
    imageUrl?: string;
    linkUrl?: string;
    sortOrder?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
};

export type BannersActiveUsingGetResponses = {
  200: BannersActiveUsingGetResponse;
};

export type BannersIdUsingDeleteParams = {
  /** id */
  id: string;
};

export type BannersIdUsingDeleteResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
};

export type BannersIdUsingDeleteResponses = {
  200: BannersIdUsingDeleteResponse;
};

export type BannersIdUsingGetParams = {
  /** id */
  id: string;
};

export type BannersIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    sortOrder: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type BannersIdUsingGetResponses = {
  200: BannersIdUsingGetResponse;
};

export type BannersIdUsingPatchBody = {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  sortOrder?: number;
  /** 状态 */
  status?: 'inactive' | 'active';
};

export type BannersIdUsingPatchParams = {
  id: string;
};

export type BannersIdUsingPatchResponse = Record<string, unknown>;

export type BannersIdUsingPatchResponses = {
  200: BannersIdUsingPatchResponse;
};

export type BannersUsingGetParams = {
  /** 分页 */
  page?: number;
  /** 限制 */
  limit?: number;
};

export type BannersUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id?: number;
      title?: string;
      description?: string;
      imageUrl?: string;
      linkUrl?: string;
      sortOrder?: number;
      status?: string;
      createdAt?: string;
      updatedAt?: string;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type BannersUsingGetResponses = {
  200: BannersUsingGetResponse;
};

export type BannersUsingPostBody = {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  sortOrder?: number;
  status?: 'active' | 'inactive';
};

export type BannersUsingPostResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: {
      id: number;
      title: string;
      description: string;
      imageUrl: string;
      linkUrl: string;
      sortOrder: number;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type BannersUsingPostResponses = {
  201: BannersUsingPostResponse;
};

export type BaseResponseDto = {
  /** 业务状态码 */
  code: number;
  /** 提示信息 */
  message: string;
  /** 数据体 */
  data?: Record<string, unknown>;
  /** 时间戳 */
  timestamp: number;
  /** 路径 */
  path: string;
};

export type CalculateCommissionDto = {
  /** 金额 */
  amount: number;
  /** 抽成类型 */
  type: 'article' | 'membership' | 'product' | 'service';
};

export type CategoryIdUsingDeleteParams = {
  id: string;
};

export type CategoryIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 分类不存在
   */
  404: unknown;
};

export type CategoryIdUsingGetParams = {
  id: string;
};

export type CategoryIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    name: string;
    description: string;
    parentId: number;
    link: string;
    parent: Record<string, unknown>;
    children: {
      id?: number;
      name?: string;
      description?: string;
      parentId?: number;
      link?: string;
      avatar?: string;
      background?: string;
      cover?: string;
      sort?: number;
      status?: string;
      articleCount?: number;
      followCount?: number;
      createdAt?: string;
      updatedAt?: string;
    }[];
    avatar: string;
    background: string;
    cover: string;
    sort: number;
    status: string;
    articleCount: number;
    followCount: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type CategoryIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: CategoryIdUsingGetResponse;
  /**
   * 分类不存在
   */
  404: CategoryIdUsingGetResponse;
};

export type CategoryIdUsingPatchParams = {
  id: string;
};

export type CategoryIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 分类不存在
   */
  404: unknown;
};

export type CategoryUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
  /** 分类名 */
  name?: string;
  /** 状态 */
  status?: string;
  /** 主分类ID */
  parentId?: number;
};

export type CategoryUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      name: string;
      description: string;
      parentId: null;
      link: null;
      children: {
        id?: number;
        name?: string;
        description?: string;
        parentId?: number;
        link?: null;
        avatar?: string;
        background?: string;
        cover?: string;
        sort?: number;
        status?: string;
        articleCount?: number;
        followCount?: number;
        createdAt?: string;
        updatedAt?: string;
      }[];
      avatar: string;
      background: string;
      cover: string;
      sort: number;
      status: string;
      articleCount: number;
      followCount: number;
      createdAt: string;
      updatedAt: string;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type CategoryUsingGetResponses = {
  /**
   * 获取成功
   */
  200: CategoryUsingGetResponse;
};

export type CategoryUsingPostResponses = {
  /**
   * 创建成功
   */
  201: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
};

export type CommentArticleIdCountUsingGetParams = {
  /** 文章ID */
  id: number;
};

export type CommentArticleIdCountUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
};

export type CommentArticleIdUsingGetParams = {
  /** 文章ID */
  id: number;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type CommentArticleIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id?: number;
      content?: string;
      likes?: number;
      replyCount?: number;
      status?: string;
      author: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        level: number;
        membershipLevel: number;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
        lastActiveAt: null;
        lastLoginAt: string;
        gender: string;
        isMember: boolean;
      };
      article: {
        id: number;
        title: string;
        requireLogin: boolean;
        requireFollow: boolean;
        requirePayment: boolean;
        requireMembership: boolean;
        viewPrice: string;
        views: number;
        likes: number;
        cover: string;
        downloadCount: number;
        createdAt: string;
        updatedAt: string;
      };
      parent?: null;
      rootId?: number;
      replies?: {
        id?: number;
        content?: string;
        likes?: number;
        replyCount?: number;
        status?: string;
        author: {
          id: number;
          username: string;
          nickname: string;
          avatar: string;
          level: number;
          membershipLevel: number;
          membershipStatus: string;
          membershipStartDate: string;
          membershipEndDate: string;
          status: string;
          createdAt: string;
          updatedAt: string;
          description: string;
          followerCount: number;
          followingCount: number;
          lastActiveAt: null;
          lastLoginAt: string;
          gender: string;
        };
        article: {
          id: number;
          title: string;
          requireLogin: boolean;
          requireFollow: boolean;
          requirePayment: boolean;
          requireMembership: boolean;
          viewPrice: string;
          views: number;
          likes: number;
          cover: string;
          downloadCount: number;
          createdAt: string;
          updatedAt: string;
        };
        parent: {
          id: number;
          author: {
            id: number;
            username: string;
            nickname: string;
            avatar: string;
            level: number;
            membershipLevel: number;
            membershipStatus: string;
            membershipStartDate: string;
            membershipEndDate: string;
            status: string;
            createdAt: string;
            updatedAt: string;
            description: string;
            followerCount: number;
            followingCount: number;
            lastActiveAt: null;
            lastLoginAt: string;
            gender: string;
          };
        };
        rootId?: number;
        createdAt?: string;
        updatedAt?: string;
        parentId?: number;
      }[];
      createdAt?: string;
      updatedAt?: string;
      parentId?: null;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type CommentArticleIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: CommentArticleIdUsingGetResponse;
  /**
   * 未授权
   */
  401: CommentArticleIdUsingGetResponse;
  /**
   * 权限不足
   */
  403: CommentArticleIdUsingGetResponse;
  /**
   * 文章不存在
   */
  404: CommentArticleIdUsingGetResponse;
};

export type CommentIdLikeUsingPostParams = {
  /** 评论ID */
  id: number;
};

export type CommentIdLikeUsingPostResponses = {
  /**
   * 点赞成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 评论不存在
   */
  404: unknown;
};

export type CommentIdRepliesUsingGetParams = {
  /** 父评论ID */
  id: number;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type CommentIdRepliesUsingGetResponses = {
  /**
   * 获取成功
   */
  200: PaginatedResponseDto;
  /**
   * 父评论不存在
   */
  404: unknown;
};

export type CommentIdUsingDeleteParams = {
  /** 评论ID */
  id: number;
};

export type CommentIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: BaseResponseDto;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 评论不存在
   */
  404: unknown;
};

export type CommentIdUsingGetParams = {
  /** 评论ID */
  id: number;
  /** 子评论页码 */
  page?: number;
  /** 每页子评论数量 */
  limit?: number;
};

export type CommentIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      content: string;
      likes: number;
      replyCount: number;
      status: string;
      author: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        level: number;
        membershipLevel: number;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
      };
      article: {
        id: number;
        title: string;
        requireLogin: boolean;
        requireFollow: boolean;
        requirePayment: boolean;
        requireMembership: boolean;
        viewPrice: string;
        views: number;
        likes: number;
        cover: string;
        createdAt: string;
        updatedAt: string;
      };
      parent: {
        id: number;
        author: {
          id: number;
          username: string;
          nickname: string;
          avatar: string;
          level: number;
          membershipLevel: number;
          status: string;
          createdAt: string;
          updatedAt: string;
          description: string;
          followerCount: number;
          followingCount: number;
        };
      };
      rootId: number;
      createdAt: string;
      updatedAt: string;
      parentId: number;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type CommentIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: CommentIdUsingGetResponse;
  /**
   * 未授权
   */
  401: CommentIdUsingGetResponse;
  /**
   * 权限不足
   */
  403: CommentIdUsingGetResponse;
  /**
   * 评论不存在
   */
  404: CommentIdUsingGetResponse;
};

export type CommentIdUsingPatchParams = {
  /** 评论ID */
  id: number;
};

export type CommentIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 评论不存在
   */
  404: unknown;
};

export type CommentUserUserIdUsingGetParams = {
  /** 用户ID */
  userId: number;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type CommentUserUserIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: PaginatedResponseDto;
};

export type CommentUsingGetParams = {
  /** 分页 */
  page?: number;
  /** 限制 */
  limit?: number;
  /** 用户id */
  userId?: number;
  /** 关键词 */
  keyword?: string;
  /** 文章Id */
  articleId?: number;
};

export type CommentUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      content: string;
      likes: number;
      replyCount: number;
      status: string;
      author: {
        id: number;
        username: string;
        nickname: string;
        status: string;
        avatar: string;
        address: null;
        membershipLevel: number;
        membershipLevelName: string;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: string;
        createdAt: string;
        updatedAt: string;
      };
      article: {
        id: number;
        title: string;
        requireLogin: boolean;
        requireFollow: boolean;
        requirePayment: boolean;
        requireMembership: boolean;
        viewPrice: string;
        content: string;
        images: string;
        summary?: string;
        views: number;
        likes: number;
        cover: string;
        downloadCount: number;
        createdAt: string;
        updatedAt: string;
      };
      rootId: number;
      createdAt: string;
      updatedAt: string;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type CommentUsingGetResponses = {
  200: CommentUsingGetResponse;
};

export type CommentUsingPostResponses = {
  /**
   * 评论创建成功
   */
  201: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 文章或父评论不存在
   */
  404: unknown;
};

export type ConfigGroupGroupUsingGetParams = {
  /** 配置分组 */
  group: string;
};

export type ConfigGroupGroupUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
};

export type ConfigGroupGroupUsingPatchBody = string[];

export type ConfigGroupGroupUsingPatchParams = {
  /** 配置分组 */
  group: string;
};

export type ConfigGroupGroupUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
};

export type ConfigIdUsingDeleteParams = {
  /** 配置ID */
  id: number;
};

export type ConfigIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 配置不存在
   */
  404: unknown;
};

export type ConfigIdUsingGetParams = {
  /** 配置ID */
  id: number;
};

export type ConfigIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 配置不存在
   */
  404: unknown;
};

export type ConfigIdUsingPatchParams = {
  /** 配置ID */
  id: number;
};

export type ConfigIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 配置不存在
   */
  404: unknown;
};

export type ConfigKeyKeyUsingGetParams = {
  /** 配置键 */
  key: string;
};

export type ConfigKeyKeyUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 配置不存在
   */
  404: unknown;
};

export type ConfigKeyKeyUsingPatchParams = {
  /** 配置键 */
  key: string;
};

export type ConfigKeyKeyUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 配置不存在
   */
  404: unknown;
};

export type ConfigPublicUsingGetResponse = {
  code: number;
  message: string;
  data: {
    site_name: string;
    site_description: string;
    site_keywords: string;
    site_logo: string;
    site_favicon: string;
    user_registration_enabled: boolean;
    user_email_verification: boolean;
    comment_approval_required: boolean;
    article_approval_required: boolean;
    maintenance_mode: boolean;
    maintenance_message: string;
    invite_code_required: boolean;
    invite_code_enabled: boolean;
    site_subtitle: string;
    payment_alipay_enabled: boolean;
    payment_wechat_enabled: boolean;
    payment_epay_enabled: boolean;
    membership_price: number;
    membership_name: string;
    membership_enabled: boolean;
    ad_homepage_enabled: boolean;
    ad_homepage_content: string;
    ad_homepage_position: string;
    ad_article_top_enabled: boolean;
    ad_article_top_content: string;
    ad_article_bottom_enabled: boolean;
    ad_article_bottom_content: string;
    ad_global_enabled: boolean;
    ad_global_content: string;
    ad_global_position: string;
    ad_global_style: string;
    payment_epay_wxpay_enabled: boolean;
    payment_epay_alipay_enabled: boolean;
    payment_epay_usdt_enabled: boolean;
    membership_price_1m: number;
    membership_price_3m: number;
    membership_price_6m: number;
    membership_price_12m: number;
    membership_price_lifetime: number;
    site_layout: string;
    article_free_images_count: number;
    site_mail: string;
    seo_long_tail_keywords: string;
    seo_home_keywords: string;
    seo_author_page_keywords: string;
    seo_article_page_keywords: string;
  };
};

export type ConfigPublicUsingGetResponses = {
  200: ConfigPublicUsingGetResponse;
};

export type ConfigSystemInfoUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
};

export type ConfigUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      key: string;
      value: string;
      description: string;
      type: string;
      group: string;
      public: boolean;
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export type ConfigUsingGetResponses = {
  /**
   * 获取成功
   */
  200: ConfigUsingGetResponse;
  /**
   * 未授权
   */
  401: ConfigUsingGetResponse;
  /**
   * 权限不足
   */
  403: ConfigUsingGetResponse;
};

export type ConfigUsingPatchBody = string[];

export type ConfigUsingPatchResponse = {
  code: number;
  message: string;
  data: string[];
};

export type ConfigUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: ConfigUsingPatchResponse;
  /**
   * 请求参数错误
   */
  400: ConfigUsingPatchResponse;
  /**
   * 未授权
   */
  401: ConfigUsingPatchResponse;
  /**
   * 权限不足
   */
  403: ConfigUsingPatchResponse;
};

export type ConfigUsingPostResponses = {
  /**
   * 创建成功
   */
  201: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
};

export type CreateArticleDto = {
  /** 文章标题 */
  title: string;
  /** 文章内容 */
  content?: string;
  /** 文章摘要 */
  summary?: string;
  /** 文章图片 */
  images?: string;
  /** 封面图片 */
  cover?: string;
  /** 分类ID */
  categoryId: number;
  downloads?: {
    type:
      | 'baidu'
      | 'google'
      | 'lanzou'
      | 'quark'
      | 'dropbox'
      | 'direct'
      | 'other'
      | 'mega'
      | 'onedrive';
    url: string;
    password?: string;
    extractionCode?: string;
  }[];
  /** 标签名称数组（不存在的标签会自动创建） */
  tagNames?: string[];
  /** 标签ID数组（与tagNames二选一） */
  tagIds?: number[];
  /** 文章状态 */
  status?: 'DRAFT' | 'PUBLISHED';
  /** 是否需要登录后才能查看 */
  requireLogin?: boolean;
  /** 是否仅关注后可查看 */
  requireFollow?: boolean;
  /** 是否需要支付后才能查看 */
  requirePayment?: boolean;
  /** 是否需要会员 */
  requireMembership?: boolean;
  /** 是否未登录显示 */
  listRequireLogin: boolean;
  /** 查看所需支付金额 */
  viewPrice?: number;
  /** 文章类型 */
  type: 'image' | 'mixed';
  /** 排序 */
  sort?: number;
};

export type CreateArticleOrderDto = {
  /** 文章ID */
  articleId: number;
  /** 备注 */
  remark?: string;
};

export type CreateCategoryDto = {
  /** 分类名称 */
  name: string;
  /** 分类描述 */
  description?: string;
  /** 排序 */
  sort: number;
  /** 父分类ID */
  parentId?: number;
  /** 分类头像 */
  avatar?: string;
  /** 分类背景 */
  background?: string;
  /** 分类封面 */
  cover?: string;
  /** 分类状态 */
  status: string;
  /** 链接 */
  link?: string;
};

export type CreateCommentDto = {
  /** 评论内容 */
  content: string;
  /** 文章ID */
  articleId: number;
  /** 父评论ID */
  parentId?: number;
};

export type CreateConfigDto = {};

export type CreateInviteDto = {
  /** 邀请类型 */
  type: 'GENERAL' | 'VIP';
  /** 邀请分成比例（0-1之间） */
  commissionRate?: number;
  /** 过期时间 */
  expiredAt?: string;
  /** 备注 */
  remark?: string;
};

export type CreateMembershipOrderDto = {
  /** 充值时长（月） */
  duration?: number;
  plan?: '1m' | '3m' | '6m' | '12m' | 'lifetime';
  /** 备注 */
  remark?: string;
};

export type CreatePaymentDto = {
  /** 订单ID */
  orderId: number;
  /** 支付方式 */
  paymentMethod: 'ALIPAY' | 'WECHAT' | 'BALANCE';
  /** 支付详情 */
  details?: string;
  /** payment方式为EPAY时这里填alipay，wxpay，qqpay 中的一个 */
  type?: string;
};

export type CreateTagDto = {
  /** 标签名称 */
  name: string;
  /** 标签描述 */
  description?: string;
  /** 标签头像 */
  avatar: string;
  /** 标签背景 */
  background: string;
  /** 标签封面 */
  cover: string;
  /** 排序 */
  sort: number;
};

export type CreateUserDto = {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  nickname?: string;
  /** 头像 */
  avatar?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 角色ID列表（仅超级管理员可指定） */
  roleIds?: number[];
  /** 钱包余额 */
  wallet?: number;
  /** 邀请码 */
  inviteCode?: string;
  /** 邮箱验证码 */
  verificationCode?: string;
};

export type InviteEarningsUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type InviteEarningsUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type InviteIdUsingGetParams = {
  id: string;
};

export type InviteIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 邀请记录不存在
   */
  404: unknown;
};

export type InviteMyUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type InviteMyUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type InviteStatsUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type InviteUseUsingPostResponses = {
  /**
   * 邀请码使用成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 邀请码不存在
   */
  404: unknown;
  /**
   * 邀请码已使用
   */
  409: unknown;
};

export type InviteUsingPostResponses = {
  /**
   * 邀请码创建成功
   */
  201: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type LoginDto = {
  /** 用户名 */
  account: string;
  /** 密码 */
  password: string;
};

export type MessageBatchUsingPostBody = Record<string, unknown>;

export type MessageBatchUsingPostResponses = {
  201: unknown;
};

export type MessageIdReadUsingPostParams = {
  /** 消息ID */
  id: string;
};

export type MessageIdReadUsingPostResponses = {
  201: unknown;
};

export type MessageIdUsingDeleteParams = {
  /** 消息ID */
  id: string;
};

export type MessageIdUsingDeleteResponses = {
  200: unknown;
};

export type MessageIdUsingGetParams = {
  /** 消息ID */
  id: string;
};

export type MessageIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    type: string;
    isRead: boolean;
    isBroadcast: boolean;
    title: string;
    metadata: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    sender: {
      id: number;
      username: string;
      nickname: string;
      password: string;
      email: string;
      phone: null;
      status: string;
      banned: null;
      banReason: null;
      avatar: string;
      description: string;
      address: null;
      gender: string;
      birthDate: null;
      articleCount: number;
      followerCount: number;
      followingCount: number;
      level: number;
      experience: number;
      score: number;
      wallet: number;
      membershipLevel: number;
      membershipLevelName: string;
      membershipStatus: string;
      membershipStartDate: string;
      membershipEndDate: string;
      lastLoginAt: string;
      lastActiveAt: null;
      refreshToken: null;
      inviterId: null;
      inviteCode: null;
      inviteEarnings: string;
      inviteCount: number;
      createdAt: string;
      updatedAt: string;
    };
    receiver: {
      id: number;
      username: string;
      nickname: string;
      password: string;
      email: string;
      phone: null;
      status: string;
      banned: null;
      banReason: null;
      avatar: string;
      description: string;
      address: null;
      gender: string;
      birthDate: null;
      articleCount: number;
      followerCount: number;
      followingCount: number;
      level: number;
      experience: number;
      score: number;
      wallet: number;
      membershipLevel: number;
      membershipLevelName: string;
      membershipStatus: string;
      membershipStartDate: string;
      membershipEndDate: string;
      lastLoginAt: string;
      lastActiveAt: null;
      refreshToken: null;
      inviterId: null;
      inviteCode: null;
      inviteEarnings: string;
      inviteCount: number;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type MessageIdUsingGetResponses = {
  200: MessageIdUsingGetResponse;
};

export type MessageIdUsingPatchBody = Record<string, unknown>;

export type MessageIdUsingPatchParams = {
  /** 消息ID */
  id: string;
};

export type MessageIdUsingPatchResponses = {
  200: unknown;
};

export type MessageReadAllUsingPostBody = Record<string, unknown>;

export type MessageReadAllUsingPostResponses = {
  201: unknown;
};

export type MessageSearchUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
  /** 消息类型 */
  type?: 'private' | 'system' | 'notification';
  /** 是否已读 */
  isRead?: boolean;
  /** 是否为广播消息 */
  isBroadcast?: boolean;
  /** 搜索关键词 */
  keyword?: string;
  /** 发送者ID */
  senderId?: number;
  /** 接收者ID */
  receiverId?: number;
};

export type MessageSearchUsingGetResponses = {
  200: unknown;
};

export type MessageUnreadCountUsingGetResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    data: {
      personal: number;
      broadcast: number;
      total: number;
    };
  };
};

export type MessageUnreadCountUsingGetResponses = {
  200: MessageUnreadCountUsingGetResponse;
};

export type MessageUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type MessageUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id?: number;
      senderId?: null;
      receiverId?: number;
      content?: string;
      type?: string;
      isRead?: boolean;
      isBroadcast?: boolean;
      title?: string;
      metadata: {
        articleTitle: string;
        commenterName: string;
        commentContent: string;
        notificationType: string;
      };
      createdAt?: string;
      updatedAt?: string;
      sender?: null;
      receiver: {
        id: number;
        username: string;
        nickname: string;
        avatar: string;
        level: number;
        membershipLevel: number;
        membershipStatus: string;
        membershipStartDate: string;
        membershipEndDate: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        description: string;
        followerCount: number;
        followingCount: number;
        lastActiveAt: null;
        lastLoginAt: string;
        gender: string;
      };
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type MessageUsingGetResponses = {
  200: MessageUsingGetResponse;
};

export type MessageUsingPostBody = {
  senderId: number;
  /** 单发 接收者id */
  receiverId?: number;
  /** 批量发送 */
  receiverIds?: number[];
  /** 内容 */
  content: string;
  /** 标题 */
  title?: string;
  type: 'private' | 'system' | 'notification';
  /** 是否广播 */
  isBroadcast?: boolean;
  metadata?: string;
};

export type MessageUsingPostResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: {
      id?: number;
      senderId?: number;
      receiverId?: number;
      content?: string;
      type?: string;
      isRead?: boolean;
      isBroadcast?: boolean;
      title?: string;
      metadata?: Record<string, unknown>;
      createdAt?: string;
      updatedAt?: string;
    }[];
  };
};

export type MessageUsingPostResponses = {
  201: MessageUsingPostResponse;
};

export type OrderArticleUsingPostResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    userId: number;
    authorId: number;
    articleId: null;
    orderNo: string;
    type: string;
    title: string;
    amount: number;
    paymentMethod: null;
    paymentOrderNo: null;
    status: string;
    paidAt: null;
    details: {
      membershipLevel: number;
      membershipName: string;
      duration: number;
      basePrice: number;
      totalAmount: number;
      remark: string;
    };
    remark: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type OrderArticleUsingPostResponses = {
  200: OrderArticleUsingPostResponse;
  /**
   * 创建成功
   */
  201: OrderArticleUsingPostResponse;
  /**
   * 请求参数错误
   */
  400: OrderArticleUsingPostResponse;
  /**
   * 未授权
   */
  401: OrderArticleUsingPostResponse;
};

export type OrderIdCancelUsingPutParams = {
  id: string;
};

export type OrderIdCancelUsingPutResponses = {
  /**
   * 取消成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 订单不存在
   */
  404: unknown;
};

export type OrderIdRefundUsingPostParams = {
  id: string;
};

export type OrderIdRefundUsingPostResponses = {
  /**
   * 申请成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 订单不存在
   */
  404: unknown;
};

export type OrderIdUsingGetParams = {
  id: string;
};

export type OrderIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 订单不存在
   */
  404: unknown;
};

export type OrderMembershipUsingPostResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: {
      id: number;
      userId: number;
      authorId: number;
      articleId: null;
      orderNo: string;
      type: string;
      title: string;
      amount: number;
      paymentMethod: null;
      paymentOrderNo: null;
      status: string;
      paidAt: null;
      details: {
        membershipLevel: number;
        membershipName: string;
        duration: number;
        basePrice: number;
        totalAmount: number;
        remark: string;
      };
      remark: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type OrderMembershipUsingPostResponses = {
  /**
   * 创建成功
   */
  201: OrderMembershipUsingPostResponse;
  /**
   * 请求参数错误
   */
  400: OrderMembershipUsingPostResponse;
  /**
   * 未授权
   */
  401: OrderMembershipUsingPostResponse;
};

export type OrderNoOrderNoUsingGetParams = {
  orderNo: string;
};

export type OrderNoOrderNoUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 订单不存在
   */
  404: unknown;
};

export type OrderPendingUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
};

export type OrderUserUsingGetParams = {
  page: string;
  limit: string;
  /** 状态 */
  status?: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED';
  type?: 'PRODUCT' | 'MEMBERSHIP' | 'SERVICE' | 'ARTICLE';
};

export type OrderUserUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id?: number;
      userId?: number;
      authorId?: number;
      articleId?: null;
      orderNo?: string;
      type?: string;
      title?: string;
      amount?: string;
      paymentMethod?: null;
      paymentOrderNo?: null;
      status?: string;
      paidAt?: null;
      details: {
        remark: string;
        duration: number;
        basePrice: number;
        totalAmount: number;
        membershipName: string;
        membershipLevel: number;
      };
      remark?: string;
      createdAt?: string;
      updatedAt?: string;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type OrderUserUsingGetResponses = {
  /**
   * 获取成功
   */
  200: OrderUserUsingGetResponse;
};

export type OrderUsingGetParams = {
  page: string;
  limit: string;
  /** 状态 */
  status?: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED';
  userId?: number;
  type?: 'MEMBERSHIP' | 'PRODUCT' | 'SERVICE' | 'ARTICLE';
};

export type OrderUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id?: number;
      userId?: number;
      authorId?: number;
      articleId?: null;
      orderNo?: string;
      type?: string;
      title?: string;
      amount?: string;
      paymentMethod?: null;
      paymentOrderNo?: null;
      status?: string;
      paidAt?: null;
      details: {
        remark: string;
        duration: number;
        basePrice: number;
        totalAmount: number;
        membershipName: string;
        membershipLevel: number;
      };
      remark?: string;
      createdAt?: string;
      updatedAt?: string;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type OrderUsingGetResponses = {
  /**
   * 获取成功
   */
  200: OrderUsingGetResponse;
};

export type OrderWalletBalanceUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type PaginatedResponseDto = {
  /** 业务状态码 */
  code: number;
  /** 提示信息 */
  message: string;
  /** 数据列表 */
  data: Record<string, unknown>;
};

export type PaymentCreateUsingPostResponse = {
  code: number;
  message: string;
  data: {
    data: {
      paymentId: number;
      paymentUrl: string;
      paymentMethod: string;
    };
    success: boolean;
    message: string;
  };
};

export type PaymentCreateUsingPostResponses = {
  /**
   * 支付创建成功
   */
  201: PaymentCreateUsingPostResponse;
};

export enum PaymentMethodEnum {
  'ALIPAY' = 'ALIPAY',
  'WECHAT' = 'WECHAT',
  'BALANCE' = 'BALANCE',
}

export type IPaymentMethodEnum = keyof typeof PaymentMethodEnum;

export type PaymentNotifyAlipayUsingPostResponses = {
  /**
   * 回调处理成功
   */
  200: unknown;
};

export type PaymentNotifyWechatUsingPostResponses = {
  /**
   * 回调处理成功
   */
  200: unknown;
};

export type PaymentOrderOrderIdUsingGetParams = {
  orderId: number;
};

export type PaymentOrderOrderIdUsingGetResponses = {
  /**
   * 查询成功
   */
  200: unknown;
};

export type PaymentRecordIdUsingGetParams = {
  id: number;
};

export type PaymentRecordIdUsingGetResponses = {
  /**
   * 查询成功
   */
  200: unknown;
};

export type PaymentSimulateIdSuccessUsingPostParams = {
  id: number;
};

export type PaymentSimulateIdSuccessUsingPostResponses = {
  /**
   * 模拟成功
   */
  200: unknown;
};

export type PaymentUserUsingGetParams = {
  page: number;
  limit: number;
};

export type PaymentUserUsingGetResponses = {
  /**
   * 查询成功
   */
  200: unknown;
};

export type PermissionIdUsingDeleteParams = {
  id: string;
};

export type PermissionIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 权限不存在
   */
  404: unknown;
};

export type PermissionIdUsingGetParams = {
  id: string;
};

export type PermissionIdUsingGetResponse = Record<string, unknown>;

export type PermissionIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: PermissionIdUsingGetResponse;
  /**
   * 未授权
   */
  401: PermissionIdUsingGetResponse;
  /**
   * 权限不足
   */
  403: PermissionIdUsingGetResponse;
  /**
   * 权限不存在
   */
  404: PermissionIdUsingGetResponse;
};

export type PermissionIdUsingPatchBody = Record<string, unknown>;

export type PermissionIdUsingPatchParams = {
  id: string;
};

export type PermissionIdUsingPatchResponse = Record<string, unknown>;

export type PermissionIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: PermissionIdUsingPatchResponse;
  /**
   * 请求参数错误
   */
  400: PermissionIdUsingPatchResponse;
  /**
   * 未授权
   */
  401: PermissionIdUsingPatchResponse;
  /**
   * 权限不足
   */
  403: PermissionIdUsingPatchResponse;
  /**
   * 权限不存在
   */
  404: PermissionIdUsingPatchResponse;
};

export type PermissionUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      name: string;
      description: string;
    }[];
  };
};

export type PermissionUsingGetResponses = {
  /**
   * 获取成功
   */
  200: PermissionUsingGetResponse;
  /**
   * 未授权
   */
  401: PermissionUsingGetResponse;
  /**
   * 权限不足
   */
  403: PermissionUsingGetResponse;
};

export type PermissionUsingPostBody = Record<string, unknown>;

export type PermissionUsingPostResponse = Record<string, unknown>;

export type PermissionUsingPostResponses = {
  /**
   * 创建成功
   */
  201: PermissionUsingPostResponse;
  /**
   * 请求参数错误
   */
  400: PermissionUsingPostResponse;
  /**
   * 未授权
   */
  401: PermissionUsingPostResponse;
  /**
   * 权限不足
   */
  403: PermissionUsingPostResponse;
};

export enum PlanEnum {
  '1m' = '1m',
  '3m' = '3m',
  '6m' = '6m',
  '12m' = '12m',
  'lifetime' = 'lifetime',
}

export type IPlanEnum = keyof typeof PlanEnum;

export enum ReactionTypeEnum {
  'like' = 'like',
  'love' = 'love',
  'haha' = 'haha',
  'wow' = 'wow',
  'sad' = 'sad',
  'angry' = 'angry',
  'dislike' = 'dislike',
}

export type IReactionTypeEnum = keyof typeof ReactionTypeEnum;

export type RoleActiveUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      name: string;
      displayName: null;
      description: string;
      isActive: boolean;
      isSystem: boolean;
      permissions: {
        id: number;
        name: string;
        description: string;
      }[];
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export type RoleActiveUsingGetResponses = {
  /**
   * 获取成功
   */
  200: RoleActiveUsingGetResponse;
};

export type RoleIdCopyUsingPostParams = {
  id: string;
};

export type RoleIdCopyUsingPostResponses = {
  /**
   * 复制成功
   */
  200: unknown;
};

export type RoleIdPermissionsUsingPostBody = Record<string, unknown>;

export type RoleIdPermissionsUsingPostParams = {
  id: string;
};

export type RoleIdPermissionsUsingPostResponses = {
  /**
   * 分配成功
   */
  200: unknown;
};

export type RoleIdStatusUsingPatchParams = {
  id: string;
};

export type RoleIdStatusUsingPatchResponses = {
  /**
   * 状态更新成功
   */
  200: unknown;
};

export type RoleIdUsingDeleteParams = {
  id: string;
};

export type RoleIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: unknown;
};

export type RoleIdUsingGetParams = {
  id: string;
};

export type RoleIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    name: string;
    displayName: null;
    description: string;
    isActive: boolean;
    isSystem: boolean;
    permissions: {
      id: number;
      name: string;
      description: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
};

export type RoleIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: RoleIdUsingGetResponse;
};

export type RoleIdUsingPatchBody = {
  name?: string;
  displayName?: string;
  description?: string;
  permissionIds?: number[];
  isActive?: boolean;
  isSystem?: boolean;
};

export type RoleIdUsingPatchParams = {
  id: string;
};

export type RoleIdUsingPatchResponse = Record<string, unknown>;

export type RoleIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: RoleIdUsingPatchResponse;
};

export type RoleListUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
  name?: string;
  isActive?: boolean;
};

export type RoleListUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      name: string;
      displayName: null;
      description: string;
      isActive: boolean;
      isSystem: boolean;
      permissions: {
        id: number;
        name: string;
        description: string;
      }[];
      createdAt: string;
      updatedAt: string;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type RoleListUsingGetResponses = {
  /**
   * 获取成功
   */
  200: RoleListUsingGetResponse;
};

export type RoleUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      name: string;
      displayName: null;
      description: string;
      isActive: boolean;
      isSystem: boolean;
      permissions: {
        id: number;
        name: string;
        description: string;
      }[];
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export type RoleUsingGetResponses = {
  /**
   * 获取成功
   */
  200: RoleUsingGetResponse;
};

export type RoleUsingPostBody = {
  /** 名称 */
  name: string;
  displayName: string;
  description?: string;
  permissionIds: number[];
  isActive: boolean;
  isSystem: boolean;
};

export type RoleUsingPostResponse = Record<string, unknown>;

export type RoleUsingPostResponses = {
  /**
   * 创建成功
   */
  201: RoleUsingPostResponse;
};

export type SendMailDto = {
  /** 邮箱 */
  email: string;
  /** 类型 */
  type: 'verification' | 'reset_password';
};

export enum StatusEnum {
  'DRAFT' = 'DRAFT',
  'PUBLISHED' = 'PUBLISHED',
}

export type IStatusEnum = keyof typeof StatusEnum;

export enum StatusEnum2 {
  'DRAFT' = 'DRAFT',
  'PUBLISHED' = 'PUBLISHED',
}

export type IStatusEnum2 = keyof typeof StatusEnum2;

export type TagIdFollowUsingDeleteParams = {
  id: string;
};

export type TagIdFollowUsingDeleteResponses = {
  /**
   * 取消关注成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 标签不存在
   */
  404: unknown;
};

export type TagIdFollowUsingPostParams = {
  id: string;
};

export type TagIdFollowUsingPostResponses = {
  /**
   * 关注成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 标签不存在
   */
  404: unknown;
};

export type TagIdUsingDeleteParams = {
  id: string;
};

export type TagIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 标签不存在
   */
  404: unknown;
};

export type TagIdUsingGetParams = {
  id: string;
};

export type TagIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    name: string;
    description: string;
    avatar: string;
    background: string;
    cover: string;
    sort: number;
    articleCount: number;
    followCount: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type TagIdUsingGetResponses = {
  /**
   * 获取成功
   */
  200: TagIdUsingGetResponse;
  /**
   * 标签不存在
   */
  404: TagIdUsingGetResponse;
};

export type TagIdUsingPatchParams = {
  id: string;
};

export type TagIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
  /**
   * 标签不存在
   */
  404: unknown;
};

export type TagUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
  /** 名字 */
  name?: string;
};

export type TagUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id?: number;
      name?: string;
      description?: string;
      avatar?: string;
      background?: string;
      cover?: string;
      sort?: number;
      articleCount?: number;
      followCount?: number;
      createdAt?: string;
      updatedAt?: string;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type TagUsingGetResponses = {
  /**
   * 获取成功
   */
  200: TagUsingGetResponse;
};

export type TagUsingPostResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    name: string;
    description: string;
    avatar: string;
    background: string;
    cover: string;
    sort: number;
    articleCount: number;
    followCount: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type TagUsingPostResponses = {
  /**
   * 创建成功
   */
  201: TagUsingPostResponse;
  /**
   * 请求参数错误
   */
  400: TagUsingPostResponse;
  /**
   * 未授权
   */
  401: TagUsingPostResponse;
  /**
   * 权限不足
   */
  403: TagUsingPostResponse;
};

export enum TypeEnum {
  'image' = 'image',
  'mixed' = 'mixed',
}

export type ITypeEnum = keyof typeof TypeEnum;

export enum TypeEnum2 {
  'image' = 'image',
  'mixed' = 'mixed',
}

export type ITypeEnum2 = keyof typeof TypeEnum2;

export enum TypeEnum3 {
  'article' = 'article',
  'membership' = 'membership',
  'product' = 'product',
  'service' = 'service',
}

export type ITypeEnum3 = keyof typeof TypeEnum3;

export enum TypeEnum4 {
  'GENERAL' = 'GENERAL',
  'VIP' = 'VIP',
}

export type ITypeEnum4 = keyof typeof TypeEnum4;

export enum TypeEnum5 {
  'verification' = 'verification',
  'reset_password' = 'reset_password',
}

export type ITypeEnum5 = keyof typeof TypeEnum5;

export type UpdateArticleDto = {
  /** 文章标题 */
  title?: string;
  /** 文章内容 */
  content?: string;
  /** 文章摘要 */
  summary?: string;
  /** 文章图片 */
  images?: string;
  /** 封面图片 */
  cover?: string;
  /** 分类ID */
  categoryId?: number;
  downloads?: {
    type:
      | 'baidu'
      | 'google'
      | 'lanzou'
      | 'dropbox'
      | 'mega'
      | 'quark'
      | 'other'
      | 'direct'
      | 'onedrive'
      | 'aliyun';
    url: string;
    password?: string;
    extractionCode?: string;
  }[];
  /** 标签名称数组（不存在的标签会自动创建） */
  tagNames?: string[];
  /** 标签ID数组（与tagNames二选一） */
  tagIds?: number[];
  /** 文章状态 */
  status?: 'DRAFT' | 'PUBLISHED';
  /** 是否需要登录后才能查看 */
  requireLogin?: boolean;
  /** 是否仅关注后可查看 */
  requireFollow?: boolean;
  /** 是否需要支付后才能查看 */
  requirePayment?: boolean;
  /** 是否未登录显示 */
  listRequireLogin?: boolean;
  /** 查看所需支付金额 */
  viewPrice?: number;
  /** 文章类型 */
  type?: 'image' | 'mixed';
};

export type UpdateCategoryDto = {
  /** 分类名称 */
  name?: string;
  /** 分类描述 */
  description?: string;
  /** 排序 */
  sort?: number;
  /** 父分类ID */
  parentId?: number;
  /** 分类头像 */
  avatar?: string;
  /** 分类背景 */
  background?: string;
  /** 分类封面 */
  cover?: string;
  /** 分类状态 */
  status?: string;
};

export type UpdateCommentDto = {
  /** 评论内容 */
  content?: string;
  /** 文章ID */
  articleId?: number;
  /** 父评论ID */
  parentId?: number;
};

export type UpdateConfigDto = {};

export type UpdateTagDto = {
  /** 标签名称 */
  name?: string;
  /** 标签描述 */
  description?: string;
  /** 标签头像 */
  avatar?: string;
  /** 标签背景 */
  background?: string;
  /** 标签封面 */
  cover?: string;
  /** 排序 */
  sort?: number;
};

export type UpdateUserDto = {};

export type Upload = {};

export type UploadFileUsingPostBody = {
  files?: string;
};

export type UploadFileUsingPostResponse = {
  code: number;
  message: string;
  data: {
    id?: number;
    hash?: string;
    originalName?: string;
    storage?: string;
    filename?: string;
    path?: string;
    url?: string;
    size?: number;
    mimeType?: string;
    referenceCount?: number;
    createdAt?: string;
    updatedAt?: string;
  }[];
};

export type UploadFileUsingPostResponses = {
  /**
   * 上传文件成功
   */
  201: UploadFileUsingPostResponse;
  /**
   * 请求参数错误
   */
  400: UploadFileUsingPostResponse;
  /**
   * 权限不足
   */
  403: UploadFileUsingPostResponse;
  /**
   * 服务器错误
   */
  500: UploadFileUsingPostResponse;
};

export type UploadIdUsingDeleteParams = {
  /** 文件ID */
  id: string;
};

export type UploadIdUsingDeleteResponses = {
  /**
   * 删除文件成功
   */
  200: unknown;
  /**
   * 删除文件失败
   */
  400: unknown;
  /**
   * 未授权
   */
  403: unknown;
  /**
   * 文件不存在
   */
  404: unknown;
  /**
   * 服务器错误
   */
  500: unknown;
};

export type UploadInfoIdUsingGetParams = {
  /** 文件ID */
  id: string;
};

export type UploadInfoIdUsingGetResponses = {
  /**
   * 获取文件信息成功
   */
  200: Upload;
  /**
   * 文件不存在
   */
  404: unknown;
};

export type UploadUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type UploadUsingGetResponses = {
  /**
   * 获取所有上传文件成功
   */
  200: Upload[];
};

export type UseInviteDto = {
  /** 邀请码 */
  inviteCode: string;
};

export type UserCommissionCalculateUsingPostResponses = {
  /**
   * 计算成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type UserCommissionConfigDto = {
  /** 文章抽成比例（0-1之间） */
  articleCommissionRate: number;
  /** 会员抽成比例（0-1之间） */
  membershipCommissionRate: number;
  /** 商品抽成比例（0-1之间） */
  productCommissionRate: number;
  /** 服务抽成比例（0-1之间） */
  serviceCommissionRate: number;
  /** 是否启用自定义抽成 */
  enableCustomCommission: boolean;
  /** 备注 */
  remark: string;
};

export type UserCommissionConfigUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type UserCommissionConfigUsingPostResponses = {
  /**
   * 设置成功
   */
  201: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type UserConfigUsingGetResponse = Record<string, unknown>;

export type UserConfigUsingGetResponses = {
  200: UserConfigUsingGetResponse;
};

export type UserEmailVerificationUsingPostResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
};

export type UserEmailVerificationUsingPostResponses = {
  /**
   * 发送成功
   */
  201: UserEmailVerificationUsingPostResponse;
  /**
   * 请求参数错误
   */
  400: UserEmailVerificationUsingPostResponse;
  /**
   * 请求过多
   */
  429: UserEmailVerificationUsingPostResponse;
};

export type UserIdFollowersCountUsingGetParams = {
  id: string;
};

export type UserIdFollowersCountUsingGetResponses = {
  200: unknown;
};

export type UserIdFollowersUsingGetParams = {
  id: string;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type UserIdFollowersUsingGetResponses = {
  200: unknown;
};

export type UserIdFollowingsCountUsingGetParams = {
  id: string;
};

export type UserIdFollowingsCountUsingGetResponses = {
  200: unknown;
};

export type UserIdFollowingsUsingGetParams = {
  id: string;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
};

export type UserIdFollowingsUsingGetResponses = {
  200: unknown;
};

export type UserIdFollowUsingPostParams = {
  id: string;
};

export type UserIdFollowUsingPostResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
};

export type UserIdFollowUsingPostResponses = {
  201: UserIdFollowUsingPostResponse;
};

export type UserIdUnfollowUsingPostParams = {
  id: string;
};

export type UserIdUnfollowUsingPostResponses = {
  201: unknown;
};

export type UserIdUsingDeleteParams = {
  id: string;
};

export type UserIdUsingDeleteResponses = {
  /**
   * 删除成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 用户不存在
   */
  404: unknown;
};

export type UserIdUsingGetParams = {
  id: string;
};

export type UserIdUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    username: string;
    nickname: string;
    password: string;
    email: string;
    phone: null;
    status: string;
    banned: null;
    banReason: null;
    avatar: string;
    description: string;
    address: null;
    gender: string;
    birthDate: null;
    articleCount: number;
    followerCount: number;
    followingCount: number;
    level: number;
    experience: number;
    score: number;
    wallet: number;
    membershipLevel: number;
    membershipLevelName: string;
    membershipStatus: string;
    membershipStartDate: string;
    membershipEndDate: string;
    lastLoginAt: string;
    lastActiveAt: null;
    refreshToken: null;
    inviterId: null;
    inviteCode: null;
    inviteEarnings: string;
    inviteCount: number;
    roles: {
      id?: number;
      name?: string;
      displayName?: null;
      description?: string;
      isActive?: boolean;
      isSystem?: boolean;
      permissions?: {
        id: number;
        name: string;
        description: string;
      }[];
      createdAt?: string;
      updatedAt?: string;
    }[];
    config: {
      id: number;
      userId: number;
      articleCommissionRate: string;
      membershipCommissionRate: string;
      productCommissionRate: string;
      serviceCommissionRate: string;
      enableCustomCommission: boolean;
      enableSystemNotification: boolean;
      enableCommentNotification: boolean;
      enableLikeNotification: boolean;
      enableFollowNotification: boolean;
      enableMessageNotification: boolean;
      enableOrderNotification: boolean;
      enablePaymentNotification: boolean;
      enableInviteNotification: boolean;
      enableEmailNotification: boolean;
      enableSmsNotification: boolean;
      enablePushNotification: boolean;
      remark: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    isFollowed: boolean;
    isMember: boolean;
  };
};

export type UserIdUsingGetResponses = {
  200: UserIdUsingGetResponse;
};

export type UserIdUsingPatchParams = {
  id: string;
};

export type UserIdUsingPatchResponses = {
  /**
   * 更新成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 用户不存在
   */
  404: unknown;
};

export type UserLoginUsingPostResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    username: string;
    nickname: string;
    email: string;
    phone: null;
    status: string;
    banned: null;
    banReason: null;
    avatar: string;
    description: string;
    address: null;
    gender: string;
    birthDate: null;
    articleCount: number;
    followerCount: number;
    followingCount: number;
    level: number;
    experience: number;
    score: number;
    wallet: number;
    membershipLevel: number;
    membershipLevelName: string;
    membershipStatus: string;
    membershipStartDate: string;
    membershipEndDate: string;
    lastLoginAt: string;
    lastActiveAt: null;
    refreshToken: string;
    inviterId: null;
    inviteCode: null;
    inviteEarnings: string;
    inviteCount: number;
    roles: {
      id?: number;
      name?: string;
      displayName?: null;
      description?: string;
      isActive?: boolean;
      isSystem?: boolean;
      permissions?: {
        id: number;
        name: string;
        description: string;
      }[];
      createdAt?: string;
      updatedAt?: string;
    }[];
    config: {
      id: number;
      userId: number;
      articleCommissionRate: string;
      membershipCommissionRate: string;
      productCommissionRate: string;
      serviceCommissionRate: string;
      enableCustomCommission: boolean;
      enableSystemNotification: boolean;
      enableCommentNotification: boolean;
      enableLikeNotification: boolean;
      enableFollowNotification: boolean;
      enableMessageNotification: boolean;
      enableOrderNotification: boolean;
      enablePaymentNotification: boolean;
      enableInviteNotification: boolean;
      enableEmailNotification: boolean;
      enableSmsNotification: boolean;
      enablePushNotification: boolean;
      remark: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    isMember: boolean;
    token: string;
  };
};

export type UserLoginUsingPostResponses = {
  /**
   * 登录成功，返回JWT token
   */
  201: UserLoginUsingPostResponse;
  /**
   * 用户名或密码错误
   */
  401: UserLoginUsingPostResponse;
};

export type UserLogoutUsingPostResponses = {
  201: unknown;
};

export type UserPasswordResetUsingPostBody = {
  /** 邮箱 */
  email: string;
  /** 验证码 */
  code: string;
  /** 新密码 */
  newPassword?: string;
};

export type UserPasswordResetUsingPostResponse = {
  code: number;
  message: string;
  data: {
    success: boolean;
    message: string;
  };
};

export type UserPasswordResetUsingPostResponses = {
  201: UserPasswordResetUsingPostResponse;
};

export type UserProfileUsingGetResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    username: string;
    nickname: string;
    email: string;
    phone: string;
    status: string;
    banned: string;
    banReason: string;
    avatar: string;
    description: string;
    address: string;
    gender: string;
    birthDate: string;
    articleCount: number;
    followerCount: number;
    followingCount: number;
    level: number;
    experience: number;
    score: number;
    wallet: number;
    membershipLevel: number;
    membershipLevelName: string;
    membershipStatus: string;
    membershipStartDate: string;
    membershipEndDate: string;
    lastLoginAt: string;
    lastActiveAt: string;
    refreshToken: string;
    inviterId: string;
    inviteCode: string;
    inviteEarnings: string;
    inviteCount: number;
    roles: {
      id?: number;
      name?: string;
      displayName?: null;
      description?: string;
      isActive?: boolean;
      isSystem?: boolean;
      permissions?: {
        id: number;
        name: string;
        description: string;
      }[];
      createdAt?: string;
      updatedAt?: string;
    }[];
    config: {
      id: number;
      userId: number;
      articleCommissionRate: string;
      membershipCommissionRate: string;
      productCommissionRate: string;
      serviceCommissionRate: string;
      enableCustomCommission: boolean;
      enableSystemNotification: boolean;
      enableCommentNotification: boolean;
      enableLikeNotification: boolean;
      enableFollowNotification: boolean;
      enableMessageNotification: boolean;
      enableOrderNotification: boolean;
      enablePaymentNotification: boolean;
      enableInviteNotification: boolean;
      enableEmailNotification: boolean;
      enableSmsNotification: boolean;
      enablePushNotification: boolean;
      remark: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    isMember: boolean;
  };
};

export type UserProfileUsingGetResponses = {
  /**
   * 获取成功
   */
  200: UserProfileUsingGetResponse;
  /**
   * 未授权
   */
  401: UserProfileUsingGetResponse;
};

export type UserRefreshTokenUsingPostBody = {
  refreshToken?: string;
};

export type UserRefreshTokenUsingPostResponses = {
  201: unknown;
};

export type UserRegisterUsingPostResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    username: string;
    nickname: string;
    email: string;
    phone: null;
    status: string;
    banned: null;
    banReason: null;
    avatar: string;
    description: null;
    address: null;
    gender: string;
    birthDate: null;
    articleCount: number;
    followerCount: number;
    followingCount: number;
    level: number;
    experience: number;
    score: number;
    wallet: number;
    membershipLevel: number;
    membershipLevelName: string;
    membershipStatus: string;
    membershipStartDate: null;
    membershipEndDate: null;
    lastLoginAt: null;
    lastActiveAt: null;
    refreshToken: string;
    inviterId: null;
    inviteCode: null;
    inviteEarnings: string;
    inviteCount: number;
    roles: {
      id?: number;
      name?: string;
      displayName?: null;
      description?: string;
      permissions?: {
        id: number;
        name: string;
        description: string;
      }[];
      createdAt?: string;
      updatedAt?: string;
    }[];
    createdAt: string;
    updatedAt: string;
    token: string;
  };
};

export type UserRegisterUsingPostResponses = {
  /**
   * 注册成功，返回用户信息
   */
  201: UserRegisterUsingPostResponse;
  /**
   * 请求参数不合法
   */
  400: UserRegisterUsingPostResponse;
  /**
   * 用户不存在
   */
  404: UserRegisterUsingPostResponse;
  /**
   * 用户名已存在
   */
  409: UserRegisterUsingPostResponse;
};

export type UserUsingGetParams = {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
  username?: string;
};

export type UserUsingGetResponse = {
  code: number;
  message: string;
  data: {
    data: {
      id: number;
      username: string;
      nickname: string;
      status: string;
      avatar: string;
      description: string;
      followerCount: number;
      followingCount: number;
      score: number;
      wallet: number;
      membershipLevel: number;
      membershipStatus: string;
      roles: {
        id: number;
        name: string;
        displayName: null;
        description: string;
        isActive: boolean;
        isSystem: boolean;
        permissions: {
          id: number;
          name: string;
          description: string;
        }[];
        createdAt: string;
        updatedAt: string;
      }[];
      config: {
        id: number;
        userId: number;
        articleCommissionRate: string;
        membershipCommissionRate: string;
        productCommissionRate: string;
        serviceCommissionRate: string;
        enableCustomCommission: boolean;
        enableSystemNotification: boolean;
        enableCommentNotification: boolean;
        enableLikeNotification: boolean;
        enableFollowNotification: boolean;
        enableMessageNotification: boolean;
        enableOrderNotification: boolean;
        enablePaymentNotification: boolean;
        enableInviteNotification: boolean;
        enableEmailNotification: boolean;
        enableSmsNotification: boolean;
        enablePushNotification: boolean;
        remark: string;
        createdAt: string;
        updatedAt: string;
      };
      createdAt: string;
      updatedAt: string;
      isFollowed: boolean;
      isMember: boolean;
    }[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type UserUsingGetResponses = {
  /**
   * 获取成功
   */
  200: UserUsingGetResponse;
};

export type UserUsingPostResponses = {
  /**
   * 创建成功
   */
  201: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
  /**
   * 权限不足
   */
  403: unknown;
};

export type UserWalletRechargeUsingPostResponses = {
  /**
   * 充值成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type UserWalletUsingGetResponses = {
  /**
   * 获取成功
   */
  200: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type UserWalletWithdrawUsingPostResponses = {
  /**
   * 提现成功
   */
  200: unknown;
  /**
   * 请求参数错误
   */
  400: unknown;
  /**
   * 未授权
   */
  401: unknown;
};

export type UsingGetResponses = {
  200: unknown;
};

export type WechatNotifyDto = {
  /** 微信支付订单号 */
  transaction_id: string;
  /** 商户订单号 */
  out_trade_no: string;
  /** 交易状态 */
  trade_state: string;
  /** 交易金额 */
  amount: string;
  /** 用户标识 */
  openid: string;
  /** 签名 */
  sign: string;
};
