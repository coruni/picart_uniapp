<script lang="ts" setup>
import type { ArticleEntity } from '@/types/api'
import { useToast } from 'wot-design-uni/components/wd-toast'
import { articleIdUsingGet } from '@/service'
import { currRoute } from '@/utils'

const { id } = currRoute().query
const toast = useToast()
definePage({
  style: {
    navigationBarTitleText: '文章详情',
  },
})

// 使用ref来存储文章数据，初始值为空对象
const article = ref<ArticleEntity>({})
// 添加加载状态
const isLoading = ref(true)

// 使用onMounted生命周期钩子来加载数据
onMounted(async () => {
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
  uni.navigateBack()
}
</script>

<template>
  <view class="min-h-screen flex flex-col">
    <wd-navbar
      :title="article.title" placeholder safe-area-inset-top left-arrow fixed
      @click-left="handleClickLeft"
    />
    <view class="p-4">
      <text class="text-xl font-bold">{{ article.title }}</text>
    </view>
    <!-- 发布者 -->
    <view class="px-4">
      <view class="box-border w-full rounded-xl bg-[rgba(0,0,0,0.9)] p-3">
        <view class="flex items-center space-x-2">
          <view class="size-10">
            <ImageCache
              border-radius="9999px" use-cache width="100%" height="100%"
              :src="article.author.avatar || ''"
            />
          </view>
          <view class="h-full">
            <view class="text-sm text-white font-bold">
              {{ article.author.nickname || article.author.username }}
            </view>
            <view class="line-clamp-1 text-ellipsis">
              <wd-text size="10px" color="#eeeeeeac" :text="article.author.description || ''" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 文章内容 -->
    <view class="p-4">
      <rich-text
        v-if="!['article.loginRequired', 'article.membershipRequired'].includes(article.content)"
        class="white-space-pre-wrap" :nodes="article.content"
      />
      <!-- 渲染图片 -->
      <block v-for="url in article.images" :key="url">
        <ImageCache border-radius="4px" use-cache width="100%" mode="widthFix" :src="url" />
      </block>
    </view>

    <wd-toast />
  </view>
</template>

<style lang="scss" scoped></style>
