<script lang="ts" setup>
import { t } from '@/locale'
import { LOGIN_PAGE } from '@/router/config'
import { navigateBack, reLaunch } from '@/utils/router'

definePage({
  style: {
    navigationBarTitleText: t('forgotPassword.title'),
    backgroundColor: '#ffffff',
  },
})

const formValue = reactive({
  email: '',
  verificationCode: '',
  newPassword: '',
})

// 跟踪输入框焦点状态
const emailFocused = ref(false)
const verificationCodeFocused = ref(false)
const newPasswordFocused = ref(false)

// 表单错误信息
const emailError = ref('')
const verificationCodeError = ref('')
const newPasswordError = ref('')

// 是否显示密码
const showNewPassword = ref(false)

// 按钮loading状态
const loading = ref(false)
const codeLoading = ref(false)
const countdown = ref(0)

// 校验函数
function validateEmail(): boolean {
  const val = formValue.email
  if (!val) {
    emailError.value = t('forgotPassword.emailRequired')
    return false
  }
  if (!validateEmail()) {
    emailError.value = t('forgotPassword.emailInvalid')
    return false
  }
  emailError.value = ''
  return true
}

function validateVerificationCode(): boolean {
  const val = formValue.verificationCode
  if (!val) {
    verificationCodeError.value = t('forgotPassword.verificationCodeRequired')
    return false
  }
  if (val.length !== 6) {
    verificationCodeError.value = t('forgotPassword.verificationCodeInvalid')
    return false
  }
  verificationCodeError.value = ''
  return true
}

function validateNewPassword(): boolean {
  const val = formValue.newPassword
  if (!val) {
    newPasswordError.value = t('forgotPassword.newPasswordRequired')
    return false
  }
  if (val.length < 6) {
    newPasswordError.value = t('login.passwordMinLength')
    return false
  }
  // 检查密码复杂度：至少包含字母和数字
  const hasLetter = /[a-z]/i.test(val)
  const hasNumber = /\d/.test(val)
  if (!hasLetter || !hasNumber) {
    newPasswordError.value = t('login.passwordComplexity')
    return false
  }
  newPasswordError.value = ''
  return true
}

// 发送验证码
async function sendVerificationCode() {
  if (!validateEmail()) {
    return
  }

  try {
    codeLoading.value = true

    // 模拟发送验证码API调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 开始倒计时
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    uni.showToast({
      title: t('forgotPassword.codeSent'),
      icon: 'success',
    })
  }
  catch (error) {
    console.log('发送验证码失败', error)
    uni.showToast({
      title: t('forgotPassword.codeSendFailed'),
      icon: 'none',
    })
  }
  finally {
    codeLoading.value = false
  }
}

// 表单校验
function validateForm(): boolean {
  const isEmailValid = validateEmail()
  const isVerificationCodeValid = validateVerificationCode()
  const isNewPasswordValid = validateNewPassword()
  return isEmailValid && isVerificationCodeValid && isNewPasswordValid
}
// 重置密码
async function resetPassword() {
  try {
    // 先进行表单校验
    if (!validateForm()) {
      return
    }

    loading.value = true

    // 模拟重置密码API调用
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 显示重置成功提示
    uni.showToast({
      title: t('forgotPassword.resetSuccess'),
      icon: 'success',
    })

    // 重置成功后跳转到登录页
    setTimeout(() => {
      reLaunch(LOGIN_PAGE)
    }, 1500)
  }
  catch (error) {
    console.log('重置密码失败', error)
    // 显示重置失败提示
    uni.showToast({
      title: t('forgotPassword.resetFailed'),
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 关闭忘记密码页面
function handleClickClose() {
  navigateBack()
}

// 处理输入框焦点事件
function handleEmailFocus() {
  emailFocused.value = true
}

function handleEmailBlur() {
  emailFocused.value = false
}

function handleVerificationCodeFocus() {
  verificationCodeFocused.value = true
}

function handleVerificationCodeBlur() {
  verificationCodeFocused.value = false
}

function handleNewPasswordFocus() {
  newPasswordFocused.value = true
}

function handleNewPasswordBlur() {
  newPasswordFocused.value = false
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
        <text class="text-center text-2xl text-gray-800 font-bold">{{ t('forgotPassword.title') }}</text>
      </view>

      <view class="relative mt-4">
        <input
          v-model="formValue.email"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': emailFocused }" type="text" @focus="handleEmailFocus"
          @blur="handleEmailBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            emailFocused || formValue.email ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('register.email') }}</text>
        </view>
      </view>
      <view v-if="emailError" class="mt-1 text-xs text-red-500">
        {{ emailError }}
      </view>

      <view class="relative mt-4 flex items-center gap-2">
        <input
          v-model="formValue.verificationCode"
          class="flex-1 border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': verificationCodeFocused }" type="number" @focus="handleVerificationCodeFocus"
          @blur="handleVerificationCodeBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            verificationCodeFocused || formValue.verificationCode ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('forgotPassword.verificationCode') }}</text>
        </view>
        <wd-button
          class="ml-2"
          size="small"
          :disabled="countdown > 0"
          :loading="codeLoading"
          @click="sendVerificationCode"
        >
          {{ countdown > 0 ? `${countdown}s` : t('forgotPassword.sendCode') }}
        </wd-button>
      </view>
      <view v-if="verificationCodeError" class="mt-1 text-xs text-red-500">
        {{ verificationCodeError }}
      </view>

      <view class="relative mt-4">
        <input
          v-model="formValue.newPassword"
          :password="!showNewPassword"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': newPasswordFocused }"
          @focus="handleNewPasswordFocus" @blur="handleNewPasswordBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            newPasswordFocused || formValue.newPassword ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('forgotPassword.newPassword') }}</text>
        </view>
        <view class="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2" @click="showNewPassword = !showNewPassword">
          <i v-if="showNewPassword" class="i-lucide-eye-off size-5 text-gray-400" />
          <i v-else class="i-lucide-eye size-5 text-gray-400" />
        </view>
      </view>
      <view v-if="newPasswordError" class="mt-1 text-xs text-red-500">
        {{ newPasswordError }}
      </view>

      <view class="mt-8">
        <wd-button size="large" block :loading="loading" @click="resetPassword">
          {{ loading ? t('forgotPassword.resetting') : t('forgotPassword.resetBtn') }}
        </wd-button>
      </view>

      <view class="mt-6 flex justify-center">
        <text class="text-sm text-gray-600">{{ t('forgotPassword.rememberPassword') }}</text>
        <text class="ml-1 text-sm text-blue-500" @click="reLaunch(LOGIN_PAGE)">{{ t('login.loginBtn') }}</text>
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
