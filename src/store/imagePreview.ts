import type { ArticleEntity } from '@/api/types/article'
import { defineStore } from 'pinia'

export const useImagePreviewStore = defineStore('imagePreview', () => {
  const isPreview = ref(false)
  const currentIdx = ref(0)
  const showIndicators = ref(true)
  const displayImages = ref<string[]>([])
  const article = ref<Partial<ArticleEntity>>({})

  function showPreview(images: string[], index: number, articleData: ArticleEntity) {
    displayImages.value = images
    currentIdx.value = index
    article.value = articleData
    isPreview.value = true
  }

  function hidePreview() {
    isPreview.value = false
  }

  return {
    isPreview,
    currentIdx,
    showIndicators,
    displayImages,
    article,
    showPreview,
    hidePreview,
  }
})
