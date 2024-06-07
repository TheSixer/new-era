import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { routeNames } from '../../../../../routes'
import useGlobalStore from '../../../../../globalStore'

import iconFav from '../../../../../assets/images/goodDetail/add_fav.png'
import iconFaved from '../../../../../assets/images/goodDetail/added_fav.png'
import iconShopCart from '../../../../../assets/images/goodDetail/shopcart.png'
import iconService from '../../../../../assets/images/goodDetail/service.png'
import FootOperation from '../../../../../components/footOperation'
import FooterButtons from '../footerButtons'
import { isH5 } from '../../../../../config'
import { navByLink } from '../../../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { authorizationLogin } from '../../../../../utils/authorizationLogin'
import classNames from 'classnames'

interface IFooterBarProps {
  isCollection: boolean
  cartCount?: number
  showCart?:boolean
  handleCollect: () => Promise<void>

  onBuy(): void

  onAddCart(): void
}

const Component: FC<IFooterBarProps> = (props) => {
  const { isCollection, cartCount, onBuy, onAddCart, handleCollect,showCart= false } = props
  const { user } = useGlobalStore()

  function toLogin() {
    authorizationLogin(false)
  }

  return (
    <View className={styles.footerBarStyle}>
      <View className={styles.footerBarStyle}>
        <FootOperation src={iconService} className={styles.mr10} text="客服" onClick={() => (user.mobile ? Taro.navigateTo({ url: '/pages/customerService/index' }) : toLogin())} />

        <FootOperation
          src={isCollection ? iconFaved : iconFav}
          className={classNames(styles.mr10,styles.w33)}
          text={isCollection ? '已收藏' : '收藏'}
          onClick={() => (user.mobile ? handleCollect() : toLogin())}
        />

        <FootOperation
          src={iconShopCart}
          text="购物车"
          className={classNames(styles.mr10,styles.w33)}
          cartCount={cartCount!}
          onClick={() => (user.mobile ? Taro.switchTab({ url: routeNames.tabBarShopCart }) : toLogin())}
        />
        <View className="spacingSmall" style={{ flex: 'none' }} />
      </View>
      <FooterButtons type="normal" onBuy={onBuy} onAddCart={onAddCart} showCart={showCart}/>
    </View>
  )
}

const FooterBarNormal = memo(Component)
export default FooterBarNormal
