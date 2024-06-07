import { Image, View } from '@tarojs/components'
import { MMOverlay } from '@wmeimob/taro-design'
import { FC, memo } from 'react'
import icon_close from './images/icon_close.png'
import icon_code from './images/icon_code.png'
import styles from './index.module.less'
import { getGlobalData } from '@wmeimob/taro-global-data'
import classNames from 'classnames'

interface IQrCodeModalProps {
  visible: boolean

  onClose(): void
}

export interface IQrCodeModalRef {
  open(): void
}

const QrCodeModal: FC<IQrCodeModalProps> = (props) => {
  const isH5 = getGlobalData('isH5')

  return (
    <MMOverlay visible={props.visible}>
      <View className={styles.content}>
        <Image src={icon_code} className={styles.icon_code} showMenuByLongpress />

        {isH5 ? <View className={classNames(styles.follow,styles.follow_h5)}>长按保存 <View>进微信扫一扫关注</View></View> : <View className={styles.follow}>长按识别关注公众号</View>}
        <Image src={icon_close} className={styles.icon_close} onClick={props.onClose} />
      </View>
    </MMOverlay>
  )
}

export default memo(QrCodeModal)
