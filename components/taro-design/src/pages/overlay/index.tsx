import { memo, PropsWithChildren, useState, FC } from 'react'
import { View, CoverView } from '@tarojs/components'
import { IOverlayProps } from './const'
import styles from './index.module.less'
import MMOverlay from '~/components/overlay'
import MMButton from '~/components/button'
import MMNavigation from '~/components/navigation'

/**
 * Overlay 遮罩层
 *
 * 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
 */
const Component: FC<PropsWithChildren<IOverlayProps>> = props => {
  const { coverView = false } = props

  const [visible, setVisible] = useState(false)

  return (
    <View>
      <MMNavigation>蒙层</MMNavigation>
      <MMOverlay visible={visible} onClick={() => setVisible(false)}>
        1111
      </MMOverlay>

      <MMButton onClick={() => setVisible(pre => !pre)}>显示蒙层</MMButton>
    </View>
  )
}

const Overlay = memo(Component)
export default Overlay
