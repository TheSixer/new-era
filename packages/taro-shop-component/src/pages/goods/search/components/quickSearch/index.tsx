import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IQuickSearchProps } from './const'
import styles from './index.module.less'
import iconTrash from '~/assets/images/search/icon_trash.png'

const Component: FC<IQuickSearchProps> = (props) => {
  const { title = '最近搜索', values = [] } = props

  return values.length ? (
    <View className={styles.quickSearchStyle}>
      <View className={styles.title}>
        <Text>{title}</Text>

        <Image src={iconTrash} className={styles.trash} onClick={() => props.onClear?.()} />
      </View>

      <View className={styles.content}>
        {values.map((val, index) => (
          <View className={styles.search_item} key={val + index} onClick={() => props.onClick?.(val, index)}>
            {val}
          </View>
        ))}
      </View>
    </View>
  ) : null
}

const QuickSearch = memo(Component)
export default QuickSearch
