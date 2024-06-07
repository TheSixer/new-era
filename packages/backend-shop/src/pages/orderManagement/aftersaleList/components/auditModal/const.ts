import { ModalFormProps } from '@ant-design/pro-form'
import { RefundMasterDto } from '@wmeimob/backend-api'

export interface IAuditModalProps extends ModalFormProps {
  data?: RefundMasterDto
  /**
   * 成功
   */
  onSuccess(): void
}
