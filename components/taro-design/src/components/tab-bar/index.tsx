import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { autobind } from '@wmeimob/decorator'
import MMIconFont from '../icon-font'
import styles from './index.modules.less'
import classNames from 'classnames'
import { isNewIphone } from '../utils'
import MMBadge from '../badge'
import MMIconFontName from '../icon-font/name'
import { PureComponent } from 'react'

interface IMMTabBarData {
  /**
   * 图标
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  image?: any

  /**
   * 选中时候的样式
   *
   * @type {*}
   * @memberof IMMTabBarData
   */
  imageSelected?: any

  /**
   * iconfont值
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  iconfont?: MMIconFontName
  /**
   * 文字
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  text: string
  /**
   * 跳转连接
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  url: string
  /**
   * 红点
   *
   * @type {boolean}
   * @memberof IMMTabBarData
   */
  redHot?: boolean
  /**
   * 未读数
   *
   * @type {number}
   * @memberof IMMTabBarData
   */
  count?: number
}

interface IMMTabBarProps {
  /**
   * 点击事件 返回false 可以组织页面的跳转
   *
   * @memberof IMMTabBarProps
   */
  onClick?: (data: IMMTabBarData) => boolean | void

  /**
   *  tabar数据
   *
   * @type {IMMTabBarData}
   * @memberof IMMTabBarProps
   */
  data?: IMMTabBarData[]

  /**
   * 当前激活路径
   */
  path?: string
}

export interface IMMTabBarState {
  /**
   * 当前页面index
   *
   * @type {number}
   * @memberof IMMTabBarState
   */
  currPageIndex: number

  /**
   * 导航数据
   *
   * @type {IMMTabBarData[]}
   * @memberof IMMTabBarState
   */
  data: IMMTabBarData[]
}

const MMTabBarList: MMTabBar[] = []

/**
 * @name 标签栏
 */
@autobind
export default class MMTabBar extends PureComponent<IMMTabBarProps, IMMTabBarState> {
  static currPageIndex = 0

  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<IMMTabBarProps> = {}

  static data: IMMTabBarData[] = [
    {
      iconfont: MMIconFontName.Admin,
      url: '/pages/template/index/index',
      text: '首页'
    },
    {
      iconfont: MMIconFontName.Aftermarket,
      url: '/pages/components/index',
      text: '组件'
    }
  ]

  state: IMMTabBarState = {
    currPageIndex: MMTabBar.currPageIndex,
    data: this.getData()
  }

  getData() {
    if (this.props.data) {
      MMTabBar.data = this.props.data
    }
    return MMTabBar.data
  }

  componentDidShow() {
    this.setPath()
  }

  render() {
    const { currPageIndex, data } = this.state

    console.log('props', data)

    return (
      <View>
        <View className={styles.MMTabBar_placeholder} />
        {isNewIphone && <View className="spacingIphone" />}
        <View className={styles.MMTabBar}>
          <View className={styles.content}>
            {data.map((value, index) => (
              <View key={value.text} className={this.getClassName(index)} onClick={() => this.onClick(value, index)}>
                <View className={styles.iconfont}>
                  {value.image ? (
                    <View className={classNames(styles.image, currPageIndex === index ? value.imageSelected : value.image)} />
                  ) : (
                    <MMIconFont
                      value={value.iconfont as any}
                      size={styles.iconSize}
                      color={currPageIndex === index ? styles.primaryColor : styles.tabBarFontColor}
                    />
                  )}
                  {value.redHot && <MMBadge absolute />}
                  {value.count && (
                    <View className={styles.count}>
                      <MMBadge value={value.count} absolute />
                    </View>
                  )}
                </View>
                <View className={styles.text}>{value.text}</View>
              </View>
            ))}
          </View>
          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </View>
    )
  }

  componentDidMount() {
    process.env.TARO_ENV === 'h5' && Taro.hideTabBar({})
    MMTabBarList.push(this)
    this.setPath()
  }

  setPath() {
    const { path } = this.props
    if (path) {
      this.setAllState({
        currPageIndex: this.state.data.findIndex((value) => value.url === path.replace(/\?.*$/g, ''))
      })
    }
  }

  setRedDot(index: number, redHot: boolean) {
    this.setAllState({
      data: this.state.data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.redHot = redHot
        }
        return value
      })
    })
  }

  setCount(index: number, count: number) {
    this.setAllState({
      data: this.state.data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.count = count
        }
        return value
      })
    })
  }

  setAllState(state: Partial<IMMTabBarState>) {
    MMTabBarList.forEach((value) => value.setState(state as IMMTabBarState))
  }

  private getClassName(index) {
    const { currPageIndex } = this.state
    return classNames(styles.item, currPageIndex === index ? styles.selected : {})
  }

  private onClick(data: IMMTabBarData, index: number) {
    if (index !== this.state.currPageIndex) {
      MMTabBarList.forEach((value) =>
        value.setState({
          currPageIndex: index
        })
      )
      MMTabBar.currPageIndex = index
      Taro.switchTab({
        url: data.url
      })
    }
  }
}
