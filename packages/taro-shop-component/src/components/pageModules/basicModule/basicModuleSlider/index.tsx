import { View, Swiper, SwiperItem } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getModuleSliderDefaultProps, IBasicModuleSliderProps, IBasicModuleSliderState } from './const'
import styles from './index.module.less'
import { autobind } from '@wmeimob/decorator'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { PageContext } from '../../const'
import HotZone from '../../hotZone'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import { ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { getMaxScreenWitdh, navByLink } from '../../utils'
import { getResizeUrl } from '@wmeimob/aliyun'
import { PureComponent, useMemo, useState } from 'react'
import classNames from 'classnames'
import { getGlobalData } from '@wmeimob/taro-global-data'
import { divide, minus, round, times } from 'number-precision'

@autobind
export default class BasicModuleSlider extends PureComponent<IBasicModuleSliderProps, IBasicModuleSliderState> {
  static myContext = PageContext

  static defaultProps = getModuleSliderDefaultProps()

  state: IBasicModuleSliderState = {
    width: 0,
    // height: 0,
    innerAutoPlay: true,
    current: 0
  }

  $instance = getCurrentInstance()

  get calcHeight() {
    if (!this.state.width) {
      return 0
    }

    const pagePadding = (this.props.componentStyle.pagePadding || 0) * 2

    const settingInnerWith = minus(375, pagePadding) // 减掉不参与等比的间距值
    const ratio = divide(this.state.width, settingInnerWith)
    const realHeight = round(times(this.props.height, ratio), 4)

    return realHeight
  }

  componentWillUnmount() {
    // const { onHide: onHideEventId, onShow: onShowEventId } = this.$instance?.router || {}
    // onShowEventId && eventCenter.off(onShowEventId, this.onShow)
    // onHideEventId && eventCenter.off(onHideEventId, this.onHide) // 卸载
  }

  componentDidMount() {
    // FIXED: 修复轮播图从后台切到前台抽搐的问题
    // const { onHide: onHideEventId, onShow: onShowEventId } = this.$instance?.router || {}
    // console.log('onHideEventId', onHideEventId, onShowEventId)
    // onShowEventId && eventCenter.on(onShowEventId, this.onShow)
    // onHideEventId && eventCenter.on(onHideEventId, this.onHide)

    try {
      const padding: number = (this.props.componentStyle.pagePadding || 0) * 2
      const width = getMaxScreenWitdh() - padding
      this.setState({ width })
    } catch (error) {}
  }

  render() {
    const { data = [], height, interval = 0, componentStyle } = this.props
    const { width, innerAutoPlay, current } = this.state
    const { style } = useComponentStyle(componentStyle)

    // 轮播图修改
    const changeDot = (event) => {
      const {
        detail: { current }
      } = event
      this.setState({ current })
    }

    const isH5 = getGlobalData('isH5')

    const _height = this.calcHeight

    return (
      <View className={styles.basicModuleSliderStyle} style={style}>
        <View className={styles.content}>
          <Swiper autoplay={!!interval && innerAutoPlay} onChange={changeDot} interval={interval * 1000} style={{ height: _height }} circular={!isH5}>
            {data.map((item, index) => (
              <SwiperItem key={item.key} className={styles.swiperItem} onClick={() => this.handleClickSwiper(item, index)}>
                <View className={styles.img} style={{ backgroundImage: `url(${item.url + getResizeUrl({ width, height: _height })})`, height: _height }} />
                <HotZone data={item.hotZones} mode={item.jumpMode} />
              </SwiperItem>
            ))}
          </Swiper>
          <View className={styles.swiperDots}>
            {data.map((item, index) => (
              <View key={item.key} className={classNames(styles.dotItem, index === current && styles.dotItemActive)} />
            ))}
          </View>
        </View>
      </View>
    )
  }

  handleClickSwiper = ({ jumpMode, link }: ImageLinkDataDTO, index: number) => {
    const { pageType, pageParams } = this.context
    if (jumpMode === EJumpLinkMode.Link) {
      navByLink(link.type, link.content, pageType, pageParams)
    }
  }

  onHide = () => {
    this.setState({ innerAutoPlay: false })
  }

  onShow = () => {
    this.setState({ innerAutoPlay: true })
  }
}
