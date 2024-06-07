import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { memo, FC } from 'react'
import FootOperation from '../../../../../components/footOperation'
import { routeNames } from '../../../../../routes'
import home_icon from '../../images/home_icon.png'
import FooterButtons from '../footerButtons'
import styles from './index.module.less'
interface IFooterBarActProps {
  disabled: boolean
  onBuy(): void
}

const Component: FC<IFooterBarActProps> = (props) => {
  const { disabled } = props

  return (
    <View className={styles.footerBarActStyle}>
      <FootOperation src={home_icon} text="首页" onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} />

      <View className="spacingBig" style={{ flex: 'none' }} />

      <FooterButtons type={EActivityType.FlashSale} disabled={disabled} onBuy={props.onBuy} />
    </View>
  )
}

const FooterBarFlash = memo(Component)
export default FooterBarFlash
