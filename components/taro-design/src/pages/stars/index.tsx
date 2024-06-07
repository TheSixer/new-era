import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import Navigation from '~/components/navigation/index'
import { View } from '@tarojs/components'
import { autobind } from '@wmeimob/decorator'
import MMStars from '~/components/stars'
import { MMStarsSize } from '~/components/stars/const'
import IconFontName from '~/components/icon-font/const'

@autobind
export default class Index extends Component {
  config: Config = {
    navigationStyle: 'custom'
  }

  state = {
    value: 3.5
  }

  renderButton() {
    return <View>jsx</View>
  }

  render() {
    return (
      <View>
        <Navigation title="星级" />
        <View className="container">
          <View className="spacing" />
          <MMStars value={this.state.value} onChange={this.onChange} />
          <View className="spacing" />
          <MMStars value={this.state.value} size={MMStarsSize.Big} onChange={this.onChange} />
          <View className="spacing" />
          <MMStars value={this.state.value} iconfontName={IconFontName.Rating} size={MMStarsSize.Big} onChange={this.onChange} />
          <View className="spacing" />
          <MMStars value={this.state.value} iconfontName={IconFontName.Smile} size={MMStarsSize.Big} onChange={this.onChange} />
        </View>
      </View>
    )
  }

  onChange(value: number) {
    this.setState({ value })
  }
}
