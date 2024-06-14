import { ActivityOutputDto } from '@wmeimob/taro-api'
import { IMMPopupProps } from '@wmeimob/taro-design/src/components/popup/const'

export interface IEventSkuPopupProps extends IMMPopupProps {
  /** 活动详情数据 */
  info?: ActivityOutputDto | null
  onConfirm(p: string | number): void
}
