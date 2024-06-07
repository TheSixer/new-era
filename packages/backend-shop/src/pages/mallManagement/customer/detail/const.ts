import { convertEnum } from '@wmeimob/utils/src/enumUtil'
import { ReactNode } from 'react'

export interface IDetailProps {}

export enum ETabKey {
  /** 基础信息 */
  BasicInfo = 'basicInfo',
  /** 订单信息 */
  Order = 'order',
  /** 积分信息 */
  Score = 'score',
  /** 会员信息 */
  Member = 'member'
}

export const [MTabKey] = convertEnum([
  [ETabKey.BasicInfo, '基础信息'],
  [ETabKey.Order, '订单信息'],
  [ETabKey.Score, '积分信息'],
  [ETabKey.Member, '会员信息']
])

export interface ITabItem {
  key: ETabKey
  tab: string
  content: ReactNode
  show?: boolean
}
