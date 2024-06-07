import { ReactNode } from 'react'

export interface ISwipeCellProps {
  /** 是否显示滑块 */
  visible?: boolean
  /**
   * 滑块按钮
   */
  sliderButtons: ISwipeCellButton[]

  /** 是否禁用滑动 */
  disabled?: boolean

  /**
   * 点击滑块按钮之前的钩子函数
   * 可以手动控制是否不关闭
   */
  beforeClose?: (value: ISwipeCellButton, index: number) => boolean | Promise<boolean>

  /** 点击滑块button */
  onClickButton?(value: ISwipeCellButton, index: number): void

  /**
   * 滑块显示隐藏变化
   */
  onVisibleChange?(visible: boolean): void
}

export interface ISwipeCellButton {
  /** 文本内容 */
  text: ReactNode
  /** 背景颜色 */
  backgroundColor?: string
  /** 文本颜色 */
  color?: string
}
