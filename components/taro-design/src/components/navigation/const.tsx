import { ReactNode, CSSProperties } from 'react'
import { IComponentProps } from '../types'

export enum MMNavigationType {
  /** 白色背景，黑色字体 */
  Default = 'Default',

  /** 透明背景。白色字体 */
  Transparent = 'Transparent',

  Primary = 'Primary'
}

export interface IMMNavigationProps extends IComponentProps {
  /**
   * 中间显示的标题
   */
  title?: string

  /**
   * 渲染左边的元素
   *
   */
  renderLeft?: ReactNode

  /**
   * 类型
   */
  type?: MMNavigationType | keyof typeof MMNavigationType

  /**
   * 是否占据高度
   *
   * @default true
   */
  place?: boolean

  /**
   * 是否显示导航阴影
   *
   * 默认情况下导航组件在下面会有一个box-shadow阴影。有时候你需要关掉它
   * @default true
   */
  shadow?: boolean

  /**
   * 导航条样式
   */
  contentClass?: any

  /**
   * 导航条样式
   */
  contentStyle?: CSSProperties

  /**
   * 点击返回之前处理函数
   *
   * @description 你可以通过此函数在返回之前做拦截处理操作。 支持返回一个者异步函数 。结果为true时可以返回。为false时阻止返回
   */
  beforeNavBack?: () => Promise<boolean> | boolean
}

export interface IMMNavigationState {
  /** 根组件样式 */
  rootStyle: CSSProperties

  height: number
}
