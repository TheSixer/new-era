import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'

export interface IMmTabBarProps {
  /** tabar数据 */
  data?: IMMTabBarData[]

  /** 当前激活路径 */
  path?: string

  /** 点击跳转之前 */
  beforeClick?: () => Promise<boolean>

  /** 点击事件 返回false 可以组织页面的跳转 */
  onClick?: (data: IMMTabBarData) => boolean | void
}

export interface IMmTabBarState {
  /** 当前页面index */
  currPageIndex: number

  /** 导航数据 */
  data: IMMTabBarData[]
}

export interface IMMTabBarData {
  /** 图标 */
  image?: any

  /** 选中时候的样式 */
  imageSelected?: any

  /** iconfont值 */
  iconfont?: MMIconFontName

  /** 文字 */
  text: string

  /** 跳转连接 */
  url: string

  /** 红点 */
  redHot?: boolean

  /** 未读数 */
  count?: number
}
