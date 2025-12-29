<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { t } from '@/locale'
import { commentUsingPost } from '@/service'
import { useUserStore } from '@/store'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  articleId: {
    type: [String, Number],
    default: '',
  },
  paging: {
    type: Object as PropType<ZPagingRef | null>,
    default: null,
  },
  replyTo: {
    type: Object as PropType<{
      id: string
      author: {
        nickname: string
        username: string
      }
    } | null>,
    default: null,
  },
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'comment': []
  'open': []
  'close': []
}>()

const userStore = useUserStore()
const commentContent = ref('')
const showEmojiPanel = ref<boolean>(false)
const showImagePanel = ref<boolean>(false)
const currentKeyboardHeight = ref<number>(0)
const { keyboardHeight: storeKeyboardHeight } = storeToRefs(userStore)
const keyboardListenerRegistered = ref<boolean>(false)
const isLoading = ref(false)
const previousReplyTo = ref(props.replyTo)
const isKeyboardVisible = ref(false)
const textareaIsFocused = ref(false)
const commentTextarea = ref<HTMLTextAreaElement>()
const inputMode = ref<'text' | 'none'>('text')
onMounted(() => {
  // 组件挂载时不设置 currentKeyboardHeight
  // 只有当键盘真正弹起时才使用存储的高度
})

async function handleSubmitComment() {
  if (!commentContent.value.trim()) {
    return
  }
  try {
    isLoading.value = true
    console.log('提交评论', props.replyTo)
    await commentUsingPost({
      body: {
        articleId: Number(props.articleId),
        content: commentContent.value,
        parentId: props.replyTo?.id ? Number(props.replyTo?.id) : undefined,
      },
    })

    try {
      props.paging.reload()
    }
    catch {
      const pagings = props.paging as any
      pagings?.reload()
    }
  }
  finally {
    isLoading.value = false
    commentContent.value = ''
  }

  emit('update:modelValue', false)
  emit('comment')
}

function handleEmojiClick() {
  if (currentKeyboardHeight.value > 0) {
    // #ifdef APP-PLUS || MP-WEIXIN
    uni.hideKeyboard()
    // #endif
  }

  showEmojiPanel.value = !showEmojiPanel.value
  showImagePanel.value = false

  // 表情面板显示时，设置inputmode为none防止键盘弹出
  if (showEmojiPanel.value) {
    inputMode.value = 'none'
  }
  else {
    inputMode.value = 'text'
  }
}

function handleImageClick() {
  if (currentKeyboardHeight.value > 0) {
    // #ifdef APP-PLUS || MP-WEIXIN
    uni.hideKeyboard()
    // #endif
  }

  // showImagePanel.value = !showImagePanel.value
  selectImage()
  showEmojiPanel.value = false
}

function selectEmoji(emoji: string) {
  // 获取光标位置
  uni.getSelectedTextRange({
    success: (res) => {
      const { end, start } = res
      // 插入表情符
      commentContent.value = commentContent.value.slice(0, start) + emoji + commentContent.value.slice(end)
    },
  })
}

function selectImage() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      console.log('选中图片', res.tempFilePaths[0])
    },
  })
}

// 键盘高度变化监听函数
function handleKeyboardHeightChange(res: any) {
  if (res.height > 0) {
    // 键盘弹起
    isKeyboardVisible.value = true
    inputMode.value = 'text' // 键盘弹起时，确保inputmode为text

    // 优先使用存储的高度（已经测量过的准确高度）
    if (storeKeyboardHeight.value > 0) {
      currentKeyboardHeight.value = storeKeyboardHeight.value
    }
    else {
      // 第一次获取键盘高度，存储起来
      currentKeyboardHeight.value = res.height
      userStore.setKeyboardHeight(res.height)
    }

    showEmojiPanel.value = false
    showImagePanel.value = false
  }
  else {
    // 键盘收起 - 必须设置为 0，因为键盘已经隐藏
    isKeyboardVisible.value = false
    currentKeyboardHeight.value = 0
    // 不重置 store 中的键盘高度，保持持久化
  }
}

function handleInputFocus(e: any) {
  if (!showEmojiPanel.value && !showImagePanel.value) {
    showEmojiPanel.value = false
    showImagePanel.value = false
    // 正常输入时，设置inputmode为text
    inputMode.value = 'text'
  }

  // #ifdef APP-PLUS || MP-WEIXIN
  if (!keyboardListenerRegistered.value) {
    uni.onKeyboardHeightChange(handleKeyboardHeightChange)
    keyboardListenerRegistered.value = true
  }
  // #endif
}

function handleInputBlur() {
}

onUnmounted(() => {
  // #ifdef APP-PLUS || MP-WEIXIN
  if (keyboardListenerRegistered.value) {
    uni.offKeyboardHeightChange(handleKeyboardHeightChange)
    keyboardListenerRegistered.value = false
  }
  // #endif
})

const placeholderText = computed(() => {
  if (props.replyTo) {
    return `${t('component.comment.reply')} ${props.replyTo.author?.nickname || props.replyTo.author?.username || ''}`
  }
  return t('component.comment.placeholder')
})

watch(() => props.replyTo, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    commentContent.value = ''
  }
  if (!newVal && oldVal) {
    commentContent.value = ''
  }
  previousReplyTo.value = newVal
})

watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (newVal) {
      emit('open')
    }
    else {
      emit('close')
      showEmojiPanel.value = false
      showImagePanel.value = false
      isKeyboardVisible.value = false
      inputMode.value = 'text' // 重置inputmode为text
      if (props.replyTo) {
        commentContent.value = ''
      }

      uni.hideKeyboard()
      currentKeyboardHeight.value = 0 // 确保重置为 0
      // 不重置 store，保持持久化
    }
  }
})

// 计算外层包裹容器的样式（用于添加 paddingBottom 顶起整个弹窗）
const wrapperStyle = computed(() => {
  const style: any = {}

  // 当键盘弹起且没有显示表情/图片面板时，添加 paddingBottom
  if (isKeyboardVisible.value && !showEmojiPanel.value && !showImagePanel.value) {
    style.paddingBottom = `${currentKeyboardHeight.value}px`
  }

  return style
})

// 计算弹窗内容的样式
const contentStyle = computed(() => {
  const style: any = {
    maxHeight: '60vh',
    overflow: 'hidden',
  }

  // 当显示表情面板时，固定高度
  if (showEmojiPanel.value) {
    style.height = '60vh'
  }

  return style
})

// 计算输入区域的最大高度
const textareaMaxHeight = computed(() => {
  if (showEmojiPanel.value) {
    return 'calc(60vh - 260px)' // 减去工具栏和表情面板的高度
  }
  if (isKeyboardVisible.value && !showEmojiPanel.value && !showImagePanel.value) {
    return '200px' // 键盘弹起时的高度
  }
  return '300px' // 默认高度
})
</script>

<template>
  <wd-popup
    :z-index="9999" :model-value="modelValue" root-portal position="bottom" custom-class="rounded-t-xl"
    :safe-area-inset-bottom="false" :closable="false" @update:model-value="emit('update:modelValue', $event)"
  >
    <!-- 外层包裹容器：添加 paddingBottom 顶起整个弹窗 -->
    <view class="transition-all duration-300" :style="wrapperStyle">
      <!-- 弹窗内容容器：固定高度，防止滚动 -->
      <view class="flex flex-col rounded-t-xl bg-white" :style="contentStyle">
        <!-- 输入区域 - 可滚动 -->
        <view
          class="flex-1 overflow-y-auto p-4" :style="{
            maxHeight: textareaMaxHeight,
          }"
        >
          <view class="relative h-full w-full">
            <textarea
              ref="commentTextarea"
              v-model="commentContent"
              :inputmode="inputMode"
              :focus="textareaIsFocused"
              class="comment-textarea h-full w-full resize-none border-none outline-none" style="min-height: 120px;"
              :maxlength="2000" :auto-focus="false" :placeholder="placeholderText" :adjust-position="false"
              @focus="handleInputFocus" @blur="handleInputBlur"
            />
            <view class="absolute bottom-1 right-1 text-xs text-gray-400">
              {{ commentContent.length }}/2000
            </view>
          </view>
        </view>

        <!-- 底部操作栏 - 固定不滚动 -->
        <view class="flex flex-shrink-0 flex-col border-t border-gray-100">
          <!-- 工具栏 -->
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center gap-4">
              <view
                class="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                :class="showEmojiPanel ? 'bg-blue-100' : ''" @touchend.prevent="handleEmojiClick"
              >
                <view class="i-lucide:smile size-5" :class="showEmojiPanel ? 'text-primary/80' : 'text-gray-600'" />
              </view>

              <view
                class="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                :class="showImagePanel ? 'bg-blue-100' : ''" @touchend.prevent="handleImageClick"
              >
                <view class="i-lucide:image size-5" :class="showImagePanel ? 'text-primary/80' : 'text-gray-600'" />
              </view>
            </view>

            <wd-button
              class="rounded-full px-4 py-2 text-sm text-white" size="small"
              :disabled="commentContent.trim() === '' || isLoading" @click="handleSubmitComment"
            >
              发送
            </wd-button>
          </view>

          <!-- 表情面板 -->
          <view v-if="showEmojiPanel && currentKeyboardHeight === 0" class="border-t border-gray-100 bg-white p-3">
            <view class="h-[200px] flex flex-wrap gap-2 overflow-y-auto">
              <text
                v-for="(emoji, index) in ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨']"
                :key="index" class="cursor-pointer rounded p-2 text-2xl hover:bg-gray-100"
                @touchend.prevent="selectEmoji(emoji)"
              >
                {{ emoji }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<style scoped>
.comment-textarea::placeholder {
  font-size: 8px;
  color: #999;
}
</style>
