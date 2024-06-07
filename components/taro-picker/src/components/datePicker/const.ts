import { IPickerTitleProps } from '../conts'

export interface IPopDatePickerProps extends IDatePickerProps, IPickerTitleProps {
  visible: boolean

  onVisibleChange?(visible: boolean): void
}

/**
 * 日期类型
 */
export enum EDateType {
  /** 年 */
  year = 'year',

  /** 年月日 */
  date = 'date',

  /** 年月日时分 */
  dateHourMinute = 'dateHourMinute'
}

export interface IDatePickerProps {
  /**
   * 选中的值
   */
  value?: Date

  /**
   * 日期类型
   * @default date 年月日
   */
  type?: EDateType | keyof typeof EDateType

  /**
   * 最小日期
   * @default 1970-01-01
   */
  minDate?: Date

  /**
   * 最大日期
   * @default 20年后
   */
  maxDate?: Date

  /** 事件变化回调函数 */
  onChange?(value: Date): void
}
