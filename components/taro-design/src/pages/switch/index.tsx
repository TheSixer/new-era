import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMNavigation from '~/components/navigation'
import MMSwitch from '~/components/switch'
import H2 from '~/components/head/h2'
import MMItem from '~/components/item'

@autobind
export default class Index extends Component {
  state = {
    checked: false
  }

  render() {
    return (
      <View>
        <MMNavigation title="滑动开关" />
        <View className="container">
          <View className="spacing" />
          <H2>普通开关</H2>
          <View className="spacingSmall" />
          <MMSwitch checked={this.state.checked} onChange={this.onChange} />
          <View className="spacing" />
          <H2>禁用开关</H2>
          <View className="spacingSmall" />
          <MMSwitch checked={this.state.checked} disabled onChange={this.onChange} />
          <H2>组合使用</H2>
          <View className="spacingSmall" />
          <MMItem text="title" divider={false}>
            <MMSwitch checked={this.state.checked} onChange={this.onChange} />
          </MMItem>
        </View>
      </View>
    )
  }

  private onChange(checked) {
    this.setState({
      checked
    })
  }
}
