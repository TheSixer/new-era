import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMItem from '~/components/item'
import MMItemInput from '~/components/item/input'
import MMItemLeftIconfont from '~/components/item/leftIconfont'
import MMItemRightIconfont from '~/components/item/rightIconfont'
import MMItemText from '~/components/item/text'
import MMNavigation from '~/components/navigation'

@autobind
export default class Index extends Component {
  state = {
    checkId: 1
  }

  render() {
    return (
      <View>
        <MMNavigation title="列表" />
        <View className="spacing" />
        <MMItem text="标题文字" onClick={this.onClick}>
          <MMItemRightIconfont />
        </MMItem>
        <MMItem renderLeft={<View>自定义左侧</View>} />

        <MMItem
          renderLeft={
            <View className="flexC">
              <MMItemLeftIconfont />
              <View className="spacing" />
              <View>组合</View>
            </View>
          }
        >
          <View>自定义右侧</View>
        </MMItem>

        <MMItem text="滑块删除" sliderButton={['删除']} onSliderButtonClick={this.onSliderButtonClick} />
        <MMItem
          text="自定义滑块"
          sliderButton={[
            {
              text: '删除',
              backgroundColor: 'red',
              color: 'white'
            },
            {
              text: '删除2',
              backgroundColor: 'blue',
              color: 'white'
            }
          ]}
          onSliderButtonClick={this.onSliderButtonClick}
        />

        <MMItem text="文本输入">
          <View className="flex1">
            <MMItemInput placeholder="请输入" />
          </View>
        </MMItem>

        <MMItem>
          <MMItemText>收货人</MMItemText>
          <View className="flex1">
            <MMItemInput textAlign="left" placeholder="请输入" />
          </View>
        </MMItem>
      </View>
    )
  }

  private onSliderButtonClick(value: string | { text: string; backgroundColor: string; color: string }, index: number) {
    // eslint-disable-next-line no-console
    console.log(value, index)
  }

  private onClick() {
    // eslint-disable-next-line no-console
    console.log('xxxx')
  }
}
