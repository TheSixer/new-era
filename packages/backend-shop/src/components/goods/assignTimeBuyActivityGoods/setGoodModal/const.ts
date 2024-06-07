import { ModalFormProps } from '@ant-design/pro-form'
import { MarketingActivityGoodsParam } from '@wmeimob/backend-api'

export interface ISetGoodModalProps extends Omit<ModalFormProps, 'onChange'> {
  good?: MarketingActivityGoodsParam

  disabled?: boolean

  onChange(good: MarketingActivityGoodsParam): void
}
