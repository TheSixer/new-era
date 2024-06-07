import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 协议类型
 */
export enum EAgreementType {
  /**
   * 用户协议
   */
  User = 1,

  /**
   * 会员规则
   */
  MemberRule = 2,
  /**
   * 隐私政策
   */
  Privacy = 3
}

export const [MAgreementType, OAgreementType] = convertEnum([
  [EAgreementType.User, '用户协议'],
  [EAgreementType.MemberRule, '会员规则'],
  [EAgreementType.Privacy, '隐私政策']
])
