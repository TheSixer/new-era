import { ReactNode } from 'react'

export interface IMMActionSheetProps {
  /**
   * 是否显示
   */
  visible: boolean

  /**
   * 标题
   */
  title?: ReactNode

  /**
   * 选项
   */
  actions: IMMAction[]

  /**
   * 自定义底部或者不显示底部
   */
  footer?: ReactNode | false

  /**
   * 关闭事件
   */
  onClosed?: () => void

  /**
   * 打开事件
   */
  onOpened?: () => void

  /**
   * 点击选项
   */
  onSelect?: (value: IMMAction, index: number) => void
}

export interface IMMAction {
  /** 唯一key */
  id: string

  /** 文本内容 */
  text: ReactNode
}
