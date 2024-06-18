import { memo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IPopupQrCodeProps } from './const'
import styles from './index.module.less'
import MMOverlay from '@wmeimob/taro-design/src/components/overlay'
import icon_close from './icon_close.png'
import classNames from 'classnames'

const Component: FC<IPopupQrCodeProps> = (props) => {
  const { visible, title, imgUrl, verifyCode, finished, onClose } = props

  return (
    <MMOverlay visible={!!visible} onClick={onClose}>
      <View className={styles.container}>
        <View className={classNames(styles.content, {[styles.finished]: finished})}>
          <View className={styles.title}>{title}</View>
          <View className={styles.qrcode_container}>
            <Image src={imgUrl} className={styles.img} mode="widthFix" />
          </View>
          <View className={styles.qrcode_txt}>{verifyCode}</View>
          <Image src={icon_close} className={styles.close} onClick={onClose} />
        </View>
      </View>
    </MMOverlay>
  )
}

const PopupAds = memo(Component)
export default PopupAds
