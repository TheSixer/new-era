import { convertEnum } from '@wmeimob/utils/src/enumUtil'
/**
 * 评价来源
 */
export enum ESourceEvaluate {
  /** 后台添加 */
  backStage = 1,

  /** 用户评价 */
  user
}

export const [MSourceEvaluate] = convertEnum([
  [ESourceEvaluate.user, '用户评价'],
  [ESourceEvaluate.backStage, '后台添加']
])
