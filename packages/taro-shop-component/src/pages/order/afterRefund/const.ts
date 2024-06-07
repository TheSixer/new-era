import { ERefundScene } from '@wmeimob/shop-data/src/enums/refund/ERefundScene'
import { RefundReasonOutputDto } from '@wmeimob/taro-api'

export interface IAfterRefundProps {}

export interface IAfterResons extends RefundReasonOutputDto {
  label: string

  value: any

  types: string[]
}

export interface IAfterFormValues {
  /** 货物状态 - 售后理由申请类型 */
  goodsStatus: ERefundScene
  /** 退款原因 */
  refundReson?: number
  /** 退款金额 */
  refundAmount: number
}
