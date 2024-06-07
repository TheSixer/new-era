import { ReactNode } from 'react'

/**
 * 选择器标题项props
 */
export interface IPickerTitleProps {
  /** 标题 */
  title?: ReactNode

  /** 确定文本 */
  okText?: ReactNode

  /**
   * 取消文本
   * @default false
   */
  cancelText?: ReactNode | false

  /** 点击确定 */
  onOk?(): void

  /** 点击取消 */
  onCancel?(): void
}
