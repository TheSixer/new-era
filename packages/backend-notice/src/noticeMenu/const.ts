import React, { ReactNode } from 'react'
import { StationMessageOutputDto } from '../request/data-contracts'

export interface INoticeMenuProps<T = any> {
  /**
   * 渲染每项内容
   */
  renderItem?: (item: T, index: number) => React.ReactNode

  /** 底部 */
  footer?: ReactNode
  /**
   * 点击清空全部
   */
  onClear?(): Promise<any>

  /**
   * 点击查看全部
   */
  onShowAll?(): void

  /** 点击消息 */
  onClick?(item: StationMessageOutputDto): void
}
