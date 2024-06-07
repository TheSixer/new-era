import { CouponTemplateVo } from '@wmeimob/taro-api'

export interface IRecevieCouponCellProps {
  data: CouponTemplateVo[]

  onClick(): void
}
