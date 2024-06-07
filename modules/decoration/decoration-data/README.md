# @wmeimob-modules/decoration-data

> 装修页面数据

该数据用于自定义页面使用

提供数据类型有

+ enums       枚举
+ interfaces  数据类型
+ styles      跨端共享样式
+ utils       工具函数

## 入口文件 src/index.ts

包中会提供导出 包括以上的数据类型

**注意** 考虑到打包时tree-shake.入口文件并不会导出所有的枚举以及工具函数。原则上只导出所有的类型
