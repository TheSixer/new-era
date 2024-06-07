import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'
import { ICitiesProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer } from '@wmeimob/taro-design'
import { ArrowRightFilled, PositionFilled } from '../../../components/Icons'
import Searchbar from '../../../components/searchbar'

const Component: FC<ICitiesProps> = (props) => {
  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <MMNavigation title='选择城市' type="Transparent" />

      <View className={styles.header}>
        <View className={styles.city_info}>
            <PositionFilled width="36rpx" height="36rpx" />
            <Text className={styles.city_name}>上海（当前）</Text>
        </View>
        <Text className={styles.header__text}>{15}个城市有活动</Text>
      </View>
    
      <Searchbar placeholder='搜索城市' onSearch={() => {}} />

      <View className={styles.city_list}>
        {
            [{ id: 1, name: '上海' }, { id: 2, name: '北京' }, { id: 3, name: '广州' }, { id: 4, name: '深圳' }, { id: 5, name: '杭州' }].map((city) => (
              <View className={styles.city_item} key={city.id} onClick={() => {}}>

                <Text className={styles.city_name}>{city.name}</Text>
                <View className={styles.city_item_right}>
                    <Text className={styles.city_item_right_text}>{city.id}个活动</Text>
                    <ArrowRightFilled />
                </View>
              </View>
            ))
        }

      </View>
    </PageContainer>
  )
}

const Cities = memo(Component)
export default Cities
