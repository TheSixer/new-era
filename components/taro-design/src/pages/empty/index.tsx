import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMNavigation from '~/components/navigation'
import MMEmpty from '~/components/empty'
import { EMMEmpty } from '~/components/empty/const'
import { autobind } from '@wmeimob/decorator'
import MMButton from '~/components/button'

@autobind
export default class Index extends Component {
  state = {
    list: Object.keys(EMMEmpty).splice(Object.keys(EMMEmpty).length / 2, Object.keys(EMMEmpty).length / 2),
    index: 0
  }

  // componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View style={{ height: '100%' }}>
        <MMNavigation title="空状态" />
        <View className="container">
          <View className="spacing" />
          <MMButton onClick={this.onClick}>切换</MMButton>
          <MMEmpty type={EMMEmpty[this.state.list[this.state.index]]} />
        </View>
      </View>
    )
  }

  onClick() {
    if (this.state.index < this.state.list.length - 1) {
      this.setState({
        index: this.state.index + 1
      })
    } else {
      this.setState({
        index: 0
      })
    }
  }
}
