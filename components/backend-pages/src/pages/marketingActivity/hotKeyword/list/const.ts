import { JumpTypeValue } from '@wmeimob/backend-pro/src/components/jumpType/const'

export interface IListProps {}

export interface IEditFormValues {
  hotKeyword: string
  sort?: number
  icon?: string
  url?: JumpTypeValue
  hotKeywordDescription?: string
}
