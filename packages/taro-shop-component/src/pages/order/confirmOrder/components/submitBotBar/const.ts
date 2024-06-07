import { OrderCalculateResponse } from '@wmeimob/taro-api'

export interface ISubmitBotBarProps {
  data: OrderCalculateResponse

  onSubmit: () => Promise<any>
}
