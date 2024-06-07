import moment from 'moment'

export default function useDisableActivityTime() {
  const disabledHours = () => {
    const hours: number[] = []
    for (let index = 0; index < moment().hour(); index++) {
      hours.push(index)
    }
    return hours
  }

  const disabledMinutes = (currentDate) => {
    const currentMinute = moment().minute()
    const currentHour = moment(currentDate).hour()
    const minutes: number[] = []
    if (currentHour === moment().hour()) {
      for (let index = 0; index < currentMinute; index++) {
        minutes.push(index)
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
