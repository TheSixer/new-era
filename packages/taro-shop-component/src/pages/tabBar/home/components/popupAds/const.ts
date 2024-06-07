import { PopupAdsDto } from '@wmeimob/taro-api'

export interface IPopupAdsProps {
  ad?: PopupAdsDto
  onClose(): void
}
