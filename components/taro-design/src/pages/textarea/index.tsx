import { View } from '@tarojs/components'
import { BaseEventOrig } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMNavigation from '~/components/navigation'
import MMTextarea from '~/components/textarea'
import { autobind } from '@wmeimob/decorator'

@autobind
export default class TabBar extends Component {
  state = {
    value: ''
  }

  render() {
    return (
      <View>
        <MMNavigation title="多行输入" />
        <View className="container">
          <View className="spacing" />
          <MMTextarea placeholder="请输入简介" value={this.state.value} onInput={this.onInput} />
        </View>
      </View>
    )
  }

  onInput(
    event: BaseEventOrig<{
      /** 输入值 */
      value: string
      /** 光标位置 */
      cursor: number
      /** 键值 */
      keyCode: number
    }>
  ) {
    this.setState({
      value: event.detail.value
    })
  }
}
