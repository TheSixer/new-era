import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react';
import H2 from '~/components/head/h2';
import MMItem from '~/components/item';
import MMNavigation from '~/components/navigation';
import MMTabBar from '~/components/tab-bar/index';

export default class Index extends Component {
  componentWillUnmount() { }

  componentDidShow() {
  }

  componentDidHide() { }

  render() {
    const { router } = getCurrentInstance()

    return (
      <View>
        <MMNavigation title="UI库" />
        <View className="container">
          <View className="spacing" />
          <H2>基础</H2>
          <View className="spacingSmall" />
          <MMItem text="色彩" onClick={() => Taro.navigateTo({
            url: '/pages/color/index'
          })} />
          <MMItem text="布局" onClick={() => Taro.navigateTo({
            url: '/pages/layout/index'
          })} />
          <MMItem text="标题" onClick={() => Taro.navigateTo({
            url: '/pages/title/index'
          })} />
        </View>
        <MMTabBar path={router?.path} />
      </View>

    );
  }
}
