<script lang="ts" setup>
import { t } from '@/locale'
import { LOGIN_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { getLastPage } from '@/utils'
import { navigateBack, navigateTo, reLaunch } from '@/utils/router'

definePage({
  style: {
    navigationBarTitleText: t('login.title'),
    backgroundColor: '#ffffff',
  },
})
const formValue = reactive({
  account: '',
  password: '',
})

// 跟踪输入框焦点状态
const accountFocused = ref(false)
const passwordFocused = ref(false)

// 表单错误信息
const accountError = ref('')
const passwordError = ref('')

// 是否显示密码
const showPassword = ref(false)

// 登录按钮loading状态
const loading = ref(false)

// 校验函数
function validateAccount(): boolean {
  const val = formValue.account
  if (!val) {
    accountError.value = t('login.accountRequired')
    return false
  }
  if (val.length < 3) {
    accountError.value = t('login.accountMinLength')
    return false
  }
  // 可以是用户名或邮箱
  const isUsername = /^\w{3,20}$/.test(val)
  const isEmail = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(val)
  if (!isUsername && !isEmail) {
    accountError.value = t('login.accountInvalid')
    return false
  }
  accountError.value = ''
  return true
}

function validatePassword(): boolean {
  const val = formValue.password
  if (!val) {
    passwordError.value = t('login.passwordRequired')
    return false
  }
  if (val.length < 6) {
    passwordError.value = t('login.passwordMinLength')
    return false
  }
  // 检查密码复杂度：至少包含字母和数字
  const hasLetter = /[a-z]/i.test(val)
  const hasNumber = /\d/.test(val)
  if (!hasLetter || !hasNumber) {
    passwordError.value = t('login.passwordComplexity')
    return false
  }
  passwordError.value = ''
  return true
}

// 表单校验
function validateForm(): boolean {
  const isAccountValid = validateAccount()
  const isPasswordValid = validatePassword()
  return isAccountValid && isPasswordValid
}

const tokenStore = useTokenStore()
async function doLogin() {
  if (tokenStore.hasLogin) {
    navigateBack()
    return
  }

  try {
    // 先进行表单校验
    if (!validateForm()) {
      return
    }

    loading.value = true
    // 调用登录接口
    await tokenStore.login({
      account: formValue.account,
      password: formValue.password,
    })
    // 有上一路由返回上一路由 没有重启首页
    const lastPage = getLastPage()
    const lastPath = `/${lastPage.route}`
    if (lastPath !== LOGIN_PAGE) {
      navigateBack()
    }
    else {
      reLaunch('/pages/index/index')
    }
  }
  catch (error) {
    console.log('登录失败', error)
    // 显示登录失败提示
    uni.showToast({
      title: t('login.loginFailed'),
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 关闭登录页面
function handleClickClose() {
  navigateBack()
}

// 处理输入框焦点事件
function handleAccountFocus() {
  accountFocused.value = true
}

function handleAccountBlur() {
  accountFocused.value = false
}

function handlePasswordFocus() {
  passwordFocused.value = true
}

function handlePasswordBlur() {
  passwordFocused.value = false
}
</script>

<template>
  <view class="h-screen flex flex-col justify-start bg-white px-4">
    <StatusBar />
    <view class="mt-12">
      <view
        class="size-8 flex items-center justify-center border border-gray-300 rounded-md border-solid"
        @click="handleClickClose"
      >
        <i class="i-lucide-x size-6 cursor-pointer" />
      </view>
    </view>
    <view class="mt-16 flex flex-1 flex-col">
      <view class="mb-8 flex justify-center">
        <text class="text-center text-2xl text-gray-800 font-bold">{{ t('login.title') }}</text>
      </view>

      <view class="relative">
        <input
          v-model="formValue.account"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': accountFocused }" type="text" @focus="handleAccountFocus"
          @blur="handleAccountBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            accountFocused || formValue.account ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('login.account') }}</text>
        </view>
      </view>
      <view v-if="accountError" class="mt-1 text-xs text-red-500">
        {{ accountError }}
      </view>

      <view class="relative mt-4">
        <input
          v-model="formValue.password"
          :password="!showPassword"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': passwordFocused }"
          @focus="handlePasswordFocus" @blur="handlePasswordBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            passwordFocused || formValue.password ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('login.password') }}</text>
        </view>
        <view class="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2" @click="showPassword = !showPassword">
          <i v-if="showPassword" class="i-lucide-eye-off size-5 text-gray-400" />
          <i v-else class="i-lucide-eye size-5 text-gray-400" />
        </view>
      </view>
      <view class="mt-1 flex justify-end">
        <text class="text-sm text-primary" @click="navigateTo('/pages-fg/login/forgot-password')">{{ t('login.forgotPassword') }}</text>
      </view>
      <view v-if="passwordError" class="mt-1 text-xs text-red-500">
        {{ passwordError }}
      </view>

      <view class="mt-8">
        <wd-button size="large" block @click="doLogin">
          {{ loading ? t('login.logining') : t('login.loginBtn') }}
        </wd-button>
      </view>

      <view class="mt-6 flex justify-center">
        <text class="text-sm text-gray-600">{{ t('login.noAccount') }}</text>
        <text class="ml-1 text-sm text-primary" @click="navigateTo('/pages-fg/login/register')">{{ t('login.register') }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
body,
html,
uni-page {
  background-color: #ffffff !important;
}
</style>
