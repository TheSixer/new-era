import { Space } from 'antd'
import { ECouponExpireType } from '@wmeimob/shop-data/coupon/enums//ECouponExpireType'
import { ECouponStatus, MCouponStatus } from '@wmeimob/shop-data/coupon/enums/ECouponStatus'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { CouponTemplateVo } from '@wmeimob/backend-api/src/request/data-contracts'
import { mmTimes } from '@wmeimob/utils/src/mmCurrency'

/**
 * 获取优惠券使用条件
 */
export function getCouponUseCondition(data: CouponTemplateVo) {
  const { demandPrice = '', couponType, discount = 0, price = '' } = data

  if ([ECouponType.Exchange, ECouponType.FreeShipping, ECouponType.Present].includes(couponType!)) {
    return `下单使用`
  }
  return `满${demandPrice}元` + (couponType === ECouponType.Deduction ? `减${price}` : `打${mmTimes(discount, 10)}折`)
}

/**
 * 优惠券使用期限
 * @param data
 * @returns
 */
export function getCouponUseExpiredCondition(data: CouponTemplateVo) {
  const { expireDateType, termStart = '', termEnd = '', startDayCount = 0, expDayCount = 0 } = data
  return expireDateType === ECouponExpireType.Date ? (
    <Space>
      <span>{termStart.split(' ')[0]}</span>
      <span>-</span>
      <span>{termEnd.split(' ')[0]}</span>
    </Space>
  ) : (
    <Space>
      <span>领取后{startDayCount === 0 ? '立即' : `${startDayCount}天`}生效</span>
      <span>有效期{expDayCount}天</span>
    </Space>
  )
}

/**
 * 是否可以编辑优惠券
 *
 * 优惠券有效并且处于下架不显示状态才可以编辑
 * @param coupon
 * @returns
 */
export function canEditCoupon(coupon: CouponTemplateVo) {
  return !!coupon.status && !coupon.isPublic
}

/**
 * 获取优惠券状态
 *
 * @description 优惠券的显示状态是要根据多个参数进行计算的
 */
export function getCouponStatusOption(data: CouponTemplateVo) {
  const { receiveStart = '', receiveEnd = '' } = data

  const nowTime = Date.now() // 当前时间

  const dateStart = receiveStart.replace(/-/g, '/') // 开始时间
  const dateEnd = receiveEnd.replace(/-/g, '/') // 结束时间

  const start = new Date(dateStart).getTime() // 开始时间搓
  const end = new Date(dateEnd).getTime() // 开始时间搓

  let couponStatus = ECouponStatus.Valid
  if (data.status === 0) {
    couponStatus = ECouponStatus.Void
  } else if (data.status === 1 && nowTime < start) {
    couponStatus = ECouponStatus.NoValid
  } else if (data.status === 1 && nowTime <= end) {
    couponStatus = ECouponStatus.Valid
  } else if (data.status === 1 && nowTime > end) {
    couponStatus = ECouponStatus.Expired
  }

  return { label: MCouponStatus[couponStatus], value: couponStatus }
}
