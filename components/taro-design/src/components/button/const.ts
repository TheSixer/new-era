import { ITouchEvent } from '@tarojs/components'
import { ReactNode } from 'react'
import { IComponentProps } from '../types'

export enum MMButtonType {
  /** 默认 */
  default = 'default',
  /** 失效 */
  failure = 'failure',

  /** 主色 */
  primary = 'primary',

  /** 警告 */
  warning = 'warning',
  /** h5 蓝色渐变按钮 */
  h5Blue = 'h5Blue',
  /** h5 蓝色渐变按钮 2 */
  h5Blue2 = 'h5Blue2',
  /** h5 紫色渐变按钮 3 */
  h5Blue3 = 'h5Blue3',
  /** h5 红色色渐变按钮 */
  h5Red = 'h5Red',

}

export enum MMButtonSize {
  large = 'large',
  default = 'default',
  small = 'small',
  tiny = 'tiny',
  mini = 'mini'
}

export interface IButtonProps extends IComponentProps {
  /**
   * 按钮颜色
   */
  color?: string

  /** 是否为幽灵按钮 */
  ghost?: boolean

  /**
   * 加载状态
   */
  loading?: boolean

  /**
   * 按钮类型
   */
  type?: MMButtonType | keyof typeof MMButtonType

  /**
   * 按钮大小
   */
  size?: MMButtonSize | keyof typeof MMButtonSize

  /**
   * 禁用
   */
  disabled?: boolean

  /** 是否为block元素 */
  block?: boolean

  /**
   * 文字
   */
  text?: ReactNode

  /**
   * 圆角
   *
   * @description 设置为true.则携带默认圆角。 传递为数字则表示为指定值
   */
  radius?: boolean | number
  /**
   * 背景
   *
   * @description 背景参数
   */
  backGround?: string
  /**
   * 没有边框
   *
   * @description true为有边框,设置边框颜色
   */
  noBorder?: boolean

  /**
   * 点击事件 返回的是promise 未运行完毕不会触发第二次
   */
  onClick?: (event: ITouchEvent) => void | Promise<any>
}
