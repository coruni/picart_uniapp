// onBackPress 执行顺序管理
// 用于确保页面级别的 onBackPress 先执行，然后再执行 App 级别的 onBackPress

// 存储页面级别的 onBackPress 函数
let pageOnBackPress: ((options: any) => boolean) | null = null

// 存储 App 级别的 onBackPress 函数
let appOnBackPress: ((options: any) => boolean) | null = null

// 注册页面级别的 onBackPress 函数
export function registerPageOnBackPress(fn: (options: any) => boolean) {
  pageOnBackPress = fn
}

// 注册 App 级别的 onBackPress 函数
export function registerAppOnBackPress(fn: (options: any) => boolean) {
  appOnBackPress = fn
}

// 统一的 onBackPress 处理函数
export function unifiedOnBackPress(options: any) {
  // 先执行页面级别的 onBackPress 函数
  if (pageOnBackPress) {
    const pageResult = pageOnBackPress(options)
    if (pageResult) {
      // 如果页面级别的 onBackPress 返回 true，阻止默认行为，不执行 App 级别的 onBackPress
      return true
    }
  }

  // 如果页面级别的 onBackPress 返回 false，执行 App 级别的 onBackPress 函数
  if (appOnBackPress) {
    const appResult = appOnBackPress(options)
    if (appResult) {
      // 如果 App 级别的 onBackPress 返回 true，阻止默认行为
      return true
    }
  }

  // 如果都返回 false，执行默认的返回行为
  return false
}
