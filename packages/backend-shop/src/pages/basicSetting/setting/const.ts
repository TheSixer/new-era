
import { convertEnum } from '@wmeimob/utils/src/enumUtil'

export interface IPageProps {}

export enum ETabType {
  /** 基础设置 */
  Basic = 'basic',
  /** 积分设置 */
  Score = 'score'
}

export const [MTabType, OTabType] = convertEnum([
  [ETabType.Basic, '基础设置'],
  [ETabType.Score, '积分设置']
])
