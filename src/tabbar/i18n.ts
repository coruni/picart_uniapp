import { t } from '@/locale'
import { isCurrentPageTabbar } from '@/utils'
import { isNativeTabbar, tabbarList } from './config'

// h5 中一直可以生效，小程序里面默认是无法动态切换的，这里借助vue模板自带响应式的方式
// 直接替换 %xxx% 为 t('xxx')即可
export function getI18nText(key: string) {
  // 检查key是否为空
  if (!key) {
    console.warn('[i18n] getI18nText: key is empty')
    return ''
  }

  // 获取 %xxx% 中的 xxx
  const match = key.match(/%(.+?)%/)
  if (match) {
    key = match[1]
  }

  console.log('设置多语言：', key)
  try {
    return t(key)
  }
  catch (error) {
    console.error('[i18n] getI18nText: error getting text for key', key, error)
    return key // 返回原始key作为fallback
  }
}

export function setTabbarItem() {
// 只有使用原生Tabbar才需要 setTabbarItem
// 而且只有当前页是tabbar页才能设置
  console.log('设置多语言：setTabBarItem', isNativeTabbar, isCurrentPageTabbar())
  if (isNativeTabbar && isCurrentPageTabbar()) {
    tabbarList.forEach((item, index) => {
      uni.setTabBarItem({
        index,
        text: getI18nText(item.text),
      })
    })
  }
}
