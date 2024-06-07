import { ReactNode } from 'react'

export type TOperationsColumnOperation =
  | {
      /** 编辑或者删除 */
      id: 'edit' | 'del'
      /** 文本 */
      text?: ReactNode
      /** 是否显示 */
      show?: boolean
      /** 点击事件 */
      onClick?: () => any
    }
  | {
      /** 唯一id */
      id: string
      /** 文本 */
      text?: ReactNode
      /** 是否显示 */
      show?: boolean
    }

export interface IOperationsColumnsProps {
  /**
   * 操作项
   * 默认是编辑(edit)和删除(del)。你可以自行扩展和声明顺序
   *
   */
  operations?: TOperationsColumnOperation[]
}
