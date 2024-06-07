import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 售后类型
 */
export enum ERefundType {
  /** 仅退款 */
  Refund,

  /** 退货退款 */
  Every
}

export const [MRefundType, ORefundType] = convertEnum([
  [ERefundType.Refund, '仅退款'],
  [ERefundType.Every, '退货退款']
])
