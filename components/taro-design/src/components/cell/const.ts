import { CSSProperties, ReactNode } from 'react'
import { ComponentSize, IComponentProps } from '../types'

export interface ICellProps extends IComponentProps {
  /**
   * 左侧标题
   */
  title?: ReactNode

  /**
   * 左侧icon
   */
  icon?: ReactNode

  /**
   * 是否显示箭头
   */
  arrow?: boolean

  /** 箭头样式 */
  arrowStyle?: CSSProperties

  /**
   * 名称
   * 用于跟cellGroup 配合使用时触发cellGroup组件的onClick事件
   */
  name?: string

  /** 组件size */
  size?: ComponentSize

  /** ·
   * 是否显示底部边框
   *
   * @default false
   */
  border?: boolean

  /**
   * 占位符
   */
  placeholder?: ReactNode

  /**
   * 标题对齐方式
   * @default center
   */
  titleAlign?: 'top' | 'center' | 'bottom' | 'baseline'

  /**
   * 值文本对齐方式
   *
   * 'right' - 右侧对齐 | 'left'- 左侧对齐 | center-居中
   * @default right
   */
  valueAlign?: 'left' | 'center' | 'right'

  /**
   * 无样式
   * 在配合类型弹窗组件或者card组件时。需要去除部分样式
   * @description 去除左右padidng
   */
  noStyle?: boolean

  /**
   * 点击事件
   */
  onClick?: () => void
}

export interface ICellGroupProps extends IComponentProps {
  /** 分组标题	 */
  title?: ReactNode

  onClick?: (name: string, index: number) => void
}
