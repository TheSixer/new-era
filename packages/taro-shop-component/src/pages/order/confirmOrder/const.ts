import { IGoodsPriceProps } from '@wmeimob-modules/goods-taro/src/components/goodsPrice';
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable';

export interface IConfirmOrderProps {}

/**
 * 下单类型
 */
export enum EOrderType {
  /** 直接下单 */
  Buy,
  /** 购物车下单 */
  ShopCart
}

/** 金额组件共用 props */
export const goodsPriceProps: Partial<IGoodsPriceProps> = { fontSize: 13, blod: false, color: shopVariable.fontColor }
