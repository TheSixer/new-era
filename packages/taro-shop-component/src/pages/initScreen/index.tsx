import { Button, View } from '@tarojs/components'
// import { useDidShow, useReady } from '@tarojs/taro'
import { FC, memo, useContext, useState } from 'react'
import styles from './index.module.less'
import CountdownCircle from './components/countdown'
import Taro from '@tarojs/taro'

interface IHomeProps {}
/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  // useDidShow(() => {})

  const navigateTo = () => {
    Taro.switchTab({
      url: '/pages/tabBar/home/index'
    })
  }

  return (
    <View className={styles.container}>

      <View className={styles.container_view}>
        <CountdownCircle size={24} duration={5} strokeWidth={1} onComplete={navigateTo} />

        <Button className={styles.button} onClick={navigateTo}>跳过</Button>
      </View>
    </View>
  )
}

const Home = memo(Component)
export default Home
