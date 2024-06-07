/* eslint-disable no-console */
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMBadge from '~/components/badge'
import MMNavigation from '~/components/navigation'
import styles from './index.module.less'
import MMItem from '~/components/item'

@autobind
export default class Index extends Component {
  state = {
    number: 0
  }

  onClick() {
    this.setState({
      number: this.state.number + 1
    })
  }

  render() {
    return (
      <View>
        <MMNavigation title="徽章未读数" />
        <View className="container">
          <View className="spacing" />
          <MMBadge />
          <View className="spacing" />
          <MMBadge value={6} />
          <View className="spacing" />
          <MMBadge value={10} />
          <View className="spacing" />
          <MMBadge value="New" />
          <View className="spacing" />
          <MMBadge value={1000} />
          <View className="spacing" />
          <View className={styles.item}>
            <MMBadge value={1000} absolute />
          </View>
          <View className="spacing" />
          <View className={styles.item}>
            <MMBadge absolute />
          </View>
          <View className="spacing" />
          <MMItem text="单行列表" divider={false} renderLeft={<MMBadge />} />
        </View>
      </View>
    )
  }
}
