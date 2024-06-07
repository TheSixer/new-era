import { ShopCartVO } from '@wmeimob/taro-api'

export interface IShopCartProps {}

/** 购物车状态 */
export enum EShopCartType {
  /** 选中结算状态 */
  Checked,
  /** 编辑购物车状态 */
  Edit
}

export type MyCart = ShopCartVO & {
  isChecked: boolean

  isEdit: boolean
}
