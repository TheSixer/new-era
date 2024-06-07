import { CouponTemplateVo } from '@wmeimob/backend-api/src/request/data-contracts'
import { DrawerProps } from 'antd'
import { ReactNode } from 'react'

export interface ICouponSelectDrawerProps {
  value?: string

  drawerProps?: DrawerProps

  max?: number

  render?: (params: ICouponSelectDrawerChildrenParams) => ReactNode

  // CouponTemplateVo & { type: EPresentCouponType }
  onChange?(data: string): void
}

export interface ICouponSelectDrawerChildrenParams {
  coupons: (CouponTemplateVo & { _invalid?: boolean })[]
  /** 弹出选择抽屉，并选择添加 */
  add(): void
  /** 清除已选择的优惠券 */
  remove(couponTemplateId?: CouponTemplateVo['id']): void
}
