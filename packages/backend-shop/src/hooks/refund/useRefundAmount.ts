import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { useMemo } from 'react'
import { EFreightState } from '~/enums/aftersale/EFreightState'
import { RefundMasterDto } from '@wmeimob/backend-api'

const { Complete, Process } = ERefundStatus

/**
 * 售后金额备忘录
 *
 * 接口返回的金额需要根据多种情况进行判断
 * 此hook做统一转换处理
 *
 * @export
 * @param {RefundMasterDto} data
 */
export default function useRefundAmount(data: RefundMasterDto) {
  /**
   * refundAmount  退商品金额
   * freightAmount 退运费金额
   * 以上两个参数在售后流程没有结束时会有值。所以实退金额判断不可靠。
   * 实退请使用realxxAmount 来判断
   */
  const { applyRefundAmount = 0, freightState, orderFreightAmount = 0, refundAmount = 0, freightAmount = 0, realAmount = 0, refundStatus } = data

  /**
   * applyFreightAmount c端申请退的运费金额
   * 由于C端目前没有开放退运费。所以这个字段目前并没有实际作用。
   * 为了保持语意上的一致性。这里处理成申请退运费金额。
   */
  const applyFreightAmount = useMemo(() => (freightState === EFreightState.Can ? orderFreightAmount : 0), [data])

  const isComplete = [Complete, Process].includes(refundStatus!)

  return {
    ...data,
    /** 实付金额 */
    orderPayAmount: realAmount,
    /** 订单实付运费金额 */
    orderFreightAmount,

    /** 申请售后金额 */
    applyRefundAmount,
    /** 申请退运费金额 */
    applyFreightAmount,

    /** 实退金额 */
    realRefundAmount: isComplete ? refundAmount : 0,
    /** 实退运费金额 */
    realFreightAmount: isComplete ? freightAmount : 0,
    /** 实退总金额 */
    realTotalAmount: isComplete ? mmAdds(refundAmount, freightAmount) : 0
  }
}
