import { memo, FC } from 'react'
import { View, Image, Button } from '@tarojs/components'
import { IEarnItemProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

const Component: FC<IEarnItemProps> = ({ item, index }) => (
  <View
    className={classNames(styles.custom_swiper_item, {
      [styles.custom_swiper_item_odd]: index % 2 === 0
    })}>
    <Image className={styles.custom_swiper_item_image} src={item.src} mode='aspectFill'/>

    <View className={styles.custom_swiper_item_content}>
      <View className={classNames(styles.custom_swiper_item_title, {
        [styles.custom_swiper_item_title_odd]: index % 2 === 0
      })}>{item.alt}</View>
      
      <Button className={classNames(styles.custom_swiper_item_button, {
        [styles.custom_swiper_item_button_odd]: index % 2 === 0
      })}>前往</Button>
    </View>
  </View>
);

const CustomEarnItem = memo(Component)
export default CustomEarnItem
