import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { View, Text } from '@tarojs/components'
import styles from './index.module.less'

dayjs.extend(duration)

const Countdown = ({ startTime, endTime }) => {
  const [message, setMessage] = useState('')
  const [days, setDays] = useState(0)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs()
      let targetTime
      let message

      if (now.isBefore(startTime)) {
        targetTime = dayjs(startTime)
        setMessage('距离活动开始')
      } else if (now.isBefore(endTime)) {
        targetTime = dayjs(endTime)
        setMessage('距离活动结束')
      } else {
        setMessage('')
        setTimeLeft('活动已结束')
        return
      }

      const diff = targetTime.diff(now)
      const duration = dayjs.duration(diff)

      const days = Math.floor(duration.asDays())
      const hours = duration.hours().toString().padStart(2, '0')
      const minutes = duration.minutes().toString().padStart(2, '0')
      const seconds = duration.seconds().toString().padStart(2, '0')

      setDays(days)
      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }

    updateCountdown() // Initial call to set the countdown immediately

    const interval = setInterval(updateCountdown, 1000) // Update countdown every second

    return () => clearInterval(interval) // Cleanup the interval on component unmount
  }, [startTime, endTime])

  return (
    <View className={styles.countdown}>
      <View className={styles.countdown__message}>{message}</View>
      <View className={styles.countdown__time}>
        <Text>{days}</Text>
        <Text className={styles.gray__text}>天</Text>
        <Text>{timeLeft}</Text>
      </View>
    </View>
  )
}

export default Countdown
