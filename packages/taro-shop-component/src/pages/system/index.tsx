import { View } from '@tarojs/components'
import React, { FC, memo } from 'react'
import { isWebApp } from '../../config'

// 用于h5嵌入app的调试
const Index: FC = memo((props) => {
  return (
    <View>
      <View>是否app环境:{isWebApp.toString()}</View>
    </View>
  )
})
export default Index
