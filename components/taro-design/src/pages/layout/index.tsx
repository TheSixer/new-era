import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react'
import styles from './index.module.less';
import classname from 'classnames';
import H2 from '~/components/head/h2';
import MMNavigation from '~/components/navigation';

export default class Index extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (<View>
      <MMNavigation title="布局" />
      <View className="container">
        <H2>容器</H2>
        <View className="spacingSmall" />
        <View className={classname(styles.bgRed, 'container')}>
          container
                </View>
        <View className="spacing" />
        <H2>间距</H2>
        <View>
          通过『小号间距』、『间距』、『大号间距』这三种规格来划分信息层次。
                </View>
        <View className="spacingSmall" />
        <View className={styles.bgRed}>
          spacingSmall
                </View>
        <View className="spacing" />
        <View className={styles.bgRed}>
          spacing
                </View>
        <View className="spacingBig" />
        <View className={styles.bgRed}>
          spacingBig
                </View>
        <View className="spacingIphone" />
        <View className={styles.bgRed}>
          spacingIphone 用于iphone x以上占位
                </View>
      </View>
    </View>);
  }
}
