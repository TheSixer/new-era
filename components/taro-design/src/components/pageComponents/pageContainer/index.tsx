import { memo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IPageContainerProps } from './const'
import styles from './index.module.less'
import MMFixFoot from '../../fix-foot'
import MMNavigation from '../../navigation'

const Component: FC<IPageContainerProps> = props => {
  const { title = '' } = props

  return (
    <View className={styles.pageContainerStyle}>
      <MMNavigation title={title} />
      <View style={{ padding: 10 }}>{props.children}</View>
      <MMFixFoot />
    </View>
  )
}

const MMPageContainer = memo(Component)
export default MMPageContainer
