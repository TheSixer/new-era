import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMDropDown from '~/components/drop-down'
import { IDropDownData, IMMDropDownDataType } from '~/components/drop-down/types'
import IconFontName from '~/components/icon-font/const'
import MMNavigation from '~/components/navigation'

@autobind
export default class Index extends Component {
  state: {
    value: string
    visible: boolean
    data: IDropDownData[]
  } = {
    value: '1',
    visible: false,
    data: [
      {
        id: '1',
        type: IMMDropDownDataType.Select,
        data: ['不限', '50万以下', '50-80万', '80-100万', '100-120万'],
        iconfont: IconFontName.Down,
        value: '50-80万'
      },
      {
        id: '2',
        type: IMMDropDownDataType.Select,
        data: ['不限', '红色', '蓝色'],
        iconfont: IconFontName.Down,
        value: '红色'
      },
      {
        id: '3',
        type: IMMDropDownDataType.Single,
        value: '销量'
      }
    ]
  }

  render() {
    return (
      <View>
        <MMNavigation title="下拉选项" />
        <View className="spacing" />
        <View>
          <MMDropDown onChange={(value, data) => this.setState({ value, data })} value={this.state.value} data={this.state.data} />
        </View>
      </View>
    )
  }
}
