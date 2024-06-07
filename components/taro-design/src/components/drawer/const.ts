import { IMMModalProps } from '../modal'

export interface MMDrawerProps extends Pick<IMMModalProps, 'visible' | 'onClose'> {
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: number
  /** 取消文本 */
  cancelText?: string
  /** 确定文本 */
  okText?: string

  /** 点击取消事件 */
  onCancel?(): void
  /** 点击确定时间 */
  onOk?(): void
}

export interface MMDrawerState {}
