import { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro, { getCurrentInstance, nextTick } from '@tarojs/taro'
import { autobind, debounce } from '@wmeimob/decorator'
import styles from './index.modules.less'
import MMIconFont from '../icon-font'
import classNames from 'classnames'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { selectRect, guid } from '../utils'
import { IItemProps } from './const'

/**
 * @name 列表
 */
@autobind
export default class MMItem extends PureComponent<IItemProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    divider: true,
    // sliderButton: ['删除', '取消'],
    sliderVisible: true,
    onClick: () => null
  }

  state = {
    scrollLeft: 0,
    scrollViewWidth: Taro.getSystemInfoSync().windowWidth
  }

  private buttonWidth = 0

  private scrollLeCache = 0

  private mmItemId = guid()

  get className() {
    const classnames = [styles.content]
    return classnames
  }

  render() {
    const { sliderButton } = this.props
    return <View>{sliderButton ? this.renderScrollView() : this.renderContent()}</View>
  }

  componentDidMount() {
    if (this.props.sliderButton) {
      nextTick(() => {
        this.calculateScrollViewHeight()
      })
    }
  }

  renderScrollView() {
    const { scrollLeft } = this.state
    const mmItemId = this.mmItemId

    return (
      <ScrollView
        id={'MMScrollView' + mmItemId}
        throttle={false}
        scrollX
        scrollLeft={scrollLeft}
        className={styles.scrollView}
        onScroll={this.onScroll as any}
        bounces={true}
        scrollAnchoring={true}
        onTouchEnd={this.onTouchEnd}
      >
        <View className={styles.scrollViewContent}>
          {this.renderContent()}
          {this.renderButtons()}
          <View id={'MMPullToRefreshTop' + mmItemId} />
        </View>
      </ScrollView>
    )
  }

  private renderButtons() {
    const { props } = this
    const { sliderButton, onSliderButtonClick } = props

    return (
      sliderButton &&
      sliderButton.map((button, index) => {
        const sliderText = typeof button === 'string' ? button : button.text
        const style =
          typeof button === 'string'
            ? {
                backgroundColor: index % 2 === 0 ? styles.buttonColorOdd : styles.buttonColorEven
              }
            : { backgroundColor: button.backgroundColor, color: button.color }
        return (
          <View key={sliderText} style={style} onClick={() => onSliderButtonClick && onSliderButtonClick(button, index)} className={styles.sliderButton}>
            {sliderText}
          </View>
        )
      })
    )
  }

  private renderContent() {
    const { onClick, text: leftText, iconfontColor: leftIconfontNameColor, sliderButton, iconfontValue: leftIconfontName } = this.props
    const { scrollViewWidth } = this.state
    return (
      <View onClick={onClick} className={styles.MMItem} style={{ width: sliderButton ? scrollViewWidth + 'px' : 'auto' }}>
        {leftIconfontName && (
          <View className={styles.leftIconfont}>
            <MMIconFont color={leftIconfontNameColor} value={leftIconfontName} />
          </View>
        )}
        <View className={classNames(this.className)}>
          <View className={styles.left}>
            {leftText && <View className={styles.leftText}>{leftText}</View>}
            {this.props.renderLeft}
          </View>
          <View className={styles.right}>{this.props.children}</View>
        </View>
      </View>
    )
  }

  private async calculateScrollViewHeight() {
    const scrollView = await selectRect('#MMScrollView' + this.mmItemId, getCurrentInstance().page)
    this.setState({
      scrollViewWidth: scrollView.width
    })
    const topViewRes = await selectRect('#MMPullToRefreshTop' + this.mmItemId, getCurrentInstance().page)
    const res = Taro.getSystemInfoSync()
    this.buttonWidth = topViewRes.left - res.screenWidth
  }

  @debounce(300)
  private onScroll(event: BaseEventOrig<{ scrollLeft: number }>) {
    this.scrollLeCache = event.detail.scrollLeft
    this.setState({
      scrollLeft: event.detail.scrollLeft
    })
  }

  private onTouchEnd() {
    const max = this.buttonWidth / 2
    const { scrollLeCache } = this
    const scrollLeft = scrollLeCache >= max ? this.buttonWidth : 0
    this.setState({
      scrollLeft
    })
  }
}
