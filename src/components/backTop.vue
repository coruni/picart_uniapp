<script setup lang="ts">
import type { _ZPagingRef } from 'z-paging/types/comps/z-paging'

const props = defineProps({
  scrollTop: {
    type: Number,
    default: 0,
  },
  scrollTopThreshold: {
    type: Number,
    default: 200,
  },
  paging: {
    type: Object as PropType<_ZPagingRef>,
    default: () => { },
  },
})
function scrollToTop() {
  // 使用传入的实例
  props.paging.scrollToTop(true)
}
</script>

<template>
  <wd-transition :show="scrollTop > scrollTopThreshold" name="fade-right" :duration="300">
    <view class="fixed bottom-20 right-4" @click="scrollToTop">
      <view class="size-7 flex items-center justify-center rounded-full bg-white shadow-md">
        <i class="i-lucide-chevron-up" />
      </view>
    </view>
  </wd-transition>
</template>
