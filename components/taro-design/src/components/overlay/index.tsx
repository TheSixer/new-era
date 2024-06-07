import { CSSProperties, memo, PropsWithChildren, useMemo, FC } from 'react'
import { View, CoverView } from '@tarojs/components'
import { IOverlayProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

/**
 * Overlay 遮罩层
 *
 * 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
 */
const Component: FC<PropsWithChildren<IOverlayProps>> = props => {
  const { visible = false, coverView = false, maskColor = true, onClick } = props

  const maskStyle = useMemo<CSSProperties>(() => {
    return {
      backgroundColor: maskColor && visible ? styles.maskColor : 'transparent',
      pointerEvents: visible ? 'auto' : 'none'
    }
  }, [maskColor, visible])

  const handleMaskClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <View className={styles.overlayStyle}>
      <View className={classNames(styles.overlayMask)} style={maskStyle} onClick={handleMaskClick}>
        {coverView && <CoverView style={{ width: '100%', height: '100%' }} />}
      </View>

      {visible && (
        <View className={styles.overlayContent} catchMove={props.catchTouchMove}>
          {props.children}
        </View>
      )}
    </View>
  )
}

const MMOverlay = memo(Component)
export default MMOverlay
