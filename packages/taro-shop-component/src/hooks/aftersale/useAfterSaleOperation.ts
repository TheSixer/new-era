import { useMemo } from 'react'
import { ERefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'

const { Complete, StoreCheck, StoreCheckFail, UserReturn, CompleteRefundFail, StoreRefuse } = ERefundStatus

/**
 * 售后操作判定
 */
export default function useAfterSaleOperation(refundState: ERefundStatus, refundType: ERefundType) {
  // 退货退款单
  const isReturns = useMemo(() => refundType === ERefundType.Every, [refundType])

  /**
   * 删除
   * 退款完成 退款失效 商家拒绝 验货不通过
   */
  const showDelete = useMemo(() => [Complete, CompleteRefundFail, StoreRefuse, StoreCheckFail].indexOf(refundState) !== -1, [refundState])

  /**
   *
   * 查看物流
   * 退款完成 商家验货 退款失效
   */
  const showLogistics = useMemo(() => {
    return isReturns && [Complete, StoreCheck, CompleteRefundFail].indexOf(refundState) !== -1
  }, [refundState, isReturns])

  // 填写退货物流
  const showReturnLogisitcs = useMemo(() => {
    return isReturns && UserReturn === refundState
  }, [refundState, isReturns])

  return {
    /** 退货退款单 */
    isReturns,
    /** 删除 */
    showDelete,
    /** 查看物流 */
    showLogistics,
    /** 填写退货物流 */
    showReturnLogisitcs
  }
}
