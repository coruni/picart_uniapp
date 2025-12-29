import { t } from '@/locale'

export function formatTime(time: string): string {
  const now = new Date()
  const articleTime = new Date(time)
  const diff = now.getTime() - articleTime.getTime()
  const diffMinutes = Math.floor(diff / 1000 / 60)
  const diffHours = Math.floor(diff / 1000 / 60 / 60)
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24)

  if (diffMinutes < 1) {
    return t('component.time.justNow')
  }
  if (diffHours < 1) {
    return t('component.time.minutesAgo', { count: diffMinutes })
  }
  if (diffDays < 1) {
    return t('component.time.hoursAgo', { count: diffHours })
  }
  if (diffDays <= 3) {
    return t('component.time.daysAgo', { count: diffDays })
  }
  const month = String(articleTime.getMonth() + 1).padStart(2, '0')
  const day = String(articleTime.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

export function formatTimeWithDate(time: string): string {
  const now = new Date()
  const articleTime = new Date(time)
  const diff = now.getTime() - articleTime.getTime()
  const diffMinutes = Math.floor(diff / 1000 / 60)
  const diffHours = Math.floor(diff / 1000 / 60 / 60)
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24)

  if (diffMinutes < 1) {
    return t('component.time.justNow')
  }
  if (diffHours < 1) {
    return t('component.time.minutesAgo', { count: diffMinutes })
  }
  if (diffDays < 1) {
    return t('component.time.hoursAgo', { count: diffHours })
  }
  if (diffDays <= 3) {
    return t('component.time.daysAgo', { count: diffDays })
  }
  const month = String(articleTime.getMonth() + 1).padStart(2, '0')
  const day = String(articleTime.getDate()).padStart(2, '0')
  return `${month}-${day}`
}
