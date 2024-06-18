import { FC, memo, useState } from 'react'
import IEventSkuProps from './const'
import { ScrollView, View } from '@tarojs/components'
import styles from './index.module.less'
import dayjs from 'dayjs'
import classNames from 'classnames'

interface SkuItem {
  unifyDate?: string
  unifyTime?: any[]
}

const Component: FC<IEventSkuProps> = (props) => {
  const { data, unify, onSelected } = props
  const [selectedDate, setSelectedDate] = useState<SkuItem>({})
  const [selectedTime, setSelectedTime] = useState<string>()

  const transformedSchedule = transformSchedule(data || [])

  const handleDateSelect = (item) => {
    setSelectedDate(item)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    onSelected?.(selectedDate?.unifyDate, time)
  }

  if (unify) {
    return (
      <View className={styles.event_ku_list}>
        <View className={classNames(styles.event_ku_item, styles.active_item)}>
          <View className={classNames(styles.event_ku_date, styles.active_text)}>统一场次</View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView className={styles.scrollview} scrollY showScrollbar={false} enhanced={true}>
      <View className={styles.event_ku_list}>
        <View className={styles.event_ku_title}>选择日期</View>
        <View className={styles.event_ku_list_container}>
          {transformedSchedule.map((item, index) => (
            <View
              key={index}
              className={classNames(styles.event_ku_item, { [styles.active_item]: selectedDate?.unifyDate === item.unifyDate })}
              onClick={() => handleDateSelect(item)}
            >
              <View className={classNames(styles.event_ku_date, { [styles.active_text]: selectedDate?.unifyDate === item.unifyDate })}>
                {transformDate(item.unifyDate)}
              </View>
            </View>
          ))}
        </View>
        {selectedDate?.unifyTime && (
          <>
            <View className={styles.event_ku_title} style={{ marginTop: '32rpx' }}>
              选择时段
            </View>
            <View className={styles.event_ku_list_container}>
              {selectedDate?.unifyTime?.map((time, index) => (
                <View
                  key={time + '_' + index}
                  className={classNames(styles.event_ku_item, { [styles.active_item]: selectedTime === time })}
                  onClick={() => handleTimeSelect(time)}
                >
                  <View className={classNames(styles.event_ku_time, { [styles.active_text]: selectedTime === time })}>{time}</View>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

const EventSkuList = memo(Component)
export default EventSkuList

const transformSchedule: any = (schedule) => {
  const result = {}

  schedule.forEach(({ unifyDate, unifyTime }) => {
    if (!result[unifyDate]) {
      result[unifyDate] = { unifyDate, unifyTime: [] }
    }
    result[unifyDate].unifyTime.push(unifyTime)
  })

  return Object.values(result)
}

const transformDate = (dateString) => {
  const now = dayjs()
  const date = dayjs(dateString)

  const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六']
  const formattedDayOfWeek = `周${dayOfWeek[date.day()]}`

  if (date.isSame(now, 'day')) {
    return `今日 ${formattedDayOfWeek}`
  } else if (date.isSame(now.add(1, 'day'), 'day')) {
    return `明日 ${formattedDayOfWeek}`
  }
  return `${date.format('MM.DD')} ${formattedDayOfWeek}`
}
