import { convertEnum } from '@wmeimob/utils/src/enumUtil';

/** 积分过期自动清零 */
export enum EScoreAutoReset {
  /** 不清零 */
  None,
  /** 每年清零 */
  Year
}

export const [MScoreAutoReset, OScoreAutoReset] = convertEnum([
  [EScoreAutoReset.None, '不清零'],
  [EScoreAutoReset.Year, '每年清零']
])
