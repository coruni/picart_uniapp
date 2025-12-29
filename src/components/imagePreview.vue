<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { getCurrentInstance } from 'vue'
import { getRect } from 'wot-design-uni/components/common/util'
import { t } from '@/locale'
import ArticleFooter from '@/pages/article/components/articleFooter.vue'
import { currRoute } from '@/utils'

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
  enableInnerBackPress: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [boolean]
  'change': [number]
}>()

const { proxy } = getCurrentInstance()

// 获取当前实例中的路由信息
const { path } = currRoute()
const { id } = currRoute().query
const showCommentPopup = ref<boolean>(false)
const isArticlePreview = path === '/pages/article/index'
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

// 控件显示状态
const showControls = ref(true)

// 触摸位置
const touchPosition = ref({ x: 0, y: 0 })

// 更新控件可见性
function updateControlsVisibility() {
  const state = getCurrentState(currentIdx.value)
  // 如果图片放大，隐藏控件；否则显示控件
  showControls.value = state.scale <= 1
}

const originalStatusBarStyle = ref<'dark' | 'light'>()
if (uni.getSystemInfoSync().platform === 'android') {
  originalStatusBarStyle.value = plus.navigator.getStatusBarStyle() as 'dark' | 'light'
}
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
  updateControlsVisibility()
}

// 监听属性变化
watch(() => props.currentIndex, (newVal) => {
  currentIdx.value = newVal
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    currentIdx.value = props.currentIndex
    resetTransform(currentIdx.value)
    updateControlsVisibility()
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
  updateControlsVisibility()
}

// 缩放控制
function handleZoomIn() {
  const state = getCurrentState(currentIdx.value)
  state.scale = Math.min(state.scale + 0.25, 3)
  updateControlsVisibility()
}

function handleZoomOut() {
  const state = getCurrentState(currentIdx.value)
  state.scale = Math.max(state.scale - 0.25, 0.5)
  updateControlsVisibility()
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
  updateControlsVisibility()
}

// 触摸开始
function handleTouchStart(e: any) {
  const touches = e.touches
  const state = getCurrentState(currentIdx.value)

  lastTouchCount.value = touches.length
  hasMoved.value = false

  // 只有在图片未放大时才显示控件
  if (state.scale <= 1) {
    showControls.value = true
  }

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
        updateControlsVisibility()
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

  // 更新触摸位置
  if (touches.length === 1) {
    touchPosition.value = {
      x: touches[0].clientX,
      y: touches[0].clientY,
    }

    // 图片放大时触摸不显示控件
  }

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

      // 边界检查：如果没有上一张图片且向右滑动，则不响应
      if (deltaX > 0 && currentIdx.value === 0) {
        swipeDistance.value = 0
        return
      }

      // 边界检查：如果没有下一张图片且向左滑动，则不响应
      if (deltaX < 0 && currentIdx.value === props.images.length - 1) {
        swipeDistance.value = 0
        return
      }

      // 使用缓动函数使滑动更自然
      const swipeRatio = Math.min(Math.abs(deltaX) / 200, 1)
      const easedSwipe = swipeRatio * swipeRatio * (3 - 2 * swipeRatio) // smoothstep函数
      swipeDistance.value = deltaX * (0.5 + easedSwipe * 0.5)
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
    updateControlsVisibility()
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
    const velocity = Math.abs(swipeDistance.value) / 10 // 计算滑动速度

    // 根据滑动距离和速度决定是否切换
    if (Math.abs(swipeDistance.value) > threshold || velocity > 5) {
      if (swipeDistance.value > 0 && currentIdx.value > 0) {
        // 向右滑动，显示上一张
        switchToIndex(currentIdx.value - 1)
      }
      else if (swipeDistance.value < 0 && currentIdx.value < props.images.length - 1) {
        // 向左滑动，显示下一张
        switchToIndex(currentIdx.value + 1)
      }
      // 如果滑动方向超出边界，使用弹性动画回到原位
      else {
        swipeDistance.value = 0
      }
    }
    // 如果滑动距离不足，使用弹性动画回到原位
    else {
      // 使用弹性动画回到原位
      swipeDistance.value = 0
    }
  }

  // 重置滑动状态
  swipeDistance.value = 0
  isSwiping.value = false
  isPinching.value = false
  touchStartX.value = 0
  touchStartY.value = 0
}

// 鼠标滚轮缩放
function handleWheel(e: WheelEvent) {
  e.preventDefault()
  const state = getCurrentState(currentIdx.value)

  // 使用getRect获取元素信息
  getRect('.image-preview-container', false, proxy).then((rect) => {
    if (!rect)
      return
    // 计算鼠标位置相对于图片容器的坐标
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // 计算缩放前的中心点偏移
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // 计算鼠标相对于中心点的偏移
    const offsetX = mouseX - centerX
    const offsetY = mouseY - centerY

    // 计算缩放因子
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.min(Math.max(state.scale * scaleFactor, 0.5), 3)

    // 如果缩放有变化
    if (newScale !== state.scale) {
      // 计算缩放后的偏移，使鼠标位置成为缩放中心
      const scaleRatio = newScale / state.scale - 1
      state.translateX -= offsetX * scaleRatio
      state.translateY -= offsetY * scaleRatio
      state.scale = newScale
      updateControlsVisibility()
    }
  })
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

  // 计算透明度，非当前图片在滑动时降低透明度
  const opacity = isSwiping.value && index !== currentIdx.value
    ? Math.max(1 - Math.abs(swipeDistance.value) / 200, 0.3)
    : 1

  // 计算过渡效果，滑动时使用弹性过渡
  const transition = isSwiping.value || isPinching.value || state.scale > 1
    ? 'none'
    : `transform ${Math.abs(swipeDistance.value) > 80 ? 0.4 : 0.3}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease`

  return {
    opacity,
    transform: `
      translateX(calc(${offset}% + ${swipeOffset}% + ${state.translateX}px)) 
      translateY(${state.translateY}px) 
      scale(${state.scale}) 
      rotate(${state.rotation}deg)
    `,
    transition,
  }
}

// 计算容器样式
function getContainerStyle(index: number) {
  const offset = (index - currentIdx.value) * 100
  const swipeOffset = index === currentIdx.value ? (swipeDistance.value / 3.75) : 0

  // 计算缩放效果，当前图片保持原大小，相邻图片略微缩小
  const scale = index === currentIdx.value ? 1 : (isSwiping.value ? 0.95 : 0.98)

  // 计算阴影效果，当前图片有阴影
  const shadow = index === currentIdx.value ? '0 0 20px rgba(0, 0, 0, 0.3)' : 'none'

  // 计算过渡效果，滑动时使用弹性过渡
  const transition = isSwiping.value
    ? 'none'
    : `transform ${Math.abs(swipeDistance.value) > 80 ? 0.4 : 0.3}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease, box-shadow 0.3s ease`

  return {
    transform: `translateX(calc(${offset}% + ${swipeOffset}%)) scale(${scale})`,
    transition,
    boxShadow: shadow,
    zIndex: index === currentIdx.value ? 2 : 1,
  }
}

// 黑色占位图（1x1 黑色 PNG）
const blackPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='

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

function handleOriginalClick() {
  console.log('handleOriginalClick called', { isArticlePreview, articleId: props.article?.id, path })
  if (!isArticlePreview && props.article?.id) {
    handleClose()
    uni.navigateTo({
      url: `/pages/article/index?id=${props.article?.id}`,
    })
  }
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    // #ifdef APP
    // 图片预览背景是黑色，状态栏图标应该是浅色
    plus.navigator.setStatusBarStyle('light')
    // #endif
  }
  else {
    // #ifdef APP
    // 恢复原始状态栏样式
    plus.navigator.setStatusBarStyle(originalStatusBarStyle.value)
    // #endif
  }
})

onMounted(() => {
  // 确保组件被挂载齁更改状态栏 // 因为有v-if 和modelVal的情况
  // #ifdef APP
  // 图片预览背景是黑色，状态栏图标应该是浅色
  if (props.enableInnerBackPress) {
    plus.navigator.setStatusBarStyle('light')
  }
  // #endif

  // 根据图片缩放状态初始化控件显示
  updateControlsVisibility()
})

onBeforeUnmount(() => {
  // 组件卸载时，恢复原始状态栏样式
  // #ifdef APP
  if (props.enableInnerBackPress) {
    plus.navigator.setStatusBarStyle(originalStatusBarStyle.value)
  }
  // #endif
})

if (props.enableInnerBackPress) {
  onBackPress(() => {
    if (showCommentPopup.value) {
      showCommentPopup.value = false
      return true
    }

    if (props.modelValue) {
      handleClose()
      return true
    }

    return false
  })
}
</script>

<template>
  <view v-if="modelValue" class="fixed bottom-0 left-0 right-0 top-0 z-9999 flex flex-col">
    <status-bar />
    <!-- 背景遮罩 -->
    <view
      class="absolute bottom-0 left-0 right-0 top-0 z-1 h-full w-full bg-black transition-opacity duration-300"
      :class="modelValue ? 'opacity-100' : 'opacity-0'" @click="handleClose"
    />

    <!-- 图片容器 -->
    <view class="image-preview-container relative z-2 flex-1">
      <view
        v-for="index in visibleIndices" :key="index"
        class="absolute inset-0 h-full w-full flex items-center justify-center" :style="getContainerStyle(index)"
        @touchstart="handleTouchStart" @touchmove.stop.prevent="handleTouchMove" @touchend="handleTouchEnd"
        @wheel="handleWheel"
      >
        <ImageCache
          skeleton-color="transparent" :show-skeleton="false" :lazy-load="true" transparent-background
          :src="images[index]" :style="getImageStyle(index)" height="100%" width="100%" mode="aspectFit" @click.stop
        />
      </view>
    </view>
    <!-- 关闭按钮 -->

    <view class="absolute right-6 top-12 z-3 flex items-center justify-center">
      <wd-transition
        :show="showControls"
        enter-class="controls-enter-from"
        enter-active-class="controls-enter-active"
        enter-to-class="controls-enter-to"
        leave-class="controls-leave-from"
        leave-active-class="controls-leave-active"
        leave-to-class="controls-leave-to"
      >
        <view class="size-8 flex items-center justify-center" @click="handleClose">
          <i class="i-lucide-x text-white" />
        </view>
      </wd-transition>
    </view>

    <!-- 两列布局 items-end -->

    <view class="absolute bottom-0 left-0 z-3 box-border w-full pb-1">
      <wd-transition
        :show="showControls"
        enter-class="controls-enter-from"
        enter-active-class="controls-enter-active"
        enter-to-class="controls-enter-to"
        leave-class="controls-leave-from"
        leave-active-class="controls-leave-active"
        leave-to-class="controls-leave-to"
      >
        <view class="flex flex-col">
          <view class="flex items-end px-4 space-x-8">
            <view class="flex flex-1 flex-col">
              <view class="text-xs text-white space-x-1">
                <text>{{ article?.title }}</text>
                <text v-if="!isArticlePreview" class="text-primary" @click="handleOriginalClick">
                  {{ t('component.imagePreview.original') }}
                </text>
              </view>
            </view>
            <view class="flex flex-col items-center justify-center mr-2! space-y-4">
              <view class="relative">
                <view class="size-10">
                  <image-cache
                    :src="props.article?.author?.avatar" use-cache height="100%" width="100%"
                    border-radius="999px" transparent-background :show-skeleton="false" lazy-load border
                  />
                </view>
                <view
                  class="absolute left-1/2 box-border size-4 flex flex-shrink-0 items-center justify-center border border-white rounded-full border-solid bg-primary text-white -bottom-2 -translate-x-1/2"
                >
                  <i class="i-lucide-plus size-3 font-bold" />
                </view>
              </view>
              <view class="text-white font-bold">
                {{ props.article?.author?.nickname || props.article?.author?.username }}
              </view>
              <view class="flex flex-col items-center justify-center px-2 text-white font-bold">
                <i class="i-lucide-heart text-lg" />
                <text class="text-sm">{{ props.article?.likes || 0 }}</text>
              </view>
              <view class="flex flex-col items-center justify-center px-2 text-white font-bold">
                <i class="i-lucide-message-circle text-lg" />
                <text class="text-sm">{{ props.article?.commentCount || 0 }}</text>
              </view>
              <view class="flex flex-col items-center justify-center px-2 text-white font-bold">
                <i class="i-lucide-star text-lg" />
                <text class="text-sm">{{ props.article?.commentCount || 0 }}</text>
              </view>
            </view>
          </view>
          <ArticleFooter v-model:show-comment-popup="showCommentPopup" :article="article" :show-button="false" dark />
        </view>
      </wd-transition>
      <!-- 透明遮罩 -->
      <view
        v-show="showControls"
        class="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full -z-1"
        style="background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);"
      />
    </view>

    <!-- 指示器 -->
    <!-- <view class="absolute bottom-20 left-0 right-0 z-3 flex justify-center">
      <view class="rounded-full bg-black/50 px-4 py-2 text-sm text-white">
        {{ currentIdx + 1 }} / {{ images.length }}
      </view>
    </view> -->
  </view>
</template>

<style>
/* 控件淡入动画 */
:deep(.controls-enter-from) {
  opacity: 0;
  transform: translateY(20px);
}

:deep(.controls-enter-active) {
  transition: all 0.3s ease-out;
}

:deep(.controls-enter-to) {
  opacity: 1;
  transform: translateY(0);
}

/* 控件淡出动画 */
:deep(.controls-leave-from) {
  opacity: 1;
  transform: translateY(0);
}

:deep(.controls-leave-active) {
  transition: all 0.3s ease-in;
}

:deep(.controls-leave-to) {
  opacity: 0;
  transform: translateY(20px);
}
</style>
