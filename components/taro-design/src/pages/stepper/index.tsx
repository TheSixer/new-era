import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMStepper from '~/components/stepper/index'
import MMButton from '~/components/button/index'
import { View } from '@tarojs/components'
import { autobind } from '@wmeimob/decorator'
import H2 from '~/components/head/h2'
import MMNavigation from '~/components/navigation'

@autobind
export default class Index extends Component {
  state = {
    value: 5
  }

  stepper: MMStepper

  onChange(value: number) {
    this.setState({
      value
    })
    // eslint-disable-next-line no-console
    console.log(value)
  }

  getValue() {
    // eslint-disable-next-line no-console
    console.log('getValue', this.stepper.value)
  }

  render() {
    const { value } = this.state
    return (
      <View>
        <MMNavigation title="步进器" />
        <View style={{ backgroundColor: 'white' }}>
          <View className="container">
            <View className="spacing" />
            <H2>默认</H2>
            <MMStepper value={value} onChange={(val) => this.setState({ value: val })} />
            <View className="spacing" />

            <H2>最小值(1)/最大值(10)</H2>
            <View className="spacingSmall" />
            <MMStepper min={1} max={10} value={value} onChange={(val) => this.setState({ value: val })} />

            <H2>步进(0.1)</H2>
            <View className="spacingSmall" />
            <MMStepper step={0.1} value={value} onChange={(val) => this.setState({ value: val })} />
          </View>
          <View className="spacing" />
        </View>
      </View>
    )
  }
}
