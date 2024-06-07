import { RangePickerProps } from 'antd/lib/date-picker'
import moment from 'moment'

export default function useDisableActivityTime() {
  const disabledHours = () => {
    const hours: number[] = []
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i)
    }
    return hours
  }

  const disabledMinutes = (currentDate) => {
    const currentMinute = moment().minute()
    const currentHour = moment(currentDate).hour()
    const minutes: number[] = []
    if (currentHour === moment().hour()) {
      for (let i = 0; i < currentMinute; i++) {
        minutes.push(i)
      }
    }
    return minutes
  }

  return {
    disabledDate: (current) => current.isBefore(moment(), 'day'),
    disabledTime: (dateTime) => {
      const mTime = moment(dateTime)
      const cTime = moment()
      let rdata: any = {}
      if (mTime.isAfter(cTime, 'day')) {
        rdata = undefined
      } else if (mTime.isBefore(cTime, 'day')) {
        rdata = {
          disabledHours: () => Array.from({ length: 23 }).map((_, id) => id + 1),
          disabledMinutes: () => Array.from({ length: 59 }).map((_, id) => id + 1),
          disabledSeconds: () => Array.from({ length: 59 }).map((_, id) => id + 1)
        }
      } else {
        rdata = {
          disabledHours: () => disabledHours(),
          disabledMinutes: () => disabledMinutes(dateTime)
        }
      }
      return rdata
    }
  }
}
