/* eslint-disable no-console */
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMButton from '~/components/button'
import MMCitysPicker from '~/components/citys-picker'
import MMNavigation from '~/components/navigation'
import { autobind } from '@wmeimob/decorator'

@autobind
export default class Index extends Component {
  state = {
    cityValue: [] as {
      id: string
      text: string
    }[],
    visible: false
  }

  // componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { visible, cityValue } = this.state
    console.log('1')
    return (
      <View>
        <MMNavigation title="城市选择" />
        <View className="spacing" />
        <View>{cityValue.map((value) => value.text).join(',')}</View>
        <View className="spacing" />
        <MMButton onClick={() => this.setState({ visible: true })}>弹窗显示</MMButton>

        <MMCitysPicker value={cityValue} visible={visible} onCancel={this.onCancel} onOk={this.onOk} />
        <View className="spacing" />
      </View>
    )
  }

  onCancel() {
    this.setState({ visible: false })
  }

  onOk(value) {
    this.setState({
      cityValue: value,
      visible: false
    })
  }
}
