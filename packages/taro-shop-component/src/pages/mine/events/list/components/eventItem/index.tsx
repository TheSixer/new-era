import { memo, FC } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { IEventInfoProps } from './const'
import styles from './index.module.less'
import { ArrowDownFilled, PositionFilled } from '../../../../../../components/Icons'
import dayjs from 'dayjs'

const Component: FC<IEventInfoProps> = (props) => {
    const { data, toDetail } = props
    const { province = '', city = '', area = '', address = '' } = data || {}
    const addressDetail = `${province}${city}${area}${address}`

  return (
    <View className={styles.event_info} onClick={() => data && toDetail?.(data)}>
        <View className={styles.event_media} style={{ backgroundImage: `url(${data?.cover})`}}>
            <View className={styles.event_book_date}>预约时间：{data?.unifyName}</View>

            <View className={styles.event_title}>
            <View className={styles.event_title_text}>{data?.name}</View>

          </View>
        </View>
        <View className={styles.event_content}>
          <View className={styles.event_info_content}>
            <View className={styles.event_date}>{dayjs(data?.startTime).format('YYYY-MM-DD HH:mm')} - {dayjs(data?.endTime).format('YYYY-MM-DD HH:mm')}</View>
            <View className={styles.event_address}>{addressDetail}</View>
            {data?.distance ? (<View className={styles.event_position}>
              <PositionFilled width="24rpx" height="24rpx" />
              <Text className={styles.event_position_text}>{data?.distance}km</Text>
            </View>) : null}
          </View>
          <View className={styles.event_price}>
            <Button className={styles.event_to_detail__btn}>
              <Text className={styles.event_to_detail__txt}>查看详情</Text>
              <ArrowDownFilled style={{transform: 'rotate(-90deg)'}} />
            </Button>
          </View>
        </View>
    </View>
  )
}

const EventInfo = memo(Component)
export default EventInfo
