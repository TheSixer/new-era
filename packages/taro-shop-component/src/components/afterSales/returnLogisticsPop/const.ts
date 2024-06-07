import { RefundMasterDto } from '@wmeimob/taro-api';

export interface IReturnLogisticsPopProps {
  /** 是否可见 */
  visible: boolean

  /** 售后编号 */
  refundNo: string

  /** 卖家的退货地址信息 */
  addressInfo?: Pick<RefundMasterDto, 'name' |'mobile' | 'provinceName' | 'cityName' | 'areaName' | 'singleAddress'>

  onClose?(): void

  onOk?(): void
}
