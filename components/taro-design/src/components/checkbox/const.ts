/* eslint-disable no-use-before-define */

import { ReactNode } from 'react'
import { IComponentProps } from '../types'

export interface ICheckboxProps extends IComponentProps {
  /**
   * 是否选中值
   */
  value: boolean

  /**
   * 形状
   *
   * 自定义渲染无效
   */
  shape?: ECheckboxShape | keyof typeof ECheckboxShape

  /**
   * 多选框大小
   *
   * 自定义渲染无效
   * @default 18
   */
  size?: number

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 未选中图片样式
   */
  renderUnCheck?: ReactNode

  /**
   * 选中图片
   *
   * 自己定义选中的图片样式
   */
  renderCheck?: ReactNode

  /**
   * 选中变化事件
   * @param value
   */
  onChange?(value: boolean): void
}

export enum ECheckboxShape {
  /**
   * 圆角方形
   */
  Square = 'Square',

  /**
   * 圆形
   */
  Circle = 'Circle'
}
