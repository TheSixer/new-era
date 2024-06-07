import { CouponTemplateVo } from '@wmeimob/taro-api'

/**
 * 获取优惠券操作
 * @param coupon
 * @returns
 */
export function getCouponOperationText(coupon: CouponTemplateVo) {
  const { receiveNum = 0, memberLimit = 0, stock = 0 } = coupon
  let rightText = ''
  // 可领取数量
  const receivedStock = min(memberLimit - receiveNum, stock)
  let disabled = !stock || memberLimit <= 0

  if (disabled) {
    rightText = receiveNum > 0 ? '已领取' : '已领完'
  } else {
    disabled = receiveNum >= memberLimit
    rightText = disabled ? '已领取' : '立即领取'
  }

  return {
    receivedStock,
    rightText,
    disabled
  }
}

function min(num1: number, num2: number) {
  return num1 > num2 ? num2 : num1
}
