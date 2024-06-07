export interface ISubmitBarProps {
  /** 总计金额 */
  total?: number

  totalCounts?: number

  /** 全选 */
  checkAll: boolean

  /**
   * 结算
   */
  handleBuy?(): void

  handleCheckAll(value: boolean): void
}
