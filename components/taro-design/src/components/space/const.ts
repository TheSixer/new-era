import { IComponentProps } from '../types'

export interface ISpaceProps extends IComponentProps {
  /**
   * 间隔
   *
   * @default 10
   */
  gap?: number

  children?: any

  /**
   * 布局方向
   *
   * @default row
   */
  direction?: 'row' | 'column'
}
