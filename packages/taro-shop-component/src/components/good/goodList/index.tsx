import { View } from '@tarojs/components'
import { EGoodListType, IGoodListProps } from './const'
import styles from './index.module.less'
import GoodCard from '../goodCard'
import GoodItem from '../goodItem'
import { memo, FC } from 'react'
import classNames from 'classnames'

const { Grid } = EGoodListType

const Component: FC<IGoodListProps> = (props) => {
  const { list = [], type = Grid } = props

  return (
    <View className={classNames(styles.goodListStyle, type === Grid ? styles.grid : styles.item)}>
      {list.map((item, index) => {
        return (
          <View key={`${item.id || ''}${index}`} className={styles.goodItem}>
            {type === Grid ? (
              <GoodCard data={item} onClick={() => props.onClick?.(item, index)} />
            ) : (
              <GoodItem data={item} onClick={() => props.onClick?.(item, index)} />
            )}
          </View>
        )
      })}
    </View>
  )
}

const GoodList = memo(Component)
export default GoodList
