import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import { IActivitiesItemProps } from './const'
import styles from './index.module.less'
import { BlackArrowDownFilled } from '../../../../../components/Icons';

const Component: FC<IActivitiesItemProps> = ({ item }) => (
  <View
    className={styles.custom_swiper_item}
    style={{ backgroundImage: `url(${item.src})` }}  
  >
    <View className={styles.custom_swiper_item_content}>
      <View className={styles.custom_swiper_item_title}>6月1日—7月1日</View>
      
      <View className={styles.custom_swiper_item_desc}>
        <View className={styles.custom_swiper_item_desc__txt}>代言人刘雨昕邀请你赴约打卡</View>
        
        <BlackArrowDownFilled className={styles.custom_swiper_item_desc__icon} />
      </View>
    </View>
  </View>
);

const CustomActivitiesItem = memo(Component)
export default CustomActivitiesItem
