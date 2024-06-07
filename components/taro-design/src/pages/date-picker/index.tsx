import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMNavigation from '~/components/navigation'
import MMDatePicker from '~/components/date-picker'
import { autobind } from '@wmeimob/decorator'
import { MMDatePickerType } from '~/components/date-picker/const'
import MMButton from '~/components/button'

@autobind
export default class Index extends Component {
  state = {
    value: new Date(),
    visible: false
  }

  // componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { value, visible } = this.state
    return (
      <View>
        <MMNavigation title="日期选择" />
        <View className="container">
          <View className="spacing" />
          <MMButton onClick={() => this.setState({ visible: true })} text="弹窗" />
          <MMDatePicker type={MMDatePickerType.dateTime} value={value} visible={visible} onChange={this.onChange} onCancel={this.onCancel} onOk={this.onOk} />
        </View>
      </View>
    )
  }

  private onChange(data) {
    this.setState({
      value: data
    })
  }

  private onOk(data) {
    this.setState({
      visible: false,
      value: data
    })
  }

  private onCancel() {
    this.setState({
      visible: false
    })
  }
}
