<script lang="ts" setup>
import type { ArticleEntity } from '@/types/api/article'
import { getRect } from 'wot-design-uni/components/common/util'
import wdLoading from 'wot-design-uni/components/wd-loading/wd-loading.vue'
import { useToast } from 'wot-design-uni/components/wd-toast'
import { articleIdUsingGet } from '@/service'
import { currRoute } from '@/utils'
import { navigateBack } from '@/utils/router'
import ArticleFooter from './components/articleFooter.vue'
import AuthorElement from './components/authorElement.vue'

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
const authorOffsetTop = ref(0)
// 添加加载状态
const isLoading = ref(true)

// 作者元素距离导航栏距离
// z-paging ref
const paging = ref()
const authorElementRef = ref<InstanceType<typeof AuthorElement>>()
const isOffset = ref(false)

// 处理滚动
async function handleScroll(event: ZPagingParams.ScrollInfo) {
  const scrollTop = event.detail.scrollTop
  if (authorOffsetTop.value === 0) {
    const res = await getRect('#author-element', false, proxy)
    authorOffsetTop.value = res.top
  }
  isOffset.value = scrollTop >= authorOffsetTop.value
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

// 处理评论
function handleComment() {
  // TODO: 实现评论功能
  console.log('打开评论')
}

async function fetchArticle() {

}

onLoad(async () => {
  try {
    // 请求数据
    const res = await articleIdUsingGet({
      params: {
        id,
      },
    })
    article.value = res as ArticleEntity
  }
  catch (error) {
    toast.error(error)
  }
  finally {
    isLoading.value = false
  }
})

function handleClickLeft() {
  navigateBack()
}
</script>

<template>
  <z-paging
    ref="paging" class="h-full" :refresher-enabled="false" use-cache cache-mode="always"
    :cache-key="`article-detail-${id}`" safe-area-inset-top safe-area-inset-bottom @scroll="handleScroll"
  >
    <template #top>
      <wd-navbar safe-area-inset-top left-arrow @click-left="handleClickLeft">
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
                  <ImageCache width="100%" height="100%" :src="article?.author?.avatar || ''" border-radius="9999px" />
                </view>
                <text class="line-clamp-1 text-ellipsis text-sm">
                  {{ article?.author.nickname || article?.author.username
                  }}
                </text>
              </view>
            </wd-transition>
          </view>
        </template>
        <template #right>
          <template v-if="!isOffset">
            <view class="flex items-center gap-1">
              <i class="i-lucide:ellipsis-vertical size-6" />
            </view>
          </template>
          <template v-else>
            <view
              class="h-5 flex items-center gap-1 border border-primary rounded-full border-solid px-2 py-1 text-sm text-primary"
            >
              <text @click="authorElementRef?.handleClickFollow">
                {{ $t(article.author.isFollowed ? 'article.followed'
                  : 'article.follow') }}
              </text>
              <i class="i-lucide:ellipsis-vertical size-5 text-unset" />
            </view>
          </template>
        </template>
      </wd-navbar>
    </template>

    <view class="h-full flex flex-col">
      <!-- 全屏加载状态 -->
      <view v-if="isLoading" class="h-[calc(100vh-88px-var(--status-bar-height))] flex flex-col items-center justify-center p-4">
        <wd-loading size="24px" />
        <text class="mt-4 text-gray-500">{{ $t('common.loading') }}</text>
      </view>

      <!-- 文章内容 -->
      <view v-if="article && !isLoading" class="flex flex-1 flex-col">
        <view class="flex-1">
          <view class="p-4">
            <text class="text-xl font-bold">{{ article.title }}</text>
          </view>

          <!-- 发布者 -->
          <author-element
            id="author-element" ref="authorElementRef" :article="article"
            @update:follow-status="handleFollowStatusUpdate"
          />

          <!-- 文章内容 -->
          <view class="p-4">
            <rich-text
              v-if="!['article.loginRequired', 'article.membershipRequired'].includes(article.content)"
              class="white-space-pre-wrap" :nodes="article.content"
            />
            <!-- 渲染图片 -->
            <block v-for="url in article.images" :key="url">
              <view class="mb-1">
                <ImageCache border-radius="4px" use-cache width="100%" mode="widthFix" :src="url" />
              </view>
            </block>
          </view>
        </view>
      </view>

      <!-- 加载错误状态 -->
      <view v-if="!article && !isLoading" class="h-[calc(100vh-88px-var(--status-bar-height))] flex flex-col items-center justify-center p-4">
        <i class="i-lucide:alert-circle mb-4 size-12 text-gray-400" />
        <text class="text-gray-500">{{ $t('common.loadFailed') }}</text>
        <wd-button type="primary" size="small" class="mt-4" @click="onLoad">
          {{ $t('common.retry') }}
        </wd-button>
      </view>
    </view>

    <template #bottom>
      <articleFooter
        v-if="article" :article="article" @update:like-status="handleLikeStatusUpdate"
        @update:like-count="handleLikeCountUpdate" @comment="handleComment"
      />
    </template>
    <wd-toast />
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
