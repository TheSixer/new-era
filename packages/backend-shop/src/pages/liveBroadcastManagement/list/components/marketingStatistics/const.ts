import { convertEnum } from '@wmeimob/utils/src/enumUtil'

export interface ILiveProps {

}

export interface IEditFormValues {
  name: string
  type: string
  liveIds?: string[]
}

export enum ELivePageType {
  /** 直播间列表 */
  List = 'List',
  /** 直播间详情 */
  Details = 'Details'
}

export const [MLivePageType, OLivePageType] = convertEnum([
  [ELivePageType.List, '直播间列表'],
  [ELivePageType.Details, '直播间详情']
])
