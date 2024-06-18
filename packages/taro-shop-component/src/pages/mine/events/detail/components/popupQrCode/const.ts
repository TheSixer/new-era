export interface IPopupQrCodeProps {
  visible?: boolean
  title: string
  imgUrl: string
  finished?: boolean
  verifyCode?: string
  onClose(): void
}
