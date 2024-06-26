import { converEnmuMap, converEnumArray } from '~/enums/utils'

/** 应用系统页面 */
export enum ESystemPage {
  /** 首页 */
  Home = '/pages/tabBar/home/index',
  /** 全部商品 */
  Goods = '/pages/goods/goodsList/index',
  /** 我的 */
  Mine = '/pages/tabBar/mine/index',
  /** 我的优惠券 */
  Coupons = '/pages/coupons/list/index',
  /** 领券中心 */
  CouponCenter = '/pages/coupons/couponCenter/index',
  /** 订单列表 */
  Orders = '/pages/order/myOrder/index',
  /** 售后列表 */
  AfterSales = '/pages/order/aftesalesList/index',
  /** 活动专区 */
  ActivityPrefecture = '/pages/activity/prefecture/index',
  /** 活动专区 */
  EventsPrefecture = '/pages/events/prefecture/index',
  /** 限时抢购列表 */
  FlashSale = '/pages/activity/flashSale/index',
  /** 预售活动列表 */
  PreSale = '/pages/activity/preSale/index',
  /** 积分商品列表 */
  IntegralGoods = '/pages/integralGoods/list/index',
  /** 包邮活动专区 */
  FreeShipping = '/pages/activity/freeShipping/index'
}

export enum ESystemPageHidden {
  /** 商品详情 */
  GoodDetail = '/pages/goods/goodDetail/index',
  /** 自定义装修 */
  Decoration = '/pages/decoration/index'
}

const ASystemPage = [
  [ESystemPage.Home, '首页'],
  // [ESystemPage.Goods, '全部商品'],
  [ESystemPage.Mine, '我的'],
  // [ESystemPage.Coupons, '我的优惠券'],
  // [ESystemPage.CouponCenter, '领券中心'],
  // [ESystemPage.Orders, '全部订单'],
  // [ESystemPage.AfterSales, '售后列表'],EventsPrefecture
  // [ESystemPage.ActivityPrefecture, '活动专区']
  [ESystemPage.EventsPrefecture, '活动专区']
  // [ESystemPage.FlashSale, '限时抢购列表'],
  // [ESystemPage.PreSale, '预售活动列表'],
  // [ESystemPage.IntegralGoods, '积分商品列表'],
  // [ESystemPage.FreeShipping, '包邮活动专区']
]

/** 描述数据 */
export const MSystemPage = converEnmuMap(ASystemPage)

export const OSystemPage = converEnumArray(ASystemPage)
