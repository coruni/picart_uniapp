1. **问题分析**：

   * article/index.vue 中存在两个重复的 onBackPress 函数，导致冲突

   * 多个组件（articleFooter、imagePreview）都有各自的 onBackPress 处理

   * 当返回时，需要确保所有弹窗都关闭，而不是直接返回

2. **修复方案**：

   * 移除 article/index.vue 中重复的 onBackPress 函数（第192-197行）

   * 合并所有弹窗状态处理到一个 onBackPress 函数中

   * 确保 imagePreviewVisible、showMoreMenu、isPopupOpen 三个状态都被检查

   * 保持子组件的 onBackPress 不变，因为它们是独立组件

3. **修改文件**：

   * `src/pages/article/index.vue`：合并 onBackPress 函数

4. **修复后效果**：

   * 点击返回按钮时，先检查并关闭所有弹窗

   * 只有当所有弹窗都关闭后，才会执行返回操作

   * 防止弹窗未关闭就返回的问题

   * 避免 onBackPress 函数冲突

