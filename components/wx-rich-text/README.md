# `@wmeimob/wx-rich-text`

> 美萌微信小程序富文本解析组件

## 使用

小程序端使用存在部分限制。所以请安装下面的步骤执行

第一步: 下载压缩包并将文件解压至小程序项目中的`src/components`目录下

第二步: 在需要使用富文本解析的**页面组件**（即src/pages下面的组件）目录下。新建一个`index.config.ts`

第三步: 引用组件

```ts
// src/pages/xxpage/index.config.ts
export default {
  usingComponents: {
    wxparse: '../../../components/richText/wxParse/index' // 书写第三方组件的相对路径
  }
}

```

第四步: 使用组件

```tsx
import MMRichText from '../../../components/richText/index'

const Component = () => {
  const html = `<p>hahahh</p>`

  return (
    <MMRichText html={html} style={{ marginTop: 10 }} />
  )
}

```
