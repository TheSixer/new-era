import { ModalFormProps } from '@ant-design/pro-form'
import { IOrderVo } from '../../const'

export interface IDeliverModalProps {
  modalProps: ModalFormProps

  order?: IOrderVo

  onFinish(): void
}
