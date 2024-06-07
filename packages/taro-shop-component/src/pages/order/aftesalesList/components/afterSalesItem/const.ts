import { RefundMasterDto } from '@wmeimob/taro-api'

export interface IAfterSalesItemProps {
  item: RefundMasterDto
  handleRefresh(): void

  /**
   * 显示退货物流弹窗
   */
  onShowReturnLogistics(refundNo: string): void
}
