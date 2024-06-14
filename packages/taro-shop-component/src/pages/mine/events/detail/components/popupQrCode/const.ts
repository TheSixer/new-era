import { PopupAdsDto } from '@wmeimob/taro-api'

export interface IPopupQrCodeProps {
  visible?: boolean
  title: string
  imgUrl: string
  onClose(): void
}
