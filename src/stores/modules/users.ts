import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const userStore = defineStore(
  'users',
  () => {
    // 用户信息
    const userProfile = ref<any>()

    // 保存用户信息，登录时使用
    const setUserProfile = (val: any) => {
      userProfile.value = val
    }

    // 清理用户信息，退出时使用
    const clearUserProfile = () => {
      userProfile.value = undefined
    }

    // 记得 return
    return {
      userProfile,
      setUserProfile,
      clearUserProfile,
    }
  },
  // TODO: 持久化插件 persist
  {
    // 网页端配置
    // persist: true,

    // 多平台兼容API
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
