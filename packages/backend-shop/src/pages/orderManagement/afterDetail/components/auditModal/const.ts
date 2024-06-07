import { ModalFormProps } from '@ant-design/pro-form'
import { RefundItemDto, RefundMasterDto } from '@wmeimob/backend-api'

export interface IAuditModalProps extends ModalFormProps {
  data?: TAuditModalData
  /**
   * 成功
   */
  onSuccess(): void
}

type TAuditModalData = RefundMasterDto & {
  refundInfo?: {
    data: RefundItemDto[]
    /** 运费金额 */
    freightAmount: number
  }
}
