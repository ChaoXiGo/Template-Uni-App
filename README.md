# Template-Uni-App
**1`创建以 typescript 开发的工程**
（如命令行创建失败，请直接访问 gitee 下载模板）
npx degit dcloudio/uni-preset-vue#vite-ts "项目名称"

**2`安装依赖**
pnpm i 
设置为国内镜像
pnpm config set registry https://registry.npmmirror.com

<!--  WARN  Issues with peer dependencies found -->
.
└─┬ @dcloudio/uni-automator 3.0.0-3081220230817001
  └─┬ @dcloudio/uni-cli-shared 3.0.0-3081220230817001
    └─┬ @vue/server-renderer 3.2.47
      └── ✕ unmet peer vue@3.2.47: found 3.3.4
      下载vue@3.2.47解决
pnpm install vue@3.2.47

**3`编译测试一下**
pnpm dev:mp-weixin

**4`插件安装!**[Alt text](image.png)
Unihelper的使用和新建分页和查看文档

**5`安装类型声明插件 微信小程序和uni-app**
pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types
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
**设置搜索文件关联**
将manifest.json和pages.json以键值对的方式配置  manifest.json | jsonc 允许注释

**6`安装uni-ui 组件库**
pnpm i @dcloudio/uni-ui

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

7`**安装类型声明文件**
pnpm i -D @uni-helper/uni-ui-types
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