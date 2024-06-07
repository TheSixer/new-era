import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMNavigation from '~/components/navigation'
import MMPickerView from '~/components/picker/view'
// import MMPickerViewH5 from "~/components/picker/view-h5";
import { autobind } from '@wmeimob/decorator'
import MMButton from '~/components/button'
import MMPicker from '~/components/picker'

@autobind
export default class Index extends Component {
  state = {
    data: [
      { id: '1', text: '超级长的选项测试测试测试' },
      { id: '2', text: '2' },
      { id: '3', text: '3' },
      { id: '4', text: '4' },
      { id: '5', text: '5' },
      { id: '6', text: '6' },
      { id: '7', text: '7' },
      { id: '8', text: '8' },
      { id: '9', text: '9' },
      { id: '10', text: '10' },
      { id: '11', text: '11' }
    ],
    value: '1',
    visible: false,
    pickerValue: ['2', '4']
  }

  render() {
    return (
      <View>
        <MMNavigation title="选择器" />
        <View className="container">
          {process.env.TARO_ENV === 'weapp' && <MMPickerView data={this.state.data} value={this.state.value} onChange={this.onChange} />}
          {/* {process.env.TARO_ENV === "h5" && (
            <MMPickerViewH5
              data={this.state.data}
              value={this.state.value}
              onChange={this.onChange}
            />
          )} */}
          <MMButton onClick={() => this.setState({ visible: true })} text="弹窗" />
          <MMPicker
            title="请选择"
            data={[this.state.data, this.state.data]}
            value={this.state.pickerValue}
            visible={this.state.visible}
            onChange={this.onPickerChange}
            onOk={this.onOk}
            onCancel={() => this.setState({ visible: false })}
          />
        </View>
      </View>
    )
  }

  private onPickerChange(index: number, value: string) {
    const pickerValue = [...this.state.pickerValue]
    pickerValue[index] = value
    this.setState({
      pickerValue
    })
  }

  private onChange(value: string) {
    this.setState({
      value
    })
  }

  private onOk(value) {
    this.setState({
      visible: false,
      pickerValue: value
    })
  }
}
