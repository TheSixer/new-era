import { View } from '@tarojs/components'
import { useDidShow, useReady } from '@tarojs/taro'
import { FC, memo, useContext, useState } from 'react'

interface IHomeProps {}
/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  useDidShow(() => {})

  return <View>11111</View>
}

const Home = memo(Component)
export default Home
