<script lang="ts" setup>
import type { CategoryEntity } from '@/api/types/category'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import { addUnit, getRect } from 'wot-design-uni/components/common/util'
import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging'
import { useAppStore } from '@/store'
import Article from './components/article.vue'

const paging = ref<ZPagingRef>()

// 类似mixins，如果是页面滚动务必要写这一行，并传入当前ref绑定的paging，注意此处是paging，而非paging.value
useZPaging(paging)

// 其他省略
const { categories } = storeToRefs(useAppStore())
definePage({
  style: {
    navigationBarTitleText: '%tabbar.circle%',
  },
})

const articleRef = ref<InstanceType<typeof Article>>()

const { proxy } = getCurrentInstance()
const filterCategories = computed(() => categories.value?.filter(item => !item.link) || [])
// 默认选择第一个
const currentCategory = ref<CategoryEntity | null>(categories.value?.[0] as CategoryEntity | null)
// 计算导航栏高度
const navbarHeight = ref(0)
onReady(() => {
  // #ifdef APP
  getRect('#navbar', false, proxy).then((rect) => {
    navbarHeight.value = rect.height
  })

  // #endif
})
const marginTop = ref<string>()
const tabsStickyTop = ref<string>()
// #ifdef H5
marginTop.value = addUnit(180 - 36)
tabsStickyTop.value = '0px'
// #endif
// #ifdef APP-PLUS
marginTop.value = addUnit(180 - navbarHeight.value - 128)
tabsStickyTop.value = `${navbarHeight.value}px`
// #endif

// 计算子分类 返回tab列表
const subCategories = computed(() => {
  if (!currentCategory.value) {
    return []
  }
  return currentCategory.value.children?.map(item => ({
    id: item.id,
    name: item.id,
    title: item.name,
    avatar: item.avatar || item.cover,
  })) || []
})

const currentTab = ref<string>(String(subCategories.value[0]?.id || ''))

function handleTabChange({ index, name }: { index: number, name: string }) {
  if (currentTab.value !== String(name)) {
    currentTab.value = String(name)
    nextTick(() => {
      articleRef.value?.reload()
    })
  }
}
</script>

<template>
  <z-paging ref="paging">
    <template #top>
      <view class="relative z-10 h-48 flex flex-col">
        <wd-navbar placeholder custom-class="bg-transparent!" :bordered="false" />
        <scroll-view scroll-x enable-flex show-scrollbar class="scroll-view-container w-full flex-1">
          <view class="h-full flex items-center whitespace-nowrap px-4 space-x-2">
            <view
              v-for="item in filterCategories" :key="item.id"
              class="inline-flex flex-col items-center justify-center space-y-1" @click="currentCategory = item"
            >
              <view
                :class="currentCategory?.id === item.id ? 'size-12' : 'size-10'"
                class="overflow-hidden rounded-md bg-white/20 transition-all"
              >
                <ImageCache
                  :src="item.avatar || item.cover" mode="aspectFill" border-radius="6px" width="100%"
                  height="100%" :use-cache="true"
                />
              </view>
              <view v-if="currentCategory?.id === item.id" class="text-sm text-white font-bold">
                {{ item.name }}
              </view>
            </view>
          </view>
        </scroll-view>
        <wd-tabs v-model="currentTab" slidable="always" custom-class="mt-auto rounded-t-xl overflow-hidden " @change="handleTabChange">
          <block v-for="item in subCategories" :key="item.id">
            <wd-tab :title="item.title" :name="String(item.id || '')" />
          </block>
        </wd-tabs>
      </view>
      <view class="fixed left-0 top-0 z-0 h-48 w-full">
        <ImageCache
          use-cache height="100%" width="100%" mode="aspectFill"
          src="https://minicdn.cosfan.cc/cosplay/uploads/2025/12/09/1765292726327-75odw9-cosfan_cc_001.webp"
        />
        <view class="absolute left-0 top-0 h-full w-full bg-black/20" />
      </view>
    </template>
    <!-- 渲染文章列表 -->
    <Article ref="articleRef" :category-id="currentTab" />
    <template #bottom>
      <view class="h-50px" />
    </template>
  </z-paging>
</template>

<style lang="scss" scoped>
  :deep(.zp-paging-container-content) {
  flex: 1;
}
</style>
