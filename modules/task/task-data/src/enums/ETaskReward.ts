import { convertEnum } from '@wmeimob/utils/src/enumUtil'
/**
 * 奖励类型
 */
export enum ETaskReward {
  /** 积分 */
  Integral = 1
}

export const [MTaskReward, OTaskReward] = convertEnum([[ETaskReward.Integral, '积分']])
