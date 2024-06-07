import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 优惠码生成任务状态
 */
export enum ECouponCodeBuildStatus {
  /** 生成中 */
  Building = 1,
  /** 生成成功 */
  Success = 2,
  /** 生成失败 */
  Fail = 4
}

export const [MCouponCodeBuildStatus, OCouponCodeBuildStatus] = convertEnum([
  [ECouponCodeBuildStatus.Building, '生成中'],
  [ECouponCodeBuildStatus.Success, '生成成功'],
  [ECouponCodeBuildStatus.Fail, '生成失败']
])
