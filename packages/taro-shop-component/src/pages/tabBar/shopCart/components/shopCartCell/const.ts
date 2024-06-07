import { MyCart } from '../../const'

export interface IShopCartCellProps {
  data: MyCart

  /** 是否失效 */
  invalid?: boolean

  /** 是否禁用滑动 */
  disableSlide?: boolean

  /**
   * 选中状态改变
   * @param data
   */
  onCheckChange?(data: boolean): void
  /**
   * 改变数量
   * @param data
   */
  onChangeStepper?(value: number): void

  /** 点击sku */
  onSkuClick?(): void

  /**
   * 删除
   */
  onDel?(skuId: string): Promise<boolean>

  /**
   * 添加收藏
   */
  onAddCollection?(goodNo: string): any
}
