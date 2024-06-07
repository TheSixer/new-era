import { FormInstance } from 'antd'

export interface IAreaAmountListProps {
  form: FormInstance
  /** 列表字段名 */
  name: string
  disabled?: boolean
  value?: string
  onChange?(value?: string): void
}

export interface IAreaAmountValue {
  /** 范围公里数 */
  km?: number
  /** 金额 */
  shipping?: number
}

