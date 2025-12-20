<script lang="ts" setup>
import type { ArticleEntity } from '@/types/api/article'

import { articleUsingGet } from '@/service'
import { useAppStore } from '@/store/index'

defineOptions({
  name: 'Home',
})
const appStore = useAppStore()
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '%tabbar.home%',
  },
})

// 循环生成
const articleData = ref<ArticleEntity[]>([])
const paging = ref<ZPagingRef>()
const hiddenNavbar = ref<boolean>(false)

async function fetchData(page: number, limit: number) {
  const res = await articleUsingGet({
    params: {
      page,
      limit,
    },
  })
  paging.value?.complete(res.data || [])
}

function handleScroll(event: ZPagingParams.ScrollInfo) {
  if (event.detail.scrollTop > 50) {
    hiddenNavbar.value = true
  }
  else {
    hiddenNavbar.value = false
  }
}
</script>

<template>
  <z-paging
    ref="paging" v-model="articleData" cache-mode="always" cache-key="home-article-list" use-cache
    @query="fetchData" @scroll="handleScroll"
  >
    <template #top>
      <view class="px-1">
        <wd-navbar safe-area-inset-top placeholder :bordered="false">
          <template #left>
            <text
              class="from-[#000000] via-[#333333] to-[#666666] bg-gradient-to-r bg-clip-text text-3xl text-transparent font-bold"
            >
              {{
                appStore.appConfig.site_name || '' }}
            </text>
          </template>
          <template #right>
            <view class="flex items-center space-x-1">
              <wd-button type="icon" size="small">
                <view class="i-lucide:search size-5" />
              </wd-button>
              <wd-button type="icon" size="small">
                <view class="i-lucide-mail size-5" />
              </wd-button>
            </view>
          </template>
        </wd-navbar>
      </view>
    </template>
    <view class="grid grid-cols-2 gap-1 px-1">
      <block v-for="article in articleData" :key="article.id">
        <ArticleCard :article="article as ArticleEntity" />
      </block>
    </view>

    <template #bottom>
      <!-- 自定义tabbar占位 -->
      <view class="h-50px" />
    </template>
  </z-paging>
</template>

<style scoped>
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;

  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}
</style>
