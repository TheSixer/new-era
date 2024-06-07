/* eslint-disable no-console */
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMNavigation from '~/components/navigation'

@autobind
export default class Index extends Component {
  state = {
    number: 0,
    visible: true,
    visibleTransparent: false,
    visibleProps: false,
    visibleAlert: false
  }

  componentDidMount() {
    const query = Taro.createSelectorQuery()
    query
      .select('#test')
      .fields((res) => {
        console.log(res)
        // resolve(res as Taro.clientRectElement);
      })
      .exec()
  }

  renderButton() {
    return <View>jsx</View>
  }

  render() {
    const { visible } = this.state
    return (
      <View>
        <MMNavigation title="下拉刷新" />
        <Text onClick={() => console.log('1')}>1111111111111111</Text>
        <Text>2222222222222</Text>
        <Text>3333333333</Text>
        {visible && (
          <View
            onClick={() =>
              this.setState({
                visible: false
              })
            }
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.2)'
            }}
          />
        )}

        {/* <View id="test">
                    <Swiper className={styles.swiper} display-multiple-items={4} vertical={true}>
                        <SwiperItem>1111</SwiperItem>
                        <SwiperItem>2222</SwiperItem>
                        <SwiperItem>33333</SwiperItem>
                        <SwiperItem>44444</SwiperItem>
                        <SwiperItem>5555</SwiperItem>
                        <SwiperItem>666666</SwiperItem>
                        <SwiperItem>777</SwiperItem>
                        <SwiperItem>8888</SwiperItem>
                        <SwiperItem>99999</SwiperItem>
                        <SwiperItem>00000</SwiperItem>
                    </Swiper>
                </View> */}
      </View>
    )
  }

  onScroll(event) {
    console.log('event', event.detail.scrollTop)
  }

  onPageScroll(event) {
    console.log('onPageScroll', event)
  }

  onRefresh() {
    // eslint-disable-next-line no-console

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }
}
