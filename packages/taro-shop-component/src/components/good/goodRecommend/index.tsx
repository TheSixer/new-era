import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import { IGoodRecommendProps } from './const'
import styles from './index.module.less'
import GoodList from '../goodList'

/**
 * 商品推荐
 *
 * 包含一个标题头的枚举商品列表
 * @description 猜你喜欢、推荐商品。
 * @param props
 * @returns
 */
const Component: FC<IGoodRecommendProps> = props => {
  const { title = '猜你喜欢', list = [] } = props

  return (
    <View className={styles.goodRecommendStyle}>
      <View className={styles.goodRecommendStyle_title}>{title}</View>

      <GoodList list={list} onClick={props.onClick} />
    </View>
  )
}

const GoodRecommend = memo(Component)
export default GoodRecommend
