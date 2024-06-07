import { EJumpLinkMode } from '../enums/EJumpLinkMode'
import { IHotZoneValue } from './IHotZoneValue'
import { IJumpLink } from './IJumpLink'

/**
 * 链接图片数据
 */
export interface ImageLinkDataDTO {
  /** 图片名称 */
  name: string

  /** 唯一key */
  key: string

  /** 图片url */
  url: string

  /** 跳转模式 */
  jumpMode: EJumpLinkMode

  /** 链接 */
  link: IJumpLink

  /** 热点连接 */
  hotZones?: IHotZoneValue[]
}
