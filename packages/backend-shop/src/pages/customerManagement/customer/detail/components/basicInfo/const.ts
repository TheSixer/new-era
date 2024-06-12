import { convertEnum } from '@wmeimob/utils/src/enumUtil'
import { MemberInfoPageVo, ScoreGetOutputDto } from '@wmeimob/backend-api'

export interface IBasicInfoProps {
  detail: MemberInfoPageVo
  scoreInfo?: ScoreGetOutputDto
  onRefresh(): void
}

export interface IModalFormValues {
  score: number
  isPlus: EChangeScoreType
}

/**
 * 积分调整操作类型
 */
export enum EChangeScoreType {
  /** 减少 */
  Decrease,
  /** 增加 */
  Add
}

export const [MChangeScoreType, OChangeScoreType] = convertEnum([
  [EChangeScoreType.Add, '增加'],
  [EChangeScoreType.Decrease, '减少']
])
