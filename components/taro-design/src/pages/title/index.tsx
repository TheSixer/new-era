import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react'
import H2 from '~/components/head/h2';
import H3 from '~/components/head/h3';
import MMNavigation from '~/components/navigation';

export default class Index extends Component {
  // componentWillMount() { }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (<View>
      <MMNavigation title="标题" />
      <View className="container">
        <View className="spacing" />
        <H2>H2</H2>
        <H3>H3</H3>
      </View>
    </View>);
  }
}
