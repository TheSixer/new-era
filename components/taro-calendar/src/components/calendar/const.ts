import dayjs from 'dayjs'
import { ReactNode } from 'react'

interface ISingle {
  mode?: 'single'
  value?: string
  onChange?(value: ISingle['value']): void
}

interface IMultiple {
  mode?: 'multiple'
  value?: string[]
  onChange?(value: IMultiple['value']): void
}

interface IRange {
  mode?: 'range'
  value?: string[]
  onChange?(value: IRange['value']): void
}

type TMode = ISingle | IMultiple | IRange

export enum EMode {
  Single = 'single',
  Multiple = 'multiple',
  Range = 'range'
}

export type IMMCalendarProps = {
  /**
   * 日历对应的月份
   *
   * @default 当前月 dayjs()
   *  */
  month?: dayjs.Dayjs

  /**
   * 再次点击同一日期允许取消选择
   *
   * @default false
   * @support mode = single
   */
  allowClear?: boolean

  /**
   * 是否显示月份切换
   *
   * @default true
   */
  visibleMonth?: boolean

  /** 是否禁用日期 */
  shouldDisableDate?: (dayjsObj: dayjs.Dayjs) => boolean

  /** 月份切换 */
  onMonthChange?(dayjsObj: dayjs.Dayjs): void

  /** 自定义日期项渲染 */
  renderLabel?(
    date: dayjs.Dayjs,
    options: {
      /** 是否选中 */
      isSelected: boolean
      /** 是否禁用 */
      isDisabled: boolean
      /** 是否本月日期 */
      isThisMonth: boolean
      /** 是否范围选择中的开始日期 */
      isBegin: boolean
      /** 是否范围选择中的结束日期 */
      isEnd: boolean
    }
  ): ReactNode
} & TMode

export const FORMATTER = 'YYYY-MM-DD'
