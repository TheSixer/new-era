import { View } from '@tarojs/components'
import { FC, memo } from 'react'
import styles from './index.module.less'

interface ITagsProps {}

/**
 * 会员减免tag
 * @param props
 * @returns
 */
const Component: FC<ITagsProps> = () => {
  return (
    <View className={styles.tagsStyle}>
      <View className={styles.content}>会员减免</View>
    </View>
  )
}

const MemberDiscountTag = memo(Component)
export default MemberDiscountTag
