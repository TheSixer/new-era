import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { memo, FC } from 'react'
import FootOperation from '../../../../../components/footOperation'
import { routeNames } from '../../../../../routes'
import home_icon from '../../images/home_icon.png'
import FooterButtons from '../footerButtons'
import styles from './index.module.less'
interface IFooterBarPreSaleProps {
  onBuy(): void
}

const Component: FC<IFooterBarPreSaleProps> = (props) => {
  const { onBuy } = props

  return (
    <View className={styles.footerBarPreSaleStyle}>
      <FootOperation src={home_icon} text="首页" onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} />

      <View className="spacingBig" style={{ flex: 'none' }} />

      <FooterButtons type={EActivityType.PreSale} onBuy={onBuy} />
    </View>
  )
}

const FooterBarPreSale = memo(Component)
export default FooterBarPreSale
