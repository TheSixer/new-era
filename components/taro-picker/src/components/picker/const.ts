import { CSSProperties } from 'react'
import { IPopTitleProps } from '../popTitle'

export type PickerValueType = string | number

export interface IMMPickerRef {
  /** 通过标识值获取完整数据 */
  getDataByKeys(keys: PickerValueType[]): IMMPickerData[]
}

export interface IMMPopPickerProps extends IMMPickerProps, Omit<IPopTitleProps, 'onOk'> {
  visible?: boolean

  onOk?: IMMPickerProps['onChange']

  onVisibleChange(visible: boolean): void
}

export interface IMMPickerProps {
  /** 选中的值 */
  value: PickerValueType[]
  /** 选择数据 */
  data: IMMPickerData[]

  /**
   * 自定义 data 结构中的字段
   * @default { label: 'label', value: 'value', children: 'children' }
   */
  fieldKey?: {
    label?: string
    value?: string
    children?: string
  }

  className?: any

  style?: CSSProperties

  onChange?(value: PickerValueType[], result: IMMPickerData[]): void
}

export interface IMMPickerData {
  label?: PickerValueType

  value?: PickerValueType

  children?: IMMPickerData[]

  [i: string]: any
}

export const PICKER_ITEM_HEIGHT = 44 // 选择项高度
export const PICKER_ITEM_HALF_HEIGHT = 22 // 选择项半高。是上值的一半！！！

export const indicatorStyle: CSSProperties = {
  // 指示器样式
  height: PICKER_ITEM_HEIGHT,
  lineHeight: `${PICKER_ITEM_HEIGHT}px`
}
