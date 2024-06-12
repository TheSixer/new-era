import { memo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IPopupAdsProps } from './const'
import styles from './index.module.less'
import MMOverlay from '@wmeimob/taro-design/src/components/overlay'
import { navByLink } from '../../../../../components/pageModules/utils'
import { assembleResizeUrl } from '@wmeimob/tencent-cloud'
import { JumpTypeValue } from '../../../../../components/pageModules/const'
import icon_close from './icon_close.png'

const Component: FC<IPopupAdsProps> = (props) => {
  const { ad, onClose } = props

  function handleJump() {
    const jump: JumpTypeValue = JSON.parse(ad!.url || '{}')

    if (!jump.type) {
      return
    }

    navByLink(jump.type, jump.content)
    onClose()
  }

  return (
    <MMOverlay visible={!!ad} onClick={onClose}>
      <View className={styles.content}>
        <Image src={assembleResizeUrl(ad?.imgUrl, { width: 300 })} className={styles.img} mode="widthFix" onClick={handleJump} />
        <Image src={icon_close} className={styles.close} onClick={onClose} />
      </View>
    </MMOverlay>
  )
}

const PopupAds = memo(Component)
export default PopupAds
