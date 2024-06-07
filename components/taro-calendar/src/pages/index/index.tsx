import { View } from '@tarojs/components'
import { Card, Navigation, PageContainer } from '@wmeimob/taro-design'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import MMCalendar from '../../components/calendar'
import MMMonthSwitch from '../../components/monthSwitch'
import styles from './index.module.less'

export default () => {
  return (
    <PageContainer>
      <Navigation title="日历" />
      <View className="spacing" />

      <Basic />
      <View className="spacing" />
      <Multiple />
      <View className="spacing" />
      <Range />
      <View className="spacing" />
      <DisableDate />
      <View className="spacing" />
      <CustomDates />
      <View className="spacing" />
      <CustomMonthSwitch />
    </PageContainer>
  )
}

const shouldDisableDate = (date: dayjs.Dayjs) => {
  const today = dayjs()
  const beforeThreeDay = today.subtract(5, 'day')
  const afterThreeDay = today.add(5, 'day')

  // 禁用前后5天的日期
  return date.isAfter(beforeThreeDay) && date.isBefore(afterThreeDay)
}

// 单选日期
const Basic = () => {
  const [value, setValue] = useState<string | undefined>(() => dayjs().format('YYYY-MM-DD'))

  return (
    <Card title="单选日期">
      <MMCalendar mode="single" value={value} onChange={setValue} />
    </Card>
  )
}

// 多选日期
const Multiple = () => {
  const [value, setValue] = useState<string[] | undefined>(() => [
    dayjs().format('YYYY-MM-01'),
    dayjs().format('YYYY-MM-03'),
    dayjs().format('YYYY-MM-05'),
    dayjs().format('YYYY-MM-11'),
    dayjs().format('YYYY-MM-12'),
    dayjs().format('YYYY-MM-13'),
    dayjs().format('YYYY-MM-14')
  ])

  return (
    <Card title="多选日期">
      <MMCalendar mode="multiple" value={value} onChange={setValue} />
    </Card>
  )
}

// 范围选择日期
const Range = () => {
  const [value, setValue] = useState<string[] | undefined>(() => [dayjs().format('YYYY-MM-01'), dayjs().format('YYYY-MM-14')])

  return (
    <Card title="范围选择日期">
      <MMCalendar mode="range" value={value} onChange={setValue} />
    </Card>
  )
}

// 禁用指定日期
const DisableDate = () => {
  const [value, setValue] = useState<string>()

  return (
    <Card title="禁用指定日期">
      <MMCalendar mode="single" value={value} onChange={setValue} shouldDisableDate={shouldDisableDate} />
    </Card>
  )
}

// 自定义日期渲染
const CustomDates = () => {
  const [today] = useState(() => dayjs().format('YYYY-MM-DD'))
  const [dotDates] = useState(() => [
    dayjs().format('YYYY-MM-01'),
    dayjs().format('YYYY-MM-03'),
    dayjs().format('YYYY-MM-05'),
    dayjs().format('YYYY-MM-11'),
    dayjs().format('YYYY-MM-12'),
    dayjs().format('YYYY-MM-13'),
    dayjs().format('YYYY-MM-14')
  ])

  return (
    <Card title="自定义日期渲染">
      <MMCalendar
        value={today}
        shouldDisableDate={shouldDisableDate}
        renderLabel={(date, options) => (
          <View
            className={classnames({
              [styles.cell_content]: true,
              [styles.cell__isSelected]: options.isSelected && options.isThisMonth,
              [styles.cell__isDisabled]: options.isDisabled,
              [styles.cell__isThisMonth]: options.isThisMonth,
              [styles.cell__dot]: dotDates.some((dateString) => date.isSame(dayjs(dateString), 'date'))
            })}
          >
            {date.date()}
          </View>
        )}
      />
    </Card>
  )
}

// 自定义月份切换控件
const CustomMonthSwitch = () => {
  const [month, setMonth] = useState(() => dayjs())

  return (
    <Card title="自定义月份切换控件">
      <MMMonthSwitch format="YYYY/MM" switchMonth={false} />
      <MMDivider />
      <View className="spacing" />
      <MMCalendar visibleMonth={false} month={month} onMonthChange={setMonth} />
    </Card>
  )
}
