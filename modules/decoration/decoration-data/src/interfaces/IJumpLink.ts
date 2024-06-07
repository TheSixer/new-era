import { EJumpType } from '../enums/EJumpType'

export interface IJumpLink {
  /** 跳转类型 */
  type: EJumpType
  /** 文本 */
  content: string
}
