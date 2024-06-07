
import { convertEnum } from '@wmeimob/utils/src/enumUtil'

export interface IPageProps {}

export enum ETabType {
  /** 页面管理 */
  Management = 'management',
  /** 营销统计 */
  Statistics = 'statistics'
}

export const [MTabType, OTabType] = convertEnum([
  [ETabType.Management, '页面管理'],
  [ETabType.Statistics, '营销统计']
])
