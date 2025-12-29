<script setup lang="ts">
import type { ArticleEntity } from '@/api/types/article'
import { storeToRefs } from 'pinia'
import ImageCache from '@/components/imageCache.vue'
import { t } from '@/locale'
import { articleIdLikeUsingPost } from '@/service'
import { useUserStore } from '@/store'
import CommentPopup from './commentPopup.vue'

const props = defineProps({
  article: {
    type: Object as () => ArticleEntity,
    default: () => ({}),
  },
  paging: {
    type: Object as PropType<ZPagingRef>,
    default: null,
  },
  showButton: {
    type: Boolean,
    default: true,
  },
  showCommentPopup: {
    type: Boolean,
    default: false,
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
  (e: 'update:likeStatus', status: boolean): void
  (e: 'update:likeCount', count: number): void
  (e: 'comment'): void
  (e: 'update:showCommentPopup', value: boolean): void
}>()

const showCommentPopup = ref<boolean>(props.showCommentPopup)
const isDirectClick = ref(false)

const replyTo = ref<{
  id: string
  author: {
    nickname: string
    username: string
  }
} | null>(props.replyTo)
watch(() => props.replyTo, (newVal) => {
  replyTo.value = newVal
}, { immediate: true, deep: true })

watch(() => props.showCommentPopup, (newVal) => {
  showCommentPopup.value = newVal
})

watch(showCommentPopup, (newVal) => {
  emit('update:showCommentPopup', newVal)
})

function setReply(comment: any) {
  isDirectClick.value = false
  replyTo.value = {
    id: comment.id.toString(),
    author: {
      nickname: comment.author?.nickname || '',
      username: comment.author?.username || '',
    },
  }
  showCommentPopup.value = true
}

function clearReply() {
  replyTo.value = props.replyTo
}

defineExpose({
  setReply,
  clearReply,
})

const { userInfo } = storeToRefs(useUserStore())
const likeLoading = ref(false)

async function handleClickLike() {
  if (likeLoading.value) {
    return
  }
  try {
    likeLoading.value = true
    const currentStatus = props.article.isLiked || false
    const currentCount = props.article.likes || 0

    await articleIdLikeUsingPost({
      params: {
        id: String(props.article.id),
      },
      body: {
        reactionType: 'like',
      },
    })

    emit('update:likeStatus', !currentStatus)
    emit('update:likeCount', currentStatus ? currentCount - 1 : currentCount + 1)
  }
  finally {
    likeLoading.value = false
  }
}

function handleClickComment() {
  isDirectClick.value = true
  showCommentPopup.value = !showCommentPopup.value
}

function handleCommentSubmit() {
  isDirectClick.value = false
  emit('comment')
}

watch(showCommentPopup, (newVal) => {
  if (newVal && isDirectClick.value && replyTo.value) {
    replyTo.value = props.replyTo
    isDirectClick.value = false
  }
  emit('update:showCommentPopup', newVal)
})
</script>

<template>
  <view class="relative h-12 flex items-center gap-2 px-4">
    <view class="flex flex-1 items-center" @click.self="handleClickComment">
      <view class="block h-8 flex flex-1 items-center gap-2 rounded-full bg-[#f5f5f5] px-2" @click="handleClickComment">
        <ImageCache :src="userInfo?.avatar || ''" border-radius="9999px" height="24px" width="24px" />
        <text class="text-sm text-sm text-[#999999]">{{ t('article.comment') }}</text>
      </view>
    </view>
    <view v-if="showButton" class="flex items-center justify-around gap-2">
      <view class="flex flex-col cursor-pointer items-center justify-center px-2 text-[#999999]" @click="handleClickLike">
        <i
          class="i-lucide-message-circle size-4"
        />
        <text class="text-sm">
          {{ article?.commentCount || 0 }}
        </text>
      </view>
      <view class="flex flex-col cursor-pointer items-center justify-center px-2" @click="handleClickLike">
        <i
          class="size-4" :class="[
            article?.isLiked ? 'i-lucide-heart text-[#ff6b6b]' : 'i-lucide-heart text-[#999999]',
          ]"
        />
        <text class="text-sm" :class="article?.isLiked ? 'text-[#ff6b6b]' : 'text-[#999999]'">
          {{ article?.likes || 0 }}
        </text>
      </view>
    </view>
    <view class="top-border-only" />

    <CommentPopup
      v-model="showCommentPopup" :article-id="article.id" :paging="paging" :reply-to="replyTo"
      @comment="handleCommentSubmit"
    />
  </view>
</template>

<style scoped>
.top-border-only {
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 1px;
  left: 0;
  top: 0;
  transform: scaleY(0.5);
  background: var(--wot-color-border-light, #e8e8e8);
}
</style>
