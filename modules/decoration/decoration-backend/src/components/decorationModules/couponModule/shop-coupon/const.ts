import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { ReactNode } from 'react'

export interface ICouponProps {
  /**
   * 商品详情优惠券data
   */
  data: IMMShopCouponData

  /** 是否禁用 */
  disabled?: boolean

  /** 右侧文本 */
  rightText?: string

  /** 是否选中 */
  checked?: boolean

  /**
   * 点击优惠券事件
   * 如果有传递checked.则会传递一个是否选中的参数
   */
  onClick?(checked?: boolean): void

  onClickRight?(): void
}

export interface IMMShopCouponData {
  /**
   * 优惠券类型
   *
   */
  // eslint-disable-next-line no-use-before-define
  type: ECouponType

  /**
   * 值
   */
  count?: ReactNode

  /**
   * 主标题
   */
  title?: ReactNode

  /**
   * 副标题
   */
  subTitle?: string

  /**
   * 描述文本
   */
  description?: ReactNode
  /**
   * 使用条件需求价格
   */
  demandPrice?: number
}
