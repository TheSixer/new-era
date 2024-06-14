import { memo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IPopupQrCodeProps } from './const'
import styles from './index.module.less'
import MMOverlay from '@wmeimob/taro-design/src/components/overlay'
import icon_close from './icon_close.png'

const Component: FC<IPopupQrCodeProps> = (props) => {
  const { visible, title, imgUrl, onClose } = props

  return (
    <MMOverlay visible={!!visible} onClick={onClose}>
      <View className={styles.content}>
        <View className={styles.title}>{title}</View>
        <Image src={imgUrl} className={styles.img} mode="widthFix" />
        <Image src={icon_close} className={styles.close} onClick={onClose} />
      </View>
    </MMOverlay>
  )
}

const PopupAds = memo(Component)
export default PopupAds
