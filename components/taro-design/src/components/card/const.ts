import { ReactNode } from 'react'
import { ComponentSize, IComponentProps } from '../types'

export interface ICardProps extends IComponentProps {
  /** 标题 */
  title?: ReactNode

  /** 标题右侧 */
  extra?: ReactNode

  /** 尺寸 */
  size?: ComponentSize

  /** 点击事件 */
  onClick?(): void
}
