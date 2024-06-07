import { View, Image } from '@tarojs/components'
import { MarketingActivityDto } from '@wmeimob/taro-api'
import classNames from 'classnames'
import { FC, memo, useMemo } from 'react'
import styles from './index.module.less'
import iconTimeImg from './images/icon_time.png'
import dayjs from 'dayjs'
import { assembleResizeUrl } from '@wmeimob/aliyun'

interface IActivityListItemProps {
  activity: MarketingActivityDto
  onClick?(): void
}

const FORMATTER = 'MM-DD HH:mm'

const Component: FC<IActivityListItemProps> = (props) => {
  const { activity, onClick } = props

  const status = useMemo(() => {
    if (!activity) {
      return ''
    }

    const { startTime, endTime } = activity

    if (!endTime || !startTime) {
      return '已结束'
    }

    if (dayjs(startTime).diff(dayjs(), 'millisecond') > 0) {
      return '即将开始'
    }

    return '进行中'
  }, [activity])

  const timeRange = useMemo(() => {
    if (!activity) {
      return ''
    }

    return `${dayjs(activity.startTime).format(FORMATTER)} ~ ${dayjs(activity.endTime).format(FORMATTER)}`
  }, [activity])

  return (
    <View className={styles.wrapper}>
      <View className={styles.item} onClick={onClick}>
        <View className={classNames(styles.status,{
          [styles.status_1]: status === '即将开始'
        })}>{status}</View>
        <View className={styles.cover}>
          <View className={styles.cover_inner} style={{ backgroundImage: `url(${assembleResizeUrl(activity.coverImg, { width: 160 })})` }} />
        </View>

        <View className={classNames(styles.name, 'text-over-flow-2')}>
          {activity.activityName}
        </View>

        <View className={styles.footer}>
          <Image src={iconTimeImg} className={styles.iconTimeImg} />
          <View>{timeRange}</View>
        </View>
      </View>
    </View>
  )
}

const ActivityListItem = memo(Component)
export default ActivityListItem
