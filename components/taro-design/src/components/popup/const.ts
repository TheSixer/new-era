import { CSSProperties, ReactNode } from 'react'
import { IMMModalProps } from '../modal'
import { IComponentProps } from '../types'

export interface IMMPopupProps extends Pick<IMMModalProps, 'visible' | 'onClose' | 'maskClosable'>, IComponentProps {
  /** 标题 */
  title?: ReactNode

  /** 副标题 */
  subTitle?: string

  /** 自定义渲染footer */
  footer?: ReactNode

  /** 样式 */
  contentStyle?: React.CSSProperties

  /** 底部样式 */
  footerStyle?: React.CSSProperties

  /**
   * 标题对齐方式
   *
   * @default center
   */
  titleAlign?: 'left' | 'center'

  /**
   * 是否显示右上角关闭按钮
   *
   * @default true
   */
  close?: boolean

  /**
   * 设置弹窗背景色
   *
   * @warn 这个属性是一个逃课方法。后期大概率会重写。谨慎使用
   */
  backgroundColor?: CSSProperties['backgroundColor']

  /**
   * 是否关闭 new iphone 的垫高
   *
   * @default false
   */
  noPlace?: boolean
  /**
   * title 下面的分割线
   * @default false
   */
  noDivider?: boolean
}

export interface IMMPopupState {}
