import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMIconFont from '~/components/icon-font/index'
import { autobind } from '@wmeimob/decorator'
import MMNavigation from '~/components/navigation'
import MMIconFontName from '~/components/icon-font/const'

@autobind
export default class Index extends Component {
  state = {}

  render() {
    console.log(' Object.keys(MMIconFontName)', Object.keys(MMIconFontName))
    return (
      <View>
        <MMNavigation title="字体图标" />
        <View className="container">
          <View className="spacing" />
          {Object.keys(MMIconFontName)
            .filter((value) => typeof value === 'string')
            .map((value) => (
              <View className="flex" key={value}>
                <MMIconFont value={value} />
                <View>{MMIconFontName[value]}</View>
              </View>
            ))}
        </View>
      </View>
    )
  }
}
