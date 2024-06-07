import { EJumpType } from '../enums/EJumpType'

export interface IHotZoneValue {
  /** id */
  id: string
  /** 距离左边距离 */
  left: number
  /** 距离顶部距离 */
  top: number
  /** 热区宽度 */
  width: number
  /** 热区高度 */
  height: number
  /** 链接配置 */
  link: {
    /** 链接类型 */
    type: EJumpType
    /** 链接文本 */
    content: string
  }
}
