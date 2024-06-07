import { memo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IEventInfoProps } from './const'
import styles from './index.module.less'
import { ArrowDownFilled, PositionFilled } from '../../../../../components/Icons'
import ETag from '../eTag'

const Component: FC<IEventInfoProps> = (props) => {
    const { single } = props

  return (
    <View className={styles.event_info}>
        <View className={styles.event_media} style={{ background: 'url(https://dummyimage.com/750x360)' }}>
          <View className={styles.event_title}>
            <View className={styles.event_title_text}>title</View>

            {!single ? <ArrowDownFilled style={{transform: 'rotate(-90deg)'}} /> : null}
            
          </View>

          <ETag classname={styles.event_tag} type='before' text='wating' />
        </View>
        <View className={styles.event_content}>
          <View className={styles.event_info_content}>
            <View className={styles.event_date}>2024.06.05</View>
            <View className={styles.event_address}>address</View>
            <View className={styles.event_position}>
              <PositionFilled width="24rpx" height="24rpx" />
              <Text className={styles.event_position_text}>position</Text>
            </View>
          </View>
          <View className={styles.event_price}>
            {props.price === 0 ? '免费' : '120积分'}
          </View>
        </View>
    </View>
  )
}

const EventInfo = memo(Component)
export default EventInfo
