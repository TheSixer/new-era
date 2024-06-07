import { View } from '@tarojs/components'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { FC, memo, ReactNode, useMemo, useRef, useState } from 'react'
import MMMonthSwitch from '../monthSwitch'
import { EMode, FORMATTER, IMMCalendarProps } from './const'
import styles from './index.module.less'

const weekNames = (
  <View className={styles.weekWrapper}>
    {['日', '一', '二', '三', '四', '五', '六'].map((name) => (
      <View className={styles.weekName} key={name}>
        {name}
      </View>
    ))}
  </View>
)

const Component: FC<IMMCalendarProps> = (props) => {
  const { value, mode, allowClear, shouldDisableDate = () => false, visibleMonth = true, onChange, onMonthChange, renderLabel } = props

  const [currentMonth, setCurrentMonth] = useState(() => dayjs())

  const isRanging = useRef(false)

  const month = useMemo(() => props.month || currentMonth, [props.month, currentMonth])

  const format = (dayjsObj: dayjs.Dayjs) => dayjsObj.format(FORMATTER)

  // 给选择的日期结果排个序
  const sort = (dates: string[]) =>
    dates.sort((aa, bb) => {
      return Number(dayjs(aa).format('YYYYMMDD')) - Number(dayjs(bb).format('YYYYMMDD'))
    })

  const handleMonthChange = (_month: dayjs.Dayjs) => {
    props.month ? onMonthChange?.(_month) : setCurrentMonth(_month)
  }

  const handleCellClick = (formatter: string) => {
    const isThisMonth = dayjs(formatter).isSame(month, 'month')

    // 若外部自定义月份切换显示，则日历内部不再进行月份切换
    if (!isThisMonth && visibleMonth) {
      handleMonthChange(dayjs(formatter))
    }

    if (mode === EMode.Single) {
      allowClear && value === formatter ? onChange?.(undefined) : onChange?.(formatter)
      return
    }

    if (mode === EMode.Multiple) {
      const _value = value || []
      const idx = _value.indexOf(formatter) || -1
      const next = idx > -1 ? _value.filter((day) => day !== formatter) : [..._value, formatter]
      onChange?.(next.length ? sort(next) : undefined)
      return
    }

    if (mode === EMode.Range) {
      // 从未选择
      if (!isRanging.current) {
        isRanging.current = true
        return onChange?.([formatter, formatter])
      }

      // 已经选择了开始日期
      if (isRanging.current) {
        isRanging.current = false
        const [start] = value || []
        const startObj = dayjs(start)
        const endObj = dayjs(formatter)
        const isStartSameAsEnd = startObj.isSame(endObj, 'day')

        // 开始结束选择同一天则清空
        if (isStartSameAsEnd) {
          return allowClear ? onChange?.(undefined) : onChange?.([start, start])
        }

        const res = endObj.isAfter(startObj, 'day') ? [startObj, dayjs(formatter)] : [dayjs(formatter), startObj]
        return onChange?.(res.map(format))
      }
    }
  }

  const renderCells = () => {
    const columns = 7
    const rows = 6
    const cells: ReactNode[] = []
    const [start, end] = value || []
    const startObj = dayjs(start)
    const endObj = dayjs(end)

    // 月的 1号
    const thisMonthFirstDate = month.date(1)
    let dayjsObj = thisMonthFirstDate.subtract(thisMonthFirstDate.day(), 'day')

    const isSelected = (formatter: string, dayjsObj: dayjs.Dayjs) => {
      switch (mode) {
        case EMode.Single:
          return value === formatter
        case EMode.Multiple:
          return value?.includes(formatter) || false
        case EMode.Range: {
          if (!value) {
            return false
          }

          const isInner = dayjsObj.isAfter(startObj) && dayjsObj.isBefore(endObj)
          const isStart = dayjsObj.isSame(startObj, 'day')
          const isEnd = dayjsObj.isSame(endObj, 'day')
          return isStart || isEnd || isInner
        }
        default:
          return false
      }
    }

    while (cells.length < columns * rows) {
      const formatter = format(dayjsObj)
      const isThisMonth = dayjsObj.isSame(month, 'month')
      const isDisabled = shouldDisableDate(dayjsObj)
      const isBegin = mode === EMode.Range && dayjsObj.isSame(startObj, 'day')
      const isEnd = mode === EMode.Range && dayjsObj.isSame(endObj, 'day')

      cells.push(
        <View
          className={classNames({
            [styles.cell]: true,
            [styles.cell_range]: mode === EMode.Range
          })}
          onClick={() => !isDisabled && handleCellClick(formatter)}
        >
          {renderLabel?.(dayjsObj, {
            isSelected: isSelected(formatter, dayjsObj),
            isDisabled,
            isThisMonth,
            isBegin,
            isEnd
          })}
        </View>
      )

      dayjsObj = dayjsObj.add(1, 'day')
    }

    return cells
  }

  return (
    <>
      {visibleMonth && <MMMonthSwitch current={month} onChange={handleMonthChange} />}
      {weekNames}
      <View className={styles.cells}>{renderCells()}</View>
    </>
  )
}

Component.defaultProps = {
  renderLabel: (dayjsObj, options) => (
    <View
      className={classNames({
        [styles.cell_content]: true,
        [styles.cell__isSelected]: options.isSelected && options.isThisMonth,
        [styles.cell__isDisabled]: options.isDisabled,
        [styles.cell__isThisMonth]: options.isThisMonth,
        [styles.cell__isBegin]: options.isBegin,
        [styles.cell__isEnd]: options.isEnd
      })}
    >
      {dayjsObj.date()}
    </View>
  )
}

const MMCalendar = memo(Component)
export default MMCalendar
