import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Component } from 'react'
import MMInputSearch from '~/components/input-search'
import MMNavigation from '~/components/navigation'
import { MMInputSearchType } from '~/components/input-search/const'

export default class Index extends Component {
  render() {
    return (
      <View>
        <MMNavigation title="搜索栏" />
        <View className="spacing" />
        <MMInputSearch onSearch={this.onSearch} />

        <View className="spacing" />
        <MMInputSearch placeholder="请输入姓名" type={MMInputSearchType.primary} onSearch={this.onSearch} />
      </View>
    )
  }

  private onSearch(text: string) {
    // eslint-disable-next-line no-console
    console.log(text)
  }
}
