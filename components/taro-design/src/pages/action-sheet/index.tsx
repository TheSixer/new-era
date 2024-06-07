import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMActionSheet from '~/components/action-sheet'
import { autobind } from '@wmeimob/decorator'
import { View } from '@tarojs/components'
import MMButton from '~/components/button'
import MMNavigation from '~/components/navigation'

@autobind
export default class Index extends Component {
  state = {
    visible: false,
    value: '1',
    data: [
      {
        text: '选项1'
      },
      {
        text: '选项3'
      },
      {
        text: '选项3'
      }
    ],

    multipleVisible: false,
    multipleValue: [] as string[],
    multipleValueCache: [] as string[]
  }

  onCancel() {
    this.setState({
      visible: false
    })
  }

  onOptionsClick(value: { id: string; text: string }, index: number) {
    // eslint-disable-next-line no-console
    console.log(value, index)
    this.setState({
      value: value.id,
      visible: false
    })
  }

  onMultipleOptionsClick(value: { id: string; text: string }, index: number) {
    const multipleValue = [...this.state.multipleValueCache]

    if (multipleValue.includes(value.id)) {
      multipleValue.splice(multipleValue.indexOf(value.id), 1)
    } else {
      multipleValue.push(value.id)
    }

    this.setState({
      multipleValueCache: [...multipleValue]
    })
  }

  onOk() {
    this.setState({
      multipleVisible: false,
      multipleValue: this.state.multipleValueCache
    })
  }

  render() {
    const { value, data, multipleVisible, multipleValueCache } = this.state
    return (
      <View>
        <MMNavigation title="动作面板" />
        <View className="container">
          <View className="spacing" />
          <MMButton onClick={() => this.setState({ visible: true })} text="单选打开" />
          <MMActionSheet onClosed={this.onCancel} onSelect={this.onOptionsClick} title="请选择" visible={this.state.visible} actions={data} />
        </View>
      </View>
    )
  }
}
