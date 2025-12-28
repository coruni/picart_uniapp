<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import type { CommentEntity } from '@/api/types/comments'
import { getRect } from 'wot-design-uni/components/common/util'
import wdLoading from 'wot-design-uni/components/wd-loading/wd-loading.vue'
import { useToast } from 'wot-design-uni/components/wd-toast'
import ImagePreview from '@/components/imagePreview.vue'
import { t } from '@/locale/index'
import { articleIdUsingGet, commentArticleIdUsingGet } from '@/service'
import { currRoute } from '@/utils'
import { checkPermission } from '@/utils/permission'
import { navigateBack } from '@/utils/router'
import ArticleFooter from './components/articleFooter.vue'
import AuthorElement from './components/authorElement.vue'
import CommentItem from './components/commentItem.vue'

const { proxy } = getCurrentInstance()!
const { id } = currRoute().query
const toast = useToast()
definePage({
  style: {
    navigationBarTitleText: '%article.detail%',
  },
})

// 使用ref来存储文章数据，初始值为空对象
const article = ref<ArticleEntity>()
const comments = ref<CommentEntity[]>([])
const authorOffsetTop = ref(0)
// 添加加载状态
const isLoading = ref(true)
const commentSort = ref('all')
const commentSortOptions = ref([
  {
    label: '全部',
    value: 'all',
  },
  {
    label: '最新',
    value: 'new',
  },
  {
    label: '最热',
    value: 'hot',
  },
])

// 作者元素距离导航栏距离
// z-paging ref
const paging = ref<ZPagingRef | null>(null)
const showMoreMenu = ref<boolean>(false)
const authorElementRef = ref<InstanceType<typeof AuthorElement>>()
const articleFooterRef = ref<InstanceType<typeof ArticleFooter>>()
const isOffset = ref(false)
const scrollTop = ref(0)
const isPopupOpen = ref(false)

const imagePreviewVisible = ref(false)
const imagePreviewIndex = ref(0)

// 处理滚动
async function handleScroll(event: ZPagingParams.ScrollInfo) {
  scrollTop.value = event.detail.scrollTop
  if (authorOffsetTop.value === 0) {
    const res = await getRect('#author-element', false, proxy)
    authorOffsetTop.value = res.top
  }
  isOffset.value = scrollTop.value >= authorOffsetTop.value
}

// 处理关注状态更新
function handleFollowStatusUpdate(newStatus: boolean) {
  if (article.value && article.value.author) {
    article.value.author.isFollowed = newStatus
  }
}

// 处理点赞状态更新
function handleLikeStatusUpdate(newStatus: boolean) {
  if (article.value) {
    article.value.isLiked = newStatus
  }
}

// 处理点赞数量更新
function handleLikeCountUpdate(newCount: number) {
  if (article.value) {
    article.value.likes = newCount
  }
}

// 处理分享
function handleShare() {
  showMoreMenu.value = false
  // TODO: 实现分享功能
  toast.show('分享功能开发中')
}

// 处理收藏
function handleFavorite() {
  showMoreMenu.value = false
  if (article.value) {
    article.value.isFavorited = !article.value.isFavorited
    toast.show(article.value.isFavorited ? '已收藏' : '已取消收藏')
  }
}

// 处理举报
function handleReport() {
  showMoreMenu.value = false
  // TODO: 实现举报功能
  toast.show('举报功能开发中')
}

// 处理复制链接
function handleCopyLink() {
  showMoreMenu.value = false
  let url: string
  // 复制当前页面链接
  // #ifdef H5
  url = `${window.location.origin}/pages/article/index?id=${id}`
  // #endif

  // #ifndef H5
  url = `/pages/article/index?id=${id}`
  // #endif

  uni.setClipboardData({
    data: url,
    success: () => {
      toast.show('链接已复制')
    },
    fail: () => {
      toast.error('复制失败')
    },
  })
}

async function fetchComments(page: number, limit: number) {
  // 获取文章评论列表
  try {
    const res = await commentArticleIdUsingGet({
      params: {
        id: Number(id),
        page,
        limit,
      },
    })
    paging.value?.complete(res.data as CommentEntity[])
  }
  catch {
    paging.value?.complete(false)
  }
}

// 处理排序改变
function handleSortChange(newSort: string) {
  commentSort.value = newSort
  // 重置分页
  paging.value?.reload()
}

onLoad(async () => {
  // 先尝试从缓存中获取文章
  const cachedArticle = uni.getStorageSync(`article-detail-${id}`)
  if (cachedArticle) {
    article.value = JSON.parse(cachedArticle) as ArticleEntity
    isLoading.value = false
    return
  }
  try {
    // 请求数据
    const res = await articleIdUsingGet({
      params: {
        id,
      },
    })
    article.value = res as unknown as ArticleEntity
    // 比对更新数据
    Object.assign(article.value, res)
    // 将文章缓存
    uni.setStorageSync(`article-detail-${id}`, JSON.stringify(article.value))
  }
  catch (error) {
    toast.error(error)
  }
  finally {
    isLoading.value = false
  }
})

onBackPress(() => {
  if (imagePreviewVisible.value || isPopupOpen.value) {
    imagePreviewVisible.value = false
    isPopupOpen.value = false
    return true
  }
})

function handleClickLeft() {
  navigateBack()
}

onBackPress((options) => {
  if (showMoreMenu.value) {
    showMoreMenu.value = false
    return true
  }
  if (isPopupOpen.value) {
    isPopupOpen.value = false
    return true
  }
  return false
})

function handleReply(comment: CommentEntity) {
  articleFooterRef.value?.setReply(comment)
}

// 计算时间 分钟前 小时前 几天前 最后是具体时间
function formatTime(time: string) {
  const now = new Date()
  const articleTime = new Date(time)
  const diff = now.getTime() - articleTime.getTime()
  const diffMinutes = Math.floor(diff / 1000 / 60)
  const diffHours = Math.floor(diff / 1000 / 60 / 60)
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24)
  if (diffMinutes < 1) {
    return '刚刚'
  }
  if (diffHours < 1) {
    return `${diffMinutes}分钟前`
  }
  if (diffDays < 1) {
    return `${diffHours}小时前`
  }
  if (diffDays < 7) {
    return `${diffDays}天前`
  }
  const year = articleTime.getFullYear()
  const month = String(articleTime.getMonth() + 1).padStart(2, '0')
  const day = String(articleTime.getDate()).padStart(2, '0')
  const hour = String(articleTime.getHours()).padStart(2, '0')
  const minute = String(articleTime.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const articleTime = computed(() => formatTime(article.value?.createdAt || ''))
function handleComment() {
  paging.value.reload()
}

function handleImageClick(index: number) {
  imagePreviewIndex.value = index
  imagePreviewVisible.value = true
}
</script>

<template>
  <z-paging
    ref="paging" v-model="comments" :auto-scroll-to-top-when-reload="false" auto-show-back-to-top class="h-full"
    :refresher-enabled="false" use-cache cache-mode="always" :cache-key="`article-comment-${id}`" safe-area-inset-top
    safe-area-inset-bottom :auto-clean-list-when-reload="false" :auto-hide-loading-after-first-loaded="false"
    @query="fetchComments" @scroll="handleScroll"
  >
    <template #top>
      <wd-navbar safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft">
        <template #left>
          <view class="flex items-center gap-1">
            <wd-icon name="arrow-left" size="24" />
            <wd-transition
              :show="isOffset" enter-class="translateUp-enter-from"
              enter-active-class="translateUp-enter-active" enter-to-class="translateUp-enter-to"
              leave-class="translateUp-leave" leave-active-class="translateUp-leave-active"
              leave-to-class="translateUp-leave-to"
            >
              <view class="relative z-20 flex items-center gap-1">
                <view class="size-5">
                  <ImageCache
                    border-radius="9999px" use-cache width="100%" height="100%"
                    :src="article?.author?.avatar || ''"
                  />
                </view>
                <text class="line-clamp-1 text-ellipsis text-sm">
                  {{ article?.author?.nickname || article?.author?.username
                  }}
                </text>
              </view>
            </wd-transition>
          </view>
        </template>
        <template #right>
          <template v-if="!isOffset">
            <view class="flex items-center gap-1" @click="() => showMoreMenu = !showMoreMenu">
              <i class="i-lucide:ellipsis-vertical size-6" />
            </view>
          </template>
          <template v-else>
            <view
              class="h-5 flex items-center gap-1 border border-primary rounded-full border-solid px-2 py-1 text-sm text-primary"
            >
              <text @click="authorElementRef?.handleClickFollow">
                {{ t(article?.author?.isFollowed ? 'article.followed'
                  : 'article.follow') }}
              </text>
              <i class="i-lucide:ellipsis-vertical size-5 text-unset" @click="() => showMoreMenu = !showMoreMenu" />
            </view>
          </template>
        </template>
      </wd-navbar>
    </template>
    <view class="h-full flex flex-1 flex-col">
      <view v-if="isLoading" class="h-full flex flex-col items-center justify-center p-4">
        <wd-loading size="24px" />
        <text class="mt-4 text-gray-500">{{ t('common.loading') }}</text>
      </view>
      <view v-else class="flex flex-1 flex-col">
        <view class="flex-1">
          <view class="px-4 pt-4">
            <text class="text-xl font-bold">{{ article?.title }}</text>
          </view>
          <view class="flex items-center gap-2 px-4 py-2 text-xs">
            <view class="flex items-center gap-1 text-gray-500">
              <i class="i-lucide:clock size-3" />
              <text>{{ articleTime }}</text>
            </view>
            <view v-if="checkPermission('article:manage')" class="flex items-center gap-2">
              <view class="flex items-center text-primary">
                <i class="i-lucide-pen size-3" />
                <text>编辑</text>
              </view>
              <view class="flex items-center text-red-500">
                <i class="i-lucide-trash size-3" />
                <text>删除</text>
              </view>
            </view>
          </view>

          <author-element
            id="author-element" ref="authorElementRef" :article="article"
            @update:follow-status="handleFollowStatusUpdate"
          />
          <view class="p-4">
            <rich-text
              v-if="!['article.loginRequired', 'article.membershipRequired', 'article.paymentRequired'].includes(article?.content || '')"
              class="white-space-pre-wrap" :nodes="article?.content"
            />
            <block v-for="(url, index) in article?.images" :key="url">
              <view class="mb-1">
                <ImageCache
                  border-radius="4px" use-cache width="100%" mode="widthFix" :src="url" viewport-lazy-load
                  :viewport-threshold="100" @click="handleImageClick(index)"
                />
              </view>
            </block>
          </view>
          <view v-if="article?.tags?.length" class="px-4 pt-2 space-x-2 space-y-2">
            <block v-for="tag in article?.tags" :key="tag.id">
              <wd-tag size="small" round plain type="primary" custom-class="rounded-full!">
                {{ tag.name }}
              </wd-tag>
            </block>
          </view>
        </view>
        <view class="my-4 h-1 bg-gray-100" />
        <view class="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-2">
          <view class="text-sm font-medium">
            <text>{{ t('article.commentPlaceholder') }}</text>
          </view>
          <view class="text-sm text-gray-500">
            <CommonSelect v-model="commentSort" :options="commentSortOptions" @select="handleSortChange" />
          </view>
        </view>
        <view>
          <block v-for="item in comments" :key="item.id">
            <commentItem
              :comment="(item as CommentEntity)" :article-id="article?.id" :paging="paging"
              @reply="handleReply"
            />
          </block>
        </view>
      </view>
    </view>

    <template #bottom>
      <article-footer
        v-if="article" ref="articleFooterRef" v-model:show-comment-popup="isPopupOpen" :article="article"
        :paging="paging" @comment="handleComment" @update:like-status="handleLikeStatusUpdate"
        @update:like-count="handleLikeCountUpdate"
      />
    </template>
    <wd-toast />
    <!-- 组件区 -->
    <!-- 更多菜单区域 -->
    <wd-popup
      v-model="showMoreMenu" root-portal custom-class="rounded-t-xl" safe-area-inset-bottom closable
      position="bottom"
    >
      <view class="p-4">
        <view class="mb-4 text-center text-lg font-medium">
          {{ t('article.moreOptions') }}
        </view>

        <!-- 菜单项列表 -->
        <view class="space-y-2">
          <!-- 分享文章 -->
          <view class="flex items-center justify-between rounded-lg p-3 hover:bg-gray-100" @click="handleShare">
            <view class="flex items-center">
              <view class="i-lucide:share-2 mr-3 size-5 text-gray-700" />
              <text class="text-gray-800">分享文章</text>
            </view>
            <view class="i-lucide:chevron-right size-5 text-gray-400" />
          </view>

          <!-- 收藏文章 -->
          <view class="flex items-center justify-between rounded-lg p-3 hover:bg-gray-100" @click="handleFavorite">
            <view class="flex items-center">
              <view
                class="i-lucide:bookmark mr-3 size-5"
                :class="article?.isFavorited ? 'text-blue-500' : 'text-gray-700'"
              />
              <text class="text-gray-800">{{ article?.isFavorited ? '取消收藏' : '收藏文章' }}</text>
            </view>
            <view class="i-lucide:chevron-right size-5 text-gray-400" />
          </view>

          <!-- 举报文章 -->
          <view class="flex items-center justify-between rounded-lg p-3 hover:bg-gray-100" @click="handleReport">
            <view class="flex items-center">
              <view class="i-lucide:flag mr-3 size-5 text-gray-700" />
              <text class="text-gray-800">举报文章</text>
            </view>
            <view class="i-lucide:chevron-right size-5 text-gray-400" />
          </view>

          <!-- 复制链接 -->
          <view class="flex items-center justify-between rounded-lg p-3 hover:bg-gray-100" @click="handleCopyLink">
            <view class="flex items-center">
              <view class="i-lucide:link mr-3 size-5 text-gray-700" />
              <text class="text-gray-800">复制链接</text>
            </view>
            <view class="i-lucide:chevron-right size-5 text-gray-400" />
          </view>
        </view>

        <!-- 取消按钮 -->
        <view class="mt-6">
          <view
            class="rounded-lg bg-gray-100 p-3 text-center text-gray-800 font-medium"
            @click="() => showMoreMenu = false"
          >
            取消
          </view>
        </view>
      </view>
    </wd-popup>

    <ImagePreview
      v-model="imagePreviewVisible"
      :images="article?.images"
      :article="article"
      show-author
      :current-index="imagePreviewIndex"
    />
  </z-paging>
</template>

<style lang="scss" scoped>
//定义动画
:deep(.translateUp-enter-active),
:deep(.translateUp-leave-active) {
  transition: all 0.2s ease;
}

:deep(.translateUp-enter-from),
:deep(.translateUp-leave-to) {
  transform: translateY(16px);
  opacity: 0;
}

:deep(.translateUp-enter-to),
:deep(.translateUp-leave-from) {
  transform: translateY(0);
  opacity: 1;
}

// 只显示上边框的样式
.top-border-only {
  border-top: 1px solid #e5e5e5;
  border-right: none;
  border-bottom: none;
  border-left: none;
}
</style>
