import { View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMTabBar from '~/components/tab-bar'
import MMButton from '~/components/button'
import MMNavigation from '~/components/navigation'

@autobind
export default class TabBar extends Component {
  tabBar: MMTabBar

  render() {
    const { router } = getCurrentInstance()

    return (
      <View>
        <MMNavigation title="标签栏" />
        <View className="container">
          <View className="spacing" />
          <View>初始化属性 写在src/custom-tab-bar/index.tsx页面</View>
          <View>所有MMTabBar共用state</View>
          <View className="spacing" />
          <MMButton onClick={this.onClickRedDot} text="显示红点" />
          <View className="spacing" />
          <MMButton onClick={this.onClickCount} text="设置未读数" />
        </View>
        <MMTabBar ref={(ref) => (this.tabBar = ref as any)} path={router?.path} />
      </View>
    )
  }

  private onClickRedDot() {
    this.tabBar.setRedDot(0, true)
  }

  private onClickCount() {
    this.tabBar.setCount(1, 1)
  }
}
