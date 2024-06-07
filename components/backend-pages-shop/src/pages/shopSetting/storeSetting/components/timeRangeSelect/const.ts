import { FormInstance } from 'antd'

export interface ITimeRangeSelectProps {
  name: string
  form: FormInstance
  disabled?: boolean
}

export interface ITimeRangeValue {
  /** 开始时间 */
  start?: string
  /** 结束时间 */
  end?: string
}
