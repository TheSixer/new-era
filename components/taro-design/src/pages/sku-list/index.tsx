import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import Navigation from '~/components/navigation/index'
import MMSkuList from '~/components/sku-list'

@autobind
export default class Index extends Component {
  state = {
    value: []
  }

  private list = [
    {
      title: '颜色',
      items: [
        { id: '红色', text: '红色' },
        { id: '黄色', text: '黄色' }
      ]
    },
    {
      title: '尺寸',
      items: [
        { id: '大', text: '大' },
        { id: '小', text: '小' }
      ]
    },
    {
      title: '保修',
      items: [
        { id: '1年', text: '1年' },
        { id: '1月', text: '1月' }
      ]
    }
  ]

  private sku = [
    ['大', '红色', '1年'],
    ['大', '黄色', '1年'],
    ['大', '黄色', '1月']
  ]

  render() {
    return (
      <View>
        <Navigation title="规格列表" />
        <View className="container">
          <View className="spacing" />
          <MMSkuList onClick={(value) => this.setState({ value })} value={this.state.value} sku={this.sku} list={this.list} />
        </View>
      </View>
    )
  }
}
