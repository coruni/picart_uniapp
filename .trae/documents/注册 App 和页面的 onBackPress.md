## 注册 onBackPress 计划

### 1. 修改 App.ku.vue
- 导入 `registerAppOnBackPress`
- 添加 App 级别的 onBackPress 函数，处理图片预览的全局返回
- 使用 `registerAppOnBackPress` 注册

### 2. 修改 article/index.vue  
- 将第 193-209 行的 `onBackPress` 生命周期改为使用 `registerPageOnBackPress` 注册
- 保持现有的返回逻辑（处理图片预览、更多菜单、评论弹窗）