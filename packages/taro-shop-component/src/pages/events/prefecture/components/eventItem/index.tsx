import { memo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IEventInfoProps } from './const'
import styles from './index.module.less'
import { ArrowDownFilled, PositionFilled } from '../../../../../components/Icons'
import ETag from '../eTag'
import dayjs from 'dayjs'

const Component: FC<IEventInfoProps> = (props) => {
    const { single, data, toDetail } = props
    const { province = '', city = '', area = '', address = '' } = data
    const addressDetail = `${province}${city}${area}${address}`

  return (
    <View className={styles.event_info} onClick={() => toDetail?.(data)}>
        <View className={styles.event_media} style={{ backgroundImage: `url(${data.cover})`}}>
          <View className={styles.event_title}>
            <View className={styles.event_title_text}>{data.name}</View>

            {!single ? <ArrowDownFilled style={{transform: 'rotate(-90deg)'}} /> : null}
            
          </View>

          <ETag classname={styles.event_tag} type={data.status} text={data.status === 1 ? '进行中' : data.status === 2 ? '已结束' : '未开始'} />
        </View>
        <View className={styles.event_content}>
          <View className={styles.event_info_content}>
            <View className={styles.event_date}>{dayjs(data.startTime).format('YYYY-MM-DD HH:mm')} - {dayjs(data.endTime).format('YYYY-MM-DD HH:mm')}</View>
            <View className={styles.event_address}>{addressDetail}</View>
            <View className={styles.event_position}>
              <PositionFilled width="24rpx" height="24rpx" />
              <Text className={styles.event_position_text}>{data.distance}km</Text>
            </View>
          </View>
          <View className={styles.event_price}>
            {!data.bookFree ? '免费' : `${data.bookFree}积分`}
          </View>
        </View>
    </View>
  )
}

const EventInfo = memo(Component)
export default EventInfo
