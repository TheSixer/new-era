import { CSSProperties } from 'react'

export interface IPageContainerProps {
  className?: string

  style?: CSSProperties | string

  /**
   * 是否需要垫高
   */
  noPlace?: boolean

  /**
   * 是否是tab页
   *
   * 设置为tab页面。会额外提供一个tabbar的高度
   */
  isTab?: boolean
}
