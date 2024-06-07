import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'
import { IDetailProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer } from '@wmeimob/taro-design'
import { PositionFilled } from '../../../components/Icons'
import Searchbar from '../../../components/searchbar'
import Banner from './components/banner'

const Component: FC<IDetailProps> = (props) => {
  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <View className={styles.navigator_bar}>
        <MMNavigation title='选择城市' type="Transparent" />
      </View>
      
      <View className={styles.banner}>
        <Banner />
      </View>

      <View className={styles.container}>
        <View className={styles.event_title}>
        代言人刘雨昕邀请你赴约打卡
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
            120积分
          </View>
        </View>

        <View className={styles.event_member}>
          活动人数： 100
        </View>

      </View>
    
    </PageContainer>
  )
}

const Cities = memo(Component)
export default Cities
