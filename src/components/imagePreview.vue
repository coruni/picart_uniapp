<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import ImageCache from './imageCache.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
  showAuthor: {
    type: Boolean,
    default: false,
  },
  article: {
    type: Object as PropType<ArticleEntity>,
    default: () => ({}),
  },
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  showIndicators: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  'update:modelValue': [boolean]
  'change': [number]
}>()

// 当前图片索引
const currentIdx = ref(props.currentIndex)
// 触摸相关状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchCurrentX = ref(0)
const touchCurrentY = ref(0)
const isSwiping = ref(false)
const swipeDistance = ref(0)

// 图片变换状态
const imageStates = ref<Record<number, {
  scale: number
  rotation: number
  translateX: number
  translateY: number
}>>({})

// 多指触控
const initialDistance = ref(0)
const initialScale = ref(1)
const lastTouchTime = ref(0)
const lastTouchX = ref(0)
const lastTouchY = ref(0)
const isPinching = ref(false)
const lastTouchCount = ref(0)
const hasMoved = ref(false)

// 获取当前图片状态
function getCurrentState(index: number) {
  if (!imageStates.value[index]) {
    imageStates.value[index] = {
      scale: 1,
      rotation: 0,
      translateX: 0,
      translateY: 0,
    }
  }
  return imageStates.value[index]
}

// 重置变换
function resetTransform(index: number) {
  imageStates.value[index] = {
    scale: 1,
    rotation: 0,
    translateX: 0,
    translateY: 0,
  }
  swipeDistance.value = 0
}

// 监听属性变化
watch(() => props.currentIndex, (newVal) => {
  currentIdx.value = newVal
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    currentIdx.value = props.currentIndex
    resetTransform(currentIdx.value)
  }
  else {
    // 关闭时清理状态
    nextTick(() => {
      imageStates.value = {}
      swipeDistance.value = 0
      isSwiping.value = false
    })
  }
})

// 关闭查看器
function handleClose() {
  emit('update:modelValue', false)
}

// 切换到指定索引
function switchToIndex(index: number) {
  if (index < 0 || index >= props.images.length)
    return
  currentIdx.value = index
  emit('change', index)
  resetTransform(index)
}

// 缩放控制
function handleZoomIn() {
  const state = getCurrentState(currentIdx.value)
  state.scale = Math.min(state.scale + 0.25, 3)
}

function handleZoomOut() {
  const state = getCurrentState(currentIdx.value)
  state.scale = Math.max(state.scale - 0.25, 0.5)
}

// 旋转控制
function handleRotateLeft() {
  const state = getCurrentState(currentIdx.value)
  state.rotation -= 90
}

function handleRotateRight() {
  const state = getCurrentState(currentIdx.value)
  state.rotation += 90
}

// 重置
function handleReset() {
  resetTransform(currentIdx.value)
}

// 触摸开始
function handleTouchStart(e: any) {
  const touches = e.touches
  const state = getCurrentState(currentIdx.value)

  lastTouchCount.value = touches.length
  hasMoved.value = false

  if (touches.length === 1) {
    // 只有在非缩放状态下才记录起始位置
    if (!isPinching.value) {
      touchStartX.value = touches[0].clientX
      touchStartY.value = touches[0].clientY
      touchCurrentX.value = touches[0].clientX
      touchCurrentY.value = touches[0].clientY

      // 双击检测 - 增加位置判断
      const now = Date.now()
      const timeDiff = now - lastTouchTime.value
      const positionDiff = Math.hypot(
        touches[0].clientX - lastTouchX.value,
        touches[0].clientY - lastTouchY.value,
      )

      // 双击条件：时间间隔小于300ms，且位置偏移小于30px，且没有移动过
      if (timeDiff < 300 && positionDiff < 30 && !hasMoved.value) {
        // 双击缩放
        if (state.scale > 1) {
          resetTransform(currentIdx.value)
        }
        else {
          state.scale = 2
        }
      }
      lastTouchTime.value = now
      lastTouchX.value = touches[0].clientX
      lastTouchY.value = touches[0].clientY
    }
  }
  else if (touches.length === 2) {
    // 进入缩放模式
    isPinching.value = true
    const touch1 = touches[0]
    const touch2 = touches[1]
    initialDistance.value = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY,
    )
    initialScale.value = state.scale

    // 记录缩放中心点作为新的起始点
    const centerX = (touch1.clientX + touch2.clientX) / 2
    const centerY = (touch1.clientY + touch2.clientY) / 2
    touchStartX.value = centerX
    touchStartY.value = centerY
    touchCurrentX.value = centerX
    touchCurrentY.value = centerY
  }
}

// 触摸移动
function handleTouchMove(e: any) {
  const touches = e.touches
  const state = getCurrentState(currentIdx.value)

  // 标记已移动
  hasMoved.value = true

  // 手指数量变化，重置状态
  if (touches.length !== lastTouchCount.value) {
    lastTouchCount.value = touches.length
    if (touches.length === 1) {
      // 从双指变为单指，更新起始位置
      touchStartX.value = touches[0].clientX
      touchStartY.value = touches[0].clientY
      touchCurrentX.value = touches[0].clientX
      touchCurrentY.value = touches[0].clientY
      isPinching.value = false
    }
    else if (touches.length === 2) {
      // 从单指变为双指，进入缩放模式
      isPinching.value = true
      const touch1 = touches[0]
      const touch2 = touches[1]
      initialDistance.value = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY,
      )
      initialScale.value = state.scale
    }
    return
  }

  if (touches.length === 1) {
    const currentX = touches[0].clientX
    const currentY = touches[0].clientY

    const deltaX = currentX - touchStartX.value
    const deltaY = currentY - touchStartY.value

    // 如果图片已放大，则拖动图片
    if (state.scale > 1) {
      state.translateX += currentX - touchCurrentX.value
      state.translateY += currentY - touchCurrentY.value
      touchCurrentX.value = currentX
      touchCurrentY.value = currentY
    }
    // 否则检测左右滑动切换图片（只在非缩放状态下）
    else if (!isPinching.value && Math.abs(deltaX) > Math.abs(deltaY)) {
      isSwiping.value = true
      swipeDistance.value = deltaX
    }
  }
  else if (touches.length === 2) {
    const touch1 = touches[0]
    const touch2 = touches[1]
    const currentDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY,
    )
    const distanceRatio = currentDistance / initialDistance.value
    state.scale = Math.min(Math.max(initialScale.value * distanceRatio, 0.5), 3)
  }
}

// 触摸结束
function handleTouchEnd(e: any) {
  const state = getCurrentState(currentIdx.value)

  // 如果还有手指在屏幕上，更新起始位置
  if (e.touches.length > 0) {
    lastTouchCount.value = e.touches.length
    if (e.touches.length === 1) {
      touchStartX.value = e.touches[0].clientX
      touchStartY.value = e.touches[0].clientY
      touchCurrentX.value = e.touches[0].clientX
      touchCurrentY.value = e.touches[0].clientY
      isPinching.value = false
    }
    return
  }

  // 所有手指都离开屏幕
  lastTouchCount.value = 0

  // 如果是滑动且图片未放大
  if (isSwiping.value && state.scale <= 1) {
    const threshold = 80 // 切换阈值

    if (Math.abs(swipeDistance.value) > threshold) {
      if (swipeDistance.value > 0 && currentIdx.value > 0) {
        // 向右滑动，显示上一张
        switchToIndex(currentIdx.value - 1)
      }
      else if (swipeDistance.value < 0 && currentIdx.value < props.images.length - 1) {
        // 向左滑动，显示下一张
        switchToIndex(currentIdx.value + 1)
      }
    }
  }

  // 重置滑动状态
  swipeDistance.value = 0
  isSwiping.value = false
  isPinching.value = false
  touchStartX.value = 0
  touchStartY.value = 0
}

// 计算需要渲染的图片索引（当前、前一张、后一张）
const visibleIndices = computed(() => {
  const indices = [currentIdx.value]
  if (currentIdx.value > 0) {
    indices.unshift(currentIdx.value - 1)
  }
  if (currentIdx.value < props.images.length - 1) {
    indices.push(currentIdx.value + 1)
  }
  return indices
})

// 计算图片样式
function getImageStyle(index: number) {
  const state = getCurrentState(index)
  const offset = (index - currentIdx.value) * 100

  // 如果是当前图片且正在滑动
  const swipeOffset = index === currentIdx.value ? (swipeDistance.value / 3.75) : 0

  return {
    transform: `
      translateX(calc(${offset}% + ${swipeOffset}% + ${state.translateX}px)) 
      translateY(${state.translateY}px) 
      scale(${state.scale}) 
      rotate(${state.rotation}deg)
    `,
    transition: isSwiping.value || isPinching.value || state.scale > 1 ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }
}

// 计算容器样式
function getContainerStyle(index: number) {
  const offset = (index - currentIdx.value) * 100
  const swipeOffset = index === currentIdx.value ? (swipeDistance.value / 3.75) : 0

  return {
    transform: `translateX(calc(${offset}% + ${swipeOffset}%))`,
    transition: isSwiping.value ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }
}

// 透明占位图（1x1 透明 PNG）
const transparentPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

// 缩略图滚动相关
const scrollIntoViewId = ref('')

// 自动滚动到当前缩略图
function scrollToThumbnail(index: number) {
  scrollIntoViewId.value = `thumbnail-${index}`
}

// 监听当前索引变化，自动滚动
watch(currentIdx, (newIndex) => {
  scrollToThumbnail(newIndex)
})

defineExpose({
  show: (index: number) => {
    currentIdx.value = index
    emit('update:modelValue', true)
  },
  hide: () => {
    emit('update:modelValue', false)
  },
})
onBackPress(() => {
  if (props.modelValue) {
    handleClose()
    return true
  }
  return false
})
</script>

<template>
  <view v-if="modelValue" class="fixed bottom-0 left-0 right-0 top-0 z-9999 flex flex-col">
    <status-bar />
    <!-- 背景遮罩 -->
    <view
      class="absolute bottom-0 left-0 right-0 top-0 z-1 h-full w-full bg-black/80 transition-opacity duration-300"
      :class="modelValue ? 'opacity-100' : 'opacity-0'" @click="handleClose"
    />

    <!-- 图片容器 -->
    <view class="relative z-2 flex-1 overflow-hidden">
      <view
        v-for="index in visibleIndices" :key="index"
        class="absolute inset-0 h-full w-full flex items-center justify-center"
        :style="getContainerStyle(index)" @touchstart="handleTouchStart"
        @touchmove.stop.prevent="handleTouchMove" @touchend="handleTouchEnd"
      >
        <ImageCache
          :show-skeleton="false" :fade-show="false" :placeholder="transparentPlaceholder"
          :lazy-load="false" :viewport-lazy-load="false" :src="images[index]" :style="getImageStyle(index)"
          height="100%" width="100%" mode="aspectFit" @click.stop
        />
      </view>
    </view>
    <!-- 关闭按钮 -->
    <view class="absolute right-6 top-6 z-3 flex items-center justify-center">
      <view class="size-8 flex items-center justify-center rounded-full bg-black/50" @click="handleClose">
        <i class="i-lucide-x text-white" />
      </view>
    </view>
    <template v-if="props.showAuthor">
      <view class="absolute bottom-1/4 right-0 z-3 mr-3 flex flex-col items-center justify-center space-y-2">
        <view class="relative">
          <view class="size-8">
            <image-cache
              :src="props.article?.author?.avatar" use-cache height="100%" width="100%"
              border-radius="999px" border
            />
          </view>
          <view class="absolute left-1/2 box-border size-4 flex flex-shrink-0 items-center justify-center rounded-full bg-primary text-white -bottom-2 -translate-x-1/2">
            <i class="i-lucide-plus size-3 font-bold" />
          </view>
        </view>
        <view class="text-white font-bold">
          {{ props.article?.author?.nickname || props.article?.author?.username }}
        </view>
        <view class="flex flex-col items-center justify-center px-2 text-white font-bold">
          <i class="i-lucide-heart" />
          <text class="text-sm">{{ props.article?.likes || 0 }}</text>
        </view>
        <view class="flex flex-col items-center justify-center px-2 text-white font-bold">
          <i class="i-lucide-message-circle" />
          <text class="text-sm">{{ props.article?.commentCount || 0 }}</text>
        </view>
      </view>
    </template>

    <!-- 联动缩略图指示器 -->
    <template v-if="props.showIndicators">
      <view class="absolute bottom-10 left-0 right-0 z-3 flex justify-center">
        <scroll-view :scroll-into-view="scrollIntoViewId" scroll-x class="max-w-full" scroll-with-animation>
          <view class="box-border flex items-center px-4 py-2 space-x-2">
            <view
              v-for="(url, index) in props.images"
              :id="`thumbnail-${index}`"
              :key="index"
              class="relative box-border h-12 w-12 flex-shrink-0 rounded transition-all duration-300"
              :class="[
                index === currentIdx ? 'shadow-[0_0_0_3px_#3b82f6]' : 'border border-white/30 ',
              ]"
              @click.stop="switchToIndex(index)"
            >
              <ImageCache
                :src="url"
                height="100%"
                width="100%"
                border-radius="4px"
                mode="aspectFill"
              />
            </view>
          </view>
        </scroll-view>
      </view>
    </template>

    <!-- 指示器 -->
    <!-- <view class="absolute bottom-20 left-0 right-0 z-3 flex justify-center">
      <view class="rounded-full bg-black/50 px-4 py-2 text-sm text-white">
        {{ currentIdx + 1 }} / {{ images.length }}
      </view>
    </view> -->

    <!-- 控制栏 -->
    <!-- <view class="absolute bottom-0 left-0 right-0 z-3 flex items-center justify-around bg-black/50 p-4">
      <view class="h-10 w-10 flex items-center justify-center" @click.stop="handleZoomOut">
        <text class="text-xl text-white">-</text>
      </view>
      <view class="h-10 w-10 flex items-center justify-center" @click.stop="handleZoomIn">
        <text class="text-xl text-white">+</text>
      </view>
      <view class="h-10 w-10 flex items-center justify-center" @click.stop="handleRotateLeft">
        <text class="text-xl text-white">↶</text>
      </view>
      <view class="h-10 w-10 flex items-center justify-center" @click.stop="handleRotateRight">
        <text class="text-xl text-white">↷</text>
      </view>
      <view class="h-10 w-10 flex items-center justify-center" @click.stop="handleReset">
        <text class="text-sm text-white">重置</text>
      </view>
    </view> -->
  </view>
</template>
