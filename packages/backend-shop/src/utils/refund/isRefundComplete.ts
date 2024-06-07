import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'

/**
 * 判断售后单是否成功
 * @param info
 * @returns
 */
export default function isRefundComplete(refundStatus: ERefundStatus) {
  return [ERefundStatus.Complete, ERefundStatus.Process].includes(refundStatus!)
}
