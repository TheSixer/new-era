import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react'
import MMDivider from '~/components/divider';
import styles from './index.module.less';
import MMNavigation from '~/components/navigation';

export default class Index extends Component {
  // componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className={styles.page}>
        <MMNavigation title="分割线" />
        <View className="container">
          <View className="spacing" />
          <MMDivider />
          <View className="spacing" />
          <View className={styles.verticalBox} >
            我是分割
            <View className="spacing" />
            <MMDivider vertical />
            <View className="spacing" />
            <MMDivider size={25} vertical />
            <View className="spacing" />
            <MMDivider size={50} vertical />
            <View className="spacing" />
            线
            </View>
        </View>
      </View>
    );
  }
}
