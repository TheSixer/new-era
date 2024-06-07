import { convertEnum } from '@wmeimob/utils/src/enumUtil'
import { ERefundType } from './ERefundType'

/**
 *
 * 售后单处理结果
 *  0：未处理 1：已退款 2：拒绝退款
 */
export enum EProcessResult {
  /**未处理  */
  Init,
  /** 已退款 */
  Done,
  /** 拒绝退款 */
  Refuse
}

export const [MProcessResult, OProcessResult] = convertEnum([
  [EProcessResult.Init, '未处理'],
  [EProcessResult.Done, '已退款'],
  [EProcessResult.Refuse, '未通过']
])

/**
 * 获取处理结果
 *
 * @export
 * @param {ERefundType} type 售后类型
 * @param {EProcessResult} result 售后处理结果
 * @return {*}
 */
export function getProcessResult(type: ERefundType, result: EProcessResult) {
  if (type === ERefundType.Refund) {
    return MProcessResult[result]
  }
  return {
    [EProcessResult.Init]: '未处理',
    [EProcessResult.Done]: '已同意',
    [EProcessResult.Refuse]: '未通过'
  }[result]
}
