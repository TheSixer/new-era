import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { RefundMasterDto } from '@wmeimob/backend-api'
import isRefundComplete from './isRefundComplete'

/**
 * 计算退总积分
 *
 * 判断是否完成状态
 * @param data
 * @returns
 */
export default function calcRefundScore(data: RefundMasterDto, key = 'refundScore') {
  const { refundItemList = [] } = data

  const totalScore = refundItemList.reduce((result, item) => mmAdds(result, item[key] || 0), 0)

  // 如果是实际退积分。判断售后单是否完成
  if (key === 'refundScore') {
    return isRefundComplete(data.refundStatus!) ? totalScore : 0
  }
  return totalScore
}
