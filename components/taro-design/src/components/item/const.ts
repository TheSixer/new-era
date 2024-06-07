import { ITouchEvent } from '@tarojs/components'
import MMIconFontName from '../icon-font/const'

export interface IItemProps {
  /**
   * 左侧渲染
   */
  renderLeft?: JSX.Element | string

  /**
   * 左侧图标
   */
  iconfontValue?: MMIconFontName | string

  /**
   * 左侧图标颜色
   */
  iconfontColor?: string

  /**
   * 左侧文字
   */
  text?: string

  /**
   * 滑块文本
   */
  sliderButton?: IItemSliderButton[]

  /**
   * 点击事件
   */
  onClick?: (event: ITouchEvent) => void

  /**
   * 滑块点击
   */
  onSliderButtonClick?: (value: IItemSliderButton, index: number) => void
}

export interface IItemSliderButton {
  /** 文本内容 */
  text: string
  /** 背景颜色 */
  backgroundColor?: string
  /** 文本颜色 */
  color?: string
}
