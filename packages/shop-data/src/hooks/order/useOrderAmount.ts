import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { useMemo } from 'react'
import { EWholeOrderStatus } from '../../enums/order/EWholeOrderStatus'
import { OrderVO } from '../../types/Order'

/**
 * 订单金额信息
 *
 * orderAmount                  订单金额 => 商品金额 + 运费
 * shippingFee                  运费
 * shouldPayAmount              应付款 => （商品总金额 + 运费 - 优惠金额）或 (实际支付款 + 积分抵扣金额)
 * payAmount                    实际支付款   => 完成支付并微信/支付宝实际支付
 * exchangeIntegral             实际支付的积分数量（积分商品订单）
 * scoreDeductionCount          积分抵扣数量
 * scoreDeductionAmount         积分抵扣金额
 * couponDeductionAmount        满减满折券抵扣金额
 * activeDeductionAmount        活动抵扣金额
 * memberDeductionAmount        会员抵扣金额
 * freeShippingDeductionAmount  包邮活动运费抵扣金额
 *
 */
export default function useOrderAmount(data: OrderVO) {
  const { orderAmount = 0, shippingFee = 0, payAmount = 0, exchangeIntegral = 0, orderStatus } = data

  const scoreDeductionCount = useMemo(() => calcScoreDeductionCount(data), [data])

  const { scoreDeductionAmount, couponDeductionAmount, activeDeductionAmount, memberDeductionAmount, freeShippingDeductionAmount } = useMemo(
    () => countItemDeductionAmount(data),
    [data]
  )

  const shouldPayAmount = data.payAmount

  return {
    /** 订单金额 */
    orderAmount,
    /** 运费 */
    shippingFee,
    /** 应付款 */
    shouldPayAmount,
    /**
     * 实际支付款
     * 完成支付
     */
    payAmount: [EWholeOrderStatus.ORDER_STATUS_PENDING_PAYMENT, EWholeOrderStatus.ORDER_STATUS_PAY_ERROR].includes(orderStatus!) ? undefined : payAmount,
    /** 实际支付积分 */
    exchangeIntegral: [EWholeOrderStatus.ORDER_STATUS_PENDING_PAYMENT, EWholeOrderStatus.ORDER_STATUS_PAY_ERROR].includes(orderStatus!)
      ? undefined
      : exchangeIntegral,
    /** 积分抵扣数量 */
    scoreDeductionCount,
    /** 积分抵扣金额 */
    scoreDeductionAmount,
    /** 满减满折券抵扣金额 */
    couponDeductionAmount,
    /** 活动抵扣金额 */
    activeDeductionAmount,
    /** 会员抵扣金额 */
    memberDeductionAmount,
    /** 运费抵扣金额(包邮活动、包邮券) */
    freeShippingDeductionAmount
  } as const
}

/**
 * 计算积分抵扣数量
 * @param data
 * @returns
 */
export function calcScoreDeductionCount(data: OrderVO): number {
  const { items = [] } = data

  return items.reduce((total, { score = 0 }) => mmAdds(total, score), 0)
}

/**
 * 计算积分抵扣金额
 * @param data
 * @returns
 */
export function calcScoreDeductionAmount(data: OrderVO) {
  const { items = [] } = data

  return items.reduce((total, { itemsPointDeduction = 0 }) => mmAdds(total, itemsPointDeduction), 0)
}

/**
 * 计算应付金额
 *
 * 实际支付款 + 积分抵扣金额
 * @param data
 * @returns
 */
export function calcShouldPayAmount(data: OrderVO) {
  return mmAdds(data.payAmount ?? 0, calcScoreDeductionAmount(data))
}

/**
 * 计算满减满折券抵扣金额
 */
export function calcCouponDeductionAmount(data: OrderVO) {
  const { items = [] } = data

  return items.reduce((total, { itemsCouponDeduction = 0 }) => mmAdds(total, itemsCouponDeduction), 0)
}

/**
 * 计算订单中的抵扣金额信息
 * @param data
 * @returns
 */
export function countItemDeductionAmount(data: OrderVO) {
  const { items = [] } = data

  const deduction = {
    /** 活动抵扣 */
    activeDeductionAmount: 0,
    /** 满减满折券抵扣 */
    couponDeductionAmount: 0,
    /** 积分抵扣 */
    scoreDeductionAmount: 0,
    /** 会员抵扣金额 */
    memberDeductionAmount: 0,
    /** 包邮活动运费抵扣金额 */
    freeShippingDeductionAmount: 0
  }

  return items.reduce(
    (result, { itemsCouponDeduction = 0, itemsActiveDeduction = 0, itemsPointDeduction = 0, itemsUserDeduction = 0, itemsShippingDeduction = 0 }) => ({
      activeDeductionAmount: mmAdds(result.activeDeductionAmount, itemsActiveDeduction),
      couponDeductionAmount: mmAdds(result.couponDeductionAmount, itemsCouponDeduction),
      scoreDeductionAmount: mmAdds(result.scoreDeductionAmount, itemsPointDeduction),
      memberDeductionAmount: mmAdds(result.memberDeductionAmount, itemsUserDeduction),
      freeShippingDeductionAmount: mmAdds(result.freeShippingDeductionAmount, itemsShippingDeduction)
    }),
    deduction
  )
}
