import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMCarousel from '~/components/carousel'
import Navigation from '~/components/navigation/index'
import { autobind } from '@wmeimob/decorator'

@autobind
export default class Index extends Component {
  state = {
    value: ['red', 'blue', 'yellow']
  }

  render() {
    return (
      <View>
        <Navigation title="走马灯" />
        <MMCarousel images={['https://dss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/37.jpg?2', 'https://dss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/37.jpg?2']} />
      </View>
    )
  }
}
