import { EActivityStep } from '../../../enums/activity/EActivityStep'
import { MarketingActivityDto } from '@wmeimob/taro-api'

export interface IGoodDetailProps {}

/** 限时抢购活动 */
export interface IFlashSale extends MarketingActivityDto {
  /** 活动阶段 */
  activityStep: EActivityStep

  /** 活动开始时间(毫秒) */
  startTimestamp: number

  /** 活动结束时间(毫秒) */
  endTimestamp: number
}

/** 商品已下架 code */
export const GOODS_OFF_CODE = 50000

export interface IRouteParams {
  /** 扫分享码进来的商品编码 */
  scene?: string
  /** 商品编码 */
  goodsNo?: string
}
