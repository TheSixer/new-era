import { CSSProperties } from 'react'
import { IComponentProps } from '../types'

export interface IImageListProps extends IComponentProps {
  /** 图片数据 */
  data: string[]

  /**
   * 一行显示几个
   *
   * @default 3 imagePickerNumber
   */
  column?: number

  /**
   * 图片间距
   *
   * @default spacingBase 5px
   */
  gap?: string

  /**
   * 预览
   *
   * @default true
   */
  preview?: boolean

  /**
   * 对齐方式
   */
  justifyContent?: CSSProperties['justifyContent']
}
