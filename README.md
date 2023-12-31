# Template-Uni-App
---
## 1`创建以 typescript 开发的工程
npx degit dcloudio/uni-preset-vue#vite-ts "项目名称"

## 2`安装依赖
pnpm i 

设置为国内镜像

pnpm config set registry https://registry.npmmirror.com

<!--  WARN  Issues with peer dependencies found -->
```
.
└─┬ @dcloudio/uni-automator 3.0.0-3081220230817001
  └─┬ @dcloudio/uni-cli-shared 3.0.0-3081220230817001
    └─┬ @vue/server-renderer 3.2.47
      └── ✕ unmet peer vue@3.2.47: found 3.3.4
```
根据提示下载vue@3.2.47解决

pnpm install vue@3.2.47

## 3`编译测试一下
pnpm dev:mp-weixin

## 4`插件安装
Unihelper的使用和新建分页和查看文档
## ![Alt text](image.png)

## 5`安装类型声明插件 微信小程序和uni-app
pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types
```
配置tsconfig.json 
    {
         "types": [
            "@types/wechat-miniprogram",
            "@uni-helper/uni-app-types"
        ]
    },
     "vueCompilerOptions": {
        // experimentalRuntimeMode 已废弃，现调整为 nativeTags，请升级 Volar 插件至最新版本
        "nativeTags": [
            "block",
            "component",
            "template",
            "slot"
        ]
    },
```
### 设置搜索文件关联
将manifest.json和pages.json以键值对的方式配置

  {manifest.json : jsonc} 允许注释

## 6`安装uni-ui 组件库
pnpm i @dcloudio/uni-ui
```
// pages.json
{
  // 组件自动导入
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置  // [!code ++]
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue" // [!code ++]
    }
  },
  "pages": [
    // …省略
  ]
}
```

## 7`安装类型声明文件
pnpm i -D @uni-helper/uni-ui-types
```
配置类型声明文件
{
  "compilerOptions": {
    // ...
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "miniprogram-api-typings", // 原生微信小程序类型
      "@uni-helper/uni-app-types", // uni-app 组件类型
      "@uni-helper/uni-ui-types" // uni-ui 组件类型  // [!code ++]
    ]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    "nativeTags": ["block", "component", "template", "slot"]
  }
}
```
## 8`持久化存储插件pinia

pnpm install pinia <br>
pnpm i pinia-plugin-persistedstate

### 1:创建 pinia 实例
文件路径: src\stores\index.ts<br>
// 创建pinia<br>
const pinia = createPinia()

// 使用持久化存储插件<br>
pinia.use(persist)

// 默认导出，给 main.ts 使用<br>
export default pinia

// 模块统一导出<br>
export * from './modules/member'

### 2:app使用
文件路径: src\main.ts<br>
app.use(pinia)
### 3: 定义 Store
文件路径:  src\stores\modules\users.ts<br>
```
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
```

## 9`统一代码风格 Eslint
- 安装 `eslint` + `prettier`

```sh
pnpm i -D eslint prettier eslint-plugin-vue @vue/eslint-config-prettier @vue/eslint-config-typescript @rushstack/eslint-patch @vue/tsconfig
```

- 新建 `.eslintrc.cjs` 文件，添加以下 `eslint` 配置

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  // 小程序全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    getApp: true,
    UniApp: true,
    UniHelper: true,
    App: true,
    Page: true,
    Component: true,
    AnyObject: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 100,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    'vue/multi-word-component-names': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'vue/no-deprecated-html-element-is': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
  },
}
```

- 配置 `package.json`

```json
{
  "script": {
    // ... 省略 ...
    "lint": "eslint . --ext .vue,.js,.ts --fix --ignore-path .gitignore"
  }
}
```

- 运行

```sh
pnpm lint
```