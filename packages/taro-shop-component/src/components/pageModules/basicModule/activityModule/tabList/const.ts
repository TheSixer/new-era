import { IBasicActivityData } from '@wmeimob-modules/decoration-data'
import { IPageActivity } from '../const'

export interface ITabListProps {
  activeIndex: number
  data: IBasicActivityData[]
  activitys: IPageActivity[]
  onChange(index: number): void
}
