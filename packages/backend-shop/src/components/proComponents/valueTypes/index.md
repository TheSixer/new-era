---
title: 自定义ValueType
sidemenu: false
---

## 扩展ValueTye

[ant ProForm](https://procomponents.ant.design/components/schema#%E8%87%AA%E5%AE%9A%E4%B9%89-valuetype) valueType 是 ProComponents 的灵魂，ProComponents 会根据 valueType 来映射成不同的表单项。以下是支持的常见表单项：

| valueType     | 说明                         |
| ------------- | ---------------------------- |
| password      | 密码输入框                   |
| money         | 金额输入框                   |
| textarea      | 文本域                       |
| date          | 日期                         |
| dateTime      | 日期时间                     |
| dateWeek      | 周                           |
| dateMonth     | 月                           |
| dateQuarter   | 季度输入                     |
| dateYear      | 年份输入                     |
| dateRange     | 日期区间                     |
| dateTimeRange | 日期时间区间                 |
| time          | 时间                         |
| timeRange     | 时间区间                     |
| text          | 文本框                       |
| select        | 下拉框                       |
| treeSelect    | 树形下拉框                   |
| checkbox      | 多选框                       |
| rate          | 星级组件                     |
| radio         | 单选框                       |
| radioButton   | 按钮单选框                   |
| progress      | 进度条                       |
| percent       | 百分比组件                   |
| digit         | 数字输入框                   |
| second        | 秒格式化                     |
| avatar        | 头像                         |
| code          | 代码框                       |
| switch        | 开关                         |
| fromNow       | 相对于当前时间               |
| image         | 图片                         |
| jsonCode      | 代码框，但是带了 json 格式化 |
| color         | 颜色选择器                   |
| cascader      | 级联选择器                   |

在以上基础上。我们扩展了一些valueType

| valueType | 说明 |
| --------- | ---- |
| city      | 城市 |

### city 城市

表格搜索中可以筛选城市 表格中会根据城市选项。自动解析城市值

```tsx
/**
 * background: '#f0f2f5'
 */

import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'

export default () => {
  // INFO: 这里的类型需要使用 MMProColumns 而不是 ProColumns
  const [columns] = useState<MMProColumns<any>[]>([
    { title: 'id', dataIndex: 'id' },
    { title: '城市', dataIndex: 'city', valueType: 'city' }
  ])

  const request = async () => ({
    data: [
      { id: 42, city: '110000,110001,110102' },
      { id: 43, city: '120000,120001,120101' }
    ],
    success: true,
    total: 2
  })

  return (<ProTable rowKey="id" columns={columns} request={request}/>) 
}
```
