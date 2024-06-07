import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import { FC, memo } from 'react'
import styles from './index.module.less'

interface IBuyCountDownProps {
  startTime: string

  endTime: string
}

const Component: FC<IBuyCountDownProps> = (props) => {
  const { startTime = '', endTime = '' } = props

  const { day, hour, minute, seconds, timeRangeState } = useTimeRangeCountDown<number>({ startTime, endTime, timeType: 'number' })

  const paratopeTime = (data: number) => (data < 10 ? `0${data}` : `${data}`)

  return (
    <div className={styles.buyCountDownStyle}>
      {timeRangeState === 'end' ? (
        <span>已结束</span>
      ) : (
        <div>
          <span>距{timeRangeState === 'notStart' ? '开始' : '结束'}</span>
          <span className={styles.pinkBorder}>{paratopeTime(day)}</span>天<span className={styles.pinkBorder}>{paratopeTime(hour)}</span>:
          <span className={styles.pinkBorder}>{paratopeTime(minute)}</span>:<span className={styles.pinkBorder}>{paratopeTime(seconds)}</span>
        </div>
      )}
    </div>
  )
}

Component.displayName = 'BuyCountDown'

const BuyCountDown = memo(Component)
export default BuyCountDown
