/* eslint-disable no-console */
import { PropsWithChildren, PureComponent } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { ITouch, ITouchEvent } from '@tarojs/components/types/common'
import Taro, { getCurrentInstance, nextTick } from '@tarojs/taro'
import classname from 'classnames'
import { autobind, debounce, throttleLast } from '@wmeimob/decorator'
import { IMMPullToRefreshProps, IMMPullToRefreshState, MMPullToRefreshState } from './const'
import styles from './index.modules.less'
import MMLoading from '../loading'
import { MMguid, isIphone, selectRect } from '../utils'
import { getGlobalData } from '@wmeimob/taro-global-data'

/**
 * @name 下拉刷新
 */
@autobind
export default class MMPullToRefresh extends PureComponent<PropsWithChildren<IMMPullToRefreshProps>, IMMPullToRefreshState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    enablePull: true,
    height: 0,
    noMoreText: '没有更多了',
    bottom: false,
    showScrollbar: true,
    height1: 0
  }

  static loadingHeight = 50

  static getDerivedStateFromProps(nextProps: IMMPullToRefreshProps, prevState: IMMPullToRefreshState) {
    if (nextProps.state === MMPullToRefreshState.refreshing) {
      return {
        top: MMPullToRefresh.loadingHeight,
        pulling: false
      }
    }

    if (prevState.pulling) {
      return null
    }

    return {
      top: 0
    }
  }

  public state: IMMPullToRefreshState = {
    pulling: false,
    scrollViewHeight: 0,
    // eslint-disable-next-line no-invalid-this
    top: this.props.state === MMPullToRefreshState.refreshing ? MMPullToRefresh.loadingHeight : 0,
    showNoMoreText: false,
    height1: 0
    // scrollTop: undefined
  }

  /** 当前滚动条高度 */
  private scrollTop = 0

  /** 记录开始startTouch */
  private startTouch: ITouch | undefined

  /** 可以拖动开始 */
  private get canPull() {
    if (this.props.state !== MMPullToRefreshState.none) {
      return false
    }

    if (this.scrollTop > 5) {
      return false
    }
    return true
  }

  private idUid = ''

  private get classNameContent() {
    const classNames = [styles.content]
    if (this.props.state === MMPullToRefreshState.refreshing) {
      classNames.push(styles.content__refreshing)
    }

    return classname(...classNames)
  }

  // 键盘收回重新计算高度
  onResize() {
    nextTick(() => {
      this.calculateScrollViewHeight()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  componentDidMount() {
    this.idUid = MMguid()
    nextTick(() => {
      this.calculateScrollViewHeight()
    })
    window.addEventListener('resize', this.onResize)
    this.setNoMore()
    console.log(1, this.idUid)
  }

  componentDidUpdate() {
    nextTick(() => {
      this.calculateScrollViewHeight()
    })
    this.setNoMore()
  }

  render() {
    const { top } = this.state
    const height = MMPullToRefresh.loadingHeight
    const style = this.state.scrollViewHeight !== 0 ? { height: this.state.scrollViewHeight + 'px' } : {}

    return (
      <View className={classname(styles.MMPullToRefresh, this.props.className)} style={{ ...style, ...this.props.style }}>
        <View id={'MM' + this.idUid} />
        <ScrollView
          id="InnerScrollView"
          // scrollTop={this.state.scrollTop}
          style={{
            overscrollBehavior: isIphone ? 'none' : undefined
          }}
          scrollY={true}
          enhanced={true}
          bounces={false}
          showScrollbar={this.props.showScrollbar}
          // style={style}
          onScroll={this.onScroll}
          lowerThreshold={100}
          onScrollToLower={this.onScrollToLower}
          className={styles.scrollView}
        >
          <View className={this.classNameContent} style={{ top }} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
            <View className={styles.loading} style={{ marginTop: -height + 'px', height: height + 'px' }}>
              {/* {this.getRefresh()} */}
              <MMLoading size={25} />
            </View>

            {this.props.children}

            {this.renderMyFooter()}

            {this.props.renderFooter}
          </View>
        </ScrollView>
      </View>
    )
  }

  private renderMyFooter() {
    const { state, empty, noMore, noMoreText } = this.props
    const { showNoMoreText } = this.state
    if (state === MMPullToRefreshState.pushing) {
      return (
        <View className={styles.footerLoading}>
          <MMLoading size={25} />
        </View>
      )
    } else if (state !== MMPullToRefreshState.refreshing) {
      if (empty) {
        return empty
      } else if (noMore && showNoMoreText) {
        return <View className={styles.more}>{noMoreText}</View>
      }
    }
  }

  private onScrollToLower() {
    const { state, noMore, onScrollToLower } = this.props
    if (state !== MMPullToRefreshState.pushing && !noMore) {
      this.setState({ showNoMoreText: false })
      onScrollToLower()
    }
  }

  @debounce(100)
  private async reviseScrollTop() {
    Taro.createSelectorQuery()
      .select('#InnerScrollView')
      .scrollOffset((res) => {
        this.scrollTop = res.scrollTop
      })
      .exec()
  }

  private onScroll(event) {
    this.scrollTop = event.target.scrollTop
    this.reviseScrollTop()
  }

  private async calculateScrollViewHeight() {
    const { bottom } = this.props
    let scrollViewHeight = this.props.height
    const height1 = window.innerHeight
    try {
      if (!scrollViewHeight) {
        const topViewRes = await selectRect('#MM' + this.idUid, getCurrentInstance().page)
        const { screenHeight } = Taro.getSystemInfoSync()

        const height = getGlobalData('isWeapp') ? screenHeight : height1
        if (topViewRes) {
          scrollViewHeight = height - topViewRes.top - (bottom ? topViewRes.bottom : 0)
        }
      }
      this.setState({
        scrollViewHeight: scrollViewHeight || 0,
        height1
      })
    } catch (error) {
      console.log(error)
    }
  }

  private setNoMore() {
    const { noMoreTextDelay, noMore, state, empty } = this.props
    // 如果状态完毕、非空并且需要渲染更多
    if (state === MMPullToRefreshState.none && !empty && noMore && !this.state.showNoMoreText) {
      if (noMoreTextDelay) {
        // console.log(noMoreTextDelay, 'noMoreTextDelay', this.state.showNoMoreText)
        setTimeout(() => {
          this.setState({ showNoMoreText: true })
        }, noMoreTextDelay)
      } else {
        this.setState({ showNoMoreText: true })
      }
    }
  }

  @throttleLast(60)
  private onTouchMove(event: ITouchEvent) {
    const { enablePull, state } = this.props
    if (!enablePull) {
      return
    }

    if (!this.canPull) {
      this.startTouch = undefined
      if (state !== MMPullToRefreshState.refreshing) {
        this.setState({ top: 0 })
      }
      return
    }

    const [touche] = event.touches
    if (!this.startTouch) {
      this.startTouch = touche
      return
    }

    const top = touche.clientY - this.startTouch.clientY
    if (top > 0) {
      this.setState({
        pulling: true,
        top: Math.min(top, MMPullToRefresh.loadingHeight)
      })
    }
  }

  private async onTouchEnd(_event: ITouchEvent) {
    if (!this.canPull) {
      return
    }

    if (this.state.top < MMPullToRefresh.loadingHeight) {
      this.setState({ top: 0 })
      this.startTouch = undefined
      return
    }

    this.setState({ top: MMPullToRefresh.loadingHeight, pulling: false })
    this.startTouch = undefined

    this.setState({ showNoMoreText: false })
    this.props.onRefresh()
  }
}
