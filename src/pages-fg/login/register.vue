<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { t } from '@/locale'
import { LOGIN_PAGE } from '@/router/config'
import { userEmailVerificationUsingPost, userRegisterUsingPost } from '@/service'
import { useAppStore } from '@/store/app'
import { navigateBack, navigateTo } from '@/utils/router'

definePage({
  style: {
    navigationBarTitleText: t('login.register'),
    backgroundColor: '#ffffff',
  },
})

const formValue = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  verificationCode: '',
})

// 获取应用配置
const appStore = useAppStore()
const { appConfig } = storeToRefs(appStore)

// 跟踪输入框焦点状态
const usernameFocused = ref(false)
const passwordFocused = ref(false)
const confirmPasswordFocused = ref(false)
const emailFocused = ref(false)
const verificationCodeFocused = ref(false)

// 表单错误信息
const usernameError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const emailError = ref('')
const verificationCodeError = ref('')

// 是否显示密码
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 验证码发送状态
const codeSending = ref(false)
const codeSent = ref(false)
const countdown = ref(0)

// 注册按钮loading状态
const loading = ref(false)

// 页面加载时获取应用配置
onMounted(async () => {
  if (!appConfig.value.user_email_verification !== undefined) {
    return // 已经有配置数据，不需要重新获取
  }
  await appStore.getConfig()
})

// 校验函数
function validateUsername(): boolean {
  const val = formValue.username
  if (!val) {
    usernameError.value = t('login.usernameRequired')
    return false
  }
  if (val.length < 3) {
    usernameError.value = t('login.usernameMinLength')
    return false
  }
  // 用户名校验
  const isUsername = /^\w{3,20}$/.test(val)
  if (!isUsername) {
    usernameError.value = t('login.usernameInvalid')
    return false
  }
  usernameError.value = ''
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

function validateConfirmPassword(): boolean {
  const val = formValue.confirmPassword
  if (!val) {
    confirmPasswordError.value = t('register.confirmPasswordRequired')
    return false
  }
  if (val !== formValue.password) {
    confirmPasswordError.value = t('register.passwordMismatch')
    return false
  }
  confirmPasswordError.value = ''
  return true
}

function validateEmail(): boolean {
  const val = formValue.email
  if (!val) {
    emailError.value = t('register.emailRequired')
    return false
  }
  const isEmail = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(val)
  if (!isEmail) {
    emailError.value = t('register.emailInvalid')
    return false
  }
  emailError.value = ''
  return true
}

function validateVerificationCode(): boolean {
  // 如果不需要邮箱验证，则跳过验证码验证
  if (!appConfig.value.user_email_verification) {
    return true
  }

  const val = formValue.verificationCode
  if (!val) {
    verificationCodeError.value = t('register.verificationCodeRequired')
    return false
  }
  if (!/^\d{6}$/.test(val)) {
    verificationCodeError.value = t('register.verificationCodeInvalid')
    return false
  }
  verificationCodeError.value = ''
  return true
}

// 发送验证码
async function sendVerificationCode() {
  if (!validateEmail()) {
    return
  }

  try {
    codeSending.value = true
    // 模拟发送验证码API调用
    await userEmailVerificationUsingPost({
      body: {
        email: formValue.email,
        type: 'verification',
      },
    })

    codeSent.value = true
    countdown.value = 60

    // 开始倒计时
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        codeSent.value = false
      }
    }, 1000)

    uni.showToast({
      title: t('register.codeSent'),
      icon: 'success',
    })
  }
  catch (error) {
    console.log('发送验证码失败', error)
    uni.showToast({
      title: t('register.codeSendFailed'),
      icon: 'none',
    })
  }
  finally {
    codeSending.value = false
  }
}

// 表单校验
function validateForm(): boolean {
  const isUsernameValid = validateUsername()
  const isPasswordValid = validatePassword()
  const isConfirmPasswordValid = validateConfirmPassword()
  const isEmailValid = validateEmail()
  const isVerificationCodeValid = validateVerificationCode()
  return isUsernameValid && isPasswordValid && isConfirmPasswordValid && isEmailValid && isVerificationCodeValid
}

async function doRegister() {
  try {
    // 先进行表单校验
    if (!validateForm()) {
      return
    }

    loading.value = true

    // 模拟注册API调用
    await userRegisterUsingPost({
      body: {
        username: formValue.username,
        password: formValue.password,
        email: formValue.email,
        verificationCode: formValue.verificationCode,
      },
    })

    // 显示注册成功提示
    uni.showToast({
      title: t('register.registerSuccess'),
      icon: 'success',
    })

    // 注册成功后跳转到登录页
    setTimeout(() => {
      navigateTo(LOGIN_PAGE)
    }, 1500)
  }
  catch (error) {
    console.log('注册失败', error)
    // 显示注册失败提示
    uni.showToast({
      title: t('register.registerFailed'),
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 关闭注册页面
function handleClickClose() {
  navigateBack()
}

// 处理输入框焦点事件
function handleUsernameFocus() {
  usernameFocused.value = true
}

function handleUsernameBlur() {
  usernameFocused.value = false
}

function handlePasswordFocus() {
  passwordFocused.value = true
}

function handlePasswordBlur() {
  passwordFocused.value = false
}

function handleConfirmPasswordFocus() {
  confirmPasswordFocused.value = true
}

function handleConfirmPasswordBlur() {
  confirmPasswordFocused.value = false
}

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
        <text class="text-center text-2xl text-gray-800 font-bold">{{ t('login.register') }}</text>
      </view>

      <view class="relative">
        <input
          v-model="formValue.username"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': usernameFocused }" type="text" @focus="handleUsernameFocus"
          @blur="handleUsernameBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            usernameFocused || formValue.username ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('login.username') }}</text>
        </view>
      </view>
      <view v-if="usernameError" class="mt-1 text-xs text-red-500">
        {{ usernameError }}
      </view>

      <view class="relative mt-4">
        <input
          v-model="formValue.email"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': emailFocused }" type="text" @focus="handleEmailFocus" @blur="handleEmailBlur"
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

      <!-- 验证码字段，根据配置显示 -->
      <view v-if="appConfig.user_email_verification" class="relative mt-4">
        <input
          v-model="formValue.verificationCode"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 pr-24 text-base"
          :class="{ '!border-primary': verificationCodeFocused }" type="text" @focus="handleVerificationCodeFocus"
          @blur="handleVerificationCodeBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            verificationCodeFocused || formValue.verificationCode ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('register.verificationCode') }}</text>
        </view>
        <view
          class="absolute right-3 top-1/2 border border-primary rounded border-solid px-2 py-1 text-sm text-primary -translate-y-1/2"
          @click="sendVerificationCode"
        >
          <text v-if="codeSent && countdown > 0">{{ countdown }}s</text>
          <text v-else-if="codeSending">{{ t('register.sending') }}</text>
          <text v-else>{{ t('register.sendCode') }}</text>
        </view>
      </view>
      <view v-if="appConfig.user_email_verification && verificationCodeError" class="mt-1 text-xs text-red-500">
        {{ verificationCodeError }}
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
      <view v-if="passwordError" class="mt-1 text-xs text-red-500">
        {{ passwordError }}
      </view>

      <view class="relative mt-4">
        <input
          v-model="formValue.confirmPassword"
          :password="!showConfirmPassword"
          class="border border-gray-300 rounded-md border-solid bg-transparent px-3 py-3 text-base"
          :class="{ '!border-primary': confirmPasswordFocused }"
          @focus="handleConfirmPasswordFocus" @blur="handleConfirmPasswordBlur"
        >
        <view
          class="pointer-events-none absolute left-3 transition-all duration-300 ease-in-out" :class="[
            confirmPasswordFocused || formValue.confirmPassword ? 'top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-1' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400',
          ]"
        >
          <text>{{ t('register.confirmPassword') }}</text>
        </view>
        <view
          class="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <i v-if="showConfirmPassword" class="i-lucide-eye-off size-5 text-gray-400" />
          <i v-else class="i-lucide-eye size-5 text-gray-400" />
        </view>
      </view>
      <view v-if="confirmPasswordError" class="mt-1 text-xs text-red-500">
        {{ confirmPasswordError }}
      </view>

      <view class="mt-8">
        <wd-button size="large" block @click="doRegister">
          {{ loading ? t('register.registering') : t('login.register') }}
        </wd-button>
      </view>

      <view class="mt-6 flex justify-center">
        <text class="text-sm text-gray-600">{{ t('login.hasAccount') }}</text>
        <text class="ml-1 text-sm text-blue-500" @click="navigateTo(LOGIN_PAGE)">{{ t('login.loginBtn') }}</text>
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
