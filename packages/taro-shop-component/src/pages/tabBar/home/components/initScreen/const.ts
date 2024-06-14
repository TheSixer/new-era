import { BannerPositionOutputDto } from '@wmeimob/taro-api'

export interface IPopupScreenProps {
  data?: BannerPositionOutputDto
  onClose(): void
}
