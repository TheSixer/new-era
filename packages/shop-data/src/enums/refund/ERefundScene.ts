
import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 售后场景
 *
 */
export enum ERefundScene {
  /** 仅退款 */
  REFUND = '1',
  /** 退货退款 */
  RETURN_REFUND = '2'
}

export const [MRefundScene, ORefundScene] = convertEnum([
  [ERefundScene.REFUND, '仅退款'],
  [ERefundScene.RETURN_REFUND, '退货退款']
])

