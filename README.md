# 美萌前端开发框架

> 基于pnpm管理的monorepo仓库。在pacakges下做的任何修改。都会立即同步给其他包

## 版本

node v16.14.2

pnpm 7.29.1 // 请注意检查pnpm版本只支持版本7

## 框架、组件概览

```bash

mm-frontend
/components
└──
  ├── aliyun                              阿里云工具包
  ├── backend-pro                         后台组件库(大部分组件实现在后台模板中)
  ├── form-rules                          美萌表单校验规则
  ├── swagger-api-templates               美萌接口生成模板工具
  ├── taro-shop-coupon                    Taro优惠券组件
  ├── utils                               通用工具库
  ├── decorator                           装饰器
  ├── event-emitter                       事件监听库
  ├── request                             通用请求库
  ├── rich-text                           后台富文本组件
  ├── taro-design                         Taro UI组件哭
  ├── taro-parabola                       Taro抛物线组件
  ├── taro-picker                         Taro选择器组件
  ├── taro-poster                         Taro海报组件
  ├── taro-share                          Taro分享组件
  └── wx-rich-text                        微信小程序富文本组件
/packages
└──
  ├── backend-shop                        后台商城管理系统
  ├── data-model                          数据模型
  ├── shop-data                           商城通用数据类型/枚举/工具/hooks库
  ├── taro-shop-component                 商城小程序


```

## 安装启动

### 安装依赖

```bash
  // 给所有项目安装依赖 等同于全局执行npm install
  pnpm install 

  // 仅安装一个项目与依赖包的项目依赖
  // 关于filter的使用。请前往https://pnpm.io/zh/filtering
  pnpm install --filter="@wmeimob/backend-template..."
```

### 启动开发

所有项目都作为pacakge(包)进行管理。所以你可以将packages/*中的每一个目录认为是一个单独的项目。
以基础后台为例:

```bash
  // 进入后台模板并启动项目
  cd packages/backend-componet && pnpm dev

  // 进入后台模板打包
  cd packages/backend-componet && pnpm build
```

其他模板启动方式同上。替换包名即可

### 常用命令

```bash
  // 给所有包安装dayjs依赖(warning:此操作非常危险。一般建议使用下面的命令进行过滤安装)
  pnpm add dayjs 
  // 给后台模板（backend-template）安装React依赖
  pnpm add react --filter=@wmeimob/backend-template
```

## 引用

如果你还不了解这些概念。可以前往这里阅读学习

+ [monorepo](https://segmentfault.com/a/1190000019309820)
+ [lerna](https://www.lernajs.cn/)
+ [pnpm](https://pnpm.io/zh/)

## Q&A

常见错误

> ERROR  Unable to find the global bin directory
> Run "pnpm setup" to create it automatically, or set the global-bin-dir setting, or the PNPM_HOME env variable. The global bin directory should be in the >PATH.

安装完pnpm之后。如需要安装全局依赖等。需要执行 `pnpm setup`命令将pnpm的环境变量注入系统之中

运行命令
pnpm setup

**命令执行完毕需要重新打开终端再执行相关命令**
