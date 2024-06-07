import { IBasicActivityGoodAdvance } from '@wmeimob-modules/decoration-data'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'

export interface IGoodListProps {
  btnName: string

  data: IBasicActivityGoodAdvance[]

  activityType?: EActivityType

  createTagKeys?: (item: IBasicActivityGoodAdvance) => string[]

  onMore(): void
}
