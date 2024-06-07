import { CSSProperties } from 'react'
import { IComponentProps } from '../types'

export interface IFootBarProps extends IComponentProps {
  /**
   * 是否动态高度
   *
   * 一般而言底部的高度会根据内部的高度进行计算。但是只会在渲染后计算一次
   * 如果说子级的内容是会发生变化。并且需要重新计算高度的话。
   * 那么你可以将此设置为true。这样在children发生变化时也会重新计算高度
   * @default false
   * @warn 开启动态会造成多次渲染。不利于性能优化。你可以手动指定内部容器高度
   */
  dynamic?: boolean

  /**
   * 设置背景色
   *
   * @default #ffffff
   * @description 设置为false则没有背景色
   */
  backgroundColor?: CSSProperties['backgroundColor'] | false

  /**
   * 是否显示 borderTop
   * @default false
   */
  border?: boolean

  /** 去除内部间距 */
  noStyle?: boolean
}
