import { memo, FC } from 'react'
import { Button, View } from '@tarojs/components'
import { IAboutUsProps } from './const'
import styles from './index.module.less'
import Bg from '../../images/about.png';
import Title from '../title';

const Component: FC<IAboutUsProps> = () => (
  <View
    className={styles.about_us_container}
    style={{ backgroundImage: `url(${Bg})` }}
  >
    <View className={styles.banner_title}>
      <Title title="品牌故事" subTitle='ABOUT US' />
    </View>
    
    <View className={styles.about_us_content}>
      <View className={styles.about_us_content__text}>NEW ERA诞生于1920年</View>
      <View className={styles.about_us_content__text}>是来自于美国的知名制帽品牌</View>
      
      <Button className='banner_btn'>查看更多</Button>
    </View>
  </View>
);

const CustomActivitiesItem = memo(Component)
export default CustomActivitiesItem
