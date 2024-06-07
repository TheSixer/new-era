import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMIconImage from '~/components/icon-image'
import MMIconImageName from '~/components/icon-image/const'
import MMNavigation from '~/components/navigation'

@autobind
export default class Index extends Component {
  state = {}

  render() {
    return (
      <View>
        <MMNavigation title="图片图标" />
        <View className="container">
          <View className="spacing" />
          {Object.keys(MMIconImageName).map((value) => (
            <View className="flex" key={value}>
              <MMIconImage value={MMIconImageName[value]} />
              <View>{value}</View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
