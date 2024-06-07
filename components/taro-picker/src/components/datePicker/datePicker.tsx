import Taro from '@tarojs/taro'
import { memo, useMemo, useState, FC, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
// import styles from './index.module.less'
import MMPicker from '../picker/picker'
import { IMMPickerData } from '../picker/const'
import { EDateType, IDatePickerProps } from './const'

const formatType = {
  [EDateType.date]: 'YYYY-MM-DD',
  [EDateType.dateHourMinute]: 'YYYY-MM-DD HH:mm'
}

const hours = [...Array(23)].map((_, idx) => ({ label: `${idx + 1}时`, value: joinStr(idx + 1) }))
const minutes = [...Array(59)].map((_, idx) => ({ label: `${idx + 1}分`, value: joinStr(idx + 1) }))

function joinStr(num: number) {
  return num < 10 ? `0${num}` : `${num}`
}

const Component: FC<IDatePickerProps> = (props) => {
  const { pickerValue, data, handleChange } = useDatePicker(props)

  return <MMPicker value={pickerValue} data={data} onChange={handleChange} />
}

const MMDatePicker = memo(Component)
export default MMDatePicker

/**
 * 业务hook
 * @param props
 * @returns
 */
function useDatePicker(props: IDatePickerProps) {
  const { value, type = 'date', minDate, maxDate, onChange } = props

  const [dateValue, setDateValue] = useState(() => (value ? dayjs(value) : undefined)) // 回显场景需要给默认值，否则会【无值 -> 有值】导致小程序 pickerView 滚动期间滚不到正确的位置并高亮

  // 内部计算最小日期与最大日期
  const min = useMemo(() => dayjs(minDate || '1900-01-01 00:00:00'), [minDate])
  const max = useMemo(() => (maxDate ? dayjs(maxDate) : dayjs().endOf('second').add(20, 'year')), [maxDate])

  /**
   * 内部转换的选种值
   */
  const pickerValue = useMemo<string[]>(() => {
    if (!dateValue) {
      return []
    }

    if (type === EDateType.year) {
      return [dateValue.get('year')].map(joinStr)
    }

    const base = [dateValue.get('year'), dateValue.get('month') + 1, dateValue.get('date')].map(joinStr)

    if (type === EDateType.date) {
      return base
    }

    const hourMinute = [dateValue.get('hour'), dateValue.get('minute')].map(joinStr)

    return [...base, ...hourMinute]
  }, [dateValue, type])

  /**
   * 选择器列表数据
   */
  const pickerData = useMemo(() => {
    const list: IMMPickerData[] = []

    let current = min
    const diffyears = min.diff(max, 'year') // 负值

    for (let index = diffyears; index <= 0; index++) {
      list.push(calcYear(current))
      current = current.add(1, 'year')
    }

    // console.log(list, 'pickerData')
    return list
  }, [min, max, type])

  useEffect(() => {
    setDateValue(dayjs(value))
  }, [value])

  const handleChange = (ev: string[]) => {
    const [year, month, date, hour, minute] = ev

    let res = `${year}`

    if (type === EDateType.date) {
      res += `-${month}-${date}`
    }

    if (type === EDateType.dateHourMinute) {
      res += ` ${hour}:${minute}:00`
    }

    const dateVal = dayjs(res)
    setDateValue(dateVal)
    onChange?.(dateVal.toDate())
  }

  /**
   * 计算年份
   * @param day
   * @returns
   */
  function calcYear(day: Dayjs) {
    const currentYear = day.year()
    const yearItem: IMMPickerData = { label: `${currentYear}年`, value: `${currentYear}` }
    if (type === EDateType.date || type === EDateType.dateHourMinute) {
      yearItem.children = calcMonth(day)
    }
    return yearItem
  }

  /**
   * 计算月份
   * @param day
   * @returns
   */
  function calcMonth(day: Dayjs) {
    let list: number[] = []
    if (day.isSame(min, 'year')) {
      let mon = min.month() + 1
      do {
        list.push(mon++)
      } while (mon <= 12)
    } else if (day.isSame(max, 'year')) {
      let mon = max.month() + 1
      do {
        list.unshift(mon--)
      } while (mon > 0)
    } else {
      list = [...Array(12)].map((__, idx) => idx + 1)
    }

    return list.map((item) => {
      const val = joinStr(item)
      const dataItem: IMMPickerData = { label: `${val}月`, value: val }

      dataItem.children = calcDays(dayjs(`${day.year()}-${val}-01`))
      return dataItem
    })
  }

  /**
   * 计算日
   * @param day
   * @returns
   */
  function calcDays(day: Dayjs) {
    let list: number[] = []
    const days = day.daysInMonth()
    if (day.isSame(min, 'month')) {
      let mon = min.date()
      do {
        list.push(mon++)
      } while (mon <= days)
    } else if (day.isSame(max, 'month')) {
      let mon = max.date()
      do {
        list.unshift(mon--)
      } while (mon > 0)
    } else {
      list = [...Array(days)].map((__, idx) => idx + 1)
    }

    return list.map((item) => {
      const val = joinStr(item)
      const dataItem: IMMPickerData = { label: `${val}日`, value: val }

      if (type === 'dateHourMinute') {
        dataItem.children = hours.map((hour) => ({
          ...hour,
          children: minutes
        }))
      }

      return dataItem
    })
  }

  return {
    data: pickerData,
    pickerValue,
    handleChange
  }
}
