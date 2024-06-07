import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 客户启用状态 */
export enum ECustomerStatus {
  /** 禁用中 */
  Disabled,
  /** 启用中 */
  Enabled
}

export const [MCustomerStatus, OCustomerStatus] = convertEnum([
  [ECustomerStatus.Enabled, '启用'],
  [ECustomerStatus.Disabled, '禁用']
])
