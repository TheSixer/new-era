import { OrderVO } from '@wmeimob/backend-api/src/request/data-contracts'

export interface IShippingModalProps {
  data?: OrderVO[]

  modalProps: any

  onFinish: any
}
